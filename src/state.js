import {
  SPECIES, POTS, MATERIALS, WEAPON_TYPES, DECOR, TREE_NAMES, newId, treeValue,
} from './data.js';

export const SAVE_KEY = 'way-of-the-samurai-v1';

export function createTree(spId, opts = {}) {
  const sp = SPECIES[spId];
  const age = opts.age ?? (1.2 + Math.random() * 2.2);
  return {
    id: newId('tree'),
    kind: 'tree',
    sp: spId,
    name: opts.name || TREE_NAMES[Math.floor(Math.random() * TREE_NAMES.length)],
    age,
    growth: opts.growth ?? Math.round(8 + Math.random() * 20),
    health: opts.health ?? 82 + Math.random() * 14,
    water: opts.water ?? 55 + Math.random() * 25,
    style: opts.style ?? Math.round(12 + Math.random() * 18),
    pot: opts.pot ?? 0,
    variant: opts.variant ?? Math.floor(Math.random() * 1000),
    wiring: false,
    heirloom: opts.heirloom ?? false,
    plantedDay: opts.plantedDay ?? 1,
    supernatural: !!sp.supernatural,
    lastWatered: 0,
  };
}

export function createWeapon(typeId, opts = {}) {
  const type = WEAPON_TYPES[typeId];
  return {
    id: newId('wep'),
    kind: 'weapon',
    type: typeId,
    name: opts.name || 'New Blade',
    material: opts.material || 'iron',
    quality: Math.round(opts.quality ?? 50),
    durability: Math.round(opts.durability ?? 80),
    decoration: !!opts.decoration,
    supernatural: !!(opts.supernatural ?? type.supernatural),
    legendary: !!opts.legendary,
    forgedDay: opts.forgedDay ?? 1,
    maker: opts.maker || 'You',
  };
}

export function initialState() {
  return {
    version: 1,
    money: 2400,
    rep: 0,
    day: 1,
    hour: 8,
    minutes: 8 * 60,
    weather: 'clear',
    focus: 100,
    maxFocus: 100,
    trees: [
      createTree('maple', { name: 'Kokoro', age: 2.6, style: 26, health: 91, water: 70, pot: 0, variant: 7, plantedDay: 0 }),
      createTree('pine', { name: 'Yama', age: 3.4, style: 19, health: 94, water: 55, pot: 0, variant: 23, plantedDay: 0 }),
      createTree('juniper', { name: 'Shizuka', age: 1.5, style: 14, health: 86, water: 62, pot: 0, variant: 41, plantedDay: 0 }),
    ],
    weapons: [],
    seeds: { maple: 1, pine: 1, cherry: 0, bamboo: 1, juniper: 0, azalea: 0, wisteria: 0 },
    materials: { iron: 4, charcoal: 6, tamahagane: 1, folded: 0, onisteel: 0, spiritwood: 0, wood: 2 },
    blueprints: [],
    decor: [],
    gardenLevel: 0,
    workshopLevel: 0,
    misthouseLevel: 0,
    hires: { gardener: 0, assistant: 0 },
    stats: {
      watered: 0, shaped: 0, crafted: 0, sold: 0, seedsBought: 0, oniVisits: 0,
      upgraded: 0, totalEarned: 0, masterpieceSold: 0, legendaryCrafted: 0, auctions: 0,
      commissionsDone: 0, planted: 0, gathered: 0,
    },
    questsDone: [],
    commissions: [],
    buyers: {},
    flags: {},
    gathered: {},
    oniStock: [],
    oniStockDay: 0,
    oniLot: null,
    discovered: ['estate'],
    tutorial: 0,
    log: [],
    auction: { lastDay: 0, count: 0, special: false },
    settings: { sound: true, music: true },
    lastSaved: Date.now(),
  };
}

export function save(state) {
  try {
    state.lastSaved = Date.now();
    const data = JSON.parse(JSON.stringify(state));
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.warn('Save failed', e);
    return false;
  }
}

export function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data.version) return null;
    const base = initialState();
    const state = { ...base, ...data };
    state.stats = { ...base.stats, ...(data.stats || {}) };
    state.settings = { ...base.settings, ...(data.settings || {}) };
    state.hires = { ...base.hires, ...(data.hires || {}) };
    state.seeds = { ...base.seeds, ...(data.seeds || {}) };
    state.materials = { ...base.materials, ...(data.materials || {}) };
    state.trees = (data.trees || []).map((t) => ({ ...createTree(t.sp, t), ...t }));
    state.weapons = (data.weapons || []).map((w) => ({ ...createWeapon(w.type, w), ...w }));
    return state;
  } catch (e) {
    console.warn('Load failed', e);
    return null;
  }
}

export function clearSave() {
  try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* ignore */ }
}

export function treeCapacity(state) {
  return 4 + state.gardenLevel * 4;
}

export function beautyOf(state) {
  let beauty = 4 + state.gardenLevel * 6;
  for (const d of state.decor) beauty += DECOR[d]?.beauty || 0;
  for (const t of state.trees) if (t.heirloom) beauty += Math.min(30, treeValue(t) / 900);
  beauty += state.misthouseLevel * 4;
  return Math.round(beauty);
}

export function dailyWages(state) {
  return (state.hires.gardener || 0) * 55 + (state.hires.assistant || 0) * 70;
}

export function visitorIncome(state) {
  const b = beautyOf(state);
  const rep = state.rep;
  return Math.round((b * 6 + b * rep * 0.04) / 10) * 10;
}
