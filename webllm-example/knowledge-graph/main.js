// Relative imports here use explicit .js extensions because this runs as native
// browser ESM with no build step (matches the existing example/micrograd/main.js
// pattern, which has the same import/no-unresolved-by-this-config tradeoff).
// eslint-disable-next-line import/extensions
import { NODES, EDGES } from './graph-data.js';
import {
  loadEmbedder, loadNodeEmbeddings, loadExplainer, ensureOnnxWasm,
  // eslint-disable-next-line import/extensions
} from './agent.js';
// eslint-disable-next-line import/extensions
import { topKNodes } from './retrieval.js';
// eslint-disable-next-line import/extensions
import { ForceDirectedLayout } from './layout.js';
// eslint-disable-next-line import/extensions
import { GraphScene } from './scene.js';
// eslint-disable-next-line import/extensions
import { requestWebGPUDevice } from '../shared/webgpu-capability.js';

const statusIndicator = document.getElementById('status-indicator');
const canvas = document.getElementById('gpu-canvas');

function setStatus(text, type = 'info') {
  statusIndicator.className = `status ${type}`;
  statusIndicator.textContent = text;
}

async function main() {
  let device;
  try {
    ({ device } = await requestWebGPUDevice());
  } catch (err) {
    setStatus(err.message, 'error');
    document.getElementById('degraded-hint').style.display = 'block';
    return;
  }

  const layout = new ForceDirectedLayout(device, NODES, EDGES);
  const scene = new GraphScene(canvas, device, NODES, EDGES);
  await scene.init();

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    canvas.width = w;
    canvas.height = h;
    scene.resize(w, h);
  }
  resize();
  window.addEventListener('resize', resize);

  let latestPositions = null;
  function onFrame() {
    const encoder = device.createCommandEncoder();
    layout.step(encoder);
    layout.copyPositionsForReadback(encoder);
    device.queue.submit([encoder.finish()]);
    layout.requestPositions((data) => { latestPositions = data; });
    if (latestPositions) scene.updatePositions(latestPositions);
    scene.render();
    requestAnimationFrame(onFrame);
  }

  requestAnimationFrame(onFrame);

  // The WASM runtime download is fetched/instrumented separately (see agent.js's
  // ensureOnnxWasm) so it gets its own real percentage instead of being silently bundled
  // into -- and mistaken for missing from -- the model download phase below.
  setStatus('Loading runtime...');
  await ensureOnnxWasm((p) => {
    if (p.status === 'progress') setStatus(`Loading runtime... ${Math.round(p.progress)}%`);
  });

  setStatus('Loading embedding model...');
  const { vectors } = await loadNodeEmbeddings();
  const embed = await loadEmbedder((p) => {
    if (p.status === 'progress') setStatus(`Loading embedding model... ${Math.round(p.progress)}%`);
  });
  // onnxruntime-web's WebGPU/JSEP backend can still be settling shader-pipeline
  // compilation on its very first dispatch even after pipeline() has resolved, which has
  // been observed to produce a degraded embedding for that first call only. Absorbing
  // that cold-start cost here, before "Ready", keeps it from corrupting the user's actual
  // first query.
  await embed('warm up');

  setStatus('Loading language model...');
  const explain = await loadExplainer((p) => {
    if (p.status === 'progress') setStatus(`Loading language model... ${Math.round(p.progress)}%`);
  });
  setStatus('Ready.', 'success');

  const queryInput = document.getElementById('query-input');
  const askBtn = document.getElementById('ask-btn');
  const explanationCard = document.getElementById('explanation-card');

  let asking = false;
  async function handleAsk() {
    const text = queryInput.value.trim();
    if (!text || asking) return;
    asking = true;
    askBtn.disabled = true;
    explanationCard.textContent = 'Thinking...';
    try {
      const vec = await embed(text);
      const top = topKNodes(vec, vectors, 3);
      const topIndex = NODES.findIndex((n) => n.id === top[0].id);
      const topNode = NODES[topIndex];
      scene.setHighlight(topIndex);
      scene.flyTo(topIndex);
      const explanation = await explain(text, topNode);
      const relatedTitles = top.slice(1)
        .map((r) => NODES.find((n) => n.id === r.id).title)
        .join(', ');
      const relatedSuffix = relatedTitles ? ` (also related: ${relatedTitles})` : '';
      explanationCard.textContent = `${topNode.title}: ${explanation}${relatedSuffix}`;
    } catch (err) {
      explanationCard.textContent = `Something went wrong: ${err.message}`;
    } finally {
      asking = false;
      askBtn.disabled = false;
    }
  }

  askBtn.addEventListener('click', handleAsk);
  queryInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleAsk(); });

  const relayoutBtn = document.getElementById('relayout-btn');
  if (relayoutBtn) {
    relayoutBtn.addEventListener('click', () => {
      layout.resetPositions(NODES);
    });
  }
}

main().catch((err) => {
  console.error(err);
  setStatus(`Initialization failed: ${err.message}`, 'error');
});
