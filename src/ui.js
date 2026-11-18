import * as Save from './save.js';
import {
  DRAGONS, DRAGON_MAP, RARITIES, RARITY_ORDER, TRACKS, TRACK_MAP, LEAGUES, MODES,
  COSMETICS, SKILLS, SKILL_LIST, BUILDINGS, EXPLORE_ZONES, RIVAL_NAMES, DAILY_POOL,
  HABITAT_INFO, FAMILY_ORDER, dragonsByFamily,
} from './data.js';
import { dragonThumb } from './dragon.js';
import { sfx, setAudioEnabled, unlockAudio } from './audio.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const fmt = Save.formatCoins;
const fmtTime = Save.formatTime;
const ordinal = (n) => n === 1 ? '1st' : n === 2 ? '2nd' : n === 3 ? '3rd' : `${n}th`;
const MODE_MAP = Object.fromEntries(MODES.map(m => [m.id, m]));
const CREST = `<svg viewBox="0 0 100 100"><path class="crest-wing" d="M50 20 C32 8 14 12 6 26 c14 2 22 10 28 22 C24 44 12 50 6 64 c16-6 28-8 44-6 z"/><path class="crest-wing right" d="M50 20 C68 8 86 12 94 26 c-14 2-22 10-28 22 10-4 22 2 28 16 -16-6-28-8-44-6 z"/><path class="crest-body" d="M50 18 c-8 10-10 24-8 40 2 14 4 22 8 28 4-6 6-14 8-28 2-16 0-30-8-40z"/><circle cx="50" cy="30" r="3.4" class="crest-eye"/></svg>`;

export class UI {
  constructor(game) {
    this.game = game;
    this.view = 'menu';
    this.trackId = 'hearthfall';
    this.modeId = 'race';
    this.leagueId = 'hatchling';
    this.dragonId = Save.S().selected;
    this.hangarTab = 'train';
    this.habitatFilter = 'all';
    this.habitatFocus = null;
    this.shopTab = 'dragons';
    this.shopFamily = 'all';
    this.champ = null;
    this.lastRaceConfig = null;
    this.isEventRace = false;
    this.thumbs = new Map();
    this.hudMode = null;
    this.hudData = null;
    this._noticeSeq = 0;
    this.resultsEl = null;
    this.bindEvents();
    this.bindGame();
    this.updateChrome();
  }

  // ── shortcuts ─────────────────────────────────────────────────────────────
  get S() { return Save.S(); }
  thumb(def, silhouette = false) {
    const key = silhouette ? def.id + ':sil' : def.id;
    if (!this.thumbs.has(key)) this.thumbs.set(key, dragonThumb(def, 128, silhouette));
    return this.thumbs.get(key);
  }
  rarity(def) { return RARITIES[def.rarity]; }
  dragonSave(id) { return this.S.dragons[id]; }
  ownedDragons() { return DRAGONS.filter(d => this.S.dragons[d.id]); }
  lockedDragons() { return DRAGONS.filter(d => !this.S.dragons[d.id]); }
  totalBuildingLevels() { return Object.values(this.S.village).reduce((a, b) => a + b, 0); }
  dailyList() { return Save.activeDailies(); }
  seasonGoal() { return 600; }

  toast(text, sub = '', kind = '') {
    const root = $('#toast-root');
    const el = document.createElement('div');
    el.className = 'toast ' + kind;
    el.innerHTML = `<span class="t-ico">${kind === 'good' ? '✦' : '◈'}</span><div>${text}${sub ? `<span class="t-sub">${sub}</span>` : ''}</div>`;
    root.appendChild(el);
    setTimeout(() => el.remove(), 2900);
  }

  // ── global event wiring ───────────────────────────────────────────────────
  bindEvents() {
    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-action]');
      if (!t) return;
      e.preventDefault();
      e.stopPropagation();
      unlockAudio();
      this.handleAction(t.dataset.action, t.dataset.id, t, e);
    });
    document.addEventListener('pointerup', () => { unlockAudio(); }, { once: true });
    $('#modal-root')?.addEventListener('click', (e) => {
      if (e.target.id === 'modal-root') this.closeModal();
    });
    window.addEventListener('resize', () => { if (this.view === 'race' || this.view === 'explore') this.drawMinimap(); });
  }

  bindGame() {
    const g = this.game;
    g.on('raceStart', (d) => this.onRaceStart(d));
    g.on('hud', (d) => this.onHud(d));
    g.on('raceEnd', (d) => this.onRaceEnd(d));
    g.on('explore', (d) => this.onExplore(d));
    g.on('pickup', (d) => this.toast(d.text, d.sub, 'good'));
    g.on('lairFound', (d) => this.onLairFound(d));
    g.on('lotClick', (d) => this.openBuilding(d.buildingId));
    g.on('hangarHabitat', (d) => this.onHangarHabitat(d.family));
    g.on('hangarAction', (d) => this.onHangarAction(d.type));
    g.on('hangarSelect', (d) => { if (this.view === 'hangar') { this.dragonId = d.id; this.renderHangar(); } });
    g.on('notice', (d) => this.hudNotice(d.text, d.kind));
    g.on('countdown', (d) => this.onCountdown(d));
    g.on('lap', (d) => this.hudNotice(d.lap === d.total ? 'Final lap! Make it count.' : `Lap ${d.lap} of ${d.total}`, 'lap'));
    g.on('ability', (d) => { this.hudNotice(`${d.name}!`, 'gate'); this.flashScreen('ability'); });
    g.on('gateFlash', (d) => { this.flashScreen('gate'); if (d.perfect) this.hudNotice('Perfect line!', 'gate'); });
    g.on('hitFlash', () => this.flashScreen('hit'));
    g.on('rivalFinish', () => {});
  }

  // ── chrome (topbar + nav) ──────────────────────────────────────────────────
  updateChrome() {
    const s = this.S;
    $('#cur-coins').textContent = fmt(s.coins);
    $('#cur-gems').textContent = fmt(s.gems);
    $('#rider-level').textContent = s.level;
    $('#rider-xp').style.width = Save.riderXpPercent() + '%';
    $('#rider-name').textContent = s.riderName;
    $('#rider-avatar').textContent = (s.riderName || 'W')[0].toUpperCase();
    const navs = [
      { id: 'menu', icon: '⌂', label: 'Home' },
      { id: 'race', icon: '⚑', label: 'Race' },
      { id: 'hangar', icon: '✦', label: 'Dragons' },
      { id: 'village', icon: '⌂', label: 'Village' },
      { id: 'explore', icon: '◈', label: 'Explore' },
      { id: 'shop', icon: '◇', label: 'Market' },
    ];
    $('#bottomnav').innerHTML = navs.map(n =>
      `<button class="nav-btn ${this.view === n.id ? 'active' : ''}" data-action="goto" data-id="${n.id}"><span class="ico">${n.icon}</span><span class="lbl">${n.label}</span></button>`
    ).join('');
    // The race/explore *hubs* use the same view ids as the live game. Only go
    // immersive when the matching 3D mode is actually running.
    const immersive = (this.view === 'race' && this.game.mode === 'race') || (this.view === 'explore' && this.game.mode === 'explore');
    $('#bottomnav').classList.toggle('hidden', immersive);
    $('#topbar').classList.toggle('hidden', immersive);
  }

  showChrome(show) {
    $('#topbar').classList.toggle('hidden', !show);
    $('#bottomnav').classList.toggle('hidden', !show || ['race', 'explore'].includes(this.view));
  }

  // ── routing ───────────────────────────────────────────────────────────────
  goto(view) {
    sfx('click');
    if (this.game.mode === 'race' && !this.game.race?.ended) { this.closeResults(); }
    this.view = view;
    this.closeResults();
    this.hideHud();
    if (view === 'menu') { this.game.showMenu(); this.renderMenu(); }
    else if (view === 'race') { this.game.showMenu(); this.renderRaceHub(); }
    else if (view === 'hangar') { this.dragonId = Save.S().selected; this.game.showHangar(this.dragonId); this.renderHangar(); }
    else if (view === 'village') { this.game.showVillage(); this.renderVillage(); }
    else if (view === 'explore') { this.game.showMenu(); this.renderExploreHub(); }
    else if (view === 'shop') { this.game.showHangar(Save.S().selected); this.renderShop(); }
    this.updateChrome();
    $('#screen').scrollTop = 0;
  }

  setScreen(html, scrollable = true) {
    const sc = $('#screen');
    sc.className = 'screen' + (scrollable ? '' : '');
    sc.dataset.view = this.view;
    sc.innerHTML = html;
    sc.scrollTop = 0;
  }

  // ── MENU ─────────────────────────────────────────────────────────────────
  renderMenu() {
    this.view = 'menu';
    const s = this.S;
    const sel = DRAGON_MAP[s.selected];
    const d = s.dragons[s.selected];
    const dailies = this.dailyList();
    const seasonPct = Math.min(100, (s.season.xp / this.seasonGoal()) * 100);
    const solsticeOwned = !!s.dragons.solstice;
    const activeDragon = sel ? `
      <button class="active-dragon-strip ui-hit" data-action="goto" data-id="hangar">
        <img src="${this.thumb(sel)}" alt="${sel.name}" />
        <div class="strip-meta"><b>${sel.name}</b><span>Lv ${d?.level || 1} · ${RARITIES[sel.rarity].name} · ${d?.bondLevel ? Save.bondLevelName(d.bondLevel) : 'Newly met'}</span></div>
        <span style="margin-left:auto;font-size:10px;color:var(--gold)">Roost ›</span>
      </button>` : '';
    this.setScreen(`
      <div class="menu-screen fade-in">
        <div class="menu-hero">
          <div class="brand-line">
            <div class="brand-crest crest">${CREST}</div>
            <div>
              <h1 class="logo-main">DRAGON <em>RUSH</em></h1>
              <div class="logo-tag">Race of Legends</div>
            </div>
          </div>
          <p class="menu-blurb">The skies of <b>Aetheria</b> are calling. Raise your dragon, master the winds, and race for the crown of legends across six wild realms.</p>
          <div class="hero-actions">
            <button class="btn btn-primary btn-lg" data-action="quick-race"><span class="btn-ico">⚑</span><span>Ride Now<small class="sub">QUICK RACE</small></span></button>
            <button class="btn btn-ghost btn-lg" data-action="goto" data-id="race"><span class="btn-ico">♛</span>Championships</button>
          </div>
          ${activeDragon}
        </div>
        <div class="menu-cards">
          <div class="card event-card">
            <div class="card-head"><span class="card-kicker">Seasonal Event</span><span class="card-kicker" style="color:#ffb08c">● LIVE</span></div>
            <div class="event-banner">
              <div class="event-orb">✦</div>
              <div><div class="event-name">Skyfire Festival</div><div class="event-sub">Gather embers · unlock Solstice</div></div>
            </div>
            <div class="bar"><i style="width:${solsticeOwned ? 100 : seasonPct}%"></i></div>
            <div class="bar-label"><span>${solsticeOwned ? 'Solstice joined your roost' : `${Math.min(s.season.xp, this.seasonGoal())} / ${this.seasonGoal()} festival embers`}</span><span>${solsticeOwned ? '✓' : '19d left'}</span></div>
            <div style="display:flex;gap:7px;margin-top:11px">
              ${solsticeOwned
                ? `<button class="btn btn-sm btn-ghost" data-action="goto" data-id="hangar" style="flex:1">View Solstice</button>`
                : `<button class="btn btn-sm btn-primary" data-action="start-event" style="flex:1" ${s.season.xp >= this.seasonGoal() ? 'disabled' : ''}>Skyfire Trial</button>
                   <button class="btn btn-sm btn-ghost" data-action="claim-season" ${s.season.xp >= this.seasonGoal() ? '' : 'disabled'} style="flex:1">${s.season.xp >= this.seasonGoal() ? 'Claim dragon' : 'Locked'}</button>`}
            </div>
          </div>
          <div class="card dailies-card">
            <div class="card-head"><span class="card-title">Daily Sky Trials</span><span class="card-kicker">${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></div>
            <ul class="daily-list">
              ${dailies.map(ch => {
                const done = Save.dailyDone(ch);
                const claimed = this.S.dailies.claimed.includes(ch.id);
                const prog = Math.min(ch.goal, this.S.dailies.progress[ch.stat] || 0);
                return `<li class="daily-item">
                  <span class="daily-icon">${ch.icon}</span>
                  <span class="daily-text">${ch.text}<small>${prog} / ${ch.goal} · +${ch.coins} ◈</small></span>
                  <button class="daily-claim ${claimed ? 'done' : done ? 'ready' : ''}" data-action="claim-daily" data-id="${ch.id}" ${claimed || !done ? 'disabled' : ''}>${claimed ? '✓' : done ? 'Claim' : `${prog}/${ch.goal}`}</button>
                </li>`;
              }).join('')}
            </ul>
          </div>
        </div>
      </div>`);
    this.updateChrome();
  }

  startQuickRace() {
    this.quickRace(this.trackId || 'hearthfall', 'race');
  }

  // ── RACE HUB ─────────────────────────────────────────────────────────────
  renderRaceHub() {
    this.view = 'race';
    const mode = MODE_MAP[this.modeId] || MODE_MAP.race;
    const track = TRACK_MAP[this.trackId] || TRACKS[0];
    const unlocked = this.S.unlockedTracks.includes(track.id);
    const sel = DRAGON_MAP[this.S.selected];
    const ds = this.S.dragons[this.S.selected];
    const league = LEAGUES.find(l => l.id === this.leagueId) || LEAGUES[0];
    const leaderboard = this.getLeaderboard(track);
    const dailies = this.dailyList();
    this.setScreen(`
      <div class="fade-in">
        <div class="screen-head">
          <div>
            <div class="eyebrow">The Racing Circuit</div>
            <h1 class="screen-title">Choose your sky</h1>
            <p class="screen-sub">Five ways to fly. Six realms. One crown. Pick a course, pick a mode, and let the wind decide.</p>
          </div>
          <button class="back-btn" data-action="goto" data-id="menu">⌂ Hearthfall</button>
        </div>
        <div class="hub-grid">
          <div class="hub-main">
            <div class="mode-pills">
              ${MODES.map(m => `<button class="mode-pill ${this.modeId === m.id ? 'active' : ''}" data-action="select-mode" data-id="${m.id}"><span class="ico">${m.icon}</span>${m.name}</button>`).join('')}
            </div>
            <div class="track-grid">
              ${TRACKS.map(t => {
                const isUnlocked = this.S.unlockedTracks.includes(t.id);
                const best = this.S.bestTimes[t.id];
                const needLeague = LEAGUES.find(l => l.rewards?.track === t.id);
                return `<button class="track-card ${this.trackId === t.id ? 'selected' : ''} ${!isUnlocked ? 'locked' : ''}" data-action="select-track" data-id="${t.id}"
                  style="--tc1:${t.palette.skyTop};--tc2:${t.palette.rock2}">
                  <div class="track-top"><span class="track-icon">${t.icon}</span><span class="track-badge">${t.region}</span></div>
                  <div class="track-bottom">
                    <div><div class="track-name">${t.name}</div><div class="track-region">${t.laps} laps · ${(t.length / 1000).toFixed(1)}k</div></div>
                    <div style="text-align:right"><div class="diffs">${[1,2,3,4,5].map(i => `<i class="${i <= t.difficulty ? 'on' : ''}"></i>`).join('')}</div><div class="track-best">${best ? 'PB ' + fmtTime(best) : 'No time'}</div></div>
                  </div>
                  ${!isUnlocked ? `<div class="track-lock"><span class="big">🔒</span><span>${needLeague ? 'Win ' + needLeague.name : 'Locked'}</span></div>` : ''}
                </button>`;
              }).join('')}
            </div>
            <div class="league-list">
              <div class="section-label"><h3>Championships</h3><span>${LEAGUES.filter(l => this.S.leagues[l.id]?.completed).length} / ${LEAGUES.length} conquered</span></div>
              ${LEAGUES.map(l => {
                const prog = Save.leagueProgress(l.id);
                const open = Save.leagueUnlocked(l);
                return `<div class="league-card ${open ? '' : 'locked'}">
                  <div class="league-emblem">${l.icon}</div>
                  <div class="league-info"><b>${l.name}</b><span>${open ? (prog.completed ? '✓ Completed · ' + l.desc : l.desc) : `Win ${LEAGUES[l.tier - 2]?.name || 'the previous league'} to unlock`}</span></div>
                  <div style="text-align:right"><div class="league-progress">${prog.completed ? 'CHAMPION' : `TIER ${l.tier}`}</div>
                  <button class="btn btn-sm ${open ? 'btn-primary' : 'btn-ghost'}" data-action="pick-league" data-id="${l.id}" ${open ? '' : 'disabled'} style="margin-top:4px">${prog.completed ? 'Re-run' : 'Enter'}</button></div>
                </div>`;
              }).join('')}
            </div>
            <div class="section-divider"></div>
            <div class="section-label"><h3>Today's Sky Trials</h3><span>Reset daily</span></div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px" class="daily-hub">
              ${dailies.map(ch => {
                const done = Save.dailyDone(ch);
                const claimed = this.S.dailies.claimed.includes(ch.id);
                const prog = Math.min(ch.goal, this.S.dailies.progress[ch.stat] || 0);
                return `<div class="card" style="padding:11px"><div class="card-kicker">${ch.icon} ${ch.text}</div>
                  <div class="bar" style="margin:8px 0 6px"><i style="width:${(prog / ch.goal) * 100}%"></i></div>
                  <div class="bar-label"><span>${prog}/${ch.goal}</span><span>+${ch.coins} ◈</span></div>
                  <button class="daily-claim ${claimed ? 'done' : done ? 'ready' : ''}" style="margin-top:8px;width:100%" data-action="claim-daily" data-id="${ch.id}" ${claimed || !done ? 'disabled' : ''}>${claimed ? 'Claimed' : done ? 'Claim reward' : 'In progress'}</button>
                </div>`;
              }).join('')}
            </div>
          </div>
          <aside class="race-side">
            <div class="side-panel">
              <div class="track-detail-region">${track.region}</div>
              <h2 class="track-detail-name">${track.name}</h2>
              <div class="track-detail-desc">${track.desc}</div>
              <div class="mode-desc"><b>${mode.name}</b> — ${mode.desc}</div>
              <div class="side-dragon">
                <img src="${this.thumb(sel)}" alt="" />
                <div><div class="nm">${sel.name}</div><div class="st">Speed ${Save.statsOf(sel.id).topSpeed.toFixed(0)} · Handling ${Save.statsOf(sel.id).turn.toFixed(1)}</div></div>
                <span class="lvl">Lv ${ds?.level || 1}</span>
              </div>
              <div class="entry-row"><span>Entry fee</span><b>${this.modeId === 'championship' ? (league.entry > 0 ? fmt(league.entry) + ' ◈' : 'Free') : 'Free'}</b></div>
              <div class="entry-row"><span>${this.modeId === 'championship' ? 'League' : 'Best time'}</span><b>${this.modeId === 'championship' ? league.name : (this.S.bestTimes[track.id] ? fmtTime(this.S.bestTimes[track.id]) : '—')}</b></div>
              ${this.modeId === 'championship' ? `<div class="champ-strip"><span class="ico">${league.icon}</span><div>3 races · points decide the champion. <b>${league.rewards.coins}◈ + ${league.rewards.gems}◆</b> for champions.</div></div>` : ''}
              <button class="btn btn-primary btn-block btn-lg" data-action="${this.modeId === 'championship' ? 'enter-champ' : 'start-selected'}" data-id="${this.modeId === 'championship' ? league.id : track.id}" ${!unlocked && this.modeId !== 'championship' ? 'disabled' : ''}>
                <span class="btn-ico">${this.modeId === 'championship' ? '♛' : mode.icon}</span>${this.modeId === 'championship' ? 'Enter Championship' : 'Start ' + mode.name}
              </button>
              ${!unlocked && this.modeId !== 'championship' ? `<div style="font-size:10px;color:#ffb4be;text-align:center;margin-top:7px">Win the ${LEAGUES.find(l => l.rewards?.track === track.id)?.name || 'league'} to open this course.</div>` : ''}
            </div>
            <div class="side-panel">
              <div class="section-label"><h3>Sky Legends</h3><span>${track.name}</span></div>
              <div class="leaderboard-mini">
                ${leaderboard.map(r => `<div class="leader-row ${r.me ? 'me' : ''}"><span class="pos">${r.pos}</span><span class="nm">${r.name}</span><span class="tm">${fmtTime(r.time)}</span></div>`).join('')}
              </div>
            </div>
            ${this.champ ? `<div class="side-panel"><div class="card-kicker">Championship in progress</div><div style="font-family:Cinzel;font-size:15px;margin:4px 0">${this.champ.league.name}</div><div class="bar"><i style="width:${(this.champ.round / 3) * 100}%"></i></div><div class="bar-label"><span>Round ${Math.min(this.champ.round + 1, 3)} of 3</span><span>${this.champ.playerPoints} pts</span></div></div>` : ''}
          </aside>
        </div>
      </div>`);
    this.updateChrome();
  }

  getLeaderboard(track) {
    const seed = [...track.id].reduce((a, c) => a + c.charCodeAt(0), 0);
    const base = (track.length / 64) * track.laps;
    const names = RIVAL_NAMES.slice(0).sort((a, b) => ((seed * a.length) % 17) - ((seed * b.length) % 17));
    const rows = [];
    for (let i = 0; i < 4; i++) {
      rows.push({ name: names[i % names.length], time: base * (0.92 + ((seed + i * 37) % 23) / 100) });
    }
    const pb = this.S.bestTimes[track.id];
    if (pb) rows.push({ name: this.S.riderName, time: pb, me: true });
    else rows.push({ name: this.S.riderName, time: null, me: true });
    rows.sort((a, b) => (a.time ?? 9999) - (b.time ?? 9999));
    return rows.slice(0, 5).map((r, i) => ({ ...r, pos: i + 1, time: r.time ?? 9999, name: r.time == null ? r.name + ' (you)' : r.name }));
  }

  // ── champion flow helpers ─────────────────────────────────────────────────
  startChampionship(leagueId) {
    const league = LEAGUES.find(l => l.id === leagueId);
    if (!league) return;
    if (!Save.leagueUnlocked(league)) { this.toast('Win the previous league first.', '', ''); return; }
    if (this.S.level < 1) return;
    if (this.S.coins < league.entry) { this.toast('Not enough coins for the entry fee.', `${league.entry} required`, ''); return; }
    this.S.coins -= league.entry;
    Save.save();
    this.champ = {
      league, round: 0, points: {}, playerPoints: 0, results: [], finalized: false,
      lastProcessed: -1,
    };
    this.updateChrome();
    this.startLeagueRound();
  }

  startLeagueRound() {
    const c = this.champ;
    if (!c) return;
    const trackId = c.league.tracks[Math.min(c.round, c.league.tracks.length - 1)];
    this.lastRaceConfig = { trackId, mode: 'championship', league: c.league, round: c.round + 1 };
    this.launchRace(trackId, 'championship', c.league, c.round + 1);
  }

  processChampionshipResults(results) {
    const c = this.champ;
    if (!c || c.lastProcessed === c.round) return;
    c.lastProcessed = c.round;
    const pts = [10, 8, 6, 5, 4, 3];
    results.standings.forEach((s, i) => {
      c.points[s.name] = (c.points[s.name] || 0) + (pts[i] || 0);
    });
    c.playerPoints = c.points[this.S.riderName] || 0;
    c.results.push(results);
    c.round++;
  }

  finalizeChampionship() {
    const c = this.champ;
    if (!c || c.finalized) return null;
    c.finalized = true;
    const ordered = Object.entries(c.points).sort((a, b) => b[1] - a[1]);
    const playerPlace = ordered.findIndex(([n]) => n === this.S.riderName) + 1;
    const league = c.league;
    const champ = playerPlace === 1;
    const rewards = { coins: Math.round(league.rewards.coins * (champ ? 1 : 0.45)), gems: champ ? league.rewards.gems : Math.round(league.rewards.gems / 2), dragon: null, track: null, champ, playerPlace, ordered };
    Save.awardCoins(rewards.coins);
    Save.awardGems(rewards.gems);
    Save.addRiderXp(320);
    if (champ && league.rewards.track) { if (Save.unlockTrack(league.rewards.track)) rewards.track = TRACK_MAP[league.rewards.track]; }
    if (champ && league.rewards.dragon) {
      if (Save.addDragon(league.rewards.dragon, 3)) rewards.dragon = DRAGON_MAP[league.rewards.dragon];
      else { Save.awardGems(10); rewards.duplicate = true; }
    }
    if (champ && league.rewards.bonusDragon) {
      if (Save.addDragon(league.rewards.bonusDragon, 5)) rewards.bonusDragon = DRAGON_MAP[league.rewards.bonusDragon];
      else { Save.awardGems(14); }
    }
    Save.addDragonXp(this.S.selected, 260);
    const progress = Save.leagueProgress(league.id);
    Save.saveLeague(league.id, {
      completed: champ || !!progress.completed,
      wins: champ ? (progress.wins || 0) + 1 : (progress.wins || 0),
      bestPos: Math.min(progress.bestPos || 9, playerPlace), points: c.playerPoints,
    });
    // Conquer every league and the Dragon's Crown is yours — along with the
    // mythical Aetherion, whose unlock condition names exactly that feat.
    if (LEAGUES.every(l => Save.leagueProgress(l.id).completed) && Save.addDragon('aetherion', 6)) {
      rewards.crownDragon = DRAGON_MAP.aetherion;
    }
    Save.save();
    this.updateChrome();
    return { ...rewards, league, standings: ordered };
  }

  // ── starting races ───────────────────────────────────────────────────────
  launchRace(trackId, mode, league = null, round = 1) {
    unlockAudio();
    this.closeResults();
    this.closeModal();
    this.view = 'race';
    this.updateChrome();
    this.showChrome(false);
    $('#screen').innerHTML = '';
    $('#screen').style.display = 'none';
    this.buildHud('race');
    this.game.showRace({ trackId, mode, league, round });
  }

  quickRace(trackId, mode = 'race') {
    if (!this.S.unlockedTracks.includes(trackId)) { this.toast('That course is still locked.', '', ''); return; }
    this.lastRaceConfig = { trackId, mode };
    this.launchRace(trackId, mode);
  }

  startSelectedRace() {
    if (this.modeId === 'championship') { this.startChampionship(this.leagueId); return; }
    this.quickRace(this.trackId, this.modeId);
  }

  startEventRace() {
    this.isEventRace = true;
    this.lastRaceConfig = { trackId: 'hearthfall', mode: 'race' };
    this.launchRace('hearthfall', 'race');
    this.toast('Skyfire Trial begun!', 'Double festival embers await', 'good');
  }

  // ── race HUD ──────────────────────────────────────────────────────────────
  buildHud(mode) {
    this.hudMode = mode;
    const hud = $('#hud');
    hud.classList.remove('hidden');
    hud.classList.toggle('left-handed', !!this.S.settings.leftHand);
    if (mode === 'race') {
      hud.innerHTML = `
        <div class="hud-left" id="hud-left">
          <div class="hud-chip" id="mode-chip">⚑ STANDARD</div>
          <div class="hud-chip" id="extra-chip" style="display:none"></div>
          <div class="hud-chip" id="gate-chip">◎ Next ring <b id="gate-dist">—</b></div>
        </div>
        <div class="hud-top">
          <div class="hud-pos"><span class="n" id="hud-pos">1</span><span class="o" id="hud-pos-total">/6</span></div>
          <div class="hud-lapbox"><div class="lap" id="hud-lap">LAP 1/3</div><div class="timer" id="hud-timer">0:00.00</div></div>
        </div>
        <div class="hud-right">
          <div class="minimap-wrap"><canvas id="minimap" width="256" height="256"></canvas><span class="minimap-label">Course</span></div>
          <button class="pause-btn" data-action="pause-race">❚❚</button>
        </div>
        <div class="hud-notices" id="hud-notices"></div>
        <div class="hud-hint" id="hud-hint">Hold the ring · drag the joystick to steer · boost to win</div>
        <div class="hud-bottom">
          <div class="joystick" id="joystick"><div class="joy-knob" id="joy-knob"></div><span class="joy-hint">steer</span></div>
          <div class="hud-speed">
            <div class="speed-line"><span class="speed-val" id="speed-val">0</span><span class="speed-unit">KM/H</span><span class="boost-tag" id="boost-tag">BOOST</span></div>
            <div class="stamina-row"><span class="lab">WIND</span><div class="stamina" id="stamina-wrap"><i id="stamina-bar" style="width:100%"></i></div></div>
          </div>
          <div class="action-cluster">
            <button class="action-btn boost" id="boost-btn"><span class="ico">↯</span><span class="lbl">Boost</span></button>
            <div style="display:flex;flex-direction:column;gap:7px;align-items:flex-end">
              <button class="action-btn ability ready" id="ability-btn" data-action="use-ability"><span class="ico">✦</span><span class="lbl" id="ability-lbl">Ability</span><div class="cool"></div><div class="cd-text" id="ability-cd"></div></button>
              <div style="display:flex;gap:7px">
                <button class="action-btn brake" id="brake-btn">⏶</button>
                <button class="action-btn maneuver" data-action="use-maneuver"><span class="ico">⟲</span><span class="lbl">Roll</span><span class="mc" id="maneuver-cd"></span></button>
              </div>
            </div>
          </div>
        </div>
        <div class="countdown hidden" id="countdown"></div>
        <div class="hud-flash" id="hud-flash"></div>
        <div class="boost-vignette" id="boost-vignette"></div>`;
      this.bindHudControls();
      this.drawMinimap();
      const modeNames = { race: '⚑ STANDARD', trial: '⏱ TIME TRIAL', elimination: '☠ ELIMINATION', checkpoint: '◎ CHECKPOINT', championship: '♛ CHAMPIONSHIP' };
      $('#mode-chip').textContent = modeNames[mode] || '⚑ RACE';
      $('#hud-hint').style.display = 'block';
      setTimeout(() => { const h = $('#hud-hint'); if (h) h.style.display = 'none'; }, 6500);
    } else {
      hud.innerHTML = `
        <div class="hud-left">
          <div class="hud-chip">◈ SKY SHARDS <b id="ex-shards">0 / 12</b></div>
          <div class="hud-chip" id="ex-lair">✦ Hidden lair <b id="ex-lair-dist">—</b></div>
        </div>
        <div class="hud-top"><div class="hud-lapbox"><div class="lap">FREE FLIGHT</div><div class="timer" style="font-size:11px" id="ex-zone">Hearthfall Isle</div></div></div>
        <div class="explore-exit">
          <button class="pause-btn" data-action="pause-race">❚❚</button>
          <button class="pause-btn" data-action="exit-explore">✕</button>
        </div>
        <div class="hud-notices" id="hud-notices"></div>
        <div class="hud-hint" id="hud-hint">Find sky shards · follow the light beams · discover the hidden dragon</div>
        <div class="hud-bottom">
          <div class="joystick" id="joystick"><div class="joy-knob" id="joy-knob"></div><span class="joy-hint">steer</span></div>
          <div class="hud-speed">
            <div class="speed-line"><span class="speed-val" id="speed-val">0</span><span class="speed-unit">KM/H</span><span class="boost-tag" id="boost-tag">BOOST</span></div>
            <div class="stamina-row"><span class="lab">WIND</span><div class="stamina" id="stamina-wrap"><i id="stamina-bar" style="width:100%"></i></div></div>
          </div>
          <div class="action-cluster">
            <button class="action-btn boost" id="boost-btn"><span class="ico">↯</span><span class="lbl">Boost</span></button>
            <div style="display:flex;flex-direction:column;gap:7px;align-items:flex-end">
              <button class="action-btn ability ready" id="ability-btn" data-action="use-ability"><span class="ico">✦</span><span class="lbl" id="ability-lbl">Ability</span><div class="cool"></div><div class="cd-text" id="ability-cd"></div></button>
              <button class="action-btn maneuver" data-action="use-maneuver"><span class="ico">⟲</span><span class="lbl">Roll</span><span class="mc" id="maneuver-cd"></span></button>
            </div>
          </div>
        </div>
        <div id="explore-prompt-slot"></div>
        <div class="hud-flash" id="hud-flash"></div>
        <div class="boost-vignette" id="boost-vignette"></div>`;
      this.bindHudControls();
      const zone = EXPLORE_ZONES.find(z => z.id === this.game.explore?.zoneId);
      if (zone) $('#ex-zone').textContent = zone.name;
      setTimeout(() => { const h = $('#hud-hint'); if (h) h.style.display = 'none'; }, 7000);
    }
    this.showChrome(false);
    $('#screen').style.display = 'none';
  }

  hideHud() {
    $('#hud').classList.add('hidden');
    $('#hud').innerHTML = '';
    $('#screen').style.display = '';
    this.hudMode = null;
  }

  bindHudControls() {
    const joy = $('#joystick');
    const knob = $('#joy-knob');
    if (joy && knob) {
      let active = false, id = null;
      const reset = () => {
        active = false; id = null; this.game.setSteer(0, 0);
        knob.style.transform = 'translate(-50%, -50%)';
      };
      const move = (e) => {
        const r = joy.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        let dx = e.clientX - cx, dy = e.clientY - cy;
        const max = r.width / 2 - 26;
        const d = Math.hypot(dx, dy);
        if (d > max) { dx = dx / d * max; dy = dy / d * max; }
        this.game.setSteer(dx / max, -dy / max);
        knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
      };
      joy.addEventListener('pointerdown', (e) => {
        e.preventDefault(); e.stopPropagation();
        active = true; id = e.pointerId; joy.setPointerCapture(e.pointerId); move(e);
      });
      joy.addEventListener('pointermove', (e) => { if (active && e.pointerId === id) { e.preventDefault(); move(e); } });
      ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => joy.addEventListener(ev, (e) => { if (e.pointerId === id || ev === 'lostpointercapture') reset(); }));
    }
    const boost = $('#boost-btn');
    if (boost) {
      const on = (e) => { e.preventDefault(); e.stopPropagation(); this.game.setBoost(true); boost.classList.add('pressed', 'on'); };
      const off = (e) => { this.game.setBoost(false); boost.classList.remove('pressed', 'on'); };
      boost.addEventListener('pointerdown', (e) => { on(e); boost.setPointerCapture?.(e.pointerId); });
      boost.addEventListener('pointerup', off);
      boost.addEventListener('pointercancel', off);
      boost.addEventListener('pointerleave', off);
      boost.addEventListener('contextmenu', e => e.preventDefault());
    }
    const brake = $('#brake-btn');
    if (brake) {
      brake.addEventListener('pointerdown', (e) => { e.preventDefault(); this.game.setBrake(true); brake.classList.add('pressed'); });
      ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => brake.addEventListener(ev, () => { this.game.setBrake(false); brake.classList.remove('pressed'); }));
    }
    // Ability + manoeuvre use the delegated [data-action] handler so they fire
    // once per tap on both touch and pointer devices.
  }

  onRaceStart(d) {
    this.buildHud('race');
    if (d.mode === 'championship' && this.champ) {
      this.hudNotice(`Round ${d.round} · ${d.track.name}`, 'lap');
    }
    this.hudNotice(d.mode === 'championship' ? `${this.champ?.league.name || 'Championship'} — Go!` : d.track.name, 'gate');
  }

  onHud(d) {
    if ($('#hud').classList.contains('hidden')) return;
    this.hudData = d;
    if (d.mode === 'explore') {
      const sh = $('#ex-shards'); if (sh) sh.textContent = `${d.shards} / ${d.totalShards}`;
      const ld = $('#ex-lair-dist');
      if (ld) {
        const el = this.game.explore?.lairDist;
        ld.textContent = el ? `${Math.round(el)}m` : 'found';
      }
      if (d.nearLair && !$('#explore-prompt-slot')?.children.length) {
        const dragon = DRAGON_MAP[this.game.world?.zone?.hidden];
        $('#explore-prompt-slot').innerHTML = `<div class="explore-prompt"><span class="ep-icon">✦</span><div class="ep-text"><b>Hidden Lair</b><span>${dragon?.name || 'A wild dragon'} stirs within…</span></div><button class="btn btn-primary btn-sm" data-action="discover-lair">Discover</button></div>`;
      } else if (!d.nearLair && $('#explore-prompt-slot')?.children.length) {
        $('#explore-prompt-slot').innerHTML = '';
      }
      if ($('#ex-lair')) $('#ex-lair').style.display = this.game.explore?.lair?.visible ? '' : 'none';
    } else {
      const pos = $('#hud-pos'); if (pos) pos.textContent = d.position;
      const total = $('#hud-pos-total'); if (total) total.textContent = '/' + d.total;
      const lap = $('#hud-lap'); if (lap) lap.textContent = d.mode === 'checkpoint' ? `RINGS ${d.score}` : `LAP ${d.lap}/${d.totalLaps}`;
      const timer = $('#hud-timer'); if (timer) timer.textContent = fmtTime(d.time);
      const speed = $('#speed-val'); if (speed) speed.textContent = d.speed;
      const sb = $('#stamina-bar'); if (sb) sb.style.width = (d.stamina * 100).toFixed(1) + '%';
      $('#stamina-wrap')?.classList.toggle('boosting', !!d.boosting);
      $('#boost-tag')?.classList.toggle('on', !!d.boosting);
      $('#boost-btn')?.classList.toggle('on', !!d.boosting);
      $('#boost-vignette')?.classList.toggle('active', !!d.boosting);
      const gd = $('#gate-dist'); if (gd) gd.textContent = `${Math.round(d.gateDist)}m`;
      const ab = $('#ability-btn');
      if (ab) {
        const ready = d.abilityCd <= 0;
        ab.classList.toggle('ready', ready);
        ab.querySelector('.cool').style.setProperty('--cd', `${d.abilityCd > 0 ? (d.abilityCd / d.abilityMax) * 100 : 0}%`);
        const cdText = $('#ability-cd');
        if (cdText) cdText.textContent = d.abilityCd > 0 ? Math.ceil(d.abilityCd) : '';
        const lbl = $('#ability-lbl'); if (lbl) lbl.textContent = ready ? d.abilityName.split(' ')[0] : '';
      }
      const mv = $('[data-action="use-maneuver"]');
      if (mv) {
        const cooling = d.maneuverCd > 0.05;
        mv.classList.toggle('cooling', cooling);
        const mcd = $('#maneuver-cd');
        if (mcd) mcd.textContent = cooling ? Math.ceil(d.maneuverCd) : '';
      }
      const extra = $('#extra-chip');
      if (extra) {
        if (d.mode === 'elimination') { extra.style.display = ''; extra.className = 'hud-chip ' + (d.elimTimer < 6 ? 'warn' : ''); extra.innerHTML = `☠ Elimination in <b>${Math.ceil(d.elimTimer)}s</b>`; }
        else if (d.mode === 'checkpoint') { extra.style.display = ''; extra.className = 'hud-chip ' + (d.checkTimer < 11 ? 'warn' : ''); extra.innerHTML = `⏱ Time <b>${Math.ceil(d.checkTimer)}s</b> · +4.5s per ring`; }
        else extra.style.display = 'none';
      }
      const gateChip = $('#gate-chip'); if (gateChip) gateChip.style.display = d.mode === 'checkpoint' ? 'none' : '';
      this.drawMinimap();
    }
  }

  hudNotice(text, kind = '') {
    const n = $('#hud-notices');
    if (!n) return;
    const el = document.createElement('div');
    el.className = 'notice ' + kind;
    el.textContent = text;
    n.appendChild(el);
    setTimeout(() => el.remove(), 2700);
  }

  onCountdown(d) {
    const box = $('#countdown');
    if (!box) return;
    box.classList.remove('hidden');
    if (d.value > 0) {
      box.innerHTML = `<div class="num">${d.value}</div>`;
    } else {
      box.innerHTML = `<div class="num small">RIDE!</div>`;
      setTimeout(() => box.classList.add('hidden'), 950);
    }
  }

  drawMinimap() {
    const c = $('#minimap');
    if (!c || !this.hudData) return;
    const ctx = c.getContext('2d');
    const w = c.width, h = c.height;
    ctx.clearRect(0, 0, w, h);
    // background
    const bg = ctx.createRadialGradient(w * 0.5, h * 0.45, 10, w * 0.5, h * 0.5, w * 0.55);
    bg.addColorStop(0, 'rgba(20,48,57,.85)'); bg.addColorStop(1, 'rgba(4,13,19,.9)');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    const outline = this.game.raceOutline;
    if (!outline) return;
    const pad = 34, size = w - pad * 2;
    const map = ([x, z]) => [pad + x * size, pad + z * size];
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.beginPath();
    outline.forEach((pt, i) => { const [x, y] = map(pt); i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,209,102,.22)'; ctx.lineWidth = 16; ctx.stroke();
    ctx.strokeStyle = 'rgba(255,224,160,.85)'; ctx.lineWidth = 3; ctx.stroke();
    // checkpoint dots
    const gateCount = this.game.world?.gates?.length || 20;
    for (let i = 0; i < 20; i += 5) {
      const p = this.game.world.curve.getPointAt(i / 20);
      const [x, y] = map([(p.x - this.game.race.bounds.minX) / this.game.race.bounds.span, (p.z - this.game.race.bounds.minZ) / this.game.race.bounds.span]);
      ctx.beginPath(); ctx.arc(x, y, 4, 0, 7); ctx.fillStyle = 'rgba(111,232,212,.7)'; ctx.fill();
    }
    // AI
    (this.hudData.minimap || []).forEach(r => {
      if (r.eliminated) return;
      ctx.beginPath(); ctx.arc(pad + r.x * size, pad + r.z * size, 4.5, 0, 7);
      ctx.fillStyle = 'rgba(255,123,169,.9)'; ctx.fill();
    });
    // player
    const px = pad + this.hudData.player.x * size;
    const py = pad + this.hudData.player.z * size;
    const yaw = this.game.flight.yaw;
    ctx.save(); ctx.translate(px, py); ctx.rotate(-yaw);
    ctx.beginPath(); ctx.moveTo(0, -9); ctx.lineTo(6, 7); ctx.lineTo(0, 3.5); ctx.lineTo(-6, 7); ctx.closePath();
    ctx.fillStyle = '#ffe6a0'; ctx.shadowColor = '#ffd166'; ctx.shadowBlur = 12; ctx.fill(); ctx.restore();
    // border
    ctx.beginPath(); ctx.arc(w / 2, h / 2, w / 2 - 4, 0, 7); ctx.strokeStyle = 'rgba(255,209,102,.18)'; ctx.lineWidth = 5; ctx.stroke();
  }

  flashScreen(kind) {
    const f = $('#hud-flash');
    if (!f) return;
    f.className = 'hud-flash ' + kind;
    f.style.animation = 'none';
    void f.offsetWidth;
    f.style.animation = '';
    clearTimeout(this._flashT);
    this._flashT = setTimeout(() => { f.className = 'hud-flash'; }, kind === 'hit' ? 450 : 320);
  }

  onRaceEnd(results) {
    if (this.hudMode === 'race') {
      // event season progress
      let seasonGain = Math.round(40 + results.position * 7 + (this.isEventRace ? 80 : 0));
      if (this.isEventRace) {
        Save.awardCoins(Math.round(results.coins * 0.6));
        results.coins += Math.round(results.coins * 0.6);
        results.eventBonus = true;
      }
      this.S.season.xp += seasonGain;
      Save.save();
      this.isEventRace = false;
      if (this.champ) this.processChampionshipResults(results);
      setTimeout(() => { this.renderResults(results); }, 850);
    }
    this.updateChrome();
  }

  closeResults() {
    this.resultsEl?.remove();
    this.resultsEl = null;
  }

  renderResults(r) {
    this.closeResults();
    this.hideHud();
    this.showChrome(false);
    const modeName = MODE_MAP[r.mode]?.name || (r.mode === 'championship' ? 'Championship' : 'Race');
    const place = r.position === 1 ? '1ST' : r.position === 2 ? '2ND' : r.position === 3 ? '3RD' : `${r.position}TH`;
    const won = r.mode === 'checkpoint' ? r.score >= 12 : r.mode === 'trial' ? !!r.newBest : r.position === 1;
    const confetti = won ? Array.from({ length: 22 }, (_, i) => {
      const colors = ['#ffd166', '#6fe8d4', '#ff7ba9', '#b18aff', '#fff4dc'];
      return `<i style="left:${(i * 37) % 100}%;background:${colors[i % colors.length]};animation-delay:${(i % 7) * .18}s;animation-duration:${2.2 + (i % 5) * .3}s"></i>`;
    }).join('') : '';
    const standings = (r.standings || []).map(s => `<div class="standing-row ${s.isPlayer ? 'me' : ''}">
      <span class="sp">${s.pos}</span><span class="nm">${s.name}${s.isPlayer ? ' · you' : ''}</span>
      <span class="gap">${s.eliminated ? '' : s.finished ? 'FIN' : ''}</span>
      <span class="out">${s.eliminated ? 'OUT' : ''}</span>
    </div>`).join('');
    const champTable = this.champ ? this.champTableHtml() : '';
    const isChamp = !!this.champ;
    const finalRound = isChamp && this.champ.round >= 3;
    this.resultsEl = document.createElement('div');
    this.resultsEl.className = 'results-wrap';
    this.resultsEl.innerHTML = `<div class="results">
      <div class="confetti">${confetti}</div>
      <div class="result-kicker">${isChamp ? `${this.champ.league.name} · ROUND ${Math.min(this.champ.round, 3)} OF 3` : modeName}</div>
      <div class="place-big ${won ? '' : 'lose'}">${r.mode === 'checkpoint' ? r.score + ' RINGS' : place}</div>
      <div class="result-title">${r.mode === 'checkpoint' ? (r.score >= 12 ? 'Skybound!' : 'Time called') : won ? (r.mode === 'trial' ? 'New sky record!' : 'Victory on the wind') : r.reason === 'eliminated' ? 'Eliminated' : r.mode === 'trial' ? 'Trial complete' : 'Race complete'}</div>
      <div class="result-sub">${r.trackName} · ${isChamp ? `Round ${r.round} of 3` : modeName}${r.newBest ? ' · new personal best!' : ''}</div>
      <div class="result-stats">
        <div class="rs"><div class="k">Time</div><div class="v gold">${fmtTime(r.time)}</div></div>
        <div class="rs"><div class="k">${r.mode === 'checkpoint' ? 'Rings' : 'Position'}</div><div class="v">${r.mode === 'checkpoint' ? r.score : r.position + '/' + r.total}</div></div>
        <div class="rs"><div class="k">Gates</div><div class="v">${r.gates}</div></div>
        <div class="rs"><div class="k">Best</div><div class="v">${fmtTime(r.best)}</div></div>
      </div>
      ${r.newBest ? `<div class="new-best">✦ Personal best recorded</div>` : ''}
      <div class="standing-list">${standings}</div>
      ${champTable}
      <div class="rewards-row">
        <div class="reward-chip">◈ +${fmt(r.coins)}</div>
        ${r.gems ? `<div class="reward-chip gem">◆ +${r.gems}</div>` : ''}
        <div class="reward-chip xp">✦ +${r.xp} dragon XP</div>
        ${r.eventBonus ? `<div class="reward-chip gem">✦ Skyfire bonus</div>` : ''}
      </div>
      <div class="results-actions">
        <button class="btn btn-primary" data-action="${finalRound ? 'finish-championship' : isChamp ? 'next-champ' : 'race-again'}">
          ${finalRound ? 'Championship results' : isChamp ? 'Next race ›' : 'Race again'}
        </button>
        <button class="btn btn-ghost" data-action="${isChamp ? 'quit-champ' : 'change-track'}">${isChamp ? 'Leave series' : 'Change course'}</button>
        ${!isChamp ? `<button class="btn btn-ghost" data-action="goto" data-id="menu">Home</button>` : ''}
      </div>
    </div>`;
    $('#ui').appendChild(this.resultsEl);
    if (won) sfx('win');
    this.updateChrome();
  }

  champTableHtml() {
    const c = this.champ;
    if (!c) return '';
    const rows = Object.entries(c.points).sort((a, b) => b[1] - a[1]).slice(0, 6);
    return `<div class="champ-table"><h4>Championship standings</h4>
      ${rows.map(([n, p], i) => `<div class="champ-row ${n === this.S.riderName ? 'me' : ''}"><span>${i + 1}</span><span>${n}</span><span>${p} pts</span></div>`).join('')}
    </div>`;
  }

  renderChampionshipFinal(data) {
    this.closeResults();
    this.hideHud();
    this.showChrome(false);
    const rows = data.standings.map(([n, p], i) => `<div class="standing-row ${n === this.S.riderName ? 'me' : ''}"><span class="sp">${i + 1}</span><span class="nm">${n}${n === this.S.riderName ? ' · you' : ''}</span><span></span><span class="gap">${p} pts</span></div>`).join('');
    const confetti = data.champ ? Array.from({ length: 30 }, (_, i) => {
      const colors = ['#ffd166', '#6fe8d4', '#ff7ba9', '#b18aff', '#fff4dc'];
      return `<i style="left:${(i * 29) % 100}%;background:${colors[i % colors.length]};animation-delay:${(i % 8) * .16}s;animation-duration:${2.4 + (i % 5) * .4}s"></i>`;
    }).join('') : '';
    this.resultsEl = document.createElement('div');
    this.resultsEl.className = 'results-wrap';
    this.resultsEl.innerHTML = `<div class="results">
      <div class="confetti">${confetti}</div>
      <div class="result-kicker">${data.league.name} · Final standings</div>
      <div class="place-big ${data.champ ? '' : 'lose'}">${data.champ ? 'CHAMPION' : 'FINISHED'}</div>
      <div class="result-title">${data.champ ? 'The sky remembers your name' : 'A hard-fought series'}</div>
      <div class="result-sub">${data.champ ? `You conquered the ${data.league.name}.` : `You placed ${ordinal(data.playerPlace)} of ${data.standings.length}. Win the series to take the crown and open the next league.`}</div>
      <div class="standing-list">${rows}</div>
      <div class="rewards-row">
        <div class="reward-chip">◈ +${fmt(data.coins)}</div>
        <div class="reward-chip gem">◆ +${data.gems}</div>
        ${data.dragon ? `<div class="reward-chip gem">✦ ${data.dragon.name} joined!</div>` : ''}
        ${data.bonusDragon ? `<div class="reward-chip gem">✦ ${data.bonusDragon.name} joined!</div>` : ''}
        ${data.crownDragon ? `<div class="reward-chip gem" style="border-color:var(--gold);color:var(--gold)">♛ ${data.crownDragon.name} — the Dragon’s Crown!</div>` : ''}
        ${data.track ? `<div class="reward-chip xp">⚑ ${data.track.name} unlocked</div>` : ''}
        ${data.duplicate ? `<div class="reward-chip gem">◆ Duplicate dragon → +10 gems</div>` : ''}
      </div>
      ${data.champ ? `<div class="new-best">✦ ${data.league.name} trophy earned</div>` : ''}
      <div class="results-actions">
        <button class="btn btn-primary" data-action="goto" data-id="hangar">${data.dragon || data.bonusDragon || data.crownDragon ? 'Meet ' + (data.dragon || data.bonusDragon || data.crownDragon).name : 'To the roost'}</button>
        <button class="btn btn-ghost" data-action="goto" data-id="menu">Home</button>
      </div>
    </div>`;
    $('#ui').appendChild(this.resultsEl);
    this.champ = null;
    this.updateChrome();
  }

  // ── HANGAR ────────────────────────────────────────────────────────────────
  renderHangar() {
    this.view = 'hangar';
    const id = this.dragonId;
    const def = DRAGON_MAP[id];
    const d = this.S.dragons[id];
    if (!def || !d) { this.dragonId = this.S.selected; return this.renderHangar(); }
    const r = RARITIES[def.rarity];
    const stats = Save.statsOf(id);
    const xpPct = Save.xpPercent(id);
    const sp = Save.skillPoints(id);
    const owned = this.ownedDragons();
    const locked = this.lockedDragons();
    const famFilter = this.habitatFilter || 'all';
    const famPool = dragonsByFamily(famFilter === 'all' ? 'all' : famFilter);
    const famOwned = famPool.filter(x => this.S.dragons[x.id]);
    const famLocked = famPool.filter(x => !this.S.dragons[x.id]);
    const habitat = HABITAT_INFO[def.family] || HABITAT_INFO.forest;
    const affinity = def.habitat && def.habitat !== def.family ? HABITAT_INFO[def.habitat] : null;
    const byHabitat = (fam) => {
      const pool = dragonsByFamily(fam);
      return { owned: pool.filter(x => this.S.dragons[x.id]).length, total: pool.length };
    };
    this.setScreen(`
      <div class="hangar-screen fade-in">
        <div class="screen-head" style="margin-bottom:10px">
          <div><div class="eyebrow">Dragon Sanctuary</div><h1 class="screen-title" style="font-size:clamp(21px,2.5vw,30px)">The high roost</h1></div>
          <div style="display:flex;gap:7px;align-items:center;flex-wrap:wrap">
            <span class="stat-pill">✦ ${owned.length} / ${DRAGONS.length} discovered</span>
            <button class="btn btn-sm btn-ghost" data-action="goto" data-id="shop">◇ Market</button>
            <button class="back-btn" data-action="goto" data-id="menu">⌂ Hearthfall</button>
          </div>
        </div>
        <div class="collection-meter">
          <span class="cm-label">✧ Collection</span>
          <div class="cm-bar"><i style="width:${Math.round(owned.length / DRAGONS.length * 100)}%"></i></div>
          <span class="cm-count">${owned.length} / ${DRAGONS.length}</span>
        </div>
        <div class="habitat-strip">
          <button class="habitat-chip ${famFilter === 'all' ? 'active' : ''}" data-action="hangar-habitat-filter" data-id="all">
            <span class="hab-ico">✧</span><span class="hab-nm">All roosts</span>
            <span class="hab-ct">${owned.length}/${DRAGONS.length}</span>
          </button>
          ${FAMILY_ORDER.map(fam => {
            const info = HABITAT_INFO[fam], cnt = byHabitat(fam);
            return `<button class="habitat-chip ${famFilter === fam ? 'active' : ''}" data-action="hangar-habitat-filter" data-id="${fam}" style="--hab:${info.accent}">
              <span class="hab-ico">${info.icon}</span><span class="hab-nm">${info.name}</span>
              <span class="hab-ct">${cnt.owned}/${cnt.total}</span>
            </button>`;
          }).join('')}
        </div>
        <div class="hangar-layout">
          <aside class="hangar-side">
            ${famFilter !== 'all' ? (() => {
              const info = HABITAT_INFO[famFilter], cnt = byHabitat(famFilter);
              return `<div class="habitat-note" style="--hab:${info.accent}">
                <div class="hn-title">${info.icon} ${info.name} roost</div>
                <p>${info.desc}</p>
                <div class="hn-sub">${info.home} · ${cnt.owned} of ${cnt.total} discovered</div>
              </div>`;
            })() : ''}
            <div class="side-title"><h2>${famFilter === 'all' ? 'Flight roster' : (HABITAT_INFO[famFilter]?.name || 'Roost')}</h2><span>${famOwned.length}/${famPool.length}</span></div>
            <div class="dragon-list">
              ${famOwned.map(dd => {
                const rar = RARITIES[dd.rarity];
                return `<button class="dragon-row ${dd.id === id ? 'active' : ''}" data-action="select-dragon" data-id="${dd.id}">
                  <img src="${this.thumb(dd)}" alt="" />
                  <div><div class="nm">${dd.name}</div><div class="sub"><span class="rarity-dot" style="background:${rar.color}"></span>Lv ${this.S.dragons[dd.id].level} · ${rar.name}</div></div>
                  <span class="lvl">${this.S.dragons[dd.id].bondLevel ? '♥' + this.S.dragons[dd.id].bondLevel : ''}</span>
                </button>`;
              }).join('')}
              ${famLocked.map(dd => {
                const rar = RARITIES[dd.rarity];
                const hint = dd.unlock || 'Still wild';
                return `<button class="dragon-row locked-row" data-action="inspect-locked" data-id="${dd.id}" title="${hint}">
                  <img src="${this.thumb(dd, true)}" alt="" class="silhouette" />
                  <div><div class="nm">${dd.name}</div><div class="sub"><span class="rarity-dot" style="background:${rar.color}"></span>${rar.name} · ${hint}</div></div>
                  <span class="lock">🔒</span>
                </button>`;
              }).join('')}
              ${famPool.length === 0 ? `<div class="empty-note">No dragons in this roost yet.</div>` : ''}
            </div>
            <button class="btn btn-ghost btn-sm" data-action="goto" data-id="shop" style="margin-top:2px">Explore the market ›</button>
          </aside>
          <div class="hangar-center"><div class="stage-hint">Drag to orbit · scroll to zoom · tap a dragon or roost</div></div>
          <section class="hangar-panel" style="--rarity:${r.color};--rarity-glow:${r.glow}">
            <div class="dragon-head">
              <div class="dragon-rarity" style="--rarity:${r.color}">${r.name} · ${def.ability.type}</div>
              <div class="dragon-title">${def.name}</div>
              <div class="dragon-epithet">${def.epithet}</div>
              <div class="habitat-badge" style="--hab:${habitat.accent}">
                <span>${habitat.icon}</span> ${habitat.name} roost · <b>${habitat.home}</b>
              </div>
              ${affinity ? `<div class="habitat-badge" style="--hab:${affinity.accent};margin-left:4px"><span>${affinity.icon}</span> drawn to ${affinity.name}</div>` : ''}
              <div class="level-row">
                <span class="level-badge">LV ${d.level}</span>
                <div class="level-xp"><div class="bar"><i style="width:${xpPct}%"></i></div><div class="txt"><span>${d.xp} / ${Save.dragonXpNeed(d.level)} XP</span><span>${sp} skill pt${sp === 1 ? '' : 's'}</span></div></div>
              </div>
            </div>
            <div class="bond-box">
              <div class="bond-head"><span>Bond · <b>${Save.bondLevelName(d.bondLevel)}</b></span><span>♥ ${Math.round(d.bond)} / 100</span></div>
              <div class="bar" style="height:5px"><i style="width:${d.bond}%;background:linear-gradient(90deg,#c94b7a,var(--rose))"></i></div>
              <div class="bond-actions">
                <button data-action="bond" data-id="feed"><span>❧</span>Feed 60◈</button>
                <button data-action="bond" data-id="train"><span>◎</span>Train</button>
                <button data-action="bond" data-id="pet"><span>♥</span>Bond</button>
              </div>
            </div>
            <div class="sanctuary-actions">
              <button class="btn btn-sm btn-ghost" data-action="hangar-visit" data-id="${def.family}">${habitat.icon} Visit roost</button>
              <button class="btn btn-sm btn-ghost" data-action="hangar-visit" data-id="training">◎ Training ring</button>
              <button class="btn btn-sm btn-ghost" data-action="hangar-visit" data-id="feeding">❧ Feeding hall</button>
            </div>
            <div class="tabs">
              <button class="tab ${this.hangarTab === 'train' ? 'active' : ''}" data-action="hangar-tab" data-id="train">Train</button>
              <button class="tab ${this.hangarTab === 'skills' ? 'active' : ''}" data-action="hangar-tab" data-id="skills">Skills <span style="color:var(--gold)">${sp}</span></button>
              <button class="tab ${this.hangarTab === 'style' ? 'active' : ''}" data-action="hangar-tab" data-id="style">Style</button>
              <button class="tab ${this.hangarTab === 'lore' ? 'active' : ''}" data-action="hangar-tab" data-id="lore">Lore</button>
            </div>
            <div class="tab-body">${this.hangarTabHtml(def, d, stats, sp)}</div>
          </section>
        </div>
      </div>`);
    this.updateChrome();
  }

  hangarTabHtml(def, d, stats, sp) {
    if (this.hangarTab === 'train') {
      const rows = [
        ['speed', 'Speed', stats.topSpeed, 'top speed'],
        ['accel', 'Accel', stats.accelStat, 'acceleration'],
        ['stamina', 'Stamina', stats.stamina, 'endurance'],
        ['handling', 'Handling', stats.agil, 'turning'],
      ];
      return `<div class="stat-list">
        ${rows.map(([key, label, val, sub]) => {
          const lvl = d.upgrades[key];
          const cost = Save.upgradeCost(key, lvl);
          const can = lvl < 6 && d.level >= 2 + lvl && this.S.coins >= cost;
          return `<div class="stat-line"><span>${label}</span><div class="stat-bar"><i style="width:${Math.min(100, (val / 12) * 100)}%"></i></div><span class="val">${val.toFixed(1)}</span>
          <button class="up-btn" data-action="upgrade-stat" data-id="${key}" ${can ? '' : 'disabled'} title="${lvl >= 6 ? 'Maxed' : 'Cost ' + cost + ' coins'}">${lvl >= 6 ? 'MAX' : '↑' + fmt(cost)}</button></div>`;
        }).join('')}
      </div>
      <div class="ability-card"><span class="ab-cd">CD ${def.ability.cd}s</span><div class="ab-name">✦ ${def.ability.name}</div><div class="ab-desc">${def.ability.desc}</div></div>
      <div class="cos-title">Training notes</div>
      <div style="font-size:10.5px;color:var(--muted);line-height:1.55">Each trait can be trained six times. Feeding and training raise your <b style="color:var(--rose)">bond</b>, which lifts every flight stat. At level ${Math.min(30, d.level + 1)} your dragon grows visibly larger horns and a stronger wing span.</div>`;
    }
    if (this.hangarTab === 'skills') {
      const groups = [
        ['speed', 'Windcraft', 'Speed & boost'],
        ['acrobatics', 'Sky Dancing', 'Turning & agility'],
        ['endurance', 'Deep Lungs', 'Stamina & recovery'],
      ];
      return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <span style="font-size:10px;color:var(--muted);line-height:1.5">Spend skill points to shape your dragon's flying style.</span>
        <span class="skill-points">✦ ${sp} points</span>
      </div>
      <div class="skill-paths">
        ${groups.map(([g, title, sub]) => `<div><div class="skill-path-label"><span>${title}</span><span>${sub}</span></div><div class="skill-nodes">
          ${SKILLS[g].map(sk => {
            const owned = d.skills.includes(sk.id);
            const check = Save.canUnlockSkill(def.id, sk);
            return `<button class="skill-node ${owned ? 'owned' : check.ok ? 'available' : 'locked'}" data-action="learn-skill" data-id="${sk.id}" ${owned || !check.ok ? 'disabled' : ''}>
              <span class="cost">${sk.cost}pt</span><b>${sk.name}</b><span>${sk.desc}</span>
            </button>`;
          }).join('')}
        </div></div>`).join('')}
      </div>
      <div class="cos-title">Why it matters</div>
      <div style="font-size:10.5px;color:var(--muted);line-height:1.55">Skill points are earned as your dragon levels. Skills persist per dragon, so every species can be built into a different racer.</div>`;
    }
    if (this.hangarTab === 'style') {
      const cats = [
        ['skin', 'Scale Skin'], ['saddle', 'Saddle'], ['armour', 'Armour'], ['wings', 'Wing Trinkets'],
      ];
      const owned = this.S.cosmetics.owned;
      return `${cats.map(([cat, label]) => `<div class="cos-title">${label}</div><div class="cos-grid">
        ${COSMETICS[cat].map(item => {
          const isOwned = owned[cat].includes(item.id);
          const equipped = d.cosmetics[cat] === item.id;
          const tint = item.tint?.body || (cat === 'skin' ? def.palette.body : cat === 'saddle' ? '#8a6240' : cat === 'armour' ? '#8b95a3' : def.palette.accent);
          return `<button class="swatch ${equipped ? 'equipped' : ''}" data-action="${isOwned ? 'equip-cosmetic' : 'buy-cosmetic'}" data-id="${cat}:${item.id}" title="${item.desc}">
            <div class="sw-color" style="background:${tint}"></div><div class="sw-name">${item.name}</div><div class="sw-lock">${equipped ? '✓ worn' : isOwned ? 'equip' : '◈ ' + fmt(item.price)}</div>
          </button>`;
        }).join('')}
      </div>`).join('')}
      <div class="cos-title">Rider Outfit</div><div class="cos-grid">
        ${COSMETICS.outfit.map(item => {
          const isOwned = this.S.cosmetics.owned.outfit.includes(item.id);
          const equipped = this.S.cosmetics.equipped.outfit === item.id;
          return `<button class="swatch ${equipped ? 'equipped' : ''}" data-action="${isOwned ? 'equip-outfit' : 'buy-outfit'}" data-id="${item.id}" title="${item.desc}">
            <div class="sw-color" style="background:linear-gradient(135deg,${item.colors.tunic} 50%,${item.colors.trim} 50%)"></div><div class="sw-name">${item.name}</div><div class="sw-lock">${equipped ? '✓ worn' : isOwned ? 'equip' : '◈ ' + fmt(item.price)}</div>
          </button>`;
        }).join('')}
      </div>`;
    }
    const habitat = HABITAT_INFO[def.family] || HABITAT_INFO.forest;
    const affinity = def.habitat && def.habitat !== def.family ? HABITAT_INFO[def.habitat] : null;
    return `<div class="lore">
      <p>${def.desc}</p>
      <blockquote>“${def.epithet}. In the old tongue they called it ${def.name.split(' ')[0]} — a name spoken softly, for the sky is listening.”</blockquote>
      <div class="trait-list">
        <span class="trait-chip">${RARITIES[def.rarity].name}</span>
        <span class="trait-chip">${def.ability.name}</span>
        <span class="trait-chip">${Save.bondLevelName(d.bondLevel)} bond</span>
        <span class="trait-chip">${def.shape.pattern} markings</span>
        <span class="trait-chip" style="border-color:${habitat.accent}">${habitat.icon} ${habitat.name}</span>
        ${affinity ? `<span class="trait-chip" style="border-color:${affinity.accent}">${affinity.icon} ${affinity.name} affinity</span>` : ''}
      </div>
      <div class="cos-title">${habitat.home}</div>
      <div style="font-size:11px;color:var(--muted);line-height:1.55">${habitat.desc}</div>
      ${affinity ? `<div style="font-size:10.5px;color:var(--muted);line-height:1.55;margin-top:4px">Its wild nature also answers the ${affinity.name.toLowerCase()} — ${affinity.desc}</div>` : ''}
      <div class="cos-title">Discovery</div>
      <div style="font-size:11px;color:var(--muted);line-height:1.55">${def.unlock}${def.price ? ` · Market price ${fmt(def.price)} ◈` : ''}</div>
      <div class="cos-title">Flight profile</div>
      <div style="font-size:11px;color:var(--muted);line-height:1.7">
        Top speed <b style="color:#e9dcc0">${stats.topSpeed.toFixed(1)}</b> · Acceleration <b style="color:#e9dcc0">${stats.accel.toFixed(1)}</b><br/>
        Turning <b style="color:#e9dcc0">${stats.turn.toFixed(2)}</b> · Stamina <b style="color:#e9dcc0">${stats.staminaMax.toFixed(0)}</b><br/>
        Boost cost <b style="color:#e9dcc0">${stats.boostCost.toFixed(0)}/s</b> · Recovery <b style="color:#e9dcc0">${stats.regen.toFixed(1)}/s</b>
      </div>
      <div class="cos-title">Weakness</div>
      <div style="font-size:11px;color:var(--muted);line-height:1.55">${def.weakness}</div>
    </div>`;
  }

  onHangarHabitat(family) {
    if (!family) return;
    this.habitatFocus = family;
    this.habitatFilter = family;
    if (this.view === 'hangar') this.renderHangar();
    const info = HABITAT_INFO[family];
    if (info) this.toast(`${info.home}`, info.name + ' roost', 'good');
  }

  onHangarAction(type) {
    if (type === 'feed') this.onBond('feed');
    else if (type === 'train') this.onBond('train');
    else if (type === 'pet') this.onBond('pet');
  }

  visitHangar(target) {
    if (target === 'training' || target === 'feeding') {
      this.game.focusHangarStation?.(target);
      const sc = $('#screen');
      if (sc) sc.scrollTop = 0;
      this.toast(target === 'training' ? 'Training ring' : 'Feeding hall', target === 'training' ? 'Hone speed, stamina and turns' : 'A warm meal deepens the bond', 'good');
      return;
    }
    const anchorFam = HABITAT_INFO[target] ? target : (DRAGON_MAP[this.dragonId]?.habitat || 'forest');
    this.game.focusHangarHabitat?.(anchorFam);
    this.habitatFilter = anchorFam;
    this.renderHangar();
  }

  onBond(kind) {
    const id = this.dragonId;
    const d = this.S.dragons[id];
    if (!d) return;
    const now = Date.now();
    const cfg = {
      feed: { cost: 60, gain: 10, cd: 15000, key: 'lastFeed', msg: 'A warm meal. Bond deepened.' },
      train: { cost: 0, gain: 6, cd: 20000, key: 'lastTrain', msg: 'A hard training flight. Trust grows.' },
      pet: { cost: 0, gain: 2, cd: 6000, key: 'lastPet', msg: 'A quiet moment between rider and dragon.' },
    }[kind];
    if (!cfg) return;
    if (now - (d[cfg.key] || 0) < cfg.cd) { this.toast('Give your dragon a moment.', 'Bond actions refresh shortly', ''); return; }
    if (this.S.coins < cfg.cost) { this.toast('Not enough coins to feed.', '', ''); return; }
    d[cfg.key] = now;
    this.S.coins -= cfg.cost;
    Save.addBond(id, cfg.gain);
    this.game.reactDragon?.(kind);
    sfx('pickup');
    this.toast(cfg.msg, `+${cfg.gain} bond`, 'good');
    this.updateChrome();
    // Update the bond read-out in place so mobile keeps its scroll position.
    const bar = $('.bond-box .bar i');
    if (bar) bar.style.width = Math.min(100, d.bond) + '%';
    const head = $('.bond-head span:last-child');
    if (head) head.textContent = `♥ ${Math.round(d.bond)} / 100`;
    const bname = $('.bond-head b');
    if (bname) bname.textContent = Save.bondLevelName(d.bondLevel);
  }

  // ── VILLAGE ──────────────────────────────────────────────────────────────
  renderVillage() {
    this.view = 'village';
    const lv = this.S.village;
    const owned = this.ownedDragons();
    const tribuneAvailable = this.S.lastTribute !== new Date().toISOString().slice(0, 10);
    this.setScreen(`
      <div class="village-screen fade-in">
        <div class="village-head">
          <div><div class="eyebrow">Your Island</div><h1 class="screen-title">Hearthfall Village</h1>
            <p class="screen-sub">Build a home in the clouds, raise your dragons, and grow stronger between races.</p></div>
          <div class="village-stats">
            <span class="stat-pill">⌂ Buildings <b>${this.totalBuildingLevels()}</b></span>
            <span class="stat-pill">✦ Dragons <b>${owned.length}</b></span>
            <span class="stat-pill">♥ Habitats <b>${['—', '2', '4', '6'][lv.habitat || 0]}</b></span>
            <button class="btn btn-sm btn-primary" data-action="collect-tribute" ${tribuneAvailable ? '' : 'disabled'}>${tribuneAvailable ? 'Collect tribute' : 'Tribute collected'}</button>
          </div>
        </div>
        <div class="village-stage"><span class="village-stage-hint">Tap a plot on the island to inspect it</span></div>
        <div>
          <div class="section-label"><h3>Build & Upgrade</h3><span>Raise your home between races</span></div>
          <div class="village-rail">
            ${BUILDINGS.map(b => {
              const lvl = lv[b.id] || 0;
              const max = b.max;
              const cost = lvl < max ? b.costs[lvl] : null;
              const can = cost != null && this.S.coins >= cost;
              return `<div class="build-card">
                <div class="build-top"><div class="build-icon">${b.icon}</div><div><div class="build-name">${b.name}</div><div class="build-level">${lvl ? 'Level ' + lvl : 'Unbuilt'}</div></div>
                <div class="pips" style="margin-left:auto">${Array.from({ length: max }, (_, i) => `<i class="${i < lvl ? 'on' : ''}"></i>`).join('')}</div></div>
                <div class="build-desc">${b.desc}</div>
                <div class="build-bonus">${lvl ? b.bonusText[lvl] : 'Unlock this building to gain its boon.'}</div>
                <button class="btn ${can ? 'btn-primary' : 'btn-ghost'}" data-action="build" data-id="${b.id}" ${can ? '' : 'disabled'}>${lvl >= max ? 'Fully built' : (lvl ? 'Upgrade · ◈ ' : 'Build · ◈ ') + fmt(cost)}</button>
              </div>`;
            }).join('')}
          </div>
          <div class="village-hint">Build the Training Arena and Feeding Station to accelerate your dragons' growth.</div>
        </div>
      </div>`);
    this.updateChrome();
  }

  buildBuilding(id) {
    const b = BUILDINGS.find(x => x.id === id);
    if (!b) return;
    const lvl = this.S.village[id] || 0;
    if (lvl >= b.max) { this.toast('That building is fully upgraded.', '', ''); return; }
    const cost = b.costs[lvl];
    if (this.S.coins < cost) { this.toast('Not enough coins.', `${fmt(cost - this.S.coins)} more needed`, ''); return; }
    this.S.coins -= cost;
    this.S.village[id] = lvl + 1;
    if (id === 'decor') this.S.villageDecor.banners = lvl + 1;
    Save.save();
    sfx('level');
    this.toast(`${b.name} ${lvl ? 'upgraded' : 'built'}!`, b.bonusText[lvl + 1], 'good');
    this.game.showVillage();
    this.updateChrome();
    this.renderVillage();
  }

  openBuilding(id) {
    const b = BUILDINGS.find(x => x.id === id);
    if (!b) return;
    const lvl = this.S.village[id] || 0;
    const cost = lvl < b.max ? b.costs[lvl] : null;
    this.openModal(`
      <div class="building-modal-top"><div class="build-icon">${b.icon}</div><div><div class="card-kicker">${lvl ? 'Level ' + lvl : 'Unbuilt plot'}</div><h2>${b.name}</h2></div></div>
      <p class="modal-sub">${b.desc}</p>
      <div class="bonus-table">
        ${Array.from({ length: b.max }, (_, i) => `<div class="bonus-line ${i < lvl ? 'on' : ''}"><span>${i + 1 < b.max ? 'Level ' + (i + 1) : 'Level ' + b.max + ' (max)'}</span><span>${b.bonusText[i + 1]}</span></div>`).join('')}
      </div>
      <div class="modal-actions">
        <button class="btn btn-ghost" data-action="close-modal">Close</button>
        ${lvl < b.max ? `<button class="btn btn-primary" data-action="build" data-id="${b.id}" ${this.S.coins < cost ? 'disabled' : ''}>${lvl ? 'Upgrade' : 'Build'} · ◈ ${fmt(cost)}</button>` : `<button class="btn btn-ghost" disabled>Fully built</button>`}
      </div>`);
  }

  collectTribute() {
    const today = new Date().toISOString().slice(0, 10);
    if (this.S.lastTribute === today) { this.toast('Tribute already collected today.', '', ''); return; }
    const amount = 220 + this.totalBuildingLevels() * 45;
    this.S.lastTribute = today;
    Save.awardCoins(amount);
    sfx('pickup');
    this.toast('Village tribute collected!', `+${fmt(amount)} coins · come back tomorrow`, 'good');
    this.updateChrome();
    this.renderVillage();
  }

  // ── EXPLORE HUB ──────────────────────────────────────────────────────────
  renderExploreHub() {
    this.view = 'explore';
    this.setScreen(`
      <div class="fade-in">
        <div class="screen-head">
          <div><div class="eyebrow">Free Flight</div><h1 class="screen-title">Beyond the course</h1>
            <p class="screen-sub">No checkpoints, no rivals — just wind, ruins and dragons. Gather sky shards and seek the hidden lairs.</p></div>
          <button class="back-btn" data-action="goto" data-id="menu">⌂ Hearthfall</button>
        </div>
        <div class="zone-grid">
          ${EXPLORE_ZONES.map(z => {
            const st = Save.exploreState(z.id);
            const locked = this.S.level < z.reqLevel;
            const pct = (st.orbs.length / 12) * 100;
            const pal = TRACK_MAP[z.id].palette;
            return `<button class="zone-card ${locked ? 'locked' : ''}" data-action="${locked ? 'locked-zone' : 'start-explore'}" data-id="${z.id}" style="--zc1:${pal.skyTop};--zc2:${pal.rock2}">
              <span class="zone-icon">${TRACK_MAP[z.id].icon}</span>
              <span class="zone-state">${st.hidden ? '✦ DRAGON FOUND' : locked ? '🔒 RIDER LV ' + z.reqLevel : 'FREE FLIGHT'}</span>
              <div class="zone-body">
                <div class="zone-region">${TRACK_MAP[z.id].region}</div>
                <div class="zone-name">${z.name}</div>
                <div class="zone-desc">${z.desc}</div>
                <div class="zone-progress"><span>◈ ${st.orbs.length}/12</span><div class="bar"><i style="width:${pct}%"></i></div><span>${st.hidden ? '✦' : '◈ hidden'}</span></div>
              </div>
              ${locked ? `<div class="zone-lock"><span style="font-size:20px">🔒</span><span>Reach rider level ${z.reqLevel}</span></div>` : ''}
            </button>`;
          }).join('')}
        </div>
        <p class="explore-note">✦ Sky shards respawn never — once collected, they are yours. Hidden dragons can be discovered only once per zone. Levelling your rider unlocks the far reaches.</p>
      </div>`);
    this.updateChrome();
  }

  showExploreHud() {
    this.view = 'explore';
    this.updateChrome();
    this.buildHud('explore');
    this.drawMinimap = this.drawMinimap; // no-op guard
  }

  onExplore(d) {
    this.hudData = d;
    if (d.nearLair) {
      const slot = $('#explore-prompt-slot');
      if (slot && !slot.children.length) {
        const dragon = DRAGON_MAP[this.game.world?.zone?.hidden];
        slot.innerHTML = `<div class="explore-prompt"><span class="ep-icon">✦</span><div class="ep-text"><b>Hidden Lair</b><span>${dragon?.name || 'A wild dragon'} stirs within…</span></div><button class="btn btn-primary btn-sm" data-action="discover-lair">Discover</button></div>`;
      }
    } else {
      const slot = $('#explore-prompt-slot');
      if (slot) slot.innerHTML = '';
    }
  }

  onLairFound(d) {
    const def = DRAGON_MAP[d.dragonId];
    const r = RARITIES[def.rarity];
    this.openModal(`
      <div style="text-align:center">
        <div class="result-kicker">Hidden Dragon Discovered</div>
        <div style="width:130px;height:130px;margin:8px auto 4px;border-radius:50%;overflow:hidden;border:2px solid ${r.color};box-shadow:0 0 40px ${r.glow}">
          <img src="${this.thumb(def)}" alt="" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <h2 style="font-size:26px;margin-top:8px">${def.name}</h2>
        <div style="font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:${r.color};margin-bottom:7px">${r.name} · ${def.epithet}</div>
        <p class="modal-sub">${d.isNew ? 'A wild dragon bows its head. A new bond is forged — your roost grows.' : 'You found this dragon again. It gifts you a handful of sky-gems.'}</p>
        <div class="rewards-row"><div class="reward-chip xp">✦ +180 rider XP</div><div class="reward-chip gem">${d.isNew ? 'New dragon' : '+8 gems'}</div></div>
        <div class="modal-actions" style="justify-content:center">
          <button class="btn btn-primary" data-action="goto" data-id="hangar">Visit the roost</button>
          <button class="btn btn-ghost" data-action="close-modal">Keep flying</button>
        </div>
      </div>`);
    sfx('level');
    this.updateChrome();
  }

  // ── SHOP ─────────────────────────────────────────────────────────────────
  renderShop() {
    this.view = 'shop';
    const s = this.S;
    const sel = DRAGON_MAP[s.selected];
    const tabs = [['dragons', 'Dragons'], ['skin', 'Skins'], ['gear', 'Armour & Saddles'], ['rider', 'Rider'], ['trails', 'Wing Trails']];
    let body = '';
    if (this.shopTab === 'dragons') {
      body = `<div class="featured-strip">
        <div class="featured"><div class="f-kicker">Seasonal Nursery</div><div class="f-title">The Skyfire awaits</div><div class="f-desc">Collect festival embers in any race to earn Solstice, harbinger of the dawn.</div><div class="f-actions"><button class="btn btn-sm btn-primary" data-action="start-event">Race the trial</button><span style="font-size:10px;color:var(--muted)">${Math.min(s.season.xp, 600)} / 600 embers</span></div></div>
        <div class="featured" style="background:linear-gradient(140deg,rgba(70,53,100,.96),rgba(10,24,34,.96))"><div class="f-kicker">Your Dragon</div><div class="f-title">${sel.name}</div><div class="f-desc">${sel.epithet}. Level ${s.dragons[sel.id]?.level || 1} · ${RARITIES[sel.rarity].name}</div><div class="f-actions"><button class="btn btn-sm btn-ghost" data-action="goto" data-id="hangar">Customise</button></div></div>
      </div>
      <div class="habitat-strip">
        <button class="habitat-chip ${this.shopFamily === 'all' ? 'active' : ''}" data-action="shop-habitat-filter" data-id="all">
          <span class="hab-ico">✧</span><span class="hab-nm">All species</span><span class="hab-ct">${DRAGONS.length}</span>
        </button>
        ${FAMILY_ORDER.map(fam => {
          const info = HABITAT_INFO[fam], pool = dragonsByFamily(fam);
          return `<button class="habitat-chip ${this.shopFamily === fam ? 'active' : ''}" data-action="shop-habitat-filter" data-id="${fam}" style="--hab:${info.accent}">
            <span class="hab-ico">${info.icon}</span><span class="hab-nm">${info.name}</span><span class="hab-ct">${pool.length}</span>
          </button>`;
        }).join('')}
      </div>
      <div class="shop-grid">
        ${dragonsByFamily(this.shopFamily === 'all' ? 'all' : this.shopFamily).map(def => {
          const owned = !!s.dragons[def.id];
          const r = RARITIES[def.rarity];
          const buyable = def.price > 0;
          const canAfford = s.coins >= def.price;
          return `<div class="shop-card" style="--rarity-glow:${r.glow}">
            <div class="shop-thumb"><img src="${this.thumb(def)}" alt="${def.name}" loading="lazy" /></div>
            <div class="shop-info">
              <div class="shop-rar" style="color:${r.color}">${r.name}</div>
              <div class="shop-name">${def.name}</div>
              <div class="shop-desc">${def.epithet}</div>
              ${owned ? `<button class="price-btn owned" data-action="select-dragon" data-id="${def.id}">✓ In your roost</button>`
                : buyable ? `<button class="price-btn" data-action="buy-dragon" data-id="${def.id}" ${canAfford ? '' : 'disabled'}>◈ ${fmt(def.price)} ${canAfford ? '' : '· need more'}</button>`
                : `<button class="price-btn" data-action="inspect-locked" data-id="${def.id}">✦ ${def.unlock}</button>`}
            </div>
          </div>`;
        }).join('')}
      </div>`;
    } else if (this.shopTab === 'rider') {
      body = `<div class="shop-grid">${COSMETICS.outfit.map(item => {
        const isOwned = s.cosmetics.owned.outfit.includes(item.id);
        const eq = s.cosmetics.equipped.outfit === item.id;
        return `<div class="shop-card cosmetic-card"><div class="shop-thumb"><div class="cosmetic-preview" style="background:linear-gradient(135deg,${item.colors.tunic} 55%,${item.colors.trim} 55%)"></div></div>
          <div class="shop-info"><div class="shop-rar" style="color:var(--teal)">Rider outfit</div><div class="shop-name">${item.name}</div><div class="shop-desc">${item.desc}</div>
          <button class="price-btn ${eq ? 'owned' : ''}" data-action="${isOwned ? (eq ? 'noop' : 'equip-outfit') : 'buy-outfit'}" data-id="${item.id}" ${eq ? 'disabled' : ''}>${eq ? '✓ Wearing' : isOwned ? 'Equip' : '◈ ' + fmt(item.price)}</button></div></div>`;
      }).join('')}</div>`;
    } else {
      const cat = this.shopTab === 'skin' ? 'skin' : this.shopTab === 'trails' ? 'wings' : 'saddle';
      const extra = this.shopTab === 'gear' ? 'armour' : null;
      const list = [...COSMETICS[cat], ...(extra ? COSMETICS[extra] : [])];
      body = `<div class="shop-grid">${list.map(item => {
        const c = COSMETICS[cat].includes(item) ? cat : extra;
        const isOwned = s.cosmetics.owned[c].includes(item.id);
        const eq = s.dragons[sel.id]?.cosmetics[c] === item.id;
        const sw = item.tint?.body || (c === 'skin' ? sel.palette.body : c === 'wings' ? sel.palette.accent : c === 'armour' ? '#8b95a3' : '#8a6240');
        return `<div class="shop-card cosmetic-card"><div class="shop-thumb">
          <div class="cosmetic-preview" style="background:${item.tint ? `linear-gradient(135deg,${item.tint.body},${item.tint.accent})` : sw}"></div></div>
          <div class="shop-info"><div class="shop-rar" style="color:var(--teal)">${c === 'skin' ? 'Scale skin' : c === 'armour' ? 'Dragon armour' : c === 'wings' ? 'Wing trinket' : 'Saddle'}</div>
          <div class="shop-name">${item.name}</div><div class="shop-desc">${item.desc}</div>
          <button class="price-btn ${eq ? 'owned' : ''}" data-action="${isOwned ? (eq ? 'noop' : 'equip-cosmetic') : 'buy-cosmetic'}" data-id="${c}:${item.id}" ${eq ? 'disabled' : ''}>${eq ? '✓ Equipped' : isOwned ? 'Equip' : '◈ ' + fmt(item.price)}</button></div></div>`;
      }).join('')}</div>`;
    }
    this.setScreen(`
      <div class="fade-in">
        <div class="screen-head">
          <div><div class="eyebrow">The Dragon Market</div><h1 class="screen-title">Wares of the sky</h1>
            <p class="screen-sub">Spend hard-earned coins on new dragons and the finest rider gear in the Reach.</p></div>
          <button class="back-btn" data-action="goto" data-id="menu">⌂ Hearthfall</button>
        </div>
        <div class="shop-tabs">${tabs.map(([id, label]) => `<button class="shop-tab ${this.shopTab === id ? 'active' : ''}" data-action="shop-tab" data-id="${id}">${label}</button>`).join('')}</div>
        ${body}
      </div>`);
    this.updateChrome();
  }

  buyDragon(id) {
    const def = DRAGON_MAP[id];
    if (!def || this.S.dragons[id]) return;
    if (def.price <= 0) { this.toast('This dragon cannot be bought.', def.unlock, ''); return; }
    if (this.S.coins < def.price) { this.toast('Not enough coins.', `${fmt(def.price - this.S.coins)} more needed`, ''); return; }
    this.S.coins -= def.price;
    const added = Save.addDragon(id, 1);
    if (added) {
      this.closeModal();
      this.S.selected = id;
      Save.save();
      this.toast(`${def.name} joined your roost!`, 'A new bond begins', 'good');
      sfx('level');
      this.dragonId = id;
      this.game.refreshHangarModel?.();
      this.game.showHangar(id);
      this.updateChrome();
      this.renderShop();
    }
  }

  buyCosmetic(spec) {
    const [cat, id] = spec.split(':');
    const item = COSMETICS[cat]?.find(x => x.id === id);
    if (!item) return;
    const owned = this.S.cosmetics.owned[cat];
    if (!owned.includes(id)) {
      if (this.S.coins < item.price) { this.toast('Not enough coins.', '', ''); return; }
      this.S.coins -= item.price;
      owned.push(id);
      Save.save();
      sfx('pickup');
      this.toast(`${item.name} added to your collection!`, '', 'good');
    }
    this.equipCosmetic(spec);
  }

  equipCosmetic(spec) {
    const [cat, id] = spec.split(':');
    const d = this.S.dragons[this.dragonId] || this.S.dragons[this.S.selected];
    if (!d) return;
    d.cosmetics[cat] = id;
    Save.save();
    if (this.game.mode === 'hangar' || this.view === 'shop') {
      this.game.refreshHangarModel?.();
    }
    this.updateChrome();
    if (this.view === 'hangar') this.renderHangar(); else this.renderShop();
    this.toast('Look equipped.', COSMETICS[cat]?.find(x => x.id === id)?.name || '', 'good');
  }

  buyOutfit(id) {
    const item = COSMETICS.outfit.find(x => x.id === id);
    if (!item) return;
    const owned = this.S.cosmetics.owned.outfit;
    if (!owned.includes(id)) {
      if (this.S.coins < item.price) { this.toast('Not enough coins.', '', ''); return; }
      this.S.coins -= item.price;
      owned.push(id);
      Save.save();
      sfx('pickup');
      this.toast(`${item.name} acquired!`, '', 'good');
    }
    this.equipOutfit(id);
  }
  equipOutfit(id) {
    this.S.cosmetics.equipped.outfit = id;
    Save.save();
    this.game.refreshHangarModel?.();
    this.updateChrome();
    if (this.view === 'hangar') this.renderHangar(); else this.renderShop();
    this.toast('Rider outfit changed.', '', 'good');
  }

  // ── modals ───────────────────────────────────────────────────────────────
  openModal(html, cls = '') {
    const root = $('#modal-root');
    root.classList.remove('hidden');
    root.innerHTML = `<div class="modal ${cls}"><button class="icon-btn modal-close" data-action="close-modal" aria-label="Close">✕</button>${html}</div>`;
  }
  closeModal() {
    const root = $('#modal-root');
    root.classList.add('hidden');
    root.innerHTML = '';
    if (this.game.paused && this.view === 'race') this.game.pause(false);
  }

  openSettings() {
    const st = this.S.settings;
    const q = st.quality;
    this.openModal(`
      <div class="card-kicker">Rider's ledger</div>
      <h2>Settings</h2>
      <p class="modal-sub">Tune the skies to your device. Higher quality adds richer light and particles; lower quality protects frame rate.</p>
      <div class="opt-row"><div>Graphics<small>Render resolution, particles and detail</small></div><div class="seg">
        ${['low', 'medium', 'high'].map(v => `<button class="${q === v ? 'on' : ''}" data-action="quality" data-id="${v}">${v[0].toUpperCase() + v.slice(1)}</button>`).join('')}
        <button class="${q === 'auto' || !['low','medium','high'].includes(q) ? 'on' : ''}" data-action="quality" data-id="auto">Auto</button>
      </div></div>
      <div class="opt-row"><div>Music<small>Ambient sky-pad score</small></div><button class="toggle ${st.music ? 'on' : ''}" data-action="toggle-setting" data-id="music"></button></div>
      <div class="opt-row"><div>Sound effects<small>Wings, gates and impact cues</small></div><button class="toggle ${st.sfx ? 'on' : ''}" data-action="toggle-setting" data-id="sfx"></button></div>
      <div class="opt-row"><div>Invert climb<small>Push up to dive instead</small></div><button class="toggle ${st.invertY ? 'on' : ''}" data-action="toggle-setting" data-id="invertY"></button></div>
      <div class="opt-row"><div>Left-handed controls<small>Steer with the right thumb</small></div><button class="toggle ${st.leftHand ? 'on' : ''}" data-action="toggle-setting" data-id="leftHand"></button></div>
      <div class="opt-row"><div>Performance<small>Live renderer estimate</small></div><span style="font-size:11px;color:var(--gold);font-variant-numeric:tabular-nums">${this.game.fps} FPS</span></div>
      <div class="modal-actions">
        <button class="btn btn-danger btn-sm" data-action="confirm-reset">Reset progress</button>
        <button class="btn btn-ghost" data-action="close-modal">Close</button>
      </div>`);
  }

  openLeaderboard() {
    const track = TRACK_MAP[this.trackId] || TRACKS[0];
    const rows = this.getLeaderboard(track);
    this.openModal(`<div class="card-kicker">Local Legends</div><h2>${track.name}</h2><p class="modal-sub">Best runs recorded on this device.</p>
      <div class="leaderboard-mini">${rows.map(r => `<div class="leader-row ${r.me ? 'me' : ''}"><span class="pos">${r.pos}</span><span class="nm">${r.name}</span><span class="tm">${r.time >= 9999 ? '—' : fmtTime(r.time)}</span></div>`).join('')}</div>
      <div class="modal-actions"><button class="btn btn-ghost" data-action="close-modal">Close</button></div>`);
  }

  // ── pause ─────────────────────────────────────────────────────────────────
  pauseRace() {
    const inExplore = this.view === 'explore';
    this.game.pause(true);
    this.openModal(`
      <div class="card-kicker">Wings still</div><h2>${inExplore ? 'Free flight paused' : 'Race paused'}</h2>
      <p class="modal-sub">The sky waits. Resume when you are ready, or return to Hearthfall.</p>
      <div class="modal-actions" style="justify-content:center">
        <button class="btn btn-primary" data-action="resume">Resume</button>
        <button class="btn btn-ghost" data-action="${inExplore ? 'exit-explore' : 'quit-race'}">${inExplore ? 'Leave flight' : 'Quit race'}</button>
      </div>`);
  }

  quitRace() {
    this.closeModal();
    this.game.pause(false);
    this.hideHud();
    this.closeResults();
    this.lastRaceConfig = null;
    this.champ = null;
    this.goto('race');
  }

  exitExplore() {
    this.closeModal();
    this.game.pause(false);
    this.hideHud();
    this.game.showMenu();
    this.view = 'explore';
    this.renderExploreHub();
    this.updateChrome();
  }

  // ── actions ───────────────────────────────────────────────────────────────
  handleAction(a, id, el) {
    switch (a) {
      case 'goto': this.goto(id); break;
      case 'quick-race': this.startQuickRace(); break;
      case 'select-mode': this.modeId = id; this.renderRaceHub(); break;
      case 'select-track':
        this.trackId = id;
        if (!this.S.unlockedTracks.includes(id)) { this.toast('That sky is still locked.', 'Win the linked championship to unlock it', ''); }
        this.renderRaceHub(); break;
      case 'pick-league':
        this.leagueId = id; this.modeId = 'championship'; this.renderRaceHub();
        this.toast('Championship selected.', 'Press Enter Championship to join', 'good'); break;
      case 'start-selected': this.startSelectedRace(); break;
      case 'enter-champ': this.confirmChampionship(id); break;
      case 'start-championship': this.closeModal(); this.startChampionship(id); break;
      case 'start-event': this.startEventRace(); break;
      case 'claim-season': this.claimSeasonReward(); break;
      case 'claim-daily': {
        const ch = this.dailyList().find(c => c.id === id);
        if (ch && Save.claimDaily(ch)) {
          sfx('pickup');
          this.toast('Daily trial complete!', `+${ch.coins} coins · +${ch.xp} dragon XP`, 'good');
          this.updateChrome();
          if (this.view === 'menu') this.renderMenu(); else if (this.view === 'race') this.renderRaceHub();
        }
        break;
      }
      case 'hangar-tab': this.hangarTab = id; this.renderHangar(); break;
      case 'hangar-habitat-filter': {
        this.habitatFilter = id;
        if (id === 'all') this.game.focusHangarDragon?.();
        else this.game.focusHangarHabitat?.(id);
        this.renderHangar();
        break;
      }
      case 'hangar-visit': this.visitHangar(id); break;
      case 'select-dragon': {
        if (!this.S.dragons[id]) { this.inspectLocked(id); break; }
        this.S.selected = id; this.dragonId = id; Save.save();
        this.game.showHangar(id);
        this.renderHangar(); this.updateChrome();
        break;
      }
      case 'inspect-locked': this.inspectLocked(id); break;
      case 'upgrade-stat': {
        const res = Save.upgradeDragonStat(this.dragonId, id);
        this.toast(res.msg, res.ok ? 'Training complete' : '', res.ok ? 'good' : '');
        if (res.ok) { sfx('level'); this.game.refreshHangarModel?.(); this.renderHangar(); this.updateChrome(); }
        break;
      }
      case 'learn-skill': {
        const sk = SKILL_LIST.find(s => s.id === id);
        const res = Save.unlockSkill(this.dragonId, sk);
        this.toast(res.msg || res.reason || '', '', res.ok ? 'good' : '');
        if (res.ok) { sfx('level'); this.renderHangar(); this.updateChrome(); }
        break;
      }
      case 'bond': this.onBond(id); break;
      case 'buy-cosmetic': this.buyCosmetic(id); break;
      case 'equip-cosmetic': this.equipCosmetic(id); break;
      case 'buy-outfit': this.buyOutfit(id); break;
      case 'equip-outfit': this.equipOutfit(id); break;
      case 'build': this.closeModal(); this.buildBuilding(id); break;
      case 'collect-tribute': this.collectTribute(); break;
      case 'start-explore': {
        this.hideHud();
        this.game.showExplore(id);
        this.view = 'explore';
        this.showChrome(false);
        $('#screen').style.display = 'none';
        this.buildHud('explore');
        this.toast('Free flight', 'Sky shards glimmer on the horizons', 'good');
        break;
      }
      case 'locked-zone': this.toast('This region is still locked.', 'Raise your rider level by racing', ''); break;
      case 'discover-lair': this.game.discoverLair(); break;
      case 'exit-explore': this.exitExplore(); break;
      case 'shop-tab': this.shopTab = id; this.renderShop(); break;
      case 'shop-habitat-filter': this.shopFamily = id; this.renderShop(); break;
      case 'buy-dragon': this.buyDragon(id); break;
      case 'pause-race': this.pauseRace(); break;
      case 'resume': this.closeModal(); this.game.pause(false); break;
      case 'quit-race': this.quitRace(); break;
      case 'race-again': {
        this.closeResults(); this.hideHud();
        const cfg = this.lastRaceConfig || { trackId: this.trackId, mode: this.modeId };
        this.launchRace(cfg.trackId, cfg.mode === 'championship' ? 'championship' : cfg.mode, cfg.league || null, cfg.round || 1);
        break;
      }
      case 'change-track': this.closeResults(); this.hideHud(); this.goto('race'); break;
      case 'next-champ': {
        this.closeResults(); this.hideHud();
        if (!this.champ) { this.goto('race'); break; }
        this.startLeagueRound();
        break;
      }
      case 'finish-championship': {
        const data = this.finalizeChampionship();
        if (data) this.renderChampionshipFinal(data);
        else { this.closeResults(); this.goto('race'); }
        break;
      }
      case 'quit-champ': this.champ = null; this.closeResults(); this.goto('race'); break;
      case 'settings': this.openSettings(); break;
      case 'close-modal': this.closeModal(); break;
      case 'quality': {
        const q = id === 'auto' ? this.game.detectQuality() : id;
        this.S.settings.quality = id === 'auto' ? 'auto' : id;
        Save.save();
        this.game.applyQuality(q);
        this.openSettings();
        this.toast('Graphics set to ' + id + '.', '', 'good');
        break;
      }
      case 'toggle-setting': {
        const s = this.S.settings;
        s[id] = !s[id];
        if (id === 'music' || id === 'sfx') setAudioEnabled(id, s[id]);
        if (id === 'leftHand') $('#hud')?.classList.toggle('left-handed', !!s.leftHand);
        Save.save();
        this.openSettings();
        break;
      }
      case 'confirm-reset': {
        this.openModal(`<h2>Reset all progress?</h2><p class="modal-sub">This will erase your dragons, village, championships and records from this device. This cannot be undone.</p>
          <div class="modal-actions"><button class="btn btn-ghost" data-action="settings">Cancel</button><button class="btn btn-danger" data-action="do-reset">Yes, start anew</button></div>`);
        break;
      }
      case 'do-reset': {
        Save.resetSave();
        this.champ = null;
        this.thumbs.clear();
        this.closeModal();
        this.game.showMenu();
        this.goto('menu');
        this.toast('A new journey begins.', '', 'good');
        break;
      }
      case 'use-ability': this.game.useAbility(); break;
      case 'use-maneuver': this.game.useManeuver(); break;
      case 'leaderboard': this.openLeaderboard(); break;
      case 'noop': break;
      default: break;
    }
  }

  inspectLocked(id) {
    const def = DRAGON_MAP[id];
    if (!def) return;
    const r = RARITIES[def.rarity];
    const hab = HABITAT_INFO[def.habitat] || HABITAT_INFO[def.family] || HABITAT_INFO.forest;
    const ownedCount = this.ownedDragons().length;
    this.openModal(`
      <div style="text-align:center">
        <div style="width:110px;height:110px;margin:0 auto 7px;border-radius:50%;overflow:hidden;border:2px solid ${r.color};opacity:.85">
          <img src="${this.thumb(def, true)}" alt="" style="width:100%;height:100%;object-fit:cover" /></div>
        <div class="card-kicker" style="color:${r.color}">${r.name} dragon · ${hab.icon} ${hab.name}</div>
        <h2>${def.name}</h2>
        <p class="modal-sub">${def.desc}</p>
        <div class="bonus-line" style="justify-content:center;gap:8px">Roost: ${hab.home}</div>
        <div class="bonus-line" style="justify-content:center;gap:8px">How to find: ${def.unlock}</div>
        <div class="bonus-line" style="justify-content:center;gap:8px;color:var(--muted)">${ownedCount} of ${DRAGONS.length} species discovered</div>
        <div class="bonus-line" style="justify-content:center;gap:8px;color:var(--muted);font-size:10.5px">Weakness: ${def.weakness}</div>
        <div class="modal-actions" style="justify-content:center">
          ${def.price > 0 ? `<button class="btn btn-primary" data-action="buy-dragon" data-id="${def.id}" ${this.S.coins < def.price ? 'disabled' : ''}>Buy · ◈ ${fmt(def.price)}</button>` : `<button class="btn btn-ghost" data-action="close-modal">Keep searching</button>`}
          <button class="btn btn-ghost" data-action="close-modal">Close</button>
        </div>
      </div>`);
  }

  confirmChampionship(leagueId) {
    const league = LEAGUES.find(l => l.id === leagueId);
    if (!league) return;
    if (!Save.leagueUnlocked(league)) { this.toast('Win the previous league first.', '', ''); return; }
    this.openModal(`
      <div class="card-kicker">Championship entry</div>
      <h2>${league.name}</h2>
      <p class="modal-sub">${league.desc} Three races. Championship points. The finest rider takes the trophy.</p>
      <div class="bonus-table">
        <div class="bonus-line"><span>Courses</span><span>${league.tracks.map(t => TRACK_MAP[t].name).join(' · ')}</span></div>
        <div class="bonus-line"><span>Entry fee</span><span>${league.entry > 0 ? '◈ ' + fmt(league.entry) : 'Free'}</span></div>
        <div class="bonus-line"><span>Champion reward</span><span>◈ ${fmt(league.rewards.coins)} · ◆ ${league.rewards.gems}</span></div>
        <div class="bonus-line"><span>Glory</span><span>${league.rewards.dragon ? DRAGON_MAP[league.rewards.dragon].name : league.rewards.track ? TRACK_MAP[league.rewards.track].name + ' course' : 'League trophy'}</span></div>
      </div>
      <div class="modal-actions">
        <button class="btn btn-ghost" data-action="close-modal">Not yet</button>
        <button class="btn btn-primary" data-action="start-championship" data-id="${league.id}" ${this.S.coins < league.entry ? 'disabled' : ''}>${league.entry > 0 ? 'Pay ◈ ' + fmt(league.entry) + ' & enter' : 'Enter free'}</button>
      </div>`);
  }

  claimSeasonReward() {
    if (this.S.season.xp < this.seasonGoal()) { this.toast('Not enough festival embers yet.', 'Keep racing', ''); return; }
    if (this.S.dragons.solstice) { this.toast('Solstice already flies with you.', '', ''); return; }
    if (Save.addDragon('solstice', 2)) {
      this.S.season.tier = 2;
      Save.awardCoins(800);
      Save.save();
      sfx('level');
      this.toast('Solstice joined your roost!', 'The Skyfire Festival dragon', 'good');
      this.dragonId = 'solstice';
      this.goto('hangar');
    }
  }
}
