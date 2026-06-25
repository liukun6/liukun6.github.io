// Deterministic node selection: zero LLM involvement, zero hallucination risk.
// The LLM (agent.js) only ever explains the top result chosen here — it never
// picks the result itself.
export function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

export function topKNodes(queryVec, vectors, k) {
  const scored = Object.keys(vectors).map((id) => ({
    id,
    score: cosineSimilarity(queryVec, vectors[id]),
  }));
  scored.sort((x, y) => y.score - x.score);
  return scored.slice(0, k);
}
