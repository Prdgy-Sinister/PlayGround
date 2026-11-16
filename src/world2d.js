// Canvas-2D fallback world. Used when the browser cannot create a WebGL 2
// context (hardware acceleration disabled, old GPU, managed device, etc.).
// It mirrors the World API used by Game and UI so every panel, interaction
// and travel destination keeps working; only the presentation changes.
import { LOCATIONS } from './world.js';
import { SEASONS, WEATHERS, isNight, seasonIndex, locationStoryAccess } from './data.js';

const TAU = Math.PI * 2;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function hexToRgb(hex) {
  return [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255];
}
const rgb = (c) => `rgb(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])})`;
const rgba = (c, a) => `rgba(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])},${a})`;
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
function dim(c, night, extra = 0) {
  const base = Array.isArray(c) ? c : hexToRgb(c);
  return rgb(mix(base, [14, 18, 28], clamp(night * 0.55 + extra, 0, 0.8)));
}

// Interaction points, in world units relative to the location centre.
const SPOTS = {
  estate: [
    { id: 'estate-house', label: 'Enter your house — rest and save', kanji: '家', x: 0, z: -4.6, radius: 4.5 },
    { id: 'estate-forge', label: 'Enter the forge', kanji: '鍛', x: 12.4, z: -4.2, radius: 4.4 },
    { id: 'estate-bonsai', label: 'Tend the bonsai garden', kanji: '盆', x: -3.9, z: 9.6, radius: 4.8 },
    { id: 'estate-pond', label: 'Watch the koi and clear your mind', kanji: '鯉', x: 10.5, z: 7.5, radius: 4.2 },
    { id: 'estate-ledger', label: 'Review your estate', kanji: '宅', x: -11.5, z: 12.2, radius: 4.2 },
  ],
  auction: [
    { id: 'auction', label: 'Speak with the auctioneer', kanji: '競', x: 2.2, z: 3, radius: 5.5 },
  ],
  village: [
    { id: 'village-market', label: 'Trade with the village merchant', kanji: '市', x: 9, z: 5.5, radius: 4.8 },
    { id: 'village-elder', label: 'Ask the village elder for work', kanji: '翁', x: -6, z: 8, radius: 4.2 },
  ],
  temple: [
    { id: 'temple-bell', label: 'Ring the bell and meditate', kanji: '鐘', x: 14, z: -1.5, radius: 4.4 },
    { id: 'temple-monk', label: 'Speak with the abbot', kanji: '僧', x: 3, z: -5.5, radius: 4.4 },
  ],
  bamboo: [
    { id: 'bamboo-gather', label: 'Harvest bamboo and forest seeds', kanji: '竹', x: -4, z: 12, radius: 4.4 },
    { id: 'oni-gate', label: 'Approach the red gate', kanji: '鬼', x: 7, z: -13.5, radius: 5 },
  ],
  cherry: [
    { id: 'cherry-gather', label: 'Gather cherry pips and petals', kanji: '桜', x: -10, z: 8, radius: 4.4 },
    { id: 'cherry-rest', label: 'Rest under the blossom tree', kanji: '憩', x: -3, z: 3, radius: 3.6 },
  ],
  waterfall: [
    { id: 'waterfall-meditate', label: 'Meditate beneath the falls', kanji: '禅', x: 2, z: 6, radius: 4.4 },
  ],
  mine: [
    { id: 'mine-gather', label: 'Gather iron and tamahagane', kanji: '鉱', x: 3, z: 4, radius: 4.8 },
  ],
  shrine: [
    { id: 'shrine-offer', label: 'Make an offering to the fox spirits', kanji: '狐', x: 0, z: -3.4, radius: 4.4 },
    { id: 'shrine-rest', label: 'Sit beneath the shrine maples', kanji: '憩', x: 6, z: 5, radius: 3.8 },
  ],
  quarry: [
    { id: 'quarry-gather', label: 'Split silver, jade and star-stone', kanji: '石', x: 0, z: 1.5, radius: 4.6 },
  ],
  kiln: [
    { id: 'kiln-gather', label: 'Gather porcelain, lacquer and bronze', kanji: '窯', x: 0, z: 1.5, radius: 4.6 },
  ],
  ridge: [
    { id: 'ridge-beacon', label: 'Light the high beacon', kanji: '火', x: 0, z: -8.5, radius: 5.2 },
    { id: 'ridge-rest', label: 'Listen to the wind above the clouds', kanji: '風', x: 6, z: 4, radius: 3.8 },
  ],
};

const PALETTES = {
  spring: {
    top: 0x9dbdd3, bottom: 0xe9ead5, ground: 0x8aa268, mount: 0x8fa1a3,
    accent: 0xf0b7c9, leaf: 0x7fa75e, far: 0xb9c8c2,
  },
  summer: {
    top: 0x86b2d4, bottom: 0xebeacb, ground: 0x6f8d4f, mount: 0x7f9694,
    accent: 0x9fbf6a, leaf: 0x557f3e, far: 0xaebfb6,
  },
  autumn: {
    top: 0x9db4c7, bottom: 0xf2dcba, ground: 0x94804c, mount: 0x9e9182,
    accent: 0xd07a3e, leaf: 0xb96a32, far: 0xc7b69c,
  },
  winter: {
    top: 0xb8c9d6, bottom: 0xf0f4f4, ground: 0xd9e0e1, mount: 0xa9b4b9,
    accent: 0xe8f1f5, leaf: 0x839279, far: 0xd5dfe1,
  },
};

function palette(seasonId, hour, weather) {
  const pal = PALETTES[seasonId] || PALETTES.spring;
  const dayF = clamp((Math.sin(((hour - 6) / 12) * Math.PI) + 0.1) / 1.1, 0, 1);
  const dusk = clamp(1 - Math.abs(hour - 18.2) / 2.6, 0, 1);
  const dawn = clamp(1 - Math.abs(hour - 6) / 2.4, 0, 1);
  const night = 1 - dayF;
  const weatherDark = weather === 'storm' ? 0.35 : weather === 'rain' ? 0.2 : 0;

  let top = mix(hexToRgb(0x0a1224), hexToRgb(pal.top), dayF);
  let bottom = mix(hexToRgb(0x202b3d), hexToRgb(pal.bottom), dayF);
  top = mix(top, hexToRgb(0x495a78), Math.max(dawn, dusk) * 0.55);
  bottom = mix(bottom, hexToRgb(0xe79f72), Math.max(dawn, dusk) * 0.45);
  top = mix(top, hexToRgb(0x2c3038), weatherDark * 0.7);
  bottom = mix(bottom, hexToRgb(0x4a4c44), weatherDark * 0.6);

  const ground = mix(hexToRgb(0x1c2422), hexToRgb(pal.ground), dayF);
  const far = mix(hexToRgb(0x121a20), hexToRgb(pal.far), dayF);
  const mount = mix(hexToRgb(0x0e151c), hexToRgb(pal.mount), dayF);
  const leaf = mix(hexToRgb(0x1a2418), hexToRgb(pal.leaf), dayF);
  const accent = mix(hexToRgb(0x4b3a34), hexToRgb(pal.accent), dayF);
  return {
    dayF, night, top, bottom, ground, far, mount, leaf, accent,
    isNight: isNight(hour),
    sunX: clamp((hour - 6) / 12, 0, 1),
  };
}

// ————— small screen-space drawing helpers —————
function roof(ctx, cx, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx - w / 2, y);
  ctx.quadraticCurveTo(cx, y - h * 1.45, cx + w / 2, y);
  ctx.lineTo(cx + w * 0.38, y + h * 0.22);
  ctx.lineTo(cx - w * 0.38, y + h * 0.22);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,.18)';
  ctx.lineWidth = 1;
  ctx.stroke();
}

function house(ctx, cx, baseY, s, wall, roofC, night, windows = 2) {
  const w = 150 * s;
  const h = 80 * s;
  ctx.fillStyle = dim(wall, night);
  ctx.fillRect(cx - w / 2, baseY - h, w, h);
  ctx.fillStyle = dim(0x3a2d22, night);
  ctx.fillRect(cx - w * 0.08, baseY - h * 0.62, w * 0.16, h * 0.62);
  for (let i = 0; i < windows; i++) {
    const wx = cx - w * 0.34 + i * (w * 0.68 / Math.max(1, windows - 1 || 1));
    ctx.fillStyle = dim(0xd8c9a4, night);
    ctx.fillRect(wx - w * 0.055, baseY - h * 0.82, w * 0.11, h * 0.3);
    ctx.strokeStyle = dim(0x4d3a29, night);
    ctx.lineWidth = 1.4 * s;
    ctx.strokeRect(wx - w * 0.055, baseY - h * 0.82, w * 0.11, h * 0.3);
  }
  roof(ctx, cx, baseY - h, w * 1.3, 34 * s, dim(roofC, night));
}

function torii(ctx, cx, baseY, s, night) {
  const w = 120 * s, h = 108 * s;
  const c = dim(0xa9362a, night);
  ctx.fillStyle = c;
  ctx.fillRect(cx - w / 2, baseY - h, 9 * s, h);
  ctx.fillRect(cx + w / 2 - 9 * s, baseY - h, 9 * s, h);
  ctx.fillRect(cx - w * 0.62, baseY - h, w * 1.24, 8 * s);
  ctx.fillRect(cx - w * 0.5, baseY - h * 0.78, w, 6 * s);
  ctx.fillRect(cx - 4 * s, baseY - h - 8 * s, 8 * s, 18 * s);
  ctx.fillStyle = dim(0xd8c393, night);
  ctx.fillRect(cx - 14 * s, baseY - h * 0.9, 28 * s, 18 * s);
}

function lantern(ctx, x, y, s, night, glow = true) {
  const post = dim(0x5a5148, night);
  ctx.fillStyle = post;
  ctx.fillRect(x - 2 * s, y - 44 * s, 4 * s, 44 * s);
  ctx.fillRect(x - 12 * s, y - 46 * s, 24 * s, 5 * s);
  ctx.fillStyle = glow ? rgba([255, 178, 96], 0.92) : dim(0x8d8a7d, night);
  ctx.fillRect(x - 8 * s, y - 62 * s, 16 * s, 16 * s);
  roof(ctx, x, y - 62 * s, 28 * s, 8 * s, dim(0x4a3a32, night));
  if (glow) {
    const g = ctx.createRadialGradient(x, y - 54 * s, 1, x, y - 54 * s, 32 * s);
    g.addColorStop(0, 'rgba(255,181,96,.35)');
    g.addColorStop(1, 'rgba(255,181,96,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y - 54 * s, 32 * s, 0, TAU);
    ctx.fill();
  }
}

function tree(ctx, x, baseY, s, leaf, trunk, night) {
  ctx.strokeStyle = dim(trunk, night);
  ctx.lineWidth = 8 * s;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x, baseY);
  ctx.quadraticCurveTo(x - 8 * s, baseY - 34 * s, x + 4 * s, baseY - 56 * s);
  ctx.stroke();
  ctx.fillStyle = dim(leaf, night);
  for (const [dx, dy, r] of [[-20, -58, 22], [16, -64, 26], [-2, -82, 21], [26, -46, 17], [-30, -44, 15]]) {
    ctx.beginPath();
    ctx.arc(x + dx * s, baseY + dy * s, r * s, 0, TAU);
    ctx.fill();
  }
}

function bamboo(ctx, x, baseY, s, night, time) {
  const c = dim(0x83934f, night);
  for (let i = 0; i < 3; i++) {
    const bx = x + (i - 1) * 13 * s;
    const h = (100 + i * 24) * s;
    ctx.strokeStyle = c;
    ctx.lineWidth = 4.5 * s;
    ctx.beginPath();
    ctx.moveTo(bx, baseY);
    ctx.quadraticCurveTo(bx + Math.sin(time * 0.6 + i) * 7 * s, baseY - h * 0.55, bx + Math.sin(time * 0.6 + i) * 11 * s, baseY - h);
    ctx.stroke();
    ctx.fillStyle = c;
    for (let j = 0; j < 3; j++) {
      const yy = baseY - h * (0.55 + j * 0.15);
      const xx = bx + Math.sin(time * 0.6 + i) * (6 + j * 2) * s;
      ctx.beginPath();
      ctx.ellipse(xx + (j % 2 ? 13 : -13) * s, yy, 14 * s, 4 * s, j % 2 ? 0.4 : -0.4, 0, TAU);
      ctx.fill();
    }
  }
}

function rock(ctx, x, baseY, r, color, night) {
  ctx.fillStyle = dim(color, night);
  ctx.beginPath();
  ctx.moveTo(x - r, baseY);
  ctx.lineTo(x - r * 0.62, baseY - r * 0.86);
  ctx.lineTo(x - r * 0.1, baseY - r * 1.06);
  ctx.lineTo(x + r * 0.55, baseY - r * 0.7);
  ctx.lineTo(x + r, baseY);
  ctx.closePath();
  ctx.fill();
}

export class LiteWorld {
  constructor(canvas, game) {
    this.canvas = canvas;
    this.game = game;
    this.state = game.state;
    this.lite = true;
    this.ctx = canvas.getContext('2d', { alpha: false });
    if (!this.ctx) throw new Error('Canvas 2D is unavailable in this browser.');
    this.coarsePointer = window.matchMedia?.('(pointer: coarse)').matches ?? false;

    this.player = { position: { x: 0, y: 0, z: 0 }, rotation: { y: 0 } };
    this.keys = { w: false, a: false, s: false, d: false };
    this.joystick = { x: 0, y: 0 };
    this.clickTarget = null;
    this.locked = false;
    this.time = 0;
    this.walkTime = 0;
    this.facing = 1;
    this.nearby = null;
    this.currentZone = null;
    this.interactions = [];
    this.onNearbyChange = null;
    this.onZoneChange = null;
    this.season = SEASONS[0];
    this.seasonId = 'spring';
    this.running = false;
    this.motes = Array.from({ length: 42 }, (_, i) => ({
      x: Math.random(), y: Math.random(), s: 0.5 + Math.random(), p: Math.random() * TAU,
      kind: i % 3,
    }));
    this.stars = Array.from({ length: 70 }, () => ({
      x: Math.random(), y: Math.random() * 0.55, s: 0.4 + Math.random() * 1.1, p: Math.random() * TAU,
    }));

    this.travelTo('estate');
    this.bindInput();
    this.resize();
  }

  // The real World exposes this for the camera; Lite mode keeps a fixed view.
  snapCamera() {}

  rebuildBonsai() {}
  rebuildWeaponRack() {}
  rebuildDecor() {}

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, this.coarsePointer ? 2 : 2);
    this.dpr = dpr;
    this.w = Math.max(320, window.innerWidth || 320);
    this.h = Math.max(320, window.innerHeight || 320);
    this.canvas.width = Math.round(this.w * dpr);
    this.canvas.height = Math.round(this.h * dpr);
    // Fit the whole location into the painted scene: the walkable radius maps
    // to roughly 40% of the smaller viewport dimension.
    const radius = this.loc?.radius || 30;
    this.scale = clamp(Math.min(this.w * 0.44, this.h * 0.62) / radius, 5, 16);
    // Vertical spacing is fitted separately: a narrow phone needs a larger
    // per-unit Y scale or interaction markers collapse into one another.
    this.yScale = clamp((this.h * 0.19) / (radius * 0.9), 1.2, 9);
    this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  travelTo(locId) {
    const loc = LOCATIONS[locId] || LOCATIONS.estate;
    const access = locationStoryAccess(this.game.state, loc.id);
    if (!access.unlocked) {
      this.game.toast(`This path opens in Chapter ${access.chapter?.numeral || '?'}: ${access.chapter?.title || 'an earlier chapter'}.`, 'warn');
      return;
    }
    this.loc = loc;
    this.player.position.x = loc.spawn.x;
    this.player.position.z = loc.spawn.z;
    this.clickTarget = null;
    this.currentZone = null;
    this.nearby = null;
    this.onNearbyChange?.(null);
    const spots = SPOTS[locId] || [];
    this.interactions = spots.map((s) => ({
      ...s,
      pos: { x: loc.x + s.x, z: loc.z + s.z },
      radius: s.radius ?? 4.5,
    }));
    this.resize();
  }

  setJoystick(x, y) {
    this.joystick.x = x;
    this.joystick.y = y;
  }

  bindInput() {
    window.addEventListener('keydown', (event) => {
      if (event.target && ['INPUT', 'TEXTAREA'].includes(event.target.tagName)) return;
      const k = event.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) {
        event.preventDefault();
        if (k === 'w' || k === 'arrowup') this.keys.w = true;
        if (k === 's' || k === 'arrowdown') this.keys.s = true;
        if (k === 'a' || k === 'arrowleft') this.keys.a = true;
        if (k === 'd' || k === 'arrowright') this.keys.d = true;
        this.clickTarget = null;
      }
      if (k === 'e' && !this.locked) this.tryInteract();
    });
    window.addEventListener('keyup', (event) => {
      const k = event.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') this.keys.w = false;
      if (k === 's' || k === 'arrowdown') this.keys.s = false;
      if (k === 'a' || k === 'arrowleft') this.keys.a = false;
      if (k === 'd' || k === 'arrowright') this.keys.d = false;
    });
    window.addEventListener('blur', () => { this.keys = { w: false, a: false, s: false, d: false }; });
    window.addEventListener('resize', () => this.resize());

    const el = this.canvas;
    let down = null;
    let dragged = false;
    el.addEventListener('contextmenu', (event) => event.preventDefault());
    el.addEventListener('pointerdown', (event) => {
      if (event.button !== undefined && event.button !== 0) return;
      down = { x: event.clientX, y: event.clientY };
      dragged = false;
      try { el.setPointerCapture?.(event.pointerId); } catch { /* synthetic or stale pointer */ }
    });
    el.addEventListener('pointermove', (event) => {
      if (!down) return;
      if (Math.hypot(event.clientX - down.x, event.clientY - down.y) > 8) dragged = true;
    });
    el.addEventListener('pointerup', (event) => {
      if (!down) return;
      down = null;
      if (!dragged && !this.locked) this.handleClick(event.clientX, event.clientY);
      dragged = false;
    });
    el.addEventListener('pointercancel', () => { down = null; dragged = false; });
  }

  toScreen(x, z) {
    return {
      x: this.w * 0.5 + (x - this.loc.x) * this.scale,
      y: this.h * 0.68 - (z - this.loc.z) * this.yScale,
    };
  }

  fromScreen(sx, sy) {
    return {
      x: this.loc.x + (sx - this.w * 0.5) / this.scale,
      z: this.loc.z - (sy - this.h * 0.68) / this.yScale,
    };
  }

  handleClick(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    const sx = clientX - rect.left;
    const sy = clientY - rect.top;
    let best = null;
    let bestD = 34;
    for (const spot of this.interactions) {
      const p = this.toScreen(spot.pos.x, spot.pos.z);
      const d = Math.hypot(p.x - sx, p.y - sy);
      if (d < bestD) { bestD = d; best = spot; }
    }
    if (best) {
      const d = Math.hypot(best.pos.x - this.player.position.x, best.pos.z - this.player.position.z);
      if (d <= best.radius + 1.5) {
        this.trigger(best);
      } else {
        this.clickTarget = { x: best.pos.x, z: best.pos.z };
      }
      return;
    }
    const point = this.fromScreen(sx, sy);
    this.clickTarget = this.clampToArea(point.x, point.z);
  }

  clampToArea(x, z) {
    const dx = x - this.loc.x;
    const dz = z - this.loc.z;
    const d = Math.hypot(dx, dz);
    const max = this.loc.radius * 0.9;
    if (d <= max) return { x, z };
    return { x: this.loc.x + dx / d * max, z: this.loc.z + dz / d * max };
  }

  tryInteract() {
    if (this.nearby) this.trigger(this.nearby);
  }

  trigger(inter) {
    this.clickTarget = null;
    this.game.worldAction(inter.id);
  }

  update(dt) {
    this.time += dt;
    this.state = this.game.state;
    const season = SEASONS[seasonIndex(this.state.day)];
    this.season = season;
    this.seasonId = season.id;

    if (!this.locked) {
      const k = this.keys;
      let dx = (k.d ? 1 : 0) - (k.a ? 1 : 0) + this.joystick.x;
      let dz = (k.w ? 1 : 0) - (k.s ? 1 : 0) - this.joystick.y;
      let moving = false;
      if (this.clickTarget) {
        const tx = this.clickTarget.x - this.player.position.x;
        const tz = this.clickTarget.z - this.player.position.z;
        const d = Math.hypot(tx, tz);
        if (d > 0.35) {
          dx = tx / d;
          dz = tz / d;
          moving = true;
        } else {
          this.clickTarget = null;
        }
      }
      if (dx || dz) {
        const len = Math.hypot(dx, dz) || 1;
        const speed = 7.5;
        this.player.position.x += (dx / len) * speed * dt;
        this.player.position.z += (dz / len) * speed * dt;
        const area = this.clampToArea(this.player.position.x, this.player.position.z);
        this.player.position.x = area.x;
        this.player.position.z = area.z;
        this.facing = dx >= 0 ? 1 : -1;
        this.walkTime += dt * 9;
        moving = true;
      }
      if (moving) this.clickTarget = this.clickTarget || null;
    }

    // nearest interaction
    let nearest = null;
    let nd = Infinity;
    for (const spot of this.interactions) {
      const d = Math.hypot(spot.pos.x - this.player.position.x, spot.pos.z - this.player.position.z);
      if (d < spot.radius && d < nd) { nd = d; nearest = spot; }
    }
    if (nearest !== this.nearby) {
      this.nearby = nearest;
      this.onNearbyChange?.(nearest);
    }

    // zone change (normally always the current location in scroll view)
    const zone = this.loc;
    if (zone && zone.id !== this.currentZone) {
      this.currentZone = zone.id;
      this.onZoneChange?.(zone);
    }
  }

  // ————— painting —————
  render() {
    const ctx = this.ctx;
    if (!ctx) return;
    const w = this.w, h = this.h;
    const hour = (this.state.minutes ?? 480) / 60;
    const pal = palette(this.seasonId, hour, this.state.weather);
    ctx.save();
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    this.paintSky(ctx, w, h, pal, hour);
    this.paintMountains(ctx, w, h, pal);
    this.paintGround(ctx, w, h, pal);
    this.paintScenery(ctx, w, h, pal);
    this.paintSpots(ctx, pal);
    this.paintPlayer(ctx, pal);
    this.paintMotes(ctx, w, h, pal);
    this.paintWeather(ctx, w, h, pal, hour);
    ctx.restore();
  }

  paintSky(ctx, w, h, pal, hour) {
    const g = ctx.createLinearGradient(0, 0, 0, h * 0.8);
    g.addColorStop(0, rgb(pal.top));
    g.addColorStop(1, rgb(pal.bottom));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    if (pal.night > 0.2) {
      for (const s of this.stars) {
        const a = pal.night * (0.45 + 0.4 * Math.sin(this.time * 1.2 + s.p));
        ctx.fillStyle = `rgba(238,240,220,${a})`;
        ctx.fillRect(s.x * w, s.y * h, s.s, s.s);
      }
    }
    // sun / moon
    const sunX = w * (0.1 + 0.8 * pal.sunX);
    const sunY = h * 0.24 + Math.sin(pal.sunX * Math.PI) * h * 0.02;
    if (pal.dayF > 0.05) {
      const glow = ctx.createRadialGradient(sunX, sunY, 2, sunX, sunY, 70);
      glow.addColorStop(0, 'rgba(255,230,172,.9)');
      glow.addColorStop(1, 'rgba(255,220,150,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 70, 0, TAU);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,238,192,.95)';
      ctx.beginPath();
      ctx.arc(sunX, sunY, 16, 0, TAU);
      ctx.fill();
    } else {
      const moonX = w * 0.72, moonY = h * 0.18;
      ctx.fillStyle = 'rgba(235,239,224,.9)';
      ctx.beginPath();
      ctx.arc(moonX, moonY, 13, 0, TAU);
      ctx.fill();
      ctx.fillStyle = rgb(pal.top);
      ctx.beginPath();
      ctx.arc(moonX + 8, moonY - 4, 13, 0, TAU);
      ctx.fill();
    }
    // clouds
    ctx.fillStyle = `rgba(255,250,240,${0.14 + pal.dayF * 0.08})`;
    for (let i = 0; i < 5; i++) {
      const cx = ((this.time * 4 + i * 31) % (w + 260)) - 130;
      const cy = h * (0.12 + i * 0.045);
      for (let j = 0; j < 4; j++) {
        ctx.beginPath();
        ctx.ellipse(cx + j * 34, cy + Math.sin(j) * 6, 40, 11, 0, 0, TAU);
        ctx.fill();
      }
    }
  }

  paintMountains(ctx, w, h, pal) {
    const ridge = (baseY, amp, color, phase) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, baseY);
      const steps = 9;
      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * w;
        const y = baseY - Math.abs(Math.sin(i * 0.9 + phase)) * amp - Math.sin(i * 0.37 + phase) * amp * 0.3;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();
    };
    ridge(h * 0.46, h * 0.09, rgb(mix(pal.far, pal.top, 0.28)), 1.2);
    ridge(h * 0.52, h * 0.07, rgb(mix(pal.mount, pal.far, 0.35)), 3.4);
  }

  paintGround(ctx, w, h, pal) {
    const snowy = this.loc?.id === 'ridge';
    const base = snowy
      ? mix(hexToRgb(0x263038), hexToRgb(0xdfe8e9), pal.dayF)
      : pal.ground;
    const g = ctx.createLinearGradient(0, h * 0.45, 0, h);
    g.addColorStop(0, rgb(mix(base, pal.bottom, 0.35)));
    g.addColorStop(1, rgb(mix(base, snowy ? [96, 112, 118] : [18, 25, 20], snowy ? 0.28 : 0.25)));
    ctx.fillStyle = g;
    ctx.fillRect(0, h * 0.46, w, h * 0.54);

    // pale approach path
    ctx.fillStyle = snowy
      ? rgba(mix(base, [176, 188, 192], 0.5), 0.62)
      : rgba(mix(pal.ground, [214, 203, 174], 0.55), 0.55);
    ctx.beginPath();
    ctx.moveTo(w * 0.47, h * 0.47);
    ctx.lineTo(w * 0.53, h * 0.47);
    ctx.lineTo(w * 0.66, h);
    ctx.lineTo(w * 0.34, h);
    ctx.closePath();
    ctx.fill();

    // stones and grass tufts
    ctx.fillStyle = snowy ? rgba([92, 108, 114], 0.24) : rgba([40, 48, 38], 0.18);
    for (let i = 0; i < 20; i++) {
      const x = ((i * 97) % 100) / 100 * w;
      const y = h * (0.58 + ((i * 53) % 38) / 100);
      ctx.beginPath();
      ctx.ellipse(x, y, 8 + (i % 4) * 5, 3 + (i % 3) * 2, 0, 0, TAU);
      ctx.fill();
    }
    if (snowy) {
      // Wind-carved drifts instead of summer grass.
      ctx.fillStyle = rgba(mix(base, [255, 255, 255], 0.35), 0.4);
      for (let i = 0; i < 9; i++) {
        const x = ((i * 73 + 11) % 100) / 100 * w;
        const y = h * (0.54 + ((i * 41) % 42) / 100);
        ctx.beginPath();
        ctx.ellipse(x, y, 18 + (i % 4) * 8, 4 + (i % 3) * 2, -0.12, 0, TAU);
        ctx.fill();
      }
      return;
    }
    ctx.strokeStyle = rgba(mix(pal.leaf, [20, 30, 18], 0.3), 0.6);
    ctx.lineWidth = 1.4;
    for (let i = 0; i < 34; i++) {
      const x = ((i * 61) % 100) / 100 * w;
      const y = h * (0.55 + ((i * 29) % 42) / 100);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 3, y - 7);
      ctx.moveTo(x, y);
      ctx.lineTo(x + 2, y - 8);
      ctx.stroke();
    }
  }

  paintScenery(ctx, w, h, pal) {
    const night = pal.night;
    const cx = w * 0.5;
    const base = h * 0.47;
    const s = clamp(this.scale / 17, 0.65, 1.5);
    const id = this.loc.id;
    if (id === 'estate') {
      house(ctx, cx - w * 0.1, base, s * 0.95, 0xe8ddc4, 0x3a3d44, night, 3);
      house(ctx, cx + w * 0.24, base + 6, s * 0.6, 0xded2b6, 0x4a3a32, night, 1);
      // fence
      ctx.fillStyle = dim(0x4a3526, night);
      for (let i = 0; i < 12; i++) ctx.fillRect(w * 0.18 + i * w * 0.06, h * 0.52, 3, 26);
      ctx.fillRect(w * 0.18, h * 0.535, w * 0.64, 3);
      // bonsai benches
      ctx.fillStyle = dim(0x6b4934, night);
      for (let i = 0; i < 3; i++) {
        const bx = cx - w * 0.14 + i * w * 0.13;
        ctx.fillRect(bx - 34, h * 0.60, 68, 7);
        ctx.fillRect(bx - 28, h * 0.60 + 7, 4, 15);
        ctx.fillRect(bx + 24, h * 0.60 + 7, 4, 15);
        tree(ctx, bx, h * 0.60, 0.22, pal.leaf, 0x57402e, night);
      }
      // pond
      ctx.fillStyle = rgba(mix(pal.top, [110, 170, 170], 0.6), 0.6);
      ctx.beginPath();
      ctx.ellipse(w * 0.82, h * 0.66, w * 0.1, h * 0.035, -0.1, 0, TAU);
      ctx.fill();
      lantern(ctx, w * 0.28, h * 0.62, 0.8, night);
      lantern(ctx, w * 0.72, h * 0.62, 0.8, night);
    } else if (id === 'auction') {
      house(ctx, cx, base - 6, s * 0.8, 0xe4d6b8, 0x4a3a32, night, 2);
      // striped canopy
      ctx.fillStyle = dim(0xb43f30, night);
      ctx.beginPath();
      ctx.moveTo(cx - w * 0.26, h * 0.5);
      ctx.lineTo(cx - w * 0.18, h * 0.38);
      ctx.lineTo(cx + w * 0.18, h * 0.38);
      ctx.lineTo(cx + w * 0.26, h * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = dim(0xe9dcc0, night);
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(cx - w * 0.25 + i * w * 0.1, h * 0.5);
        ctx.lineTo(cx - w * 0.175 + i * w * 0.1, h * 0.38);
        ctx.lineTo(cx - w * 0.125 + i * w * 0.1, h * 0.38);
        ctx.lineTo(cx - w * 0.2 + i * w * 0.1, h * 0.5);
        ctx.closePath();
        ctx.fill();
      }
      for (let i = 0; i < 3; i++) tree(ctx, w * (0.26 + i * 0.24), h * 0.62, 0.9, pal.accent, 0x57402e, night);
      lantern(ctx, w * 0.2, h * 0.6, 0.9, night);
      lantern(ctx, w * 0.8, h * 0.6, 0.9, night);
    } else if (id === 'village') {
      house(ctx, w * 0.3, base + 4, s * 0.8, 0xe4d6b8, 0x4a3d35, night, 2);
      house(ctx, w * 0.7, base + 8, s * 0.72, 0xdccdb0, 0x3c4148, night, 2);
      // stall
      ctx.fillStyle = dim(0x5a3d28, night);
      ctx.fillRect(cx - 46, h * 0.55, 92, 10);
      ctx.fillStyle = dim(0xb33a2b, night);
      ctx.fillRect(cx - 52, h * 0.49, 104, 9);
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = dim(i % 2 ? 0xc9a45c : 0xe9dcc0, night);
        ctx.fillRect(cx - 44 + i * 20, h * 0.52, 12, 6);
      }
      // well
      ctx.strokeStyle = dim(0x8d8a7d, night);
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(w * 0.16, h * 0.63, 15, 0, TAU);
      ctx.stroke();
      for (let i = 0; i < 3; i++) tree(ctx, w * (0.12 + i * 0.38), h * 0.63, 0.85, pal.leaf, 0x57402e, night);
      lantern(ctx, w * 0.84, h * 0.6, 0.85, night);
    } else if (id === 'temple') {
      house(ctx, cx, base, s * 1.1, 0xe8ddc4, 0x3a3d44, night, 3);
      // pagoda silhouette
      ctx.fillStyle = dim(0x3e3630, night);
      for (let i = 0; i < 4; i++) {
        const pw = 74 - i * 12;
        roof(ctx, w * 0.18, h * 0.44 + i * 18, pw, 10, dim(0x3a3d44, night));
      }
      ctx.fillStyle = dim(0x5a5148, night);
      ctx.fillRect(w * 0.18 - 18, h * 0.44, 36, 70);
      torii(ctx, w * 0.72, h * 0.54, 0.85, night);
      tree(ctx, w * 0.35, h * 0.62, 1.1, 0xf0b7c9, 0x57402e, night);
      tree(ctx, w * 0.62, h * 0.62, 1.0, 0xf0b7c9, 0x57402e, night);
      lantern(ctx, w * 0.42, h * 0.58, 0.9, night);
      lantern(ctx, w * 0.58, h * 0.58, 0.9, night);
    } else if (id === 'bamboo') {
      for (let i = 0; i < 9; i++) {
        bamboo(ctx, w * (0.08 + i * 0.105), h * (0.52 + (i % 3) * 0.05), clamp(this.scale / 22, 0.8, 1.4), night, this.time);
      }
      torii(ctx, cx + w * 0.06, h * 0.58, 0.9, night);
      ctx.fillStyle = rgba([120, 40, 50], 0.25 + pal.night * 0.4);
      ctx.beginPath();
      ctx.ellipse(cx + w * 0.06, h * 0.6, 48, 26, 0, 0, TAU);
      ctx.fill();
    } else if (id === 'cherry') {
      for (let i = 0; i < 4; i++) {
        tree(ctx, w * (0.18 + i * 0.22), h * (0.56 + (i % 2) * 0.02), 1.15, 0xf2b8c8, 0x5b4230, night);
      }
      ctx.fillStyle = dim(0xb98b64, night);
      ctx.beginPath();
      ctx.ellipse(w * 0.62, h * 0.68, 46, 16, 0, 0, TAU);
      ctx.fill();
      ctx.fillStyle = dim(0x8d6a4a, night);
      ctx.fillRect(w * 0.5, h * 0.62, 5, 30);
      ctx.fillRect(w * 0.74, h * 0.62, 5, 30);
      lantern(ctx, w * 0.3, h * 0.62, 0.8, night);
    } else if (id === 'waterfall') {
      ctx.fillStyle = dim(0x6c6a61, night);
      ctx.beginPath();
      ctx.moveTo(w * 0.18, h * 0.45);
      ctx.lineTo(w * 0.4, h * 0.34);
      ctx.lineTo(w * 0.52, h * 0.46);
      ctx.lineTo(w * 0.44, h * 0.64);
      ctx.lineTo(w * 0.16, h * 0.6);
      ctx.closePath();
      ctx.fill();
      const fall = ctx.createLinearGradient(0, h * 0.4, 0, h * 0.66);
      fall.addColorStop(0, 'rgba(220,238,240,.9)');
      fall.addColorStop(1, 'rgba(150,200,208,.25)');
      ctx.fillStyle = fall;
      ctx.fillRect(w * 0.29, h * 0.42, w * 0.07, h * 0.22);
      ctx.fillStyle = rgba([126, 174, 184], 0.55);
      ctx.beginPath();
      ctx.ellipse(w * 0.42, h * 0.67, w * 0.16, h * 0.035, 0, 0, TAU);
      ctx.fill();
      rock(ctx, w * 0.18, h * 0.68, 22, 0x8d8a7d, night);
      rock(ctx, w * 0.66, h * 0.67, 18, 0x77766c, night);
      tree(ctx, w * 0.72, h * 0.62, 1.0, pal.leaf, 0x57402e, night);
      lantern(ctx, w * 0.55, h * 0.62, 0.8, night);
    } else if (id === 'mine') {
      ctx.fillStyle = dim(0x5a5148, night);
      ctx.beginPath();
      ctx.moveTo(w * 0.2, h * 0.62);
      ctx.lineTo(w * 0.3, h * 0.38);
      ctx.lineTo(w * 0.62, h * 0.35);
      ctx.lineTo(w * 0.8, h * 0.62);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = dim(0x14100d, night);
      ctx.beginPath();
      ctx.ellipse(w * 0.47, h * 0.55, 34, 30, 0, Math.PI, TAU);
      ctx.fill();
      for (let i = 0; i < 6; i++) {
        const c = dim(i % 2 ? 0x74a8a0 : 0x8d8a7d, night);
        ctx.fillStyle = c;
        ctx.beginPath();
        ctx.moveTo(w * (0.34 + i * 0.06), h * 0.7);
        ctx.lineTo(w * (0.35 + i * 0.06), h * 0.63);
        ctx.lineTo(w * (0.37 + i * 0.06), h * 0.7);
        ctx.closePath();
        ctx.fill();
      }
      rock(ctx, w * 0.22, h * 0.7, 26, 0x77766c, night);
      rock(ctx, w * 0.76, h * 0.69, 22, 0x6a6960, night);
      tree(ctx, w * 0.83, h * 0.63, 0.9, 0x5f7a4c, 0x57402e, night);
      lantern(ctx, w * 0.3, h * 0.64, 0.8, night);
    } else if (id === 'shrine') {
      house(ctx, cx, base - 2, s * 0.62, 0xe8ddc4, 0x3a3d44, night, 1);
      torii(ctx, cx, h * 0.57, 0.95, night);
      // fox statues
      for (const fx of [-1, 1]) {
        const x = cx + fx * 40;
        ctx.fillStyle = dim(0x9a9484, night);
        ctx.fillRect(x - 6, h * 0.6, 12, 20);
        ctx.beginPath();
        ctx.arc(x, h * 0.6 - 6, 8, 0, TAU);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x - 7, h * 0.6 - 12);
        ctx.lineTo(x - 3, h * 0.6 - 20);
        ctx.lineTo(x, h * 0.6 - 12);
        ctx.moveTo(x + 7, h * 0.6 - 12);
        ctx.lineTo(x + 3, h * 0.6 - 20);
        ctx.lineTo(x, h * 0.6 - 12);
        ctx.fill();
        ctx.fillStyle = dim(0xa9362a, night);
        ctx.fillRect(x - 5, h * 0.6 + 1, 10, 4);
      }
      lantern(ctx, cx - 70, h * 0.63, 0.9, night);
      lantern(ctx, cx + 70, h * 0.63, 0.9, night);
      tree(ctx, w * 0.22, h * 0.63, 1.0, pal.accent, 0x57402e, night);
      tree(ctx, w * 0.8, h * 0.63, 1.0, pal.accent, 0x57402e, night);
    } else if (id === 'quarry') {
      // terraces
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = dim(i % 2 ? 0x8f8e85 : 0x7c7b73, night);
        ctx.fillRect(w * 0.24 + i * w * 0.035, h * (0.44 + i * 0.055), w * 0.46, h * 0.045);
      }
      for (let i = 0; i < 7; i++) {
        rock(ctx, w * (0.25 + i * 0.08), h * (0.68 + (i % 2) * 0.02), 14 + (i % 3) * 6, i % 2 ? 0x93928a : 0x77766c, night);
      }
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = dim(i % 2 ? 0xdfe7ea : 0x82c7a3, night);
        ctx.beginPath();
        ctx.moveTo(w * (0.4 + i * 0.04), h * 0.64);
        ctx.lineTo(w * (0.405 + i * 0.04), h * 0.57);
        ctx.lineTo(w * (0.42 + i * 0.04), h * 0.64);
        ctx.closePath();
        ctx.fill();
      }
      tree(ctx, w * 0.18, h * 0.64, 0.85, 0x5f7a4c, 0x57402e, night);
      tree(ctx, w * 0.85, h * 0.64, 0.8, 0x5f7a4c, 0x57402e, night);
      lantern(ctx, w * 0.33, h * 0.64, 0.8, night);
    } else if (id === 'kiln') {
      // three beehive kilns
      for (let i = 0; i < 3; i++) {
        const kx = cx + (i - 1) * w * 0.16;
        const ky = h * (0.58 + (i % 2) * 0.015);
        ctx.fillStyle = dim(i === 1 ? 0x6f4b38 : 0x9a6a4a, night);
        ctx.beginPath();
        ctx.ellipse(kx, ky, 36, 48, 0, 0, TAU);
        ctx.fill();
        ctx.fillStyle = dim(i === 1 ? 0x5b3c2d : 0x805640, night);
        ctx.beginPath();
        ctx.ellipse(kx, ky + 12, 38, 16, 0, 0, TAU);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,151,82,.55)';
        ctx.beginPath();
        ctx.ellipse(kx, ky + 26, 8, 11, 0, 0, TAU);
        ctx.fill();
        // smoke
        ctx.fillStyle = `rgba(220,220,210,${0.08 + pal.dayF * 0.06})`;
        for (let s = 0; s < 3; s++) {
          ctx.beginPath();
          ctx.ellipse(kx + Math.sin(this.time * 0.6 + i + s) * 10, ky - 52 - s * 15, 9 + s * 3, 5 + s * 2, 0, 0, TAU);
          ctx.fill();
        }
      }
      // drying shed
      house(ctx, w * 0.72, h * 0.55, s * 0.55, 0xded2b6, 0x4a3a32, night, 1);
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = dim(i % 2 ? 0xd8cdb6 : 0x3a1418, night);
        ctx.beginPath();
        ctx.ellipse(w * (0.16 + i * 0.035), h * 0.68, 9, 13, 0, 0, TAU);
        ctx.fill();
      }
      for (let i = 0; i < 3; i++) tree(ctx, w * (0.1 + i * 0.4), h * 0.6, 0.8, pal.accent, 0x57402e, night);
      lantern(ctx, w * 0.28, h * 0.63, 0.8, night);
      lantern(ctx, w * 0.8, h * 0.64, 0.8, night);
    } else if (id === 'ridge') {
      // snow-dusted pines
      for (const [tx, ty, sc] of [[0.14, 0.58, 0.95], [0.24, 0.6, 0.75], [0.84, 0.57, 0.9], [0.74, 0.61, 0.7]]) {
        tree(ctx, w * tx, h * ty, sc, 0xa8bfba, 0x4a382c, night);
      }
      // snowy outcrops
      for (let i = 0; i < 5; i++) {
        rock(ctx, w * (0.12 + i * 0.19), h * (0.66 + (i % 2) * 0.015), 22 + (i % 3) * 7, i % 2 ? 0x7a8588 : 0xd6e0e1, night);
      }
      torii(ctx, cx, h * 0.57, 0.85, night);
      // Low stone signal fire, matching the pass's 3D beacon.
      ctx.fillStyle = dim(0x525b5d, night);
      ctx.beginPath();
      ctx.ellipse(cx, h * 0.615, 24, 9, 0, 0, TAU);
      ctx.fill();
      ctx.fillRect(cx - 19, h * 0.575, 38, 22);
      ctx.fillStyle = dim(0x899496, night);
      ctx.fillRect(cx - 22, h * 0.568, 44, 7);
      ctx.fillStyle = dim(0x343b3c, night);
      ctx.beginPath();
      ctx.ellipse(cx, h * 0.575, 12, 4, 0, 0, TAU);
      ctx.fill();
      const lit = !!this.state.flags?.ridgeBeacon;
      if (lit) {
        const glow = ctx.createRadialGradient(cx, h * 0.555, 2, cx, h * 0.555, 46);
        glow.addColorStop(0, 'rgba(255,175,90,.9)');
        glow.addColorStop(1, 'rgba(255,120,40,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, h * 0.555, 46, 0, TAU);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,196,100,.95)';
        ctx.beginPath();
        ctx.moveTo(cx, h * 0.505);
        ctx.quadraticCurveTo(cx + 10, h * 0.545, cx, h * 0.57);
        ctx.quadraticCurveTo(cx - 10, h * 0.545, cx, h * 0.505);
        ctx.fill();
      }
      // prayer flags
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = dim([0xd8d2c0, 0xb33a2b, 0x3f6d8a, 0xc9a45c][i % 4], night);
        ctx.fillRect(w * (0.3 + i * 0.065), h * (0.49 + Math.sin(i) * 0.008), 9, 13);
      }
      for (let i = 0; i < 2; i++) tree(ctx, w * (0.16 + i * 0.68), h * 0.61, 0.9, 0x536b58, 0x57402e, night);
      lantern(ctx, w * 0.4, h * 0.6, 0.8, night);
      lantern(ctx, w * 0.6, h * 0.6, 0.8, night);
    }
  }

  paintSpots(ctx, pal) {
    const ordered = [...this.interactions].sort((a, b) => b.pos.z - a.pos.z);
    for (const spot of ordered) {
      const p = this.toScreen(spot.pos.x, spot.pos.z);
      const near = spot === this.nearby;
      const bob = Math.sin(this.time * 2 + spot.pos.x) * 3;
      const r = near ? 19 : 16;
      // ground shadow
      ctx.fillStyle = 'rgba(0,0,0,.22)';
      ctx.beginPath();
      ctx.ellipse(p.x, p.y + 6, r * 0.8, r * 0.28, 0, 0, TAU);
      ctx.fill();
      // ring
      ctx.strokeStyle = near ? 'rgba(233,205,148,.95)' : 'rgba(216,195,147,.55)';
      ctx.lineWidth = near ? 2.4 : 1.4;
      ctx.beginPath();
      ctx.arc(p.x, p.y + bob, r, 0, TAU);
      ctx.stroke();
      // disc
      const g = ctx.createRadialGradient(p.x, p.y - 4 + bob, 2, p.x, p.y + bob, r);
      g.addColorStop(0, 'rgba(38,32,24,.95)');
      g.addColorStop(1, 'rgba(16,13,10,.9)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y + bob, r, 0, TAU);
      ctx.fill();
      ctx.fillStyle = near ? '#f4e6c8' : '#d8c393';
      ctx.font = `600 ${near ? 16 : 14}px "Shippori Mincho", serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(spot.kanji, p.x, p.y + bob + 1);
      if (near) {
        const label = spot.label.length > 30 ? spot.label.slice(0, 29) + '…' : spot.label;
        ctx.font = '11px "Cormorant Garamond", Georgia, serif';
        const tw = ctx.measureText(label).width;
        ctx.fillStyle = 'rgba(16,13,10,.72)';
        ctx.fillRect(p.x - tw / 2 - 6, p.y + bob + r + 4, tw + 12, 17);
        ctx.fillStyle = near ? '#f1e2c4' : '#c8b99f';
        ctx.fillText(label, p.x, p.y + bob + r + 13);
      }
    }
  }

  paintPlayer(ctx, pal) {
    const p = this.toScreen(this.player.position.x, this.player.position.z);
    const moving = this.keys.w || this.keys.a || this.keys.s || this.keys.d || this.clickTarget;
    const bob = moving ? Math.abs(Math.sin(this.walkTime)) * 3 : Math.sin(this.time * 1.4) * 0.8;
    const s = clamp(this.scale / 12, 0.9, 1.5);
    ctx.save();
    ctx.translate(p.x, p.y + bob);
    ctx.scale(this.facing, 1);
    // shadow
    ctx.fillStyle = 'rgba(0,0,0,.28)';
    ctx.beginPath();
    ctx.ellipse(0, 4, 14 * s, 5 * s, 0, 0, TAU);
    ctx.fill();
    // legs
    ctx.fillStyle = '#25252a';
    const stride = moving ? Math.sin(this.walkTime) * 3 : 0;
    ctx.fillRect(-6 * s, -18 * s, 4 * s, 18 * s + stride);
    ctx.fillRect(2 * s, -18 * s, 4 * s, 18 * s - stride);
    // robe
    const g = ctx.createLinearGradient(0, -46 * s, 0, -12 * s);
    g.addColorStop(0, '#354a64');
    g.addColorStop(1, '#243448');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(-11 * s, -14 * s);
    ctx.lineTo(-8 * s, -42 * s);
    ctx.quadraticCurveTo(0, -48 * s, 8 * s, -42 * s);
    ctx.lineTo(11 * s, -14 * s);
    ctx.closePath();
    ctx.fill();
    // belt
    ctx.fillStyle = '#a9362a';
    ctx.fillRect(-9 * s, -26 * s, 18 * s, 4 * s);
    // shoulders / arms
    ctx.strokeStyle = '#2d4058';
    ctx.lineWidth = 4 * s;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-8 * s, -38 * s);
    ctx.lineTo(-12 * s, -24 * s + stride);
    ctx.moveTo(8 * s, -38 * s);
    ctx.lineTo(12 * s, -24 * s - stride);
    ctx.stroke();
    // head
    ctx.fillStyle = '#e3b78e';
    ctx.beginPath();
    ctx.arc(0, -50 * s, 6.5 * s, 0, TAU);
    ctx.fill();
    // kasa hat
    ctx.fillStyle = '#c8a972';
    ctx.beginPath();
    ctx.ellipse(0, -54 * s, 14 * s, 5 * s, 0, 0, TAU);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-6 * s, -54 * s);
    ctx.lineTo(0, -62 * s);
    ctx.lineTo(6 * s, -54 * s);
    ctx.closePath();
    ctx.fill();
    // katana
    ctx.strokeStyle = '#17130f';
    ctx.lineWidth = 2.2 * s;
    ctx.beginPath();
    ctx.moveTo(-9 * s, -30 * s);
    ctx.lineTo(-15 * s, -16 * s);
    ctx.stroke();
    ctx.restore();
  }

  paintMotes(ctx, w, h, pal) {
    for (const m of this.motes) {
      const t = this.time * (0.04 + m.s * 0.02);
      const x = ((m.x + t * (0.35 + m.s * 0.2)) % 1.1 - 0.05) * w + Math.sin(this.time + m.p) * 8;
      const y = ((m.y + t * 0.6) % 1.05 - 0.02) * h;
      if (pal.night > 0.35) {
        const a = (0.35 + 0.45 * Math.sin(this.time * 2 + m.p)) * pal.night;
        ctx.fillStyle = `rgba(255,224,140,${Math.max(0, a)})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.4 + m.s, 0, TAU);
        ctx.fill();
      } else {
        ctx.fillStyle = rgba(pal.accent, 0.55);
        ctx.beginPath();
        ctx.ellipse(x, y, 2.4 * m.s, 1.2 * m.s, this.time + m.p, 0, TAU);
        ctx.fill();
      }
    }
  }

  paintWeather(ctx, w, h, pal, hour) {
    const weather = WEATHERS[this.state.weather]?.id || this.state.weather;
    const snow = this.seasonId === 'winter' || weather === 'snow';
    const rain = weather === 'rain' || weather === 'storm';
    if (!rain && !snow) return;
    if (rain) {
      ctx.strokeStyle = 'rgba(196,216,228,.35)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 90; i++) {
        const x = ((i * 73 + this.time * 160) % (w + 80)) - 40;
        const y = (i * 61 + this.time * 420) % h;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 5, y + 16);
        ctx.stroke();
      }
    }
    if (snow) {
      ctx.fillStyle = 'rgba(248,252,255,.8)';
      for (let i = 0; i < 80; i++) {
        const x = ((i * 83 + Math.sin(this.time + i) * 20) % (w + 40)) - 20;
        const y = (i * 47 + this.time * 28) % h;
        ctx.beginPath();
        ctx.arc(x, y, 1.2 + (i % 3) * 0.7, 0, TAU);
        ctx.fill();
      }
    }
  }
}
