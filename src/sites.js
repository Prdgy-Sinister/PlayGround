import * as THREE from 'three';
import { std, addBox, addCyl, addCone, addGlow, addPointLight, textPlane, canvasTexture, heightAt, mulberry32, clamp, TAU, pick, addTreeCluster } from './worldkit.js';

const wood = () => std('#4a342a');
const plaster = () => std('#b9ac8d', { roughness: 0.92 });
const stone = () => std('#6a6a78', { roughness: 0.9 });
const roofMat = color => std(color, { roughness: 0.8 });
const warm = () => new THREE.MeshStandardMaterial({ color: '#ffce8a', emissive: '#ff9f45', emissiveIntensity: 1.3, roughness: 0.4 });
const darkGlass = () => new THREE.MeshStandardMaterial({ color: '#241a33', emissive: '#7a548f', emissiveIntensity: 0.5, roughness: 0.2, metalness: 0.4 });

/* ══════════════════════════════════════════ VILLAGE */
export function buildVillage(ctx) {
  const { group, colliders, anims } = ctx;
  const random = mulberry32(7719);
  const cx = 0, cz = 46;
  const baseY = heightAt(cx, cz);

  // plaza
  const plaza = new THREE.Mesh(new THREE.CircleGeometry(14, 54), new THREE.MeshStandardMaterial({ map: canvasTexture(512, 512, (g, w, h) => {
    g.fillStyle = '#6b6557'; g.fillRect(0, 0, w, h);
    for (let row = 0; row < 16; row++) for (let col = 0; col < 16; col++) {
      const x = col * 33 + (row % 2) * 16 + random() * 4, y = row * 33 + random() * 3;
      const c = 86 + random() * 28;
      g.fillStyle = `rgb(${c},${c - 3},${c - 10})`;
      g.beginPath(); if (g.roundRect) g.roundRect(x, y, 29, 28, 5); else g.rect(x, y, 29, 28); g.fill();
      g.strokeStyle = 'rgba(34,30,24,.45)'; g.lineWidth = 1.2; g.stroke();
    }
  }, { repeat: 3 }), roughness: 0.95 }));
  plaza.rotation.x = -Math.PI / 2;
  plaza.position.set(cx, baseY + 0.1, cz);
  plaza.receiveShadow = true;
  group.add(plaza);

  const ring = new THREE.Mesh(new THREE.RingGeometry(13.2, 14.4, 64), std('#4f4b42'));
  ring.rotation.x = -Math.PI / 2; ring.position.set(cx, baseY + 0.13, cz); group.add(ring);

  // fountain
  const fountain = new THREE.Group();
  fountain.position.set(cx, baseY, cz);
  addCyl(fountain, { r: 3.15, h: 0.55, seg: 24, color: '#5e5a51', y: 0.3 });
  addCyl(fountain, { rt: 2.7, rb: 2.7, h: 0.18, seg: 24, color: '#747067', y: 0.58 });
  const water = new THREE.Mesh(new THREE.CircleGeometry(2.5, 32), new THREE.MeshPhysicalMaterial({ color: '#2c7d86', emissive: '#0b3a44', emissiveIntensity: 0.55, roughness: 0.08, metalness: 0.35, transparent: true, opacity: 0.88 }));
  water.rotation.x = -Math.PI / 2; water.position.y = 0.7; fountain.add(water);
  addCyl(fountain, { r: 0.55, h: 2.4, seg: 10, color: '#777369', y: 1.6 });
  addCyl(fountain, { rt: 1.15, rb: 0.5, h: 0.35, seg: 12, color: '#827d70', y: 2.75 });
  // statue wizard
  addCyl(fountain, { rt: 0.19, rb: 0.36, h: 1.15, seg: 8, color: '#8f8a7a', y: 3.55 });
  const stHead = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), std('#8f8a7a'));
  stHead.position.y = 4.2; fountain.add(stHead);
  addCone(fountain, { r: 0.3, h: 0.7, seg: 10, color: '#8f8a7a', y: 4.55, rz: 0.2 });
  const staff = addCyl(fountain, { r: 0.035, h: 2.2, seg: 5, color: '#6f6552', x: 0.38, y: 3.9, rz: 0.15 });
  addGlow(fountain, '#8fe7ff', 1.5, 0.5, 4.95, 0);
  addPointLight(fountain, '#86e0e8', 2.0, 18, 0, 3.4, 0);
  const wisp = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), new THREE.MeshBasicMaterial({ color: '#c9fbff' }));
  wisp.position.set(0.5, 4.95, 0); fountain.add(wisp);
  addGlow(fountain, '#bff4ff', 0.7, 0.5, 4.95, 0);
  group.add(fountain);
  colliders.push({ x: cx, z: cz, r: 3.6 });
  anims.push((dt, t) => { water.rotation.z = t * 0.15; wisp.position.y = 4.95 + Math.sin(t * 1.8) * 0.12; });

  // cottages around plaza
  const cottages = [
    { x: -25, z: 51, rot: 1.2, w: 4.6, d: 4.0, h: 3.0, wall: '#c3b596', roof: '#4e3550' },
    { x: -22, z: 63, rot: 1.6, w: 5.0, d: 4.2, h: 3.4, wall: '#b5a888', roof: '#533b3a' },
    { x: 20, z: 60, rot: -1.4, w: 4.2, d: 4.4, h: 3.0, wall: '#c9bc9b', roof: '#3e4658' },
    { x: 27, z: 45, rot: -1.9, w: 5.2, d: 4.0, h: 3.6, wall: '#b0a386', roof: '#4f3a4b' },
    { x: 12, z: 66, rot: -2.5, w: 4.0, d: 3.8, h: 2.8, wall: '#c4b795', roof: '#444f3d' },
    { x: -8, z: 66, rot: 2.7, w: 4.4, d: 4.2, h: 3.2, wall: '#bdae8e', roof: '#4a3545' }
  ];
  for (const c of cottages) cottage(ctx, c);

  // shop
  buildShop(ctx, { x: -14, z: 30.5, rot: 0.75 });

  // market stalls
  marketStall(ctx, 9, 36, 2.0);
  marketStall(ctx, 14, 42, 2.4);

  // lantern posts
  for (const [x, z] of [[-8, 38], [8, 50], [18, 54], [-18, 44]]) lantern(ctx, x, z);

  // string lights
  stringLights(group, [[-8, 38, 4.2], [8, 50, 4.2], [18, 54, 4.0], [-18, 44, 4.2]], baseY + 3.0);

  // hedges, barrels, crates
  for (const [x, z, w, d, ry] of [[-19, 36, 3.4, 1.0, 0.7], [20, 35, 3.0, 1.0, -0.5], [-7, 54, 1.0, 3.2, 0.2], [6, 58, 1.0, 2.6, 0.4]]) {
    const y = heightAt(x, z);
    addBox(group, { w, h: 1.0, d, color: '#2f4a2d', x, y: y + 0.5, z, ry, mat: std('#2e4a2c', { roughness: 0.95 }) });
  }
  for (const [x, z] of [[-7.4, 35], [-9, 36.4], [7.6, 47.4], [21, 49]]) {
    const y = heightAt(x, z);
    addCyl(group, { r: 0.42, h: 0.9, seg: 10, color: '#5b4130', x, y: y + 0.45, z, mat: std('#5b4130') });
  }

  // signpost at plaza entrance
  signpost(ctx, 12, 33, 0.4, [['AURELIAN ACADEMY', 'north-west'], ['WHISPERWOOD', 'north-east'], ['MIRRORMERE', 'south-east'], ['THE SUNKEN RUINS', 'south-west']]);
}

function cottage(ctx, { x, z, rot = 0, w = 4.4, d = 4, h = 3, wall = '#c3b596', roof = '#4a3347' }) {
  const { group, colliders } = ctx;
  const y = heightAt(x, z);
  const g = new THREE.Group();
  g.position.set(x, y, z); g.rotation.y = rot;
  group.add(g);
  addBox(g, { w, h, d, color: wall, y: h / 2, mat: std(wall, { roughness: 0.95 }) });
  // timber beams
  const beam = std('#4a3528');
  addBox(g, { w: w + 0.1, h: 0.16, d: d + 0.1, y: h - 0.2, mat: beam });
  for (const sx of [-1, 1]) addBox(g, { w: 0.16, h, d: d + 0.12, x: sx * (w / 2 - 0.08), y: h / 2, mat: beam });
  addBox(g, { w: w * 1.06, h: 0.14, d: 0.16, y: h * 0.62, z: d / 2 + 0.05, mat: beam });
  // roof
  const roofMesh = new THREE.Mesh(new THREE.ConeGeometry(Math.max(w, d) * 0.78, h * 0.82, 4), std(roof, { roughness: 0.82 }));
  roofMesh.position.y = h + h * 0.4; roofMesh.rotation.y = Math.PI / 4; roofMesh.castShadow = true; g.add(roofMesh);
  // chimney
  addBox(g, { w: 0.55, h: 1.5, d: 0.55, x: w * 0.24, y: h + 0.9, z: -d * 0.2, color: '#5f5a52' });
  // door
  addBox(g, { w: 0.85, h: 1.7, d: 0.12, y: 0.85, z: d / 2 + 0.02, mat: std('#33241d') });
  const handle = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 5), new THREE.MeshStandardMaterial({ color: '#d6b06a', metalness: 0.8, roughness: 0.3 }));
  handle.position.set(0.26, 0.9, d / 2 + 0.1); g.add(handle);
  // windows
  for (const sx of [-1, 1]) {
    addBox(g, { w: 0.7, h: 0.8, d: 0.06, x: sx * (w / 2 - 0.95), y: 1.65, z: d / 2 + 0.04, mat: warm() });
    addBox(g, { w: 0.85, h: 0.95, d: 0.03, x: sx * (w / 2 - 0.95), y: 1.65, z: d / 2 + 0.01, mat: std('#2f2420') });
  }
  // upper window
  addBox(g, { w: 0.62, h: 0.7, d: 0.06, y: h + 0.45, z: d / 2 + 0.02, mat: warm() });
  if (Math.random() > 0.55) {
    const awning = addBox(g, { w: 1.0, h: 0.08, d: 0.7, y: 2.35, z: d / 2 + 0.35, mat: std(pick(['#5a3d39', '#3e4658', '#4a3545'])) });
    awning.rotation.x = 0.18;
  }
  colliders.push({ x, z, r: Math.max(w, d) * 0.53 });
  return g;
}

function buildShop(ctx, { x, z, rot }) {
  const { group, colliders, anims } = ctx;
  const y = heightAt(x, z);
  const g = new THREE.Group();
  g.position.set(x, y, z); g.rotation.y = rot;
  group.add(g);
  const w = 6.2, d = 5.0, h = 4.0;
  addBox(g, { w, h, d, y: h / 2, color: '#b3a484', mat: std('#b3a484', { roughness: 0.94 }) });
  addBox(g, { w: w + 0.2, h: 0.18, d: d + 0.2, y: h - 0.25, mat: std('#4a3528') });
  const roofMesh = new THREE.Mesh(new THREE.ConeGeometry(5.3, 3.3, 4), std('#3c2a45', { roughness: 0.8 }));
  roofMesh.position.y = h + 1.55; roofMesh.rotation.y = Math.PI / 4; roofMesh.castShadow = true; g.add(roofMesh);
  // dormer
  addBox(g, { w: 1.4, h: 1.1, d: 1.0, y: h + 0.25, z: d * 0.2, mat: std('#b3a484') });
  addBox(g, { w: 0.9, h: 0.6, d: 0.05, y: h + 0.3, z: d * 0.2 + 0.52, mat: warm() });
  // door and big window
  addBox(g, { w: 1.4, h: 2.5, d: 0.16, y: 1.25, z: d / 2 + 0.03, mat: std('#2a1c18') });
  const winMat = new THREE.MeshStandardMaterial({ color: '#ffdda0', emissive: '#ffae4d', emissiveIntensity: 1.5, roughness: 0.2, metalness: 0.2, transparent: true, opacity: 0.92 });
  addBox(g, { w: 2.0, h: 1.5, d: 0.08, x: -1.7, y: 1.9, z: d / 2 + 0.04, mat: winMat });
  addBox(g, { w: 2.15, h: 1.65, d: 0.04, x: -1.7, y: 1.9, z: d / 2 + 0.01, mat: std('#2a1c18') });
  // mullions
  addBox(g, { w: 0.08, h: 1.55, d: 0.1, x: -1.7, y: 1.9, z: d / 2 + 0.08, mat: std('#3a281f') });
  addBox(g, { w: 2.1, h: 0.08, d: 0.1, x: -1.7, y: 1.9, z: d / 2 + 0.08, mat: std('#3a281f') });
  // sign
  const sign = textPlane('WANDLORE', { width: 512, height: 160, font: '700 62px Cinzel, Georgia, serif' });
  sign.scale.set(3.6, 1.12, 1);
  sign.position.set(0, 3.55, d / 2 + 0.1);
  g.add(sign);
  const signGlow = addGlow(g, '#ffcf8e', 3.4, 0, 3.55, d / 2 + 0.2, 0.28);
  // hanging lanterns
  for (const sx of [-2.55, 2.55]) {
    addBox(g, { w: 0.05, h: 0.5, d: 0.05, x: sx, y: 2.9, z: d / 2 + 0.4, mat: std('#2c2118') });
    addBox(g, { w: 0.28, h: 0.36, d: 0.28, x: sx, y: 2.6, z: d / 2 + 0.4, mat: warm(), shadow: false });
    addGlow(g, '#ffd28a', 0.9, sx, 2.6, d / 2 + 0.4, 0.55);
  }
  // chimney + smoke anchor
  addBox(g, { w: 0.75, h: 2.0, d: 0.75, x: 2.0, y: h + 1.1, z: -1.3, color: '#5f5a52' });
  const smokeOrigin = new THREE.Object3D();
  smokeOrigin.position.set(2.0, h + 2.2, -1.3);
  g.add(smokeOrigin);
  ctx.smokeSources ||= [];
  ctx.smokeSources.push(smokeOrigin);
  addPointLight(g, '#ffb15e', 1.6, 12, 0, 3.0, d / 2 + 0.8);
  colliders.push({ x, z, r: 3.9 });
  anims.push((dt, t) => { signGlow.material.opacity = 0.2 + Math.sin(t * 1.3) * 0.05; });
}

function marketStall(ctx, x, z, rot) {
  const { group, colliders } = ctx;
  const y = heightAt(x, z);
  const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = rot; group.add(g);
  for (const [sx, sz] of [[-1.1, -0.8], [1.1, -0.8], [-1.1, 0.8], [1.1, 0.8]]) addCyl(g, { r: 0.07, h: 2.2, seg: 5, x: sx, y: 1.1, z: sz, color: '#4a3528', shadow: false });
  const canopyTex = canvasTexture(256, 256, (c, w, h) => {
    for (let i = 0; i < 10; i++) { c.fillStyle = i % 2 ? '#533b3a' : '#bcae90'; c.fillRect(i * w / 10, 0, w / 10, h); }
  });
  const canopy = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.07, 2.1), new THREE.MeshStandardMaterial({ map: canopyTex, roughness: 0.9 }));
  canopy.position.y = 2.25; canopy.rotation.z = 0.06; canopy.castShadow = true; g.add(canopy);
  addBox(g, { w: 2.3, h: 0.15, d: 1.5, y: 0.95, mat: std('#5a4330') });
  addBox(g, { w: 2.3, h: 0.8, d: 0.1, y: 0.5, z: 0.7, mat: std('#5a4330') });
  for (let i = 0; i < 5; i++) {
    const col = pick(['#c98d5a', '#9cbf6d', '#c86b6b', '#d8c17a', '#8a6cb5']);
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.13 + Math.random() * 0.07, 8, 6), std(col, { roughness: 0.6 }));
    b.position.set(-0.9 + i * 0.45, 1.1, (Math.random() - 0.5) * 0.5); g.add(b);
  }
  colliders.push({ x, z, r: 1.8 });
}

function lantern(ctx, x, z) {
  const { group, anims } = ctx;
  const y = heightAt(x, z);
  const g = new THREE.Group(); g.position.set(x, y, z); group.add(g);
  addCyl(g, { r: 0.07, h: 3.6, seg: 6, y: 1.8, color: '#332a27', mat: std('#332a27', { metalness: 0.5, roughness: 0.6 }) });
  addBox(g, { w: 0.45, h: 0.5, d: 0.45, y: 3.75, mat: warm(), shadow: false });
  const frame = std('#2c211d', { metalness: 0.6, roughness: 0.4 });
  addBox(g, { w: 0.54, h: 0.08, d: 0.54, y: 4.02, mat: frame });
  addBox(g, { w: 0.54, h: 0.08, d: 0.54, y: 3.47, mat: frame });
  const glow = addGlow(g, '#ffd18a', 2.6, 0, 3.75, 0, 0.5);
  const light = addPointLight(g, '#ffb56d', 1.1, 13, 0, 3.7, 0);
  anims.push((dt, t) => {
    const f = 0.85 + Math.sin(t * 7.3 + x) * 0.1 + Math.sin(t * 13.7 + z) * 0.05;
    light.intensity = 1.1 * f; glow.material.opacity = 0.44 * f;
  });
}

function stringLights(group, pts, y) {
  const path = new THREE.CatmullRomCurve3(pts.map(([x, z]) => new THREE.Vector3(x, y, z)));
  const geo = new THREE.BufferGeometry().setFromPoints(path.getPoints(60));
  const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: '#3b3029', transparent: true, opacity: 0.65 }));
  group.add(line);
  for (let i = 1; i < 24; i++) {
    const p = path.getPoint(i / 24);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.055, 6, 5), new THREE.MeshBasicMaterial({ color: i % 3 ? '#ffd28a' : '#c9a2ff' }));
    bulb.position.copy(p); bulb.position.y -= 0.1 + Math.sin(i * 2.3) * 0.08;
    group.add(bulb);
    addGlow(group, i % 3 ? '#ffd28a' : '#c9a2ff', 0.55, p.x, p.y - 0.1, p.z, 0.5);
  }
}

function signpost(ctx, x, z, rot, entries) {
  const { group, colliders } = ctx;
  const y = heightAt(x, z);
  const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = rot; group.add(g);
  addCyl(g, { r: 0.1, h: 3.1, seg: 6, y: 1.55, color: '#4a3528' });
  entries.forEach(([a, b], i) => {
    const sign = textPlane(`${a}`, { width: 512, height: 128, font: '700 30px Cinzel, Georgia, serif' });
    sign.scale.set(2.6, 0.65, 1);
    sign.position.set(0, 2.65 - i * 0.55, 0.08);
    sign.rotation.y = i % 2 ? 0.35 : -0.35;
    g.add(sign);
  });
  colliders.push({ x, z, r: 0.7 });
}

/* ══════════════════════════════════════════ ACADEMY */
export function buildAcademy(ctx) {
  const { group, colliders, anims } = ctx;
  const cx = -64, cz = -44;
  const baseY = heightAt(cx, cz);
  const g = new THREE.Group(); g.position.set(cx, baseY, cz); group.add(g);
  const stoneMat = std('#585568', { roughness: 0.9 });
  const stoneDark = std('#454354', { roughness: 0.92 });
  const roof = std('#2f2945', { roughness: 0.8 });
  const glowWin = new THREE.MeshStandardMaterial({ color: '#ffe3ac', emissive: '#ffb45f', emissiveIntensity: 1.35, roughness: 0.35 });

  // keep
  addBox(g, { w: 22, h: 17, d: 16, y: 8.5, mat: stoneMat });
  addBox(g, { w: 22.6, h: 0.8, d: 16.6, y: 16.8, mat: stoneDark });
  // crenellations
  for (let i = -5; i <= 5; i++) {
    addBox(g, { w: 1.1, h: 1.2, d: 0.9, x: i * 2.05, y: 17.8, z: 8.2, mat: stoneDark });
    addBox(g, { w: 1.1, h: 1.2, d: 0.9, x: i * 2.05, y: 17.8, z: -8.2, mat: stoneDark });
  }
  // main roof
  const mainRoof = new THREE.Mesh(new THREE.ConeGeometry(15.5, 8.0, 4), roof);
  mainRoof.position.y = 21.2; mainRoof.rotation.y = Math.PI / 4; mainRoof.castShadow = true; g.add(mainRoof);
  // roof ridge trim
  addCyl(g, { r: 0.09, h: 7, seg: 4, y: 25.3, color: '#8a7752', mat: std('#8a7752', { metalness: 0.5, roughness: 0.4 }) });

  // corner towers
  const towers = [[-11, 8.5, 24, 1.15], [11, 8.5, 24, 1.15], [-11, -8.5, 20, 0.95], [11, -8.5, 20, 0.95]];
  towers.forEach(([tx, tz, th, sc], ti) => {
    addCyl(g, { r: 3.4 * sc, h: th, seg: 14, x: tx, y: th / 2, z: tz, mat: stoneMat });
    addCyl(g, { rt: 3.55 * sc, rb: 3.4 * sc, h: 0.5, seg: 14, x: tx, y: th, z: tz, mat: stoneDark });
    const tr = new THREE.Mesh(new THREE.ConeGeometry(4.1 * sc, 6.2 * sc, 12), roof);
    tr.position.set(tx, th + 3.1 * sc, tz); tr.castShadow = true; g.add(tr);
    // finial
    addCyl(g, { r: 0.05, h: 2.2, seg: 4, x: tx, y: th + 7.1 * sc, z: tz, color: '#c3a05a', mat: std('#c3a05a', { metalness: 0.8, roughness: 0.3 }) });
    // windows
    for (let k = 0; k < 3; k++) {
      const wy = 5 + k * 6;
      const w = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.9), glowWin);
      w.position.set(tx + (tx > 0 ? 0 : 0), wy, tz + 3.45 * sc + 0.02);
      w.rotation.y = 0;
      g.add(w);
    }
    // banner
    if (ti < 2) {
      const banner = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 4.4), new THREE.MeshStandardMaterial({ map: canvasTexture(256, 512, (c, w, h) => {
        c.fillStyle = ti === 0 ? '#3b2b5e' : '#4a2c45'; c.fillRect(0, 0, w, h);
        c.fillStyle = '#d9b96e'; c.font = '700 200px Georgia, serif'; c.textAlign = 'center'; c.fillText('A', w / 2, 300);
        c.strokeStyle = '#d9b96e'; c.lineWidth = 8; c.strokeRect(14, 14, w - 28, h - 28);
      }), side: THREE.DoubleSide, roughness: 0.9 }));
      banner.position.set(tx, 11.5, tz + 3.9 * sc);
      g.add(banner);
      anims.push((dt, t) => { banner.rotation.z = Math.sin(t * 0.8 + ti) * 0.025; });
    }
  });

  // side wings
  for (const sx of [-1, 1]) {
    addBox(g, { w: 9, h: 9, d: 11, x: sx * 15, y: 4.5, mat: stoneMat });
    const wingRoof = new THREE.Mesh(new THREE.ConeGeometry(8, 5.2, 4), roof);
    wingRoof.position.set(sx * 15, 11.5, 0); wingRoof.rotation.y = Math.PI / 4; wingRoof.castShadow = true; g.add(wingRoof);
    for (let k = 0; k < 3; k++) {
      const win = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.6), glowWin);
      win.position.set(sx * 15 - 3 + k * 3, 4.5, 5.56);
      g.add(win);
    }
  }

  // gatehouse / front entrance
  addBox(g, { w: 10, h: 10, d: 3.5, y: 5, z: 9, mat: stoneDark });
  addBox(g, { w: 11, h: 0.7, d: 4.2, y: 10, z: 9, mat: stoneMat });
  const gateArch = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.36, 8, 24, Math.PI), stoneMat);
  gateArch.position.set(0, 3.2, 10.8); g.add(gateArch);
  addBox(g, { w: 4.4, h: 3.0, d: 0.18, y: 1.5, z: 10.75, mat: std('#221a2a') });
  addBox(g, { w: 2.0, h: 5.2, d: 0.24, y: 2.6, z: 10.9, mat: new THREE.MeshStandardMaterial({ color: '#3a2a20', roughness: 0.8 }) });
  const gateGlow = addGlow(g, '#ffcf8a', 3.4, 0, 3.0, 11.1, 0.34);
  addPointLight(g, '#ffbe74', 2.2, 20, 0, 5, 11);
  addGlow(g, '#ffd28a', 4.0, 0, 12.5, 9.2, 0.22);
  // steps
  for (let i = 0; i < 8; i++) {
    addBox(g, { w: 9 - i * 0.6, h: 0.42, d: 1.2, y: 0.2 - i * 0.38, z: 11.3 + i * 1.05, mat: stoneMat, shadow: false });
  }

  // courtyard hedges
  for (const sx of [-1, 1]) {
    for (let i = 0; i < 5; i++) {
      addBox(g, { w: 1.2, h: 1.2, d: 1.6, x: sx * (4 + i * 0.9), y: 0.6, z: 14 + i * 2.4, mat: std('#2c452c', { roughness: 1 }) });
    }
  }
  // lamp posts at gate
  for (const sx of [-1, 1]) {
    addCyl(g, { r: 0.09, h: 3.4, seg: 6, x: sx * 6.1, y: 1.7, z: 10.5, color: '#2c2620', mat: std('#2c2620') });
    addBox(g, { w: 0.42, h: 0.55, d: 0.42, x: sx * 6.1, y: 3.55, z: 10.5, mat: glowWin, shadow: false });
    addGlow(g, '#ffc985', 2.1, sx * 6.1, 3.55, 10.5, 0.5);
  }

  // floating candles in courtyard
  const candles = [];
  for (let i = 0; i < 14; i++) {
    const anchor = new THREE.Group();
    const x = (Math.random() - 0.5) * 22, z = 13 + Math.random() * 13, yy = 3 + Math.random() * 6;
    anchor.position.set(x, yy, z); g.add(anchor);
    addCyl(anchor, { r: 0.07, h: 0.5, seg: 6, y: 0, color: '#e8dcc0', shadow: false });
    const flame = addGlow(anchor, '#ffd38a', 0.6, 0, 0.3, 0, 0.8);
    addGlow(anchor, '#ffbd6e', 1.4, 0, 0.3, 0, 0.16);
    candles.push({ anchor, base: yy, phase: Math.random() * TAU, flame });
  }
  anims.push((dt, t) => {
    for (const c of candles) { c.anchor.position.y = c.base + Math.sin(t * 0.8 + c.phase) * 0.35; c.flame.material.opacity = 0.65 + Math.sin(t * 9 + c.phase) * 0.2; }
    gateGlow.material.opacity = 0.3 + Math.sin(t * 1.7) * 0.06;
  });

  colliders.push({ x: cx, z: cz, r: 14.5 });
  ctx.smokeSources ||= [];
  return g;
}

/* ══════════════════════════════════════════ FOREST */
export function buildForest(ctx) {
  const { group, colliders, anims } = ctx;
  const random = mulberry32(1944);
  const cx = 52, cz = -36;
  const baseY = heightAt(cx, cz);

  // ancient tree
  const ancient = new THREE.Group(); ancient.position.set(cx, baseY, cz); group.add(ancient);
  addCyl(ancient, { rt: 1.7, rb: 3.0, h: 15, seg: 12, y: 7.5, color: '#3b2a2a', mat: std('#3b2a2a', { roughness: 1 }) });
  // roots
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * TAU;
    const root = addCyl(ancient, { rt: 0.25, rb: 0.8, h: 4.4, seg: 6, x: Math.cos(a) * 2.2, y: 1.1, z: Math.sin(a) * 2.2, color: '#3b2a2a' });
    root.rotation.z = Math.cos(a) * 0.9; root.rotation.x = Math.sin(a) * 0.9;
  }
  for (let i = 0; i < 7; i++) {
    const a = random() * TAU, r = 1.2 + random() * 5;
    const leafMat = std(pick(['#26402c', '#2f5035', '#3c5b38', '#1f3826']), { roughness: 1 });
    const ball = new THREE.Mesh(new THREE.IcosahedronGeometry(2.2 + random() * 2.6, 1), leafMat);
    ball.position.set(Math.cos(a) * r, 13 + random() * 7, Math.sin(a) * r);
    ball.scale.y = 0.75; ball.castShadow = true; ancient.add(ball);
  }
  // hanging glowing vines
  const vines = [];
  for (let i = 0; i < 12; i++) {
    const a = random() * TAU, r = 2.5 + random() * 6;
    const vine = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.02, 2 + random() * 5, 4), new THREE.MeshBasicMaterial({ color: pick(['#6ed8c8', '#9d7bff', '#7de6d0']), transparent: true, opacity: 0.5 }));
    vine.position.set(Math.cos(a) * r, 11 + random() * 4, Math.sin(a) * r);
    ancient.add(vine); vines.push(vine);
  }
  addGlow(ancient, '#7de6d0', 9, 0, 15, 0, 0.18);
  addPointLight(ancient, '#6fdfd0', 1.6, 24, 0, 10, 0);
  colliders.push({ x: cx, z: cz, r: 3.4 });

  // stone circle
  const sc = new THREE.Group(); sc.position.set(44, heightAt(44, -48), -48); group.add(sc);
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * TAU;
    const h = 2.4 + random() * 1.8;
    const st = addBox(sc, { w: 0.9, h, d: 0.6, x: Math.cos(a) * 6.5, y: h / 2, z: Math.sin(a) * 6.5, ry: -a, mat: std('#5a5a62', { roughness: 0.95 }) });
    st.rotation.z = (random() - 0.5) * 0.12;
    const rune = textPlane(pick(['ᚦ', 'ᛉ', 'ᛟ', 'ᚱ', 'ᛏ', 'ᛗ', 'ᛊ']), { color: '#8fe7ff', bg: 'transparent', border: 'transparent', width: 128, height: 128, font: '80px Georgia, serif' });
    rune.scale.set(0.5, 0.5, 1);
    rune.position.set(Math.cos(a) * 6.1, h * 0.62, Math.sin(a) * 6.1);
    rune.rotation.y = -a + Math.PI / 2;
    sc.add(rune);
  }
  const circleGlow = addGlow(sc, '#7de6d0', 10, 0, 0.3, 0, 0.16);
  const circleRing = new THREE.Mesh(new THREE.RingGeometry(5.9, 6.25, 48), new THREE.MeshBasicMaterial({ color: '#6fe5d0', transparent: true, opacity: 0.24, side: THREE.DoubleSide }));
  circleRing.rotation.x = -Math.PI / 2; circleRing.position.y = 0.1; sc.add(circleRing);
  anims.push((dt, t) => { circleRing.material.opacity = 0.16 + Math.sin(t * 1.4) * 0.07; circleGlow.material.opacity = 0.12 + Math.sin(t * 1.1) * 0.05; vines.forEach((v, i) => { v.rotation.z = Math.sin(t * 0.5 + i) * 0.04; }); });

  // mushrooms
  const mushroomMats = [std('#4a2b56', { emissive: '#8e4fd8', emissiveIntensity: 0.7 }), std('#2c4a5a', { emissive: '#3fc7c7', emissiveIntensity: 0.6 })];
  for (let i = 0; i < 16; i++) {
    const mx = cx + (random() - 0.5) * 44, mz = cz + (random() - 0.5) * 44;
    if (Math.hypot(mx - 44, mz + 48) < 8) continue;
    const y = heightAt(mx, mz);
    const mg = new THREE.Group(); mg.position.set(mx, y, mz); group.add(mg);
    const s = 0.5 + random() * 1.1;
    addCyl(mg, { r: 0.08 * s, h: 0.7 * s, seg: 5, y: 0.35 * s, color: '#d8cbb4', shadow: false });
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.35 * s, 10, 6, 0, TAU, 0, Math.PI / 2), pick(mushroomMats));
    cap.position.y = 0.7 * s; mg.add(cap);
    addGlow(mg, pick(['#b47dff', '#6fe5d0']), 1.4 * s, 0, 0.7 * s, 0, 0.24);
  }

  // fallen log
  const log = addCyl(group, { rt: 0.8, rb: 1.0, h: 8, seg: 8, x: 66, y: heightAt(66, -30) + 0.8, z: -30, color: '#4a3427' });
  log.rotation.z = Math.PI / 2; log.rotation.y = 0.6;
  for (let i = 0; i < 5; i++) {
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 5, 0, TAU, 0, Math.PI / 2), std('#6fe5b0', { emissive: '#2fae6a', emissiveIntensity: 0.4 }));
    cap.position.set(63 + i * 1.3, heightAt(66, -30) + 1.65, -31 + i * 0.18); group.add(cap);
  }

  // arch sign
  const arch = new THREE.Group(); arch.position.set(31, heightAt(31, -20), -20); arch.rotation.y = 2.4; group.add(arch);
  for (const sx of [-1.8, 1.8]) addCyl(arch, { r: 0.18, h: 4.2, seg: 6, x: sx, y: 2.1, color: '#4a3528' });
  addBox(arch, { w: 4.1, h: 0.45, d: 0.3, y: 4.25, mat: std('#4a3528') });
  const fsign = textPlane('WHISPERWOOD', { font: '700 44px Cinzel, Georgia, serif' });
  fsign.scale.set(3.3, 1, 1); fsign.position.set(0, 3.6, 0.2); arch.add(fsign);
  addGlow(arch, '#8fe7b0', 1.8, 0, 3.6, 0.2, 0.3);
  anims.push((dt, t) => { ancient.rotation.y = Math.sin(t * 0.04) * 0.008; });

  // extra trees around clearing
  for (let i = 0; i < 12; i++) {
    const a = random() * TAU, r = 9 + random() * 17;
    addTreeCluster(group, cx + Math.cos(a) * r, cz + Math.sin(a) * r, random, { conifer: random() > 0.5, scale: 0.9, n: 2 });
  }
}

/* ══════════════════════════════════════════ LAKE */
export function buildLake(ctx) {
  const { group, colliders, anims } = ctx;
  const random = mulberry32(818);
  const L = { x: 52, z: 78 };
  const dock = new THREE.Group(); dock.position.set(38, 0.6, 64); dock.rotation.y = -0.85; group.add(dock);
  for (let i = 0; i < 8; i++) {
    addBox(dock, { w: 3.0, h: 0.18, d: 1.1, y: 0, z: -i * 1.05, mat: std(i % 2 ? '#5f4835' : '#6b523d') });
    for (const sx of [-1.2, 1.2]) addCyl(dock, { r: 0.10, h: 2.6, seg: 6, x: sx, y: -1.1, z: -i * 1.05 + 0.4, color: '#3d2c22' });
  }
  for (const [x, z] of [[-1.4, 0.2], [1.4, 0.2], [-1.4, -7.8], [1.4, -7.8]]) addCyl(dock, { r: 0.11, h: 1.4, seg: 6, x, y: 0.7, z, color: '#3d2c22' });
  // lantern on dock
  addCyl(dock, { r: 0.07, h: 2.2, seg: 5, x: 1.35, y: 1.5, z: -6.6, color: '#332a27' });
  addBox(dock, { w: 0.32, h: 0.4, d: 0.32, x: 1.35, y: 2.7, z: -6.6, mat: new THREE.MeshStandardMaterial({ color: '#ffdda0', emissive: '#ffae4d', emissiveIntensity: 1.5 }), shadow: false });
  addGlow(dock, '#ffcf8a', 2.2, 1.35, 2.7, -6.6, 0.55);
  addPointLight(dock, '#ffb56d', 1.4, 12, 1.35, 2.7, -6.6);
  // boat
  const boat = new THREE.Group(); boat.position.set(4.8, 0.55, -8.5); dock.add(boat);
  addBox(boat, { w: 1.5, h: 0.45, d: 3.1, y: 0.2, mat: std('#5a4130') });
  addCone(boat, { r: 0.75, h: 1.0, seg: 4, y: 0.32, z: 1.6, rx: Math.PI / 2, color: '#5a4130' });
  addCone(boat, { r: 0.75, h: 1.0, seg: 4, y: 0.32, z: -1.6, rx: -Math.PI / 2, color: '#5a4130' });
  addCyl(boat, { r: 0.04, h: 2.0, seg: 4, y: 1.3, color: '#3b2b20' });
  anims.push((dt, t) => { boat.position.y = 0.55 + Math.sin(t * 1.2 + 1) * 0.05; boat.rotation.z = Math.sin(t * 0.8) * 0.02; });

  // reeds and rocks shore
  for (let i = 0; i < 70; i++) {
    const a = random() * TAU;
    const r = 46 + random() * 9;
    const x = L.x + Math.cos(a) * r, z = L.z + Math.sin(a) * r;
    const y = heightAt(x, z);
    if (y < -1.8) continue;
    if (random() > 0.55) {
      const reed = new THREE.Group(); reed.position.set(x, y, z); group.add(reed);
      for (let k = 0; k < 4; k++) {
        const h = 0.8 + random() * 1.4;
        const stalk = addCyl(reed, { r: 0.018, h, seg: 3, x: (random() - 0.5) * 0.5, y: h / 2, z: (random() - 0.5) * 0.5, color: '#6e7f4a', shadow: false });
        stalk.rotation.z = (random() - 0.5) * 0.2;
      }
    } else {
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.4 + random() * 1.1, 0), std(random() > 0.5 ? '#4a4a52' : '#3d4244'));
      rock.position.set(x, y + 0.2, z); rock.scale.y = 0.7; group.add(rock);
    }
  }
  // lily pads
  const lilyMat = std('#3f6b4d', { roughness: 0.7 });
  const flowerMat = new THREE.MeshStandardMaterial({ color: '#f2d7ff', emissive: '#b57dff', emissiveIntensity: 0.8 });
  const lilies = [];
  for (let i = 0; i < 22; i++) {
    const a = random() * TAU, r = 8 + random() * 26;
    const x = L.x + Math.cos(a) * r, z = L.z + Math.sin(a) * r;
    if (Math.hypot(x - 45, z - 70) < 7) continue;
    const pad = new THREE.Mesh(new THREE.CircleGeometry(0.45 + random() * 0.8, 10, 0.4, TAU - 0.8), lilyMat);
    pad.rotation.x = -Math.PI / 2; pad.position.set(x, 0.14, z); group.add(pad);
    if (random() > 0.55) {
      const f = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.28, 6), flowerMat);
      f.position.set(x, 0.28, z); group.add(f);
      addGlow(group, '#d3a7ff', 0.8, x, 0.3, z, 0.4);
    }
    lilies.push(pad);
  }
  // island shrine
  const island = new THREE.Group(); island.position.set(66, 0, 96); group.add(island);
  const rockBase = new THREE.Mesh(new THREE.DodecahedronGeometry(5.2, 1), std('#4a4d52'));
  rockBase.scale.set(1.5, 0.7, 1.2); rockBase.position.y = 0.8; island.add(rockBase);
  addBox(island, { w: 4.4, h: 0.3, d: 3.6, y: 2.9, mat: std('#6c6a63') });
  for (const sx of [-1.4, 1.4]) addCyl(island, { r: 0.22, h: 3.2, seg: 6, x: sx, y: 4.5, z: 0, color: '#6c6a63' });
  addBox(island, { w: 3.3, h: 0.3, d: 0.4, y: 6.05, mat: std('#6c6a63') });
  addGlow(island, '#8fe7ff', 3.2, 0, 5.2, 0, 0.25);
  addTreeCluster(island, 1.8, -0.8, random, { scale: 0.55, n: 1, leaf: ['#2f4d3a'] });

  // moon path on water
  const shimmer = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 44), new THREE.MeshBasicMaterial({ map: canvasTexture(128, 512, (c, w, h) => {
    const g = c.createLinearGradient(0, 0, w, 0);
    g.addColorStop(0, 'rgba(220,235,255,0)'); g.addColorStop(0.5, 'rgba(220,235,255,.35)'); g.addColorStop(1, 'rgba(220,235,255,0)');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
    for (let i = 0; i < 60; i++) { c.fillStyle = `rgba(255,255,240,${Math.random() * 0.35})`; c.fillRect(Math.random() * w, Math.random() * h, 2 + Math.random() * 3, 1); }
  }), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.55 }));
  shimmer.rotation.x = -Math.PI / 2; shimmer.position.set(52, 0.2, 92); group.add(shimmer);
  anims.push((dt, t) => { shimmer.material.opacity = 0.35 + Math.sin(t * 0.7) * 0.12; lilies.forEach((p, i) => { p.rotation.z = Math.sin(t * 0.4 + i) * 0.03; }); });

  // lake spot interact hints handled in world
  const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(2.2, 0), std('#454a50'));
  rock.position.set(40, 0.4, 80); rock.scale.set(1.2, 0.5, 1); group.add(rock);
  addGlow(group, '#7de6d0', 1.6, 40, 1.0, 80, 0.2);
}
