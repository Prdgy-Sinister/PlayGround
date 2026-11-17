/* ============================================================
   PACKS + ODDS + ECONOMY
   Every pack has its own pool, guarantees, presentation and
   economy. Categories: featured / f1 / motogp / event / special.
   ============================================================ */

import { exclusiveIdsForPack } from './exclusives.js';
import { HISTORICAL_PACKS } from './seasons.js';

const round2 = v => Math.round((Number(v) || 0) * 100) / 100;

/* The high tiers of older packs are brought in line with the new economy at
   data-definition time, so the published odds are exactly what the roller
   uses. There is no hidden adjustment later. */
function balanceOdds(odds) {
  const o = {...odds};
  if (!(o.common > 0)) return o;
  const cuts = {epic:.55, legendary:.32, iconic:.18};
  let removed = 0;
  for (const k of ['epic', 'legendary', 'iconic']) {
    const before = o[k] || 0;
    o[k] = round2(before * cuts[k]);
    removed += before - o[k];
  }
  o.common = round2((o.common || 0) + removed);
  return o;
}
function normaliseOdds(odds) {
  const o = {...odds};
  const total = Object.values(o).reduce((n, v) => n + (Number(v) || 0), 0);
  if (Math.abs(total - 100) > 0.001) {
    const sink = o.common > 0 ? 'common' : o.rare > 0 ? 'rare' : o.epic > 0 ? 'epic' : 'legendary';
    o[sink] = round2((o[sink] || 0) + (100 - total));
  }
  return o;
}

const P = (cfg) => ({
  cards: 5,
  category: 'featured',
  currency: 'coins',
  theme: 'grid',
  guaranteeNew: 0,
  ...cfg,
  cost: cfg.cost === 0 ? 0 : (cfg.exact ? Math.round(cfg.cost || 0) : Math.round((cfg.cost || 0) * 1.25)),
  odds: normaliseOdds(cfg.balance === false ? {common:0, rare:0, epic:0, legendary:0, iconic:0, ...cfg.odds} : balanceOdds({common:0, rare:0, epic:0, legendary:0, iconic:0, ...cfg.odds})),
});

/* Availability windows are deterministic so events rotate forever without
   a backend. `cycle` days, available while (dayIndex % cycle) is in [from,to). */
const window = (from, to, cycle = 10) => ({cycle, from, to});

export const PACK_CATEGORIES = [
  {id:'all', label:'All packs'},
  {id:'core', label:'Core tiers'},
  {id:'featured', label:'Featured'},
  {id:'f1', label:'Formula 1'},
  {id:'motogp', label:'MotoGP'},
  {id:'exclusive', label:'Exclusive editions'},
  {id:'season', label:'Historical seasons'},
  {id:'event', label:'Event drops'},
  {id:'special', label:'Special editions'},
  {id:'vault', label:'Collector Vault'},
];

export const PACKS = [
  /* ---------------------------------------------------------- CORE TIERS
     The eight public tiers. Prices and per-card odds are exactly as
     published. Guarantees are applied after the roll and disclosed. */
  P({
    id:'mini', name:'Mini Pack', short:'MINI', tagline:'Three cards. One small step into the paddock.',
    desc:'3 cards from Formula 1 and MotoGP. No rarity guarantee — pure published odds.',
    cost:1000, exact:true, balance:false, cards:3, scope:'all', category:'core', guaranteeNew:0, theme:'core',
    odds:{common:65, rare:25, epic:8, legendary:1.8, iconic:.2},
    bullets:['3 cards · no guarantee','Published 65 / 25 / 8 / 1.8 / 0.2 odds','Every card from the full pool'],
    art:{p1:'#9fb4d6',p2:'#0a1220',p3:'rgba(180,210,255,.7)',kicker:'CORE SERIES',title:'MINI',title2:'PACK',emblem:'03×',meta:'3 CARDS',meta2:'NO GUARANTEE',cls:'pack-core'},
  }),
  P({
    id:'standard-tier', name:'Standard Pack', short:'STD', tagline:'The benchmark pack for every collector.',
    desc:'5 cards with the standard published odds. No rarity guarantee.',
    cost:2500, exact:true, balance:false, cards:5, scope:'all', category:'core', guaranteeNew:0, theme:'core',
    odds:{common:78, rare:18, epic:3.5, legendary:.45, iconic:.05},
    bullets:['5 cards · no guarantee','78 / 18 / 3.5 / 0.45 / 0.05 odds','The everyday collector pack'],
    art:{p1:'#ff3b3f',p2:'#2a0609',p3:'rgba(255,90,90,.75)',kicker:'CORE SERIES',title:'STANDARD',title2:'PACK',emblem:'05×',meta:'5 CARDS',meta2:'NO GUARANTEE',cls:'pack-core'},
  }),
  P({
    id:'bronze', name:'Bronze Pack', short:'BRZ', tagline:'The first step up. At least one Rare inside.',
    desc:'5 cards with a guaranteed Rare or better.',
    cost:3500, exact:true, balance:false, cards:5, scope:'all', category:'core', guarantees:{rare:1}, theme:'bronze',
    odds:{common:62, rare:27, epic:9, legendary:1.8, iconic:.2},
    bullets:['5 cards · 1 Rare or better guaranteed','62 / 27 / 9 / 1.8 / 0.2 odds','First step above the baseline'],
    art:{p1:'#c9783a',p2:'#2a1508',p3:'rgba(255,170,100,.75)',kicker:'BRONZE SERIES',title:'BRONZE',title2:'PACK',emblem:'R+',meta:'5 CARDS',meta2:'RARE+ GUARANTEED',cls:'pack-bronze'},
  }),
  P({
    id:'silver', name:'Silver Pack', short:'SLV', tagline:'Brushed metal. Sharper odds.',
    desc:'5 cards with a guaranteed Rare and the published Silver odds.',
    cost:6000, exact:true, balance:false, cards:5, scope:'all', category:'core', guarantees:{rare:1}, theme:'silver',
    odds:{common:55, rare:32, epic:11, legendary:1.8, iconic:.2},
    bullets:['5 cards · 1 Rare or better guaranteed','55 / 32 / 11 / 1.8 / 0.2 odds','Silver-tier pull rates'],
    art:{p1:'#d7e2ee',p2:'#1a2534',p3:'rgba(220,240,255,.7)',kicker:'SILVER SERIES',title:'SILVER',title2:'PACK',emblem:'AG',meta:'5 CARDS',meta2:'RARE+ GUARANTEED',cls:'pack-silver'},
  }),
  P({
    id:'gold-tier', name:'Gold Pack', short:'GLD', tagline:'A seven-card pack with an Epic floor.',
    desc:'7 cards with a guaranteed Epic or better and Gold odds.',
    cost:12000, exact:true, balance:false, cards:7, scope:'all', category:'core', guarantees:{epic:1}, theme:'gold',
    odds:{common:35, rare:40, epic:20, legendary:4.5, iconic:.5},
    bullets:['7 cards · 1 Epic or better guaranteed','35 / 40 / 20 / 4.5 / 0.5 odds','Seven-card Gold value'],
    art:{p1:'#f9d976',p2:'#4a2c06',p3:'rgba(255,225,140,.9)',kicker:'GOLD SERIES',title:'GOLD',title2:'PACK',emblem:'24K',meta:'7 CARDS',meta2:'EPIC+ GUARANTEED',cls:'pack-gold'},
  }),
  P({
    id:'elite-tier', name:'Elite Pack', short:'ELT', tagline:'Eight cards. One Legendary floor.',
    desc:'8 cards with a guaranteed Legendary or better and premium odds.',
    cost:22000, exact:true, balance:false, cards:8, scope:'all', category:'core', guarantees:{legendary:1}, theme:'elite',
    odds:{common:20, rare:40, epic:30, legendary:9, iconic:1},
    bullets:['8 cards · 1 Legendary guaranteed','20 / 40 / 30 / 9 / 1 odds','Elite-tier finish boost'],
    art:{p1:'#b98cff',p2:'#180a2e',p3:'rgba(200,150,255,.8)',kicker:'ELITE SERIES',title:'ELITE',title2:'PACK',emblem:'08×',meta:'8 CARDS',meta2:'LEGENDARY GUARANTEED',cls:'pack-elite'},
  }),
  P({
    id:'ultimate', name:'Ultimate Pack', short:'ULT', tagline:'Ten cards. The Ultimate high-tier chase.',
    desc:'10 cards with a guaranteed Legendary and boosted high-tier odds.',
    cost:40000, exact:true, balance:false, cards:10, scope:'all', category:'core', guarantees:{legendary:1}, theme:'ultimate',
    odds:{common:10, rare:35, epic:35, legendary:18, iconic:2},
    bullets:['10 cards · 1 Legendary guaranteed','10 / 35 / 35 / 18 / 2 odds','Ten-card Ultimate value'],
    art:{p1:'#ff9b52',p2:'#1a0a03',p3:'rgba(255,170,100,.85)',kicker:'ULTIMATE SERIES',title:'ULTIMATE',title2:'PACK',emblem:'10×',meta:'10 CARDS',meta2:'LEGENDARY GUARANTEED',cls:'pack-ultimate'},
  }),
  P({
    id:'mega', name:'Mega Pack', short:'MEGA', tagline:'Fifteen cards. Two Epics guaranteed.',
    desc:'15 cards with two guaranteed Epics. Built for set builders and big swings.',
    cost:60000, exact:true, balance:false, cards:15, scope:'all', category:'core', guarantees:{epic:2}, theme:'mega',
    odds:{common:45, rare:38, epic:13, legendary:3.5, iconic:.5},
    bullets:['15 cards · 2 Epics guaranteed','45 / 38 / 13 / 3.5 / 0.5 odds','Best cards-per-coin tier'],
    art:{p1:'#ff2740',p2:'#1b0306',p3:'rgba(255,90,100,.85)',kicker:'MEGA SERIES',title:'MEGA',title2:'PACK',emblem:'15×',meta:'15 CARDS',meta2:'2 EPICS GUARANTEED',cls:'pack-mega'},
  }),

  /* ---------------------------------------------------------- FEATURED */
  P({
    id:'rookie', name:'Rookie Rush', short:'ROOK', tagline:'Your first laps in the collector’s paddock.',
    desc:'4 cards with a friendly price. A cheap way to grow a brand-new vault.',
    cost:420, cards:4, scope:'all', category:'featured', guaranteeNew:1, theme:'rookie',
    odds:{common:70, rare:23, epic:5.4, legendary:1.4, iconic:.2},
    bullets:['4 cards · 1 new guaranteed','Best value per card','High chance of Rare+'],
    art:{p1:'#3f6dff',p2:'#0b1230',p3:'rgba(120,170,255,.8)',kicker:'ROOKIE SERIES',title:'ROOKIE',title2:'RUSH',emblem:'04×',meta:'4 CARDS',meta2:'1 NEW GUARANTEED',cls:'pack-f1'},
  }),
  P({
    id:'standard', name:'Grid Pack', short:'GRID', tagline:'The perfect place to start your vault.',
    desc:'5 cards from Formula 1 and MotoGP. One new card guaranteed.',
    cost:650, cards:5, scope:'all', category:'featured', guaranteeNew:1, featured:true, theme:'grid',
    odds:{common:60, rare:27, epic:9.5, legendary:2.8, iconic:.7},
    bullets:['5 cards · 1 new guaranteed','Both sports, all eras','Every card from the full pool'],
    art:{p1:'#ff3b3f',p2:'#3a070b',p3:'rgba(255,90,90,.8)',kicker:'FORMULA 1 × MOTOGP',title:'GRID',title2:'PACK',emblem:'05×',meta:'5 CARDS',meta2:'1 NEW GUARANTEED',cls:'pack-f1'},
  }),
  P({
    id:'scavenger', name:'Paddock Scavenger', short:'SCAV', tagline:'Built for set builders. Duplicates stay out of your way.',
    desc:'6 cards with three duplicate-protected slots. Fill the gaps in your albums.',
    cost:950, cards:6, scope:'all', category:'featured', guaranteeNew:1, protectDupes:3, theme:'scavenger',
    odds:{common:45, rare:35, epic:14, legendary:5, iconic:1},
    bullets:['6 cards · 3 duplicate-protected','1 new card guaranteed','Boosted Rare+ rate'],
    art:{p1:'#19b486',p2:'#052c23',p3:'rgba(90,255,200,.7)',kicker:'SET BUILDER SERIES',title:'PADDOCK',title2:'SCAVENGER',emblem:'3×',meta:'6 CARDS',meta2:'3 DUPES PROTECTED',cls:'pack-motogp'},
  }),
  P({
    id:'premium', name:'Premium Pack', short:'PREM', tagline:'Higher ceilings. Bigger pulls.',
    desc:'6 cards with boosted Epic and Legendary rates. Ideal for collectors.',
    cost:1400, cards:6, scope:'all', category:'featured', guaranteeNew:1, guarantees:{rare:1}, featured:true, theme:'premium',
    odds:{common:30, rare:38, epic:21, legendary:8, iconic:3},
    bullets:['6 cards · Rare or better guaranteed','Boosted Epic and Legendary odds','1 new card guaranteed'],
    art:{p1:'#8b5cf6',p2:'#140a2b',p3:'rgba(170,120,255,.75)',kicker:'PREMIUM SERIES',title:'PREMIUM',title2:'PACK',emblem:'06×',meta:'6 CARDS',meta2:'RARE+ GUARANTEED',cls:'pack-legendary'},
  }),
  P({
    id:'elite', name:'Elite Series', short:'ELITE', tagline:'The paddock’s private reserve.',
    desc:'7 cards with an Epic guaranteed, three new cards and premium finish odds.',
    cost:2800, cards:7, scope:'all', category:'featured', guaranteeNew:3, guarantees:{rare:7, epic:1}, finishBoost:{holo:2, gold:2, signature:1.4}, theme:'elite',
    odds:{common:18, rare:34, epic:28, legendary:14, iconic:6},
    bullets:['7 cards · Epic or better guaranteed','3 new cards guaranteed','Every card Rare or better'],
    art:{p1:'#f0b25c',p2:'#2a1405',p3:'rgba(255,210,130,.8)',kicker:'ELITE COLLECTOR SERIES',title:'ELITE',title2:'SERIES',emblem:'07×',meta:'7 CARDS',meta2:'EPIC+ & 3 NEW',cls:'pack-gold'},
  }),

  /* ---------------------------------------------------------- FORMULA 1 */
  P({
    id:'f1-standard', name:'F1 Booster', short:'F1', tagline:'Pure Formula 1. Every card from the grid.',
    desc:'5 Formula 1 cards. Build your F1 album faster.',
    cost:600, cards:5, scope:'f1', category:'f1', guaranteeNew:1, theme:'f1',
    odds:{common:61, rare:27, epic:9, legendary:2.4, iconic:.6},
    bullets:['Formula 1 cards only','5 cards · 1 new guaranteed','Covers every F1 era'],
    art:{p1:'#e11d2e',p2:'#34040a',p3:'rgba(255,80,80,.8)',kicker:'FORMULA 1',title:'F1',title2:'BOOSTER',emblem:'F1',meta:'5 CARDS',meta2:'F1 ONLY',cls:'pack-f1'},
  }),
  P({
    id:'f1-quali', name:'F1 Qualifying Pack', short:'QUALI', tagline:'One lap. One shot. Maximum shine.',
    desc:'4 Formula 1 cards with a guaranteed Rare and doubled Holographic odds.',
    cost:480, cards:4, scope:'f1', category:'f1', guaranteeNew:1, guarantees:{rare:1}, finishBoost:{holo:2.2}, theme:'f1',
    odds:{common:62, rare:27, epic:8.4, legendary:2.1, iconic:.5},
    bullets:['4 cards · Rare or better guaranteed','Double Holo finish chance','F1-only pool'],
    art:{p1:'#ff2740',p2:'#2b0509',p3:'rgba(255,90,110,.85)',kicker:'QUALIFYING SERIES',title:'QUALI',title2:'PACK',emblem:'Q3',meta:'4 CARDS',meta2:'RARE+ GUARANTEED',cls:'pack-f1'},
  }),
  P({
    id:'f1-premium', name:'F1 Premium', short:'F1+', tagline:'The paddock’s finest, all in red.',
    desc:'6 Formula 1 cards with a guaranteed Rare or better.',
    cost:1300, cards:6, scope:'f1', category:'f1', guaranteeNew:1, guarantees:{rare:1}, theme:'f1',
    odds:{common:31, rare:38, epic:21, legendary:7, iconic:3},
    bullets:['6 cards · Rare or better guaranteed','Boosted Epic and Legendary odds','F1-only pool'],
    art:{p1:'#ff5a36',p2:'#2b0709',p3:'rgba(255,140,80,.75)',kicker:'FORMULA 1 PREMIUM',title:'F1',title2:'PREMIUM',emblem:'F1',meta:'6 CARDS',meta2:'RARE+ GUARANTEED',cls:'pack-f1'},
  }),
  P({
    id:'f1-podium', name:'F1 Podium Pack', short:'POD', tagline:'Champagne odds. Championship finishes.',
    desc:'6 Formula 1 cards with an Epic guaranteed and boosted Championship editions.',
    cost:1800, cards:6, scope:'f1', category:'f1', guaranteeNew:1, guarantees:{rare:6, epic:1}, finishBoost:{championship:4, anniversary:2, gold:1.6}, theme:'elite',
    odds:{common:22, rare:38, epic:25, legendary:11, iconic:4},
    bullets:['6 cards · Epic or better guaranteed','Championship finish odds ×4','Every card Rare or better'],
    art:{p1:'#f2b24a',p2:'#2c1204',p3:'rgba(255,205,120,.8)',kicker:'PODIUM SERIES',title:'PODIUM',title2:'PACK',emblem:'P1',meta:'6 CARDS',meta2:'EPIC+ GUARANTEED',cls:'pack-gold'},
  }),
  P({
    id:'f1-constructors', name:'Constructors Pack', short:'TEAM', tagline:'The garages, the geniuses, the machines.',
    desc:'5 cards drawn only from F1 constructors and cars, with a Rare guaranteed.',
    cost:1150, cards:5, scope:'f1', category:'f1', guaranteeNew:1, guarantees:{rare:1}, pool:{types:['team','car']}, theme:'f1',
    odds:{common:34, rare:36, epic:20, legendary:7.5, iconic:2.5},
    bullets:['Constructors and cars only','5 cards · Rare or better guaranteed','Build the F1 Machines album'],
    art:{p1:'#2f61ff',p2:'#07122e',p3:'rgba(110,160,255,.75)',kicker:'CONSTRUCTORS SERIES',title:'TEAMS',title2:'& MACHINES',emblem:'⬢',meta:'5 CARDS',meta2:'TEAMS + CARS ONLY',cls:'pack-f1'},
  }),
  P({
    id:'f1-gold', name:'F1 Gold Pack', short:'F1G', tagline:'Formula 1, dipped in gold.',
    desc:'5 Formula 1 cards, all Rare or better, with gold finish odds.',
    cost:38, currency:'gems', cards:5, scope:'f1', category:'f1', guaranteeNew:1, guarantees:{rare:5}, finishBoost:{gold:4, holo:2}, theme:'gold',
    odds:{common:0, rare:36, epic:35, legendary:22, iconic:7},
    bullets:['5 cards · all Rare or better','Gold Foil odds ×4','F1-only pool'],
    art:{p1:'#f9d976',p2:'#5a2d09',p3:'rgba(255,225,140,.9)',kicker:'F1 GOLD SERIES',title:'F1',title2:'GOLD',emblem:'24K',meta:'5 CARDS',meta2:'RARE+ ONLY',cls:'pack-gold'},
  }),
  P({
    id:'f1-legend', name:'F1 Legend Vault', short:'F1★', tagline:'Only the names that changed the sport.',
    desc:'3 Formula 1 cards, all Legendary or better. Iconic odds boosted.',
    cost:160, currency:'gems', cards:3, scope:'f1', category:'f1', guaranteeNew:2, guarantees:{legendary:3}, finishBoost:{signature:2.4, numbered:1.8, gold:1.8}, theme:'legend',
    odds:{common:0, rare:0, epic:0, legendary:62, iconic:38},
    bullets:['3 cards · Legendary or better','Iconic odds boosted','2 new cards guaranteed'],
    art:{p1:'#2a1040',p2:'#05050a',p3:'rgba(255,170,90,.6)',kicker:'F1 LEGEND VAULT',title:'F1',title2:'LEGEND',emblem:'★',meta:'3 CARDS',meta2:'LEGENDARY+ ONLY',cls:'pack-legendary'},
  }),

  /* ---------------------------------------------------------- MOTOGP */
  P({
    id:'motogp-standard', name:'MotoGP Booster', short:'MGP', tagline:'Two wheels, zero compromise.',
    desc:'5 MotoGP cards. Build your premier-class album faster.',
    cost:600, cards:5, scope:'motogp', category:'motogp', guaranteeNew:1, theme:'motogp',
    odds:{common:61, rare:27, epic:9, legendary:2.4, iconic:.6},
    bullets:['MotoGP cards only','5 cards · 1 new guaranteed','Covers every GP era'],
    art:{p1:'#12c4dd',p2:'#032e36',p3:'rgba(90,240,255,.8)',kicker:'MOTOGP',title:'MOTO',title2:'BOOSTER',emblem:'GP',meta:'5 CARDS',meta2:'MOTOGP ONLY',cls:'pack-motogp'},
  }),
  P({
    id:'motogp-poles', name:'MotoGP Pole Pack', short:'POLE', tagline:'The fastest lap is the one that counts.',
    desc:'4 MotoGP cards with a guaranteed Rare and doubled Signature odds.',
    cost:480, cards:4, scope:'motogp', category:'motogp', guaranteeNew:1, guarantees:{rare:1}, finishBoost:{signature:3, holo:2}, theme:'motogp',
    odds:{common:62, rare:27, epic:8.4, legendary:2.1, iconic:.5},
    bullets:['4 cards · Rare or better guaranteed','Triple Signature finish chance','MotoGP-only pool'],
    art:{p1:'#19d3ee',p2:'#03252d',p3:'rgba(110,245,255,.85)',kicker:'POLE POSITION SERIES',title:'POLE',title2:'PACK',emblem:'P1',meta:'4 CARDS',meta2:'SIGNATURE ODDS',cls:'pack-motogp'},
  }),
  P({
    id:'motogp-premium', name:'MotoGP Premium', short:'GP+', tagline:'Premier-class speed, elevated.',
    desc:'6 MotoGP cards with a guaranteed Rare or better.',
    cost:1300, cards:6, scope:'motogp', category:'motogp', guaranteeNew:1, guarantees:{rare:1}, theme:'motogp',
    odds:{common:31, rare:38, epic:21, legendary:7, iconic:3},
    bullets:['6 cards · Rare or better guaranteed','Boosted Epic and Legendary odds','MotoGP-only pool'],
    art:{p1:'#20d3ee',p2:'#04262e',p3:'rgba(80,240,255,.75)',kicker:'MOTOGP PREMIUM',title:'MOTO',title2:'PREMIUM',emblem:'GP',meta:'6 CARDS',meta2:'RARE+ GUARANTEED',cls:'pack-motogp'},
  }),
  P({
    id:'motogp-podium', name:'MotoGP Podium Pack', short:'POD', tagline:'Elbows out. Champagne in.',
    desc:'6 MotoGP cards with an Epic guaranteed and boosted Championship editions.',
    cost:1800, cards:6, scope:'motogp', category:'motogp', guaranteeNew:1, guarantees:{rare:6, epic:1}, finishBoost:{championship:4, anniversary:2, gold:1.6}, theme:'elite',
    odds:{common:22, rare:38, epic:25, legendary:11, iconic:4},
    bullets:['6 cards · Epic or better guaranteed','Championship finish odds ×4','Every card Rare or better'],
    art:{p1:'#22d3ee',p2:'#042832',p3:'rgba(120,250,255,.85)',kicker:'PODIUM SERIES',title:'MOTO',title2:'PODIUM',emblem:'P1',meta:'6 CARDS',meta2:'EPIC+ GUARANTEED',cls:'pack-motogp'},
  }),
  P({
    id:'motogp-machines', name:'Prototype Pack', short:'PROTO', tagline:'Bikes, factories and engineering war.',
    desc:'5 cards drawn only from MotoGP teams and prototype bikes, with a Rare guaranteed.',
    cost:1150, cards:5, scope:'motogp', category:'motogp', guaranteeNew:1, guarantees:{rare:1}, pool:{types:['team','bike']}, theme:'motogp',
    odds:{common:34, rare:36, epic:20, legendary:7.5, iconic:2.5},
    bullets:['Teams and prototypes only','5 cards · Rare or better guaranteed','Build the MotoGP Machines album'],
    art:{p1:'#1d78ff',p2:'#071a33',p3:'rgba(100,180,255,.75)',kicker:'PROTOTYPE SERIES',title:'PROTO',title2:'PACK',emblem:'◮',meta:'5 CARDS',meta2:'BIKES + TEAMS ONLY',cls:'pack-motogp'},
  }),
  P({
    id:'motogp-gold', name:'MotoGP Gold Pack', short:'GPG', tagline:'Premier-class gold rush.',
    desc:'5 MotoGP cards, all Rare or better, with gold finish odds.',
    cost:38, currency:'gems', cards:5, scope:'motogp', category:'motogp', guaranteeNew:1, guarantees:{rare:5}, finishBoost:{gold:4, holo:2}, theme:'gold',
    odds:{common:0, rare:36, epic:35, legendary:22, iconic:7},
    bullets:['5 cards · all Rare or better','Gold Foil odds ×4','MotoGP-only pool'],
    art:{p1:'#ffd77a',p2:'#5e4310',p3:'rgba(255,235,170,.9)',kicker:'MOTOGP GOLD SERIES',title:'MOTO',title2:'GOLD',emblem:'GP',meta:'5 CARDS',meta2:'RARE+ ONLY',cls:'pack-gold'},
  }),
  P({
    id:'motogp-legend', name:'MotoGP Legend Vault', short:'GP★', tagline:'The greatest riders ever to lean it in.',
    desc:'3 MotoGP cards, all Legendary or better. Iconic odds boosted.',
    cost:160, currency:'gems', cards:3, scope:'motogp', category:'motogp', guaranteeNew:2, guarantees:{legendary:3}, finishBoost:{signature:2.6, numbered:1.8, gold:1.8}, theme:'legend',
    odds:{common:0, rare:0, epic:0, legendary:62, iconic:38},
    bullets:['3 cards · Legendary or better','Iconic odds boosted','2 new cards guaranteed'],
    art:{p1:'#162a4a',p2:'#05070d',p3:'rgba(120,230,255,.55)',kicker:'MOTOGP LEGEND VAULT',title:'MOTO',title2:'LEGEND',emblem:'★',meta:'3 CARDS',meta2:'LEGENDARY+ ONLY',cls:'pack-legendary'},
  }),

  /* ---------------------------------------------------------- EVENT DROPS */
  P({
    id:'event-opener', name:'Season Opener', short:'R1', tagline:'Lights out on a brand-new season.',
    desc:'5 cards from both paddocks, with boosted Epic odds while the season gets underway.',
    cost:750, cards:5, scope:'all', category:'event', guaranteeNew:2, theme:'event', event:window(0,5),
    odds:{common:45, rare:33, epic:15, legendary:5.5, iconic:1.5},
    bullets:['5 cards · 2 new guaranteed','Boosted Epic odds','Limited-time event pack'],
    art:{p1:'#ff3b3f',p2:'#1b0608',p3:'rgba(255,140,90,.8)',kicker:'EVENT · SEASON OPENER',title:'SEASON',title2:'OPENER',emblem:'R1',meta:'5 CARDS',meta2:'2 NEW GUARANTEED',cls:'pack-f1'},
  }),
  P({
    id:'event-monaco', name:'Monaco Grand Prix', short:'MON', tagline:'The crown jewel. The harbour. The history.',
    desc:'5 Formula 1 cards with an Epic guaranteed and Monaco-grade finish odds.',
    cost:55, currency:'gems', cards:5, scope:'f1', category:'event', guaranteeNew:2, guarantees:{rare:5, epic:1}, finishBoost:{gold:2.4, championship:2, holo:1.8}, theme:'event', event:window(2,7),
    odds:{common:20, rare:38, epic:27, legendary:11, iconic:4},
    bullets:['5 cards · Epic or better guaranteed','Gold and Championship odds boosted','Limited-time Monaco event'],
    art:{p1:'#f6c453',p2:'#1d1405',p3:'rgba(255,230,160,.85)',kicker:'EVENT · MONACO GP',title:'MONACO',title2:'GRAND PRIX',emblem:'MC',meta:'5 CARDS',meta2:'EPIC+ GUARANTEED',cls:'pack-gold'},
  }),
  P({
    id:'event-mugello', name:'Mugello GP', short:'MUG', tagline:'Italy’s cathedral of speed.',
    desc:'5 MotoGP cards with an Epic guaranteed and boosted Signature odds.',
    cost:55, currency:'gems', cards:5, scope:'motogp', category:'event', guaranteeNew:2, guarantees:{rare:5, epic:1}, finishBoost:{signature:2.6, gold:2, holo:1.8}, theme:'event', event:window(4,9),
    odds:{common:20, rare:38, epic:27, legendary:11, iconic:4},
    bullets:['5 cards · Epic or better guaranteed','Signature odds boosted','Limited-time Mugello event'],
    art:{p1:'#22d3ee',p2:'#04242c',p3:'rgba(130,250,255,.85)',kicker:'EVENT · MUGELLO GP',title:'MUGELLO',title2:'GRAND PRIX',emblem:'IT',meta:'5 CARDS',meta2:'EPIC+ GUARANTEED',cls:'pack-motogp'},
  }),
  P({
    id:'event-nightrace', name:'Night Race', short:'NIGHT', tagline:'Floodlights, sparks and blackout finishes.',
    desc:'6 cards with boosted Blackout editions and a guaranteed Rare or better.',
    cost:1600, cards:6, scope:'all', category:'event', guaranteeNew:2, guarantees:{rare:1}, finishBoost:{shadow:5, holo:2.2, numbered:1.8}, theme:'night', event:window(6,10),
    odds:{common:28, rare:36, epic:23, legendary:9.5, iconic:3.5},
    bullets:['6 cards · Rare or better guaranteed','Blackout edition odds ×5','Limited-time night event'],
    art:{p1:'#5a6cff',p2:'#05061a',p3:'rgba(140,160,255,.7)',kicker:'EVENT · NIGHT RACE',title:'NIGHT',title2:'RACE',emblem:'Nº',meta:'6 CARDS',meta2:'BLACKOUT ODDS',cls:'pack-iconic'},
  }),
  P({
    id:'event-finale', name:'Championship Finale', short:'FIN', tagline:'One race. Every title on the line.',
    desc:'6 cards, all Epic or better, with a guaranteed Legendary and Championship finishes.',
    cost:220, currency:'gems', cards:6, scope:'all', category:'event', guaranteeNew:3, guarantees:{epic:6, legendary:1}, finishBoost:{championship:6, anniversary:2.4, numbered:1.5}, theme:'legend', event:window(8,3),
    odds:{common:0, rare:0, epic:46, legendary:38, iconic:16},
    bullets:['6 cards · Legendary guaranteed','All cards Epic or better','Championship finish odds ×6'],
    art:{p1:'#f6c453',p2:'#160e03',p3:'rgba(255,220,120,.85)',kicker:'EVENT · FINALE',title:'CHAMPION',title2:'FINALE',emblem:'#1',meta:'6 CARDS',meta2:'LEGENDARY GUARANTEED',cls:'pack-gold'},
  }),
  P({
    id:'event-heritage', name:'Heritage Weekend', short:'HIST', tagline:'Where the legends were forged.',
    desc:'5 cards from the 1960s to the 1990s, with a guaranteed Rare or better.',
    cost:45, currency:'gems', cards:5, scope:'all', category:'event', guaranteeNew:2, guarantees:{rare:5}, pool:{eras:['1960s','1970s','1980s','1990s']}, theme:'heritage', event:window(1,6),
    odds:{common:35, rare:38, epic:19, legendary:6.5, iconic:1.5},
    bullets:['1960s–1990s cards only','5 cards · Rare or better guaranteed','Limited-time heritage event'],
    art:{p1:'#b47a3c',p2:'#1a0f05',p3:'rgba(240,190,120,.75)',kicker:'EVENT · HERITAGE',title:'HERITAGE',title2:'WEEKEND',emblem:'H',meta:'5 CARDS',meta2:'CLASSIC ERA ONLY',cls:'pack-gold'},
  }),

  /* ---------------------------------------------------------- SPECIAL */
  P({
    id:'gold', name:'Gold Pack', short:'GOLD', tagline:'Foil finish. Gold-standard pulls.',
    desc:'5 cards, all Rare or better. Boosted Gold Foil finish chance.',
    cost:35, currency:'gems', cards:5, scope:'all', category:'special', guaranteeNew:1, guarantees:{rare:5}, finishBoost:{gold:4, holo:2}, theme:'gold',
    odds:{common:0, rare:36, epic:35, legendary:22, iconic:7},
    bullets:['5 cards · all Rare or better','Gold Foil odds ×4','1 new card guaranteed'],
    art:{p1:'#f9d976',p2:'#6b4708',p3:'rgba(255,235,160,.9)',kicker:'24K COLLECTOR SERIES',title:'GOLD',title2:'PACK',emblem:'24K',meta:'5 CARDS',meta2:'ALL RARE OR BETTER',cls:'pack-gold'},
  }),
  P({
    id:'legendary', name:'Legendary Pack', short:'LEG', tagline:'Where icons are made.',
    desc:'5 cards, all Epic or better. Legendary pulls are common here.',
    cost:90, currency:'gems', cards:5, scope:'all', category:'special', guaranteeNew:2, guarantees:{epic:5}, finishBoost:{holo:2, gold:2, signature:1.4, numbered:1.5}, theme:'legend',
    odds:{common:0, rare:0, epic:53, legendary:36, iconic:11},
    bullets:['5 cards · all Epic or better','2 new cards guaranteed','Legendary finish odds boosted'],
    art:{p1:'#3b2254',p2:'#080510',p3:'rgba(255,200,90,.65)',kicker:'LEGENDARY SERIES',title:'LEGEND',title2:'PACK',emblem:'★',meta:'5 CARDS',meta2:'EPIC+ ONLY',cls:'pack-legendary'},
  }),
  P({
    id:'championship', name:'Championship Pack', short:'CHAMP', tagline:'Built for titles. Sealed in history.',
    desc:'6 cards, Epic or better. Championship editions and 2 new cards guaranteed, with a 15% chance of a capped Championship Winning exclusive.',
    cost:120, currency:'gems', cards:6, scope:'all', category:'special', guaranteeNew:2, guarantees:{epic:6, legendary:1}, exclusiveChance:.15, autographs:{chance:.02}, finishBoost:{championship:6, anniversary:2, holo:1.5}, theme:'gold',
    odds:{common:0, rare:0, epic:48, legendary:38, iconic:14},
    bullets:['6 cards · Legendary guaranteed','15% capped Championship Winning exclusive','Championship finish odds ×6','2 new cards guaranteed'],
    art:{p1:'#b8862f',p2:'#1a0f03',p3:'rgba(255,210,120,.8)',kicker:'CHAMPIONSHIP SERIES',title:'CHAMP',title2:'PACK',emblem:'#1',meta:'6 CARDS',meta2:'CHAMPION EDITION ODDS',cls:'pack-gold'},
  }),
  P({
    id:'limited', name:'Limited Edition', short:'LTD', tagline:'Numbered. Serialised. Forever rare.',
    desc:'4 cards, Epic or better. One guaranteed numbered edition.',
    cost:175, currency:'gems', cards:4, scope:'all', category:'special', guaranteeNew:2, guarantees:{epic:4, legendary:1}, guaranteedFinish:'numbered', autographs:{chance:.02}, finishBoost:{numbered:2, signature:2, holo:1.5}, theme:'limited',
    odds:{common:0, rare:0, epic:42, legendary:38, iconic:20},
    bullets:['4 cards · Legendary guaranteed','1 serialised Limited edition','2 new cards guaranteed'],
    art:{p1:'#6f7bff',p2:'#0a0a2a',p3:'rgba(150,170,255,.7)',kicker:'LIMITED COLLECTOR SERIES',title:'LIMITED',title2:'EDITION',emblem:'/99',meta:'4 CARDS',meta2:'1 NUMBERED GUARANTEED',cls:'pack-iconic'},
  }),
  P({
    id:'iconic', name:'Iconic Vault', short:'ICON', tagline:'The rarest cards in motorsport.',
    desc:'3 cards, Legendary or better. Every pull is a grail.',
    cost:320, currency:'gems', cards:3, scope:'all', category:'special', guaranteeNew:2, guarantees:{legendary:3}, finishBoost:{signature:3, numbered:2, holo:2, gold:2}, theme:'iconic',
    odds:{common:0, rare:0, epic:0, legendary:62, iconic:38},
    bullets:['3 cards · Legendary or better','Every slot a grail','2 new cards guaranteed'],
    art:{p1:'#2a1040',p2:'#05050a',p3:'rgba(255,110,220,.6)',kicker:'THE VAULT',title:'ICONIC',title2:'VAULT',emblem:'∞',meta:'3 CARDS',meta2:'LEGENDARY+ ONLY',cls:'pack-iconic'},
  }),
  P({
    id:'crossover', name:'Crossover Pack', short:'X', tagline:'Two worlds. One pack.',
    desc:'6 cards from both sports, including a guaranteed Crossover legend.',
    cost:900, cards:6, scope:'crossover', category:'special', guaranteeNew:2, guarantees:{rare:1}, theme:'crossover',
    odds:{common:32, rare:36, epic:21, legendary:8, iconic:3},
    bullets:['6 cards · 1 Crossover legend','2 new cards guaranteed','Both paddocks in one pack'],
    art:{p1:'#2d3442',p2:'#08090e',p3:'rgba(255,120,80,.55)',kicker:'FORMULA 1 × MOTOGP',title:'CROSS',title2:'OVER',emblem:'X',meta:'6 CARDS',meta2:'1 CROSSOVER LEGEND',cls:'pack-crossover'},
  }),
  P({
    id:'heritage', name:'Heritage Pack', short:'HIST', tagline:'Seven decades of speed, sealed in one pack.',
    desc:'5 cards drawn only from the 1960s to the 1990s. Guaranteed Rare or better.',
    cost:55, currency:'gems', cards:5, scope:'all', category:'special', guaranteeNew:2, guarantees:{rare:5}, pool:{eras:['1960s','1970s','1980s','1990s']}, finishBoost:{anniversary:3, holo:1.8}, theme:'heritage',
    odds:{common:25, rare:42, epic:24, legendary:7.5, iconic:1.5},
    bullets:['Classic-era cards only','5 cards · Rare or better guaranteed','Anniversary finish odds ×3'],
    art:{p1:'#b47a3c',p2:'#180e05',p3:'rgba(240,190,120,.75)',kicker:'HERITAGE SERIES',title:'HERITAGE',title2:'PACK',emblem:'H',meta:'5 CARDS',meta2:'CLASSIC ERA ONLY',cls:'pack-gold'},
  }),
  P({
    id:'signatures', name:'Signature Series', short:'SIGN', tagline:'Ink from the greats.',
    desc:'3 cards from signed drivers and riders, with one Signature finish guaranteed and a 15% chance of a capped Signature Edition exclusive.',
    cost:110, currency:'gems', cards:3, scope:'all', category:'special', guaranteeNew:2, guarantees:{rare:3}, guaranteedFinish:'signature', pool:{signatures:true}, exclusiveChance:.15, autographs:{chance:.015}, finishBoost:{signature:4, numbered:1.5}, theme:'signature',
    odds:{common:0, rare:30, epic:45, legendary:19, iconic:6},
    bullets:['Signed legends only','15% capped Signature Edition exclusive','1 Signature finish guaranteed','3 cards · Rare or better'],
    art:{p1:'#d9c7a4',p2:'#1b160d',p3:'rgba(255,240,200,.7)',kicker:'SIGNATURE SERIES',title:'SIGNATURE',title2:'SERIES',emblem:'✒',meta:'3 CARDS',meta2:'SIGNED CARD INSIDE',cls:'pack-gold'},
  }),
  P({
    id:'blackout', name:'Blackout Pack', short:'BLACK', tagline:'Lights off. Contrast on.',
    desc:'4 cards, all Epic or better, with one Blackout edition guaranteed.',
    cost:70, currency:'gems', cards:4, scope:'all', category:'special', guaranteeNew:2, guarantees:{epic:4}, guaranteedFinish:'shadow', finishBoost:{shadow:5, numbered:1.6}, theme:'night',
    odds:{common:0, rare:0, epic:47, legendary:37, iconic:16},
    bullets:['4 cards · all Epic or better','1 Blackout edition guaranteed','2 new cards guaranteed'],
    art:{p1:'#3b4252',p2:'#05060a',p3:'rgba(160,180,220,.4)',kicker:'BLACKOUT SERIES',title:'BLACK',title2:'OUT',emblem:'◐',meta:'4 CARDS',meta2:'BLACKOUT GUARANTEED',cls:'pack-iconic'},
  }),
  P({
    id:'choice', name:'Collector’s Choice', short:'PICK', tagline:'Three legends. You choose the one.',
    desc:'3 Epic+ cards plus a choice of 3 Legendary cards — keep the one you want.',
    cost:140, currency:'gems', cards:3, scope:'all', category:'special', guaranteeNew:2, guarantees:{epic:3}, choice:{count:3, rarity:'legendary', picks:1}, theme:'choice',
    odds:{common:0, rare:0, epic:45, legendary:40, iconic:15},
    bullets:['Pick 1 of 3 Legendary cards','3 Epic+ cards included','2 new cards guaranteed'],
    art:{p1:'#b25cff',p2:'#12081f',p3:'rgba(210,150,255,.7)',kicker:'CHOICE SERIES',title:'PICK',title2:'ONE',emblem:'1/3',meta:'3 + CHOICE',meta2:'YOU CHOOSE THE LEGEND',cls:'pack-legendary'},
  }),
  P({
    id:'constructors', name:'Constructors Icons', short:'ICON⬢', tagline:'The garages that built the sport.',
    desc:'4 constructor cards, all Rare or better, with 2 Epics guaranteed.',
    cost:100, currency:'gems', cards:4, scope:'all', category:'special', guaranteeNew:2, guarantees:{rare:4, epic:2}, pool:{types:['team']}, finishBoost:{gold:2, championship:2}, theme:'elite',
    odds:{common:0, rare:38, epic:38, legendary:18, iconic:6},
    bullets:['Constructor cards only','4 cards · 2 Epics guaranteed','Team silverware chase'],
    art:{p1:'#f6c453',p2:'#1a1203',p3:'rgba(255,220,130,.75)',kicker:'CONSTRUCTOR ICONS',title:'TEAM',title2:'ICONS',emblem:'⬢',meta:'4 CARDS',meta2:'2 EPICS GUARANTEED',cls:'pack-gold'},
  }),

  /* ---------------------------------------------------------- EXCLUSIVE SERIES
     These packs are the only route to the supply-capped exclusive editions.
     Every exclusive is serialised, and once its fixed run is issued it can
     never be pulled again. Autograph-containing packs are specialist only. */
  P({
    id:'f1-legends', name:'F1 Legends Pack', short:'F1★', tagline:'A fixed run of Formula 1 legends.',
    desc:'4 cards, all Legendary or better, with a 50% chance of a serialised F1 Legends Edition exclusive.',
    cost:320, currency:'gems', exact:true, cards:4, scope:'f1', category:'exclusive', guaranteeNew:2, guarantees:{legendary:4}, exclusiveChance:.5, theme:'legend',
    odds:{common:0, rare:0, epic:18, legendary:60, iconic:22},
    bullets:['4 cards · all Legendary or better','50% chance of a capped Legends Edition','Only route to F1 Legends exclusives'],
    art:{p1:'#2a1040',p2:'#05050a',p3:'rgba(255,170,90,.65)',kicker:'F1 LEGENDS SERIES',title:'F1',title2:'LEGENDS',emblem:'★',meta:'4 CARDS',meta2:'LEGENDS EXCLUSIVE',cls:'pack-legendary'},
  }),
  P({
    id:'motogp-legends', name:'MotoGP Legends Pack', short:'GP★', tagline:'A fixed run of premier-class icons.',
    desc:'4 cards, all Legendary or better, with a 50% chance of a serialised MotoGP Legends Edition exclusive.',
    cost:320, currency:'gems', exact:true, cards:4, scope:'motogp', category:'exclusive', guaranteeNew:2, guarantees:{legendary:4}, exclusiveChance:.5, theme:'legend',
    odds:{common:0, rare:0, epic:18, legendary:60, iconic:22},
    bullets:['4 cards · all Legendary or better','50% chance of a capped Legends Edition','Only route to MotoGP Legends exclusives'],
    art:{p1:'#162a4a',p2:'#05070d',p3:'rgba(120,230,255,.6)',kicker:'MOTOGP LEGENDS SERIES',title:'MOTO',title2:'LEGENDS',emblem:'★',meta:'4 CARDS',meta2:'LEGENDS EXCLUSIVE',cls:'pack-legendary'},
  }),
  P({
    id:'golden-era', name:'Golden Era Pack', short:'GOLD·E', tagline:'The 1960s and 1970s, struck in gold.',
    desc:'5 cards from the classic eras with a 45% chance of a Golden Era Edition exclusive.',
    cost:180, currency:'gems', exact:true, cards:5, scope:'all', category:'exclusive', guaranteeNew:2, guarantees:{rare:5, epic:3}, exclusiveChance:.45, pool:{eras:['1960s','1970s']}, theme:'gold',
    odds:{common:0, rare:12, epic:38, legendary:39, iconic:11},
    bullets:['1960s–1970s cards only','45% chance of a Golden Era exclusive','All cards Rare or better'],
    art:{p1:'#c79a4a',p2:'#241405',p3:'rgba(255,215,140,.85)',kicker:'GOLDEN ERA SERIES',title:'GOLDEN',title2:'ERA',emblem:'1967',meta:'5 CARDS',meta2:'CLASSIC GOLD',cls:'pack-gold'},
  }),
  P({
    id:'anniversary', name:'Anniversary Pack', short:'ANNIV', tagline:'Commemorative editions. Fixed forever.',
    desc:'4 cards, all Epic or better, with a 60% chance of a capped Anniversary Edition exclusive and a 2% autograph chance.',
    cost:240, currency:'gems', exact:true, cards:4, scope:'all', category:'exclusive', guaranteeNew:2, guarantees:{epic:4, legendary:1}, exclusiveChance:.6, autographs:{chance:.02}, theme:'elite',
    odds:{common:0, rare:0, epic:34, legendary:46, iconic:20},
    bullets:['4 cards · Legendary guaranteed','60% chance of a capped Anniversary exclusive','2% authenticated autograph chance'],
    art:{p1:'#b98cff',p2:'#180a2e',p3:'rgba(210,150,255,.8)',kicker:'ANNIVERSARY SERIES',title:'ANNI',title2:'VERSARY',emblem:'25',meta:'4 CARDS',meta2:'COMMEMORATIVE',cls:'pack-legendary'},
  }),
  P({
    id:'hall-of-fame', name:'Hall of Fame Pack', short:'HOF', tagline:'Induction cards for the immortals.',
    desc:'3 cards, all Legendary or better, with a 70% chance of a Hall of Fame exclusive and a 3% autograph chance.',
    cost:450, currency:'gems', exact:true, cards:3, scope:'all', category:'exclusive', guaranteeNew:2, guarantees:{legendary:3}, exclusiveChance:.7, autographs:{chance:.03}, theme:'legend',
    odds:{common:0, rare:0, epic:0, legendary:62, iconic:38},
    bullets:['3 cards · Legendary or better','70% chance of a Hall of Fame exclusive','3% authenticated autograph chance'],
    art:{p1:'#3a2556',p2:'#07050c',p3:'rgba(255,190,90,.7)',kicker:'HALL OF FAME',title:'HALL',title2:'OF FAME',emblem:'HOF',meta:'3 CARDS',meta2:'IMMORTALS ONLY',cls:'pack-legendary'},
  }),
  P({
    id:'ultimate-legends', name:'Ultimate Legends Vault', short:'ULT★', tagline:'The deepest vault in the sport.',
    desc:'6 cards, all Legendary or better, with an 80% chance of an exclusive legends edition and a 5% autograph chance.',
    cost:900, currency:'gems', exact:true, cards:6, scope:'all', category:'exclusive', guaranteeNew:3, guarantees:{legendary:6}, exclusiveChance:.8, autographs:{chance:.05}, theme:'iconic',
    odds:{common:0, rare:0, epic:0, legendary:52, iconic:48},
    bullets:['6 cards · all Legendary or better','80% chance of a capped legends exclusive','5% authenticated autograph chance'],
    art:{p1:'#2a1040',p2:'#05050a',p3:'rgba(255,110,220,.6)',kicker:'ULTIMATE LEGENDS',title:'ULTIMATE',title2:'VAULT',emblem:'∞',meta:'6 CARDS',meta2:'LEGENDS + GRAILS',cls:'pack-iconic'},
  }),
  P({
    id:'numbered-collectors', name:'Numbered Collectors Pack', short:'Nº', tagline:'Every copy carries a number.',
    desc:'5 cards, Epic or better, with one numbered edition guaranteed and a 50% chance of an exclusive anniversary or Hall of Fame card.',
    cost:350, currency:'gems', exact:true, cards:5, scope:'all', category:'exclusive', guaranteeNew:2, guarantees:{epic:5, legendary:1}, guaranteedFinish:'numbered', exclusiveChance:.5, autographs:{chance:.02}, theme:'limited',
    odds:{common:0, rare:0, epic:30, legendary:46, iconic:24},
    bullets:['5 cards · Legendary guaranteed','1 numbered edition guaranteed','50% chance of a capped exclusive'],
    art:{p1:'#6f7bff',p2:'#0a0a2a',p3:'rgba(150,170,255,.75)',kicker:'NUMBERED COLLECTORS',title:'NUMBERED',title2:'COLLECTORS',emblem:'/Nº',meta:'5 CARDS',meta2:'1 NUMBERED GUARANTEED',cls:'pack-iconic'},
  }),

  /* ---------------------------------------------------------- COLLECTOR VAULT */
  P({
    id:'vault-signed', name:'Vault Signed Drop', short:'AUTO', tagline:'One authenticated autograph. One serial.',
    desc:'1 card, guaranteed to be a supply-capped authenticated autograph collectible from the Collector’s Vault.',
    cost:400, currency:'gems', exact:true, cards:1, scope:'all', category:'vault', guaranteeNew:1, autographs:{guaranteed:true}, theme:'signature',
    odds:{common:0, rare:0, epic:0, legendary:0, iconic:100},
    bullets:['1 card · guaranteed authenticated autograph','Fixed supply across six editions','Serial number and digital certificate'],
    art:{p1:'#d9c7a4',p2:'#1b160d',p3:'rgba(255,240,200,.75)',kicker:'COLLECTOR VAULT',title:'SIGNED',title2:'DROP',emblem:'✒',meta:'1 CARD',meta2:'GUARANTEED AUTOGRAPH',cls:'pack-gold'},
  }),

  /* ---------------------------------------------------------- DAILY */
  P({
    id:'daily', name:'Daily Pack', short:'FREE', tagline:'A fresh hit of motorsport every day.',
    desc:'3 free cards. Claim once every 24 hours.',
    cost:0, cards:3, scope:'all', category:'daily', guaranteeNew:1, oncePerDay:true, theme:'daily',
    odds:{common:66, rare:24, epic:7.5, legendary:2, iconic:.5},
    bullets:['3 cards · completely free','1 new card guaranteed','Resets at midnight'],
    art:{p1:'#1f2937',p2:'#090c12',p3:'rgba(100,240,200,.5)',kicker:'DAILY DROP',title:'DAILY',title2:'PACK',emblem:'24H',meta:'3 CARDS',meta2:'FREE EVERY DAY',cls:'pack-motogp'},
  }),

  /* ------------------------------------------------------ HISTORICAL ARCHIVE
     One dedicated pack for every F1 season (1950→2026) and every premier-class
     grand prix motorcycle season (1949→2026), plus decade and champion sets. */
  ...HISTORICAL_PACKS,
];

export const PACK_MAP = Object.fromEntries(PACKS.map(p => [p.id, p]));
export const SHOP_PACKS = PACKS.filter(p => p.category !== 'daily');

/* ----- availability / countdowns ----- */
export function dayIndex(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  return Math.floor(diff / 86400000);
}
export function midnightAfter(date = new Date(), days = 0) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate() + days + 1);
  return d.getTime();
}
export function packAvailability(pack, date = new Date()) {
  if (!pack?.event) return {available:true, endsAt:null, startsAt:null, label:'Always available'};
  const {cycle, from, to} = pack.event;
  const idx = dayIndex(date);
  const mod = ((idx % cycle) + cycle) % cycle;
  const active = from < to ? (mod >= from && mod < to) : (mod >= from || mod < to);
  if (active) {
    const left = from < to ? (to - mod) : (mod >= from ? (cycle - mod + to) : (to - mod));
    return {available:true, endsAt: midnightAfter(date, Math.max(0, left - 1)), startsAt:null, label:left <= 1 ? 'Final hours' : `${left} days left`};
  }
  const until = from < to ? (((from - mod + cycle) % cycle) || cycle) : (from - mod);
  return {available:false, endsAt:null, startsAt: midnightAfter(date, Math.max(0, until - 1)), label:`Starts in ${until}d`};
}
export function getEventPacks(date = new Date()) {
  return PACKS.filter(p => p.category === 'event').map(pack => ({pack, ...packAvailability(pack, date)}));
}

/* ----- Pack of the Day (deterministic per date) ----- */
const POTD_TEMPLATES = [
  {base:'premium', name:'Apex Daily Premium', extra:'New card guarantee doubled', bumps:1, discount:.35},
  {base:'gold', name:'Golden Hour', extra:'Gold foil odds doubled', bumps:1, discount:.3},
  {base:'legendary', name:'Legend Vault', extra:'Iconic odds boosted', bumps:1, discount:.25},
  {base:'championship', name:'Title Tuesday', extra:'Championship editions boosted', bumps:1, discount:.3},
  {base:'crossover', name:'Worlds Collide', extra:'Two guaranteed new cards', bumps:1, discount:.25},
  {base:'f1-premium', name:'F1 Power Hour', extra:'F1-only, boosted Epics', bumps:1, discount:.35},
  {base:'motogp-premium', name:'MotoGP Power Hour', extra:'MotoGP-only, boosted Epics', bumps:1, discount:.35},
  {base:'scavenger', name:'Paddock Sweep', extra:'Four duplicate-protected slots', bumps:1, discount:.3},
  {base:'elite', name:'Elite After Hours', extra:'Epic guarantee and three new cards', bumps:1, discount:.28},
];

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
    baseId: base.id,
    name: tpl.name,
    desc: `${base.desc} Rotates daily.`,
    cost,
    baseCost: base.cost,
    discount: Math.round(tpl.discount * 100),
    extra: tpl.extra,
    guaranteeNew: Math.min(3, (base.guaranteeNew || 1) + 1),
    protectDupes: Math.min(4, (base.protectDupes || 0) + 1),
    odds,
    potd: true,
    endsAt: midnightAfter(date),
    art:{...base.art, kicker:'PACK OF THE DAY', meta2: tpl.extra.toUpperCase(), cls: base.art.cls},
  };
}

/* ----- rotating flash offers (deterministic per hour) ----- */
const OFFER_BASES = ['standard','premium','elite','f1-premium','f1-podium','motogp-premium','motogp-podium','gold','legendary','championship','heritage','scavenger'];
const OFFER_EXTRAS = [
  'Bonus Rare+ card added to every opening',
  'Double Holographic odds for one hour',
  'Two extra new-card guarantees',
  'Free upgrade to the next pack tier',
  'Championship finish odds boosted',
  'Gold Foil odds doubled',
];
export function getLiveOffers(date = new Date()) {
  const hour = Math.floor(date.getTime() / 3600000);
  const endsAt = (hour + 1) * 3600000;
  const out = [];
  for (let i = 0; i < 3; i++) {
    const seed = Math.abs((hour * 131 + i * 977) % 100000);
    const base = PACK_MAP[OFFER_BASES[(seed + i * 3) % OFFER_BASES.length]];
    const discount = [.15, .2, .25, .3, .35, .4][(seed + i) % 6];
    const tokenFree = (seed + i) % 5 === 0;
    out.push({
      id:`offer-${hour}-${i}`,
      baseId: base.id,
      pack: base,
      name: i === 0 ? `Flash: ${base.name}` : base.name,
      tag: i === 0 ? 'FLASH OFFER' : i === 1 ? 'LIMITED DEAL' : 'COLLECTOR DEAL',
      discount: Math.round(discount * 100),
      baseCost: base.cost,
      cost: Math.max(base.cost > 1 ? 1 : base.cost, Math.round(base.cost * (1 - discount))),
      currency: base.currency,
      extra: OFFER_EXTRAS[(seed + i * 2) % OFFER_EXTRAS.length],
      bonusCards: tokenFree ? 1 : 0,
      endsAt,
    });
  }
  return out;
}
export function liveOfferFor(baseId, date = new Date()) {
  return getLiveOffers(date).find(o => o.baseId === baseId) || null;
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
