import * as THREE from 'three';
import { SPECIES, SEASONS, WEATHERS, DECOR, isNight, seasonIndex, treeValue } from './data.js';
import { createBonsai } from './bonsai.js';
import { createWeaponDisplay } from './weapons.js';
import { treeCapacity, beautyOf } from './state.js';

const V3 = THREE.Vector3;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const smooth = (t) => t * t * (3 - 2 * t);

export const LOCATIONS = {
  estate: { id: 'estate', name: 'Your Estate', jp: '山荘', kanji: '宅', x: 0, z: 0, radius: 34, spawn: { x: 0, z: 10.5 }, blurb: 'House, bonsai garden and forge.', color: '#b33a2b' },
  auction: { id: 'auction', name: 'Mountain Auction Grounds', jp: '競り市', kanji: '競', x: 96, z: 52, radius: 26, spawn: { x: 96, z: 38 }, blurb: 'Where the mountain gathers to bid.', color: '#b33a2b' },
  village: { id: 'village', name: 'Kagaribi Village', jp: '篝火村', kanji: '村', x: -98, z: 86, radius: 30, spawn: { x: -98, z: 70 }, blurb: 'Merchants, seeds and village gossip.', color: '#8b6825' },
  temple: { id: 'temple', name: 'Temple of the Quiet Bell', jp: '静鐘寺', kanji: '寺', x: -110, z: -82, radius: 28, spawn: { x: -110, z: -63 }, blurb: 'Incense, blessings and old commissions.', color: '#6b5a38' },
  bamboo: { id: 'bamboo', name: 'Whispering Bamboo Forest', jp: '竹の森', kanji: '竹', x: 92, z: -88, radius: 30, spawn: { x: 92, z: -69 }, blurb: 'Green dusk, and a red gate at night.', color: '#4a6142' },
  cherry: { id: 'cherry', name: 'Sakura Valley', jp: '桜谷', kanji: '桜', x: -130, z: 20, radius: 26, spawn: { x: -114, z: 20 }, blurb: 'Petals, picnic blankets, and rare seeds.', color: '#a4556b' },
  waterfall: { id: 'waterfall', name: "Dragon's Tears Falls", jp: '龍涙の滝', kanji: '滝', x: 30, z: -142, radius: 26, spawn: { x: 30, z: -123 }, blurb: 'Cold mist and a clear mind.', color: '#4d7a8b' },
  mine: { id: 'mine', name: 'Iron Vein Cave', jp: '鉄脈洞', kanji: '鉱', x: 150, z: 6, radius: 24, spawn: { x: 137, z: 7 }, blurb: 'Iron, tamahagane, and things that glow.', color: '#6b6257' },
};

// ————— canvas texture helpers —————
function canvasTex(w, h, draw, repeat) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat[0], repeat[1]); }
  return t;
}

let glyphCache = new Map();
function glyphTexture(kanji, { bg = 'rgba(20,17,12,.82)', fg = '#efe2c7', ring = '#c9a45c', size = 128 } = {}) {
  const key = kanji + bg + fg + ring;
  if (glyphCache.has(key)) return glyphCache.get(key);
  const t = canvasTex(size, size, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = bg;
    ctx.beginPath(); ctx.arc(w / 2, h / 2, w * 0.46, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = ring; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(w / 2, h / 2, w * 0.43, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = fg;
    ctx.font = `500 ${w * 0.44}px 'Shippori Mincho', serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(kanji, w / 2, h / 2 + w * 0.03);
  });
  const tex = new THREE.CanvasTexture(t.image);
  tex.colorSpace = THREE.SRGBColorSpace;
  glyphCache.set(key, tex);
  return tex;
}

function bannerTexture(kanji, bg = '#a3312a', fg = '#f3e6cd') {
  return canvasTex(128, 256, (ctx, w, h) => {
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,240,216,.5)'; ctx.lineWidth = 4; ctx.strokeRect(8, 8, w - 16, h - 16);
    ctx.fillStyle = fg;
    ctx.font = `600 84px 'Shippori Mincho', serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(kanji, w / 2, h / 2);
  });
}

function shojiTexture() {
  return canvasTex(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#efe3c8'; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255,249,230,.45)';
    for (let i = 0; i < 8; i++) ctx.fillRect(Math.random() * w, Math.random() * h, 30, 30);
    ctx.strokeStyle = '#4c3927'; ctx.lineWidth = 7;
    for (let i = 0; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(i * w / 4, 0); ctx.lineTo(i * w / 4, h); ctx.stroke(); }
    for (let i = 0; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(0, i * h / 6); ctx.lineTo(w, i * h / 6); ctx.stroke(); }
  });
}

function softParticleTexture(color = '255,255,255') {
  return canvasTex(64, 64, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, `rgba(${color},1)`);
    g.addColorStop(0.35, `rgba(${color},.7)`);
    g.addColorStop(1, `rgba(${color},0)`);
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  });
}

function grassTexture() {
  return canvasTex(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#7f9860'; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 2600; i++) {
      const x = Math.random() * w, y = Math.random() * h;
      const g = 90 + Math.random() * 80;
      ctx.fillStyle = `rgba(${g * 0.62},${g * 0.82},${g * 0.45},${0.1 + Math.random() * 0.22})`;
      ctx.fillRect(x, y, 1 + Math.random() * 2, 2 + Math.random() * 5);
    }
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(120,100,60,${0.04 + Math.random() * 0.07})`;
      ctx.beginPath(); ctx.arc(Math.random() * w, Math.random() * h, 10 + Math.random() * 30, 0, Math.PI * 2); ctx.fill();
    }
  }, [26, 26]);
}

function stoneTexture() {
  return canvasTex(128, 128, (ctx, w, h) => {
    ctx.fillStyle = '#9a9484'; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 500; i++) {
      const v = 110 + Math.random() * 70;
      ctx.fillStyle = `rgba(${v},${v - 4},${v - 14},${0.06 + Math.random() * 0.2})`;
      ctx.fillRect(Math.random() * w, Math.random() * h, 2 + Math.random() * 6, 2 + Math.random() * 6);
    }
  }, [3, 3]);
}

const MAT = {
  wood: () => new THREE.MeshStandardMaterial({ color: 0x5a3d28, roughness: 0.88, flatShading: true }),
  darkWood: () => new THREE.MeshStandardMaterial({ color: 0x33241a, roughness: 0.9, flatShading: true }),
  plaster: () => new THREE.MeshStandardMaterial({ color: 0xe8ddc4, roughness: 0.95 }),
  stone: () => new THREE.MeshStandardMaterial({ color: 0x8d8a7d, roughness: 0.95, flatShading: true }),
  mossStone: () => new THREE.MeshStandardMaterial({ color: 0x74796a, roughness: 1, flatShading: true }),
  vermilion: () => new THREE.MeshStandardMaterial({ color: 0xa9362a, roughness: 0.62 }),
  roof: () => new THREE.MeshStandardMaterial({ color: 0x3a3d44, roughness: 0.7, side: THREE.DoubleSide, flatShading: true }),
  roofWarm: () => new THREE.MeshStandardMaterial({ color: 0x4a3a32, roughness: 0.8, side: THREE.DoubleSide, flatShading: true }),
  gold: () => new THREE.MeshStandardMaterial({ color: 0xb8974e, metalness: 0.7, roughness: 0.35 }),
  bark: () => new THREE.MeshStandardMaterial({ color: 0x57402e, roughness: 1, flatShading: true }),
  barkLight: () => new THREE.MeshStandardMaterial({ color: 0x6f5641, roughness: 1, flatShading: true }),
  bamboo: () => new THREE.MeshStandardMaterial({ color: 0x83934f, roughness: 0.8, flatShading: true }),
  leaf: (color) => new THREE.MeshStandardMaterial({ color, roughness: 0.9, flatShading: true }),
  window: (tex) => new THREE.MeshStandardMaterial({ map: tex, emissive: 0xffbd72, emissiveMap: tex, emissiveIntensity: 0.05, roughness: 0.8 }),
  water: () => new THREE.MeshStandardMaterial({ color: 0x2e5d68, roughness: 0.15, metalness: 0.35, transparent: true, opacity: 0.9 }),
};

export class World {
  constructor(canvas, game) {
    this.canvas = canvas;
    this.game = game;
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.time = 0;
    this.interactions = [];
    this.pickables = [];
    this.npcs = [];
    this.lanterns = [];
    this.windowMats = [];
    this.colliders = [];
    this.fires = [];
    this.koi = [];
    this.markers = [];
    this.treeFoliage = [];
    this.keys = { w: false, a: false, s: false, d: false };
    this.joystick = { x: 0, y: 0 };
    this.camYaw = 0.2;
    this.camPolar = 0.44;
    this.camDist = 22;
    this.camTarget = new V3(0, 1.7, 8);
    this.cameraBlockers = [];
    this.camRay = new THREE.Raycaster();
    this.camRay.near = 0.2;
    this.camera = new THREE.PerspectiveCamera(46, 1, 0.1, 220);
    this.player = null;
    this.walkTime = 0;
    this.clickTarget = null;
    this.queued = null;
    this.locked = false;
    this.dragged = false;
    this.pointers = new Map();
    this.pinchDist = 0;
    this.currentZone = null;
    this.onZoneChange = null;
    this.onNearbyChange = null;
    this.nearby = null;
    this.season = SEASONS[0];
    this.state = game.state;

    this.renderer = this.createRenderer(canvas);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.coarsePointer ? 1 : 1.25));
    this.renderer.setSize(window.innerWidth || 1, window.innerHeight || 1, false);
    this.renderer.shadowMap.enabled = !this.coarsePointer;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.03;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.scene.fog = new THREE.Fog(0xc7d0c2, 60, 180);

    this.buildEnvironment();
    this.buildLights();
    this.buildGround();
    this.buildPaths();
    this.buildMountains();
    this.buildForest();
    this.buildEstate();
    this.buildAuction();
    this.buildVillage();
    this.buildTemple();
    this.buildBamboo();
    this.buildCherryValley();
    this.buildWaterfall();
    this.buildMine();
    this.buildAmbientParticles();
    this.buildPlayer();
    this.bindInput();

    this.state = game.state;
    this.rebuildBonsai();
    this.rebuildWeaponRack();
    this.rebuildDecor();
    this.setSeason(true);
    this.setTime(0);
    this.snapCamera();
  }

  createRenderer(canvas) {
    const attempts = [
      { antialias: false, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: false },
      { antialias: false, powerPreference: 'default', failIfMajorPerformanceCaveat: false },
      { antialias: false, powerPreference: 'low-power', failIfMajorPerformanceCaveat: false },
    ];
    let lastError = null;
    for (const options of attempts) {
      try {
        const renderer = new THREE.WebGLRenderer({ canvas, ...options });
        const gl = renderer.getContext();
        if (!gl) throw new Error('No graphics context was returned.');
        return renderer;
      } catch (error) {
        lastError = error;
      }
    }
    const reason = lastError?.message ? `: ${lastError.message}` : '';
    throw new Error(`The 3D view could not start${reason}.`);
  }

  // ————— environment, sky, lights —————
  buildEnvironment() {
    const envCanvas = document.createElement('canvas');
    envCanvas.width = 512; envCanvas.height = 256;
    const ctx = envCanvas.getContext('2d');
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, '#7a9bb5'); g.addColorStop(0.48, '#cfd8cf'); g.addColorStop(0.52, '#8b9c78'); g.addColorStop(1, '#3b4a39');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 256);
    const tex = new THREE.CanvasTexture(envCanvas);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    this.scene.environment = tex;
    this.scene.environmentIntensity = 0.55;

    this.skyUniforms = {
      topColor: { value: new THREE.Color(0x7ea0bb) },
      bottomColor: { value: new THREE.Color(0xefe2c8) },
      sunDir: { value: new V3(0.3, 0.6, 0.2) },
      sunColor: { value: new THREE.Color(0xffd9a0) },
      sunStrength: { value: 1 },
    };
    const skyGeo = new THREE.SphereGeometry(600, 16, 8);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: this.skyUniforms,
      side: THREE.BackSide, depthWrite: false, fog: false,
      vertexShader: `
        varying vec3 vWorld;
        void main() {
          vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform vec3 sunDir;
        uniform vec3 sunColor;
        uniform float sunStrength;
        varying vec3 vWorld;
        void main() {
          vec3 dir = normalize(vWorld);
          float h = smoothstep(-0.05, 0.72, dir.y);
          vec3 col = mix(bottomColor, topColor, h);
          float d = max(dot(dir, normalize(sunDir)), 0.0);
          col += sunColor * pow(d, 160.0) * 1.4 * sunStrength;
          col += sunColor * pow(d, 9.0) * 0.22 * sunStrength;
          float horizon = pow(1.0 - abs(dir.y), 6.0);
          col += sunColor * horizon * 0.06 * sunStrength;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    this.sky = new THREE.Mesh(skyGeo, skyMat);
    this.sky.frustumCulled = false;
    this.scene.add(this.sky);

    // stars
    const starPos = [];
    for (let i = 0; i < 900; i++) {
      const a = Math.random() * Math.PI * 2;
      const y = 0.12 + Math.random() * 0.85;
      const r = Math.sqrt(1 - y * y);
      starPos.push(Math.cos(a) * r * 520, y * 520, Math.sin(a) * r * 520);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
    this.starMat = new THREE.PointsMaterial({ color: 0xf5ecd8, size: 1.45, sizeAttenuation: false, transparent: true, opacity: 0, depthWrite: false, fog: false });
    this.stars = new THREE.Points(starGeo, this.starMat);
    this.stars.frustumCulled = false;
    this.scene.add(this.stars);

    // sun & moon
    this.sunMesh = new THREE.Mesh(new THREE.SphereGeometry(9, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffe6b8, fog: false }));
    this.scene.add(this.sunMesh);
    this.sunGlow = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshBasicMaterial({ map: softParticleTexture('255,226,170'), transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
    this.scene.add(this.sunGlow);
    this.moonMesh = new THREE.Mesh(new THREE.SphereGeometry(6, 16, 12), new THREE.MeshBasicMaterial({ color: 0xe8e3cf, fog: false }));
    this.scene.add(this.moonMesh);
    this.moonGlow = new THREE.Mesh(new THREE.PlaneGeometry(46, 46), new THREE.MeshBasicMaterial({ map: softParticleTexture('200,215,235'), transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
    this.scene.add(this.moonGlow);

    // clouds
    this.clouds = new THREE.Group();
    const cloudTex = softParticleTexture('255,255,255');
    for (let i = 0; i < 12; i++) {
      const g2 = new THREE.Group();
      const n = 3 + Math.floor(Math.random() * 3);
      for (let j = 0; j < n; j++) {
        const s = 12 + Math.random() * 18;
        const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: cloudTex, color: 0xf4f0e6, transparent: true, opacity: 0.18, depthWrite: false, fog: false }));
        sp.scale.set(s, s * 0.45, 1);
        sp.position.set((Math.random() - 0.5) * s * 1.6, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 10);
        g2.add(sp);
      }
      const a = Math.random() * Math.PI * 2, r = 130 + Math.random() * 160;
      g2.position.set(Math.cos(a) * r, 62 + Math.random() * 40, Math.sin(a) * r);
      this.clouds.add(g2);
    }
    this.scene.add(this.clouds);
  }

  buildLights() {
    this.hemi = new THREE.HemisphereLight(0xcfe0ea, 0x5a5a42, 0.75);
    this.scene.add(this.hemi);
    this.sun = new THREE.DirectionalLight(0xffe9c8, 1.6);
    this.sun.position.set(60, 100, 40);
    this.sun.castShadow = !this.coarsePointer;
    this.sun.shadow.mapSize.set(512, 512);
    this.sun.shadow.camera.near = 1;
    this.sun.shadow.camera.far = 180;
    this.sun.shadow.camera.left = -55;
    this.sun.shadow.camera.right = 55;
    this.sun.shadow.camera.top = 55;
    this.sun.shadow.camera.bottom = -55;
    this.sun.shadow.bias = -0.0004;
    this.sun.shadow.normalBias = 0.03;
    this.scene.add(this.sun);
    this.sun.target = new THREE.Object3D();
    this.scene.add(this.sun.target);
    this.fill = new THREE.DirectionalLight(0x9fb6c8, 0.22);
    this.fill.position.set(-40, 30, -60);
    this.scene.add(this.fill);
  }

  buildGround() {
    const geo = new THREE.PlaneGeometry(520, 520, 40, 40);
    geo.rotateX(-Math.PI / 2);
    const colors = [];
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i);
      const d = Math.hypot(x, z);
      const n = Math.sin(x * 0.11) * Math.cos(z * 0.09) * 0.5 + Math.sin(x * 0.037 + z * 0.041) * 0.5;
      const shade = 0.82 + n * 0.16;
      colors.push(shade * 0.92, shade, shade * 0.84);
      if (d > 215) pos.setY(i, Math.min(18, (d - 215) * 0.22 + n * 2));
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    this.groundMat = new THREE.MeshStandardMaterial({
      map: grassTexture(), vertexColors: true, color: 0x9db07e, roughness: 1, metalness: 0,
    });
    const ground = new THREE.Mesh(geo, this.groundMat);
    ground.receiveShadow = true;
    this.scene.add(ground);

    // large gravel beds under important areas
    this.addGroundPatch(0, 2, 27, 24, 0xcfc5a8, 0.015);
    this.addGroundPatch(96, 52, 20, 15, 0xb9ad90, 0.018);
    this.addGroundPatch(-98, 86, 25, 20, 0xb6aa8a, 0.018);
    this.addGroundPatch(-110, -82, 22, 16, 0xb7b2a1, 0.018);
    this.addGroundPatch(92, -88, 24, 22, 0x6e7d58, 0.014);
  }

  addGroundPatch(x, z, w, d, color, y = 0.02) {
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 1, transparent: true, opacity: 0.85 });
    const m = new THREE.Mesh(new THREE.CircleGeometry(1, 32), mat);
    m.rotation.x = -Math.PI / 2;
    m.scale.set(w / 2, d / 2, 1);
    m.position.set(x, y, z);
    m.receiveShadow = true;
    this.scene.add(m);
    return m;
  }

  groundHeightAt() { return 0; }

  buildPaths() {
    const paths = [
      [[0, 15], [4, 26], [30, 34], [66, 42], [95, 38]],
      [[-2, 15], [-26, 28], [-58, 48], [-86, 66], [-98, 70]],
      [[-6, 8], [-30, -10], [-62, -34], [-92, -55], [-110, -64]],
      [[8, 8], [30, -8], [58, -36], [82, -58], [92, -69]],
      [[-8, 12], [-40, 14], [-76, 18], [-114, 20]],
      [[12, 6], [18, -20], [24, -56], [27, -94], [30, -124]],
      [[18, 4], [52, 5], [92, 4], [124, 6], [138, 7]],
    ];
    const stoneGeo = new THREE.CylinderGeometry(0.42, 0.48, 0.09, 6);
    const stoneMat = new THREE.MeshStandardMaterial({ map: stoneTexture(), color: 0xa8a090, roughness: 0.95, flatShading: true });
    const transforms = [];
    for (const pts of paths) {
      const curve = new THREE.CatmullRomCurve3(pts.map(([x, z]) => new V3(x, 0, z)));
      const ribbon = this.makeRibbon(curve, 2.4, 0xb4a887);
      this.scene.add(ribbon);
      const len = curve.getLength();
      const n = Math.floor(len / 2.6);
      for (let i = 1; i < n; i++) {
        const t = i / n;
        const p = curve.getPoint(t);
        const tan = curve.getTangent(t);
        transforms.push({ p, rot: Math.atan2(tan.x, tan.z) + (Math.random() - 0.5) * 0.4, s: 0.8 + Math.random() * 0.5 });
      }
    }
    const inst = new THREE.InstancedMesh(stoneGeo, stoneMat, transforms.length);
    const dummy = new THREE.Object3D();
    transforms.forEach((tr, i) => {
      dummy.position.set(tr.p.x + (Math.random() - 0.5) * 0.4, 0.05, tr.p.z + (Math.random() - 0.5) * 0.4);
      dummy.rotation.set(0, tr.rot, 0);
      dummy.scale.setScalar(tr.s);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    });
    inst.receiveShadow = true;
    this.scene.add(inst);
    this.pathStones = inst;
  }

  makeRibbon(curve, width, color) {
    const n = 60;
    const positions = [];
    const indices = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const p = curve.getPoint(t);
      const tan = curve.getTangent(t);
      const nx = -tan.z, nz = tan.x;
      positions.push(p.x + nx * width / 2, 0.025, p.z + nz * width / 2);
      positions.push(p.x - nx * width / 2, 0.025, p.z - nz * width / 2);
    }
    for (let i = 0; i < n; i++) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 1, transparent: true, opacity: 0.85, side: THREE.DoubleSide });
    const m = new THREE.Mesh(geo, mat);
    m.receiveShadow = true;
    return m;
  }

  buildMountains() {
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x4c554b, roughness: 1, flatShading: true });
    const snowMat = new THREE.MeshStandardMaterial({ color: 0xe9edee, roughness: 0.9, flatShading: true });
    const group = new THREE.Group();
    const count = 17;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + Math.random() * 0.2;
      const r = 238 + Math.random() * 75;
      const h = 58 + Math.random() * 95;
      const w = 48 + Math.random() * 45;
      const m = new THREE.Mesh(new THREE.ConeGeometry(w, h, 6 + Math.floor(Math.random() * 3), 3), rockMat);
      m.position.set(Math.cos(a) * r, h / 2 - 4, Math.sin(a) * r);
      m.rotation.y = Math.random() * Math.PI;
      group.add(m);
      const snow = new THREE.Mesh(new THREE.ConeGeometry(w * 0.35, h * 0.35, 6, 2), snowMat);
      snow.position.set(m.position.x, h * 0.84 - 4, m.position.z);
      snow.rotation.y = m.rotation.y;
      group.add(snow);
    }
    this.scene.add(group);
    this.mountains = group;
  }

  buildForest() {
    const forestSpots = [];
    const pineSpots = [];
    const avoid = Object.values(LOCATIONS).map((l) => ({ x: l.x, z: l.z, r: l.radius + 10 }));
    for (let i = 0; i < 620; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 45 + Math.pow(Math.random(), 0.75) * 150;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      if (avoid.some((l) => Math.hypot(l.x - x, l.z - z) < l.r)) continue;
      if (Math.abs(x) < 24 && z > -22 && z < 25) continue;
      const s = 0.75 + Math.random() * 1.1;
      if (Math.random() < 0.3) pineSpots.push({ x, z, s, rot: Math.random() * Math.PI });
      else forestSpots.push({ x, z, s, rot: Math.random() * Math.PI });
    }
    this.forestSpots = forestSpots;
    this.pineSpots = pineSpots;

    const trunkGeo = new THREE.CylinderGeometry(0.16, 0.34, 4, 5);
    trunkGeo.translate(0, 2, 0);
    const trunkInst = new THREE.InstancedMesh(trunkGeo, MAT.bark(), forestSpots.length + pineSpots.length);
    const canopyGeo = new THREE.IcosahedronGeometry(2.25, 1);
    const canopyInst = new THREE.InstancedMesh(canopyGeo, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.92, flatShading: true }), forestSpots.length);
    const pineGeo = new THREE.ConeGeometry(1.65, 4.6, 7);
    const pineInst = new THREE.InstancedMesh(pineGeo, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, flatShading: true }), pineSpots.length);

    const dummy = new THREE.Object3D();
    const col = new THREE.Color();
    let ti = 0;
    forestSpots.forEach((t, i) => {
      dummy.position.set(t.x, 0, t.z); dummy.rotation.set(0, t.rot, 0); dummy.scale.setScalar(t.s); dummy.updateMatrix();
      trunkInst.setMatrixAt(ti++, dummy.matrix);
      dummy.position.y = 3.5 * t.s + 2.1 * t.s * 0.35;
      dummy.scale.set(t.s * 1.1, t.s * 0.92, t.s * 1.1);
      dummy.rotation.set(Math.random(), t.rot, Math.random() * 0.2);
      dummy.updateMatrix();
      canopyInst.setMatrixAt(i, dummy.matrix);
    });
    pineSpots.forEach((t, i) => {
      dummy.position.set(t.x, 0, t.z); dummy.rotation.set(0, t.rot, 0); dummy.scale.setScalar(t.s); dummy.updateMatrix();
      trunkInst.setMatrixAt(ti++, dummy.matrix);
      dummy.position.y = 2.7 * t.s + 3.6 * t.s * 0.5;
      dummy.scale.set(t.s, t.s * 1.15, t.s);
      dummy.updateMatrix();
      pineInst.setMatrixAt(i, dummy.matrix);
    });
    trunkInst.castShadow = true; trunkInst.receiveShadow = true;
    canopyInst.castShadow = true; pineInst.castShadow = true;
    this.scene.add(trunkInst, canopyInst, pineInst);
    this.forest = { canopyInst, pineInst, forestSpots, pineSpots };
    this.updateForestColors();
  }

  updateForestColors() {
    if (!this.forest) return;
    const season = this.season.id;
    const palettes = {
      spring: [0x86a95e, 0x9cba6a, 0xb7c47b, 0x6e9750, 0x8fae83],
      summer: [0x5f8a46, 0x4f7c3d, 0x6f9850, 0x426b34, 0x7a9c5e],
      autumn: [0xb35f2e, 0xc27f32, 0x9c4b2c, 0xd0a04a, 0x8b6b3a],
      winter: [0x6c7b68, 0x7b8a76, 0x5c6b5c, 0x889083, 0x6a766a],
    };
    const pal = palettes[season] || palettes.summer;
    const c = new THREE.Color();
    this.forest.forestSpots.forEach((s, i) => {
      c.setHex(pal[i % pal.length]);
      if (season === 'winter' && i % 3 === 0) c.lerp(new THREE.Color(0xdfe6e8), 0.35);
      this.forest.canopyInst.setColorAt(i, c);
    });
    this.forest.canopyInst.instanceColor.needsUpdate = true;
    const pines = [0x3d5c42, 0x46664a, 0x34523a, 0x506b4f];
    this.forest.pineSpots.forEach((s, i) => {
      c.setHex(pines[i % pines.length]);
      if (season === 'winter') c.lerp(new THREE.Color(0xc8d5d5), 0.18);
      this.forest.pineInst.setColorAt(i, c);
    });
    this.forest.pineInst.instanceColor.needsUpdate = true;
  }

  // ————— reusable structures —————
  roofGeometry(w, d, rise, overhang = 1.2, lift = 0.9) {
    const positions = [];
    const uSeg = 10, vSeg = 3;
    const indices = [];
    const rows = [];
    for (const side of [1, -1]) {
      const start = positions.length / 3;
      for (let j = 0; j <= vSeg; j++) {
        const v = j / vSeg;
        for (let i = 0; i <= uSeg; i++) {
          const u = i / uSeg;
          const x = (-w / 2 - overhang) + u * (w + overhang * 2);
          const z = side * v * (d / 2 + overhang);
          let y = rise * (1 - v);
          const edge = Math.pow(Math.abs(u - 0.5) * 2, 2);
          if (side === 1) y += edge * v * lift;
          else y += edge * v * lift;
          positions.push(x, y, z);
        }
      }
      for (let j = 0; j < vSeg; j++) {
        for (let i = 0; i < uSeg; i++) {
          const a = start + j * (uSeg + 1) + i;
          const b = a + 1;
          const c = a + uSeg + 1;
          const dd = c + 1;
          if (side === 1) { indices.push(a, c, b, b, c, dd); }
          else { indices.push(a, b, c, b, dd, c); }
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }

  registerCameraBlockers(group) {
    group.traverse((o) => {
      if (!o.isMesh || !o.geometry) return;
      o.geometry.computeBoundingSphere();
      if ((o.geometry.boundingSphere?.radius || 0) > 1.1) this.cameraBlockers.push(o);
    });
  }

  makeHouse({ w = 11, d = 8, h = 3.2, roofMat = null, color = 0xe8ddc4 } = {}) {
    const g = new THREE.Group();
    const foundation = new THREE.Mesh(new THREE.BoxGeometry(w + 1.2, 0.5, d + 1.2), MAT.stone());
    foundation.position.y = 0.25;
    foundation.receiveShadow = true; foundation.castShadow = true;
    g.add(foundation);
    const deck = new THREE.Mesh(new THREE.BoxGeometry(w + 1.6, 0.26, d + 1.6), MAT.wood());
    deck.position.y = 0.63;
    deck.receiveShadow = true; deck.castShadow = true;
    g.add(deck);

    const wallMat = new THREE.MeshStandardMaterial({ color, roughness: 0.95 });
    const walls = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat);
    walls.position.y = 0.76 + h / 2;
    walls.castShadow = true; walls.receiveShadow = true;
    g.add(walls);

    // timber frame
    const beamMat = MAT.darkWood();
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.22, h, 0.22), beamMat);
      post.position.set(sx * w / 2, 0.76 + h / 2, sz * d / 2);
      g.add(post);
    }
    for (const y of [0.82, 0.76 + h * 0.62, 0.76 + h - 0.08]) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(w + 0.2, 0.16, 0.16), beamMat);
      beam.position.set(0, y, d / 2 + 0.01);
      g.add(beam);
      const beamB = beam.clone(); beamB.position.z = -d / 2 - 0.01; g.add(beamB);
    }

    // shoji front panels
    const shoji = shojiTexture();
    const frontZ = d / 2 + 0.02;
    const doorWidth = 2.3;
    const panelW = (w - doorWidth - 0.6) / 2;
    for (const sx of [-1, 1]) {
      const mat = MAT.window(shoji);
      this.windowMats.push(mat);
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(panelW, h * 0.58), mat);
      panel.position.set(sx * (doorWidth / 2 + panelW / 2 + 0.1), 0.76 + h * 0.48, frontZ);
      g.add(panel);
      const lat = new THREE.Mesh(new THREE.PlaneGeometry(0.06, h * 0.58), beamMat);
      lat.position.copy(panel.position); lat.position.z += 0.01;
      g.add(lat);
    }
    // sliding door
    const door = new THREE.Mesh(new THREE.PlaneGeometry(doorWidth, h * 0.78), new THREE.MeshStandardMaterial({ color: 0x6d5437, roughness: 0.8 }));
    door.position.set(0, 0.76 + h * 0.42, frontZ);
    g.add(door);
    const noren = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 1.0), new THREE.MeshStandardMaterial({ map: bannerTexture('侍', '#2a2f3d', '#e8dcc4'), transparent: true, side: THREE.DoubleSide, roughness: 0.9 }));
    noren.position.set(0, 0.76 + h * 0.66, frontZ + 0.05);
    g.add(noren);

    // veranda
    const veranda = new THREE.Mesh(new THREE.BoxGeometry(w + 1.8, 0.12, 1.1), MAT.wood());
    veranda.position.set(0, 0.78, d / 2 + 0.75);
    g.add(veranda);
    for (let i = 0; i < 4; i++) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.78, 0.12), beamMat);
      post.position.set(-w / 2 + 0.3 + i * ((w - 0.6) / 3), 0.39, d / 2 + 1.25);
      g.add(post);
    }

    // roof
    const rm = roofMat || MAT.roof();
    const roof = new THREE.Mesh(this.roofGeometry(w + 1.8, d + 1.6, h * 0.55, 1.35, 1.1), rm);
    roof.position.y = 0.76 + h;
    roof.castShadow = true;
    g.add(roof);
    const ridge = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, w + 3.4, 6), MAT.darkWood());
    ridge.rotation.z = Math.PI / 2;
    ridge.position.y = 0.76 + h + h * 0.55 + 0.05;
    g.add(ridge);
    // eave trim
    for (const sz of [-1, 1]) {
      const trim = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, w + 3.6, 5), MAT.darkWood());
      trim.rotation.z = Math.PI / 2;
      trim.position.set(0, 0.76 + h + 0.02, sz * (d / 2 + 1.9));
      g.add(trim);
    }

    // hanging lanterns
    for (const sx of [-1, 1]) {
      const lan = this.makeHangingLantern();
      lan.position.set(sx * (w / 2 - 0.6), 0.76 + h * 0.72, d / 2 + 1.6);
      g.add(lan);
    }
    g.userData.width = w; g.userData.depth = d;
    this.registerCameraBlockers(g);
    return g;
  }

  makeHangingLantern() {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: 0xd8c8a8, emissive: 0xffb96e, emissiveIntensity: 0.2, roughness: 0.9 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.4, 8), mat);
    g.add(body);
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.05, 8), MAT.darkWood()).translateY(0.22));
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.05, 8), MAT.darkWood()).translateY(-0.22));
    const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.3, 4), MAT.darkWood());
    rope.position.y = 0.3;
    g.add(rope);
    this.lanterns.push({ mat, base: 0.2, light: null });
    return g;
  }

  makeStoneLantern(scale = 1, withLight = false) {
    const g = new THREE.Group();
    const stone = MAT.mossStone();
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.55, 0.28, 6), stone);
    base.position.y = 0.14; g.add(base);
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.9, 6), stone);
    post.position.y = 0.64; g.add(post);
    const plat = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.32, 0.16, 6), stone);
    plat.position.y = 1.13; g.add(plat);
    const glowMat = new THREE.MeshStandardMaterial({ color: 0xd9c295, emissive: 0xffc178, emissiveIntensity: 0.15, roughness: 0.9 });
    const box = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.36, 6), glowMat);
    box.position.y = 1.4; g.add(box);
    for (let i = 0; i < 6; i++) {
      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.4, 0.06), stone);
      const a = (i / 6) * Math.PI * 2;
      frame.position.set(Math.cos(a) * 0.29, 1.4, Math.sin(a) * 0.29);
      g.add(frame);
    }
    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.3, 6), stone);
    cap.position.y = 1.72; g.add(cap);
    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 5), stone);
    finial.position.y = 1.94; g.add(finial);
    let light = null;
    if (withLight) {
      light = new THREE.PointLight(0xffb264, 0, 9, 2);
      light.position.y = 1.4;
      g.add(light);
    }
    this.lanterns.push({ mat: glowMat, base: 0.15, light });
    g.scale.setScalar(scale);
    g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
    return g;
  }

  makeTorii(scale = 1, color = 0xa9362a, plaque = '神社') {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x241d19, roughness: 0.7 });
    for (const sx of [-1, 1]) {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.38, 4.2, 10), mat);
      pillar.position.set(sx * 1.7, 2.1, 0);
      pillar.castShadow = true;
      g.add(pillar);
      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.5, 0.4, 10), dark);
      foot.position.set(sx * 1.7, 0.2, 0);
      g.add(foot);
    }
    const top = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.24, 0.55), mat);
    top.position.y = 4.1; top.rotation.z = 0.015; g.add(top);
    const top2 = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.2, 0.4), dark);
    top2.position.y = 4.34; g.add(top2);
    for (const sx of [-1, 1]) {
      const tip = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.22, 0.5), mat);
      tip.position.set(sx * 2.4, 4.18, 0);
      tip.rotation.z = sx * -0.18;
      g.add(tip);
    }
    const second = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.22, 0.42), mat);
    second.position.y = 3.3; g.add(second);
    const plaqueMesh = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.0, 0.12), dark);
    plaqueMesh.position.y = 3.7; g.add(plaqueMesh);
    const kanjiMat = new THREE.MeshStandardMaterial({ map: glyphTexture(plaque[0] || '神', { bg: '#241d19', fg: '#e5d2ad', ring: '#b6914f' }), transparent: true, roughness: 1 });
    const kanji = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.62), kanjiMat);
    kanji.position.set(0, 3.7, 0.07);
    g.add(kanji);
    g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
    g.scale.setScalar(scale);
    return g;
  }

  makeTree(kind = 'maple', scale = 1, seasonId = 'spring') {
    const g = new THREE.Group();
    const sp = SPECIES[kind] || SPECIES.maple;
    const trunkH = (kind === 'cherry' ? 3.2 : 3.6) * scale;
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * scale, 0.36 * scale, trunkH, 6), MAT.bark());
    trunk.position.y = trunkH / 2;
    trunk.geometry.translate(0, 0, 0);
    trunk.rotation.z = (Math.random() - 0.5) * 0.12;
    trunk.castShadow = true;
    g.add(trunk);
    for (let b = 0; b < 3; b++) {
      const br = new THREE.Mesh(new THREE.CylinderGeometry(0.07 * scale, 0.16 * scale, trunkH * 0.5, 5), MAT.bark());
      const a = (b / 3) * Math.PI * 2 + Math.random();
      br.position.set(Math.cos(a) * 0.5 * scale, trunkH * 0.72, Math.sin(a) * 0.5 * scale);
      br.rotation.z = Math.cos(a) * 0.7;
      br.rotation.x = Math.sin(a) * 0.7;
      g.add(br);
    }
    if (kind === 'bamboo') {
      for (let i = 0; i < 5; i++) {
        const h = trunkH * (0.8 + Math.random() * 0.7);
        const c = new THREE.Mesh(new THREE.CylinderGeometry(0.055 * scale, 0.07 * scale, h, 5), MAT.bamboo());
        c.position.set((Math.random() - 0.5) * 1.2 * scale, h / 2, (Math.random() - 0.5) * 1.2 * scale);
        c.castShadow = true; g.add(c);
      }
      return g;
    }
    const color = sp.leaf[seasonId] ?? sp.leaf.summer;
    const clusters = kind === 'cherry' ? 5 : 4;
    const leafMeshes = [];
    for (let i = 0; i < clusters; i++) {
      const a = (i / clusters) * Math.PI * 2 + Math.random() * 0.7;
      const r = (0.35 + Math.random() * 1.0) * scale;
      const rad = (kind === 'pine' ? 1.1 : 1.35) * scale * (0.75 + Math.random() * 0.5);
      const foliage = new THREE.Mesh(new THREE.IcosahedronGeometry(rad, 1), MAT.leaf(color));
      foliage.position.set(Math.cos(a) * r, trunkH * (0.72 + Math.random() * 0.35), Math.sin(a) * r);
      foliage.scale.set(1, 0.62, 1);
      foliage.castShadow = true;
      g.add(foliage);
      leafMeshes.push(foliage);
    }
    const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(1.3 * scale, 1), MAT.leaf(color));
    crown.position.y = trunkH + 0.6 * scale;
    crown.scale.set(1, 0.7, 1);
    crown.castShadow = true;
    g.add(crown);
    leafMeshes.push(crown);
    g.userData.leafMeshes = leafMeshes;
    g.userData.kind = kind;
    this.treeFoliage.push({ group: g, kind });
    return g;
  }

  addCollider(x, z, r) { this.colliders.push({ x, z, r }); }

  addInteraction({ id, label, kanji, x, y = 2.6, z, radius = 4.6, group = null, action = null }) {
    const markerTex = glyphTexture(kanji);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: markerTex, transparent: true, depthWrite: false, depthTest: true }));
    sprite.scale.set(1.5, 1.5, 1);
    sprite.position.set(x, y, z);
    this.scene.add(sprite);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xd8b97b, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.75, 1.05, 24), ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(x, 0.06, z);
    this.scene.add(ring);
    const item = { id, label, kanji, pos: new V3(x, 0, z), radius, sprite, ring, group, action, baseY: y };
    this.interactions.push(item);
    this.markers.push(item);
    if (group) {
      group.traverse((o) => { o.userData.interactionId = id; });
      this.pickables.push(group);
    } else {
      sprite.userData.interactionId = id;
      this.pickables.push(sprite);
    }
    return item;
  }

  // ————— estate —————
  buildEstate() {
    const estate = new THREE.Group();
    this.scene.add(estate);
    this.addGroundPatch(0, 3, 30, 25, 0xc9bfa2, 0.02);

    // main house
    const house = this.makeHouse({ w: 11, d: 8, h: 3.4 });
    house.position.set(-4, 0, -13);
    estate.add(house);
    this.house = house;
    this.addCollider(-4, -13, 7.6);
    this.addInteraction({ id: 'estate-house', label: 'Enter your house — rest and save', kanji: '家', x: 0, z: -4.6, y: 3.4, group: house, radius: 4.5 });

    // workshop
    const shop = this.makeWorkshop();
    shop.position.set(15.5, 0, -6.5);
    shop.rotation.y = -0.5;
    estate.add(shop);
    this.workshop = shop;
    this.addCollider(15.5, -6.5, 5.6);
    this.addInteraction({ id: 'estate-forge', label: 'Enter the forge', kanji: '鍛', x: 12.4, z: -4.2, y: 3.6, group: shop, radius: 4.4 });

    // garden benches for bonsai
    this.bonsaiGroup = new THREE.Group();
    estate.add(this.bonsaiGroup);
    this.benchSlots = [];
    this.benches = new THREE.Group();
    estate.add(this.benches);
    const slotXs = [-7.2, -5.15, -3.1, -1.05, 1.0, 3.05, 5.1, 7.15];
    for (let row = 0; row < 2; row++) {
      const z = 0.4 + row * 4.0;
      const bench = this.makeBench(17.5, 1.15, 1.2);
      bench.position.set(0, 0, z);
      this.benches.add(bench);
      slotXs.forEach((x) => this.benchSlots.push({ x, y: 1.22, z, row }));
    }
    // plaque / marker for bonsai garden
    const gardenSign = this.makeSign('盆 栽', 'BONSAI');
    gardenSign.position.set(-3.9, 0, 9.4);
    estate.add(gardenSign);
    this.addInteraction({ id: 'estate-bonsai', label: 'Tend the bonsai garden', kanji: '盆', x: -3.9, z: 9.6, y: 2.6, group: gardenSign, radius: 4.8 });

    // pond & koi
    this.pond = this.makePond(10.5, 7.5, 4.2);
    estate.add(this.pond);
    this.addInteraction({ id: 'estate-pond', label: 'Watch the koi and clear your mind', kanji: '鯉', x: 10.5, z: 7.5, y: 2.4, radius: 4.2, group: this.pond });

    // stone lanterns
    const lanternPositions = [[-8.5, 12], [7.5, 13.5], [-14, 2], [17.5, 9]];
    lanternPositions.forEach(([x, z], i) => {
      const l = this.makeStoneLantern(1, i < 2);
      l.position.set(x, 0, z);
      estate.add(l);
    });

    // zen gravel area (unlocked as a decoration)
    const zenBase = this.buildZenArea(-16, 5);
    zenBase.visible = this.game.state.decor.includes('zen');
    estate.add(zenBase);

    // fence & gate
    this.buildFence(estate);

    // noticeboard
    const board = this.makeSign('家 計', 'ESTATE');
    board.position.set(-11.5, 0, 12.2);
    estate.add(board);
    this.addInteraction({ id: 'estate-ledger', label: 'Review your estate', kanji: '宅', x: -11.5, z: 12.2, y: 2.6, group: board, radius: 4.2 });

    // a few ornamental trees
    for (const [x, z, s] of [[-20, 14, 1.1], [21, 14, 0.95], [-21, -4, 1], [20, -17, 0.9]]) {
      const t = this.makeTree('maple', s, this.season.id);
      t.position.set(x, 0, z);
      estate.add(t);
    }

    // stone path from gate to house
    const curve = new THREE.CatmullRomCurve3([new V3(0, 0, 16), new V3(0, 0, 12), new V3(-1, 0, 8), new V3(-2.5, 0, 2), new V3(-3.5, 0, -3.5)]);
    estate.add(this.makeRibbon(curve, 2.2, 0xb9ad90));

    // heirloom pedestal (decorative)
    const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 0.6, 8), MAT.stone());
    pedestal.position.set(4.5, 0.3, 11);
    estate.add(pedestal);
    const plaque = this.makeSign('家 宝', 'HEIRLOOM');
    plaque.position.set(4.5, 0, 11.7);
    plaque.scale.setScalar(0.7);
    estate.add(plaque);

    // forge smoke origin
    this.forgeSmokeOrigin = new V3(17.6, 6.5, -5.5);
    this.chimneySmokeOrigin = new V3(18.2, 7.8, -4.4);
  }

  makeBench(length, height, depth) {
    const g = new THREE.Group();
    const top = new THREE.Mesh(new THREE.BoxGeometry(length, 0.14, depth), MAT.wood());
    top.position.y = height;
    top.castShadow = true; top.receiveShadow = true;
    g.add(top);
    const rail = new THREE.Mesh(new THREE.BoxGeometry(length, 0.1, 0.1), MAT.darkWood());
    rail.position.set(0, height - 0.4, -depth / 2 + 0.06);
    g.add(rail);
    for (let i = 0; i < 5; i++) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.16, height, 0.16), MAT.darkWood());
      leg.position.set(-length / 2 + 0.5 + i * ((length - 1) / 4), height / 2, 0);
      leg.castShadow = true;
      g.add(leg);
    }
    return g;
  }

  makePond(x, z, r) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    const rockMat = MAT.mossStone();
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2 + Math.random() * 0.2;
      const rr = r + 0.2 + Math.random() * 0.5;
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.45 + Math.random() * 0.5, 0), rockMat);
      rock.position.set(Math.cos(a) * rr, 0.2, Math.sin(a) * rr);
      rock.scale.y = 0.6;
      rock.castShadow = true;
      g.add(rock);
    }
    const waterGeo = new THREE.CircleGeometry(r, 40);
    const uniforms = { time: { value: 0 }, deep: { value: new THREE.Color(0x1e4b52) }, shallow: { value: new THREE.Color(0x6aa0a0) } };
    const waterMat = new THREE.ShaderMaterial({
      uniforms, transparent: true,
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `
        uniform float time; uniform vec3 deep; uniform vec3 shallow; varying vec2 vUv;
        void main() {
          vec2 p = vUv - 0.5;
          float ripple = sin(p.x*42.0 + time*1.4) * cos(p.y*36.0 - time*1.1) * 0.5 + 0.5;
          float ripple2 = sin((p.x+p.y)*70.0 - time*2.2)*0.5+0.5;
          vec3 col = mix(deep, shallow, ripple*0.35 + ripple2*0.18);
          float edge = smoothstep(0.5, 0.42, length(p));
          col += vec3(0.4,0.6,0.5) * pow(ripple2, 12.0) * 0.3;
          gl_FragColor = vec4(col, 0.92);
        }
      `,
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0.08;
    g.add(water);
    this.waterMats = this.waterMats || [];
    this.waterMats.push(uniforms);
    // lily pads
    for (let i = 0; i < 7; i++) {
      const pad = new THREE.Mesh(new THREE.CircleGeometry(0.28 + Math.random() * 0.22, 8), new THREE.MeshStandardMaterial({ color: 0x4f7a3d, roughness: 0.9, side: THREE.DoubleSide }));
      pad.rotation.x = -Math.PI / 2;
      const a = Math.random() * Math.PI * 2, rr = Math.random() * r * 0.75;
      pad.position.set(Math.cos(a) * rr, 0.11, Math.sin(a) * rr);
      g.add(pad);
    }
    // koi
    const koiColors = [0xd05a2a, 0xf0c26a, 0xe8e0d0, 0xc23a2a];
    for (let i = 0; i < 5; i++) {
      const k = new THREE.Group();
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), new THREE.MeshStandardMaterial({ color: koiColors[i % 4], roughness: 0.5 }));
      body.scale.set(1.7, 0.7, 0.8);
      k.add(body);
      const tail = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.24, 5), new THREE.MeshStandardMaterial({ color: koiColors[i % 4], roughness: 0.5 }));
      tail.rotation.z = Math.PI / 2;
      tail.position.x = -0.27;
      k.add(tail);
      k.position.y = 0.06;
      g.add(k);
      this.koi.push({ mesh: k, r: 0.6 + Math.random() * r * 0.6, phase: Math.random() * Math.PI * 2, speed: 0.18 + Math.random() * 0.2 });
    }
    return g;
  }

  buildZenArea(x, z) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    const gravel = new THREE.Mesh(new THREE.CircleGeometry(4, 32), new THREE.MeshStandardMaterial({ color: 0xe1dcc9, roughness: 1 }));
    gravel.rotation.x = -Math.PI / 2;
    gravel.position.y = 0.03;
    g.add(gravel);
    for (let i = 0; i < 9; i++) {
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.5 + i * 0.32, 0.55 + i * 0.32, 32), new THREE.MeshBasicMaterial({ color: 0xc1b9a2, side: THREE.DoubleSide }));
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.04;
      g.add(ring);
    }
    for (const [dx, dz, s] of [[0, 0, 0.9], [1.6, 1.2, 0.55], [-1.4, -0.7, 0.45]]) {
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 1), new THREE.MeshStandardMaterial({ color: 0x777468, roughness: 0.9, flatShading: true }));
      rock.position.set(dx, s * 0.4, dz);
      rock.scale.y = 0.8;
      rock.castShadow = true;
      g.add(rock);
    }
    g.visible = false;
    return g;
  }

  buildFence(parent) {
    const g = new THREE.Group();
    const w = 34, d = 28;
    const postMat = MAT.darkWood();
    const railMat = MAT.wood();
    for (let i = 0; i < 15; i++) {
      const x = -w / 2 + (i / 14) * w;
      if (i === 7) continue;
      for (const z of [-d / 2 + 2, d / 2]) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.3, 0.16), postMat);
        post.position.set(x, 0.65, z);
        post.castShadow = true;
        g.add(post);
      }
    }
    for (const z of [-d / 2 + 2, d / 2]) {
      for (const y of [0.45, 0.95]) {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(w, 0.09, 0.09), railMat);
        rail.position.set(0, y, z);
        g.add(rail);
      }
    }
    for (let i = 0; i < 9; i++) {
      const z = -d / 2 + 2 + (i / 8) * d;
      for (const x of [-w / 2, w / 2]) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.3, 0.16), postMat);
        post.position.set(x, 0.65, z);
        g.add(post);
      }
    }
    for (const x of [-w / 2, w / 2]) {
      for (const y of [0.45, 0.95]) {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, d), railMat);
        rail.position.set(x, y, 0);
        g.add(rail);
      }
    }
    // gate at front
    const gate = this.makeGate();
    gate.position.set(0, 0, d / 2);
    g.add(gate);
    parent.add(g);
  }

  makeGate() {
    const g = new THREE.Group();
    for (const sx of [-1, 1]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.32, 2.7, 0.32), MAT.darkWood());
      post.position.set(sx * 2.3, 1.35, 0);
      post.castShadow = true;
      g.add(post);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.16, 0.52), MAT.wood());
      cap.position.set(sx * 2.3, 2.78, 0);
      g.add(cap);
      const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.34, 0.22), new THREE.MeshStandardMaterial({ color: 0xd9c295, emissive: 0xffb264, emissiveIntensity: 0.15, roughness: 0.9 }));
      lamp.position.set(sx * 2.3, 3.02, 0);
      g.add(lamp);
    }
    return g;
  }

  makeWorkshop() {
    const g = new THREE.Group();
    // open-front workshop built from beams
    const base = new THREE.Mesh(new THREE.BoxGeometry(8, 0.4, 7), MAT.stone());
    base.position.y = 0.2;
    base.receiveShadow = true;
    g.add(base);
    const floor = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.2, 7.2), MAT.wood());
    floor.position.y = 0.5;
    g.add(floor);
    for (const [x, z] of [[-3.7, -3.1], [3.7, -3.1], [-3.7, 3.1], [3.7, 3.1], [0, -3.1], [0, 3.1]]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.28, 3.6, 0.28), MAT.darkWood());
      post.position.set(x, 2.3, z);
      post.castShadow = true;
      g.add(post);
    }
    // back wall
    const wall = new THREE.Mesh(new THREE.BoxGeometry(7.7, 3.1, 0.2), new THREE.MeshStandardMaterial({ color: 0xd8c7a6, roughness: 1 }));
    wall.position.set(0, 2.2, -3.2);
    g.add(wall);
    const roof = new THREE.Mesh(this.roofGeometry(8.6, 7.6, 1.4, 0.9, 0.6), MAT.roofWarm());
    roof.position.y = 4.25;
    roof.castShadow = true;
    g.add(roof);
    const ridge = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 10.2, 6), MAT.darkWood());
    ridge.rotation.z = Math.PI / 2;
    ridge.position.y = 5.62;
    g.add(ridge);
    // side walls
    for (const sx of [-1, 1]) {
      const sw = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.8, 6.2), new THREE.MeshStandardMaterial({ color: 0xbfae8e, roughness: 1 }));
      sw.position.set(sx * 3.8, 2.0, 0);
      g.add(sw);
    }
    // forge hearth
    const hearth = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.3, 1.5), MAT.stone());
    hearth.position.set(-1.2, 1.15, -1.5);
    hearth.castShadow = true;
    g.add(hearth);
    const fireMat = new THREE.MeshStandardMaterial({ color: 0xff7b25, emissive: 0xff5a10, emissiveIntensity: 2.0, roughness: 0.8 });
    const fire = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.25, 0.7), fireMat);
    fire.position.set(-1.2, 1.75, -1.5);
    g.add(fire);
    this.forgeFire = fireMat;
    const forgeLight = new THREE.PointLight(0xff7a2a, 2.2, 13, 2);
    forgeLight.position.set(-1.2, 2.2, -1.2);
    g.add(forgeLight);
    this.forgeLight = forgeLight;
    // hood
    const hood = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 1.4, 2.4, 4), MAT.stone());
    hood.position.set(-1.2, 3.6, -2.1);
    g.add(hood);
    // anvil
    const anvilBase = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.5, 0.5, 8), MAT.darkWood());
    anvilBase.position.set(2.0, 0.85, -1.0);
    g.add(anvilBase);
    const anvil = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.3, 0.44), new THREE.MeshStandardMaterial({ color: 0x4a4d52, metalness: 0.8, roughness: 0.4 }));
    anvil.position.set(2.0, 1.2, -1.0);
    anvil.castShadow = true;
    g.add(anvil);
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.5, 8), new THREE.MeshStandardMaterial({ color: 0x4a4d52, metalness: 0.8, roughness: 0.4 }));
    horn.rotation.z = -Math.PI / 2;
    horn.position.set(2.65, 1.2, -1.0);
    g.add(horn);
    // hammer leaning
    const hammerHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.1, 5), MAT.wood());
    hammerHandle.position.set(2.55, 1.7, -0.55);
    hammerHandle.rotation.z = 0.35;
    g.add(hammerHandle);
    const hammerHead = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.16, 0.16), new THREE.MeshStandardMaterial({ color: 0x55585d, metalness: 0.7, roughness: 0.4 }));
    hammerHead.position.set(2.74, 2.2, -0.55);
    g.add(hammerHead);
    // quench trough
    const trough = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.55, 1.0), MAT.darkWood());
    trough.position.set(2.2, 0.85, 2.0);
    g.add(trough);
    const troughWater = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.05, 0.8), new THREE.MeshStandardMaterial({ color: 0x3d6570, metalness: 0.4, roughness: 0.2 }));
    troughWater.position.set(2.2, 1.13, 2.0);
    g.add(troughWater);
    // tool rack
    for (let i = 0; i < 4; i++) {
      const tool = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.2, 5), i % 2 ? MAT.darkWood() : MAT.wood());
      tool.position.set(-3.5, 2.0, -2.6 + i * 0.5);
      tool.rotation.x = 0.2;
      g.add(tool);
    }
    // stash of charcoal
    for (let i = 0; i < 7; i++) {
      const coal = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18 + Math.random() * 0.12, 0), new THREE.MeshStandardMaterial({ color: 0x242220, roughness: 1, flatShading: true }));
      coal.position.set(-3.2 + Math.random() * 0.8, 0.7 + Math.random() * 0.4, 1.3 + Math.random() * 0.6);
      g.add(coal);
    }
    // weapon display shelf
    this.weaponRackGroup = new THREE.Group();
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.16, 1.0), MAT.wood());
    shelf.position.set(-1.2, 1.25, 2.6);
    this.weaponRackGroup.add(shelf);
    for (const sx of [-2.2, 2.2]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.25, 0.8), MAT.darkWood());
      leg.position.set(-1.2 + sx, 0.63, 2.6);
      this.weaponRackGroup.add(leg);
    }
    this.weaponRackGroup.position.set(0, 0, 0);
    g.add(this.weaponRackGroup);
    // workshop sign
    const sign = this.makeSign('鍛 冶', 'FORGE');
    sign.position.set(0, 0, 4.2);
    sign.scale.setScalar(0.8);
    g.add(sign);
    this.registerCameraBlockers(g);
    return g;
  }

  makeSign(text, sub) {
    const tex = canvasTex(512, 160, (ctx, w, h) => {
      ctx.fillStyle = '#3a2a1c'; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#b99a62'; ctx.lineWidth = 6; ctx.strokeRect(8, 8, w - 16, h - 16);
      ctx.fillStyle = '#eeddb8'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = `500 66px 'Shippori Mincho', serif`;
      ctx.fillText(text, w / 2, h * 0.42);
      ctx.font = `500 27px 'Cormorant Garamond', serif`;
      ctx.fillStyle = '#c6ae82';
      ctx.fillText(sub, w / 2, h * 0.78);
    });
    const g = new THREE.Group();
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.8, 0.15), MAT.darkWood());
    post.position.y = 0.9;
    g.add(post);
    const board = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.66, 0.1), new THREE.MeshStandardMaterial({ color: 0x4a3725, roughness: 0.9 }));
    board.position.y = 1.85;
    g.add(board);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 0.6), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 }));
    face.position.set(0, 1.85, 0.06);
    g.add(face);
    g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
    return g;
  }

  // ————— auction grounds —————
  buildAuction() {
    const loc = LOCATIONS.auction;
    const g = new THREE.Group();
    g.position.set(loc.x, 0, loc.z);
    this.scene.add(g);
    this.auctionGroup = g;

    // torii entrance
    const torii = this.makeTorii(1.5, 0xa9362a, '競');
    torii.position.set(0, 0, -16);
    g.add(torii);

    // wooden stage
    const stage = new THREE.Mesh(new THREE.BoxGeometry(16, 0.9, 8), MAT.wood());
    stage.position.set(0, 0.45, 7);
    stage.castShadow = true; stage.receiveShadow = true;
    g.add(stage);
    const stageTop = new THREE.Mesh(new THREE.BoxGeometry(16.6, 0.2, 8.6), MAT.darkWood());
    stageTop.position.set(0, 0.98, 7);
    g.add(stageTop);
    for (let i = 0; i < 5; i++) {
      const step = new THREE.Mesh(new THREE.BoxGeometry(16, 0.18, 0.8), MAT.wood());
      step.position.set(0, 0.09 + i * 0.17, 2.2 - i * 0.25);
      g.add(step);
    }
    // red back curtain
    const curtain = new THREE.Mesh(new THREE.PlaneGeometry(14, 5), new THREE.MeshStandardMaterial({ color: 0x7e241d, side: THREE.DoubleSide, roughness: 0.9 }));
    curtain.position.set(0, 3.6, 10.8);
    g.add(curtain);
    const curtainKanji = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 3.2), new THREE.MeshStandardMaterial({ map: glyphTexture('競', { bg: 'rgba(60,18,15,0)', fg: '#e8d0a8', ring: '#c9a45c' }), transparent: true }));
    curtainKanji.position.set(0, 3.9, 10.7);
    g.add(curtainKanji);
    // banner poles
    for (const sx of [-1, 1]) {
      for (const z of [2.5, 9]) {
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 8, 8), MAT.darkWood());
        pole.position.set(sx * 8.2, 4, z);
        pole.castShadow = true;
        g.add(pole);
        const banner = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 4.4), new THREE.MeshStandardMaterial({ map: bannerTexture(sx > 0 ? '売' : '買', '#a3312a', '#f1e2c4'), side: THREE.DoubleSide, roughness: 0.9 }));
        banner.position.set(sx * 8.2, 5.3, z + 0.05);
        g.add(banner);
        // hanging lantern string anchors
      }
    }
    // lantern strings
    for (let i = 0; i < 8; i++) {
      const t = i / 7;
      const x = -8.2 + t * 16.4;
      const y = 5.8 - Math.sin(t * Math.PI) * 1.1;
      const lan = this.makeHangingLantern();
      lan.scale.setScalar(0.7);
      lan.position.set(x, y, 6);
      g.add(lan);
    }
    // auctioneer podium
    const podium = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.4, 1.0), MAT.darkWood());
    podium.position.set(2.2, 1.7, 5.2);
    g.add(podium);
    // gavel
    const gav = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.8, 6), MAT.wood());
    gav.position.set(2.6, 2.4, 5.3);
    gav.rotation.x = 0.3;
    g.add(gav);
    // audience benches
    for (let row = 0; row < 3; row++) {
      for (let i = 0; i < 4; i++) {
        const bench = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.12, 0.6), MAT.wood());
        bench.position.set(-7 + i * 4.6, 0.6, -4 - row * 2.4);
        bench.castShadow = true;
        g.add(bench);
      }
    }
    // stalls
    for (const sx of [-1, 1]) {
      const stall = this.makeStall(sx > 0 ? '茶' : '団子');
      stall.position.set(sx * 12, 0, 2);
      stall.rotation.y = sx > 0 ? -0.5 : 0.5;
      g.add(stall);
    }
    // scattered lanterns
    for (const [x, z] of [[-10, -8], [10, -8], [-11, 10], [11, 10]]) {
      const l = this.makeStoneLantern(0.9, true);
      l.position.set(x, 0, z);
      g.add(l);
    }
    // crowd
    const npcs = [
      ['samurai', -6, -2, 0.2], ['merchant', -2, -4, -0.3], ['noble', 2, -3, 0.1],
      ['samurai', 6, -5, -0.2], ['merchant', -5, -7, 0.3], ['noble', 4, -8, 0],
      ['monk', 8, -2, -0.4],
    ];
    for (const [type, x, z, ry] of npcs) {
      const n = this.makePerson(type);
      n.position.set(x, 0, z);
      n.rotation.y = ry + Math.PI;
      g.add(n);
      this.npcs.push({ group: n, type, base: n.position.y, phase: Math.random() * 6 });
    }
    // auctioneer npc
    const auct = this.makePerson('merchant');
    auct.position.set(2.2, 1.05, 6.2);
    auct.rotation.y = Math.PI;
    g.add(auct);
    this.npcs.push({ group: auct, type: 'merchant', base: 1.05, phase: 2 });
    this.auctionNpc = auct;

    this.addCollider(loc.x, loc.z + 7, 9);
    this.addInteraction({ id: 'auction', label: 'Speak with the auctioneer', kanji: '競', x: loc.x + 2.2, z: loc.z + 3.0, y: 4.2, group: stage, radius: 5.5 });
  }

  makeStall(kanji) {
    const g = new THREE.Group();
    const counter = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.1, 1.2), MAT.wood());
    counter.position.y = 0.55;
    counter.castShadow = true;
    g.add(counter);
    for (const sx of [-1.5, 1.5]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 3.2, 6), MAT.darkWood());
      post.position.set(sx, 1.6, -0.4);
      g.add(post);
    }
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.1, 2.2), new THREE.MeshStandardMaterial({ map: bannerTexture(kanji, '#b8432f', '#f2e3c6'), side: THREE.DoubleSide }));
    canopy.position.set(0, 3.2, 0);
    canopy.rotation.x = 0.1;
    g.add(canopy);
    // crates
    for (let i = 0; i < 3; i++) {
      const crate = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.5), MAT.wood());
      crate.position.set(-1.0 + i * 0.6, 0.2, 0.9);
      g.add(crate);
    }
    const noren = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.8), new THREE.MeshStandardMaterial({ map: bannerTexture(kanji, '#2c3545', '#efe3c9'), side: THREE.DoubleSide }));
    noren.position.set(0, 2.5, 0.75);
    g.add(noren);
    this.registerCameraBlockers(g);
    return g;
  }

  // ————— village —————
  buildVillage() {
    const loc = LOCATIONS.village;
    const g = new THREE.Group();
    g.position.set(loc.x, 0, loc.z);
    this.scene.add(g);
    this.villageGroup = g;

    const houses = [
      [-14, -6, 0.2, 7, 6, 0x4d4038], [14, -7, -0.2, 7, 6, 0x4a3d35],
      [-13, 10, 0.5, 6, 5, 0x353b42], [14, 10, -0.35, 7, 6, 0x3c4148],
    ];
    houses.forEach(([x, z, ry, w, d, roof], i) => {
      const h = this.makeHouse({ w, d, h: 2.7, roofMat: new THREE.MeshStandardMaterial({ color: roof, roughness: 0.8, side: THREE.DoubleSide, flatShading: true }) });
      h.position.set(x, 0, z);
      h.rotation.y = ry;
      g.add(h);
      this.addCollider(loc.x + x, loc.z + z, Math.max(w, d) * 0.62);
    });

    // well
    const well = new THREE.Group();
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.9, 0.7, 10), MAT.stone());
    rim.position.y = 0.35; well.add(rim);
    const water = new THREE.Mesh(new THREE.CircleGeometry(0.7, 12), new THREE.MeshStandardMaterial({ color: 0x2c4d55, roughness: 0.2, metalness: 0.3 }));
    water.rotation.x = -Math.PI / 2; water.position.y = 0.68; well.add(water);
    for (const sx of [-1, 1]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.2, 0.12), MAT.darkWood());
      post.position.set(sx * 0.8, 1.1, 0); well.add(post);
    }
    const roof = new THREE.Mesh(this.roofGeometry(2.2, 1.6, 0.65, 0.3, 0.15), MAT.roof());
    roof.position.y = 2.25; well.add(roof);
    well.position.set(-2, 0, 2);
    g.add(well);

    // market stall
    const stall = this.makeStall('市');
    stall.position.set(9, 0, 2);
    stall.rotation.y = -0.9;
    g.add(stall);
    // goods on stall
    for (let i = 0; i < 6; i++) {
      const pot = createBonsai({ sp: 'maple', age: 0.8, style: 5, pot: 0, variant: i, health: 90, water: 60 }, this.season.id, { scale: 0.75 });
      pot.position.set(9 + (i % 3 - 1) * 0.7, 1.15, 2 + Math.floor(i / 3) * 0.5);
      pot.scale.setScalar(0.5);
      pot.rotation.y = Math.random();
      g.add(pot);
    }
    // crates, barrels
    for (let i = 0; i < 5; i++) {
      const crate = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.6, 0.7), MAT.wood());
      crate.position.set(-15 + Math.random() * 8, 0.3, 15 + Math.random() * 3);
      crate.rotation.y = Math.random();
      crate.castShadow = true;
      g.add(crate);
    }
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.5, 1.1, 10), MAT.wood());
    barrel.position.set(13.5, 0.55, 8);
    g.add(barrel);
    // villagers
    const npcs = [['merchant', 9.2, 4.8, -0.6], ['merchant', -6, 8, 2.4], ['monk', 3, 11, 3.1], ['samurai', -12, 4, 0.6]];
    for (const [type, x, z, ry] of npcs) {
      const n = this.makePerson(type);
      n.position.set(x, 0, z);
      n.rotation.y = ry;
      g.add(n);
      this.npcs.push({ group: n, type, base: 0, phase: Math.random() * 6 });
    }
    // cat
    const cat = new THREE.Group();
    const catBody = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), new THREE.MeshStandardMaterial({ color: 0xddc8a8, roughness: 1 }));
    catBody.scale.set(1.5, 0.8, 1);
    catBody.position.y = 0.16; cat.add(catBody);
    const catHead = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), new THREE.MeshStandardMaterial({ color: 0xddc8a8, roughness: 1 }));
    catHead.position.set(0.3, 0.3, 0); cat.add(catHead);
    for (const sx of [-1, 1]) {
      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.1, 4), new THREE.MeshStandardMaterial({ color: 0xddc8a8 }));
      ear.position.set(0.3, 0.42, sx * 0.07); cat.add(ear);
    }
    cat.position.set(7.4, 0.8, 3.4);
    g.add(cat);
    this.cat = cat;

    // lanterns & trees
    for (const [x, z] of [[-18, 8], [3, 18], [16, 10]]) {
      const l = this.makeStoneLantern(0.9, true);
      l.position.set(x, 0, z);
      g.add(l);
    }
    for (const [x, z, s] of [[-20, 16, 1], [18, 18, 0.9]]) {
      const t = this.makeTree('cherry', s, this.season.id);
      t.position.set(x, 0, z);
      g.add(t);
    }

    this.addInteraction({ id: 'village-market', label: 'Trade with the village merchant', kanji: '市', x: loc.x + 9, z: loc.z + 5.5, y: 3.2, group: stall, radius: 4.8 });
    this.addInteraction({ id: 'village-elder', label: 'Ask the village elder for work', kanji: '翁', x: loc.x - 6, z: loc.z + 8, y: 2.6, group: null, radius: 4.2 });
  }

  // ————— temple —————
  buildTemple() {
    const loc = LOCATIONS.temple;
    const g = new THREE.Group();
    g.position.set(loc.x, 0, loc.z);
    this.scene.add(g);
    this.templeGroup = g;

    const torii = this.makeTorii(1.7, 0xa9362a, '寺');
    torii.position.set(0, 0, 20);
    g.add(torii);

    // approach stones
    const pathCurve = new THREE.CatmullRomCurve3([new V3(0, 0, 18), new V3(0, 0, 8), new V3(0, 0, -4), new V3(0, 0, -10)]);
    g.add(this.makeRibbon(pathCurve, 3.2, 0xc2b9a4));

    // main hall
    const hall = this.makeHouse({ w: 15, d: 10, h: 4.2 });
    hall.position.set(0, 0, -16);
    g.add(hall);
    // red pillars front
    for (let i = 0; i < 5; i++) {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 4.2, 8), MAT.vermilion());
      p.position.set(-6 + i * 3, 2.1, -10.6);
      p.castShadow = true;
      g.add(p);
    }
    const hallSign = this.makeSign('静 鐘 寺', 'THE QUIET BELL');
    hallSign.position.set(0, 4.5, -10.5);
    hallSign.scale.setScalar(1.2);
    g.add(hallSign);
    this.addCollider(loc.x, loc.z - 16, 9.5);

    // pagoda
    const pagoda = this.makePagoda();
    pagoda.position.set(-16, 0, -20);
    g.add(pagoda);
    this.addCollider(loc.x - 16, loc.z - 20, 5);

    // bell tower
    const bellTower = new THREE.Group();
    for (const [x, z] of [[-2.2, -2.2], [2.2, -2.2], [-2.2, 2.2], [2.2, 2.2]]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.25, 4.4, 0.25), MAT.vermilion());
      post.position.set(x, 2.2, z);
      post.castShadow = true;
      bellTower.add(post);
    }
    const bRoof = new THREE.Mesh(this.roofGeometry(5.6, 5.6, 1.8, 0.9, 0.7), MAT.roof());
    bRoof.position.y = 4.5;
    bellTower.add(bRoof);
    const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.7, 1.3, 12), new THREE.MeshStandardMaterial({ color: 0x6d6748, metalness: 0.8, roughness: 0.45 }));
    bell.position.y = 3.4;
    bellTower.add(bell);
    const bellRing = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.06, 6, 12), new THREE.MeshStandardMaterial({ color: 0x5a5538, metalness: 0.8, roughness: 0.5 }));
    bellRing.position.y = 4.0;
    bellTower.add(bellRing);
    bellTower.position.set(14, 0, -6);
    g.add(bellTower);
    this.bell = bell;
    this.addInteraction({ id: 'temple-bell', label: 'Ring the bell and meditate', kanji: '鐘', x: loc.x + 14, z: loc.z - 1.5, y: 5.6, radius: 4.4, group: bellTower });

    // incense burner & smoke
    const incense = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, 1.0, 10), new THREE.MeshStandardMaterial({ color: 0x4b4436, metalness: 0.5, roughness: 0.7 }));
    incense.position.set(6, 0.5, -8);
    g.add(incense);
    const incenseFire = new THREE.PointLight(0xffaa55, 0.7, 4, 2);
    incenseFire.position.set(6, 1.3, -8);
    g.add(incenseFire);
    this.incenseOrigin = new V3(loc.x + 6, 1.5, loc.z - 8);

    // monk
    const monk = this.makePerson('monk');
    monk.position.set(3, 0, -7);
    monk.rotation.y = 0.4;
    g.add(monk);
    this.npcs.push({ group: monk, type: 'monk', base: 0, phase: 1.2 });
    this.addInteraction({ id: 'temple-monk', label: 'Speak with the abbot', kanji: '僧', x: loc.x + 3, z: loc.z - 5.5, y: 2.6, radius: 4.4 });

    // jizo statues
    for (let i = 0; i < 4; i++) {
      const j = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.7, 7), MAT.stone());
      body.position.y = 0.35; j.add(body);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.16, 7, 6), MAT.stone());
      head.position.y = 0.82; j.add(head);
      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.18, 6), MAT.vermilion());
      cap.position.y = 0.98; j.add(cap);
      j.position.set(-8 + i * 1.6, 0, 10);
      g.add(j);
    }
    // lanterns & trees
    for (const [x, z] of [[-8, 12], [8, 12], [-10, -2], [11, -2]]) {
      const l = this.makeStoneLantern(1.1, true);
      l.position.set(x, 0, z);
      g.add(l);
    }
    for (const [x, z, s] of [[-18, 10, 1.2], [18, 12, 1.1], [-22, -6, 1], [21, -14, 0.9]]) {
      const t = this.makeTree('cherry', s, this.season.id);
      t.position.set(x, 0, z);
      g.add(t);
    }
  }

  makePagoda() {
    const g = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(8, 0.8, 8), MAT.stone());
    base.position.y = 0.4;
    g.add(base);
    let y = 0.8;
    for (let i = 0; i < 5; i++) {
      const w = 7 - i * 0.9;
      const body = new THREE.Mesh(new THREE.BoxGeometry(w * 0.62, 1.5, w * 0.62), i % 2 ? MAT.vermilion() : new THREE.MeshStandardMaterial({ color: 0xd9ccb0, roughness: 0.9 }));
      body.position.y = y + 0.75;
      body.castShadow = true;
      g.add(body);
      const roof = new THREE.Mesh(this.roofGeometry(w, w, 1.1, 0.7, 0.55), MAT.roof());
      roof.position.y = y + 1.55;
      roof.castShadow = true;
      g.add(roof);
      const trim = new THREE.Mesh(new THREE.BoxGeometry(w + 1.4, 0.12, w + 1.4), MAT.darkWood());
      trim.position.y = y + 1.5;
      g.add(trim);
      y += 2.1;
    }
    const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 2.6, 6), MAT.gold());
    spire.position.y = y + 0.2;
    g.add(spire);
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.22 - i * 0.04, 0.04, 4, 10), MAT.gold());
      ring.rotation.x = Math.PI / 2;
      ring.position.y = y - 0.2 + i * 0.35;
      g.add(ring);
    }
    this.registerCameraBlockers(g);
    return g;
  }

  // ————— bamboo forest & oni gate —————
  buildBamboo() {
    const loc = LOCATIONS.bamboo;
    const g = new THREE.Group();
    g.position.set(loc.x, 0, loc.z);
    this.scene.add(g);
    this.bambooGroup = g;

    // ground moss
    const moss = new THREE.Mesh(new THREE.CircleGeometry(23, 36), new THREE.MeshStandardMaterial({ color: 0x536b42, roughness: 1, transparent: true, opacity: 0.85 }));
    moss.rotation.x = -Math.PI / 2;
    moss.position.y = 0.015;
    g.add(moss);
    // path
    const pathCurve = new THREE.CatmullRomCurve3([new V3(0, 0, 20), new V3(-2, 0, 10), new V3(-5, 0, 0), new V3(-2, 0, -8), new V3(3, 0, -14)]);
    g.add(this.makeRibbon(pathCurve, 2.0, 0xa9a184));

    // bamboo instancing
    const culmGeo = new THREE.CylinderGeometry(0.055, 0.095, 1, 5);
    culmGeo.translate(0, 0.5, 0);
    const culmMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, flatShading: true });
    const leafGeo = new THREE.IcosahedronGeometry(0.75, 0);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, flatShading: true });
    const count = 300;
    const culms = new THREE.InstancedMesh(culmGeo, culmMat, count);
    const leaves = new THREE.InstancedMesh(leafGeo, leafMat, count * 3);
    const dummy = new THREE.Object3D();
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.55) * 20;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      if (Math.abs(x) < 3.5 && z > -12 && z < 18) { /* allow path */ }
      const h = 7 + Math.random() * 8;
      dummy.position.set(x, 0, z);
      dummy.rotation.set(0, Math.random() * 6, (Math.random() - 0.5) * 0.06);
      dummy.scale.set(1, h, 1);
      dummy.updateMatrix();
      culms.setMatrixAt(i, dummy.matrix);
      c.setHSL(0.19 + Math.random() * 0.05, 0.32 + Math.random() * 0.2, 0.34 + Math.random() * 0.14);
      culms.setColorAt(i, c);
      for (let j = 0; j < 3; j++) {
        const idx = i * 3 + j;
        dummy.position.set(x + (Math.random() - 0.5) * 2, h * (0.6 + Math.random() * 0.4), z + (Math.random() - 0.5) * 2);
        dummy.rotation.set(Math.random(), Math.random() * 6, Math.random());
        dummy.scale.set(1.1, 0.4, 1.1).multiplyScalar(0.8 + Math.random() * 0.7);
        dummy.updateMatrix();
        leaves.setMatrixAt(idx, dummy.matrix);
        c.setHSL(0.2 + Math.random() * 0.04, 0.35, 0.28 + Math.random() * 0.14);
        leaves.setColorAt(idx, c);
      }
    }
    culms.castShadow = true;
    leaves.castShadow = true;
    g.add(culms, leaves);
    this.bambooInstances = { culms, leaves };

    // hidden shrine
    const shrine = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.5, 2.6), MAT.stone());
    base.position.y = 0.25; shrine.add(base);
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.8, 1.8), new THREE.MeshStandardMaterial({ color: 0x3c3127, roughness: 0.9 }));
    body.position.y = 1.35; shrine.add(body);
    const sroof = new THREE.Mesh(this.roofGeometry(3.6, 2.8, 1.1, 0.7, 0.4), MAT.roof());
    sroof.position.y = 2.3; shrine.add(sroof);
    const offering = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.3, 6), MAT.gold());
    offering.position.set(0, 0.65, 1.0); shrine.add(offering);
    shrine.position.set(4, 0, -14);
    shrine.rotation.y = -0.4;
    g.add(shrine);
    this.shrine = shrine;

    // oni gate
    const gate = new THREE.Group();
    const gateMat = new THREE.MeshStandardMaterial({ color: 0x271219, roughness: 0.55, emissive: 0x3d0a14, emissiveIntensity: 0.25 });
    for (const sx of [-1, 1]) {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.42, 5.2, 8), gateMat);
      pillar.position.set(sx * 2.0, 2.6, 0);
      pillar.castShadow = true;
      gate.add(pillar);
    }
    const top = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.3, 0.6), gateMat);
    top.position.y = 5.1; gate.add(top);
    const top2 = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.24, 0.42), gateMat);
    top2.position.y = 4.4; gate.add(top2);
    for (const sx of [-1, 1]) {
      const tip = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.26, 0.5), gateMat);
      tip.position.set(sx * 2.6, 5.2, 0);
      tip.rotation.z = sx * -0.2;
      gate.add(tip);
      const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.24, 8, 6), new THREE.MeshStandardMaterial({ color: 0x8b1f2c, emissive: 0xc01f35, emissiveIntensity: 0.2 }));
      lantern.position.set(sx * 1.7, 3.6, 0.2);
      gate.add(lantern);
      this.lanterns.push({ mat: lantern.material, base: 0.2, light: null });
    }
    const oniLight = new THREE.PointLight(0xc02040, 0, 16, 2);
    oniLight.position.set(0, 2.5, 0);
    gate.add(oniLight);
    this.oniLight = oniLight;
    const oniSign = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.4), new THREE.MeshStandardMaterial({ map: glyphTexture('鬼', { bg: 'rgba(20,4,8,.9)', fg: '#cf5c5c', ring: '#a3312a' }), transparent: true }));
    oniSign.position.set(0, 3.8, 0.35);
    gate.add(oniSign);
    gate.position.set(7, 0, -15);
    gate.rotation.y = -0.4;
    g.add(gate);
    this.oniGate = gate;
    this.oniGatePos = new V3(loc.x + 7, 0, loc.z - 15);

    // oni NPC (hidden during day)
    const oni = this.makePerson('oni');
    oni.position.set(7.6, 0, -13);
    oni.rotation.y = 0.4;
    oni.visible = false;
    g.add(oni);
    this.oniNpc = oni;
    this.npcs.push({ group: oni, type: 'oni', base: 0, phase: 3 });

    // bamboo gather marker
    const gatherSpot = new THREE.Group();
    const bundle = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.35, 1.2, 6), MAT.bamboo());
    bundle.position.y = 0.6;
    bundle.rotation.z = 0.12;
    gatherSpot.add(bundle);
    for (let i = 0; i < 3; i++) {
      const c2 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 1.4, 5), MAT.bamboo());
      c2.position.set(-0.3 + i * 0.3, 0.7, 0.2 * (i % 2));
      c2.rotation.z = (i - 1) * 0.18;
      gatherSpot.add(c2);
    }
    gatherSpot.position.set(-4, 0, 12);
    g.add(gatherSpot);

    this.addInteraction({ id: 'bamboo-gather', label: 'Harvest bamboo and forest seeds', kanji: '竹', x: loc.x - 4, z: loc.z + 12, y: 2.4, group: gatherSpot, radius: 4.4 });
    this.addInteraction({ id: 'oni-gate', label: 'Approach the red gate', kanji: '鬼', x: loc.x + 7, z: loc.z - 13.5, y: 4.6, group: gate, radius: 5 });
  }

  // ————— cherry valley —————
  buildCherryValley() {
    const loc = LOCATIONS.cherry;
    const g = new THREE.Group();
    g.position.set(loc.x, 0, loc.z);
    this.scene.add(g);
    this.cherryGroup = g;

    // soft grass
    const patch = new THREE.Mesh(new THREE.CircleGeometry(20, 32), new THREE.MeshStandardMaterial({ color: 0x87a062, roughness: 1, transparent: true, opacity: 0.8 }));
    patch.rotation.x = -Math.PI / 2;
    patch.position.y = 0.012;
    g.add(patch);
    // petals carpet
    for (let i = 0; i < 90; i++) {
      const petal = new THREE.Mesh(new THREE.CircleGeometry(0.08 + Math.random() * 0.09, 5), new THREE.MeshBasicMaterial({ color: 0xf3b7c8, side: THREE.DoubleSide }));
      petal.rotation.x = -Math.PI / 2;
      const a = Math.random() * Math.PI * 2, r = Math.random() * 18;
      petal.position.set(Math.cos(a) * r, 0.03, Math.sin(a) * r);
      g.add(petal);
    }
    // cherry trees
    const spots = [[0, -4, 1.2], [-7, 4, 1], [7, 6, 1.1], [-12, -2, 0.9], [12, -8, 1], [-4, 13, 0.95], [7, 15, 0.85], [-16, 9, 1.05]];
    spots.forEach(([x, z, s], i) => {
      const t = this.makeTree('cherry', s, this.season.id);
      t.position.set(x, 0, z);
      t.rotation.y = i * 0.8;
      g.add(t);
      if (i < 4) this.addCollider(loc.x + x, loc.z + z, 1.1);
    });
    // picnic
    const blanket = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.4), new THREE.MeshStandardMaterial({ color: 0x9b3b3f, roughness: 0.95, side: THREE.DoubleSide }));
    blanket.rotation.x = -Math.PI / 2;
    blanket.position.set(-3, 0.05, 3);
    g.add(blanket);
    const teapot = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), new THREE.MeshStandardMaterial({ color: 0x4a4038, roughness: 0.7 }));
    teapot.position.set(-3, 0.22, 3); g.add(teapot);
    const bench = this.makeBench(3.0, 0.55, 0.8);
    bench.position.set(4, 0, -1);
    bench.rotation.y = 0.6;
    g.add(bench);
    // stone lantern
    const lan = this.makeStoneLantern(1, true);
    lan.position.set(-1, 0, 9);
    g.add(lan);
    // cherry gather spot
    const basket = new THREE.Group();
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.34, 0.4, 8), new THREE.MeshStandardMaterial({ color: 0x8a6a42, roughness: 1 }));
    b.position.y = 0.2; basket.add(b);
    for (let i = 0; i < 6; i++) {
      const p = new THREE.Mesh(new THREE.IcosahedronGeometry(0.09, 0), new THREE.MeshStandardMaterial({ color: 0xf0a8bd, emissive: 0x5a2030, emissiveIntensity: 0.3 }));
      p.position.set((Math.random() - 0.5) * 0.5, 0.4 + Math.random() * 0.1, (Math.random() - 0.5) * 0.5);
      basket.add(p);
    }
    basket.position.set(-10, 0, 8);
    g.add(basket);
    // petals drift marker
    const sign = this.makeSign('桜 谷', 'SAKURA VALLEY');
    sign.position.set(-14, 0, 2);
    g.add(sign);
    this.addInteraction({ id: 'cherry-gather', label: 'Gather cherry pips and petals', kanji: '桜', x: loc.x - 10, z: loc.z + 8, y: 2.4, group: basket, radius: 4.4 });
    this.addInteraction({ id: 'cherry-rest', label: 'Rest under the blossom tree', kanji: '憩', x: loc.x - 3, z: loc.z + 3, y: 2.4, group: null, radius: 3.6 });
  }

  // ————— waterfall —————
  buildWaterfall() {
    const loc = LOCATIONS.waterfall;
    const g = new THREE.Group();
    g.position.set(loc.x, 0, loc.z);
    this.scene.add(g);
    this.waterfallGroup = g;

    const rockMat = new THREE.MeshStandardMaterial({ color: 0x505b54, roughness: 1, flatShading: true });
    // cliff
    for (let i = 0; i < 16; i++) {
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(4 + Math.random() * 5, 0), rockMat);
      rock.position.set(-14 + Math.random() * 28, Math.random() * 14, -16 - Math.random() * 12);
      rock.scale.set(1 + Math.random(), 1 + Math.random() * 1.4, 1 + Math.random());
      rock.rotation.set(Math.random(), Math.random(), Math.random());
      rock.castShadow = true; rock.receiveShadow = true;
      g.add(rock);
    }
    const cliffTop = new THREE.Mesh(new THREE.DodecahedronGeometry(16, 1), rockMat);
    cliffTop.position.set(0, 10, -26);
    cliffTop.scale.set(1.6, 1, 0.8);
    g.add(cliffTop);

    // waterfall sheet
    const wfTex = canvasTex(128, 512, (ctx, w, h) => {
      ctx.fillStyle = 'rgba(190,220,225,0.0)'; ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 120; i++) {
        const x = Math.random() * w;
        ctx.fillStyle = `rgba(${210 + Math.random() * 40},${230 + Math.random() * 25},${235 + Math.random() * 20},${0.15 + Math.random() * 0.5})`;
        ctx.fillRect(x, Math.random() * h, 1 + Math.random() * 4, 20 + Math.random() * 90);
      }
    }, [2, 4]);
    wfTex.wrapS = wfTex.wrapT = THREE.RepeatWrapping;
    this.waterfallTex = wfTex;
    const wfMat = new THREE.MeshBasicMaterial({ map: wfTex, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthWrite: false, color: 0xcfe6e8 });
    const wf = new THREE.Mesh(new THREE.PlaneGeometry(6.5, 20), wfMat);
    wf.position.set(0, 12.5, -20);
    g.add(wf);
    this.waterfallMesh = wf;

    // pool
    const pool = new THREE.Mesh(new THREE.CircleGeometry(9, 40), new THREE.MeshStandardMaterial({ color: 0x2e5c66, roughness: 0.12, metalness: 0.4, transparent: true, opacity: 0.92 }));
    pool.rotation.x = -Math.PI / 2;
    pool.position.set(0, 0.05, -10);
    g.add(pool);
    // foam
    for (let i = 0; i < 12; i++) {
      const foam = new THREE.Mesh(new THREE.CircleGeometry(0.4 + Math.random() * 0.7, 8), new THREE.MeshBasicMaterial({ color: 0xd6ebe9, transparent: true, opacity: 0.25, depthWrite: false }));
      foam.rotation.x = -Math.PI / 2;
      foam.position.set((Math.random() - 0.5) * 7, 0.08, -16 + Math.random() * 4);
      g.add(foam);
    }
    // rocks & bridge
    for (let i = 0; i < 10; i++) {
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.6 + Math.random() * 1.2, 0), MAT.mossStone());
      const a = Math.random() * Math.PI * 2, r = 9 + Math.random() * 2;
      rock.position.set(Math.cos(a) * r, 0.3, -10 + Math.sin(a) * r);
      g.add(rock);
    }
    // red bridge over stream
    const bridge = new THREE.Group();
    for (let i = 0; i < 9; i++) {
      const t = i / 8;
      const plank = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.12, 0.55), MAT.wood());
      plank.position.set(0, 1.25 + Math.sin(t * Math.PI) * 0.9, -4 + t * 9);
      bridge.add(plank);
    }
    for (const sx of [-1, 1]) {
      const railCurve = new THREE.CatmullRomCurve3(Array.from({ length: 9 }, (_, i) => {
        const t = i / 8;
        return new V3(sx * 2.0, 2.2 + Math.sin(t * Math.PI) * 0.9, -4 + t * 9);
      }));
      const rail = new THREE.Mesh(new THREE.TubeGeometry(railCurve, 20, 0.07, 5, false), MAT.vermilion());
      bridge.add(rail);
    }
    bridge.position.set(0, 0, 4);
    g.add(bridge);

    // shrine & meditation spot
    const shrine = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.2, 2.0), new THREE.MeshStandardMaterial({ color: 0x6e5c4a, roughness: 1 }));
    shrine.position.set(-10, 1.1, 4);
    g.add(shrine);
    const roof = new THREE.Mesh(this.roofGeometry(3.4, 2.8, 1.2, 0.8, 0.5), MAT.roof());
    roof.position.set(-10, 2.6, 4);
    g.add(roof);
    // lanterns
    for (const [x, z] of [[-5, 8], [6, 6], [-13, 5]]) {
      const l = this.makeStoneLantern(1.1, true);
      l.position.set(x, 0, z);
      g.add(l);
    }
    // trees
    for (const [x, z, s] of [[-16, 12, 1.2], [14, 14, 1], [12, -2, 0.9]]) {
      const t = this.makeTree('cherry', s, this.season.id);
      t.position.set(x, 0, z);
      g.add(t);
    }
    this.addInteraction({ id: 'waterfall-meditate', label: 'Meditate beneath the falls', kanji: '禅', x: loc.x + 2, z: loc.z + 6, y: 3.0, radius: 4.4 });
  }

  // ————— mine —————
  buildMine() {
    const loc = LOCATIONS.mine;
    const g = new THREE.Group();
    g.position.set(loc.x, 0, loc.z);
    this.scene.add(g);
    this.mineGroup = g;
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x5a5148, roughness: 1, flatShading: true });

    // rocky hillside
    for (let i = 0; i < 14; i++) {
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(3 + Math.random() * 5, 0), rockMat);
      rock.position.set(10 + Math.random() * 12, Math.random() * 10, -14 + Math.random() * 22);
      rock.scale.set(1.2, 1 + Math.random(), 1.2);
      rock.rotation.set(Math.random(), Math.random(), Math.random());
      rock.castShadow = true;
      g.add(rock);
    }
    // cave mouth
    const cave = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 3.2, 5, 8, 1, true, 0, Math.PI), new THREE.MeshStandardMaterial({ color: 0x15110f, roughness: 1, side: THREE.DoubleSide }));
    cave.rotation.z = Math.PI / 2;
    cave.rotation.y = Math.PI / 2;
    cave.position.set(8.5, 2.5, 0);
    g.add(cave);
    for (const z of [-2.2, 0, 2.2]) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(0.3, 5, 0.3), MAT.darkWood());
      beam.position.set(7.2, 2.5, z);
      g.add(beam);
    }
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 5.2), MAT.darkWood());
    lintel.position.set(7.2, 5.0, 0);
    g.add(lintel);
    // crystal glows
    for (let i = 0; i < 5; i++) {
      const crystal = new THREE.Mesh(new THREE.ConeGeometry(0.3, 1.3, 5), new THREE.MeshStandardMaterial({ color: 0x74a8a0, emissive: 0x2a8a7a, emissiveIntensity: 0.6, roughness: 0.4 }));
      crystal.position.set(6.5 + Math.random() * 2, 0.6, -3 + Math.random() * 6);
      crystal.rotation.z = (Math.random() - 0.5) * 0.4;
      g.add(crystal);
    }
    const caveLight = new THREE.PointLight(0x4a9a8a, 1.2, 10, 2);
    caveLight.position.set(7.5, 2, 0);
    g.add(caveLight);
    // ore nodes
    const nodeGroup = new THREE.Group();
    for (let i = 0; i < 7; i++) {
      const node = new THREE.Mesh(new THREE.DodecahedronGeometry(0.35 + Math.random() * 0.25, 0), new THREE.MeshStandardMaterial({ color: 0x7e7a72, metalness: 0.6, roughness: 0.5, emissive: 0x332a1a, emissiveIntensity: 0.3, flatShading: true }));
      node.position.set(-4 + Math.random() * 5, 0.3, -3 + Math.random() * 6);
      node.rotation.set(Math.random(), Math.random(), Math.random());
      nodeGroup.add(node);
    }
    nodeGroup.position.set(3, 0, 4);
    g.add(nodeGroup);
    // minecart + rails
    const rails = new THREE.Group();
    for (const z of [-0.55, 0.55]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(12, 0.08, 0.1), new THREE.MeshStandardMaterial({ color: 0x7d7a72, metalness: 0.7, roughness: 0.4 }));
      rail.position.set(6, 0.1, z);
      rails.add(rail);
    }
    for (let i = 0; i < 12; i++) {
      const tie = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.06, 1.6), MAT.darkWood());
      tie.position.set(1 + i, 0.05, 0);
      rails.add(tie);
    }
    g.add(rails);
    const cart = new THREE.Group();
    const cartBody = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.8, 1.1), new THREE.MeshStandardMaterial({ color: 0x4b3a2a, roughness: 0.9 }));
    cartBody.position.y = 0.75; cart.add(cartBody);
    for (const [x, z] of [[-0.6, -0.5], [0.6, -0.5], [-0.6, 0.5], [0.6, 0.5]]) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.1, 8), MAT.darkWood());
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(x, 0.32, z);
      cart.add(wheel);
    }
    const ore = new THREE.Mesh(new THREE.DodecahedronGeometry(0.45, 0), new THREE.MeshStandardMaterial({ color: 0x5d615d, metalness: 0.6, roughness: 0.5 }));
    ore.position.y = 1.15;
    cart.add(ore);
    cart.position.set(0, 0, 0);
    g.add(cart);
    // lanterns
    for (const [x, z] of [[4, 5], [8, -4], [0, 6]]) {
      const l = this.makeStoneLantern(0.85, true);
      l.position.set(x, 0, z);
      g.add(l);
    }
    const sign = this.makeSign('鉄 山', 'IRON MINE');
    sign.position.set(3, 0, 8);
    g.add(sign);

    this.addInteraction({ id: 'mine-gather', label: 'Gather iron and tamahagane', kanji: '鉱', x: loc.x + 3, z: loc.z + 4, y: 2.4, group: nodeGroup, radius: 4.8 });
  }

  // ————— player & npc —————
  makePerson(type = 'samurai') {
    const g = new THREE.Group();
    const cfg = {
      samurai: { robe: 0x2c3a4e, accent: 0x8a2f2f, skin: 0xe0b38a, hat: 'topknot' },
      monk: { robe: 0xa2692d, accent: 0xd6b06b, skin: 0xdcae86, hat: 'shaved' },
      merchant: { robe: 0x4b5646, accent: 0x7e6a4a, skin: 0xdfb28a, hat: 'round' },
      noble: { robe: 0x4a3558, accent: 0xd8c393, skin: 0xe8c6a2, hat: 'tall' },
      oni: { robe: 0x2a1420, accent: 0x9b2b3a, skin: 0xa83a3a, hat: 'horns' },
      you: { robe: 0x2b3c52, accent: 0xb33a2b, skin: 0xe3b78e, hat: 'kasa' },
    }[type] || {};
    const robeMat = new THREE.MeshStandardMaterial({ color: cfg.robe, roughness: 0.9, flatShading: true });
    const accentMat = new THREE.MeshStandardMaterial({ color: cfg.accent, roughness: 0.9 });
    const skinMat = new THREE.MeshStandardMaterial({ color: cfg.skin, roughness: 0.85 });

    const legs = new THREE.Group();
    for (const sx of [-1, 1]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.72, 6), new THREE.MeshStandardMaterial({ color: 0x2d2b2a, roughness: 1 }));
      leg.position.set(sx * 0.16, 0.36, 0);
      legs.add(leg);
      g.userData[sx < 0 ? 'legL' : 'legR'] = leg;
    }
    g.add(legs);

    const body = new THREE.Group();
    body.position.y = 0.72;
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.36, 0.95, 8), robeMat);
    torso.position.y = 0.45;
    torso.castShadow = true;
    body.add(torso);
    const skirt = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.85, 8), robeMat);
    skirt.position.y = 0.12;
    body.add(skirt);
    const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.12, 8), accentMat);
    belt.position.y = 0.62;
    body.add(belt);
    const chest = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.28, 0.18), accentMat);
    chest.position.set(0, 0.58, 0.18);
    body.add(chest);

    // arms
    for (const sx of [-1, 1]) {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.72, 6), robeMat);
      arm.position.set(sx * 0.33, 0.68, 0);
      arm.rotation.z = sx * 0.14;
      body.add(arm);
      g.userData[sx < 0 ? 'armL' : 'armR'] = arm;
    }
    // head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 7), skinMat);
    head.position.y = 1.12;
    head.castShadow = true;
    body.add(head);
    // hat / hair
    if (cfg.hat === 'kasa') {
      const hat = new THREE.Mesh(new THREE.ConeGeometry(0.46, 0.24, 12), new THREE.MeshStandardMaterial({ color: 0xb89a66, roughness: 1 }));
      hat.position.y = 1.25;
      body.add(hat);
    } else if (cfg.hat === 'topknot') {
      const hair = new THREE.Mesh(new THREE.SphereGeometry(0.19, 8, 6), new THREE.MeshStandardMaterial({ color: 0x17120f, roughness: 1 }));
      hair.position.y = 1.15;
      hair.scale.set(1.03, 0.7, 1.03);
      body.add(hair);
      const knot = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.2, 5), new THREE.MeshStandardMaterial({ color: 0x17120f }));
      knot.position.set(0, 1.29, -0.04);
      body.add(knot);
    } else if (cfg.hat === 'round') {
      const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.36, 0.12, 10), new THREE.MeshStandardMaterial({ color: 0x6b5a3f, roughness: 1 }));
      hat.position.y = 1.27;
      body.add(hat);
      const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.18, 8), new THREE.MeshStandardMaterial({ color: 0x6b5a3f }));
      crown.position.y = 1.37;
      body.add(crown);
    } else if (cfg.hat === 'tall') {
      const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 0.5, 6), new THREE.MeshStandardMaterial({ color: 0x17120f }));
      hat.position.y = 1.42;
      body.add(hat);
    } else if (cfg.hat === 'horns') {
      for (const sx of [-1, 1]) {
        const horn = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.34, 5), new THREE.MeshStandardMaterial({ color: 0xe4d6bb, roughness: 0.8 }));
        horn.position.set(sx * 0.12, 1.36, 0);
        horn.rotation.z = sx * -0.35;
        body.add(horn);
      }
      const eyes = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.04, 0.02), new THREE.MeshBasicMaterial({ color: 0xffcf6a }));
      eyes.position.set(0, 1.12, 0.17);
      body.add(eyes);
    } else if (cfg.hat === 'shaved') {
      const sheen = new THREE.Mesh(new THREE.SphereGeometry(0.185, 8, 6), skinMat);
      sheen.position.y = 1.14;
      body.add(sheen);
    }

    // swords for samurai/you
    if (type === 'samurai' || type === 'you') {
      const saya = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.03, 1.1, 6), new THREE.MeshStandardMaterial({ color: 0x17130f, roughness: 0.4 }));
      saya.position.set(0.22, 0.55, -0.1);
      saya.rotation.z = 0.25;
      saya.rotation.x = 0.3;
      body.add(saya);
      const hilt = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.3, 6), new THREE.MeshStandardMaterial({ color: 0x8a7443, roughness: 0.6 }));
      hilt.position.set(0.3, 0.9, 0.1);
      hilt.rotation.z = -0.5;
      body.add(hilt);
    }
    // monk beads
    if (type === 'monk') {
      const beads = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.025, 5, 12), new THREE.MeshStandardMaterial({ color: 0x5c3d26, roughness: 0.8 }));
      beads.position.set(0, 0.8, 0.22);
      beads.rotation.x = 1.3;
      body.add(beads);
    }
    g.add(body);
    g.userData.body = body;
    g.userData.type = type;
    g.userData.height = 1.8;
    g.traverse((o) => { if (o.isMesh) { o.castShadow = true; } });
    return g;
  }

  buildPlayer() {
    this.player = this.makePerson('you');
    const spawn = LOCATIONS.estate.spawn;
    this.player.position.set(spawn.x, 0, spawn.z);
    this.player.rotation.y = Math.PI;
    this.scene.add(this.player);
    this.player.userData.armL.baseRot = this.player.userData.armL.rotation.z;
    this.player.userData.armR.baseRot = this.player.userData.armR.rotation.z;
    this.player.userData.legL.baseY = this.player.userData.legL.position.y;
    this.player.userData.legR.baseY = this.player.userData.legR.position.y;
  }

  // ————— dynamic estate contents —————
  clearGroup(group) {
    // Keep materials alive: many are shared/cached across procedural trees.
    while (group.children.length) group.remove(group.children[group.children.length - 1]);
  }

  rebuildBonsai() {
    if (!this.bonsaiGroup) return;
    this.clearGroup(this.bonsaiGroup);
    const capacity = treeCapacity(this.game.state);
    const trees = this.game.state.trees.slice(0, capacity);
    const seasonId = this.season.id;
    trees.forEach((tree, i) => {
      const slot = this.benchSlots[i % this.benchSlots.length];
      if (!slot) return;
      const b = createBonsai(tree, seasonId, { castShadow: true, scale: 1 });
      b.scale.setScalar(0.88);
      b.position.set(slot.x, slot.y, slot.z);
      b.rotation.y = (tree.variant % 100) / 100 * Math.PI * 2;
      this.bonsaiGroup.add(b);
      // name plaque
      const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.08, 0.16), new THREE.MeshStandardMaterial({ color: 0x3b2b1d, roughness: 0.9 }));
      plaque.position.set(slot.x, slot.y, slot.z + 0.7);
      this.bonsaiGroup.add(plaque);
      if (tree.heirloom) {
        const ring = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.62, 20), new THREE.MeshBasicMaterial({ color: 0xc9a45c, transparent: true, opacity: 0.5, side: THREE.DoubleSide }));
        ring.rotation.x = -Math.PI / 2;
        ring.position.set(slot.x, slot.y - 0.03, slot.z);
        this.bonsaiGroup.add(ring);
      }
    });
    // empty slot pots
    for (let i = trees.length; i < Math.min(capacity, this.benchSlots.length); i++) {
      const slot = this.benchSlots[i];
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.3, 0.28, 6), new THREE.MeshStandardMaterial({ color: 0x5b4a3a, roughness: 0.95 }));
      pot.position.set(slot.x, slot.y + 0.14, slot.z);
      this.bonsaiGroup.add(pot);
    }
  }

  rebuildWeaponRack() {
    if (!this.weaponRackGroup) return;
    const toRemove = this.weaponRackGroup.children.filter((c) => c.userData.isWeapon);
    toRemove.forEach((c) => this.weaponRackGroup.remove(c));
    const weapons = this.game.state.weapons.slice(-4);
    weapons.forEach((w, i) => {
      const disp = createWeaponDisplay(w, { size: 1.2 });
      disp.scale.setScalar(0.8);
      disp.position.set(-3.4 + i * 1.5, 1.35, 2.6);
      disp.rotation.y = 0.1;
      disp.userData.isWeapon = true;
      this.weaponRackGroup.add(disp);
    });
  }

  rebuildDecor() {
    if (!this.decorGroup) {
      this.decorGroup = new THREE.Group();
      this.scene.add(this.decorGroup);
    }
    this.clearGroup(this.decorGroup);
    const owned = this.game.state.decor;
    const spots = {
      lantern: [[-13, 15], [13.5, 15.5], [-17, -9]],
      torii: [[0, 17]],
      bridge: [[10.5, 7.5]],
      path: [],
      zen: [[-16, 5]],
      teahouse: [[-19, 10]],
      koi: [[-16, 12]],
      pagoda: [[-22, -2]],
      arbour: [[19, 12]],
    };
    owned.forEach((id) => {
      const positions = spots[id] || [];
      positions.forEach(([x, z], idx) => {
        if (id === 'lantern') {
          const l = this.makeStoneLantern(1, true);
          l.position.set(x, 0, z);
          this.decorGroup.add(l);
        } else if (id === 'torii') {
          const t = this.makeTorii(1.4, 0xa9362a, '祝');
          t.position.set(x, 0, z);
          this.decorGroup.add(t);
        } else if (id === 'bridge') {
          const bridge = this.makeBridge(9.5, 1.8);
          bridge.position.set(x, 0, z);
          bridge.rotation.y = 0.2;
          this.decorGroup.add(bridge);
        } else if (id === 'zen') {
          const zeng = this.buildZenArea(0, 0);
          zeng.position.set(x, 0, z);
          zeng.visible = true;
          this.decorGroup.add(zeng);
        } else if (id === 'teahouse') {
          const tea = this.makeHouse({ w: 6, d: 5, h: 2.4, roofMat: new THREE.MeshStandardMaterial({ color: 0x4c4238, roughness: 0.9, side: THREE.DoubleSide }) });
          tea.position.set(x, 0, z);
          tea.rotation.y = 0.5;
          this.decorGroup.add(tea);
        } else if (id === 'koi') {
          const pond = this.makePond(0, 0, 3.2);
          pond.position.set(x, 0, z);
          this.decorGroup.add(pond);
        } else if (id === 'pagoda') {
          const p = this.makePagoda();
          p.scale.setScalar(0.7);
          p.position.set(x, 0, z);
          this.decorGroup.add(p);
        } else if (id === 'arbour') {
          const arb = this.makeArbour();
          arb.position.set(x, 0, z);
          this.decorGroup.add(arb);
        }
      });
    });
  }

  makeBridge(width, depth) {
    const g = new THREE.Group();
    for (let i = 0; i < 13; i++) {
      const t = i / 12;
      const plank = new THREE.Mesh(new THREE.BoxGeometry(width / 13 * 0.92, 0.1, depth), MAT.wood());
      plank.position.set(-width / 2 + t * width, 0.5 + Math.sin(t * Math.PI) * 1.0, 0);
      plank.rotation.z = Math.cos(t * Math.PI) * -0.24;
      g.add(plank);
    }
    for (const sz of [-1, 1]) {
      const curve = new THREE.CatmullRomCurve3(Array.from({ length: 13 }, (_, i) => {
        const t = i / 12;
        return new V3(-width / 2 + t * width, 1.4 + Math.sin(t * Math.PI) * 1.0, sz * depth / 2);
      }));
      const rail = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.06, 4, false), MAT.vermilion());
      g.add(rail);
      for (let i = 0; i <= 6; i++) {
        const t = i / 6;
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.9, 5), MAT.vermilion());
        post.position.set(-width / 2 + t * width, 1.0 + Math.sin(t * Math.PI) * 1.0, sz * depth / 2);
        g.add(post);
      }
    }
    return g;
  }

  makeArbour() {
    const g = new THREE.Group();
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.16, 2.6, 0.16), MAT.darkWood());
      post.position.set(sx * 2, 1.3, sz * 1.5);
      g.add(post);
    }
    for (let i = 0; i < 4; i++) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.1, 0.1), MAT.wood());
      beam.position.set(0, 2.55, -1.5 + i);
      g.add(beam);
    }
    const blossomMat = new THREE.MeshStandardMaterial({ color: 0xb08bc9, roughness: 0.9, flatShading: true });
    for (let i = 0; i < 18; i++) {
      const cluster = new THREE.Mesh(new THREE.IcosahedronGeometry(0.34, 0), blossomMat);
      cluster.position.set((Math.random() - 0.5) * 4, 2.7 + Math.random() * 0.4, (Math.random() - 0.5) * 3);
      cluster.scale.y = 0.5;
      g.add(cluster);
    }
    const seat = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.16, 1.0), MAT.wood());
    seat.position.set(0, 0.5, 0);
    g.add(seat);
    return g;
  }

  // ————— ambient particles, smoke, weather —————
  buildAmbientParticles() {
    const count = 120;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    this.particleData = [];
    for (let i = 0; i < count; i++) {
      const p = { x: (Math.random() - 0.5) * 70, y: Math.random() * 28, z: (Math.random() - 0.5) * 70, v: 0.6 + Math.random() * 1.4, phase: Math.random() * 10, s: 0.5 + Math.random() };
      this.particleData.push(p);
      positions.set([p.x, p.y, p.z], i * 3);
      colors.set([1, 1, 1], i * 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.particleMat = new THREE.PointsMaterial({
      map: softParticleTexture('255,255,255'), size: 0.34, vertexColors: true, transparent: true, opacity: 0.9,
      depthWrite: false, sizeAttenuation: true, blending: THREE.NormalBlending,
    });
    this.ambientParticles = new THREE.Points(geo, this.particleMat);
    this.ambientParticles.frustumCulled = false;
    this.scene.add(this.ambientParticles);

    // fireflies
    const fCount = 28;
    const fPos = new Float32Array(fCount * 3);
    this.fireflyData = [];
    for (let i = 0; i < fCount; i++) {
      const p = { x: (Math.random() - 0.5) * 60, y: 1 + Math.random() * 5, z: (Math.random() - 0.5) * 60, phase: Math.random() * 6, speed: 0.2 + Math.random() * 0.4 };
      this.fireflyData.push(p);
      fPos.set([p.x, p.y, p.z], i * 3);
    }
    const fGeo = new THREE.BufferGeometry();
    fGeo.setAttribute('position', new THREE.BufferAttribute(fPos, 3));
    this.fireflyMat = new THREE.PointsMaterial({ map: softParticleTexture('255,235,150'), size: 0.55, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, color: 0xffe28a });
    this.fireflies = new THREE.Points(fGeo, this.fireflyMat);
    this.fireflies.frustumCulled = false;
    this.scene.add(this.fireflies);

    // smoke
    const sCount = 24;
    const sPos = new Float32Array(sCount * 3);
    this.smokeData = [];
    for (let i = 0; i < sCount; i++) {
      this.smokeData.push({ life: Math.random(), x: 0, y: 0, z: 0, origin: 0 });
      sPos.set([0, -10, 0], i * 3);
    }
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    this.smokeMat = new THREE.PointsMaterial({ map: softParticleTexture('230,225,215'), size: 1.2, transparent: true, opacity: 0.22, depthWrite: false, color: 0xd8d2c4 });
    this.smoke = new THREE.Points(sGeo, this.smokeMat);
    this.smoke.frustumCulled = false;
    this.scene.add(this.smoke);
  }

  setSeason(force = false) {
    const next = SEASONS[seasonIndex(this.game.state.day)];
    if (!force && next.id === this.season.id) return;
    this.season = next;
    const palettes = {
      spring: { ground: 0xa2b586, fog: 0xd3dbcc, leaf: 0x86a95e },
      summer: { ground: 0x86a069, fog: 0xc9d5c0, leaf: 0x5d8947 },
      autumn: { ground: 0xb39a64, fog: 0xd6cfb8, leaf: 0xba6c37 },
      winter: { ground: 0xdfe5e4, fog: 0xd7dee1, leaf: 0x7b8a76 },
    };
    const pal = palettes[next.id];
    if (this.groundMat) this.groundMat.color.setHex(pal.ground);
    if (this.scene.fog) this.scene.fog.color.setHex(pal.fog);
    this.updateForestColors();
    this.rebuildBonsai();
    this.updateAmbientColors();
    for (const t of this.treeFoliage) {
      const sp = SPECIES[t.kind];
      if (!sp) continue;
      const col = sp.leaf[next.id] ?? sp.leaf.summer;
      t.group.userData.leafMeshes?.forEach((m) => m.material.color.setHex(col));
    }
    if (this.mountains) {
      this.mountains.children.forEach((m) => {
        if (m.material.color.getHex() === 0xe9edee) m.visible = next.id === 'winter' || next.id === 'autumn';
      });
    }
  }

  updateAmbientColors() {
    if (!this.ambientParticles) return;
    const s = this.season.id;
    const colors = s === 'spring' ? [0xf6bccd, 0xf3a6bf, 0xffe1e8]
      : s === 'summer' ? [0xc4e0a0, 0xd8ecae, 0xa8d486]
      : s === 'autumn' ? [0xd98a45, 0xc46a33, 0xe0a95b]
      : [0xffffff, 0xe8f0f4, 0xd8e4ea];
    const c = new THREE.Color();
    const geo = this.ambientParticles.geometry;
    const colorsArr = geo.attributes.color;
    for (let i = 0; i < this.particleData.length; i++) {
      c.setHex(colors[i % colors.length]);
      colorsArr.setXYZ(i, c.r, c.g, c.b);
    }
    colorsArr.needsUpdate = true;
    this.particleMat.size = s === 'winter' ? 0.4 : s === 'autumn' ? 0.42 : 0.3;
  }

  // ————— input & camera —————
  bindInput() {
    window.addEventListener('keydown', (e) => {
      if (e.target && ['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      const k = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) {
        e.preventDefault();
        if (k === 'w' || k === 'arrowup') this.keys.w = true;
        if (k === 's' || k === 'arrowdown') this.keys.s = true;
        if (k === 'a' || k === 'arrowleft') this.keys.a = true;
        if (k === 'd' || k === 'arrowright') this.keys.d = true;
        this.clickTarget = null;
        this.queued = null;
      }
      if (k === 'e' && !this.locked) this.tryInteract();
      if (k === 'm' && !this.locked) this.game.ui.openPanel('map');
      if (k === 'escape') this.game.ui.closePanel();
    });
    window.addEventListener('keyup', (e) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') this.keys.w = false;
      if (k === 's' || k === 'arrowdown') this.keys.s = false;
      if (k === 'a' || k === 'arrowleft') this.keys.a = false;
      if (k === 'd' || k === 'arrowright') this.keys.d = false;
    });
    window.addEventListener('blur', () => { this.keys = { w: false, a: false, s: false, d: false }; });
    window.addEventListener('resize', () => this.resize());

    const el = this.canvas;
    el.addEventListener('contextmenu', (e) => e.preventDefault());
    el.addEventListener('pointerdown', (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      el.setPointerCapture?.(e.pointerId);
      this.dragStart = { x: e.clientX, y: e.clientY };
      this.dragged = false;
      this.dragLast = { x: e.clientX, y: e.clientY };
      if (this.pointers.size === 2) {
        const pts = [...this.pointers.values()];
        this.pinchDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      }
    });
    el.addEventListener('pointermove', (e) => {
      if (!this.pointers.has(e.pointerId)) return;
      this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (this.pointers.size === 2) {
        const pts = [...this.pointers.values()];
        const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        if (this.pinchDist) this.camDist = clamp(this.camDist - (d - this.pinchDist) * 0.12, 10, 58);
        this.pinchDist = d;
        return;
      }
      if (!this.dragLast) return;
      const dx = e.clientX - this.dragLast.x;
      const dy = e.clientY - this.dragLast.y;
      if (Math.abs(e.clientX - this.dragStart.x) + Math.abs(e.clientY - this.dragStart.y) > 6) this.dragged = true;
      if (this.dragged && !this.locked) {
        this.camYaw -= dx * 0.0055;
        this.camPolar = clamp(this.camPolar - dy * 0.004, 0.24, 1.36);
      }
      this.dragLast = { x: e.clientX, y: e.clientY };
    });
    el.addEventListener('pointerup', (e) => {
      const wasDrag = this.dragged;
      this.pointers.delete(e.pointerId);
      this.pinchDist = 0;
      this.dragLast = null;
      if (!wasDrag && !this.locked) this.handleClick(e.clientX, e.clientY);
    });
    el.addEventListener('pointercancel', (e) => {
      this.pointers.delete(e.pointerId);
      this.dragLast = null;
    });
    el.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.camDist = clamp(this.camDist + e.deltaY * 0.02, 10, 58);
    }, { passive: false });
  }

  handleClick(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1,
    );
    const ray = new THREE.Raycaster();
    ray.setFromCamera(ndc, this.camera);
    const hits = ray.intersectObjects(this.pickables, true);
    if (hits.length) {
      let o = hits[0].object;
      let id = null;
      while (o && !id) { id = o.userData?.interactionId; o = o.parent; }
      if (id) {
        const inter = this.interactions.find((i) => i.id === id);
        if (inter) {
          const d = Math.hypot(inter.pos.x - this.player.position.x, inter.pos.z - this.player.position.z);
          if (d <= inter.radius + 1.2) { this.trigger(inter); return; }
          this.clickTarget = new V3(inter.pos.x, 0, inter.pos.z);
          this.queued = inter;
          return;
        }
      }
    }
    // ground plane
    const plane = new THREE.Plane(new V3(0, 1, 0), 0);
    const point = new V3();
    if (ray.ray.intersectPlane(plane, point)) {
      const len = Math.hypot(point.x, point.z);
      if (len > 182) { point.multiplyScalar(182 / len); }
      this.clickTarget = point;
      this.queued = null;
    }
  }

  tryInteract() {
    if (!this.nearby) return;
    this.trigger(this.nearby);
  }

  trigger(inter) {
    this.queued = null;
    this.clickTarget = null;
    this.game.worldAction(inter.id);
  }

  setJoystick(x, y) { this.joystick.x = x; this.joystick.y = y; }

  travelTo(locId) {
    const loc = LOCATIONS[locId];
    if (!loc) return;
    this.player.position.set(loc.spawn.x, 0, loc.spawn.z);
    this.clickTarget = null;
    this.queued = null;
    const angleToCenter = Math.atan2(loc.x - loc.spawn.x, loc.z - loc.spawn.z);
    this.camYaw = angleToCenter + Math.PI + 0.2;
    this.camPolar = 0.44;
    this.camDist = locId === 'estate' ? 22 : 21;
    this.snapCamera();
    this.currentZone = null;
  }

  clampCamera(desired) {
    const dir = desired.clone().sub(this.camTarget);
    const dist = dir.length();
    if (dist > 0.001) {
      dir.divideScalar(dist);
      this.camRay.set(this.camTarget, dir);
      this.camRay.far = dist;
      const hits = this.camRay.intersectObjects(this.cameraBlockers, false);
      if (hits.length) {
        const safe = Math.max(2.4, hits[0].distance - 0.7);
        if (safe < dist) desired.copy(this.camTarget).addScaledVector(dir, safe);
      }
    }
    desired.y = Math.max(2.2, desired.y);
    return desired;
  }

  snapCamera() {
    const target = new V3(this.player.position.x, 2.0, this.player.position.z);
    this.camTarget.copy(target);
    const off = new V3(
      Math.sin(this.camYaw) * Math.cos(this.camPolar) * this.camDist,
      Math.sin(this.camPolar) * this.camDist,
      Math.cos(this.camYaw) * Math.cos(this.camPolar) * this.camDist,
    );
    const desired = target.clone().add(off);
    this.clampCamera(desired);
    this.camera.position.copy(desired);
    this.camera.lookAt(target);
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  }

  // ————— update —————
  setTime(dt) {
    const state = this.game.state;
    const hour = state.minutes / 60;
    const isNightTime = isNight(hour);
    const dayF = smooth(clamp((Math.sin(((hour - 6) / 12) * Math.PI) + 0.1) / 1.1, 0, 1));
    const dawn = Math.max(0, 1 - Math.abs(hour - 6) / 2.4);
    const dusk = Math.max(0, 1 - Math.abs(hour - 18.2) / 2.6);
    const night = 1 - dayF;

    const topDay = new THREE.Color(this.season.id === 'winter' ? 0x7d9ab3 : 0x6f9bbd);
    const botDay = new THREE.Color(this.season.id === 'winter' ? 0xdfe7e6 : this.season.id === 'autumn' ? 0xf1dcb7 : 0xe4e6cf);
    const topNight = new THREE.Color(0x070d1d);
    const botNight = new THREE.Color(0x1d2638);
    const topDawn = new THREE.Color(0x495a78);
    const botDawn = new THREE.Color(0xe9a276);
    const topDusk = new THREE.Color(0x3f4264);
    const botDusk = new THREE.Color(0xde8e63);

    const top = topNight.clone().lerp(topDay, dayF);
    const bot = botNight.clone().lerp(botDay, dayF);
    top.lerp(topDawn, Math.max(dawn, dusk) * 0.7);
    bot.lerp(botDawn, dawn * 0.8).lerp(botDusk, dusk * 0.8);
    this.skyUniforms.topColor.value.copy(top);
    this.skyUniforms.bottomColor.value.copy(bot);

    const sunAngle = ((hour - 6) / 12) * Math.PI;
    const sunDir = new V3(Math.cos(sunAngle) * 0.8, Math.sin(sunAngle), 0.35).normalize();
    this.skyUniforms.sunDir.value.copy(isNightTime ? new V3(-0.4, 0.8, 0.3).normalize() : sunDir);
    this.skyUniforms.sunColor.value.setHex(dawn > 0.4 || dusk > 0.4 ? 0xffb87a : 0xfff2cf);
    this.skyUniforms.sunStrength.value = 0.15 + dayF * 0.9;

    // lights
    const sunInt = 0.15 + dayF * 1.55;
    this.sun.intensity = sunInt;
    this.sun.color.setHex(night > 0.6 ? 0x8fa8d0 : dusk > 0.4 || dawn > 0.4 ? 0xffc394 : 0xfff2db);
    const lightDir = isNightTime ? new V3(-0.4, 0.8, 0.3).normalize() : sunDir;
    this.sun.position.copy(this.player.position).addScaledVector(lightDir, 120);
    this.sun.target.position.copy(this.player.position);
    this.hemi.intensity = 0.28 + dayF * 0.62;
    this.hemi.color.setHex(night > 0.6 ? 0x6a7da0 : 0xcfe0ea);
    this.hemi.groundColor.setHex(night > 0.6 ? 0x2a2c26 : 0x5a5a42);
    this.fill.intensity = 0.08 + dayF * 0.18;

    // fog & ambient
    const fog = new THREE.Color(0xd2dbce);
    const nightFog = new THREE.Color(0x101722);
    fog.lerpColors(nightFog, fog, dayF);
    fog.lerp(new THREE.Color(0xd9a27a), Math.max(dawn, dusk) * 0.35);
    this.scene.fog.color.copy(fog);
    this.scene.fog.near = 55 + dayF * 30;
    this.scene.fog.far = 250 + dayF * 70;

    // sun/moon visual
    this.sunMesh.position.copy(this.player.position).addScaledVector(sunDir, 430);
    this.sunGlow.position.copy(this.sunMesh.position);
    this.sunMesh.visible = dayF > 0.05;
    this.sunGlow.visible = dayF > 0.05;
    this.sunGlow.quaternion.copy(this.camera.quaternion);
    this.sunGlow.material.opacity = 0.3 + dayF * 0.45;
    const moonDir = new V3(-0.4, 0.8, 0.3).normalize();
    this.moonMesh.position.copy(this.player.position).addScaledVector(moonDir, 440);
    this.moonGlow.position.copy(this.moonMesh.position);
    this.moonMesh.visible = night > 0.35;
    this.moonGlow.visible = night > 0.35;
    this.moonGlow.quaternion.copy(this.camera.quaternion);
    this.moonGlow.material.opacity = night * 0.35;

    this.starMat.opacity = Math.max(0, night - 0.25) * 1.3;
    this.stars.position.copy(this.player.position);
    this.sky.position.copy(this.player.position);

    // lanterns / windows
    const lanternF = isNightTime ? 1 : Math.max(0, (hour > 17.5 ? (hour - 17.5) / 1.5 : 0));
    this.lanterns.forEach((l) => {
      l.mat.emissiveIntensity = 0.12 + lanternF * 1.6;
      if (l.light) l.light.intensity = lanternF * 1.5;
    });
    this.windowMats.forEach((m) => { m.emissiveIntensity = 0.03 + lanternF * 0.9; });
    if (this.forgeLight) this.forgeLight.intensity = 1.4 + Math.sin(this.time * 7) * 0.2 + 0.7;
    if (this.forgeFire) this.forgeFire.emissiveIntensity = 1.6 + Math.sin(this.time * 5.3) * 0.4;
    if (this.oniLight) this.oniLight.intensity = isNightTime ? 1.8 + Math.sin(this.time * 2) * 0.35 : 0;
    if (this.oniNpc) this.oniNpc.visible = isNightTime;
    if (this.bell) this.bell.rotation.z = Math.sin(this.time * 0.7) * 0.02;

    this.updateWeather(lanternF, night);
    this.skyUniforms.sunStrength.value *= 1 - this.weatherDark;
  }

  updateWeather(lanternF, night) {
    const weather = this.game.state.weather;
    const w = WEATHERS[weather] || WEATHERS.clear;
    this.weatherDark = (weather === 'storm' ? 0.4 : weather === 'rain' ? 0.25 : 0);
    this.sun.intensity *= 1 - this.weatherDark;
    this.hemi.intensity *= 1 - this.weatherDark * 0.4;

    const isSnow = this.season.id === 'winter' || weather === 'snow';
    const isRain = weather === 'rain' || weather === 'storm';
    const count = 120;
    const positions = this.ambientParticles.geometry.attributes.position;
    const colors = this.ambientParticles.geometry.attributes.color;
    const c = new THREE.Color();
    if (isRain || isSnow) {
      this.particleMat.size = isSnow ? 0.28 : 0.11;
      this.particleMat.opacity = 0.8;
      for (let i = 0; i < this.particleData.length; i++) {
        const p = this.particleData[i];
        p.y -= (isSnow ? 2.5 : 28) * 0.016 * p.v;
        p.x += (isSnow ? Math.sin(this.time + p.phase) * 0.5 : -1.2) * 0.016;
        if (p.y < 0) { p.y = 26; p.x = (Math.random() - 0.5) * 70; p.z = (Math.random() - 0.5) * 70; }
        positions.setXYZ(i, p.x + (this.player.position.x), p.y, p.z + this.player.position.z);
        c.setHex(isSnow ? 0xf4f8ff : 0xa9c0d4);
        colors.setXYZ(i, c.r, c.g, c.b);
      }
      colors.needsUpdate = true;
    } else {
      this.particleMat.size = this.season.id === 'autumn' ? 0.4 : 0.3;
      this.particleMat.opacity = 0.75;
      const pal = this.season.id === 'spring' ? [0xf6bccd, 0xffe1e8] : this.season.id === 'autumn' ? [0xd98a45, 0xc46a33] : [0xd8e8b8, 0xe8f0c8];
      for (let i = 0; i < this.particleData.length; i++) {
        const p = this.particleData[i];
        p.x += Math.sin(this.time * 0.7 + p.phase) * 0.018 * p.v;
        p.z += Math.cos(this.time * 0.5 + p.phase) * 0.014 * p.v;
        p.y -= 0.008 * p.v;
        if (p.y < 0.5) p.y = 14 + Math.random() * 12;
        if (p.x > 35) p.x = -35; if (p.x < -35) p.x = 35;
        if (p.z > 35) p.z = -35; if (p.z < -35) p.z = 35;
        positions.setXYZ(i, p.x + this.player.position.x, p.y, p.z + this.player.position.z);
        c.setHex(pal[i % pal.length]);
        colors.setXYZ(i, c.r, c.g, c.b);
      }
      colors.needsUpdate = true;
    }
    positions.needsUpdate = true;

    // fireflies at night
    this.fireflyMat.opacity = night * 0.9;
    if (night > 0.1) {
      const fp = this.fireflies.geometry.attributes.position;
      for (let i = 0; i < this.fireflyData.length; i++) {
        const p = this.fireflyData[i];
        fp.setXYZ(i, p.x + Math.sin(this.time * p.speed + p.phase) * 2.2 + this.player.position.x * 0.3, p.y + Math.sin(this.time * p.speed * 2 + p.phase) * 0.5, p.z + Math.cos(this.time * p.speed * 1.4 + p.phase) * 2.2 + this.player.position.z * 0.3);
      }
      fp.needsUpdate = true;
    }
    // smoke
    if (this.forgeSmokeOrigin) {
      const sp = this.smoke.geometry.attributes.position;
      for (let i = 0; i < this.smokeData.length; i++) {
        const p = this.smokeData[i];
        p.life += 0.002;
        if (p.life > 1) p.life = 0;
        const origin = i % 2 === 0 ? this.forgeSmokeOrigin : this.chimneySmokeOrigin;
        const t = p.life;
        sp.setXYZ(i, origin.x + Math.sin(t * 8 + i) * 0.8 + t * 1.5, origin.y + t * 6, origin.z + Math.cos(t * 6 + i) * 0.8);
      }
      sp.needsUpdate = true;
    }
    // waterfall scroll
    if (this.waterfallTex) this.waterfallTex.offset.y -= 0.006;
    this.waterMats?.forEach((u) => { u.time.value = this.time; });
  }

  updateNPCs(dt) {
    const px = this.player.position.x, pz = this.player.position.z;
    for (const npc of this.npcs) {
      const g = npc.group;
      const body = g.userData.body;
      if (!body) continue;
      const base = npc.base || 0;
      body.position.y = 0.72 + Math.sin(this.time * 1.2 + npc.phase) * 0.012;
      const d = Math.hypot(g.position.x + (g.parent?.position.x || 0) - px, g.position.z + (g.parent?.position.z || 0) - pz);
      if (d < 9) {
        const target = Math.atan2(px - (g.position.x + (g.parent?.position.x || 0)), pz - (g.position.z + (g.parent?.position.z || 0)));
        g.rotation.y = g.rotation.y + (target - g.rotation.y) * Math.min(1, dt * 2.2);
      }
    }
  }

  updatePlayer(dt) {
    if (this.locked) {
      this.clickTarget = null;
      return;
    }
    const forward = new V3(-Math.sin(this.camYaw), 0, -Math.cos(this.camYaw));
    const right = new V3(Math.cos(this.camYaw), 0, -Math.sin(this.camYaw));
    const dir = new V3();
    if (this.keys.w) dir.add(forward);
    if (this.keys.s) dir.sub(forward);
    if (this.keys.d) dir.add(right);
    if (this.keys.a) dir.sub(right);
    if (Math.abs(this.joystick.x) > 0.08 || Math.abs(this.joystick.y) > 0.08) {
      dir.addScaledVector(forward, -this.joystick.y);
      dir.addScaledVector(right, this.joystick.x);
    }
    let moving = dir.lengthSq() > 0.001;
    if (moving) {
      dir.normalize();
      this.clickTarget = null;
      this.queued = null;
    } else if (this.clickTarget) {
      const d = this.clickTarget.clone().sub(this.player.position);
      d.y = 0;
      const dist = d.length();
      if (dist < 0.35) {
        this.clickTarget = null;
        if (this.queued) {
          const q = this.queued; this.queued = null;
          const qd = Math.hypot(q.pos.x - this.player.position.x, q.pos.z - this.player.position.z);
          if (qd <= q.radius + 1.2) this.trigger(q);
        }
      } else {
        dir.copy(d.normalize());
        moving = true;
      }
    }
    if (moving) {
      const speed = 9;
      this.player.position.addScaledVector(dir, speed * dt);
      const r = Math.hypot(this.player.position.x, this.player.position.z);
      if (r > 184) { this.player.position.x *= 184 / r; this.player.position.z *= 184 / r; }
      const targetAngle = Math.atan2(dir.x, dir.z);
      let diff = targetAngle - this.player.rotation.y;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      this.player.rotation.y += diff * Math.min(1, dt * 12);
      this.walkTime += dt * 8;
      this.player.userData.body.position.y = 0.72 + Math.abs(Math.sin(this.walkTime)) * 0.06;
      this.player.userData.armL.rotation.x = Math.sin(this.walkTime) * 0.65;
      this.player.userData.armR.rotation.x = -Math.sin(this.walkTime) * 0.65;
      this.player.userData.legL.position.z = Math.sin(this.walkTime) * 0.22;
      this.player.userData.legR.position.z = -Math.sin(this.walkTime) * 0.22;
    } else {
      this.player.userData.body.position.y = 0.72 + Math.sin(this.time * 1.3) * 0.01;
      this.player.userData.armL.rotation.x *= 0.85;
      this.player.userData.armR.rotation.x *= 0.85;
      this.player.userData.legL.position.z *= 0.85;
      this.player.userData.legR.position.z *= 0.85;
    }
    // collision push-out
    for (const c of this.colliders) {
      const dx = this.player.position.x - c.x, dz = this.player.position.z - c.z;
      const d = Math.hypot(dx, dz);
      if (d < c.r && d > 0.001) {
        this.player.position.x = c.x + dx / d * c.r;
        this.player.position.z = c.z + dz / d * c.r;
      }
    }
  }

  updateInteractions() {
    let nearest = null, nd = 1e9;
    for (const i of this.interactions) {
      const d = Math.hypot(i.pos.x - this.player.position.x, i.pos.z - this.player.position.z);
      const near = d < 26;
      i.sprite.visible = near;
      i.ring.visible = near;
      if (near) {
        const bob = Math.sin(this.time * 2 + i.pos.x) * 0.08;
        i.sprite.position.y = i.baseY + bob;
        i.sprite.material.opacity = clamp(1 - (d - 12) / 20, 0.15, 1);
        i.ring.material.opacity = 0.18 + Math.sin(this.time * 2 + i.pos.x) * 0.08;
      }
      if (d < i.radius && d < nd) { nd = d; nearest = i; }
    }
    if (nearest !== this.nearby) {
      this.nearby = nearest;
      if (this.onNearbyChange) this.onNearbyChange(nearest);
    }
  }

  updateZone() {
    let zone = null, best = 1e9;
    for (const loc of Object.values(LOCATIONS)) {
      const d = Math.hypot(loc.x - this.player.position.x, loc.z - this.player.position.z);
      if (d < loc.radius + 8 && d < best) { best = d; zone = loc; }
    }
    if (zone && zone.id !== this.currentZone) {
      this.currentZone = zone.id;
      if (this.onZoneChange) this.onZoneChange(zone);
    }
  }

  updateCamera(dt) {
    const target = new V3(this.player.position.x, 2.0, this.player.position.z);
    this.camTarget.lerp(target, 1 - Math.exp(-8 * dt));
    const off = new V3(
      Math.sin(this.camYaw) * Math.cos(this.camPolar) * this.camDist,
      Math.sin(this.camPolar) * this.camDist,
      Math.cos(this.camYaw) * Math.cos(this.camPolar) * this.camDist,
    );
    const desired = this.clampCamera(this.camTarget.clone().add(off));
    this.camera.position.lerp(desired, 1 - Math.exp(-6 * dt));
    this.camera.lookAt(this.camTarget);
  }

  update(dt) {
    this.time += dt;
    this.state = this.game.state;
    this.setSeason();
    this.setTime(dt);
    this.updatePlayer(dt);
    this.updateCamera(dt);
    this.updateNPCs(dt);
    this.updateInteractions();
    this.updateZone();
    this.skyUniforms.sunDir.value.copy(this.skyUniforms.sunDir.value);
    // koi
    for (const k of this.koi) {
      k.phase += dt * k.speed;
      k.mesh.position.x = Math.cos(k.phase) * k.r;
      k.mesh.position.z = Math.sin(k.phase * 1.2) * k.r * 0.7;
      k.mesh.rotation.y = -k.phase + Math.PI / 2;
    }
    // cloud drift
    this.clouds.children.forEach((c, i) => { c.position.x += dt * (0.6 + i * 0.03); if (c.position.x > 300) c.position.x = -300; });
    // bonsai sway
    if (this.bonsaiGroup) {
      this.bonsaiGroup.children.forEach((b, i) => {
        if (b.userData.sway) b.userData.sway.rotation.z = Math.sin(this.time * 0.7 + i) * 0.012;
      });
    }
    this.ambientParticles.geometry.attributes.position.needsUpdate = true;
    if (this.cat) this.cat.rotation.y = Math.sin(this.time * 0.2) * 0.2;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
