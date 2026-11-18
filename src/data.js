// ── DRAGON RUSH · RACE OF LEGENDS ─────────────────────────────────────────────
// Original world data: dragons, biomes, leagues, cosmetics and challenges.

export const RARITIES = {
  common:    { name: 'Common',    color: '#9fb4c7', glow: 'rgba(159,180,199,.45)', mult: 1.0, tier: 1 },
  rare:      { name: 'Rare',      color: '#4fc3f7', glow: 'rgba(79,195,247,.5)',  mult: 1.08, tier: 4 },
  epic:      { name: 'Epic',      color: '#b46cf5', glow: 'rgba(180,108,245,.55)', mult: 1.17, tier: 7 },
  legendary: { name: 'Legendary', color: '#ffb545', glow: 'rgba(255,181,69,.6)',  mult: 1.27, tier: 11 },
  mythical:  { name: 'Mythical',  color: '#ff6bd6', glow: 'rgba(255,107,214,.65)', mult: 1.38, tier: 15 },
};

// The five legacy ranks expand into a 15-tier progression. Existing saves,
// species and race balance remain compatible while future species can occupy
// the intermediate legendary/ascendant ranks.
export const RARITY_TIERS = [
  { id: 'common', name: 'Common', color: '#9fb4c7', mult: 1.00 },
  { id: 'uncommon', name: 'Uncommon', color: '#79d6a3', mult: 1.04 },
  { id: 'scarce', name: 'Scarce', color: '#65bfa3', mult: 1.06 },
  { id: 'rare', name: 'Rare', color: '#4fc3f7', mult: 1.08 },
  { id: 'elite', name: 'Elite', color: '#63a8ff', mult: 1.11 },
  { id: 'exceptional', name: 'Exceptional', color: '#8d86ff', mult: 1.14 },
  { id: 'epic', name: 'Epic', color: '#b46cf5', mult: 1.17 },
  { id: 'heroic', name: 'Heroic', color: '#d66cb7', mult: 1.20 },
  { id: 'exalted', name: 'Exalted', color: '#e86c96', mult: 1.23 },
  { id: 'fabled', name: 'Fabled', color: '#f18c68', mult: 1.25 },
  { id: 'legendary', name: 'Legendary', color: '#ffb545', mult: 1.27 },
  { id: 'mythic', name: 'Mythic', color: '#ffc76b', mult: 1.31 },
  { id: 'celestial', name: 'Celestial', color: '#ffe7a3', mult: 1.34 },
  { id: 'astral', name: 'Astral', color: '#ff9be8', mult: 1.36 },
  { id: 'mythical', name: 'Mythical', color: '#ff6bd6', mult: 1.38 },
];

const D = (o) => o;
// Expanded bestiary entries share one normaliser so every species has a home.
const N = (o) => ({ habitat: o.habitat || (o.family === 'hybrid' ? 'ancient' : o.family), ...o });

export const HABITAT_INFO = {
  fire:    { name: 'Fire',    home: 'Ember Hollow',   icon: '🔥', accent: '#ff7a3d', desc: 'A volcanic shelf of warm basalt, glowing embers and a banked forge. Fire dragons sleep in the heat.' },
  ice:     { name: 'Ice',     home: 'Frost Grotto',   icon: '❄', accent: '#8fe8ff', desc: 'A frozen cave of blue ice and old snow. Frost dragons rest on platforms that never melt.' },
  night:   { name: 'Night',   home: 'Dusk Warren',    icon: '☾', accent: '#b18aff', desc: 'A secluded cave of velvet dark, lit only by slow violet crystals. Night dragons keep their own hours.' },
  forest:  { name: 'Forest',  home: 'Green Roost',    icon: '❧', accent: '#b8e86a', desc: 'A living bower of moss, blossom and warm wind. Forest dragons nest where saplings grow between stones.' },
  ocean:   { name: 'Ocean',   home: 'Tidal Terrace',  icon: '≈', accent: '#7cf0ff', desc: 'A salt-sprayed terrace above a clear pool. Ocean dragons doze to the sound of falling water.' },
  storm:   { name: 'Storm',   home: 'Thunder Perch',  icon: '⚡', accent: '#a6f7ff', desc: 'A high stone perch open to the weather. Storm dragons hang from the crag and taste the coming rain.' },
  earth:   { name: 'Earth',   home: 'Stone Circle',   icon: '⛰', accent: '#ffb45e', desc: 'A ring of standing stones and packed earth. Earth dragons bask on the warm rock like cats.' },
  venom:   { name: 'Venom',   home: 'Bramble Pit',    icon: '☣', accent: '#c8ff6a', desc: 'A sheltered hollow of thorn, fungus and slow green light. Venom dragons are calmer than they look.' },
  ancient: { name: 'Ancient', home: 'Rune Sanctum',   icon: '✦', accent: '#ffd166', desc: 'A quiet sanctum of rune-carved stone. Ancient dragons remember when the sanctuary was only a hill.' },
  hybrid:  { name: 'Hybrid',  home: 'Wild Roost',     icon: '✧', accent: '#ff9de2', desc: 'A borderless roost for dragons of two natures. They choose their own favourite corner.' },
};

export const FAMILY_ORDER = ['fire', 'ice', 'night', 'forest', 'ocean', 'storm', 'earth', 'venom', 'ancient', 'hybrid'];

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
    shape: { body: 0.95, wings: 1.24, neck: 1.1, tail: 1.15, horns: 3, spikes: 0.4, legs: 0.9, head: 0.95, pattern: 'glow', hornType: 'crown', wingType: 'ethereal', tailType: 'feather', idle: 'shy' },
    stats: { speed: 7, accel: 7, stamina: 7, handling: 9 },
    ability: { name: 'Nightveil', type: 'veil', cd: 14, desc: 'Fades into twilight, confusing rivals.' },
  }),
  D({
    id: 'frostfang', name: 'Frostfang', epithet: 'Winter’s Tooth',
    desc: 'Glacial hunter from the Frostspine. Its breath leaves a trail of glittering frost.',
    rarity: 'rare', price: 3200, unlock: 'Buy in Dragon Market',
    palette: { body: '#8fd3e8', belly: '#f2fbff', wing: '#5fa9c9', accent: '#b7f0ff', horn: '#ecfeff', eye: '#3ea6d8' },
    shape: { body: 1.05, wings: 1.12, neck: 1.0, tail: 1.0, horns: 2, spikes: 0.8, legs: 1.0, head: 1.0, pattern: 'streaks', hornType: 'spike', wingType: 'feather', tailType: 'spade', idle: 'fierce' },
    stats: { speed: 8, accel: 7, stamina: 6, handling: 8 },
    ability: { name: 'Frost Gale', type: 'slow', cd: 15, desc: 'An icy squall slows nearby rivals.' },
  }),
  D({
    id: 'tidecoil', name: 'Tidecoil', epithet: 'Serpent of the Deep',
    desc: 'A sinuous sea-dragon that cuts through spray and storm alike.',
    rarity: 'rare', price: 3600, unlock: 'Buy in Dragon Market',
    palette: { body: '#2f8f95', belly: '#c6f0e6', wing: '#1f6a72', accent: '#7cf0d4', horn: '#d9fff7', eye: '#8df5d2' },
    shape: { body: 1.0, wings: 1.05, neck: 1.3, tail: 1.45, horns: 0, spikes: 0.5, legs: 0.85, head: 1.0, pattern: 'scales', headType: 'serpent', wingType: 'fin', tailType: 'fin', idle: 'calm' },
    stats: { speed: 7, accel: 8, stamina: 8, handling: 7 },
    ability: { name: 'Tidal Surge', type: 'dash', cd: 12, desc: 'Ride a wave of momentum forward.' },
  }),
  D({
    id: 'sunspark', name: 'Sunspark', epithet: 'Golden Hour',
    desc: 'A radiant sky-dancer that stores sunlight in its feathery crest.',
    rarity: 'rare', price: 4200, unlock: 'Buy in Dragon Market',
    palette: { body: '#e8a63a', belly: '#fff0c0', wing: '#d4812a', accent: '#ffe27a', horn: '#fff5d0', eye: '#ff9f1c' },
    shape: { body: 0.95, wings: 1.22, neck: 1.0, tail: 1.2, horns: 2, spikes: 0.4, legs: 0.9, head: 0.9, pattern: 'glow', hornType: 'crown', wingType: 'feather', tailType: 'feather', idle: 'proud' },
    stats: { speed: 8, accel: 9, stamina: 7, handling: 8 },
    ability: { name: 'Solar Flare', type: 'dash', cd: 12, desc: 'Blinding golden acceleration.' },
  }),
  D({
    id: 'cinderclaw', name: 'Cinderclaw', epithet: 'Ember of the Caldera',
    desc: 'Forged in the Cinder Caldera, its wingbeats scatter embers across the sky.',
    rarity: 'epic', price: 9000, unlock: 'Buy in Dragon Market',
    palette: { body: '#8f2b22', belly: '#3b2b2c', wing: '#5a1714', accent: '#ff7b32', horn: '#2d2222', eye: '#ffbe3d' },
    shape: { body: 1.16, wings: 1.15, neck: 1.05, tail: 1.15, horns: 3, spikes: 1.1, legs: 1.1, head: 1.1, pattern: 'lava', headType: 'hammer', tailType: 'club', backFin: true, idle: 'fierce' },
    stats: { speed: 9, accel: 8, stamina: 8, handling: 7 },
    ability: { name: 'Magma Rush', type: 'dash', cd: 10, desc: 'Erupts forward on a pillar of flame.' },
  }),
  D({
    id: 'stormcrest', name: 'Stormcrest', epithet: 'Thunder Made Flesh',
    desc: 'A razor-winged hunter that dives with the fury of a storm front.',
    rarity: 'epic', price: 11000, unlock: 'Buy in Dragon Market',
    palette: { body: '#3f4d9e', belly: '#c3caf5', wing: '#28306e', accent: '#7ee8ff', horn: '#e0e6ff', eye: '#71f0ff' },
    shape: { body: 1.02, wings: 1.28, neck: 1.0, tail: 1.2, horns: 2, spikes: 0.9, legs: 0.95, head: 1.0, pattern: 'streaks', hornType: 'spike', tailType: 'whip', backFin: true, idle: 'fierce' },
    stats: { speed: 10, accel: 8, stamina: 7, handling: 9 },
    ability: { name: 'Thunder Dive', type: 'dash', cd: 11, desc: 'A lightning-fast aerial strike.' },
  }),
  D({
    id: 'verdantwyrm', name: 'Verdant Wyrm', epithet: 'The Living Canopy',
    desc: 'Ancient jungle guardian whose wings bloom with rare sky-flowers.',
    rarity: 'epic', price: 10000, unlock: 'Buy in Dragon Market',
    palette: { body: '#3f8c5a', belly: '#e2f5b0', wing: '#2c6b46', accent: '#ffd97a', horn: '#d9e8b0', eye: '#ffe066' },
    shape: { body: 1.08, wings: 1.18, neck: 1.25, tail: 1.3, horns: 2, spikes: 0.7, legs: 1.0, head: 1.05, pattern: 'glow', hornType: 'antlers', tailType: 'twin', mane: true, idle: 'calm' },
    stats: { speed: 7, accel: 7, stamina: 10, handling: 8 },
    ability: { name: 'Bloom Guard', type: 'heal', cd: 14, desc: 'Blossoms restore stamina and shield.' },
  }),
  D({
    id: 'obsidrake', name: 'Obsidrake', epithet: 'Shadow of the Ruins',
    desc: 'A silent black-glass dragon said to guard the forgotten Skyfall temples.',
    rarity: 'epic', price: 12500, unlock: 'Find in Skyfall Ruins',
    palette: { body: '#262a3d', belly: '#5b5f7a', wing: '#171a29', accent: '#9d7bff', horn: '#d9d4ff', eye: '#b18aff' },
    shape: { body: 1.1, wings: 1.2, neck: 1.05, tail: 1.2, horns: 3, spikes: 1.0, legs: 1.0, head: 1.0, pattern: 'glow', headType: 'hammer', hornType: 'crown', tailType: 'club', backFin: true, idle: 'fierce' },
    stats: { speed: 9, accel: 9, stamina: 8, handling: 8 },
    ability: { name: 'Shadow Wing', type: 'veil', cd: 13, desc: 'Vanishes into living shadow.' },
  }),
  D({
    id: 'celestray', name: 'Celestray', epithet: 'Star of the High Reaches',
    desc: 'Its wings hold a map of the night sky. Legend says it can fly between constellations.',
    rarity: 'legendary', price: 0, unlock: 'Win the Storm Circuit',
    palette: { body: '#6789c9', belly: '#eef4ff', wing: '#3c5a99', accent: '#a8f0ff', horn: '#f4f9ff', eye: '#a6f7ff' },
    shape: { body: 1.0, wings: 1.3, neck: 1.15, tail: 1.3, horns: 3, spikes: 0.5, legs: 0.9, head: 1.0, pattern: 'stars', hornType: 'crown', wingType: 'ethereal', tailType: 'twin', tendrils: true, idle: 'regal' },
    stats: { speed: 10, accel: 9, stamina: 9, handling: 10 },
    ability: { name: 'Starfall', type: 'gale', cd: 13, desc: 'Calls down a slipstream of starlight.' },
  }),
  D({
    id: 'pyrewing', name: 'Pyrewing', epithet: 'The Rebirth Flame',
    desc: 'A phoenix-hearted dragon. When it falls, it rises brighter than before.',
    rarity: 'legendary', price: 0, unlock: 'Win the Legend Championship',
    palette: { body: '#d84b6b', belly: '#ffd9a0', wing: '#a52d58', accent: '#ffd166', horn: '#ffe9c4', eye: '#ffde59' },
    shape: { body: 1.03, wings: 1.32, neck: 1.05, tail: 1.28, horns: 4, spikes: 0.5, legs: 0.9, head: 0.95, pattern: 'lava', hornType: 'crown', wingType: 'feather', tailType: 'feather', mane: true, idle: 'proud' },
    stats: { speed: 10, accel: 10, stamina: 9, handling: 9 },
    ability: { name: 'Phoenix Rise', type: 'dash', cd: 9, desc: 'Ignites into a blazing rebirth dive.' },
  }),
  D({
    id: 'glacielle', name: 'Glacielle', epithet: 'Crown of Winter',
    desc: 'The glacier queen of Frostspine. Her wings are carved from ancient blue ice.',
    rarity: 'legendary', price: 0, unlock: 'Explore the Frostspine Peaks',
    palette: { body: '#b8e6ff', belly: '#ffffff', wing: '#83c9ea', accent: '#d8b4ff', horn: '#ffffff', eye: '#ff9be0' },
    shape: { body: 1.05, wings: 1.28, neck: 1.2, tail: 1.25, horns: 4, spikes: 1.0, legs: 1.0, head: 1.02, pattern: 'stars', headType: 'frilled', hornType: 'spike', wingType: 'fin', tailType: 'spade', backFin: true, idle: 'calm' },
    stats: { speed: 9, accel: 8, stamina: 10, handling: 9 },
    ability: { name: 'Absolute Zero', type: 'slow', cd: 14, desc: 'Freezes the air around every rival.' },
  }),
  D({
    id: 'aetherion', name: 'Aetherion', epithet: 'The World Between Winds',
    desc: 'A mythical prismatic dragon that appears only to riders who have mastered every sky.',
    rarity: 'mythical', price: 0, unlock: 'Conquer all four leagues for the Dragon’s Crown',
    palette: { body: '#ded7ff', belly: '#ffffff', wing: '#9c86e2', accent: '#ffd9a0', horn: '#f2ecff', eye: '#7cf7ff' },
    shape: { body: 0.96, width: 0.86, length: 1.18, wings: 1.62, neck: 1.28, tail: 1.16, horns: 4, spikes: 0.5, legs: 0.94, head: 1.2, pattern: 'prism', headType: 'serpent', hornType: 'crown', wingType: 'ethereal', tailType: 'twin', backFin: true, tendrils: true, idle: 'regal' },
    stats: { speed: 10, accel: 10, stamina: 10, handling: 10 },
    ability: { name: 'Worldsong', type: 'aegis', cd: 12, desc: 'The sky itself carries you forward.' },
  }),
  D({
    id: 'solstice', name: 'Solstice', epithet: 'Harbinger of the Skyfire',
    desc: 'A festival dragon wreathed in ribbons of dawn. Limited seasonal discovery.',
    rarity: 'legendary', price: 0, unlock: 'Skyfire Festival event',
    palette: { body: '#ff9a5c', belly: '#fff3cf', wing: '#e8615f', accent: '#7cf0ff', horn: '#fff0d8', eye: '#8ff8ff' },
    shape: { body: 1.0, wings: 1.3, neck: 1.1, tail: 1.25, horns: 3, spikes: 0.6, legs: 0.95, head: 1.0, pattern: 'prism', hornType: 'antlers', wingType: 'feather', tailType: 'feather', mane: true, idle: 'proud' },
    stats: { speed: 9, accel: 9, stamina: 9, handling: 9 },
    ability: { name: 'Skyfire', type: 'gale', cd: 12, desc: 'Ribbons of festival fire propel you onward.' },
  }),

  // ── The expanded bestiary: 49 further species across ten families ──────────
  N({
    id: 'magmaw', name: 'Magmaw', epithet: 'The Molten Maw',
    desc: 'A furnace-chested brute that cracks basalt with every footfall. Its jaw glows from the inside.',
    family: 'fire', rarity: 'epic', price: 7600, unlock: 'Buy in Dragon Market',
    palette: { body: '#5a2620', belly: '#ffb347', wing: '#3a1512', accent: '#ff6a1f', horn: '#2b1a17', eye: '#ffe066' },
    shape: { body: 1.28, width: 1.22, length: 1.06, wings: 0.92, neck: 0.8, tail: 0.9, horns: 2, spikes: 1.2, legs: 1.25, head: 1.3, jaw: 1.35, hornsType: 'curved', pattern: 'lava', tailType: 'club', idle: 'fierce' },
    stats: { speed: 8, accel: 7, stamina: 10, handling: 6 },
    ability: { name: 'Magma Maw', type: 'inferno', cd: 14, desc: 'Vents a cone of fire that scorches the pursuit.' },
  }),
  N({
    id: 'ashenwyrm', name: 'Ashenwyrm', epithet: 'Grey Sovereign',
    desc: 'A long smoke-grey wyrm that nests in cooled lava tubes. Its wingbeats leave drifting ash.',
    family: 'fire', rarity: 'rare', price: 3400, unlock: 'Buy in Dragon Market',
    palette: { body: '#6b6770', belly: '#d9d3cc', wing: '#4a464f', accent: '#ff9a4d', horn: '#d8d2c8', eye: '#ffb347' },
    shape: { body: 0.94, width: 0.88, length: 1.2, wings: 1.2, neck: 1.3, tail: 1.45, horns: 2, spikes: 0.5, legs: 0.9, head: 0.92, headType: 'serpent', pattern: 'stripes', hornType: 'spike', wingType: 'ethereal', tailType: 'whip', backFin: true, mane: true, idle: 'calm' },
    stats: { speed: 8, accel: 6, stamina: 8, handling: 8 },
    ability: { name: 'Ash Cloak', type: 'veil', cd: 13, desc: 'Wraps itself in a choking veil of cinders.' },
  }),
  N({
    id: 'cinderveil', name: 'Cinderveil', epithet: 'Moth of the Pyre',
    desc: 'A delicate ember-moth dragon with twin pairs of glowing wings. It dances above the caldera rim.',
    family: 'fire', rarity: 'rare', price: 3900, unlock: 'Buy in Dragon Market',
    palette: { body: '#7a3b2e', belly: '#ffd9a0', wing: '#d9602f', accent: '#ffd166', horn: '#f3dfc4', eye: '#ffe27a' },
    shape: { body: 0.82, width: 0.86, length: 0.9, wings: 1.34, neck: 0.95, tail: 1.1, horns: 0, spikes: 0.2, legs: 0.8, head: 0.88, pattern: 'glow', wingType: 'insect', tailType: 'feather', idle: 'playful', tendrils: true },
    stats: { speed: 7, accel: 9, stamina: 6, handling: 10 },
    ability: { name: 'Ember Dance', type: 'gale', cd: 12, desc: 'Scatters burning scales into a rising thermal.' },
  }),
  N({
    id: 'scorchwing', name: 'Scorchwing', epithet: 'Little Firebrand',
    desc: 'A scrappy hatchling-sized racer with singed wingtips and more courage than sense.',
    family: 'fire', rarity: 'common', price: 1100, unlock: 'Buy in Dragon Market',
    palette: { body: '#c4562e', belly: '#ffe0a3', wing: '#8f3420', accent: '#ffcf5c', horn: '#ffe9c9', eye: '#fff0a0' },
    shape: { body: 0.88, width: 0.9, length: 0.94, wings: 1.02, neck: 0.9, tail: 0.95, horns: 2, spikes: 0.7, legs: 0.9, head: 0.98, pattern: 'streaks', tailType: 'spade', idle: 'playful' },
    stats: { speed: 6, accel: 8, stamina: 5, handling: 8 },
    ability: { name: 'Scorch Step', type: 'dash', cd: 12, desc: 'A skittering burst of flame-fed speed.' },
  }),
  N({
    id: 'pyrehorn', name: 'Pyrehorn', epithet: 'The Crowned Kiln',
    desc: 'Its many-branched crown of horns glows like a forge. Old riders say it can smell a storm coming.',
    family: 'fire', rarity: 'epic', price: 8800, unlock: 'Buy in Dragon Market',
    palette: { body: '#7d2c24', belly: '#f2b56b', wing: '#511a16', accent: '#ffd166', horn: '#3a2620', eye: '#ffce54' },
    shape: { body: 1.12, width: 1.05, length: 1.02, wings: 1.14, neck: 1.1, tail: 1.05, horns: 4, spikes: 1.0, legs: 1.1, head: 1.12, hornType: 'crown', pattern: 'lava', idle: 'regal' },
    stats: { speed: 9, accel: 8, stamina: 8, handling: 7 },
    ability: { name: 'Pyre Crown', type: 'inferno', cd: 13, desc: 'The horns ignite, scattering rivals in a wave of heat.' },
  }),
  N({
    id: 'emberdrake', name: 'Emberdrake', epithet: 'Hearth Guardian',
    desc: 'A compact two-legged drake that tends the village braziers and sleeps beside the coals.',
    family: 'fire', rarity: 'common', price: 1500, unlock: 'Buy in Dragon Market',
    palette: { body: '#b24a30', belly: '#f6d49a', wing: '#7d2f20', accent: '#ffb45e', horn: '#f0ddc0', eye: '#ffd166' },
    shape: { body: 1.02, width: 1.0, length: 0.95, wings: 0.86, neck: 0.92, tail: 0.9, horns: 1, spikes: 0.5, legs: 1.1, head: 1.05, legType: 'raptor', pattern: 'scales', idle: 'curious' },
    stats: { speed: 6, accel: 7, stamina: 7, handling: 7 },
    ability: { name: 'Hearth Warmth', type: 'heal', cd: 15, desc: 'Draws on the home fire to restore stamina.' },
  }),

  N({
    id: 'frostwyrm', name: 'Frostwyrm', epithet: 'The Long Winter',
    desc: 'A serpentine glacier-dweller whose breath hangs in the air as glittering needles.',
    family: 'ice', rarity: 'rare', price: 3600, unlock: 'Buy in Dragon Market',
    palette: { body: '#7fb7cf', belly: '#eefaff', wing: '#568ea9', accent: '#b7f0ff', horn: '#f2ffff', eye: '#65d9ff' },
    shape: { body: 0.9, width: 0.84, length: 1.22, wings: 1.08, neck: 1.42, tail: 1.5, horns: 2, spikes: 0.5, legs: 0.82, head: 0.9, headType: 'serpent', pattern: 'stars', hornType: 'frill', wingType: 'fin', tailType: 'whip', idle: 'calm' },
    stats: { speed: 8, accel: 7, stamina: 8, handling: 9 },
    ability: { name: 'Winter Breath', type: 'slow', cd: 14, desc: 'A cone of frost that saps rival speed.' },
  }),
  N({
    id: 'glacierback', name: 'Glacierback', epithet: 'The Walking Iceberg',
    desc: 'A mountain of a dragon with a spine of blue ice. Whole villages shelter beneath its wings.',
    family: 'ice', rarity: 'epic', price: 9200, unlock: 'Buy in Dragon Market',
    palette: { body: '#8fc3d8', belly: '#f5fdff', wing: '#6a9fb8', accent: '#9ef0ff', horn: '#e8fbff', eye: '#3fb5e8' },
    shape: { body: 1.36, width: 1.28, length: 1.12, wings: 1.0, neck: 0.9, tail: 0.95, horns: 2, spikes: 1.4, legs: 1.3, head: 1.16, pattern: 'scales', backFin: true, tailType: 'club', idle: 'sleepy' },
    stats: { speed: 6, accel: 5, stamina: 12, handling: 5 },
    ability: { name: 'Glacier Wall', type: 'stone', cd: 16, desc: 'Ice-armours its hide and steadies the winds.' },
  }),
  N({
    id: 'rimeclaw', name: 'Rimeclaw', epithet: 'Frostfang’s Kin',
    desc: 'A stocky snow-prowler with curling tusks and a fondness for warm chimneys.',
    family: 'ice', rarity: 'common', price: 1300, unlock: 'Buy in Dragon Market',
    palette: { body: '#b9dbe8', belly: '#ffffff', wing: '#8cb6c8', accent: '#c8f4ff', horn: '#ffffff', eye: '#5cc8f0' },
    shape: { body: 1.12, width: 1.08, length: 0.92, wings: 0.94, neck: 0.86, tail: 0.9, horns: 2, spikes: 0.8, legs: 1.15, head: 1.08, tusks: true, pattern: 'spots', idle: 'shy' },
    stats: { speed: 5, accel: 6, stamina: 9, handling: 6 },
    ability: { name: 'Hoarfrost', type: 'aegis', cd: 15, desc: 'A rime of ice softens every impact.' },
  }),
  N({
    id: 'snowveil', name: 'Snowveil', epithet: 'Ghost of the Pass',
    desc: 'A near-translucent drifter that appears only during blizzards. Its wings shimmer like falling snow.',
    family: 'ice', rarity: 'rare', price: 4400, unlock: 'Buy in Dragon Market',
    palette: { body: '#d7ecf7', belly: '#ffffff', wing: '#b8dcef', accent: '#b18aff', horn: '#ffffff', eye: '#8ff8ff' },
    shape: { body: 0.88, width: 0.82, length: 1.08, wings: 1.36, neck: 1.18, tail: 1.32, horns: 1, spikes: 0.3, legs: 0.85, head: 0.9, pattern: 'prism', hornType: 'antlers', wingType: 'ethereal', tailType: 'feather', mane: true, idle: 'shy' },
    stats: { speed: 8, accel: 8, stamina: 8, handling: 9 },
    ability: { name: 'Whiteout', type: 'veil', cd: 14, desc: 'Vanishes into the blizzard, leaving rivals blind.' },
  }),
  N({
    id: 'iciclaw', name: 'Iciclaw', epithet: 'Spear of the North',
    desc: 'Its forelimbs end in dagger-long icicles. It perches on cliff edges like a frozen gargoyle.',
    family: 'ice', rarity: 'epic', price: 7800, unlock: 'Buy in Dragon Market',
    palette: { body: '#6fa8c4', belly: '#dff7ff', wing: '#4d7e99', accent: '#aef7ff', horn: '#eaffff', eye: '#69e6ff' },
    shape: { body: 1.0, width: 0.94, length: 1.04, wings: 1.16, neck: 1.02, tail: 1.12, horns: 3, spikes: 1.1, legs: 1.0, head: 1.0, hornType: 'spike', pattern: 'streaks', tailType: 'spade', idle: 'fierce' },
    stats: { speed: 9, accel: 8, stamina: 8, handling: 8 },
    ability: { name: 'Shatter Dive', type: 'dash', cd: 11, desc: 'A spear-straight dive trailing splinters of ice.' },
  }),
  N({
    id: 'aurorafin', name: 'Aurorafin', epithet: 'Light of the Long Night',
    desc: 'A legendary sky-whale of the polar dark, its fins painted with the northern lights.',
    family: 'ice', rarity: 'legendary', price: 16000, unlock: 'Buy in Dragon Market',
    palette: { body: '#6d8fbf', belly: '#e8f8ff', wing: '#5ac8c8', accent: '#a6ffd9', horn: '#eaffff', eye: '#b7f0ff' },
    shape: { body: 1.18, width: 1.06, length: 1.16, wings: 1.5, neck: 1.14, tail: 1.3, horns: 2, spikes: 0.4, legs: 0.86, head: 1.0, pattern: 'prism', wingType: 'fin', tailType: 'twin', idle: 'regal' },
    stats: { speed: 9, accel: 8, stamina: 11, handling: 9 },
    ability: { name: 'Aurora Tide', type: 'tide', cd: 13, desc: 'Polar light floods its wings, restoring wind and speed.' },
  }),

  N({
    id: 'noxwing', name: 'Noxwing', epithet: 'Dusk Hunter',
    desc: 'A velvet-black hunter with eyes like banked coals. It hunts the hour between day and dark.',
    family: 'night', rarity: 'rare', price: 3800, unlock: 'Buy in Dragon Market',
    palette: { body: '#2e2a3f', belly: '#6b6485', wing: '#1b1828', accent: '#b18aff', horn: '#cfc6e8', eye: '#d7a6ff' },
    shape: { body: 0.96, width: 0.9, length: 1.06, wings: 1.24, neck: 1.06, tail: 1.16, horns: 2, spikes: 0.6, legs: 0.95, head: 0.98, pattern: 'glow', headType: 'frilled', hornType: 'spike', tailType: 'whip', idle: 'fierce' },
    stats: { speed: 8, accel: 8, stamina: 7, handling: 9 },
    ability: { name: 'Nightfall', type: 'veil', cd: 13, desc: 'Folds the dusk around itself.' },
  }),
  N({
    id: 'umbralisk', name: 'Umbralisk', epithet: 'The Coiled Dark',
    desc: 'A crowned serpent that lives in lightless ruins. Its frill unfolds like a black sun.',
    family: 'night', rarity: 'epic', price: 9800, unlock: 'Buy in Dragon Market',
    palette: { body: '#241f36', belly: '#574c78', wing: '#151222', accent: '#9d7bff', horn: '#b9a6ff', eye: '#c8a6ff' },
    shape: { body: 0.94, width: 0.86, length: 1.24, wings: 1.04, neck: 1.38, tail: 1.5, horns: 3, spikes: 0.5, legs: 0.8, head: 0.94, headType: 'frilled', hornType: 'frill', pattern: 'stars', tailType: 'twin', idle: 'regal' },
    stats: { speed: 8, accel: 8, stamina: 9, handling: 9 },
    ability: { name: 'Umbral Coil', type: 'slow', cd: 14, desc: 'Shadow coils around rivals, dragging them back.' },
  }),
  N({
    id: 'moonfang', name: 'Moonfang', epithet: 'Silver of the Night',
    desc: 'A pale moon-marked dragon that hunts by starlight and sings to the tides.',
    family: 'night', rarity: 'rare', price: 4600, unlock: 'Buy in Dragon Market',
    palette: { body: '#8d93bf', belly: '#eef0ff', wing: '#646a9c', accent: '#c8d4ff', horn: '#f4f6ff', eye: '#a6f7ff' },
    shape: { body: 1.0, width: 0.96, length: 1.02, wings: 1.18, neck: 1.0, tail: 1.08, horns: 2, spikes: 0.7, legs: 0.98, head: 1.0, tusks: true, pattern: 'stars', tailType: 'spade', idle: 'proud' },
    stats: { speed: 8, accel: 7, stamina: 8, handling: 8 },
    ability: { name: 'Moonbeam', type: 'gale', cd: 13, desc: 'A silver beam of moonlight pulls it forward.' },
  }),
  N({
    id: 'shadowcrest', name: 'Shadowcrest', epithet: 'Crowned in Gloom',
    desc: 'Its mane of black feathers swallows torchlight. Even other dragons give it a wide berth.',
    family: 'night', rarity: 'epic', price: 8900, unlock: 'Buy in Dragon Market',
    palette: { body: '#312d44', belly: '#5e5677', wing: '#1d1a2b', accent: '#8f6bff', horn: '#a894e8', eye: '#c8a6ff' },
    shape: { body: 1.1, width: 1.02, length: 1.04, wings: 1.15, neck: 1.1, tail: 1.12, horns: 4, spikes: 0.8, legs: 1.0, head: 1.06, hornType: 'crown', mane: true, pattern: 'glow', idle: 'fierce' },
    stats: { speed: 9, accel: 8, stamina: 8, handling: 8 },
    ability: { name: 'Gloom Crown', type: 'shock', cd: 14, desc: 'A pulse of shadow stuns every nearby rival.' },
  }),
  N({
    id: 'dreamtail', name: 'Dreamtail', epithet: 'Keeper of Small Sleeps',
    desc: 'A soft, feathered night-dragon that curls around sleeping hatchlings. Its tail fan glows faintly.',
    family: 'night', rarity: 'common', price: 1600, unlock: 'Buy in Dragon Market',
    palette: { body: '#6d5e8c', belly: '#e4d9f5', wing: '#4e4270', accent: '#ffb7e8', horn: '#efe6ff', eye: '#ff9de2' },
    shape: { body: 0.86, width: 0.94, length: 0.9, wings: 0.98, neck: 0.9, tail: 1.0, horns: 1, spikes: 0.2, legs: 0.85, head: 0.92, pattern: 'glow', wingType: 'feather', tailType: 'feather', idle: 'sleepy' },
    stats: { speed: 5, accel: 6, stamina: 8, handling: 8 },
    ability: { name: 'Lullaby', type: 'heal', cd: 15, desc: 'A humming sleep-song restores its rider’s wind.' },
  }),

  N({
    id: 'thornback', name: 'Thornback', epithet: 'Bramble Titan',
    desc: 'A walking thicket of ironwood spines. It clears new paths through the canopy by simply walking.',
    family: 'forest', rarity: 'rare', price: 3400, unlock: 'Buy in Dragon Market',
    palette: { body: '#4d7542', belly: '#c9dfa0', wing: '#375a32', accent: '#d7e86a', horn: '#6b5a3a', eye: '#f0d75c' },
    shape: { body: 1.15, width: 1.1, length: 1.0, wings: 0.94, neck: 0.9, tail: 1.0, horns: 2, spikes: 1.5, legs: 1.12, head: 1.04, hornType: 'antlers', pattern: 'scales', tailType: 'club', idle: 'calm' },
    stats: { speed: 7, accel: 6, stamina: 10, handling: 6 },
    ability: { name: 'Bramble Guard', type: 'aegis', cd: 15, desc: 'Thorny hide bristles into a living shield.' },
  }),
  N({
    id: 'blossomwing', name: 'Blossomwing', epithet: 'Petal Dancer',
    desc: 'Its wings are living flower petals that shed colour with every beat. Beloved by village children.',
    family: 'forest', rarity: 'common', price: 1200, unlock: 'Buy in Dragon Market',
    palette: { body: '#7fae62', belly: '#fff0c9', wing: '#e88aa8', accent: '#ffd166', horn: '#f5e4c3', eye: '#ff9bc4' },
    shape: { body: 0.86, width: 0.9, length: 0.92, wings: 1.18, neck: 0.94, tail: 1.0, horns: 0, spikes: 0.2, legs: 0.85, head: 0.92, pattern: 'spots', wingType: 'feather', tailType: 'feather', idle: 'playful' },
    stats: { speed: 6, accel: 7, stamina: 7, handling: 9 },
    ability: { name: 'Petal Drift', type: 'gale', cd: 13, desc: 'A swirl of petals lifts it on a warm updraft.' },
  }),
  N({
    id: 'barkhide', name: 'Barkhide', epithet: 'The Old Growth',
    desc: 'So old that saplings grow between its scales. It moves slowly, and nothing dares hurry it.',
    family: 'forest', rarity: 'rare', price: 3000, unlock: 'Buy in Dragon Market',
    palette: { body: '#6b5638', belly: '#c9b98a', wing: '#4f3f2a', accent: '#a8d05a', horn: '#d8c9a0', eye: '#f0d75c' },
    shape: { body: 1.3, width: 1.2, length: 1.05, wings: 0.9, neck: 0.92, tail: 0.94, horns: 2, spikes: 0.9, legs: 1.24, head: 1.1, hornType: 'antlers', pattern: 'scales', idle: 'sleepy' },
    stats: { speed: 5, accel: 5, stamina: 12, handling: 5 },
    ability: { name: 'Deep Roots', type: 'stone', cd: 16, desc: 'Roots anchor it to the sky-island, hardening its hide.' },
  }),
  N({
    id: 'vinecoil', name: 'Vinecoil', epithet: 'The Green Serpent',
    desc: 'A whip-thin jungle serpent that swings between islands by its prehensile tail.',
    family: 'forest', rarity: 'epic', price: 7200, unlock: 'Buy in Dragon Market',
    palette: { body: '#3f8c5a', belly: '#d8f0a0', wing: '#2b6542', accent: '#ffe27a', horn: '#d8e8b0', eye: '#b8f57a' },
    shape: { body: 0.86, width: 0.82, length: 1.26, wings: 1.02, neck: 1.4, tail: 1.6, horns: 2, spikes: 0.3, legs: 0.76, head: 0.9, headType: 'frilled', pattern: 'stripes', hornType: 'antlers', wingType: 'fin', tailType: 'twin', backFin: true, mane: true, idle: 'playful' },
    stats: { speed: 9, accel: 8, stamina: 8, handling: 10 },
    ability: { name: 'Verdant Snare', type: 'slow', cd: 13, desc: 'Living vines whip out to tangle the pack.' },
  }),
  N({
    id: 'petalwing', name: 'Petalwing', epithet: 'The Tiny Bloom',
    desc: 'A palm-sized forest sprite with four petal wings. It rides on the shoulders of larger dragons.',
    family: 'forest', rarity: 'common', price: 950, unlock: 'Buy in Dragon Market',
    palette: { body: '#8fc06a', belly: '#fff7d6', wing: '#f0a6c0', accent: '#fff0a0', horn: '#fff3d0', eye: '#ff9bc4' },
    shape: { body: 0.7, width: 0.8, length: 0.8, wings: 1.05, neck: 0.8, tail: 0.9, horns: 0, spikes: 0.1, legs: 0.7, head: 0.86, pattern: 'spots', wingType: 'insect', tailType: 'feather', size: 0.78, idle: 'playful' },
    stats: { speed: 6, accel: 9, stamina: 5, handling: 11 },
    ability: { name: 'Pollen Puff', type: 'heal', cd: 14, desc: 'A cloud of soothing pollen restores stamina.' },
  }),

  N({
    id: 'reefwyrm', name: 'Reefwyrm', epithet: 'Coral Courser',
    desc: 'A bright reef-dweller with fin-wings that shimmer like shallow water over sand.',
    family: 'ocean', rarity: 'rare', price: 3600, unlock: 'Buy in Dragon Market',
    palette: { body: '#2f9aa8', belly: '#c8f5ec', wing: '#2a7f95', accent: '#ff9a8a', horn: '#e8fffa', eye: '#8df5d2' },
    shape: { body: 0.92, width: 0.88, length: 1.16, wings: 1.12, neck: 1.24, tail: 1.4, horns: 1, spikes: 0.3, legs: 0.82, head: 0.94, headType: 'serpent', pattern: 'scales', wingType: 'fin', tailType: 'fin', idle: 'curious' },
    stats: { speed: 8, accel: 8, stamina: 8, handling: 9 },
    ability: { name: 'Coral Current', type: 'tide', cd: 14, desc: 'A warm current lifts and sustains it.' },
  }),
  N({
    id: 'coralback', name: 'Coralback', epithet: 'The Living Reef',
    desc: 'A gentle giant whose back is a whole coral garden. Tiny fish ride in its wake.',
    family: 'ocean', rarity: 'epic', price: 8000, unlock: 'Buy in Dragon Market',
    palette: { body: '#3f8fa8', belly: '#e0f7f0', wing: '#2f7188', accent: '#ff8fb0', horn: '#f0fffb', eye: '#8df5d2' },
    shape: { body: 1.16, width: 1.08, length: 1.3, wings: 1.08, neck: 1.05, tail: 1.1, horns: 3, spikes: 1.1, legs: 1.22, head: 1.12, hornType: 'antlers', wingType: 'fin', pattern: 'spots', backFin: true, tailType: 'club', idle: 'calm' },
    stats: { speed: 7, accel: 6, stamina: 11, handling: 6 },
    ability: { name: 'Reef Shield', type: 'aegis', cd: 16, desc: 'Coral growths form a salt-hardened shield.' },
  }),
  N({
    id: 'depthsong', name: 'Depthsong', epithet: 'Voice of the Abyss',
    desc: 'A legendary leviathan whose song can be heard through a hundred fathoms of sky-water.',
    family: 'ocean', rarity: 'legendary', price: 17000, unlock: 'Buy in Dragon Market',
    palette: { body: '#285f7a', belly: '#a8e8e0', wing: '#1f4a63', accent: '#7cf0ff', horn: '#d8fffa', eye: '#a6f7ff' },
    shape: { body: 1.16, width: 1.0, length: 1.24, wings: 1.3, neck: 1.3, tail: 1.48, horns: 2, spikes: 0.4, legs: 0.86, head: 1.0, headType: 'serpent', pattern: 'stars', wingType: 'ethereal', tailType: 'twin', idle: 'regal' },
    stats: { speed: 9, accel: 8, stamina: 11, handling: 9 },
    ability: { name: 'Abyssal Song', type: 'shock', cd: 13, desc: 'A deep note stuns rivals and summons a following tide.' },
  }),
  N({
    id: 'wavecrest', name: 'Wavecrest', epithet: 'Whitecap',
    desc: 'A sleek wave-runner that skims the sea surface, leaving a wake of spray behind its wings.',
    family: 'ocean', rarity: 'common', price: 1400, unlock: 'Buy in Dragon Market',
    palette: { body: '#4f9fb8', belly: '#e8faff', wing: '#3d7f99', accent: '#c8f4ff', horn: '#f0ffff', eye: '#7ce8ff' },
    shape: { body: 0.9, width: 0.86, length: 1.08, wings: 1.14, neck: 1.05, tail: 1.12, horns: 1, spikes: 0.4, legs: 0.82, head: 0.94, headType: 'beak', pattern: 'streaks', wingType: 'fin', tailType: 'spade', backFin: true, idle: 'playful' },
    stats: { speed: 7, accel: 8, stamina: 7, handling: 9 },
    ability: { name: 'Whitecap', type: 'dash', cd: 12, desc: 'Surfs a sudden crest of speed.' },
  }),
  N({
    id: 'brineclaw', name: 'Brineclaw', epithet: 'Salt and Iron',
    desc: 'A scarred old sea-hunter with a hammer-shaped skull and barnacles on its tusks.',
    family: 'ocean', rarity: 'rare', price: 4200, unlock: 'Buy in Dragon Market',
    palette: { body: '#4a7a82', belly: '#c8d8cf', wing: '#356066', accent: '#ffcf7a', horn: '#e0e8d8', eye: '#ffd166' },
    shape: { body: 1.16, width: 1.12, length: 0.98, wings: 0.96, neck: 0.9, tail: 0.94, horns: 2, spikes: 0.9, legs: 1.1, head: 1.18, headType: 'hammer', tusks: true, pattern: 'spots', tailType: 'club', idle: 'fierce' },
    stats: { speed: 7, accel: 6, stamina: 10, handling: 6 },
    ability: { name: 'Brine Slam', type: 'inferno', cd: 15, desc: 'A salt-laden shockwave batters the pack.' },
  }),

  N({
    id: 'voltwing', name: 'Voltwing', epithet: 'Static Dancer',
    desc: 'Four wings crackle with charge. It can hover in place longer than any other species.',
    family: 'storm', rarity: 'rare', price: 4000, unlock: 'Buy in Dragon Market',
    palette: { body: '#4a5fb0', belly: '#d8e4ff', wing: '#303f88', accent: '#7ee8ff', horn: '#e8f0ff', eye: '#71f0ff' },
    shape: { body: 0.86, width: 0.84, length: 0.96, wings: 1.2, neck: 0.96, tail: 1.1, horns: 1, spikes: 0.4, legs: 0.82, head: 0.9, pattern: 'streaks', wingType: 'insect', tailType: 'spade', idle: 'playful' },
    stats: { speed: 8, accel: 9, stamina: 7, handling: 10 },
    ability: { name: 'Static Veil', type: 'shock', cd: 14, desc: 'A crackling aura jolts nearby rivals.' },
  }),
  N({
    id: 'thunderhead', name: 'Thunderhead', epithet: 'The Storm Front',
    desc: 'A vast black-blue dragon that gathers clouds around its crown before it strikes.',
    family: 'storm', rarity: 'epic', price: 9500, unlock: 'Buy in Dragon Market',
    palette: { body: '#35426e', belly: '#b8c4e8', wing: '#232c52', accent: '#8ff0ff', horn: '#d8e0ff', eye: '#8ff8ff' },
    shape: { body: 1.22, width: 1.1, length: 1.04, wings: 1.38, neck: 1.04, tail: 1.08, horns: 4, spikes: 0.8, legs: 1.0, head: 1.1, hornType: 'crown', pattern: 'stripes', idle: 'fierce' },
    stats: { speed: 10, accel: 8, stamina: 8, handling: 7 },
    ability: { name: 'Thunderhead', type: 'inferno', cd: 14, desc: 'Calls down a rolling peal of thunder.' },
  }),
  N({
    id: 'sparkclaw', name: 'Sparkclaw', epithet: 'Quick as Lightning',
    desc: 'A tiny storm-runner no bigger than a cat. It stores static in its whiskers.',
    family: 'storm', rarity: 'common', price: 1300, unlock: 'Buy in Dragon Market',
    palette: { body: '#5f74c8', belly: '#e8eeff', wing: '#4054a0', accent: '#a6f7ff', horn: '#f0f6ff', eye: '#8ff8ff' },
    shape: { body: 0.74, width: 0.8, length: 0.84, wings: 1.0, neck: 0.82, tail: 0.96, horns: 0, spikes: 0.2, legs: 0.72, head: 0.86, pattern: 'streaks', tailType: 'whip', size: 0.8, idle: 'playful' },
    stats: { speed: 7, accel: 11, stamina: 5, handling: 11 },
    ability: { name: 'Spark Step', type: 'dash', cd: 10, desc: 'A crackling blink of acceleration.' },
  }),
  N({
    id: 'galeheart', name: 'Galeheart', epithet: 'Heart of the High Wind',
    desc: 'Its long feather-wings catch winds no other dragon can feel. It sings to the jet stream.',
    family: 'storm', rarity: 'epic', price: 8600, unlock: 'Buy in Dragon Market',
    palette: { body: '#7c9cc4', belly: '#f0f8ff', wing: '#5a7fa8', accent: '#c8f4ff', horn: '#f4faff', eye: '#a6f7ff' },
    shape: { body: 0.94, width: 0.86, length: 1.14, wings: 1.48, neck: 1.18, tail: 1.34, horns: 1, spikes: 0.3, legs: 0.84, head: 0.92, pattern: 'prism', wingType: 'feather', tailType: 'feather', idle: 'regal' },
    stats: { speed: 10, accel: 9, stamina: 8, handling: 10 },
    ability: { name: 'Galeheart', type: 'tide', cd: 12, desc: 'Rides a rising gale that fills its wings with wind.' },
  }),
  N({
    id: 'zephyr', name: 'Zephyr', epithet: 'The Quiet Wind',
    desc: 'A pale, near-invisible drifter. You feel its passing before you ever see it.',
    family: 'storm', rarity: 'rare', price: 4800, unlock: 'Buy in Dragon Market',
    palette: { body: '#b8cfe0', belly: '#ffffff', wing: '#9ab8d0', accent: '#d8fbff', horn: '#ffffff', eye: '#8ff8ff' },
    shape: { body: 0.88, width: 0.8, length: 1.1, wings: 1.36, neck: 1.16, tail: 1.3, horns: 1, spikes: 0.2, legs: 0.82, head: 0.88, pattern: 'prism', wingType: 'ethereal', tailType: 'whip', idle: 'shy' },
    stats: { speed: 9, accel: 9, stamina: 7, handling: 10 },
    ability: { name: 'Zephyr Slip', type: 'veil', cd: 12, desc: 'Slips sideways through a seam in the wind.' },
  }),

  N({
    id: 'stonewing', name: 'Stonewing', epithet: 'Crag Keeper',
    desc: 'A broad-winged sentinel with a hide like weathered granite and a patient, watchful eye.',
    family: 'earth', rarity: 'rare', price: 3300, unlock: 'Buy in Dragon Market',
    palette: { body: '#847c6d', belly: '#d8ccb6', wing: '#655f54', accent: '#ffb45e', horn: '#e0d4c0', eye: '#ffcf5c' },
    shape: { body: 1.22, width: 1.14, length: 1.02, wings: 1.1, neck: 0.94, tail: 0.98, horns: 2, spikes: 1.2, legs: 1.16, head: 1.06, pattern: 'none', tailType: 'club', idle: 'calm' },
    stats: { speed: 7, accel: 6, stamina: 10, handling: 6 },
    ability: { name: 'Stonewing', type: 'stone', cd: 15, desc: 'Stone plates lock together across its back.' },
  }),
  N({
    id: 'crystalhorn', name: 'Crystalhorn', epithet: 'The Prism Peak',
    desc: 'Its horns grow as clear crystal that splits sunlight into ribbons across the cliffs.',
    family: 'earth', rarity: 'epic', price: 8400, unlock: 'Buy in Dragon Market',
    palette: { body: '#8a8fc4', belly: '#e8e8ff', wing: '#656a9c', accent: '#b8f0ff', horn: '#d8ffff', eye: '#a6f7ff' },
    shape: { body: 1.06, width: 1.0, length: 1.02, wings: 1.16, neck: 1.04, tail: 1.08, horns: 4, spikes: 1.1, legs: 1.0, head: 1.04, hornType: 'crown', wingType: 'ethereal', pattern: 'prism', tailType: 'spade', mane: true, idle: 'regal' },
    stats: { speed: 8, accel: 7, stamina: 10, handling: 7 },
    ability: { name: 'Prism Guard', type: 'aegis', cd: 14, desc: 'Crystal horns bend hostile wind away.' },
  }),
  N({
    id: 'dunescale', name: 'Dunescale', epithet: 'The Golden Drift',
    desc: 'A desert glider with sand-smooth scales and a spade tail for steering thermals.',
    family: 'earth', rarity: 'common', price: 1500, unlock: 'Buy in Dragon Market',
    palette: { body: '#c4a468', belly: '#f8e8b8', wing: '#a08450', accent: '#ffd166', horn: '#f0e0b8', eye: '#ffce54' },
    shape: { body: 0.96, width: 0.9, length: 1.04, wings: 1.12, neck: 1.0, tail: 1.12, horns: 1, spikes: 0.5, legs: 0.9, head: 0.94, pattern: 'scales', tailType: 'spade', idle: 'curious' },
    stats: { speed: 7, accel: 7, stamina: 7, handling: 8 },
    ability: { name: 'Sand Veil', type: 'veil', cd: 14, desc: 'A spiral of golden dust hides its escape.' },
  }),
  N({
    id: 'ironhide', name: 'Ironhide', epithet: 'The Anvil',
    desc: 'An unstoppable ram of a dragon with a skull like a smith’s anvil and a temper to match.',
    family: 'earth', rarity: 'epic', price: 9000, unlock: 'Buy in Dragon Market',
    palette: { body: '#5f6268', belly: '#c8c4bc', wing: '#474a50', accent: '#ff9a4d', horn: '#d8d4cc', eye: '#ffce54' },
    shape: { body: 1.34, width: 1.26, length: 1.0, wings: 0.9, neck: 0.84, tail: 0.9, horns: 2, spikes: 1.3, legs: 1.28, head: 1.28, headType: 'hammer', tusks: true, pattern: 'scales', tailType: 'club', idle: 'fierce' },
    stats: { speed: 6, accel: 6, stamina: 12, handling: 5 },
    ability: { name: 'Ironhide', type: 'stone', cd: 15, desc: 'Its hide rings like struck iron and refuses to yield.' },
  }),

  N({
    id: 'venomwing', name: 'Venomwing', epithet: 'The Green Dart',
    desc: 'A whip-fast hunter with a barbed twin tail and venom that eats through stone.',
    family: 'venom', rarity: 'rare', price: 3900, unlock: 'Buy in Dragon Market',
    palette: { body: '#4f7a3f', belly: '#c8e88a', wing: '#355c2c', accent: '#b8ff4d', horn: '#d8e8b0', eye: '#d8ff4d' },
    shape: { body: 0.9, width: 0.84, length: 1.08, wings: 1.1, neck: 1.0, tail: 1.18, horns: 1, spikes: 0.7, legs: 0.88, head: 0.94, pattern: 'stripes', tailType: 'twin', idle: 'fierce' },
    stats: { speed: 8, accel: 9, stamina: 7, handling: 9 },
    ability: { name: 'Venom Barb', type: 'slow', cd: 12, desc: 'A barbed tail lashes out, poisoning rival wings.' },
  }),
  N({
    id: 'acidspit', name: 'Acidspit', epithet: 'Little Sting',
    desc: 'A small, bad-tempered swamp dragon with a beak full of stinging spray.',
    family: 'venom', rarity: 'common', price: 1250, unlock: 'Buy in Dragon Market',
    palette: { body: '#7a8f3f', belly: '#e0f0a0', wing: '#5c6e2f', accent: '#d8ff5c', horn: '#e8f0b8', eye: '#e0ff5c' },
    shape: { body: 0.8, width: 0.86, length: 0.88, wings: 0.92, neck: 0.84, tail: 0.96, horns: 0, spikes: 0.3, legs: 0.78, head: 0.9, headType: 'beak', pattern: 'spots', tailType: 'spade', size: 0.86, idle: 'curious' },
    stats: { speed: 6, accel: 8, stamina: 6, handling: 9 },
    ability: { name: 'Acid Spray', type: 'inferno', cd: 13, desc: 'Spits a stinging spray that blinds the pack.' },
  }),
  N({
    id: 'plaguecrest', name: 'Plaguecrest', epithet: 'The Pale Bloom',
    desc: 'A grim, beautiful dragon whose fungal frill glows sickly green in the dark.',
    family: 'venom', rarity: 'epic', price: 7600, unlock: 'Buy in Dragon Market',
    palette: { body: '#556b4a', belly: '#c8d8a0', wing: '#3d5038', accent: '#c8ff6a', horn: '#e0e8c0', eye: '#d8ff5c' },
    shape: { body: 1.06, width: 1.0, length: 1.04, wings: 1.12, neck: 1.12, tail: 1.14, horns: 3, spikes: 0.8, legs: 0.96, head: 1.0, headType: 'frilled', hornType: 'frill', mane: true, pattern: 'glow', idle: 'calm' },
    stats: { speed: 8, accel: 7, stamina: 9, handling: 8 },
    ability: { name: 'Spore Cloud', type: 'slow', cd: 13, desc: 'A cloud of glowing spores saps rival strength.' },
  }),
  N({
    id: 'serpens', name: 'Serpens', epithet: 'The Whispering Coil',
    desc: 'A long, patient ambusher that waits in the canopy for the perfect moment to strike.',
    family: 'venom', rarity: 'rare', price: 4300, unlock: 'Buy in Dragon Market',
    palette: { body: '#3f6b4f', belly: '#c8e8a8', wing: '#2c503a', accent: '#a8ff7a', horn: '#d0e8b8', eye: '#b8ff6a' },
    shape: { body: 0.84, width: 0.78, length: 1.28, wings: 0.94, neck: 1.42, tail: 1.6, horns: 1, spikes: 0.3, legs: 0.74, head: 0.88, headType: 'serpent', hornType: 'frill', pattern: 'glow', tailType: 'spade', tendrils: true, idle: 'curious' },
    stats: { speed: 8, accel: 8, stamina: 8, handling: 10 },
    ability: { name: 'Whisper Coil', type: 'veil', cd: 13, desc: 'Slides unseen through the green shadows.' },
  }),

  N({
    id: 'runewyrm', name: 'Runewyrm', epithet: 'Keeper of the First Word',
    desc: 'Ancient runes crawl across its hide. It remembers the names of mountains that have already fallen.',
    family: 'ancient', rarity: 'legendary', price: 15500, unlock: 'Buy in Dragon Market',
    palette: { body: '#5a5470', belly: '#d8d0c0', wing: '#403b58', accent: '#ffd166', horn: '#e8e0cc', eye: '#ffe27a' },
    shape: { body: 1.1, width: 1.0, length: 1.12, wings: 1.2, neck: 1.22, tail: 1.24, horns: 4, spikes: 0.9, legs: 0.98, head: 1.06, headType: 'frilled', hornType: 'frill', pattern: 'runes', tailType: 'spade', idle: 'regal' },
    stats: { speed: 9, accel: 8, stamina: 11, handling: 8 },
    ability: { name: 'Word of Stone', type: 'shock', cd: 14, desc: 'Speaks a rune that stops rivals in their tracks.' },
  }),
  N({
    id: 'chronowing', name: 'Chronowing', epithet: 'The Hour Between',
    desc: 'A mythical dragon that flies a half-second ahead of time. Its wingbeats echo before they happen.',
    family: 'ancient', rarity: 'mythical', price: 26000, unlock: 'Buy in Dragon Market',
    palette: { body: '#7a6fb8', belly: '#f0e8ff', wing: '#5a4f9c', accent: '#7cf0ff', horn: '#ffffff', eye: '#d8fbff' },
    shape: { body: 1.0, width: 0.9, length: 1.18, wings: 1.42, neck: 1.26, tail: 1.42, horns: 3, spikes: 0.4, legs: 0.86, head: 0.94, pattern: 'prism', wingType: 'ethereal', tailType: 'twin', idle: 'regal' },
    stats: { speed: 10, accel: 10, stamina: 10, handling: 11 },
    ability: { name: 'Rewind', type: 'tide', cd: 12, desc: 'Borrows a moment from the future to surge ahead.' },
  }),
  N({
    id: 'titanwyrm', name: 'Titanwyrm', epithet: 'The Island That Wakes',
    desc: 'A living mountain said to sleep for a thousand years. When it stretches, villages feel the tremor.',
    family: 'ancient', rarity: 'legendary', price: 18000, unlock: 'Buy in Dragon Market',
    palette: { body: '#6b6150', belly: '#d8c8a8', wing: '#4f473a', accent: '#ffb45e', horn: '#e8d8b8', eye: '#ffce54' },
    shape: { body: 1.4, width: 1.3, length: 1.35, wings: 1.22, neck: 1.02, tail: 1.1, horns: 3, spikes: 1.6, legs: 1.38, head: 1.28, hornType: 'antlers', pattern: 'scales', backFin: true, tailType: 'club', size: 1.32, idle: 'sleepy' },
    stats: { speed: 6, accel: 5, stamina: 12, handling: 4 },
    ability: { name: 'Titan Step', type: 'stone', cd: 16, desc: 'The ground itself braces beneath its wings.' },
  }),
  N({
    id: 'sunforged', name: 'Sunforged', epithet: 'Blade of Noon',
    desc: 'Forged in a sky-forge at the top of the world. Its scales are still warm to the touch.',
    family: 'ancient', rarity: 'legendary', price: 16500, unlock: 'Buy in Dragon Market',
    palette: { body: '#c78a3a', belly: '#fff0c0', wing: '#9c6628', accent: '#ffe27a', horn: '#fff3d0', eye: '#fff0a0' },
    shape: { body: 1.08, width: 0.98, length: 1.06, wings: 1.24, neck: 1.06, tail: 1.12, horns: 4, spikes: 0.8, legs: 0.98, head: 1.04, hornType: 'crown', pattern: 'lava', tailType: 'spade', idle: 'proud' },
    stats: { speed: 10, accel: 9, stamina: 9, handling: 9 },
    ability: { name: 'Noon Blade', type: 'inferno', cd: 12, desc: 'A blade of concentrated daylight cuts the air.' },
  }),

  N({
    id: 'prismwing', name: 'Prismwing', epithet: 'The Shattered Rainbow',
    desc: 'A mythical hybrid whose insect wings split light into a dozen impossible colours.',
    family: 'hybrid', habitat: 'ancient', rarity: 'mythical', price: 28000, unlock: 'Buy in Dragon Market',
    palette: { body: '#b8a8e8', belly: '#fff8ff', wing: '#8f9cff', accent: '#ffd166', horn: '#ffffff', eye: '#a6f7ff' },
    shape: { body: 0.94, width: 0.88, length: 1.06, wings: 1.46, neck: 1.1, tail: 1.28, horns: 2, spikes: 0.3, legs: 0.84, head: 0.94, pattern: 'prism', wingType: 'insect', tailType: 'feather', idle: 'playful' },
    stats: { speed: 10, accel: 10, stamina: 9, handling: 11 },
    ability: { name: 'Prism Burst', type: 'gale', cd: 12, desc: 'Refracts sunlight into a dozen driving winds.' },
  }),
  N({
    id: 'auroraclaw', name: 'Auroraclaw', epithet: 'Dawn’s Talon',
    desc: 'A legendary hybrid of storm and ice whose feathers trail ribbons of coloured light.',
    family: 'hybrid', habitat: 'ice', rarity: 'legendary', price: 19000, unlock: 'Buy in Dragon Market',
    palette: { body: '#8fa8d8', belly: '#f0f8ff', wing: '#6f9cc8', accent: '#a6ffd9', horn: '#ffffff', eye: '#b7f0ff' },
    shape: { body: 0.98, width: 0.9, length: 1.08, wings: 1.4, neck: 1.16, tail: 1.3, horns: 2, spikes: 0.4, legs: 0.9, head: 0.96, pattern: 'prism', hornType: 'antlers', wingType: 'ethereal', tailType: 'twin', mane: true, idle: 'proud' },
    stats: { speed: 10, accel: 9, stamina: 10, handling: 10 },
    ability: { name: 'Dawn Talon', type: 'dash', cd: 11, desc: 'Strikes on a ribbon of dawn light.' },
  }),
  N({
    id: 'twilight', name: 'Twilight', epithet: 'The Green Dusk',
    desc: 'A forest-night hybrid that glows softly at the edges, like sunlight through closing leaves.',
    family: 'hybrid', habitat: 'forest', rarity: 'epic', price: 10000, unlock: 'Buy in Dragon Market',
    palette: { body: '#5a6f7a', belly: '#d8e8c8', wing: '#3f5058', accent: '#b8ff9a', horn: '#e0e8d8', eye: '#b8ffcf' },
    shape: { body: 1.0, width: 0.94, length: 1.04, wings: 1.18, neck: 1.08, tail: 1.16, horns: 2, spikes: 0.5, legs: 0.94, head: 0.98, pattern: 'glow', wingType: 'feather', tailType: 'feather', idle: 'calm' },
    stats: { speed: 9, accel: 9, stamina: 9, handling: 9 },
    ability: { name: 'Green Dusk', type: 'heal', cd: 13, desc: 'Draws strength from the quiet between day and night.' },
  }),
  N({
    id: 'stormfrost', name: 'Stormfrost', epithet: 'The Killing Hail',
    desc: 'A legendary storm-ice hybrid. Where it passes, hail falls upward and thunder freezes in the air.',
    family: 'hybrid', habitat: 'storm', rarity: 'legendary', price: 17500, unlock: 'Buy in Dragon Market',
    palette: { body: '#6f8fb8', belly: '#e8f8ff', wing: '#4f6f9c', accent: '#a6f7ff', horn: '#eaffff', eye: '#8ff8ff' },
    shape: { body: 1.12, width: 1.02, length: 1.06, wings: 1.34, neck: 1.08, tail: 1.12, horns: 4, spikes: 1.0, legs: 0.98, head: 1.04, hornType: 'crown', wingType: 'fin', pattern: 'prism', tailType: 'spade', backFin: true, idle: 'fierce' },
    stats: { speed: 10, accel: 9, stamina: 10, handling: 9 },
    ability: { name: 'Killing Hail', type: 'inferno', cd: 13, desc: 'A freezing thunderstorm breaks over the pack.' },
  }),
  N({
    id: 'terravine', name: 'Terravine', epithet: 'Root and Rune',
    desc: 'An earth-forest hybrid whose antlers are living trees. It carries a little grove wherever it walks.',
    family: 'hybrid', habitat: 'earth', rarity: 'epic', price: 8200, unlock: 'Buy in Dragon Market',
    palette: { body: '#6b6b4a', belly: '#d8d8a8', wing: '#4f5038', accent: '#b8e86a', horn: '#8a7a4a', eye: '#d8ff6a' },
    shape: { body: 1.24, width: 1.16, length: 1.02, wings: 1.04, neck: 0.98, tail: 1.0, horns: 3, spikes: 1.1, legs: 1.18, head: 1.06, hornType: 'antlers', pattern: 'runes', backFin: true, tailType: 'club', idle: 'calm' },
    stats: { speed: 7, accel: 6, stamina: 11, handling: 6 },
    ability: { name: 'Root and Rune', type: 'aegis', cd: 15, desc: 'Living roots and old runes knit into a shield.' },
  }),
  N({
    id: 'voidmaw', name: 'Voidmaw', epithet: 'The Hunger Between Stars',
    desc: 'A mythical night-ancient hybrid. It does not fly through the sky so much as through the gaps in it.',
    family: 'hybrid', habitat: 'night', rarity: 'mythical', price: 32000, unlock: 'Buy in Dragon Market',
    palette: { body: '#211c33', belly: '#5a4a88', wing: '#100c1c', accent: '#b18aff', horn: '#8f7ac8', eye: '#d8b8ff' },
    shape: { body: 1.22, width: 1.1, length: 1.16, wings: 1.42, neck: 1.12, tail: 1.24, horns: 3, spikes: 1.2, legs: 1.02, head: 1.14, headType: 'hammer', hornType: 'crown', mane: true, pattern: 'stars', wingType: 'ethereal', tailType: 'twin', size: 1.14, idle: 'fierce' },
    stats: { speed: 10, accel: 10, stamina: 10, handling: 10 },
    ability: { name: 'Event Horizon', type: 'veil', cd: 12, desc: 'Opens a pocket of void that swallows the pursuit.' },
  }),
];

// Families for the original flock, so every one of the 66 species has a home
// in the sanctuary. The expanded bestiary already carries its own family.
const ORIGINAL_FAMILY = {
  emberling: 'fire', pyrewing: 'fire', cinderclaw: 'fire',
  frostfang: 'ice', glacielle: 'ice',
  mossback: 'forest', verdantwyrm: 'forest',
  tidecoil: 'ocean',
  gustwing: 'storm', stormcrest: 'storm',
  sunspark: 'ancient', celestray: 'ancient',
  duskfair: 'night', obsidrake: 'night',
  pebblehorn: 'earth',
  aetherion: 'hybrid', solstice: 'hybrid',
};
DRAGONS.forEach(d => {
  if (!d.family) d.family = ORIGINAL_FAMILY[d.id] || 'forest';
  if (!d.habitat) d.habitat = d.family === 'hybrid' ? 'ancient' : d.family;
  if (!d.shape.idle) d.shape.idle = 'calm';
});

// Every species has a flaw as well as a strength. The family supplies the
// character of the weakness; the dragon's own lowest stat makes it specific.
const STAT_LABEL = { speed: 'top speed', accel: 'acceleration', stamina: 'stamina', handling: 'turning' };
const FAMILY_WEAKNESS = {
  fire: 'Thin hide — sustained cold drains its fire.',
  ice: 'Heavy wings — warm thermals sap its lift.',
  night: 'Bright light unsettles it and blunts its focus.',
  forest: 'Light frame — brute impacts shake its nerve.',
  ocean: 'Needs moisture — dry air tires it quickly.',
  storm: 'Wild handling — it fights a tight line.',
  earth: 'Great weight — it is slow to change direction.',
  venom: 'Fragile wings — poor at long chases.',
  ancient: 'Deliberate — slow to build momentum.',
  hybrid: 'Divided nature — no single stat is its best.',
};
DRAGONS.forEach(d => {
  if (d.weakness) return;
  const vals = Object.values(d.stats);
  const low = Object.entries(d.stats).sort((a, b) => a[1] - b[1])[0];
  if (new Set(vals).size === 1) {
    d.weakness = d.id === 'aetherion'
      ? 'No natural flaw — only its pride, which demands a champion’s proof.'
      : (FAMILY_WEAKNESS[d.family] || 'No single flaw.');
  } else {
    d.weakness = `${FAMILY_WEAKNESS[d.family] || 'No single flaw.'} Lowest ${STAT_LABEL[low[0]]} (${low[1]}/10).`;
  }
});

export const DRAGON_MAP = Object.fromEntries(DRAGONS.map(d => [d.id, d]));
export const DRAGON_TOTAL = DRAGONS.length;
export const dragonsByFamily = (family) => family === 'all' ? DRAGONS : DRAGONS.filter(d => d.family === family);

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
    rewards: { coins: 1800, gems: 6, dragon: 'frostwyrm', track: 'canopy' },
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
    rewards: { coins: 12000, gems: 40, dragon: 'pyrewing', bonusDragon: 'runewyrm', track: null },
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
  { id: 'hearthfall', name: 'Hearthfall Isle', biome: 'viking', reqLevel: 1, hidden: 'emberling', bonusHidden: ['blossomwing', 'emberdrake'], desc: 'Gentle cliffs, warm updrafts and old watchtowers.' },
  { id: 'frostspine', name: 'Frostspine Peaks', biome: 'snow', reqLevel: 3, hidden: 'glacielle', bonusHidden: ['rimeclaw', 'snowveil'], desc: 'Frozen waterfalls hide a queen of winter.' },
  { id: 'cinder', name: 'Cinder Caldera', biome: 'volcano', reqLevel: 5, hidden: 'cinderclaw', bonusHidden: ['magmaw', 'ashenwyrm'], desc: 'Rivers of fire and a nest of embers.' },
  { id: 'canopy', name: 'Emerald Canopy', biome: 'jungle', reqLevel: 6, hidden: 'verdantwyrm', bonusHidden: ['thornback', 'vinecoil'], desc: 'Rainforest islands where old trees whisper.' },
  { id: 'skyfall', name: 'Skyfall Ruins', biome: 'ruins', reqLevel: 8, hidden: 'obsidrake', bonusHidden: ['runewyrm', 'moonfang'], desc: 'Broken temples drift above the clouds.' },
  { id: 'abyss', name: 'Abyss Cliffs', biome: 'ocean', reqLevel: 10, hidden: 'tidecoil', bonusHidden: ['reefwyrm', 'wavecrest'], desc: 'Sea caves guard a serpent of the deep.' },
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

export const RARITY_ORDER = RARITY_TIERS.map(t => t.id);

export function rarityTierFor(def) {
  if (!def) return RARITY_TIERS[0];
  return RARITY_TIERS.find(t => t.id === def.rarity)
    || RARITY_TIERS[Math.max(0, (RARITIES[def.rarity]?.tier || 1) - 1)]
    || RARITY_TIERS[0];
}

export function expandedTierName(def) {
  return rarityTierFor(def).name;
}
