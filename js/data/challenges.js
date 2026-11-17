/* ============================================================
   HISTORICAL COLLECTION CHALLENGES
   ------------------------------------------------------------
   Every challenge has a declarative `requires` spec. The store
   turns that into live progress against the player's collection,
   so nothing here needs access to game state. Rewards can grant
   capped collector cards, challenge-exclusive packs, XP, showroom
   decorations, frames and collector titles.
   ============================================================ */
import { ALL_SEASONS, SEASONS } from './seasons.js';

const coin = n => n;
const gem = n => n;

function seasonChallenge(s, rewardCard = null) {
  const legendary = rewardCard !== null;
  return {
    id: `season-${s.id}`,
    title: `${s.year} ${s.label} Season`,
    desc: legendary
      ? `Collect all four cards from the ${s.year} ${s.label} season and claim a capped collector edition.`
      : `Complete the ${s.year} ${s.label} season set${s.inProgress ? ' when the title race concludes' : ` — ${s.champion}, ${s.make}`}.`,
    icon: s.inProgress ? '◷' : '▣',
    category: 'season', frequency: 'permanent',
    sport: s.sport, decade: s.decade, seasonId: s.id,
    difficulty: s.year < 1970 ? 'hard' : s.inProgress ? 'medium' : 'easy',
    goal: 4, requires: {type:'cards', ids:s.cardIds},
    reward: {
      coins: legendary ? 4000 : coin(1200 + Math.max(0, (2026 - s.year) * 3)),
      gems: legendary ? 90 : gem(20),
      tokens: legendary ? 8 : 3,
      xp: legendary ? 400 : 140,
      ...(legendary ? {card:rewardCard} : {}),
      decoration: 'archive-plaque',
    },
    inProgress: !!s.inProgress,
  };
}

/* A curated set of landmark seasons hands out the six supply-capped challenge
   editions. Every other season still grants coins, gems, tokens and XP. */
const CARD_REWARD_SEASONS = {
  'f1-1950': 'challenge-f1-pioneer',
  'f1-1988': 'challenge-rivalry-f1',
  'f1-2000': 'challenge-f1-dynasty',
  'f1-2025': 'challenge-archive-master',
  'motogp-1966': 'challenge-gp-king',
  'motogp-2001': 'challenge-gp-doctor',
};

const SEASON_CHALLENGES = ALL_SEASONS.map(s => seasonChallenge(s, CARD_REWARD_SEASONS[s.id] || null));

function decadeChampions(sport, decade) {
  const ids = ALL_SEASONS
    .filter(s => s.sport === sport && s.decade === decade && !s.inProgress)
    .map(s => `${s.id}-champion`);
  const label = sport === 'f1' ? 'Formula 1' : 'MotoGP';
  return {
    id: sport === 'f1' ? `f1-champions-${decade}` : `mgp-champions-${decade}`,
    title: `${decade} ${label} Champions`,
    desc: `Own a world champion card from every ${decade} ${label} season.`,
    icon: '★', category: 'champions', frequency: 'permanent',
    sport, decade, difficulty: ids.length >= 9 ? 'hard' : 'medium',
    goal: ids.length, requires: {type:'cards', ids},
    reward: {
      coins: 3000, gems: 60, tokens: 10, xp: 320,
      ...(sport === 'f1' && decade === '1980s' ? {pack:'archive-vault-champions', title:'Chronicle Keeper'} : {}),
      decoration: 'trophy-case',
    },
  };
}
const DECADE_CHALLENGES = ['f1','motogp'].flatMap(sport =>
  [...new Set(SEASONS.filter(s => s.sport === sport).map(s => s.decade))].map(d => decadeChampions(sport, d)));

/* The two 1950s archive challenges are also the keys to the challenge-only
   vintage vault packs. Their IDs are fixed by those packs' `requiresChallenge`. */
const ARCHIVE_50S = {
  id: 'archive-50s',
  title: 'Fifties Archive',
  desc: 'Own a Formula 1 world champion card from every season of the 1950s.',
  icon: '◈', category: 'champions', frequency: 'permanent',
  sport: 'f1', decade: '1950s', difficulty: 'hard',
  goal: 10,
  requires: {type:'cards', ids: SEASONS.filter(s => s.sport === 'f1' && s.decade === '1950s').map(s => `${s.id}-champion`)},
  reward: {coins:5000, gems:110, tokens:18, xp:500, pack:'archive-vault-50s', title:'Vault Archivist', decoration:'trophy-case'},
};
const TEAM_MAKES = [
  {make:'Ferrari', sport:'f1'}, {make:'McLaren', sport:'f1'}, {make:'Williams', sport:'f1'},
  {make:'Mercedes', sport:'f1'}, {make:'Lotus', sport:'f1'}, {make:'Red Bull', sport:'f1'},
  {make:'Yamaha', sport:'motogp'}, {make:'Honda', sport:'motogp'}, {make:'Ducati', sport:'motogp'},
  {make:'Suzuki', sport:'motogp'}, {make:'MV Agusta', sport:'motogp'}, {make:'KTM', sport:'motogp'},
];
const TEAM_CHALLENGES = TEAM_MAKES.map(({make, sport}, i) => {
  const ids = ALL_SEASONS.filter(s => s.sport === sport && s.make === make && !s.inProgress).map(s => `${s.id}-champion`);
  if (!ids.length) return null;
  return {
    id: `team-${sport}-${make.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    title: `${make} Heritage`,
    desc: `Collect world champion cards from every ${make} title season in ${sport === 'f1' ? 'Formula 1' : 'MotoGP'}.`,
    icon: '⬢', category: 'team', frequency: 'permanent', sport,
    difficulty: ids.length >= 8 ? 'expert' : ids.length >= 4 ? 'hard' : 'medium',
    goal: ids.length, requires: {type:'cards', ids},
    reward: {
      coins: 2200 + ids.length * 180, gems: 45 + ids.length * 3, tokens: 8, xp: 220 + ids.length * 12,
      ...(i % 3 === 0 ? {card:'challenge-f1-pioneer'} : {}),
      decoration: 'team-banner',
    },
  };
}).filter(Boolean);

function machineChallenge(sport, decade) {
  const ids = ALL_SEASONS.filter(s => s.sport === sport && s.decade === decade).map(s => `${s.id}-machine`);
  return {
    id: `machines-${sport}-${decade}`,
    title: `${decade} ${sport === 'f1' ? 'Race Cars' : 'GP Prototypes'}`,
    desc: `Own the championship-winning ${sport === 'f1' ? 'cars' : 'motorcycles'} from every ${decade} season.`,
    icon: '◮', category: 'machine', frequency: 'permanent', sport, decade,
    difficulty: ids.length >= 9 ? 'hard' : 'medium',
    goal: ids.length, requires: {type:'cards', ids},
    reward: {coins:2600, gems:55, tokens:9, xp:280, decoration:'machine-stand'},
  };
}
const MACHINE_CHALLENGES = ['f1','motogp'].flatMap(sport =>
  [...new Set(SEASONS.filter(s => s.sport === sport).map(s => s.decade))].map(d => machineChallenge(sport, d)));

const ROOKIE_IDS = ['senna-rookie','schumacher-rookie','hamilton-rookie','verstappen-rookie','leclerc-rookie','rossi-rookie','marquez-rookie'];
const ROOKIE_CHALLENGE = {
  id: 'rookie-legends', title: 'Rookie Legends',
  desc: 'Own the rookie-season cards of seven drivers and riders who went on to define the sport.',
  icon: '✦', category: 'rookie', frequency: 'permanent', sport: 'all',
  difficulty: 'hard', goal: ROOKIE_IDS.length, requires: {type:'cards', ids:ROOKIE_IDS},
  reward: {coins:6500, gems:150, tokens:20, xp:600, card:'challenge-gp-doctor', title:'First Lap Finder', decoration:'archive-plaque'},
};

const RIVALRIES = [
  {id:'rivalry-senna-prost', title:'Senna vs Prost', ids:['f1-1988-champion','f1-1989-champion','f1-1990-champion','f1-1991-champion']},
  {id:'rivalry-hamilton-rosberg', title:'Hamilton vs Rosberg', ids:['f1-2014-champion','f1-2015-champion','f1-2016-champion']},
  {id:'rivalry-verstappen-hamilton', title:'Verstappen vs Hamilton', ids:['f1-2021-champion','f1-2022-champion','f1-2024-champion']},
  {id:'rivalry-rossi-lorenzo', title:'Rossi vs Lorenzo', ids:['motogp-2010-champion','motogp-2012-champion','motogp-2015-champion']},
  {id:'rivalry-marquez-lorenzo', title:'Márquez vs Lorenzo', ids:['motogp-2013-champion','motogp-2014-champion','motogp-2016-champion']},
  {id:'rivalry-agostini-hailwood', title:'Agostini vs Hailwood', ids:['motogp-1962-champion','motogp-1965-champion','motogp-1966-champion','motogp-1971-champion']},
];
const RIVALRY_CHALLENGES = RIVALRIES.map((r, i) => ({
  id: r.id, title: r.title,
  desc: `Own the championship cards that tell the story of ${r.title}.`,
  icon: '⚔', category: 'rivalry', frequency: 'permanent',
  sport: r.ids[0].startsWith('f1') ? 'f1' : 'motogp',
  difficulty: 'hard', goal: r.ids.length, requires: {type:'cards', ids:r.ids},
  reward: {
    coins: 5200, gems: 120, tokens: 14, xp: 480,
    ...(i === 0 ? {card:'challenge-rivalry-f1'} : {}),
    title: 'Rivalry Witness', decoration:'rivalry-wall',
  },
}));

const MILESTONE_CHALLENGES = [
  {
    id:'milestone-season-cards-25', title:'Archive Apprentice',
    desc:'Own 25 unique historical season cards.', icon:'▤', category:'milestone', frequency:'permanent',
    sport:'all', difficulty:'easy', goal:25, requires:{type:'stat', stat:'seasonCards'},
    reward:{coins:2500, gems:60, tokens:8, xp:260, decoration:'archive-plaque'},
  },
  {
    id:'milestone-season-cards-75', title:'Archive Specialist',
    desc:'Own 75 unique historical season cards.', icon:'▥', category:'milestone', frequency:'permanent',
    sport:'all', difficulty:'hard', goal:75, requires:{type:'stat', stat:'seasonCards'},
    reward:{coins:7000, gems:180, tokens:20, xp:650, card:'challenge-archive-master', title:'Season Master'},
  },
  {
    id:'milestone-seasons-5', title:'Five Sealed Seasons',
    desc:'Complete five historical season collections.', icon:'▦', category:'milestone', frequency:'permanent',
    sport:'all', difficulty:'medium', goal:5, requires:{type:'stat', stat:'seasonsCompleted'},
    reward:{coins:3500, gems:80, tokens:10, xp:340, decoration:'trophy-case'},
  },
  {
    id:'milestone-seasons-15', title:'Fifteen Sealed Seasons',
    desc:'Complete fifteen historical season collections.', icon:'▧', category:'milestone', frequency:'permanent',
    sport:'all', difficulty:'expert', goal:15, requires:{type:'stat', stat:'seasonsCompleted'},
    reward:{coins:12000, gems:300, tokens:40, xp:1100, card:'challenge-f1-dynasty', title:'Historian'},
  },
  {
    id:'milestone-champions-25', title:'The Champions’ Room',
    desc:'Own 25 different world champion cards.', icon:'★', category:'milestone', frequency:'permanent',
    sport:'all', difficulty:'medium', goal:25, requires:{type:'stat', stat:'championCards'},
    reward:{coins:4500, gems:100, tokens:12, xp:420, decoration:'trophy-case'},
  },
];

const PERIOD_CHALLENGES = [
  {
    id:'daily-archive-pack', title:'Open the Archive',
    desc:'Open any historical season pack today.', icon:'▣', category:'daily', frequency:'daily',
    sport:'all', difficulty:'easy', goal:1, requires:{type:'period', stat:'historicalPacksOpened'},
    reward:{coins:900, gems:20, tokens:2, xp:90},
  },
  {
    id:'weekly-seasons-2', title:'Two Seasons, One Week',
    desc:'Complete two historical season collections this week.', icon:'◷', category:'weekly', frequency:'weekly',
    sport:'all', difficulty:'medium', goal:2, requires:{type:'period', stat:'seasonsCompleted'},
    reward:{coins:3000, gems:70, tokens:10, xp:320, pack:'archive-vault-50s'},
  },
  {
    id:'monthly-seasons-6', title:'Archive Marathon',
    desc:'Complete six historical season collections this month.', icon:'◈', category:'monthly', frequency:'monthly',
    sport:'all', difficulty:'hard', goal:6, requires:{type:'period', stat:'seasonsCompleted'},
    reward:{coins:9000, gems:220, tokens:30, xp:900, card:'challenge-gp-king', title:'Master Archivist'},
  },
];

export const HISTORICAL_CHALLENGES = [
  ...SEASON_CHALLENGES,
  ARCHIVE_50S,
  ...DECADE_CHALLENGES,
  ...TEAM_CHALLENGES,
  ...MACHINE_CHALLENGES,
  ROOKIE_CHALLENGE,
  ...RIVALRY_CHALLENGES,
  ...MILESTONE_CHALLENGES,
  ...PERIOD_CHALLENGES,
];
export const HISTORICAL_CHALLENGE_MAP = Object.fromEntries(HISTORICAL_CHALLENGES.map(c => [c.id, c]));

export const CHALLENGE_CATEGORIES = [
  {id:'all', label:'All goals'},
  {id:'daily', label:'Daily'},
  {id:'weekly', label:'Weekly'},
  {id:'monthly', label:'Monthly'},
  {id:'season', label:'Seasons'},
  {id:'champions', label:'Champions'},
  {id:'team', label:'Teams & makes'},
  {id:'machine', label:'Machines'},
  {id:'rookie', label:'Rookies'},
  {id:'rivalry', label:'Rivalries'},
  {id:'milestone', label:'Milestones'},
];

export const COLLECTOR_TITLES = [
  'Chronicle Keeper', 'Vault Archivist', 'First Lap Finder', 'Rivalry Witness',
  'Season Master', 'Historian', 'Master Archivist',
];

/* World champion card IDs, shared with market event logic and prestige. */
export const CHAMPION_CARD_IDS = ALL_SEASONS.filter(s => !s.inProgress).map(s => `${s.id}-champion`);
export const SEASON_CARD_IDS = ALL_SEASONS.flatMap(s => s.cardIds);
