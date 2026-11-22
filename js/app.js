import { TEAMS, TEAM_MAP, makeSquad, overallFor, ATTRS, ATTR_LABELS, POSITIONS, HISTORIC_EDITIONS, LEGENDS, STADIUMS } from './data.js';
import { RugbyGame, simulateMatch } from './engine.js';
import { MatchRenderer } from './renderer.js';
import {
  ERAS, RWC_RECORDS, RWC_FINALS, CHAMPIONSHIP_HISTORY, DREAM_MATCHES,
  ARCHIVE_PLAYERS, PLAYER_BY_ID, PLAYERS_BY_COUNTRY, playersForTeam, allTimeGreats,
  historicalSquad, historicalSquadRating, eraBaseRating, eraTeamRatings, archiveSummary, playerRatingAt, eraForYear
} from './history.js';
import {
  makeTournament, recordResult, simulateFixture, simulateRemainingInRound, advanceIfReady,
  nextUserFixture, standingsFor, allStandings, currentStageLabel, userStillIn, simulateUntilUserMatch,
  tournamentSummary, historicalTournament, customTournament, teamOf, fixtureTeams
} from './tournament.js';
import {
  makeCareer, nextCareerFixture, careerTable, recordCareerResult, simulateCareerRound,
  runTrainingSession, developPlayer, swapCareerPlayer, autoPickLineup, careerSquadPlayers, newCareerSeason
} from './career.js';
import { Sound } from './audio.js';

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clamp = (v,a,b)=>Math.max(a,Math.min(b,v));
const fmtClock = sec => {
  const total = Math.floor(sec || 0);
  const m = Math.floor(total/60), s = total%60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
};
const halfLabel = h => h===1?'1ST HALF':'2ND HALF';
const pick = arr => arr[Math.floor(Math.random()*arr.length)];

const SAVE_KEY = 'rwc26_mobile_save_v2';
const squadCache = new Map();

function loadSave() {
  try { return JSON.parse(localStorage.getItem(SAVE_KEY) || '{}'); } catch { return {}; }
}
const saved = loadSave();

const S = {
  route: 'home',
  settings: Object.assign({
    sound: true, haptics: true, controlScale: 1, sensitivity: 1, cameraZoom: 1,
    layout: 'right', difficulty: 'pro', commentary: true
  }, saved.settings || {}),
  tournament: saved.tournament || null,
  career: saved.career || null,
  selectedTeam: saved.selectedTeam || 'en',
  unlocks: saved.unlocks || [],
  quick: Object.assign({ home:'en', away:'nz', half:3, difficulty:'pro' }, saved.quick || {}),
  tournamentTeam: saved.tournamentTeam || 'en',
  tournamentGroup: 0,
  careerTab: 'overview',
  archiveTab: saved.archiveTab || 'cups',
  archiveYear: saved.archiveYear || 1995,
  archiveTeam: saved.archiveTeam || 'nz',
  archiveEra: saved.archiveEra || 'dawn',
  archiveFilterYear: saved.archiveFilterYear || 0,
  archiveCountry: saved.archiveCountry || '',
  archivePosition: saved.archivePosition || '',
  archiveTournament: saved.archiveTournament || 0,
  custom: saved.custom || { name:'The Nations Cup', size:8, teams:['nz','za','fr','ie','en','au','ar','fj'], userTeam:'en' },
  game: null, renderer: null, raf: null, matchMeta: null, matchUi: null, matchView: 'prematch',
  lastHud: 0, goalRaf: null, goalMarker: 0, goalDir: 1, toastTimer: null, audio: new Sound(),
  prematchAnimated: false, showTrophyFor: null, lastFrame: 0, pausedFrom: null
};

function save() {
  const data = {
    settings:S.settings, tournament:S.tournament, career:S.career, selectedTeam:S.selectedTeam,
    unlocks:S.unlocks, quick:S.quick, tournamentTeam:S.tournamentTeam, custom:S.custom,
    archiveTab:S.archiveTab, archiveYear:S.archiveYear, archiveTeam:S.archiveTeam, archiveEra:S.archiveEra,
    archiveFilterYear:S.archiveFilterYear, archiveCountry:S.archiveCountry, archivePosition:S.archivePosition,
    archiveTournament:S.archiveTournament
  };
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(data)); } catch {}
}

function squadFor(teamId, seed=0) {
  const key = `${teamId}:${seed}`;
  if (!squadCache.has(key)) squadCache.set(key, makeSquad(TEAM_MAP[teamId] || TEAMS[0], seed));
  return squadCache.get(key).map(p=>({...p}));
}
function squadRating(teamId) {
  const s=squadFor(teamId).filter(p=>p.number<=15);
  return Math.round(s.reduce((a,p)=>a+p.overall,0)/Math.max(1,s.length));
}
function team(id) { return TEAM_MAP[id] || TEAMS[0]; }

function crest(t, size=48, extra='') {
  if (!t) return '';
  const c1=t.colors?.[0]||'#235c43', c2=t.colors?.[1]||'#fff', c3=t.colors?.[2]||'#d9b45b';
  return `<span class="crest ${extra}" style="--c1:${c1};--c2:${c2};--c3:${c3};--crest:${size}px">
    <span class="crest-inner"><span class="crest-stripe"></span><b>${esc(t.abbr)}</b></span>
  </span>`;
}

const ICONS = {
  home:'M3 11.5 12 3l9 8.5V21h-6v-6H9v6H3z',
  trophy:'M7 3h10v3c0 4-2.2 7-5 7s-5-3-5-7V3zm-3 2h3v3c0 1.7.5 3 1 4-2.3-.5-4-2.4-4-5V5zm16 0h-3v3c0 1.7-.5 3-1 4 2.3-.5 4-2.4 4-5V5zM9 15h6v3h-6zM7 20h10v2H7z',
  career:'M12 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM4 21c0-4.4 3.6-8 8-8s8 3.6 8 8H4z',
  settings:'M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm8.4 4c0-.6-.1-1.2-.2-1.8l2.1-1.6-2-3.4-2.5 1a8 8 0 0 0-3-1.7L14.4 2h-4l-.4 2.5c-1.1.4-2.1 1-3 1.7l-2.5-1-2 3.4 2.1 1.6a9 9 0 0 0 0 3.6L2.5 15.4l2 3.4 2.5-1c.9.7 1.9 1.3 3 1.7l.4 2.5h4l.4-2.5c1.1-.4 2.1-1 3-1.7l2.5 1 2-3.4-2.1-1.6c.1-.6.2-1.2.2-1.8z',
  play:'M8 5v14l11-7z',
  arrow:'M5 12h14M13 6l6 6-6 6',
  back:'M19 12H5m6-6-6 6 6 6',
  whistle:'M3 10h9l5-4v12l-5-4H8a5 5 0 0 1-5-4zm15-2 3-1m-3 4h3m-3 3 3 1',
  ball:'M12 3c5 0 9 3.6 9 9s-4 9-9 9-9-3.6-9-9 4-9 9-9zm0 4c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z',
  globe:'M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2c-1.7 0-3.3 3.6-3.6 8h7.2C15.3 7.6 13.7 4 12 4zM4.3 9h3.9c.2-2.4.8-4.5 1.7-6A8 8 0 0 0 4.3 9zm0 6a8 8 0 0 0 5.6 6c-.9-1.5-1.5-3.6-1.7-6H4.3zm7.7 6c1.7 0 3.3-3.6 3.6-8h-7.2c.3 4.4 1.9 8 3.6 8zm4.1-6c-.2 2.4-.8 4.5-1.7 6a8 8 0 0 0 5.6-6h-3.9zm3.9-6h-3.9c-.2-2.4-.8-4.5-1.7-6a8 8 0 0 0 5.6 6z',
  pause:'M7 5h4v14H7zm6 0h4v14h-4z',
  chev:'M9 5l7 7-7 7',
  swap:'M7 7h11l-3-3m3 13H7l3 3',
  close:'M6 6l12 12M18 6 6 18',
  bolt:'M13 2 4 14h7l-1 8 9-12h-7z',
  shield:'M12 2 20 6v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z',
  chart:'M4 20V10h4v10H4zm6 0V4h4v16h-4zm6 0v-7h4v7h-4z',
  star:'M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8-6.1-3.5-6.1 3.5 1.5-6.8L2.2 9l6.9-.7z',
  calendar:'M5 4h14v17H5zM8 2v4m8-4v4M5 9h14',
  settings2:'M4 7h16M4 12h16M4 17h16',
  medal:'M8 3h8l-2 6h-4zM12 9a6 6 0 1 1 0 12 6 6 0 0 1 0-12z',
  lock:'M6 10V8a6 6 0 0 1 12 0v2h1v11H5V10zm3 0h6V8a3 3 0 0 0-6 0z',
  boot:'M4 5h7l2 7 7 3v4H4z',
  hand:'M8 11V5a2 2 0 0 1 4 0v5-7a2 2 0 0 1 4 0v7-5a2 2 0 0 1 4 0v11c0 4-3 7-7 7h-1c-3 0-5-2-6-4l-3-4a2 2 0 0 1 3-3l2 2z'
};
function icon(name,size=22,cls='') {
  return `<svg class="ic ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${ICONS[name]||ICONS.ball}"/></svg>`;
}

function trophySVG(cls='') {
  return `<svg class="trophy-svg ${cls}" viewBox="0 0 240 320" aria-hidden="true">
    <defs>
      <linearGradient id="goldA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1b5"/><stop offset=".22" stop-color="#e3bd63"/><stop offset=".55" stop-color="#b9822c"/><stop offset=".78" stop-color="#f3d987"/><stop offset="1" stop-color="#8c5c1f"/></linearGradient>
      <linearGradient id="goldB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a3"/><stop offset="1" stop-color="#a96f24"/></linearGradient>
      <radialGradient id="shine"><stop offset="0" stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    </defs>
    <ellipse cx="120" cy="299" rx="67" ry="12" fill="rgba(0,0,0,.35)"/>
    <path d="M73 63c4 55 12 98 47 112 35-14 43-57 47-112" fill="url(#goldA)" stroke="#6b4617" stroke-width="3"/>
    <path d="M79 68c5 44 14 78 41 93 27-15 36-49 41-93" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="5"/>
    <path d="M75 66c-22-2-35 11-33 31 2 20 19 32 43 34M165 66c22-2 35 11 33 31-2 20-19 32-43 34" fill="none" stroke="url(#goldA)" stroke-width="11" stroke-linecap="round"/>
    <path d="M71 58c0-9 8-16 18-16h62c10 0 18 7 18 16v9H71z" fill="url(#goldB)" stroke="#6b4617" stroke-width="3"/>
    <path d="M120 175c-8 12-12 22-12 33h24c0-11-4-21-12-33z" fill="url(#goldA)"/>
    <path d="M97 208h46l5 24H92z" fill="url(#goldB)" stroke="#6b4617" stroke-width="3"/>
    <path d="M84 232h72l9 44H75z" fill="url(#goldA)" stroke="#6b4617" stroke-width="3"/>
    <path d="M91 241h58l-4 12H95z" fill="#163d2a" opacity=".8"/>
    <path d="M88 262h64l3 9H85z" fill="#163d2a" opacity=".55"/>
    <text x="120" y="253" font-family="Arial Narrow,Arial" font-size="9" font-weight="800" text-anchor="middle" fill="#f6d985">WORLD RUGBY</text>
    <circle cx="91" cy="84" r="24" fill="url(#shine)"/>
  </svg>`;
}

function emptyState(title, body, action, label) {
  return `<div class="empty-state"><div class="empty-mark">${icon('ball',34)}</div><h3>${title}</h3><p>${body}</p>${action?`<button class="btn gold" data-action="${action}">${label}</button>`:''}</div>`;
}

function navBar() {
  const items = [
    ['home','Home','home'],['tournament','World Cup','trophy'],['career','Career','career'],['settings','More','settings']
  ];
  return items.map(([r,label,ic])=>`<button class="nav-item ${S.route===r?'active':''}" data-action="nav:${r}" aria-label="${label}">
    ${icon(ic,21)}<span>${label}</span></button>`).join('');
}
function renderNav() {
  const nav=$('#bottom-nav');
  const hide=['match','goal','prematch'].includes(S.route);
  nav.classList.toggle('hidden',hide);
  nav.innerHTML=hide?'':navBar();
  document.body.classList.toggle('in-match',S.route==='match');
}

function toast(msg, type='info') {
  const el=$('#toast');
  el.className=`toast show ${type}`;
  el.innerHTML=`${type==='success'?'<span class="toast-dot"></span>':''}${esc(msg)}`;
  clearTimeout(S.toastTimer);
  S.toastTimer=setTimeout(()=>el.classList.remove('show'),3200);
}

function showModal(html, cls='') {
  const layer=$('#modal-layer');
  layer.innerHTML=`<div class="modal-backdrop"></div><div class="modal ${cls}" role="dialog" aria-modal="true">${html}</div>`;
  layer.classList.add('open');
  document.body.classList.add('modal-open');
  requestAnimationFrame(()=>layer.querySelector('.modal')?.classList.add('in'));
}
function closeModal() {
  const layer=$('#modal-layer');
  layer.classList.remove('open');
  document.body.classList.remove('modal-open');
  setTimeout(()=>{ if(!layer.classList.contains('open')) layer.innerHTML=''; },220);
}
function modalHead(title, sub='') {
  return `<div class="modal-head"><div><span class="kicker">${sub}</span><h2>${title}</h2></div><button class="icon-btn" data-action="modal:close" aria-label="Close">${icon('close',20)}</button></div>`;
}

function go(route) {
  if (S.route==='match' && route!=='match') stopMatch();
  S.route=route;
  window.scrollTo({top:0,behavior:'instant'});
  render();
}

function homeScreen() {
  const t=S.tournament && !S.tournament.champion ? S.tournament : null;
  const c=S.career && !S.career.seasonComplete ? S.career : null;
  const nextT=t?nextUserFixture(t):null;
  const nextC=c?nextCareerFixture(c):null;
  const heroTeam=team(S.selectedTeam);
  return `<div class="page home-page">
    <header class="topbar">
      <div class="brand"><span class="brand-mark">${icon('shield',20)}</span><div><b>WORLD RUGBY</b><span>MOBILE 26</span></div></div>
      <div class="top-actions">
        <button class="icon-btn" data-action="nav:settings" aria-label="Settings">${icon('settings',20)}</button>
        <button class="avatar" data-action="nav:career" aria-label="Career">${crest(heroTeam,34)}</button>
      </div>
    </header>

    <section class="hero">
      <div class="hero-lights"></div><div class="hero-crowd"></div><div class="hero-pitch"></div>
      <div class="hero-copy">
        <div class="eyebrow"><span class="live-dot"></span> THE PINNACLE OF RUGBY</div>
        <h1>RUGBY<br><span>WORLD CUP</span> <em>26</em></h1>
        <p>Every scrum. Every tackle. Every nation.<br>A deep 15-a-side simulation built for your pocket.</p>
        <div class="hero-actions">
          <button class="btn gold lg" data-action="nav:tournament">${icon('trophy',19)} ENTER TOURNAMENT</button>
          <button class="btn glass lg" data-action="quick:open">${icon('play',18)} QUICK MATCH</button>
        </div>
      </div>
      <div class="hero-trophy">${trophySVG()}<div class="hero-trophy-glow"></div></div>
      <div class="hero-meta"><span><b>24</b> NATIONS</span><span><b>48</b> MATCHES</span><span><b>1</b> TROPHY</span></div>
    </section>

    <div class="content-wrap">
      ${t?`<section class="continue-card" data-action="nav:tournament">
        <div class="continue-badge">YOUR TOURNAMENT</div>
        <div class="continue-main">
          <div class="mini-crest">${crest(team(t.userTeamId),40)}</div>
          <div><h3>${esc(t.name)}</h3><p>${nextT?`${team(nextT.homeId).abbr} v ${team(nextT.awayId).abbr} • ${currentStageLabel(t)}`:`${currentStageLabel(t)} • ${t.champion?'Complete':'Ready to advance'}`}</p></div>
          <span class="round-arrow">${icon('chev',20)}</span>
        </div>
        <div class="continue-progress"><span style="width:${tournamentProgress(t)}%"></span></div>
      </section>`:''}
      ${c?`<section class="continue-card career" data-action="nav:career">
        <div class="continue-badge">CAREER • SEASON ${c.season}</div>
        <div class="continue-main">
          <div class="mini-crest">${crest(team(c.teamId),40)}</div>
          <div><h3>${esc(team(c.teamId).name)}</h3><p>${nextC?`Next: ${team(nextC.homeId).name} v ${team(nextC.awayId).name}`:`Season complete`} • Chemistry ${c.chemistry}%</p></div>
          <span class="round-arrow">${icon('chev',20)}</span>
        </div>
      </section>`:''}

      <section class="section">
        <div class="section-head"><div><span class="kicker">CHOOSE YOUR PATH</span><h2>Game Modes</h2></div><span class="section-count">08</span></div>
        <div class="mode-grid">
          <button class="mode-card mode-large" data-action="nav:tournament">
            <span class="mode-icon gold-bg">${icon('trophy',25)}</span>
            <span class="mode-text"><b>World Cup 2026</b><small>Pools • Knockouts • Glory</small></span>
            <span class="mode-tag">FLAGSHIP</span>
            <div class="mode-art">${trophySVG('mini')}</div>
          </button>
          <button class="mode-card" data-action="quick:open"><span class="mode-icon">${icon('bolt',22)}</span><span class="mode-text"><b>Quick Match</b><small>Jump straight in</small></span></button>
          <button class="mode-card" data-action="nav:career"><span class="mode-icon">${icon('career',22)}</span><span class="mode-text"><b>Career</b><small>Build a dynasty</small></span></button>
          <button class="mode-card" data-action="nav:historical"><span class="mode-icon">${icon('calendar',22)}</span><span class="mode-text"><b>Classic Cups</b><small>Relive history</small></span></button>
          <button class="mode-card" data-action="nav:custom"><span class="mode-icon">${icon('globe',22)}</span><span class="mode-text"><b>Custom Cup</b><small>Your tournament</small></span></button>
          <button class="mode-card" data-action="nav:training"><span class="mode-icon">${icon('medal',22)}</span><span class="mode-text"><b>Training</b><small>Sharpen your game</small></span></button>
          <button class="mode-card" data-action="quick:open"><span class="mode-icon">${icon('shield',22)}</span><span class="mode-text"><b>Exhibition</b><small>Any nations, any night</small></span></button>
          <button class="mode-card" data-action="nav:historical"><span class="mode-icon">${icon('star',22)}</span><span class="mode-text"><b>Legends</b><small>Historic greats</small></span></button>
        </div>
      </section>

      <section class="section fixtures-section">
        <div class="section-head"><div><span class="kicker">LIVE FROM THE TOURNAMENT</span><h2>Matchday</h2></div><button class="text-btn" data-action="nav:tournament">ALL FIXTURES ${icon('arrow',14)}</button></div>
        <div class="fixture-strip">
          ${featuredFixtures().map(f=>`<div class="fixture-card">
            <div class="fixture-top"><span>${f.label}</span><b>${f.time}</b></div>
            <div class="fixture-teams"><span>${crest(team(f.a),34)}<b>${team(f.a).abbr}</b></span><em>V</em><span>${crest(team(f.b),34)}<b>${team(f.b).abbr}</b></span></div>
            <div class="fixture-venue">${esc(f.venue)}</div>
          </div>`).join('')}
        </div>
      </section>

      <section class="spotlight">
        <div class="spotlight-copy"><span class="kicker gold">FEATURED SQUAD</span><h2>${esc(heroTeam.name)}</h2><p>${esc(heroTeam.nick)} • ${heroTeam.styleLabel}<br><b>${squadRating(heroTeam.id)}</b> squad rating</p><button class="btn ghost sm" data-action="team:inspect" data-team="${heroTeam.id}">VIEW SQUAD ${icon('arrow',14)}</button></div>
        <div class="spotlight-crest">${crest(heroTeam,112)}<div class="crest-ring"></div></div>
        <div class="spotlight-lines"></div>
      </section>

      <footer class="home-footer"><span>${icon('ball',14)} 15-A-SIDE RUGBY SIMULATION</span><span>v1.0 • MOBILE</span></footer>
    </div>
  </div>`;
}

function featuredFixtures() {
  return [
    {a:'en',b:'fj',label:'POOL A • OPENING NIGHT',time:'20:00',venue:'Stade de France'},
    {a:'nz',b:'za',label:'POOL B • BLOCKBUSTER',time:'17:45',venue:'Eden Park'},
    {a:'fr',b:'ie',label:'POOL C • LE CRUNCH',time:'21:00',venue:'Aviva Stadium'}
  ];
}
function tournamentProgress(t) {
  if(t.champion)return 100;
  if(t.stage==='group')return clamp((t.groupRound-1)/t.maxGroupRound*55,5,55);
  return {qf:68,sf:82,third:92,final:94,complete:100}[t.stage]||10;
}

function quickScreen() {
  const h=team(S.quick.home),a=team(S.quick.away);
  return `<div class="page sub-page">
    ${subHeader('Quick Match','EXHIBITION • 15 A-SIDE')}
    <div class="content-wrap">
      <section class="versus-card">
        <div class="versus-bg"></div>
        <div class="team-select" data-action="team:pick" data-side="home">
          <span class="pick-label">HOME</span>${crest(h,76)}<h2>${esc(h.name)}</h2><p>${esc(h.nick)}</p>
          <div class="rating-pill"><b>${squadRating(h.id)}</b> OVR <span>${h.styleLabel}</span></div>
        </div>
        <button class="swap-btn" data-action="quick:swap" aria-label="Swap teams">${icon('swap',20)}</button>
        <div class="versus-mid"><span>V</span><small>WORLD RUGBY</small></div>
        <div class="team-select" data-action="team:pick" data-side="away">
          <span class="pick-label">AWAY</span>${crest(a,76)}<h2>${esc(a.name)}</h2><p>${esc(a.nick)}</p>
          <div class="rating-pill"><b>${squadRating(a.id)}</b> OVR <span>${a.styleLabel}</span></div>
        </div>
      </section>
      <div class="tap-hint">${icon('swap',13)} Tap either team to change nation</div>

      <section class="settings-panel">
        <div class="panel-row"><div><label>MATCH LENGTH</label><small>Real minutes per half</small></div>
          <div class="segmented">${[2,3,4].map(n=>`<button class="${S.quick.half===n?'active':''}" data-action="quick:half" data-val="${n}">${n} MIN</button>`).join('')}</div>
        </div>
        <div class="panel-row"><div><label>DIFFICULTY</label><small>AI decision quality</small></div>
          <div class="segmented">${[['amateur','ROOKIE'],['pro','PRO'],['elite','ELITE']].map(([k,l])=>`<button class="${S.quick.difficulty===k?'active':''}" data-action="quick:difficulty" data-val="${k}">${l}</button>`).join('')}</div>
        </div>
        <div class="panel-row"><div><label>VENUE</label><small>Atmosphere & conditions</small></div>
          <select class="select" id="quick-venue">${STADIUMS.map(v=>`<option>${esc(v)}</option>`).join('')}</select>
        </div>
      </section>

      <div class="match-preview">
        <div class="preview-stat"><span>FORM</span><div class="form-dots">${formDots('en')}</div></div>
        <div class="preview-stat"><span>HEAD TO HEAD</span><b>${headToHead(h.id,a.id)}</b></div>
        <div class="preview-stat"><span>WEATHER</span><b>Clear • 14°C</b></div>
      </div>

      <button class="btn gold full xl" data-action="quick:kickoff">${icon('whistle',20)} KICK OFF</button>
      <p class="fine-print">Full 15-a-side laws • Scrums, lineouts, rucks, mauls • 23-player squads</p>
    </div>
  </div>`;
}

function subHeader(title, sub) {
  return `<header class="sub-header"><button class="icon-btn" data-action="nav:home" aria-label="Back">${icon('back',20)}</button><div><span class="kicker">${sub}</span><h1>${title}</h1></div><button class="icon-btn" data-action="nav:settings" aria-label="Settings">${icon('settings',19)}</button></header>`;
}
function formDots(id) {
  const r=[];for(let i=0;i<5;i++){r.push(Math.random()>.42?'W':'L');}
  return r.map(x=>`<i class="${x==='W'?'win':'loss'}">${x}</i>`).join('');
}
function headToHead(a,b) {
  const r=((a.charCodeAt(0)+b.charCodeAt(1))%3);
  return ['2 – 2','3 – 1','1 – 3'][r];
}

function settingsScreen() {
  return `<div class="page sub-page">
    ${subHeader('Settings','PREFERENCES')}
    <div class="content-wrap">
      <section class="settings-panel">
        <h3 class="panel-title">PRESENTATION</h3>
        ${toggleRow('Sound & crowd','Stadium audio, whistles, kicks','sound',S.settings.sound)}
        ${toggleRow('Haptics','Impact feedback on tackles','haptics',S.settings.haptics)}
        ${toggleRow('Commentary ticker','Live text commentary','commentary',S.settings.commentary)}
      </section>
      <section class="settings-panel">
        <h3 class="panel-title">CONTROLS</h3>
        <div class="panel-row column"><div class="row-between"><div><label>CONTROL SIZE</label><small>Joystick and button scale</small></div><b id="scale-val">${Math.round(S.settings.controlScale*100)}%</b></div>
          <input class="range" type="range" min="80" max="125" value="${Math.round(S.settings.controlScale*100)}" data-setting="controlScale" data-scale="100">
        </div>
        <div class="panel-row column"><div class="row-between"><div><label>JOYSTICK SENSITIVITY</label><small>How quickly input reaches full speed</small></div><b id="sens-val">${Math.round(S.settings.sensitivity*100)}%</b></div>
          <input class="range" type="range" min="70" max="130" value="${Math.round(S.settings.sensitivity*100)}" data-setting="sensitivity" data-scale="100">
        </div>
        <div class="panel-row"><div><label>BUTTON LAYOUT</label><small>Left or right-handed</small></div><div class="segmented"><button class="${S.settings.layout==='right'?'active':''}" data-action="setting:layout" data-val="right">RIGHT</button><button class="${S.settings.layout==='left'?'active':''}" data-action="setting:layout" data-val="left">LEFT</button></div></div>
      </section>
      <section class="settings-panel">
        <h3 class="panel-title">GAMEPLAY</h3>
        <div class="panel-row"><div><label>DIFFICULTY</label><small>Default for quick matches</small></div><div class="segmented">${[['amateur','ROOKIE'],['pro','PRO'],['elite','ELITE']].map(([k,l])=>`<button class="${S.settings.difficulty===k?'active':''}" data-action="setting:difficulty" data-val="${k}">${l}</button>`).join('')}</div></div>
        <div class="panel-row"><div><label>CAMERA ZOOM</label><small>Match framing</small></div><div class="segmented">${[['close','CLOSE'],['normal','NORMAL'],['wide','WIDE']].map(([k,l])=>`<button class="${S.settings.cameraZoom===(k==='close'?1.12:k==='wide'?.9:1)?'active':''}" data-action="setting:camera" data-val="${k}">${l}</button>`).join('')}</div></div>
      </section>
      <section class="settings-panel">
        <h3 class="panel-title">DATA</h3>
        <div class="panel-row"><div><label>SAVE PROGRESS</label><small>Tournament and career are saved on this device</small></div><button class="btn ghost sm" data-action="settings:save">SAVE NOW</button></div>
        <div class="panel-row"><div><label>RESET ALL DATA</label><small>Deletes tournaments, careers and unlocks</small></div><button class="btn danger sm" data-action="settings:reset">RESET</button></div>
      </section>
      <div class="about-card"><div class="brand-mark lg">${icon('shield',28)}</div><div><b>RUGBY WORLD CUP 26</b><span>Version 1.0.0 • Built mobile-first</span><p>A compact but deep rugby union simulation. Every match is driven by attributes, momentum, positioning and decisions.</p></div></div>
    </div>
  </div>`;
}
function toggleRow(label,sub,key,on) {
  return `<div class="panel-row"><div><label>${label}</label><small>${sub}</small></div><button class="toggle ${on?'on':''}" data-action="setting:toggle" data-key="${key}" aria-label="${label}"><span></span></button></div>`;
}

/* ---------------- Tournament ---------------- */
function tournamentScreen() {
  const t=S.tournament;
  if(!t) return noTournamentView();
  return tournamentHub(t);
}

function noTournamentView() {
  const chosen=team(S.tournamentTeam);
  return `<div class="page sub-page tournament-page">
    ${subHeader('World Cup','THE FLAGSHIP COMPETITION')}
    <div class="content-wrap">
      <section class="tournament-hero">
        <div class="tourney-glow"></div>
        <div class="tourney-trophy">${trophySVG()}</div>
        <span class="kicker gold">RUGBY WORLD CUP 2026</span>
        <h1>THE ROAD<br>TO GLORY</h1>
        <p>Twenty nations. Four pools. One Webb Ellis Cup. Take a nation all the way through the pool stage, quarter-finals, semi-finals and the final under the lights.</p>
        <div class="tourney-facts"><span><b>20</b>TEAMS</span><span><b>40</b>POOL MATCHES</span><span><b>8</b>KNOCKOUTS</span></div>
      </section>

      <section class="choose-nation">
        <div class="section-head"><div><span class="kicker">YOUR NATION</span><h2>Choose your team</h2></div><button class="text-btn" data-action="team:pick" data-mode="tournament">CHANGE ${icon('swap',13)}</button></div>
        <button class="nation-pick" data-action="team:pick" data-mode="tournament">
          ${crest(chosen,76)}
          <div class="nation-info"><span>${esc(chosen.nick)}</span><h2>${esc(chosen.name)}</h2><p>${esc(chosen.styleLabel)} • Squad rating ${squadRating(chosen.id)}</p></div>
          <span class="chev">${icon('chev',20)}</span>
        </button>
      </section>

      <section class="format-card">
        <div class="format-row"><span class="format-icon">${icon('shield',20)}</span><div><b>Official-style format</b><p>4 pools of 5 • Top two qualify • QF, SF, third-place play-off and final</p></div></div>
        <div class="format-row"><span class="format-icon">${icon('chart',20)}</span><div><b>Full standings & bonus points</b><p>Win = 4 pts • Draw = 2 • Try and losing bonus points</p></div></div>
        <div class="format-row"><span class="format-icon">${icon('trophy',20)}</span><div><b>Trophy presentation</b><p>Lift the Webb Ellis Cup with a full championship celebration</p></div></div>
      </section>

      <button class="btn gold full xl" data-action="tour:start">${icon('trophy',20)} DRAW THE POOLS & BEGIN</button>
      <button class="btn glass full" data-action="nav:custom">${icon('globe',17)} CREATE A CUSTOM TOURNAMENT</button>
      <p class="fine-print">Your tournament is saved automatically after every match.</p>
    </div>
  </div>`;
}

function tournamentHub(t) {
  const user=team(t.userTeamId);
  const next=nextUserFixture(t);
  const complete=!!t.champion;
  const groupTabs=t.groups.map((g,i)=>`<button class="${S.tournamentGroup===i?'active':''}" data-action="tour:group" data-i="${i}">POOL ${'ABCD'[i]||i+1}</button>`).join('');
  const table=standingsFor(t,S.tournamentGroup);
  return `<div class="page sub-page tournament-page">
    ${subHeader(complete?'Champions':'World Cup',complete?'TOURNAMENT COMPLETE':currentStageLabel(t).toUpperCase())}
    <div class="content-wrap">
      <section class="tourney-status">
        <div class="status-top">
          <div class="status-team">${crest(user,54)}<div><span>YOUR NATION</span><h2>${esc(user.name)}</h2></div></div>
          <div class="status-stage"><span>STAGE</span><b>${complete?'COMPLETE':currentStageLabel(t)}</b></div>
        </div>
        <div class="tourney-progress"><span style="width:${tournamentProgress(t)}%"></span></div>
        <div class="status-bottom"><span>${t.edition?`CLASSIC ${t.edition}`:'2026 TOURNAMENT'}</span><span>${t.fixtures.filter(f=>f.played).length}/${t.fixtures.length} MATCHES PLAYED</span></div>
      </section>

      ${complete?championCard(t):next?nextMatchCard(t,next):advanceCard(t)}

      ${!complete?`<section class="section">
        <div class="section-head"><div><span class="kicker">POOL STAGE</span><h2>Standings</h2></div><span class="section-count">PTS</span></div>
        <div class="tabs pool-tabs">${groupTabs}</div>
        ${groupTable(t,S.tournamentGroup)}
      </section>
      ${t.stage==='group'?`<section class="section"><div class="section-head"><div><span class="kicker">ROUND ${t.groupRound}</span><h2>Fixtures</h2></div><button class="text-btn" data-action="tour:simround">SIMULATE ROUND ${icon('play',12)}</button></div>${fixtureList(t)}</section>`:''}
      ${t.stage!=='group'?bracketView(t):''}
      `:''}

      <div class="tourney-footer-actions">
        ${!complete?`<button class="btn ghost sm" data-action="tour:new">NEW TOURNAMENT</button>`:''}
        ${complete?`<button class="btn gold" data-action="tour:new">${icon('trophy',17)} START A NEW CUP</button>`:''}
      </div>
    </div>
  </div>`;
}

function nextMatchCard(t,f) {
  const h=team(f.homeId),a=team(f.awayId);
  const userIsHome=f.homeId===t.userTeamId;
  const label=f.stage==='group'?`POOL ${'ABCD'[f.group]||f.group+1} • ROUND ${f.round}`:{qf:'QUARTER-FINAL',sf:'SEMI-FINAL',third:'THIRD-PLACE PLAY-OFF',final:'WORLD CUP FINAL'}[f.stage];
  return `<section class="next-match">
    <div class="next-label"><span class="live-dot"></span> ${label} <b>${esc(f.venue)}</b></div>
    <div class="next-teams">
      <div class="next-side ${userIsHome?'mine':''}">${crest(h,58)}<h3>${esc(h.abbr)}</h3><span>${esc(h.name)}</span>${userIsHome?'<em>YOU</em>':''}</div>
      <div class="next-v"><span>V</span><small>${f.stage==='final'?'FINAL':f.stage==='qf'?'QF':f.stage==='sf'?'SF':'POOL'}</small></div>
      <div class="next-side ${!userIsHome?'mine':''}">${crest(a,58)}<h3>${esc(a.abbr)}</h3><span>${esc(a.name)}</span>${!userIsHome?'<em>YOU</em>':''}</div>
    </div>
    <div class="next-actions"><button class="btn gold" data-action="tour:play">${icon('play',17)} PLAY MATCH</button><button class="btn ghost" data-action="tour:sim">${icon('bolt',16)} SIMULATE</button></div>
  </section>`;
}

function advanceCard(t) {
  const label=t.stage==='group'?`Round ${t.groupRound}`:currentStageLabel(t);
  return `<section class="advance-card"><div class="advance-icon">${icon('calendar',26)}</div><div><h3>${label} is ready</h3><p>${t.champion?'The tournament is complete.':'Your next match is being decided. Advance the competition.'}</p></div><button class="btn gold sm" data-action="tour:advance">ADVANCE ${icon('arrow',14)}</button></section>`;
}

function groupTable(t,gi) {
  const rows=standingsFor(t,gi);
  return `<div class="table-wrap"><table class="standings-table"><thead><tr><th>#</th><th class="left">TEAM</th><th>P</th><th>W</th><th>D</th><th>L</th><th>+/-</th><th>B</th><th>PTS</th></tr></thead><tbody>
    ${rows.map((r,i)=>{const tm=team(r.id);return `<tr class="${r.id===t.userTeamId?'user-row':''} ${i<2?'qualify':''}">
      <td>${i+1}</td><td class="left"><span class="tbl-team">${crest(tm,26)}<b>${esc(tm.abbr)}</b><span>${esc(tm.name)}</span></span></td>
      <td>${r.p}</td><td>${r.w}</td><td>${r.d}</td><td>${r.l}</td><td>${r.diff>0?'+':''}${r.diff}</td><td>${r.bonus}</td><td class="pts">${r.pts}</td>
    </tr>`}).join('')}
  </tbody></table></div><div class="table-note"><span class="q-dot"></span> Top two progress to the knockout stage</div>`;
}

function fixtureList(t) {
  const fs=t.fixtures.filter(f=>f.stage==='group'&&f.round===t.groupRound);
  return `<div class="fixture-list">${fs.map(f=>{
    const h=team(f.homeId),a=team(f.awayId);
    return `<div class="fixture-row ${f.played?'played':''} ${(f.homeId===t.userTeamId||f.awayId===t.userTeamId)?'mine':''}">
      <span class="fx-team">${crest(h,28)}<b>${h.abbr}</b></span>
      <span class="fx-score">${f.played?`${f.homeScore} – ${f.awayScore}`:'VS'}</span>
      <span class="fx-team away"><b>${a.abbr}</b>${crest(a,28)}</span>
      ${f.played?`<span class="fx-ft">FT</span>`:''}
    </div>`}).join('')}</div>`;
}

function bracketView(t) {
  const stages=[['qf','QUARTER-FINALS'],['sf','SEMI-FINALS'],['final','FINAL']];
  return `<section class="section"><div class="section-head"><div><span class="kicker">KNOCKOUT STAGE</span><h2>Road to the final</h2></div></div>
    <div class="bracket">${stages.map(([stage,label])=>{
      const fs=t.fixtures.filter(f=>f.stage===stage);
      return `<div class="bracket-col"><h4>${label}</h4>${fs.length?fs.map(f=>{
        const h=f.homeId?team(f.homeId):null,a=f.awayId?team(f.awayId):null;
        return `<div class="bracket-match ${f.played?'done':''}">
          <div class="bm-team ${f.played&&f.homeScore>f.awayScore?'win':''}">${h?crest(h,24):'<span class="tbd-crest">?</span>'}<span>${h?h.abbr:'TBD'}</span><b>${f.played?f.homeScore:''}</b></div>
          <div class="bm-team ${f.played&&f.awayScore>f.homeScore?'win':''}">${a?crest(a,24):'<span class="tbd-crest">?</span>'}<span>${a?a.abbr:'TBD'}</span><b>${f.played?f.awayScore:''}</b></div>
        </div>`}).join(''):`<div class="bracket-empty">Awaiting qualifiers</div>`}</div>`;
    }).join('')}</div>
    <div class="bracket-third">${t.fixtures.filter(f=>f.stage==='third').map(f=>`<span>3RD PLACE</span><b>${f.homeId?team(f.homeId).abbr:'TBD'} ${f.played?f.homeScore+' – '+f.awayScore:'v'} ${f.awayId?team(f.awayId).abbr:'TBD'}</b>`).join('')}</div>
  </section>`;
}

function championCard(t) {
  const champ=team(t.champion), userWon=t.champion===t.userTeamId;
  return `<section class="champion-card ${userWon?'user-champ':''}">
    <div class="confetti-css">${Array.from({length:24},(_,i)=>`<i style="--x:${(i*37)%100}%;--d:${(i%7)*.25}s;--c:${['#d9b45b','#fff','#7fe1a3','#f06b5b'][i%4]}"></i>`).join('')}</div>
    <div class="champ-trophy">${trophySVG()}</div>
    <span class="kicker gold">${t.edition?t.edition+' CLASSIC':'WORLD CHAMPIONS'}</span>
    <h1>${esc(champ.name)}</h1>
    <p>${esc(champ.nick)} lift the Webb Ellis Cup${userWon?' — your tournament, your legacy.':'.'}</p>
    <div class="champ-podium"><div><span>WINNERS</span><b>${champ.abbr}</b></div><div><span>RUNNERS-UP</span><b>${t.runnerUp?team(t.runnerUp).abbr:'—'}</b></div><div><span>THIRD</span><b>${t.thirdPlace?team(t.thirdPlace).abbr:'—'}</b></div></div>
    <button class="btn gold" data-action="tour:celebrate">${icon('trophy',17)} LIFT THE TROPHY</button>
  </section>`;
}

function archiveTabs() {
  const tabs = [['cups','WORLD CUPS'],['eras','ERAS'],['nations','NATIONS'],['legends','LEGENDS']];
  return `<div class="tabs archive-tabs">${tabs.map(([id,label])=>`<button class="${S.archiveTab===id?'active':''}" data-action="hist:tab" data-tab="${id}">${label}</button>`).join('')}</div>`;
}

function archiveCups() {
  return `<div class="classic-grid">${HISTORIC_EDITIONS.slice().reverse().map(e=>{
    const w=team(e.winner);
    return `<button class="classic-card" data-action="hist:open" data-year="${e.year}" style="--era:${e.colour}">
      <span class="classic-year">${e.year}</span>
      <div class="classic-winner">${crest(w,50)}<div><b>${esc(w.name)}</b><span>${esc(w.nick)}</span></div></div>
      <div class="classic-meta"><span>HOST</span><b>${esc(e.host)}</b></div>
      <div class="classic-score"><span>FINAL</span><b>${esc(e.score)}</b><em>v ${esc(team(e.runnerUp).abbr)}</em></div>
      <div class="classic-star">${icon('star',12)} ${esc(e.star)}</div>
    </button>`;
  }).join('')}</div>
  <section class="section archive-section"><div class="section-head"><div><span class="kicker">DREAM FIXTURES</span><h2>Great teams, head to head</h2></div><span class="section-count">${DREAM_MATCHES.length}</span></div>
    <div class="dream-scroll">${DREAM_MATCHES.map(d=>`<button class="dream-card" data-action="hist:dream" data-id="${d.id}">
      <span class="dream-label">${esc(d.label)}</span>
      <div class="dream-teams"><span>${crest(team(d.home[0]),34)}<b>${esc(team(d.home[0]).abbr)} '${String(d.home[1]).slice(2)}</b></span><i>V</i><span>${crest(team(d.away[0]),34)}<b>${esc(team(d.away[0]).abbr)} '${String(d.away[1]).slice(2)}</b></span></div>
      <p>${esc(d.note)}</p><em>PLAY FIXTURE ${icon('arrow',12)}</em>
    </button>`).join('')}</div>
  </section>
  <section class="section archive-section"><div class="section-head"><div><span class="kicker">CHAMPIONSHIP ARCHIVE</span><h2>Five & Six Nations</h2></div><span class="section-count">1975–2025</span></div>
    <div class="champ-list">${CHAMPIONSHIP_HISTORY.slice().reverse().slice(0,12).map(c=>`<div class="champ-row"><b>${c.year}</b><span>${esc(c.competition)}</span><strong>${esc(c.winner)}</strong>${c.shared?`<em>shared with ${esc(c.shared)}</em>`:''}</div>`).join('')}</div>
  </section>`;
}

function archiveEras() {
  return `<div class="era-list">${ERAS.map(e=>{
    const stars=e.stars.map(id=>PLAYER_BY_ID[id]).filter(Boolean);
    return `<button class="era-card" data-action="hist:era" data-era="${e.id}" style="--era:${e.colour}">
      <div class="era-top"><span class="era-years">${e.from}–${e.to}</span><span class="era-count">${stars.length} featured</span></div>
      <h3>${esc(e.label)}</h3><span class="era-tagline">${esc(e.tagline)}</span>
      <p>${esc(e.blurb)}</p>
      <div class="era-stars">${stars.slice(0,4).map(p=>`<span>${esc(p.name.split(' ').slice(-1)[0])}</span>`).join('')}</div>
      <div class="era-themes">${e.themes.map(t=>`<span>${esc(t)}</span>`).join('')}</div>
    </button>`;
  }).join('')}</div>`;
}

function archiveNations() {
  const list=TEAMS.slice().sort((a,b)=>(archiveSummary(b.id).players||0)-(archiveSummary(a.id).players||0));
  return `<div class="archive-nation-grid">${list.map(t=>{
    const s=archiveSummary(t.id), rec=s.record;
    return `<button class="archive-nation" data-action="hist:team" data-team="${t.id}">
      ${crest(t,44)}<div><b>${esc(t.name)}</b><span>${esc(t.nick)}</span><small>${s.players} archive players</small></div>
      <em>${rec?.titles?`${rec.titles}× WORLD CHAMPION`:esc(rec?.best||'Archive')}</em>
    </button>`;
  }).join('')}</div>
  <div class="archive-note">${icon('chart',15)} Career totals are public-record snapshots. Ratings and attributes are clearly marked gameplay estimates.</div>`;
}

function archivePosGroup(pos) {
  if (['LHP','THP','HK','LK','BSF','OSF','N8','FL'].includes(pos)) return 'FWD';
  if (['SH','FH'].includes(pos)) return 'HALF';
  if (['IC','OC','CTR'].includes(pos)) return 'MID';
  return 'OUT';
}

function archiveLegends() {
  const years=[0,1975,1987,1995,2003,2011,2019,2026];
  const cups=[0,1987,1991,1995,1999,2003,2007,2011,2015,2019,2023];
  const positions=[['','ALL'],['FWD','FORWARDS'],['HALF','HALVES'],['MID','CENTRES'],['OUT','OUTSIDE']];
  const nations=TEAMS.filter(t=>(PLAYERS_BY_COUNTRY[t.id]||[]).length);
  let legends=allTimeGreats();
  if(S.archiveCountry) legends=legends.filter(p=>p.countryId===S.archiveCountry);
  if(S.archivePosition) legends=legends.filter(p=>archivePosGroup(p.position)===S.archivePosition);
  if(S.archiveFilterYear) legends=legends.filter(p=>p.debut<=S.archiveFilterYear&&(p.retired==null||p.retired>=S.archiveFilterYear));
  if(S.archiveTournament) legends=legends.filter(p=>(p.worldCups||[]).includes(S.archiveTournament));
  legends=legends.slice(0,60);
  return `<div class="archive-filters">
    <div class="filter-row"><span>YEAR</span><div class="filter-chips">${years.map(y=>`<button class="${S.archiveFilterYear===y?'active':''}" data-action="hist:filter" data-key="archiveFilterYear" data-value="${y}">${y||'ALL'}</button>`).join('')}</div></div>
    <div class="filter-row"><span>POSITION</span><div class="filter-chips">${positions.map(([v,l])=>`<button class="${S.archivePosition===v?'active':''}" data-action="hist:filter" data-key="archivePosition" data-value="${v}">${l}</button>`).join('')}</div></div>
    <div class="filter-row"><span>WORLD CUP</span><div class="filter-chips">${cups.map(y=>`<button class="${S.archiveTournament===y?'active':''}" data-action="hist:filter" data-key="archiveTournament" data-value="${y}">${y||'ALL'}</button>`).join('')}</div></div>
    <div class="filter-row"><span>NATION</span><select id="archive-country" class="archive-select"><option value="">ALL NATIONS</option>${nations.map(t=>`<option value="${t.id}" ${S.archiveCountry===t.id?'selected':''}>${esc(t.name)}</option>`).join('')}</select></div>
    <div class="filter-count">${legends.length} PLAYER${legends.length===1?'':'S'} • RATINGS ARE GAMEPLAY ESTIMATES</div>
  </div>
  <div class="archive-legend-list">${legends.map((p,i)=>`<button class="archive-legend" data-action="hist:player" data-player="${p.id}">
    <span class="al-rank">${String(i+1).padStart(2,'0')}</span>
    <span class="al-flag">${TEAM_MAP[p.countryId]?.flag||''}</span>
    <div><b>${esc(p.name)}</b><span>${esc(TEAM_MAP[p.countryId]?.name||'')} • ${esc(p.position)} • ${p.debut}–${p.retired??'—'}</span><small>${esc((p.traits||[]).slice(0,2).join(' • '))}</small></div>
    <em>${p.rating}<small>EST</small></em>
  </button>`).join('')}</div>`;
}

function historicalScreen() {
  return `<div class="page sub-page archive-page">
    ${subHeader('The Archive','1975 TO TODAY')}
    <div class="content-wrap">
      <section class="classic-hero archive-hero"><span class="kicker gold">RUGBY HISTORY</span><h1>THE<br>ARCHIVE</h1><p>Every World Cup since 1987, every Five and Six Nations title since 1975, and the players who built the game. Verified records and estimated ratings, kept separate.</p><div class="classic-line"></div>
        <div class="archive-stats"><div><b>${ARCHIVE_PLAYERS.length}</b><span>ARCHIVE PLAYERS</span></div><div><b>${ERAS.length}</b><span>ERAS</span></div><div><b>${RWC_FINALS.length}</b><span>WORLD CUPS</span></div><div><b>51</b><span>CHAMPIONSHIPS</span></div></div>
      </section>
      ${archiveTabs()}
      ${S.archiveTab==='cups'?archiveCups():S.archiveTab==='eras'?archiveEras():S.archiveTab==='nations'?archiveNations():archiveLegends()}
    </div>
  </div>`;
}

function showArchivePlayer(id) {
  const p=PLAYER_BY_ID[id];if(!p)return;
  const t=team(p.countryId);
  const versions=(p.versions||[]).slice().sort((a,b)=>a.year-b.year);
  const peak=versions.reduce((best,v)=>v.rating>(best?.rating||0)?v:best,null);
  showModal(`${modalHead(esc(p.name),`${esc(t.name.toUpperCase())} • ${esc(p.position)}${p.nick?' • '+esc(p.nick):''}`)}
    <div class="archive-player-hero">
      ${crest(t,66)}
      <div><span>EST. PEAK</span><b>${peak?.rating||p.rating}</b></div>
      <div><span>DEBUT</span><b>${p.debut??'—'}</b></div>
      <div><span>RETIRED</span><b>${p.retired??'—'}</b></div>
    </div>
    <div class="archive-record">
      <div><span>CAPS</span><b>${p.caps??'—'}</b></div>
      <div><span>TRIES</span><b>${p.tries??'—'}</b></div>
      <div><span>POINTS</span><b>${p.points??'—'}</b></div>
      <div><span>WORLD CUPS</span><b>${(p.worldCups||[]).length}</b></div>
    </div>
    <div class="archive-note">${icon('chart',14)} ${p.statsVerified?'Career totals are verified public records.':'Career totals are an estimated archive snapshot.'} Ratings and attributes are gameplay estimates, not official rankings.</div>
    ${p.honours?.length?`<h3 class="modal-sub">HONOURS</h3><div class="archive-chips">${p.honours.map(h=>`<span>${esc(h)}</span>`).join('')}</div>`:''}
    ${p.traits?.length?`<h3 class="modal-sub">SIGNATURE TRAITS</h3><div class="archive-chips gold">${p.traits.map(h=>`<span>${esc(h)}</span>`).join('')}</div>`:''}
    ${versions.length?`<h3 class="modal-sub">ERA RATINGS <small>ESTIMATED</small></h3><div class="version-list">${versions.map(v=>`<div><b>${v.year}</b><span>${esc(v.label||'Version')}</span><em>${v.rating}</em></div>`).join('')}</div>`:''}
    <button class="btn gold full" data-action="hist:playPlayer" data-player="${p.id}">${icon('play',17)} PLAY A DREAM MATCH</button>`,'tall');
}

function showArchiveTeam(id) {
  const t=team(id), s=archiveSummary(id), rec=s.record;
  const greats=allTimeGreats(id).slice(0,8);
  showModal(`${modalHead(esc(t.name),esc(t.nick).toUpperCase())}
    <div class="archive-team-hero">${crest(t,74)}<div><span>WORLD CUP TITLES</span><b>${rec?.titles??0}</b></div><div><span>APPEARANCES</span><b>${rec?.apps??'—'}</b></div><div><span>ARCHIVE PLAYERS</span><b>${s.players}</b></div></div>
    <p class="modal-copy">${esc(rec?.best||'A proud international history.')}</p>
    <h3 class="modal-sub">ARCHIVE GREATS <small>EST. RATINGS</small></h3>
    <div class="archive-legend-list compact">${greats.map((p,i)=>`<button class="archive-legend" data-action="hist:player" data-player="${p.id}"><span class="al-rank">${String(i+1).padStart(2,'0')}</span><div><b>${esc(p.name)}</b><span>${esc(p.position)} • ${p.debut}–${p.retired??'—'}</span></div><em>${p.rating}<small>EST</small></em></button>`).join('')}</div>
    <button class="btn gold full" data-action="hist:playTeam" data-team="${id}">${icon('play',17)} PLAY AS ${esc(t.abbr)}</button>`,'tall');
}

function showArchiveEra(id) {
  const e=ERAS.find(x=>x.id===id);if(!e)return;
  const stars=e.stars.map(pid=>PLAYER_BY_ID[pid]).filter(Boolean);
  const titles=CHAMPIONSHIP_HISTORY.filter(c=>c.year>=e.from&&c.year<=e.to);
  showModal(`${modalHead(esc(e.label),`${e.from}–${e.to} • ${esc(e.tagline).toUpperCase()}`)}
    <div class="archive-era-hero" style="--era:${e.colour}"><span class="era-years">${e.from}–${e.to}</span><p>${esc(e.blurb)}</p><div class="era-themes">${e.themes.map(t=>`<span>${esc(t)}</span>`).join('')}</div></div>
    <h3 class="modal-sub">FEATURED PLAYERS <small>EST. RATINGS</small></h3>
    <div class="archive-legend-list compact">${stars.map(p=>`<button class="archive-legend" data-action="hist:player" data-player="${p.id}"><div><b>${esc(p.name)}</b><span>${esc(team(p.countryId).abbr)} • ${esc(p.position)}</span></div><em>${p.rating}<small>EST</small></em></button>`).join('')}</div>
    <h3 class="modal-sub">CHAMPIONSHIPS</h3>
    <div class="champ-list compact">${titles.slice().reverse().map(c=>`<div class="champ-row"><b>${c.year}</b><span>${esc(c.competition)}</span><strong>${esc(c.winner)}</strong>${c.shared?`<em>shared</em>`:''}</div>`).join('')}</div>
    <button class="btn gold full" data-action="hist:playEra" data-era="${e.id}">${icon('play',17)} PLAY THIS ERA</button>`,'tall');
}

function startDreamMatch(id) {
  const d=DREAM_MATCHES.find(x=>x.id===id);if(!d)return;
  const [homeId,homeYear]=d.home,[awayId,awayYear]=d.away;
  closeModal();
  launchMatch({
    homeTeam:team(homeId),awayTeam:team(awayId),userTeam:'home',mode:'quick',
    halfSeconds:180,difficulty:S.settings.difficulty,venue:d.venue,
    year:homeYear,homeSquad:historicalSquad(homeId,homeYear),awaySquad:historicalSquad(awayId,awayYear),
    stageLabel:d.label.toUpperCase()
  });
}

function startEraMatch(id) {
  const e=ERAS.find(x=>x.id===id);if(!e)return;
  const mid=Math.round((e.from+e.to)/2);
  const ranking=eraTeamRatings(mid);
  const homeId=ranking[0]?.id||'nz',awayId=ranking[1]?.id||'za';
  closeModal();
  launchMatch({
    homeTeam:team(homeId),awayTeam:team(awayId),userTeam:'home',mode:'quick',
    halfSeconds:180,difficulty:S.settings.difficulty,venue:'World Rugby Stadium',
    year:mid,homeSquad:historicalSquad(homeId,mid),awaySquad:historicalSquad(awayId,mid),
    stageLabel:`${e.label.toUpperCase()} • ${mid}`
  });
}

function startArchivePlayerMatch(id) {
  const p=PLAYER_BY_ID[id];if(!p)return;
  const peak=(p.versions||[]).reduce((best,v)=>v.rating>(best?.rating||0)?v:best,{year:p.debut||2000,rating:p.rating});
  const year=clamp(peak.year||2000,1975,2026);
  const rivals=TEAMS.filter(t=>t.id!==p.countryId).sort((a,b)=>eraBaseRating(b.id,year)-eraBaseRating(a.id,year));
  const rival=rivals[0]?.id||'nz';
  closeModal();
  launchMatch({
    homeTeam:team(p.countryId),awayTeam:team(rival),userTeam:'home',mode:'quick',
    halfSeconds:180,difficulty:S.settings.difficulty,venue:'World Rugby Stadium',
    year,homeSquad:historicalSquad(p.countryId,year),awaySquad:historicalSquad(rival,year),
    stageLabel:`${p.name.toUpperCase()} • ${year}`
  });
}

function startArchiveTeamMatch(id) {
  const year=clamp(S.archiveYear||2026,1975,2026);
  const rivals=TEAMS.filter(t=>t.id!==id).sort((a,b)=>eraBaseRating(b.id,year)-eraBaseRating(a.id,year));
  const rival=rivals[0]?.id||'nz';
  closeModal();
  launchMatch({
    homeTeam:team(id),awayTeam:team(rival),userTeam:'home',mode:'quick',
    halfSeconds:180,difficulty:S.settings.difficulty,venue:'World Rugby Stadium',
    year,homeSquad:historicalSquad(id,year),awaySquad:historicalSquad(rival,year),
    stageLabel:`${team(id).abbr} • ${year}`
  });
}

function customScreen() {
  const c=S.custom;
  const selected=new Set(c.teams);
  return `<div class="page sub-page">
    ${subHeader('Custom Cup','BUILD YOUR OWN TOURNAMENT')}
    <div class="content-wrap">
      <section class="custom-head"><span class="kicker gold">TOURNAMENT CREATOR</span><h1>MAKE IT<br>YOURS</h1>
        <label class="field-label">TOURNAMENT NAME</label><input class="text-input" id="custom-name" value="${esc(c.name)}" maxlength="34" />
      </section>
      <div class="settings-panel">
        <div class="panel-row"><div><label>FORMAT</label><small>Number of nations</small></div><div class="segmented"><button class="${c.size===8?'active':''}" data-action="custom:size" data-val="8">8 TEAMS</button><button class="${c.size===16?'active':''}" data-action="custom:size" data-val="16">16 TEAMS</button></div></div>
        <div class="panel-row"><div><label>SELECTED</label><small>Tap nations below to add or remove</small></div><b class="big-count">${c.teams.length} / ${c.size}</b></div>
      </div>
      <div class="team-grid custom-grid">${TEAMS.map(t=>`<button class="team-tile ${selected.has(t.id)?'selected':''} ${c.userTeam===t.id?'user-team':''}" data-action="custom:team" data-team="${t.id}">
        ${crest(t,40)}<b>${t.abbr}</b><span>${t.name}</span>${c.userTeam===t.id?'<em>YOUR TEAM</em>':''}
      </button>`).join('')}</div>
      <div class="custom-user-pick"><span>YOUR NATION</span><div>${crest(team(c.userTeam),38)}<b>${esc(team(c.userTeam).name)}</b></div><button class="text-btn" data-action="custom:user">CHANGE ${icon('swap',12)}</button></div>
      <button class="btn gold full xl" data-action="custom:create" ${c.teams.length!==c.size?'disabled':''}>${icon('trophy',19)} CREATE TOURNAMENT</button>
      <p class="fine-print">${c.size===8?'Two pools of four, top two into the semi-finals.':'Four pools of four, top two into the quarter-finals.'}</p>
    </div>
  </div>`;
}

function trainingScreen() {
  const drills=[
    ['passing','Passing Ladder','Complete 10 passes under pressure. Timing and support lines.','passing','#7fe1a3'],
    ['tackling','Tackle School','Make 8 dominant tackles. Positioning, timing and technique.','tackling','#f0c66b'],
    ['kicking','Kicking Range','Land 3 tactical kicks. Territory, hang time and accuracy.','kicking','#8fc9ff'],
    ['ruck','Breakdown Battle','Win 5 rucks. Body height, support and jackal timing.','ruck','#f08f7c']
  ];
  return `<div class="page sub-page">
    ${subHeader('Training','THE MARGINS MATTER')}
    <div class="content-wrap">
      <section class="training-hero"><div class="training-lines"></div><span class="kicker gold">ELITE PREPARATION</span><h1>SHARPEN<br>YOUR EDGE</h1><p>Short, focused drills that translate directly into match day. No clock. No pressure. Just improvement.</p></section>
      <div class="drill-grid">${drills.map(([id,title,desc,tag,color])=>`<button class="drill-card" data-action="train:start" data-drill="${id}" style="--drill:${color}">
        <div class="drill-top"><span class="drill-icon">${icon(id==='kicking'?'boot':id==='tackling'?'shield':id==='passing'?'hand':'bolt',24)}</span><span class="drill-tag">${tag.toUpperCase()}</span></div>
        <h3>${title}</h3><p>${desc}</p><span class="drill-go">START DRILL ${icon('arrow',14)}</span>
      </button>`).join('')}</div>
      <section class="settings-panel tutorial-card"><h3 class="panel-title">QUICK TUTORIAL</h3>
        <div class="tutorial-row"><b>1</b><p>Move with the joystick. Sprint drains stamina — use it in space, not in contact.</p></div>
        <div class="tutorial-row"><b>2</b><p>PASS selects a support runner behind you. Point the joystick to choose the direction.</p></div>
        <div class="tutorial-row"><b>3</b><p>On defence, close the gap and tap TACKLE. Arrive with momentum to dominate the collision.</p></div>
        <div class="tutorial-row"><b>4</b><p>At the ruck, tap SECURE or JACKAL. At scrums and lineouts, time your tap in the green zone.</p></div>
      </section>
      <div class="training-note">${icon('medal',18)} Complete drills to earn training points and build chemistry in Career Mode.</div>
    </div>
  </div>`;
}

/* ---------------- Career ---------------- */
function careerScreen() {
  const c=S.career;
  if(!c) return noCareerView();
  return careerHub(c);
}

function noCareerView() {
  const chosen=team(S.careerTeam||S.selectedTeam);
  return `<div class="page sub-page career-page">
    ${subHeader('Career','BUILD A DYNASTY')}
    <div class="content-wrap">
      <section class="career-hero"><div class="career-coach">${icon('career',46)}</div><span class="kicker gold">INTERNATIONAL MANAGEMENT</span><h1>THE LONG<br>GAME</h1><p>Pick your nation. Select the XV. Manage fitness, develop young talent, build chemistry and chase the championship across a full international season.</p>
        <div class="career-features"><span>${icon('career',16)} Squad</span><span>${icon('chart',16)} Tactics</span><span>${icon('medal',16)} Development</span><span>${icon('trophy',16)} Glory</span></div>
      </section>
      <section class="choose-nation"><div class="section-head"><div><span class="kicker">YOUR APPOINTMENT</span><h2>Choose your nation</h2></div></div>
        <button class="nation-pick" data-action="team:pick" data-mode="career">${crest(chosen,76)}<div class="nation-info"><span>${esc(chosen.nick)}</span><h2>${esc(chosen.name)}</h2><p>${esc(chosen.styleLabel)} • Squad rating ${squadRating(chosen.id)}</p></div><span class="chev">${icon('chev',20)}</span></button>
      </section>
      <label class="field-label">COACH NAME</label><input class="text-input" id="coach-name" maxlength="24" value="${esc(S.coachName||'Alex Morgan')}" />
      <div class="settings-panel career-start-panel">
        <div class="panel-row"><div><label>CONTRACT TARGET</label><small>The board expect a top-four finish</small></div><b class="big-count">TOP 4</b></div>
        <div class="panel-row"><div><label>SEASON LENGTH</label><small>Seven rounds, eight nations</small></div><b>7 MATCHES</b></div>
      </div>
      <button class="btn gold full xl" data-action="career:start">${icon('career',19)} BEGIN CAREER</button>
      <p class="fine-print">Manage a 23-player squad with full attributes, fitness, injuries, suspensions and individual development.</p>
    </div>
  </div>`;
}

function careerHub(c) {
  const user=team(c.teamId);
  const next=nextCareerFixture(c);
  const table=careerTable(c);
  const pos=table.findIndex(t=>t.id===c.teamId)+1;
  const {lineup,bench}=careerSquadPlayers(c);
  const tabs=[['overview','Overview'],['squad','Squad'],['tactics','Tactics'],['training','Training']];
  return `<div class="page sub-page career-page">
    ${subHeader('Career','SEASON '+c.season+' • '+esc(user.abbr))}
    <div class="content-wrap">
      <section class="career-dashboard">
        <div class="dash-top"><div class="dash-team">${crest(user,58)}<div><span>${esc(c.coachName)}</span><h2>${esc(user.name)}</h2><p>${esc(user.styleLabel)}</p></div></div><div class="dash-pos"><span>POSITION</span><b>${pos||'—'}<small>/${table.length}</small></b></div></div>
        <div class="dash-stats"><div><span>CHEMISTRY</span><b>${c.chemistry}%</b><div class="mini-bar"><i style="width:${c.chemistry}%"></i></div></div><div><span>TRAINING PTS</span><b>${c.trainingPoints}</b></div><div><span>TROPHIES</span><b>${c.trophies}</b></div><div><span>REPUTATION</span><b>${c.reputation}</b></div></div>
      </section>
      <div class="tabs career-tabs">${tabs.map(([id,label])=>`<button class="${S.careerTab===id?'active':''}" data-action="career:tab" data-tab="${id}">${label}</button>`).join('')}</div>
      ${S.careerTab==='overview'?careerOverview(c,next,table,pos):''}
      ${S.careerTab==='squad'?careerSquad(c,lineup,bench):''}
      ${S.careerTab==='tactics'?careerTactics(c):''}
      ${S.careerTab==='training'?careerTraining(c):''}
    </div>
  </div>`;
}

function careerOverview(c,next,table,pos) {
  const user=team(c.teamId);
  return `${c.seasonComplete?`<section class="season-done"><div class="season-trophy">${trophySVG()}</div><span class="kicker gold">SEASON COMPLETE</span><h2>${c.champion===c.teamId?'CHAMPIONS':'SEASON REVIEW'}</h2><p>${c.champion===c.teamId?'Your nation stands on top of the world. The board could not be happier.':`You finished ${pos}${pos===1?'st':pos===2?'nd':pos===3?'rd':'th'}. The review is honest: the work continues.`}</p><button class="btn gold" data-action="career:newseason">START SEASON ${c.season+1}</button></section>`:
  next?`<section class="next-match career-next">
    <div class="next-label"><span class="live-dot"></span> ROUND ${next.round} • ${esc(next.venue)}</div>
    <div class="next-teams"><div class="next-side ${next.homeId===c.teamId?'mine':''}">${crest(team(next.homeId),54)}<h3>${team(next.homeId).abbr}</h3><span>${esc(team(next.homeId).name)}</span>${next.homeId===c.teamId?'<em>YOU</em>':''}</div>
      <div class="next-v"><span>V</span><small>R${next.round}</small></div>
      <div class="next-side ${next.awayId===c.teamId?'mine':''}">${crest(team(next.awayId),54)}<h3>${team(next.awayId).abbr}</h3><span>${esc(team(next.awayId).name)}</span>${next.awayId===c.teamId?'<em>YOU</em>':''}</div></div>
    <div class="next-actions"><button class="btn gold" data-action="career:play">${icon('play',17)} PLAY MATCH</button><button class="btn ghost" data-action="career:sim">${icon('bolt',16)} SIMULATE</button></div>
  </section>`:`<section class="advance-card"><div class="advance-icon">${icon('calendar',24)}</div><div><h3>Round complete</h3><p>Advance to the next round.</p></div><button class="btn gold sm" data-action="career:advance">ADVANCE</button></section>`}
  <section class="section"><div class="section-head"><div><span class="kicker">INTERNATIONAL SERIES</span><h2>Table</h2></div><span class="section-count">PTS</span></div>${careerTableHTML(c)}</section>
  <section class="section"><div class="section-head"><div><span class="kicker">FROM THE CAMP</span><h2>News</h2></div></div><div class="news-list">${c.news.slice(0,4).map(n=>`<div class="news-item"><span>${icon('ball',14)}</span><p>${esc(n)}</p></div>`).join('')}</div></section>`;
}

function careerTableHTML(c) {
  const table=careerTable(c);
  return `<div class="table-wrap"><table class="standings-table"><thead><tr><th>#</th><th class="left">TEAM</th><th>P</th><th>W</th><th>D</th><th>L</th><th>+/-</th><th>PTS</th></tr></thead><tbody>
    ${table.map((r,i)=>{const tm=team(r.id);return `<tr class="${r.id===c.teamId?'user-row':''}"><td>${i+1}</td><td class="left"><span class="tbl-team">${crest(tm,26)}<b>${tm.abbr}</b><span>${esc(tm.name)}</span></span></td><td>${r.p}</td><td>${r.w}</td><td>${r.d}</td><td>${r.l}</td><td>${r.diff>0?'+':''}${r.diff}</td><td class="pts">${r.pts}</td></tr>`}).join('')}
  </tbody></table></div>`;
}

function careerSquad(c,lineup,bench) {
  const playerRow=(p,starter)=>{
    const inj=p.injury>0?`<span class="status-chip injury">INJ ${p.injury}</span>`:p.suspension>0?`<span class="status-chip injury">SUSP</span>`:'';
    return `<button class="player-row ${starter?'starter':''}" data-action="career:player" data-id="${p.id}">
      <span class="pnum">${p.number}</span>
      <span class="pinfo"><b>${esc(p.name)}</b><small>${esc(p.posName)} • ${p.age} yrs</small></span>
      ${inj}
      <span class="pform"><i style="width:${p.form}%"></i></span>
      <span class="pfit ${p.fitness<55?'low':''}">${p.fitness}%</span>
      <span class="povr">${p.overall}</span>
    </button>`;
  };
  return `<section class="squad-head"><div><span class="kicker">MATCHDAY XXIII</span><h2>Starting XV</h2></div><button class="text-btn" data-action="career:autopick">AUTO PICK ${icon('bolt',12)}</button></section>
    <div class="player-list">${lineup.map(p=>playerRow(p,true)).join('')}</div>
    <div class="squad-divider"><span>IMPACT BENCH</span><i></i></div>
    <div class="player-list bench">${bench.map(p=>playerRow(p,false)).join('')}</div>
    <p class="fine-print">Tap a player to inspect attributes, develop them or swap them into the XV. Fitness and form affect match performance.</p>`;
}

function careerTactics(c) {
  const t=c.tactics;
  const seg=(key,vals)=>`<div class="segmented wrap">${vals.map(([v,l])=>`<button class="${t[key]===v?'active':''}" data-action="career:tactic" data-key="${key}" data-val="${v}">${l}</button>`).join('')}</div>`;
  return `<section class="settings-panel">
    <h3 class="panel-title">ATTACKING IDENTITY</h3>
    <div class="panel-row column"><div><label>GAME PLAN</label><small>How your team approaches possession</small></div>${seg('style',[['expansive','EXPANSIVE'],['balanced','BALANCED'],['territory','TERRITORY']])}</div>
    <div class="panel-row column"><div class="row-between"><div><label>ATTACK WIDTH</label><small>Spread the defence or punch tight</small></div><b>${t.width}%</b></div><input class="range" type="range" min="20" max="90" value="${t.width}" data-career-range="width"/></div>
    <div class="panel-row column"><div class="row-between"><div><label>OFFLOAD FREEDOM</label><small>Risk and reward in contact</small></div><b>${t.offload}%</b></div><input class="range" type="range" min="10" max="90" value="${t.offload}" data-career-range="offload"/></div>
    <h3 class="panel-title spaced">DEFENCE</h3>
    <div class="panel-row column"><div class="row-between"><div><label>LINE SPEED</label><small>Press hard or hold and cover</small></div><b>${t.lineSpeed}%</b></div><input class="range" type="range" min="20" max="90" value="${t.lineSpeed}" data-career-range="lineSpeed"/></div>
    <div class="panel-row column"><div class="row-between"><div><label>KICKING GAME</label><small>Territory vs ball in hand</small></div><b>${t.kick}%</b></div><input class="range" type="range" min="20" max="90" value="${t.kick}" data-career-range="kick"/></div>
  </section>
  <div class="chemistry-card"><div class="chem-ring" style="--pct:${c.chemistry}"><b>${c.chemistry}</b><span>CHEM</span></div><div><h3>Team chemistry</h3><p>Chemistry improves passing accuracy, support lines and defensive coordination. Win matches and train together to build it.</p></div></div>`;
}

function careerTraining(c) {
  const {lineup}=careerSquadPlayers(c);
  const drills=[['passing','Passing Ladder'],['tackling','Tackle School'],['kicking','Kicking Range'],['ruck','Breakdown Battle']];
  return `<section class="training-points"><div><span>TRAINING POINTS</span><b>${c.trainingPoints}</b></div><p>Spend points on individual attributes or run a squad drill to earn more.</p></section>
    <div class="drill-grid small">${drills.map(([id,title])=>`<button class="drill-card compact" data-action="train:start" data-drill="${id}"><span class="drill-icon">${icon('medal',20)}</span><h3>${title}</h3><span class="drill-go">RUN SESSION ${icon('arrow',13)}</span></button>`).join('')}</div>
    <div class="section-head"><div><span class="kicker">INDIVIDUAL WORK</span><h2>Develop players</h2></div></div>
    <div class="player-list">${lineup.slice(0,15).map(p=>`<button class="player-row" data-action="career:player" data-id="${p.id}"><span class="pnum">${p.number}</span><span class="pinfo"><b>${esc(p.name)}</b><small>${esc(p.posName)} • Potential ${p.potential}</small></span><span class="pxp">${p.xp||0} XP</span><span class="povr">${p.overall}</span></button>`).join('')}</div>`;
}

/* ---------------- Shared team picker ---------------- */
function openTeamPicker(mode, side='') {
  S.pickContext={mode,side};
  const list=[...TEAMS].sort((a,b)=>b.rating-a.rating);
  showModal(`${modalHead('Choose a nation','SELECT TEAM')}
    <div class="team-picker-grid">${list.map(t=>`<button class="team-pick-row" data-action="team:choose" data-team="${t.id}">
      ${crest(t,40)}<span><b>${esc(t.name)}</b><small>${esc(t.nick)} • ${esc(t.styleLabel)}</small></span><span class="tp-rating">${t.rating}</span>
    </button>`).join('')}</div>`, 'tall');
}
function inspectTeam(teamId) {
  const t=team(teamId), sq=squadFor(teamId);
  const starters=sq.filter(p=>p.number<=15);
  showModal(`${modalHead(t.name,t.nick.toUpperCase())}
    <div class="inspect-head">${crest(t,76)}<div><p>${esc(t.styleLabel)} • ${t.venue}</p><div class="rating-big">${squadRating(teamId)} <span>OVR</span></div></div></div>
    <div class="inspect-attrs">${['speed','strength','passing','kicking','tackling','setpiece'].map(k=>{
      const val=k==='setpiece'?Math.round(starters.filter(p=>p.number<=8).reduce((a,p)=>a+p.scrum,0)/8):Math.round(starters.reduce((a,p)=>a+(p[k]||0),0)/15);
      return `<div><span>${ATTR_LABELS[k]||'Set Piece'}</span><div class="mini-bar"><i style="width:${val}%"></i></div><b>${val}</b></div>`;
    }).join('')}</div>
    <h3 class="modal-sub">PROJECTED XV</h3>
    <div class="inspect-squad">${starters.map(p=>`<div><span>${p.number}</span><b>${esc(p.name)}</b><em>${p.overall}</em></div>`).join('')}</div>`, 'tall');
}

/* ---------------- Match presentation ---------------- */
function launchMatch(meta) {
  const homeSquad = meta.homeSquad || squadFor(meta.homeTeam.id, meta.seed||0);
  const awaySquad = meta.awaySquad || squadFor(meta.awayTeam.id, (meta.seed||0)+7);
  const game = new RugbyGame({
    home:{ team:meta.homeTeam, squad:homeSquad, lineupIds:meta.homeLineup, tactics:meta.homeTactics },
    away:{ team:meta.awayTeam, squad:awaySquad, lineupIds:meta.awayLineup, tactics:meta.awayTactics },
    userTeam:meta.userTeam||'home', halfSeconds:meta.halfSeconds||180,
    mode:meta.mode||'quick', trainingDrill:meta.trainingDrill||null,
    venue:meta.venue||meta.homeTeam.venue, difficulty:meta.difficulty||S.settings.difficulty,
    weather:meta.weather||'clear', year:meta.year||null, onEvent:handleGameEvent
  });
  game.paused = true;
  S.game=game;
  S.matchMeta=meta;
  S.matchResult=null;
  S.matchView='prematch';
  S.route='match';
  window.scrollTo({top:0,behavior:'instant'});
  render();
}

function matchScreen() {
  const g=S.game, meta=S.matchMeta;
  if(!g) return `<div class="page">${emptyState('No match loaded','Return to the hub and choose a fixture.','nav:home','GO HOME')}</div>`;
  const h=meta.homeTeam,a=meta.awayTeam;
  const label=meta.mode==='tournament'?(meta.stageLabel||'WORLD CUP MATCH'):meta.mode==='career'?'INTERNATIONAL SERIES':meta.trainingDrill?'TRAINING DRILL':'EXHIBITION MATCH';
  return `<div class="match-page">
    <header class="match-bar">
      <button class="icon-btn match-pause" data-action="match:pause" aria-label="Pause">${icon('pause',18)}</button>
      <div class="scoreboard">
        <div class="sb-team home"><span class="sb-name">${esc(h.abbr)}</span>${crest(h,32)}<b id="score-home">${g.score.home}</b></div>
        <div class="sb-clock"><span id="match-clock">00:00</span><small id="match-half">1ST HALF</small><i id="phase-dot"></i></div>
        <div class="sb-team away"><b id="score-away">${g.score.away}</b>${crest(a,32)}<span class="sb-name">${esc(a.abbr)}</span></div>
      </div>
      <button class="icon-btn match-sound" data-action="match:sound" aria-label="Sound">${icon('whistle',18)}</button>
    </header>
    <div class="field-wrap">
      <canvas id="match-canvas" aria-label="Rugby match pitch"></canvas>
      <div class="field-topline"><span class="live-pill"><i></i> ${esc(label)}</span><span class="venue-line">${esc(meta.venue||'')}</span></div>
      <div class="phase-banner" id="phase-banner">KICK OFF</div>
      <div class="possession-strip"><span class="poss-home" id="poss-home" style="width:50%"></span><span class="poss-away" id="poss-away" style="width:50%"></span><em id="poss-label">POSSESSION</em></div>
      <div class="commentary-ticker" id="commentary-ticker"><span>${icon('ball',12)}</span><p>${esc(g.commentary.at(-1)?.text||'')}</p></div>
      <div class="context-panel" id="context-panel"></div>
      <div class="mini-radar" id="mini-radar"><canvas id="radar-canvas" width="82" height="112"></canvas><span>RADAR</span></div>
      <div class="training-panel hidden" id="training-panel"></div>
      <div class="prematch-overlay" id="prematch-overlay">
        <div class="prematch-stadium"></div>
        <div class="prematch-inner">
          <span class="kicker gold">${meta.mode==='tournament'?'RUGBY WORLD CUP 26':meta.mode==='career'?'INTERNATIONAL SERIES':'WORLD RUGBY'}</span>
          <div class="prematch-teams">
            <div>${crest(h,82)}<h2>${esc(h.name)}</h2><span>${esc(h.nick)}</span></div>
            <div class="prematch-v"><span>V</span><small>${esc(meta.stageLabel||'MATCHDAY')}</small></div>
            <div>${crest(a,82)}<h2>${esc(a.name)}</h2><span>${esc(a.nick)}</span></div>
          </div>
          <p class="prematch-venue">${icon('globe',14)} ${esc(meta.venue||'World Rugby Stadium')} <span>•</span> ${icon('whistle',13)} ${meta.mode==='tournament'?'Cup match':meta.mode==='career'?'Series match':'International'}</p>
          <div class="prematch-actions">
            <button class="btn glass" data-action="match:anthem">${icon('whistle',17)} PLAY ANTHEMS</button>
            <button class="btn gold" data-action="match:kickoff">${icon('play',18)} KICK OFF</button>
          </div>
          <small class="prematch-note">${meta.trainingDrill?'Drill mode — no clock. Complete the objective.':'15-a-side • Full laws • 23-player squads'}</small>
        </div>
      </div>
      <div class="match-layer hidden" id="goal-layer"></div>
      <div class="match-layer hidden" id="penalty-layer"></div>
      <div class="kick-layer hidden" id="kick-layer"></div>
      <div class="match-layer hidden" id="break-layer"></div>
    </div>
    <div class="control-deck ${S.settings.layout==='left'?'lefty':''}" style="--ctrl:${S.settings.controlScale}">
      <div class="joystick-wrap">
        <div class="joystick" id="joystick"><div class="joy-cross"></div><div class="joy-thumb" id="joy-thumb">${icon('ball',18)}</div></div>
        <span class="joy-label">MOVE</span>
      </div>
      <div class="control-mid">
        <button class="switch-chip" id="btn-switch" data-action="match:switch" aria-label="Switch defender">${icon('swap',13)} <span>SWITCH</span></button>
        <div class="player-chip" id="player-chip"><span>YOU</span><b>—</b></div>
        <div class="stamina-chip"><span>STAMINA</span><div class="stamina-bar"><i id="stamina-fill"></i></div></div>
        <div class="tap-context" id="tap-context">READY</div>
      </div>
      <div class="action-pad attack-pad" id="attack-pad">
        <button class="round-btn sprint" id="btn-sprint" aria-label="Sprint">${icon('bolt',20)}<span>SPRINT</span></button>
        <button class="round-btn pass" id="btn-pass" data-action="match:pass" aria-label="Pass">${icon('arrow',20)}<span>PASS</span></button>
        <button class="round-btn kick" id="btn-kick" data-action="match:kick" aria-label="Kick">${icon('boot',20)}<span>KICK</span></button>
        <button class="round-btn action" id="btn-action" data-action="match:action" aria-label="Action">${icon('shield',20)}<span>ACTION</span></button>
        <button class="round-btn offload" id="btn-offload" data-action="match:offload" aria-label="Offload">${icon('swap',20)}<span>OFFLOAD</span></button>
        <button class="round-btn fend" id="btn-fend" data-action="match:fend" aria-label="Fend">${icon('shield',20)}<span>FEND</span></button>
        <button class="round-btn step" id="btn-step" data-action="match:step" aria-label="Side-step">${icon('arrow',20)}<span>STEP</span></button>
      </div>
      <div class="action-pad defense-pad hidden" id="defense-pad">
        <button class="round-btn switch" data-action="match:switch" aria-label="Switch defender">${icon('swap',19)}<span>SWITCH</span></button>
        <button class="round-btn tackle" data-action="match:tackle" data-type="normal" aria-label="Normal tackle">${icon('shield',19)}<span>TACKLE</span></button>
        <button class="round-btn dive" data-action="match:tackle" data-type="dive" aria-label="Dive tackle">${icon('bolt',19)}<span>DIVE</span></button>
        <button class="round-btn big" data-action="match:tackle" data-type="big" aria-label="Big tackle">${icon('shield',19)}<span>BIG</span></button>
        <button class="round-btn intercept" data-action="match:tackle" data-type="intercept" aria-label="Intercept">${icon('arrow',19)}<span>INTERCEPT</span></button>
        <button class="round-btn pressure" data-action="match:tackle" data-type="pressure" aria-label="Defensive pressure">${icon('bolt',19)}<span>PRESSURE</span></button>
      </div>
    </div>
  </div>`;
}

function initMatchScreen() {
  const g=S.game;if(!g)return;
  const canvas=$('#match-canvas');
  if(!canvas)return;
  S.renderer=new MatchRenderer(canvas,g,S.settings);
  const ro=new ResizeObserver(()=>S.renderer?.resize());
  ro.observe(canvas);
  S.matchResize=ro;
  initJoystick();
  bindSprint();
  const loop=(ts)=>{
    if(!S.game)return;
    const dt=S.lastFrame?Math.min(.05,(ts-S.lastFrame)/1000):1/60;
    S.lastFrame=ts;
    S.game.update(dt);
    S.renderer?.render(dt);
    if(ts-(S.lastHud||0)>90){updateMatchHud();S.lastHud=ts;}
    drawRadar();
    S.raf=requestAnimationFrame(loop);
  };
  S.lastFrame=0;
  cancelAnimationFrame(S.raf);
  S.raf=requestAnimationFrame(loop);
}

function initJoystick() {
  const base=$('#joystick'),thumb=$('#joy-thumb');
  if(!base||!thumb)return;
  let active=false,pointerId=null;
  const set=(ev)=>{
    const r=base.getBoundingClientRect();
    const cx=r.left+r.width/2,cy=r.top+r.height/2;
    let dx=(ev.clientX-cx)/(r.width*.36),dy=(ev.clientY-cy)/(r.height*.36);
    const d=Math.hypot(dx,dy);
    if(d>1){dx/=d;dy/=d;}
    const sens=S.settings.sensitivity||1;
    dx=clamp(dx*sens,-1,1);dy=clamp(dy*sens,-1,1);
    thumb.style.transform=`translate(${dx*r.width*.28}px,${dy*r.height*.28}px)`;
    if(S.game)S.game.setInput(dx,dy,S.game.input.sprint);
  };
  base.addEventListener('pointerdown',ev=>{
    active=true;pointerId=ev.pointerId;base.setPointerCapture(ev.pointerId);base.classList.add('active');set(ev);ev.preventDefault();
  });
  base.addEventListener('pointermove',ev=>{if(active&&ev.pointerId===pointerId){set(ev);ev.preventDefault();}});
  const end=ev=>{if(!active)return;active=false;base.classList.remove('active');thumb.style.transform='';if(S.game)S.game.setInput(0,0,S.game.input.sprint);};
  base.addEventListener('pointerup',end);base.addEventListener('pointercancel',end);base.addEventListener('lostpointercapture',end);
}
function bindSprint() {
  const b=$('#btn-sprint');if(!b)return;
  const on=e=>{e.preventDefault();if(S.game)S.game.setSprint(true);b.classList.add('held');};
  const off=e=>{if(S.game)S.game.setSprint(false);b.classList.remove('held');};
  b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointercancel',off);b.addEventListener('pointerleave',off);
}

function updateMatchHud() {
  const g=S.game;if(!g)return;
  const snap=g.snapshot();
  const set=(id,v)=>{const el=$('#'+id);if(el)el.textContent=v;};
  set('score-home',g.score.home);set('score-away',g.score.away);
  set('match-clock',fmtClock(g.clock));
  set('match-half',g.training?'TRAINING':halfLabel(g.half));
  const phaseNames={open:'OPEN PLAY',kickoff:'KICK OFF',ruck:'RUCK',scrum:'SCRUM',lineout:'LINEOUT',maul:'MAUL',penalty:'PENALTY',goal:'KICK AT GOAL',conversion:'CONVERSION',try:'TRY!',halftime:'HALF-TIME',fulltime:'FULL-TIME'};
  set('phase-banner',phaseNames[g.phase]||g.phase.toUpperCase());
  const ph=$('#phase-banner');if(ph)ph.classList.toggle('show',!['open'].includes(g.phase));
  // possession
  const total=(g.stats.home.possession+g.stats.away.possession)||1;
  const hp=Math.round(g.stats.home.possession/total*100);
  const phEl=$('#poss-home'),paEl=$('#poss-away');
  if(phEl)phEl.style.width=hp+'%';if(paEl)paEl.style.width=(100-hp)+'%';
  set('poss-label',`${hp}% • POSSESSION • ${100-hp}%`);
  // commentary
  const tick=$('#commentary-ticker');
  if(tick&&S.settings.commentary){
    const last=g.commentary.at(-1);
    const p=tick.querySelector('p');if(p&&last)p.textContent=last.text;
  }
  // player
  if(snap.controlled){
    const pc=$('#player-chip');
    if(pc)pc.innerHTML=`<span>#${snap.controlled.number} ${esc(snap.controlled.position||'')}</span><b>${esc(snap.controlled.name.split(' ').slice(-1)[0])}</b>`;
  }
  const sf=$('#stamina-fill');if(sf)sf.style.width=(snap.controlled?.stamina||100)+'%';
  const tc=$('#tap-context');
  if(tc){
    if(g.phase==='ruck')tc.textContent=g.ruck?.side===g.userTeam?'TAP TO SECURE':'TAP TO JACKAL';
    else if(g.phase==='scrum')tc.textContent='TAP IN THE GREEN';
    else if(g.phase==='lineout')tc.textContent='PICK JUMPER • TAP THROW';
    else if(g.phase==='maul')tc.textContent='TAP TO DRIVE';
    else if(g.phase==='open'&&snap.carrier?.side===g.userTeam)tc.textContent=snap.carrier.stamina<35?'LOW STAMINA':'IN POSSESSION';
    else if(g.phase==='open')tc.textContent='DEFEND THE LINE';
    else tc.textContent=phaseNames[g.phase]||'';
  }
  // action buttons
  const action=$('#btn-action'),pass=$('#btn-pass'),kick=$('#btn-kick');
  if(action){action.querySelector('span').textContent=snap.actionLabel;action.classList.toggle('hot',['ruck','scrum','lineout','maul'].includes(g.phase));}
  const defending=g.phase==='open'&&snap.carrier&&snap.carrier.side!==g.userTeam;
  if(pass){pass.querySelector('span').textContent=defending?'SWITCH':'PASS';pass.classList.toggle('disabled',!snap.passEnabled&&!defending&&g.phase!=='ruck');}
  if(kick)kick.classList.toggle('disabled',!snap.kickEnabled);
  const sw=$('#btn-switch');if(sw)sw.classList.toggle('show',!!defending);
  const attackPad=$('#attack-pad'),defPad=$('#defense-pad');
  if(attackPad)attackPad.classList.toggle('hidden',!!defending);
  if(defPad)defPad.classList.toggle('hidden',!defending);
  const offload=$('#btn-offload'),fend=$('#btn-fend'),step=$('#btn-step');
  if(offload)offload.classList.toggle('disabled',!snap.passEnabled);
  if(fend)fend.classList.toggle('disabled',!snap.passEnabled);
  if(step)step.classList.toggle('disabled',!snap.passEnabled);
  updateContextPanel(g,snap);
  updateTrainingPanel(g);
}

function updateContextPanel(g,snap) {
  const panel=$('#context-panel');if(!panel)return;
  if(g.phase==='scrum'&&g.setpiece){
    const m=g.setpiece.meter*100;
    panel.innerHTML=`<div class="setpiece-card"><div class="sp-title">${icon('shield',15)} SCRUM • ${g.setpiece.side===g.userTeam?'YOUR PUT-IN':'DEFENDING'}</div><div class="timing-bar"><span class="good-zone"></span><i style="left:${m}%"></i></div><div class="sp-sub">Tap PUSH when the marker is in the green zone</div></div>`;
    panel.classList.add('show');
  } else if(g.phase==='lineout'&&g.setpiece){
    const m=g.setpiece.meter*100;
    panel.innerHTML=`<div class="setpiece-card"><div class="sp-title">${icon('arrow',15)} LINEOUT • CALL THE JUMPER</div>
      <div class="jumper-row">${[0,1,2].map(i=>`<button class="jumper ${g.setpiece.jumper===i?'active':''}" data-action="match:jumper" data-i="${i}">${i===0?'FRONT':i===1?'MIDDLE':'TAIL'}<small>${i===0?'4':'2'.repeat(i+1)}</small></button>`).join('')}</div>
      <div class="timing-bar"><span class="good-zone"></span><i style="left:${m}%"></i></div><div class="sp-sub">Choose jumper, then tap THROW in the green</div></div>`;
    panel.classList.add('show');
  } else if(g.phase==='ruck'&&g.ruck){
    panel.innerHTML=`<div class="setpiece-card ruck"><div class="sp-title">${icon('hand',15)} BREAKDOWN • ${g.ruck.side===g.userTeam?'SECURE THE BALL':'CONTEST THE BALL'}</div>
      <div class="tap-row"><span class="tap-dot ${g.ruck.attackTaps>0?'on':''}"></span><span class="tap-dot ${g.ruck.attackTaps>1?'on':''}"></span><span class="tap-dot ${g.ruck.attackTaps>2?'on':''}"></span><b>${g.ruck.side===g.userTeam?'SECURE':'JACKAL'}</b></div>
      <div class="sp-sub">Tap ACTION repeatedly to win the contest</div></div>`;
    panel.classList.add('show');
  } else if(g.phase==='maul'){
    panel.innerHTML=`<div class="setpiece-card"><div class="sp-title">${icon('shield',15)} MAUL • DRIVE</div><div class="sp-sub">Tap DRIVE to gain ground and release quick ball</div></div>`;
    panel.classList.add('show');
  } else {
    panel.classList.remove('show');panel.innerHTML='';
  }
}

function updateTrainingPanel(g) {
  const p=$('#training-panel');if(!p)return;
  if(!g.training){p.classList.add('hidden');return;}
  p.classList.remove('hidden');
  const names={passing:'Complete passes',tackling:'Make tackles',kicking:'Land kicks',ruck:'Win rucks'};
  p.innerHTML=`<span class="kicker gold">DRILL</span><b>${names[g.training.drill]||'Training'}</b><div class="train-progress"><i style="width:${g.training.progress/g.training.target*100}%"></i></div><span>${g.training.progress} / ${g.training.target}</span>`;
}

function drawRadar() {
  const g=S.game,c=$('#radar-canvas');if(!g||!c)return;
  const x=c.getContext('2d'),w=c.width,h=c.height;
  x.clearRect(0,0,w,h);
  x.fillStyle='rgba(6,25,16,.72)';x.fillRect(0,0,w,h);
  x.strokeStyle='rgba(255,255,255,.25)';x.lineWidth=1;x.strokeRect(5,5,w-10,h-10);
  x.beginPath();x.moveTo(5,h/2);x.lineTo(w-5,h/2);x.stroke();
  for(const p of g.allPlayers.filter(p=>p.onField)){
    const px=5+p.x/70*(w-10),py=5+p.y/100*(h-10);
    x.fillStyle=p.side==='home'?g.home.team.colors[0]:g.away.team.colors[1];
    x.beginPath();x.arc(px,py,1.6,0,7);x.fill();
  }
  if(g.ball.holder||g.ball){
    const px=5+g.ball.x/70*(w-10),py=5+g.ball.y/100*(h-10);
    x.fillStyle='#ffe39a';x.beginPath();x.arc(px,py,2.4,0,7);x.fill();
  }
}

function handleGameEvent(type,data={}) {
  const g=S.game;
  switch(type){
    case 'tackle': S.audio.hit(data.dominant); vibrate(data.dominant?35:18); break;
    case 'try': S.audio.cheer(); vibrate([30,40,60]); break;
    case 'kick': S.audio.kick(); break;
    case 'whistle': S.audio.whistle(); break;
    case 'card': toast(`${data.card==='yellow'?'YELLOW CARD':'RED CARD'} — ${data.player}`,'warn'); vibrate([60,50,60]); break;
    case 'interception': S.audio.cheer(.5); toast(`Interception! ${data.player}`,'success'); break;
    case 'advantage': toast(`Advantage: ${data.reason}`,'info'); break;
    case 'goalRequest':
      if(data.user) setTimeout(()=>showGoalOverlay(data),220);
      break;
    case 'penalty':
      if(g.pendingPenalty?.side===g.userTeam) setTimeout(()=>showPenaltyOverlay(g.pendingPenalty),240);
      break;
    case 'kickMenu': showKickOverlay(data); break;
    case 'halftime': setTimeout(()=>showHalftime(data),500); break;
    case 'fulltime': S.matchResult=data; setTimeout(()=>showFulltime(data),600); break;
    case 'trainingComplete': S.matchResult={training:true,...data}; setTimeout(()=>showTrainingComplete(data),500); break;
    case 'goalResult':
      S.audio.cheer(data.result==='good'?.6:.2);
      closeGoalOverlay();
      toast(data.result==='good'?`${data.type==='conversion'?'Conversion':'Kick'} is good! +${data.points}`:'Kick missed.','info');
      break;
    case 'substitution': toast(`${data.on} on for ${data.off}`,'info'); break;
    case 'ruckTap': vibrate(8); break;
    case 'scrumResult': S.audio.hit(true); break;
    case 'lineoutResult': break;
    case 'start': break;
  }
}
function vibrate(pattern){ if(S.settings.haptics&&navigator.vibrate)navigator.vibrate(pattern); }

function showGoalOverlay(data) {
  const layer=$('#goal-layer');if(!layer)return;
  layer.classList.remove('hidden');
  layer.innerHTML=`<div class="goal-card">
    <span class="kicker gold">${data.type==='conversion'?'CONVERSION':data.type==='drop'?'DROP GOAL':'PENALTY GOAL'}</span>
    <h2>${esc(data.kicker?.name||'Kicker')}</h2>
    <p>${Math.round(data.distance)}m • ${data.type==='conversion'?'Add the extras':'Three points on offer'}</p>
    <div class="goal-meter"><div class="goal-zone"></div><div class="goal-marker" id="goal-marker"></div><span class="goal-post left"></span><span class="goal-post right"></span></div>
    <div class="goal-scale"><span>WIDE</span><span>PERFECT</span><span>WIDE</span></div>
    <button class="btn gold full" data-action="match:goalKick">${icon('boot',18)} KICK</button>
    <small>Tap when the marker is in the gold zone</small>
  </div>`;
  S.goalMarker=0;S.goalDir=1;
  cancelAnimationFrame(S.goalRaf);
  let last=performance.now();
  const tick=(ts)=>{
    if(!$('#goal-layer')||$('#goal-layer').classList.contains('hidden'))return;
    const dt=Math.min(.05,(ts-last)/1000);last=ts;
    S.goalMarker+=S.goalDir*dt*1.15;
    if(S.goalMarker>1){S.goalMarker=1;S.goalDir=-1;}
    if(S.goalMarker<0){S.goalMarker=0;S.goalDir=1;}
    const m=$('#goal-marker');if(m)m.style.left=(S.goalMarker*100)+'%';
    S.goalRaf=requestAnimationFrame(tick);
  };
  S.goalRaf=requestAnimationFrame(tick);
}
function closeGoalOverlay() {
  cancelAnimationFrame(S.goalRaf);
  const l=$('#goal-layer');if(l){l.classList.add('hidden');l.innerHTML='';}
}
function showPenaltyOverlay(p) {
  const g=S.game;if(!g||!p)return;
  g.paused=true;
  const distance=Math.round(Math.hypot(35-p.x,(p.side==='home'?100:0)-p.y));
  const layer=$('#penalty-layer');if(!layer)return;
  layer.classList.remove('hidden');
  layer.innerHTML=`<div class="decision-card">
    <span class="kicker gold">PENALTY • ${esc(g[p.side].team.name.toUpperCase())}</span>
    <h2>${esc(p.reason)}</h2>
    <p>${distance}m from the posts. Choose your call.</p>
    <div class="decision-options">
      <button data-action="match:penalty" data-opt="goal" ${distance>46?'disabled':''}>${icon('boot',20)}<b>Kick for goal</b><small>${distance>46?'Out of range':'3 points'}</small></button>
      <button data-action="match:penalty" data-opt="touch">${icon('arrow',20)}<b>Kick to touch</b><small>Attacking lineout</small></button>
      <button data-action="match:penalty" data-opt="scrum">${icon('shield',20)}<b>Scrum</b><small>Set-piece platform</small></button>
      <button data-action="match:penalty" data-opt="tap">${icon('bolt',20)}<b>Tap & go</b><small>Catch them napping</small></button>
    </div>
  </div>`;
}
function closePenaltyOverlay(){const l=$('#penalty-layer');if(l){l.classList.add('hidden');l.innerHTML='';}}

function showKickOverlay(data) {
  const layer=$('#kick-layer');if(!layer)return;
  layer.classList.remove('hidden');
  layer.innerHTML=`<div class="kick-sheet">
    <div class="sheet-handle"></div>
    <div class="sheet-head"><div><span class="kicker gold">KICK SELECTION</span><h2>Choose your kick</h2></div><button class="icon-btn" data-action="match:closeKick">${icon('close',18)}</button></div>
    <div class="kick-grid">
      <button data-action="match:chooseKick" data-kick="territory">${icon('boot',22)}<b>Territory</b><small>Long, low and downfield</small></button>
      <button data-action="match:chooseKick" data-kick="box">${icon('bolt',22)}<b>Box kick</b><small>High contestable kick</small></button>
      <button data-action="match:chooseKick" data-kick="grubber">${icon('arrow',22)}<b>Grubber</b><small>Roll into space</small></button>
      <button data-action="match:chooseKick" data-kick="bomb">${icon('globe',22)}<b>Bomb</b><small>Hang time for chasers</small></button>
      <button data-action="match:chooseKick" data-kick="cross">${icon('swap',22)}<b>Cross-field</b><small>Attack the far winger</small></button>
      <button data-action="match:chooseKick" data-kick="goal" ${!data.inGoalRange?'disabled':''}>${icon('trophy',22)}<b>Drop goal</b><small>${data.inGoalRange?'3 points':'Out of range'}</small></button>
    </div>
    <p class="sheet-hint">${icon('arrow',12)} Aim with the joystick before choosing. Kicks are affected by pressure and kicking attributes.</p>
  </div>`;
}
function closeKickOverlay(){const l=$('#kick-layer');if(l){l.classList.add('hidden');l.innerHTML='';}}

function showHalftime(data) {
  const g=S.game;if(!g)return;
  g.paused=true;
  const s=data.stats;
  showModal(`${modalHead('Half-time',`${g.home.team.abbr} ${data.score.home} – ${data.score.away} ${g.away.team.abbr}`)}
    <div class="halftime-score">${crest(g.home.team,50)}<b>${data.score.home}</b><span>HT</span><b>${data.score.away}</b>${crest(g.away.team,50)}</div>
    <div class="stat-grid">${[['Possession',Math.round(s.home.possession/((s.home.possession+s.away.possession)||1)*100)+'%',Math.round(s.away.possession/((s.home.possession+s.away.possession)||1)*100)+'%'],['Tries',s.home.tries,s.away.tries],['Tackles',s.home.tackles,s.away.tackles],['Rucks won',s.home.rucks,s.away.rucks],['Lineouts',s.home.lineouts,s.away.lineouts],['Errors',s.home.errors,s.away.errors]].map(([l,h,a])=>`<div><span>${h}</span><b>${l}</b><span>${a}</span></div>`).join('')}</div>
    <div class="halftime-actions"><button class="btn ghost" data-action="match:subs">SUBSTITUTIONS</button><button class="btn gold" data-action="match:secondHalf">${icon('play',17)} SECOND HALF</button></div>`, 'wide');
}

function showFulltime(data) {
  const g=S.game;if(!g)return;
  g.paused=true;
  const userSide=g.userTeam;
  const userScore=userSide==='home'?data.homeScore:data.awayScore;
  const oppScore=userSide==='home'?data.awayScore:data.homeScore;
  const draw=data.homeScore===data.awayScore;
  const won=!draw&&userScore>oppScore;
  const resultLabel=draw?'DRAW':won?'VICTORY':'DEFEAT';
  const isFinal=S.matchMeta?.stage==='final';
  showModal(`${modalHead('Full-time',`${g.home.team.abbr} ${data.homeScore} – ${data.awayScore} ${g.away.team.abbr}`)}
    <div class="ft-result ${won?'win':draw?'draw':'loss'}"><span class="kicker">${isFinal?'WORLD CUP FINAL':S.matchMeta?.mode==='career'?'SERIES MATCH':'INTERNATIONAL'}</span><h2>${resultLabel}</h2><p>${esc(g.home.team.name)} ${data.homeScore} – ${data.awayScore} ${esc(g.away.team.name)}</p></div>
    <div class="ft-stats">${[['Tries',data.stats.home.tries,data.stats.away.tries],['Possession',Math.round(data.stats.home.possession/((data.stats.home.possession+data.stats.away.possession)||1)*100)+'%',Math.round(data.stats.away.possession/((data.stats.home.possession+data.stats.away.possession)||1)*100)+'%'],['Tackles',data.stats.home.tackles,data.stats.away.tackles],['Metres',data.stats.home.metres,data.stats.away.metres],['Penalties',data.stats.home.penalties,data.stats.away.penalties]].map(([l,h,a])=>`<div><span>${h}</span><b>${l}</b><span>${a}</span></div>`).join('')}</div>
    <div class="potm">${icon('star',16)} <span>PLAYER OF THE MATCH</span><b>${esc(data.manOfMatch?.name||'—')}</b></div>
    <button class="btn gold full" data-action="match:finish">${icon('arrow',17)} CONTINUE</button>`, 'wide');
}

function showTrainingComplete(data) {
  const g=S.game;
  if(g)g.paused=true;
  showModal(`${modalHead('Drill complete','TRAINING GROUND')}
    <div class="training-complete"><div class="tc-icon">${icon('medal',38)}</div><h2>WORK DONE</h2><p>${data.progress} / ${data.target} completed. The squad is sharper for it.</p></div>
    <button class="btn gold full" data-action="match:finish">${icon('arrow',17)} CONTINUE</button>`, 'wide');
}

function showPauseMenu() {
  const g=S.game;if(!g)return;
  g.paused=true;
  showModal(`${modalHead('Paused',`${g.home.team.abbr} ${g.score.home} – ${g.score.away} ${g.away.team.abbr}`)}
    <div class="pause-score"><span>${fmtClock(g.clock)}</span><b>${halfLabel(g.half)}</b></div>
    <div class="pause-grid">
      <button data-action="pause:resume">${icon('play',22)}<b>Resume</b></button>
      <button data-action="pause:tactics">${icon('chart',22)}<b>Tactics</b></button>
      <button data-action="pause:subs">${icon('swap',22)}<b>Substitutions</b></button>
      <button data-action="pause:quit">${icon('back',22)}<b>Quit match</b></button>
    </div>
    <button class="btn ghost full" data-action="pause:resume">BACK TO MATCH</button>`, 'wide');
}

function showSubs() {
  const g=S.game;if(!g)return;
  const team=g[g.userTeam];
  showModal(`${modalHead('Substitutions',`${team.team.name} • BENCH`)}
    <h3 class="modal-sub">IMPACT BENCH</h3>
    <div class="sub-list">${team.bench.filter(p=>!p.injury&&!p.suspension).map(p=>`<div class="sub-row"><span class="pnum">${p.number}</span><div><b>${esc(p.name)}</b><small>${esc(p.posName)} • ${p.overall} OVR</small></div><button class="btn ghost sm" data-action="pause:subOn" data-id="${p.id}">BRING ON</button></div>`).join('')||'<p class="muted">No fit replacements available.</p>'}</div>
    <button class="btn gold full" data-action="pause:autoSubs">${icon('bolt',16)} AUTO-SUB TIRED PLAYERS</button>`, 'tall');
}
function showSubTargets(benchId) {
  const g=S.game;if(!g)return;
  const team=g[g.userTeam], bench=team.bench.find(p=>p.id===benchId);
  if(!bench)return;
  showModal(`${modalHead('Who comes off?',`${esc(bench.name)} • ${esc(bench.posName)}`)}
    <div class="sub-list">${team.lineup.filter(p=>p.onField).sort((a,b)=>a.number-b.number).map(p=>`<div class="sub-row"><span class="pnum">${p.number}</span><div><b>${esc(p.name)}</b><small>${esc(p.posName)} • ${p.stamina}% stamina</small></div><button class="btn ghost sm" data-action="pause:subDo" data-on="${benchId}" data-off="${p.id}">REPLACE</button></div>`).join('')}</div>`, 'tall');
}

function showMatchTactics() {
  const g=S.game;if(!g)return;
  const team=g[g.userTeam];
  team.tactics=team.tactics||{};
  showModal(`${modalHead('Match tactics',`${team.team.name} • IN-GAME`) }
    <div class="settings-panel flush">
      <div class="panel-row"><div><label>ATTACKING SHAPE</label><small>Adjust how the backs support</small></div><div class="segmented">${[['wide','WIDE'],['balanced','BALANCED'],['tight','TIGHT']].map(([k,l])=>`<button class="${(team.tactics.shape||'balanced')===k?'active':''}" data-action="pause:tactic" data-key="shape" data-val="${k}">${l}</button>`).join('')}</div></div>
      <div class="panel-row"><div><label>KICKING</label><small>Territory vs ball in hand</small></div><div class="segmented">${[['low','KEEP BALL'],['normal','BALANCED'],['high','KICK MORE']].map(([k,l])=>`<button class="${(team.tactics.kickMode||'normal')===k?'active':''}" data-action="pause:tactic" data-key="kickMode" data-val="${k}">${l}</button>`).join('')}</div></div>
      <div class="panel-row"><div><label>LINE SPEED</label><small>Defensive pressure</small></div><div class="segmented">${[['slow','HOLD'],['normal','BALANCED'],['fast','PRESS']].map(([k,l])=>`<button class="${(team.tactics.line||'normal')===k?'active':''}" data-action="pause:tactic" data-key="line" data-val="${k}">${l}</button>`).join('')}</div></div>
    </div>
    <button class="btn gold full" data-action="pause:resume">APPLY & RESUME</button>`, 'wide');
}

function stopMatch() {
  cancelAnimationFrame(S.raf);
  cancelAnimationFrame(S.goalRaf);
  S.matchResize?.disconnect();
  S.renderer?.dispose?.();
  S.renderer=null;
  S.game=null;
  S.matchMeta=null;
  S.matchView='prematch';
  S.audio.crowd(false);
  S.lastFrame=0;
}

function finishMatch() {
  closeModal();
  const meta=S.matchMeta, result=S.matchResult, g=S.game;
  if(!meta||!result)return;
  const target=meta.mode;
  if(meta.mode==='tournament'&&meta.fixture&&S.tournament){
    const t=S.tournament;
    const res=result.homeScore!=null?result:{homeScore:g?.score.home||0,awayScore:g?.score.away||0,homeTries:g?.stats.home.tries||0,awayTries:g?.stats.away.tries||0};
    recordResult(t,meta.fixture.id,res,{userMatch:true});
    save();
    stopMatch();
    S.route='tournament';S.tournamentGroup=meta.fixture.group??S.tournamentGroup;
    render();
    if(t.champion===t.userTeamId) setTimeout(()=>showTrophy(t),450);
    else toast('Result recorded. The tournament moves on.','success');
  } else if(meta.mode==='career'&&meta.fixture&&S.career){
    const c=S.career;
    const res=result.homeScore!=null?result:{homeScore:g?.score.home||0,awayScore:g?.score.away||0,homeTries:g?.stats.home.tries||0,awayTries:g?.stats.away.tries||0};
    recordCareerResult(c,meta.fixture.id,res);
    save();stopMatch();S.route='career';S.careerTab='overview';render();
    toast('Match result recorded. Squad fitness updated.','success');
  } else if(meta.mode==='training'){
    if(S.career&&meta.careerTraining) runTrainingSession(S.career,meta.drillName||'Training');
    save();stopMatch();
    if(S.career){S.route='career';S.careerTab='training';render();toast('Training complete. +2 training points.','success');}
    else {S.route='training';render();toast('Drill complete. Great work.','success');}
  } else {
    stopMatch();S.route='home';render();toast(result.winner?'Full-time. A proper contest.':'Full-time.','info');
  }
}

function showTrophy(t) {
  const champ=team(t.champion);
  showModal(`<div class="trophy-modal">
    <div class="confetti-css">${Array.from({length:36},(_,i)=>`<i style="--x:${(i*41)%100}%;--d:${(i%9)*.22}s;--c:${['#d9b45b','#fff','#7fe1a3','#f06b5b','#8fc9ff'][i%5]}"></i>`).join('')}</div>
    <span class="kicker gold">WORLD CHAMPIONS</span>
    <div class="trophy-modal-art">${trophySVG()}</div>
    <h2>${esc(champ.name)}</h2>
    <p>${esc(champ.nick)} are champions of the world.</p>
    <div class="champ-podium"><div><span>WINNERS</span><b>${champ.abbr}</b></div><div><span>RUNNERS-UP</span><b>${t.runnerUp?team(t.runnerUp).abbr:'—'}</b></div><div><span>THIRD</span><b>${t.thirdPlace?team(t.thirdPlace).abbr:'—'}</b></div></div>
    <button class="btn gold full" data-action="modal:close">${icon('trophy',18)} LIFT THE TROPHY</button>
  </div>`, 'trophy-modal-wrap');
}

/* ---------------- Player & career modals ---------------- */
function showPlayerModal(id) {
  const c=S.career;if(!c)return;
  const p=c.squad.find(x=>x.id===id);if(!p)return;
  const starter=c.lineup.includes(p.id);
  showModal(`${modalHead(p.name,`${p.posName} • #${p.number}`)}
    <div class="player-hero">${crest(team(c.teamId),58)}<div><span>OVERALL</span><b>${p.overall}</b></div><div><span>POTENTIAL</span><b>${p.potential}</b></div><div><span>AGE</span><b>${p.age}</b></div><div><span>FORM</span><b>${p.form}</b></div></div>
    <div class="player-bars"><div><span>Fitness</span><div class="mini-bar"><i style="width:${p.fitness}%"></i></div><b>${p.fitness}%</b></div><div><span>Morale</span><div class="mini-bar"><i style="width:${p.morale}%"></i></div><b>${p.morale}%</b></div></div>
    ${p.injury?`<div class="injury-note">${icon('shield',14)} Injured — unavailable for ${p.injury} match${p.injury>1?'es':''}</div>`:''}
    <h3 class="modal-sub">ATTRIBUTES <small>${c.trainingPoints} training pts available</small></h3>
    <div class="attr-grid">${ATTRS.map(a=>`<div class="attr-item"><span>${ATTR_LABELS[a]}</span><b>${p[a]}</b><div class="mini-bar"><i style="width:${p[a]}%"></i></div>${c.trainingPoints>0?`<button data-action="career:develop" data-id="${p.id}" data-attr="${a}" aria-label="Train ${ATTR_LABELS[a]}">+</button>`:''}</div>`).join('')}</div>
    <div class="player-actions"><button class="btn ghost" data-action="career:swapStart" data-id="${p.id}">${starter?'MOVE TO BENCH':'SELECT FOR XV'}</button><button class="btn gold" data-action="modal:close">DONE</button></div>`, 'tall');
}

function showSwapOptions(playerId) {
  const c=S.career;if(!c)return;
  const p=c.squad.find(x=>x.id===playerId);if(!p)return;
  const starter=c.lineup.includes(p.id);
  const options=starter?c.bench.map(id=>c.squad.find(x=>x.id===id)).filter(Boolean):c.lineup.map(id=>c.squad.find(x=>x.id===id)).filter(Boolean);
  showModal(`${modalHead(starter?'Swap to the bench':'Choose a starter',`${esc(p.name)} • ${esc(p.posName)}`)}
    <div class="sub-list">${options.map(o=>`<div class="sub-row"><span class="pnum">${o.number}</span><div><b>${esc(o.name)}</b><small>${esc(o.posName)} • ${o.overall} OVR • ${o.fitness}% fit</small></div><button class="btn ghost sm" data-action="career:swapDo" data-starter="${starter?o.id:p.id}" data-bench="${starter?p.id:o.id}">SWAP</button></div>`).join('')}</div>`, 'tall');
}

function showDraw(t) {
  showModal(`${modalHead('Pool draw complete',esc(t.name))}
    <div class="draw-grid">${t.groups.map((g,i)=>`<div class="draw-group"><h4>POOL ${'ABCD'[i]||i+1}</h4>${g.map(id=>`<div class="draw-team ${id===t.userTeamId?'mine':''}">${crest(team(id),26)}<b>${team(id).abbr}</b><span>${esc(team(id).name)}</span></div>`).join('')}</div>`).join('')}</div>
    <p class="draw-note">Top two from each pool qualify for the knockout stage. Your fixtures are saved automatically.</p>
    <button class="btn gold full" data-action="modal:close">${icon('trophy',17)} BEGIN TOURNAMENT</button>`, 'wide');
}

/* ---------------- Actions ---------------- */
function handleAction(action,data,el,ev) {
  switch(action) {
    case 'nav:home': go('home'); break;
    case 'nav:tournament': go('tournament'); break;
    case 'nav:career': go('career'); break;
    case 'nav:historical': go('historical'); break;
    case 'nav:custom': go('custom'); break;
    case 'nav:training': go('training'); break;
    case 'nav:settings': go('settings'); break;
    case 'modal:close': closeModal(); break;
    case 'quick:open': go('quick'); break;
    case 'quick:swap': [S.quick.home,S.quick.away]=[S.quick.away,S.quick.home];save();render();break;
    case 'quick:half': S.quick.half=Number(data.val);save();render();break;
    case 'quick:difficulty': S.quick.difficulty=data.val;save();render();break;
    case 'quick:kickoff': startQuickMatch(); break;
    case 'team:pick': openTeamPicker(data.mode||'quick',data.side||''); break;
    case 'team:choose': chooseTeam(data.team); break;
    case 'team:inspect': inspectTeam(data.team); break;
    case 'tour:start': startTournament(); break;
    case 'tour:group': S.tournamentGroup=Number(data.i);render();break;
    case 'tour:play': playTournamentMatch(); break;
    case 'tour:sim': simulateUserTournamentMatch(); break;
    case 'tour:advance': advanceTournament(); break;
    case 'tour:simround': advanceTournament(); break;
    case 'tour:new': confirmNewTournament(); break;
    case 'tour:confirmNew': S.tournament=null;save();closeModal();render();break;
    case 'tour:celebrate': if(S.tournament?.champion)showTrophy(S.tournament);break;
    case 'hist:open': openHistoric(data.year); break;
    case 'hist:start': startHistoric(data.year); break;
    case 'hist:pick': openTeamPicker('historical'); break;
    case 'hist:tab': S.archiveTab=data.tab;save();render();break;
    case 'hist:filter': S[data.key]=(data.key==='archiveFilterYear'||data.key==='archiveTournament')?Number(data.value):data.value;save();render();break;
    case 'hist:dream': startDreamMatch(data.id); break;
    case 'hist:era': showArchiveEra(data.era); break;
    case 'hist:team': showArchiveTeam(data.team); break;
    case 'hist:player': showArchivePlayer(data.player); break;
    case 'hist:playEra': startEraMatch(data.era); break;
    case 'hist:playPlayer': startArchivePlayerMatch(data.player); break;
    case 'hist:playTeam': startArchiveTeamMatch(data.team); break;
    case 'custom:size': setCustomSize(Number(data.val)); break;
    case 'custom:team': toggleCustomTeam(data.team); break;
    case 'custom:user': openTeamPicker('custom'); break;
    case 'custom:create': createCustomTournament(); break;
    case 'train:start': startTraining(data.drill); break;
    case 'career:start': startCareer(); break;
    case 'career:tab': S.careerTab=data.tab;render();break;
    case 'career:play': playCareerMatch(); break;
    case 'career:sim': simulateCareerMatch(); break;
    case 'career:advance': advanceCareer(); break;
    case 'career:autopick': autoPickLineup(S.career);save();render();toast('Best available XV selected.','success');break;
    case 'career:player': showPlayerModal(data.id); break;
    case 'career:swapStart': showSwapOptions(data.id); break;
    case 'career:swapDo': if(swapCareerPlayer(S.career,data.starter,data.bench)){save();closeModal();render();toast('Lineup updated.','success');}break;
    case 'career:develop': if(developPlayer(S.career,data.id,data.attr)){save();showPlayerModal(data.id);toast(`${ATTR_LABELS[data.attr]} improved.`,'success');}else toast('Not enough training points.','warn');break;
    case 'career:tactic': S.career.tactics[data.key]=data.val;save();render();break;
    case 'career:newseason': newCareerSeason(S.career);save();S.careerTab='overview';render();toast('A new season begins.','success');break;
    case 'setting:toggle': S.settings[data.key]=!S.settings[data.key];save();render();break;
    case 'setting:layout': S.settings.layout=data.val;save();render();break;
    case 'setting:difficulty': S.settings.difficulty=data.val;save();render();break;
    case 'setting:camera': S.settings.cameraZoom=data.val==='close'?1.12:data.val==='wide'?.9:1;save();render();break;
    case 'settings:save': save();toast('Progress saved.','success');break;
    case 'settings:reset': confirmReset();break;
    case 'settings:resetDo': localStorage.removeItem(SAVE_KEY);location.reload();break;
    case 'match:kickoff': kickOffMatch(); break;
    case 'match:anthem': playAnthem(); break;
    case 'match:pause': showPauseMenu(); break;
    case 'match:sound': S.settings.sound=!S.settings.sound;S.audio.setEnabled(S.settings.sound);save();toast(S.settings.sound?'Sound on':'Sound off','info');break;
    case 'match:pass': if(S.game){ if(S.game.ball.holder&&S.game.ball.holder.side!==S.game.userTeam)S.game.switchDefender(); else S.game.pass(); }break;
    case 'match:switch': if(S.game)S.game.switchDefender();break;
    case 'match:kick': if(S.game){S.game.openKickMenu();}break;
    case 'match:action': if(S.game)S.game.action();break;
    case 'match:offload': if(S.game)S.game.offload();break;
    case 'match:fend': if(S.game)S.game.fend();break;
    case 'match:step': if(S.game)S.game.sidestep();break;
    case 'match:tackle': if(S.game)S.game.manualTackle(data.type||'normal');break;
    case 'match:jumper': if(S.game)S.game.setLineoutJumper(Number(data.i));break;
    case 'match:closeKick': if(S.game)S.game.closeKickMenu();closeKickOverlay();break;
    case 'match:chooseKick': if(S.game){S.game.chooseKick(data.kick);}closeKickOverlay();break;
    case 'match:penalty': if(S.game){S.game.choosePenalty(data.opt);}closePenaltyOverlay();break;
    case 'match:goalKick': takeGoalKick(); break;
    case 'match:secondHalf': if(S.game){S.game.startSecondHalf();S.audio.crowd(true);}closeModal();break;
    case 'match:subs': showSubs(); break;
    case 'match:finish': finishMatch(); break;
    case 'pause:resume': if(S.game)S.game.paused=false;closeModal();break;
    case 'pause:tactics': showMatchTactics();break;
    case 'pause:subs': showSubs();break;
    case 'pause:quit': confirmQuit();break;
    case 'pause:quitDo': closeModal();stopMatch();S.route='home';render();toast('Match abandoned.','info');break;
    case 'pause:autoSubs': if(S.game){S.game.autoSubs(S.game.userTeam);showSubs();}break;
    case 'pause:subOn': showSubTargets(data.id);break;
    case 'pause:subDo': if(S.game){S.game.substitute(data.off,data.on);showSubs();}break;
    case 'pause:tactic': if(S.game){const t=S.game[S.game.userTeam].tactics;t[data.key]=data.val;toast('Tactics updated.','success');showMatchTactics();}break;
  }
}

function chooseTeam(id) {
  const ctx=S.pickContext||{mode:'quick',side:'home'};
  if(ctx.mode==='quick') S.quick[ctx.side||'home']=id;
  else if(ctx.mode==='tournament') S.tournamentTeam=id;
  else if(ctx.mode==='career') S.careerTeam=id;
  else if(ctx.mode==='historical') S.histTeam=id;
  else if(ctx.mode==='custom'){
    const c=S.custom;
    if(!c.teams.includes(id)){
      if(c.teams.length>=c.size){toast('Tournament is full. Remove a nation first.','warn');return;}
      c.teams.push(id);
    }
    c.userTeam=id;
  }
  save();closeModal();
  if(ctx.mode==='historical'){ openHistoric(S.histYear); }
  else render();
}

function startQuickMatch() {
  const venue=$('#quick-venue')?.value||STADIUMS[0];
  launchMatch({
    homeTeam:team(S.quick.home),awayTeam:team(S.quick.away),
    userTeam:'home',mode:'quick',halfSeconds:S.quick.half*60,
    difficulty:S.quick.difficulty,venue
  });
}

function startTournament() {
  const ids=TEAMS.slice(0,20).map(t=>t.id);
  if(!ids.includes(S.tournamentTeam))ids[0]=S.tournamentTeam;
  S.tournament=makeTournament({teamIds:ids,userTeamId:S.tournamentTeam,groupsCount:4,name:'Rugby World Cup 2026'});
  save();S.route='tournament';S.tournamentGroup=0;render();showDraw(S.tournament);
  S.audio.cheer(.3);
}

function playTournamentMatch() {
  const t=S.tournament,f=nextUserFixture(t);if(!t||!f){toast('No match ready. Advance the tournament.','info');return;}
  const home=team(f.homeId),away=team(f.awayId);
  const userTeam=f.homeId===t.userTeamId?'home':'away';
  const stageLabel=f.stage==='group'?`POOL ${'ABCD'[f.group]||f.group+1} • ROUND ${f.round}`:{qf:'QUARTER-FINAL',sf:'SEMI-FINAL',third:'THIRD-PLACE PLAY-OFF',final:'WORLD CUP FINAL'}[f.stage];
  const year=t.edition||null;
  launchMatch({homeTeam:home,awayTeam:away,userTeam,mode:'tournament',halfSeconds:180,difficulty:S.settings.difficulty,
    venue:f.venue,fixture:f,stageLabel,stage:f.stage,year,
    homeSquad:year?historicalSquad(f.homeId,year):undefined,
    awaySquad:year?historicalSquad(f.awayId,year):undefined});
}

function simulateUserTournamentMatch() {
  const t=S.tournament,f=nextUserFixture(t);if(!t||!f)return;
  const r=simulateMatch(team(f.homeId),team(f.awayId),{knockout:f.stage!=='group'});
  f.played=true;f.homeScore=r.homeScore;f.awayScore=r.awayScore;f.homeTries=r.homeTries;f.awayTries=r.awayTries;f.simulated=true;
  t.lastResults=[f];
  simulateRemainingInRound(t);advanceIfReady(t);save();render();
  toast(`Simulated: ${team(f.homeId).abbr} ${r.homeScore} – ${r.awayScore} ${team(f.awayId).abbr}`,'info');
  if(t.champion===t.userTeamId)setTimeout(()=>showTrophy(t),300);
}

function advanceTournament() {
  const t=S.tournament;if(!t)return;
  if(t.champion){render();return;}
  simulateRemainingInRound(t);advanceIfReady(t);save();render();
  if(t.champion)toast(`${team(t.champion).name} are champions.`,'success');
}

function confirmNewTournament() {
  showModal(`${modalHead('Start a new tournament?','THIS CANNOT BE UNDONE')}
    <p class="modal-copy">Your current World Cup progress will be deleted. Career progress is not affected.</p>
    <div class="modal-buttons"><button class="btn ghost" data-action="modal:close">CANCEL</button><button class="btn danger" data-action="tour:confirmNew">DELETE & START NEW</button></div>`,'wide');
}

function openHistoric(year) {
  const e=HISTORIC_EDITIONS.find(x=>x.year===Number(year));if(!e)return;
  S.histYear=Number(year);S.histTeam=S.histTeam||e.winner;
  const w=team(e.winner),r=team(e.runnerUp);
  showModal(`${modalHead(`${e.year} World Cup`,e.host.toUpperCase())}
    <div class="hist-modal-hero" style="--era:${e.colour}"><div class="hist-year-big">${e.year}</div><div class="hist-finalists">${crest(w,64)}<span>V</span>${crest(r,64)}</div><div class="hist-score">${esc(e.score)}</div><p>${esc(e.blurb)}</p></div>
    <div class="hist-facts"><div><span>WINNER</span><b>${esc(w.name)}</b></div><div><span>STAR PLAYER</span><b>${esc(e.star)}</b></div><div><span>HOST</span><b>${esc(e.host)}</b></div></div>
    <div class="hist-choose"><span>PLAY AS</span><div>${crest(team(S.histTeam),34)}<b>${esc(team(S.histTeam).name)}</b></div><button class="text-btn" data-action="hist:pick">CHANGE ${icon('swap',12)}</button></div>
    <button class="btn gold full" data-action="hist:start" data-year="${e.year}">${icon('trophy',17)} REPLAY THIS WORLD CUP</button>`,'wide');
}

function startHistoric(year) {
  const e=HISTORIC_EDITIONS.find(x=>x.year===Number(year));if(!e)return;
  S.tournament=historicalTournament(Number(year),S.histTeam||e.winner);
  save();closeModal();S.route='tournament';S.tournamentGroup=0;render();showDraw(S.tournament);
}

function setCustomSize(size) {
  const c=S.custom;c.size=size;
  c.teams=c.teams.slice(0,size);
  if(c.teams.length<size){for(const t of TEAMS){if(c.teams.length>=size)break;if(!c.teams.includes(t.id))c.teams.push(t.id);}}
  if(!c.teams.includes(c.userTeam))c.userTeam=c.teams[0];
  save();render();
}
function toggleCustomTeam(id) {
  const c=S.custom;
  if(c.teams.includes(id)){
    if(c.teams.length<=2){toast('Keep at least two nations.','warn');return;}
    if(c.userTeam===id){toast('Choose another nation before removing your team.','warn');return;}
    c.teams=c.teams.filter(x=>x!==id);
  } else {
    if(c.teams.length>=c.size){toast('Tournament is full. Remove a nation first.','warn');return;}
    c.teams.push(id);
  }
  save();render();
}
function createCustomTournament() {
  const c=S.custom;
  if(c.teams.length!==c.size){toast(`Select ${c.size} nations (${c.teams.length} selected).`,'warn');return;}
  const name=$('#custom-name')?.value||c.name;c.name=name;
  S.tournament=customTournament({name,teamIds:c.teams,userTeamId:c.userTeam,groupsCount:c.size===8?2:4});
  save();S.route='tournament';S.tournamentGroup=0;render();showDraw(S.tournament);
}

function startTraining(drill) {
  const names={passing:'Passing Ladder',tackling:'Tackle School',kicking:'Kicking Range',ruck:'Breakdown Battle'};
  const userTeamId=S.career?.teamId||S.selectedTeam;
  const oppId=userTeamId==='nz'?'za':'nz';
  launchMatch({
    homeTeam:team(userTeamId),awayTeam:team(oppId),userTeam:'home',mode:'training',halfSeconds:900,
    difficulty:'pro',venue:'World Rugby Training Centre',trainingDrill:drill,
    drillName:names[drill],careerTraining:!!S.career,stageLabel:`TRAINING • ${names[drill].toUpperCase()}`
  });
}

function startCareer() {
  const teamId=S.careerTeam||S.selectedTeam;
  const coach=$('#coach-name')?.value||'Alex Morgan';
  S.coachName=coach;
  S.career=makeCareer(teamId,coach);
  S.selectedTeam=teamId;
  save();S.route='career';S.careerTab='overview';render();
  toast(`Welcome to ${team(teamId).name}, ${coach}.`,'success');
}

function playCareerMatch() {
  const c=S.career,f=nextCareerFixture(c);if(!c||!f){toast('No fixture ready.','info');return;}
  const userHome=f.homeId===c.teamId;
  const userSquad=c.squad;
  const homeSquad=userHome?userSquad:squadFor(f.homeId,11);
  const awaySquad=userHome?squadFor(f.awayId,12):userSquad;
  launchMatch({
    homeTeam:team(f.homeId),awayTeam:team(f.awayId),userTeam:userHome?'home':'away',
    homeSquad,awaySquad,homeLineup:userHome?c.lineup:null,awayLineup:userHome?null:c.lineup,
    homeTactics:userHome?c.tactics:null,awayTactics:userHome?null:c.tactics,
    mode:'career',halfSeconds:180,difficulty:S.settings.difficulty,venue:f.venue,fixture:f,stageLabel:`ROUND ${f.round}`
  });
}
function simulateCareerMatch() {
  const c=S.career,f=nextCareerFixture(c);if(!c||!f)return;
  const r=simulateMatch(team(f.homeId),team(f.awayId),{});
  f.played=true;f.homeScore=r.homeScore;f.awayScore=r.awayScore;f.homeTries=r.homeTries;f.awayTries=r.awayTries;f.simulated=true;
  recordCareerResult(c,f.id,r);save();render();
  toast(`Simulated: ${team(f.homeId).abbr} ${r.homeScore} – ${r.awayScore} ${team(f.awayId).abbr}`,'info');
}
function advanceCareer() {
  const c=S.career;if(!c)return;
  if(c.seasonComplete){render();return;}
  simulateCareerRound(c);c.week++;
  if(c.week>c.totalWeeks){c.seasonComplete=true;const table=careerTable(c);c.champion=table[0]?.id;c.trophies+=c.champion===c.teamId?1:0;c.news.unshift(c.champion===c.teamId?'Champions!':'Season complete.');}
  save();render();
}

function takeGoalKick() {
  const g=S.game;if(!g?.goal)return;
  const q=clamp(1-Math.abs(S.goalMarker-.5)*2,0,1);
  const btn=$('#goal-layer [data-action="match:goalKick"]');if(btn)btn.disabled=true;
  g.takeGoalKick(q);
}

function confirmQuit() {
  showModal(`${modalHead('Quit this match?','PROGRESS WILL BE LOST')}
    <p class="modal-copy">Any tournament or career result from this match will not be recorded.</p>
    <div class="modal-buttons"><button class="btn ghost" data-action="modal:close">KEEP PLAYING</button><button class="btn danger" data-action="pause:quitDo">QUIT MATCH</button></div>`,'wide');
}
function confirmReset() {
  showModal(`${modalHead('Reset all data?','THIS CANNOT BE UNDONE')}
    <p class="modal-copy">This deletes every saved tournament, career, unlock and preference on this device.</p>
    <div class="modal-buttons"><button class="btn ghost" data-action="modal:close">CANCEL</button><button class="btn danger" data-action="settings:resetDo">RESET EVERYTHING</button></div>`,'wide');
}

function kickOffMatch() {
  const g=S.game;if(!g)return;
  $('#prematch-overlay')?.classList.add('leaving');
  setTimeout(()=>$('#prematch-overlay')?.classList.add('hidden'),500);
  S.matchView='live';
  g.paused=false;
  if(!g.started)g.start();
  S.audio.init();S.audio.crowd(true);S.audio.whistle();
  toast('Kick off! Use the joystick to play.','info');
}
function playAnthem() {
  const g=S.game;if(!g)return;
  S.audio.init();S.audio.anthem(g.home.team.id);
  toast(`${g.home.team.name} anthem plays around the stadium.`,'info');
}

/* ---------------- Render & init ---------------- */
function render() {
  const screen=$('#screen');
  let html='';
  switch(S.route){
    case 'home': html=homeScreen();break;
    case 'quick': html=quickScreen();break;
    case 'tournament': html=tournamentScreen();break;
    case 'historical': html=historicalScreen();break;
    case 'custom': html=customScreen();break;
    case 'training': html=trainingScreen();break;
    case 'career': html=careerScreen();break;
    case 'settings': html=settingsScreen();break;
    case 'match': html=matchScreen();break;
    default: html=homeScreen();
  }
  screen.innerHTML=html;
  renderNav();
  if(S.route==='match') requestAnimationFrame(initMatchScreen);
}

document.addEventListener('click',ev=>{
  const el=ev.target.closest('[data-action]');
  if(!el||el.disabled)return;
  ev.preventDefault();
  handleAction(el.dataset.action,el.dataset,el,ev);
});
document.addEventListener('input',ev=>{
  const el=ev.target;
  if(el.dataset.setting){
    const scale=Number(el.dataset.scale||1);
    S.settings[el.dataset.setting]=Number(el.value)/scale;
    save();
    if(el.dataset.setting==='controlScale'){const v=$('#scale-val');if(v)v.textContent=Math.round(S.settings.controlScale*100)+'%';}
    if(el.dataset.setting==='sensitivity'){const v=$('#sens-val');if(v)v.textContent=Math.round(S.settings.sensitivity*100)+'%';}
    const deck=$('.control-deck');if(deck)deck.style.setProperty('--ctrl',S.settings.controlScale);
  }
  if(el.dataset.careerRange&&S.career){
    S.career.tactics[el.dataset.careerRange]=Number(el.value);save();
    const b=el.closest('.panel-row')?.querySelector('.row-between b');if(b)b.textContent=el.value+'%';
  }
  if(el.id==='custom-name'){S.custom.name=el.value;save();}
  if(el.id==='coach-name'){S.coachName=el.value;save();}
  if(el.id==='quick-venue'){S.quick.venue=el.value;save();}
  if(el.id==='archive-country'){S.archiveCountry=el.value;save();render();}
});

window.addEventListener('pointerdown',()=>{S.audio.init();},{once:true});
window.addEventListener('keydown',ev=>{
  if(S.route!=='match'||!S.game)return;
  if(ev.key==='Escape'){showPauseMenu();return;}
  if(ev.key===' '){ev.preventDefault();S.game.action();}
  if(ev.key==='p'||ev.key==='P')S.game.pass();
  if(ev.key==='k'||ev.key==='K')S.game.openKickMenu();
});

render();

