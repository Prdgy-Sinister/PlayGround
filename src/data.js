export const TAU = Math.PI * 2;

export const HOUSES = [
  { id: 'gryffindor', name: 'Gryffindor', color: '#8f1d2c', accent: '#e8b64c', trait: 'Courage' },
  { id: 'slytherin', name: 'Slytherin', color: '#1f5d45', accent: '#c7d3c0', trait: 'Ambition' },
  { id: 'ravenclaw', name: 'Ravenclaw', color: '#263f73', accent: '#b9a46a', trait: 'Wit' },
  { id: 'hufflepuff', name: 'Hufflepuff', color: '#b8891f', accent: '#26211b', trait: 'Loyalty' },
];

export const SKILLS = [
  { id: 'speed', name: 'Swiftness', desc: 'Top speed on every broom', icon: 'wind' },
  { id: 'handling', name: 'Handling', desc: 'Sharper turns and control', icon: 'compass' },
  { id: 'boost', name: 'Broom Magic', desc: 'Stronger, longer boosts', icon: 'spark' },
  { id: 'power', name: 'Power', desc: 'Harder shots and Bludgers', icon: 'impact' },
  { id: 'reflex', name: 'Reflex', desc: 'Saves, catches and tackles', icon: 'eye' },
];

export const BROOMS = [
  {
    id: 'cleansweep', name: 'Cleansweep Eleven', maker: 'Cleansweep Broom Co.',
    tier: 1, price: 0, level: 1, length: 'Reliable · Forgiving',
    desc: 'The dependable school broom. Gentle, honest and ready for a first season.',
    stats: { speed: 40, accel: 52, handling: 60, boost: 40 },
    colors: ['#8b5a34', '#caa06b'], accent: '#e5c87c',
  },
  {
    id: 'comet', name: 'Comet 290', maker: 'Comet Trading Co.',
    tier: 2, price: 900, level: 2, length: 'Balanced · Agile',
    desc: 'A sleek all-rounder with a lively tail and a taste for tight corners.',
    stats: { speed: 52, accel: 62, handling: 66, boost: 54 },
    colors: ['#3f5a72', '#b9c6d2'], accent: '#e7b95e',
  },
  {
    id: 'nimbus', name: 'Nimbus 2001', maker: 'Nimbus Racing Broom Co.',
    tier: 3, price: 1900, level: 4, length: 'Quick · Responsive',
    desc: 'A championship-grade broom with silver-etched handle and superb balance.',
    stats: { speed: 64, accel: 70, handling: 74, boost: 64 },
    colors: ['#4a3a28', '#d7c7a3'], accent: '#cfd6df',
  },
  {
    id: 'firebolt', name: 'Firebolt Supreme', maker: 'Firebolt Premier',
    tier: 4, price: 3400, level: 6, length: 'Fast · Precise',
    desc: 'Hand-finished ash, unbreakable braking charm. A World Cup icon.',
    stats: { speed: 78, accel: 79, handling: 82, boost: 82 },
    colors: ['#2b2119', '#8f6a45'], accent: '#e6b34d',
  },
  {
    id: 'stormchaser', name: 'Stormchaser X', maker: 'Belfast Broomworks',
    tier: 5, price: 5200, level: 9, length: 'Ferocious · Grippy',
    desc: 'Built for storms. Copper coils drink lightning and spit it out as speed.',
    stats: { speed: 88, accel: 85, handling: 74, boost: 92 },
    colors: ['#232b38', '#6f849d'], accent: '#69d3f4',
  },
  {
    id: 'elderwind', name: 'Elderwind Sovereign', maker: 'Ollivander & Sons',
    tier: 6, price: 8500, level: 12, length: 'Legendary · Alive',
    desc: 'A living broom grown from a single elder bough. It chooses its rider.',
    stats: { speed: 96, accel: 92, handling: 90, boost: 96 },
    colors: ['#3a2845', '#c8aa6a'], accent: '#b6f2c4',
  },
];

export const LIVERIES = [
  { id: 'gold', name: 'Gold', color: '#e8bd5b' },
  { id: 'scarlet', name: 'Scarlet', color: '#c0392b' },
  { id: 'emerald', name: 'Emerald', color: '#2f9e6f' },
  { id: 'ice', name: 'Ice', color: '#7dd8f0' },
  { id: 'violet', name: 'Violet', color: '#a87ce0' },
  { id: 'silver', name: 'Silver', color: '#d6dde6' },
];

const loop = ({ count = 14, rx, rz, base, amp = 10, wobble = 0.15, phase = 0 }) => {
  const pts = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * TAU;
    const x = Math.cos(a) * rx + Math.sin(a * 3 + phase) * rx * wobble * 0.18;
    const z = Math.sin(a) * rz + Math.cos(a * 2 + phase * 1.3) * rz * wobble * 0.22;
    const y = base + Math.sin(a * 2 + phase) * amp + Math.cos(a * 3 + phase * 1.7) * amp * 0.32;
    pts.push([Number(x.toFixed(1)), Number(y.toFixed(1)), Number(z.toFixed(1))]);
  }
  return pts;
};

export const TRACKS = [
  {
    id: 'hogwarts', name: 'Hogwarts Sky Circuit', region: 'Hogwarts Grounds',
    theme: 'hogwarts', time: 'day', weather: 'clear', wind: 0.18, difficulty: 1,
    laps: 2, tunnel: [7, 8], warp: [5], boost: [3, 10], count: 14,
    tagline: 'Castle turrets, lake winds and a first taste of glory.',
    desc: 'Thread the golden hoops above the Black Lake and sweep past the Astronomy Tower before diving through the viaduct.',
    points: loop({ rx: 205, rz: 150, base: 40, amp: 13, wobble: 0.22, phase: 0.6 }),
    targetLap: 34500,
  },
  {
    id: 'worldcup', name: 'World Cup Colosseum', region: 'International Stadium',
    theme: 'worldcup', time: 'night', weather: 'clear', wind: 0.1, difficulty: 2,
    laps: 3, tunnel: [9, 10], warp: [6], boost: [2, 5, 12], count: 14,
    tagline: 'A floodlit lap of honour around the greatest stadium in sport.',
    desc: 'Circle the Quidditch World Cup stadium at roof height, then cut through the torch arches as ninety thousand fans roar.',
    points: loop({ rx: 185, rz: 135, base: 34, amp: 12, wobble: 0.08, phase: 2.1 }),
    targetLap: 30500,
  },
  {
    id: 'highlands', name: 'Highland Thunder Run', region: 'Scottish Highlands',
    theme: 'highlands', time: 'day', weather: 'storm', wind: 0.65, difficulty: 2,
    laps: 2, tunnel: [4, 5], warp: [9], boost: [1, 7, 11], count: 16,
    tagline: 'Storm winds, standing stones and mile after mile of heather.',
    desc: 'Battle crosswinds between ancient standing stones. The loch is below, the lightning is close, and the finish is calling.',
    points: loop({ rx: 255, rz: 195, base: 56, amp: 24, wobble: 0.34, phase: 4.2 }),
    targetLap: 41000,
  },
  {
    id: 'london', name: 'Diagon Rooftop Dash', region: 'London Wizarding District',
    theme: 'london', time: 'dusk', weather: 'rain', wind: 0.3, difficulty: 2,
    laps: 2, tunnel: [10, 11], warp: [4], boost: [2, 8], count: 14,
    tagline: 'Rain-slicked slate, glowing shop windows and no room for error.',
    desc: 'Skim the chimneys of Diagon Alley and dive between gas lamps and owl post towers. Mind the washing lines.',
    points: loop({ rx: 178, rz: 138, base: 30, amp: 9, wobble: 0.28, phase: 1.2 }),
    targetLap: 33000,
  },
  {
    id: 'forest', name: 'Forbidden Hollow', region: 'The Forbidden Forest',
    theme: 'forest', time: 'night', weather: 'clear', wind: 0.22, difficulty: 2,
    laps: 2, tunnel: [5, 6, 7], warp: [8], boost: [3, 11], count: 14,
    tagline: 'Bioluminescent hollows and things that watch from the dark.',
    desc: 'Weave between ancient roots and glowing fungi. The trees lean closer with every lap. Stay on the path.',
    points: loop({ rx: 158, rz: 128, base: 24, amp: 11, wobble: 0.36, phase: 3.3 }),
    targetLap: 35000,
  },
  {
    id: 'alpine', name: 'Frostpeak Aurora', region: 'Snow-Covered Alps',
    theme: 'alpine', time: 'night', weather: 'snow', wind: 0.5, difficulty: 3,
    laps: 2, tunnel: [8, 9], warp: [6], boost: [2, 4, 12], count: 16,
    tagline: 'Aurora above, blizzard below, ice in your veins.',
    desc: 'Climb above the frozen lake and carve between glacier spires. The aurora lights the hoops — if you can see them.',
    points: loop({ rx: 238, rz: 192, base: 66, amp: 28, wobble: 0.3, phase: 5.4 }),
    targetLap: 42000,
  },
  {
    id: 'kyoto', name: 'Kyoto Lantern Ascent', region: 'Mahoutokoro, Japan',
    theme: 'kyoto', time: 'dawn', weather: 'clear', wind: 0.2, difficulty: 2,
    laps: 2, tunnel: [6, 7], warp: [3], boost: [1, 9, 12], count: 14,
    tagline: 'Cherry blossom winds and a thousand floating lanterns.',
    desc: 'Skim the rooftops of the mahoutokoro shrine as paper lanterns drift skyward. Every hoop is a torii gate to glory.',
    points: loop({ rx: 188, rz: 158, base: 40, amp: 15, wobble: 0.24, phase: 0.9 }),
    targetLap: 34500,
  },
  {
    id: 'cairo', name: 'Sunspire Sprint', region: 'Cairo, Egypt',
    theme: 'cairo', time: 'dusk', weather: 'clear', wind: 0.35, difficulty: 3,
    laps: 2, tunnel: [4, 5], warp: [8], boost: [2, 6, 11], count: 16,
    tagline: 'Pyramids, sunfire and a desert wind at your back.',
    desc: 'Race the setting sun past the pyramids and through obelisk gates. The desert heat turns the air to silk — and the sand to a wall.',
    points: loop({ rx: 220, rz: 172, base: 46, amp: 19, wobble: 0.26, phase: 2.8 }),
    targetLap: 38000,
  },
];

export const NATIONS = [
  { id: 'england', name: 'England', code: 'ENG', city: 'London', stadium: 'The Wembley of Wizardry', colors: ['#9e1b32', '#f3e7ce'], accent: '#e2b954', beast: 'Lion' },
  { id: 'france', name: 'France', code: 'FRA', city: 'Paris', stadium: 'Stade des Sortilèges', colors: ['#244b9b', '#eef2fa'], accent: '#cdd6e6', beast: 'Fleur' },
  { id: 'japan', name: 'Japan', code: 'JPN', city: 'Kyoto', stadium: 'Mahoutokoro Sky Bowl', colors: ['#b8243f', '#f7eee8'], accent: '#e8c36a', beast: 'Crane' },
  { id: 'brazil', name: 'Brazil', code: 'BRA', city: 'Rio', stadium: 'Estádio das Nuvens', colors: ['#1c7a4b', '#f3d34a'], accent: '#7dd8f0', beast: 'Macaw' },
  { id: 'egypt', name: 'Egypt', code: 'EGY', city: 'Cairo', stadium: 'The Sunspire Arena', colors: ['#b8862f', '#1d7d80'], accent: '#f2d37d', beast: 'Sphinx' },
  { id: 'norway', name: 'Norway', code: 'NOR', city: 'Bergen', stadium: 'Frostheim Bowl', colors: ['#2a5d8f', '#dfeef8'], accent: '#9fe8ff', beast: 'Fenrir' },
  { id: 'usa', name: 'United States', code: 'USA', city: 'New York', stadium: 'The Thunderdome', colors: ['#27345f', '#b23a48'], accent: '#e7c56a', beast: 'Thunderbird' },
  { id: 'australia', name: 'Australia', code: 'AUS', city: 'Melbourne', stadium: 'Sunburnt Sky Park', colors: ['#1f6b4a', '#e6b84c'], accent: '#f6e3a1', beast: 'Kangaroo' },
];

export const POSITIONS = [
  { id: 'chaser', name: 'Chaser', short: 'CH', icon: 'quaffle', color: '#e05d4f', desc: 'Take the Quaffle. Break through. Score ten points a goal.' },
  { id: 'beater', name: 'Beater', short: 'BE', icon: 'bludger', color: '#7c8fa8', desc: 'Swing the bat. Clear opponents and protect your ball carrier.' },
  { id: 'keeper', name: 'Keeper', short: 'KP', icon: 'hoop', color: '#7fc5a6', desc: 'Guard three hoops. Read the shot and dive to deny it.' },
  { id: 'seeker', name: 'Seeker', short: 'SE', icon: 'snitch', color: '#e8c45b', desc: 'Hunt the Golden Snitch. Catch it and end the match, +150.' },
];

export const DIFFICULTIES = [
  { id: 'rookie', name: 'Rookie', ai: 0.82, reward: 0.9, desc: 'Gentle winds. Room to learn.' },
  { id: 'pro', name: 'Professional', ai: 0.97, reward: 1.0, desc: 'A true contest.' },
  { id: 'world', name: 'World Class', ai: 1.1, reward: 1.25, desc: 'No mercy. Legends only.' },
];

export const TACTICS = [
  { id: 'defensive', name: 'Defensive', desc: 'Protect the hoops. Fewer goals, fewer risks.' },
  { id: 'balanced', name: 'Balanced', desc: 'A measured match from end to end.' },
  { id: 'aggressive', name: 'Aggressive', desc: 'Press high. Score fast — and leave gaps.' },
];

export const RACE_MODES = [
  { id: 'quick', name: 'Quick Race', icon: 'bolt', desc: 'Three rivals, golden hoops, full throttle.' },
  { id: 'trial', name: 'Time Trial', icon: 'clock', desc: 'Fly alone. Beat the clock and your best lap.' },
  { id: 'qualify', name: 'Qualifying', icon: 'flag', desc: 'One flying lap to set your grid position.' },
  { id: 'championship', name: 'Championship', icon: 'trophy', desc: 'Three circuits. One crown. Points decide everything.' },
];

export const CHAMPIONSHIP = {
  name: 'International Broom Grand Prix',
  tracks: ['hogwarts', 'highlands', 'alpine'],
  points: [25, 18, 15, 12, 10, 8],
};

export const CAREER_CHAPTERS = [
  {
    id: 'firstflight', title: 'First Flight', roman: 'I', icon: 'broom',
    desc: 'Complete any broom race and prove you belong in the sky.',
    hint: 'Finish a Quick Race, Time Trial or Championship race.',
    reward: { galleons: 250, xp: 120 },
    goal: s => Math.min(1, s.stats.races),
    count: 1,
  },
  {
    id: 'hogwartshero', title: 'Hogwarts Hero', roman: 'II', icon: 'castle',
    desc: 'Reach the podium on the Hogwarts Sky Circuit.',
    hint: 'Finish in the top three at Hogwarts.',
    reward: { galleons: 400, xp: 180 },
    goal: s => (s.stats.trackResults?.hogwarts?.bestPos ? (s.stats.trackResults.hogwarts.bestPos <= 3 ? 1 : 0) : 0),
    count: 1,
  },
  {
    id: 'worldstage', title: 'The World Stage', roman: 'III', icon: 'quidditch',
    desc: 'Win a Quidditch World Cup match for your nation.',
    hint: 'Win any tournament match.',
    reward: { galleons: 500, xp: 220 },
    goal: s => Math.min(1, s.quidditch.wins),
    count: 1,
  },
  {
    id: 'grandprix', title: 'Grand Prix Glory', roman: 'IV', icon: 'trophy',
    desc: 'Win the International Broom Grand Prix championship.',
    hint: 'Finish first overall in a three-race championship.',
    reward: { galleons: 750, xp: 300 },
    goal: s => Math.min(1, s.career.championships),
    count: 1,
  },
  {
    id: 'snitch', title: 'The Golden Snitch', roman: 'V', icon: 'snitch',
    desc: 'Catch the Golden Snitch in a World Cup match.',
    hint: 'Play as Seeker and get within grabbing distance.',
    reward: { galleons: 650, xp: 280 },
    goal: s => Math.min(1, s.quidditch.snitch),
    count: 1,
  },
  {
    id: 'worldchampion', title: 'World Champion', roman: 'VI', icon: 'cup',
    desc: 'Lift the Quidditch World Cup for your nation.',
    hint: 'Win the quarter-final, semi-final and final.',
    reward: { galleons: 2500, xp: 1000 },
    goal: s => Math.min(1, s.career.cups),
    count: 1,
  },
];

export const ACHIEVEMENTS = [
  { id: 'firstflight', name: 'First Flight', desc: 'Complete your first broom race.', icon: 'broom', goal: s => s.stats.races, count: 1, reward: 150 },
  { id: 'podium', name: 'On the Podium', desc: 'Finish a race in the top three.', icon: 'trophy', goal: s => s.stats.podiums, count: 1, reward: 200 },
  { id: 'winner', name: 'Golden Grip', desc: 'Win a broom race.', icon: 'medal', goal: s => s.stats.wins, count: 1, reward: 300 },
  { id: 'globetrotter', name: 'Globetrotter', desc: 'Race on five different circuits.', icon: 'map', goal: s => Object.keys(s.stats.trackResults || {}).length, count: 5, reward: 400 },
  { id: 'boostlord', name: 'Broom Magic', desc: 'Spend 120 seconds boosting.', icon: 'spark', goal: s => Math.floor(s.stats.boostTime || 0), count: 120, reward: 250 },
  { id: 'goals', name: 'Quaffle Hunter', desc: 'Score five Quaffle goals.', icon: 'quaffle', goal: s => s.quidditch.goals, count: 5, reward: 300 },
  { id: 'hattrick', name: 'Hat-Trick Hero', desc: 'Score three goals in one match.', icon: 'bolt', goal: s => s.stats.bestMatchGoals || 0, count: 3, reward: 350 },
  { id: 'saves', name: 'Wall of Iron', desc: 'Make five Keeper saves.', icon: 'hoop', goal: s => s.quidditch.saves, count: 5, reward: 300 },
  { id: 'bludger', name: 'Bludger Bruiser', desc: 'Land five Bludger hits.', icon: 'bludger', goal: s => s.quidditch.bludgers, count: 5, reward: 300 },
  { id: 'snitch', name: 'Snitch Catcher', desc: 'Catch the Golden Snitch.', icon: 'snitch', goal: s => s.quidditch.snitch, count: 1, reward: 500 },
  { id: 'champion', name: 'World Champion', desc: 'Win the Quidditch World Cup.', icon: 'cup', goal: s => s.career.cups, count: 1, reward: 1000 },
  { id: 'legend', name: 'Living Legend', desc: 'Reach level 10.', icon: 'star', goal: s => s.profile.level, count: 10, reward: 800 },
];

export const RACE_DIFFICULTY = DIFFICULTIES;

export const AI_NAMES = [
  'Cassia Flint', 'Mateo Delacroix', 'Yuki Takeda', 'Priya Nair', 'Ivo Krum',
  'Saoirse Quinn', 'Amara Okafor', 'Luca Bellini', 'Freya Lund', 'Darius Vance',
  'Nellie Park', 'Rafael Costa',
];

export const TEAM_ROSTERS = {
  england: ['A. Peverell', 'M. Thorne', 'S. Whitlock', 'J. Ashford', 'R. Lyle', 'B. Keane', 'E. Vane'],
  france: ['C. Delacour', 'L. Moreau', 'A. Rousseau', 'M. Girard', 'P. Laurent', 'S. Blanchet', 'N. Fontaine'],
  japan: ['H. Sato', 'K. Mori', 'Y. Takeda', 'R. Ito', 'A. Kuroda', 'M. Sano', 'T. Nakamura'],
  brazil: ['D. Silva', 'R. Costa', 'L. Almeida', 'B. Souza', 'I. Rocha', 'C. Mendes', 'J. Pereira'],
  egypt: ['K. Hassan', 'N. Farouk', 'A. Rahman', 'S. Nasser', 'T. Aziz', 'H. Mansour', 'M. Saleh'],
  norway: ['E. Lund', 'F. Berg', 'S. Dahl', 'O. Vik', 'H. Solberg', 'K. Aas', 'L. Fjord'],
  usa: ['J. Carter', 'D. Boone', 'M. Ellis', 'T. Reed', 'S. Cole', 'W. Hayes', 'A. Brooks'],
  australia: ['L. Hunter', 'N. Marsh', 'C. Dunn', 'R. Flynn', 'E. Walsh', 'T. Reid', 'M. Kerr'],
};

export const COMMENTARY = {
  raceStart: ['They are away! The hoops are calling!', 'And they’re off — brooms at full tilt!', 'A clean start. Now the sky belongs to them.'],
  lap: ['Final lap! Everything to fly for!', 'The pace is relentless as they begin another lap.', 'The crowd is on its feet — this is broom racing!'],
  boost: ['A burst of broom magic!', 'Look at that acceleration!', 'They’re riding the wind now!'],
  warp: ['A reckless shortcut through the veil!', 'Through the dark gate — brave or foolish?', 'The shortcut bites back!'],
  hit: ['A nasty clip! That will cost precious time.', 'Collision! The circuit bites!', 'They’re shaken, but still flying!'],
  win: ['A magnificent victory! The crowd erupts!', 'First across the line — what a flight!', 'A performance worthy of the World Cup!'],
  lose: ['A valiant flight, but the day belongs to another.', 'So close — and yet the hoops keep their secrets.', 'The circuit is cruel today. There is always another race.'],
  quidStart: ['The Quaffle is released — the World Cup is alive!', 'Captains shake hands, brooms rise. Quidditch begins!', 'Ninety thousand voices, one magnificent match!'],
  goal: ['GOAL! The Quaffle sails clean through!', 'Ten points! What a strike!', 'The hoops shudder — it’s a goal!'],
  save: ['Denied! A spectacular save!', 'The Keeper reads it all the way!', 'No way through — what reflexes!'],
  bludger: ['A Bludger with bad intentions!', 'Crunching hit! The carrier is down!', 'The Beaters are earning their keep!'],
  snitch: ['The Snitch is loose! Seekers, after it!', 'A flash of gold in the sun — the chase is on!', 'The Golden Snitch! This could decide everything!'],
  snitchCatch: ['CAUGHT! The Golden Snitch! One hundred and fifty points!', 'They have the Snitch — the World Cup is decided!', 'A blur of gold, a closed fist — the match is over!'],
  time: ['The whistle goes! What a match!', 'Full time — the scoreboard tells the story.'],
  tackle: ['A brave interception!', 'Turnover! The Quaffle changes hands!'],
};
