// Loads transformers.js pipelines directly from CDN as ESM — matches this repo's
// "no build step, static CDN assets" deployment model (see design doc section on
// "static assets ≠ backend calls"). Embedding and LLM loading are separate async
// functions so callers can show distinct progress states for each.
// eslint-disable-next-line import/no-unresolved
import { env, pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2';

// Model weights are self-hosted under ./models/ (same origin as this page) rather
// than fetched from huggingface.co/hf-mirror.com at runtime: both hosts have proven
// unreachable for visitors behind the GFW (hf-mirror's /resolve/ just 308-redirects
// back to the blocked huggingface.co). Same-origin static files sidestep that for
// every visitor, anywhere, with no DNS/geo dependency.
env.allowLocalModels = true;
env.allowRemoteModels = false;
env.localModelPath = new URL('models/', import.meta.url).href;

const ORT_WASM_URL = new URL('models/onnxruntime-web/ort-wasm-simd-threaded.jsep.wasm', import.meta.url).href;

// onnxruntime-web (the WASM/WebGPU backend transformers.js runs on top of) fetches its
// own runtime binary from a hardcoded jsdelivr URL, completely outside transformers.js's
// progress_callback -- so without this, that ~21MB file (a) comes from a CDN that may be
// as unreachable as huggingface.co for some visitors, and (b) downloads with zero visible
// progress, making the page look stalled. Fetching it ourselves from the self-hosted copy
// and handing onnxruntime-web the raw bytes via `wasmBinary` skips its internal fetch
// entirely, so this is the only way to get real byte-level progress for it.
async function loadOnnxWasmBinary(onProgress) {
  const res = await fetch(ORT_WASM_URL);
  if (!res.ok) throw new Error(`Failed to load onnxruntime-web WASM runtime: ${res.status}`);
  const total = Number(res.headers.get('Content-Length')) || 0;
  const reader = res.body.getReader();
  const chunks = [];
  let received = 0;
  // Sequential by nature -- each chunk must be read before the next is available --
  // so the await-in-loop here isn't the usual missed-parallelism antipattern.
  // eslint-disable-next-line no-await-in-loop
  for (let step = await reader.read(); !step.done; step = await reader.read()) {
    chunks.push(step.value);
    received += step.value.length;
    if (total > 0) onProgress({ status: 'progress', progress: (received / total) * 100 });
  }
  const bytes = new Uint8Array(received);
  let offset = 0;
  chunks.forEach((chunk) => { bytes.set(chunk, offset); offset += chunk.length; });
  return bytes;
}

let onnxWasmReady = null;
export function ensureOnnxWasm(onProgress) {
  if (!onnxWasmReady) {
    onnxWasmReady = loadOnnxWasmBinary(onProgress).then((bytes) => {
      env.backends.onnx.wasm.wasmBinary = bytes;
    });
  }
  return onnxWasmReady;
}

const EMBEDDING_MODEL = 'Xenova/bge-small-en-v1.5';
// bge models are trained to expect this exact instruction prefix on the query side only
// (not on the corpus/node side, which node-embeddings.json was precomputed without) —
// omitting it doesn't break retrieval but measurably weakens it for short queries.
const QUERY_PREFIX = 'Represent this sentence for searching relevant passages: ';

export async function loadEmbedder(onProgress) {
  // dtype must be explicit: transformers.js defaults to fp32 (full, unquantized
  // weights) whenever WebGPU is the selected inference device, which this demo's
  // layout shader guarantees is available — silently blowing the ~100MB budget
  // (model.onnx is 133MB) in favor of the 34MB q8/model_quantized.onnx variant.
  const extractor = await pipeline('feature-extraction', EMBEDDING_MODEL, {
    dtype: 'q8',
    progress_callback: onProgress,
  });
  return async (text) => {
    const output = await extractor(QUERY_PREFIX + text, { pooling: 'mean', normalize: true });
    return Array.from(output.data);
  };
}

export async function loadNodeEmbeddings() {
  const url = new URL('node-embeddings.json', import.meta.url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load node-embeddings.json: ${res.status}`);
  return res.json();
}

const LLM_MODEL = 'HuggingFaceTB/SmolLM2-135M-Instruct';
const LLM_TIMEOUT_MS = 15000;

function withTimeout(promise, ms, fallbackValue) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(fallbackValue), ms);
    promise.then((value) => {
      clearTimeout(timer);
      resolve(value);
    }).catch(() => {
      clearTimeout(timer);
      resolve(fallbackValue);
    });
  });
}

export async function loadExplainer(onProgress) {
  // HuggingFaceTB/SmolLM2-135M-Instruct's ONNX export has no q8/int8 variant (unlike
  // the embedding model); the smallest available quantization is q4f16 (~133MB).
  const generator = await pipeline('text-generation', LLM_MODEL, {
    dtype: 'q4f16',
    progress_callback: onProgress,
  });
  return async (question, node) => {
    const fallback = `Closest match: ${node.title} — ${node.summary}`;
    const systemPrompt = 'Explain in exactly one short sentence why the given concept relates to '
      + 'the user question. Do not use lists or JSON, just one sentence.';
    const prompt = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Question: ${question}\nConcept: ${node.title} — ${node.summary}` },
    ];
    const runGeneration = generator(prompt, { max_new_tokens: 60, temperature: 0.3 })
      .then((output) => {
        const text = output[0] && output[0].generated_text;
        let last;
        if (Array.isArray(text)) {
          const lastEntry = text[text.length - 1];
          last = lastEntry ? lastEntry.content : undefined;
        } else {
          last = text;
        }
        return (typeof last === 'string' && last.trim()) ? last.trim() : fallback;
      });
    return withTimeout(runGeneration, LLM_TIMEOUT_MS, fallback);
  };
}
