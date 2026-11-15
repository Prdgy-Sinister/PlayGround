import * as THREE from 'three';
import { SPECIES, POTS, seasonOf } from './data.js';

export function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function () {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const matCache = new Map();
function leafMat(color, emissive = 0x000000, emissiveIntensity = 0, opts = {}) {
  const key = `${color}-${emissive}-${emissiveIntensity}-${opts.rough ?? 0.85}`;
  if (matCache.has(key)) return matCache.get(key);
  const m = new THREE.MeshStandardMaterial({
    color, emissive, emissiveIntensity, roughness: opts.rough ?? 0.85, metalness: 0,
    flatShading: true, side: THREE.DoubleSide,
  });
  matCache.set(key, m);
  return m;
}

function taperedSegment(a, b, r1, r2, material, radial = 5) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  if (len < 0.001) return null;
  const geo = new THREE.CylinderGeometry(r2, r1, len, radial, 1);
  const mesh = new THREE.Mesh(geo, material);
  mesh.position.copy(a).addScaledVector(dir, 0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
  mesh.castShadow = true;
  return mesh;
}

export function makePot(tier = 0, scale = 1) {
  const g = new THREE.Group();
  const potDef = POTS[tier] || POTS[0];
  const colors = [0x8a563c, 0x4f6a66, 0x5a4a3a, 0x3b4048, 0x2a1820];
  const bases = [0x7d6349, 0x6f8078, 0x50402f, 0x353a42, 0x3a1a24];
  const col = tier === 4 ? 0x3a1822 : bases[tier];
  const rimCol = tier === 4 ? 0x8b2d38 : colors[tier];
  const bodyMat = new THREE.MeshStandardMaterial({ color: col, roughness: 0.72, metalness: 0.04, flatShading: false });
  const rimMat = new THREE.MeshStandardMaterial({ color: rimCol, roughness: 0.6, metalness: tier >= 2 ? 0.25 : 0.05 });
  const w = 1.25 * scale, d = 0.8 * scale, h = 0.36 * scale;

  // body (slightly tapered)
  const body = new THREE.Mesh(new THREE.CylinderGeometry(w * 0.46, w * 0.36, h, 4, 1), bodyMat);
  body.rotation.y = Math.PI / 4;
  body.scale.z = d / w;
  body.position.y = h / 2 + 0.02;
  body.castShadow = true;
  g.add(body);

  // rim
  const rim = new THREE.Mesh(new THREE.BoxGeometry(w * 1.02, 0.09 * scale, d * 1.12), rimMat);
  rim.position.y = h + 0.045;
  rim.castShadow = true;
  g.add(rim);

  // feet
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.1 * scale, 0.09 * scale, 0.1 * scale), bodyMat);
    foot.position.set(sx * w * 0.3, 0.045, sz * d * 0.34);
    g.add(foot);
  }

  // soil
  const soil = new THREE.Mesh(new THREE.CylinderGeometry(w * 0.42, w * 0.42, 0.06, 12), new THREE.MeshStandardMaterial({ color: 0x2b2119, roughness: 1 }));
  soil.scale.z = d / w;
  soil.position.y = h + 0.05;
  g.add(soil);

  // moss
  const mossMat = new THREE.MeshStandardMaterial({ color: 0x4f6b3a, roughness: 1, flatShading: true });
  for (let i = 0; i < 6; i++) {
    const m = new THREE.Mesh(new THREE.IcosahedronGeometry(0.11 * scale, 0), mossMat);
    const ang = i * 1.7;
    m.position.set(Math.cos(ang) * w * 0.26, h + 0.07, Math.sin(ang) * d * 0.24);
    m.scale.set(1, 0.35, 1);
    m.scale.multiplyScalar(0.7 + (i % 3) * 0.25);
    g.add(m);
  }

  // accent stone
  const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.1 * scale, 0), new THREE.MeshStandardMaterial({ color: 0x77736a, roughness: 0.95, flatShading: true }));
  rock.position.set(w * 0.16, h + 0.1, d * 0.05);
  rock.scale.set(1.2, 0.7, 1);
  g.add(rock);

  g.userData.potTop = h + 0.08;
  g.userData.potWidth = w;
  return g;
}

function addPads(group, pos, sp, color, emissive, count, spread, size, rng, flatten = 0.5) {
  for (let i = 0; i < count; i++) {
    const a = rng() * Math.PI * 2;
    const r = spread * Math.pow(rng(), 0.6);
    const s = size * (0.65 + rng() * 0.6);
    const geo = new THREE.IcosahedronGeometry(s, 1);
    const m = new THREE.Mesh(geo, leafMat(color, emissive, sp.supernatural ? 0.85 : 0, { rough: 0.85 }));
    m.position.set(pos.x + Math.cos(a) * r, pos.y + (rng() - 0.35) * s * 0.9, pos.z + Math.sin(a) * r);
    m.scale.set(1.15, flatten * (0.8 + rng() * 0.4), 1.15);
    m.rotation.set(rng() * 2, rng() * 3, rng() * 2);
    m.castShadow = true;
    group.add(m);
  }
}

function addFlowers(group, pos, color, count, spread, rng, size = 0.07) {
  const mat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.12, roughness: 0.8 });
  for (let i = 0; i < count; i++) {
    const f = new THREE.Mesh(new THREE.IcosahedronGeometry(size * (0.7 + rng() * 0.7), 0), mat);
    f.position.set(pos.x + (rng() - 0.5) * spread, pos.y + (rng() - 0.5) * spread * 0.5, pos.z + (rng() - 0.5) * spread);
    group.add(f);
  }
}

function buildTrunk(group, sp, tree, rng, seasonId) {
  const age = Math.min(tree.age, 14);
  const style = tree.style / 100;
  const height = 1.15 + Math.min(age, 10) * 0.115 + style * 0.35;
  const lean = (rng() - 0.5) * (0.28 + style * 0.5);
  const leanZ = (rng() - 0.5) * 0.25;
  const radius = 0.09 + Math.min(age, 12) * 0.014 + style * 0.025;
  const barkColor = sp.supernatural ? (sp.id === 'yomi' ? 0x4a2a44 : 0x3a4a46) : (sp.id === 'cherry' ? 0x513b35 : sp.id === 'bamboo' ? 0x7d8a4e : 0x5a4635);
  const barkMat = new THREE.MeshStandardMaterial({ color: barkColor, roughness: 0.95, flatShading: true, emissive: sp.supernatural ? (sp.id === 'yomi' ? 0x3a0a2a : 0x0a2a28) : 0x000000, emissiveIntensity: sp.supernatural ? 0.5 : 0 });
  const leafColor = sp.leaf[seasonId] ?? sp.leaf.summer;

  if (sp.form === 'bamboo') {
    const culms = 3 + Math.floor(rng() * 3) + Math.round(style * 3);
    for (let c = 0; c < culms; c++) {
      const h = height * (0.65 + rng() * 0.55) * (c === 0 ? 1.15 : 0.9);
      const bx = (rng() - 0.5) * 0.45, bz = (rng() - 0.5) * 0.22;
      const leanX = (rng() - 0.5) * 0.12, leanZ = (rng() - 0.5) * 0.12;
      const a = new THREE.Vector3(bx, 0, bz);
      const b = new THREE.Vector3(bx + leanX * h, h, bz + leanZ * h);
      const seg = taperedSegment(a, b, radius * 0.42, radius * 0.22, barkMat, 6);
      if (seg) group.add(seg);
      for (let n = 1; n < 5; n++) {
        const ny = (h / 5) * n;
        const ring = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.36, 0.014, 3, 6), barkMat);
        ring.position.set(bx + leanX * ny, ny, bz + leanZ * ny);
        ring.rotation.x = Math.PI / 2;
        group.add(ring);
      }
      const base = new THREE.Vector3(bx + leanX * h, h, bz + leanZ * h);
      addPads(group, base, sp, leafColor, 0x000000, 3, 0.28, 0.24, rng, 0.35);
    }
    return;
  }

  const segments = [];
  let cursor = new THREE.Vector3(0, 0, 0);
  const points = 4;
  for (let i = 0; i < points; i++) {
    const t = (i + 1) / points;
    const next = new THREE.Vector3(
      lean * t + (rng() - 0.5) * 0.09 * (1 - t),
      height * t,
      leanZ * t + (rng() - 0.5) * 0.08 * (1 - t),
    );
    if (tree.wiring) {
      next.x += Math.sin(t * 6 + tree.variant) * 0.06;
      next.z += Math.cos(t * 5 + tree.variant) * 0.06;
    }
    const r1 = radius * (1 - i / points * 0.55);
    const r2 = radius * (1 - (i + 1) / points * 0.6);
    const seg = taperedSegment(cursor, next, r1, r2, barkMat, 6);
    if (seg) { group.add(seg); segments.push({ a: cursor.clone(), b: next.clone(), r: r1, t }); }
    cursor = next;
  }

  const top = cursor.clone();
  const branches = 3 + Math.round(style * 3) + (age > 5 ? 1 : 0);
  const branchTips = [];
  for (let i = 0; i < branches; i++) {
    const seg = segments[Math.min(segments.length - 1, 1 + Math.floor(rng() * (segments.length - 1)))];
    const start = seg.b.clone().add(new THREE.Vector3(0, -0.05, 0));
    const ang = (i / branches) * Math.PI * 2 + rng() * 0.8 + tree.variant * 0.13;
    const spread = 0.45 + style * 0.55 + rng() * 0.4;
    const len = (0.45 + rng() * 0.45) * (0.7 + age * 0.06) * (0.7 + style * 0.5);
    const dir = new THREE.Vector3(Math.cos(ang) * spread, (rng() - 0.35) * 0.5 + 0.22, Math.sin(ang) * spread).normalize();
    const end = start.clone().addScaledVector(dir, len);
    const br = taperedSegment(start, end, radius * 0.36, radius * 0.15, barkMat, 5);
    if (br) group.add(br);
    branchTips.push({ p: end, dir, len });

    if (rng() > 0.25) {
      const dir2 = dir.clone().add(new THREE.Vector3((rng() - 0.5) * 1.3, 0.25, (rng() - 0.5) * 1.3)).normalize();
      const end2 = end.clone().addScaledVector(dir2, len * 0.55);
      const br2 = taperedSegment(end, end2, radius * 0.17, radius * 0.09, barkMat, 4);
      if (br2) group.add(br2);
      branchTips.push({ p: end2, dir: dir2, len: len * 0.55 });
      if (sp.form === 'wisteria' || sp.form === 'cherry') addFlowerCluster(group, end2, sp, leafColor, rng);
    } else if (sp.form === 'wisteria' || sp.form === 'cherry' || sp.form === 'flower') {
      addFlowerCluster(group, end, sp, leafColor, rng);
    }
  }

  // apex crown
  addPads(group, top, sp, leafColor, 0x000000, 2 + Math.round(style * 2), 0.3, sp.form === 'pine' ? 0.3 : 0.34, rng, sp.form === 'pine' ? 0.32 : 0.52);

  for (const tip of branchTips) {
    if (sp.form === 'pine' || sp.form === 'juniper') {
      addPads(group, tip.p, sp, leafColor, 0x000000, 2, tip.len * 0.55, 0.24 + style * 0.1, rng, 0.32);
    } else if (sp.form === 'flower') {
      addPads(group, tip.p, sp, leafColor, 0x000000, 2, tip.len * 0.4, 0.22, rng, 0.45);
      addFlowers(group, tip.p, 0xe98aa5, 7 + Math.round(style * 8), tip.len * 0.7, rng, 0.055);
    } else {
      addPads(group, tip.p, sp, leafColor, 0x000000, 2 + Math.round(style * 2), tip.len * 0.45, 0.26, rng, 0.48);
    }
  }

  // exposed roots
  const rootMat = barkMat;
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + rng();
    const root = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.055, 0.35, 5), rootMat);
    root.position.set(Math.cos(a) * 0.12, 0.03, Math.sin(a) * 0.12);
    root.rotation.z = Math.PI / 2 - 0.15;
    root.rotation.y = -a;
    g2root(group, root, a);
  }
}

function g2root(group, root, a) {
  root.rotation.order = 'YXZ';
  root.rotation.y = -a;
  group.add(root);
}

function addFlowerCluster(group, pos, sp, leafColor, rng) {
  if (sp.id === 'wisteria') {
    const mat = new THREE.MeshStandardMaterial({ color: 0xa474c9, emissive: 0x5a2c7a, emissiveIntensity: 0.25, roughness: 0.8, flatShading: true });
    for (let i = 0; i < 3; i++) {
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.45 + rng() * 0.3, 5), mat);
      cone.position.set(pos.x + (rng() - 0.5) * 0.28, pos.y - 0.2, pos.z + (rng() - 0.5) * 0.28);
      cone.rotation.x = Math.PI;
      group.add(cone);
    }
  } else if (sp.id === 'cherry') {
    addPads(group, pos, sp, 0xf3b7c8, 0x5a2030, 3, 0.25, 0.27, rng, 0.48);
  }
}

export function createBonsai(tree, seasonId = 'spring', opts = {}) {
  const group = new THREE.Group();
  const sp = SPECIES[tree.sp] || SPECIES.maple;
  const rng = seededRandom((tree.variant || 1) * 7919 + (tree.sp?.length || 3) * 137 + Math.round(tree.age * 10));
  const potScale = opts.scale ?? 1;
  const pot = makePot(tree.pot || 0, potScale);
  group.add(pot);
  const treeGroup = new THREE.Group();
  treeGroup.position.y = pot.userData.potTop || 0.44;
  group.add(treeGroup);

  buildTrunk(treeGroup, sp, tree, rng, seasonId);

  // overall size by age/style
  const ageScale = 0.72 + Math.min(tree.age, 12) * 0.045 + Math.min(tree.style, 100) * 0.0016;
  treeGroup.scale.setScalar(ageScale * (opts.treeScale ?? 1));

  // gentle sway marker
  group.userData.sway = treeGroup;
  group.userData.sp = sp.id;
  group.userData.treeId = tree.id;
  group.userData.isBonsai = true;

  if (opts.glow) {
    const light = new THREE.PointLight(sp.supernatural ? 0x9a4fd4 : 0xffd9a0, 0.6, 4, 2);
    light.position.y = 1.2;
    group.add(light);
  }

  group.traverse((o) => { if (o.isMesh) { o.castShadow = !!opts.castShadow; o.receiveShadow = false; } });
  return group;
}
