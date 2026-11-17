/* ============================================================
   PACKS + ODDS + ECONOMY
   ============================================================ */
import { CARD_MAP } from './index.js';

const P = (cfg) => ({
  cards: 5,
  category: 'featured',
  currency: 'coins',
  ...cfg,
  odds: {common:0, rare:0, epic:0, legendary:0, iconic:0, ...cfg.odds},
});

export const PACKS = [
  P({
    id:'standard', name:'Grid Pack', short:'GRID', tagline:'The perfect place to start your vault.',
    desc:'5 cards from Formula 1 and MotoGP. One new card guaranteed.',
    cost:650, cards:5, scope:'all', category:'featured', guaranteeNew:1,
    odds:{common:60, rare:27, epic:9.5, legendary:2.8, iconic:.7},
    art:{p1:'#ff3b3f',p2:'#3a070b',p3:'rgba(255,90,90,.8)',kicker:'FORMULA 1 × MOTOGP',title:'GRID',title2:'PACK',emblem:'05×',meta:'5 CARDS',meta2:'1 NEW GUARANTEED',cls:'pack-f1'},
  }),
  P({
    id:'f1-standard', name:'F1 Booster', short:'F1', tagline:'Pure Formula 1. Every card from the grid.',
    desc:'5 Formula 1 cards. Build your F1 album faster.',
    cost:600, cards:5, scope:'f1', category:'f1', guaranteeNew:1,
    odds:{common:61, rare:27, epic:9, legendary:2.4, iconic:.6},
    art:{p1:'#e11d2e',p2:'#34040a',p3:'rgba(255,80,80,.8)',kicker:'FORMULA 1',title:'F1',title2:'BOOSTER',emblem:'F1',meta:'5 CARDS',meta2:'F1 ONLY',cls:'pack-f1'},
  }),
  P({
    id:'motogp-standard', name:'MotoGP Booster', short:'MGP', tagline:'Two wheels, zero compromise.',
    desc:'5 MotoGP cards. Build your premier-class album faster.',
    cost:600, cards:5, scope:'motogp', category:'motogp', guaranteeNew:1,
    odds:{common:61, rare:27, epic:9, legendary:2.4, iconic:.6},
    art:{p1:'#12c4dd',p2:'#032e36',p3:'rgba(90,240,255,.8)',kicker:'MOTOGP',title:'MOTO',title2:'BOOSTER',emblem:'GP',meta:'5 CARDS',meta2:'MOTOGP ONLY',cls:'pack-motogp'},
  }),
  P({
    id:'premium', name:'Premium Pack', short:'PREM', tagline:'Higher ceilings. Bigger pulls.',
    desc:'6 cards with boosted Epic and Legendary rates. Ideal for collectors.',
    cost:1400, cards:6, scope:'all', category:'featured', guaranteeNew:1, guarantees:{rare:1},
    odds:{common:30, rare:38, epic:21, legendary:8, iconic:3},
    art:{p1:'#8b5cf6',p2:'#140a2b',p3:'rgba(170,120,255,.75)',kicker:'PREMIUM SERIES',title:'PREMIUM',title2:'PACK',emblem:'06×',meta:'6 CARDS',meta2:'RARE+ GUARANTEED',cls:'pack-legendary'},
  }),
  P({
    id:'f1-premium', name:'F1 Premium', short:'F1+', tagline:'The paddock’s finest, all in red.',
    desc:'6 Formula 1 cards with a guaranteed Rare or better.',
    cost:1300, cards:6, scope:'f1', category:'f1', guaranteeNew:1, guarantees:{rare:1},
    odds:{common:31, rare:38, epic:21, legendary:7, iconic:3},
    art:{p1:'#ff5a36',p2:'#2b0709',p3:'rgba(255,140,80,.75)',kicker:'FORMULA 1 PREMIUM',title:'F1',title2:'PREMIUM',emblem:'F1',meta:'6 CARDS',meta2:'RARE+ GUARANTEED',cls:'pack-f1'},
  }),
  P({
    id:'motogp-premium', name:'MotoGP Premium', short:'GP+', tagline:'Premier-class speed, elevated.',
    desc:'6 MotoGP cards with a guaranteed Rare or better.',
    cost:1300, cards:6, scope:'motogp', category:'motogp', guaranteeNew:1, guarantees:{rare:1},
    odds:{common:31, rare:38, epic:21, legendary:7, iconic:3},
    art:{p1:'#20d3ee',p2:'#04262e',p3:'rgba(80,240,255,.75)',kicker:'MOTOGP PREMIUM',title:'MOTO',title2:'PREMIUM',emblem:'GP',meta:'6 CARDS',meta2:'RARE+ GUARANTEED',cls:'pack-motogp'},
  }),
  P({
    id:'gold', name:'Gold Pack', short:'GOLD', tagline:'Foil finish. Gold-standard pulls.',
    desc:'5 cards, all Rare or better. Boosted Gold Foil finish chance.',
    cost:35, currency:'gems', cards:5, scope:'all', category:'special', guaranteeNew:1, guarantees:{rare:5}, finishBoost:{gold:4, holo:2},
    odds:{common:0, rare:36, epic:35, legendary:22, iconic:7},
    art:{p1:'#f9d976',p2:'#6b4708',p3:'rgba(255,235,160,.9)',kicker:'24K COLLECTOR SERIES',title:'GOLD',title2:'PACK',emblem:'24K',meta:'5 CARDS',meta2:'ALL RARE OR BETTER',cls:'pack-gold'},
  }),
  P({
    id:'f1-gold', name:'F1 Gold Pack', short:'F1G', tagline:'Formula 1, dipped in gold.',
    desc:'5 Formula 1 cards, all Rare or better, with gold finish odds.',
    cost:38, currency:'gems', cards:5, scope:'f1', category:'f1', guaranteeNew:1, guarantees:{rare:5}, finishBoost:{gold:4, holo:2},
    odds:{common:0, rare:36, epic:35, legendary:22, iconic:7},
    art:{p1:'#f9d976',p2:'#5a2d09',p3:'rgba(255,225,140,.9)',kicker:'F1 GOLD SERIES',title:'F1',title2:'GOLD',emblem:'24K',meta:'5 CARDS',meta2:'RARE+ ONLY',cls:'pack-gold'},
  }),
  P({
    id:'motogp-gold', name:'MotoGP Gold Pack', short:'GPG', tagline:'Premier-class gold rush.',
    desc:'5 MotoGP cards, all Rare or better, with gold finish odds.',
    cost:38, currency:'gems', cards:5, scope:'motogp', category:'motogp', guaranteeNew:1, guarantees:{rare:5}, finishBoost:{gold:4, holo:2},
    odds:{common:0, rare:36, epic:35, legendary:22, iconic:7},
    art:{p1:'#ffd77a',p2:'#5e4310',p3:'rgba(255,235,170,.9)',kicker:'MOTOGP GOLD SERIES',title:'MOTO',title2:'GOLD',emblem:'GP',meta:'5 CARDS',meta2:'RARE+ ONLY',cls:'pack-gold'},
  }),
  P({
    id:'legendary', name:'Legendary Pack', short:'LEG', tagline:'Where icons are made.',
    desc:'5 cards, all Epic or better. Legendary pulls are common here.',
    cost:90, currency:'gems', cards:5, scope:'all', category:'special', guaranteeNew:2, guarantees:{epic:5}, finishBoost:{holo:2, gold:2, signature:1.4, numbered:1.5},
    odds:{common:0, rare:0, epic:53, legendary:36, iconic:11},
    art:{p1:'#3b2254',p2:'#080510',p3:'rgba(255,200,90,.65)',kicker:'LEGENDARY SERIES',title:'LEGEND',title2:'PACK',emblem:'★',meta:'5 CARDS',meta2:'EPIC+ ONLY',cls:'pack-legendary'},
  }),
  P({
    id:'championship', name:'Championship Pack', short:'CHAMP', tagline:'Built for titles. Sealed in history.',
    desc:'6 cards, Epic or better. Championship editions and 2 new cards guaranteed.',
    cost:120, currency:'gems', cards:6, scope:'all', category:'special', guaranteeNew:2, guarantees:{epic:6, legendary:1}, finishBoost:{championship:6, anniversary:2, holo:1.5},
    odds:{common:0, rare:0, epic:48, legendary:38, iconic:14},
    art:{p1:'#b8862f',p2:'#1a0f03',p3:'rgba(255,210,120,.8)',kicker:'CHAMPIONSHIP SERIES',title:'CHAMP',title2:'PACK',emblem:'#1',meta:'6 CARDS',meta2:'CHAMPION EDITION ODDS',cls:'pack-gold'},
  }),
  P({
    id:'limited', name:'Limited Edition', short:'LTD', tagline:'Numbered. Serialised. Forever rare.',
    desc:'4 cards, Epic or better. One guaranteed numbered edition.',
    cost:175, currency:'gems', cards:4, scope:'all', category:'special', guaranteeNew:2, guarantees:{epic:4, legendary:1}, guaranteedFinish:'numbered', finishBoost:{numbered:2, signature:2, holo:1.5},
    odds:{common:0, rare:0, epic:42, legendary:38, iconic:20},
    art:{p1:'#6f7bff',p2:'#0a0a2a',p3:'rgba(150,170,255,.7)',kicker:'LIMITED COLLECTOR SERIES',title:'LIMITED',title2:'EDITION',emblem:'/99',meta:'4 CARDS',meta2:'1 NUMBERED GUARANTEED',cls:'pack-iconic'},
  }),
  P({
    id:'iconic', name:'Iconic Vault', short:'ICON', tagline:'The rarest cards in motorsport.',
    desc:'3 cards, Legendary or better. Every pull is a grail.',
    cost:320, currency:'gems', cards:3, scope:'all', category:'special', guaranteeNew:2, guarantees:{legendary:3}, finishBoost:{signature:3, numbered:2, holo:2, gold:2},
    odds:{common:0, rare:0, epic:0, legendary:62, iconic:38},
    art:{p1:'#2a1040',p2:'#05050a',p3:'rgba(255,110,220,.6)',kicker:'THE VAULT',title:'ICONIC',title2:'VAULT',emblem:'∞',meta:'3 CARDS',meta2:'LEGENDARY+ ONLY',cls:'pack-iconic'},
  }),
  P({
    id:'crossover', name:'Crossover Pack', short:'X', tagline:'Two worlds. One pack.',
    desc:'6 cards from both sports, including a guaranteed Crossover legend.',
    cost:900, cards:6, scope:'crossover', category:'special', guaranteeNew:2, guarantees:{rare:1},
    odds:{common:32, rare:36, epic:21, legendary:8, iconic:3},
    art:{p1:'#2d3442',p2:'#08090e',p3:'rgba(255,120,80,.55)',kicker:'FORMULA 1 × MOTOGP',title:'CROSS',title2:'OVER',emblem:'X',meta:'6 CARDS',meta2:'1 CROSSOVER LEGEND',cls:'pack-crossover'},
  }),
  P({
    id:'daily', name:'Daily Pack', short:'FREE', tagline:'A fresh hit of motorsport every day.',
    desc:'3 free cards. Claim once every 24 hours.',
    cost:0, cards:3, scope:'all', category:'daily', guaranteeNew:1, oncePerDay:true,
    odds:{common:66, rare:24, epic:7.5, legendary:2, iconic:.5},
    art:{p1:'#1f2937',p2:'#090c12',p3:'rgba(100,240,200,.5)',kicker:'DAILY DROP',title:'DAILY',title2:'PACK',emblem:'24H',meta:'3 CARDS',meta2:'FREE EVERY DAY',cls:'pack-motogp'},
  }),
];

export const PACK_MAP = Object.fromEntries(PACKS.map(p => [p.id, p]));

/* ----- Pack of the Day (deterministic per date) ----- */
const POTD_TEMPLATES = [
  {base:'premium', name:'Apex Daily Premium', extra:'New card guarantee doubled', bumps:1, discount:.35},
  {base:'gold', name:'Golden Hour', extra:'Gold foil odds doubled', bumps:1, discount:.3},
  {base:'legendary', name:'Legend Vault', extra:'Iconic odds boosted', bumps:1, discount:.25},
  {base:'championship', name:'Title Tuesday', extra:'Championship editions boosted', bumps:1, discount:.3},
  {base:'crossover', name:'Worlds Collide', extra:'Two guaranteed new cards', bumps:1, discount:.25},
  {base:'f1-premium', name:'F1 Power Hour', extra:'F1-only, boosted Epics', bumps:1, discount:.35},
  {base:'motogp-premium', name:'MotoGP Power Hour', extra:'MotoGP-only, boosted Epics', bumps:1, discount:.35},
];

export function dayIndex(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  return Math.floor(diff / 86400000);
}

export function getPackOfTheDay(date = new Date()) {
  const idx = dayIndex(date);
  const tpl = POTD_TEMPLATES[idx % POTD_TEMPLATES.length];
  const base = PACK_MAP[tpl.base];
  const odds = {...base.odds};
  const shift = 2.5 + tpl.bumps;
  const from = Math.min(odds.common, shift);
  odds.common -= from;
  odds.legendary = Math.min(50, odds.legendary + from * .6);
  odds.iconic = Math.min(30, odds.iconic + from * .4);
  const cost = Math.max(1, Math.round(base.cost * (1 - tpl.discount)));
  return {
    ...base,
    id:'potd',
    name: tpl.name,
    desc: `${base.desc} Rotates daily.`,
    cost,
    baseCost: base.cost,
    discount: Math.round(tpl.discount * 100),
    extra: tpl.extra,
    guaranteeNew: Math.min(3, (base.guaranteeNew || 1) + 1),
    odds,
    potd: true,
    art:{...base.art, kicker:'PACK OF THE DAY', meta2: tpl.extra.toUpperCase(), cls: base.art.cls},
  };
}

/* ----- Finish roll tables ----- */
export function finishWeights(pack, card) {
  const w = {
    base: 100,
    holo: card.rarity === 'legendary' || card.rarity === 'iconic' ? 18 : 9,
    gold: card.rarity === 'iconic' ? 10 : 4.5,
    signature: card.signature ? (card.rarity === 'iconic' ? 6 : 2) : 0,
    championship: 2.2,
    anniversary: 1.5,
    numbered: 1.1,
    shadow: 1.2,
  };
  const boost = pack.finishBoost || {};
  for (const [k, v] of Object.entries(boost)) if (w[k] != null) w[k] *= v;
  return w;
}

export const CURRENCY_META = {
  coins:{name:'Coins', icon:'◈', cls:'coin'},
  gems:{name:'Gems', icon:'◆', cls:'gem'},
};

export const SELL_MULTIPLIERS = ['base'];

export function formatNumber(n) {
  if (n == null) return '0';
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0','') + 'M';
  if (n >= 10000) return (n / 1000).toFixed(1).replace('.0','') + 'k';
  return n.toLocaleString('en-US');
}

export { CARD_MAP };
