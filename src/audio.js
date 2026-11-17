/* Procedural magical music and effects. No external audio assets required. */
export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.mode = 'menu';
    this.state = null;
    this.started = false;
    this.master = null;
    this.musicBus = null;
    this.sfxBus = null;
    this.delay = null;
    this.crowdBus = null;
    this.crowdGain = null;
    this.nextNote = 0;
    this.step = 0;
    this.time = 0;
    this.lastSpeak = 0;
    this.crowdTarget = 0;
  }

  attachState(state) {
    this.state = state;
    if (this.crowdGain) this.setMode(this.mode);
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      this.ctx = ctx;
      this.master = ctx.createGain();
      this.master.gain.value = 0.55;
      this.master.connect(ctx.destination);

      this.musicBus = ctx.createGain();
      this.musicBus.gain.value = 0.24;
      this.musicBus.connect(this.master);

      this.sfxBus = ctx.createGain();
      this.sfxBus.gain.value = 0.5;
      this.sfxBus.connect(this.master);

      this.delay = ctx.createDelay(1.2);
      this.delay.delayTime.value = 0.36;
      const fb = ctx.createGain(); fb.gain.value = 0.3;
      const wet = ctx.createGain(); wet.gain.value = 0.3;
      this.delay.connect(fb); fb.connect(this.delay);
      this.delay.connect(wet); wet.connect(this.master);
      this.wet = wet;

      this.crowdBus = ctx.createGain();
      this.crowdBus.gain.value = 0;
      this.crowdBus.connect(this.master);
      this.crowdGain = this.crowdBus;
      this.startCrowd();

      this.nextNote = ctx.currentTime + 0.1;
      this.setMode(this.mode);
      this.started = true;
    } catch { /* audio unavailable */ }
  }

  setMode(mode) {
    this.mode = mode;
    if (!this.ctx) return;
    this.crowdTarget = mode === 'quid' ? 0.12 : mode === 'race' ? 0.035 : 0.0;
    if (this.crowdGain) {
      this.crowdGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.crowdGain.gain.setTargetAtTime(
        (this.state?.settings?.sound === false ? 0 : this.crowdTarget), this.ctx.currentTime, 0.6
      );
    }
    if (this.musicBus) {
      const wantMusic = this.state?.settings?.music !== false;
      this.musicBus.gain.setTargetAtTime(wantMusic ? (mode === 'race' ? 0.3 : 0.22) : 0, this.ctx.currentTime, 0.4);
    }
    this.nextNote = Math.max(this.nextNote, this.ctx.currentTime + 0.05);
  }

  startCrowd() {
    const ctx = this.ctx;
    const len = 4;
    const buf = ctx.createBuffer(2, ctx.sampleRate * len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const data = buf.getChannelData(c);
      for (let i = 0; i < data.length; i++) {
        const t = i / data.length;
        const pulse = 0.55 + 0.45 * Math.sin(t * Math.PI * 2 * 1.7 + c);
        data[i] = (Math.random() * 2 - 1) * pulse * 0.5;
      }
    }
    const src = ctx.createBufferSource();
    src.buffer = buf; src.loop = true;
    const filt = ctx.createBiquadFilter();
    filt.type = 'bandpass'; filt.frequency.value = 680; filt.Q.value = 0.55;
    const filt2 = ctx.createBiquadFilter();
    filt2.type = 'lowpass'; filt2.frequency.value = 2400;
    src.connect(filt).connect(filt2).connect(this.crowdBus);
    src.start();
    this.crowdSource = src;
  }

  update(dt) {
    if (!this.ctx) return;
    this.time += dt;
    if (this.crowdGain) {
      const target = this.state?.settings?.sound === false ? 0 : this.crowdTarget;
      this.crowdGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.4);
    }
    const now = this.ctx.currentTime;
    while (this.nextNote < now + 0.25) {
      this.scheduleStep(this.nextNote);
      const tempo = this.mode === 'race' ? 0.19 : this.mode === 'quid' ? 0.24 : 0.42;
      this.nextNote += tempo;
      this.step += 1;
    }
  }

  scheduleStep(when) {
    const isMusic = this.state?.settings?.music !== false;
    if (!isMusic) return;
    const step = this.step;
    const mode = this.mode;
    if (mode === 'menu') {
      const roots = [146.83, 174.61, 220.0, 196.0];
      const root = roots[Math.floor(step / 8) % roots.length];
      if (step % 2 === 0) {
        const arp = [1, 1.5, 2, 2.5, 3, 2.5, 2, 1.5];
        const f = root * arp[(step / 2) % arp.length | 0];
        this.tone(f, when, 1.1, 0.09, 'sine', true);
        this.tone(f * 2.005, when, 0.7, 0.035, 'triangle', true);
      }
      if (step % 16 === 0) {
        this.tone(root * 0.5, when, 3.4, 0.06, 'sine', true);
        this.tone(root * 0.75, when, 3.0, 0.045, 'triangle', true);
      }
    } else if (mode === 'race') {
      const roots = [110, 130.81, 98, 146.83];
      const root = roots[Math.floor(step / 16) % roots.length];
      const bass = [1, 1, 1.5, 1, 2, 1.5, 1, 1];
      if (step % 2 === 0) this.tone(root * 0.5 * bass[(step / 2) % 8], when, 0.24, 0.07, 'sawtooth', false);
      if (step % 4 === 1) this.tone(root * 2, when, 0.16, 0.03, 'square', true);
      if (step % 8 === 4) {
        this.tone(root * 4, when, 0.32, 0.02, 'sine', true);
        this.tone(root * 3, when + 0.1, 0.3, 0.018, 'sine', true);
      }
      if (step % 32 === 0) this.tone(root, when, 2.2, 0.045, 'sine', true);
    } else if (mode === 'quid') {
      const roots = [130.81, 146.83, 174.61, 196.0];
      const root = roots[Math.floor(step / 16) % roots.length];
      if (step % 2 === 0) this.tone(root * 0.5, when, 0.22, 0.055, 'triangle', false);
      if (step % 4 === 0) {
        const arp = [2, 2.5, 3, 4];
        this.tone(root * arp[(step / 4) % 4], when, 0.35, 0.045, 'sine', true);
      }
      if (step % 16 === 8) this.tone(root * 1.5, when, 0.5, 0.03, 'triangle', true);
    } else if (mode === 'victory') {
      const seq = [261.63, 329.63, 392, 523.25, 659.25, 783.99];
      const f = seq[step % seq.length];
      this.tone(f, when, 0.7, 0.07, 'triangle', true);
      this.tone(f * 0.5, when, 0.7, 0.04, 'sine', true);
    }
  }

  tone(freq, when, dur, gain = 0.06, type = 'sine', send = false) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, when);
    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), when + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    osc.connect(g);
    g.connect(this.musicBus);
    if (send) g.connect(this.delay);
    osc.start(when); osc.stop(when + dur + 0.05);
  }

  noise(when, dur, gain, freq, type = 'bandpass', q = 0.9, bus = 'sfx') {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(); src.buffer = buf;
    const filt = ctx.createBiquadFilter(); filt.type = type; filt.frequency.value = freq; filt.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(Math.max(0.0002, gain), when);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    src.connect(filt).connect(g).connect(bus === 'music' ? this.musicBus : this.sfxBus);
    src.start(when); src.stop(when + dur + 0.02);
  }

  sweep(f1, f2, dur, gain = 0.1, type = 'sawtooth') {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    const filt = ctx.createBiquadFilter();
    filt.type = 'lowpass'; filt.frequency.value = 2400;
    osc.type = type;
    osc.frequency.setValueAtTime(f1, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, f2), now + dur);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(gain, now + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.connect(filt).connect(g).connect(this.sfxBus);
    osc.start(now); osc.stop(now + dur + 0.02);
  }

  sfx(name) {
    if (!this.ctx || this.state?.settings?.sound === false) return;
    const now = this.ctx.currentTime;
    switch (name) {
      case 'click':
        this.tone(720, now, 0.08, 0.04, 'sine');
        break;
      case 'back':
        this.tone(420, now, 0.1, 0.035, 'sine');
        break;
      case 'checkpoint':
        this.tone(880, now, 0.22, 0.05, 'sine');
        this.tone(1320, now + 0.08, 0.35, 0.045, 'sine');
        break;
      case 'boost':
        this.sweep(180, 1100, 0.5, 0.11, 'sawtooth');
        this.noise(now, 0.35, 0.09, 1800, 'highpass', 1.2);
        break;
      case 'warp':
        this.sweep(900, 90, 0.7, 0.13, 'square');
        this.tone(70, now + 0.2, 0.9, 0.07, 'sine');
        break;
      case 'hit':
        this.noise(now, 0.45, 0.3, 180, 'lowpass', 0.8);
        this.sweep(220, 40, 0.45, 0.16, 'triangle');
        break;
      case 'whoosh':
        this.noise(now, 0.3, 0.11, 900, 'bandpass', 1.4);
        break;
      case 'crowd':
        this.noise(now, 1.8, 0.24, 900, 'bandpass', 0.4);
        break;
      case 'cheer':
        this.noise(now, 2.6, 0.32, 1000, 'bandpass', 0.35);
        this.tone(523, now, 0.4, 0.05, 'square');
        this.tone(659, now + 0.12, 0.5, 0.05, 'square');
        break;
      case 'goal':
        this.sfx('cheer');
        this.tone(392, now, 0.5, 0.08, 'sawtooth');
        this.tone(523, now + 0.18, 0.6, 0.08, 'sawtooth');
        break;
      case 'save':
        this.noise(now, 0.2, 0.25, 220, 'lowpass', 0.8);
        this.tone(660, now + 0.05, 0.3, 0.05, 'sine');
        this.sfx('crowd');
        break;
      case 'bludger':
        this.noise(now, 0.3, 0.3, 160, 'lowpass', 0.7);
        this.sweep(160, 50, 0.35, 0.15, 'square');
        break;
      case 'snitch':
        this.tone(1800, now, 0.2, 0.035, 'sine');
        this.tone(2300, now + 0.08, 0.2, 0.03, 'sine');
        this.tone(2700, now + 0.16, 0.25, 0.025, 'sine');
        break;
      case 'catch':
        this.sfx('snitch');
        this.tone(1046, now + 0.1, 0.8, 0.08, 'triangle');
        this.tone(1318, now + 0.3, 1.1, 0.07, 'triangle');
        this.noise(now, 3, 0.3, 1100, 'bandpass', 0.4);
        break;
      case 'win':
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.tone(f, now + i * 0.16, 0.8, 0.07, 'triangle'));
        this.noise(now, 3.2, 0.32, 1000, 'bandpass', 0.4);
        break;
      case 'lose':
        [392, 349.23, 311.13, 261.63].forEach((f, i) => this.tone(f, now + i * 0.22, 0.9, 0.05, 'sine'));
        break;
      case 'whistle':
        this.tone(2100, now, 0.35, 0.06, 'square');
        this.tone(2600, now + 0.02, 0.3, 0.04, 'sine');
        break;
      default:
        this.tone(600, now, 0.1, 0.03, 'sine');
    }
  }

  speak(text) {
    if (!this.ctx || this.state?.settings?.voice === false) return;
    if (!('speechSynthesis' in window)) return;
    const now = performance.now();
    if (now - this.lastSpeak < 700) return;
    this.lastSpeak = now;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text.replace(/[—…]/g, ','));
      u.lang = 'en-GB';
      u.rate = 1.08;
      u.pitch = 0.92;
      u.volume = 0.55;
      const voices = speechSynthesis.getVoices();
      const gb = voices.find(v => /en-GB/i.test(v.lang)) || voices.find(v => /en/i.test(v.lang));
      if (gb) u.voice = gb;
      speechSynthesis.speak(u);
    } catch { /* speech unavailable */ }
  }

  vibrate(ms = 20) {
    if (this.state?.settings?.haptics === false) return;
    if (navigator.vibrate) try { navigator.vibrate(ms); } catch { /* noop */ }
  }
}
