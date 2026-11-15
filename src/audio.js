// Procedural Japanese-inspired ambience & SFX — no external audio assets.
export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.ready = false;
    this.musicOn = true;
    this.soundOn = true;
    this.timer = null;
    this.mood = 'estate';
    this.noteIndex = 0;
  }

  init() {
    if (this.ctx) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.75;
    this.master.connect(this.ctx.destination);

    this.comp = this.ctx.createDynamicsCompressor();
    this.comp.threshold.value = -18;
    this.comp.ratio.value = 3;
    this.comp.connect(this.master);

    this.reverb = this.ctx.createConvolver();
    this.reverb.buffer = this.makeImpulse(3.4, 2.4);
    this.reverbGain = this.ctx.createGain();
    this.reverbGain.gain.value = 0.28;
    this.reverb.connect(this.reverbGain);
    this.reverbGain.connect(this.comp);

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 0.34;
    this.musicGain.connect(this.comp);
    this.musicGain.connect(this.reverb);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.5;
    this.sfxGain.connect(this.comp);

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.value = 0.18;
    this.ambientGain.connect(this.comp);

    this.wind = this.makeNoiseSource();
    this.windFilter = this.ctx.createBiquadFilter();
    this.windFilter.type = 'lowpass';
    this.windFilter.frequency.value = 480;
    this.windFilter.Q.value = 0.6;
    this.windGain = this.ctx.createGain();
    this.windGain.gain.value = 0.5;
    this.wind.connect(this.windFilter);
    this.windFilter.connect(this.windGain);
    this.windGain.connect(this.ambientGain);

    // slow LFO on wind
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.06;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.22;
    lfo.connect(lfoGain);
    lfoGain.connect(this.windGain.gain);
    lfo.start();

    this.crowd = this.makeNoiseSource();
    this.crowdFilter = this.ctx.createBiquadFilter();
    this.crowdFilter.type = 'bandpass';
    this.crowdFilter.frequency.value = 500;
    this.crowdFilter.Q.value = 0.8;
    this.crowdGain = this.ctx.createGain();
    this.crowdGain.gain.value = 0;
    this.crowd.connect(this.crowdFilter);
    this.crowdFilter.connect(this.crowdGain);
    this.crowdGain.connect(this.ambientGain);

    this.drone = this.ctx.createOscillator();
    this.drone.type = 'sine';
    this.drone.frequency.value = 55;
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.value = 0;
    this.drone.connect(this.droneGain);
    this.droneGain.connect(this.reverb);
    this.droneGain.connect(this.comp);
    this.drone.start();

    this.ready = true;
    this.startMusic();
  }

  makeImpulse(duration, decay) {
    const rate = this.ctx.sampleRate;
    const len = rate * duration;
    const buf = this.ctx.createBuffer(2, len, rate);
    for (let c = 0; c < 2; c++) {
      const data = buf.getChannelData(c);
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
      }
    }
    return buf;
  }

  makeNoiseSource() {
    const rate = this.ctx.sampleRate;
    const len = rate * 4;
    const buf = this.ctx.createBuffer(2, len, rate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      let last = 0;
      for (let i = 0; i < len; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        d[i] = last * 3.2;
      }
    }
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    src.start();
    return src;
  }

  // pentatonic hirajoshi-ish scale (D, Eb, G, A, Bb)
  scale() {
    const root = this.mood === 'oni' ? 146.83 / 2 : 146.83;
    return [1, 1.0595, 1.3348, 1.4983, 1.5874, 2, 2.119, 2.6697, 2.9966, 3.1748];
  }

  startMusic() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (!this.ready || !this.musicOn) return;
      const t = this.ctx.currentTime;
      const scale = this.scale();
      const octave = Math.random() > 0.7 ? 2 : 1;
      const n = scale[Math.floor(Math.random() * scale.length)] * 146.83 * octave;
      this.pluck(n, t + 0.02, 0.04 + Math.random() * 0.05, 0.5 + Math.random() * 0.5);
      if (Math.random() > 0.55) {
        this.pluck(n * 1.5, t + 0.18 + Math.random() * 0.25, 0.025, 0.32);
      }
      if (Math.random() > 0.82) {
        this.pluck(n / 2, t + 0.5, 0.03, 0.5);
      }
      if (Math.random() > 0.9) {
        this.flute(n * 2, t + 0.6, 1.8, 0.018);
      }
      if (Math.random() > 0.94) {
        this.bell(n * 2, t + 0.3, 0.02);
      }
    }, 3600);
  }

  pluck(freq, when, vol = 0.04, dur = 0.8) {
    if (!this.ready) return;
    const ctx = this.ctx;
    const out = ctx.createGain();
    out.gain.setValueAtTime(0, when);
    out.gain.linearRampToValueAtTime(vol, when + 0.008);
    out.gain.exponentialRampToValueAtTime(0.0001, when + dur * 2.4);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3400, when);
    filter.frequency.exponentialRampToValueAtTime(500, when + dur * 1.4);
    filter.Q.value = 2.5;
    const pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    for (const [type, gain, detune] of [['triangle', 1, 0], ['sawtooth', 0.18, 4]]) {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.value = freq * (1 + detune / 1200);
      const g = ctx.createGain();
      g.gain.value = gain;
      o.connect(g);
      g.connect(filter);
      o.start(when);
      o.stop(when + dur * 2.6);
    }
    filter.connect(out);
    if (pan) { pan.pan.value = (Math.random() - 0.5) * 0.8; out.connect(pan); pan.connect(this.musicGain); }
    else out.connect(this.musicGain);
  }

  flute(freq, when, dur = 1.5, vol = 0.02) {
    if (!this.ready) return;
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(freq, when);
    o.frequency.linearRampToValueAtTime(freq * 1.008, when + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(vol, when + 0.35);
    g.gain.setValueAtTime(vol, when + dur * 0.6);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    const vib = ctx.createOscillator();
    vib.frequency.value = 5.2;
    const vibG = ctx.createGain();
    vibG.gain.value = freq * 0.006;
    vib.connect(vibG); vibG.connect(o.frequency);
    o.connect(g); g.connect(this.musicGain);
    o.start(when); vib.start(when);
    o.stop(when + dur + 0.1); vib.stop(when + dur + 0.1);
  }

  bell(freq, when, vol = 0.03) {
    if (!this.ready) return;
    const ctx = this.ctx;
    [1, 2.4, 3.8, 5.2].forEach((h, i) => {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = freq * h;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, when);
      g.gain.linearRampToValueAtTime(vol / (i + 1), when + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, when + 3 - i * 0.4);
      o.connect(g); g.connect(this.musicGain);
      o.start(when); o.stop(when + 3);
    });
  }

  chord() {
    if (!this.ready) return;
    const t = this.ctx.currentTime + 0.05;
    const base = this.scale()[0] * 146.83;
    [1, 1.3348, 1.4983, 2].forEach((r, i) => {
      const o = this.ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = base * r;
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.012, t + 1.5);
      g.gain.linearRampToValueAtTime(0.0001, t + 6);
      o.connect(g); g.connect(this.reverb); g.connect(this.musicGain);
      o.start(t); o.stop(t + 6.2);
    });
  }

  sfx(type) {
    if (!this.ready || !this.soundOn) return;
    const t = this.ctx.currentTime;
    if (type === 'click') {
      this.blip(880, 0.04, 0.05, 'sine', t);
    } else if (type === 'coin') {
      this.blip(1180, 0.18, 0.11, 'triangle', t);
      this.blip(1560, 0.22, 0.09, 'triangle', t + 0.07);
      this.blip(2100, 0.26, 0.05, 'sine', t + 0.13);
    } else if (type === 'hammer') {
      this.noiseHit(t, 0.12, 0.55, 900);
      this.blip(160, 0.16, 0.15, 'square', t);
      this.bell(520, t, 0.012);
    } else if (type === 'anvil') {
      this.noiseHit(t, 0.06, 0.4, 2600);
      this.blip(740, 0.9, 0.07, 'sine', t);
      this.blip(1130, 0.7, 0.04, 'sine', t);
    } else if (type === 'water') {
      this.noiseHit(t, 0.5, 0.18, 1600);
    } else if (type === 'gavel') {
      this.noiseHit(t, 0.08, 0.7, 700);
      this.blip(120, 0.3, 0.2, 'square', t);
    } else if (type === 'success') {
      [523, 659, 784, 1046].forEach((f, i) => this.bell(f, t + i * 0.09, 0.035));
    } else if (type === 'error') {
      this.blip(180, 0.2, 0.09, 'square', t);
      this.blip(150, 0.25, 0.07, 'square', t + 0.08);
    } else if (type === 'sale') {
      [523, 784, 1046, 1318].forEach((f, i) => this.pluck(f, t + i * 0.1, 0.09, 0.8));
      this.sfx('coin');
    } else if (type === 'oni') {
      this.bell(110, t, 0.05);
      this.bell(164, t + 0.4, 0.03);
      this.noiseHit(t, 2.2, 0.12, 220);
    } else if (type === 'open') {
      this.noiseHit(t, 0.25, 0.08, 1200);
    }
  }

  blip(freq, dur, vol, type, when) {
    const o = this.ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, when);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    o.connect(g); g.connect(this.sfxGain);
    o.start(when); o.stop(when + dur + 0.02);
  }

  noiseHit(when, dur, vol, freq) {
    const ctx = this.ctx;
    const len = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.5);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const f = ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = freq;
    f.Q.value = 1.2;
    const g = ctx.createGain();
    g.gain.value = vol;
    src.connect(f); f.connect(g); g.connect(this.sfxGain);
    src.start(when);
  }

  setMusic(on) {
    this.musicOn = on;
    if (this.musicGain) this.musicGain.gain.setTargetAtTime(on ? 0.32 : 0, this.ctx.currentTime, 0.3);
  }

  setMood(mood) {
    this.mood = mood;
    if (!this.ready) return;
    const t = this.ctx.currentTime;
    if (mood === 'oni') {
      this.droneGain.gain.setTargetAtTime(0.06, t, 1.5);
      this.crowdGain.gain.setTargetAtTime(0.02, t, 1.5);
      this.windFilter.frequency.setTargetAtTime(260, t, 2);
    } else if (mood === 'auction') {
      this.droneGain.gain.setTargetAtTime(0.012, t, 1.5);
      this.crowdGain.gain.setTargetAtTime(0.09, t, 1.5);
      this.windFilter.frequency.setTargetAtTime(700, t, 2);
    } else {
      this.droneGain.gain.setTargetAtTime(0, t, 1.5);
      this.crowdGain.gain.setTargetAtTime(0, t, 1.5);
      this.windFilter.frequency.setTargetAtTime(480, t, 2);
    }
  }

  setWeather(weather, night) {
    if (!this.ready) return;
    const t = this.ctx.currentTime;
    const rainy = weather === 'rain' || weather === 'storm';
    this.windGain.gain.setTargetAtTime(rainy ? 1.1 : night ? 0.35 : 0.5, t, 2);
    this.windFilter.frequency.setTargetAtTime(rainy ? 2400 : night ? 320 : 520, t, 2);
  }
}

export const audio = new AudioEngine();
