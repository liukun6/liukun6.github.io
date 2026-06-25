// Force-directed layout: every node repels every other node (Coulomb-style,
// O(n^2), fine for <=30 nodes) and edges pull connected nodes together
// (Hooke's law). Positions/velocities/forces are stored as vec4 (w unused)
// purely to get natural 16-byte WGSL storage alignment with a flat
// Float32Array(stride 4) on the JS side.
const PARAMS_STRUCT = /* wgsl */ `
struct Params {
  nodeCount: u32,
  repulsion: f32,
  springK: f32,
  damping: f32,
  dt: f32,
  centering: f32,
  _p1: u32,
  _p2: u32,
};
`;

export const computeForcesWGSL = /* wgsl */ `
${PARAMS_STRUCT}
@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> pos: array<vec4<f32>>;
@group(0) @binding(2) var<storage, read_write> force: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read> neighborOffset: array<u32>;
@group(0) @binding(4) var<storage, read> neighborIndex: array<u32>;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let i = gid.x;
  if (i >= params.nodeCount) { return; }
  let pi = pos[i].xyz;

  var f = vec3<f32>(0.0, 0.0, 0.0);
  for (var j: u32 = 0u; j < params.nodeCount; j = j + 1u) {
    if (j == i) { continue; }
    let d = pi - pos[j].xyz;
    let dist = max(length(d), 0.05);
    f = f + normalize(d) * (params.repulsion / (dist * dist));
  }

  let start = neighborOffset[i];
  let end = neighborOffset[i + 1u];
  for (var k: u32 = start; k < end; k = k + 1u) {
    let j = neighborIndex[k];
    let d = pos[j].xyz - pi;
    f = f + d * params.springK;
  }

  // Without this, weakly-connected/isolated nodes have nothing opposing repulsion and
  // drift outward forever, eventually crossing the camera's far plane and vanishing.
  f = f - pi * params.centering;

  force[i] = vec4<f32>(f, 0.0);
}
`;

export const integrateWGSL = /* wgsl */ `
${PARAMS_STRUCT}
@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read_write> pos: array<vec4<f32>>;
@group(0) @binding(2) var<storage, read_write> vel: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read> force: array<vec4<f32>>;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let i = gid.x;
  if (i >= params.nodeCount) { return; }
  let v = (vel[i].xyz + force[i].xyz * params.dt) * params.damping;
  let p = pos[i].xyz + v * params.dt;
  vel[i] = vec4<f32>(v, 0.0);
  pos[i] = vec4<f32>(p, 0.0);
}
`;
