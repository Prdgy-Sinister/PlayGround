/* MUSIC EMPIRE — simulation engine */
import {
  GENRES, genreById, TRAITS, traitById, makeArtist, makeProspect, makeStaffMarket, makeCompetitors,
  makeStaff, freshArtistName, resetNames, uid, clamp, rand, randi, pick, chance, round, sum,
  BUDGETS, FOCUS, RELEASE_TYPES, CAMPAIGNS, campaignById, VENUES, venueById, EQUIPMENT, FACILITIES,
  facilityById, DISTRIBUTION, distById, TIERS, tierForRep, fmtMoney, fmtNum, songTitle, albumTitle,
  EVENT_DEFS, makeAvatar,
} from './data.js';

export const SAVE_KEY = 'music-empire-save-v1';
const STUDIO_LEVELS = [
  { name: 'Bedroom Studio', base: 22, cost: 0, upkeep: 450 },
  { name: 'Project Studio', base: 40, cost: 120000, upkeep: 1600 },
  { name: 'Flagship Studio', base: 60, cost: 380000, upkeep: 5200 },
  { name: 'World-Class Complex', base: 78, cost: 900000, upkeep: 13000 },
];
const STUDIO_NAMES = ['Bedroom Studio', 'The Hit Room', 'Gold Room', 'Neon Lab', 'Skyline Studios', 'Basement 8', 'The Vault'];

let state = null;
let notify = () => {};

export const getState = () => state;
export function setNotifier(fn) { notify = fn; }
export function toast(msg, kind = 'info') { notify(msg, kind); }

/* ---------------------------------- setup ---------------------------------- */
export function brandInitials(name) {
  const words = String(name || 'ME').trim().split(/\s+/).filter(Boolean);
  if (!words.length) return 'ME';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function createNewGame({ name, color, logoShape, initials, founderGenre } = {}) {
  resetNames();
  const labelName = name?.trim() || 'Afterglow Records';
  const competitors = makeCompetitors(1);
  const tracks = [];
  // Seed the world with existing hits so the charts are alive from week one.
  for (const comp of competitors) {
    const seeds = randi(5, 8);
    for (let i = 0; i < seeds; i++) {
      releaseAiTrack(comp, tracks, 1, { age: randi(1, 9), silent: true });
    }
  }
  const s = {
    version: 1,
    started: true,
    week: 1,
    label: {
      name: labelName,
      initials: initials || brandInitials(labelName),
      color: color || '#ff2e63',
      logoShape: logoShape || 'vinyl',
      tagline: 'Independent. Uncompromising.',
      genre: founderGenre || 'pop',
    },
    cash: 150000,
    reputation: 6,
    tier: 0,
    dist: 'diy',
    studios: [{ id: uid('std'), name: 'Bedroom Studio', level: 0, equipment: [] }],
    facilities: [],
    staff: [],
    roster: [],
    prospects: [],
    staffMarket: makeStaffMarket(0, 7),
    competitors,
    acquired: [],
    tracks,
    demos: [],
    releases: [],
    campaigns: [],
    tours: [],
    chartSongs: [],
    chartAlbums: [],
    prevSongs: [],
    prevAlbums: [],
    news: [],
    history: [],
    ledger: { revenue: {}, expense: {} },
    totals: { revenue: 0, expenses: 0, streams: 0, downloads: 0, fans: 0, releases: 0, no1: 0, top10: 0, awards: 0, chartEntries: 0, tourRevenue: 0 },
    pendingEvents: [],
    awards: [],
    loans: [],
    trends: Object.fromEntries(GENRES.map((g) => [g.id, 1])),
    trendState: { hot: 'pop', nextShift: randi(5, 8) },
    flags: { won: false, insolventWeeks: 0, studioMalusUntil: 0, releaseCount: 0 },
    news: [],
    gameOver: false,
    createdAt: Date.now(),
  };
  // starting prospects — a real audition pool
  for (let i = 0; i < 11; i++) s.prospects.push(makeProspect(0, 1));
  const hot = s.trendState.hot;
  s.trends[hot] = 1.12;
  s.news.unshift({ week: 1, kind: 'welcome', text: `${labelName} is officially open for business. ${fmtMoney(150000)} in the bank and everything to prove.` });
  s.news.unshift({ week: 1, kind: 'trend', text: `${genreById(hot).name} is the sound of the moment. Artists in the genre are drawing extra attention.` });
  state = s;
  // Give the seed catalog a plausible current week so charts are alive on day one.
  for (const t of s.tracks) {
    const age = Math.max(1, s.week - t.releaseWeek);
    t.weekly = t.peak * Math.pow(0.5, Math.max(0, age - 1) / t.halfLife) * rand(0.85, 1.15);
    t.lastWeekly = t.weekly;
    t.streamsTotal = t.weekly * age * 0.7;
  }
  computeCharts(true);
  saveGame();
  return s;
}

export function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.started) return null;
    state = migrate(parsed);
    return state;
  } catch (e) {
    console.warn('Save could not load', e);
    return null;
  }
}
function migrate(s) {
  s.studios ||= [{ id: uid('std'), name: 'Bedroom Studio', level: 0, equipment: [] }];
  s.facilities ||= [];
  s.staff ||= [];
  s.roster ||= [];
  s.prospects ||= [];
  s.competitors ||= [];
  s.tracks ||= [];
  s.demos ||= [];
  s.releases ||= [];
  s.campaigns ||= [];
  s.tours ||= [];
  s.chartSongs ||= [];
  s.chartAlbums ||= [];
  s.prevSongs ||= [];
  s.prevAlbums ||= [];
  s.news ||= [];
  s.history ||= [];
  s.ledger ||= { revenue: {}, expense: {} };
  s.ledger.revenue ||= {};
  s.ledger.expense ||= {};
  s.pendingEvents ||= [];
  s.awards ||= [];
  s.loans ||= [];
  s.acquired ||= [];
  s.totals ||= { revenue: 0, expenses: 0, streams: 0, downloads: 0, fans: 0, releases: 0, no1: 0, top10: 0, awards: 0, chartEntries: 0, tourRevenue: 0 };
  s.trends ||= Object.fromEntries(GENRES.map((g) => [g.id, 1]));
  s.trendState ||= { hot: 'pop', nextShift: s.week + 4 };
  s.flags ||= {};
  s.flags.won ??= false;
  s.flags.insolventWeeks ??= 0;
  s.flags.studioMalusUntil ??= 0;
  s.staffMarket ||= makeStaffMarket(s.tier, 6);
  return s;
}
export function saveGame() {
  if (!state) return;
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (e) { console.warn(e); }
}
export function clearSave() {
  try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* noop */ }
  state = null;
}

function earn(amount, cat) {
  if (!amount || amount <= 0) return;
  state.cash += amount;
  state.ledger.revenue[cat] = (state.ledger.revenue[cat] || 0) + amount;
  state.totals.revenue += amount;
}
function spend(amount, cat) {
  if (!amount || amount <= 0) return;
  state.cash -= amount;
  state.ledger.expense[cat] = (state.ledger.expense[cat] || 0) + amount;
  state.totals.expenses += amount;
}
function addNews(text, kind = 'info') {
  state.news.unshift({ week: state.week, text, kind, id: uid('n') });
  if (state.news.length > 70) state.news.length = 70;
}
function addRep(n) {
  state.reputation = clamp(state.reputation + n, 0, 100);
}

/* --------------------------------- derived --------------------------------- */
export const findArtist = (id) => [...state.roster, ...state.prospects, ...state.competitors.flatMap((c) => c.artists)].find((a) => a.id === id);
export const findRosterArtist = (id) => state.roster.find((a) => a.id === id);
export const findDemo = (id) => state.demos.find((d) => d.id === id);
export const findRelease = (id) => state.releases.find((r) => r.id === id);
export const findTrack = (id) => state.tracks.find((t) => t.id === id);
export const findStaff = (id) => state.staff.find((s) => s.id === id);
export const activeCampaigns = () => state.campaigns.filter((c) => c.endWeek >= state.week);
export const activeTours = () => state.tours.filter((t) => t.status === 'active');
export const signedTracks = (artistId) => state.tracks.filter((t) => t.artistId === artistId && t.isPlayer);

export function studioQuality(studioId) {
  const st = state.studios.find((x) => x.id === studioId) || state.studios[0];
  if (!st) return 22;
  const lvl = STUDIO_LEVELS[st.level] || STUDIO_LEVELS[0];
  let q = lvl.base;
  for (const eqId of st.equipment || []) {
    const eq = EQUIPMENT.find((e) => e.id === eqId);
    if (eq) q += eq.quality;
  }
  const engineers = state.staff.filter((s) => s.role === 'engineer');
  if (engineers.length) q += Math.max(...engineers.map((e) => e.skill)) * 0.12;
  if (state.flags.studioMalusUntil > state.week) q -= 3;
  if (state.facilities.includes('marketing')) q += 1;
  return clamp(q, 8, 118);
}
export const studioLevelInfo = (level) => STUDIO_LEVELS[level] || STUDIO_LEVELS[0];
export const studioUpgradeCost = (st) => st.level >= STUDIO_LEVELS.length - 1 ? null : STUDIO_LEVELS[st.level + 1].cost;
export const newStudioCost = () => 180000 * (state.studios.length ** 1.4);

export function weeklyRecurring() {
  const items = [];
  const dist = distById(state.dist);
  if (dist.weekly) items.push({ label: 'Distribution', amount: dist.weekly, cat: 'distribution' });
  for (const st of state.studios) {
    const lvl = studioLevelInfo(st.level);
    items.push({ label: `${st.name} upkeep`, amount: lvl.upkeep, cat: 'studio' });
  }
  for (const f of state.facilities) {
    const def = facilityById(f);
    if (def) items.push({ label: def.name, amount: def.upkeep, cat: 'facilities' });
  }
  for (const s of state.staff) items.push({ label: `${s.name} · ${s.role}`, amount: s.salary, cat: 'staff' });
  for (const a of state.roster) {
    if (a.contract) items.push({ label: `${a.name} salary`, amount: a.contract.salary, cat: 'artists' });
  }
  for (const l of state.loans) {
    if (l.remaining > 0) items.push({ label: 'Loan payment', amount: l.payment, cat: 'loan' });
  }
  const office = 650 + state.tier * 900;
  items.push({ label: 'Office & admin', amount: office, cat: 'office' });
  return items;
}
export function weeklyBurn() {
  return sum(weeklyRecurring(), (i) => i.amount);
}
export function monthlyListeners() {
  const playerTracks = state.tracks.filter((t) => t.isPlayer);
  const recent = sum(playerTracks, (t) => t.weekly || 0);
  return Math.round(recent * 1.7);
}
export function catalogStreams() {
  return sum(state.tracks.filter((t) => t.isPlayer), (t) => t.streamsTotal || 0);
}
export function netWorth() {
  const assets = state.studios.reduce((a, s) => a + (studioLevelInfo(s.level).cost || 40000) * 0.6, 0)
    + sum(state.facilities, (f) => (facilityById(f)?.cost || 0) * 0.4)
    + sum(state.studios, (s) => sum(s.equipment || [], (e) => (EQUIPMENT.find((x) => x.id === e)?.cost || 0) * 0.4));
  return state.cash + assets - sum(state.loans, (l) => l.remaining);
}
export function artistWeekly(artistId) {
  return sum(state.tracks.filter((t) => t.artistId === artistId && t.isPlayer && state.week - t.releaseWeek <= 30), (t) => t.weekly || 0);
}
export function artistRoyaltyRate(a) { return a.contract?.royalty ?? 0.15; }
export function artistStatus(a) {
  if (a.busyUntil > state.week) return { label: 'On tour', color: '#f5c451' };
  if (a.contract && a.contract.weeksLeft <= 4) return { label: 'Contract ending', color: '#fb7185' };
  if (a.morale < 35) return { label: 'Unhappy', color: '#f97316' };
  return { label: 'In studio', color: '#2dd4bf' };
}
export function tierProgress() {
  const t = tierForRep(state.reputation);
  const next = TIERS[t.id + 1];
  if (!next) return { pct: 100, next: null };
  const prev = TIERS[t.id].rep;
  return { pct: clamp(((state.reputation - prev) / (next.rep - prev)) * 100, 0, 100), next };
}
export function labelTier() { return tierForRep(state.reputation); }
export function hasFacility(id) { return state.facilities.includes(id); }

/* ------------------------------ song creation ------------------------------ */
function staffSkill(role, id) {
  if (!id || id === 'self') return null;
  const s = state.staff.find((x) => x.id === id && x.role === role);
  return s || null;
}
export function previewSong(o = {}) {
  const artist = findRosterArtist(o.artistId) || {};
  if (!artist.id) return null;
  const producer = staffSkill('producer', o.producerId);
  const writer = staffSkill('songwriter', o.writerId);
  const feature = o.featureId && o.featureId !== 'none' ? findRosterArtist(o.featureId) : null;
  const studio = state.studios.find((s) => s.id === o.studioId) || state.studios[0];
  const b = BUDGETS[o.budget] || BUDGETS.standard;
  const f = FOCUS[o.focus] || FOCUS.balanced;
  const trait = traitById(artist.trait) || {};
  const genre = o.genre || artist.genre;
  const trend = state.trends[genre] || 1;
  const producerSkillVal = producer ? producer.skill : artist.skill * 0.65;
  const writerSkillVal = writer ? writer.skill : artist.songwriting;
  const studioQ = studioQuality(studio?.id);
  const genreMatch = artist.genre === genre ? 1 : 0;
  let quality = 18 + artist.skill * 0.26 + writerSkillVal * 0.19 + producerSkillVal * 0.2
    + (studioQ - 20) * 0.13 + b.quality * 0.7 + (trait.quality || 0) + f.quality
    + genreMatch * 4 + (feature ? (feature.skill - 50) * 0.08 + 1.5 : 0);
  let commercial = 15 + artist.charisma * 0.32 + quality * 0.22 + (trend - 1) * 26 + f.commercial
    + (trait.commercial || 0) + genreMatch * 2 + (feature ? feature.charisma * 0.08 : 0);
  const featMod = (artist.popularity + (feature?.popularity || 0)) / 220;
  quality = clamp(quality + featMod * 3, 20, 99);
  commercial = clamp(commercial, 15, 99);
  const appeal = quality * 0.56 + commercial * 0.44;
  const peak = computePeak(appeal, artist.popularity, state.reputation, distById(state.dist).reach, 1, trend, false);
  const featureFee = feature ? Math.round(2500 + feature.popularity * 190) : 0;
  const legal = hasFacility('legal') ? 0.88 : 1;
  const cost = Math.round((b.cost + featureFee) * legal);
  return { quality: Math.round(quality), commercial: Math.round(commercial), appeal: Math.round(appeal), peak, cost, featureFee, studioQ: Math.round(studioQ) };
}

export function computePeak(appeal, popularity, rep, distReach = 1, extra = 1, trend = 1, randomize = true) {
  const core = clamp((appeal - 18) / 82, 0, 1.12);
  const reach = (0.7 + rep / 100 * 0.9 + popularity / 100 * 1.02) * distReach;
  const noise = randomize ? rand(0.88, 1.12) : 1;
  return Math.max(20000, core * core * 3200000 * reach * trend * extra * noise);
}

export function recordSong(payload = {}) {
  const artist = findRosterArtist(payload.artistId);
  if (!artist) return { error: 'Choose an artist.' };
  if (artist.busyUntil > state.week) return { error: `${artist.name} is on tour and can’t record this week.` };
  const p = previewSong(payload);
  if (!p) return { error: 'Session could not be set up.' };
  if (state.cash < p.cost) return { error: `Not enough cash. Session costs ${fmtMoney(p.cost)}.` };
  const b = BUDGETS[payload.budget] || BUDGETS.standard;
  const f = FOCUS[payload.focus] || FOCUS.balanced;
  const producer = staffSkill('producer', payload.producerId);
  const writer = staffSkill('songwriter', payload.writerId);
  const feature = payload.featureId && payload.featureId !== 'none' ? findRosterArtist(payload.featureId) : null;
  const genre = payload.genre || artist.genre;
  const quality = clamp(p.quality + rand(-4, 4), 20, 99);
  const commercial = clamp(p.commercial + rand(-4, 4), 15, 99);
  const title = (payload.title || '').trim() || songTitle(genre);
  spend(p.cost, 'recording');
  const demo = {
    id: uid('demo'),
    title,
    artistId: artist.id,
    artistName: artist.name,
    genre,
    quality: Math.round(quality),
    commercial: Math.round(commercial),
    appeal: Math.round(quality * 0.56 + commercial * 0.44),
    focus: payload.focus || 'balanced',
    budget: payload.budget || 'standard',
    producerId: producer?.id || null,
    producerName: producer?.name || 'Self-produced',
    writerName: writer?.name || artist.name,
    featureId: feature?.id || null,
    featureName: feature?.name || null,
    studioId: payload.studioId,
    createdWeek: state.week,
    cost: p.cost,
    cover: { hue: randi(0, 360), style: randi(0, 4) },
  };
  state.demos.unshift(demo);
  artist.morale = clamp(artist.morale + 3, 0, 100);
  addNews(`${artist.name} finished a new ${b.name.toLowerCase()}-budget session: “${title}”.`, 'studio');
  saveGame();
  return { ok: true, demo };
}

export function computeTrackCover(seed = {}) {
  return { hue: seed.hue ?? randi(0, 360), style: seed.style ?? randi(0, 4) };
}

/* -------------------------------- releases --------------------------------- */
export function scheduleRelease(payload = {}) {
  const artist = findRosterArtist(payload.artistId);
  if (!artist) return { error: 'Choose an artist.' };
  const ids = payload.demoIds || [];
  const type = payload.type || 'single';
  const def = RELEASE_TYPES[type];
  if (!def) return { error: 'Unknown release type.' };
  if (ids.length < def.min || ids.length > def.max) return { error: `${def.name} needs ${def.min === def.max ? def.min : `${def.min}–${def.max}`} songs.` };
  const demos = ids.map(findDemo).filter(Boolean);
  if (demos.length !== ids.length) return { error: 'One of those songs is no longer available.' };
  if (demos.some((d) => d.artistId !== artist.id)) return { error: 'All songs on a release must be by the same lead artist.' };
  if (artist.busyUntil > state.week) return { error: `${artist.name} is on tour. Schedule the release for after the tour.` };
  const offset = Number(payload.offset || 0);
  const marketing = Number(payload.marketing || 0);
  if (state.cash < marketing) return { error: `Not enough cash for the ${fmtMoney(marketing)} marketing budget.` };
  if (marketing > 0) spend(marketing, 'marketing');
  const release = {
    id: uid('rel'),
    type,
    title: (payload.title || '').trim() || (type === 'single' ? demos[0].title : albumTitle(demos[0].genre)),
    artistId: artist.id,
    artistName: artist.name,
    genre: demos[0].genre,
    demoIds: ids,
    trackIds: [],
    releaseWeek: state.week + offset,
    marketing,
    cover: computeTrackCover(demos[0].cover),
    createdWeek: state.week,
    status: offset === 0 ? 'launching' : 'scheduled',
    streams: 0,
    revenue: 0,
  };
  state.releases.unshift(release);
  for (const d of demos) d.releaseId = release.id;
  artist.morale = clamp(artist.morale + 3, 0, 100);
  artist.popularity = clamp(artist.popularity + 0.4, 0, 97);
  addNews(`${artist.name} announces ${def.name === 'Album' ? 'the album' : def.name === 'EP' ? 'an EP' : 'the single'} “${release.title}”${offset > 0 ? ` for week ${state.week + offset}` : ' — out now'}.`, 'release');
  if (offset === 0) launchRelease(release);
  saveGame();
  return { ok: true, release };
}

export function releaseMarketingMult(release) {
  return 1 + Math.min(0.85, (release?.marketing || 0) / 58000 * 0.85);
}

function launchRelease(release) {
  if (!release || release.status === 'active' || release.status === 'cancelled') return;
  const artist = findRosterArtist(release.artistId);
  const dist = distById(state.dist);
  const trend = state.trends[release.genre] || 1;
  const created = [];
  for (const demoId of release.demoIds) {
    const demo = findDemo(demoId);
    if (!demo) continue;
    const appeal = demo.quality * 0.56 + demo.commercial * 0.44;
    const extra = releaseMarketingMult(release) * (artist ? (0.9 + artist.popularity / 260) : 1);
    const peak = computePeak(appeal, artist?.popularity || 30, state.reputation, dist.reach, extra, trend);
    const halfLife = 4 + demo.quality / 10 + (artist?.popularity || 30) / 50;
    const track = {
      id: uid('trk'),
      title: demo.title,
      artistId: demo.artistId,
      artistName: demo.artistName,
      artistPopularity: artist?.popularity || 30,
      labelId: 'player',
      labelName: state.label.name,
      labelColor: state.label.color,
      genre: demo.genre,
      quality: demo.quality,
      commercial: demo.commercial,
      appeal,
      releaseKey: release.id,
      releaseTitle: release.title,
      releaseType: release.type,
      releaseWeek: state.week,
      peak,
      halfLife,
      weekly: 0,
      lastWeekly: 0,
      streamsTotal: 0,
      revenue: 0,
      chartPeak: 0,
      chartWeeks: 0,
      lastPos: 0,
      isPlayer: true,
      cover: release.cover,
      featureName: demo.featureName,
      rightsSold: false,
      entered: false,
      hit10: false,
      hit1: false,
    };
    state.tracks.push(track);
    state.demos = state.demos.filter((d) => d.id !== demo.id);
    created.push(track.id);
    release.streams = release.streams || 0;
  }
  release.trackIds = created;
  release.status = 'active';
  release.launchWeek = state.week;
  if (created.length) {
    state.flags.releaseCount++;
    state.totals.releases++;
    addRep(0.5);
    addNews(`“${release.title}” by ${release.artistName} is out now across all platforms.`, 'release');
    if (artist) {
      artist.morale = clamp(artist.morale + 6, 0, 100);
      artist.popularity = clamp(artist.popularity + 0.8, 0, 97);
      artist.hits = (artist.hits || 0) + 1;
    }
  }
}

export function cancelRelease(id) {
  const rel = findRelease(id);
  if (!rel || rel.status !== 'scheduled') return { error: 'Only scheduled releases can be cancelled.' };
  rel.status = 'cancelled';
  for (const d of state.demos) if (d.releaseId === rel.id) delete d.releaseId;
  addNews(`“${rel.title}” has been pulled from the release schedule.`, 'release');
  saveGame();
  return { ok: true };
}

/* -------------------------------- campaigns -------------------------------- */
export function campaignTargets(type) {
  const def = campaignById(type);
  if (!def) return [];
  if (def.target === 'release') {
    return state.releases.filter((r) => r.status === 'active' || r.status === 'scheduled').map((r) => ({ id: r.id, name: `${r.title} · ${r.artistName}`, sub: r.status === 'scheduled' ? `Out week ${r.releaseWeek}` : `${fmtNum(sum(state.tracks.filter((t) => t.releaseKey === r.id), (t) => t.weekly))} streams/wk` }));
  }
  return state.roster.map((a) => ({ id: a.id, name: a.name, sub: `${genreById(a.genre).name} · ${a.popularity.toFixed(0)} pop` }));
}

export function startCampaign(payload = {}) {
  const def = campaignById(payload.type);
  if (!def) return { error: 'Unknown campaign.' };
  const targets = campaignTargets(def.id);
  const target = targets.find((t) => t.id === payload.targetId);
  if (!target) return { error: 'Choose a target for this campaign.' };
  const cost = def.cost;
  if (state.cash < cost) return { error: `Not enough cash. This campaign costs ${fmtMoney(cost)}.` };
  spend(cost, 'marketing');
  let mult = 1;
  let note = '';
  const boost = hasFacility('marketing') ? 1.18 : 1;
  if (def.id === 'playlist') mult = 0.26;
  if (def.id === 'radio') mult = 0.2;
  if (def.id === 'video') mult = 0.38;
  if (def.id === 'launch') mult = 0.55;
  if (def.id === 'billboard') mult = 0.12;
  if (def.id === 'viral') {
    const roll = Math.random();
    mult = roll < 0.22 ? 1.5 : roll < 0.62 ? 0.45 : 0.18;
    note = mult > 1 ? 'The clip is taking off!' : 'The stunt is getting modest traction.';
  }
  mult *= boost;
  const artistId = def.target === 'release' ? findRelease(target.id)?.artistId : target.id;
  const artist = findRosterArtist(artistId);
  const campaign = {
    id: uid('cmp'),
    type: def.id,
    name: def.name,
    targetId: target.id,
    targetName: target.name,
    artistId,
    releaseId: def.target === 'release' ? target.id : null,
    startWeek: state.week,
    endWeek: state.week + def.weeks - 1,
    mult: mult * (def.id === 'billboard' ? 0.12 : 1),
    cost,
    note,
  };
  if (def.id === 'social' && artist) {
    artist.popularity = clamp(artist.popularity + 1.2, 0, 97);
    artist.fans += Math.round(artist.fans * 0.04 + 8000);
    artist.morale = clamp(artist.morale + 2, 0, 100);
  }
  if (def.id === 'interview' && artist) {
    artist.popularity = clamp(artist.popularity + 1.6, 0, 97);
    artist.morale = clamp(artist.morale + 4, 0, 100);
  }
  state.campaigns.unshift(campaign);
  addNews(`${def.name} launched for ${target.name}${note ? ` — ${note}` : ''}.`, 'marketing');
  saveGame();
  return { ok: true, campaign };
}

export function campaignMultiplier(track) {
  let m = 1;
  for (const c of activeCampaigns()) {
    if (c.type === 'social' || c.type === 'interview') continue;
    if (c.type === 'billboard') {
      if (c.artistId === track.artistId) m += c.mult * (hasFacility('marketing') ? 1.18 : 1);
      continue;
    }
    if (c.releaseId && c.releaseId === track.releaseKey) m += c.mult;
    else if (c.targetId === track.id) m += c.mult;
  }
  return m;
}
export function campaignRadioBonus(track) {
  let b = 0;
  for (const c of activeCampaigns()) {
    if (c.type === 'radio' && (c.releaseId === track.releaseKey || c.targetId === track.id)) b += 0.25;
  }
  return b;
}

/* ---------------------------------- tours ---------------------------------- */
export function previewTour(o = {}) {
  const artist = findRosterArtist(o.artistId);
  const venue = venueById(o.venueId);
  if (!artist || !venue) return null;
  const dates = Number(o.dates || 8);
  const price = Number(o.price || venue.ticket);
  const prod = Number(o.production ?? 1);
  const marketing = Number(o.marketing || 0);
  const prodMult = [0.72, 1, 1.42][prod] || 1;
  const priceFactor = clamp(1 - (price / venue.ticket - 1) * 0.38, 0.55, 1.16);
  const demand = clamp(0.16 + artist.popularity / 100 * 0.92 + (marketing / 60000) * 0.1 + (prodMult - 1) * 0.05, 0.08, 1.05);
  const attendance = Math.round(venue.cap * demand * priceFactor);
  const grossPer = attendance * price * 0.9;
  const merch = hasFacility('merch') ? attendance * 7.5 : 0;
  const costPer = venue.cost * prodMult;
  const revenue = (grossPer + merch) * dates;
  const cost = costPer * dates + marketing;
  const weeks = Math.ceil(dates / 2);
  return {
    artist, venue, dates, price, prod, marketing, attendance,
    fill: clamp(demand * priceFactor, 0, 1.1), revenue, cost, profit: revenue - cost,
    weeks, perShow: grossPer + merch, costPerShow: costPer,
    priceFactor,
  };
}
export function planTour(o = {}) {
  const p = previewTour(o);
  if (!p) return { error: 'Tour details are incomplete.' };
  if (p.artist.popularity < p.venue.minPop) return { error: `${p.artist.name} needs ${p.venue.minPop} popularity for ${p.venue.name} (currently ${p.artist.popularity.toFixed(0)}).` };
  if (p.artist.busyUntil > state.week) return { error: `${p.artist.name} is already on tour.` };
  if (state.cash < p.marketing) return { error: 'Not enough cash for the tour marketing budget.' };
  if (p.marketing > 0) spend(p.marketing, 'touring');
  const tour = {
    id: uid('tour'),
    artistId: p.artist.id,
    artistName: p.artist.name,
    venueId: p.venue.id,
    venueName: p.venue.name,
    dates: p.dates,
    price: p.price,
    production: p.prod,
    marketing: p.marketing,
    showsPerWeek: 2,
    weeks: p.weeks,
    weeksDone: 0,
    showsDone: 0,
    attendanceTotal: 0,
    revenueTotal: 0,
    costTotal: 0,
    status: 'active',
    startedWeek: state.week,
  };
  p.artist.busyUntil = state.week + p.weeks - 1;
  state.tours.unshift(tour);
  addNews(`${p.artist.name} announces a ${p.dates}-date ${p.venue.name.toLowerCase()} tour.`, 'tour');
  saveGame();
  return { ok: true, tour };
}

function tickTours() {
  for (const tour of activeTours()) {
    const artist = findRosterArtist(tour.artistId);
    const venue = venueById(tour.venueId);
    if (!artist || !venue) { tour.status = 'cancelled'; continue; }
    const remaining = tour.dates - tour.showsDone;
    const shows = Math.min(tour.showsPerWeek, remaining);
    if (shows <= 0) continue;
    const prodMult = [0.72, 1, 1.42][tour.production] || 1;
    const priceFactor = clamp(1 - (tour.price / venue.ticket - 1) * 0.38, 0.55, 1.16);
    const demand = clamp(0.16 + artist.popularity / 100 * 0.92 + (tour.marketing / 60000) * 0.1, 0.08, 1.05);
    const attendance = Math.round(venue.cap * demand * priceFactor * rand(0.92, 1.06));
    const gross = attendance * tour.price * 0.9;
    const merch = hasFacility('merch') ? attendance * 7.5 : 0;
    const cost = venue.cost * prodMult;
    const revenue = (gross + merch) * shows;
    const totalCost = cost * shows;
    earn(revenue, 'touring');
    spend(totalCost, 'touring');
    state.totals.tourRevenue += revenue;
    tour.weeksDone++;
    tour.showsDone += shows;
    tour.attendanceTotal += attendance * shows;
    tour.revenueTotal += revenue;
    tour.costTotal += totalCost;
    artist.popularity = clamp(artist.popularity + 0.5, 0, 97);
    artist.morale = clamp(artist.morale + 1, 0, 100);
    if (tour.showsDone >= tour.dates) {
      tour.status = 'complete';
      tour.completedWeek = state.week;
      const profit = tour.revenueTotal - tour.costTotal;
      const repGain = clamp(profit / 180000, 0.2, 3);
      addRep(repGain);
      artist.popularity = clamp(artist.popularity + 2 + Math.min(4, profit / 150000), 0, 97);
      artist.morale = clamp(artist.morale + 8, 0, 100);
      artist.busyUntil = state.week;
      addNews(`${artist.name} wrapped the ${tour.venueName} tour — ${fmtNum(tour.attendanceTotal)} tickets sold, ${fmtMoney(profit)} ${profit >= 0 ? 'profit' : 'loss'}.`, 'tour');
      saveGame();
    }
  }
}

/* --------------------------------- upgrades -------------------------------- */
export function upgradeStudio(studioId) {
  const st = state.studios.find((s) => s.id === studioId);
  if (!st) return { error: 'Studio not found.' };
  const cost = studioUpgradeCost(st);
  if (cost === null) return { error: 'This studio is already world-class.' };
  if (state.cash < cost) return { error: `Upgrade costs ${fmtMoney(cost)}.` };
  spend(cost, 'upgrade');
  st.level++;
  st.name = STUDIO_NAMES[Math.min(st.level + 1, STUDIO_NAMES.length - 1)] || st.name;
  addRep(0.8);
  addNews(`${st.name} has been upgraded to ${studioLevelInfo(st.level).name}.`, 'company');
  saveGame();
  return { ok: true };
}
export function buildStudio() {
  const cost = newStudioCost();
  if (state.cash < cost) return { error: `A new studio costs ${fmtMoney(cost)}.` };
  spend(cost, 'upgrade');
  const st = { id: uid('std'), name: `${pick(STUDIO_NAMES)} ${state.studios.length + 1}`, level: 1, equipment: [] };
  state.studios.push(st);
  addRep(1);
  addNews(`${st.name} opens — you can now run more sessions in parallel.`, 'company');
  saveGame();
  return { ok: true, studio: st };
}
export function buyEquipment(studioId, eqId) {
  const st = state.studios.find((s) => s.id === studioId);
  const eq = EQUIPMENT.find((e) => e.id === eqId);
  if (!st || !eq) return { error: 'Equipment not found.' };
  st.equipment ||= [];
  if (st.equipment.includes(eqId)) return { error: 'Already installed in this studio.' };
  if (state.cash < eq.cost) return { error: `Costs ${fmtMoney(eq.cost)}.` };
  spend(eq.cost, 'equipment');
  st.equipment.push(eqId);
  addNews(`${eq.name} installed at ${st.name}.`, 'company');
  saveGame();
  return { ok: true };
}
export function buildFacility(id) {
  const def = facilityById(id);
  if (!def) return { error: 'Unknown facility.' };
  if (state.facilities.includes(id)) return { error: 'Already built.' };
  if (state.tier < def.minTier) return { error: `Unlocks at ${TIERS[def.minTier].name}.` };
  if (state.cash < def.cost) return { error: `Costs ${fmtMoney(def.cost)}.` };
  spend(def.cost, 'facilities');
  state.facilities.push(id);
  addRep(0.7);
  addNews(`${def.name} is now operational.`, 'company');
  saveGame();
  return { ok: true };
}
export function hireStaff(staffId) {
  const s = state.staffMarket.find((x) => x.id === staffId);
  if (!s) return { error: 'Candidate unavailable.' };
  if (state.cash < s.hireCost) return { error: `Hiring costs ${fmtMoney(s.hireCost)}.` };
  spend(s.hireCost, 'staff');
  state.staff.push(s);
  state.staffMarket = state.staffMarket.filter((x) => x.id !== staffId);
  addNews(`${s.name} joins the team as ${s.role === 'marketer' ? 'Marketing Lead' : s.role[0].toUpperCase() + s.role.slice(1)}.`, 'company');
  saveGame();
  return { ok: true };
}
export function fireStaff(staffId) {
  const s = findStaff(staffId);
  if (!s) return { error: 'Staff member not found.' };
  spend(s.salary * 2, 'staff');
  state.staff = state.staff.filter((x) => x.id !== staffId);
  addNews(`${s.name} has left the label. Severance paid.`, 'company');
  saveGame();
  return { ok: true };
}
export function setDistribution(id) {
  const d = distById(id);
  if (!d) return { error: 'Unknown deal.' };
  if (state.tier < d.minTier) return { error: `${d.name} unlocks at ${TIERS[d.minTier].name}.` };
  if (state.dist === id) return { error: 'Already on this deal.' };
  state.dist = id;
  addNews(`New distribution deal signed: ${d.name}.`, 'company');
  saveGame();
  return { ok: true };
}
export function takeLoan(amount = 100000) {
  const maxLoan = [250000, 500000, 1200000, 2500000, 5000000, 9000000][state.tier] || 250000;
  if (amount > maxLoan) return { error: `Your credit line is limited to ${fmtMoney(maxLoan)}.` };
  const rate = 0.09;
  const weeks = 104;
  const weeklyRate = rate / 52;
  const payment = amount * (weeklyRate / (1 - Math.pow(1 + weeklyRate, -weeks)));
  state.loans.push({ id: uid('loan'), principal: amount, remaining: amount, payment: Math.round(payment), weeksLeft: weeks, rate });
  state.cash += amount;
  addNews(`The label secured a ${fmtMoney(amount)} loan. Weekly repayment ${fmtMoney(payment)}.`, 'finance');
  saveGame();
  return { ok: true };
}
export function repayLoan(id) {
  const l = state.loans.find((x) => x.id === id);
  if (!l) return { error: 'Loan not found.' };
  const payoff = Math.round(l.remaining * 1.03);
  if (state.cash < payoff) return { error: `Payoff is ${fmtMoney(payoff)}.` };
  spend(payoff, 'loan');
  state.loans = state.loans.filter((x) => x.id !== id);
  addNews('Loan repaid in full.', 'finance');
  saveGame();
  return { ok: true };
}

/* --------------------------------- signing --------------------------------- */
export function contractPackages(a) {
  if (!a) return [];
  const demand = a.salary || 1000;
  const legal = hasFacility('legal') ? 0.88 : 1;
  const mgmt = hasFacility('management') ? 0.94 : 1;
  const salary = (n) => Math.round((demand * n * mgmt) / 10) * 10;
  return [
    { id: 'budget', name: 'Budget Deal', advance: Math.round(a.advanceDemand * 0.55 * legal), salary: salary(0.82), royalty: Math.max(0.09, a.royaltyDemand - 0.04), weeks: 52, loyalty: -2, adj: -0.12, desc: 'Low risk, low commitment' },
    { id: 'standard', name: 'Standard Deal', advance: Math.round(a.advanceDemand * legal), salary: salary(1), royalty: a.royaltyDemand, weeks: 78, loyalty: 0, adj: 0.05, desc: 'A fair, balanced offer' },
    { id: 'star', name: 'Star Treatment', advance: Math.round(a.advanceDemand * 1.65 * legal), salary: salary(1.28), royalty: Math.min(0.3, a.royaltyDemand + 0.05), weeks: 104, loyalty: 8, adj: 0.24, desc: 'Big money, big loyalty' },
  ];
}
export function signChance(a, pkg, rep = state.reputation) {
  let c = 0.18 + rep * 0.008 + (a.popularity < 25 ? 0.18 : a.popularity < 45 ? 0.04 : -0.08) - a.ego * 0.003 + pkg.adj + (a.loyalty - 50) * 0.001;
  if (state.facilities.includes('management')) c += 0.05;
  if (state.tier >= 3) c += 0.08;
  return clamp(c, 0.05, 0.96);
}
export function signArtist(artistId, packageId) {
  const a = state.prospects.find((x) => x.id === artistId);
  if (!a) return { error: 'This artist is no longer available.' };
  const pkg = contractPackages(a).find((p) => p.id === packageId);
  if (!pkg) return { error: 'Choose a contract package.' };
  if (state.cash < pkg.advance) return { error: `Advance of ${fmtMoney(pkg.advance)} is too large for your balance.` };
  const chanceVal = signChance(a, pkg);
  if (Math.random() > chanceVal) {
    a.rejectedWeek = state.week;
    a.morale = clamp(a.morale - 2, 0, 100);
    addNews(`${a.name} turned down the ${pkg.name.toLowerCase()}. Their team wants a bigger commitment.`, 'roster');
    saveGame();
    return { ok: false, rejected: true, chance: chanceVal };
  }
  spend(pkg.advance, 'advance');
  a.scouted = true;
  a.labelId = 'player';
  a.labelName = state.label.name;
  a.contract = { weeksLeft: pkg.weeks, salary: pkg.salary, royalty: pkg.royalty, length: pkg.weeks };
  a.signedWeek = state.week;
  a.status = 'active';
  a.loyalty = clamp(a.loyalty + pkg.loyalty, 0, 100);
  a.morale = clamp(a.morale + (pkg.id === 'star' ? 10 : 3), 0, 100);
  state.prospects = state.prospects.filter((x) => x.id !== artistId);
  state.roster.push(a);
  addRep(0.4);
  addNews(`${a.name} signs with ${state.label.name} on a ${pkg.weeks}-week deal.`, 'roster');
  saveGame();
  return { ok: true, artist: a, chance: chanceVal };
}
export function scoutArtist(artistId) {
  const a = state.prospects.find((x) => x.id === artistId);
  if (!a) return { error: 'Artist not found.' };
  const cost = scoutPrice();
  if (state.cash < cost) return { error: `Scouting costs ${fmtMoney(cost)}.` };
  spend(cost, 'scouting');
  a.scouted = true;
  a.hiddenStats = false;
  addNews(`Scout report filed on ${a.name}. Full stats unlocked.`, 'roster');
  saveGame();
  return { ok: true };
}
export function releaseArtist(artistId) {
  const a = findRosterArtist(artistId);
  if (!a) return { error: 'Artist not in your roster.' };
  const severance = Math.round((a.contract?.salary || 1000) * (a.contract?.weeksLeft || 0) * 0.5);
  if (state.cash < severance) return { error: `Severance costs ${fmtMoney(severance)}.` };
  spend(severance, 'severance');
  state.roster = state.roster.filter((x) => x.id !== artistId);
  state.releases.filter((r) => r.artistId === artistId && r.status === 'scheduled').forEach((r) => { r.status = 'cancelled'; });
  state.demos = state.demos.filter((d) => d.artistId !== artistId);
  a.labelId = null;
  a.contract = null;
  a.status = 'free';
  a.busyUntil = 0;
  state.prospects.push({ ...a, scouted: true });
  addRep(-1);
  addNews(`${a.name} has left ${state.label.name} by mutual agreement. Severance: ${fmtMoney(severance)}.`, 'roster');
  saveGame();
  return { ok: true, severance };
}
export function renewContract(artistId) {
  const a = findRosterArtist(artistId);
  if (!a) return { error: 'Artist not in your roster.' };
  const demand = Math.round(a.salary * (1 + a.popularity / 260) * (hasFacility('management') ? 0.93 : 1) / 10) * 10;
  const loyaltyFactor = clamp((a.morale + a.loyalty) / 200 + state.reputation / 300, 0.2, 0.98);
  if (Math.random() > loyaltyFactor) {
    a.morale = clamp(a.morale - 5, 0, 100);
    addNews(`${a.name} rejected the renewal offer and will test free agency.`, 'roster');
    saveGame();
    return { ok: false, rejected: true, demand };
  }
  a.contract = { weeksLeft: 78, salary: demand, royalty: Math.min(0.32, a.contract?.royalty || a.royaltyDemand), length: 78 };
  a.morale = clamp(a.morale + 8, 0, 100);
  a.loyalty = clamp(a.loyalty + 3, 0, 100);
  addNews(`${a.name} re-signs with ${state.label.name} at ${fmtMoney(demand)}/week.`, 'roster');
  saveGame();
  return { ok: true, demand };
}
export function acquireLabel(compId) {
  const comp = state.competitors.find((c) => c.id === compId);
  if (!comp) return { error: 'Label not available.' };
  if (state.tier < 2) return { error: 'Acquisitions unlock at Rising Record Label.' };
  const cost = Math.round((comp.reputation * 42000 + comp.artists.length * 65000) / 1000) * 1000;
  if (state.cash < cost) return { error: `Acquisition costs ${fmtMoney(cost)}.` };
  spend(cost, 'acquisition');
  for (const a of comp.artists) {
    a.labelId = 'player';
    a.labelName = state.label.name;
    a.contract = { weeksLeft: randi(52, 104), salary: Math.round(a.salary * 1.05), royalty: 0.17, length: 104 };
    a.morale = clamp(a.morale + 5, 0, 100);
    state.roster.push(a);
  }
  state.competitors = state.competitors.filter((c) => c.id !== compId);
  state.acquired.push({ name: comp.name, week: state.week, cost, artists: comp.artists.length });
  addRep(3.2);
  addNews(`${comp.name} has been acquired by ${state.label.name}. ${comp.artists.length} artists join the roster.`, 'industry');
  saveGame();
  return { ok: true, cost };
}

/* ---------------------------------- tick ----------------------------------- */
function trackActivityFor(track) {
  let m = campaignMultiplier(track);
  const viral = track.viralBoost;
  if (viral && viral.untilWeek >= state.week) m *= viral.mult;
  return m;
}

function weeklyStreams(track, age) {
  const radio = campaignRadioBonus(track);
  const hl = track.halfLife * (1 + radio);
  const base = age <= 0 ? track.peak * 0.58 : track.peak * Math.pow(0.5, Math.max(0, age - 1) / hl) + track.peak * 0.012;
  const prev = state.prevSongs.find((p) => p.id === track.id);
  const chartBoost = prev ? 1 + Math.max(0, 41 - prev.pos) / 40 * 0.22 : 1;
  const trend = state.trends[track.genre] || 1;
  return Math.max(0, base * chartBoost * trackActivityFor(track) * rand(0.9, 1.1) * (0.85 + trend * 0.15));
}

function simulateTracks() {
  const artistStreams = new Map();
  for (const track of state.tracks) {
    const age = state.week - track.releaseWeek;
    if (age < 0) continue;
    const weekly = weeklyStreams(track, age);
    track.lastWeekly = track.weekly || 0;
    track.weekly = weekly;
    track.streamsTotal = (track.streamsTotal || 0) + weekly;
    if (track.isPlayer) {
      const dist = distById(state.dist);
      const artist = findRosterArtist(track.artistId);
      const royaltyRate = artist?.contract?.royalty ?? 0.15;
      const gross = weekly * 0.0046;
      const sales = weekly * 0.00055 * 1.29;
      let net = gross * (1 - dist.fee) * (1 - royaltyRate) + sales * (1 - dist.fee) * 0.7;
      if (track.rightsSold) net = 0;
      if (hasFacility('publishing')) net *= 1.04;
      earn(net, 'streaming');
      track.revenue = (track.revenue || 0) + net;
      state.totals.streams += weekly;
      state.totals.downloads += weekly * 0.00055;
      if (artist) {
        artistStreams.set(track.artistId, (artistStreams.get(track.artistId) || 0) + weekly);
        artist.totalStreams = (artist.totalStreams || 0) + weekly;
        artist.fans += Math.round(weekly * 0.012);
        state.totals.fans = Math.round((state.totals.fans || 0) + weekly * 0.012);
      }
      if (!track.rightsSold && weekly > 60000 && chance(0.004 + (track.quality / 100) * 0.008 + (hasFacility('sync') ? 0.02 : 0))) {
        const amount = Math.round(rand(4000, 24000) + track.quality * 260);
        earn(amount, 'sync');
        addNews(`“${track.title}” licensed for a sync placement — ${fmtMoney(amount)}.`, 'finance');
      }
      if (hasFacility('merch')) {
        const merch = weekly * 0.00009 * 26;
        earn(merch, 'merch');
      }
      track.chartEligible = age <= 30;
    }
  }
  // Artist popularity grows from actual listening.
  for (const a of state.roster) {
    const s = artistStreams.get(a.id) || 0;
    if (s > 0) {
      const delta = clamp(Math.log10(s / 35000 + 1) * 0.72, 0.02, 2.2);
      a.popularity = clamp(a.popularity + delta, 0, 97);
      // raw talent grows with studio time
      const tr = traitById(a.trait) || {};
      a.skill = clamp(a.skill + 0.03 + (tr.growth || 0) * 0.03, 0, 98);
      a.songwriting = clamp(a.songwriting + 0.02 + (tr.growth || 0) * 0.02, 0, 98);
    } else {
      a.popularity = clamp(a.popularity - 0.1, 0, 97);
    }
    a.careerWeeks++;
  }
}

function payWeeklyCosts() {
  for (const item of weeklyRecurring()) spend(item.amount, item.cat);
  // publishing passive income from catalog
  if (hasFacility('publishing')) {
    const cat = sum(state.tracks.filter((t) => t.isPlayer), (t) => t.weekly || 0);
    earn(cat * 0.0009, 'publishing');
  }
}

function tickLoans() {
  for (const l of state.loans) {
    if (l.remaining <= 0) continue;
    const interest = l.remaining * (l.rate / 52);
    l.remaining = Math.max(0, l.remaining + interest - l.payment);
    l.weeksLeft = Math.max(0, (l.weeksLeft || 104) - 1);
  }
  state.loans = state.loans.filter((l) => l.remaining > 1);
}

function updateArtists() {
  for (const a of [...state.roster]) {
    if (!a.contract) continue;
    a.contract.weeksLeft--;
    const tr = traitById(a.trait) || {};
    let moraleDelta = (65 - a.morale) * 0.018;
    const recent = state.tracks.some((t) => t.artistId === a.id && t.isPlayer && state.week - t.releaseWeek <= 3);
    if (recent) moraleDelta += 0.7;
    if (a.busyUntil > state.week) moraleDelta += 0.15;
    else if (!recent) moraleDelta -= 0.25;
    if (state.tier >= 2) moraleDelta += 0.12;
    if (hasFacility('management')) moraleDelta += 0.35;
    if (state.cash < 0) moraleDelta -= 1.2;
    if (a.contract.salary < (a.salary || 1000) * 0.92) moraleDelta -= 0.3;
    for (const c of activeCampaigns()) {
      if (c.artistId === a.id && (c.type === 'social' || c.type === 'interview')) moraleDelta += 0.25;
    }
    moraleDelta += (tr.morale || 0) * 0.05;
    a.morale = clamp(a.morale + moraleDelta + rand(-0.5, 0.5), 0, 100);
    a.loyalty = clamp(a.loyalty + (a.morale > 60 ? 0.12 : -0.08), 0, 100);
    // royalty & salary feel fair
    if (a.morale < 22 && chance(0.03)) {
      addNews(`${a.name} has gone quiet amid reports of unhappiness at the label.`, 'roster');
      a.morale = clamp(a.morale + 3, 0, 100);
    }
    if (a.contract.weeksLeft <= 0 && !a.contract.flagged) {
      a.contract.flagged = true;
      queueEvent('expiry', {
        artistId: a.id,
        artistName: a.name,
        salary: Math.round((a.salary || 1000) * (1 + a.popularity / 220) / 10) * 10,
        royalty: Math.round((a.royaltyDemand || 0.15) * 100),
      });
    }
  }
}

function simulateCompetitors() {
  for (const comp of state.competitors) {
    comp.lastRelease++;
    if (comp.lastRelease >= comp.releaseInterval) {
      comp.lastRelease = 0;
      comp.releaseInterval = randi(2, 4);
      releaseAiTrack(comp, state.tracks, state.week, {});
      comp.reputation = clamp(comp.reputation + rand(-0.4, 0.5), 20, 96);
    }
    // sign free agent
    if (chance(0.12 + comp.aggression * 0.08) && state.prospects.length > 3) {
      const candidate = state.prospects.find((p) => p.popularity > 22);
      if (candidate && chance(0.5)) {
        state.prospects = state.prospects.filter((p) => p.id !== candidate.id);
        const a = { ...candidate, labelId: comp.id, labelName: comp.name, status: 'active', scouted: true };
        a.contract = { weeksLeft: randi(52, 104), salary: a.salary, royalty: a.royaltyDemand, length: 78 };
        comp.artists.push(a);
        addNews(`${comp.name} signs ${a.name}, beating the market.`, 'industry');
      }
    }
    // poach a player artist occasionally
    if (state.tier >= 2 && comp.reputation > state.reputation && chance(0.02)) {
      const target = state.roster.filter((a) => a.morale < 45 && a.contract && a.contract.weeksLeft < 20).sort((a, b) => b.popularity - a.popularity)[0];
      if (target) {
        queueEvent('poach', {
          artistId: target.id,
          artistName: target.name,
          compName: comp.name,
          compId: comp.id,
          cost: Math.round((target.salary || 1500) * 12 + target.popularity * 900),
        });
      }
    }
  }
}

// Create an AI release. Used for seeding and weekly competitor activity.
function releaseAiTrack(comp, tracks, week, opts = {}) {
  if (!comp.artists.length) return null;
  const artist = pick(comp.artists);
  const isAlbum = !opts.silent && chance(0.16);
  const albumId = uid('airel');
  const albumName = albumTitle(artist.genre);
  const count = isAlbum ? randi(5, 8) : 1;
  const genre = artist.genre;
  const trend = state?.trends?.[genre] || 1;
  const baseQuality = clamp(42 + comp.reputation * 0.34 + rand(-10, 10) + (isAlbum ? -2 : 0), 25, 97);
  for (let i = 0; i < count; i++) {
    const q = clamp(baseQuality + rand(-5, 5) - i * (isAlbum ? 1.2 : 0), 22, 98);
    const c = clamp(q + rand(-8, 8), 20, 98);
    const appeal = q * 0.55 + c * 0.45;
    const extra = rand(0.78, 1.35);
    const peak = computePeak(appeal, artist.popularity, comp.reputation, 1.18, extra, trend);
    const releaseWeek = opts.silent ? week - opts.age : week;
    const track = {
      id: uid('trk'),
      title: i === 0 ? (isAlbum ? albumName : songTitle(genre)) : songTitle(genre),
      artistId: artist.id,
      artistName: artist.name,
      artistPopularity: artist.popularity,
      labelId: comp.id,
      labelName: comp.name,
      labelColor: comp.color,
      genre,
      quality: Math.round(q),
      commercial: Math.round(c),
      appeal,
      releaseKey: isAlbum ? albumId : uid('airel'),
      releaseTitle: isAlbum ? albumName : null,
      releaseType: isAlbum ? 'album' : 'single',
      releaseWeek,
      peak,
      halfLife: 4 + q / 10 + artist.popularity / 55,
      weekly: 0,
      lastWeekly: 0,
      streamsTotal: 0,
      chartPeak: 0,
      chartWeeks: 0,
      lastPos: 0,
      isPlayer: false,
      cover: { hue: randi(0, 360), style: randi(0, 4) },
      rightsSold: false,
      entered: false,
      hit10: false,
      hit1: false,
    };
    tracks.push(track);
  }
  if (isAlbum) comp.albums++;
  if (!opts.silent) {
    if (isAlbum) addNews(`${comp.name} drops ${artist.name}’s new album “${albumName}”.`, 'industry');
    else if (chance(0.55)) addNews(`${comp.name} releases “${songTitle(genre)}” by ${artist.name}.`, 'industry');
    if (chance(0.3)) artist.popularity = clamp(artist.popularity + 0.6, 0, 97);
  }
  return true;
}

function computeCharts(initial = false) {
  const eligible = state.tracks.filter((t) => t.releaseWeek <= state.week && (state.week - t.releaseWeek) <= 30 && (t.weekly || 0) > 1000);
  const ranked = [...eligible].sort((a, b) => (b.weekly || 0) - (a.weekly || 0)).slice(0, 100);
  const prev = state.prevSongs || [];
  const songs = ranked.slice(0, 40).map((t, i) => {
    const old = prev.find((p) => p.id === t.id);
    const pos = i + 1;
    t.chartWeeks = (t.chartWeeks || 0) + 1;
    t.chartPeak = t.chartPeak ? Math.min(t.chartPeak, pos) : pos;
    t.lastPos = pos;
    return {
      pos, prevPos: old?.pos || 0, move: old ? old.pos - pos : 0,
      id: t.id, title: t.title, artistId: t.artistId, artistName: t.artistName,
      labelId: t.labelId, labelName: t.labelName, labelColor: t.labelColor, genre: t.genre,
      weekly: t.weekly, total: t.streamsTotal, isPlayer: t.isPlayer, owner: t.isPlayer ? 'you' : 'rival',
      releaseWeek: t.releaseWeek, releaseType: t.releaseType, cover: t.cover, peak: t.chartPeak,
    };
  });
  state.chartSongs = songs;
  const albumGroups = new Map();
  for (const t of eligible) {
    if (t.releaseType !== 'album' && t.releaseType !== 'ep') continue;
    const g = albumGroups.get(t.releaseKey) || {
      id: t.releaseKey, title: t.releaseTitle || t.title, artistName: t.artistName,
      labelId: t.labelId, labelName: t.labelName, labelColor: t.labelColor,
      weekly: 0, isPlayer: t.isPlayer, tracks: 0, genre: t.genre, cover: t.cover,
    };
    g.weekly += t.weekly || 0;
    g.tracks++;
    albumGroups.set(t.releaseKey, g);
  }
  const prevAlbums = state.prevAlbums || [];
  const albums = [...albumGroups.values()].sort((a, b) => b.weekly - a.weekly).slice(0, 20).map((a, i) => {
    const old = prevAlbums.find((p) => p.id === a.id);
    return { ...a, pos: i + 1, prevPos: old?.pos || 0, move: old ? old.pos - (i + 1) : 0 };
  });
  state.chartAlbums = albums;
  state.prevSongs = songs;
  state.prevAlbums = albums;
  if (initial) return;
  // Reputation + news from the player's chart performance.
  let entries = 0;
  for (const row of songs) {
    if (!row.isPlayer) continue;
    const track = findTrack(row.id);
    if (!track) continue;
    entries++;
    if (!track.entered) {
      track.entered = true;
      addRep(0.5);
      state.totals.chartEntries++;
      addNews(`“${track.title}” enters the Global Songs chart at #${row.pos}.`, 'chart');
    }
    if (row.pos <= 10 && !track.hit10) {
      track.hit10 = true;
      addRep(1.2);
      state.totals.top10++;
      addNews(`“${track.title}” hits the Top 10 at #${row.pos}.`, 'chart');
    }
    if (row.pos === 1 && !track.hit1) {
      track.hit1 = true;
      addRep(2.6);
      state.totals.no1++;
      addNews(`#1. “${track.title}” tops the Global Songs chart.`, 'chart');
    }
    addRep(0.02);
  }
  const albumsPlayer = albums.filter((a) => a.isPlayer).length;
  if (albumsPlayer) addRep(0.05 * albumsPlayer);
}

function updateTrends() {
  if (state.week < state.trendState.nextShift) return;
  const old = state.trendState.hot;
  const genres = GENRES.map((g) => g.id);
  let next = pick(genres);
  while (next === old && genres.length > 1) next = pick(genres);
  state.trends[old] = clamp((state.trends[old] || 1) - rand(0.1, 0.18), 0.78, 1.3);
  state.trends[next] = clamp(rand(1.18, 1.4), 0.8, 1.45);
  for (const g of genres) {
    if (g !== next && g !== old) state.trends[g] = clamp((state.trends[g] || 1) + rand(-0.05, 0.04), 0.82, 1.18);
  }
  state.trendState.hot = next;
  state.trendState.nextShift = state.week + randi(5, 9);
  const g = genreById(next);
  addNews(`The sound shifts: ${g.name} is now the hottest genre in the industry.`, 'trend');
  if (chance(0.55)) {
    queueEvent('trendShift', { genre: next, genreName: g.name });
  }
}

function refreshMarkets() {
  if (state.week % 3 === 0) {
    const add = randi(2, 3);
    for (let i = 0; i < add; i++) state.prospects.push(makeProspect(state.tier, state.week));
    state.prospects = state.prospects.slice(-14);
  }
  if (state.week % 6 === 0) {
    state.staffMarket = makeStaffMarket(state.tier, 6);
  }
  if (state.week % 13 === 0) {
    addNews('Industry rankings refreshed. Rival labels are adjusting their strategies.', 'industry');
  }
}

function queueEvent(id, data = {}) {
  if (!EVENT_DEFS[id]) return;
  if (state.pendingEvents.some((e) => e.id === id && id !== 'controversy')) return;
  state.pendingEvents.push({ id, data, week: state.week, uid: uid('ev') });
}

function maybeEvents() {
  if (state.pendingEvents.length) return;
  if (state.gameOver) return;
  if (state.cash < 0) {
    state.flags.insolventWeeks = (state.flags.insolventWeeks || 0) + 1;
    if (state.flags.insolventWeeks >= 2) {
      queueEvent('insolvency', {});
      return;
    }
  } else {
    state.flags.insolventWeeks = 0;
  }
  if (chance(0.46)) {
    const hot = state.roster.length ? state.roster : [];
    const playerTracks = state.tracks.filter((t) => t.isPlayer && state.week - t.releaseWeek <= 12 && (t.weekly || 0) > 0);
    const options = [];
    if (playerTracks.length) {
      options.push('viral', 'publishing', 'viral');
    }
    if (hot.length) {
      options.push('controversy', 'dispute', 'collab', 'sponsor', 'radio', 'festival', 'breakdown', 'dispute');
    }
    if (state.competitors.length) options.push('poach');
    options.push('sponsor', 'radio');
    if (!options.length) return;
    const id = pick(options);
    const data = {};
    if (['viral', 'publishing'].includes(id)) {
      const t = pick(playerTracks);
      data.trackId = t.id;
      data.trackTitle = t.title;
      data.artistName = t.artistName;
      data.amount = Math.round(t.weekly * 0.0046 * rand(20, 45) + 8000);
    }
    if (['controversy', 'dispute', 'collab', 'radio', 'festival'].includes(id)) {
      const a = pick(hot);
      data.artistId = a.id;
      data.artistName = a.name;
      data.cost = id === 'collab' ? Math.round(18000 + a.popularity * 750) : Math.round((a.contract?.salary || 1500) * 3);
      if (id === 'collab') {
        const comp = pick(state.competitors);
        if (comp) {
          const star = comp.artists.sort((x, y) => y.popularity - x.popularity)[0];
          data.starName = star ? star.name : 'a global superstar';
        } else data.starName = 'a global superstar';
      }
    }
    if (id === 'sponsor') {
      const a = hot.length ? pick(hot) : null;
      if (!a) return;
      data.artistId = a.id;
      data.artistName = a.name;
      data.amount = Math.round(a.popularity * 900 + rand(12000, 40000));
    }
    if (id === 'breakdown') {
      data.amount = 18000;
    }
    queueEvent(id, data);
  }
}

function maybeAwards() {
  const weekOfYear = ((state.week - 1) % 52) + 1;
  if (weekOfYear !== 52) return;
  const playerSongs = state.chartSongs.filter((s) => s.isPlayer);
  const best = playerSongs[0];
  const year = 2026 + Math.floor((state.week - 1) / 52);
  if (!best) {
    addNews(`${year} Awards: your label had no chart presence this year. The industry moves on.`, 'award');
    if (state.reputation > 25) addRep(-0.5);
    return;
  }
  const category = best.pos <= 3 ? 'Song of the Year' : 'Breakthrough Artist';
  const winChance = clamp(0.18 + (41 - best.pos) / 40 * 0.55 + state.reputation / 260, 0.08, 0.86);
  queueEvent('awardShow', { category, winChance, trackTitle: best.title, artistName: best.artistName });
}

function checkTier() {
  const newTier = tierForRep(state.reputation);
  if (newTier.id > state.tier) {
    state.tier = newTier.id;
    addNews(`Milestone: ${state.label.name} is now a ${newTier.name}.`, 'company');
    if (newTier.id >= 5 && !state.flags.won) {
      state.flags.won = true;
      queueEvent('empire', { labelName: state.label.name, tierName: newTier.name });
    } else {
      queueEvent('tierUp', { labelName: state.label.name, tierName: newTier.name });
    }
  }
}

function recordHistory() {
  const revenue = sum(Object.values(state.ledger.revenue));
  const expenses = sum(Object.values(state.ledger.expense));
  state.history.push({
    week: state.week,
    revenue: Math.round(revenue),
    expenses: Math.round(expenses),
    net: Math.round(revenue - expenses),
    cash: Math.round(state.cash),
    streams: Math.round(sum(state.tracks.filter((t) => t.isPlayer), (t) => t.weekly || 0)),
    revenueBreakdown: { ...state.ledger.revenue },
    expenseBreakdown: { ...state.ledger.expense },
  });
  if (state.history.length > 80) state.history.shift();
  state.ledger = { revenue: {}, expense: {} };
}

export function advanceWeek() {
  if (!state || state.gameOver) return { error: 'This run is over.' };
  if (state.pendingEvents.length) return { error: 'Resolve the current event first.' };
  state.week++;
  // releases that are due
  for (const rel of state.releases.filter((r) => r.status === 'scheduled' && r.releaseWeek <= state.week)) launchRelease(rel);
  tickLoans();
  tickTours();
  simulateTracks();
  payWeeklyCosts();
  updateArtists();
  simulateCompetitors();
  computeCharts();
  updateTrends();
  refreshMarkets();
  maybeAwards();
  checkTier();
  maybeEvents();
  recordHistory();
  if (state.cash < -250000) {
    state.gameOver = true;
    addNews('The label has been placed into administration. The run is over.', 'finance');
  }
  // clean completed campaigns
  state.campaigns = state.campaigns.filter((c) => c.endWeek >= state.week - 1).slice(0, 24);
  saveGame();
  const h = state.history[state.history.length - 1];
  return { ok: true, history: h, week: state.week };
}

/* ------------------------------ event resolve ----------------------------- */
export function currentEvent() {
  const e = state.pendingEvents[0];
  if (!e) return null;
  return { ...e, def: EVENT_DEFS[e.id] };
}
export function resolveEvent(choiceIndex) {
  const e = state.pendingEvents[0];
  if (!e) return { error: 'No event to resolve.' };
  const def = EVENT_DEFS[e.id];
  const option = def.options[choiceIndex];
  if (!option) return { error: 'Invalid option.' };
  const optCost = typeof option.cost === 'function' ? option.cost(e.data || {}) : (option.cost || 0);
  if (optCost && state.cash < optCost) return { error: `You need ${fmtMoney(optCost)} for that choice.` };
  if (optCost) spend(optCost, 'events');
  const d = e.data || {};
  const artist = d.artistId ? findRosterArtist(d.artistId) : null;
  let msg = '';
  switch (e.id) {
    case 'viral': {
      const t = findTrack(d.trackId);
      if (t) {
        if (choiceIndex === 0) { t.peak *= 1.25; t.viralBoost = { mult: 2.1, untilWeek: state.week + 2 }; msg = `“${t.title}” is everywhere. The push worked.`; }
        else { t.viralBoost = { mult: 1.45, untilWeek: state.week + 2 }; msg = `“${t.title}” is growing organically.`; }
        addRep(0.4);
      }
      break;
    }
    case 'controversy': {
      if (artist) {
        if (choiceIndex === 0) { addRep(-1); artist.morale = clamp(artist.morale + 5, 0, 100); msg = `${artist.name} issued an apology. The story is cooling.`; }
        else if (choiceIndex === 1) { addRep(-3); artist.popularity = clamp(artist.popularity + 3.5, 0, 97); artist.fans += 40000; artist.morale = clamp(artist.morale + 2, 0, 100); msg = `${artist.name} doubled down. Fans love it; the industry doesn’t.`; }
        else { addRep(-0.2); msg = 'Crisis PR contained the story before it spread.'; }
      }
      break;
    }
    case 'dispute': {
      if (artist) {
        if (choiceIndex === 0) { artist.morale = clamp(artist.morale + 16, 0, 100); artist.loyalty = clamp(artist.loyalty + 10, 0, 100); msg = `${artist.name} is satisfied with the new bonus.`; }
        else if (choiceIndex === 1) { artist.morale = clamp(artist.morale + 5, 0, 100); artist.loyalty = clamp(artist.loyalty - 3, 0, 100); msg = `You promised ${artist.name} a bigger push. They’ll remember.`; }
        else {
          if (chance(0.45)) { const name = artist.name; releaseArtistForEvent(artist); msg = `${name} walked out and signed elsewhere.`; }
          else { artist.morale = clamp(artist.morale - 4, 0, 100); msg = `${artist.name} backed down — for now.`; }
        }
      }
      break;
    }
    case 'collab': {
      if (artist && choiceIndex === 0) {
        const genre = artist.genre;
        const quality = clamp(82 + rand(-3, 8), 60, 99);
        const commercial = clamp(78 + rand(-5, 10), 55, 99);
        state.demos.unshift({
          id: uid('demo'), title: `${songTitle(genre)} (feat. ${d.starName})`, artistId: artist.id, artistName: artist.name,
          genre, quality: Math.round(quality), commercial: Math.round(commercial), appeal: Math.round(quality * 0.56 + commercial * 0.44),
          focus: 'balanced', budget: 'premium', producerId: null, producerName: 'Executive session', writerName: artist.name,
          featureId: null, featureName: d.starName, studioId: state.studios[0]?.id, createdWeek: state.week, cost: optCost,
          cover: { hue: randi(0, 360), style: randi(0, 4) }, special: true,
        });
        artist.popularity = clamp(artist.popularity + 1.5, 0, 97);
        addRep(0.5);
        msg = `A collab with ${d.starName} is in the vault. It’s a monster.`;
      } else msg = 'You passed on the collaboration.';
      break;
    }
    case 'sponsor': {
      if (choiceIndex === 0) { earn(d.amount, 'sponsorship'); if (artist) artist.popularity = clamp(artist.popularity + 1, 0, 97); addRep(0.25); msg = `Sponsorship signed: ${fmtMoney(d.amount)}.`; }
      else msg = 'You protected the artist’s credibility.';
      break;
    }
    case 'radio': {
      if (choiceIndex === 0 && artist) { artist.popularity = clamp(artist.popularity + 2.2, 0, 97); artist.morale = clamp(artist.morale + 4, 0, 100); addRep(0.15); msg = `${artist.name} nailed the interview. Radio is on side.`; }
      else msg = 'The interview was declined.';
      break;
    }
    case 'breakdown': {
      if (choiceIndex === 0) msg = 'The console is fixed. Sessions are back to normal.';
      else { state.flags.studioMalusUntil = state.week + 4; msg = 'The console is patched together. Studio quality suffers for 4 weeks.'; }
      break;
    }
    case 'festival': {
      if (choiceIndex === 0 && artist) {
        const fee = Math.round(35000 + artist.popularity * 1200);
        earn(fee, 'touring');
        artist.busyUntil = state.week + 1;
        artist.popularity = clamp(artist.popularity + 2.8, 0, 97);
        artist.morale = clamp(artist.morale + 6, 0, 100);
        addRep(0.8);
        msg = `${artist.name} played the festival for ${fmtMoney(fee)} and stole the show.`;
      } else msg = 'You kept the artist in the studio.';
      break;
    }
    case 'poach': {
      if (choiceIndex === 0 && artist) {
        artist.loyalty = clamp(artist.loyalty + 14, 0, 100);
        artist.morale = clamp(artist.morale + 10, 0, 100);
        artist.contract = { ...artist.contract, weeksLeft: Math.max(52, artist.contract?.weeksLeft || 52) };
        msg = `${artist.name} stays. The rival label is furious.`;
      } else if (artist) {
        const comp = state.competitors.find((c) => c.id === d.compId);
        const name = artist.name;
        if (comp) {
          comp.artists.push({ ...artist, labelId: comp.id, labelName: comp.name, contract: { weeksLeft: 78, salary: artist.salary || 2000, royalty: 0.18, length: 78 } });
        }
        state.roster = state.roster.filter((x) => x.id !== artist.id);
        artist.labelId = null;
        artist.contract = null;
        state.releases.filter((r) => r.artistId === artist.id && r.status === 'scheduled').forEach((r) => { r.status = 'cancelled'; });
        state.demos = state.demos.filter((d2) => d2.artistId !== artist.id);
        addRep(-1.5);
        msg = `${name} left for ${d.compName}.`;
      }
      break;
    }
    case 'publishing': {
      const t = findTrack(d.trackId);
      if (choiceIndex === 0 && t) { earn(d.amount, 'publishing'); t.rightsSold = true; msg = `Publishing rights sold for ${fmtMoney(d.amount)}.`; }
      else msg = 'You kept the publishing rights.';
      break;
    }
    case 'awardShow': {
      if (choiceIndex === 0) {
        if (Math.random() < d.winChance) {
          state.totals.awards++;
          addRep(3.5);
          state.awards.push({ name: d.category, week: state.week, detail: d.trackTitle });
          msg = `You won ${d.category}! The room stood up.`;
          addNews(`${state.label.name} wins ${d.category} for “${d.trackTitle}”.`, 'award');
        } else {
          addRep(0.4);
          msg = `No win this time, but ${state.label.name} was in the room.`;
        }
      } else msg = 'You skipped the ceremony.';
      break;
    }
    case 'trendShift': {
      if (choiceIndex === 0) {
        state.trends[d.genre] = clamp((state.trends[d.genre] || 1) + 0.15, 0.8, 1.6);
        msg = `${d.genreName} is even hotter. Your marketing investment paid off.`;
      } else msg = 'You stayed true to your sound.';
      break;
    }
    case 'expiry': {
      if (choiceIndex === 0 && artist) {
        const accept = clamp((artist.morale + artist.loyalty) / 200 + state.reputation / 300 + 0.12, 0.15, 0.97);
        if (Math.random() < accept) {
          const demand = Math.round((artist.salary || 1500) * (1 + artist.popularity / 220) / 10) * 10;
          artist.contract = { weeksLeft: 78, salary: demand, royalty: Math.min(0.3, artist.royaltyDemand), length: 78 };
          artist.morale = clamp(artist.morale + 8, 0, 100);
          artist.loyalty = clamp(artist.loyalty + 5, 0, 100);
          msg = `${artist.name} re-signs for ${fmtMoney(demand)}/week.`;
        } else {
          const name = artist.name;
          releaseArtistForEvent(artist);
          msg = `${name} rejected the renewal and left the label.`;
        }
      } else if (artist) {
        const name = artist.name;
        releaseArtistForEvent(artist);
        msg = `${name}’s contract expired. They are a free agent.`;
      }
      break;
    }
    case 'tierUp': {
      msg = `Unlocked: ${TIERS[state.tier]?.name}. New opportunities are available.`;
      break;
    }
    case 'empire': {
      msg = 'The empire is yours. Keep building your legacy.';
      break;
    }
    case 'insolvency': {
      if (choiceIndex === 0) {
        const loan = 250000;
        const weeklyRate = 0.1 / 52;
        const payment = loan * (weeklyRate / (1 - Math.pow(1 + weeklyRate, -104)));
        state.loans.push({ id: uid('loan'), principal: loan, remaining: loan, payment: Math.round(payment), weeksLeft: 104, rate: 0.1 });
        state.cash += loan;
        addNews('Emergency financing secured. The label survives — for now.', 'finance');
        msg = 'Emergency loan secured: $250,000.';
      } else {
        state.gameOver = true;
        msg = 'You sold the label. The run is over.';
      }
      break;
    }
    default: msg = 'Event resolved.';
  }
  state.pendingEvents.shift();
  if (msg) addNews(msg, 'event');
  saveGame();
  return { ok: true, message: msg };
}

function releaseArtistForEvent(artist) {
  state.roster = state.roster.filter((x) => x.id !== artist.id);
  artist.labelId = null;
  artist.contract = null;
  artist.status = 'free';
  artist.busyUntil = 0;
  state.releases.filter((r) => r.artistId === artist.id && r.status === 'scheduled').forEach((r) => { r.status = 'cancelled'; });
  state.demos = state.demos.filter((d) => d.artistId !== artist.id);
  if (artist.popularity > 20) {
    const comp = pick(state.competitors);
    if (comp) {
      const clone = { ...artist, labelId: comp.id, labelName: comp.name, status: 'active', contract: { weeksLeft: 78, salary: artist.salary || 2000, royalty: 0.18, length: 78 } };
      comp.artists.push(clone);
    }
  } else {
    state.prospects.push({ ...artist, scouted: true });
  }
}

/* ------------------------------- misc actions ------------------------------ */
export const scoutPrice = () => Math.round(2600 * (state.staff.some((s) => s.role === 'scout') ? 0.6 : 1));
export const auditionPrice = () => Math.round(6000 * (state.staff.some((s) => s.role === 'scout') ? 0.6 : 1));
export function scoutProspects() {
  const cost = auditionPrice();
  if (state.cash < cost) return { error: `Auditions cost ${fmtMoney(cost)}.` };
  spend(cost, 'scouting');
  const unscouted = state.prospects.filter((a) => !a.scouted);
  for (const a of unscouted.slice(0, 4)) a.scouted = true;
  const adds = 2 + (state.staff.some((s) => s.role === 'scout') ? 1 : 0);
  for (let i = 0; i < adds; i++) state.prospects.push(makeProspect(state.tier, state.week));
  addNews(`Open auditions held. ${adds} new artists added to the scouting board.`, 'roster');
  saveGame();
  return { ok: true };
}
export function updateBrand(patch) {
  Object.assign(state.label, patch);
  if (patch.name) state.label.initials = patch.initials || brandInitials(patch.name);
  addNews(`The label unveils a new look.`, 'company');
  saveGame();
  return { ok: true };
}
export function restartWithSave() {
  const brand = { ...state.label };
  createNewGame({ name: brand.name, color: brand.color, logoShape: brand.logoShape, initials: brand.initials, founderGenre: brand.genre });
  return state;
}
export function discardDemo(id) {
  const demo = state.demos.find((d) => d.id === id);
  if (!demo) return { error: 'Song not found.' };
  if (demo.releaseId) return { error: 'This song is attached to a scheduled release.' };
  state.demos = state.demos.filter((d) => d.id !== id);
  addNews(`“${demo.title}” was cut from the vault.`, 'studio');
  saveGame();
  return { ok: true };
}
export function refreshStaffMarket() {
  state.staffMarket = makeStaffMarket(state.tier, 6);
  saveGame();
  return { ok: true };
}
