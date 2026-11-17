import * as THREE from 'three';
import { buildRaceWorld, createBroomModel, glowSprite, addPlayerMarker } from './world.js';
import { AI_NAMES, COMMENTARY, DIFFICULTIES } from './data.js';
import { getBroom, getBroomStats, formatTime } from './state.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;

function angleDiff(target, current) {
  let d = target - current;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}

export class RaceGame {
  constructor(game, cfg) {
    this.game = game;
    this.cfg = cfg;
    this.track = cfg.track;
    this.mode = cfg.mode || 'quick';
    this.difficulty = DIFFICULTIES.find(d => d.id === (cfg.difficulty || 'pro')) || DIFFICULTIES[1];
    this.state = game.state;
    this.N = this.track.points.length;
    this.laps = cfg.laps || ((this.mode === 'trial' || this.mode === 'qualify') ? 1 : this.track.laps);
    this.world = buildRaceWorld(this.track, this.state.settings.quality);
    this.scene = this.world.scene;
    this.camera = new THREE.PerspectiveCamera(62, game.aspect, 0.15, 2000);
    this.camera.position.set(0, 80, 120);
    this.game.renderer.shadowMap.enabled = this.state.settings.quality !== 'low';

    this.elapsed = 0;
    this.phase = 'intro';
    this.introTime = 0;
    this.countdown = 4.6;
    this.finished = false;
    this.endTimer = 0;
    this.resultSent = false;
    this.passed = 0;
    this.lapStart = 0;
    this.lapTimes = [];
    this.bestLap = null;
    this.boostTime = 0;
    this.rank = 1;
    this.shake = 0;
    this.wobble = 0;
    this.collisionCooldown = 0;
    this.time = 0;
    this.hudTimer = 0;
    this.weatherChangeTimer = 34 + Math.random() * 25;
    this.weatherType = this.track.weather;
    this.messageTimer = 0;
    this.lastCommentary = -99;
    this.lapMessageShown = 0;
    this.boostWasHeld = false;
    this.padCooldown = 0;
    this.goTimer = 0;

    const stats = getBroomStats(this.state, this.cfg.broomId);
    this.stats = stats;
    this.speedBase = 37.5 + stats.speed * 0.165;
    this.accel = 10 + stats.accel * 0.12;
    this.turnRate = 0.82 + stats.handling * 0.0076;
    this.boostPower = 1.16 + stats.boost * 0.0021;

    const startGate = this.world.gates[0];
    const tangent = this.gateTangent(0);
    const startPos = startGate.pos.clone().addScaledVector(tangent, -8);
    this.player = {
      pos: startPos, yaw: Math.atan2(-tangent.x, -tangent.z), pitch: Math.asin(clamp(tangent.y, -0.7, 0.7)),
      bank: 0, speed: 0, boost: 100, nextGate: 0, passed: 0, wobble: 0, lastPad: -1,
      trailPos: startPos.clone(),
    };
    const broom = getBroom(this.cfg.broomId);
    const livery = (game.state.brooms.livery && this.game.liveryColor()) || broom.accent;
    this.playerModel = createBroomModel({
      robe: this.state.profile.robe, skin: this.state.profile.skin, hair: this.state.profile.hair,
      livery, wood: broom.colors, scale: 1.12,
    });
    this.playerModel.position.copy(this.player.pos);
    this.scene.add(this.playerModel);
    this.marker = addPlayerMarker(this.playerModel, '#ffd873');
    this.trail = glowSprite(livery, 8, 0.18);
    this.trail.position.copy(this.player.pos);
    this.scene.add(this.trail);

    // AI competitors
    this.ais = [];
    const count = this.mode === 'trial' ? 0 : this.mode === 'practice' ? 3 : 5;
    const robeColors = ['#2b4f8c', '#2f6b48', '#6f2c5f', '#8a5a24', '#364326', '#5c2b2b'];
    for (let i = 0; i < count; i++) {
      const skill = clamp(this.difficulty.ai + (Math.random() - 0.5) * 0.12, 0.7, 1.2);
      const model = createBroomModel({
        robe: robeColors[i % robeColors.length], skin: ['#e0b48b', '#b98460', '#8a5b3f', '#f0c9a6'][i % 4],
        hair: ['#2d1d14', '#6d4a2d', '#a8793f', '#1c1713'][i % 4],
        livery: ['#e3bd63', '#7dd8f0', '#c0392b', '#8fd8a5', '#c7a8ff'][i % 5],
        wood: ['#4a2f1d', '#3f3a45', '#6b4a2c', '#565a63'][i % 4],
        scale: 1.08,
      });
      model.position.copy(this.world.gates[0].pos);
      this.scene.add(model);
      this.ais.push({
        id: i, name: AI_NAMES[(i + (this.track.id.length || 0)) % AI_NAMES.length],
        u: 0, lap: 1, speed: (41 + skill * 7 + Math.random() * 2.4) * (this.mode === 'practice' ? 0.86 : 1),
        model, finished: false, finishTime: null, phase: Math.random() * 6,
        lane: (i - (count - 1) / 2) * 2.2, baseSpeed: (41 + skill * 7),
        skill, wobble: 0.2 + Math.random() * 0.3,
      });
    }
    this.curveLen = this.world.curve.getLength();
    this.beacon = glowSprite('#ffe08a', 34, 0.4);
    this.scene.add(this.beacon);
    this.audio = game.audio;
    this.audio.setMode('race');
    this.ui = game.ui;
    this.ui.showRaceHUD(this);
    this.game.input.bindRace();
    this.updateGateHighlight();
    this.ui.raceMessage('Follow the golden hoops', 'info');
    this.audio.sfx('crowd');
    this.audio.speak('Riders, mount your brooms.');
  }

  gateTangent(i) {
    const pts = this.track.points;
    const n = this.N;
    const prev = new THREE.Vector3(...pts[(i - 1 + n) % n]);
    const next = new THREE.Vector3(...pts[(i + 1) % n]);
    return next.sub(prev).normalize();
  }

  say(text, tone = 'info', speak = false) {
    this.ui.raceMessage(text, tone);
    if (speak) this.audio.speak(text);
  }

  commentary(category, speak = true) {
    const lines = COMMENTARY[category];
    if (!lines) return;
    if (this.elapsed - this.lastCommentary < 5) return;
    this.lastCommentary = this.elapsed;
    const line = lines[Math.floor(Math.random() * lines.length)];
    this.say(line, category === 'hit' ? 'danger' : 'gold', speak);
  }

  updateGateHighlight() {
    const next = this.world.gates[this.player.nextGate % this.N];
    this.world.gates.forEach((g, i) => {
      const active = g === next && !this.finished;
      g.ring.material.emissiveIntensity = active ? 2.6 : 0.7 + (g.mod !== 'normal' ? 0.5 : 0);
      g.ring2.material.opacity = active ? 0.95 : 0.4;
      g.inner.material.opacity = active ? 0.13 : 0.035;
      g.glow.material.opacity = active ? 0.65 : 0.22;
      g.group.scale.setScalar(1);
      g.active = active;
    });
    if (next) {
      this.beacon.position.copy(next.pos);
      this.beacon.position.y += 13;
      this.beacon.material.color.set(next.color);
    }
  }

  passGate() {
    const gate = this.world.gates[this.player.nextGate % this.N];
    const mod = gate.mod;
    let advance = 1;
    const booster = mod === 'boost';
    const warp = mod === 'warp';
    if (warp) {
      advance = 2;
      this.player.wobble = 2.4;
      this.player.speed *= 0.86;
      this.player.boost = Math.max(0, this.player.boost - 18);
      this.shake = 0.9;
      this.audio.sfx('warp');
      this.commentary('warp');
    } else {
      this.player.boost = Math.min(100, this.player.boost + (booster ? 32 : 10));
      this.player.speed += booster ? 8 : 2.4;
      this.audio.sfx('checkpoint');
      if (booster) {
        this.audio.sfx('boost');
        this.say('Boost hoop! Broom magic surges', 'gold');
      }
    }
    gate.ring.material.emissiveIntensity = 5;
    // sparkle ring
    this.shake = Math.max(this.shake, 0.12);
    this.audio.vibrate(booster ? 22 : 8);
    this.player.passed = Math.min(this.laps * this.N, this.player.passed + advance);
    this.player.nextGate = this.player.passed % this.N;
    if (this.player.passed >= this.laps * this.N) {
      this.finishRace();
      return;
    }
    const newLap = Math.floor(this.player.passed / this.N) + 1;
    if (this.player.nextGate === 0 && this.player.passed > 0 && this.lapMessageShown < newLap) {
      const lapTime = (this.elapsed - this.lapStart) * 1000;
      this.lapTimes.push(lapTime);
      if (!this.bestLap || lapTime < this.bestLap) this.bestLap = lapTime;
      this.lapStart = this.elapsed;
      this.lapMessageShown = newLap;
      if (this.player.passed < this.laps * this.N) {
        this.say(newLap === this.laps ? 'FINAL LAP — everything to fly for!' : `Lap ${newLap} of ${this.laps}`, 'gold', true);
        this.audio.sfx('whistle');
        this.commentary('lap');
      }
    }
    this.updateGateHighlight();
  }

  finishRace() {
    if (this.finished) return;
    this.finished = true;
    this.phase = 'finished';
    this.finishTime = this.elapsed;
    if (this.lapTimes.length === 0 && this.elapsed > 0) {
      this.lapTimes.push(this.elapsed * 1000);
      this.bestLap = this.elapsed * 1000;
    }
    this.rank = this.currentRank(true);
    this.endTimer = 2.4;
    this.goTimer = 0;
    this.ui.raceCountdown('', '');
    this.audio.sfx(this.rank <= 3 ? 'win' : 'lose');
    this.commentary(this.rank <= 3 ? 'win' : 'lose');
    this.ui.raceFinishFlash(this.rank);
    const g = this.world.gates[this.player.nextGate % this.N] || this.world.gates[0];
    if (g) {
      this.beacon.position.copy(g.pos);
      this.beacon.visible = false;
    }
    this.game.input.clear();
  }

  currentRank(force = false) {
    if (this.finished && !force) return this.rank;
    return this.rankEntries().find(r => r.player)?.pos ?? 1;
  }

  rankEntries() {
    const list = [{
      name: this.state.profile.name, player: true,
      finished: this.finished,
      time: this.finished ? this.finishTime : null,
      progress: this.player.passed / this.N,
    }];
    for (const ai of this.ais) {
      list.push({
        name: ai.name, player: false,
        finished: ai.finished,
        time: ai.finished ? ai.finishTime : null,
        progress: ai.lap - 1 + ai.u,
      });
    }
    list.sort((a, b) => {
      if (a.finished && b.finished) return a.time - b.time;
      if (a.finished !== b.finished) return a.finished ? -1 : 1;
      return b.progress - a.progress;
    });
    list.forEach((r, i) => { r.pos = i + 1; });
    return list;
  }

  standings() {
    return this.rankEntries().map(r => ({
      name: r.name, player: r.player,
      score: r.progress, time: r.time, pos: r.pos,
    }));
  }

  buildSummary() {
    const standings = this.standings().map(r => ({
      ...r,
      timeText: r.time ? formatTime(r.time * 1000) : '—',
      gap: r.time && this.finishTime ? r.time - this.finishTime : null,
    }));
    let pos = this.rank;
    const playerRow = standings.find(r => r.player);
    if (playerRow) pos = playerRow.pos;
    return {
      track: this.track, trackId: this.track.id, trackName: this.track.name,
      mode: this.mode, difficulty: this.difficulty.id, pos,
      totalTime: this.finishTime * 1000, bestLap: this.bestLap,
      lapTimes: this.lapTimes, boostTime: this.boostTime,
      standings, laps: this.laps, championship: this.cfg.championship || null,
      weather: this.weatherType,
    };
  }

  setWeather(type, announce = true) {
    if (type === this.weatherType) return;
    this.weatherType = type;
    this.world.weather.setType(type);
    const label = { clear: 'Clear skies', rain: 'Rain', snow: 'Snow', storm: 'Storm' }[type] || type;
    if (announce) this.say(`Conditions shifting — ${label.toLowerCase()}`, type === 'storm' ? 'danger' : 'info', true);
    this.audio.sfx(type === 'storm' ? 'hit' : 'whoosh');
  }

  update(dt) {
    this.time += dt;
    this.world.update(dt, this.camera);
    this.shake = Math.max(0, this.shake - dt * 2.4);
    this.collisionCooldown = Math.max(0, this.collisionCooldown - dt);
    this.padCooldown = Math.max(0, this.padCooldown - dt);
    this.wobble = Math.max(0, this.wobble - dt);
    this.player.wobble = Math.max(0, this.player.wobble - dt);

    if (this.phase === 'intro') {
      this.introTime += dt;
      this.countdown -= dt;
      this.updateIntroCamera(dt);
      this.updateWeatherVisual(dt);
      const n = Math.ceil(this.countdown);
      if (this.countdown > 0.2) {
        this.ui.raceCountdown(String(Math.max(1, n)), this.countdown < 3.2 ? 'go-soon' : '');
      } else if (this.countdown > -0.9) {
        this.ui.raceCountdown('GO!', 'go');
        if (this.phase === 'intro' && this.countdown < 0) {
          this.phase = 'race';
          this.goTimer = 1.1;
          this.audio.sfx('whistle');
          this.audio.speak('And they are off!');
          this.ui.raceMessage('GO!', 'gold');
          this.commentary('raceStart', false);
        }
      } else {
        this.ui.raceCountdown('', '');
      }
      this.updateModelsIdle(dt);
      if (this.phase === 'race') this.lapStart = 0;
    } else if (this.phase === 'race') {
      if (this.goTimer > 0) {
        this.goTimer -= dt;
        if (this.goTimer <= 0) this.ui.raceCountdown('', '');
      }
      this.elapsed += dt;
      this.updatePlayer(dt);
      this.updateAIs(dt);
      this.updateCamera(dt);
      this.updateWeather(dt);
      this.checkPickups(dt);
      this.hudTimer -= dt;
      if (this.hudTimer <= 0) {
        this.hudTimer = 0.09;
        this.updateHUD();
      }
      if (this.audio.settings === false) { /* no-op */ }
      this.audio.update?.(0);
    } else {
      this.endTimer -= dt;
      this.updateAIs(dt * 0.65);
      this.rank = this.currentRank();
      this.updateFinishCamera(dt);
      this.updateHUD();
      if (this.endTimer <= 0 && !this.resultSent) {
        this.resultSent = true;
        this.game.completeRace(this.buildSummary());
      }
    }
    if (this.phase !== 'finished') this.updateHUD();
  }

  updateWeatherVisual(dt) {
    // subtle lightning flash already handled by world
  }

  updateWeather(dt) {
    this.weatherChangeTimer -= dt;
    if (this.weatherChangeTimer <= 0 && !this.finished) {
      this.weatherChangeTimer = 35 + Math.random() * 20;
      const pool = this.track.weather === 'clear'
        ? ['clear', 'rain', 'storm']
        : this.track.weather === 'rain'
          ? ['rain', 'clear', 'storm']
          : this.track.weather === 'snow'
            ? ['snow', 'storm', 'snow']
            : ['storm', 'rain'];
      const other = pool.filter(p => p !== this.weatherType);
      this.setWeather(other[Math.floor(Math.random() * other.length)]);
    }
    if (this.world.weather.flash > 0.5) this.shake = Math.max(this.shake, 0.08);
  }

  updateIntroCamera(dt) {
    const gate = this.world.gates[0];
    const t = this.introTime;
    const a = 0.6 + t * 0.32;
    const target = this.player.pos.clone();
    const desired = target.clone().add(new THREE.Vector3(Math.cos(a) * 26, 7 + Math.sin(t * 0.8) * 3, Math.sin(a) * 26));
    if (this.camera.position.lengthSq() < 100) this.camera.position.copy(desired);
    this.camera.position.lerp(desired, 1 - Math.exp(-dt * 2.5));
    this.camera.lookAt(target.x, target.y + 1.2, target.z);
    this.camera.fov = lerp(this.camera.fov, 55, 1 - Math.exp(-dt * 2));
    this.camera.updateProjectionMatrix();
    // idle broom banking
    this.playerModel.rotation.z = Math.sin(t * 1.2) * 0.05;
    this.playerModel.position.y = this.player.pos.y + Math.sin(t * 2) * 0.12;
    this.trail.position.copy(this.playerModel.position).add(new THREE.Vector3(0, -0.4, 2.4));
    this.updateAIModels(dt);
  }

  updateModelsIdle(dt) {
    this.playerModel.position.copy(this.player.pos);
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(this.player.pitch, this.player.yaw, 0, 'YXZ'));
    this.playerModel.quaternion.copy(q);
    const rider = this.playerModel.userData;
    if (rider.robeTail) rider.robeTail.rotation.x = -1.0 + Math.sin(this.time * 5) * 0.12;
    if (rider.scarfTail) rider.scarfTail.rotation.x = 0.3 + Math.sin(this.time * 8) * 0.2;
    this.updateAIModels(dt);
  }

  updatePlayer(dt) {
    const input = this.game.input;
    const player = this.player;
    const stats = this.stats;
    const boostHeld = input.boost && player.boost > 1 && this.wobble <= 0.05;
    const braking = input.brake;
    const weatherMul = this.weatherType === 'storm' ? 0.82 : this.weatherType === 'snow' ? 0.9 : this.weatherType === 'rain' ? 0.94 : 1;
    let target = this.speedBase;
    if (this.mode === 'trial') target += 2;
    if (boostHeld) {
      target *= this.boostPower;
      player.boost = Math.max(0, player.boost - 27 * dt);
      this.boostTime += dt;
      if (!this.boostWasHeld) {
        this.audio.sfx('boost');
        this.audio.speak('Boost!');
        this.commentary('boost', false);
        this.shake = Math.max(this.shake, 0.2);
      }
      this.boostWasHeld = true;
    } else {
      this.boostWasHeld = false;
      player.boost = Math.min(100, player.boost + (braking ? 11 : 5.5) * dt);
    }
    if (braking) target *= 0.58;
    target *= weatherMul;
    const accelRate = this.accel * (boostHeld ? 1.4 : 1);
    player.speed = lerp(player.speed, target, 1 - Math.exp(-dt * (accelRate / 13)));
    if (player.speed < 8) player.speed = Math.min(target, player.speed + 18 * dt);

    let steer = input.joy.x;
    let pitchIn = -input.joy.y;
    if (this.wobble > 0 || player.wobble > 0) {
      steer += Math.sin(this.time * 8.5) * 0.35;
      pitchIn += Math.cos(this.time * 7.2) * 0.12;
    }
    const handleMul = (this.weatherType === 'storm' ? 0.72 : this.weatherType === 'snow' ? 0.8 : this.weatherType === 'rain' ? 0.88 : 1);
    player.yaw -= steer * this.turnRate * dt * 1.15 * handleMul;
    player.pitch += pitchIn * dt * 1.1 * handleMul;
    player.pitch = clamp(player.pitch, -0.72, 0.72);
    if (Math.abs(pitchIn) < 0.06) player.pitch = lerp(player.pitch, 0, 1 - Math.exp(-dt * 1.7));

    // gentle course assist to keep mobile flight forgiving
    const nextGate = this.world.gates[player.nextGate % this.N];
    if (nextGate) {
      const to = nextGate.pos.clone().sub(player.pos);
      const dist = to.length();
      if (dist < 170) {
        const desiredYaw = Math.atan2(-to.x, -to.z);
        const dy = angleDiff(desiredYaw, player.yaw);
        if (Math.abs(steer) < 0.12 && Math.abs(dy) < 0.75) player.yaw += dy * dt * 0.85;
        const horiz = Math.hypot(to.x, to.z);
        const desiredPitch = clamp(Math.atan2(to.y, horiz), -0.6, 0.6);
        if (Math.abs(pitchIn) < 0.15) player.pitch = lerp(player.pitch, desiredPitch, 1 - Math.exp(-dt * 0.65));
        // keep player near the racing line if very wide
        if (dist < 60) {
          const tangent = this.gateTangent(player.nextGate % this.N);
          const side = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 1, 0)).normalize();
          const lateral = to.dot(side);
          if (Math.abs(lateral) > 28) player.yaw += Math.sign(lateral) * -0.2 * dt;
        }
      }
    }

    player.bank = lerp(player.bank, -steer * 0.55 + player.wobble * 0.2, 1 - Math.exp(-dt * 6));
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(player.pitch, player.yaw, 0, 'YXZ'));
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(q);
    const wind = (0.45 + Math.sin(this.time * 0.8) * 0.3) * this.track.wind * (this.weatherType === 'storm' ? 3.4 : 1);
    player.pos.addScaledVector(forward, player.speed * dt);
    player.pos.x += Math.sin(this.time * 0.5 + 0.4) * wind * dt;
    player.pos.z += Math.cos(this.time * 0.4) * wind * dt;
    const minY = this.world.theme.groundY + 5;
    if (player.pos.y < minY) { player.pos.y = minY; player.pitch = Math.max(0.05, player.pitch); }
    player.pos.y = Math.min(player.pos.y, 190);
    const r = Math.hypot(player.pos.x, player.pos.z);
    if (r > 780) {
      player.pos.x *= 780 / r; player.pos.z *= 780 / r;
    }

    // orient model
    this.playerModel.position.copy(player.pos);
    this.playerModel.quaternion.copy(q);
    this.playerModel.rotateZ(player.bank);
    const rider = this.playerModel.userData;
    if (rider.robeTail) rider.robeTail.rotation.x = -1.0 + Math.sin(this.time * 9) * 0.08 + Math.min(0.25, player.speed / 300);
    if (rider.scarfTail) rider.scarfTail.rotation.x = 0.3 + Math.sin(this.time * 13) * 0.18 + 0.12;
    this.playerModel.position.y += Math.sin(this.time * 4) * 0.035;
    this.marker.ring.rotation.z += dt * 0.8;
    this.marker.ring.material.opacity = 0.55 + Math.sin(this.time * 3) * 0.2;
    this.trail.position.copy(player.pos).addScaledVector(forward, 3.2);
    this.trail.material.opacity = clamp((player.speed - 20) / 120, 0, 0.34) + (boostHeld ? 0.22 : 0);
    this.trail.scale.setScalar(5 + player.speed * 0.07);

    // gate pass
    if (nextGate) {
      const d = player.pos.distanceTo(nextGate.pos);
      if (d < 11.5) this.passGate();
    }

    // boost pads
    if (this.padCooldown <= 0) {
      for (const pad of this.world.pads) {
        if (player.pos.distanceTo(pad.pos) < 6.5) {
          player.boost = Math.min(100, player.boost + 30);
          player.speed += 7;
          this.padCooldown = 0.85;
          this.audio.sfx('whoosh');
          this.ui.raceMessage('Boost ring!', 'gold');
          this.shake = Math.max(this.shake, 0.12);
          break;
        }
      }
    }

    // obstacle collisions
    if (this.collisionCooldown <= 0) {
      for (const o of this.world.obstacles) {
        if (player.pos.distanceTo(o.pos) < o.radius + 1.4) {
          this.collisionCooldown = 1.4;
          player.speed *= 0.42;
          player.boost = Math.max(0, player.boost - 12);
          player.wobble = 0.9;
          this.shake = 1;
          this.audio.sfx('hit');
          this.audio.vibrate(90);
          this.ui.raceHit();
          this.commentary('hit');
          break;
        }
      }
    }

    // lap 1 start bookkeeping
    if (this.player.passed === 0 && this.elapsed > 0.2) this.lapStart = Math.max(this.lapStart, 0);
  }

  updateAIs(dt) {
    const len = this.curveLen || 1;
    const playerPos = this.player.pos;
    for (const ai of this.ais) {
      if (ai.finished) {
        ai.model.position.y += Math.sin(this.time * 3 + ai.phase) * dt * 0.02;
        continue;
      }
      // rubber banding keeps races close but leaves skill meaningful
      const aiScore = (ai.lap - 1 + ai.u);
      const playerScore = this.player.passed / this.N;
      let rubber = 0;
      if (aiScore < playerScore - 0.08) rubber = 0.065;
      if (aiScore > playerScore + 0.12) rubber = -0.04;
      const speed = ai.baseSpeed * this.difficulty.ai * (1 + rubber) * (this.weatherType === 'storm' ? 0.9 : 1);
      ai.u += (speed * dt) / len;
      ai.lap += Math.floor(ai.u);
      ai.u = ((ai.u % 1) + 1) % 1;
      if (ai.lap > this.laps) {
        ai.finished = true;
        ai.lap = this.laps;
        ai.u = 1;
        ai.finishTime = this.elapsed;
        ai.model.position.set(0, -500, 0);
        continue;
      }
      const t = (ai.lap - 1 + ai.u) / this.laps;
      const u = clamp(ai.u, 0, 0.9999);
      const pos = this.world.curve.getPointAt(u);
      const tangent = this.world.curve.getTangentAt(u);
      const side = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 1, 0)).normalize();
      const wob = Math.sin(this.time * 0.55 + ai.phase) * (2 + ai.wobble * 4) + ai.lane;
      pos.addScaledVector(side, wob);
      pos.y += Math.sin(this.time * 0.9 + ai.phase) * 2.4;
      ai.model.position.copy(pos);
      const yaw = Math.atan2(-tangent.x, -tangent.z);
      const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, yaw, 0));
      q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.sin(this.time * 0.8 + ai.phase) * 0.2));
      ai.model.quaternion.copy(q);
      const rider = ai.model.userData;
      if (rider.robeTail) rider.robeTail.rotation.x = -1 + Math.sin(this.time * 8 + ai.phase) * 0.1;
    }
    this.updateAIModels(dt);
  }

  updateAIModels(dt) {
    for (const ai of this.ais) {
      if (ai.finished) continue;
      ai.model.position.y += Math.sin(this.time * 3.2 + ai.phase) * 0.008;
    }
  }

  checkPickups(dt) {
    // handled in updatePlayer
  }

  updateCamera(dt) {
    const player = this.player;
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(player.pitch * 0.6, player.yaw, 0, 'YXZ'));
    const back = new THREE.Vector3(0, 3.9, 10.5).applyQuaternion(q);
    const desired = player.pos.clone().add(back);
    const targetPos = player.pos.clone().add(new THREE.Vector3(0, 1.9, 0));
    this.camera.position.lerp(desired, 1 - Math.exp(-dt * 7));
    if (this.shake > 0) {
      this.camera.position.x += (Math.random() - 0.5) * this.shake * 1.2;
      this.camera.position.y += (Math.random() - 0.5) * this.shake * 1.2;
    }
    const look = player.pos.clone().add(new THREE.Vector3(0, 2.1, 0));
    // lead the camera slightly toward the next gate
    const next = this.world.gates[player.nextGate % this.N];
    if (next) look.lerp(next.pos, 0.06);
    this.camera.lookAt(look);
    const fovTarget = 61 + Math.max(0, player.speed - 32) * 0.22 + (this.game.input.boost ? 5 : 0);
    this.camera.fov = lerp(this.camera.fov, clamp(fovTarget, 58, 76), 1 - Math.exp(-dt * 3));
    this.camera.updateProjectionMatrix();
    if (this.beacon && !this.finished) {
      const s = 30 + Math.sin(this.time * 3) * 5;
      this.beacon.scale.set(s, s, 1);
      this.beacon.material.opacity = 0.28 + Math.sin(this.time * 3) * 0.12;
    }
  }

  updateFinishCamera(dt) {
    const p = this.player.pos;
    const a = this.time * 0.35;
    const desired = p.clone().add(new THREE.Vector3(Math.cos(a) * 22, 7, Math.sin(a) * 22));
    this.camera.position.lerp(desired, 1 - Math.exp(-dt * 2));
    this.camera.lookAt(p);
  }

  updateHUD() {
    const boost = clamp(this.player.boost / 100, 0, 1);
    this.ui.updateRaceHUD({
      speed: Math.round(this.player.speed * 2.6),
      boost,
      lap: Math.min(this.laps, Math.floor(this.player.passed / this.N) + 1),
      laps: this.laps,
      pos: this.currentRank(),
      time: this.elapsed * 1000,
      gatesTotal: this.N,
      gateIndex: this.player.nextGate,
      nextGate: this.player.nextGate,
      weather: this.weatherType,
      boostHeld: this.game.input.boost,
      beacon: this.finished ? null : this.world.gates[this.player.nextGate % this.N]?.pos,
      player: this.player,
      ais: this.ais,
      lapTimes: this.lapTimes,
      bestLap: this.bestLap,
    });
  }

  dispose() {
    this.audio.setMode('menu');
  }
}
