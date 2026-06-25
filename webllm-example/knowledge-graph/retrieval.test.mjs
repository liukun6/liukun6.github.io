// example/knowledge-graph/retrieval.test.mjs
// Plain Node assert tests — this repo has no test runner, so pure-logic modules
// get a standalone script invoked directly with `node`.
import assert from 'assert';
import { cosineSimilarity, topKNodes } from './retrieval.js';

function approxEqual(a, b, eps = 1e-6) {
  assert.ok(Math.abs(a - b) < eps, `expected ${a} ~= ${b}`);
}

// identical vectors -> similarity 1
approxEqual(cosineSimilarity([1, 0, 0], [1, 0, 0]), 1);
// orthogonal vectors -> similarity 0
approxEqual(cosineSimilarity([1, 0], [0, 1]), 0);
// opposite vectors -> similarity -1
approxEqual(cosineSimilarity([1, 0], [-1, 0]), -1);

const vectors = {
  a: [1, 0],
  b: [0.9, 0.1],
  c: [-1, 0],
};
const top = topKNodes([1, 0], vectors, 2);
assert.strictEqual(top.length, 2);
assert.strictEqual(top[0].id, 'a');
assert.strictEqual(top[1].id, 'b');
assert.ok(top[0].score > top[1].score);

console.log('retrieval.test.mjs: all assertions passed');
