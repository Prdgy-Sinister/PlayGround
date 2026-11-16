/* ============================================================
   WANDLORE — main.js
   Boots the world, wires input, interactions, progression and the
   game loop.
   ============================================================ */
import * as THREE from 'three'
import { World } from './world.js'
import { FX } from './fx.js'
import { Duel } from './duel.js'
import { UI } from './ui.js'
import { AudioEngine } from './audio.js'
import {
  state, load, save, hasSave, on, addMat, addGold, addXp, addRep, addLore,
  addCreature, countMat, getEquippedWand, maxMana, maxHealth, refreshCustomers,
  checkQuests, resetGame, matById, rankTitle, woodById, coreById,
  addWandShard, discoverRoom, discoverSecret, brewPotion, restAtDorm,
  setStoryFlag, storyFlag, storySummary, visitZone, checkMissionProgress,
} from './state.js'
import {
  NPCS, NODES, ZONES, DUELISTS, TOURNAMENT, CATEGORIES, QUESTS, RARITIES,
  ACADEMY_ROOMS,
} from './data.js'

const $ = id => document.getElementById(id)
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const rand = (a, b) => a + Math.random() * (b - a)

/* ---------------------------------------------------------- BOOT */
const hadSave = hasSave()
load()

const canvas = $('scene')
const audio = new AudioEngine()
let world, fx, ui, duel
let started = false
let paused = true
let duelReturnPos = null
let savedResult = null
let lastZoneId = null
let hudAcc = 0
const keys = Object.create(null)
const floats = []
let interactTarget = null
let interactAcc = 0

let TOUCH = typeof window !== 'undefined' && (
  window.matchMedia?.('(pointer: coarse)').matches || (navigator.maxTouchPoints || 0) > 0
)
const ACADEMY_DUEL = { x: 30.5, z: -46.3, radius: 3.1 }
const joy = { active: false, id: null, x: 0, y: 0, cx: 0, cy: 0, radius: 44 }
let touchShieldHeld = false
let touchLook = null
let missionMarker = null
let missionMarkerKey = ''

try {
  world = new World(canvas)
  fx = new FX(world.scene)
  ui = new UI(makeHooks())
  duel = new Duel(world, fx, makeDuelCallbacks())
  world.setWandStyle(getEquippedWand())
  missionMarker = makeMissionMarker()
  document.body.classList.remove('in-duel')
  ui.updateHUD()
  ui.setDuelUI(false)
  ui.updateCombat(null, false)
  syncTouchMode()
  refreshCustomers(3)
  ui.drawMinimap()
  // loading → start screen
  const loading = $('loading-screen')
  setTimeout(() => {
    loading.classList.add('fade')
    setTimeout(() => loading.remove(), 600)
  }, 520)
  if (hadSave) {
    const btn = $('start-btn')
    btn.textContent = 'Continue your Legacy'
    const note = document.querySelector('.start-note')
    if (note) note.textContent = `${state.player.name} · ${rankTitle()} · ${state.player.rep} reputation · ${state.wands.length} wand${state.wands.length === 1 ? '' : 's'}`
  }
} catch (err) {
  console.error(err)
  const lt = document.querySelector('.loading-text')
  if (lt) lt.textContent = 'The world resisted conjuration — see the console.'
}

/* ---------------------------------------------------------- HOOKS */
function makeHooks() {
  return {
    getPlayerPos: () => ({ x: world.playerPos.x, z: world.playerPos.z }),
    getPlayerFacing: () => world.facing,
    getPathPoints: () => world.pathPoints,
    getZone: () => world.zone(),
    isBusy: () => !started || duel?.active || paused,
    isRunning: () => started && !paused,
    onSfx: name => audio.play(name),
    onSfxChange: on => audio.setEnabled(on),
    startDuel: (enemyId, opts = {}) => beginDuel(enemyId, opts.indoor ? indoorDuelOpts() : opts),
    onTravel: zone => travelTo(zone),
    onDialogueAction: (opt, npc) => dialogueAction(opt, npc),
    onStoryFlag: flag => { setStoryFlag(flag) },
    hasStoryFlag: flag => storyFlag(flag),
    onDialogueClose: () => { ui.setInteract(null) },
    onPanelOpen: name => { audio.play('select'); clearKeys() },
    onPanelClose: () => { clearKeys() },
    onCastSlot: slot => { if (duel.active) duel.tryCast(slot) },
    refreshEquip: () => { world.setWandStyle(getEquippedWand()); ui.updateHUD() },
    onDiscovery: d => { audio.play('magic'); ui.objective(`Legendary resonance: ${d.name}`) },
    onSale: () => { audio.play('magic') },
    onLessonComplete: () => { ui.updateHUD() },
    onLessonClose: () => { ui.updateHUD() },
    onResultClosed: (result, next) => finishResult(result, next),
    onReset: () => {
      audio.play('magic')
      world.setWandStyle(getEquippedWand())
      world.setPlayer(0, 16, Math.PI)
      ui.updateHUD()
      ui.toast('A new legacy begins', 'Firstlight is in your hand again.', 'magic', '✦')
      save()
    },
  }
}

function makeDuelCallbacks() {
  return {
    onStart: (def) => {
      document.body.classList.add('in-duel')
      ui.setDuelUI(true)
      ui.setInteract(null)
      clearKeys()
      ui.duelMessage(def.boss ? 'THE HOLLOW' : 'DUEL', 1.5)
    },
    onMessage: (text, dur) => ui.duelMessage(text, dur || 1.3),
    onSfx: (name, variant) => audio.play(name, variant),
    onHud: (hud) => ui.updateCombat(hud, true),
    onCast: () => {},
    onBlocked: msg => ui.toast('The spell fizzles', msg, 'bad', '✶'),
    onHit: () => ui.hitFlash(),
    onFloat: (f) => addFloat(f),
    onEnd: (result) => { savedResult = result },
    onClosed: (result) => {
      ui.setDuelUI(false)
      ui.updateCombat(null, false)
      document.body.classList.remove('in-duel')
      savedResult = result
      if (result?.victory) audio.play('victory')
      else if (result) audio.play('defeat')
      ui.showResult(result)
    },
  }
}

/* ---------------------------------------------------------- START */
$('start-btn').addEventListener('click', () => {
  audio.init()
  audio.resume()
  audio.setEnabled(state.settings.sound !== false)
  started = true
  paused = false
  state.flags.started = true
  $('start-screen').classList.add('fade')
  setTimeout(() => $('start-screen').remove(), 900)
  $('hud').classList.remove('hidden')
  syncTouchMode()
  const pos = state.position
  const x = pos ? pos.x : 0
  const z = pos ? pos.z : 16
  world.setPlayer(x, z, Math.PI)
  world.cameraYaw = 0
  visitZone(world.zone()?.id)
  world.setWandStyle(getEquippedWand())
  refreshCustomers(3)
  ui.updateHUD()
  ui.drawMinimap()
  save()
  setTimeout(() => ui.toast(`Welcome to Arcanum, ${state.player.name}`, 'Your first-year rooms are ready. Enter the inner halls through the courtyard arch, then find the Assignment Board.', 'magic', '✦'), 700)
  checkMissionProgress()
  setTimeout(() => {
    const s = storySummary()
    if (s.step) ui.objective(s.step.text)
    else ui.objective('Enrol at Arcanum — enter the inner halls')
  }, 2600)
  setTimeout(() => {
    const s = storySummary()
    if (s.mission) ui.toast(`Main story — ${s.mission.title}`, s.step?.text || s.mission.brief, 'magic', '✦')
    const q = QUESTS[0]
    if (!state.quests[q.id]?.complete) setTimeout(() => ui.toast('Pursuit — ' + q.title, q.hint, 'good', '❧'), 900)
  }, 4200)
})

$('sound-toggle').addEventListener('click', () => {
  audio.setEnabled(state.settings.sound)
})
/* ---------------------------------------------------------- INPUT */
const PANEL_KEYS = { c: 'wand', g: 'spells', b: 'shop', m: 'map', j: 'journal', u: 'academy' }

window.addEventListener('keydown', e => {
  if (!started) return
  const k = e.key.toLowerCase()
  if (k === 'w' || k === 'a' || k === 's' || k === 'd' || k === 'arrowup' || k === 'arrowdown' || k === 'arrowleft' || k === 'arrowright') {
    keys[k] = true
    if (!ui.panelName && ui.el.dialogue.classList.contains('hidden') && ui.el.lessonRoot.classList.contains('hidden')) e.preventDefault()
  }
  if (k === 'q') keys.q = true
  if (k === 'shift') {
    keys.shift = true
    if (duel.active && !paused) {
      duel.dodge(moveVector())
      e.preventDefault()
    }
  }
  if (k === 'e' && !e.repeat) {
    if (canInteract()) tryInteract()
  }
  if (['1', '2', '3', '4'].includes(k) && duel.active && !e.repeat) {
    duel.tryCast(Number(k) - 1)
    e.preventDefault()
  }
  if (k === 'escape') {
    if (ui.panelName) ui.closePanel()
    else if (!ui.el.dialogue.classList.contains('hidden')) ui.closeDialogue()
  }
  if (PANEL_KEYS[k] && !e.repeat && !duel.active && canUsePanels()) {
    const name = PANEL_KEYS[k]
    if (ui.panelName === name) ui.closePanel()
    else { ui.openPanel(name); e.preventDefault() }
  }
})

window.addEventListener('keyup', e => {
  const k = e.key.toLowerCase()
  keys[k] = false
  if (k === 'shift') keys.shift = false
  if (k === 'q') keys.q = false
})
window.addEventListener('blur', clearKeys)

function clearKeys() {
  for (const k of Object.keys(keys)) keys[k] = false
}

function syncTouchMode() {
  const on = TOUCH || window.innerWidth <= 820
  document.body.classList.toggle('touch-mode', on)
  if (ui?.el?.touchControls) ui.el.touchControls.classList.toggle('hidden', !on || !started)
  if (!on) { joy.x = 0; joy.y = 0; joy.active = false; touchShieldHeld = false }
}

function canUsePanels() {
  return started && !paused && ui.el.lessonRoot.classList.contains('hidden')
    && ui.el.resultRoot.classList.contains('hidden') && !duel.active
    && ui.el.dialogue.classList.contains('hidden')
}

function canInteract() {
  return started && !paused && !duel.active && !ui.panelName
    && ui.el.dialogue.classList.contains('hidden')
    && ui.el.lessonRoot.classList.contains('hidden')
    && ui.el.resultRoot.classList.contains('hidden')
}

/* camera drag */
let dragging = false, lastX = 0, lastY = 0
canvas.addEventListener('pointerdown', e => {
  if (e.button !== 0) return
  dragging = true; lastX = e.clientX; lastY = e.clientY
  canvas.setPointerCapture?.(e.pointerId)
})
canvas.addEventListener('pointermove', e => {
  if (!dragging) return
  world.rotateCamera(e.clientX - lastX, e.clientY - lastY)
  lastX = e.clientX; lastY = e.clientY
})
window.addEventListener('pointerup', () => { dragging = false })
canvas.addEventListener('wheel', e => {
  world.zoomCamera(e.deltaY)
  e.preventDefault()
}, { passive: false })
canvas.addEventListener('contextmenu', e => e.preventDefault())
canvas.addEventListener('pointercancel', () => { dragging = false })

/* ---------------------------------------------------------- TOUCH INPUT */
const joyZone = $('joystick-zone')
const joyBase = $('joystick-base')
const joyKnob = $('joystick-knob')

function joyStart(e) {
  if (!started || paused) return
  e.preventDefault(); e.stopPropagation()
  const rect = joyBase.getBoundingClientRect()
  joy.active = true; joy.id = e.pointerId
  joy.cx = rect.left + rect.width / 2
  joy.cy = rect.top + rect.height / 2
  joy.radius = rect.width * 0.34
  joyZone.classList.add('active')
  try { joyZone.setPointerCapture(e.pointerId) } catch {}
  joyMove(e)
}
function joyMove(e) {
  if (!joy.active || (joy.id !== null && e.pointerId !== joy.id)) return
  e.preventDefault()
  let dx = e.clientX - joy.cx, dy = e.clientY - joy.cy
  const dist = Math.hypot(dx, dy)
  if (dist > joy.radius) { dx = dx / dist * joy.radius; dy = dy / dist * joy.radius }
  joy.x = dx / joy.radius
  joy.y = dy / joy.radius
  joyKnob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`
}
function joyEnd(e) {
  if (joy.id !== null && e?.pointerId !== undefined && e.pointerId !== joy.id) return
  joy.active = false; joy.id = null; joy.x = 0; joy.y = 0
  joyZone.classList.remove('active')
  joyKnob.style.transform = 'translate(-50%, -50%)'
}
if (joyZone) {
  joyZone.addEventListener('pointerdown', joyStart)
  joyZone.addEventListener('pointermove', joyMove)
  joyZone.addEventListener('pointerup', joyEnd)
  joyZone.addEventListener('pointercancel', joyEnd)
  joyZone.addEventListener('lostpointercapture', joyEnd)
}

function bindTouchAction(id, down, up = null) {
  const el = $(id)
  if (!el) return
  el.addEventListener('pointerdown', e => {
    e.preventDefault(); e.stopPropagation()
    el.classList.add('pressed')
    try { el.setPointerCapture(e.pointerId) } catch {}
    down?.(e)
  })
  const release = e => {
    if (e) { e.preventDefault(); e.stopPropagation() }
    el.classList.remove('pressed')
    up?.(e)
  }
  el.addEventListener('pointerup', release)
  el.addEventListener('pointercancel', release)
  el.addEventListener('lostpointercapture', release)
}

document.querySelectorAll('[data-touch-cast]').forEach(btn => {
  const release = e => { if (e) e.preventDefault(); btn.classList.remove('pressed') }
  btn.addEventListener('pointerdown', e => {
    e.preventDefault(); e.stopPropagation()
    btn.classList.add('pressed')
    try { btn.setPointerCapture(e.pointerId) } catch {}
    const slot = Number(btn.dataset.touchCast)
    if (duel.active) duel.tryCast(slot)
  })
  btn.addEventListener('pointerup', release)
  btn.addEventListener('pointercancel', release)
  btn.addEventListener('lostpointercapture', release)
})
bindTouchAction('touch-interact', () => { if (canInteract()) tryInteract() })
bindTouchAction('touch-shield', () => { touchShieldHeld = true; ui.el.touchShield?.classList.add('active') }, () => { touchShieldHeld = false; ui.el.touchShield?.classList.remove('active') })
bindTouchAction('touch-dodge', () => { if (duel.active) duel.dodge(moveVector()) })

window.addEventListener('touchstart', () => {
  if (!TOUCH) { TOUCH = true; syncTouchMode() }
}, { passive: true })

/* ---------------------------------------------------------- MOVEMENT */
function moveVector() {
  const yaw = world.cameraYaw
  const fx2 = -Math.sin(yaw), fz2 = -Math.cos(yaw)
  const rx = Math.cos(yaw), rz = -Math.sin(yaw)
  let fwd = 0, side = 0
  if (keys.w || keys.arrowup) fwd += 1
  if (keys.s || keys.arrowdown) fwd -= 1
  if (keys.d || keys.arrowright) side += 1
  if (keys.a || keys.arrowleft) side -= 1
  if (joy.active) { fwd -= joy.y; side += joy.x }
  const len = Math.hypot(fwd, side)
  if (len > 1) { fwd /= len; side /= len }
  return {
    x: fx2 * fwd + rx * side,
    z: fz2 * fwd + rz * side,
  }
}

function movementAllowed() {
  if (!started || paused) return false
  if (ui.panelName) return false
  if (!ui.el.dialogue.classList.contains('hidden')) return false
  if (!ui.el.lessonRoot.classList.contains('hidden')) return false
  if (!ui.el.resultRoot.classList.contains('hidden')) return false
  return true
}

/* ---------------------------------------------------------- INTERACTION */
const nodeState = id => state.nodeCooldowns[id] || 0

function availableNodes() {
  const now = Date.now()
  return NODES.filter(n => {
    if (n.bossOnly && !state.flags.bossDefeated) return false
    if (n.type === 'chest' && state.chestsOpened.includes(n.id)) return false
    if (n.type === 'clue' && (state.academy?.clues || []).includes(n.id)) return false
    if (nodeState(n.id) > now) return false
    return true
  })
}

function findInteractable() {
  const px = world.playerPos.x, pz = world.playerPos.z
  let best = null, bestD = Infinity
  for (const npc of NPCS) {
    if (npc.id === 'morvane' && state.flags.bossDefeated) continue
    const d = Math.hypot(px - npc.pos[0], pz - npc.pos[1])
    if (d < 3.8 && d < bestD) { best = { kind: 'npc', npc, label: `Speak with ${npc.name}`, d }; bestD = d }
  }
  for (const node of availableNodes()) {
    const d = Math.hypot(px - node.pos[0], pz - node.pos[1])
    if (d < 3.4 && d < bestD) {
      const label = node.type === 'chest' ? `Open ${node.label}`
        : node.type === 'lore' || node.type === 'clue' ? `Read ${node.label}`
        : `Gather ${node.label}`
      best = { kind: 'node', node, label, d }; bestD = d
    }
  }
  for (const obj of world.interactables || []) {
    if (!interactableAvailable(obj)) continue
    const d = Math.hypot(px - obj.pos[0], pz - obj.pos[1])
    if (d < (obj.r || 3.2) && d < bestD) {
      best = { kind: 'interactable', obj, label: obj.label, d }; bestD = d
    }
  }
  return best
}

function interactableAvailable(obj) {
  if (obj.requiresClue && !(state.academy?.clues || []).includes(obj.requiresClue)) return false
  if (obj.requiresRoom && !(state.academy?.rooms || []).includes(obj.requiresRoom)) return false
  return true
}

function refreshInteract() {
  if (!canInteract()) { ui.setInteract(null); interactTarget = null; return }
  const t = findInteractable()
  interactTarget = t
  ui.setInteract(t ? t.label : null)
}

function tryInteract() {
  const t = interactTarget || findInteractable()
  if (!t) return
  audio.play('click')
  if (t.kind === 'npc') {
    ui.showDialogue(t.npc)
  } else if (t.kind === 'interactable') {
    handleInteractable(t.obj)
  } else {
    handleNode(t.node)
  }
}

function handleNode(node) {
  const now = Date.now()
  if (nodeState(node.id) > now) return
  if (node.type === 'wood' || node.type === 'core') {
    const mat = matById[node.mat]
    if (!mat) return
    addMat(node.mat, 1)
    addXp(8)
    if (RARITIES[mat.rarity].order >= 2) addRep(1)
    const rarity = RARITIES[mat.rarity]
    state.nodeCooldowns[node.id] = now + (node.respawn || 120) * 1000
    fx.burst(new THREE.Vector3(node.pos[0], world.heightAt(node.pos[0], node.pos[1]) + 1.1, node.pos[1]), mat.color, 16, 3.2, 0.42, 0.7)
    fx.runeRing(new THREE.Vector3(node.pos[0], world.heightAt(node.pos[0], node.pos[1]), node.pos[1]), rarity.color, 1.4, 0.6)
    audio.play(node.type === 'core' ? 'magic' : 'craft')
    ui.toast(`Gathered ${mat.name}`, `${rarity.label} · ${node.type === 'wood' ? 'wood' : 'core'} · ${countMat(mat.id)} held`, rarity.order >= 2 ? 'magic' : 'good', node.type === 'wood' ? '⚕' : '✦')
    ui.updateHUD()
    save()
    world.setNodeAvailable(node.id, false)
    refreshInteract()
    return
  }
  if (node.type === 'chest') {
    const gold = Math.round(rand(node.gold[0], node.gold[1]))
    addGold(gold, 'chest')
    state.metrics.goldEarned += 0
    const loot = []
    for (const id of node.loot || []) {
      if (Math.random() < 0.82) { addMat(id, 1); loot.push(matById[id]?.name || id) }
    }
    addXp(20); addRep(2)
    state.chestsOpened.push(node.id)
    fx.burst(new THREE.Vector3(node.pos[0], world.heightAt(node.pos[0], node.pos[1]) + 1, node.pos[1]), '#e9c874', 30, 5, 0.55, 0.9)
    audio.play('coin'); audio.play('upgrade')
    ui.toast('Chest opened', `${gold} galleons${loot.length ? ' · ' + loot.join(', ') : ''}`, 'good', '◉')
    ui.objective(`+${gold} galleons`)
    ui.updateHUD()
    checkQuests()
    save()
    world.setNodeAvailable(node.id, false)
    refreshInteract()
    return
  }
  if (node.type === 'clue') {
    const added = addWandShard(node.id)
    addLore(node.label, node.lore)
    audio.play('magic')
    fx.runeRing(new THREE.Vector3(node.pos[0], world.heightAt(node.pos[0], node.pos[1]) + 0.2, node.pos[1]), '#c9a6ff', 2.1, 0.9)
    fx.burst(new THREE.Vector3(node.pos[0], world.heightAt(node.pos[0], node.pos[1]) + 1.3, node.pos[1]), '#e6c987', 24, 4, 0.5, 0.8)
    ui.toast('Echo recovered', `${node.label} · ${state.academy.clues.length} of 4 echoes found`, 'magic', '❈')
    if (added) ui.objective(`Sundered Wand echo ${state.academy.clues.length}/4`)
    ui.updateHUD()
    save()
    world.setNodeAvailable(node.id, false)
    refreshInteract()
    return
  }
  if (node.type === 'lore') {
    const added = addLore(node.label, node.lore)
    audio.play('magic')
    ui.toast(node.label, node.lore, 'magic', '❧')
    if (added) ui.objective('Lore recorded in your journal')
    ui.updateHUD()
    save()
    world.setNodeAvailable(node.id, false)
    refreshInteract()
  }
}

/* ---------------------------------------------------------- MISSION MARKER */
function makeMissionMarker() {
  const group = new THREE.Group()
  const gem = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.34, 0),
    new THREE.MeshBasicMaterial({ color: '#f5dfa6', toneMapped: false })
  )
  gem.position.y = 0.12
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: world.textures.glow, color: '#c9a6ff', transparent: true, opacity: 0.8,
    blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
  }))
  halo.scale.setScalar(2.1)
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.55, 0.68, 28),
    new THREE.MeshBasicMaterial({
      color: '#c9a6ff', transparent: true, opacity: 0.55,
      side: THREE.DoubleSide, depthWrite: false, toneMapped: false,
    })
  )
  ring.rotation.x = -Math.PI / 2
  ring.position.y = -2.88
  group.add(gem, halo, ring)
  group.userData.gem = gem
  group.visible = false
  world.scene.add(group)
  return group
}

function updateMissionMarker(dt) {
  if (!missionMarker) return
  const s = storySummary()
  const step = s.step
  const show = started && !paused && !duel.active && !s.finished && !!step?.pos &&
    ui.el.dialogue.classList.contains('hidden') && !ui.panelName
  missionMarker.visible = show
  if (!show) return
  const [x, z] = step.pos
  const key = `${s.missionIndex}:${s.stepIndex}`
  if (key !== missionMarkerKey) {
    missionMarkerKey = key
    missionMarker.position.set(x, world.heightAt(x, z) + 3.0, z)
  }
  missionMarker.rotation.y += dt * 1.25
  missionMarker.userData.gem.position.y = 0.12 + Math.sin(world.time * 2.2) * 0.1
}

/* ---------------------------------------------------------- ACADEMY */
function teleportWithin(x, z, { room = null, secret = null, label = '', facing = null } = {}) {
  const y = world.heightAt(x, z)
  fx.implosion(new THREE.Vector3(world.playerPos.x, world.playerPos.y + 1, world.playerPos.z), '#c9a6ff', 18)
  world.setPlayer(x, z, facing)
  fx.runeRing(new THREE.Vector3(x, y + 0.05, z), '#c9a6ff', 2.2, 0.9)
  setTimeout(() => fx.burst(new THREE.Vector3(x, y + 1, z), '#c9a6ff', 18, 4, 0.5, 0.7), 60)
  if (secret) {
    const found = discoverSecret(secret)
    if (found) {
      ui.toast('Secret passage found', 'The wall remembers a door it used to be.', 'magic', '❈')
      ui.objective('Secret discovered')
    }
  }
  if (room) discoverRoom(room)
  if (label) ui.objective(label)
  audio.play('travel')
  ui.updateHUD()
  save()
}

function recoverSiteEcho({ id, title, lore, flag, color = '#c9a6ff', icon = '❈' }) {
  const added = addWandShard(id)
  addLore(title, lore)
  if (flag) setStoryFlag(flag)
  audio.play('magic')
  const [x, z] = id === 'clue_lake' ? [-34, 74] : [50, 4]
  const y = world.heightAt(x, z)
  fx.runeRing(new THREE.Vector3(x, y + 0.15, z), color, 2.4, 1)
  fx.burst(new THREE.Vector3(x, y + 1.2, z), color, 30, 4.5, 0.55, 0.8)
  const total = 6
  if (added) {
    ui.toast('Echo recovered', `${title} · ${state.academy.clues.length} of ${total} echoes found`, 'magic', icon)
    ui.objective(`Sundered Wand echo ${state.academy.clues.length}/${total}`)
  } else {
    ui.toast(title, lore, 'magic', icon)
  }
  checkQuests()
  ui.updateHUD()
  save()
  refreshInteract()
}

function handleInteractable(obj) {
  switch (obj.action) {
    case 'bell':
      recoverSiteEcho({
        id: 'clue_lake',
        title: 'The Drowned Bell’s Echo',
        lore: 'The bell does not ring for the dead. It rings for the promise the wand made and could not keep. “I chose,” it says. “I chose her. I chose him. I chose the next hand. I will choose again.”',
        flag: 'echo_lake',
        color: '#8fe6ff',
        icon: '❈',
      })
      break
    case 'scope':
      recoverSiteEcho({
        id: 'clue_observatory',
        title: 'The Dark Star’s Reflection',
        lore: 'The telescope shows no star. It shows a hand closing around a wand, and the wand splitting along its refusal. Behind the hand, the Hollow Spire is already being built.',
        flag: 'echo_observatory',
        color: '#a8d8ff',
        icon: '❈',
      })
      break
    case 'enter':
    case 'passage':
      teleportWithin(obj.target[0], obj.target[1], {
        room: obj.room || null,
        secret: obj.secret || null,
        label: obj.action === 'passage' ? 'A hidden passage' : '',
        facing: obj.target[1] < world.playerPos.z ? Math.PI : 0,
      })
      break
    case 'secret':
      teleportWithin(obj.target[0], obj.target[1], {
        secret: obj.secret || 'vault',
        label: 'The Room of Echoes',
      })
      break
    case 'academy':
      setStoryFlag('read_board')
      ui.openPanel('academy')
      break
    case 'brew': {
      const res = brewPotion()
      if (!res.ok) {
        audio.play('deny')
        ui.toast('The cauldron refuses', res.error, 'bad', '☾')
      } else {
        audio.play('upgrade')
        fx.burst(new THREE.Vector3(world.playerPos.x, world.playerPos.y + 1.2, world.playerPos.z), '#9bf0bf', 22, 3.5, 0.5, 0.8)
        ui.toast('Restorative draught brewed', 'Health and mana restored. Professor Thorne pretends not to be impressed.', 'good', '☕')
        ui.objective('Potion brewed')
      }
      ui.updateHUD()
      break
    }
    case 'rest': {
      const res = restAtDorm()
      audio.play('magic')
      ui.toast('A short rest', `Health +${res.healed} · Mana +${res.mana}. Your bed is narrow, but the pillow knows its job.`, 'good', '☾')
      ui.objective('Rested at the dorms')
      ui.updateHUD()
      break
    }
    case 'wand':
      ui.openPanel('wand')
      break
    case 'duel':
      beginDuel(obj.duel, indoorDuelOpts())
      break
    default:
      break
  }
}

function indoorDuelOpts() {
  const y = world.heightAt(ACADEMY_DUEL.x, ACADEMY_DUEL.z)
  return {
    academy: true,
    radius: ACADEMY_DUEL.radius,
    center: new THREE.Vector3(ACADEMY_DUEL.x, y, ACADEMY_DUEL.z),
  }
}

/* ---------------------------------------------------------- DIALOGUE ACTIONS */
function dialogueAction(opt, npc) {
  ui.closeDialogue()
  switch (opt.action) {
    case 'lessons':
      ui.openPanel('spells', opt.cat || 'offensive')
      break
    case 'lesson':
      ui.openLesson(opt.cat || 'offensive')
      break
    case 'academy':
      ui.openPanel('academy')
      break
    case 'brew': {
      const res = brewPotion()
      if (!res.ok) { audio.play('deny'); ui.toast('The cauldron refuses', res.error, 'bad', '☾') }
      else { audio.play('upgrade'); ui.toast('Restorative draught brewed', 'Health and mana restored.', 'good', '☕'); ui.objective('Potion brewed') }
      ui.updateHUD()
      break
    }
    case 'rest': {
      const res = restAtDorm()
      audio.play('magic')
      ui.toast('A short rest', `Health +${res.healed} · Mana +${res.mana}.`, 'good', '☾')
      ui.objective('Rested at the dorms')
      ui.updateHUD()
      break
    }
    case 'market':
      ui.openPanel('shop', 'market')
      break
    case 'shop':
      ui.openPanel('shop', 'customers')
      break
    case 'wand':
      ui.openPanel('wand')
      break
    case 'tournament':
      ui.openPanel('tournament')
      break
    case 'pickduel':
      ui.openPanel('duelpick')
      break
    case 'duel':
      beginDuel(opt.duel, opt.indoor ? indoorDuelOpts() : {})
      break
    case 'boss':
      if (state.player.rep < 30) {
        ui.toast('Morvane is unimpressed', `Reach 30 reputation before climbing the spire. You have ${state.player.rep}.`, 'bad', '☾')
        audio.play('deny')
        return
      }
      beginDuel('morvane', { boss: true })
      break
    case 'blessing':
      state.flags.blessing = true
      addRep(1)
      addXp(10)
      audio.play('magic')
      ui.toast('The Headmistress’s blessing', 'Your next crafted wand will be finer than your hands deserve.', 'magic', '✦')
      ui.updateHUD()
      save()
      break
    case 'close':
    default:
      break
  }
}

/* ---------------------------------------------------------- TRAVEL */
function travelTo(zone) {
  if (state.player.rep < zone.reqRep) return
  audio.play('travel')
  const [tx, tz] = zone.travel
  const y = world.heightAt(tx, tz)
  fx.implosion(new THREE.Vector3(world.playerPos.x, world.playerPos.y + 1, world.playerPos.z), '#c9a6ff', 20)
  world.setPlayer(tx, tz, Math.PI)
  fx.runeRing(new THREE.Vector3(tx, y + 0.05, tz), '#c9a6ff', 2.6, 1)
  setTimeout(() => fx.burst(new THREE.Vector3(tx, y + 1, tz), '#c9a6ff', 24, 5, 0.55, 0.8), 80)
  ui.objective(zone.name)
  ui.toast(`Travelled to ${zone.name}`, zone.desc, 'magic', '⌖')
  lastZoneId = zone.id
  visitZone(zone.id)
  state.position = { x: tx, z: tz }
  save()
}

/* ---------------------------------------------------------- DUELS */
function beginDuel(enemyId, opts = {}) {
  if (!DUELISTS[enemyId] || duel.active) return
  if (!duelReturnPos) duelReturnPos = { x: world.playerPos.x, z: world.playerPos.z, facing: world.facing }
  clearKeys()
  if (ui.panelName) ui.closePanel()
  if (!ui.el.dialogue.classList.contains('hidden')) ui.closeDialogue()
  ui.updateHUD()
  const ok = duel.start(enemyId, opts)
  if (!ok) {
    ui.toast('The duel cannot begin', 'Something interrupts the challenge.', 'bad', '!')
    duelReturnPos = null
    return
  }
  audio.play('duelStart')
}

function finishResult(result, next) {
  if (next) {
    const round = state.tournament.round
    if (round < TOURNAMENT.length) {
      const r = TOURNAMENT[round]
      savedResult = null
      beginDuel(r.opponent, { tournament: true, roundIndex: round })
      return
    }
  }
  if (duelReturnPos) {
    world.setPlayer(duelReturnPos.x, duelReturnPos.z, duelReturnPos.facing)
    duelReturnPos = null
  }
  if (result && result.bossReward) {
    ui.objective('Morvane is fallen — the Voidheart is yours')
    ui.toast('Title earned', 'Morvane’s Bane. The Hollow Spire is silent.', 'magic', '☾')
  }
  if (result?.tournamentBonus && state.tournament.complete) {
    ui.objective('Champion of Hollowmere')
  }
  document.body.classList.remove('in-duel')
  savedResult = null
  world.setDuelArena(false)
  clearKeys()
  ui.updateHUD()
  save()
}

/* ---------------------------------------------------------- FLOATING NUMBERS */
function addFloat({ pos, amount, type, crit }) {
  if (!pos) return
  const p = world.screenPosition(pos)
  if (p.behind) return
  const div = document.createElement('div')
  div.className = 'float-dmg' + (type === 'heal' || type === 'shield' ? ' heal' : '') + (crit ? ' crit' : '')
  div.textContent = type === 'heal' ? `+${amount}` : type === 'shield' ? `⛨ ${amount}` : `-${amount}`
  div.style.left = p.x + 'px'
  div.style.top = p.y + 'px'
  $('game').appendChild(div)
  floats.push(div)
  setTimeout(() => { div.remove(); const i = floats.indexOf(div); if (i >= 0) floats.splice(i, 1) }, 1050)
}

/* ---------------------------------------------------------- STATE EVENTS */
on('academyAssignment', a => {
  audio.play('upgrade')
  ui.toast('Assignment complete — ' + a.title, `+${a.gold}g · +${a.rep} rep · +${a.xp} xp · +10 house points`, 'good', '❈')
  setTimeout(() => ui.objective(`Assignment complete: ${a.title}`), 160)
  ui.updateHUD()
})
on('academyRoom', room => {
  if (room.id === 'courtyard') return
  ui.toast('Room discovered — ' + room.name, room.desc, 'magic', '⌂')
  ui.objective(room.name)
  ui.updateHUD()
})
on('academyYear', year => {
  ui.toast(`Year ${year} at Arcanum`, 'Your record has advanced. The professors have noticed, which is rarely comfortable.', 'magic', '✦')
})
on('academySecret', () => {
  ui.objective('A secret of Arcanum uncovered')
  ui.updateHUD()
})
on('missionStep', ({ mission, stepIndex }) => {
  audio.play('magic')
  const next = mission.steps[stepIndex + 1]
  if (next) {
    ui.toast(`Main story — ${mission.title}`, next.text, 'magic', '✦')
    setTimeout(() => ui.objective(next.text), 180)
  }
  ui.updateHUD()
})
on('missionComplete', ({ mission, reward }) => {
  audio.play('upgrade')
  ui.toast(`Mission complete — ${mission.title}`, `+${reward.gold || 0}g · +${reward.rep || 0} rep · +${reward.xp || 0} xp`, 'good', '✦')
  setTimeout(() => ui.objective(`Mission complete: ${mission.title}`), 180)
  const next = storySummary()
  if (next.mission) {
    setTimeout(() => {
      ui.toast(`Next mission — ${next.mission.title}`, next.mission.brief, 'magic', '✦')
      ui.objective(next.step?.text || next.mission.brief)
    }, 2400)
  }
  ui.updateHUD()
})
on('questComplete', q => {
  audio.play('magic')
  ui.toast('Pursuit complete — ' + q.title, `+${q.gold}g · +${q.rep} rep · +${q.xp} xp`, 'good', '❧')
  setTimeout(() => ui.objective(`Pursuit complete: ${q.title}`), 200)
  ui.updateHUD()
})
on('levelup', ({ level }) => {
  audio.play('upgrade')
  ui.toast(`Level ${level}`, 'You feel a little more dangerous, and a little more responsible.', 'magic', '✦')
  ui.objective(`Level ${level} reached`)
  ui.updateHUD()
})
on('rep', () => ui.updateHUD())
on('gold', () => ui.updateHUD())
on('xp', () => ui.updateHUD())
on('inventory', () => { if (ui.panelName === 'wand') ui.updateHUD() })
on('craft', () => ui.updateHUD())
on('upgrade', () => ui.updateHUD())

/* ---------------------------------------------------------- LOOP */
const clock = new THREE.Clock()

function frame() {
  requestAnimationFrame(frame)
  let dt = clock.getDelta()
  if (dt > 0.06) dt = 0.06
  if (!world) return

  const allowMove = movementAllowed()
  if (allowMove) {
    const mv = moveVector()
    world.updateMovement(dt, mv)
    if (!duel.active && world.moveAmount > 0.4 && Math.random() < dt * 1.6) {
      // faint footstep shimmer
    }
  } else {
    world.updateMovement(dt, { x: 0, z: 0 })
  }

  world.update(dt)
  updateMissionMarker(dt)
  fx.update(dt)
  duel.update(dt, { shield: (!!keys.q || touchShieldHeld) && allowMove })
  ui.tick(dt)

  hudAcc += dt
  if (hudAcc > 0.5) {
    hudAcc = 0
    if (!duel.active) {
      ui.updateCombat(null, false)
      const maxM = maxMana()
      state.player.mana = Math.min(maxM, state.player.mana + 6)
      const maxH = maxHealth()
      if (state.player.health < maxH) state.player.health = Math.min(maxH, state.player.health + 1.2)
      ui.drawMinimap()
      ui.updateHUD()
    }
    // node visibility
    for (const node of NODES) {
      let visible = true
      if (node.bossOnly && !state.flags.bossDefeated) visible = false
      if (node.type === 'chest' && state.chestsOpened.includes(node.id)) visible = false
      if (node.type === 'clue' && (state.academy?.clues || []).includes(node.id)) visible = false
      if (nodeState(node.id) > Date.now()) visible = false
      if (world.nodes[node.id]) world.nodes[node.id].visible = visible
    }
    // zone change
    const zone = world.zone()
    if (zone && zone.id !== lastZoneId) {
      if (lastZoneId !== null && started) ui.toast(zone.name, zone.desc, 'magic', '⌖')
      lastZoneId = zone.id
      visitZone(zone.id)
    }
    if (started && world.inAcademyInterior()) setStoryFlag('entered_halls')
    const roomId = world.roomAt()
    if (roomId && started) discoverRoom(roomId, { silent: true })
    if (roomId === 'vault' && (state.academy?.clues?.length || 0) >= 4) {
      setStoryFlag('echoes_delivered')
    }
    state.position = { x: world.playerPos.x, z: world.playerPos.z }
    save()
  }

  if (ui.panelName === 'wand' && ui.previewCtx) {
    // preview animation handled in ui.tick
  }

  interactAcc += dt
  if (interactAcc > 0.15) {
    interactAcc = 0
    refreshInteract()
  }

  // hide player during cutaway? no
  world.render()
}

frame()

/* ---------------------------------------------------------- RESIZE / SAVE */
window.addEventListener('resize', () => { world?.onResize(); syncTouchMode() })
window.addEventListener('visibilitychange', () => { if (document.hidden) save() })
window.addEventListener('beforeunload', () => save())
setInterval(() => { if (started) save() }, 15000)

/* Expose small debug handle */
window.__wandlore = {
  world, ui, duel, state, save, beginDuel, travelTo,
  teleport: (x, z, facing = null) => { world.setPlayer(x, z, facing); ui.updateHUD() },
  discoverRoom: id => discoverRoom(id),
  discoverSecret: id => discoverSecret(id),
  addWandShard: id => addWandShard(id),
  get missionMarker() { return missionMarker },
}
