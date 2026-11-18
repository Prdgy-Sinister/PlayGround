import * as THREE from '../vendor/three.module.js';
import { TRACK_MAP, EXPLORE_ZONES, BUILDINGS, HABITAT_INFO, FAMILY_ORDER } from './data.js';

// ── deterministic RNG ───────────────────────────────────────────────────────
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h);
}

// ── textures ────────────────────────────────────────────────────────────────
function canvasTex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
let _glowTex = null;
export function glowTexture() {
  if (!_glowTex) _glowTex = canvasTex(128, 128, (c, w, h) => {
    const g = c.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.25, 'rgba(255,255,255,.65)');
    g.addColorStop(0.55, 'rgba(255,255,255,.18)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
  });
  return _glowTex;
}
let _cloudTex = null;
export function cloudTexture() {
  if (!_cloudTex) _cloudTex = canvasTex(256, 128, (c, w, h) => {
    c.clearRect(0, 0, w, h);
    const blobs = [[90, 74, 58], [150, 60, 66], [190, 80, 48], [120, 88, 52], [60, 90, 34], [210, 96, 32]];
    for (const [x, y, r] of blobs) {
      const g = c.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(0.6, 'rgba(255,255,255,.6)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      c.fillStyle = g; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill();
    }
  });
  return _cloudTex;
}

// ── sky ─────────────────────────────────────────────────────────────────────
export function makeSky(pal, opts = {}) {
  const group = new THREE.Group();
  const uniforms = {
    top: { value: new THREE.Color(pal.skyTop) },
    bottom: { value: new THREE.Color(pal.skyBottom) },
    sun: { value: new THREE.Color(pal.sun) },
    sunDir: { value: new THREE.Vector3(0.4, 0.45, -0.7).normalize() },
    time: { value: 0 },
    stars: { value: opts.stars ? 1 : 0 },
  };
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false, uniforms,
    vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      varying vec3 vDir; uniform vec3 top; uniform vec3 bottom; uniform vec3 sun; uniform vec3 sunDir; uniform float time; uniform float stars;
      float hash(vec3 p){ p = fract(p*0.3183099+.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
      void main(){
        float h = clamp(vDir.y*0.5+0.5, 0.0, 1.0);
        vec3 col = mix(bottom, top, smoothstep(0.42, 0.92, h));
        float sd = max(dot(normalize(vDir), normalize(sunDir)), 0.0);
        col += sun * pow(sd, 220.0) * 1.4;
        col += sun * pow(sd, 8.0) * 0.16;
        if (stars > 0.5) {
          vec3 p = floor(vDir*160.0);
          float s = step(0.9965, hash(p));
          col += vec3(0.85,0.92,1.0) * s * smoothstep(0.05,0.35,vDir.y) * (0.55+0.45*sin(time*1.4+p.x));
        }
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(1500, 24, 14), skyMat);
  dome.frustumCulled = false; group.add(dome);
  group.userData.skyMat = skyMat;
  return group;
}

// ── materials helpers ───────────────────────────────────────────────────────
function lam(color, opts = {}) {
  return new THREE.MeshLambertMaterial({
    color: new THREE.Color(color), flatShading: opts.flat !== false,
    transparent: !!opts.transparent, opacity: opts.opacity ?? 1, side: opts.side ?? THREE.FrontSide,
    emissive: opts.emissive ? new THREE.Color(opts.emissive) : 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 1,
  });
}
const shared = {
  rockGeo: new THREE.DodecahedronGeometry(1, 0),
  coneGeo: new THREE.ConeGeometry(1, 1, 6),
  cylGeo: new THREE.CylinderGeometry(1, 1, 1, 7),
  sphereGeo: new THREE.SphereGeometry(1, 8, 6),
  boxGeo: new THREE.BoxGeometry(1, 1, 1),
  torusGeo: new THREE.TorusGeometry(1, 0.07, 6, 28),
};
Object.values(shared).forEach(g => { g.userData.shared = true; });
function disposeTree(root) {
  const mats = new Set();
  root.traverse(o => {
    if (o.geometry && !o.geometry.userData?.shared) o.geometry.dispose?.();
    if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => mats.add(m));
  });
  mats.forEach(m => m.dispose?.());
}

// ── water ───────────────────────────────────────────────────────────────────
export function makeWater(pal, size = 2400, y = -42) {
  const mat = new THREE.ShaderMaterial({
    transparent: true, fog: false,
    uniforms: {
      time: { value: 0 }, deep: { value: new THREE.Color(pal.water) },
      shallow: { value: new THREE.Color(pal.skyBottom) }, sun: { value: new THREE.Color(pal.sun) },
    },
    vertexShader: `varying vec3 vPos; uniform float time;
      void main(){ vec4 wp = modelMatrix*vec4(position,1.0); vPos = wp.xyz;
        wp.y += sin(wp.x*0.03+time*0.7)*1.4 + cos(wp.z*0.035+time*0.9)*1.2;
        gl_Position = projectionMatrix*viewMatrix*wp; }`,
    fragmentShader: `varying vec3 vPos; uniform float time; uniform vec3 deep; uniform vec3 shallow; uniform vec3 sun;
      void main(){
        float d = length(vPos.xz);
        vec3 col = mix(shallow, deep, smoothstep(30.0, 700.0, d)*0.9);
        float w = sin(vPos.x*0.08+time*0.9)*sin(vPos.z*0.07-time*0.6);
        float sparkle = smoothstep(0.75, 1.0, w)*0.26;
        col += sun*sparkle;
        float foam = smoothstep(0.9,1.0,sin(d*0.06-time*0.8)) * 0.045;
        col += foam;
        gl_FragColor = vec4(col, 0.94);
      }`,
  });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size, 1, 1), mat);
  m.rotation.x = -Math.PI / 2; m.position.y = y;
  m.userData.water = true;
  return m;
}

// ── clouds ──────────────────────────────────────────────────────────────────
export function addClouds(group, palette, count = 14, spread = 700, y = 130) {
  const tex = cloudTexture();
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0.55, color: new THREE.Color(palette.sun).lerp(new THREE.Color('#ffffff'), 0.6), fog: false });
  const clouds = [];
  for (let i = 0; i < count; i++) {
    const s = new THREE.Sprite(mat);
    const ang = Math.random() * Math.PI * 2;
    const r = 120 + Math.random() * spread;
    s.position.set(Math.cos(ang) * r, y + Math.random() * 180 - 40, Math.sin(ang) * r);
    const sc = 60 + Math.random() * 160;
    s.scale.set(sc * 2.2, sc * 0.9, 1);
    s.material = mat;
    s.userData.drift = 1 + Math.random() * 3;
    group.add(s); clouds.push(s);
  }
  return clouds;
}

// ── particle systems ────────────────────────────────────────────────────────
export function makeParticles(kind, palette, count = 220) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const spd = new Float32Array(count);
  const spread = 380;
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * spread * 2;
    pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
    pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 2;
    spd[i] = Math.random();
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const color = kind === 'embers' ? '#ff9a4a' : kind === 'snow' ? '#ffffff' : kind === 'leaves' ? '#a8e06a' : kind === 'motes' ? '#a9f5ff' : '#ffe8a8';
  const size = kind === 'snow' ? 2.2 : kind === 'embers' ? 1.7 : 1.4;
  const mat = new THREE.PointsMaterial({
    color: new THREE.Color(color), size, map: glowTexture(), transparent: true,
    opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true, fog: false,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  points.userData = { kind, spd, spread };
  return points;
}

export function updateParticles(points, dt, center) {
  if (!points) return;
  const arr = points.geometry.attributes.position.array;
  const { kind, spd, spread } = points.userData;
  const n = arr.length / 3;
  for (let i = 0; i < n; i++) {
    const j = i * 3;
    if (kind === 'snow') {
      arr[j] += Math.sin(arr[j + 1] * 0.05 + performance.now() * 0.0002) * dt * 4;
      arr[j + 1] -= dt * (8 + spd[i] * 10);
    } else if (kind === 'embers') {
      arr[j + 1] += dt * (6 + spd[i] * 14);
      arr[j] += Math.sin(arr[j + 1] * 0.1 + i) * dt * 6;
    } else if (kind === 'leaves') {
      arr[j + 1] -= dt * (3 + spd[i] * 4);
      arr[j] += dt * Math.sin(performance.now() * 0.0006 + i) * 5;
    } else {
      arr[j + 1] += Math.sin(performance.now() * 0.0004 + i) * dt * 3;
      arr[j] += Math.cos(performance.now() * 0.0003 + i) * dt * 3;
    }
    // wrap around player
    const dx = arr[j] - center.x, dy = arr[j + 1] - center.y, dz = arr[j + 2] - center.z;
    if (kind === 'snow' && dy < -140) arr[j + 1] = center.y + 140;
    else if (kind === 'embers' && dy > 120) arr[j + 1] = center.y - 110;
    else if ((kind === 'leaves' || kind === 'motes') && dy < -100) arr[j + 1] = center.y + 90;
    if (dx > spread) arr[j] -= spread * 2; else if (dx < -spread) arr[j] += spread * 2;
    if (dz > spread) arr[j + 2] -= spread * 2; else if (dz < -spread) arr[j + 2] += spread * 2;
  }
  points.geometry.attributes.position.needsUpdate = true;
}

// ── island ──────────────────────────────────────────────────────────────────
export function makeIsland(pal, r, opts = {}) {
  const { seed = 1, biome = 'viking', trees = 1, houses = 0, ruins = 0 } = opts;
  const R = rng(seed);
  const g = new THREE.Group();
  const topMat = lam(pal.ground, { emissive: pal.ground, emissiveIntensity: 0.02 });
  const rockMat = lam(pal.rock);
  const rock2Mat = lam(pal.rock2);
  const snow = biome === 'snow';
  const volcano = biome === 'volcano';
  const jungle = biome === 'jungle';
  const isRuin = biome === 'ruins';

  const depth = r * (0.9 + R() * 0.7);
  // cap
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.94, r * 0.13, 9, 1), topMat);
  cap.position.y = 0; g.add(cap);
  // grassy dome
  const dome = new THREE.Mesh(shared.sphereGeo, topMat);
  dome.scale.set(r * 0.99, r * 0.13, r * 0.99); dome.position.y = r * 0.02; g.add(dome);
  // cliff body
  const bodyGeo = new THREE.CylinderGeometry(r * 0.94, r * (0.35 + R() * 0.2), depth, 9, 2);
  const body = new THREE.Mesh(bodyGeo, rockMat); body.position.y = -depth / 2; g.add(body);
  // hanging rock cones
  const under = new THREE.Mesh(new THREE.ConeGeometry(r * (0.35 + R() * 0.15), depth * (0.7 + R() * 0.6), 6), rock2Mat);
  under.position.y = -depth - depth * 0.2; under.rotation.x = Math.PI; g.add(under);
  // rock shelves
  for (let i = 0; i < 5; i++) {
    const a = R() * Math.PI * 2, rr = r * (0.45 + R() * 0.4);
    const sh = new THREE.Mesh(shared.rockGeo, i % 2 ? rockMat : rock2Mat);
    sh.position.set(Math.cos(a) * rr, -depth * (0.1 + R() * 0.5), Math.sin(a) * rr);
    sh.scale.set(r * 0.16, r * 0.14, r * 0.2); sh.rotation.set(R() * 3, R() * 3, R() * 3);
    g.add(sh);
  }
  if (snow) {
    const capSnow = new THREE.Mesh(new THREE.SphereGeometry(r * 0.95, 9, 5, 0, Math.PI * 2, 0, Math.PI / 2.4), lam('#f2f9ff'));
    capSnow.scale.y = 0.18; capSnow.position.y = r * 0.015; g.add(capSnow);
    for (let i = 0; i < 4; i++) {
      const a = R() * 6.28, rr = r * (0.3 + R() * 0.5);
      const ice = new THREE.Mesh(new THREE.ConeGeometry(r * 0.1, r * (0.3 + R() * 0.5), 5), lam('#c9ecff', { emissive: '#7fd8ff', emissiveIntensity: 0.12 }));
      ice.position.set(Math.cos(a) * rr, r * 0.08, Math.sin(a) * rr); g.add(ice);
    }
  }
  if (volcano) {
    const crater = new THREE.Mesh(new THREE.ConeGeometry(r * 0.4, r * 0.5, 7), rock2Mat);
    crater.position.y = r * 0.18; g.add(crater);
    const lava = new THREE.Mesh(new THREE.CircleGeometry(r * 0.2, 7), lam('#ff7a3d', { emissive: '#ff5a1f', emissiveIntensity: 1.1 }));
    lava.rotation.x = -Math.PI / 2; lava.position.y = r * 0.4; g.add(lava);
    const lavaGlow = new THREE.PointLight('#ff6a2a', 3, r * 2.2); lavaGlow.position.y = r * 0.5; g.add(lavaGlow);
    for (let i = 0; i < 3; i++) {
      const a = R() * 6.28;
      const stream = new THREE.Mesh(new THREE.PlaneGeometry(r * 0.06, r * 0.6), lam('#ff8a3d', { emissive: '#ff5a1a', emissiveIntensity: 1, side: THREE.DoubleSide }));
      stream.position.set(Math.cos(a) * r * 0.28, r * 0.02, Math.sin(a) * r * 0.28);
      stream.rotation.set(-Math.PI / 2, 0, a); g.add(stream);
    }
  }

  // trees
  if (trees > 0) {
    const n = Math.round(trees * (jungle ? 15 : 8));
    const trunkGeo = new THREE.CylinderGeometry(0.22, 0.3, 2.2, 5);
    const trunkMat = lam(jungle ? '#6b4a32' : '#6a4b34');
    const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, n);
    const folMat = lam(jungle ? pal.foliage : pal.foliage2);
    const foliage = new THREE.InstancedMesh(jungle ? new THREE.ConeGeometry(1.6, 3.6, 6) : new THREE.ConeGeometry(1.5, 4.2, 6), folMat, n);
    const foliage2 = new THREE.InstancedMesh(new THREE.ConeGeometry(1.05, 2.6, 6), lam(pal.foliage), n);
    const d = new THREE.Object3D();
    for (let i = 0; i < n; i++) {
      const a = R() * 6.28, rr = Math.sqrt(R()) * r * 0.82;
      const x = Math.cos(a) * rr, z = Math.sin(a) * rr, y = r * 0.07 + domeTop(rr, r);
      const s = 0.7 + R() * 1.2;
      d.position.set(x, y + 1.1 * s, z); d.scale.set(s, s, s); d.rotation.y = R() * 6.28; d.updateMatrix();
      trunks.setMatrixAt(i, d.matrix);
      d.position.y = y + 3.1 * s; d.scale.set(s, s * (jungle ? 1.2 : 1), s); d.updateMatrix();
      foliage.setMatrixAt(i, d.matrix);
      d.position.y = y + 4.6 * s; d.scale.set(s * 0.72, s * 0.8, s * 0.72); d.updateMatrix();
      foliage2.setMatrixAt(i, d.matrix);
    }
    g.add(trunks, foliage, foliage2);
  }
  // rocks
  const rockN = Math.round(6 + R() * 8);
  const rocks = new THREE.InstancedMesh(shared.rockGeo, rockMat, rockN);
  const d = new THREE.Object3D();
  for (let i = 0; i < rockN; i++) {
    const a = R() * 6.28, rr = Math.sqrt(R()) * r * 0.85;
    const s = 0.8 + R() * 2.4;
    d.position.set(Math.cos(a) * rr, r * 0.08 + s * 0.45, Math.sin(a) * rr);
    d.scale.set(s * (0.8 + R()), s * 0.7, s); d.rotation.set(R() * 3, R() * 3, R() * 3); d.updateMatrix();
    rocks.setMatrixAt(i, d.matrix);
  }
  g.add(rocks);

  if (houses > 0) addVillageHouses(g, pal, houses, r, R, 0);
  if (ruins > 0) addRuins(g, pal, ruins, r, R);
  if (isRuin) {
    // glowing rune circle
    const ring = new THREE.Mesh(new THREE.RingGeometry(r * 0.3, r * 0.34, 24), new THREE.MeshBasicMaterial({ color: pal.accent, transparent: true, opacity: 0.35, side: THREE.DoubleSide, toneMapped: false }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = r * 0.09; g.add(ring);
  }
  g.userData.radius = r;
  return g;
}
function domeTop(rr, r) { return Math.sqrt(Math.max(0, 1 - (rr / (r * 0.99)) ** 2)) * r * 0.13; }

// ── village houses ──────────────────────────────────────────────────────────
export function addVillageHouses(group, pal, count, radius, R, yBase = 0) {
  const wall = lam('#c9a87a'), roof = lam('#7b3d33'), roof2 = lam('#4c6690');
  const doorM = lam('#4a3021'), trim = lam(pal.accent);
  for (let i = 0; i < count; i++) {
    const a = R() * Math.PI * 2, rr = radius * (0.35 + R() * 0.48);
    const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
    const s = 0.9 + R() * 0.9;
    const house = new THREE.Group();
    house.position.set(x, yBase + (radius ? domeTop(rr, radius) : 0), z);
    house.rotation.y = R() * Math.PI * 2;
    const b = new THREE.Mesh(shared.boxGeo, wall); b.scale.set(4 * s, 3.2 * s, 3.4 * s); b.position.y = 1.6 * s; house.add(b);
    const r1 = new THREE.Mesh(new THREE.ConeGeometry(3.4 * s, 2.4 * s, 4), i % 2 ? roof : roof2);
    r1.rotation.y = Math.PI / 4; r1.position.y = 4.3 * s; house.add(r1);
    const door = new THREE.Mesh(shared.boxGeo, doorM); door.scale.set(0.9 * s, 1.9 * s, 0.2); door.position.set(0, 1 * s, 1.75 * s); house.add(door);
    const trimM = new THREE.Mesh(shared.boxGeo, trim); trimM.scale.set(4.05 * s, 0.18, 3.45 * s); trimM.position.y = 3.05 * s; house.add(trimM);
    const shield = new THREE.Mesh(new THREE.CylinderGeometry(0.6 * s, 0.6 * s, 0.12, 8), i % 2 ? lam('#b23b3b') : lam('#3f6c9a'));
    shield.rotation.x = Math.PI / 2; shield.position.set(-1.2 * s, 2.2 * s, 1.78 * s); house.add(shield);
    // chimney smoke
    const smoke = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), color: '#e8e0d4', transparent: true, opacity: 0.18, depthWrite: false }));
    smoke.position.set(1 * s, 5.6 * s, 0); smoke.scale.set(2.2, 2.2, 1); house.add(smoke);
    house.userData.smoke = smoke;
    group.add(house);
  }
}

export function addRuins(group, pal, count, radius, R) {
  const stone = lam(pal.rock), stone2 = lam(pal.rock2);
  const glow = new THREE.MeshBasicMaterial({ color: pal.accent, transparent: true, opacity: 0.7, toneMapped: false });
  for (let i = 0; i < count; i++) {
    const a = R() * Math.PI * 2, rr = radius * (0.3 + R() * 0.55);
    const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
    const g = new THREE.Group();
    g.position.set(x, domeTop(rr, radius), z); g.rotation.y = R() * 6.28;
    const s = 0.8 + R() * 1.1;
    if (R() > 0.45) {
      for (let k = 0; k < 4; k++) {
        const ang = Math.PI / 2 * k;
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.5 * s, 0.65 * s, 7 * s, 6), stone);
        col.position.set(Math.cos(ang) * 2.4 * s, 3.5 * s, Math.sin(ang) * 2.4 * s);
        if (R() > 0.5) col.scale.y = 0.6 + R() * 0.5;
        g.add(col);
      }
      const top = new THREE.Mesh(shared.boxGeo, stone2); top.scale.set(6.4 * s, 0.7 * s, 6.4 * s); top.position.y = 7.1 * s; g.add(top);
      const orb = new THREE.Mesh(shared.sphereGeo, glow); orb.scale.setScalar(0.7 * s); orb.position.y = 4.4 * s; g.add(orb);
      g.userData.orb = orb;
    } else {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.6 * s, 0.8 * s, 5 * s, 6), i % 2 ? stone : stone2);
      p.position.y = 2.5 * s; p.rotation.z = (R() - 0.5) * 0.4; g.add(p);
      g.add(new THREE.Mesh(new THREE.BoxGeometry(2.6 * s, 0.6 * s, 0.8 * s), stone2));
    }
    group.add(g);
  }
}

// ── waterfall ───────────────────────────────────────────────────────────────
export function makeWaterfall(pal, w = 16, h = 70) {
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, fog: false,
    uniforms: { time: { value: 0 }, col: { value: new THREE.Color('#bfeaff') }, col2: { value: new THREE.Color(pal.water) } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `varying vec2 vUv; uniform float time; uniform vec3 col; uniform vec3 col2;
      void main(){
        float streak = sin(vUv.x*40.0 + sin(vUv.y*8.0)*1.6)*0.5+0.5;
        float flow = fract(vUv.y*2.2 - time*0.7);
        float alpha = (0.3 + streak*0.45) * smoothstep(0.0,0.12,vUv.y) * (0.6+0.4*flow);
        vec3 c = mix(col2, col, streak*0.8+0.2);
        gl_FragColor = vec4(c, alpha*0.85);
      }`,
  });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h, 1, 6), mat);
  m.userData.waterfall = true;
  const splash = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), color: '#dffaff', transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending }));
  splash.scale.set(w * 1.6, w * 0.8, 1); splash.position.y = -h / 2;
  m.add(splash);
  m.userData.splash = splash;
  return m;
}

// ── flags / torches ─────────────────────────────────────────────────────────
function makeBanner(pal, h = 7) {
  const g = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, h, 5), lam('#6a4b34'));
  pole.position.y = h / 2; g.add(pole);
  const flag = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.2, 4, 2), lam(pal.accent, { side: THREE.DoubleSide }));
  flag.position.set(1.6, h - 1.6, 0); flag.rotation.y = Math.PI / 2;
  g.add(flag);
  g.userData.flag = flag;
  return g;
}
function makeTorch() {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.2, 2.4, 5), lam('#4c3a2a')));
  const flame = new THREE.Mesh(new THREE.SphereGeometry(0.36, 6, 4), new THREE.MeshBasicMaterial({ color: '#ffb44a', toneMapped: false }));
  flame.position.y = 1.35; flame.scale.y = 1.6; g.add(flame);
  g.userData.flame = flame;
  return g;
}

// ── race gate ───────────────────────────────────────────────────────────────
export function makeGate(radius, isCheckpoint, pal) {
  const g = new THREE.Group();
  const color = isCheckpoint ? '#ffd166' : pal.accent;
  const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, toneMapped: false });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, radius * 0.055, 6, 26), ringMat);
  g.add(ring);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(radius * 1.08, radius * 0.014, 4, 26), ringMat);
  g.add(ring2);
  const discMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.055, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
  const disc = new THREE.Mesh(new THREE.CircleGeometry(radius * 0.94, 24), discMat);
  g.add(disc);
  // markers
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 4 + i * Math.PI / 2;
    const m = new THREE.Mesh(new THREE.OctahedronGeometry(radius * 0.1, 0), ringMat);
    m.position.set(Math.cos(a) * radius * 1.04, Math.sin(a) * radius * 1.04, 0);
    g.add(m);
  }
  g.userData.ring = ring; g.userData.ring2 = ring2; g.userData.disc = disc; g.userData.baseColor = color;
  return g;
}
export function setGateActive(gate, active, passed) {
  const ring = gate.userData.ring;
  const c = active ? '#7dffcf' : passed ? '#5c7f8c' : gate.userData.baseColor;
  gate.userData.ring.material.color.set(c);
  gate.userData.ring2.material.color.set(c);
  gate.userData.disc.material.color.set(c);
  gate.userData.ring.material.opacity = active ? 1 : passed ? 0.25 : 0.72;
  gate.userData.disc.material.opacity = active ? 0.12 : 0.03;
  gate.userData.active = active;
}

// ── first gate arch (start/finish) ──────────────────────────────────────────
function makeStartArch(pal, radius) {
  const g = new THREE.Group();
  const stone = lam(pal.rock), gold = lam(pal.accent);
  for (const sd of [-1, 1]) {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.6, radius * 2.1, 6), stone);
    p.position.set(sd * radius * 1.1, radius, 0); g.add(p);
    const cap = new THREE.Mesh(new THREE.ConeGeometry(1.5, 2.6, 6), gold);
    cap.position.set(sd * radius * 1.1, radius * 2.1 + 1, 0); g.add(cap);
    const banner = makeBanner(pal, radius * 1.7);
    banner.position.set(sd * radius * 1.1, radius * 0.4, 0.4);
    banner.scale.setScalar(1.1);
    g.add(banner);
  }
  const beam = new THREE.Mesh(new THREE.BoxGeometry(radius * 2.4, 1.2, 1.2), stone);
  beam.position.y = radius * 2.1; g.add(beam);
  const flag = new THREE.Mesh(new THREE.PlaneGeometry(radius * 0.8, radius * 0.5), lam(pal.accent, { side: THREE.DoubleSide }));
  flag.position.set(0, radius * 1.9, 0); g.add(flag);
  g.userData.flag = flag;
  return g;
}

// ── course generation ──────────────────────────────────────────────────────
export function makeCourse(trackDef) {
  const R = rng(hash(trackDef.id + 'course'));
  const points = [];
  const rings = 11;
  const baseR = 250 + trackDef.difficulty * 14;
  for (let i = 0; i < rings; i++) {
    const a = (i / rings) * Math.PI * 2;
    const rad = baseR * (0.7 + R() * 0.5);
    const y = 34 + Math.sin(i * 1.35) * 24 + R() * 16;
    points.push(new THREE.Vector3(Math.cos(a) * rad, y, Math.sin(a) * rad));
  }
  const curve = new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0.5);
  const length = curve.getLength();
  const gateCount = 20;
  const gates = [];
  for (let i = 0; i < gateCount; i++) {
    const t = i / gateCount;
    const p = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);
    const isCheckpoint = i % 5 === 0;
    gates.push({ t, pos: p, tangent, radius: 11 + (i % 3), checkpoint: isCheckpoint, index: i });
  }
  return { curve, length, gates };
}

// ── build a full race world ─────────────────────────────────────────────────
export function buildRaceWorld(trackId, quality = 'high') {
  const track = TRACK_MAP[trackId] || TRACK_MAP.hearthfall;
  const pal = track.palette;
  const R = rng(hash(trackId));
  const group = new THREE.Group();
  const anim = { flags: [], waterfalls: [], orbs: [], clouds: [], particles: [], torches: [], smoke: [] };
  const course = makeCourse(track);

  group.add(makeSky(pal, { stars: ['aether', 'ruins'].includes(track.biome) }));
  const water = makeWater(pal, 3000, -52);
  if (!['volcano', 'aether'].includes(track.biome)) group.add(water);
  const clouds = addClouds(group, pal, quality === 'low' ? 7 : 16, 400, 110);
  anim.clouds = clouds;

  // islands along course
  const islandCount = quality === 'low' ? 8 : 12;
  for (let i = 0; i < islandCount; i++) {
    const t = i / islandCount;
    const p = course.curve.getPointAt((t + 0.03) % 1);
    const off = 70 + R() * 150;
    const side = i % 2 ? 1 : -1;
    const rad = 32 + R() * 50;
    const island = makeIsland(pal, rad, {
      seed: hash(trackId + i), biome: track.biome,
      trees: rad > 38 ? 1 : 0.5, houses: track.biome === 'viking' && i % 3 === 0 ? 3 : 0,
      ruins: track.biome === 'ruins' && i % 2 === 0 ? 2 : 0,
    });
    island.position.set(p.x + side * off, p.y - 26 - R() * 45, p.z + (R() - 0.5) * 70);
    group.add(island);
    // waterfall off some islands
    if (i % 3 === 0 && !['volcano', 'aether'].includes(track.biome)) {
      const wf = makeWaterfall(pal, 12 + R() * 14, 45 + R() * 40);
      wf.position.copy(island.position); wf.position.x += rad * 0.7; wf.position.y -= 15;
      wf.rotation.y = R() * 6.28;
      group.add(wf); anim.waterfalls.push(wf);
    }
    // banner poles
    if (i % 2 === 0) {
      const bn = makeBanner(pal, 8 + R() * 5);
      bn.position.copy(island.position); bn.position.y += 6;
      bn.position.x += (R() - 0.5) * rad * 0.8; bn.position.z += (R() - 0.5) * rad * 0.8;
      group.add(bn); anim.flags.push(bn);
    }
  }

  // distant floating rocks & rock arches
  for (let i = 0; i < (quality === 'low' ? 6 : 14); i++) {
    const t = R();
    const p = course.curve.getPointAt(t);
    const arch = new THREE.Group();
    const sm = lam(pal.rock2);
    const side = R() > 0.5 ? 1 : -1;
    arch.position.set(p.x + side * (25 + R() * 40), p.y + (R() - 0.5) * 22, p.z + (R() - 0.5) * 40);
    const rock = new THREE.Mesh(shared.rockGeo, sm);
    rock.scale.set(6 + R() * 12, 4 + R() * 9, 6 + R() * 10); arch.add(rock);
    if (i % 2) {
      const archRing = new THREE.Mesh(new THREE.TorusGeometry(15 + R() * 8, 2.2, 5, 12, Math.PI), sm);
      archRing.position.y = 6; archRing.rotation.z = R() * 3; arch.add(archRing);
    }
    group.add(arch);
  }

  // gates
  const gateMeshes = [];
  course.gates.forEach(g => {
    const gm = makeGate(g.radius, g.checkpoint, pal);
    gm.position.copy(g.pos);
    gm.lookAt(g.pos.clone().add(g.tangent));
    group.add(gm);
    gateMeshes.push(gm);
  });
  // start arch
  const g0 = course.gates[0];
  const arch = makeStartArch(pal, g0.radius * 1.2);
  arch.position.copy(g0.pos); arch.lookAt(g0.pos.clone().add(g0.tangent));
  group.add(arch); anim.flags.push(arch);

  // obstacles: floating rocks near course
  const obstacles = [];
  for (let i = 0; i < 12; i++) {
    const t = 0.04 + (i / 12) * 0.92 + R() * 0.03;
    const p = course.curve.getPointAt(t % 1);
    const tangent = course.curve.getTangentAt(t % 1);
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const off = (R() > 0.5 ? 1 : -1) * (14 + R() * 14);
    const pos = p.clone().addScaledVector(side, off).add(new THREE.Vector3(0, (R() - 0.5) * 10, 0));
    const rad = 2.4 + R() * 2.6;
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(rad, 0), lam(pal.rock2));
    rock.position.copy(pos); rock.rotation.set(R() * 3, R() * 3, R() * 3);
    group.add(rock);
    const spikes = new THREE.Group();
    for (let k = 0; k < 4; k++) {
      const sp = new THREE.Mesh(new THREE.ConeGeometry(rad * 0.25, rad * 1.1, 5), lam(pal.rock));
      const a = (k / 4) * 6.28;
      sp.position.set(Math.cos(a) * rad * 0.8, Math.sin(a) * rad * 0.8, 0);
      sp.rotation.z = -a + Math.PI / 2; spikes.add(sp);
    }
    rock.add(spikes);
    obstacles.push({ mesh: rock, pos, radius: rad * 1.25 });
  }

  // biome props around start
  if (track.biome === 'volcano') {
    for (let i = 0; i < 3; i++) {
      const torch = makeTorch(); torch.scale.setScalar(2.2);
      const p = course.gates[0].pos.clone(); p.x += (i - 1) * 20; p.y -= 8; p.z += 20;
      torch.position.copy(p); group.add(torch); anim.torches.push(torch);
    }
  }

  const particles = makeParticles(
    track.biome === 'snow' ? 'snow' : track.biome === 'volcano' ? 'embers' : track.biome === 'jungle' ? 'leaves' : track.biome === 'aether' || track.biome === 'ruins' ? 'motes' : 'pollen',
    pal, quality === 'low' ? 120 : 240
  );
  group.add(particles); anim.particles.push(particles);

  // distant silhouettes
  const backdrop = new THREE.Group();
  for (let i = 0; i < 10; i++) {
    const a = R() * 6.28, r = 500 + R() * 400;
    const m = new THREE.Mesh(new THREE.ConeGeometry(30 + R() * 60, 60 + R() * 110, 5), lam(pal.rock2));
    m.position.set(Math.cos(a) * r, -30 + R() * 30, Math.sin(a) * r);
    m.rotation.y = R() * 3; backdrop.add(m);
  }
  group.add(backdrop);

  let time = 0;
  function update(dt, center) {
    time += dt;
    group.userData.skyMat?.uniforms.time && (group.userData.skyMat.uniforms.time.value = time);
    if (water) { water.material.uniforms.time.value = time; }
    anim.waterfalls.forEach(w => { w.material.uniforms.time.value = time; });
    anim.flags.forEach(f => { if (f.userData.flag) f.userData.flag.rotation.y = Math.PI / 2 + Math.sin(time * 2 + f.position.x) * 0.15; });
    anim.torches.forEach(t => { if (t.userData.flame) t.userData.flame.scale.y = 1.6 + Math.sin(time * 9 + t.position.x) * 0.25; });
    clouds.forEach(c => { c.position.x += c.userData.drift * dt * 2; if (c.position.x > 900) c.position.x = -900; });
    gateMeshes.forEach((gm, i) => {
      if (gm.userData.active) {
        const s = 1 + Math.sin(time * 4) * 0.025;
        gm.scale.setScalar(s);
        gm.rotation.z += dt * 0.15;
      }
      const st = gm.children[0]; if (st) st.rotation.z += dt * (gm.userData.active ? 0.5 : 0.1);
    });
    if (center) updateParticles(particles, dt, center);
  }
  function dispose() { disposeTree(group); }
  // set first gate active
  setGateActive(gateMeshes[0], true, false);
  return { group, curve: course.curve, length: course.length, gates: course.gates, gateMeshes, obstacles, anim, update, dispose, track, palette: pal };
}

// ── exploration world ──────────────────────────────────────────────────────
export function buildExploreWorld(zoneId, saved = { orbs: [], hidden: false }, quality = 'high') {
  const zone = EXPLORE_ZONES.find(z => z.id === zoneId) || EXPLORE_ZONES[0];
  const track = TRACK_MAP[zoneId] || TRACK_MAP.hearthfall;
  const pal = track.palette;
  const R = rng(hash(zoneId + 'explore'));
  const group = new THREE.Group();
  const anim = { waterfalls: [], clouds: [], particles: [], orbs: [], flags: [] };
  group.add(makeSky(pal, { stars: ['ruins', 'aether'].includes(zone.biome) }));
  if (!['volcano'].includes(zone.biome)) group.add(makeWater(pal, 3400, -60));
  const clouds = addClouds(group, pal, quality === 'low' ? 8 : 20, 600, 140); anim.clouds = clouds;

  // central large island (spawn)
  const main = makeIsland(pal, 88, { seed: hash(zoneId + 'main'), biome: zone.biome, trees: 1.4, houses: zone.biome === 'viking' ? 5 : 0, ruins: zone.biome === 'ruins' ? 4 : 0 });
  main.position.set(0, 0, 0);
  group.add(main);
  // ring of islands
  const islandSpots = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + R() * 0.4;
    const dist = 190 + R() * 260;
    const rad = 26 + R() * 44;
    const isl = makeIsland(pal, rad, { seed: hash(zoneId + 'i' + i), biome: zone.biome, trees: 1, houses: zone.biome === 'viking' && i % 2 ? 2 : 0, ruins: zone.biome === 'ruins' ? 2 : 0 });
    isl.position.set(Math.cos(a) * dist, (R() - 0.4) * 80, Math.sin(a) * dist);
    group.add(isl);
    if (i % 2 === 0) {
      const wf = makeWaterfall(pal, 10 + R() * 10, 40 + R() * 30);
      wf.position.copy(isl.position); wf.position.y -= 12; wf.position.x += rad * 0.65; wf.rotation.y = R() * 6.28;
      group.add(wf); anim.waterfalls.push(wf);
    }
    islandSpots.push(isl.position.clone());
  }
  // floating rocks in sky
  for (let i = 0; i < 16; i++) {
    const a = R() * 6.28, r = 140 + R() * 480;
    const rock = new THREE.Mesh(shared.rockGeo, lam(pal.rock2));
    rock.position.set(Math.cos(a) * r, -30 + R() * 150, Math.sin(a) * r);
    rock.scale.set(6 + R() * 16, 4 + R() * 14, 6 + R() * 14);
    rock.rotation.set(R() * 3, R() * 3, R() * 3);
    group.add(rock);
  }
  // sky shards
  const orbPositions = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + 0.3;
    const r = 90 + i * 24 + R() * 30;
    const y = 20 + R() * 80;
    const pos = new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r);
    orbPositions.push(pos);
    if (saved.orbs.includes(i)) continue;
    const og = new THREE.Group();
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(1.8, 0), new THREE.MeshBasicMaterial({ color: '#7df7ff', toneMapped: false }));
    og.add(core);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), color: '#7df7ff', transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false }));
    halo.scale.setScalar(12); og.add(halo);
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 1.2, 60, 5, 1, true), new THREE.MeshBasicMaterial({ color: '#7df7ff', transparent: true, opacity: 0.09, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }));
    beam.position.y = 30; og.add(beam);
    og.position.copy(pos);
    og.userData = { orbIndex: i, base: pos.clone(), phase: R() * 6.28 };
    group.add(og); anim.orbs.push(og);
  }
  // hidden dragon lair
  const lairPos = islandSpots[4] || new THREE.Vector3(200, 10, 100);
  const lair = new THREE.Group();
  const lairGlow = new THREE.PointLight(pal.accent, 6, 70); lair.add(lairGlow);
  const eggMat = new THREE.MeshStandardMaterial({ color: pal.accent, emissive: pal.accent, emissiveIntensity: 0.55, roughness: 0.35, flatShading: true });
  const egg = new THREE.Mesh(new THREE.SphereGeometry(3.2, 10, 8), eggMat);
  egg.scale.set(1, 1.4, 1); egg.position.y = 4; lair.add(egg);
  for (let i = 0; i < 5; i++) {
    const shard = new THREE.Mesh(new THREE.ConeGeometry(0.7, 3 + R() * 3, 5), new THREE.MeshBasicMaterial({ color: pal.accent, transparent: true, opacity: 0.6, toneMapped: false }));
    const a = (i / 5) * 6.28;
    shard.position.set(Math.cos(a) * 5, 2, Math.sin(a) * 5); lair.add(shard);
  }
  const lairHalo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), color: pal.accent, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false }));
  lairHalo.scale.setScalar(42); lairHalo.position.y = 3; lair.add(lairHalo);
  lair.position.copy(lairPos).add(new THREE.Vector3(0, 16, 0));
  lair.visible = !saved.hidden;
  group.add(lair);
  anim.lair = lair;

  const particles = makeParticles(zone.biome === 'snow' ? 'snow' : zone.biome === 'volcano' ? 'embers' : zone.biome === 'jungle' ? 'leaves' : 'motes', pal, quality === 'low' ? 140 : 260);
  group.add(particles); anim.particles.push(particles);

  // distant islands
  for (let i = 0; i < 9; i++) {
    const a = R() * 6.28, r = 560 + R() * 360;
    const m = new THREE.Mesh(new THREE.ConeGeometry(40 + R() * 60, 50 + R() * 90, 6), lam(pal.rock2));
    m.position.set(Math.cos(a) * r, -40 + R() * 40, Math.sin(a) * r);
    group.add(m);
  }

  let time = 0;
  function update(dt, center) {
    time += dt;
    anim.waterfalls.forEach(w => { w.material.uniforms.time.value = time; });
    clouds.forEach(c => { c.position.x += c.userData.drift * dt * 1.4; if (c.position.x > 900) c.position.x = -900; });
    anim.orbs.forEach((o, i) => {
      o.position.y = o.userData.base.y + Math.sin(time * 1.6 + o.userData.phase) * 3;
      o.rotation.y += dt * 1.2;
      o.rotation.x += dt * 0.4;
    });
    egg.rotation.y += dt * 0.3;
    lairHalo.material.opacity = 0.32 + Math.sin(time * 2) * 0.1;
    if (center) updateParticles(particles, dt, center);
  }
  function dispose() { disposeTree(group); }
  return { group, update, dispose, orbs: anim.orbs, orbPositions, lair, zone, palette: pal, spawn: new THREE.Vector3(0, 42, 120) };
}

// ── menu backdrop ──────────────────────────────────────────────────────────
export function buildMenuWorld(quality = 'high') {
  const pal = TRACK_MAP.hearthfall.palette;
  const group = new THREE.Group();
  const anim = { waterfalls: [], clouds: [], particles: [], flags: [] };
  group.add(makeSky(pal, {}));
  group.add(makeWater(pal, 2600, -46));
  const clouds = addClouds(group, pal, quality === 'low' ? 8 : 18, 500, 100); anim.clouds = clouds;

  const main = makeIsland(pal, 104, { seed: 77, biome: 'viking', trees: 1.5, houses: 6 });
  main.position.set(0, 6, 0); group.add(main);
  // village hall
  const hall = new THREE.Group();
  const hallBody = new THREE.Mesh(new THREE.BoxGeometry(16, 10, 12), lam('#c9a87a'));
  hallBody.position.y = 5; hall.add(hallBody);
  const hallRoof = new THREE.Mesh(new THREE.ConeGeometry(13, 10, 4), lam('#6f3a31'));
  hallRoof.position.y = 14.5; hallRoof.rotation.y = Math.PI / 4; hall.add(hallRoof);
  const goldTrim = new THREE.Mesh(new THREE.BoxGeometry(16.3, 0.5, 12.3), lam(pal.accent));
  goldTrim.position.y = 10; hall.add(goldTrim);
  hall.position.set(-2, 18, -8); hall.rotation.y = 0.4; group.add(hall);
  // dragon perch spire
  const spire = new THREE.Mesh(new THREE.ConeGeometry(7, 36, 6), lam(pal.rock));
  spire.position.set(34, 20, -18); group.add(spire);

  for (let i = 0; i < 4; i++) {
    const wf = makeWaterfall(pal, 12 + i * 3, 60 + i * 8);
    const a = i / 4 * Math.PI * 2 + 0.6;
    wf.position.set(Math.cos(a) * 98, 0, Math.sin(a) * 98);
    wf.rotation.y = -a + Math.PI / 2;
    group.add(wf); anim.waterfalls.push(wf);
  }
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const isl = makeIsland(pal, 20 + i * 5, { seed: 100 + i, biome: 'viking', trees: 0.8 });
    isl.position.set(Math.cos(a) * (220 + i * 30), -10 + i * 16, Math.sin(a) * (220 + i * 30));
    group.add(isl);
  }
  const bn = makeBanner(pal, 14); bn.position.set(12, 22, 26); group.add(bn); anim.flags.push(bn);
  const bn2 = makeBanner(pal, 11); bn2.position.set(-26, 20, 22); group.add(bn2); anim.flags.push(bn2);

  const particles = makeParticles('pollen', pal, quality === 'low' ? 100 : 180);
  group.add(particles); anim.particles.push(particles);

  let time = 0;
  function update(dt, center) {
    time += dt;
    anim.waterfalls.forEach(w => { w.material.uniforms.time.value = time; });
    anim.flags.forEach(f => { if (f.userData.flag) f.userData.flag.rotation.y = Math.PI / 2 + Math.sin(time * 2 + f.position.x) * 0.18; });
    clouds.forEach(c => { c.position.x += c.userData.drift * dt; if (c.position.x > 900) c.position.x = -900; });
    if (center) updateParticles(particles, dt, center);
  }
  function dispose() { disposeTree(group); }
  return { group, update, dispose, palette: pal };
}

// ── dragon sanctuary (the hangar) ───────────────────────────────────────────
export function buildDragonSanctuary(trackId = 'hearthfall', quality = 'high') {
  const pal = (TRACK_MAP[trackId] || TRACK_MAP.hearthfall).palette;
  const group = new THREE.Group();
  const anim = { waterfalls: [], clouds: [], flags: [], torches: [], lanterns: [], glows: [], embers: null, fireflies: null, pools: [] };
  group.add(makeSky(pal, {}));
  const light = quality !== 'high';
  anim.clouds = addClouds(group, pal, light ? 8 : 12, 360, 90);

  // materials shared across the sanctuary
  const rock = lam(pal.rock), rock2 = lam(pal.rock2), grass = lam('#6f964f');
  const grass2 = lam('#527a3c'), wood = lam('#8a6240'), darkWood = lam('#5b3f2c');
  const stone = lam('#928c7c'), stone2 = lam('#6f6a5e'), straw = lam('#c8a86a');
  const gold = lam(pal.accent), snow = lam('#eef7ff');
  const glowCol = (c, o = 0.8) => {
    const m = new THREE.MeshBasicMaterial({ color: new THREE.Color(c), transparent: o < 1, opacity: o, toneMapped: false });
    m.userData.baseOpacity = o;
    return m;
  };

  const add = (m) => { group.add(m); return m; };
  const box = (w, h, d, mat, x = 0, y = 0, z = 0, ry = 0, parent = group) => {
    const m = new THREE.Mesh(shared.boxGeo, mat); m.scale.set(w, h, d);
    m.position.set(x, y, z); m.rotation.y = ry; parent.add(m); return m;
  };
  const cyl = (rt, rb, h, seg, mat, x = 0, y = 0, z = 0, parent = group) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
    m.position.set(x, y, z); parent.add(m); return m;
  };
  const cone = (r, h, seg, mat, x = 0, y = 0, z = 0, parent = group) => {
    const m = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg), mat);
    m.position.set(x, y, z); parent.add(m); return m;
  };
  const rockMesh = (s, mat, x, y, z, parent = group) => {
    const m = new THREE.Mesh(shared.rockGeo, mat); m.position.set(x, y, z);
    m.scale.set(s * (0.8 + Math.random() * 0.5), s * (0.6 + Math.random() * 0.5), s * (0.8 + Math.random() * 0.5));
    m.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
    parent.add(m); return m;
  };
  const glowSprite = (color, size, x, y, z, opacity = 0.55, parent = group) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), color, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending }));
    s.scale.setScalar(size); s.position.set(x, y, z); parent.add(s); return s;
  };

  // ── sky-island foundation ──
  const body = cyl(63, 48, 22, 14, rock2, 0, -11.4, 0);
  body.rotation.y = 0.15;
  const lip = cyl(64, 63, 1.2, 14, grass, 0, -0.6, 0);
  lip.rotation.y = 0.15;
  const inner = cyl(58, 58, 0.12, 14, grass2, 0, 0.02, 0); inner.rotation.y = 0.15;
  // cliff shards hanging under the island
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * Math.PI * 2;
    const r = 34 + (i % 3) * 8;
    cone(6 + (i % 4) * 3, 22 + (i % 3) * 12, 5, rock2, Math.cos(a) * r, -24 - (i % 3) * 4, Math.sin(a) * r);
  }

  // ── mountain ring ──
  for (let i = 0; i < 11; i++) {
    const a = i / 11 * Math.PI * 2 + 0.35;
    const dist = 170 + (i % 3) * 28;
    const h = 64 + (i % 4) * 24;
    const r = 24 + (i % 3) * 10;
    const m = cone(r, h, 6, rock, Math.cos(a) * dist, h / 2 - 32, Math.sin(a) * dist);
    m.rotation.y = i;
    const cap = cone(r * 0.52, h * 0.32, 6, snow, Math.cos(a) * dist, h - 32 - h * 0.16, Math.sin(a) * dist);
    cap.rotation.y = i;
  }

  // ── central plaza & dais ──
  const dais = new THREE.Group(); group.add(dais);
  cyl(10.5, 11, 0.4, 18, stone, 0, 0.2, 0, dais);
  cyl(8.6, 9.2, 0.42, 18, stone2, 0, 0.6, 0, dais);
  cyl(6.9, 7.6, 0.42, 18, stone, 0, 1.0, 0, dais);
  const runeRing = new THREE.Mesh(new THREE.TorusGeometry(7.2, 0.12, 4, 40), glowCol(pal.accent, 0.55));
  runeRing.rotation.x = -Math.PI / 2; runeRing.position.y = 1.22; dais.add(runeRing);
  const focus = new THREE.Vector3(0, 1.22, 0);
  // carved dragon stones and a central hearth behind the dais
  for (let i = 0; i < 8; i++) {
    const a = i / 8 * Math.PI * 2;
    const s = new THREE.Mesh(shared.boxGeo, i % 2 ? stone2 : stone);
    s.scale.set(0.35, 1.1, 1.1); s.position.set(Math.cos(a) * 9.2, 0.75, Math.sin(a) * 9.2);
    s.rotation.y = -a; dais.add(s);
  }
  const hearth = new THREE.Group(); hearth.position.set(0, 1.2, -8.4); group.add(hearth);
  cyl(1.9, 2.2, 0.7, 8, stone2, 0, 0.35, 0, hearth);
  const emberMat = glowCol('#ff8a3a', 0.95);
  cyl(1.35, 1.5, 0.25, 8, emberMat, 0, 0.72, 0, hearth);
  for (let i = 0; i < 5; i++) {
    const a = i / 5 * Math.PI * 2;
    const fl = new THREE.Mesh(shared.sphereGeo, glowCol(i % 2 ? '#ffb44a' : '#ff6a1f', 0.9));
    fl.scale.set(0.24, 0.65, 0.24); fl.position.set(Math.cos(a) * 0.6, 1.05, Math.sin(a) * 0.6);
    hearth.add(fl); anim.glows.push(fl);
  }
  const hearthLight = new THREE.PointLight('#ffb066', 9, 34, 2);
  hearthLight.position.set(0, 5, -8.4); group.add(hearthLight);

  // ── walkways from the plaza to every habitat ──
  const familyList = FAMILY_ORDER;
  const padRadius = 31.5;
  const anchors = [], pads = [];
  const padColors = Object.fromEntries(familyList.map(f => [f, HABITAT_INFO[f]?.accent || pal.accent]));
  for (let i = 0; i < familyList.length; i++) {
    const a = i / familyList.length * Math.PI * 2 - Math.PI / 2;
    const cx = Math.cos(a) * padRadius, cz = Math.sin(a) * padRadius;
    // plank path
    const ry = Math.PI / 2 - a;
    for (let k = 0; k < 3; k++) {
      const rr = 12 + k * 6.2;
      const plank = box(3.1, 0.16, 5.9, k % 2 ? wood : darkWood, Math.cos(a) * rr, 0.16 + k * 0.02, Math.sin(a) * rr, ry);
      plank.receiveShadow = false;
    }
    for (const side of [-1, 1]) {
      for (let k = 0; k < 2; k++) {
        const rr = 15 + k * 9;
        const px = Math.cos(a) * rr + Math.cos(a + Math.PI / 2) * side * 2.2;
        const pz = Math.sin(a) * rr + Math.sin(a + Math.PI / 2) * side * 2.2;
        box(0.16, 1.15, 0.16, darkWood, px, 0.58, pz, ry);
      }
    }

    const pad = new THREE.Group(); pad.position.set(cx, 0, cz); group.add(pad);
    const famCol = padColors[familyList[i]];
    const plateMat = lam(familyList[i] === 'fire' ? '#4a3233' : familyList[i] === 'ice' ? '#bfe6f2' : familyList[i] === 'night' ? '#3a3450' : familyList[i] === 'forest' || familyList[i] === 'venom' ? '#5d7f45' : familyList[i] === 'ocean' ? '#4c8d94' : stone);
    cyl(4.8, 5.1, 0.5, 10, plateMat, 0, 0.25, 0, pad);
    // straw nest
    const nest = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.48, 5, 14), straw);
    nest.rotation.x = -Math.PI / 2; nest.position.y = 0.62; pad.add(nest);
    const bed = new THREE.Mesh(shared.sphereGeo, straw);
    bed.scale.set(1.85, 0.28, 1.85); bed.position.y = 0.58; pad.add(bed);
    // carved signpost and species banner
    box(0.18, 2.9, 0.18, darkWood, 3.7, 1.45, 1.0, 0, pad);
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.85, 3, 1), lam(famCol, { side: THREE.DoubleSide }));
    flag.position.set(4.3, 2.45, 1.0); flag.rotation.y = Math.PI / 2; pad.add(flag);
    anim.flags.push(flag);
    // family decoration
    decorateHabitat(pad, familyList[i], { rock, rock2, stone, stone2, wood, darkWood, grass, grass2, snow, gold, straw, glowCol, glowSprite, anim, R: rng(hash(familyList[i] + 'sanctuary')), cone, cyl, box, rockMesh, famCol });
    pad.userData.interact = { type: 'habitat', family: familyList[i] };
    pad.userData.family = familyList[i];
    pads.push(pad);
    // dragons on the pad face the plaza
    const face = Math.atan2(cx, cz);
    anchors.push({ family: familyList[i], position: new THREE.Vector3(cx, 0.72, cz), rotation: face, pad });
  }

  // ── great hall ──
  const hall = new THREE.Group(); hall.position.set(0, 0, -46); hall.rotation.y = Math.PI; group.add(hall);
  box(19, 8, 12, wood, 0, 4, 0, 0, hall);
  const roof = cone(14, 7.2, 4, lam('#7b3d33'), 0, 11.6, 0, hall); roof.rotation.y = Math.PI / 4;
  box(20, 0.45, 12.5, gold, 0, 8.1, 0, 0, hall);
  // door
  box(3.6, 4.6, 0.4, darkWood, 0, 2.3, 6.05, 0, hall);
  box(0.25, 5.6, 0.6, gold, -1.95, 2.8, 6.1, 0, hall);
  box(0.25, 5.6, 0.6, gold, 1.95, 2.8, 6.1, 0, hall);
  // gable dragon prow
  cone(0.9, 4, 5, gold, 0, 17.2, 0, hall);
  const prowEye = glowCol('#ffe27a', 0.95);
  for (const sd of [-1, 1]) {
    const e = new THREE.Mesh(shared.sphereGeo, prowEye); e.scale.setScalar(0.18); e.position.set(sd * 0.55, 15.9, 0.1); hall.add(e);
  }
  // glowing windows
  for (let i = 0; i < 4; i++) {
    const w = box(1.4, 1.8, 0.18, glowCol('#ffd88a', 0.9), -6 + i * 4, 5.2, 6.08, 0, hall);
    anim.glows.push(w);
  }
  // roof beams and shields
  for (let i = 0; i < 5; i++) {
    box(0.28, 0.28, 13.4, darkWood, -6 + i * 3, 8.6, 0, 0, hall).rotation.z = 0.08;
    const shield = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.18, 8), lam(i % 2 ? pal.accent : '#7b3d33'));
    shield.rotation.x = Math.PI / 2; shield.position.set(-8 + i * 4, 6.7, 6.15); hall.add(shield);
  }
  const hallBannerL = makeBanner(pal, 12); hallBannerL.position.set(-12, 0, 6.4); hall.add(hallBannerL); anim.flags.push(hallBannerL.userData.flag);
  const hallBannerR = makeBanner(pal, 12); hallBannerR.position.set(12, 0, 6.4); hall.add(hallBannerR); anim.flags.push(hallBannerR.userData.flag);

  // ── watchtowers ──
  for (const sd of [-1, 1]) {
    const tw = new THREE.Group(); tw.position.set(sd * 46, 0, -26); group.add(tw);
    for (let i = 0; i < 4; i++) {
      const a = i / 4 * Math.PI * 2 + Math.PI / 4;
      box(0.45, 9, 0.45, darkWood, Math.cos(a) * 2.3, 4.5, Math.sin(a) * 2.3, 0, tw);
    }
    box(5.8, 0.5, 5.8, wood, 0, 8.8, 0, 0, tw);
    box(4.8, 2.7, 4.8, wood, 0, 10.4, 0, 0, tw);
    const tr = cone(4.4, 3.2, 4, lam('#7b3d33'), 0, 13.4, 0, tw); tr.rotation.y = Math.PI / 4;
    const t = makeTorch(); t.position.set(0, 11.9, 2.7); tw.add(t); anim.torches.push(t);
    const b = makeBanner(pal, 9); b.position.set(2.6, 9.4, 1.8); tw.add(b); anim.flags.push(b.userData.flag);
  }

  // ── training ring ──
  const training = new THREE.Group(); training.position.set(-42, 0, 33); group.add(training);
  cyl(7.4, 7.9, 0.5, 12, lam('#a8a67a'), 0, 0.25, 0, training);
  const tring = new THREE.Mesh(new THREE.TorusGeometry(6.6, 0.18, 4, 28), gold); tring.rotation.x = -Math.PI / 2; tring.position.y = 0.55; training.add(tring);
  for (let i = 0; i < 3; i++) {
    const a = i / 3 * Math.PI * 2 + 0.4;
    const px = Math.cos(a) * 5.2, pz = Math.sin(a) * 5.2;
    box(0.28, 3.4, 0.28, darkWood, px, 1.7, pz, 0, training);
    const dummy = new THREE.Mesh(new THREE.SphereGeometry(0.8, 6, 4), straw); dummy.scale.set(1, 1.1, 0.8); dummy.position.set(px, 3.6, pz); training.add(dummy);
    const ar = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.08, 4, 12), gold); ar.position.set(px, 3.6, pz); ar.rotation.y = a; training.add(ar);
  }
  // floating training hoops
  for (let i = 0; i < 3; i++) {
    const hoop = new THREE.Mesh(new THREE.TorusGeometry(1.7 + i * 0.3, 0.1, 4, 18), glowCol(pal.accent, 0.6));
    hoop.position.set(0, 4 + i * 2.2, 0); hoop.rotation.set(0.4 + i * 0.2, i * 0.7, 0.2); training.add(hoop);
    anim.glows.push(hoop);
  }
  training.userData.interact = { type: 'training' };
  const trainLight = new THREE.PointLight('#ffcf6b', 4, 24, 2); trainLight.position.set(-42, 7, 33); group.add(trainLight);

  // ── feeding station ──
  const feeding = new THREE.Group(); feeding.position.set(42, 0, 33); group.add(feeding);
  box(8, 4.4, 6, wood, 0, 2.2, 0, 0, feeding);
  const fr = cone(6.4, 3, 4, lam('#7b3d33'), 0, 5.8, 0, feeding); fr.rotation.y = Math.PI / 4;
  box(5.2, 0.9, 1.8, stone2, 0, 0.45, 4.2, 0, feeding);
  for (let i = 0; i < 4; i++) {
    const fish = new THREE.Mesh(shared.sphereGeo, lam('#9fd8e8'));
    fish.scale.set(0.75, 0.25, 0.35); fish.position.set(-1.5 + i * 1, 1.1, 4.2); feeding.add(fish);
  }
  // hanging haunch and herb bundles
  for (let i = 0; i < 3; i++) {
    box(0.12, 1.1, 0.12, straw, -2 + i * 2, 3.9, 3.1, 0, feeding);
    const bundle = new THREE.Mesh(new THREE.ConeGeometry(0.38, 1.1, 5), lam(i % 2 ? '#b8d070' : '#d8c080'));
    bundle.rotation.x = Math.PI; bundle.position.set(-2 + i * 2, 3.2, 3.1); feeding.add(bundle);
  }
  const feedLight = new THREE.PointLight('#ffb066', 3.5, 20, 2); feedLight.position.set(42, 5, 33); group.add(feedLight);
  feeding.userData.interact = { type: 'feeding' };

  // ── waterfall and pool ──
  const waterfall = makeWaterfall(pal, 16, 74);
  waterfall.position.set(47, 30, -34); waterfall.rotation.y = -0.7; group.add(waterfall); anim.waterfalls.push(waterfall);
  const pool = cyl(8.5, 9, 0.35, 16, new THREE.MeshBasicMaterial({ color: new THREE.Color('#7fd8e8'), transparent: true, opacity: 0.55, toneMapped: false }), 43, 0.1, -25);
  anim.pools.push(pool);
  for (let i = 0; i < 5; i++) {
    rockMesh(1.4 + i * 0.15, rock2, 36 + i * 3.2, 0.4 + i * 0.3, -20 - i * 1.6);
  }

  // ── lanterns along the ring ──
  for (let i = 0; i < 8; i++) {
    const a = i / 8 * Math.PI * 2 + 0.2;
    const lm = new THREE.Group();
    lm.position.set(Math.cos(a) * 22, 0, Math.sin(a) * 22);
    group.add(lm);
    box(0.18, 4.6, 0.18, darkWood, 0, 2.3, 0, 0, lm);
    box(1.5, 0.15, 0.15, darkWood, 0.65, 4.5, 0, 0, lm);
    const lamp = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), glowCol('#ffd36b', 0.95));
    lamp.position.set(1.15, 4.15, 0); lm.add(lamp);
    const halo = glowSprite('#ffcf6b', 2.2, 1.15, 4.15, 0, 0.4, lm);
    anim.lanterns.push({ lamp, halo, base: 4.15, phase: i });
    const t = makeTorch(); t.position.set(0, 0.1, 0); lm.add(t); t.scale.setScalar(0.7); anim.torches.push(t);
  }

  // ── countryside details: trees, grass, rocks, paths ──
  const R = rng(9182);
  for (let i = 0; i < 22; i++) {
    const a = R() * Math.PI * 2, r = 37 + R() * 21;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const s = 0.8 + R() * 1.1;
    if (R() > 0.35) {
      const trunk = box(0.32 * s, 2.4 * s, 0.32 * s, darkWood, x, 1.2 * s, z);
      for (let k = 0; k < 3; k++) {
        const foliage = cone((1.8 - k * 0.35) * s, (2.2 - k * 0.45) * s, 6, k % 2 ? grass2 : grass, x, (2.7 + k * 1.15) * s, z);
        foliage.rotation.y = R() * 3;
      }
    } else {
      rockMesh(0.7 + R() * 1.2, R() > 0.5 ? rock : rock2, x, 0.4, z);
    }
  }
  for (let i = 0; i < 34; i++) {
    const a = R() * Math.PI * 2, r = 12 + R() * 46;
    if (r < 16) continue;
    const g = cone(0.18 + R() * 0.12, 0.7 + R() * 0.8, 4, R() > 0.4 ? grass : grass2, Math.cos(a) * r, 0.35, Math.sin(a) * r);
    g.rotation.y = R() * 3;
  }
  for (let i = 0; i < 10; i++) {
    const a = i / 10 * Math.PI * 2 + 0.1;
    rockMesh(0.8 + R() * 1.5, i % 2 ? rock : rock2, Math.cos(a) * 58, 0.2, Math.sin(a) * 58);
  }

  // a little arched footbridge over the stream
  const bridge = new THREE.Group(); bridge.position.set(20, 0, -30); bridge.rotation.y = -0.65; group.add(bridge);
  for (let i = 0; i < 7; i++) {
    const t = i / 6;
    const seg = box(4.4, 0.22, 1.35, i % 2 ? wood : darkWood, 0, 0.65 + Math.sin(t * Math.PI) * 2.1, -4.2 + t * 8.4, 0, bridge);
    seg.rotation.x = -Math.cos(t * Math.PI) * 0.42;
  }
  for (const sd of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      const t = (i + 0.5) / 3;
      box(0.18, 1.1, 0.18, darkWood, sd * 2.1, 1.2 + Math.sin(t * Math.PI) * 2.1, -4 + t * 8, 0, bridge);
    }
  }

  // ── growing flocks: warm motes + fire embers + forest fireflies ──
  const motes = makeParticles('motes', pal, light ? 78 : 140); group.add(motes);
  // local ember cloud above the fire pad
  const firePad = pads[familyList.indexOf('fire')];
  const fireBase = firePad ? firePad.position.clone() : new THREE.Vector3(-20, 0, 20);
  const emberCount = light ? 20 : 34;
  const emberGeo = new THREE.BufferGeometry();
  const emberPos = new Float32Array(emberCount * 3);
  for (let i = 0; i < emberCount; i++) {
    const a = Math.random() * 6.28, r = Math.random() * 4.4;
    emberPos[i * 3] = Math.cos(a) * r; emberPos[i * 3 + 1] = 1 + Math.random() * 7; emberPos[i * 3 + 2] = Math.sin(a) * r;
  }
  emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPos, 3));
  const embers = new THREE.Points(emberGeo, new THREE.PointsMaterial({ color: '#ff9a4a', size: 0.55, map: glowTexture(), transparent: true, opacity: 0.8, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true }));
  embers.position.copy(fireBase); group.add(embers); anim.embers = embers;
  // fireflies in the green roost
  const forestPad = pads[familyList.indexOf('forest')];
  const flyBase = forestPad ? forestPad.position.clone() : new THREE.Vector3(20, 0, -20);
  const flyCount = light ? 9 : 14;
  const flyGeo = new THREE.BufferGeometry();
  const flyPos = new Float32Array(flyCount * 3);
  for (let i = 0; i < flyCount; i++) { flyPos[i * 3] = (Math.random() - 0.5) * 7; flyPos[i * 3 + 1] = 1 + Math.random() * 4; flyPos[i * 3 + 2] = (Math.random() - 0.5) * 7; }
  flyGeo.setAttribute('position', new THREE.BufferAttribute(flyPos, 3));
  const flies = new THREE.Points(flyGeo, new THREE.PointsMaterial({ color: '#c8ff8a', size: 0.42, map: glowTexture(), transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending }));
  flies.position.copy(flyBase); group.add(flies); anim.fireflies = flies;

  let time = 0;
  function update(dt, center) {
    time += dt;
    anim.waterfalls.forEach(w => { w.material.uniforms.time.value = time; });
    anim.clouds.forEach(c => { c.position.x += c.userData.drift * dt; if (c.position.x > 700) c.position.x = -700; });
    anim.flags.forEach(f => { if (f) f.rotation.y = Math.PI / 2 + Math.sin(time * 1.7 + f.position.x * 0.2) * 0.16; });
    anim.torches.forEach(t => { if (t.userData.flame) t.userData.flame.scale.y = 1.6 + Math.sin(time * 9 + t.position.x + t.position.z) * 0.28; });
    anim.glows.forEach((g, i) => { if (g.material) g.material.opacity = (g.material.userData?.baseOpacity ?? 0.7) + Math.sin(time * 1.8 + i) * 0.1; });
    anim.lanterns.forEach((l, i) => {
      const swing = Math.sin(time * 0.9 + l.phase) * 0.09;
      l.lamp.position.y = l.base + Math.sin(time * 1.3 + l.phase) * 0.12;
      l.lamp.rotation.z = swing; l.halo.position.y = l.lamp.position.y;
      l.halo.material.opacity = 0.32 + Math.sin(time * 2.2 + i) * 0.08;
    });
    if (anim.embers) {
      const arr = anim.embers.geometry.attributes.position.array;
      for (let i = 0; i < emberCount; i++) {
        arr[i * 3 + 1] += dt * (0.6 + (i % 5) * 0.22);
        arr[i * 3] += Math.sin(time * 1.5 + i) * dt * 0.25;
        if (arr[i * 3 + 1] > 9) { arr[i * 3 + 1] = 0.8; const a = Math.random() * 6.28, r = Math.random() * 4.2; arr[i * 3] = Math.cos(a) * r; arr[i * 3 + 2] = Math.sin(a) * r; }
      }
      anim.embers.geometry.attributes.position.needsUpdate = true;
    }
    if (anim.fireflies) {
      const arr = anim.fireflies.geometry.attributes.position.array;
      for (let i = 0; i < flyCount; i++) {
        arr[i * 3] += Math.sin(time * 0.8 + i * 2.1) * dt * 0.5;
        arr[i * 3 + 1] += Math.sin(time * 1.2 + i) * dt * 0.3;
        arr[i * 3 + 2] += Math.cos(time * 0.7 + i * 1.7) * dt * 0.5;
      }
      anim.fireflies.geometry.attributes.position.needsUpdate = true;
    }
    anim.glows.forEach(g => { if (g.material && g.material.userData.baseOpacity === undefined) g.material.userData.baseOpacity = g.material.opacity; });
    hearthLight.intensity = 8.4 + Math.sin(time * 6.2) * 1.5;
    const c = center || focus;
    updateParticles(motes, dt, c);
  }
  function dispose() { disposeTree(group); }
  return { group, update, dispose, palette: pal, focus, anchors, pads, training, feeding, interactions: [training, feeding], time: () => time };
}

function decorateHabitat(pad, family, k) {
  const { rock, rock2, stone, stone2, wood, darkWood, grass, grass2, snow, gold, straw, glowCol, glowSprite, anim, R, cone, cyl, box, rockMesh, famCol } = k;
  const add = (m) => { pad.add(m); return m; };
  const post = (x, y, z, h, mat = darkWood) => { const m = new THREE.Mesh(shared.boxGeo, mat); m.scale.set(0.25, h, 0.25); m.position.set(x, y, z); pad.add(m); return m; };
  if (family === 'fire') {
    for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2 + 0.4; rockMesh(0.9 + R() * 0.7, i % 2 ? rock2 : rock, Math.cos(a) * 3.7, 0.7, Math.sin(a) * 3.7, pad); }
    for (let i = 0; i < 3; i++) { const crack = new THREE.Mesh(shared.boxGeo, glowCol('#ff6a1f', 0.85)); crack.scale.set(0.18, 0.06, 1.3 + R() * 1.5); crack.position.set(-1.5 + i * 1.5, 0.54, -2.4 + R() * 1.4); crack.rotation.y = R() * 3; pad.add(crack); }
    const forge = cyl(1.2, 1.4, 0.9, 7, stone2, 2.7, 0.9, -2.1, pad);
    const coals = new THREE.Mesh(shared.sphereGeo, glowCol('#ff7a2a', 0.95)); coals.scale.set(1, 0.28, 1); coals.position.set(2.7, 1.42, -2.1); pad.add(coals);
    glowSprite('#ff8a3a', 4.5, 2.7, 1.6, -2.1, 0.34, pad);
    const t = makeTorch(); t.position.set(-3.8, 0.5, 2.4); pad.add(t); anim.torches.push(t);
  } else if (family === 'ice') {
    for (let i = 0; i < 5; i++) {
      const a = i / 5 * Math.PI * 2 + 0.3;
      const shard = cone(0.55 + R() * 0.5, 2.4 + R() * 2.8, 5, new THREE.MeshLambertMaterial({ color: new THREE.Color('#bfeaff'), transparent: true, opacity: 0.78, flatShading: true }));
      shard.position.set(Math.cos(a) * 3.3, 1.6 + R(), Math.sin(a) * 3.3); shard.rotation.set(R() * 0.4, R() * 3, R() * 0.4); pad.add(shard);
    }
    const iceBed = cyl(3.4, 3.6, 0.16, 8, new THREE.MeshLambertMaterial({ color: new THREE.Color('#e8fbff'), transparent: true, opacity: 0.7, flatShading: true }), 0, 0.56, 0, pad);
    glowSprite('#8fe8ff', 5.4, 0, 2.1, 0, 0.28, pad);
    for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2; const s = cone(0.32, 1.4, 5, snow, Math.cos(a) * 4.2, 0.9, Math.sin(a) * 4.2, pad); s.rotation.z = 0.2; }
  } else if (family === 'night') {
    for (const sd of [-1, 1]) { post(sd * 2.8, 1.8, -2.4, 3.6); }
    const lintel = box(6.2, 0.5, 0.5, stone2, 0, 3.6, -2.4, 0, pad);
    for (let i = 0; i < 4; i++) {
      const c = cone(0.34, 1.4 + R(), 5, glowCol('#b18aff', 0.8), -2.4 + i * 1.6, 0.95, -3.0 + (i % 2) * 0.4, pad);
      c.rotation.x = 0.3;
    }
    glowSprite('#b18aff', 5.4, 0, 1.8, -2.2, 0.3, pad);
    const dust = new THREE.Mesh(shared.sphereGeo, new THREE.MeshBasicMaterial({ color: '#1b1828', transparent: true, opacity: 0.35, depthWrite: false }));
    dust.scale.set(4, 2.3, 4); dust.position.set(0, 1.2, -2.2); pad.add(dust);
  } else if (family === 'forest') {
    const trunk = cyl(0.42, 0.55, 3.8, 6, darkWood, -2.5, 1.9, -2.6, pad);
    for (let i = 0; i < 4; i++) { const foliage = cone(2.5 - i * 0.45, 2.2 - i * 0.3, 7, i % 2 ? grass2 : grass, -2.5, 3.8 + i * 1.2, -2.6, pad); foliage.rotation.y = R() * 3; }
    for (let i = 0; i < 7; i++) { const a = R() * 6.28, r = 2 + R() * 2.6; cone(0.16, 0.9 + R(), 5, grass, Math.cos(a) * r - 1, 0.6, Math.sin(a) * r - 2, pad); }
    for (let i = 0; i < 5; i++) {
      const a = R() * 6.28, r = 1.6 + R() * 3;
      const flower = new THREE.Mesh(shared.sphereGeo, glowCol(i % 2 ? '#ff9bc4' : '#ffe27a', 0.9));
      flower.scale.setScalar(0.18); flower.position.set(Math.cos(a) * r, 0.85, Math.sin(a) * r); pad.add(flower);
    }
    glowSprite('#b8e86a', 5, -1, 1.9, -2.2, 0.2, pad);
  } else if (family === 'ocean') {
    const tide = cyl(3.2, 3.4, 0.15, 12, new THREE.MeshBasicMaterial({ color: '#7cf0ff', transparent: true, opacity: 0.4, toneMapped: false }), 1.4, 0.58, -1.4, pad);
    anim.pools.push(tide);
    for (let i = 0; i < 6; i++) {
      const a = R() * 6.28, r = 1 + R() * 3.2;
      const coral = cone(0.28 + R() * 0.25, 1.2 + R() * 1.4, 5, lam(i % 2 ? '#ff8fb0' : '#ffb47a'), 1.4 + Math.cos(a) * r, 0.9, -1.4 + Math.sin(a) * r, pad);
      coral.rotation.z = (R() - 0.5) * 0.4;
    }
    glowSprite('#7cf0ff', 4.6, 1.4, 1.7, -1.4, 0.3, pad);
    for (let i = 0; i < 3; i++) { const shell = new THREE.Mesh(new THREE.TorusGeometry(0.38 + i * 0.1, 0.12, 4, 10, Math.PI), lam('#f0e0c8')); shell.rotation.x = -Math.PI / 2; shell.position.set(-1.4 + i * 1.1, 0.72, 2.4); pad.add(shell); }
  } else if (family === 'storm') {
    const spire = cone(1.1, 6.4, 5, stone2, -2.4, 3.2, -2.2, pad); spire.rotation.z = -0.1;
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.2 + i * 0.5, 0.08, 4, 16), glowCol('#a6f7ff', 0.75));
      ring.position.set(-2.4, 4.4 + i * 0.7, -2.2); ring.rotation.set(0.7 + i * 0.3, i * 0.8, 0.2); pad.add(ring); anim.glows.push(ring);
    }
    const cloud = new THREE.Mesh(shared.sphereGeo, new THREE.MeshLambertMaterial({ color: '#465066', flatShading: true }));
    cloud.scale.set(3.4, 1.3, 2.6); cloud.position.set(-2.4, 7.6, -2.2); pad.add(cloud);
    glowSprite('#a6f7ff', 5, -2.4, 5.2, -2.2, 0.22, pad);
    for (let i = 0; i < 3; i++) post(2.4 + i * 0.7, 1.4, 2.4 - i * 0.4, 2.8, stone2);
  } else if (family === 'earth') {
    for (let i = 0; i < 5; i++) {
      const a = i / 5 * Math.PI * 2 + 0.2;
      const st = box(1.1, 3.2 + (i % 2) * 1.2, 0.9, i % 2 ? stone : stone2, Math.cos(a) * 3.2, 1.7, Math.sin(a) * 3.2, -a, pad);
      st.rotation.z = (R() - 0.5) * 0.12;
    }
    for (let i = 0; i < 5; i++) rockMesh(0.4 + i * 0.14, stone2, 1.8 + (i % 2) * 0.4, 0.8 + i * 0.42, -2.2, pad);
    const vein = new THREE.Mesh(shared.boxGeo, glowCol('#ffb45e', 0.55)); vein.scale.set(0.12, 0.05, 2.2); vein.position.set(-1.8, 0.56, -2.2); vein.rotation.y = 0.5; pad.add(vein);
  } else if (family === 'venom') {
    for (let i = 0; i < 4; i++) {
      const a = -0.8 + i * 0.6;
      const stem = cyl(0.16, 0.22, 1.2 + R(), 5, lam('#c8d8a0'), -2.6 + i * 1.1, 1, -2.6, pad);
      const cap = cone(0.55 + R() * 0.3, 0.5, 7, glowCol(i % 2 ? '#c8ff6a' : '#a8ff7a', 0.85), -2.6 + i * 1.1, 1.7 + (i % 2) * 0.4, -2.6, pad);
    }
    for (let i = 0; i < 6; i++) {
      const a = R() * 6.28, r = 2.2 + R() * 2.2;
      const thorn = cone(0.16, 1 + R() * 0.9, 4, lam('#3d5038'), Math.cos(a) * r, 0.9, Math.sin(a) * r, pad);
      thorn.rotation.z = (R() - 0.5) * 0.6;
    }
    glowSprite('#c8ff6a', 4.4, -1, 1.8, -2.2, 0.26, pad);
  } else if (family === 'ancient') {
    for (let i = 0; i < 4; i++) {
      const a = i / 4 * Math.PI * 2 + 0.5;
      const st = box(0.85, 3.8, 0.85, i % 2 ? stone : stone2, Math.cos(a) * 3.3, 2, Math.sin(a) * 3.3, -a, pad);
      const rune = new THREE.Mesh(shared.boxGeo, glowCol('#ffd166', 0.8));
      rune.scale.set(0.1, 0.8, 0.1); rune.position.set(Math.cos(a) * 3.3, 2.1, Math.sin(a) * 3.3); pad.add(rune); anim.glows.push(rune);
    }
    const arch = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.14, 4, 18, Math.PI), glowCol('#ffd166', 0.55));
    arch.position.set(0, 2.5, -2.6); arch.rotation.z = Math.PI; pad.add(arch);
    const altar = box(3.2, 0.8, 1.6, stone, 0, 0.9, -2.6, 0, pad);
    glowSprite('#ffd166', 5, 0, 2, -2.6, 0.3, pad);
    for (let i = 0; i < 5; i++) { const a = i / 5 * 6.28; cone(0.08, 0.7, 4, gold, Math.cos(a) * 1.2, 1.4, -2.6 + Math.sin(a) * 0.5, pad); }
  } else {
    // hybrid: a wild roost where crystal and blossom meet
    const trunk = cyl(0.35, 0.5, 3.2, 6, darkWood, -2.2, 1.6, -2.4, pad);
    for (let i = 0; i < 3; i++) cone(2.1 - i * 0.4, 1.9 - i * 0.25, 6, i % 2 ? grass2 : grass, -2.2, 3.2 + i * 1, -2.4, pad);
    for (let i = 0; i < 4; i++) {
      const a = i / 4 * Math.PI * 2 + 0.4;
      const cr = cone(0.4, 2.2 + i * 0.25, 5, glowCol(['#ff9de2', '#a6f7ff', '#ffd166', '#b8ff9a'][i], 0.85));
      cr.position.set(Math.cos(a) * 3.4, 1.4, Math.sin(a) * 3.4); pad.add(cr);
    }
    glowSprite('#ff9de2', 5.2, 0, 2, 0, 0.28, pad);
  }
}

// Backwards-compatible alias: the old floating stage is now the sanctuary.
export function buildHangarStage(trackId = 'hearthfall', quality = 'high') {
  return buildDragonSanctuary(trackId, quality);
}

// ── village ────────────────────────────────────────────────────────────────
export function buildVillageWorld(villageLevels, quality = 'high') {
  const pal = TRACK_MAP.hearthfall.palette;
  const group = new THREE.Group();
  const anim = { waterfalls: [], clouds: [], flags: [], torches: [], smoke: [] };
  group.add(makeSky(pal, {}));
  group.add(makeWater(pal, 2600, -44));
  const clouds = addClouds(group, pal, 12, 460, 100); anim.clouds = clouds;
  const main = makeIsland(pal, 96, { seed: 404, biome: 'viking', trees: 1, houses: 4 });
  main.position.y = 2; group.add(main);
  // paths
  const pathMat = lam('#b99b6c');
  for (let i = 0; i < 5; i++) {
    const a = i / 5 * Math.PI * 2;
    const p = new THREE.Mesh(new THREE.PlaneGeometry(4, 52), pathMat);
    p.rotation.x = -Math.PI / 2; p.rotation.z = -a;
    p.position.set(Math.cos(a + Math.PI) * 20, 15, Math.sin(a + Math.PI) * 20);
    group.add(p);
  }
  // build lots
  const lots = [];
  BUILDINGS.forEach((b, idx) => {
    const lvl = villageLevels[b.id] || 0;
    const a = (idx / BUILDINGS.length) * Math.PI * 2 - 0.2;
    const dist = 44 + (idx % 2) * 10;
    const x = Math.cos(a) * dist, z = Math.sin(a) * dist;
    const lot = new THREE.Group();
    lot.position.set(x, 15, z); lot.rotation.y = -a + Math.PI;
    // pad
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(11, 11, 1, 8), lam(lvl ? '#a8c47a' : '#8c9b72'));
    pad.position.y = -0.5; lot.add(pad);
    if (lvl > 0) {
      const built = makeBuildingMesh(b, lvl, pal);
      lot.add(built); lot.userData.built = built;
    } else {
      const marker = new THREE.Group();
      for (let k = 0; k < 4; k++) {
        const a2 = k / 4 * Math.PI * 2;
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.3, 3, 4), lam('#7a5a3a'));
        post.position.set(Math.cos(a2) * 6, 1.5, Math.sin(a2) * 6); marker.add(post);
      }
      const sign = new THREE.Mesh(new THREE.BoxGeometry(5, 1.6, 0.5), lam('#b99b6c'));
      sign.position.y = 3; marker.add(sign);
      const glyph = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.16, 4, 12), new THREE.MeshBasicMaterial({ color: pal.accent, transparent: true, opacity: 0.5, toneMapped: false }));
      glyph.position.y = 5; marker.add(glyph); marker.userData.glyph = glyph;
      lot.add(marker); lot.userData.marker = marker;
    }
    lot.userData.building = b; lot.userData.level = lvl;
    group.add(lot); lots.push(lot);
    // torch
    if (idx % 2 === 0) {
      const torch = makeTorch(); torch.scale.setScalar(1.4);
      torch.position.set(x * 0.8, 15, z * 0.8); group.add(torch); anim.torches.push(torch);
    }
  });
  // dock
  const dock = new THREE.Group();
  const planks = new THREE.Mesh(new THREE.BoxGeometry(6, 0.6, 44), lam('#8a6240'));
  planks.position.y = 12; dock.add(planks);
  for (let i = 0; i < 5; i++) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 12, 5), lam('#6a4a32'));
    post.position.set(i % 2 ? 3 : -3, 6, -20 + i * 10); dock.add(post);
  }
  dock.position.set(0, 0, 96); group.add(dock);
  // banners
  for (let i = 0; i < 3; i++) {
    const bn = makeBanner(pal, 12 + i * 2);
    bn.position.set((i - 1) * 35, 16, 30); group.add(bn); anim.flags.push(bn);
  }
  const wf = makeWaterfall(pal, 24, 90); wf.position.set(-60, 0, 60); wf.rotation.y = -0.7; group.add(wf); anim.waterfalls.push(wf);
  const wf2 = makeWaterfall(pal, 16, 70); wf2.position.set(55, 0, -55); wf2.rotation.y = 2.2; group.add(wf2); anim.waterfalls.push(wf2);
  const particles = makeParticles('pollen', pal, quality === 'low' ? 80 : 160); group.add(particles);

  let time = 0;
  function update(dt, center) {
    time += dt;
    anim.waterfalls.forEach(w => { w.material.uniforms.time.value = time; });
    anim.flags.forEach(f => { if (f.userData.flag) f.userData.flag.rotation.y = Math.PI / 2 + Math.sin(time * 2 + f.position.z) * 0.18; });
    anim.torches.forEach(t => { if (t.userData.flame) t.userData.flame.scale.y = 1.6 + Math.sin(time * 9 + t.position.x) * 0.25; });
    clouds.forEach(c => { c.position.x += c.userData.drift * dt; if (c.position.x > 800) c.position.x = -800; });
    lots.forEach(l => { if (l.userData.marker?.userData.glyph) l.userData.marker.userData.glyph.rotation.z += dt; });
    if (center) updateParticles(particles, dt, center);
  }
  function dispose() { disposeTree(group); }
  return { group, lots, update, dispose, palette: pal };
}

function makeBuildingMesh(b, level, pal) {
  const g = new THREE.Group();
  const wood = lam('#9a7548'), darkWood = lam('#6a4b32'), stone = lam(pal.rock), roof = lam('#7b3d33'), gold = lam(pal.accent);
  if (b.id === 'hall') {
    const body = new THREE.Mesh(new THREE.BoxGeometry(12, 9, 10), wood); body.position.y = 4.5; g.add(body);
    const r = new THREE.Mesh(new THREE.ConeGeometry(9.5, 7, 4), roof); r.position.y = 12.5; r.rotation.y = Math.PI / 4; g.add(r);
    const trim = new THREE.Mesh(new THREE.BoxGeometry(12.3, 0.5, 10.3), gold); trim.position.y = 9; g.add(trim);
    for (let i = 0; i < level; i++) {
      const w = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2, 0.3), new THREE.MeshBasicMaterial({ color: '#ffd88a', toneMapped: false }));
      w.position.set(-3 + i * 3, 5, 5.1); g.add(w);
    }
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.8, 3, 4), gold); horn.position.y = 17; g.add(horn);
  } else if (b.id === 'habitat') {
    for (let i = 0; i < 2 + level; i++) {
      const a = (i / (2 + level)) * Math.PI * 2;
      const nest = new THREE.Mesh(new THREE.SphereGeometry(3.2, 8, 6), lam('#b99b6c'));
      nest.scale.y = 0.5; nest.position.set(Math.cos(a) * 5.6, 1, Math.sin(a) * 5.6); g.add(nest);
      const perch = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 5, 5), darkWood);
      perch.position.set(Math.cos(a) * 6.5, 2.5, Math.sin(a) * 6.5); g.add(perch);
      const egg = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 6), lam(pal.accent));
      egg.scale.set(0.7, 1, 0.7); egg.position.set(Math.cos(a) * 5.6, 2.2, Math.sin(a) * 5.6); g.add(egg);
    }
    const arch = new THREE.Mesh(new THREE.TorusGeometry(6, 0.6, 5, 12, Math.PI), wood);
    arch.position.y = 6; g.add(arch);
  } else if (b.id === 'arena') {
    const ground = new THREE.Mesh(new THREE.CylinderGeometry(8, 8, 1, 10), lam('#a8a67a')); ground.position.y = 0.5; g.add(ground);
    for (let i = 0; i < 3 + level; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(4 + i * 1.4, 0.22, 4, 14), gold);
      ring.position.y = 4 + i * 2; ring.rotation.set(Math.sin(i) * 0.4, i, 0.2); g.add(ring);
    }
    for (let i = 0; i < 4; i++) {
      const a = i / 4 * Math.PI * 2;
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.6, 8, 5), darkWood);
      post.position.set(Math.cos(a) * 8, 4, Math.sin(a) * 8); g.add(post);
      const flame = new THREE.Mesh(new THREE.SphereGeometry(0.5, 5, 4), new THREE.MeshBasicMaterial({ color: '#ffb44a', toneMapped: false }));
      flame.position.set(Math.cos(a) * 8, 8.4, Math.sin(a) * 8); g.add(flame);
    }
  } else if (b.id === 'feeding') {
    const shed = new THREE.Mesh(new THREE.BoxGeometry(8, 5, 6), wood); shed.position.y = 2.5; g.add(shed);
    const r = new THREE.Mesh(new THREE.ConeGeometry(6.5, 3.5, 4), roof); r.position.y = 6.2; r.rotation.y = Math.PI / 4; g.add(r);
    const trough = new THREE.Mesh(new THREE.BoxGeometry(5, 1, 2), stone); trough.position.set(0, 0.5, 4.5); g.add(trough);
    for (let i = 0; i < 3; i++) {
      const fish = new THREE.Mesh(new THREE.SphereGeometry(0.5, 6, 4), lam('#9fd8e8'));
      fish.scale.set(1.6, 0.6, 0.7); fish.position.set(-1.5 + i * 1.5, 1.2, 4.5); g.add(fish);
    }
  } else if (b.id === 'breeding') {
    const nest = new THREE.Mesh(new THREE.TorusGeometry(5, 1.8, 6, 12), lam('#7a5a3a'));
    nest.rotation.x = -Math.PI / 2; nest.position.y = 1; g.add(nest);
    for (let i = 0; i < level + 1; i++) {
      const a = i / (level + 1) * Math.PI * 2;
      const egg = new THREE.Mesh(new THREE.SphereGeometry(1.2, 8, 6), lam(pal.accent));
      egg.scale.y = 1.5; egg.position.set(Math.cos(a) * 2.8, 2, Math.sin(a) * 2.8); g.add(egg);
    }
    const arch = new THREE.Mesh(new THREE.TorusGeometry(7, 0.5, 4, 14, Math.PI), gold);
    arch.position.y = 5; g.add(arch);
  } else {
    // decor / festival
    const stall = new THREE.Mesh(new THREE.BoxGeometry(10, 4, 6), wood); stall.position.y = 2; g.add(stall);
    const cover = new THREE.Mesh(new THREE.ConeGeometry(8, 4, 4), lam(pal.accent)); cover.position.y = 6; cover.rotation.y = Math.PI / 4; g.add(cover);
    for (let i = 0; i < level + 1; i++) {
      const a = i / (level + 1) * Math.PI * 2;
      const torch = makeTorch(); torch.scale.setScalar(1.6);
      torch.position.set(Math.cos(a) * 8, 0, Math.sin(a) * 6); g.add(torch);
    }
    const ribbons = new THREE.Mesh(new THREE.TorusGeometry(7, 0.1, 4, 20), gold); ribbons.position.y = 8; ribbons.rotation.x = 1.2; g.add(ribbons);
  }
  return g;
}

// ── collectible sparkle ────────────────────────────────────────────────────
export function makePickup(color = '#ffd166') {
  const g = new THREE.Group();
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.1, 0), new THREE.MeshBasicMaterial({ color, toneMapped: false }));
  g.add(core);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), color, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false }));
  halo.scale.setScalar(8); g.add(halo);
  g.userData.core = core;
  return g;
}
