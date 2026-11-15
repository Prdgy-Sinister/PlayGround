import * as THREE from '../vendor/three.module.js';

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

export function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

export function canvasTexture(w, h, draw, opts = {}) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  draw(ctx, w, h);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = opts.aniso || 8;
  if (opts.repeat) t.repeat.set(opts.repeat[0], opts.repeat[1]);
  return t;
}

/* ------------------------------ textures ----------------------------- */

export function texAsphalt() {
  return canvasTexture(512, 512, (ctx, w, h) => {
    const img = ctx.createImageData(w, h);
    const d = img.data;
    const rnd = mulberry32(11);
    for (let i = 0; i < w * h; i++) {
      const n = rnd();
      const g = 62 + n * 40 + (rnd() > .975 ? 30 : 0);
      d[i * 4] = g; d[i * 4 + 1] = g + 1; d[i * 4 + 2] = g + 3; d[i * 4 + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    for (let i = 0; i < 4200; i++) {
      const x = rnd() * w, y = rnd() * h, s = rnd() * 1.7 + .4;
      ctx.fillStyle = rnd() > .5 ? 'rgba(150,152,155,.18)' : 'rgba(20,21,23,.25)';
      ctx.fillRect(x, y, s, s);
    }
    ctx.globalAlpha = .1;
    for (let i = 0; i < 26; i++) {
      ctx.strokeStyle = '#202224';
      ctx.lineWidth = rnd() * 1.4 + .4;
      ctx.beginPath();
      let x = rnd() * w, y = rnd() * h;
      ctx.moveTo(x, y);
      for (let k = 0; k < 4; k++) { x += (rnd() - .5) * 60; y += (rnd() - .5) * 60; ctx.lineTo(x, y); }
      ctx.stroke();
    }
    ctx.globalAlpha = .055;
    ctx.fillStyle = '#9fa3a6';
    for (let i = 0; i < 9; i++) ctx.fillRect(rnd() * w, rnd() * h, 60 + rnd() * 180, 18 + rnd() * 60);
    ctx.globalAlpha = 1;
  });
}

export function texGrass() {
  return canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#3a4c2c'; ctx.fillRect(0, 0, w, h);
    const rnd = mulberry32(23);
    // broad tonal mottling so large areas do not look flat
    for (let i = 0; i < 90; i++) {
      const g = ctx.createRadialGradient(rnd() * w, rnd() * h, 4, rnd() * w, rnd() * h, 40 + rnd() * 130);
      const dark = rnd() > .5;
      g.addColorStop(0, dark ? 'rgba(26,38,20,.5)' : 'rgba(96,116,66,.28)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    }
    for (let i = 0; i < 30000; i++) {
      const x = rnd() * w, y = rnd() * h;
      const g = 42 + rnd() * 56;
      ctx.strokeStyle = `rgba(${Math.round(g * .58)},${Math.round(g)},${Math.round(g * .40)},.55)`;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (rnd() - .5) * 4, y - 1.5 - rnd() * 4); ctx.stroke();
    }
    // mown bands
    ctx.globalAlpha = .05;
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = i % 2 ? '#dfe9c6' : '#0f1a0b';
      ctx.fillRect(0, i * h / 8, w, h / 8);
    }
    ctx.globalAlpha = 1;
  }, { aniso: 8 });
}

export function texKerb() {
  return canvasTexture(64, 64, (ctx, w, h) => {
    ctx.fillStyle = '#c9ccc2'; ctx.fillRect(0, 0, w, h / 2);
    ctx.fillStyle = '#b03a30'; ctx.fillRect(0, h / 2, w, h / 2);
    ctx.globalAlpha = .22; ctx.fillStyle = '#3a3a34';
    const wear = mulberry32(8);
    for (let i = 0; i < 120; i++) ctx.fillRect(wear() * w, wear() * h, 6 + wear() * 20, 1 + wear() * 3);
    ctx.globalAlpha = 1;
    ctx.globalAlpha = .16;
    const rnd = mulberry32(4);
    for (let i = 0; i < 600; i++) {
      ctx.fillStyle = rnd() > .5 ? '#000' : '#fff';
      ctx.fillRect(rnd() * w, rnd() * h, 1.6, 1.6);
    }
  });
}

export function texCrowd() {
  return canvasTexture(256, 128, (ctx, w, h) => {
    ctx.fillStyle = '#3b3f38'; ctx.fillRect(0, 0, w, h);
    const rnd = mulberry32(91);
    const palette = ['#e8e5d7', '#cf463a', '#f0c44c', '#4d7cae', '#f0eee0', '#71925f', '#454c48', '#da7a48', '#a5a7ae', '#d9c9a3'];
    for (let i = 0; i < 2100; i++) {
      const x = rnd() * w, y = rnd() * h;
      ctx.fillStyle = palette[(rnd() * palette.length) | 0];
      ctx.fillRect(x, y, 2.4 + rnd() * 1.6, 2.4 + rnd() * 2);
    }
    ctx.globalAlpha = .3; ctx.fillStyle = '#101310';
    for (let y = 0; y < h; y += 12) ctx.fillRect(0, y, w, 1.2);
    ctx.globalAlpha = 1;
  });
}

export function texBarrier() {
  return canvasTexture(128, 64, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#d6d8d2'); g.addColorStop(.45, '#9ea2a0'); g.addColorStop(.55, '#7c8180'); g.addColorStop(1, '#b8bcb8');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(40,44,44,.5)'; ctx.lineWidth = 2;
    for (let y = 6; y < h; y += 14) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
  });
}

export function texCarbon() {
  return canvasTexture(128, 128, (ctx, w, h) => {
    ctx.fillStyle = '#191b1e'; ctx.fillRect(0, 0, w, h);
    const cell = 8;
    for (let y = 0; y < h; y += cell) {
      for (let x = 0; x < w; x += cell) {
        const alt = ((x / cell + y / cell) | 0) % 2 === 0;
        ctx.fillStyle = alt ? '#23262a' : '#15171a';
        ctx.fillRect(x, y, cell - 1, cell - 1);
        ctx.fillStyle = 'rgba(160,168,175,.05)';
        ctx.fillRect(x + 1, y + 1, cell / 2, 1);
      }
    }
  }, { repeat: [2, 2] });
}

export function texSponsor(name, bg, fg) {
  return canvasTexture(512, 128, (ctx, w, h) => {
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = fg;
    ctx.font = '900 74px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(name, w / 2, h / 2 + 4);
    ctx.globalAlpha = .18; ctx.fillStyle = '#000';
    for (let i = 0; i < 40; i++) ctx.fillRect(Math.random() * w, Math.random() * h, 40, 3);
    ctx.globalAlpha = 1;
  });
}

export function texWindows() {
  return canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#8d8e86'; ctx.fillRect(0, 0, w, h);
    const rnd = mulberry32(17);
    for (let y = 8; y < h - 8; y += 18) {
      for (let x = 8; x < w - 8; x += 16) {
        ctx.fillStyle = rnd() > .82 ? '#f0e2ae' : '#3d464c';
        ctx.fillRect(x, y, 10, 10);
      }
    }
    ctx.fillStyle = 'rgba(0,0,0,.15)';
    for (let y = 0; y < h; y += 54) ctx.fillRect(0, y, w, 3);
  });
}

export function texChecker() {
  return canvasTexture(256, 64, (ctx, w, h) => {
    const n = 16, m = 4, cw = w / n, ch = h / m;
    for (let y = 0; y < m; y++) for (let x = 0; x < n; x++) {
      ctx.fillStyle = (x + y) % 2 ? '#16181a' : '#f0f0ea';
      ctx.fillRect(x * cw, y * ch, cw, ch);
    }
  });
}

export function texNumber(n, color = '#f2f2ea') {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = color;
  ctx.font = 'italic 900 104px Arial, Helvetica, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(String(n), 64, 70);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

export function texWheelFace(vintage) {
  return canvasTexture(256, 256, (ctx, w, h) => {
    const cx = w / 2, cy = h / 2;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#121212';
    ctx.beginPath(); ctx.arc(cx, cy, 124, 0, 7); ctx.fill();
    const sg = ctx.createRadialGradient(cx - 26, cy - 26, 14, cx, cy, 118);
    sg.addColorStop(0, 'rgba(96,98,100,.24)'); sg.addColorStop(.7, 'rgba(30,30,31,.05)'); sg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(cx, cy, 120, 0, 7); ctx.fill();
    if (vintage) {
      ctx.strokeStyle = '#9b8856'; ctx.lineWidth = 2.2;
      ctx.beginPath(); ctx.arc(cx, cy, 86, 0, 7); ctx.stroke();
      const rim = ctx.createRadialGradient(cx - 12, cy - 12, 6, cx, cy, 58);
      rim.addColorStop(0, '#c3c7c9'); rim.addColorStop(.55, '#8f9497'); rim.addColorStop(1, '#5b5f62');
      ctx.fillStyle = rim; ctx.beginPath(); ctx.arc(cx, cy, 56, 0, 7); ctx.fill();
      ctx.strokeStyle = '#616568'; ctx.lineWidth = 2.6;
      for (let i = 0; i < 24; i++) {
        const a = i / 24 * Math.PI * 2;
        ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 14, cy + Math.sin(a) * 14);
        ctx.lineTo(cx + Math.cos(a) * 54, cy + Math.sin(a) * 54); ctx.stroke();
      }
      ctx.fillStyle = '#4b4f52'; ctx.beginPath(); ctx.arc(cx, cy, 14, 0, 7); ctx.fill();
      ctx.fillStyle = '#b9bdbf'; ctx.beginPath(); ctx.arc(cx, cy, 5, 0, 7); ctx.fill();
    } else {
      ctx.strokeStyle = '#2c3033'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(cx, cy, 104, 0, 7); ctx.stroke();
      const rim = ctx.createRadialGradient(cx - 12, cy - 12, 8, cx, cy, 66);
      rim.addColorStop(0, '#d9dcdd'); rim.addColorStop(.55, '#93999c'); rim.addColorStop(1, '#585d60');
      ctx.fillStyle = rim; ctx.beginPath(); ctx.arc(cx, cy, 64, 0, 7); ctx.fill();
      ctx.fillStyle = '#25292c'; ctx.beginPath(); ctx.arc(cx, cy, 50, 0, 7); ctx.fill();
      // brake disc glow behind the spokes
      ctx.strokeStyle = 'rgba(120,62,30,.55)'; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.arc(cx, cy, 41, 0, 7); ctx.stroke();
      ctx.fillStyle = '#8f9497';
      for (let i = 0; i < 10; i++) {
        const a = i / 10 * Math.PI * 2;
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(a);
        ctx.fillRect(-4.5, 17, 9, 30); ctx.restore();
      }
      ctx.fillStyle = '#c9cccd'; ctx.beginPath(); ctx.arc(cx, cy, 15, 0, 7); ctx.fill();
      ctx.strokeStyle = '#b8392b'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(cx, cy, 78, 0, 7); ctx.stroke();
    }
  });
}

export function texRoundel(n, bg = '#f2f0e6', fg = '#17191b') {
  return canvasTexture(256, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = bg;
    ctx.beginPath(); ctx.arc(w / 2, h / 2, 112, 0, 7); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(w / 2, h / 2, 110, 0, 7); ctx.stroke();
    ctx.fillStyle = fg;
    ctx.font = 'italic 900 132px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(String(n), w / 2, h / 2 + 6);
  });
}

export function texStraw() {
  return canvasTexture(256, 128, (ctx, w, h) => {
    ctx.fillStyle = '#b49a5e'; ctx.fillRect(0, 0, w, h);
    const rnd = mulberry32(31);
    for (let i = 0; i < 900; i++) {
      const x = rnd() * w, y = rnd() * h;
      ctx.strokeStyle = rnd() > .5 ? 'rgba(214,190,126,.7)' : 'rgba(110,88,46,.55)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 5 + rnd() * 9, y + (rnd() - .5) * 3); ctx.stroke();
    }
  });
}

/* ------------------------------ geometry ----------------------------- */

// Loft a set of elliptical cross-sections along +Z. Sections must be ordered
// from low z to high z. Produces a smooth, closed-end-free shell.
export function loft(sections, radial = 20) {
  const pos = [], uv = [], idx = [];
  const rows = sections.length;
  for (let i = 0; i < rows; i++) {
    const s = sections[i];
    const sx = s.x || 0, sy = s.y || 0;
    for (let j = 0; j <= radial; j++) {
      const a = j / radial * Math.PI * 2;
      pos.push(sx + Math.cos(a) * s.w, sy + Math.sin(a) * s.h, s.z);
      uv.push(j / radial, i / (rows - 1));
    }
  }
  for (let i = 0; i < rows - 1; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * (radial + 1) + j;
      const b = a + 1;
      const c = a + radial + 1;
      const d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

export function strut(parent, a, b, r, mat) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 6, 1), mat);
  mesh.position.copy(a).addScaledVector(dir, .5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
}

export function box(w, h, d, mat) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.castShadow = true;
  return m;
}

/* --------------------------- colour helpers -------------------------- */

export function hexLum(hex) {
  const c = new THREE.Color(hex);
  return .2126 * c.r + .7152 * c.g + .0722 * c.b;
}

export function shiftColor(hex, amt) {
  const c = new THREE.Color(hex);
  c.offsetHSL(0, 0, amt);
  return '#' + c.getHexString();
}
