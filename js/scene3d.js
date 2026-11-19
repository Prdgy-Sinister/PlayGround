/* MUSIC EMPIRE — tiny software 3D renderer for interactive environments.
   No WebGL and no dependencies: low-poly geometry, painter sorting, soft
   lighting and sprites, tuned for mobile canvas performance. */

const TAU = Math.PI * 2;
const SCENES = new Map();
let LOOP = null;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function hexToRgb(hex) {
  if (!hex) return [255, 46, 99];
  if (Array.isArray(hex)) return hex;
  if (typeof hex !== 'string') return [255, 46, 99];
  if (hex.startsWith('rgb')) {
    const m = hex.match(/\d+(?:\.\d+)?/g);
    return m ? m.slice(0, 3).map(Number) : [255, 46, 99];
  }
  let h = String(hex).replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h.slice(0, 6), 16);
  if (Number.isNaN(n)) return [255, 46, 99];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function css(rgb, alpha = 1) {
  return `rgba(${rgb[0] | 0},${rgb[1] | 0},${rgb[2] | 0},${alpha})`;
}
function shade(rgb, f, alpha = 1) {
  return css(rgb.map((c) => clamp(c * f, 0, 255)), alpha);
}
function mix(a, b, t) {
  return a.map((c, i) => c + (b[i] - c) * t);
}

class Scene {
  constructor(canvas, kind, opts = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.kind = kind;
    this.opts = opts || {};
    this.accent = hexToRgb(opts.accent || '#ff2e63');
    this.accent2 = hexToRgb(opts.accent2 || '#22d3ee');
    this.wallColor = hexToRgb(opts.wall || '#15111d');
    this.floorColor = hexToRgb(opts.floor || '#241a2b');
    this.lighting = opts.lighting || 'neon';
    this.theme = opts.theme || 'midnight';
    this.yaw = opts.yaw ?? 0.5;
    this.pitch = opts.pitch ?? 0.24;
    this.distance = opts.distance ?? 13;
    this.targetY = opts.targetY ?? 1.5;
    this.focal = 1;
    this.dpr = 1;
    this.w = 0;
    this.h = 0;
    this.cx = 0;
    this.cy = 0;
    this.items = [];
    this.drag = null;
    this.auto = opts.auto !== false;
    this.lastInteract = 0;
    this.zoom = 1;
    this.t = 0;
    this.visible = true;
    this.destroyed = false;
    this._bound = { resize: () => this._resize() };
    this._resize();
    this._bind();
    if ('ResizeObserver' in window) {
      this.ro = new ResizeObserver(() => this._resize());
      this.ro.observe(canvas);
    } else {
      window.addEventListener('resize', this._bound.resize);
    }
    if ('IntersectionObserver' in window) {
      this.io = new IntersectionObserver((entries) => {
        this.visible = entries.some((e) => e.isIntersecting);
      }, { threshold: 0.02 });
      this.io.observe(canvas);
    }
    SCENES.set(canvas, this);
    this.setPreset(kind === 'festival' ? 'grounds' : kind === 'awards' ? 'stage' : 'wide');
    try { this.render(); } catch (err) { console.warn('3D preview failed', err); }
    if (!LOOP) LOOP = requestAnimationFrame(tick);
  }

  _resize() {
    const r = this.canvas.getBoundingClientRect();
    const w = Math.max(260, r.width || this.canvas.clientWidth || 640);
    const h = Math.max(180, r.height || this.canvas.clientHeight || 340);
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.w = w;
    this.h = h;
    this.canvas.width = Math.round(w * this.dpr);
    this.canvas.height = Math.round(h * this.dpr);
    this.cx = w / 2;
    this.cy = h * 0.5;
    this.focal = Math.min(w * 1.02, h * 1.25);
  }

  _bind() {
    const c = this.canvas;
    const down = (e) => {
      this.drag = { x: e.clientX, y: e.clientY };
      this.lastInteract = performance.now();
      c.setPointerCapture?.(e.pointerId);
      c.classList.add('grabbing');
    };
    const move = (e) => {
      if (!this.drag) return;
      const dx = e.clientX - this.drag.x;
      const dy = e.clientY - this.drag.y;
      this.drag = { x: e.clientX, y: e.clientY };
      this.yaw += dx * 0.008;
      this.pitch = clamp(this.pitch + dy * 0.005, -0.05, 0.62);
      this.lastInteract = performance.now();
    };
    const up = () => {
      this.drag = null;
      this.lastInteract = performance.now();
      c.classList.remove('grabbing');
    };
    const wheel = (e) => {
      e.preventDefault();
      this.zoom = clamp(this.zoom * (e.deltaY > 0 ? 0.94 : 1.06), 0.7, 1.7);
      this.lastInteract = performance.now();
    };
    this._bound = { down, move, up, wheel };
    c.addEventListener('pointerdown', down);
    c.addEventListener('pointermove', move);
    c.addEventListener('pointerup', up);
    c.addEventListener('pointercancel', up);
    c.addEventListener('pointerleave', up);
    c.addEventListener('wheel', wheel, { passive: false });
    c.classList.add('scene-canvas');
  }

  destroy() {
    this.destroyed = true;
    const c = this.canvas;
    c.removeEventListener('pointerdown', this._bound.down);
    c.removeEventListener('pointermove', this._bound.move);
    c.removeEventListener('pointerup', this._bound.up);
    c.removeEventListener('pointercancel', this._bound.up);
    c.removeEventListener('pointerleave', this._bound.up);
    c.removeEventListener('wheel', this._bound.wheel);
    window.removeEventListener('resize', this._bound.resize);
    this.ro?.disconnect();
    this.io?.disconnect();
    SCENES.delete(c);
  }

  setPreset(name) {
    const presets = {
      wide: { yaw: 0.3, pitch: 0.1, distance: 12.2, targetY: 1.45 },
      stage: { yaw: 0.12, pitch: 0.16, distance: 14.6, targetY: 2.05 },
      close: { yaw: 0.9, pitch: 0.2, distance: 8.4, targetY: 1.7 },
      orbit: { yaw: 2.2, pitch: 0.32, distance: 12, targetY: 1.7 },
      grounds: { yaw: 0.34, pitch: 0.28, distance: 18.5, targetY: 2.1 },
    };
    const p = presets[name] || presets.wide;
    this.yaw = p.yaw;
    this.pitch = p.pitch;
    this.distance = p.distance;
    this.targetY = p.targetY;
    this.lastInteract = performance.now();
  }

  project(x, y, z) {
    const cy = Math.cos(this.yaw), sy = Math.sin(this.yaw);
    const cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);
    const x1 = x * cy + z * sy;
    const z1 = -x * sy + z * cy;
    const y1 = (y - this.targetY) * cp - z1 * sp;
    const z2 = (y - this.targetY) * sp + z1 * cp;
    const depth = this.distance / this.zoom - z2;
    if (depth < 0.55) return null;
    const s = this.focal / depth;
    return { x: this.cx + x1 * s, y: this.cy - y1 * s, d: depth, s };
  }

  poly(points, color, opts = {}) {
    const projected = points.map((p) => this.project(p[0], p[1], p[2]));
    if (projected.some((p) => !p)) return;
    const depth = opts.far ? 9999 : projected.reduce((a, p) => a + p.d, 0) / projected.length;
    this.items.push({ type: 'poly', pts: projected, depth, color, alpha: opts.alpha ?? 1, stroke: opts.stroke, lw: opts.lw || 1, glow: opts.glow });
  }

  line(a, b, color, opts = {}) {
    const p1 = this.project(a[0], a[1], a[2]);
    const p2 = this.project(b[0], b[1], b[2]);
    if (!p1 || !p2) return;
    this.items.push({ type: 'line', p1, p2, depth: (p1.d + p2.d) / 2 - 0.01, color, alpha: opts.alpha ?? 1, lw: opts.lw || 1 });
  }

  label(text, x, y, z, opts = {}) {
    const p = this.project(x, y, z);
    if (!p) return;
    this.items.push({ type: 'text', p, depth: p.d - 0.02, text, color: opts.color || '#fff', size: opts.size || 11, weight: opts.weight || 800, alpha: opts.alpha ?? 1, align: opts.align || 'center' });
  }

  sphere(x, y, z, r, color, opts = {}) {
    const p = this.project(x, y, z);
    if (!p) return;
    this.items.push({ type: 'sphere', p, radius: Math.max(0.6, r * p.s), color, alpha: opts.alpha ?? 1, depth: p.d, glow: opts.glow });
  }

  glow(x, y, z, r, color, alpha = 0.35) {
    const p = this.project(x, y, z);
    if (!p) return;
    this.items.push({ type: 'glow', p, radius: Math.max(4, r * p.s), color, alpha, depth: p.d + 0.01 });
  }

  box(cx, cy, cz, sx, sy, sz, color, opts = {}) {
    const x0 = cx - sx / 2, x1 = cx + sx / 2;
    const y0 = cy - sy / 2, y1 = cy + sy / 2;
    const z0 = cz - sz / 2, z1 = cz + sz / 2;
    const c = hexToRgb(color);
    const a = opts.alpha ?? 1;
    const top = opts.top || 1.24;
    const fo = { far: opts.far };
    this.poly([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]], shade(c, top, a), fo);
    this.poly([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], shade(c, 0.96, a), fo);
    this.poly([[x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1]], shade(c, 0.78, a), fo);
    this.poly([[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0]], shade(c, 0.58, a), fo);
    this.poly([[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]], shade(c, 0.68, a), fo);
    if (opts.stroke) {
      const edge = opts.stroke;
      const pts = [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y1, z1], [x1, y1, z1], [x1, y0, z1], [x0, y0, z1]];
      for (let i = 0; i < 4; i++) this.line(pts[i], pts[(i + 1) % 4], edge, { lw: 0.8, alpha: 0.6 });
      for (let i = 4; i < 8; i++) this.line(pts[i], pts[4 + ((i - 3) % 4)], edge, { lw: 0.8, alpha: 0.6 });
      this.line([x0, y0, z0], [x0, y1, z0], edge, { lw: 0.8, alpha: 0.6 });
      this.line([x1, y0, z0], [x1, y1, z0], edge, { lw: 0.8, alpha: 0.6 });
      this.line([x0, y0, z1], [x0, y1, z1], edge, { lw: 0.8, alpha: 0.6 });
      this.line([x1, y0, z1], [x1, y1, z1], edge, { lw: 0.8, alpha: 0.6 });
    }
  }

  cyl(cx, cy, cz, r, h, color, opts = {}) {
    const seg = opts.seg || 14;
    const c = hexToRgb(color);
    const y0 = cy, y1 = cy + h;
    for (let i = 0; i < seg; i++) {
      const a0 = (i / seg) * TAU, a1 = ((i + 1) / seg) * TAU;
      const x0 = cx + Math.cos(a0) * r, z0 = cz + Math.sin(a0) * r;
      const x1 = cx + Math.cos(a1) * r, z1 = cz + Math.sin(a1) * r;
      const f = 0.64 + 0.28 * (0.5 + 0.5 * Math.cos(a0 - this.yaw + Math.PI * 0.3));
      this.poly([[x0, y0, z0], [x1, y0, z1], [x1, y1, z1], [x0, y1, z0]], shade(c, f, opts.alpha ?? 1));
    }
    const top = [];
    for (let i = 0; i < seg; i++) {
      const a = (i / seg) * TAU;
      top.push([cx + Math.cos(a) * r, y1, cz + Math.sin(a) * r]);
    }
    this.poly(top, shade(c, 1.26, opts.alpha ?? 1));
    if (opts.glow) this.glow(cx, y1, cz, r * 2.4, color, 0.22);
  }

  floorPlane(w, d, color, opts = {}) {
    this.poly([[-w / 2, 0, -d / 2], [w / 2, 0, -d / 2], [w / 2, 0, d / 2], [-w / 2, 0, d / 2]], shade(hexToRgb(color), 1.22, opts.alpha ?? 1), { far: true });
    const grid = opts.grid ?? 1;
    if (grid) {
      const step = opts.step || 1.5;
      for (let x = -w / 2; x <= w / 2 + 0.01; x += step) this.line([x, 0.01, -d / 2], [x, 0.01, d / 2], '#ffffff', { lw: 0.5, alpha: 0.05 });
      for (let z = -d / 2; z <= d / 2 + 0.01; z += step) this.line([-w / 2, 0.01, z], [w / 2, 0.01, z], '#ffffff', { lw: 0.5, alpha: 0.05 });
    }
  }

  wall(w, h, z, color, opts = {}) {
    this.poly([[-w / 2, 0, z], [w / 2, 0, z], [w / 2, h, z], [-w / 2, h, z]], shade(hexToRgb(color), 1.28, opts.alpha ?? 1), { far: opts.far !== false });
    const panels = opts.panels ?? 0;
    for (let i = 0; i < panels; i++) {
      const x = -w / 2 + (i + 0.5) * (w / panels);
      this.box(x, h * 0.55, z + 0.08, w / panels * 0.72, h * 0.42, 0.08, '#2c2439');
      this.box(x, h * 0.55, z + 0.13, w / panels * 0.6, h * 0.32, 0.03, '#3b3050');
    }
    if (opts.cove !== false) {
      this.line([-w / 2, h - 0.06, z + 0.16], [w / 2, h - 0.06, z + 0.16], css(this.accent, 0.5), { lw: 1.6 });
      this.glow(0, h - 0.3, z + 0.4, w * 0.46, css(this.accent), 0.1);
    }
  }

  spot(x, y, z, radius, color, alpha = 0.18) {
    const p = this.project(x, y, z);
    if (!p) return;
    this.items.push({ type: 'spot', p, radius: radius * p.s, color, alpha, depth: p.d - 2 });
  }

  build() {
    this.items = [];
    const builders = { studio: studioScene, office: officeScene, hall: hallScene, awards: awardsScene, festival: festivalScene };
    (builders[this.kind] || studioScene)(this);
    this.items.sort((a, b) => b.depth - a.depth);
  }

  render() {
    const ctx = this.ctx;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    const g = ctx.createLinearGradient(0, 0, 0, this.h);
    const darkTop = mix(this.wallColor.map((c) => c * 0.9), [10, 9, 18], 0.35);
    const base = this.kind === 'festival' ? [6, 7, 16] : this.kind === 'awards' ? [8, 6, 20] : this.kind === 'hall' ? [12, 9, 8] : [6, 7, 12];
    g.addColorStop(0, css(darkTop));
    g.addColorStop(1, css(base));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, this.w, this.h);
    // ambient glow behind the set
    const rg = ctx.createRadialGradient(this.w * 0.5, this.h * 0.42, 2, this.w * 0.5, this.h * 0.42, this.w * 0.52);
    rg.addColorStop(0, css(this.accent, this.kind === 'festival' ? 0.2 : 0.13));
    rg.addColorStop(1, css(this.accent, 0));
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, this.w, this.h);
    this.build();
    for (const it of this.items) {
      if (it.type === 'poly') {
        ctx.beginPath();
        it.pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
        ctx.closePath();
        ctx.globalAlpha = it.alpha;
        ctx.fillStyle = it.color;
        if (it.glow) { ctx.shadowColor = it.glow; ctx.shadowBlur = 14; }
        ctx.fill();
        ctx.shadowBlur = 0;
        if (it.stroke) { ctx.strokeStyle = it.stroke; ctx.lineWidth = it.lw; ctx.stroke(); }
      } else if (it.type === 'line') {
        ctx.globalAlpha = it.alpha;
        ctx.strokeStyle = it.color;
        ctx.lineWidth = it.lw;
        ctx.beginPath(); ctx.moveTo(it.p1.x, it.p1.y); ctx.lineTo(it.p2.x, it.p2.y); ctx.stroke();
      } else if (it.type === 'sphere') {
        ctx.globalAlpha = it.alpha;
        const c = hexToRgb(it.color);
        const gr = ctx.createRadialGradient(it.p.x - it.radius * 0.3, it.p.y - it.radius * 0.35, it.radius * 0.1, it.p.x, it.p.y, it.radius);
        gr.addColorStop(0, css(mix(c, [255, 255, 255], 0.55)));
        gr.addColorStop(0.5, css(c));
        gr.addColorStop(1, css(c.map((x) => x * 0.32)));
        ctx.fillStyle = gr;
        if (it.glow) { ctx.shadowColor = it.color; ctx.shadowBlur = 18; }
        ctx.beginPath(); ctx.arc(it.p.x, it.p.y, it.radius, 0, TAU); ctx.fill();
        ctx.shadowBlur = 0;
      } else if (it.type === 'glow') {
        const c = hexToRgb(it.color);
        const gr = ctx.createRadialGradient(it.p.x, it.p.y, 1, it.p.x, it.p.y, it.radius);
        gr.addColorStop(0, css(c, it.alpha));
        gr.addColorStop(1, css(c, 0));
        ctx.globalAlpha = 1;
        ctx.fillStyle = gr;
        ctx.fillRect(it.p.x - it.radius, it.p.y - it.radius, it.radius * 2, it.radius * 2);
      } else if (it.type === 'spot') {
        const c = hexToRgb(it.color);
        const gr = ctx.createRadialGradient(it.p.x, it.p.y, 1, it.p.x, it.p.y, it.radius);
        gr.addColorStop(0, css(c, it.alpha));
        gr.addColorStop(1, css(c, 0));
        ctx.globalAlpha = 1;
        ctx.fillStyle = gr;
        ctx.beginPath(); ctx.ellipse(it.p.x, it.p.y, it.radius, it.radius * 0.72, 0, 0, TAU); ctx.fill();
      } else if (it.type === 'text') {
        ctx.globalAlpha = it.alpha;
        ctx.fillStyle = it.color;
        ctx.font = `${it.weight} ${it.size}px ui-sans-serif, -apple-system, "Segoe UI", sans-serif`;
        ctx.textAlign = it.align;
        ctx.textBaseline = 'middle';
        if (it.depth < 30) { ctx.shadowColor = 'rgba(0,0,0,.65)'; ctx.shadowBlur = 6; }
        ctx.fillText(it.text, it.p.x, it.p.y);
        ctx.shadowBlur = 0;
      }
    }
    ctx.globalAlpha = 1;
  }
}

/* --------------------------------- builders -------------------------------- */
function studioScene(s) {
  const A = s.accent;
  const W = mix(s.wallColor, [58, 46, 72], 0.55);
  s.floorPlane(11, 13, css(mix(s.floorColor, [52, 40, 60], 0.5)), { step: 1.6 });
  s.wall(11, 4.2, -4.5, css(W), { panels: 5 });
  // side returns give the room volume
  s.poly([[-5.5, 0, -4.5], [-5.5, 0, 4.5], [-5.5, 4.2, 4.5], [-5.5, 4.2, -4.5]], shade(mix(W, [12, 10, 20], 0.45), 1.05), { far: true });
  s.poly([[5.5, 0, -4.5], [5.5, 0, 4.5], [5.5, 4.2, 4.5], [5.5, 4.2, -4.5]], shade(mix(W, [12, 10, 20], 0.45), 0.86), { far: true });
  // ceiling rig
  [-3.2, -1.6, 0, 1.6, 3.2].forEach((x) => {
    s.box(x, 4.22, 0, 0.14, 0.1, 8.4, '#241f33');
    s.glow(x, 4.05, 0.6, 1.4, css(A), 0.09);
  });
  // rug
  s.poly([[-2.2, 0.02, -0.4], [3.1, 0.02, -0.4], [3.6, 0.02, 3.6], [-2.8, 0.02, 3.6]], css(mix(A, [20, 16, 26], 0.78)), { alpha: 0.9 });
  // booth glass
  s.box(2.85, 1.4, -3.9, 3.2, 2.8, 0.12, '#8b93a8', { alpha: 0.2, top: 1.05 });
  s.box(2.85, 0.06, -3.78, 3.5, 0.12, 0.4, '#2b2f3d');
  s.box(2.85, 2.85, -3.78, 3.5, 0.12, 0.4, '#2b2f3d');
  s.line([1.25, 0.1, -3.8], [1.25, 2.8, -3.8], css(A, 0.5), { lw: 1.2 });
  s.line([4.45, 0.1, -3.8], [4.45, 2.8, -3.8], css(A, 0.5), { lw: 1.2 });
  // vocalist silhouette in booth
  s.sphere(2.85, 1.9, -3.5, 0.22, '#d8b08c');
  s.box(2.85, 1.15, -3.5, 0.5, 1.2, 0.28, '#12131c');
  s.cyl(2.85, 0.06, -3.5, 0.05, 1.4, '#aeb4c4');
  s.sphere(2.85, 1.5, -3.5, 0.09, '#d8b08c');
  s.glow(2.85, 2.3, -3.4, 0.7, css(A), 0.2);
  // acoustic panels
  for (let i = -2; i <= 2; i++) {
    if (i === 0) continue;
    s.box(i * 1.02 - 0.4, 2.5, -4.38, 0.72, 1.1, 0.08, '#251d32', { far: true });
    s.box(i * 1.02 - 0.4, 2.5, -4.31, 0.58, 0.92, 0.04, '#312641', { far: true });
  }
  // neon sign
  s.glow(-1.6, 3.35, -4.2, 1.9, css(A), 0.4);
  s.label(s.opts.sign || 'STUDIO', -1.6, 3.35, -4.18, { color: '#fff', size: 15, weight: 900 });
  s.label(s.opts.sign || 'STUDIO', -1.6, 3.35, -4.2, { color: css(s.accent, 0.9), size: 15, weight: 900 });
  // desk
  s.box(0, 0.62, 0.55, 3.5, 0.16, 1.5, '#54415f', { top: 1.2 });
  s.box(0, 0.52, 1.24, 3.4, 0.05, 0.05, css(A, 0.55), { top: 1.4 });
  s.box(-1.4, 0.31, 0.55, 0.18, 0.62, 1.35, '#17121e');
  s.box(1.4, 0.31, 0.55, 0.18, 0.62, 1.35, '#17121e');
  // console with faders
  s.box(0.2, 0.78, 0.5, 2.2, 0.22, 0.9, '#37415a');
  s.glow(0.2, 1.05, 0.4, 1.9, css(A), 0.16);
  s.box(-0.98, 0.9, 0.42, 0.22, 0.05, 0.34, css(A, 0.8), { top: 1.4 });
  for (let i = 0; i < 10; i++) {
    s.box(-0.72 + i * 0.2, 0.91, 0.52, 0.045, 0.05, 0.05, i % 3 === 0 ? css(A) : '#d7dbe8');
    s.box(-0.72 + i * 0.2, 0.9, 0.22, 0.05, 0.03, 0.34, '#3a4052');
  }
  // monitor screens
  s.box(-1.22, 1.12, -0.12, 0.08, 0.36, 0.86, '#0d1018');
  s.box(-1.15, 1.12, -0.12, 0.03, 0.28, 0.72, css(mix(A, [12, 16, 24], 0.3)), { top: 1 });
  s.box(1.42, 1.04, 0.25, 0.06, 0.5, 0.92, '#0d1018');
  s.box(1.45, 1.04, 0.25, 0.02, 0.4, 0.78, '#182030');
  // speakers
  [-2.4, 2.35].forEach((x) => {
    s.box(x, 0.55, -1.9, 0.48, 1.1, 0.44, '#2b3140');
    s.cyl(x, 0.72, -1.68, 0.16, 0.22, '#262c3a');
    s.cyl(x, 1.24, -1.68, 0.11, 0.16, '#262c3a');
    s.box(x, 0.62, -1.25, 0.62, 0.32, 0.42, '#12151d');
  });
  // mic stand near desk
  s.cyl(-1.55, 0.05, 2.35, 0.035, 1.9, '#aeb4c4');
  s.line([-1.55, 1.9, 2.35], [-0.95, 1.94, 2.1], '#aeb4c4', { lw: 1.4 });
  s.sphere(-0.9, 1.94, 2.05, 0.11, '#232834');
  s.sphere(-0.9, 1.94, 2.05, 0.07, '#8f96a8');
  // couch
  s.box(-3.35, 0.38, 2.45, 1.35, 0.62, 2.0, '#3b2f46', { top: 1.2 });
  s.box(-3.75, 0.72, 2.45, 0.28, 0.42, 1.9, '#2d2238');
  s.box(-3.2, 0.7, 1.55, 0.7, 0.2, 0.3, css(A, 0.55));
  s.box(-3.2, 0.7, 2.4, 0.7, 0.2, 0.3, '#3b3147');
  s.box(-3.2, 0.7, 3.25, 0.7, 0.2, 0.3, css(A, 0.3));
  // guitar
  s.box(3.35, 0.62, 1.25, 0.12, 0.75, 0.5, '#c4863c', { top: 1.1 });
  s.cyl(3.35, 0.35, 1.25, 0.32, 0.13, '#b5742f');
  s.line([3.35, 0.9, 1.25], [3.55, 1.9, 1.05], '#d8b26a', { lw: 2.2 });
  s.box(3.35, 0.05, 1.25, 0.4, 0.08, 0.3, '#16121c');
  // plants
  [[-4.35, -2.4], [4.4, 2.9]].forEach(([x, z]) => {
    s.cyl(x, 0.02, z, 0.24, 0.42, '#3a2b25');
    s.sphere(x, 0.75, z, 0.34, '#2f7d4d');
    s.sphere(x + 0.18, 0.95, z + 0.08, 0.26, '#3d9a5d');
    s.sphere(x - 0.16, 0.9, z - 0.06, 0.22, '#2a6b43');
  });
  // ceiling lights
  [-2.4, 0, 2.4].forEach((x) => {
    s.box(x, 3.95, 0.4, 0.5, 0.06, 0.3, '#1a1e2a');
    s.glow(x, 3.8, 0.4, 0.55, css(A), 0.25);
    s.line([x, 3.92, 0.4], [x, 4.15, 0.4], '#3a4052', { lw: 1 });
  });
  // floor cable
  s.line([-1.55, 0.03, 2.3], [-0.4, 0.03, 2.9], css(A, 0.35), { lw: 1.2 });
}

function officeScene(s) {
  const A = s.accent;
  s.floorPlane(12, 9, '#2e2739', { step: 1.8 });
  s.wall(12, 4.2, -4.5, '#292435', { panels: 0 });
  // window with skyline
  s.box(-3, 2.55, -4.35, 4.4, 2.3, 0.12, '#0a1522');
  s.box(-3, 2.55, -4.28, 4.2, 2.1, 0.03, '#132638');
  for (let i = 0; i < 9; i++) {
    const x = -4.8 + i * 0.48;
    const h = 0.4 + ((i * 37) % 9) * 0.11;
    s.box(x, 1.55 + h / 2, -4.24, 0.26, h, 0.02, '#0d1b2a');
  }
  s.line([-3, 2.55, -4.22], [-3, 2.55, -4.22], '#fff', { lw: 0.1 });
  s.label('LABEL HQ', -3, 3.45, -4.2, { color: 'rgba(255,255,255,.5)', size: 10, weight: 800 });
  // desks
  [[-1.8, 0.4], [2.1, 1.0]].forEach(([x, z]) => {
    s.box(x, 0.6, z, 3.0, 0.14, 1.5, '#2b2332');
    s.box(x - 1.3, 0.3, z, 0.12, 0.6, 1.35, '#1d1823');
    s.box(x + 1.3, 0.3, z, 0.12, 0.6, 1.35, '#1d1823');
    s.box(x - 0.4, 0.92, z - 0.1, 0.72, 0.48, 0.06, '#0d1018');
    s.box(x - 0.4, 0.92, z - 0.06, 0.62, 0.38, 0.02, css(mix(A, [20, 28, 44], 0.3)));
    s.sphere(x + 0.55, 0.8, z + 0.18, 0.09, '#c9a27a');
    s.box(x + 0.55, 0.6, z + 0.18, 0.4, 0.4, 0.34, '#252033');
    s.box(x + 0.9, 0.82, z - 0.12, 0.35, 0.35, 0.06, '#11151f');
    s.box(x + 1.1, 0.72, z + 0.25, 0.18, 0.25, 0.18, '#3a3048');
    s.box(x - 1.0, 0.74, z + 0.3, 0.28, 0.22, 0.22, '#3a3048');
  });
  // chairs
  [[-1.8, 2.0], [2.1, 2.6]].forEach(([x, z]) => {
    s.box(x, 0.5, z, 0.62, 0.12, 0.62, '#1b1e2b');
    s.box(x, 0.9, z + 0.28, 0.62, 0.72, 0.1, '#202435');
    s.cyl(x, 0.05, z, 0.16, 0.42, '#151823');
  });
  // shelving and records
  [3.85, -4.2].forEach((x, k) => {
    s.box(x, 1.2, -2.8, 0.5, 2.4, 2.4, '#241d2d');
    for (let l = 0; l < 3; l++) s.box(x, 0.5 + l * 0.7, -2.8, 0.62, 0.08, 2.3, '#121019');
    for (let i = 0; i < 6; i++) s.box(x, 0.9 + (i % 3) * 0.7, -3.7 + (i % 2) * 1.4 + Math.floor(i / 3) * 0.35, 0.06, 0.4, 0.5, i % 2 ? css(A, 0.7) : '#39405a');
  });
  // plant
  s.cyl(-4.3, 0.02, 2.8, 0.28, 0.5, '#3a2b25');
  s.sphere(-4.3, 0.9, 2.8, 0.4, '#2f7d4d');
  s.sphere(-4.05, 1.15, 2.7, 0.28, '#3d9a5d');
  // pendant lights
  [0.2, 3.4].forEach((x) => {
    s.box(x, 3.7, 1.2, 0.28, 0.1, 0.28, '#1c1f2a');
    s.glow(x, 3.5, 1.2, 0.5, '#ffdba8', 0.22);
    s.line([x, 4.15, 1.2], [x, 3.78, 1.2], '#3a4052', { lw: 1 });
  });
  // CEO desk
  s.box(4.6, 0.55, 2.7, 2.2, 0.14, 1.1, '#2e2436');
  s.box(4.6, 0.85, 2.7, 0.7, 0.05, 0.4, css(A, 0.55));
  s.box(5.3, 0.95, 2.4, 0.5, 0.8, 0.12, '#161a24');
  s.sphere(4.2, 1.02, 2.55, 0.07, '#f5c451', { glow: '#f5c451' });
  s.label('EXECUTIVE', 4.6, 1.35, 2.7, { color: 'rgba(255,255,255,.35)', size: 7, weight: 700 });
}

function hallScene(s) {
  const G = '#f5c451';
  s.floorPlane(12, 13, '#2a211b', { step: 1.7 });
  s.wall(12, 4.6, -4.8, '#2c231b', { panels: 0 });
  // wall frames / gold records
  for (let i = 0; i < 5; i++) {
    const x = -4.2 + i * 2.1;
    s.box(x, 2.8, -4.45, 1.1, 1.3, 0.08, '#2a2118');
    s.box(x, 2.8, -4.38, 0.9, 1.1, 0.04, i % 2 ? '#3a2c1b' : '#2b241d');
    s.sphere(x, 2.8, -4.32, 0.32, i === 2 ? G : '#b8a06a', { glow: G });
    s.sphere(x, 2.8, -4.31, 0.12, '#0b0c12');
    s.label(i === 2 ? 'PLATINUM' : 'GOLD', x, 2.05, -4.3, { color: 'rgba(245,196,81,.55)', size: 7, weight: 800 });
  }
  // cabinets
  [-4.0, 4.0].forEach((x, k) => {
    s.box(x, 1.1, -1.4, 1.5, 2.2, 4.4, '#2a2119');
    s.box(x, 2.2, -1.4, 1.62, 0.1, 4.5, '#3b2e20');
    for (let l = 0; l < 3; l++) {
      s.box(x, 0.55 + l * 0.68, -1.4, 1.62, 0.07, 4.2, '#1b1510');
      for (let i = 0; i < 7; i++) {
        s.box(x - 0.05, 0.85 + l * 0.68, -3.1 + i * 0.58, 0.1, 0.38, 0.44, i % 3 === 0 ? G : i % 3 === 1 ? css(s.accent) : '#d5c8ae');
      }
    }
    s.box(x, 1.1, 0.95, 1.4, 2.0, 0.1, 'rgba(180,210,255,.13)', { alpha: 0.22, top: 1 });
    s.line([x - 0.7, 0.1, 0.95], [x - 0.7, 2.1, 0.95], 'rgba(255,255,255,.2)', { lw: 0.8 });
    s.line([x + 0.7, 0.1, 0.95], [x + 0.7, 2.1, 0.95], 'rgba(255,255,255,.2)', { lw: 0.8 });
    s.label(k === 0 ? 'THE VAULT' : 'HALL OF FAME', x, 2.48, 0.95, { color: 'rgba(245,196,81,.6)', size: 7, weight: 900 });
  });
  // central pedestals and trophies
  const trophies = [
    { x: -1.4, z: 0.6, c: G, h: 1.0 },
    { x: 0, z: -0.1, c: '#e9d7a5', h: 1.3 },
    { x: 1.4, z: 0.6, c: G, h: 1.0 },
  ];
  trophies.forEach((t, i) => {
    s.box(t.x, 0.35, t.z, 0.7, 0.7, 0.7, '#2b241c', { top: 1.1 });
    s.cyl(t.x, 0.7, t.z, 0.12, 0.22, '#3a2e1d');
    s.cyl(t.x, 0.92, t.z, 0.3, 0.12, t.c, { glow: t.c });
    s.cyl(t.x, 1.04, t.z, 0.17, 0.32, t.c, { seg: 10, glow: t.c });
    s.sphere(t.x, 1.42, t.z, 0.13, t.c, { glow: t.c });
    s.glow(t.x, 1.3, t.z, 0.9, t.c, 0.24);
    s.label(i === 1 ? 'LEGACY' : '', t.x, 1.75, t.z, { color: 'rgba(245,196,81,.7)', size: 8, weight: 900 });
  });
  // lit plinths along front
  [-3.2, 3.2].forEach((x, i) => {
    s.box(x, 0.25, 3.2, 0.9, 0.5, 0.9, '#241d16');
    s.sphere(x, 0.65, 3.2, 0.16, i ? '#c0c6d4' : G, { glow: i ? '#fff' : G });
  });
  s.spot(0, 4.2, 0, 5.2, G, 0.13);
  s.glow(0, 3.2, -3.2, 3.4, css(s.accent), 0.12);
  s.label('MUSIC LEGACY', 0, 3.95, -4.3, { color: 'rgba(255,255,255,.32)', size: 11, weight: 900 });
}

function awardsScene(s) {
  const G = '#f5c451', A = s.accent;
  s.floorPlane(16, 11, '#221c35', { step: 2 });
  // stage platform
  s.box(0, 0.45, -2.4, 8.2, 0.9, 3.6, '#211c30', { top: 1.25 });
  s.box(0, 0.95, -3.7, 7.8, 0.12, 0.24, css(A, 0.7), { top: 1.1 });
  // carpet
  s.poly([[-1.1, 0.92, 0.1], [1.1, 0.92, 0.1], [1.5, 0.94, -3.5], [-1.5, 0.94, -3.5]], css(A, 0.34), { alpha: 0.85 });
  // backdrop panel — short and wide so the stage reads clearly
  s.box(0, 2.55, -5.1, 8.4, 3.5, 0.18, '#0a0913', { far: true });
  s.box(0, 2.55, -4.99, 7.8, 2.95, 0.05, css(mix(A, [9, 9, 20], 0.55)), { top: 1, far: true });
  s.box(0, 4.45, -5.0, 8.4, 0.16, 0.12, css(G, 0.55), { top: 1, far: true });
  s.glow(0, 3.2, -4.75, 3.8, css(A), 0.16);
  s.label(s.opts.eventName || 'THE ANNUAL AWARDS', 0, 3.15, -4.9, { color: '#fff', size: 16, weight: 900 });
  s.label('MUSIC EMPIRE AWARDS', 0, 2.62, -4.9, { color: css(G, 0.9), size: 8, weight: 800 });
  // gold columns and stars
  [-3.7, 3.7].forEach((x) => {
    s.box(x, 2.0, -4.75, 0.34, 4.0, 0.34, '#2a2418', { far: true });
    s.cyl(x, 4.15, -4.75, 0.28, 0.16, G, { glow: G });
    s.sphere(x, 3.35, -4.68, 0.13, G, { glow: G });
    s.glow(x, 2.0, -4.6, 0.9, css(G, 0.9), 0.2);
  });
  // trophy statue on a plinth
  s.box(0, 1.1, -1.6, 0.9, 0.5, 0.9, '#2c261c', { top: 1.12 });
  s.cyl(0, 1.45, -1.6, 0.22, 0.4, '#2c261c');
  s.cyl(0, 1.75, -1.6, 0.36, 0.14, G, { glow: G });
  s.cyl(0, 1.88, -1.6, 0.28, 0.55, G, { glow: G });
  s.sphere(0, 2.48, -1.6, 0.22, G, { glow: G });
  s.glow(0, 2.2, -1.6, 1.7, G, 0.3);
  // podium
  s.box(2.7, 1.15, -1.1, 0.95, 0.7, 0.75, '#2b2538');
  s.box(2.7, 1.55, -1.1, 0.55, 0.14, 0.38, '#3d3550');
  s.cyl(2.7, 1.68, -1.1, 0.035, 0.42, '#c9cedd');
  s.sphere(2.7, 1.94, -1.1, 0.09, '#1b1d28');
  // screens
  [-3.0, 3.0].forEach((x) => {
    s.box(x, 2.55, -4.86, 1.7, 1.05, 0.08, '#080910', { far: true });
    s.box(x, 2.55, -4.81, 1.5, 0.85, 0.03, css(mix(A, [10, 10, 20], 0.35)), { far: true });
    s.label('NOMINEES', x, 2.55, -4.76, { color: 'rgba(255,255,255,.4)', size: 7, weight: 800 });
  });
  // audience
  for (let r = 0; r < 5; r++) {
    for (let i = 0; i < 13; i++) {
      const x = -6 + i * 1.0 + (r % 2) * 0.25;
      const z = 1.2 + r * 1.15;
      const yy = 0.5 + Math.sin(s.t * 2 + i * 0.7 + r) * 0.04;
      s.box(x, yy, z, 0.36, 0.64, 0.36, '#0d0e17');
      s.sphere(x, yy + 0.47, z, 0.15, '#1c1d2a');
      if ((i * 5 + r) % 13 === 0) s.sphere(x, yy + 0.75, z - 0.02, 0.04, css(G, 0.85), { glow: G });
    }
  }
  // spotlights
  [[-4.4, A], [4.4, G], [0, '#a78bfa']].forEach(([x, c]) => {
    s.spot(x, 0.1, -0.4, 3.6, c, 0.14);
    s.glow(x, 4.5, -1.2, 0.5, c, 0.45);
    s.box(x, 4.4, -1.2, 0.2, 0.2, 0.2, '#20202c');
  });
  s.spot(0, 1.4, -1.5, 2.8, G, 0.18);
}

function festivalScene(s) {
  const A = s.accent, B = s.accent2;
  s.floorPlane(22, 15, '#10121a', { step: 2.2, alpha: 0.95 });
  // sky glow
  s.glow(0, 5.2, -5.5, 6.2, css(A), 0.2);
  // main stage
  s.box(0, 1.25, -4.2, 10, 2.5, 4.0, '#16141f', { top: 1.15 });
  s.box(0, 2.6, -5.6, 10.6, 0.9, 0.24, '#0c0c14', { far: true });
  s.box(0, 4.3, -5.55, 10.2, 2.4, 0.2, '#0a0a12', { far: true });
  // LED wall
  s.box(0, 4.35, -5.42, 8.6, 2.1, 0.06, css(mix(A, [10, 10, 20], 0.25)), { top: 1, far: true });
  for (let i = 0; i < 7; i++) s.line([-4.3 + i * 1.42, 3.4, -5.37], [-4.3 + i * 1.42, 5.3, -5.37], css(B, 0.18), { lw: 1 });
  s.label('LIVE', 0, 4.35, -5.34, { color: '#fff', size: 17, weight: 900 });
  // truss
  s.box(0, 5.75, -5.2, 11.2, 0.18, 0.18, '#4a4f63');
  s.box(0, 5.75, -2.0, 11.2, 0.18, 0.18, '#4a4f63');
  [-5.4, 5.4].forEach((x) => s.box(x, 5.75, -3.6, 0.16, 0.16, 3.4, '#4a4f63'));
  [-4.4, -2.2, 0, 2.2, 4.4].forEach((x, i) => {
    s.box(x, 5.55, -3.6, 0.26, 0.26, 0.26, '#23232e');
    s.glow(x, 5.35, -3.6, 0.4, i % 2 ? css(B) : css(A), 0.4);
    s.spot(x, 0.1, 1.6 + (i % 3) * 0.5, 2.2, i % 2 ? B : A, 0.1);
  });
  // side screens
  [-5.9, 5.9].forEach((x) => {
    s.box(x, 3.6, -3.2, 1.8, 2.5, 0.14, '#080911', { far: true });
    s.box(x, 3.6, -3.11, 1.6, 2.25, 0.04, css(A), { far: true });
    s.label('FEST', x, 3.6, -3.05, { color: css(A, 0.7), size: 9, weight: 900 });
  });
  // stage front edge lights
  for (let i = 0; i < 14; i++) {
    s.box(-4.8 + i * 0.74, 2.55, -2.2, 0.18, 0.1, 0.18, i % 2 ? css(A) : '#ffffff', { glow: css(A), top: 1.4 });
  }
  // band silhouettes
  [[-1.8, 2.0], [0.4, 2.2], [2.2, 2.1]].forEach(([x, y], i) => {
    s.cyl(x, 2.6, -3.0, 0.16, 0.9, '#0b0b11');
    s.sphere(x, 3.7, -3.0, 0.2, '#0e0e16');
    s.line([x + 0.25, 3.4, -3.0], [x + (i === 1 ? 0.9 : 0.55), 3.63, -2.95], '#0b0b11', { lw: 3 });
  });
  // speakers
  [-4.5, 4.5].forEach((x) => {
    s.box(x, 1.3, -1.8, 1.2, 2.6, 1.0, '#11131c');
    s.cyl(x, 1.0, -1.28, 0.32, 0.3, '#1d2030');
    s.cyl(x, 1.85, -1.28, 0.24, 0.24, '#1d2030');
    s.cyl(x, 2.45, -1.28, 0.15, 0.16, '#1d2030');
  });
  // crowd
  for (let r = 0; r < 8; r++) {
    for (let i = 0; i < 22; i++) {
      if ((i + r * 3) % 7 === 0) continue;
      const x = -9.4 + i * 0.9 + (r % 2) * 0.32;
      const z = 0.9 + r * 1.45;
      const bob = Math.sin(s.t * 3 + i * 0.9 + r * 0.7) * 0.075;
      const c = (i + r) % 9 === 0 ? css(mix(A, [14, 12, 22], 0.42)) : (i + r) % 11 === 0 ? css(mix(B, [14, 12, 22], 0.42)) : '#0a0b12';
      s.box(x, 0.46 + bob, z, 0.34, 0.68, 0.34, c, { top: 1.08 });
      s.sphere(x, 0.92 + bob, z, 0.15, '#191a28');
      if ((i * 7 + r * 3) % 17 === 0) s.sphere(x + 0.3, 1.35 + bob, z - 0.1, 0.035, '#ffffff', { glow: '#ffffff', alpha: 0.9 });
    }
  }
  // flags / food stalls
  [-8.4, 8.4].forEach((x, k) => {
    s.box(x, 1.0, 1.0, 2.2, 1.8, 1.3, '#191624');
    s.box(x, 1.95, 1.0, 2.4, 0.14, 1.5, k ? css(A, 0.75) : css(B, 0.7));
    s.label(k ? 'MERCH' : 'FOOD', x, 1.35, 0.32, { color: 'rgba(255,255,255,.4)', size: 7, weight: 800 });
  });
  s.glow(0, 0.4, 3.2, 4.8, css(A), 0.14);
}

/* ---------------------------------- mount ---------------------------------- */
export function mountScene(canvas, kind, opts = {}) {
  if (!canvas) return null;
  const existing = SCENES.get(canvas);
  if (existing) existing.destroy();
  try {
    return new Scene(canvas, kind, opts);
  } catch (err) {
    console.warn('3D scene failed', err);
    return null;
  }
}

export function sceneFor(canvas) {
  return SCENES.get(canvas) || null;
}

export function cleanupScenes() {
  for (const [canvas, scene] of [...SCENES.entries()]) {
    if (!canvas.isConnected) scene.destroy();
  }
}

export function destroyScenes() {
  for (const s of [...SCENES.values()]) s.destroy();
}

function tick(now) {
  const t = now / 1000;
  for (const scene of SCENES.values()) {
    if (scene.destroyed) continue;
    if (!scene.visible) continue;
    scene.t = t;
    if (scene.auto && !scene.drag && now - scene.lastInteract > 4200) scene.yaw += 0.0014;
    try { scene.render(); } catch (err) { console.warn(err); }
  }
  if (!SCENES.size) { LOOP = null; return; }
  LOOP = requestAnimationFrame(tick);
}
