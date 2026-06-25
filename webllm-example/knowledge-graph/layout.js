// Relative imports here use explicit .js extensions because this runs as native
// browser ESM with no build step (matches example/knowledge-graph/main.js).
// eslint-disable-next-line import/extensions
import { computeForcesWGSL, integrateWGSL } from './shaders.js';
// eslint-disable-next-line import/extensions
import { AsyncReadback } from '../shared/readback.js';

// Builds an undirected CSR adjacency (neighborOffset/neighborIndex) from the
// directed EDGES list — each edge contributes a neighbor entry in both directions
// so the spring force is symmetric.
function buildAdjacency(nodes, edges) {
  const idToIndex = new Map(nodes.map((n, i) => [n.id, i]));
  const adjacency = nodes.map(() => []);
  edges.forEach(({ from, to }) => {
    const a = idToIndex.get(from);
    const b = idToIndex.get(to);
    if (a === undefined || b === undefined) return;
    adjacency[a].push(b);
    adjacency[b].push(a);
  });
  const neighborOffset = new Uint32Array(nodes.length + 1);
  const neighborIndexList = [];
  adjacency.forEach((list, i) => {
    neighborOffset[i] = neighborIndexList.length;
    neighborIndexList.push(...list);
  });
  neighborOffset[nodes.length] = neighborIndexList.length;
  return { neighborOffset, neighborIndex: new Uint32Array(neighborIndexList) };
}

function randomInitialPositions(count, spread = 3) {
  const arr = new Float32Array(count * 4);
  for (let i = 0; i < count; i++) {
    arr[i * 4] = (Math.random() - 0.5) * spread;
    arr[i * 4 + 1] = (Math.random() - 0.5) * spread;
    arr[i * 4 + 2] = (Math.random() - 0.5) * spread;
    arr[i * 4 + 3] = 0;
  }
  return arr;
}

export class ForceDirectedLayout {
  constructor(device, nodes, edges, params = {}) {
    this.device = device;
    this.nodeCount = nodes.length;
    const { neighborOffset, neighborIndex } = buildAdjacency(nodes, edges);

    const vec4Size = this.nodeCount * 4 * 4;
    this.posBuf = device.createBuffer({
      label: 'pos',
      size: vec4Size,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
    });
    this.velBuf = device.createBuffer({
      label: 'vel',
      size: vec4Size,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });
    this.forceBuf = device.createBuffer({ label: 'force', size: vec4Size, usage: GPUBufferUsage.STORAGE });
    this.neighborOffsetBuf = device.createBuffer({
      label: 'neighborOffset',
      size: neighborOffset.byteLength,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });
    this.neighborIndexBuf = device.createBuffer({
      label: 'neighborIndex',
      size: Math.max(neighborIndex.byteLength, 4),
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });
    this.paramsBuf = device.createBuffer({
      label: 'params',
      size: 32,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    device.queue.writeBuffer(this.posBuf, 0, randomInitialPositions(this.nodeCount));
    device.queue.writeBuffer(this.velBuf, 0, new Float32Array(this.nodeCount * 4));
    device.queue.writeBuffer(this.neighborOffsetBuf, 0, neighborOffset);
    if (neighborIndex.byteLength > 0) device.queue.writeBuffer(this.neighborIndexBuf, 0, neighborIndex);

    const repulsion = params.repulsion !== undefined ? params.repulsion : 0.6;
    const springK = params.springK !== undefined ? params.springK : 1.2;
    const damping = params.damping !== undefined ? params.damping : 0.9;
    const dt = params.dt !== undefined ? params.dt : 0.016;
    // Keeps weakly-connected/isolated nodes from drifting outward forever (no force
    // otherwise opposes pure repulsion for nodes with few or no edges).
    const centering = params.centering !== undefined ? params.centering : 0.08;
    device.queue.writeBuffer(this.paramsBuf, 0, new Uint32Array([this.nodeCount]));
    device.queue.writeBuffer(this.paramsBuf, 4, new Float32Array([repulsion, springK, damping, dt, centering]));

    const forcesModule = device.createShaderModule({ code: computeForcesWGSL });
    const integrateModule = device.createShaderModule({ code: integrateWGSL });
    this.forcesPipeline = device.createComputePipeline({
      layout: 'auto',
      compute: { module: forcesModule, entryPoint: 'main' },
    });
    this.integratePipeline = device.createComputePipeline({
      layout: 'auto',
      compute: { module: integrateModule, entryPoint: 'main' },
    });

    this.forcesBindGroup = device.createBindGroup({
      layout: this.forcesPipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: this.paramsBuf } },
        { binding: 1, resource: { buffer: this.posBuf } },
        { binding: 2, resource: { buffer: this.forceBuf } },
        { binding: 3, resource: { buffer: this.neighborOffsetBuf } },
        { binding: 4, resource: { buffer: this.neighborIndexBuf } },
      ],
    });
    this.integrateBindGroup = device.createBindGroup({
      layout: this.integratePipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: this.paramsBuf } },
        { binding: 1, resource: { buffer: this.posBuf } },
        { binding: 2, resource: { buffer: this.velBuf } },
        { binding: 3, resource: { buffer: this.forceBuf } },
      ],
    });

    this.workgroups = Math.ceil(this.nodeCount / 64);
    this.readback = new AsyncReadback(device, vec4Size, 'layoutPosReadback');
  }

  step(encoder) {
    const pass = encoder.beginComputePass();
    pass.setPipeline(this.forcesPipeline);
    pass.setBindGroup(0, this.forcesBindGroup);
    pass.dispatchWorkgroups(this.workgroups);
    pass.setPipeline(this.integratePipeline);
    pass.setBindGroup(0, this.integrateBindGroup);
    pass.dispatchWorkgroups(this.workgroups);
    pass.end();
  }

  requestPositions(onData) {
    this.readback.requestRead(onData);
  }

  copyPositionsForReadback(encoder) {
    this.readback.copyFrom(encoder, this.posBuf);
  }

  resetPositions(nodes) {
    this.device.queue.writeBuffer(this.posBuf, 0, randomInitialPositions(nodes.length));
    this.device.queue.writeBuffer(this.velBuf, 0, new Float32Array(nodes.length * 4));
  }

  destroy() {
    [this.posBuf, this.velBuf, this.forceBuf, this.neighborOffsetBuf, this.neighborIndexBuf, this.paramsBuf]
      .forEach((b) => b.destroy());
    this.readback.destroy();
  }
}
