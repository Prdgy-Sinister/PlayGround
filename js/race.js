import * as THREE from 'three';
import { createCarModel, GEAR_GATES } from './carModel.js';
import { createRaceEnvironment, radialTexture } from './environment.js';
import { CARS_BY_ID, RIVALS, RIVALS_BY_ID, effectiveStats, DISTANCES } from './data.js';

const FIXED = 1 / 90;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;

function estimateTime(power, weight, meters) {
  const ratio = Math.max(1.8, weight / Math.max(45, power));
  const quarter = 6.85 * Math.pow(ratio, 0.32);
  return meters > 500 ? quarter + 3.7 + 0.017 * quarter * quarter : quarter;
}

function fmtTime(t) {
  if (!Number.isFinite(t) || t < 0) return '--:--.---';
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  const ms = Math.floor((t % 1) * 1000);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}

export class RaceSession {
  constructor({ track, distance, car, build, rival, audio, onHud, onFinish, onMessage, settings, event = null, isTest = false }) {
    this.track = track;
    this.distance = DISTANCES[distance] || DISTANCES.quarter;
    this.car = car;
    this.build = build;
    this.rivalDef = RIVALS_BY_ID[rival] || RIVALS[0];
    this.audio = audio;
    this.onHud = onHud || (() => {});
    this.onFinish = onFinish || (() => {});
    this.onMessage = onMessage || (() => {});
    this.settings = settings || {};
    this.portrait = window.innerWidth / window.innerHeight < 0.8;
    this.event = event;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.035, 1200);
    this.camera.rotation.order = 'YXZ';
    this.camera.position.set(4.56, 1.28, 0.1);

    this.stats = effectiveStats(car, build);
    this.playerPower = this.stats.power;
    this.env = createRaceEnvironment(this.scene, track, this.distance.meters);
    this.env.setStartLights(-1);

    this.playerGroup = new THREE.Group();
    this.playerGroup.position.set(4.15, 0, 0);
    this.playerModel = createCarModel(car, build, { cockpitMode: 'race' });
    this.playerGroup.add(this.playerModel.group);
    this.scene.add(this.playerGroup);
    this.scene.add(this.camera);

    const rivalCar = CARS_BY_ID[this.rivalDef.car] || CARS_BY_ID['nissan-s13'];
    const rivalBuild = {
      paint: 'cyber', bodykit: 'wide', spoiler: 'gt', wheels: 'dish', underglow: 'pink',
      headlights: 'pink', decal: 'kanji', engine: 'stock', turbo: 'street', ecu: 'race',
      exhaust: 'titanium', interior: 'red', seat: 'stock', knob: 'ball'
    };
    this.rivalGroup = new THREE.Group();
    this.rivalGroup.position.set(-4.15, 0, 0);
    this.rivalModel = createCarModel(rivalCar, rivalBuild, { cockpit: false, paintColor: 0x21d9c2, accentColor: 0xff2d9a });
    this.rivalGroup.add(this.rivalModel.group);
    this.scene.add(this.rivalGroup);

    // Physics state.
    this.phase = 'prestage';
    this.phaseClock = 0;
    this.raceTime = 0;
    this.treeStep = -1;
    this.treeStarted = false;
    this.greenAt = null;
    this.reaction = null;
    this.falseStart = false;
    this.penalty = 0;
    this.speed = 0;
    this.travel = 0;
    this.gear = 0;
    this.rpm = car.idle;
    this.clutch = 1;
    this.clutchPedal = 1;
    this.throttle = 0;
    this.brake = 0;
    this.steer = 0;
    this.steerTarget = 0;
    this.boost = 0;
    this.boostActive = 0;
    this.nitro = 0;
    this.tireHeat = 0.12;
    this.slip = 0;
    this.rpmLimiter = false;
    this.shiftPenalty = 0;
    this.perfectShifts = 0;
    this.topSpeed = 0;
    this.lastGear = 0;
    this.engineTemp = 0;
    this.cameraShake = 0;
    this.messageCooldown = 0;
    this.lastHud = 0;
    this.finished = false;
    this.resultShown = false;
    this.resultDelay = 0;
    this.finishTime = null;
    this.rivalFinishTime = null;
    this.disposed = false;
    this.raceElapsed = 0;
    this.input = { throttle: 0, brake: 0, clutch: 0, steerLeft: 0, steerRight: 0 };
    this._acc = 0;
    this._clock = 0;
    this._rivalTimeAcc = 0;
    this._rivalMoved = false;
    this._lastBeep = -1;
    this._smokeTimer = 0;
    this._messages = [];

    this.setupRivalPlan();
    this.setupEffects();
    this.bindHud();

    this.audio?.startEngine(this.stats.sound);
    this.onMessage('HOLD CLUTCH • SELECT 1ST • BUILD BOOST', 'hint', 3.8);
  }

  setupRivalPlan() {
    // The rival's pace is calibrated to the player's build so every duel is close,
    // but higher-skill rivals get a smaller time multiplier.
    const base = estimateTime(this.stats.power, this.stats.weight, this.distance.meters);
    const skill = this.rivalDef.skill;
    const multiplier = clamp(1.065 - (skill - 0.72) * 0.25, 0.82, 1.1) * (this.event?.difficultyMult || 1);
    this.rivalReaction = clamp(0.12 + (1 - skill) * 0.38 + Math.random() * 0.08, 0.14, 0.55);
    const target = base * multiplier + (Math.random() - 0.5) * 0.12;
    this.rivalTime = Math.max(5, target);
    this.rivalDriveTime = Math.max(3.2, this.rivalTime - this.rivalReaction);
    const vmax = 58 + this.stats.power * 0.17;
    let lo = 1, hi = 38;
    for (let i = 0; i < 28; i++) {
      const mid = (lo + hi) / 2;
      const t = this.simulateRival(mid, vmax, this.rivalDriveTime);
      if (t.time < this.distance.meters) lo = mid; else hi = mid;
    }
    this.rivalAccel = (lo + hi) / 2;
    this.rivalVmax = vmax;
    this.rivalStart = 0;
    this.rivalSpeed = 0;
    this.rivalDriveElapsed = -this.rivalReaction;
    this.rivalCrossed = false;
    this.rivalActualTime = null;
  }

  simulateRival(a0, vmax, seconds) {
    let v = 0, d = 0;
    const dt = 1 / 60;
    let t = 0;
    while (t < seconds && d < this.distance.meters) {
      const a = a0 * clamp(1 - Math.pow(v / vmax, 2.1), 0.03, 1);
      v += a * dt;
      d += v * dt;
      t += dt;
    }
    return { time: t, speed: v, dist: d };
  }

  setupEffects() {
    const streakGeo = new THREE.BufferGeometry();
    const count = 72;
    const arr = new Float32Array(count * 6);
    this.streaks = [];
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const radius = 1.8 + Math.random() * 5.5;
      const x = Math.cos(a) * radius;
      const y = Math.sin(a) * radius * 0.6;
      const z = -4 - Math.random() * 24;
      const len = 1.5 + Math.random() * 4;
      arr[i * 6] = x; arr[i * 6 + 1] = y; arr[i * 6 + 2] = z;
      arr[i * 6 + 3] = x; arr[i * 6 + 4] = y; arr[i * 6 + 5] = z; // length is animated via attributes
      this.streaks.push({ x, y, z, len, speed: 18 + Math.random() * 26 });
    }
    streakGeo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    this.streakMat = new THREE.LineBasicMaterial({ color: 0xe5f7ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false });
    this.streakLines = new THREE.LineSegments(streakGeo, this.streakMat);
    this.streakLines.frustumCulled = false;
    this.streakLines.renderOrder = 99;
    this.camera.add(this.streakLines);
    this.streakPos = arr;

    const smokeTex = radialTexture(0xd9d9d9);
    this.smoke = [];
    for (let i = 0; i < 26; i++) {
      const m = new THREE.SpriteMaterial({ map: smokeTex, color: 0xebe5db, transparent: true, opacity: 0, depthWrite: false, blending: THREE.NormalBlending });
      const s = new THREE.Sprite(m);
      s.visible = false;
      this.scene.add(s);
      this.smoke.push({ sprite: s, life: 0, max: 1, vx: 0, vy: 0, vz: 0 });
    }
    this.smokeIndex = 0;

    // Under-car glow pool flicker when nitro is used.
    this.nitroLight = new THREE.PointLight(0x44ffe0, 0, 14, 2);
    this.nitroLight.position.set(4.15, 0.8, -1.5);
    this.scene.add(this.nitroLight);

    // A small red flash at launch.
    this.flashLight = new THREE.PointLight(0xff3d6a, 0, 10, 2);
    this.flashLight.position.set(4.15, 1.4, -1);
    this.scene.add(this.flashLight);
  }

  bindHud() {
    this.hud = {
      speedKph: 0, rpm: this.rpm, gear: 0, phase: 'prestage',
      time: 0, distance: 0, progress: 0, rivalGap: 0,
      throttle: 0, brake: 0, clutch: 1, boost: 0, tireHeat: 0.12,
      slip: 0, nitro: 0, reaction: null, penalty: 0, treeStep: -1,
      message: '', track: this.track, playerName: this.car.short,
      rivalName: this.rivalDef.name, rivalCar: this.rivalDef.car,
      falseStart: false, finished: false, position: 1
    };
  }

  requestGear(g) {
    if (this.finished) return;
    if (g === this.gear) return;
    if (g === 'N') {
      this.gear = 0;
      this.audio?.shift(false);
      this.onMessage('NEUTRAL', 'info', 0.8);
      return;
    }
    if (g === 'R') {
      if (this.speed > 1.5) {
        this.audio?.grind();
        this.onMessage('TOO FAST FOR REVERSE', 'bad', 1.2);
        return;
      }
      if (this.clutchPedal < 0.55) {
        this.audio?.grind();
        this.onMessage('PRESS THE CLUTCH', 'bad', 1.2);
        return;
      }
      this.gear = -1;
      this.audio?.shift();
      return;
    }
    const n = Number(g);
    if (!Number.isInteger(n) || n < 1 || n > this.car.gears.length) return;
    if (this.clutchPedal < 0.55) {
      this.audio?.grind();
      this.cameraShake = Math.max(this.cameraShake, 0.16);
      this.onMessage('GRIND! PRESS CLUTCH TO SHIFT', 'bad', 1.4);
      return;
    }
    const before = this.gear;
    const rpmBefore = this.rpm;
    const ratio = this.car.gears[n - 1];
    const expected = (Math.abs(this.speed) / (this.car.wheels.size || 0.33)) * 60 / (Math.PI * 2) * ratio * this.car.finalDrive;
    this.gear = n;
    this.shiftPenalty = 0;
    let perfect = false;
    if (before > 0 && n > before && rpmBefore > this.stats.redline * 0.82 && expected < this.stats.redline) {
      perfect = true;
      this.perfectShifts++;
      this.nitro = Math.min(100, this.nitro + 34);
      this.shiftPenalty = -1.25;
      this.cameraShake = Math.max(this.cameraShake, 0.07);
      this.audio?.chime([660, 990], 0.055);
      this.onMessage('PERFECT SHIFT  +NITRO', 'perfect', 1.4);
      this.flashLight.intensity = 8;
    } else if (n < before && expected > this.stats.redline) {
      this.shiftPenalty = 2.0;
      this.onMessage('OVERREV! EASE IT IN', 'bad', 1.2);
      this.audio?.grind();
    } else if (before > 0 && Math.abs(rpmBefore - expected) > 2200) {
      this.shiftPenalty = 0.75;
      this.onMessage('CLUTCH BUMP', 'warn', 0.9);
    } else {
      this.onMessage(n > 0 ? `${n}${n === 1 ? 'ST' : n === 2 ? 'ND' : n === 3 ? 'RD' : 'TH'} GEAR` : 'NEUTRAL', 'info', 0.7);
    }
    this.audio?.shift(perfect);
    if (n > 0) this.audio?.backfire();
    this.cameraShake = Math.max(this.cameraShake, 0.04);
    this.lastGear = before;
  }

  activateNitro() {
    if (this.phase !== 'running' || this.finished) return false;
    if (this.nitro < 100) {
      this.onMessage('PERFECT SHIFTS CHARGE NITRO', 'warn', 1.0);
      return false;
    }
    this.nitro = 0;
    this.boostActive = 2.2;
    this.flashLight.intensity = 20;
    this.audio?.chime([440, 660, 880], 0.06);
    this.onMessage('NEON BOOST!', 'perfect', 1.3);
    return true;
  }

  setInput(name, value) {
    if (name in this.input) this.input[name] = value;
  }

  update(dtReal) {
    if (this.disposed) return;
    dtReal = Math.min(0.06, dtReal);
    this._clock += dtReal;
    this.phaseClock += dtReal;
    this.messageCooldown = Math.max(0, this.messageCooldown - dtReal);
    this.cameraShake = Math.max(0, this.cameraShake - dtReal * 0.5);
    this.flashLight.intensity = Math.max(0, this.flashLight.intensity - dtReal * 30);
    if (this.boostActive > 0) this.boostActive = Math.max(0, this.boostActive - dtReal);
    const smooth = Math.min(1, dtReal * 8);
    this.throttle += ((this.input.throttle || 0) - this.throttle) * smooth;
    this.brake += ((this.input.brake || 0) - this.brake) * smooth;
    this.clutchPedal += ((this.input.clutch || 0) - this.clutchPedal) * Math.min(1, dtReal * 8);
    this.steerTarget = (this.input.steerRight || 0) - (this.input.steerLeft || 0);

    // Start sequence.
    if (this.phase === 'prestage') {
      if (this.phaseClock > 0.9) {
        this.phase = 'tree';
        this.phaseClock = 0;
        this.treeStarted = true;
        this.treeStep = 0;
        this.env.setStartLights(0);
        this.audio?.beep(false);
      }
    } else if (this.phase === 'tree') {
      const steps = [0.52, 1.04, 1.56];
      const greenDelay = 2.08 + Math.random() * 0.3;
      let step = -1;
      if (this.phaseClock > greenDelay) step = 3;
      else if (this.phaseClock > steps[2]) step = 2;
      else if (this.phaseClock > steps[1]) step = 1;
      else if (this.phaseClock > steps[0]) step = 0;
      if (step !== this.treeStep) {
        this.treeStep = step;
        this.env.setStartLights(step);
        if (step < 3) this.audio?.beep(false);
      }
      if (step === 3 && this.phase !== 'running') {
        this.phase = 'running';
        this.greenAt = this.phaseClock;
        this.raceTime = 0;
        this.audio?.beep(true);
        this.audio?.crowd(0.15);
        this.onMessage('GO! GO! GO!', 'go', 1.0);
        this.flashLight.intensity = 5;
      }
    }

    if (this.phase === 'running' || this.phase === 'finished' || this.phase === 'tree') {
      this._acc += dtReal;
      let loops = 0;
      while (this._acc >= FIXED && loops < 5) {
        this.fixedStep(FIXED);
        this._acc -= FIXED;
        loops++;
      }
      this.raceElapsed += dtReal;
    } else {
      // Engine can rev during staging while the car remains stationary.
      this.updateEngine(dtReal, false);
      this.updateCarVisuals(dtReal);
    }

    if (this.phase === 'running') {
      if (this.speed > 0.55 && this.reaction === null) this.reaction = this.raceTime;
      if (this.travel >= this.distance.meters && !this.finished) this.finishRace();
    }

    // Rival movement.
    if (this.phase === 'running' || this.phase === 'finished') {
      this.updateRival(dtReal);
    }

    this.updateCamera(dtReal);
    this.updateEffects(dtReal);
    this.env.update(dtReal, this._clock, this.speed);
    this.playerModel.spin((this.speed / (this.car.wheels.size || 0.33)) * dtReal * (this.slip > 0.1 ? 1.8 : 1));
    this.rivalModel.spin((this.rivalSpeed / (this.car.wheels.size || 0.33)) * dtReal);
    this.playerModel.setBrake(this.brake > 0.1 || this.phase === 'prestage' || this.phase === 'tree');
    this.updateAudio(dtReal);

    if (this.finished) {
      this.resultDelay += dtReal;
      if (!this.resultShown && this.resultDelay > 1.6) {
        this.resultShown = true;
        this.showResult();
      }
    }

    // HUD at 20 fps.
    this.lastHud += dtReal;
    if (this.lastHud > 0.05) {
      this.lastHud = 0;
      this.emitHud();
    }
  }

  fixedStep(dt) {
    const stats = this.stats;
    if (this.phase === 'tree' && this.speed > 0.4 && !this.falseStart) {
      this.falseStart = true; this.penalty = 1.0;
      this.onMessage('JUMP START  +1.00s', 'bad', 1.8);
    }
    if (this.phase !== 'tree') this.raceTime += dt;

    // aerodynamic and rolling resistance
    const drag = 0.00038 * this.speed * this.speed;
    const rolling = this.speed > 0.1 ? 0.16 : 0;
    const brakeForce = this.brake * 8.5;
    const gear = this.gear;
    const gearRatio = gear > 0 ? this.car.gears[gear - 1] : gear === -1 ? 3.2 : 0;
    const wheelCircum = 2 * Math.PI * (this.car.wheels.size || 0.33);
    const engineDriveRpm = gear > 0 ? (Math.abs(this.speed) / wheelCircum) * 60 * gearRatio * this.car.finalDrive : gear === -1 ? Math.abs(this.speed) / wheelCircum * 60 * 3.2 * this.car.finalDrive : 0;

    // Clutch engagement.
    this.clutch = clamp(1 - this.clutchPedal, 0, 1);
    const clutchEngaged = gear !== 0 ? this.clutch : 0;

    const limiter = this.rpm >= stats.redline;
    this.rpmLimiter = limiter;
    const freeTarget = stats.redline * 0.89;
    const freeRpm = stats.idle + this.throttle * Math.max(800, freeTarget - stats.idle);
    let targetRpm;
    if (gear === 0 || this.clutchPedal > 0.72) {
      targetRpm = limiter ? stats.redline * 0.97 : freeRpm;
    } else {
      targetRpm = lerp(freeRpm, Math.max(stats.idle * 0.8, engineDriveRpm), Math.pow(this.clutch, 1.3));
      if (this.speed < 6.5 && this.throttle > 0.4) targetRpm = Math.max(targetRpm, freeRpm * (0.9 - Math.min(1, this.speed / 6.5) * 0.28));
    }

    const isBurnout = gear >= 1 && this.brake > 0.55 && this.throttle > 0.45 && this.speed < 2.2;
    if (isBurnout) targetRpm = stats.idle + this.throttle * (stats.redline * 0.7);
    const rpmRate = gear === 0 || this.clutchPedal > 0.72 || isBurnout ? 6.5 : 4.0 + this.clutch * 7;
    this.rpm += (targetRpm - this.rpm) * Math.min(1, dt * rpmRate);
    if (this.rpm > stats.redline) {
      this.rpm = stats.redline;
      if (this._clock % 0.2 < dt) this.cameraShake = Math.max(this.cameraShake, 0.04);
    }
    if (this.rpm < 0) this.rpm = 0;

    // Torque curve and boost.
    const normalized = clamp((this.rpm - 700) / (stats.redline - 700), 0, 1);
    const curve = clamp(0.44 + Math.sin(Math.min(1, normalized) * Math.PI * 0.93) * 0.92 + normalized * 0.18, 0.18, 1.25);
    const boosting = this.boostActive > 0 ? 1.34 : 1;
    const limiterCut = this.rpmLimiter ? (Math.floor(this._clock * 18) % 2 === 0 ? 0.08 : 1) : 1;
    const torque = stats.torque * curve * this.throttle * (1 + this.boost * 0.72) * boosting * limiterCut;
    const driveForce = torque * gearRatio * this.car.finalDrive * 0.91 / (this.car.wheels.size || 0.33);
    let accel = driveForce / stats.weight * clutchEngaged;
    // Engine braking / over-rev drag.
    if (this.throttle < 0.08 && gear !== 0) accel -= (gearRatio * this.car.finalDrive * 22 / stats.weight) * clutchEngaged;
    // Traction limit. AWD launches hardest, RWD spins, FWD fights for grip.
    const tractionFactor = this.car.drivetrain === 'AWD' ? 1.22 : this.car.drivetrain === 'RWD' ? 0.78 : 0.63;
    const grip = stats.grip * (0.9 + this.tireHeat * 0.2);
    const maxTraction = stats.weight * 9.81 * grip * tractionFactor;
    let slip = 0;
    if (driveForce > maxTraction && this.speed < 65) {
      slip = Math.min(1, (driveForce - maxTraction) / Math.max(1, maxTraction));
      accel = (maxTraction / stats.weight) * (1 - slip * 0.34) * clutchEngaged;
    }
    if (isBurnout) {
      slip = Math.max(slip, this.throttle * 0.85);
      accel = 0;
      this.tireHeat = Math.min(1, this.tireHeat + dt * 0.23 * this.throttle);
      this.boost = Math.min(1.3, this.boost + dt * (0.45 + this.throttle * 0.2));
    }
    if (slip > 0.12) this.tireHeat = Math.min(1, this.tireHeat + dt * slip * 0.06);
    this.tireHeat = Math.max(0.08, this.tireHeat - dt * 0.012);
    this.slip = slip;
    if (this.shiftPenalty > 0) {
      accel *= 0.58;
      this.shiftPenalty -= dt;
    } else if (this.shiftPenalty < 0) {
      accel *= 1.11;
      this.shiftPenalty += dt;
    }
    if (this.phase === 'tree' && this.falseStart) accel *= 0.45;
    accel -= drag + rolling + brakeForce;
    if (this.brake > 0.9 && this.speed < 0.05) accel = Math.max(0, accel);
    this.speed += accel * dt;
    if (this.speed < 0) this.speed = 0;
    if (this.phase !== 'running' && this.phase !== 'finished') {
      // During the tree we allow creeping so a jump start has consequences, but
      // not automatic launch. That still requires the player's clutch + throttle.
      if (this.speed < 0.02) this.speed = 0;
    }
    const ds = this.speed * dt;
    this.travel += ds;
    this.lastDs = ds;
    this.playerGroup.position.z = -this.travel;
    this.playerGroup.position.x = clamp(this.playerGroup.position.x + this.steer * dt * 1.5, 1.4, 8.25);
    this.steer += (this.steerTarget - this.steer) * Math.min(1, dt * 6);
    this.topSpeed = Math.max(this.topSpeed, this.speed);
    this.boost = Math.max(0, this.boost - dt * (this.throttle > 0.2 ? 0.11 : 0.55));

    if (this.phase === 'tree' && this.speed > 0.4) {
      this.falseStart = true;
      if (!this.penalty) this.penalty = 1.0;
    }
    this.engineTemp += dt * (0.2 + this.rpm / stats.redline);
  }

  updateEngine(dt, driving) {
    const stats = this.stats;
    const freeTarget = stats.idle + this.throttle * (stats.redline * 0.85 - stats.idle);
    const target = this.gear === 0 || this.clutchPedal > 0.72 ? freeTarget : Math.max(stats.idle, freeTarget * 0.7);
    this.rpm += (target - this.rpm) * Math.min(1, dt * 4.5);
    this.boost = Math.min(1.2, Math.max(0, this.boost + (this.throttle * 0.8 - this.boost * 0.7) * dt));
    this.playerGroup.position.z = -this.travel;
  }

  updateAudio(dt) {
    if (!this.audio) return;
    this._audioTick = (this._audioTick || 0) + dt;
    if (this._audioTick < 0.03) return;
    this._audioTick = 0;
    this.audio.updateEngine({
      rpm: this.rpm, throttle: this.throttle, clutch: this.clutchPedal,
      speed: this.speed * 3.6, boost: this.boost, boostTarget: this.boost,
      slip: this.slip + (this.brake > 0.6 && this.speed < 1 ? this.throttle * 0.5 : 0),
      gear: this.gear, stalled: false, limiter: this.rpmLimiter
    });
  }

  updateRival(dt) {
    if (this.phase !== 'running' && this.phase !== 'finished') return;
    this.rivalDriveElapsed += dt;
    if (this.rivalDriveElapsed < 0) {
      this.rivalGroup.position.z = 0;
      this.rivalSpeed = 0;
      return;
    }
    if (this.rivalCrossed) {
      this.rivalGroup.position.z = -this.distance.meters - Math.min(45, (this.rivalDriveElapsed - this.rivalDriveTime) * 18);
      return;
    }
    let v = this.rivalSpeed;
    const a = this.rivalAccel * clamp(1 - Math.pow(v / this.rivalVmax, 2.1), 0.03, 1);
    v += a * dt;
    this.rivalSpeed = v;
    this.rivalGroup.position.z -= v * dt;
    this.rivalGroup.position.x = -4.15 + Math.sin(this.rivalDriveElapsed * 1.3) * 0.05;
    this.rivalModel.spin(v / (this.car.wheels.size || 0.33) * dt);
    if (-this.rivalGroup.position.z >= this.distance.meters) {
      this.rivalCrossed = true;
      this.rivalActualTime = this.rivalTime;
    }
    if (this.rivalDriveElapsed > 0.4) this.rivalModel.group.rotation.z = Math.sin(this.rivalDriveElapsed * 15) * 0.006;
  }

  updateCarVisuals(dt) {
    this.playerModel.spin((this.speed / (this.car.wheels.size || 0.33)) * dt);
    this.playerGroup.position.z = -this.travel;
  }

  updateCamera(dt) {
    const group = this.playerGroup;
    const baseYaw = 0;
    const steerYaw = this.steer * 0.045;
    const shakeAmount = this.settings.shake === false
      ? 0
      : (this.rpm / this.stats.redline) * 0.003 + this.speed * 0.00015 + this.cameraShake;
    const t = this._clock;
    const shakeX = (Math.sin(t * 63) + Math.sin(t * 37 + 1.3)) * shakeAmount;
    const shakeY = (Math.sin(t * 91 + 2.1) + Math.sin(t * 43)) * shakeAmount * 1.4;
    const accelKick = this.phase === 'running' && this.speed < 3 && this.throttle > 0.5 ? 0.006 : 0;
    const targetX = group.position.x + 0.38 + shakeX;
    const targetY = (this.portrait ? 1.4 : 1.28) + shakeY - Math.max(0, this.speed) * 0.0004;
    const targetZ = group.position.z + (this.portrait ? 0.3 : 0.1) - Math.max(0, this.speed) * 0.00008;
    this.camera.position.x = lerp(this.camera.position.x, targetX, Math.min(1, dt * 14));
    this.camera.position.y = lerp(this.camera.position.y, targetY, Math.min(1, dt * 14));
    this.camera.position.z = lerp(this.camera.position.z, targetZ, Math.min(1, dt * 18));
    this.camera.rotation.y = lerp(this.camera.rotation.y, baseYaw + steerYaw + shakeX * 0.02, Math.min(1, dt * 8));
    this.camera.rotation.x = lerp(this.camera.rotation.x, -0.065 + shakeY * 0.02 + accelKick, Math.min(1, dt * 10));
    this.camera.rotation.z = lerp(this.camera.rotation.z, -this.steer * 0.018 + shakeX * 0.04, Math.min(1, dt * 8));
    this.camera.fov = lerp(this.camera.fov, (this.portrait ? 84 : 70) + Math.min(12, this.speed * 0.11) + (this.boostActive > 0 ? 4 : 0), Math.min(1, dt * 2.5));
    this.camera.updateProjectionMatrix();
    this.playerModel.group.rotation.y = -this.steer * 0.012;
    this.playerModel.group.rotation.z = -this.steer * 0.01;
    this.playerModel.group.position.y = -Math.max(0, this.cameraShake) * 0.03;
    this.playerModel.group.rotation.x = this.speed < 1 && this.throttle > 0.6 ? -0.007 : 0;
    // Cockpit updates every frame.
    this.playerModel.update(dt, {
      rpm: this.rpm, speed: this.speed, gear: this.gear, steering: this.steer,
      throttle: this.throttle, brake: this.brake, clutch: this.clutchPedal,
      boost: this.boost, time: fmtTime(this.raceTime), phase: this.phase === 'running' ? 'RACING' : this.phase.toUpperCase(),
      redline: this.stats.redline, rivalText: `RIVAL ${this.rivalDef.name}  ${this.getGapText()}`
    });
    this.nitroLight.intensity = this.boostActive > 0 ? 18 + Math.sin(t * 30) * 6 : 0;
    this.nitroLight.position.set(group.position.x, 0.8, group.position.z - 1.5);
  }

  updateEffects(dt) {
    const t = this._clock;
    const speed = this.speed;
    // Speed streaks.
    const targetOpacity = clamp((speed - 12) / 55, 0, 0.55);
    this.streakMat.opacity += (targetOpacity - this.streakMat.opacity) * Math.min(1, dt * 4);
    if (speed > 6) {
      for (let i = 0; i < this.streaks.length; i++) {
        const s = this.streaks[i];
        s.z += dt * (s.speed + speed * 1.8);
        if (s.z > -1.2) {
          s.z = -18 - Math.random() * 18;
          s.x = (Math.random() - 0.5) * 13;
          s.y = (Math.random() - 0.5) * 7;
        }
        const i6 = i * 6;
        this.streakPos[i6] = s.x;
        this.streakPos[i6 + 1] = s.y;
        this.streakPos[i6 + 2] = s.z;
        this.streakPos[i6 + 3] = s.x;
        this.streakPos[i6 + 4] = s.y;
        this.streakPos[i6 + 5] = s.z + s.len + speed * 0.09;
      }
      this.streakLines.geometry.attributes.position.needsUpdate = true;
    }

    // Burnout / wheelspin smoke.
    const smoking = this.slip > 0.08 && (speed < 28 || this.brake > 0.5) || (this.brake > 0.6 && this.throttle > 0.5 && speed < 2);
    this._smokeTimer += dt;
    if (smoking && this._smokeTimer > 0.045) {
      this._smokeTimer = 0;
      this.spawnSmoke();
    }
    for (const p of this.smoke) {
      if (p.life <= 0) continue;
      p.life -= dt;
      p.sprite.position.x += p.vx * dt;
      p.sprite.position.y += p.vy * dt;
      p.sprite.position.z += p.vz * dt;
      const k = 1 - p.life / p.max;
      p.sprite.scale.setScalar(0.45 + k * 2.8);
      p.sprite.material.opacity = Math.sin(k * Math.PI) * 0.23;
      if (p.life <= 0) p.sprite.visible = false;
    }

    // A few speed sparks around the edges when nitro is active.
    if (this.boostActive > 0) {
      this.cameraShake = Math.max(this.cameraShake, 0.035);
    }
    if (this.slip > 0.3) this.cameraShake = Math.max(this.cameraShake, this.slip * 0.03);
  }

  spawnSmoke() {
    const p = this.smoke[this.smokeIndex++ % this.smoke.length];
    p.life = p.max = 0.65 + Math.random() * 0.55;
    const z = this.playerGroup.position.z + 1.25 + Math.random() * 0.6;
    p.sprite.position.set(this.playerGroup.position.x + (Math.random() - 0.5) * 1.4, 0.15 + Math.random() * 0.2, z);
    p.vx = (Math.random() - 0.5) * 1.3;
    p.vy = 0.4 + Math.random() * 0.7;
    p.vz = 2.2 + Math.random() * 2.5;
    p.sprite.material.opacity = 0.24;
    p.sprite.scale.setScalar(0.4);
    p.sprite.visible = true;
  }

  getGapText() {
    if (this.phase !== 'running' && this.phase !== 'finished') return '--';
    const diff = this.travel - (-this.rivalGroup.position.z);
    if (!this.rivalCrossed && this.rivalDriveElapsed > 0) {
      if (Math.abs(diff) < 0.5) return 'DOOR TO DOOR';
      const sec = Math.abs(diff) / Math.max(8, this.speed);
      return diff > 0 ? `+${sec.toFixed(2)}s` : `-${sec.toFixed(2)}s`;
    }
    return this.rivalCrossed ? (this.finishTime && this.finishTime < this.rivalTime ? 'AHEAD' : 'BEHIND') : '--';
  }

  emitHud() {
    const h = this.hud;
    h.speedKph = this.speed * 3.6;
    h.rpm = this.rpm;
    h.gear = this.gear;
    h.phase = this.phase;
    h.time = this.raceTime;
    h.distance = this.travel;
    h.progress = clamp(this.travel / this.distance.meters, 0, 1);
    h.rivalProgress = clamp((-this.rivalGroup.position.z) / this.distance.meters, 0, 1);
    h.rivalGap = this.travel - (-this.rivalGroup.position.z);
    h.throttle = this.throttle;
    h.brake = this.brake;
    h.clutch = this.clutchPedal;
    h.boost = this.boost;
    h.tireHeat = this.tireHeat;
    h.slip = this.slip;
    h.nitro = this.nitro;
    h.reaction = this.reaction;
    h.penalty = this.penalty;
    h.treeStep = this.treeStep;
    h.falseStart = this.falseStart;
    h.finished = this.finished;
    h.gapText = this.getGapText();
    h.boostActive = this.boostActive;
    h.position = this.travel >= (-this.rivalGroup.position.z) ? 1 : 2;
    this.onHud(h);
  }

  finishRace() {
    if (this.finished) return;
    this.finished = true;
    this.phase = 'finished';
    this.finishTime = this.raceTime + this.penalty;
    this.resultDelay = 0;
    this.audio?.crowd(0.2);
    this.onMessage(this.finishTime < this.rivalTime ? 'WINNER!' : 'FINISH', this.finishTime < this.rivalTime ? 'perfect' : 'info', 1.5);
  }

  showResult() {
    const won = this.finishTime < this.rivalTime;
    const gap = Math.abs(this.rivalTime - this.finishTime);
    const result = {
      won,
      playerTime: this.finishTime,
      rawTime: this.raceTime,
      rivalTime: this.rivalTime,
      reaction: this.reaction,
      topSpeed: this.topSpeed * 3.6,
      perfectShifts: this.perfectShifts,
      penalty: this.penalty,
      gap,
      distance: this.distance.id,
      meters: this.distance.meters,
      track: this.track,
      car: this.car,
      rival: this.rivalDef,
      event: this.event,
      falseStart: this.falseStart,
      timeText: fmtTime(this.finishTime),
      rivalTimeText: fmtTime(this.rivalTime)
    };
    this.onFinish(result);
  }

  dispose() {
    this.disposed = true;
    this.audio?.stopEngine();
    // Materials and textures are shared through small internal caches, so let
    // the scene and its GPU resources be collected with the session instead of
    // disposing cached assets that the menu still uses.
    this.scene.clear();
  }
}
