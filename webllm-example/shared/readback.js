// Double-buffered, non-blocking GPU buffer readback. Used for the loss scalar and
// for small weight snapshots (network diagram). Never calls mapAsync synchronously
// inside the frame loop, so it can't stall the main thread (see design doc section 4).
export class AsyncReadback {
  constructor(device, byteLength, label = 'Readback') {
    this.device = device;
    this.byteLength = byteLength;
    this.staging = [0, 1].map(() => device.createBuffer({
      label,
      size: byteLength,
      usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    }));
    this.cursor = 0;
    this.pending = false;
  }

  // Call inside the frame's command encoder, after writing the source buffer.
  copyFrom(encoder, srcBuffer) {
    if (this.pending) return;
    encoder.copyBufferToBuffer(srcBuffer, 0, this.staging[this.cursor], 0, this.byteLength);
  }

  // Call once per frame, after queue.submit(). Resolves asynchronously; `onData`
  // receives a Float32Array view that is only valid until the next call.
  requestRead(onData) {
    if (this.pending) return;
    const buf = this.staging[this.cursor];
    this.cursor = 1 - this.cursor;
    this.pending = true;
    buf.mapAsync(GPUMapMode.READ).then(() => {
      // getMappedRange()'s view is backed by a buffer that unmap() detaches, so the
      // caller needs a copy, not a view, to safely hold onto past this callback.
      const data = new Float32Array(buf.getMappedRange()).slice();
      buf.unmap();
      onData(data);
      this.pending = false;
    }).catch((err) => {
      console.error('[AsyncReadback] mapAsync failed:', err);
      this.pending = false;
    });
  }

  destroy() {
    this.staging.forEach((b) => b.destroy());
  }
}
