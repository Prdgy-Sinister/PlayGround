import * as THREE from 'three';
import { MATERIALS, WEAPON_TYPES } from './data.js';

const matCache = new Map();
function steelMat(matId, supernatural, q = 60) {
  const key = `steel-${matId}-${supernatural}-${q}`;
  if (matCache.has(key)) return matCache.get(key);
  const base = MATERIALS[matId]?.color ?? 0xd6dde0;
  const color = new THREE.Color(base);
  const m = new THREE.MeshStandardMaterial({
    color,
    metalness: 0.92,
    roughness: 0.22 - q * 0.0008,
    emissive: supernatural ? (matId === 'onisteel' ? 0x4a0a1c : 0x0a2a24) : 0x000000,
    emissiveIntensity: supernatural ? 0.55 : 0,
    envMapIntensity: 1.2,
    flatShading: false,
  });
  matCache.set(key, m);
  return m;
}

function woodMat(color = 0x3f2a1c) {
  const key = 'wood' + color;
  if (!matCache.has(key)) matCache.set(key, new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.02, flatShading: true }));
  return matCache.get(key);
}

function brassMat() {
  if (!matCache.has('brass')) matCache.set('brass', new THREE.MeshStandardMaterial({ color: 0xb08a44, metalness: 0.85, roughness: 0.32 }));
  return matCache.get('brass');
}
function lacquerMat(color = 0x1c1a20) {
  const key = 'lacquer' + color;
  if (!matCache.has(key)) matCache.set(key, new THREE.MeshStandardMaterial({ color, roughness: 0.28, metalness: 0.25 }));
  return matCache.get(key);
}

let wrapTexture = null;
function getWrapTexture(supernatural = false) {
  if (supernatural) {
    const c = document.createElement('canvas'); c.width = 64; c.height = 64;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#2a0e18'; ctx.fillRect(0, 0, 64, 64);
    ctx.strokeStyle = '#c49452'; ctx.lineWidth = 5;
    for (let i = -64; i < 128; i += 20) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + 40, 64); ctx.stroke(); }
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(2, 3);
    return t;
  }
  if (wrapTexture) return wrapTexture;
  const c = document.createElement('canvas'); c.width = 64; c.height = 64;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#19161a'; ctx.fillRect(0, 0, 64, 64);
  ctx.strokeStyle = '#c9b98f'; ctx.lineWidth = 3;
  for (let i = -64; i < 128; i += 16) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + 24, 64); ctx.stroke(); }
  for (let i = 128; i > -64; i -= 16) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i - 24, 64); ctx.stroke(); }
  wrapTexture = new THREE.CanvasTexture(c);
  wrapTexture.wrapS = wrapTexture.wrapT = THREE.RepeatWrapping;
  wrapTexture.repeat.set(1.5, 2.5);
  return wrapTexture;
}

function handleMesh(len = 0.62, supernatural = false, color = null, radius = 0.055) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    map: getWrapTexture(supernatural), color: color || 0xffffff, roughness: 0.62, metalness: 0.12,
  });
  const h = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.9, radius, len, 10), mat);
  h.position.y = len / 2;
  h.castShadow = true;
  g.add(h);
  const pommel = new THREE.Mesh(new THREE.CylinderGeometry(radius * 1.05, radius * 1.0, 0.045, 10), brassMat());
  pommel.position.y = 0.02;
  g.add(pommel);
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(radius * 1.1, radius * 1.1, 0.04, 10), brassMat());
  collar.position.y = len - 0.02;
  g.add(collar);
  return g;
}

function bladeShapeGeometry(len, width, curve, thickness = 0.05) {
  const s = new THREE.Shape();
  s.moveTo(-width * 0.5, 0);
  s.quadraticCurveTo(curve * 0.55, len * 0.55, curve, len);
  s.quadraticCurveTo(curve * 0.55 + width * 0.35, len * 0.92, width * 0.52 + curve * 0.15, len * 0.78);
  s.quadraticCurveTo(width * 0.62, len * 0.35, width * 0.5, 0);
  s.lineTo(-width * 0.5, 0);
  const geo = new THREE.ExtrudeGeometry(s, { depth: thickness, bevelEnabled: true, bevelSize: 0.008, bevelThickness: 0.008, bevelSegments: 1, steps: 1 });
  geo.translate(0, 0, -thickness / 2);
  return geo;
}

function katanaLike({ bladeLen = 2.0, width = 0.075, curve = 0.18, handleLen = 0.42, matId = 'iron', quality = 60, supernatural = false, wrapColor = 0x1b1a1f, guard = 'round' }) {
  const g = new THREE.Group();
  const steel = steelMat(matId, supernatural, quality);
  const blade = new THREE.Mesh(bladeShapeGeometry(bladeLen, width, curve), steel);
  blade.position.y = handleLen + 0.08;
  blade.castShadow = true;
  g.add(blade);

  const habaki = new THREE.Mesh(new THREE.BoxGeometry(width * 1.5, 0.075, 0.09), brassMat());
  habaki.position.y = handleLen + 0.06;
  g.add(habaki);

  let tsuba;
  if (guard === 'square') {
    tsuba = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.03, 0.22), brassMat());
  } else {
    tsuba = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.028, 16), brassMat());
    tsuba.rotation.x = Math.PI / 2;
  }
  tsuba.position.y = handleLen + 0.012;
  tsuba.castShadow = true;
  g.add(tsuba);
  const tsubaDetail = new THREE.Mesh(new THREE.TorusGeometry(0.105, 0.012, 4, 16), lacquerMat(0x2a2119));
  tsubaDetail.position.y = handleLen + 0.012;
  tsubaDetail.rotation.x = Math.PI / 2;
  g.add(tsubaDetail);

  const handle = handleMesh(handleLen, supernatural, wrapColor);
  g.add(handle);

  if (supernatural) {
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(bladeLen * 0.75, width * 3), new THREE.MeshBasicMaterial({ color: matId === 'onisteel' ? 0xff3355 : 0x4fffd0, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    glow.position.set(curve * 0.8, handleLen + bladeLen * 0.55, 0);
    glow.rotation.z = -0.09;
    g.add(glow);
  }
  return g;
}

function kunaiMesh(matId, quality, supernatural) {
  const g = new THREE.Group();
  const steel = steelMat(matId, supernatural, quality);
  const s = new THREE.Shape();
  s.moveTo(0, 0); s.lineTo(0.11, 0.22); s.lineTo(0, 0.62); s.lineTo(-0.11, 0.22); s.closePath();
  const bl = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: 0.03, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.01, bevelSegments: 1 }), steel);
  bl.position.y = 0.2;
  bl.position.z = -0.015;
  g.add(bl);
  const h = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.24, 8), woodMat(0x2d241b));
  h.position.y = 0.1;
  g.add(h);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.018, 5, 12), brassMat());
  ring.position.y = -0.08;
  ring.rotation.x = Math.PI / 2;
  g.add(ring);
  return g;
}

function saiMesh(matId, quality, supernatural) {
  const g = new THREE.Group();
  const steel = steelMat(matId, supernatural, quality);
  const h = handleMesh(0.36, supernatural);
  g.add(h);
  const guard = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.03, 10), brassMat());
  guard.position.y = 0.36;
  g.add(guard);
  const center = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.045, 0.68, 8), steel);
  center.position.y = 0.72;
  g.add(center);
  for (const sx of [-1, 1]) {
    const prong = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.035, 0.32, 6), steel);
    prong.position.set(sx * 0.11, 0.55, 0);
    prong.rotation.z = sx * 0.28;
    g.add(prong);
  }
  return g;
}

function poleArm(kind, matId, quality, supernatural) {
  const g = new THREE.Group();
  const steel = steelMat(matId, supernatural, quality);
  const shaftLen = kind === 'naginata' ? 2.5 : 2.7;
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, shaftLen, 8), woodMat(0x3b2a1d));
  shaft.position.y = shaftLen / 2;
  shaft.castShadow = true;
  g.add(shaft);
  for (let i = 0; i < 4; i++) {
    const wrap = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.05, 8), lacquerMat(0x20242a));
    wrap.position.y = 0.34 + i * 0.12;
    g.add(wrap);
  }
  if (kind === 'naginata') {
    const blade = new THREE.Mesh(bladeShapeGeometry(1.05, 0.11, 0.16), steel);
    blade.position.y = shaftLen;
    blade.rotation.z = Math.PI;
    blade.castShadow = true;
    g.add(blade);
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.07, 0.12, 8), brassMat());
    collar.position.y = shaftLen + 0.02;
    g.add(collar);
  } else {
    const s = new THREE.Shape();
    s.moveTo(0, 0); s.lineTo(0.07, 0.16); s.lineTo(0, 0.6); s.lineTo(-0.07, 0.16); s.closePath();
    const tip = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: 0.035, bevelEnabled: true, bevelSize: 0.006, bevelThickness: 0.006, bevelSegments: 1 }), steel);
    tip.position.y = shaftLen;
    tip.position.z = -0.017;
    g.add(tip);
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.065, 0.1, 8), brassMat());
    collar.position.y = shaftLen + 0.01;
    g.add(collar);
  }
  return g;
}

function bowMesh(matId, quality, supernatural) {
  const g = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color: MATERIALS[matId]?.color || 0x5a3b25, roughness: 0.55, metalness: 0.1, emissive: supernatural ? 0x0a2a24 : 0, emissiveIntensity: 0.5 });
  const pts = [];
  for (let i = 0; i <= 16; i++) {
    const t = i / 16;
    const y = t * 2.3;
    const x = Math.sin(t * Math.PI) * (t > 0.62 ? 0.28 : 0.36) - 0.2;
    pts.push(new THREE.Vector3(x, y, 0));
  }
  const curve = new THREE.CatmullRomCurve3(pts);
  const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.035, 6, false), wood);
  tube.castShadow = true;
  g.add(tube);
  for (const cap of [0, 1]) {
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.12, 8), brassMat());
    c.position.copy(curve.getPoint(cap));
    g.add(c);
  }
  const stringMat = new THREE.LineBasicMaterial({ color: 0xe8ddc2, transparent: true, opacity: 0.8 });
  const strGeo = new THREE.BufferGeometry().setFromPoints([pts[0], new THREE.Vector3(-0.28, 0.95, 0), pts[pts.length - 1]]);
  g.add(new THREE.Line(strGeo, stringMat));
  const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.46, 8), lacquerMat(0x1a2026));
  grip.position.set(-0.08, 1.12, 0);
  grip.rotation.z = -0.06;
  g.add(grip);
  return g;
}

function armourMesh(matId, quality, supernatural) {
  const g = new THREE.Group();
  const lacquer = new THREE.MeshStandardMaterial({ color: 0x6d1f26, roughness: 0.35, metalness: 0.2, emissive: supernatural ? 0x2a0510 : 0, emissiveIntensity: 0.4 });
  const gold = brassMat();
  const dark = lacquerMat(0x17151a);
  // stand
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.06, 0.4), woodMat(0x32241a));
  base.position.y = 0.03;
  g.add(base);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.5, 8), woodMat(0x32241a));
  pole.position.y = 0.78;
  g.add(pole);
  // chest
  const chest = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.58, 0.3, 1, 1, 1), lacquer);
  chest.position.y = 1.28;
  g.add(chest);
  for (let i = 0; i < 4; i++) {
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.1, 0.31), i % 2 ? gold : lacquer);
    plate.position.y = 1.02 + i * 0.16;
    g.add(plate);
  }
  // shoulders
  for (const sx of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.07, 0.26), lacquer);
      p.position.set(sx * (0.42 + i * 0.05), 1.48 - i * 0.05, 0);
      p.rotation.z = sx * 0.24;
      g.add(p);
    }
  }
  // skirt
  for (let i = 0; i < 5; i++) {
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.34, 0.06), i % 2 ? gold : lacquer);
    p.position.set(-0.26 + i * 0.13, 0.88, 0.17);
    p.rotation.x = -0.12;
    g.add(p);
  }
  // helmet
  const helm = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), lacquer);
  helm.position.y = 1.72;
  g.add(helm);
  const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.3, 0.045, 12), lacquer);
  brim.position.y = 1.67;
  g.add(brim);
  const crest = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.26, 0.06), gold);
  crest.position.y = 1.9;
  crest.rotation.z = 0.3;
  g.add(crest);
  for (const sx of [-1, 1]) {
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.26, 6), gold);
    horn.position.set(sx * 0.14, 1.86, 0);
    horn.rotation.z = sx * 0.5;
    g.add(horn);
  }
  // mask
  const mask = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), dark);
  mask.position.set(0, 1.6, 0.16);
  mask.scale.z = 0.5;
  g.add(mask);
  return g;
}

function ornamentMesh(matId, quality, supernatural) {
  const g = new THREE.Group();
  const steel = steelMat(matId, supernatural, quality);
  const shape = new THREE.Shape();
  shape.absarc(0, 0, 0.28, 0, Math.PI * 2, false);
  for (const [a, r] of [[0.4, 0.08], [2.4, 0.07], [4.3, 0.09]]) {
    const hole = new THREE.Path();
    hole.absarc(Math.cos(a) * 0.12, Math.sin(a) * 0.12, r, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
  const disc = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.035, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.008, bevelSegments: 1 }), steel);
  disc.rotation.x = -Math.PI / 2;
  disc.position.y = 0.72;
  g.add(disc);
  const stand = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.05, 0.3), woodMat(0x32241a));
  stand.position.y = 0.025;
  g.add(stand);
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.65, 6), woodMat(0x32241a));
  post.position.y = 0.36;
  g.add(post);
  return g;
}

export function createWeaponMesh(typeId, opts = {}) {
  const type = WEAPON_TYPES[typeId] || WEAPON_TYPES.katana;
  const matId = opts.material || 'iron';
  const quality = opts.quality ?? 60;
  const supernatural = !!(opts.supernatural ?? type.supernatural);
  let g;
  switch (typeId) {
    case 'tanto': g = katanaLike({ bladeLen: 0.95, width: 0.07, curve: 0.06, handleLen: 0.34, matId, quality, supernatural }); break;
    case 'wakizashi': g = katanaLike({ bladeLen: 1.45, width: 0.075, curve: 0.12, handleLen: 0.4, matId, quality, supernatural }); break;
    case 'nodachi': g = katanaLike({ bladeLen: 3.1, width: 0.095, curve: 0.28, handleLen: 0.66, matId, quality, supernatural, guard: 'square' }); break;
    case 'kunai': g = kunaiMesh(matId, quality, supernatural); break;
    case 'sai': g = saiMesh(matId, quality, supernatural); break;
    case 'yari': g = poleArm('yari', matId, quality, supernatural); break;
    case 'naginata': g = poleArm('naginata', matId, quality, supernatural); break;
    case 'yumi': g = bowMesh(matId, quality, supernatural); break;
    case 'armour': g = armourMesh(matId, quality, supernatural); break;
    case 'ornament': g = ornamentMesh(matId, quality, supernatural); break;
    case 'oniBlade': g = katanaLike({ bladeLen: 2.3, width: 0.085, curve: 0.24, handleLen: 0.48, matId: 'onisteel', quality, supernatural: true }); break;
    case 'moonBow': g = bowMesh('spiritwood', quality, true); break;
    case 'soulNaginata': g = poleArm('naginata', 'onisteel', quality, true); break;
    default: g = katanaLike({ bladeLen: 2.1, width: 0.08, curve: 0.19, handleLen: 0.46, matId, quality, supernatural });
  }
  g.userData.typeId = typeId;
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; } });
  return g;
}

export function createWeaponDisplay(weapon, opts = {}) {
  const holder = new THREE.Group();
  const w = createWeaponMesh(weapon.type, { material: weapon.material, quality: weapon.quality, supernatural: weapon.supernatural });
  const isPole = ['naginata', 'yari', 'yumi', 'nodachi'].includes(weapon.type);
  const box = new THREE.Box3().setFromObject(w);
  const size = new THREE.Vector3(); box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const target = opts.size || (isPole ? 1.7 : 1.15);
  const s = target / maxDim;
  w.scale.setScalar(s);

  if (weapon.type === 'armour') {
    w.position.y = 0;
    holder.add(w);
    return holder;
  }

  // display stand
  const wood = woodMat(0x3a2a1c);
  const base = new THREE.Mesh(new THREE.BoxGeometry(Math.max(0.9, size.x * s * 1.1), 0.07, 0.36), wood);
  base.position.y = 0.035;
  base.castShadow = true;
  holder.add(base);
  for (const sx of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.42, 6), wood);
    post.position.set(sx * 0.36, 0.25, 0);
    holder.add(post);
  }
  const rest = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.05, 0.07), wood);
  rest.position.y = 0.46;
  holder.add(rest);

  w.rotation.z = Math.PI / 2;
  w.rotation.y = 0;
  w.position.set(0, 0.54, 0.02);
  // re-center after rotation
  const box2 = new THREE.Box3().setFromObject(w);
  const center = new THREE.Vector3(); box2.getCenter(center);
  w.position.x -= center.x;
  w.position.y += 0.46 - box2.min.y;

  holder.add(w);
  return holder;
}

export function createWeaponUpright(weapon, opts = {}) {
  const holder = new THREE.Group();
  const w = createWeaponMesh(weapon.type, { material: weapon.material, quality: weapon.quality, supernatural: weapon.supernatural });
  const box = new THREE.Box3().setFromObject(w);
  const size = new THREE.Vector3(); box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const target = opts.size || 2.2;
  w.scale.setScalar(target / maxDim);
  const box2 = new THREE.Box3().setFromObject(w);
  w.position.y -= box2.min.y;
  holder.add(w);
  return holder;
}
