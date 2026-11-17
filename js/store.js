/* ============================================================
   APEX RUSH — game state, economy, packs, market, trading
   ============================================================ */
import { CARDS, CARD_MAP, ALBUMS, ALBUM_MAP, RARITY } from './data/index.js';
import { PACKS, PACK_MAP, getPackOfTheDay, finishWeights, packAvailability } from './data/packs.js';
import {
  marketValue, itemMarketValue, rollGrade, gradingFromScore,
  GRADING_SERVICES, gradeService, gradeMultiplier,
} from './pricing.js';
import {
  DAILY_REWARDS, DAILY_CHALLENGE_POOL, ACHIEVEMENTS, levelNeeded,
  localDateKey, challengeForToday,
} from './data/progress.js';
import { sfx } from './audio.js';

const KEY = 'apexrush.save.v3';
const todayKey = () => localDateKey(new Date());
const yesterdayKey = () => localDateKey(new Date(Date.now() - 86400000));
const RANK = {common:0, rare:1, epic:2, legendary:3, iconic:4};
const FINISH_ORDER = ['base','holo','gold','championship','anniversary','shadow','signature','numbered'];
const STARTER_CARDS = ['leclerc-rookie','tsunoda','oliveira','nakagami','piastri-hungary-2024','sauber-team','tsunoda','sauber-team'];
const TRADERS = [
  {alias:'ApexCollector', tag:'F1 specialist', avatar:'A'},
  {alias:'GridKing_88', tag:'Album hunter', avatar:'G'},
  {alias:'Vale46Fan', tag:'MotoGP die-hard', avatar:'V'},
  {alias:'SennaVault', tag:'Iconic chaser', avatar:'S'},
  {alias:'DesmoDani', tag:'Ducati collector', avatar:'D'},
  {alias:'PolePosition', tag:'Set builder', avatar:'P'},
  {alias:'TifosiTom', tag:'Ferrari devotee', avatar:'T'},
  {alias:'BrakeLate', tag:'Card flipper', avatar:'B'},
];

let state;
const listeners = new Set();
const uid = () => 'i' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

function freshState() {
  const now = todayKey();
  return {
    version: 3,
    createdAt: Date.now(),
    coins: 3500,
    gems: 150,
    xp: 0,
    level: 1,
    items: [],
    tokens: ['f1-standard'],
    favorite: null,
    stats: {
      packsOpened: 0, cardsPulled: 0, cardsSold: 0, cardsBought: 0, trades: 0,
      epicPulls: 0, legendaryPulls: 0, iconicPulls: 0, goldPacks: 0, dailyPacks: 0,
      coinsSpent: 0, coinsEarned: 0, maxUnique: 0, albumsCompleted: 0, bestStreak: 0,
      marketRefresh: 0, xpEarned: 0, eventPacks: 0, offerPacks: 0, graded: 0, gradingSpend: 0,
    },
    daily: {
      date: now, packsOpened: 0, newCards: 0, epicPulls: 0, legendaryPulls: 0,
      cardsSold: 0, trades: 0, dailyPacks: 0, goldPacks: 0, coinsSpent: 0,
      streak: 0, lastClaim: '', claimedIds: [],
    },
    dailyClaims: {},
    dailyPackDate: '',
    potd: {date: now, purchases: 0},
    tokensUsed: 0,
    claimedAchievements: [],
    claimedAlbums: [],
    recentPulls: [],
    market: {seed: 0, bought: [], date: now},
    tradeSeed: 1,
    settings: {muted: false},
    starter: true,
  };
}

function hydrate(raw) {
  const base = freshState();
  if (!raw || typeof raw !== 'object') return seedStarter(base);
  const s = {...base, ...raw};
  s.stats = {...base.stats, ...(raw.stats || {})};
  s.daily = {...base.daily, ...(raw.daily || {})};
  s.settings = {...base.settings, ...(raw.settings || {})};
  s.potd = {...base.potd, ...(raw.potd || {})};
  s.market = {...base.market, ...(raw.market || {})};
  s.items = Array.isArray(raw.items) ? raw.items.filter(it => it && CARD_MAP[it.cardId]) : [];
  s.tokens = Array.isArray(raw.tokens) ? raw.tokens.filter(t => PACK_MAP[t]) : [];
  s.claimedAchievements = Array.isArray(raw.claimedAchievements) ? raw.claimedAchievements : [];
  s.claimedAlbums = Array.isArray(raw.claimedAlbums) ? raw.claimedAlbums : [];
  s.dailyClaims = raw.dailyClaims && typeof raw.dailyClaims === 'object' ? raw.dailyClaims : {};
  s.recentPulls = Array.isArray(raw.recentPulls) ? raw.recentPulls.filter(p => CARD_MAP[p.cardId]).slice(0, 24) : [];
  s.coins = Math.max(0, Number(raw.coins) || 0);
  s.gems = Math.max(0, Number(raw.gems) || 0);
  s.level = Math.max(1, Number(raw.level) || 1);
  s.xp = Math.max(0, Number(raw.xp) || 0);
  if (!raw.starter) return seedStarter(s);
  ensureToday(s);
  return s;
}

function seedStarter(s) {
  for (const id of STARTER_CARDS) {
    const card = CARD_MAP[id];
    if (card) s.items.push({uid: uid(), cardId: id, finish: 'base', serial: null, at: Date.now(), source:'starter'});
  }
  s.starter = true;
  s.stats.maxUnique = new Set(s.items.map(i => i.cardId)).size;
  return s;
}

function ensureToday(s = state) {
  const today = todayKey();
  if (!s.daily || s.daily.date !== today) {
    s.daily = {
      date: today, packsOpened: 0, newCards: 0, epicPulls: 0, legendaryPulls: 0,
      cardsSold: 0, trades: 0, dailyPacks: 0, goldPacks: 0, coinsSpent: 0,
      streak: s.daily?.streak || 0, lastClaim: s.daily?.lastClaim || '', claimedIds: [],
    };
    s.dailyClaims = {};
    s.market.bought = [];
    s.market.date = today;
    s.potd = {date: today, purchases: 0};
  }
  if (s.potd.date !== today) s.potd = {date: today, purchases: 0};
  return s;
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    state = raw ? hydrate(JSON.parse(raw)) : seedStarter(freshState());
  } catch {
    state = seedStarter(freshState());
  }
  ensureToday();
  if (state.settings.muted) document.body.classList.add('muted');
  save();
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}
function emit() { for (const fn of listeners) { try { fn(state); } catch (e) { console.error(e); } } }
export function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }
export function getState() { ensureToday(); return state; }
export function saveNow() { save(); }

/* ---------------- economy ---------------- */
export function addCurrency(coins = 0, gems = 0) {
  if (coins) { state.coins += Math.round(coins); state.stats.coinsEarned += Math.round(coins); }
  if (gems) state.gems += Math.round(gems);
}
function spendCurrency(currency, amount) {
  if (currency === 'coins') {
    if (state.coins < amount) throw gameError('NOT_ENOUGH_COINS', 'Not enough coins');
    state.coins -= amount;
    state.stats.coinsSpent += amount;
    state.daily.coinsSpent += amount;
  } else {
    if (state.gems < amount) throw gameError('NOT_ENOUGH_GEMS', 'Not enough gems');
    state.gems -= amount;
  }
}
function gameError(code, message, extra = {}) { return Object.assign(new Error(message), {code, ...extra}); }

export function xpProgress(s = state) {
  const need = levelNeeded(s.level);
  return {current: s.xp, need, pct: Math.min(100, Math.round(s.xp / need * 100))};
}
export function addXp(amount) {
  state.xp += Math.max(0, Math.round(amount));
  state.stats.xpEarned += Math.max(0, Math.round(amount));
  const levels = [];
  while (state.xp >= levelNeeded(state.level)) {
    state.xp -= levelNeeded(state.level);
    state.level++;
    const coins = 200 + state.level * 120;
    const gems = 10 + Math.floor(state.level / 2) * 5;
    state.coins += coins;
    state.gems += gems;
    state.stats.coinsEarned += coins;
    levels.push({level: state.level, coins, gems});
    window.dispatchEvent(new CustomEvent('apex:levelup', {detail:{level: state.level, coins, gems}}));
  }
  return levels;
}

/* ---------------- inventory ---------------- */
export function addItem(cardId, finish = 'base', opts = {}) {
  const card = CARD_MAP[cardId];
  if (!card) throw gameError('NO_CARD', 'Unknown card');
  const serial = finish === 'numbered' ? (opts.serial ?? Math.floor(Math.random() * (card.rarity === 'iconic' ? 25 : card.rarity === 'legendary' ? 50 : 99)) + 1) : null;
  const item = {uid: uid(), cardId, finish, serial, at: Date.now(), source: opts.source || 'pull', grading: opts.grading || null};
  state.items.push(item);
  const uniq = uniqueCount();
  if (uniq > state.stats.maxUnique) state.stats.maxUnique = uniq;
  return item;
}
export function uniqueCount() { return new Set(state.items.map(i => i.cardId)).size; }
export function cardCount(cardId) { return state.items.filter(i => i.cardId === cardId).length; }
export function ownsCard(cardId) { return state.items.some(i => i.cardId === cardId); }
export function itemsOfCard(cardId) { return state.items.filter(i => i.cardId === cardId); }
export function collectionValue(now = Date.now()) { return state.items.reduce((sum, i) => sum + itemMarketValue(i, now), 0); }
export function groupedCollection() {
  const map = new Map();
  for (const item of state.items) {
    if (!map.has(item.cardId)) {
      map.set(item.cardId, {card: CARD_MAP[item.cardId], items: [], count: 0, best: item.finish});
    }
    const g = map.get(item.cardId);
    g.items.push(item);
    g.count++;
    if (FINISH_ORDER.indexOf(item.finish) > FINISH_ORDER.indexOf(g.best)) g.best = item.finish;
  }
  return [...map.values()];
}
export function duplicateGroups() {
  return groupedCollection().filter(g => g.count > 1).map(g => ({
    ...g,
    spare: g.count - 1,
    value: Math.min(...g.items.map(i => itemMarketValue(i))),
  }));
}
export function sellItem(itemUid) {
  const idx = state.items.findIndex(i => i.uid === itemUid);
  if (idx < 0) throw gameError('NO_ITEM', 'Card not found');
  const item = state.items[idx];
  const card = CARD_MAP[item.cardId];
  const value = itemMarketValue(item);
  state.items.splice(idx, 1);
  state.coins += value;
  state.stats.cardsSold++;
  state.stats.coinsEarned += value;
  state.daily.cardsSold++;
  addXp(4);
  save(); emit();
  return {value, card, finish: item.finish};
}
export function sellAllDuplicates(filterFn = null) {
  const groups = groupedCollection();
  let total = 0, count = 0;
  const remove = [];
  for (const g of groups) {
    if (filterFn && !filterFn(g.card)) continue;
    if (g.items.length <= 1) continue;
    // keep the most valuable copy, sell the rest
    const sorted = [...g.items].sort((a,b) => itemMarketValue(b) - itemMarketValue(a));
    for (const item of sorted.slice(1)) {
      total += itemMarketValue(item);
      count++;
      remove.push(item.uid);
    }
  }
  if (!count) return {count:0, total:0};
  state.items = state.items.filter(i => !remove.includes(i.uid));
  state.coins += total;
  state.stats.cardsSold += count;
  state.stats.coinsEarned += total;
  state.daily.cardsSold += count;
  addXp(count * 3);
  save(); emit();
  return {count, total};
}
export function sellAllCommons() {
  const groups = groupedCollection();
  let total = 0, count = 0;
  const remove = [];
  for (const g of groups) {
    if (g.card.rarity !== 'common') continue;
    if (g.items.length <= 1) continue;
    const sorted = [...g.items].sort((a,b) => itemMarketValue(b) - itemMarketValue(a));
    for (const item of sorted.slice(1)) {
      total += itemMarketValue(item); count++; remove.push(item.uid);
    }
  }
  if (!count) return {count:0, total:0};
  state.items = state.items.filter(i => !remove.includes(i.uid));
  state.coins += total;
  state.stats.cardsSold += count;
  state.stats.coinsEarned += total;
  state.daily.cardsSold += count;
  addXp(count * 2);
  save(); emit();
  return {count, total};
}

/* ---------------- packs ---------------- */
function rngFrom(seed) {
  let a = seed >>> 0;
  return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
function weighted(entries, rnd = Math.random) {
  const total = entries.reduce((s,e) => s + e[1], 0);
  if (total <= 0) return entries[0]?.[0];
  let r = rnd() * total;
  for (const [key, w] of entries) { r -= w; if (r <= 0) return key; }
  return entries[entries.length-1][0];
}
function packPool(pack) {
  let pool = CARDS;
  if (pack.scope === 'f1') pool = pool.filter(c => c.sport === 'f1');
  else if (pack.scope === 'motogp') pool = pool.filter(c => c.sport === 'motogp');
  else if (pack.scope === 'crossover') pool = pool;
  else pool = pool.filter(c => c.sport !== 'crossover');
  const f = pack.pool || {};
  if (f.sport) pool = pool.filter(c => c.sport === f.sport);
  if (f.types) pool = pool.filter(c => f.types.includes(c.type));
  if (f.eras) pool = pool.filter(c => f.eras.includes(c.era));
  if (f.countries) pool = pool.filter(c => f.countries.includes(c.country));
  if (f.teams) pool = pool.filter(c => f.teams.includes(c.team));
  if (f.ids) { const set = new Set(f.ids); pool = pool.filter(c => set.has(c.id)); }
  if (f.signatures) pool = pool.filter(c => !!c.signature);
  if (f.query) pool = pool.filter(c => c.searchable.includes(f.query));
  return pool.length ? pool : CARDS;
}
function rollRarity(pack, rnd) {
  const base = {...pack.odds};
  // Reworked odds: top tiers are significantly harder to hit. Removed
  // weight is pushed into the lowest available tier so pack totals stay 100.
  const cuts = {epic: .78, legendary: .42, iconic: .3};
  let removed = 0;
  for (const k of ['epic','legendary','iconic']) {
    const before = base[k] || 0;
    base[k] = before * cuts[k];
    removed += before - base[k];
  }
  const sink = base.common > 0 ? 'common' : (base.rare > 0 ? 'rare' : (base.epic > 0 ? 'epic' : 'legendary'));
  base[sink] = (base[sink] || 0) + removed;
  return weighted(Object.entries(base).map(([k,v]) => [k, v]), rnd);
}
function cardOfRarity(pool, rarity, exclude, unownedOnly, owned, rnd) {
  let candidates = pool.filter(c => c.rarity === rarity && !exclude.has(c.id) && (!unownedOnly || !owned.has(c.id)));
  if (!candidates.length) {
    const order = ['common','rare','epic','legendary','iconic'];
    const start = order.indexOf(rarity);
    for (let d = 1; d < order.length && !candidates.length; d++) {
      for (const idx of [start-d, start+d]) {
        if (idx < 0 || idx >= order.length) continue;
        candidates = pool.filter(c => c.rarity === order[idx] && !exclude.has(c.id) && (!unownedOnly || !owned.has(c.id)));
        if (candidates.length) break;
      }
    }
  }
  if (!candidates.length) return null;
  return candidates[Math.floor(rnd() * candidates.length)];
}
function rollFinish(pack, card, rnd) {
  const weights = finishWeights(pack, card);
  const entries = Object.entries(weights).filter(([k,w]) => w > 0 && (k !== 'signature' || !!card.signature));
  return weighted(entries, rnd);
}
function serialFor(card) {
  const max = card.rarity === 'iconic' ? 25 : card.rarity === 'legendary' ? 50 : 99;
  return Math.floor(Math.random() * max) + 1;
}

function generatePull(pack, forcedFinish = null) {
  const pool = packPool(pack);
  const rnd = Math.random;
  const owned = new Set(state.items.map(i => i.cardId));
  const picks = [];
  const used = new Set();
  const floors = pack.guarantees || {};
  const cardCount = pack.cards;
  const protectedNew = Math.max(pack.guaranteeNew || 0, pack.protectDupes || 0);
  const allFloor = Object.entries(floors).reduce((best, [rar, n]) => (n >= cardCount && RANK[rar] > RANK[best] ? rar : best), 'common');

  for (let slot = 0; slot < cardCount; slot++) {
    let rarity;
    if (slot < protectedNew && owned.size < 420) {
      rarity = rollRarity(pack, rnd);
      let card = cardOfRarity(pool, rarity, used, true, owned, rnd);
      if (!card) card = cardOfRarity(pool, rarity, used, false, owned, rnd);
      if (card) {
        picks.push({card, new: !owned.has(card.id)});
        used.add(card.id);
        continue;
      }
    }
    rarity = rollRarity(pack, rnd);
    if (RANK[rarity] < RANK[allFloor]) rarity = allFloor;
    let card = cardOfRarity(pool, rarity, used, false, owned, rnd);
    if (!card) card = cardOfRarity(pool, rarity, used, false, owned, rnd);
    if (!card) card = pool.find(c => !used.has(c.id)) || pool[0];
    picks.push({card, new: !owned.has(card.id)});
    used.add(card.id);
  }

  // rarity floor guarantees
  for (const [rar, need] of Object.entries(floors)) {
    let have = picks.filter(p => RANK[p.card.rarity] >= RANK[rar]).length;
    while (have < need) {
      const target = picks.reduce((low, p, idx) => (RANK[p.card.rarity] < RANK[picks[low].card.rarity] ? idx : low), 0);
      const exclude = new Set(picks.filter((_,i)=>i!==target).map(p => p.card.id));
      let card = cardOfRarity(pool, rar, exclude, true, owned, rnd);
      if (!card) {
        // find any card at or above rarity
        const order = ['common','rare','epic','legendary','iconic'];
        for (let r = RANK[rar]; r <= 4 && !card; r++) card = cardOfRarity(pool, order[r], exclude, false, owned, rnd);
      }
      if (!card) break;
      picks[target] = {card, new: !owned.has(card.id)};
      have = picks.filter(p => RANK[p.card.rarity] >= RANK[rar]).length;
    }
  }

  // guarantee new cards / duplicate protection remaining
  let newCount = picks.filter(p => p.new).length;
  for (let i = 0; i < picks.length && newCount < protectedNew; i++) {
    if (picks[i].new) continue;
    const exclude = new Set(picks.map(p => p.card.id));
    let card = cardOfRarity(pool, picks[i].card.rarity, exclude, true, owned, rnd);
    if (!card && RANK[allFloor] > 0) card = cardOfRarity(pool, allFloor, exclude, true, owned, rnd);
    if (card) { picks[i] = {card, new: true}; newCount++; }
  }

  // crossover guarantee
  if (pack.scope === 'crossover') {
    const hasX = picks.some(p => p.card.sport === 'crossover');
    if (!hasX) {
      const xPool = CARDS.filter(c => c.sport === 'crossover');
      const xCard = xPool[Math.floor(rnd() * xPool.length)];
      const idx = picks.reduce((low, p, i) => RANK[p.card.rarity] < RANK[picks[low].card.rarity] ? i : low, 0);
      picks[idx] = {card: xCard, new: !owned.has(xCard.id)};
    }
  }

  let result = picks.map(p => {
    let finish = rollFinish(pack, p.card, rnd);
    if (finish === 'base' && forcedFinish) finish = forcedFinish;
    return {card: p.card, finish, isNew: p.new, serial: null};
  });
  if (pack.guaranteedFinish) {
    // The advertised finish is guaranteed on the best card in the pack only.
    const idx = result.reduce((best, r, i) => RANK[r.card.rarity] > RANK[result[best].card.rarity] ? i : best, 0);
    result[idx].finish = pack.guaranteedFinish;
  }
  for (const r of result) {
    if (r.finish === 'numbered') r.serial = serialFor(r.card);
  }
  return result;
}

export function openPack(packId, opts = {}) {
  ensureToday();
  const today = todayKey();
  let pack;
  if (packId === 'potd') {
    pack = getPackOfTheDay(new Date());
    if (state.potd.purchases >= 3) throw gameError('POTD_LIMIT', 'Daily limit reached for Pack of the Day');
  } else {
    pack = PACK_MAP[packId];
  }
  if (!pack) throw gameError('NO_PACK', 'Unknown pack');

  let deal = null;
  if (opts.deal && opts.deal.baseId === (pack.baseId || pack.id) && opts.deal.endsAt > Date.now()) {
    deal = opts.deal;
    pack = {
      ...pack,
      name: deal.name || pack.name,
      cost: deal.cost,
      baseCost: deal.baseCost,
      discount: deal.discount,
      deal: true,
      extra: deal.extra,
      bonusCards: deal.bonusCards || 0,
      endsAt: deal.endsAt,
    };
  }

  const availability = packAvailability(pack);
  if (!availability.available) throw gameError('PACK_LOCKED', `${pack.name} is not live right now`);
  if (pack.oncePerDay && state.dailyPackDate === today) throw gameError('DAILY_USED', 'Daily Pack already claimed today');
  if (packId === 'potd' && state.coins < pack.cost && !state.tokens.includes('potd')) {
    throw gameError('NOT_ENOUGH_COINS', 'Not enough coins');
  }

  let usedToken = false;
  const tokenIdx = state.tokens.indexOf(packId);
  if (tokenIdx >= 0 && packId !== 'potd' && !deal) {
    state.tokens.splice(tokenIdx, 1);
    usedToken = true;
    state.tokensUsed++;
  } else {
    spendCurrency(pack.currency, pack.cost);
  }

  const pullPack = pack.bonusCards ? {...pack, cards: pack.cards + pack.bonusCards} : pack;
  const pulls = generatePull(pullPack);
  const results = [];
  for (const p of pulls) {
    const item = addItem(p.card.id, p.finish, {serial: p.serial, source: packId});
    const value = marketValue(p.card, p.finish);
    results.push({...p, item, value});
    state.stats.cardsPulled++;
    if (p.isNew) { state.daily.newCards++; }
    if (RANK[p.card.rarity] >= 2) state.stats.epicPulls++;
    if (RANK[p.card.rarity] >= 2) state.daily.epicPulls++;
    if (RANK[p.card.rarity] >= 3) { state.stats.legendaryPulls++; state.daily.legendaryPulls++; }
    if (RANK[p.card.rarity] >= 4) state.stats.iconicPulls++;
    state.recentPulls.unshift({cardId: p.card.id, finish: p.finish, serial: p.serial, isNew: p.isNew, at: Date.now(), uid: item.uid});
  }
  state.recentPulls = state.recentPulls.slice(0, 24);
  state.stats.packsOpened++;
  state.daily.packsOpened++;
  if (pack.oncePerDay) state.dailyPackDate = today;
  if (packId === 'daily') { state.stats.dailyPacks++; state.daily.dailyPacks++; }
  if (packId === 'gold' || packId === 'f1-gold' || packId === 'motogp-gold') { state.stats.goldPacks++; state.daily.goldPacks++; }
  if (pack.category === 'event') state.stats.eventPacks = (state.stats.eventPacks || 0) + 1;
  if (deal) state.stats.offerPacks = (state.stats.offerPacks || 0) + 1;
  if (packId === 'potd') state.potd.purchases++;

  /* Choice packs: build the option table after the normal pulls land. */
  let choice = null;
  if (pack.choice) {
    const cfg = pack.choice;
    const pool = packPool(pack);
    const ownedNow = new Set(state.items.map(i => i.cardId));
    const used = new Set(results.map(r => r.card.id));
    const options = [];
    for (let i = 0; i < (cfg.count || 3); i++) {
      const rarity = cfg.rarity || 'legendary';
      let card = cardOfRarity(pool, rarity, used, true, ownedNow, Math.random)
        || cardOfRarity(pool, rarity, used, false, ownedNow, Math.random);
      if (!card) card = pool.find(c => !used.has(c.id)) || pool[i % pool.length];
      let finish = rollFinish(pack, card, Math.random);
      if (finish === 'base' && cfg.finish) finish = cfg.finish;
      options.push({card, finish, serial: null, isNew: !ownedNow.has(card.id)});
      used.add(card.id);
    }
    for (const o of options) if (o.finish === 'numbered') o.serial = serialFor(o.card);
    choice = {options, picks: cfg.picks || 1, chosenCount: 0, chosen: null};
  }

  const xpGain = 30 + results.reduce((s, r) => s + (r.isNew ? 12 : 2) + ({common:0,rare:2,epic:8,legendary:18,iconic:45}[r.card.rarity] || 0), 0);
  const levelUps = addXp(xpGain);
  if (state.stats.maxUnique < uniqueCount()) state.stats.maxUnique = uniqueCount();
  save(); emit();
  return {pack, results, choice, usedToken, currency: pack.currency, amount: pack.cost, levelUps, xpGain, deal};
}

export function choosePackCard(result, cardId) {
  const choice = result?.choice;
  if (!choice) throw gameError('NO_CHOICE', 'This pack has no choice to make');
  if (choice.chosenCount >= choice.picks) throw gameError('CHOICE_DONE', 'You have already made your pick');
  const option = choice.options.find(o => o.card.id === cardId && !o.taken);
  if (!option) throw gameError('NO_OPTION', 'That card is not one of the choices');
  const item = addItem(option.card.id, option.finish, {serial: option.serial, source:'choice'});
  const value = marketValue(option.card, option.finish);
  option.taken = true;
  option.item = item;
  option.value = value;
  choice.chosenCount++;
  if (choice.chosenCount >= choice.picks) choice.chosen = option;

  state.stats.cardsPulled++;
  state.daily.newCards += option.isNew ? 1 : 0;
  if (RANK[option.card.rarity] >= 2) { state.stats.epicPulls++; state.daily.epicPulls++; }
  if (RANK[option.card.rarity] >= 3) { state.stats.legendaryPulls++; state.daily.legendaryPulls++; }
  if (RANK[option.card.rarity] >= 4) state.stats.iconicPulls++;
  state.recentPulls.unshift({cardId: option.card.id, finish: option.finish, serial: option.serial, isNew: option.isNew, at: Date.now(), uid: item.uid});
  state.recentPulls = state.recentPulls.slice(0, 24);
  addXp(18);
  if (state.stats.maxUnique < uniqueCount()) state.stats.maxUnique = uniqueCount();
  save(); emit();
  return {option, item, value};
}

/* ---------------- albums ---------------- */
export function albumProgress(album, s = state) {
  const owned = new Set(s.items.map(i => i.cardId));
  const have = album.cardIds.filter(id => owned.has(id)).length;
  return {have, total: album.count, pct: album.count ? Math.round(have / album.count * 100) : 0, complete: have >= album.count, claimed: s.claimedAlbums.includes(album.id)};
}
export function claimAlbum(albumId) {
  const album = ALBUM_MAP[albumId];
  if (!album) throw gameError('NO_ALBUM', 'Unknown album');
  const prog = albumProgress(album);
  if (!prog.complete) throw gameError('ALBUM_INCOMPLETE', 'Album not complete');
  if (prog.claimed) throw gameError('ALREADY_CLAIMED', 'Reward already claimed');
  state.claimedAlbums.push(albumId);
  state.coins += album.reward.coins;
  state.gems += album.reward.gems;
  state.stats.coinsEarned += album.reward.coins;
  state.stats.albumsCompleted++;
  const levelUps = addXp(120);
  save(); emit();
  return {album, reward: album.reward, levelUps};
}

/* ---------------- daily ---------------- */
export function dailyStatus() {
  ensureToday();
  const today = todayKey();
  const claimedToday = state.daily.lastClaim === today;
  const streakAlive = claimedToday || state.daily.lastClaim === yesterdayKey();
  const streak = streakAlive ? Math.max(0, Number(state.daily.streak) || 0) : 0;
  const nextStreak = claimedToday ? Math.max(1, streak) : Math.max(1, streak + 1);
  const cycleDay = ((nextStreak - 1) % 7) + 1;
  const canClaim = !claimedToday;
  return {
    canClaim,
    streak,
    cycleDay,
    claimedToday,
    nextDay: cycleDay,
    rewards: DAILY_REWARDS,
    claimedCount: canClaim ? (cycleDay - 1) : cycleDay,
    packAvailable: state.dailyPackDate !== today,
  };
}
export function claimDaily() {
  ensureToday();
  const today = todayKey();
  if (state.daily.lastClaim === today) throw gameError('ALREADY_CLAIMED', 'Daily reward already claimed');
  state.daily.streak = state.daily.lastClaim === yesterdayKey() ? state.daily.streak + 1 : 1;
  state.daily.lastClaim = today;
  if (state.daily.streak > state.stats.bestStreak) state.stats.bestStreak = state.daily.streak;
  const day = ((state.daily.streak - 1) % 7) + 1;
  const reward = DAILY_REWARDS[day - 1];
  state.coins += reward.coins || 0;
  state.gems += reward.gems || 0;
  state.stats.coinsEarned += reward.coins || 0;
  if (reward.pack) state.tokens.push(reward.pack);
  const levelUps = addXp(50);
  save(); emit();
  return {reward, day, streak: state.daily.streak, levelUps};
}

/* ---------------- challenges ---------------- */
export function statValue(stat, s = state) {
  if (stat.startsWith('daily.')) return s.daily[stat.slice(6)] || 0;
  return s.stats[stat] || 0;
}
export function dailyChallenges() {
  ensureToday();
  const today = todayKey();
  const claimed = new Set(state.dailyClaims[today] || []);
  return challengeForToday(new Date()).map(def => {
    const progress = Math.min(def.goal, statValue(def.stat));
    return {...def, progress, completed: progress >= def.goal, claimed: claimed.has(def.id), kind:'daily'};
  });
}
export function achievements() {
  const claimed = new Set(state.claimedAchievements);
  return ACHIEVEMENTS.map(def => {
    const progress = Math.min(def.goal, statValue(def.stat));
    return {...def, progress, completed: progress >= def.goal, claimed: claimed.has(def.id), kind:'career'};
  });
}
export function claimChallenge(id, kind = 'daily') {
  ensureToday();
  const today = todayKey();
  if (kind === 'daily') {
    const def = dailyChallenges().find(c => c.id === id);
    if (!def) throw gameError('NO_CHALLENGE', 'Challenge not found');
    if (!def.completed) throw gameError('INCOMPLETE', 'Challenge not complete');
    if (def.claimed) throw gameError('ALREADY_CLAIMED', 'Already claimed');
    state.dailyClaims[today] = [...(state.dailyClaims[today] || []), id];
    state.coins += def.reward.coins || 0;
    state.gems += def.reward.gems || 0;
    state.stats.coinsEarned += def.reward.coins || 0;
    if (def.reward.pack) state.tokens.push(def.reward.pack);
    const levelUps = addXp(40);
    save(); emit();
    return {def, levelUps};
  }
  const def = achievements().find(c => c.id === id);
  if (!def) throw gameError('NO_ACHIEVEMENT', 'Achievement not found');
  if (!def.completed) throw gameError('INCOMPLETE', 'Achievement not complete');
  if (def.claimed) throw gameError('ALREADY_CLAIMED', 'Already claimed');
  state.claimedAchievements.push(id);
  state.coins += def.reward.coins || 0;
  state.gems += def.reward.gems || 0;
  state.stats.coinsEarned += def.reward.coins || 0;
  if (def.reward.pack) state.tokens.push(def.reward.pack);
  const levelUps = addXp(60);
  save(); emit();
  return {def, levelUps};
}
export function claimAllAvailable() {
  const list = [
    ...dailyChallenges().filter(c => c.completed && !c.claimed).map(c => ({id:c.id, kind:'daily'})),
    ...achievements().filter(c => c.completed && !c.claimed && c.kind !== 'none').map(c => ({id:c.id, kind:'career'})),
  ];
  let coins = 0, gems = 0, count = 0, packs = 0;
  const allLevels = [];
  for (const entry of list) {
    try {
      const res = claimChallenge(entry.id, entry.kind);
      coins += res.def.reward.coins || 0;
      gems += res.def.reward.gems || 0;
      if (res.def.reward.pack) packs++;
      count++;
      allLevels.push(...res.levelUps);
    } catch {}
  }
  return {coins, gems, count, packs, levelUps: allLevels};
}

/* ---------------- market ---------------- */
export function marketListings() {
  ensureToday();
  const dateSeed = parseInt(String(state.market.date || '').replace(/-/g, ''), 10) || 0;
  const seed = 1103 + state.market.seed * 7919 + (dateSeed % 9973);
  const rnd = rngFrom(seed);
  const listings = [];
  const pool = [...CARDS];
  const used = new Set();
  for (let i = 0; i < 8; i++) {
    let card;
    for (let tries = 0; tries < 30; tries++) {
      const idx = Math.floor(rnd() * pool.length);
      const cand = pool[idx];
      if (!used.has(cand.id) && RANK[cand.rarity] >= 1) { card = cand; break; }
    }
    if (!card) card = pool[Math.floor(rnd() * pool.length)];
    used.add(card.id);
    const finishRoll = rnd();
    const finish = finishRoll > .93 ? 'gold' : finishRoll > .8 ? 'holo' : 'base';
    const spread = 1.08 + rnd() * .5;
    let grading = null;
    if (RANK[card.rarity] >= 2 && rnd() > .68) {
      const score = 8 + Math.floor(rnd() * 3) - (rnd() > .82 ? 1 : 0);
      grading = gradingFromScore(card, score, 'market', state.market.seed * 31 + i);
    }
    const price = Math.max(20, Math.round(marketValue(card, finish) * spread * gradeMultiplier(grading?.score || 0) / 10) * 10);
    listings.push({
      id: `m${state.market.seed}_${i}`,
      card, finish,
      grading,
      spread,
      price,
      rawPrice: marketValue(card, finish),
      bought: state.market.bought.includes(`m${state.market.seed}_${i}`),
      seller: ['ApexCollector','GridKing_88','Vale46Fan','SennaVault','TifosiTom','DesmoDani'][Math.floor(rnd()*6)],
    });
  }
  return listings;
}
export function buyListing(listingId) {
  ensureToday();
  const listing = marketListings().find(l => l.id === listingId);
  if (!listing) throw gameError('NO_LISTING', 'Listing not found');
  if (listing.bought) throw gameError('SOLD', 'Listing already sold');
  if (state.coins < listing.price) throw gameError('NOT_ENOUGH_COINS', 'Not enough coins');
  state.coins -= listing.price;
  state.stats.coinsSpent += listing.price;
  state.daily.coinsSpent += listing.price;
  state.stats.cardsBought++;
  state.market.bought.push(listingId);
  const item = addItem(listing.card.id, listing.finish, {source:'market', grading: listing.grading});
  addXp(8);
  save(); emit();
  return {listing, item};
}
export function refreshMarket() {
  ensureToday();
  if (state.coins < 250) throw gameError('NOT_ENOUGH_COINS', 'Not enough coins to refresh');
  state.coins -= 250;
  state.stats.coinsSpent += 250;
  state.daily.coinsSpent += 250;
  state.stats.marketRefresh++;
  state.market.seed++;
  state.market.bought = [];
  save(); emit();
}

/* ---------------- grading ---------------- */
export function gradeItem(itemUid, serviceId = 'standard') {
  ensureToday();
  const item = state.items.find(i => i.uid === itemUid);
  if (!item) throw gameError('NO_ITEM', 'Card not found');
  if (item.grading) throw gameError('ALREADY_GRADED', 'This card is already sealed in a slab');
  const card = CARD_MAP[item.cardId];
  if (!card) throw gameError('NO_CARD', 'Unknown card');
  const svc = gradeService(serviceId);
  if (!svc || !GRADING_SERVICES.some(s => s.id === svc.id)) throw gameError('NO_SERVICE', 'Unknown grading service');
  spendCurrency(svc.currency, svc.cost);
  item.grading = rollGrade(card, svc.id);
  state.stats.graded = (state.stats.graded || 0) + 1;
  state.stats.gradingSpend = (state.stats.gradingSpend || 0) + svc.cost;
  addXp(18);
  save(); emit();
  return {item, card, grading: item.grading, service: svc};
}
export function ungradedItems(minValue = 0) {
  return state.items
    .filter(i => !i.grading)
    .map(i => ({item: i, card: CARD_MAP[i.cardId], value: itemMarketValue(i)}))
    .filter(r => r.card && r.value >= minValue)
    .sort((a, b) => b.value - a.value);
}
export function gradedCount() { return state.items.filter(i => i.grading).length; }


/* ---------------- trading ---------------- */
export function tradeOffers() {
  const rnd = rngFrom(9001 + state.tradeSeed * 3517);
  const groups = groupedCollection().filter(g => g.count > 1);
  const offers = [];
  if (!groups.length) return offers;
  const dupes = [];
  for (const g of groups) {
    // Offer the lowest-value spare copy in a trade.
    const copies = [...g.items].sort((a,b) => itemMarketValue(b) - itemMarketValue(a));
    const spare = copies[copies.length - 1];
    dupes.push({group: g, item: spare, value: itemMarketValue(spare)});
  }
  const owned = new Set(state.items.map(i => i.cardId));
  const offeredIds = new Set();
  const usedDupes = new Set();
  for (let i = 0; i < 4 && dupes.length; i++) {
    const d = dupes[Math.floor(rnd() * dupes.length)];
    if (!d || usedDupes.has(d.item.uid)) continue;
    usedDupes.add(d.item.uid);
    const wantRank = RANK[d.group.card.rarity];
    const bump = rnd() > .8 ? 1 : 0;
    const targetRank = Math.min(4, wantRank + bump);
    const rarities = ['common','rare','epic','legendary','iconic'];
    let candidates = CARDS.filter(c => !owned.has(c.id) && !offeredIds.has(c.id) && RANK[c.rarity] === targetRank);
    if (!candidates.length) candidates = CARDS.filter(c => !owned.has(c.id) && !offeredIds.has(c.id) && Math.abs(RANK[c.rarity] - wantRank) <= 1);
    if (!candidates.length) candidates = CARDS.filter(c => !owned.has(c.id) && !offeredIds.has(c.id));
    if (!candidates.length) break;
    const offerCard = candidates[Math.floor(rnd() * candidates.length)];
    offeredIds.add(offerCard.id);
    const offerValue = marketValue(offerCard, 'base');
    const ratio = offerValue / Math.max(1, d.value);
    offers.push({
      id: `t${state.tradeSeed}_${i}`,
      trader: TRADERS[(state.tradeSeed + i) % TRADERS.length],
      want: d.group.card,
      wantItem: d.item,
      wantFinish: d.item.finish,
      wantValue: d.value,
      give: offerCard,
      giveValue: offerValue,
      ratio,
      verdict: ratio >= 1.15 ? 'good' : ratio >= .82 ? 'fair' : 'bad',
    });
  }
  return offers;
}
export function acceptTrade(offerId) {
  const offer = tradeOffers().find(o => o.id === offerId);
  if (!offer) throw gameError('NO_OFFER', 'Trade no longer available');
  const idx = state.items.findIndex(i => i.uid === offer.wantItem.uid);
  if (idx < 0) throw gameError('NO_ITEM', 'Card no longer in your vault');
  state.items.splice(idx, 1);
  const item = addItem(offer.give.id, 'base', {source:'trade'});
  state.stats.trades++;
  state.daily.trades++;
  addXp(25);
  state.tradeSeed++;
  save(); emit();
  return {offer, item};
}
export function refreshTrades() {
  state.tradeSeed++;
  save(); emit();
}

/* ---------------- misc ---------------- */
export function setFavorite(cardId) {
  state.favorite = state.favorite === cardId ? null : cardId;
  save(); emit();
}
export function toggleMuted() {
  state.settings.muted = !state.settings.muted;
  document.body.classList.toggle('muted', state.settings.muted);
  sfx.unlock();
  save(); emit();
  return state.settings.muted;
}
export function resetSave() {
  state = seedStarter(freshState());
  save(); emit();
}
export function exportSave() {
  return btoa(unescape(encodeURIComponent(JSON.stringify(state))));
}
export function importSave(raw) {
  try {
    const parsed = JSON.parse(decodeURIComponent(escape(atob(raw.trim()))));
    state = hydrate(parsed);
    save(); emit();
    return true;
  } catch { return false; }
}
export function getPackById(id) {
  if (id === 'potd') return getPackOfTheDay(new Date());
  return PACK_MAP[id];
}
export function packTokenCount(packId) { return state.tokens.filter(t => t === packId).length; }
export function potdPurchasesLeft() { ensureToday(); return Math.max(0, 3 - state.potd.purchases); }
export function collectionMilestones() {
  return achievements().filter(a => a.kind === 'unique');
}
export function nextMilestone() {
  return achievements().find(a => a.kind === 'unique' && !a.claimed) || null;
}

load();
export { CARDS, CARD_MAP, ALBUMS, ALBUM_MAP, RARITY, PACKS, RANK, FINISH_ORDER };
