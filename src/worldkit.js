import * as THREE from 'three';
import { getGlowTexture } from './character.js';

export const TAU = Math.PI * 2;
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const smooth = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
export const dist2 = (x, z, cx, cz) => Math.hypot(x - cx, z - cz);
export const rand = (a = 0, b = 1) => a + Math.random() * (b - a);
export const pick = arr => arr[Math.floor(Math.random() * arr.length)];

export function mulberry32(seed) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export function heightAt(x, z) {
  let h = Math.sin(x * 0.043) * 2.0 + Math.cos(z * 0.041) * 1.7 + Math.sin((x + z) * 0.021) * 3.2 + Math.sin(x * 0.12 + z * 0.08) * 0.55;
  const dA = dist2(x, z, -64, -44);
  h += 15 * Math.exp(-(dA * dA) / (2 * 40 * 40));
  h = lerp(h, 10.4, smooth(34, 17, dA) * 0.9);
  const dV = dist2(x, z, 0, 46);
  h = lerp(h, 0.15, smooth(34, 8, dV));
  const dL = dist2(x, z, 52, 78);
  h -= 8.4 * Math.exp(-(dL * dL) / (2 * 35 * 35));
  const dR = dist2(x, z, -78, 82);
  h -= 2.2 * Math.exp(-(dR * dR) / (2 * 30 * 30));
  const dC = dist2(x, z, 104, 66);
  h += 7.0 * Math.exp(-(dC * dC) / (2 * 26 * 26));
  const dK = dist2(x, z, 112, -88);
  h += 17.0 * Math.exp(-(dK * dK) / (2 * 30 * 30));
  const dS = dist2(x, z, 0, -132);
  h += 6.5 * Math.exp(-(dS * dS) / (2 * 24 * 24));
  return h;
}

export function canvasTexture(w, h, draw, { repeat = 1, aniso = 4 } = {}) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  draw(ctx, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = aniso;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  return t;
}

export function std(color, opts = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.86, metalness: 0.05, ...opts });
}

export function addBox(parent, o) {
  const mat = o.mat || std(o.color || '#6a6a7a');
  const m = new THREE.Mesh(new THREE.BoxGeometry(o.w || 1, o.h || 1, o.d || 1), mat);
  m.position.set(o.x || 0, o.y || 0, o.z || 0);
  if (o.rx) m.rotation.x = o.rx;
  if (o.ry) m.rotation.y = o.ry;
  if (o.rz) m.rotation.z = o.rz;
  if (o.shadow !== false) m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

export function addCyl(parent, o) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(o.rt ?? o.r ?? 1, o.rb ?? o.r ?? 1, o.h || 1, o.seg || 10, 1, o.open || false), o.mat || std(o.color || '#6a6a7a'));
  m.position.set(o.x || 0, o.y || 0, o.z || 0);
  if (o.rx) m.rotation.x = o.rx;
  if (o.ry) m.rotation.y = o.ry;
  if (o.rz) m.rotation.z = o.rz;
  if (o.shadow !== false) m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

export function addCone(parent, o) {
  const m = new THREE.Mesh(new THREE.ConeGeometry(o.r || 1, o.h || 2, o.seg || 8), o.mat || std(o.color || '#6a6a7a'));
  m.position.set(o.x || 0, o.y || 0, o.z || 0);
  if (o.rx) m.rotation.x = o.rx;
  if (o.ry) m.rotation.y = o.ry;
  if (o.rz) m.rotation.z = o.rz;
  if (o.shadow !== false) m.castShadow = true;
  parent.add(m);
  return m;
}

export function addGlow(parent, color, scale = 1, x = 0, y = 0, z = 0, opacity = 0.85) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: getGlowTexture(), color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false }));
  s.scale.set(scale, scale, 1);
  s.position.set(x, y, z);
  parent.add(s);
  return s;
}

export function addPointLight(parent, color, intensity = 1, distance = 14, x = 0, y = 1, z = 0) {
  const l = new THREE.PointLight(color, intensity, distance, 2);
  l.position.set(x, y, z);
  parent.add(l);
  return l;
}

export function textPlane(text, { color = '#e9c988', bg = 'rgba(12,8,20,.8)', border = 'rgba(233,201,136,.35)', width = 512, height = 128, font = '700 44px Cinzel, Georgia, serif', letter = 4 } = {}) {
  const tex = canvasTexture(width, height, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    if (bg) {
      ctx.fillStyle = bg;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(6, 6, w - 12, h - 12, 6); else ctx.rect(6, 6, w - 12, h - 12);
      ctx.fill();
      ctx.strokeStyle = border; ctx.lineWidth = 2; ctx.stroke();
    }
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = `${letter}px`;
    ctx.fillText(text, w / 2, h / 2 + 2);
  });
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, side: THREE.DoubleSide });
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
}

export function runeRingTexture(color = '#9fe7ff', { size = 512, ring = true } = {}) {
  return canvasTexture(size, size, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2, r = w * 0.44;
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.6;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke();
    ctx.globalAlpha = 0.28;
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.78, 0, TAU); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.56, 0, TAU); ctx.stroke();
    ctx.globalAlpha = 0.75;
    const runes = ['ᚦ', 'ᛉ', 'ᛟ', 'ᚱ', 'ᛏ', 'ᛒ', 'ᛗ', 'ᛊ', 'ᛖ', 'ᛞ', 'ᛚ', 'ᚹ'];
    ctx.font = `${Math.round(w * 0.048)}px Georgia, serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * TAU;
      ctx.save();
      ctx.translate(cx + Math.cos(a) * r * 0.9, cy + Math.sin(a) * r * 0.9);
      ctx.rotate(a + Math.PI / 2);
      ctx.fillText(runes[i % runes.length], 0, 0);
      ctx.restore();
    }
    // geometric star
    ctx.globalAlpha = 0.32;
    ctx.lineWidth = 1.3;
    for (let k = 0; k < 2; k++) {
      ctx.beginPath();
      for (let i = 0; i <= 6; i++) {
        const a = (i / 6) * TAU + k * Math.PI / 6;
        const px = cx + Math.cos(a) * r * 0.72, py = cy + Math.sin(a) * r * 0.72;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 0.16;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, color); g.addColorStop(0.7, 'transparent'); g.addColorStop(1, 'transparent');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.fill();
  });
}

export function emblemTexture() {
  return canvasTexture(128, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = '#e9c988'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(64, 64, 42, 0, TAU); ctx.stroke();
    ctx.beginPath(); ctx.arc(64, 64, 36, 0, TAU); ctx.stroke();
    ctx.fillStyle = '#e9c988';
    ctx.font = '58px Georgia, serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('W', 64, 68);
    ctx.fillStyle = '#9d7bff'; ctx.font = '20px Georgia, serif'; ctx.fillText('✦', 64, 26);
  });
}

export function groundTexture() {
  const S = 1024;
  const W = 300;
  const toPx = v => (v + W / 2) / W * S;
  return canvasTexture(S, S, (ctx, w, h) => {
    const rng = mulberry32(20261115);
    ctx.fillStyle = '#2c3a2a'; ctx.fillRect(0, 0, w, h);
    // broad color patches
    const patches = [
      { x: 0, z: 46, color: '#3a4030', r: 60 },
      { x: -64, z: -44, color: '#394136', r: 64 },
      { x: 52, z: -36, color: '#24361f', r: 72 },
      { x: -78, z: 82, color: '#334034', r: 54 },
      { x: 104, z: 66, color: '#2b2a38', r: 50 },
      { x: 112, z: -88, color: '#3d3a33', r: 46 },
      { x: 0, z: -132, color: '#232232', r: 44 },
      { x: 52, z: 78, color: '#2b3b3a', r: 48 }
    ];
    for (const p of patches) {
      const g = ctx.createRadialGradient(toPx(p.x), toPx(p.z), 0, toPx(p.x), toPx(p.z), p.r / W * S);
      g.addColorStop(0, p.color); g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    }
    // noise blobs
    for (let i = 0; i < 2400; i++) {
      const x = rng() * w, y = rng() * h, r = 3 + rng() * 20;
      const colors = ['rgba(70,86,52,.18)', 'rgba(42,54,39,.22)', 'rgba(91,102,63,.1)', 'rgba(45,60,44,.2)', 'rgba(120,110,70,.06)'];
      ctx.fillStyle = colors[Math.floor(rng() * colors.length)];
      ctx.beginPath(); ctx.ellipse(x, y, r, r * (0.4 + rng() * 0.6), rng() * 3, 0, TAU); ctx.fill();
    }
    // lake shore / sand
    const lake = { x: toPx(52), y: toPx(78), r: 46 / W * S };
    const lg = ctx.createRadialGradient(lake.x, lake.y, lake.r * 0.55, lake.x, lake.y, lake.r);
    lg.addColorStop(0, 'rgba(30,52,54,.6)'); lg.addColorStop(0.75, 'rgba(122,112,82,.5)'); lg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = lg; ctx.beginPath(); ctx.arc(lake.x, lake.y, lake.r, 0, TAU); ctx.fill();
    // paths
    const paths = [
      [[0, 46], [-16, 30], [-32, 18], [-50, -8], [-64, -30]],
      [[0, 46], [18, 34], [30, 20], [40, 2], [50, -20], [52, -36]],
      [[0, 46], [22, 52], [34, 60], [52, 70]],
      [[0, 46], [-24, 56], [-46, 66], [-64, 74], [-78, 82]],
      [[0, 46], [30, 48], [60, 54], [86, 60], [104, 66]],
      [[104, 66], [112, 36], [112, 0], [112, -50], [112, -88]],
      [[0, 46], [4, 12], [2, -30], [0, -70], [0, -112]],
      [[-16, 30], [4, 28], [20, 26]]
    ];
    for (const p of paths) {
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.strokeStyle = 'rgba(38,34,27,.4)'; ctx.lineWidth = 13;
      ctx.beginPath();
      p.forEach(([x, z], i) => { const px = toPx(x), py = toPx(z); if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
      ctx.stroke();
      ctx.strokeStyle = 'rgba(147,131,98,.72)'; ctx.lineWidth = 7; ctx.stroke();
      ctx.strokeStyle = 'rgba(184,166,125,.35)'; ctx.lineWidth = 2.5; ctx.stroke();
    }
    // grass speckles
    for (let i = 0; i < 5000; i++) {
      const x = rng() * w, y = rng() * h;
      ctx.fillStyle = `rgba(${60 + rng() * 50},${80 + rng() * 60},${40 + rng() * 30},${0.1 + rng() * 0.22})`;
      ctx.fillRect(x, y, 1.2 + rng() * 2, 1 + rng() * 2);
    }
    // academy courtyard stone
    const ac = { x: toPx(-64), y: toPx(-44), r: 30 / W * S };
    const ag = ctx.createRadialGradient(ac.x, ac.y, 0, ac.x, ac.y, ac.r);
    ag.addColorStop(0, 'rgba(105,100,98,.55)'); ag.addColorStop(0.6, 'rgba(92,90,84,.28)'); ag.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = ag; ctx.beginPath(); ctx.arc(ac.x, ac.y, ac.r, 0, TAU); ctx.fill();
    // village plaza stone
    const vc = { x: toPx(0), y: toPx(46), r: 13 / W * S };
    const vg = ctx.createRadialGradient(vc.x, vc.y, 0, vc.x, vc.y, vc.r);
    vg.addColorStop(0, 'rgba(132,124,108,.85)'); vg.addColorStop(0.8, 'rgba(105,98,85,.6)'); vg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = vg; ctx.beginPath(); ctx.arc(vc.x, vc.y, vc.r, 0, TAU); ctx.fill();
    // fallen leaves / flowers
    for (let i = 0; i < 300; i++) {
      const x = rng() * w, y = rng() * h;
      ctx.fillStyle = ['rgba(180,150,90,.18)', 'rgba(150,120,190,.1)', 'rgba(220,200,160,.12)'][Math.floor(rng() * 3)];
      ctx.beginPath(); ctx.arc(x, y, rng() * 1.8, 0, TAU); ctx.fill();
    }
  }, { aniso: 8 });
}

export function cobbleTexture() {
  return canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#5c584f'; ctx.fillRect(0, 0, w, h);
    const rng = mulberry32(99);
    for (let row = 0; row < 12; row++) {
      for (let col = 0; col < 12; col++) {
        const x = col * 44 + (row % 2) * 22 + rng() * 6;
        const y = row * 44 + rng() * 5;
        const c = 70 + rng() * 35;
        ctx.fillStyle = `rgb(${c},${c - 3},${c - 9})`;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x, y, 38 + rng() * 4, 34 + rng() * 4, 7); else ctx.rect(x, y, 40, 36);
        ctx.fill();
        ctx.strokeStyle = 'rgba(30,28,24,.4)'; ctx.lineWidth = 1.4; ctx.stroke();
      }
    }
  });
}

export function signTexture(lines, { accent = '#e9c988' } = {}) {
  return canvasTexture(512, 256, (ctx, w, h) => {
    ctx.fillStyle = 'rgba(18,13,28,.92)'; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(233,201,136,.4)'; ctx.lineWidth = 4; ctx.strokeRect(10, 10, w - 20, h - 20);
    ctx.strokeStyle = 'rgba(233,201,136,.16)'; ctx.lineWidth = 1; ctx.strokeRect(20, 20, w - 40, h - 40);
    ctx.textAlign = 'center';
    lines.forEach((line, i) => {
      ctx.fillStyle = i === 0 ? accent : 'rgba(241,228,200,.68)';
      ctx.font = i === 0 ? '700 52px Cinzel, Georgia, serif' : 'italic 26px Spectral, Georgia, serif';
      ctx.fillText(line, w / 2, 80 + i * 62);
    });
  });
}

export function addTreeCluster(parent, x, z, rng, opts = {}) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  parent.add(g);
  const trunkMat = std(opts.trunk || '#4b3427');
  const leafColors = opts.leaf || ['#2e4a2c', '#3c5a33', '#26402a', '#455a32'];
  const n = opts.n || 1;
  for (let i = 0; i < n; i++) {
    const a = rng() * TAU, r = rng() * (opts.spread || 3);
    const tx = Math.cos(a) * r, tz = Math.sin(a) * r;
    const scale = (opts.scale || 1) * (0.7 + rng() * 0.7);
    const h = 4 + rng() * 3;
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.14 * scale, 0.28 * scale, h, 6), trunkMat);
    trunk.position.set(tx, h / 2, tz);
    trunk.castShadow = false; trunk.receiveShadow = true;
    g.add(trunk);
    const leafMat = std(pick(leafColors));
    if (opts.conifer) {
      for (let k = 0; k < 3; k++) {
        const cone = new THREE.Mesh(new THREE.ConeGeometry((1.7 - k * 0.38) * scale, (2.6 - k * 0.3) * scale, 7), leafMat);
        cone.position.set(tx, h - 0.6 + k * 1.25 * scale, tz);
        g.add(cone);
      }
    } else {
      for (let k = 0; k < 3; k++) {
        const ball = new THREE.Mesh(new THREE.IcosahedronGeometry((1.2 + rng() * 0.75) * scale, 0), leafMat);
        ball.position.set(tx + (rng() - 0.5) * 1.6 * scale, h - 0.3 + k * 0.8 * scale, tz + (rng() - 0.5) * 1.6 * scale);
        ball.rotation.set(rng() * 3, rng() * 3, rng() * 3);
        ball.scale.y = 0.8;
        g.add(ball);
      }
    }
  }
  return g;
}
