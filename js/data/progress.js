/* ============================================================
   DAILY REWARDS · CHALLENGES · ACHIEVEMENTS
   ============================================================ */

export const DAILY_REWARDS = [
  {day:1, name:'Warm-Up Lap', desc:'A little fuel for the week', icon:'◈', coins:450, gems:0},
  {day:2, name:'Qualifying Boost', desc:'Coins for the next pack', icon:'◈', coins:650, gems:5},
  {day:3, name:'First Stint', desc:'A collector’s top-up', icon:'◆', coins:850, gems:12},
  {day:4, name:'Midweek Push', desc:'Coins, gems and momentum', icon:'✦', coins:1200, gems:18},
  {day:5, name:'Podium Finish', desc:'A premium bankroll', icon:'◈', coins:1600, gems:25},
  {day:6, name:'Pole Position', desc:'The big push before the finale', icon:'◆', coins:2200, gems:35},
  {day:7, name:'Champion’s Purse', desc:'Gold Pack + a champion’s war chest', icon:'★', coins:3200, gems:60, pack:'gold', highlight:true},
];

export const DAILY_CHALLENGE_POOL = [
  {id:'d-open-1', title:'Lights Out', desc:'Open 1 pack of any kind', icon:'▣', stat:'daily.packsOpened', goal:1, reward:{coins:400}},
  {id:'d-open-3', title:'Three-Pack Sprint', desc:'Open 3 packs in a day', icon:'◈', stat:'daily.packsOpened', goal:3, reward:{coins:1000, gems:10, pack:'standard'}},
  {id:'d-new-4', title:'Fresh Metal', desc:'Add 4 new cards to your vault', icon:'✦', stat:'daily.newCards', goal:4, reward:{coins:700, gems:15}},
  {id:'d-epic', title:'Step It Up', desc:'Pull 1 Epic or better card', icon:'◆', stat:'daily.epicPulls', goal:1, reward:{gems:25, pack:'f1-quali'}},
  {id:'d-legendary', title:'Chasing Legends', desc:'Pull 1 Legendary or better card', icon:'★', stat:'daily.legendaryPulls', goal:1, reward:{gems:50, pack:'motogp-poles'}},
  {id:'d-sell-3', title:'Clear The Duplicates', desc:'Sell 3 duplicate cards', icon:'⇄', stat:'daily.cardsSold', goal:3, reward:{coins:650}},
  {id:'d-trade-1', title:'Deal Maker', desc:'Complete 1 trade with a collector', icon:'⇆', stat:'daily.trades', goal:1, reward:{coins:750, gems:10}},
  {id:'d-daily-pack', title:'Daily Habit', desc:'Open the free Daily Pack', icon:'☀', stat:'daily.dailyPacks', goal:1, reward:{coins:450}},
  {id:'d-gold', title:'Gold Rush', desc:'Open 1 Gold Pack', icon:'◉', stat:'daily.goldPacks', goal:1, reward:{coins:900, gems:15}},
  {id:'d-spend', title:'Fuel The Economy', desc:'Spend 2,000 coins in one day', icon:'▲', stat:'daily.coinsSpent', goal:2000, reward:{gems:20}},
];

export const ACHIEVEMENTS = [
  {id:'a-unique-10', title:'First Gear', desc:'Own 10 unique cards', icon:'▤', stat:'maxUnique', goal:10, reward:{coins:800, gems:15}, kind:'unique'},
  {id:'a-unique-25', title:'Grid Regular', desc:'Own 25 unique cards', icon:'▤', stat:'maxUnique', goal:25, reward:{coins:1400, gems:25}, kind:'unique'},
  {id:'a-unique-50', title:'Card Collector', desc:'Own 50 unique cards', icon:'▥', stat:'maxUnique', goal:50, reward:{coins:2400, gems:45, pack:'premium'}, kind:'unique'},
  {id:'a-unique-100', title:'Vault Builder', desc:'Own 100 unique cards', icon:'▦', stat:'maxUnique', goal:100, reward:{coins:4500, gems:90, pack:'f1-premium'}, kind:'unique'},
  {id:'a-unique-150', title:'Apex Archive', desc:'Own 150 unique cards', icon:'▦', stat:'maxUnique', goal:150, reward:{coins:8000, gems:160}, kind:'unique'},
  {id:'a-unique-250', title:'The Completionist', desc:'Own 250 unique cards', icon:'◈', stat:'maxUnique', goal:250, reward:{coins:20000, gems:500}, kind:'unique'},
  {id:'a-iconic-1', title:'First Icon', desc:'Pull your first Iconic card', icon:'★', stat:'iconicPulls', goal:1, reward:{coins:1200, gems:30, pack:'iconic'}},
  {id:'a-iconic-5', title:'Icon Hunter', desc:'Pull 5 Iconic cards', icon:'★', stat:'iconicPulls', goal:5, reward:{coins:5000, gems:150}},
  {id:'a-legendary-5', title:'Legend Spotter', desc:'Pull 5 Legendary cards', icon:'◆', stat:'legendaryPulls', goal:5, reward:{coins:2500, gems:60}},
  {id:'a-packs-10', title:'Pack Rat', desc:'Open 10 packs', icon:'▣', stat:'packsOpened', goal:10, reward:{coins:1500, gems:20}},
  {id:'a-packs-50', title:'Weekend Warrior', desc:'Open 50 packs', icon:'▣', stat:'packsOpened', goal:50, reward:{coins:4500, gems:80, pack:'motogp-premium'}},
  {id:'a-packs-100', title:'Marathon Opener', desc:'Open 100 packs', icon:'▤', stat:'packsOpened', goal:100, reward:{coins:10000, gems:200}},
  {id:'a-album-1', title:'Album Opener', desc:'Complete 1 album', icon:'▦', stat:'albumsCompleted', goal:1, reward:{coins:2000, gems:50, pack:'gold'}},
  {id:'a-album-3', title:'Album Master', desc:'Complete 3 albums', icon:'▦', stat:'albumsCompleted', goal:3, reward:{coins:5000, gems:120}},
  {id:'a-album-6', title:'Curator', desc:'Complete 6 albums', icon:'▧', stat:'albumsCompleted', goal:6, reward:{coins:12000, gems:300}},
  {id:'a-trades-5', title:'Deal Maker', desc:'Complete 5 trades', icon:'⇆', stat:'trades', goal:5, reward:{coins:1800, gems:25}},
  {id:'a-sold-20', title:'Market Mogul', desc:'Sell 20 cards', icon:'◫', stat:'cardsSold', goal:20, reward:{coins:2400, gems:30}},
  {id:'a-daily-7', title:'Daily Devotee', desc:'Reach a 7-day login streak', icon:'☀', stat:'bestStreak', goal:7, reward:{coins:2500, gems:60}},
];

export const MILESTONES = [10, 25, 50, 100, 150, 190];

export const LEVEL_TITLES = [
  'Rookie', 'Paddock Pass', 'Grid Regular', 'Points Finisher', 'Podium Hunter',
  'Race Winner', 'Pole Sitter', 'Title Contender', 'World Champion', 'Hall of Fame',
  'Apex Legend', 'Motorsport Immortal',
];

export function levelNeeded(level) { return 300 + (level - 1) * 220; }

export function levelTitle(level) { return LEVEL_TITLES[Math.min(LEVEL_TITLES.length - 1, Math.floor((level - 1) / 2))]; }

export function challengeForToday(date = new Date()) {
  // deterministic 3-challenge rotation, stable within the calendar day
  const seed = parseInt(localDateKey(date).replace(/-/g, ''), 10);
  const pool = [...DAILY_CHALLENGE_POOL];
  const picks = [];
  let s = seed;
  while (picks.length < 3 && pool.length) {
    s = (s * 9301 + 49297) % 233280;
    const idx = s % pool.length;
    picks.push(pool.splice(idx, 1)[0]);
  }
  return picks;
}

export function localDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function dateSeed(date = new Date()) {
  return parseInt(localDateKey(date).replace(/-/g, ''), 10);
}

export function msUntilMidnight(now = new Date()) {
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  return Math.max(0, next - now);
}
