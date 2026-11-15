import { WOODS, CORES, MATERIALS, RECIPES, SPELLS, LESSON_TRACKS, QUESTS, ACHIEVEMENTS, TITLES, UPGRADES, MARKET, CUSTOMERS, ZONES, CATEGORIES, RARITIES } from './data.js';
import { computeWand, recipeFor, rarityFor, saleEvaluation, materialById, woodById, coreById, BENCH } from './crafting.js';

const SAVE_KEY = 'wandlore.save.v1';
const rand = (a, b) => a + Math.random() * (b - a);
const coin = n => Math.round(n);

export function xpNeeded(level) { return 80 + level * 70; }

export class Game {
  constructor() {
    this.listeners = {};
    this.state = null;
  }

  on(evt, fn) {
    (this.listeners[evt] ||= []).push(fn);
    return () => { this.listeners[evt] = this.listeners[evt].filter(f => f !== fn); };
  }
  emit(evt, data) { for (const fn of this.listeners[evt] || []) { try { fn(data); } catch (e) { console.error(e); } } }

  hasSave() {
    try { return Boolean(localStorage.getItem(SAVE_KEY)); } catch { return false; }
  }

  newGame(name = 'Rowan Ashford') {
    const starter = computeWand({ woodId: 'oak', coreId: 'unicorn', length: 11.5, flexibility: 48, materials: [], bench: 1, id: 'starter-wand' });
    starter.name = "Apprentice's Oak";
    starter.starter = true;
    starter.trait = { name: 'First Hand', desc: 'A plain, faithful wand. Every legend starts somewhere.', key: 'starter' };
    this.state = {
      version: 1,
      name: name.trim() || 'Rowan Ashford',
      level: 1, xp: 0, gold: 260, rep: 0,
      hp: 100, mp: 100,
      wands: [starter],
      equipped: starter.id,
      inventory: {
        woods: { oak: 3, willow: 2, holly: 2, ash: 1, hawthorn: 1 },
        cores: { unicorn: 2, dragon: 2, chimaera: 1 },
        materials: { moonstone: 1, dragonbone: 1 }
      },
      known: { hexbolt: 0 },
      loadout: ['hexbolt'],
      lessons: {},
      quests: Object.fromEntries(QUESTS.map(q => [q.id, { progress: 0, done: false }])),
      achievements: [],
      stats: { wandsCrafted: 0, wandsSold: 0, duelsWon: 0, duelsLost: 0, ingredients: 0, tournaments: 0, bosses: 0, totalXp: 0, spellsCast: 0, goldEarned: 0 },
      gathered: {},
      craftedWoods: [],
      defeated: {},
      discovered: { recipes: [], woods: ['oak'], cores: ['unicorn'], spells: ['hexbolt'] },
      upgrades: { bench: 1, shelf: false, advert: false, corevault: false, cauldron: false },
      customers: [],
      badges: [],
      discoveredZones: ['village', 'academy'],
      settings: { sound: true },
      title: TITLES[0].name,
      createdAt: Date.now(),
      lastSaved: Date.now(),
      playTime: 0,
      flags: { introSeen: false, tutorialCraft: false, tutorialDuel: false, tutorialLesson: false }
    };
    this.refreshCustomers();
    this.save();
    this.emit('newgame');
    this.emit('change');
    return this.state;
  }

  load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data || !data.wands) return false;
      this.state = data;
      // migration / defensive defaults
      this.state.settings ||= { sound: true };
      this.state.discovered ||= { recipes: [], woods: [], cores: [], spells: [] };
      this.state.stats ||= {};
      this.state.flags ||= {};
      this.state.gathered ||= {};
      this.state.craftedWoods ||= [];
      this.state.defeated ||= {};
      this.state.customers ||= [];
      if (!this.state.customers.length) this.refreshCustomers();
      return true;
    } catch (e) { console.error('Load failed', e); return false; }
  }

  save() {
    if (!this.state) return;
    try {
      this.state.lastSaved = Date.now();
      localStorage.setItem(SAVE_KEY, JSON.stringify(this.state));
      this.emit('saved');
    } catch (e) { console.warn('Save failed', e); }
  }

  reset() {
    try { localStorage.removeItem(SAVE_KEY); } catch {}
    this.emit('reset');
  }

  get s() { return this.state; }
  get wand() { return this.s.wands.find(w => w.id === this.s.equipped) || this.s.wands[0]; }
  get bench() { return BENCH[this.s.upgrades.bench] || BENCH[1]; }
  get materialSlots() { return this.bench.slots; }

  xpToNext() { return xpNeeded(this.s.level); }

  addXp(amount, quiet = false) {
    if (!amount) return;
    const s = this.s;
    s.xp += amount;
    s.stats.totalXp = (s.stats.totalXp || 0) + amount;
    let leveled = 0;
    while (s.xp >= xpNeeded(s.level)) {
      s.xp -= xpNeeded(s.level);
      s.level++;
      leveled++;
    }
    if (leveled) {
      s.hp = 100 + (s.level - 1) * 6;
      s.mp = 100 + (s.level - 1) * 4;
      s.title = [...TITLES].reverse().find(t => s.level >= t.level)?.name || TITLES[0].name;
      this.checkAchievements();
      this.emit('levelup', { level: s.level, title: s.title });
    }
    if (!quiet) this.emit('change');
    return leveled;
  }

  addGold(n, quiet = false) {
    this.s.gold = Math.max(0, this.s.gold + n);
    if (n > 0) this.s.stats.goldEarned = (this.s.stats.goldEarned || 0) + n;
    if (!quiet) this.emit('change');
  }

  addRep(n) {
    this.s.rep = Math.max(0, this.s.rep + n);
    this.emit('change');
  }

  maxHp() { return 100 + (this.s.level - 1) * 6; }
  maxMp() { return 100 + (this.s.level - 1) * 4; }

  addItem(kind, id, qty = 1) {
    const s = this.s;
    s.inventory[kind] ||= {};
    s.inventory[kind][id] = (s.inventory[kind][id] || 0) + qty;
    if (kind === 'woods') s.discovered.woods = [...new Set([...s.discovered.woods, id])];
    if (kind === 'cores') s.discovered.cores = [...new Set([...s.discovered.cores, id])];
    if (kind !== 'materials') s.gathered[id] = (s.gathered[id] || 0) + qty;
    s.stats.ingredients = (s.stats.ingredients || 0) + qty;
    this.emit('item', { kind, id, qty });
    this.emit('change');
  }

  removeItem(kind, id, qty = 1) {
    const inv = this.s.inventory[kind];
    if (!inv || (inv[id] || 0) < qty) return false;
    inv[id] -= qty;
    if (inv[id] <= 0) delete inv[id];
    this.emit('change');
    return true;
  }

  countItem(kind, id) { return this.s.inventory[kind]?.[id] || 0; }

  craft(config) {
    const s = this.s;
    const { woodId, coreId, length, flexibility, materials = [] } = config;
    if (!this.countItem('woods', woodId)) return { ok: false, msg: 'You have no wood of that kind.' };
    if (!this.countItem('cores', coreId)) return { ok: false, msg: 'You have no core of that kind.' };
    if (materials.length > this.materialSlots) return { ok: false, msg: 'Your bench cannot hold that many materials.' };
    for (const m of materials) if (!this.countItem('materials', m)) return { ok: false, msg: `No ${materialById(m)?.name || 'material'} left.` };
    const wand = computeWand({ woodId, coreId, length, flexibility, materials, bench: s.upgrades.bench });
    if (!wand) return { ok: false, msg: 'The wand refuses to take shape.' };
    this.removeItem('woods', woodId);
    this.removeItem('cores', coreId);
    for (const m of materials) this.removeItem('materials', m);
    s.wands.push(wand);
    s.stats.wandsCrafted++;
    s.craftedWoods = [...new Set([...s.craftedWoods, woodId])];
    s.discovered.woods = [...new Set([...s.discovered.woods, woodId])];
    s.discovered.cores = [...new Set([...s.discovered.cores, coreId])];
    let isNewRecipe = false;
    if (wand.recipe) {
      if (!s.discovered.recipes.includes(wand.recipe.name)) {
        s.discovered.recipes.push(wand.recipe.name);
        isNewRecipe = true;
      }
    }
    this.progressQuest('craft', 1, { wand });
    this.progressQuest('woodvariety', 1, { unique: s.craftedWoods.length });
    if (wand.recipe) this.progressQuest('legendary', 1);
    this.checkAchievements();
    this.save();
    this.emit('crafted', { wand, isNewRecipe });
    this.emit('change');
    return { ok: true, wand, isNewRecipe };
  }

  equip(wandId) {
    if (!this.s.wands.some(w => w.id === wandId)) return;
    this.s.equipped = wandId;
    this.save();
    this.emit('equipped', this.wand);
    this.emit('change');
  }

  sell(wandId, customerId) {
    const s = this.s;
    const idx = s.wands.findIndex(w => w.id === wandId);
    if (idx < 0) return { ok: false, msg: 'That wand is not in your collection.' };
    if (s.wands.length <= 1) return { ok: false, msg: 'You cannot sell your last wand.' };
    const customer = s.customers.find(c => c.id === customerId);
    if (!customer) return { ok: false, msg: 'That customer has already left.' };
    const wand = s.wands[idx];
    if (wand.id === s.equipped) return { ok: false, msg: 'Equip another wand before selling this one.' };
    const cents = saleEvaluation(customer, wand, s.upgrades.advert ? 0.1 : 0);
    if (!cents.accepted) {
      this.emit('sale', { ok: false, wand, customer, eval: cents });
      return { ok: false, eval: cents, msg: 'The customer declined.' };
    }
    const price = Math.min(customer.budget[1], Math.round(cents.price));
    s.wands.splice(idx, 1);
    this.addGold(price, true);
    this.addXp(Math.round(30 + cents.score * 0.9), true);
    this.addRep(4);
    s.stats.wandsSold++;
    this.progressQuest('sell', 1);
    this.checkAchievements();
    // replace customer
    this.replaceCustomer(customerId);
    this.save();
    this.emit('sale', { ok: true, price, wand, customer, eval: cents });
    this.emit('change');
    return { ok: true, price, eval: cents };
  }

  buyMarket(itemId) {
    const offer = MARKET.find(m => m.id === itemId);
    if (!offer) return false;
    if (this.s.gold < offer.price) { this.emit('toast', { title: 'Not enough galleons', text: 'The shopkeeper smiles apologetically.' }); return false; }
    this.addGold(-offer.price, true);
    const kind = offer.kind === 'wood' ? 'woods' : offer.kind === 'core' ? 'cores' : 'materials';
    this.addItem(kind, offer.id, offer.qty);
    this.save();
    this.emit('change');
    return true;
  }

  buyUpgrade(id) {
    const up = UPGRADES.find(u => u.id === id);
    if (!up) return false;
    const s = this.s;
    if (id.startsWith('bench')) {
      if (s.upgrades.bench >= up.tier) return false;
      if (s.gold < up.cost) { this.emit('toast', { title: 'Not enough galleons', text: 'You need a few more sales.' }); return false; }
      this.addGold(-up.cost, true);
      s.upgrades.bench = up.tier;
      this.emit('toast', { title: 'Workbench upgraded', text: up.name + ' — wands gain +' + BENCH[up.tier].bonus + ' to all stats.' });
    } else {
      if (s.upgrades[id]) return false;
      if (s.gold < up.cost) { this.emit('toast', { title: 'Not enough galleons', text: 'You need a few more sales.' }); return false; }
      this.addGold(-up.cost, true);
      s.upgrades[id] = true;
      this.emit('toast', { title: 'Shop upgraded', text: up.desc });
    }
    this.save();
    this.emit('change');
    return true;
  }

  refreshCustomers() {
    const s = this.s;
    const pool = CUSTOMERS.filter(c => {
      if (c.id === 'lucien') return s.rep >= 60;
      if (c.id === 'minerva') return s.rep >= 40;
      return true;
    });
    const picks = [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
    s.customers = picks.map(c => {
      const scale = 1 + s.rep / 240 + (s.upgrades.advert ? 0.25 : 0);
      return {
        id: c.id,
        budget: [Math.round(c.budget[0] * scale), Math.round(c.budget[1] * scale)],
        wants: c.wants,
        served: false
      };
    });
  }

  replaceCustomer(id) {
    const s = this.s;
    const current = s.customers.find(c => c.id === id);
    const used = new Set(s.customers.map(c => c.id));
    const base = CUSTOMERS.find(c => c.id === id);
    if (!base) return;
    // pick a new customer not currently in shop, adjusting budget with rep
    const options = CUSTOMERS.filter(c => !used.has(c.id) && (c.id !== 'lucien' || s.rep >= 60) && (c.id !== 'minerva' || s.rep >= 40));
    if (!options.length) return;
    const pick = options[Math.floor(Math.random() * options.length)];
    const scale = 1 + s.rep / 240 + (s.upgrades.advert ? 0.25 : 0);
    const next = {
      id: pick.id,
      budget: [Math.round(pick.budget[0] * scale), Math.round(pick.budget[1] * scale)],
      wants: pick.wants,
      served: false
    };
    const i = s.customers.findIndex(c => c.id === id);
    if (i >= 0) s.customers[i] = next;
  }

  getCustomerInfo(c) { return CUSTOMERS.find(x => x.id === c.id); }

  gainIngredient(kind, id) {
    this.addItem(kind, id, 1);
    this.progressQuest('collect', 1, { item: id });
    this.checkAchievements();
  }

  learnSpell(spellId) {
    const s = this.s;
    if (s.known[spellId] !== undefined) return false;
    s.known[spellId] = 0;
    s.discovered.spells = [...new Set([...s.discovered.spells, spellId])];
    if (s.loadout.length < 6) s.loadout.push(spellId);
    const spell = SPELLS.find(x => x.id === spellId);
    this.addXp(30, true);
    this.checkAchievements();
    this.save();
    this.emit('spelllearned', spell);
    this.emit('change');
    return true;
  }

  completeLesson(lessonId) {
    const s = this.s;
    if (s.lessons[lessonId]) return null;
    let lesson = null, track = null;
    for (const t of LESSON_TRACKS) {
      const l = t.lessons.find(x => x.id === lessonId);
      if (l) { lesson = l; track = t; break; }
    }
    if (!lesson) return null;
    s.lessons[lessonId] = true;
    this.learnSpell(lesson.spell);
    this.addXp(lesson.xp, true);
    this.addRep(3);
    this.progressQuest('lesson', 1);
    this.checkAchievements();
    this.save();
    this.emit('lessoncomplete', { lesson, track });
    this.emit('change');
    return lesson;
  }

  addMastery(spellId, amount = 1) {
    const s = this.s;
    if (s.known[spellId] === undefined) return;
    s.known[spellId] = Math.min(100, s.known[spellId] + amount);
    s.stats.spellsCast = (s.stats.spellsCast || 0) + 1;
  }

  masteryRank(spellId) {
    const m = this.s.known[spellId] ?? 0;
    if (m >= 100) return { name: 'Mastered', level: 4, mult: 1.35 };
    if (m >= 60) return { name: 'Adept', level: 3, mult: 1.22 };
    if (m >= 25) return { name: 'Practised', level: 2, mult: 1.1 };
    return { name: 'Learned', level: 1, mult: 1 };
  }

  setLoadout(spellId, enabled) {
    const s = this.s;
    if (s.known[spellId] === undefined) return;
    if (enabled) {
      if (s.loadout.includes(spellId)) return;
      if (s.loadout.length >= 6) { this.emit('toast', { title: 'Spell bar full', text: 'Unequip another spell first (six slots).' }); return; }
      s.loadout.push(spellId);
    } else {
      s.loadout = s.loadout.filter(x => x !== spellId);
    }
    this.save();
    this.emit('change');
  }

  questById(id) { return QUESTS.find(q => q.id === id); }

  progressQuest(type, amount = 1, extra = {}) {
    const s = this.s;
    let completed = [];
    for (const q of QUESTS) {
      const st = s.quests[q.id];
      if (!st || st.done) continue;
      if (q.type !== type) continue;
      if (q.type === 'enemy' && extra.enemyId && extra.enemyId !== q.enemy) continue;
      if (q.type === 'collect' && extra.item && extra.item !== q.item) continue;
      let newProgress = st.progress;
      if (q.type === 'woodvariety') newProgress = Math.min(q.target, extra.unique ?? st.progress);
      else newProgress = Math.min(q.target, st.progress + amount);
      if (newProgress === st.progress) continue;
      st.progress = newProgress;
      if (st.progress >= q.target) {
        st.done = true;
        completed.push(q);
        this.grantQuestRewards(q);
      }
    }
    if (completed.length) this.emit('change');
    return completed;
  }

  grantQuestRewards(q) {
    this.s.gold += q.rewards.gold;
    this.s.stats.goldEarned = (this.s.stats.goldEarned || 0) + q.rewards.gold;
    this.s.rep += q.rewards.rep;
    this.addXp(q.rewards.xp, true);
    this.emit('questcomplete', q);
    this.emit('change');
  }

  activeQuest() {
    const s = this.s;
    for (const q of QUESTS) {
      const st = s.quests[q.id];
      if (st && !st.done) return q;
    }
    return null;
  }

  questState(q) { return this.s.quests[q.id] || { progress: 0, done: false }; }

  recordDuel({ enemy, won, prize }) {
    const s = this.s;
    if (won) {
      s.stats.duelsWon++;
      this.progressQuest('duel', 1);
      if (enemy.boss) {
        s.stats.bosses++;
        if (prize?.boss) s.badges = [...new Set([...s.badges, enemy.name])];
      }
      this.progressQuest('enemy', 1, { enemyId: enemy.id });
      s.defeated[enemy.id] = (s.defeated[enemy.id] || 0) + 1;
      const shelf = s.upgrades.shelf ? 35 : 0;
      this.addGold((enemy.rewards.gold || 0) + shelf, true);
      this.addXp(enemy.rewards.xp || 0, true);
      this.addRep(enemy.rewards.rep || 0);
      for (const drop of enemy.drops || []) this.grantRandomDrop(drop);
      this.checkAchievements();
    } else {
      s.stats.duelsLost++;
    }
    this.save();
    this.emit('change');
  }

  grantRandomDrop(id) {
    const wood = WOODS.find(w => w.id === id);
    const core = CORES.find(c => c.id === id);
    const mat = MATERIALS.find(m => m.id === id);
    if (wood) this.addItem('woods', id, 1);
    else if (core) this.addItem('cores', id, 1);
    else if (mat) this.addItem('materials', id, 1);
  }

  recordTournament(id, won) {
    if (!won) return;
    this.s.stats.tournaments++;
    const t = id;
    this.progressQuest('tournament', 1);
    if (!this.s.badges.includes('Silver Circle Champion')) this.s.badges.push('Silver Circle Champion');
    this.checkAchievements();
    this.save();
    this.emit('change');
  }

  unlockZone(zoneId) {
    const zone = ZONES.find(z => z.id === zoneId);
    if (!zone || this.s.rep < zone.req) return false;
    if (!this.s.discoveredZones.includes(zoneId)) {
      this.s.discoveredZones.push(zoneId);
      this.emit('toast', { title: 'New location', text: zone.name + ' is now open to you.' });
      this.emit('change');
      this.save();
    }
    return true;
  }

  checkAchievements() {
    const s = this.s;
    const add = id => {
      if (s.achievements.includes(id)) return;
      s.achievements.push(id);
      const a = ACHIEVEMENTS.find(x => x.id === id);
      if (a) this.emit('achievement', a);
    };
    if (s.stats.wandsCrafted >= 1) add('firstwand');
    if (s.stats.wandsCrafted >= 10) add('tenwands');
    if (s.discovered.recipes.length >= 1) add('legend');
    const cats = new Set(Object.keys(s.known).map(id => SPELLS.find(x => x.id === id)?.cat).filter(Boolean));
    if (cats.size >= 6) add('allcats');
    if (s.stats.duelsWon >= 1) add('duel1');
    if (s.stats.duelsWon >= 10) add('duel10');
    if (s.stats.tournaments >= 1) add('tournament');
    if (s.stats.wandsSold >= 1) add('sale');
    if (s.stats.wandsSold >= 5) add('sales5');
    if (s.stats.ingredients >= 20) add('gather20');
    if (s.stats.bosses >= 1 && s.defeated.malachar) add('boss');
    if (s.level >= 10) add('level10');
  }

  displayTitle() {
    if (this.s.defeated?.malachar) return 'The Hollow Breaker';
    if (this.s.badges.includes('Silver Circle Champion') && this.s.level >= 6) return 'Champion of the Silver Circle';
    return this.s.title;
  }

  discoveredWandStats() {
    const s = this.s;
    return {
      woods: WOODS.filter(w => s.discovered.woods.includes(w.id)).length,
      woodsTotal: WOODS.length,
      cores: CORES.filter(c => s.discovered.cores.includes(c.id)).length,
      coresTotal: CORES.length,
      recipes: s.discovered.recipes.length,
      recipesTotal: RECIPES.length,
      spells: Object.keys(s.known).length,
      spellsTotal: SPELLS.length
    };
  }
}

export const game = new Game();
export { SAVE_KEY, RARITIES };
