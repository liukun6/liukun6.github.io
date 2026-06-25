// All WGSL kernels for the micrograd-webgpu demo, kept as plain template strings
// so the page can be deployed with zero build step (see design doc section 9).

// Generic "single layer" forward pass: A_out[b,o] = tanh( sum_i A_in[b,i]*W[i,o] + B[o] )
export const forwardLayerWGSL = /* wgsl */ `
struct Dims { inDim: u32, outDim: u32, batch: u32, _pad: u32 };

@group(0) @binding(0) var<uniform> dims: Dims;
@group(0) @binding(1) var<storage, read> A_in: array<f32>;
@group(0) @binding(2) var<storage, read> W: array<f32>;
@group(0) @binding(3) var<storage, read> B: array<f32>;
@group(0) @binding(4) var<storage, read_write> A_out: array<f32>;

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let b = gid.x;
  let o = gid.y;
  if (b >= dims.batch || o >= dims.outDim) { return; }

  var sum: f32 = B[o];
  for (var i: u32 = 0u; i < dims.inDim; i = i + 1u) {
    sum = sum + A_in[b * dims.inDim + i] * W[i * dims.outDim + o];
  }
  A_out[b * dims.outDim + o] = tanh(sum);
}
`;

// MSE loss + output-layer delta. Assumes a scalar (1-wide) output, matching the
// fixed [2, h1, h2, 1] architecture used by this demo.
export const lossAndOutputDeltaWGSL = /* wgsl */ `
struct Dims { batch: u32, _p0: u32, _p1: u32, _p2: u32 };

@group(0) @binding(0) var<uniform> dims: Dims;
@group(0) @binding(1) var<storage, read> A_out: array<f32>;
@group(0) @binding(2) var<storage, read> Y: array<f32>;
@group(0) @binding(3) var<storage, read_write> delta_out: array<f32>;
@group(0) @binding(4) var<storage, read_write> lossPerSample: array<f32>;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let b = gid.x;
  if (b >= dims.batch) { return; }

  let a = A_out[b];
  let y = Y[b];
  let d = a - y;
  let n = f32(dims.batch);

  delta_out[b] = 2.0 * d * (1.0 - a * a) / n;
  lossPerSample[b] = d * d / n;
}
`;

// Sums lossPerSample[0..batch) into lossBuf[0]. Batch sizes in this demo are small
// (hand-placed/preset 2D points), so a single workgroup sequential sum is fine and
// avoids needing atomic<f32> support.
export const reduceLossWGSL = /* wgsl */ `
struct N { batch: u32, _p0: u32, _p1: u32, _p2: u32 };

@group(0) @binding(0) var<uniform> n: N;
@group(0) @binding(1) var<storage, read> lossPerSample: array<f32>;
@group(0) @binding(2) var<storage, read_write> lossBuf: array<f32>;

@compute @workgroup_size(1)
fn main() {
  var s: f32 = 0.0;
  for (var i: u32 = 0u; i < n.batch; i = i + 1u) {
    s = s + lossPerSample[i];
  }
  lossBuf[0] = s;
}
`;

// delta_prev[b,i] = ( sum_o delta_next[b,o] * W[i,o] ) * (1 - A_prev[b,i]^2)
export const backpropDeltaWGSL = /* wgsl */ `
struct Dims { inDim: u32, outDim: u32, batch: u32, _pad: u32 };

@group(0) @binding(0) var<uniform> dims: Dims;
@group(0) @binding(1) var<storage, read> delta_next: array<f32>;
@group(0) @binding(2) var<storage, read> W: array<f32>;
@group(0) @binding(3) var<storage, read> A_prev: array<f32>;
@group(0) @binding(4) var<storage, read_write> delta_prev: array<f32>;

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let b = gid.x;
  let i = gid.y;
  if (b >= dims.batch || i >= dims.inDim) { return; }

  var s: f32 = 0.0;
  for (var o: u32 = 0u; o < dims.outDim; o = o + 1u) {
    s = s + delta_next[b * dims.outDim + o] * W[i * dims.outDim + o];
  }
  let a = A_prev[b * dims.inDim + i];
  delta_prev[b * dims.inDim + i] = s * (1.0 - a * a);
}
`;

// gW[i,o] = sum_b A_prev[b,i] * delta[b,o]; gb[o] = sum_b delta[b,o]
export const gradWeightWGSL = /* wgsl */ `
struct Dims { inDim: u32, outDim: u32, batch: u32, _pad: u32 };

@group(0) @binding(0) var<uniform> dims: Dims;
@group(0) @binding(1) var<storage, read> A_prev: array<f32>;
@group(0) @binding(2) var<storage, read> delta: array<f32>;
@group(0) @binding(3) var<storage, read_write> gW: array<f32>;
@group(0) @binding(4) var<storage, read_write> gb: array<f32>;

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let i = gid.x;
  let o = gid.y;
  if (i >= dims.inDim || o >= dims.outDim) { return; }

  var s: f32 = 0.0;
  for (var b: u32 = 0u; b < dims.batch; b = b + 1u) {
    s = s + A_prev[b * dims.inDim + i] * delta[b * dims.outDim + o];
  }
  gW[i * dims.outDim + o] = s;

  if (i == 0u) {
    var sb: f32 = 0.0;
    for (var b: u32 = 0u; b < dims.batch; b = b + 1u) {
      sb = sb + delta[b * dims.outDim + o];
    }
    gb[o] = sb;
  }
}
`;

export const sgdUpdateWGSL = /* wgsl */ `
struct U { lr: f32, count: u32, _p0: u32, _p1: u32 };

@group(0) @binding(0) var<uniform> u: U;
@group(0) @binding(1) var<storage, read_write> param: array<f32>;
@group(0) @binding(2) var<storage, read> grad: array<f32>;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let idx = gid.x;
  if (idx >= u.count) { return; }
  param[idx] = param[idx] - u.lr * grad[idx];
}
`;

export const adamUpdateWGSL = /* wgsl */ `
struct U { lr: f32, beta1: f32, beta2: f32, eps: f32, t: f32, count: u32, _p0: u32, _p1: u32 };

@group(0) @binding(0) var<uniform> u: U;
@group(0) @binding(1) var<storage, read_write> param: array<f32>;
@group(0) @binding(2) var<storage, read> grad: array<f32>;
@group(0) @binding(3) var<storage, read_write> m: array<f32>;
@group(0) @binding(4) var<storage, read_write> v: array<f32>;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let idx = gid.x;
  if (idx >= u.count) { return; }

  let g = grad[idx];
  let m1 = u.beta1 * m[idx] + (1.0 - u.beta1) * g;
  let v1 = u.beta2 * v[idx] + (1.0 - u.beta2) * g * g;
  m[idx] = m1;
  v[idx] = v1;

  let mhat = m1 / (1.0 - pow(u.beta1, u.t));
  let vhat = v1 / (1.0 - pow(u.beta2, u.t));
  param[idx] = param[idx] - u.lr * mhat / (sqrt(vhat) + u.eps);
}
`;

// Decision-boundary grid: runs a full [2 -> h1 -> h2 -> 1] forward pass per texel.
// MAX_HIDDEN bounds the WGSL local arrays; the UI clamps hidden width to this.
export const MAX_HIDDEN = 64;

export const inferenceGridWGSL = /* wgsl */ `
const MAX_HIDDEN: u32 = ${MAX_HIDDEN}u;

struct Grid {
  resX: u32, resY: u32, h1: u32, h2: u32,
  xmin: f32, xmax: f32, ymin: f32, ymax: f32,
};

@group(0) @binding(0) var<uniform> g: Grid;
@group(0) @binding(1) var<storage, read> W1: array<f32>;
@group(0) @binding(2) var<storage, read> b1: array<f32>;
@group(0) @binding(3) var<storage, read> W2: array<f32>;
@group(0) @binding(4) var<storage, read> b2: array<f32>;
@group(0) @binding(5) var<storage, read> W3: array<f32>;
@group(0) @binding(6) var<storage, read> b3: array<f32>;
@group(0) @binding(7) var<storage, read_write> outBuf: array<f32>;

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let gx = gid.x;
  let gy = gid.y;
  if (gx >= g.resX || gy >= g.resY) { return; }

  let x = g.xmin + (g.xmax - g.xmin) * (f32(gx) + 0.5) / f32(g.resX);
  let y = g.ymin + (g.ymax - g.ymin) * (f32(gy) + 0.5) / f32(g.resY);

  var h1out: array<f32, MAX_HIDDEN>;
  for (var o: u32 = 0u; o < g.h1; o = o + 1u) {
    var s = b1[o] + x * W1[0u * g.h1 + o] + y * W1[1u * g.h1 + o];
    h1out[o] = tanh(s);
  }

  var h2out: array<f32, MAX_HIDDEN>;
  for (var o: u32 = 0u; o < g.h2; o = o + 1u) {
    var s = b2[o];
    for (var i: u32 = 0u; i < g.h1; i = i + 1u) {
      s = s + h1out[i] * W2[i * g.h2 + o];
    }
    h2out[o] = tanh(s);
  }

  var s = b3[0];
  for (var i: u32 = 0u; i < g.h2; i = i + 1u) {
    s = s + h2out[i] * W3[i];
  }
  let outVal = tanh(s);

  outBuf[gy * g.resX + gx] = outVal;
}
`;

// Fullscreen-triangle render of the decision-boundary grid (a plain storage buffer,
// not a storage texture, so read access works without needing the
// readonly-and-readwrite-storage-textures feature) with a diverging colormap.
export const heatmapRenderWGSL = /* wgsl */ `
struct View { canvasW: f32, canvasH: f32, gridW: f32, gridH: f32 };

@group(0) @binding(0) var<uniform> view: View;
@group(0) @binding(1) var<storage, read> boundaryBuf: array<f32>;

struct VOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) uv: vec2<f32>,
};

@vertex
fn vmain(@builtin(vertex_index) vid: u32) -> VOut {
  var positions = array<vec2<f32>, 3>(
    vec2<f32>(-1.0, -1.0),
    vec2<f32>(3.0, -1.0),
    vec2<f32>(-1.0, 3.0),
  );
  var out: VOut;
  let p = positions[vid];
  out.pos = vec4<f32>(p, 0.0, 1.0);
  // uv.y = 0 at screen bottom (data ymin), uv.y = 1 at screen top (data ymax),
  // matching the conventional "up = positive y" orientation used by the overlay canvas.
  out.uv = vec2<f32>((p.x + 1.0) * 0.5, (p.y + 1.0) * 0.5);
  return out;
}

fn sampleBilinear(uv: vec2<f32>) -> f32 {
  let texSize = vec2<f32>(view.gridW, view.gridH);
  let fpos = clamp(uv, vec2<f32>(0.0), vec2<f32>(1.0)) * texSize - 0.5;
  let base = floor(fpos);
  let frac = fpos - base;

  let x0 = clamp(i32(base.x), 0, i32(view.gridW) - 1);
  let x1 = clamp(i32(base.x) + 1, 0, i32(view.gridW) - 1);
  let y0 = clamp(i32(base.y), 0, i32(view.gridH) - 1);
  let y1 = clamp(i32(base.y) + 1, 0, i32(view.gridH) - 1);

  let gw = i32(view.gridW);
  let v00 = boundaryBuf[y0 * gw + x0];
  let v10 = boundaryBuf[y0 * gw + x1];
  let v01 = boundaryBuf[y1 * gw + x0];
  let v11 = boundaryBuf[y1 * gw + x1];

  let vx0 = mix(v00, v10, frac.x);
  let vx1 = mix(v01, v11, frac.x);
  return mix(vx0, vx1, frac.y);
}

@fragment
fn fmain(in: VOut) -> @location(0) vec4<f32> {
  let v = clamp(sampleBilinear(in.uv), -1.0, 1.0);
  let blue_color = vec3<f32>(0.28, 0.48, 0.88);  // slightly lighter, softer version of original blue
  let neutral = vec3<f32>(0.06, 0.07, 0.11);      // original dark background color
  let red_color = vec3<f32>(0.85, 0.35, 0.32);   // slightly lighter, softer version of original red

  var color: vec3<f32>;
  if (v < 0.0) {
    color = mix(neutral, blue_color, -v);
  } else {
    color = mix(neutral, red_color, v);
  }
  return vec4<f32>(color, 1.0);
}
`;
