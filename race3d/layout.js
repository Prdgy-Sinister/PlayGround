import * as THREE from '../vendor/three.module.js';
import { clamp, lerp, mulberry32, hashStr, smoothstep } from './util.js';

/* Builds a closed, arc-length-sampled circuit from a radial harmonic spline. */
export function buildLayout(track, eraIndex) {
  const rnd = mulberry32(hashStr(track.name) + 7);
  const lobes = clamp(Math.round(track.turns / 4), 3, 6);
  const ph = [rnd() * 6.283, rnd() * 6.283, rnd() * 6.283];
  const squash = .70 + rnd() * .34;
  const elevation = track.name === 'Spa-Francorchamps' ? 11
    : track.name === 'Nürburgring' ? 13
      : track.name === 'Monaco' ? 2.6
        : track.name === 'Circuit of the Americas' ? 8 : 5;

  const count = 18;
  const pts = [];
  for (let i = 0; i < count; i++) {
    const a = i / count * Math.PI * 2;
    const r = 1
      + .20 * Math.cos(lobes * a + ph[0])
      + .085 * Math.cos((lobes + 2) * a + ph[1])
      + .042 * Math.cos((lobes + 4) * a + ph[2]);
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r * squash;
    const y = elevation * (.5 * Math.sin(2 * a + ph[1]) + .3 * Math.sin(3 * a + ph[0]) + .2 * Math.sin(5 * a + ph[2]));
    pts.push(new THREE.Vector3(x, y, z));
  }

  let curve = new THREE.CatmullRomCurve3(pts, true, 'catmullrom', .5);
  const rawLen = curve.getLength();
  const scale = track.len / rawLen;
  pts.forEach(p => { p.x *= scale; p.z *= scale; });
  curve = new THREE.CatmullRomCurve3(pts, true, 'catmullrom', .5);

  const S = 1200;
  const sp = curve.getSpacedPoints(S);
  const samples = [];
  for (let i = 0; i < S; i++) {
    const p0 = sp[i], p1 = sp[(i + 1) % S];
    const tangent = p1.clone().sub(p0).normalize();
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    samples.push({ pos: p0.clone(), tangent, side });
  }
  const length = curve.getLength();
  const halfWidth = 5.35 + eraIndex * .2;

  const layout = {
    curve, samples, length, halfWidth, S,
    sample(u) {
      let f = u * S; f = ((f % S) + S) % S;
      const i = Math.floor(f), t = f - i;
      const a = samples[i], b = samples[(i + 1) % S];
      const pos = a.pos.clone().lerp(b.pos, t);
      const side = a.side.clone().lerp(b.side, t).normalize();
      const tangent = a.tangent.clone().lerp(b.tangent, t).normalize();
      return { pos, side, tangent };
    },
    nearest(x, z) {
      let best = 1e9, by = 0;
      for (let i = 0; i < S; i += 6) {
        const p = samples[i].pos;
        const dx = p.x - x, dz = p.z - z;
        const d = dx * dx + dz * dz;
        if (d < best) { best = d; by = p.y; }
      }
      return { dist: Math.sqrt(best), y: by };
    }
  };

  const hills = (x, z) =>
    6.5 * Math.sin(x * .0055 + 1.3) * Math.cos(z * .0047 - .8) +
    3.2 * Math.sin(x * .012 - .4) * Math.cos(z * .0105 + 2.1) +
    1.4 * Math.sin(x * .027 + 2.2) * Math.cos(z * .022);

  layout.heightAt = (x, z) => {
    const n = layout.nearest(x, z);
    const w = smoothstep(15, 100, n.dist);
    return lerp(n.y - .5, n.y + hills(x, z) * 1.15, w);
  };
  return layout;
}

export function makeRibbon(layout, cols, alongScale, material, renderOrder = 0) {
  const S = layout.samples.length;
  const pos = [], uv = [], idx = [];
  let dist = 0;
  for (let i = 0; i < S; i++) {
    const s = layout.samples[i];
    if (i > 0) dist += s.pos.distanceTo(layout.samples[i - 1].pos);
    for (const c of cols) {
      const p = s.pos.clone().addScaledVector(s.side, c.off);
      pos.push(p.x, p.y + c.y, p.z);
      uv.push(c.uv, dist / alongScale);
    }
  }
  const C = cols.length;
  for (let i = 0; i < S; i++) {
    const n = (i + 1) % S;
    for (let c = 0; c < C - 1; c++) {
      const a = i * C + c, b = a + 1, ci = n * C + c, d = ci + 1;
      idx.push(a, b, ci, b, d, ci);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  const mesh = new THREE.Mesh(g, material);
  mesh.receiveShadow = true;
  mesh.renderOrder = renderOrder;
  return mesh;
}

export function buildRoad(layout, textures) {
  const group = new THREE.Group();
  const half = layout.halfWidth;

  const asphalt = new THREE.MeshStandardMaterial({
    map: textures.asphalt, bumpMap: textures.asphalt, bumpScale: .035,
    color: 0xf2f2f2, roughness: .84, metalness: .04, envMapIntensity: .55
  });
  const kerbMat = new THREE.MeshStandardMaterial({ map: textures.kerb, roughness: .74, metalness: .02, color: 0xcfd0c8 });
  const lineMat = new THREE.MeshStandardMaterial({ color: 0xe9e9e0, roughness: .7, metalness: .02 });
  const grassMat = new THREE.MeshStandardMaterial({ map: textures.grass, roughness: 1, metalness: 0, color: 0xb6c0a4 });

  const crown = [
    { off: -half, y: .005, uv: -half / 8 },
    { off: -half * .52, y: .025, uv: -half * .52 / 8 },
    { off: 0, y: .045, uv: 0 },
    { off: half * .52, y: .025, uv: half * .52 / 8 },
    { off: half, y: .005, uv: half / 8 }
  ];
  group.add(makeRibbon(layout, crown, 8, asphalt));

  for (const s of [-1, 1]) {
    const off = s * (half - .34);
    const a = off - .07 * s, b = off + .07 * s;
    group.add(makeRibbon(layout, [
      { off: Math.min(a, b), y: .055, uv: 0 },
      { off: Math.max(a, b), y: .055, uv: 1 }
    ], 8, lineMat));
  }

  for (const s of [-1, 1]) {
    const a = s * (half - .05), b = s * (half + 1.02);
    group.add(makeRibbon(layout, [
      { off: Math.min(a, b), y: .058, uv: 0 },
      { off: Math.max(a, b), y: .058, uv: 1 }
    ], 2.6, kerbMat));
  }

  for (const s of [-1, 1]) {
    const a = s * (half + 1.45), b = s * (half + 13);
    group.add(makeRibbon(layout, [
      { off: Math.min(a, b), y: .015, uv: 0 },
      { off: Math.max(a, b), y: .015, uv: 2 }
    ], 10, grassMat));
  }

  // start / finish line
  const sample = layout.sample(0);
  const yaw = Math.atan2(sample.tangent.x, sample.tangent.z);
  const lineGeo = new THREE.PlaneGeometry(half * 2, 1.7);
  lineGeo.rotateX(-Math.PI / 2);
  const line = new THREE.Mesh(lineGeo, new THREE.MeshStandardMaterial({
    map: textures.checker, roughness: .7, metalness: .03,
    polygonOffset: true, polygonOffsetFactor: -2
  }));
  line.rotation.y = yaw;
  line.position.copy(sample.pos);
  line.position.y += .075;
  line.receiveShadow = true;
  group.add(line);

  return { group, asphalt, kerbMat, grassMat };
}

export function buildTerrain(layout, textures) {
  let minX = 1e9, maxX = -1e9, minZ = 1e9, maxZ = -1e9;
  for (const s of layout.samples) {
    minX = Math.min(minX, s.pos.x); maxX = Math.max(maxX, s.pos.x);
    minZ = Math.min(minZ, s.pos.z); maxZ = Math.max(maxZ, s.pos.z);
  }
  const pad = 900;
  const span = Math.max(maxX - minX, maxZ - minZ) + pad * 2;
  const cx = (minX + maxX) / 2, cz = (minZ + maxZ) / 2;
  const N = 104;
  const geo = new THREE.PlaneGeometry(span, span, N, N);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) + cx;
    const z = pos.getZ(i) + cz;
    pos.setX(i, x); pos.setZ(i, z);
    pos.setY(i, layout.heightAt(x, z) - .06);
    uv.setXY(i, x / 17, z / 17);
  }
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({ map: textures.grass, roughness: 1, metalness: 0, color: 0xb0bb9e });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  return { mesh, mat };
}

function organicCanopy(seed) {
  const g = new THREE.SphereGeometry(1, 10, 8);
  const pos = g.attributes.position;
  const snoise = (x, y, z) =>
    Math.sin(x * 2.9 + seed) * Math.cos(y * 2.4 - seed) * .55 +
    Math.sin(z * 3.7 - seed * 1.7) * .3 +
    Math.cos(x * 1.7 + z * 2.1 + seed) * .22;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const k = 1 + snoise(x * 1.7, y * 1.7, z * 1.7) * .2;
    pos.setXYZ(i, x * k, y * k * .9, z * k);
  }
  g.computeVertexNormals();
  return g;
}

export function buildTrees(layout, count = 560) {
  const rnd = mulberry32(hashStr('trees' + layout.length));
  const trunks = [], broadA = [], broadB = [], broadC = [], conifer = [];
  let tries = 0;
  while (trunks.length < count && tries < count * 10) {
    tries++;
    const s = layout.samples[(rnd() * layout.S) | 0];
    const sideSign = rnd() > .5 ? 1 : -1;
    const off = sideSign * (17 + Math.pow(rnd(), .75) * 118);
    const p = s.pos.clone().addScaledVector(s.side, off).addScaledVector(s.tangent, (rnd() - .5) * 52);
    if (layout.nearest(p.x, p.z).dist < 15) continue;
    const y = layout.heightAt(p.x, p.z);
    const isConifer = rnd() < .34;
    const size = .72 + rnd() * .62;
    const trunkH = isConifer ? 2.4 + rnd() * 2.6 : 2.6 + rnd() * 2.8;
    trunks.push({ x: p.x, y, z: p.z, h: trunkH * (isConifer ? 1 : .92), w: .55 + rnd() * .35 });
    if (isConifer) {
      conifer.push({
        x: p.x, y, z: p.z,
        r: (2.1 + rnd() * .85) * size, h: (7.4 + rnd() * 4.2) * size, hue: rnd(), lean: (rnd() - .5) * .08
      });
    } else {
      const r = (1.55 + rnd() * 1.05) * size;
      broadA.push({ x: p.x, y: y + trunkH + r * .42, z: p.z, r, hue: rnd() });
      broadB.push({
        x: p.x + (rnd() - .5) * r * 1.1, y: y + trunkH + r * 1.02, z: p.z + (rnd() - .5) * r * 1.1,
        r: r * (.52 + rnd() * .24), hue: rnd()
      });
      if (rnd() > .35) {
        const a = rnd() * 6.28;
        broadC.push({
          x: p.x + Math.cos(a) * r * .95, y: y + trunkH + r * .85 + rnd() * r * .3,
          z: p.z + Math.sin(a) * r * .95, r: r * (.4 + rnd() * .2), hue: rnd()
        });
      }
    }
  }

  const dummy = new THREE.Object3D();
  const col = new THREE.Color();

  const trunkGeo = new THREE.CylinderGeometry(.085, .2, 1, 7, 1);
  trunkGeo.translate(0, .5, 0);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4b3a2a, roughness: 1 });
  const trunkMesh = new THREE.InstancedMesh(trunkGeo, trunkMat, trunks.length);
  trunks.forEach((t, i) => {
    dummy.position.set(t.x, t.y, t.z);
    dummy.rotation.set(0, t.w * 8.1, 0);
    dummy.scale.set(t.w, t.h, t.w);
    dummy.updateMatrix();
    trunkMesh.setMatrixAt(i, dummy.matrix);
  });
  trunkMesh.castShadow = true;

  const makeLeaves = (geo, list, tone, sea = 0, shadows = false) => {
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .95, metalness: 0, flatShading: false });
    const mesh = new THREE.InstancedMesh(geo, mat, list.length);
    list.forEach((t, i) => {
      dummy.position.set(t.x, t.y, t.z);
      dummy.rotation.set(t.lean || 0, t.hue * 6.28, (t.hue - .5) * .12);
      if (geo.__cone) dummy.scale.set(t.r, t.h, t.r);
      else dummy.scale.set(t.r, t.r * .9, t.r);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      col.setHSL(.245 + t.hue * .045 + tone * .02, .20 + t.hue * .16 + sea, .115 + t.hue * .055 + tone);
      mesh.setColorAt(i, col);
    });
    mesh.castShadow = shadows;
    mesh.receiveShadow = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    return mesh;
  };

  const broadGeo = organicCanopy(3.7);
  const coneGeo = new THREE.ConeGeometry(1, 1, 12, 2, true);
  coneGeo.translate(0, .5, 0);
  coneGeo.__cone = true;

  const group = new THREE.Group();
  group.add(trunkMesh);
  group.add(makeLeaves(broadGeo, broadA, 0, 0, true));
  group.add(makeLeaves(broadGeo, broadB, .035, -.02));
  if (broadC.length) group.add(makeLeaves(broadGeo, broadC, -.025, .025));
  if (conifer.length) group.add(makeLeaves(coneGeo, conifer, -.03, -.05));
  return { group };
}
