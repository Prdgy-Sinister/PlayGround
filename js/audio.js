/* ============================================================
   WANDLORE — audio.js
   Fully procedural Web Audio soundtrack and spell SFX.
   No external assets: every sound is synthesized.
   ============================================================ */

export class AudioEngine {
  constructor() {
    this.ctx = null
    this.master = null
    this.musicGain = null
    this.sfxGain = null
    this.enabled = true
    this.started = false
    this._droneNodes = []
    this._musicTimer = null
    this._lastSfx = {}
  }

  init() {
    if (this.ctx) return
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    this.ctx = new AC()
    this.master = this.ctx.createGain()
    this.master.gain.value = 0.6
    this.master.connect(this.ctx.destination)
    this.musicGain = this.ctx.createGain()
    this.musicGain.gain.value = 0.22
    this.musicGain.connect(this.master)
    this.sfxGain = this.ctx.createGain()
    this.sfxGain.gain.value = 0.55
    this.sfxGain.connect(this.master)
    this.startAmbience()
  }

  resume() {
    if (!this.ctx) this.init()
    if (this.ctx?.state === 'suspended') this.ctx.resume()
  }

  setEnabled(on) {
    this.enabled = on
    if (!this.master) return
    this.master.gain.setTargetAtTime(on ? 0.6 : 0, this.ctx.currentTime, 0.15)
  }

  /* ------------------------------------------------- MUSIC BED */
  startAmbience() {
    if (!this.ctx || this.started) return
    this.started = true
    const ctx = this.ctx
    // Low drone stack
    const drone = (freq, type, gain, detune = 0) => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      const filt = ctx.createBiquadFilter()
      osc.type = type
      osc.frequency.value = freq
      osc.detune.value = detune
      filt.type = 'lowpass'
      filt.frequency.value = 520
      g.gain.value = 0
      osc.connect(filt); filt.connect(g); g.connect(this.musicGain)
      osc.start()
      g.gain.setTargetAtTime(gain, ctx.currentTime, 3)
      this._droneNodes.push({ osc, g })
      return { osc, g }
    }
    drone(55, 'sine', 0.16)
    drone(82.5, 'sine', 0.08, 6)
    drone(110, 'triangle', 0.05, -8)
    drone(164.8, 'sine', 0.03, 4)

    // Slow evolving pad notes
    const scale = [220, 246.94, 293.66, 329.63, 392, 440, 493.88, 587.33]
    const bell = (freq, delay, dur, vol) => {
      const t = ctx.currentTime + delay
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      const filt = ctx.createBiquadFilter()
      osc.type = 'sine'
      osc.frequency.value = freq
      filt.type = 'bandpass'
      filt.frequency.value = freq * 1.5
      filt.Q.value = 2
      osc.connect(filt); filt.connect(g); g.connect(this.musicGain)
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(vol, t + 0.6)
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
      osc.start(t); osc.stop(t + dur + 0.1)
    }
    const schedulePad = () => {
      if (!this.ctx) return
      const f = scale[Math.floor(Math.random() * scale.length)]
      bell(f, 0, 6 + Math.random() * 4, 0.055)
      bell(f * 1.5, 0.4, 5 + Math.random() * 3, 0.028)
      if (Math.random() < 0.5) bell(f * 2, 1.1, 4, 0.02)
    }
    schedulePad()
    this._musicTimer = setInterval(schedulePad, 6200)
  }

  /* ------------------------------------------------- PRIMITIVES */
  tone({ freq = 440, type = 'sine', dur = 0.22, vol = 0.3, slide = 0, delay = 0, filter = null, attack = 0.008, target = 'sfx' }) {
    if (!this.ctx || !this.enabled) return
    const ctx = this.ctx
    const t = ctx.currentTime + delay
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, t)
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t + dur)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.linearRampToValueAtTime(vol, t + attack)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    let node = osc
    if (filter) {
      const f = ctx.createBiquadFilter()
      f.type = filter.type || 'lowpass'
      f.frequency.setValueAtTime(filter.freq || 1200, t)
      if (filter.to) f.frequency.exponentialRampToValueAtTime(Math.max(40, filter.to), t + dur)
      f.Q.value = filter.q || 1
      node.connect(f); node = f
    }
    node.connect(g)
    g.connect(target === 'music' ? this.musicGain : this.sfxGain)
    osc.start(t); osc.stop(t + dur + 0.05)
  }

  noise({ dur = 0.3, vol = 0.2, filter = 1400, q = 0.8, delay = 0, sweep = 0, target = 'sfx' }) {
    if (!this.ctx || !this.enabled) return
    const ctx = this.ctx
    const t = ctx.currentTime + delay
    const len = Math.max(1, Math.floor(ctx.sampleRate * dur))
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
    const src = ctx.createBufferSource()
    src.buffer = buffer
    const g = ctx.createGain()
    g.gain.setValueAtTime(vol, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    const f = ctx.createBiquadFilter()
    f.type = 'bandpass'
    f.frequency.setValueAtTime(filter, t)
    if (sweep) f.frequency.exponentialRampToValueAtTime(Math.max(80, sweep), t + dur)
    f.Q.value = q
    src.connect(f); f.connect(g); g.connect(target === 'music' ? this.musicGain : this.sfxGain)
    src.start(t); src.stop(t + dur)
  }

  throttle(key, ms) {
    const now = performance.now()
    if (this._lastSfx[key] && now - this._lastSfx[key] < ms) return false
    this._lastSfx[key] = now
    return true
  }

  /* ------------------------------------------------- SFX LIBRARY */
  play(name, variant) {
    if (!this.ctx || !this.enabled) return
    switch (name) {
      case 'click': this.tone({ freq: 720, type: 'triangle', dur: 0.07, vol: 0.12, slide: -160 }); break
      case 'select': this.tone({ freq: 560, type: 'sine', dur: 0.1, vol: 0.14, slide: 180 }); break
      case 'equip':
        this.tone({ freq: 320, type: 'triangle', dur: 0.35, vol: 0.16, slide: 260 })
        this.tone({ freq: 640, type: 'sine', dur: 0.5, vol: 0.1, slide: 120, delay: 0.06 })
        break
      case 'coin':
        this.tone({ freq: 1180, type: 'sine', dur: 0.14, vol: 0.16 })
        this.tone({ freq: 1580, type: 'sine', dur: 0.2, vol: 0.12, delay: 0.07 })
        break
      case 'deny':
        this.tone({ freq: 160, type: 'square', dur: 0.16, vol: 0.11, slide: -50 })
        this.tone({ freq: 120, type: 'square', dur: 0.2, vol: 0.09, delay: 0.1, slide: -30 })
        break
      case 'magic':
        for (let i = 0; i < 4; i++) this.tone({ freq: 700 + i * 220, type: 'sine', dur: 0.5, vol: 0.06, delay: i * 0.055, slide: 140 })
        break
      case 'upgrade':
        for (let i = 0; i < 3; i++) this.tone({ freq: 330 * Math.pow(1.26, i), type: 'triangle', dur: 0.5, vol: 0.1, delay: i * 0.1 })
        this.noise({ dur: 0.5, vol: 0.08, filter: 2400, sweep: 400 })
        break
      case 'craft':
        this.noise({ dur: 0.7, vol: 0.09, filter: 3600, sweep: 260, q: 1.4 })
        for (let i = 0; i < 5; i++) this.tone({ freq: 600 + Math.random() * 900, type: 'sine', dur: 0.4, vol: 0.05, delay: i * 0.08, slide: 120 })
        this.tone({ freq: 110, type: 'sine', dur: 0.9, vol: 0.2, slide: 40 })
        break
      case 'rune':
        this.tone({ freq: 520 + Math.random() * 240, type: 'sine', dur: 0.28, vol: 0.14, slide: 200 })
        break
      case 'wrong':
        this.tone({ freq: 190, type: 'sawtooth', dur: 0.24, vol: 0.12, slide: -70, filter: { type: 'lowpass', freq: 900 } })
        break
      case 'lessonWin':
        ;[523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.tone({ freq: f, type: 'sine', dur: 0.7, vol: 0.11, delay: i * 0.13 }))
        break
      case 'lessonFail':
        ;[392, 349.23, 293.66, 246.94].forEach((f, i) => this.tone({ freq: f, type: 'triangle', dur: 0.6, vol: 0.1, delay: i * 0.16 }))
        break
      case 'cast': {
        const cat = variant || 'offensive'
        const base = { offensive: 520, defensive: 320, healing: 660, elemental: 440, transformation: 580, forbidden: 240 }[cat] || 480
        this.tone({ freq: base, type: cat === 'forbidden' ? 'sawtooth' : 'triangle', dur: 0.34, vol: 0.16, slide: cat === 'forbidden' ? -120 : 420, filter: { type: 'lowpass', freq: 3200, to: 900 } })
        this.noise({ dur: 0.28, vol: 0.07, filter: base * 3, sweep: 900 })
        break
      }
      case 'launch': this.tone({ freq: 880, type: 'sine', dur: 0.14, vol: 0.08, slide: -300 }); break
      case 'hit':
        if (!this.throttle('hit', 55)) return
        this.noise({ dur: 0.22, vol: 0.16, filter: 1600, sweep: 300, q: 0.7 })
        this.tone({ freq: 180, type: 'triangle', dur: 0.2, vol: 0.12, slide: -60 })
        break
      case 'playerHit':
        if (!this.throttle('playerHit', 90)) return
        this.tone({ freq: 120, type: 'sawtooth', dur: 0.32, vol: 0.2, slide: -40, filter: { type: 'lowpass', freq: 700 } })
        this.noise({ dur: 0.3, vol: 0.14, filter: 800, sweep: 200 })
        break
      case 'shieldHit':
        if (!this.throttle('shieldHit', 70)) return
        this.tone({ freq: 900, type: 'sine', dur: 0.22, vol: 0.1, slide: 500 })
        this.noise({ dur: 0.16, vol: 0.08, filter: 4200, sweep: 1400 })
        break
      case 'dodge': this.noise({ dur: 0.3, vol: 0.12, filter: 600, sweep: 2400, q: 1.2 }); break
      case 'cooldown': this.tone({ freq: 220, type: 'square', dur: 0.06, vol: 0.05 }); break
      case 'enemyCast': this.tone({ freq: 300, type: 'triangle', dur: 0.6, vol: 0.09, slide: 500, filter: { type: 'lowpass', freq: 1600, to: 3600 } }); break
      case 'enemyFire': this.tone({ freq: 700, type: 'sawtooth', dur: 0.2, vol: 0.07, slide: -400, filter: { type: 'lowpass', freq: 2200 } }); break
      case 'warning': this.tone({ freq: 660, type: 'square', dur: 0.1, vol: 0.06 }); this.tone({ freq: 660, type: 'square', dur: 0.1, vol: 0.06, delay: 0.16 }); break
      case 'duelStart':
        this.tone({ freq: 130, type: 'sawtooth', dur: 1.6, vol: 0.14, slide: 20, filter: { type: 'lowpass', freq: 500 } })
        ;[261.63, 329.63, 392].forEach((f, i) => this.tone({ freq: f, type: 'triangle', dur: 1.2, vol: 0.09, delay: 0.1 + i * 0.06 }))
        this.noise({ dur: 1.4, vol: 0.06, filter: 400, sweep: 2200 })
        break
      case 'phase': this.tone({ freq: 90, type: 'sawtooth', dur: 1.1, vol: 0.18, slide: 40, filter: { type: 'lowpass', freq: 800, to: 180 } }); break
      case 'revive':
        ;[392, 523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.tone({ freq: f, type: 'sine', dur: 1.1, vol: 0.1, delay: i * 0.09 }))
        this.noise({ dur: 1.2, vol: 0.1, filter: 800, sweep: 4000 })
        break
      case 'victory':
        ;[261.63, 329.63, 392, 523.25, 659.25].forEach((f, i) => this.tone({ freq: f, type: 'triangle', dur: 1.2, vol: 0.11, delay: i * 0.12 }))
        break
      case 'defeat':
        ;[293.66, 246.94, 196, 146.83].forEach((f, i) => this.tone({ freq: f, type: 'triangle', dur: 1.4, vol: 0.1, delay: i * 0.2 }))
        break
      case 'victorySting':
        this.tone({ freq: 1046.5, type: 'sine', dur: 1.4, vol: 0.07 })
        break
      case 'defeatSting':
        this.tone({ freq: 110, type: 'sine', dur: 1.8, vol: 0.08 })
        break
      case 'travel':
        this.noise({ dur: 1.1, vol: 0.12, filter: 300, sweep: 5200, q: 1.5 })
        this.tone({ freq: 220, type: 'sine', dur: 1, vol: 0.1, slide: 900 })
        break
    }
  }
}
