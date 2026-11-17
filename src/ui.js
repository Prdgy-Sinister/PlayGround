import {
  ACHIEVEMENTS, BROOMS, CAREER_CHAPTERS, CHAMPIONSHIP, DIFFICULTIES, HOUSES,
  LIVERIES, NATIONS, POSITIONS, RACE_MODES, SKILLS, TACTICS, TRACKS,
} from './data.js';
import {
  canClaimChapter, chapterProgress, currentFixture, formatClock, formatTime,
  getBroom, getBroomStats, rankName, upgradeCost, xpForNext,
} from './state.js';

/* ================================================================== */
/* Helpers                                                            */
/* ================================================================== */

export function escapeHtml(str = '') {
  return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>',
  broom: '<path d="M3 21c4-1 6-3 8-6"/><path d="M9 15l6-6 4-4"/><path d="M14 5l5 5"/><path d="M4 20l3-6 3 3-6 3z"/>',
  quaffle: '<circle cx="12" cy="12" r="8"/><path d="M6.5 7.5c3 2 8 2 11 0M6.5 16.5c3-2 8-2 11 0"/><path d="M12 4v16"/>',
  bludger: '<circle cx="12" cy="12" r="6"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  hoop: '<ellipse cx="12" cy="8" rx="6" ry="2.5"/><path d="M6 8v9c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V8"/><path d="M9 16l3-4 3 4"/>',
  snitch: '<circle cx="12" cy="12" r="3"/><path d="M9 10C6 7 3 7 2 9c3 1 5 2 7 3M15 10c3-3 6-3 7-1-3 1-5 2-7 3M9 14c-3 3-6 3-7 1 3-1 5-2 7-3M15 14c3 3 6 3 7 1-3-1-5-2-7-3"/>',
  trophy: '<path d="M8 4h8v4a4 4 0 0 1-8 0V4z"/><path d="M8 5H4v2a4 4 0 0 0 4 4M16 5h4v2a4 4 0 0 1-4 4"/><path d="M12 12v5M8 21h8M9 21c0-2 1-4 3-4s3 2 3 4"/>',
  cup: '<path d="M5 8h14v3a7 7 0 0 1-14 0V8z"/><path d="M9 11h6M12 18v3M8 21h8"/>',
  map: '<path d="M9 4 3 6v15l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v15M15 6v15"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  flag: '<path d="M5 21V4"/><path d="M5 4c4-2 7 2 11 0v8c-4 2-7-2-11 0z"/>',
  bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/><circle cx="12" cy="12" r="3"/>',
  wind: '<path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 12h15a3 3 0 1 1-3 3"/><path d="M3 16h7"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15 9-2 4-4 2 2-4 4-2z"/>',
  impact: '<path d="m13 2-8 11h5l-1 9 9-12h-6l1-8z"/>',
  eye: '<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/>',
  castle: '<path d="M4 21V8l3 1V4h3v4h4V4h3v5l3-1v13"/><path d="M9 21v-5h6v5M7 12h2M15 12h2"/>',
  quidditch: '<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/><path d="m7 7 2 2M15 15l2 2M17 7l-2 2M9 15l-2 2"/>',
  medal: '<circle cx="12" cy="14" r="5"/><path d="m8 3 3 6M16 3l-3 6M12 12l.8 1.6 1.8.3-1.3 1.2.3 1.8-1.6-.8-1.6.8.3-1.8-1.3-1.2 1.8-.3L12 12z"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21h-4v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3v-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.5V3h4v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  coin: '<circle cx="12" cy="12" r="8"/><path d="M12 7v10M15 9.5c0-1-1.3-1.8-3-1.8s-3 .8-3 1.8 1.3 1.7 3 2 3 1 3 2-1.3 1.8-3 1.8-3-.8-3-1.8"/>',
  chevron: '<path d="m9 6 6 6-6 6"/>',
  back: '<path d="m15 6-6 6 6 6"/>',
  play: '<path d="m9 5 10 7-10 7V5z"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  sound: '<path d="M4 9h4l5-4v14l-5-4H4V9z"/><path d="M16 8a5 5 0 0 1 0 8"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  restart: '<path d="M20 11a8 8 0 1 0-2.3 6.3"/><path d="M20 4v7h-7"/>',
  person: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 3 4 6 4 9s-1.5 6-4 9c-2.5-3-4-6-4-9s1.5-6 4-9z"/>',
  shield: '<path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3z"/><path d="m9 12 2 2 4-4"/>',
};

export function icon(name, cls = '') {
  return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.star}</svg>`;
}

function pips(n, max = 3) {
  let s = '';
  for (let i = 0; i < max; i++) s += `<i class="${i < n ? 'on' : ''}"></i>`;
  return `<span class="pips">${s}</span>`;
}

function statBar(label, value, extra = '') {
  return `<div class="stat-row"><span>${label}</span><div class="bar"><i style="width:${Math.round(value)}%"></i></div><b>${Math.round(value)}</b>${extra}</div>`;
}

function initials(name) {
  return escapeHtml((name || 'A').split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase());
}

function weatherLabel(w) {
  return { clear: 'Clear skies', rain: 'Rain', snow: 'Snow', storm: 'Storm' }[w] || w;
}

function weatherIcon(w) {
  return { clear: 'sun', rain: 'rain', snow: 'snow', storm: 'storm' }[w] || 'sun';
}

function crest(nation, size = '') {
  return `<span class="crest ${size}" style="--c1:${nation.colors[0]};--c2:${nation.colors[1]};--ca:${nation.accent}"><b>${nation.code}</b><i></i></span>`;
}

function broomArt(broom, livery = '#e8bd5b') {
  return `<div class="broom-art" style="--wood:${broom.colors[0]};--wood2:${broom.colors[1]};--livery:${livery}">
    <svg viewBox="0 0 300 120" aria-hidden="true">
      <defs><linearGradient id="bg-${broom.id}" x1="0" x2="1"><stop offset="0" stop-color="var(--wood2)"/><stop offset="1" stop-color="var(--wood)"/></linearGradient></defs>
      <path d="M36 88 Q120 44 250 60" stroke="url(#bg-${broom.id})" stroke-width="10" fill="none" stroke-linecap="round"/>
      <path d="M245 57 l28 -7 -24 20 -4 -13z" fill="var(--livery)"/>
      <path d="M40 86 C26 98 18 104 8 108 M46 88 C34 103 27 111 16 116 M52 88 C45 104 39 114 32 120 M59 88 C56 104 53 112 46 121" stroke="#b28f53" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="208" cy="57" r="4" fill="var(--livery)"/>
      <path d="M120 62 l10 3 M140 57 l10 3 M160 55 l10 3" stroke="var(--livery)" stroke-width="3"/>
    </svg>
  </div>`;
}

function landmarkSvg(theme) {
  if (theme === 'hogwarts' || theme === 'worldcup') {
    return `<svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMax slice">
      <path d="M110 150V80h14V52h14v28h10V66h18v84M198 150V62h12V38h16v24h12v88M280 150V88h12V60h16v28h10v62" fill="currentColor"/>
      <path d="M104 52l18-18 18 18M192 38l14-16 14 16M274 60l18-18 18 18" fill="currentColor"/>
      <circle cx="330" cy="42" r="18" fill="currentColor" opacity=".5"/>
      <path d="M0 150h400v10H0z" fill="currentColor"/>
    </svg>`;
  }
  if (theme === 'london') {
    return `<svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMax slice">
      <path d="M20 150V60h34v90M62 150V92h26v58M96 150V42h40v108M144 150V76h30v74M182 150V54h46v96M236 150V88h24v62M268 150V32h42v118M318 150V72h34v78M360 150V96h24v54" fill="currentColor"/>
      <path d="M30 54h14M104 36h20M192 48h26M278 26h22" stroke="currentColor" stroke-width="4"/>
    </svg>`;
  }
  if (theme === 'forest') {
    return `<svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMax slice">
      <path d="M60 150 90 40l30 110M120 150 155 55l34 95M210 150 245 25l35 125M280 150 308 62l28 88M325 150 355 45l30 105" fill="currentColor"/>
      <path d="M180 150c0-40 20-72 20-72s20 32 20 72" fill="currentColor" opacity=".8"/>
      <circle cx="115" cy="70" r="3" fill="#9effc8"/><circle cx="240" cy="48" r="3" fill="#9effc8"/><circle cx="320" cy="80" r="3" fill="#9effc8"/>
    </svg>`;
  }
  if (theme === 'alpine') {
    return `<svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMax slice">
      <path d="M0 150 80 30l55 70 30-40 60 90zM180 150 270 20l50 65 20-20 60 85z" fill="currentColor"/>
      <path d="M80 30l24 31 15-10-18-18zM270 20l22 29 21-6-24-22z" fill="#fff" opacity=".55"/>
    </svg>`;
  }
  if (theme === 'kyoto') {
    return `<svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMax slice">
      <path d="M130 150V90h140v60M150 90V78h100v12" fill="currentColor"/>
      <path d="M120 78h160l-20-16H140zM135 62h130l-18-14H153zM152 48h96l-16-12h-64z" fill="currentColor"/>
      <path d="M200 36V12M180 150v-35h40v35" stroke="currentColor" stroke-width="5"/>
      <path d="M40 120h80M64 120V92M96 120V92M33 92h94" stroke="currentColor" stroke-width="7" opacity=".7"/>
    </svg>`;
  }
  if (theme === 'cairo') {
    return `<svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMax slice">
      <path d="M80 150 190 55l110 95zM220 150 300 88l80 62z" fill="currentColor"/>
      <path d="M32 150V80h10v70M300 150V70h10v80M348 150V92h8v58" fill="currentColor"/>
      <circle cx="330" cy="38" r="22" fill="currentColor" opacity=".6"/>
    </svg>`;
  }
  return `<svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMax slice"><path d="M0 150 90 45l70 105M150 150 240 25l90 125M310 150l30-60 60 60" fill="currentColor"/></svg>`;
}

function trackCard(track, selected, state) {
  const res = state.stats.trackResults?.[track.id];
  const best = res?.bestLap ? formatTime(res.bestLap) : 'No time';
  return `<button class="track-card ${selected ? 'selected' : ''}" data-action="select-track" data-value="${track.id}">
    <div class="track-art theme-${track.theme}">
      <div class="art-orb"></div>
      <div class="art-landmark">${landmarkSvg(track.theme)}</div>
      <div class="art-shade"></div>
      <div class="art-top"><span class="weather-chip">${weatherLabel(track.weather)}</span><span>${track.laps} laps</span></div>
      <div class="art-bottom"><span class="track-region">${track.region}</span><strong>${track.name}</strong></div>
      ${selected ? '<i class="track-check">✓</i>' : ''}
    </div>
    <div class="track-mini"><span>Best lap <b>${best}</b></span>${pips(track.difficulty)}</div>
  </button>`;
}

/* ================================================================== */
/* UI                                                                 */
/* ================================================================== */

export class UI {
  constructor(game) {
    this.game = game;
    this.state = game.state;
    this.current = 'home';
    this.modal = null;
    this.hudEls = {};
    this.lastComment = '';
    this.els = {
      topbar: document.getElementById('topbar'),
      screen: document.getElementById('screen'),
      nav: document.getElementById('nav'),
      hud: document.getElementById('hud'),
      modal: document.getElementById('modal-root'),
      toast: document.getElementById('toast-root'),
      fade: document.getElementById('fade'),
      loading: document.getElementById('loading'),
    };
    this.els.screen.addEventListener('click', e => this.handleClick(e));
    this.els.screen.addEventListener('change', e => this.handleChange(e));
    this.els.screen.addEventListener('input', e => this.handleInput(e));
    this.els.topbar.addEventListener('click', e => this.handleClick(e));
    this.els.nav.addEventListener('click', e => this.handleClick(e));
    this.els.modal.addEventListener('click', e => {
      const bd = e.target.closest('.modal-backdrop');
      if (bd && !bd.dataset.sticky) this.closeModal();
      const el = e.target.closest('[data-action]');
      if (el) {
        e.preventDefault();
        this.game.audio.sfx('click');
        if (el.dataset.action.startsWith('onboard-')) { this.handleOnboard(el); return; }
        this.game.handleUI(el.dataset.action, el.dataset.value, el.dataset);
      }
    });
    this.els.hud.addEventListener('click', e => {
      const el = e.target.closest('[data-action]');
      if (el) {
        e.preventDefault();
        this.game.audio.sfx('click');
        this.game.handleUI(el.dataset.action, el.dataset.value, el.dataset);
      }
    });
    this.renderChrome();
  }

  hideLoading() {
    this.els.loading?.classList.add('gone');
    setTimeout(() => this.els.loading?.remove(), 900);
  }

  renderChrome() {
    const s = this.state;
    const inGame = !!this.game.active || this.game.mode === 'preview';
    this.els.topbar.classList.toggle('hidden', inGame);
    this.els.nav.classList.toggle('hidden', inGame);
    document.body.classList.toggle('in-game', inGame);
    document.body.classList.toggle('in-menu', !inGame);
    const level = s.profile.level;
    const rank = rankName(s.profile.ranking);
    this.els.topbar.innerHTML = `
      <button class="profile-chip" data-action="go" data-value="career">
        <span class="avatar" style="background:linear-gradient(145deg,${s.profile.robe},#141b2d)"><i>${initials(s.profile.name)}</i></span>
        <span class="profile-meta"><small>LEVEL ${level} · ${rank}</small><b>${escapeHtml(s.profile.name)}</b></span>
      </button>
      <div class="top-right">
        <span class="currency">${icon('coin')} <b>${s.profile.galleons.toLocaleString()}</b></span>
        <button class="icon-btn" data-action="settings" aria-label="Settings">${icon('settings')}</button>
      </div>`;
    const nav = [
      ['home', 'home', 'Home'], ['race', 'broom', 'Racing'], ['quid', 'quaffle', 'Quidditch'],
      ['career', 'trophy', 'Career'], ['locker', 'star', 'Locker'],
    ];
    this.els.nav.innerHTML = nav.map(([id, ic, label]) => `
      <button class="nav-btn ${this.current === id ? 'active' : ''}" data-action="go" data-value="${id}">
        ${icon(ic)}<span>${label}</span>
      </button>`).join('');
  }

  go(name, opts = {}) {
    const prevScroll = opts.preserve ? this.els.screen.scrollTop : 0;
    this.current = name;
    this.render();
    this.renderChrome();
    if (opts.preserve) requestAnimationFrame(() => { this.els.screen.scrollTop = prevScroll; });
    else this.els.screen.scrollTop = 0;
  }

  render() {
    const game = this.game;
    const s = this.state;
    switch (this.current) {
      case 'home': this.els.screen.innerHTML = this.homeScreen(); break;
      case 'race': this.els.screen.innerHTML = this.raceScreen(); break;
      case 'quid': this.els.screen.innerHTML = this.quidScreen(); break;
      case 'career': this.els.screen.innerHTML = this.careerScreen(); break;
      case 'locker': this.els.screen.innerHTML = this.lockerScreen(); break;
      default: this.els.screen.innerHTML = this.homeScreen();
    }
  }

  rerender() {
    const scroll = this.els.screen.scrollTop;
    this.renderChrome();
    this.render();
    requestAnimationFrame(() => { this.els.screen.scrollTop = scroll; });
  }

  handleClick(e) {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    e.preventDefault();
    this.game.audio.init();
    this.game.audio.sfx('click');
    if (el.dataset.action.startsWith('onboard-')) { this.handleOnboard(el); return; }
    this.game.handleUI(el.dataset.action, el.dataset.value, el.dataset);
  }

  handleOnboard(el) {
    const field = el.dataset.action.replace('onboard-', '');
    if (field === 'house' || field === 'skin' || field === 'robe') {
      this.onboardDraft[field] = el.dataset.value;
      const cls = `.${field === 'house' ? 'house-option' : field === 'skin' ? 'onboard-skin' : 'onboard-robe'}`;
      this.els.modal.querySelectorAll(cls).forEach(n => n.classList.remove('active'));
      el.classList.add('active');
    }
  }

  getOnboarding() {
    return {
      name: (document.getElementById('onboard-name')?.value || 'Aria Blackwood').trim().slice(0, 24),
      nation: document.getElementById('onboard-nation')?.value || 'england',
      ...this.onboardDraft,
    };
  }

  handleChange(e) {
    const el = e.target;
    if (!el.dataset.field) return;
    this.game.handleUIField(el.dataset.field, el.value);
  }

  handleInput(e) {
    const el = e.target;
    if (el.dataset.field === 'name') this.game.state.profile.name = el.value.slice(0, 24);
  }

  toast(text, sub = '', iconName = 'spark') {
    const node = document.createElement('div');
    node.className = 'toast';
    node.innerHTML = `<span class="toast-icon">${icon(iconName)}</span><div><b>${escapeHtml(text)}</b>${sub ? `<small>${escapeHtml(sub)}</small>` : ''}</div>`;
    this.els.toast.appendChild(node);
    requestAnimationFrame(() => node.classList.add('in'));
    setTimeout(() => {
      node.classList.remove('in');
      setTimeout(() => node.remove(), 400);
    }, 3000);
  }

  showModal(html, opts = {}) {
    clearTimeout(this._modalCloseTimer);
    this.els.modal.innerHTML = `<div class="modal-backdrop ${opts.cls || ''}" ${opts.sticky ? 'data-sticky="1"' : ''}><div class="modal-card ${opts.card || ''}" role="dialog">${html}</div></div>`;
    requestAnimationFrame(() => this.els.modal.querySelector('.modal-backdrop')?.classList.add('in'));
    this.modal = opts;
    if (opts.onOpen) opts.onOpen();
  }

  closeModal() {
    const bd = this.els.modal.querySelector('.modal-backdrop');
    if (bd) {
      bd.classList.remove('in');
      clearTimeout(this._modalCloseTimer);
      this._modalCloseTimer = setTimeout(() => { this.els.modal.innerHTML = ''; }, 220);
    } else {
      this.els.modal.innerHTML = '';
    }
    this.modal = null;
  }

  /* ================================================================ */
  /* Home                                                             */
  /* ================================================================ */

  homeScreen() {
    const s = this.state;
    const activeChapter = CAREER_CHAPTERS[Math.min(s.career.chapter, CAREER_CHAPTERS.length - 1)];
    const prog = activeChapter ? chapterProgress(s, activeChapter) : 1;
    const nextRace = s.stats.trackResults?.[this.game.sel.trackId]?.bestLap;
    const qWins = s.quidditch.wins;
    const rank = s.profile.ranking;
    return `<div class="screen home-screen">
      <section class="home-hero">
        <div class="eyebrow"><span>✦</span> THE INTERNATIONAL <span>✦</span></div>
        <h1>Wizarding<br><em>World Cup</em></h1>
        <p class="hero-tag">Broom racing. Quidditch. One legend.</p>
        <div class="hero-actions">
          <button class="btn gold" data-action="go" data-value="race">${icon('broom')} Enter the Circuit</button>
          <button class="btn ghost" data-action="go" data-value="quid">${icon('quaffle')} World Cup</button>
        </div>
        <div class="hero-rank"><span>${icon('globe')} World Ranking</span><b>${rank.toLocaleString()}</b><small>${rankName(rank)}</small></div>
      </section>

      <section class="home-sheet">
        <div class="sheet-grip"></div>
        <div class="continue-card" data-action="go" data-value="career">
          <div class="continue-icon">${icon(activeChapter?.icon || 'trophy')}</div>
          <div class="continue-body">
            <small>CAREER CHAPTER ${activeChapter?.roman || 'VI'} · ${Math.round(prog * 100)}%</small>
            <b>${escapeHtml(activeChapter?.title || 'World Champion')}</b>
            <div class="progress"><i style="width:${prog * 100}%"></i></div>
            <span>${escapeHtml(activeChapter?.hint || 'You have conquered the world.')}</span>
          </div>
          ${icon('chevron', 'continue-arrow')}
        </div>

        <div class="mode-grid">
          <button class="mode-card race" data-action="go" data-value="race">
            <div class="mode-glow"></div>
            <span class="mode-icon">${icon('broom')}</span>
            <small>HIGH-SPEED CIRCUITS</small>
            <b>Broom Racing</b>
            <span class="mode-meta">${s.stats.races} races · ${s.stats.wins} wins</span>
            <span class="mode-cta">Fly now ${icon('chevron')}</span>
          </button>
          <button class="mode-card quid" data-action="go" data-value="quid">
            <div class="mode-glow"></div>
            <span class="mode-icon">${icon('quaffle')}</span>
            <small>NATIONS · 7 A SIDE</small>
            <b>Quidditch</b>
            <span class="mode-meta">${qWins} victories · ${s.quidditch.snitch} snitches</span>
            <span class="mode-cta">Take the pitch ${icon('chevron')}</span>
          </button>
        </div>

        <div class="home-grid">
          <div class="mini-panel">
            <div class="mini-head"><span>${icon('clock')} Best lap</span><b>${nextRace ? formatTime(nextRace) : '—'}</b></div>
            <div class="mini-sub">${TRACKS.find(t => t.id === this.game.sel.trackId)?.name || 'Hogwarts'}</div>
          </div>
          <div class="mini-panel">
            <div class="mini-head"><span>${icon('star')} Skill points</span><b>${s.profile.skillPoints}</b></div>
            <div class="mini-sub">Spend in the Locker</div>
          </div>
        </div>

        <div class="news-ticker">
          <span class="ticker-live"><i></i> WORLD CUP</span>
          <div class="ticker-track">
            <span>${this.tickerText()}</span>
          </div>
        </div>

        <div class="home-footer">${icon('spark')} Choose a mode, chase the glory. Progress saves automatically.</div>
      </section>
    </div>`;
  }

  tickerText() {
    const s = this.state;
    const q = s.quidditch;
    const t = s.quidditch.tournament;
    if (t?.champion) return `${NATIONS.find(n => n.id === t.nation)?.name || 'Your nation'} are World Champions! A new tournament awaits.`;
    if (t && !t.eliminated) return `${NATIONS.find(n => n.id === t.nation)?.name || 'Your nation'} are through to the ${t.rounds[t.round]?.name || 'quarter-final'}. The world is watching.`;
    return `World Cup qualifying is live · ${q.wins} wins this season · Ranking ${s.profile.ranking} · ${q.snitch} Snitch catches · The next legend could be you.`;
  }

  /* ================================================================ */
  /* Race hub                                                         */
  /* ================================================================ */

  raceScreen() {
    const s = this.state;
    const sel = this.game.sel;
    const track = TRACKS.find(t => t.id === sel.trackId) || TRACKS[0];
    const res = s.stats.trackResults?.[track.id];
    const best = res?.bestLap ? formatTime(res.bestLap) : 'No best lap yet';
    const mode = RACE_MODES.find(m => m.id === sel.mode) || RACE_MODES[0];
    const broom = getBroom(s.brooms.selected);
    const champ = this.game.championship;
    return `<div class="screen race-screen">
      <header class="screen-head">
        <div><span class="eyebrow-small">INTERNATIONAL CIRCUIT</span><h2>Broom Racing</h2><p>Seven circuits. One crown.</p></div>
        <div class="head-badge">${icon('broom')}<b>${s.stats.wins}</b><small>wins</small></div>
      </header>

      <div class="seg-chips scroll-x">
        ${RACE_MODES.map(m => `<button class="chip ${sel.mode === m.id ? 'active' : ''}" data-action="select-mode" data-value="${m.id}">${icon(m.icon)}${m.name}</button>`).join('')}
      </div>
      <p class="mode-desc">${mode.desc}</p>

      ${sel.mode === 'championship' ? `<div class="champ-banner">
        <div><small>${CHAMPIONSHIP.name}</small><b>${champ ? `Round ${Math.min(3, champ.round + 1)} of 3` : 'Three circuits · points decide everything'}</b></div>
        <div class="champ-tracks">${CHAMPIONSHIP.tracks.map((id, i) => `<span class="${champ && champ.round > i ? 'done' : ''}">${i + 1}</span>`).join('')}</div>
      </div>` : ''}

      <div class="section-title"><span>Select circuit</span><small>Tap a circuit to inspect</small></div>
      <div class="track-scroller scroll-x" id="track-scroller">
        ${TRACKS.map(t => trackCard(t, t.id === sel.trackId, s)).join('')}
      </div>

      <div class="track-detail">
        <div class="detail-head">
          <div><small>${track.region}</small><h3>${track.name}</h3></div>
          <span class="difficulty">${pips(track.difficulty)} <small>${['', 'Academy', 'Professional', 'World Class'][track.difficulty]}</small></span>
        </div>
        <p>${track.desc}</p>
        <div class="detail-grid">
          <div>${icon('flag')}<span>Weather</span><b>${weatherLabel(track.weather)}</b></div>
          <div>${icon('compass')}<span>Laps</span><b>${sel.mode === 'trial' || sel.mode === 'qualify' ? 1 : track.laps}</b></div>
          <div>${icon('clock')}<span>Best lap</span><b>${best}</b></div>
          <div>${icon('wind')}<span>Wind</span><b>${Math.round(track.wind * 100)}%</b></div>
        </div>
      </div>

      <div class="section-title"><span>Opponents</span><small>${sel.mode === 'trial' ? 'The clock is your only rival' : 'Five rival flyers'}</small></div>
      <div class="seg-chips">
        ${DIFFICULTIES.map(d => `<button class="chip ${sel.difficulty === d.id ? 'active' : ''}" data-action="select-difficulty" data-value="${d.id}">${d.name}</button>`).join('')}
      </div>
      <p class="mode-desc">${DIFFICULTIES.find(d => d.id === sel.difficulty)?.desc || ''}</p>

      <div class="broom-select" data-action="go" data-value="locker">
        <div class="broom-thumb">${broomArt(broom, LIVERIES.find(l => l.id === s.brooms.livery)?.color)}</div>
        <div class="broom-select-body">
          <small>YOUR BROOM · TIER ${broom.tier}</small>
          <b>${broom.name}</b>
          <div class="micro-stats">
            <span>SPD ${Math.round(getBroomStats(s, broom.id).speed)}</span>
            <span>HND ${Math.round(getBroomStats(s, broom.id).handling)}</span>
            <span>BST ${Math.round(getBroomStats(s, broom.id).boost)}</span>
          </div>
        </div>
        ${icon('chevron')}
      </div>

      <div class="launch-bar">
        <div><small>${mode.name} · ${track.name}</small><b>${sel.mode === 'championship' ? 'Grand Prix' : track.region}</b></div>
        <button class="btn gold" data-action="open-briefing">${icon('play')} ${sel.mode === 'championship' ? 'Enter Grand Prix' : 'Race'}</button>
      </div>
      <div class="screen-pad"></div>
    </div>`;
  }

  /* ================================================================ */
  /* Quidditch hub                                                    */
  /* ================================================================ */

  quidScreen() {
    const s = this.state;
    const sel = this.game.sel;
    const t = s.quidditch.tournament;
    const nation = NATIONS.find(n => n.id === (t?.nation || s.profile.nation)) || NATIONS[0];
    const fixture = currentFixture(s);
    const opp = fixture ? NATIONS.find(n => n.id === fixture.opponentId) : null;
    const role = POSITIONS.find(p => p.id === sel.role) || POSITIONS[0];
    return `<div class="screen quid-screen">
      <header class="screen-head">
        <div><span class="eyebrow-small">XIV WORLD CUP</span><h2>Quidditch</h2><p>Represent your nation. Raise the cup.</p></div>
        <div class="head-badge quid-badge">${icon('quaffle')}<b>${s.quidditch.wins}</b><small>wins</small></div>
      </header>

      ${t ? this.tournamentPanel(t, fixture) : `<div class="campaign-hero">
        <div class="campaign-crest">${crest(nation, 'large')}</div>
        <div><small>REPRESENTING</small><b>${nation.name}</b><span>${nation.stadium} · ${nation.city}</span></div>
        <button class="btn small ghost" data-action="go" data-value="career">${icon('globe')} Ranking</button>
      </div>`}

      ${!t || t.champion || t.eliminated ? `
      <div class="section-title"><span>Choose your nation</span><small>${t ? 'Start a new campaign' : 'Eight nations. One cup.'}</small></div>
      <div class="nation-grid">
        ${NATIONS.map(n => `<button class="nation-card ${((t ? t.nation : s.profile.nation) === n.id) ? 'selected' : ''}" data-action="select-nation" data-value="${n.id}" style="--c1:${n.colors[0]};--c2:${n.colors[1]};--ca:${n.accent}">
          ${crest(n)}
          <b>${n.name}</b><small>${n.city}</small>
        </button>`).join('')}
      </div>
      <div class="nation-strip">
        <div>${icon('castle')}<span><small>Home stadium</small><b>${nation.stadium}</b></span></div>
        <div>${icon('shield')}<span><small>National symbol</small><b>${nation.beast}</b></span></div>
      </div>` : ''}

      <div class="section-title"><span>Your position</span><small>Switch roles at any substitution</small></div>
      <div class="role-grid">
        ${POSITIONS.map(p => `<button class="role-card ${sel.role === p.id ? 'active' : ''}" data-action="select-role" data-value="${p.id}" style="--role:${p.color}">
          <span class="role-icon">${icon(p.icon)}</span><b>${p.name}</b><small>${p.desc}</small>
        </button>`).join('')}
      </div>

      <div class="section-title"><span>Tactics</span><small>How will your team play?</small></div>
      <div class="seg-chips">
        ${TACTICS.map(x => `<button class="chip ${sel.tactics === x.id ? 'active' : ''}" data-action="select-tactics" data-value="${x.id}">${x.name}</button>`).join('')}
      </div>
      <p class="mode-desc">${TACTICS.find(x => x.id === sel.tactics)?.desc || ''}</p>
      <div class="seg-chips">
        ${DIFFICULTIES.map(d => `<button class="chip ${sel.qDifficulty === d.id ? 'active' : ''}" data-action="select-qdifficulty" data-value="${d.id}">${d.name}</button>`).join('')}
      </div>

      <div class="launch-bar">
        <div><small>${t && !t.champion && !t.eliminated ? (fixture?.roundName || 'World Cup') : 'Quidditch World Cup'}</small><b>${opp ? `vs ${opp.name}` : `${nation.name} · ${role.name}`}</b></div>
        ${t && !t.champion && !t.eliminated
          ? `<button class="btn gold" data-action="start-match">${icon('play')} Play Match</button>`
          : `<button class="btn gold" data-action="start-campaign">${icon('trophy')} ${t?.champion ? 'New Campaign' : 'Enter World Cup'}</button>`}
      </div>
      <div class="screen-pad"></div>
    </div>`;
  }

  tournamentPanel(t, fixture) {
    const rounds = t.rounds;
    const nationOf = id => NATIONS.find(n => n.id === id) || NATIONS[0];
    return `<div class="bracket-card">
      <div class="bracket-head">
        <div><small>KNOCKOUT STAGE</small><b>${nationOf(t.nation).name} · ${DIFFICULTIES.find(d => d.id === t.difficulty)?.name || 'Professional'}</b></div>
        <span class="bracket-status ${t.champion ? 'champion' : t.eliminated ? 'out' : ''}">${t.champion ? 'CHAMPIONS' : t.eliminated ? 'ELIMINATED' : (fixture?.roundName || '')}</span>
      </div>
      <div class="bracket">
        ${rounds.map((r, ri) => `<div class="bracket-round ${ri === t.round && !t.champion ? 'current' : ''}">
          <h5>${r.name}</h5>
          ${r.matches.map(m => {
            const a = nationOf(m.a), b = nationOf(m.b);
            const involved = m.a === t.nation || m.b === t.nation;
            const played = m.played;
            const scoreA = played && m.sa !== undefined ? m.sa : '—';
            const scoreB = played && m.sb !== undefined ? m.sb : '—';
            return `<div class="bracket-match ${involved ? 'involved' : ''}">
              <span class="${m.winner === m.a ? 'winner' : ''}">${crest(a)}<b>${a.code}</b><i>${scoreA}</i></span>
              <span class="${m.winner === m.b ? 'winner' : ''}">${crest(b)}<b>${b.code}</b><i>${scoreB}</i></span>
            </div>`;
          }).join('')}
        </div>`).join('')}
      </div>
      ${fixture ? `<div class="next-fixture"><span>NEXT FIXTURE</span><b>${nationOf(t.nation).name} vs ${nationOf(fixture.opponentId).name}</b><small>${fixture.roundName} · ${nationOf(fixture.opponentId).stadium}</small></div>` : ''}
      ${t.champion ? `<div class="champion-banner">${icon('cup')} WORLD CHAMPIONS</div>` : ''}
    </div>`;
  }

  /* ================================================================ */
  /* Career                                                           */
  /* ================================================================ */

  careerScreen() {
    const s = this.state;
    const tab = this.game.sel.careerTab;
    const tabs = [['overview', 'Overview', 'trophy'], ['rankings', 'Rankings', 'globe'], ['history', 'History', 'clock'], ['awards', 'Awards', 'star']];
    return `<div class="screen career-screen">
      <header class="screen-head">
        <div><span class="eyebrow-small">THE PATH TO GLORY</span><h2>Career</h2><p>Every flight writes your legend.</p></div>
      </header>
      <div class="profile-card">
        <div class="profile-avatar" style="background:linear-gradient(145deg,${s.profile.robe},#101728)"><span>${initials(s.profile.name)}</span><i>${HOUSES.find(h => h.id === s.profile.house)?.name || ''}</i></div>
        <div class="profile-main">
          <small>${HOUSES.find(h => h.id === s.profile.house)?.name} · Level ${s.profile.level}</small>
          <h3>${escapeHtml(s.profile.name)}</h3>
          <div class="xp-line"><div class="progress"><i style="width:${(s.profile.xp / xpForNext(s.profile.level)) * 100}%"></i></div><span>${s.profile.xp}/${xpForNext(s.profile.level)} XP</span></div>
        </div>
        <div class="profile-rank"><b>${s.profile.ranking}</b><small>${rankName(s.profile.ranking)}</small></div>
      </div>
      <div class="tabs">
        ${tabs.map(([id, label, ic]) => `<button class="tab ${tab === id ? 'active' : ''}" data-action="career-tab" data-value="${id}">${icon(ic)}${label}</button>`).join('')}
      </div>
      ${tab === 'overview' ? this.careerOverview() : tab === 'rankings' ? this.rankingsTab() : tab === 'history' ? this.historyTab() : this.awardsTab()}
      <div class="screen-pad"></div>
    </div>`;
  }

  careerOverview() {
    const s = this.state;
    const st = s.stats;
    return `<div class="stat-grid">
      <div><b>${st.races}</b><span>Races</span></div>
      <div><b>${st.wins}</b><span>Wins</span></div>
      <div><b>${st.podiums}</b><span>Podiums</span></div>
      <div><b>${s.quidditch.goals}</b><span>Quaffle goals</span></div>
      <div><b>${s.quidditch.saves}</b><span>Saves</span></div>
      <div><b>${s.quidditch.snitch}</b><span>Snitches</span></div>
    </div>
    <div class="section-title"><span>Chapters</span><small>${s.career.claimed.length}/${CAREER_CHAPTERS.length} claimed</small></div>
    <div class="chapter-list">
      ${CAREER_CHAPTERS.map((c, i) => {
        const prog = chapterProgress(s, c);
        const claim = canClaimChapter(s, c);
        const claimed = s.career.claimed.includes(c.id);
        return `<div class="chapter ${claimed ? 'claimed' : prog >= 1 ? 'complete' : ''} ${i === s.career.chapter ? 'current' : ''}">
          <div class="chapter-roman">${c.roman}</div>
          <div class="chapter-icon">${icon(c.icon)}</div>
          <div class="chapter-body">
            <div><b>${c.title}</b>${claimed ? `<span class="claimed-tag">${icon('shield')} Claimed</span>` : ''}</div>
            <p>${c.desc}</p>
            <div class="progress"><i style="width:${prog * 100}%"></i></div>
            <small>${Math.round(prog * 100)}% · +${c.reward.galleons} G · +${c.reward.xp} XP</small>
          </div>
          ${claim ? `<button class="btn tiny gold" data-action="claim-chapter" data-value="${c.id}">Claim</button>` : claimed ? `<span class="checkmark">${icon('shield')}</span>` : ''}
        </div>`;
      }).join('')}
    </div>
    <div class="section-title"><span>Season records</span><small>All-time</small></div>
    <div class="record-list">
      <div><span>${icon('trophy')} Grand Prix titles</span><b>${s.career.championships}</b></div>
      <div><span>${icon('cup')} World Cups</span><b>${s.career.cups}</b></div>
      <div><span>${icon('bolt')} Boost time</span><b>${Math.round(s.stats.boostTime)}s</b></div>
      <div><span>${icon('medal')} Best match goals</span><b>${s.stats.bestMatchGoals || 0}</b></div>
    </div>`;
  }

  rankingsTab() {
    const s = this.state;
    const names = ['V. Krum', 'C. Delacour', 'H. Sato', 'A. Peverell', 'M. Thorne', 'R. Costa', 'F. Lund', 'I. Hassan', 'L. Hunter', 'D. Boone'];
    const rows = [];
    const base = Math.max(900, s.profile.ranking - 420);
    names.forEach((n, i) => rows.push({ name: n, pts: base + (10 - i) * 47 + Math.round(Math.sin(i * 2.3) * 30), me: false }));
    rows.push({ name: s.profile.name, pts: s.profile.ranking, me: true });
    rows.sort((a, b) => b.pts - a.pts);
    return `<div class="ranking-card">
      <div class="ranking-head"><span>#</span><span>Flyer</span><span>Points</span></div>
      ${rows.slice(0, 12).map((r, i) => `<div class="ranking-row ${r.me ? 'me' : ''}"><b>${i + 1}</b><span>${escapeHtml(r.name)}</span><i>${r.pts}</i></div>`).join('')}
    </div>
    <p class="mode-desc">Ranking points are earned in races and World Cup matches. Reach 2,100 to become a World Legend.</p>`;
  }

  historyTab() {
    const s = this.state;
    if (!s.history.length) return `<div class="empty-state">${icon('clock')}<b>No flights yet</b><p>Your race and match history will appear here.</p><button class="btn gold" data-action="go" data-value="race">Start racing</button></div>`;
    return `<div class="history-list">${s.history.map(h => `<div class="history-row">
      <span class="history-icon ${h.type}">${icon(h.type === 'race' ? 'broom' : 'quaffle')}</span>
      <div><b>${escapeHtml(h.name)}</b><small>${h.type === 'race' ? (h.mode === 'championship' ? 'Championship race' : 'Broom race') : (h.round || 'Quidditch')} · ${new Date(h.at).toLocaleDateString()}</small></div>
      <span class="history-result ${h.won === false || (h.pos && h.pos > 3) ? 'bad' : 'good'}">${h.type === 'race' ? (h.pos ? `P${h.pos}` : '—') : `${h.score}${h.won ? ' W' : ''}`}</span>
    </div>`).join('')}</div>`;
  }

  awardsTab() {
    const s = this.state;
    return `<div class="section-title"><span>Achievements</span><small>${Object.keys(s.achievements).length}/${ACHIEVEMENTS.length}</small></div>
    <div class="award-grid">${ACHIEVEMENTS.map(a => {
      const got = !!s.achievements[a.id];
      const value = Math.min(Number(a.goal(s) || 0), a.count);
      return `<div class="award ${got ? 'got' : ''}">
        <span class="award-icon">${icon(a.icon)}</span>
        <b>${a.name}</b><small>${a.desc}</small>
        <div class="progress"><i style="width:${(value / a.count) * 100}%"></i></div>
        <span class="award-meta">${got ? 'Unlocked' : `${value}/${a.count}`} · +${a.reward} G</span>
      </div>`;
    }).join('')}</div>`;
  }

  /* ================================================================ */
  /* Locker                                                           */
  /* ================================================================ */

  lockerScreen() {
    const s = this.state;
    const tab = this.game.sel.lockerTab || 'brooms';
    return `<div class="screen locker-screen">
      <header class="screen-head">
        <div><span class="eyebrow-small">EQUIPMENT & IDENTITY</span><h2>Locker Room</h2><p>Your broom. Your colours. Your legend.</p></div>
        <div class="head-badge">${icon('coin')}<b>${s.profile.galleons.toLocaleString()}</b><small>galleons</small></div>
      </header>
      <div class="tabs">
        <button class="tab ${tab === 'brooms' ? 'active' : ''}" data-action="locker-tab" data-value="brooms">${icon('broom')}Brooms</button>
        <button class="tab ${tab === 'look' ? 'active' : ''}" data-action="locker-tab" data-value="look">${icon('person')}Appearance</button>
        <button class="tab ${tab === 'skills' ? 'active' : ''}" data-action="locker-tab" data-value="skills">${icon('spark')}Skills${s.profile.skillPoints ? ` <i class="dot">${s.profile.skillPoints}</i>` : ''}</button>
      </div>
      ${tab === 'brooms' ? this.broomsTab() : tab === 'look' ? this.lookTab() : this.skillsTab()}
      <div class="screen-pad"></div>
    </div>`;
  }

  broomsTab() {
    const s = this.state;
    const selected = getBroom(s.brooms.selected);
    const stats = getBroomStats(s, selected.id);
    const livery = LIVERIES.find(l => l.id === s.brooms.livery)?.color || selected.accent;
    const upgrades = s.brooms.upgrades[selected.id] || {};
    return `<div class="featured-broom">
      <div class="featured-glow"></div>
      ${broomArt(selected, livery)}
      <div class="featured-info">
        <small>${selected.maker}</small><h3>${selected.name}</h3>
        <p>${selected.desc}</p>
        <div class="badges"><span>Tier ${selected.tier}</span><span>${selected.length}</span></div>
      </div>
    </div>
    <div class="stat-block">
      ${statBar('Speed', stats.speed)}
      ${statBar('Acceleration', stats.accel)}
      ${statBar('Handling', stats.handling)}
      ${statBar('Boost', stats.boost)}
    </div>
    <div class="section-title"><span>Upgrades</span><small>Max 5 per attribute</small></div>
    <div class="upgrade-list">
      ${[['speed', 'Speed'], ['accel', 'Acceleration'], ['handling', 'Handling'], ['boost', 'Boost magic']].map(([id, label]) => {
        const lvl = upgrades[id] || 0;
        const cost = upgradeCost(id, lvl);
        return `<div class="upgrade-row"><div><b>${label}</b><span class="up-pips">${Array.from({ length: 5 }, (_, i) => `<i class="${i < lvl ? 'on' : ''}"></i>`).join('')}</span></div>
          <button class="btn tiny ${s.profile.galleons >= cost && lvl < 5 ? 'gold' : 'dim'}" data-action="upgrade-broom" data-value="${id}" ${lvl >= 5 ? 'disabled' : ''}>${lvl >= 5 ? 'MAX' : `${icon('coin')}${cost}`}</button></div>`;
      }).join('')}
    </div>
    <div class="section-title"><span>Broom collection</span><small>${s.brooms.owned.length}/${BROOMS.length} owned</small></div>
    <div class="broom-list">
      ${BROOMS.map(b => {
        const owned = s.brooms.owned.includes(b.id);
        const locked = s.profile.level < b.level;
        return `<button class="broom-card ${s.brooms.selected === b.id ? 'selected' : ''} ${owned ? '' : 'locked'}" data-action="select-broom" data-value="${b.id}">
          <div class="broom-card-art">${broomArt(b, b.accent)}</div>
          <div class="broom-card-info"><small>TIER ${b.tier} · ${b.length}</small><b>${b.name}</b>
          ${owned ? `<span class="owned">${s.brooms.selected === b.id ? 'Equipped' : 'Owned'}</span>` : `<span class="price">${locked ? `Level ${b.level}` : `${icon('coin')} ${b.price.toLocaleString()}`}</span>`}</div>
          ${s.brooms.selected === b.id ? `<i class="equipped-check">✓</i>` : ''}
        </button>`;
      }).join('')}
    </div>`;
  }

  lookTab() {
    const s = this.state;
    return `<div class="look-preview">
      <div class="look-avatar" style="background:radial-gradient(circle at 50% 35%, #f4e3c7, #1a2033 75%)">
        <div class="wizard-face" style="--skin:${s.profile.skin};--hair:${s.profile.hair};--robe:${s.profile.robe}">
          <div class="hair"></div><div class="head"></div><div class="glasses"></div><div class="robe"></div>
        </div>
      </div>
      <div><small>WITCH / WIZARD</small><b>${escapeHtml(s.profile.name)}</b><span>${HOUSES.find(h => h.id === s.profile.house)?.name} · ${rankName(s.profile.ranking)}</span></div>
    </div>
    <div class="form-card">
      <label>Name<input data-field="name" data-action="noop" value="${escapeHtml(s.profile.name)}" maxlength="24" /></label>
      <div class="field"><span>House</span><div class="swatches houses">${HOUSES.map(h => `<button class="house-swatch ${s.profile.house === h.id ? 'active' : ''}" data-action="select-house" data-value="${h.id}" style="--c:${h.color};--a:${h.accent}"><i></i><b>${h.name}</b></button>`).join('')}</div></div>
      <div class="field"><span>Robe colour</span><div class="swatches">${['#8f1d2c', '#1f5d45', '#263f73', '#b8891f', '#5b2d73', '#1f3d4d', '#6d1f52', '#232733'].map(c => `<button class="swatch ${s.profile.robe === c ? 'active' : ''}" style="--c:${c}" data-action="select-robe" data-value="${c}"></button>`).join('')}</div></div>
      <div class="field"><span>Skin tone</span><div class="swatches">${['#f2d3b3', '#e0b48b', '#c08e63', '#9a6842', '#714a2f', '#4e3322'].map(c => `<button class="swatch ${s.profile.skin === c ? 'active' : ''}" style="--c:${c}" data-action="select-skin" data-value="${c}"></button>`).join('')}</div></div>
      <div class="field"><span>Hair</span><div class="swatches">${['#2a1a12', '#6d4a2d', '#b98543', '#d9c7a1', '#8a8f96', '#4b2548'].map(c => `<button class="swatch ${s.profile.hair === c ? 'active' : ''}" style="--c:${c}" data-action="select-hair" data-value="${c}"></button>`).join('')}</div></div>
      <button class="btn gold full" data-action="save-appearance">${icon('shield')} Save appearance</button>
    </div>
    <div class="section-title"><span>Broom livery</span><small>Applied to your selected broom</small></div>
    <div class="livery-grid">${LIVERIES.map(l => `<button class="livery ${s.brooms.livery === l.id ? 'active' : ''}" data-action="select-livery" data-value="${l.id}" style="--c:${l.color}"><i></i>${l.name}</button>`).join('')}</div>`;
  }

  skillsTab() {
    const s = this.state;
    return `<div class="skill-hero"><div class="skill-points"><b>${s.profile.skillPoints}</b><span>Skill points</span></div><p>Every level grants a point. Build the flyer you want to become — these bonuses apply to every broom and every match.</p></div>
    <div class="skill-list">${SKILLS.map(sk => {
      const lvl = s.skills[sk.id] || 0;
      return `<div class="skill-row">
        <span class="skill-icon">${icon(sk.icon)}</span>
        <div class="skill-body"><b>${sk.name}</b><small>${sk.desc}</small><div class="skill-pips">${Array.from({ length: 10 }, (_, i) => `<i class="${i < lvl ? 'on' : ''}"></i>`).join('')}</div></div>
        <button class="skill-plus" data-action="spend-skill" data-value="${sk.id}" ${s.profile.skillPoints <= 0 || lvl >= 10 ? 'disabled' : ''}>+</button>
      </div>`;
    }).join('')}</div>
    <div class="section-title"><span>Current bonuses</span><small>Applied live</small></div>
    <div class="record-list">
      <div><span>${icon('wind')} Top speed</span><b>+${(s.skills.speed * 2.1).toFixed(1)}%</b></div>
      <div><span>${icon('compass')} Handling</span><b>+${(s.skills.handling * 2.1).toFixed(1)}%</b></div>
      <div><span>${icon('spark')} Boost</span><b>+${(s.skills.boost * 2.1).toFixed(1)}%</b></div>
      <div><span>${icon('impact')} Shot power</span><b>+${(s.skills.power * 0.8).toFixed(1)}%</b></div>
      <div><span>${icon('eye')} Reflex</span><b>+${(s.skills.reflex * 3).toFixed(0)}%</b></div>
    </div>`;
  }

  showOnboarding() {
    this.els.topbar.classList.add('hidden');
    this.els.nav.classList.add('hidden');
    this.els.screen.innerHTML = '';
    document.body.classList.add('onboarding');
    this.showModal(`<div class="onboarding">
      <div class="onboard-crest">${icon('broom')}</div>
      <span class="eyebrow-small">THE INTERNATIONAL</span>
      <h2>Create your flyer</h2>
      <p class="onboard-sub">A new season is calling. Name yourself, choose your colours, and step onto the world stage.</p>
      <label class="big-input"><span>Name</span><input id="onboard-name" value="Aria Blackwood" maxlength="24" /></label>
      <div class="onboard-section"><span>House</span><div class="house-grid">${HOUSES.map((h, i) => `<button class="house-option ${i === 0 ? 'active' : ''}" data-action="onboard-house" data-value="${h.id}" style="--c:${h.color};--a:${h.accent}"><i></i><b>${h.name}</b><small>${h.trait}</small></button>`).join('')}</div></div>
      <div class="onboard-section"><span>Skin tone</span><div class="swatches">${['#f2d3b3', '#e0b48b', '#c08e63', '#9a6842', '#714a2f', '#4e3322'].map((c, i) => `<button class="swatch onboard-skin ${i === 1 ? 'active' : ''}" data-action="onboard-skin" data-value="${c}" style="--c:${c}"></button>`).join('')}</div></div>
      <div class="onboard-section"><span>Robe colour</span><div class="swatches">${['#8f1d2c', '#1f5d45', '#263f73', '#b8891f', '#5b2d73', '#1f3d4d'].map((c, i) => `<button class="swatch onboard-robe ${i === 0 ? 'active' : ''}" data-action="onboard-robe" data-value="${c}" style="--c:${c}"></button>`).join('')}</div></div>
      <label class="big-input"><span>Nation</span><select id="onboard-nation">${NATIONS.map(n => `<option value="${n.id}">${n.name}</option>`).join('')}</select></label>
      <button class="btn gold full big" data-action="create-player">${icon('spark')} Begin my career</button>
      <p class="fineprint">Progress saves on this device. All 8 nations, 8 circuits and the full World Cup are included.</p>
    </div>`, { sticky: true, card: 'onboard-card' });
    this.onboardDraft = {
      house: 'gryffindor', skin: '#d9a97f', robe: '#8f1d2c',
    };
  }

  /* ================================================================ */
  /* Modals                                                           */
  /* ================================================================ */

  showBriefing() {
    const game = this.game;
    const s = this.state;
    const sel = game.sel;
    const track = TRACKS.find(t => t.id === sel.trackId) || TRACKS[0];
    const mode = RACE_MODES.find(m => m.id === sel.mode) || RACE_MODES[0];
    const diff = DIFFICULTIES.find(d => d.id === sel.difficulty) || DIFFICULTIES[1];
    const broom = getBroom(s.brooms.selected);
    const stats = getBroomStats(s, broom.id);
    const laps = sel.mode === 'trial' || sel.mode === 'qualify' ? 1 : track.laps;
    const rewards = this.raceRewardsPreview(sel.mode, diff);
    this.showModal(`<div class="briefing">
      <div class="briefing-art theme-${track.theme}">
        <div class="art-orb"></div>
        <div class="art-landmark">${landmarkSvg(track.theme)}</div>
        <div class="briefing-fade"></div>
        <button class="icon-btn floating-close" data-action="close-briefing">${icon('close')}</button>
        <div class="briefing-title"><small>${mode.name.toUpperCase()} · ${track.region.toUpperCase()}</small><h2>${track.name}</h2><span>${track.tagline}</span></div>
        <div class="briefing-weather">${weatherLabel(track.weather)}<b>${Math.round(track.wind * 100)}% wind</b></div>
      </div>
      <div class="briefing-body">
        <div class="briefing-grid">
          <div><small>Laps</small><b>${laps}</b></div>
          <div><small>Rivals</small><b>${sel.mode === 'trial' ? 'None' : '5'}</b></div>
          <div><small>Difficulty</small><b>${diff.name}</b></div>
          <div><small>Weather</small><b>${weatherLabel(track.weather)}</b></div>
        </div>
        <p class="briefing-desc">${track.desc}</p>
        <div class="briefing-broom">
          <div class="briefing-broom-art">${broomArt(broom, LIVERIES.find(l => l.id === s.brooms.livery)?.color)}</div>
          <div><small>YOUR BROOM</small><b>${broom.name}</b><div class="micro-stats"><span>SPD ${Math.round(stats.speed)}</span><span>HND ${Math.round(stats.handling)}</span><span>BST ${Math.round(stats.boost)}</span></div></div>
        </div>
        <div class="briefing-rewards">
          <span>${icon('coin')} ${rewards.galleons} G</span>
          <span>${icon('star')} ${rewards.xp} XP</span>
          <span>${icon('globe')} ${rewards.ranking} RP</span>
        </div>
        <div class="briefing-tip">${icon('compass')} Tilt your broom with the joystick. Fly through golden hoops and chase the glowing beacon.</div>
        <div class="briefing-actions">
          <button class="btn ghost" data-action="close-briefing">Back</button>
          <button class="btn gold" data-action="begin-race">${icon('play')} Begin</button>
        </div>
      </div>
    </div>`, { card: 'briefing-card', sticky: true });
  }

  raceRewardsPreview(mode, diff) {
    const mult = diff.reward;
    if (mode === 'trial') return { galleons: Math.round(300 * mult), xp: Math.round(100 * mult), ranking: 10 };
    if (mode === 'qualify') return { galleons: Math.round(220 * mult), xp: Math.round(80 * mult), ranking: 8 };
    return { galleons: Math.round(500 * mult), xp: Math.round(180 * mult), ranking: 50 };
  }

  showSettings() {
    const st = this.state.settings;
    const toggle = (key, label, desc, ic) => `<button class="setting-row" data-action="toggle-setting" data-value="${key}">
      <span class="setting-ic">${icon(ic)}</span><div><b>${label}</b><small>${desc}</small></div>
      <span class="toggle ${st[key] ? 'on' : ''}"><i></i></span>
    </button>`;
    this.showModal(`<div class="modal-head"><div><small>PREFERENCES</small><h3>Settings</h3></div><button class="icon-btn" data-action="close-modal">${icon('close')}</button></div>
      <div class="setting-list">
        ${toggle('sound', 'Sound effects', 'Whooshes, hoops and crowd roars', 'sound')}
        ${toggle('music', 'Magical score', 'Procedural music for every arena', 'spark')}
        ${toggle('voice', 'Commentary voice', 'Spoken match commentary', 'quaffle')}
        ${toggle('haptics', 'Haptics', 'Feel collisions and saves', 'bolt')}
      </div>
      <div class="setting-label">GRAPHICS</div>
      <div class="seg-chips">${['high', 'medium', 'low'].map(q => `<button class="chip ${st.quality === q ? 'active' : ''}" data-action="set-quality" data-value="${q}">${q[0].toUpperCase() + q.slice(1)}</button>`).join('')}</div>
      <p class="fineprint">High quality uses device pixel ratio and real-time shadows. Reduce for older phones.</p>
      <div class="setting-label">GAME DATA</div>
      <button class="danger-link" data-action="reset-save">Reset all progress…</button>
      <p class="fineprint">Version 1.0 · A fully 3D mobile wizarding sports game. Built with Three.js.</p>`, { card: 'settings-card' });
  }

  showPause(match) {
    const isQuid = !!match;
    const s = this.state;
    this.showModal(`<div class="modal-head"><div><small>${isQuid ? 'QUIDDITCH' : 'BROOM RACING'}</small><h3>Paused</h3></div><button class="icon-btn" data-action="resume">${icon('play')}</button></div>
      ${isQuid ? `<div class="pause-score"><div><small>${match.nation.name}</small><b>${match.score.player}</b></div><span>VS</span><div><small>${match.opponent.name}</small><b>${match.score.opp}</b></div></div>
      <div class="setting-label">SUBSTITUTION</div>
      <div class="sub-grid">${POSITIONS.map(p => `<button class="sub-btn ${match.role === p.id ? 'active' : ''}" data-action="sub-role" data-value="${p.id}">${icon(p.icon)}<b>${p.name}</b></button>`).join('')}</div>
      <div class="setting-label">TACTICS</div>
      <div class="seg-chips">${TACTICS.map(t => `<button class="chip ${match.tactics.id === t.id ? 'active' : ''}" data-action="change-tactics" data-value="${t.id}">${t.name}</button>`).join('')}</div>
      <p class="fineprint">Substitutions swap the position you control. Your team keeps its formation.</p>
      ` : `<p class="pause-note">Take a breath. The hoops will wait.</p>`}
      <div class="pause-actions">
        <button class="btn gold full" data-action="resume">${icon('play')} Resume</button>
        <button class="btn ghost full" data-action="restart-current">${icon('restart')} Restart</button>
        <button class="btn ghost full" data-action="quit-game">${icon('home')} Return to menu</button>
      </div>`, { sticky: true, card: 'pause-card' });
  }

  showRaceResults(summary, reward, extras = {}) {
    const pos = summary.pos;
    const suffix = ['th', 'st', 'nd', 'rd'][((pos % 100) - 20) % 10] || ['th', 'st', 'nd', 'rd'][pos % 10] || `${pos}th`;
    const posText = `${pos}${pos === 1 ? 'st' : pos === 2 ? 'nd' : pos === 3 ? 'rd' : 'th'}`;
    const standings = summary.standings.slice(0, 6);
    const champ = extras.championship;
    const rows = champ ? Object.entries(champ.points).sort((a, b) => b[1] - a[1]) : null;
    const newAch = extras.achievements || [];
    this.showModal(`<div class="results">
      <div class="results-hero ${pos <= 3 ? 'podium' : ''}">
        <span class="results-rays"></span>
        <div class="big-rank">${posText}</div>
        <small>${summary.mode === 'trial' ? 'TIME TRIAL' : summary.mode === 'qualify' ? 'QUALIFYING' : summary.mode === 'championship' ? 'GRAND PRIX' : 'RACE COMPLETE'}</small>
        <h2>${pos === 1 ? 'Victory' : pos <= 3 ? 'Podium finish' : 'Race complete'}</h2>
        <p>${summary.trackName}</p>
        <div class="result-times"><div><small>Total time</small><b>${formatTime(summary.totalTime)}</b></div><div><small>Best lap</small><b>${formatTime(summary.bestLap)}</b></div><div><small>Boost</small><b>${Math.round(summary.boostTime)}s</b></div></div>
      </div>
      <div class="results-body">
        <div class="reward-row">
          <span>${icon('coin')} <b>+${reward.galleons}</b><small>Galleons</small></span>
          <span>${icon('star')} <b>+${reward.xp}</b><small>XP</small></span>
          <span>${icon('globe')} <b>+${reward.ranking}</b><small>Ranking</small></span>
        </div>
        ${extras.levels ? `<div class="level-up">${icon('spark')} Level up! You are now level ${this.state.profile.level}. +1 skill point.</div>` : ''}
        ${newAch.length ? `<div class="ach-toast">${newAch.map(a => `<span>${icon(a.icon)} ${a.name}</span>`).join('')}</div>` : ''}
        <div class="result-table">
          <div class="result-head"><span>#</span><span>Flyer</span><span>Time / gap</span></div>
          ${standings.map(r => `<div class="result-row ${r.player ? 'me' : ''}"><b>${r.pos}</b><span>${escapeHtml(r.name)}</span><i>${r.timeText || '—'}${r.gap && r.gap > 0 ? ` +${(r.gap).toFixed(1)}s` : ''}</i></div>`).join('')}
        </div>
        ${champ ? `<div class="champ-standings"><div class="section-title"><span>Championship</span><small>Round ${champ.round + 1} of 3</small></div>
          ${rows.map(([name, pts], i) => `<div class="result-row ${name === this.state.profile.name ? 'me' : ''}"><b>${i + 1}</b><span>${escapeHtml(name)}</span><i>${pts} pts</i></div>`).join('')}
        </div>` : ''}
        <div class="results-actions">
          ${champ && !champ.final ? `<button class="btn gold" data-action="next-champ-race">${icon('flag')} Next race</button>` : ''}
          ${champ && champ.final ? `<button class="btn gold" data-action="go" data-value="career">${icon('trophy')} View career</button>` : ''}
          ${!champ ? `<button class="btn gold" data-action="race-again">${icon('restart')} Race again</button>` : ''}
          <button class="btn ghost" data-action="go" data-value="race">Change circuit</button>
          <button class="btn ghost" data-action="go" data-value="home">Home</button>
        </div>
      </div>
    </div>`, { sticky: true, card: 'results-card' });
  }

  showQuidditchResults(summary, reward, extras = {}) {
    const won = summary.won;
    const newAch = extras.achievements || [];
    const t = extras.tournament;
    const nextFixture = extras.nextFixture;
    const champion = extras.champion;
    const eliminated = extras.eliminated;
    this.showModal(`<div class="results quid-results ${won ? 'won' : 'lost'}">
      <div class="results-hero ${won ? 'podium' : ''}">
        <span class="results-rays"></span>
        <div class="result-crest">${crest(NATIONS.find(n => n.id === summary.nationId))}</div>
        <small>${summary.roundName.toUpperCase()} · ${summary.role.toUpperCase()}</small>
        <h2>${won ? 'Victory' : 'Defeat'}</h2>
        <div class="quid-final-score"><b>${summary.scoreFor}</b><span>—</span><b>${summary.scoreAgainst}</b></div>
        <p>${summary.nationName} vs ${summary.opponentName}</p>
        ${summary.snitch ? `<div class="snitch-tag">${icon('snitch')} GOLDEN SNITCH CAUGHT</div>` : ''}
      </div>
      <div class="results-body">
        <div class="match-stats">
          <div><b>${summary.goals}</b><span>Goals</span></div>
          <div><b>${summary.saves}</b><span>Saves</span></div>
          <div><b>${summary.bludgers}</b><span>Bludger hits</span></div>
          <div><b>${summary.shots}</b><span>Shots</span></div>
        </div>
        <div class="reward-row">
          <span>${icon('coin')} <b>+${reward.galleons}</b><small>Galleons</small></span>
          <span>${icon('star')} <b>+${reward.xp}</b><small>XP</small></span>
          <span>${icon('globe')} <b>+${reward.ranking}</b><small>Ranking</small></span>
        </div>
        ${extras.levels ? `<div class="level-up">${icon('spark')} Level up! You are now level ${this.state.profile.level}.</div>` : ''}
        ${newAch.length ? `<div class="ach-toast">${newAch.map(a => `<span>${icon(a.icon)} ${a.name}</span>`).join('')}</div>` : ''}
        ${champion ? `<div class="champion-banner">${icon('cup')} WORLD CHAMPIONS · THE CUP IS YOURS</div>` : eliminated ? `<div class="eliminated-banner">Knocked out of the World Cup. A new campaign awaits.</div>` : nextFixture ? `<div class="next-fixture"><span>NEXT</span><b>${nextFixture.roundName}</b><small>${NATIONS.find(n => n.id === nextFixture.opponentId)?.name || ''}</small></div>` : ''}
        <div class="results-actions">
          ${!champion && !eliminated ? `<button class="btn gold" data-action="next-quid-match">${icon('play')} Next match</button>` : `<button class="btn gold" data-action="new-quid-campaign">${icon('trophy')} New campaign</button>`}
          <button class="btn ghost" data-action="go" data-value="quid">World Cup hub</button>
          <button class="btn ghost" data-action="go" data-value="home">Home</button>
        </div>
      </div>
    </div>`, { sticky: true, card: 'results-card' });
  }

  showConfirmReset() {
    this.showModal(`<div class="modal-head"><div><small>IRREVERSIBLE</small><h3>Reset progress?</h3></div></div>
      <p class="pause-note">All levels, brooms, trophies, records and tournaments will be erased. This cannot be undone.</p>
      <div class="pause-actions">
        <button class="btn gold full" data-action="close-modal">Keep my legend</button>
        <button class="btn danger full" data-action="confirm-reset">Erase everything</button>
      </div>`, { card: 'settings-card' });
  }

  /* ================================================================ */
  /* HUD — shared                                                      */
  /* ================================================================ */

  baseControls() {
    return `<div class="controls">
      <div class="joystick-wrap">
        <div class="joystick" id="joystick-zone"><div class="joy-glow"></div><div class="joy-knob" id="joystick-knob">${icon('wind')}</div></div>
        <span class="control-label">FLY</span>
      </div>
      <div class="action-cluster">
        <button class="round-btn brake" id="btn-brake" aria-label="Brake">${icon('wind')}<span>BRAKE</span></button>
        <button class="round-btn boost" id="btn-boost" aria-label="Boost">${icon('bolt')}<span>BOOST</span></button>
      </div>
    </div>`;
  }

  hudTop(html) {
    return `<div class="hud-top">${html}</div>`;
  }

  /* ================================================================ */
  /* Race HUD                                                          */
  /* ================================================================ */

  showRaceHUD(race) {
    this.els.topbar.classList.add('hidden');
    this.els.nav.classList.add('hidden');
    document.body.classList.add('in-game');
    const track = race.track;
    this.els.hud.innerHTML = `<div class="hud race-hud" id="race-hud">
      <div class="hud-top">
        <div class="hud-chip lap-chip"><small>LAP</small><b id="race-lap">1/2</b></div>
        <div class="hud-chip pos-chip"><small>POS</small><b id="race-pos">1</b><span>st</span></div>
        <div class="hud-chip time-chip"><small>TIME</small><b id="race-time">0:00.00</b></div>
        <div class="hud-chip weather-chip-hud" id="race-weather">${weatherLabel(track.weather)}</div>
        <button class="hud-pause" data-action="pause">${icon('pause')}</button>
      </div>
      <div class="race-minimap-wrap"><canvas id="race-minimap" width="220" height="150"></canvas><span class="map-label">CIRCUIT</span></div>
      <div class="race-compass" id="race-compass"><span class="compass-arrow">${icon('chevron')}</span><small id="race-compass-dist">—</small></div>
      <div class="race-message" id="race-message"></div>
      <div class="countdown" id="race-countdown"></div>
      <div class="finish-flash" id="race-finish"></div>
      <div class="speed-panel">
        <div class="speed-value"><b id="race-speed">0</b><small>KM/H</small></div>
        <div class="boost-meter"><div class="boost-fill" id="race-boost"></div><span>BROOM MAGIC</span></div>
      </div>
      <div class="race-objective" id="race-objective">${icon('hoop')} <span>Follow the golden hoops</span></div>
      ${this.baseControls()}
      <div class="speedlines"></div>
      <div class="hit-flash"></div>
    </div>`;
    this.cacheHUD();
    this.els.hud.querySelectorAll('[data-action]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        this.game.handleUI(el.dataset.action, el.dataset.value, el.dataset);
      });
    });
  }

  cacheHUD() {
    const $ = id => document.getElementById(id);
    this.hudEls = {
      lap: $('race-lap'), pos: $('race-pos'), time: $('race-time'),
      speed: $('race-speed'), boost: $('race-boost'), weather: $('race-weather'),
      message: $('race-message'), countdown: $('race-countdown'),
      finish: $('race-finish'), compass: $('race-compass'),
      compassDist: $('race-compass-dist'), objective: $('race-objective'),
      minimap: $('race-minimap'), hud: $('race-hud'),
      qScoreP: $('quid-score-p'), qScoreO: $('quid-score-o'), qClock: $('quid-clock'),
      qAction: $('quid-action'), qPass: $('quid-pass'), qBoost: $('quid-boost'),
      qCommentary: $('quid-commentary'), qObjective: $('quid-objective'),
      qMinimap: $('quid-minimap'), qCountdown: $('quid-countdown'),
      qBanner: $('quid-banner'), qWarning: $('quid-warning'), qRound: $('quid-round'),
      qFlash: $('quid-score-flash'), qActionCooldown: $('quid-action-cooldown'),
    };
  }

  updateRaceHUD(data) {
    const e = this.hudEls;
    if (!e.lap) return;
    e.lap.textContent = `${data.lap}/${data.laps}`;
    e.pos.textContent = data.pos;
    e.pos.parentElement.classList.toggle('first', data.pos === 1);
    e.time.textContent = formatTime(data.time);
    e.speed.textContent = data.speed;
    e.boost.style.width = `${Math.round(data.boost * 100)}%`;
    e.boost.classList.toggle('full', data.boost > 0.98);
    e.hud?.classList.toggle('boosting', !!data.boostHeld);
    e.weather.textContent = weatherLabel(data.weather);
    e.weather.dataset.weather = data.weather;
    if (data.beacon && data.player) {
      const dx = data.beacon.x - data.player.pos.x;
      const dz = data.beacon.z - data.player.pos.z;
      const targetYaw = Math.atan2(-dx, -dz);
      let rel = targetYaw - data.player.yaw;
      while (rel > Math.PI) rel -= Math.PI * 2;
      while (rel < -Math.PI) rel += Math.PI * 2;
      const arrow = e.compass.querySelector('.compass-arrow');
      if (arrow) arrow.style.transform = `rotate(${-rel}rad)`;
      const dist = Math.hypot(dx, dz, (data.beacon.y || 0) - data.player.pos.y);
      e.compassDist.textContent = `${Math.round(dist)}m`;
      e.objective.querySelector('span').textContent = dist < 55 ? 'Through the next hoop!' : 'Follow the golden hoops';
    }
    this.drawRaceMinimap(data);
  }

  drawRaceMinimap(data) {
    const canvas = this.hudEls.minimap;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const track = this.game.active?.track;
    if (!track) return;
    const pts = track.points;
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (const p of pts) { minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]); minZ = Math.min(minZ, p[2]); maxZ = Math.max(maxZ, p[2]); }
    const pad = 22;
    const sx = (w - pad * 2) / (maxX - minX || 1);
    const sz = (h - pad * 2) / (maxZ - minZ || 1);
    const scale = Math.min(sx, sz);
    const map = (x, z) => [w / 2 + (x - (minX + maxX) / 2) * scale, h / 2 + (z - (minZ + maxZ) / 2) * scale];
    ctx.fillStyle = 'rgba(9,15,25,0.62)';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,221,150,0.28)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    pts.forEach((p, i) => { const [x, y] = map(p[0], p[2]); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
    ctx.closePath(); ctx.stroke();
    // gates
    (this.game.active?.world.gates || []).forEach((g, i) => {
      const [x, y] = map(g.pos.x, g.pos.z);
      const active = i === (data.nextGate % pts.length);
      ctx.beginPath();
      ctx.arc(x, y, active ? 4.2 : 2.3, 0, Math.PI * 2);
      ctx.fillStyle = g.mod === 'warp' ? '#bb8bff' : active ? '#ffe08a' : 'rgba(180,220,240,0.55)';
      ctx.fill();
    });
    // AI
    for (const ai of data.ais || []) {
      if (ai.finished) continue;
      const u = (ai.lap - 1 + ai.u) / this.game.active.laps;
      const point = this.game.active.world.curve.getPointAt(Math.min(0.999, ai.u));
      const [x, y] = map(point.x, point.z);
      ctx.beginPath(); ctx.arc(x, y, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200,215,235,0.7)'; ctx.fill();
    }
    // player
    const [px, py] = map(data.player.pos.x, data.player.pos.z);
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(-data.player.yaw);
    ctx.beginPath();
    ctx.moveTo(0, -8); ctx.lineTo(5.5, 6); ctx.lineTo(0, 3); ctx.lineTo(-5.5, 6); ctx.closePath();
    ctx.fillStyle = '#ffd873'; ctx.fill();
    ctx.strokeStyle = '#2a1b0a'; ctx.lineWidth = 1; ctx.stroke();
    ctx.restore();
  }

  raceCountdown(text, cls = '') {
    const e = this.hudEls.countdown;
    if (!e) return;
    e.textContent = text;
    e.className = `countdown ${cls || ''} ${text ? 'show' : ''}`;
  }

  raceMessage(text, tone = 'info') {
    const e = this.hudEls.message;
    if (!e) return;
    e.innerHTML = `<span class="msg-mark">${tone === 'danger' ? '⚠' : tone === 'gold' ? '✦' : '◆'}</span>${escapeHtml(text)}`;
    e.className = `race-message show ${tone}`;
    clearTimeout(this._msgTimer);
    this._msgTimer = setTimeout(() => e.classList.remove('show'), 3200);
  }

  raceHit() {
    const hud = this.hudEls.hud;
    if (!hud) return;
    hud.classList.remove('hit');
    void hud.offsetWidth;
    hud.classList.add('hit');
  }

  raceFinishFlash(pos) {
    const e = this.hudEls.finish;
    if (!e) return;
    e.innerHTML = `<small>FINISH</small><b>${pos}${pos === 1 ? 'st' : pos === 2 ? 'nd' : pos === 3 ? 'rd' : 'th'}</b>`;
    e.classList.add('show');
  }

  /* ================================================================ */
  /* Quidditch HUD                                                     */
  /* ================================================================ */

  showQuidditchHUD(match) {
    this.els.topbar.classList.add('hidden');
    this.els.nav.classList.add('hidden');
    document.body.classList.add('in-game', 'quid-game');
    this.els.hud.innerHTML = `<div class="hud quid-hud" id="quid-hud">
      <div class="scoreboard">
        <div class="team-block player-team" style="--c:${match.nation.colors[0]};--ca:${match.nation.accent}">
          ${crest(match.nation, 'small')}<div><small>${match.nation.name}</small><b id="quid-score-p">0</b></div>
        </div>
        <div class="match-clock"><small id="quid-round">${match.roundName.toUpperCase()}</small><b id="quid-clock">2:50</b><span class="clock-underline"></span></div>
        <div class="team-block opp-team" style="--c:${match.opponent.colors[0]};--ca:${match.opponent.accent}">
          <div><small>${match.opponent.name}</small><b id="quid-score-o">0</b></div>${crest(match.opponent, 'small')}
        </div>
        <button class="hud-pause" data-action="pause">${icon('pause')}</button>
      </div>
      <div class="quid-commentary" id="quid-commentary"><span>✦</span> The Quaffle is released — the World Cup is alive!</div>
      <div class="quid-objective" id="quid-objective"><span class="obj-dot"></span><b>Role</b><span>—</span></div>
      <div class="quid-warning" id="quid-warning"></div>
      <div class="quid-minimap-wrap"><canvas id="quid-minimap" width="200" height="130"></canvas><span class="map-label">PITCH</span></div>
      <div class="role-chip" id="quid-role">${icon(match.roleInfo.icon)} ${match.roleInfo.name}</div>
      <div class="quid-boost"><div class="boost-meter"><div class="boost-fill" id="quid-boost"></div><span>FLIGHT</span></div></div>
      <div class="quid-actions">
        <button class="round-btn boost" id="btn-boost">${icon('bolt')}<span>BOOST</span></button>
        <button class="round-btn action" id="btn-action">${icon(match.roleInfo.icon)}<span id="quid-action">${match.actionLabel()}</span><i class="cooldown-ring" id="quid-action-cooldown"></i></button>
        <button class="round-btn pass hidden" id="btn-pass">${icon('quaffle')}<span>PASS</span></button>
      </div>
      <div class="countdown quid-countdown" id="quid-countdown"></div>
      <div class="quid-banner" id="quid-banner"></div>
      <div class="quid-score-flash" id="quid-score-flash"></div>
      <div class="speedlines"></div>
      <div class="hit-flash"></div>
      ${this.baseControls()}
    </div>`;
    // quidditch uses its own action cluster; remove the generic race buttons
    this.els.hud.querySelector('.action-cluster')?.remove();
    this.cacheHUD();
    this._qTimer = null;
    this.els.hud.querySelectorAll('[data-action]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        this.game.handleUI(el.dataset.action, el.dataset.value, el.dataset);
      });
    });
  }

  updateQuidditchHUD(d) {
    const e = this.hudEls;
    if (!e.qScoreP) return;
    e.qScoreP.textContent = d.scorePlayer;
    e.qScoreO.textContent = d.scoreOpp;
    e.qClock.textContent = formatClock(d.timeLeft);
    e.qClock.classList.toggle('urgent', d.timeLeft < 30);
    e.qBoost.style.width = `${Math.round(d.boost * 100)}%`;
    const action = this.els.hud.querySelector('#quid-action');
    if (action) action.textContent = d.action;
    const btn = document.getElementById('btn-action');
    if (btn) btn.disabled = d.actionCooldown > 0;
    const ring = document.getElementById('quid-action-cooldown');
    if (ring) ring.style.setProperty('--cd', `${Math.max(0, Math.min(1, d.actionCooldown / 2)) * 360}deg`);
    const pass = document.getElementById('btn-pass');
    if (pass) pass.classList.toggle('hidden', !d.pass);
    this.els.hud.classList.toggle('boosting', d.boost >= 0.99);
    let obj = '';
    if (d.incoming) {
      obj = `SHOT INCOMING — dive to the ${d.incoming.y > 16 ? 'top' : d.incoming.y < 11 ? 'low' : 'middle'} hoop!`;
    } else if (d.role === 'chaser') {
      if (d.carrying) {
        const hoop = d.aimTargetY == null ? '' : ` · ${d.aimTargetY > 16 ? 'TOP' : d.aimTargetY < 11 ? 'LOW' : 'MIDDLE'} HOOP LINED UP`;
        obj = `Steer toward the glowing hoop and SHOOT${hoop}`;
      } else {
        obj = 'Chase the Quaffle — steal it or scoop it up';
      }
    } else if (d.role === 'beater') {
      obj = 'Protect your carrier — SMASH a Bludger at a rival';
    } else if (d.role === 'keeper') {
      obj = 'Guard all three hoops — DIVE when a shot comes';
    } else {
      obj = d.snitchReleased ? 'The Snitch is loose — chase it down and GRAB' : 'Watch the skies — the Snitch appears soon';
    }
    if (e.qObjective) {
      e.qObjective.innerHTML = `<span class="obj-dot"></span><b>${d.roleInfo.name}</b><span>${obj}</span>`;
      e.qObjective.classList.toggle('danger', !!d.incoming);
    }
    if (d.incoming) {
      const w = document.getElementById('quid-warning');
      if (w) { w.textContent = 'INCOMING SHOT'; w.classList.add('show'); }
    } else {
      const w = document.getElementById('quid-warning');
      if (w) w.classList.remove('show');
    }
    // highlight target hoop glows handled 3D; also radar
    this.drawQuidditchMinimap(d);
  }

  drawQuidditchMinimap(d) {
    const canvas = this.hudEls.qMinimap;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(9,15,25,0.65)'; ctx.fillRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2;
    const sx = (w - 24) / 180, sz = (h - 20) / 104;
    const map = (x, z) => [cx + x * sx, cy + z * sz];
    ctx.strokeStyle = 'rgba(220,235,210,0.4)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(cx, cy, 86 * sx, 50 * sz, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy - 50 * sz); ctx.lineTo(cx, cy + 50 * sz); ctx.stroke();
    ctx.strokeStyle = 'rgba(225,190,90,0.9)'; ctx.lineWidth = 2;
    for (const hh of [[-88, 8.5], [-88, 13.5], [-88, 18.5], [88, 8.5], [88, 13.5], [88, 18.5]]) {
      const [x, y] = map(hh[0], 0);
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.stroke();
    }
    for (const p of d.opponents || []) {
      if (!p.model) continue;
      const [x, y] = map(p.model.position.x, p.model.position.z);
      ctx.beginPath(); ctx.arc(x, y, 2.3, 0, Math.PI * 2);
      ctx.fillStyle = '#c26868'; ctx.fill();
    }
    for (const p of d.teammates || []) {
      if (!p.model) continue;
      const [x, y] = map(p.model.position.x, p.model.position.z);
      ctx.beginPath(); ctx.arc(x, y, 2.1, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(160,210,230,0.8)'; ctx.fill();
    }
    const qp = d.quafflePos;
    const [qx, qy] = map(qp.x, qp.z);
    ctx.beginPath(); ctx.arc(qx, qy, 3, 0, Math.PI * 2); ctx.fillStyle = '#ff8a6b'; ctx.fill();
    if (d.snitchVisible) {
      const [sx2, sy2] = map(d.snitchPos.x, d.snitchPos.z);
      ctx.beginPath(); ctx.arc(sx2, sy2, 3.4, 0, Math.PI * 2); ctx.fillStyle = '#ffe08a'; ctx.fill();
      ctx.strokeStyle = 'rgba(255,224,138,0.5)'; ctx.beginPath(); ctx.arc(sx2, sy2, 7, 0, Math.PI * 2); ctx.stroke();
    }
    const [px, py] = map(d.playerPos.x, d.playerPos.z);
    ctx.save(); ctx.translate(px, py); ctx.rotate(-d.playerYaw);
    ctx.beginPath(); ctx.moveTo(0, -7); ctx.lineTo(5, 5); ctx.lineTo(0, 2.5); ctx.lineTo(-5, 5); ctx.closePath();
    ctx.fillStyle = '#ffd873'; ctx.fill(); ctx.restore();
  }

  quidditchCountdown(text) {
    const e = this.hudEls.qCountdown;
    if (!e) return;
    e.textContent = text;
    e.classList.toggle('show', !!text);
  }

  quidditchMessage(text, tone = 'info') {
    const e = this.hudEls.qCommentary;
    if (!e) return;
    e.innerHTML = `<span>${tone === 'danger' ? '⚠' : '✦'}</span> ${escapeHtml(text)}`;
    e.classList.remove('flash');
    void e.offsetWidth;
    e.classList.add('flash');
    this.lastComment = text;
  }

  quidditchBanner(text) {
    const e = this.hudEls.qBanner;
    if (!e) return;
    e.textContent = text;
    e.classList.add('show');
    clearTimeout(this._qBanner);
    this._qBanner = setTimeout(() => e.classList.remove('show'), 2600);
  }

  quidditchWarning(text) {
    const e = this.hudEls.qWarning;
    if (!e) return;
    e.textContent = text;
    e.classList.add('show');
    clearTimeout(this._qWarn);
    this._qWarn = setTimeout(() => e.classList.remove('show'), 2000);
    this.game.audio.sfx('hit');
  }

  quidditchHint(text) {
    if (!this.lastHint || performance.now() - this.lastHint > 4000) {
      this.lastHint = performance.now();
      this.quidditchMessage(text, 'info');
    }
  }

  quidditchScoreFlash(a, b) {
    const e = this.hudEls.qFlash;
    if (!e) return;
    let text = a;
    if (typeof a !== 'string') text = a === 'player' ? (b ? '+10 GOAL' : 'SAVED') : (b ? '+10 OPPONENT' : 'SAVED');
    e.textContent = text;
    e.className = `quid-score-flash show ${b ? 'good' : 'bad'}`;
    clearTimeout(this._qFlash);
    this._qFlash = setTimeout(() => e.classList.remove('show'), 1700);
  }

  quidditchFlashAction(text) {
    this.quidditchScoreFlash(text, false);
  }

  hideHUD() {
    this.els.hud.innerHTML = '';
    this.hudEls = {};
    document.body.classList.remove('in-game', 'quid-game');
    this.els.topbar.classList.remove('hidden');
    this.els.nav.classList.remove('hidden');
    this.renderChrome();
  }
}
