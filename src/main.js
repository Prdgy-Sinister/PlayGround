import * as THREE from 'three';
import {
  ACHIEVEMENTS, BROOMS, CAREER_CHAPTERS, CHAMPIONSHIP, DIFFICULTIES, HOUSES,
  LIVERIES, NATIONS, POSITIONS, TACTICS, TRACKS,
} from './data.js';
import {
  loadState, saveState, createState, award, recordRace, recordQuidditch,
  checkAchievements, claimChapter, buyBroom, upgradeBroom, spendSkill,
  startTournament, currentFixture, completeTournamentMatch, tournamentMatchRewards,
  resetTournament, getBroom, getBroomStats, SAVE_KEY,
} from './state.js';
import { AudioEngine } from './audio.js';
import { buildMenuWorld, buildRaceWorld, disposeScene } from './world.js';
import { RaceGame } from './race.js';
import { QuidditchMatch } from './quidditch.js';
import { UI } from './ui.js';

/* ================================================================== */
/* Input                                                              */
/* ================================================================== */

class Input {
  constructor(game) {
    this.game = game;
    this.joy = { x: 0, y: 0 };
    this.raw = { x: 0, y: 0 };
    this.joyHome = { x: 0, y: 0 };
    this.joyOrigin = { x: 0, y: 0 };
    this.joyMax = 42;
    this.boost = false;
    this.brake = false;
    this.action = false;
    this.pass = false;
    this.keys = {};
    this.touchId = null;
    this.touchActive = false;
    this.btnBoost = false;
    this.btnBrake = false;
    this.abort = null;
    window.addEventListener('keydown', e => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
      this.keys[e.code] = true;
      if (e.code === 'Space' && !e.repeat) this.action = true;
      if (e.code === 'KeyF' && !e.repeat) this.action = true;
      if (e.code === 'KeyE' && !e.repeat) this.pass = true;
      if (e.code === 'Escape') this.game.handleUI('pause');
    });
    window.addEventListener('keyup', e => { this.keys[e.code] = false; });
    window.addEventListener('blur', () => this.clear());
  }

  bindRace() { this.bindHUD(false); }
  bindQuidditch() { this.bindHUD(true); }

  bindHUD(quidditch) {
    this.unbind();
    this.abort = new AbortController();
    const signal = this.abort.signal;
    const zone = document.getElementById('joystick-zone');
    const knob = document.getElementById('joystick-knob');
    if (zone) {
      const update = e => {
        if (e.pointerId !== this.touchId) return;
        let dx = (e.clientX - this.joyOrigin.x) / this.joyMax;
        let dy = (e.clientY - this.joyOrigin.y) / this.joyMax;
        const len = Math.hypot(dx, dy);
        if (len > 1) { dx /= len; dy /= len; }
        this.raw.x = dx;
        this.raw.y = dy;
        if (knob) knob.style.transform = `translate(${this.joyHome.x + dx * this.joyMax * 0.6}px, ${this.joyHome.y + dy * this.joyMax * 0.6}px)`;
      };
      zone.addEventListener('pointerdown', e => {
        e.preventDefault();
        this.touchId = e.pointerId;
        this.touchActive = true;
        this.game.audio.init();
        const rect = zone.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        this.joyMax = Math.max(36, rect.width * 0.32);
        const homeMax = rect.width * 0.16;
        this.joyHome = {
          x: Math.max(-homeMax, Math.min(homeMax, e.clientX - cx)),
          y: Math.max(-homeMax, Math.min(homeMax, e.clientY - cy)),
        };
        this.joyOrigin = { x: e.clientX, y: e.clientY };
        zone.classList.add('active');
        update(e);
      }, { signal });
      window.addEventListener('pointermove', e => { if (this.touchActive) update(e); }, { signal });
      const end = e => {
        if (e.pointerId !== this.touchId) return;
        this.touchId = null; this.touchActive = false;
        this.raw.x = 0; this.raw.y = 0;
        this.joyHome.x = 0; this.joyHome.y = 0;
        zone.classList.remove('active');
        if (knob) knob.style.transform = 'translate(0,0)';
      };
      window.addEventListener('pointerup', end, { signal });
      window.addEventListener('pointercancel', end, { signal });
    }
    const bindButton = (id, onDown, onUp) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('pointerdown', e => {
        e.preventDefault(); this.game.audio.init(); onDown();
        el.classList.add('pressed');
      }, { signal });
      const up = () => { if (onUp) onUp(); el.classList.remove('pressed'); };
      el.addEventListener('pointerup', up, { signal });
      el.addEventListener('pointercancel', up, { signal });
      el.addEventListener('pointerleave', up, { signal });
    };
    bindButton('btn-boost', () => { this.btnBoost = true; this.game.audio.sfx('whoosh'); }, () => { this.btnBoost = false; });
    bindButton('btn-brake', () => { this.btnBrake = true; }, () => { this.btnBrake = false; });
    bindButton('btn-action', () => { this.action = true; }, null);
    bindButton('btn-pass', () => { this.pass = true; }, null);
  }

  update(dt = 1 / 60) {
    const k = this.keys;
    if (!this.touchActive) {
      let x = 0, y = 0;
      if (k.ArrowLeft || k.KeyA) x -= 1;
      if (k.ArrowRight || k.KeyD) x += 1;
      if (k.ArrowUp || k.KeyW) y -= 1;
      if (k.ArrowDown || k.KeyS) y += 1;
      this.raw.x = x;
      this.raw.y = y;
    }
    // Dead-zone + precision curve, then ease the result so taps and flicks
    // translate into smooth, controllable flight instead of instant snaps.
    const shape = v => {
      const a = Math.abs(v);
      if (a < 0.07) return 0;
      return Math.sign(v) * Math.pow((a - 0.07) / 0.93, 1.16);
    };
    const targetX = shape(this.raw.x);
    const targetY = shape(this.raw.y);
    const response = 1 - Math.exp(-dt * 24);
    this.joy.x += (targetX - this.joy.x) * response;
    this.joy.y += (targetY - this.joy.y) * response;
    if (Math.abs(this.joy.x) < 0.004) this.joy.x = 0;
    if (Math.abs(this.joy.y) < 0.004) this.joy.y = 0;
    this.boost = this.btnBoost || !!k.ShiftLeft || !!k.ShiftRight;
    this.brake = this.btnBrake || !!k.KeyX;
  }

  consumeAction() {
    if (this.action) { this.action = false; return true; }
    return false;
  }

  consumePass() {
    if (this.pass) { this.pass = false; return true; }
    return false;
  }

  clear() {
    this.joy.x = 0; this.joy.y = 0;
    this.raw.x = 0; this.raw.y = 0;
    this.touchActive = false; this.touchId = null;
    this.joyHome.x = 0; this.joyHome.y = 0;
    this.btnBoost = false; this.btnBrake = false;
    this.boost = false; this.brake = false;
    this.action = false; this.pass = false;
    const knob = document.getElementById('joystick-knob');
    if (knob) knob.style.transform = 'translate(0,0)';
    document.getElementById('joystick-zone')?.classList.remove('active');
  }

  unbind() {
    this.abort?.abort();
    this.abort = null;
    this.clear();
  }
}

/* ================================================================== */
/* Game                                                               */
/* ================================================================== */

class Game {
  constructor() {
    this.state = loadState();
    this.audio = new AudioEngine();
    this.audio.attachState(this.state);
    this.sel = {
      mode: 'quick',
      trackId: 'hogwarts',
      difficulty: 'pro',
      role: 'chaser',
      tactics: 'balanced',
      qDifficulty: 'pro',
      careerTab: 'overview',
      lockerTab: 'brooms',
    };
    this.active = null;
    this.preview = null;
    this.mode = 'menu';
    this.paused = false;
    this.championship = null;
    this.lastRaceConfig = null;
    this.lastMatchConfig = null;
    this.t = 0;
    this._completing = false;

    const canvas = document.getElementById('gl');
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', alpha: false, stencil: false });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.22;
    this.renderer.shadowMap.enabled = this.state.settings.quality !== 'low';
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this._perfAcc = 0;
    this._perfFrames = 0;
    this._lastFrame = performance.now();
    this.applyQuality();

    this.scene = null;
    this.camera = null;
    this.menu = buildMenuWorld(this.scene = new THREE.Scene());
    this.scene = this.menu.scene;
    this.camera = this.menu.camera;
    this.aspect = 1;
    this.resize();

    this.ui = new UI(this);
    this.input = new Input(this);
    this.clock = new THREE.Clock();
    this.installErrors();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('orientationchange', () => setTimeout(() => this.resize(), 200));
    document.addEventListener('visibilitychange', () => { if (document.hidden) this.audio.ctx?.suspend?.(); });

    if (!this.state.created) this.ui.showOnboarding();
    else this.ui.go('home');
    this.updateReadyTimer = setTimeout(() => {
      this.ui.hideLoading();
      window.__ready = true;
    }, 700);

    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
    window.game = this;
    console.log('[Wizarding Sports] Ready ·', BROOMS.length, 'brooms ·', TRACKS.length, 'circuits ·', NATIONS.length, 'nations');
  }

  installErrors() {
    window.__errors = [];
    window.addEventListener('error', e => {
      window.__errors.push(String(e.message || e.error));
    });
    window.addEventListener('unhandledrejection', e => {
      window.__errors.push(String(e.reason));
    });
  }

  applyQuality() {
    const q = this.state.settings.quality;
    const dpr = window.devicePixelRatio || 1;
    const cap = q === 'high' ? 2 : q === 'medium' ? 1.5 : 1;
    this._maxPixelRatio = Math.min(dpr, cap);
    this._pixelRatio = this._maxPixelRatio;
    this.renderer.setPixelRatio(this._pixelRatio);
    this.renderer.shadowMap.enabled = q !== 'low';
    this.renderer.shadowMap.type = q === 'high' ? THREE.PCFSoftShadowMap : THREE.PCFShadowMap;
  }

  trackPerformance(rawDt) {
    this._perfAcc += rawDt;
    this._perfFrames++;
    if (this._perfAcc < 1.4) return;
    const fps = this._perfFrames / this._perfAcc;
    this._perfAcc = 0;
    this._perfFrames = 0;
    const min = this.state.settings.quality === 'low' ? 0.8 : 0.72;
    if (fps < 47 && this._pixelRatio > min) {
      this._pixelRatio = Math.max(min, this._pixelRatio * 0.92);
      this.renderer.setPixelRatio(this._pixelRatio);
    } else if (fps > 57 && this._pixelRatio < this._maxPixelRatio) {
      this._pixelRatio = Math.min(this._maxPixelRatio, this._pixelRatio * 1.04);
      this.renderer.setPixelRatio(this._pixelRatio);
    }
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.aspect = w / Math.max(1, h);
    this.renderer.setSize(w, h, false);
    this.renderer.setPixelRatio(this._pixelRatio || this._maxPixelRatio || 1);
    const cam = this.active?.camera || this.preview?.camera || this.menu.camera;
    if (cam) { cam.aspect = this.aspect; cam.updateProjectionMatrix(); }
  }

  save() {
    saveState(this.state);
    this.ui.renderChrome();
  }

  liveryColor() {
    return LIVERIES.find(l => l.id === this.state.brooms.livery)?.color || '#e8bd5b';
  }

  loop() {
    requestAnimationFrame(this.loop);
    const now = performance.now();
    const rawDt = Math.max(0.0001, (now - this._lastFrame) / 1000);
    this._lastFrame = now;
    const dt = Math.min(0.05, this.clock.getDelta());
    this.t += dt;
    this.trackPerformance(rawDt);
    this.input.update(dt);
    if (!this.paused) {
      if (this.active) this.active.update(dt);
      else if (this.preview) this.updatePreview(dt);
      else if (this.menu) this.menu.update(this.t, dt);
    }
    this.audio.update(dt);
    const scene = this.active?.scene || this.preview?.scene || this.menu.scene;
    const camera = this.active?.camera || this.preview?.camera || this.menu.camera;
    if (camera) {
      camera.aspect = this.aspect;
      camera.updateProjectionMatrix();
      this.renderer.render(scene, camera);
    }
  }

  /* ---------------------------------------------------------------- */
  /* Navigation                                                        */
  /* ---------------------------------------------------------------- */

  go(screen) {
    if (this.active || this.preview) this.leaveGame();
    this.ui.closeModal();
    this.audio.setMode('menu');
    this.ui.go(screen);
    this.audio.init();
    this.audio.sfx('back');
  }

  leaveGame() {
    this.paused = false;
    this.ui.closeModal();
    if (this.active) {
      try {
        if (this.active.scene) disposeScene(this.active.scene);
        this.active.dispose?.();
      } catch (e) { console.warn(e); }
      this.active = null;
    }
    if (this.preview) {
      try { disposeScene(this.preview.scene); } catch { /* noop */ }
      this.preview = null;
    }
    this.mode = 'menu';
    this.input.unbind();
    this.ui.hideHUD();
    this.audio.setMode('menu');
    this.ui.renderChrome();
  }

  /* ---------------------------------------------------------------- */
  /* UI action routing                                                 */
  /* ---------------------------------------------------------------- */

  handleUI(action, value) {
    this.audio.init();
    switch (action) {
      case 'go': this.go(value); break;
      case 'settings': this.ui.showSettings(); break;
      case 'close-modal': this.ui.closeModal(); break;
      case 'select-mode': {
        this.sel.mode = value;
        if (value === 'championship') {
          if (!this.championship || this.championship.finished) {
            this.championship = { round: 0, points: {}, finished: false, tracks: CHAMPIONSHIP.tracks };
          }
          this.sel.trackId = CHAMPIONSHIP.tracks[Math.min(2, this.championship.round)];
        }
        this.ui.rerender();
        break;
      }
      case 'select-track':
        if (this.sel.mode !== 'championship') this.sel.trackId = value;
        else this.sel.trackId = value;
        this.ui.rerender();
        break;
      case 'select-difficulty':
        this.sel.difficulty = value;
        this.ui.rerender();
        break;
      case 'select-qdifficulty':
        this.sel.qDifficulty = value;
        this.ui.rerender();
        break;
      case 'select-broom': this.selectBroom(value); break;
      case 'upgrade-broom': this.upgradeSelected(value); break;
      case 'select-livery':
        this.state.brooms.livery = value; this.save(); this.ui.rerender();
        this.ui.toast('Livery applied', `${LIVERIES.find(l => l.id === value)?.name || ''} broom finish`, 'spark');
        break;
      case 'select-house':
        this.state.profile.house = value;
        const house = HOUSES.find(h => h.id === value);
        if (house) { this.state.profile.robe = house.color; }
        this.save(); this.ui.rerender();
        break;
      case 'select-robe': this.state.profile.robe = value; this.save(); this.ui.rerender(); break;
      case 'select-skin': this.state.profile.skin = value; this.save(); this.ui.rerender(); break;
      case 'select-hair': this.state.profile.hair = value; this.save(); this.ui.rerender(); break;
      case 'save-appearance': this.save(); this.ui.toast('Appearance saved', 'Your flyer is ready for the world stage', 'person'); break;
      case 'career-tab': this.sel.careerTab = value; this.ui.rerender(); break;
      case 'locker-tab': this.sel.lockerTab = value; this.ui.rerender(); break;
      case 'spend-skill': this.spendSkill(value); break;
      case 'claim-chapter': this.claimChapter(value); break;
      case 'select-nation': {
        const t = this.state.quidditch.tournament;
        if (t && !t.champion && !t.eliminated) { this.ui.toast('Campaign in progress', 'Finish or reset the tournament to change nation', 'shield'); break; }
        this.state.profile.nation = value;
        this.state.quidditch.tournament = null;
        this.save(); this.ui.rerender();
        break;
      }
      case 'select-role': this.sel.role = value; this.ui.rerender(); break;
      case 'select-tactics': this.sel.tactics = value; this.ui.rerender(); break;
      case 'open-briefing': this.openBriefing(); break;
      case 'close-briefing': this.closeBriefing(); break;
      case 'begin-race': this.beginRace(); break;
      case 'race-again': this.raceAgain(); break;
      case 'next-champ-race': this.nextChampRace(); break;
      case 'start-campaign': this.startCampaign(); break;
      case 'start-match': this.startMatch(); break;
      case 'next-quid-match': this.nextQuidMatch(); break;
      case 'new-quid-campaign': this.newQuidCampaign(); break;
      case 'pause': this.pauseGame(); break;
      case 'resume': this.resumeGame(); break;
      case 'quit-game': this.quitGame(); break;
      case 'restart-current': this.restartCurrent(); break;
      case 'sub-role':
        if (this.active?.substituteRole) {
          this.active.substituteRole(value);
          this.sel.role = value;
          this.ui.showPause(this.active);
        }
        break;
      case 'change-tactics':
        if (this.active?.setTactics) {
          this.active.setTactics(value);
          this.sel.tactics = value;
          this.ui.showPause(this.active);
        }
        break;
      case 'toggle-setting':
        this.state.settings[value] = !this.state.settings[value];
        this.save();
        this.ui.showSettings();
        this.audio.setMode(this.mode === 'quidditch' ? 'quid' : this.mode === 'race' ? 'race' : 'menu');
        break;
      case 'set-quality':
        this.state.settings.quality = value;
        this.applyQuality();
        this.resize();
        this.save();
        this.ui.showSettings();
        break;
      case 'reset-save': this.ui.showConfirmReset(); break;
      case 'confirm-reset':
        localStorage.removeItem(SAVE_KEY);
        location.reload();
        break;
      case 'create-player': this.createPlayer(); break;
      default: break;
    }
  }

  handleUIField(field, value) {
    if (field === 'name') {
      this.state.profile.name = value.slice(0, 24);
      this.save();
    }
  }

  /* ---------------------------------------------------------------- */
  /* Progression actions                                               */
  /* ---------------------------------------------------------------- */

  selectBroom(id) {
    if (this.state.brooms.owned.includes(id)) {
      this.state.brooms.selected = id;
      this.save();
      this.ui.rerender();
      return;
    }
    const res = buyBroom(this.state, id);
    if (!res.ok) {
      this.ui.toast('Cannot buy broom', res.reason, 'close');
      return;
    }
    this.audio.sfx('checkpoint');
    this.save();
    this.ui.rerender();
    this.ui.toast('Broom acquired!', getBroom(id).name, 'broom');
  }

  upgradeSelected(stat) {
    const id = this.state.brooms.selected;
    const res = upgradeBroom(this.state, id, stat);
    if (!res.ok) { this.ui.toast('Upgrade unavailable', res.reason, 'close'); return; }
    this.audio.sfx('checkpoint');
    this.save();
    this.ui.rerender();
    this.ui.toast('Upgrade complete', `${getBroom(id).name} · ${stat} improved`, 'spark');
  }

  spendSkill(id) {
    if (!spendSkill(this.state, id)) { this.ui.toast('No skill points', 'Earn XP and level up to gain more', 'star'); return; }
    this.audio.sfx('checkpoint');
    this.save();
    this.ui.rerender();
  }

  claimChapter(id) {
    const chapter = CAREER_CHAPTERS.find(c => c.id === id);
    if (!chapter) return;
    if (!claimChapter(this.state, chapter)) { this.ui.toast('Not ready', 'Complete the chapter objective first', 'clock'); return; }
    checkAchievements(this.state);
    this.audio.sfx('win');
    this.save();
    this.ui.rerender();
    this.ui.toast('Chapter claimed', `+${chapter.reward.galleons} Galleons · +${chapter.reward.xp} XP`, 'trophy');
  }

  createPlayer() {
    const v = this.ui.getOnboarding();
    this.state.created = true;
    this.state.profile.name = v.name || 'Aria Blackwood';
    this.state.profile.house = v.house || 'gryffindor';
    this.state.profile.robe = v.robe || '#8f1d2c';
    this.state.profile.skin = v.skin || '#d9a97f';
    this.state.profile.nation = v.nation || 'england';
    this.save();
    document.body.classList.remove('onboarding');
    this.ui.closeModal();
    this.audio.init();
    this.audio.sfx('win');
    this.ui.go('home');
    this.ui.toast('Welcome to the World Cup', `${this.state.profile.name} · ${NATIONS.find(n => n.id === this.state.profile.nation)?.name}`, 'spark');
  }

  /* ---------------------------------------------------------------- */
  /* Race flow                                                         */
  /* ---------------------------------------------------------------- */

  raceConfig(trackId = this.sel.trackId) {
    let track = TRACKS.find(t => t.id === trackId) || TRACKS[0];
    if (this.sel.mode === 'championship') {
      if (!this.championship || this.championship.finished) {
        this.championship = { round: 0, points: {}, finished: false, tracks: CHAMPIONSHIP.tracks };
      }
      const id = CHAMPIONSHIP.tracks[Math.min(2, this.championship.round)];
      track = TRACKS.find(t => t.id === id) || TRACKS[0];
      this.sel.trackId = track.id;
    }
    return {
      track,
      broomId: this.state.brooms.selected,
      mode: this.sel.mode,
      difficulty: this.sel.difficulty,
      laps: this.sel.mode === 'trial' || this.sel.mode === 'qualify' ? 1 : track.laps,
    };
  }

  openBriefing() {
    this.audio.init();
    this.ui.closeModal();
    if (this.active) this.leaveGame();
    const cfg = this.raceConfig();
    const world = buildRaceWorld(cfg.track, this.state.settings.quality);
    const camera = new THREE.PerspectiveCamera(55, this.aspect, 0.1, 2000);
    const gate = world.gates[0];
    camera.position.copy(gate.pos).add(new THREE.Vector3(28, 9, 28));
    camera.lookAt(gate.pos);
    this.previewCfg = cfg;
    this.preview = { scene: world.scene, camera, world, t: 0, gate };
    this.mode = 'preview';
    this.ui.renderChrome();
    this.ui.showBriefing();
  }

  updatePreview(dt) {
    if (!this.preview) return;
    const p = this.preview;
    p.t += dt;
    p.world.update(dt, p.camera);
    const a = p.t * 0.22 + 0.5;
    const center = p.gate.pos;
    const desired = center.clone().add(new THREE.Vector3(Math.cos(a) * 34, 9 + Math.sin(p.t * 0.6) * 2, Math.sin(a) * 34));
    p.camera.position.lerp(desired, 1 - Math.exp(-dt * 1.8));
    p.camera.lookAt(center);
  }

  closeBriefing() {
    this.ui.closeModal();
    if (this.preview) {
      try { disposeScene(this.preview.scene); } catch { /* noop */ }
      this.preview = null;
    }
    this.mode = 'menu';
    this.previewCfg = null;
    this.ui.renderChrome();
    this.ui.go('race');
  }

  beginRace() {
    this.ui.closeModal();
    if (this.preview) {
      try { disposeScene(this.preview.scene); } catch { /* noop */ }
      this.preview = null;
    }
    this.ui.els.fade.classList.add('show');
    setTimeout(() => {
      try {
        this.startRace(this.previewCfg || this.raceConfig());
      } catch (err) {
        console.error(err);
        this.ui.toast('Unable to start race', String(err.message || err), 'close');
        this.mode = 'menu';
        this.ui.renderChrome();
      }
      setTimeout(() => this.ui.els.fade.classList.remove('show'), 200);
    }, 180);
  }

  startRace(config) {
    this.leaveGame();
    const cfg = config || this.raceConfig();
    this.lastRaceConfig = cfg;
    if (cfg.mode === 'championship') {
      if (!this.championship || this.championship.finished) {
        this.championship = { round: 0, points: {}, finished: false, tracks: CHAMPIONSHIP.tracks };
      }
      cfg.championship = { round: this.championship.round };
    }
    this.mode = 'race';
    this.paused = false;
    this.active = new RaceGame(this, cfg);
    this.ui.renderChrome();
    this.audio.init();
  }

  raceAgain() {
    const cfg = this.lastRaceConfig ? { ...this.lastRaceConfig } : this.raceConfig();
    if (cfg.mode === 'championship') cfg.mode = 'quick';
    this.ui.closeModal();
    this.startRace(cfg);
  }

  nextChampRace() {
    if (!this.championship || this.championship.finished) { this.go('race'); return; }
    this.ui.closeModal();
    this.startRace(this.raceConfig());
  }

  completeRace(summary) {
    if (this._completing) return;
    this._completing = true;
    try {
      const diff = DIFFICULTIES.find(d => d.id === summary.difficulty) || DIFFICULTIES[1];
      const pos = summary.pos;
      const table = [520, 360, 270, 200, 160, 120];
      let base = table[Math.min(5, pos - 1)] || 100;
      let xp = [190, 145, 115, 90, 75, 60][Math.min(5, pos - 1)] || 50;
      let ranking = [50, 35, 25, 16, 10, 6][Math.min(5, pos - 1)] || 4;
      if (summary.mode === 'trial') {
        base = 300; xp = 120; ranking = 10;
        if (summary.bestLap && summary.bestLap < summary.track.targetLap) {
          base += 200; xp += 70; ranking += 6;
          this.ui.toast('Target beaten!', `New benchmark on ${summary.track.name}`, 'clock');
        }
      } else if (summary.mode === 'qualify') {
        base = 240; xp = 90; ranking = 8;
      }
      const reward = {
        galleons: Math.round(base * diff.reward),
        xp: Math.round(xp * diff.reward),
        ranking: Math.round(ranking * diff.reward),
      };
      recordRace(this.state, {
        trackId: summary.trackId, trackName: summary.trackName, pos,
        time: summary.totalTime, bestLap: summary.bestLap, mode: summary.mode,
        boostTime: summary.boostTime,
      });

      let championshipExtras = null;
      if (summary.mode === 'championship' && this.championship) {
        const rounds = this.championship.tracks.length;
        const pts = this.championship.points;
        const tablePoints = CHAMPIONSHIP.points;
        for (const row of summary.standings) {
          const name = row.player ? this.state.profile.name : row.name;
          pts[name] = (pts[name] || 0) + (tablePoints[row.pos - 1] || 2);
        }
        const completedRound = this.championship.round;
        const final = completedRound >= rounds - 1;
        let champion = null;
        if (final) {
          champion = Object.entries(pts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
          this.championship.finished = true;
          if (champion === this.state.profile.name && !this.championship.awarded) {
            this.championship.awarded = true;
            this.state.career.championships += 1;
            reward.galleons += 1200;
            reward.xp += 500;
            reward.ranking += 80;
            this.audio.sfx('win');
            this.ui.toast('Grand Prix Champion!', 'The International Broom Grand Prix is yours', 'trophy');
          }
        } else {
          this.championship.round += 1;
          this.sel.trackId = CHAMPIONSHIP.tracks[this.championship.round];
        }
        championshipExtras = {
          round: completedRound,
          final,
          champion,
          points: { ...pts },
        };
      }

      const levels = award(this.state, reward);
      const achievements = checkAchievements(this.state);
      this.save();
      this.ui.renderChrome();
      this.ui.showRaceResults(summary, reward, {
        levels: levels.levels,
        achievements,
        championship: championshipExtras,
      });
      this.audio.setMode('menu');
      if (levels.levels > 0) this.audio.sfx('win');
    } finally {
      setTimeout(() => { this._completing = false; }, 500);
    }
  }

  /* ---------------------------------------------------------------- */
  /* Quidditch flow                                                    */
  /* ---------------------------------------------------------------- */

  startCampaign() {
    const t = this.state.quidditch.tournament;
    if (t && !t.champion && !t.eliminated) {
      this.ui.go('quid');
      return;
    }
    const nation = NATIONS.find(n => n.id === this.state.profile.nation) || NATIONS[0];
    resetTournament(this.state);
    startTournament(this.state, nation.id, this.sel.qDifficulty);
    this.save();
    this.audio.sfx('whistle');
    this.ui.rerender();
    this.ui.toast('World Cup draw complete', `${nation.name} enter the quarter-final`, 'quaffle');
  }

  startMatch(config) {
    this.ui.closeModal();
    this.leaveGame();
    const t = this.state.quidditch.tournament;
    const fixture = currentFixture(this.state);
    if (!t || !fixture) {
      this.ui.toast('No fixture available', 'Enter the World Cup to begin a campaign', 'quaffle');
      this.ui.go('quid');
      return;
    }
    const cfg = config || {
      nationId: t.nation,
      opponentId: fixture.opponentId,
      round: fixture.round,
      roundName: fixture.roundName,
      difficulty: t.difficulty,
      role: this.sel.role,
      tactics: this.sel.tactics,
    };
    this.lastMatchConfig = cfg;
    this.mode = 'quidditch';
    this.paused = false;
    try {
      this.active = new QuidditchMatch(this, cfg);
      this.ui.renderChrome();
      this.audio.init();
    } catch (err) {
      console.error(err);
      this.ui.toast('Unable to start match', String(err.message || err), 'close');
      this.mode = 'menu';
      this.ui.go('quid');
    }
  }

  completeQuidditch(summary) {
    const t = this.state.quidditch.tournament;
    const round = summary.round;
    const result = completeTournamentMatch(this.state, summary.scoreFor, summary.scoreAgainst);
    const reward = tournamentMatchRewards(round, summary.won);
    if (result.champion) {
      reward.galleons += 1000;
      reward.xp += 400;
      reward.ranking += 100;
    }
    recordQuidditch(this.state, {
      won: summary.won,
      goals: summary.goals,
      saves: summary.saves,
      bludgers: summary.bludgers,
      snitch: summary.snitch,
      opponentId: summary.opponentId,
      opponentName: summary.opponentName,
      nationName: summary.nationName,
      roundName: summary.roundName,
      scoreFor: summary.scoreFor,
      scoreAgainst: summary.scoreAgainst,
    });
    const levels = award(this.state, reward);
    const achievements = checkAchievements(this.state);
    this.save();
    this.ui.renderChrome();
    const next = currentFixture(this.state);
    this.ui.showQuidditchResults(summary, reward, {
      levels: levels.levels,
      achievements,
      tournament: this.state.quidditch.tournament,
      nextFixture: next,
      champion: result.champion,
      eliminated: result.eliminated,
    });
    this.audio.setMode('menu');
    if (summary.won) this.audio.sfx('win');
    else this.audio.sfx('lose');
  }

  nextQuidMatch() {
    this.ui.closeModal();
    this.startMatch();
  }

  newQuidCampaign() {
    this.leaveGame();
    this.ui.closeModal();
    resetTournament(this.state);
    this.startCampaign();
    this.ui.go('quid');
  }

  /* ---------------------------------------------------------------- */
  /* Pause / restart                                                   */
  /* ---------------------------------------------------------------- */

  pauseGame() {
    if (!this.active || this.paused || this.active.phase === 'done' || this.active.phase === 'finished') return;
    this.paused = true;
    this.input.clear();
    this.ui.showPause(this.mode === 'quidditch' ? this.active : null);
  }

  resumeGame() {
    this.paused = false;
    this.ui.closeModal();
    this.audio.init();
  }

  quitGame() { this.leaveGame(); this.ui.go('home'); }

  restartCurrent() {
    const isQuid = this.mode === 'quidditch';
    const raceCfg = this.lastRaceConfig ? { ...this.lastRaceConfig } : null;
    const matchCfg = this.lastMatchConfig ? { ...this.lastMatchConfig } : null;
    this.ui.closeModal();
    this.leaveGame();
    if (isQuid && matchCfg) this.startMatch(matchCfg);
    else if (raceCfg) this.startRace(raceCfg);
    else this.go('home');
  }
}

/* ================================================================== */
/* Boot                                                               */
/* ================================================================== */

const game = new Game();
window.addEventListener('pointerdown', () => game.audio.init(), { once: true });
