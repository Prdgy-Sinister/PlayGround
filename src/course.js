import * as THREE from 'three';
import { toonMat } from './characterRig.js';
import { addGlow } from './fx.js';
import { createObstacle, createCheckpointGate, WATER_Y } from './obstacles.js';

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function hashSeed(round, arena, extra) {
  let h = 2166136261;
  for (const ch of round + arena + extra) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

const G = {
  box: new THREE.BoxGeometry(1, 1, 1),
  sphere: new THREE.SphereGeometry(1, 12, 9),
  cyl: new THREE.CylinderGeometry(1, 1, 1, 14),
  torus: new THREE.TorusGeometry(1, 0.1, 6, 18)
};

function m(parent, geom, mat, pos, scale, rot) {
  const mesh = new THREE.Mesh(geom, mat);
  if (pos) mesh.position.set(...pos);
  if (scale) mesh.scale.set(...scale);
  if (rot) mesh.rotation.set(...rot);
  parent.add(mesh);
  return mesh;
}

// Top colour with a subtle painted stripe texture so large surfaces don't read flat.
const topTextures = new Map();
function platformTexture(base, trim, kind) {
  const key = base + trim + kind;
  if (topTextures.has(key)) return topTextures.get(key);
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 128, 128);
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = '#000';
  for (let i = -128; i < 256; i += 24) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + 10, 0); ctx.lineTo(i - 118, 128); ctx.lineTo(i - 128, 128); ctx.fill();
  }
  ctx.globalAlpha = 1;
  if (kind === 'slippery') {
    ctx.strokeStyle = 'rgba(255,255,255,.45)';
    ctx.lineWidth = 3;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.arc(20 + (i * 37) % 100, 24 + (i * 53) % 90, 8 + (i % 3) * 4, 0.2, 2.9);
      ctx.stroke();
    }
  }
  if (kind === 'start') {
    ctx.fillStyle = trim;
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.moveTo(64, 22); ctx.lineTo(84, 62); ctx.lineTo(72, 62); ctx.lineTo(72, 104);
    ctx.lineTo(56, 104); ctx.lineTo(56, 62); ctx.lineTo(44, 62); ctx.closePath(); ctx.fill();
    ctx.globalAlpha = 1;
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  topTextures.set(key, tex);
  return tex;
}

export function buildCourse({ round, arena, difficulty = 1, seedExtra = '', endlessLevel = 0 }) {
  const group = new THREE.Group();
  const platforms = [];
  const obstacles = [];
  const pads = [];
  const checkpoints = [];
  const rand = rng(hashSeed(round, arena.id, seedExtra + endlessLevel));
  const theme = arena;

  let cursor = -2; // front edge of the last platform
  let platformId = 0;

  const topMat = (color, trim, kind) => {
    const tex = platformTexture(color, trim, kind);
    const t = tex.clone();
    t.needsUpdate = true;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(1.5, 1.5);
    return new THREE.MeshToonMaterial({ map: t });
  };

  function addPlatform(opt) {
    const {
      x = 0, zBack, depth, w = 13, top = 0, kind = 'flat',
      color = theme.platform, sideColor = theme.platformSide, trim = theme.platformTrim,
      slippery = false, hole = false
    } = opt;
    const zFront = zBack - depth;
    const z = (zBack + zFront) / 2;
    const p = {
      id: platformId++, kind, x, z, w, d: depth, top, zBack, zFront,
      slippery, active: true, slopeX: opt.slopeX || 0, slopeZ: opt.slopeZ || 0,
      conveyor: opt.conveyor || null, spinRate: opt.spinRate || 0, mesh: null,
      collapse: opt.collapse || null, beam: kind === 'beam',
      topAt(px, pz) { return top + this.slopeX * (px - this.x) + this.slopeZ * (pz - this.z); },
      contains(px, pz) {
        if (kind === 'disc') return Math.hypot(px - x, pz - z) <= w / 2 + (opt.edge ?? 0.06);
        return Math.abs(px - x) <= w / 2 + (opt.edge ?? 0.06) && px > -900 &&
          pz <= zBack + (opt.edge ?? 0.06) && pz >= zFront - (opt.edge ?? 0.06);
      }
    };
    platforms.push(p);
    if (hole) return p;
    const pg = new THREE.Group();
    group.add(pg);
    p.mesh = pg;

    if (kind === 'tile') {
      const slab = new THREE.Mesh(new THREE.BoxGeometry(w, 0.7, depth), topMat(color, trim, 'tile'));
      slab.position.set(x, top - 0.35, z);
      pg.add(slab);
      return p;
    }

    if (kind === 'disc') {
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(w / 2, w / 2 - 0.35, 1.2, 26), topMat(color, trim, 'disc'));
      disc.position.set(x, top - 0.6, z);
      pg.add(disc);
      // rotating top plate marks
      const spin = new THREE.Group();
      spin.position.set(x, top + 0.01, z);
      pg.add(spin);
      const stripeMat = toonMat(theme.platformTrim);
      for (let i = 0; i < 4; i++) {
        m(spin, G.box, stripeMat, [0, 0.02, 0], [w * 0.88, 0.04, 0.28]).rotation.y = (i / 4) * Math.PI;
      }
      const rim = new THREE.Mesh(new THREE.TorusGeometry(w / 2 - 0.1, 0.18, 6, 28), toonMat(trim));
      rim.rotation.x = Math.PI / 2; rim.position.set(x, top - 0.05, z);
      pg.add(rim);
      m(pg, G.cyl, toonMat('#30363f'), [x, top + 0.5, z], [0.8, 1.4, 0.8]);
      m(pg, G.cyl, toonMat(theme.accent), [x, top + 1.3, z], [1.1, 0.2, 1.1]);
      p.spinMesh = spin;
      return p;
    }

    const depthT = kind === 'beam' ? 1.3 : 2.6;
    const slab = new THREE.Mesh(new THREE.BoxGeometry(w, depthT, depth), topMat(color, trim, kind));
    slab.position.set(x, top - depthT / 2, z);
    pg.add(slab);
    // skirt
    const skirtH = kind === 'beam' ? 0.7 : 1.35;
    const skirt = new THREE.Mesh(
      new THREE.BoxGeometry(w - 0.25, skirtH, depth - 0.25),
      toonMat(sideColor)
    );
    skirt.position.set(x, top - depthT - skirtH / 2 + 0.05, z);
    pg.add(skirt);
    // edge trims
    const edgeMat = toonMat(trim);
    const edgeH = 0.13;
    const longZ = kind === 'beam';
    if (!longZ) {
      m(pg, G.box, edgeMat, [x - w / 2 + 0.16, top + 0.06, z], [0.34, edgeH, depth]);
      m(pg, G.box, edgeMat, [x + w / 2 - 0.16, top + 0.06, z], [0.34, edgeH, depth]);
    }
    m(pg, G.box, edgeMat, [x, top + 0.06, zBack - 0.18], [w, edgeH, 0.36]);
    m(pg, G.box, edgeMat, [x, top + 0.06, zFront + 0.18], [w, edgeH, 0.36]);
    // corner floaters
    const cornerMat = toonMat(theme.accent);
    if (kind !== 'beam') {
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => {
        m(pg, G.sphere, cornerMat, [x + sx * (w / 2 - 0.5), top - 0.1, z + sz * (depth / 2 - 0.5)], [0.55, 0.45, 0.55]);
      });
    }
    if (slippery) {
      const ice = new THREE.Mesh(new THREE.BoxGeometry(w - 0.5, 0.06, depth - 0.3), new THREE.MeshToonMaterial({
        color: '#bdefff', transparent: true, opacity: 0.35
      }));
      ice.position.set(x, top + 0.045, z);
      pg.add(ice);
    }
    // support pylons (only for wide platforms)
    if (kind === 'flat' && depth > 8) {
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => {
        m(pg, G.cyl, toonMat(sideColor), [x + sx * (w / 2 - 1), top - 2.1, z + sz * (depth / 2 - 1)], [0.35, 1.7, 0.35]);
      });
    }
    return p;
  }

  function nextSection(depth, opt = {}) {
    // Keep the opening route connected to the start platform; later gaps are
    // intentional jumps sized to clear comfortably with a running jump.
    const gap = opt.gap ?? (cursor === -2 ? 0 : 2.2);
    const zBack = cursor - gap;
    const p = addPlatform({ ...opt, zBack, depth });
    cursor = zBack - depth;
    return p;
  }

  function addCheckpoint(p, label, index) {
    const z = p.z + p.d / 2 - 2.2;
    // The start gate would sit between the chase camera and the player during
    // the countdown, filling the screen. The start gantry already marks it.
    if (index > 0) {
      const gate = createCheckpointGate(theme, z, index);
      group.add(gate);
    }
    checkpoints.push({
      index, label, z, platform: p,
      respawn: { x: p.x, z: z - 0.8, top: p.topAt(p.x, z) }
    });
  }

  function addObs(type, opt) {
    const o = createObstacle(type, opt, theme);
    group.add(o.group);
    obstacles.push(o);
    if (type === 'launch') pads.push(o);
    return o;
  }

  function decorateSection(p, opts = {}) {
    // hazard rail lights along the sides
    const lightMat = toonMat(theme.accent, { emissive: theme.accent, emissiveIntensity: 0.8 });
    const n = Math.max(1, Math.floor(p.d / 7));
    for (let i = 0; i < n; i++) {
      const zz = p.zBack - (i + 0.5) * (p.d / n);
      [-1, 1].forEach(s => {
        if (p.kind === 'beam') return;
        m(group, G.sphere, lightMat, [p.x + s * (p.w / 2 - 0.4), p.top + 0.6, zz], [0.11, 0.11, 0.11]);
      });
    }
    if (opts.arch) {
      const archMat = toonMat(theme.accent);
      const arch = new THREE.Mesh(new THREE.TorusGeometry(p.w / 2 + 1.2, 0.35, 7, 24, Math.PI), archMat);
      arch.position.set(p.x, p.top + 2.4, p.z + p.d / 2 - 1);
      group.add(arch);
      const sign = m(group, new THREE.PlaneGeometry(6, 1.4), toonMat(theme.accent2), [p.x, p.top + 5.4, p.z + p.d / 2 - 1], [1, 1, 1]);
      sign.rotation.y = 0;
    }
  }

  // =========================================================================
  // START
  // =========================================================================
  const start = addPlatform({ zBack: 14, depth: 16, w: 16, top: 0, kind: 'start' });
  cursor = -2;
  start.isStart = true;
  // start gantry
  {
    const g = new THREE.Group();
    group.add(g);
    const postMat = toonMat(theme.platformSide);
    [-1, 1].forEach(s => {
      m(g, G.box, postMat, [s * 6.2, 3.6, 1.0], [0.7, 7.2, 0.7]);
      m(g, G.sphere, toonMat(theme.accent, { emissive: theme.accent, emissiveIntensity: 0.6 }), [s * 6.2, 7.2, 1.0], [0.5, 0.5, 0.5]);
    });
    m(g, G.box, toonMat(theme.accent), [0, 7.35, 1.0], [12.4, 0.55, 0.6]);
    addGlow(g, theme.accent, [0, 7.4, 1.0], 7.5, 0.28);
    const startLights = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const light = m(startLights, G.sphere, toonMat('#ff4d5e', { emissive: '#ff4d5e', emissiveIntensity: 1.2 }), [(i - 1) * 1.5, 7.65, 0.85], [0.4, 0.4, 0.4]);
      light.userData.startLight = i;
    }
    g.add(startLights);
    start.lights = startLights;
  }
  // =========================================================================
  // SECTION BUILDERS
  // =========================================================================
  const builders = {
    balls(p) {
      const laneXs = p.w > 13 ? [-4.2, 0, 4.2] : [-3.2, 3.2];
      const count = p.w > 12 ? 3 : 2;
      for (let i = 0; i < count; i++) {
        addObs('ball', {
          x: laneXs[i % laneXs.length] + (rand() - 0.5) * 0.8,
          top: p.top, zFar: p.zFront + 1.5, span: p.d - 2,
          speed: 4.0 + rand() * 1.2 + difficulty * 0.3,
          phase: rand(), radius: 1.75,
          bounceHeight: 1.0
        });
      }
      decorateSection(p);
    },
    sweepers(p, n = 1) {
      for (let i = 0; i < n; i++) {
        const zz = p.zBack - p.d * (i + 0.5) / n;
        addObs('sweeper', {
          x: 0, z: zz, top: p.top, reach: Math.max(2.2, Math.min(5.2, p.w / 2 - 2.0)),
          speed: (1.35 + rand() * 0.35) * (difficulty > 1.15 ? 1.2 : 1),
          dir: i % 2 ? -1 : 1, phase: rand() * 2
        });
      }
      decorateSection(p);
    },
    hammers(p, n = 2) {
      for (let i = 0; i < n; i++) {
        const zz = p.zBack - p.d * (i + 0.5) / n;
        addObs('hammer', {
          x: p.x, z: zz, top: p.top, pivotH: 5.2, arm: p.kind === 'beam' ? 3.6 : 3.9,
          amp: 1.15, speed: 1.25 + rand() * 0.3, phase: rand() * 3
        });
      }
      decorateSection(p);
    },
    punches(p, n = 2) {
      for (let i = 0; i < n; i++) {
        const zz = p.zBack - p.d * (i + 0.5) / n;
        const side = i % 2 ? 1 : -1;
        addObs('punch', {
          x: p.x, z: zz, top: p.top, side, mountX: p.w / 2 + 0.3,
          period: 2.3 + rand() * 0.4, extend: p.w * 0.36, phase: rand()
        });
      }
      decorateSection(p);
    },
    walls(p, n = 2) {
      for (let i = 0; i < n; i++) {
        const zz = p.zBack - p.d * (i + 0.5) / n;
        addObs('wall', {
          x: p.x, z: zz, top: p.top, w: 3.5, amp: Math.max(2.6, p.w / 2 - 2.6),
          speed: 0.95 + rand() * 0.3, phase: rand() * 2, track: p.w - 1
        });
      }
      decorateSection(p);
    },
    rollers(p, n = 2) {
      for (let i = 0; i < n; i++) {
        addObs('roller', {
          x: (i - (n - 1) / 2) * 3.2 + p.x, top: p.top, zFar: p.zFront + 1,
          span: p.d + 3, radius: 0.55, len: 4.6, speed: 4.5 + rand() * 1.5,
          phase: rand()
        });
      }
      decorateSection(p);
    },
    launch(p) {
      addObs('launch', { x: p.x, z: p.z + 1, top: p.top, power: 16, forward: 6 });
      decorateSection(p);
    },
    flails(p, n = 1) {
      for (let i = 0; i < n; i++) {
        const zz = p.zBack - p.d * (i + 0.5) / n;
        addObs('flail', {
          x: p.x + (n > 1 ? (i - (n - 1) / 2) * 3.6 : 0), z: zz, top: p.top,
          pivotH: 5.0, arm: 4.2, amp: 0.88,
          speed: 1.35 + rand() * 0.25, phase: rand() * Math.PI * 2
        });
      }
      decorateSection(p);
    },
    bumpers(p, n = 3) {
      const xs = n === 1 ? [p.x] : [-4.2, 0, 4.2].slice(0, n).map(v => v + p.x);
      for (let i = 0; i < n; i++) {
        const zz = p.zBack - p.d * (i + 0.5) / n;
        addObs('bumper', {
          x: xs[i], z: zz, top: p.top, radius: 0.78,
          height: 1.9, period: 2.0 + rand() * 0.35, phase: rand()
        });
      }
      decorateSection(p);
    },
    crushers(p, n = 1) {
      const size = Math.min(3.0, Math.max(2.0, p.w * 0.34));
      for (let i = 0; i < n; i++) {
        const zz = p.zBack - p.d * (i + 0.5) / n;
        addObs('crusher', {
          x: p.x, z: zz, top: p.top, size,
          lift: 4.8, period: 2.6 + rand() * 0.5, phase: rand()
        });
      }
      decorateSection(p);
    },
    saws(p, n = 1) {
      for (let i = 0; i < n; i++) {
        const zz = p.zBack - p.d * (i + 0.5) / n;
        addObs('saw', {
          x: p.x, z: zz, top: p.top,
          radius: Math.min(1.15, Math.max(0.7, p.w * 0.13)),
          amp: Math.max(1.5, Math.min(4.0, p.w / 2 - 2.1)),
          speed: 1.3 + rand() * 0.45, phase: rand()
        });
      }
      decorateSection(p);
    },
    cannons(p, n = 1) {
      for (let i = 0; i < n; i++) {
        const zz = p.zBack - p.d * (i + 0.5) / n;
        addObs('cannon', {
          z: zz, top: p.top, side: i % 2 ? 1 : -1,
          mountX: Math.max(3.2, p.w / 2 + 0.2),
          period: 2.7 + rand() * 0.6, phase: rand()
        });
      }
      decorateSection(p);
    },
    randomized(p, pool, n = 1) {
      const shuffled = pool.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const first = shuffled[0];
      if (first === 'balls') return builders.balls(p);
      if (first === 'sweepers') return builders.sweepers(p, n);
      if (first === 'hammers') return builders.hammers(p, n);
      if (first === 'punches') return builders.punches(p, n);
      if (first === 'walls') return builders.walls(p, n);
      if (first === 'rollers') return builders.rollers(p, n);
      if (first === 'flails') return builders.flails(p, n);
      if (first === 'bumpers') return builders.bumpers(p, n);
      if (first === 'crushers') return builders.crushers(p, n);
      if (first === 'saws') return builders.saws(p, n);
      if (first === 'cannons') return builders.cannons(p, n);
    }
  };

  // collapsing section uses individual tiles
  function addCollapseSection(depth = 22, width = 13, period = 3.15, safeCols = [2]) {
    const gap = 2.2;
    const zBack = cursor - gap;
    const zFront = zBack - depth;
    const cols = 5, rows = 4;
    const tw = width / cols - 0.18, td = depth / rows - 0.18;
    const pg = new THREE.Group();
    group.add(pg);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const tx = -width / 2 + tw / 2 + c * (tw + 0.18);
        const tz = zBack - td / 2 - r * (td + 0.18);
        const safe = safeCols.includes(c);
        const tile = addPlatform({
          x: tx, zBack: tz + td / 2, depth: td, w: tw, top: 0,
          kind: 'tile', color: safe ? theme.platformTrim : ((r + c) % 2 ? theme.platform : theme.platformSide),
          edge: 0.01
        });
        // replace visual with a chunkier tile
        if (tile.mesh) {
          tile.mesh.position.y = 0;
          tile.tileMesh = tile.mesh;
        }
        if (safe) {
          tile.safeLane = true;
          // A lit safe strip is the readable route through the collapse grid.
          addGlow(group, theme.accent, [tx, 0.32, tz], 2.4, 0.3);
        } else {
          tile.collapse = { period, offset: r * 0.45 + c * 0.18 + rand() * 0.08, off: 1.0, active: true };
        }
        tile.active = true;
        tile.baseTop = 0;
      }
    }
    cursor = zFront;
    // safety rails on edges
    return { zBack, zFront };
  }

  function addDiscSection(count = 2, speedBoost = 0) {
    const zBack = cursor - 3;
    let zz = zBack;
    for (let i = 0; i < count; i++) {
      const p = addPlatform({
        x: (i - (count - 1) / 2) * 5.4 + (rand() - 0.5) * 1.2,
        zBack: zz, depth: 8.5, w: 8.6, top: 0, kind: 'disc',
        spinRate: (i % 2 ? -1 : 1) * (1.35 + rand() * 0.65 + speedBoost)
      });
      p.d = 8.5;
      zz = zz - 8.5 - 3.0;
    }
    cursor = zz + 3.0;
    return zz;
  }

  // =========================================================================
  // ROUND LAYOUTS
  // =========================================================================
  const isEndless = endlessLevel > 0;
  const diff = difficulty * (1 + endlessLevel * 0.06);

  if (round === 'qualifier') {
    addCheckpoint(start, 'START', 0);
    const p1 = nextSection(24, { w: 15 });
    builders.randomized(p1, ['balls', 'sweepers', 'rollers', 'bumpers', 'saws'], 2);
    builders.randomized(p1, ['punches', 'walls', 'hammers', 'bumpers', 'cannons'], 1);
    const p2 = nextSection(20, { w: 15 });
    builders.randomized(p2, ['rollers', 'punches', 'walls', 'balls', 'saws'], 2);
    addCheckpoint(p2, 'CHECKPOINT 1', 1);
    const p3 = nextSection(18, { w: 5.2, kind: 'beam', color: theme.platformSide });
    builders.hammers(p3, 2);
    builders.flails(p3, 1);
    const p4 = nextSection(18, { w: 14 });
    builders.walls(p4, 2);
    const p5 = nextSection(10, { w: 12 });
    builders.launch(p5);
    addCheckpoint(p5, 'CHECKPOINT 2', 2);

  } else if (round === 'sweeper') {
    addCheckpoint(start, 'START', 0);
    const p1 = nextSection(24, { w: 15 });
    builders.randomized(p1, ['sweepers', 'walls', 'rollers', 'bumpers', 'saws'], 2);
    builders.bumpers(p1, 1);
    const p2 = nextSection(18, { w: 15 });
    builders.randomized(p2, ['sweepers', 'punches', 'flails', 'bumpers', 'cannons'], 2);
    addCheckpoint(p2, 'CHECKPOINT 1', 1);
    const p3 = addPlatform({ zBack: cursor - 3.0, depth: 8, w: 7.2, x: -2.2 });
    cursor = p3.zFront;
    const p4 = addPlatform({ zBack: cursor - 3.2, depth: 8, w: 7.2, x: 2.2 });
    cursor = p4.zFront;
    const p5 = nextSection(20, { w: 15 });
    builders.randomized(p5, ['sweepers', 'rollers', 'balls', 'bumpers', 'cannons'], 2);
    builders.bumpers(p5, 1);
    addCheckpoint(p5, 'CHECKPOINT 2', 2);
    const p6 = nextSection(18, { w: 4.6, kind: 'beam', color: theme.platformSide });
    builders.randomized(p6, ['hammers', 'flails', 'punches'], 1);
    const p7 = nextSection(16, { w: 14 });
    builders.walls(p7, 2);
    const p8 = nextSection(10, { w: 12 });
    builders.launch(p8);

  } else if (round === 'dizzy') {
    addCheckpoint(start, 'START', 0);
    addDiscSection(2, 0);
    const p1 = nextSection(22, { w: 15 });
    builders.randomized(p1, ['sweepers', 'hammers', 'flails', 'bumpers', 'crushers'], 2);
    builders.randomized(p1, ['rollers', 'walls', 'punches'], 1);
    addCheckpoint(p1, 'CHECKPOINT 1', 1);
    const p2 = nextSection(20, { w: 13, slippery: true, conveyor: { x: -1.4 } });
    builders.randomized(p2, ['rollers', 'walls', 'punches', 'bumpers', 'cannons'], 2);
    builders.bumpers(p2, 1);
    addCheckpoint(p2, 'CHECKPOINT 2', 2);
    addCollapseSection(20, 13, 3.8);
    addDiscSection(2, 0.15);
    const p3 = nextSection(18, { w: 5.0, kind: 'beam', color: theme.platformSide });
    builders.randomized(p3, ['hammers', 'flails', 'punches'], 2);
    const p4 = nextSection(20, { w: 14 });
    builders.randomized(p4, ['punches', 'walls', 'rollers', 'bumpers', 'saws'], 2);
    builders.bumpers(p4, 1);
    addCheckpoint(p4, 'CHECKPOINT 3', 3);
    const p5 = nextSection(10, { w: 12 });
    builders.launch(p5);

  } else { // WIPEOUT ZONE - dense, but every major section has readable lanes
    addCheckpoint(start, 'START', 0);
    const p1 = nextSection(22, { w: 15 });
    builders.randomized(p1, ['sweepers', 'rollers', 'walls', 'bumpers'], 2);
    builders.bumpers(p1, 1);
    const p2 = nextSection(22, { w: 15 });
    builders.randomized(p2, ['punches', 'saws', 'hammers', 'bumpers'], 2);
    builders.cannons(p2, 1);
    addCheckpoint(p2, 'CHECKPOINT 1', 1);
    const p3 = nextSection(22, { w: 14, slippery: true, conveyor: { x: (rand() > 0.5 ? -1 : 1) * 1.8 } });
    builders.randomized(p3, ['rollers', 'balls', 'walls', 'bumpers'], 2);
    builders.bumpers(p3, 1);
    addCheckpoint(p3, 'CHECKPOINT 2', 2);
    addCollapseSection(20, 13, 3.45);
    const p4 = nextSection(22, { w: 14 });
    builders.crushers(p4, 1);
    builders.randomized(p4, ['punches', 'flails', 'hammers', 'walls'], 2);
    addCheckpoint(p4, 'CHECKPOINT 3', 3);
    addDiscSection(3, 0.25);
    const p5 = nextSection(22, { w: 15 });
    builders.randomized(p5, ['sweepers', 'balls', 'rollers', 'bumpers'], 2);
    builders.bumpers(p5, 1);
    addCheckpoint(p5, 'CHECKPOINT 4', 4);
    const p6 = nextSection(20, { w: 5.2, kind: 'beam', color: theme.platformSide });
    builders.randomized(p6, ['hammers', 'flails', 'punches'], 2);
    const p7 = nextSection(20, { w: 14 });
    builders.randomized(p7, ['walls', 'saws', 'sweepers', 'bumpers'], 2);
    builders.bumpers(p7, 1);
    addCheckpoint(p7, 'CHECKPOINT 5', 5);
    const p8 = nextSection(18, { w: 14 });
    builders.randomized(p8, ['rollers', 'walls', 'balls', 'bumpers'], 2);
    builders.randomized(p8, ['punches', 'flails', 'hammers'], 1);
    const p9 = nextSection(10, { w: 12 });
    builders.launch(p9);
    addCheckpoint(p9, 'FINAL CHECKPOINT', 6);
  }

  // =========================================================================
  // FINISH PLATFORM + ARCH
  // =========================================================================
  const finish = addPlatform({
    zBack: cursor - 2.6, depth: 20, w: 20, kind: 'start',
    color: theme.platform, trim: theme.accent
  });
  const finishZ = finish.zBack - 1.5;
  finish.isFinish = true;
  {
    const g = new THREE.Group();
    group.add(g);
    const postMat = toonMat(theme.platformSide);
    [-1, 1].forEach(s => {
      m(g, G.box, postMat, [s * 9.4, 3, finish.zBack - 4], [0.9, 6, 0.9]);
      m(g, G.sphere, toonMat(theme.accent, { emissive: theme.accent, emissiveIntensity: 0.7 }), [s * 9.4, 6.2, finish.zBack - 4], [0.55, 0.55, 0.55]);
    });
    m(g, G.box, toonMat(theme.accent), [0, 6.7, finish.zBack - 4], [19.5, 1.2, 0.8]);
    addGlow(g, theme.accent, [0, 6.9, finish.zBack - 4], 12, 0.3);
    // checkered finish line
    const checker = document.createElement('canvas');
    checker.width = 256; checker.height = 64;
    const cx = checker.getContext('2d');
    for (let yy = 0; yy < 4; yy++) for (let xx = 0; xx < 16; xx++) {
      cx.fillStyle = (xx + yy) % 2 ? '#ffffff' : '#151b26';
      cx.fillRect(xx * 16, yy * 16, 16, 16);
    }
    const tex = new THREE.CanvasTexture(checker);
    tex.colorSpace = THREE.SRGBColorSpace;
    const strip = new THREE.Mesh(new THREE.BoxGeometry(19, 0.31, 2.4), new THREE.MeshToonMaterial({ map: tex }));
    strip.position.set(0, 0.09, finish.zBack - 7.4);
    g.add(strip);
    // podium decor
    const colours = ['#ffd23f', '#c9d6e2', '#d08040'];
    for (let i = 0; i < 3; i++) {
      m(g, G.box, toonMat(colours[i]), [(i - 1) * 4, 0.45 + (1 - Math.abs(i - 1)) * 0.4, finish.zBack - 15], [2.4, 0.9 + (1 - Math.abs(i - 1)) * 0.8, 2.4]);
    }
  }

  const length = 14 - (finish.zFront);
  const parTime = length / 6.2 + (round === 'wipeout' ? 12 : round === 'dizzy' ? 8 : round === 'sweeper' ? 4 : 4) + difficulty * 3;

  const course = {
    round, arena: theme, group, platforms, obstacles, pads, checkpoints, finish, finishZ,
    startZ: 8, startX: 0, top: 0, length, parTime,
    startPlatform: start,
    checkpointsSorted: checkpoints.slice().sort((a, b) => a.index - b.index),

    groundAt(x, z, maxY = 999) {
      let best = null;
      for (let i = 0; i < platforms.length; i++) {
        const p = platforms[i];
        if (!p.active) continue;
        if (!p.contains(x, z)) continue;
        const top = p.topAt(x, z);
        if (top <= maxY + 0.06 && (!best || top > best.top)) best = { platform: p, top };
      }
      return best;
    },

    update(dt, t, player) {
      for (let i = 0; i < obstacles.length; i++) obstacles[i].update(dt, t);
      for (let i = 0; i < platforms.length; i++) {
        const p = platforms[i];
        if (p.kind === 'disc' && p.spinMesh) p.spinMesh.rotation.y = t * p.spinRate;
        if (p.collapse) {
          const c = p.collapse;
          const phase = (t + c.offset) % c.period;
          const wasActive = p.active;
          const offStart = c.period - c.off;
          p.active = phase < offStart;
          if (p.mesh) {
            const targetY = p.active ? 0 : -1.4;
            p.mesh.position.y += (targetY - p.mesh.position.y) * Math.min(1, dt * 12);
            if (p.active && !wasActive) p.mesh.position.y = 0;
            // warning shake
            p.mesh.rotation.z = (!p.active ? 0 : (phase > offStart - 0.55 ? Math.sin(t * 45) * 0.035 : 0));
          }
        }
      }
      // start lights go green after countdown
      if (start.lights) {
        start.lights.children.forEach((l, i) => {
          const on = t > 0.2 + i * 0.7;
          l.material = toonMat(on ? '#6bff9d' : '#ff4d5e', { emissive: on ? '#38ff7d' : '#ff4d5e', emissiveIntensity: 1.1 });
        });
      }
    },

    tryLaunch(pos, feetY) {
      for (let i = 0; i < pads.length; i++) {
        const res = pads[i].tryLaunch(pos, feetY);
        if (res) return res;
      }
      return null;
    },

    hitObstacle(pos, radius, height, invuln) {
      for (let i = 0; i < obstacles.length; i++) {
        const o = obstacles[i];
        if (o.type === 'launch') continue;
        const h = o.hit(pos, radius, height);
        if (h) return h;
      }
      return null;
    },

    // height of the course centreline at z, used by AI rivals
    railGround(z, x = 0) {
      const g = this.groundAt(x, z, 999);
      return g ? g.top : null;
    },

    dispose() {
      group.traverse(o => {
        if (o.geometry && !Object.values(G).includes(o.geometry)) {
          // geometries may be shared; only dispose ones we created here
        }
      });
    }
  };
  return course;
}
