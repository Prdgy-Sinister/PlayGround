import {
  SPECIES, SEASONS, POTS, MATERIALS, WEAPON_TYPES, BLUEPRINTS, DECOR, UPGRADES, HIRES, QUESTS,
  BUYER_TYPES, RANKS, WEATHERS, seasonOf, seasonIndex, dayOfSeason, rankFor, nextRank, isNight,
  treeValue, isMasterpiece, treeQuality, weaponValue, weaponRarity, appraisal, fmt, money,
} from './data.js';
import { treeCapacity, beautyOf, dailyWages, visitorIncome } from './state.js';
import {
  createAuction, advanceAuction, hammerAuction, commissionMatches, commissionProgress,
  itemLabel, itemQuality, itemCategory, itemSupernatural, seasonalTag,
} from './auction.js';
import { LOCATIONS } from './world.js';
import { Preview3D } from './preview.js';

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const isCoarse = () => window.matchMedia?.('(pointer: coarse)').matches;

const FORGE_STAGES = [
  { key: 'heat', name: 'Heat the Steel', kanji: '火', hits: 2, speed: 55, width: 27, desc: 'Keep the fire even. Strike when the steel glows the colour of dawn — not a breath earlier.' },
  { key: 'hammer', name: 'Hammer the Billet', kanji: '鍛', hits: 5, speed: 78, width: 19, desc: 'Draw the steel out with steady blows. Each strike should land where the metal is brightest.' },
  { key: 'fold', name: 'Fold the Steel', kanji: '折', hits: 3, speed: 88, width: 14, desc: 'Fold, hammer, and fold again. The grain must disappear into itself like water into water.' },
  { key: 'sharpen', name: 'Sharpen the Edge', kanji: '研', hits: 3, speed: 68, width: 21, desc: 'A blade is only as sharp as the patience behind it. Draw the edge across the stone.' },
  { key: 'polish', name: 'Polish the Blade', kanji: '磨', hits: 4, speed: 62, width: 24, desc: 'Polish until the hamon rises like mist on a river. The mountain must see itself in the steel.' },
];

const TABS = {
  bonsai: [['trees', 'Bonsai Trees'], ['seeds', 'Seed Shelf']],
  forge: [],
  auction: [['sell', 'Auction'], ['commissions', 'Commissions'], ['patrons', 'Patrons']],
  market: [['seeds', 'Seeds'], ['materials', 'Materials']],
  estate: [['grounds', 'Grounds & Forge'], ['staff', 'Household'], ['decor', 'Decor'], ['heirlooms', 'Heirlooms']],
  oni: [['wares', 'Night Wares'], ['lot', 'Night Auction']],
  codex: [['guide', 'Guide'], ['recipes', 'Recipes'], ['species', 'Trees'], ['patrons', 'Patrons'], ['quests', 'Trials'], ['settings', 'Settings']],
  map: [], temple: [], meditate: [],
};

const SEASON_COLORS = { spring: '#c76a7e', summer: '#6f9654', autumn: '#b86432', winter: '#7d92a0' };

function pips(level, max) {
  return `<div class="pips">${Array.from({ length: max }, (_, i) => `<i class="${i < level ? 'on' : ''}"></i>`).join('')}</div>`;
}
function bar(label, value, cls = '', suffix = '%') {
  const v = Math.max(0, Math.min(100, value));
  return `<div class="statline"><span>${label}</span><b>${Math.round(v)}${suffix}</b></div><div class="bar ${cls}"><u class="${v < 25 ? 'low' : ''}" style="width:${v}%"></u></div>`;
}
function hex(c) { return '#' + c.toString(16).padStart(6, '0'); }
function treeLeafColor(t, season) {
  const sp = SPECIES[t.sp];
  return sp?.leaf?.[season] ?? 0x7fa356;
}
function treeRarity(t) {
  const sp = SPECIES[t.sp];
  if (!sp) return 'common';
  if (sp.supernatural) return 'supernatural';
  return sp.rarity;
}
function rarityTag(t, kind = 'tree') {
  const r = kind === 'tree' ? treeRarity(t) : weaponRarity(t);
  const map = { common: '', uncommon: 'green', rare: 'gold', supernatural: 'purple', legendary: 'red', masterwork: 'gold', fine: 'green' };
  return `<span class="tag ${map[r] || ''}">${r}</span>`;
}

// deterministic little SVG portrait of a tree
function treeSVG(t, seasonId) {
  const season = seasonId || seasonOf(window.GAME?.state?.day || 1).id;
  const sp = SPECIES[t.sp];
  if (!sp) return '';
  const leaf = hex(sp.leaf[season] ?? sp.leaf.summer);
  let seed = (t.variant || 1) * 9301;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const lean = (rnd() - 0.5) * 16;
  const crownY = 36 - Math.min(10, t.age * 1.4);
  const circles = [];
  const n = 4 + Math.round((t.style || 10) / 22);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rnd();
    const r = 5 + rnd() * 8;
    circles.push(`<circle cx="${50 + Math.cos(a) * (8 + rnd() * 11)}" cy="${crownY + Math.sin(a) * 6 + rnd() * 6}" r="${r}" fill="${leaf}" opacity="${0.65 + rnd() * 0.3}"/>`);
  }
  const glow = sp.supernatural ? `filter="url(#glow)"` : '';
  return `<svg viewBox="0 0 100 100" width="100%" height="100%" ${glow}>
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <path d="M50 70 C ${48 + lean * 0.2} 55, ${46 + lean * 0.6} 44, ${50 + lean} ${crownY + 8}" stroke="#5b4230" stroke-width="${3 + Math.min(4, t.age)}" fill="none" stroke-linecap="round"/>
    <path d="M${50 + lean * 0.5} 55 L${38 + lean} ${crownY + 12} M${50 + lean * 0.55} 50 L${64 + lean} ${crownY + 15} M${50 + lean * 0.7} 45 L${46 + lean} ${crownY + 2}" stroke="#5b4230" stroke-width="2" fill="none" stroke-linecap="round"/>
    ${circles.join('')}
    <rect x="36" y="70" width="28" height="7" rx="2" fill="#6b4934"/>
    <rect x="33" y="72" width="34" height="4" rx="1" fill="#7d5b40"/>
    <path d="M39 77 L37 82 L63 82 L61 77" fill="#503629"/>
  </svg>`;
}

function miniWeaponBadge(w) {
  const t = WEAPON_TYPES[w.type];
  return `<div class="kanji-badge">${t?.kanji || '刀'}</div>`;
}

function itemCard(item, selected, act = 'auction-select') {
  const isTree = item.kind === 'tree';
  const name = itemLabel(item);
  const sp = isTree ? SPECIES[item.sp] : WEAPON_TYPES[item.type];
  const val = appraisal(item, window.GAME.state);
  return `<div class="card hoverable ${selected ? 'selected' : ''}" data-act="${act}" data-id="${item.id}" style="padding:9px 11px;${selected ? 'border-color:var(--verm);' : ''}">
    <div class="row" style="gap:10px;align-items:flex-start">
      ${isTree ? `<div class="tree-art" style="width:58px;height:64px;flex:0 0 auto">${treeSVG(item)}</div>` : miniWeaponBadge(item)}
      <div class="grow">
        <div class="row between"><b style="font-size:13px">${esc(item.name)}</b><span class="gold" style="font-size:12px">${money(val)}</span></div>
        <div class="tiny muted">${sp?.name || ''}${isTree ? ` · ${item.age.toFixed(1)} yrs · style ${Math.round(item.style)}` : ` · quality ${item.quality}`}</div>
        <div class="mt6">${rarityTag(item, isTree ? 'tree' : 'weapon')} ${isTree && isMasterpiece(item) ? '<span class="tag gold">masterpiece</span>' : ''}</div>
      </div>
    </div>
  </div>`;
}

export class UI {
  constructor(game, world, audio) {
    this.game = game;
    this.world = world;
    this.audio = audio;
    this.preview = new Preview3D();
    window.GAME = game;
    this.started = false;
    this.panel = null;
    this.tabs = { bonsai: 'trees', auction: 'sell', market: 'seeds', estate: 'grounds', oni: 'wares', codex: 'guide' };
    this.selectedTreeId = null;
    this.repotTreeId = null;
    this.renaming = false;
    this.forgeType = 'tanto';
    this.forgeMaterial = 'iron';
    this.forge = { active: false, stage: 0, scores: {}, hits: 0, points: 0, done: false, pos: 0, dir: 1, speed: 55, zoneStart: 40, zoneWidth: 24, feedback: '', feedbackKind: '', hitCounts: [] };
    this.forgeResult = null;
    this.liveAuction = null;
    this.auctionTimer = null;
    this.auctionResult = null;
    this.selectedAuctionId = null;
    this.startMult = 0.7;
    this.oniBidBusy = false;

    this.el = {
      hud: document.getElementById('hud'),
      dock: document.getElementById('dock'),
      quests: document.getElementById('quests'),
      questList: document.getElementById('quest-list'),
      focusWrap: document.getElementById('focus-wrap'),
      focusFill: document.getElementById('focus-fill'),
      focusNum: document.getElementById('focus-num'),
      money: document.getElementById('hud-money'),
      rep: document.getElementById('hud-rep'),
      rank: document.getElementById('hud-rank'),
      repbar: document.getElementById('hud-repbar'),
      date: document.getElementById('hud-date'),
      season: document.getElementById('hud-season'),
      seasonKanji: document.getElementById('hud-season-kanji'),
      weather: document.getElementById('hud-weather'),
      weatherIcon: document.getElementById('hud-weather-icon'),
      zone: document.getElementById('zone-tag'),
      prompt: document.getElementById('prompt'),
      promptText: document.getElementById('prompt-text'),
      mobileInteract: document.getElementById('mobile-interact'),
      toasts: document.getElementById('toasts'),
      root: document.getElementById('modal-root'),
      intro: document.getElementById('intro'),
      loading: document.getElementById('loading'),
      fade: document.getElementById('fade'),
      compass: document.getElementById('compass'),
      compassLabel: document.getElementById('compass-label'),
      joystick: document.getElementById('joystick'),
      soundBtn: document.getElementById('btn-sound'),
      meditateBtn: document.getElementById('btn-meditate'),
    };
    this.panelDrag = false;
  }

  bind() {
    document.getElementById('start-btn').addEventListener('click', () => this.startGame());
    document.querySelectorAll('#dock button').forEach((btn) => {
      btn.addEventListener('click', () => this.openPanel(btn.dataset.panel));
    });
    document.getElementById('btn-map').addEventListener('click', () => this.openPanel('map'));
    this.el.meditateBtn.addEventListener('click', () => this.openPanel('meditate'));
    document.getElementById('btn-help').addEventListener('click', () => this.openPanel('codex'));
    this.el.soundBtn.addEventListener('click', () => this.toggleSound());
    this.el.mobileInteract.addEventListener('click', () => this.world.tryInteract());
    this.el.prompt.addEventListener('click', () => this.world.tryInteract());
    this.el.root.addEventListener('click', (e) => {
      if (e.target.classList?.contains('overlay')) { this.closePanel(); return; }
      const el = e.target.closest('[data-act]');
      if (!el) return;
      this.handleAction(el.dataset.act, el, e);
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.panel) { e.preventDefault(); this.closePanel(); }
      if (e.key === 'm' && !this.panel && this.game.started) this.openPanel('map');
    });
    window.addEventListener('resize', () => this.preview.resize());
    this.world.onNearbyChange = (inter) => this.setPrompt(inter);
    this.world.onZoneChange = (zone) => this.showZone(zone);
    this.setupJoystick();
    this.refreshHUD();
    if (isCoarse()) this.el.joystick.classList.add('hidden');
    this.el.mobileInteract.classList.add('hidden');
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.game.saveGame();
    });
    window.addEventListener('beforeunload', () => this.game.saveGame());
  }

  startGame() {
    if (this.started) return;
    this.started = true;
    // Audio is optional. A blocked or unavailable AudioContext must never
    // prevent the world from starting (common on strict mobile browsers).
    try {
      this.audio.init();
      this.audio.soundOn = true;
      this.audio.setMusic(true);
    } catch (err) {
      console.warn('[samurai] Audio unavailable:', err);
    }
    this.game.started = true;
    this.el.intro.classList.add('gone');
    setTimeout(() => { this.el.intro.style.display = 'none'; }, 1100);
    ['hud', 'dock', 'quests', 'focus-wrap', 'compass'].forEach((id) => document.getElementById(id)?.classList.remove('hidden'));
    if (isCoarse()) {
      this.el.joystick.classList.remove('hidden');
      this.el.mobileInteract.classList.remove('hidden');
    }
    this.el.loading.classList.add('gone');
    this.refreshHUD();
    try { this.game.audio?.setMood('estate'); } catch (err) { console.warn('[samurai] Audio mood failed:', err); }
    this.showZone(LOCATIONS.estate);
    this.world.snapCamera();
    const save = this.game.state;
    if (save.stats.sold > 0 || save.rep > 0) {
      this.toast(`Welcome back, ${rankFor(save.rep).name}. The mountain has waited.`, 'good');
    } else {
      this.toast('You have left the war behind. Water your trees, forge a blade, and find your first buyer.', 'good');
      setTimeout(() => this.toast('Tip: press M for the mountain map. The auction grounds lie east.', ''), 4200);
    }
    this.game.saveGame();
  }

  // ————— HUD —————
  refreshHUD() {
    const s = this.game.state;
    if (!s) return;
    const season = seasonOf(s.day);
    const rank = rankFor(s.rep);
    const nxt = nextRank(s.rep);
    const mins = Math.round(s.minutes || 0);
    const hh = String(Math.floor(mins / 60) % 24).padStart(2, '0');
    const mm = String(Math.floor(mins % 60)).padStart(2, '0');
    if (this.el.money) this.el.money.textContent = fmt(s.money);
    if (this.el.rep) this.el.rep.textContent = fmt(s.rep);
    if (this.el.rank) this.el.rank.textContent = rank.name.toUpperCase();
    if (this.el.date) this.el.date.textContent = `Day ${s.day} · ${hh}:${mm}`;
    if (this.el.season) this.el.season.textContent = `${season.name.toUpperCase()} · ${dayOfSeason(s.day)}/5`;
    if (this.el.seasonKanji) {
      this.el.seasonKanji.textContent = season.kanji;
      this.el.seasonKanji.style.color = SEASON_COLORS[season.id];
    }
    const w = WEATHERS[s.weather] || WEATHERS.clear;
    if (this.el.weather) this.el.weather.textContent = w.name + (isNight(s.hour) ? ' · Night' : '');
    if (this.el.weatherIcon) this.el.weatherIcon.textContent = isNight(s.hour) ? '☾' : w.icon;
    if (this.el.repbar) {
      let pct = 100;
      if (nxt) {
        const prev = rank.rep;
        pct = Math.max(0, Math.min(100, ((s.rep - prev) / (nxt.rep - prev)) * 100));
      }
      this.el.repbar.style.width = pct + '%';
      this.el.rank.title = nxt ? `${Math.round(pct)}% to ${nxt.name}` : 'Highest rank';
    }
    if (this.el.focusFill) this.el.focusFill.style.width = `${clamp(s.focus, 0, 100)}%`;
    if (this.el.focusNum) this.el.focusNum.textContent = Math.round(s.focus);
    this.refreshQuests();
    this.refreshBadges();
    if (this.el.soundBtn) {
      const on = s.settings.sound || s.settings.music;
      this.el.soundBtn.firstChild.textContent = on ? '音' : '静';
      this.el.soundBtn.title = on ? 'Sound on' : 'Sound off';
    }
    document.body.classList.toggle('is-night', isNight(s.hour));
  }

  refreshFocus() {
    const s = this.game.state;
    if (this.el.focusFill) this.el.focusFill.style.width = `${clamp(s.focus, 0, 100)}%`;
    if (this.el.focusNum) this.el.focusNum.textContent = Math.round(s.focus);
  }

  refreshQuests() {
    const s = this.game.state;
    if (!this.el.questList) return;
    const pending = QUESTS.filter((q) => !s.questsDone.includes(q.id)).slice(0, 3);
    if (!pending.length) {
      this.el.questList.innerHTML = `<div class="tiny muted" style="padding:4px 0">All trials complete. Your craft speaks for itself.</div>`;
      return;
    }
    this.el.questList.innerHTML = pending.map((q) => `
      <div class="quest"><span class="qmark"></span><span>${esc(q.text)}</span><span class="qr">+${fmt(q.reward)}</span></div>
    `).join('');
  }

  refreshBadges() {
    const s = this.game.state;
    const dock = this.el.dock;
    if (!dock) return;
    const set = (panel, text) => {
      const btn = dock.querySelector(`[data-panel="${panel}"]`);
      if (!btn) return;
      let b = btn.querySelector('.badge');
      if (!text) { if (b) b.remove(); return; }
      if (!b) { b = document.createElement('span'); b.className = 'badge'; btn.appendChild(b); }
      b.textContent = text;
    };
    const thirsty = s.trees.filter((t) => t.water < 28).length;
    set('bonsai', thirsty ? String(thirsty) : '');
    set('auction', s.commissions.length ? String(s.commissions.length) : '');
    set('map', isNight(s.hour) ? '夜' : '');
    set('estate', s.money >= 3400 ? '↑' : '');
  }

  toast(message, kind = '') {
    if (!this.el.toasts) return;
    const div = document.createElement('div');
    div.className = `toast ${kind}`;
    div.innerHTML = `<span class="t-icon">${kind === 'warn' ? '!' : '家'}</span><span>${message}</span>`;
    this.el.toasts.appendChild(div);
    while (this.el.toasts.children.length > 4) this.el.toasts.firstChild.remove();
    setTimeout(() => { div.classList.add('out'); setTimeout(() => div.remove(), 450); }, 4200);
  }

  flashSaved() { /* autosave is silent */ }

  setPrompt(inter) {
    if (!this.el.prompt) return;
    if (!inter || !this.started) {
      this.el.prompt.classList.add('hidden');
      this.el.mobileInteract.classList.add('hidden');
      return;
    }
    this.el.promptText.textContent = inter.label;
    this.el.prompt.classList.remove('hidden');
    if (isCoarse()) this.el.mobileInteract.classList.remove('hidden');
  }

  showZone(loc) {
    if (!loc) return;
    const s = this.game.state;
    if (!s.discovered.includes(loc.id)) {
      s.discovered.push(loc.id);
      this.toast(`New place discovered: ${loc.name}.`, 'good');
      this.game.log(`Discovered ${loc.name}.`);
      this.game.saveGame();
    }
    this.el.zone.innerHTML = `
      <div class="zone-kanji">${loc.kanji}</div>
      <div class="zone-name">${loc.name.toUpperCase()}</div>
      <small>${loc.jp} · ${loc.blurb}</small>`;
    this.el.zone.classList.remove('show');
    void this.el.zone.offsetWidth;
    this.el.zone.classList.add('show');
    if (this.el.compassLabel) this.el.compassLabel.textContent = loc.name.toUpperCase();
    this.audio.setMood(loc.id === 'auction' ? 'auction' : 'estate');
  }

  setupJoystick() {
    const joy = this.el.joystick;
    if (!joy) return;
    const stick = joy.querySelector('.stick');
    let active = null, cx = 0, cy = 0, radius = 40;
    const start = (e) => {
      active = e.pointerId;
      const r = joy.getBoundingClientRect();
      cx = r.left + r.width / 2;
      cy = r.top + r.height / 2;
      radius = r.width * 0.38;
      joy.setPointerCapture?.(e.pointerId);
      e.preventDefault();
    };
    const move = (e) => {
      if (active !== e.pointerId) return;
      let dx = (e.clientX - cx) / radius;
      let dy = (e.clientY - cy) / radius;
      const len = Math.hypot(dx, dy);
      if (len > 1) { dx /= len; dy /= len; }
      this.world.setJoystick(dx, dy);
      stick.style.transform = `translate(calc(-50% + ${dx * 28}px), calc(-50% + ${dy * 28}px))`;
      e.preventDefault();
    };
    const end = (e) => {
      if (active !== e.pointerId) return;
      active = null;
      this.world.setJoystick(0, 0);
      stick.style.transform = 'translate(-50%, -50%)';
    };
    joy.addEventListener('pointerdown', start);
    joy.addEventListener('pointermove', move);
    joy.addEventListener('pointerup', end);
    joy.addEventListener('pointercancel', end);
  }

  // ————— panel shell —————
  openPanel(name, opts = {}) {
    if (!this.started) return;
    this.clearAuctionTimer();
    this.liveAuction = null;
    this.panel = name;
    if (opts.tab) this.tabs[name] = opts.tab;
    if (opts.preselect) this.selectedAuctionId = opts.preselect;
    if (opts.treeId) this.selectedTreeId = opts.treeId;
    this.game.paused = true;
    this.world.locked = true;
    this.game.sfx('open');
    if (name === 'oni') this.audio.setMood('oni');
    this.renderPanel();
    document.querySelectorAll('#dock button').forEach((b) => b.classList.toggle('active', b.dataset.panel === name));
  }

  openTemple() {
    this.openPanel('temple');
  }

  closePanel() {
    this.clearAuctionTimer();
    this.liveAuction = null;
    this.preview.host = null;
    this.el.root.innerHTML = '';
    document.querySelectorAll('#dock button').forEach((b) => b.classList.remove('active'));
    const wasOni = this.panel === 'oni';
    this.panel = null;
    this.game.paused = false;
    this.world.locked = false;
    this.renaming = false;
    if (wasOni) this.audio.setMood('estate');
    else this.audio.setMood(this.world.currentZone === 'auction' ? 'auction' : 'estate');
    this.game.saveGame();
  }

  clearAuctionTimer() {
    if (this.auctionTimer) { clearInterval(this.auctionTimer); this.auctionTimer = null; }
  }

  sheet({ title, sub, seal, body, dark = false, footer = '', extra = '' }) {
    return `<div class="overlay"><div class="sheet ${dark ? 'oni' : ''} ${extra}">
      <div class="sheet-head">
        <div class="seal">${seal}</div>
        <div class="sheet-title"><h2>${title}</h2><small>${sub}</small></div>
        <div class="spacer"></div>
        <div class="offline-pill"><span class="pulse-dot"></span>${seasonOf(this.game.state.day).name} · Day ${this.game.state.day}</div>
        <button class="sheet-close" data-act="close" aria-label="Close">×</button>
      </div>
      <div class="sheet-body">${body}</div>
      ${footer ? `<div class="sheet-foot">${footer}</div>` : ''}
    </div></div>`;
  }

  tabsHTML(panel) {
    const tabs = TABS[panel];
    if (!tabs || !tabs.length) return '';
    const active = this.tabs[panel];
    return `<div class="tabs">${tabs.map(([id, label]) => `<button class="tab ${active === id ? 'active' : ''}" data-act="tab" data-tab="${id}">${label}</button>`).join('')}</div>`;
  }

  renderPanel() {
    if (!this.panel) return;
    const fn = this[`panel_${this.panel}`];
    if (!fn) return;
    let html = '';
    try { html = fn.call(this); } catch (err) {
      console.error(err);
      html = this.sheet({ title: 'A Moment of Silence', sub: 'SOMETHING WENT WRONG', seal: '静', body: `<div class="empty"><span class="big">無</span>The mountain spirits are confused.<br><small>${esc(err.message)}</small></div>`, footer: `<button class="btn" data-act="close">Close</button>` });
    }
    this.el.root.innerHTML = html;
    this.attachPreview();
    document.querySelectorAll('#dock button').forEach((b) => b.classList.toggle('active', b.dataset.panel === this.panel));
  }

  attachPreview() {
    const host = this.el.root.querySelector('[data-preview]');
    if (!host) { this.preview.host = null; return; }
    let item = null;
    const s = this.game.state;
    if (this.panel === 'bonsai') {
      item = s.trees.find((t) => t.id === this.selectedTreeId) || s.trees[0] || null;
    } else if (this.panel === 'forge') {
      if (this.forgeResult) item = this.forgeResult;
      else item = { kind: 'weapon', type: this.forgeType, material: this.resolvedForgeMaterial(), quality: 72, supernatural: !!WEAPON_TYPES[this.forgeType]?.supernatural };
    } else if (this.panel === 'auction') {
      if (this.liveAuction) item = this.liveAuction.item;
      else if (this.auctionResult) item = this.auctionResult.item;
      else item = this.auctionItems().find((i) => i.id === this.selectedAuctionId) || this.auctionItems()[0] || null;
    } else if (this.panel === 'oni') {
      if (this.tabs.oni === 'lot' && s.oniLot) item = s.oniLot.item;
    }
    this.preview.attach(host);
    this.preview.show(item);
  }

  handleAction(act, el) {
    const s = this.game.state;
    switch (act) {
      case 'close': this.closePanel(); break;
      case 'tab': this.tabs[this.panel] = el.dataset.tab; this.renderPanel(); break;
      case 'goto': {
        const panel = el.dataset.panel;
        const opts = {};
        if (el.dataset.tab) opts.tab = el.dataset.tab;
        if (panel === 'auction' && el.dataset.preselect) { opts.preselect = el.dataset.preselect; opts.tab = 'sell'; }
        this.openPanel(panel, opts);
        break;
      }
      // bonsai
      case 'tree-select': this.selectedTreeId = el.dataset.id; this.repotTreeId = null; this.renaming = false; this.renderPanel(); break;
      case 'care': {
        const tree = s.trees.find((t) => t.id === this.selectedTreeId);
        if (!tree) break;
        const res = this.game.careTree(tree.id, el.dataset.care);
        if (res.ok) this.renderPanel();
        break;
      }
      case 'repot-open': this.repotTreeId = this.selectedTreeId; this.renderPanel(); break;
      case 'repot': {
        const tree = s.trees.find((t) => t.id === this.selectedTreeId);
        if (!tree) break;
        const ok = this.game.careTree(tree.id, 'repot', { pot: Number(el.dataset.pot) });
        if (ok.ok) { this.repotTreeId = null; this.renderPanel(); }
        break;
      }
      case 'heirloom': {
        const tree = s.trees.find((t) => t.id === this.selectedTreeId);
        if (tree) { this.game.careTree(tree.id, 'heirloom'); this.renderPanel(); }
        break;
      }
      case 'rename-open': this.renaming = true; this.renderPanel(); setTimeout(() => document.getElementById('rename-input')?.focus(), 50); break;
      case 'rename-save': {
        const tree = s.trees.find((t) => t.id === this.selectedTreeId);
        const val = document.getElementById('rename-input')?.value;
        if (tree && val) { this.game.careTree(tree.id, 'rename', { name: val }); this.renaming = false; this.renderPanel(); }
        break;
      }
      case 'rename-cancel': this.renaming = false; this.renderPanel(); break;
      case 'plant': {
        const ok = this.game.plantSeed(el.dataset.sp);
        if (ok) {
          this.selectedTreeId = s.trees[s.trees.length - 1].id;
          this.tabs.bonsai = 'trees';
          this.renderPanel();
        }
        break;
      }
      case 'sell-tree': {
        this.openPanel('auction', { tab: 'sell', preselect: this.selectedTreeId });
        break;
      }
      // forge
      case 'recipe': this.forgeType = el.dataset.type; this.forgeMaterial = this.defaultMaterialFor(this.forgeType); this.forge.active = false; this.forgeResult = null; this.renderPanel(); break;
      case 'material': this.forgeMaterial = el.dataset.mat; this.renderPanel(); break;
      case 'forge-start': this.beginForge(); break;
      case 'forge-strike': this.strikeForge(); break;
      case 'forge-continue': this.continueForge(); break;
      case 'forge-abort': this.forge.active = false; this.forgeResult = null; this.renderPanel(); break;
      case 'forge-finish': this.finishForge(el.dataset.deco === '1'); break;
      case 'forge-again': this.forge.active = false; this.forgeResult = null; this.forge.stage = 0; this.renderPanel(); break;
      // auction
      case 'auction-select': this.selectedAuctionId = el.dataset.id; this.auctionResult = null; this.renderPanel(); break;
      case 'auction-mult': this.startMult = Number(el.dataset.mult); this.renderPanel(); break;
      case 'auction-start': this.startAuction(); break;
      case 'auction-hammer': this.hammerLiveAuction(); break;
      case 'auction-reset': this.auctionResult = null; this.selectedAuctionId = null; this.tabs.auction = 'sell'; this.renderPanel(); break;
      case 'commission-deliver': this.game.deliverCommission(el.dataset.com, el.dataset.item); this.renderPanel(); break;
      // market
      case 'buy-seed': this.game.buySeed(el.dataset.sp); this.renderPanel(); break;
      case 'buy-mat': this.game.buyMaterial(el.dataset.mat, Number(el.dataset.qty || 1)); this.renderPanel(); break;
      // estate
      case 'upgrade': this.game.upgrade(el.dataset.kind); this.renderPanel(); break;
      case 'hire': this.game.hire(el.dataset.kind); this.renderPanel(); break;
      case 'decor': this.game.buyDecor(el.dataset.id); this.renderPanel(); break;
      case 'release-heirloom': {
        const tree = s.trees.find((t) => t.id === el.dataset.id);
        if (tree) { this.game.careTree(tree.id, 'heirloom'); this.renderPanel(); }
        break;
      }
      case 'view-tree': this.selectedTreeId = el.dataset.id; this.openPanel('bonsai', { treeId: el.dataset.id }); break;
      case 'save-rest': this.game.saveGame(); this.game.restAt('house'); this.renderPanel(); break;
      // map
      case 'travel': this.travel(el.dataset.loc); break;
      // oni
      case 'oni-buy': this.game.buyOni(el.dataset.id); this.renderPanel(); break;
      case 'oni-bid': {
        const res = this.game.oniBid();
        if (res.ok) this.renderPanel();
        break;
      }
      case 'oni-withdraw': this.game.oniWithdraw(); this.renderPanel(); break;
      // codex / settings
      case 'toggle-sound': this.toggleSound(); this.renderPanel(); break;
      case 'toggle-music': this.toggleMusic(); this.renderPanel(); break;
      case 'save-now': this.game.saveGame(); this.toast('Saved to the mountain ledger.', 'good'); this.renderPanel(); break;
      case 'reset-save': {
        if (window.confirm('Begin again? Your estate, trees and blades will be lost.')) {
          this.game.reset();
        }
        break;
      }
      // meditate
      case 'rest': this.doRest(Number(el.dataset.hours), el.dataset.label || ''); break;
      case 'rest-until': {
        const target = Number(el.dataset.hour);
        const cur = s.minutes / 60;
        const hours = ((target - cur + 24) % 24) || 24;
        this.doRest(hours, el.dataset.label || '');
        break;
      }
      // temple
      case 'bless': this.game.templeBlessing(); this.renderPanel(); break;
      default: break;
    }
  }

  // ————— BONSAI —————
  panel_bonsai() {
    const s = this.game.state;
    const season = seasonOf(s.day);
    if (!this.selectedTreeId || !s.trees.find((t) => t.id === this.selectedTreeId)) this.selectedTreeId = s.trees[0]?.id || null;
    const selected = s.trees.find((t) => t.id === this.selectedTreeId);
    const tab = this.tabs.bonsai;
    const capacity = treeCapacity(s);
    const heirlooms = s.trees.filter((t) => t.heirloom).length;
    const body = `
      <div class="row between wrap mb10">
        <div class="row" style="gap:14px">
          <span class="tag gold">${s.trees.length} / ${capacity} benches</span>
          <span class="tag">${heirlooms} heirlooms</span>
          <span class="tag">Garden beauty ${beautyOf(s)}</span>
        </div>
        <span class="tiny muted">Season: ${season.name} · growth ×${season.growth}</span>
      </div>
      ${this.tabsHTML('bonsai')}
      ${tab === 'seeds' ? this.bonsaiSeeds() : `
      <div class="split">
        <div>
          <div class="section-label">The living collection</div>
          ${s.trees.length ? `<div class="tree-grid">${s.trees.map((t) => this.treeCard(t, selected?.id === t.id, season)).join('')}</div>` : `<div class="empty"><span class="big">盆</span>No trees yet. Plant a seed from the shelf.</div>`}
          <div class="rule"></div>
          <div class="row between">
            <div class="tiny muted">Speak to a tree, and it will tell you what it needs.</div>
            <button class="btn btn-sm btn-ghost" data-act="goto" data-panel="market" data-tab="seeds">Buy seeds</button>
          </div>
        </div>
        <div>${selected ? this.treeDetail(selected, season) : `<div class="empty"><span class="big">無</span>Your benches are empty.</div>`}</div>
      </div>`}
    `;
    return this.sheet({
      title: 'The Living Garden', sub: 'BONSAI CULTIVATION · 盆栽', seal: '盆', body,
      footer: `<div class="tiny muted grow">Each tree has its own age, health, style and value. Heirlooms cannot be sold.</div>
        <button class="btn btn-ghost" data-act="goto" data-panel="auction">Take a tree to auction</button>
        <button class="btn" data-act="close">Return to the garden</button>`,
    });
  }

  treeCard(t, selected, season) {
    const sp = SPECIES[t.sp];
    const val = treeValue(t);
    return `<div class="card tree-card ${selected ? 'selected' : ''}" data-act="tree-select" data-id="${t.id}">
      <div class="tree-art" style="background:radial-gradient(circle at 50% 30%, #343026, #14110d)">
        <span class="rarity">${sp?.rarity?.toUpperCase() || ''}</span>
        ${t.heirloom ? '<span class="heirloom">宝</span>' : ''}
        ${treeSVG(t, season.id)}
      </div>
      <div class="info">
        <h4>${esc(t.name)}</h4>
        <div class="meta">${sp?.name || ''} · ${t.age.toFixed(1)} yrs</div>
        <div class="val">${money(val)} ${isMasterpiece(t) ? '<span class="tag gold" style="font-size:8px">MASTERPIECE</span>' : ''}</div>
        <div class="mini-bars">
          <u style="--w:${Math.round(t.health)}%;--c:#8a9e70"></u>
          <u style="--w:${Math.round(t.water)}%;--c:#6f94ac"></u>
          <u style="--w:${Math.round(t.style)}%;--c:#b6914f"></u>
        </div>
      </div>
    </div>`;
  }

  treeDetail(t, season) {
    const sp = SPECIES[t.sp];
    const cap = this.game.styleCap(t);
    const val = treeValue(t);
    const quality = treeQuality(t);
    const pot = POTS[t.pot];
    const master = isMasterpiece(t);
    const repotOpen = this.repotTreeId === t.id;
    return `<div class="card" style="padding:14px 16px">
      <div class="preview-wrap tall">
        <div data-preview style="position:absolute;inset:0"></div>
        <div class="preview-rotate">DRAG THE MOUNTAIN TO LOOK AROUND</div>
        <div class="preview-caption"><span class="jp">${sp.jp}</span><span>${money(val)}</span></div>
      </div>
      <div class="row between mt10" style="align-items:flex-start">
        <div>
          ${this.renaming ? `<input id="rename-input" class="rename-input" maxlength="18" value="${esc(t.name)}" />` : `<h3 style="margin:0;font-size:24px">${esc(t.name)}</h3>`}
          <div class="tiny muted" style="letter-spacing:.14em;text-transform:uppercase;margin-top:3px">${sp.name} · ${sp.rarity}${t.supernatural ? ' · supernatural' : ''}</div>
        </div>
        <div style="text-align:right">
          ${rarityTag(t)}
          ${t.heirloom ? '<span class="tag gold">heirloom</span>' : ''}
          ${master ? '<div class="tag gold mt6">MASTERPIECE</div>' : ''}
        </div>
      </div>
      <p class="small muted" style="line-height:1.45;margin:8px 0 10px">${sp.desc}</p>
      <div class="mt6">
        ${bar('Health', t.health, 'health')}
        ${bar('Water', t.water, 'water')}
        ${bar('Style', t.style, 'style')}
        <div class="statline"><span>Years of shaping</span><b>${t.age.toFixed(1)} · cap ${cap}</b></div>
        <div class="bar"><u style="width:${Math.min(100, t.growth)}%;background:linear-gradient(90deg,#7f9a6d,#b8cd9a)"></u></div>
        <div class="statline"><span>Growth to next half-year</span><b>${Math.round(t.growth)}%</b></div>
      </div>
      <div class="kv mt10">
        <dt>Pot</dt><dd>${pot.name} <span class="muted">×${pot.mult}</span></dd>
        <dt>Quality</dt><dd>${'★'.repeat(Math.max(1, Math.round(quality / 20)))}${'☆'.repeat(5 - Math.max(1, Math.round(quality / 20)))} <span class="muted">${quality}/100</span></dd>
        <dt>Legacy</dt><dd>${t.heirloom ? 'Family heirloom — not for sale' : 'Available for auction'}</dd>
      </div>
      <div class="rule"></div>
      ${this.renaming ? `<div class="row mb10"><button class="btn btn-primary btn-sm" data-act="rename-save">Keep this name</button><button class="btn btn-ghost btn-sm" data-act="rename-cancel">Cancel</button></div>` : ''}
      <div class="actions">
        <button class="action-btn primary" data-act="care" data-care="water"><b>Water</b><small>+34 water · 4 focus</small></button>
        <button class="action-btn" data-act="care" data-care="prune"><b>Prune</b><small>+style · 9 focus</small></button>
        <button class="action-btn" data-act="care" data-care="wire"><b>Wire & shape</b><small>+style · 13 focus</small></button>
        <button class="action-btn" data-act="care" data-care="fertilize"><b>Fertilize</b><small>+growth · 90 ryō</small></button>
        <button class="action-btn" data-act="repot-open"><b>Repot</b><small>${pot.name} · change pot</small></button>
        <button class="action-btn" data-act="heirloom"><b>${t.heirloom ? 'Release heirloom' : 'Make heirloom'}</b><small>${t.heirloom ? 'Allow sale again' : 'Keep forever · +beauty'}</small></button>
        <button class="action-btn" data-act="rename-open"><b>Name</b><small>Give the tree a name</small></button>
        <button class="action-btn" data-act="sell-tree" ${t.heirloom ? 'disabled' : ''}><b>Sell at auction</b><small>${t.heirloom ? 'Heirlooms are not sold' : 'Appraised ' + money(appraisal(t, this.game.state))}</small></button>
      </div>
      ${repotOpen ? `<div class="rule"></div><div class="section-label">Choose a new pot</div><div class="shop-grid">${POTS.filter((p) => p.id > t.pot).map((p) => `
        <div class="shop-card">
          <h4><span class="k">鉢</span>${p.name}</h4>
          <p>${p.desc}</p>
          <div class="buy-row"><b>${money(p.cost)}</b><button class="btn btn-sm" data-act="repot" data-pot="${p.id}" ${this.game.state.money < p.cost ? 'disabled' : ''}>Repot</button></div>
        </div>`).join('')}</div>` : ''}
    </div>`;
  }

  bonsaiSeeds() {
    const s = this.game.state;
    const season = seasonOf(s.day);
    return `<div class="section-label">Seed shelf</div>
      <p class="small muted" style="margin-top:-2px">Plant a seed in a fresh pot. New trees are shaped with water, wire and patience.</p>
      <div class="shop-grid">
        ${Object.values(SPECIES).map((sp) => {
          const count = s.seeds[sp.id] || 0;
          const locked = sp.repReq && s.rep < sp.repReq;
          return `<div class="shop-card ${locked ? 'dim' : ''}">
            <h4><span class="k">${sp.kanji}</span>${sp.name} <span class="tag">${sp.rarity}</span></h4>
            <p>${sp.desc}</p>
            <div class="tiny muted">Growth ×${sp.growth} · Seed value ${money(sp.seedCost)} · In shelf: <b>${count}</b></div>
            <div class="buy-row">
              <b>${locked ? `Requires ${sp.repReq} rep` : count > 0 ? 'Ready to plant' : 'No seed'}</b>
              <button class="btn btn-sm ${count > 0 ? 'btn-primary' : ''}" data-act="plant" data-sp="${sp.id}" ${count <= 0 || locked ? 'disabled' : ''}>Plant</button>
            </div>
          </div>`;
        }).join('')}
      </div>
      <div class="rule"></div>
      <div class="row between"><span class="small muted">Garden capacity: ${s.trees.length} / ${treeCapacity(s)}</span><button class="btn btn-sm" data-act="goto" data-panel="market" data-tab="seeds">Visit the seed merchant</button></div>`;
  }

  // ————— FORGE —————
  panel_forge() {
    if (!WEAPON_TYPES[this.forgeType]) this.forgeType = 'tanto';
    if (this.forgeResult) return this.forgeStageView();
    if (this.forge.active) return this.forgeStageView();
    return this.forgeRecipeView();
  }

  resolvedForgeMaterial() {
    const type = WEAPON_TYPES[this.forgeType];
    if (type.supernatural) return Object.keys(type.mats).find((k) => MATERIALS[k] && k !== 'charcoal') || 'iron';
    const valid = type.matClass === 'wood' ? ['wood', 'spiritwood'] : ['iron', 'tamahagane', 'folded', 'onisteel'];
    return valid.includes(this.forgeMaterial) ? this.forgeMaterial : this.defaultMaterialFor(this.forgeType);
  }

  defaultMaterialFor(typeId) {
    const type = WEAPON_TYPES[typeId];
    if (type.supernatural) return Object.keys(type.mats).find((k) => MATERIALS[k] && k !== 'charcoal');
    const mats = type.matClass === 'wood' ? ['wood', 'spiritwood'] : ['iron', 'tamahagane', 'folded'];
    const s = this.game.state;
    const available = mats.filter((m) => (s.materials[m] || 0) >= 1);
    return available.length ? available[available.length - 1] : mats[0];
  }

  forgeRecipeView() {
    const s = this.game.state;
    const type = WEAPON_TYPES[this.forgeType];
    const matId = this.resolvedForgeMaterial();
    const mat = MATERIALS[matId];
    const can = this.game.canCraft(this.forgeType, matId);
    const needs = this.game.craftNeeds(this.forgeType, matId);
    const reqLevel = Math.max(0, type.tier - 1);
    const unlocked = s.workshopLevel >= reqLevel;
    const blueprintOk = !type.blueprint || s.blueprints.includes(type.blueprint);
    const estValue = weaponValue({ type: this.forgeType, material: matId, quality: 76 }, s.rep);
    const materials = type.supernatural ? [matId] : type.matClass === 'wood' ? ['wood', 'spiritwood'] : ['iron', 'tamahagane', 'folded'];
    const recipes = Object.values(WEAPON_TYPES).sort((a, b) => a.tier - b.tier || a.base - b.base);
    const list = recipes.map((w) => {
      const rl = Math.max(0, w.tier - 1);
      const lock = s.workshopLevel < rl ? `Forge lv.${rl + 1}` : (w.blueprint && !s.blueprints.includes(w.blueprint)) ? 'Blueprint' : '';
      return `<button class="recipe ${this.forgeType === w.id ? 'active' : ''} ${lock ? 'locked' : ''}" data-act="recipe" data-type="${w.id}">
        <span class="r-kanji">${w.kanji}</span>
        <span class="grow"><span class="r-name">${w.name}</span><span class="r-meta">${w.jp} · tier ${w.tier + 1}${lock ? ' · ' + lock : ''}</span></span>
        <span class="r-price">${money(w.base)}</span>
      </button>`;
    }).join('');

    const detail = `
      <div>
        <div class="preview-wrap" style="height:210px">
          <div data-preview style="position:absolute;inset:0"></div>
          <div class="preview-caption"><span class="jp">${type.jp}</span><span>${type.name} · estimated ${money(estValue)}</span></div>
        </div>
        <div class="row between mt10">
          <div><h3 style="margin:0;font-size:22px">${type.name}</h3><div class="tiny muted">${type.jp} · Tier ${type.tier + 1} · Base ${money(type.base)}</div></div>
          <div>${type.supernatural ? '<span class="tag purple">supernatural</span>' : ''} ${!unlocked ? '<span class="tag red">locked</span>' : '<span class="tag green">unlocked</span>'}</div>
        </div>
        <p class="small muted" style="line-height:1.5;margin:8px 0">${type.desc}</p>
        ${type.supernatural ? `<div class="tag red mb10">Forbidden blueprint: ${BLUEPRINTS[type.blueprint]?.name || type.blueprint}</div>` : ''}
        <div class="section-label">Material</div>
        <div class="mat-grid">
          ${materials.map((m) => {
            const md = MATERIALS[m];
            const count = s.materials[m] || 0;
            const blocked = (m === 'onisteel' && !type.supernatural) || (m === 'spiritwood' && type.matClass !== 'wood');
            return `<div class="mat-card ${matId === m ? 'active' : ''} ${blocked ? 'locked' : ''}" data-act="material" data-mat="${m}">
              <b>${md.name}<span>${count}</span></b>
              <small>${md.jp} · quality ${md.quality}${blocked ? ' · restricted' : ''}</small>
              <div class="m-stats"><span>${md.desc}</span></div>
            </div>`;
          }).join('')}
        </div>
        <div class="section-label">Materials required</div>
        <div class="row wrap" style="gap:6px">${Object.entries(needs).map(([k, n]) => {
          const have = s.materials[k] || 0;
          return `<span class="tag ${have >= n ? 'green' : 'red'}">${MATERIALS[k]?.name || k} ${have}/${n}</span>`;
        }).join('')}</div>
        <div class="row between mt16">
          <div class="tiny muted">Workshop lv.${s.workshopLevel + 1} · assistants +${(s.hires.assistant || 0) * 5} quality · decoration +12% value</div>
          <button class="btn btn-primary" data-act="forge-start" ${can.ok ? '' : 'disabled'}>Begin Forging</button>
        </div>
        ${can.ok ? '' : `<div class="tiny verm mt6">${can.reason}</div>`}
        <div class="rule"></div>
        <div class="row between">
          <span class="tiny muted">Six stages: heat, hammer, fold, sharpen, polish, decorate. Timing shapes quality.</span>
          <button class="btn btn-sm btn-ghost" data-act="goto" data-panel="market" data-tab="materials">Buy materials</button>
        </div>
      </div>`;

    return this.sheet({
      title: 'The Mountain Forge', sub: 'BLACKSMITHING · 鍛冶', seal: '鍛',
      body: `<div class="forge-layout">
        <div><div class="section-label">Recipes</div><div class="recipe-list">${list}</div>
          <div class="tiny muted mt10">Workshop lv.${s.workshopLevel + 1} · ${s.weapons.length} blades in your collection</div>
        </div>
        ${detail}
      </div>`,
      footer: `<div class="tiny muted grow">The forge fire is hot. Steel remembers every impatient blow.</div>
        <button class="btn btn-ghost" data-act="close">Leave the forge</button>`,
    });
  }

  forgeStageView() {
    const f = this.forge;
    if (this.forgeResult) {
      const w = this.forgeResult;
      const type = WEAPON_TYPES[w.type];
      const mat = MATERIALS[w.material];
      return this.sheet({
        title: 'The Blade is Born', sub: 'FORGE RESULT · 完成', seal: '成',
        body: `<div class="split">
          <div class="card">
            <div class="preview-wrap tall"><div data-preview style="position:absolute;inset:0"></div>
              <div class="preview-caption"><span class="jp">${type.jp}</span><span>${weaponRarity(w).toUpperCase()}</span></div>
            </div>
          </div>
          <div class="card">
            <div class="tiny muted">FORGED ON DAY ${w.forgedDay}</div>
            <h3 style="font-size:28px;margin:5px 0 2px">${esc(w.name)}</h3>
            <div class="small muted">${type.name} · ${type.jp} · ${mat.name}</div>
            <div class="mt10">${bar('Quality', w.quality, 'style')}${bar('Durability', w.durability, 'health')}</div>
            <div class="kv mt10">
              <dt>Rarity</dt><dd>${weaponRarity(w).toUpperCase()}</dd>
              <dt>Value</dt><dd class="gold">${money(weaponValue(w, this.game.state.rep))}</dd>
              <dt>Maker</dt><dd>You</dd>
              <dt>Nature</dt><dd>${w.supernatural ? 'Supernatural — the metal whispers' : 'Mundane steel, honest work'}</dd>
            </div>
            <p class="small muted" style="line-height:1.5;margin-top:10px">${w.legendary ? 'A legendary blade. Wealthy samurai and things that walk at night will hear of this.' : 'A fine piece. Take it to the auction grounds, or keep it on the rack.'}</p>
            <div class="row wrap mt16">
              <button class="btn btn-primary" data-act="forge-again">Forge another</button>
              <button class="btn" data-act="goto" data-panel="auction" data-preselect="${w.id}">Take to auction</button>
              <button class="btn btn-ghost" data-act="close">Done</button>
            </div>
          </div>
        </div>`,
        footer: `<div class="tiny muted grow">${w.legendary ? 'A living legend joins your rack.' : 'The mountain smells of hot steel and pine.'}</div>`,
      });
    }

    if (f.stage >= FORGE_STAGES.length) {
      // decoration choice
      const type = WEAPON_TYPES[this.forgeType];
      const matId = this.resolvedForgeMaterial();
      const avg = Object.values(f.scores).reduce((a, b) => a + b, 0) / Math.max(1, Object.values(f.scores).length);
      return this.sheet({
        title: 'The Final Touch', sub: 'STAGE 6 OF 6 · DECORATION', seal: '飾',
        body: `<div class="forge-stage">
          <div class="stage-head"><span class="stage-num">飾</span><div><h3>Decorate the Mounting</h3><div class="tiny muted">${type.name} · ${MATERIALS[matId]?.name || matId}</div></div></div>
          <p class="stage-desc">A blade is finished when the hand that made it can be recognized. Choose the fittings. Ornate work costs 350 ryō but adds 12% to the final value.</p>
          <div class="split" style="margin-top:10px">
            <div class="card">
              <div class="preview-wrap"><div data-preview style="position:absolute;inset:0"></div></div>
            </div>
            <div>
              <div class="kv"><dt>Stage score</dt><dd>${Math.round(avg)} / 100</dd><dt>Material</dt><dd>${MATERIALS[matId]?.name || matId}</dd><dt>Workshop</dt><dd>Lv.${this.game.state.workshopLevel + 1}</dd></div>
              <div class="rule"></div>
              <div class="actions" style="grid-template-columns:1fr">
                <button class="action-btn primary" data-act="forge-finish" data-deco="0"><b>Plain iron fittings</b><small>Honest, quiet, no extra cost</small></button>
                <button class="action-btn" data-act="forge-finish" data-deco="1" ${this.game.state.money < 350 ? 'disabled' : ''}><b>Ornate mounting</b><small>Gold crest and silk cord · 350 ryō · +12% value</small></button>
              </div>
            </div>
          </div>
        </div>`,
        footer: `<button class="btn btn-ghost" data-act="forge-abort">Leave it unfinished</button>`,
      });
    }

    const stage = FORGE_STAGES[f.stage];
    const nextStage = FORGE_STAGES[f.stage + 1];
    const zoneStyle = `left:${f.zoneStart}%;width:${f.zoneWidth}%`;
    const perfectStyle = `left:${f.zoneStart + f.zoneWidth * 0.32}%;width:${f.zoneWidth * 0.36}%`;
    return this.sheet({
      title: stage.name, sub: `STAGE ${f.stage + 1} OF 6 · ${stage.key.toUpperCase()}`, seal: stage.kanji,
      body: `<div class="forge-stage">
        <div class="stage-head"><span class="stage-num">${stage.kanji}</span><div><h3>${stage.name}</h3><div class="tiny muted">${this.forgeType ? WEAPON_TYPES[this.forgeType].name : ''} · ${MATERIALS[this.resolvedForgeMaterial()]?.name || ''}</div></div></div>
        <p class="stage-desc">${stage.desc}</p>
        <div class="split" style="align-items:center">
          <div>
            <div class="stage-bar-wrap">
              <div class="stage-bar" data-act="forge-strike">
                <div class="ticks"></div>
                <div class="zone" style="${zoneStyle}"></div>
                <div class="zone perfect" style="${perfectStyle}"></div>
                <div class="needle" id="forge-needle" style="left:${f.pos}%"></div>
              </div>
              <div class="statline mt6"><span>${stage.hits} strikes required</span><b>${'◆'.repeat(f.hits)}${'◇'.repeat(Math.max(0, stage.hits - f.hits))}</b></div>
            </div>
            <div class="row between">
              <div class="stage-feedback">${f.feedback}</div>
              <button class="btn btn-primary" data-act="forge-strike" ${f.done ? 'disabled' : ''}>${f.done ? 'Stage complete' : 'Strike'}</button>
            </div>
            ${f.done ? `<div class="rule"></div><div class="row between"><span class="small muted">Stage score: <b style="color:#8b6825">${Math.round(f.scores[stage.key])}</b></span><button class="btn btn-primary" data-act="forge-continue">${nextStage ? `Continue to ${nextStage.name}` : 'Finish the blade'}</button></div>` : ''}
          </div>
          <div class="hammer-visual"><span style="position:absolute;inset:0;display:grid;place-items:center;font-family:var(--jp);font-size:34px;color:#ffe0a2;text-shadow:0 2px 10px #000">${stage.kanji}</span></div>
        </div>
        <div class="rule"></div>
        <div class="tiny muted">Click or tap the bar when the needle is inside the green zone. The golden centre is a perfect strike. Focus is not consumed — only patience.</div>
      </div>`,
      footer: `<div class="tiny muted grow">Hammer blows echo across the mountain.</div><button class="btn btn-ghost" data-act="forge-abort">Step away</button>`,
    });
  }

  beginForge() {
    if (!this.game.canCraft(this.forgeType, this.resolvedForgeMaterial()).ok) { this.toast(this.game.canCraft(this.forgeType, this.resolvedForgeMaterial()).reason, 'warn'); return; }
    this.forge = { active: true, stage: 0, scores: {}, hits: 0, points: 0, done: false, pos: 0, dir: 1, speed: 55, zoneStart: 40, zoneWidth: 24, feedback: '', feedbackKind: '', hitCounts: [] };
    this.forgeResult = null;
    this.setupForgeStage();
    this.renderPanel();
    this.game.sfx('hammer');
  }

  setupForgeStage() {
    const stage = FORGE_STAGES[this.forge.stage];
    const width = stage.width;
    const start = Math.round(12 + Math.random() * (76 - width * 0.6));
    this.forge.zoneStart = Math.min(85 - width, start);
    this.forge.zoneWidth = width;
    this.forge.pos = 4;
    this.forge.dir = 1;
    this.forge.speed = stage.speed;
    this.forge.hits = 0;
    this.forge.points = 0;
    this.forge.done = false;
    this.forge.feedback = 'Find the rhythm…';
    this.forge.feedbackKind = '';
  }

  strikeForge() {
    const f = this.forge;
    if (!f.active || f.done) return;
    const stage = FORGE_STAGES[f.stage];
    const center = f.zoneStart + f.zoneWidth / 2;
    const half = f.zoneWidth / 2;
    const dist = Math.abs(f.pos - center);
    let score = 8, msg = '<span class="miss">Cold steel. The blow glances off.</span>';
    if (dist <= half * 0.34) { score = 100; msg = '<span class="perfect">PERFECT. The steel rings like a temple bell.</span>'; }
    else if (dist <= half * 0.78) { score = 76; msg = '<span class="good">Good. A clean, true blow.</span>'; }
    else if (dist <= half * 1.25) { score = 42; msg = '<span class="miss">A little off. The billet shudders.</span>'; }
    f.points += score;
    f.hits++;
    f.feedback = msg;
    this.game.sfx('hammer');
    // sparks css
    const bar = this.el.root.querySelector('.hammer-visual');
    if (bar) {
      for (let i = 0; i < 5; i++) {
        const sp = document.createElement('span');
        sp.className = 'spark';
        sp.style.left = '50%'; sp.style.top = '50%';
        sp.style.setProperty('--dx', `${(Math.random() - 0.5) * 120}px`);
        sp.style.setProperty('--dy', `${(Math.random() - 0.5) * 120}px`);
        bar.appendChild(sp);
        setTimeout(() => sp.remove(), 650);
      }
    }
    if (f.hits >= stage.hits) {
      f.scores[stage.key] = Math.round(f.points / f.hits);
      f.done = true;
      f.feedback = `<span class="good">Stage complete — ${f.scores[stage.key]}/100.</span>`;
      this.game.sfx('anvil');
    } else {
      const width = stage.width;
      f.zoneStart = Math.min(85 - width, Math.round(10 + Math.random() * (80 - width)));
      f.dir = Math.random() > 0.5 ? 1 : -1;
      f.speed = stage.speed * (0.95 + Math.random() * 0.2);
    }
    this.renderPanel();
  }

  continueForge() {
    const f = this.forge;
    if (!f.done) return;
    f.stage++;
    f.done = false;
    if (f.stage < FORGE_STAGES.length) {
      this.setupForgeStage();
    }
    this.renderPanel();
  }

  finishForge(decoration) {
    const scores = { ...this.forge.scores };
    const w = this.game.finishCraft({ typeId: this.forgeType, materialId: this.resolvedForgeMaterial(), scores, decoration });
    if (!w) { this.renderPanel(); return; }
    this.forgeResult = w;
    this.forge.active = false;
    this.forge.stage = 0;
    this.renderPanel();
  }

  // ————— AUCTION —————
  auctionItems() {
    const s = this.game.state;
    return [...s.trees.filter((t) => !t.heirloom), ...s.weapons];
  }

  panel_auction() {
    const s = this.game.state;
    if (this.liveAuction) return this.auctionLiveView();
    if (this.auctionResult) return this.auctionResultView();
    const tab = this.tabs.auction;
    const canStart = tab === 'sell' && this.auctionItems().length > 0;
    const body = this.tabsHTML('auction') + (tab === 'commissions' ? this.commissionsView() : tab === 'patrons' ? this.patronsView() : this.auctionSellView());
    return this.sheet({
      title: 'The Mountain Auction', sub: 'AUCTION GROUNDS · 競り市', seal: '競', body,
      footer: `<div class="tiny muted grow">Auction fee 7%. Reputation and relationships raise final prices.</div>
        ${canStart ? '<button class="btn btn-primary" data-act="auction-start">Open the bidding</button>' : ''}
        <button class="btn btn-ghost" data-act="goto" data-panel="map" data-tab="map">Go to the grounds</button>
        <button class="btn" data-act="close">Back to the mountain</button>`,
    });
  }

  auctionSellView() {
    const s = this.game.state;
    const items = this.auctionItems();
    if (!items.find((i) => i.id === this.selectedAuctionId)) this.selectedAuctionId = items[0]?.id || null;
    const item = items.find((i) => i.id === this.selectedAuctionId);
    const appraised = item ? appraisal(item, s) : 0;
    const night = isNight(s.hour);
    const supernatural = item ? itemSupernatural(item) : false;
    const itemPreview = item ? `
      <div class="card" style="padding:14px">
        <div class="preview-wrap" style="height:230px">
          <div data-preview style="position:absolute;inset:0"></div>
          <div class="preview-caption"><span class="jp">${item.kind === 'tree' ? SPECIES[item.sp]?.jp : WEAPON_TYPES[item.type]?.jp}</span><span>${money(appraised)}</span></div>
        </div>
        <div class="row between mt10">
          <div><h3 style="margin:0;font-size:21px">${esc(item.name)}</h3><div class="tiny muted">${itemLabel(item)}</div></div>
          <div>${rarityTag(item, item.kind === 'tree' ? 'tree' : 'weapon')}</div>
        </div>
        <div class="kv mt10">
          <dt>Appraisal</dt><dd class="gold">${money(appraised)} <span class="tiny muted">seasonal demand</span></dd>
          <dt>Quality</dt><dd>${itemQuality(item)} / 100</dd>
          ${item.kind === 'tree' ? `<dt>Age</dt><dd>${item.age.toFixed(1)} years</dd><dt>Style</dt><dd>${Math.round(item.style)}</dd>` : `<dt>Material</dt><dd>${MATERIALS[item.material]?.name || item.material}</dd><dt>Durability</dt><dd>${item.durability}</dd>`}
          <dt>Fee</dt><dd>7% of final bid</dd>
        </div>
        <div class="tiny muted mt10">${supernatural && night ? 'The Oni are abroad tonight. Supernatural lots attract strange buyers.' : seasonalTag(s)}</div>
      </div>` : `<div class="empty"><span class="big">競</span>Nothing to sell. Craft a blade or raise a bonsai first.</div>`;
    const startBlock = item ? `
      <div class="rule"></div>
      <div class="row between"><div class="section-label" style="margin:0">Opening bid</div><span class="tiny muted">${supernatural && night ? 'Night auction' : 'Daylight auction'}</span></div>
      <div class="start-price">
        ${[[0.55, 'Cautious'], [0.75, 'Balanced'], [1.0, 'Confident']].map(([m, label]) => `
          <button class="${this.startMult === m ? 'active' : ''}" data-act="auction-mult" data-mult="${m}">
            <b>${money(Math.round(appraised * m / 10) * 10)}</b><small>${label} · ${Math.round(m * 100)}% of appraisal</small>
          </button>`).join('')}
      </div>
      <div class="tiny muted mt6">Choose a starting price, then open the bidding.</div>` : '';
    return `<div class="split-wide">
      <div>
        <div class="section-label">Your consignment</div>
        ${items.length ? `<div class="panel-grid" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr));max-height:480px;overflow-y:auto;padding-right:2px">${items.map((i) => itemCard(i, i.id === this.selectedAuctionId)).join('')}</div>` : `<div class="empty"><span class="big">空</span>Your storehouse is empty.</div>`}
        <div class="rule"></div>
        <div class="tiny muted">Heirlooms are marked 宝 and never appear here. ${night ? 'Night auction: Oni may bid on supernatural works.' : 'Daylight auction: samurai, monks, merchants and nobles gather.'}</div>
        ${startBlock}
      </div>
      <div>${itemPreview}</div>
    </div>`;
  }

  auctionLiveView() {
    const a = this.liveAuction;
    const item = a.item;
    const buyerHTML = a.buyers.map((b) => `
      <div class="buyer ${b.type} ${b.active ? '' : 'out'} ${a.highest?.id === b.id ? 'leading' : ''}" data-buyer="${b.id}">
        <div class="face">${b.kanji}</div>
        <div class="grow"><b>${esc(b.name)}</b><small>${b.typeName} · ${b.personality}</small><div class="quote">“${esc(b.quote)}”</div></div>
        <div class="budget"><small>Bids</small><b>${b.bids}</b></div>
      </div>`).join('');
    return this.sheet({
      title: 'The Bidding Has Begun', sub: 'AUCTION GROUNDS · LIVE', seal: '競',
      body: `<div class="split-wide">
        <div>
          <div class="preview-wrap" style="height:260px"><div data-preview style="position:absolute;inset:0"></div>
            <div class="preview-caption"><span class="jp">${item.kind === 'tree' ? SPECIES[item.sp]?.jp : WEAPON_TYPES[item.type]?.jp}</span><span>${itemLabel(item)}</span></div>
          </div>
          <div class="auction-stage mt10">
            <div class="row between"><span class="live">LIVE AUCTION</span><span class="tiny" id="live-round" style="color:#b9a888">ROUND ${a.round}</span></div>
            <div class="bid-amount"><span id="live-bid">${fmt(a.currentBid)}</span><small>RYŌ</small></div>
            <div class="tiny" id="live-leader" style="color:#d8b87e;letter-spacing:.12em">${a.highest ? esc(a.highest.name) + ' LEADS' : 'AWAITING THE FIRST BID'}</div>
            <div class="bid-log" id="live-log">${(a.log || []).map((l) => `<div class="bid-line ${l.you ? 'you' : ''}"><b>${esc(l.who)}</b><span>${esc(l.text)}</span><span class="amt">${l.amount ? fmt(l.amount) : ''}</span></div>`).join('')}</div>
            <div class="tiny muted mt10">Appraisal ${money(a.appraisal)} · opening ${money(a.startBid)} · fee 7%</div>
          </div>
        </div>
        <div>
          <div class="section-label">Bidders</div>
          <div class="buyer-grid" id="live-buyers">${buyerHTML}</div>
          <div class="rule"></div>
          <div class="card" style="padding:10px 12px">
            <div class="row between"><span class="small muted">Current bid</span><b class="gold" id="live-current">${money(a.currentBid)}</b></div>
            <div class="row between mt6"><span class="small muted">Highest bidder</span><b id="live-high">${a.highest ? esc(a.highest.name) : '—'}</b></div>
          </div>
          <button class="btn btn-primary mt10" style="width:100%" data-act="auction-hammer" id="live-hammer" ${a.highest ? '' : 'disabled'}>Bring down the hammer</button>
          <div class="tiny muted center mt6">${a.highest ? 'Sell now, or let the bidding climb.' : 'Wait for a hand to rise.'}</div>
        </div>
      </div>`,
      footer: `<div class="tiny muted grow">The auctioneer watches the room, not the seller.</div>
        <button class="btn btn-ghost" data-act="close">Abandon auction</button>`,
    });
  }

  startAuction() {
    const item = this.auctionItems().find((i) => i.id === this.selectedAuctionId);
    if (!item) { this.toast('Choose something to sell.', 'warn'); return; }
    if (item.heirloom) { this.toast('Heirlooms are not for sale.', 'warn'); return; }
    const s = this.game.state;
    const a = createAuction(item, s, { startMultiplier: this.startMult, night: isNight(s.hour) });
    a.log = [];
    a.log.push({ who: 'Auctioneer', text: `${itemLabel(item)} opens at ${money(a.startBid)}.` });
    this.liveAuction = a;
    this.auctionResult = null;
    this.renderPanel();
    this.game.sfx('gavel');
    this.auctionTimer = setInterval(() => this.stepAuction(), 1500);
  }

  stepAuction() {
    const a = this.liveAuction;
    if (!a) { this.clearAuctionTimer(); return; }
    const res = advanceAuction(a);
    for (const ev of res.events) {
      if (ev.type === 'bid') a.log.push({ who: ev.buyer.name, amount: ev.amount, text: 'raises the bid.' });
      else if (ev.type === 'out') a.log.push({ who: ev.buyer.name, text: 'falls silent.' });
      else if (ev.type === 'hammer') a.log.push({ who: 'Auctioneer', text: 'The hammer falls!', amount: ev.amount });
      else if (ev.type === 'unsold') a.log.push({ who: 'Auctioneer', text: 'No further bids.' });
    }
    if (res.ended) { this.finishLiveAuction(); return; }
    this.refreshAuctionLive();
  }

  refreshAuctionLive() {
    const a = this.liveAuction;
    if (!a || this.panel !== 'auction') return;
    const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
    set('live-bid', fmt(a.currentBid));
    set('live-current', money(a.currentBid));
    set('live-round', `ROUND ${a.round}`);
    set('live-high', a.highest ? a.highest.name : '—');
    const leader = document.getElementById('live-leader');
    if (leader) leader.textContent = a.highest ? a.highest.name.toUpperCase() + ' LEADS' : 'AWAITING THE FIRST BID';
    const log = document.getElementById('live-log');
    if (log) log.innerHTML = a.log.map((l) => `<div class="bid-line ${l.who === 'You' ? 'you' : ''}"><b>${esc(l.who)}</b><span>${esc(l.text)}</span><span class="amt">${l.amount ? fmt(l.amount) : ''}</span></div>`).join('');
    const buyers = document.getElementById('live-buyers');
    if (buyers) {
      buyers.innerHTML = a.buyers.map((b) => `
        <div class="buyer ${b.type} ${b.active ? '' : 'out'} ${a.highest?.id === b.id ? 'leading' : ''}">
          <div class="face">${b.kanji}</div>
          <div class="grow"><b>${esc(b.name)}</b><small>${b.typeName} · ${b.personality}</small><div class="quote">“${esc(b.quote)}”</div></div>
          <div class="budget"><small>Bids</small><b>${b.bids}</b></div>
        </div>`).join('');
    }
    const hammer = document.getElementById('live-hammer');
    if (hammer) hammer.disabled = !a.highest;
    if (a.sold) this.finishLiveAuction();
  }

  hammerLiveAuction() {
    const a = this.liveAuction;
    if (!a) return;
    const res = hammerAuction(a);
    for (const ev of res.events) {
      if (ev.type === 'hammer') a.log.push({ who: 'Auctioneer', text: 'The hammer falls!', amount: ev.amount });
      if (ev.type === 'unsold') a.log.push({ who: 'Auctioneer', text: 'No bids. The lot returns to you.' });
    }
    this.refreshAuctionLive();
    this.finishLiveAuction();
  }

  finishLiveAuction() {
    const a = this.liveAuction;
    if (!a) return;
    this.clearAuctionTimer();
    this.liveAuction = null;
    if (a.sold) {
      const settlement = this.game.completeSale(a);
      this.auctionResult = { item: a.item, settlement };
      this.audio.sfx('gavel');
      setTimeout(() => this.audio.sfx('sale'), 450);
    } else {
      this.auctionResult = { item: a.item, unsold: true };
      this.audio.sfx('gavel');
    }
    this.renderPanel();
  }

  auctionResultView() {
    const r = this.auctionResult;
    const item = r.item;
    if (r.unsold) {
      return this.sheet({
        title: 'The Mountain Was Quiet', sub: 'AUCTION · NO BIDS', seal: '静',
        body: `<div class="center" style="padding:24px 10px">
          <div style="font-family:var(--jp);font-size:64px;color:var(--ink-faint)">空</div>
          <h3 style="font-size:26px;margin:6px 0">No hand was raised.</h3>
          <p class="small muted" style="max-width:480px;margin:0 auto">${esc(itemLabel(item))} returns to your storehouse. Try a lower opening bid, improve its quality, or wait for a season of stronger demand.</p>
          <div class="row" style="justify-content:center;margin-top:18px">
            <button class="btn btn-primary" data-act="auction-reset">Try another lot</button>
            <button class="btn" data-act="close">Return to the mountain</button>
          </div>
        </div>`,
        footer: `<div class="tiny muted grow">The auctioneer bows and moves to the next lot.</div>
          <button class="btn" data-act="close">Return</button>
          <button class="btn btn-primary" data-act="auction-reset">Try another lot</button>`,
      });
    }
    const st = r.settlement;
    return this.sheet({
      title: 'Sold to the Mountain', sub: 'AUCTION · HAMMER FALLEN', seal: '売',
      body: `<div class="center" style="padding:10px 0 4px">
        <div class="row" style="justify-content:center;gap:10px;align-items:center"><span class="tag gold">SOLD</span><span class="tiny muted">LOT ${esc(item.name).toUpperCase()}</span></div>
        <div style="font-family:var(--jp);font-size:42px;letter-spacing:.2em;color:var(--verm);margin-top:10px">落札</div>
        <div class="big-amount">${money(st.gross)}</div>
        <div class="small muted">to <b style="color:var(--ink)">${esc(st.buyer.name)}</b> · ${st.buyer.typeName}</div>
        <div class="preview-wrap" style="max-width:300px;height:240px;margin:16px auto 6px"><div data-preview style="position:absolute;inset:0"></div></div>
        <div class="kv" style="display:inline-grid;text-align:left;margin-top:8px">
          <dt>Gross</dt><dd>${money(st.gross)}</dd>
          <dt>Fee (7%)</dt><dd>− ${money(st.fee)}</dd>
          <dt>Net to you</dt><dd class="gold"><b>${money(st.payout)}</b></dd>
          <dt>Reputation</dt><dd>+${st.repGain}</dd>
        </div>
        <div class="card" style="max-width:440px;margin:16px auto 0;text-align:left">
          <div class="tiny muted">THE BUYER SAYS</div>
          <p class="small" style="margin:5px 0 0;font-style:italic;line-height:1.5">“${esc(st.buyer.quote)}”</p>
        </div>
        <div class="row" style="justify-content:center;margin-top:18px">
          <button class="btn btn-primary" data-act="auction-reset">Sell another</button>
          <button class="btn" data-act="close">Return to the mountain</button>
        </div>
      </div>`,
      footer: `<div class="tiny muted grow">A good sale is a small story the mountain tells for years.</div>
        <button class="btn" data-act="close">Return</button>
        <button class="btn btn-primary" data-act="auction-reset">Sell another</button>`,
    });
  }

  commissionsView() {
    const s = this.game.state;
    const items = this.auctionItems();
    if (!s.commissions.length) return `<div class="empty"><span class="big">注</span>No open commissions. Patrons send new requests at dawn.<br><button class="btn btn-sm mt10" data-act="close">Return to the mountain</button></div>`;
    return `<div class="section-label">Open commissions</div>
      <div class="panel-grid" style="grid-template-columns:repeat(auto-fill,minmax(320px,1fr))">
        ${s.commissions.map((c) => {
          const matches = items.filter((i) => commissionMatches(c, i));
          const extra = c.buyerType === 'oni' ? 'oni' : '';
          return `<div class="commission ${matches.length ? 'done' : ''}">
            <div class="c-head"><b>${esc(c.client)}</b><span class="tag ${extra}">${BUYER_TYPES[c.buyerType]?.name || c.buyerType}</span><span class="tag">${c.kind}</span></div>
            <p>${esc(c.desc)}</p>
            <div class="c-foot"><span>Deadline: day ${c.deadlineDay}</span><b>${money(c.reward)} + ${c.rep} rep</b></div>
            <div class="rule" style="margin:8px 0"></div>
            ${matches.length ? matches.slice(0, 2).map((i) => `
              <div class="row between" style="gap:8px;margin-top:5px">
                <span class="small">${esc(i.name)} <span class="muted">${i.kind === 'tree' ? SPECIES[i.sp]?.name : WEAPON_TYPES[i.type]?.name}</span></span>
                <button class="btn btn-xs btn-primary" data-act="commission-deliver" data-com="${c.id}" data-item="${i.id}">Deliver</button>
              </div>`).join('') : `<div class="tiny muted">No matching piece yet. ${c.kind === 'weapon' ? `Forge a ${WEAPON_TYPES[c.req.weaponType]?.name} at quality ${c.req.minQuality}+.` : `Raise a ${SPECIES[c.req.species]?.name} to style ${c.req.minStyle}+ and age ${c.req.minAge.toFixed(1)}+.`}</div>`}
          </div>`;
        }).join('')}
      </div>
      <div class="tiny muted mt10">Deliver at the Patrons desk. New commissions arrive each dawn, up to three at a time.</div>`;
  }

  patronsView() {
    const s = this.game.state;
    const season = seasonOf(s.day);
    const demand = { bonsai: season.name + ' bonsai demand', weapon: 'weapon demand', ornament: 'ornament demand', supernatural: 'supernatural demand' };
    return `<div class="section-label">Relationships</div>
      <div class="panel-grid" style="grid-template-columns:repeat(auto-fill,minmax(250px,1fr))">
        ${Object.values(BUYER_TYPES).map((b) => {
          const sales = s.buyers[b.id] || 0;
          const level = Math.min(5, Math.floor(sales / 2));
          return `<div class="card">
            <div class="row" style="gap:10px"><div class="kanji-badge">${b.kanji}</div><div><h3 style="margin:0;font-size:17px">${b.name}</h3><div class="tiny muted">${b.jp} · relationship ${level}/5</div></div></div>
            <p class="small muted" style="line-height:1.4;margin:8px 0">${b.quotes[0]}</p>
            <div class="row between"><span class="tiny muted">Sales: ${sales}</span><span class="tag gold">${sales ? '+' + Math.min(22, sales * 2.2).toFixed(0) + '% budgets' : 'new patron'}</span></div>
            <div class="tiny muted mt6">Prefers: ${b.pref.join(', ')}</div>
          </div>`;
        }).join('')}
      </div>
      <div class="rule"></div>
      <div class="section-label">Seasonal demand · ${season.name}</div>
      <div class="panel-grid grid-4">
        ${Object.entries(demand).map(([k, label]) => `<div class="card center"><div class="tiny muted">${label.toUpperCase()}</div><div style="font-size:22px;color:var(--verm);font-family:var(--jp)">${k === 'bonsai' ? '盆' : k === 'weapon' ? '刀' : k === 'ornament' ? '飾' : '妖'}</div><div class="small">×${(require_demand(k, s))?.toFixed(2) || '1.00'}</div></div>`).join('')}
      </div>
      <div class="tiny muted mt10">${seasonalTag(s)}</div>`;
  }

  // ————— MARKET —————
  panel_market() {
    const s = this.game.state;
    const tab = this.tabs.market;
    const body = `
      <div class="row between wrap mb10">
        <div class="row" style="gap:8px"><span class="tag gold">Ryō ${fmt(s.money)}</span><span class="tag">${seasonOf(s.day).name}</span></div>
        <span class="tiny muted">${seasonalTag(s)}</span>
      </div>
      ${this.tabsHTML('market')}
      ${tab === 'materials' ? this.marketMaterials() : this.marketSeeds()}
    `;
    return this.sheet({
      title: 'Kagaribi Village Market', sub: 'MERCHANT GOODS · 市', seal: '市', body,
      footer: `<div class="tiny muted grow">Goods are carried to your estate. The merchant never asks where the money came from.</div>
        <button class="btn" data-act="close">Leave the stall</button>`,
    });
  }

  marketSeeds() {
    const s = this.game.state;
    return `<div class="section-label">Seeds & saplings</div>
      <div class="shop-grid">
        ${Object.values(SPECIES).filter((sp) => !sp.supernatural).map((sp) => {
          const locked = sp.repReq && s.rep < sp.repReq;
          return `<div class="shop-card ${locked ? 'dim' : ''}">
            <h4><span class="k">${sp.kanji}</span>${sp.name} <span class="tag">${sp.rarity}</span></h4>
            <p>${sp.desc}</p>
            <div class="tiny muted">Growth ×${sp.growth} · ${sp.jp} · Owned: <b>${s.seeds[sp.id] || 0}</b></div>
            <div class="buy-row"><b>${money(sp.seedCost)}</b><button class="btn btn-sm" data-act="buy-seed" data-sp="${sp.id}" ${s.money < sp.seedCost || locked ? 'disabled' : ''}>${locked ? `Rep ${sp.repReq}` : 'Buy seed'}</button></div>
          </div>`;
        }).join('')}
      </div>
      <div class="rule"></div>
      <div class="tiny muted">Ancient and supernatural seeds are not sold by village merchants. The red gate trades in stranger things.</div>`;
  }

  marketMaterials() {
    const s = this.game.state;
    return `<div class="section-label">Smithing materials</div>
      <div class="shop-grid">
        ${Object.values(MATERIALS).filter((m) => !['onisteel', 'spiritwood'].includes(m.id)).map((m) => {
          const gated = m.id === 'folded' && s.rep < 200;
          return `<div class="shop-card ${gated ? 'dim' : ''}">
            <h4><span class="k">${m.jp}</span>${m.name}</h4>
            <p>${m.desc}</p>
            <div class="tiny muted">Quality ${m.quality} · Owned: <b>${s.materials[m.id] || 0}</b>${gated ? ' · requires 200 rep' : ''}</div>
            <div class="buy-row"><b>${money(m.cost)}</b><div class="row" style="gap:4px">
              <button class="btn btn-xs" data-act="buy-mat" data-mat="${m.id}" data-qty="1" ${s.money < m.cost || gated ? 'disabled' : ''}>×1</button>
              <button class="btn btn-xs btn-gold" data-act="buy-mat" data-mat="${m.id}" data-qty="5" ${s.money < m.cost * 5 || gated ? 'disabled' : ''}>×5</button>
            </div></div>
          </div>`;
        }).join('')}
      </div>
      <div class="rule"></div>
      <div class="tiny muted">Enchanted oni steel and spirit wood are only traded after dark.</div>`;
  }

  // ————— ESTATE —————
  panel_estate() {
    const s = this.game.state;
    const tab = this.tabs.estate;
    const beauty = beautyOf(s);
    const income = visitorIncome(s);
    const wages = dailyWages(s);
    const body = `
      <div class="estate-hero">
        <div class="sun"></div><div class="ridge2"></div><div class="ridge"></div>
        <div class="hero-label"><b>YOUR MOUNTAIN ESTATE</b><small>${s.decor.length} decorations · ${s.trees.length} trees · ${s.weapons.length} blades</small></div>
        <div class="hero-stat"><span>Beauty <b>${beauty}</b></span><span>Visitors <b>${money(income)}/day</b></span><span>Wages <b>${money(wages)}/day</b></span></div>
      </div>
      ${this.tabsHTML('estate')}
      ${tab === 'grounds' ? this.estateGrounds() : tab === 'staff' ? this.estateStaff() : tab === 'decor' ? this.estateDecor() : this.estateHeirlooms()}
    `;
    return this.sheet({
      title: 'Your Estate', sub: 'GROUNDS · HOUSEHOLD · LEGACY', seal: '宅', body,
      footer: `<div class="tiny muted grow">Reputation ${fmt(s.rep)} · ${rankFor(s.rep).name} · ${s.discovered.length} discovered places</div>
        <button class="btn" data-act="save-rest">Save & rest</button>
        <button class="btn btn-ghost" data-act="close">Close</button>`,
    });
  }

  estateGrounds() {
    const s = this.game.state;
    const rows = [];
    for (const [key, def] of Object.entries(UPGRADES)) {
      const level = key === 'garden' ? s.gardenLevel : key === 'workshop' ? s.workshopLevel : s.misthouseLevel;
      const max = def.levels;
      const cost = level < max ? def.costs[level] : 0;
      const effect = level < max ? def.desc[level] : 'Fully upgraded.';
      const extra = key === 'garden' ? `Capacity ${treeCapacity(s)} trees` : key === 'workshop' ? `Quality +${s.workshopLevel * 4 + (s.workshopLevel >= 3 ? 8 : 0)} · recipes tier ${Math.min(3, s.workshopLevel + 1)}` : `Growth ×${[1, 1.22, 1.45][s.misthouseLevel]}`;
      rows.push(`<div class="upgrade-row">
        <div class="u-icon">${def.kanji}</div>
        <div><h4>${def.name} <span class="tiny muted">${def.jp}</span></h4><p>${effect}</p><div class="tiny muted mt6">${extra}</div></div>
        <div class="u-right">${pips(level, max)}${level < max ? `<b>${money(cost)}</b><button class="btn btn-sm ${s.money >= cost ? 'btn-primary' : ''}" data-act="upgrade" data-kind="${key}" ${s.money < cost ? 'disabled' : ''}>Upgrade</button>` : '<span class="tag green">MAX</span>'}</div>
      </div>`);
    }
    return `<div class="section-label">Grounds, forge & mist house</div>${rows.join('')}
      <div class="rule"></div>
      <div class="row between"><div class="tiny muted">Daily visitors pay for beauty and reputation. Wages are paid at dawn.</div><button class="btn btn-sm btn-ghost" data-act="goto" data-panel="bonsai">Tend the garden</button></div>`;
  }

  estateStaff() {
    const s = this.game.state;
    return `<div class="section-label">Household</div>
      ${Object.values(HIRES).map((h) => {
        const count = s.hires[h.id] || 0;
        const cost = count < h.max ? h.cost[count] : 0;
        return `<div class="upgrade-row">
          <div class="u-icon">${h.kanji}</div>
          <div><h4>${h.name} <span class="tiny muted">${h.jp} · ${count}/${h.max}</span></h4><p>${h.desc}</p><div class="tiny muted mt6">Daily wage ${money(h.wage)} each</div></div>
          <div class="u-right">${pips(count, h.max)}${count < h.max ? `<b>${money(cost)}</b><button class="btn btn-sm" data-act="hire" data-kind="${h.id}" ${s.money < cost ? 'disabled' : ''}>Hire</button>` : '<span class="tag green">FULL</span>'}</div>
        </div>`;
      }).join('')}
      <div class="rule"></div>
      <div class="tiny muted">The gardener waters the thirstiest tree each dawn. Each forge assistant adds +6 quality and reduces the chance of a cold strike.</div>`;
  }

  estateDecor() {
    const s = this.game.state;
    return `<div class="section-label">Garden decorations</div>
      <div class="shop-grid">
        ${Object.values(DECOR).map((d) => {
          const owned = s.decor.includes(d.id);
          return `<div class="shop-card ${owned ? 'dim' : ''}">
            <h4><span class="k">${d.kanji}</span>${d.name} <span class="tag">${d.jp}</span></h4>
            <p>${d.desc}</p>
            <div class="tiny muted">Beauty +${d.beauty}</div>
            <div class="buy-row"><b>${money(d.cost)}</b>${owned ? '<span class="tag green">PLACED</span>' : `<button class="btn btn-sm" data-act="decor" data-id="${d.id}" ${s.money < d.cost ? 'disabled' : ''}>Place</button>`}</div>
          </div>`;
        }).join('')}
      </div>`;
  }

  estateHeirlooms() {
    const s = this.game.state;
    const trees = s.trees.filter((t) => t.heirloom);
    return `<div class="section-label">Family heirlooms</div>
      ${trees.length ? `<div class="tree-grid">${trees.map((t) => `<div class="card">
        <div class="tree-art" style="height:130px"><span class="heirloom">宝</span>${treeSVG(t, seasonOf(s.day).id)}</div>
        <div class="info"><h4>${esc(t.name)}</h4><div class="meta">${SPECIES[t.sp]?.name} · ${t.age.toFixed(1)} yrs</div><div class="val">${money(treeValue(t))}</div>
        <div class="row mt6" style="gap:5px"><button class="btn btn-xs" data-act="view-tree" data-id="${t.id}">Tend</button><button class="btn btn-xs btn-ghost" data-act="release-heirloom" data-id="${t.id}">Release</button></div></div>
      </div>`).join('')}</div>` : `<div class="empty"><span class="big">宝</span>No heirlooms yet. Mark a tree as an heirloom from its detail panel to keep it forever and raise the beauty of your estate.</div>`}
      <div class="rule"></div>
      <div class="tiny muted">Heirlooms cannot be sold. They contribute their value to the prestige and daily visitor income of your estate.</div>`;
  }

  // ————— MAP —————
  panel_map() {
    const s = this.game.state;
    const p = this.world.player.position;
    const nearest = Object.values(LOCATIONS).sort((a, b) => Math.hypot(a.x - p.x, a.z - p.z) - Math.hypot(b.x - p.x, b.z - p.z))[0];
    const mx = (x) => 40 + ((x + 175) / 350) * 540;
    const my = (z) => 30 + ((z + 175) / 350) * 370;
    const night = isNight(s.hour);
    const pins = Object.values(LOCATIONS).map((loc) => {
      const active = loc.id === nearest?.id;
      return `<g class="map-pin" data-act="travel" data-loc="${loc.id}" role="button" tabindex="0">
        <circle cx="${mx(loc.x)}" cy="${my(loc.z)}" r="${active ? 10 : 7}" fill="${active ? '#b33a2b' : '#2c271e'}" stroke="#f3e9d2" stroke-width="${active ? 2.5 : 1.5}"/>
        <text x="${mx(loc.x)}" y="${my(loc.z) + 4}" text-anchor="middle" font-size="10" fill="#f3e9d2" style="pointer-events:none">${loc.kanji}</text>
        <text x="${mx(loc.x)}" y="${my(loc.z) + 20}" text-anchor="middle" class="lbl" style="pointer-events:none">${loc.name.replace('Your ', '').toUpperCase()}</text>
      </g>`;
    }).join('');
    const pathLines = Object.values(LOCATIONS).filter((l) => l.id !== 'estate').map((loc) => `<line x1="${mx(0)}" y1="${my(0)}" x2="${mx(loc.x)}" y2="${my(loc.z)}" stroke="#b8ab8d" stroke-width="1.2" stroke-dasharray="4 4" opacity=".75"/>`).join('');
    const map = `<div class="map-wrap">
      <svg viewBox="0 0 620 440" style="width:100%;height:100%">
        <defs>
          <radialGradient id="mapglow" cx="50%" cy="45%" r="65%"><stop offset="0" stop-color="#e9e1cc"/><stop offset="1" stop-color="#c9c0a8"/></radialGradient>
          <pattern id="pines" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M9 1 L13 8 L5 8 Z" fill="#7f8a6e" opacity=".25"/></pattern>
        </defs>
        <rect width="620" height="440" fill="url(#mapglow)"/>
        <rect x="14" y="14" width="592" height="412" fill="url(#pines)" opacity=".5"/>
        <path d="M0 70 L55 20 L105 75 L150 30 L195 82 L130 110 L70 98 Z" fill="#a8a48f" opacity=".55"/>
        <path d="M500 0 L620 0 L620 120 L570 95 L535 55 L500 30 Z" fill="#9aa08c" opacity=".5"/>
        <path d="M0 350 L60 400 L140 420 L80 440 L0 440 Z" fill="#9aa08c" opacity=".5"/>
        <path d="M420 380 L500 340 L575 390 L620 360 L620 440 L400 440 Z" fill="#a8a48f" opacity=".45"/>
        <path d="M0 250 C90 235, 120 285, 200 260 C260 240, 300 300, 380 280 C450 265, 500 310, 620 290" stroke="#8fb0b2" stroke-width="7" fill="none" opacity=".55"/>
        <path d="M0 255 C90 240, 120 290, 200 265 C260 245, 300 305, 380 285 C450 270, 500 315, 620 295" stroke="#d6e4e2" stroke-width="2" fill="none" opacity=".7"/>
        ${pathLines}
        ${pins}
        <g transform="translate(${mx(92) + 12},${my(-88) - 22})" opacity="${night ? 1 : 0.35}">
          <circle r="8" fill="${night ? '#8f2438' : '#6b5a4a'}" stroke="${night ? '#e8c6a0' : '#a99a80'}" stroke-width="1"/>
          <text y="3.5" text-anchor="middle" font-size="8" fill="#f4e0c8" font-family="'Shippori Mincho',serif">鬼</text>
        </g>
        <text x="26" y="424" font-size="8" fill="#6b6254" letter-spacing="2">THE MOUNTAIN PROVINCE · 山国</text>
        <g transform="translate(540,390)"><circle r="17" fill="none" stroke="#8b7e66" stroke-width="1"/><text y="5" text-anchor="middle" font-family="'Shippori Mincho',serif" font-size="14" fill="#6b5a44">北</text><path d="M0 -24 L4 -16 L-4 -16 Z" fill="#8b7e66"/></g>
      </svg>
      <div class="hero-label" style="position:absolute;left:14px;top:12px;bottom:auto;color:#4d4334;text-shadow:none">
        <b style="font-size:15px">THE MOUNTAIN</b><br><small style="color:#7b6f5c">${s.discovered.length} / ${Object.keys(LOCATIONS).length} places discovered</small>
      </div>
    </div>`;
    const list = Object.values(LOCATIONS).map((loc) => {
      const active = loc.id === nearest?.id;
      const dist = Math.round(Math.hypot(loc.x - p.x, loc.z - p.z));
      return `<button class="location ${active ? 'current' : ''}" data-act="travel" data-loc="${loc.id}">
        <span class="l-kanji">${loc.kanji}</span>
        <span class="grow"><b>${loc.name} ${active ? '<span class="tag red" style="margin-left:4px">HERE</span>' : ''}</b><small>${loc.jp} · ${loc.blurb} · ${dist}m</small></span>
        <span class="go">${active ? 'STAY' : 'TRAVEL'}</span>
      </button>`;
    }).join('');
    return this.sheet({
      title: 'The Mountain Map', sub: 'TRAVEL & EXPLORATION · 山', seal: '山',
      body: `<div class="split-wide">
        <div>${map}</div>
        <div>
          <div class="section-label">Places</div>
          <div class="location-list">${list}</div>
          <div class="rule"></div>
          <div class="card" style="padding:10px 12px">
            <div class="tiny muted">${night ? 'NIGHT' : 'DAY'} · ${String(Math.floor(s.minutes / 60)).padStart(2, '0')}:${String(s.minutes % 60).padStart(2, '0')} · ${WEATHERS[s.weather]?.name || 'Clear'}</div>
            <div class="small mt6">${night ? 'The red gate in the bamboo forest is open. The night auction stirs.' : 'The auction grounds and village are busy by day. Some doors open only after dark.'}</div>
          </div>
        </div>
      </div>`,
      footer: `<div class="tiny muted grow">Travel is instant. The world keeps its own time while you walk.</div>
        <button class="btn" data-act="travel" data-loc="estate">Return home</button>
        <button class="btn btn-ghost" data-act="close">Close map</button>`,
    });
  }

  travel(locId) {
    this.closePanel();
    this.audio.sfx('open');
    this.el.fade.classList.add('show');
    setTimeout(() => {
      this.world.travelTo(locId);
      this.el.fade.classList.remove('show');
      const loc = LOCATIONS[locId];
      if (loc) setTimeout(() => this.showZone(loc), 300);
    }, 520);
  }

  // ————— ONI —————
  panel_oni() {
    const s = this.game.state;
    const tab = this.tabs.oni;
    if (!s.oniLot && tab === 'lot') { /* no lot */ }
    const body = `
      <div class="row between mb10">
        <div class="row" style="gap:8px"><span class="tag night">NIGHT MARKET</span><span class="tag">Ryō ${fmt(s.money)}</span></div>
        <span class="tiny" style="color:#a88784">THE RED GATE · ${String(Math.floor(s.minutes / 60)).padStart(2, '0')}:${String(s.minutes % 60).padStart(2, '0')}</span>
      </div>
      ${this.tabsHTML('oni')}
      ${tab === 'lot' ? this.oniLotView() : this.oniWaresView()}
    `;
    const lot = s.oniLot;
    let bidActions = '';
    if (tab === 'lot' && lot?.status === 'open') {
      const inc = Math.max(300, Math.round(lot.currentBid * 0.08 / 50) * 50);
      const next = lot.currentBid + inc;
      bidActions = `<span class="small" style="color:#c8b3ab">Next bid <b class="gold">${money(next)}</b></span>
        <button class="btn btn-ghost" style="color:#d9b9b1;border-color:rgba(190,100,110,.3)" data-act="oni-withdraw">Withdraw</button>
        <button class="btn btn-primary" data-act="oni-bid" ${s.money < next ? 'disabled' : ''}>Raise the bid</button>`;
    }
    return this.sheet({
      title: 'The Night Market', sub: 'FORBIDDEN WARES · 鬼市', seal: '鬼', dark: true, body,
      footer: `<div class="tiny muted grow" style="color:#a88784">“We do not lie. We simply do not explain.”</div>
        ${bidActions}
        <button class="btn btn-ghost" data-act="close">Step back into the mist</button>`,
    });
  }

  oniWaresView() {
    const s = this.game.state;
    if (!s.oniStock.length) return `<div class="empty" style="color:#a88784;border-color:rgba(180,100,110,.3)"><span class="big" style="color:rgba(220,160,160,.3)">鬼</span>The stalls are empty tonight.</div>`;
    return `<div class="section-label">Tonight's wares</div>
      <div class="shop-grid">
        ${s.oniStock.map((item) => `<div class="shop-card ${item.sold ? 'dim' : ''}">
          <h4><span class="k" style="color:#d98a90">${item.kanji}</span>${esc(item.name)} <span class="tag">${item.kind}</span></h4>
          <p>${esc(item.desc)}</p>
          <div class="buy-row"><b style="color:#e0b07a">${money(item.price)}</b>${item.sold ? '<span class="tag" style="color:#a88784">TAKEN</span>' : `<button class="btn btn-sm" data-act="oni-buy" data-id="${item.id}" ${s.money < item.price ? 'disabled' : ''}>Buy</button>`}</div>
        </div>`).join('')}
      </div>
      <div class="rule"></div>
      <div class="tiny muted" style="color:#a88784">Enchanted metals, ancient seeds, forbidden blueprints and living trees from the far side of the mountain. This stock changes each night.</div>`;
  }

  oniLotView() {
    const s = this.game.state;
    const lot = s.oniLot;
    if (!lot) return `<div class="empty" style="color:#a88784;border-color:rgba(180,100,110,.3)"><span class="big" style="color:rgba(220,160,160,.3)">夜</span>The night auction has concluded. Return tomorrow night.</div>`;
    const item = lot.item;
    const inc = Math.max(300, Math.round(lot.currentBid * 0.08 / 50) * 50);
    const next = lot.currentBid + inc;
    const isTree = item.kind === 'tree';
    return `<div class="split-wide">
      <div>
        <div class="preview-wrap tall"><div data-preview style="position:absolute;inset:0"></div>
          <div class="preview-caption"><span class="jp" style="color:#e0b0a8">${isTree ? SPECIES[item.sp]?.jp : WEAPON_TYPES[item.type]?.jp}</span><span>${esc(item.name)}</span></div>
        </div>
        <div class="auction-stage mt10" style="background:linear-gradient(180deg,#241521,#120d11);border-color:rgba(180,100,110,.3)">
          <div class="row between"><span class="live" style="color:#d68a8a">NIGHT LOT</span><span class="tiny" style="color:#a88784">ROUND ${lot.round}</span></div>
          <div class="bid-amount" style="color:#f0d4c8"><span>${fmt(lot.currentBid)}</span><small>RYŌ</small></div>
          <div class="tiny" style="color:${lot.leader === 'you' ? '#e0a07f' : '#d8a0a0'};letter-spacing:.12em">${lot.leader === 'you' ? 'YOU HOLD THE BID' : esc(lot.leaderName).toUpperCase() + ' HOLDS THE BID'}</div>
          <div class="bid-log">${lot.log.slice(-7).map((l) => `<div class="bid-line ${l.who === 'you' ? 'you' : ''}"><b style="color:${l.who === 'you' ? '#e08a6e' : '#d8a0a0'}">${esc(l.who === 'you' ? 'You' : l.who)}</b><span>${esc(l.text)}</span></div>`).join('')}</div>
        </div>
      </div>
      <div>
        <div class="section-label">The lot</div>
        <div class="card" style="background:rgba(255,255,255,.04);border-color:rgba(180,100,110,.25);color:#e6d7c9">
          <h3 style="font-size:20px;margin:0">${esc(item.name)}</h3>
          <div class="tiny" style="color:#a88784;text-transform:uppercase;letter-spacing:.12em">${itemLabel(item)} · ${rarityTagFor(item)}</div>
          <p class="small" style="color:#b9a7a0;line-height:1.5;margin:9px 0">${isTree ? SPECIES[item.sp]?.desc : WEAPON_TYPES[item.type]?.desc}</p>
          <div class="kv" style="margin-top:6px">
            <dt style="color:#a88784">Quality</dt><dd>${itemQuality(item)} / 100</dd>
            <dt style="color:#a88784">Opening bid</dt><dd>${money(lot.startBid)}</dd>
            <dt style="color:#a88784">Final value</dt><dd style="color:#e0c08a">${money(isTree ? treeValue(item) : weaponValue(item, s.rep))}</dd>
          </div>
        </div>
        <div class="section-label mt16">Rival bidders</div>
        ${lot.rivals.map((r) => `<div class="buyer oni" style="margin-bottom:6px;background:rgba(255,255,255,.04);border-color:rgba(180,100,110,.22)">
          <div class="face">${r.kanji}</div><div class="grow"><b>${esc(r.name)}</b><small style="color:#a88784">Night bidder · limit hidden</small></div>
          <div class="budget"><small style="color:#a88784">${lot.leaderName === r.name ? 'LEADS' : ''}</small></div>
        </div>`).join('')}
        <div class="rule"></div>
        ${lot.status === 'open' ? `
          <div class="row between"><span class="small" style="color:#c8b3ab">Next bid</span><b class="gold">${money(next)}</b></div>
          <button class="btn btn-primary mt10" style="width:100%" data-act="oni-bid" ${s.money < next ? 'disabled' : ''}>Raise to ${money(next)}</button>
          <button class="btn btn-ghost mt6" style="width:100%;color:#d9b9b1;border-color:rgba(190,100,110,.3);background:transparent" data-act="oni-withdraw">Withdraw from the lot</button>
          <div class="tiny mt10" style="color:#a88784">If all rival bidders fall away, the lot is yours. The Oni do not permit haggling.</div>
        ` : lot.status === 'won' ? `
          <div class="tag gold" style="font-size:11px">CLAIMED</div>
          <p class="small" style="color:#c8b3ab;line-height:1.5">The lot has been carried to your estate. The night market remembers.</p>
          <button class="btn btn-ghost mt10" style="width:100%;color:#d9b9b1;border-color:rgba(190,100,110,.3)" data-act="close">Leave the night</button>
        ` : `
          <div class="tag" style="color:#a88784">PASSED</div>
          <p class="small" style="color:#c8b3ab">You stepped away. The lot belongs to the night.</p>
          <button class="btn btn-ghost mt10" style="width:100%;color:#d9b9b1;border-color:rgba(190,100,110,.3)" data-act="close">Leave the night</button>
        `}
      </div>
    </div>`;
  }

  // ————— TEMPLE —————
  panel_temple() {
    const s = this.game.state;
    const blessed = (s.flags.blessingUntil || 0) > s.day;
    const body = `
      <div class="split">
        <div class="card">
          <div class="row" style="gap:10px"><div class="kanji-badge">寺</div><div><h3 style="margin:0">Temple of the Quiet Bell</h3><div class="tiny muted">静鐘寺 · ABBOT HŌUN</div></div></div>
          <p class="small muted" style="line-height:1.55;margin-top:9px">“The mountain does not hurry, and yet everything is finished. Sit. Let your hands remember what your mind has forgotten.”</p>
          <div class="rule"></div>
          <div class="row between"><span class="small">Incense blessing</span><b class="gold">${money(250)}</b></div>
          <div class="tiny muted mt6">For two days, your trees grow 30% faster. One blessing per day.</div>
          <button class="btn ${blessed ? 'btn-ghost' : 'btn-primary'} mt10" data-act="bless" ${blessed ? 'disabled' : ''}>${blessed ? 'Blessing is active' : 'Make an offering'}</button>
          <div class="tiny muted mt6">${s.flags.blessingDay === s.day ? 'You have already visited the incense today.' : ''}</div>
        </div>
        <div class="card">
          <div class="kanji-badge" style="margin-bottom:8px">鐘</div>
          <h3 style="margin:0">The Quiet Bell</h3>
          <p class="small muted" style="line-height:1.5">Ring the bell and let three hours pass. Focus is fully restored. Sometimes a commission arrives while you sit.</p>
          <button class="btn btn-sm mt10" data-act="rest" data-hours="3" data-label="The bell's echo fades across the valley.">Ring & meditate · 3h</button>
          <div class="rule"></div>
          <h4 style="font-size:16px;margin:0 0 4px">Work for the temple</h4>
          <p class="small muted" style="line-height:1.5">The abbot keeps a ledger of patrons seeking fine bonsai and blades.</p>
          <button class="btn btn-sm btn-ghost mt6" data-act="goto" data-panel="auction" data-tab="commissions">View commissions</button>
          <div class="rule"></div>
          <div class="tiny muted">Current focus: ${Math.round(s.focus)} / ${s.maxFocus} · Reputation ${fmt(s.rep)}</div>
        </div>
      </div>
      <div class="rule"></div>
      <div class="section-label">Temple grounds</div>
      <div class="panel-grid grid-3">
        <div class="card center"><div class="tiny muted">THE PAGODA</div><div style="font-family:var(--jp);font-size:28px;color:var(--verm)">塔</div><div class="tiny muted">Five tiers, five vows</div></div>
        <div class="card center"><div class="tiny muted">THE INCENSE</div><div style="font-family:var(--jp);font-size:28px;color:var(--verm)">香</div><div class="tiny muted">${blessed ? 'The blessing lingers' : 'The brazier is cold'}</div></div>
        <div class="card center"><div class="tiny muted">THE JIZO</div><div style="font-family:var(--jp);font-size:28px;color:var(--verm)">地蔵</div><div class="tiny muted">Red caps for small travelers</div></div>
      </div>`;
    return this.sheet({
      title: 'A Quiet Place', sub: 'TEMPLE OF THE QUIET BELL · 寺', seal: '寺', body,
      footer: `<div class="tiny muted grow">The temple accepts no credit and asks no questions.</div>
        <button class="btn" data-act="close">Leave an offering of silence</button>`,
    });
  }

  // ————— MEDITATE —————
  panel_meditate() {
    const s = this.game.state;
    const cur = s.minutes / 60;
    const dawn = ((6 - cur + 24) % 24) || 24;
    const night = ((19 - cur + 24) % 24) || 24;
    const hh = String(Math.floor(cur)).padStart(2, '0');
    const body = `
      <div class="split">
        <div class="card center" style="display:flex;flex-direction:column;justify-content:center">
          <div class="enso2" style="width:90px;height:90px;border:1px solid rgba(80,60,35,.3);border-radius:50%;display:grid;place-items:center;font-family:var(--jp);font-size:34px;color:var(--verm);margin:0 auto 12px">禅</div>
          <h3 style="margin:0">Rest & Let Time Pass</h3>
          <p class="small muted" style="line-height:1.55">Time moves while you are still. Your focus returns. For longer rests, the household waters thirsty trees so they are not harmed.</p>
          <div class="tiny muted">Now: Day ${s.day} · ${hh}:${String(s.minutes % 60).padStart(2, '0')} · ${seasonOf(s.day).name}</div>
        </div>
        <div>
          <div class="section-label">Choose a stillness</div>
          <div class="actions" style="grid-template-columns:1fr">
            <button class="action-btn" data-act="rest" data-hours="1" data-label="One quiet hour."><b>Breathe · 1 hour</b><small>Restore focus. Let the light shift.</small></button>
            <button class="action-btn" data-act="rest-until" data-hour="6" data-label="You wake before dawn."><b>Sleep until dawn</b><small>${dawn.toFixed(1)} hours · wake at 06:00</small></button>
            <button class="action-btn" data-act="rest-until" data-hour="19" data-label="Lanterns are lit. The red gate opens."><b>Wait for nightfall</b><small>${night.toFixed(1)} hours · 19:00 · Oni gate opens</small></button>
            <button class="action-btn" data-act="rest" data-hours="24" data-label="A full day passes."><b>Rest a full day</b><small>24 hours · daily wages and visitors settle</small></button>
            <button class="action-btn" data-act="rest" data-hours="120" data-label="A season turns. Your trees grow."><b>Pass a season · 5 days</b><small>120 hours · trees age, garden transforms</small></button>
          </div>
          <div class="tiny muted mt10">Wages are paid at each dawn. Visitors arrive for beauty and reputation. ${s.hires.gardener ? 'Your gardener will water the garden.' : 'Hire a gardener to tend the trees in your absence.'}</div>
        </div>
      </div>`;
    return this.sheet({
      title: 'Stillness', sub: 'PASS TIME · RESTORE FOCUS', seal: '禅', body,
      footer: `<div class="tiny muted grow">You cannot hurry a tree, but you can sit beside it.</div><button class="btn" data-act="close">Return</button>`,
    });
  }

  doRest(hours, label) {
    const s = this.game.state;
    this.closePanel();
    const veil = document.createElement('div');
    veil.className = 'meditate-veil';
    veil.innerHTML = `<div><div class="enso2">禅</div><p>${esc(label || 'Time passes like water.')}</p><div class="tiny muted" style="margin-top:10px;color:#8d7f6a">${Math.round(hours)} game hours</div></div>`;
    document.body.appendChild(veil);
    this.audio.sfx('click');
    setTimeout(() => {
      this.game.advanceTime(hours, { save: true });
      veil.remove();
      this.showZone(this.world.currentZone ? LOCATIONS[this.world.currentZone] : LOCATIONS.estate);
      this.toast(label || 'Time passes. The mountain is a little older.', 'good');
      this.refreshHUD();
      if (isNight(s.hour)) this.toast('Night has fallen. The bamboo forest hides a red gate.', '');
    }, 1200);
  }

  // ————— CODEX —————
  panel_codex() {
    const tab = this.tabs.codex;
    return this.sheet({
      title: 'The Artisan\'s Codex', sub: 'GUIDE · RECIPES · PEOPLE · TRIALS', seal: '巻',
      body: this.tabsHTML('codex') + (tab === 'guide' ? this.codexGuide() : tab === 'recipes' ? this.codexRecipes() : tab === 'species' ? this.codexSpecies() : tab === 'patrons' ? this.codexPatrons() : tab === 'quests' ? this.codexQuests() : this.codexSettings()),
      footer: `<div class="tiny muted grow">“The way of the samurai is found in death. The way of the artisan is found in every dawn after.”</div>
        <button class="btn" data-act="close">Close the scroll</button>`,
    });
  }

  codexGuide() {
    return `<div class="codex-section">
      <h3>THE CORE LOOP</h3>
      <div class="panel-grid grid-3">
        <div class="codex-card"><b><span class="k">盆</span>Grow Bonsai</b><p>Water, prune, wire, fertilize and repot. Trees gain years through patient care and time. Style is capped by age, so let trees mature.</p></div>
        <div class="codex-card"><b><span class="k">鍛</span>Forge Weapons</b><p>Buy steel, choose a recipe and strike the six interactive stages. Timing + material quality + workshop level determine the blade.</p></div>
        <div class="codex-card"><b><span class="k">競</span>Sell at Auction</b><p>Choose an opening bid. Rival NPCs bid against each other. Hammer early for certainty, or wait for a bidding war.</p></div>
        <div class="codex-card"><b><span class="k">鬼</span>The Night Market</b><p>At night, a red gate opens in the bamboo forest. Ancient seeds, enchanted metal, blueprints and a night auction.</p></div>
        <div class="codex-card"><b><span class="k">宅</span>Build Your Estate</b><p>Expand the garden, upgrade the forge, buy decorations, hire a gardener and assistant. Beauty attracts daily visitors.</p></div>
        <div class="codex-card"><b><span class="k">誉</span>Grow Your Name</b><p>Sales, commissions and masterworks raise reputation. Higher ranks attract wealthier buyers and unlock rare commissions.</p></div>
      </div>
      <h3>CONTROLS</h3>
      <div class="panel-grid grid-2">
        <div class="codex-card"><b>Walk</b><p>WASD / arrow keys, or the on-screen joystick. Click the ground to walk there. Drag to orbit the camera, scroll to zoom.</p></div>
        <div class="codex-card"><b>Interact</b><p>Press E near a glowing marker, or tap the marker / USE button. Each location has tasks, merchants and gathering spots.</p></div>
        <div class="codex-card"><b>Focus</b><p>Most bonsai care costs focus. It regenerates slowly. Rest at the house, waterfall, cherry valley or temple bell to restore it.</p></div>
        <div class="codex-card"><b>Time & Seasons</b><p>A day lasts about 4.5 real minutes. Five days make a season. Trees grow faster in spring, slower in winter. Weapons sell best in winter; bonsai in spring and autumn.</p></div>
      </div>
      <h3>TIPS FROM THE MOUNTAIN</h3>
      <div class="codex-card"><p>• Sell a first blade or tree early to fund seeds and steel. • Water is the main cause of tree illness; watch the blue bar. • Repotting raises style cap and pot multiplier. • The Oni pay wildly for supernatural work. • Mark a favourite tree as an heirloom to boost estate beauty forever.</p></div>
    </div>`;
  }

  codexRecipes() {
    const s = this.game.state;
    return `<div class="codex-grid">
      ${Object.values(WEAPON_TYPES).sort((a, b) => a.tier - b.tier || a.base - b.base).map((w) => {
        const req = Math.max(0, w.tier - 1);
        const bp = w.blueprint ? s.blueprints.includes(w.blueprint) : true;
        return `<div class="codex-card">
          <b><span class="k">${w.kanji}</span>${w.name}</b>
          <p>${w.jp} · tier ${w.tier + 1} · base ${money(w.base)}</p>
          <p>Requires forge level ${req + 1}${w.blueprint ? ` · blueprint ${bp ? 'owned' : 'missing'}` : ''}</p>
          <p>${Object.entries(w.mats).map(([k, n]) => `${MATERIALS[k]?.name || k} ×${n}`).join(' · ')}</p>
          <div class="mt6">${s.workshopLevel >= req && bp ? '<span class="tag green">available</span>' : '<span class="tag red">locked</span>'}${w.supernatural ? ' <span class="tag purple">legendary</span>' : ''}</div>
        </div>`;
      }).join('')}
    </div>`;
  }

  codexSpecies() {
    const s = this.game.state;
    return `<div class="codex-grid">
      ${Object.values(SPECIES).map((sp) => `<div class="codex-card">
        <b><span class="k">${sp.kanji}</span>${sp.name}</b>
        <p>${sp.jp} · ${sp.rarity} · growth ×${sp.growth}</p>
        <p>${sp.desc}</p>
        <p>Seed ${sp.seedCost} ryō · base value ${money(sp.base)}${sp.repReq ? ` · needs ${sp.repReq} rep` : ''}${sp.supernatural ? ' · night market only' : ''}</p>
        <div class="tiny muted">Owned: ${s.seeds[sp.id] || 0} seed(s)</div>
      </div>`).join('')}
    </div>`;
  }

  codexPatrons() {
    return `<div class="codex-grid">
      ${Object.values(BUYER_TYPES).map((b) => `<div class="codex-card">
        <b><span class="k">${b.kanji}</span>${b.name}</b>
        <p>${b.jp} · prefers ${b.pref.join(', ')}</p>
        <p>${b.quotes.join(' / ')}</p>
        <div class="tiny muted">Budget class ×${b.budget.toFixed(2)}</div>
      </div>`).join('')}
    </div>
    <div class="rule"></div>
    <div class="codex-card"><b>SEASONAL DEMAND</b><p>Spring: bonsai rise. Summer: steady. Autumn: bonsai and lacquer peak. Winter: weapons peak. Night: supernatural work attracts the Oni, while ordinary goods sell a little softer.</p></div>`;
  }

  codexQuests() {
    const s = this.game.state;
    return `<div class="panel-grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">
      ${QUESTS.map((q) => {
        const done = s.questsDone.includes(q.id);
        return `<div class="commission ${done ? 'done' : ''}">
          <div class="c-head"><b>${esc(q.text)}</b><span class="tag ${done ? 'green' : ''}">${done ? 'complete' : 'open'}</span></div>
          <p>${esc(q.tip)}</p>
          <div class="c-foot"><span>Reward</span><b>${money(q.reward)}${q.rep ? ` · +${q.rep} rep` : ''}</b></div>
        </div>`;
      }).join('')}
    </div>
    <div class="rule"></div>
    <div class="tiny muted">Trials pay out automatically when their condition is met. They are a guide, not a cage.</div>`;
  }

  codexSettings() {
    const s = this.game.state;
    return `<div class="panel-grid grid-2">
      <div class="codex-card">
        <b>SOUND</b>
        <p>Procedural koto, wind, water and forge sounds — no external audio files.</p>
        <div class="row mt10"><button class="btn btn-sm" data-act="toggle-sound">${s.settings.sound ? 'Sound on' : 'Sound off'}</button><button class="btn btn-sm btn-ghost" data-act="toggle-music">${s.settings.music ? 'Music on' : 'Music off'}</button></div>
      </div>
      <div class="codex-card">
        <b>SAVE</b>
        <p>The estate autosaves every 45 seconds, each day, and after important actions.</p>
        <div class="row mt10"><button class="btn btn-sm" data-act="save-now">Save now</button><button class="btn btn-sm btn-ghost" data-act="reset-save">Begin again</button></div>
      </div>
      <div class="codex-card">
        <b>CREDITS</b>
        <p>Built with Three.js. All models, textures, UI and music generated procedurally in the browser. Inspired by Japanese garden, forge and mountain-market traditions.</p>
      </div>
      <div class="codex-card">
        <b>CHRONICLE</b>
        <p class="tiny">${(s.log || []).slice(0, 8).map((l) => esc(l)).join('<br>') || 'Your story has just begun.'}</p>
      </div>
    </div>`;
  }

  // ————— sound —————
  toggleSound() {
    const s = this.game.state;
    const on = !(s.settings.sound || s.settings.music);
    s.settings.sound = on;
    s.settings.music = on;
    if (this.audio.ctx) {
      this.audio.soundOn = on;
      this.audio.setMusic(on);
    }
    this.toast(on ? 'The mountain wakes its music.' : 'Silence. Only the wind remains.', on ? 'good' : '');
    this.refreshHUD();
    this.game.saveGame();
  }

  toggleMusic() {
    const s = this.game.state;
    s.settings.music = !s.settings.music;
    this.audio.setMusic(s.settings.music && s.settings.sound);
    this.toast(s.settings.music ? 'Koto music returns.' : 'Music hushed.', '');
    this.game.saveGame();
  }

  tick(dt) {
    this.preview.render(dt);
    if (this.forge.active && !this.forge.done && this.panel === 'forge' && this.forge.stage < FORGE_STAGES.length) {
      const f = this.forge;
      f.pos += f.dir * f.speed * dt;
      if (f.pos > 100) { f.pos = 100; f.dir = -1; }
      if (f.pos < 0) { f.pos = 0; f.dir = 1; }
      const needle = document.getElementById('forge-needle');
      if (needle) needle.style.left = f.pos + '%';
    }
  }
}

// demand helper used in patrons view
function require_demand(category, state) {
  const season = seasonOf(state.day);
  const base = { spring: { bonsai: 1.32, weapon: 0.96, ornament: 0.9, supernatural: 1.0 }, summer: { bonsai: 1.05, weapon: 1, ornament: 1, supernatural: 1 }, autumn: { bonsai: 1.48, weapon: 1.04, ornament: 1.08, supernatural: 1.05 }, winter: { bonsai: 0.86, weapon: 1.38, ornament: 1.2, supernatural: 1.15 } }[season.id];
  return base[category];
}
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function rarityTagFor(item) {
  if (item.kind === 'tree') return (SPECIES[item.sp]?.rarity || 'common').toUpperCase();
  return weaponRarity(item).toUpperCase();
}
