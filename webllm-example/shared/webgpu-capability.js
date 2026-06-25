// Shared WebGPU capability check, used by every demo page. Centralizes the
// "no backend, must degrade gracefully" requirement (design doc principle:
// public static pages must do their own capability detection).
export async function requestWebGPUDevice() {
  if (!navigator.gpu) {
    throw new Error('Your browser does not support WebGPU. Try a recent Chrome/Edge.');
  }
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw new Error('No WebGPU adapter found on this device.');
  }
  const device = await adapter.requestDevice();
  return { device, adapter };
}
