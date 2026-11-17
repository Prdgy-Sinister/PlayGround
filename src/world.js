import * as THREE from 'three';

/* ================================================================== */
/* Themes                                                             */
/* ================================================================== */

const BASE_THEMES = {
  hogwarts: {
    skyTop: '#2f5f9e', skyBottom: '#cfe2ec', horizon: '#efe8d0', sun: '#fff1c9',
    fog: '#c3d3da', fogDensity: 0.00125, ground: '#4d7440', ground2: '#6e9052', rock: '#7b8273',
    hemi: '#a8c7e6', hemiGround: '#4e5a39', hemiIntensity: 1.25,
    sunColor: '#fff2d2', sunIntensity: 2.4, sunDir: new THREE.Vector3(0.45, 0.62, 0.35),
    groundY: -34, night: false, cloud: '#ffffff',
  },
  worldcup: {
    skyTop: '#050d26', skyBottom: '#1e3561', horizon: '#5a4f70', sun: '#dce8ff',
    fog: '#1b2a48', fogDensity: 0.0014, ground: '#2d3b33', ground2: '#40513e', rock: '#4a4a5a',
    hemi: '#405d8d', hemiGround: '#172015', hemiIntensity: 0.85,
    sunColor: '#bcd5ff', sunIntensity: 1.25, sunDir: new THREE.Vector3(-0.35, 0.55, 0.4),
    groundY: -14, night: true, cloud: '#36435f',
  },
  highlands: {
    skyTop: '#4c6278', skyBottom: '#a5b4b8', horizon: '#c9c5ae', sun: '#f0e3bd',
    fog: '#9aa9aa', fogDensity: 0.00165, ground: '#556b3f', ground2: '#77804d', rock: '#6e7166',
    hemi: '#96aeb8', hemiGround: '#3d462f', hemiIntensity: 0.95,
    sunColor: '#dae2d9', sunIntensity: 1.4, sunDir: new THREE.Vector3(-0.5, 0.5, 0.2),
    groundY: -30, night: false, cloud: '#aab4ba',
  },
  london: {
    skyTop: '#241a42', skyBottom: '#8e5f74', horizon: '#e1a277', sun: '#ffd9a0',
    fog: '#6e5e74', fogDensity: 0.0021, ground: '#2a2b33', ground2: '#43404a', rock: '#4b4550',
    hemi: '#725e8c', hemiGround: '#231f2c', hemiIntensity: 0.9,
    sunColor: '#ffd0a2', sunIntensity: 1.2, sunDir: new THREE.Vector3(-0.6, 0.3, 0.35),
    groundY: -30, night: false, cloud: '#8b7890', rain: true,
  },
  forest: {
    skyTop: '#03131b', skyBottom: '#0e3437', horizon: '#24544a', sun: '#9fe9cf',
    fog: '#0a2b2b', fogDensity: 0.0032, ground: '#142e22', ground2: '#214534', rock: '#2a3831',
    hemi: '#2d665c', hemiGround: '#0a1511', hemiIntensity: 0.7,
    sunColor: '#88c8bd', sunIntensity: 0.8, sunDir: new THREE.Vector3(0.3, 0.55, -0.2),
    groundY: -24, night: true, cloud: '#183b3a',
  },
  alpine: {
    skyTop: '#06142d', skyBottom: '#1b3e64', horizon: '#4e7a91', sun: '#c9f1ff',
    fog: '#2f5574', fogDensity: 0.0021, ground: '#dbe8ee', ground2: '#a9c3d3', rock: '#6d8294',
    hemi: '#6084a6', hemiGround: '#d5e5ef', hemiIntensity: 0.95,
    sunColor: '#c6e9ff', sunIntensity: 1.1, sunDir: new THREE.Vector3(0.35, 0.48, -0.3),
    groundY: -13, night: true, cloud: '#54718a', snow: true,
  },
  kyoto: {
    skyTop: '#5c4b84', skyBottom: '#e6a4a0', horizon: '#f9d8bd', sun: '#ffe9c9',
    fog: '#d9a9a4', fogDensity: 0.0016, ground: '#425d46', ground2: '#6f7a4e', rock: '#6d6159',
    hemi: '#d8a8b3', hemiGround: '#32402e', hemiIntensity: 1.1,
    sunColor: '#ffe0bd', sunIntensity: 1.75, sunDir: new THREE.Vector3(0.6, 0.32, 0.2),
    groundY: -30, night: false, cloud: '#ecc8c2',
  },
  cairo: {
    skyTop: '#3a2450', skyBottom: '#d0895c', horizon: '#f4c183', sun: '#ffe2a3',
    fog: '#c89572', fogDensity: 0.0017, ground: '#b58a52', ground2: '#d1a966', rock: '#9a7549',
    hemi: '#b98b71', hemiGround: '#7e5b35', hemiIntensity: 1.1,
    sunColor: '#ffd79a', sunIntensity: 2.0, sunDir: new THREE.Vector3(-0.7, 0.28, 0.32),
    groundY: -25, night: false, cloud: '#d3a58f',
  },
};

const NATION_THEME = {
  england: { base: 'hogwarts', skyTop: '#2c5d95', skyBottom: '#c6dbe4', sun: '#ffecc4', fog: '#b9cdd5' },
  france: { base: 'kyoto', skyTop: '#3a4479', skyBottom: '#d7b4ba', sun: '#ffe6cf', fog: '#c2aeb7' },
  japan: { base: 'kyoto' },
  brazil: { base: 'hogwarts', skyTop: '#1a5a86', skyBottom: '#c4e0d4', sun: '#fff0b3', fog: '#b4d3ca' },
  egypt: { base: 'cairo' },
  norway: { base: 'alpine', skyTop: '#122747', skyBottom: '#6c8daa', sun: '#d8f0ff', fog: '#60809a' },
  usa: { base: 'worldcup' },
  australia: { base: 'cairo', skyTop: '#264d73', skyBottom: '#d8c093', sun: '#ffe6ad', fog: '#c4b291' },
};

export function getTheme(id) {
  return BASE_THEMES[id] || BASE_THEMES.hogwarts;
}

export function themeForNation(nationId) {
  const cfg = NATION_THEME[nationId] || NATION_THEME.england;
  return { ...getTheme(cfg.base), ...cfg, base: undefined };
}

/* ================================================================== */
/* Small helpers                                                      */
/* ================================================================== */

let _glowTexture = null;
export function glowTexture() {
  if (_glowTexture) return _glowTexture;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.8)');
  g.addColorStop(0.55, 'rgba(255,255,255,0.22)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
  _glowTexture = new THREE.CanvasTexture(c);
  _glowTexture.colorSpace = THREE.SRGBColorSpace;
  return _glowTexture;
}

export function glowSprite(color, size = 6, opacity = 1) {
  const mat = new THREE.SpriteMaterial({
    map: glowTexture(), color: new THREE.Color(color), transparent: true,
    opacity, blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const s = new THREE.Sprite(mat);
  s.scale.set(size, size, 1);
  return s;
}

export function makeLabelSprite(text, color = '#f2d27a', bg = 'rgba(10,12,24,0.68)') {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = bg;
  roundRect(ctx, 6, 20, 500, 88, 20); ctx.fill();
  ctx.strokeStyle = color; ctx.lineWidth = 3;
  roundRect(ctx, 6, 20, 500, 88, 20); ctx.stroke();
  ctx.font = '600 58px Georgia, serif';
  ctx.fillStyle = color;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text, 256, 66);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const s = new THREE.Sprite(mat);
  s.scale.set(11, 2.75, 1);
  return s;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function standard(color, opts = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.04, flatShading: true, ...opts });
}

/* ================================================================== */
/* Sky, terrain, lighting                                             */
/* ================================================================== */

export function buildSky(scene, theme, opts = {}) {
  const uniforms = {
    topColor: { value: new THREE.Color(theme.skyTop) },
    bottomColor: { value: new THREE.Color(theme.skyBottom) },
    horizonColor: { value: new THREE.Color(theme.horizon) },
    sunColor: { value: new THREE.Color(theme.sun) },
    sunDir: { value: theme.sunDir.clone().normalize() },
  };
  const skyGeo = new THREE.SphereGeometry(1200, 32, 20);
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false, uniforms,
    vertexShader: `varying vec3 vPos; void main(){ vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform vec3 topColor, bottomColor, horizonColor, sunColor; uniform vec3 sunDir; varying vec3 vPos;
      void main(){
        vec3 d = normalize(vPos);
        float h = d.y;
        vec3 col = mix(horizonColor, bottomColor, smoothstep(-0.06, 0.16, h));
        col = mix(col, topColor, smoothstep(0.05, 0.65, h));
        float disk = smoothstep(0.9993, 0.9998, dot(d, normalize(sunDir)));
        float halo = pow(max(dot(d, normalize(sunDir)), 0.0), 24.0);
        col += sunColor * (disk * 1.4 + halo * 0.32);
        vec3 glow = vec3(1.0, 0.72, 0.42) * pow(max(0.0, 1.0 - abs(h) * 5.0), 4.0) * 0.10;
        col += glow;
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  const sky = new THREE.Mesh(skyGeo, skyMat);
  sky.frustumCulled = false;
  sky.renderOrder = -10;
  scene.add(sky);
  scene.fog = new THREE.FogExp2(theme.fog, theme.fogDensity);
  scene.background = new THREE.Color(theme.skyBottom);

  if (theme.night) {
    const rand = mulberry32(opts.seed || 7);
    const count = 650;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const v = new THREE.Vector3(rand() * 2 - 1, rand() * 0.9 + 0.08, rand() * 2 - 1).normalize().multiplyScalar(1100);
      pos[i * 3] = v.x; pos[i * 3 + 1] = v.y; pos[i * 3 + 2] = v.z;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const stars = new THREE.Points(g, new THREE.PointsMaterial({
      color: '#e8f3ff', size: 4.2, sizeAttenuation: false, transparent: true,
      opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    stars.frustumCulled = false;
    scene.add(stars);

    const moon = glowSprite('#cfe7ff', 90, 0.9);
    moon.position.copy(theme.sunDir).normalize().multiplyScalar(750);
    scene.add(moon);
  }

  // Moon/sun glow for all themes.
  if (!theme.night) {
    const sun = glowSprite(theme.sun, 150, 0.4);
    sun.position.copy(theme.sunDir).normalize().multiplyScalar(850);
    scene.add(sun);
  }
  return { sky, uniforms };
}

export function buildLighting(scene, theme) {
  const hemi = new THREE.HemisphereLight(theme.hemi, theme.hemiGround, theme.hemiIntensity);
  scene.add(hemi);
  const dir = new THREE.DirectionalLight(theme.sunColor, theme.sunIntensity);
  dir.position.copy(theme.sunDir).normalize().multiplyScalar(320);
  dir.castShadow = true;
  dir.shadow.mapSize.set(1024, 1024);
  dir.shadow.camera.near = 10;
  dir.shadow.camera.far = 700;
  dir.shadow.camera.left = -190;
  dir.shadow.camera.right = 190;
  dir.shadow.camera.top = 190;
  dir.shadow.camera.bottom = -190;
  dir.shadow.bias = -0.0004;
  dir.shadow.normalBias = 0.05;
  scene.add(dir);
  const fill = new THREE.AmbientLight(theme.hemi, theme.night ? 0.26 : 0.16);
  scene.add(fill);
  return { hemi, dir, fill };
}

function terrainHeight(x, z, theme, seed = 1) {
  const base = theme.groundY;
  let h = Math.sin(x * 0.009 + seed) * 5 + Math.cos(z * 0.011 + seed * 2) * 5;
  h += Math.sin((x + z) * 0.0045 + seed) * 8;
  h += Math.cos(x * 0.023 - z * 0.017) * 2.4;
  return base + h;
}

export function buildTerrain(scene, theme, opts = {}) {
  const size = 1500;
  const seg = 78;
  const geo = new THREE.PlaneGeometry(size, size, seg, seg);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const c1 = new THREE.Color(theme.ground);
  const c2 = new THREE.Color(theme.ground2);
  const c3 = new THREE.Color(theme.rock);
  const tmp = new THREE.Color();
  const rand = mulberry32(opts.seed || 3);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i);
    const y = terrainHeight(x, z, theme, opts.seed || 3);
    pos.setY(i, y);
    const d = Math.max(0, Math.min(1, Math.abs(x) / 700));
    const mix = rand() * 0.45 + d * 0.2;
    tmp.copy(c1).lerp(c2, Math.min(1, mix + Math.max(0, y - theme.groundY) / 24));
    if (y > theme.groundY + 10) tmp.lerp(c3, 0.4);
    colors[i * 3] = tmp.r; colors[i * 3 + 1] = tmp.g; colors[i * 3 + 2] = tmp.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
    vertexColors: true, roughness: 1, metalness: 0, flatShading: true,
  }));
  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}

function addWater(scene, theme, x, z, radiusX, radiusZ, color = '#2f6b77') {
  const geo = new THREE.CircleGeometry(1, 48);
  geo.rotateX(-Math.PI / 2);
  const mat = new THREE.MeshStandardMaterial({
    color, roughness: 0.18, metalness: 0.55, transparent: true, opacity: 0.86,
  });
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, theme.groundY + 1.3, z);
  m.scale.set(radiusX, 1, radiusZ);
  scene.add(m);
  return m;
}

export function addMountains(scene, theme, opts = {}) {
  const rand = mulberry32(opts.seed || 11);
  const count = opts.count || 14;
  const rock = standard(theme.rock, { roughness: 1 });
  const snow = standard('#e8f2f7', { roughness: 0.9 });
  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2;
    const r = (opts.minR || 320) + rand() * (opts.maxR || 360);
    const h = 90 + rand() * (opts.height || 160);
    const rad = h * (0.55 + rand() * 0.35);
    const m = new THREE.Mesh(new THREE.ConeGeometry(rad, h, 5 + Math.floor(rand() * 3), 1), rock);
    m.position.set(Math.cos(a) * r, theme.groundY + h * 0.5 - 4, Math.sin(a) * r);
    m.rotation.y = rand() * Math.PI;
    scene.add(m);
    if (theme.ground === '#dbe8ee' || theme.snow || opts.snowCap) {
      const cap = new THREE.Mesh(new THREE.ConeGeometry(rad * 0.38, h * 0.38, 5), snow);
      cap.position.set(m.position.x, m.position.y + h * 0.31, m.position.z);
      cap.rotation.y = m.rotation.y;
      scene.add(cap);
    }
  }
}

function addForest(scene, theme, opts = {}) {
  const rand = mulberry32(opts.seed || 21);
  const count = opts.count || 220;
  const trunkGeo = new THREE.CylinderGeometry(0.7, 1.2, 10, 5);
  const leafGeo = theme.snow
    ? new THREE.ConeGeometry(4.4, 14, 6)
    : new THREE.ConeGeometry(4.8, 13, 6);
  const trunkMat = standard(theme.snow ? '#5b4c45' : '#4a3524', { roughness: 1 });
  const leafMat = standard(opts.leafColor || (theme.snow ? '#3f6372' : '#274c2e'), {
    roughness: 0.95, flatShading: true,
  });
  const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, count);
  const leaves = new THREE.InstancedMesh(leafGeo, leafMat, count);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  let placed = 0;
  let attempts = 0;
  while (placed < count && attempts < count * 12) {
    attempts++;
    const a = rand() * Math.PI * 2;
    const r = (opts.minR || 45) + rand() * (opts.range || 420);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (opts.avoidCenter !== false && r < 95) continue;
    const s = 0.6 + rand() * 1.5;
    const y = theme.groundY + 5 * s;
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rand() * Math.PI * 2);
    m.compose(new THREE.Vector3(x, y, z), q, new THREE.Vector3(s, s, s));
    trunks.setMatrixAt(placed, m);
    m.compose(new THREE.Vector3(x, y + 8.4 * s, z), q, new THREE.Vector3(s, s, s));
    leaves.setMatrixAt(placed, m);
    placed++;
  }
  trunks.count = placed; leaves.count = placed;
  trunks.castShadow = false;
  scene.add(trunks, leaves);
  return { trunks, leaves };
}

function addClouds(scene, theme, opts = {}) {
  const rand = mulberry32(opts.seed || 31);
  const mat = new THREE.MeshStandardMaterial({
    color: theme.cloud, roughness: 1, transparent: true, opacity: opts.opacity || 0.82,
    flatShading: true, depthWrite: false,
  });
  const count = opts.count || 11;
  const group = new THREE.Group();
  for (let i = 0; i < count; i++) {
    const cloud = new THREE.Group();
    const n = 4 + Math.floor(rand() * 5);
    for (let j = 0; j < n; j++) {
      const s = 7 + rand() * 15;
      const puff = new THREE.Mesh(new THREE.SphereGeometry(s, 6, 5), mat);
      puff.position.set((rand() - 0.5) * 32, (rand() - 0.5) * 5, (rand() - 0.5) * 20);
      puff.scale.y = 0.55;
      cloud.add(puff);
    }
    const a = rand() * Math.PI * 2;
    const r = 140 + rand() * 500;
    cloud.position.set(Math.cos(a) * r, 75 + rand() * 85, Math.sin(a) * r);
    cloud.rotation.y = rand() * Math.PI;
    group.add(cloud);
  }
  scene.add(group);
  return group;
}

function addFireflies(scene, color = '#9effc8', count = 140, opts = {}) {
  const rand = mulberry32(opts.seed || 41);
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2;
    const r = 30 + rand() * (opts.range || 260);
    pos[i * 3] = Math.cos(a) * r;
    pos[i * 3 + 1] = (opts.y || 0) + rand() * 45;
    pos[i * 3 + 2] = Math.sin(a) * r;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    color, size: opts.size || 1.3, transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
  });
  const p = new THREE.Points(g, mat);
  p.frustumCulled = false;
  scene.add(p);
  return p;
}

/* ================================================================== */
/* Landmarks                                                          */
/* ================================================================== */

function addTower(group, x, z, radius, height, theme, roofColor = '#3b4458') {
  const stone = standard('#8e8a7e', { roughness: 0.95 });
  const stone2 = standard('#777264', { roughness: 1 });
  const roof = standard(roofColor, { roughness: 0.7, metalness: 0.15 });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 1.08, height, 8), stone);
  body.position.set(x, height / 2, z);
  body.castShadow = true; body.receiveShadow = true;
  group.add(body);
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(radius * 1.13, radius * 1.13, 1.4, 8), stone2);
  ring.position.set(x, height - 2, z);
  group.add(ring);
  const cone = new THREE.Mesh(new THREE.ConeGeometry(radius * 1.42, radius * 2.6, 8), roof);
  cone.position.set(x, height + radius * 1.3, z);
  cone.castShadow = true;
  group.add(cone);
  const winMat = new THREE.MeshStandardMaterial({ color: '#ffcf73', emissive: '#ffb84d', emissiveIntensity: 1.8 });
  for (let i = 0; i < Math.max(2, Math.floor(height / 10)); i++) {
    const w = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.7, 0.3), winMat);
    const a = (i / 5) * Math.PI * 2;
    w.position.set(x + Math.cos(a) * (radius + 0.05), 7 + i * (height - 10) / Math.max(2, Math.floor(height / 10)), z + Math.sin(a) * (radius + 0.05));
    w.lookAt(x, w.position.y, z);
    group.add(w);
  }
  return body;
}

function makeCastle(theme, scale = 1) {
  const g = new THREE.Group();
  const stone = standard('#7d7b71', { roughness: 1 });
  const keep = new THREE.Mesh(new THREE.BoxGeometry(52, 34, 32), stone);
  keep.position.set(0, 17, 0); keep.castShadow = true; keep.receiveShadow = true;
  g.add(keep);
  const hall = new THREE.Mesh(new THREE.BoxGeometry(35, 24, 46), standard('#89867a'));
  hall.position.set(-34, 12, 8); hall.castShadow = true;
  g.add(hall);
  addTower(g, 28, 12, 8, 58, theme, '#2f4b62');
  addTower(g, -28, -16, 7, 46, theme, '#425d4e');
  addTower(g, 5, 22, 6, 40, theme, '#3a4d66');
  addTower(g, -12, 24, 5, 34, theme, '#4e3e62');
  addTower(g, 38, -14, 5, 32, theme, '#35485c');
  // viaduct arches
  const bridgeMat = standard('#8a877c');
  for (let i = 0; i < 5; i++) {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(2, 2.5, 15, 6), bridgeMat);
    pillar.position.set(-46 - i * 11, 7.5, -14);
    g.add(pillar);
    const arch = new THREE.Mesh(new THREE.TorusGeometry(4, 0.75, 5, 8, Math.PI), bridgeMat);
    arch.position.set(-46 - i * 11, 13, -14);
    arch.rotation.z = Math.PI;
    g.add(arch);
  }
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(58, 2.2, 6), bridgeMat);
  bridge.position.set(-68, 17, -14);
  g.add(bridge);
  // glowing windows
  const winMat = new THREE.MeshStandardMaterial({ color: '#ffd078', emissive: '#ffb347', emissiveIntensity: 1.6 });
  for (let i = 0; i < 44; i++) {
    const w = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.8, 0.25), winMat);
    const side = Math.floor(Math.random() * 4);
    const y = 6 + Math.random() * 24;
    if (side === 0) w.position.set(-25 + Math.random() * 50, y, 16.1);
    if (side === 1) w.position.set(-25 + Math.random() * 50, y, -16.1);
    if (side === 2) w.position.set(26.1, y, -15 + Math.random() * 30);
    if (side === 3) w.position.set(-26.1, y, -15 + Math.random() * 30);
    if (side < 2) w.rotation.y = 0;
    else w.rotation.y = Math.PI / 2;
    g.add(w);
  }
  g.scale.setScalar(scale);
  return g;
}

function makePagoda(theme, scale = 1) {
  const g = new THREE.Group();
  const wall = standard('#7a3d33', { roughness: 0.9 });
  const roof = standard('#3b2a2c', { roughness: 0.85 });
  const gold = standard('#dab45f', { metalness: 0.55, roughness: 0.4 });
  for (let i = 0; i < 5; i++) {
    const w = 28 - i * 4;
    const body = new THREE.Mesh(new THREE.BoxGeometry(w, 7, w * 0.8), wall);
    body.position.y = 3.5 + i * 9;
    g.add(body);
    const r = new THREE.Mesh(new THREE.ConeGeometry(w * 0.95, 5, 4), roof);
    r.position.y = 8.5 + i * 9;
    r.rotation.y = Math.PI / 4;
    g.add(r);
  }
  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.6, 12, 6), gold);
  spire.position.y = 51;
  g.add(spire);
  const orb = new THREE.Mesh(new THREE.SphereGeometry(1.2, 8, 6), gold);
  orb.position.y = 57;
  g.add(orb);
  g.scale.setScalar(scale);
  return g;
}

function addTorii(scene, x, z, y, scale, color = '#b23a3a') {
  const g = new THREE.Group();
  const mat = standard(color, { roughness: 0.8 });
  const post = new THREE.CylinderGeometry(0.55, 0.7, 10, 6);
  const p1 = new THREE.Mesh(post, mat); p1.position.set(-4, 5, 0); g.add(p1);
  const p2 = new THREE.Mesh(post, mat); p2.position.set(4, 5, 0); g.add(p2);
  const top = new THREE.Mesh(new THREE.BoxGeometry(11, 1, 1.4), mat); top.position.y = 10.4; g.add(top);
  const top2 = new THREE.Mesh(new THREE.BoxGeometry(9.5, 0.7, 1.2), mat); top2.position.y = 8.9; g.add(top2);
  g.position.set(x, y, z);
  g.scale.setScalar(scale);
  scene.add(g);
  return g;
}

function makePyramid(theme, size) {
  const g = new THREE.Group();
  const mat = standard('#c39a5c', { roughness: 1 });
  const body = new THREE.Mesh(new THREE.ConeGeometry(size, size * 1.15, 4, 4), mat);
  body.rotation.y = Math.PI / 4;
  body.position.y = size * 0.575;
  body.castShadow = true;
  g.add(body);
  const cap = new THREE.Mesh(new THREE.ConeGeometry(size * 0.14, size * 0.14, 4), standard('#e8c06a', { metalness: 0.6, roughness: 0.3 }));
  cap.rotation.y = Math.PI / 4; cap.position.y = size * 1.09;
  g.add(cap);
  return g;
}

/* ================================================================== */
/* Stadium                                                            */
/* ================================================================== */

export function createStadium(scene, opts = {}) {
  const {
    colors = ['#9e1b32', '#f3e7ce'], accent = '#e2b954', scale = 1,
    hoops = true, crowd = 1200, seed = 5, logo = 'WC',
  } = opts;
  const group = new THREE.Group();
  group.scale.setScalar(scale);

  // Pitch
  const pitchGeo = new THREE.CircleGeometry(1, 64);
  pitchGeo.rotateX(-Math.PI / 2);
  const pitch = new THREE.Mesh(pitchGeo, new THREE.MeshStandardMaterial({
    color: '#3d6b3a', roughness: 1,
  }));
  pitch.scale.set(90, 1, 55);
  pitch.receiveShadow = true;
  group.add(pitch);

  const dirt = new THREE.Mesh(new THREE.RingGeometry(1, 1.1, 64), new THREE.MeshStandardMaterial({ color: '#6a5533', roughness: 1 }));
  dirt.rotation.x = -Math.PI / 2; dirt.scale.set(91, 56, 1);
  dirt.position.y = 0.01; group.add(dirt);

  // Field lines
  const lineMat = new THREE.LineBasicMaterial({ color: '#efe7cd', transparent: true, opacity: 0.7 });
  const ellipsePts = [];
  for (let i = 0; i <= 80; i++) {
    const a = (i / 80) * Math.PI * 2;
    ellipsePts.push(new THREE.Vector3(Math.cos(a) * 86, 0.04, Math.sin(a) * 52));
  }
  group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ellipsePts), lineMat));
  const centerPts = [new THREE.Vector3(0, 0.04, -50), new THREE.Vector3(0, 0.04, 50)];
  group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(centerPts), lineMat));
  const centerRing = new THREE.Mesh(new THREE.RingGeometry(14, 14.4, 48), new THREE.MeshBasicMaterial({ color: '#efe7cd', transparent: true, opacity: 0.45, side: THREE.DoubleSide }));
  centerRing.rotation.x = -Math.PI / 2; centerRing.position.y = 0.03; group.add(centerRing);

  // Stands
  const standMat = standard('#3c3b43', { roughness: 0.95, emissive: '#2b2a35', emissiveIntensity: 0.55 });
  const tiers = [
    { off: 10, y: 3, h: 6, d: 13 },
    { off: 22, y: 8.5, h: 6, d: 13 },
    { off: 34, y: 14, h: 6, d: 13 },
  ];
  const segs = 56;
  const standBlocks = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), standMat, tiers.length * segs);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  let idx = 0;
  for (const t of tiers) {
    for (let i = 0; i < segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      const rx = 95 + t.off, rz = 61 + t.off * 0.72;
      const x = Math.cos(a) * rx, z = Math.sin(a) * rz;
      e.set(0, -a + Math.PI / 2, 0);
      q.setFromEuler(e);
      const len = Math.max(9, (Math.PI * 2 * Math.sqrt((rx * rx + rz * rz) / 2) / segs) * 1.08);
      m.compose(new THREE.Vector3(x, t.y, z), q, new THREE.Vector3(len, t.h, t.d));
      standBlocks.setMatrixAt(idx++, m);
    }
  }
  standBlocks.receiveShadow = true;
  group.add(standBlocks);

  // Crowd
  const rand = mulberry32(seed);
  const crowdGeo = new THREE.BoxGeometry(0.6, 1.1, 0.6);
  const crowdMat = new THREE.MeshStandardMaterial({ roughness: 0.9 });
  const crowdMesh = new THREE.InstancedMesh(crowdGeo, crowdMat, crowd);
  const palette = [colors[0], colors[1], accent, '#e8e2d2', '#5b6c8c', '#a24a5c', '#4b7a5f'];
  const tmpColor = new THREE.Color();
  for (let i = 0; i < crowd; i++) {
    const tier = Math.floor(rand() * tiers.length);
    const t = tiers[tier];
    const a = rand() * Math.PI * 2;
    const rx = 95 + t.off, rz = 61 + t.off * 0.72;
    const jitter = (rand() - 0.5) * 10;
    const x = Math.cos(a) * (rx + jitter), z = Math.sin(a) * (rz + jitter * 0.7);
    const s = 0.75 + rand() * 0.55;
    m.compose(new THREE.Vector3(x, t.y + t.h / 2 + 0.9 + rand() * 0.8, z), q.identity(), new THREE.Vector3(s, s, s));
    crowdMesh.setMatrixAt(i, m);
    tmpColor.set(palette[Math.floor(rand() * palette.length)]);
    crowdMesh.setColorAt(i, tmpColor);
  }
  group.add(crowdMesh);

  // Outer wall
  const wallGeo = new THREE.CylinderGeometry(1, 1, 1, 64, 1, true);
  const wall = new THREE.Mesh(wallGeo, new THREE.MeshStandardMaterial({ color: '#2e2d33', emissive: '#23222c', emissiveIntensity: 0.5, roughness: 1, side: THREE.DoubleSide }));
  // Keep the perimeter barrier low: a full-height ring blocks the low-flight
  // camera's view across the pitch and hides the stands and goal hoops.
  wall.scale.set(118, 5, 79);
  wall.position.y = 2.5;
  group.add(wall);

  // Floodlight towers
  const poleMat = standard('#5a5b63', { metalness: 0.5, roughness: 0.6 });
  const lightMat = new THREE.MeshStandardMaterial({ color: '#fff2bd', emissive: '#ffe38a', emissiveIntensity: 3.2 });
  const corners = [[-116, -76], [116, -76], [-116, 76], [116, 76]];
  for (const [x, z] of corners) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(1, 1.6, 56, 6), poleMat);
    pole.position.set(x, 28, z); group.add(pole);
    const panel = new THREE.Mesh(new THREE.BoxGeometry(14, 5, 1.5), lightMat);
    panel.position.set(x, 57, z); panel.lookAt(0, 30, 0); group.add(panel);
    const glow = glowSprite('#ffe9b0', 34, 0.45);
    glow.position.set(x, 57, z); group.add(glow);
  }

  // Banners
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const rx = 94, rz = 60;
    const x = Math.cos(a) * rx, z = Math.sin(a) * rz;
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 23, 5), poleMat);
    pole.position.set(x, 11.5, z); group.add(pole);
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(7, 11), new THREE.MeshStandardMaterial({
      color: i % 2 ? colors[0] : colors[1], side: THREE.DoubleSide, roughness: 0.9,
      emissive: accent, emissiveIntensity: 0.08,
    }));
    flag.position.set(x, 17, z);
    flag.lookAt(0, 17, 0);
    flag.rotateY(Math.PI / 2);
    group.add(flag);
    const crest = new THREE.Mesh(new THREE.CircleGeometry(1.6, 16), new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.95, side: THREE.DoubleSide }));
    crest.position.set(x, 17, z);
    crest.lookAt(0, 17, 0);
    crest.translateZ(0.08);
    group.add(crest);
  }

  // Hoops
  const hoopMat = new THREE.MeshStandardMaterial({
    color: '#d8ad4f', emissive: '#b47c1e', emissiveIntensity: 0.8, metalness: 0.7, roughness: 0.32,
  });
  const hoopData = [];
  if (hoops) {
    for (const side of [-1, 1]) {
      const baseX = side * 88;
      [8.5, 13.5, 18.5].forEach((y, i) => {
        const z = (i - 1) * 8;
        const poleX = baseX + side * 4.6;
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.5, y + 4, 6), hoopMat);
        pole.position.set(poleX, (y + 4) / 2, z);
        group.add(pole);
        const arm = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.34, 0.34), hoopMat);
        arm.position.set(baseX + side * 2.3, y + 0.1, z);
        group.add(arm);
        const ring = new THREE.Mesh(new THREE.TorusGeometry(3.4 - i * 0.25, 0.26, 8, 26), hoopMat);
        ring.position.set(baseX, y, z);
        ring.rotation.y = Math.PI / 2;
        ring.castShadow = false;
        group.add(ring);
        const glow = glowSprite('#ffd97a', 7, 0.3);
        glow.position.set(baseX, y, z);
        group.add(glow);
        hoopData.push({ side, y, x: baseX, z, ring });
      });
    }
  }
  // big central crest on the field? scoreboard towers
  const boardMat = new THREE.MeshStandardMaterial({ color: '#161b2b', emissive: '#0c1220', roughness: 0.5 });
  const board = new THREE.Mesh(new THREE.BoxGeometry(34, 14, 2), boardMat);
  board.position.set(0, 25, -86);
  group.add(board);
  const boardGlow = new THREE.Mesh(new THREE.PlaneGeometry(30, 10), new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.22 }));
  boardGlow.position.set(0, 25, -84.9);
  group.add(boardGlow);

  scene.add(group);
  return { group, pitch, hoopData, crowdMesh, colors, accent };
}

/* ================================================================== */
/* Broom & characters                                                 */
/* ================================================================== */

export function createBroomModel(opts = {}) {
  const {
    robe = '#8f1d2c', skin = '#d9a97f', hair = '#3a251a',
    livery = '#e8bd5b', wood = ['#8b5a34', '#caa06b'], scale = 1,
  } = opts;
  const g = new THREE.Group();
  const woodMat = new THREE.MeshStandardMaterial({ color: wood[0], roughness: 0.6, metalness: 0.08 });
  const woodMat2 = new THREE.MeshStandardMaterial({ color: wood[1], roughness: 0.55 });
  const bristleMat = new THREE.MeshStandardMaterial({ color: '#c9a765', roughness: 0.95 });
  const accentMat = new THREE.MeshStandardMaterial({ color: livery, roughness: 0.35, metalness: 0.45 });
  const robeMat = new THREE.MeshStandardMaterial({ color: robe, roughness: 0.82 });
  const skinMat = new THREE.MeshStandardMaterial({ color: skin, roughness: 0.85 });
  const hairMat = new THREE.MeshStandardMaterial({ color: hair, roughness: 0.95 });

  // Handle
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.13, 3.4, 8), woodMat);
  handle.rotation.x = Math.PI / 2;
  handle.position.z = -0.15;
  g.add(handle);
  const nose = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.09, 0.8, 8), woodMat2);
  nose.rotation.x = Math.PI / 2;
  nose.position.z = -2.05;
  g.add(nose);
  const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.7, 8), accentMat);
  grip.rotation.x = Math.PI / 2; grip.position.z = -1.5; g.add(grip);
  for (const z of [-1.05, 0.1, 0.7]) {
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.025, 4, 10), accentMat);
    band.position.z = z; band.rotation.y = Math.PI / 2; band.rotation.x = Math.PI / 2; g.add(band);
  }
  const bristle = new THREE.Mesh(new THREE.ConeGeometry(0.38, 1.7, 10), bristleMat);
  bristle.rotation.x = -Math.PI / 2;
  bristle.position.set(0, 0.02, 2.35);
  g.add(bristle);
  const bristle2 = new THREE.Mesh(new THREE.ConeGeometry(0.3, 1.2, 8), new THREE.MeshStandardMaterial({ color: '#b28f53', roughness: 1 }));
  bristle2.rotation.x = -Math.PI / 2;
  bristle2.position.set(0, 0.02, 2.05);
  g.add(bristle2);
  const tie = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.05, 4, 10), accentMat);
  tie.position.z = 1.55; tie.rotation.x = Math.PI / 2; g.add(tie);

  // Rider body leaning forward
  const rider = new THREE.Group();
  rider.position.y = 0.2;
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.42, 1.15, 8), robeMat);
  torso.rotation.x = 0.55; torso.position.set(0, 0.7, 0.18); torso.castShadow = true;
  rider.add(torso);
  const robeTail = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.9, 7, 1, true), robeMat);
  robeTail.rotation.x = -1.0; robeTail.position.set(0, 0.38, 0.95); rider.add(robeTail);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.27, 10, 8), skinMat);
  head.position.set(0, 1.38, -0.25); head.castShadow = true; rider.add(head);
  const hairMesh = new THREE.Mesh(new THREE.SphereGeometry(0.285, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.62), hairMat);
  hairMesh.position.copy(head.position); hairMesh.position.y += 0.02; hairMesh.rotation.x = -0.2; rider.add(hairMesh);
  const scarf = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.055, 4, 12), accentMat);
  scarf.position.set(0, 1.15, -0.2); scarf.rotation.x = Math.PI / 2 + 0.18; rider.add(scarf);
  const scarfTail = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.06, 0.8), accentMat);
  scarfTail.position.set(0.18, 1.12, 0.25); scarfTail.rotation.x = 0.3; scarfTail.rotation.z = -0.2; rider.add(scarfTail);
  // arms
  const armMat = robeMat;
  const arm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.09, 0.75, 6), armMat);
  arm1.position.set(-0.28, 0.78, -0.55); arm1.rotation.x = 1.12; arm1.rotation.z = 0.3; rider.add(arm1);
  const arm2 = arm1.clone(); arm2.position.x = 0.28; arm2.rotation.z = -0.3; rider.add(arm2);
  const handMat = skinMat;
  const hand = new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 5), handMat);
  hand.position.set(-0.2, 0.42, -0.95); rider.add(hand);
  const hand2 = hand.clone(); hand2.position.x = 0.2; rider.add(hand2);
  g.add(rider);
  g.userData = { robeTail, scarfTail, handle, bristle, rider };
  g.scale.setScalar(scale);
  return g;
}

export function createQuaffle() {
  const g = new THREE.Group();
  const ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 14, 12),
    new THREE.MeshStandardMaterial({ color: '#9f2f26', roughness: 0.55, metalness: 0.08 })
  );
  ball.castShadow = true;
  g.add(ball);
  const seam = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.035, 4, 18), new THREE.MeshStandardMaterial({ color: '#e0bf8a', roughness: 0.7 }));
  seam.rotation.x = Math.PI / 2; g.add(seam);
  const seam2 = seam.clone(); seam2.rotation.set(0, Math.PI / 2, 0); g.add(seam2);
  g.userData.ball = ball;
  return g;
}

export function createBludger() {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: '#2a2b30', roughness: 0.45, metalness: 0.65 });
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.52, 12, 10), mat);
  ball.castShadow = true; g.add(ball);
  for (let i = 0; i < 8; i++) {
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.35, 4), mat);
    const a = (i / 8) * Math.PI * 2;
    spike.position.set(Math.cos(a) * 0.5, Math.sin(a * 2.1) * 0.4, Math.sin(a) * 0.5);
    spike.lookAt(0, 0, 0);
    spike.rotateX(Math.PI / 2);
    g.add(spike);
  }
  const glow = glowSprite('#8e6aff', 2.6, 0.4); g.add(glow);
  return g;
}

export function createSnitch() {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: '#e8c25a', emissive: '#c79a2e', emissiveIntensity: 1.5, metalness: 0.8, roughness: 0.25,
  });
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.26, 10, 8), mat);
  g.add(body);
  const wingMat = new THREE.MeshStandardMaterial({
    color: '#f6e7bd', transparent: true, opacity: 0.85, side: THREE.DoubleSide,
    emissive: '#e8d28a', emissiveIntensity: 0.6, roughness: 0.4,
  });
  const w1 = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.38), wingMat);
  w1.position.set(0.55, 0.15, 0); w1.rotation.z = -0.3;
  const w2 = w1.clone(); w2.position.x = -0.55; w2.rotation.z = 0.3;
  g.add(w1, w2);
  const glow = glowSprite('#ffe08a', 4.5, 0.8); g.add(glow);
  g.userData = { wings: [w1, w2], glow };
  return g;
}

export function addPlayerMarker(group, color = '#f2cf72') {
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(1.25, 1.5, 32),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = -0.8;
  group.add(ring);
  const glow = glowSprite(color, 5, 0.35);
  glow.position.y = 0.2;
  group.add(glow);
  return { ring, glow };
}

/* ================================================================== */
/* Weather                                                            */
/* ================================================================== */

export class WeatherSystem {
  constructor(scene, type = 'clear', theme = getTheme('hogwarts')) {
    this.scene = scene;
    this.type = type;
    this.theme = theme;
    this.group = new THREE.Group();
    this.group.frustumCulled = false;
    scene.add(this.group);
    this.points = null;
    this.vel = [];
    this.wind = new THREE.Vector3(0.9, 0, 0.3);
    this.flash = 0;
    this.time = 0;
    this.build(type);
  }

  build(type) {
    if (this.points) {
      this.group.remove(this.points);
      this.points.geometry.dispose();
      this.points.material.dispose();
      this.points = null;
    }
    this.type = type;
    if (type === 'clear') return;
    const rain = type === 'rain' || type === 'storm';
    const count = type === 'storm' ? 900 : rain ? 700 : 700;
    const pos = new Float32Array(count * 3);
    this.vel = [];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 140;
      pos[i * 3 + 1] = (Math.random() - 0.2) * 90;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 140;
      this.vel.push({
        y: rain ? 34 + Math.random() * 20 : 1.1 + Math.random() * 2.2,
        x: (Math.random() - 0.5) * 2,
      });
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color: rain ? '#bcd8ea' : '#ffffff',
      size: rain ? 0.5 : 0.85,
      transparent: true,
      opacity: rain ? 0.55 : 0.85,
      depthWrite: false,
      blending: rain ? THREE.NormalBlending : THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
    this.group.add(this.points);
    this.count = count;
  }

  setType(type, theme) {
    this.build(type);
    if (theme) this.theme = theme;
  }

  update(dt, camera) {
    if (!this.points) return;
    this.time += dt;
    const rain = this.type === 'rain' || this.type === 'storm';
    this.group.position.set(camera.position.x, camera.position.y, camera.position.z);
    const pos = this.points.geometry.attributes.position;
    const arr = pos.array;
    const windX = (this.type === 'storm' ? 12 : 2.4) * dt;
    for (let i = 0; i < this.count; i++) {
      arr[i * 3 + 1] -= this.vel[i].y * dt;
      arr[i * 3] += this.vel[i].x * dt + windX;
      if (!rain) arr[i * 3 + 2] += Math.sin(this.time * 0.8 + i) * 0.5 * dt;
      if (arr[i * 3 + 1] < -38) {
        arr[i * 3 + 1] = 52;
        arr[i * 3] = (Math.random() - 0.5) * 140;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 140;
      }
      if (arr[i * 3] > 72) arr[i * 3] = -72;
      if (arr[i * 3] < -72) arr[i * 3] = 72;
    }
    pos.needsUpdate = true;
    if (this.type === 'storm') {
      this.flash = Math.max(0, this.flash - dt * 2.4);
      if (Math.random() < dt * 0.14) this.flash = 1;
    }
  }
}

/* ================================================================== */
/* Race world                                                         */
/* ================================================================== */

function makeGate(track, i, curve) {
  const pts = track.points;
  const p = new THREE.Vector3(...pts[i]);
  const n = pts.length;
  const prev = new THREE.Vector3(...pts[(i - 1 + n) % n]);
  const next = new THREE.Vector3(...pts[(i + 1) % n]);
  const tangent = next.clone().sub(prev).normalize();
  const mod = track.warp?.includes(i) ? 'warp' : track.boost?.includes(i) ? 'boost' : 'normal';
  const color = mod === 'warp' ? '#b581ff' : mod === 'boost' ? '#ffd166' : '#6fe3ff';
  const group = new THREE.Group();
  group.position.copy(p);
  group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);

  const ringMat = new THREE.MeshStandardMaterial({
    color: mod === 'warp' ? '#5d2f88' : '#1d5a6b',
    emissive: color, emissiveIntensity: 1.3, metalness: 0.55, roughness: 0.3,
  });
  const radius = mod === 'warp' ? 8.4 : 7.6;
  const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.38, 8, 40), ringMat);
  ring.castShadow = false;
  group.add(ring);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(radius + 0.7, 0.1, 4, 40), new THREE.MeshBasicMaterial({
    color, transparent: true, opacity: 0.55,
  }));
  group.add(ring2);
  const glow = glowSprite(color, 22, 0.35);
  group.add(glow);
  const inner = new THREE.Mesh(new THREE.CircleGeometry(radius - 0.2, 32), new THREE.MeshBasicMaterial({
    color, transparent: true, opacity: 0.035, side: THREE.DoubleSide, depthWrite: false,
  }));
  group.add(inner);
  // small fins for readability
  for (const s of [-1, 1]) {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.8, 1.2), ringMat);
    fin.position.set(s * (radius + 0.6), 0, 0);
    group.add(fin);
  }
  if (mod === 'warp') {
    const label = makeLabelSprite('WARP', '#d7b9ff');
    label.position.set(0, radius + 3, 0);
    label.scale.set(6.5, 1.65, 1);
    group.add(label);
    group.add(glowSprite('#a969ff', 18, 0.4));
  } else if (mod === 'boost') {
    const label = makeLabelSprite('BOOST', '#ffe6a6');
    label.position.set(0, radius + 3, 0);
    label.scale.set(6.8, 1.7, 1);
    group.add(label);
  }
  return { group, ring, ring2, inner, glow, mod, color, radius, pos: p, index: i };
}

export function buildRaceWorld(track, quality = 'high') {
  const theme = getTheme(track.theme);
  const scene = new THREE.Scene();
  buildSky(scene, theme, { seed: track.points.length * 13 + 3 });
  const lights = buildLighting(scene, theme);
  if (quality !== 'low') lights.dir.castShadow = true;
  buildTerrain(scene, theme, { seed: track.id.length * 7 + 2 });
  addClouds(scene, theme, { count: theme.night ? 7 : 11, seed: track.id.length * 3 + 1 });

  const center = new THREE.Vector3(0, theme.groundY, 0);
  if (track.theme === 'hogwarts') {
    addMountains(scene, theme, { count: 12, minR: 360, maxR: 380, height: 130 });
    addWater(scene, theme, 0, 0, 280, 190);
    const castle = makeCastle(theme, 1.35);
    castle.position.set(-10, theme.groundY + 12, -8);
    scene.add(castle);
    addForest(scene, theme, { count: 220, minR: 120, range: 420, seed: 9 });
    // floating candles
    const fireflies = addFireflies(scene, '#ffd894', 90, { range: 160, y: theme.groundY + 80, seed: 12 });
    scene.userData.fireflies = fireflies;
  } else if (track.theme === 'worldcup') {
    const stadium = createStadium(scene, {
      colors: ['#6b2440', '#d9c58f'], accent: '#f0c75a', scale: 1.05, crowd: 1300, seed: 14,
    });
    stadium.group.position.set(0, theme.groundY + 4, 0);
    addMountains(scene, theme, { count: 10, minR: 430, maxR: 200, height: 140 });
    addForest(scene, theme, { count: 80, minR: 320, range: 300, seed: 17 });
    addFireflies(scene, '#ffe6a8', 90, { range: 300, y: 10, seed: 19 });
  } else if (track.theme === 'highlands') {
    addMountains(scene, theme, { count: 20, minR: 320, maxR: 300, height: 210, snowCap: true });
    addWater(scene, theme, 40, -20, 320, 220, '#375d64');
    addForest(scene, theme, { count: 180, minR: 130, range: 400, seed: 23 });
    // standing stones
    const stoneMat = standard('#6f7468', { roughness: 1 });
    for (let i = 0; i < 13; i++) {
      const a = (i / 13) * Math.PI * 2;
      const s = new THREE.Mesh(new THREE.BoxGeometry(4 + Math.random() * 2, 10 + Math.random() * 9, 3.5), stoneMat);
      s.position.set(Math.cos(a) * 72, theme.groundY + 7, Math.sin(a) * 72);
      s.rotation.y = a + Math.random() * 0.4;
      s.rotation.z = (Math.random() - 0.5) * 0.12;
      s.castShadow = true;
      scene.add(s);
    }
    addFireflies(scene, '#b4e6c0', 60, { range: 220, y: theme.groundY + 25, seed: 27 });
  } else if (track.theme === 'london') {
    const rand = mulberry32(33);
    const bMat = standard('#3b3947', { roughness: 0.9 });
    const bMat2 = standard('#554b57', { roughness: 0.9 });
    const winMat = new THREE.MeshStandardMaterial({ color: '#ffd27c', emissive: '#ffb84a', emissiveIntensity: 2.2 });
    for (let i = 0; i < 46; i++) {
      const a = rand() * Math.PI * 2;
      const r = 70 + rand() * 300;
      const h = 22 + rand() * 62;
      const w = 9 + rand() * 18;
      const d = 9 + rand() * 18;
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), rand() > 0.45 ? bMat : bMat2);
      b.position.set(Math.cos(a) * r, theme.groundY + h / 2 + 2, Math.sin(a) * r);
      b.rotation.y = rand() * Math.PI;
      b.castShadow = true;
      scene.add(b);
      const chimneys = 1 + Math.floor(rand() * 3);
      for (let c = 0; c < chimneys; c++) {
        const ch = new THREE.Mesh(new THREE.BoxGeometry(1.6, 4 + rand() * 3, 1.6), bMat);
        ch.position.set(b.position.x + (rand() - 0.5) * w * 0.6, theme.groundY + h + 2.5, b.position.z + (rand() - 0.5) * d * 0.6);
        scene.add(ch);
      }
      const cols = Math.floor(w / 4), rows = Math.floor(h / 6);
      for (let cx = 0; cx < cols; cx++) {
        for (let ry = 0; ry < rows; ry++) {
          if (rand() > 0.55) continue;
          const win = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.4, 0.2), winMat);
          win.position.set(
            b.position.x - w / 2 + 2.4 + cx * 4,
            theme.groundY + 5 + ry * 6,
            b.position.z + d / 2 + 0.1
          );
          win.rotation.y = b.rotation.y;
          // reposition windows roughly on the rotated facade
          const ox = win.position.x - b.position.x, oz = win.position.z - b.position.z;
          win.position.x = b.position.x + ox * Math.cos(b.rotation.y) - oz * Math.sin(b.rotation.y);
          win.position.z = b.position.z + ox * Math.sin(b.rotation.y) + oz * Math.cos(b.rotation.y);
          scene.add(win);
        }
      }
    }
    addWater(scene, theme, 0, -20, 380, 90, '#2a3346');
    addFireflies(scene, '#ffcf85', 80, { range: 220, y: theme.groundY + 50, seed: 39 });
  } else if (track.theme === 'forest') {
    addForest(scene, theme, { count: 330, minR: 55, range: 420, seed: 43, leafColor: '#1b3c2b' });
    addMountains(scene, theme, { count: 8, minR: 430, maxR: 120, height: 110 });
    // giant central tree
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(8, 16, 120, 9), standard('#3a2a1e', { roughness: 1 }));
    trunk.position.set(0, theme.groundY + 60, 0); scene.add(trunk);
    for (let i = 0; i < 5; i++) {
      const canopy = new THREE.Mesh(new THREE.SphereGeometry(24 + i * 6, 8, 6), standard('#20472f', { roughness: 1 }));
      canopy.position.set(Math.cos(i * 1.4) * 18, theme.groundY + 110 + i * 7, Math.sin(i * 1.4) * 18);
      canopy.scale.y = 0.6; scene.add(canopy);
    }
    for (let i = 0; i < 26; i++) {
      const a = Math.random() * Math.PI * 2, r = 60 + Math.random() * 180;
      const shroomMat = new THREE.MeshStandardMaterial({ color: '#2a5f6d', emissive: '#58e0d0', emissiveIntensity: 1.5, roughness: 0.7 });
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.5, 2.2, 5), standard('#d8e7d0'));
      const cap = new THREE.Mesh(new THREE.SphereGeometry(1.2, 7, 5, 0, Math.PI * 2, 0, Math.PI / 2), shroomMat);
      stem.position.set(Math.cos(a) * r, theme.groundY + 1, Math.sin(a) * r);
      cap.position.copy(stem.position).y += 2.1;
      scene.add(stem, cap);
    }
    addFireflies(scene, '#7cffcf', 220, { range: 300, y: theme.groundY + 10, seed: 47, size: 1.6 });
  } else if (track.theme === 'alpine') {
    addMountains(scene, theme, { count: 26, minR: 260, maxR: 340, height: 260, snowCap: true });
    addWater(scene, theme, 0, 0, 300, 220, '#7fb7c9');
    addForest(scene, theme, { count: 150, minR: 150, range: 380, seed: 53 });
    addFireflies(scene, '#b9f4ff', 110, { range: 280, y: theme.groundY + 50, seed: 57 });
  } else if (track.theme === 'kyoto') {
    const pagoda = makePagoda(theme, 1.15);
    pagoda.position.set(0, theme.groundY + 8, 0);
    scene.add(pagoda);
    for (let i = 0; i < 7; i++) addTorii(scene, -100 + i * 34, -70 + i * 12, theme.groundY + 2, 1.3);
    addMountains(scene, theme, { count: 9, minR: 380, maxR: 220, height: 150 });
    addForest(scene, theme, { count: 170, minR: 110, range: 360, seed: 61, leafColor: '#7a4f5e' });
    // lanterns
    const lanternMat = new THREE.MeshStandardMaterial({ color: '#ffb55d', emissive: '#ff9d3c', emissiveIntensity: 2.2 });
    for (let i = 0; i < 55; i++) {
      const a = Math.random() * Math.PI * 2, r = 40 + Math.random() * 240;
      const l = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 1.2, 6), lanternMat);
      l.position.set(Math.cos(a) * r, theme.groundY + 25 + Math.random() * 70, Math.sin(a) * r);
      scene.add(l);
    }
    addFireflies(scene, '#ffd1a1', 120, { range: 260, y: theme.groundY + 30, seed: 67 });
  } else if (track.theme === 'cairo') {
    const p1 = makePyramid(theme, 110); p1.position.set(-10, theme.groundY + 2, -10); scene.add(p1);
    const p2 = makePyramid(theme, 70); p2.position.set(150, theme.groundY + 2, 90); scene.add(p2);
    const p3 = makePyramid(theme, 50); p3.position.set(-180, theme.groundY + 2, 120); scene.add(p3);
    addMountains(scene, theme, { count: 8, minR: 460, maxR: 180, height: 80 });
    const obeliskMat = standard('#c8a266', { roughness: 0.8 });
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2, r = 100;
      const ob = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 2.4, 24, 4), obeliskMat);
      ob.position.set(Math.cos(a) * r, theme.groundY + 13, Math.sin(a) * r);
      ob.rotation.y = Math.PI / 4;
      scene.add(ob);
    }
    addForest(scene, theme, { count: 60, minR: 250, range: 300, seed: 71, leafColor: '#7c6b3f' });
    addFireflies(scene, '#ffdb93', 80, { range: 280, y: theme.groundY + 30, seed: 73 });
  }

  addFireflies(scene, theme.night ? '#9ec9ff' : '#ffe9bd', 45, { range: 420, y: 60, seed: 77, size: 0.9 });

  // Course
  const pathPts = track.points.map(p => new THREE.Vector3(...p));
  const curve = new THREE.CatmullRomCurve3(pathPts, true, 'catmullrom', 0.28);
  const gates = track.points.map((_, i) => makeGate(track, i, curve));
  for (const g of gates) scene.add(g.group);

  // Start arch
  const start = gates[0];
  const arch = new THREE.Group();
  arch.position.copy(start.group.position);
  arch.quaternion.copy(start.group.quaternion);
  const archMat = new THREE.MeshStandardMaterial({ color: '#d9b35c', metalness: 0.6, roughness: 0.35, emissive: '#8a5e18', emissiveIntensity: 0.35 });
  for (const s of [-1, 1]) {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.1, 25, 6), archMat);
    p.position.set(s * 12, 5, 0); arch.add(p);
  }
  const beam = new THREE.Mesh(new THREE.BoxGeometry(26, 2.4, 1.6), archMat);
  beam.position.y = 18; arch.add(beam);
  const banner = makeLabelSprite('START · FINISH', '#ffe5a0', 'rgba(30,16,20,0.8)');
  banner.position.set(0, 21.5, 0);
  banner.scale.set(18, 4.5, 1);
  arch.add(banner);
  scene.add(arch);

  // Guide points
  const guidePts = curve.getSpacedPoints(240);
  const guideGeo = new THREE.BufferGeometry().setFromPoints(guidePts);
  const guide = new THREE.Points(guideGeo, new THREE.PointsMaterial({
    color: '#ffe6a8', size: 0.75, transparent: true, opacity: 0.42,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(guide);

  // Tunnels
  const tunnels = [];
  for (let ti = 0; ti < (track.tunnel ? 1 : 0); ti++) {
    const startIdx = track.tunnel[0] % track.points.length;
    const endIdx = (track.tunnel[1] ?? startIdx + 1) % track.points.length;
    const a = pathPts[startIdx], b = pathPts[endIdx];
    const mid = a.clone().add(b).multiplyScalar(0.5);
    const len = a.distanceTo(b) + 12;
    const dir = b.clone().sub(a).normalize();
    const tunnelGroup = new THREE.Group();
    const shell = new THREE.Mesh(
      new THREE.CylinderGeometry(15, 15, len, 20, 1, true),
      new THREE.MeshStandardMaterial({
        color: track.theme === 'forest' ? '#233b2d' : track.theme === 'kyoto' ? '#5a3240' : '#4a4d57',
        roughness: 0.95, side: THREE.DoubleSide, transparent: true, opacity: 0.82,
      })
    );
    shell.rotation.x = Math.PI / 2;
    tunnelGroup.add(shell);
    const rimMat = new THREE.MeshStandardMaterial({
      color: '#807f7c', emissive: track.theme === 'kyoto' ? '#ff9b6b' : '#66d9ff',
      emissiveIntensity: 0.5, roughness: 0.7,
    });
    for (let i = 0; i < 5; i++) {
      const r = new THREE.Mesh(new THREE.TorusGeometry(15, 0.45, 6, 20), rimMat);
      r.position.z = -len / 2 + 3 + (i / 4) * (len - 6);
      tunnelGroup.add(r);
    }
    tunnelGroup.position.copy(mid);
    tunnelGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
    scene.add(tunnelGroup);
    tunnels.push(tunnelGroup);
  }

  // Obstacles between gates
  const rand = mulberry32(track.id.length * 19 + 5);
  const obstacles = [];
  const obsMat = standard(track.theme === 'forest' ? '#3c3327' : theme.rock, { roughness: 1 });
  for (let i = 0; i < 13; i++) {
    const gateIdx = Math.floor(rand() * gates.length);
    const gate = gates[gateIdx];
    const next = gates[(gateIdx + 1) % gates.length];
    const t = 0.35 + rand() * 0.35;
    const p = gate.pos.clone().lerp(next.pos, t);
    const side = new THREE.Vector3().subVectors(next.pos, gate.pos).normalize().cross(new THREE.Vector3(0, 1, 0)).normalize();
    const off = (rand() > 0.5 ? 1 : -1) * (2.2 + rand() * 6.5);
    p.addScaledVector(side, off);
    p.y += (rand() - 0.5) * 8;
    const isRock = rand() > 0.4;
    const geo = isRock ? new THREE.DodecahedronGeometry(1.8 + rand() * 1.6, 0) : new THREE.IcosahedronGeometry(1.4 + rand() * 1.2, 0);
    const mesh = new THREE.Mesh(geo, obsMat);
    mesh.position.copy(p);
    mesh.rotation.set(rand() * 3, rand() * 3, rand() * 3);
    mesh.castShadow = true;
    scene.add(mesh);
    const warn = glowSprite('#ff8066', 5, 0.26);
    warn.position.copy(p); scene.add(warn);
    obstacles.push({ mesh, pos: p, radius: 3.4, warn, baseY: p.y, phase: rand() * 6 });
  }

  // Boost hoops
  const pads = [];
  const padMat = new THREE.MeshStandardMaterial({
    color: '#d9a73d', emissive: '#ffcf5a', emissiveIntensity: 1.5, metalness: 0.5, roughness: 0.3,
  });
  for (const gi of (track.boost || [])) {
    const gate = gates[gi % gates.length];
    const p = gate.pos.clone();
    const pad = new THREE.Mesh(new THREE.TorusGeometry(3.5, 0.22, 6, 24), padMat);
    pad.position.copy(p);
    pad.quaternion.copy(gate.group.quaternion);
    scene.add(pad);
    const glow = glowSprite('#ffd873', 12, 0.35);
    glow.position.copy(p); scene.add(glow);
    pads.push({ mesh: pad, pos: p, phase: rand() * 6 });
  }

  const weather = new WeatherSystem(scene, track.weather, theme);
  const cloudGroup = scene.children.find(c => c.isGroup && c.children.length > 8 && c.children[0].isGroup);

  const state = { scene, theme, gates, curve, obstacles, pads, tunnels, weather, lights, track, time: 0, arch, guide, pathPts };
  state.update = (dt, camera) => {
    state.time += dt;
    weather.update(dt, camera);
    if (lights.dir) {
      const flash = weather.flash || 0;
      lights.dir.intensity = theme.sunIntensity * (1 + flash * 2.2);
      if (flash > 0.5) scene.fog.color.setHex(0x8fa9d8);
      else scene.fog.color.set(theme.fog);
    }
    for (const o of obstacles) {
      o.mesh.rotation.y += dt * 0.4;
      o.mesh.rotation.x += dt * 0.15;
      o.mesh.position.y = o.baseY + Math.sin(state.time * 0.8 + o.phase) * 1.1;
      o.pos.copy(o.mesh.position);
      o.warn.position.copy(o.mesh.position);
      o.warn.material.opacity = 0.14 + Math.sin(state.time * 3 + o.phase) * 0.08;
    }
    for (const p of pads) {
      p.mesh.rotation.z += dt * 1.2;
      p.mesh.material.emissiveIntensity = 1.2 + Math.sin(state.time * 4 + p.phase) * 0.5;
    }
    for (const g of gates) {
      g.ring.rotation.z += dt * 0.15;
      g.ring2.rotation.z -= dt * 0.35;
    }
    if (cloudGroup) cloudGroup.rotation.y += dt * 0.004;
  };
  return state;
}

/* ================================================================== */
/* Quidditch world                                                    */
/* ================================================================== */

export function buildQuidditchWorld(nation, opponent, opts = {}) {
  const theme = themeForNation(nation.id);
  if (opponent?.id === 'norway') theme.snow = true;
  const scene = new THREE.Scene();
  buildSky(scene, theme, { seed: nation.name.length * 5 + 4 });
  const lights = buildLighting(scene, theme);
  const terrain = buildTerrain(scene, theme, { seed: nation.name.length * 9 + 1 });
  addMountains(scene, theme, { count: 12, minR: 400, maxR: 250, height: 170, snowCap: theme.snow });
  addClouds(scene, theme, { count: 8, seed: nation.name.length + 5 });
  const stadium = createStadium(scene, {
    colors: nation.colors, accent: nation.accent, crowd: 1400, seed: nation.name.length * 7,
  });
  stadium.group.position.set(0, 0, 0);
  // Floodlit pitch fill so the stands and crowd read at every end of the ground.
  const floodA = new THREE.PointLight('#ffe6b8', 1900, 300, 2);
  floodA.position.set(-78, 46, 0); scene.add(floodA);
  const floodB = new THREE.PointLight('#ffe6b8', 1900, 300, 2);
  floodB.position.set(78, 46, 0); scene.add(floodB);
  // Surrounding tent village / flags (national flavour)
  const rand = mulberry32(nation.name.length * 13 + 7);
  for (let i = 0; i < 24; i++) {
    const a = rand() * Math.PI * 2;
    const r = 170 + rand() * 150;
    const tent = new THREE.Mesh(
      new THREE.ConeGeometry(7 + rand() * 7, 10 + rand() * 8, 4),
      new THREE.MeshStandardMaterial({ color: [nation.colors[0], nation.colors[1], nation.accent, '#d8d0ba'][Math.floor(rand() * 4)], roughness: 0.95 })
    );
    tent.position.set(Math.cos(a) * r, 5, Math.sin(a) * r);
    tent.rotation.y = rand() * Math.PI;
    scene.add(tent);
  }
  addFireflies(scene, nation.accent, 90, { range: 280, y: 12, seed: 79, size: 1.1 });
  const weatherType = theme.snow ? 'snow' : theme.rain ? 'rain' : 'clear';
  const weather = new WeatherSystem(scene, weatherType, theme);
  // Confetti cannons effect anchored above pitch
  const confetti = createConfetti(scene);
  const state = {
    scene, theme, stadium, weather, lights, confetti, time: 0,
    hoops: stadium.hoopData,
  };
  state.update = (dt, camera) => {
    state.time += dt;
    weather.update(dt, camera);
    confetti.update(dt);
    stadium.crowdMesh.rotation.y = Math.sin(state.time * 0.2) * 0.002;
  };
  return state;
}

function createConfetti(scene) {
  const count = 450;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const c = new THREE.Color();
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 180;
    pos[i * 3 + 1] = 20 + Math.random() * 60;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 120;
    c.setHSL(Math.random(), 0.8, 0.6);
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({ size: 1.1, vertexColors: true, transparent: true, opacity: 0, depthWrite: false });
  const points = new THREE.Points(geo, mat);
  scene.add(points);
  let intensity = 0;
  return {
    points,
    burst() {
      intensity = 1; mat.opacity = 0.95;
      const p = geo.attributes.position.array;
      for (let i = 0; i < count; i++) { p[i * 3 + 1] = 20 + Math.random() * 50; }
      geo.attributes.position.needsUpdate = true;
    },
    update(dt) {
      if (intensity <= 0) return;
      intensity -= dt * 0.08;
      mat.opacity = Math.max(0, intensity);
      const p = geo.attributes.position.array;
      for (let i = 0; i < count; i++) {
        p[i * 3 + 1] -= dt * (4 + (i % 7));
        p[i * 3] += Math.sin(i + intensity * 5) * dt * 1.2;
        if (p[i * 3 + 1] < 0) p[i * 3 + 1] = 70;
      }
      geo.attributes.position.needsUpdate = true;
    },
  };
}

/* ================================================================== */
/* Menu world                                                         */
/* ================================================================== */

export function buildMenuWorld(scene) {
  const theme = {
    ...getTheme('hogwarts'),
    skyTop: '#0a1732', skyBottom: '#273a5e', horizon: '#47416c',
    sun: '#cfdcff', fog: '#1d2b45', fogDensity: 0.0015,
    hemi: '#415e86', hemiGround: '#18231c', hemiIntensity: 0.7,
    sunColor: '#b3c8ec', sunIntensity: 1.0,
    sunDir: new THREE.Vector3(0.4, 0.45, -0.45), night: true, cloud: '#2b3953',
    ground: '#2a3324', ground2: '#3b4630',
  };
  buildSky(scene, theme, { seed: 11 });
  const lights = buildLighting(scene, theme);
  buildTerrain(scene, theme, { seed: 6 });
  addWater(scene, theme, 30, 20, 420, 260, '#1d3a4c');
  const castle = makeCastle(theme, 1.55);
  castle.position.set(-10, theme.groundY + 22, 10);
  scene.add(castle);
  addForest(scene, theme, { count: 170, minR: 140, range: 420, seed: 10 });
  addMountains(scene, theme, { count: 15, minR: 420, maxR: 350, height: 190, snowCap: true });
  addClouds(scene, theme, { count: 9, seed: 13 });
  const motes = addFireflies(scene, '#ffdd9a', 150, { range: 260, y: -10, seed: 15, size: 1.5 });
  const snitch = createSnitch();
  snitch.scale.setScalar(1.4);
  scene.add(snitch);
  const flyer = createBroomModel({
    robe: '#7d1c2b', skin: '#e0b48b', hair: '#4b2d1a', livery: '#e3bd63',
    wood: ['#4a2f1d', '#a97a46'],
  });
  flyer.scale.setScalar(1.9);
  scene.add(flyer);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 1500);
  camera.position.set(150, 66, 230);
  camera.lookAt(0, 30, 0);
  const group = new THREE.Group();
  // floating candles above the lake
  const candleMat = new THREE.MeshStandardMaterial({ color: '#fff0c8', emissive: '#ffcf76', emissiveIntensity: 2.6 });
  for (let i = 0; i < 26; i++) {
    const a = Math.random() * Math.PI * 2, r = 40 + Math.random() * 190;
    const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 1.4, 5), candleMat);
    candle.position.set(Math.cos(a) * r, theme.groundY + 65 + Math.random() * 55, Math.sin(a) * r);
    candle.userData.phase = Math.random() * 6;
    group.add(candle);
  }
  scene.add(group);
  const v = new THREE.Vector3();
  const update = (t, dt) => {
    const a = t * 0.045 + 2.2;
    camera.position.set(Math.cos(a) * 260, 82 + Math.sin(t * 0.14) * 9, Math.sin(a) * 260);
    camera.lookAt(-10, 35, 10);
    const sa = t * 0.9;
    snitch.position.set(Math.cos(sa) * 60, 48 + Math.sin(t * 2.3) * 8, Math.sin(sa) * 60);
    snitch.rotation.y += dt * 3;
    const wings = snitch.userData.wings;
    wings[0].rotation.y = Math.sin(t * 22) * 0.7;
    wings[1].rotation.y = -Math.sin(t * 22) * 0.7;
    const fa = t * 0.28;
    flyer.position.set(Math.cos(fa) * 130, 54 + Math.sin(t * 0.8) * 6, Math.sin(fa) * 130);
    v.set(-Math.sin(fa), 0, Math.cos(fa));
    flyer.lookAt(flyer.position.clone().add(v));
    flyer.rotation.z = 0.2;
    motes.rotation.y += dt * 0.02;
    group.children.forEach((c, i) => {
      c.position.y += Math.sin(t * 0.8 + c.userData.phase) * dt * 0.25;
    });
    lights.dir.intensity = theme.sunIntensity + Math.sin(t * 0.3) * 0.1;
  };
  return { scene, camera, update, theme, snitch, flyer };
}

/* ================================================================== */
/* Disposal                                                           */
/* ================================================================== */

export function disposeScene(scene) {
  if (!scene) return;
  scene.traverse(obj => {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      for (const m of mats) {
        if (m.map && m.map !== _glowTexture) m.map.dispose?.();
        m.dispose?.();
      }
    }
  });
  scene.clear?.();
}
