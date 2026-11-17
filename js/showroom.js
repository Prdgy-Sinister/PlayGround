/* ============================================================
   Canvas 2.5D isometric showroom renderer
   ------------------------------------------------------------
   Procedural display fixtures + collectible models, with drag
   to orbit, wheel to zoom and click-to-inspect hit testing.
   ============================================================ */
import { getState, showroomContents, RELIC_RARITY } from './store.js';
import { THEME_MAP, CUSTOM_OPTIONS, ROOM_MAP } from './data/showroom.js';

const TAU = Math.PI * 2;
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const color = (v, fallback) => v || fallback;

function hexToRgba(hex, a = 1) {
  const h = String(hex || '#888').replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h.padEnd(6, '0').slice(0, 6);
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

export function initShowroom(canvas, { roomId = 'main', onInspect = null } = {}) {
  if (!canvas) return {destroy(){}, redraw(){}, room(){}};
  const ctx = canvas.getContext('2d');
  const cam = {yaw: -0.62, zoom: 1, panX: 0, panY: 0, tilt: .54};
  const hitboxes = [];
  let raf = 0, activeRoom = roomId, drag = null, hovered = null;
  let dpr = 1, width = 800, height = 480;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(2, window.devicePixelRatio || 1);
    width = Math.max(320, rect.width);
    height = Math.max(280, rect.height);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function palette() {
    const s = getState();
    const c = s.showroom.custom;
    const theme = THEME_MAP[c.theme] || THEME_MAP.carbon;
    const floorOpt = CUSTOM_OPTIONS.floor.find(o => o.id === c.floor);
    const lightOpt = CUSTOM_OPTIONS.lighting.find(o => o.id === c.lighting);
    return {
      floor: color(floorOpt?.color, theme.floor),
      wall: theme.wall,
      accent: color(c.teamColor, theme.accent),
      light: color(lightOpt?.color, theme.light),
      theme,
      custom: c,
    };
  }

  function project(x, y, z = 0) {
    const cos = Math.cos(cam.yaw), sin = Math.sin(cam.yaw);
    const rx = x * cos - y * sin;
    const ry = x * sin + y * cos;
    const scale = Math.min(width / 11, height / 7) * cam.zoom;
    return {
      x: width / 2 + (rx - ry) * scale * .9 + cam.panX,
      y: height * .62 + (rx + ry) * scale * cam.tilt * .52 - z * scale * .62 + cam.panY,
      scale,
    };
  }

  function slotPosition(slot, total, layout) {
    if (layout === 'gallery') {
      const cols = Math.min(3, Math.max(2, Math.ceil(Math.sqrt(total))));
      const col = slot % cols, row = Math.floor(slot / cols);
      return {x: (col - (cols - 1) / 2) * 2.5, y: -1.6 + row * 2.2};
    }
    if (layout === 'paddock') {
      const ang = -Math.PI / 2 + slot / Math.max(1, total) * TAU;
      return {x: Math.cos(ang) * 3.1, y: Math.sin(ang) * 2.2};
    }
    return {x: (slot - (total - 1) / 2) * 1.9, y: -1.7};
  }

  function pathPolygon(points, fill, stroke) {
    ctx.beginPath();
    points.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
    ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke(); }
  }

  function drawRoom(p) {
    const room = ROOM_MAP[activeRoom] || ROOM_MAP.main;
    const hw = 4.6, hd = 3.4;
    const corners = [project(-hw,-hd), project(hw,-hd), project(hw,hd), project(-hw,hd)];
    // floor
    const grad = ctx.createLinearGradient(corners[0].x, corners[0].y, corners[2].x, corners[2].y);
    grad.addColorStop(0, hexToRgba(p.floor, .92));
    grad.addColorStop(1, hexToRgba(p.wall, .96));
    pathPolygon(corners, grad, hexToRgba(p.accent, .28));
    // floor grid
    ctx.strokeStyle = hexToRgba(p.accent, .09);
    ctx.lineWidth = 1;
    for (let x = -hw; x <= hw; x += .8) {
      const a = project(x, -hd), b = project(x, hd);
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    for (let y = -hd; y <= hd; y += .8) {
      const a = project(-hw, y), b = project(hw, y);
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    // back walls
    const wallH = 2.7;
    const backA = project(-hw, -hd, wallH), backB = project(hw, -hd, wallH);
    pathPolygon([corners[0], corners[1], backB, backA], hexToRgba(p.wall, .96), hexToRgba(p.accent, .22));
    const sideA = project(-hw, hd, wallH);
    pathPolygon([corners[3], corners[0], backA, sideA], hexToRgba(p.wall, .82), hexToRgba(p.accent, .16));
    // ceiling light strips
    for (let i = -1; i <= 1; i++) {
      const a = project(i * 2.4 - .4, -1.1, wallH - .12);
      const b = project(i * 2.4 + .4, -1.1, wallH - .12);
      ctx.strokeStyle = hexToRgba(p.light, .75);
      ctx.lineWidth = 3;
      ctx.shadowColor = p.light; ctx.shadowBlur = 16;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      ctx.shadowBlur = 0;
    }
    // banners
    const banner = CUSTOM_OPTIONS.banners.find(o => o.id === p.custom.banners);
    if (banner && banner.id !== 'none') {
      const a = project(-1.6, -hd + .03, wallH - .7);
      const b = project(1.6, -hd + .03, wallH - .7);
      ctx.fillStyle = hexToRgba(banner.color, .72);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
      ctx.lineTo(b.x, b.y + Math.abs(b.x - a.x) * .16);
      ctx.lineTo(a.x, a.y + Math.abs(b.x - a.x) * .16);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.8)';
      ctx.font = `700 ${Math.max(9, Math.abs(b.x - a.x) * .075)}px system-ui`;
      ctx.textAlign = 'center';
      ctx.fillText(banner.name.toUpperCase(), (a.x + b.x) / 2, (a.y + b.y) / 2);
    }
    // room title plate
    ctx.fillStyle = hexToRgba(p.accent, .9);
    ctx.font = '700 12px system-ui';
    ctx.textAlign = 'left';
    ctx.fillText(room.name.toUpperCase(), 14, 22);
    ctx.fillStyle = 'rgba(255,255,255,.45)';
    ctx.font = '10px system-ui';
    ctx.fillText('DRAG TO ORBIT · SCROLL TO ZOOM · CLICK AN OBJECT TO INSPECT', 14, 38);
  }

  function drawFixture(display, p, pos) {
    const base = project(pos.x, pos.y);
    const s = base.scale;
    const w = display.type === 'full-car' ? 86 : display.type === 'full-bike' ? 60 : 46;
    const h = display.type.includes('wall') || ['photo-wall','wheel-wall'].includes(display.type) ? 70 : 26;
    ctx.save();
    ctx.translate(base.x, base.y);
    ctx.fillStyle = 'rgba(0,0,0,.35)';
    ctx.beginPath(); ctx.ellipse(0, 4, w * .72, 10, 0, 0, TAU); ctx.fill();
    const g = ctx.createLinearGradient(0, -h, 0, 4);
    g.addColorStop(0, hexToRgba(p.light, .28));
    g.addColorStop(1, hexToRgba(p.custom.floor, .95));
    ctx.fillStyle = g;
    ctx.strokeStyle = hexToRgba(p.accent, .55);
    ctx.lineWidth = 1.4;
    if (display.type.includes('case') || display.type === 'trophy-cab' || display.type === 'glass') {
      ctx.fillRect(-w/2, -h, w, h);
      ctx.strokeRect(-w/2, -h, w, h);
      ctx.fillStyle = hexToRgba(p.light, .08);
      ctx.fillRect(-w/2, -h, w * .35, h);
      ctx.strokeStyle = 'rgba(255,255,255,.18)';
      ctx.beginPath(); ctx.moveTo(-w/2 + 4, -h + 4); ctx.lineTo(-w/2 + 4, -4); ctx.stroke();
    } else if (['photo-wall','wheel-wall'].includes(display.type)) {
      ctx.fillRect(-w/2, -h - 18, w, 8);
      ctx.strokeRect(-w/2, -h - 18, w, 8);
      ctx.fillStyle = hexToRgba(p.accent, .25);
      ctx.fillRect(-w/2 + 6, -h - 10, 3, 10);
      ctx.fillRect(w/2 - 9, -h - 10, 3, 10);
    } else {
      ctx.beginPath();
      ctx.moveTo(-w/2, 2); ctx.lineTo(w/2, 2); ctx.lineTo(w/2 - 6, -h); ctx.lineTo(-w/2 + 6, -h);
      ctx.closePath(); ctx.fill(); ctx.stroke();
    }
    ctx.restore();
  }

  function drawObject(item, p, x, y, z, scale = 1) {
    const meta = item.meta;
    if (!meta) return;
    const c1 = meta.colors?.[0] || p.accent;
    const c2 = meta.colors?.[1] || '#15181d';
    const rar = RELIC_RARITY[meta.rarity] || {color:p.accent, glow:hexToRgba(p.accent,.4)};
    const glow = item.kind === 'relic' ? rar.glow : hexToRgba(p.accent, .45);
    const base = project(x, y, z);
    const sc = base.scale * scale;
    const lift = ['photo-wall','wheel-wall'].includes(item.displayType) ? 78 : 32;
    ctx.save();
    ctx.translate(base.x, base.y - lift);
    ctx.scale(sc / 80, sc / 80);
    if (meta.rarity === 'museum' || meta.rarity === 'iconic') {
      const pulse = .45 + Math.sin(Date.now() / 420) * .18;
      ctx.shadowColor = glow; ctx.shadowBlur = 24 * pulse;
    }
    drawProceduralModel(meta.model || (item.kind === 'card' ? 'card' : 'trophy'), c1, c2, rar.color, meta.signed, meta.signedBy);
    ctx.restore();
    hitboxes.push({x: base.x, y: base.y - lift, r: Math.max(22, 26 * scale), entry:item});
    if (hovered === item) {
      ctx.strokeStyle = hexToRgba(p.accent, .9);
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(base.x, base.y - lift, 30 * scale, 0, TAU); ctx.stroke();
    }
  }

  function drawProceduralModel(model, c1, c2, accent, signed, signedBy = '') {
    const g = ctx.createLinearGradient(-30, -40, 30, 40);
    g.addColorStop(0, c1); g.addColorStop(.55, c2); g.addColorStop(1, c1);
    ctx.lineWidth = 1.3;
    ctx.strokeStyle = 'rgba(255,255,255,.35)';
    const rounded = (x,y,w,h,r) => {
      ctx.beginPath();
      ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r);
      ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
    };
    if (model === 'helmet') {
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(0, -4, 30, Math.PI, 0); ctx.lineTo(30, 12); ctx.quadraticCurveTo(18, 26, 0, 26); ctx.quadraticCurveTo(-18,26,-30,12); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = 'rgba(8,10,14,.86)';
      rounded(-25,-8,50,15,7); ctx.fill();
      ctx.fillStyle = accent; ctx.fillRect(-3,-33,6,28);
      ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.beginPath(); ctx.ellipse(-10,-22,8,14,-.4,0,TAU); ctx.fill();
    } else if (model === 'trophy') {
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(-22,-28); ctx.lineTo(22,-28); ctx.lineTo(16,4); ctx.quadraticCurveTo(0,14,-16,4); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = c1; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(-25,-18,8,Math.PI/2,Math.PI*1.5); ctx.stroke();
      ctx.beginPath(); ctx.arc(25,-18,8,-Math.PI/2,Math.PI/2); ctx.stroke();
      ctx.fillStyle = c2; ctx.fillRect(-9,8,18,14); ctx.fillRect(-18,21,36,6);
      ctx.fillStyle = accent; ctx.fillRect(-12,11,24,3);
    } else if (model === 'suit') {
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(-12,-28); ctx.lineTo(12,-28); ctx.lineTo(20,-14); ctx.lineTo(14,4); ctx.lineTo(9,30); ctx.lineTo(-9,30); ctx.lineTo(-14,4); ctx.lineTo(-20,-14); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = accent; ctx.fillRect(-12,-24,24,6); ctx.fillRect(-3,-24,6,54);
      ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(-18,-10,5,12); ctx.fillRect(13,-10,5,12);
    } else if (model === 'mini-car') {
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(-32,6); ctx.lineTo(-22,-10); ctx.lineTo(8,-14); ctx.lineTo(24,-4); ctx.lineTo(32,6); ctx.lineTo(24,12); ctx.lineTo(-26,12); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = accent; ctx.fillRect(-12,-12,16,5);
      ctx.fillStyle = '#0b0d10'; [-20,20].forEach(x => { ctx.beginPath(); ctx.arc(x,12,7,0,TAU); ctx.fill(); ctx.stroke(); });
    } else if (model === 'mini-bike') {
      ctx.strokeStyle = c1; ctx.lineWidth = 5;
      [-20,20].forEach(x => { ctx.beginPath(); ctx.arc(x,10,10,0,TAU); ctx.stroke(); });
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(-20,10); ctx.lineTo(-8,-8); ctx.lineTo(10,-10); ctx.lineTo(20,10); ctx.lineTo(6,4); ctx.lineTo(-10,4); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = accent; ctx.fillRect(-8,-8,16,4);
    } else if (model === 'wheel') {
      ctx.fillStyle = g; rounded(-26,-18,52,34,8); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = accent; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(-18,-10); ctx.lineTo(0,4); ctx.lineTo(18,-10); ctx.stroke();
      ctx.fillStyle = c2; ctx.beginPath(); ctx.arc(0,4,7,0,TAU); ctx.fill();
      ctx.fillStyle = accent; for (let i=-2;i<=2;i++) ctx.fillRect(i*8-2,-24,4,7);
    } else if (model === 'photo' || model === 'paper' || model === 'flag' || model === 'card') {
      ctx.fillStyle = c2; ctx.fillRect(-26,-32,52,64);
      ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.strokeRect(-26,-32,52,64);
      const pg = ctx.createLinearGradient(-22,-28,22,28); pg.addColorStop(0,c1); pg.addColorStop(1,'#101319');
      ctx.fillStyle = pg; ctx.fillRect(-21,-27,42,54);
      ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(-16,-20,26,3); ctx.fillRect(-16,-12,18,2);
      if (model === 'card') { ctx.fillStyle = accent; ctx.beginPath(); ctx.moveTo(0,-22); ctx.lineTo(6,-8); ctx.lineTo(21,-6); ctx.lineTo(10,4); ctx.lineTo(13,19); ctx.lineTo(0,11); ctx.lineTo(-13,19); ctx.lineTo(-10,4); ctx.lineTo(-21,-6); ctx.lineTo(-6,-8); ctx.closePath(); ctx.fill(); }
      if (model === 'flag') { ctx.fillStyle = accent; ctx.beginPath(); ctx.moveTo(-20,-24); ctx.lineTo(20,-20); ctx.lineTo(-20,-12); ctx.closePath(); ctx.fill(); }
    } else if (model === 'tyre' || model === 'disc') {
      ctx.fillStyle = '#0d0f12'; ctx.beginPath(); ctx.ellipse(0,0,30,26,0,0,TAU); ctx.fill();
      ctx.strokeStyle = c1; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(0,0,25,21,0,0,TAU); ctx.stroke();
      ctx.fillStyle = accent; ctx.beginPath(); ctx.ellipse(0,0,10,8,0,0,TAU); ctx.fill();
      if (model === 'disc') { ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 1; for(let i=0;i<8;i++){ const a=i/8*TAU; ctx.beginPath(); ctx.moveTo(Math.cos(a)*11,Math.sin(a)*9); ctx.lineTo(Math.cos(a)*23,Math.sin(a)*19); ctx.stroke(); } }
    } else if (model === 'engine' || model === 'gear' || model === 'exhaust') {
      ctx.fillStyle = g; rounded(-28,-22,56,44,6); ctx.fill(); ctx.stroke();
      ctx.fillStyle = accent; for (let i=-2;i<=2;i++) ctx.fillRect(i*9-3,-18,6,36);
      ctx.strokeStyle = c2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-28,-4); ctx.lineTo(28,-4); ctx.stroke();
    } else if (model === 'figure') {
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0,-24,10,0,TAU); ctx.fill();
      rounded(-12,-14,24,32,6); ctx.fill(); ctx.stroke();
      ctx.fillStyle = accent; ctx.fillRect(-12,-8,24,4);
      ctx.fillStyle = c2; ctx.fillRect(-9,18,7,12); ctx.fillRect(2,18,7,12);
    } else if (model === 'wing' || model === 'fairing') {
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-34,-12); ctx.quadraticCurveTo(0,-24,34,-12); ctx.lineTo(28,2); ctx.quadraticCurveTo(0,-6,-28,2); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = accent; ctx.fillRect(-30,-12,60,4);
    } else if (model === 'glove' || model === 'boot' || model === 'gear') {
      ctx.fillStyle = g; rounded(-18,-20,36,40,10); ctx.fill(); ctx.stroke();
      ctx.fillStyle = accent; ctx.fillRect(-18,-6,36,5);
      ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.beginPath(); ctx.arc(-8,-12,7,0,TAU); ctx.fill();
    } else if (model === 'garage' || model === 'circuit' || model === 'set') {
      ctx.fillStyle = g; rounded(-32,-18,64,36,4); ctx.fill(); ctx.stroke();
      ctx.fillStyle = accent;
      if (model === 'circuit') { ctx.beginPath(); ctx.ellipse(0,0,24,12,0,0,TAU); ctx.strokeStyle = accent; ctx.lineWidth = 4; ctx.stroke(); }
      else { ctx.fillRect(-26,-12,20,20); ctx.fillRect(6,-12,20,20); }
    } else {
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(0,-30); ctx.lineTo(26,-8); ctx.lineTo(16,26); ctx.lineTo(-16,26); ctx.lineTo(-26,-8); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = accent; ctx.beginPath(); ctx.moveTo(0,-20); ctx.lineTo(12,-6); ctx.lineTo(0,14); ctx.lineTo(-12,-6); ctx.closePath(); ctx.fill();
    }
    if (signed) {
      if (signedBy) {
        const names = String(signedBy).split(/\s*&\s*/);
        ctx.save();
        ctx.font = 'italic 11px "Great Vibes", cursive';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(255,246,223,.92)';
        ctx.shadowColor = accent; ctx.shadowBlur = 6;
        names.forEach((n, i) => ctx.fillText(n.trim(), 0, 28 + i * 11));
        ctx.restore();
      } else {
        ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(-16,24); ctx.quadraticCurveTo(-6,14,0,22); ctx.quadraticCurveTo(8,30,17,20); ctx.stroke();
      }
    }
  }

  function draw() {
    raf = requestAnimationFrame(draw);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    hitboxes.length = 0;
    const p = palette();
    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, hexToRgba(p.wall, 1));
    bg.addColorStop(1, '#050608');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, width, height);
    drawRoom(p);
    const room = ROOM_MAP[activeRoom] || ROOM_MAP.main;
    const contents = showroomContents(activeRoom);
    for (const group of contents) {
      const pos = slotPosition(group.display.slot, room.slots, p.custom.layout);
      drawFixture(group.display, p, pos);
      group.items.forEach((item, i) => {
        const offset = group.items.length > 1 ? (i - (group.items.length - 1) / 2) * .34 : 0;
        drawObject({...item, displayType:group.display.type}, p, pos.x + offset, pos.y, .55, group.display.type === 'full-car' ? 1.45 : 1);
      });
    }
  }

  function pointerPos(ev) {
    const rect = canvas.getBoundingClientRect();
    return {x: ev.clientX - rect.left, y: ev.clientY - rect.top};
  }
  function onPointerDown(ev) {
    drag = {...pointerPos(ev), yaw:cam.yaw, panX:cam.panX, panY:cam.panY, moved:false};
    canvas.setPointerCapture?.(ev.pointerId);
  }
  function onPointerMove(ev) {
    const pos = pointerPos(ev);
    if (drag) {
      const dx = pos.x - drag.x, dy = pos.y - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
      if (ev.shiftKey) { cam.panX = drag.panX + dx; cam.panY = drag.panY + dy; }
      else { cam.yaw = drag.yaw + dx * .006; cam.tilt = clamp(cam.tilt - dy * .0015, .3, .8); }
      return;
    }
    let found = null;
    for (const h of hitboxes) {
      if (Math.hypot(pos.x - h.x, pos.y - h.y) <= h.r) { found = h.entry; break; }
    }
    hovered = found;
    canvas.style.cursor = found ? 'pointer' : 'grab';
  }
  function onPointerUp(ev) {
    if (!drag) return;
    const moved = drag.moved;
    drag = null;
    if (moved) return;
    const pos = pointerPos(ev);
    const hit = hitboxes.find(h => Math.hypot(pos.x - h.x, pos.y - h.y) <= h.r);
    if (hit && onInspect) onInspect(hit.entry);
  }
  function onWheel(ev) {
    ev.preventDefault();
    cam.zoom = clamp(cam.zoom * (ev.deltaY > 0 ? .92 : 1.08), .5, 2.4);
  }
  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointerleave', () => { drag = null; hovered = null; });
  canvas.addEventListener('wheel', onWheel, {passive:false});
  window.addEventListener('resize', resize);
  resize(); draw();

  return {
    destroy() {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', resize);
    },
    redraw() { draw(); },
    room(next) { activeRoom = next || activeRoom; },
    resetCamera() { cam.yaw = -.62; cam.zoom = 1; cam.panX = 0; cam.panY = 0; cam.tilt = .54; },
  };
}
