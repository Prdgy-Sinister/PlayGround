import * as THREE from 'three';
import { ARENAS, ROUNDS, ROUND_IDS } from './themes.js';
import { CHARACTERS, getCharacter } from './characters.js';
import { buildCourse } from './course.js';
import { createEnvironment } from './world.js';
import { createPlayer } from './player.js';
import { createBots } from './bots.js';
import { save } from './save.js';
import { audio } from './audio.js';
import { input } from './input.js';
import { toonMat, buildCharacterMesh } from './characterRig.js';
import { WATER_Y } from './obstacles.js';
import { fmtTime, ordinal } from './ui.js';

const CHAMPIONSHIP_PLAN = [
  { round: 'qualifier', arena: 'classic' },
  { round: 'sweeper', arena: 'tropical' },
  { round: 'dizzy', arena: 'winter' },
  { round: 'sweeper', arena: 'desert' },
  { round: 'dizzy', arena: 'night' },
  { round: 'wipeout', arena: 'industrial' }
];
const CAREER_PLAN = [
  { round: 'qualifier', arena: 'classic' },
  { round: 'sweeper', arena: 'tropical' },
  { round: 'dizzy', arena: 'winter' },
  { round: 'wipeout', arena: 'industrial' }
];
const ENDLESS_PLAN_ROUNDS = ['qualifier', 'sweeper', 'dizzy', 'wipeout'];

export function createGame(renderer, ui) {
  const game = {
    renderer, ui,
    scene: null, camera: null,
    menuScene: null, gameScene: null,
    state: 'menu',
    elapsed: 0,
    raceTime: 0,
    shake: 0,
    effects: [],
    player: null,
    course: null,
    env: null,
    bots: null,
    session: null,
    config: null,
    roundInfo: null,
    splashesTotal: 0,
    rank: 1,
    totalRacers: 8,
    lastRank: 1,
    rankCooldown: 0,
    countdownTime: 0,
    lastCountdownShown: 99,
    endAt: 0,
    endKind: null,
    pausedFrom: null,
    menu: { angle: 0, characterId: 'tina', charGroup: null, env: null, orbit: 0, ballA: null, ballB: null, podium: null, spotlight: null },
    cameraLook: new THREE.Vector3(),
    menuCharacterRig: null,
    lowGfx: save.data.lowGfx,

    init() {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.lowGfx ? 1 : 1.6));
      this.camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 900);
      this.buildMenuScene();
      window.addEventListener('resize', () => this.resize());
      this.resize();
      this.setMenuCharacter(save.data.selected);
      this.scene = this.menuScene;
      requestAnimationFrame(t => this.loop(t));
    },

    resize() {
      const w = window.innerWidth, h = window.innerHeight;
      this.renderer.setSize(w, h, false);
      this.camera.aspect = w / h;
      this.camera.fov = w < 700 ? 66 : 58;
      this.camera.updateProjectionMatrix();
    },

    setLowGfx(low) {
      this.lowGfx = low;
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, low ? 1 : 1.6));
    },

    /* ============================================================
       MENU SHOWCASE SCENE
       ============================================================ */
    buildMenuScene() {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(ARENAS.classic.skyHorizon);
      scene.fog = new THREE.Fog(ARENAS.classic.fog, 60, 220);
      this.menuScene = scene;
      const env = createEnvironment(ARENAS.classic, 80, this.lowGfx ? 'low' : 'high');
      scene.add(env.group);
      this.menu.env = env;

      // podium
      const podium = new THREE.Group();
      podium.position.set(5.2, 0.1, -1.5);
      scene.add(podium);
      this.menu.podium = podium;
      const top = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.6, 1.1, 24), toonMat('#ffd23f'));
      top.position.y = 0.55;
      podium.add(top);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.12, 6, 24), toonMat('#ff5b2b'));
      ring.rotation.x = Math.PI / 2; ring.position.y = 1.1;
      podium.add(ring);
      const base = new THREE.Mesh(new THREE.CylinderGeometry(2.9, 3.2, 0.5, 24), toonMat('#1b3f5c'));
      base.position.y = 0.1;
      podium.add(base);

      // decorative inflatable rings
      for (let i = 0; i < 3; i++) {
        const r = new THREE.Mesh(new THREE.TorusGeometry(2.1 + i * 0.4, 0.7, 8, 20), toonMat(['#ff5b2b', '#2fc4ff', '#ff5fa2'][i]));
        r.position.set(-5 + i * 1.4, 1.2 + i * 1.1, -8 - i * 2.2);
        r.rotation.set(Math.PI / 2.3, i * 0.7, 0);
        scene.add(r);
        if (!this.menu.rings) this.menu.rings = [];
        this.menu.rings.push({ mesh: r, base: r.position.y, phase: i * 2 });
      }

      // two idle giant balls
      const mkBall = (x, z, r) => {
        const g = new THREE.Group();
        const ball = new THREE.Mesh(new THREE.SphereGeometry(1, 18, 14), new THREE.MeshToonMaterial({ color: '#e63946' }));
        ball.scale.setScalar(r);
        g.add(ball);
        const band = new THREE.Mesh(new THREE.TorusGeometry(r * 0.95, r * 0.1, 6, 20), toonMat('#fffaf0'));
        band.rotation.x = Math.PI / 2;
        g.add(band);
        g.position.set(x, -1 + r, z);
        scene.add(g);
        return g;
      };
      this.menu.ballA = mkBall(-9, -9, 1.7);
      this.menu.ballB = mkBall(-14, -15, 2.2);

      this.menu.cameraT = 0;
    },

    updateMenu(dt) {
      const t = this.elapsed;
      this.menu.env?.update(dt, t);
      if (this.menu.podium) this.menu.podium.rotation.y = Math.sin(t * 0.3) * 0.06;
      if (this.menu.rings) {
        this.menu.rings.forEach(r => {
          r.mesh.position.y = r.base + Math.sin(t * 1.1 + r.phase) * 0.35;
          r.mesh.rotation.z += dt * 0.15;
        });
      }
      if (this.menu.ballA) {
        this.menu.ballA.position.y = 0.7 + Math.abs(Math.sin(t * 0.9)) * 0.8;
        this.menu.ballA.children[0].rotation.y += dt * 0.4;
        this.menu.ballA.children[0].rotation.x += dt * 0.2;
      }
      if (this.menu.ballB) {
        this.menu.ballB.position.y = 1.2 + Math.abs(Math.sin(t * 0.7 + 1)) * 0.7;
        this.menu.ballB.children[0].rotation.y -= dt * 0.3;
      }
      if (this.menuCharacterRig) {
        this.menuCharacterRig.setPose('idle', t, 0, 0);
        if (this.menu.charGroup) {
          this.menu.charGroup.rotation.y = Math.PI + Math.sin(t * 0.3) * 0.5;
        }
      }
      this.menu.orbit = Math.sin(t * 0.1) * 0.55;
      const a = this.menu.orbit;
      const cam = this.camera;
      const target = new THREE.Vector3(2.4, 1.5, -1.5);
      cam.position.set(5.4 + Math.sin(a) * 10.5, 4.1 + Math.sin(t * 0.2) * 0.3, -1.5 + Math.cos(a) * 10.5);
      cam.lookAt(target);
    },

    /* ============================================================
       RUN START / SESSION
       ============================================================ */
    startRun(cfg) {
      audio.init();
      this.config = { ...cfg };
      this.splashesTotal = 0;
      this.lastRank = 99;
      const charId = save.data.unlocked.includes(cfg.characterId) ? cfg.characterId : save.data.selected;
      save.data.selected = charId;
      save.persist();
      const diff = cfg.difficulty || 1;

      if (cfg.mode === 'career') {
        const index = save.data.careerDone ? 0 : Math.max(0, Math.min(3, save.data.careerRound - 1));
        this.session = {
          type: 'career', index, plan: CAREER_PLAN, difficulty: diff,
          characterId: charId, costume: cfg.costume, accessory: cfg.accessory
        };
      } else if (cfg.mode === 'championship') {
        const playerChar = getCharacter(charId);
        const pool = CHARACTERS.filter(c => c.id !== charId).slice(0, 6);
        this.session = {
          type: 'championship', index: 0, plan: CHAMPIONSHIP_PLAN, difficulty: diff,
          characterId: charId, costume: cfg.costume, accessory: cfg.accessory,
          points: { player: 0 },
          competitors: pool.map((c, i) => ({ id: 'ai' + i, name: c.name, charId: c.id, points: 0 }))
        };
        this.session.competitors.forEach(c => { this.session.points[c.id] = 0; });
      } else if (cfg.mode === 'endless') {
        this.session = {
          type: 'endless', level: 0, difficulty: diff,
          characterId: charId, costume: cfg.costume, accessory: cfg.accessory,
          arenaChoice: cfg.arena,
          startSplashes: 0
        };
      } else {
        this.session = {
          type: cfg.mode, difficulty: diff, characterId: charId,
          costume: cfg.costume, accessory: cfg.accessory,
          round: cfg.round, arena: cfg.arena
        };
      }
      this.startRoundFromSession();
    },

    startRoundFromSession() {
      const s = this.session;
      let round, arena, diff = s.difficulty, endlessLevel = 0, botsCount = 7;
      if (s.type === 'career') {
        const p = s.plan[s.index];
        round = p.round; arena = p.arena;
        botsCount = 6;
      } else if (s.type === 'championship') {
        const p = s.plan[s.index];
        round = p.round; arena = p.arena;
        diff = s.difficulty * (1 + s.index * 0.02);
        botsCount = 6;
      } else if (s.type === 'endless') {
        round = ENDLESS_PLAN_ROUNDS[s.level % 4];
        const arenas = Object.keys(ARENAS);
        if (s.arenaChoice === 'random') arena = arenas[(s.level * 3 + 1) % arenas.length];
        else arena = s.arenaChoice;
        diff = s.difficulty * (1 + s.level * 0.055);
        endlessLevel = s.level + 1;
        botsCount = 3;
      } else if (s.type === 'timeTrial') {
        round = s.round; arena = s.arena; botsCount = 0;
      } else {
        round = s.round; arena = s.arena; botsCount = 6;
      }
      this.buildRound({ round, arena, difficulty: diff, endlessLevel, botsCount });
    },

    buildRound({ round, arena, difficulty = 1, endlessLevel = 0, botsCount = 7 }) {
      const s = this.session;
      this.roundInfo = { round, arena, difficulty, endlessLevel };
      this.config.round = round;
      this.config.arena = arena;

      if (this.gameScene) {
        this.gameScene.clear();
      }
      const scene = new THREE.Scene();
      this.gameScene = scene;
      this.scene = scene;
      const theme = ARENAS[arena] || ARENAS.classic;

      const course = buildCourse({
        round, arena: theme, difficulty,
        seedExtra: `${Date.now() % 10000}-${s.level || 0}`,
        endlessLevel
      });
      this.course = course;
      scene.add(course.group);
      const env = createEnvironment(theme, course.length, this.lowGfx ? 'low' : 'high');
      scene.add(env.group);
      this.env = env;
      scene.background = new THREE.Color(theme.skyHorizon);
      scene.fog = new THREE.Fog(theme.fog, 80, 300);

      const character = getCharacter(s.characterId);
      const player = createPlayer(course, character, { costume: s.costume, accessory: s.accessory });
      this.player = player;
      this.splashesTotal = s.type === 'endless' ? (s.startSplashes || 0) : 0;
      player.splashes = this.splashesTotal;
      player.finishTime = undefined;
      this.bindPlayer(player);

      const opts = {};
      if (s.type === 'championship') {
        const comp = s.competitors[s.index % s.competitors.length];
        opts.chars = s.competitors.map(c => getCharacter(c.charId));
        opts.names = s.competitors.map(c => c.name);
      }
      this.bots = botsCount > 0 ? createBots(course, character.id, botsCount, opts) : null;
      this.totalRacers = 1 + (this.bots ? this.bots.bots.length : 0);
      this.rank = 1;
      this.lastRank = 1;

      this.raceTime = 0;
      this.countdownTime = 3.7;
      this.lastCountdownShown = 99;
      this.state = 'countdown';
      this.endAt = 0;
      this.endKind = null;
      this.shake = 0;
      this.effects.forEach(e => this.removeEffect(e));
      this.effects = [];
      input.setEnabled(false);

      let label = `ROUND ${ROUNDS[round].number}`;
      let name = ROUNDS[round].name;
      if (s.type === 'career') label = `ROUND ${s.index + 1} OF 4`;
      else if (s.type === 'championship') label = `ROUND ${s.index + 1} OF 6`;
      else if (s.type === 'endless') label = `ENDLESS ${s.level + 1}`;
      else if (s.type === 'timeTrial') label = 'TIME TRIAL';
      else if (s.type === 'quick') label = 'QUICK PLAY';

      this.roundLabel = label;
      this.roundName = name;
      this.ui.setupHUD({
        roundLabel: label,
        roundName: name,
        maxSplashes: 3,
        totalRacers: this.totalRacers
      });
      this.ui.show('hud');
      this.ui.hideAllMenus();
      this.ui.showPause(false);
      this.ui.feed(`${theme.name.toUpperCase()} · ${ROUNDS[round].lengthHint}`, '');

      this.camera.position.set(player.pos.x, player.pos.y + 4.1, player.pos.z + 8.3);
      this.cameraLook.set(player.pos.x, player.pos.y + 1.2, player.pos.z - 4.5);
      this.camera.lookAt(this.cameraLook);
      this.ui.countdown('READY');
      audio.crowd(0.8);
    },

    bindPlayer(player) {
      player.callbacks = {
        onSplash: (pos, count) => {
          this.splashesTotal += 1;
          player.splashes = this.splashesTotal;
          this.spawnSplash(pos);
          this.shake = 0.7;
          this.ui.splashFlash();
          this.ui.feed('SPLASH! Back to the checkpoint', 'bad');
          audio.splash();
          if (this.splashesTotal >= 3) {
            this.state = 'ending';
            this.endKind = 'splash';
            this.endAt = 1.45;
            input.setEnabled(false);
          }
        },
        onHit: (hit) => {
          this.shake = Math.min(1.2, 0.35 + (hit.power || 8) * 0.05);
          this.spawnPop(hit.label || 'BONK!', player.pos.clone().add(new THREE.Vector3(0, 2.2, 0)), '#ffd23f');
          this.ui.feed(hit.label || 'BONK!', 'bad');
          audio.hit();
        },
        onCheckpoint: (cp) => {
          this.ui.feed(`${cp.label} · RESPAWN SAVED`, 'good');
          this.ui.bonus(cp.label + '!');
          audio.checkpoint();
          this.spawnPop(cp.label, cp.respawn ? new THREE.Vector3(cp.respawn.x, cp.respawn.top + 3, cp.respawn.z) : player.pos.clone(), '#6bff9d');
        },
        onJump: () => { audio.jump(); },
        onLand: (force) => { if (force > 0.55) audio.land(force); },
        onDive: () => { audio.dive(); },
        onLaunch: () => { audio.launch(); this.ui.bonus('LAUNCH!'); this.shake = 0.15; },
        onRecover: () => { this.ui.feed('Recovered. Somehow.', ''); },
        onRespawn: () => {
          this.cameraLook.set(player.pos.x, 1.4, player.pos.z - 5);
        },
        onFinish: () => {
          if (this.state === 'ending' || this.state === 'results') return;
          player.finishTime = this.raceTime;
          this.state = 'ending';
          this.endKind = 'finish';
          this.endAt = 2.1;
          input.setEnabled(false);
          this.rank = this.computeRank();
          this.resultRank = this.rank;
          this.shake = 0.3;
          audio.finish();
          this.spawnConfetti(player.pos.clone().add(new THREE.Vector3(0, 2, 0)));
          this.ui.bonus('FINISH!');
          this.ui.feed('FINISH!', 'good');
          audio.crowd(1.4);
        }
      };
    },

    computeRank() {
      if (!this.bots) return 1;
      const playerProgress = Math.max(0, Math.min(1, (this.course.startZ - this.player.pos.z) / Math.abs(this.course.finishZ - this.course.startZ)));
      let rank = 1;
      for (const b of this.bots.bots) {
        if (b.progress > playerProgress + 0.0001) rank++;
      }
      return rank;
    },

    /* ============================================================
       MAIN LOOP
       ============================================================ */
    loop(now) {
      const raw = (now - (this.lastTime || now)) / 1000;
      this.lastTime = now;
      const dt = Math.min(0.05, raw || 0.016);
      this.elapsed += dt;
      if (input.consumePause()) this.togglePause();
      if (this.state === 'menu') {
        this.updateMenu(dt);
      } else if (this.state === 'paused') {
        // keep rendering the frozen scene
      } else {
        this.updateRun(dt);
      }
      this.updateEffects(dt);
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(t => this.loop(t));
    },

    updateRun(dt) {
      const player = this.player;
      const course = this.course;
      if (!player || !course) return;
      this.env?.update(dt, this.elapsed);

      if (this.state === 'countdown') {
        this.countdownTime -= dt;
        const shown = Math.ceil(this.countdownTime);
        if (shown !== this.lastCountdownShown && this.countdownTime > 0) {
          this.lastCountdownShown = shown;
          if (shown > 0 && shown <= 3) {
            this.ui.countdown(String(shown));
            audio.countdown(1);
          }
        }
        if (this.countdownTime <= 0.35 && this.lastCountdownShown !== 0) {
          this.lastCountdownShown = 0;
          this.ui.countdown('GO!');
          audio.countdown(0);
          this.state = 'racing';
          this.raceTime = 0;
          input.setEnabled(true);
          this.ui.feed('GO! GO! GO!', 'good');
        }
        const idle = { forward: 0, strafe: 0, sprint: false, jumpPressed: false, divePressed: false };
        course.update(dt, this.elapsed, player);
        player.update(dt, idle, this.elapsed);
        if (this.bots) this.bots.update(dt, this.elapsed, player, false);
      } else if (this.state === 'racing') {
        this.raceTime += dt;
        if (this.raceTime > 300) {
          this.state = 'ending'; this.endKind = 'timeout'; this.endAt = 1.2; input.setEnabled(false);
        }
        course.update(dt, this.elapsed, player);
        const frameInput = {
          forward: input.forward,
          strafe: input.strafe,
          sprint: input.sprint,
          jumpPressed: input.consumeJump(),
          divePressed: input.consumeDive()
        };
        if (this.bots) this.bots.update(dt, this.elapsed, player, true);
        player.update(dt, frameInput, this.elapsed);
        this.rank = this.computeRank();
        this.rankCooldown = Math.max(0, this.rankCooldown - dt);
        if (this.bots && this.rank !== this.lastRank && this.rankCooldown <= 0 && this.raceTime > 2) {
          if (this.rank < this.lastRank && this.lastRank !== 99) this.ui.feed(`OVERTAKE! Now ${ordinal(this.rank)}`, 'good');
          else if (this.lastRank !== 99) this.ui.feed(`Dropped to ${ordinal(this.rank)}`, 'bad');
          this.lastRank = this.rank;
          this.rankCooldown = 1.5;
        }
        if (this.lastRank === 99) this.lastRank = this.rank;
        this.updateHUDState();
      } else if (this.state === 'ending') {
        this.endAt -= dt;
        course.update(dt, this.elapsed, player);
        const idle = { forward: 0, strafe: 0, sprint: false, jumpPressed: false, divePressed: false };
        if (this.bots) this.bots.update(dt, this.elapsed, player, this.endKind === 'finish');
        player.update(dt, idle, this.elapsed);
        this.updateHUDState();
        if (this.endAt <= 0) {
          this.finalizeRound(this.endKind === 'finish');
        }
      } else if (this.state === 'results') {
        // results screen; gentle world motion
        course.update(dt, this.elapsed, player);
      }

      this.updateCamera(dt);
    },

    updateHUDState() {
      const player = this.player;
      if (!player) return;
      const progress = Math.max(0, Math.min(1, (this.course.startZ - player.pos.z) / Math.abs(this.course.finishZ - this.course.startZ)));
      const cp = player.checkpoint;
      this.ui.updateHUD({
        time: this.raceTime + (this.session.type === 'timeTrial' ? this.splashesTotal * 2 : 0),
        progress,
        rank: this.bots ? this.rank : 1,
        totalRacers: this.totalRacers,
        splashes: this.splashesTotal,
        stamina: player.stamina,
        speed: player.speed,
        checkpoint: cp ? cp.label : 'START'
      });
    },

    updateCamera(dt) {
      if (!this.player) return;
      const p = this.player;
      const cam = this.camera;
      if (this.state === 'ending' && this.endKind === 'finish') {
        this.menu.orbit = (this.menu.orbit || 0) + dt * 0.6;
        const a = this.menu.orbit;
        const target = p.pos.clone().add(new THREE.Vector3(0, 1.3, 0));
        cam.position.lerp(new THREE.Vector3(target.x + Math.sin(a) * 6.4, target.y + 2.6, target.z + Math.cos(a) * 6.4), Math.min(1, dt * 4));
        this.cameraLook.lerp(target, Math.min(1, dt * 6));
        cam.lookAt(this.cameraLook);
        return;
      }
      const speedFactor = Math.min(1.5, p.speed / 9);
      const back = 7.2 + speedFactor * 1.2 + (this.state === 'countdown' ? 1.8 : 0);
      const height = 3.9 + speedFactor * 0.35;
      const desired = new THREE.Vector3(
        p.pos.x + p.vel.x * 0.16,
        p.pos.y + height,
        p.pos.z + back
      );
      desired.y = Math.max(desired.y, WATER_Y + (p.state === 'splash' ? 3.4 : 1.6));
      cam.position.lerp(desired, Math.min(1, dt * 5.2));
      const lookTarget = new THREE.Vector3(
        p.pos.x + p.vel.x * 0.3,
        p.pos.y + 1.35 + (p.grounded ? 0 : 0.3),
        p.pos.z - 6.5
      );
      this.cameraLook.lerp(lookTarget, Math.min(1, dt * 7));
      cam.lookAt(this.cameraLook);

      // Balls that bounce behind the player can swallow the chase camera.
      // Hide any that the camera is inside instead of rendering a blind wall.
      for (const o of this.course.obstacles) {
        if (o.type !== 'ball') continue;
        const gp = o.group.position;
        if (gp.z < p.pos.z - 0.5) continue;
        const d = Math.hypot(gp.x - cam.position.x, gp.y + 1.9 - cam.position.y, gp.z - cam.position.z);
        o.group.visible = d > 6.2;
      }

      if (this.shake > 0.001) {
        this.shake *= Math.pow(0.0018, dt);
        const s = this.shake;
        cam.position.x += (Math.random() - 0.5) * s * 0.8;
        cam.position.y += (Math.random() - 0.5) * s * 0.6;
        cam.rotation.z += (Math.random() - 0.5) * s * 0.03;
      } else {
        this.shake = 0;
      }
    },

    /* ============================================================
       EFFECTS
       ============================================================ */
    spawnSplash(pos) {
      const scene = this.gameScene;
      const count = 34;
      const positions = new Float32Array(count * 3);
      const vels = [];
      for (let i = 0; i < count; i++) {
        positions[i * 3] = pos.x;
        positions[i * 3 + 1] = WATER_Y + 0.1;
        positions[i * 3 + 2] = pos.z;
        const a = Math.random() * Math.PI * 2;
        const r = 1.5 + Math.random() * 4;
        vels.push(new THREE.Vector3(Math.cos(a) * r, 5 + Math.random() * 8, Math.sin(a) * r));
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: '#d8fbff', size: 0.36, transparent: true, opacity: 1, depthWrite: false }));
      scene.add(pts);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1, 0.16, 6, 24),
        new THREE.MeshBasicMaterial({ color: '#c9f7ff', transparent: true, opacity: 0.9, depthWrite: false })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(pos.x, WATER_Y + 0.06, pos.z);
      scene.add(ring);
      this.effects.push({ type: 'splash', pts, ring, vels, t: 0, life: 1.15, positions });
    },

    spawnConfetti(pos) {
      const scene = this.gameScene;
      const count = 90;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const vels = [];
      const palette = [new THREE.Color('#ffd23f'), new THREE.Color('#ff5b2b'), new THREE.Color('#2fc4ff'), new THREE.Color('#43e08a'), new THREE.Color('#ff5fa2')];
      for (let i = 0; i < count; i++) {
        positions[i * 3] = pos.x + (Math.random() - 0.5) * 3;
        positions[i * 3 + 1] = pos.y + 2 + Math.random() * 2;
        positions[i * 3 + 2] = pos.z + (Math.random() - 0.5) * 3;
        const col = palette[i % palette.length];
        colors[i * 3] = col.r; colors[i * 3 + 1] = col.g; colors[i * 3 + 2] = col.b;
        vels.push(new THREE.Vector3((Math.random() - 0.5) * 4, 3 + Math.random() * 7, (Math.random() - 0.5) * 4));
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const pts = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.28, vertexColors: true, transparent: true, opacity: 1, depthWrite: false }));
      scene.add(pts);
      this.effects.push({ type: 'confetti', pts, vels, t: 0, life: 2.8, positions });
    },

    spawnPop(text, pos, color = '#ffd23f') {
      const c = document.createElement('canvas');
      c.width = 320; c.height = 128;
      const ctx = c.getContext('2d');
      let fontSize = 55;
      ctx.font = `bold ${fontSize}px Outfit, sans-serif`;
      while (ctx.measureText(text).width > 302 && fontSize > 18) {
        fontSize -= 2;
        ctx.font = `bold ${fontSize}px Outfit, sans-serif`;
      }
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.lineWidth = 12; ctx.strokeStyle = '#0b2136';
      ctx.strokeText(text, 160, 64);
      ctx.fillStyle = color;
      ctx.fillText(text, 160, 64);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
      const sprite = new THREE.Sprite(mat);
      sprite.position.copy(pos);
      sprite.scale.set(4.2, 1.7, 1);
      if (this.gameScene) this.gameScene.add(sprite);
      this.effects.push({ type: 'pop', sprite, t: 0, life: 1.15, vy: 1.6 });
    },

    updateEffects(dt) {
      for (let i = this.effects.length - 1; i >= 0; i--) {
        const e = this.effects[i];
        e.t += dt;
        const k = e.t / e.life;
        if (e.type === 'splash') {
          const arr = e.positions;
          for (let j = 0; j < e.vels.length; j++) {
            e.vels[j].y -= 26 * dt;
            arr[j * 3] += e.vels[j].x * dt;
            arr[j * 3 + 1] += e.vels[j].y * dt;
            arr[j * 3 + 2] += e.vels[j].z * dt;
          }
          e.pts.geometry.attributes.position.needsUpdate = true;
          e.pts.material.opacity = Math.max(0, 1 - k);
          e.ring.scale.setScalar(1 + k * 5.5);
          e.ring.material.opacity = Math.max(0, 0.9 * (1 - k));
        } else if (e.type === 'confetti') {
          const arr = e.positions;
          for (let j = 0; j < e.vels.length; j++) {
            e.vels[j].y -= 9 * dt;
            arr[j * 3] += e.vels[j].x * dt;
            arr[j * 3 + 1] += e.vels[j].y * dt;
            arr[j * 3 + 2] += e.vels[j].z * dt;
          }
          e.pts.geometry.attributes.position.needsUpdate = true;
          e.pts.material.opacity = Math.max(0, 1 - k * k);
        } else if (e.type === 'pop') {
          e.sprite.position.y += e.vy * dt;
          e.vy *= 0.96;
          e.sprite.material.opacity = Math.max(0, 1 - k);
        }
        if (e.t >= e.life) {
          this.removeEffect(e);
          this.effects.splice(i, 1);
        }
      }
    },

    removeEffect(e) {
      if (e.pts) {
        this.gameScene?.remove(e.pts);
        e.pts.geometry?.dispose();
        e.pts.material?.dispose();
      }
      if (e.ring) {
        this.gameScene?.remove(e.ring);
        e.ring.geometry?.dispose();
        e.ring.material?.dispose();
      }
      if (e.sprite) {
        this.gameScene?.remove(e.sprite);
        e.sprite.material?.map?.dispose();
        e.sprite.material?.dispose();
      }
    },

    /* ============================================================
       ROUND FINISH / RESULTS
       ============================================================ */
    finalizeRound(finished) {
      this.state = 'results';
      this.ui.showPause(false);
      input.setEnabled(false);
      const s = this.session;
      const time = this.player.finishTime ?? this.raceTime;
      const rank = finished ? (this.resultRank || this.computeRank()) : this.totalRacers;
      this.rank = rank;
      const theme = ARENAS[this.roundInfo.arena];
      const rows = this.buildResultRows(finished, time, rank);
      const splashes = this.splashesTotal;
      const date = new Date().toLocaleDateString();

      if (s.type === 'career') {
        this.finishCareer(finished, time, rank, rows, splashes, theme, date);
      } else if (s.type === 'championship') {
        this.finishChampionship(finished, time, rank, rows, splashes, theme, date);
      } else if (s.type === 'timeTrial') {
        this.finishTimeTrial(finished, time, rows, splashes, theme, date);
      } else if (s.type === 'endless') {
        this.finishEndless(finished, time, rank, rows, splashes, theme, date);
      } else {
        this.finishQuick(finished, time, rank, rows, splashes, theme, date);
      }
    },

    buildResultRows(finished, time, playerRank) {
      const rows = [];
      if (finished) {
        rows.push({
          rank: playerRank, name: 'YOU', me: true,
          detail: getCharacter(this.session.characterId).name,
          time, timeText: fmtTime(time), progress: 1
        });
      }
      if (this.bots) {
        for (const b of this.bots.bots) {
          rows.push({
            rank: 0, name: b.name, me: false,
            detail: b.character.name,
            time: b.finished ? b.finishTime : Infinity,
            progress: b.progress,
            timeText: b.finished ? fmtTime(b.finishTime) : 'ON COURSE'
          });
        }
      }
      if (finished) {
        rows.sort((a, b) => {
          if (isFinite(a.time) && isFinite(b.time)) return a.time - b.time;
          return a.me ? -1 : 1;
        });
      } else {
        rows.sort((a, b) => (b.progress || 0) - (a.progress || 0));
        rows.push({ rank: rows.length + 1, name: 'YOU', me: true, detail: getCharacter(this.session.characterId).name, time: Infinity, progress: 1, timeText: 'WIPED OUT' });
      }
      rows.forEach((r, i) => { r.rank = i + 1; });
      if (!finished) {
        const me = rows.find(r => r.me);
        if (me) me.rank = rows.length;
      }
      return rows;
    },

    awardUnlock(id) {
      const c = getCharacter(id);
      if (save.unlock(id)) return `NEW CONTESTANT: ${c.name}`;
      return null;
    },

    showResultsData(data) {
      this.ui.showResults(data);
      this.state = 'results';
    },

    finishCareer(finished, time, rank, rows, splashes, theme, date) {
      const s = this.session;
      const qualified = finished && rank <= 5;
      const isFinal = s.index >= 3;
      const tokens = qualified ? (isFinal ? 12 : 5) : 1;
      if (finished) {
        save.addResult('career', s.plan[s.index].round, s.plan[s.index].arena, {
          name: 'YOU', charId: s.characterId, time, date, me: true
        });
      }
      const unlocks = [];
      if (qualified) {
        if (isFinal) {
          save.data.careerDone = true;
          save.data.careerWins = (save.data.careerWins || 0) + 1;
          save.data.careerRound = 4;
          ['maxine', 'pete'].forEach(id => {
            const u = this.awardUnlock(id);
            if (u) unlocks.push(u);
          });
        } else {
          save.data.careerRound = Math.max(save.data.careerRound, s.index + 2);
          const milestone = ['pixie', 'nina', 'bea'][s.index];
          const u = this.awardUnlock(milestone);
          if (u) unlocks.push(u);
        }
      }
      save.persist();

      const buttons = [];
      const nextExists = qualified && s.index < 3;
      if (nextExists) {
        buttons.push({
          label: 'NEXT ROUND →', primary: true,
          onClick: () => { s.index += 1; this.startRoundFromSession(); }
        });
      }
      buttons.push({
        label: isFinal && qualified ? 'PLAY CAREER AGAIN' : 'RETRY ROUND',
        primary: !nextExists,
        onClick: () => { if (isFinal && qualified) { s.index = 0; } this.startRoundFromSession(); }
      });
      buttons.push({ label: 'MAIN MENU', ghost: true, onClick: () => this.quitToMenu() });

      this.showResultsData({
        kicker: isFinal ? 'CAREER FINALE' : `ROUND ${s.index + 1} OF 4`,
        title: isFinal && qualified ? 'WIPEOUT CHAMPION!' : qualified ? 'QUALIFIED!' : 'ELIMINATED',
        titleColor: isFinal && qualified ? '#ffd23f' : qualified ? '#6be675' : '#ff5b6a',
        sub: isFinal && qualified
          ? 'You survived every ball, sweeper and hammer. The trophy is yours.'
          : qualified
            ? `Top five secured at ${theme.name}. Round ${s.index + 2} unlocked.`
            : finished
              ? `You finished ${ordinal(rank)}. Top five required. The water is calling you back.`
              : 'Three splashes. The competition moves on without you.',
        time, rank: finished ? rank : 0, total: this.totalRacers,
        splashes, tokens, rows, unlocks, qualified,
        eliminated: !qualified,
        buttons
      });
    },

    finishChampionship(finished, time, rank, rows, splashes, theme, date) {
      const s = this.session;
      const idx = s.index;
      if (finished) {
        save.addResult('championship', s.plan[idx].round, s.plan[idx].arena, {
          name: 'YOU', charId: s.characterId, time, date, me: true
        });
      }
      if (!finished) {
        this.showResultsData({
          kicker: `CHAMPIONSHIP ROUND ${idx + 1} OF 6`,
          title: 'ELIMINATED',
          titleColor: '#ff5b6a',
          sub: 'Three splashes ends your championship round. Retry it — your points are safe.',
          time, rank: 0, total: this.totalRacers, splashes, tokens: 0,
          rows, eliminated: true,
          buttons: [
            { label: 'RETRY ROUND', primary: true, onClick: () => this.startRoundFromSession() },
            { label: 'MAIN MENU', ghost: true, onClick: () => this.quitToMenu() }
          ]
        });
        return;
      }

      const pointsByEntry = new Map();
      const projected = [
        { key: 'player', time },
        ...this.bots.bots.map((b, i) => ({ key: 'ai' + i, time: b.finishTime }))
      ].sort((a, b) => a.time - b.time);
      const pointTable = [10, 8, 6, 5, 4, 3, 2];
      projected.forEach((e, i) => {
        const pts = pointTable[i] || 0;
        pointsByEntry.set(e.key, pts);
        if (e.key === 'player') s.points.player += pts;
        else s.points[e.key] += pts;
      });

      const standings = [
        { key: 'player', name: 'YOU', me: true, detail: getCharacter(s.characterId).name, points: s.points.player, last: pointsByEntry.get('player') },
        ...s.competitors.map(c => ({ key: c.id, name: c.name, detail: getCharacter(c.charId).name, points: s.points[c.id], last: pointsByEntry.get(c.id) || 0 }))
      ].sort((a, b) => b.points - a.points || b.last - a.last);

      if (idx < s.plan.length - 1) {
        const nextRound = s.plan[idx + 1];
        this.ui.showStandings({
          kicker: `AFTER ROUND ${idx + 1} OF 6`,
          title: 'CHAMPIONSHIP STANDINGS',
          sub: `${theme.name} complete. Next up: ${ROUNDS[nextRound.round].name} at ${ARENAS[nextRound.arena].name}.`,
          rows: standings.map((e, i) => ({
            rank: i + 1, name: e.name, me: e.me, detail: e.detail,
            points: `${e.points} pts  <span style="font-size:10px;color:#8ec5d9">(+${e.last})</span>`
          })),
          buttons: [
            { label: 'NEXT ROUND →', primary: true, onClick: () => { s.index = idx + 1; this.startRoundFromSession(); } },
            { label: 'MAIN MENU', ghost: true, onClick: () => this.quitToMenu() }
          ]
        });
        this.state = 'results';
        return;
      }

      const champion = standings[0];
      const playerWon = champion.me;
      const playerPos = standings.findIndex(e => e.me) + 1;
      const tokens = playerWon ? 20 : 6;
      if (tokens) { save.addTokens(tokens); this.ui.refreshTokens(); }
      const unlocks = [];
      if (playerWon) {
        ['bruno', 'chuck'].forEach(id => {
          const u = this.awardUnlock(id);
          if (u) unlocks.push(u);
        });
      }
      save.data.championshipBest = Math.max(save.data.championshipBest || 0, s.points.player);
      save.persist();
      this.ui.showStandings({
        kicker: 'FINAL CHAMPIONSHIP STANDINGS',
        title: playerWon ? 'CHAMPION!' : 'CHAMPIONSHIP OVER',
        sub: playerWon
          ? 'Six arenas, one winner. You. Somehow. +20 coins and two new contestants unlocked.'
          : `${champion.name} takes the crown. You finished ${ordinal(playerPos)} with ${s.points.player} points.`,
        rows: standings.map((e, i) => ({
          rank: i + 1, name: e.name, me: e.me, detail: e.detail,
          points: `${e.points} pts`
        })),
        buttons: [
          { label: 'PLAY AGAIN', primary: true, onClick: () => this.startRun({ ...this.config, mode: 'championship' }) },
          { label: 'MAIN MENU', ghost: true, onClick: () => this.quitToMenu() }
        ]
      });
      this.state = 'results';
    },

    finishTimeTrial(finished, time, rows, splashes, theme, date) {
      const s = this.session;
      const penalty = splashes * 2;
      const finalTime = time + penalty;
      const key = `${s.round}:${s.arena}`;
      const oldBest = save.data.bestTimes[key];
      const valid = finished;
      let newBest = false;
      if (valid) {
        newBest = !oldBest || finalTime < oldBest;
        save.addResult('timeTrial', s.round, s.arena, {
          name: 'YOU', charId: s.characterId, time: finalTime, date, me: true
        });
      }
      const lb = save.leaderboard('timeTrial', s.round, s.arena).slice(0, 6);
      const tokens = valid ? (newBest ? 3 : 1) : 0;
      const resultRows = lb.map((r, i) => ({
        rank: i + 1, name: r.name, me: r.me, detail: getCharacter(r.charId).name,
        timeText: fmtTime(r.time)
      }));
      this.showResultsData({
        kicker: 'TIME TRIAL · ' + ARENAS[s.arena].name,
        title: valid ? (newBest ? 'NEW PERSONAL BEST!' : 'TIME SET') : 'RUN OVER',
        titleColor: valid ? (newBest ? '#ffd23f' : '#6be675') : '#ff5b6a',
        sub: valid
          ? `${ROUNDS[s.round].name} · ${theme.name}${penalty ? ` · includes +${penalty}s splash penalty` : ''}`
          : 'Three splashes. The clock wins this one.',
        time: finalTime, rank: valid ? 1 : 0, total: 1, splashes, tokens,
        rows: resultRows, qualified: valid, eliminated: !valid,
        unlocks: oldBest && valid ? [`PREVIOUS BEST ${fmtTime(oldBest)}`] : [],
        buttons: [
          { label: 'RACE AGAIN', primary: true, onClick: () => this.startRoundFromSession() },
          { label: 'CHANGE EVENT', onClick: () => this.quitToMenu(true) },
          { label: 'MAIN MENU', ghost: true, onClick: () => this.quitToMenu() }
        ]
      });
    },

    finishEndless(finished, time, rank, rows, splashes, theme, date) {
      const s = this.session;
      const level = s.level + 1;
      save.data.endlessBest = Math.max(save.data.endlessBest || 0, finished ? level : s.level);
      save.persist();
      if (finished) {
        save.addResult('endless', this.roundInfo.round, this.roundInfo.arena, {
          name: `ROUND ${level}`, charId: s.characterId, time, date, me: true
        });
        const reward = 1 + Math.floor(level / 2);
        save.addTokens(reward);
        this.ui.refreshTokens();
        const unlocks = [];
        if (level === 5) {
          const u = this.awardUnlock('chuck');
          if (u) unlocks.push(u);
        }
        this.showResultsData({
          kicker: `ENDLESS · ROUND ${level} CLEARED`,
          title: 'STILL STANDING!',
          titleColor: '#6be675',
          sub: `${theme.name} survived. Round ${level + 1} will be faster, longer and considerably less fair.`,
          time, rank, total: this.totalRacers, splashes, tokens: reward,
          rows, qualified: true, unlocks,
          buttons: [
            {
              label: 'KEEP GOING →', primary: true,
              onClick: () => {
                s.level += 1;
                s.startSplashes = this.splashesTotal;
                this.startRoundFromSession();
              }
            },
            { label: 'RETIRE WITH DIGNITY', onClick: () => this.showEndlessFinal(level, splashes, unlocks) },
            { label: 'MAIN MENU', ghost: true, onClick: () => this.quitToMenu() }
          ]
        });
      } else {
        this.showEndlessFinal(Math.max(0, s.level), splashes, []);
      }
    },

    showEndlessFinal(levelReached, splashes, unlocks) {
      const s = this.session;
      save.data.endlessBest = Math.max(save.data.endlessBest || 0, levelReached);
      save.persist();
      const tokens = Math.max(0, levelReached * 2);
      this.showResultsData({
        kicker: 'ENDLESS WIPEOUT',
        title: 'RUN OVER',
        titleColor: '#ff5b6a',
        sub: levelReached > 0
          ? `You survived ${levelReached} round${levelReached === 1 ? '' : 's'} before the water got you.`
          : 'The first course got you. That is genuinely impressive.',
        time: 0, rank: 0, total: 4, splashes, tokens,
        rows: [], eliminated: true, unlocked: unlocks,
        unlocks: [
          `ROUNDS CLEARED: ${levelReached}`,
          `PERSONAL BEST: ${Math.max(save.data.endlessBest, levelReached)}`,
          ...(unlocks || [])
        ],
        buttons: [
          {
            label: 'RUN AGAIN', primary: true,
            onClick: () => { s.level = 0; s.startSplashes = 0; this.splashesTotal = 0; this.startRoundFromSession(); }
          },
          { label: 'MAIN MENU', ghost: true, onClick: () => this.quitToMenu() }
        ]
      });
      if (tokens) { save.addTokens(tokens); this.ui.refreshTokens(); }
    },

    finishQuick(finished, time, rank, rows, splashes, theme, date) {
      const s = this.session;
      const qualified = finished && rank <= 5;
      if (finished) {
        save.addResult('quick', s.round, s.arena, {
          name: 'YOU', charId: s.characterId, time, date, me: true
        });
      }
      const tokens = finished ? (rank <= 3 ? 3 : 2) : 0;
      this.showResultsData({
        kicker: 'QUICK PLAY · ' + ROUNDS[s.round].name,
        title: finished ? (qualified ? 'QUALIFIED!' : 'FINISHED') : 'ELIMINATED',
        titleColor: finished ? (qualified ? '#6be675' : '#ffd23f') : '#ff5b6a',
        sub: finished
          ? `${theme.name} · You placed ${ordinal(rank)} of ${this.totalRacers}.${qualified ? ' Top five. Nice.' : ' Not quite top five. Have another go.'}`
          : 'Three splashes. The big red balls remain undefeated.',
        time, rank: finished ? rank : 0, total: this.totalRacers, splashes, tokens,
        rows, qualified, eliminated: !finished,
        buttons: [
          { label: 'RACE AGAIN', primary: true, onClick: () => this.startRoundFromSession() },
          { label: 'CHANGE EVENT', onClick: () => this.quitToMenu(true) },
          { label: 'MAIN MENU', ghost: true, onClick: () => this.quitToMenu() }
        ]
      });
    },

    /* ============================================================
       PAUSE / NAVIGATION
       ============================================================ */
    togglePause() {
      if (this.state === 'racing' || this.state === 'countdown') this.pause();
      else if (this.state === 'paused') this.resume();
    },

    pause() {
      if (this.state !== 'racing' && this.state !== 'countdown') return;
      this.pausedFrom = this.state;
      this.state = 'paused';
      input.setEnabled(false);
      this.ui.showPause(true);
      audio.click();
    },

    resume() {
      if (this.state !== 'paused') return;
      this.state = this.pausedFrom || 'racing';
      if (this.state === 'racing') input.setEnabled(true);
      this.ui.showPause(false);
    },

    restartRound() {
      this.ui.showPause(false);
      this.splashesTotal = this.session?.type === 'endless' ? (this.session.startSplashes || 0) : 0;
      this.startRoundFromSession();
    },

    quitToMenu(goSetup = false) {
      audio.init();
      input.setEnabled(false);
      this.state = 'menu';
      this.ui.showPause(false);
      if (this.gameScene) { this.gameScene.clear(); this.gameScene = null; }
      this.player = null;
      this.course = null;
      this.bots = null;
      this.effects = [];
      this.scene = this.menuScene;
      this.setMenuCharacter(save.data.selected);
      if (goSetup) {
        this.ui.showPlay();
      } else {
        this.ui.initTitle();
      }
      this.camera.position.set(5.4, 4.1, 9);
      this.camera.lookAt(2.4, 1.5, -1.5);
    },

    setMenuCharacter(id) {
      try {
        this._setMenuCharacter(id);
      } catch (e) { console.error(e); }
    },

    _setMenuCharacter(id) {
      this.menu.characterId = id;
      if (this.menu.charGroup) {
        this.menuScene.remove(this.menu.charGroup);
        this.menu.charGroup = null;
      }
      const c = getCharacter(id);
      const rig = buildCharacterMesh(c, {
        costume: save.data.costumeColor >= 0 ? ['#ff5b2b', '#2fc4ff', '#ffd23f', '#7c5cff', '#ff5fa2', '#43e08a', '#24a8a0', '#e63946', '#b8e04a', '#ff8a2b', '#f6f6fa', '#181c2b'][save.data.costumeColor] : c.colors.shirt,
        accessory: save.data.accessory
      });
      const g = new THREE.Group();
      g.add(rig.root);
      g.position.set(5.2, 1.22, -1.5);
      g.rotation.y = Math.PI;
      this.menuScene.add(g);
      this.menu.charGroup = g;
      this.menuCharacterRig = rig;
    },

  };

  return game;
}
