import {
  initialState, load, save, clearSave, treeCapacity, beautyOf, dailyWages, visitorIncome,
  createTree, createWeapon,
} from './state.js';
import {
  SPECIES, POTS, MATERIALS, WEAPON_TYPES, BLUEPRINTS, DECOR, UPGRADES, HIRES, QUESTS,
  SEASONS, WEATHERS, RANKS, rankFor, nextRank, seasonOf, seasonIndex, isNight, treeValue,
  isMasterpiece, treeQuality, weaponValue, clamp, fmt, money, newId, craftName,
} from './data.js';
import { generateCommission, commissionMatches, itemLabel, itemQuality, itemCategory, itemSupernatural, settleAuction } from './auction.js';

const rand = (a, b) => a + Math.random() * (b - a);
const pick = (a) => a[Math.floor(Math.random() * a.length)];

export class Game {
  constructor() {
    const loaded = load();
    this.state = loaded || initialState();
    this.ui = null;
    this.world = null;
    this.audio = null;
    this.paused = false;
    this.minuteAcc = 0;
    this.focusAcc = 0;
    this.uiAcc = 0;
    this.saveAcc = 0;
    this.started = false;
    this._ensure();
  }

  bind(ui, world, audio) {
    this.ui = ui;
    this.world = world;
    this.audio = audio;
    this._ensure();
    if (this.state.commissions.length === 0) {
      for (let i = 0; i < 2; i++) {
        const com = generateCommission(this.state, true);
        if (com) this.state.commissions.push(com);
      }
    }
    if (this.state.flags.rankIndex === undefined) this.state.flags.rankIndex = RANKS.findIndex((r) => r.name === rankFor(this.state.rep).name);
    this.world.rebuildDecor();
    this.world.rebuildBonsai();
    this.world.rebuildWeaponRack();
  }

  _ensure() {
    const s = this.state;
    for (const key of ['seeds', 'materials', 'hires', 'stats', 'flags', 'gathered', 'buyers']) {
      if (!s[key] || typeof s[key] !== 'object') s[key] = key === 'hires' ? { gardener: 0, assistant: 0 } : key === 'stats' ? {} : {};
    }
    s.trees = (s.trees || []).filter((t) => t && SPECIES[t.sp]);
    s.weapons = (s.weapons || []).filter((w) => w && WEAPON_TYPES[w.type]);
    s.decor = (s.decor || []).filter((d) => DECOR[d]);
    s.blueprints = s.blueprints || [];
    s.commissions = s.commissions || [];
    s.seeds = { ...Object.fromEntries(Object.keys(SPECIES).map((k) => [k, 0])), ...s.seeds };
    s.materials = { ...Object.fromEntries(Object.keys(MATERIALS).map((k) => [k, 0])), ...s.materials };
    s.questsDone = s.questsDone || [];
    s.log = s.log || [];
    s.hour = Math.floor((s.minutes ?? 480) / 60);
    s.oniStock = s.oniStock || [];
    s.oniStockDay = s.oniStockDay || 0;
    s.oniLot = s.oniLot || null;
    s.stats = {
      watered: 0, shaped: 0, crafted: 0, sold: 0, seedsBought: 0, oniVisits: 0, upgraded: 0,
      totalEarned: 0, masterpieceSold: 0, legendaryCrafted: 0, auctions: 0, commissionsDone: 0,
      planted: 0, gathered: 0, ...s.stats,
    };
    s.settings = s.settings || { sound: true, music: true };
    s.auction = s.auction || { lastDay: 0, count: 0, special: false };
  }

  // ————— basic helpers —————
  toast(msg, kind = '') { this.ui?.toast(msg, kind); }
  sfx(type) { this.audio?.sfx(type); }
  log(text) {
    this.state.log.unshift(`${this.state.day}/${Math.floor(this.state.minutes / 60)}: ${text}`);
    if (this.state.log.length > 60) this.state.log.length = 60;
  }
  addMoney(n) { this.state.money = Math.max(0, Math.round(this.state.money + n)); this.ui?.refreshHUD(); }
  addRep(n) {
    this.state.rep = Math.max(0, Math.round(this.state.rep + n));
    this.checkRank();
    this.checkQuests();
    this.ui?.refreshHUD();
  }
  useFocus(n) {
    if (this.state.focus < n) { this.toast('You need to clear your mind. Rest or meditate to restore focus.', 'warn'); return false; }
    this.state.focus -= n;
    this.ui?.refreshFocus();
    return true;
  }
  focus(n) { this.state.focus = clamp(this.state.focus + n, 0, this.state.maxFocus); this.ui?.refreshFocus(); }
  saveGame() {
    if (save(this.state)) this.ui?.flashSaved();
  }

  checkRank() {
    const rank = rankFor(this.state.rep);
    const idx = RANKS.findIndex((r) => r.name === rank.name);
    const last = this.state.flags.rankIndex ?? 0;
    if (idx > last) {
      this.state.flags.rankIndex = idx;
      this.toast(`Your name rises: ${rank.name}. ${rank.desc}`, 'good');
      this.sfx('success');
      this.log(`Became ${rank.name}.`);
    }
  }

  // ————— time & simulation —————
  tick(dt) {
    if (!this.started) return;
    this.state = this.state;
    // focus slowly returns
    this.focusAcc += dt;
    if (this.focusAcc > 0.5) {
      const add = 1.3 * this.focusAcc;
      this.focusAcc = 0;
      if (this.state.focus < this.state.maxFocus) {
        this.state.focus = clamp(this.state.focus + add, 0, this.state.maxFocus);
        this.ui?.refreshFocus();
      }
    }
    if (!this.paused) {
      this.minuteAcc += dt * 5.5;
      let guard = 0;
      while (this.minuteAcc >= 10 && guard++ < 8) {
        this.minuteAcc -= 10;
        this.simulate(10);
      }
    }
    this.uiAcc += dt;
    if (this.uiAcc > 0.5) {
      this.uiAcc = 0;
      this.ui?.refreshHUD();
    }
    this.saveAcc += dt;
    if (this.saveAcc > 45) { this.saveAcc = 0; this.saveGame(); }
  }

  simulate(minutes) {
    const s = this.state;
    const hours = minutes / 60;
    s.minutes += minutes;
    while (s.minutes >= 1440) {
      s.minutes -= 1440;
      s.hour = 0;
      this.endDay();
    }
    s.hour = Math.floor(s.minutes / 60);
    const season = seasonOf(s.day);
    const blessing = (s.flags.blessingUntil || 0) > s.day;
    const mist = [1, 1.22, 1.45][s.misthouseLevel] || 1;
    const rain = s.weather === 'rain' || s.weather === 'storm';
    const growthSeason = season.growth * (blessing ? 1.3 : 1);
    for (const t of s.trees) {
      t.water = clamp(t.water - (rain ? 0.35 : 1.35) * hours, 0, 100);
      const growth = 0.95 * growthSeason * (0.5 + t.health / 200) * (t.water > 22 ? 1 : 0.25) * mist * hours;
      t.growth += growth;
      if (t.water < 16) t.health = clamp(t.health - 0.62 * hours, 8, 100);
      else if (t.water > 38) t.health = clamp(t.health + 0.12 * hours, 8, 100);
      let guard = 0;
      while (t.growth >= 100 && guard++ < 10) {
        t.growth -= 100;
        t.age = Math.round((t.age + 0.5) * 100) / 100;
        this.log(`${t.name} grew a season older.`);
      }
    }
    // assistants quietly keep the workshop warm
    if (s.weather === 'storm') s.weaponWeather = true;
  }

  endDay() {
    const s = this.state;
    s.day++;
    const season = seasonOf(s.day);
    s.weather = pick(season.weather);
    s.focus = s.maxFocus;
    // wages & visitors
    const wages = dailyWages(s);
    const visitors = visitorIncome(s);
    if (visitors > 0) this.addMoney(visitors);
    if (wages > 0) {
      if (s.money < wages) {
        this.toast('You could not pay your assistants today. They worked for tea and rice.', 'warn');
        s.money = 0;
      } else s.money -= wages;
    }
    // gardener waters the thirstiest trees
    for (let g = 0; g < (s.hires.gardener || 0); g++) {
      const driest = [...s.trees].sort((a, b) => a.water - b.water)[0];
      if (driest) {
        driest.water = clamp(driest.water + 20, 0, 100);
        driest.growth += 4;
      }
    }
    // commissions
    s.commissions = s.commissions.filter((c) => {
      if (s.day > c.deadlineDay) {
        this.toast(`${c.client} withdrew their commission. The mountain remembers missed promises.`, 'warn');
        return false;
      }
      return true;
    });
    if (s.commissions.length < 3 && Math.random() < 0.7) {
      const com = generateCommission(s, true);
      if (com) {
        s.commissions.push(com);
        this.log(`New commission from ${com.client}.`);
      }
    }
    // reset nightly stock
    s.oniStockDay = 0;
    s.oniLot = null;
    this.checkQuests();
    this.checkRank();
    if (this.started) {
      const summary = `Day ${s.day} · ${season.name}` + (visitors ? ` — visitors left ${money(visitors)}` : '') + (wages ? ` · wages ${money(wages)}` : '');
      this.toast(summary, 'good');
      this.log(summary);
    }
    this.saveGame();
    this.ui?.refreshHUD();
  }

  advanceTime(hours, opts = {}) {
    let mins = Math.round(hours * 60);
    while (mins > 0) {
      const step = Math.min(15, mins);
      this.simulate(step);
      mins -= step;
      // long rests include a gentle hand with the watering can
      if (hours > 4) {
        for (const t of this.state.trees) {
          if (t.water < 30) t.water = 48;
          if (t.health < 40) t.health = 42;
        }
      }
    }
    this.focus(999);
    this.checkQuests();
    if (opts.save) this.saveGame();
    this.ui?.refreshHUD();
  }

  restAt(kind) {
    const s = this.state;
    if (kind === 'house') {
      this.advanceTime(6, { save: true });
      this.toast('You rest in the quiet house. The mountain keeps working around you.', 'good');
    } else if (kind === 'waterfall') {
      this.advanceTime(2, { save: true });
      this.toast('The roar of the falls washes your thoughts clean. Focus restored.', 'good');
      this.sfx('water');
    } else if (kind === 'bell') {
      this.advanceTime(3, { save: true });
      this.toast('The bell fades into the valley. Your hands feel steady again.', 'good');
      this.audio?.bell(220, this.audio.ctx?.currentTime || 0, 0.05);
    } else if (kind === 'cherry') {
      this.advanceTime(2.5, { save: true });
      this.toast('You doze beneath the blossoms. Petals settle in your hair.', 'good');
    } else if (kind === 'pond') {
      this.advanceTime(0.5);
      this.toast('The koi circle without hurry. You breathe with them.', 'good');
    }
    this.focus(999);
    this.ui?.refreshHUD();
  }

  // ————— bonsai —————
  styleCap(tree) {
    return Math.round(clamp(22 + Math.min(tree.age, 14) * 12 + (tree.pot || 0) * 3 + (tree.wiring ? 5 : 0), 20, 100));
  }

  careTree(id, action, opts = {}) {
    const t = this.state.trees.find((x) => x.id === id);
    if (!t) return { ok: false };
    if (action === 'water') {
      if (t.water > 93) { this.toast(`${t.name} is already well watered.`, 'warn'); return { ok: false }; }
      if (!this.useFocus(4)) return { ok: false };
      t.water = clamp(t.water + 34, 0, 100);
      t.growth += 3;
      this.state.stats.watered++;
      this.toast(`${t.name} drinks deeply. Water ${Math.round(t.water)}%.`, 'good');
      this.sfx('water');
    } else if (action === 'prune') {
      const cap = this.styleCap(t);
      if (t.style >= cap) {
        this.toast(`${t.name} has reached the shape these years allow. Let it grow older, or repot it.`, 'warn');
        return { ok: false };
      }
      if (!this.useFocus(9)) return { ok: false };
      const gain = Math.min(7, cap - t.style);
      t.style = clamp(t.style + gain, 0, 100);
      t.growth += 7;
      t.health = clamp(t.health - 0.6, 8, 100);
      this.state.stats.shaped++;
      this.toast(`You prune ${t.name}. Its silhouette sharpens (+${Math.round(gain)} style).`, 'good');
      this.sfx('click');
    } else if (action === 'wire') {
      const cap = this.styleCap(t);
      if (t.style >= cap) {
        this.toast(`${t.name} cannot take more wire until it matures.`, 'warn');
        return { ok: false };
      }
      if (!this.useFocus(13)) return { ok: false };
      const gain = Math.min(10, cap - t.style);
      t.style = clamp(t.style + gain, 0, 100);
      t.wiring = true;
      t.growth += 5;
      t.health = clamp(t.health - 1, 8, 100);
      this.state.stats.shaped++;
      this.toast(`You wrap copper wire around ${t.name}, guiding a new curve (+${Math.round(gain)} style).`, 'good');
      this.sfx('click');
    } else if (action === 'fertilize') {
      if (this.state.money < 90) { this.toast('You need 90 ryō for fertilizer.', 'warn'); return { ok: false }; }
      if (!this.useFocus(5)) return { ok: false };
      this.addMoney(-90);
      t.growth += 18;
      t.health = clamp(t.health + 5, 0, 100);
      t.water = clamp(t.water + 4, 0, 100);
      this.toast(`Rich mountain fertilizer sinks into ${t.name}'s soil.`, 'good');
    } else if (action === 'repot') {
      const newPot = opts.pot;
      if (!newPot || newPot <= t.pot) { this.toast('Choose a finer pot for the repotting.', 'warn'); return { ok: false }; }
      const pot = POTS[newPot];
      if (this.state.money < pot.cost) { this.toast(`That pot costs ${money(pot.cost)}.`, 'warn'); return { ok: false }; }
      if (!this.useFocus(12)) return { ok: false };
      this.addMoney(-pot.cost);
      t.pot = newPot;
      t.growth += 16;
      t.style = clamp(t.style + 2, 0, 100);
      t.health = clamp(t.health + 4, 0, 100);
      this.toast(`${t.name} is lifted into a ${pot.name}. The roots breathe.`, 'good');
      this.sfx('success');
    } else if (action === 'heirloom') {
      t.heirloom = !t.heirloom;
      this.toast(t.heirloom ? `${t.name} is now a family heirloom, displayed with honour.` : `${t.name} may be sold again.`, 'good');
      this.world?.rebuildBonsai();
    } else if (action === 'rename') {
      const name = (opts.name || '').trim().slice(0, 18);
      if (name) t.name = name;
    }
    this.world?.rebuildBonsai();
    this.checkQuests();
    this.ui?.refreshHUD();
    this.saveGame();
    return { ok: true };
  }

  plantSeed(sp) {
    const s = this.state;
    if (!s.seeds[sp] || s.seeds[sp] <= 0) { this.toast('You have no seed of that kind.', 'warn'); return false; }
    if (s.trees.length >= treeCapacity(s)) {
      this.toast('The garden is full. Expand it or sell a tree at auction.', 'warn');
      return false;
    }
    const spDef = SPECIES[sp];
    if (spDef.repReq && s.rep < spDef.repReq) { this.toast(`${spDef.name} seeds are only entrusted to artisans of ${spDef.repReq} reputation.`, 'warn'); return false; }
    if (!this.useFocus(4)) return false;
    s.seeds[sp]--;
    const t = createTree(sp, { age: 0.7, style: 7, growth: 6, health: 92, water: 68, pot: 0, plantedDay: s.day });
    s.trees.push(t);
    s.stats.planted++;
    this.toast(`You plant a ${spDef.name} pip in fresh soil. A small life begins.`, 'good');
    this.world?.rebuildBonsai();
    this.checkQuests();
    this.saveGame();
    this.ui?.refreshHUD();
    return true;
  }

  // ————— crafting —————
  craftNeeds(typeId, materialId) {
    const type = WEAPON_TYPES[typeId];
    if (!type) return {};
    if (type.supernatural) return { ...type.mats };
    const needs = {};
    if (type.matClass === 'wood') {
      needs[materialId] = materialId === 'wood' ? (type.mats.wood || 2) : 2;
      needs.charcoal = type.mats.charcoal || 1;
    } else {
      const baseCount = type.mats.iron || 2;
      needs[materialId] = materialId === 'iron' ? baseCount : 2;
      needs.charcoal = type.mats.charcoal || 1;
    }
    return needs;
  }

  canCraft(typeId, materialId) {
    const s = this.state;
    const type = WEAPON_TYPES[typeId];
    if (!type) return { ok: false, reason: 'Unknown recipe' };
    const reqLevel = Math.max(0, type.tier - 1);
    if (s.workshopLevel < reqLevel) return { ok: false, reason: `Requires workshop level ${reqLevel + 1}` };
    if (type.blueprint && !s.blueprints.includes(type.blueprint)) return { ok: false, reason: 'Forbidden blueprint not yet found' };
    if (type.matClass === 'wood') {
      if (!['wood', 'spiritwood'].includes(materialId)) return { ok: false, reason: 'Bows require hinoki or spirit wood' };
    } else if (!['iron', 'tamahagane', 'folded', 'onisteel'].includes(materialId)) {
      return { ok: false, reason: 'Choose a metal' };
    }
    if (materialId === 'onisteel' && !type.supernatural) return { ok: false, reason: 'Enchanted oni steel refuses ordinary designs' };
    if (materialId === 'spiritwood' && type.matClass !== 'wood') return { ok: false, reason: 'Spirit wood is for bows alone' };
    const needs = this.craftNeeds(typeId, materialId);
    const missing = [];
    for (const [k, n] of Object.entries(needs)) {
      if ((s.materials[k] || 0) < n) missing.push(`${n - (s.materials[k] || 0)} ${MATERIALS[k]?.name || k}`);
    }
    if (missing.length) return { ok: false, reason: `Need ${missing.join(', ')}`, needs, missing };
    return { ok: true, needs };
  }

  finishCraft({ typeId, materialId, scores, decoration = false, name = '' }) {
    const check = this.canCraft(typeId, materialId);
    if (!check.ok) { this.toast(check.reason, 'warn'); this.sfx('error'); return null; }
    const s = this.state;
    const type = WEAPON_TYPES[typeId];
    for (const [k, n] of Object.entries(check.needs)) s.materials[k] -= n;
    const vals = Object.values(scores || {});
    const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 50;
    const assistant = (s.hires.assistant || 0) * 5;
    const workshopBonus = s.workshopLevel * 4 + (s.workshopLevel >= 3 ? 8 : 0);
    const quality = Math.round(clamp(avg * 0.63 + (MATERIALS[materialId]?.quality || 42) * 0.22 + assistant + workshopBonus + rand(-3, 3), 8, 100));
    const supernatural = !!type.supernatural;
    const legendary = supernatural && quality >= 82;
    const w = createWeapon(typeId, {
      name: name || craftName(legendary || supernatural),
      material: materialId,
      quality,
      durability: Math.round(70 + quality * 0.3),
      decoration,
      supernatural,
      legendary,
      forgedDay: s.day,
    });
    s.weapons.push(w);
    s.stats.crafted++;
    if (legendary) s.stats.legendaryCrafted++;
    this.addMoney(-(decoration ? 350 : 0));
    this.addRep(Math.max(2, Math.round(quality / 14)));
    this.log(`Forged ${w.name}, a ${type.name} of ${quality} quality.`);
    this.toast(`${w.name} is complete — quality ${quality}${legendary ? ' · LEGENDARY' : ''}.`, legendary ? 'good' : 'good');
    this.sfx(legendary ? 'success' : 'anvil');
    this.world?.rebuildWeaponRack();
    this.checkQuests();
    this.saveGame();
    this.ui?.refreshHUD();
    return w;
  }

  // ————— gathering & world actions —————
  gatherNode(node) {
    const s = this.state;
    if (s.gathered[node] === s.day) { this.toast('You have gathered here today. The mountain needs time to give again.', 'warn'); return null; }
    if (!this.useFocus(9)) return null;
    s.gathered[node] = s.day;
    s.stats.gathered++;
    const got = [];
    const give = (kind, key, n) => {
      if (kind === 'seed') s.seeds[key] = (s.seeds[key] || 0) + n;
      else s.materials[key] = (s.materials[key] || 0) + n;
      got.push(`${n}× ${kind === 'seed' ? SPECIES[key].name + ' seed' : MATERIALS[key].name}`);
    };
    if (node === 'bamboo') {
      if (Math.random() < 0.7) give('seed', 'bamboo', 1);
      give('mat', 'charcoal', 1 + Math.floor(Math.random() * 2));
      if (Math.random() < 0.14) give('seed', 'wisteria', 1);
      this.sfx('water');
    } else if (node === 'cherry') {
      if (Math.random() < 0.65) give('seed', 'cherry', 1);
      if (Math.random() < 0.25) give('seed', 'azalea', 1);
      if (Math.random() < 0.2) give('seed', 'maple', 1);
      this.sfx('click');
    } else if (node === 'mine') {
      give('mat', 'iron', 2 + Math.floor(Math.random() * 3));
      if (Math.random() < 0.35) give('mat', 'tamahagane', 1);
      if (Math.random() < 0.12) give('mat', 'folded', 1);
      if (isNight(s.hour) && Math.random() < 0.16) give('mat', 'onisteel', 1);
      this.sfx('hammer');
    }
    this.addRep(1);
    this.toast(`Gathered: ${got.join(', ')}.`, 'good');
    this.log(`Gathered ${got.join(', ')} at the ${node}.`);
    this.saveGame();
    this.ui?.refreshHUD();
    this.checkQuests();
    return got;
  }

  templeBlessing() {
    const s = this.state;
    if (s.money < 250) { this.toast('The abbot smiles. A donation of 250 ryō would help the temple lamps.', 'warn'); return false; }
    if (s.flags.blessingDay === s.day) { this.toast('You have already received the day\'s blessing.', 'warn'); return false; }
    this.addMoney(-250);
    s.flags.blessingDay = s.day;
    s.flags.blessingUntil = s.day + 2;
    this.addRep(8);
    this.focus(999);
    this.toast('Incense rises. For two days, your trees will grow with the temple\'s blessing.', 'good');
    this.sfx('success');
    this.audio?.bell(220, 0, 0.03);
    this.saveGame();
    return true;
  }

  worldAction(id) {
    const s = this.state;
    switch (id) {
      case 'estate-house': this.restAt('house'); break;
      case 'estate-bonsai': this.ui.openPanel('bonsai'); break;
      case 'estate-forge': this.ui.openPanel('forge'); break;
      case 'estate-ledger': this.ui.openPanel('estate'); break;
      case 'estate-pond': this.restAt('pond'); break;
      case 'auction': this.ui.openPanel('auction'); break;
      case 'village-market': this.ui.openPanel('market'); break;
      case 'village-elder': this.ui.openPanel('auction', { tab: 'commissions' }); break;
      case 'temple-monk': this.ui.openTemple(); break;
      case 'temple-bell': this.restAt('bell'); break;
      case 'waterfall-meditate': this.restAt('waterfall'); break;
      case 'cherry-rest': this.restAt('cherry'); break;
      case 'cherry-gather': this.gatherNode('cherry'); break;
      case 'bamboo-gather': this.gatherNode('bamboo'); break;
      case 'mine-gather': this.gatherNode('mine'); break;
      case 'oni-gate':
        if (!isNight(s.hour)) {
          this.toast(`The red gate is cold and sealed. It opens only after nightfall. (Now ${String(Math.floor(s.minutes / 60)).padStart(2, '0')}:${String(s.minutes % 60).padStart(2, '0')})`, 'warn');
          this.sfx('error');
        } else {
          this.openOni();
        }
        break;
      default: break;
    }
  }

  // ————— market & estate progression —————
  buySeed(sp) {
    const s = this.state;
    const def = SPECIES[sp];
    if (!def) return false;
    if (def.repReq && s.rep < def.repReq) { this.toast(`The merchant will not sell ${def.name} seeds below ${def.repReq} reputation.`, 'warn'); return false; }
    if (s.money < def.seedCost) { this.toast('Not enough ryō.', 'warn'); return false; }
    this.addMoney(-def.seedCost);
    s.seeds[sp] = (s.seeds[sp] || 0) + 1;
    s.stats.seedsBought++;
    this.toast(`Bought a ${def.name} seed for ${money(def.seedCost)}.`, 'good');
    this.sfx('coin');
    this.checkQuests();
    this.saveGame();
    this.ui?.refreshHUD();
    return true;
  }

  buyMaterial(mat, qty = 1) {
    const s = this.state;
    const def = MATERIALS[mat];
    if (!def) return false;
    if (['onisteel', 'spiritwood'].includes(mat)) { this.toast('That is not sold in the village.', 'warn'); return false; }
    if (mat === 'folded' && s.rep < 200) { this.toast('The merchant keeps folded steel for known artisans (200 reputation).', 'warn'); return false; }
    const cost = def.cost * qty;
    if (s.money < cost) { this.toast('Not enough ryō.', 'warn'); return false; }
    this.addMoney(-cost);
    s.materials[mat] = (s.materials[mat] || 0) + qty;
    this.toast(`Bought ${qty}× ${def.name}.`, 'good');
    this.sfx('coin');
    this.saveGame();
    this.ui?.refreshHUD();
    return true;
  }

  upgrade(kind) {
    const s = this.state;
    const def = UPGRADES[kind];
    if (!def) return false;
    const level = kind === 'garden' ? s.gardenLevel : kind === 'workshop' ? s.workshopLevel : s.misthouseLevel;
    if (level >= def.levels) { this.toast('Already fully upgraded.', 'warn'); return false; }
    const cost = def.costs[level];
    if (s.money < cost) { this.toast(`This upgrade costs ${money(cost)}.`, 'warn'); return false; }
    this.addMoney(-cost);
    if (kind === 'garden') s.gardenLevel++;
    else if (kind === 'workshop') s.workshopLevel++;
    else s.misthouseLevel++;
    s.stats.upgraded++;
    this.addRep(kind === 'workshop' ? 18 : 12);
    this.toast(`${def.name} improved. ${def.desc[level]}`, 'good');
    this.sfx('success');
    this.world?.rebuildBonsai();
    if (kind === 'workshop' && this.world?.forgeFire) this.world.forgeFire.emissiveIntensity += 0.5;
    if (kind === 'garden') this.world?.rebuildDecor();
    this.checkQuests();
    this.saveGame();
    this.ui?.refreshHUD();
    return true;
  }

  hire(kind) {
    const s = this.state;
    const def = HIRES[kind];
    if (!def) return false;
    const count = s.hires[kind] || 0;
    if (count >= def.max) { this.toast('No more hands can be housed here.', 'warn'); return false; }
    const cost = def.cost[count];
    if (s.money < cost) { this.toast(`Hiring costs ${money(cost)} up front.`, 'warn'); return false; }
    this.addMoney(-cost);
    s.hires[kind] = count + 1;
    this.addRep(6);
    this.toast(`${def.name} hired. ${def.desc}`, 'good');
    this.sfx('coin');
    this.saveGame();
    this.ui?.refreshHUD();
    return true;
  }

  buyDecor(id) {
    const s = this.state;
    const def = DECOR[id];
    if (!def) return false;
    if (s.decor.includes(id)) { this.toast('Already part of your estate.', 'warn'); return false; }
    if (s.money < def.cost) { this.toast(`${def.name} costs ${money(def.cost)}.`, 'warn'); return false; }
    this.addMoney(-def.cost);
    s.decor.push(id);
    this.addRep(Math.round(def.beauty * 0.7));
    this.toast(`${def.name} added to your estate. Beauty +${def.beauty}.`, 'good');
    this.sfx('success');
    this.world?.rebuildDecor();
    this.checkQuests();
    this.saveGame();
    this.ui?.refreshHUD();
    return true;
  }

  // ————— auctions —————
  auctionableItems() {
    return [
      ...this.state.trees.filter((t) => !t.heirloom).map((t) => ({ ...t, _kind: 'inventory' })),
      ...this.state.weapons,
    ];
  }

  completeSale(auction) {
    const s = this.state;
    const settlement = settleAuction(auction);
    if (!settlement) return null;
    const item = auction.item;
    if (item.kind === 'tree') {
      if (item.heirloom) return null;
      s.trees = s.trees.filter((t) => t.id !== item.id);
      if (isMasterpiece(item)) s.stats.masterpieceSold++;
    } else {
      s.weapons = s.weapons.filter((w) => w.id !== item.id);
    }
    s.stats.sold++;
    s.stats.auctions++;
    s.stats.totalEarned += settlement.payout;
    this.addMoney(settlement.payout);
    s.buyers[settlement.buyer.type] = (s.buyers[settlement.buyer.type] || 0) + 1;
    this.addRep(settlement.repGain);
    this.log(`Sold ${itemLabel(item)} to ${settlement.buyer.name} for ${money(settlement.payout)}.`);
    this.sfx('sale');
    this.world.rebuildBonsai();
    this.world.rebuildWeaponRack();
    this.checkQuests();
    this.saveGame();
    this.ui?.refreshHUD();
    return settlement;
  }

  deliverCommission(comId, itemId) {
    const s = this.state;
    const com = s.commissions.find((c) => c.id === comId);
    if (!com) return false;
    const item = itemId ? s.trees.find((t) => t.id === itemId) || s.weapons.find((w) => w.id === itemId) : null;
    if (!item) { this.toast('Choose a finished piece to deliver.', 'warn'); return false; }
    if (item.heirloom) { this.toast('Heirlooms are not for sale.', 'warn'); return false; }
    if (!commissionMatches(com, item)) { this.toast('The piece does not meet the commission.', 'warn'); return false; }
    if (item.kind === 'tree') s.trees = s.trees.filter((t) => t.id !== item.id);
    else s.weapons = s.weapons.filter((w) => w.id !== item.id);
    s.commissions = s.commissions.filter((c) => c.id !== comId);
    s.stats.commissionsDone++;
    s.stats.sold++;
    s.stats.totalEarned += com.reward;
    this.addMoney(com.reward);
    s.buyers[com.buyerType] = (s.buyers[com.buyerType] || 0) + 1;
    this.addRep(com.rep);
    this.toast(`${com.client} accepts your work. +${money(com.reward)}, +${com.rep} reputation.`, 'good');
    this.sfx('sale');
    this.log(`Completed a commission for ${com.client} (${money(com.reward)}).`);
    this.world.rebuildBonsai();
    this.world.rebuildWeaponRack();
    this.checkQuests();
    this.saveGame();
    this.ui?.refreshHUD();
    return true;
  }

  // ————— oni market —————
  openOni() {
    const s = this.state;
    if (!isNight(s.hour)) { this.toast('The gate is sealed until night.', 'warn'); return false; }
    if (s.flags.oniVisitDay !== s.day) {
      s.flags.oniVisitDay = s.day;
      s.stats.oniVisits++;
      this.addRep(6);
      this.log('Entered the Oni night market.');
    }
    if (s.oniStockDay !== s.day || !s.oniStock.length) {
      s.oniStock = this.makeOniStock();
      s.oniStockDay = s.day;
      s.oniLot = this.makeOniLot();
    }
    this.audio?.setMood('oni');
    this.sfx('oni');
    this.ui.openPanel('oni');
    this.checkQuests();
    this.saveGame();
    return true;
  }

  makeOniStock() {
    const s = this.state;
    const pool = [
      { kind: 'seed', key: 'yomi', price: 3600, name: 'Ancient Yomi Maple Seed', jp: '幽玄の種', kanji: '幽', desc: 'A seed that is warm to the touch. Grows a maple from the far side of the mountain.' },
      { kind: 'seed', key: 'spiritPine', price: 4800, name: 'Spirit Pine Seed', jp: '霊松の種', kanji: '霊', desc: 'Needles of faint green light sleep inside this cone.' },
      { kind: 'material', key: 'onisteel', qty: 2, price: 5600, name: 'Enchanted Oni Steel ×2', jp: '鬼鉄', kanji: '鉄', desc: 'Two ingots of metal that drink candlelight.' },
      { kind: 'material', key: 'spiritwood', qty: 3, price: 5200, name: 'Spirit Wood ×3', jp: '霊木', kanji: '木', desc: 'Three lengths of wood that hum when bowed.' },
      { kind: 'material', key: 'folded', qty: 4, price: 2600, name: 'Folded Steel ×4', jp: '折鋼', kanji: '鋼', desc: 'A quiet stock of master-grade steel.' },
      { kind: 'tree', key: 'yomi', price: 12800, name: 'Yomi Maple Sapling', jp: '幽玄紅葉', kanji: '紅', desc: 'Already seven years shaped by a hand no one remembers. Pot-bound in black clay.' },
      { kind: 'tree', key: 'spiritPine', price: 14500, name: 'Spirit Pine Sapling', jp: '霊松', kanji: '松', desc: 'The tree breathes faintly. Its needles are cold.' },
      { kind: 'blueprint', price: 4600, name: 'Forbidden Blueprint', jp: '禁断の図', kanji: '禁', desc: 'A scroll of blackened skin. Unlocks a legendary design.' },
    ];
    const stock = [];
    const count = 4 + Math.floor(Math.random() * 2);
    const used = new Set();
    for (let i = 0; i < count; i++) {
      let entry;
      if (i === 1) {
        const avail = Object.keys(BLUEPRINTS).filter((b) => !s.blueprints.includes(b));
        const bp = avail.length ? pick(avail) : null;
        if (bp) entry = { kind: 'blueprint', key: bp, price: BLUEPRINTS[bp].price, name: BLUEPRINTS[bp].name, jp: '禁断', kanji: '禁', desc: BLUEPRINTS[bp].desc };
      }
      let guard = 0;
      while (!entry && guard++ < 30) {
        const e = pick(pool);
        if (e.kind === 'blueprint') continue;
        if (used.has(e.kind + e.key)) continue;
        entry = { ...e };
        used.add(e.kind + e.key);
      }
      if (!entry) entry = { ...pool[0], id: 'stock' + i };
      stock.push({ ...entry, id: 'stock_' + i + '_' + Math.random().toString(36).slice(2, 5), sold: false });
    }
    return stock;
  }

  makeOniLot() {
    const s = this.state;
    let item;
    const roll = Math.random();
    if (roll < 0.32) {
      const t = createTree('yomi', { name: 'Yomi Masterpiece', age: 8.5, style: 66, health: 88, water: 60, pot: 4, variant: 17 });
      item = t;
    } else if (roll < 0.64) {
      item = createWeapon('oniBlade', { name: 'Crimson Oni Blade', material: 'onisteel', quality: 84 + Math.floor(Math.random() * 12), supernatural: true, legendary: true });
    } else if (roll < 0.82) {
      const t = createTree('spiritPine', { name: 'Whispering Spirit Pine', age: 8, style: 62, health: 90, water: 65, pot: 4, variant: 31 });
      item = t;
    } else {
      item = createWeapon('soulNaginata', { name: 'Soul-Render', material: 'onisteel', quality: 80 + Math.floor(Math.random() * 15), supernatural: true, legendary: true });
    }
    const baseValue = item.kind === 'tree' ? treeValue(item) : weaponValue(item, s.rep);
    const startBid = Math.round(baseValue * 0.32 / 100) * 100;
    const rivalNames = [
      { name: 'Oni Lord Kurogane', kanji: '黒', max: Math.round(baseValue * rand(0.55, 0.82)) },
      { name: 'The Night Fox', kanji: '狐', max: Math.round(baseValue * rand(0.45, 0.7)) },
      { name: 'Horn-Crowned Hannya', kanji: '般若', max: Math.round(baseValue * rand(0.5, 0.75)) },
    ];
    return {
      item, startBid, currentBid: startBid, leader: 'rival', leaderName: 'Oni Lord Kurogane',
      rivals: rivalNames, round: 0, status: 'open', log: [{ who: 'auctioneer', text: 'The gate opens. Who will claim this?' }],
    };
  }

  buyOni(id) {
    const s = this.state;
    const entry = s.oniStock.find((e) => e.id === id);
    if (!entry || entry.sold) return false;
    if (s.money < entry.price) { this.toast('The Oni do not extend credit.', 'warn'); this.sfx('error'); return false; }
    if (entry.kind === 'tree' && s.trees.length >= treeCapacity(s)) { this.toast('No room on your benches. Sell or expand first.', 'warn'); return false; }
    this.addMoney(-entry.price);
    entry.sold = true;
    if (entry.kind === 'seed') {
      s.seeds[entry.key] = (s.seeds[entry.key] || 0) + 1;
    } else if (entry.kind === 'material') {
      s.materials[entry.key] = (s.materials[entry.key] || 0) + (entry.qty || 1);
    } else if (entry.kind === 'blueprint') {
      if (!s.blueprints.includes(entry.key)) s.blueprints.push(entry.key);
    } else if (entry.kind === 'tree') {
      const t = createTree(entry.key, { age: 7, style: 58, pot: 3, health: 90, water: 70 });
      s.trees.push(t);
    }
    this.addRep(5);
    this.toast(`The Oni accept your coin. ${entry.name} is yours.`, 'good');
    this.sfx('oni');
    this.world.rebuildBonsai();
    this.checkQuests();
    this.saveGame();
    this.ui?.refreshHUD();
    return true;
  }

  oniBid() {
    const lot = this.state.oniLot;
    if (!lot || lot.status !== 'open') return { ok: false };
    if (lot.item.kind === 'tree' && this.state.trees.length >= treeCapacity(this.state)) {
      this.toast('No room on your bonsai benches for the lot.', 'warn');
      return { ok: false };
    }
    const inc = Math.max(300, Math.round(lot.currentBid * 0.08 / 50) * 50);
    const next = lot.currentBid + inc;
    if (this.state.money < next) { this.toast('Not enough ryō to raise the bid.', 'warn'); this.sfx('error'); return { ok: false }; }
    lot.currentBid = next;
    lot.leader = 'you';
    lot.leaderName = 'You';
    lot.round++;
    lot.log.push({ who: 'you', text: `You raise to ${money(next)}.` });
    this.sfx('coin');
    const challengers = lot.rivals.filter((r) => r.max > next + 250);
    if (challengers.length && Math.random() < 0.8) {
      const rival = challengers[Math.floor(Math.random() * challengers.length)];
      const counter = Math.min(rival.max, next + Math.round((next * 0.06) / 50) * 50 + 150);
      lot.currentBid = counter;
      lot.leader = 'rival';
      lot.leaderName = rival.name;
      lot.log.push({ who: rival.name, text: `${rival.name} answers with ${money(counter)}.` });
      this.sfx('oni');
      return { ok: true, countered: true };
    }
    // win
    lot.status = 'won';
    lot.leader = 'you';
    lot.leaderName = 'You';
    this.addMoney(-lot.currentBid);
    const item = lot.item;
    if (item.kind === 'tree') this.state.trees.push(item);
    else this.state.weapons.push(item);
    this.addRep(24);
    this.state.stats.legendaryCrafted += item.kind === 'weapon' && item.legendary ? 1 : 0;
    lot.log.push({ who: 'auctioneer', text: 'The hammer falls. The night market falls silent.' });
    this.toast(`You win ${itemLabel(item)} for ${money(lot.currentBid)}.`, 'good');
    this.sfx('success');
    this.world.rebuildBonsai();
    this.world.rebuildWeaponRack();
    this.checkQuests();
    this.saveGame();
    this.ui?.refreshHUD();
    return { ok: true, won: true };
  }

  oniWithdraw() {
    if (this.state.oniLot) {
      this.state.oniLot.status = 'passed';
      this.toast('You step back into the mist. The lot belongs to the night.', 'warn');
      this.saveGame();
    }
  }

  // ————— quests —————
  checkQuests() {
    const s = this.state;
    for (const q of QUESTS) {
      if (s.questsDone.includes(q.id)) continue;
      let done = false;
      switch (q.id) {
        case 'water3': done = s.stats.watered >= 3; break;
        case 'shape': done = s.stats.shaped >= 1; break;
        case 'firstCraft': done = s.stats.crafted >= 1; break;
        case 'firstSale': done = s.stats.sold >= 1; break;
        case 'buySeed': done = s.stats.seedsBought >= 1; break;
        case 'oniVisit': done = s.stats.oniVisits >= 1; break;
        case 'upgrade': done = s.stats.upgraded >= 1; break;
        case 'rep400': done = s.rep >= 400; break;
        case 'masterpiece': done = s.stats.masterpieceSold > 0 || s.trees.some((t) => isMasterpiece(t)); break;
        case 'legendary': done = s.stats.legendaryCrafted > 0; break;
        default: break;
      }
      if (done) {
        s.questsDone.push(q.id);
        s.money += q.reward;
        s.rep += q.rep;
        this.log(`Quest complete: ${q.text}`);
        this.toast(`Completed: ${q.text} — +${money(q.reward)}${q.rep ? `, +${q.rep} reputation` : ''}`, 'good');
        this.sfx('success');
      }
    }
  }

  // ————— offline/state persistence —————
  reset() {
    clearSave();
    location.reload();
  }

  unlockInfo() {
    return {
      capacity: treeCapacity(this.state),
      beauty: beautyOf(this.state),
      wages: dailyWages(this.state),
      visitors: visitorIncome(this.state),
      rank: rankFor(this.state.rep),
      next: nextRank(this.state.rep),
      season: seasonOf(this.state.day),
    };
  }
}
