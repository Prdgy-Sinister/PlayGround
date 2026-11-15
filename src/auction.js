import {
  BUYER_TYPES, BUYER_NAMES, SPECIES, WEAPON_TYPES, appraisal, getBuyerQuote,
  seasonOf, isNight, treeQuality, weaponValue, treeValue, clamp, fmt, TREE_NAMES, WEAPON_TYPES as WT,
} from './data.js';

const rnd = (a = 0, b = 1) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function itemCategory(item) {
  if (item.kind === 'tree') return 'bonsai';
  if (item.type === 'ornament') return 'ornament';
  return 'weapon';
}

export function itemSupernatural(item) {
  if (item.kind === 'tree') return !!SPECIES[item.sp]?.supernatural;
  return !!WEAPON_TYPES[item.type]?.supernatural || !!item.supernatural;
}

export function itemQuality(item) {
  if (item.kind === 'tree') return treeQuality(item);
  return item.quality || 50;
}

export function itemLabel(item) {
  if (item.kind === 'tree') {
    const sp = SPECIES[item.sp];
    return `${item.name} — ${sp.name}`;
  }
  for (const t of Object.values(WEAPON_TYPES)) if (t.id === item.type) return `${item.name} — ${t.name}`;
  return item.name;
}

export function itemKanji(item) {
  if (item.kind === 'tree') return SPECIES[item.sp]?.kanji || '盆';
  return WEAPON_TYPES[item.type]?.kanji || '刀';
}

function relationshipBonus(state, type) {
  return Math.min(0.22, (state.buyers[type] || 0) * 0.022);
}

export function createBuyers(item, state, opts = {}) {
  const category = itemCategory(item);
  const supernatural = itemSupernatural(item);
  const night = opts.night ?? isNight(state.hour);
  const oni = opts.oni;
  const appraised = appraisal(item, state);
  const repFactor = 1 + Math.min(1.8, state.rep / 700);
  const types = oni ? ['oni', 'oni', 'merchant', 'noble'] : ['samurai', 'monk', 'merchant', 'noble', 'merchant', 'samurai'];
  if (supernatural && night && !oni) types.push('oni');
  const usedNames = new Set();
  const count = oni ? 4 : (supernatural ? 5 : 4 + Math.round(rnd(0, 1.6)));
  const buyers = [];
  const candidateTypes = [...types].sort(() => Math.random() - 0.5);
  for (let i = 0; i < count; i++) {
    const type = oni ? candidateTypes[i % candidateTypes.length] : candidateTypes[i % candidateTypes.length];
    const pref = BUYER_TYPES[type].pref;
    let interested = pref.includes(category);
    if (type === 'oni') interested = supernatural || category === 'weapon';
    if (type === 'noble' && category === 'bonsai') interested = true;
    if (type === 'samurai' && category === 'bonsai') interested = Math.random() < 0.15;
    if (!interested && category !== 'weapon') continue;
    const namePool = BUYER_NAMES[type].filter((n) => !usedNames.has(n));
    if (!namePool.length) continue;
    const name = pick(namePool);
    usedNames.add(name);
    const wealthBase = oni ? 18000 : 6000 + state.rep * 42;
    const budget = Math.round(wealthBase * BUYER_TYPES[type].budget * rnd(0.65, 1.65) / 10) * 10;
    let interest = interested ? rnd(1.05, 1.7) : rnd(0.45, 0.8);
    interest *= 1 + relationshipBonus(state, type);
    if (type === 'oni' && supernatural) interest *= 1.7;
    if (type === 'samurai' && category === 'weapon') interest *= 1.15;
    if (type === 'monk' && category === 'bonsai') interest *= 1.12;
    if (type === 'noble' && category === 'ornament') interest *= 1.3;
    const maxBid = Math.min(budget, Math.round((appraised * interest * rnd(0.85, 1.35)) / 10) * 10);
    const personality = pick(['eager', 'measured', 'stubborn', 'showman']);
    buyers.push({
      id: 'b' + i + '_' + Math.random().toString(36).slice(2, 6),
      name,
      type,
      typeName: BUYER_TYPES[type].name,
      kanji: BUYER_TYPES[type].kanji,
      budget,
      maxBid,
      interest,
      personality,
      active: true,
      bids: 0,
      quote: getBuyerQuote(type),
      lastBid: 0,
    });
  }
  // ensure at least two determined bidders
  if (buyers.length < 2) {
    const type = category === 'bonsai' ? 'monk' : category === 'ornament' ? 'noble' : 'samurai';
    const name = pick(BUYER_NAMES[type]);
    buyers.push({
      id: 'b_fill' + Math.random().toString(36).slice(2, 6), name, type,
      typeName: BUYER_TYPES[type].name, kanji: BUYER_TYPES[type].kanji,
      budget: (6000 + state.rep * 20) * (oni ? 2 : 1),
      maxBid: Math.round(appraised * 1.15), interest: 1.15, personality: 'measured', active: true, bids: 0,
      quote: getBuyerQuote(type), lastBid: 0,
    });
  }
  return buyers;
}

export function createAuction(item, state, opts = {}) {
  const appraised = appraisal(item, state);
  const baseStart = Math.round(appraised * (opts.startMultiplier ?? 0.65) / 10) * 10;
  const buyers = createBuyers(item, state, opts);
  return {
    item,
    oni: !!opts.oni,
    appraisal: appraised,
    startBid: baseStart,
    currentBid: baseStart,
    highest: null,
    round: 0,
    buyers,
    log: [],
    ended: false,
    sold: false,
    unsold: false,
    winner: null,
    fee: 0.07,
    maxRounds: 9,
    busy: false,
  };
}

function bidIncrement(a, buyer) {
  const base = Math.max(20, Math.round(a.appraisal * 0.055 / 10) * 10);
  const extra = buyer.personality === 'eager' ? 1.5 : buyer.personality === 'stubborn' ? 1.8 : buyer.personality === 'showman' ? 2.2 : 1;
  return Math.max(10, Math.round(base * extra * rnd(0.55, 1.25) / 10) * 10);
}

export function advanceAuction(a) {
  if (a.ended || a.busy) return { events: [], ended: a.ended };
  a.round++;
  const events = [];
  const alive = a.buyers.filter((b) => b.active && b !== a.highest);
  // shuffle for variety
  alive.sort(() => Math.random() - 0.5);
  let bidsThisRound = 0;
  for (const b of alive) {
    if (a.ended) break;
    const cap = Math.min(b.maxBid, b.budget);
    if (a.currentBid >= cap) { b.active = false; events.push({ type: 'out', buyer: b }); continue; }
    let chance = b.personality === 'eager' ? 0.85 : b.personality === 'measured' ? 0.62 : b.personality === 'stubborn' ? 0.58 : 0.72;
    if (!a.highest) chance += 0.1;
    if (a.currentBid < a.appraisal * 0.7) chance += 0.15;
    if (a.round > 5) chance -= 0.1;
    if (Math.random() > chance) continue;
    let next = a.currentBid + bidIncrement(a, b);
    if (next > cap) next = cap;
    if (next <= a.currentBid) { b.active = false; events.push({ type: 'out', buyer: b }); continue; }
    next = Math.round(next / 10) * 10;
    a.currentBid = next;
    if (a.highest) a.highest.lastBid = a.highest.lastBid || a.currentBid;
    a.highest = b;
    b.bids++;
    b.lastBid = next;
    bidsThisRound++;
    events.push({ type: 'bid', buyer: b, amount: next });
    if (a.currentBid >= a.appraisal * 3.2) break;
  }
  if (!bidsThisRound && a.round > 1) {
    // chance the leading bidder has won
    if (a.highest) {
      a.ended = true;
      a.sold = true;
      a.winner = a.highest;
      events.push({ type: 'hammer', buyer: a.highest, amount: a.currentBid });
    } else {
      a.ended = true;
      a.unsold = true;
      events.push({ type: 'unsold' });
    }
  } else if (a.highest && a.round >= a.maxRounds) {
    a.ended = true;
    a.sold = true;
    a.winner = a.highest;
    events.push({ type: 'hammer', buyer: a.highest, amount: a.currentBid });
  }
  if (!a.highest && a.round >= 3) {
    a.ended = true;
    a.unsold = true;
    events.push({ type: 'unsold' });
  }
  return { events, ended: a.ended };
}

export function hammerAuction(a) {
  if (a.ended) return { events: [] };
  a.ended = true;
  if (a.highest) {
    a.sold = true;
    a.winner = a.highest;
    return { events: [{ type: 'hammer', buyer: a.highest, amount: a.currentBid }] };
  }
  a.unsold = true;
  return { events: [{ type: 'unsold' }] };
}

export function settleAuction(a) {
  if (!a.sold || !a.winner) return null;
  const gross = a.currentBid;
  const fee = Math.round(gross * a.fee);
  const payout = gross - fee;
  return {
    gross, fee, payout, buyer: a.winner,
    repGain: Math.max(2, Math.round(gross / 900 + itemQuality(a.item) / 18)),
  };
}

export function generateCommission(state, force = false) {
  if (!force && state.commissions.length >= 3) return null;
  const rep = state.rep;
  const kind = Math.random() < 0.5 ? 'weapon' : 'tree';
  const buyers = ['samurai', 'monk', 'merchant', 'noble'];
  const weights = { samurai: kind === 'weapon' ? 2 : 0.3, monk: kind === 'tree' ? 2 : 0.2, merchant: 1, noble: 1 };
  const typeKey = pick(buyers.flatMap((b) => Array(Math.max(1, Math.round(weights[b] * 3))).fill(b)));
  const buyer = BUYER_TYPES[typeKey];
  const client = pick(BUYER_NAMES[typeKey]);
  let req = {};
  if (kind === 'weapon') {
    const available = Object.values(WEAPON_TYPES).filter((w) => !w.supernatural && (w.tier <= Math.max(1, state.workshopLevel) || w.id === 'tanto' || w.id === 'katana' || w.id === 'wakizashi'));
    const wt = pick(available);
    const minQ = clamp(48 + Math.floor(rep / 18) + Math.floor(Math.random() * 18), 45, 96);
    req = { weaponType: wt.id, minQuality: minQ };
  } else {
    const sp = pick(['maple', 'pine', 'cherry', 'juniper', 'azalea', 'bamboo']);
    const minStyle = clamp(35 + Math.floor(rep / 14) + Math.floor(Math.random() * 16), 30, 95);
    const minAge = 1.5 + Math.floor(rep / 250);
    req = { species: sp, minStyle, minAge };
  }
  const base = kind === 'weapon' ? (WEAPON_TYPES[req.weaponType]?.base || 1500) * (0.9 + req.minQuality / 100) : 1400 + req.minStyle * 42;
  const reward = Math.round(base * (1.15 + Math.random() * 0.5) * (1 + rep / 900) / 10) * 10;
  const buyerType = typeKey;
  return {
    id: 'com_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
    client,
    buyerType,
    kind,
    req,
    reward,
    rep: Math.round(8 + reward / 240),
    deadlineDay: state.day + 4 + Math.floor(Math.random() * 5),
    createdDay: state.day,
    desc: kind === 'weapon'
      ? `${buyer.name} ${client} commissions a ${WEAPON_TYPES[req.weaponType].name} of at least ${req.minQuality} quality.`
      : `${buyer.name} ${client} seeks a ${SPECIES[req.species].name} bonsai, styled to at least ${req.minStyle} and ${req.minAge.toFixed(1)}+ years old.`,
  };
}

export function commissionMatches(com, item) {
  if (!com || !item) return false;
  if (com.kind === 'weapon') {
    return item.kind === 'weapon' && item.type === com.req.weaponType && item.quality >= com.req.minQuality;
  }
  return item.kind === 'tree' && item.sp === com.req.species && item.style >= com.req.minStyle && item.age >= com.req.minAge;
}

export function commissionProgress(com, item) {
  if (!item) return 'No matching piece';
  if (com.kind === 'weapon') {
    if (item.kind !== 'weapon') return 'Wrong kind of piece';
    if (item.type !== com.req.weaponType) return `Needs a ${WEAPON_TYPES[com.req.weaponType].name}`;
    return item.quality >= com.req.minQuality ? 'Ready to deliver' : `Quality ${item.quality} / ${com.req.minQuality}`;
  }
  if (item.kind !== 'tree') return 'Wrong kind of piece';
  if (item.sp !== com.req.species) return `Needs a ${SPECIES[com.req.species].name}`;
  return item.style >= com.req.minStyle && item.age >= com.req.minAge ? 'Ready to deliver' : `Style ${Math.round(item.style)} / ${com.req.minStyle} · Age ${item.age.toFixed(1)} / ${com.req.minAge.toFixed(1)}`;
}

export function generateOffer(state) {
  const kinds = ['tree', 'weapon'];
  const kind = pick(kinds);
  const buyer = pick(['samurai', 'monk', 'merchant', 'noble', 'oni']);
  const itemType = kind === 'tree' ? pick(['maple', 'pine', 'cherry', 'juniper', 'bamboo']) : pick(['tanto', 'katana', 'wakizashi', 'yumi', 'naginata']);
  const unit = kind === 'tree' ? SPECIES[itemType].base : WEAPON_TYPES[itemType].base;
  const offer = Math.round(unit * (0.9 + Math.random() * 0.95) * (1 + state.rep / 500) / 10) * 10;
  return {
    id: 'off_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
    buyerType: buyer,
    client: pick(BUYER_NAMES[buyer]),
    kind,
    target: itemType,
    offer,
    day: state.day,
    expires: state.day + 3,
  };
}

export function seasonalTag(state) {
  const s = seasonOf(state.day);
  const tags = {
    spring: 'Cherry-viewing prices: bonsai are in high demand.',
    summer: 'Travelers crowd the stalls. Steady, honest prices.',
    autumn: 'Maple season. Bonsai and lacquer fetch a premium.',
    winter: 'The mountain arms itself. Blades command a premium.',
  };
  if (isNight(state.hour)) return tags[s.id] + ' Night bidders favor the uncanny.';
  return tags[s.id];
}

export { fmt };
