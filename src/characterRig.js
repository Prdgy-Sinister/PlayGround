import * as THREE from 'three';

// Shared cartoon materials / geometry. Everything is procedural so the game
// ships with zero binary assets and stays small for mobile.
const gradientData = new Uint8Array([70, 70, 70, 255, 150, 150, 150, 255, 232, 232, 232, 255, 255, 255, 255, 255]);
export const toonGradient = new THREE.DataTexture(gradientData, 4, 1, THREE.RGBAFormat);
toonGradient.magFilter = THREE.NearestFilter;
toonGradient.minFilter = THREE.NearestFilter;
toonGradient.needsUpdate = true;

const matCache = new Map();
export function toonMat(color, opts = {}) {
  const key = color + (opts.emissive || '') + (opts.transparent ? 't' : '') + (opts.opacity || 1);
  if (matCache.has(key)) return matCache.get(key);
  const m = new THREE.MeshToonMaterial({
    color: new THREE.Color(color),
    gradientMap: toonGradient,
    emissive: opts.emissive ? new THREE.Color(opts.emissive) : new THREE.Color(0x000000),
    emissiveIntensity: opts.emissiveIntensity ?? 1,
    transparent: !!opts.transparent,
    opacity: opts.opacity ?? 1
  });
  matCache.set(key, m);
  return m;
}

export function disposeToonMaterials() {} // shared on purpose

const geo = {
  sphere: new THREE.SphereGeometry(1, 14, 11),
  sphereLo: new THREE.SphereGeometry(1, 10, 8),
  box: new THREE.BoxGeometry(1, 1, 1),
  cyl: new THREE.CylinderGeometry(0.5, 0.5, 1, 12),
  cylLo: new THREE.CylinderGeometry(0.5, 0.5, 1, 8),
  cone: new THREE.ConeGeometry(0.5, 1, 10),
  torus: new THREE.TorusGeometry(0.5, 0.1, 6, 14),
  capsule: new THREE.CapsuleGeometry(0.5, 1, 4, 10)
};

function addMesh(parent, geom, mat, pos = [0, 0, 0], scale = [1, 1, 1], rot = [0, 0, 0]) {
  const m = new THREE.Mesh(geom, mat);
  m.position.set(...pos);
  m.scale.set(...scale);
  m.rotation.set(...rot);
  parent.add(m);
  return m;
}

function makeHair(style, color, headR, parent) {
  const mat = toonMat(color);
  const g = new THREE.Group();
  parent.add(g);
  const y = headR * 0.55;
  switch (style) {
    case 'ponytail': {
      addMesh(g, geo.sphereLo, mat, [0, y + 0.02, 0.02], [headR * 1.02, headR * 0.72, headR * 1.02]);
      addMesh(g, geo.sphereLo, mat, [0, y + 0.1, headR * 0.85], [headR * 0.36, headR * 0.36, headR * 0.9], [0.4, 0, 0]);
      break;
    }
    case 'pigtails': {
      addMesh(g, geo.sphereLo, mat, [0, y, 0], [headR * 1.03, headR * 0.7, headR * 1.03]);
      addMesh(g, geo.sphereLo, mat, [-headR * 0.85, y - 0.02, headR * 0.15], [headR * 0.32, headR * 0.45, headR * 0.32]);
      addMesh(g, geo.sphereLo, mat, [headR * 0.85, y - 0.02, headR * 0.15], [headR * 0.32, headR * 0.45, headR * 0.32]);
      break;
    }
    case 'buns': {
      addMesh(g, geo.sphereLo, mat, [0, y, 0], [headR * 1.02, headR * 0.6, headR * 1.02]);
      addMesh(g, geo.sphereLo, mat, [-headR * 0.58, y + headR * 0.62, 0.02], [headR * 0.34, headR * 0.3, headR * 0.34]);
      addMesh(g, geo.sphereLo, mat, [headR * 0.58, y + headR * 0.62, 0.02], [headR * 0.34, headR * 0.3, headR * 0.34]);
      break;
    }
    case 'bun': {
      addMesh(g, geo.sphereLo, mat, [0, y, 0], [headR * 1.02, headR * 0.62, headR * 1.02]);
      addMesh(g, geo.sphereLo, mat, [0, y + headR * 0.72, headR * 0.3], [headR * 0.38, headR * 0.36, headR * 0.38]);
      break;
    }
    case 'spiky': {
      addMesh(g, geo.sphereLo, mat, [0, y - 0.02, 0], [headR * 1.02, headR * 0.6, headR * 1.02]);
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 1.5 - Math.PI * 0.75;
        addMesh(g, geo.cone, mat, [Math.sin(a) * headR * 0.45, y + headR * 0.5, Math.cos(a) * headR * 0.35], [headR * 0.3, headR * 0.7, headR * 0.3], [Math.cos(a) * 0.5, 0, -Math.sin(a) * 0.5]);
      }
      break;
    }
    case 'quiff': {
      addMesh(g, geo.sphereLo, mat, [0, y, -0.02], [headR * 1.02, headR * 0.65, headR * 1.02]);
      addMesh(g, geo.sphereLo, mat, [0, y + headR * 0.6, -headR * 0.35], [headR * 0.55, headR * 0.45, headR * 0.5], [-0.35, 0, 0]);
      break;
    }
    case 'mohawk': {
      addMesh(g, geo.sphereLo, mat, [0, y + 0.02, 0], [headR * 0.95, headR * 0.5, headR * 0.95]);
      for (let i = 0; i < 4; i++) {
        addMesh(g, geo.cone, mat, [0, y + headR * 0.6, -headR * 0.3 + i * headR * 0.22], [headR * 0.24, headR * 0.72, headR * 0.24], [0.1, 0, 0]);
      }
      break;
    }
    case 'flat': {
      addMesh(g, geo.box, mat, [0, y + 0.02, 0], [headR * 1.65, headR * 0.42, headR * 1.45]);
      break;
    }
    case 'bob': {
      addMesh(g, geo.sphereLo, mat, [0, y, headR * 0.1], [headR * 1.08, headR * 0.95, headR * 1.02]);
      addMesh(g, geo.box, mat, [0, -headR * 0.2, headR * 0.22], [headR * 1.7, headR * 0.9, headR * 0.7]);
      break;
    }
    case 'wild': {
      addMesh(g, geo.sphereLo, mat, [0, y, 0], [headR * 1.05, headR * 0.62, headR * 1.05]);
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2;
        addMesh(g, geo.sphereLo, mat, [Math.sin(a) * headR * 0.7, y + headR * 0.35, Math.cos(a) * headR * 0.6], [headR * 0.26, headR * 0.3, headR * 0.26]);
      }
      break;
    }
    case 'puffs': {
      addMesh(g, geo.sphereLo, mat, [0, y, 0], [headR * 1.02, headR * 0.55, headR * 1.02]);
      addMesh(g, geo.sphereLo, mat, [-headR * 0.8, y + headR * 0.15, 0], [headR * 0.4, headR * 0.4, headR * 0.4]);
      addMesh(g, geo.sphereLo, mat, [headR * 0.8, y + headR * 0.15, 0], [headR * 0.4, headR * 0.4, headR * 0.4]);
      break;
    }
    case 'topknot': {
      addMesh(g, geo.sphereLo, mat, [0, y + 0.02, 0], [headR * 1.0, headR * 0.6, headR * 1.0]);
      addMesh(g, geo.cylLo, mat, [0, y + headR * 0.62, 0], [headR * 0.34, headR * 0.34, headR * 0.34]);
      break;
    }
    case 'buzz':
    case 'short':
    default: {
      addMesh(g, geo.sphereLo, mat, [0, y + 0.02, 0], [headR * 1.01, headR * 0.58, headR * 1.01]);
      break;
    }
    case 'bald':
      break;
  }
  return g;
}

function makeAccessory(id, char, headR, headGroup) {
  if (!id || id === 'none') return null;
  const g = new THREE.Group();
  headGroup.add(g);
  const y = headR * 0.55;
  switch (id) {
    case 'cap': {
      const mat = toonMat(char.colors.accent);
      addMesh(g, geo.sphereLo, mat, [0, y + 0.04, 0], [headR * 1.06, headR * 0.55, headR * 1.06]);
      addMesh(g, geo.box, mat, [0, y - headR * 0.08, -headR * 0.86], [headR * 1.15, headR * 0.13, headR * 0.7], [0.15, 0, 0]);
      break;
    }
    case 'beanie': {
      const mat = toonMat(char.colors.accent);
      addMesh(g, geo.sphereLo, mat, [0, y + 0.1, 0], [headR * 1.06, headR * 0.7, headR * 1.06]);
      addMesh(g, geo.torus, toonMat('#f6f6fa'), [0, y - 0.02, 0], [headR * 1.13, headR * 1.13, headR * 1.2], [Math.PI / 2, 0, 0]);
      addMesh(g, geo.sphereLo, mat, [0, y + headR * 0.75, 0], [headR * 0.18, headR * 0.18, headR * 0.18]);
      break;
    }
    case 'chef': {
      const mat = toonMat('#f6f6fa');
      addMesh(g, geo.cyl, mat, [0, y + headR * 0.35, 0], [headR * 0.95, headR * 0.5, headR * 0.95]);
      addMesh(g, geo.sphere, mat, [0, y + headR * 0.86, 0], [headR * 0.6, headR * 0.42, headR * 0.6]);
      break;
    }
    case 'helmet': {
      const mat = toonMat('#c8d3e0');
      addMesh(g, geo.sphere, mat, [0, y + 0.03, 0], [headR * 1.05, headR * 0.82, headR * 1.05]);
      addMesh(g, geo.box, mat, [0, y - headR * 0.5, -headR * 0.2], [headR * 0.35, headR * 0.7, headR * 0.4]);
      addMesh(g, geo.cone, toonMat('#ff4d5e'), [0, y + headR * 0.82, 0], [headR * 0.3, headR * 0.6, headR * 0.3]);
      break;
    }
    case 'crown': {
      const mat = toonMat('#ffd23f', { emissive: '#7a5200', emissiveIntensity: 0.15 });
      addMesh(g, geo.cyl, mat, [0, y + headR * 0.55, 0], [headR * 0.85, headR * 0.3, headR * 0.85]);
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        addMesh(g, geo.cone, mat, [Math.sin(a) * headR * 0.36, y + headR * 0.82, Math.cos(a) * headR * 0.36], [headR * 0.22, headR * 0.34, headR * 0.22]);
      }
      break;
    }
    case 'tiara': {
      const mat = toonMat('#ffe066');
      addMesh(g, geo.box, mat, [0, y + headR * 0.4, -headR * 0.55], [headR * 0.8, headR * 0.12, headR * 0.18]);
      addMesh(g, geo.sphereLo, toonMat('#ff5fa2'), [0, y + headR * 0.55, -headR * 0.6], [headR * 0.14, headR * 0.14, headR * 0.1]);
      break;
    }
    case 'horns': {
      const mat = toonMat('#ff4d5e');
      addMesh(g, geo.cone, mat, [-headR * 0.45, y + headR * 0.55, 0], [headR * 0.24, headR * 0.5, headR * 0.24], [0, 0, 0.3]);
      addMesh(g, geo.cone, mat, [headR * 0.45, y + headR * 0.55, 0], [headR * 0.24, headR * 0.5, headR * 0.24], [0, 0, -0.3]);
      break;
    }
    case 'headband': {
      addMesh(g, geo.torus, toonMat(char.colors.accent), [0, y + 0.02, 0], [headR * 1.06, headR * 1.06, headR * 1.15], [Math.PI / 2, 0, 0]);
      break;
    }
    case 'goggles': {
      const ring = toonMat('#20242e');
      addMesh(g, geo.torus, ring, [-headR * 0.34, y - headR * 0.18, -headR * 0.85], [headR * 0.5, headR * 0.5, headR * 0.7]);
      addMesh(g, geo.torus, ring, [headR * 0.34, y - headR * 0.18, -headR * 0.85], [headR * 0.5, headR * 0.5, headR * 0.7]);
      addMesh(g, geo.torus, toonMat('#7c5cff'), [0, y + 0.02, 0], [headR * 1.06, headR * 1.06, headR * 1.1], [Math.PI / 2, 0, 0]);
      break;
    }
    case 'shades': {
      addMesh(g, geo.box, toonMat('#14161d'), [0, y - headR * 0.18, -headR * 0.88], [headR * 1.35, headR * 0.36, headR * 0.16]);
      break;
    }
    case 'mask': {
      addMesh(g, geo.box, toonMat('#181c2b'), [0, y - headR * 0.62, -headR * 0.6], [headR * 1.1, headR * 0.42, headR * 0.3]);
      break;
    }
    case 'glasses': {
      const ring = toonMat('#20242e');
      addMesh(g, geo.torus, ring, [-headR * 0.34, y - headR * 0.15, -headR * 0.86], [headR * 0.42, headR * 0.42, headR * 0.6]);
      addMesh(g, geo.torus, ring, [headR * 0.34, y - headR * 0.15, -headR * 0.86], [headR * 0.42, headR * 0.42, headR * 0.6]);
      addMesh(g, geo.box, ring, [0, y - headR * 0.15, -headR * 0.9], [headR * 0.3, headR * 0.07, headR * 0.08]);
      break;
    }
  }
  return g;
}

export function buildCharacterMesh(character, options = {}) {
  const c = character;
  const costume = options.costume || c.colors.shirt;
  const accessory = options.accessory || c.accessory;
  const b = c.body;
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);

  const skin = toonMat(c.colors.skin);
  const shirt = toonMat(costume);
  const pants = toonMat(c.colors.pants);
  const accent = toonMat(c.colors.accent);
  const dark = toonMat('#191a22');
  const shoe = toonMat('#f6f6fa');

  const torsoH = 0.72 * b.height;
  const legLen = 0.68 * b.height * (0.8 + b.leg);
  const hipY = legLen + 0.1;
  const shoulderY = hipY + torsoH * 0.86;
  const headR = 0.27 * b.head * (0.9 + b.height * 0.25);
  const bodyW = 0.4 * b.width;

  // torso (spherical belly + chest)
  const torso = new THREE.Group();
  torso.position.y = hipY;
  body.add(torso);
  addMesh(torso, geo.sphere, shirt, [0, torsoH * 0.45, 0], [bodyW * (0.8 + b.belly * 0.28), torsoH * 0.58, bodyW * (0.68 + b.belly * 0.22)]);
  addMesh(torso, geo.sphere, shirt, [0, torsoH * 0.86, 0], [bodyW * 0.88, torsoH * 0.3, bodyW * 0.62]);
  if (b.belly > 1.15) {
    addMesh(torso, geo.sphere, shirt, [0, torsoH * 0.34, -bodyW * 0.28], [bodyW * (0.55 + b.belly * 0.2), torsoH * 0.34, bodyW * 0.4]);
  }
  // shorts
  addMesh(torso, geo.sphereLo, pants, [0, torsoH * 0.1, 0], [bodyW * 0.78, torsoH * 0.24, bodyW * 0.64]);

  // head
  const neck = new THREE.Group();
  neck.position.y = shoulderY + headR * 0.34;
  body.add(neck);
  const headGroup = new THREE.Group();
  headGroup.position.y = headR * 0.1;
  neck.add(headGroup);
  addMesh(headGroup, geo.sphere, skin, [0, 0, 0], [headR * 0.96, headR, headR * 0.94]);
  const detailed = options.detail !== false;
  if (detailed) {
    // ears
    addMesh(headGroup, geo.sphereLo, skin, [-headR * 0.94, -headR * 0.05, 0], [headR * 0.22, headR * 0.28, headR * 0.2]);
    addMesh(headGroup, geo.sphereLo, skin, [headR * 0.94, -headR * 0.05, 0], [headR * 0.22, headR * 0.28, headR * 0.2]);
    // eyes (facing -Z)
    const eyeWhite = toonMat('#ffffff');
    const pupil = toonMat('#20242e');
    const eyeY = headR * 0.12;
    addMesh(headGroup, geo.sphereLo, eyeWhite, [-headR * 0.33, eyeY, -headR * 0.8], [headR * 0.25, headR * 0.3, headR * 0.16]);
    addMesh(headGroup, geo.sphereLo, eyeWhite, [headR * 0.33, eyeY, -headR * 0.8], [headR * 0.25, headR * 0.3, headR * 0.16]);
    addMesh(headGroup, geo.sphereLo, pupil, [-headR * 0.33, eyeY, -headR * 0.94], [headR * 0.11, headR * 0.14, headR * 0.08]);
    addMesh(headGroup, geo.sphereLo, pupil, [headR * 0.33, eyeY, -headR * 0.94], [headR * 0.11, headR * 0.14, headR * 0.08]);
    // brows + mouth
    addMesh(headGroup, geo.box, dark, [-headR * 0.33, eyeY + headR * 0.26, -headR * 0.85], [headR * 0.34, headR * 0.07, headR * 0.1], [0, 0, -0.05]);
    addMesh(headGroup, geo.box, dark, [headR * 0.33, eyeY + headR * 0.26, -headR * 0.85], [headR * 0.34, headR * 0.07, headR * 0.1], [0, 0, 0.05]);
    addMesh(headGroup, geo.sphereLo, dark, [0, -headR * 0.44, -headR * 0.86], [headR * 0.24, headR * 0.1, headR * 0.1]);
    // nose
    addMesh(headGroup, geo.sphereLo, skin, [0, -headR * 0.1, -headR * 0.99], [headR * 0.12, headR * 0.1, headR * 0.14]);
    makeHair(c.hairStyle, c.colors.hair, headR, headGroup);
    makeAccessory(accessory, c, headR, headGroup);
  } else {
    // low-detail head for distant AI rivals: one hair blob
    if (c.hairStyle !== 'bald') {
      addMesh(headGroup, geo.sphereLo, toonMat(c.colors.hair), [0, headR * 0.55, 0], [headR * 1.02, headR * 0.6, headR * 1.02]);
    }
    addMesh(headGroup, geo.sphereLo, toonMat('#ffffff'), [-headR * 0.3, headR * 0.1, -headR * 0.85], [headR * 0.2, headR * 0.24, headR * 0.1]);
    addMesh(headGroup, geo.sphereLo, toonMat('#ffffff'), [headR * 0.3, headR * 0.1, -headR * 0.85], [headR * 0.2, headR * 0.24, headR * 0.1]);
  }

  // arms with shoulder pivots
  const armLen = 0.4 * b.height * (0.85 + b.limb * 0.3);
  function makeArm(side) {
    const pivot = new THREE.Group();
    pivot.position.set(side * bodyW * 0.86, shoulderY - torsoH * 0.06, 0);
    body.add(pivot);
    const upper = addMesh(pivot, geo.capsule, skin, [0, -armLen * 0.3, 0], [0.1 * b.limb + 0.05, armLen * 0.4, 0.1 * b.limb + 0.05]);
    addMesh(pivot, geo.sphereLo, skin, [0, -armLen * 0.62, 0], [0.09 * b.limb + 0.05, 0.09 * b.limb + 0.05, 0.09 * b.limb + 0.05]);
    return pivot;
  }
  const armL = makeArm(-1);
  const armR = makeArm(1);

  // legs
  function makeLeg(side) {
    const pivot = new THREE.Group();
    pivot.position.set(side * bodyW * 0.42, hipY, 0);
    body.add(pivot);
    addMesh(pivot, geo.capsule, pants, [0, -legLen * 0.3, 0], [0.11 * b.limb + 0.05, legLen * 0.34, 0.11 * b.limb + 0.05]);
    addMesh(pivot, geo.sphereLo, shoe, [0, -legLen * 0.62, -0.04], [0.11 * b.limb + 0.06, 0.07, 0.16 * b.limb + 0.06]);
    return pivot;
  }
  const legL = makeLeg(-1);
  const legR = makeLeg(1);

  // chest bib / accent detail
  if (options.detail !== false) {
    addMesh(torso, geo.sphereLo, accent, [0, torsoH * 0.7, -bodyW * 0.52], [bodyW * 0.28, torsoH * 0.14, bodyW * 0.1]);
  }

  // blob shadow
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(1, 18),
    new THREE.MeshBasicMaterial({ color: 0x031320, transparent: true, opacity: 0.32, depthWrite: false })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.scale.set(0.55 * b.width, 0.4 * b.width, 1);
  shadow.position.y = 0.02;
  root.add(shadow);

  const scale = b.height * 0.98;
  root.scale.setScalar(scale);

  const rig = {
    root, body, torso, neck, headGroup, armL, armR, legL, legR, shadow, headR,
    jumpTimer: 0, phase: Math.random() * 6,
    baseY: hipY, legLen, armLen, height: 1.7 * scale, radius: 0.4 * Math.max(0.78, b.width) * scale,
    style: c.style
  };

  rig.setPose = (state, t, moveAmt = 0, speedAmt = 0) => {
    const s = rig.style;
    const wob = s === 'wobbly' ? 0.09 : s === 'heavy' ? 0.05 : 0.025;
    const bounce = s === 'bouncy' ? 0.1 : s === 'heavy' ? 0.03 : 0.055;
    const gaitSpeed = 8 + moveAmt * 8;
    const p = t * gaitSpeed + rig.phase;

    // reset
    body.position.set(0, 0, 0);
    body.rotation.set(0, 0, 0);
    torso.rotation.set(0, 0, 0);
    neck.rotation.set(0, 0, 0);
    armL.rotation.set(0, 0, 0.12);
    armR.rotation.set(0, 0, -0.12);
    legL.rotation.set(0, 0, 0);
    legR.rotation.set(0, 0, 0);

    if (state === 'idle' || state === 'menu') {
      const b = Math.sin(t * 2.2) * 0.014;
      body.position.y = b;
      torso.position.y = hipY + b;
      armL.rotation.z = 0.16 + Math.sin(t * 2.2) * 0.03;
      armR.rotation.z = -0.16 - Math.sin(t * 2.2) * 0.03;
      neck.rotation.z = Math.sin(t * 1.1) * 0.03;
      headGroup.rotation.y = Math.sin(t * 0.7) * 0.14;
      torso.position.y = hipY + b;
      return;
    }
    headGroup.rotation.y = 0;
    if (state === 'run') {
      const swing = Math.min(1, moveAmt) * 0.9;
      legL.rotation.x = Math.sin(p) * swing;
      legR.rotation.x = -Math.sin(p) * swing;
      armL.rotation.x = -Math.sin(p) * swing * 0.9;
      armR.rotation.x = Math.sin(p) * swing * 0.9;
      armL.rotation.z = 0.14;
      armR.rotation.z = -0.14;
      body.position.y = Math.abs(Math.sin(p)) * bounce * Math.min(1, moveAmt);
      torso.rotation.x = -0.12 * moveAmt - speedAmt * 0.06;
      torso.rotation.z = Math.sin(p * 0.5) * wob * 0.5;
      neck.rotation.x = 0.08 * moveAmt;
      torso.position.y = hipY + body.position.y;
      body.rotation.y = Math.sin(p * 0.5) * 0.06 * moveAmt;
      return;
    }
    if (state === 'jump') {
      legL.rotation.x = -0.5; legR.rotation.x = 0.35;
      armL.rotation.x = -1.6; armR.rotation.x = -1.6;
      armL.rotation.z = 0.6; armR.rotation.z = -0.6;
      torso.rotation.x = 0.1;
      return;
    }
    if (state === 'dive') {
      body.rotation.x = -1.25;
      body.position.y = 0.35;
      body.position.z = -0.5;
      armL.rotation.x = -2.8; armR.rotation.x = -2.8;
      legL.rotation.x = 0.5; legR.rotation.x = 0.7;
      torso.position.y = hipY;
      return;
    }
    if (state === 'tumble') {
      const p2 = t * 14;
      legL.rotation.x = Math.sin(p2) * 1.4; legR.rotation.x = -Math.sin(p2 * 0.9) * 1.6;
      armL.rotation.x = Math.cos(p2) * 2.2; armR.rotation.x = -Math.cos(p2 * 1.1) * 2.2;
      armL.rotation.z = 0.9; armR.rotation.z = -0.9;
      torso.rotation.z = Math.sin(p2 * 0.7) * 0.2;
      torso.position.y = hipY;
      return;
    }
    if (state === 'getup') {
      body.rotation.x = 1.2;
      body.position.y = 0.28;
      armL.rotation.x = -0.8; armR.rotation.x = -0.8;
      legL.rotation.x = 1.1; legR.rotation.x = 0.6;
      return;
    }
    if (state === 'celebrate') {
      const hop = Math.abs(Math.sin(t * 5)) * 0.18;
      body.position.y = hop;
      armL.rotation.x = -2.7; armR.rotation.x = -2.7;
      armL.rotation.z = 0.5; armR.rotation.z = -0.5;
      legL.rotation.x = -0.2; legR.rotation.x = 0.2;
      torso.position.y = hipY + hop;
      headGroup.rotation.x = -0.2;
      return;
    }
    if (state === 'sad') {
      neck.rotation.x = 0.4;
      torso.rotation.x = 0.2;
      armL.rotation.x = 0.15; armR.rotation.x = 0.15;
      torso.position.y = hipY - 0.03;
      return;
    }
    torso.position.y = hipY;
  };

  return rig;
}

// Simple 2D cartoon portrait for roster cards (cheap, no extra WebGL contexts).
export function drawPortrait(canvas, character, costumeOverride, accessoryOverride) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = canvas.clientWidth || 100, h = canvas.clientHeight || 70;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  const b = character.body;
  const cx = w / 2;
  const base = h * 0.94;
  const scale = Math.min(w / 130, h / 110);
  const skin = character.colors.skin;
  const shirt = costumeOverride || character.colors.shirt;
  const pants = character.colors.pants;
  const accent = character.colors.accent;

  ctx.save();
  ctx.translate(cx, base);
  ctx.scale(scale, scale);
  // shadow
  ctx.fillStyle = 'rgba(0,0,0,.25)';
  ctx.beginPath(); ctx.ellipse(0, 0, 30 * b.width, 6, 0, 0, Math.PI * 2); ctx.fill();
  // legs
  const legW = 9 * b.limb, legH = 36 * b.height;
  ctx.fillStyle = pants;
  ctx.beginPath(); ctx.roundRect(-15 * b.width, -legH, legW, legH, 4); ctx.fill();
  ctx.beginPath(); ctx.roundRect(15 * b.width - legW, -legH, legW, legH, 4); ctx.fill();
  // torso
  const torsoW = 38 * b.width * (0.85 + b.belly * 0.15);
  const torsoH = 38 * b.height;
  ctx.fillStyle = shirt;
  ctx.beginPath(); ctx.ellipse(0, -legH - torsoH * 0.36, torsoW, torsoH * 0.52, 0, 0, Math.PI * 2); ctx.fill();
  // arms
  ctx.strokeStyle = skin; ctx.lineCap = 'round'; ctx.lineWidth = 7 * b.limb;
  ctx.beginPath(); ctx.moveTo(-torsoW * 0.85, -legH - torsoH * 0.5); ctx.lineTo(-torsoW * 1.0, -legH - torsoH * 0.05); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(torsoW * 0.85, -legH - torsoH * 0.5); ctx.lineTo(torsoW * 1.0, -legH - torsoH * 0.05); ctx.stroke();
  // head
  const headR = 19 * b.head;
  const headY = -legH - torsoH * 0.92 - headR * 0.5;
  ctx.fillStyle = skin;
  ctx.beginPath(); ctx.arc(0, headY, headR, 0, Math.PI * 2); ctx.fill();
  // hair blob
  if (character.hairStyle !== 'bald') {
    ctx.fillStyle = character.colors.hair;
    ctx.beginPath(); ctx.arc(0, headY - headR * 0.18, headR * 0.98, Math.PI * 1.02, Math.PI * 1.98); ctx.fill();
    if (character.hairStyle === 'ponytail' || character.hairStyle === 'topknot') {
      ctx.beginPath(); ctx.ellipse(headR * 0.75, headY - headR * 0.35, headR * 0.35, headR * 0.55, 0.4, 0, Math.PI * 2); ctx.fill();
    }
    if (character.hairStyle === 'pigtails' || character.hairStyle === 'buns' || character.hairStyle === 'puffs') {
      ctx.beginPath(); ctx.arc(-headR * 0.9, headY, headR * 0.36, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(headR * 0.9, headY, headR * 0.36, 0, Math.PI * 2); ctx.fill();
    }
    if (character.hairStyle === 'spiky' || character.hairStyle === 'mohawk') {
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath(); ctx.moveTo(i * headR * 0.3 - 4, headY - headR * 0.7);
        ctx.lineTo(i * headR * 0.3, headY - headR * 1.5);
        ctx.lineTo(i * headR * 0.3 + 4, headY - headR * 0.7); ctx.fill();
      }
    }
  }
  // face
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(-headR * 0.34, headY + headR * 0.05, headR * 0.24, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(headR * 0.34, headY + headR * 0.05, headR * 0.24, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#20242e';
  ctx.beginPath(); ctx.arc(-headR * 0.32, headY + headR * 0.07, headR * 0.11, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(headR * 0.36, headY + headR * 0.07, headR * 0.11, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#20242e'; ctx.lineWidth = 2.2;
  ctx.beginPath(); ctx.arc(0, headY + headR * 0.34, headR * 0.26, 0.15, Math.PI - 0.15); ctx.stroke();
  // accessory quick-draws
  const acc = accessoryOverride || character.accessory;
  if (acc === 'shades') { ctx.fillStyle = '#14161d'; ctx.fillRect(-headR * 0.7, headY - headR * 0.05, headR * 1.4, headR * 0.3); }
  if (acc === 'cap' || acc === 'beanie') { ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(0, headY - headR * 0.28, headR * 0.95, Math.PI, Math.PI * 2); ctx.fill(); }
  if (acc === 'crown') { ctx.fillStyle = '#ffd23f'; ctx.beginPath(); ctx.moveTo(-headR * 0.6, headY - headR * 0.75); ctx.lineTo(-headR * 0.4, headY - headR * 1.15); ctx.lineTo(0, headY - headR * 0.8); ctx.lineTo(headR * 0.4, headY - headR * 1.15); ctx.lineTo(headR * 0.6, headY - headR * 0.75); ctx.fill(); }
  if (acc === 'headband') { ctx.strokeStyle = accent; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, headY - headR * 0.25, headR * 0.97, Math.PI * 0.1, Math.PI * 0.9); ctx.stroke(); }
  if (acc === 'goggles' || acc === 'glasses') { ctx.strokeStyle = '#20242e'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(-headR * 0.34, headY + headR * 0.05, headR * 0.3, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.arc(headR * 0.34, headY + headR * 0.05, headR * 0.3, 0, Math.PI * 2); ctx.stroke(); }
  // bib
  ctx.fillStyle = accent;
  ctx.beginPath(); ctx.ellipse(0, -legH - torsoH * 0.28, torsoW * 0.22, torsoH * 0.1, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}
