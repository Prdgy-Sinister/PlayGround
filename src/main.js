/* ═══════════════════════════════════════════════════════════
   WANDLORE · MAIN
   Boots the vale, binds the grimoire to the world, and runs
   the two loops that matter: walking, and duelling.
   ═══════════════════════════════════════════════════════════ */
import * as THREE from 'three';
import { game } from './game.js';
import { createWorld } from './world.js';
import { Effects } from './effects.js';
import { createWizard, createWisp } from './character.js';
import { Ui } from './ui.js';
import { Audio as AudioEngine } from './audio.js';
import { Duel } from './duel.js';
import {
  SPELLS, ENEMIES, TOURNAMENTS, CATEGORIES, ZONES, MATERIALS, WOODS, CORES, LORE
} from './data.js';

const $ = id => document.getElementById(id);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const damp = (a, b, lambda, dt) => a + (b - a) * (1 - Math.exp(-lambda * dt));
const hash = (x, z) => Math.sin(x * 12.9898 + z * 78.233) * 43758.5453 % 1;

const ZONE_SPAWNS = {
  village: { x: 0, z: 43 },
  academy: { x: -64, z: -16 },
  forest: { x: 47, z: -27 },
  lake: { x: 43, z: 71 },
  ruins: { x: -72, z: 76 },
  caverns: { x: 99, z: 62 },
  crag: { x: 108, z: -80 },
  spire: { x: 0, z: -110 }
};

class Wandlore {
  constructor() {
    this.started = false;
    this.loaded = false;
    this.game = game;
    this.pendingFloats = [];
    this.keys = new Set();
    this.mouse = { down: false, moved: 0, lastX: 0, lastY: 0 };
    this.yaw = 0.22;
    this.pitch = 0.18;
    this.camDist = 8.6;
    this.camPos = new THREE.Vector3();
    this.lookAt = new THREE.Vector3();
    this.playerPos = new THREE.Vector3();
    this.activeSpellIndex = 0;
    this.worldCds = {};
    this.worldBolts = [];
    this.tournament = null;
    this.duel = null;
    this.lastZone = null;
    this.minimapClock = 0;
    this.refreshClock = 0;
    this.refreshPending = false;
    this.clock = 0;
    this.setupRenderer();
    this.setupWorld();
    this.setupGame();
    this.setupInput();
    this.setupFrame();
  }

  /* ── RENDERER ─────────────────────────────────────────────── */
  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: $('scene'), antialias: true, alpha: false, powerPreference: 'high-performance'
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.04;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.camera = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 620);
    this.scene = new THREE.Scene();
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  /* ── WORLD ────────────────────────────────────────────────── */
  setupWorld() {
    this.world = createWorld(this.scene);
    this.effects = new Effects(this.scene);
    this.wisp = createWisp('#9fe7ff');
    this.wisp.group.visible = false;
    this.scene.add(this.wisp.group);
    this.titleCamT = 0;
  }

  /* ── GAME / UI ────────────────────────────────────────────── */
  setupGame() {
    this.audio = new AudioEngine();
    this.ui = new Ui(game, this.audio);
    this.duel = new Duel(game, this.effects, this.audio, this.duelCallbacks());
    this.ui.actions = {
      sfx: name => { if (name === 'ui') this.audio.ui(); },
      cast: i => this.selectAndCast(i),
      travel: id => this.travelTo(id),
      startDuel: id => this.startDuel(id),
      startTournament: id => this.startTournament(id),
      onPanelOpen: () => this.onOverlay(true),
      onPanelClose: () => this.onOverlay(false),
      onModal: open => this.onOverlay(open),
      onDialogue: open => this.onOverlay(open)
    };
    this.bindGameEvents();
    this.bindTitle();
    this.refreshClock = 0;
    this.timer = setInterval(() => this.autosave(), 30000);
    document.addEventListener('visibilitychange', () => { if (document.hidden && this.started) this.autosave(); });
    window.addEventListener('beforeunload', () => { if (this.started) this.autosave(); });
  }

  bindGameEvents() {
    game.on('change', () => { this.refreshPending = true; });
    game.on('levelup', ({ level, title }) => {
      this.audio.levelup();
      this.ui.levelFlash(level, title);
      this.ui.toast('Level ' + level, title, '#e9c988', '✦');
      this.refreshPending = true;
    });
    game.on('spelllearned', spell => {
      if (!spell) return;
      this.ui.spellBanner(spell);
      this.ui.toast(spell.name, `${CATEGORIES[spell.cat].name} magic added to your grimoire.`, CATEGORIES[spell.cat].color, spell.rune);
    });
    game.on('questcomplete', q => {
      this.audio.victory();
      this.ui.objective(q.objective);
      this.ui.toast('Quest complete', `${q.name} — ◉ ${q.rewards.gold} · ✧ ${q.rewards.rep} reputation`, '#e9c988', '❖');
    });
    game.on('achievement', a => {
      this.ui.toast('Field note', `${a.icon} ${a.name} — ${a.desc}`, '#c79bff', a.icon);
    });
    game.on('toast', data => {
      if (data?.title) this.ui.toast(data.title, data.text || '', '#e9c988', '✦');
    });
    game.on('saved', () => {
      const el = this.ui.dom.autosave;
      if (!el) return;
      el.classList.add('on');
      clearTimeout(this._saveT);
      this._saveT = setTimeout(() => el.classList.remove('on'), 1600);
    });
    game.on('equipped', wand => {
      if (this.player) this.player.setWand(wand);
      if (this.wisp) this.wisp.setColor(this.coreColor(wand));
      this.refreshPending = true;
    });
  }

  coreColor(wand) {
    const map = {
      unicorn: '#e8f2ff', dragon: '#ff7a4a', phoenix: '#ffbd5e', thunderbird: '#79ddff',
      basilisk: '#6effa0', thestral: '#b7a8ff', coral: '#58e0c6', chimaera: '#ffd06e',
      augurey: '#9db7ff', wraithglass: '#e79bff', moonstoneheart: '#d9f3ff'
    };
    return map[wand?.coreId] || '#9fe7ff';
  }

  bindTitle() {
    const start = $('btn-start');
    const cont = $('btn-continue');
    const nameInput = $('name-input');
    const has = game.hasSave();
    cont.classList.toggle('hidden', !has);
    if (has) {
      try {
        const raw = JSON.parse(localStorage.getItem('wandlore.save.v1'));
        if (raw?.name) nameInput.value = raw.name;
      } catch { /* noop */ }
    }
    start.addEventListener('click', () => {
      this.audio.init();
      this.audio.setEnabled(true);
      game.newGame(nameInput.value);
      this.begin(false);
    });
    cont.addEventListener('click', () => {
      this.audio.init();
      if (game.load()) {
        this.audio.setEnabled(game.s.settings.sound !== false);
        this.begin(true);
      } else {
        game.newGame(nameInput.value);
        this.begin(false);
      }
    });
    $('btn-sound').addEventListener('click', () => {
      const on = !this.audio.enabled;
      this.audio.init();
      this.audio.setEnabled(on);
      if (game.s) { game.s.settings.sound = on; game.save(); }
      $('btn-sound').textContent = on ? '♪' : '♪';
      $('btn-sound').style.opacity = on ? '1' : '.4';
      this.ui.toast(on ? 'Sound on' : 'Sound off', on ? 'The vale finds its voice.' : 'Silence, for now.', '#e9c988', '♪');
    });
  }

  begin(continued) {
    if (!game.s) game.newGame();
    this.started = true;
    this.loaded = true;
    const s = game.s;
    $('loading').classList.add('done');
    setTimeout(() => $('loading').classList.add('hidden'), 900);
    $('title-screen').classList.add('hidden');
    $('hud').classList.remove('hidden');
    $('fade').classList.add('on');
    setTimeout(() => $('fade').classList.remove('on'), 60);

    // player avatar
    if (this.player) this.scene.remove(this.player.group);
    this.player = createWizard({
      robe: '#2f3560', accent: '#d9b268', hair: '#2b1e1a', hat: true, scale: 1.02,
      name: s.name, subtitle: game.displayTitle(), nameColor: '#f0d79e'
    });
    this.player.setWand(game.wand);
    this.player.group.position.copy(this.world.spawn);
    this.scene.add(this.player.group);
    this.playerPos.copy(this.world.spawn);
    this.wisp.group.visible = true;
    this.wisp.setColor(this.coreColor(game.wand));
    this.wisp.update(0.016, this.playerPos);

    this.yaw = 0.22;
    this.pitch = 0.18;
    this.lastZone = null;
    this.ui.setLocation('Emberfall Village', 'village');
    this.ui.refresh();
    this.ui.updateSpellbar();
    this.audio.setEnabled(s.settings?.sound !== false);
    this.onOverlay(false);

    if (!continued) {
      this.ui.showModal(`<div class="modal-kicker">A SHOP AT THE EDGE OF THE VALE</div>
        <div class="modal-title">Welcome to Emberfall</div>
        <div class="modal-sub">The bench is yours, ${this.escape(s.name.split(' ')[0])}. Shape a wand, sell it honestly, learn a spell that frightens you a little, and sign your name in the duelling ring.</div>
        <div class="modal-sep"></div>
        <div class="reward-row">
          <div class="reward"><span>⚒</span>WASD to walk</div>
          <div class="reward rep"><span>✦</span>Drag to look</div>
          <div class="reward xp"><span>◉</span>E to interact</div>
        </div>
        <div class="modal-actions"><button class="btn-gold" data-close>Open the shop</button></div>`);
    } else {
      this.ui.toast('Welcome back', 'The vale kept your ledger exactly where you left it.', '#e9c988', '✦');
    }
    game.save();
  }

  /* ── INPUT ────────────────────────────────────────────────── */
  setupInput() {
    window.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const k = e.key.toLowerCase();
      if (k === 'escape') {
        e.preventDefault();
        if (this.ui.dialogueOpen) this.ui.closeDialogue();
        else if (this.ui.modalOpen && !this.ui.modalLocked) this.ui.closeModal();
        else if (this.ui.panel) this.ui.closePanel();
        return;
      }
      if (!this.started) return;
      if (this.duel.active) {
        if (k === ' ') { e.preventDefault(); this.duel.dodge(); }
        if (/^[1-6]$/.test(k)) { e.preventDefault(); this.selectAndCast(Number(k) - 1); }
        this.keys.add(k);
        return;
      }
      if (this.ui.panel || this.ui.modalOpen || this.ui.dialogueOpen) return;
      if (k === 'e') { e.preventDefault(); this.interact(); return; }
      if (k === 'c') this.ui.openPanel('craft');
      else if (k === 'b') this.ui.openPanel('spells');
      else if (k === 'k') this.ui.openPanel('shop');
      else if (k === 'j') this.ui.openPanel('journal');
      else if (k === 'm') this.ui.openPanel('map');
      else if (k === 'f') this.ui.openPanel('duel');
      else if (k === 'q') this.ui.openPanel('character');
      else if (/^[1-6]$/.test(k)) this.selectAndCast(Number(k) - 1);
      this.keys.add(k);
    });
    window.addEventListener('keyup', e => this.keys.delete(e.key.toLowerCase()));
    window.addEventListener('blur', () => this.keys.clear());

    const canvas = $('scene');
    canvas.addEventListener('pointerdown', e => {
      if (!this.started || this.ui.panel || this.ui.modalOpen || this.ui.dialogueOpen) return;
      this.mouse.down = true;
      this.mouse.moved = 0;
      this.mouse.lastX = e.clientX;
      this.mouse.lastY = e.clientY;
      canvas.setPointerCapture?.(e.pointerId);
      if (e.button === 2 && this.duel.active) e.preventDefault();
    });
    window.addEventListener('pointermove', e => {
      if (!this.mouse.down) return;
      const dx = e.clientX - this.mouse.lastX;
      const dy = e.clientY - this.mouse.lastY;
      this.mouse.lastX = e.clientX;
      this.mouse.lastY = e.clientY;
      this.mouse.moved += Math.abs(dx) + Math.abs(dy);
      if (this.duel.active) return;
      this.yaw -= dx * 0.0042;
      this.pitch = clamp(this.pitch + dy * 0.0024, -0.12, 0.85);
    });
    window.addEventListener('pointerup', e => {
      const wasDown = this.mouse.down;
      this.mouse.down = false;
      if (e.button === 2) return;
      if (wasDown && this.mouse.moved < 6 && this.started && !this.ui.panel && !this.ui.modalOpen && !this.ui.dialogueOpen) {
        this.castActive();
      }
    });
    canvas.addEventListener('contextmenu', e => {
      e.preventDefault();
      if (this.duel.active) this.duel.shieldHeld = true;
    });
    canvas.addEventListener('wheel', e => {
      if (!this.started) return;
      this.camDist = clamp(this.camDist + e.deltaY * 0.006, 5.2, 12);
    }, { passive: true });

    // shield is held, not toggled: sample the right mouse button every frame
    canvas.addEventListener('pointerdown', e => { if (e.button === 2) this.rightHeld = true; });
    window.addEventListener('pointerup', e => { if (e.button === 2) this.rightHeld = false; });
    canvas.addEventListener('pointerleave', () => { this.rightHeld = false; });

    // touch look
    let touchX = null, touchY = null;
    canvas.addEventListener('touchstart', e => {
      if (!e.touches[0]) return;
      touchX = e.touches[0].clientX; touchY = e.touches[0].clientY;
    }, { passive: true });
    canvas.addEventListener('touchmove', e => {
      if (!e.touches[0] || touchX === null) return;
      const dx = e.touches[0].clientX - touchX, dy = e.touches[0].clientY - touchY;
      touchX = e.touches[0].clientX; touchY = e.touches[0].clientY;
      this.yaw -= dx * 0.005;
      this.pitch = clamp(this.pitch + dy * 0.003, -0.12, 0.85);
    }, { passive: true });
  }

  onOverlay(open) {
    if (open) { this.keys.clear(); this.mouse.down = false; }
    if (!open && this.started) this.ui.setInteract(null);
    this.refreshPending = true;
  }

  /* ── SPELLCASTING ─────────────────────────────────────────── */
  selectAndCast(index) {
    const s = game.s;
    if (!s) return;
    const id = s.loadout[index];
    if (!id) {
      this.ui.toast('Empty slot', 'Ready another spell from the grimoire.', '#ff8c9a', '✦');
      this.audio.error();
      return;
    }
    this.activeSpellIndex = index;
    this.ui.activeIndex = index;
    this.ui.updateSpellbar();
    if (this.duel.active) this.duel.cast(index);
    else this.worldCast(SPELLS.find(sp => sp.id === id));
  }

  castActive() { this.selectAndCast(this.activeSpellIndex || 0); }

  worldCast(spell) {
    if (!spell || !this.started) return;
    const s = game.s;
    const now = performance.now();
    if ((this.worldCds[spell.id] || 0) > now) return;
    const mana = spell.mana;
    s.mp = s.mp ?? game.maxMp();
    if (s.mp < mana) { this.ui.toast('Not enough mana', 'Let the wand breathe.', '#78b4ff', '✦'); this.audio.error(); return; }
    s.mp -= mana;
    this.worldCds[spell.id] = now + spell.cd * 1000;
    this.player.cast();
    const from = this.player.getTipWorld();
    const fwd = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
    const target = new THREE.Vector3(this.playerPos.x + fwd.x * 9, this.playerPos.y + 1.2, this.playerPos.z + fwd.z * 9);
    this.effects.castSpark(from, spell.color);
    this.audio.cast(spell.cat);
    if (spell.effect === 'heal' || spell.effect === 'hot' || spell.cat === 'healing') {
      this.effects.heal(new THREE.Vector3(this.playerPos.x, this.playerPos.y + 0.08, this.playerPos.z), spell.color);
      s.hp = Math.min(game.maxHp(), (s.hp ?? game.maxHp()) + (spell.heal || 18));
      this.audio.heal();
    } else if (spell.effect === 'buff') {
      this.effects.runeCircle(new THREE.Vector3(this.playerPos.x, this.playerPos.y + 0.05, this.playerPos.z), spell.color, 2.4, 0.9);
      this.audio.shield();
    } else if (spell.effect === 'aoe_self' || spell.effect === 'burst') {
      this.effects.ring(new THREE.Vector3(this.playerPos.x, this.playerPos.y + 0.05, this.playerPos.z), spell.color, spell.radius || 5, 0.75);
      this.effects.burst(new THREE.Vector3(this.playerPos.x, this.playerPos.y + 1.2, this.playerPos.z), spell.color, 28, { speed: 7, size: 0.5, flash: 3 });
    } else if (spell.effect === 'summon') {
      this.effects.summon(new THREE.Vector3(this.playerPos.x + fwd.x * 1.5, this.playerPos.y, this.playerPos.z + fwd.z * 1.5), spell.color);
    } else if (spell.effect === 'beam' || spell.effect === 'chain') {
      this.effects.beam(from, target, spell.color, 0.18, 0.45);
      this.effects.burst(target, spell.color, 12, { speed: 3, size: 0.35 });
    } else {
      const orb = this.effects.createOrb(spell.color, 0.18);
      orb.group.position.copy(from);
      this.worldBolts.push({ orb, vel: fwd.clone().multiplyScalar(22), life: 0.6, color: spell.color });
    }
    this.ui.setCds(this.worldCdsForUi());
    this.refreshPending = true;
  }

  worldCdsForUi() {
    const now = performance.now();
    const s = game.s;
    const out = {};
    for (const id of s.loadout) {
      const sp = SPELLS.find(x => x.id === id);
      if (!sp) continue;
      const left = Math.max(0, (this.worldCds[id] || 0) - now) / 1000;
      out[id] = left / sp.cd;
    }
    return out;
  }

  updateWorldBolts(dt) {
    for (let i = this.worldBolts.length - 1; i >= 0; i--) {
      const b = this.worldBolts[i];
      b.life -= dt;
      b.orb.group.position.addScaledVector(b.vel, dt);
      if (b.life <= 0) {
        this.effects.burst(b.orb.group.position.clone(), b.color, 14, { speed: 3, size: 0.4 });
        this.effects.removeOrb(b.orb);
        this.worldBolts.splice(i, 1);
      }
    }
  }

  /* ── DUEL ─────────────────────────────────────────────────── */
  duelCallbacks() {
    return {
      onStart: () => {
        this.ui.setCombat(true);
        this.ui.combatLog('Wands up. The circle is sealed.', 'spell');
      },
      onIntroEnd: () => {
        this.ui.toast('Duel', 'Move, shield, dodge — then make your answer.', '#ff8c9a', '⚔');
      },
      onHud: data => this.ui.updateCombat(data),
      onLog: (html, cls) => this.ui.combatLog(html, cls),
      onToast: (title, text, color, icon) => this.ui.toast(title, text, color, icon),
      onDamage: (pos, amount, cls) => {
        this.pendingFloats.push({ pos: pos.clone(), text: cls === 'heal' ? `+${amount}` : String(amount), cls: cls === 'heal' ? 'heal' : cls === 'enemy' ? 'enemy' : cls });
      },
      onHudFlash: () => {
        const hud = $('hud');
        hud.classList.remove('hit-flash');
        void hud.offsetWidth;
        hud.classList.add('hit-flash');
        clearTimeout(this._hitT);
        this._hitT = setTimeout(() => hud.classList.remove('hit-flash'), 260);
      },
      onEnd: result => this.finishDuel(result)
    };
  }

  startDuel(enemyId, opts = {}) {
    if (!this.started) return;
    const def = ENEMIES.find(e => e.id === enemyId);
    if (!def) return;
    if (game.s.rep < def.reqRep) {
      this.ui.toast('Not yet', `${def.name} requires ${def.reqRep} reputation.`, '#ff8c9a', '⚔');
      this.audio.error();
      return;
    }
    if (this.duel.active) this.duel.dispose();
    if (!opts.tournament) this.tournament = null;
    this.ui.closePanel();
    this.ui.closeModal();
    this.ui.setInteract(null);
    $('fade').classList.add('on');
    setTimeout(() => {
      this.worldBolts = [];
      this.duel.start(def);
      this.activeSpellIndex = 0;
      this.ui.activeIndex = 0;
      this.ui.setCds({});
      this.ui.updateSpellbar();
      this.camPos.set(0, 6, 22);
      this.lookAt.set(0, 1.4, 0);
      $('fade').classList.remove('on');
    }, 430);
  }

  exitDuelToWorld() {
    this.duel.dispose();
    this.effects.setScene(this.scene);
    this.ui.setCombat(false);
    this.ui.setCds(this.worldCdsForUi());
    this.camPos.copy(this.camera.position);
    this.refreshPending = true;
    if (this.player) this.player.group.visible = true;
  }

  finishDuel(result) {
    const def = result.enemy;
    const won = result.won;
    game.recordDuel({ enemy: def, won, prize: {} });
    this.exitDuelToWorld();
    this.audio.setEnabled(game.s.settings?.sound !== false);

    if (won) {
      if (this.tournament) {
        const tour = TOURNAMENTS.find(t => t.id === this.tournament.id);
        this.tournament.index++;
        if (this.tournament.index >= tour.rounds.length) {
          game.recordTournament(tour.id, true);
          game.addGold(tour.rewards.gold, true);
          game.addXp(tour.rewards.xp, true);
          game.addRep(tour.rewards.rep);
          if (!game.s.badges.includes(tour.badge)) game.s.badges.push(tour.badge);
          game.save();
          const t = this.tournament;
          this.tournament = null;
          this.audio.victory();
          this.ui.showModal(`<div class="modal-kicker">THE BRACKET IS YOURS</div>
            <div class="modal-title">${this.escape(tour.name)} Champion</div>
            <div class="modal-sub">The chalk board will remember this longer than the applause. Somewhere, Cassia is already demanding a rematch.</div>
            <div class="reward-row">
              <div class="reward"><span>◉</span>${tour.rewards.gold} galleons</div>
              <div class="reward xp"><span>✦</span>${tour.rewards.xp} XP</div>
              <div class="reward rep"><span>✧</span>+${tour.rewards.rep} reputation</div>
            </div>
            <div class="modal-actions"><button class="btn-gold" data-close>Accept the laurel</button></div>`);
        } else {
          const nextId = tour.rounds[this.tournament.index];
          const next = ENEMIES.find(e => e.id === nextId);
          this.ui.showModal(`<div class="modal-kicker">ROUND WON</div>
            <div class="modal-title">${this.escape(def.name)} yields</div>
            <div class="modal-sub">The circle resets. ${next ? next.name + ' steps out of the crowd.' : ''}</div>
            <div class="reward-row">
              <div class="reward"><span>◉</span>${def.rewards.gold} galleons</div>
              <div class="reward xp"><span>✦</span>${def.rewards.xp} XP</div>
              <div class="reward rep"><span>✧</span>+${def.rewards.rep} reputation</div>
            </div>
            <div class="modal-actions"><button class="btn-gold" id="duel-next-round">Next round</button><button class="btn-line" id="duel-withdraw">Withdraw</button></div>`);
          $('duel-next-round')?.addEventListener('click', () => {
            this.ui.closeModal();
            this.startDuel(nextId, { tournament: true });
          });
          $('duel-withdraw')?.addEventListener('click', () => {
            this.tournament = null;
            this.ui.closeModal();
            game.save();
            this.ui.toast('Bracket withdrawn', 'The chalk board will find someone else to haunt.', '#e9c988', '♛');
          });
        }
      } else {
        this.ui.showModal(`<div class="modal-kicker">THE CIRCLE IS YOURS</div>
          <div class="modal-title">${this.escape(def.name)} yields</div>
          <div class="modal-sub">${def.boss ? 'The wards fall quiet. Somewhere in the vale, a bell rings once and remembers.' : 'A clean finish. The audience pretends it expected that.'}</div>
          <div class="reward-row">
            <div class="reward"><span>◉</span>${def.rewards.gold} galleons</div>
            <div class="reward xp"><span>✦</span>${def.rewards.xp} XP</div>
            <div class="reward rep"><span>✧</span>+${def.rewards.rep} reputation</div>
          </div>
          ${def.drops?.length ? `<div class="wand-trait"><b>Recovered from the ring</b>${def.drops.map(id => this.itemName(id)).filter(Boolean).join(' · ')}</div>` : ''}
          <div class="modal-actions"><button class="btn-gold" data-close>Return to the vale</button></div>`);
        this.audio.victory();
      }
    } else {
      this.tournament = null;
      this.audio.defeat();
      this.ui.showModal(`<div class="modal-kicker">THE WAND FALLS</div>
        <div class="modal-title">${this.escape(def.name)} wins this one</div>
        <div class="modal-sub">You wake on the bench with a headache and your wand still warm. It has opinions about what happened.</div>
        <div class="modal-actions"><button class="btn-gold" id="duel-retry">Ask for a rematch</button><button class="btn-line" data-close>Lick your wounds</button></div>`);
      $('duel-retry')?.addEventListener('click', () => {
        this.ui.closeModal();
        this.startDuel(def.id);
      });
    }
    this.refreshPending = true;
  }

  startTournament(id) {
    const tour = TOURNAMENTS.find(t => t.id === id);
    if (!tour) return;
    if (game.s.rep < tour.reqRep) {
      this.ui.toast('The bracket is sealed', `Requires ${tour.reqRep} reputation.`, '#ff8c9a', '♛');
      this.audio.error();
      return;
    }
    this.tournament = { id, index: 0 };
    this.ui.closePanel();
    this.startDuel(tour.rounds[0], { tournament: true });
  }

  itemName(id) {
    const m = MATERIALS.find(x => x.id === id);
    if (m) return m.name;
    return (WOODS.find(x => x.id === id)?.name) || (CORES.find(x => x.id === id)?.name) || id;
  }

  /* ── WORLD INTERACTION ───────────────────────────────────── */
  interact() {
    if (!this.started || this.duel.active) return;
    const node = this.world.nearestNode(this.playerPos, 3.4);
    const it = this.world.nearestInteract(this.playerPos, 3.8);
    if (node && (!it || Math.hypot(node.x - this.playerPos.x, node.z - this.playerPos.z) <= Math.hypot(it.x - this.playerPos.x, it.z - this.playerPos.z))) {
      this.gather(node);
      return;
    }
    if (!it) return;
    this.audio.ui();
    const data = it.data || {};
    switch (it.type) {
      case 'craft': this.ui.openPanel('craft'); break;
      case 'shop': this.ui.openPanel('shop'); break;
      case 'lessons': this.ui.openPanel('spells'); break;
      case 'duel':
        if (data.enemy) this.startDuel(data.enemy);
        else this.ui.openPanel('duel');
        break;
      case 'quests': this.ui.openPanel('journal'); break;
      case 'npc': this.ui.talk(data.npc); break;
      case 'gate': this.travelTo(data.zone); break;
      case 'lake': this.lakeVision(); break;
      case 'cache': this.crystalCache(); break;
      case 'lore': this.dragonLore(); break;
      default: this.ui.toast(it.label || 'Nothing happens', 'The vale keeps its secrets.', '#e9c988', '◈');
    }
  }

  gather(node) {
    const got = this.world.gather(node);
    if (!got) return;
    game.gainIngredient(got.kind, got.id);
    this.audio.gather();
    const pos = new THREE.Vector3(node.x, node.y + 0.9, node.z);
    this.effects.burst(pos, got.info.color || '#e9c988', 18, { speed: 3, size: 0.4, ttl: 0.9 });
    this.effects.ring(new THREE.Vector3(node.x, node.y + 0.06, node.z), got.info.color || '#e9c988', 1.6, 0.7);
    const rarity = got.info.rarity || 'common';
    this.ui.toast(got.info.name, `${got.kind === 'woods' ? 'Wood' : got.kind === 'cores' ? 'Core' : 'Reagent'} gathered · ${rarity}`, got.info.color || '#e9c988', '✧');
    this.pendingFloats.push({ pos: new THREE.Vector3(node.x, node.y + 1.8, node.z), text: `+1 ${got.info.name}`, cls: 'heal' });
    this.refreshPending = true;
  }

  travelTo(zoneId) {
    const zone = ZONES.find(z => z.id === zoneId);
    if (!zone) return;
    if (game.s.rep < zone.req) {
      this.ui.toast('The way is sealed', `${zone.name} requires ${zone.req} reputation.`, '#ff8c9a', '◈');
      this.audio.error();
      return;
    }
    if (!game.s.discoveredZones.includes(zoneId)) game.unlockZone(zoneId);
    this.ui.closePanel();
    this.ui.closeModal();
    $('fade').classList.add('on');
    setTimeout(() => {
      const spawn = ZONE_SPAWNS[zoneId] || { x: zone.x, z: zone.z };
      this.playerPos.set(spawn.x, 0, spawn.z);
      this.world.collide(this.playerPos, 0.5);
      this.player.group.position.copy(this.playerPos);
      this.ui.setLocation(zone.name, zoneId);
      this.lastZone = zoneId;
      this.ui.toast(zone.name, zone.sub, zone.color, zone.rune);
      $('fade').classList.remove('on');
      this.refreshPending = true;
    }, 460);
  }

  lakeVision() {
    const s = game.s;
    if (s.flags.lakeSeen) {
      this.ui.showModal(`<div class="modal-kicker">MIRRORMERE</div>
        <div class="modal-title">The water remembers</div>
        <div class="modal-sub">Your reflection is still holding the wand a half-second behind you. It looks patient.</div>
        <div class="modal-actions"><button class="btn-gold" data-close>Step back</button></div>`);
      return;
    }
    s.flags.lakeSeen = true;
    s.mp = game.maxMp();
    s.hp = game.maxHp();
    game.addXp(40);
    game.save();
    this.effects.ring(new THREE.Vector3(43, 0.15, 71), '#7de6d0', 7, 1.1);
    this.audio.heal();
    this.ui.showModal(`<div class="modal-kicker">A PAGE FROM THE MIRRORMERE</div>
      <div class="modal-title">Still Water, Loud Memory</div>
      <div class="modal-sub">${this.escape(LORE[0])} The lake gives back your breath, your mana, and a memory that is not quite yours.</div>
      <div class="reward-row"><div class="reward xp"><span>✦</span>+40 XP</div><div class="reward rep"><span>≋</span>Health and mana restored</div></div>
      <div class="modal-actions"><button class="btn-gold" data-close>Keep walking</button></div>`);
  }

  crystalCache() {
    const s = game.s;
    if (s.flags.crystalCache) {
      this.ui.showModal(`<div class="modal-kicker">GLIMMER CAVERNS</div>
        <div class="modal-title">The bloom has closed</div>
        <div class="modal-sub">It will open again when it has decided you are worth another crystal. Give it a day.</div>
        <div class="modal-actions"><button class="btn-gold" data-close>Leave it be</button></div>`);
      return;
    }
    s.flags.crystalCache = true;
    game.addItem('materials', 'starlight', 1);
    game.addRep(3);
    game.addXp(60);
    this.audio.gather();
    this.effects.burst(new THREE.Vector3(94, 2, 58), '#b58cff', 40, { speed: 5, size: 0.6, flash: 4 });
    this.ui.showModal(`<div class="modal-kicker">A FIND IN THE DARK</div>
      <div class="modal-title">Starlight Bloom</div>
      <div class="modal-sub">The petals are cold enough to ache. Worth it.</div>
      <div class="reward-row"><div class="reward"><span>✦</span>Starlight ×1</div><div class="reward rep"><span>✧</span>+3 reputation</div><div class="reward xp"><span>✦</span>+60 XP</div></div>
      <div class="modal-actions"><button class="btn-gold" data-close>Pocket it</button></div>`);
  }

  dragonLore() {
    const s = game.s;
    if (s.flags.dragonLore) {
      this.ui.showModal(`<div class="modal-kicker">DRAGON'S CRAG</div>
        <div class="modal-title">The bones are patient</div>
        <div class="modal-sub">Wind moves through the ribs like a hand through a harp. Nothing new answers.</div>
        <div class="modal-actions"><button class="btn-gold" data-close>Climb down</button></div>`);
      return;
    }
    s.flags.dragonLore = true;
    game.addXp(90);
    game.addRep(2);
    this.ui.showModal(`<div class="modal-kicker">THE CRAG REMEMBERS</div>
      <div class="modal-title">A Dragon's Last Argument</div>
      <div class="modal-sub">The remains are older than the school. A wandmaker's mark is burned into the largest rib — not a signature, a warning: <i>a core is not a cage</i>.</div>
      <div class="reward-row"><div class="reward xp"><span>✦</span>+90 XP</div><div class="reward rep"><span>✧</span>+2 reputation</div></div>
      <div class="modal-actions"><button class="btn-gold" data-close>Remember it</button></div>`);
  }

  /* ── CAMERA / FRAME ──────────────────────────────────────── */
  setupFrame() {
    let last = performance.now();
    const tick = now => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      this.clock += dt;
      if (this.started) {
        if (this.duel.active) this.updateDuelFrame(dt);
        else this.updateWorldFrame(dt);
      } else {
        this.updateTitleFrame(dt);
      }
      this.flushFloats();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // small reveal ceremony for the loading screen
    setTimeout(() => {
      $('loading').classList.add('done');
      setTimeout(() => {
        $('loading').classList.add('hidden');
        $('title-screen').classList.remove('hidden');
      }, 650);
    }, 900);
  }

  updateTitleFrame(dt) {
    this.titleCamT += dt;
    const t = this.titleCamT;
    this.world.update(dt, t, this.world.spawn);
    const r = 39 + Math.sin(t * 0.08) * 4;
    this.camera.position.set(Math.sin(t * 0.05 + 2.2) * r, 13 + Math.sin(t * 0.13) * 1.6, 44 + Math.cos(t * 0.05 + 2.2) * r);
    this.camera.lookAt(0, 2.3, 38);
    this.renderer.render(this.scene, this.camera);
  }

  /* Slide the camera in front of any building it would otherwise sit inside. */
  resolveCamera(desired) {
    const from = new THREE.Vector3(this.playerPos.x, this.playerPos.y + 1.75, this.playerPos.z);
    const dx = desired.x - from.x, dz = desired.z - from.z;
    let best = 1;
    for (const c of this.world.colliders) {
      const rad = c.r + 0.55;
      const fx = from.x - c.x, fz = from.z - c.z;
      const a = dx * dx + dz * dz;
      if (a < 0.0001) continue;
      const b = 2 * (fx * dx + fz * dz);
      const cc = fx * fx + fz * fz - rad * rad;
      const disc = b * b - 4 * a * cc;
      if (disc <= 0) continue;
      const t = (-b - Math.sqrt(disc)) / (2 * a);
      if (t > 0.03 && t < best) best = t;
    }
    const safe = desired.clone();
    if (best < 0.999) {
      safe.lerpVectors(from, desired, Math.max(0.3, best * 0.92));
      safe.y = Math.max(this.world.heightAt(safe.x, safe.z) + 1.35, safe.y);
    }
    return safe;
  }

  updateWorldFrame(dt) {    const s = game.s;
    const paused = !!(this.ui.panel || this.ui.modalOpen || this.ui.dialogueOpen);
    const t = this.clock;

    // health / mana out of combat
    const dtC = paused ? dt * 0.1 : dt;
    if (s.hp < game.maxHp()) s.hp = Math.min(game.maxHp(), (s.hp ?? game.maxHp()) + dtC * 1.8);
    if (s.mp < game.maxMp()) s.mp = Math.min(game.maxMp(), (s.mp ?? game.maxMp()) + dtC * 4.2);
    s.playTime = (s.playTime || 0) + dt;

    let mx = 0, mz = 0;
    if (!paused) {
      if (this.keys.has('w') || this.keys.has('arrowup')) mz += 1;
      if (this.keys.has('s') || this.keys.has('arrowdown')) mz -= 1;
      if (this.keys.has('a') || this.keys.has('arrowleft')) mx -= 1;
      if (this.keys.has('d') || this.keys.has('arrowright')) mx += 1;
    }
    const sprint = this.keys.has('shift');
    const moving = mx || mz;
    let speed = sprint ? 10 : 6.4;
    if (moving) {
      const len = Math.hypot(mx, mz);
      mx /= len; mz /= len;
      const fx = -Math.sin(this.yaw), fz = -Math.cos(this.yaw);
      const rx = Math.cos(this.yaw), rz = -Math.sin(this.yaw);
      const dx = fx * mz + rx * mx;
      const dz = fz * mz + rz * mx;
      this.playerPos.x += dx * speed * dt;
      this.playerPos.z += dz * speed * dt;
      this.world.collide(this.playerPos, 0.45);
      const targetRot = Math.atan2(dx, dz);
      this.player.group.rotation.y = this.lerpAngle(this.player.group.rotation.y, targetRot, 1 - Math.exp(-12 * dt));
    }
    this.player.group.position.copy(this.playerPos);
    this.player.update(dt, !!moving, sprint ? 1.6 : 1);
    this.wisp.group.visible = true;
    this.wisp.update(dt, new THREE.Vector3(this.playerPos.x, this.playerPos.y + 0.2, this.playerPos.z));

    this.world.update(dt, t, this.playerPos);
    this.effects.update(dt);
    this.updateWorldBolts(dt);

    // nearby interactive prompt
    if (!paused) {
      const node = this.world.nearestNode(this.playerPos, 3.4);
      const it = this.world.nearestInteract(this.playerPos, 3.8);
      let prompt = null;
      if (node && (!it || Math.hypot(node.x - this.playerPos.x, node.z - this.playerPos.z) <= Math.hypot(it.x - this.playerPos.x, it.z - this.playerPos.z))) {
        prompt = `Gather ${node.info.name}`;
      } else if (it) {
        prompt = it.label;
      }
      this.ui.setInteract(prompt, 'E');
    } else {
      this.ui.setInteract(null);
    }

    // zone discovery
    const zone = this.world.getZone(this.playerPos.x, this.playerPos.z);
    if (zone && zone.id !== this.lastZone) {
      this.lastZone = zone.id;
      this.ui.setLocation(zone.name, zone.id);
      if (zone.id !== 'wilds') {
        if (!s.discoveredZones.includes(zone.id)) {
          game.unlockZone(zone.id);
          this.ui.toast('New location', zone.name, zone.color, zone.rune);
          this.ui.objective(`Discovered ${zone.name}`);
        } else {
          this.ui.setLocation(zone.name, zone.id);
        }
      }
    }

    // camera
    const cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);
    const desired = new THREE.Vector3(
      this.playerPos.x + Math.sin(this.yaw) * this.camDist * cp,
      this.playerPos.y + 2.3 + this.camDist * (0.22 + sp * 0.72),
      this.playerPos.z + Math.cos(this.yaw) * this.camDist * cp
    );
    const ground = this.world.heightAt(desired.x, desired.z) + 1.1;
    if (desired.y < ground) desired.y = ground;
    const safe = this.resolveCamera(desired);
    this.camPos.x = damp(this.camPos.x, safe.x, 9, dt);
    this.camPos.y = damp(this.camPos.y, safe.y, 9, dt);
    this.camPos.z = damp(this.camPos.z, safe.z, 9, dt);
    this.camera.position.copy(this.camPos);
    const shake = this.effects.shakeAmt * 0.22;
    if (shake > 0.001) this.camera.position.add(new THREE.Vector3((Math.random() - .5) * shake, (Math.random() - .5) * shake, (Math.random() - .5) * shake));
    this.lookAt.set(this.playerPos.x, this.playerPos.y + 1.7, this.playerPos.z);
    this.camera.lookAt(this.lookAt);
    this.ui.compass(this.yaw);

    // minimap and HUD
    this.minimapClock += dt;
    if (this.minimapClock > 0.08) {
      this.minimapClock = 0;
      this.ui.drawMinimap(this.world, this.playerPos, this.yaw);
    }
    this.ui.setCds(this.worldCdsForUi());
    this.ui.updateMeters();
    this.refreshClock += dt;
    if (this.refreshPending && this.refreshClock > 0.28) {
      this.refreshClock = 0;
      this.refreshPending = false;
      this.refreshClock = 0;
      this.ui.refresh();
    }
    this.renderer.render(this.scene, this.camera);
  }

  updateDuelFrame(dt) {
    const duel = this.duel;
    const input = {
      moveX: (this.keys.has('d') ? 1 : 0) - (this.keys.has('a') ? 1 : 0),
      moveZ: (this.keys.has('w') ? 1 : 0) - (this.keys.has('s') ? 1 : 0),
      shield: !!this.rightHeld && this.mouse.down
    };
    // A held right button may not be tracked by pointerdown on the canvas after modal focus.
    input.shield = !!this.rightHeld;
    if (duel.active) {
      duel.mp = Math.min(duel.maxMp, duel.mp + dt * 2.4);
      duel.update(dt, input);
    }
    const p = duel.playerPos, e = duel.enemyPos;
    if (p && e) {
      const dir = new THREE.Vector3(e.x - p.x, 0, e.z - p.z);
      if (dir.lengthSq() < 0.001) dir.set(0, 0, -1);
      dir.normalize();
      const desired = new THREE.Vector3(p.x - dir.x * 8.5, 5.4, p.z - dir.z * 8.5);
      const focus = new THREE.Vector3(p.x + dir.x * 3.2, 1.25, p.z + dir.z * 3.2);
      this.camPos.x = damp(this.camPos.x, desired.x, 5, dt);
      this.camPos.y = damp(this.camPos.y, desired.y, 5, dt);
      this.camPos.z = damp(this.camPos.z, desired.z, 5, dt);
      this.lookAt.x = damp(this.lookAt.x, focus.x, 6, dt);
      this.lookAt.y = damp(this.lookAt.y, focus.y, 6, dt);
      this.lookAt.z = damp(this.lookAt.z, focus.z, 6, dt);
      this.camera.position.copy(this.camPos);
      const shake = this.effects.shakeAmt * 0.3;
      if (shake > 0.001) this.camera.position.add(new THREE.Vector3((Math.random() - .5) * shake, (Math.random() - .5) * shake, (Math.random() - .5) * shake));
      this.camera.lookAt(this.lookAt);
    }
    const s = game.s;
    const cds = {};
    for (const id of s.loadout) {
      const sp = SPELLS.find(x => x.id === id);
      if (!sp) continue;
      cds[id] = (duel.cds[id] || 0) / Math.max(0.001, sp.cd);
    }
    this.ui.setCds(cds);
    this.ui.updateSpellbar();
    this.ui.updateCombat({ hp: duel.hp, mp: duel.mp, enemyHp: duel.enemyHp });
    this.renderer.render(duel.scene, this.camera);
  }

  flushFloats() {
    if (!this.pendingFloats.length) return;
    const w = window.innerWidth, h = window.innerHeight;
    for (const f of this.pendingFloats) {
      const v = f.pos.clone().project(this.camera);
      if (v.z > 1 || v.z < -1) continue;
      const x = (v.x * 0.5 + 0.5) * w;
      const y = (-v.y * 0.5 + 0.5) * h;
      this.ui.floatText(x, y, f.text, f.cls || '');
    }
    this.pendingFloats = [];
  }

  lerpAngle(a, b, t) {
    let d = ((b - a + Math.PI) % (Math.PI * 2)) - Math.PI;
    if (d < -Math.PI) d += Math.PI * 2;
    return a + d * t;
  }

  autosave() {
    if (!this.started || !game.s) return;
    if (this.tournament) return;
    game.save();
  }

  escape(str = '') {
    return String(str).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }
}

/* Kick the whole thing off once the DOM is ready. */
const app = new Wandlore();
window.wandlore = app;
