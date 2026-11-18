// ── DRAGON RUSH · RACE OF LEGENDS ─────────────────────────────────────────────
// Original world data: dragons, biomes, leagues, cosmetics and challenges.

export const RARITIES = {
  common:    { name: 'Common',    color: '#9fb4c7', glow: 'rgba(159,180,199,.45)', mult: 1.0 },
  rare:      { name: 'Rare',      color: '#4fc3f7', glow: 'rgba(79,195,247,.5)',  mult: 1.08 },
  epic:      { name: 'Epic',      color: '#b46cf5', glow: 'rgba(180,108,245,.55)', mult: 1.17 },
  legendary: { name: 'Legendary', color: '#ffb545', glow: 'rgba(255,181,69,.6)',  mult: 1.27 },
  mythical:  { name: 'Mythical',  color: '#ff6bd6', glow: 'rgba(255,107,214,.65)', mult: 1.38 },
};

const D = (o) => o;

export const DRAGONS = [
  D({
    id: 'emberling', name: 'Emberling', epithet: 'The First Spark',
    desc: 'A warm-hearted hatchling from the Hearthfall cliffs. Small, eager and impossibly loyal.',
    rarity: 'common', price: 0, unlock: 'Starter dragon',
    palette: { body: '#d95b3a', belly: '#f2c48d', wing: '#b3402a', accent: '#ffd166', horn: '#f3dfc4', eye: '#ffe066' },
    shape: { body: 1.0, wings: 1.0, neck: 1.0, tail: 1.0, horns: 1, spikes: 0.6, legs: 1.0, head: 1.0, pattern: 'scales' },
    stats: { speed: 5, accel: 7, stamina: 6, handling: 8 },
    ability: { name: 'Cinder Dash', type: 'dash', cd: 11, desc: 'A burst of ember-lit speed.' },
  }),
  D({
    id: 'mossback', name: 'Mossback', epithet: 'Keeper of Quiet Groves',
    desc: 'Gentle forest grazer with moss-covered wings. Restores stamina while gliding.',
    rarity: 'common', price: 900, unlock: 'Buy in Dragon Market',
    palette: { body: '#5e8f52', belly: '#cfe0a3', wing: '#436d3c', accent: '#c8e36b', horn: '#d8d3a8', eye: '#f5d76e' },
    shape: { body: 1.12, wings: 1.08, neck: 0.95, tail: 1.1, horns: 0, spikes: 0.5, legs: 1.1, head: 1.05, pattern: 'spots' },
    stats: { speed: 5, accel: 5, stamina: 9, handling: 6 },
    ability: { name: 'Wildroot', type: 'heal', cd: 16, desc: 'Rapidly restores stamina and shields.' },
  }),
  D({
    id: 'gustwing', name: 'Gustwing', epithet: 'Swallow of the Sky',
    desc: 'A slender wind-runner that rides thermals like a skipping stone.',
    rarity: 'common', price: 1200, unlock: 'Buy in Dragon Market',
    palette: { body: '#7fbdd8', belly: '#e7f7ff', wing: '#5b96b5', accent: '#ffd6a5', horn: '#f3f6f8', eye: '#2b4b5e' },
    shape: { body: 0.88, wings: 1.16, neck: 0.9, tail: 1.25, horns: 1, spikes: 0.3, legs: 0.85, head: 0.9, pattern: 'streaks' },
    stats: { speed: 8, accel: 6, stamina: 5, handling: 8 },
    ability: { name: 'Tailwind', type: 'gale', cd: 13, desc: 'A following wind that lifts all your speed.' },
  }),
  D({
    id: 'pebblehorn', name: 'Pebblehorn', epithet: 'Little Mountain',
    desc: 'A stubborn cliff-basher with a heart of granite and a head to match.',
    rarity: 'common', price: 1400, unlock: 'Buy in Dragon Market',
    palette: { body: '#8a8378', belly: '#d8cbb4', wing: '#69645d', accent: '#ffb45e', horn: '#e4d7c0', eye: '#ffcf5c' },
    shape: { body: 1.2, wings: 0.9, neck: 0.85, tail: 0.85, horns: 2, spikes: 1.0, legs: 1.2, head: 1.2, pattern: 'none' },
    stats: { speed: 4, accel: 4, stamina: 10, handling: 5 },
    ability: { name: 'Stonehide', type: 'aegis', cd: 15, desc: 'Crystalline hide absorbs impacts.' },
  }),
  D({
    id: 'duskfair', name: 'Duskfair', epithet: 'Velvet of the Twilight',
    desc: 'A nocturnal beauty whose wings hold the hush between sunset and starlight.',
    rarity: 'rare', price: 2600, unlock: 'Buy in Dragon Market',
    palette: { body: '#7a5fa8', belly: '#e1d3f5', wing: '#4e3a78', accent: '#ff9de2', horn: '#e8d9ff', eye: '#ff8fdd' },
    shape: { body: 0.95, wings: 1.24, neck: 1.1, tail: 1.15, horns: 3, spikes: 0.4, legs: 0.9, head: 0.95, pattern: 'glow' },
    stats: { speed: 7, accel: 7, stamina: 7, handling: 9 },
    ability: { name: 'Nightveil', type: 'veil', cd: 14, desc: 'Fades into twilight, confusing rivals.' },
  }),
  D({
    id: 'frostfang', name: 'Frostfang', epithet: 'Winter’s Tooth',
    desc: 'Glacial hunter from the Frostspine. Its breath leaves a trail of glittering frost.',
    rarity: 'rare', price: 3200, unlock: 'Buy in Dragon Market',
    palette: { body: '#8fd3e8', belly: '#f2fbff', wing: '#5fa9c9', accent: '#b7f0ff', horn: '#ecfeff', eye: '#3ea6d8' },
    shape: { body: 1.05, wings: 1.12, neck: 1.0, tail: 1.0, horns: 2, spikes: 0.8, legs: 1.0, head: 1.0, pattern: 'streaks' },
    stats: { speed: 8, accel: 7, stamina: 6, handling: 8 },
    ability: { name: 'Frost Gale', type: 'slow', cd: 15, desc: 'An icy squall slows nearby rivals.' },
  }),
  D({
    id: 'tidecoil', name: 'Tidecoil', epithet: 'Serpent of the Deep',
    desc: 'A sinuous sea-dragon that cuts through spray and storm alike.',
    rarity: 'rare', price: 3600, unlock: 'Buy in Dragon Market',
    palette: { body: '#2f8f95', belly: '#c6f0e6', wing: '#1f6a72', accent: '#7cf0d4', horn: '#d9fff7', eye: '#8df5d2' },
    shape: { body: 1.0, wings: 1.05, neck: 1.3, tail: 1.45, horns: 1, spikes: 0.5, legs: 0.85, head: 1.0, pattern: 'scales' },
    stats: { speed: 7, accel: 8, stamina: 8, handling: 7 },
    ability: { name: 'Tidal Surge', type: 'dash', cd: 12, desc: 'Ride a wave of momentum forward.' },
  }),
  D({
    id: 'sunspark', name: 'Sunspark', epithet: 'Golden Hour',
    desc: 'A radiant sky-dancer that stores sunlight in its feathery crest.',
    rarity: 'rare', price: 4200, unlock: 'Buy in Dragon Market',
    palette: { body: '#e8a63a', belly: '#fff0c0', wing: '#d4812a', accent: '#ffe27a', horn: '#fff5d0', eye: '#ff9f1c' },
    shape: { body: 0.95, wings: 1.22, neck: 1.0, tail: 1.2, horns: 2, spikes: 0.4, legs: 0.9, head: 0.9, pattern: 'glow' },
    stats: { speed: 8, accel: 9, stamina: 7, handling: 8 },
    ability: { name: 'Solar Flare', type: 'dash', cd: 12, desc: 'Blinding golden acceleration.' },
  }),
  D({
    id: 'cinderclaw', name: 'Cinderclaw', epithet: 'Ember of the Caldera',
    desc: 'Forged in the Cinder Caldera, its wingbeats scatter embers across the sky.',
    rarity: 'epic', price: 9000, unlock: 'Buy in Dragon Market',
    palette: { body: '#8f2b22', belly: '#3b2b2c', wing: '#5a1714', accent: '#ff7b32', horn: '#2d2222', eye: '#ffbe3d' },
    shape: { body: 1.16, wings: 1.15, neck: 1.05, tail: 1.15, horns: 3, spikes: 1.1, legs: 1.1, head: 1.1, pattern: 'lava' },
    stats: { speed: 9, accel: 8, stamina: 8, handling: 7 },
    ability: { name: 'Magma Rush', type: 'dash', cd: 10, desc: 'Erupts forward on a pillar of flame.' },
  }),
  D({
    id: 'stormcrest', name: 'Stormcrest', epithet: 'Thunder Made Flesh',
    desc: 'A razor-winged hunter that dives with the fury of a storm front.',
    rarity: 'epic', price: 11000, unlock: 'Buy in Dragon Market',
    palette: { body: '#3f4d9e', belly: '#c3caf5', wing: '#28306e', accent: '#7ee8ff', horn: '#e0e6ff', eye: '#71f0ff' },
    shape: { body: 1.02, wings: 1.28, neck: 1.0, tail: 1.2, horns: 2, spikes: 0.9, legs: 0.95, head: 1.0, pattern: 'streaks' },
    stats: { speed: 10, accel: 8, stamina: 7, handling: 9 },
    ability: { name: 'Thunder Dive', type: 'dash', cd: 11, desc: 'A lightning-fast aerial strike.' },
  }),
  D({
    id: 'verdantwyrm', name: 'Verdant Wyrm', epithet: 'The Living Canopy',
    desc: 'Ancient jungle guardian whose wings bloom with rare sky-flowers.',
    rarity: 'epic', price: 10000, unlock: 'Buy in Dragon Market',
    palette: { body: '#3f8c5a', belly: '#e2f5b0', wing: '#2c6b46', accent: '#ffd97a', horn: '#d9e8b0', eye: '#ffe066' },
    shape: { body: 1.08, wings: 1.18, neck: 1.25, tail: 1.3, horns: 2, spikes: 0.7, legs: 1.0, head: 1.05, pattern: 'glow' },
    stats: { speed: 7, accel: 7, stamina: 10, handling: 8 },
    ability: { name: 'Bloom Guard', type: 'heal', cd: 14, desc: 'Blossoms restore stamina and shield.' },
  }),
  D({
    id: 'obsidrake', name: 'Obsidrake', epithet: 'Shadow of the Ruins',
    desc: 'A silent black-glass dragon said to guard the forgotten Skyfall temples.',
    rarity: 'epic', price: 12500, unlock: 'Find in Skyfall Ruins',
    palette: { body: '#262a3d', belly: '#5b5f7a', wing: '#171a29', accent: '#9d7bff', horn: '#d9d4ff', eye: '#b18aff' },
    shape: { body: 1.1, wings: 1.2, neck: 1.05, tail: 1.2, horns: 3, spikes: 1.0, legs: 1.0, head: 1.0, pattern: 'glow' },
    stats: { speed: 9, accel: 9, stamina: 8, handling: 8 },
    ability: { name: 'Shadow Wing', type: 'veil', cd: 13, desc: 'Vanishes into living shadow.' },
  }),
  D({
    id: 'celestray', name: 'Celestray', epithet: 'Star of the High Reaches',
    desc: 'Its wings hold a map of the night sky. Legend says it can fly between constellations.',
    rarity: 'legendary', price: 0, unlock: 'Win the Storm Circuit',
    palette: { body: '#6789c9', belly: '#eef4ff', wing: '#3c5a99', accent: '#a8f0ff', horn: '#f4f9ff', eye: '#a6f7ff' },
    shape: { body: 1.0, wings: 1.3, neck: 1.15, tail: 1.3, horns: 3, spikes: 0.5, legs: 0.9, head: 1.0, pattern: 'stars' },
    stats: { speed: 10, accel: 9, stamina: 9, handling: 10 },
    ability: { name: 'Starfall', type: 'gale', cd: 13, desc: 'Calls down a slipstream of starlight.' },
  }),
  D({
    id: 'pyrewing', name: 'Pyrewing', epithet: 'The Rebirth Flame',
    desc: 'A phoenix-hearted dragon. When it falls, it rises brighter than before.',
    rarity: 'legendary', price: 0, unlock: 'Win the Legend Championship',
    palette: { body: '#d84b6b', belly: '#ffd9a0', wing: '#a52d58', accent: '#ffd166', horn: '#ffe9c4', eye: '#ffde59' },
    shape: { body: 1.03, wings: 1.32, neck: 1.05, tail: 1.28, horns: 2, spikes: 0.5, legs: 0.9, head: 0.95, pattern: 'lava' },
    stats: { speed: 10, accel: 10, stamina: 9, handling: 9 },
    ability: { name: 'Phoenix Rise', type: 'dash', cd: 9, desc: 'Ignites into a blazing rebirth dive.' },
  }),
  D({
    id: 'glacielle', name: 'Glacielle', epithet: 'Crown of Winter',
    desc: 'The glacier queen of Frostspine. Her wings are carved from ancient blue ice.',
    rarity: 'legendary', price: 0, unlock: 'Explore the Frostspine Peaks',
    palette: { body: '#b8e6ff', belly: '#ffffff', wing: '#83c9ea', accent: '#d8b4ff', horn: '#ffffff', eye: '#ff9be0' },
    shape: { body: 1.05, wings: 1.28, neck: 1.2, tail: 1.25, horns: 4, spikes: 1.0, legs: 1.0, head: 1.02, pattern: 'stars' },
    stats: { speed: 9, accel: 8, stamina: 10, handling: 9 },
    ability: { name: 'Absolute Zero', type: 'slow', cd: 14, desc: 'Freezes the air around every rival.' },
  }),
  D({
    id: 'aetherion', name: 'Aetherion', epithet: 'The World Between Winds',
    desc: 'A mythical prismatic dragon that appears only to riders who have mastered every sky.',
    rarity: 'mythical', price: 0, unlock: 'Win the Dragon’s Crown',
    palette: { body: '#f4f0ff', belly: '#ffffff', wing: '#c9b8ff', accent: '#ffd9a0', horn: '#ffffff', eye: '#7cf7ff' },
    shape: { body: 1.08, wings: 1.4, neck: 1.3, tail: 1.35, horns: 4, spikes: 0.8, legs: 1.0, head: 1.05, pattern: 'prism' },
    stats: { speed: 10, accel: 10, stamina: 10, handling: 10 },
    ability: { name: 'Worldsong', type: 'aegis', cd: 12, desc: 'The sky itself carries you forward.' },
  }),
  D({
    id: 'solstice', name: 'Solstice', epithet: 'Harbinger of the Skyfire',
    desc: 'A festival dragon wreathed in ribbons of dawn. Limited seasonal discovery.',
    rarity: 'legendary', price: 0, unlock: 'Skyfire Festival event',
    palette: { body: '#ff9a5c', belly: '#fff3cf', wing: '#e8615f', accent: '#7cf0ff', horn: '#fff0d8', eye: '#8ff8ff' },
    shape: { body: 1.0, wings: 1.3, neck: 1.1, tail: 1.25, horns: 3, spikes: 0.6, legs: 0.95, head: 1.0, pattern: 'prism' },
    stats: { speed: 9, accel: 9, stamina: 9, handling: 9 },
    ability: { name: 'Skyfire', type: 'gale', cd: 12, desc: 'Ribbons of festival fire propel you onward.' },
  }),
];

export const DRAGON_MAP = Object.fromEntries(DRAGONS.map(d => [d.id, d]));

// ── BIOMES / TRACKS ─────────────────────────────────────────────────────────
export const TRACKS = [
  {
    id: 'hearthfall', name: 'Hearthfall Isle', region: 'The Verdant Reach', icon: '⌂',
    desc: 'Cliffside villages and waterfalls above a sunlit sea. The traditional home of the Hatchling Cup.',
    difficulty: 1, laps: 3, length: 2400, biome: 'viking',
    palette: { skyTop: '#4aa6d8', skyBottom: '#ffe0b3', fog: '#cfe8e2', sun: '#fff2c9', ground: '#7cb75d', rock: '#8a7f6b', rock2: '#6a6154', accent: '#ffcf6b', water: '#3aa7b8', foliage: '#4d8f4b', foliage2: '#2f6b3d' },
    league: 0,
  },
  {
    id: 'frostspine', name: 'Frostspine Peaks', region: 'The White Crown', icon: '❄',
    desc: 'Knife-edge glaciers, frozen waterfalls and the aurora-lit spires of the north.',
    difficulty: 2, laps: 3, length: 2700, biome: 'snow',
    palette: { skyTop: '#2c4f8f', skyBottom: '#b9dcf5', fog: '#d7e9f5', sun: '#eaf6ff', ground: '#dceaf5', rock: '#8f9fb2', rock2: '#66788d', accent: '#8fe8ff', water: '#5aa9c9', foliage: '#6f9384', foliage2: '#3f6058' },
    league: 1,
  },
  {
    id: 'cinder', name: 'Cinder Caldera', region: 'The Ashen Belt', icon: '▲',
    desc: 'Warm updrafts, obsidian arches and rivers of slow silver fire. Mind the ash clouds.',
    difficulty: 3, laps: 3, length: 2900, biome: 'volcano',
    palette: { skyTop: '#39223f', skyBottom: '#ff8f5e', fog: '#a56a63', sun: '#ffc28a', ground: '#55403d', rock: '#3b2f33', rock2: '#241d22', accent: '#ff7a3d', water: '#ff7c3a', foliage: '#7a4b3a', foliage2: '#4b2f2a' },
    league: 1,
  },
  {
    id: 'canopy', name: 'Emerald Canopy', region: 'The Green Wilds', icon: '❧',
    desc: 'Rainforest islands linked by waterfall bridges and ancient hanging temples.',
    difficulty: 3, laps: 3, length: 3000, biome: 'jungle',
    palette: { skyTop: '#4fbfa8', skyBottom: '#f9f0b8', fog: '#cfe8a6', sun: '#fff4ba', ground: '#4d9c53', rock: '#8b7c57', rock2: '#655b44', accent: '#ffd166', water: '#46c3a0', foliage: '#2f8a4b', foliage2: '#1c6538' },
    league: 2,
  },
  {
    id: 'skyfall', name: 'Skyfall Ruins', region: 'The Forgotten Sky', icon: 'Ω',
    desc: 'Floating temples of a lost dragon civilisation drift through mist and starlight.',
    difficulty: 4, laps: 3, length: 3200, biome: 'ruins',
    palette: { skyTop: '#3c4b8f', skyBottom: '#e7b9e6', fog: '#cfc2e2', sun: '#ffe8f4', ground: '#7f8a7a', rock: '#77708c', rock2: '#524c66', accent: '#9de8ff', water: '#6e9fe0', foliage: '#5b8a6a', foliage2: '#37634f' },
    league: 2,
  },
  {
    id: 'abyss', name: 'Abyss Cliffs', region: 'The Sundered Coast', icon: '≈',
    desc: 'Storm-lashed sea stacks, smuggler caves and impossible rock bridges over a black ocean.',
    difficulty: 4, laps: 3, length: 3300, biome: 'ocean',
    palette: { skyTop: '#2a5b7d', skyBottom: '#a8d5c9', fog: '#b8d6d2', sun: '#f6ffd9', ground: '#6c8a68', rock: '#6e7268', rock2: '#484f4b', accent: '#8fe3c8', water: '#1e6076', foliage: '#4c7a54', foliage2: '#2e543d' },
    league: 3,
  },
  {
    id: 'crown', name: 'Dragon’s Crown', region: 'The Aether', icon: '✦',
    desc: 'The legendary final course: golden ruins adrift above a sea of clouds beneath the aurora.',
    difficulty: 5, laps: 3, length: 3600, biome: 'aether',
    palette: { skyTop: '#1b2b63', skyBottom: '#ffb6c9', fog: '#c8c7f0', sun: '#ffe6b8', ground: '#c9c2a8', rock: '#9c8f9e', rock2: '#655d7c', accent: '#ffe27a', water: '#8fa8ff', foliage: '#7d9b8a', foliage2: '#4f6b67' },
    league: 3,
  },
];
export const TRACK_MAP = Object.fromEntries(TRACKS.map(t => [t.id, t]));

// ── LEAGUES & CHAMPIONSHIPS ─────────────────────────────────────────────────
export const LEAGUES = [
  {
    id: 'hatchling', name: 'Hatchling Cup', icon: '🥚', tier: 1,
    desc: 'First flights over Hearthfall Isle. Prove your wings.',
    tracks: ['hearthfall'], reqLevel: 1, entry: 0,
    rewards: { coins: 600, gems: 2, dragon: null, track: null },
    aiSkill: 0.62, aiSpeed: 0.88, points: 5,
  },
  {
    id: 'skyward', name: 'Skyward League', icon: '✦', tier: 2,
    desc: 'Frost and flame. A three-race tour across the northern skies.',
    tracks: ['hearthfall', 'frostspine', 'cinder'], reqLevel: 4, entry: 150,
    rewards: { coins: 1800, gems: 6, dragon: null, track: 'canopy' },
    aiSkill: 0.73, aiSpeed: 0.94, points: 5,
  },
  {
    id: 'storm', name: 'Storm Circuit', icon: '⚡', tier: 3,
    desc: 'The wild heart of the world. Jungle, ruins and razor winds.',
    tracks: ['canopy', 'skyfall', 'abyss'], reqLevel: 8, entry: 400,
    rewards: { coins: 4200, gems: 14, dragon: 'celestray', track: 'crown' },
    aiSkill: 0.84, aiSpeed: 1.0, points: 5,
  },
  {
    id: 'legend', name: 'Legend Championship', icon: '♛', tier: 4,
    desc: 'Only the finest riders reach the Crown. Become a legend.',
    tracks: ['frostspine', 'skyfall', 'crown'], reqLevel: 12, entry: 900,
    rewards: { coins: 12000, gems: 40, dragon: 'pyrewing', track: null },
    aiSkill: 0.94, aiSpeed: 1.06, points: 5,
  },
];

export const MODES = [
  { id: 'race', name: 'Standard Race', icon: '⚑', desc: 'Six riders. Three laps. First across the line wins.', time: 0 },
  { id: 'trial', name: 'Time Trial', icon: '⏱', desc: 'Fly alone against the clock. Set your best time.', time: 0 },
  { id: 'elimination', name: 'Elimination', icon: '☠', desc: 'Every 20 seconds the last rider is out. Survive.', time: 20 },
  { id: 'checkpoint', name: 'Checkpoint Challenge', icon: '◎', desc: 'Chain rings against the clock. Each gate adds time.', time: 75 },
  { id: 'championship', name: 'Championship', icon: '♛', desc: 'Three connected races. Points decide the champion.', time: 0 },
];

export const COSMETICS = {
  skin: [
    { id: 'default', name: 'Natural Scales', price: 0, desc: 'The colours of the wild.' },
    { id: 'ash', name: 'Ashen Coat', price: 450, desc: 'Smoky charcoal with ember eyes.', tint: { body: '#3f3b42', wing: '#262329', belly: '#8c8188', accent: '#ff9a4d' } },
    { id: 'aurora', name: 'Aurora Hide', price: 900, desc: 'Shifting greens and violet light.', tint: { body: '#57b7a1', wing: '#386e99', belly: '#d9f7df', accent: '#d19bff' } },
    { id: 'royal', name: 'Royal Ember', price: 1400, desc: 'Deep crimson and antique gold.', tint: { body: '#8c2634', wing: '#5a1522', belly: '#f2d39b', accent: '#ffd166' } },
    { id: 'frost', name: 'Frostglass', price: 1200, desc: 'Pale ice with a frozen sheen.', tint: { body: '#cfe9f6', wing: '#8ebcd4', belly: '#ffffff', accent: '#a2f3ff' } },
    { id: 'void', name: 'Voidscale', price: 2200, desc: 'A living slice of the night sky.', tint: { body: '#2c2e4d', wing: '#191a2f', belly: '#7c7ba8', accent: '#b18aff' } },
  ],
  saddle: [
    { id: 'none', name: 'No Saddle', price: 0, desc: 'Ride bareback.' },
    { id: 'leather', name: 'Rider’s Leather', price: 200, desc: 'Village-stamped hide saddle.' },
    { id: 'silver', name: 'Silverwing Saddle', price: 700, desc: 'Polished silver fittings.' },
    { id: 'crown', name: 'Temple Saddle', price: 1500, desc: 'Gold-etched ancient craftsmanship.' },
  ],
  armour: [
    { id: 'none', name: 'Unarmoured', price: 0, desc: 'Nothing between you and the wind.' },
    { id: 'plates', name: 'Iron Plates', price: 600, desc: 'Forged shoulder and chest plates.' },
    { id: 'crystal', name: 'Crystal Guard', price: 1300, desc: 'Shimmering crystal scale armour.' },
    { id: 'gold', name: 'Champion’s Gold', price: 2600, desc: 'Gold trim reserved for champions.' },
  ],
  wings: [
    { id: 'none', name: 'Clean Wings', price: 0, desc: 'Nothing but membrane and bone.' },
    { id: 'ribbons', name: 'Sky Ribbons', price: 400, desc: 'Festival ribbons that stream behind.' },
    { id: 'blades', name: 'Wing Blades', price: 1100, desc: 'Razor wing tips for a sharper silhouette.' },
    { id: 'stars', name: 'Starlit Trails', price: 1900, desc: 'A trail of drifting stars.' },
  ],
  outfit: [
    { id: 'novice', name: 'Novice Rider', price: 0, desc: 'Wool, leather and stubborn hope.', colors: { tunic: '#7a5a3a', trim: '#c9a26b', helm: '#8a6a45' } },
    { id: 'storm', name: 'Storm Rider', price: 500, desc: 'Blue oilskin and a fur mantle.', colors: { tunic: '#2f4e73', trim: '#9fd8e8', helm: '#3b5c82' } },
    { id: 'ember', name: 'Ember Rider', price: 1000, desc: 'Crimson scarf, bronze helm.', colors: { tunic: '#8a3030', trim: '#ffcf6b', helm: '#a85a35' } },
    { id: 'legend', name: 'Legend Rider', price: 2400, desc: 'White and gold, for the chosen.', colors: { tunic: '#e8e2d0', trim: '#ffd166', helm: '#f2e6c8' } },
  ],
};

export const SKILLS = {
  speed: [
    { id: 'sp1', name: 'Windcut', desc: '+6% top speed', cost: 1, req: 0 },
    { id: 'sp2', name: 'Slipstream', desc: '+10% boost force', cost: 2, req: 3 },
    { id: 'sp3', name: 'Skybreaker', desc: '+12% top speed', cost: 3, req: 7 },
  ],
  acrobatics: [
    { id: 'ac1', name: 'Banking', desc: '+10% turning rate', cost: 1, req: 0 },
    { id: 'ac2', name: 'Barrel Roll', desc: 'Shorter manoeuvre cooldown', cost: 2, req: 3 },
    { id: 'ac3', name: 'Wind Dance', desc: '+15% handling and agility', cost: 3, req: 7 },
  ],
  endurance: [
    { id: 'en1', name: 'Deep Lungs', desc: '+15% stamina', cost: 1, req: 0 },
    { id: 'en2', name: 'Second Wind', desc: 'Stamina regenerates faster', cost: 2, req: 3 },
    { id: 'en3', name: 'Tireless', desc: 'Boosting costs 25% less stamina', cost: 3, req: 7 },
  ],
};
export const SKILL_LIST = Object.values(SKILLS).flat();

// ── VILLAGE ─────────────────────────────────────────────────────────────────
export const BUILDINGS = [
  { id: 'hall', name: 'Dragon Hall', icon: '⌂', desc: 'The heart of your village. Increases dragon XP from all sources.', max: 3, costs: [0, 1200, 3000], bonus: [0, 0.08, 0.16, 0.26], bonusText: ['—', '+8% Dragon XP', '+16% Dragon XP', '+26% Dragon XP'], x: -34, z: 18, scale: 1.2 },
  { id: 'habitat', name: 'Sky Habitat', icon: '◔', desc: 'A cliffside roost. Homes collected dragons and lifts their bond.', max: 3, costs: [800, 1600, 3200], bonus: [0, 1, 2, 3], bonusText: ['—', 'Houses 2 dragons', 'Houses 4 dragons', 'Houses 6 dragons'], x: 30, z: 24, scale: 1.0 },
  { id: 'arena', name: 'Training Arena', icon: '◎', desc: 'Wind-battered rings for practice. Improves stat upgrades.', max: 3, costs: [1000, 2200, 4000], bonus: [0, 0.1, 0.2, 0.3], bonusText: ['—', '+10% stat gains', '+20% stat gains', '+30% stat gains'], x: 6, z: -26, scale: 1.0 },
  { id: 'feeding', name: 'Feeding Station', icon: '❧', desc: 'Fresh fish and warm hearths. Bond actions are stronger.', max: 3, costs: [600, 1400, 2600], bonus: [0, 0.15, 0.3, 0.5], bonusText: ['—', '+15% bond gains', '+30% bond gains', '+50% bond gains'], x: -16, z: -18, scale: 0.9 },
  { id: 'breeding', name: 'Breeding Roost', icon: '✧', desc: 'A quiet nesting ground. Unlocks rare egg discoveries.', max: 3, costs: [2000, 3600, 6000], bonus: [0, 1, 2, 3], bonusText: ['—', 'Egg finder I', 'Egg finder II', 'Egg finder III'], x: 40, z: -10, scale: 0.9 },
  { id: 'decor', name: 'Festival Grounds', icon: '✦', desc: 'Banners, braziers and a market stall. Boosts race coin rewards.', max: 3, costs: [700, 1500, 3000], bonus: [0, 0.05, 0.1, 0.18], bonusText: ['—', '+5% race coins', '+10% race coins', '+18% race coins'], x: -40, z: -14, scale: 0.9 },
];

// ── EXPLORATION ─────────────────────────────────────────────────────────────
export const EXPLORE_ZONES = [
  { id: 'hearthfall', name: 'Hearthfall Isle', biome: 'viking', reqLevel: 1, hidden: 'emberling', desc: 'Gentle cliffs, warm updrafts and old watchtowers.' },
  { id: 'frostspine', name: 'Frostspine Peaks', biome: 'snow', reqLevel: 3, hidden: 'glacielle', desc: 'Frozen waterfalls hide a queen of winter.' },
  { id: 'cinder', name: 'Cinder Caldera', biome: 'volcano', reqLevel: 5, hidden: 'cinderclaw', desc: 'Rivers of fire and a nest of embers.' },
  { id: 'canopy', name: 'Emerald Canopy', biome: 'jungle', reqLevel: 6, hidden: 'verdantwyrm', desc: 'Rainforest islands where old trees whisper.' },
  { id: 'skyfall', name: 'Skyfall Ruins', biome: 'ruins', reqLevel: 8, hidden: 'obsidrake', desc: 'Broken temples drift above the clouds.' },
  { id: 'abyss', name: 'Abyss Cliffs', biome: 'ocean', reqLevel: 10, hidden: 'tidecoil', desc: 'Sea caves guard a serpent of the deep.' },
];

export const DAILY_POOL = [
  { id: 'race1', text: 'Complete a race', stat: 'races', goal: 1, coins: 300, xp: 60, icon: '⚑' },
  { id: 'race3', text: 'Finish 3 races', stat: 'races', goal: 3, coins: 600, xp: 120, icon: '⚑' },
  { id: 'boost', text: 'Spend 20s boosting', stat: 'boostTime', goal: 20, coins: 350, xp: 70, icon: '↯' },
  { id: 'gates', text: 'Pass 30 gates', stat: 'gates', goal: 30, coins: 400, xp: 80, icon: '◎' },
  { id: 'win1', text: 'Win a race', stat: 'wins', goal: 1, coins: 700, xp: 150, icon: '♛' },
  { id: 'orbs', text: 'Collect 5 sky shards', stat: 'orbs', goal: 5, coins: 450, xp: 90, icon: '✦' },
  { id: 'bond', text: 'Complete 2 bond actions', stat: 'bonds', goal: 2, coins: 250, xp: 50, icon: '♥' },
  { id: 'upgrade', text: 'Upgrade a dragon', stat: 'upgrades', goal: 1, coins: 300, xp: 60, icon: '↑' },
  { id: 'trial', text: 'Finish a time trial', stat: 'trials', goal: 1, coins: 400, xp: 80, icon: '⏱' },
];

// Leaderboard flavour names (local simulated ghosts)
export const RIVAL_NAMES = [
  'Astrid Vane', 'Kael Stormrider', 'Mira Ashfoot', 'Bram Ironwing', 'Sigrun Skysong',
  'Torvyn Grey', 'Lyra Emberfall', 'Eirik Halcyon', 'Nessa Wildwind', 'Dain Blackscale',
  'Solvei Wren', 'Rook Ashborn', 'Freya Tideline', 'Ulf Thunderhand', 'Sable Nightfall',
];
export const AI_DRAGONS = ['gustwing', 'sunspark', 'frostfang', 'duskfair', 'stormcrest', 'cinderclaw', 'tidecoil', 'obsidrake', 'celestray'];

export const RARITY_ORDER = ['common', 'rare', 'epic', 'legendary', 'mythical'];
