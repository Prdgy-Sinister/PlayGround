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

/* ---------------- live market ----------------
   Prices are a genuinely two-sided, seeded simulation. Four layers combine:

     1. a slow multi-week trend (fixed direction per card — some climb,
        many decay)
     2. short-to-medium waves (the "sentiment" cycle)
     3. a per-day shock, with rare hype spikes for a small subset of cards
     4. an anniversary / race-window event multiplier

   Volatility scales with rarity, grading finish, scarcity and how recently a
   card was released. Every layer is seeded from the card id and the clock, so
   every view agrees without a backend, while values can and do fall hard.
   ------------------------------------------------ */
const DAY = 24 * HOUR;
const RARITY_VOL = { common: .035, rare: .05, epic: .075, legendary: .11, iconic: .16 };
const FINISH_VOL = { base: 1, holo: .92, gold: .88, championship: .86, anniversary: .9, signature: .84, shadow: .8, numbered: .78 };

function unit(seed) { return hash32(String(seed)) / 4294967296; }
function signed(seed) { return unit(seed) * 2 - 1; }

function cardVol(card, finish) {
  const r = RARITY_VOL[card.rarity] || .06;
  const f = FINISH_VOL[finish] ?? 1;
  const capped = (card.exclusive || card.autograph) ? 2.1 : 1;
  const fresh = (card.year === 2026 || /(^|\D)2026(\D|$)/.test(card.years || '')) ? 1.7 : 1;
  const demand = 1 + Math.min(.6, (card.titles || 0) * .06);
  return r * f * capped * fresh * demand;
}

function sentiment(t) {
  return Math.sin(t / 91 + 1.7) * .55 + Math.sin(t / 37 + .3) * .3 + Math.sin(t / 13.7) * .15;
}

/* A fixed per-card drift direction over a multi-week cycle. Roughly half of
   all cards are on a down-trend at any moment — there is no floor bias. */
function trendFactor(card, finish, now) {
  const dir = signed('trend.dir|' + card.id) < 0 ? -1 : 1;
  const strength = .45 + unit('trend.str|' + card.id) * 1.05;
  const cycle = 21 + Math.floor(unit('trend.len|' + card.id) * 16);
  const wave = Math.sin((now / DAY / cycle) * Math.PI * 2 + phase('trend.ph|' + card.id));
  return clamp(1 + dir * strength * cardVol(card, finish) * wave * 1.35, .62, 1.5);
}

function smoothFactor(card, finish, now) {
  const t = now / HOUR;
  const p = phase(card.id + '|' + finish);
  const vol = cardVol(card, finish);
  const wave = Math.sin(t / 11 + p) * .5
    + Math.sin(t / 37 + p * 1.7) * .34
    + Math.sin(t / 97 + p * 2.1) * .24;
  return clamp((1 + wave * vol + sentiment(t) * vol * .4) * trendFactor(card, finish, now), .5, 1.8);
}

/* Daily shocks jump at midnight. A small fraction of card-days get a hype
   spike; capped and limited editions react far more strongly to demand. */
export function dailyShock(card, finish = 'base', now = Date.now()) {
  const day = Math.floor(now / DAY);
  const vol = cardVol(card, finish);
  const drift = signed(`${card.id}|${finish}|shock|${day}`) * vol * 1.25;
  const roll = unit(`${card.id}|hype|${day}`);
  const spike = roll > .965 ? ((roll - .965) / .035) * (1.1 + unit(card.id) * 1.5) * vol * 3.2 : 0;
  return { factor: clamp(1 + drift + spike, .5, 2.5), spiking: spike > .05 };
}

/* Anniversaries and recurring race windows create genuine, dated events. */
export function marketEvents(card, now = Date.now()) {
  const d = new Date(now);
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth() + 1;
  const out = [];
  const sourceYear = card.year || parseInt(String(card.years || '').match(/\d{4}/)?.[0] || '', 10);
  if (sourceYear) {
    const age = year - sourceYear;
    if (age > 0 && age % 25 === 0) out.push({label:`${age}-year title anniversary`, factor:1.18});
    else if (age > 0 && age % 10 === 0) out.push({label:`${age}-year season anniversary`, factor:1.08});
  }
  if (month === 5 && card.sport === 'f1') out.push({label:'Monaco race week', factor:1.06});
  if (month === 7 && card.sport === 'f1') out.push({label:'British GP week', factor:1.05});
  if (month === 9 && card.sport === 'motogp') out.push({label:'Misano race week', factor:1.05});
  if ((card.titles || 0) >= 3 && [5,6,7,9,10].includes(month)) out.push({label:'Champion demand surge', factor:1.04});
  return out;
}

function eventFactor(card, now) {
  return marketEvents(card, now).reduce((f, e) => f * e.factor, 1);
}

function tickFactor(card, finish, now) {
  const bucket = Math.floor(now / 15000);
  const jitter = ((hash32(card.id + '|' + finish + '|' + bucket) % 2000) / 1000) - 1;
  return jitter * cardVol(card, finish) * .4;
}

export function marketFactor(card, finish = 'base', now = Date.now(), opts = {}) {
  const smooth = clamp(
    smoothFactor(card, finish, now) * dailyShock(card, finish, now).factor * eventFactor(card, now) * (opts.circulation != null ? clamp(1 - opts.circulation * .03, .7, 1) : 1),
    .38, 2.6,
  );
  if (opts.smooth) return smooth;
  return clamp(smooth + tickFactor(card, finish, now), .34, 2.9);
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

/* Market indicators surface the reason a price is moving, not just the sign. */
export function marketIndicators(card, finish = 'base', now = Date.now()) {
  const day = changePct(card, finish, now, DAY);
  const out = [];
  out.push(day > 1.5 ? {label:'Rising value', cls:'up'} : day < -1.5 ? {label:'Falling value', cls:'down'} : {label:'Stable value', cls:'flat'});
  if ((card.titles || 0) >= 3 || card.rarity === 'iconic' || unit(card.id + '|demand') > .62) out.push({label:'High demand', cls:'hot'});
  if (card.exclusive || card.autograph || (card.supply && card.supply <= 50)) out.push({label:'Low supply', cls:'rare'});
  if (dailyShock(card, finish, now).spiking) out.push({label:'Market hype', cls:'hype'});
  for (const ev of marketEvents(card, now)) out.push({label:ev.label, cls:'event'});
  return out;
}

export function priceInfo(card, finish = 'base', now = Date.now()) {
  const value = marketValue(card, finish, now);
  const c6 = changePct(card, finish, now, 6 * HOUR);
  const c24 = changePct(card, finish, now, DAY);
  const c7 = changePct(card, finish, now, 7 * DAY);
  const c30 = changePct(card, finish, now, 30 * DAY);
  const spark = [];
  for (let i = 11; i >= 0; i--) spark.push(marketValue(card, finish, now - i * 2 * HOUR, { smooth: true }));
  return {
    raw: cardValue(card, finish),
    value,
    factor: marketFactor(card, finish, now),
    change: c6,
    change24: c24,
    change7: c7,
    change30: c30,
    direction: c24 > .15 ? 'up' : c24 < -.15 ? 'down' : 'flat',
    indicators: marketIndicators(card, finish, now),
    events: marketEvents(card, now),
    spark,
  };
}

/* ---------------- grading ----------------
   Every slab and every display case carries a full condition report. The
   numeric grade is the weighted average of four category scores, and the
   written reason is generated from the categories that actually dragged it
   down — so a bent corner or a dented plaque is visible in the report.
   ------------------------------------------------ */
export const GRADE_LABELS = {
  10: 'Gem Mint', 9: 'Mint', 8: 'Near Mint-Mint', 7: 'Near Mint',
  6: 'Excellent-Mint', 5: 'Excellent', 4: 'Very Good', 3: 'Good',
  2: 'Fair', 1: 'Poor',
};
const GRADE_MULT = { 1: .32, 2: .4, 3: .5, 4: .61, 5: .73, 6: .89, 7: 1.09, 8: 1.46, 9: 2.36, 10: 4.8 };

export const GRADING_PROFILES = {
  card: {
    label: 'Trading card', case: 'slab', caseLabel: 'APEX SLAB',
    categories: [
      {key:'centering', label:'Centering', defects:['off-centre artwork','tilted print registration','wider border on one edge']},
      {key:'corners', label:'Corners', defects:['softened corner tip','dented lower corner','bent corner fibres']},
      {key:'edges', label:'Edges', defects:['edge wear along the right border','bent top edge','chipped white edge']},
      {key:'surface', label:'Surface', defects:['surface scuff near the portrait','print line across the foil','small crease in the card stock']},
    ],
  },
  memorabilia: {
    label: 'Memorabilia', case: 'case', caseLabel: 'APEX DISPLAY CASE',
    categories: [
      {key:'structure', label:'Structure', defects:['slight bend in the mounting plate','small dent on the plaque','shallow crease in the frame']},
      {key:'surface', label:'Surface', defects:['scuffed display surface','fine scratch across the print','faded colour on one panel']},
      {key:'finish', label:'Finish & edges', defects:['edge wear on the outer rim','chipped lacquer spot','torn display tag']},
      {key:'presentation', label:'Presentation', defects:['loose wall mount','clouding inside the acrylic','off-centre display cut']},
    ],
  },
  merchandise: {
    label: 'Merchandise', case: 'case', caseLabel: 'APEX DISPLAY CASE',
    categories: [
      {key:'structure', label:'Structure', defects:['bent visor edge','small dent in the shell','crease across the fabric']},
      {key:'surface', label:'Surface', defects:['scuff on the printed panel','pilling on the sleeve','faint mark on the finish']},
      {key:'finish', label:'Stitching & trim', defects:['loose stitching on the hem','frayed seam','chipped button edge']},
      {key:'presentation', label:'Presentation', defects:['creased hang tag','clouding inside the display case','slightly crushed box corner']},
    ],
  },
};

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
export function gradingProfile(kind = 'card') { return GRADING_PROFILES[kind] || GRADING_PROFILES.card; }

function roundHalf(v) { return Math.round(v * 2) / 2; }
function severityFor(score) {
  if (score >= 9) return 'Faint';
  if (score >= 8) return 'Light';
  if (score >= 7) return 'Noticeable';
  if (score >= 6) return 'Visible';
  return 'Pronounced';
}
function sentence(text) { return text.charAt(0).toUpperCase() + text.slice(1); }
function joinPhrases(parts) {
  if (parts.length <= 1) return parts[0] || '';
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
  return `${parts.slice(0, -1).join(', ')}, and ${parts[parts.length - 1]}`;
}

/* Turn low category scores into the actual language printed on the label. */
export function gradeNotes(score, subgrades = {}, kind = 'card', seed = 0) {
  const profile = gradingProfile(kind);
  const issues = profile.categories
    .map(cat => ({cat, value: Number(subgrades[cat.key])}))
    .filter(x => Number.isFinite(x.value) && x.value < Math.min(9, score + 1))
    .sort((a, b) => a.value - b.value);
  const picked = (score >= 10 ? [] : issues).slice(0, score >= 7 ? 2 : 3);
  if (!picked.length) return {
    notes: [],
    reason: score === 10
      ? 'No visible flaws under a 10× loupe — centering, edges and surface are all effectively perfect.'
      : 'All four categories grade cleanly; only microscopic print variance keeps it from a perfect 10.',
  };
  const notes = picked.map(({cat, value}, i) => {
    const pool = cat.defects;
    const text = pool[hash32(`${cat.key}|${i}|${seed}|${score}`) % pool.length];
    return {category: cat.key, label: cat.label, score: value, text: `${severityFor(value)} ${text}`};
  });
  const phrase = joinPhrases(notes.map(n => n.text.charAt(0).toLowerCase() + n.text.slice(1)));
  return {
    notes,
    reason: `${sentence(phrase)} ${notes.length > 1 ? 'are' : 'is'} the main factor${notes.length > 1 ? 's' : ''} keeping this from a higher grade.`,
  };
}

export function gradeSummary(notes = []) {
  if (!notes.length) return 'Clean report';
  return joinPhrases(notes.slice(0, 2).map(n => n.text));
}

export function rollGrade(subject, serviceId = 'standard', kind = 'card') {
  const svc = gradeService(serviceId);
  const profile = gradingProfile(kind);
  const era = parseInt(subject?.era) || 2020;
  const eraShift = era < 1970 ? -.55 : era < 1990 ? -.3 : era < 2005 ? -.1 : era < 2015 ? .05 : .2;
  const rarityShift = kind === 'card'
    ? (subject?.rarity === 'iconic' ? -.22 : subject?.rarity === 'legendary' ? -.08 : 0)
    : ({standard:.18, rare:.1, epic:0, legendary:-.08, iconic:-.17, museum:-.25}[subject?.rarity] || 0);
  const center = 7.55 + svc.shift + eraShift + rarityShift;
  const rollSub = () => clamp(roundHalf(center + (Math.random() + Math.random() + Math.random() + Math.random() - 2) * 1.22), 1, 10);
  const subgrades = {};
  for (const cat of profile.categories) subgrades[cat.key] = rollSub();
  const avg = profile.categories.reduce((sum, cat) => sum + subgrades[cat.key], 0) / profile.categories.length;
  let score = Math.round(avg);
  if (svc.min) score = Math.max(svc.min, score);
  score = clamp(score, 1, 10);
  const cert = makeCert(subject?.id || subject?.cardId || kind, score, serviceId);
  const report = gradeNotes(score, subgrades, kind, cert);
  return {
    score,
    label: gradeLabel(score),
    subgrades,
    notes: report.notes,
    reason: report.reason,
    summary: gradeSummary(report.notes),
    kind,
    case: profile.case,
    caseLabel: profile.caseLabel,
    cert,
    service: svc.id,
    company: svc.company,
    at: Date.now(),
  };
}

export function makeCert(cardId, score, service = 'standard') {
  const n = hash32(cardId + '|' + score + '|' + service + '|' + Date.now() + '|' + Math.random());
  return 'APX-' + n.toString(36).toUpperCase().padStart(6, '0').slice(0, 7);
}

/* Legacy saves only stored subgrades, so rebuild written reports on hydrate. */
export function normalizeGrading(grading, subject, kind = 'card', seed = 0) {
  if (!grading) return null;
  const obj = typeof grading === 'number' ? {score: grading, service: 'legacy', company: 'APEX'} : {...grading};
  const score = clamp(Math.round(Number(obj.score) || 0), 1, 10);
  if (!score) return null;
  const profile = gradingProfile(obj.kind || kind);
  const subgrades = {};
  profile.categories.forEach((cat, i) => {
    const legacyKeys = ['centering','corners','edges','surface'];
    const raw = obj.subgrades?.[cat.key] ?? obj.subgrades?.[legacyKeys[i]] ?? score - (i % 2);
    subgrades[cat.key] = clamp(roundHalf(Number(raw) || score), 1, 10);
  });
  const report = Array.isArray(obj.notes) && obj.notes.length ? null : gradeNotes(score, subgrades, obj.kind || kind, seed || obj.cert || subject?.id || 'legacy');
  return {
    ...obj,
    score,
    label: obj.label || gradeLabel(score),
    subgrades,
    notes: report ? report.notes : obj.notes,
    reason: obj.reason || report?.reason || gradeSummary(obj.notes || []),
    summary: obj.summary || gradeSummary(report ? report.notes : obj.notes || []),
    kind: obj.kind || kind,
    case: obj.case || profile.case,
    caseLabel: obj.caseLabel || profile.caseLabel,
    company: obj.company || 'APEX',
  };
}

export function gradingFromScore(subject, score, service = 'market', seed = 0, kind = 'card') {
  const s = clamp(Math.round(score), 1, 10);
  const profile = gradingProfile(kind);
  const nudge = (k) => clamp(roundHalf(s + ((hash32(subject.id + k + seed) % 300) / 100 - 1.5) * .8), 1, 10);
  const subgrades = {};
  for (const cat of profile.categories) subgrades[cat.key] = nudge(cat.key[0] + seed);
  const cert = 'APX-' + (hash32(subject.id + '|' + s + '|' + seed) % 2176782336).toString(36).toUpperCase().padStart(6, '0').slice(0, 7);
  const report = gradeNotes(s, subgrades, kind, cert);
  return {
    score: s,
    label: gradeLabel(s),
    subgrades,
    notes: report.notes,
    reason: report.reason,
    summary: gradeSummary(report.notes),
    kind,
    case: profile.case,
    caseLabel: profile.caseLabel,
    cert,
    service,
    company: service === 'market' ? 'APEX' : gradeService(service).company,
    at: Date.now(),
  };
}

export function gradedValue(base, grading) {
  return Math.max(1, Math.round(base * gradeMultiplier(grading?.score || 0)));
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

function moverTable(now, span) {
  return MOVER_POOL.map(card => ({card, change: changePct(card, 'base', now, span)}));
}
export function topMovers(limit = 3, now = Date.now()) {
  return moverTable(now, DAY)
    .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
    .slice(0, limit);
}
export function topGainers(limit = 4, now = Date.now()) {
  return moverTable(now, DAY).sort((a, b) => b.change - a.change).filter(m => m.change > 0).slice(0, limit);
}
export function topLosers(limit = 4, now = Date.now()) {
  return moverTable(now, DAY).sort((a, b) => a.change - b.change).filter(m => m.change < 0).slice(0, limit);
}

export function marketSample(limit = 6, now = Date.now()) {
  return MOVER_POOL.slice(0, limit).map(card => {
    const info = priceInfo(card, 'base', now);
    return {card, value: info.value, change: info.change24, direction: info.direction};
  });
}

/* Historical chart series. `span` is the full window in ms; points are
   sampled evenly so 24h / 7d / 30d charts all work from the same source. */
export function priceSeries(card, finish = 'base', now = Date.now(), points = 24, span = 7 * DAY) {
  const out = [];
  const step = span / Math.max(1, points - 1);
  for (let i = points - 1; i >= 0; i--) {
    const at = now - i * step;
    out.push({at, value: marketValue(card, finish, at, { smooth: true })});
  }
  return out;
}
export function priceHistory(card, finish = 'base', now = Date.now(), points = 14, span = 28 * HOUR) {
  return priceSeries(card, finish, now, points, span).map(p => p.value);
}

export { RARITY };
