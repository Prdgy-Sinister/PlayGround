/* Procedural audio: engine, turbo, tyres, UI and a small synthwave bed. */
export class GameAudio {
  constructor(settings = {}) {
    this.settings = settings;
    this.ctx = null;
    this.started = false;
    this.engineOn = false;
    this.musicTimer = null;
    this.musicStep = 0;
    this.nextNote = 0;
    this.engine = null;
  }

  ensure() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return true;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    this.ctx = new AC();
    const ctx = this.ctx;
    this.master = ctx.createGain();
    this.master.gain.value = 0.65;
    this.master.connect(ctx.destination);
    this.comp = ctx.createDynamicsCompressor();
    this.comp.threshold.value = -18;
    this.comp.knee.value = 20;
    this.comp.ratio.value = 5;
    this.comp.attack.value = 0.005;
    this.comp.release.value = 0.2;
    this.comp.connect(this.master);

    this.engineBus = ctx.createGain();
    this.engineBus.gain.value = 0.0;
    this.engineBus.connect(this.comp);
    this.fxBus = ctx.createGain();
    this.fxBus.gain.value = 0.5;
    this.fxBus.connect(this.comp);
    this.musicBus = ctx.createGain();
    this.musicBus.gain.value = this.settings.music === false ? 0 : 0.08;
    this.musicBus.connect(this.comp);

    this.noiseBuffer = this.makeNoise(3.0);
    this.started = true;
    this.startMusic();
    return true;
  }

  makeNoise(seconds) {
    const ctx = this.ctx;
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  setSettings(settings) {
    this.settings = settings;
    if (this.musicBus) this.musicBus.gain.setTargetAtTime(settings.music === false ? 0 : 0.08, this.ctx.currentTime, 0.1);
  }

  startEngine(profile = 'i4') {
    if (!this.ensure()) return;
    this.stopEngine();
    const ctx = this.ctx;
    this.engineProfile = profile;
    const bus = ctx.createGain();
    bus.gain.value = 0.0001;
    bus.connect(this.engineBus);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1100;
    filter.Q.value = 1.1;
    filter.connect(bus);
    const shaper = ctx.createWaveShaper();
    const curve = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
      const x = i / 128 - 1;
      curve[i] = Math.tanh(x * 1.8);
    }
    shaper.curve = curve;
    shaper.connect(filter);

    const oscs = [];
    const count = profile === 'rotary' ? 3 : profile === 'i3' ? 3 : 4;
    for (let i = 0; i < count; i++) {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? 'sawtooth' : 'square';
      const g = ctx.createGain();
      g.gain.value = i === 0 ? 0.14 : 0.055 / (i * 0.6 + 1);
      osc.connect(g);
      g.connect(shaper);
      osc.start();
      oscs.push({ osc, gain: g, ratio: i === 0 ? 1 : i + 1 });
    }
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 50;
    const subGain = ctx.createGain();
    subGain.gain.value = 0.20;
    sub.connect(subGain);
    subGain.connect(bus);
    sub.start();

    const intake = ctx.createBufferSource();
    intake.buffer = this.noiseBuffer;
    intake.loop = true;
    const intakeFilter = ctx.createBiquadFilter();
    intakeFilter.type = 'bandpass';
    intakeFilter.Q.value = 0.8;
    intakeFilter.frequency.value = 700;
    const intakeGain = ctx.createGain();
    intakeGain.gain.value = 0.035;
    intake.connect(intakeFilter).connect(intakeGain).connect(bus);
    intake.start();

    const turboOsc = ctx.createOscillator();
    turboOsc.type = 'sine';
    turboOsc.frequency.value = 3000;
    const turboGain = ctx.createGain();
    turboGain.gain.value = 0;
    turboOsc.connect(turboGain).connect(this.fxBus);
    turboOsc.start();

    const turboNoise = ctx.createBufferSource();
    turboNoise.buffer = this.noiseBuffer;
    turboNoise.loop = true;
    const turboFilter = ctx.createBiquadFilter();
    turboFilter.type = 'highpass';
    turboFilter.frequency.value = 4200;
    const turboNoiseGain = ctx.createGain();
    turboNoiseGain.gain.value = 0;
    turboNoise.connect(turboFilter).connect(turboNoiseGain).connect(this.fxBus);
    turboNoise.start();

    const tyre = ctx.createBufferSource();
    tyre.buffer = this.noiseBuffer;
    tyre.loop = true;
    const tyreFilter = ctx.createBiquadFilter();
    tyreFilter.type = 'bandpass';
    tyreFilter.frequency.value = 1900;
    tyreFilter.Q.value = 2.6;
    const tyreGain = ctx.createGain();
    tyreGain.gain.value = 0;
    tyre.connect(tyreFilter).connect(tyreGain).connect(this.fxBus);
    tyre.start();

    const wind = ctx.createBufferSource();
    wind.buffer = this.noiseBuffer;
    wind.loop = true;
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.value = 700;
    const windGain = ctx.createGain();
    windGain.gain.value = 0;
    wind.connect(windFilter).connect(windGain).connect(this.fxBus);
    wind.start();

    this.engine = { bus, filter, oscs, sub, intakeFilter, intakeGain, turboOsc, turboGain, turboNoiseGain, tyreFilter, tyreGain, windFilter, windGain, profile };
    this.engineOn = true;
    bus.gain.setTargetAtTime(0.55, ctx.currentTime, 0.08);
  }

  stopEngine() {
    if (!this.engine) return;
    const ctx = this.ctx;
    const e = this.engine;
    this.engine = null;
    this.engineOn = false;
    try {
      e.bus.gain.cancelScheduledValues(ctx.currentTime);
      e.bus.gain.setTargetAtTime(0, ctx.currentTime, 0.06);
      e.oscs.forEach(({ osc }) => osc.stop(ctx.currentTime + 0.4));
      e.sub.stop(ctx.currentTime + 0.4);
      [e.turboOsc].forEach(o => o.stop(ctx.currentTime + 0.4));
      setTimeout(() => {
        try { e.tyre.stop(); e.wind.stop(); } catch {}
      }, 500);
    } catch {}
  }

  updateEngine({ rpm = 900, throttle = 0, clutch = 0, speed = 0, boost = 0, boostTarget = 0, slip = 0, gear = 0, stalled = false, limiter = false }) {
    if (!this.engine || !this.ctx) return;
    const e = this.engine;
    const t = this.ctx.currentTime;
    const cyl = e.profile === 'rotary' ? 2 : e.profile === 'i6' || e.profile === '1jz' || e.profile === '2jz' ? 6 : e.profile === 'v6' ? 6 : e.profile === 'ej' ? 4 : 4;
    const firing = Math.max(18, (rpm / 60) * (cyl / 2));
    const load = stalled ? 0 : (0.25 + throttle * 0.75) * (0.72 + clutch * 0.15);
    const base = firing;
    e.oscs.forEach(({ osc, ratio }) => {
      osc.frequency.setTargetAtTime(base * (ratio === 1 ? 1 : 1 + ratio * 0.5), t, 0.025);
    });
    e.sub.frequency.setTargetAtTime(base * 0.5, t, 0.03);
    e.filter.frequency.setTargetAtTime(450 + throttle * 2400 + rpm * 0.12, t, 0.04);
    const revFactor = Math.min(1.4, rpm / 5000);
    // Rev limiter adds a hard stutter.
    const cutoff = limiter ? (Math.floor(t * 28) % 2 === 0 ? 0.05 : 1) : 1;
    e.bus.gain.setTargetAtTime((stalled ? 0.08 : 0.46) * cutoff * (0.5 + load * 0.55), t, 0.018);
    e.intakeFilter.frequency.setTargetAtTime(500 + rpm * 0.24 + throttle * 900, t, 0.05);
    e.intakeGain.gain.setTargetAtTime(0.02 + throttle * 0.09 * revFactor, t, 0.05);
    const turboLevel = Math.max(0, boost);
    e.turboOsc.frequency.setTargetAtTime(1700 + turboLevel * 4900 + speed * 2, t, 0.08);
    e.turboGain.gain.setTargetAtTime(turboLevel * 0.025, t, 0.09);
    e.turboNoiseGain.gain.setTargetAtTime(turboLevel * 0.055, t, 0.12);
    e.tyreGain.gain.setTargetAtTime(Math.min(0.34, slip * 0.55), t, 0.035);
    e.tyreFilter.frequency.setTargetAtTime(1500 + speed * 9, t, 0.08);
    e.windFilter.frequency.setTargetAtTime(300 + speed * 9, t, 0.1);
    e.windGain.gain.setTargetAtTime(Math.min(0.15, speed / 900), t, 0.12);
  }

  shift(perfect = false) {
    if (!this.ctx) return;
    this.thunk(perfect ? 160 : 80, 0.09);
    if (perfect) this.chime([880, 1320], 0.06);
  }

  grind() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const src = ctx.createBufferSource(); src.buffer = this.noiseBuffer;
    const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2400; f.Q.value = 2;
    const g = ctx.createGain(); g.gain.value = 0.18; g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    src.connect(f).connect(g).connect(this.fxBus); src.start(); src.stop(ctx.currentTime + 0.2);
  }

  backfire() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const src = ctx.createBufferSource(); src.buffer = this.noiseBuffer;
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 900;
    const g = ctx.createGain(); g.gain.value = 0.4; g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
    src.connect(f).connect(g).connect(this.fxBus); src.start(); src.stop(ctx.currentTime + 0.17);
  }

  thunk(freq = 90, dur = 0.08) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const o = ctx.createOscillator(); o.type = 'triangle';
    o.frequency.setValueAtTime(freq, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + dur);
    const g = ctx.createGain(); g.gain.value = 0.16; g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    o.connect(g).connect(this.fxBus); o.start(); o.stop(ctx.currentTime + dur + 0.02);
  }

  beep(high = false) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = high ? 880 : 440;
    const g = ctx.createGain(); g.gain.value = 0.07; g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (high ? 0.35 : 0.11));
    o.connect(g).connect(this.fxBus); o.start(); o.stop(ctx.currentTime + 0.4);
  }

  chime(notes = [660, 990], volume = 0.04) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    notes.forEach((freq, i) => {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, ctx.currentTime + i * 0.045);
      g.gain.linearRampToValueAtTime(volume, ctx.currentTime + i * 0.045 + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.045 + 0.5);
      o.connect(g).connect(this.fxBus); o.start(ctx.currentTime + i * 0.045); o.stop(ctx.currentTime + i * 0.045 + 0.55);
    });
  }

  ui() { this.thunk(340, 0.035); }

  click() { this.thunk(240, 0.03); }

  crowd(volume = 0.12) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const src = ctx.createBufferSource(); src.buffer = this.noiseBuffer; src.loop = true;
    const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 0.6;
    const g = ctx.createGain(); g.gain.value = 0;
    src.connect(f).connect(g).connect(this.fxBus); src.start();
    g.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.4);
    g.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.5);
    setTimeout(() => { try { src.stop(); } catch {} }, 3000);
  }

  startMusic() {
    if (!this.ctx || this.musicTimer) return;
    const ctx = this.ctx;
    const delay = ctx.createDelay(0.5);
    delay.delayTime.value = 0.26;
    const feedback = ctx.createGain(); feedback.gain.value = 0.24;
    const wet = ctx.createGain(); wet.gain.value = 0.23;
    delay.connect(feedback).connect(delay);
    delay.connect(wet).connect(this.musicBus);
    this.musicDelay = delay;

    const chords = [
      [110, 261.63, 329.63, 392.0],
      [98, 246.94, 293.66, 392.0],
      [87.31, 220.0, 261.63, 349.23],
      [82.41, 196.0, 246.94, 329.63]
    ];
    this.chords = chords;
    this.nextNote = ctx.currentTime + 0.2;
    this.musicStep = 0;
    const tick = () => {
      if (!this.ctx) return;
      while (this.nextNote < ctx.currentTime + 0.25) {
        this.scheduleBar(chords[Math.floor(this.musicStep / 8) % chords.length], this.nextNote, this.musicStep % 8);
        this.nextNote += 0.25;
        this.musicStep++;
      }
      this.musicTimer = setTimeout(tick, 100);
    };
    tick();
  }

  scheduleBar(chord, time, step) {
    if (this.settings.music === false) return;
    const ctx = this.ctx;
    // Warm pad every two beats.
    if (step % 4 === 0) {
      chord.slice(1).forEach((freq, i) => {
        const o = ctx.createOscillator(); o.type = i === 0 ? 'triangle' : 'sine'; o.frequency.value = freq;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, time); g.gain.linearRampToValueAtTime(0.025, time + 0.2);
        g.gain.linearRampToValueAtTime(0.0001, time + 1.9);
        const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1100;
        o.connect(f).connect(g).connect(this.musicBus); o.start(time); o.stop(time + 2.0);
      });
    }
    // Arpeggio.
    const seq = [1, 2, 3, 2, 1, 2, 3, 2];
    const freq = chord[seq[step % 8]] * 2;
    const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, time); g.gain.linearRampToValueAtTime(0.014, time + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1600;
    o.connect(f).connect(g).connect(this.musicBus); o.connect(this.musicDelay);
    o.start(time); o.stop(time + 0.2);
    // Soft kick.
    if (step % 4 === 0) {
      const k = ctx.createOscillator(); k.type = 'sine'; k.frequency.setValueAtTime(120, time); k.frequency.exponentialRampToValueAtTime(42, time + 0.12);
      const kg = ctx.createGain(); kg.gain.setValueAtTime(0.06, time); kg.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);
      k.connect(kg).connect(this.musicBus); k.start(time); k.stop(time + 0.2);
    }
  }

  suspendForRace(active) {
    if (!this.musicBus || !this.ctx) return;
    this.musicBus.gain.setTargetAtTime(active ? 0.03 : (this.settings.music === false ? 0 : 0.08), this.ctx.currentTime, 0.3);
  }
}
