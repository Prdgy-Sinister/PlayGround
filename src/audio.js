/* ═══════════════════════════════════════════════════════════
   WANDLORE · SOUND
   Tiny procedural WebAudio score — no assets, no loading.
   ═══════════════════════════════════════════════════════════ */

export class Audio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.enabled = true;
    this.ambient = null;
    this.ambientGain = null;
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.enabled ? 0.5 : 0;
    this.master.connect(this.ctx.destination);
    this.startAmbient();
  }

  setEnabled(on) {
    this.enabled = on;
    if (this.master) this.master.gain.setTargetAtTime(on ? 0.5 : 0, this.ctx.currentTime, 0.1);
  }

  startAmbient() {
    if (!this.ctx || this.ambient) return;
    const ctx = this.ctx;
    const gain = ctx.createGain();
    gain.gain.value = 0.0;
    gain.connect(this.master);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 520;
    filter.Q.value = 0.7;
    filter.connect(gain);
    // slow drifting pad
    const freqs = [110, 164.81, 220, 261.63, 329.63];
    const oscs = freqs.map((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 ? 'sine' : 'triangle';
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.02 + (i === 0 ? 0.02 : 0);
      osc.connect(g); g.connect(filter);
      osc.start();
      return { osc, g, base: f };
    });
    // breathy noise
    const len = ctx.sampleRate * 4;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * 0.35;
    const noise = ctx.createBufferSource();
    noise.buffer = buf; noise.loop = true;
    const nGain = ctx.createGain(); nGain.gain.value = 0.012;
    const nFilter = ctx.createBiquadFilter(); nFilter.type = 'bandpass'; nFilter.frequency.value = 900; nFilter.Q.value = 0.6;
    noise.connect(nFilter); nFilter.connect(nGain); nGain.connect(gain);
    noise.start();
    gain.gain.setTargetAtTime(0.5, ctx.currentTime, 4);
    this.ambient = { oscs, noise, gain };
    this.ambientGain = gain;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.055;
    const lfoGain = ctx.createGain(); lfoGain.gain.value = 140;
    lfo.connect(lfoGain); lfoGain.connect(filter.frequency);
    lfo.start();
  }

  tone({ freq = 440, type = 'sine', dur = 0.3, vol = 0.2, slide = 0, delay = 0, filter = 0, q = 1, pan = 0 }) {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t0 + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + Math.min(0.04, dur * 0.2));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    let node = osc;
    if (filter) {
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass'; f.frequency.value = filter; f.Q.value = q;
      node.connect(f); node = f;
    }
    if (pan && ctx.createStereoPanner) {
      const p = ctx.createStereoPanner(); p.pan.value = pan;
      node.connect(p); p.connect(g);
    } else node.connect(g);
    g.connect(this.master);
    osc.start(t0); osc.stop(t0 + dur + 0.05);
  }

  noise({ dur = 0.3, vol = 0.2, freq = 1200, delay = 0, type = 'bandpass', q = 0.8, slide = 0 }) {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx;
    const t0 = ctx.currentTime + delay;
    const len = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.setValueAtTime(freq, t0); f.Q.value = q;
    if (slide) f.frequency.exponentialRampToValueAtTime(Math.max(60, freq + slide), t0 + dur);
    const g = ctx.createGain(); g.gain.value = vol;
    src.connect(f); f.connect(g); g.connect(this.master);
    src.start(t0); src.stop(t0 + dur);
  }

  cast(cat = 'offense') {
    const table = {
      offense: { f: 620, t: 'triangle', s: -260, d: 0.32, v: 0.16, n: 2400 },
      defense: { f: 320, t: 'sine', s: 180, d: 0.6, v: 0.13, n: 900 },
      healing: { f: 520, t: 'sine', s: 240, d: 0.7, v: 0.11, n: 1600 },
      elemental: { f: 480, t: 'sawtooth', s: -180, d: 0.42, v: 0.1, n: 2800 },
      transformation: { f: 380, t: 'triangle', s: 320, d: 0.5, v: 0.13, n: 1800 },
      forbidden: { f: 180, t: 'sawtooth', s: -90, d: 0.7, v: 0.14, n: 700 }
    };
    const c = table[cat] || table.offense;
    this.tone({ freq: c.f, type: c.t, dur: c.d, vol: c.v, slide: c.s });
    this.noise({ dur: c.d * 0.7, vol: c.v * 0.4, freq: c.n, slide: -c.n * 0.4 });
  }

  hit() {
    this.noise({ dur: 0.18, vol: 0.24, freq: 280, type: 'lowpass', q: 1.4, slide: -180 });
    this.tone({ freq: 140, type: 'square', dur: 0.12, vol: 0.1, slide: -70 });
  }

  shield() {
    this.tone({ freq: 280, type: 'sine', dur: 0.6, vol: 0.14, slide: 140 });
    this.tone({ freq: 560, type: 'sine', dur: 0.5, vol: 0.07, slide: 210, delay: 0.04 });
  }

  heal() {
    [523, 659, 784].forEach((f, i) => this.tone({ freq: f, type: 'sine', dur: 0.5, vol: 0.08, delay: i * 0.08 }));
  }

  gather() {
    [660, 990].forEach((f, i) => this.tone({ freq: f, type: 'triangle', dur: 0.25, vol: 0.09, delay: i * 0.07 }));
  }

  ui() { this.tone({ freq: 880, type: 'sine', dur: 0.07, vol: 0.05 }); }

  error() { this.tone({ freq: 190, type: 'square', dur: 0.16, vol: 0.08, slide: -50 }); }

  levelup() {
    [392, 523, 659, 784, 1046].forEach((f, i) => this.tone({ freq: f, type: 'triangle', dur: 0.5, vol: 0.1, delay: i * 0.09 }));
    this.tone({ freq: 130, type: 'sine', dur: 1.4, vol: 0.1, delay: 0.1 });
  }

  victory() {
    [523, 659, 784, 1046].forEach((f, i) => this.tone({ freq: f, type: 'triangle', dur: 0.7, vol: 0.11, delay: i * 0.12 }));
  }

  defeat() {
    [392, 330, 262, 196].forEach((f, i) => this.tone({ freq: f, type: 'sine', dur: 0.8, vol: 0.1, delay: i * 0.16 }));
  }

  duelStart() {
    for (let i = 0; i < 3; i++) this.tone({ freq: 300 - i * 40, type: 'sine', dur: 0.2, vol: 0.16, delay: i * 0.45 });
    this.tone({ freq: 440, type: 'triangle', dur: 0.8, vol: 0.14, delay: 1.35 });
    this.noise({ dur: 0.7, vol: 0.12, freq: 1600, delay: 1.35 });
  }

  step() { this.noise({ dur: 0.06, vol: 0.03, freq: 380, type: 'lowpass' }); }
}
