import { ACHIEVEMENTS, BROOMS, CAREER_CHAPTERS, NATIONS, SKILLS } from './data.js';

export const SAVE_KEY = 'wizarding-sports-save-v1';
export const SAVE_VERSION = 1;

export function createState() {
  return {
    version: SAVE_VERSION,
    created: false,
    profile: {
      name: 'Aria Blackwood',
      house: 'gryffindor',
      robe: '#8f1d2c',
      skin: '#d9a97f',
      hair: '#3a251a',
      level: 1,
      xp: 0,
      galleons: 750,
      skillPoints: 1,
      ranking: 1180,
      nation: 'england',
    },
    brooms: {
      owned: ['cleansweep'],
      selected: 'cleansweep',
      upgrades: {},
      livery: 'gold',
    },
    skills: { speed: 0, handling: 0, boost: 0, power: 0, reflex: 0 },
    stats: {
      races: 0, wins: 0, podiums: 0, boostTime: 0,
      trackResults: {}, bestMatchGoals: 0,
    },
    quidditch: {
      wins: 0, losses: 0, matches: 0, goals: 0, saves: 0, bludgers: 0,
      snitch: 0, tournament: null,
    },
    career: { chapter: 0, claimed: [], championships: 0, cups: 0 },
    history: [],
    achievements: {},
    settings: { sound: true, music: true, voice: false, quality: 'high', haptics: true },
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return createState();
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== SAVE_VERSION) return createState();
    return mergeState(createState(), parsed);
  } catch {
    return createState();
  }
}

function mergeState(base, saved) {
  const out = { ...base, ...saved };
  out.profile = { ...base.profile, ...(saved.profile || {}) };
  out.brooms = { ...base.brooms, ...(saved.brooms || {}) };
  out.skills = { ...base.skills, ...(saved.skills || {}) };
  out.stats = { ...base.stats, ...(saved.stats || {}) };
  out.stats.trackResults = { ...(saved.stats?.trackResults || {}) };
  out.quidditch = { ...base.quidditch, ...(saved.quidditch || {}) };
  out.career = { ...base.career, ...(saved.career || {}) };
  out.settings = { ...base.settings, ...(saved.settings || {}) };
  out.history = Array.isArray(saved.history) ? saved.history.slice(0, 30) : [];
  out.achievements = { ...(saved.achievements || {}) };
  return out;
}

export function saveState(state) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch { /* storage may be unavailable */ }
}

export function xpForNext(level) {
  return 190 + level * 110;
}

export function addXP(state, amount) {
  const out = { levels: 0, points: 0 };
  state.profile.xp += Math.max(0, Math.round(amount));
  while (state.profile.xp >= xpForNext(state.profile.level)) {
    state.profile.xp -= xpForNext(state.profile.level);
    state.profile.level += 1;
    state.profile.skillPoints += 1;
    state.profile.galleons += 100;
    out.levels += 1;
    out.points += 1;
  }
  return out;
}

export function rankName(ranking) {
  if (ranking >= 2100) return 'World Legend';
  if (ranking >= 1850) return 'Elite Champion';
  if (ranking >= 1600) return 'International';
  if (ranking >= 1380) return 'Contender';
  if (ranking >= 1250) return 'Rising Star';
  return 'Academy Flyer';
}

export function getBroom(id) {
  return BROOMS.find(b => b.id === id) || BROOMS[0];
}

export function broomTier(level, upgradeLevel = 0) {
  return Math.min(100, level + upgradeLevel * 2.5);
}

export function getBroomStats(state, id) {
  const base = getBroom(id).stats;
  const up = state.brooms.upgrades?.[id] || {};
  const sk = state.skills;
  return {
    speed: Math.min(100, base.speed + (up.speed || 0) * 2.6 + sk.speed * 2.1),
    accel: Math.min(100, base.accel + (up.accel || 0) * 2.6 + sk.handling * 1.4),
    handling: Math.min(100, base.handling + (up.handling || 0) * 2.6 + sk.handling * 2.1),
    boost: Math.min(100, base.boost + (up.boost || 0) * 2.6 + sk.boost * 2.1),
  };
}

export function upgradeCost(stat, level) {
  const base = { speed: 190, accel: 150, handling: 165, boost: 180 }[stat] || 170;
  return Math.round((base + level * 135) / 10) * 10;
}

export function buyBroom(state, id) {
  const broom = getBroom(id);
  if (state.brooms.owned.includes(id)) return { ok: true, owned: true };
  if (state.profile.galleons < broom.price) return { ok: false, reason: 'Not enough Galleons.' };
  if (state.profile.level < broom.level) return { ok: false, reason: `Reach level ${broom.level} to unlock.` };
  state.profile.galleons -= broom.price;
  state.brooms.owned.push(id);
  state.brooms.selected = id;
  return { ok: true };
}

export function upgradeBroom(state, id, stat) {
  if (!state.brooms.owned.includes(id)) return { ok: false, reason: 'Broom not owned.' };
  const up = state.brooms.upgrades[id] || (state.brooms.upgrades[id] = {});
  const level = up[stat] || 0;
  if (level >= 5) return { ok: false, reason: 'Fully upgraded.' };
  const cost = upgradeCost(stat, level);
  if (state.profile.galleons < cost) return { ok: false, reason: 'Not enough Galleons.' };
  state.profile.galleons -= cost;
  up[stat] = level + 1;
  return { ok: true, cost };
}

export function spendSkill(state, id) {
  if (!SKILLS.some(s => s.id === id)) return false;
  if (state.profile.skillPoints <= 0) return false;
  if (state.skills[id] >= 10) return false;
  state.skills[id] += 1;
  state.profile.skillPoints -= 1;
  return true;
}

export function playerName(state) {
  return state.profile.name?.trim() || 'Aria Blackwood';
}

export function award(state, { xp = 0, galleons = 0, ranking = 0 }) {
  const lvl = addXP(state, xp);
  state.profile.galleons += Math.round(galleons);
  state.profile.ranking = Math.max(0, state.profile.ranking + Math.round(ranking));
  return lvl;
}

export function recordRace(state, result) {
  const stats = state.stats;
  stats.races += 1;
  if (result.pos === 1) stats.wins += 1;
  if (result.pos <= 3) stats.podiums += 1;
  stats.boostTime = (stats.boostTime || 0) + (result.boostTime || 0);
  const tr = stats.trackResults[result.trackId] || (stats.trackResults[result.trackId] = { races: 0, bestPos: 99, bestLap: null });
  tr.races += 1;
  tr.bestPos = Math.min(tr.bestPos, result.pos);
  if (result.bestLap && (!tr.bestLap || result.bestLap < tr.bestLap)) tr.bestLap = result.bestLap;
  state.history.unshift({
    type: 'race', id: result.trackId, name: result.trackName, pos: result.pos,
    time: result.time, mode: result.mode, at: Date.now(),
  });
  state.history = state.history.slice(0, 30);
  return stats;
}

export function recordQuidditch(state, result) {
  const q = state.quidditch;
  q.matches += 1;
  if (result.won) q.wins += 1; else q.losses += 1;
  q.goals += result.goals || 0;
  q.saves += result.saves || 0;
  q.bludgers += result.bludgers || 0;
  if (result.snitch) q.snitch += 1;
  state.stats.bestMatchGoals = Math.max(state.stats.bestMatchGoals || 0, result.goals || 0);
  state.history.unshift({
    type: 'quidditch', id: result.opponentId, name: `${result.nationName} vs ${result.opponentName}`,
    round: result.roundName, won: result.won, score: `${result.scoreFor}–${result.scoreAgainst}`,
    snitch: result.snitch, at: Date.now(),
  });
  state.history = state.history.slice(0, 30);
}

export function checkAchievements(state) {
  const newly = [];
  for (const a of ACHIEVEMENTS) {
    if (state.achievements[a.id]) continue;
    const value = Number(a.goal(state) || 0);
    if (value >= a.count) {
      state.achievements[a.id] = Date.now();
      state.profile.galleons += a.reward;
      newly.push(a);
    }
  }
  return newly;
}

export function chapterProgress(state, chapter) {
  if (!chapter) return 0;
  const value = Number(chapter.goal(state) || 0);
  return Math.min(1, value / chapter.count);
}

export function canClaimChapter(state, chapter) {
  return chapterProgress(state, chapter) >= 1 && !state.career.claimed.includes(chapter.id);
}

export function claimChapter(state, chapter) {
  if (!canClaimChapter(state, chapter)) return false;
  state.career.claimed.push(chapter.id);
  state.profile.galleons += chapter.reward.galleons;
  addXP(state, chapter.reward.xp);
  const idx = CAREER_CHAPTERS.findIndex(c => c.id === chapter.id);
  if (idx >= 0) state.career.chapter = Math.max(state.career.chapter, idx + 1);
  return true;
}

export function formatTime(ms) {
  if (!ms && ms !== 0) return '—';
  const total = Math.max(0, Math.round(ms));
  const m = Math.floor(total / 60000);
  const s = Math.floor((total % 60000) / 1000);
  const t = Math.floor((total % 1000) / 10);
  return `${m}:${String(s).padStart(2, '0')}.${String(t).padStart(2, '0')}`;
}

export function formatClock(seconds) {
  const s = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/* ------------------------------------------------------------------ */
/* Quidditch tournament                                               */
/* ------------------------------------------------------------------ */

const ROUND_NAMES = ['Quarter-final', 'Semi-final', 'Final'];

function simulateScore() {
  const quaffle = 40 + Math.floor(Math.random() * 90);
  const snitch = Math.random() < 0.5 ? 150 : 0;
  return quaffle + snitch;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function startTournament(state, nationId, difficulty) {
  const nation = NATIONS.find(n => n.id === nationId) || NATIONS[0];
  const others = shuffle(NATIONS.filter(n => n.id !== nation.id));
  const pairings = [
    { a: nation.id, b: others[0].id, player: true, played: false },
    { a: others[1].id, b: others[2].id, played: false },
    { a: others[3].id, b: others[4].id, played: false },
    { a: others[5].id, b: others[6].id, played: false },
  ];
  for (const m of pairings) {
    if (!m.player) {
      m.sa = simulateScore();
      m.sb = simulateScore();
      m.winner = m.sa >= m.sb ? m.a : m.b;
      m.played = true;
    }
  }
  state.quidditch.tournament = {
    nation: nation.id,
    difficulty,
    round: 0,
    rounds: [{ name: ROUND_NAMES[0], matches: pairings }],
    champion: false,
    eliminated: false,
  };
  return state.quidditch.tournament;
}

export function currentFixture(state) {
  const t = state.quidditch.tournament;
  if (!t || t.eliminated || t.champion) return null;
  const round = t.rounds[t.round];
  if (!round) return null;
  const match = round.matches.find(m => m.a === t.nation || m.b === t.nation);
  if (!match) return null;
  const opponentId = match.a === t.nation ? match.b : match.a;
  return { match, opponentId, round: t.round, roundName: round.name };
}

export function completeTournamentMatch(state, playerScore, opponentScore) {
  const t = state.quidditch.tournament;
  const fixture = currentFixture(state);
  if (!t || !fixture) return { done: true, champion: !!t?.champion, eliminated: !!t?.eliminated };
  const m = fixture.match;
  m.sa = m.a === t.nation ? playerScore : opponentScore;
  m.sb = m.a === t.nation ? opponentScore : playerScore;
  m.winner = playerScore >= opponentScore ? t.nation : fixture.opponentId;
  m.played = true;
  const won = m.winner === t.nation;

  if (!won) {
    t.eliminated = true;
    return { done: true, won, champion: false, eliminated: true, roundName: fixture.roundName };
  }
  if (t.round >= 2) {
    t.champion = true;
    state.career.cups += 1;
    return { done: true, won, champion: true, eliminated: false, roundName: fixture.roundName };
  }

  // Build the next round from this round's winners.
  const winners = t.rounds[t.round].matches.map(x => x.winner);
  const nextName = ROUND_NAMES[t.round + 1];
  let matches;
  if (t.round === 0) {
    matches = [
      { a: winners[0], b: winners[1], player: winners[0] === t.nation || winners[1] === t.nation, played: false },
      { a: winners[2], b: winners[3], player: winners[2] === t.nation || winners[3] === t.nation, played: false },
    ];
  } else {
    matches = [{ a: winners[0], b: winners[1], player: true, played: false }];
  }
  for (const nm of matches) {
    if (!nm.player) {
      nm.sa = simulateScore();
      nm.sb = simulateScore();
      nm.winner = nm.sa >= nm.sb ? nm.a : nm.b;
      nm.played = true;
    }
  }
  t.round += 1;
  t.rounds.push({ name: nextName, matches });
  return { done: false, won, champion: false, eliminated: false, roundName: fixture.roundName };
}

export function tournamentMatchRewards(round, won) {
  const table = [
    { win: { galleons: 400, xp: 180, ranking: 40 }, loss: { galleons: 120, xp: 70, ranking: 8 } },
    { win: { galleons: 700, xp: 280, ranking: 75 }, loss: { galleons: 200, xp: 100, ranking: 12 } },
    { win: { galleons: 1200, xp: 500, ranking: 120 }, loss: { galleons: 300, xp: 150, ranking: 20 } },
  ];
  return (table[round] || table[0])[won ? 'win' : 'loss'];
}

export function resetTournament(state) {
  state.quidditch.tournament = null;
}
