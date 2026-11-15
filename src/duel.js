/* ═══════════════════════════════════════════════════════════
   WANDLORE · THE DUELLING RING
   Real-time spell combat: projectiles, wards, dodges, statuses.
   ═══════════════════════════════════════════════════════════ */
import * as THREE from 'three';
import { SPELLS } from './data.js';
import { categoryPower } from './crafting.js';
import { createWizard } from './character.js';
import { createArena } from './effects.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const rnd = (a, b) => a + Math.random() * (b - a);
const dist = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

export class Duel {
  constructor(game, effects, audio, callbacks = {}) {
    this.game = game;
    this.effects = effects;
    this.audio = audio;
    this.cb = callbacks;
    this.scene = null;
    this.arena = null;
    this.active = false;
    this.projectiles = [];
    this.enemyProjectiles = [];
    this.summons = [];
    this.cds = {};
    this.combo = 0;
    this.comboTimer = 0;
    this.resultSent = false;
    this.shieldHeld = false;
    this.spellCount = 0;
  }

  dispose() {
    this.active = false;
    this.resultSent = true;
    for (const p of [...this.projectiles, ...this.enemyProjectiles]) this.destroyProjectile(p);
    this.projectiles = [];
    this.enemyProjectiles = [];
    this.summons = [];
    if (this.scene) this.effects.setScene(null);
    this.scene = null;
    this.arena = null;
  }

  start(def, opts = {}) {
    this.dispose();
    this.resultSent = false;
    this.active = true;
    this.def = def;
    this.scene = new THREE.Scene();
    this.arena = createArena(this.scene, def.arena || 'ring');
    this.effects.setScene(this.scene);
    this.cds = {};
    this.projectiles = [];
    this.enemyProjectiles = [];
    this.summons = [];
    this.combo = 0;
    this.comboTimer = 0;
    this.spellCount = 0;
    this.phase = 'intro';
    this.introTime = 2.0;
    this.round = 1;
    this.shieldHeld = false;
    this.shieldVisual = null;
    this.wardTime = 0;
    this.aegisTime = 0;
    this.dodgeTime = 0;
    this.dodgeCd = 0;
    this.shieldHeldTime = 0;
    this.revived = false;
    this.enemyDots = [];
    this.enemyStatus = { stun: 0, slow: 0, silence: 0, fear: 0, wet: 0, lift: 0 };
    this.bossPhase = 1;
    this.castQueue = [];
    this.enemyCast = null;
    this.enemyCastCd = rnd(1.2, 2.2);

    const g = this.game;
    this.maxHp = g.maxHp() + (g.s.upgrades.cauldron ? 20 : 0);
    this.hp = this.maxHp;
    this.maxMp = g.maxMp();
    this.mp = this.maxMp;
    this.wand = g.wand;

    // player wizard
    this.player = createWizard({
      robe: '#2f3560', accent: '#d9b268', hair: '#2b1e1a', hat: true, scale: 1.02,
      name: opts.name || g.s.name, subtitle: g.displayTitle(), nameColor: '#f0d79e'
    });
    const ps = this.arena.playerSpawn;
    this.player.group.position.copy(ps);
    this.player.group.rotation.y = Math.PI;
    this.player.setWand(this.wand);
    this.scene.add(this.player.group);

    // enemy wizard
    const e = def;
    this.enemy = createWizard({
      robe: e.robe, accent: e.accent, hair: '#1c1518', hat: e.behavior !== 'brute',
      crown: e.behavior === 'boss', horns: e.behavior === 'guardian', scale: e.behavior === 'brute' ? 1.5 : e.behavior === 'boss' ? 1.3 : 1.04,
      name: e.name, subtitle: e.title, nameColor: e.accent
    });
    const es = this.arena.enemySpawn;
    this.enemy.group.position.copy(es);
    this.enemy.group.rotation.y = 0;
    this.enemy.setWand({ woodId: e.behavior === 'boss' ? 'voidbriar' : 'blackthorn', coreId: e.behavior === 'boss' ? 'wraithglass' : 'dragon', length: 12, stats: { aether: 40 } });
    this.scene.add(this.enemy.group);

    this.enemyHp = e.hp;
    this.enemyMaxHp = e.hp;
    this.playerPos = this.player.group.position;
    this.enemyPos = this.enemy.group.position;

    // intro fx
    this.arena.update(0, 0);
    this.effects.runeCircle(new THREE.Vector3(ps.x, 0.05, ps.z), '#e9c988', 3, 1.6);
    this.effects.runeCircle(new THREE.Vector3(es.x, 0.05, es.z), e.accent, 3, 1.6);
    this.effects.ring(new THREE.Vector3(0, 0.06, 0), '#e9c988', 16, 1.1);
    this.audio.duelStart?.();
    this.cb.onHud?.({ enemyName: e.name, enemyRank: e.boss ? 'BOSS DUEL' : e.rank.toUpperCase(), round: 1, hp: this.hp, mp: this.mp, enemyHp: this.enemyHp, enemyMax: this.enemyMaxHp, casting: false });
    this.cb.onLog?.(`<b>${e.name}</b> steps into the circle.`, 'spell');
    this.cb.onStart?.(this);
    return this;
  }

  trait(name) {
    return this.wand?.trait?.key === 'recipe' && this.wand.recipe?.name === name;
  }

  get cdMultiplier() {
    let m = 1;
    if (this.trait('Astral Sovereign')) m *= 0.8;
    if (this.wand?.coreId === 'moonstoneheart') m *= 0.85;
    if (this.wand?.coreId === 'augurey' && this.trait('Oracle’s Sigh')) m *= 0.85;
    return m;
  }

  manaCost(spell) {
    let m = spell.mana;
    const core = this.wand?.coreId;
    if (core === 'dragon' && spell.cat === 'offense') m *= 1.1;
    if (core === 'unicorn' && spell.cat === 'forbidden') m *= 1.15;
    if (core === 'wraithglass') m *= 0.9;
    if (this.trait('Nightfall') && spell.cat === 'forbidden') m *= 0.7;
    return Math.round(m);
  }

  cast(index) {
    if (!this.active || this.phase !== 'fight') return;
    const spellId = this.game.s.loadout[index];
    if (!spellId) return;
    const spell = SPELLS.find(x => x.id === spellId);
    if (!spell) return;
    if ((this.cds[spell.id] || 0) > 0) return;
    const cost = this.manaCost(spell);
    if (this.mp < cost) { this.cb.onToast?.('Not enough mana', 'The wand sputters. Let it breathe.', '#78b4ff', '✦'); return; }
    this.mp -= cost;
    this.cds[spell.id] = spell.cd * this.cdMultiplier;
    this.game.addMastery(spell.id, spell.cat === 'forbidden' ? 0.5 : 0.7);
    this.spellCount++;
    const mastery = this.game.masteryRank(spell.id).mult;
    const power = categoryPower(this.wand, spell.cat);
    let dmg = Math.max(1, spell.dmg) * power * mastery * rnd(0.92, 1.08);
    if (this.wand?.coreId === 'dragon' && spell.cat === 'offense') dmg *= 1.15;
    if (this.wand?.coreId === 'unicorn' && spell.cat === 'healing') dmg *= 1.2;
    if (this.trait('Nightfall') && spell.cat === 'forbidden') dmg *= 1.25;
    if (this.trait('Nightfall') && spell.cat === 'healing') dmg *= 0.5;
    const critChance = 0.07 + (this.wand?.stats.ctrl || 0) / 520;
    const crit = Math.random() < critChance;
    if (crit) dmg *= 1.55;

    this.player.cast();
    this.effects.castSpark(this.player.getTipWorld(), spell.color);
    this.audio.cast?.(spell.cat);
    this.cb.onLog?.(`You cast <b>${spell.name}</b>${crit ? ' — a perfect gesture!' : ''}`, 'spell');

    const tip = this.player.getTipWorld();
    const target = new THREE.Vector3(this.enemyPos.x, 1.15, this.enemyPos.z);

    switch (spell.effect) {
      case 'projectile': {
        this.spawnPlayerProjectile(tip, target, spell, dmg, crit, { status: spell.status, statusTime: spell.statusTime, knock: spell.knock });
        break;
      }
      case 'aoe_bolt': {
        this.spawnPlayerProjectile(tip, target, spell, dmg, crit, { status: spell.status, statusTime: spell.statusTime, radius: spell.radius || 3.5 });
        break;
      }
      case 'beam': {
        this.effects.beam(tip, target, spell.color, 0.16, 0.4);
        this.effects.burst(target, spell.color, 16, { speed: 4, size: 0.4 });
        this.hitEnemy(dmg, crit, spell, { knock: spell.knock });
        break;
      }
      case 'chain': {
        const pts = [tip, new THREE.Vector3(this.enemyPos.x + rnd(-0.4, 0.4), 1.4, this.enemyPos.z + rnd(-0.4, 0.4))];
        this.effects.lightning(pts, spell.color, 0.45);
        this.hitEnemy(dmg, crit, spell);
        if (this.trait('Stormcaller') || this.wand?.coreId === 'thunderbird') {
          setTimeout(() => { if (this.active) this.hitEnemy(dmg * 0.3, false, spell); }, 220);
        }
        break;
      }
      case 'burst': {
        this.effects.ring(new THREE.Vector3(this.playerPos.x, 0.06, this.playerPos.z), spell.color, spell.radius || 5, 0.7);
        this.effects.burst(new THREE.Vector3(this.playerPos.x, 1.2, this.playerPos.z), spell.color, 32, { speed: 8, size: 0.55 });
        if (dist(this.playerPos, this.enemyPos) <= (spell.radius || 5)) this.hitEnemy(dmg, crit, spell, { status: spell.status, statusTime: spell.statusTime });
        this.effects.shake(0.3);
        break;
      }
      case 'aoe_self': {
        this.effects.ring(new THREE.Vector3(this.playerPos.x, 0.06, this.playerPos.z), spell.color, spell.radius || 7, 0.9);
        this.effects.burst(new THREE.Vector3(this.playerPos.x, 1.4, this.playerPos.z), spell.color, 40, { speed: 9, size: 0.7, flash: 6 });
        this.effects.shake(0.6);
        if (dist(this.playerPos, this.enemyPos) <= (spell.radius || 7)) this.hitEnemy(dmg, crit, spell, { status: 'burn', statusTime: 4 });
        break;
      }
      case 'buff': {
        if (spell.buff === 'ward') {
          this.wardTime = spell.time;
          this.effects.runeCircle(new THREE.Vector3(this.playerPos.x, 0.05, this.playerPos.z), spell.color, 2.4, 0.8);
          this.cb.onLog?.('A ward settles over you.', 'good');
        } else {
          this.aegisTime = spell.time;
          this.effects.aegisPulse(new THREE.Vector3(this.playerPos.x, 0.05, this.playerPos.z), spell.color, 3.6);
          this.cb.onLog?.('Aegis raised — projectiles will break on it.', 'good');
        }
        break;
      }
      case 'heal':
      case 'hot': {
        const heal = spell.effect === 'heal' ? dmg : dmg;
        if (spell.effect === 'heal') this.healPlayer(heal);
        else {
          this.healPlayer(heal * 0.35);
          this.hotTime = spell.time;
          this.hotRate = (heal * 0.65) / spell.time;
        }
        this.effects.heal(new THREE.Vector3(this.playerPos.x, 0.1, this.playerPos.z), spell.color);
        this.audio.heal?.();
        if (this.trait('Tidecaller') || this.wand?.coreId === 'coral') {
          this.wardTime = Math.max(this.wardTime, 3);
          this.effects.ring(new THREE.Vector3(this.playerPos.x, 0.06, this.playerPos.z), '#8ef0b0', 2.2, 0.7);
        }
        break;
      }
      case 'summon': {
        this.effects.summon(new THREE.Vector3(this.playerPos.x + 1.2, 0.05, this.playerPos.z), spell.color);
        this.summons.push({ time: spell.time, tick: 0, dmg: 7 * power * mastery, color: spell.color });
        this.cb.onLog?.('A spectral serpent coils at your feet.', 'good');
        break;
      }
      default: break;
    }

    // Starfall: every fifth spell calls a meteor
    if (this.trait('Astral Sovereign') && this.spellCount % 5 === 0) {
      this.effects.meteor(target.clone(), '#b48cff', () => {
        if (this.active && this.enemyHp > 0) this.hitEnemy(40 * power, true, spell, { status: 'burn', statusTime: 3 });
      });
      this.cb.onLog?.('The wand remembers the sky. A meteor answers.', 'spell');
    }

    this.cb.onHud?.({ hp: this.hp, mp: this.mp });
  }

  spawnPlayerProjectile(from, to, spell, dmg, crit, opts = {}) {
    const orb = this.effects.createOrb(spell.color, 0.17);
    orb.group.position.copy(from);
    const dir = new THREE.Vector3().subVectors(to, from).normalize();
    const speed = spell.effect === 'aoe_bolt' ? 20 : 26;
    const vel = dir.multiplyScalar(speed);
    this.projectiles.push({ orb, vel, dmg, crit, spell, opts, life: 2.2, radius: opts.radius });
  }

  spawnEnemyProjectile(from, target, spell, dmg, opts = {}) {
    const color = opts.color || spell?.color || '#ff6b7a';
    const orb = this.effects.createOrb(color, opts.size || 0.16);
    orb.group.position.copy(from);
    const dir = new THREE.Vector3().subVectors(target, from).normalize();
    dir.x += rnd(-0.03, 0.03); dir.z += rnd(-0.03, 0.03);
    this.enemyProjectiles.push({ orb, vel: dir.multiplyScalar(opts.speed || 15), dmg, life: 4, color });
  }

  destroyProjectile(p) {
    this.effects.removeOrb(p.orb);
  }

  hitEnemy(dmg, crit, spell, opts = {}) {
    if (this.enemyHp <= 0) return;
    let final = dmg;
    // boss damage reduction in later phases
    if (this.def.behavior === 'boss' && this.bossPhase > 1) final *= 0.92;
    this.enemyHp = Math.max(0, this.enemyHp - final);
    this.combo++;
    this.comboTimer = 3;
    this.enemy.flash();
    this.audio.hit?.();
    this.effects.shake(crit ? 0.34 : 0.14);
    this.cb.onDamage?.(new THREE.Vector3(this.enemyPos.x, 1.6, this.enemyPos.z), Math.round(final), crit ? 'crit' : '');
    this.cb.onHud?.({ enemyHp: this.enemyHp, combo: this.combo });
    if (opts.status) this.applyStatus(opts.status, opts.statusTime || 3);
    if (this.wand?.coreId === 'basilisk' && spell?.cat === 'forbidden') this.applyStatus('poison', 4);
    if (this.trait("Serpent's Kiss") && spell?.cat === 'forbidden') this.applyStatus('poison', 5);
    if (this.trait('Sunforged') && spell?.cat === 'elemental') this.healPlayer(final * 0.15, true);
    if (this.enemyHp <= 0) this.finishVictory();
  }

  applyStatus(type, time) {
    const st = this.enemyStatus;
    if (type === 'stun' || type === 'lift') { st.stun = Math.max(st.stun, time); this.cb.onLog?.(`${this.def.name} is ${type === 'lift' ? 'hoisted into the air' : 'stunned'}.`, 'good'); }
    if (type === 'slow') { st.slow = Math.max(st.slow, time); this.cb.onLog?.(`${this.def.name} slows.`, 'good'); }
    if (type === 'silence' || type === 'disarm') { st.silence = Math.max(st.silence, time); this.cb.onLog?.(`${this.def.name} cannot cast.`, 'good'); }
    if (type === 'fear') { st.fear = Math.max(st.fear, time); this.cb.onLog?.(`${this.def.name} recoils from the silver light.`, 'good'); }
    if (type === 'wet') st.wet = Math.max(st.wet, time);
    if (type === 'burn') this.enemyDots.push({ type: 'burn', time, dps: 5 + this.wand.stats.aether * 0.06 });
    if (type === 'bleed') this.enemyDots.push({ type: 'bleed', time, dps: 7 });
    if (type === 'poison') this.enemyDots.push({ type: 'poison', time, dps: 6 });
  }

  healPlayer(amount, silent = false) {
    const before = this.hp;
    this.hp = Math.min(this.maxHp, this.hp + amount);
    if (!silent) this.cb.onDamage?.(new THREE.Vector3(this.playerPos.x, 2.2, this.playerPos.z), Math.round(this.hp - before), 'heal');
    this.cb.onHud?.({ hp: this.hp });
  }

  takeDamage(dmg, fromPos, opts = {}) {
    if (!this.active || this.phase !== 'fight' || this.resultSent) return;
    if (this.dodgeTime > 0) {
      this.cb.onLog?.('You slip aside — the spell finds only air.', 'good');
      return;
    }
    let amount = dmg;
    if (this.shieldHeld && this.mp > 0) amount *= (this.wand?.coreId === 'chimaera' ? 0.36 : 0.45);
    if (this.wardTime > 0) amount *= 0.6;
    if (this.aegisTime > 0) amount *= 0.7;
    if (this.trait('Hearthward') && this.hp < this.maxHp * 0.3) amount *= 0.75;
    if (this.trait('Mirrormere') && fromPos) {
      const reflect = amount * 0.25;
      setTimeout(() => { if (this.active && this.enemyHp > 0) this.hitEnemy(reflect, false, null); }, 120);
    }
    this.hp = Math.max(0, this.hp - amount);
    this.combo = 0;
    this.cb.onHud?.({ hp: this.hp, mp: this.mp, combo: 0 });
    this.cb.onDamage?.(new THREE.Vector3(this.playerPos.x, 2.1, this.playerPos.z), Math.round(amount), 'enemy');
    this.player.flash();
    this.effects.shake(0.42);
    this.effects.burst(new THREE.Vector3(this.playerPos.x, 1.1, this.playerPos.z), '#ff8a9a', 14, { speed: 3.5, size: 0.4 });
    this.audio.hit?.();
    this.cb.onLog?.(`<b>${this.def.name}</b> strikes you for ${Math.round(amount)}.`, 'dmg');
    this.cb.onHudFlash?.();
    if (this.hp <= 0) this.checkDefeat();
  }

  checkDefeat() {
    if (this.trait('Emberheart') && !this.revived) { this.revive('Emberheart'); return; }
    if (this.wand?.coreId === 'phoenix' && !this.revived) { this.revive('phoenix'); return; }
    if (this.trait('Mirrormere') && !this.revived && Math.random() < 0.35) { this.revive('mirror'); return; }
    this.phase = 'lost';
    this.audio.defeat?.();
    this.cb.onLog?.('Your wand falls from your hand.', 'dmg');
    this.player.group.rotation.z = 0.9;
    setTimeout(() => this.finishDefeat(), 1400);
  }

  revive(kind) {
    this.revived = true;
    this.hp = Math.round(this.maxHp * 0.3);
    this.wardTime = 2;
    this.cb.onHud?.({ hp: this.hp });
    this.cb.onLog?.('The wand refuses. You rise again.', 'good');
    this.cb.onToast?.('Ashes to dawn', 'Your wand pulls you back from the dark.', '#ffbd5e', '✦');
    this.effects.ring(new THREE.Vector3(this.playerPos.x, 0.06, this.playerPos.z), '#ffbd5e', 6, 0.9);
    this.effects.burst(new THREE.Vector3(this.playerPos.x, 1.2, this.playerPos.z), '#ffbd5e', 40, { speed: 8, size: 0.7, flash: 6 });
    this.audio.levelup?.();
    if (kind === 'Emberheart') {
      setTimeout(() => { if (this.active && this.enemyHp > 0) this.hitEnemy(28, true, null); }, 300);
    }
  }

  finishVictory() {
    if (this.resultSent) return;
    this.resultSent = true;
    this.phase = 'won';
    this.enemy.group.rotation.z = -0.9;
    this.enemy.group.position.y = 0.2;
    this.effects.ring(new THREE.Vector3(this.enemyPos.x, 0.06, this.enemyPos.z), '#e9c988', 5, 1);
    this.effects.burst(new THREE.Vector3(this.enemyPos.x, 1.3, this.enemyPos.z), this.def.accent, 50, { speed: 8, size: 0.7, flash: 7 });
    this.audio.victory?.();
    this.cb.onLog?.(`<b>${this.def.name}</b> yields. The circle is yours.`, 'good');
    this.cb.onHud?.({ enemyHp: 0 });
    setTimeout(() => {
      if (this.active) this.cb.onEnd?.({ won: true, enemy: this.def, rounds: this.round, hpLeft: this.hp });
    }, 1500);
  }

  finishDefeat() {
    if (this.resultSent) return;
    this.resultSent = true;
    this.cb.onEnd?.({ won: false, enemy: this.def, hpLeft: 0 });
  }

  dodge() {
    if (!this.active || this.phase !== 'fight' || this.dodgeCd > 0) return;
    this.dodgeCd = 1.15;
    this.dodgeTime = 0.32;
    this.invuln = 0.42;
    this.audio.noise?.({ dur: 0.2, vol: 0.08, freq: 700, slide: 700 });
    this.effects.castSpark(new THREE.Vector3(this.playerPos.x, 0.5, this.playerPos.z), '#c9d8ff');
    this.cb.onLog?.('You dodge.', 'good');
  }

  enemyCastSpell() {
    if (!this.def.spells?.length) return;
    const spellId = this.def.spells[Math.floor(Math.random() * this.def.spells.length)];
    const spell = SPELLS.find(s => s.id === spellId) || SPELLS[0];
    const tip = this.enemy.getTipWorld();
    const target = new THREE.Vector3(this.playerPos.x, 1.0, this.playerPos.z);
    const dmg = (this.def.dmg || 10) * (spell.dmg ? clamp(spell.dmg / 26, 0.7, 1.6) : 1) * (this.bossPhase > 1 ? 1.15 : 1);
    this.enemy.cast();
    this.effects.castSpark(tip, spell.color);
    this.audio.cast?.(spell.cat);
    this.cb.onLog?.(`<b>${this.def.name}</b> casts ${spell.name}.`, 'dmg');
    const shots = this.def.behavior === 'boss' ? (this.bossPhase > 1 ? 2 : 1) : 1;
    for (let i = 0; i < shots; i++) {
      setTimeout(() => {
        if (!this.active || this.phase !== 'fight') return;
        const from = this.enemy.getTipWorld();
        this.spawnEnemyProjectile(from, new THREE.Vector3(this.playerPos.x + rnd(-1.2, 1.2), 1.0, this.playerPos.z + rnd(-1.2, 1.2)), spell, dmg);
      }, i * 180);
    }
    if (this.def.behavior === 'brute') {
      const targetPos = this.playerPos.clone();
      this.effects.ring(new THREE.Vector3(targetPos.x, 0.06, targetPos.z), '#96c46b', 4, 0.6);
      if (dist(this.playerPos, this.enemyPos) < 6) setTimeout(() => this.takeDamage(dmg * 1.3, this.enemyPos), 700);
    }
  }

  update(dt, input = {}) {
    if (!this.active) return;
    const t = performance.now() / 1000;
    this.arena.update(dt, t);
    this.effects.update(dt);

    // timers
    for (const k of Object.keys(this.cds)) this.cds[k] = Math.max(0, this.cds[k] - dt);
    this.comboTimer = Math.max(0, this.comboTimer - dt);
    if (this.comboTimer === 0 && this.combo) { this.combo = 0; this.cb.onHud?.({ combo: 0 }); }
    this.dodgeCd = Math.max(0, this.dodgeCd - dt);
    this.dodgeTime = Math.max(0, this.dodgeTime - dt);
    this.wardTime = Math.max(0, this.wardTime - dt);
    this.aegisTime = Math.max(0, this.aegisTime - dt);
    if (this.hotTime > 0) {
      this.hotTime -= dt;
      this.healPlayer(this.hotRate * dt, true);
      this.cb.onHud?.({ hp: this.hp });
    }

    // shield drain
    const shieldActive = input.shield && this.mp > 0;
    this.shieldHeld = shieldActive;
    if (shieldActive) {
      this.mp = Math.max(0, this.mp - 9 * dt);
      this.cb.onHud?.({ mp: this.mp });
    }
    this.updateShieldVisual(shieldActive);

    if (this.phase === 'intro') {
      this.introTime -= dt;
      this.player.update(dt, false);
      this.enemy.update(dt, false);
      if (this.introTime <= 0.7 && !this._saidFight) { this._saidFight = true; this.cb.onLog?.('Wands up.', 'spell'); }
      if (this.introTime <= 0) {
        this.phase = 'fight';
        this.cb.onLog?.('The duel begins.', 'spell');
        this.cb.onIntroEnd?.();
      }
      this.cb.onHud?.({ hp: this.hp, mp: this.mp, enemyHp: this.enemyHp, combo: this.combo });
      return;
    }
    if (this.phase !== 'fight') {
      this.player.update(dt, false);
      this.enemy.update(dt, false);
      return;
    }

    // player movement
    const speed = this.dodgeTime > 0 ? 11.5 : 5.6;
    let vx = input.moveX || 0, vz = input.moveZ || 0;
    const mag = Math.hypot(vx, vz);
    if (mag > 0.001) { vx = vx / mag; vz = vz / mag; }
    this.playerPos.x += vx * speed * dt;
    this.playerPos.z += vz * speed * dt;
    this.arena.clamp(this.playerPos);
    this.playerPos.y = 0;
    const toEnemy = new THREE.Vector3(this.enemyPos.x - this.playerPos.x, 0, this.enemyPos.z - this.playerPos.z);
    if (mag > 0.001) this.player.group.rotation.y = Math.atan2(vx, vz);
    else this.player.group.rotation.y = Math.atan2(toEnemy.x, toEnemy.z);
    this.player.update(dt, mag > 0.01, this.dodgeTime > 0 ? 1.7 : 1);
    if (this.dodgeTime > 0) this.effects.castSpark(new THREE.Vector3(this.playerPos.x, 0.35, this.playerPos.z), '#8ea8ff');

    // enemy AI
    this.updateEnemy(dt, toEnemy);

    // projectiles
    this.updateProjectiles(dt);
    // summons
    for (const s of this.summons) {
      s.time -= dt;
      s.tick -= dt;
      if (s.tick <= 0) {
        s.tick = 0.85;
        s.visual?.update?.(0);
        if (this.enemyHp > 0) {
          this.hitEnemy(s.dmg, false, null);
          this.effects.burst(new THREE.Vector3(this.enemyPos.x, 0.9, this.enemyPos.z), s.color, 7, { speed: 2.5, size: 0.3, ttl: 0.4 });
        }
      }
    }
    this.summons = this.summons.filter(s => s.time > 0);

    // statuses
    this.enemyStatus.stun = Math.max(0, this.enemyStatus.stun - dt);
    this.enemyStatus.slow = Math.max(0, this.enemyStatus.slow - dt);
    this.enemyStatus.silence = Math.max(0, this.enemyStatus.silence - dt);
    this.enemyStatus.fear = Math.max(0, this.enemyStatus.fear - dt);
    for (const dot of this.enemyDots) {
      dot.time -= dt;
      if (dot.tick === undefined) dot.tick = 0;
      dot.tick -= dt;
      if (dot.tick <= 0) {
        dot.tick = 0.5;
        this.enemyHp = Math.max(0, this.enemyHp - dot.dps * 0.5);
        this.cb.onHud?.({ enemyHp: this.enemyHp });
        this.effects.burst(new THREE.Vector3(this.enemyPos.x + rnd(-0.3, 0.3), 1.2, this.enemyPos.z + rnd(-0.3, 0.3)), dot.type === 'burn' ? '#ff9a3d' : dot.type === 'poison' ? '#6effa0' : '#ff6f9f', 3, { speed: 1.5, size: 0.25, ttl: 0.4 });
        if (this.enemyHp <= 0) this.finishVictory();
      }
    }
    this.enemyDots = this.enemyDots.filter(d => d.time > 0);

    // boss phases
    if (this.def.behavior === 'boss' && this.bossPhase === 1 && this.enemyHp < this.enemyMaxHp * 0.55) {
      this.bossPhase = 2;
      this.cb.onLog?.('The air turns to smoke. <b>Something older</b> looks out from behind his eyes.', 'dmg');
      this.cb.onToast?.('Phase two', 'The Hollow stops pretending.', '#d65cff', '☾');
      this.effects.shake(0.9);
      this.effects.ring(new THREE.Vector3(this.enemyPos.x, 0.06, this.enemyPos.z), '#d65cff', 12, 1.2);
    }

    this.cb.onHud?.({ hp: this.hp, mp: this.mp, enemyHp: this.enemyHp, casting: !!this.enemyCast, castColor: this.enemyCast?.color, combo: this.combo });
  }

  updateShieldVisual(on) {
    if (on && !this.shieldVisual) {
      const w = this.effects.ward(this.player.group, '#8fd0ff', 1.05);
      this.shieldVisual = w;
      this.audio.shield?.();
    } else if (!on && this.shieldVisual) {
      this.shieldVisual.remove();
      this.shieldVisual = null;
    }
    if (this.shieldVisual) this.shieldVisual.mat.uniforms.opacity.value = 0.55 + Math.sin(performance.now() / 120) * 0.12;
  }

  updateEnemy(dt, toEnemy) {
    const e = this.def;
    const distToPlayer = toEnemy.length();
    const behavior = e.behavior;
    const statusSlow = this.enemyStatus.slow > 0 ? 0.45 : 1;
    const stunned = this.enemyStatus.stun > 0 || this.enemyStatus.fear > 0;
    const silenced = this.enemyStatus.silence > 0;
    const eSpeed = (e.speed || 2.5) * statusSlow;

    let desired = 7;
    if (behavior === 'brute') desired = 2.5;
    if (behavior === 'caster') desired = 12;
    if (behavior === 'guardian') desired = 8;
    if (behavior === 'boss') desired = 9;
    if (behavior === 'dummy') desired = 99;

    let mx = 0, mz = 0;
    if (!stunned && behavior !== 'dummy') {
      const nx = toEnemy.x / (distToPlayer || 1), nz = toEnemy.z / (distToPlayer || 1);
      if (distToPlayer > desired + 1) { mx = nx; mz = nz; }
      else if (distToPlayer < desired - 1) { mx = -nx; mz = -nz; }
      // strafe
      const strafe = Math.sin(performance.now() / 1300 + (e.id.charCodeAt(0) || 0)) * (behavior === 'duelist' || behavior === 'master' ? 1 : 0.35);
      mx += -nz * strafe; mz += nx * strafe;
      const ml = Math.hypot(mx, mz) || 1;
      this.enemyPos.x += (mx / ml) * eSpeed * dt;
      this.enemyPos.z += (mz / ml) * eSpeed * dt;
      this.arena.clamp(this.enemyPos);
      // don't overlap player
      if (dist(this.enemyPos, this.playerPos) < 1.8) {
        const a = Math.atan2(this.enemyPos.z - this.playerPos.z, this.enemyPos.x - this.playerPos.x);
        this.enemyPos.x = this.playerPos.x + Math.cos(a) * 1.8;
        this.enemyPos.z = this.playerPos.z + Math.sin(a) * 1.8;
      }
    }
    // face player
    const ang = Math.atan2(this.playerPos.x - this.enemyPos.x, this.playerPos.z - this.enemyPos.z);
    this.enemy.group.rotation.y = ang + (this.enemyStatus.fear > 0 ? Math.sin(performance.now() / 90) * 0.3 : 0);
    this.enemy.update(dt, Math.hypot(mx, mz) > 0.1, behavior === 'master' ? 1.3 : 1);

    // casting
    if (this.enemyCast) {
      this.enemyCast.time -= dt;
      if (this.enemyCast.time <= 0) {
        this.enemyCast = null;
        if (!silenced && this.enemyHp > 0) this.enemyCastSpell();
      }
      return;
    }
    if (stunned || silenced || behavior === 'dummy' || behavior === 'brute') {
      if (behavior === 'brute' && !stunned && distToPlayer < 3.2 && Math.random() < dt * 1.2) {
        this.enemy.cast();
        this.effects.ring(new THREE.Vector3(this.playerPos.x, 0.06, this.playerPos.z), '#96c46b', 3.4, 0.5);
        this.takeDamage((e.dmg || 12) * 1.2, this.enemyPos);
        this.cb.onLog?.(`<b>${e.name}</b> slams the ground.`, 'dmg');
      }
      return;
    }
    this.enemyCastCd -= dt * (this.bossPhase > 1 ? 1.45 : 1);
    if (this.enemyCastCd <= 0 && distToPlayer < 26) {
      const spellId = e.spells[Math.floor(Math.random() * e.spells.length)];
      const spell = SPELLS.find(s => s.id === spellId);
      this.enemyCast = { time: behavior === 'boss' ? 0.62 : behavior === 'master' ? 0.7 : 0.9, color: spell?.color };
      this.enemyCastCd = rnd(1.6, 2.9) + (behavior === 'master' ? -0.4 : 0) + (this.bossPhase > 1 ? -0.5 : 0);
      this.cb.onHud?.({ casting: true, castColor: spell?.color });
      this.cb.onLog?.(`<b>${e.name}</b> raises a wand…`, 'dmg');
    }
  }

  updateProjectiles(dt) {
    const enemyCenter = new THREE.Vector3(this.enemyPos.x, 1.1, this.enemyPos.z);
    const playerCenter = new THREE.Vector3(this.playerPos.x, 1.0, this.playerPos.z);
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.life -= dt;
      p.orb.group.position.addScaledVector(p.vel, dt);
      const d = p.orb.group.position.distanceTo(enemyCenter);
      if (d < 1.15 || p.life <= 0) {
        if (d < 1.6) {
          this.effects.burst(p.orb.group.position.clone(), p.spell.color, p.opts.radius ? 26 : 14, { speed: p.opts.radius ? 6 : 3.4, size: p.opts.radius ? 0.55 : 0.4 });
          if (p.opts.radius) {
            this.effects.ring(new THREE.Vector3(this.enemyPos.x, 0.06, this.enemyPos.z), p.spell.color, p.opts.radius, 0.6);
            this.effects.shake(0.3);
          }
          this.hitEnemy(p.dmg, p.crit, p.spell, { status: p.opts.status, statusTime: p.opts.statusTime });
          if (p.opts.knock) {
            const a = Math.atan2(this.enemyPos.z - this.playerPos.z, this.enemyPos.x - this.playerPos.x);
            this.enemyPos.x += Math.cos(a) * 0.6; this.enemyPos.z += Math.sin(a) * 0.6;
          }
        }
        this.destroyProjectile(p);
        this.projectiles.splice(i, 1);
      }
    }
    for (let i = this.enemyProjectiles.length - 1; i >= 0; i--) {
      const p = this.enemyProjectiles[i];
      p.life -= dt;
      p.orb.group.position.addScaledVector(p.vel, dt);
      const d = p.orb.group.position.distanceTo(playerCenter);
      if (d < 1.0 || p.life <= 0) {
        if (d < 1.5) {
          // shield reflect
          if (this.shieldHeld && this.mp > 0) {
            this.effects.burst(p.orb.group.position.clone(), '#8fd0ff', 14, { speed: 4, size: 0.4 });
            this.audio.shield?.();
            const tip = this.player.getTipWorld();
            this.spawnPlayerProjectile(tip, new THREE.Vector3(this.enemyPos.x, 1.1, this.enemyPos.z), { color: '#8fd0ff', effect: 'projectile' }, p.dmg * 0.5, false, {});
            this.mp = Math.max(0, this.mp - 4);
          } else {
            this.takeDamage(p.dmg, p.orb.group.position.clone());
            this.effects.burst(p.orb.group.position.clone(), p.color, 14, { speed: 3.5, size: 0.4 });
          }
        }
        this.destroyProjectile(p);
        this.enemyProjectiles.splice(i, 1);
      }
    }
  }

  get state() {
    return { hp: this.hp, mp: this.mp, maxHp: this.maxHp, maxMp: this.maxMp, enemyHp: this.enemyHp, cds: this.cds };
  }
}
