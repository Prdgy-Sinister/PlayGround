import { DRAGONS, DRAGON_MAP, SKILLS, SKILL_LIST, BUILDINGS, DAILY_POOL, TRACKS, LEAGUES } from './data.js';

const KEY = 'dragon-rush-save-v1';
const today = () => new Date().toISOString().slice(0, 10);

export const dragonXpNeed = (level) => Math.round(120 + level * 55 + level * level * 8);
export const riderXpNeed = (level) => Math.round(450 + level * 260);

export function defaultState() {
  const dragons = {};
  const starter = DRAGON_MAP.emberling;
  dragons.emberling = makeDragonSave(starter, 3);
  const village = {};
  BUILDINGS.forEach(b => { village[b.id] = b.id === 'hall' ? 1 : 0; });
  return {
    version: 3,
    riderName: 'Wren Skyborn',
    level: 1,
    xp: 0,
    coins: 1600,
    gems: 6,
    dragons,
    selected: 'emberling',
    cosmetics: {
      owned: { skin: ['default'], saddle: ['none'], armour: ['none'], wings: ['none'], outfit: ['novice'] },
      equipped: { skin: 'default', saddle: 'none', armour: 'none', wings: 'none', outfit: 'novice' },
    },
    village,
    villageDecor: { trees: [], banners: 0 },
    unlockedTracks: ['hearthfall'],
    leagues: {},
    explore: {},
    bestTimes: {},
    dailies: { date: today(), progress: {}, claimed: [] },
    stats: { races: 0, wins: 0, gates: 0, boostTime: 0, orbs: 0, bonds: 0, upgrades: 0, trials: 0, distance: 0, podiums: 0 },
    season: { xp: 0, tier: 1 },
    eggs: [],
    codex: { discovered: {}, discoveries: [], firstVisit: false },
    dragonIsland: {
      level: 1, xp: 0, unlocked: false,
      habitats: { fire: 0, ice: 0, forest: 0, ocean: 0, storm: 0, earth: 0, venom: 0, ancient: 0, hybrid: 0 },
      buildings: {}, resources: { wood: 0, stone: 0, crystal: 0, fish: 0, ember: 0 },
      decor: [], plots: {}, interactions: { pats: 0, feeds: 0, bonds: 0 },
    },
    combat: {
      unlocked: false, rating: 1000, wins: 0, losses: 0,
      duelCooldown: 0, survivalBest: 0, bossBest: {}, tournamentBest: {}, loadout: [], activeMode: null,
    },
    achievements: { unlocked: [], progress: {} },
    missionProgress: {},
    claimedMissions: [],
    log: [],
    settings: { quality: 'auto', music: true, sfx: true, invertY: false, leftHand: false },
    tutorialDone: false,
  };
}

function stageForLevel(level = 1) {
  if (level < 5) return 'hatchling';
  if (level < 10) return 'juvenile';
  if (level < 20) return 'adolescent';
  return 'adult';
}

function makeDragonSave(def, level = 1) {
  return {
    level, xp: 0, bond: 10, bondLevel: 1,
    upgrades: { speed: 0, accel: 0, stamina: 0, handling: 0 },
    skills: [], lastBond: 0, seen: true,
    cosmetics: { skin: 'default', saddle: 'none', armour: 'none', wings: 'none' },
    name: '',
    stage: stageForLevel(level),
    parents: [],
    genes: null,
    academy: { practice: {}, trained: {}, certificates: [], bonuses: {} },
  };
}

let state = null;

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = mergeDefaults(defaultState(), parsed);
    }
  } catch (err) { console.warn('Save load failed', err); }
  if (!state) state = defaultState();
  rollDailies();
  save(); // Persist schema migrations and any newly introduced defaults.
  return state;
}

function mergeDefaults(def, saved) {
  const out = { ...def, ...saved };
  out.cosmetics = { ...def.cosmetics, ...(saved.cosmetics || {}) };
  out.cosmetics.owned = { ...def.cosmetics.owned, ...(saved.cosmetics?.owned || {}) };
  out.cosmetics.equipped = { ...def.cosmetics.equipped, ...(saved.cosmetics?.equipped || {}) };
  out.stats = { ...def.stats, ...(saved.stats || {}) };
  out.settings = { ...def.settings, ...(saved.settings || {}) };
  out.village = { ...def.village, ...(saved.village || {}) };
  out.dailies = { ...def.dailies, ...(saved.dailies || {}) };
  out.season = { ...def.season, ...(saved.season || {}) };
  out.eggs = Array.isArray(saved.eggs) ? saved.eggs : [];
  out.codex = {
    discovered: { ...def.codex.discovered, ...(saved.codex?.discovered || {}) },
    discoveries: Array.isArray(saved.codex?.discoveries) ? saved.codex.discoveries : [],
    firstVisit: !!saved.codex?.firstVisit,
  };
  out.dragonIsland = {
    ...def.dragonIsland,
    ...(saved.dragonIsland || {}),
    habitats: { ...def.dragonIsland.habitats, ...(saved.dragonIsland?.habitats || {}) },
    buildings: { ...def.dragonIsland.buildings, ...(saved.dragonIsland?.buildings || {}) },
    resources: { ...def.dragonIsland.resources, ...(saved.dragonIsland?.resources || {}) },
    decor: Array.isArray(saved.dragonIsland?.decor) ? saved.dragonIsland.decor : [],
    plots: { ...def.dragonIsland.plots, ...(saved.dragonIsland?.plots || {}) },
    interactions: { ...def.dragonIsland.interactions, ...(saved.dragonIsland?.interactions || {}) },
  };
  out.combat = { ...def.combat, ...(saved.combat || {}), loadout: Array.isArray(saved.combat?.loadout) ? saved.combat.loadout : [] };
  out.achievements = {
    unlocked: Array.isArray(saved.achievements?.unlocked) ? saved.achievements.unlocked : [],
    progress: { ...(saved.achievements?.progress || {}) },
  };
  out.missionProgress = { ...(saved.missionProgress || {}) };
  out.claimedMissions = Array.isArray(saved.claimedMissions) ? saved.claimedMissions : [];
  out.dragons = { ...def.dragons, ...(saved.dragons || {}) };
  for (const id in out.dragons) {
    const d = out.dragons[id];
    d.upgrades = { speed: 0, accel: 0, stamina: 0, handling: 0, ...(d.upgrades || {}) };
    d.cosmetics = { skin: 'default', saddle: 'none', armour: 'none', wings: 'none', ...(d.cosmetics || {}) };
    d.skills = Array.isArray(d.skills) ? d.skills : [];
    d.name = typeof d.name === 'string' ? d.name : '';
    d.stage = d.stage || stageForLevel(d.level || 1);
    d.parents = Array.isArray(d.parents) ? d.parents : [];
    d.genes = d.genes && typeof d.genes === 'object' ? d.genes : null;
    const academy = d.academy || {};
    d.academy = {
      practice: { ...(academy.practice || {}) }, trained: { ...(academy.trained || {}) },
      certificates: Array.isArray(academy.certificates) ? academy.certificates : [],
      bonuses: { ...(academy.bonuses || {}) },
    };
  }
  out.version = 3;
  if (!out.dragons[out.selected]) out.selected = Object.keys(out.dragons)[0] || 'emberling';
  return out;
}

export function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage may be full */ }
}

export function S() { return state; }
export function setState(s) { state = s; }
export function resetSave() { localStorage.removeItem(KEY); state = defaultState(); rollDailies(); save(); return state; }

export function getDragon(id = state.selected) { return state.dragons[id] || null; }
export function isOwned(id) { return !!state.dragons[id]; }

export function addDragon(id, level = 1) {
  if (state.dragons[id]) return false;
  state.dragons[id] = makeDragonSave(DRAGON_MAP[id], level);
  state.log.unshift({ t: Date.now(), text: `New dragon: ${DRAGON_MAP[id].name}`, kind: 'dragon' });
  state.log = state.log.slice(0, 40);
  addRiderXp(120);
  save();
  return true;
}

const BREEDING_MS = 30 * 60 * 1000;
const GENE_STATS = ['speed', 'accel', 'stamina', 'handling'];
const randomItem = list => list[Math.floor(Math.random() * list.length)];

function parentId(parent) { return typeof parent === 'string' ? parent : parent?.id; }
function baseGenes(id) {
  const def = DRAGON_MAP[id];
  const savedGenes = state.dragons[id]?.genes?.stats;
  return Object.fromEntries(GENE_STATS.map(key => [key, Number(savedGenes?.[key] ?? def?.stats?.[key] ?? 5)]));
}
function chooseOffspring(parentIds) {
  const reserved = new Set(state.eggs.map(egg => egg.speciesId));
  const available = DRAGONS.filter(def => !state.dragons[def.id] && !reserved.has(def.id));
  if (!available.length) return null;
  const parents = parentIds.map(id => DRAGON_MAP[id]);
  const families = parents.map(p => p?.family).filter(Boolean);
  const mutation = Math.random() < 0.08;
  const pool = mutation ? available : available.filter(def => families.includes(def.family));
  const choices = pool.length ? pool : available;
  const weighted = choices.flatMap(def => {
    const matching = families.includes(def.family);
    return Array(Math.max(1, matching ? 4 : 1)).fill(def);
  });
  return { def: randomItem(weighted), mutation };
}

/** Start breeding two owned dragons. Species are unique in the current save model. */
export function breedDragons(parentA, parentB) {
  const parentIds = [parentId(parentA), parentId(parentB)];
  if (parentIds.some(id => !id || !state.dragons[id])) return { ok: false, msg: 'Both parents must be dragons you own.' };
  if (parentIds[0] === parentIds[1]) return { ok: false, msg: 'Choose two different parents.' };
  const offspring = chooseOffspring(parentIds);
  if (!offspring) return { ok: false, msg: 'There are no unowned dragon species left to hatch.' };
  const { def, mutation } = offspring;
  const inherited = parentIds.map(baseGenes);
  const genes = { stats: {} };
  for (const key of GENE_STATS) {
    const inheritedValue = (inherited[0][key] + inherited[1][key]) / 2;
    let value = def.stats[key] * 0.65 + inheritedValue * 0.35;
    if (mutation) value += Math.random() < 0.5 ? -1.5 : 1.5;
    genes.stats[key] = Math.round(Math.max(1, Math.min(12, value)) * 10) / 10;
  }
  const createdAt = Date.now();
  const egg = {
    id: `egg-${createdAt.toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    speciesId: def.id, parentIds, genes, mutation, createdAt, hatchAt: createdAt + BREEDING_MS,
  };
  state.eggs.push(egg);
  save();
  return { ok: true, egg };
}

export function incubationRemaining(egg) {
  const target = typeof egg === 'string' ? state.eggs.find(item => item.id === egg) : egg;
  return target ? Math.max(0, Number(target.hatchAt || 0) - Date.now()) : 0;
}

export function claimHatchling(eggId, name = '') {
  const index = state.eggs.findIndex(egg => egg.id === eggId);
  if (index < 0) return { ok: false, msg: 'Egg not found.' };
  const egg = state.eggs[index];
  if (incubationRemaining(egg) > 0) return { ok: false, msg: 'The egg is still incubating.', remaining: incubationRemaining(egg) };
  state.eggs.splice(index, 1);
  if (state.dragons[egg.speciesId]) {
    state.coins += 300;
    save();
    return { ok: true, converted: true, msg: 'Duplicate species converted into 300 coins.' };
  }
  const dragon = makeDragonSave(DRAGON_MAP[egg.speciesId], 1);
  dragon.name = String(name || '').trim().slice(0, 24);
  dragon.parents = [...(egg.parentIds || [])];
  dragon.genes = egg.genes || null;
  state.dragons[egg.speciesId] = dragon;
  state.log.unshift({ t: Date.now(), text: `${dragon.name || DRAGON_MAP[egg.speciesId].name} hatched!`, kind: 'dragon' });
  state.log = state.log.slice(0, 40);
  addRiderXp(120);
  save();
  return { ok: true, id: egg.speciesId, dragon };
}

export function dragonStage(id) {
  const dragon = state.dragons[id];
  if (!dragon) return null;
  dragon.stage = stageForLevel(dragon.level || 1);
  return dragon.stage;
}

export const ACADEMY_DISCIPLINES = ['speed', 'flight', 'endurance', 'agility', 'bond', 'focus'];
export function academyState(id) {
  const dragon = state.dragons[id];
  if (!dragon) return null;
  const academy = dragon.academy || (dragon.academy = { practice: {}, trained: {}, certificates: [], bonuses: {} });
  return {
    ...academy,
    disciplines: ACADEMY_DISCIPLINES.map(discipline => ({
      id: discipline, practice: academy.practice[discipline] || 0,
      trainedToday: academy.trained[discipline] === today(),
      certificate: academy.certificates.includes(discipline),
    })),
  };
}

export function trainDiscipline(dragonId, discipline) {
  const dragon = state.dragons[dragonId];
  if (!dragon) return { ok: false, msg: 'No dragon.' };
  if (!ACADEMY_DISCIPLINES.includes(discipline)) return { ok: false, msg: 'Unknown discipline.' };
  const academy = dragon.academy || (dragon.academy = { practice: {}, trained: {}, certificates: [], bonuses: {} });
  if (academy.trained[discipline] === today()) return { ok: false, msg: 'This discipline is on cooldown until tomorrow.' };
  academy.practice[discipline] = (academy.practice[discipline] || 0) + 1;
  academy.trained[discipline] = today();
  academy.bonuses[discipline] = (academy.bonuses[discipline] || 0) + 1;
  let certificate = false;
  if (academy.practice[discipline] >= 3 && !academy.certificates.includes(discipline)) {
    academy.certificates.push(discipline);
    certificate = true;
  }
  addDragonXp(dragonId, 25);
  save();
  return { ok: true, practice: academy.practice[discipline], certificate, msg: certificate ? `${discipline} certificate earned!` : `${discipline} practice complete.` };
}

export function awardCoins(n) { state.coins = Math.max(0, state.coins + Math.round(n)); save(); }
export function awardGems(n) { state.gems = Math.max(0, state.gems + Math.round(n)); save(); }

export function addRiderXp(n) {
  state.xp += Math.round(n);
  let ups = 0;
  while (state.xp >= riderXpNeed(state.level)) {
    state.xp -= riderXpNeed(state.level);
    state.level++;
    ups++;
  }
  if (ups) {
    state.gems += 2 * ups;
    state.log.unshift({ t: Date.now(), text: `Rider level ${state.level}! +${2 * ups} gems`, kind: 'level' });
  }
  save();
  return ups;
}

export function addDragonXp(id, n) {
  const d = state.dragons[id];
  if (!d) return 0;
  const hallBonus = 1 + BUILDINGS.find(b => b.id === 'hall').bonus[state.village.hall || 0];
  d.xp += Math.round(n * hallBonus);
  let ups = 0;
  while (d.xp >= dragonXpNeed(d.level) && d.level < 30) {
    d.xp -= dragonXpNeed(d.level);
    d.level++;
    ups++;
  }
  d.stage = stageForLevel(d.level);
  if (ups) {
    const hall = BUILDINGS.find(b => b.id === 'hall');
    state.log.unshift({ t: Date.now(), text: `${DRAGON_MAP[id].name} reached level ${d.level}! ${hall ? '' : ''}`, kind: 'level' });
  }
  save();
  return ups;
}

export function addBond(id, amount) {
  const d = state.dragons[id];
  if (!d) return;
  const feed = BUILDINGS.find(b => b.id === 'feeding');
  const mult = 1 + (feed.bonus[state.village.feeding || 0] || 0);
  d.bond = Math.min(100, d.bond + amount * mult);
  const newLevel = 1 + Math.floor(d.bond / 20);
  if (newLevel > d.bondLevel) {
    d.bondLevel = newLevel;
    addRiderXp(25);
  }
  state.stats.bonds++;
  progressDaily('bonds', 1);
  save();
}

export function bondLevelName(n) {
  return ['Newly Met', 'Curious', 'Trusting', 'Bonded', 'Devoted', 'Soulbound'][Math.min(5, Math.max(0, n - 1))];
}

export function upgradeCost(stat, current) {
  return Math.round(260 + current * 380 + current * current * 90);
}

export function upgradeDragonStat(id, stat) {
  const d = state.dragons[id];
  if (!d) return { ok: false, msg: 'No dragon.' };
  if (d.upgrades[stat] >= 6) return { ok: false, msg: 'That trait is fully trained.' };
  if (d.level < 2 + d.upgrades[stat] * 1) return { ok: false, msg: 'Level up your dragon first.' };
  const cost = upgradeCost(stat, d.upgrades[stat]);
  if (state.coins < cost) return { ok: false, msg: 'Not enough coins.' };
  state.coins -= cost;
  d.upgrades[stat]++;
  state.stats.upgrades++;
  progressDaily('upgrades', 1);
  addDragonXp(id, 40);
  save();
  return { ok: true, msg: `${stat} upgraded!` };
}

// Skill points: 1 per two levels beyond first, spent = skills.length
export function skillPoints(id) {
  const d = state.dragons[id]; if (!d) return 0;
  return Math.max(0, Math.floor((d.level - 2) / 2) + 1 - d.skills.length);
}

export function canUnlockSkill(id, skill) {
  const d = state.dragons[id];
  if (!d) return { ok: false, reason: 'No dragon.' };
  if (d.skills.includes(skill.id)) return { ok: false, reason: 'Already learned.' };
  if (skillPoints(id) < skill.cost) return { ok: false, reason: 'No skill points.' };
  if (d.level < skill.req) return { ok: false, reason: `Requires level ${skill.req}.` };
  const group = Object.values(SKILLS).find(g => g.some(s => s.id === skill.id));
  const prev = group[group.indexOf(skill) - 1];
  if (prev && !d.skills.includes(prev.id)) return { ok: false, reason: `Learn ${prev.name} first.` };
  return { ok: true };
}

export function unlockSkill(id, skill) {
  const check = canUnlockSkill(id, skill);
  if (!check.ok) return check;
  state.dragons[id].skills.push(skill.id);
  addDragonXp(id, 50);
  save();
  return { ok: true, msg: `${skill.name} learned!` };
}

// Effective stats combining base, level, upgrades, bond and skills
export function statsOf(id) {
  const def = DRAGON_MAP[id];
  const d = state.dragons[id];
  if (!def) return { topSpeed: 80, accel: 20, turn: 1.5, staminaMax: 100 };
  if (!d) {
    const b = def.stats;
    return {
      topSpeed: 46 + b.speed * 3.4, accel: 10 + b.accel * 1.6, turn: 0.9 + b.handling * 0.085,
      staminaMax: 60 + b.stamina * 5, agil: b.handling, atk: b.speed,
    };
  }
  const arena = BUILDINGS.find(b => b.id === 'arena');
  const arenaMult = 1 + (arena.bonus[state.village.arena || 0] || 0);
  const skillBoost = {
    speed: d.skills.some(s => s === 'sp1') ? 0.06 : 0,
    speed2: d.skills.some(s => s === 'sp3') ? 0.12 : 0,
    boost: d.skills.some(s => s === 'sp2') ? 0.1 : 0,
    turn: d.skills.some(s => s === 'ac1') ? 0.10 : 0,
    turn2: d.skills.some(s => s === 'ac3') ? 0.15 : 0,
    stamina: d.skills.some(s => s === 'en1') ? 0.15 : 0,
    regen: d.skills.some(s => s === 'en2') ? 0.35 : 0,
    boostCost: d.skills.some(s => s === 'en3') ? 0.25 : 0,
  };
  const lvl = 1 + (d.level - 1) * 0.035;
  const training = d.academy?.bonuses || {};
  const bond = 1 + (d.bondLevel - 1) * 0.02 + (training.bond || 0) * 0.005;
  const ups = d.upgrades;
  const b = { ...def.stats, ...(d.genes?.stats || {}) };
  b.speed += (training.speed || 0) * 0.35 + (training.focus || 0) * 0.1;
  b.accel += (training.flight || 0) * 0.35 + (training.focus || 0) * 0.1;
  b.stamina += (training.endurance || 0) * 0.35;
  b.handling += (training.agility || 0) * 0.35;
  const speed = 46 + b.speed * 3.4 + ups.speed * (2.1 * arenaMult);
  const topSpeed = speed * (1 + skillBoost.speed + skillBoost.speed2) * lvl * bond;
  const accel = (10 + b.accel * 1.6 + ups.accel * (1.7 * arenaMult)) * lvl;
  const turn = (0.9 + b.handling * 0.085 + ups.handling * (0.035 * arenaMult)) * (1 + skillBoost.turn + skillBoost.turn2);
  const staminaMax = (60 + b.stamina * 5 + ups.stamina * (9 * arenaMult)) * (1 + skillBoost.stamina);
  return {
    topSpeed, accel, turn, staminaMax,
    boostMult: 1.34 + skillBoost.boost, boostCost: 18 * (1 - skillBoost.boostCost),
    regen: 7 * (1 + skillBoost.regen),
    agil: Math.round((b.handling + ups.handling * 0.8 + d.bondLevel * 0.25) * 10) / 10,
    atk: Math.round((b.speed + ups.speed * 0.8) * 10) / 10,
    stamina: Math.round((b.stamina + ups.stamina * 0.8) * 10) / 10,
    accelStat: Math.round((b.accel + ups.accel * 0.8) * 10) / 10,
  };
}

// ── DAILIES ─────────────────────────────────────────────────────────────────
function hashDate(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h);
}
export function activeDailies() {
  const seed = hashDate(today() + '-skyfire');
  const pool = [...DAILY_POOL];
  const picked = [];
  for (let i = 0; i < 3 && pool.length; i++) {
    const idx = (seed >> (i * 5)) % pool.length;
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked;
}
export function rollDailies() {
  if (state.dailies.date !== today()) {
    state.dailies = { date: today(), progress: {}, claimed: [] };
    save();
  }
}
export function progressDaily(stat, n) {
  rollDailies();
  state.dailies.progress[stat] = (state.dailies.progress[stat] || 0) + n;
  save();
}
export function dailyDone(ch) {
  return (state.dailies.progress[ch.stat] || 0) >= ch.goal;
}
export function claimDaily(ch) {
  if (!dailyDone(ch) || state.dailies.claimed.includes(ch.id)) return false;
  state.dailies.claimed.push(ch.id);
  state.coins += ch.coins;
  addDragonXp(state.selected, ch.xp);
  addRiderXp(Math.round(ch.xp * 0.5));
  save();
  return true;
}

export const MISSION_LIST = [
  { id: 'first-flight', name: 'First Flight', description: 'Complete a race.', stat: 'races', goal: 1, reward: { coins: 250, xp: 60 } },
  { id: 'victory-lap', name: 'Victory Lap', description: 'Win three races.', stat: 'wins', goal: 3, reward: { coins: 500, gems: 1, xp: 120 } },
  { id: 'gatekeeper', name: 'Gatekeeper', description: 'Pass through ten race gates.', stat: 'gates', goal: 10, reward: { coins: 350, xp: 90 } },
  { id: 'bonded', name: 'Kindred Spirits', description: 'Build five bonds.', stat: 'bonds', goal: 5, reward: { coins: 300, xp: 100 } },
  { id: 'trailblazer', name: 'Trailblazer', description: 'Visit five exploration zones.', source: 'explore', goal: 5, reward: { coins: 400, gems: 1, xp: 100 } },
  { id: 'orb-seeker', name: 'Orb Seeker', description: 'Collect twenty exploration orbs.', stat: 'orbs', goal: 20, reward: { coins: 450, xp: 120 } },
  { id: 'academy-scholar', name: 'Academy Scholar', description: 'Earn three academy certificates.', source: 'certificates', goal: 3, reward: { coins: 600, gems: 2, xp: 180 } },
];

function observedMissionProgress(mission) {
  if (mission.stat) return Number(state.stats[mission.stat] || 0);
  if (mission.source === 'explore') return Object.values(state.explore || {}).reduce((sum, zone) => sum + Number(zone.visited || 0), 0);
  if (mission.source === 'certificates') return Object.values(state.dragons || {}).reduce((sum, dragon) => sum + (dragon.academy?.certificates?.length || 0), 0);
  return 0;
}
export function missionState(id) {
  const mission = MISSION_LIST.find(item => item.id === id);
  if (!mission) return null;
  const progress = Math.max(Number(state.missionProgress[id] || 0), observedMissionProgress(mission));
  return { ...mission, progress: Math.min(mission.goal, progress), complete: progress >= mission.goal, claimed: state.claimedMissions.includes(id) };
}
export function missions() { return MISSION_LIST.map(mission => missionState(mission.id)); }
export const listMissions = missions;
export const getMissionState = missionState;
export function missionProgress(id) { return missionState(id)?.progress || 0; }
export function progressMission(id, amount = 1) {
  if (!MISSION_LIST.some(mission => mission.id === id)) return false;
  state.missionProgress[id] = Math.max(0, Number(state.missionProgress[id] || 0) + Number(amount || 0));
  save();
  return missionState(id);
}
export function claimMission(id) {
  const mission = missionState(id);
  if (!mission || !mission.complete || mission.claimed) return { ok: false, msg: 'Mission is not ready to claim.' };
  state.claimedMissions.push(id);
  state.coins += mission.reward.coins || 0;
  state.gems += mission.reward.gems || 0;
  addRiderXp(mission.reward.xp || 0);
  save();
  return { ok: true, reward: mission.reward };
}

// ── TRACK UNLOCKS ───────────────────────────────────────────────────────────
export function unlockTrack(id) {
  if (!state.unlockedTracks.includes(id)) {
    state.unlockedTracks.push(id);
    state.log.unshift({ t: Date.now(), text: `New track unlocked: ${TRACKS.find(t => t.id === id)?.name}`, kind: 'track' });
    save();
    return true;
  }
  return false;
}
export function leagueUnlocked(league) {
  if (league.tier === 1) return true;
  const prev = LEAGUES[league.tier - 2];
  return !!(state.leagues[prev.id]?.completed) && state.level >= 0;
}
export function leagueProgress(id) {
  return state.leagues[id] || { points: 0, raceIndex: 0, completed: false, bestPos: 9, wins: 0 };
}
export function saveLeague(id, data) { state.leagues[id] = { ...leagueProgress(id), ...data }; save(); }

export function formatCoins(n) {
  n = Math.round(n);
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 10000) return (n / 1000).toFixed(1) + 'k';
  return n.toLocaleString('en-US');
}
export function formatTime(sec) {
  if (sec == null || !isFinite(sec)) return '—';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  const ms = Math.floor((sec % 1) * 100);
  return `${m}:${String(s).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
}
export function xpPercent(id) {
  const d = state.dragons[id]; if (!d) return 0;
  return Math.min(100, (d.xp / dragonXpNeed(d.level)) * 100);
}
export function riderXpPercent() { return Math.min(100, (state.xp / riderXpNeed(state.level)) * 100); }

export function exploreState(zoneId) {
  if (!state.explore[zoneId]) state.explore[zoneId] = { orbs: [], hidden: false, visited: 0 };
  return state.explore[zoneId];
}

export function recordStat(key, n = 1) {
  state.stats[key] = (state.stats[key] || 0) + n;
  progressDaily(key, n);
  save();
}

export { KEY };
