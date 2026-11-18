/* MUSIC EMPIRE — interface */
import {
  GENRES, genreById, fmtMoney, fmtMoneyFull, fmtNum, fmtPct, weekLabel, monthName,
  avatarSVG, logoSVG, LOGO_SHAPES, BRAND_COLORS, TIERS, tierForRep, VENUES, venueById,
  EQUIPMENT, FACILITIES, facilityById, DISTRIBUTION, distById, CAMPAIGNS, campaignById,
  BUDGETS, FOCUS, RELEASE_TYPES, ROLES, roleById, TRAITS, traitById, genreMomentumLabel,
  clamp, pick, sum,
} from './data.js';
import * as G from './game.js';

/* --------------------------------- helpers --------------------------------- */
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = (n) => fmtMoney(n);
const num = (n) => fmtNum(n);
const pct = (n) => `${Math.round(n)}%`;
const deltaHTML = (n, suffix = '') => {
  if (!n || Math.abs(n) < 0.5) return `<span class="dim">${suffix} flat</span>`;
  return `<span class="${n > 0 ? 'green' : 'red'}">${n > 0 ? '▲' : '▼'} ${num(Math.abs(n))}${suffix}</span>`;
};

const ICONS = {
  home: '<path d="M3 10.5L12 3l9 7.5V21H3z"/><path d="M9 21v-7h6v7"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  disc: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/><path d="M12 3a9 9 0 0 1 9 9"/>',
  chart: '<path d="M3 20V10"/><path d="M9 20V4"/><path d="M15 20v-6"/><path d="M21 20V8"/>',
  megaphone: '<path d="M3 11l14-6v14L3 13z"/><path d="M7 13v4a2 2 0 0 0 4 0v-2"/><path d="M17 8a4 4 0 0 1 0 8"/>',
  bus: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M3 10h18"/><circle cx="8" cy="19" r="1.5"/><circle cx="16" cy="19" r="1.5"/><path d="M7 21h2M15 21h2"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/>',
  wallet: '<path d="M3 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 9h18"/><path d="M16 14h2"/>',
  building: '<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16"/><path d="M15 9h4a2 2 0 0 1 2 2v10"/><path d="M2 21h20"/><path d="M8 7h3M8 11h3M8 15h3"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  sliders: '<path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h10M18 18h2"/><circle cx="16" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="16" cy="18" r="2"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  wave: '<path d="M2 12c2-6 4 6 6 0s4 6 6 0 4 6 6 0 2 0 2 0"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  mic: '<rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 17v4M8 21h8"/>',
  film: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',
  book: '<path d="M4 4h7a3 3 0 0 1 3 3v14a3 3 0 0 0-3-3H4z"/><path d="M20 4h-3a3 3 0 0 0-3 3v14a3 3 0 0 1 3-3h3z"/>',
  scale: '<path d="M12 3v18M5 6h14M7 6l-4 8h8zM17 6l-4 8h8z"/><path d="M8 21h8"/>',
  tag: '<path d="M20 12l-8 8-9-9V3h8z"/><circle cx="7.5" cy="7.5" r="1.4"/>',
  star: '<path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7z"/>',
  trophy: '<path d="M8 3h8v5a4 4 0 0 1-8 0z"/><path d="M8 5H4v2a4 4 0 0 0 4 4M16 5h4v2a4 4 0 0 1-4 4"/><path d="M12 12v5M8 21h8M10 17h4"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  alert: '<path d="M12 3l9 17H3z"/><path d="M12 9v5M12 17.5v.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
  'arrow-up-right': '<path d="M7 17L17 7M8 7h9v9"/>',
  cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v6M18 9v6"/>',
  heart: '<path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.4 8.8-8.4a5.5 5.5 0 0 0 0-7.8z"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/>',
  radio: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M7.5 7.5a6.4 6.4 0 0 0 0 9M16.5 7.5a6.4 6.4 0 0 1 0 9"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z"/>',
  pin: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  check: '<path d="M4 12.5l5 5L20 6.5"/>',
  'check-circle': '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.8 2.8L16.5 9"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V10a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  music: '<circle cx="7" cy="18" r="3"/><circle cx="18" cy="16" r="3"/><path d="M10 18V6l11-2v12"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  'trend-up': '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  'trend-down': '<path d="M3 7l6 6 4-4 8 8"/><path d="M15 17h6v-6"/>',
  trash: '<path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M6 7l1 13h10l1-13"/><path d="M10 11v5M14 11v5"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.3 6.3"/><path d="M20 5v6h-6"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  play: '<path d="M7 4l13 8-13 8z"/>',
  headphones: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="2" y="14" width="4" height="7" rx="1.5"/><rect x="18" y="14" width="4" height="7" rx="1.5"/>',
  crown: '<path d="M3 8l4 3 5-7 5 7 4-3v9H3z"/><path d="M3 20h18"/>',
  fire: '<path d="M12 22c4 0 7-3 7-7 0-5-5-7-4-13-3 2-5 6-4 10-2-1-3-3-3-5-2 3-3 6-3 8 0 4 3 7 7 7z"/>',
  dots: '<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
  'arrow-left': '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
};
export function icon(name, size = 18) {
  const body = ICONS[name] || ICONS.music;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

const NAV = [
  { group: 'Label', items: [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'roster', label: 'Roster', icon: 'users' },
    { id: 'studio', label: 'Studio', icon: 'disc' },
    { id: 'charts', label: 'Charts', icon: 'chart' },
  ] },
  { group: 'Business', items: [
    { id: 'marketing', label: 'Marketing', icon: 'megaphone' },
    { id: 'tours', label: 'Touring', icon: 'bus' },
    { id: 'industry', label: 'Industry', icon: 'globe' },
    { id: 'finance', label: 'Finance', icon: 'wallet' },
    { id: 'company', label: 'Company', icon: 'building' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar' },
  ] },
];
const SCREEN_INFO = {
  dashboard: { title: 'Dashboard', sub: 'The state of your label, this week.' },
  roster: { title: 'Roster & talent', sub: 'Sign artists, manage contracts and build careers.' },
  studio: { title: 'Studio & production', sub: 'Record, schedule releases and upgrade your sound.' },
  charts: { title: 'Charts & streaming', sub: 'Global rankings, streams and audience growth.' },
  marketing: { title: 'Marketing', sub: 'Campaigns that turn records into moments.' },
  tours: { title: 'Live & touring', sub: 'Turn fans into revenue, city by city.' },
  industry: { title: 'Industry', sub: 'Rivals, distribution and the wider business.' },
  finance: { title: 'Finance', sub: 'Cash, costs, debt and the long game.' },
  company: { title: 'Company', sub: 'Branding, facilities, team and progression.' },
  calendar: { title: 'Calendar', sub: 'Everything that lands in the next twelve weeks.' },
};

const ui = {
  screen: 'dashboard',
  modal: null,
  chartTab: 'songs',
  moreOpen: false,
  intro: { color: '#ff2e63', shape: 'vinyl', genre: 'pop' },
};
export const uiState = ui;

function setScreen(screen) {
  if (!SCREEN_INFO[screen]) return;
  ui.screen = screen;
  ui.modal = null;
  ui.moreOpen = false;
  window.scrollTo({ top: 0, behavior: 'instant' });
  render();
}
export function showToast(msg, kind = 'info', ms = 3400) {
  const root = document.getElementById('toast-root');
  if (!root) return;
  [...root.children].forEach((el) => { if (el.textContent === msg) el.remove(); });
  const el = document.createElement('div');
  el.className = `toast ${kind}`;
  el.textContent = msg;
  root.appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 240); }, ms);
}
function openModal(type, data = {}) { ui.modal = { type, data }; render(); }
function closeModal() { ui.modal = null; render(); }
function openConfirm(title, body, act, data = {}, label = 'Confirm', danger = false) {
  openModal('confirm', { title, body, act, data, label, danger });
}
function readField(name) {
  const el = document.querySelector(`#modal-root [data-field="${name}"]`);
  return el ? el.value : '';
}
function readNum(name, fallback = 0) {
  const v = Number(readField(name));
  return Number.isFinite(v) ? v : fallback;
}
function checkedDemos() {
  return Array.from(document.querySelectorAll('#modal-root input[data-demo]:checked')).map((x) => x.value);
}
function rangeOut(name, value, suffix = '') {
  const el = document.querySelector(`#modal-root [data-out="${name}"]`);
  if (el) el.textContent = `${value}${suffix}`;
}

/* -------------------------------- cards/art -------------------------------- */
function coverHTML(cover, title = '', size = '') {
  const c = cover || { hue: 330, style: 0 };
  const glyph = esc(String(title).split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase());
  return `<div class="cover ${size} s${c.style || 0}" style="--h:${c.hue || 330}"><span class="cover-glyph">${glyph}</span></div>`;
}
function brandMark(size = 42) {
  return G.getState() ? `<span class="logo-mark">${logoSVG(G.getState().label, size)}</span>` : '';
}
function avatarHTML(a, size = 46) {
  return `<span class="avatar-wrap">${avatarSVG(a.avatar, size)}</span>`;
}
function progressBar(value, max = 100, cls = '') {
  return `<div class="bar ${cls}"><i style="width:${clamp((value / max) * 100, 0, 100)}%"></i></div>`;
}
function meter(label, value, max = 100, cls = '', display = null) {
  return `<div class="meter-row"><span style="width:52px">${label}</span>${progressBar(value, max, cls)}<b>${display ?? Math.round(value)}</b></div>`;
}
function ringHTML(pctVal, label, color = 'var(--brand)') {
  return `<div class="ring" style="--p:${clamp(pctVal, 0, 100)};--ring:${color}"><span>${label}</span></div>`;
}
function sparkline(values, w = 130, h = 34, color = 'var(--brand)', fill = true) {
  if (!values || values.length < 2) values = [0, 0, 0];
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const pts = values.map((v, i) => [((i / (values.length - 1)) * w).toFixed(1), (h - ((v - min) / range) * (h - 4) - 2).toFixed(1)]);
  const line = pts.map((p) => p.join(',')).join(' ');
  const id = `sp${Math.random().toString(36).slice(2, 7)}`;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="overflow:visible">
    ${fill ? `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".28"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs><polygon points="0,${h} ${line} ${w},${h}" fill="url(#${id})"/>` : ''}
    <polyline points="${line}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>
  </svg>`;
}
function chartRow(row, i, showHeader = false) {
  if (showHeader) return `<div class="chart-row chart-row-head"><span class="chart-pos">#</span><span>MOVE</span><span>TRACK</span><span>LABEL</span><span class="chart-streams">STREAMS</span><span></span></div>`;
  const move = row.move > 0 ? `<span class="green">▲${row.move}</span>` : row.move < 0 ? `<span class="red">▼${Math.abs(row.move)}</span>` : `<span class="dim">—</span>`;
  return `<div class="chart-row ${row.isPlayer ? 'is-you' : ''}" data-act="${row.isPlayer ? 'open-track' : 'noop'}" data-id="${row.id}">
    <span class="chart-pos">${row.pos}</span>
    <span class="chart-move">${move}</span>
    <span style="display:flex;align-items:center;gap:9px;min-width:0">${coverHTML(row.cover, row.title, 'sm')}<span class="chart-track"><span class="chart-track-title">${esc(row.title)}</span><span class="chart-artist">${esc(row.artistName)}</span></span></span>
    <span class="chart-label"><i class="swatch" style="background:${row.labelColor || '#666'}"></i>${esc(row.labelName)}</span>
    <span class="chart-streams">${num(row.weekly)}</span>
    <span class="rank-peak">${row.peak ? 'pk ' + row.peak : ''}</span>
  </div>`;
}

/* --------------------------------- shell ---------------------------------- */
export function initUI() {
  document.addEventListener('click', (e) => {
    const nav = e.target.closest('[data-screen]');
    if (nav) { setScreen(nav.dataset.screen); return; }
    const actEl = e.target.closest('[data-act]');
    if (actEl) {
      const act = actEl.dataset.act;
      if (act === 'noop') return;
      e.preventDefault();
      handleAction(act, actEl);
      return;
    }
    if (e.target.classList && e.target.classList.contains('modal-backdrop') && ui.modal && ui.modal.type !== 'event' && !G.currentEvent()) { closeModal(); return; }
    if (ui.moreOpen && e.target.closest('.more-sheet-inner') === null) { ui.moreOpen = false; render(); }
  });
  document.addEventListener('input', (e) => {
    const t = e.target;
    if (t.id === 'intro-name' && !G.getState()) updateIntroLogo();
    if (t.type === 'range' && t.dataset.out) rangeOut(t.dataset.out, t.value, t.dataset.suffix || '');
    if (t.closest('#song-form')) updateSongPreview();
    if (t.closest('#tour-form')) updateTourPreview();
    if (t.id === 'release-marketing') {
      const out = document.getElementById('release-marketing-out');
      if (out) out.textContent = money(Number(t.value));
    }
  });
  document.addEventListener('change', (e) => {
    const t = e.target;
    if (t.closest('#song-form')) updateSongPreview();
    if (t.closest('#tour-form')) updateTourPreview();
    if (t.dataset.field === 'type' && t.closest('#release-form')) {
      const form = document.getElementById('release-form');
      if (form) {
        const type = t.value;
        const def = RELEASE_TYPES[type];
        const note = document.getElementById('release-type-note');
        if (note) note.textContent = `${def.name}: ${def.min === def.max ? def.min : `${def.min}–${def.max}`} song${def.max > 1 ? 's' : ''}.`;
      }
    }
    if (t.dataset.field === 'artist' && t.closest('#release-form')) {
      ui.modal = { type: 'release', data: { id: t.value } };
      renderModal();
      return;
    }
    if (t.id === 'brand-name-input' || t.id === 'brand-initials-input' || t.id === 'brand-tagline-input') {
      // brand preview listeners are bound separately
    }
    if (t.dataset.demo) {
      const row = t.closest('.check-row');
      if (row) row.classList.toggle('selected', t.checked);
      const count = document.querySelectorAll('#modal-root input[data-demo]:checked').length;
      const el = document.getElementById('release-count');
      if (el) el.textContent = String(count);
    }
    if (t.dataset.field === 'logoShape' || t.dataset.field === 'color') {
      if (ui.modal?.type === 'brand') {
        const data = { ...ui.modal.data, [t.dataset.field]: t.value };
        ui.modal = { type: 'brand', data };
        renderModal();
      }
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && ui.modal && ui.modal.type !== 'event' && !G.currentEvent()) closeModal();
  });
}

function renderShell(s) {
  const tier = G.labelTier();
  const info = SCREEN_INFO[ui.screen] || SCREEN_INFO.dashboard;
  const week = weekLabel(s.week);
  const carry = G.weeklyBurn();
  const pendingEvent = s.pendingEvents.length;
  const navItem = (item) => {
    const badges = {
      roster: s.roster.filter((a) => a.contract && a.contract.weeksLeft <= 8).length,
      studio: s.demos.length,
      charts: s.chartSongs.filter((c) => c.isPlayer).length,
      marketing: G.activeCampaigns().length,
    };
    const b = badges[item.id];
    return `<button class="nav-item ${ui.screen === item.id ? 'active' : ''}" data-screen="${item.id}">
      ${icon(item.icon, 17)}<span>${item.label}</span>${b ? `<span class="nav-badge ${item.id === 'roster' ? '' : 'dim'}">${b}</span>` : ''}
    </button>`;
  };
  return `<div class="app-shell">
    <aside class="sidebar">
      <div class="side-brand">${brandMark(42)}<div style="min-width:0"><div class="side-brand-name">${esc(s.label.name)}</div><div class="side-brand-sub">${esc(tier.name)}</div></div></div>
      <nav class="side-nav">
        ${NAV.map((g) => `<div class="nav-group-label">${g.group}</div>${g.items.map(navItem).join('')}`).join('')}
      </nav>
      <div class="side-foot">
        <div class="side-week"><b>${week.label}</b><span>SEASON ${Math.max(1, Math.ceil(s.week / 52))}</span></div>
        <div class="side-burn"><span>Weekly costs</span><b>${money(carry)}</b></div>
        <button class="btn btn-primary btn-block btn-advance ready" data-act="advance">${icon('arrow-right', 16)} Advance week</button>
      </div>
    </aside>
    <div class="main">
      <header class="topbar">
        <div class="topbar-title"><span class="eyebrow">${info.title}</span><b>${esc(s.label.name)} · ${week.label}</b></div>
        <div class="topbar-meta">
          <span class="meta-pill hide-mobile"><i class="meta-dot" style="background:${s.label.color};box-shadow:0 0 10px ${s.label.color}"></i> ${esc(tier.name)}</span>
          <span class="meta-pill">${icon('cash', 13)} <b>${money(s.cash)}</b></span>
          <span class="meta-pill hide-mobile">${icon('star', 13)} <b>${Math.round(s.reputation)}</b> rep</span>
          <button class="btn btn-primary advance-desktop" data-act="advance">Advance ${icon('arrow-right', 14)}</button>
        </div>
      </header>
      <div class="view">${screenHTML(s)}</div>
    </div>
  </div>
  ${mobileNav(s)}`;
}
function mobileNav(s) {
  const items = [
    { id: 'dashboard', label: 'Home', icon: 'home' },
    { id: 'roster', label: 'Roster', icon: 'users' },
    { id: 'studio', label: 'Studio', icon: 'disc' },
    { id: 'charts', label: 'Charts', icon: 'chart' },
  ];
  return `<nav class="mobile-nav">
    ${items.map((i) => `<button data-screen="${i.id}" class="${ui.screen === i.id ? 'active' : ''}">${icon(i.icon)}<span>${i.label}</span></button>`).join('')}
    <button data-act="open-more" class="${!items.some((i) => i.id === ui.screen) ? 'active' : ''}">${icon('dots')}<span>More</span></button>
  </nav>`;
}

function screenHTML(s) {
  switch (ui.screen) {
    case 'dashboard': return dashboardView(s);
    case 'roster': return rosterView(s);
    case 'studio': return studioView(s);
    case 'charts': return chartsView(s);
    case 'marketing': return marketingView(s);
    case 'tours': return toursView(s);
    case 'industry': return industryView(s);
    case 'finance': return financeView(s);
    case 'company': return companyView(s);
    case 'calendar': return calendarView(s);
    default: return dashboardView(s);
  }
}

/* -------------------------------- dashboard ------------------------------- */
function dashboardView(s) {
  const tier = G.labelTier();
  const prog = G.tierProgress();
  const last = s.history[s.history.length - 1];
  const prev = s.history[s.history.length - 2];
  const prevCash = prev?.cash ?? startCash(s);
  const cashDelta = s.cash - prevCash;
  const weeklyStreams = sum(s.tracks.filter((t) => t.isPlayer), (t) => t.weekly || 0);
  const top = s.chartSongs[0];
  const playerChart = s.chartSongs.filter((c) => c.isPlayer);
  const demoCount = s.demos.length;
  const upcoming = s.releases.filter((r) => r.status === 'scheduled').sort((a, b) => a.releaseWeek - b.releaseWeek);
  const expiring = s.roster.filter((a) => a.contract && a.contract.weeksLeft <= 6);
  const cashSpark = s.history.slice(-12).map((h) => h.cash).concat([s.cash]);
  const tierColor = tier.color;
  const chartSpark = s.history.slice(-12).map((h) => h.streams || 0);
  const agenda = [];
  if (s.pendingEvents.length) agenda.push({ icon: 'alert', text: `${s.pendingEvents.length} decision${s.pendingEvents.length > 1 ? 's' : ''} waiting for you`, cta: 'Resolve', act: 'open-event' });
  if (demoCount) agenda.push({ icon: 'music', text: `${demoCount} finished song${demoCount > 1 ? 's' : ''} ready for a release plan`, cta: 'Release', screen: 'studio' });
  if (upcoming.length) agenda.push({ icon: 'calendar', text: `“${upcoming[0].title}” lands in ${Math.max(0, upcoming[0].releaseWeek - s.week)} week${upcoming[0].releaseWeek - s.week === 1 ? '' : 's'}`, cta: 'View', screen: 'studio' });
  if (expiring.length) agenda.push({ icon: 'scale', text: `${expiring[0].name}’s contract ends in ${Math.max(0, expiring[0].contract.weeksLeft)} weeks`, cta: 'Roster', screen: 'roster' });
  if (!s.roster.length) agenda.push({ icon: 'users', text: 'No artists signed. Your first signing is out there.', cta: 'Find talent', screen: 'roster' });
  if (!G.activeCampaigns().length && s.roster.length) agenda.push({ icon: 'megaphone', text: 'No campaigns running. The catalog is quiet.', cta: 'Promote', screen: 'marketing' });
  if (s.cash < G.weeklyBurn() * 4) agenda.push({ icon: 'wallet', text: 'Cash runway is short. Review the finances.', cta: 'Finance', screen: 'finance' });
  if (!agenda.length) agenda.push({ icon: 'check-circle', text: 'Everything is running. Time to make a record.', cta: 'Record', screen: 'studio' });

  return `
  <section class="hero">
    <div class="hero-copy">
      <div class="hero-top">
        <span class="pill brand">${icon('crown', 12)} ${esc(tier.name)}</span>
        <span class="pill">${weekLabel(s.week).label}</span>
        ${playerChart.length ? `<span class="pill gold">${icon('chart', 11)} ${playerChart.length} on the chart</span>` : ''}
      </div>
      <h1>${s.roster.length ? `Run the label.<br>Own the <em>sound.</em>` : `No artists. No hits.<br><em>No limits.</em>`}</h1>
      <p class="hero-sub">${s.roster.length ? `${s.roster.length} artist${s.roster.length > 1 ? 's' : ''} on the roster · ${num(G.monthlyListeners())} monthly listeners · ${G.activeCampaigns().length} live campaign${G.activeCampaigns().length === 1 ? '' : 's'}.` : 'Sign your first artist, cut a record and take on the majors. Every legend starts in a small room.'}</p>
      <div class="hero-stats">
        <div class="hero-stat"><div class="label">Cash</div><div class="val">${money(s.cash)}</div></div>
        <div class="hero-stat"><div class="label">Reputation</div><div class="val">${Math.round(s.reputation)} <small>/ 100</small></div></div>
        <div class="hero-stat"><div class="label">Roster</div><div class="val">${s.roster.length} <small>artists</small></div></div>
        <div class="hero-stat"><div class="label">Weekly streams</div><div class="val">${num(weeklyStreams)}</div></div>
      </div>
      <div class="hero-actions">
        <button class="btn btn-primary btn-lg" data-act="advance">Advance week ${icon('arrow-right', 16)}</button>
        <button class="btn" data-screen="studio">${icon('sliders', 15)} Make a record</button>
        <button class="btn btn-ghost" data-screen="roster">${icon('users', 15)} Scout talent</button>
      </div>
    </div>
    <div class="hero-art">
      <div class="vinyl">${brandMark(58)}</div>
      <div class="vinyl-shadow"></div>
      <span class="float-tag ft-1">${esc(s.label.initials)} · ${esc(genreById(s.label.genre).name)}</span>
      <span class="float-tag ft-2">${top && top.isPlayer ? '#1 THIS WEEK' : top ? `#1 · ${esc(top.labelName)}` : 'CHARTS LOADING'}</span>
    </div>
  </section>

  <div class="stat-grid">
    <div class="stat">
      <div class="stat-label">${icon('cash', 12)} Cash balance</div>
      <div class="stat-val">${money(s.cash)}</div>
      <div class="stat-foot">${cashDelta >= 0 ? '▲' : '▼'} ${money(Math.abs(cashDelta))} vs last week</div>
    </div>
    <div class="stat">
      <div class="stat-label">${icon('headphones', 12)} Monthly listeners</div>
      <div class="stat-val">${num(G.monthlyListeners())}</div>
      <div class="stat-foot">${num(weeklyStreams)} streams this week</div>
    </div>
    <div class="stat">
      <div class="stat-label">${icon('star', 12)} Reputation</div>
      <div class="stat-val">${Math.round(s.reputation)} <small>/ 100</small></div>
      <div class="stat-foot">${prog.next ? `${Math.ceil(prog.next.rep - s.reputation)} to ${esc(prog.next.name)}` : 'Maximum prestige'}</div>
    </div>
    <div class="stat">
      <div class="stat-label">${icon('wallet', 12)} Weekly burn</div>
      <div class="stat-val">${money(G.weeklyBurn())}</div>
      <div class="stat-foot">${s.cash > 0 ? `${Math.max(0, Math.floor(s.cash / Math.max(1, G.weeklyBurn())))} weeks runway` : 'Cash negative'}</div>
    </div>
  </div>

  <div class="split mt-16">
    <div class="stack">
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('bolt', 15)} This week</div><div class="card-sub">The moves that matter right now</div></div><button class="link" data-act="open-help">How to play</button></div>
        <div class="stack" style="gap:2px">
          ${agenda.slice(0, 5).map((a) => `<div class="between" style="padding:9px 0;border-bottom:1px solid rgba(255,255,255,.045)">
            <div class="row" style="min-width:0"><span class="tl-icon" style="color:var(--brand)">${icon(a.icon, 13)}</span><span class="small">${esc(a.text)}</span></div>
            ${a.act ? `<button class="btn btn-sm" data-act="${a.act}">${a.cta}</button>` : `<button class="btn btn-sm btn-ghost" data-screen="${a.screen}">${a.cta} ${icon('arrow-right', 11)}</button>`}
          </div>`).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('users', 15)} Your roster</div><div class="card-sub">${s.roster.length ? 'Artists currently on the books' : 'No artists signed yet'}</div></div><button class="link" data-screen="roster">All artists ${icon('arrow-right', 11)}</button></div>
        ${s.roster.length ? `<div class="artist-grid">${s.roster.slice(0, 4).map((a) => artistCard(a)).join('')}</div>` : `<div class="empty"><div class="empty-icon">${icon('users', 20)}</div><b>Your roster is empty</b><p>Browse free agents, scout their stats and sign your first artist to start making records.</p><button class="btn btn-primary mt-12" data-screen="roster">Find your first artist</button></div>`}
      </div>

      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('music', 15)} Catalog performance</div><div class="card-sub">Your most-streamed records this week</div></div><button class="link" data-screen="charts">Charts ${icon('arrow-right', 11)}</button></div>
        ${playerTracks(s, 4)}
      </div>
    </div>

    <div class="stack">
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('chart', 15)} Global songs</div><div class="card-sub">Top 5 · ${weekLabel(s.week).label}</div></div><button class="link" data-screen="charts">Full chart</button></div>
        ${top ? `<div class="chart-hero" style="padding:12px;margin-bottom:8px">
          <span style="font-size:26px;font-weight:900;color:var(--gold);letter-spacing:-.05em">1</span>
          ${coverHTML(top.cover, top.title, 'lg')}
          <div style="min-width:0"><h2 style="font-size:16px">${esc(top.title)}</h2><div class="small muted" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(top.artistName)} · ${esc(top.labelName)}</div><div class="tiny ${top.isPlayer ? 'green' : 'dim'}" style="margin-top:3px">${num(top.weekly)} weekly streams</div></div>
        </div>` : ''}
        <div class="chart-list compact">${s.chartSongs.slice(1, 5).map((r, i) => chartRow(r, i)).join('')}</div>
        ${!s.chartSongs.length ? `<div class="empty"><b>Charts are syncing</b><p>Advance a week to generate the first global ranking.</p></div>` : ''}
      </div>

      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('trend-up', 15)} Genre heat</div><div class="card-sub">What the market is listening to</div></div></div>
        <div class="trend-grid">
          ${trendingGenres(s, 5).map((g) => `<div class="trend-row"><span class="row" style="gap:6px"><i class="swatch" style="width:7px;height:7px;border-radius:2px;background:${g.def.color}"></i>${esc(g.def.name)}</span>${progressBar(g.mult, 1.5, 'gold')}<b class="${g.mult > 1.08 ? 'gold' : 'muted'}">${g.mult.toFixed(2)}×</b></div>`).join('')}
        </div>
        <div class="divider"></div>
        <div class="between"><span class="tiny dim">Hot right now</span><span class="pill gold">${icon('fire', 11)} ${genreById(s.trendState.hot).name}</span></div>
      </div>

      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('radio', 15)} The wire</div><div class="card-sub">Industry news and label updates</div></div></div>
        ${newsList(s, 6)}
      </div>
    </div>
  </div>`;
}
function startCash(s) { return 150000; }
function playerTracks(s, n = 4) {
  const tracks = s.tracks.filter((t) => t.isPlayer).sort((a, b) => (b.weekly || 0) - (a.weekly || 0)).slice(0, n);
  if (!tracks.length) return `<div class="empty" style="padding:18px"><b>No records yet</b><p>Record a song and schedule a release. Your catalog will show up here.</p></div>`;
  return `<div class="chart-list">
    ${tracks.map((t) => `<div class="between" style="padding:9px 0;border-bottom:1px solid rgba(255,255,255,.045)">
      <div class="row" style="min-width:0">${coverHTML(t.cover, t.title, 'sm')}<div style="min-width:0"><div class="chart-track-title">${esc(t.title)}</div><div class="chart-artist">${esc(t.artistName)} · wk ${stateWeek(s) - t.releaseWeek}</div></div></div>
      <div style="text-align:right"><div class="chart-streams">${num(t.weekly)} <span class="dim tiny">/wk</span></div><div class="tiny dim">${num(t.streamsTotal)} total</div></div>
    </div>`).join('')}
  </div>`;
}
function stateWeek(s) { return s.week; }
function trendingGenres(s, n = 5) {
  return GENRES.map((def) => ({ def, mult: s.trends[def.id] || 1 })).sort((a, b) => b.mult - a.mult).slice(0, n);
}
function newsList(s, n = 6) {
  if (!s.news.length) return `<div class="empty" style="padding:18px"><b>The wire is quiet</b></div>`;
  return `<div class="news-list">${s.news.slice(0, n).map((x) => `<div class="news-item"><span class="news-dot ${x.kind}"></span><div><div class="news-text">${esc(x.text)}</div><div class="news-week">Week ${x.week} · ${esc(x.kind)}</div></div></div>`).join('')}</div>`;
}

/* ---------------------------------- roster -------------------------------- */
function artistCard(a, opts = {}) {
  const prospect = opts.prospect;
  const status = G.artistStatus(a);
  const scouted = !prospect || a.scouted;
  const weekly = prospect ? 0 : G.artistWeekly(a.id);
  const weeks = a.contract?.weeksLeft ?? 0;
  const busy = a.busyUntil > G.getState().week;
  return `<div class="artist-card ${scouted ? '' : 'scout-locked'}" data-act="${prospect ? 'open-sign' : 'open-artist'}" data-id="${a.id}" style="cursor:pointer">
    <div class="artist-top">
      ${avatarHTML(a, 46)}
      <div style="min-width:0;flex:1">
        <div class="artist-name">${esc(a.name)}</div>
        <div class="artist-meta">${icon('music', 10)} ${esc(genreById(a.genre).name)} · ${a.age} · ${scouted ? Math.round(a.popularity) + ' pop' : 'unscouted'}</div>
        <div class="artist-meta" style="margin-top:4px"><span class="trait-chip">${esc(traitById(a.trait)?.name || 'Unknown')}</span>${busy ? `<span class="pill gold">${icon('bus', 9)} Touring</span>` : ''}</div>
      </div>
    </div>
    <div>${meter('Popularity', a.popularity, 100, '', scouted ? Math.round(a.popularity) : '??')}</div>
    <div class="artist-stats">
      <div class="mini-stat"><div class="l">Weekly streams</div><div class="v">${weekly ? num(weekly) : '—'}</div></div>
      <div class="mini-stat"><div class="l">${prospect ? 'Advance' : 'Contract'}</div><div class="v">${prospect ? money(a.advanceDemand) : `${weeks}w`}</div></div>
    </div>
    ${prospect ? `
      <div class="between"><span class="contract-chip">${scouted ? `Asks ${money(a.salary)}/wk` : `Scout report needed`}</span><span class="pill ${scouted ? 'blue' : ''}">${scouted ? `${Math.round(G.signChance(a, G.contractPackages(a)[1]) * 100)}% chance` : 'Hidden stats'}</span></div>
      <div class="artist-actions">
        ${scouted ? `<button class="btn btn-sm btn-primary" data-act="open-sign" data-id="${a.id}">Negotiate</button>` : `<button class="btn btn-sm" data-act="scout" data-id="${a.id}">${icon('search', 11)} Scout · ${money(G.scoutPrice())}</button>`}
        <button class="btn btn-sm btn-ghost" data-act="open-sign" data-id="${a.id}">View</button>
      </div>` : `
      <div class="between"><span class="contract-chip">${icon('star', 10)} ${scouted ? `${Math.round(a.skill)} skill` : ''} · morale ${Math.round(a.morale)}</span><span class="pill ${weeks <= 6 ? 'red' : ''}">${status.label}</span></div>
      <div class="artist-actions">
        <button class="btn btn-sm" data-act="open-record" data-id="${a.id}" ${busy ? 'disabled' : ''}>${icon('mic', 11)} Record</button>
        <button class="btn btn-sm btn-ghost" data-act="open-artist" data-id="${a.id}">Profile</button>
      </div>`}
  </div>`;
}

function rosterView(s) {
  const sorted = [...s.roster].sort((a, b) => b.popularity - a.popularity);
  const prospects = [...s.prospects].sort((a, b) => (b.scouted ? 1 : 0) - (a.scouted ? 1 : 0) || b.popularity - a.popularity);
  return `
  <div class="page-head">
    <div><div class="eyebrow">Artists</div><h1 class="page-title">Roster & talent</h1><div class="page-sub">${s.roster.length} signed artist${s.roster.length === 1 ? '' : 's'} · ${prospects.length} free agents on the scouting board. Every signing is a bet on a career.</div></div>
    <div class="head-actions"><button class="btn" data-act="scout-all">${icon('search', 15)} Open auditions · ${money(G.auditionPrice())}</button><button class="btn btn-ghost" data-screen="calendar">${icon('calendar', 15)} Calendar</button></div>
  </div>
  <div class="stat-grid mb-16">
    <div class="stat"><div class="stat-label">Signed artists</div><div class="stat-val">${s.roster.length}</div><div class="stat-foot">${sum(s.roster, (a) => a.contract?.salary || 0) ? `${money(sum(s.roster, (a) => a.contract?.salary || 0))}/wk salaries` : 'No salary commitments'}</div></div>
    <div class="stat"><div class="stat-label">Total fans</div><div class="stat-val">${num(sum(s.roster, (a) => a.fans || 0))}</div><div class="stat-foot">Across your roster</div></div>
    <div class="stat"><div class="stat-label">Average popularity</div><div class="stat-val">${s.roster.length ? Math.round(sum(s.roster, (a) => a.popularity) / s.roster.length) : '—'}</div><div class="stat-foot">100 = global superstar</div></div>
    <div class="stat"><div class="stat-label">Average morale</div><div class="stat-val">${s.roster.length ? Math.round(sum(s.roster, (a) => a.morale) / s.roster.length) : '—'}</div><div class="stat-foot">Keep the roster happy</div></div>
  </div>
  <div class="section-head"><div><div class="section-title">Signed roster</div><div class="small muted">Click an artist for full stats, contracts and discography.</div></div></div>
  ${sorted.length ? `<div class="artist-grid">${sorted.map((a) => artistCard(a)).join('')}</div>` : `<div class="card"><div class="empty"><div class="empty-icon">${icon('users', 22)}</div><b>No artists signed</b><p>Your label has no roster. Scout the free agents below, check their stats and negotiate a deal.</p><button class="btn btn-primary mt-12" data-act="focus-prospects">Browse talent ${icon('arrow-right', 13)}</button></div></div>`}
  <div class="section-head" id="prospects"><div><div class="section-title">Free agents & scouting</div><div class="small muted">Stats are hidden until you scout. Rivals are watching the same names.</div></div><span class="pill">${prospects.length} available</span></div>
  <div class="artist-grid">${prospects.map((a) => artistCard(a, { prospect: true })).join('') || `<div class="card"><div class="empty"><b>The market is empty</b><p>Hold open auditions to bring new talent in.</p></div></div>`}</div>
  <div class="card mt-16" style="border-style:dashed;background:transparent">
    <div class="between"><div class="row"><span class="empty-icon" style="margin:0">${icon('search', 18)}</span><div><b class="small">Run an open audition</b><div class="tiny dim">Reveals up to 4 prospects and refreshes the talent pool. Cheaper with a scout on staff.</div></div></div><button class="btn" data-act="scout-all">Hold auditions · ${money(G.auditionPrice())}</button></div>
  </div>`;
}

export { ui, openModal, closeModal, openConfirm, setScreen, readField, readNum, checkedDemos, coverHTML, icon as iconHTML };

/* ---------------------------------- studio -------------------------------- */
function releaseStreams(s, r) {
  return sum(s.tracks.filter((t) => t.releaseKey === r.id), (t) => t.weekly || 0);
}
function releaseTotalStreams(s, r) {
  return sum(s.tracks.filter((t) => t.releaseKey === r.id), (t) => t.streamsTotal || 0);
}
function studioView(s) {
  const demos = [...s.demos].sort((a, b) => b.createdWeek - a.createdWeek);
  const scheduled = s.releases.filter((r) => r.status === 'scheduled').sort((a, b) => a.releaseWeek - b.releaseWeek);
  const active = s.releases.filter((r) => r.status === 'active').sort((a, b) => (b.launchWeek || 0) - (a.launchWeek || 0));
  const engineers = s.staff.filter((x) => x.role === 'engineer').length;
  const producers = s.staff.filter((x) => x.role === 'producer').length;
  const writers = s.staff.filter((x) => x.role === 'songwriter').length;
  return `
  <div class="page-head">
    <div><div class="eyebrow">Production</div><h1 class="page-title">Studio & production</h1><div class="page-sub">Better rooms, better people, better records. Every session costs money — and every release is a shot at the charts.</div></div>
    <div class="head-actions"><button class="btn" data-act="build-studio">${icon('plus', 15)} Build studio · ${money(G.newStudioCost())}</button><button class="btn btn-primary" data-act="open-record" ${s.roster.length ? '' : 'disabled'}>${icon('mic', 15)} New session</button></div>
  </div>
  <div class="stat-grid mb-16">
    <div class="stat"><div class="stat-label">Best studio quality</div><div class="stat-val">${Math.round(Math.max(...s.studios.map((st) => G.studioQuality(st.id))))}</div><div class="stat-foot">Engineer bonus ${engineers ? 'active' : 'none'}</div></div>
    <div class="stat"><div class="stat-label">Songs in the vault</div><div class="stat-val">${demos.length}</div><div class="stat-foot">${scheduled.length} release${scheduled.length === 1 ? '' : 's'} scheduled</div></div>
    <div class="stat"><div class="stat-label">Production team</div><div class="stat-val">${producers + writers + engineers}</div><div class="stat-foot">${producers} producers · ${writers} writers · ${engineers} engineers</div></div>
    <div class="stat"><div class="stat-label">Catalog streams</div><div class="stat-val">${num(G.catalogStreams())}</div><div class="stat-foot">Lifetime across all releases</div></div>
  </div>
  <div class="grid-2 mb-16">
    ${s.studios.map((st) => {
      const q = Math.round(G.studioQuality(st.id));
      const lvl = G.studioLevelInfo(st.level);
      const cost = G.studioUpgradeCost(st);
      return `<div class="studio-card">
        <div class="between"><div class="row" style="gap:11px"><span class="empty-icon" style="margin:0;color:var(--brand)">${icon('disc', 19)}</span><div><div class="artist-name">${esc(st.name)}</div><div class="tiny dim">${esc(lvl.name)} · ${st.equipment?.length || 0} upgrade${(st.equipment?.length || 0) === 1 ? '' : 's'}</div></div></div>${ringHTML(q, q, 'var(--gold)')}</div>
        <div>
          <div class="between tiny dim mb-8"><span>Room quality</span><span>${q} / 118</span></div>
          ${progressBar(q, 118, 'gold')}
        </div>
        <div class="artist-meta">${st.equipment?.length ? st.equipment.map((id) => `<span class="trait-chip">${esc(EQUIPMENT.find((e) => e.id === id)?.name || id)}</span>`).join('') : '<span class="tiny dim">No equipment installed. The room is holding you back.</span>'}</div>
        <div class="row wrap">
          <button class="btn btn-sm btn-primary" data-act="upgrade-studio" data-id="${st.id}" ${cost ? '' : 'disabled'}>${cost ? `Upgrade · ${money(cost)}` : 'Fully upgraded'}</button>
          <button class="btn btn-sm" data-act="open-equipment" data-id="${st.id}">${icon('sliders', 11)} Equipment</button>
        </div>
      </div>`;
    }).join('')}
  </div>
  <div class="split">
    <div class="stack">
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('music', 15)} Songs in the vault</div><div class="card-sub">Finished records waiting for a release plan</div></div><span class="pill">${demos.length}</span></div>
        ${demos.length ? demos.slice(0, 10).map((d) => `<div class="demo-row">
          ${coverHTML(d.cover, d.title, 'sm')}
          <div class="grow" style="min-width:0"><div class="demo-title">${esc(d.title)}</div><div class="demo-meta"><span>${esc(d.artistName)}</span><span>${esc(genreById(d.genre).name)}</span><span>${esc(d.producerName || 'Self')}</span>${d.featureName ? `<span>feat. ${esc(d.featureName)}</span>` : ''}</div></div>
          <div style="text-align:right;flex:none"><div class="quality-chip">Q ${d.quality}</div><div class="tiny dim" style="margin-top:3px">C ${d.commercial}</div></div>
          <button class="btn btn-sm" data-act="open-release" data-id="${d.artistId}" data-demo="${d.id}">Release</button>
          <button class="icon-btn" data-act="confirm-discard" data-id="${d.id}" aria-label="Discard demo">${icon('trash', 13)}</button>
        </div>`).join('') : `<div class="empty"><div class="empty-icon">${icon('mic', 20)}</div><b>The vault is empty</b><p>Book a session with one of your artists. Songs stay here until you schedule a release.</p><button class="btn btn-primary mt-12" data-act="open-record" ${s.roster.length ? '' : 'disabled'}>Book a session</button></div>`}
      </div>
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('calendar', 15)} Release schedule</div><div class="card-sub">Scheduled and live releases</div></div><button class="btn btn-sm btn-ghost" data-screen="calendar">${icon('calendar', 12)} Calendar</button></div>
        ${scheduled.length ? `<div class="stack" style="gap:8px">${scheduled.map((r) => `<div class="between" style="padding:9px;border:1px solid var(--line);border-radius:10px">
          <div class="row" style="min-width:0">${coverHTML(r.cover, r.title, 'sm')}<div style="min-width:0"><div class="demo-title">${esc(r.title)}</div><div class="tiny dim">${esc(r.artistName)} · ${RELEASE_TYPES[r.type].name} · ${r.demoIds.length} track${r.demoIds.length > 1 ? 's' : ''}</div></div></div>
          <div class="row"><span class="pill blue">Week ${r.releaseWeek}</span><button class="icon-btn" data-act="open-release-detail" data-id="${r.id}" aria-label="Details">${icon('dots', 14)}</button></div>
        </div>`).join('')}</div>` : `<div class="tiny dim" style="padding:8px 0">Nothing scheduled. Finish a song, then plan a single, EP or album.</div>`}
        <div class="divider"></div>
        <div class="card-title" style="font-size:12px;margin-bottom:6px">Live releases</div>
        ${active.length ? active.slice(0, 6).map((r) => `<div class="between" style="padding:9px 0;border-bottom:1px solid rgba(255,255,255,.045)">
          <div class="row" style="min-width:0">${coverHTML(r.cover, r.title, 'sm')}<div style="min-width:0"><div class="demo-title">${esc(r.title)}</div><div class="tiny dim">${esc(r.artistName)} · ${RELEASE_TYPES[r.type].name} · released wk ${r.launchWeek || r.releaseWeek}</div></div></div>
          <div style="text-align:right"><div class="small mono">${num(releaseStreams(s, r))}/wk</div><div class="tiny dim">${num(releaseTotalStreams(s, r))} total</div></div>
          <button class="icon-btn" data-act="open-release-detail" data-id="${r.id}" aria-label="Details">${icon('dots', 14)}</button>
        </div>`).join('') : `<div class="tiny dim" style="padding:8px 0">No live releases yet.</div>`}
      </div>
    </div>
    <div class="stack">
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('sliders', 15)} Production team</div><div class="card-sub">People who raise the ceiling</div></div><button class="link" data-screen="company">Manage</button></div>
        ${s.staff.length ? s.staff.filter((x) => ['producer', 'songwriter', 'engineer'].includes(x.role)).slice(0, 5).map((x) => `<div class="between" style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,.045)"><div class="row">${avatarHTML(x, 32)}<div><div class="small" style="font-weight:650">${esc(x.name)}</div><div class="tiny dim">${esc(roleById(x.role).name)} · ${x.skill} skill</div></div></div><span class="tiny dim">${money(x.salary)}/wk</span></div>`).join('') : `<div class="tiny dim">No production staff. Sessions rely on the artist’s own instincts — quality will suffer.</div>`}
        <button class="btn btn-sm btn-block mt-12" data-screen="company">${icon('users', 12)} Hire production staff</button>
      </div>
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('bolt', 15)} Recording tips</div></div></div>
        <ul class="small muted" style="padding-left:16px;margin:0;display:flex;flex-direction:column;gap:8px;line-height:1.5">
          <li>A great producer and songwriter can add 20+ quality points.</li>
          <li>Upgraded equipment lifts every future session, not just one.</li>
          <li>Budget matters, but a genre match and strong artist skills matter more.</li>
          <li>Keep 2–3 songs in the vault if you want to drop an EP or album.</li>
        </ul>
      </div>
    </div>
  </div>`;
}

/* ---------------------------------- charts -------------------------------- */
function albumRow(row) {
  const move = row.move > 0 ? `<span class="green">▲${row.move}</span>` : row.move < 0 ? `<span class="red">▼${Math.abs(row.move)}</span>` : `<span class="dim">—</span>`;
  return `<div class="chart-row ${row.isPlayer ? 'is-you' : ''}">
    <span class="chart-pos">${row.pos}</span><span class="chart-move">${move}</span>
    <span style="display:flex;align-items:center;gap:9px;min-width:0">${coverHTML(row.cover, row.title, 'sm')}<span style="min-width:0"><span class="chart-track-title">${esc(row.title)}</span><span class="chart-artist">${esc(row.artistName)} · ${row.tracks} tracks</span></span></span>
    <span class="chart-label"><i class="swatch" style="background:${row.labelColor || '#666'}"></i>${esc(row.labelName)}</span>
    <span class="chart-streams">${num(row.weekly)}</span><span class="rank-peak"></span>
  </div>`;
}
function chartsView(s) {
  const songs = s.chartSongs;
  const albums = s.chartAlbums;
  const playerSongs = songs.filter((x) => x.isPlayer);
  const best = playerSongs[0];
  const top = songs[0];
  return `
  <div class="page-head">
    <div><div class="eyebrow">Global rankings</div><h1 class="page-title">Charts & streaming</h1><div class="page-sub">Weekly charts are driven by streams. A hit feeds itself — chart position lifts next week’s audience.</div></div>
    <div class="head-actions"><div class="seg" style="display:flex;gap:4px;background:rgba(255,255,255,.04);padding:4px;border-radius:10px"><button class="btn btn-sm ${ui.chartTab === 'songs' ? 'btn-primary' : 'btn-ghost'}" data-act="chart-tab" data-tab="songs">Songs</button><button class="btn btn-sm ${ui.chartTab === 'albums' ? 'btn-primary' : 'btn-ghost'}" data-act="chart-tab" data-tab="albums">Albums</button></div></div>
  </div>
  <div class="stat-grid mb-16">
    <div class="stat"><div class="stat-label">Weekly streams</div><div class="stat-val">${num(sum(s.tracks.filter((t) => t.isPlayer), (t) => t.weekly || 0))}</div><div class="stat-foot">${s.tracks.filter((t) => t.isPlayer).length} catalog tracks</div></div>
    <div class="stat"><div class="stat-label">Monthly listeners</div><div class="stat-val">${num(G.monthlyListeners())}</div><div class="stat-foot">Estimated unique audience</div></div>
    <div class="stat"><div class="stat-label">Best chart position</div><div class="stat-val">${best ? '#' + best.pos : '—'}</div><div class="stat-foot">${best ? esc(best.title) : 'No entries yet'}</div></div>
    <div class="stat"><div class="stat-label">Lifetime streams</div><div class="stat-val">${num(G.catalogStreams())}</div><div class="stat-foot">${s.totals.no1} #1s · ${s.totals.top10} top-10s</div></div>
  </div>
  <div class="split">
    <div class="card">
      <div class="chart-toolbar"><div><div class="section-title">${ui.chartTab === 'songs' ? 'Global Songs' : 'Global Albums'}</div><div class="tiny dim">${weekLabel(s.week).label} · ${ui.chartTab === 'songs' ? 'Top 40' : 'Top 20'} · streaming units</div></div><span class="pill gold">${icon('refresh', 11)} Refreshes weekly</span></div>
      ${ui.chartTab === 'songs' ? `
        ${top ? `<div class="chart-hero">${coverHTML(top.cover, top.title, 'xl')}<div style="min-width:0"><div class="eyebrow">#1 this week</div><h2>${esc(top.title)}</h2><div class="small muted">${esc(top.artistName)} · ${esc(top.labelName)} · ${esc(genreById(top.genre).name)}</div><div class="row mt-8"><span class="pill ${top.isPlayer ? 'brand' : ''}">${num(top.weekly)} streams</span><span class="pill">${top.peak ? 'peak #' + top.peak : ''}</span></div></div></div>` : ''}
        <div class="chart-list">${chartRow(null, 0, true)}${songs.slice(top ? 1 : 0).map((r, i) => chartRow(r, i)).join('')}</div>
      ` : `
        <div class="chart-list">${chartRow(null, 0, true)}${albums.map((r) => albumRow(r)).join('')}</div>
        ${!albums.length ? `<div class="empty"><b>No albums charting</b><p>Release an EP or album to compete on the album chart.</p></div>` : ''}
      `}
    </div>
    <div class="stack">
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('star', 15)} Your chart run</div><div class="card-sub">Player entries this week</div></div><span class="pill ${playerSongs.length ? 'brand' : ''}">${playerSongs.length}</span></div>
        ${playerSongs.length ? playerSongs.map((r) => `<div class="between" style="padding:9px 0;border-bottom:1px solid rgba(255,255,255,.045)"><div class="row" style="min-width:0">${coverHTML(r.cover, r.title, 'sm')}<div style="min-width:0"><div class="chart-track-title">${esc(r.title)}</div><div class="chart-artist">#${r.pos} · ${num(r.weekly)} streams</div></div></div><span class="pill ${r.pos <= 10 ? 'gold' : ''}">${r.move > 0 ? '+' + r.move : r.move < 0 ? r.move : '—'}</span></div>`).join('') : `<div class="empty" style="padding:16px"><div class="empty-icon">${icon('chart', 18)}</div><b>No entries yet</b><p>Release music and market it hard enough to break the global Top 40.</p></div>`}
      </div>
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('trend-up', 15)} Chart notes</div></div></div>
        <div class="stack" style="gap:9px">
          <div class="row small muted" style="align-items:flex-start"><span class="news-dot chart" style="margin-top:5px"></span><span>Chart position adds up to a <b style="color:var(--text)">22% streaming lift</b> the following week.</span></div>
          <div class="row small muted" style="align-items:flex-start"><span class="news-dot chart" style="margin-top:5px"></span><span>Top-10 entries and #1s are the fastest route to reputation and bigger venues.</span></div>
          <div class="row small muted" style="align-items:flex-start"><span class="news-dot chart" style="margin-top:5px"></span><span>Radio campaigns extend a record’s half-life — the tail keeps earning.</span></div>
        </div>
      </div>
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('users', 15)} Rivals on the chart</div></div></div>
        ${[...new Set(s.chartSongs.map((x) => x.labelName))].slice(0, 6).map((ln) => { const row = s.chartSongs.find((x) => x.labelName === ln); const count = s.chartSongs.filter((x) => x.labelName === ln).length; return `<div class="between" style="padding:7px 0;border-bottom:1px solid rgba(255,255,255,.04)"><span class="row small"><i class="dot" style="background:${row.labelColor}"></i>${esc(ln)}</span><span class="tiny dim">${count} entr${count === 1 ? 'y' : 'ies'}</span></div>`; }).join('')}
      </div>
    </div>
  </div>`;
}

/* -------------------------------- marketing ------------------------------- */
function marketingView(s) {
  const active = G.activeCampaigns();
  const followers = [...s.roster].sort((a, b) => b.fans - a.fans);
  return `
  <div class="page-head">
    <div><div class="eyebrow">Promotion</div><h1 class="page-title">Marketing</h1><div class="page-sub">A great record is only half the job. Campaigns build awareness, extend lifecycles and turn listeners into fans.</div></div>
    <div class="head-actions"><span class="pill ${active.length ? 'green' : ''}">${active.length} active campaign${active.length === 1 ? '' : 's'}</span></div>
  </div>
  <div class="stat-grid mb-16">
    <div class="stat"><div class="stat-label">Active campaigns</div><div class="stat-val">${active.length}</div><div class="stat-foot">${active.length ? 'Working the market' : 'The catalog is quiet'}</div></div>
    <div class="stat"><div class="stat-label">Marketing spend</div><div class="stat-val">${money(sum(active, (c) => c.cost))}</div><div class="stat-foot">Currently in market</div></div>
    <div class="stat"><div class="stat-label">Total followers</div><div class="stat-val">${num(sum(s.roster, (a) => a.fans || 0))}</div><div class="stat-foot">Across the roster</div></div>
    <div class="stat"><div class="stat-label">Marketing dept.</div><div class="stat-val">${G.hasFacility('marketing') ? 'Active' : '—'}</div><div class="stat-foot">${G.hasFacility('marketing') ? '+18% campaign effect' : 'Build one in Company'}</div></div>
  </div>
  <div class="section-head"><div><div class="section-title">Launch a campaign</div><div class="small muted">Each campaign runs for a set number of weeks. Pick the target carefully.</div></div></div>
  <div class="campaign-grid">${CAMPAIGNS.map((c) => `<div class="campaign-card">
    <div class="between"><span class="campaign-icon" style="--c:${c.color}">${icon(c.icon, 18)}</span><span class="pill">${c.weeks} weeks</span></div>
    <div><h4>${esc(c.name)}</h4><p>${esc(c.desc)}</p></div>
    <div class="campaign-meta"><span>${c.target === 'release' ? 'Targets a release' : 'Targets an artist'}</span><b class="campaign-cost">${money(c.cost)}</b></div>
    <button class="btn btn-sm btn-primary" data-act="open-campaign" data-type="${c.id}" ${s.roster.length ? '' : 'disabled'}>Launch campaign</button>
  </div>`).join('')}</div>
  <div class="split mt-16">
    <div class="card">
      <div class="card-head"><div><div class="card-title">${icon('bolt', 15)} Live campaigns</div><div class="card-sub">What’s working the market right now</div></div></div>
      ${active.length ? active.map((c) => `<div class="active-campaign">
        <span class="campaign-icon" style="--c:${campaignById(c.type)?.color || 'var(--brand)'};width:32px;height:32px;flex:none">${icon(campaignById(c.type)?.icon || 'megaphone', 14)}</span>
        <div class="grow" style="min-width:0"><div class="small" style="font-weight:650">${esc(c.name)}</div><div class="tiny dim" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(c.targetName)}</div></div>
        <div style="text-align:right"><div class="tiny">${Math.max(0, c.endWeek - s.week + 1)} weeks left</div><div class="tiny dim">${money(c.cost)}</div></div>
      </div>`).join('') : `<div class="empty" style="padding:22px"><div class="empty-icon">${icon('megaphone', 20)}</div><b>No campaigns running</b><p>Your releases are only reaching organic listeners. Pick a campaign above to change that.</p></div>`}
    </div>
    <div class="card">
      <div class="card-head"><div><div class="card-title">${icon('heart', 15)} Social following</div><div class="card-sub">Fans become tour demand and first-week sales</div></div></div>
      ${followers.length ? followers.slice(0, 6).map((a) => `<div class="between" style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,.045)"><div class="row">${avatarHTML(a, 30)}<div><div class="small" style="font-weight:650">${esc(a.name)}</div><div class="tiny dim">${esc(genreById(a.genre).name)} · ${Math.round(a.popularity)} pop</div></div></div><span class="small mono">${num(a.fans)}</span></div>`).join('') : `<div class="tiny dim">Sign artists to grow a social audience.</div>`}
      <div class="divider"></div>
      <div class="between"><span class="tiny dim">Social campaigns grow followers fastest</span><button class="link" data-act="open-campaign" data-type="social">Run social blitz</button></div>
    </div>
  </div>`;
}

/* ---------------------------------- tours --------------------------------- */
function toursView(s) {
  const active = G.activeTours();
  const done = s.tours.filter((t) => t.status === 'complete').slice(0, 6);
  const venues = VENUES.map((v) => ({ ...v, unlocked: s.roster.some((a) => a.popularity >= v.minPop) }));
  return `
  <div class="page-head">
    <div><div class="eyebrow">Live</div><h1 class="page-title">Live & touring</h1><div class="page-sub">Ticket revenue, merch and reputation. Touring is how an artist becomes a household name — and how labels get paid.</div></div>
    <div class="head-actions"><button class="btn btn-primary" data-act="open-tour" ${s.roster.length ? '' : 'disabled'}>${icon('bus', 15)} Plan a tour</button></div>
  </div>
  <div class="stat-grid mb-16">
    <div class="stat"><div class="stat-label">Active tours</div><div class="stat-val">${active.length}</div><div class="stat-foot">${active.length ? 'Shows in progress' : 'No artists on the road'}</div></div>
    <div class="stat"><div class="stat-label">Lifetime tour revenue</div><div class="stat-val">${money(s.totals.tourRevenue || 0)}</div><div class="stat-foot">${s.tours.filter((t) => t.status === 'complete').length} completed tours</div></div>
    <div class="stat"><div class="stat-label">Tickets sold</div><div class="stat-val">${num(sum(s.tours, (t) => t.attendanceTotal || 0))}</div><div class="stat-foot">Across all runs</div></div>
    <div class="stat"><div class="stat-label">Merch division</div><div class="stat-val">${G.hasFacility('merch') ? 'Active' : '—'}</div><div class="stat-foot">${G.hasFacility('merch') ? 'Extra revenue per ticket' : 'Build one in Company'}</div></div>
  </div>
  ${active.length ? `<div class="grid-2 mb-16">${active.map((t) => {
    const pctDone = Math.round((t.weeksDone / t.weeks) * 100);
    return `<div class="card">
      <div class="card-head"><div><div class="card-title">${icon('bus', 15)} ${esc(t.artistName)}</div><div class="card-sub">${esc(t.venueName)} · ${t.dates} dates</div></div><span class="pill gold">Week ${t.weeksDone}/${t.weeks}</span></div>
      <div class="tour-progress">${Array.from({ length: t.weeks }, (_, i) => `<i class="${i < t.weeksDone ? 'done' : ''}"></i>`).join('')}</div>
      <div class="stat-grid mt-12" style="grid-template-columns:repeat(3,1fr);gap:8px">
        <div class="mini-stat"><div class="l">Tickets</div><div class="v">${num(t.attendanceTotal)}</div></div>
        <div class="mini-stat"><div class="l">Revenue</div><div class="v">${money(t.revenueTotal)}</div></div>
        <div class="mini-stat"><div class="l">Net</div><div class="v ${t.revenueTotal - t.costTotal >= 0 ? 'green' : 'red'}">${money(t.revenueTotal - t.costTotal)}</div></div>
      </div>
      <div class="tiny dim mt-8">${t.showsDone} of ${t.dates} shows played · ticket price ${money(t.price)}</div>
    </div>`;
  }).join('')}</div>` : `<div class="card mb-16"><div class="empty"><div class="empty-icon">${icon('bus', 21)}</div><b>No one is on the road</b><p>Plan a tour for a signed artist. Choose a venue they can actually fill, set the ticket price and invest in production.</p><button class="btn btn-primary mt-12" data-act="open-tour" ${s.roster.length ? '' : 'disabled'}>Plan the first tour</button></div></div>`}
  <div class="split">
    <div class="card">
      <div class="card-head"><div><div class="card-title">${icon('pin', 15)} Venue ladder</div><div class="card-sub">Bigger rooms unlock as your artists grow</div></div></div>
      ${venues.map((v) => `<div class="venue-row">
        <span class="empty-icon" style="margin:0;width:36px;height:36px;color:${v.unlocked ? 'var(--gold)' : 'var(--muted-2)'}">${icon(v.unlocked ? 'star' : 'lock', 16)}</span>
        <div class="grow"><div class="venue-name">${esc(v.name)} ${v.unlocked ? '' : `<span class="pill" style="margin-left:5px">${v.minPop}+ pop</span>`}</div><div class="venue-stats"><span>${num(v.cap)} cap</span><span>${money(v.ticket)} avg ticket</span><span>${money(v.cost)} / show</span><span>${num(v.cap * v.ticket * 0.9)} gross</span></div></div>
        ${v.unlocked ? `<button class="btn btn-sm" data-act="open-tour-venue" data-id="${v.id}">Plan</button>` : `<span class="tiny dim">${v.blurb.split('.')[0]}</span>`}
      </div>`).join('')}
    </div>
    <div class="stack">
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('check-circle', 15)} Tour history</div></div></div>
        ${done.length ? done.map((t) => `<div class="between" style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,.045)"><div style="min-width:0"><div class="small" style="font-weight:650">${esc(t.artistName)}</div><div class="tiny dim">${esc(t.venueName)} · ${t.dates} dates</div></div><div style="text-align:right"><div class="small mono ${t.revenueTotal - t.costTotal >= 0 ? 'green' : 'red'}">${money(t.revenueTotal - t.costTotal)}</div><div class="tiny dim">${num(t.attendanceTotal)} tickets</div></div></div>`).join('') : `<div class="tiny dim">No completed tours yet.</div>`}
      </div>
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('bolt', 15)} Tour notes</div></div></div>
        <ul class="small muted" style="padding-left:16px;margin:0;display:flex;flex-direction:column;gap:8px;line-height:1.5">
          <li>Artists are unavailable for recording while touring.</li>
          <li>Ticket prices above the venue average reduce attendance.</li>
          <li>Production budget raises demand; marketing fills the room.</li>
          <li>Profitable tours add reputation, popularity and future demand.</li>
        </ul>
      </div>
    </div>
  </div>`;
}

/* --------------------------------- industry ------------------------------- */
function industryView(s) {
  const labels = [...s.competitors].sort((a, b) => b.reputation - a.reputation);
  return `
  <div class="page-head">
    <div><div class="eyebrow">The business</div><h1 class="page-title">Industry</h1><div class="page-sub">Six rival labels, one global market. Watch who is climbing, sign better distribution and buy your competition when you can afford it.</div></div>
    <div class="head-actions"><span class="pill">${s.competitors.length} active rivals</span><span class="pill brand">${esc(G.labelTier().name)}</span></div>
  </div>
  <div class="section-head"><div><div class="section-title">Competitor labels</div><div class="small muted">Acquisitions unlock at Rising Record Label. Bought labels bring their artists and reputation.</div></div></div>
  <div class="grid-3">${labels.map((c) => {
    const top = [...c.artists].sort((a, b) => b.popularity - a.popularity)[0];
    const cost = Math.round((c.reputation * 42000 + c.artists.length * 65000) / 1000) * 1000;
    return `<div class="card">
      <div class="between"><div class="row"><span class="logo-mark" style="width:38px;height:38px;border-radius:11px;display:grid;place-items:center;background:${c.color}22;color:${c.color};font-weight:900;font-size:13px;border:1px solid ${c.color}44">${esc(c.name.split(' ').map((w) => w[0]).slice(0, 2).join(''))}</span><div><div class="artist-name">${esc(c.name)}</div><div class="tiny dim">${esc(c.personality)} · ${c.artists.length} artists</div></div></div><span class="pill">${Math.round(c.reputation)} rep</span></div>
      <div class="artist-stats mt-8"><div class="mini-stat"><div class="l">Top artist</div><div class="v" style="font-size:11px">${esc(top?.name || '—')}</div></div><div class="mini-stat"><div class="l">Top popularity</div><div class="v">${top ? Math.round(top.popularity) : '—'}</div></div></div>
      <div class="row" style="justify-content:space-between"><span class="tiny dim">Acquisition</span><b class="small">${money(cost)}</b></div>
      <button class="btn btn-sm ${s.tier >= 2 && s.cash >= cost ? 'btn-primary' : ''}" data-act="confirm-acquire" data-id="${c.id}" ${s.tier >= 2 ? '' : 'disabled'}>${s.tier >= 2 ? (s.cash >= cost ? 'Make an offer' : 'Need more cash') : 'Unlocks at Rising'}</button>
    </div>`;
  }).join('')}</div>
  <div class="split mt-16">
    <div class="card">
      <div class="card-head"><div><div class="card-title">${icon('globe', 15)} Distribution deals</div><div class="card-sub">Reach versus margin. Pick your release machine.</div></div></div>
      ${DISTRIBUTION.map((d) => {
        const current = s.dist === d.id;
        const locked = s.tier < d.minTier;
        return `<div class="venue-row" style="${current ? 'opacity:1' : locked ? 'opacity:.5' : ''}">
          <span class="empty-icon" style="margin:0;width:36px;height:36px;color:${current ? 'var(--brand)' : 'var(--muted-2)'}">${icon(current ? 'check-circle' : locked ? 'lock' : 'globe', 16)}</span>
          <div class="grow"><div class="venue-name">${esc(d.name)} ${current ? '<span class="pill brand">Current</span>' : ''}</div><div class="venue-stats"><span>${(d.fee * 100).toFixed(0)}% fee</span><span>${d.reach.toFixed(2)}× reach</span><span>${d.weekly ? money(d.weekly) + '/wk' : 'no weekly fee'}</span></div><div class="tiny dim" style="margin-top:3px">${esc(d.desc)}</div></div>
          ${current ? '' : `<button class="btn btn-sm" data-act="set-dist" data-id="${d.id}" ${locked ? 'disabled' : ''}>${locked ? 'Locked' : 'Switch'}</button>`}
        </div>`;
      }).join('')}
    </div>
    <div class="stack">
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('trend-up', 15)} Market trends</div><div class="card-sub">Genre multipliers applied to streams</div></div></div>
        ${[...GENRES].sort((a, b) => (s.trends[b.id] || 1) - (s.trends[a.id] || 1)).map((g) => `<div class="trend-row"><span class="row" style="gap:6px"><i class="swatch" style="width:7px;height:7px;border-radius:2px;background:${g.color}"></i>${esc(g.name)}</span>${progressBar(s.trends[g.id] || 1, 1.5, 'gold')}<b class="${(s.trends[g.id] || 1) > 1.08 ? 'gold' : 'muted'}">${(s.trends[g.id] || 1).toFixed(2)}×</b></div>`).join('')}
      </div>
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('building', 15)} Your standing</div></div></div>
        <div class="stack" style="gap:10px">
          <div class="between"><span class="small muted">Reputation</span><b>${Math.round(s.reputation)}</b></div>
          <div class="between"><span class="small muted">Net worth</span><b>${money(G.netWorth())}</b></div>
          <div class="between"><span class="small muted">Acquired labels</span><b>${s.acquired.length}</b></div>
          <div class="between"><span class="small muted">Awards won</span><b>${s.totals.awards}</b></div>
          <div class="between"><span class="small muted">Chart entries</span><b>${s.totals.chartEntries}</b></div>
        </div>
      </div>
    </div>
  </div>`;
}

/* --------------------------------- finance -------------------------------- */
const REV_LABELS = { streaming: 'Streaming & sales', sync: 'Sync licensing', publishing: 'Publishing', touring: 'Touring', merch: 'Merch', sponsorship: 'Sponsorships' };
const EXP_LABELS = { studio: 'Studio upkeep', staff: 'Staff salaries', artists: 'Artist salaries', marketing: 'Marketing', recording: 'Recording', distribution: 'Distribution', facilities: 'Facilities', office: 'Office', loan: 'Loan payments', upgrade: 'Upgrades', equipment: 'Equipment', advance: 'Signing advances', touring: 'Tour costs', events: 'Event costs', severance: 'Severance', scouting: 'Scouting', acquisition: 'Acquisitions' };
function financeChart(history) {
  const data = history.slice(-24);
  if (!data.length) return `<div class="empty" style="padding:32px"><div class="empty-icon">${icon('chart', 20)}</div><b>No financial history yet</b><p>Advance a week to start building the ledger.</p></div>`;
  const w = 600, h = 160, pad = 6;
  const max = Math.max(...data.map((d) => Math.max(d.revenue, d.expenses)), 1);
  const bw = (w - pad * 2) / data.length;
  const bars = data.map((d, i) => {
    const rh = (d.revenue / max) * (h - 22);
    const eh = (d.expenses / max) * (h - 22);
    const x = pad + i * bw;
    return `<rect x="${x + 1}" y="${h - 16 - rh}" width="${Math.max(1.5, bw / 2 - 1.5)}" height="${Math.max(0, rh)}" rx="1.5" fill="#4ade80" opacity=".75"/>
      <rect x="${x + bw / 2}" y="${h - 16 - eh}" width="${Math.max(1.5, bw / 2 - 1.5)}" height="${Math.max(0, eh)}" rx="1.5" fill="#f87171" opacity=".6"/>`;
  }).join('');
  const cash = data.map((d) => d.cash);
  const cMax = Math.max(...cash, 1), cMin = Math.min(...cash, 0);
  const pts = cash.map((v, i) => `${(pad + i * bw + bw / 2).toFixed(1)},${(h - 20 - ((v - cMin) / (cMax - cMin || 1)) * (h - 30)).toFixed(1)}`).join(' ');
  return `<svg class="finance-chart" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-label="Revenue, expenses and cash history">
    <line x1="0" y1="${h - 16}" x2="${w}" y2="${h - 16}" stroke="rgba(255,255,255,.1)" stroke-width="1"/>
    ${bars}
    <polyline points="${pts}" fill="none" stroke="#f5c451" stroke-width="1.6" stroke-linejoin="round" opacity=".9"/>
    <text x="0" y="10" fill="#636b7e" font-size="9">${money(max)}</text>
    <text x="0" y="${h - 3}" fill="#636b7e" font-size="9">${data[0]?.week ? 'WK ' + data[0].week : ''}</text>
    <text x="${w}" y="${h - 3}" fill="#636b7e" font-size="9" text-anchor="end">WEEK ${data[data.length - 1]?.week || ''}</text>
  </svg>`;
}
function financeView(s) {
  const last = s.history[s.history.length - 1];
  const revBreak = last?.revenueBreakdown || {};
  const expBreak = last?.expenseBreakdown || {};
  const rec = G.weeklyRecurring();
  const totalRev = sum(Object.values(revBreak));
  const totalExp = sum(Object.values(expBreak));
  const loans = s.loans;
  return `
  <div class="page-head">
    <div><div class="eyebrow">The numbers</div><h1 class="page-title">Finance</h1><div class="page-sub">Cash is oxygen. Watch the burn, build recurring revenue and borrow only when the upside is real.</div></div>
    <div class="head-actions"><button class="btn" data-act="open-loan">${icon('cash', 15)} Borrow</button><button class="btn btn-ghost" data-screen="calendar">${icon('calendar', 15)} Calendar</button></div>
  </div>
  <div class="stat-grid mb-16">
    <div class="stat"><div class="stat-label">Cash on hand</div><div class="stat-val">${money(s.cash)}</div><div class="stat-foot">${last ? `${last.net >= 0 ? '+' : ''}${money(last.net)} last week` : 'Opening balance'}</div></div>
    <div class="stat"><div class="stat-label">Net worth</div><div class="stat-val">${money(G.netWorth())}</div><div class="stat-foot">Cash + assets − debt</div></div>
    <div class="stat"><div class="stat-label">Lifetime revenue</div><div class="stat-val">${money(s.totals.revenue)}</div><div class="stat-foot">${num(s.totals.streams)} streams</div></div>
    <div class="stat"><div class="stat-label">Weekly burn</div><div class="stat-val">${money(G.weeklyBurn())}</div><div class="stat-foot">${money(sum(rec, (r) => r.amount) * 52)} annualized</div></div>
  </div>
  <div class="card mb-16">
    <div class="card-head"><div><div class="card-title">${icon('chart', 15)} Cash flow</div><div class="card-sub">Last ${Math.min(24, s.history.length)} weeks · revenue, expenses & cash line</div></div><div class="finance-legend"><span><i style="background:var(--green)"></i>Revenue</span><span><i style="background:var(--red)"></i>Expenses</span><span><i style="background:var(--gold)"></i>Cash</span></div></div>
    ${financeChart(s.history)}
  </div>
  <div class="split">
    <div class="stack">
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('wallet', 15)} Last week’s P&L</div><div class="card-sub">${last ? weekLabel(last.week).label : 'No closed week yet'}</div></div><div class="row"><span class="pill green">${money(totalRev)} in</span><span class="pill red">${money(totalExp)} out</span></div></div>
        <div class="grid-2" style="gap:22px">
          <div>${Object.entries(revBreak).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<div class="breakdown-row"><span style="width:92px">${esc(REV_LABELS[k] || k)}</span>${progressBar(v, Math.max(totalRev, 1), 'green')}<span class="amt green">${money(v)}</span></div>`).join('') || `<div class="tiny dim">No revenue recorded yet.</div>`}</div>
          <div>${Object.entries(expBreak).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<div class="breakdown-row"><span style="width:92px">${esc(EXP_LABELS[k] || k)}</span>${progressBar(v, Math.max(totalExp, 1), 'gold')}<span class="amt">${money(v)}</span></div>`).join('') || `<div class="tiny dim">No expenses recorded yet.</div>`}</div>
        </div>
      </div>
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('clock', 15)} Weekly obligations</div><div class="card-sub">Recurring costs, before royalties and one-offs</div></div><b>${money(G.weeklyBurn())}</b></div>
        <div class="table-wrap">
          <table class="data-table"><thead><tr><th>Cost centre</th><th>Category</th><th class="num">Weekly</th></tr></thead><tbody>
            ${rec.map((r) => `<tr><td>${esc(r.label)}</td><td class="dim">${esc(EXP_LABELS[r.cat] || r.cat)}</td><td class="num">${money(r.amount)}</td></tr>`).join('')}
          </tbody></table>
        </div>
      </div>
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('list', 15)} Weekly ledger</div></div></div>
        <div class="table-wrap"><table class="data-table"><thead><tr><th>Week</th><th class="num">Revenue</th><th class="num">Expenses</th><th class="num">Net</th><th class="num">Cash</th><th class="num">Streams</th></tr></thead><tbody>
          ${[...s.history].reverse().slice(0, 10).map((h) => `<tr><td>${weekLabel(h.week).label}</td><td class="num green">${money(h.revenue)}</td><td class="num red">${money(h.expenses)}</td><td class="num ${h.net >= 0 ? 'green' : 'red'}">${money(h.net)}</td><td class="num">${money(h.cash)}</td><td class="num">${num(h.streams)}</td></tr>`).join('') || `<tr><td colspan="6" class="dim">Advance a week to populate the ledger.</td></tr>`}
        </tbody></table></div>
      </div>
    </div>
    <div class="stack">
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('cash', 15)} Credit & loans</div><div class="card-sub">Borrowing capacity scales with your tier</div></div></div>
        ${loans.length ? loans.map((l) => `<div class="loan-card mb-12"><div class="between"><span class="small" style="font-weight:650">Loan · ${(l.rate * 100).toFixed(0)}% APR</span><span class="pill red">${money(l.remaining)} left</span></div><div class="tiny dim mt-4">${money(l.payment)}/week · ${l.weeksLeft} weeks remaining</div><button class="btn btn-sm mt-8" data-act="repay-loan" data-id="${l.id}">Repay ${money(l.remaining * 1.03)}</button></div>`).join('') : `<div class="tiny dim">No debt. A clean balance sheet is a beautiful thing.</div>`}
        <button class="btn btn-block mt-12" data-act="open-loan">${icon('plus', 14)} Take a loan</button>
        <div class="tiny dim mt-8">Borrowing adds cash but burdens weekly cash flow. Default is not an option.</div>
      </div>
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('trend-up', 15)} Revenue mix</div><div class="card-sub">Lifetime by source</div></div></div>
        <div class="stack" style="gap:9px">
          <div class="between"><span class="small muted">Streaming & sales</span><b>${money(s.totals.revenue * 0.72)}</b></div>
          <div class="between"><span class="small muted">Touring</span><b>${money(s.totals.tourRevenue || 0)}</b></div>
          <div class="between"><span class="small muted">Sync & publishing</span><b>${money(s.totals.revenue * 0.08)}</b></div>
          <div class="between"><span class="small muted">Other</span><b>${money(s.totals.revenue * 0.2)}</b></div>
        </div>
        <div class="divider"></div>
        <div class="tiny dim">Revenue mix is approximate. Streaming dominates until touring and licensing scale up.</div>
      </div>
    </div>
  </div>`;
}

/* ---------------------------------- company ------------------------------- */
function companyView(s) {
  const prog = G.tierProgress();
  const tier = G.labelTier();
  return `
  <div class="page-head">
    <div><div class="eyebrow">The label</div><h1 class="page-title">Company</h1><div class="page-sub">Your brand, your buildings, your people. This is the machine behind the music.</div></div>
    <div class="head-actions"><button class="btn btn-primary" data-act="open-brand">${icon('pen', 15)} Edit branding</button></div>
  </div>
  <div class="card mb-16" style="background:radial-gradient(600px 220px at 20% 0%, color-mix(in srgb, var(--brand) 18%, transparent), transparent), linear-gradient(180deg,rgba(24,27,37,.8),rgba(12,14,20,.95))">
    <div class="between wrap brand-hero">
      <div class="row" style="gap:20px">${logoSVG(s.label, 84)}<div><div class="eyebrow">${esc(tier.name)}</div><h2>${esc(s.label.name)}</h2><div class="small muted mt-4">${esc(s.label.tagline || 'Independent. Uncompromising.')}</div><div class="row mt-8"><span class="pill" style="border-color:${s.label.color}55;color:${s.label.color}">${esc(genreById(s.label.genre).name)} focus</span><span class="pill">${s.totals.releases} releases</span><span class="pill">${s.totals.awards} awards</span></div></div></div>
      <div class="row" style="gap:18px">${ringHTML(prog.pct, `${Math.round(prog.pct)}%`, tier.color)}<div style="max-width:170px"><div class="small" style="font-weight:650">${prog.next ? `Next: ${esc(prog.next.name)}` : 'Global Music Empire'}</div><div class="tiny dim mt-4">${prog.next ? `${(prog.next.rep - s.reputation).toFixed(0)} reputation points to go` : 'You have reached the top tier.'}</div></div></div>
    </div>
  </div>
  <div class="split">
    <div class="stack">
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('building', 15)} Facilities</div><div class="card-sub">Permanent upgrades to the business</div></div><span class="pill">${s.facilities.length} / ${FACILITIES.length}</span></div>
        <div class="facility-grid">${FACILITIES.map((f) => {
          const owned = s.facilities.includes(f.id);
          const locked = s.tier < f.minTier;
          return `<div class="facility-card ${owned ? 'owned' : ''} ${locked ? 'locked' : ''}">
            <div class="between"><span class="facility-icon">${icon(f.icon, 15)}</span>${owned ? `<span class="pill green">${icon('check', 10)} Active</span>` : locked ? `<span class="pill">${icon('lock', 9)} ${esc(TIERS[f.minTier].name)}</span>` : `<span class="tiny dim">${money(f.upkeep)}/wk</span>`}</div>
            <div><b class="small">${esc(f.name)}</b><div class="tiny dim mt-4">${esc(f.desc)}</div></div>
            ${owned ? `<div class="tiny green">Owned</div>` : `<div class="row" style="justify-content:space-between"><b class="small">${money(f.cost)}</b><button class="btn btn-sm" data-act="build-facility" data-id="${f.id}" ${locked || s.cash < f.cost ? 'disabled' : ''}>Build</button></div>`}
          </div>`;
        }).join('')}</div>
      </div>
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('users', 15)} Team</div><div class="card-sub">Hired staff and available candidates</div></div><button class="link" data-act="refresh-staff-market">Refresh market</button></div>
        ${s.staff.length ? `<div class="stack" style="gap:0">${s.staff.map((x) => `<div class="between" style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,.045)"><div class="row">${avatarHTML(x, 30)}<div><div class="small" style="font-weight:650">${esc(x.name)}</div><div class="tiny dim">${esc(roleById(x.role).name)} · ${x.skill} skill · ${esc(x.trait)}</div></div></div><div class="row"><span class="tiny dim">${money(x.salary)}/wk</span><button class="btn btn-sm btn-ghost" data-act="confirm-fire" data-id="${x.id}">Release</button></div></div>`).join('')}</div>` : `<div class="tiny dim">No staff hired. Your artists and outside freelancers are carrying the load.</div>`}
        <div class="divider"></div>
        <div class="tiny dim mb-8">Candidates available now</div>
        <div class="stack" style="gap:8px">${s.staffMarket.slice(0, 6).map((x) => `<div class="between" style="padding:8px;border:1px solid var(--line);border-radius:9px"><div class="row">${avatarHTML(x, 28)}<div><div class="small" style="font-weight:650">${esc(x.name)}</div><div class="tiny dim">${esc(roleById(x.role).name)} · ${x.skill} skill · ${esc(x.trait)}</div></div></div><div style="text-align:right"><div class="tiny">${money(x.hireCost)} hire</div><button class="btn btn-sm mt-4" data-act="hire-staff" data-id="${x.id}" ${s.cash < x.hireCost ? 'disabled' : ''}>Hire</button></div></div>`).join('') || '<div class="tiny dim">No candidates. Check back next month.</div>'}</div>
      </div>
    </div>
    <div class="stack">
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('trend-up', 15)} Progression</div><div class="card-sub">The road to a global empire</div></div></div>
        <div class="tier-roadmap">${TIERS.map((t) => `<div class="tier-step ${s.tier > t.id ? 'done' : s.tier === t.id ? 'current' : ''}"><span class="tier-dot">${s.tier > t.id ? '✓' : t.id + 1}</span><div><div class="t-name">${esc(t.name)}</div><div class="t-sub">${t.rep} reputation · ${esc(t.blurb)}</div></div></div>`).join('')}</div>
      </div>
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('trophy', 15)} Trophy cabinet</div><div class="card-sub">Awards and milestones</div></div></div>
        ${s.awards.length ? s.awards.slice(-5).reverse().map((a) => `<div class="between" style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,.045)"><div class="row"><span class="empty-icon" style="margin:0;width:30px;height:30px;color:var(--gold)">${icon('trophy', 14)}</span><div><div class="small" style="font-weight:650">${esc(a.name)}</div><div class="tiny dim">${esc(a.detail)}</div></div></div><span class="tiny dim">Wk ${a.week}</span></div>`).join('') : `<div class="empty" style="padding:16px"><div class="empty-icon">${icon('trophy', 18)}</div><b>No awards yet</b><p>Chart success and reputation earn nominations at the annual ceremony.</p><div class="row mt-8" style="justify-content:center"><span class="pill gold">${s.totals.awards} wins</span><span class="pill">${s.totals.no1} #1s</span></div></div>`}
      </div>
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('settings', 15)} Game</div><div class="card-sub">Autosaved locally after every action</div></div></div>
        <div class="stack" style="gap:8px"><button class="btn btn-block" data-act="open-help">${icon('book', 14)} How to play</button><button class="btn btn-block btn-danger" data-act="confirm-reset">${icon('refresh', 14)} Start a new label</button></div>
        <div class="tiny dim mt-12">Music Empire · run ${s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'now'} · ${s.week} weeks played</div>
      </div>
    </div>
  </div>`;
}

/* --------------------------------- calendar -------------------------------- */
function calendarEvents(s) {
  const entries = [];
  const push = (week, type, iconName, title, sub) => { if (week >= s.week && week < s.week + 13) entries.push({ week, type, icon: iconName, title, sub }); };
  for (const r of s.releases.filter((x) => x.status === 'scheduled')) push(r.releaseWeek, 'release', 'music', `“${r.title}” releases`, `${r.artistName} · ${RELEASE_TYPES[r.type].name} · ${r.demoIds.length} tracks`);
  for (const a of s.roster) {
    if (a.contract && a.contract.weeksLeft <= 13) push(s.week + Math.max(0, a.contract.weeksLeft), 'contract', 'scale', `${a.name} contract ends`, `${money(a.contract.salary)}/wk · ${a.contract.royalty * 100}% royalty`);
  }
  for (const c of s.campaigns.filter((x) => x.endWeek >= s.week)) push(c.endWeek, 'campaign', campaignById(c.type)?.icon || 'megaphone', `${c.name} ends`, c.targetName);
  for (const t of G.activeTours()) push(s.week + Math.max(0, t.weeks - t.weeksDone), 'tour', 'bus', `${t.artistName} tour wraps`, `${t.venueName} · ${t.dates} dates`);
  const woy = ((s.week - 1) % 52) + 1;
  push(s.week + (52 - woy), 'award', 'trophy', 'Annual awards ceremony', 'Nominees, winners and industry prestige');
  if (s.trendState.nextShift > s.week) push(s.trendState.nextShift, 'trend', 'trend-up', 'Trend forecast update', 'Genre multipliers shift');
  if (s.week > 1) push(s.week, 'now', 'clock', 'This week', 'Advance to close the week and resolve payouts');
  return entries.sort((a, b) => a.week - b.week);
}
function calendarView(s) {
  const entries = calendarEvents(s);
  const weeks = [];
  for (let w = s.week; w < s.week + 13; w++) weeks.push(w);
  return `
  <div class="page-head">
    <div><div class="eyebrow">Schedule</div><h1 class="page-title">Calendar</h1><div class="page-sub">Releases, tour dates, contract expiries, campaign endings and awards. Plan the next twelve weeks.</div></div>
    <div class="head-actions"><span class="pill">${weekLabel(s.week).label}</span><button class="btn btn-primary" data-act="advance">Advance week ${icon('arrow-right', 14)}</button></div>
  </div>
  <div class="split">
    <div class="card">
      <div class="card-head"><div><div class="card-title">${icon('calendar', 15)} Next 12 weeks</div><div class="card-sub">Everything currently on the books</div></div></div>
      <div class="timeline">${weeks.map((w) => {
        const items = entries.filter((e) => e.week === w);
        return `<div class="tl-week"><div class="tl-date"><b>W${((w - 1) % 52) + 1}</b>${monthName(w)} ${2026 + Math.floor((w - 1) / 52)}</div><div class="tl-items">${items.length ? items.map((e) => `<div class="tl-item ${e.type}"><span class="tl-icon">${icon(e.icon, 11)}</span><div><div>${esc(e.title)}</div><div class="tiny dim">${esc(e.sub)}</div></div></div>`).join('') : `<div class="tl-item"><span class="tl-icon">${icon('dots', 11)}</span><span class="tiny dim">Nothing scheduled</span></div>`}</div></div>`;
      }).join('')}</div>
    </div>
    <div class="stack">
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('bolt', 15)} Upcoming</div></div></div>
        ${entries.length ? entries.slice(0, 7).map((e) => `<div class="between" style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,.045)"><div class="row"><span class="tl-icon" style="color:var(--${e.type === 'award' ? 'gold' : e.type === 'contract' ? 'red' : 'brand'})">${icon(e.icon, 12)}</span><div><div class="small">${esc(e.title)}</div><div class="tiny dim">${esc(e.sub)}</div></div></div><span class="pill">W${((e.week - 1) % 52) + 1}</span></div>`).join('') : `<div class="tiny dim">Nothing scheduled. Record and release music to fill the calendar.</div>`}
      </div>
      <div class="card">
        <div class="card-head"><div><div class="card-title">${icon('star', 15)} Annual moments</div></div></div>
        <div class="stack" style="gap:9px">
          <div class="between"><span class="small muted">Awards ceremony</span><b class="small gold">Week 52</b></div>
          <div class="between"><span class="small muted">Trend forecast</span><b class="small">Every 5–9 weeks</b></div>
          <div class="between"><span class="small muted">Talent market refresh</span><b class="small">Monthly</b></div>
          <div class="between"><span class="small muted">Staff market</span><b class="small">Every 6 weeks</b></div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ---------------------------------- intro --------------------------------- */
function introView() {
  const color = ui.intro.color;
  const shape = ui.intro.shape;
  const previewLabel = { name: 'Your label', initials: 'AR', color, logoShape: shape };
  return `<div class="intro">
    <div class="intro-bg"><div class="big-vinyl"></div><div class="glow"></div></div>
    <div class="intro-left">
      <div class="intro-badge">${icon('disc', 12)} Music industry tycoon</div>
      <h1>OWN THE<br><span>SOUND.</span></h1>
      <p class="intro-lede">Start with a bedroom studio and a little cash. Sign raw talent, cut records, fight for chart positions and build the most powerful label on earth.</p>
      <div class="intro-features">
        <div class="intro-feature">${icon('users', 15)}<div><b>Sign & develop</b>Discover artists, negotiate contracts and manage egos.</div></div>
        <div class="intro-feature">${icon('mic', 15)}<div><b>Make records</b>Producers, songwriters, studios and features all shape the hit.</div></div>
        <div class="intro-feature">${icon('chart', 15)}<div><b>Win the charts</b>Streaming, radio, playlists and rival labels in a living market.</div></div>
        <div class="intro-feature">${icon('bus', 15)}<div><b>Build an empire</b>Tour globally, buy rivals and unlock the industry’s top tier.</div></div>
      </div>
    </div>
    <div class="intro-right">
      <div class="start-card">
        <h2>Found your label</h2>
        <div class="sub">Name it, brand it, then go find your first hit.</div>
        <div class="start-logo">
          <span id="intro-logo">${logoSVG(previewLabel, 54)}</span>
          <div><div class="name" id="intro-name-preview">Afterglow Records</div><div class="tier">Bedroom Studio · $150,000 seed cash</div></div>
        </div>
        <div class="field mb-12"><label>Label name</label><input type="text" id="intro-name" value="Afterglow Records" maxlength="28" placeholder="Your label" /></div>
        <div class="field mb-12"><label>Brand colour</label><div class="swatches">${BRAND_COLORS.map((c) => `<button class="swatch-btn ${c === color ? 'active' : ''}" style="background:${c}" data-act="intro-color" data-color="${c}" aria-label="Colour ${c}"></button>`).join('')}</div></div>
        <div class="field mb-12"><label>Logo mark</label><div class="logo-options">${LOGO_SHAPES.map((l) => `<button class="logo-opt ${l.id === shape ? 'active' : ''}" data-act="intro-shape" data-shape="${l.id}" aria-label="${l.name}">${logoSVG({ ...previewLabel, logoShape: l.id }, 30)}</button>`).join('')}</div></div>
        <div class="field mb-16"><label>Founder’s ear</label><select id="intro-genre">${GENRES.map((g) => `<option value="${g.id}" ${g.id === ui.intro.genre ? 'selected' : ''}>${g.name} — ${g.blurb}</option>`).join('')}</select><div class="hint">Cosmetic focus. The market decides what’s hot.</div></div>
        <button class="btn btn-primary btn-block btn-lg" data-act="intro-start">Start your label ${icon('arrow-right', 16)}</button>
        <div class="tiny dim mt-12" style="text-align:center">Autosaves in this browser · no account needed</div>
      </div>
    </div>
    <div class="intro-foot">MUSIC EMPIRE · a management simulation</div>
  </div>`;
}

/* ---------------------------------- modals -------------------------------- */
function modalShell({ title, sub, body, foot = '', wide = false, iconName = 'music', close = true, extraClass = '' }) {
  return `<div class="modal-backdrop" data-modal-backdrop="1">
    <div class="modal ${wide ? 'wide' : ''} ${extraClass}" role="dialog" aria-modal="true" aria-label="${esc(title)}">
      <div class="modal-head">
        <span class="event-icon" style="width:38px;height:38px">${icon(iconName, 18)}</span>
        <div class="mh-copy"><div class="modal-title">${esc(title)}</div>${sub ? `<div class="modal-sub">${esc(sub)}</div>` : ''}</div>
        ${close ? `<button class="icon-btn modal-x" data-act="close" aria-label="Close">${icon('x', 16)}</button>` : ''}
      </div>
      <div class="modal-body">${body}</div>
      ${foot ? `<div class="modal-foot">${foot}</div>` : ''}
    </div>
  </div>`;
}

function renderModal() {
  const root = document.getElementById('modal-root');
  if (!root) return;
  const s = G.getState();
  if (!s) { root.innerHTML = ''; return; }
  if (s.gameOver) { root.innerHTML = gameOverModal(s); return; }
  const ev = G.currentEvent();
  if (ev) { root.innerHTML = eventModal(ev, s); return; }
  if (!ui.modal) { root.innerHTML = ''; return; }
  const { type, data } = ui.modal;
  let html = '';
  try {
    switch (type) {
      case 'artist': html = artistModal(data.id); break;
      case 'sign': html = signModal(data.id); break;
      case 'record': html = recordModal(data.id); break;
      case 'release': html = releaseModal(data); break;
      case 'campaign': html = campaignModal(data.type); break;
      case 'tour': html = tourModal(data.artistId, data.venueId); break;
      case 'brand': html = brandModal(data); break;
      case 'equipment': html = equipmentModal(data.id); break;
      case 'release-detail': html = releaseDetailModal(data.id); break;
      case 'track': html = trackModal(data.id); break;
      case 'confirm': html = confirmModal(data); break;
      case 'loan': html = loanModal(); break;
      case 'help': html = helpModal(); break;
      case 'more': html = moreModal(s); break;
      case 'event': html = ev ? eventModal(ev, s) : ''; break;
      default: html = '';
    }
  } catch (err) {
    console.error(err);
    html = modalShell({ title: 'Something went wrong', body: `<div class="empty"><b>This panel hit a snag.</b><p>Close it and try again.</p></div>`, foot: `<button class="btn" data-act="close">Close</button>` });
  }
  root.innerHTML = html;
  if (type === 'record') setTimeout(updateSongPreview, 0);
  if (type === 'tour') setTimeout(updateTourPreview, 0);
  if (type === 'brand') setTimeout(bindBrandPreview, 0);
  const body = root.querySelector('.modal-body');
  if (body) body.scrollTop = 0;
}

function gameOverModal(s) {
  return `<div class="modal-backdrop"><div class="modal narrow" role="dialog" aria-modal="true">
    <div class="modal-head"><span class="event-icon" style="background:rgba(248,113,113,.12);color:var(--red);border-color:rgba(248,113,113,.3)">${icon('alert', 20)}</span><div class="mh-copy"><div class="modal-title">The run is over</div><div class="modal-sub">${esc(s.label.name)} · ${s.week} weeks · ${money(s.totals.revenue)} lifetime revenue</div></div></div>
    <div class="modal-body">
      <p class="small muted" style="line-height:1.6">The label ran out of cash and the creditors moved in. Every empire has a first attempt — the next one starts with sharper decisions.</p>
      <div class="stat-grid mt-16" style="grid-template-columns:1fr 1fr">
        <div class="stat"><div class="stat-label">Best chart peak</div><div class="stat-val">${s.totals.chartEntries ? '#' + Math.min(...s.chartSongs.filter((x) => x.isPlayer).map((x) => x.pos), 99) : '—'}</div></div>
        <div class="stat"><div class="stat-label">Artists signed</div><div class="stat-val">${s.totals.releases ? Math.max(s.roster.length, 0) : 0}</div></div>
        <div class="stat"><div class="stat-label">#1 records</div><div class="stat-val">${s.totals.no1}</div></div>
        <div class="stat"><div class="stat-label">Awards</div><div class="stat-val">${s.totals.awards}</div></div>
      </div>
    </div>
    <div class="modal-foot"><button class="btn btn-primary" data-act="hard-reset">${icon('refresh', 15)} Start a new label</button></div>
  </div></div>`;
}

function eventModal(ev, s) {
  const def = ev.def;
  const d = ev.data || {};
  const opts = def.options.map((o, i) => {
    const oCost = typeof o.cost === 'function' ? o.cost(d) : (o.cost || 0);
    const oLabel = typeof o.label === 'function' ? o.label(d) : o.label;
    const disabled = oCost && s.cash < oCost;
    return `<button class="event-option" data-act="resolve-event" data-choice="${i}" ${disabled ? 'disabled' : ''}>
      <span class="eo-num">${i + 1}</span>
      <span style="min-width:0"><span class="eo-label">${esc(oLabel)}</span><span class="eo-hint">${esc(o.hint || '')}</span></span>
      <span class="eo-cost">${oCost ? money(oCost) : 'Free'}</span>
    </button>`;
  }).join('');
  return modalShell({
    title: def.title,
    sub: `WEEK ${s.week} · A DECISION IS REQUIRED`,
    iconName: def.icon || 'bolt',
    close: false,
    body: `<p class="small" style="line-height:1.65;color:#c7ccd8;margin-bottom:18px">${esc(def.body(d))}</p>
      <div class="stack" style="gap:8px">${opts}</div>
      <div class="row mt-16 tiny dim">${icon('cash', 12)} Available cash: ${money(s.cash)}</div>`,
  });
}

function artistModal(id) {
  const s = G.getState();
  const a = G.findRosterArtist(id) || G.findArtist(id);
  if (!a) return '';
  const tracks = s.tracks.filter((t) => t.artistId === a.id && t.isPlayer).sort((x, y) => y.releaseWeek - x.releaseWeek);
  const status = G.artistStatus(a);
  const demoCount = s.demos.filter((d) => d.artistId === a.id).length;
  const isRoster = !!G.findRosterArtist(id);
  const weeks = a.contract?.weeksLeft ?? 0;
  return modalShell({
    title: a.name,
    sub: `${genreById(a.genre).name} · ${a.age} years old · ${esc(traitById(a.trait)?.name || '')}`,
    iconName: 'star',
    wide: true,
    body: `<div class="modal-hero">
      ${avatarHTML(a, 96)}
      <div class="grow"><div class="row wrap"><span class="pill brand">${esc(status.label)}</span><span class="pill">${Math.round(a.popularity)} popularity</span><span class="pill">${num(a.fans)} fans</span>${a.busyUntil > s.week ? `<span class="pill gold">${icon('bus', 10)} On tour</span>` : ''}</div>
      <div class="small muted mt-8" style="line-height:1.55">${esc(traitById(a.trait)?.desc || 'An artist with something to prove.')}</div>
      </div>
    </div>
    <div class="preview-grid mt-16" style="grid-template-columns:repeat(4,1fr)">
      <div class="preview-cell"><div class="l">Vocal skill</div><div class="v">${Math.round(a.skill)}</div></div>
      <div class="preview-cell"><div class="l">Songwriting</div><div class="v">${Math.round(a.songwriting)}</div></div>
      <div class="preview-cell"><div class="l">Charisma</div><div class="v">${Math.round(a.charisma)}</div></div>
      <div class="preview-cell"><div class="l">Work ethic</div><div class="v">${Math.round(a.workEthic)}</div></div>
    </div>
    <div class="grid-2 mt-16" style="gap:18px">
      <div>
        <div class="tiny dim mb-8">ARTIST HEALTH</div>
        <div class="stack" style="gap:9px">
          ${meter('Morale', a.morale, 100, a.morale < 35 ? 'gold' : 'green')}
          ${meter('Loyalty', a.loyalty, 100, 'blue')}
          ${meter('Popularity', a.popularity, 100, 'violet')}
          ${meter('Ego', a.ego, 100, 'gold')}
        </div>
        <div class="divider"></div>
        <div class="between"><span class="small muted">Weekly streams</span><b>${num(G.artistWeekly(a.id))}</b></div>
        <div class="between mt-8"><span class="small muted">Lifetime streams</span><b>${num(a.totalStreams || 0)}</b></div>
        <div class="between mt-8"><span class="small muted">Songs in vault</span><b>${demoCount}</b></div>
      </div>
      <div>
        <div class="tiny dim mb-8">CONTRACT</div>
        <div class="preview-panel">
          <div class="between"><span class="small muted">Weekly salary</span><b>${money(a.contract?.salary || 0)}</b></div>
          <div class="between mt-8"><span class="small muted">Royalty rate</span><b>${((a.contract?.royalty || 0) * 100).toFixed(0)}%</b></div>
          <div class="between mt-8"><span class="small muted">Weeks remaining</span><b class="${weeks <= 6 ? 'red' : ''}">${weeks}</b></div>
          <div class="between mt-8"><span class="small muted">Advance paid</span><b>${money(a.contract ? Math.round(a.advanceDemand || 0) : 0)}</b></div>
        </div>
        <div class="tiny dim mt-8">Renewals are available in the final 12 weeks or when the contract expires.</div>
      </div>
    </div>
    <div class="section-head" style="margin:20px 0 8px"><div class="section-title" style="font-size:14px">Discography</div><span class="pill">${tracks.length}</span></div>
    ${tracks.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>Record</th><th>Released</th><th class="num">Weekly</th><th class="num">Lifetime</th><th class="num">Peak</th></tr></thead><tbody>${tracks.slice(0, 6).map((t) => `<tr><td style="display:flex;gap:8px;align-items:center">${coverHTML(t.cover, t.title, 'sm')}<span>${esc(t.title)}</span></td><td class="dim">Wk ${t.releaseWeek}</td><td class="num">${num(t.weekly)}</td><td class="num">${num(t.streamsTotal)}</td><td class="num">${t.chartPeak ? '#' + t.chartPeak : '—'}</td></tr>`).join('')}</tbody></table></div>` : `<div class="tiny dim">No released music yet. Book a session and get something in the vault.</div>`}
    `,
    foot: `${isRoster ? `
      <button class="btn btn-ghost" data-act="confirm-release-artist" data-id="${a.id}">Let go</button>
      <button class="btn" data-act="confirm-renew" data-id="${a.id}" ${weeks > 12 ? 'disabled' : ''}>${icon('refresh', 13)} Renew</button>
      <button class="btn" data-act="open-tour" data-id="${a.id}" ${a.busyUntil > s.week ? 'disabled' : ''}>${icon('bus', 13)} Tour</button>
      <button class="btn" data-act="open-campaign" data-type="social">${icon('megaphone', 13)} Promote</button>
      <button class="btn btn-primary" data-act="open-record" data-id="${a.id}" ${a.busyUntil > s.week ? 'disabled' : ''}>${icon('mic', 13)} New session</button>
    ` : `<button class="btn btn-primary" data-act="open-sign" data-id="${a.id}">Negotiate contract</button>`}`,
  });
}

function signModal(id) {
  const s = G.getState();
  const a = s.prospects.find((x) => x.id === id);
  if (!a) return modalShell({ title: 'Artist unavailable', body: `<div class="empty"><b>They’ve already signed elsewhere.</b></div>`, foot: `<button class="btn" data-act="close">Close</button>` });
  const pkgs = G.contractPackages(a);
  const scouted = a.scouted;
  const stats = scouted
    ? [['Popularity', Math.round(a.popularity)], ['Vocal skill', Math.round(a.skill)], ['Songwriting', Math.round(a.songwriting)], ['Charisma', Math.round(a.charisma)]]
    : [['Popularity', Math.round(a.popularity)], ['Vocal skill', '??'], ['Songwriting', '??'], ['Charisma', '??']];
  return modalShell({
    title: 'Negotiate a signing',
    sub: `${a.name} · ${genreById(a.genre).name} · ${a.age}`,
    iconName: 'pen',
    wide: true,
    body: `<div class="modal-hero">${avatarHTML(a, 80)}<div class="grow"><h2>${esc(a.name)}</h2><div class="row wrap mt-8"><span class="pill brand">${scouted ? 'Scouted' : 'Unscouted'}</span><span class="pill">${esc(traitById(a.trait)?.name || '')}</span><span class="pill">${num(a.fans)} fans</span></div><div class="small muted mt-8">${esc(traitById(a.trait)?.desc || '')}</div></div></div>
    <div class="preview-grid mt-16" style="grid-template-columns:repeat(4,1fr)">${stats.map(([l, v]) => `<div class="preview-cell"><div class="l">${l}</div><div class="v">${v}</div></div>`).join('')}</div>
    ${!scouted ? `<div class="card mt-16" style="padding:12px;border-style:dashed;background:transparent"><div class="between"><div><b class="small">Stats are hidden</b><div class="tiny dim">Scout this artist to see their real ceiling before you commit.</div></div><button class="btn btn-sm" data-act="scout" data-id="${a.id}">Scout · ${money(G.scoutPrice())}</button></div></div>` : ''}
    <div class="section-head" style="margin:20px 0 10px"><div class="section-title" style="font-size:14px">Choose a contract package</div><div class="tiny dim">Acceptance depends on reputation, ego and terms</div></div>
    <div class="stack" style="gap:9px">${pkgs.map((p) => {
      const chanceVal = G.signChance(a, p);
      const can = s.cash >= p.advance;
      return `<div class="preview-panel" style="padding:13px">
        <div class="between"><div><b class="small">${esc(p.name)}</b> <span class="pill ${chanceVal > 0.65 ? 'green' : chanceVal > 0.35 ? 'gold' : 'red'}">${Math.round(chanceVal * 100)}% accept</span><div class="tiny dim" style="margin-top:2px">${esc(p.desc)}</div></div><div class="campaign-cost">${money(p.advance)}</div></div>
        <div class="row wrap mt-8"><span class="tiny dim">${money(p.salary)}/wk</span><span class="tiny dim">${Math.round(p.royalty * 100)}% royalty</span><span class="tiny dim">${p.weeks} weeks</span></div>
        <button class="btn btn-sm ${p.id === 'standard' ? 'btn-primary' : ''} mt-8 btn-block" data-act="sign" data-id="${a.id}" data-package="${p.id}" ${can ? '' : 'disabled'}>${can ? 'Offer this deal' : 'Not enough cash'}</button>
      </div>`;
    }).join('')}</div>`,
    foot: `<button class="btn btn-ghost" data-act="close">Walk away</button>`,
  });
}

function recordModal(artistId) {
  const s = G.getState();
  if (!s.roster.length) return modalShell({ title: 'Studio is empty', sub: 'You need an artist first', body: `<div class="empty"><div class="empty-icon">${icon('users', 20)}</div><b>No artists signed</b><p>Sign an artist before booking studio time.</p><button class="btn btn-primary mt-12" data-act="close">Go to roster</button></div>`, foot: '' });
  const artist = G.findRosterArtist(artistId) || s.roster.find((a) => a.busyUntil <= s.week) || s.roster[0];
  const producers = s.staff.filter((x) => x.role === 'producer');
  const writers = s.staff.filter((x) => x.role === 'songwriter');
  const features = s.roster.filter((a) => a.id !== artist.id);
  const studios = s.studios;
  const demo = { artistId: artist.id, genre: artist.genre, producerId: producers[0]?.id || 'self', writerId: writers[0]?.id || 'self', featureId: 'none', studioId: studios[0]?.id, budget: 'standard', focus: 'balanced' };
  return modalShell({
    title: 'Book a studio session',
    sub: 'Producer, songwriter, studio and budget all shape the record',
    iconName: 'mic',
    wide: true,
    body: `<form id="song-form" onsubmit="return false">
      <div class="form-grid">
        <div class="field"><label>Artist</label><select data-field="artist">${s.roster.map((a) => `<option value="${a.id}" ${a.id === artist.id ? 'selected' : ''} ${a.busyUntil > s.week ? 'disabled' : ''}>${esc(a.name)}${a.busyUntil > s.week ? ' · touring' : ''}</option>`).join('')}</select></div>
        <div class="field"><label>Genre</label><select data-field="genre">${GENRES.map((g) => `<option value="${g.id}" ${g.id === artist.genre ? 'selected' : ''}>${esc(g.name)}${g.id === s.trendState.hot ? ' · hot' : ''}</option>`).join('')}</select><div class="hint">Match the artist’s genre for a bonus.</div></div>
        <div class="field full"><label>Working title (optional)</label><input type="text" data-field="title" maxlength="36" placeholder="Leave blank and the team will name it" /></div>
        <div class="field"><label>Producer</label><select data-field="producer"><option value="self">Self-produced (artist)</option>${producers.map((p) => `<option value="${p.id}">${esc(p.name)} · ${p.skill} skill</option>`).join('')}</select></div>
        <div class="field"><label>Songwriter</label><select data-field="writer"><option value="self">Artist writes</option>${writers.map((p) => `<option value="${p.id}">${esc(p.name)} · ${p.skill} skill</option>`).join('')}</select></div>
        <div class="field"><label>Featured artist</label><select data-field="feature"><option value="none">No feature</option>${features.map((p) => `<option value="${p.id}" ${p.busyUntil > s.week ? 'disabled' : ''}>${esc(p.name)} · ${Math.round(p.popularity)} pop${p.busyUntil > s.week ? ' · touring' : ''}</option>`).join('')}</select></div>
        <div class="field"><label>Studio</label><select data-field="studio">${studios.map((st) => `<option value="${st.id}">${esc(st.name)} · Q${Math.round(G.studioQuality(st.id))}</option>`).join('')}</select></div>
        <div class="field"><label>Production budget</label><select data-field="budget">${Object.entries(BUDGETS).map(([k, b]) => `<option value="${k}" ${k === 'standard' ? 'selected' : ''}>${b.name} · ${money(b.cost)} (+${b.quality} quality)</option>`).join('')}</select></div>
        <div class="field"><label>Creative focus</label><select data-field="focus">${Object.entries(FOCUS).map(([k, f]) => `<option value="${k}" ${k === 'balanced' ? 'selected' : ''}>${f.name} — ${f.desc}</option>`).join('')}</select></div>
      </div>
      <div class="preview-panel mt-16" style="margin-top:16px">
        <div class="between mb-8"><b class="small">Session projection</b><span class="tiny dim">Estimate · actual results vary</span></div>
        <div class="preview-grid" id="song-preview">${songPreviewCells(demo)}</div>
      </div>
    </form>`,
    foot: `<button class="btn btn-ghost" data-act="close">Cancel</button><button class="btn btn-primary" data-act="record">${icon('mic', 14)} Record song · <span id="song-cost">${money(G.previewSong(demo)?.cost || 0)}</span></button>`,
  });
}
function songPreviewCells(payload) {
  const p = G.previewSong(payload);
  if (!p) return '';
  return `<div class="preview-cell"><div class="l">Quality</div><div class="v">${p.quality}</div></div>
    <div class="preview-cell"><div class="l">Commercial</div><div class="v">${p.commercial}</div></div>
    <div class="preview-cell"><div class="l">Peak / week</div><div class="v" style="font-size:13px">${num(p.peak)}</div></div>
    <div class="preview-cell"><div class="l">Studio Q</div><div class="v">${p.studioQ}</div></div>
    <div class="preview-cell"><div class="l">Session cost</div><div class="v" style="font-size:13px">${money(p.cost)}</div></div>`;
}
function updateSongPreview() {
  const form = document.getElementById('song-form');
  if (!form) return;
  const payload = {
    artistId: readField('artist'), genre: readField('genre'), producerId: readField('producer'), writerId: readField('writer'),
    featureId: readField('feature'), studioId: readField('studio'), budget: readField('budget'), focus: readField('focus'),
  };
  const el = document.getElementById('song-preview');
  if (el) el.innerHTML = songPreviewCells(payload);
  const cost = document.getElementById('song-cost');
  if (cost) cost.textContent = money(G.previewSong(payload)?.cost || 0);
}

function releaseModal(data = {}) {
  const s = G.getState();
  if (!s.roster.length) return modalShell({ title: 'No releases yet', body: `<div class="empty"><b>You need an artist first.</b></div>`, foot: `<button class="btn" data-act="close">Close</button>` });
  const artist = G.findRosterArtist(data.id) || s.roster[0];
  const demos = s.demos.filter((d) => d.artistId === artist.id && !d.releaseId);
  const initial = data.demo ? [data.demo] : (demos[0] ? [demos[0].id] : []);
  const typeGuess = data.demo ? 'single' : (demos.length >= 5 ? 'album' : demos.length >= 2 ? 'ep' : 'single');
  return modalShell({
    title: 'Plan a release',
    sub: `${artist.name} · ${demos.length} unreleased song${demos.length === 1 ? '' : 's'} in the vault`,
    iconName: 'music',
    wide: true,
    body: `<form id="release-form" onsubmit="return false">
      <div class="form-grid">
        <div class="field"><label>Artist</label><select data-field="artist" data-rerender="1">${s.roster.map((a) => `<option value="${a.id}" ${a.id === artist.id ? 'selected' : ''}>${esc(a.name)} · ${s.demos.filter((d) => d.artistId === a.id && !d.releaseId).length} in vault</option>`).join('')}</select></div>
        <div class="field"><label>Release type</label><select data-field="type"><option value="single" ${typeGuess === 'single' ? 'selected' : ''}>Single</option><option value="ep" ${typeGuess === 'ep' ? 'selected' : ''}>EP (2–5 songs)</option><option value="album" ${typeGuess === 'album' ? 'selected' : ''}>Album (5–12 songs)</option></select><div class="hint" id="release-type-note">Pick the format. All songs share one release date.</div></div>
        <div class="field full"><label>Release title</label><input type="text" data-field="title" maxlength="40" placeholder="Leave blank to use the lead track title" /></div>
      </div>
      <div class="between mt-16 mb-8"><span class="tiny dim">SELECT SONGS · <b id="release-count" class="mono">${initial.length}</b> selected</span><span class="tiny dim">${demos.length} available</span></div>
      ${demos.length ? `<div class="check-list">${demos.map((d) => `<label class="check-row ${initial.includes(d.id) ? 'selected' : ''}"><input type="checkbox" data-demo="1" value="${d.id}" ${initial.includes(d.id) ? 'checked' : ''} /><span class="grow"><span class="cr-title">${esc(d.title)}</span><span class="cr-sub">${esc(genreById(d.genre).name)} · Q${d.quality} · C${d.commercial} · ${money(d.cost)} session</span></span>${coverHTML(d.cover, d.title, 'sm')}</label>`).join('')}</div>` : `<div class="empty" style="padding:18px"><b>No unreleased songs</b><p>Record a session first, then plan the release.</p><button class="btn btn-primary mt-12" data-act="open-record" data-id="${artist.id}">Book a session</button></div>`}
      <div class="form-grid mt-16">
        <div class="field"><label>Release timing</label><select data-field="offset"><option value="0">This week · out now</option>${[1, 2, 3, 4, 5, 6, 8].map((n) => `<option value="${n}">In ${n} week${n > 1 ? 's' : ''} · wk ${s.week + n}</option>`).join('')}</select></div>
        <div class="field"><label>Marketing budget</label><input type="range" id="release-marketing" data-field="marketing" min="0" max="100000" step="5000" value="${Math.min(20000, Math.round(s.cash * 0.12 / 5000) * 5000)}" /><div class="between tiny"><span class="dim">Organic</span><b id="release-marketing-out">${money(Math.min(20000, Math.round(s.cash * 0.12 / 5000) * 5000))}</b><span class="dim">Full campaign</span></div></div>
      </div>
    </form>`,
    foot: `<button class="btn btn-ghost" data-act="close">Cancel</button><button class="btn btn-primary" data-act="create-release" ${demos.length ? '' : 'disabled'}>${icon('calendar', 14)} Create release plan</button>`,
  });
}

function campaignModal(type) {
  const s = G.getState();
  const def = campaignById(type);
  if (!def) return '';
  const targets = G.campaignTargets(type);
  return modalShell({
    title: def.name,
    sub: `${money(def.cost)} · runs ${def.weeks} weeks`,
    iconName: def.icon,
    body: `<p class="small muted" style="line-height:1.6">${esc(def.desc)}</p>
      <div class="preview-panel mt-16"><div class="between"><span class="small muted">Expected effect</span><b class="small">${esc(def.effect)}</b></div>
      <div class="between mt-8"><span class="small muted">Upfront cost</span><b>${money(def.cost)}</b></div>
      <div class="between mt-8"><span class="small muted">Run time</span><b>${def.weeks} weeks</b></div></div>
      ${targets.length ? `<div class="field mt-16"><label>Campaign target</label><select data-field="target">${targets.map((t) => `<option value="${t.id}">${esc(t.name)} · ${esc(t.sub || '')}</option>`).join('')}</select></div>` : `<div class="empty mt-16" style="padding:18px"><b>No valid target</b><p>${def.target === 'release' ? 'You need an active or scheduled release first.' : 'Sign an artist first.'}</p></div>`}`,
    foot: `<button class="btn btn-ghost" data-act="close">Cancel</button><button class="btn btn-primary" data-act="start-campaign" data-type="${type}" ${targets.length && s.cash >= def.cost ? '' : 'disabled'}>${icon('megaphone', 14)} Launch · ${money(def.cost)}</button>`,
  });
}

function tourModal(artistId, venueId) {
  const s = G.getState();
  if (!s.roster.length) return modalShell({ title: 'No tour', body: `<div class="empty"><b>Sign an artist first.</b></div>`, foot: `<button class="btn" data-act="close">Close</button>` });
  const artist = G.findRosterArtist(artistId) || s.roster.find((a) => a.busyUntil <= s.week) || s.roster[0];
  const defaultVenue = venueById(venueId) || VENUES.filter((v) => artist.popularity >= v.minPop).slice(-1)[0] || VENUES[0];
  const v = defaultVenue;
  const unlocked = VENUES.some((vv) => artist.popularity >= vv.minPop);
  const nextVenue = VENUES.find((vv) => artist.popularity < vv.minPop);
  return modalShell({
    title: 'Plan a tour',
    sub: `${artist.name} · choose the rooms, the price and the production`,
    iconName: 'bus',
    wide: true,
    body: `<form id="tour-form" onsubmit="return false">
      <div class="form-grid">
        <div class="field"><label>Artist</label><select data-field="artist">${s.roster.map((a) => `<option value="${a.id}" ${a.id === artist.id ? 'selected' : ''}>${esc(a.name)} · ${Math.round(a.popularity)} pop${a.busyUntil > s.week ? ' · touring' : ''}</option>`).join('')}</select></div>
        <div class="field"><label>Venue tier</label><select data-field="venue">${VENUES.map((vv) => `<option value="${vv.id}" ${vv.id === v.id ? 'selected' : ''} ${artist.popularity >= vv.minPop ? '' : 'disabled'}>${vv.name} · ${num(vv.cap)} cap${artist.popularity >= vv.minPop ? '' : ` · needs ${vv.minPop} pop`}</option>`).join('')}</select></div>
        <div class="field"><label>Number of dates</label><select data-field="dates"><option value="4">4 dates</option><option value="6">6 dates</option><option value="8" selected>8 dates</option><option value="12">12 dates</option><option value="16">16 dates</option></select></div>
        <div class="field"><label>Ticket price · <span class="range-val"><span data-out="price">${v.ticket}</span></span></label><input type="range" data-field="price" min="12" max="180" step="2" value="${v.ticket}" data-out="price" /><div class="between tiny"><span class="dim">Cheaper / fuller</span><span class="dim">Premium</span></div></div>
        <div class="field"><label>Stage production</label><select data-field="production"><option value="0">Basic · lean costs</option><option value="1" selected>Standard · balanced</option><option value="2">Immersive · premium demand</option></select></div>
        <div class="field"><label>Tour marketing</label><select data-field="marketing"><option value="0">None</option><option value="10000">$10K · local push</option><option value="30000">$30K · regional push</option><option value="60000">$60K · national campaign</option></select></div>
      </div>
      <div class="preview-panel mt-16" style="margin-top:16px"><div class="between mb-8"><b class="small">Tour economics</b><span class="tiny dim">Estimated · demand varies</span></div><div class="preview-grid" id="tour-preview">${tourPreviewCells({ artistId: artist.id, venueId: v.id, dates: 8, price: v.ticket, production: 1, marketing: 0 })}</div></div>
      <div class="tiny ${unlocked ? 'dim' : 'gold'} mt-12" id="tour-hint">${unlocked ? 'Rooms unlock as the artist grows. Bigger rooms mean bigger guarantees — and bigger risk.' : `Popularity too low to tour. Reach ${nextVenue.minPop} popularity to unlock ${nextVenue.name} (currently ${Math.round(artist.popularity)}).`}</div>
    </form>`,
    foot: `<button class="btn btn-ghost" data-act="close">Cancel</button><button class="btn btn-primary" id="tour-announce" data-act="plan-tour" ${unlocked ? '' : 'disabled'}>${icon('bus', 14)} Announce tour</button>`,
  });
}
function tourPreviewCells(payload) {
  const p = G.previewTour(payload);
  if (!p) return '';
  return `<div class="preview-cell"><div class="l">Fill rate</div><div class="v">${Math.round(p.fill * 100)}%</div></div>
    <div class="preview-cell"><div class="l">Avg attendance</div><div class="v" style="font-size:13px">${num(p.attendance)}</div></div>
    <div class="preview-cell"><div class="l">Gross / night</div><div class="v" style="font-size:13px">${money(p.perShow)}</div></div>
    <div class="preview-cell"><div class="l">Total net</div><div class="v ${p.profit >= 0 ? 'green' : 'red'}" style="font-size:13px">${money(p.profit)}</div></div>
    <div class="preview-cell"><div class="l">Tour length</div><div class="v">${p.weeks}w</div></div>`;
}
function updateTourPreview() {
  const form = document.getElementById('tour-form');
  if (!form) return;
  const artist = G.findRosterArtist(readField('artist'));
  const venueSelect = form.querySelector('[data-field="venue"]');
  if (artist && venueSelect) {
    const current = venueSelect.value;
    const currentOk = VENUES.some((vv) => vv.id === current && artist.popularity >= vv.minPop);
    const target = currentOk ? current : (VENUES.filter((vv) => artist.popularity >= vv.minPop).slice(-1)[0]?.id || VENUES[0].id);
    venueSelect.innerHTML = VENUES.map((vv) => `<option value="${vv.id}" ${vv.id === target ? 'selected' : ''} ${artist.popularity >= vv.minPop ? '' : 'disabled'}>${vv.name} · ${num(vv.cap)} cap${artist.popularity >= vv.minPop ? '' : ` · needs ${vv.minPop} pop`}</option>`).join('');
  }
  const payload = {
    artistId: readField('artist'), venueId: readField('venue'), dates: Number(readField('dates')),
    price: Number(readField('price')), production: Number(readField('production')), marketing: Number(readField('marketing')),
  };
  const el = document.getElementById('tour-preview');
  if (el) el.innerHTML = tourPreviewCells(payload);
  const out = document.querySelector('#modal-root [data-out="price"]');
  if (out) out.textContent = payload.price;
  const unlocked = artist && VENUES.some((vv) => artist.popularity >= vv.minPop);
  const announce = document.getElementById('tour-announce');
  if (announce) announce.disabled = !unlocked;
  const hint = document.getElementById('tour-hint');
  if (hint && artist) {
    const next = VENUES.find((vv) => artist.popularity < vv.minPop);
    hint.classList.toggle('dim', !!unlocked);
    hint.classList.toggle('gold', !unlocked);
    hint.textContent = unlocked
      ? 'Rooms unlock as the artist grows. Bigger rooms mean bigger guarantees — and bigger risk.'
      : `Popularity too low to tour. Reach ${next.minPop} popularity to unlock ${next.name} (currently ${Math.round(artist.popularity)}).`;
  }
}

function brandModal(data = {}) {
  const s = G.getState();
  const label = { ...s.label, ...data };
  return modalShell({
    title: 'Brand the label',
    sub: 'A strong identity is part of the business',
    iconName: 'pen',
    body: `<div class="logo-preview" id="brand-logo-preview">${logoSVG(label, 58)}<div><div class="artist-name" id="brand-name-preview">${esc(label.name)}</div><div class="tiny dim">${esc(label.tagline || 'Independent. Uncompromising.')}</div><div class="tiny" style="color:${label.color};margin-top:3px">${esc(genreById(label.genre).name)} · ${esc(TIERS[s.tier].name)}</div></div></div>
    <form id="brand-form" onsubmit="return false" class="mt-16">
      <div class="form-grid">
        <div class="field"><label>Label name</label><input type="text" data-field="name" maxlength="28" value="${esc(label.name)}" id="brand-name-input" /></div>
        <div class="field"><label>Monogram (2 letters)</label><input type="text" data-field="initials" maxlength="2" value="${esc(label.initials)}" id="brand-initials-input" /></div>
        <div class="field full"><label>Tagline</label><input type="text" data-field="tagline" maxlength="70" value="${esc(label.tagline || '')}" id="brand-tagline-input" /></div>
        <div class="field"><label>Focus genre</label><select data-field="genre">${GENRES.map((g) => `<option value="${g.id}" ${g.id === label.genre ? 'selected' : ''}>${g.name}</option>`).join('')}</select></div>
        <div class="field"><label>Brand colour</label><div class="swatches">${BRAND_COLORS.map((c) => `<button type="button" class="swatch-btn ${c === label.color ? 'active' : ''}" style="background:${c}" data-act="brand-color" data-color="${c}"></button>`).join('')}</div><input type="hidden" data-field="color" value="${label.color}" /></div>
        <div class="field full"><label>Logo mark</label><div class="logo-options">${LOGO_SHAPES.map((l) => `<button type="button" class="logo-opt ${l.id === label.logoShape ? 'active' : ''}" data-act="brand-shape" data-shape="${l.id}">${logoSVG({ ...label, logoShape: l.id }, 30)}</button>`).join('')}</div><input type="hidden" data-field="logoShape" value="${label.logoShape}" /></div>
      </div>
    </form>`,
    foot: `<button class="btn btn-ghost" data-act="close">Cancel</button><button class="btn btn-primary" data-act="save-brand">${icon('check', 14)} Save branding</button>`,
  });
}
function bindBrandPreview() {
  const name = document.getElementById('brand-name-input');
  if (!name) return;
  const update = () => {
    const color = document.querySelector('#modal-root [data-field="color"]')?.value || '#ff2e63';
    const shape = document.querySelector('#modal-root [data-field="logoShape"]')?.value || 'vinyl';
    const initials = (document.getElementById('brand-initials-input')?.value || '').slice(0, 2).toUpperCase() || 'ME';
    const tagline = document.getElementById('brand-tagline-input')?.value || '';
    const el = document.getElementById('brand-logo-preview');
    if (el) el.innerHTML = `${logoSVG({ color, logoShape: shape, initials }, 58)}<div><div class="artist-name">${esc(name.value || 'Your label')}</div><div class="tiny dim">${esc(tagline || 'Independent. Uncompromising.')}</div></div>`;
    const np = document.getElementById('brand-name-preview');
    if (np) np.textContent = name.value;
  };
  let initialsTouched = false;
  name.addEventListener('input', () => {
    if (!initialsTouched) {
      const initialsEl = document.getElementById('brand-initials-input');
      if (initialsEl) initialsEl.value = G.brandInitials(name.value);
    }
    update();
  });
  document.getElementById('brand-initials-input')?.addEventListener('input', () => { initialsTouched = true; update(); });
  document.getElementById('brand-tagline-input')?.addEventListener('input', update);}

function equipmentModal(studioId) {
  const s = G.getState();
  const st = s.studios.find((x) => x.id === studioId);
  if (!st) return '';
  return modalShell({
    title: 'Studio equipment',
    sub: `${st.name} · quality ${Math.round(G.studioQuality(st.id))}`,
    iconName: 'sliders',
    wide: true,
    body: `<div class="equip-grid">${EQUIPMENT.map((e) => {
      const owned = (st.equipment || []).includes(e.id);
      return `<div class="equip ${owned ? 'owned' : ''}" style="${owned ? 'border-color:rgba(74,222,128,.3);background:rgba(74,222,128,.04)' : ''}">
        <div class="between"><b>${esc(e.name)}</b>${owned ? `<span class="pill green">Installed</span>` : `<span class="tiny gold">+${e.quality} Q</span>`}</div>
        <div class="tiny dim">${esc(e.desc)}</div>
        <div class="between"><span class="tiny dim">${money(e.cost)}</span>${owned ? '' : `<button class="btn btn-sm" data-act="buy-equipment" data-id="${e.id}" data-studio="${st.id}" ${s.cash < e.cost ? 'disabled' : ''}>Install</button>`}</div>
      </div>`;
    }).join('')}</div>`,
    foot: `<button class="btn" data-act="close">Close</button>`,
  });
}

function releaseDetailModal(id) {
  const s = G.getState();
  const r = G.findRelease(id);
  if (!r) return '';
  const tracks = s.tracks.filter((t) => t.releaseKey === r.id).sort((a, b) => b.weekly - a.weekly);
  const total = sum(tracks, (t) => t.streamsTotal || 0);
  return modalShell({
    title: r.title,
    sub: `${r.artistName} · ${RELEASE_TYPES[r.type].name} · ${r.status === 'scheduled' ? 'Scheduled week ' + r.releaseWeek : 'Released week ' + (r.launchWeek || r.releaseWeek)}`,
    iconName: 'music',
    wide: true,
    body: `<div class="modal-hero">${coverHTML(r.cover, r.title, 'xl')}<div class="grow"><div class="row wrap"><span class="pill ${r.status === 'scheduled' ? 'blue' : 'green'}">${r.status}</span><span class="pill">${money(r.marketing || 0)} marketing</span><span class="pill">${tracks.length} tracks</span></div><div class="preview-grid mt-16" style="grid-template-columns:repeat(3,1fr)"><div class="preview-cell"><div class="l">Weekly streams</div><div class="v" style="font-size:14px">${num(sum(tracks, (t) => t.weekly || 0))}</div></div><div class="preview-cell"><div class="l">Lifetime</div><div class="v" style="font-size:14px">${num(total)}</div></div><div class="preview-cell"><div class="l">Revenue</div><div class="v" style="font-size:14px">${money(sum(tracks, (t) => t.revenue || 0))}</div></div></div></div></div>
    <div class="section-head" style="margin:20px 0 8px"><div class="section-title" style="font-size:14px">Tracks</div></div>
    <div class="table-wrap"><table class="data-table"><thead><tr><th>Track</th><th class="num">Q</th><th class="num">Weekly</th><th class="num">Lifetime</th><th class="num">Peak</th></tr></thead><tbody>${(tracks.length ? tracks : r.demoIds.map((did) => G.findDemo(did)).filter(Boolean)).map((t) => `<tr><td>${esc(t.title)}</td><td class="num">${t.quality}</td><td class="num">${t.weekly ? num(t.weekly) : '—'}</td><td class="num">${t.streamsTotal ? num(t.streamsTotal) : '—'}</td><td class="num">${t.chartPeak ? '#' + t.chartPeak : '—'}</td></tr>`).join('')}</tbody></table></div>
    ${r.status === 'scheduled' ? `<div class="tiny dim mt-12">Marketing spend is committed. Cancelling returns the songs to the vault but does not refund spend.</div>` : ''}`,
    foot: `${r.status === 'scheduled' ? `<button class="btn btn-danger" data-act="confirm-cancel-release" data-id="${r.id}">Cancel release</button>` : ''}<button class="btn" data-act="close">Close</button>`,
  });
}

function trackModal(id) {
  const s = G.getState();
  const t = G.findTrack(id);
  if (!t) return '';
  if (t.isPlayer && t.releaseKey) {
    const r = G.findRelease(t.releaseKey);
    if (r) return releaseDetailModal(r.id);
  }
  return modalShell({
    title: t.title,
    sub: `${t.artistName} · ${t.labelName} · ${genreById(t.genre).name}`,
    iconName: 'music',
    body: `<div class="modal-hero">${coverHTML(t.cover, t.title, 'xl')}<div class="grow"><div class="preview-grid" style="grid-template-columns:1fr 1fr"><div class="preview-cell"><div class="l">Weekly streams</div><div class="v" style="font-size:14px">${num(t.weekly)}</div></div><div class="preview-cell"><div class="l">Lifetime</div><div class="v" style="font-size:14px">${num(t.streamsTotal)}</div></div><div class="preview-cell"><div class="l">Quality</div><div class="v">${t.quality}</div></div><div class="preview-cell"><div class="l">Peak</div><div class="v">${t.chartPeak ? '#' + t.chartPeak : '—'}</div></div></div></div></div>`,
    foot: `<button class="btn" data-act="close">Close</button>`,
  });
}

function confirmModal(data) {
  return modalShell({
    title: data.title || 'Confirm',
    sub: data.sub || '',
    iconName: data.danger ? 'alert' : 'alert',
    body: `<p class="small muted" style="line-height:1.65">${esc(data.body || '')}</p>${data.extra || ''}`,
    foot: `<button class="btn btn-ghost" data-act="close">Cancel</button><button class="btn ${data.danger ? 'btn-danger' : 'btn-primary'}" data-act="do-confirm">${esc(data.label || 'Confirm')}</button>`,
  });
}

function loanModal() {
  const s = G.getState();
  const max = [250000, 500000, 1200000, 2500000, 5000000, 9000000][s.tier] || 250000;
  const amounts = [50000, 100000, 250000, 500000, 1000000].filter((x) => x <= max);
  return modalShell({
    title: 'Borrow against the business',
    sub: `Credit line up to ${money(max)} · 9% APR · 104 weeks`,
    iconName: 'cash',
    body: `<p class="small muted" style="line-height:1.6">Loans put cash in the bank today. The weekly repayment is taken automatically, whether or not the records are selling.</p>
    <div class="stack mt-16" style="gap:8px">${amounts.map((a) => {
      const weeklyRate = 0.09 / 52;
      const payment = a * (weeklyRate / (1 - Math.pow(1 + weeklyRate, -104)));
      return `<div class="between preview-panel" style="padding:12px"><div><b>${money(a)}</b><div class="tiny dim">${money(payment)}/week for 104 weeks</div></div><button class="btn btn-sm" data-act="take-loan" data-amount="${a}">Borrow</button></div>`;
    }).join('')}</div>
    <div class="tiny dim mt-12">Outstanding debt: ${money(sum(s.loans, (l) => l.remaining))}</div>`,
    foot: `<button class="btn" data-act="close">Close</button>`,
  });
}

function helpModal() {
  return modalShell({
    title: 'How to run a label',
    sub: 'The five-loop rhythm of the game',
    iconName: 'book',
    wide: true,
    body: `<div class="stack" style="gap:14px">
      ${[
        ['1', 'Sign talent', 'Open the roster and scout free agents. Stats are hidden until you pay for a report. Negotiate a contract — advance, salary and royalty all matter.'],
        ['2', 'Record', 'Book a session in the Studio. Producer, songwriter, studio quality, budget and creative focus combine into song quality and commercial potential.'],
        ['3', 'Release & promote', 'Plan a single, EP or album. Pick a release week and marketing budget, then run campaigns to build first-week demand.'],
        ['4', 'Chart & get paid', 'Advance the week. Streams pay out, charts update, salaries and royalties are deducted. Chart position feeds next week’s streams.'],
        ['5', 'Scale the empire', 'Tour, upgrade studios, hire staff, buy buildings, sign bigger artists, acquire rivals and climb six tiers to a Global Music Empire.'],
      ].map(([n, t, d]) => `<div class="row" style="align-items:flex-start;gap:12px"><span class="eo-num" style="width:28px;height:28px;flex:none">${n}</span><div><b class="small">${t}</b><div class="small muted" style="margin-top:3px;line-height:1.55">${d}</div></div></div>`).join('')}
    </div>
    <div class="divider"></div>
    <div class="grid-2" style="gap:12px">
      <div class="preview-panel"><b class="small">Money rules</b><div class="tiny dim mt-4">Recording and marketing costs are paid upfront. Salaries, studio upkeep and distribution are weekly. Royalties come out of streaming revenue.</div></div>
      <div class="preview-panel"><b class="small">People rules</b><div class="tiny dim mt-4">Morale and loyalty drive renewals. Idle artists get restless. Successful releases, fair pay and management facilities keep them happy.</div></div>
      <div class="preview-panel"><b class="small">Chart rules</b><div class="tiny dim mt-4">Weekly streams determine chart position. A charting record gets a streaming boost. Top-10s and #1s build reputation fastest.</div></div>
      <div class="preview-panel"><b class="small">Risk rules</b><div class="tiny dim mt-4">Random events force decisions. Ignoring unhappy artists or running out of cash can end the run. Loans buy time, not success.</div></div>
    </div>`,
    foot: `<button class="btn btn-primary" data-act="close">Let’s build</button>`,
  });
}

function moreModal(s) {
  return modalShell({
    title: 'More',
    sub: 'Every part of the business',
    iconName: 'dots',
    body: `<div class="more-grid">${NAV.flatMap((g) => g.items).map((i) => `<button class="more-item ${ui.screen === i.id ? 'active' : ''}" data-screen="${i.id}">${icon(i.icon, 20)}<span>${i.label}</span></button>`).join('')}
      <button class="more-item" data-act="open-help">${icon('book', 20)}<span>How to play</span></button>
      <button class="more-item" data-act="open-brand">${icon('pen', 20)}<span>Branding</span></button>
    </div>
    <div class="preview-grid mt-16" style="grid-template-columns:repeat(2,1fr)">
      <div class="preview-cell"><div class="l">Cash</div><div class="v" style="font-size:15px">${money(s.cash)}</div></div>
      <div class="preview-cell"><div class="l">Reputation</div><div class="v" style="font-size:15px">${Math.round(s.reputation)} / 100</div></div>
      <div class="preview-cell"><div class="l">Roster</div><div class="v" style="font-size:15px">${s.roster.length} artist${s.roster.length === 1 ? '' : 's'}</div></div>
      <div class="preview-cell"><div class="l">Releases</div><div class="v" style="font-size:15px">${s.releases.length}</div></div>
    </div>
    <button class="btn btn-primary btn-block mt-16" data-act="advance">Advance week ${icon('arrow-right', 15)}</button>
    <div class="tiny dim mt-12" style="text-align:center">${esc(s.label.name)} · ${weekLabel(s.week).label} · ${money(s.cash)} cash</div>`,
    foot: `<button class="btn" data-act="close">Close</button>`,
  });
}

/* -------------------------------- actions --------------------------------- */
function handleAction(act, el) {
  const s = G.getState();
  if (!s && !['intro-color', 'intro-shape', 'intro-start'].includes(act)) { render(); return; }
  switch (act) {
    case 'advance': {
      const r = G.advanceWeek();
      if (r.error) showToast(r.error, 'error');
      else {
        const h = r.history;
        showToast(`Week ${r.week} closed · ${h.net >= 0 ? '+' : ''}${money(h.net)} net`, h.net >= 0 ? 'success' : 'error');
      }
      render();
      return;
    }
    case 'screen': setScreen(el.dataset.screen); return;
    case 'close': closeModal(); return;
    case 'open-more': openModal('more'); return;
    case 'open-help': openModal('help'); return;
    case 'open-artist': openModal('artist', { id: el.dataset.id }); return;
    case 'open-sign': openModal('sign', { id: el.dataset.id }); return;
    case 'open-record': openModal('record', { id: el.dataset.id }); return;
    case 'open-release': openModal('release', { id: el.dataset.id, demo: el.dataset.demo }); return;
    case 'open-campaign': openModal('campaign', { type: el.dataset.type }); return;
    case 'open-tour': openModal('tour', { artistId: el.dataset.id }); return;
    case 'open-tour-venue': openModal('tour', { venueId: el.dataset.id }); return;
    case 'open-brand': openModal('brand', { ...s.label }); return;
    case 'open-equipment': openModal('equipment', { id: el.dataset.id }); return;
    case 'open-release-detail': openModal('release-detail', { id: el.dataset.id }); return;
    case 'open-track': openModal('track', { id: el.dataset.id }); return;
    case 'open-loan': openModal('loan'); return;
    case 'open-event': render(); return;
    case 'focus-prospects': {
      const target = document.getElementById('prospects');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    case 'scout': {
      const r = G.scoutArtist(el.dataset.id);
      if (r.error) showToast(r.error, 'error'); else showToast('Scout report complete. Full stats unlocked.', 'success');
      render(); return;
    }
    case 'scout-all': {
      const r = G.scoutProspects();
      if (r.error) showToast(r.error, 'error'); else showToast('Auditions held. New talent reports added.', 'success');
      render(); return;
    }
    case 'sign': {
      const r = G.signArtist(el.dataset.id, el.dataset.package);
      if (r.error) { showToast(r.error, 'error'); render(); return; }
      if (r.rejected) { showToast(`They turned you down (${Math.round((r.chance || 0) * 100)}% chance). Improve the terms or your reputation.`, 'error'); render(); return; }
      showToast(`${r.artist.name} signed to ${s.label.name}.`, 'success');
      closeModal(); return;
    }
    case 'record': {
      const payload = {
        artistId: readField('artist'), genre: readField('genre'), title: readField('title'),
        producerId: readField('producer'), writerId: readField('writer'), featureId: readField('feature'),
        studioId: readField('studio'), budget: readField('budget'), focus: readField('focus'),
      };
      const r = G.recordSong(payload);
      if (r.error) { showToast(r.error, 'error'); return; }
      showToast(`“${r.demo.title}” recorded · quality ${r.demo.quality}. It’s in the vault.`, 'gold');
      closeModal(); return;
    }
    case 'create-release': {
      const type = readField('type');
      const demos = checkedDemos();
      const r = G.scheduleRelease({ artistId: readField('artist'), type, demoIds: demos, title: readField('title'), offset: Number(readField('offset')), marketing: Number(readField('marketing')) });
      if (r.error) { showToast(r.error, 'error'); return; }
      showToast(`“${r.release.title}” scheduled for week ${r.release.releaseWeek}.`, 'success');
      closeModal(); return;
    }
    case 'start-campaign': {
      const r = G.startCampaign({ type: el.dataset.type, targetId: readField('target') });
      if (r.error) { showToast(r.error, 'error'); return; }
      showToast(`${r.campaign.name} is live.`, 'success');
      closeModal(); return;
    }
    case 'plan-tour': {
      const r = G.planTour({ artistId: readField('artist'), venueId: readField('venue'), dates: Number(readField('dates')), price: Number(readField('price')), production: Number(readField('production')), marketing: Number(readField('marketing')) });
      if (r.error) { showToast(r.error, 'error'); return; }
      showToast(`${r.tour.artistName} is going on tour.`, 'gold');
      closeModal(); return;
    }
    case 'save-brand': {
      const payload = { name: readField('name'), initials: readField('initials'), tagline: readField('tagline'), color: readField('color'), logoShape: readField('logoShape'), genre: readField('genre') };
      const r = G.updateBrand(payload);
      if (r.error) showToast(r.error, 'error'); else showToast('Branding updated.', 'success');
      closeModal(); return;
    }
    case 'brand-color': {
      const input = document.querySelector('#modal-root [data-field="color"]');
      if (input) input.value = el.dataset.color;
      document.querySelectorAll('#modal-root .swatch-btn').forEach((b) => b.classList.toggle('active', b.dataset.color === el.dataset.color));
      document.querySelectorAll('#modal-root .logo-opt').forEach((b) => b.classList.remove('active'));
      bindBrandPreview();
      const preview = document.getElementById('brand-logo-preview');
      if (preview) {
        const name = document.getElementById('brand-name-input')?.value || s.label.name;
        const initials = document.getElementById('brand-initials-input')?.value || s.label.initials;
        const shape = document.querySelector('#modal-root [data-field="logoShape"]')?.value || 'vinyl';
        preview.innerHTML = `${logoSVG({ color: el.dataset.color, logoShape: shape, initials }, 58)}<div><div class="artist-name">${esc(name)}</div><div class="tiny dim">${esc(document.getElementById('brand-tagline-input')?.value || '')}</div></div>`;
      }
      return;
    }
    case 'brand-shape': {
      const input = document.querySelector('#modal-root [data-field="logoShape"]');
      if (input) input.value = el.dataset.shape;
      document.querySelectorAll('#modal-root .logo-opt').forEach((b) => b.classList.toggle('active', b.dataset.shape === el.dataset.shape));
      const preview = document.getElementById('brand-logo-preview');
      if (preview) {
        const name = document.getElementById('brand-name-input')?.value || s.label.name;
        const initials = document.getElementById('brand-initials-input')?.value || s.label.initials;
        const color = document.querySelector('#modal-root [data-field="color"]')?.value || s.label.color;
        preview.innerHTML = `${logoSVG({ color, logoShape: el.dataset.shape, initials }, 58)}<div><div class="artist-name">${esc(name)}</div><div class="tiny dim">${esc(document.getElementById('brand-tagline-input')?.value || '')}</div></div>`;
      }
      return;
    }
    case 'upgrade-studio': {
      const r = G.upgradeStudio(el.dataset.id);
      if (r.error) showToast(r.error, 'error'); else showToast('Studio upgraded. Better sessions from now on.', 'success');
      render(); return;
    }
    case 'build-studio': {
      const r = G.buildStudio();
      if (r.error) showToast(r.error, 'error'); else showToast(`${r.studio.name} is open for sessions.`, 'success');
      render(); return;
    }
    case 'buy-equipment': {
      const r = G.buyEquipment(el.dataset.studio, el.dataset.id);
      if (r.error) showToast(r.error, 'error'); else showToast('Equipment installed. Studio quality up.', 'success');
      render(); return;
    }
    case 'build-facility': {
      const r = G.buildFacility(el.dataset.id);
      if (r.error) showToast(r.error, 'error'); else showToast('Facility built. The business just got stronger.', 'success');
      render(); return;
    }
    case 'hire-staff': {
      const r = G.hireStaff(el.dataset.id);
      if (r.error) showToast(r.error, 'error'); else showToast('New hire joins the label.', 'success');
      render(); return;
    }
    case 'set-dist': {
      const r = G.setDistribution(el.dataset.id);
      if (r.error) showToast(r.error, 'error'); else showToast('Distribution deal changed.', 'success');
      render(); return;
    }
    case 'take-loan': {
      const r = G.takeLoan(Number(el.dataset.amount));
      if (r.error) showToast(r.error, 'error'); else showToast(`Loan approved: ${money(Number(el.dataset.amount))}.`, 'gold');
      closeModal(); return;
    }
    case 'repay-loan': {
      const r = G.repayLoan(el.dataset.id);
      if (r.error) showToast(r.error, 'error'); else showToast('Loan repaid. Debt down.', 'success');
      render(); return;
    }
    case 'chart-tab': ui.chartTab = el.dataset.tab; render(); return;
    case 'confirm-acquire': {
      const comp = s.competitors.find((c) => c.id === el.dataset.id);
      if (!comp) return;
      const cost = Math.round((comp.reputation * 42000 + comp.artists.length * 65000) / 1000) * 1000;
      openConfirm('Acquire ' + comp.name, `Buy the label for ${money(cost)}? You inherit ${comp.artists.length} artists and gain +3.2 reputation. Contracts transfer at their current salaries.`, 'acquire', { id: comp.id }, 'Acquire label');
      return;
    }
    case 'confirm-release-artist': {
      const a = G.findRosterArtist(el.dataset.id);
      if (!a) return;
      const severance = Math.round((a.contract?.salary || 0) * (a.contract?.weeksLeft || 0) * 0.5);
      openConfirm('Let ' + a.name + ' go?', `Paying out the contract costs ${money(severance)}. Their unreleased songs and scheduled releases will be cancelled. This hurts reputation.`, 'release-artist', { id: a.id }, 'Release artist', true);
      return;
    }
    case 'confirm-renew': {
      const a = G.findRosterArtist(el.dataset.id);
      if (!a) return;
      const demand = Math.round(a.salary * (1 + a.popularity / 260) / 10) * 10;
      openConfirm('Renew ' + a.name, `Offer a new 78-week deal at around ${money(demand)}/week. Acceptance depends on morale, loyalty and reputation.`, 'renew', { id: a.id }, 'Offer renewal');
      return;
    }
    case 'confirm-fire': {
      const st = G.findStaff(el.dataset.id);
      if (!st) return;
      openConfirm('Release ' + st.name, `Pay ${money(st.salary * 2)} severance and remove them from the team.`, 'fire-staff', { id: st.id }, 'Release staff', true);
      return;
    }
    case 'confirm-discard': {
      const d = G.findDemo(el.dataset.id);
      if (!d) return;
      openConfirm('Discard “' + d.title + '”?', 'This song will be deleted from the vault permanently. Session costs are not refunded.', 'discard-demo', { id: d.id }, 'Discard song', true);
      return;
    }
    case 'confirm-cancel-release': {
      const r = G.findRelease(el.dataset.id);
      if (!r) return;
      openConfirm('Cancel “' + r.title + '”?', 'The songs return to the vault. The marketing budget is not refunded.', 'cancel-release', { id: r.id }, 'Cancel release', true);
      return;
    }
    case 'confirm-reset': {
      openConfirm('Start over?', 'This deletes your current label, roster, catalog and progress from this browser. There is no undo.', 'hard-reset', {}, 'Delete and restart', true);
      return;
    }
    case 'do-confirm': {
      const d = ui.modal?.data;
      if (!d) return;
      closeModal();
      executeConfirmed(d.act, d.data || {});
      return;
    }
    case 'acquire': executeConfirmed('acquire', { id: el.dataset.id }); return;
    case 'resolve-event': {
      const r = G.resolveEvent(Number(el.dataset.choice));
      if (r.error) { showToast(r.error, 'error'); return; }
      if (r.message) showToast(r.message, 'gold', 4200);
      render(); return;
    }
    case 'intro-color': {
      ui.intro.color = el.dataset.color;
      document.querySelectorAll('.intro .swatch-btn').forEach((b) => b.classList.toggle('active', b.dataset.color === el.dataset.color));
      updateIntroLogo();
      return;
    }
    case 'intro-shape': {
      ui.intro.shape = el.dataset.shape;
      document.querySelectorAll('.intro .logo-opt').forEach((b) => b.classList.toggle('active', b.dataset.shape === el.dataset.shape));
      updateIntroLogo();
      return;
    }
    case 'intro-start': {
      const name = document.getElementById('intro-name')?.value?.trim() || 'Afterglow Records';
      const genre = document.getElementById('intro-genre')?.value || 'pop';
      const initials = name.split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
      G.createNewGame({ name, color: ui.intro.color, logoShape: ui.intro.shape, initials, founderGenre: genre });
      ui.screen = 'dashboard';
      render();
      showToast('The label is open. Sign your first artist and make a record.', 'gold', 5000);
      return;
    }
    case 'hard-reset': {
      G.clearSave();
      location.reload();
      return;
    }
    case 'refresh-staff-market': {
      G.refreshStaffMarket();
      showToast('Staff market refreshed.', 'success');
      render(); return;
    }
    case 'noop': return;
    default: return;
  }
}

function executeConfirmed(act, data) {
  let r;
  if (act === 'acquire') r = G.acquireLabel(data.id);
  else if (act === 'release-artist') r = G.releaseArtist(data.id);
  else if (act === 'renew') r = G.renewContract(data.id);
  else if (act === 'fire-staff') r = G.fireStaff(data.id);
  else if (act === 'discard-demo') r = G.discardDemo(data.id);
  else if (act === 'cancel-release') r = G.cancelRelease(data.id);
  else if (act === 'hard-reset') { G.clearSave(); location.reload(); return; }
  else return;
  if (r?.error) { showToast(r.error, 'error'); render(); return; }
  if (!r) { render(); return; }
  if (r.rejected) showToast('The offer was rejected. They want better terms.', 'error');
  else if (act === 'acquire') showToast(`Label acquired. ${r.cost ? money(r.cost) + ' paid.' : ''}`, 'gold');
  else if (act === 'release-artist') showToast('Artist released from contract.', 'info');
  else if (act === 'renew') showToast('Contract renewed.', 'success');
  else if (act === 'fire-staff') showToast('Staff member released.', 'info');
  else if (act === 'discard-demo') showToast('Song discarded.', 'info');
  else if (act === 'cancel-release') showToast('Release cancelled.', 'info');
  render();
}

function updateIntroLogo() {
  const el = document.getElementById('intro-logo');
  const name = document.getElementById('intro-name')?.value || 'Your label';
  const initials = name.split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join('').toUpperCase() || 'YL';
  if (el) el.innerHTML = logoSVG({ name, initials, color: ui.intro.color, logoShape: ui.intro.shape }, 54);
  const np = document.getElementById('intro-name-preview');
  if (np) np.textContent = name;
}

/* ---------------------------------- render -------------------------------- */
export function render() {
  const app = document.getElementById('app');
  if (!app) return;
  const s = G.getState();
  if (!s) {
    document.documentElement.style.setProperty('--brand', '#ff2e63');
    app.innerHTML = introView();
    renderModal();
    return;
  }
  document.documentElement.style.setProperty('--brand', s.label.color || '#ff2e63');
  app.innerHTML = renderShell(s);
  renderModal();
}
