// 2D toy datasets, coordinates normalized to roughly [-1, 1], labels in {+1, -1}.

function shuffle(points) {
  for (let i = points.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [points[i], points[j]] = [points[j], points[i]];
  }
  return points;
}

function toBuffers(points) {
  const X = new Float32Array(points.length * 2);
  const Y = new Float32Array(points.length);
  points.forEach((p, idx) => {
    X[idx * 2] = p.x;
    X[idx * 2 + 1] = p.y;
    Y[idx] = p.label;
  });
  return { X, Y, N: points.length };
}

export function spiralDataset(perClass = 60) {
  const points = [];
  for (let cls = 0; cls < 2; cls++) {
    const label = cls === 0 ? 1 : -1;
    for (let i = 0; i < perClass; i++) {
      const t = i / perClass;
      const r = t * 0.9;
      const theta = t * 4 * Math.PI + cls * Math.PI + (Math.random() - 0.5) * 0.3;
      points.push({ x: r * Math.cos(theta), y: r * Math.sin(theta), label });
    }
  }
  return toBuffers(shuffle(points));
}

export function moonsDataset(perClass = 70) {
  const points = [];
  for (let i = 0; i < perClass; i++) {
    const theta = Math.PI * (i / perClass);
    const noise = () => (Math.random() - 0.5) * 0.15;
    points.push({ x: Math.cos(theta) + noise(), y: Math.sin(theta) + noise(), label: 1 });
    points.push({
      x: 1 - Math.cos(theta) + noise(),
      y: 1 - Math.sin(theta) - 0.5 + noise(),
      label: -1,
    });
  }
  return toBuffers(shuffle(points));
}

export function circlesDataset(perClass = 70) {
  const points = [];
  for (let i = 0; i < perClass; i++) {
    const theta = (i / perClass) * 2 * Math.PI;
    const noise = () => (Math.random() - 0.5) * 0.08;
    const rInner = 0.35 + noise();
    const rOuter = 0.85 + noise();
    points.push({ x: rInner * Math.cos(theta), y: rInner * Math.sin(theta), label: 1 });
    points.push({ x: rOuter * Math.cos(theta), y: rOuter * Math.sin(theta), label: -1 });
  }
  return toBuffers(shuffle(points));
}

export function xorDataset(perQuadrant = 35) {
  const points = [];
  const quadrants = [
    { sx: 1, sy: 1, label: 1 },
    { sx: -1, sy: -1, label: 1 },
    { sx: 1, sy: -1, label: -1 },
    { sx: -1, sy: 1, label: -1 },
  ];
  for (const q of quadrants) {
    for (let i = 0; i < perQuadrant; i++) {
      const x = q.sx * (0.25 + Math.random() * 0.65);
      const y = q.sy * (0.25 + Math.random() * 0.65);
      points.push({ x, y, label: q.label });
    }
  }
  return toBuffers(shuffle(points));
}

export const DATASETS = {
  spiral: spiralDataset,
  moons: moonsDataset,
  circles: circlesDataset,
  xor: xorDataset,
};
