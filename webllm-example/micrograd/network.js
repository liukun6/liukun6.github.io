import {
  forwardLayerWGSL,
  lossAndOutputDeltaWGSL,
  reduceLossWGSL,
  backpropDeltaWGSL,
  gradWeightWGSL,
  sgdUpdateWGSL,
  adamUpdateWGSL,
  inferenceGridWGSL,
  heatmapRenderWGSL,
  MAX_HIDDEN,
} from './shaders.js';

const STORAGE_RW = GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC;
const STORAGE_ONLY = GPUBufferUsage.STORAGE;
const STORAGE_ZEROABLE = GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST;

function createBuffer(device, size, usage, label) {
  return device.createBuffer({ label, size: Math.max(size, 4), usage });
}

function xavierInit(inDim, outDim) {
  const limit = Math.sqrt(6 / (inDim + outDim));
  const data = new Float32Array(inDim * outDim);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * limit;
  return data;
}

// Network: owns every GPUBuffer and compute pipeline for the fixed
// [2, h1, h2, 1] tanh-MLP described in the design doc, plus the SGD/Adam
// update kernels and the decision-boundary inference kernel + render pass.
// Hidden width is adjustable (rebuilds buffers); hidden depth is fixed at 2,
// matching the doc's "small, bounded architecture changes" scope.
export class Network {
  constructor(device, canvasFormat) {
    this.device = device;
    this.canvasFormat = canvasFormat;
    this.t = 0; // Adam time step
    this.N = 0;
    this._buildPipelines();
  }

  _buildPipelines() {
    const d = this.device;
    const mk = (code, entryPoint) => d.createComputePipeline({
      layout: 'auto',
      compute: { module: d.createShaderModule({ code }), entryPoint },
    });
    this.pipelines = {
      forward: mk(forwardLayerWGSL, 'main'),
      loss: mk(lossAndOutputDeltaWGSL, 'main'),
      reduce: mk(reduceLossWGSL, 'main'),
      backprop: mk(backpropDeltaWGSL, 'main'),
      grad: mk(gradWeightWGSL, 'main'),
      sgd: mk(sgdUpdateWGSL, 'main'),
      adam: mk(adamUpdateWGSL, 'main'),
      inferenceGrid: mk(inferenceGridWGSL, 'main'),
    };

    const heatmapModule = d.createShaderModule({ code: heatmapRenderWGSL });
    this.heatmapPipeline = d.createRenderPipeline({
      layout: 'auto',
      vertex: { module: heatmapModule, entryPoint: 'vmain' },
      fragment: {
        module: heatmapModule,
        entryPoint: 'fmain',
        targets: [{ format: this.canvasFormat }],
      },
      primitive: { topology: 'triangle-list' },
    });
  }

  // ---- Architecture (params) ----

  setArchitecture(h1, h2) {
    if (h1 > MAX_HIDDEN || h2 > MAX_HIDDEN) {
      throw new Error(`Hidden width capped at ${MAX_HIDDEN} (inference-grid shader limit).`);
    }
    const d = this.device;
    this.h1 = h1;
    this.h2 = h2;
    this.dims = [2, h1, h2, 1];
    this.t = 0;

    this._destroyParamBuffers();

    this.W = [null];
    this.b = [null];
    this.gW = [null];
    this.gb = [null];
    this.mW = [null];
    this.vW = [null];
    this.mb = [null];
    this.vb = [null];
    this.layerUniform = [null];

    for (let L = 1; L <= 3; L++) {
      const inDim = this.dims[L - 1];
      const outDim = this.dims[L];
      const wCount = inDim * outDim;

      this.W[L] = createBuffer(d, wCount * 4, STORAGE_RW, `W${L}`);
      this.b[L] = createBuffer(d, outDim * 4, STORAGE_RW, `b${L}`);
      d.queue.writeBuffer(this.W[L], 0, xavierInit(inDim, outDim));
      d.queue.writeBuffer(this.b[L], 0, new Float32Array(outDim));

      this.gW[L] = createBuffer(d, wCount * 4, STORAGE_ONLY, `gW${L}`);
      this.gb[L] = createBuffer(d, outDim * 4, STORAGE_ONLY, `gb${L}`);

      this.mW[L] = createBuffer(d, wCount * 4, STORAGE_ZEROABLE, `mW${L}`);
      this.vW[L] = createBuffer(d, wCount * 4, STORAGE_ZEROABLE, `vW${L}`);
      this.mb[L] = createBuffer(d, outDim * 4, STORAGE_ZEROABLE, `mb${L}`);
      this.vb[L] = createBuffer(d, outDim * 4, STORAGE_ZEROABLE, `vb${L}`);
      d.queue.writeBuffer(this.mW[L], 0, new Float32Array(wCount));
      d.queue.writeBuffer(this.vW[L], 0, new Float32Array(wCount));
      d.queue.writeBuffer(this.mb[L], 0, new Float32Array(outDim));
      d.queue.writeBuffer(this.vb[L], 0, new Float32Array(outDim));

      this.layerUniform[L] = createBuffer(d, 16, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, `dims${L}`);
      d.queue.writeBuffer(this.layerUniform[L], 0, new Uint32Array([inDim, outDim, this.N, 0]));
    }

    this._allocOptimizerUniforms();
    if (this.N > 0) {
      this._allocBatchBuffers();
      this._buildBindGroups();
    }

    if (this.gridRes) {
      this._buildGridBindGroups();
      d.queue.writeBuffer(this.gridUniformBuf, 0, new Uint32Array([this.gridRes.resX, this.gridRes.resY, h1, h2]));
    }
  }

  _destroyParamBuffers() {
    if (!this.W) return;
    for (let L = 1; L <= 3; L++) {
      [this.W[L], this.b[L], this.gW[L], this.gb[L], this.mW[L], this.vW[L],
        this.mb[L], this.vb[L], this.layerUniform[L]].forEach((b) => b && b.destroy());
    }
  }

  _allocOptimizerUniforms() {
    const d = this.device;
    this.sgdUniform = { W: [null], b: [null] };
    this.adamUniform = { W: [null], b: [null] };
    for (let L = 1; L <= 3; L++) {
      this.sgdUniform.W[L] = createBuffer(d, 16, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, `sgdU.W${L}`);
      this.sgdUniform.b[L] = createBuffer(d, 16, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, `sgdU.b${L}`);
      this.adamUniform.W[L] = createBuffer(d, 32, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, `adamU.W${L}`);
      this.adamUniform.b[L] = createBuffer(d, 32, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, `adamU.b${L}`);
    }
  }

  // ---- Dataset (batch-sized buffers) ----

  setDataset(X, Y, N) {
    const d = this.device;
    this.N = N;
    if (this.X) this.X.destroy();
    if (this.Y) this.Y.destroy();
    this.X = createBuffer(d, N * 2 * 4, STORAGE_RW, 'X');
    this.Y = createBuffer(d, N * 4, STORAGE_RW, 'Y');
    d.queue.writeBuffer(this.X, 0, X);
    d.queue.writeBuffer(this.Y, 0, Y);

    for (let L = 1; L <= 3; L++) {
      d.queue.writeBuffer(this.layerUniform[L], 0, new Uint32Array([this.dims[L - 1], this.dims[L], N, 0]));
    }
    d.queue.writeBuffer(this._lossDimsBuf || (this._lossDimsBuf = createBuffer(d, 16, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, 'lossDims')), 0, new Uint32Array([N, 0, 0, 0]));

    this._allocBatchBuffers();
    this._buildBindGroups();
  }

  _allocBatchBuffers() {
    const d = this.device;
    const N = this.N;
    if (this.A) this.A.forEach((b) => b && b.destroy());
    if (this.delta) this.delta.forEach((b) => b && b.destroy());
    if (this.lossPerSample) this.lossPerSample.destroy();
    if (this.lossBuf) this.lossBuf.destroy();

    this.A = [this.X];
    this.delta = [null];
    for (let L = 1; L <= 3; L++) {
      this.A[L] = createBuffer(d, N * this.dims[L] * 4, STORAGE_ONLY, `A${L}`);
      this.delta[L] = createBuffer(d, N * this.dims[L] * 4, STORAGE_ONLY, `delta${L}`);
    }
    this.lossPerSample = createBuffer(d, N * 4, STORAGE_ONLY, 'lossPerSample');
    this.lossBuf = createBuffer(d, 4, GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST, 'lossBuf');
  }

  // ---- Bind groups ----

  _buildBindGroups() {
    const d = this.device;
    const p = this.pipelines;

    this.forwardBG = [null];
    this.backpropBG = [null];
    this.gradBG = [null];
    this.sgdBG = { W: [null], b: [null] };
    this.adamBG = { W: [null], b: [null] };

    for (let L = 1; L <= 3; L++) {
      this.forwardBG[L] = d.createBindGroup({
        layout: p.forward.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: this.layerUniform[L] } },
          { binding: 1, resource: { buffer: this.A[L - 1] } },
          { binding: 2, resource: { buffer: this.W[L] } },
          { binding: 3, resource: { buffer: this.b[L] } },
          { binding: 4, resource: { buffer: this.A[L] } },
        ],
      });

      if (L > 1) {
        this.backpropBG[L] = d.createBindGroup({
          layout: p.backprop.getBindGroupLayout(0),
          entries: [
            { binding: 0, resource: { buffer: this.layerUniform[L] } },
            { binding: 1, resource: { buffer: this.delta[L] } },
            { binding: 2, resource: { buffer: this.W[L] } },
            { binding: 3, resource: { buffer: this.A[L - 1] } },
            { binding: 4, resource: { buffer: this.delta[L - 1] } },
          ],
        });
      }

      this.gradBG[L] = d.createBindGroup({
        layout: p.grad.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: this.layerUniform[L] } },
          { binding: 1, resource: { buffer: this.A[L - 1] } },
          { binding: 2, resource: { buffer: this.delta[L] } },
          { binding: 3, resource: { buffer: this.gW[L] } },
          { binding: 4, resource: { buffer: this.gb[L] } },
        ],
      });

      this.sgdBG.W[L] = d.createBindGroup({
        layout: p.sgd.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: this.sgdUniform.W[L] } },
          { binding: 1, resource: { buffer: this.W[L] } },
          { binding: 2, resource: { buffer: this.gW[L] } },
        ],
      });
      this.sgdBG.b[L] = d.createBindGroup({
        layout: p.sgd.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: this.sgdUniform.b[L] } },
          { binding: 1, resource: { buffer: this.b[L] } },
          { binding: 2, resource: { buffer: this.gb[L] } },
        ],
      });

      this.adamBG.W[L] = d.createBindGroup({
        layout: p.adam.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: this.adamUniform.W[L] } },
          { binding: 1, resource: { buffer: this.W[L] } },
          { binding: 2, resource: { buffer: this.gW[L] } },
          { binding: 3, resource: { buffer: this.mW[L] } },
          { binding: 4, resource: { buffer: this.vW[L] } },
        ],
      });
      this.adamBG.b[L] = d.createBindGroup({
        layout: p.adam.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: this.adamUniform.b[L] } },
          { binding: 1, resource: { buffer: this.b[L] } },
          { binding: 2, resource: { buffer: this.gb[L] } },
          { binding: 3, resource: { buffer: this.mb[L] } },
          { binding: 4, resource: { buffer: this.vb[L] } },
        ],
      });
    }

    this.lossBG = d.createBindGroup({
      layout: p.loss.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: this._lossDimsBuf } },
        { binding: 1, resource: { buffer: this.A[3] } },
        { binding: 2, resource: { buffer: this.Y } },
        { binding: 3, resource: { buffer: this.delta[3] } },
        { binding: 4, resource: { buffer: this.lossPerSample } },
      ],
    });

    this.reduceBG = d.createBindGroup({
      layout: p.reduce.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: this._lossDimsBuf } },
        { binding: 1, resource: { buffer: this.lossPerSample } },
        { binding: 2, resource: { buffer: this.lossBuf } },
      ],
    });
  }

  // ---- Training step ----

  step(encoder, { lr, optimizer, beta1 = 0.9, beta2 = 0.999, eps = 1e-8 }) {
    const d = this.device;
    const p = this.pipelines;
    const N = this.N;
    if (N === 0) return;

    if (optimizer === 'adam') this.t += 1;

    const pass = encoder.beginComputePass();

    for (let L = 1; L <= 3; L++) {
      pass.setPipeline(p.forward);
      pass.setBindGroup(0, this.forwardBG[L]);
      pass.dispatchWorkgroups(Math.ceil(N / 8), Math.ceil(this.dims[L] / 8));
    }

    pass.setPipeline(p.loss);
    pass.setBindGroup(0, this.lossBG);
    pass.dispatchWorkgroups(Math.ceil(N / 64));

    pass.setPipeline(p.reduce);
    pass.setBindGroup(0, this.reduceBG);
    pass.dispatchWorkgroups(1);

    for (let L = 3; L >= 1; L--) {
      pass.setPipeline(p.grad);
      pass.setBindGroup(0, this.gradBG[L]);
      pass.dispatchWorkgroups(Math.ceil(this.dims[L - 1] / 8), Math.ceil(this.dims[L] / 8));

      if (L > 1) {
        pass.setPipeline(p.backprop);
        pass.setBindGroup(0, this.backpropBG[L]);
        pass.dispatchWorkgroups(Math.ceil(N / 8), Math.ceil(this.dims[L - 1] / 8));
      }
    }

    for (let L = 1; L <= 3; L++) {
      const wCount = this.dims[L - 1] * this.dims[L];
      const bCount = this.dims[L];
      if (optimizer === 'adam') {
        d.queue.writeBuffer(this.adamUniform.W[L], 0, new Float32Array([lr, beta1, beta2, eps, this.t]));
        d.queue.writeBuffer(this.adamUniform.W[L], 20, new Uint32Array([wCount]));
        d.queue.writeBuffer(this.adamUniform.b[L], 0, new Float32Array([lr, beta1, beta2, eps, this.t]));
        d.queue.writeBuffer(this.adamUniform.b[L], 20, new Uint32Array([bCount]));

        pass.setPipeline(p.adam);
        pass.setBindGroup(0, this.adamBG.W[L]);
        pass.dispatchWorkgroups(Math.ceil(wCount / 64));
        pass.setBindGroup(0, this.adamBG.b[L]);
        pass.dispatchWorkgroups(Math.ceil(bCount / 64));
      } else {
        d.queue.writeBuffer(this.sgdUniform.W[L], 0, new Float32Array([lr]));
        d.queue.writeBuffer(this.sgdUniform.W[L], 4, new Uint32Array([wCount]));
        d.queue.writeBuffer(this.sgdUniform.b[L], 0, new Float32Array([lr]));
        d.queue.writeBuffer(this.sgdUniform.b[L], 4, new Uint32Array([bCount]));

        pass.setPipeline(p.sgd);
        pass.setBindGroup(0, this.sgdBG.W[L]);
        pass.dispatchWorkgroups(Math.ceil(wCount / 64));
        pass.setBindGroup(0, this.sgdBG.b[L]);
        pass.dispatchWorkgroups(Math.ceil(bCount / 64));
      }
    }

    pass.end();
  }

  // ---- Decision boundary inference grid ----

  setupBoundaryGrid(resX, resY, domain) {
    const d = this.device;
    this.gridRes = { resX, resY };
    if (this.boundaryBuf) this.boundaryBuf.destroy();
    if (this.gridUniformBuf) this.gridUniformBuf.destroy();
    if (this.heatmapViewUniform) this.heatmapViewUniform.destroy();

    this.boundaryBuf = createBuffer(d, resX * resY * 4, GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST, 'boundaryBuf');
    this.gridUniformBuf = createBuffer(d, 32, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, 'gridUniform');
    this.heatmapViewUniform = createBuffer(d, 16, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, 'heatmapView');
    this.setBoundaryDomain(domain);
    d.queue.writeBuffer(this.heatmapViewUniform, 0, new Float32Array([0, 0, resX, resY]));
    this._buildGridBindGroups();
  }

  setBoundaryDomain({ xmin, xmax, ymin, ymax }) {
    this.domain = { xmin, xmax, ymin, ymax };
    const d = this.device;
    d.queue.writeBuffer(this.gridUniformBuf, 0, new Uint32Array([this.gridRes.resX, this.gridRes.resY, this.h1, this.h2]));
    d.queue.writeBuffer(this.gridUniformBuf, 16, new Float32Array([xmin, xmax, ymin, ymax]));
  }

  setCanvasSize(w, hpx) {
    if (!this.heatmapViewUniform) return;
    this.device.queue.writeBuffer(this.heatmapViewUniform, 0, new Float32Array([w, hpx, this.gridRes.resX, this.gridRes.resY]));
  }

  _buildGridBindGroups() {
    const d = this.device;
    this.gridBG = d.createBindGroup({
      layout: this.pipelines.inferenceGrid.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: this.gridUniformBuf } },
        { binding: 1, resource: { buffer: this.W[1] } },
        { binding: 2, resource: { buffer: this.b[1] } },
        { binding: 3, resource: { buffer: this.W[2] } },
        { binding: 4, resource: { buffer: this.b[2] } },
        { binding: 5, resource: { buffer: this.W[3] } },
        { binding: 6, resource: { buffer: this.b[3] } },
        { binding: 7, resource: { buffer: this.boundaryBuf } },
      ],
    });
    this.heatmapBG = d.createBindGroup({
      layout: this.heatmapPipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: this.heatmapViewUniform } },
        { binding: 1, resource: { buffer: this.boundaryBuf } },
      ],
    });
  }

  encodeInferenceGrid(encoder) {
    const pass = encoder.beginComputePass();
    pass.setPipeline(this.pipelines.inferenceGrid);
    pass.setBindGroup(0, this.gridBG);
    pass.dispatchWorkgroups(Math.ceil(this.gridRes.resX / 8), Math.ceil(this.gridRes.resY / 8));
    pass.end();
  }

  encodeHeatmapRender(encoder, view) {
    const pass = encoder.beginRenderPass({
      colorAttachments: [{
        view,
        clearValue: { r: 0.04, g: 0.04, b: 0.06, a: 1 },
        loadOp: 'clear',
        storeOp: 'store',
      }],
    });
    pass.setPipeline(this.heatmapPipeline);
    pass.setBindGroup(0, this.heatmapBG);
    pass.draw(3);
    pass.end();
  }

  clearBoundaryGrid() {
    if (this.boundaryBuf && this.gridRes) {
      const zeroData = new Float32Array(this.gridRes.resX * this.gridRes.resY);
      this.device.queue.writeBuffer(this.boundaryBuf, 0, zeroData);
    }
  }

  // ---- Debug: numerical gradient check (blocking, manual trigger only) ----

  async numericGradCheck(epsilon = 1e-4, samplesPerLayer = 3) {
    const d = this.device;
    const report = [];

    const readBuf = async (buf, count) => {
      const staging = d.createBuffer({ size: count * 4, usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ });
      const enc = d.createCommandEncoder();
      enc.copyBufferToBuffer(buf, 0, staging, 0, count * 4);
      d.queue.submit([enc.finish()]);
      await staging.mapAsync(GPUMapMode.READ);
      const out = new Float32Array(staging.getMappedRange()).slice();
      staging.unmap();
      staging.destroy();
      return out;
    };

    const computeLoss = async () => {
      const enc = d.createCommandEncoder();
      const pass = enc.beginComputePass();
      const p = this.pipelines;
      for (let L = 1; L <= 3; L++) {
        pass.setPipeline(p.forward);
        pass.setBindGroup(0, this.forwardBG[L]);
        pass.dispatchWorkgroups(Math.ceil(this.N / 8), Math.ceil(this.dims[L] / 8));
      }
      pass.setPipeline(p.loss);
      pass.setBindGroup(0, this.lossBG);
      pass.dispatchWorkgroups(Math.ceil(this.N / 64));
      pass.setPipeline(p.reduce);
      pass.setBindGroup(0, this.reduceBG);
      pass.dispatchWorkgroups(1);
      pass.end();
      d.queue.submit([enc.finish()]);
      const [loss] = await readBuf(this.lossBuf, 1);
      return loss;
    };

    // One forward+backward to populate analytic gradients.
    const encGrad = d.createCommandEncoder();
    this.step(encGrad, { lr: 0, optimizer: 'sgd' }); // lr=0 leaves params unchanged
    d.queue.submit([encGrad.finish()]);

    for (let L = 1; L <= 3; L++) {
      const inDim = this.dims[L - 1];
      const outDim = this.dims[L];
      const wCount = inDim * outDim;
      const analyticG = await readBuf(this.gW[L], wCount);
      const wData = await readBuf(this.W[L], wCount);

      for (let s = 0; s < samplesPerLayer; s++) {
        const idx = Math.floor(Math.random() * wCount);
        const orig = wData[idx];

        d.queue.writeBuffer(this.W[L], idx * 4, new Float32Array([orig + epsilon]));
        const lossPlus = await computeLoss();
        d.queue.writeBuffer(this.W[L], idx * 4, new Float32Array([orig - epsilon]));
        const lossMinus = await computeLoss();
        d.queue.writeBuffer(this.W[L], idx * 4, new Float32Array([orig]));

        const numeric = (lossPlus - lossMinus) / (2 * epsilon);
        const analytic = analyticG[idx];
        const relErr = Math.abs(numeric - analytic) / (Math.abs(numeric) + Math.abs(analytic) + 1e-8);
        report.push({ layer: L, idx, numeric, analytic, relErr });
      }
    }
    return report;
  }

  destroy() {
    this._destroyParamBuffers();
    if (this.A) this.A.slice(1).forEach((b) => b && b.destroy());
    if (this.delta) this.delta.forEach((b) => b && b.destroy());
    [this.X, this.Y, this.lossPerSample, this.lossBuf, this.boundaryBuf,
      this.gridUniformBuf, this.heatmapViewUniform, this._lossDimsBuf]
      .forEach((b) => b && b.destroy());
  }
}
