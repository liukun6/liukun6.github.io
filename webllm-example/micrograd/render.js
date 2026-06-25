// Canvas2D overlay drawn on top of the WebGPU heatmap canvas (same size, transparent
// background). Handles data points, the network-structure diagram, and the loss
// curve — per the design doc's own suggestion to keep these layers "most economical"
// as plain 2D drawing rather than extra WebGPU render passes.

export function dataToPixel(x, y, domain, w, h) {
  const px = ((x - domain.xmin) / (domain.xmax - domain.xmin)) * w;
  const py = h - ((y - domain.ymin) / (domain.ymax - domain.ymin)) * h;
  return [px, py];
}

export function pixelToData(px, py, domain, w, h) {
  const x = domain.xmin + (px / w) * (domain.xmax - domain.xmin);
  const y = domain.ymin + (1 - py / h) * (domain.ymax - domain.ymin);
  return [x, y];
}

export class Overlay {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.lossHistory = [];
    this.maxLossPoints = 300;
  }

  clear() {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawPoints(X, Y, N, domain) {
    const { ctx, canvas } = this;
    const w = canvas.width;
    const h = canvas.height;
    for (let i = 0; i < N; i++) {
      const [px, py] = dataToPixel(X[i * 2], X[i * 2 + 1], domain, w, h);
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fillStyle = Y[i] > 0 ? '#34d399' : '#f87171';
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(255,255,255,0.6)';
      ctx.stroke();
    }
  }

  // weights: { W1: Float32Array, W2, W3 }, dims: [2, h1, h2, 1]
  drawNetworkDiagram(dims, weights, rect) {
    const { ctx } = this;
    const { x, y, w, h } = rect;
    ctx.save();
    ctx.fillStyle = 'rgba(10, 11, 18, 0.55)';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.strokeRect(x, y, w, h);

    const layerCount = dims.length;
    const colX = layerCount > 1
      ? dims.map((_, i) => x + (w * (i + 0.5)) / layerCount)
      : [x + w / 2];
    const nodePos = dims.map((count, li) => {
      const pad = h * 0.12;
      const usable = h - pad * 2;
      return Array.from({ length: count }, (_, ni) => ({
        cx: colX[li],
        cy: count === 1 ? y + h / 2 : y + pad + (usable * ni) / (count - 1),
      }));
    });

    const weightArrays = [null, weights.W1, weights.W2, weights.W3];
    for (let L = 1; L < layerCount; L++) {
      const inDim = dims[L - 1];
      const outDim = dims[L];
      const W = weightArrays[L];
      if (!W) continue;
      let maxAbs = 1e-6;
      for (let k = 0; k < W.length; k++) maxAbs = Math.max(maxAbs, Math.abs(W[k]));

      for (let i = 0; i < inDim; i++) {
        for (let o = 0; o < outDim; o++) {
          const wv = W[i * outDim + o];
          const a = nodePos[L - 1][i];
          const b = nodePos[L][o];
          ctx.beginPath();
          ctx.moveTo(a.cx, a.cy);
          ctx.lineTo(b.cx, b.cy);
          ctx.lineWidth = 0.4 + 2.2 * (Math.abs(wv) / maxAbs);
          ctx.strokeStyle = wv >= 0 ? 'rgba(52, 211, 153, 0.75)' : 'rgba(248, 113, 113, 0.75)';
          ctx.stroke();
        }
      }
    }

    for (let li = 0; li < layerCount; li++) {
      for (const n of nodePos[li]) {
        ctx.beginPath();
        ctx.arc(n.cx, n.cy, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#e5e7eb';
        ctx.fill();
      }
    }
    ctx.restore();
  }

  pushLoss(value) {
    this.lossHistory.push(value);
    if (this.lossHistory.length > this.maxLossPoints) this.lossHistory.shift();
  }

  drawLossCurve(rect) {
    const { ctx } = this;
    const { x, y, w, h } = rect;
    ctx.save();
    ctx.fillStyle = 'rgba(10, 11, 18, 0.55)';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.strokeRect(x, y, w, h);

    const hist = this.lossHistory;
    if (hist.length < 2) {
      ctx.restore();
      return;
    }
    const maxV = Math.max(...hist, 1e-6);
    ctx.beginPath();
    hist.forEach((v, i) => {
      const px = x + (w * i) / (this.maxLossPoints - 1);
      const py = y + h - (h * v) / maxV;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#c084fc';
    ctx.font = '12px JetBrains Mono, monospace';
    ctx.fillText(`loss: ${hist[hist.length - 1].toFixed(4)}`, x + 8, y + 16);
    ctx.restore();
  }
}
