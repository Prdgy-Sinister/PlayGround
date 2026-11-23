/* ============================================================
   TOKYO REDLINE — game data
   All names are used for homage / classification only.
   ============================================================ */

export const PAINTS = [
  { id: 'factory', name: 'Factory Colour', color: 0xffffff, accent: 0xffffff, cost: 0, rarity: 'stock' },
  { id: 'midnight', name: 'Midnight Purple', color: 0x4b1f78, accent: 0xff2d95, cost: 0, rarity: 'icon' },
  { id: 'bayside', name: 'Bayside Blue', color: 0x1176ff, accent: 0xf5f2e9, cost: 450, rarity: 'icon' },
  { id: 'spark', name: 'Spark Yellow', color: 0xffd21f, accent: 0x17151b, cost: 450, rarity: 'common' },
  { id: 'sakura', name: 'Sakura Storm', color: 0xff5fa8, accent: 0x6af7ff, cost: 650, rarity: 'rare' },
  { id: 'toxic', name: 'Toxic Lime', color: 0xb9ff2f, accent: 0x17151b, cost: 650, rarity: 'rare' },
  { id: 'sunset', name: 'Sunset Chrome', color: 0xff6b21, accent: 0xffdf58, cost: 900, rarity: 'rare' },
  { id: 'ice', name: 'Ice Pearl', color: 0xe9fbff, accent: 0x16d6ff, cost: 900, rarity: 'rare' },
  { id: 'candy', name: 'Candy Apple', color: 0xe01832, accent: 0xffe8c7, cost: 1100, rarity: 'epic' },
  { id: 'cyber', name: 'Cyber Teal', color: 0x13e8c0, accent: 0x251447, cost: 1100, rarity: 'epic' },
  { id: 'monochrome', name: 'Kuro Mono', color: 0x25242c, accent: 0xf7f4ea, cost: 1300, rarity: 'epic' },
  { id: 'gold', name: 'Topaz Gold', color: 0xd1a224, accent: 0x18171d, cost: 1800, rarity: 'legend' },
  { id: 'chroma', name: 'Chroma Flare', color: 0xff2bd1, accent: 0x8bffe4, cost: 2400, rarity: 'legend' }
];

export const BODY_KITS = {
  stock: { id: 'stock', name: 'Stock Body', cost: 0, width: 0, lip: 0, canards: false },
  street: { id: 'street', name: 'Street Aero', cost: 700, width: 0.04, lip: 0.08, canards: false },
  wide: { id: 'wide', name: 'Widebody Type-X', cost: 2400, width: 0.18, lip: 0.12, canards: true },
  timeattack: { id: 'timeattack', name: 'Time Attack', cost: 4200, width: 0.26, lip: 0.18, canards: true, splitter: true }
};

export const SPOILERS = {
  stock: { id: 'stock', name: 'Factory Lip', cost: 0, kind: 'lip' },
  duck: { id: 'duck', name: 'Ducktail', cost: 350, kind: 'duck' },
  gt: { id: 'gt', name: 'GT Wing', cost: 950, kind: 'gt' },
  tower: { id: 'tower', name: 'Tower Wing', cost: 1800, kind: 'tower' }
};

export const WHEELS = {
  mesh: { id: 'mesh', name: 'Mesh 01', cost: 0, kind: 'mesh', rim: 0xd9dde8 },
  six: { id: 'six', name: '6-Spoke', cost: 500, kind: 'six', rim: 0xebe6d4 },
  dish: { id: 'dish', name: 'Deep Dish', cost: 900, kind: 'dish', rim: 0xffcf57 },
  star: { id: 'star', name: 'Star Forged', cost: 1300, kind: 'star', rim: 0xff4d9f },
  blade: { id: 'blade', name: 'Blade Mag', cost: 1900, kind: 'blade', rim: 0x20e3ff },
  chrome: { id: 'chrome', name: 'Chrome Turbo', cost: 2600, kind: 'chrome', rim: 0xffffff }
};

export const UNDERGLOW = {
  off: { id: 'off', name: 'No Glow', color: 0x000000, cost: 0 },
  pink: { id: 'pink', name: 'Pink Pulse', color: 0xff2fa0, cost: 450 },
  cyan: { id: 'cyan', name: 'Cyan Surge', color: 0x20e8ff, cost: 450 },
  green: { id: 'green', name: 'Acid Glow', color: 0x7aff36, cost: 700 },
  violet: { id: 'violet', name: 'Violet Haze', color: 0xa34dff, cost: 900 }
};

export const HEADLIGHTS = {
  warm: { id: 'warm', name: 'Warm Halogen', color: 0xffefbd, cost: 0 },
  ice: { id: 'ice', name: 'Ice LED', color: 0xc8f5ff, cost: 250 },
  gold: { id: 'gold', name: 'Golden JDM', color: 0xffbc24, cost: 450 },
  blue: { id: 'blue', name: 'Blue Beam', color: 0x5ab6ff, cost: 600 },
  pink: { id: 'pink', name: 'Neon Pink', color: 0xff56c8, cost: 850 }
};

export const DECALS = {
  none: { id: 'none', name: 'Clean Paint', cost: 0 },
  stripe: { id: 'stripe', name: 'Race Stripe', cost: 300 },
  rising: { id: 'rising', name: 'Rising Sun', cost: 700 },
  kanji: { id: 'kanji', name: 'Kanji Side', cost: 850 },
  lightning: { id: 'lightning', name: 'Lightning Bolt', cost: 1100 },
  camo: { id: 'camo', name: 'City Camo', cost: 1400 }
};

export const ENGINES = {
  stock: { id: 'stock', name: 'Factory Engine', cost: 0, power: 0, torque: 0, sound: null, code: null },
  rb26: { id: 'rb26', name: 'RB26DETT 2.6 I6', cost: 5200, power: 95, torque: 120, sound: 'rb', code: 'RB26DETT', turbo: true, note: 'Legendary iron-block six' },
  twojz: { id: 'twojz', name: '2JZ-GTE 3.0 I6', cost: 5700, power: 105, torque: 140, sound: '2jz', code: '2JZ-GTE', turbo: true, note: 'The indestructible straight-six' },
  k20: { id: 'k20', name: 'K20A 2.0 I4', cost: 3900, power: 62, torque: 52, sound: 'vtec', code: 'K20A', turbo: false, note: 'Eight thousand RPM scream' },
  thirteenb: { id: 'thirteenb', name: '13B-REW Rotary', cost: 4600, power: 80, torque: 70, sound: 'rotary', code: '13B-REW', turbo: true, note: 'Braap. Braap. Braaaap.' },
  fourg63: { id: 'fourg63', name: '4G63T 2.0 I4', cost: 4300, power: 78, torque: 105, sound: '4g63', code: '4G63T', turbo: true, note: 'Rally-bred boost monster' },
  ej20: { id: 'ej20', name: 'EJ207 2.0 Flat-4', cost: 4400, power: 76, torque: 96, sound: 'ej', code: 'EJ207', turbo: true, note: 'Boxer rumble, all-wheel grip' },
  vq38: { id: 'vq38', name: 'VQ38DETT V6', cost: 6100, power: 120, torque: 130, sound: 'v6', code: 'VQ38DETT', turbo: true, note: 'Wide V6 muscle' }
};

export const TURBOS = {
  stock: { id: 'stock', name: 'Factory Turbo', cost: 0, boost: 0, lag: 1, sound: 0 },
  street: { id: 'street', name: 'Street Spool', cost: 1400, boost: 0.18, lag: 0.8, sound: 0.4 },
  big: { id: 'big', name: 'Big Single', cost: 3400, boost: 0.38, lag: 1.4, sound: 0.9, flutter: true },
  twin: { id: 'twin', name: 'Twin Screamer', cost: 5200, boost: 0.52, lag: 0.9, sound: 1.1, flutter: true }
};

export const ECUS = {
  stock: { id: 'stock', name: 'Factory ECU', cost: 0, torque: 0, redline: 0 },
  street: { id: 'street', name: 'Street Tune', cost: 900, torque: 18, redline: 150 },
  race: { id: 'race', name: 'Race ROM', cost: 2200, torque: 42, redline: 450 },
  anti: { id: 'anti', name: 'Anti-Lag Map', cost: 3800, torque: 58, redline: 650, antiLag: true }
};

export const EXHAUSTS = {
  stock: { id: 'stock', name: 'Factory Exhaust', cost: 0, tone: 0, tips: 1 },
  catback: { id: 'catback', name: 'Cat-Back', cost: 550, tone: 0.4, tips: 1 },
  titanium: { id: 'titanium', name: 'Titanium Burnt', cost: 1400, tone: 0.8, tips: 2 },
  straight: { id: 'straight', name: 'Straight Pipe', cost: 2100, tone: 1.2, tips: 2 }
};

export const INTERIORS = {
  black: { id: 'black', name: 'Black Alcantara', cost: 0, main: 0x18171b, accent: 0x34323b },
  red: { id: 'red', name: 'Rosso Bucket', cost: 650, main: 0x3a111a, accent: 0xff355e },
  cream: { id: 'cream', name: 'Cream Touring', cost: 650, main: 0x4b3a29, accent: 0xf4dcb4 },
  teal: { id: 'teal', name: 'Cyber Teal', cost: 850, main: 0x10252a, accent: 0x20e8c8 },
  violet: { id: 'violet', name: 'Midnight Violet', cost: 950, main: 0x241536, accent: 0xc27bff }
};

export const SEATS = {
  stock: { id: 'stock', name: 'Factory Seat', cost: 0, bolster: 1, carbon: false },
  bucket: { id: 'bucket', name: 'Bucket Seat', cost: 700, bolster: 1.15, carbon: false },
  carbon: { id: 'carbon', name: 'Carbon Shell', cost: 1300, bolster: 1.24, carbon: true }
};

export const KNOBS = {
  ball: { id: 'ball', name: 'Titanium Ball', cost: 0, color: 0xb8bcc7, shape: 'ball' },
  katana: { id: 'katana', name: 'Katana Grip', cost: 450, color: 0x30405c, shape: 'long' },
  sakura: { id: 'sakura', name: 'Sakura Crystal', cost: 650, color: 0xff82c4, shape: 'ball' },
  neon: { id: 'neon', name: 'Neon Shift', cost: 900, color: 0x49ffe0, shape: 'ball' }
};

export const DEFAULT_BUILD = {
  paint: 'factory',
  bodykit: 'stock',
  spoiler: 'stock',
  wheels: 'mesh',
  underglow: 'off',
  headlights: 'warm',
  decal: 'none',
  engine: 'stock',
  turbo: 'stock',
  ecu: 'stock',
  exhaust: 'stock',
  interior: 'black',
  seat: 'stock',
  knob: 'ball'
};

export const TRACKS = [
  {
    id: 'tokyo', name: 'TOKYO NEON CITY', jp: '東京', short: 'NEON CITY',
    tagline: 'Rain-slick asphalt under a sky made of signs.',
    kind: 'city', unlockWins: 0, difficulty: 1,
    colors: { top: 0x210b4a, bottom: 0xff6a8e, fog: 0x33134c, road: 0x181421, glow: 0xff2d9a, accent: 0x25f4ff, warm: 0xffc44d },
    skyline: 1.0, rain: true, crowd: 1.0, props: ['city', 'signs', 'torii']
  },
  {
    id: 'osaka', name: 'OSAKA STREET DISTRICT', jp: '大阪', short: 'OSAKA',
    tagline: 'Loud shops, louder exhausts. Dotonbori after dark.',
    kind: 'osaka', unlockWins: 1, difficulty: 1.2,
    colors: { top: 0x09072b, bottom: 0xff854d, fog: 0x28113b, road: 0x1d1922, glow: 0xffd52e, accent: 0x3b7bff, warm: 0xff7733 },
    skyline: 0.75, rain: false, crowd: 1.2, props: ['osaka', 'signs', 'ferris']
  },
  {
    id: 'yokohama', name: 'YOKOHAMA WATERFRONT', jp: '横浜', short: 'BAY BREEZE',
    tagline: 'Twin-lane pulls beside the midnight bay.',
    kind: 'waterfront', unlockWins: 2, difficulty: 1.35,
    colors: { top: 0x05133e, bottom: 0x45e2ff, fog: 0x12254d, road: 0x18252f, glow: 0x1be7ff, accent: 0xffdc5e, warm: 0xffb07a },
    skyline: 0.68, rain: false, crowd: 0.7, props: ['water', 'containers', 'ferris', 'bridge']
  },
  {
    id: 'mountain', name: 'MOUNTAIN PASS', jp: '山道', short: 'TOUGE',
    tagline: 'Cold air. Hot tyres. Cherry blossoms in the headlights.',
    kind: 'mountain', unlockWins: 4, difficulty: 1.5,
    colors: { top: 0x071a27, bottom: 0xffb6b6, fog: 0x1a2a36, road: 0x242126, glow: 0xff8fb9, accent: 0x8dffc1, warm: 0xffb14e },
    skyline: 0.05, rain: false, crowd: 0.45, props: ['mountain', 'trees', 'torii']
  },
  {
    id: 'garage', name: 'UNDERGROUND GARAGE', jp: '地下', short: 'GARAGE',
    tagline: 'Concrete walls, neon tubes, zero street legality.',
    kind: 'garage', unlockWins: 5, difficulty: 1.62,
    colors: { top: 0x0d0a13, bottom: 0x372344, fog: 0x120d18, road: 0x1a181d, glow: 0x29f3c7, accent: 0xff3f8e, warm: 0xffd868 },
    skyline: 0, rain: false, crowd: 0.3, props: ['garage']
  },
  {
    id: 'harbour', name: 'INDUSTRIAL HARBOUR', jp: '港湾', short: 'DOCKYARD',
    tagline: 'Crane silhouettes and sodium haze at 3AM.',
    kind: 'harbour', unlockWins: 6, difficulty: 1.75,
    colors: { top: 0x0d1b1b, bottom: 0xffa51f, fog: 0x1e2926, road: 0x1e1a1a, glow: 0xffa21b, accent: 0x65ffcf, warm: 0xffd24a },
    skyline: 0.25, rain: false, crowd: 0.55, props: ['containers', 'cranes', 'water', 'warehouse']
  },
  {
    id: 'airport', name: 'NARITA RUNWAY', jp: '空港', short: 'RUNWAY',
    tagline: 'Permission denied. Throttle accepted.',
    kind: 'airport', unlockWins: 7, difficulty: 1.88,
    colors: { top: 0x081225, bottom: 0x9dc7ff, fog: 0x223247, road: 0x20232a, glow: 0x2f9dff, accent: 0xfff07a, warm: 0xffcb73 },
    skyline: 0.1, rain: false, crowd: 0.4, props: ['airport', 'planes', 'tower']
  },
  {
    id: 'coast', name: 'SUNSET COAST HIGHWAY', jp: '海岸', short: 'COASTLINE',
    tagline: 'Palm trees, ocean spray, and a sky on fire.',
    kind: 'coast', unlockWins: 8, difficulty: 2.0,
    colors: { top: 0x4c1c56, bottom: 0xffd05c, fog: 0x6e2b4d, road: 0x26202b, glow: 0xff6f72, accent: 0x5fffd8, warm: 0xffa13d },
    skyline: 0.08, rain: false, crowd: 0.65, props: ['coast', 'palms', 'water', 'pier']
  },
  {
    id: 'countryside', name: 'JAPANESE COUNTRYSIDE', jp: '田舎', short: 'RICE FIELDS',
    tagline: 'Torii gates, rice paddies and a straight old road.',
    kind: 'countryside', unlockWins: 10, difficulty: 2.1,
    colors: { top: 0x1d3557, bottom: 0xffd7a1, fog: 0x63715a, road: 0x32312d, glow: 0xffaa57, accent: 0x8bffa6, warm: 0xffd66f },
    skyline: 0.02, rain: false, crowd: 0.4, props: ['country', 'fields', 'torii', 'mountain', 'trees']
  },
  {
    id: 'future', name: 'NEO TOKYO DRAG STRIP', jp: '未来', short: 'NEO TOKYO',
    tagline: 'A holographic ribbon cut through the megacity.',
    kind: 'future', unlockWins: 12, difficulty: 2.3,
    colors: { top: 0x030516, bottom: 0x4b2eff, fog: 0x10092b, road: 0x111020, glow: 0xff2bd6, accent: 0x35fff2, warm: 0xffd54f },
    skyline: 0.8, rain: false, crowd: 1.0, props: ['future', 'city', 'signs', 'hologram']
  }
];

export const RIVALS = [
  { id: 'kaze', name: 'KAZE', crew: 'Neon Cats', car: 'nissan-s13', skill: 0.72, reward: 900, minWins: 0, taunt: 'Your clutch is louder than your turbo.' },
  { id: 'mika', name: 'MIKA 86', crew: 'Downhill Club', car: 'toyota-ae86', skill: 0.8, reward: 1200, minWins: 0, taunt: 'No grip? No problem.' },
  { id: 'jin', name: 'JIN', crew: 'Bay Side Kings', car: 'mazda-rx7-fd', skill: 0.9, reward: 1700, minWins: 1, taunt: 'Rotary music is the only music.' },
  { id: 'riko', name: 'RIKO', crew: 'Team Zer0', car: 'honda-civic-ek9', skill: 0.97, reward: 2200, minWins: 2, taunt: 'VTEC just kicked in, baby.' },
  { id: 'tomo', name: 'TOMO', crew: 'Osaka Allstars', car: 'toyota-chaser', skill: 1.03, reward: 2900, minWins: 3, taunt: 'Four doors, no mercy.' },
  { id: 'ai', name: 'AIKO', crew: 'Snow Line', car: 'subaru-wrx-va', skill: 1.1, reward: 3600, minWins: 5, taunt: 'Launch it, or lose it.' },
  { id: 'bunta', name: 'BUNTA-X', crew: 'Mountain Ghosts', car: 'subaru-22b', skill: 1.18, reward: 4800, minWins: 6, taunt: 'You are already in my mirror.' },
  { id: 'goro', name: 'GORO', crew: 'Steel Titans', car: 'mitsubishi-3000gt', skill: 1.27, reward: 6200, minWins: 8, taunt: 'Three thousand horsepower? Close enough.' },
  { id: 'rei', name: 'REI', crew: 'Blackbird', car: 'nissan-r34z', skill: 1.36, reward: 8200, minWins: 10, taunt: 'Godzilla remembers everything.' },
  { id: 'zero', name: 'ZER0', crew: 'Night Shift', car: 'honda-nsx-r', skill: 1.48, reward: 12000, minWins: 13, taunt: 'There is no finish line after me.' }
];

export const EVENTS = [
  {
    id: 'neon-sprint', type: 'sprint', name: 'NEON NIGHTS SPRINT', jp: '夜間走行',
    blurb: 'A quick quarter-mile shootout under the Tokyo signs.',
    track: 'tokyo', distance: 'quarter', rounds: 1, reward: 2400,
    rival: 'kaze', color: '#ff2d9a', minWins: 0, badge: 'DAILY'
  },
  {
    id: 'osaka-showdown', type: 'sprint', name: 'OSAKA SHOWDOWN', jp: '大阪', blurb: 'Half-mile street fight. Bring spare tyres.',
    track: 'osaka', distance: 'half', rounds: 1, reward: 5200,
    rival: 'tomo', color: '#ffd52e', minWins: 2, badge: 'SPECIAL'
  },
  {
    id: 'bay-king', type: 'championship', name: 'BAY KING CUP', jp: '横浜', blurb: 'Three rounds. Three shores. One crown.',
    track: 'yokohama', races: ['yokohama', 'coast', 'airport'], distance: 'quarter', rounds: 3, reward: 16000,
    rival: 'jin', color: '#12d9ff', minWins: 3, badge: '3 ROUNDS'
  },
  {
    id: 'mountain-legend', type: 'championship', name: 'MOUNTAIN LEGEND', jp: '山道', blurb: 'The old guard come down from the pass.',
    track: 'mountain', races: ['mountain', 'countryside', 'future'], distance: 'half', rounds: 3, reward: 30000,
    rival: 'bunta', color: '#ff8fb9', minWins: 5, badge: '3 ROUNDS'
  },
  {
    id: 'zero-hour', type: 'exclusive', name: 'ZERO HOUR', jp: '零時', blurb: 'Defeat ZER0 beneath the holographic sky. Win a legend.',
    track: 'future', distance: 'half', rounds: 1, reward: 45000,
    rival: 'zero', color: '#a34dff', minWins: 8, badge: 'RARE CAR', prizeCar: 'honda-nsx-r'
  }
];

/* Compact car factory keeps the roster readable while preserving per-car stats. */
const defaults = {
  type: 'coupe', style: 'smooth', drivetrain: 'RWD', gearbox: 'six',
  wheelStyle: 'mesh', spoiler: 'lip', engineSound: 'i4', turbo: false,
  rarity: 'common', exclusive: false, unlockWins: 0, tagline: ''
};

function make(car) {
  const merged = { ...defaults, ...car };
  const g = car.gears || [3.62, 2.24, 1.61, 1.27, 1.03, 0.84];
  return {
    ...merged,
    gears: g,
    finalDrive: car.finalDrive || 3.9,
    idle: car.idle || 900,
    redline: car.redline || 7600,
    wheels: car.wheels || { size: car.type === 'kei' ? 0.25 : 0.33, width: car.type === 'super' ? 0.22 : 0.2 },
    grip: car.grip || (merged.drivetrain === 'AWD' ? 1.16 : merged.drivetrain === 'FWD' ? 1.02 : 1.08),
    dims: car.dims || dimsFor(merged.type, merged.style)
  };
}

function dimsFor(type, style) {
  const presets = {
    coupe: { length: 4.48, width: 1.78, height: 1.34, cabin: 1.62, roof: 0.5, hood: 1.45, deck: 1.2, wheelbase: 2.62, track: 1.54 },
    sedan: { length: 4.68, width: 1.78, height: 1.4, cabin: 1.92, roof: 0.54, hood: 1.35, deck: 1.22, wheelbase: 2.72, track: 1.53 },
    hatch: { length: 4.08, width: 1.74, height: 1.43, cabin: 1.96, roof: 0.62, hood: 1.02, deck: 0.5, wheelbase: 2.58, track: 1.53 },
    super: { length: 4.42, width: 1.9, height: 1.19, cabin: 1.36, roof: 0.42, hood: 1.54, deck: 1.08, wheelbase: 2.58, track: 1.62 },
    roadster: { length: 3.96, width: 1.7, height: 1.22, cabin: 0.8, roof: 0.1, hood: 1.44, deck: 0.84, wheelbase: 2.31, track: 1.47 },
    kei: { length: 3.36, width: 1.48, height: 1.36, cabin: 1.42, roof: 0.5, hood: 0.72, deck: 0.48, wheelbase: 2.16, track: 1.3 },
    wagon: { length: 4.76, width: 1.8, height: 1.46, cabin: 2.42, roof: 0.56, hood: 1.22, deck: 0.54, wheelbase: 2.76, track: 1.54 }
  };
  const d = { ...presets[type] };
  if (style === 'boxy') { d.height += 0.05; d.roof += 0.03; }
  if (style === 'wedge') { d.height -= 0.05; d.hood += 0.1; d.roof -= 0.02; }
  if (style === 'tall') { d.height += 0.08; d.roof += 0.05; }
  if (style === 'wide') { d.width += 0.1; d.track += 0.06; }
  return d;
}

export const CARS = [
  /* ---------------- NISSAN ---------------- */
  make({
    id: 'nissan-r32', make: 'NISSAN', name: 'SKYLINE GT-R R32', short: 'R32', year: 1993,
    color: 0x5b636d, accent: 0xc8ced6, type: 'coupe', style: 'boxy', drivetrain: 'AWD',
    engine: 'RB26DETT', engineSound: 'rb', power: 276, torque: 353, weight: 1430, redline: 8000, turbo: true,
    price: 42000, rarity: 'rare', gearbox: 'awd', gears: [3.46, 2.13, 1.52, 1.17, 0.96, 0.79], finalDrive: 4.11,
    wheelStyle: 'six', spoiler: 'lip', tagline: 'The original Godzilla. All-wheel launch, zero apologies.',
    dims: { length: 4.54, width: 1.82, height: 1.36, cabin: 1.62, roof: 0.5, hood: 1.45, deck: 1.2, wheelbase: 2.62, track: 1.56 },
    grip: 1.23, exclusive: false, unlockWins: 2, interior: 'black'
  }),
  make({
    id: 'nissan-r33', make: 'NISSAN', name: 'SKYLINE GT-R R33', short: 'R33', year: 1997,
    color: 0xf0efe7, accent: 0x2255ff, type: 'coupe', style: 'smooth', drivetrain: 'AWD',
    engine: 'RB26DETT', engineSound: 'rb', power: 280, torque: 368, weight: 1510, redline: 8000, turbo: true,
    price: 51000, rarity: 'rare', gears: [3.46, 2.13, 1.52, 1.17, 0.96, 0.79], finalDrive: 4.11,
    wheelStyle: 'mesh', spoiler: 'gt', tagline: 'The big, broad shouldered GT-R. Born for the Wangan.',
    grip: 1.24, unlockWins: 3, interior: 'cream'
  }),
  make({
    id: 'nissan-r34', make: 'NISSAN', name: 'SKYLINE GT-R R34', short: 'R34', year: 2002,
    color: 0x1a75dc, accent: 0xd8e3ee, type: 'coupe', style: 'boxy', drivetrain: 'AWD',
    engine: 'RB26DETT', engineSound: 'rb', power: 300, torque: 392, weight: 1560, redline: 8200, turbo: true,
    price: 88000, rarity: 'epic', gears: [3.51, 2.17, 1.55, 1.2, 0.97, 0.8], finalDrive: 3.96,
    wheelStyle: 'six', spoiler: 'tower', tagline: 'Midnight blue icon. The dashboard does the talking.',
    grip: 1.26, unlockWins: 5, interior: 'black'
  }),
  make({
    id: 'nissan-r34z', make: 'NISSAN', name: 'SKYLINE GT-R Z-TUNE', short: 'Z-TUNE', year: 2005,
    color: 0x9b9ea7, accent: 0xff2d6a, type: 'coupe', style: 'wide', drivetrain: 'AWD',
    engine: 'RB26DETT', engineSound: 'rb', power: 360, torque: 450, weight: 1460, redline: 8600, turbo: true,
    price: null, rarity: 'legend', exclusive: true, unlockWins: 10,
    wheelStyle: 'chrome', spoiler: 'tower', tagline: 'Hand-built, silver, and absolutely not subtle.',
    grip: 1.34, interior: 'red', decal: 'stripe'
  }),
  make({
    id: 'nissan-r35', make: 'NISSAN', name: 'GT-R R35', short: 'GODZILLA', year: 2017,
    color: 0x8f929c, accent: 0xff3300, type: 'super', style: 'wide', drivetrain: 'AWD',
    engine: 'VR38DETT', engineSound: 'v6', power: 565, torque: 637, weight: 1745, redline: 7500, turbo: true,
    price: 165000, rarity: 'epic', gears: [3.21, 2.08, 1.52, 1.18, 0.95, 0.78], finalDrive: 3.7,
    wheelStyle: 'blade', spoiler: 'gt', tagline: 'A supercomputer with a turbo V6. Launch control engaged.',
    grip: 1.4, unlockWins: 7, interior: 'red',
    dims: { length: 4.71, width: 1.9, height: 1.36, cabin: 1.72, roof: 0.49, hood: 1.6, deck: 1.12, wheelbase: 2.78, track: 1.62 }
  }),
  make({
    id: 'nissan-s13', make: 'NISSAN', name: 'SILVIA S13', short: 'S13', year: 1991,
    color: 0xf7f1d8, accent: 0xff3f84, type: 'coupe', style: 'wedge', drivetrain: 'RWD',
    engine: 'SR20DET', engineSound: 'sr', power: 205, torque: 275, weight: 1180, redline: 7600, turbo: true,
    price: 14500, rarity: 'common', gears: [3.52, 2.05, 1.46, 1.17, 0.96, 0.79], finalDrive: 4.08,
    wheelStyle: 'mesh', spoiler: 'duck', tagline: 'Pop-up headlights, zero fear. The drift tax is real.',
    grip: 1.06, unlockWins: 0, interior: 'black', decal: 'stripe'
  }),
  make({
    id: 'nissan-s14', make: 'NISSAN', name: 'SILVIA S14 KOUKI', short: 'S14', year: 1998,
    color: 0x2ace74, accent: 0x17151b, type: 'coupe', style: 'smooth', drivetrain: 'RWD',
    engine: 'SR20DET', engineSound: 'sr', power: 220, torque: 288, weight: 1240, redline: 7800, turbo: true,
    price: 23500, rarity: 'common', gears: [3.52, 2.05, 1.46, 1.17, 0.96, 0.79], finalDrive: 4.08,
    wheelStyle: 'six', spoiler: 'duck', tagline: 'Angry eyes, clean lines, permanent tyre smoke.',
    grip: 1.08, unlockWins: 1, interior: 'teal'
  }),
  make({
    id: 'nissan-s15', make: 'NISSAN', name: 'SILVIA S15 SPEC-R', short: 'S15', year: 2002,
    color: 0x29a7ff, accent: 0xf4f3ea, type: 'coupe', style: 'smooth', drivetrain: 'RWD',
    engine: 'SR20DET', engineSound: 'sr', power: 250, torque: 303, weight: 1250, redline: 8000, turbo: true,
    price: 39000, rarity: 'rare', gears: [3.63, 2.19, 1.56, 1.23, 1.0, 0.82], finalDrive: 3.69,
    wheelStyle: 'star', spoiler: 'gt', tagline: 'The final Silvia. Peak 2000s street style.',
    grip: 1.12, unlockWins: 2, interior: 'black'
  }),
  make({
    id: 'nissan-350z', make: 'NISSAN', name: 'FAIRLADY Z 350Z', short: '350Z', year: 2004,
    color: 0xff7a1a, accent: 0x1e1b22, type: 'coupe', style: 'wedge', drivetrain: 'RWD',
    engine: 'VQ35DE', engineSound: 'v6', power: 287, torque: 371, weight: 1495, redline: 7000, turbo: false,
    price: 32000, rarity: 'common', gears: [3.79, 2.27, 1.55, 1.21, 1.0, 0.79], finalDrive: 3.54,
    wheelStyle: 'six', spoiler: 'lip', tagline: 'Big V6 brawler with a perfect exhaust note.',
    grip: 1.1, unlockWins: 2, interior: 'cream'
  }),
  make({
    id: 'nissan-370z', make: 'NISSAN', name: 'FAIRLADY Z 370Z', short: '370Z', year: 2014,
    color: 0xf1c728, accent: 0x17151b, type: 'coupe', style: 'wide', drivetrain: 'RWD',
    engine: 'VQ37VHR', engineSound: 'v6', power: 332, torque: 374, weight: 1540, redline: 7600, turbo: false,
    price: 48000, rarity: 'rare', gears: [3.79, 2.27, 1.55, 1.21, 1.0, 0.79], finalDrive: 3.54,
    wheelStyle: 'blade', spoiler: 'gt', tagline: 'Short wheelbase, long revs, sharp elbows.',
    grip: 1.14, unlockWins: 3, interior: 'black'
  }),
  make({
    id: 'nissan-180sx', make: 'NISSAN', name: '180SX TYPE-X', short: '180SX', year: 1996,
    color: 0xff3a44, accent: 0xf7f1dc, type: 'hatch', style: 'wedge', drivetrain: 'RWD',
    engine: 'SR20DET', engineSound: 'sr', power: 205, torque: 275, weight: 1200, redline: 7600, turbo: true,
    price: 18500, rarity: 'common', gears: [3.52, 2.05, 1.46, 1.17, 0.96, 0.79], finalDrive: 4.08,
    wheelStyle: 'dish', spoiler: 'duck', tagline: 'Glass hatch, pop-ups, and infinite street cred.',
    grip: 1.08, unlockWins: 1, interior: 'red', decal: 'kanji'
  }),
  make({
    id: 'nissan-240zg', make: 'NISSAN', name: 'FAIRLADY 240ZG', short: '240ZG', year: 1972,
    color: 0xb9d44c, accent: 0xf1ead5, type: 'coupe', style: 'smooth', drivetrain: 'RWD',
    engine: 'L24', engineSound: 'i6', power: 160, torque: 210, weight: 1080, redline: 6500, turbo: false,
    price: 68000, rarity: 'epic', gears: [3.32, 2.08, 1.43, 1.0], finalDrive: 3.9,
    wheelStyle: 'chrome', spoiler: 'lip', tagline: 'The original Z. G-nose, fender mirrors, pure soul.',
    grip: 1.02, unlockWins: 6, interior: 'cream', decal: 'rising'
  }),
  make({
    id: 'nissan-stagea', make: 'NISSAN', name: 'STAGEA 260RS', short: 'STAGEA', year: 1998,
    color: 0x6d5bce, accent: 0xf2eedf, type: 'wagon', style: 'boxy', drivetrain: 'AWD',
    engine: 'RB26DETT', engineSound: 'rb', power: 276, torque: 353, weight: 1720, redline: 8000, turbo: true,
    price: 61000, rarity: 'rare', gears: [3.46, 2.13, 1.52, 1.17, 0.96, 0.79], finalDrive: 4.11,
    wheelStyle: 'six', spoiler: 'lip', tagline: 'The family truckster that ate supercars.',
    grip: 1.24, unlockWins: 5, interior: 'cream'
  }),
  make({
    id: 'nissan-pulsar', make: 'NISSAN', name: 'PULSAR GTI-R', short: 'GTI-R', year: 1992,
    color: 0xff4c35, accent: 0xf4f0e6, type: 'hatch', style: 'tall', drivetrain: 'AWD',
    engine: 'SR20DET', engineSound: 'sr', power: 227, torque: 285, weight: 1220, redline: 7600, turbo: true,
    price: 27000, rarity: 'rare', gears: [3.52, 2.05, 1.46, 1.17, 0.96, 0.79], finalDrive: 4.08,
    wheelStyle: 'mesh', spoiler: 'tower', tagline: 'A rally rocket with a hood scoop and no manners.',
    grip: 1.25, unlockWins: 3, interior: 'black'
  }),

  /* ---------------- TOYOTA ---------------- */
  make({
    id: 'toyota-supra-mk3', make: 'TOYOTA', name: 'SUPRA MK3', short: 'MK3', year: 1990,
    color: 0xe9e7df, accent: 0x18161d, type: 'coupe', style: 'wedge', drivetrain: 'RWD',
    engine: '7M-GTE', engineSound: 'i6', power: 232, torque: 344, weight: 1560, redline: 6800, turbo: true,
    price: 24000, rarity: 'common', gears: [3.25, 2.02, 1.42, 1.0], finalDrive: 3.73,
    wheelStyle: 'mesh', spoiler: 'gt', tagline: 'The forgotten Supra. Still a turbo straight-six missile.',
    grip: 1.06, unlockWins: 1, interior: 'black'
  }),
  make({
    id: 'toyota-supra-mk4', make: 'TOYOTA', name: 'SUPRA MK4 RZ', short: 'SUPRA', year: 1998,
    color: 0xff8a00, accent: 0xece8dc, type: 'coupe', style: 'smooth', drivetrain: 'RWD',
    engine: '2JZ-GTE', engineSound: '2jz', power: 320, torque: 440, weight: 1510, redline: 7800, turbo: true,
    price: 118000, rarity: 'epic', gears: [3.83, 2.36, 1.69, 1.31, 1.0, 0.79], finalDrive: 3.27,
    wheelStyle: 'star', spoiler: 'tower', tagline: 'Orange you glad it is a 2JZ? The internet approves.',
    grip: 1.18, unlockWins: 5, interior: 'black', decal: 'stripe'
  }),
  make({
    id: 'toyota-gr-supra', make: 'TOYOTA', name: 'GR SUPRA MK5', short: 'GR SUPRA', year: 2023,
    color: 0xff2c46, accent: 0x17151b, type: 'super', style: 'wide', drivetrain: 'RWD',
    engine: 'B58B30', engineSound: 'i6t', power: 382, torque: 500, weight: 1520, redline: 7000, turbo: true,
    price: 96000, rarity: 'epic', gears: [5.0, 3.2, 2.14, 1.72, 1.31, 1.0, 0.82], finalDrive: 3.46,
    wheelStyle: 'blade', spoiler: 'duck', tagline: 'New-school six-cylinder punch with a wide-hipped stance.',
    grip: 1.24, unlockWins: 6, interior: 'red',
    dims: { length: 4.38, width: 1.86, height: 1.29, cabin: 1.34, roof: 0.46, hood: 1.58, deck: 1.0, wheelbase: 2.47, track: 1.62 }
  }),
  make({
    id: 'toyota-ae86', make: 'TOYOTA', name: 'COROLLA AE86', short: 'AE86', year: 1985,
    color: 0xf2efe3, accent: 0x17151b, type: 'hatch', style: 'boxy', drivetrain: 'RWD',
    engine: '4A-GE', engineSound: 'i4', power: 130, torque: 149, weight: 940, redline: 7600, turbo: false,
    price: 0, rarity: 'starter', gearbox: 'five', gears: [3.59, 2.02, 1.38, 1.0, 0.86], finalDrive: 4.3,
    wheelStyle: 'mesh', spoiler: 'duck', tagline: 'Light, rear-drive, and yours from day one. Respect the 4A-GE.',
    grip: 0.99, unlockWins: 0, interior: 'black', decal: 'kanji',
    dims: { length: 4.18, width: 1.63, height: 1.34, cabin: 1.78, roof: 0.6, hood: 1.1, deck: 0.5, wheelbase: 2.4, track: 1.37 }
  }),
  make({
    id: 'toyota-chaser', make: 'TOYOTA', name: 'CHASER JZX100', short: 'JZX100', year: 1998,
    color: 0xdedbd0, accent: 0x2a49a1, type: 'sedan', style: 'boxy', drivetrain: 'RWD',
    engine: '1JZ-GTE', engineSound: '1jz', power: 280, torque: 363, weight: 1510, redline: 7200, turbo: true,
    price: 36000, rarity: 'rare', gears: [3.57, 2.08, 1.45, 1.0, 0.79], finalDrive: 3.91,
    wheelStyle: 'dish', spoiler: 'lip', tagline: 'A four-door missile for people who like their sleep.',
    grip: 1.12, unlockWins: 3, interior: 'cream'
  }),
  make({
    id: 'toyota-mr2', make: 'TOYOTA', name: 'MR2 SW20', short: 'MR2', year: 1994,
    color: 0x14c6b0, accent: 0xf6f0de, type: 'coupe', style: 'wedge', drivetrain: 'RWD',
    engine: '3S-GTE', engineSound: 'i4', power: 245, torque: 304, weight: 1290, redline: 7200, turbo: true,
    price: 29000, rarity: 'rare', gears: [3.23, 1.91, 1.25, 0.97, 0.82], finalDrive: 3.93,
    wheelStyle: 'mesh', spoiler: 'tower', tagline: 'Mid-engine, rear-drive, and a little bit dangerous.',
    grip: 1.15, unlockWins: 4, interior: 'black'
  }),
  make({
    id: 'toyota-celica', make: 'TOYOTA', name: 'CELICA GT-FOUR', short: 'GT-FOUR', year: 1995,
    color: 0x22242c, accent: 0xffd431, type: 'coupe', style: 'smooth', drivetrain: 'AWD',
    engine: '3S-GTE', engineSound: 'i4', power: 255, torque: 304, weight: 1390, redline: 7200, turbo: true,
    price: 34000, rarity: 'rare', gears: [3.23, 1.91, 1.25, 0.97, 0.82], finalDrive: 3.93,
    wheelStyle: 'six', spoiler: 'tower', tagline: 'WRC homologation special. It has four rings and no chill.',
    grip: 1.25, unlockWins: 3, interior: 'red', decal: 'stripe'
  }),
  make({
    id: 'toyota-starlet', make: 'TOYOTA', name: 'STARLET GLANZA V', short: 'GLANZA', year: 1996,
    color: 0xefeae0, accent: 0xff3636, type: 'hatch', style: 'tall', drivetrain: 'FWD',
    engine: '4E-FTE', engineSound: 'kei', power: 135, torque: 157, weight: 910, redline: 6800, turbo: true,
    price: 10500, rarity: 'common', gears: [3.01, 1.90, 1.28, 0.97, 0.76], finalDrive: 4.06,
    wheelStyle: 'six', spoiler: 'tower', tagline: 'Tiny terror. Big turbo. Absolutely no fear.',
    grip: 1.0, unlockWins: 1, interior: 'red'
  }),
  make({
    id: 'toyota-crown', make: 'TOYOTA', name: 'CROWN ATHLETE', short: 'CROWN', year: 2016,
    color: 0x2d3e54, accent: 0xf0e7cd, type: 'sedan', style: 'tall', drivetrain: 'RWD',
    engine: '2GR-FSE', engineSound: 'v6', power: 315, torque: 377, weight: 1680, redline: 6800, turbo: false,
    price: 46000, rarity: 'rare', gears: [3.49, 2.11, 1.49, 1.0, 0.72], finalDrive: 3.46,
    wheelStyle: 'chrome', spoiler: 'lip', tagline: 'VIP luxury at 200 km/h. The ultimate sleeper.',
    grip: 1.1, unlockWins: 4, interior: 'cream'
  }),
  make({
    id: 'toyota-gr-yaris', make: 'TOYOTA', name: 'GR YARIS', short: 'GR YARIS', year: 2021,
    color: 0xe4e5e1, accent: 0xff2b33, type: 'hatch', style: 'wide', drivetrain: 'AWD',
    engine: 'G16E-GTS', engineSound: 'i3', power: 268, torque: 370, weight: 1280, redline: 7200, turbo: true,
    price: 58000, rarity: 'epic', gears: [4.03, 2.48, 1.75, 1.35, 1.06, 0.84], finalDrive: 3.94,
    wheelStyle: 'blade', spoiler: 'tower', tagline: 'A rally goblin with a three-cylinder bark.',
    grip: 1.32, unlockWins: 5, interior: 'red'
  }),
  make({
    id: 'toyota-86', make: 'TOYOTA', name: 'TOYOTA 86', short: '86', year: 2017,
    color: 0xff5f3b, accent: 0x17151b, type: 'coupe', style: 'wedge', drivetrain: 'RWD',
    engine: 'FA20', engineSound: 'ej', power: 205, torque: 212, weight: 1240, redline: 7400, turbo: false,
    price: 25500, rarity: 'common', gears: [3.63, 2.19, 1.56, 1.23, 1.0, 0.82], finalDrive: 4.1,
    wheelStyle: 'six', spoiler: 'duck', tagline: 'Ride the balance. The momentum car with a flat-four heart.',
    grip: 1.1, unlockWins: 2, interior: 'black'
  }),

  /* ---------------- HONDA ---------------- */
  make({
    id: 'honda-civic-ek9', make: 'HONDA', name: 'CIVIC TYPE R EK9', short: 'EK9', year: 1998,
    color: 0xfff9e7, accent: 0xe2212b, type: 'hatch', style: 'boxy', drivetrain: 'FWD',
    engine: 'B16B', engineSound: 'vtec', power: 182, torque: 160, weight: 1070, redline: 8400, turbo: false,
    price: 19000, rarity: 'rare', gears: [3.23, 2.10, 1.46, 1.13, 0.93, 0.79], finalDrive: 4.4,
    wheelStyle: 'mesh', spoiler: 'tower', tagline: 'The original red-badge hatch. VTEC o’clock.',
    grip: 1.06, unlockWins: 1, interior: 'red'
  }),
  make({
    id: 'honda-civic-ep3', make: 'HONDA', name: 'CIVIC TYPE R EP3', short: 'EP3', year: 2004,
    color: 0x1060d8, accent: 0xf4eee0, type: 'hatch', style: 'tall', drivetrain: 'FWD',
    engine: 'K20A2', engineSound: 'vtec', power: 212, torque: 202, weight: 1270, redline: 8200, turbo: false,
    price: 26000, rarity: 'rare', gears: [3.27, 2.13, 1.55, 1.21, 0.96, 0.79], finalDrive: 4.39,
    wheelStyle: 'six', spoiler: 'tower', tagline: 'Space egg with a K20 and a shopping trolley wing.',
    grip: 1.08, unlockWins: 2, interior: 'black'
  }),
  make({
    id: 'honda-civic-fd2', make: 'HONDA', name: 'CIVIC TYPE R FD2', short: 'FD2', year: 2008,
    color: 0xebeee9, accent: 0xd72b3a, type: 'sedan', style: 'smooth', drivetrain: 'FWD',
    engine: 'K20A', engineSound: 'vtec', power: 222, torque: 215, weight: 1330, redline: 8400, turbo: false,
    price: 34000, rarity: 'rare', gears: [3.27, 2.13, 1.55, 1.21, 0.96, 0.79], finalDrive: 4.39,
    wheelStyle: 'mesh', spoiler: 'tower', tagline: 'The four-door that revs to nine and corners on rails.',
    grip: 1.1, unlockWins: 3, interior: 'red'
  }),
  make({
    id: 'honda-civic-fk8', make: 'HONDA', name: 'CIVIC TYPE R FK8', short: 'FK8', year: 2019,
    color: 0x0b1b2b, accent: 0xff2a38, type: 'hatch', style: 'wide', drivetrain: 'FWD',
    engine: 'K20C1', engineSound: 'vtec', power: 316, torque: 400, weight: 1390, redline: 7000, turbo: true,
    price: 62000, rarity: 'epic', gears: [3.62, 2.11, 1.53, 1.21, 0.97, 0.8], finalDrive: 4.11,
    wheelStyle: 'blade', spoiler: 'tower', tagline: 'Fastest front-drive cartoon on the strip.',
    grip: 1.16, unlockWins: 5, interior: 'red'
  }),
  make({
    id: 'honda-civic-fl5', make: 'HONDA', name: 'CIVIC TYPE R FL5', short: 'FL5', year: 2023,
    color: 0xffd521, accent: 0x18161b, type: 'hatch', style: 'wide', drivetrain: 'FWD',
    engine: 'K20C1', engineSound: 'vtec', power: 325, torque: 420, weight: 1420, redline: 7000, turbo: true,
    price: 79000, rarity: 'epic', gears: [3.62, 2.11, 1.53, 1.21, 0.97, 0.8], finalDrive: 4.11,
    wheelStyle: 'star', spoiler: 'tower', tagline: 'The newest red badge. Cleaner, meaner, still screaming.',
    grip: 1.18, unlockWins: 6, interior: 'black'
  }),
  make({
    id: 'honda-integra-dc2', make: 'HONDA', name: 'INTEGRA TYPE R DC2', short: 'DC2', year: 1998,
    color: 0xffe33b, accent: 0x17151b, type: 'coupe', style: 'smooth', drivetrain: 'FWD',
    engine: 'B18C', engineSound: 'vtec', power: 197, torque: 178, weight: 1100, redline: 8400, turbo: false,
    price: 24500, rarity: 'rare', gears: [3.23, 2.10, 1.46, 1.13, 0.93, 0.79], finalDrive: 4.4,
    wheelStyle: 'mesh', spoiler: 'tower', tagline: 'The original giant killer. B18C forever.',
    grip: 1.1, unlockWins: 2, interior: 'red'
  }),
  make({
    id: 'honda-integra-dc5', make: 'HONDA', name: 'INTEGRA TYPE R DC5', short: 'DC5', year: 2004,
    color: 0xf5f1e4, accent: 0x1d55e4, type: 'coupe', style: 'smooth', drivetrain: 'FWD',
    engine: 'K20A', engineSound: 'vtec', power: 220, torque: 206, weight: 1170, redline: 8400, turbo: false,
    price: 38000, rarity: 'rare', gears: [3.27, 2.13, 1.55, 1.21, 0.96, 0.79], finalDrive: 4.39,
    wheelStyle: 'six', spoiler: 'tower', tagline: 'New-school Type R with a big-wing attitude.',
    grip: 1.12, unlockWins: 4, interior: 'black'
  }),
  make({
    id: 'honda-nsx-na1', make: 'HONDA', name: 'NSX NA1', short: 'NSX', year: 1991,
    color: 0xff2a3d, accent: 0x17151b, type: 'super', style: 'wedge', drivetrain: 'RWD',
    engine: 'C30A', engineSound: 'v6', power: 274, torque: 285, weight: 1370, redline: 8300, turbo: false,
    price: 76000, rarity: 'epic', gears: [3.07, 1.95, 1.42, 1.13, 0.91, 0.71], finalDrive: 4.24,
    wheelStyle: 'mesh', spoiler: 'lip', tagline: 'The everyday supercar. Senna helped tune this one.',
    grip: 1.2, unlockWins: 5, interior: 'black'
  }),
  make({
    id: 'honda-nsx-na2', make: 'HONDA', name: 'NSX NA2', short: 'NSX-R', year: 2002,
    color: 0xfbfaf1, accent: 0xff2e2e, type: 'super', style: 'wide', drivetrain: 'RWD',
    engine: 'C32B', engineSound: 'v6', power: 290, torque: 304, weight: 1270, redline: 8000, turbo: false,
    price: 128000, rarity: 'epic', gears: [3.07, 1.95, 1.42, 1.13, 0.91, 0.71], finalDrive: 4.24,
    wheelStyle: 'star', spoiler: 'duck', tagline: 'Featherweight, razor-sharp, still gorgeous.',
    grip: 1.28, unlockWins: 7, interior: 'red'
  }),
  make({
    id: 'honda-nsx-r', make: 'HONDA', name: 'NSX-R GT', short: 'NSX-R GT', year: 2005,
    color: 0xf1eee3, accent: 0xff172e, type: 'super', style: 'wide', drivetrain: 'RWD',
    engine: 'C32B', engineSound: 'v6', power: 310, torque: 320, weight: 1160, redline: 8400, turbo: false,
    price: null, rarity: 'legend', exclusive: true, unlockWins: 12,
    wheelStyle: 'chrome', spoiler: 'tower', tagline: 'Homologation unobtainium. The white unicorn.',
    grip: 1.38, interior: 'red', decal: 'rising'
  }),
  make({
    id: 'honda-s2000', make: 'HONDA', name: 'S2000', short: 'S2000', year: 2004,
    color: 0x1b55ff, accent: 0xece9dc, type: 'roadster', style: 'smooth', drivetrain: 'RWD',
    engine: 'F20C', engineSound: 'vtec', power: 240, torque: 208, weight: 1250, redline: 9000, turbo: false,
    price: 43000, rarity: 'rare', gears: [3.13, 2.06, 1.58, 1.29, 1.07, 0.84], finalDrive: 4.1,
    wheelStyle: 'six', spoiler: 'duck', tagline: 'Nine thousand RPM. Open roof. No regrets.',
    grip: 1.15, unlockWins: 4, interior: 'red'
  }),
  make({
    id: 'honda-crx', make: 'HONDA', name: 'CR-X SiR', short: 'CR-X', year: 1990,
    color: 0x1c1c22, accent: 0xff4b50, type: 'hatch', style: 'wedge', drivetrain: 'FWD',
    engine: 'B16A', engineSound: 'vtec', power: 160, torque: 152, weight: 920, redline: 8200, turbo: false,
    price: 15500, rarity: 'common', gears: [3.23, 1.90, 1.31, 1.03, 0.84], finalDrive: 4.4,
    wheelStyle: 'mesh', spoiler: 'duck', tagline: 'Tiny glass wedge. Enormous VTEC energy.',
    grip: 1.04, unlockWins: 1, interior: 'black'
  }),

  /* ---------------- MAZDA ---------------- */
  make({
    id: 'mazda-rx7-fc', make: 'MAZDA', name: 'RX-7 FC3S', short: 'RX-7 FC', year: 1990,
    color: 0xf0eee6, accent: 0xc51e37, type: 'coupe', style: 'wedge', drivetrain: 'RWD',
    engine: '13B-T', engineSound: 'rotary', power: 200, torque: 270, weight: 1270, redline: 8000, turbo: true,
    price: 22000, rarity: 'rare', gears: [3.48, 2.02, 1.39, 1.0, 0.76], finalDrive: 3.9,
    wheelStyle: 'mesh', spoiler: 'gt', tagline: 'Rotary wedginess with a JDM legend badge.',
    grip: 1.09, unlockWins: 2, interior: 'black'
  }),
  make({
    id: 'mazda-rx7-fd', make: 'MAZDA', name: 'RX-7 FD3S', short: 'RX-7 FD', year: 1999,
    color: 0xffd400, accent: 0x17151b, type: 'super', style: 'smooth', drivetrain: 'RWD',
    engine: '13B-REW', engineSound: 'rotary', power: 276, torque: 314, weight: 1270, redline: 8200, turbo: true,
    price: 82000, rarity: 'epic', gears: [3.48, 2.02, 1.39, 1.0, 0.76], finalDrive: 3.9,
    wheelStyle: 'star', spoiler: 'duck', tagline: 'The most beautiful shape ever to make a rotary noise.',
    grip: 1.19, unlockWins: 5, interior: 'black', decal: 'rising',
    dims: { length: 4.29, width: 1.85, height: 1.23, cabin: 1.28, roof: 0.42, hood: 1.48, deck: 1.04, wheelbase: 2.43, track: 1.6 }
  }),
  make({
    id: 'mazda-rx8', make: 'MAZDA', name: 'RX-8 TYPE RS', short: 'RX-8', year: 2008,
    color: 0xf7f4ea, accent: 0x25c9d8, type: 'coupe', style: 'smooth', drivetrain: 'RWD',
    engine: '13B-MSP', engineSound: 'rotary', power: 238, torque: 211, weight: 1350, redline: 9000, turbo: false,
    price: 29000, rarity: 'rare', gears: [3.76, 2.27, 1.54, 1.19, 1.0, 0.83], finalDrive: 4.44,
    wheelStyle: 'six', spoiler: 'lip', tagline: 'Four doors, two rotors, one giant rev range.',
    grip: 1.13, unlockWins: 3, interior: 'red'
  }),
  make({
    id: 'mazda-mazdaspeed3', make: 'MAZDA', name: 'MAZDASPEED3', short: 'MS3', year: 2009,
    color: 0xff4d2e, accent: 0x17151b, type: 'hatch', style: 'tall', drivetrain: 'FWD',
    engine: 'MZR DISI', engineSound: 'i4', power: 263, torque: 380, weight: 1450, redline: 6800, turbo: true,
    price: 24000, rarity: 'common', gears: [3.31, 2.05, 1.48, 1.14, 0.92, 0.76], finalDrive: 4.19,
    wheelStyle: 'six', spoiler: 'tower', tagline: 'Torque-steer: the official colour of adrenaline.',
    grip: 1.08, unlockWins: 2, interior: 'black'
  }),
  make({
    id: 'mazda-mx5-na', make: 'MAZDA', name: 'MX-5 NA ROADSTER', short: 'MX-5 NA', year: 1994,
    color: 0xff3138, accent: 0xf4f0e3, type: 'roadster', style: 'smooth', drivetrain: 'RWD',
    engine: 'BP-ZE', engineSound: 'i4', power: 130, torque: 152, weight: 980, redline: 7200, turbo: false,
    price: 9800, rarity: 'common', gears: [3.14, 1.89, 1.33, 1.0, 0.81], finalDrive: 4.3,
    wheelStyle: 'mesh', spoiler: 'duck', tagline: 'The answer is always Miata. Even on a drag strip.',
    grip: 1.04, unlockWins: 0, interior: 'black'
  }),
  make({
    id: 'mazda-mx5-nd', make: 'MAZDA', name: 'MX-5 ND RF', short: 'MX-5 RF', year: 2019,
    color: 0xff7a42, accent: 0x17151b, type: 'roadster', style: 'smooth', drivetrain: 'RWD',
    engine: 'SKYACTIV-G', engineSound: 'i4', power: 181, torque: 205, weight: 1080, redline: 7500, turbo: false,
    price: 31000, rarity: 'common', gears: [3.41, 2.15, 1.56, 1.24, 1.0, 0.82], finalDrive: 4.1,
    wheelStyle: 'star', spoiler: 'duck', tagline: 'Lightness is a superpower. Roof optional.',
    grip: 1.12, unlockWins: 2, interior: 'cream'
  }),
  make({
    id: 'mazda-cosmo', make: 'MAZDA', name: 'COSMO SPORT 110S', short: 'COSMO', year: 1967,
    color: 0xf4efe2, accent: 0xb92237, type: 'coupe', style: 'smooth', drivetrain: 'RWD',
    engine: '10A Rotary', engineSound: 'rotary', power: 128, torque: 138, weight: 940, redline: 7000, turbo: false,
    price: 56000, rarity: 'epic', gears: [3.2, 1.95, 1.35, 1.0], finalDrive: 4.1,
    wheelStyle: 'chrome', spoiler: 'lip', tagline: 'The first rotary hero. Space-age curves in cream.',
    grip: 0.98, unlockWins: 6, interior: 'cream'
  }),
  make({
    id: 'mazda-rx7-spirit', make: 'MAZDA', name: 'RX-7 SPIRIT R TYPE A', short: 'SPIRIT R', year: 2002,
    color: 0xe8f1f4, accent: 0xff2a3d, type: 'super', style: 'wide', drivetrain: 'RWD',
    engine: '13B-REW', engineSound: 'rotary', power: 290, torque: 330, weight: 1280, redline: 8400, turbo: true,
    price: null, rarity: 'legend', exclusive: true, unlockWins: 9,
    wheelStyle: 'chrome', spoiler: 'duck', tagline: 'The final, perfect FD. A rotary prayer answered.',
    grip: 1.3, interior: 'red', decal: 'kanji'
  }),

  /* ---------------- MITSUBISHI ---------------- */
  make({
    id: 'mitsubishi-evo3', make: 'MITSUBISHI', name: 'LANCER EVO III', short: 'EVO III', year: 1995,
    color: 0xf1eee3, accent: 0xd31e2b, type: 'sedan', style: 'boxy', drivetrain: 'AWD',
    engine: '4G63T', engineSound: '4g63', power: 270, torque: 309, weight: 1260, redline: 7500, turbo: true,
    price: 33000, rarity: 'rare', gears: [3.08, 1.91, 1.37, 1.06, 0.84], finalDrive: 4.53,
    wheelStyle: 'six', spoiler: 'tower', tagline: 'Rally brick with a turbo and a giant wing.',
    grip: 1.26, unlockWins: 3, interior: 'red'
  }),
  make({
    id: 'mitsubishi-evo5', make: 'MITSUBISHI', name: 'LANCER EVO V', short: 'EVO V', year: 1998,
    color: 0xf1f0e9, accent: 0xd3202f, type: 'sedan', style: 'wide', drivetrain: 'AWD',
    engine: '4G63T', engineSound: '4g63', power: 276, torque: 353, weight: 1360, redline: 7500, turbo: true,
    price: 44000, rarity: 'rare', gears: [3.08, 1.91, 1.37, 1.06, 0.84], finalDrive: 4.53,
    wheelStyle: 'six', spoiler: 'tower', tagline: 'The poster-car Evo. Box flares and boost.',
    grip: 1.29, unlockWins: 4, interior: 'red'
  }),
  make({
    id: 'mitsubishi-evo6', make: 'MITSUBISHI', name: 'LANCER EVO VI', short: 'EVO VI', year: 1999,
    color: 0xf1f1e9, accent: 0xcf2030, type: 'sedan', style: 'wide', drivetrain: 'AWD',
    engine: '4G63T', engineSound: '4g63', power: 280, torque: 373, weight: 1360, redline: 7600, turbo: true,
    price: 56000, rarity: 'epic', gears: [3.08, 1.91, 1.37, 1.06, 0.84], finalDrive: 4.53,
    wheelStyle: 'star', spoiler: 'tower', tagline: 'Tommi’s rally weapon. The wing is structural.',
    grip: 1.31, unlockWins: 5, interior: 'red'
  }),
  make({
    id: 'mitsubishi-evo6tme', make: 'MITSUBISHI', name: 'EVO VI TOMMI MAKINEN', short: 'TME', year: 1999,
    color: 0xff2e3a, accent: 0xf4f0e4, type: 'sedan', style: 'wide', drivetrain: 'AWD',
    engine: '4G63T', engineSound: '4g63', power: 302, torque: 390, weight: 1320, redline: 7800, turbo: true,
    price: null, rarity: 'legend', exclusive: true, unlockWins: 11,
    wheelStyle: 'chrome', spoiler: 'tower', tagline: 'One of 2,500. Rally red, titanium turbo, pure legend.',
    grip: 1.36, interior: 'red', decal: 'stripe'
  }),
  make({
    id: 'mitsubishi-evo8', make: 'MITSUBISHI', name: 'LANCER EVO VIII MR', short: 'EVO VIII', year: 2005,
    color: 0x3e4b5f, accent: 0xdfdfd0, type: 'sedan', style: 'wide', drivetrain: 'AWD',
    engine: '4G63T', engineSound: '4g63', power: 276, torque: 400, weight: 1410, redline: 7500, turbo: true,
    price: 52000, rarity: 'epic', gears: [3.08, 1.91, 1.37, 1.06, 0.84, 0.72], finalDrive: 4.53,
    wheelStyle: 'six', spoiler: 'tower', tagline: 'The grey menace. Active diffs and all-weather violence.',
    grip: 1.32, unlockWins: 5, interior: 'black'
  }),
  make({
    id: 'mitsubishi-evo9', make: 'MITSUBISHI', name: 'LANCER EVO IX MR', short: 'EVO IX', year: 2006,
    color: 0xf4f2e7, accent: 0xcc1f2b, type: 'sedan', style: 'wide', drivetrain: 'AWD',
    engine: '4G63T', engineSound: '4g63', power: 291, torque: 400, weight: 1410, redline: 7600, turbo: true,
    price: 69000, rarity: 'epic', gears: [3.08, 1.91, 1.37, 1.06, 0.84, 0.72], finalDrive: 4.53,
    wheelStyle: 'star', spoiler: 'tower', tagline: 'The greatest Evo? Absolutely. MIVEC just woke up.',
    grip: 1.34, unlockWins: 6, interior: 'red'
  }),
  make({
    id: 'mitsubishi-evo10', make: 'MITSUBISHI', name: 'LANCER EVO X FQ', short: 'EVO X', year: 2014,
    color: 0x2c2f38, accent: 0xff3647, type: 'sedan', style: 'wide', drivetrain: 'AWD',
    engine: '4B11T', engineSound: '4g63', power: 296, torque: 414, weight: 1550, redline: 7000, turbo: true,
    price: 78000, rarity: 'epic', gears: [3.77, 2.28, 1.62, 1.22, 0.98, 0.79], finalDrive: 4.06,
    wheelStyle: 'blade', spoiler: 'tower', tagline: 'The final evolution. Sharp suit, sharper diff.',
    grip: 1.33, unlockWins: 7, interior: 'black'
  }),
  make({
    id: 'mitsubishi-3000gt', make: 'MITSUBISHI', name: '3000GT VR-4', short: '3000GT', year: 1994,
    color: 0xb4222b, accent: 0xf0ead9, type: 'super', style: 'wide', drivetrain: 'AWD',
    engine: '6G72TT', engineSound: 'v6', power: 320, torque: 427, weight: 1710, redline: 7000, turbo: true,
    price: 47000, rarity: 'rare', gears: [3.42, 2.11, 1.46, 1.13, 0.89, 0.72], finalDrive: 4.15,
    wheelStyle: 'six', spoiler: 'tower', tagline: 'A 90s tech battleship. Four-wheel steering included.',
    grip: 1.3, unlockWins: 4, interior: 'cream'
  }),
  make({
    id: 'mitsubishi-eclipse', make: 'MITSUBISHI', name: 'ECLIPSE GSX', short: 'ECLIPSE', year: 1998,
    color: 0x6e32c9, accent: 0xffd74a, type: 'coupe', style: 'smooth', drivetrain: 'AWD',
    engine: '4G63T', engineSound: '4g63', power: 210, torque: 290, weight: 1400, redline: 7500, turbo: true,
    price: 21500, rarity: 'common', gears: [3.08, 1.91, 1.37, 1.06, 0.84], finalDrive: 4.53,
    wheelStyle: 'star', spoiler: 'tower', tagline: 'A DSM cult classic. Boost leaks are a feature.',
    grip: 1.22, unlockWins: 2, interior: 'black'
  }),

  /* ---------------- SUBARU ---------------- */
  make({
    id: 'subaru-22b', make: 'SUBARU', name: 'IMPREZA 22B STI', short: '22B', year: 1998,
    color: 0x1f5fd1, accent: 0xffd64b, type: 'coupe', style: 'wide', drivetrain: 'AWD',
    engine: 'EJ22', engineSound: 'ej', power: 280, torque: 363, weight: 1270, redline: 7600, turbo: true,
    price: 176000, rarity: 'legend', gears: [3.17, 2.06, 1.48, 1.09, 0.86], finalDrive: 4.44,
    wheelStyle: 'chrome', spoiler: 'tower', tagline: 'The blue and gold hero. One of 400. Drive it anyway.',
    grip: 1.38, unlockWins: 8, interior: 'red'
  }),
  make({
    id: 'subaru-wrx-gd', make: 'SUBARU', name: 'IMPREZA WRX STI GD', short: 'WRX GD', year: 2004,
    color: 0x2b4bff, accent: 0xffd631, type: 'sedan', style: 'wide', drivetrain: 'AWD',
    engine: 'EJ207', engineSound: 'ej', power: 300, torque: 407, weight: 1470, redline: 7500, turbo: true,
    price: 44000, rarity: 'rare', gears: [3.17, 2.06, 1.48, 1.09, 0.86, 0.74], finalDrive: 4.44,
    wheelStyle: 'star', spoiler: 'tower', tagline: 'Blobeye, boxer rumble, gold wheels. The trinity.',
    grip: 1.31, unlockWins: 4, interior: 'black'
  }),
  make({
    id: 'subaru-wrx-va', make: 'SUBARU', name: 'WRX STI VA', short: 'WRX STI', year: 2018,
    color: 0x1d2738, accent: 0xff3040, type: 'sedan', style: 'wide', drivetrain: 'AWD',
    engine: 'EJ257', engineSound: 'ej', power: 305, torque: 393, weight: 1580, redline: 7200, turbo: true,
    price: 67000, rarity: 'epic', gears: [3.17, 2.06, 1.48, 1.09, 0.86, 0.74], finalDrive: 4.44,
    wheelStyle: 'blade', spoiler: 'tower', tagline: 'Subie rumble for the new generation. Still gold, still loud.',
    grip: 1.32, unlockWins: 6, interior: 'red'
  }),
  make({
    id: 'subaru-brz', make: 'SUBARU', name: 'BRZ S', short: 'BRZ', year: 2022,
    color: 0x2bd4d6, accent: 0x17151b, type: 'coupe', style: 'wedge', drivetrain: 'RWD',
    engine: 'FA24', engineSound: 'ej', power: 228, torque: 249, weight: 1270, redline: 7400, turbo: false,
    price: 32000, rarity: 'common', gears: [3.63, 2.19, 1.56, 1.23, 1.0, 0.82], finalDrive: 4.1,
    wheelStyle: 'six', spoiler: 'duck', tagline: 'Low, light and lovably tail-happy.',
    grip: 1.13, unlockWins: 2, interior: 'black'
  }),

  /* ---------------- KEI & CULT ---------------- */
  make({
    id: 'suzuki-cappuccino', make: 'SUZUKI', name: 'CAPPUCCINO', short: 'CAPPU', year: 1993,
    color: 0xff3b45, accent: 0xf4f0df, type: 'kei', style: 'wedge', drivetrain: 'RWD',
    engine: 'F6A', engineSound: 'kei', power: 63, torque: 86, weight: 725, redline: 7200, turbo: true,
    price: 8200, rarity: 'common', gears: [3.44, 2.07, 1.46, 1.03, 0.82], finalDrive: 4.3,
    wheelStyle: 'mesh', spoiler: 'duck', tagline: 'A 63 hp espresso shot. It weighs nothing and fears less.',
    grip: 1.04, unlockWins: 1, interior: 'cream'
  }),
  make({
    id: 'daihatsu-copen', make: 'DAIHATSU', name: 'COPEN ULTIMATE', short: 'COPEN', year: 2016,
    color: 0xffcf27, accent: 0x17151b, type: 'kei', style: 'smooth', drivetrain: 'FWD',
    engine: 'KF-VET', engineSound: 'kei', power: 64, torque: 92, weight: 850, redline: 6800, turbo: true,
    price: 7400, rarity: 'common', gears: [3.4, 1.99, 1.35, 1.0, 0.8], finalDrive: 4.2,
    wheelStyle: 'six', spoiler: 'duck', tagline: 'A folding hardtop the size of a go-kart. Maximum joy.',
    grip: 0.99, unlockWins: 0, interior: 'cream'
  })
];

export const CARS_BY_ID = Object.fromEntries(CARS.map(c => [c.id, c]));
export const TRACKS_BY_ID = Object.fromEntries(TRACKS.map(t => [t.id, t]));
export const RIVALS_BY_ID = Object.fromEntries(RIVALS.map(r => [r.id, r]));
export const EVENTS_BY_ID = Object.fromEntries(EVENTS.map(e => [e.id, e]));

export const DISTANCES = {
  quarter: { id: 'quarter', name: '1/4 MILE', short: '1/4', meters: 402.336 },
  half: { id: 'half', name: '1/2 MILE', short: '1/2', meters: 804.672 }
};

export const MAKES = ['ALL', 'NISSAN', 'TOYOTA', 'HONDA', 'MAZDA', 'MITSUBISHI', 'SUBARU', 'SUZUKI', 'DAIHATSU'];

export const DEFAULT_STATE = {
  version: 3,
  cash: 4200,
  wins: 0,
  totalRaces: 0,
  xp: 0,
  owned: ['toyota-ae86'],
  activeCar: 'toyota-ae86',
  builds: {},
  bestTimes: {},
  beatenRivals: [],
  completedEvents: [],
  eventProgress: {},
  activeChampionship: null,
  settings: { sound: true, music: true, quality: 'auto', shake: true },
  trophies: []
};

export function initialBuild() { return { ...DEFAULT_BUILD }; }

export function effectiveStats(car, build = DEFAULT_BUILD) {
  const eng = ENGINES[build.engine] || ENGINES.stock;
  const turbo = TURBOS[build.turbo] || TURBOS.stock;
  const ecu = ECUS[build.ecu] || ECUS.stock;
  const exhaust = EXHAUSTS[build.exhaust] || EXHAUSTS.stock;
  const bodykit = BODY_KITS[build.bodykit] || BODY_KITS.stock;
  const wheels = WHEELS[build.wheels] || WHEELS.mesh;
  let power = car.power + eng.power + Math.round(turbo.boost * 170) + Math.round(ecu.torque * 1.8);
  let torque = car.torque + eng.torque + Math.round(turbo.boost * 230) + ecu.torque;
  let weight = car.weight + (build.seat === 'carbon' ? -18 : 0) + (build.bodykit === 'wide' ? 22 : build.bodykit === 'timeattack' ? 14 : 0);
  if (build.engine !== 'stock') weight += 35;
  const redline = car.redline + ecu.redline;
  const engineCode = eng.code || car.engine;
  const sound = eng.sound || car.engineSound;
  const boost = turbo.boost + (car.turbo ? 0.12 : 0);
  const grip = car.grip + (wheels.kind === 'chrome' ? 0.02 : 0) + (bodykit.id === 'wide' ? 0.04 : bodykit.id === 'timeattack' ? 0.05 : 0);
  const cost = (eng.cost + turbo.cost + ecu.cost + exhaust.cost + bodykit.cost +
    (WHEELS[build.wheels]?.cost || 0) + (SPOILERS[build.spoiler]?.cost || 0) + (PAINTS[find(PAINTS, build.paint)]?.cost || 0) +
    (UNDERGLOW[build.underglow]?.cost || 0) + (HEADLIGHTS[build.headlights]?.cost || 0) +
    (DECALS[build.decal]?.cost || 0) + (INTERIORS[build.interior]?.cost || 0) + (SEATS[build.seat]?.cost || 0) +
    (KNOBS[build.knob]?.cost || 0));
  return { power, torque, weight, redline, idle: car.idle, engineCode, sound, boost, grip, redlineShift: redline - 300, cost, drivetrain: car.drivetrain };
}

function find(arr, id) { return arr.findIndex(x => x.id === id); }

export function priceFor(car) {
  return car.price;
}

export function fmtMoney(n) {
  return '$' + Math.round(n).toLocaleString('en-US');
}
