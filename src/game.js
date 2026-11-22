// Core gameplay: light-cycle physics, energy trails, AI, modes and camera.
import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { Track } from './track.js'
import { createBikeModel } from './bike.js'
import {
  MODES, TRACK_MAP, BIKE_MAP, BIKES, BOT_NAMES, BOT_STYLES, BOT_STYLE_KEYS,
  DIFFICULTIES, TEAM_COLORS, STAT_KEYS,
} from './data.js'
import {
  getCustom, getUpgrades, effectiveStats, normalizedStats,
} from './save.js'

const BIKE_RADIUS = 0.8
const TRAIL_STEP = 3.2
const TRAIL_HEIGHT = 1.75
const TRAIL_CAP = 9000
const CELL = 14
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const lerp = (a, b, t) => a + (b - a) * t
const wrapAngle = (a) => { while (a > Math.PI) a -= Math.PI * 2; while (a < -Math.PI) a += Math.PI * 2; return a }
const rand = (a, b) => a + Math.random() * (b - a)
const dist2 = (ax, az, bx, bz) => Math.hypot(ax - bx, az - bz)

function distSeg(px, pz, ax, az, bx, bz) {
  const dx = bx - ax, dz = bz - az
  const l2 = dx * dx + dz * dz
  let t = l2 ? ((px - ax) * dx + (pz - az) * dz) / l2 : 0
  t = clamp(t, 0, 1)
  return Math.hypot(px - (ax + dx * t), pz - (az + dz * t))
}

const cellKey = (cx, cz) => cx + ',' + cz

// ---------------------------------------------------------------------------
// Energy trail system with spatial hashing + instanced rendering
// ---------------------------------------------------------------------------
class TrailSystem {
  constructor(scene, capacity = TRAIL_CAP) {
    this.capacity = capacity
    this.grid = new Map()
    this.segments = new Map()
    this.free = []
    this.order = []
    for (let i = capacity - 1; i >= 0; i--) this.free.push(i)
    const geo = new THREE.PlaneGeometry(1, 1)
    geo.translate(0, 0.5, 0)
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffffff, transparent: true, opacity: 0.82, side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
    this.mesh = new THREE.InstancedMesh(geo, mat, capacity)
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    this.mesh.count = capacity
    this.mesh.frustumCulled = false
    this.mesh.renderOrder = 2
    scene.add(this.mesh)
    this.zero = new THREE.Matrix4().makeScale(0, 0, 0)
    for (let i = 0; i < capacity; i++) this.mesh.setMatrixAt(i, this.zero)
    this.mesh.instanceMatrix.needsUpdate = true
    this._m = new THREE.Matrix4()
    this._q = new THREE.Quaternion()
    this._e = new THREE.Euler()
    this._p = new THREE.Vector3()
    this._s = new THREE.Vector3()
    this._c = new THREE.Color()
    this.dirty = false
  }

  add(racer, ax, az, bx, bz) {
    let slot
    if (this.free.length) slot = this.free.pop()
    else {
      // recycle the oldest segment
      let old = null
      while (this.order.length) {
        const s = this.order.shift()
        if (this.segments.has(s.slot)) { old = s; break }
      }
      if (!old) return
      this.remove(old, false)
      slot = old.slot
    }
    const life = racer.trailLife
    const seg = {
      slot, ax, az, bx, bz, owner: racer, ownerId: racer.id, team: racer.team,
      born: this.now || 0, life, alive: true, cells: [],
    }
    const dx = bx - ax, dz = bz - az
    const len = Math.hypot(dx, dz) || 0.01
    const ang = Math.atan2(dx, dz) - Math.PI / 2
    this._e.set(0, ang, 0)
    this._q.setFromEuler(this._e)
    this._p.set((ax + bx) / 2, 0, (az + bz) / 2)
    this._s.set(len + 0.05, TRAIL_HEIGHT, 1)
    this._m.compose(this._p, this._q, this._s)
    this.mesh.setMatrixAt(slot, this._m)
    this._c.set(racer.trailColor)
    this.mesh.setColorAt(slot, this._c)
    // grid insertion
    const minx = Math.min(ax, bx) - 1, maxx = Math.max(ax, bx) + 1
    const minz = Math.min(az, bz) - 1, maxz = Math.max(az, bz) + 1
    for (let cx = Math.floor(minx / CELL); cx <= Math.floor(maxx / CELL); cx++) {
      for (let cz = Math.floor(minz / CELL); cz <= Math.floor(maxz / CELL); cz++) {
        const k = cellKey(cx, cz)
        let set = this.grid.get(k)
        if (!set) { set = new Set(); this.grid.set(k, set) }
        set.add(seg); seg.cells.push(k)
      }
    }
    this.segments.set(slot, seg)
    this.order.push(seg)
    this.dirty = true
  }

  remove(seg, recycle = true) {
    if (!seg || !seg.alive) return
    seg.alive = false
    this.segments.delete(seg.slot)
    for (const k of seg.cells) {
      const set = this.grid.get(k)
      if (set) { set.delete(seg); if (!set.size) this.grid.delete(k) }
    }
    this.mesh.setMatrixAt(seg.slot, this.zero)
    this.mesh.setColorAt(seg.slot, this._c.set('#000000'))
    if (recycle) this.free.push(seg.slot)
    this.dirty = true
  }

  query(x, z, radius, ownerId, team) {
    const cx = Math.floor(x / CELL), cz = Math.floor(z / CELL)
    const out = []
    for (let ix = cx - 1; ix <= cx + 1; ix++) {
      for (let iz = cz - 1; iz <= cz + 1; iz++) {
        const set = this.grid.get(cellKey(ix, iz))
        if (!set) continue
        for (const seg of set) {
          if (!seg.alive || seg.ownerId === ownerId) continue
          if (team >= 0 && seg.team === team) continue
          if (this.now - seg.born < 0.12) continue
          if (distSeg(x, z, seg.ax, seg.az, seg.bx, seg.bz) < radius) out.push(seg)
        }
      }
    }
    return out
  }

  hit(x, z, radius, ownerId, team) {
    const cx = Math.floor(x / CELL), cz = Math.floor(z / CELL)
    for (let ix = cx - 1; ix <= cx + 1; ix++) {
      for (let iz = cz - 1; iz <= cz + 1; iz++) {
        const set = this.grid.get(cellKey(ix, iz))
        if (!set) continue
        for (const seg of set) {
          if (!seg.alive || seg.ownerId === ownerId) continue
          if (team >= 0 && seg.team === team) continue
          if (this.now - seg.born < 0.12) continue
          if (distSeg(x, z, seg.ax, seg.az, seg.bx, seg.bz) < radius) return seg
        }
      }
    }
    return null
  }

  update(dt, now) {
    this.now = now
    for (const seg of this.segments.values()) {
      if (now - seg.born > seg.life) this.remove(seg)
    }
    if (this.dirty) {
      this.mesh.instanceMatrix.needsUpdate = true
      if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true
      this.dirty = false
    }
  }

  clear() {
    for (const seg of [...this.segments.values()]) this.remove(seg)
  }

  dispose(scene) {
    scene.remove(this.mesh)
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
    this.grid.clear()
    this.segments.clear()
  }
}

// ---------------------------------------------------------------------------
// GPU-friendly particle pool
// ---------------------------------------------------------------------------
class Particles {
  constructor(scene, capacity = 900) {
    this.cap = capacity
    this.pos = new Float32Array(capacity * 3)
    this.col = new Float32Array(capacity * 3)
    this.vel = new Float32Array(capacity * 3)
    this.life = new Float32Array(capacity)
    this.maxLife = new Float32Array(capacity)
    this.baseCol = new Float32Array(capacity * 3)
    this.cursor = 0
    this.geo = new THREE.BufferGeometry()
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3))
    this.geo.setAttribute('color', new THREE.BufferAttribute(this.col, 3))
    this.mat = new THREE.PointsMaterial({
      size: 0.55, vertexColors: true, transparent: true, opacity: 0.95,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    })
    this.points = new THREE.Points(this.geo, this.mat)
    this.points.frustumCulled = false
    this.points.renderOrder = 3
    scene.add(this.points)
    for (let i = 0; i < capacity; i++) this.pos[i * 3 + 1] = -999
  }

  spawn(x, y, z, color, count = 12, speed = 6, life = 0.7, spread = 0.6, gravity = 1) {
    const c = new THREE.Color(color)
    for (let i = 0; i < count; i++) {
      const idx = this.cursor
      this.cursor = (this.cursor + 1) % this.cap
      this.pos[idx * 3] = x + rand(-spread, spread)
      this.pos[idx * 3 + 1] = y + rand(-spread, spread)
      this.pos[idx * 3 + 2] = z + rand(-spread, spread)
      const a = Math.random() * Math.PI * 2
      const e = Math.random() * Math.PI - Math.PI / 2
      const sp = speed * (0.35 + Math.random() * 0.9)
      this.vel[idx * 3] = Math.cos(a) * Math.cos(e) * sp
      this.vel[idx * 3 + 1] = Math.sin(e) * sp * gravity + 1.5
      this.vel[idx * 3 + 2] = Math.sin(a) * Math.cos(e) * sp
      this.life[idx] = life * (0.6 + Math.random() * 0.8)
      this.maxLife[idx] = this.life[idx]
      this.baseCol[idx * 3] = c.r
      this.baseCol[idx * 3 + 1] = c.g
      this.baseCol[idx * 3 + 2] = c.b
    }
  }

  update(dt) {
    for (let i = 0; i < this.cap; i++) {
      if (this.life[i] <= 0) continue
      this.life[i] -= dt
      if (this.life[i] <= 0) {
        this.pos[i * 3 + 1] = -999
        this.col[i * 3] = this.col[i * 3 + 1] = this.col[i * 3 + 2] = 0
        continue
      }
      this.vel[i * 3 + 1] -= 12 * dt
      this.pos[i * 3] += this.vel[i * 3] * dt
      this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt
      this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt
      if (this.pos[i * 3 + 1] < 0.05) { this.pos[i * 3 + 1] = 0.05; this.vel[i * 3 + 1] *= -0.35 }
      const f = Math.max(0, this.life[i] / this.maxLife[i])
      this.col[i * 3] = this.baseCol[i * 3] * f
      this.col[i * 3 + 1] = this.baseCol[i * 3 + 1] * f
      this.col[i * 3 + 2] = this.baseCol[i * 3 + 2] * f
    }
    this.geo.attributes.position.needsUpdate = true
    this.geo.attributes.color.needsUpdate = true
  }

  dispose(scene) {
    scene.remove(this.points)
    this.geo.dispose(); this.mat.dispose()
  }
}

// ---------------------------------------------------------------------------
// Racer
// ---------------------------------------------------------------------------
class Racer {
  constructor(game, opts) {
    this.game = game
    this.id = opts.id
    this.name = opts.name
    this.isPlayer = !!opts.isPlayer
    this.bike = opts.bike
    this.custom = opts.custom
    this.rider = opts.rider
    this.team = opts.team ?? -1
    this.stats = opts.stats
    this.model = opts.model
    this.color = opts.color || this.custom.accent
    this.trailColor = opts.trailColor || this.custom.trail
    this.x = opts.x; this.z = opts.z; this.heading = opts.heading || 0
    this.speed = 0
    this.steer = 0
    this.y = 0; this.vy = 0; this.airborne = false; this.jumpCd = 0
    this.alive = true
    this.finished = false
    this.finishTime = 0
    this.eliminatedAt = 0
    this.invuln = game.time + 1.8
    this.stun = 0
    this.boost = 1
    this.boosting = false
    this.drifting = false
    this.specialCd = 0
    this.trailAccum = 0
    this.lastTrail = { x: opts.x, z: opts.z }
    this.trailLife = 999
    this.trailWidth = 0.6
    this.distance = 0
    this.boostTime = 0
    this.driftTime = 0
    this.jumps = 0
    this.takedowns = 0
    this.crashes = 0
    this.score = 0
    this.place = 0
    this.respawnTimer = 0
    this.raceDist = 0
    this.lastT = 0
    this.tIndex = 0
    this.lapCount = 0
    this.offroad = 0
    this.hazardTime = 0
    this.ai = opts.ai || null
    this.aiTimer = Math.random() * 0.15
    this.aiSteer = 0
    this.aiBoost = false
    this.aiDrift = false
    this.aiJump = false
    this.aiSpecial = false
    this.wallWarn = 0
    this.driftFx = 0
    this.boostingFx = 0
    this.group = this.model.group
    this.group.position.set(opts.x, 0, opts.z)
    this.group.rotation.y = this.heading
    this.trailColorHex = new THREE.Color(this.trailColor).getHex()
    if (opts.stats) {
      this.maxSpeed = 26 + (this.stats.speed / 100) * 26
      this.accel = 13 + (this.stats.accel / 100) * 26
      this.brakePower = 20 + (this.stats.brake / 100) * 36
      this.turnRate = 0.9 + (this.stats.turnResponse / 100) * 1.35
      this.boostRecharge = 0.1 + (this.stats.boostRecharge / 100) * 0.24
      this.boostCap = 0.65 + (this.stats.boostCap / 100) * 0.55
      this.trailWidth = 0.5 + (this.stats.trailDurability / 100) * 0.55
    }
    this.baseTrailLife = 999
    this.handling = 0.5 + ((this.stats?.handling || 60) / 100) * 0.6
  }

  forward() { return { x: Math.sin(this.heading), z: Math.cos(this.heading) } }

  resetForRace(x, z, heading) {
    this.x = x; this.z = z; this.heading = heading
    this.speed = 0; this.steer = 0; this.alive = true; this.finished = false
    this.y = 0; this.vy = 0; this.airborne = false
    this.invuln = this.game.time + 2
    this.lastTrail = { x, z }
    this.trailAccum = 0
    this.group.visible = true
    this.group.position.set(x, 0, z)
    this.group.rotation.set(0, heading, 0)
    this.raceDist = 0
    this.lastT = this.game.track.closest(x, z).t
    this.tIndex = this.game.track.closest(x, z).index || 0
  }
}

export { Racer, TrailSystem, Particles, BIKE_RADIUS, TRAIL_HEIGHT }

// ---------------------------------------------------------------------------
// Game
// ---------------------------------------------------------------------------
export class Game {
  constructor(renderer, profile, opts = {}) {
    this.renderer = renderer
    this.profile = profile
    this.opts = opts
    this.rulesMode = opts.rulesMode || opts.mode || 'classic'
    this.metaMode = opts.metaMode || this.rulesMode
    this.rules = MODES[this.rulesMode] || MODES.classic
    this.trackData = TRACK_MAP[opts.trackId] || TRACK_MAP['neon-grid-city']
    this.difficulty = opts.difficulty ?? this.rules.difficulty ?? 2
    this.difficultyInfo = DIFFICULTIES[this.difficulty] || DIFFICULTIES[2]
    this.quality = opts.quality || 'medium'
    this.championship = !!opts.championship
    this.competitive = ['grandprix', 'team', 'royale', 'championship'].includes(this.metaMode)
    this.onHud = opts.onHud || (() => {})
    this.onFinish = opts.onFinish || (() => {})
    this.onPauseRequest = opts.onPauseRequest || (() => {})
    this.audio = opts.audio
    this.paused = false
    this.phase = 'intro'
    this.time = 0
    this.runningTime = 0
    this.introTime = 0
    this.countdownTime = 0
    this.endTimer = 0
    this.endStarted = false
    this.ended = false
    this.wave = 1
    this.waveTimer = 0
    this.waveCleared = false
    this.score = 0
    this.hudTimer = 0
    this.shake = 0
    this.cinematic = { mode: 'intro', angle: rand(0, Math.PI * 2), target: new THREE.Vector3() }
    this.effects = []
    this.touch = { steer: 0, boost: false, brake: false, drift: false }
    this.keys = new Set()
    this.jumpQueued = false
    this.specialQueued = false
    this.messages = []
    this.raceMaxTime = 300
    this.isRace = this.rules.type === 'circuit'
    this.isSurvival = !!this.rules.waves
    this.isTeam = this.rules.teams === 2
    this.laps = this.rules.laps || 3
    this.shrinkDuration = this.rulesMode === 'royale' ? 55 : this.rulesMode === 'elimination' ? 78 : 65
    this.shrinkActive = !!this.rules.shrink || !!this.trackData.shrink

    // scene / camera
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(62, 1, 0.1, 1500)
    this.camera.position.set(0, 8, 18)
    const w = renderer.domElement.clientWidth || window.innerWidth
    const h = renderer.domElement.clientHeight || window.innerHeight
    this.camera.aspect = w / Math.max(1, h)
    this.camera.updateProjectionMatrix()
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.12

    this.useBloom = this.quality !== 'low'
    if (this.useBloom) {
      this.composer = new EffectComposer(renderer)
      this.renderPass = new RenderPass(this.scene, this.camera)
      this.composer.addPass(this.renderPass)
      this.bloom = new UnrealBloomPass(new THREE.Vector2(w, h), this.quality === 'high' ? 0.95 : 0.72, 0.62, 0.58)
      this.composer.addPass(this.bloom)
      this.composer.addPass(new OutputPass())
    }

    this.track = new Track(this.scene, this.trackData, this.quality)
    this.trackLength = 0
    if (this.track.samples) {
      for (let i = 0; i < this.track.samples.length; i++) {
        const a = this.track.samples[i], b = this.track.samples[(i + 1) % this.track.samples.length]
        this.trackLength += Math.hypot(b.x - a.x, b.z - a.z)
      }
    }
    this.finishOrder = []
    this.shrinkT = 0
    this.trail = new TrailSystem(this.scene)
    this.particles = new Particles(this.scene, this.quality === 'low' ? 500 : 1000)
    this.racers = []

    this.setupRace()
    this.bindInput()
    this.updateCamera(0, true)
    if (this.audio) {
      this.audio.setTheme(this.trackData.music || 'city')
      this.audio.startEngine(this.player.bike.category)
    }
    this.emitHud(true)
  }

  setupRace() {
    const count = this.isRace ? (this.rules.bots || 0) + 1 : (this.rules.bots || 5) + 1
    const starts = this.track.getStartPositions(count)
    const playerBikeId = this.opts.bikeId || this.profile.equipped
    this.playerBikeId = playerBikeId
    const playerBike = BIKE_MAP[playerBikeId] || BIKES[0]
    const playerCustom = getCustom(this.profile, playerBikeId)
    const playerStats = effectiveStats(this.profile, playerBikeId, this.competitive)
    const playerModel = createBikeModel(playerBike, playerCustom, this.profile.rider, {
      player: true, detail: this.quality !== 'low',
    })
    this.scene.add(playerModel.group)

    const playerTeam = this.isTeam ? 0 : this.rules.waves ? 0 : -1
    const playerStart = starts[0]
    const pTeamColor = this.isTeam ? TEAM_COLORS[0] : null
    this.player = new Racer(this, {
      id: 0, name: this.profile.name || 'USER', isPlayer: true,
      bike: playerBike, custom: playerCustom, rider: this.profile.rider,
      team: playerTeam, stats: playerStats, model: playerModel,
      color: pTeamColor?.color || playerCustom.accent,
      trailColor: pTeamColor?.trail || playerCustom.trail,
      x: playerStart.x, z: playerStart.z, heading: this.adjustStartHeading(playerStart, true),
      ai: null,
    })
    this.racers.push(this.player)

    const names = [...BOT_NAMES].sort(() => Math.random() - 0.5)
    const styleKeys = [...BOT_STYLE_KEYS]
    const bikePool = BIKES.filter(b => b.id !== playerBikeId)
    const totalBots = count - 1
    for (let i = 0; i < totalBots; i++) {
      const styleKey = styleKeys[i % styleKeys.length]
      const style = BOT_STYLES[styleKey]
      const bike = this.pickBotBike(bikePool, styleKey, i)
      const custom = {
        ...bike.visual,
        frame: `frame-${bike.visual.frame}`,
        wheels: `wheel-${bike.visual.wheels}`,
        decal: `decal-${bike.visual.decal}`,
        engine: `engine-${bike.visual.engine}`,
        lighting: `light-${bike.visual.lighting}`,
        trailFx: 'trail-ribbon', boost: 'boost-flare', crash: 'crash-shatter',
        trail: bike.visual.trail, accent: bike.visual.accent, primary: bike.visual.primary,
      }
      const team = this.isTeam ? (i % 2 === 0 ? 0 : 1) : this.rules.waves ? 1 : -1
      const teamColor = this.isTeam ? TEAM_COLORS[team] : null
      const baseStats = normalizedStats(bike.stats, 64 + this.difficulty * 1.8)
      const stats = { ...baseStats }
      const diffMult = this.difficultyInfo.mult
      stats.speed = clamp(stats.speed * diffMult, 30, 100)
      stats.accel = clamp(stats.accel * diffMult, 30, 100)
      stats.turnResponse = clamp(stats.turnResponse * (0.94 + this.difficulty * 0.03), 30, 100)
      const rider = {
        suitColor: teamColor?.color || bike.visual.accent,
        helmet: 'helmet-standard', visor: teamColor?.color || bike.visual.accent,
        armor: styleKey === 'aggressive' ? 'armor-plated' : 'armor-light', suitfx: 'suitfx-none',
      }
      const model = createBikeModel(bike, custom, rider, { detail: this.quality !== 'low' })
      this.scene.add(model.group)
      const start = starts[i + 1] || starts[0]
      const racer = new Racer(this, {
        id: i + 1, name: names[i % names.length], isPlayer: false,
        bike, custom, rider, team, stats, model,
        color: teamColor?.color || bike.visual.accent,
        trailColor: teamColor?.trail || bike.visual.trail,
        x: start.x + rand(-1, 1), z: start.z + rand(-1, 1),
        heading: this.adjustStartHeading(start, false),
        ai: {
          styleKey, ...style,
          lineOffset: rand(-0.3, 0.3),
          reaction: lerp(0.22, 0.07, this.difficulty / 3) * rand(0.8, 1.25),
          noise: lerp(0.25, 0.04, this.difficulty / 3),
        },
      })
      this.racers.push(racer)
    }

    // trail lifetime / durability
    for (const r of this.racers) {
      const baseLife = this.rules.trailLife ?? 999
      r.baseTrailLife = baseLife
      r.trailLife = baseLife >= 900 ? 9999 : baseLife * (0.72 + (r.stats?.trailDurability || 60) / 100 * 0.7)
      if (this.isRace) r.trailLife = Math.min(r.trailLife, 7)
    }

    // init race progress
    for (const r of this.racers) {
      const q = this.track.closest(r.x, r.z)
      r.lastT = q.t
      r.tIndex = q.index || 0
      r.raceDist = 0
    }
    this.initialBots = totalBots
    this.playerPlace = 0
    this.playerDeathTime = 0
    this.teamEliminated = false
  }

  pickBotBike(pool, styleKey, i) {
    const catPref = {
      aggressive: ['heavy', 'limited', 'legendary'],
      defensive: ['classic', 'stealth', 'heavy'],
      technical: ['racing', 'prototype', 'classic'],
      reckless: ['speed', 'experimental', 'limited'],
      balanced: ['racing', 'classic', 'experimental'],
    }[styleKey] || ['classic']
    const pref = pool.filter(b => catPref.includes(b.category))
    const arr = pref.length ? pref : pool
    return arr[(i * 7 + Math.floor(Math.random() * arr.length)) % arr.length]
  }

  adjustStartHeading(start, player) {
    if (this.track.type !== 'arena') return start.heading
    const combat = ['elimination', 'royale', 'team', 'survival', 'endless'].includes(this.rulesMode)
    if (combat) {
      const len = Math.hypot(start.x, start.z) || 1
      return Math.atan2(-start.x / len, -start.z / len)
    }
    return start.heading
  }

  // -------------------------------------------------------------------------
  // Input
  // -------------------------------------------------------------------------
  bindInput() {
    this._onKeyDown = (e) => {
      const k = e.key.toLowerCase()
      if (['arrowleft', 'arrowright', 'arrowup', 'arrowdown', ' '].includes(k)) e.preventDefault()
      if (k === 'escape' || k === 'p') { this.onPauseRequest(); return }
      this.keys.add(k)
      if (k === 'j' || k === 'arrowup') this.jumpQueued = true
      if (k === 'e' || k === 'q') this.specialQueued = true
    }
    this._onKeyUp = (e) => { this.keys.delete(e.key.toLowerCase()) }
    this._onBlur = () => { this.keys.clear(); this.touch.steer = 0; this.touch.boost = false; this.touch.brake = false; this.touch.drift = false }
    window.addEventListener('keydown', this._onKeyDown)
    window.addEventListener('keyup', this._onKeyUp)
    window.addEventListener('blur', this._onBlur)
  }

  unbindInput() {
    window.removeEventListener('keydown', this._onKeyDown)
    window.removeEventListener('keyup', this._onKeyUp)
    window.removeEventListener('blur', this._onBlur)
  }

  setSteer(v) { this.touch.steer = clamp(v, -1, 1) }
  setBoost(v) { this.touch.boost = !!v }
  setBrake(v) { this.touch.brake = !!v }
  setDrift(v) { this.touch.drift = !!v }
  requestJump() { if (this.phase === 'running') this.jumpQueued = true }
  requestSpecial() { if (this.phase === 'running') this.specialQueued = true }
  setPaused(v) { this.paused = !!v; if (this.audio) this.audio.updateEngine(0, false) }

  // -------------------------------------------------------------------------
  // Main update
  // -------------------------------------------------------------------------
  update(dt) {
    if (this.paused) return
    dt = clamp(dt, 0, 0.05)
    this.time += dt
    this.trail.now = this.time
    this.track.update(dt)
    this.trail.update(dt, this.time)
    this.particles.update(dt)
    this.updateEffects(dt)
    if (this.audio && this.player) {
      const sp = this.player.alive ? this.player.speed / Math.max(1, this.player.maxSpeed) : 0
      this.audio.updateEngine(clamp(sp, 0, 1), this.player.boosting)
    }

    if (this.phase === 'intro') {
      this.introTime += dt
      this.cinematic.angle += dt * 0.7
      if (this.introTime > 2.0) {
        this.phase = 'countdown'
        this.countdownTime = 0
        this.lastCount = 4
        this.cinematic.angle = this.player.heading + Math.PI * 0.85
      }
    } else if (this.phase === 'countdown') {
      this.countdownTime += dt
      const remaining = Math.ceil(3 - this.countdownTime)
      if (remaining !== this.lastCount) {
        this.lastCount = remaining
        if (remaining > 0) this.audio?.countdown(false)
        else this.audio?.countdown(true)
      }
      if (this.countdownTime >= 3.0) {
        this.phase = 'running'
        this.runningTime = 0
        for (const r of this.racers) {
          r.invuln = this.time + 1.1
          r.lastTrail = { x: r.x, z: r.z }
        }
        this.message('GO', '#4ade80')
        this.audio?.countdown(true)
      }
    } else if (this.phase === 'running') {
      this.runningTime += dt
      this.updateRacers(dt)
      this.updateBikeCollisions(dt)
      this.updateWaves(dt)
      this.updateShrink(dt)
      this.checkEndConditions(dt)
    } else if (this.phase === 'ending') {
      this.endTimer -= dt
      this.cinematic.angle += dt * 0.35
      if (this.endTimer <= 0 && !this.ended) this.finishGame()
    }

    // animate models
    for (const r of this.racers) {
      if (!r.alive) continue
      r.model.update(dt, {
        speed: r.speed, steer: r.steer, boosting: r.boosting,
      })
      r.group.position.set(r.x, r.y, r.z)
      r.group.rotation.y = r.heading
    }
    this.updateCamera(dt)
    this.hudTimer -= dt
    if (this.hudTimer <= 0) this.emitHud()
  }

  updateRacers(dt) {
    for (const r of this.racers) {
      if (!r.alive) {
        if (this.isRace && !r.isPlayer) continue
        continue
      }
      this.updateRacer(r, dt)
    }
  }

  updateRacer(r, dt) {
    if (r.finished) {
      r.speed *= Math.pow(0.1, dt)
      return
    }
    r.invuln = Math.max(r.invuln, 0)
    r.stun = Math.max(0, r.stun - dt)
    r.specialCd = Math.max(0, r.specialCd - dt)
    r.jumpCd = Math.max(0, r.jumpCd - dt)
    r.padCd = Math.max(0, (r.padCd || 0) - dt)

    const isPlayer = r.isPlayer
    let steerInput = 0
    let boostHeld = false
    let brake = false
    let drift = false
    let jump = false
    let special = false

    if (isPlayer) {
      const kl = this.keys.has('arrowleft') || this.keys.has('a')
      const kr = this.keys.has('arrowright') || this.keys.has('d')
      let keySteer = (kr ? 1 : 0) - (kl ? 1 : 0)
      steerInput = clamp(keySteer + this.touch.steer, -1, 1)
      if (this.profile.settings?.invertSteer) steerInput *= -1
      boostHeld = this.keys.has(' ') || this.keys.has('shift') || this.touch.boost
      brake = this.keys.has('arrowdown') || this.keys.has('s') || this.touch.brake
      drift = this.keys.has('x') || this.touch.drift
      jump = this.jumpQueued
      special = this.specialQueued
      this.jumpQueued = false
      this.specialQueued = false
    } else {
      this.updateAI(r, dt)
      steerInput = r.aiSteer
      boostHeld = r.aiBoost
      brake = false
      drift = r.aiDrift
      jump = r.aiJump
      special = r.aiSpecial
      r.aiJump = false
      r.aiSpecial = false
    }

    if (r.stun > 0) { steerInput = 0; boostHeld = false; brake = true }

    // hazards
    let glitch = false
    const hz = this.track.hazardAt(r.x, r.z)
    if (hz && hz.active) {
      if (hz.type === 'glitch') {
        glitch = true
        steerInput *= -1
        r.glitchFx = 0.2
      } else if (hz.type === 'heat') {
        r.hazardTime += dt
        r.speed *= Math.pow(0.55, dt)
        if (r.hazardTime > 2.1) this.crash(r, 'hazard', null)
        if (Math.random() < dt * 14) this.particles.spawn(r.x, 0.4, r.z, '#ff5a1f', 2, 3, 0.4, 0.4)
      } else if (hz.type === 'void') {
        this.crash(r, 'void', null)
        return
      }
    } else {
      r.hazardTime = Math.max(0, r.hazardTime - dt * 2)
    }
    r.glitchFx = Math.max(0, (r.glitchFx || 0) - dt)

    // boost
    const canBoost = boostHeld && r.boost > 0.015 && r.speed > 2 && !r.finished
    if (canBoost) {
      r.boost = Math.max(0, r.boost - dt * 0.36)
      r.boostTime += dt
      r.boosting = true
      if (Math.random() < dt * 26) {
        const back = r.forward()
        this.particles.spawn(r.x - back.x * 1.4, r.y + 0.5, r.z - back.z * 1.4, r.trailColor, 1, 3.5, 0.35, 0.22, 0.3)
      }
    } else {
      r.boosting = false
      r.boost = Math.min(r.boostCap, r.boost + dt * r.boostRecharge)
    }

    // speed
    const grip = this.trackData.grip || 1
    const maxSpeed = r.maxSpeed * (r.boosting ? 1.55 : 1)
    if (!brake) r.speed += r.accel * dt * (r.stun > 0 ? 0 : 1)
    if (brake) r.speed -= r.brakePower * dt
    if (r.boosting) r.speed += 24 * dt
    r.speed -= (0.7 + r.speed * 0.012) * dt
    if (drift && r.speed > 7) {
      r.speed -= dt * 2.6
      r.driftTime += dt
      r.boost = Math.min(r.boostCap, r.boost + dt * 0.055)
      if (Math.random() < dt * 22) {
        const back = r.forward()
        const side = { x: Math.cos(r.heading), z: -Math.sin(r.heading) }
        this.particles.spawn(r.x - back.x * 1.1 + side.x * 0.5, 0.3, r.z - back.z * 1.1 + side.z * 0.5, r.trailColor, 1, 2.5, 0.35, 0.25, 0.2)
      }
    }
    r.speed = clamp(r.speed, 0, maxSpeed)
    r.drifting = drift && r.speed > 7

    // steering
    const steerRate = r.stun > 0 ? 2 : 10
    r.steer = lerp(r.steer, steerInput, Math.min(1, dt * steerRate))
    const speedFactor = 0.32 + 0.68 * clamp(r.speed / 16, 0, 1)
    let turn = r.turnRate * r.handling * speedFactor
    if (r.drifting) turn *= 1.5
    if (r.airborne) turn *= 0.55
    if (grip < 1) turn *= grip
    r.heading += r.steer * turn * dt * (glitch ? 1.25 : 1)

    // jump
    if (jump && !r.airborne && r.jumpCd <= 0 && r.speed > 4) {
      r.vy = 8.2
      r.airborne = true
      r.jumpCd = 1.1
      r.jumps += 1
      this.particles.spawn(r.x, 0.2, r.z, r.trailColor, 10, 4, 0.4, 0.4, 0.5)
      if (r.isPlayer) this.audio?.jump()
    }
    const gravity = 24 * (this.trackData.gravity || 1)
    if (r.airborne) {
      r.vy -= gravity * dt
      r.y += r.vy * dt
      if (r.y <= 0) {
        r.y = 0; r.vy = 0; r.airborne = false
        this.particles.spawn(r.x, 0.15, r.z, r.trailColor, 8, 3.5, 0.35, 0.5, 0.4)
      }
    }

    // special
    if (special && r.specialCd <= 0) this.useSpecial(r)

    // movement
    const fwd = r.forward()
    const nx = r.x + fwd.x * r.speed * dt
    const nz = r.z + fwd.z * r.speed * dt
    const moved = Math.hypot(nx - r.x, nz - r.z)
    r.distance += moved

    // circuit progress before collisions
    if (this.isRace) {
      const q = this.track.closest(nx, nz)
      let d = q.t - r.lastT
      if (d < -0.5) d += 1
      else if (d > 0.5) d -= 1
      if (!r._respawnFlag) {
        r.raceDist += d
        if (r.raceDist > 0 && Math.floor(r.raceDist) > r.lapCount) {
          r.lapCount = Math.floor(r.raceDist)
          if (r.isPlayer) {
            this.message(`LAP ${Math.min(this.laps, r.lapCount + 1)} / ${this.laps}`, this.trackData.palette.accent)
            this.audio?.pickup()
          }
        }
      }
      r._respawnFlag = false
      r.lastT = q.t
      r.tIndex = q.index || 0
    }

    // wall / obstacle / trail collisions
    if (this.isRace) {
      const q = this.track.closest(nx, nz)
      r.offroad = q.dist > this.track.roadHalf - 1.0
      if (q.dist > this.track.roadHalf + 0.8) {
        this.respawnRace(r)
        return
      }
      if (r.offroad) {
        r.speed *= Math.pow(0.25, dt)
        r.wallWarn = 0.6
      } else {
        r.wallWarn = 0
      }
      if (!r.airborne) {
        const seg = this.trail.hit(nx, nz, BIKE_RADIUS * 0.85, r.id, r.team)
        if (seg) {
          this.spinOut(r, seg)
          return
        }
      }
    } else {
      if (!this.track.inside(nx, nz)) {
        this.crash(r, 'wall', null)
        return
      }
      const obs = this.track.hitObstacle(nx, nz, BIKE_RADIUS * 0.8)
      if (obs) {
        this.crash(r, 'obstacle', null)
        return
      }
      if (!r.airborne) {
        const seg = this.trail.hit(nx, nz, BIKE_RADIUS * 0.82, r.id, r.team)
        if (seg) {
          this.crash(r, 'trail', seg.owner)
          return
        }
      }
      const wallDist = this.track.wallDistance(nx, nz)
      if (wallDist < 4) r.wallWarn = 0.5
      else r.wallWarn = 0
    }

    r.x = nx
    r.z = nz

    // trail emission
    const tdx = r.x - r.lastTrail.x, tdz = r.z - r.lastTrail.z
    const tdist = Math.hypot(tdx, tdz)
    if (tdist > TRAIL_STEP) {
      if (!r.finished) this.trail.add(r, r.lastTrail.x, r.lastTrail.z, r.x, r.z)
      r.lastTrail = { x: r.x, z: r.z }
    }

    // boost pad
    if (r.padCd <= 0) {
      const pad = this.track.boostPadAt(r.x, r.z)
      if (pad) {
        r.boost = Math.min(r.boostCap, r.boost + 0.55)
        r.padCd = 1.2
        this.particles.spawn(r.x, 0.5, r.z, this.trackData.palette.accent2, 10, 5, 0.5, 0.6, 0.4)
        if (r.isPlayer) { this.audio?.pickup(); this.message('BOOST CELL +', this.trackData.palette.accent2) }
      }
    }

    // track stats
    if (r.isPlayer) {
      r.score += moved * 0.25
    }

    // race finish
    if (this.isRace && r.raceDist >= this.laps && !r.finished) {
      this.finishRacer(r)
    }
  }

  // -------------------------------------------------------------------------
  // Collisions / crashes
  // -------------------------------------------------------------------------
  spinOut(r, seg) {
    r.speed *= 0.22
    r.stun = Math.max(r.stun, 0.85)
    r.crashes += 1
    r.heading += rand(-0.8, 0.8)
    r.lastTrail = { x: r.x, z: r.z }
    this.particles.spawn(r.x, 0.7, r.z, seg ? seg.owner.trailColor : '#ffffff', 22, 8, 0.6, 0.5)
    this.shake = Math.max(this.shake, r.isPlayer ? 0.5 : 0.2)
    if (r.isPlayer) {
      this.audio?.trailHit()
      this.message('TRAIL IMPACT - SPIN OUT', '#ff7a18')
    }
    if (seg && seg.owner && seg.owner !== r) {
      seg.owner.score += 150
      if (seg.owner.isPlayer) this.message('TRAIL HIT', '#4ade80')
    }
  }

  crash(r, cause, killer) {
    if (!r.alive || r.invuln > this.time || this.phase !== 'running') return
    if (this.isRace) {
      if (cause === 'trail') {
        // handled by spinOut
        return
      }
      this.respawnRace(r)
      return
    }
    this.eliminate(r, cause, killer)
  }

  eliminate(r, cause, killer) {
    if (!r.alive) return
    r.alive = false
    r.speed = 0
    r.eliminatedAt = this.time
    r.place = this.aliveCount() + 1
    r.crashes += 1
    const color = r.trailColor
    this.particles.spawn(r.x, 0.9, r.z, color, 55, 15, 1.1, 0.8, 0.8)
    this.particles.spawn(r.x, 0.9, r.z, '#ffffff', 22, 9, 0.7, 0.6, 0.6)
    this.addRing(r.x, 0.4, r.z, color, 2, 0.7)
    this.shake = Math.max(this.shake, r.isPlayer ? 0.9 : 0.35)
    if (r.isPlayer) {
      this.audio?.explode()
      this.cinematic.mode = 'crash'
      this.cinematic.target.set(r.x, 0.8, r.z)
      this.cinematic.angle = r.heading + Math.PI
      this.playerDeathTime = this.time
      this.playerPlace = this.aliveCount() + 1
    } else {
      this.audio?.crash()
      r.model.group.visible = false
      if (killer && killer.isPlayer) {
        this.message('TAKEDOWN', '#fbbf24')
      }
    }
    if (killer && killer !== r) {
      killer.takedowns += 1
      killer.score += 450
      if (killer.isPlayer) this.audio?.pickup()
    }
    // explosion residue
    setTimeout(() => { if (r.model?.group) r.model.group.visible = false }, 120)
  }

  respawnRace(r) {
    if (!r.alive) return
    r.crashes += 1
    const q = this.track.closest(r.x, r.z)
    const p = this.track.samples[q.index]
    const n = this.track.samples[(q.index + 3) % this.track.samples.length]
    const heading = Math.atan2(n.x - p.x, n.z - p.z)
    r.x = p.x; r.z = p.z; r.heading = heading
    r.speed = 0; r.steer = 0
    r.invuln = this.time + 1.6
    r.lastTrail = { x: p.x, z: p.z }
    r.lastT = this.track.closest(p.x, p.z).t
    r._respawnFlag = true
    r.stun = 0.4
    this.particles.spawn(p.x, 0.7, p.z, r.trailColor, 20, 6, 0.6, 0.5)
    if (r.isPlayer) {
      this.audio?.crash()
      this.message('SYSTEM RESTORE - PENALTY', '#ff3d81')
      this.shake = Math.max(this.shake, 0.5)
    }
  }

  updateBikeCollisions(dt) {
    const rs = this.racers
    for (let i = 0; i < rs.length; i++) {
      const a = rs[i]
      if (!a.alive || a.finished) continue
      for (let j = i + 1; j < rs.length; j++) {
        const b = rs[j]
        if (!b.alive || b.finished) continue
        if (Math.abs(a.y - b.y) > 1.4) continue
        const dx = b.x - a.x, dz = b.z - a.z
        const d = Math.hypot(dx, dz)
        const minD = 1.6
        if (d > minD || d < 0.0001) continue
        const nx = dx / d, nz = dz / d
        const overlap = (minD - d) / 2
        a.x -= nx * overlap; a.z -= nz * overlap
        b.x += nx * overlap; b.z += nz * overlap
        a.speed *= 0.94; b.speed *= 0.94
        const aBoost = a.boosting, bBoost = b.boosting
        const aHeavy = (a.stats?.trailDurability || 60) > (b.stats?.trailDurability || 60)
        const push = 0.6 + (aBoost ? 0.9 : 0) + (bBoost ? 0.9 : 0)
        const ramMode = this.rules.knockback || this.rulesMode === 'royale'
        if (ramMode || aBoost || bBoost) {
          if (aBoost && !bBoost) { b.x += nx * push; b.z += nz * push; b.stun = Math.max(b.stun, 0.35) }
          else if (bBoost && !aBoost) { a.x -= nx * push; a.z -= nz * push; a.stun = Math.max(a.stun, 0.35) }
          else {
            if (aHeavy) { b.x += nx * push; b.z += nz * push }
            else if (!aHeavy) { a.x -= nx * push; a.z -= nz * push }
          }
        }
        this.particles.spawn((a.x + b.x) / 2, 0.8, (a.z + b.z) / 2, '#ffffff', 7, 5, 0.4, 0.3)
        if (a.isPlayer || b.isPlayer) this.shake = Math.max(this.shake, 0.18)
        // ring-out check in arena
        if (!this.isRace && (ramMode || aBoost || bBoost)) {
          for (const [r, other] of [[a, b], [b, a]]) {
            if (!this.track.inside(r.x, r.z)) this.eliminate(r, 'ram', other)
          }
        }
      }
    }
  }

  useSpecial(r) {
    if (!r.alive || r.specialCd > 0) return
    r.specialCd = 11
    const color = r.trailColor
    this.addRing(r.x, 0.5, r.z, color, 16, 0.85)
    this.particles.spawn(r.x, 0.8, r.z, color, 40, 16, 0.8, 0.8, 0.6)
    if (r.isPlayer) {
      this.audio?.boost()
      this.shake = Math.max(this.shake, 0.7)
      this.message('PULSE EMITTED', '#a855f7')
    } else {
      this.audio?.tone?.(260, 0.3, 'sawtooth', 0.06, -100)
    }
    for (const o of this.racers) {
      if (o === r || !o.alive || o.finished) continue
      if (r.team >= 0 && o.team === r.team) continue
      const d = Math.hypot(o.x - r.x, o.z - r.z)
      if (d < 16) {
        const nx = (o.x - r.x) / (d || 1), nz = (o.z - r.z) / (d || 1)
        o.x += nx * 4.2
        o.z += nz * 4.2
        o.speed *= 0.45
        o.stun = Math.max(o.stun, 1.0)
        o.boost = Math.max(0, o.boost - 0.5)
        o.lastTrail = { x: o.x, z: o.z }
        this.particles.spawn(o.x, 0.6, o.z, color, 12, 7, 0.5, 0.5)
        if (!this.track.inside(o.x, o.z)) this.eliminate(o, 'pulse', r)
      }
    }
  }

  addRing(x, y, z, color, radius = 4, life = 0.8) {
    const geo = new THREE.RingGeometry(0.85, 1, 48)
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.rotation.x = -Math.PI / 2
    mesh.position.set(x, y, z)
    this.scene.add(mesh)
    this.effects.push({ mesh, life, maxLife: life, radius, type: 'ring' })
  }

  updateEffects(dt) {
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const e = this.effects[i]
      e.life -= dt
      const f = 1 - e.life / e.maxLife
      if (e.type === 'ring') {
        const s = 0.5 + f * e.radius
        e.mesh.scale.set(s, s, s)
        e.mesh.material.opacity = Math.max(0, 0.85 * (1 - f))
      }
      if (e.life <= 0) {
        this.scene.remove(e.mesh)
        e.mesh.geometry.dispose(); e.mesh.material.dispose()
        this.effects.splice(i, 1)
      }
    }
  }

  // -------------------------------------------------------------------------
  // AI
  // -------------------------------------------------------------------------
  updateAI(r, dt) {
    r.aiTimer -= dt
    if (r.aiTimer > 0) return
    const ai = r.ai
    r.aiTimer = ai.reaction * rand(0.85, 1.25)
    const desired = this.aiDesired(r)
    const offsets = [0, 0.22, -0.22, 0.5, -0.5, 0.85, -0.85, 1.2, -1.2, 1.65, -1.65]
    let bestScore = -Infinity
    let bestHeading = r.heading
    let bestClear = 0
    for (const off of offsets) {
      const h = r.heading + off
      const dx = Math.sin(h), dz = Math.cos(h)
      let score = (dx * desired.x + dz * desired.z) * 2.6
      let clear = 40
      for (const d of [4, 8, 14, 21, 30, 40]) {
        const x = r.x + dx * d, z = r.z + dz * d
        if (!this.track.inside(x, z)) { score -= (46 - d) * 1.7; clear = Math.min(clear, d); break }
        if (this.track.hitObstacle(x, z, 0.9)) { score -= 80; clear = Math.min(clear, d); break }
        const seg = this.trail.hit(x, z, 1.0, r.id, r.team)
        if (seg) { score -= (38 - d) * 2.1; clear = Math.min(clear, d); break }
        const hz = this.track.hazardAt(x, z)
        if (hz && hz.active && (hz.type === 'heat' || hz.type === 'void')) score -= 22
      }
      if (clear > 20) score += 1.2
      score += (Math.random() - 0.5) * ai.noise * 9
      if (score > bestScore) { bestScore = score; bestHeading = h; bestClear = clear }
    }
    // occasional bad decision for lower difficulty
    if (Math.random() > ai.precision) {
      bestHeading = r.heading + rand(-0.8, 0.8)
    }
    const diff = wrapAngle(bestHeading - r.heading)
    r.aiSteer = clamp(diff * 2.6, -1, 1)
    r.aiDrift = Math.abs(r.aiSteer) > 0.5 && r.speed > 13
    r.aiBoost = bestClear > 18 && r.boost > 0.35 && Math.random() < ai.boostLove * 0.7
    // jump over a trail directly ahead
    if (!r.airborne && r.jumpCd <= 0 && r.speed > 15) {
      const fx = Math.sin(r.heading), fz = Math.cos(r.heading)
      if (this.trail.hit(r.x + fx * 5, r.z + fz * 5, 1.1, r.id, r.team) && Math.random() < 0.55) r.aiJump = true
    }
    // special
    if (r.specialCd <= 0 && Math.random() < 0.35) {
      const target = this.nearestEnemy(r, 11)
      if (target) r.aiSpecial = true
    }
  }

  aiDesired(r) {
    if (this.isRace) {
      const N = this.track.samples.length
      const look = (11 + r.speed * 0.45) / Math.max(1, this.trackLength) * N
      const idx = (r.tIndex + Math.round(look)) % N
      const p = this.track.samples[idx]
      const n = this.track.samples[(idx + 2) % N]
      const heading = Math.atan2(n.x - p.x, n.z - p.z)
      const nx = Math.cos(heading), nz = -Math.sin(heading)
      const wobble = Math.sin(this.time * 0.4 + r.id * 1.7) * 1.5
      const off = r.ai.lineOffset * this.track.width * 0.7 + wobble
      const tx = p.x + nx * off, tz = p.z + nz * off
      const dx = tx - r.x, dz = tz - r.z
      const len = Math.hypot(dx, dz) || 1
      return { x: dx / len, z: dz / len }
    }
    const enemy = this.nearestEnemy(r, 999)
    const ai = r.ai
    let tx = 0, tz = 0
    if (enemy) {
      const d = Math.hypot(enemy.x - r.x, enemy.z - r.z)
      if (ai.aggression > 0.55 && d < 55) {
        const lead = 2 + ai.aggression * 6
        tx = enemy.x + Math.sin(enemy.heading) * lead
        tz = enemy.z + Math.cos(enemy.heading) * lead
      } else {
        const cx = r.x, cz = r.z
        const len = Math.hypot(cx, cz) || 1
        const tangent = { x: -cz / len, z: cx / len }
        const radial = { x: cx / len, z: cz / len }
        const sign = (r.id % 2 ? 1 : -1)
        tx = cx + tangent.x * sign * 16 - radial.x * 4
        tz = cz + tangent.z * sign * 16 - radial.z * 4
      }
    } else {
      const len = Math.hypot(r.x, r.z) || 1
      tx = r.x - r.z / len * 18
      tz = r.z + r.x / len * 18
    }
    // don't aim into an obstacle
    if (this.track.hitObstacle(tx, tz, 2)) {
      const len = Math.hypot(r.x, r.z) || 1
      tx = -r.z / len * 12
      tz = r.x / len * 12
    }
    const dx = tx - r.x, dz = tz - r.z
    const len = Math.hypot(dx, dz) || 1
    return { x: dx / len, z: dz / len }
  }

  nearestEnemy(r, maxDist = 999) {
    let best = null, bd = maxDist
    for (const o of this.racers) {
      if (o === r || !o.alive || o.finished) continue
      if (r.team >= 0 && o.team === r.team) continue
      const d = Math.hypot(o.x - r.x, o.z - r.z)
      if (d < bd) { bd = d; best = o }
    }
    return best
  }

  // -------------------------------------------------------------------------
  // Waves / shrink / end conditions
  // -------------------------------------------------------------------------
  updateWaves(dt) {
    if (!this.isSurvival) return
    const botsAlive = this.racers.filter(r => !r.isPlayer && r.alive).length
    if (botsAlive === 0 && !this.waveCleared) {
      this.waveCleared = true
      this.waveTimer = 2.6
      this.score += this.wave * 600
      this.player.boost = this.player.boostCap
      this.message(`WAVE ${this.wave} CLEARED  +${this.wave * 600}`, '#4ade80')
      this.audio?.levelUp()
      this.addRing(this.player.x, 0.4, this.player.z, '#4ade80', 8, 0.9)
    }
    if (this.waveCleared) {
      this.waveTimer -= dt
      if (this.waveTimer <= 0) {
        this.wave += 1
        this.waveCleared = false
        this.spawnWave()
        this.message(`WAVE ${this.wave}`, '#ff7a18')
        this.audio?.countdown(false)
        this.score += 400
      }
    }
  }

  spawnWave() {
    const n = Math.min(6, 1 + Math.ceil(this.wave / 1.4))
    const starts = this.track.getStartPositions(n + 1).slice(1)
    for (let i = 0; i < n; i++) {
      const start = starts[i] || starts[0]
      this.spawnBot(start, 1, this.wave)
    }
  }

  spawnBot(start, team, wave = 1) {
    const styleKey = BOT_STYLE_KEYS[Math.floor(Math.random() * BOT_STYLE_KEYS.length)]
    const style = BOT_STYLES[styleKey]
    const bike = BIKES[Math.floor(Math.random() * BIKES.length)]
    const custom = {
      ...bike.visual,
      frame: `frame-${bike.visual.frame}`, wheels: `wheel-${bike.visual.wheels}`,
      decal: `decal-${bike.visual.decal}`, engine: `engine-${bike.visual.engine}`,
      lighting: `light-${bike.visual.lighting}`, trailFx: 'trail-ribbon',
      boost: 'boost-flare', crash: 'crash-shatter',
    }
    const stats = normalizedStats(bike.stats, 64 + this.difficulty * 1.8 + wave * 0.7)
    stats.speed = clamp(stats.speed * this.difficultyInfo.mult, 30, 100)
    stats.accel = clamp(stats.accel * this.difficultyInfo.mult, 30, 100)
    const teamColor = this.isTeam ? TEAM_COLORS[team] : null
    const rider = {
      suitColor: teamColor?.color || bike.visual.accent,
      helmet: 'helmet-standard', visor: teamColor?.color || bike.visual.accent,
      armor: 'armor-light', suitfx: 'suitfx-none',
    }
    const model = createBikeModel(bike, custom, rider, { detail: this.quality !== 'low' })
    this.scene.add(model.group)
    const racer = new Racer(this, {
      id: this.racers.length, name: BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)],
      isPlayer: false, bike, custom, rider, team, stats, model,
      color: teamColor?.color || bike.visual.accent,
      trailColor: teamColor?.trail || bike.visual.trail,
      x: start.x, z: start.z, heading: this.adjustStartHeading(start, false),
      ai: {
        styleKey, ...style, lineOffset: rand(-0.3, 0.3),
        reaction: lerp(0.22, 0.07, this.difficulty / 3) * rand(0.8, 1.25),
        noise: lerp(0.25, 0.04, this.difficulty / 3),
      },
    })
    racer.trailLife = this.rules.trailLife >= 900 ? 9999 : (this.rules.trailLife || 10) * 1.1
    racer.baseTrailLife = racer.trailLife
    const q = this.track.closest(start.x, start.z)
    racer.lastT = q.t; racer.tIndex = q.index || 0
    this.racers.push(racer)
  }

  updateShrink(dt) {
    if (!this.shrinkActive) return
    this.shrinkT = (this.shrinkT || 0) + dt
    const scale = clamp(1 - (this.shrinkT / this.shrinkDuration) * 0.48, 0.5, 1)
    this.track.setShrink(scale)
    if (Math.floor(this.shrinkT * 2) !== this.lastShrinkWarn && scale < 0.85) {
      this.lastShrinkWarn = Math.floor(this.shrinkT * 2)
      if (this.player.alive) this.message('ARENA COLLAPSING', '#ff3d81')
    }
    for (const r of this.racers) {
      if (!r.alive || r.finished) continue
      if (!this.track.inside(r.x, r.z)) this.eliminate(r, 'collapse', null)
    }
  }

  aliveCount() { return this.racers.filter(r => r.alive && !r.finished).length }

  checkEndConditions() {
    if (this.endStarted || this.phase !== 'running') return
    if (this.isRace) {
      if (this.player.finished) {
        this.beginEnd(this.playerPlace === 1)
        return
      }
      if (this.runningTime > this.raceMaxTime) {
        this.beginEnd(false)
        return
      }
      return
    }
    if (this.isSurvival) {
      if (!this.player.alive) this.beginEnd(this.wave >= 10)
      return
    }
    if (this.isTeam) {
      const t0 = this.racers.filter(r => r.alive && r.team === 0).length
      const t1 = this.racers.filter(r => r.alive && r.team === 1).length
      if (t0 === 0 || t1 === 0) this.beginEnd(t0 > 0)
      return
    }
    const alive = this.aliveCount()
    if (alive <= 1) {
      this.beginEnd(this.player.alive)
    } else if (!this.player.alive) {
      this.beginEnd(false)
    }
  }

  beginEnd(win) {
    if (this.endStarted) return
    this.endStarted = true
    this.win = win
    this.phase = 'ending'
    this.endTimer = win ? 2.8 : 2.4
    this.cinematic.mode = win ? 'victory' : 'crash'
    this.cinematic.angle = this.player.heading + Math.PI * 0.8
    if (win) {
      this.cinematic.target.set(this.player.x, 1, this.player.z)
      this.audio?.win()
      this.message('VICTORY', '#fbbf24')
    } else {
      const target = this.player.alive ? this.player : null
      if (target) this.cinematic.target.set(target.x, 1, target.z)
      else if (!this.player.alive) this.cinematic.target.set(this.player.x, 1, this.player.z)
      this.audio?.lose()
      this.message('RUN TERMINATED', '#ff3d81')
    }
  }

  finishRacer(r) {
    if (r.finished) return
    r.finished = true
    r.finishTime = this.runningTime
    r.place = (this.finishOrder?.length || 0) + 1
    if (!this.finishOrder) this.finishOrder = []
    this.finishOrder.push(r)
    r.speed = 0
    r.boosting = false
    if (r.isPlayer) {
      this.playerPlace = r.place
      this.player.score += Math.max(0, 1000 - this.runningTime * 4)
      this.message(`FINISH  P${r.place}`, r.place === 1 ? '#fbbf24' : '#38bdf8')
      this.audio?.win()
      this.beginEnd(r.place === 1)
      if (this.rulesMode === 'timetrial') this.endTimer = 2.2
    }
  }

  finishGame() {
    if (this.ended) return
    this.ended = true
    this.phase = 'done'
    if (this.audio) this.audio.stopEngine()
    let place = this.playerPlace || 0
    if (!place) {
      if (this.isRace) {
        const sorted = this.racers.slice().sort((a, b) => {
          if (a.finished && b.finished) return a.finishTime - b.finishTime
          if (a.finished) return -1
          if (b.finished) return 1
          return b.raceDist - a.raceDist
        })
        place = sorted.indexOf(this.player) + 1
      } else if (this.isTeam) {
        const t0 = this.racers.filter(r => r.alive && r.team === 0).length
        place = t0 > 0 ? 1 : 2
      } else if (this.isSurvival) {
        place = 1
      } else {
        place = this.player.alive ? 1 : (this.playerPlace || this.aliveCount() + 1)
      }
    }
    const standings = this.racers.slice().sort((a, b) => {
      if (a.isPlayer) return -1
      if (b.isPlayer) return 1
      if (a.alive !== b.alive) return a.alive ? -1 : 1
      if (a.finished && b.finished) return a.finishTime - b.finishTime
      return (b.score || 0) - (a.score || 0)
    }).map((r, i) => ({
      name: r.name, isPlayer: r.isPlayer, alive: r.alive, place: r.place || i + 1,
      team: r.team, score: Math.round(r.score), bike: r.bike.name,
    }))
    const win = this.win ?? (place === 1)
    const result = {
      mode: this.metaMode,
      rulesMode: this.rulesMode,
      trackId: this.trackData.id,
      trackName: this.trackData.name,
      place,
      win,
      duration: this.runningTime,
      distance: this.player.distance,
      boostTime: this.player.boostTime,
      driftTime: this.player.driftTime,
      jumps: this.player.jumps,
      takedowns: this.player.takedowns,
      crashes: this.player.crashes,
      bestWave: this.wave,
      score: Math.round(this.player.score + this.score),
      lapTime: this.runningTime,
      laps: this.isRace ? Math.min(this.laps, Math.floor(this.player.raceDist)) : 0,
      standings,
      difficulty: this.difficulty,
      difficultyMult: this.difficultyInfo.reward,
      championship: this.championship,
      eventMode: this.rulesMode,
      totalRacers: this.racers.length,
    }
    this.result = result
    this.onFinish(result)
  }

  // -------------------------------------------------------------------------
  // Camera / HUD
  // -------------------------------------------------------------------------
  updateCamera(dt, instant = false) {
    this.shake = Math.max(0, this.shake - dt * 1.8)
    const shakeOn = this.profile?.settings?.cameraShake !== false
    const p = this.player
    let camTarget = null
    let lookAt = null
    let radius = 9, height = 3.6
    if (this.phase === 'intro' || this.phase === 'countdown') {
      this.cinematic.angle += dt * 0.22
      const a = this.cinematic.angle
      camTarget = new THREE.Vector3(p.x + Math.cos(a) * 9.5, 3.4 + Math.sin(this.time * 0.7) * 0.5, p.z + Math.sin(a) * 9.5)
      lookAt = new THREE.Vector3(p.x, 1.0, p.z)
    } else if (this.phase === 'ending') {
      this.cinematic.angle += dt * 0.3
      const t = this.cinematic.target
      const a = this.cinematic.angle
      camTarget = new THREE.Vector3(t.x + Math.cos(a) * 9, 3.8 + Math.sin(a * 0.7) * 0.8, t.z + Math.sin(a) * 9)
      lookAt = new THREE.Vector3(t.x, 1.1, t.z)
    } else if (p.alive) {
      const fwd = p.forward()
      const speed01 = clamp(p.speed / Math.max(1, p.maxSpeed), 0, 1.2)
      const back = 8.2 + speed01 * 2.8 + (p.boosting ? 1.8 : 0)
      const target = new THREE.Vector3(
        p.x - fwd.x * back,
        3.6 + speed01 * 1.2 + p.y * 0.6,
        p.z - fwd.z * back
      )
      // slight lateral offset for drifting
      const side = { x: Math.cos(p.heading), z: -Math.sin(p.heading) }
      target.x += side.x * p.steer * 1.2
      target.z += side.z * p.steer * 1.2
      camTarget = target
      lookAt = new THREE.Vector3(
        p.x + fwd.x * (5 + speed01 * 7),
        1.25 + p.y * 0.5,
        p.z + fwd.z * (5 + speed01 * 7)
      )
      this.cinematic.angle = p.heading + Math.PI
    } else {
      // spectate teammate or crash site
      const mate = this.isTeam ? this.racers.find(r => r.alive && r.team === p.team && r !== p) : null
      if (mate) {
        const fwd = mate.forward()
        camTarget = new THREE.Vector3(mate.x - fwd.x * 9, 4, mate.z - fwd.z * 9)
        lookAt = new THREE.Vector3(mate.x + fwd.x * 4, 1.2, mate.z + fwd.z * 4)
      } else {
        this.cinematic.angle += dt * 0.5
        const a = this.cinematic.angle
        const t = this.cinematic.target.lengthSq() ? this.cinematic.target : new THREE.Vector3(p.x, 0.8, p.z)
        camTarget = new THREE.Vector3(t.x + Math.cos(a) * 10, 4.2, t.z + Math.sin(a) * 10)
        lookAt = new THREE.Vector3(t.x, 1.0, t.z)
      }
    }
    if (instant) {
      this.camera.position.copy(camTarget)
      this.lookTarget = lookAt.clone()
    } else {
      const smooth = 1 - Math.exp(-dt * 6.5)
      this.camera.position.lerp(camTarget, smooth)
      if (!this.lookTarget) this.lookTarget = lookAt.clone()
      else this.lookTarget.lerp(lookAt, 1 - Math.exp(-dt * 9))
    }
    if (this.shake > 0.01 && shakeOn) {
      this.camera.position.x += rand(-1, 1) * this.shake * 0.5
      this.camera.position.y += rand(-1, 1) * this.shake * 0.35
      this.camera.position.z += rand(-1, 1) * this.shake * 0.5
    }
    this.camera.lookAt(this.lookTarget)
    const speed01 = clamp(p.speed / Math.max(1, p.maxSpeed), 0, 1.3)
    const targetFov = 62 + speed01 * 7 + (p.boosting ? 9 : 0)
    this.camera.fov += (targetFov - this.camera.fov) * Math.min(1, dt * 5)
    this.camera.updateProjectionMatrix()
    if (this.renderer) this.renderer.toneMappingExposure = 1.08 + (p.boosting ? 0.12 : 0)
  }

  emitHud(force = false) {
    if (!force && this.hudTimer > 0) return
    this.hudTimer = 0.09
    const p = this.player
    const sorted = this.racers.slice().sort((a, b) => {
      if (a.finished && b.finished) return a.finishTime - b.finishTime
      if (a.finished) return -1
      if (b.finished) return 1
      if (this.isRace) return b.raceDist - a.raceDist
      if (a.alive !== b.alive) return a.alive ? -1 : 1
      return b.score - a.score
    })
    const rank = sorted.indexOf(p) + 1
    const team0 = this.racers.filter(r => r.alive && r.team === 0).length
    const team1 = this.racers.filter(r => r.alive && r.team === 1).length
    const alive = this.racers.filter(r => r.alive).length
    let objective = ''
    if (this.rulesMode === 'classic') objective = 'BE THE LAST LIGHT CYCLE'
    else if (this.rulesMode === 'grandprix') objective = `LAP ${Math.min(this.laps, Math.floor(p.raceDist) + 1)} / ${this.laps}`
    else if (this.rulesMode === 'timetrial') objective = `LAP ${Math.min(this.laps, Math.floor(p.raceDist) + 1)} / ${this.laps}  •  BEAT THE CLOCK`
    else if (this.isSurvival) objective = `SURVIVE WAVE ${this.wave}`
    else if (this.rulesMode === 'elimination') objective = 'KNOCK RIVALS OUT OF THE ARENA'
    else if (this.rulesMode === 'team') objective = `ELIMINATE TEAM ORANGE  •  ${team0} vs ${team1}`
    else if (this.rulesMode === 'royale') objective = 'LAST RIDER IN THE COLLAPSING ARENA'
    else if (this.metaMode === 'championship') objective = 'CHAMPIONSHIP EVENT'
    const countdown = this.phase === 'countdown' ? Math.max(0, Math.ceil(3 - this.countdownTime)) : 0
    const hazard = this.track.hazardAt(p.x, p.z)
    const state = {
      phase: this.phase,
      paused: this.paused,
      mode: this.metaMode,
      rulesMode: this.rulesMode,
      modeName: MODES[this.metaMode]?.name || this.rules.name,
      trackName: this.trackData.name,
      speed: Math.round(p.speed * 4.4),
      speedPct: clamp(p.speed / Math.max(1, p.maxSpeed * 1.55), 0, 1),
      boost: clamp(p.boost / Math.max(0.01, p.boostCap), 0, 1),
      boostActive: p.boosting,
      drifting: p.drifting,
      airborne: p.airborne,
      special: 1 - clamp(p.specialCd / 11, 0, 1),
      specialReady: p.specialCd <= 0,
      position: rank,
      total: this.racers.filter(r => r.alive || r.isPlayer).length || this.racers.length,
      alive,
      team0, team1,
      lap: this.isRace ? Math.min(this.laps, Math.floor(p.raceDist) + 1) : 0,
      laps: this.laps,
      lapProgress: this.isRace ? clamp(p.raceDist - Math.floor(p.raceDist), 0, 1) : 0,
      time: this.runningTime,
      score: Math.round(p.score + this.score),
      wave: this.wave,
      playerAlive: p.alive,
      countdown,
      objective,
      warning: p.wallWarn > 0,
      hazard: hazard ? hazard.type : null,
      message: this.currentMessage && this.currentMessage.until > this.time ? this.currentMessage : null,
      standings: sorted.slice(0, 6).map((r, i) => ({
        name: r.name, place: i + 1, isPlayer: r.isPlayer, alive: r.alive,
        team: r.team, finished: r.finished, score: Math.round(r.score),
      })),
      racers: this.racers.map(r => ({
        x: r.x, z: r.z, heading: r.heading, isPlayer: r.isPlayer, alive: r.alive,
        color: r.trailColor, team: r.team, finished: r.finished,
      })),
      minimap: this.minimapData || (this.minimapData = this.track.getMinimap()),
      trackId: this.trackData.id,
      trackType: this.trackData.type,
      shrink: this.track.shrinkScale,
      quality: this.quality,
    }
    this.onHud(state)
  }

  message(text, color = '#00e5ff') {
    this.currentMessage = { text, color, until: this.time + 2.4 }
  }

  setSize(w, h) {
    this.camera.aspect = w / Math.max(1, h)
    this.camera.updateProjectionMatrix()
    if (this.composer) {
      this.composer.setSize(w, h)
      if (this.bloom) this.bloom.setSize(w, h)
    }
  }

  render() {
    if (this.paused) {
      // keep the last frame; menu overlay handles pause
    }
    if (this.composer) this.composer.render()
    else this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.unbindInput()
    this.audio?.stopEngine()
    for (const r of this.racers) {
      if (r.model?.group) {
        this.scene.remove(r.model.group)
        r.model.group.traverse(o => {
          if (o.geometry) o.geometry.dispose()
          if (o.material) {
            if (Array.isArray(o.material)) o.material.forEach(m => m.dispose())
            else o.material.dispose()
          }
        })
      }
    }
    for (const e of this.effects) {
      this.scene.remove(e.mesh)
      e.mesh.geometry.dispose(); e.mesh.material.dispose()
    }
    this.effects = []
    this.trail.dispose(this.scene)
    this.particles.dispose(this.scene)
    this.track.dispose()
    if (this.composer) {
      this.composer.dispose?.()
    }
    this.scene.clear()
  }
}



