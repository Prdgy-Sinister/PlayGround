import * as THREE from '../vendor/three.module.js';
import { DRAGON_MAP, DRAGON_MAP as DM, FAMILY_ORDER, TRACK_MAP, LEAGUES, EXPLORE_ZONES, RIVAL_NAMES, AI_DRAGONS } from './data.js';
import { createDragon } from './dragon.js';
import { buildMenuWorld, buildHangarStage, buildDragonSanctuary, buildVillageWorld, buildRaceWorld, buildExploreWorld, glowTexture, setGateActive, makePickup } from './environment.js';
import * as Save from './save.js';
import { sfx, setAudioEnabled, unlockAudio } from './audio.js';

const clamp = THREE.MathUtils.clamp;
const lerp = THREE.MathUtils.lerp;
const V = () => new THREE.Vector3();

export class Game {
  constructor(container) {
    this.container = container;
    this.renderer = new THREE.WebGLRenderer({
      antialias: window.devicePixelRatio < 2, powerPreference: 'high-performance', alpha: false,
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.04;
    this.renderer.shadowMap.enabled = false;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(this.renderer.domElement);
    this.renderer.domElement.classList.add('game-canvas');

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(64, 1, 0.5, 2200);
    this.scene.add(this.camera);
    this.clock = new THREE.Clock();
    this.handlers = new Map();
    this.mode = 'boot';
    this.quality = 'high';
    this.paused = false;
    this.world = null;
    this.player = null;
    this.playerModel = null;
    this.ai = [];
    this.trailLines = [];
    this.streakPoints = null;
    this.cameraTarget = new THREE.Vector3(0, 30, 0);
    this.cameraPos = new THREE.Vector3(0, 40, 160);
    this.camShake = 0;
    this.elapsed = 0;
    this.hudClock = 0;
    this.fps = 60;
    this._fpsAccum = 0; this._fpsFrames = 0;
    this.villageLots = [];
    this.villageDragons = [];
    this.drag = { active: false, x: 0, y: 0, startX: 0, startY: 0, moved: 0 };
    this.hangarSpin = 0;
    this.hangarOrbit = { yaw: 0, pitch: 0.24, dist: 17 };
    this.hangarFocus = { type: 'dragon' };
    this.hangarTarget = new THREE.Vector3(0, 3.2, 0);
    this.hangarAmbient = [];
    this.hangarPickables = [];
    this.hangarReact = 0;
    this.pointers = new Map();
    this.pinchDist = 0;

    const hemi = new THREE.HemisphereLight(0xbfe9ff, 0x3b4a3a, 1.55);
    this.hemi = hemi; this.scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xfff1d0, 2.1);
    sun.position.set(-120, 190, 130);
    this.sun = sun; this.scene.add(sun);
    const rim = new THREE.DirectionalLight(0x9fe8ff, 0.85);
    rim.position.set(140, -60, -180);
    this.rim = rim; this.scene.add(rim);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.18));

    this.flight = this.freshFlight();
    this.input = { steerX: 0, steerY: 0, boost: false, brake: false };
    this.quality = this.detectQuality();
    this.applyQuality(this.quality);
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.setupPointer();
    this.setupKeys();
    this.last = performance.now();
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  // ── events ────────────────────────────────────────────────────────────────
  on(name, fn) { if (!this.handlers.has(name)) this.handlers.set(name, []); this.handlers.get(name).push(fn); return () => this.off(name, fn); }
  off(name, fn) { const a = this.handlers.get(name); if (a) this.handlers.set(name, a.filter(f => f !== fn)); }
  emit(name, data) { const a = this.handlers.get(name); if (a) a.forEach(fn => { try { fn(data); } catch (e) { console.error(e); } }); }

  detectQuality() {
    if (Save.S()?.settings?.quality && Save.S().settings.quality !== 'auto') return Save.S().settings.quality;
    const mobile = /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
    const lowMem = navigator.deviceMemory && navigator.deviceMemory <= 4;
    return mobile || lowMem ? 'medium' : 'high';
  }

  applyQuality(q) {
    this.quality = q;
    const pr = q === 'high' ? Math.min(window.devicePixelRatio, 2) : q === 'medium' ? Math.min(window.devicePixelRatio, 1.4) : 1;
    this.renderer.setPixelRatio(pr);
    this.renderer.setSize(this.container.clientWidth || window.innerWidth, this.container.clientHeight || window.innerHeight, false);
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    if (Save.S()) { Save.S().settings.quality = q; Save.save(); }
  }

  resize() {
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    // Keep the sanctuary framed sensibly across orientation changes.
    const narrow = window.innerWidth < 900;
    if (this.mode === 'hangar' && narrow !== this.hangarNarrow) {
      this.hangarNarrow = narrow;
      this.hangarOrbit.dist = narrow ? 24 : 17;
      this.hangarOrbit.pitch = narrow ? 0.16 : 0.2;
    }
  }

  freshFlight() {
    return {
      speed: 55, yaw: 0, pitch: 0, roll: 0, controlX: 0, controlY: 0, stamina: 100, staminaMax: 100,
      boosting: false, boostLatch: false, abilityCd: 0, maneuverCd: 0, shield: 0,
      effectTimer: 0, slowTimer: 0, dashTimer: 0, galeTimer: 0, rollSpin: 0, rollSpinT: 0,
      accelStat: 70, turn: 1.5, topSpeed: 72, boostMult: 1.35, boostCost: 18, regen: 7,
      distance: 0, gliding: false,
    };
  }

  // ── scene lifecycle ──────────────────────────────────────────────────────
  clearScene() {
    this.ai.forEach(a => this.disposeDragon(a.model));
    this.ai = [];
    this.villageDragons.forEach(d => this.disposeDragon(d));
    this.villageDragons = [];
    this.hangarAmbient.forEach(d => this.disposeDragon(d));
    this.hangarAmbient = [];
    this.hangarPickables = [];
    this.disposeDragon(this.villageFlyer);
    this.villageFlyer = null;
    this.villageLots = [];
    this.disposeDragon(this.menuExtra);
    this.menuExtra = null;
    if (this.abilityRing) { this.scene.remove(this.abilityRing); this.abilityRing.geometry.dispose(); this.abilityRing.material.dispose(); this.abilityRing = null; }
    this.disposeDragon(this.playerModel);
    this.playerModel = null;
    if (this.world) { this.world.dispose?.(); this.scene.remove(this.world.group); this.world = null; }
    this.removeTrails();
    if (this.streakPoints) { this.scene.remove(this.streakPoints); this.streakPoints.geometry.dispose(); this.streakPoints.material.dispose(); this.streakPoints = null; }
    this.scene.fog = null;
  }

  disposeDragon(model) {
    if (!model) return;
    const seenMats = new Set();
    model.group.traverse(o => {
      if (o.geometry && o.geometry.userData?.dyn) o.geometry.dispose?.();
      if (o.material && !seenMats.has(o.material)) { seenMats.add(o.material); o.material.dispose?.(); }
    });
    model.group.parent?.remove(model.group);
  }

  setFog(pal, near = 260, far = 1250) {
    this.scene.fog = new THREE.Fog(new THREE.Color(pal.fog), near, far);
    this.scene.background = new THREE.Color(pal.skyBottom);
  }

  makePlayerModel({ scale = 1.3, rider = true, dragonId, level, cosmetics } = {}) {
    const id = dragonId || Save.S().selected;
    const def = DM[id];
    const d = Save.S().dragons[id];
    const model = createDragon(def, {
      level: level ?? d?.level ?? 1,
      cosmetics: cosmetics ?? d?.cosmetics ?? Save.S().cosmetics.equipped,
      outfitId: Save.S().cosmetics.equipped.outfit,
      rider,
      castShadow: false,
    });
    model.group.scale.setScalar(scale);
    this.scene.add(model.group);
    if (rider) {
      const blob = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), color: '#1a2530', transparent: true, opacity: 0.22, depthWrite: false }));
      blob.scale.set(5, 2.2, 1); blob.position.y = -2.8;
      model.group.add(blob);
    }
    return model;
  }

  // ── MENU ─────────────────────────────────────────────────────────────────
  showMenu() {
    this.clearScene();
    const w = buildMenuWorld(this.quality);
    this.scene.add(w.group);
    this.world = w;
    this.setFog({ fog: '#cfe8e2' }, 220, 1300);
    this.mode = 'menu';
    this.paused = false;
    this.playerModel = this.makePlayerModel({ scale: 1.9, rider: true });
    this.player = this.playerModel.group;
    this.cine = { angle: 0.4, radius: 82, y: 46, speed: 0.055 };
    this.flight = this.freshFlight();
    this.flight.speed = 62;
    this.hemi.color.set('#c9ecff'); this.hemi.groundColor.set('#4a5d40');
    this.sun.color.set('#fff0cc'); this.sun.intensity = 2.0;
    // Frame the dragon from the very first frame. The slow orbit then reads as
    // a gentle cinematic drift rather than the camera hunting for its target.
    const a0 = this.cine.angle;
    this.player.position.set(Math.cos(a0) * this.cine.radius, this.cine.y + Math.sin(a0 * 2.2) * 5, Math.sin(a0) * this.cine.radius);
    const camA0 = a0 - 0.24;
    this.cameraPos.set(Math.cos(camA0) * 95, 50 + Math.sin(a0 * 1.3) * 6, Math.sin(camA0) * 95);
    this.cameraTarget.copy(this.player.position).add(V().set(0, 2, 0));
    this.emit('screen', { name: 'menu' });
  }

  updateMenu(dt) {
    this.cine.angle += dt * this.cine.speed;
    const a = this.cine.angle;
    const p = this.player;
    p.position.set(Math.cos(a) * this.cine.radius, this.cine.y + Math.sin(a * 2.2) * 5, Math.sin(a) * this.cine.radius);
    const fwd = V().set(-Math.sin(a + Math.PI / 2), 0, -Math.cos(a + Math.PI / 2)).normalize();
    // tangent direction for circular orbit (counter-clockwise)
    fwd.set(-Math.sin(a), 0, Math.cos(a)).normalize();
    const yaw = Math.atan2(-fwd.x, -fwd.z);
    p.rotation.order = 'YXZ';
    p.rotation.set(-0.06, yaw, -0.35, 'YXZ');
    this.playerModel.update(dt, { speed: 68, bank: 0.6, flying: true, pitchLean: 0.1 });
    const camA = a - 0.24;
    const desired = V().set(Math.cos(camA) * 95, 50 + Math.sin(a * 1.3) * 6, Math.sin(camA) * 95);
    this.cameraPos.lerp(desired, Math.min(1, dt * 1.6));
    const look = p.position.clone().add(V().set(0, 2, 0));
    this.cameraTarget.lerp(look, Math.min(1, dt * 2.2));
    this.applyCamera(64, true);
    this.world.update(dt, this.player.position);
  }

  // ── DRAGON SANCTUARY / HANGAR ────────────────────────────────────────────
  showHangar(dragonId = Save.S().selected) {
    this.clearScene();
    const id = Save.S().dragons[dragonId] ? dragonId : Save.S().selected;
    const w = buildDragonSanctuary('hearthfall', this.quality);
    this.scene.add(w.group); this.world = w;
    this.setFog({ fog: '#cfe2e8' }, 190, 1150);
    this.mode = 'hangar';
    this.paused = false;
    this.hangarSpin = 0;
    this.hangarReact = 1;
    this.hangarFocus = { type: 'dragon' };
    this.hangarNarrow = window.innerWidth < 900;
    this.hangarOrbit = this.hangarNarrow
      ? { yaw: 0.2, pitch: 0.16, dist: 24 }
      : { yaw: 0.18, pitch: 0.2, dist: 17 };
    this.hangarAmbient = [];
    this.setHangarDragon(id);
    this.populateHangar();
    this.hangarPickables = [w.training, w.feeding, ...w.pads, this.playerModel.group, ...this.hangarAmbient.map(a => a.group)];
    const target = new THREE.Vector3(w.focus.x, w.focus.y + this.hangarFocusHeight(), w.focus.z);
    this.hangarTarget.copy(target);
    this.cameraTarget.copy(target);
    this.cameraPos.copy(target).add(this.hangarCameraOffset());
    this.hemi.color.set('#ffe8c8'); this.hemi.groundColor.set('#3c3028');
    this.hemi.intensity = 1.75;
    this.sun.color.set('#ffd9a0'); this.sun.intensity = 2.35;
    this.emit('screen', { name: 'hangar' });
  }

  hangarCameraOffset(o = this.hangarOrbit) {
    return V().set(
      Math.sin(o.yaw) * Math.cos(o.pitch),
      Math.sin(o.pitch),
      Math.cos(o.yaw) * Math.cos(o.pitch),
    ).multiplyScalar(o.dist);
  }

  // Narrow screens show the sanctuary through a shorter window between the
  // header and the roster, so the dragon is framed smaller and a little higher.
  hangarFocusHeight() { return this.hangarNarrow ? 1.35 : 2.7; }

  setHangarDragon(id) {
    const d = Save.S().dragons[id];
    const def = DM[id];
    if (!def) return;
    this.hangarDragonId = id;
    const model = createDragon(def, {
      level: d?.level ?? 1, cosmetics: d?.cosmetics, rider: false, castShadow: false,
    });
    model.group.scale.setScalar(1.62);
    this.scene.add(model.group);
    // Ground it precisely on the central dais, whatever its species proportions.
    const box = new THREE.Box3().setFromObject(model.group);
    const focus = this.world?.focus || new THREE.Vector3(0, 1.22, 0);
    model.group.position.set(focus.x, focus.y - box.min.y, focus.z);
    model.group.rotation.order = 'YXZ';
    model.group.rotation.set(0, Math.PI + 0.18, 0);
    model.group.userData.dragonId = id;
    model.group.userData.interact = { type: 'dragon', id };
    model.update(0.016, { flying: false, grounded: true, walk: 0.25 });
    this.playerModel = model;
    this.player = model.group;
  }

  // Hard LOD for background roost dragons: at habitat distance the nostrils,
  // claws and teeth are sub-pixel, so drop every mesh smaller than ~2% of the
  // body height. Eyes are preserved so blinking still reads. This cuts dozens
  // of draw calls per ambient dragon on mobile without any visible change.
  simplifyDragon(model, threshold = 0.022) {
    const keep = new Set(model.group.userData.eyeMeshes || []);
    const box = new THREE.Box3().setFromObject(model.group);
    const h = Math.max(0.001, box.max.y - box.min.y);
    const drop = [];
    model.group.traverse(o => {
      if (!o.isMesh || keep.has(o)) return;
      o.geometry.computeBoundingSphere();
      const r = (o.geometry.boundingSphere?.radius || 0) * Math.max(o.scale.x, o.scale.y, o.scale.z);
      if (r > 0 && r < h * threshold) drop.push(o);
    });
    drop.forEach(o => o.parent?.remove(o));
    this.hangarLodSaved = (this.hangarLodSaved || 0) + drop.length;
    return drop.length;
  }

  populateHangar() {
    if (!this.world?.anchors) return;
    const selected = this.hangarDragonId || Save.S().selected;
    const seen = new Set();
    const best = new Map();
    for (const [id, d] of Object.entries(Save.S().dragons)) {
      if (id === selected) continue;
      const def = DM[id];
      if (!def) continue;
      const fam = def.family || 'forest';
      if (seen.has(fam)) continue;
      // Prefer the most experienced dragon for each habitat.
      const prev = best.get(fam);
      if (!prev || d.level > prev.level) best.set(fam, { id, d, def, level: d.level ?? 1 });
    }
    // Ambient roost dragons are the most expensive part of the sanctuary, so
    // scale how many habitats are occupied to the device tier. The selected
    // dragon always stands in its own roost regardless of this cap.
    const cap = { low: 4, medium: 6, high: 10 }[this.quality] ?? 8;
    const ordered = [...best.entries()].sort(
      (a, b) => (FAMILY_ORDER.indexOf(a[0]) + 1 || 99) - (FAMILY_ORDER.indexOf(b[0]) + 1 || 99)
    ).slice(0, cap);
    for (const [fam, entry] of ordered) {
      const anchor = this.world.anchors.find(a => a.family === fam);
      if (!anchor) continue;
      const model = createDragon(entry.def, { level: entry.level, cosmetics: entry.d.cosmetics, rider: false, castShadow: false });
      model.group.scale.setScalar(1.12);
      this.scene.add(model.group);
      const b = new THREE.Box3().setFromObject(model.group);
      model.group.position.set(anchor.position.x, anchor.position.y - b.min.y, anchor.position.z);
      model.group.rotation.y = anchor.rotation;
      model.group.userData.dragonId = entry.id;
      this.simplifyDragon(model);
      this.hangarAmbient.push(model);
      seen.add(fam);
    }
  }

  refreshHangarModel() {
    if (this.mode !== 'hangar' || !this.playerModel) return;
    const id = this.hangarDragonId || Save.S().selected;
    this.disposeDragon(this.playerModel);
    this.setHangarDragon(id);
    this.hangarAmbient.forEach(d => this.disposeDragon(d));
    this.hangarAmbient = [];
    this.populateHangar();
    this.hangarPickables = [this.world.training, this.world.feeding, ...this.world.pads, this.playerModel.group, ...this.hangarAmbient.map(a => a.group)];
    this.hangarReact = 1;
  }

  focusHangarHabitat(family) {
    if (this.mode !== 'hangar' || !this.world) return;
    const anchor = this.world.anchors.find(a => a.family === family);
    if (!anchor) return;
    this.hangarFocus = { type: 'habitat', family };
    this.hangarOrbit.yaw = Math.atan2(-anchor.position.x, -anchor.position.z);
    this.hangarOrbit.dist = this.hangarNarrow ? 21 : 18;
    this.hangarOrbit.pitch = this.hangarNarrow ? 0.18 : 0.22;
  }

  focusHangarDragon() {
    this.hangarFocus = { type: 'dragon' };
    this.hangarOrbit.yaw = this.hangarNarrow ? 0.2 : 0.18;
    this.hangarOrbit.dist = this.hangarNarrow ? 24 : 17;
    this.hangarOrbit.pitch = this.hangarNarrow ? 0.16 : 0.2;
  }

  focusHangarStation(station) {
    if (this.mode !== 'hangar' || !this.world) return;
    const node = station === 'training' ? this.world.training : this.world.feeding;
    if (!node) return;
    this.hangarFocus = { type: 'station', station };
    // Frame the working side of each station rather than its back wall.
    if (station === 'feeding') {
      this.hangarOrbit.yaw = 0.34;
      this.hangarOrbit.pitch = this.hangarNarrow ? 0.2 : 0.09;
      this.hangarOrbit.dist = this.hangarNarrow ? 34 : 30;
    } else {
      this.hangarOrbit.yaw = -0.5;
      this.hangarOrbit.pitch = this.hangarNarrow ? 0.36 : 0.38;
      this.hangarOrbit.dist = this.hangarNarrow ? 36 : 32;
    }
  }

  reactDragon(kind = 'pet') {
    this.hangarReact = kind === 'feed' ? 1 : kind === 'train' ? 0.85 : 0.7;
    if (this.playerModel) this.playerModel.group.userData.reactKind = kind;
  }

  updateHangar(dt) {
    this.hangarSpin += dt * 0.12;
    this.hangarReact = Math.max(0, this.hangarReact - dt * 0.65);
    const excite = this.hangarReact;
    if (this.playerModel) {
      this.playerModel.update(dt, {
        flying: false, grounded: true, walk: 0.24, excite,
        headTurn: Math.sin(this.elapsed * 0.34) * 0.65,
      });
    }
    this.hangarAmbient.forEach((m, i) => {
      m.update(dt, { flying: false, grounded: true, walk: 0.12, excite: 0, headTurn: Math.sin(this.elapsed * 0.33 + i * 1.7) * 0.4 });
    });
    const w = this.world;
    let target;
    if (this.hangarFocus.type === 'habitat') {
      const anchor = w.anchors.find(a => a.family === this.hangarFocus.family) || w.anchors[0];
      target = V().set(anchor.position.x, anchor.position.y + (this.hangarNarrow ? 1.4 : 2.2), anchor.position.z);
    } else if (this.hangarFocus.type === 'station') {
      const node = this.hangarFocus.station === 'training' ? w.training : w.feeding;
      target = V().set(node.position.x, this.hangarFocus.station === 'feeding' ? 2.6 : 2.1, node.position.z);
    } else {
      target = V().set(w.focus.x, w.focus.y + this.hangarFocusHeight(), w.focus.z);
    }
    this.hangarTarget.lerp(target, Math.min(1, dt * 4));
    const desired = V().copy(this.hangarTarget).add(this.hangarCameraOffset());
    this.cameraPos.lerp(desired, Math.min(1, dt * 6));
    this.cameraTarget.lerp(this.hangarTarget, Math.min(1, dt * 5));
    this.applyCamera(50, true);
    this.world.update(dt, this.hangarTarget);
  }

  // ── VILLAGE ──────────────────────────────────────────────────────────────
  showVillage() {
    this.clearScene();
    const w = buildVillageWorld(Save.S().village, this.quality);
    this.scene.add(w.group); this.world = w;
    this.villageLots = w.lots;
    this.setFog({ fog: '#cfe8e2' }, 220, 1200);
    this.mode = 'village';
    this.paused = false;
    this.villageAngle = 0.62;
    this.player = null;
    // populate dragon roosts
    const owned = Object.keys(Save.S().dragons).slice(0, 6);
    owned.forEach((id, i) => {
      const lot = w.lots[1] || w.lots[0];
      const level = Save.S().village.habitat || 0;
      const a = (i / Math.max(1, owned.length)) * Math.PI * 2;
      const radius = lot ? (level > 0 ? 8 : 0) : 0;
      const model = createDragon(DM[id], {
        level: Save.S().dragons[id].level, cosmetics: Save.S().dragons[id].cosmetics,
        rider: false, castShadow: false,
      });
      model.group.scale.setScalar(0.55);
      if (lot) {
        model.group.position.set(lot.position.x + Math.cos(a) * radius, lot.position.y + 2.5 + (i % 3) * 0.6, lot.position.z + Math.sin(a) * radius);
      } else {
        model.group.position.set(-20 + i * 9, 18, 25);
      }
      model.group.rotation.y = a;
      this.scene.add(model.group);
      this.villageDragons.push(model);
    });
    // player's dragon circling above
    this.villageFlyer = this.makePlayerModel({ scale: 0.8, rider: false });
    this.villageFlyer.group.position.set(0, 50, 0);
    this.villageFlyerAngle = 0;
    this.villageFlyer.userData = this.villageFlyer;
    this.hemi.color.set('#d6f0ff'); this.hemi.groundColor.set('#546b45');
    this.sun.color.set('#fff0ce'); this.sun.intensity = 2.1;
    const a0 = this.villageAngle;
    this.cameraPos.set(Math.cos(a0) * 130, 62 + Math.sin(a0 * 0.7) * 12, Math.sin(a0) * 130);
    this.cameraTarget.set(0, 4, 0);
    this.emit('screen', { name: 'village' });
  }

  updateVillage(dt) {
    this.villageAngle += dt * 0.035;
    if (this.drag.active) this.villageAngle += this.drag.dx * 0.003;
    const desired = V().set(Math.cos(this.villageAngle) * 130, 62 + Math.sin(this.villageAngle * 0.7) * 12, Math.sin(this.villageAngle) * 130);
    this.cameraPos.lerp(desired, Math.min(1, dt * 1.4));
    this.cameraTarget.lerp(V().set(0, 4, 0), Math.min(1, dt * 2));
    this.applyCamera(52, true);
    this.world.update(dt, this.cameraTarget);
    this.villageDragons.forEach((m, i) => {
      m.update(dt, { speed: 10, flying: true, flapSpeed: 1.6 + i * 0.1, bank: 0 });
      m.group.position.y += Math.sin(this.elapsed * 1.1 + i) * dt * 0.35;
    });
    if (this.villageFlyer) {
      this.villageFlyerAngle += dt * 0.16;
      const a = this.villageFlyerAngle;
      const g = this.villageFlyer.group;
      g.position.set(Math.cos(a) * 78, 54 + Math.sin(a * 2) * 6, Math.sin(a) * 78);
      g.rotation.order = 'YXZ';
      g.rotation.set(-0.05, Math.atan2(-Math.sin(a + Math.PI / 2), -Math.cos(a + Math.PI / 2)), -0.3);
      this.villageFlyer.update(dt, { speed: 52, flying: true, bank: 0.45, flapSpeed: 5 });
    }
  }

  // ── EXPLORE ──────────────────────────────────────────────────────────────
  showExplore(zoneId) {
    this.clearScene();
    const es = Save.exploreState(zoneId);
    if (!es.visited) {
      es.visited = 1;
      Save.save();
    }
    const w = buildExploreWorld(zoneId, { orbs: es.orbs, hidden: es.hidden }, this.quality);
    this.scene.add(w.group); this.world = w;
    this.explore = { zoneId, orbs: w.orbs, total: w.orbPositions.length, collected: es.orbs.length, nearLair: false, lair: w.lair, promptShown: false };
    this.setFog(w.palette, 300, 1300);
    this.mode = 'explore';
    this.paused = false;
    this.flight = this.freshFlight();
    this.abilityType = null;
    const st = Save.statsOf(Save.S().selected);
    Object.assign(this.flight, { stamina: st.staminaMax, staminaMax: st.staminaMax, topSpeed: st.topSpeed, accelStat: st.accel, turn: st.turn, boostMult: st.boostMult, boostCost: st.boostCost, regen: st.regen });
    this.playerModel = this.makePlayerModel({ scale: 1.3, rider: true, blob: true });
    this.player = this.playerModel.group;
    this.player.position.copy(w.spawn);
    this.flight.yaw = 0; this.flight.pitch = -0.08;
    this.flight.speed = 50;
    this.cameraPos.copy(w.spawn).add(V().set(0, 6, 22));
    this.cameraTarget.copy(w.spawn);
    this.hemi.color.set(new THREE.Color('#cfefff')); this.hemi.groundColor.set(new THREE.Color('#4f5b3f'));
    this.sun.color.set(new THREE.Color(w.palette.sun)); this.sun.intensity = 2.0;
    this.emit('screen', { name: 'explore', zone: w.zone });
    this.emitExplore();
  }

  updateExplore(dt) {
    this.updateFlight(dt, { free: true });
    const p = this.player.position;
    // collectibles
    const orbList = this.explore.orbs;
    for (let i = orbList.length - 1; i >= 0; i--) {
      const o = orbList[i];
      if (p.distanceTo(o.position) < 9) {
        const idx = o.userData.orbIndex;
        this.world.group.remove(o);
        orbList.splice(i, 1);
        const es = Save.exploreState(this.explore.zoneId);
        if (!es.orbs.includes(idx)) es.orbs.push(idx);
        this.explore.collected = es.orbs.length;
        Save.awardCoins(90);
        Save.addRiderXp(20);
        Save.recordStat('orbs', 1);
        sfx('pickup');
        this.emit('pickup', { text: 'Sky shard found!', sub: '+90 coins', kind: 'orb' });
        this.emitExplore();
      }
    }
    // lair
    const lair = this.explore.lair;
    const near = lair && lair.visible && p.distanceTo(lair.position) < 22;
    if (near !== this.explore.nearLair) {
      this.explore.nearLair = near;
      this.emitExplore();
    }
    // bounds
    const dist = Math.hypot(p.x, p.z);
    if (dist > 820) {
      const k = 820 / dist;
      p.x *= k; p.z *= k;
      this.flight.speed *= 0.98;
      if (!this.warned) { this.warned = true; this.emit('notice', { text: 'The winds grow wild — turn back to the isles.', kind: 'warn' }); setTimeout(() => { this.warned = false; }, 4000); }
    }
    p.y = clamp(p.y, -10, 230);
    this.updateFlightVisuals(dt);
    this.updateChaseCamera(dt, 13, 4.6, 70);
    this.world.update(dt, p);
  }

  emitExplore() {
    if (!this.explore) return;
    let near = 9999;
    this.explore.orbs.forEach(o => { near = Math.min(near, this.player.position.distanceTo(o.position)); });
    const lair = this.explore.lair;
    const lairDist = lair && lair.visible ? this.player.position.distanceTo(lair.position) : null;
    this.emit('explore', {
      zone: this.explore.zoneId, shards: this.explore.collected, total: this.explore.total,
      nearLair: this.explore.nearLair, nearest: near, lairDist,
      lairDragon: this.world.zone.hidden, found: Save.exploreState(this.explore.zoneId).hidden,
    });
  }

  discoverLair() {
    if (!this.explore || !this.world?.lair?.visible) return;
    if (this.player.position.distanceTo(this.world.lair.position) > 24) return;
    const zone = this.world.zone;
    const es = Save.exploreState(zone.id);
    if (es.hidden) return;
    es.hidden = true;
    const dragonId = zone.hidden;
    const isNew = Save.addDragon(dragonId, 1);
    if (!isNew) { Save.awardGems(8); Save.awardCoins(500); }
    // Seasoned explorers may draw a second, rarer species out of the same lair.
    if (Save.S().level >= (zone.reqLevel || 1) + 2) {
      const bonus = (zone.bonusHidden || []).filter(id => !Save.S().dragons[id]);
      if (bonus.length) {
        const pick = bonus[Math.floor(Math.random() * bonus.length)];
        if (Save.addDragon(pick, 1)) {
          this.emit('pickup', { text: 'Rare discovery!', sub: `${DRAGON_MAP[pick]?.name || 'A rare dragon'} joined your sanctuary.`, kind: 'dragon' });
        }
      }
    }
    Save.addRiderXp(180);
    Save.recordStat('orbs', 1);
    Save.save();
    this.world.lair.visible = false;
    this.explore.nearLair = false;
    sfx('level');
    this.emit('lairFound', { dragonId, zone: zone.id, isNew });
    this.emitExplore();
  }

  // ── RACE ─────────────────────────────────────────────────────────────────
  showRace({ trackId = 'hearthfall', mode = 'race', league = null, round = 1 }) {
    this.clearScene();
    const track = TRACK_MAP[trackId] || TRACK_MAP.hearthfall;
    const w = buildRaceWorld(trackId, this.quality);
    this.scene.add(w.group); this.world = w;
    this.setFog(w.palette, 280, 1250);
    this.mode = 'race';
    this.paused = false;
    this.race = {
      track, trackId, mode, league, round,
      state: 'countdown', countdown: 3.999, lastCountdown: 3, time: 0, lap: 1, totalLaps: mode === 'checkpoint' ? 1 : (mode === 'elimination' ? 2 : track.laps),
      nextGate: 0, gatesPassed: 0, ended: false, started: false,
      elimTimer: 20, eliminated: [], finishTimes: [], startedAt: performance.now(),
      checkTimer: mode === 'checkpoint' ? 75 : 0, score: 0, eventLog: [],
      lastGateTime: 0, perfects: 0, bestPos: 6, courseGrace: 1.5,
      lastCheckpointGate: 0, previousPlayerPosition: null, recoveryCooldown: 0,
    };
    // player
    this.playerModel = this.makePlayerModel({ scale: 1.35, rider: true, blob: true });
    this.player = this.playerModel.group;
    const g0 = w.gates[0];
    const tan = g0.tangent.clone().normalize();
    this.player.position.copy(g0.pos).addScaledVector(tan, -42).add(V().set(0, -2, 0));
    this.race.previousPlayerPosition = this.player.position.clone();
    const yaw = Math.atan2(-tan.x, -tan.z);
    this.flight = this.freshFlight();
    const st = Save.statsOf(Save.S().selected);
    Object.assign(this.flight, {
      yaw, pitch: 0.02, speed: 46, stamina: st.staminaMax, staminaMax: st.staminaMax,
      topSpeed: st.topSpeed, accelStat: st.accel, turn: st.turn, boostMult: st.boostMult,
      boostCost: st.boostCost, regen: st.regen,
    });
    this.player.rotation.order = 'YXZ';
    this.player.rotation.set(this.flight.pitch, this.flight.yaw, 0, 'YXZ');
    this.cameraPos.copy(this.player.position).add(V().set(0, 7, 18));
    // AI
    this.ai = [];
    const rivalCount = mode === 'trial' || mode === 'checkpoint' ? 0 : 5;
    const used = new Set([Save.S().selected]);
    const skillBase = league?.aiSkill ?? (0.62 + track.difficulty * 0.055);
    for (let i = 0; i < rivalCount; i++) {
      let id = AI_DRAGONS[(i + track.difficulty * 3) % AI_DRAGONS.length];
      if (used.has(id)) id = AI_DRAGONS[(i + 4) % AI_DRAGONS.length];
      used.add(id);
      const def = DM[id];
      const model = createDragon(def, { level: 4 + i + track.difficulty * 2, rider: true, cosmetics: { skin: 'default', saddle: i % 3 ? 'leather' : 'silver', armour: i === 0 ? 'plates' : 'none', wings: 'ribbons' }, outfitId: i % 2 ? 'storm' : 'ember', castShadow: false });
      model.group.scale.setScalar(1.32);
      this.scene.add(model.group);
      const skill = clamp(skillBase + (i - 2) * 0.018 + (Math.random() - 0.5) * 0.02, 0.4, 1.15);
      const startT = -0.006 + i * 0.0035;
      const lane = (i - 2) * 7.5;
      const ai = {
        id, def, model, t: startT, lap: 0, lane, lanePhase: Math.random() * 6.28,
        skill, speed: 50, name: RIVAL_NAMES[(i + 2 + track.difficulty) % RIVAL_NAMES.length],
        finished: false, finishTime: null, eliminated: false, boostT: 0, offsetY: (Math.random() - 0.5) * 3,
        progress: 0, bank: 0, slowT: 0,
      };
      const ip = w.curve.getPointAt(clamp((ai.t + 1) % 1, 0, 0.999));
      const tanA = w.curve.getTangentAt(clamp((ai.t + 1) % 1, 0, 0.999)).normalize();
      const sideA = V().set(-tanA.z, 0, tanA.x).normalize();
      ai.model.group.position.copy(ip).addScaledVector(sideA, lane).addScaledVector(tanA, -8 - i * 6);
      ai.model.group.position.y += ai.offsetY;
      ai.model.group.lookAt(ip.clone().add(tanA));
      this.ai.push(ai);
    }
    this.racers = [
      { name: Save.S().riderName, isPlayer: true, skill: 1, lap: 0, t: 0, progress: 0, eliminated: false, finished: false },
      ...this.ai,
    ];
    this.updateRanking(true);
    this.raceOutline = this.makeOutline(w.curve);
    this.emit('raceStart', {
      mode, track, league, round, racers: this.ai.length + 1,
      outline: this.raceOutline, totalLaps: this.race.totalLaps,
      playerDragon: DM[Save.S().selected],
    });
    this.emit('countdown', { value: 3 });
    this.emitHud(true);
    sfx('click');
  }

  makeOutline(curve) {
    const pts = [];
    let minX = 1e9, maxX = -1e9, minZ = 1e9, maxZ = -1e9;
    for (let i = 0; i < 64; i++) {
      const p = curve.getPointAt(i / 64);
      pts.push([p.x, p.z]);
      minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
      minZ = Math.min(minZ, p.z); maxZ = Math.max(maxZ, p.z);
    }
    const span = Math.max(maxX - minX, maxZ - minZ) || 1;
    this.race.bounds = { minX, minZ, span };
    return pts.map(([x, z]) => [(x - minX) / span, (z - minZ) / span]);
  }

  updateRace(dt) {
    const r = this.race;
    if (!r || r.ended) { this.updateAfterRace(dt); return; }
    if (this.paused) return;

    // countdown
    if (r.state === 'countdown') {
      r.countdown -= dt;
      const shown = Math.ceil(r.countdown);
      if (shown !== r.lastCountdown && shown > 0 && shown <= 3) {
        r.lastCountdown = shown; this.emit('countdown', { value: shown }); sfx('click');
      }
      this.playerModel.update(dt, { speed: 8, flying: true, flapSpeed: 5, gliding: false });
      this.updateChaseCamera(dt, 13, 4.6, 68, true);
      this.world.update(dt, this.player.position);
      if (r.countdown <= 0) {
        r.state = 'flying'; r.started = true; this.emit('countdown', { value: 0 });
        sfx('gate');
        this.emit('notice', { text: 'Go!', kind: 'go' });
      }
      this.emitHud();
      return;
    }

    r.time += dt;
    if (r.mode === 'checkpoint') {
      r.checkTimer -= dt;
      if (r.checkTimer <= 0) { this.endRace('timeout'); return; }
    }
    if (r.mode === 'elimination' && !r.eliminationDone) {
      r.elimTimer -= dt;
      if (r.elimTimer <= 0) { r.elimTimer = 20; this.eliminateLast(); }
    }

    this.updateFlight(dt);
    this.updateGates(dt);
    this.updateAI(dt);
    this.updateRanking();
    this.updateRacersVisual(dt);
    this.updateFlightVisuals(dt);
    this.updateChaseCamera(dt, 12.5, 4.4, 67);
    this.world.update(dt, this.player.position);
    this.updateRaceEffects(dt);
    this.emitHud();

    // check win
    if (this.race.lap > this.race.totalLaps && r.mode !== 'checkpoint' && !r.ended) {
      this.endRace('finish');
    }
  }

  recoverToCheckpoint(reason = 'course') {
    const r = this.race;
    const w = this.world;
    if (!r || !w?.gates?.length || !this.player) return;
    // Rewind to the last checkpoint actually passed (or the starting gate).
    const checkpointIndex = Number.isInteger(r.lastCheckpointGate) ? r.lastCheckpointGate : 0;
    const checkpoint = w.gates[checkpointIndex] || w.gates[0];
    const tangent = checkpoint.tangent.clone().normalize();
    this.player.position.copy(checkpoint.pos).addScaledVector(tangent, -30).add(V().set(0, -2, 0));
    this.flight.yaw = Math.atan2(-tangent.x, -tangent.z);
    this.flight.pitch = 0;
    this.flight.roll = 0;
    this.flight.controlX = 0;
    this.flight.controlY = 0;
    this.flight.speed = Math.max(34, Math.min(this.flight.speed * 0.72, this.flight.topSpeed * 0.9));
    this.player.rotation.set(0, this.flight.yaw, 0, 'YXZ');
    r.previousPlayerPosition = this.player.position.clone();
    r.courseGrace = 1.25;
    r.recoveryCooldown = 2;
    this.cameraPos.copy(this.player.position).add(V().set(0, 7, 18));
    this.cameraTarget.copy(this.player.position).addScaledVector(tangent, 12);
    this.camShake = 0.45;
    this.emit('notice', {
      text: reason === 'missed-gate' ? 'Missed the gate — back to checkpoint!' : 'Course recovery — back to checkpoint!',
      kind: 'warn',
    });
  }

  updateGates(dt) {
    const r = this.race;
    const w = this.world;
    if (!w || !w.gates?.length) return;
    const position = this.player.position;
    const gate = w.gates[r.nextGate % w.gates.length];
    if (!gate) return;
    r.courseGrace = Math.max(0, (r.courseGrace || 0) - dt);
    r.recoveryCooldown = Math.max(0, (r.recoveryCooldown || 0) - dt);
    const previous = r.previousPlayerPosition || position.clone();
    const previousSide = previous.clone().sub(gate.pos).dot(gate.tangent);
    const currentSide = position.clone().sub(gate.pos).dot(gate.tangent);
    const crossedForward = previousSide <= 0 && currentSide > 0;
    const crossingT = crossedForward ? previousSide / (previousSide - currentSide) : 1;
    const crossingPosition = previous.clone().lerp(position, crossingT);
    const crossingSide = crossingPosition.clone().sub(gate.pos).dot(gate.tangent);
    const offset = crossingPosition.clone().sub(gate.pos).addScaledVector(gate.tangent, -crossingSide);
    const lateralDistance = offset.length();

    if (crossedForward) {
      if (lateralDistance > gate.radius * 0.92) {
        this.recoverToCheckpoint('missed-gate');
        return;
      }
      const gm = w.gateMeshes[r.nextGate % w.gateMeshes.length];
      if (gm) setGateActive(gm, false, true);
      const perfect = lateralDistance < gate.radius * 0.45;
      r.perfects += perfect ? 1 : 0;
      r.gatesPassed++;
      Save.recordStat('gates', 1);
      if (r.mode === 'checkpoint') {
        r.score++; r.checkTimer = Math.min(95, r.checkTimer + 4.5);
        this.emit('notice', { text: perfect ? 'Perfect gate! +6s' : 'Gate! +4s', kind: 'gate' });
        if (perfect) r.checkTimer = Math.min(95, r.checkTimer + 1.5);
      } else if (perfect) {
        this.emit('notice', { text: 'Perfect line!', kind: 'gate' });
      }
      sfx('gate');
      this.flight.speed = Math.min(this.flight.speed + 4, this.flight.topSpeed * 1.6);
      this.flight.stamina = Math.min(this.flight.staminaMax, this.flight.stamina + 6);
      r.lastGateTime = r.time;
      this.emit('gateFlash', { perfect, index: r.nextGate });
      if (gate.checkpoint) r.lastCheckpointGate = r.nextGate;
      r.nextGate++;
      if (r.nextGate >= w.gates.length) {
        r.nextGate = 0;
        if (r.mode === 'checkpoint') {
          r.score += 1;
        } else {
          r.lap++;
          if (r.lap <= r.totalLaps) {
            this.emit('lap', { lap: r.lap, total: r.totalLaps });
            this.emit('notice', { text: r.lap === r.totalLaps ? 'Final lap!' : `Lap ${r.lap}`, kind: 'lap' });
            sfx('level');
          }
        }
      }
      this.activateNextGate();
    }

    // Detect a sustained departure from the route, but allow a short recovery window after launch/warp.
    if (r.courseGrace <= 0 && r.recoveryCooldown <= 0) {
      let nearest = Infinity;
      for (const courseGate of w.gates) nearest = Math.min(nearest, position.distanceToSquared(courseGate.pos));
      if (nearest > 88 * 88) {
        this.recoverToCheckpoint('course');
        return;
      }
    }
    r.previousPlayerPosition = position.clone();
    const d = position.distanceTo(gate.pos);
    // wrong way hint
    if (d > 120 && r.time - r.lastGateTime > 7) {
      if (!r.warned) { r.warned = true; this.emit('notice', { text: 'Follow the glowing rings!', kind: 'warn' }); setTimeout(() => { r.warned = false; }, 5000); }
    }
  }

  activateNextGate() {
    const w = this.world;
    if (!w.gateMeshes) return;
    const next = this.race.nextGate % w.gateMeshes.length;
    w.gateMeshes.forEach((gm, i) => setGateActive(gm, i === next, i < next));
  }

  updateAI(dt) {
    const r = this.race;
    if (!r || !this.ai.length) return;
    const puff = this.playerProgress();
    const length = this.world.length;
    this.ai.forEach((ai, i) => {
      if (ai.eliminated) return;
      if (ai.finished) {
        ai.model.update(dt, { speed: 30, gliding: true, flying: true });
        return;
      }
      // rubber-band target speed
      const aiProg = ai.lap + Math.max(0, ai.t);
      const gap = puff - aiProg;
      const rubber = clamp(gap * 0.9, -0.10, 0.13);
      let base = this.flight.topSpeed * (0.87 + ai.skill * 0.16) * (1 + rubber);
      if (r.mode === 'elimination') base *= 1.01;
      if (ai.slowT > 0) { base *= 0.72; ai.slowT -= dt; }
      if (ai.boostT > 0) { base *= 1.17; ai.boostT -= dt; }
      else if (Math.random() < dt * 0.12) ai.boostT = 1.2 + Math.random();
      ai.speed += (base - ai.speed) * Math.min(1, dt * 1.1);
      ai.t += (ai.speed * dt) / length;
      if (ai.t >= 1) { ai.t -= 1; ai.lap++; }
      if (ai.lap > r.totalLaps) {
        ai.finished = true; ai.finishTime = r.time;
        r.finishTimes.push({ name: ai.name, time: r.time, isPlayer: false });
        this.emit('rivalFinish', { name: ai.name });
        return;
      }
      const t = clamp(ai.t, 0, 0.9999);
      const p = this.world.curve.getPointAt(t);
      const tan = this.world.curve.getTangentAt(t).normalize();
      const side = V().set(-tan.z, 0, tan.x).normalize();
      const lane = ai.lane + Math.sin(this.elapsed * 0.5 + ai.lanePhase) * 3.5;
      p.addScaledVector(side, lane);
      p.y += ai.offsetY + Math.sin(this.elapsed * 0.9 + i) * 1.2;
      const prev = ai.model.group.position.clone();
      ai.model.group.position.lerp(p, Math.min(1, dt * 8));
      const dir = p.clone().sub(prev);
      if (dir.lengthSq() > 0.0001) {
        const look = p.clone().add(tan);
        ai.model.group.lookAt(look);
        // bank by turn curvature
        const tanAhead = this.world.curve.getTangentAt((t + 0.008) % 1).normalize();
        const cross = tan.x * tanAhead.z - tan.z * tanAhead.x;
        ai.bank = lerp(ai.bank, clamp(cross * 10, -0.6, 0.6), dt * 2);
        ai.model.group.rotateZ(ai.bank);
      }
      ai.model.group.scale.setScalar(1.32);
      ai.progress = ai.lap + t;
      ai.model.update(dt, { speed: ai.speed, flying: true, boosting: ai.boostT > 0, bank: ai.bank * 1.2 });
      // elimination marker
    });
    this.updateRanking();
  }

  updateRacersVisual(dt) {
    this.racers = [
      { name: Save.S().riderName, isPlayer: true, lap: this.race.lap - 1, t: this.playerProgress() - (this.race.lap - 1), progress: this.playerProgress(), eliminated: false, finished: false },
      ...this.ai,
    ];
  }

  playerProgress() {
    const r = this.race;
    const gates = this.world.gates.length;
    const next = this.world.gates[r.nextGate % gates];
    let frac = r.nextGate / gates;
    if (next) {
      const d = this.player.position.distanceTo(next.pos);
      frac = clamp(frac - d / (this.world.length / gates) * (1 / gates), 0, 1);
    }
    return (r.lap - 1) + frac;
  }

  updateRanking(force = false) {
    if (!this.race) return;
    const pp = this.playerProgress();
    this.race.playerProgress = pp;
    const list = [
      { name: Save.S().riderName, isPlayer: true, progress: pp, eliminated: false, finished: false, finishTime: null },
      ...this.ai.map(a => ({ name: a.name, isPlayer: false, progress: a.eliminated ? -99 : (a.lap + Math.max(0, a.t)), eliminated: a.eliminated, finished: a.finished, finishTime: a.finishTime })),
    ];
    list.sort((a, b) => {
      if (a.eliminated !== b.eliminated) return a.eliminated ? 1 : -1;
      if (a.finished && b.finished) return a.finishTime - b.finishTime;
      if (a.finished !== b.finished) return a.finished ? -1 : 1;
      return b.progress - a.progress;
    });
    this.race.playerPos = list.findIndex(x => x.isPlayer) + 1;
    this.race.bestPos = Math.min(this.race.bestPos || 6, this.race.playerPos);
    this.rankList = list;
    return list;
  }

  eliminateLast() {
    const r = this.race;
    const list = this.updateRanking(true);
    const last = list[list.length - 1];
    if (!last) return;
    if (last.isPlayer) {
      this.emit('notice', { text: 'You have been eliminated!', kind: 'elim' });
      this.endRace('eliminated');
      return;
    }
    const ai = this.ai.find(a => a.name === last.name);
    if (ai) {
      ai.eliminated = true;
      ai.model.group.visible = false;
      r.eliminated.push(ai.name);
      this.emit('notice', { text: `${ai.name} eliminated!`, kind: 'elim' });
      sfx('hit');
    }
    if (this.ai.filter(a => !a.eliminated && !a.finished).length === 0 && !r.ended) {
      this.endRace('finish');
    }
  }

  updateAfterRace(dt) {
    // slow orbit around player after finish
    if (!this.race || !this.player) return;
    const p = this.player.position;
    const a = performance.now() * 0.00015;
    const desired = p.clone().add(V().set(Math.cos(a) * 20, 7, Math.sin(a) * 20));
    this.cameraPos.lerp(desired, Math.min(1, dt * 1.5));
    this.cameraTarget.lerp(p.clone(), Math.min(1, dt * 2));
    this.applyCamera(55, true);
    this.playerModel?.update(dt, { speed: 58, flying: true, bank: Math.sin(a) * 0.5, flapSpeed: 4 });
    this.world?.update(dt, p);
    // let remaining AI drift
    this.ai.forEach(ai => { if (!ai.eliminated && !ai.finished) ai.model.update(dt, { speed: 55, flying: true }); });
  }

  endRace(reason = 'finish') {
    const r = this.race;
    if (!r || r.ended) return;
    r.ended = true;
    r.endReason = reason;
    const list = this.updateRanking(true);
    const playerRow = list.find(x => x.isPlayer);
    if (playerRow && reason === 'finish') { playerRow.finished = true; playerRow.finishTime = r.time; }
    const pos = reason === 'eliminated' ? this.racers.length : list.findIndex(x => x.isPlayer) + 1;
    const s = Save.S();
    const track = r.track;
    const mode = r.mode;
    // rewards
    let coins = 180 + track.difficulty * 55;
    let gems = 0;
    let xp = 65 + track.difficulty * 12;
    if (mode === 'checkpoint') {
      coins += r.score * 38;
      xp += r.score * 8;
      if (r.score >= 12) gems += 2;
    } else {
      const table = [900, 620, 440, 300, 200, 140];
      coins += table[Math.min(pos - 1, 5)] || 100;
      if (pos === 1) gems += mode === 'trial' ? 0 : 2;
      else if (pos <= 3) gems += mode === 'trial' ? 0 : 1;
      xp += Math.max(0, 7 - pos) * 14;
    }
    if (mode === 'trial') { coins = Math.round(coins * 0.9); xp += 30; }
    if (mode === 'elimination') coins = Math.round(coins * 1.08);
    const decor = Save.S().village.decor || 0;
    const decorBonus = 1 + (decor ? [0, 0.05, 0.1, 0.18][decor] : 0);
    coins = Math.round(coins * decorBonus);
    const leagueBonus = r.league ? 1 + (r.round - 1) * 0.1 : 1;
    coins = Math.round(coins * leagueBonus);
    Save.awardCoins(coins);
    if (gems) Save.awardGems(gems);
    Save.addDragonXp(s.selected, xp);
    Save.addRiderXp(Math.round(xp * 0.55));
    Save.recordStat('races', 1);
    if (mode === 'trial') Save.recordStat('trials', 1);
    if (pos === 1 && mode !== 'checkpoint') Save.recordStat('wins', 1);
    if (pos <= 3) Save.recordStat('podiums', 1);
    const prevBest = s.bestTimes[track.id];
    const timedMode = mode !== 'checkpoint' && mode !== 'elimination';
    let newBest = false;
    if (timedMode && (!prevBest || r.time < prevBest)) {
      s.bestTimes[track.id] = r.time;
      newBest = !!prevBest;
    }
    Save.save();
    const results = {
      mode, trackId: track.id, trackName: track.name, position: pos, total: this.racers.length,
      time: r.time, best: s.bestTimes[track.id], newBest, laps: Math.min(r.lap, r.totalLaps),
      gates: r.gatesPassed, score: r.score, perfects: r.perfects, coins, gems, xp,
      reason, standings: list.map((x, i) => ({ pos: i + 1, name: x.name, isPlayer: x.isPlayer, eliminated: x.eliminated, finished: x.finished, progress: x.progress })),
      league: r.league?.id || null, round: r.round, eliminatedBy: r.eliminated,
    };
    if (pos === 1 && mode !== 'trial') this.emit('notice', { text: 'Victory!', kind: 'go' });
    this.emit('raceEnd', results);
    this.emitHud(true);
  }

  // ── flight ───────────────────────────────────────────────────────────────
  forward() {
    const f = this.flight;
    return V().set(-Math.sin(f.yaw) * Math.cos(f.pitch), Math.sin(f.pitch), -Math.cos(f.yaw) * Math.cos(f.pitch));
  }

  updateFlight(dt, opts = {}) {
    const f = this.flight;
    const race = this.race;
    if (this.mode === 'race' && race && race.state !== 'flying') return;
    const ix = this.input.steerX;
    const iy = this.input.steerY;
    // Smooth small input changes without making the controls feel delayed.
    const inputBlend = 1 - Math.exp(-dt * 8.5);
    f.controlX = lerp(f.controlX, ix, inputBlend);
    f.controlY = lerp(f.controlY, iy, inputBlend);
    const steerX = f.controlX;
    const steerY = f.controlY;
    // yaw & pitch
    const speedFactor = clamp(1.05 - f.speed / (f.topSpeed * 3.2), 0.72, 1.05);
    const yawRate = f.turn * speedFactor * 0.82;
    f.yaw -= steerX * yawRate * dt;
    const pitchTargetRate = f.turn * 0.64 * speedFactor;
    f.pitch += steerY * pitchTargetRate * dt;
    if (Math.abs(steerY) < 0.1) f.pitch *= Math.exp(-dt * 0.55);
    f.pitch = clamp(f.pitch, -1.05, 1.05);
    // roll
    const rollTarget = -steerX * 0.52;
    f.roll = lerp(f.roll, rollTarget, 1 - Math.exp(-dt * 3.4));
    f.roll += f.rollSpin;
    if (f.rollSpinT > 0) { f.rollSpinT -= dt; f.rollSpin = Math.sin((1 - f.rollSpinT / 0.7) * Math.PI) * 0.9 * (f.rollSpinDir || 1); }
    else f.rollSpin = 0;
    // stamina & boost
    f.abilityCd = Math.max(0, f.abilityCd - dt);
    f.maneuverCd = Math.max(0, f.maneuverCd - dt);
    f.shield = Math.max(0, f.shield - dt);
    f.dashTimer = Math.max(0, f.dashTimer - dt);
    f.galeTimer = Math.max(0, f.galeTimer - dt);
    f.effectTimer = Math.max(0, f.effectTimer - dt);
    const wantBoost = this.input.boost && f.stamina > 2;
    if (wantBoost && !f.boosting) sfx('boost');
    f.boosting = wantBoost;
    if (f.boosting) {
      f.stamina = Math.max(0, f.stamina - f.boostCost * dt);
      this.boostAccum = (this.boostAccum || 0) + dt;
      if (this.boostAccum > 1) { Save.progressDaily('boostTime', 1); this.boostAccum = 0; }
    } else {
      f.stamina = Math.min(f.staminaMax, f.stamina + f.regen * dt);
    }
    // speed
    const sinP = Math.sin(f.pitch);
    const diveFactor = iy < -0.15 ? 1 : 0;
    let target = f.topSpeed * (1 - sinP * 0.33 + diveFactor * 0.28);
    if (f.boosting) target *= f.boostMult;
    if (f.dashTimer > 0) target *= 1.42;
    if (f.galeTimer > 0) target *= 1.16;
    if (f.shield > 0 && this.abilityType === 'aegis') target *= 1.08;
    if (this.input.brake) target *= 0.62;
    if (opts.free) target *= 0.98;
    target = Math.min(target, f.topSpeed * (f.boosting ? 1.65 : 1.35));
    const accelRate = (2.0 + f.accelStat * 0.035) * (f.boosting ? 1.5 : 1);
    f.speed += (target - f.speed) * Math.min(1, dt * accelRate);
    if (f.speed < 18) f.speed = 18;
    f.gliding = !f.boosting && Math.abs(iy) < 0.15 && Math.abs(ix) < 0.15;
    // move
    const fwd = this.forward();
    const move = fwd.multiplyScalar(f.speed * dt);
    this.player.position.add(move);
    f.distance += f.speed * dt;
    // apply orientation
    this.player.rotation.order = 'YXZ';
    this.player.rotation.set(f.pitch, f.yaw, f.roll, 'YXZ');
    // obstacles
    this.checkObstacles();
    // world bounds in free flight
    if (this.mode === 'explore') this.player.position.y = clamp(this.player.position.y, -8, 225);
    this.updateFlightVisuals(dt);
  }

  checkObstacles() {
    if (!this.world || !this.world.obstacles) return;
    if (this.flight.shield > 0) return;
    if (this.flight.hitCd > 0) { this.flight.hitCd -= 0.016; return; }
    for (const o of this.world.obstacles) {
      if (this.player.position.distanceTo(o.pos) < o.radius + 2.2) {
        this.flight.speed *= 0.58;
        this.flight.stamina = Math.max(0, this.flight.stamina - 10);
        this.flight.hitCd = 1.3;
        this.camShake = 0.9;
        sfx('hit');
        this.emit('notice', { text: 'Rocks! Watch the obstacles.', kind: 'warn' });
        this.emit('hitFlash');
        break;
      }
    }
  }

  updateFlightVisuals(dt) {
    if (!this.player || !this.playerModel) return;
    const f = this.flight;
    const bankNorm = clamp(f.roll / 0.58, -1, 1);
    this.playerModel.update(dt, {
      speed: f.speed, bank: bankNorm, boosting: f.boosting,
      flapSpeed: (f.boosting ? 11 : f.gliding ? 3.2 : 7) * (this.playerModel.flightRate || 6) / 6,
      gliding: f.gliding, flying: true, pitchLean: -f.pitch * 0.8,
      wingWOsc: Math.sin(this.elapsed * 8) * 0.2,
    });
    this.updateTrails();
  }

  useAbility() {
    const f = this.flight;
    if (f.abilityCd > 0 || !this.player) return false;
    if (this.mode !== 'race' && this.mode !== 'explore') return false;
    if (this.race && this.race.state !== 'flying' && this.mode === 'race') return false;
    const def = DM[Save.S().selected];
    const ability = def.ability;
    this.abilityType = ability.type;
    f.abilityCd = ability.cd;
    this.emit('ability', { name: ability.name, type: ability.type });
    sfx('boost');
    if (ability.type === 'dash') { f.dashTimer = 1.5; f.stamina = Math.min(f.staminaMax, f.stamina + 8); }
    else if (ability.type === 'gale') { f.galeTimer = 5; this.emit('wind'); }
    else if (ability.type === 'heal') { f.stamina = f.staminaMax; f.shield = 4; this.emit('heal'); }
    else if (ability.type === 'aegis') { f.shield = 6; }
    else if (ability.type === 'slow') {
      f.slowTimer = 5;
      this.ai.forEach(a => { a.slowT = 4.5; });
      this.emit('frost');
    } else if (ability.type === 'veil') {
      f.shield = 3.5; f.galeTimer = 2; this.ai.forEach(a => { a.slowT = 3; });
      this.emit('veil');
    }
    if (this.world) this.pulseAbilityRing(def.palette.accent);
    return true;
  }

  pulseAbilityRing(color) {
    if (this.abilityRing) { this.scene.remove(this.abilityRing); this.abilityRing.geometry.dispose(); this.abilityRing.material.dispose(); }
    const geo = new THREE.RingGeometry(2, 2.6, 32);
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
    const ring = new THREE.Mesh(geo, mat);
    ring.position.copy(this.player.position);
    ring.quaternion.copy(this.player.quaternion);
    this.scene.add(ring);
    this.abilityRing = ring; this.abilityRingLife = 0.7;
  }

  useManeuver() {
    const f = this.flight;
    if (f.maneuverCd > 0 || !this.player) return;
    if (this.race && this.race.state !== 'flying') return;
    f.maneuverCd = 3.5;
    f.rollSpinT = 0.7; f.rollSpinDir = this.input.steerX >= 0 ? 1 : -1;
    f.shield = Math.max(f.shield, 1.2);
    this.emit('maneuver');
    sfx('boost');
  }

  updateChaseCamera(dt, dist, height, fov, countdown = false) {
    if (!this.player) return;
    const f = this.flight;
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(f.pitch * 0.45, f.yaw, 0, 'YXZ'));
    const offset = V().set(0, height, dist).applyQuaternion(q);
    const desired = this.player.position.clone().add(offset);
    const k = countdown ? 2.4 : 4.6;
    this.cameraPos.lerp(desired, Math.min(1, dt * k));
    const look = this.player.position.clone().add(this.forward().multiplyScalar(11)).add(V().set(0, 0, 0));
    this.cameraTarget.lerp(look, Math.min(1, dt * 5));
    const targetFov = fov + (f.boosting ? 9 : 0) + clamp((f.speed - 55) * 0.22, -3, 6);
    this.camera.fov = lerp(this.camera.fov, targetFov, Math.min(1, dt * 3));
    this.camera.updateProjectionMatrix();
    this.applyCamera(this.camera.fov, true);
  }

  applyCamera(fov, shake = true) {
    let cp = this.cameraPos.clone();
    let ct = this.cameraTarget.clone();
    if (shake && this.camShake > 0.001) {
      cp.x += (Math.random() - 0.5) * this.camShake * 1.5;
      cp.y += (Math.random() - 0.5) * this.camShake * 1.5;
      ct.x += (Math.random() - 0.5) * this.camShake;
      this.camShake *= 0.9;
    }
    this.camera.position.copy(cp);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(ct);
    this.camera.fov = lerp(this.camera.fov, fov, 0.2);
    this.camera.updateProjectionMatrix();
  }

  // ── effects ──────────────────────────────────────────────────────────────
  setupStreaks() {
    if (this.streakPoints) return;
    const n = 55;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = -4 - Math.random() * 26;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: '#fff0c0', size: 0.16, map: glowTexture(), transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
    const pts = new THREE.Points(geo, mat);
    pts.frustumCulled = false;
    this.camera.add(pts);
    this.streakPoints = pts;
  }

  updateRaceEffects(dt) {
    this.setupStreaks();
    if (this.streakPoints) {
      const on = this.flight.boosting || this.flight.dashTimer > 0;
      this.streakPoints.material.opacity = lerp(this.streakPoints.material.opacity, on ? 0.8 : 0, Math.min(1, dt * 6));
      if (on) {
        const arr = this.streakPoints.geometry.attributes.position.array;
        for (let i = 0; i < arr.length; i += 3) {
          arr[i + 2] += dt * 140;
          if (arr[i + 2] > 3) { arr[i + 2] = -30; arr[i] = (Math.random() - 0.5) * 16; arr[i + 1] = (Math.random() - 0.5) * 10; }
        }
        this.streakPoints.geometry.attributes.position.needsUpdate = true;
      }
    }
    if (this.abilityRing) {
      this.abilityRingLife -= dt;
      this.abilityRing.scale.multiplyScalar(1 + dt * 8);
      this.abilityRing.material.opacity = Math.max(0, this.abilityRingLife * 1.1);
      if (this.abilityRingLife <= 0) { this.scene.remove(this.abilityRing); this.abilityRing.geometry.dispose(); this.abilityRing.material.dispose(); this.abilityRing = null; }
    }
    // gate distance pulse
    if (this.race?.state === 'flying') {
      const gate = this.world.gates[this.race.nextGate % this.world.gates.length];
      if (gate) {
        const d = this.player.position.distanceTo(gate.pos);
        const gm = this.world.gateMeshes[this.race.nextGate % this.world.gateMeshes.length];
        if (gm) gm.scale.setScalar(1 + Math.max(0, 1 - d / 120) * 0.04 + Math.sin(this.elapsed * 5) * 0.01);
      }
    }
  }

  updateTrails() {
    if (!this.player || !this.playerModel) return;
    if (!this.trailLines.length) this.createTrails();
    const f = this.flight;
    const show = f.boosting || f.dashTimer > 0 || f.speed > f.topSpeed * 1.05;
    const q = this.player.quaternion;
    const accent = (this.playerModel.mats.glow.color || new THREE.Color('#ffd166'));
    this.trailLines.forEach((line, side) => {
      const offset = V().set(side === 0 ? 2.6 : -2.6, 0.5, 0.4).applyQuaternion(q).add(this.player.position);
      const arr = line.geometry.attributes.position.array;
      // shift back
      for (let i = arr.length - 3; i >= 3; i -= 3) { arr[i] = arr[i - 3]; arr[i + 1] = arr[i - 2]; arr[i + 2] = arr[i - 1]; }
      arr[0] = offset.x; arr[1] = offset.y; arr[2] = offset.z;
      line.geometry.attributes.position.needsUpdate = true;
      line.material.opacity = lerp(line.material.opacity, show ? 0.55 : 0, Math.min(1, 0.12));
      line.material.color.copy(accent);
    });
  }

  createTrails() {
    this.removeTrails();
    for (let side = 0; side < 2; side++) {
      const n = 22;
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
      const colors = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        const k = 1 - i / n;
        colors[i * 3] = k; colors[i * 3 + 1] = k; colors[i * 3 + 2] = k;
      }
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const mat = new THREE.LineBasicMaterial({ color: '#ffd166', transparent: true, opacity: 0, vertexColors: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
      const line = new THREE.Line(geo, mat);
      line.frustumCulled = false;
      this.scene.add(line);
      this.trailLines.push(line);
    }
  }
  removeTrails() {
    this.trailLines.forEach(l => { this.scene.remove(l); l.geometry.dispose(); l.material.dispose(); });
    this.trailLines = [];
  }

  // ── HUD ──────────────────────────────────────────────────────────────────
  emitHud(force = false) {
    this.hudClock += 1 / 60;
    if (!force && this.hudClock < 0.09) return;
    this.hudClock = 0;
    const f = this.flight;
    if (this.mode === 'race' && this.race) {
      const r = this.race;
      const gate = this.world.gates[r.nextGate % this.world.gates.length];
      const gd = gate ? this.player.position.distanceTo(gate.pos) : 0;
      const minimap = [];
      const bounds = r.bounds || { minX: 0, minZ: 0, span: 1 };
      const norm = (x, z) => [(x - bounds.minX) / bounds.span, (z - bounds.minZ) / bounds.span];
      if (this.ai) this.ai.forEach(a => { const p = this.world.curve.getPointAt(clamp(a.t, 0, 0.999)); const nm = norm(p.x, p.z); minimap.push({ x: nm[0], z: nm[1], player: false, eliminated: a.eliminated }); });
      const pm = norm(this.player.position.x, this.player.position.z);
      this.emit('hud', {
        mode: r.mode, speed: Math.round(f.speed * 2.9), speedRaw: f.speed,
        stamina: f.stamina / f.staminaMax, boosting: f.boosting,
        position: r.playerPos || 1, total: this.racers.length,
        lap: Math.min(r.lap, r.totalLaps), totalLaps: r.totalLaps,
        time: r.time, gates: r.gatesPassed, nextGate: r.nextGate,
        gateDist: gd, countdown: r.state === 'countdown' ? Math.ceil(r.countdown) : 0,
        abilityCd: f.abilityCd, abilityMax: DM[Save.S().selected].ability.cd,
        abilityName: DM[Save.S().selected].ability.name,
        shield: f.shield, elimTimer: r.mode === 'elimination' ? r.elimTimer : 0,
        checkTimer: r.mode === 'checkpoint' ? r.checkTimer : 0,
        score: r.score, perfects: r.perfects,
        player: { x: pm[0], z: pm[1] },
        minimap, ended: r.ended,
        progress: this.playerProgress() / r.totalLaps,
        maneuverCd: f.maneuverCd,
      });
    } else if (this.mode === 'explore') {
      const nearest = this.explore?.nearest ?? 0;
      this.emit('hud', {
        mode: 'explore', speed: Math.round(f.speed * 2.9), stamina: f.stamina / f.staminaMax,
        boosting: f.boosting, shards: this.explore?.collected || 0, totalShards: this.explore?.total || 0,
        abilityCd: f.abilityCd, abilityMax: DM[Save.S().selected].ability.cd, abilityName: DM[Save.S().selected].ability.name,
        nearLair: this.explore?.nearLair, gateDist: nearest, checkTimer: 0, maneuverCd: f.maneuverCd,
      });
    }
  }

  // ── input ────────────────────────────────────────────────────────────────
  setSteer(x, y) {
    const inv = Save.S()?.settings?.invertY ? -1 : 1;
    this.input.steerX = clamp(x, -1, 1); this.input.steerY = clamp(y * inv, -1, 1);
  }
  setBoost(v) { this.input.boost = !!v; }
  setBrake(v) { this.input.brake = !!v; }
  pause(v) { this.paused = !!v; this.emit('pause', { paused: this.paused }); }

  setupKeys() {
    const down = new Set();
    const keyMap = (e) => {
      const k = e.key.toLowerCase();
      if (['arrowup', 'w'].includes(k)) return 'up';
      if (['arrowdown', 's'].includes(k)) return 'down';
      if (['arrowleft', 'a'].includes(k)) return 'left';
      if (['arrowright', 'd'].includes(k)) return 'right';
      return k;
    };
    window.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT') return;
      unlockAudio();
      const k = keyMap(e);
      if (['up', 'down', 'left', 'right', ' '].includes(k)) e.preventDefault();
      down.add(k);
      if (k === ' ') this.setBoost(true);
      if (k === 'shift') this.setBrake(true);
      if (k === 'e') { this.useAbility(); }
      if (k === 'q') this.useManeuver();
      if (k === 'escape') { this.pause(!this.paused); }
      this.applyKeys(down);
    });
    window.addEventListener('keyup', e => {
      const k = keyMap(e);
      down.delete(k);
      if (k === ' ') this.setBoost(false);
      if (k === 'shift') this.setBrake(false);
      this.applyKeys(down);
    });
    this.keys = down;
  }
  applyKeys(down) {
    let x = 0, y = 0;
    if (down.has('left')) x -= 1;
    if (down.has('right')) x += 1;
    if (down.has('up')) y += 1;
    if (down.has('down')) y -= 1;
    this.setSteer(x, y);
  }

  setupPointer() {
    const el = this.renderer.domElement;
    el.addEventListener('pointerdown', e => {
      unlockAudio();
      this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (this.pointers.size === 2) {
        const [a, b] = [...this.pointers.values()];
        this.pinchDist = Math.hypot(a.x - b.x, a.y - b.y);
        this.drag.moved = 999;
      }
      this.drag.active = true; this.drag.startX = e.clientX; this.drag.startY = e.clientY;
      this.drag.lastX = e.clientX; this.drag.lastY = e.clientY; this.drag.dx = 0; this.drag.moved = this.pointers.size > 1 ? 999 : 0;
      this.drag.id = e.pointerId;
    });
    el.addEventListener('pointermove', e => {
      if (!this.drag.active) return;
      if (this.pointers.has(e.pointerId)) this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      // pinch-to-zoom the sanctuary camera
      if (this.pointers.size >= 2) {
        const [a, b] = [...this.pointers.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (this.pinchDist > 0 && this.mode === 'hangar') {
          this.hangarOrbit.dist = clamp(this.hangarOrbit.dist * (this.pinchDist / Math.max(10, d)), 8, 34);
        }
        this.pinchDist = d;
        this.drag.moved = 999;
        return;
      }
      const dx = e.clientX - this.drag.lastX;
      const dy = e.clientY - this.drag.lastY;
      this.drag.dx = dx;
      this.drag.lastX = e.clientX; this.drag.lastY = e.clientY;
      this.drag.moved += Math.abs(dx) + Math.abs(dy);
      if (this.mode === 'hangar') {
        this.hangarOrbit.yaw -= dx * 0.006;
        this.hangarOrbit.pitch = clamp(this.hangarOrbit.pitch + dy * 0.004, 0.02, 1.05);
      } else if (this.mode === 'village') {
        this.villageAngle += dx * 0.003;
      }
    });
    const endPointer = (e) => {
      this.pointers.delete(e.pointerId);
      if (this.pointers.size < 2) this.pinchDist = 0;
      const wasDrag = this.drag.moved > 8;
      if (this.drag.id === e.pointerId) this.drag.active = false;
      if (!wasDrag) this.handleTap(e);
    };
    el.addEventListener('pointerup', endPointer);
    el.addEventListener('pointercancel', (e) => { this.pointers.delete(e.pointerId); this.drag.active = false; this.pinchDist = 0; });
    el.addEventListener('wheel', e => {
      if (this.mode === 'hangar') {
        e.preventDefault();
        this.hangarOrbit.dist = clamp(this.hangarOrbit.dist + e.deltaY * 0.012, 8, 34);
      }
    }, { passive: false });
  }

  handleTap(e) {
    if (this.mode !== 'hangar' && this.mode !== 'village') return;
    const rect = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    const ray = new THREE.Raycaster();
    ray.setFromCamera(ndc, this.camera);

    if (this.mode === 'hangar') {
      if (!this.hangarPickables.length) return;
      const hits = ray.intersectObjects(this.hangarPickables, true);
      if (!hits.length) return;
      let obj = hits[0].object;
      while (obj && !obj.userData?.interact && !obj.userData?.dragonId) obj = obj.parent;
      if (!obj) return;
      const it = obj.userData.interact;
      if (it?.type === 'dragon' || obj.userData.dragonId) {
        const id = it?.id || obj.userData.dragonId;
        sfx('click');
        if (id !== Save.S().selected && Save.S().dragons[id]) {
          Save.S().selected = id; Save.save();
          this.showHangar(id);
        } else {
          this.reactDragon('pet');
        }
        this.emit('hangarSelect', { id });
      } else if (it?.type === 'habitat') {
        sfx('click');
        this.focusHangarHabitat(it.family);
        this.emit('hangarHabitat', { family: it.family });
      } else if (it?.type === 'feeding') {
        sfx('pickup');
        this.reactDragon('feed');
        this.emit('hangarAction', { type: 'feed' });
      } else if (it?.type === 'training') {
        sfx('click');
        this.reactDragon('train');
        this.emit('hangarAction', { type: 'train' });
      }
      return;
    }

    if (!this.villageLots.length) return;
    const hits = ray.intersectObjects(this.villageLots, true);
    if (hits.length) {
      let obj = hits[0].object;
      while (obj && !this.villageLots.includes(obj)) obj = obj.parent;
      if (obj?.userData.building) {
        sfx('click');
        this.emit('lotClick', { buildingId: obj.userData.building.id });
      }
    }
  }

  // ── main loop ────────────────────────────────────────────────────────────
  loop() {
    requestAnimationFrame(this.loop);
    const now = performance.now();
    let dt = (now - this.last) / 1000;
    this.last = now;
    if (dt > 0.06) dt = 0.06;
    if (dt <= 0) dt = 0.0001;
    this.elapsed += dt;
    this._fpsAccum += dt; this._fpsFrames++;
    if (this._fpsAccum > 1) { this.fps = Math.round(this._fpsFrames / this._fpsAccum); this._fpsAccum = 0; this._fpsFrames = 0; }
    if (!this.paused) {
      if (this.mode === 'menu') this.updateMenu(dt);
      else if (this.mode === 'hangar') this.updateHangar(dt);
      else if (this.mode === 'village') this.updateVillage(dt);
      else if (this.mode === 'race') this.updateRace(dt);
      else if (this.mode === 'explore') this.updateExplore(dt);
    } else if (this.player && this.playerModel) {
      this.playerModel.update(dt * 0.2, { speed: 20, flying: true, flapSpeed: 1.5 });
      this.world?.update(dt * 0.2, this.player.position);
    }
    this.renderer.render(this.scene, this.camera);
  }
}
