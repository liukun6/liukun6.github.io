import { Network } from './network.js';
import { AsyncReadback } from '../shared/readback.js';
import { Overlay, pixelToData } from './render.js';
import { DATASETS } from './datasets.js';
import { requestWebGPUDevice } from '../shared/webgpu-capability.js';

const DOMAIN = { xmin: -1.4, xmax: 1.4, ymin: -1.4, ymax: 1.4 };
const GRID_RES = 96;

const gpuCanvas = document.getElementById('gpu-canvas');
const overlayCanvas = document.getElementById('overlay-canvas');
const statusIndicator = document.getElementById('status-indicator');
const consoleOut = document.getElementById('console-out');

const lrSlider = document.getElementById('lr-slider');
const lrLabel = document.getElementById('lr-label');
const h1Slider = document.getElementById('h1-slider');
const h2Slider = document.getElementById('h2-slider');
const h1Label = document.getElementById('h1-label');
const h2Label = document.getElementById('h2-label');
const optimizerSelect = document.getElementById('optimizer-select');
const stepsSlider = document.getElementById('steps-slider');
const stepsLabel = document.getElementById('steps-label');

const trainBtn = document.getElementById('train-btn');
const stepBtn = document.getElementById('step-btn');
const resetParamsBtn = document.getElementById('reset-params-btn');
const clearDataBtn = document.getElementById('clear-data-btn');
const checkBtn = document.getElementById('check-btn');
const presetButtons = document.querySelectorAll('[data-preset]');

function log(message, type = 'log') {
  const line = document.createElement('div');
  line.className = `console-line ${type}`;
  line.textContent = message;
  consoleOut.appendChild(line);
  consoleOut.scrollTop = consoleOut.scrollHeight;
}

function setStatus(text, type = 'info') {
  statusIndicator.className = `status ${type}`;
  statusIndicator.textContent = text;
}

// Live JS-side mirror of the dataset; the GPU buffers are rewritten whenever it changes.
const state = {
  points: [], // { x, y, label }
  training: false,
  lr: 0.05,
  optimizer: 'sgd',
  stepsPerFrame: 2,
  h1: 16,
  h2: 16,
  busy: false,
  activeLabel: 1,
};

function pointsToBuffers() {
  const N = state.points.length;
  const X = new Float32Array(N * 2);
  const Y = new Float32Array(N);
  state.points.forEach((p, i) => {
    X[i * 2] = p.x;
    X[i * 2 + 1] = p.y;
    Y[i] = p.label;
  });
  return { X, Y, N };
}

async function main() {
  let device;
  try {
    ({ device } = await requestWebGPUDevice());
  } catch (err) {
    setStatus(err.message, 'error');
    log(err.message, 'error');
    return;
  }
  log('WebGPU device acquired.', 'success');

  const gpuContext = gpuCanvas.getContext('webgpu');
  const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
  gpuContext.configure({ device, format: canvasFormat, alphaMode: 'opaque' });

  const network = new Network(device, canvasFormat);
  network.setArchitecture(state.h1, state.h2);
  network.setupBoundaryGrid(GRID_RES, GRID_RES, DOMAIN);

  const overlay = new Overlay(overlayCanvas);

  const lossReadback = new AsyncReadback(device, 4, 'lossReadback');
  const weightSnapshot = { W1: new Float32Array(0), W2: new Float32Array(0), W3: new Float32Array(0) };
  let weightReaders = null;

  function rebuildWeightReaders() {
    if (weightReaders) {
      weightReaders.W1.destroy();
      weightReaders.W2.destroy();
      weightReaders.W3.destroy();
    }
    weightReaders = {
      W1: new AsyncReadback(device, network.dims[0] * network.dims[1] * 4, 'wRead1'),
      W2: new AsyncReadback(device, network.dims[1] * network.dims[2] * 4, 'wRead2'),
      W3: new AsyncReadback(device, network.dims[2] * network.dims[3] * 4, 'wRead3'),
    };
  }
  rebuildWeightReaders();

  function resizeCanvases() {
    const rect = gpuCanvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    [gpuCanvas, overlayCanvas].forEach((c) => {
      if (c.width !== w) c.width = w;
      if (c.height !== h) c.height = h;
    });
    network.setCanvasSize(w, h);
  }
  resizeCanvases();
  window.addEventListener('resize', resizeCanvases);

  function applyDataset() {
    const { X, Y, N } = pointsToBuffers();
    network.setDataset(X, Y, N);
  }

  function loadPreset(name) {
    const { X, Y, N } = DATASETS[name]();
    state.points = [];
    for (let i = 0; i < N; i++) {
      state.points.push({ x: X[i * 2], y: X[i * 2 + 1], label: Y[i] });
    }

    // Reset network parameters, loss history, and heatmap to start fresh
    network.setArchitecture(state.h1, state.h2);
    rebuildWeightReaders();
    overlay.lossHistory = [];
    network.clearBoundaryGrid();

    applyDataset();
    log(`Loaded "${name}" dataset (${N} points).`, 'info');
  }

  // ---- UI wiring ----

  function updateLrLabel() {
    const t = Number(lrSlider.value) / 1000; // slider is 0..1000 -> log scale
    state.lr = 10 ** (-3 + t * 3); // 1e-3 .. 1e0
    lrLabel.textContent = state.lr.toFixed(4);
  }
  lrSlider.addEventListener('input', updateLrLabel);
  updateLrLabel();

  h1Slider.addEventListener('input', () => {
    state.h1 = Number(h1Slider.value);
    h1Label.textContent = state.h1;
  });
  h2Slider.addEventListener('input', () => {
    state.h2 = Number(h2Slider.value);
    h2Label.textContent = state.h2;
  });

  optimizerSelect.addEventListener('change', () => {
    state.optimizer = optimizerSelect.value;
  });

  stepsSlider.addEventListener('input', () => {
    state.stepsPerFrame = Number(stepsSlider.value);
    stepsLabel.textContent = state.stepsPerFrame;
  });

  trainBtn.addEventListener('click', () => {
    state.training = !state.training;
    trainBtn.textContent = state.training ? 'Pause' : 'Train';
  });

  stepBtn.addEventListener('click', () => {
    if (state.busy) return;
    const encoder = device.createCommandEncoder();
    network.step(encoder, { lr: state.lr, optimizer: state.optimizer });
    device.queue.submit([encoder.finish()]);
  });

  resetParamsBtn.addEventListener('click', () => {
    network.setArchitecture(state.h1, state.h2);
    rebuildWeightReaders();
    overlay.lossHistory = [];
    log(`Network reset: hidden = [${state.h1}, ${state.h2}].`, 'info');
  });

  clearDataBtn.addEventListener('click', () => {
    state.points = [];
    
    // Reset network parameters, loss history, and heatmap to start fresh
    network.setArchitecture(state.h1, state.h2);
    rebuildWeightReaders();
    overlay.lossHistory = [];
    network.clearBoundaryGrid();

    applyDataset();
    state.training = false;
    trainBtn.textContent = 'Train';
    log('Dataset cleared.', 'info');
  });

  presetButtons.forEach((btn) => {
    btn.addEventListener('click', () => loadPreset(btn.dataset.preset));
  });

  checkBtn.addEventListener('click', async () => {
    if (state.points.length === 0) {
      log('Self-check skipped: no data points loaded.', 'error');
      return;
    }
    state.busy = true;
    const wasTraining = state.training;
    state.training = false;
    log('Running numerical gradient check...', 'header');
    try {
      const report = await network.numericGradCheck(1e-4, 3);
      let maxErr = 0;
      report.forEach((r) => {
        maxErr = Math.max(maxErr, r.relErr);
        log(`layer ${r.layer} idx ${r.idx}: numeric=${r.numeric.toExponential(3)} analytic=${r.analytic.toExponential(3)} relErr=${r.relErr.toExponential(3)}`);
      });
      if (maxErr < 1e-2) {
        log(`Gradient check PASSED (max relative error ${maxErr.toExponential(3)}).`, 'success');
      } else {
        log(`Gradient check FAILED (max relative error ${maxErr.toExponential(3)}).`, 'error');
      }
    } catch (err) {
      log(`Gradient check error: ${err.message}`, 'error');
    } finally {
      state.training = wasTraining;
      state.busy = false;
    }
  });

  // Legend toggle: picks which class left-click/drag adds. Right-click/drag
  // always adds the other class, regardless of the toggle.
  const classABtn = document.getElementById('class-a-btn');
  const classBBtn = document.getElementById('class-b-btn');
  function setActiveLabel(label) {
    state.activeLabel = label;
    classABtn.classList.toggle('active', label === 1);
    classBBtn.classList.toggle('active', label === -1);
  }
  classABtn.addEventListener('click', () => setActiveLabel(1));
  classBBtn.addEventListener('click', () => setActiveLabel(-1));
  setActiveLabel(state.activeLabel);

  // Click / drag to add points: left click = currently selected class,
  // right click = the other class.
  let dragLabel = null;
  function addPointFromEvent(evt, label) {
    const rect = overlayCanvas.getBoundingClientRect();
    const px = ((evt.clientX - rect.left) / rect.width) * overlayCanvas.width;
    const py = ((evt.clientY - rect.top) / rect.height) * overlayCanvas.height;
    const [x, y] = pixelToData(px, py, DOMAIN, overlayCanvas.width, overlayCanvas.height);
    state.points.push({ x, y, label });
    applyDataset();
  }
  overlayCanvas.addEventListener('contextmenu', (e) => e.preventDefault());
  overlayCanvas.addEventListener('mousedown', (evt) => {
    dragLabel = evt.button === 2 ? -state.activeLabel : state.activeLabel;
    addPointFromEvent(evt, dragLabel);
  });
  overlayCanvas.addEventListener('mousemove', (evt) => {
    if (dragLabel === null) return;
    if (!(evt.buttons & (1 | 2))) { dragLabel = null; return; }
    addPointFromEvent(evt, dragLabel);
  });
  window.addEventListener('mouseup', () => { dragLabel = null; });

  // ---- Frame loop ----

  let frame = 0;
  function onFrame() {
    const encoder = device.createCommandEncoder();

    if (state.training && !state.busy && state.points.length > 0) {
      for (let k = 0; k < state.stepsPerFrame; k++) {
        network.step(encoder, { lr: state.lr, optimizer: state.optimizer });
      }
    }

    if (state.points.length > 0) {
      network.encodeInferenceGrid(encoder);
    }
    lossReadback.copyFrom(encoder, network.lossBuf);

    const view = gpuContext.getCurrentTexture().createView();
    network.encodeHeatmapRender(encoder, view);

    device.queue.submit([encoder.finish()]);

    lossReadback.requestRead((data) => overlay.pushLoss(data[0]));
    if (weightReaders) {
      weightReaders.W1.requestRead((d) => { weightSnapshot.W1 = d.slice(); });
      weightReaders.W2.requestRead((d) => { weightSnapshot.W2 = d.slice(); });
      weightReaders.W3.requestRead((d) => { weightSnapshot.W3 = d.slice(); });
    }

    overlay.clear();
    const { X, Y, N } = pointsToBuffers();
    overlay.drawPoints(X, Y, N, DOMAIN);

    const w = overlayCanvas.width;
    const h = overlayCanvas.height;
    overlay.drawNetworkDiagram(network.dims, weightSnapshot, {
      x: 12, y: 12, w: Math.min(260, w * 0.4), h: Math.min(180, h * 0.35),
    });
    overlay.drawLossCurve({
      x: w - Math.min(260, w * 0.4) - 12, y: h - Math.min(140, h * 0.28) - 12,
      w: Math.min(260, w * 0.4), h: Math.min(140, h * 0.28),
    });

    frame += 1;
    requestAnimationFrame(onFrame);
  }

  loadPreset('moons');
  setStatus('Ready. Click "Train" to start, or click the canvas to add your own points.', 'success');
  requestAnimationFrame(onFrame);
}

main().catch((err) => {
  console.error(err);
  setStatus(`Initialization failed: ${err.message}`, 'error');
  log(`Fatal error: ${err.message}`, 'error');
});
