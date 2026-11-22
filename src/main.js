// TRON: NEON OVERDRIVE - application controller
import * as THREE from 'three'
import {
  MODES, TRACKS, TRACK_MAP, BIKES, BIKE_MAP, DIFFICULTIES, CHAMPIONSHIP_EVENTS,
  RARITIES, COSMETIC_MAP,
} from './data.js'
import {
  loadProfile, saveProfile, resetProfile, refreshChallenges, checkAchievements,
  applyResults, purchaseBike, equipBike, unlockTrack, isTrackUnlocked,
  bikeUnlockStatus, buyUpgrade, buyCosmetic, setCustom, getCustom,
  claimChallenge, trackUnlockStatus,
} from './save.js'
import { audio } from './audio.js'
import { createPreviewScene } from './bike.js'
import { Game } from './game.js'
import {
  screenMenu, screenModes, screenTracks, screenGarage, screenCollection,
  screenShowroom, screenProfile, screenChallenges, screenChampionship,
  screenSettings, screenHowTo, screenResults, screenPause,
} from './ui.js'

const $ = (id) => document.getElementById(id)
const canvas = $('scene')
const ui = $('ui')
const hud = $('hud')
const bootEl = $('boot')
const bootBar = $('boot-progress')
const bootStatus = $('boot-status')
const bootEnter = $('boot-enter')
const toastStack = $('toast-stack')

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const pct = (n) => `${Math.round(clamp(n, 0, 1) * 100)}%`
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const money = (n) => `${Math.floor(n).toLocaleString()} cr`

const state = {
  profile: loadProfile(),
  booted: false,
  screen: 'menu',
  selectedMode: 'classic',
  selectedTrack: 'neon-grid-city',
  difficulty: 2,
  garageBike: 'gridrunner',
  garageTab: 'visual',
  collectionBike: 'gridrunner',
  collectionCategory: 'all',
  collectionOwnedOnly: false,
  showroomBike: 'tron-legacy',
  settingsBack: null,
  game: null,
  lastResult: null,
  lastGameConfig: null,
  paused: false,
}

// ---------------------------------------------------------------------------
// Renderer + preview stage
// ---------------------------------------------------------------------------
let renderer = null
try {
  renderer = new THREE.WebGLRenderer({
    canvas, antialias: window.devicePixelRatio <= 1.25, alpha: true, powerPreference: 'high-performance',
    stencil: false,
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(window.innerWidth, window.innerHeight, false)
  renderer.setClearColor(0x000000, 0)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.18
} catch (err) {
  console.error('WebGL unavailable', err)
  bootStatus.textContent = 'WEBGL UNAVAILABLE - THIS DEVICE CANNOT ENTER THE GRID'
  bootStatus.style.color = '#ff3d81'
}

class PreviewStage {
  constructor(renderer) {
    this.renderer = renderer
    this.scene = null
    this.camera = null
    this.model = null
    this.disc = null
    this.ring = null
    this.key = ''
    this.rotation = -0.4
    this.dragging = false
    this.offsetX = 0
    this.w = window.innerWidth
    this.h = window.innerHeight
  }

  set(bike, custom, rider, mode = 'menu', detail = true) {
    const key = [bike.id, JSON.stringify(custom), JSON.stringify(rider), mode, detail].join('|')
    if (key === this.key) return
    this.disposeScene()
    const p = createPreviewScene(bike, custom, rider, { detail, player: true })
    this.scene = p.scene
    this.camera = p.camera
    this.model = p.model
    this.disc = p.disc
    this.ring = p.ring
    this.key = key
    this.offsetX = mode === 'menu' ? 2.15 : mode === 'garage' ? 0.35 : 0
    this.model.group.position.x = this.offsetX
    if (this.disc) this.disc.position.x = this.offsetX
    if (this.ring) this.ring.position.x = this.offsetX
    this.baseRotation = mode === 'menu' ? -0.55 : mode === 'garage' ? -0.35 : -0.18
    this.rotation = this.baseRotation
    this.model.group.rotation.y = this.rotation
    const cam = this.camera
    cam.fov = 30
    const dist = mode === 'garage' ? 10.2 : mode === 'showroom' ? 11.4 : 11.2
    cam.position.set(0, mode === 'showroom' ? 2.75 : 2.55, dist)
    cam.lookAt(this.offsetX * 0.38, 0.92, 0)
    cam.aspect = this.w / Math.max(1, this.h)
    cam.updateProjectionMatrix()
  }

  resize(w, h) {
    this.w = w
    this.h = h
    if (this.camera) {
      this.camera.aspect = w / Math.max(1, h)
      this.camera.updateProjectionMatrix()
    }
  }

  rotateBy(amount) {
    this.rotation += amount
    if (this.model) this.model.group.rotation.y = this.rotation
  }

  update(dt) {
    if (!this.scene || !this.model) return
    if (!this.dragging) this.rotation += dt * 0.22
    this.model.group.rotation.y = this.rotation
    const t = performance.now() * 0.001
    this.model.update(dt, { speed: 0.45, steer: Math.sin(t * 0.8) * 0.07, boosting: false })
    if (this.ring) this.ring.rotation.z += dt * 0.45
  }

  render() {
    if (!this.scene || !this.camera || !this.renderer) return
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.toneMappingExposure = 1.18
    this.renderer.render(this.scene, this.camera)
  }

  disposeScene() {
    if (!this.scene) return
    const mats = new Set()
    const geos = new Set()
    this.scene.traverse(o => {
      if (o.geometry) geos.add(o.geometry)
      if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => mats.add(m))
    })
    geos.forEach(g => { try { g.dispose() } catch {} })
    mats.forEach(m => {
      try { if (m.map) m.map.dispose() } catch {}
      try { m.dispose() } catch {}
    })
    this.scene = null
    this.camera = null
    this.model = null
    this.disc = null
    this.ring = null
    this.key = ''
  }
}

const preview = renderer ? new PreviewStage(renderer) : null

function resolveQuality() {
  const q = state.profile.settings.quality
  if (q && q !== 'auto') return q
  const coarse = window.matchMedia?.('(pointer: coarse)').matches
  const small = window.innerWidth < 900
  const weak = (navigator.hardwareConcurrency || 4) <= 4
  if (coarse || small || weak) return 'medium'
  return 'high'
}

function applyPixelRatio() {
  if (!renderer) return
  const q = resolveQuality()
  const max = q === 'low' ? 1 : q === 'medium' ? 1.25 : 1.5
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, max))
}

// ---------------------------------------------------------------------------
// Toasts / audio helpers
// ---------------------------------------------------------------------------
function toast(text, kind = '', ms = 2800) {
  if (!toastStack) return
  const el = document.createElement('div')
  el.className = `toast ${kind}`
  el.textContent = text
  toastStack.appendChild(el)
  setTimeout(() => {
    el.style.transition = 'opacity .3s, transform .3s'
    el.style.opacity = '0'
    el.style.transform = 'translateX(20px)'
    setTimeout(() => el.remove(), 320)
  }, ms)
}

function uiSound(fn) {
  if (!state.booted) return
  try { audio[fn]?.() } catch {}
}

// ---------------------------------------------------------------------------
// Preview selection
// ---------------------------------------------------------------------------
function updatePreviewForScreen() {
  if (!preview) return
  let bikeId = state.profile.equipped
  let mode = 'menu'
  if (state.screen === 'garage') { bikeId = state.garageBike; mode = 'garage' }
  else if (state.screen === 'showroom') { bikeId = state.showroomBike; mode = 'showroom' }
  else if (state.screen === 'menu' || state.screen === 'results') { bikeId = state.profile.equipped; mode = 'menu' }
  else { bikeId = state.profile.equipped; mode = 'menu' }
  const bike = BIKE_MAP[bikeId] || BIKES[0]
  const custom = getCustom(state.profile, bike.id)
  preview.set(bike, custom, state.profile.rider, mode, resolveQuality() !== 'low')
}

// ---------------------------------------------------------------------------
// Screens
// ---------------------------------------------------------------------------
const screenMap = {
  menu: screenMenu,
  modes: screenModes,
  tracks: screenTracks,
  garage: screenGarage,
  collection: screenCollection,
  showroom: screenShowroom,
  profile: screenProfile,
  challenges: screenChallenges,
  championship: screenChampionship,
  settings: screenSettings,
  howto: screenHowTo,
  results: screenResults,
  pause: screenPause,
}

function renderUI() {
  if (!ui) return
  if (state.screen === 'game') {
    ui.innerHTML = ''
    hud.classList.remove('hidden')
    updateTouchVisibility()
    return
  }
  const prevScreen = ui.dataset.screen
  const prevScroll = prevScreen === state.screen ? (ui.querySelector('.scroll, .custom-scroll')?.scrollTop || 0) : 0
  const fn = screenMap[state.screen] || screenMenu
  try {
    ui.innerHTML = fn(state)
  } catch (err) {
    console.error('Screen render failed', err)
    ui.innerHTML = `<div class="screen no-bike"><div class="content" style="justify-content:center;align-items:center"><div class="section-title">INTERFACE FAULT<small>${esc(err.message)}</small></div><button class="btn primary" data-action="nav" data-screen="menu">RETURN TO MENU</button></div></div>`
  }
  ui.dataset.screen = state.screen
  if (prevScroll) {
    const el = ui.querySelector('.scroll, .custom-scroll')
    if (el) el.scrollTop = prevScroll
  }
  hud.classList.add('hidden')
  updateTouchVisibility()
  updatePreviewForScreen()
}

// ---------------------------------------------------------------------------
// HUD
// ---------------------------------------------------------------------------
const hudEls = {
  mode: $('hud-mode'), track: $('hud-track'), objective: $('hud-objective'),
  timer: $('hud-timer'), position: $('hud-position'), total: $('hud-total'),
  standings: $('hud-standings'), minimap: $('minimap'),
  message: $('hud-message'), countdown: $('hud-countdown'), warning: $('hud-warning'),
  speed: $('hud-speed'), boost: $('hud-boost'), special: $('hud-special'), trail: $('hud-trail'),
  flags: $('hud-flags'), touch: $('touch-controls'), minimapWrap: document.querySelector('.hud-minimap-wrap'),
}

let fpsEl = null
let fpsAccum = 0
let fpsFrames = 0

function fmtClock(seconds) {
  if (!isFinite(seconds) || seconds < 0) seconds = 0
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  const ms = Math.floor((seconds % 1) * 1000)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(3, '0')}`
}

function drawMinimap(s) {
  const c = hudEls.minimap
  if (!c || !s.minimap) return
  const ctx = c.getContext('2d')
  const W = c.width, H = c.height
  ctx.clearRect(0, 0, W, H)
  const raw = s.minimap.points || []
  if (!raw.length) return
  const shrink = s.minimap.type === 'arena' ? (s.shrink || 1) : 1
  const pts = raw.map(p => [p[0] * shrink, p[1] * shrink])
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity
  for (const p of pts) {
    minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0])
    minZ = Math.min(minZ, p[1]); maxZ = Math.max(maxZ, p[1])
  }
  const pad = 15
  const scale = Math.min((W - pad * 2) / Math.max(1, maxX - minX), (H - pad * 2) / Math.max(1, maxZ - minZ))
  const cx = (minX + maxX) / 2, cz = (minZ + maxZ) / 2
  const tx = x => W / 2 + (x - cx) * scale
  const tz = z => H / 2 + (z - cz) * scale
  ctx.lineJoin = 'round'
  if (s.minimap.type === 'arena') {
    ctx.beginPath()
    pts.forEach((p, i) => { const x = tx(p[0]), y = tz(p[1]); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y) })
    ctx.closePath()
    ctx.fillStyle = 'rgba(0,229,255,.07)'
    ctx.fill()
    ctx.strokeStyle = 'rgba(0,229,255,.65)'
    ctx.lineWidth = 1.4
    ctx.stroke()
  } else {
    ctx.beginPath()
    pts.forEach((p, i) => { const x = tx(p[0]), y = tz(p[1]); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y) })
    ctx.closePath()
    ctx.strokeStyle = 'rgba(0,229,255,.55)'
    ctx.lineWidth = 3.2
    ctx.stroke()
    ctx.strokeStyle = 'rgba(255,255,255,.35)'
    ctx.lineWidth = 0.8
    ctx.stroke()
  }
  for (const r of s.racers || []) {
    if (!r.alive && !r.isPlayer) continue
    const x = tx(r.x), y = tz(r.z)
    if (r.isPlayer) {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(-r.heading)
      ctx.beginPath()
      ctx.moveTo(0, -6)
      ctx.lineTo(4.4, 4.5)
      ctx.lineTo(0, 2.6)
      ctx.lineTo(-4.4, 4.5)
      ctx.closePath()
      ctx.fillStyle = '#ffffff'
      ctx.shadowColor = r.color || '#00e5ff'
      ctx.shadowBlur = 8
      ctx.fill()
      ctx.restore()
    } else {
      ctx.beginPath()
      ctx.arc(x, y, 2.3, 0, Math.PI * 2)
      ctx.fillStyle = r.alive ? (r.color || '#7d9bb0') : 'rgba(120,140,155,.35)'
      ctx.fill()
    }
  }
}

function updateHud(s) {
  if (!hudEls.mode) return
  hudEls.mode.textContent = (s.modeName || s.mode || '').toUpperCase()
  hudEls.track.textContent = (s.trackName || '').toUpperCase()
  hudEls.objective.textContent = s.objective || ''
  hudEls.timer.textContent = fmtClock(s.time || 0)
  hudEls.position.textContent = s.position || 1
  hudEls.total.textContent = `/${s.total || 1}`
  hudEls.speed.textContent = Math.round(s.speed || 0)
  hudEls.boost.style.width = pct(s.boost || 0)
  hudEls.special.style.width = pct(s.special || 0)
  hudEls.trail.style.width = pct(s.trail != null ? s.trail : 1)
  const flags = []
  if (s.boostActive) flags.push('<span style="color:#00e5ff">BOOST</span>')
  if (s.drifting) flags.push('<span style="color:#ff7a18">DRIFT</span>')
  if (s.airborne) flags.push('<span style="color:#4ade80">AIR</span>')
  if (s.hazard) flags.push(`<span style="color:#ff3d81">${esc(String(s.hazard).toUpperCase())}</span>`)
  hudEls.flags.innerHTML = flags.join('')
  hudEls.warning.classList.toggle('show', !!s.warning || s.hazard === 'heat' || s.hazard === 'void')
  hudEls.warning.textContent = s.hazard === 'heat' ? '⚠ REACTOR OVERHEAT' : s.hazard === 'void' ? '⚠ VOID ZONE' : '⚠ WALL PROXIMITY'
  if (s.message) {
    hudEls.message.textContent = s.message.text
    hudEls.message.style.color = s.message.color || '#00e5ff'
  } else {
    hudEls.message.textContent = ''
  }
  if (s.phase === 'countdown') hudEls.countdown.textContent = s.countdown > 0 ? String(s.countdown) : 'GO'
  else if (s.phase === 'running' && (s.time || 0) < 0.85) hudEls.countdown.textContent = 'GO'
  else hudEls.countdown.textContent = ''
  if (hudEls.standings) {
    hudEls.standings.innerHTML = (s.standings || []).map(r => `<div class="sr ${r.isPlayer ? 'me' : ''} ${r.alive === false ? 'dead' : ''}">
      <span class="sp">${r.place}</span><span style="flex:1">${esc(r.name)}</span><span class="sp">${r.isPlayer ? 'YOU' : ''}</span>
    </div>`).join('')
  }
  if (hudEls.minimapWrap) hudEls.minimapWrap.classList.toggle('hidden', !state.profile.settings.showMinimap)
  drawMinimap(s)
  if (state.profile.settings.showFps) {
    if (!fpsEl) {
      fpsEl = document.createElement('div')
      fpsEl.style.cssText = 'position:absolute;top:calc(8px + env(safe-area-inset-top));left:50%;transform:translateX(-50%);font:9px var(--font-display);letter-spacing:.12em;color:#7d9bb0;background:rgba(2,8,16,.6);padding:3px 8px;pointer-events:none;z-index:5'
      hud.appendChild(fpsEl)
    }
    fpsEl.textContent = `${Math.round(fpsAccum)} FPS • ${resolveQuality().toUpperCase()}`
    fpsEl.classList.remove('hidden')
  } else if (fpsEl) fpsEl.classList.add('hidden')
}

// ---------------------------------------------------------------------------
// Touch controls
// ---------------------------------------------------------------------------
const touchState = new Map()

function applyTouchState() {
  if (!state.game) return
  const vals = [...touchState.values()]
  const left = vals.includes('left')
  const right = vals.includes('right')
  state.game.setSteer((right ? 1 : 0) - (left ? 1 : 0))
  state.game.setBoost(vals.includes('boost'))
  state.game.setBrake(vals.includes('brake'))
  state.game.setDrift(vals.includes('drift'))
}

function bindTouchControls() {
  if (!hudEls.touch || hudEls.touch.dataset.bound) return
  hudEls.touch.dataset.bound = '1'
  hudEls.touch.addEventListener('pointerdown', (e) => {
    const btn = e.target.closest('[data-touch]')
    if (!btn) return
    e.preventDefault()
    const t = btn.dataset.touch
    touchState.set(e.pointerId, t)
    btn.classList.add('active')
    if (t === 'special') state.game?.requestSpecial()
    if (t === 'jump') state.game?.requestJump()
    applyTouchState()
    try { btn.setPointerCapture(e.pointerId) } catch {}
  })
  const release = (e) => {
    if (!touchState.has(e.pointerId)) return
    const t = touchState.get(e.pointerId)
    touchState.delete(e.pointerId)
    hudEls.touch.querySelector(`[data-touch="${t}"]`)?.classList.remove('active')
    applyTouchState()
  }
  hudEls.touch.addEventListener('pointerup', release)
  hudEls.touch.addEventListener('pointercancel', release)
  hudEls.touch.addEventListener('lostpointercapture', release)
  window.addEventListener('blur', () => {
    touchState.clear()
    hudEls.touch.querySelectorAll('.touch-btn.active').forEach(b => b.classList.remove('active'))
    applyTouchState()
  })
}

function updateTouchVisibility() {
  if (!hudEls.touch) return
  const coarse = window.matchMedia?.('(pointer: coarse)').matches
  const show = state.screen === 'game' && (coarse || state.profile.settings.control === 'touch')
  hudEls.touch.classList.toggle('show', !!show)
}

// ---------------------------------------------------------------------------
// Game lifecycle
// ---------------------------------------------------------------------------
function ensureTrackForMode() {
  const mode = MODES[state.selectedMode] || MODES.classic
  if (mode.type === 'series') return
  const want = mode.type === 'circuit' ? 'circuit' : 'arena'
  const current = TRACK_MAP[state.selectedTrack]
  if (current && current.type === want && isTrackUnlocked(state.profile, current.id)) return
  const last = TRACK_MAP[state.profile.lastTrack]
  if (last && last.type === want && isTrackUnlocked(state.profile, last.id)) {
    state.selectedTrack = last.id
    return
  }
  const first = TRACKS.find(t => t.type === want && isTrackUnlocked(state.profile, t.id)) || TRACKS.find(t => t.type === want)
  if (first) state.selectedTrack = first.id
}

function startRace(opts = {}) {
  if (!renderer) {
    toast('WebGL is unavailable on this device.', 'red')
    return
  }
  const metaMode = opts.metaMode || opts.mode || state.selectedMode
  const mode = MODES[metaMode] || MODES.classic
  const rulesMode = opts.rulesMode || (metaMode === 'championship' ? 'classic' : metaMode)
  const trackId = opts.trackId || state.selectedTrack
  const track = TRACK_MAP[trackId]
  if (!track) {
    toast('No track selected.', 'red')
    return
  }
  if (!opts.force && !isTrackUnlocked(state.profile, trackId)) {
    toast('That track is still locked.', 'red')
    return
  }
  disposeGame()
  const quality = resolveQuality()
  const config = {
    mode: opts.mode || metaMode,
    rulesMode,
    metaMode,
    trackId,
    difficulty: opts.difficulty ?? state.difficulty,
    championship: !!opts.championship,
    bikeId: opts.bikeId,
    force: !!opts.force,
  }
  try {
    audio.init()
    const game = new Game(renderer, state.profile, {
      rulesMode,
      metaMode,
      trackId,
      difficulty: config.difficulty,
      quality,
      audio,
      championship: config.championship,
      bikeId: config.bikeId,
      onHud: updateHud,
      onFinish: handleFinish,
      onPauseRequest: togglePause,
    })
    state.game = game
    state.lastGameConfig = config
    state.screen = 'game'
    state.paused = false
    game.setSize(window.innerWidth, window.innerHeight)
    applyPixelRatio()
    ui.innerHTML = ''
    ui.dataset.screen = 'game'
    hud.classList.remove('hidden')
    updateTouchVisibility()
    bindTouchControls()
    state.profile.lastMode = metaMode === 'championship' ? 'championship' : metaMode
    state.profile.lastTrack = trackId
    saveProfile(state.profile)
    if (state.profile.settings.showFps) updateHud(game.lastHud || { time: 0 })
  } catch (err) {
    console.error('Could not start race', err)
    toast(`Could not start event: ${err.message}`, 'red', 5000)
    state.game = null
    state.screen = 'menu'
    renderUI()
  }
}

function disposeGame() {
  touchState.clear()
  if (state.game) {
    try { state.game.dispose() } catch (err) { console.warn('Game dispose failed', err) }
    state.game = null
  }
  hud.classList.add('hidden')
  updateTouchVisibility()
  if (state.booted) {
    audio.setTheme('menu')
    audio.startMusic()
  }
}

function handleFinish(result) {
  audio.stopEngine()
  audio.setTheme('menu')
  audio.startMusic()
  const rewards = applyResults(state.profile, result)
  state.profile.lastTrack = result.trackId
  state.profile.lastMode = result.mode === 'championship' ? 'championship' : result.mode
  saveProfile(state.profile)
  state.lastResult = { result, rewards }
  state.screen = 'results'
  state.game?.setPaused(true)
  hud.classList.add('hidden')
  touchState.clear()
  updateTouchVisibility()
  ui.innerHTML = ''
  renderUI()
  if (rewards.achievements?.length) audio.achievement()
  else if (rewards.levels > 0) audio.levelUp()
  for (const a of rewards.achievements || []) toast(`★ ACHIEVEMENT: ${a.name}`, 'gold', 4200)
  if (rewards.levels > 0) toast(`▲ LEVEL ${state.profile.level} REACHED`, 'green', 3400)
  if (rewards.championship?.trophy) toast('♛ CHAMPIONSHIP TROPHY EARNED', 'gold', 5000)
}

function leaveResults(target) {
  disposeGame()
  state.lastResult = null
  if (target === 'garage') state.garageBike = state.profile.equipped
  if (target === 'collection') state.collectionBike = state.profile.equipped
  state.screen = target
  renderUI()
}

function togglePause() {
  if (!state.game || state.screen === 'results') return
  if (state.screen === 'pause') {
    resumeGame()
    return
  }
  if (state.screen !== 'game' || state.game.ended) return
  state.screen = 'pause'
  state.paused = true
  state.game.setPaused(true)
  renderUI()
}

function resumeGame() {
  if (!state.game) return
  state.screen = 'game'
  state.paused = false
  state.game.setPaused(false)
  state.settingsBack = null
  ui.innerHTML = ''
  ui.dataset.screen = 'game'
  hud.classList.remove('hidden')
  updateTouchVisibility()
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
function nav(screen) {
  if (screen === 'pause') {
    if (state.game) { state.screen = 'pause'; renderUI() }
    return
  }
  if (state.game && screen !== 'game') disposeGame()
  if (screen === 'settings') state.settingsBack = null
  if (screen === 'garage') state.garageBike = state.garageBike || state.profile.equipped
  if (screen === 'collection') state.collectionBike = state.collectionBike || state.profile.equipped
  if (screen === 'showroom') state.showroomBike = state.showroomBike || 'tron-legacy'
  if (screen === 'tracks') ensureTrackForMode()
  state.screen = screen
  renderUI()
}

function selectMode(key) {
  const mode = MODES[key]
  if (!mode) return
  state.selectedMode = key
  state.profile.lastMode = key
  saveProfile(state.profile)
  if (mode.type === 'series') {
    state.screen = 'championship'
    renderUI()
    return
  }
  ensureTrackForMode()
  state.screen = 'tracks'
  renderUI()
}

function startChampionship() {
  const ch = state.profile.championship
  const event = CHAMPIONSHIP_EVENTS[ch.event]
  if (!event) {
    toast('Season complete. Start a new season from the Championship screen.', 'gold')
    return
  }
  state.selectedMode = 'championship'
  state.selectedTrack = event.track
  startRace({
    mode: 'championship',
    metaMode: 'championship',
    rulesMode: event.mode,
    trackId: event.track,
    championship: true,
    force: true,
  })
}

function handleAction(action, el) {
  const ds = el.dataset
  switch (action) {
    case 'nav':
      nav(ds.screen)
      break
    case 'select-mode':
      selectMode(ds.mode)
      break
    case 'select-track':
      state.selectedTrack = ds.track
      renderUI()
      break
    case 'filter-track':
      state.trackFilter = ds.filter || 'all'
      renderUI()
      break
    case 'set-difficulty':
      state.difficulty = Number(ds.diff) || 0
      renderUI()
      break
    case 'unlock-track': {
      const r = unlockTrack(state.profile, ds.track)
      if (r.ok) {
        uiSound('buy')
        toast(`Track unlocked${r.free ? ' (level reward)' : ''}.`, 'green')
        state.selectedTrack = ds.track
      } else {
        uiSound('error')
        toast(r.reason, 'red')
      }
      renderUI()
      break
    }
    case 'start-race':
      startRace()
      break
    case 'quick-play': {
      const key = MODES[state.profile.lastMode] ? state.profile.lastMode : 'classic'
      if (MODES[key].type === 'series') { state.screen = 'championship'; renderUI(); break }
      state.selectedMode = key
      ensureTrackForMode()
      startRace()
      break
    }
    case 'select-garage-bike':
      state.garageBike = ds.bike
      renderUI()
      break
    case 'select-collection-bike':
      state.collectionBike = ds.bike
      renderUI()
      break
    case 'select-showroom-bike':
      state.showroomBike = ds.bike
      renderUI()
      break
    case 'collection-category':
      state.collectionCategory = ds.cat || 'all'
      renderUI()
      break
    case 'collection-owned':
      state.collectionOwnedOnly = !state.collectionOwnedOnly
      renderUI()
      break
    case 'equip-bike': {
      const r = equipBike(state.profile, ds.bike)
      if (r.ok) {
        uiSound('equip')
        state.garageBike = ds.bike
        state.collectionBike = ds.bike
        toast(`${BIKE_MAP[ds.bike]?.name || 'Light cycle'} equipped.`, 'green')
      } else {
        uiSound('error')
        toast(r.reason, 'red')
      }
      renderUI()
      break
    }
    case 'buy-bike': {
      const r = purchaseBike(state.profile, ds.bike)
      if (r.ok) {
        uiSound('buy')
        state.garageBike = ds.bike
        state.collectionBike = ds.bike
        toast(`${BIKE_MAP[ds.bike]?.name || 'Light cycle'} acquired.`, 'gold')
      } else {
        uiSound('error')
        toast(r.reason, 'red')
      }
      renderUI()
      break
    }
    case 'customise-bike':
      state.garageBike = ds.bike
      state.screen = 'garage'
      renderUI()
      break
    case 'test-drive':
      startRace({
        mode: 'timetrial', metaMode: 'timetrial', rulesMode: 'timetrial',
        trackId: 'grand-neon-circuit', bikeId: ds.bike, force: true,
      })
      break
    case 'garage-tab':
      state.garageTab = ds.tab
      renderUI()
      break
    case 'cosmetic': {
      const field = { frame: 'frame', wheels: 'wheels', trail: 'trailFx', boost: 'boost', crash: 'crash', decal: 'decal', engine: 'engine', lighting: 'lighting' }[ds.kind]
      if (!field) break
      setCustom(state.profile, ds.bike, { [field]: ds.id })
      saveProfile(state.profile)
      uiSound('equip')
      renderUI()
      break
    }
    case 'buy-cosmetic': {
      const r = buyCosmetic(state.profile, ds.id)
      if (r.ok) {
        const field = { frame: 'frame', wheels: 'wheels', trail: 'trailFx', boost: 'boost', crash: 'crash', decal: 'decal', engine: 'engine', lighting: 'lighting' }[ds.kind]
        if (field) setCustom(state.profile, ds.bike, { [field]: ds.id })
        saveProfile(state.profile)
        uiSound('buy')
        toast(`${COSMETIC_MAP[ds.id]?.name || 'Part'} installed.`, 'gold')
      } else {
        uiSound('error')
        toast(r.reason, 'red')
      }
      renderUI()
      break
    }
    case 'paint':
      setCustom(state.profile, ds.bike, { [ds.field]: ds.color })
      saveProfile(state.profile)
      uiSound('click')
      renderUI()
      break
    case 'wheel-size':
      setCustom(state.profile, ds.bike, { wheelSize: ds.size })
      saveProfile(state.profile)
      uiSound('click')
      renderUI()
      break
    case 'upgrade': {
      const r = buyUpgrade(state.profile, ds.bike, ds.stat)
      if (r.ok) {
        uiSound('buy')
        toast('Upgrade installed.', 'green')
      } else {
        uiSound('error')
        toast(r.reason, 'red')
      }
      renderUI()
      break
    }
    case 'claim-challenge': {
      const r = claimChallenge(state.profile, ds.which, Number(ds.index))
      if (r.ok) {
        uiSound('buy')
        toast(`Contract claimed: +${r.reward.credits} CR • +${r.reward.xp} XP • +${r.reward.cores} ◈`, 'gold', 3600)
      } else {
        uiSound('error')
        toast(r.reason, 'red')
      }
      renderUI()
      break
    }
    case 'check-achievements': {
      const newly = checkAchievements(state.profile)
      if (newly.length) {
        uiSound('achievement')
        newly.forEach(a => toast(`★ ACHIEVEMENT: ${a.name}`, 'gold', 4000))
      } else {
        uiSound('click')
        toast('No new achievements.', '')
      }
      renderUI()
      break
    }
    case 'set-icon':
      state.profile.icon = ds.icon
      saveProfile(state.profile)
      uiSound('click')
      renderUI()
      break
    case 'rider-cosmetic':
      state.profile.rider[ds.kind] = ds.id
      saveProfile(state.profile)
      uiSound('equip')
      renderUI()
      break
    case 'buy-rider-cosmetic': {
      const r = buyCosmetic(state.profile, ds.id)
      if (r.ok) {
        state.profile.rider[ds.kind] = ds.id
        saveProfile(state.profile)
        uiSound('buy')
        toast('Rider gear acquired.', 'gold')
      } else {
        uiSound('error')
        toast(r.reason, 'red')
      }
      renderUI()
      break
    }
    case 'rider-color':
      state.profile.rider.suitColor = ds.color
      saveProfile(state.profile)
      uiSound('click')
      renderUI()
      break
    case 'toggle-setting': {
      const key = ds.key
      state.profile.settings[key] = !state.profile.settings[key]
      audio.setSettings({ music: state.profile.settings.music, sfx: state.profile.settings.sfx })
      saveProfile(state.profile)
      uiSound('click')
      renderUI()
      break
    }
    case 'set-quality':
      state.profile.settings.quality = ds.value
      saveProfile(state.profile)
      applyPixelRatio()
      resize()
      uiSound('click')
      renderUI()
      break
    case 'set-control':
      state.profile.settings.control = ds.value
      saveProfile(state.profile)
      updateTouchVisibility()
      uiSound('click')
      renderUI()
      break
    case 'reset-progress': {
      if (!window.confirm('Reset ALL progress, unlocks and records? This cannot be undone.')) break
      state.profile = resetProfile()
      refreshChallenges(state.profile)
      state.selectedMode = 'classic'
      state.selectedTrack = 'neon-grid-city'
      state.garageBike = state.profile.equipped
      state.collectionBike = state.profile.equipped
      state.screen = 'menu'
      saveProfile(state.profile)
      preview && (preview.key = '')
      renderUI()
      toast('Grid progress reset.', 'red')
      break
    }
    case 'start-championship':
      startChampionship()
      break
    case 'rematch': {
      const cfg = state.lastGameConfig
      if (!cfg) { leaveResults('menu'); break }
      disposeGame()
      state.lastResult = null
      startRace({ ...cfg })
      break
    }
    case 'results-next':
      if (state.lastResult?.result?.championship) leaveResults('championship')
      else leaveResults('tracks')
      break
    case 'results-tracks':
      leaveResults('tracks')
      break
    case 'results-garage':
      leaveResults('garage')
      break
    case 'results-menu':
      leaveResults('menu')
      break
    case 'pause-resume':
      resumeGame()
      break
    case 'pause-restart': {
      const cfg = state.lastGameConfig
      if (!cfg) { resumeGame(); break }
      disposeGame()
      startRace({ ...cfg })
      break
    }
    case 'pause-settings':
      state.settingsBack = 'pause'
      state.screen = 'settings'
      renderUI()
      break
    case 'pause-quit':
      disposeGame()
      state.screen = 'menu'
      renderUI()
      break
    default:
      break
  }
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------
if (ui) {
  ui.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]')
    if (!el) return
    const action = el.dataset.action
    if (action !== 'nav' && state.screen !== 'game') uiSound('click')
    handleAction(action, el)
  })

  ui.addEventListener('change', (e) => {
    if (e.target.id === 'profile-name') {
      const name = String(e.target.value || '').trim().slice(0, 14)
      if (name) {
        state.profile.name = name
        saveProfile(state.profile)
        toast('Callsign updated.', 'green')
        renderUI()
      }
    }
  })

  ui.addEventListener('keydown', (e) => {
    if (e.target.id === 'profile-name' && e.key === 'Enter') e.target.blur()
  })
}

$('hud-pause')?.addEventListener('click', togglePause)

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && state.screen === 'pause') {
    e.preventDefault()
    resumeGame()
  }
  if (e.key === 'Escape' && state.screen === 'results') {
    e.preventDefault()
    leaveResults('menu')
  }
})

let dragStart = null
document.addEventListener('pointerdown', (e) => {
  if (!e.target.closest('#drag-zone') || !preview) return
  dragStart = { x: e.clientX }
  preview.dragging = true
})
window.addEventListener('pointermove', (e) => {
  if (!dragStart || !preview) return
  preview.rotateBy((e.clientX - dragStart.x) * 0.011)
  dragStart.x = e.clientX
})
window.addEventListener('pointerup', () => {
  dragStart = null
  if (preview) preview.dragging = false
})
window.addEventListener('pointercancel', () => {
  dragStart = null
  if (preview) preview.dragging = false
})

function resize() {
  const w = window.innerWidth
  const h = window.innerHeight
  if (renderer) {
    renderer.setSize(w, h, false)
    if (state.game) state.game.setSize(w, h)
  }
  if (preview) preview.resize(w, h)
}
window.addEventListener('resize', resize)
window.addEventListener('orientationchange', () => setTimeout(resize, 120))

// ---------------------------------------------------------------------------
// Main loop
// ---------------------------------------------------------------------------
let last = performance.now()
let rafDtAccumulator = 0
function frame(now) {
  // Slow/compounded browser frames still represent elapsed real time.  Clamp only
  // the legacy per-step safety limit; race simulation now may take a few substeps.
  const dt = clamp((now - last) / 1000, 0, 0.25)
  last = now
  rafDtAccumulator = dt
  fpsAccum += dt
  fpsFrames += 1
  if (fpsAccum >= 0.5) {
    fpsAccum = fpsFrames / fpsAccum
    fpsFrames = 0
  }
  if (state.game && state.screen !== 'results') {
    if (!state.game.paused) {
      let remaining = rafDtAccumulator
      let steps = 0
      while (remaining > 0 && steps < 6) {
        const step = Math.min(remaining, 1 / 30)
        state.game.update(step)
        remaining -= step
        steps++
      }
    }
    rafDtAccumulator = 0
    state.game.render()
    if (state.profile.settings.showFps && fpsEl) {
      fpsEl.textContent = `${Math.round(fpsAccum)} FPS • ${resolveQuality().toUpperCase()}`
    }
  } else if (preview) {
    preview.update(dt)
    preview.render()
  }
  requestAnimationFrame(frame)
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
function bootSequence() {
  if (!renderer) {
    bootEnter?.classList.remove('hidden')
    return
  }
  refreshChallenges(state.profile)
  state.garageBike = state.profile.equipped
  state.collectionBike = state.profile.equipped
  state.selectedMode = MODES[state.profile.lastMode] ? state.profile.lastMode : 'classic'
  state.selectedTrack = TRACK_MAP[state.profile.lastTrack] ? state.profile.lastTrack : 'neon-grid-city'
  ensureTrackForMode()
  updatePreviewForScreen()
  applyPixelRatio()
  resize()

  const steps = [
    [10, 'LINKING TO GRID…'],
    [28, 'DECRYPTING LIGHT CYCLE SCHEMATICS…'],
    [48, 'LOADING TRACK GEOMETRY…'],
    [68, 'SYNCHRONISING SYNTHWAVE ENGINE…'],
    [86, 'CALIBRATING TRAIL EMITTERS…'],
    [100, 'GRID LINK READY'],
  ]
  let i = 0
  const timer = setInterval(() => {
    if (i >= steps.length) {
      clearInterval(timer)
      bootEnter?.classList.remove('hidden')
      return
    }
    const [p, text] = steps[i++]
    if (bootBar) bootBar.style.width = `${p}%`
    if (bootStatus) bootStatus.textContent = text
    if (p === 100) {
      clearInterval(timer)
      setTimeout(() => bootEnter?.classList.remove('hidden'), 180)
    }
  }, 170)

  const enter = () => {
    if (state.booted) return
    state.booted = true
    try {
      audio.init()
      audio.setSettings({ music: state.profile.settings.music, sfx: state.profile.settings.sfx })
      audio.setTheme('menu')
      audio.startMusic()
      audio.levelUp()
    } catch (err) { console.warn('Audio init failed', err) }
    bootEl?.classList.add('fade')
    setTimeout(() => bootEl?.classList.add('hidden'), 700)
    state.screen = 'menu'
    renderUI()
    const newly = checkAchievements(state.profile)
    saveProfile(state.profile)
    if (newly.length) {
      audio.achievement()
      newly.forEach(a => toast(`★ ACHIEVEMENT: ${a.name}`, 'gold', 4200))
    }
  }
  bootEnter?.addEventListener('click', enter)
  bootEl?.addEventListener('click', (e) => {
    if (e.target === bootEl && !bootEnter?.classList.contains('hidden')) enter()
  })
  window.addEventListener('keydown', (e) => {
    if (!state.booted && (e.key === 'Enter' || e.key === ' ')) enter()
  }, { once: true })
}

bootSequence()
requestAnimationFrame(frame)

// Expose a tiny debug handle for verification tooling.
window.__NEON_OVERDRIVE__ = state
