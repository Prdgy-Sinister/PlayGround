/* ============================================================
   APEX RUSH — live market pricing + card grading
   ------------------------------------------------------------
   Prices are deterministic functions of time, so every view and
   every calculation agrees without a backend. Values drift on a
   short tick (for the live UI) and a slower trend (for the 24h
   movement shown beside every price).
   ============================================================ */
import { CARDS, CARD_MAP, RARITY, cardValue } from './data/index.js';

const HOUR = 3600000;
const TAU = Math.PI * 2;

function hash32(str) {
  let h = 2166136261;
  for (let i = 0; i < String(str).length; i++) {
    h ^= String(str).charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function phase(seed) {
  return (hash32(seed) / 4294967296) * TAU;
}
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

/* ---------------- live market ---------------- */
const RARITY_VOL = { common: .035, rare: .05, epic: .07, legendary: .1, iconic: .14 };
const FINISH_VOL = { base: 1, holo: .92, gold: .88, championship: .86, anniversary: .9, signature: .84, shadow: .8, numbered: .78 };

function sentiment(t) {
  return Math.sin(t / 91 + 1.7) * .55 + Math.sin(t / 37 + .3) * .3 + Math.sin(t / 13.7) * .15;
}

function smoothFactor(card, finish, now) {
  const t = now / HOUR;
  const p = phase(card.id + '|' + finish);
  const vol = (RARITY_VOL[card.rarity] || .06) * (FINISH_VOL[finish] || 1);
  const wave = Math.sin(t / 11 + p) * .45
    + Math.sin(t / 37 + p * 1.7) * .33
    + Math.sin(t / 97 + p * 2.1) * .22;
  return clamp(1 + wave * vol + sentiment(t) * vol * .45, .62, 1.55);
}

function tickFactor(card, finish, now) {
  const bucket = Math.floor(now / 15000);
  const jitter = ((hash32(card.id + '|' + finish + '|' + bucket) % 2000) / 1000) - 1;
  const vol = (RARITY_VOL[card.rarity] || .085) * (FINISH_VOL[finish] || 1);
  return jitter * vol * .45;
}

export function marketFactor(card, finish = 'base', now = Date.now(), opts = {}) {
  const smooth = smoothFactor(card, finish, now);
  if (opts.smooth) return smooth;
  return clamp(smooth + tickFactor(card, finish, now), .52, 1.9);
}

export function marketValue(card, finish = 'base', now = Date.now(), opts = {}) {
  const raw = cardValue(card, finish);
  const factor = marketFactor(card, finish, now, opts);
  const snap = raw < 120 ? 1 : raw < 700 ? 2 : 5;
  return Math.max(5, Math.round(raw * factor / snap) * snap);
}

export function changePct(card, finish = 'base', now = Date.now(), span = 6 * HOUR) {
  const nowVal = marketValue(card, finish, now, { smooth: true });
  const prevVal = marketValue(card, finish, now - span, { smooth: true });
  if (!prevVal) return 0;
  return (nowVal - prevVal) / prevVal * 100;
}

export function priceInfo(card, finish = 'base', now = Date.now()) {
  const value = marketValue(card, finish, now);
  const c6 = changePct(card, finish, now, 6 * HOUR);
  const c24 = changePct(card, finish, now, 24 * HOUR);
  const spark = [];
  for (let i = 11; i >= 0; i--) {
    spark.push(marketValue(card, finish, now - i * 2 * HOUR, { smooth: true }));
  }
  return {
    raw: cardValue(card, finish),
    value,
    factor: marketFactor(card, finish, now),
    change: c6,
    change24: c24,
    direction: c6 > .15 ? 'up' : c6 < -.15 ? 'down' : 'flat',
    spark,
  };
}

/* ---------------- grading ---------------- */
export const GRADE_LABELS = {
  10: 'Gem Mint', 9: 'Mint', 8: 'Near Mint-Mint', 7: 'Near Mint',
  6: 'Excellent-Mint', 5: 'Excellent', 4: 'Very Good', 3: 'Good',
  2: 'Fair', 1: 'Poor',
};
const GRADE_MULT = { 1: .32, 2: .4, 3: .5, 4: .61, 5: .73, 6: .89, 7: 1.09, 8: 1.46, 9: 2.36, 10: 4.8 };

export const GRADING_SERVICES = [
  {
    id: 'standard', name: 'Standard', company: 'APEX', cost: 400, currency: 'coins',
    shift: 0, min: 0, spread: 1.3,
    desc: 'Economical authentication. Wide grading spread — genuine risk of a mid grade.',
  },
  {
    id: 'express', name: 'Express', company: 'APEX', cost: 15, currency: 'gems',
    shift: .55, min: 4, spread: .98,
    desc: 'Priority grading with a friendlier curve. Floors at grade 4.',
  },
  {
    id: 'black', name: 'Black Label', company: 'APEX BLACK', cost: 55, currency: 'gems',
    shift: 1.15, min: 6, spread: .72,
    desc: 'The strictest process, the strongest curve. Never grades below 6.',
  },
];

export function gradeLabel(score) { return GRADE_LABELS[Math.round(Number(score) || 0)] || 'Ungraded'; }
export function gradeMultiplier(score) { return GRADE_MULT[Math.round(Number(score) || 0)] || 1; }
export function gradeTone(score) {
  const s = Math.round(Number(score) || 0);
  if (s >= 10) return '#ff66d8';
  if (s >= 9) return '#3ee08a';
  if (s >= 8) return '#22d3ee';
  if (s >= 7) return '#f6c453';
  if (s >= 5) return '#aab4c5';
  return '#ff6b52';
}
export function gradeService(id) { return GRADING_SERVICES.find(s => s.id === id) || GRADING_SERVICES[0]; }

function roundHalf(v) { return Math.round(v * 2) / 2; }

export function rollGrade(card, serviceId = 'standard') {
  const svc = gradeService(serviceId);
  const era = parseInt(card.era) || 2020;
  const eraShift = era < 1970 ? -.55 : era < 1990 ? -.3 : era < 2005 ? -.1 : era < 2015 ? .05 : .2;
  const rarityShift = card.rarity === 'iconic' ? -.22 : card.rarity === 'legendary' ? -.08 : 0;
  const center = 7.55 + svc.shift + eraShift + rarityShift;
  const rollSub = () => clamp(roundHalf(center + (Math.random() + Math.random() + Math.random() + Math.random() - 2) * 1.22), 1, 10);
  const subgrades = {
    centering: rollSub(), corners: rollSub(), edges: rollSub(), surface: rollSub(),
  };
  const avg = subgrades.centering * .27 + subgrades.corners * .27 + subgrades.edges * .22 + subgrades.surface * .24;
  let score = Math.round(avg);
  if (svc.min) score = Math.max(svc.min, score);
  score = clamp(score, 1, 10);
  return {
    score,
    label: gradeLabel(score),
    subgrades,
    cert: makeCert(card.id, score, serviceId),
    service: svc.id,
    company: svc.company,
    at: Date.now(),
  };
}

export function makeCert(cardId, score, service = 'standard') {
  const n = hash32(cardId + '|' + score + '|' + service + '|' + Date.now() + '|' + Math.random());
  return 'APX-' + n.toString(36).toUpperCase().padStart(6, '0').slice(0, 7);
}

export function gradingFromScore(card, score, service = 'market', seed = 0) {
  const s = clamp(Math.round(score), 1, 10);
  const base = s;
  const nudge = (k) => clamp(roundHalf(base + ((hash32(card.id + k + seed) % 300) / 100 - 1.5) * .8), 1, 10);
  return {
    score: s,
    label: gradeLabel(s),
    subgrades: {
      centering: nudge('c'), corners: nudge('k'), edges: nudge('e'), surface: nudge('s'),
    },
    cert: 'APX-' + (hash32(card.id + '|' + s + '|' + seed) % 2176782336).toString(36).toUpperCase().padStart(6, '0').slice(0, 7),
    service,
    company: service === 'market' ? 'APEX' : gradeService(service).company,
    at: Date.now(),
  };
}

export function itemMarketValue(item, now = Date.now()) {
  if (!item) return 0;
  const card = CARD_MAP[item.cardId];
  if (!card) return 0;
  const base = marketValue(card, item.finish || 'base', now);
  return Math.max(1, Math.round(base * gradeMultiplier(item.grading?.score || 0)));
}

export function itemPriceInfo(item, now = Date.now()) {
  const card = CARD_MAP[item?.cardId];
  if (!card) return null;
  const info = priceInfo(card, item.finish || 'base', now);
  const mult = gradeMultiplier(item.grading?.score || 0);
  return {...info, value: Math.round(info.value * mult), gradeMult: mult};
}

export function gradeForecast(card, finish = 'base', now = Date.now()) {
  const raw = marketValue(card, finish, now);
  return {
    raw,
    rows: [7, 8, 9, 10].map(score => ({
      score, label: gradeLabel(score), multiplier: gradeMultiplier(score),
      value: Math.round(raw * gradeMultiplier(score)),
    })),
  };
}

/* ---------------- market pulse ---------------- */
const INDEX_SAMPLE = CARDS.filter((c, i) => i % 6 === 0);
const MOVER_POOL = CARDS.filter(c => c.rarity === 'iconic' || c.rarity === 'legendary' || c.id === 'senna' || c.id === 'verstappen' || c.id === 'rossi' || c.id === 'marquez' || c.id === 'hamilton');

export function marketIndex(now = Date.now()) {
  const sample = INDEX_SAMPLE.length ? INDEX_SAMPLE : CARDS.slice(0, 60);
  const avgNow = sample.reduce((n, c) => n + marketFactor(c, 'base', now, { smooth: true }), 0) / sample.length;
  const avgPrev = sample.reduce((n, c) => n + marketFactor(c, 'base', now - 24 * HOUR, { smooth: true }), 0) / sample.length;
  const change = (avgNow / avgPrev - 1) * 100;
  return {
    value: Math.round(avgNow * 10000) / 10,
    change,
    direction: change > .15 ? 'up' : change < -.15 ? 'down' : 'flat',
    mood: change > 1 ? 'HOT' : change > .15 ? 'BULL' : change < -1 ? 'COLD' : change < -.15 ? 'BEAR' : 'FLAT',
  };
}

export function topMovers(limit = 3, now = Date.now()) {
  return MOVER_POOL
    .map(card => ({card, change: changePct(card, 'base', now, 6 * HOUR)}))
    .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
    .slice(0, limit);
}

export function marketSample(limit = 6, now = Date.now()) {
  return MOVER_POOL.slice(0, limit).map(card => {
    const info = priceInfo(card, 'base', now);
    return {card, value: info.value, change: info.change, direction: info.direction};
  });
}

export function priceHistory(card, finish = 'base', now = Date.now(), points = 14) {
  const out = [];
  for (let i = points - 1; i >= 0; i--) out.push(marketValue(card, finish, now - i * 2 * HOUR, { smooth: true }));
  return out;
}

export { RARITY };
