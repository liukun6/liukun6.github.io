// three.js owns its own WebGPU device by default; we pass ours in via `device`
// so the render pipeline shares the GPUDevice with layout.js's compute pipeline
// (same principle as Demo1: one GPUDevice, multiple pipelines, no manual sync
// needed across passes submitted on the same queue).
// eslint-disable-next-line import/no-unresolved, import/extensions
import * as THREE from 'three';
// eslint-disable-next-line import/no-unresolved, import/extensions
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const { WebGPURenderer } = THREE;

const CATEGORY_COLOR = {
  graphics: new THREE.Color('#60a5fa'),
  llm: new THREE.Color('#34d399'),
  algorithm: new THREE.Color('#fbbf24'),
  agent: new THREE.Color('#a78bfa'),
};
const HIGHLIGHT_COLOR = new THREE.Color('#f87171');
const DIM_SCALE = 1;
const HIGHLIGHT_SCALE = 1.8;
const LABEL_FONT = '28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const LABEL_WORLD_HEIGHT = 0.16;

// Canvas-texture sprites, not CSS2DRenderer: WebGPURenderer auto-converts SpriteMaterial
// into its node-based pipeline, so labels stay in the same render pass as the rest of the
// scene with no DOM overlay layer.
function makeLabelTexture(text, highlighted) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = LABEL_FONT;
  const paddingX = 16;
  const paddingY = 10;
  canvas.width = Math.ceil(ctx.measureText(text).width) + paddingX * 2;
  canvas.height = 28 + paddingY * 2;
  ctx.font = LABEL_FONT;
  ctx.fillStyle = highlighted ? 'rgba(248, 113, 113, 0.9)' : 'rgba(17, 19, 31, 0.75)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = highlighted ? '#1a0a0a' : '#e5e7eb';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, paddingX, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  return { texture, aspect: canvas.width / canvas.height };
}

export class GraphScene {
  constructor(canvas, device, nodes, edges) {
    this.nodes = nodes;
    this.edges = edges;
    this.idToIndex = new Map(nodes.map((n, i) => [n.id, i]));

    this.renderer = new WebGPURenderer({ canvas, device, antialias: true });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    this.camera.position.set(0, 0, 6);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    // flyTo()'s auto-camera lerp in updatePositions() otherwise fights the user forever
    // (it never stops itself -- see the convergence check there) -- canceling it the
    // instant the user starts dragging is what makes the mouse responsive immediately,
    // not just after the fly-to finishes.
    this.controls.addEventListener('start', () => { this._flyTarget = null; });

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(2, 3, 4);
    this.scene.add(dirLight);

    const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const sphereMat = new THREE.MeshStandardMaterial();
    this.nodeMesh = new THREE.InstancedMesh(sphereGeo, sphereMat, nodes.length);
    // InstancedMesh's frustum-culling bounding sphere is derived from the base geometry
    // at the mesh's own (never-moving, world-origin) transform -- it does NOT expand to
    // cover where setMatrixAt actually places each instance. Once the camera frustum no
    // longer contains world origin (e.g. flown close to an outlying node), the renderer
    // culls the whole mesh, hiding every instance at once even though their real positions
    // are in view. Disabling frustum culling is correct here: the graph is small (<=200
    // instances), so the cost of never culling is negligible.
    this.nodeMesh.frustumCulled = false;
    nodes.forEach((node, i) => {
      this.nodeMesh.setColorAt(i, CATEGORY_COLOR[node.category] || CATEGORY_COLOR.algorithm);
    });
    this.scene.add(this.nodeMesh);

    const lineGeo = new THREE.CylinderGeometry(0.01, 0.01, 1, 6);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0x4b5563, opacity: 0.5, transparent: true });
    this.edgeMesh = new THREE.InstancedMesh(lineGeo, lineMat, edges.length);
    this.edgeMesh.frustumCulled = false;
    this.scene.add(this.edgeMesh);

    this.labelGroup = new THREE.Group();
    this.labels = nodes.map((node) => {
      const normal = makeLabelTexture(node.title, false);
      const highlighted = makeLabelTexture(node.title, true);
      const material = new THREE.SpriteMaterial({ map: normal.texture, depthWrite: false, transparent: true });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(LABEL_WORLD_HEIGHT * normal.aspect, LABEL_WORLD_HEIGHT, 1);
      this.labelGroup.add(sprite);
      return {
        sprite, material, normal, highlighted,
      };
    });
    this.scene.add(this.labelGroup);

    this._tmpMatrix = new THREE.Matrix4();
    this._flyTarget = null;
    this._flyOffset = null;
    this._highlightIndex = null;

    // Reused scratch objects for updatePositions()/the edge loop -- avoids allocating a
    // fresh Vector3/Quaternion per node and per edge every single frame (151 nodes + 184
    // edges at 60fps was hundreds of allocations/sec, enough to cause visible GC-driven
    // stutter in the layout animation).
    this._positions = nodes.map(() => new THREE.Vector3());
    this._identityQuat = new THREE.Quaternion();
    this._upVec = new THREE.Vector3(0, 1, 0);
    this._tmpScale = new THREE.Vector3();
    this._tmpMid = new THREE.Vector3();
    this._tmpDir = new THREE.Vector3();
    this._tmpQuat = new THREE.Quaternion();
  }

  async init() {
    await this.renderer.init();
  }

  updatePositions(positionsFloat32) {
    const positions = this._positions;
    for (let i = 0; i < this.nodes.length; i++) {
      const x = positionsFloat32[i * 4];
      const y = positionsFloat32[i * 4 + 1];
      const z = positionsFloat32[i * 4 + 2];
      positions[i].set(x, y, z);
      const scale = this._highlightIndex === i ? HIGHLIGHT_SCALE : DIM_SCALE;
      this._tmpScale.set(scale, scale, scale);
      this._tmpMatrix.compose(positions[i], this._identityQuat, this._tmpScale);
      this.nodeMesh.setMatrixAt(i, this._tmpMatrix);

      const label = this.labels[i].sprite;
      label.position.copy(positions[i]);
      label.position.y += 0.12 * scale + 0.08;
    }
    this.nodeMesh.instanceMatrix.needsUpdate = true;

    this.edges.forEach((edge, i) => {
      const a = positions[this.idToIndex.get(edge.from)];
      const b = positions[this.idToIndex.get(edge.to)];
      if (!a || !b) return;
      const mid = this._tmpMid.copy(a).add(b).multiplyScalar(0.5);
      const dir = this._tmpDir.copy(b).sub(a);
      const length = Math.max(dir.length(), 0.001);
      dir.normalize();
      const quaternion = this._tmpQuat.setFromUnitVectors(this._upVec, dir);
      this._tmpScale.set(1, length, 1);
      this._tmpMatrix.compose(mid, quaternion, this._tmpScale);
      this.edgeMesh.setMatrixAt(i, this._tmpMatrix);
    });
    this.edgeMesh.instanceMatrix.needsUpdate = true;

    if (this._flyTarget !== null && positions[this._flyTarget]) {
      const targetPos = positions[this._flyTarget];
      this.controls.target.lerp(targetPos, 0.05);
      let converged = this.controls.target.distanceTo(targetPos) < 0.01;
      if (this._flyOffset) {
        const desiredCamPos = targetPos.clone().add(this._flyOffset);
        this.camera.position.lerp(desiredCamPos, 0.05);
        converged = converged && this.camera.position.distanceTo(desiredCamPos) < 0.01;
      }
      // Without this, the forced lerp toward the fly target runs every frame forever,
      // permanently overriding any OrbitControls camera/target change the user makes
      // after the fly-to visually finishes (the 'start' listener above only handles the
      // moment a drag begins -- this handles everything after that).
      if (converged) this._flyTarget = null;
    }
  }

  setHighlight(nodeIndex) {
    this._highlightIndex = nodeIndex;
    for (let i = 0; i < this.nodes.length; i++) {
      const categoryColor = CATEGORY_COLOR[this.nodes[i].category] || CATEGORY_COLOR.algorithm;
      const color = i === nodeIndex ? HIGHLIGHT_COLOR : categoryColor;
      this.nodeMesh.setColorAt(i, color);

      const isHighlighted = i === nodeIndex;
      const label = this.labels[i];
      label.material.map = isHighlighted ? label.highlighted.texture : label.normal.texture;
      label.material.needsUpdate = true;
      const labelScale = LABEL_WORLD_HEIGHT * (isHighlighted ? 1.3 : 1);
      const aspect = isHighlighted ? label.highlighted.aspect : label.normal.aspect;
      label.sprite.scale.set(labelScale * aspect, labelScale, 1);
    }
    this.nodeMesh.instanceColor.needsUpdate = true;
  }

  flyTo(nodeIndex) {
    this._flyTarget = nodeIndex;
    this._flyOffset = this.camera.position.clone().sub(this.controls.target);
  }

  resize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  render() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
