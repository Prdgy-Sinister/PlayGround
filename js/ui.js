/* ============================================================
   APEX RUSH — shared UI: cards, packs, modals, toasts, FX
   ============================================================ */
import { CARD_MAP, RARITY, cardValue } from './data/index.js';
import { FINISHES } from './data/core.js';
import { formatNumber } from './data/packs.js';
import { cardArt, flagSVG, rgba } from './art.js';
import { sfx } from './audio.js';

export const fmt = formatNumber;
export const FINISH_ORDER = ['base', 'holo', 'gold', 'championship', 'anniversary', 'signature', 'shadow', 'numbered'];

export function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
export function finishName(finish) { return FINISHES[finish]?.name || 'Standard'; }
export function finishShort(finish) { return FINISHES[finish]?.short || 'BASE'; }
export function serialMax(card) { return card.rarity === 'iconic' ? 25 : card.rarity === 'legendary' ? 50 : 99; }
export function serialText(serial, card) {
  if (serial == null) return '';
  return `#${String(serial).padStart(String(serialMax(card)).length, '0')}/${serialMax(card)}`;
}
export function sportClass(sport) { return sport === 'motogp' ? 'motogp' : sport === 'crossover' ? 'crossover' : 'f1'; }
export function sportShort(sport) { return sport === 'motogp' ? 'MotoGP' : sport === 'crossover' ? 'Crossover' : 'Formula 1'; }

export function coinHTML(n) { return `<span class="cur-inline coin">◈ ${fmt(n)}</span>`; }
export function gemHTML(n) { return `<span class="cur-inline gem">◆ ${fmt(n)}</span>`; }
export function rewardHTML(reward = {}) {
  const bits = [];
  if (reward.coins) bits.push(`<span class="cur-inline coin">◈ ${fmt(reward.coins)}</span>`);
  if (reward.gems) bits.push(`<span class="cur-inline gem">◆ ${fmt(reward.gems)}</span>`);
  if (reward.pack) bits.push(`<span class="cur-inline pack">▣ ${packName(reward.pack)}</span>`);
  return bits.join('');
}
export function packName(id) {
  if (id === 'potd') return 'Pack of the Day';
  return { standard: 'Grid Pack', 'f1-standard': 'F1 Booster', 'motogp-standard': 'MotoGP Booster', premium: 'Premium Pack', 'f1-premium': 'F1 Premium', 'motogp-premium': 'MotoGP Premium', gold: 'Gold Pack', 'f1-gold': 'F1 Gold', 'motogp-gold': 'MotoGP Gold', legendary: 'Legendary Pack', championship: 'Championship Pack', limited: 'Limited Edition', iconic: 'Iconic Vault', crossover: 'Crossover Pack', daily: 'Daily Pack' }[id] || id;
}

export function rarityLabel(card) { return RARITY[card.rarity]?.label || 'COMMON'; }

/* ------------------------------------------------------------
   CARD
   ------------------------------------------------------------ */
export function cardHTML(card, opts = {}) {
  if (!card) return '';
  const finish = opts.finish || 'base';
  const serial = opts.serial ?? null;
  const label = card.attrLabels || ['Speed', 'Skill', 'Consistency', 'Racecraft'];
  const values = [card.stats.speed, card.stats.skill, card.stats.consistency, card.stats.racecraft];
  const hotIdx = values.indexOf(Math.max(...values));
  const longName = card.name.length > 15 ? ' long' : '';
  const numberText = card.number != null && card.number !== '' ? `#${card.number}` : card.type === 'moment' ? String(card.year || '') : card.team || '';
  const kicker2 = card.type === 'moment' ? 'ICONIC MOMENT' : card.era;
  const signature = finish === 'signature' && card.signature ? `<div class="card-signature">${esc(card.signature)}</div>` : '';
  const serialHTML = finish === 'numbered' && serial != null ? `<div class="card-serial">${esc(serialText(serial, card))}</div>` : '';
  const championship = finish === 'championship' ? `<div class="champ-ribbon">CHAMPION</div>` : '';
  const countBadge = opts.count > 1 ? `<div class="count-badge">×${opts.count}</div>` : '';
  const newBadge = opts.isNew ? `<div class="new-badge">NEW</div>` : '';
  const locked = opts.locked ? ' unknown' : '';
  return `<div class="card-cell${opts.count > 1 ? ' dupe' : ''}${opts.cellClass ? ' ' + opts.cellClass : ''}" ${opts.cardIdAttr === false ? '' : `data-open-card="${esc(card.id)}"`} ${opts.itemUid ? `data-item="${esc(opts.itemUid)}"` : ''}>
    ${newBadge}${countBadge}
    <div class="card r-${card.rarity} finish-${finish}${locked}${opts.cardClass ? ' ' + opts.cardClass : ''}" data-card="${esc(card.id)}" title="${esc(card.name)} · ${esc(finishName(finish))}">
      <div class="card-art">${cardArt(card, finish)}</div>
      <div class="card-scrim"></div>
      <div class="card-grain"></div>
      <div class="card-foil"></div>
      <div class="card-shine"></div>
      <div class="card-frame"></div>
      ${serialHTML}${championship}${signature}
      <div class="card-top">
        <div class="ovr"><b>${card.overall}</b><i>OVR</i></div>
        <div class="card-tags">
          <span class="card-tag sport-${card.sport}">${card.sport === 'motogp' ? 'MOTOGP' : card.sport === 'crossover' ? 'CROSSOVER' : 'FORMULA 1'}</span>
          <span class="card-tag era">${esc(card.era)}</span>
        </div>
      </div>
      <div class="card-info">
        <div class="card-kicker"><span class="num">${esc(numberText)}</span><span class="dotsep"></span><span>${esc(kicker2)}</span></div>
        <div class="card-name${longName}">${esc(card.name)}</div>
        <div class="card-role"><span class="flag">${flagSVG(card.country)}</span>${esc(card.typeLabel)} · ${esc(card.country)}</div>
        <div class="card-statline">
          ${values.map((v, i) => `<div class="card-stat${i === hotIdx ? ' hot' : ''}"><i>${esc(label[i])}</i><b>${v}</b></div>`).join('')}
        </div>
        <div class="card-foot">
          <span class="nat">${esc(card.team || card.tagline || '')}</span>
          <span class="entry">${esc(finishShort(finish))}</span>
        </div>
      </div>
    </div>
  </div>`;
}

export function miniCardHTML(card, finish = 'base') {
  return `<div class="mini-card">${cardArt(card, finish)}</div>`;
}

export function slotHTML(card) {
  return `<div class="card-slot" title="Not in your vault">
    <span class="rarity-dot rar-${card.rarity}"></span>
    <span class="qs">?</span>
    <span class="nm">${esc(card.name)}</span>
    <span class="rar">${esc(rarityLabel(card))}</span>
  </div>`;
}

export function cardCellForGroup(group, mode = 'vault') {
  const bestItem = group.items.find(i => i.finish === group.best) || group.items[0];
  return cardHTML(group.card, { finish: group.best, serial: bestItem?.serial, count: group.count, itemUid: bestItem?.uid, isNew: false, locked: mode === 'all' && !group.count });
}

/* ------------------------------------------------------------
   PACK ART
   ------------------------------------------------------------ */
export function packHTML(pack, opts = {}) {
  const a = pack.art || {};
  const style = `--p1:${a.p1 || '#ff2f38'};--p2:${a.p2 || '#3a070b'};--p3:${a.p3 || 'rgba(255,80,80,.6)'}`;
  return `<div class="pack ${a.cls || 'pack-f1'}" style="${style}" role="img" aria-label="${esc(pack.name)} pack">
    <div class="pack-crimp top"></div>
    <div class="pack-crimp bottom"></div>
    <div class="pack-geo"></div>
    <div class="pack-inner">
      <div class="pack-brand"><span>APEX RUSH</span><i class="pr"></i><span>${esc(pack.short || 'GP')}</span></div>
      <div class="pack-sport">${esc(a.kicker || 'MOTORSPORT')}</div>
      <div class="pack-title"><small>COLLECTOR SERIES</small>${esc(a.title || 'APEX')}<br>${esc(a.title2 || 'PACK')}</div>
      <div class="pack-bottom">
        <div class="pack-meta"><b>${esc(a.meta || `${pack.cards} CARDS`)}</b>${esc(a.meta2 || 'PREMIUM PULLS')}</div>
        <div class="pack-emblem">${esc(a.emblem || 'GP')}</div>
      </div>
    </div>
    <div class="pack-shine"></div>
  </div>`;
}

export function packPriceHTML(pack, tokens = 0) {
  if (tokens > 0) return `<span class="token-price">▣ TOKEN<span class="token-count">×${tokens}</span></span>`;
  if (pack.cost === 0) return `<span class="free-price">FREE</span>`;
  const cur = pack.currency === 'gems' ? 'g' : 'c';
  return `<span class="price-${cur}"><span class="c">${pack.currency === 'gems' ? '◆' : '◈'}</span> ${fmt(pack.cost)}</span>`;
}

export function oddsRows(pack) {
  const rows = ['iconic', 'legendary', 'epic', 'rare', 'common'];
  return rows.filter(r => (pack.odds?.[r] || 0) > 0).map(r => {
    const val = pack.odds[r];
    const rar = RARITY[r];
    return `<div class="odds-row" style="--rarity:${rar.color}">
      <span class="lbl"><i class="rarity-dot rar-${r}"></i>${rar.label}</span>
      <span class="progress-track"><i style="width:${Math.min(100, val * 2.5)}%;background:${rar.color}"></i></span>
      <b>${val < 1 ? val.toFixed(1) : Math.round(val)}%</b>
    </div>`;
  }).join('');
}

export function guaranteeList(pack) {
  const bits = [];
  if (pack.guaranteeNew) bits.push(`${pack.guaranteeNew} new card${pack.guaranteeNew > 1 ? 's' : ''} guaranteed`);
  for (const [rar, n] of Object.entries(pack.guarantees || {})) bits.push(`${n}× ${RARITY[rar]?.label || rar} or better`);
  if (pack.guaranteedFinish) bits.push(`1 ${FINISHES[pack.guaranteedFinish]?.name || pack.guaranteedFinish} guaranteed`);
  if (pack.oncePerDay) bits.push('Once per day');
  if (!bits.length) bits.push('At least one new card');
  return bits;
}

/* ------------------------------------------------------------
   TOASTS
   ------------------------------------------------------------ */
const toastRoot = () => document.getElementById('toast-root');
export function toast(kind, title, message = '', icon = '●') {
  const root = toastRoot();
  if (!root) return;
  const el = document.createElement('div');
  el.className = `toast ${kind || ''}`;
  el.innerHTML = `<div class="t-ico">${esc(icon)}</div><div class="t-body"><b>${esc(title)}</b>${message ? `<span>${esc(message)}</span>` : ''}</div>`;
  root.appendChild(el);
  while (root.children.length > 4) root.firstElementChild.remove();
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 320); }, 3400);
}

/* ------------------------------------------------------------
   MODALS
   ------------------------------------------------------------ */
let modalEl = null;
let modalCloseHandler = null;
export function openModal(html, opts = {}) {
  closeModal();
  const root = document.getElementById('modal-root');
  if (!root) return null;
  const wrap = document.createElement('div');
  wrap.className = 'modal-backdrop';
  wrap.innerHTML = `<div class="modal${opts.small ? ' small' : ''}${opts.wide ? ' wide' : ''}">
    ${opts.noClose ? '' : `<button class="modal-close" data-close-modal aria-label="Close">✕</button>`}
    ${html}
  </div>`;
  root.appendChild(wrap);
  modalEl = wrap;
  modalCloseHandler = opts.onClose || null;
  wrap.addEventListener('click', ev => {
    if (ev.target === wrap && !opts.persistent) closeModal();
  });
  if (opts.onMount) opts.onMount(wrap);
  return wrap;
}
export function closeModal() {
  if (!modalEl) return;
  const el = modalEl;
  const fn = modalCloseHandler;
  modalEl = null;
  modalCloseHandler = null;
  el.remove();
  if (fn) fn();
}
export function closeTopModal() { closeModal(); }
export function hasModal() { return !!modalEl; }
export function confirmAction({ title, body = '', confirmText = 'Confirm', cancelText = 'Cancel', danger = false, onConfirm }) {
  const wrap = openModal(`<div class="confirm-modal">
    <div class="cm-kicker">${danger ? 'PLEASE CONFIRM' : 'CONFIRM ACTION'}</div>
    <h3>${esc(title)}</h3>
    <p class="cm-sub">${body}</p>
    <div class="confirm-actions">
      <button class="btn" data-close-modal>${esc(cancelText)}</button>
      <button class="btn ${danger ? 'btn-primary' : 'btn-gold'}" data-confirm-yes>${esc(confirmText)}</button>
    </div>
  </div>`, { small: true });
  if (!wrap) return;
  wrap.querySelector('[data-confirm-yes]').addEventListener('click', () => {
    closeModal();
    try { onConfirm && onConfirm(); } catch (err) { console.error(err); toast('red', 'Something went wrong', err.message, '!'); }
  });
}

/* ------------------------------------------------------------
   CARD DETAIL
   ------------------------------------------------------------ */
export function openCardDetail(card, items, opts = {}) {
  if (!card) return;
  const selected = (opts.itemUid && items.find(i => i.uid === opts.itemUid)) || items[0] || null;
  const finish = selected?.finish || opts.finish || 'base';
  const serial = selected?.serial;
  const value = cardValue(card, finish);
  const best = items.length ? [...items].sort((a, b) => FINISH_ORDER.indexOf(b.finish) - FINISH_ORDER.indexOf(a.finish))[0] : null;
  const fav = opts.favorite;
  const attrs = card.attrLabels || ['Speed', 'Skill', 'Consistency', 'Racecraft'];
  const stats = [card.stats.speed, card.stats.skill, card.stats.consistency, card.stats.racecraft];
  const finishNote = finish !== 'base' ? `<div class="finish-note"><span class="fn-ico">✦</span><div><b>${esc(finishName(finish))}${serial != null ? ' · ' + esc(serialText(serial, card)) : ''}</b>Premium finish. Collector value ${fmt(value)} coins and a permanent place in your vault.</div></div>` : '';
  const sellTarget = items.length > 1
    ? [...items].sort((a, b) => FINISH_ORDER.indexOf(a.finish) - FINISH_ORDER.indexOf(b.finish))[0]
    : selected;
  const sellValue = sellTarget ? cardValue(card, sellTarget.finish) : value;
  const ownedLine = items.length
    ? `<div class="dc-owned"><span>In your vault</span><b>${items.length} ${items.length === 1 ? 'copy' : 'copies'}${best && best.finish !== 'base' ? ' · ' + esc(finishName(best.finish)) : ''}</b></div>`
    : `<div class="dc-owned"><span>Not collected yet</span><b>Find it in packs</b></div>`;
  const actions = items.length
    ? `${fav ? `<button class="btn btn-sm" data-fav="${esc(card.id)}">★ Favourite</button>` : `<button class="btn btn-sm" data-fav="${esc(card.id)}">☆ Set favourite</button>`}
       <button class="btn btn-sm btn-gold" data-sell-one="${esc(sellTarget.uid)}" data-card-id="${esc(card.id)}">Sell ${items.length > 1 ? 'spare' : 'copy'} · ◈ ${fmt(sellValue)}</button>
       ${items.length > 1 ? `<button class="btn btn-sm" data-sell-dupes-card="${esc(card.id)}">Sell duplicates</button>` : ''}
       <div class="price-tag">Collector value<b>◈ ${fmt(cardValue(card, best?.finish || finish))}</b></div>`
    : `<button class="btn btn-sm btn-primary" data-nav="packs">Open packs</button>
       <div class="price-tag">Market value<b>◈ ${fmt(cardValue(card, 'base'))}</b></div>`;

  openModal(`<div class="detail-grid">
    <div class="detail-card-col">
      ${cardHTML(card, { finish, serial, itemUid: selected?.uid, cardIdAttr: false })}
      ${ownedLine}
    </div>
    <div class="detail-info">
      <div class="di-kicker">
        <span class="chip ${sportClass(card.sport)}">${esc(sportShort(card.sport))}</span>
        <span class="chip" style="color:${RARITY[card.rarity].color};border-color:${rgba(RARITY[card.rarity].color, .3)}">${esc(rarityLabel(card))}</span>
        <span class="chip">${esc(card.era)}</span>
        <span class="chip">${esc(card.typeLabel)}</span>
      </div>
      <h2>${esc(card.name)}</h2>
      <div class="di-sub"><span class="flag">${flagSVG(card.country)}</span>${esc(card.team || card.typeLabel)} · ${esc(card.tagline || '')}</div>
      <p class="di-bio">${esc(card.bio)}</p>
      ${finishNote}
      <div class="attr-list">
        ${attrs.map((a, i) => `<div class="attr"><span class="an">${esc(a)}</span><span class="progress-track"><i style="width:${stats[i]}%"></i></span><span class="av">${stats[i]}</span></div>`).join('')}
      </div>
      <div class="career-grid">
        ${card.career.map(([label, val]) => `<div class="career-box"><div class="cb-l">${esc(label)}</div><div class="cb-v">${esc(val ?? '—')}${label === 'Rating' || label === 'Legacy' ? '<small> OVR</small>' : ''}</div></div>`).join('')}
      </div>
      <div class="detail-tags">
        <span class="chip gold">${esc(card.type === 'moment' ? 'Historic moment' : card.team || 'Motorsport')}</span>
        <span class="chip">${esc(card.years || card.year || '')}</span>
        <span class="chip">${esc(card.country)}</span>
        <span class="chip">${esc(finishName(finish))}</span>
      </div>
      <div class="detail-actions">${actions}</div>
    </div>
  </div>`, { wide: true, onMount: el => {
    el.querySelectorAll('[data-nav]').forEach(btn => btn.addEventListener('click', () => closeModal()));
  } });
}

/* ------------------------------------------------------------
   FX CANVAS
   ------------------------------------------------------------ */
let fxCanvas = null;
let fxCtx = null;
let particles = [];
let fxRaf = 0;
export function initFx() {
  fxCanvas = document.getElementById('fx');
  if (!fxCanvas) return;
  fxCtx = fxCanvas.getContext('2d');
  resizeFx();
  window.addEventListener('resize', resizeFx);
  document.addEventListener('pointermove', ev => {
    const card = ev.target.closest?.('.card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    if (!r.width || !r.height) return;
    card.style.setProperty('--mx', `${((ev.clientX - r.left) / r.width * 100).toFixed(1)}%`);
    card.style.setProperty('--my', `${((ev.clientY - r.top) / r.height * 100).toFixed(1)}%`);
  }, {passive: true});
}
function resizeFx() {
  if (!fxCanvas) return;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  fxCanvas.width = Math.floor(innerWidth * dpr);
  fxCanvas.height = Math.floor(innerHeight * dpr);
  fxCanvas.style.width = innerWidth + 'px';
  fxCanvas.style.height = innerHeight + 'px';
  if (fxCtx) fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
export function burst(color = '#ffc247', amount = 80, power = 1) {
  if (!fxCtx) return;
  const cx = innerWidth / 2, cy = innerHeight * 0.46;
  const palette = color === 'iconic'
    ? ['#ff66d8', '#ffe27a', '#65ffc8', '#5ad0ff', '#b17dff']
    : color === 'legendary'
      ? ['#ffc247', '#ffe8a8', '#ff9b30', '#ffffff']
      : [color, '#ffffff', '#ffd166'];
  for (let i = 0; i < amount; i++) {
    const ang = Math.random() * Math.PI * 2;
    const sp = (2.5 + Math.random() * 8) * power;
    particles.push({
      x: cx, y: cy,
      vx: Math.cos(ang) * sp,
      vy: Math.sin(ang) * sp - 2,
      size: 2 + Math.random() * 5,
      life: 1,
      decay: .008 + Math.random() * .012,
      color: palette[Math.floor(Math.random() * palette.length)],
      rot: Math.random() * 6,
      vr: (Math.random() - .5) * .3,
      shape: Math.random() > .55 ? 'line' : 'rect',
    });
  }
  if (!fxRaf) fxRaf = requestAnimationFrame(drawFx);
}
function drawFx() {
  if (!fxCtx) return;
  fxCtx.clearRect(0, 0, innerWidth, innerHeight);
  particles = particles.filter(p => p.life > 0);
  for (const p of particles) {
    p.x += p.vx; p.y += p.vy;
    p.vy += .13; p.vx *= .994; p.vy *= .994;
    p.life -= p.decay;
    p.rot += p.vr;
    fxCtx.save();
    fxCtx.globalAlpha = Math.max(0, p.life);
    fxCtx.fillStyle = p.color;
    fxCtx.translate(p.x, p.y);
    fxCtx.rotate(p.rot);
    if (p.shape === 'line') fxCtx.fillRect(-p.size * 2, -1, p.size * 4, 2);
    else fxCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    fxCtx.restore();
  }
  if (particles.length) fxRaf = requestAnimationFrame(drawFx);
  else { fxRaf = 0; fxCtx.clearRect(0, 0, innerWidth, innerHeight); }
}

/* ------------------------------------------------------------
   MISC UI
   ------------------------------------------------------------ */
export function levelRingHTML(level, pct) {
  return `<div class="level-ring" style="--p:${pct}"><b>${level}</b></div>`;
}
export function statBox(label, value, foot = '', cls = '', spark = '') {
  return `<div class="stat-box ${cls}"><div class="lbl">${esc(label)}</div><div class="val">${value}</div>${foot ? `<div class="foot">${foot}</div>` : ''}${spark}</div>`;
}
export function emptyState(icon, title, text, action = '') {
  return `<div class="empty-state"><div class="big">${icon}</div><h4>${esc(title)}</h4><p>${text}</p>${action}</div>`;
}
export function highlightCard(card, finish = 'base') {
  return card ? cardHTML(card, { finish }) : '';
}
export function bestFinishFor(cardId, items) {
  const list = items.filter(i => i.cardId === cardId);
  if (!list.length) return 'base';
  return [...list].sort((a, b) => FINISH_ORDER.indexOf(b.finish) - FINISH_ORDER.indexOf(a.finish))[0].finish;
}
export function itemFinishHTML(finish) {
  return `<span class="finish-chip finish-${finish}">${esc(finishShort(finish))}</span>`;
}
export function rareBurst(rarity) {
  if (rarity === 'iconic') burst('iconic', 180, 1.6);
  else if (rarity === 'legendary') burst('legendary', 120, 1.25);
  else if (rarity === 'epic') burst('#b25cff', 55, .9);
}
export { sfx };
