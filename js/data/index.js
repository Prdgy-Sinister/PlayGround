/* ============================================================
   Data normalisation + albums
   ============================================================ */
import { F1_DRIVERS, F1_TEAMS, F1_CARS, F1_MOMENTS } from './f1.js';
import { MOTOGP_RIDERS, MOTOGP_TEAMS, MOTOGP_BIKES, MOTOGP_MOMENTS } from './motogp.js';
import { CROSSOVER_CARDS } from './extras.js';
import { kitFor, RARITY, COUNTRIES, ERA_ORDER, SPORTS, TYPE_META, ATTR_LABELS } from './core.js';

let uid = 0;

/* Rarity is driven by the card rating so pack odds, collection filters and
   market values stay consistent with the printed OVR on every card. */
function rarityFor(overall) {
  if (overall >= 98) return 'iconic';
  if (overall >= 95) return 'legendary';
  if (overall >= 91) return 'epic';
  if (overall >= 86) return 'rare';
  return 'common';
}

function normalise(raw, sport, type) {
  const t = raw.type || type;
  const rarity = rarityFor(raw.ovr);
  const stat = {
    speed: raw.sp, skill: raw.sk, consistency: raw.co, racecraft: raw.rc,
  };
  const kit = kitFor(raw.t || raw.n);
  const career = (() => {
    if (t === 'driver' || t === 'rider') {
      return [['World Titles', raw.ti], ['Race Wins', raw.wi], ['Podiums', raw.po], ['Pole Positions', raw.pl]];
    }
    if (t === 'team') {
      return [['World Titles', raw.ti], ['Race Wins', raw.wi], ['Seasons', raw.seasons], ['Legacy', raw.ovr]];
    }
    if (t === 'car' || t === 'bike') {
      return [['Titles', raw.ti], ['Race Wins', raw.wi], ['Seasons', raw.seasons], ['Rating', raw.ovr]];
    }
    return [['Year', raw.yr], ['Legacy', raw.ovr], ['Drama', raw.sp], ['Impact', raw.rc]];
  })();
  return {
    id: raw.i,
    key: `${sport}:${raw.i}`,
    sport,
    type: t,
    name: raw.n,
    country: raw.c || 'GBR',
    team: raw.t || '',
    number: raw.no ?? null,
    era: raw.era || '2020s',
    rarity,
    overall: raw.ovr,
    stats: stat,
    titles: raw.ti ?? 0,
    wins: raw.wi ?? 0,
    podiums: raw.po ?? 0,
    poles: raw.pl ?? 0,
    seasons: raw.seasons ?? null,
    year: raw.yr ?? null,
    years: raw.yrs || '',
    tagline: raw.tag || '',
    bio: raw.bio || '',
    career,
    colors: kit,
    signature: raw.sig ? raw.n : null,
    attrLabels: ATTR_LABELS[t] || ATTR_LABELS.driver,
    sportMeta: SPORTS[sport],
    typeMeta: TYPE_META[t],
    rarityMeta: RARITY[rarity],
    typeLabel: t === 'driver' ? 'Driver' : t === 'rider' ? 'Rider' : t === 'team' ? 'Constructor' : t === 'car' ? 'Formula 1 Car' : t === 'bike' ? 'MotoGP Prototype' : 'Historic Moment',
    searchable: `${raw.n} ${raw.t} ${raw.c} ${raw.era} ${raw.tag || ''} ${TYPE_META[t]?.label || ''}`.toLowerCase(),
  };
}

export const CARDS = [
  ...F1_DRIVERS.map(r => normalise(r, 'f1', 'driver')),
  ...F1_TEAMS.map(r => normalise(r, 'f1', 'team')),
  ...F1_CARS.map(r => normalise(r, 'f1', 'car')),
  ...F1_MOMENTS.map(r => normalise(r, 'f1', 'moment')),
  ...MOTOGP_RIDERS.map(r => normalise(r, 'motogp', 'rider')),
  ...MOTOGP_TEAMS.map(r => normalise(r, 'motogp', 'team')),
  ...MOTOGP_BIKES.map(r => normalise(r, 'motogp', 'bike')),
  ...MOTOGP_MOMENTS.map(r => normalise(r, 'motogp', 'moment')),
  ...CROSSOVER_CARDS.map(r => normalise(r, 'crossover', r.type || 'moment')),
];

export const CARD_MAP = Object.fromEntries(CARDS.map(c => [c.id, c]));
export const CARD_COUNT = CARDS.length;

chartRarity();
function chartRarity() {
  const counts = {};
  for (const c of CARDS) counts[c.rarity] = (counts[c.rarity] || 0) + 1;
  // eslint-disable-next-line no-console
  console.info(`[APEX RUSH] ${CARDS.length} cards`, counts);
}

export const ERA_META = {
  '1970s':{label:'1970s', sub:'The Golden Era', accent:'#f4b35c', accent2:'#7a3f12', years:'1970 — 1979'},
  '1980s':{label:'1980s', sub:'Turbo & Two-Stroke', accent:'#ff5f6d', accent2:'#4b0d14', years:'1980 — 1989'},
  '1990s':{label:'1990s', sub:'The Golden Age', accent:'#8b9bff', accent2:'#161c4d', years:'1990 — 1999'},
  '2000s':{label:'2000s', sub:'The Millennium', accent:'#38e0a0', accent2:'#0b3a2a', years:'2000 — 2009'},
  '2010s':{label:'2010s', sub:'The Hybrid Era', accent:'#35d6ee', accent2:'#08333d', years:'2010 — 2019'},
  '2020s':{label:'2020s', sub:'The New Order', accent:'#f6c453', accent2:'#4a3208', years:'2020 — 2026'},
};

const ALBUM_DEFS = [
  {id:'f1-70s', name:'F1 Golden Era', sport:'f1', era:'1970s', desc:'Ground-effect pioneers, gladiators and the birth of the modern grand prix.'},
  {id:'f1-80s', name:'F1 Turbo Age', sport:'f1', era:'1980s', desc:'1,000 horsepower, qualifying specials and the arrival of Senna and Prost.'},
  {id:'f1-90s', name:'F1 Golden Age', sport:'f1', era:'1990s', desc:'Electronic wizardry, legendary duels and the sport’s most iconic machines.'},
  {id:'f1-00s', name:'F1 Millennium', sport:'f1', era:'2000s', desc:'Ferrari’s dynasty, Alonso’s rise and the fastest cars ever built.'},
  {id:'f1-10s', name:'F1 Hybrid Era', sport:'f1', era:'2010s', desc:'Mercedes dominance, Red Bull brilliance and a new generation of stars.'},
  {id:'f1-20s', name:'F1 Ground Effect', sport:'f1', era:'2020s', desc:'Verstappen’s reign, McLaren’s revival and the most intense grid in years.'},
  {id:'f1-machines', name:'F1 Machines', sport:'f1', types:['car'], desc:'The cars and constructors that shaped Formula 1 history.'},
  {id:'f1-moments', name:'F1 Defining Moments', sport:'f1', types:['moment'], desc:'The races, laps and rivalries that made Formula 1 immortal.'},
  {id:'mgp-70s', name:'MotoGP Two-Stroke Dawn', sport:'motogp', era:'1970s', desc:'Agostini’s kingdom, Sheene’s showmanship and the first global stars.'},
  {id:'mgp-80s', name:'MotoGP American Wave', sport:'motogp', era:'1980s', desc:'Roberts, Spencer and Lawson bring dirt-track daring to Europe.'},
  {id:'mgp-90s', name:'MotoGP 500cc Golden Age', sport:'motogp', era:'1990s', desc:'Rainey vs Schwantz, Doohan’s dynasty and the NSR500 monster.'},
  {id:'mgp-00s', name:'MotoGP The Rossi Era', sport:'motogp', era:'2000s', desc:'The Doctor, the RC211V and the moment MotoGP became global theatre.'},
  {id:'mgp-10s', name:'MotoGP The Márquez Era', sport:'motogp', era:'2010s', desc:'A new Spaniard, impossible saves and a record-breaking title run.'},
  {id:'mgp-20s', name:'MotoGP New Order', sport:'motogp', era:'2020s', desc:'Bagnaia, Martín and Acosta usher in the most competitive era yet.'},
  {id:'mgp-machines', name:'MotoGP Machines', sport:'motogp', types:['bike'], desc:'The prototypes and constructors that defined grand prix motorcycle racing.'},
  {id:'mgp-moments', name:'MotoGP Defining Moments', sport:'motogp', types:['moment'], desc:'Last-lap duels, fairytale titles and the sport’s purest emotions.'},
  {id:'x-icons', name:'Two Worlds', sport:'crossover', desc:'Legends who crossed the divide between two and four wheels.'},
];

export const ALBUMS = ALBUM_DEFS.map(a => {
  let cards;
  if (a.types) cards = CARDS.filter(c => c.sport === a.sport && a.types.includes(c.type));
  else if (a.era) cards = CARDS.filter(c => c.sport === a.sport && c.era === a.era);
  else cards = CARDS.filter(c => c.sport === a.sport);
  const numericEra = a.era ? parseInt(a.era) : 2020;
  const coins = Math.round(cards.length * 210 / 50) * 50;
  const gems = Math.max(30, Math.round(cards.length * 4.5));
  return {
    ...a,
    numericEra,
    cardIds: cards.map(c => c.id),
    count: cards.length,
    reward: {coins, gems},
    accent: a.era ? ERA_META[a.era].accent : a.sport === 'motogp' ? '#22d3ee' : a.sport === 'crossover' ? '#f6c453' : '#ff5f6d',
    accent2: a.era ? ERA_META[a.era].accent2 : a.sport === 'motogp' ? '#062b33' : a.sport === 'crossover' ? '#3a2a07' : '#3a0a0c',
    years: a.era ? ERA_META[a.era].years : 'All Eras',
  };
});

export const ALBUM_MAP = Object.fromEntries(ALBUMS.map(a => [a.id, a]));

export function cardsForAlbum(album) {
  return album.cardIds.map(id => CARD_MAP[id]).filter(Boolean);
}

export function albumSetSections(album) {
  const cards = cardsForAlbum(album);
  const sections = [
    {key:'driver', label:album.sport === 'motogp' ? 'Riders' : 'Drivers', cards:[]},
    {key:'team', label:album.sport === 'motogp' ? 'Teams' : 'Constructors', cards:[]},
    {key:'machine', label:'Machines', cards:[]},
    {key:'moment', label:'Moments', cards:[]},
  ];
  for (const card of cards) {
    if (card.type === 'driver' || card.type === 'rider') sections[0].cards.push(card);
    else if (card.type === 'team') sections[1].cards.push(card);
    else if (card.type === 'car' || card.type === 'bike') sections[2].cards.push(card);
    else sections[3].cards.push(card);
  }
  return sections.filter(s => s.cards.length);
}

export const ICONIC_CARDS = CARDS.filter(c => c.rarity === 'iconic');
export const FEATURED_IDS = ['senna','verstappen','rossi','marquez','schumacher','hamilton'];
export const FEATURED_CARDS = FEATURED_IDS.map(id => CARD_MAP[id]).filter(Boolean);

export function cardValue(card, finish) {
  const base = RARITY[card.rarity]?.sell || 40;
  const mult = {base:1, holo:2.2, gold:3.1, signature:5.5, championship:4.2, anniversary:3.4, numbered:6.5, shadow:2.8}[finish || 'base'] || 1;
  return Math.round(base * mult);
}

export function pullWeight(card) { return card.rarityMeta.odds || 1; }

export { RARITY, SPORTS, ERA_ORDER, COUNTRIES };
