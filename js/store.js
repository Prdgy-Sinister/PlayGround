/* ============================================================
   APEX RUSH — game state, economy, packs, market, trading
   ============================================================ */
import {
  CARDS, CARD_MAP, ALBUMS, ALBUM_MAP, RARITY,
  EXCLUSIVE_MAP, AUTOGRAPH_MAP, EXCLUSIVE_CARDS, AUTOGRAPH_CARDS,
} from './data/index.js';
import { EXCLUSIVE_SPECS, AUTOGRAPH_SPECS, exclusiveIdsForPack } from './data/exclusives.js';
import { NUMBERED_CAPS, AUTOGRAPH_EDITIONS } from './data/core.js';
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
import {
  RELICS, RELIC_MAP, MEMORABILIA, MERCHANDISE, RELIC_RARITY,
  RELIC_ALBUMS, RELIC_ALBUM_MAP, relicsForAlbum, relicValue,
  MEMORABILIA_PACKS, MEMORABILIA_PACK_MAP,
} from './data/relics.js';
import { ROOMS, ROOM_MAP, DISPLAYS, DISPLAY_MAP, THEMES, THEME_MAP, PRESTIGE, RIVAL_COLLECTORS } from './data/showroom.js';

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
    collectorTokens: 20,
    xp: 0,
    level: 1,
    items: [],
    relics: [],
    issuedRelics: {},
    relicClaims: [],
    relicPackOpened: 0,
    relicMarket: {seed: 0, date: now, bought: [], history: []},
    auctions: {seed: 0, date: now, bids: {}, history: []},
    showroom: {
      rooms: ['main'],
      displays: [],
      items: [],
      custom: {
        theme: 'carbon', floor: 'polished', lighting: 'spotlight',
        banners: 'none', furniture: 'basic', layout: 'classic',
        teamColor: '#ff2d2d', decorations: [],
      },
      liked: [], visited: [], visits: 0,
    },
    tokens: ['f1-standard'],
    favorite: null,
    stats: {
      packsOpened: 0, cardsPulled: 0, cardsSold: 0, cardsBought: 0, trades: 0,
      epicPulls: 0, legendaryPulls: 0, iconicPulls: 0, goldPacks: 0, dailyPacks: 0,
      coinsSpent: 0, coinsEarned: 0, maxUnique: 0, albumsCompleted: 0, bestStreak: 0,
      marketRefresh: 0, xpEarned: 0, eventPacks: 0, offerPacks: 0, graded: 0, gradingSpend: 0,
      exclusivesPulled: 0, autographsPulled: 0, tokensEarned: 0, vaultRedeems: 0,
      relicsCollected: 0, relicPacksOpened: 0, relicsSold: 0, relicsBought: 0,
      auctionsWon: 0, roomsUnlocked: 0, showroomItems: 0,
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
    issued: {},
    market: {seed: 0, bought: [], date: now, history: []},
    tradeSeed: 1,
    tradeHistory: [],
    vault: {redeemed: [], opened: 0},
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
  s.market.history = Array.isArray(s.market.history) ? s.market.history : [];
  s.collectorTokens = Math.max(0, Number(raw.collectorTokens) || 0);
  s.items = Array.isArray(raw.items) ? raw.items.filter(it => it && CARD_MAP[it.cardId]) : [];
  s.relics = Array.isArray(raw.relics) ? raw.relics.filter(it => it && RELIC_MAP[it.relicId]) : [];
  s.issuedRelics = raw.issuedRelics && typeof raw.issuedRelics === 'object' && !Array.isArray(raw.issuedRelics) ? {...raw.issuedRelics} : {};
  for (const item of s.relics) {
    if (item.serial == null) continue;
    if (!Array.isArray(s.issuedRelics[item.relicId])) s.issuedRelics[item.relicId] = [];
    if (!s.issuedRelics[item.relicId].includes(item.serial)) s.issuedRelics[item.relicId].push(item.serial);
  }
  s.issued = raw.issued && typeof raw.issued === 'object' && !Array.isArray(raw.issued) ? {...raw.issued} : {};
  // Older saves never had a supply ledger — reconstruct one from existing
  // serialised copies so no cap can be exceeded after an import.
  for (const item of s.items) {
    if (item.serial == null) continue;
    const key = `${item.cardId}|${item.finish || 'base'}`;
    if (!Array.isArray(s.issued[key])) s.issued[key] = [];
    if (!s.issued[key].includes(item.serial)) s.issued[key].push(item.serial);
  }
  s.tradeHistory = Array.isArray(raw.tradeHistory) ? raw.tradeHistory : [];
  s.vault = {...base.vault, ...(raw.vault || {})};
  s.vault.redeemed = Array.isArray(s.vault.redeemed) ? s.vault.redeemed : [];
  s.relicClaims = Array.isArray(raw.relicClaims) ? raw.relicClaims : [];
  s.relicMarket = {...base.relicMarket, ...(raw.relicMarket || {})};
  s.relicMarket.history = Array.isArray(s.relicMarket.history) ? s.relicMarket.history : [];
  s.relicMarket.bought = Array.isArray(s.relicMarket.bought) ? s.relicMarket.bought : [];
  s.auctions = {...base.auctions, ...(raw.auctions || {})};
  s.auctions.bids = raw.auctions?.bids && typeof raw.auctions.bids === 'object' ? {...raw.auctions.bids} : {};
  s.auctions.history = Array.isArray(s.auctions?.history) ? s.auctions.history : [];
  s.showroom = {...base.showroom, ...(raw.showroom || {})};
  s.showroom.rooms = Array.isArray(s.showroom.rooms) ? s.showroom.rooms.filter(id => ROOM_MAP[id]) : ['main'];
  if (!s.showroom.rooms.includes('main')) s.showroom.rooms.unshift('main');
  s.showroom.displays = Array.isArray(s.showroom.displays) ? s.showroom.displays.filter(d => d && ROOM_MAP[d.room] && DISPLAY_MAP[d.type]) : [];
  s.showroom.items = Array.isArray(s.showroom.items) ? s.showroom.items.filter(d => d && ROOM_MAP[d.room]) : [];
  s.showroom.custom = {...base.showroom.custom, ...(raw.showroom?.custom || {})};
  s.showroom.custom.decorations = Array.isArray(s.showroom.custom.decorations) ? s.showroom.custom.decorations : [];
  s.showroom.liked = Array.isArray(s.showroom.liked) ? s.showroom.liked : [];
  s.showroom.visited = Array.isArray(s.showroom.visited) ? s.showroom.visited : [];
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
    s.relicMarket.bought = [];
    s.relicMarket.date = today;
    s.auctions.bids = {};
    s.auctions.date = today;
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
export function addCollectorTokens(amount = 0) {
  const n = Math.max(0, Math.round(amount));
  if (!n) return 0;
  state.collectorTokens += n;
  state.stats.tokensEarned = (state.stats.tokensEarned || 0) + n;
  return n;
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

/* ---------------- supply ledger ----------------
   Every capped card keeps a permanent, serial-level issue ledger in the save.
   Selling a card never frees its serial: the global run stays exhausted, so
   a numbered edition can never exceed its published supply. */
const ledgerKey = (card, finish) => `${card.id}|${finish}`;
function capFor(card, finish) {
  if (!card) return null;
  if (card.supply && finish === card.finish) return card.supply;
  if (finish === 'numbered') return NUMBERED_CAPS[card.rarity] || 99;
  return null;
}
function usedSerials(card, finish) {
  const value = state.issued[ledgerKey(card, finish)];
  return Array.isArray(value) ? value : null;
}
export function supplyInfo(cardOrId, finish) {
  const card = typeof cardOrId === 'string' ? CARD_MAP[cardOrId] : cardOrId;
  if (!card) return {cap:0, issued:0, remaining:0, owned:0};
  const f = finish || card.finish || 'base';
  const cap = capFor(card, f) || 0;
  const used = usedSerials(card, f) || [];
  const owned = f === card.finish || f === 'numbered' ? state.items.filter(i => i.cardId === card.id && i.finish === f).length : 0;
  return {cap, issued: used.length, remaining: cap ? Math.max(0, cap - used.length) : 0, owned, serials:[...used]};
}
function issueSerial(card, finish) {
  const cap = capFor(card, finish);
  if (!cap) return null;
  const key = ledgerKey(card, finish);
  if (!Array.isArray(state.issued[key])) state.issued[key] = [];
  const used = state.issued[key];
  if (used.length >= cap) throw gameError('SOLD_OUT', `${card.name} has reached its ${cap}-copy supply cap`);
  for (let tries = 0; tries < 40; tries++) {
    const n = 1 + Math.floor(Math.random() * cap);
    if (!used.includes(n)) { used.push(n); return n; }
  }
  for (let n = 1; n <= cap; n++) {
    if (!used.includes(n)) { used.push(n); return n; }
  }
  throw gameError('SOLD_OUT', `${card.name} has reached its ${cap}-copy supply cap`);
}
export function supplyAvailable(card, finish) { return supplyInfo(card, finish).remaining > 0; }

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
  // Capped variants always carry their own edition finish; a caller cannot
  // relabel one as a standard card and bypass the supply ledger.
  const itemFinish = card.supply ? (card.finish || finish) : finish;
  const serial = capFor(card, itemFinish) ? issueSerial(card, itemFinish) : null;
  const item = {uid: uid(), cardId, finish: itemFinish, serial, at: Date.now(), source: opts.source || 'pull', grading: opts.grading || null};
  state.items.push(item);
  if (card.autograph) state.stats.autographsPulled = (state.stats.autographsPulled || 0) + 1;
  if (card.exclusive) state.stats.exclusivesPulled = (state.stats.exclusivesPulled || 0) + 1;
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
  state.market.history.unshift({
    type:'sale', cardId: item.cardId, finish: item.finish, serial: item.serial,
    price: value, at: Date.now(), buyer: 'Market collector',
  });
  state.market.history = state.market.history.slice(0, 24);
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
const BASE_CARDS = CARDS.filter(c => !c.exclusive && !c.autograph);
function packPool(pack) {
  let pool = BASE_CARDS;
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
  return pool.length ? pool : BASE_CARDS;
}
function rollRarity(pack, rnd) {
  // Roll exactly the published odds. The data layer balances the economy at
  // definition time; nothing is adjusted again here, so what the collector
  // reads on the pack card is what the roller actually uses.
  const entries = Object.entries(pack.odds || {}).filter(([, v]) => (Number(v) || 0) > 0);
  return weighted(entries, rnd);
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
function pickAutographEdition(allowed, rnd = Math.random) {
  // All six editions can be pulled from specialist packs — including the
  // One-of-One, which is weighted to a vanishingly rare 1-in-~1,300 chance.
  // The token-display flag only restricts Vault redemption, never pack drops.
  const editions = AUTOGRAPH_EDITIONS.filter(e => !allowed || allowed.includes(e.id));
  const available = editions.filter(e => AUTOGRAPH_SPECS.some(s => s.editionId === e.id && supplyAvailable(AUTOGRAPH_MAP[s.id], AUTOGRAPH_MAP[s.id]?.finish)));
  const pool = available.length ? available : editions;
  if (!pool.length) return null;
  return weighted(pool.map(e => [e, Math.min(e.supply, 500)]), rnd);
}
function injectCollectibles(pack, result, owned) {
  if (!result?.length) return result;
  const rnd = Math.random;
  const weakest = () => result.reduce((low, r, i) => RANK[r.card.rarity] < RANK[result[low].card.rarity] ? i : low, 0);

  /* Pack-exclusive editions are never part of the ordinary card pool. They
     replace one pulled slot only when the pack advertises an exclusive. */
  const exIds = exclusiveIdsForPack(pack.id);
  if (exIds.length && pack.exclusiveChance && rnd() < pack.exclusiveChance) {
    const candidates = exIds
      .map(id => EXCLUSIVE_MAP[id])
      .filter(c => c && supplyAvailable(c, c.finish));
    if (candidates.length) {
      const card = candidates[Math.floor(rnd() * candidates.length)];
      const idx = weakest();
      result[idx] = {card, finish: card.finish, isNew: !owned.has(card.id), serial: null, exclusive: true};
    }
  }

  /* Autographs only exist in explicitly flagged specialist packs. Ordinary
     core, featured, F1, MotoGP, event and daily packs have no autograph hook. */
  const autographCfg = pack.autographs;
  if (autographCfg && (autographCfg.guaranteed || rnd() < (autographCfg.chance || 0))) {
    const preferred = pickAutographEdition(autographCfg.editions, rnd);
    const order = preferred ? [preferred, ...AUTOGRAPH_EDITIONS.filter(e => e.id !== preferred.id)] : AUTOGRAPH_EDITIONS;
    let injected = null;
    for (const edition of order) {
      const candidates = AUTOGRAPH_SPECS
        .filter(s => s.editionId === edition.id)
        .map(s => AUTOGRAPH_MAP[s.id])
        .filter(c => c && supplyAvailable(c, c.finish));
      if (!candidates.length) continue;
      const card = candidates[Math.floor(rnd() * candidates.length)];
      injected = {card, finish: card.finish, isNew: !owned.has(card.id), serial: null, autograph: true};
      break;
    }
    if (injected) result[autographCfg.guaranteed ? 0 : weakest()] = injected;
  }
  return result;
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
  // Serial numbers are allocated by addItem from the permanent supply ledger,
  // never by the roller, so a sold-out run can never be issued again.
  return injectCollectibles(pack, result, owned);
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
    state.recentPulls.unshift({cardId: p.card.id, finish: item.finish, serial: item.serial, isNew: p.isNew, at: Date.now(), uid: item.uid});
  }
  state.recentPulls = state.recentPulls.slice(0, 24);
  state.stats.packsOpened++;
  state.daily.packsOpened++;
  if (pack.oncePerDay) state.dailyPackDate = today;
  if (packId === 'daily') { state.stats.dailyPacks++; state.daily.dailyPacks++; }
  if (packId === 'gold' || packId === 'f1-gold' || packId === 'motogp-gold') { state.stats.goldPacks++; state.daily.goldPacks++; }
  if (pack.category === 'event') state.stats.eventPacks = (state.stats.eventPacks || 0) + 1;
  if (pack.category === 'vault' || pack.category === 'exclusive') state.vault.opened = (state.vault.opened || 0) + 1;
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
  state.recentPulls.unshift({cardId: option.card.id, finish: item.finish, serial: item.serial, isNew: option.isNew, at: Date.now(), uid: item.uid});
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
  addCollectorTokens(album.reward.tokens || 0);
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
  addCollectorTokens(reward.tokens || 0);
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
    addCollectorTokens(def.reward.tokens || 0);
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
  addCollectorTokens(def.reward.tokens || 0);
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
  let coins = 0, gems = 0, tokens = 0, count = 0, packs = 0;
  const allLevels = [];
  for (const entry of list) {
    try {
      const res = claimChallenge(entry.id, entry.kind);
      coins += res.def.reward.coins || 0;
      gems += res.def.reward.gems || 0;
      tokens += res.def.reward.tokens || 0;
      if (res.def.reward.pack) packs++;
      count++;
      allLevels.push(...res.levelUps);
    } catch {}
  }
  return {coins, gems, tokens, count, packs, levelUps: allLevels};
}

/* ---------------- market ---------------- */
export function marketListings() {
  ensureToday();
  const dateSeed = parseInt(String(state.market.date || '').replace(/-/g, ''), 10) || 0;
  const seed = 1103 + state.market.seed * 7919 + (dateSeed % 9973);
  const rnd = rngFrom(seed);
  const listings = [];
  // Ordinary listings are base cards only. Capped editions are listed below
  // at their own fixed finish and price — never mispriced as a base card.
  const pool = BASE_CARDS;
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

  /* One premium collectible lot per board, when supply remains. These are
     presented with their serial cap and edition just like any other lot. */
  const collectibles = [...AUTOGRAPH_CARDS, ...EXCLUSIVE_CARDS]
    .filter(c => c.supply && supplyAvailable(c, c.finish) && !used.has(c.id));
  if (collectibles.length && rnd() < .55) {
    const card = collectibles[Math.floor(rnd() * collectibles.length)];
    const spread = 1.15 + rnd() * .35;
    const price = Math.max(20, Math.round(marketValue(card, card.finish) * spread / 10) * 10);
    const id = `m${state.market.seed}_c`;
    listings[listings.length - 1] = {
      id, card, finish: card.finish, grading: null, spread, price,
      rawPrice: marketValue(card, card.finish),
      bought: state.market.bought.includes(id),
      seller: 'VaultBroker',
      collectible: true,
    };
    used.add(card.id);
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
  state.market.history.unshift({
    type:'buy', cardId: item.cardId, finish: item.finish, serial: item.serial,
    price: listing.price, at: Date.now(), buyer: listing.seller,
  });
  state.market.history = state.market.history.slice(0, 24);
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

/* ============================================================
   MEMORABILIA & MERCHANDISE
   ============================================================ */
const relicLedgerKey = relic => relic.id;
export function relicSupplyInfo(relicOrId) {
  const relic = typeof relicOrId === 'string' ? RELIC_MAP[relicOrId] : relicOrId;
  if (!relic) return {cap:0, issued:0, remaining:0, owned:0, serials:[]};
  const cap = relic.supply || 0;
  const used = Array.isArray(state.issuedRelics[relicLedgerKey(relic)]) ? state.issuedRelics[relicLedgerKey(relic)] : [];
  const owned = state.relics.filter(r => r.relicId === relic.id).length;
  return {cap, issued: used.length, remaining: cap ? Math.max(0, cap - used.length) : 0, owned, serials:[...used]};
}
function issueRelicSerial(relic) {
  const cap = relic.supply || 0;
  if (!cap) return null;
  const key = relicLedgerKey(relic);
  if (!Array.isArray(state.issuedRelics[key])) state.issuedRelics[key] = [];
  const used = state.issuedRelics[key];
  if (used.length >= cap) throw gameError('SOLD_OUT', `${relic.name} has reached its ${cap}-piece edition cap`);
  for (let tries = 0; tries < 60; tries++) {
    const n = 1 + Math.floor(Math.random() * cap);
    if (!used.includes(n)) { used.push(n); return n; }
  }
  for (let n = 1; n <= cap; n++) {
    if (!used.includes(n)) { used.push(n); return n; }
  }
  throw gameError('SOLD_OUT', `${relic.name} is fully issued`);
}
export function addRelic(relicId, opts = {}) {
  const relic = RELIC_MAP[relicId];
  if (!relic) throw gameError('NO_RELIC', 'Unknown collectible');
  const serial = issueRelicSerial(relic);
  const item = {uid: 'r' + uid(), relicId, serial, at: Date.now(), source: opts.source || 'pack'};
  state.relics.push(item);
  state.stats.relicsCollected = (state.stats.relicsCollected || 0) + 1;
  if (relic.kind === 'memorabilia') state.stats.maxUnique = Math.max(state.stats.maxUnique, uniqueCount());
  return {item, relic, serial, value: relicValue(relic)};
}
export function ownedRelics() {
  return state.relics.map(item => {
    const relic = RELIC_MAP[item.relicId];
    return relic ? {item, relic, value: relicValue(relic)} : null;
  }).filter(Boolean);
}
export function uniqueRelicCount() { return new Set(state.relics.map(r => r.relicId)).size; }
export function relicPackOdds(pack) {
  const counts = {};
  for (const rar of pack.rarities || []) counts[rar] = (counts[rar] || 0) + 1;
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  return Object.entries(counts).map(([rarity, n]) => ({rarity, pct: n / total * 100}));
}
export function openRelicPack(packId) {
  const pack = MEMORABILIA_PACK_MAP[packId];
  if (!pack) throw gameError('NO_PACK', 'Unknown memorabilia pack');
  spendCurrency(pack.currency, pack.cost);
  const results = [];
  for (let slot = 0; slot < pack.cards; slot++) {
    const rarity = pack.rarities[Math.floor(Math.random() * pack.rarities.length)];
    let pool = MEMORABILIA.filter(r => r.rarity === rarity && (!r.supply || relicSupplyInfo(r).remaining > 0));
    if (!pool.length) pool = MEMORABILIA.filter(r => !r.supply || relicSupplyInfo(r).remaining > 0);
    if (!pool.length) throw gameError('SOLD_OUT', 'Every piece in this tier has been issued');
    const relic = pool[Math.floor(Math.random() * pool.length)];
    const added = addRelic(relic.id, {source: packId});
    results.push({...added, isNew: !state.relics.some(r => r.relicId === relic.id && r.uid !== added.item.uid)});
  }
  state.relicPackOpened = (state.relicPackOpened || 0) + 1;
  state.stats.relicPacksOpened = (state.stats.relicPacksOpened || 0) + 1;
  const xp = 25 + results.length * 12;
  const levelUps = addXp(xp);
  save(); emit();
  return {pack, results, xp, levelUps};
}
export function relicAlbumProgress(albumOrId, s = state) {
  const album = typeof albumOrId === 'string' ? RELIC_ALBUM_MAP[albumOrId] : albumOrId;
  if (!album) return {have:0, total:0, pct:0, complete:false, claimed:false};
  const pool = relicsForAlbum(album);
  const owned = new Set(s.relics.map(r => r.relicId));
  const have = pool.filter(r => owned.has(r.id)).length;
  return {
    have, total: pool.length,
    pct: pool.length ? Math.round(have / pool.length * 100) : 0,
    complete: have >= pool.length,
    claimed: s.relicClaims.includes(album.id),
  };
}
export function relicAlbums() {
  return RELIC_ALBUMS.map(album => ({album, ...relicAlbumProgress(album)}));
}
export function claimRelicAlbum(albumId) {
  const album = RELIC_ALBUM_MAP[albumId];
  if (!album) throw gameError('NO_ALBUM', 'Unknown collection');
  const prog = relicAlbumProgress(album);
  if (!prog.complete) throw gameError('ALBUM_INCOMPLETE', 'This collection is not complete yet');
  if (prog.claimed) throw gameError('ALREADY_CLAIMED', 'Reward already claimed');
  state.relicClaims.push(albumId);
  const reward = album.reward || {};
  if (reward.coins) { state.coins += reward.coins; state.stats.coinsEarned += reward.coins; }
  if (reward.gems) state.gems += reward.gems;
  addCollectorTokens(reward.tokens || 0);
  if (reward.decoration && !state.showroom.custom.decorations.includes(reward.decoration)) {
    state.showroom.custom.decorations.push(reward.decoration);
  }
  let bonus = null;
  if (reward.relicId) bonus = addRelic(reward.relicId, {source:'album-reward'});
  const levelUps = addXp(140);
  save(); emit();
  return {album, reward, bonus, levelUps};
}
export function buyRelic(relicId) {
  const relic = MERCHANDISE.find(r => r.id === relicId);
  if (!relic) throw gameError('NO_RELIC', 'This item is not in the store');
  if (relic.supply && relicSupplyInfo(relic).remaining <= 0) throw gameError('SOLD_OUT', `${relic.name} is sold out`);
  if (state.coins < relic.price) throw gameError('NOT_ENOUGH_COINS', 'Not enough coins');
  spendCurrency('coins', relic.price);
  const added = addRelic(relic.id, {source:'store'});
  state.stats.relicsBought = (state.stats.relicsBought || 0) + 1;
  state.relicMarket.history.unshift({
    type:'buy', relicId, price: relic.price, at: Date.now(), buyer:'Merchandise Store', serial: added.serial,
  });
  state.relicMarket.history = state.relicMarket.history.slice(0, 30);
  addXp(12);
  save(); emit();
  return {...added, price: relic.price};
}
export function sellRelicItem(itemUid) {
  const idx = state.relics.findIndex(r => r.uid === itemUid);
  if (idx < 0) throw gameError('NO_ITEM', 'Collectible not found');
  const item = state.relics[idx];
  const relic = RELIC_MAP[item.relicId];
  const value = relicValue(relic);
  state.relics.splice(idx, 1);
  state.coins += value;
  state.stats.coinsEarned += value;
  state.stats.relicsSold = (state.stats.relicsSold || 0) + 1;
  state.relics = state.relics.filter(r => r.uid !== itemUid);
  state.showroom.items = state.showroom.items.filter(d => !(d.kind === 'relic' && d.itemUid === itemUid));
  state.relicMarket.history.unshift({
    type:'sale', relicId: relic.id, serial: item.serial, price: value, at: Date.now(), buyer:'Market collector',
  });
  state.relicMarket.history = state.relicMarket.history.slice(0, 30);
  addXp(6);
  save(); emit();
  return {relic, item, value};
}
export function relicMarketListings() {
  ensureToday();
  const dateSeed = parseInt(String(state.relicMarket.date || '').replace(/-/g, ''), 10) || 0;
  const rnd = rngFrom(2119 + state.relicMarket.seed * 6151 + (dateSeed % 9973));
  const pool = RELICS.filter(r => !r.supply || relicSupplyInfo(r).remaining > 0);
  const out = [];
  const used = new Set();
  for (let i = 0; i < 6; i++) {
    let relic;
    for (let tries = 0; tries < 40; tries++) {
      const cand = pool[Math.floor(rnd() * pool.length)];
      if (cand && !used.has(cand.id) && RELIC_RARITY[cand.rarity].rank >= 1) { relic = cand; break; }
    }
    if (!relic) relic = pool[Math.floor(rnd() * pool.length)];
    if (!relic) break;
    used.add(relic.id);
    const id = `rl${state.relicMarket.seed}_${i}`;
    const spread = 1.05 + rnd() * .45;
    out.push({
      id, relic,
      serial: relic.supply ? 1 + Math.floor(rnd() * relic.supply) : null,
      price: Math.max(30, Math.round(relicValue(relic) * spread / 10) * 10),
      rawPrice: relicValue(relic),
      spread,
      bought: state.relicMarket.bought.includes(id),
      seller: RIVAL_COLLECTORS[Math.floor(rnd() * RIVAL_COLLECTORS.length)].alias,
    });
  }
  return out;
}
export function buyRelicListing(listingId) {
  ensureToday();
  const listing = relicMarketListings().find(l => l.id === listingId);
  if (!listing) throw gameError('NO_LISTING', 'Listing not found');
  if (listing.bought) throw gameError('SOLD', 'Listing already sold');
  if (state.coins < listing.price) throw gameError('NOT_ENOUGH_COINS', 'Not enough coins');
  state.coins -= listing.price;
  state.stats.coinsSpent += listing.price;
  state.daily.coinsSpent += listing.price;
  state.stats.relicsBought = (state.stats.relicsBought || 0) + 1;
  state.relicMarket.bought.push(listing.id);
  const added = addRelic(listing.relic.id, {source:'market', serialHint: listing.serial});
  state.relicMarket.history.unshift({
    type:'buy', relicId: listing.relic.id, serial: added.serial, price: listing.price, at: Date.now(), buyer: listing.seller,
  });
  state.relicMarket.history = state.relicMarket.history.slice(0, 30);
  addXp(10);
  save(); emit();
  return {listing, ...added};
}
export function refreshRelicMarket() {
  ensureToday();
  spendCurrency('coins', 250);
  state.relicMarket.seed++;
  state.relicMarket.bought = [];
  save(); emit();
}

/* ---------------- simulated memorabilia auctions ---------------- */
export function auctionLots() {
  ensureToday();
  const dateSeed = parseInt(String(state.auctions.date || '').replace(/-/g, ''), 10) || 0;
  const rnd = rngFrom(4211 + state.auctions.seed * 3571 + (dateSeed % 9973));
  const pool = RELICS.filter(r => {
    if (!r.supply || relicSupplyInfo(r).remaining <= 0) return false;
    return ['legendary','iconic','museum'].includes(r.rarity) || r.signed || r.limited;
  });
  const lots = [];
  const used = new Set();
  for (let i = 0; i < 3; i++) {
    let relic;
    for (let tries = 0; tries < 40; tries++) {
      const cand = pool[Math.floor(rnd() * pool.length)];
      if (cand && !used.has(cand.id)) { relic = cand; break; }
    }
    if (!relic) break;
    used.add(relic.id);
    const id = `au${state.auctions.seed}_${i}`;
    const start = Math.round(relicValue(relic) * (0.85 + rnd() * .3) / 10) * 10;
    const bid = state.auctions.bids[id];
    const bidder = bid?.bidder || RIVAL_COLLECTORS[Math.floor(rnd() * RIVAL_COLLECTORS.length)].alias;
    const current = bid?.amount || start;
    const increment = Math.max(50, Math.round(current * .06 / 10) * 10);
    lots.push({
      id, relic, start, current, increment, bidder,
      youLeading: bid?.bidder === 'You',
      buyNow: Math.round(start * 1.45 / 10) * 10,
      watchers: 4 + Math.floor(rnd() * 22),
      endsIn: 6 + Math.floor(rnd() * 18),
      history: (state.auctions.history.filter(h => h.lotId === id)).slice(0, 5),
    });
  }
  return lots;
}
export function placeAuctionBid(lotId, amount) {
  ensureToday();
  const lot = auctionLots().find(l => l.id === lotId);
  if (!lot) throw gameError('NO_LOT', 'Auction lot not found');
  const bid = Math.round(Number(amount) || 0);
  if (bid < lot.current + lot.increment) throw gameError('BID_TOO_LOW', `Bid must be at least ◈ ${(lot.current + lot.increment).toLocaleString()}`);
  if (state.coins < bid) throw gameError('NOT_ENOUGH_COINS', 'Not enough coins to place that bid');
  if (bid >= lot.buyNow) {
    state.coins -= bid;
    state.stats.coinsSpent += bid;
    const added = addRelic(lot.relic.id, {source:'auction'});
    state.auctions.history.unshift({lotId, type:'won', relicId: lot.relic.id, amount: bid, bidder:'You', at: Date.now()});
    state.auctions.history = state.auctions.history.slice(0, 40);
    state.stats.auctionsWon = (state.stats.auctionsWon || 0) + 1;
    delete state.auctions.bids[lotId];
    addXp(30);
    save(); emit();
    return {won: true, ...added, amount: bid, lot};
  }
  state.auctions.bids[lotId] = {amount: bid, bidder: 'You'};
  state.auctions.history.unshift({lotId, type:'bid', relicId: lot.relic.id, amount: bid, bidder:'You', at: Date.now()});
  const rnd = rngFrom(777 + lot.id.length * 31 + bid);
  const counter = Math.round(bid * (1.05 + rnd() * .12) / 10) * 10;
  const rival = RIVAL_COLLECTORS[Math.floor(rnd() * RIVAL_COLLECTORS.length)].alias;
  state.auctions.bids[lotId] = {amount: counter, bidder: rival};
  state.auctions.history.unshift({lotId, type:'outbid', relicId: lot.relic.id, amount: counter, bidder: rival, at: Date.now()});
  state.auctions.history = state.auctions.history.slice(0, 40);
  save(); emit();
  return {won:false, amount: bid, counter, bidder: rival, lot};
}
export function refreshAuctions() {
  ensureToday();
  state.auctions.seed++;
  state.auctions.bids = {};
  state.auctions.date = todayKey();
  save(); emit();
}

/* ============================================================
   PERSONAL SHOWROOM / COLLECTOR'S MUSEUM
   ============================================================ */
export function showroomPrestige(s = state) {
  const RARITY_PTS = {common:1, rare:3, epic:8, legendary:20, iconic:50};
  let points = 0;
  for (const item of s.items) {
    const card = CARD_MAP[item.cardId];
    if (!card) continue;
    points += RARITY_PTS[card.rarity] || 1;
    if (card.exclusive) points += 40;
    if (card.autograph) points += 55;
    if (item.serial != null) points += 25;
    if (item.grading) points += 5;
  }
  const RELIC_PTS = {standard:3, rare:8, epic:20, legendary:50, iconic:120, museum:300};
  for (const entry of ownedRelics()) {
    points += RELIC_PTS[entry.relic.rarity] || 3;
    if (entry.relic.signed) points += 60;
    if (entry.relic.dualSigned) points += 80;
    if (entry.relic.limited) points += 30;
    if (entry.item.serial != null) points += 20;
  }
  points += ALBUMS.filter(a => albumProgress(a, s).complete).length * 100;
  points += RELIC_ALBUMS.filter(a => relicAlbumProgress(a, s).complete).length * 150;
  points += s.showroom.rooms.length * 18;
  points += s.showroom.items.length * 4;
  points += s.showroom.custom.decorations.length * 12;
  let level = 1;
  for (const p of PRESTIGE) if (points >= p.points) level = p.level;
  const current = PRESTIGE[level - 1];
  const next = PRESTIGE[level] || null;
  return {
    points, level, name: current.name, icon: current.icon,
    next, progress: next ? Math.min(100, Math.round((points - current.points) / Math.max(1, next.points - current.points) * 100)) : 100,
  };
}
function requirementMet(room, s = state) {
  const req = room.req;
  if (!req) return true;
  const cards = s.items.map(i => CARD_MAP[i.cardId]).filter(Boolean);
  switch (req.type) {
    case 'f1Cards': return new Set(cards.filter(c => c.sport === 'f1').map(c => c.id)).size >= req.value;
    case 'mgpCards': return new Set(cards.filter(c => c.sport === 'motogp').map(c => c.id)).size >= req.value;
    case 'relics': return s.relics.length >= req.value;
    case 'signed': return ownedRelics().filter(e => e.relic.signed).length >= req.value;
    case 'miniatures': return ownedRelics().filter(e => e.relic.category === 'miniatures').length >= req.value;
    case 'trophy': return ownedRelics().some(e => ['trophy','medal'].includes(e.relic.model));
    case 'prestige': return showroomPrestige(s).level >= req.value;
    case 'fullSize': {
      const f1 = ALBUMS.some(a => a.sport === 'f1' && albumProgress(a, s).complete);
      const mgp = ALBUMS.some(a => a.sport === 'motogp' && albumProgress(a, s).complete);
      return f1 && mgp;
    }
    default: return false;
  }
}
export function roomStatus(roomId, s = state) {
  const room = ROOM_MAP[roomId];
  if (!room) return null;
  const unlocked = s.showroom.rooms.includes(roomId);
  return {
    room, unlocked,
    reqMet: requirementMet(room, s),
    canAfford: s.coins >= room.cost && s.gems >= room.gems,
  };
}
export function unlockRoom(roomId) {
  const status = roomStatus(roomId);
  if (!status) throw gameError('NO_ROOM', 'Unknown room');
  if (status.unlocked) throw gameError('ALREADY_UNLOCKED', 'This room is already open');
  if (!status.reqMet) throw gameError('REQUIREMENT', 'Complete this room’s collection requirement first');
  if (!status.canAfford) throw gameError('NOT_ENOUGH_COINS', 'Not enough currency to build this room');
  spendCurrency('coins', status.room.cost);
  if (status.room.gems) spendCurrency('gems', status.room.gems);
  state.showroom.rooms.push(roomId);
  state.stats.roomsUnlocked = (state.stats.roomsUnlocked || 0) + 1;
  addXp(80);
  save(); emit();
  return status.room;
}
export function setShowroomCustom(key, value) {
  if (!(key in state.showroom.custom)) throw gameError('NO_OPTION', 'Unknown customisation option');
  if (key === 'decorations') return;
  state.showroom.custom[key] = value;
  save(); emit();
}
export function unlockDecoration(id) {
  if (!state.showroom.custom.decorations.includes(id)) {
    state.showroom.custom.decorations.push(id);
    save(); emit();
  }
}
export function showroomDisplays(roomId) {
  return state.showroom.displays.filter(d => d.room === roomId);
}
export function showroomContents(roomId) {
  const displays = showroomDisplays(roomId);
  return displays.map(display => ({
    display,
    items: state.showroom.items.filter(entry => entry.displayUid === display.uid).map(entry => ({
      ...entry, meta: displayItemMeta(entry),
    })),
  }));
}
export function displayItemMeta(entry) {
  if (entry.kind === 'card') {
    const item = state.items.find(i => i.uid === entry.itemUid);
    const card = item && CARD_MAP[item.cardId];
    if (!card) return null;
    return {name: card.name, rarity: card.rarity, colors: card.colors, serial: item.serial, finish: item.finish, signed: !!card.autograph, signedBy: card.signature || '', edition: card.edition || finishNameSafe(item.finish), sport: card.sport};
  }
  const item = state.relics.find(i => i.uid === entry.itemUid);
  const relic = item && RELIC_MAP[item.relicId];
  if (!relic) return null;
  return {name: relic.name, rarity: relic.rarity, colors: relic.colors, serial: item.serial, finish: relic.rarity, signed: !!relic.signed, signedBy: relic.signedBy || '', edition: relic.rarityMeta?.label || '', sport: relic.sport, model: relic.model};
}
function finishNameSafe(finish) { return finish ? finish.replace(/^./, c => c.toUpperCase()) : 'Base'; }
export function placeShowroomItem(itemUid, kind, roomId, displayType) {
  if (!state.showroom.rooms.includes(roomId)) throw gameError('ROOM_LOCKED', 'Unlock this room first');
  const display = DISPLAY_MAP[displayType];
  if (!display) throw gameError('NO_DISPLAY', 'Unknown display fixture');
  const exists = kind === 'card' ? state.items.some(i => i.uid === itemUid) : state.relics.some(i => i.uid === itemUid);
  if (!exists) throw gameError('NO_ITEM', 'That collectible is no longer in your vault');
  if (state.showroom.items.some(d => d.itemUid === itemUid)) throw gameError('ALREADY_PLACED', 'This item is already on display');
  const meta = displayItemMeta({itemUid, kind});
  if (display.accepts.types?.length && !display.accepts.types.includes(kind)) {
    throw gameError('WRONG_DISPLAY', `${display.name} only accepts ${display.accepts.types.join(' or ')} items`);
  }
  if (display.accepts.models?.length && (!meta?.model || !display.accepts.models.includes(meta.model))) {
    throw gameError('WRONG_DISPLAY', `${display.name} is not suitable for this item`);
  }
  let fixture = state.showroom.displays.find(d => d.room === roomId && d.type === displayType &&
    state.showroom.items.filter(e => e.displayUid === d.uid).length < display.capacity);
  if (!fixture) {
    const slots = ROOM_MAP[roomId].slots;
    const usedSlots = new Set(state.showroom.displays.filter(d => d.room === roomId).map(d => d.slot));
    let slot = -1;
    for (let i = 0; i < slots; i++) if (!usedSlots.has(i)) { slot = i; break; }
    if (slot < 0) throw gameError('ROOM_FULL', 'This room has no free display space');
    fixture = {uid: 'd' + uid(), room: roomId, type: displayType, slot};
    state.showroom.displays.push(fixture);
  }
  const pos = state.showroom.items.filter(e => e.displayUid === fixture.uid).length;
  state.showroom.items.push({uid: 'p' + uid(), kind, itemUid, room: roomId, displayUid: fixture.uid, pos, visible: true});
  state.stats.showroomItems = state.showroom.items.length;
  addXp(6);
  save(); emit();
  return {fixture, meta};
}
export function removeShowroomItem(placementUid) {
  const before = state.showroom.items.length;
  state.showroom.items = state.showroom.items.filter(d => d.uid !== placementUid);
  if (state.showroom.items.length === before) throw gameError('NO_ITEM', 'Display not found');
  state.stats.showroomItems = state.showroom.items.length;
  save(); emit();
}
export function toggleShowroomVisible(placementUid) {
  const entry = state.showroom.items.find(d => d.uid === placementUid);
  if (!entry) throw gameError('NO_ITEM', 'Display not found');
  entry.visible = !entry.visible;
  save(); emit();
  return entry.visible;
}
export function moveShowroomItem(placementUid, roomId) {
  const entry = state.showroom.items.find(d => d.uid === placementUid);
  if (!entry) throw gameError('NO_ITEM', 'Display not found');
  if (!state.showroom.rooms.includes(roomId)) throw gameError('ROOM_LOCKED', 'Unlock this room first');
  entry.room = roomId;
  const fixture = state.showroom.displays.find(d => d.room === roomId && d.type === 'pedestal') ||
    state.showroom.displays.find(d => d.room === roomId);
  if (fixture) entry.displayUid = fixture.uid;
  save(); emit();
}

/* ---------------- simulated global showroom community ---------------- */
function communitySeed() {
  const date = (state.showroom.visited.join('|') || '0') + String(state.showroom.liked.length);
  let h = 2166136261;
  for (let i = 0; i < date.length; i++) h = Math.imul(h ^ date.charCodeAt(i), 16777619);
  return h >>> 0;
}
export function communityShowrooms() {
  const rnd = rngFrom(communitySeed());
  return RIVAL_COLLECTORS.map((c, i) => {
    const score = 180 + Math.floor(rnd() * 1700) + (i === 0 ? 260 : 0);
    const lvl = PRESTIGE.reduce((best, p) => score >= p.points ? p.level : best, 1);
    const prestige = PRESTIGE[lvl - 1];
    return {
      ...c,
      score,
      prestige,
      likes: 40 + Math.floor(rnd() * 900),
      rating: (4.1 + rnd() * .9).toFixed(1),
      rooms: 3 + Math.floor(rnd() * 7),
      highlight: ['Museum Piece helmet','Signed Leathers Collection','F1 1988 shrine','Ducati garage','Championship trophy wall','Vintage programme archive'][Math.floor(rnd() * 6)],
      liked: state.showroom.liked.includes(c.alias),
      visited: state.showroom.visited.includes(c.alias),
    };
  }).sort((a, b) => b.score - a.score);
}
export function likeShowroom(alias) {
  const idx = state.showroom.liked.indexOf(alias);
  if (idx >= 0) state.showroom.liked.splice(idx, 1);
  else state.showroom.liked.push(alias);
  save(); emit();
  return !state.showroom.liked.includes(alias);
}
export function visitShowroom(alias) {
  if (!state.showroom.visited.includes(alias)) state.showroom.visited.push(alias);
  state.showroom.visits++;
  save(); emit();
  return communityShowrooms().find(c => c.alias === alias);
}
export function weeklyShowrooms() { return communityShowrooms().slice(0, 5); }

/* ---------------- collector vault ---------------- */
export function vaultEditions() {
  return AUTOGRAPH_EDITIONS.map(edition => {
    const cards = AUTOGRAPH_SPECS
      .filter(spec => spec.editionId === edition.id)
      .map(spec => AUTOGRAPH_MAP[spec.id])
      .filter(Boolean);
    const supplies = cards.map(card => supplyInfo(card, card.finish));
    const issued = supplies.reduce((n, info) => n + info.issued, 0);
    const owned = state.items.filter(item => cards.some(card => card.id === item.cardId)).length;
    const cap = edition.supply * cards.length;
    return {
      ...edition,
      cards,
      cardCount: cards.length,
      cap,
      issued,
      owned,
      remaining: Math.max(0, cap - issued),
      purchasable: edition.tokens !== null,
    };
  });
}
export function vaultExclusives() {
  return EXCLUSIVE_CARDS.map(card => ({card, ...supplyInfo(card, card.finish)}));
}
export function redeemVault(editionId) {
  const edition = AUTOGRAPH_EDITIONS.find(e => e.id === editionId);
  if (!edition) throw gameError('NO_EDITION', 'Unknown autograph edition');
  if (edition.tokens === null) throw gameError('NOT_FOR_SALE', 'One-of-One cards are never sold for tokens');
  if (state.collectorTokens < edition.tokens) throw gameError('NOT_ENOUGH_TOKENS', 'Not enough Collector Tokens');
  const candidates = AUTOGRAPH_SPECS
    .filter(spec => spec.editionId === editionId)
    .map(spec => AUTOGRAPH_MAP[spec.id])
    .filter(card => card && supplyAvailable(card, card.finish));
  if (!candidates.length) throw gameError('SOLD_OUT', `${edition.name} is fully issued`);
  const card = candidates[Math.floor(Math.random() * candidates.length)];
  const item = addItem(card.id, card.finish, {source:'vault'});
  state.collectorTokens -= edition.tokens;
  state.vault.redeemed.unshift({cardId: card.id, editionId, serial: item.serial, at: Date.now()});
  state.vault.redeemed = state.vault.redeemed.slice(0, 24);
  state.vault.opened = (state.vault.opened || 0) + 1;
  state.stats.vaultRedeems = (state.stats.vaultRedeems || 0) + 1;
  addXp(70);
  save(); emit();
  return {card, item, edition, cost: edition.tokens};
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
    // Trades only ever offer standard cards — capped collectibles stay in
    // their own pack/Vault/market channels with correct supply accounting.
    let candidates = BASE_CARDS.filter(c => !owned.has(c.id) && !offeredIds.has(c.id) && RANK[c.rarity] === targetRank);
    if (!candidates.length) candidates = BASE_CARDS.filter(c => !owned.has(c.id) && !offeredIds.has(c.id) && Math.abs(RANK[c.rarity] - wantRank) <= 1);
    if (!candidates.length) candidates = BASE_CARDS.filter(c => !owned.has(c.id) && !offeredIds.has(c.id));
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
  state.tradeHistory.unshift({
    at: Date.now(), trader: offer.trader.alias,
    gaveCardId: offer.want.id, gaveFinish: offer.wantFinish, gaveSerial: offer.wantItem.serial,
    gotCardId: offer.give.id, gotFinish: item.finish, gotSerial: item.serial,
    value: offer.giveValue,
  });
  state.tradeHistory = state.tradeHistory.slice(0, 24);
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
export {
  CARDS, CARD_MAP, ALBUMS, ALBUM_MAP, RARITY, PACKS, RANK, FINISH_ORDER,
  RELICS, RELIC_MAP, MEMORABILIA, MERCHANDISE, RELIC_RARITY,
  MEMORABILIA_PACKS, RELIC_ALBUMS, ROOMS, ROOM_MAP, DISPLAYS, DISPLAY_MAP,
  THEMES, THEME_MAP, PRESTIGE,
};
