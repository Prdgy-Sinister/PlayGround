// Tiny WebAudio synth: no audio files, no load time, all cartoon noises.
export const audio = {
  ctx: null,
  master: null,
  muted: false,
  enabled: false,

  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.55;
    this.master.connect(this.ctx.destination);
    this.enabled = true;
  },

  setMuted(m) {
    this.muted = m;
    if (this.master) this.master.gain.value = m ? 0 : 0.55;
  },

  tone(freq, dur, type = 'sine', vol = 0.25, slideTo = null, delay = 0) {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g); g.connect(this.master);
    osc.start(t); osc.stop(t + dur + 0.03);
  },

  noise(dur, vol = 0.25, filterFreq = 900, type = 'lowpass', delay = 0) {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime + delay;
    const len = Math.max(1, Math.floor(this.ctx.sampleRate * dur));
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const filter = this.ctx.createBiquadFilter();
    filter.type = type; filter.frequency.value = filterFreq;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(filter); filter.connect(g); g.connect(this.master);
    src.start(t);
  },

  click() { this.tone(520, 0.07, 'square', 0.12); },
  select() { this.tone(660, 0.09, 'triangle', 0.16, 880); },
  countdown(n) {
    if (n > 0) this.tone(440, 0.16, 'square', 0.2);
    else { this.tone(880, 0.35, 'square', 0.22, 1320); this.tone(1320, 0.3, 'triangle', 0.12, 1760, 0.04); }
  },
  jump() { this.tone(300, 0.16, 'sine', 0.18, 620); },
  land(force = 1) { this.tone(90, 0.12, 'sine', 0.14 * Math.min(1.6, force)); this.noise(0.08, 0.1, 500); },
  dive() { this.noise(0.32, 0.16, 1400, 'bandpass'); this.tone(220, 0.2, 'sawtooth', 0.08, 110); },
  hit() {
    this.noise(0.22, 0.3, 700);
    this.tone(140, 0.22, 'square', 0.2, 60);
    this.tone(300, 0.1, 'triangle', 0.1, 180);
  },
  splash() {
    this.noise(0.65, 0.42, 1800, 'bandpass');
    this.noise(0.5, 0.25, 600);
    this.tone(500, 0.4, 'sine', 0.1, 100);
  },
  checkpoint() {
    this.tone(660, 0.12, 'triangle', 0.2);
    this.tone(880, 0.16, 'triangle', 0.2, null, 0.1);
    this.tone(1320, 0.25, 'triangle', 0.18, null, 0.2);
  },
  launch() { this.tone(160, 0.32, 'sine', 0.28, 900); this.tone(260, 0.25, 'triangle', 0.12, 1300, 0.03); },
  finish() {
    const notes = [523, 659, 784, 1047, 1319];
    notes.forEach((n, i) => this.tone(n, 0.28, 'triangle', 0.22, null, i * 0.11));
    this.tone(1568, 0.7, 'triangle', 0.16, null, 0.55);
  },
  fail() {
    [392, 330, 262, 196].forEach((n, i) => this.tone(n, 0.3, 'square', 0.16, null, i * 0.16));
  },
  coin() { this.tone(1046, 0.08, 'square', 0.16); this.tone(1568, 0.12, 'square', 0.15, null, 0.07); },
  crowd(level = 1) {
    if (!this.ctx || this.muted) return;
    this.noise(1.4, 0.1 * level, 900, 'bandpass');
  }
};
