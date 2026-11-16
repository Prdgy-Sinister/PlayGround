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
  checkQuests, resetGame, matById, rankTitle, woodById, coreById, discoverClue, schoolMetricValue,
} from './state.js'
import {
  NPCS, NODES, ZONES, DUELISTS, TOURNAMENT, CATEGORIES, QUESTS, RARITIES,
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
const touchMove = { fwd: 0, side: 0 }

try {
  world = new World(canvas)
  fx = new FX(world.scene)
  ui = new UI(makeHooks())
  duel = new Duel(world, fx, makeDuelCallbacks())
  world.setWandStyle(getEquippedWand())
  document.body.classList.remove('in-duel')
  ui.updateHUD()
  ui.setDuelUI(false)
  ui.updateCombat(null, false)
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
    onSfx: name => audio.play(name),
    onSfxChange: on => audio.setEnabled(on),
    startDuel: (enemyId, opts) => beginDuel(enemyId, opts),
    onTravel: zone => travelTo(zone),
    onDialogueAction: (opt, npc) => dialogueAction(opt, npc),
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
  const pos = state.position
  const x = pos ? pos.x : 0
  const z = pos ? pos.z : 16
  world.setPlayer(x, z, Math.PI)
  world.cameraYaw = 0
  world.setWandStyle(getEquippedWand())
  refreshCustomers(3)
  ui.updateHUD()
  ui.drawMinimap()
  save()
  setTimeout(() => ui.toast(`Welcome to Hollowmere, ${state.player.name}`, 'Speak to Mira Goldwick at the shop, or Professor Marrow at the academy. Press C to craft.', 'magic', '✦'), 700)
  setTimeout(() => ui.objective('Reach the academy and learn your first new spell'), 2600)
  setTimeout(() => {
    const q = QUESTS[0]
    if (!state.quests[q.id]?.complete) ui.toast('Pursuit — ' + q.title, q.hint, 'good', '❧')
  }, 4200)
})

$('sound-toggle').addEventListener('click', () => {
  audio.setEnabled(state.settings.sound)
})
/* ---------------------------------------------------------- INPUT */
const PANEL_KEYS = { c: 'wand', g: 'spells', b: 'shop', m: 'map', j: 'journal', k: 'school' }

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

/* ---------------------------------------------------------- MOVEMENT */
function moveVector() {
  const yaw = world.cameraYaw
  const fx2 = -Math.sin(yaw), fz2 = -Math.cos(yaw)
  const rx = Math.cos(yaw), rz = -Math.sin(yaw)
  let fwd = touchMove.fwd, side = touchMove.side
  if (keys.w || keys.arrowup) fwd += 1
  if (keys.s || keys.arrowdown) fwd -= 1
  if (keys.d || keys.arrowright) side += 1
  if (keys.a || keys.arrowleft) side -= 1
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

/* ---------------------------------------------------------- TOUCH CONTROLS */
function setupTouchControls() {
  const coarse = window.matchMedia?.('(pointer: coarse)')?.matches
  const touch = coarse || 'ontouchstart' in window || (navigator.maxTouchPoints || 0) > 0
  if (touch) document.body.classList.add('touch-ui')
  const root = $('mobile-controls')
  if (!root) return
  root.classList.remove('hidden')
  const zone = $('joystick-zone'), base = $('joystick-base'), knob = $('joystick-knob')
  if (base) {
    let pointerId = null, cx = 0, cy = 0
    const max = 44
    const setMove = (dx, dy) => {
      const d = Math.hypot(dx, dy)
      if (d > max) { dx = dx / d * max; dy = dy / d * max }
      knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`
      touchMove.side = dx / max
      touchMove.fwd = -dy / max
    }
    const start = e => {
      pointerId = e.pointerId
      const r = base.getBoundingClientRect()
      cx = r.left + r.width / 2; cy = r.top + r.height / 2
      base.setPointerCapture?.(e.pointerId)
      setMove(e.clientX - cx, e.clientY - cy)
      e.preventDefault(); e.stopPropagation()
    }
    const move = e => {
      if (pointerId !== e.pointerId) return
      setMove(e.clientX - cx, e.clientY - cy)
      e.preventDefault(); e.stopPropagation()
    }
    const end = e => {
      if (pointerId !== e.pointerId) return
      pointerId = null
      touchMove.fwd = 0; touchMove.side = 0
      knob.style.transform = 'translate(-50%,-50%)'
      e.preventDefault(); e.stopPropagation()
    }
    base.addEventListener('pointerdown', start)
    base.addEventListener('pointermove', move)
    base.addEventListener('pointerup', end)
    base.addEventListener('pointercancel', end)
    base.addEventListener('lostpointercapture', end)
  }
  root.querySelectorAll('[data-mact]').forEach(btn => {
    const act = btn.dataset.mact
    if (act === 'interact') {
      btn.addEventListener('click', e => { e.preventDefault(); if (canInteract()) tryInteract() })
    } else if (act === 'shield') {
      const on = e => { e.preventDefault(); keys.q = true; btn.classList.add('pressed') }
      const off = e => { e.preventDefault(); keys.q = false; btn.classList.remove('pressed') }
      btn.addEventListener('pointerdown', on)
      btn.addEventListener('pointerup', off)
      btn.addEventListener('pointercancel', off)
      btn.addEventListener('pointerleave', off)
    } else if (act === 'dodge') {
      btn.addEventListener('click', e => {
        e.preventDefault()
        if (duel.active && !paused) duel.dodge(moveVector())
      })
    }
  })
  root.querySelectorAll('[data-mcast]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault()
      if (duel.active && !paused) duel.tryCast(Number(btn.dataset.mcast))
    })
  })
  root.querySelectorAll('[data-mpanel]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault()
      if (canUsePanels()) ui.openPanel(btn.dataset.mpanel)
    })
  })
}
setupTouchControls()

/* ---------------------------------------------------------- INTERACTION */
const nodeState = id => state.nodeCooldowns[id] || 0

function availableNodes() {
  const now = Date.now()
  return NODES.filter(n => {
    if (n.bossOnly && !state.flags.bossDefeated) return false
    if (n.type === 'chest' && state.chestsOpened.includes(n.id)) return false
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
        : node.type === 'lore' ? `Read ${node.label}`
        : `Gather ${node.label}`
      best = { kind: 'node', node, label, d }; bestD = d
    }
  }
  return best
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
  if (node.type === 'lore') {
    const added = addLore(node.label, node.lore)
    audio.play('magic')
    ui.toast(node.label, node.lore, 'magic', '❧')
    if (added) ui.objective('Lore recorded in your journal')
    if (node.clue) {
      const clue = discoverClue(node.clue)
      if (clue.ok) {
        audio.play('upgrade')
        ui.toast('Academy secret found', `${clue.clue.title} · ${state.metrics.academySecrets}/${3} secrets recovered`, 'magic', '✦')
        if (clue.complete) {
          ui.objective('The Shattered Wand — Arcanum fragment recovered')
          ui.toast('The Shattered Wand', 'The three Arcanum secrets point to one buried fragment. The school has been keeping a decision warm for you.', 'magic', '☾')
        }
      }
    }
    ui.updateHUD()
    save()
  }
}

/* ---------------------------------------------------------- DIALOGUE ACTIONS */
function dialogueAction(opt, npc) {
  ui.closeDialogue()
  switch (opt.action) {
    case 'lessons':
      ui.openPanel('spells', opt.cat || 'offensive')
      break
    case 'school':
      ui.openPanel('school')
      break
    case 'potion':
      ui.openPanel('potions')
      break
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
      beginDuel(opt.duel, { arena: opt.arena })
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
let qualityAcc = 0, qualityFrames = 0, qualityTimer = 0
let qualityCap = world?.pixelCap || 1.6
function tuneQuality(dt) {
  if (!world || !started) return
  qualityAcc += 1 / Math.max(dt, 0.001)
  qualityFrames++
  qualityTimer += dt
  if (qualityTimer < 2) return
  const fps = qualityAcc / Math.max(1, qualityFrames)
  const maxCap = world.isMobile ? 1.2 : 1.6
  let next = qualityCap
  if (fps < 42) next = Math.max(1, qualityCap - 0.1)
  else if (fps > 57) next = Math.min(maxCap, qualityCap + 0.1)
  if (Math.abs(next - qualityCap) > 0.01) {
    qualityCap = next
    world.setPixelCap(qualityCap)
  }
  qualityAcc = 0; qualityFrames = 0; qualityTimer = 0
}

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
  fx.update(dt)
  tuneQuality(dt)
  duel.update(dt, { shield: !!keys.q && allowMove })
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
      if (nodeState(node.id) > Date.now()) visible = false
      if (world.nodes[node.id]) world.nodes[node.id].visible = visible
    }
    // zone change
    const zone = world.zone()
    if (zone && zone.id !== lastZoneId) {
      if (lastZoneId !== null && started) ui.toast(zone.name, zone.desc, 'magic', '⌖')
      lastZoneId = zone.id
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
window.addEventListener('resize', () => world?.onResize())
window.addEventListener('visibilitychange', () => { if (document.hidden) save() })
window.addEventListener('beforeunload', () => save())
setInterval(() => { if (started) save() }, 15000)

/* Expose small debug handle */
window.__wandlore = { world, ui, duel, state, save, beginDuel, travelTo }
