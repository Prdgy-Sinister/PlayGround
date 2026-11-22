// Procedural WebAudio: synthwave soundtrack, engine, boost and impacts.
export class AudioEngine {
  constructor() {
    this.ctx = null
    this.started = false
    this.musicOn = true
    this.sfxOn = true
    this.engine = null
    this.musicTimer = null
    this.step = 0
    this.nextNoteTime = 0
    this.tempo = 112
    this.theme = 'city'
    this.master = null
    this.musicGain = null
    this.sfxGain = null
    this.noiseBuffer = null
    this.muted = false
  }

  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return }
    try {
      const AC = window.AudioContext || window.webkitAudioContext
      this.ctx = new AC()
      this.master = this.ctx.createGain()
      this.master.gain.value = 0.8
      this.master.connect(this.ctx.destination)
      this.musicGain = this.ctx.createGain()
      this.musicGain.gain.value = this.musicOn ? 0.24 : 0
      this.musicGain.connect(this.master)
      this.sfxGain = this.ctx.createGain()
      this.sfxGain.gain.value = this.sfxOn ? 0.5 : 0
      this.sfxGain.connect(this.master)
      this.noiseBuffer = this.makeNoise(2)
      this.started = true
      this.startMusic()
    } catch (e) { console.warn('Audio unavailable', e) }
  }

  makeNoise(seconds) {
    const ctx = this.ctx
    const buf = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
    return buf
  }

  setSettings({ music, sfx }) {
    if (typeof music === 'boolean') {
      this.musicOn = music
      if (this.musicGain) this.musicGain.gain.setTargetAtTime(music ? 0.24 : 0, this.ctx.currentTime, 0.1)
    }
    if (typeof sfx === 'boolean') {
      this.sfxOn = sfx
      if (this.sfxGain) this.sfxGain.gain.setTargetAtTime(sfx ? 0.5 : 0, this.ctx.currentTime, 0.1)
    }
  }

  setTheme(theme) {
    this.theme = theme
    const themes = {
      city: { tempo: 116, root: 45, scale: [0, 3, 5, 7, 10] },
      underground: { tempo: 100, root: 41, scale: [0, 2, 3, 7, 8] },
      quantum: { tempo: 124, root: 47, scale: [0, 2, 5, 7, 9] },
      ice: { tempo: 92, root: 43, scale: [0, 2, 4, 7, 9] },
      lava: { tempo: 132, root: 40, scale: [0, 1, 5, 6, 8] },
      ruin: { tempo: 96, root: 38, scale: [0, 3, 5, 6, 10] },
      void: { tempo: 88, root: 36, scale: [0, 2, 3, 5, 7] },
      space: { tempo: 90, root: 44, scale: [0, 2, 4, 6, 9] },
      dark: { tempo: 84, root: 34, scale: [0, 1, 3, 6, 8] },
      forest: { tempo: 104, root: 45, scale: [0, 2, 5, 7, 10] },
      desert: { tempo: 110, root: 41, scale: [0, 1, 4, 5, 7] },
      dome: { tempo: 128, root: 40, scale: [0, 3, 5, 7, 10] },
      team: { tempo: 118, root: 45, scale: [0, 3, 5, 7, 10] },
      tunnel: { tempo: 136, root: 42, scale: [0, 2, 3, 7, 10] },
      highway: { tempo: 122, root: 43, scale: [0, 3, 5, 7, 10] },
      solar: { tempo: 114, root: 46, scale: [0, 2, 5, 7, 9] },
      zero: { tempo: 106, root: 37, scale: [0, 2, 3, 6, 10] },
      menu: { tempo: 104, root: 45, scale: [0, 3, 5, 7, 10] },
    }
    this.track = themes[theme] || themes.city
    this.tempo = this.track.tempo
  }

  startMusic() {
    if (!this.ctx || this.musicTimer) return
    this.nextNoteTime = this.ctx.currentTime + 0.08
    this.musicTimer = setInterval(() => this.scheduler(), 30)
  }

  stopMusic() {
    if (this.musicTimer) clearInterval(this.musicTimer)
    this.musicTimer = null
  }

  scheduler() {
    if (!this.ctx || !this.musicOn) return
    const ahead = 0.12
    while (this.nextNoteTime < this.ctx.currentTime + ahead) {
      this.scheduleStep(this.step, this.nextNoteTime)
      this.nextNoteTime += 60 / this.tempo / 4
      this.step = (this.step + 1) % 64
    }
  }

  midi(n) { return 440 * Math.pow(2, (n - 69) / 12) }

  scheduleStep(step, time) {
    if (!this.ctx) return
    const tr = this.track || { root: 45, scale: [0, 3, 5, 7, 10] }
    const bar = Math.floor(step / 16)
    const s = step % 16
    const chordRoots = [0, 5, 3, 7]
    const root = tr.root + chordRoots[bar % 4]
    // kick
    if (s % 4 === 0) this.kick(time, s === 0 ? 0.9 : 0.55)
    // snare / clap
    if (s === 4 || s === 12) this.snare(time, 0.24)
    // hats
    if (s % 2 === 1) this.hat(time, 0.05 + (s % 4 === 3 ? 0.03 : 0))
    // bass
    if (s % 2 === 0) {
      const n = root - 12 + (s === 6 || s === 14 ? 3 : 0)
      this.bass(time, this.midi(n), 0.16, 60 / this.tempo / 2)
    }
    // arp
    if (s % 2 === 0 || s === 7 || s === 15) {
      const deg = tr.scale[(step * 3 + bar) % tr.scale.length]
      const oct = 12 * (1 + ((step + bar) % 3 === 0 ? 1 : 0))
      this.arp(time, this.midi(root + 12 + deg + oct), 0.06, 60 / this.tempo / 3)
    }
    // pad at bar start
    if (s === 0) {
      this.pad(time, [root, root + tr.scale[2], root + tr.scale[4], root + 12], 60 / this.tempo * 3.6)
    }
  }

  env(gain, time, a, d, peak = 1) {
    gain.gain.setValueAtTime(0.0001, time)
    gain.gain.linearRampToValueAtTime(peak, time + a)
    gain.gain.exponentialRampToValueAtTime(0.0001, time + a + d)
  }

  kick(time, vol) {
    const o = this.ctx.createOscillator(), g = this.ctx.createGain()
    o.type = 'sine'
    o.frequency.setValueAtTime(140, time)
    o.frequency.exponentialRampToValueAtTime(38, time + 0.14)
    this.env(g, time, 0.005, 0.24, vol * 0.7)
    o.connect(g).connect(this.musicGain)
    o.start(time); o.stop(time + 0.3)
  }

  snare(time, vol) {
    const src = this.ctx.createBufferSource(), g = this.ctx.createGain(), f = this.ctx.createBiquadFilter()
    src.buffer = this.noiseBuffer
    f.type = 'highpass'; f.frequency.value = 1600
    this.env(g, time, 0.003, 0.16, vol)
    src.connect(f).connect(g).connect(this.musicGain)
    src.start(time); src.stop(time + 0.2)
  }

  hat(time, vol) {
    const src = this.ctx.createBufferSource(), g = this.ctx.createGain(), f = this.ctx.createBiquadFilter()
    src.buffer = this.noiseBuffer
    f.type = 'highpass'; f.frequency.value = 7000
    this.env(g, time, 0.002, 0.05, vol)
    src.connect(f).connect(g).connect(this.musicGain)
    src.start(time); src.stop(time + 0.08)
  }

  bass(time, freq, vol, dur) {
    const o = this.ctx.createOscillator(), g = this.ctx.createGain(), f = this.ctx.createBiquadFilter()
    o.type = 'sawtooth'; o.frequency.value = freq
    f.type = 'lowpass'; f.frequency.value = 340; f.Q.value = 6
    this.env(g, time, 0.01, dur, vol)
    o.connect(f).connect(g).connect(this.musicGain)
    o.start(time); o.stop(time + dur + 0.05)
  }

  arp(time, freq, vol, dur) {
    const o = this.ctx.createOscillator(), g = this.ctx.createGain(), f = this.ctx.createBiquadFilter()
    o.type = 'square'; o.frequency.value = freq
    f.type = 'lowpass'; f.frequency.setValueAtTime(2200, time); f.frequency.exponentialRampToValueAtTime(700, time + dur)
    this.env(g, time, 0.005, dur, vol)
    o.connect(f).connect(g).connect(this.musicGain)
    o.start(time); o.stop(time + dur + 0.02)
  }

  pad(time, notes, dur) {
    for (const n of notes) {
      const o = this.ctx.createOscillator(), g = this.ctx.createGain()
      o.type = 'triangle'; o.frequency.value = this.midi(n)
      g.gain.setValueAtTime(0.0001, time)
      g.gain.linearRampToValueAtTime(0.035, time + 0.4)
      g.gain.linearRampToValueAtTime(0.0001, time + dur)
      o.connect(g).connect(this.musicGain)
      o.start(time); o.stop(time + dur + 0.05)
    }
  }

  // -------------------------------------------------------------------------
  // Engine
  // -------------------------------------------------------------------------
  startEngine(category = 'classic') {
    if (!this.ctx) return
    this.stopEngine()
    const profiles = {
      classic: { type: 'sawtooth', base: 55, cut: 600, sub: 0.4 },
      speed: { type: 'sawtooth', base: 72, cut: 950, sub: 0.5 },
      heavy: { type: 'square', base: 42, cut: 420, sub: 0.7 },
      racing: { type: 'sawtooth', base: 64, cut: 820, sub: 0.45 },
      experimental: { type: 'triangle', base: 84, cut: 1200, sub: 0.35 },
      stealth: { type: 'sine', base: 60, cut: 380, sub: 0.3 },
      legendary: { type: 'sawtooth', base: 68, cut: 1000, sub: 0.5 },
      prototype: { type: 'triangle', base: 78, cut: 1100, sub: 0.4 },
      limited: { type: 'sawtooth', base: 70, cut: 900, sub: 0.5 },
    }
    const pr = profiles[category] || profiles.classic
    const ctx = this.ctx
    const out = ctx.createGain()
    out.gain.value = 0
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'; filter.frequency.value = pr.cut; filter.Q.value = 5
    const o1 = ctx.createOscillator(); o1.type = pr.type; o1.frequency.value = pr.base
    const o2 = ctx.createOscillator(); o2.type = 'sawtooth'; o2.frequency.value = pr.base * 1.5
    const sub = ctx.createOscillator(); sub.type = 'sine'; sub.frequency.value = pr.base * 0.5
    const subG = ctx.createGain(); subG.gain.value = pr.sub
    const o2G = ctx.createGain(); o2G.gain.value = 0.35
    o1.connect(filter); o2.connect(o2G).connect(filter); sub.connect(subG).connect(filter)
    filter.connect(out).connect(this.sfxGain)
    o1.start(); o2.start(); sub.start()
    out.gain.setTargetAtTime(0.055, ctx.currentTime, 0.3)
    this.engine = { o1, o2, sub, filter, out, base: pr.base, speed: 0, boost: 0 }
  }

  updateEngine(speed01, boosting, throttle = 1) {
    const e = this.engine
    if (!e || !this.ctx) return
    const t = this.ctx.currentTime
    const freq = e.base * (1 + speed01 * 1.9 + (boosting ? 0.45 : 0))
    e.o1.frequency.setTargetAtTime(freq, t, 0.05)
    e.o2.frequency.setTargetAtTime(freq * 1.5, t, 0.05)
    e.sub.frequency.setTargetAtTime(freq * 0.5, t, 0.05)
    e.filter.frequency.setTargetAtTime(420 + speed01 * 1500 + (boosting ? 900 : 0), t, 0.08)
    e.out.gain.setTargetAtTime(0.03 + speed01 * 0.05 + (boosting ? 0.02 : 0), t, 0.1)
  }

  stopEngine() {
    if (!this.engine || !this.ctx) return
    const e = this.engine
    e.out.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08)
    setTimeout(() => {
      try { e.o1.stop(); e.o2.stop(); e.sub.stop() } catch {}
    }, 400)
    this.engine = null
  }

  // -------------------------------------------------------------------------
  // SFX
  // -------------------------------------------------------------------------
  tone(freq, dur, type = 'sine', vol = 0.2, slide = 0) {
    if (!this.ctx || !this.sfxOn) return
    const t = this.ctx.currentTime
    const o = this.ctx.createOscillator(), g = this.ctx.createGain()
    o.type = type; o.frequency.setValueAtTime(freq, t)
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t + dur)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.linearRampToValueAtTime(vol, t + 0.008)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    o.connect(g).connect(this.sfxGain)
    o.start(t); o.stop(t + dur + 0.02)
  }

  noise(dur, vol = 0.2, hp = 400, lp = 6000) {
    if (!this.ctx || !this.sfxOn) return
    const t = this.ctx.currentTime
    const src = this.ctx.createBufferSource(), g = this.ctx.createGain()
    const f1 = this.ctx.createBiquadFilter(), f2 = this.ctx.createBiquadFilter()
    src.buffer = this.noiseBuffer
    f1.type = 'highpass'; f1.frequency.value = hp
    f2.type = 'lowpass'; f2.frequency.value = lp
    g.gain.setValueAtTime(vol, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    src.connect(f1).connect(f2).connect(g).connect(this.sfxGain)
    src.start(t); src.stop(t + dur + 0.02)
  }

  click() { this.tone(880, 0.05, 'square', 0.06, 220) }
  hover() { this.tone(1320, 0.03, 'sine', 0.025) }
  back() { this.tone(440, 0.08, 'triangle', 0.06, -120) }
  error() { this.tone(160, 0.18, 'square', 0.09, -40) }
  buy() { this.tone(660, 0.08, 'triangle', 0.12); setTimeout(() => this.tone(990, 0.12, 'triangle', 0.1), 70) }
  equip() { this.tone(520, 0.06, 'square', 0.08); setTimeout(() => this.tone(780, 0.09, 'square', 0.07), 60) }
  countdown(final = false) { this.tone(final ? 1320 : 660, final ? 0.45 : 0.16, 'square', 0.14) }
  boost() {
    this.noise(0.5, 0.3, 300, 8000)
    this.tone(180, 0.45, 'sawtooth', 0.12, 900)
  }
  jump() { this.tone(300, 0.22, 'sine', 0.1, 500) }
  drift() { this.noise(0.12, 0.05, 2000, 9000) }
  trailHit() { this.noise(0.3, 0.35, 120, 3000); this.tone(90, 0.3, 'sawtooth', 0.2, -50) }
  crash() {
    this.noise(0.7, 0.55, 60, 4000)
    this.tone(120, 0.6, 'sawtooth', 0.28, -90)
    setTimeout(() => this.noise(0.5, 0.25, 200, 2500), 90)
  }
  explode() {
    this.noise(1.1, 0.6, 40, 3500)
    this.tone(70, 0.9, 'sine', 0.3, -40)
  }
  pickup() { this.tone(990, 0.07, 'triangle', 0.1); setTimeout(() => this.tone(1480, 0.12, 'triangle', 0.09), 60) }
  levelUp() {
    [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => this.tone(f, 0.25, 'triangle', 0.12), i * 110))
  }
  win() {
    [523, 659, 784, 1046, 1318].forEach((f, i) => setTimeout(() => this.tone(f, 0.5, 'triangle', 0.13), i * 140))
  }
  lose() {
    [440, 392, 330, 262].forEach((f, i) => setTimeout(() => this.tone(f, 0.35, 'sawtooth', 0.08), i * 150))
  }
  achievement() {
    [784, 988, 1175, 1568].forEach((f, i) => setTimeout(() => this.tone(f, 0.3, 'square', 0.07), i * 90))
  }
}

export const audio = new AudioEngine()
