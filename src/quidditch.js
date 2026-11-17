import * as THREE from 'three';
import {
  buildQuidditchWorld, createBroomModel, createQuaffle, createBludger, createSnitch,
  glowSprite, addPlayerMarker,
} from './world.js';
import { NATIONS, POSITIONS, TEAM_ROSTERS, TACTICS, COMMENTARY, DIFFICULTIES, SKILLS } from './data.js';
import { formatClock, getBroom } from './state.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;

function angleDiff(target, current) {
  let d = target - current;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}

export class QuidditchMatch {
  constructor(game, cfg) {
    this.game = game;
    this.cfg = cfg;
    this.state = game.state;
    this.nation = NATIONS.find(n => n.id === cfg.nationId) || NATIONS[0];
    this.opponent = NATIONS.find(n => n.id === cfg.opponentId) || NATIONS[1];
    this.role = cfg.role || 'chaser';
    this.tactics = TACTICS.find(t => t.id === (cfg.tactics || 'balanced')) || TACTICS[1];
    this.difficulty = DIFFICULTIES.find(d => d.id === (cfg.difficulty || 'pro')) || DIFFICULTIES[1];
    this.round = cfg.round || 0;
    this.roundName = cfg.roundName || 'Quarter-final';

    this.world = buildQuidditchWorld(this.nation, this.opponent, {});
    this.scene = this.world.scene;
    this.weather = this.world.weather;
    this.camera = new THREE.PerspectiveCamera(58, game.aspect, 0.1, 1600);
    this.game.renderer.shadowMap.enabled = this.state.settings.quality !== 'low';

    this.matchLength = 170;
    this.elapsed = 0;
    this.timeLeft = this.matchLength;
    this.phase = 'intro';
    this.introCountdown = 3.8;
    this.introTime = 0;
    this.endTimer = 0;
    this.resultSent = false;
    this.soundTime = 0;
    this.messageTimer = 0;
    this.hudTimer = 0;
    this.shake = 0;

    this.score = { player: 0, opp: 0 };
    this.stats = { goals: 0, saves: 0, bludgers: 0, snitch: 0, shots: 0 };
    this.shot = null;
    this.incoming = null;
    this.bludgerShots = [];
    this.attackTimer = 9 + Math.random() * 4;
    this.oppAttackTimer = 11 + Math.random() * 4;
    this.bludgerThreatTimer = 16 + Math.random() * 8;
    this.snitchReleased = false;
    this.snitchCaught = false;
    this.snitchAiTimer = 0;
    this.snitchVisible = false;
    this.stun = 0;
    this.actionCooldown = 0;
    this.passCooldown = 0;
    this.boost = 100;
    this.boostHeld = false;
    this.possess = 'player';
    this.pendingReset = 0;
    this.lastComment = -9;
    this.diveTimer = 0;
    this.snitchTarget = new THREE.Vector3(0, 18, 0);
    this.snitchRetarget = 0;
    this.crowdNoise = 0;
    this.trailPositions = [];

    const roleInfo = POSITIONS.find(p => p.id === this.role) || POSITIONS[0];
    this.roleInfo = roleInfo;
    this.broom = getBroom(this.state.brooms.selected);
    const nationColor = this.nation.colors[0];

    // Player
    this.player = {
      pos: this.startPosition(this.role),
      yaw: -Math.PI / 2,
      pitch: 0,
      bank: 0,
      speed: 0,
      role: this.role,
      stun: 0,
    };
    this.playerModel = createBroomModel({
      robe: nationColor, skin: this.state.profile.skin, hair: this.state.profile.hair,
      livery: this.nation.accent, wood: this.broom.colors, scale: 1.05,
    });
    this.playerModel.position.copy(this.player.pos);
    this.scene.add(this.playerModel);
    this.marker = addPlayerMarker(this.playerModel, this.nation.accent);
    this.trail = glowSprite(this.nation.accent, 7, 0.2);
    this.scene.add(this.trail);

    // Teams
    this.teammates = [];
    this.opponents = [];
    const roster = TEAM_ROSTERS[this.nation.id] || TEAM_ROSTERS.england;
    const oppRoster = TEAM_ROSTERS[this.opponent.id] || TEAM_ROSTERS.france;
    this.buildTeam('player', roster, this.nation.colors[0], this.teammates);
    this.buildTeam('opp', oppRoster, this.opponent.colors[0], this.opponents);

    // Balls
    this.quaffle = createQuaffle();
    this.quaffle.scale.setScalar(1.25);
    this.scene.add(this.quaffle);
    this.quaffleGlow = glowSprite('#ff9b7a', 3.2, 0.3);
    this.quaffle.add(this.quaffleGlow);
    this.bludgers = [createBludger(), createBludger()];
    this.bludgers.forEach((b, i) => {
      b.scale.setScalar(1.15);
      this.scene.add(b);
      b.userData.phase = i * 3.1;
      b.userData.anchor = new THREE.Vector3(0, 10 + i * 5, 0);
    });
    this.snitch = createSnitch();
    this.snitch.scale.setScalar(1.5);
    this.snitch.position.set(0, 20, 0);
    this.snitch.visible = false;
    this.scene.add(this.snitch);
    this.snitchGlow = glowSprite('#ffe08a', 8, 0.5);
    this.snitch.add(this.snitchGlow);

    // Hoops glow targets
    this.hoopTargets = this.world.hoops.map(h => ({
      ...h,
      world: new THREE.Vector3(h.x, h.y, h.z),
      glow: glowSprite('#ffd776', 10, 0.25),
    }));
    for (const h of this.hoopTargets) {
      h.glow.position.set(h.x, h.y, h.z);
      this.scene.add(h.glow);
    }

    this.audio = game.audio;
    this.audio.setMode('quid');
    this.audio.sfx('crowd');
    this.ui = game.ui;
    this.ui.showQuidditchHUD(this);
    this.game.input.bindQuidditch();
    this.audio.speak(`${this.roundName}. ${this.nation.name} versus ${this.opponent.name}.`);
    this.say(`${this.nation.name} vs ${this.opponent.name} — ${this.roundName}`, 'gold');
    this.possess = this.role === 'chaser' ? 'player' : 'player-ai';
    this.chooseAiCarrier();
    this.updateCameraIntro(0.016, true);
    this.ui.updateQuidditchHUD(this.hudData());
  }

  startPosition(role) {
    if (role === 'keeper') return new THREE.Vector3(-72, 11, 0);
    if (role === 'beater') return new THREE.Vector3(-34, 12, 16);
    if (role === 'seeker') return new THREE.Vector3(-36, 19, -8);
    return new THREE.Vector3(-14, 11, 0);
  }

  buildTeam(team, roster, color, target) {
    const roles = ['chaser', 'chaser', 'chaser', 'beater', 'beater', 'keeper', 'seeker'];
    let playerRoleUsed = false;
    roles.forEach((role, i) => {
      const isPlayer = team === 'player' && role === this.role && !playerRoleUsed;
      if (isPlayer) { playerRoleUsed = true; return; }
      if (team === 'player' && role === this.role && playerRoleUsed && roles.indexOf(role) === i) {
        // player's role is already taken by controlled avatar; extra same-role players remain
      }
      const model = createBroomModel({
        robe: color, skin: ['#e0b48b', '#b98460', '#8a5b3f', '#f0c9a6'][i % 4],
        hair: ['#2d1d14', '#6d4a2d', '#a8793f', '#1c1713'][i % 4],
        livery: this.nation.accent, wood: [['#4a2f1d', '#795534'], ['#3f3a45', '#78808c'], ['#6b4a2c', '#a98253']][i % 3], scale: 0.98,
      });
      this.scene.add(model);
      const a = (i / 7) * Math.PI * 2;
      const baseX = team === 'player' ? -30 : 30;
      model.position.set(baseX + Math.cos(a) * 12, 10 + (i % 4) * 3, Math.sin(a) * 18);
      target.push({
        team, role, name: roster[i % roster.length] || `Player ${i}`,
        model, phase: Math.random() * 6.28, anchor: new THREE.Vector3(baseX, 11 + (i % 4) * 3, Math.sin(a) * 18),
        radius: 8 + (i % 3) * 5, speed: 0.16 + (i % 3) * 0.04, carrier: false,
        stunned: 0, dive: 0,
      });
    });
  }

  chooseAiCarrier() {
    if (this.role === 'chaser' && this.possess === 'player') {
      this.quaffleHolder = 'player';
      return;
    }
    const pool = this.possess === 'opp' ? this.opponents : (this.possess === 'player-ai' ? this.teammates : this.teammates);
    const chasers = pool.filter(p => p.role === 'chaser');
    const carrier = chasers[Math.floor(Math.random() * chasers.length)] || pool[0];
    if (carrier) {
      this.quaffleHolder = carrier;
      carrier.carrier = true;
    } else {
      this.quaffleHolder = null;
    }
  }

  setPossession(value) {
    this.possess = value;
    for (const p of [...this.teammates, ...this.opponents]) p.carrier = false;
    if (value === 'player') {
      this.quaffleHolder = 'player';
      return;
    }
    const pool = value === 'opp' ? this.opponents : this.teammates;
    const chasers = pool.filter(p => p.role === 'chaser');
    const carrier = chasers[Math.floor(Math.random() * chasers.length)] || pool[0];
    this.quaffleHolder = carrier || null;
    if (carrier) carrier.carrier = true;
  }

  say(text, tone = 'info') {
    this.ui.quidditchMessage(text, tone);
  }

  commentary(category) {
    const lines = COMMENTARY[category];
    if (!lines) return;
    if (this.elapsed - this.lastComment < 3.5) return;
    this.lastComment = this.elapsed;
    const line = lines[Math.floor(Math.random() * lines.length)];
    this.say(line, category === 'goal' ? 'gold' : category === 'save' ? 'ice' : category === 'snitchCatch' ? 'gold' : 'info');
    this.audio.speak(line);
  }

  /* ---------------------------------------------------------------- */
  /* Main loop                                                         */
  /* ---------------------------------------------------------------- */

  update(dt) {
    dt = Math.min(dt, 0.05);
    this.world.update(dt, this.camera);
    this.shake = Math.max(0, this.shake - dt * 2);
    this.stun = Math.max(0, this.stun - dt);
    this.player.stun = Math.max(0, this.player.stun - dt);
    this.actionCooldown = Math.max(0, this.actionCooldown - dt);
    this.passCooldown = Math.max(0, this.passCooldown - dt);
    this.diveTimer = Math.max(0, this.diveTimer - dt);

    if (this.phase === 'intro') {
      this.introTime += dt;
      this.introCountdown -= dt;
      this.updateCameraIntro(dt);
      this.updateAIModels(dt * 0.4);
      this.animateBalls(dt);
      const n = Math.ceil(this.introCountdown);
      if (this.introCountdown > 0.1) this.ui.quidditchCountdown(String(Math.max(1, n)));
      else this.ui.quidditchCountdown('PLAY!');
      if (this.introCountdown <= -0.7) {
        this.phase = 'play';
        this.ui.quidditchCountdown('');
        this.audio.sfx('whistle');
        this.audio.speak('The Quaffle is released!');
        this.commentary('quidStart');
      }
      this.ui.updateQuidditchHUD(this.hudData());
      return;
    }

    if (this.phase === 'done') {
      this.endTimer -= dt;
      this.updateCameraFinish(dt);
      this.updateAIModels(dt * 0.4);
      this.animateBalls(dt);
      if (this.endTimer <= 0 && !this.resultSent) {
        this.resultSent = true;
        this.game.completeQuidditch(this.buildSummary());
      }
      return;
    }

    this.elapsed += dt;
    this.timeLeft = Math.max(0, this.matchLength - this.elapsed);
    this.updatePlayer(dt);
    this.updateAIModels(dt);
    this.updateAttacks(dt);
    this.updateBalls(dt);
    this.updateSnitch(dt);
    this.updateBludgers(dt);
    this.updateCamera(dt);
    this.updateEffects(dt);

    if (this.timeLeft <= 0 && !this.snitchCaught) {
      this.endMatch(false, true);
    }

    this.hudTimer -= dt;
    if (this.hudTimer <= 0) {
      this.hudTimer = 0.08;
      this.ui.updateQuidditchHUD(this.hudData());
    }
  }

  updatePlayer(dt) {
    const p = this.player;
    const input = this.game.input;
    const stunned = p.stun > 0 || this.stun > 0;
    let moveX = input.joy.x;
    let moveY = -input.joy.y;
    if (stunned) {
      moveX *= 0.1; moveY *= 0.1;
    }
    const reflex = this.state.skills.reflex || 0;
    this.boostHeld = input.boost && this.boost > 1 && !stunned;
    if (this.boostHeld) {
      this.boost = Math.max(0, this.boost - 24 * dt);
    } else {
      this.boost = Math.min(100, this.boost + 8 * dt);
    }
    const baseSpeed = 19 + (this.state.skills.speed || 0) * 0.25;
    const target = (this.boostHeld ? baseSpeed * 1.6 : baseSpeed) * (stunned ? 0.3 : 1);
    p.speed = lerp(p.speed, target, 1 - Math.exp(-dt * 3.2));
    const turn = 1.45 + (this.state.skills.handling || 0) * 0.02;
    p.yaw -= moveX * turn * dt;
    p.pitch += moveY * turn * 0.52 * dt;
    p.pitch = clamp(p.pitch, -0.55, 0.55);
    if (Math.abs(moveY) < 0.05) p.pitch = lerp(p.pitch, 0, 1 - Math.exp(-dt * 2));
    // Softly guide a Quaffle carrier toward the hoop closest to their current aim.
    // Strong steering always wins, so the assist helps without fighting the player.
    this.aimTarget = null;
    if (this.role === 'chaser' && this.quaffleHolder === 'player') {
      const aim = this.getShotTarget(p.yaw, p.pitch);
      this.aimTarget = aim?.target || null;
      if (aim && aim.angle < 1.05) {
        const steering = clamp(1 - Math.hypot(moveX, moveY) * 0.72, 0.22, 1);
        const assist = (1 - Math.exp(-dt * 2.4)) * steering;
        p.yaw += angleDiff(aim.yaw, p.yaw) * assist;
        p.pitch = clamp(p.pitch + angleDiff(aim.pitch, p.pitch) * assist * 0.72, -0.55, 0.55);
      }
    }
    p.bank = lerp(p.bank, -moveX * 0.5, 1 - Math.exp(-dt * 5));
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(p.pitch, p.yaw, 0, 'YXZ'));
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(q);
    p.pos.addScaledVector(forward, p.speed * dt);
    // Arena bounds
    p.pos.x = clamp(p.pos.x, -87, 87);
    p.pos.z = clamp(p.pos.z, -48, 48);
    p.pos.y = clamp(p.pos.y, 3.2, 30);
    // hover bounce
    const hover = Math.sin(this.elapsed * 3.4) * 0.08;
    this.playerModel.position.copy(p.pos);
    this.playerModel.position.y += hover;
    this.playerModel.quaternion.copy(q);
    this.playerModel.rotateZ(p.bank);
    const rider = this.playerModel.userData;
    if (rider.robeTail) rider.robeTail.rotation.x = -1.0 + Math.sin(this.elapsed * 9) * 0.12;
    if (rider.scarfTail) rider.scarfTail.rotation.x = 0.3 + Math.sin(this.elapsed * 12) * 0.2;
    this.marker.ring.rotation.z += dt;
    this.marker.ring.material.opacity = 0.5 + Math.sin(this.elapsed * 3) * 0.2;
    this.trail.position.copy(p.pos).addScaledVector(forward, 3.2);
    this.trail.material.opacity = 0.12 + (this.boostHeld ? 0.2 : 0);
    this.trail.scale.setScalar(5 + p.speed * 0.12);

    // action
    if (input.consumeAction()) this.doAction();
    if (input.consumePass()) this.doPass();
    if (stunned) {
      p.pos.y = Math.max(3, p.pos.y - dt * 2);
    }
  }

  doAction() {
    const input = this.game.input;
    if (this.actionCooldown > 0) return;
    const role = this.role;
    if (role === 'chaser') {
      if (this.quaffleHolder === 'player') {
        this.playerShoot();
        this.actionCooldown = 1.1;
      } else if (this.nearOpponentCarrier()) {
        this.tackle();
        this.actionCooldown = 1.5;
      } else {
        this.player.boostDodge = 0.4;
        this.player.speed += 5;
        this.actionCooldown = 0.6;
        this.say('Pressing forward', 'info');
      }
    } else if (role === 'beater') {
      this.smashBludger();
      this.actionCooldown = 2.2;
    } else if (role === 'keeper') {
      this.keeperDive();
      this.actionCooldown = 0.8;
    } else if (role === 'seeker') {
      if (this.snitchReleased && this.snitch.visible) {
        if (this.player.pos.distanceTo(this.snitch.position) < 10) {
          this.catchSnitch('player', true);
        } else {
          this.say('The Snitch is too far — chase it down!', 'info');
          this.player.speed += 4;
        }
      } else {
        this.say('The Snitch is not out yet. Watch the skies.', 'info');
      }
      this.actionCooldown = 0.9;
    }
  }

  doPass() {
    if (this.role !== 'chaser' || this.quaffleHolder !== 'player' || this.passCooldown > 0) return;
    const teammates = this.teammates.filter(p => p.role === 'chaser');
    const target = teammates[Math.floor(Math.random() * teammates.length)];
    if (!target) return;
    this.passCooldown = 1.6;
    this.quaffleHolder = target;
    target.carrier = true;
    target.receiveBoost = 1.8;
    this.possess = 'player-ai';
    this.say(`Pass to ${target.name}`, 'info');
    this.audio.sfx('whoosh');
    this.attackTimer = Math.min(this.attackTimer, 2.6);
  }

  nearOpponentCarrier() {
    for (const o of this.opponents) {
      if (o.carrier && o.stunned <= 0) {
        if (this.player.pos.distanceTo(o.model.position) < 6.5) return true;
      }
    }
    return false;
  }

  tackle() {
    const carrier = this.opponents.find(o => o.carrier && this.player.pos.distanceTo(o.model.position) < 7);
    if (!carrier) return;
    const chance = 0.55 + (this.state.skills.reflex || 0) * 0.035;
    if (Math.random() < chance) {
      carrier.carrier = false;
      this.quaffleHolder = 'player';
      this.possess = 'player';
      this.say('Turnover! The Quaffle is yours', 'gold');
      this.audio.sfx('whoosh');
      this.commentary('tackle');
    } else {
      this.player.stun = 0.9;
      this.shake = 0.6;
      this.say('Tackle missed — you’re jostled', 'danger');
      this.audio.sfx('hit');
    }
  }

  getShotTarget(yaw = this.player.yaw, pitch = this.player.pitch) {
    const p = this.player;
    const forward = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(pitch, yaw, 0, 'YXZ'));
    let best = null;
    for (const target of this.hoopTargets) {
      if (target.side !== 1) continue;
      const offset = target.world.clone().sub(p.pos);
      const distance = offset.length();
      if (distance < 0.001) continue;
      const direction = offset.multiplyScalar(1 / distance);
      const dot = clamp(direction.dot(forward), -1, 1);
      const angle = Math.acos(dot);
      // Direction is the main factor; a small distance bias favors reachable hoops.
      const score = angle + distance * 0.0007;
      if (!best || score < best.score) {
        best = {
          target, distance, angle, score,
          yaw: Math.atan2(-direction.x, -direction.z),
          pitch: Math.asin(clamp(direction.y, -1, 1)),
        };
      }
    }
    return best;
  }

  playerShoot() {
    const p = this.player;
    const aim = this.getShotTarget();
    const best = aim?.target;
    if (!best) return;
    const dist = aim.distance;
    if (dist > 105) {
      this.say('Too far from the hoops — fly closer!', 'danger');
      this.ui.quidditchFlashAction('TOO FAR');
      return;
    }
    this.stats.shots += 1;
    this.quaffleHolder = null;
    this.possess = 'loose';
    this.shot = {
      team: 'player', from: this.quaffle.position.clone(), to: best.world.clone(),
      t: 0, duration: clamp(dist / 75, 0.35, 1.0), target: best, distance: dist,
      accuracy: clamp(0.97 - dist / 220 - aim.angle * 0.16 + (this.state.skills.power || 0) * 0.008, 0.48, 0.96),
      playerShot: true,
    };
    this.audio.sfx('whoosh');
    this.actionCooldown = 1.2;
    this.say(aim.angle < 0.22 ? 'Perfect aim — shot away!' : 'Shot away!', 'gold');
  }

  /* ---------------------------------------------------------------- */
  /* Combat & defence                                                  */
  /* ---------------------------------------------------------------- */

  smashBludger() {
    const p = this.player;
    let best = null, bestDist = 70;
    for (const b of this.bludgers) {
      if (b.userData.inFlight) continue;
      const d = p.pos.distanceTo(b.position);
      if (d < bestDist) { bestDist = d; best = b; }
    }
    if (!best) {
      this.say('No Bludger in range', 'info');
      return;
    }
    const target = this.nearestOpponent(p.pos) || this.opponents[0];
    if (!target) return;
    this.bludgerShots.push({
      mesh: best, from: best.position.clone(), to: target, t: 0, duration: 0.6,
      hit: false, target,
    });
    best.userData.inFlight = true;
    this.stats.bludgers += 1;
    this.audio.sfx('bludger');
    this.shake = Math.max(this.shake, 0.3);
    this.say(`Bludger away at ${target.name}!`, 'gold');
    this.commentary('bludger');
  }

  nearestOpponent(pos) {
    let best = null, bestD = Infinity;
    for (const o of this.opponents) {
      if (o.stunned > 0) continue;
      const d = pos.distanceTo(o.model.position);
      if (d < bestD) { bestD = d; best = o; }
    }
    return best;
  }

  keeperDive() {
    this.diveTimer = 1.2;
    this.player.speed *= 0.8;
    this.audio.sfx('whoosh');
    this.say('Dive!', 'gold');
    if (this.incoming && this.incoming.timer < 0.35) {
      this.trySave(this.incoming.target, true);
    }
  }

  trySave(target, manual = false) {
    const p = this.player;
    const dist = p.pos.distanceTo(target.world);
    const reflex = this.state.skills.reflex || 0;
    const chance = clamp(0.2 + (manual ? 0.38 : 0) + reflex * 0.035 + Math.max(0, (12 - dist)) * 0.035, 0.1, 0.95);
    if (dist < 13 || manual) {
      if (Math.random() < chance) {
        this.stats.saves += 1;
        this.score.player += 0;
        this.say('SAVED! What a stop!', 'ice');
        this.commentary('save');
        this.audio.sfx('save');
        this.world.confetti.burst();
        this.boardFlash('SAVE');
        return true;
      }
    }
    return false;
  }

  /* ---------------------------------------------------------------- */
  /* Attacks, scoring                                                  */
  /* ---------------------------------------------------------------- */

  updateAttacks(dt) {
    this.attackTimer -= dt;
    this.oppAttackTimer -= dt;
    const tactMod = this.tactics.id === 'aggressive' ? 0.8 : this.tactics.id === 'defensive' ? 1.25 : 1;

    if (this.oppAttackTimer <= 0) {
      this.oppAttackTimer = (11 + Math.random() * 5) * (this.tactics.id === 'defensive' ? 1.25 : this.tactics.id === 'aggressive' ? 0.85 : 1);
      if (this.role === 'keeper') {
        this.beginIncomingShot();
      } else {
        this.simulatedAttack('opp');
      }
    }

    if (this.attackTimer <= 0) {
      this.attackTimer = (13 + Math.random() * 6) * (this.role === 'chaser' ? 1.7 : 1) * tactMod;
      if (this.role !== 'chaser' || this.quaffleHolder !== 'player') {
        this.simulatedAttack('player');
      }
    }

    if (this.pendingReset > 0) {
      this.pendingReset -= dt;
      if (this.pendingReset <= 0) {
        this.resetQuaffle();
      }
    }

    if (this.role === 'keeper') {
      // opponent shots telegraph
      if (this.incoming) {
        this.incoming.timer -= dt;
        const target = this.incoming.target;
        target.glow.material.opacity = 0.55 + Math.sin(this.elapsed * 12) * 0.35;
        if (this.incoming.timer <= 0 && !this.incoming.launched) {
          this.incoming.launched = true;
          this.launchShot('opp', target, false);
          this.incoming = null;
        }
      }
    }

    // Bludger threat against player
    if (this.bludgerThreatTimer > 0) {
      this.bludgerThreatTimer -= dt;
      if (this.bludgerThreatTimer <= 0) {
        this.bludgerThreatTimer = 20 + Math.random() * 14;
        if (this.role !== 'beater' || Math.random() < 0.35) this.bludgerThreat();
      }
    }
  }

  simulatedAttack(team) {
    const tact = this.tactics.id;
    const diff = this.difficulty.ai;
    const chance = team === 'player'
      ? clamp(0.46 + (tact === 'aggressive' ? 0.09 : tact === 'defensive' ? -0.05 : 0) + (this.state.skills.power || 0) * 0.006, 0.2, 0.75)
      : clamp(0.44 + (diff - 0.97) * 0.18 + (tact === 'defensive' ? -0.08 : tact === 'aggressive' ? 0.05 : 0), 0.2, 0.72);
    if (Math.random() < chance) {
      const target = this.hoopTargets.filter(h => h.side === (team === 'player' ? 1 : -1))[Math.floor(Math.random() * 3)];
      this.launchShot(team, target, false, true);
    } else {
      // a save / miss event without a visible ball
      if (team === 'opp') {
        this.say('The Keeper palms it away!', 'ice');
        this.audio.sfx('save');
      } else {
        this.say('Saved by the opposing Keeper!', 'danger');
      }
    }
  }

  beginIncomingShot() {
    const targets = this.hoopTargets.filter(h => h.side === -1);
    const target = targets[Math.floor(Math.random() * targets.length)];
    this.incoming = { target, timer: 1.5, launched: false };
    this.boardFlash('INCOMING');
    this.say(`Shot incoming — ${target.y > 16 ? 'top' : target.y < 11 ? 'low' : 'middle'} hoop! Dive!`, 'danger');
    this.audio.sfx('whoosh');
    this.audio.vibrate(60);
  }

  launchShot(team, target, playerShot, quick = false) {
    const from = team === 'player'
      ? this.player.pos.clone()
      : new THREE.Vector3(-40 + Math.random() * 20, 10 + Math.random() * 10, (Math.random() - 0.5) * 30);
    this.quaffleHolder = null;
    this.possess = 'loose';
    this.shot = {
      team, from, to: target.world.clone(), t: 0,
      duration: quick ? 0.45 : 0.75, target, distance: from.distanceTo(target.world),
      accuracy: team === 'player' ? 0.7 : 0.6, playerShot: !!playerShot, resolveOnly: !playerShot && !quick,
    };
    this.actionCooldown = Math.max(this.actionCooldown, 0.2);
  }

  resolveShot() {
    const shot = this.shot;
    if (!shot) return;
    const team = shot.team;
    const target = shot.target;
    const accuracy = shot.accuracy;
    let scored = false;

    if (team === 'player') {
      const keeperSave = 0.32 + (this.difficulty.ai - 0.97) * 0.2;
      if (Math.random() > keeperSave && Math.random() < accuracy) {
        scored = true;
        this.score.player += 10;
        this.stats.goals += 1;
        this.world.confetti.burst();
        this.boardFlash('GOAL!');
        this.say('GOAL! The Quaffle flies through!', 'gold');
        this.commentary('goal');
        this.audio.sfx('goal');
      } else {
        this.say('Saved! The Keeper gets a hand to it', 'ice');
        this.audio.sfx('save');
      }
    } else {
      let saved = false;
      if (this.role === 'keeper') {
        const dist = this.player.pos.distanceTo(target.world);
        const reflex = this.state.skills.reflex || 0;
        const saveChance = 0.1 + Math.max(0, 14 - dist) * 0.035 + reflex * 0.03 + (this.diveTimer > 0 ? 0.35 : 0);
        if (Math.random() < clamp(saveChance, 0.05, 0.92)) {
          saved = true;
          this.stats.saves += 1;
          this.say('SAVED! You deny them!', 'ice');
          this.commentary('save');
          this.audio.sfx('save');
          this.boardFlash('SAVE');
        }
      } else {
        const saveChance = 0.36 - (this.difficulty.ai - 0.97) * 0.2;
        saved = Math.random() < saveChance;
      }
      if (!saved) {
        scored = true;
        this.score.opp += 10;
        this.say('The Quaffle is through — ten points to ' + this.opponent.name, 'danger');
        this.audio.sfx('crowd');
        this.boardFlash('TEN POINTS');
      }
    }
    if (scored) {
      target.glow.material.opacity = 0.9;
      this.audio.vibrate(45);
    }
    this.shot = null;
    this.pendingReset = 1.9;
    this.ui.quidditchScoreFlash(team, scored);
  }

  resetQuaffle() {
    this.quaffle.position.set(0, 12, 0);
    this.quaffle.visible = true;
    this.quaffleHolder = null;
    this.possess = 'loose';
    if (this.role === 'chaser' && Math.random() < 0.55) {
      this.quaffleHolder = 'player';
      this.possess = 'player';
    } else {
      const attackTeam = Math.random() < 0.5 ? 'player-ai' : 'opp';
      this.setPossession(attackTeam);
    }
    this.attackTimer = Math.min(this.attackTimer, 5);
    this.oppAttackTimer = Math.min(this.oppAttackTimer, 7);
  }

  /* ---------------------------------------------------------------- */
  /* Snitch                                                            */
  /* ---------------------------------------------------------------- */

  updateSnitch(dt) {
    if (!this.snitchReleased && this.elapsed >= 55) {
      this.snitchReleased = true;
      this.snitch.visible = true;
      this.snitch.position.set(0, 22, 0);
      this.snitchAiTimer = 32 + Math.random() * 22;
      this.audio.sfx('snitch');
      this.audio.speak('The Golden Snitch is released!');
      this.commentary('snitch');
      this.ui.quidditchBanner('THE GOLDEN SNITCH IS LOOSE');
      this.ui.quidditchCountdown('');
    }
    if (!this.snitchReleased) return;
    this.snitchRetarget -= dt;
    if (this.snitchRetarget <= 0) {
      this.snitchRetarget = 1.2 + Math.random() * 1.8;
      this.snitchTarget.set(
        (Math.random() - 0.5) * 150,
        9 + Math.random() * 20,
        (Math.random() - 0.5) * 80
      );
    }
    const speed = 12 + Math.random() * 3;
    this.snitch.position.lerp(this.snitchTarget, 1 - Math.exp(-dt * 1.2));
    this.snitch.position.y += Math.sin(this.elapsed * 4) * dt * 2;
    this.snitch.position.x = clamp(this.snitch.position.x, -80, 80);
    this.snitch.position.z = clamp(this.snitch.position.z, -44, 44);
    this.snitch.position.y = clamp(this.snitch.position.y, 7, 30);
    this.snitch.rotation.y += dt * 3;
    const wings = this.snitch.userData.wings;
    wings[0].rotation.y = Math.sin(this.elapsed * 26) * 0.8;
    wings[1].rotation.y = -Math.sin(this.elapsed * 26) * 0.8;
    this.snitchGlow.material.opacity = 0.45 + Math.sin(this.elapsed * 7) * 0.2;

    // AI seekers chase
    const seekers = [];
    for (const p of this.opponents) if (p.role === 'seeker') seekers.push({ p, team: 'opp' });
    for (const p of this.teammates) if (p.role === 'seeker') seekers.push({ p, team: 'player' });
    for (const s of seekers) {
      const target = this.snitch.position;
      const pos = s.p.model.position;
      pos.lerp(target, 1 - Math.exp(-dt * (0.28 + Math.random() * 0.05)));
      pos.y += Math.sin(this.elapsed * 2 + s.p.phase) * 0.02;
      const yaw = Math.atan2(-(target.x - pos.x), -(target.z - pos.z));
      s.p.model.rotation.y = yaw;
    }
    this.snitchAiTimer -= dt;
    if (this.snitchAiTimer <= 0) {
      if (this.role === 'seeker') {
        // Opponent Seeker makes a play if the player hasn't caught it
        if (this.player.pos.distanceTo(this.snitch.position) < 7.5 && Math.random() < 0.6) {
          this.catchSnitch('player', true);
          return;
        }
        this.catchSnitch('opp', false);
      } else {
        const ownSeeker = this.teammates.find(p => p.role === 'seeker');
        const enemy = this.opponents.find(p => p.role === 'seeker');
        if (ownSeeker && Math.random() < 0.42) this.catchSnitch('player', false);
        else if (enemy) this.catchSnitch('opp', false);
      }
      this.snitchAiTimer = 25 + Math.random() * 20;
    }
    // Player catch (Seeker only, but allow a desperate grab for any role very close)
    if (this.snitch.visible && this.player.pos.distanceTo(this.snitch.position) < 4.2) {
      if (this.role === 'seeker') {
        this.catchSnitch('player', true);
      }
    }
  }

  catchSnitch(team, byPlayer) {
    if (this.snitchCaught) return;
    this.snitchCaught = true;
    this.snitch.visible = false;
    if (team === 'player') {
      this.score.player += 150;
      if (byPlayer) this.stats.snitch = 1;
      this.say('THE SNITCH IS CAUGHT! 150 POINTS!', 'gold');
      this.audio.sfx('catch');
      this.audio.speak(byPlayer ? 'You caught the Snitch! One hundred and fifty points!' : 'Your Seeker has caught the Snitch!');
      this.world.confetti.burst();
      this.boardFlash('+150 SNITCH');
    } else {
      this.score.opp += 150;
      this.say(`The ${this.opponent.name} Seeker catches the Snitch — +150`, 'danger');
      this.audio.sfx('snitch');
      this.audio.speak('The opposing Seeker has caught the Golden Snitch.');
      this.boardFlash('+150 OPPONENT');
    }
    this.commentary('snitchCatch');
    this.endMatch(team === 'player', false, true);
  }

  /* ---------------------------------------------------------------- */
  /* Bludgers                                                          */
  /* ---------------------------------------------------------------- */

  updateBludgers(dt) {
    for (const b of this.bludgers) {
      if (b.userData.inFlight) continue;
      const t = this.elapsed * 0.7 + b.userData.phase;
      b.position.set(
        Math.sin(t * 0.9) * 52,
        12 + Math.sin(t * 1.7) * 8,
        Math.cos(t * 0.7) * 30
      );
      b.rotation.y += dt * 2;
    }
    for (let i = this.bludgerShots.length - 1; i >= 0; i--) {
      const s = this.bludgerShots[i];
      s.t += dt;
      const k = clamp(s.t / s.duration, 0, 1);
      const targetPos = s.target.model.position.clone();
      s.mesh.position.lerpVectors(s.from, targetPos, k);
      if (k >= 1 && !s.hit) {
        s.hit = true;
        s.target.stunned = 3.2;
        s.target.model.rotation.z = 0.8;
        this.audio.sfx('bludger');
        this.shake = 0.5;
        this.say(`${s.target.name} takes a Bludger!`, 'gold');
        if (s.target.carrier) {
          s.target.carrier = false;
          this.quaffleHolder = null;
          this.possess = 'loose';
          this.quaffle.position.copy(s.target.model.position);
          this.pendingReset = 1.4;
          this.say('The Quaffle is knocked loose!', 'gold');
        }
        this.bludgerShots.splice(i, 1);
        s.mesh.userData.inFlight = false;
        s.mesh.position.set(0, 30, 0);
      }
    }
  }

  bludgerThreat() {
    if (this.role === 'keeper' && this.incoming) return;
    this.ui.quidditchWarning('BLUDGER INCOMING');
    this.audio.sfx('bludger');
    const dodge = this.game.input.boost || Math.abs(this.game.input.joy.x) > 0.7;
    if (dodge && Math.random() < 0.6) {
      this.say('You dodge the Bludger!', 'ice');
      return;
    }
    this.player.stun = 1.3;
    this.shake = 1;
    this.audio.sfx('hit');
    this.audio.vibrate(100);
    if (this.quaffleHolder === 'player') {
      this.quaffleHolder = null;
      this.possess = 'loose';
      this.pendingReset = 1.5;
      this.say('Bludger hit! You drop the Quaffle', 'danger');
    } else {
      this.say('Bludger hit! Shake it off', 'danger');
    }
  }

  /* ---------------------------------------------------------------- */
  /* Balls, modelling, camera                                          */
  /* ---------------------------------------------------------------- */

  updateBalls(dt) {
    this.animateBalls(dt);
    // pickup
    if (this.possess === 'loose' && !this.shot && this.quaffle.visible) {
      const d = this.player.pos.distanceTo(this.quaffle.position);
      if (d < 5 && this.role === 'chaser' && this.player.stun <= 0) {
        this.quaffleHolder = 'player';
        this.possess = 'player';
        this.audio.sfx('whoosh');
        this.say('Quaffle secured', 'gold');
      } else if (d < 6) {
        if (this.role !== 'chaser') this.ui.quidditchHint('Only a Chaser can carry the Quaffle');
      }
    }
  }

  animateBalls(dt) {
    // Quaffle follows holder or flies along shot
    if (this.shot) {
      const s = this.shot;
      s.t += dt;
      const k = clamp(s.t / s.duration, 0, 1);
      const arc = Math.sin(k * Math.PI) * 8;
      this.quaffle.position.lerpVectors(s.from, s.to, k);
      this.quaffle.position.y += arc;
      this.quaffle.rotation.x += dt * 5;
      if (k >= 1) this.resolveShot();
    } else if (this.quaffleHolder === 'player') {
      const forward = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(this.player.pitch, this.player.yaw, 0, 'YXZ'));
      this.quaffle.position.copy(this.player.pos).addScaledVector(forward, 1.6);
      this.quaffle.position.y -= 0.45;
      this.quaffle.rotation.y += dt * 1.5;
    } else if (this.quaffleHolder && this.quaffleHolder.model) {
      const pos = this.quaffleHolder.model.position;
      const dir = this.quaffleHolder.team === 'player' ? 1 : -1;
      this.quaffle.position.set(pos.x + dir * 1.1, pos.y - 0.5, pos.z);
      this.quaffle.rotation.y += dt * 1.5;
    } else if (!this.shot && this.possess === 'loose') {
      this.quaffle.position.y = 12 + Math.sin(this.elapsed * 2.5) * 0.6;
      this.quaffle.rotation.y += dt;
    }
    // Bludger bobbing handled by updateBludgers
  }

  updateAIModels(dt) {
    for (const p of [...this.teammates, ...this.opponents]) {
      if (p.stunned > 0) {
        p.stunned -= dt;
        p.model.rotation.z = lerp(p.model.rotation.z, 0.9, 0.1);
        p.model.position.y = Math.max(4, p.model.position.y - dt * 3);
        if (p.stunned <= 0) p.model.rotation.z = 0;
        continue;
      }
      p.stunned = Math.max(0, p.stunned);
      const t = this.elapsed;
      const dir = p.team === 'player' ? 1 : -1;
      let x, y, z;
      if (p.role === 'keeper') {
        x = p.team === 'player' ? -80 : 80;
        y = 10 + Math.sin(t * 0.8 + p.phase) * 3;
        z = Math.sin(t * 1.1 + p.phase) * 18;
      } else if (p.role === 'seeker') {
        x = Math.sin(t * 0.45 + p.phase) * 30;
        y = 20 + Math.sin(t * 0.8 + p.phase) * 5;
        z = Math.cos(t * 0.6 + p.phase) * 20;
        if (this.snitchReleased) {
          x = lerp(x, this.snitch.position.x, 0.04);
          y = lerp(y, this.snitch.position.y, 0.04);
          z = lerp(z, this.snitch.position.z, 0.04);
        }
      } else if (p.role === 'beater') {
        x = Math.sin(t * 0.5 + p.phase) * 45 + dir * 5;
        y = 13 + Math.sin(t * 1.2 + p.phase) * 4;
        z = Math.cos(t * 0.65 + p.phase) * 26;
      } else {
        const lane = (p.phase * 13) % 30 - 15;
        x = Math.sin(t * 0.55 + p.phase) * 30 + dir * 12;
        y = 11 + Math.sin(t * 1.1 + p.phase) * 3;
        z = Math.cos(t * 0.4 + p.phase) * 22 + lane * 0.5;
      }
      if (p.carrier) {
        x = dir * 28 + Math.sin(t * 0.7 + p.phase) * 12;
        z = Math.sin(t * 0.9 + p.phase) * 12;
        y = 12 + Math.sin(t * 1.3) * 2;
      }
      p.model.position.set(x, y, z);
      const yaw = p.team === 'player' ? -Math.PI / 2 : Math.PI / 2;
      p.model.rotation.y = yaw + Math.sin(t * 0.7 + p.phase) * 0.2;
      p.model.rotation.z = Math.sin(t * 0.9 + p.phase) * 0.12;
    }
    // attach quaffle to AI carrier position handled in animateBalls
  }

  updateCameraIntro(dt, instant = false) {
    const t = this.introTime;
    const a = t * 0.35 + 0.8;
    const desired = new THREE.Vector3(Math.cos(a) * 120, 55 + Math.sin(t) * 6, Math.sin(a) * 95);
    if (instant) this.camera.position.copy(desired);
    else this.camera.position.lerp(desired, 1 - Math.exp(-dt * 2.2));
    this.camera.lookAt(0, 12, 0);
    this.camera.fov = 58;
    this.camera.updateProjectionMatrix();
  }

  updateCamera(dt) {
    const p = this.player;
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(p.pitch * 0.5, p.yaw, 0, 'YXZ'));
    const back = new THREE.Vector3(0, 4.6, 13.5).applyQuaternion(q);
    const desired = p.pos.clone().add(back);
    this.camera.position.lerp(desired, 1 - Math.exp(-dt * 5.2));
    if (this.shake > 0) {
      this.camera.position.x += (Math.random() - 0.5) * this.shake;
      this.camera.position.y += (Math.random() - 0.5) * this.shake;
    }
    const look = p.pos.clone().add(new THREE.Vector3(0, 2.2, 0));
    if (this.role === 'seeker' && this.snitchReleased) look.lerp(this.snitch.position, 0.15);
    else if (this.role === 'chaser' && this.quaffleHolder !== 'player') {
      const ball = this.quaffle.position;
      if (p.pos.distanceTo(ball) < 55) look.lerp(ball, 0.12);
    }
    this.camera.lookAt(look);
    const fovTarget = this.boostHeld ? 68 : 58;
    this.camera.fov = lerp(this.camera.fov, fovTarget, 1 - Math.exp(-dt * 2.5));
    this.camera.updateProjectionMatrix();
  }

  updateCameraFinish(dt) {
    const p = this.player.pos;
    const a = this.elapsed * 0.25 + 1;
    const desired = p.clone().add(new THREE.Vector3(Math.cos(a) * 28, 9, Math.sin(a) * 28));
    this.camera.position.lerp(desired, 1 - Math.exp(-dt * 1.6));
    this.camera.lookAt(p);
  }

  updateEffects(dt) {
    for (const h of this.hoopTargets) {
      if (this.incoming?.target === h) {
        h.glow.material.color.set('#ff6d68');
        h.glow.material.opacity = lerp(h.glow.material.opacity, 0.85, 1 - Math.exp(-dt * 5));
        h.glow.scale.setScalar(12 + Math.sin(this.elapsed * 8) * 1.2);
      } else if (this.aimTarget === h) {
        h.glow.material.color.set('#ffe29a');
        h.glow.material.opacity = lerp(h.glow.material.opacity, 0.68, 1 - Math.exp(-dt * 5));
        h.glow.scale.setScalar(10 + Math.sin(this.elapsed * 4) * 0.65);
      } else {
        h.glow.material.color.set('#ffd776');
        h.glow.material.opacity = lerp(h.glow.material.opacity, 0.2, 1 - Math.exp(-dt * 4));
        h.glow.scale.setScalar(10);
      }
    }
    if (this.crowdNoise > 0) this.crowdNoise -= dt;
    // animate snitch visibility
    if (this.snitch.visible) this.snitch.rotation.y += dt;
  }

  /* ---------------------------------------------------------------- */
  /* Match end                                                         */
  /* ---------------------------------------------------------------- */

  endMatch(won, timeUp = false, fromSnitch = false) {
    if (this.phase === 'done' || this.phase === 'ending') return;
    this.phase = 'done';
    this.endTimer = 3.0;
    this.won = this.score.player > this.score.opp;
    if (timeUp) {
      this.say(this.won ? 'FULL TIME! Victory is yours!' : 'Full time. The scoreboard is cruel.', this.won ? 'gold' : 'danger');
      this.commentary('time');
    }
    this.audio.sfx(this.won ? 'win' : 'lose');
    if (this.won) {
      this.world.confetti.burst();
      this.boardFlash('VICTORY');
    } else {
      this.boardFlash('FULL TIME');
    }
    this.audio.speak(this.won ? `${this.nation.name} wins!` : `${this.opponent.name} wins.`);
    this.game.input.clear();
  }

  buildSummary() {
    return {
      nationId: this.nation.id, nationName: this.nation.name,
      opponentId: this.opponent.id, opponentName: this.opponent.name,
      round: this.round, roundName: this.roundName,
      role: this.role, tactics: this.tactics.id, difficulty: this.difficulty.id,
      scoreFor: this.score.player, scoreAgainst: this.score.opp,
      won: this.score.player > this.score.opp,
      goals: this.stats.goals, saves: this.stats.saves, bludgers: this.stats.bludgers,
      snitch: this.stats.snitch, shots: this.stats.shots,
      timeLeft: this.timeLeft, snitchCaught: this.snitchCaught,
    };
  }

  boardFlash(text) {
    this.ui.quidditchScoreFlash(text);
  }

  hudData() {
    const action = this.actionLabel();
    return {
      scorePlayer: this.score.player, scoreOpp: this.score.opp,
      nation: this.nation, opponent: this.opponent,
      timeLeft: this.timeLeft, role: this.role,
      action, actionCooldown: this.actionCooldown,
      boost: this.boost / 100, carrying: this.quaffleHolder === 'player',
      pass: this.role === 'chaser' && this.quaffleHolder === 'player',
      snitchReleased: this.snitchReleased,
      snitchVisible: this.snitch.visible,
      incoming: this.incoming?.target || null,
      aimTargetY: this.aimTarget?.y ?? null,
      playerPos: this.player.pos, playerYaw: this.player.yaw,
      quafflePos: this.quaffle.position, snitchPos: this.snitch.position,
      opponents: this.opponents, teammates: this.teammates,
      roleInfo: this.roleInfo,
      match: this,
    };
  }

  actionLabel() {
    if (this.actionCooldown > 0) return `${this.role === 'beater' ? 'SMASH' : this.role === 'keeper' ? 'DIVE' : this.role === 'seeker' ? 'GRAB' : 'SHOOT'}`;
    if (this.role === 'chaser') {
      if (this.quaffleHolder === 'player') return 'SHOOT';
      if (this.nearOpponentCarrier()) return 'TACKLE';
      return 'DASH';
    }
    if (this.role === 'beater') return 'SMASH';
    if (this.role === 'keeper') return 'DIVE';
    return 'GRAB';
  }

  /* ---------------------------------------------------------------- */
  /* Substitutions & tactics                                           */
  /* ---------------------------------------------------------------- */

  substituteRole(roleId) {
    const next = POSITIONS.find(p => p.id === roleId);
    if (!next || next.id === this.role || this.phase === 'done') return;
    if (this.quaffleHolder === 'player') {
      this.quaffleHolder = null;
      this.possess = 'loose';
      this.quaffle.position.copy(this.player.pos);
      this.pendingReset = 1.1;
    }
    this.role = next.id;
    this.roleInfo = next;
    this.player.role = next.id;
    this.player.pos.copy(this.startPosition(next.id));
    this.player.yaw = -Math.PI / 2;
    this.player.pitch = 0;
    this.player.bank = 0;
    this.player.speed = 0;
    this.player.stun = 0;
    this.playerModel.position.copy(this.player.pos);
    this.incoming = null;
    this.actionCooldown = 0.4;
    this.diveTimer = 0;
    if (this.role === 'chaser' && this.possess === 'loose') {
      this.attackTimer = Math.min(this.attackTimer, 4);
    }
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, this.player.yaw, 0, 'YXZ'));
    const back = new THREE.Vector3(0, 4.6, 13.5).applyQuaternion(q);
    this.camera.position.copy(this.player.pos).add(back);
    this.camera.lookAt(this.player.pos.x, this.player.pos.y + 2.2, this.player.pos.z);
    const chip = document.getElementById('quid-role');
    if (chip) chip.textContent = next.name;
    const actionBtn = document.getElementById('btn-action');
    if (actionBtn) {
      const label = actionBtn.querySelector('#quid-action');
      if (label) label.textContent = this.actionLabel();
    }
    this.ui.quidditchBanner(`SUBSTITUTION · ${next.name.toUpperCase()}`);
    this.say(`You are now playing ${next.name}. ${next.desc}`, 'gold');
    this.audio.sfx('whistle');
  }

  setTactics(id) {
    const next = TACTICS.find(t => t.id === id);
    if (!next) return;
    this.tactics = next;
    this.ui.quidditchBanner(`TACTICS · ${next.name.toUpperCase()}`);
    this.say(`Tactics set to ${next.name}. ${next.desc}`, 'gold');
  }

  dispose() {
    this.audio.setMode('menu');
  }
}
