import * as THREE from 'three';
import { toonMat } from './characterRig.js';
import { addGlow } from './fx.js';

// ---------------------------------------------------------------------------
// Shared geometry / helpers
// ---------------------------------------------------------------------------
const G = {
  box: new THREE.BoxGeometry(1, 1, 1),
  sphere: new THREE.SphereGeometry(1, 18, 14),
  cyl: new THREE.CylinderGeometry(1, 1, 1, 14),
  cylAxisX: (() => { const g = new THREE.CylinderGeometry(1, 1, 1, 14); g.rotateZ(Math.PI / 2); return g; })(),
  torus: new THREE.TorusGeometry(1, 0.14, 8, 20)
};

function mesh(parent, geom, mat, pos, scale, rot) {
  const m = new THREE.Mesh(geom, mat);
  if (pos) m.position.set(...pos);
  if (scale) m.scale.set(...scale);
  if (rot) m.rotation.set(...rot);
  parent.add(m);
  return m;
}

const stripeCanvases = new Map();
function stripeTexture(a, b, repeat = 4) {
  const key = a + b + repeat;
  if (stripeCanvases.has(key)) return stripeCanvases.get(key);
  const c = document.createElement('canvas');
  c.width = 128; c.height = 32;
  const ctx = c.getContext('2d');
  ctx.fillStyle = a; ctx.fillRect(0, 0, 128, 32);
  ctx.fillStyle = b;
  for (let i = -4; i < 12; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 16, 0); ctx.lineTo(i * 16 + 9, 0); ctx.lineTo(i * 16 - 7, 32); ctx.lineTo(i * 16 - 16, 32);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat, 1);
  tex.colorSpace = THREE.SRGBColorSpace;
  stripeCanvases.set(key, tex);
  return tex;
}

function hazardMat(arena) {
  return new THREE.MeshToonMaterial({ map: stripeTexture(arena.accent, '#222831', 5) });
}

function glow(parent, color, pos, radius = 0.18) {
  return mesh(parent, G.sphere, toonMat(color, { emissive: color, emissiveIntensity: 1.4 }), pos, [radius, radius, radius]);
}

function beacon(parent, color, pos, size = 2.2, opacity = 0.55) {
  return addGlow(parent, color, pos, size, opacity);
}

// ---------------------------------------------------------------------------
// Floor warning markings. Distinct hazard signatures help players read a lane
// before it punishes them, which matters most in the dense WIPEOUT layout.
// ---------------------------------------------------------------------------
const chevronCache = new Map();
function chevronTexture(color) {
  if (chevronCache.has(color)) return chevronCache.get(color);
  const c = document.createElement('canvas');
  c.width = 128; c.height = 64;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 128, 64);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.85;
  for (let i = -2; i < 10; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 18, 64); ctx.lineTo(i * 18 + 22, 64);
    ctx.lineTo(i * 18 + 40, 0); ctx.lineTo(i * 18 + 18, 0);
    ctx.closePath(); ctx.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  chevronCache.set(color, tex);
  return tex;
}

function hazardStripe(parent, w, d, color, y = 0.035, opacity = 0.42) {
  const map = chevronTexture(color);
  const tex = map.clone();
  tex.needsUpdate = true;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(Math.max(1, Math.round(w / 3)), Math.max(1, Math.round(d / 3)));
  const mat = new THREE.MeshBasicMaterial({
    map: tex, transparent: true, opacity, depthWrite: false, side: THREE.DoubleSide
  });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
  m.rotation.x = -Math.PI / 2;
  m.scale.set(w, d, 1);
  m.position.y = y;
  parent.add(m);
  return m;
}

export const WATER_Y = -2.25;

// ---------------------------------------------------------------------------
// BIG RED BALL
// ---------------------------------------------------------------------------
function bigBall(opt, arena) {
  const group = new THREE.Group();
  group.position.set(opt.x, opt.top, opt.z);
  const r = opt.radius || 2.05;
  const spinGroup = new THREE.Group();
  spinGroup.position.y = r;
  group.add(spinGroup);

  const ballMat = new THREE.MeshToonMaterial({ color: arena.obstacle });
  const ball = new THREE.Mesh(G.sphere, ballMat);
  ball.scale.setScalar(r);
  spinGroup.add(ball);
  // white rings + patches for that inflatable look
  const white = toonMat('#fffaf0');
  mesh(spinGroup, new THREE.TorusGeometry(r * 0.99, r * 0.085, 7, 22), white, [0, 0, 0], [1, 1, 1], [Math.PI / 2, 0, 0]);
  mesh(spinGroup, new THREE.TorusGeometry(r * 0.7, r * 0.07, 7, 20), white, [0, 0, 0], [1, 1, 1], [0, 0, Math.PI / 2]);
  for (let i = 0; i < 5; i++) {
    const a = i / 5 * Math.PI * 2;
    const patch = mesh(spinGroup, G.sphere, white, [Math.cos(a) * r * 0.76, Math.sin(a * 1.3) * r * 0.4, Math.sin(a) * r * 0.76], [r * 0.2, r * 0.2, r * 0.06]);
    patch.lookAt(0, 0, 0);
  }
  // cheerful googly eyes on a non-rolling child so the ball can see its victims
  const face = new THREE.Group();
  face.position.set(0, r * 0.35, -r * 0.82);
  group.add(face);
  const eyeW = toonMat('#ffffff');
  const pupil = toonMat('#1a1a1a');
  mesh(face, G.sphere, eyeW, [-r * 0.27, 0, 0], [r * 0.22, r * 0.25, r * 0.12]);
  mesh(face, G.sphere, eyeW, [r * 0.27, 0, 0], [r * 0.22, r * 0.25, r * 0.12]);
  mesh(face, G.sphere, pupil, [-r * 0.27, 0, -r * 0.1], [r * 0.09, r * 0.11, r * 0.06]);
  mesh(face, G.sphere, pupil, [r * 0.27, 0, -r * 0.1], [r * 0.09, r * 0.11, r * 0.06]);

  const spd = opt.speed || 6.2;
  const span = opt.span || 24;
  const phase = opt.phase || 0;

  return {
    type: 'ball', group, power: 8, yTop: opt.top + r * 2,
    update(dt, t) {
      const prog = ((t * spd / span + phase) % 1);
      const z = opt.zFar + prog * span;
      group.position.z = z;
      const bounce = Math.abs(Math.sin(prog * Math.PI * (opt.hops || 2) + phase * 3));
      group.position.y = opt.top + bounce * (opt.bounceHeight || 0.9);
      spinGroup.rotation.x -= dt * spd / r;
      if (face) face.position.y = r * 0.35 + bounce * 0.1;
    },
    hit(pos, radius, height) {
      const center = new THREE.Vector3(opt.x, group.position.y + r, group.position.z);
      const dx = pos.x - center.x, dz = pos.z - center.z;
      const dist = Math.hypot(dx, dz);
      if (dist > r + radius) return null;
      const feet = pos.y, head = pos.y + height;
      if (head < center.y - r || feet > center.y + r) return null;
      let nx = dx / (dist || 1), nz = dz / (dist || 1);
      nz = Math.max(nz, 0.35); // always shove backwards a bit
      return { nx, nz, power: 11.5, up: 3.8, label: 'BONKED BY A BIG RED BALL' };
    }
  };
}

// ---------------------------------------------------------------------------
// ROTATING SWEEPER
// ---------------------------------------------------------------------------
function sweeper(opt, arena) {
  const group = new THREE.Group();
  group.position.set(opt.x || 0, opt.top, opt.z);
  const reach = opt.reach || 8.4;
  const speed = (opt.speed || 2.05) * (opt.dir || 1);

  const hub = mesh(group, G.cyl, toonMat(arena.platformTrim), [0, 0.75, 0], [0.75, 1.5, 0.75]);
  mesh(group, G.cyl, toonMat('#30363f'), [0, 1.52, 0], [0.9, 0.12, 0.9]);
  glow(group, arena.accent, [0, 1.72, 0], 0.22);

  const arm = new THREE.Group();
  arm.position.y = 0.78;
  group.add(arm);
  const bar = mesh(arm, G.cylAxisX, hazardMat(arena), [0, 0, 0], [reach, 0.62, 0.62]);
  bar.rotation.z = Math.PI / 2;
  mesh(arm, G.cylAxisX, toonMat('#30363f'), [0, 0, 0], [reach, 0.3, 0.3]);
  // end caps
  [-1, 1].forEach(s => {
    mesh(arm, G.sphere, toonMat(arena.accent), [s * reach, 0, 0], [0.55, 0.55, 0.55]);
    glow(arm, arena.accent, [s * reach, 0.35, 0], 0.14);
  });
  // paddles for visibility
  for (let i = -2; i <= 2; i++) {
    if (i === 0) continue;
    mesh(arm, G.box, toonMat(arena.platformTrim), [i * reach * 0.32, 0.35, 0], [1.1, 0.12, 0.6]);
  }

  // support base
  mesh(group, G.cyl, toonMat(arena.platformSide), [0, -0.4, 0], [1.2, 0.8, 1.2]);
  hazardStripe(group, reach * 2 + 1.2, 1.05, arena.accent, 0.035, 0.3);
  beacon(group, arena.accent, [0, 1.85, 0], 2.4, 0.4);

  return {
    type: 'sweeper', group, power: 11,
    update(dt, t) {
      const angle = t * speed + (opt.phase || 0);
      arm.rotation.y = angle;
      this.angle = angle;
    },
    hit(pos, radius, height) {
      if (pos.y > opt.top + 1.15) return null; // jumped clean over
      if (pos.y + height < opt.top + 0.15) return null;
      const ang = this.angle || 0;
      const dx = pos.x - group.position.x, dz = pos.z - group.position.z;
      const cos = Math.cos(ang), sin = Math.sin(ang);
      const lx = dx * cos - dz * sin;
      const lz = dx * sin + dz * cos;
      if (Math.abs(lx) > reach + radius || Math.abs(lz) > 0.55 + radius) return null;
      if (Math.hypot(lx, lz) < 0.8) return null;
      const sgn = Math.sign(speed);
      const tx = -Math.sin(ang) * sgn, tz = -Math.cos(ang) * sgn;
      return { nx: tx, nz: tz + 0.55, power: 14.5, up: 4.6, label: 'SWEPT OFF YOUR FEET' };
    }
  };
}

// ---------------------------------------------------------------------------
// SWINGING HAMMER
// ---------------------------------------------------------------------------
function hammer(opt, arena) {
  const group = new THREE.Group();
  group.position.set(opt.x || 0, opt.top, opt.z);
  const h = opt.pivotH || 5.4;
  const len = opt.arm || 4.0;
  const amp = opt.amp || 1.38;
  const speed = opt.speed || 1.75;
  const axis = opt.axis || 'x';
  const phase = opt.phase || 0;

  // gantry frame
  const frameMat = toonMat(arena.platformSide);
  const postMat = toonMat(arena.platformTrim);
  mesh(group, G.box, frameMat, [-reachX(opt), h * 0.72, 0], [0.6, h * 2, 0.6]);
  mesh(group, G.box, frameMat, [reachX(opt), h * 0.72, 0], [0.6, h * 2, 0.6]);
  mesh(group, G.box, postMat, [0, h, 0], [reachX(opt) * 2 + 0.6, 0.7, 0.7]);
  glow(group, arena.accent, [0, h + 0.5, 0], 0.2);
  hazardStripe(group, reachX(opt) * 2, 3.2, arena.obstacle, 0.035, 0.3);
  beacon(group, arena.accent, [0, h + 0.55, 0], 2.6, 0.5);

  const swing = new THREE.Group();
  swing.position.set(0, h, 0);
  group.add(swing);
  // chain
  mesh(swing, G.cyl, toonMat('#4a4f59'), [0, -len / 2, 0], [0.16, len, 0.16]);
  for (let i = 1; i < 5; i++) {
    mesh(swing, G.torus, toonMat('#8e98a3'), [0, -len * i / 5, 0], [0.25, 0.25, 0.25], [Math.PI / 2, 0, 0]);
  }
  // glove
  const glove = new THREE.Group();
  glove.position.y = -len;
  swing.add(glove);
  mesh(glove, G.sphere, toonMat(arena.obstacle), [0, 0, 0], [1.15, 1.1, 1.15]);
  mesh(glove, G.cyl, toonMat('#f6f6fa'), [0, -0.75, 0], [0.72, 0.4, 0.72]);
  mesh(glove, G.sphere, toonMat(arena.obstacle), [0.55, 0.5, -0.55], [0.4, 0.4, 0.4]);
  glow(glove, arena.accent, [0, 1.2, 0], 0.13);

  const headWorld = new THREE.Vector3();

  return {
    type: 'hammer', group, power: 13,
    update(dt, t) {
      const a = Math.sin(t * speed + phase) * amp;
      if (axis === 'x') swing.rotation.z = a;
      else swing.rotation.x = a;
      glove.getWorldPosition(headWorld);
    },
    hit(pos, radius, height) {
      const gh = headWorld;
      const dx = pos.x - gh.x, dy = pos.y + height * 0.5 - gh.y, dz = pos.z - gh.z;
      const rr = 1.15 + radius;
      if (dx * dx + dz * dz > rr * rr) return null;
      if (Math.abs(dy) > 1.15 + height * 0.5) return null;
      const len2 = Math.hypot(dx, dz) || 1;
      return { nx: dx / len2, nz: dz / len2 + 0.55, power: 16.5, up: 5.2, label: 'HAMMERED!' };
    }
  };
}
function reachX(opt) { return opt.frame || 5.4; }

// ---------------------------------------------------------------------------
// PUNCHING GLOVE
// ---------------------------------------------------------------------------
function punch(opt, arena) {
  const group = new THREE.Group();
  group.position.set(opt.x || 0, opt.top, opt.z);
  const side = opt.side || 1;
  const baseX = side * (opt.mountX || 6.4);
  const period = opt.period || 2.05;
  const extendMax = opt.extend || 5.2;
  const phase = opt.phase || 0;

  const mount = new THREE.Group();
  mount.position.set(baseX, 0.95, 0);
  group.add(mount);
  mesh(mount, G.box, toonMat(arena.platformSide), [0, -0.45, 0], [1.5, 1.6, 1.6]);
  const warn = glow(mount, arena.accent, [0, 0.6, 0.9], 0.2);
  mesh(mount, G.cylAxisX, toonMat('#afb9c4'), [side * -0.9, 0, 0], [1.8, 0.34, 0.34]);
  hazardStripe(group, opt.extend || 5.2, 2.1, arena.accent2 || arena.accent, 0.035, 0.3);
  beacon(group, arena.accent, [baseX, 1.7, 0], 2.0, 0.42);
  const glove = new THREE.Group();
  glove.position.set(0, 0, 0);
  mount.add(glove);
  mesh(glove, G.sphere, toonMat(arena.obstacle), [0, 0, 0], [0.95, 0.82, 0.82]);
  mesh(glove, G.cylAxisX, toonMat('#f6f6fa'), [side * 0.95, 0, 0], [0.55, 0.72, 0.72]);
  mesh(glove, G.sphere, toonMat(arena.obstacle), [0, 0.5, 0.35], [0.32, 0.32, 0.32]);

  let curExt = 0;
  return {
    type: 'punch', group, power: 9.5,
    update(dt, t) {
      const p = ((t / period + phase) % 1);
      let ext;
      if (p < 0.55) {
        const q = p / 0.55;
        ext = q < 0.35 ? -0.55 * (q / 0.35) : (q - 0.35) / 0.65 * (extendMax + 0.55) - 0.55;
      } else {
        const q = (p - 0.55) / 0.45;
        ext = extendMax * (1 - q * q);
      }
      curExt = ext;
      glove.position.x = side * -ext;
      warn.scale.setScalar(p > 0.8 ? 0.2 + Math.sin(t * 22) * 0.07 + 0.18 : 0.14);
    },
    hit(pos, radius, height) {
      const gx = group.position.x + baseX + side * -curExt;
      const gy = opt.top + 0.95;
      const dx = pos.x - gx, dz = pos.z - group.position.z;
      const rr = 0.95 + radius;
      if (dx * dx + dz * dz > rr * rr) return null;
      if (pos.y > gy + 0.95 || pos.y + height < gy - 0.95) return null;
      return { nx: -side * 1.15, nz: 0.75, power: 13.5, up: 4.5, label: 'SURPRISE PUNCH!' };
    }
  };
}

// ---------------------------------------------------------------------------
// MOVING WALL
// ---------------------------------------------------------------------------
function movingWall(opt, arena) {
  const group = new THREE.Group();
  group.position.set(0, opt.top, opt.z);
  const w = opt.w || 4.2;
  const h = 2.4;
  const move = new THREE.Group();
  group.add(move);
  mesh(move, G.box, hazardMat(arena), [0, h / 2, 0], [w, h, 0.5]);
  mesh(move, G.box, toonMat(arena.platformSide), [0, h + 0.08, 0], [w + 0.2, 0.16, 0.7]);
  [-1, 1].forEach(s => {
    mesh(move, G.cyl, toonMat(arena.platformSide), [s * w * 0.42, h / 2, 0.32], [0.22, h, 0.22]);
    glow(move, arena.accent, [s * w * 0.42, h + 0.22, 0.3], 0.13);
  });
  // track
  mesh(group, G.box, toonMat('#30363f'), [0, 0.04, 0], [opt.track || 12, 0.08, 0.75]);
  hazardStripe(group, opt.track || 12, 1.25, arena.accent, 0.03, 0.24);
  const amp = opt.amp || 4.8;
  const speed = opt.speed || 1.45;
  const phase = opt.phase || 0;
  let x = 0;

  return {
    type: 'wall', group, power: 8.5,
    update(dt, t) {
      x = Math.sin(t * speed + phase) * amp + (opt.x || 0);
      move.position.x = x;
      move.rotation.z = Math.sin(t * speed + phase) * 0.02;
      this.time = t;
    },
    hit(pos, radius, height) {
      if (pos.y > opt.top + h) return null;
      if (pos.y + height < opt.top) return null;
      const dx = pos.x - group.position.x - x;
      if (Math.abs(dx) > w / 2 + radius) return null;
      if (Math.abs(pos.z - group.position.z) > 0.3 + radius) return null;
      const tt = this.time || 0;
      const vx = Math.cos(tt * speed + phase) * amp * speed;
      return { nx: Math.sign(vx || 1), nz: 0.75, power: 12, up: 3.8, label: 'CLOTHESLINED BY A WALL' };
    }
  };
}
let tNow = 0;

// ---------------------------------------------------------------------------
// ROLLING CYLINDER
// ---------------------------------------------------------------------------
function roller(opt, arena) {
  const group = new THREE.Group();
  group.position.set(opt.x || 0, opt.top + (opt.radius || 0.55), opt.z || 0);
  const r = opt.radius || 0.55;
  const len = opt.len || 5.2;
  const bar = new THREE.Mesh(G.cylAxisX, new THREE.MeshToonMaterial({ map: stripeTexture('#f6f6fa', arena.obstacle, 3) }));
  bar.scale.set(r, r, r);
  bar.scale.x = r;
  // using cylinder axis X geometry: scale radius in Y/Z and length in X
  bar.scale.set(len, r, r);
  group.add(bar);
  [-1, 1].forEach(s => mesh(group, G.cylAxisX, toonMat(arena.platformSide), [s * len / 2, 0, 0], [0.12, r * 1.02, r * 1.02]));
  const span = opt.span || 26;
  const speed = opt.speed || 6.8;

  return {
    type: 'roller', group, power: 7,
    update(dt, t) {
      const prog = ((t * speed / span + (opt.phase || 0)) % 1);
      group.position.z = opt.zFar + prog * span;
      group.rotation.x = -prog * span / r;
    },
    hit(pos, radius, height) {
      const dx = pos.x - group.position.x, dz = pos.z - group.position.z;
      const rr = r + radius;
      if (dx * dx + dz * dz > rr * rr) return null;
      if (pos.y > group.position.y + r * 0.85) return null;
      if (pos.y + height < group.position.y - r) return null;
      const nz = dz / (Math.hypot(dx, dz) || 1);
      return { nx: dx / (Math.hypot(dx, dz) || 1) * 0.75, nz: 0.75 + nz, power: 11.5, up: 4.0, label: 'FLATTENED BY A ROLLER' };
    }
  };
}

// ---------------------------------------------------------------------------
// LAUNCH PAD (trigger, not knockback)
// ---------------------------------------------------------------------------
function launchPad(opt, arena) {
  const group = new THREE.Group();
  group.position.set(opt.x || 0, opt.top, opt.z);
  const mat = toonMat(arena.accent2, { emissive: arena.accent2, emissiveIntensity: 0.35 });
  mesh(group, G.cyl, mat, [0, 0.09, 0], [1.9, 0.16, 1.9]);
  mesh(group, new THREE.CylinderGeometry(1.5, 1.7, 0.12, 16), toonMat('#f6f6fa'), [0, 0.19, 0], [1, 1, 1]);
  for (let i = 0; i < 3; i++) {
    const a = mesh(group, new THREE.ConeGeometry(0.45, 0.9, 4), toonMat(arena.accent), [0, 0.5, -1.3 + i * 0.75], [1, 1, 1], [Math.PI / 2, 0, 0]);
    a.rotation.x = 0;
  }
  const spring = mesh(group, G.box, toonMat('#30363f'), [0, 0.22, 0], [2.8, 0.1, 2.8]);
  const arrowMat = toonMat(arena.accent, { emissive: arena.accent, emissiveIntensity: 0.6 });
  const arrows = [];
  for (let i = 0; i < 2; i++) {
    const a = mesh(group, new THREE.ConeGeometry(0.55, 1.1, 3), arrowMat, [0, 0.35, 1.2 + i * 0.9], [1, 1, 1], [Math.PI / 2, 0, 0]);
    arrows.push(a);
  }
  let cooldown = 0;
  return {
    type: 'launch', group, power: 0, box: { w: 3.2, d: 3.2 },
    update(dt, t) {
      cooldown = Math.max(0, cooldown - dt);
      spring.scale.y = 1 + Math.sin(t * 5) * 0.4;
      arrows.forEach((a, i) => {
        a.position.z = 1.1 + ((t * 2.2 + i * 0.9) % 1.8);
        a.material.opacity = 1;
      });
    },
    tryLaunch(pos, feetY) {
      if (cooldown > 0) return false;
      if (Math.abs(pos.x - (opt.x || 0)) > 1.8 || Math.abs(pos.z - opt.z) > 1.8) return false;
      if (Math.abs(feetY - opt.top) > 0.5) return false;
      cooldown = 0.75;
      return { power: opt.power || 19, forward: opt.forward || 9 };
    },
    hit() { return null; }
  };
}

// ---------------------------------------------------------------------------
// SWINGING FLAIL - faster, lower pendulum for narrow timing windows
// ---------------------------------------------------------------------------
function flail(opt, arena) {
  const group = new THREE.Group();
  group.position.set(opt.x || 0, opt.top, opt.z);
  const pivotH = opt.pivotH || 4.8;
  const arm = opt.arm || 4.2;
  const amp = opt.amp || 0.92;
  const speed = opt.speed || 1.9;
  const phase = opt.phase || 0;

  mesh(group, G.box, toonMat(arena.platformSide), [-4.2, pivotH * 0.5, 0], [0.55, pivotH, 0.55]);
  mesh(group, G.box, toonMat(arena.platformSide), [4.2, pivotH * 0.5, 0], [0.55, pivotH, 0.55]);
  mesh(group, G.box, toonMat(arena.platformTrim), [0, pivotH, 0], [8.5, 0.55, 0.55]);
  hazardStripe(group, 7.2, 2.4, arena.obstacle, 0.035, 0.28);
  beacon(group, arena.accent, [0, pivotH + 0.4, 0], 2.2, 0.45);

  const swing = new THREE.Group();
  swing.position.set(0, pivotH, 0);
  group.add(swing);
  mesh(swing, G.cyl, toonMat('#5f6670'), [0, -arm * 0.5, 0], [0.12, arm, 0.12]);
  const head = mesh(swing, G.sphere, toonMat(arena.obstacle), [0, -arm, 0], [1.2, 1.2, 1.2]);
  mesh(head, G.torus, toonMat(arena.accent), [0, 0, 0], [1.05, 1.05, 1.05], [Math.PI / 2, 0, 0]);
  beacon(swing, arena.accent, [0, -arm, 0], 2.2, 0.5);
  const headWorld = new THREE.Vector3();

  return {
    type: 'flail', group, power: 15,
    update(dt, t) {
      swing.rotation.z = Math.sin(t * speed + phase) * amp;
      head.getWorldPosition(headWorld);
    },
    hit(pos, radius, height) {
      const dx = pos.x - headWorld.x;
      const dy = pos.y + height * 0.5 - headWorld.y;
      const dz = pos.z - headWorld.z;
      if (dx * dx + dy * dy + dz * dz > (1.2 + radius) ** 2) return null;
      const len = Math.hypot(dx, dz) || 1;
      return { nx: dx / len, nz: dz / len + 0.65, power: 15, up: 5.2, label: 'CRUSHED BY THE FLAIL!' };
    }
  };
}

// ---------------------------------------------------------------------------
// POP-UP BOMPER - alternating, retractable impact columns
// ---------------------------------------------------------------------------
function bumper(opt, arena) {
  const group = new THREE.Group();
  group.position.set(opt.x || 0, opt.top, opt.z);
  const r = opt.radius || 0.72;
  const height = opt.height || 2;
  const phase = opt.phase || 0;
  const period = opt.period || 1.9;
  const column = new THREE.Group();
  group.add(column);
  mesh(column, G.cyl, toonMat(arena.platformSide), [0, -0.45, 0], [r * 1.15, 0.9, r * 1.15]);
  mesh(column, G.sphere, toonMat(arena.obstacle), [0, 0, 0], [r, r, r]);
  glow(column, arena.accent, [0, r * 0.55, 0], 0.16);
  beacon(column, arena.accent, [0, r * 0.6, 0], 1.9, 0.5);
  hazardStripe(group, r * 4.2, r * 4.2, arena.accent, 0.03, 0.3);

  return {
    type: 'bumper', group, power: 13,
    update(dt, t) {
      const p = ((t / period + phase) % 1);
      const raised = p < 0.58;
      column.position.y = raised ? height * (0.5 + 0.5 * Math.sin(p * Math.PI / 0.58)) : -0.8;
      column.visible = raised;
    },
    hit(pos, radius, height) {
      if (!column.visible) return null;
      const cx = group.position.x;
      const cy = opt.top + column.position.y;
      const dx = pos.x - cx, dz = pos.z - opt.z;
      if (dx * dx + dz * dz > (r + radius) ** 2) return null;
      if (pos.y > cy + r || pos.y + height < cy - r) return null;
      const len = Math.hypot(dx, dz) || 1;
      return { nx: dx / len, nz: dz / len + 0.7, power: 13, up: 5, label: 'Popped by a BUMPER!' };
    }
  };
}

// ---------------------------------------------------------------------------
// HYDRAULIC CRUSHER - heavy, telegraphed vertical slam
// ---------------------------------------------------------------------------
function crusher(opt, arena) {
  const group = new THREE.Group();
  group.position.set(opt.x || 0, opt.top, opt.z);
  const s = opt.size || 2.7;
  const lift = opt.lift || 5.0;
  const period = opt.period || 2.7;
  const phase = opt.phase || 0;

  const postMat = toonMat(arena.platformSide);
  const trimMat = toonMat(arena.platformTrim);
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => {
    mesh(group, G.box, postMat, [sx * s * 0.74, lift * 0.52, sz * s * 0.74], [0.34, lift * 1.04, 0.34]);
    glow(group, arena.accent, [sx * s * 0.74, lift * 0.98, sz * s * 0.74], 0.1);
  });
  mesh(group, G.box, postMat, [0, lift, 0], [s * 1.84, 0.52, s * 1.84]);
  mesh(group, G.box, trimMat, [0, lift + 0.32, 0], [s * 1.9, 0.14, s * 1.9]);

  const head = new THREE.Group();
  head.position.y = lift;
  group.add(head);
  mesh(head, G.box, hazardMat(arena), [0, 0, 0], [s, 1.12, s]);
  mesh(head, G.box, toonMat('#30363f'), [0, 0.6, 0], [s * 1.04, 0.18, s * 1.04]);
  const toothGeo = new THREE.ConeGeometry(0.24, 0.48, 4);
  for (let i = -1; i <= 1; i++) {
    for (let k = -1; k <= 1; k++) {
      mesh(head, toothGeo, trimMat, [i * s * 0.29, -0.72, k * s * 0.29], [1, 1, 1], [Math.PI, 0, 0]);
    }
  }
  const headBeacon = beacon(head, arena.accent, [0, 0.88, 0], 2.5, 0.5);
  const decal = hazardStripe(group, s * 1.12, s * 1.12, arena.obstacle, 0.04, 0.35);

  return {
    type: 'crusher', group, power: 18,
    update(dt, t) {
      const p = ((t / period + phase) % 1);
      let y;
      if (p < 0.6) {
        y = lift + Math.sin(t * 2.4) * 0.07;
      } else if (p < 0.72) {
        const q = (p - 0.6) / 0.12;
        y = lift * (1 - q * q) + 1.22 * q * q;
      } else if (p < 0.84) {
        y = 1.22 + Math.sin(t * 46) * 0.025;
      } else {
        const q = (p - 0.84) / 0.16;
        y = 1.22 + (lift - 1.22) * (q * q * (3 - 2 * q));
      }
      head.position.y = y;
      head.rotation.z = p > 0.6 && p < 0.85 ? Math.sin(t * 52) * 0.02 : 0;
      decal.material.opacity = p > 0.45 && p < 0.72
        ? 0.55 + Math.sin(t * 30) * 0.25
        : 0.24 + Math.sin(t * 5) * 0.06;
      if (headBeacon) headBeacon.material.opacity = p > 0.45 && p < 0.72 ? 0.85 : 0.45;
    },
    hit(pos, radius, height) {
      const cy = opt.top + head.position.y;
      if (pos.y > cy + 0.8) return null;
      if (pos.y + height < cy - 0.62) return null;
      const dx = pos.x - (opt.x || 0);
      const dz = pos.z - opt.z;
      const half = s / 2 + radius;
      if (Math.abs(dx) > half || Math.abs(dz) > half) return null;
      return {
        nx: Math.abs(dx) > 0.01 ? Math.sign(dx) * 0.75 : 0.25,
        nz: 0.8, power: 19, up: 6.2,
        label: 'FLATTENED BY THE CRUSHER!'
      };
    }
  };
}

// ---------------------------------------------------------------------------
// BUZZSAW - fast spinning blade that sweeps sideways across the lane
// ---------------------------------------------------------------------------
function saw(opt, arena) {
  const group = new THREE.Group();
  group.position.set(opt.x || 0, opt.top, opt.z);
  const r = opt.radius || 1.05;
  const amp = opt.amp || 3.2;
  const speed = opt.speed || 1.55;
  const phase = opt.phase || 0;

  // rail + warning floor
  mesh(group, G.box, toonMat('#30363f'), [0, 0.05, 0], [amp * 2 + 1.6, 0.09, 0.7]);
  hazardStripe(group, amp * 2 + 1.8, 1.9, arena.accent2 || arena.accent, 0.03, 0.28);

  const slide = new THREE.Group();
  slide.position.y = r + 0.42;
  group.add(slide);
  const blade = new THREE.Group();
  slide.add(blade);

  const steel = toonMat('#c7d3de');
  const dark = toonMat('#4a5059');
  const disc = mesh(blade, new THREE.CylinderGeometry(r, r, 0.2, 28), steel, [0, 0, 0], [1, 1, 1], [Math.PI / 2, 0, 0]);
  mesh(blade, G.torus, toonMat(arena.accent2 || arena.accent), [0, 0, 0], [r * 0.93, r * 0.93, r * 1.15]);
  mesh(blade, G.cyl, dark, [0, 0, 0], [r * 0.3, 0.34, r * 0.3], [Math.PI / 2, 0, 0]);
  const toothGeo = new THREE.ConeGeometry(r * 0.18, r * 0.42, 3);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    mesh(blade, toothGeo, steel,
      [Math.cos(a) * (r * 0.92), Math.sin(a) * (r * 0.92), 0],
      [1, 1, 1], [0, 0, a - Math.PI / 2]);
  }
  beacon(slide, arena.accent2 || arena.accent, [0, 0, 0], r * 4.4, 0.3);
  // sparks
  const sparkMat = toonMat('#ffe066', { emissive: '#ffb02e', emissiveIntensity: 1.2 });
  for (let i = 0; i < 4; i++) {
    const sp = mesh(group, G.sphere, sparkMat, [0, 0.3 + i * 0.08, 0.5], [0.07, 0.07, 0.07]);
    sp.userData.spark = i;
  }

  return {
    type: 'saw', group, power: 15,
    update(dt, t) {
      slide.position.x = Math.sin(t * speed + phase) * amp;
      blade.rotation.z = -t * 14;
      group.children.forEach(c => {
        if (c.userData.spark !== undefined) {
          const k = c.userData.spark;
          c.position.x = slide.position.x + Math.sin(t * 17 + k * 2.1) * 0.24;
          c.position.y = 0.25 + Math.abs(Math.sin(t * 13 + k)) * 0.32;
          c.position.z = 0.45 + Math.cos(t * 9 + k) * 0.2;
          c.visible = Math.sin(t * 7 + k * 1.7) > 0.2;
        }
      });
    },
    hit(pos, radius, height) {
      const cx = (opt.x || 0) + slide.position.x;
      const cy = opt.top + slide.position.y;
      if (pos.y > cy + r * 0.92) return null;
      if (pos.y + height < cy - r * 0.92) return null;
      const dx = pos.x - cx, dz = pos.z - opt.z;
      if (dx * dx + dz * dz > (r * 0.86 + radius) ** 2) return null;
      const len = Math.hypot(dx, dz) || 1;
      return { nx: dx / len, nz: dz / len + 0.7, power: 15.5, up: 5, label: 'CHOMPED BY THE BUZZSAW!' };
    }
  };
}

// ---------------------------------------------------------------------------
// FOAM CANNON - periodic projectile crossing the platform
// ---------------------------------------------------------------------------
function cannon(opt, arena) {
  const group = new THREE.Group();
  group.position.set(0, opt.top, opt.z);
  const side = opt.side || 1;
  const mountX = opt.mountX || 7.0;
  const period = opt.period || 2.9;
  const phase = opt.phase || 0;
  const wind = 0.3;
  const travel = 0.42;

  const turret = new THREE.Group();
  turret.position.set(side * mountX, 0, 0);
  group.add(turret);
  mesh(turret, G.box, toonMat(arena.platformSide), [0, 0.55, 0], [1.7, 1.3, 1.7]);
  mesh(turret, G.cyl, toonMat(arena.platformTrim), [0, 1.2, 0], [0.55, 0.5, 0.55]);
  const barrel = mesh(turret, G.cylAxisX, toonMat('#aab4be'), [-side * 1.15, 0.9, 0], [2.3, 0.42, 0.42]);
  const muzzle = beacon(turret, arena.accent2 || arena.accent, [-side * 2.35, 0.9, 0], 2.2, 0.35);
  hazardStripe(group, mountX * 2, 1.5, arena.accent2 || arena.accent, 0.03, 0.26);

  const proj = new THREE.Group();
  group.add(proj);
  const ballMat = toonMat(arena.accent2 || arena.accent, { emissive: arena.accent2 || arena.accent, emissiveIntensity: 0.25 });
  mesh(proj, G.sphere, ballMat, [0, 0, 0], [0.62, 0.62, 0.62]);
  mesh(proj, G.torus, toonMat('#fffaf0'), [0, 0, 0], [0.55, 0.55, 0.7], [Math.PI / 2, 0, 0]);
  mesh(proj, G.torus, toonMat('#fffaf0'), [0, 0, 0], [0.55, 0.55, 0.7], [0, 0, Math.PI / 2]);
  const projGlow = beacon(proj, arena.accent2 || arena.accent, [0, 0, 0], 2.2, 0.4);
  proj.visible = false;

  let px = side * mountX;
  return {
    type: 'cannon', group, power: 12,
    update(dt, t) {
      const p = ((t / period + phase) % 1);
      if (p >= wind && p < wind + travel) {
        const q = (p - wind) / travel;
        px = side * mountX + (-side * mountX * 2) * q;
        proj.visible = true;
        proj.position.set(px, 1.18, 0);
        proj.rotation.z -= dt * 9;
      } else {
        proj.visible = false;
      }
      const charging = p < wind;
      const charge = charging ? 0.4 + (p / wind) * 0.6 : 0.35;
      if (muzzle) muzzle.material.opacity = charge;
      if (projGlow) projGlow.material.opacity = proj.visible ? 0.55 : 0;
      barrel.position.x = -side * (1.15 - (charging ? 0.12 * (p / wind) : 0));
      barrel.rotation.z = charging ? Math.sin(t * 18) * 0.02 : 0;
    },
    hit(pos, radius, height) {
      if (!proj.visible) return null;
      const gy = opt.top + 1.18;
      if (pos.y > gy + 0.7 || pos.y + height < gy - 0.7) return null;
      const dx = pos.x - px, dz = pos.z - opt.z;
      if (dx * dx + dz * dz > (0.68 + radius) ** 2) return null;
      return { nx: -side * 0.9, nz: 0.7, power: 12.5, up: 4.2, label: 'FOAM CANNONED!' };
    }
  };
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------
const BUILDERS = {
  ball: bigBall, sweeper, hammer, punch, wall: movingWall, roller,
  launch: launchPad, flail, bumper, crusher, saw, cannon
};

export function createObstacle(type, opt, arena) {
  const build = BUILDERS[type];
  if (!build) throw new Error('Unknown obstacle ' + type);
  return build(opt, arena);
}

export function tickWallTime(t) { tNow = t; }

// checkpoint gate visual
export function createCheckpointGate(arena, z, index) {
  const group = new THREE.Group();
  group.position.set(0, 0.3, z);
  const postMat = toonMat(arena.platformSide);
  const glowMat = toonMat('#6bff9d', { emissive: '#38ff7d', emissiveIntensity: 1 });
  [-1, 1].forEach(s => {
    mesh(group, G.box, postMat, [s * 7, 1.8, 0], [0.5, 3.6, 0.5]);
    mesh(group, G.sphere, glowMat, [s * 7, 3.65, 0], [0.35, 0.35, 0.35]);
  });
  mesh(group, G.box, new THREE.MeshToonMaterial({ color: arena.accent2, transparent: true, opacity: 0.32 }), [0, 3.3, 0], [13.4, 0.8, 0.12]);
  addGlow(group, '#6bff9d', [0, 3.45, 0], 8, 0.22);
  return group;
}
