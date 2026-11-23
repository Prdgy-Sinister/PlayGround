// 24 hand-authored cartoon contestants. Stats are 1-10 and feed directly into
// movement speed, jump height, knockback resistance, stamina and recovery time.

export const STAT_KEYS = ['speed', 'jump', 'balance', 'strength', 'stamina', 'recovery'];
export const STAT_LABELS = {
  speed: 'SPEED', jump: 'JUMP', balance: 'BALANCE',
  strength: 'STRENGTH', stamina: 'STAMINA', recovery: 'RECOVERY'
};

const skinTones = ['#f6c9a0', '#e8ae7d', '#c88555', '#8f5a35', '#5f3720', '#ffd9b3'];
const shirtColors = ['#ff5b2b', '#2fc4ff', '#ffd23f', '#7c5cff', '#ff5fa2', '#43e08a', '#ff8a2b', '#24a8a0', '#e63946', '#b8e04a'];

// body: height/width multipliers, head size, belly, limb thickness, leg/torso split.
// style: animation personality traits used by the character rig.
export const CHARACTERS = [
  {
    id: 'tina', name: 'Twitchy Tina', tag: 'Gymnast. Caffeinated. Regrets nothing.',
    stats: { speed: 8, jump: 8, balance: 7, strength: 4, stamina: 7, recovery: 8 },
    body: { height: 0.9, width: 0.82, head: 1.0, belly: 0.8, limb: 0.8, leg: 0.52 },
    colors: { skin: '#f6c9a0', shirt: '#ff5fa2', pants: '#5b2a86', hair: '#ff3f7f', accent: '#ffd23f' },
    hairStyle: 'ponytail', accessory: 'headband', style: 'bouncy', voice: 1.5,
    unlock: { free: true }
  },
  {
    id: 'bazza', name: 'Big Bazza', tag: 'Arrives hungry. Leaves hungry. Wins sometimes.',
    stats: { speed: 4, jump: 3, balance: 3, strength: 10, stamina: 6, recovery: 3 },
    body: { height: 1.04, width: 1.4, head: 1.02, belly: 1.65, limb: 1.3, leg: 0.42 },
    colors: { skin: '#e8ae7d', shirt: '#43e08a', pants: '#2a3f6b', hair: '#3a2a1e', accent: '#ffd23f' },
    hairStyle: 'bald', accessory: 'cap', style: 'heavy', voice: 0.6,
    unlock: { free: true }
  },
  {
    id: 'luke', name: 'Lanky Luke', tag: 'All legs. No plan. Surprisingly effective.',
    stats: { speed: 6, jump: 6, balance: 8, strength: 4, stamina: 8, recovery: 7 },
    body: { height: 1.22, width: 0.68, head: 0.94, belly: 0.7, limb: 0.72, leg: 0.6 },
    colors: { skin: '#ffd9b3', shirt: '#2fc4ff', pants: '#223a5e', hair: '#c98b3a', accent: '#ff5b2b' },
    hairStyle: 'spiky', accessory: 'none', style: 'goofy', voice: 0.9,
    unlock: { free: true }
  },
  {
    id: 'roxy', name: 'Rocket Roxy', tag: 'Built for the first ten metres. And the next ten.',
    stats: { speed: 10, jump: 7, balance: 6, strength: 5, stamina: 8, recovery: 6 },
    body: { height: 1.0, width: 0.8, head: 0.95, belly: 0.75, limb: 0.82, leg: 0.55 },
    colors: { skin: '#c88555', shirt: '#ff5b2b', pants: '#181c2b', hair: '#2a1a12', accent: '#ffd23f' },
    hairStyle: 'ponytail', accessory: 'none', style: 'athletic', voice: 1.2,
    unlock: { free: true }
  },
  {
    id: 'bella', name: 'Bouncy Bella', tag: 'Believes gravity is a suggestion.',
    stats: { speed: 6, jump: 10, balance: 5, strength: 3, stamina: 9, recovery: 8 },
    body: { height: 0.82, width: 0.86, head: 1.08, belly: 0.9, limb: 0.78, leg: 0.48 },
    colors: { skin: '#f6c9a0', shirt: '#7c5cff', pants: '#ff5fa2', hair: '#f2d24a', accent: '#2fc4ff' },
    hairStyle: 'buns', accessory: 'none', style: 'bouncy', voice: 1.7,
    unlock: { free: true }
  },
  {
    id: 'terry', name: 'Tank Terry', tag: 'Has never been described as aerodynamic.',
    stats: { speed: 5, jump: 3, balance: 4, strength: 10, stamina: 6, recovery: 4 },
    body: { height: 1.06, width: 1.35, head: 1.05, belly: 0.9, limb: 1.5, leg: 0.4 },
    colors: { skin: '#8f5a35', shirt: '#ffd23f', pants: '#2b2b2b', hair: '#1a1a1a', accent: '#ff5b2b' },
    hairStyle: 'short', accessory: 'none', style: 'heavy', voice: 0.5,
    unlock: { free: true }
  },
  {
    id: 'daisy', name: 'Ditzy Daisy', tag: 'Chaos follows her around. Literally, into the water.',
    stats: { speed: 5, jump: 7, balance: 3, strength: 5, stamina: 6, recovery: 5 },
    body: { height: 0.88, width: 1.12, head: 1.08, belly: 1.3, limb: 1.0, leg: 0.46 },
    colors: { skin: '#ffd9b3', shirt: '#ff5fa2', pants: '#5b2a86', hair: '#ff8a2b', accent: '#43e08a' },
    hairStyle: 'pigtails', accessory: 'none', style: 'goofy', voice: 1.6,
    unlock: { free: true }
  },
  {
    id: 'chad', name: 'Cool Chad', tag: 'Practises his victory pose in the mirror.',
    stats: { speed: 7, jump: 7, balance: 8, strength: 6, stamina: 7, recovery: 7 },
    body: { height: 1.08, width: 0.96, head: 0.96, belly: 0.8, limb: 1.08, leg: 0.52 },
    colors: { skin: '#e8ae7d', shirt: '#24a8a0', pants: '#223a5e', hair: '#f2d24a', accent: '#ff5fa2' },
    hairStyle: 'quiff', accessory: 'shades', style: 'athletic', voice: 0.8,
    unlock: { free: true }
  },
  {
    id: 'nana', name: 'Nana Noodle', tag: 'Bringing a flask, a cardigan and pure spite.',
    stats: { speed: 4, jump: 3, balance: 6, strength: 3, stamina: 4, recovery: 2 },
    body: { height: 1.14, width: 0.86, head: 1.02, belly: 1.0, limb: 0.8, leg: 0.5 },
    colors: { skin: '#f6c9a0', shirt: '#b8e04a', pants: '#6b5a8c', hair: '#e8e8f0', accent: '#ff5fa2' },
    hairStyle: 'bun', accessory: 'glasses', style: 'wobbly', voice: 1.0,
    unlock: { free: true }
  },
  {
    id: 'flops', name: 'Sir Flopsalot', tag: 'A knight. Technically. Mostly decorative.',
    stats: { speed: 5, jump: 5, balance: 2, strength: 7, stamina: 6, recovery: 4 },
    body: { height: 1.0, width: 1.0, head: 1.0, belly: 1.05, limb: 1.05, leg: 0.5 },
    colors: { skin: '#c88555', shirt: '#b9c6d8', pants: '#5d6a7d', hair: '#4a3628', accent: '#ffd23f' },
    hairStyle: 'short', accessory: 'helmet', style: 'stiff', voice: 0.7,
    unlock: { free: true }
  },
  {
    id: 'greta', name: 'Gizmo Greta', tag: 'Brought gadgets to an obstacle course. Fair enough.',
    stats: { speed: 6, jump: 6, balance: 7, strength: 6, stamina: 7, recovery: 8 },
    body: { height: 1.0, width: 0.88, head: 1.06, belly: 0.9, limb: 0.88, leg: 0.52 },
    colors: { skin: '#8f5a35', shirt: '#ff8a2b', pants: '#2a3f6b', hair: '#3a2a1e', accent: '#2fc4ff' },
    hairStyle: 'puffs', accessory: 'goggles', style: 'twitchy', voice: 1.3,
    unlock: { tokens: 3 }
  },
  {
    id: 'sam', name: 'Sumo Sam', tag: 'Immovable object. Very movable appetite.',
    stats: { speed: 3, jump: 2, balance: 2, strength: 10, stamina: 7, recovery: 3 },
    body: { height: 1.0, width: 1.55, head: 1.08, belly: 1.9, limb: 1.25, leg: 0.36 },
    colors: { skin: '#e8ae7d', shirt: '#ff5b2b', pants: '#1d1d1d', hair: '#1a1a1a', accent: '#ffd23f' },
    hairStyle: 'topknot', accessory: 'none', style: 'heavy', voice: 0.45,
    unlock: { tokens: 4 }
  },
  {
    id: 'pixie', name: 'Pixie Pearl', tag: 'Light as a crisp packet. Twice as loud.',
    stats: { speed: 7, jump: 9, balance: 8, strength: 2, stamina: 6, recovery: 9 },
    body: { height: 0.78, width: 0.72, head: 1.12, belly: 0.7, limb: 0.66, leg: 0.46 },
    colors: { skin: '#ffd9b3', shirt: '#24a8a0', pants: '#ffd23f', hair: '#ff5fa2', accent: '#7c5cff' },
    hairStyle: 'pigtails', accessory: 'crown', style: 'bouncy', voice: 1.8,
    unlock: { tokens: 4 }
  },
  {
    id: 'tom', name: 'Turbo Tom', tag: 'Has two speeds: flat out and asleep.',
    stats: { speed: 10, jump: 6, balance: 5, strength: 4, stamina: 7, recovery: 5 },
    body: { height: 1.02, width: 0.8, head: 0.95, belly: 0.7, limb: 0.86, leg: 0.56 },
    colors: { skin: '#5f3720', shirt: '#e63946', pants: '#181c2b', hair: '#1a1a1a', accent: '#ffd23f' },
    hairStyle: 'flat', accessory: 'headband', style: 'athletic', voice: 0.95,
    unlock: { tokens: 5 }
  },
  {
    id: 'gwen', name: 'Gritty Gwen', tag: 'Solid at everything. Rude about it.',
    stats: { speed: 7, jump: 6, balance: 7, strength: 7, stamina: 7, recovery: 6 },
    body: { height: 1.04, width: 1.02, head: 0.98, belly: 0.9, limb: 1.0, leg: 0.5 },
    colors: { skin: '#c88555', shirt: '#b8e04a', pants: '#3a4a5e', hair: '#7a4a24', accent: '#ff5b2b' },
    hairStyle: 'bob', accessory: 'none', style: 'stiff', voice: 0.85,
    unlock: { tokens: 5 }
  },
  {
    id: 'plop', name: 'Professor Plop', tag: 'Calculates trajectories. Ignores them completely.',
    stats: { speed: 4, jump: 6, balance: 4, strength: 4, stamina: 5, recovery: 6 },
    body: { height: 1.08, width: 0.9, head: 1.08, belly: 1.0, limb: 0.8, leg: 0.48 },
    colors: { skin: '#ffd9b3', shirt: '#f0f4f8', pants: '#3a4a5e', hair: '#cfd6de', accent: '#24a8a0' },
    hairStyle: 'wild', accessory: 'glasses', style: 'wobbly', voice: 0.9,
    unlock: { tokens: 6 }
  },
  {
    id: 'bruno', name: 'Brick Bruno', tag: 'Made entirely of enthusiasm and protein.',
    stats: { speed: 4, jump: 3, balance: 3, strength: 10, stamina: 5, recovery: 4 },
    body: { height: 1.1, width: 1.3, head: 1.0, belly: 0.75, limb: 1.55, leg: 0.45 },
    colors: { skin: '#8f5a35', shirt: '#2b2b2b', pants: '#e63946', hair: '#1a1a1a', accent: '#ffd23f' },
    hairStyle: 'buzz', accessory: 'none', style: 'heavy', voice: 0.5,
    unlock: { tokens: 6 }
  },
  {
    id: 'fiona', name: 'Fizzy Fiona', tag: 'Three espressos and a dream.',
    stats: { speed: 8, jump: 8, balance: 5, strength: 4, stamina: 10, recovery: 8 },
    body: { height: 0.94, width: 0.86, head: 1.04, belly: 0.85, limb: 0.8, leg: 0.5 },
    colors: { skin: '#f6c9a0', shirt: '#ff8a2b', pants: '#5b2a86', hair: '#e63946', accent: '#43e08a' },
    hairStyle: 'spiky', accessory: 'none', style: 'twitchy', voice: 1.7,
    unlock: { tokens: 8 }
  },
  {
    id: 'wobble', name: 'Old Man Wobble', tag: 'Was promised a gentle stroll.',
    stats: { speed: 3, jump: 4, balance: 2, strength: 5, stamina: 3, recovery: 3 },
    body: { height: 1.2, width: 0.82, head: 1.0, belly: 1.05, limb: 0.72, leg: 0.52 },
    colors: { skin: '#f6c9a0', shirt: '#6b5a8c', pants: '#3a4a5e', hair: '#f6f6fa', accent: '#b8e04a' },
    hairStyle: 'bald', accessory: 'glasses', style: 'wobbly', voice: 0.7,
    unlock: { tokens: 7 }
  },
  {
    id: 'nina', name: 'Ninja Nina', tag: 'Not here to make friends. Here to make distance.',
    stats: { speed: 9, jump: 9, balance: 9, strength: 5, stamina: 7, recovery: 9 },
    body: { height: 0.98, width: 0.76, head: 0.96, belly: 0.7, limb: 0.78, leg: 0.55 },
    colors: { skin: '#e8ae7d', shirt: '#181c2b', pants: '#181c2b', hair: '#1a1a1a', accent: '#e63946' },
    hairStyle: 'ponytail', accessory: 'mask', style: 'athletic', voice: 1.1,
    unlock: { tokens: 12 }
  },
  {
    id: 'chuck', name: 'Chef Chuck', tag: 'Runs on butter. All of the butter.',
    stats: { speed: 5, jump: 5, balance: 4, strength: 8, stamina: 6, recovery: 5 },
    body: { height: 1.02, width: 1.25, head: 1.05, belly: 1.5, limb: 1.12, leg: 0.44 },
    colors: { skin: '#c88555', shirt: '#f6f6fa', pants: '#2b2b2b', hair: '#3a2a1e', accent: '#ff5b2b' },
    hairStyle: 'short', accessory: 'chef', style: 'heavy', voice: 0.65,
    unlock: { tokens: 13 }
  },
  {
    id: 'bea', name: 'Ballerina Bea', tag: 'Graceful until the giant red ball arrives.',
    stats: { speed: 7, jump: 8, balance: 10, strength: 5, stamina: 6, recovery: 7 },
    body: { height: 1.14, width: 0.7, head: 0.94, belly: 0.7, limb: 0.7, leg: 0.62 },
    colors: { skin: '#ffd9b3', shirt: '#ff5fa2', pants: '#ffd9ef', hair: '#3a2a1e', accent: '#7c5cff' },
    hairStyle: 'bun', accessory: 'tiara', style: 'stiff', voice: 1.2,
    unlock: { tokens: 13 }
  },
  {
    id: 'maxine', name: 'Mad Maxine', tag: 'Signed the waiver with a drawing of a shark.',
    stats: { speed: 8, jump: 7, balance: 6, strength: 8, stamina: 8, recovery: 6 },
    body: { height: 1.06, width: 1.08, head: 1.0, belly: 0.9, limb: 1.15, leg: 0.5 },
    colors: { skin: '#8f5a35', shirt: '#2b2b2b', pants: '#ff8a2b', hair: '#e63946', accent: '#ffd23f' },
    hairStyle: 'mohawk', accessory: 'goggles', style: 'twitchy', voice: 0.75,
    unlock: { tokens: 15 }
  },
  {
    id: 'pete', name: 'Penguin Pete', tag: 'Technically a penguin. Legally a menace.',
    stats: { speed: 6, jump: 4, balance: 5, strength: 6, stamina: 8, recovery: 5 },
    body: { height: 0.86, width: 1.1, head: 1.14, belly: 1.25, limb: 0.9, leg: 0.38 },
    colors: { skin: '#f6c9a0', shirt: '#181c2b', pants: '#181c2b', hair: '#1a1a1a', accent: '#ff8a2b' },
    hairStyle: 'bald', accessory: 'beanie', style: 'stiff', voice: 1.4,
    unlock: { tokens: 15 }
  }
];

export const COSTUME_COLORS = [
  '#ff5b2b', '#2fc4ff', '#ffd23f', '#7c5cff', '#ff5fa2',
  '#43e08a', '#24a8a0', '#e63946', '#b8e04a', '#ff8a2b',
  '#f6f6fa', '#181c2b'
];

export const ACCESSORIES = [
  { id: 'none', label: 'NONE' },
  { id: 'cap', label: 'CAP' },
  { id: 'headband', label: 'BAND' },
  { id: 'crown', label: 'CROWN' },
  { id: 'goggles', label: 'GOGGLES' },
  { id: 'shades', label: 'SHADES' },
  { id: 'beanie', label: 'BEANIE' },
  { id: 'horns', label: 'HORNS' }
];

export function getCharacter(id) {
  return CHARACTERS.find(c => c.id === id) || CHARACTERS[0];
}

// Derived physical attributes used by the controller.
export function physical(c) {
  const s = c.stats;
  return {
    height: 1.55 * c.body.height,
    radius: 0.4 * Math.max(0.78, c.body.width),
    mass: 0.75 + c.body.width * c.body.width * c.body.height * 0.9,
    moveSpeed: 7.0 + s.speed * 0.42,
    sprintMult: 1.28 + s.stamina * 0.018,
    jumpVel: 8.3 + s.jump * 0.22,
    accel: 38 + s.speed * 2.2,
    airControl: 0.36 + s.jump * 0.04,
    knockResist: Math.min(0.68, s.strength * 0.032 + s.balance * 0.025 + (c.body.width - 0.8) * 0.16),
    recoveryTime: Math.max(0.45, 1.55 - s.recovery * 0.1),
    getUpTime: Math.max(0.35, 1.15 - s.recovery * 0.075),
    staminaDrain: 0.24 - s.stamina * 0.009,
    staminaRegen: 0.1 + s.stamina * 0.016,
    balanceGrip: 0.55 + s.balance * 0.045
  };
}

export function randomBotCharacters(playerId, count) {
  const pool = CHARACTERS.filter(c => c.id !== playerId);
  const shuffled = pool.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export const BOT_NAMES = ['Slippy', 'Crash', 'Noodle', 'Biff', 'Wobble', 'Splashy', 'Bonk'];

export function titleForRound(roundId) {
  return {
    qualifier: 'QUALIFIER',
    sweeper: 'SWEEPER CHALLENGE',
    dizzy: 'DIZZY ZONE',
    wipeout: 'WIPEOUT ZONE'
  }[roundId] || roundId;
}
