/* ============================================================
   WANDLORE — state.js
   Persistent game state, wand simulation, economy & progression.
   ============================================================ */

import {
  WOODS, CORES, FLEXIBILITIES, COMBOS, QUESTS, RANKS,
  BENCH_UPGRADES, STARTING_WAND, CUSTOMER_NAMES, CUSTOMER_PERSONAS,
  CUSTOMER_PREFS, CATEGORIES, SPELLS, SPELL_BY_ID, CATEGORY_SPELLS, RARITIES,
  DUELISTS, ACADEMY_ROOMS, ACADEMY_ASSIGNMENTS, SHATTERED_WAND, MISSIONS,
} from './data.js'

const SAVE_KEY = 'wandlore-legacy-v1'
export const woodById = Object.fromEntries(WOODS.map(w => [w.id, w]))
export const coreById = Object.fromEntries(CORES.map(c => [c.id, c]))
export const matById = { ...woodById, ...coreById }
export const allMaterials = [...WOODS, ...CORES]

const listeners = new Map()
export function on(evt, fn) {
  if (!listeners.has(evt)) listeners.set(evt, new Set())
  listeners.get(evt).add(fn)
  return () => listeners.get(evt)?.delete(fn)
}
export function emit(evt, payload) {
  for (const fn of listeners.get(evt) || []) {
    try { fn(payload) } catch (e) { console.error(e) }
  }
}

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const rand = (a, b) => a + Math.random() * (b - a)
const pick = arr => arr[Math.floor(Math.random() * arr.length)]

export function newState() {
  return {
    version: 1,
    createdAt: Date.now(),
    lastSave: Date.now(),
    playTime: 0,
    player: { name: 'Aster Vale', house: 'Ravenwood', level: 1, xp: 0, gold: 120, rep: 0, health: 100, mana: 100 },
    wands: [JSON.parse(JSON.stringify(STARTING_WAND))],
    equipped: 'starter',
    inventory: { oak: 2, willow: 2, unicorn: 1, dragon: 1, hawthorn: 1, pear: 1 },
    learned: { stupefy: { mastery: 0, learnedAt: Date.now() }, protego: { mastery: 0, learnedAt: Date.now() } },
    loadout: ['stupefy', 'protego'],
    discovered: ['oak:unicorn'],
    customers: [],
    upgrades: { bench: 0, lens: 0, kiln: 0, ledger: 0 },
    quests: {},
    metrics: {
      wandsCrafted: 0, spellsLearned: 0, duelsWon: 0, duelsLost: 0, wandsSold: 0,
      rareGathered: 0, combosDiscovered: 1, tournamentsWon: 0, bossDefeated: 0,
      goldEarned: 0, damageDealt: 0, materialsGathered: 0, duelsTotal: 0,
      academyLessons: 0, academyRooms: 0, potionsBrewed: 0, academyDuels: 0,
      wandShards: 0, academySecrets: 0, beastsDefeated: 0, academyAssignments: 0,
    },
    flags: { started: false, bossDefeated: false, bossLootGiven: false, tournamentComplete: false, blessing: false, enrolled: true },
    story: {
      missionIndex: 0,
      step: 0,
      flags: {},
      completed: [],
      startedAt: Date.now(),
    },
    academy: {
      year: 1,
      housePoints: 0,
      rooms: ['courtyard'],
      clues: [],
      secrets: [],
      classes: {},
      completed: [],
      potions: 0,
      restedAt: 0,
    },
    lore: [{ title: 'The Firstlight', text: 'Your first wand was oak and unicorn hair, eleven inches, supple. It was not beautiful. It was yours. That counts for more than the world admits.' }],
    creatures: [],
    tournament: { round: 0, complete: false, score: 0 },
    nodeCooldowns: {},
    chestsOpened: [],
    position: null,
    settings: { sound: true },
    title: 'Curious Novice',
  }
}

export let state = newState()
let loadedFromSave = false

export function hasSave() {
  try { return !!localStorage.getItem(SAVE_KEY) } catch { return false }
}

export function save() {
  try {
    state.lastSave = Date.now()
    const data = JSON.parse(JSON.stringify(state))
    localStorage.setItem(SAVE_KEY, data ? JSON.stringify(data) : '{}')
    loadedFromSave = true
  } catch (e) { console.warn('Save failed', e) }
}

export function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return false
    const data = JSON.parse(raw)
    if (!data || data.version !== 1) return false
    state = Object.assign(newState(), data)
    state.player = Object.assign(newState().player, data.player || {})
    state.metrics = Object.assign(newState().metrics, data.metrics || {})
    state.upgrades = Object.assign(newState().upgrades, data.upgrades || {})
    state.flags = Object.assign(newState().flags, data.flags || {})
    state.story = Object.assign(newState().story, data.story || {})
    state.story.flags = Object.assign({}, data.story?.flags || {})
    state.story.completed = Array.from(new Set(
      (Array.isArray(data.story?.completed) ? data.story.completed : []).filter(id => MISSIONS.some(m => m.id === id)),
    ))
    const savedMissionIndex = Math.max(0, Math.min(MISSIONS.length, Number(data.story?.missionIndex) || 0))
    const completedMissions = new Set(state.story.completed)
    let completedPrefix = 0
    while (completedPrefix < MISSIONS.length && completedMissions.has(MISSIONS[completedPrefix].id)) completedPrefix++
    state.story.missionIndex = Math.max(savedMissionIndex, completedPrefix)
    for (let i = 0; i < state.story.missionIndex; i++) completedMissions.add(MISSIONS[i].id)
    state.story.completed = MISSIONS.filter(m => completedMissions.has(m.id)).map(m => m.id)
    const currentMission = MISSIONS[state.story.missionIndex]
    state.story.step = currentMission
      ? Math.max(0, Math.min(currentMission.steps.length, Number(data.story?.step) || 0))
      : 0
    state.academy = Object.assign(newState().academy, data.academy || {})
    state.academy.rooms = Array.from(new Set(['courtyard', ...(data.academy?.rooms || []), ...(data.academy?.secrets?.includes('vault') ? ['vault'] : [])]))
    state.academy.clues = Array.from(new Set(data.academy?.clues || []))
    state.academy.secrets = Array.from(new Set(data.academy?.secrets || []))
    state.academy.completed = Array.from(new Set(data.academy?.completed || []))
    // Keep the derived counters in step with the actual collection so mission
    // steps that watch them do not stall on saves from before they existed.
    state.metrics.wandShards = Math.max(state.metrics.wandShards || 0, state.academy.clues.length)
    state.metrics.academyRooms = Math.max(state.metrics.academyRooms || 0, state.academy.rooms.length)
    state.metrics.academySecrets = Math.max(state.metrics.academySecrets || 0, state.academy.secrets.length)
    // Old saves pre-date the main story. Reconstruct the objective flags that
    // their progress already proves, so returning players are not asked to
    // repeat rooms, lessons or bosses they have finished.
    const storyFlags = state.story.flags
    if (state.academy.rooms.includes('grand_hall')) storyFlags.entered_halls = true
    if (state.academy.rooms.includes('vault') || state.academy.secrets.includes('vault')) {
      storyFlags.found_vault = true
      if (state.academy.clues.length >= 4) storyFlags.echoes_delivered = true
    }
    if ((state.metrics.academyLessons || 0) > 0) storyFlags.attended_lesson = true
    if (state.academy.clues.includes('clue_lake')) {
      storyFlags.visited_lake = true
      storyFlags.echo_lake = true
    }
    if (state.academy.clues.includes('clue_observatory')) {
      storyFlags.visited_observatory = true
      storyFlags.echo_observatory = true
    }
    if (state.academy.clues.length >= 2) storyFlags.echoes_2 = true
    if (state.flags.bossDefeated || state.metrics.bossDefeated) storyFlags.beat_morvane = true
    // Reports are only valid after their story events, even if an older build
    // allowed the player to select them early.
    if (!storyFlags.beat_lysandra) delete storyFlags.reported_feld
    if (!storyFlags.beat_morvane || !storyFlags.echoes_delivered) delete storyFlags.reported_marrow
    // repair equipped wand
    if (!state.wands.some(w => w.id === state.equipped)) state.equipped = state.wands[0]?.id || 'starter'
    state.loadout = (state.loadout || []).filter(id => state.learned[id])
    ensureLoadout()
    loadedFromSave = true
    return true
  } catch (e) { console.warn('Load failed', e); return false }
}

export function resetGame() {
  state = newState()
  try { localStorage.removeItem(SAVE_KEY) } catch {}
  loadedFromSave = false
}

/* ---------------------------------------------------------- CORE HELPERS */
export const maxHealth = () => 100 + (state.player.level - 1) * 10
export const maxMana = () => 100 + (state.player.level - 1) * 6
export const xpNeeded = () => 90 + (state.player.level - 1) * 70
export const rankTitle = () => {
  let t = RANKS[0].title
  for (const r of RANKS) if (state.player.rep >= r.rep) t = r.title
  return t
}
export const repProgress = () => {
  const idx = RANKS.findIndex(r => Math.floor(r.rep) > state.player.rep)
  const next = idx === -1 ? null : RANKS[idx]
  return { next, title: rankTitle() }
}

export function addGold(n, reason = '') {
  state.player.gold = Math.max(0, state.player.gold + n)
  if (n > 0) { state.metrics.goldEarned += n }
  emit('gold', { amount: n, reason })
  emit('hud')
}
export function spendGold(n) {
  if (state.player.gold < n) return false
  state.player.gold -= n
  emit('hud')
  return true
}
export function addRep(n) {
  if (!n) return
  state.player.rep = Math.max(0, state.player.rep + n)
  state.title = rankTitle()
  emit('rep', { amount: n, title: state.title })
  emit('hud')
}
export function addXp(n) {
  if (!n) return
  state.player.xp += n
  let leveled = 0
  while (state.player.xp >= xpNeeded()) {
    state.player.xp -= xpNeeded()
    state.player.level++
    leveled++
  }
  if (leveled) {
    state.player.health = maxHealth()
    state.player.mana = maxMana()
    emit('levelup', { level: state.player.level })
  }
  emit('xp', { amount: n, leveled })
  emit('hud')
}

export function countMat(id) { return state.inventory[id] || 0 }
export function addMat(id, qty = 1) {
  state.inventory[id] = (state.inventory[id] || 0) + qty
  state.metrics.materialsGathered += qty
  const m = matById[id]
  if (m && (m.rarity === 'rare' || m.rarity === 'legendary' || m.rarity === 'mythic')) {
    state.metrics.rareGathered += qty
    checkQuests()
  }
  emit('inventory', { id, qty })
  emit('hud')
}
export function removeMat(id, qty = 1) {
  if (countMat(id) < qty) return false
  state.inventory[id] -= qty
  if (state.inventory[id] <= 0) delete state.inventory[id]
  emit('inventory', { id, qty: -qty })
  return true
}

export function getEquippedWand() {
  return state.wands.find(w => w.id === state.equipped) || state.wands[0] || STARTING_WAND
}

/* ---------------------------------------------------------- WAND MATH */
export const WAND_NAME_PREFIX = {
  unicorn:'Dawn', phoenix:'Ember', dragon:'Wyrm', thunderbird:'Storm', thestral:'Veil',
  kelpie:'Tide', basilisk:'Venom', veela:'Enchant', troll:'Iron', augurey:'Mourn',
  manticore:'Thorn', demiguise:'Glimmer', voidheart:'Null',
}
export const WAND_NAME_SUFFIX = {
  oak:'Oath', willow:'Song', ash:'Ward', holly:'Pierce', hawthorn:'Knot', vine:'Coil',
  cedar:'Root', pear:'Hearth', walnut:'Gambit', redwood:'Crown', acacia:'Spur',
  rosewood:'Bloom', ebony:'Void', silverlime:'Moth', yew:'Grave', blackthorn:'Bane',
  elder:'Reverie', dragonbone:'Roar', moonash:'Veil', starglass:'Requiem',
}

export function formatLength(len) {
  const whole = Math.floor(len)
  const frac = Math.round((len - whole) * 4)
  const glyphs = ['', '¼', '½', '¾']
  if (frac === 4) return `${whole + 1}″`
  return `${whole}${glyphs[frac]}″`
}

export function computeWand({ woodId, coreId, length = 12, flex = 'supple', quality = 1 }) {
  const wood = woodById[woodId], core = coreById[coreId]
  if (!wood || !core) return null
  const flexDef = FLEXIBILITIES.find(f => f.id === flex) || FLEXIBILITIES[2]
  const q = clamp(quality, 0.85, 1.2)
  const stats = {
    power: Math.round(clamp(5 + (wood.stats.power + core.stats.power) * 3.55 + flexDef.mods.power * 1.7 + (length - 12) * 3.1 + (q - 1) * 95, 8, 99)),
    control: Math.round(clamp(5 + (wood.stats.control + core.stats.control) * 3.55 + flexDef.mods.control * 1.7 + (12 - length) * 1.4 + (q - 1) * 80, 8, 99)),
    finesse: Math.round(clamp(5 + (wood.stats.finesse + core.stats.finesse) * 3.55 + flexDef.mods.finesse * 1.7 + (12 - length) * 1.1 + (q - 1) * 85, 8, 99)),
  }
  const rating = Math.round((stats.power * 1.05 + stats.control + stats.finesse * 1.05) / 3)
  let rarityOrder = Math.max(RARITIES[wood.rarity].order, RARITIES[core.rarity].order)
  if (wood.rarity === core.rarity && rarityOrder >= 2) rarityOrder = Math.min(4, rarityOrder + 1)
  if (q >= 1.12 && rarityOrder < 4) rarityOrder = Math.min(4, rarityOrder + 1)
  const rarity = Object.keys(RARITIES).find(k => RARITIES[k].order === rarityOrder)

  const key = `${woodId}:${coreId}`
  const combo = COMBOS[key]
  let ability
  if (combo) {
    ability = { name: combo.name, desc: combo.desc, bonuses: combo.bonuses, special: combo.special, legendary: true }
  } else {
    const tags = new Set([...wood.tags, ...core.tags])
    const bonuses = {}
    for (const cat of Object.keys(CATEGORIES)) {
      if (wood.tags.includes(cat) && core.tags.includes(cat)) bonuses[cat] = 0.16
      else if (tags.has(cat)) bonuses[cat] = 0.07
    }
    const dominant = Object.entries(bonuses).sort((a, b) => b[1] - a[1])[0]?.[0] || 'offensive'
    ability = {
      name: `${WAND_NAME_PREFIX[coreId] || 'Wild'} Resonance`,
      desc: `An honest union of ${wood.name.toLowerCase()} and ${core.name.toLowerCase()}. ${CATEGORIES[dominant].label} magic is especially responsive.`,
      bonuses, special: null, legendary: false,
    }
  }

  const value = Math.round((wood.price + core.price * 1.25 + 22) * RARITIES[rarity].mult * (0.7 + rating / 110) * q)
  return {
    id: 'w' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    wood: woodId, core: coreId, length, flex, quality: Number(q.toFixed(3)),
    name: `${WAND_NAME_PREFIX[coreId] || 'Wild'} ${WAND_NAME_SUFFIX[woodId] || 'Wand'}`,
    ability, stats, rating, rarity, value, rarityOrder,
    createdAt: Date.now(), equipped: false,
  }
}

export function wandAffinities(wand) {
  if (!wand) return {}
  const wood = woodById[wand.wood], core = coreById[wand.core]
  const out = {}
  for (const cat of Object.keys(CATEGORIES)) {
    let a = 0.015
    if (wood?.tags.includes(cat)) a += 0.12
    if (core?.tags.includes(cat)) a += 0.1
    const bonus = wand.ability?.bonuses?.[cat]
    if (bonus) a += bonus
    out[cat] = clamp(a, 0, 0.75)
  }
  return out
}

export function wandCorePassive(wand) {
  return coreById[wand?.core]?.passive || null
}

export function qualityLabel(q) {
  if (q >= 1.12) return 'Masterwork'
  if (q >= 1.04) return 'Exceptional'
  if (q >= 0.97) return 'Fine'
  return 'Serviceable'
}

export function craftCost(woodId, coreId) {
  const wood = woodById[woodId], core = coreById[coreId]
  if (!wood || !core) return 0
  return 24 + Math.round((wood.price + core.price) * 0.12)
}

export function craftWand({ woodId, coreId, length, flex }) {
  const wood = woodById[woodId], core = coreById[coreId]
  if (!wood || !core) return { ok: false, error: 'Choose a wood and a core.' }
  if (countMat(woodId) < 1) return { ok: false, error: `You have no ${wood.name}.` }
  if (countMat(coreId) < 1) return { ok: false, error: `You have no ${core.name}.` }
  const cost = craftCost(woodId, coreId)
  if (state.player.gold < cost) return { ok: false, error: `You need ${cost} galleons to bind this wand.` }

  state.player.gold -= cost
  removeMat(woodId, 1)
  const kilnKeep = state.upgrades.kiln > 0 && Math.random() < 0.18 * state.upgrades.kiln
  if (!kilnKeep) removeMat(coreId, 1)
  const quality = clamp(0.93 + Math.random() * 0.11 + state.upgrades.bench * 0.018 + (state.flags.blessing ? 0.035 : 0.01), 0.9, 1.2)
  state.flags.blessing = false
  const wand = computeWand({ woodId, coreId, length, flex, quality })
  state.wands.push(wand)
  if (state.wands.length === 2) state.equipped = wand.id
  wand.equipped = wand.id === state.equipped
  state.metrics.wandsCrafted++
  addXp(18 + RARITIES[wand.rarity].order * 6)

  const key = `${woodId}:${coreId}`
  let discovery = null
  if (!state.discovered.includes(key)) {
    state.discovered.push(key)
    state.metrics.combosDiscovered = state.discovered.length
    addRep(1 + RARITIES[wand.rarity].order * 2)
    if (wand.ability.legendary) {
      discovery = { key, name: wand.ability.name }
      addXp(40)
    }
  }
  emit('craft', { wand, discovery, kilnKeep })
  checkQuests()
  emit('hud')
  save()
  return { ok: true, wand, discovery, kilnKeep }
}

export function equipWand(id) {
  if (!state.wands.some(w => w.id === id)) return false
  state.equipped = id
  for (const w of state.wands) w.equipped = w.id === id
  state.player.health = Math.min(state.player.health, maxHealth())
  emit('equip', getEquippedWand())
  emit('hud')
  save()
  return true
}

export function sellWand(wandId, customerId) {
  const wand = state.wands.find(w => w.id === wandId)
  const cust = state.customers.find(c => c.id === customerId)
  if (!wand || !cust) return { ok: false, error: 'That sale is no longer possible.' }
  if (wand.id === state.equipped) return { ok: false, error: 'Equip a different wand before selling this one.' }
  const offer = customerOffer(cust, wand)
  if (!offer.interested) return { ok: false, error: `${cust.name} is politely unimpressed by that wand.` }
  const price = offer.offer
  state.wands = state.wands.filter(w => w.id !== wandId)
  state.player.gold += price
  state.metrics.goldEarned += price
  state.metrics.wandsSold++
  const gainedRep = 1 + Math.floor(Math.max(0, offer.match - 0.8) * 3)
  addRep(gainedRep)
  addXp(12 + offer.match * 15)
  const idx = state.customers.findIndex(c => c.id === customerId)
  state.customers[idx] = makeCustomer()
  emit('sale', { wand, customer: cust, price, match: offer.match, rep: gainedRep })
  checkQuests()
  emit('hud')
  save()
  return { ok: true, price, match: offer.match, rep: gainedRep }
}

export function makeCustomer() {
  const pref = pick(CUSTOMER_PREFS)
  const rarityPref = Math.random() < 0.36 ? 'rare' : null
  const levelBonus = state.player.rep * 1.4
  return {
    id: 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
    name: pick(CUSTOMER_NAMES),
    persona: pick(CUSTOMER_PERSONAS),
    pref, rarityPref,
    budget: Math.round(rand(85, 340) + levelBonus + state.upgrades.ledger * 45),
    patience: Math.floor(rand(2, 5)),
  }
}

export function refreshCustomers(count = 3) {
  if (!state.customers || state.customers.length === 0) {
    state.customers = Array.from({ length: count }, () => makeCustomer())
  }
  return state.customers
}

export function customerOffer(cust, wand) {
  const aff = wandAffinities(wand)[cust.pref] || 0
  let match = 0.72
  if (aff >= 0.24) match += 0.34
  else if (aff >= 0.14) match += 0.2
  else if (aff >= 0.07) match += 0.08
  if (cust.rarityPref === 'rare' && RARITIES[wand.rarity].order >= 2) match += 0.18
  if (wand.ability?.legendary) match += 0.1
  if (wand.control > 75) match += 0.04
  match += state.upgrades.ledger * 0.07
  const offer = Math.round(wand.value * match)
  const interested = offer <= cust.budget * 1.05
  return { offer: Math.min(offer, cust.budget), raw: offer, match, interested, affinity: aff }
}

export function buyUpgrade(id) {
  const def = BENCH_UPGRADES.find(u => u.id === id)
  if (!def) return { ok: false, error: 'Unknown upgrade.' }
  const lvl = state.upgrades[id] || 0
  if (lvl >= def.max) return { ok: false, error: 'Already fully upgraded.' }
  const cost = def.cost[lvl]
  if (!spendGold(cost)) return { ok: false, error: `You need ${cost} galleons.` }
  state.upgrades[id] = lvl + 1
  addRep(2)
  addXp(25)
  emit('upgrade', { id, level: lvl + 1 })
  emit('hud')
  save()
  return { ok: true, level: lvl + 1 }
}

/* ---------------------------------------------------------- SPELLS */
export function categoryUnlocked(cat) {
  return state.player.rep >= (CATEGORIES[cat]?.reqRep || 0)
}
export function isLearned(spellId) { return !!state.learned[spellId] }
export function masteryOf(spellId) { return state.learned[spellId]?.mastery || 0 }
export function masteryRank(spellId) {
  const m = masteryOf(spellId)
  if (m >= 7) return 3
  if (m >= 3) return 2
  return 1
}
export function learnedSpells() {
  return SPELLS.filter(s => state.learned[s.id])
}
export function categoryLearned(cat) {
  return CATEGORY_SPELLS[cat].filter(s => state.learned[s.id]).length
}
export function nextLessonSpell(cat) {
  const spells = CATEGORY_SPELLS[cat]
  const unlearned = spells.find(s => !state.learned[s.id])
  if (unlearned) return { spell: unlearned, isNew: true }
  if (!spells.length) return null
  const weakest = [...spells].sort((a, b) => masteryOf(a.id) - masteryOf(b.id))[0]
  return { spell: weakest, isNew: false }
}
export function completeLesson(cat, perfect = false) {
  const target = nextLessonSpell(cat)
  if (!target) return null
  const { spell, isNew } = target
  const bonus = perfect ? 2 : 1
  if (isNew) {
    state.learned[spell.id] = { mastery: 0, learnedAt: Date.now() }
    state.metrics.spellsLearned++
  } else {
    state.learned[spell.id].mastery = Math.min(10, (state.learned[spell.id].mastery || 0) + bonus)
  }
  ensureLoadout()
  state.metrics.academyLessons = (state.metrics.academyLessons || 0) + 1
  state.academy.classes[cat] = (state.academy.classes[cat] || 0) + 1
  state.academy.housePoints = (state.academy.housePoints || 0) + 2
  state.story.flags.attended_lesson = true
  addXp(isNew ? 35 : 12)
  addRep(isNew ? 2 : 0)
  checkQuests()
  checkAcademyAssignments()
  checkMissionProgress()
  emit('lesson', { spell, isNew, perfect })
  emit('hud')
  save()
  return { spell, isNew, mastery: masteryOf(spell.id), rank: masteryRank(spell.id) }
}

export function ensureLoadout() {
  const learned = learnedSpells().map(s => s.id)
  state.loadout = (state.loadout || []).filter(id => state.learned[id])
  for (const id of learned) {
    if (state.loadout.length >= 4) break
    if (!state.loadout.includes(id)) state.loadout.push(id)
  }
  if (state.loadout.length === 0 && learned.length) state.loadout = learned.slice(0, 4)
}

export function toggleLoadout(spellId) {
  if (!state.learned[spellId]) return { ok: false, error: 'You have not learned that spell.' }
  const idx = state.loadout.indexOf(spellId)
  if (idx >= 0) {
    state.loadout.splice(idx, 1)
    return { ok: true, removed: true }
  }
  if (state.loadout.length >= 4) return { ok: false, error: 'Your quick-cast bar is full. Remove a spell first.' }
  state.loadout.push(spellId)
  save()
  return { ok: true }
}

export function spellPower(spell, wand = getEquippedWand()) {
  const aff = wandAffinities(wand)[spell.cat] || 0
  const rank = masteryRank(spell.id)
  const power = wand.stats.power / 100
  const level = 1 + (state.player.level - 1) * 0.05
  const passive = coreById[wand.core]?.id
  let coreMult = 1
  if (passive === 'dragon') coreMult += 0.1
  if (passive === 'voidheart') coreMult += 0.15
  if (passive === 'thunderbird' && spell.cat === 'elemental') coreMult += 0.15
  return (spell.power || 10) * (0.62 + power * 0.9) * (1 + aff) * (1 + (rank - 1) * 0.15) * level * coreMult
}

export function spellCooldown(spell, wand = getEquippedWand()) {
  let cd = spell.cd
  if (wand.core === 'demiguise') cd *= 0.85
  if (wand.ability?.special === 'haste' && spell.cat === 'elemental') cd *= 0.85
  if (wand.ability?.special === 'freeform' && spell.cat === 'transformation') cd *= 0.85
  return Math.max(0.35, cd)
}
export function spellMana(spell, wand = getEquippedWand()) {
  let m = spell.mana
  if (wand.core === 'kelpie' && spell.cat === 'transformation') m *= 0.8
  if (wand.ability?.special === 'cosmic') m *= 0.85
  return Math.round(m)
}

/* ---------------------------------------------------------- QUESTS */
export function questProgress(q) {
  if (q.id === 'q_boss') return state.metrics.bossDefeated ? 1 : 0
  return Math.min(q.target, state.metrics[q.metric] || 0)
}
export function checkQuests() {
  for (const q of QUESTS) {
    if (state.quests[q.id]?.complete) continue
    if (questProgress(q) >= q.target) {
      state.quests[q.id] = { complete: true, at: Date.now() }
      state.player.gold += q.gold
      state.metrics.goldEarned += q.gold
      addXp(q.xp)
      addRep(q.rep)
      emit('questComplete', q)
    }
  }
  emit('hud')
}

export function activeQuests() {
  return QUESTS.filter(q => !state.quests[q.id]?.complete).slice(0, 3)
}

/* ---------------------------------------------------------- MAIN STORY */
export function storyFlag(flag) {
  return !!(flag && state.story?.flags?.[flag])
}

export function missionAt(index = state.story?.missionIndex || 0) {
  return MISSIONS[index] || null
}

export function currentMission() {
  return missionAt()
}

export function currentMissionStep() {
  const m = currentMission()
  return m ? m.steps[state.story.step] || null : null
}

export function missionStepProgress(step) {
  if (!step) return { cur: 0, target: 1 }
  if (step.flag) return { cur: storyFlag(step.flag) ? 1 : 0, target: 1 }
  if (step.metric) return { cur: Math.min(step.target, state.metrics[step.metric] || 0), target: step.target }
  if (step.rep) return { cur: Math.min(step.target, state.player.rep || 0), target: step.target }
  if (step.quest) return { cur: state.quests[step.quest]?.complete ? step.target : 0, target: step.target }
  return { cur: 0, target: 1 }
}

export function storySummary() {
  const mission = currentMission()
  const stepIndex = state.story?.step || 0
  const step = mission?.steps[stepIndex] || null
  return {
    mission,
    step,
    stepIndex,
    stepCount: mission?.steps.length || 0,
    progress: step ? missionStepProgress(step) : { cur: 0, target: 1 },
    completed: state.story?.completed || [],
    missionIndex: state.story?.missionIndex || 0,
    totalMissions: MISSIONS.length,
    finished: !mission,
  }
}

export function setStoryFlag(flag) {
  if (!flag) return false
  if (!state.story) state.story = newState().story
  const prerequisites = {
    reported_feld: ['beat_lysandra'],
    reported_marrow: ['beat_morvane', 'echoes_delivered'],
  }[flag]
  if (prerequisites?.some(required => !state.story.flags[required])) return false
  if (state.story.flags[flag]) return false
  state.story.flags[flag] = true
  state.title = rankTitle()
  emit('storyFlag', { flag })
  const advanced = checkMissionProgress()
  if (!advanced) emit('hud')
  save()
  return true
}

export function checkMissionProgress() {
  if (!state.story) state.story = newState().story
  let changed = false
  for (let guard = 0; guard < 16; guard++) {
    const mission = MISSIONS[state.story.missionIndex]
    if (!mission) break
    const step = mission.steps[state.story.step]
    if (step) {
      const p = missionStepProgress(step)
      if (p.cur < p.target) break
      state.story.step++
      changed = true
      emit('missionStep', { mission, step, stepIndex: state.story.step - 1 })
      continue
    }
    if (!state.story.completed.includes(mission.id)) {
      state.story.completed.push(mission.id)
      const reward = mission.reward || {}
      state.player.gold += reward.gold || 0
      state.metrics.goldEarned += reward.gold || 0
      addXp(reward.xp || 0)
      addRep(reward.rep || 0)
      state.story.missionIndex++
      state.story.step = 0
      changed = true
      emit('missionComplete', { mission, reward })
      continue
    }
    state.story.missionIndex++
    state.story.step = 0
    changed = true
  }
  if (changed) { save(); emit('hud') }
  return changed
}

export function visitZone(zoneId) {
  if (!zoneId) return
  if (zoneId === 'observatory') setStoryFlag('visited_observatory')
  if (zoneId === 'lake') setStoryFlag('visited_lake')
}

/* ---------------------------------------------------------- LORE */
export function addLore(title, text) {
  if (state.lore.some(l => l.title === title)) return false
  state.lore.push({ title, text })
  addXp(15)
  addRep(1)
  save()
  return true
}
export function addCreature(name, where) {
  if (state.creatures.some(c => c.name === name)) return false
  state.creatures.push({ name, where })
  addXp(20)
  addRep(1)
  save()
  return true
}

/* ---------------------------------------------------------- ACADEMY */
export function academyMetric(metric) {
  return state.metrics[metric] || 0
}

export function academyAssignmentProgress(a) {
  return Math.min(a.target, academyMetric(a.metric))
}

export function academyRoomById(id) {
  return ACADEMY_ROOMS.find(r => r.id === id)
}

export function academyCompleteCount() {
  return state.academy?.completed?.length || 0
}

export function checkAcademyAssignments() {
  if (!state.academy) state.academy = newState().academy
  let changed = false
  for (const a of ACADEMY_ASSIGNMENTS) {
    if (state.academy.completed.includes(a.id)) continue
    if (academyAssignmentProgress(a) < a.target) continue
    state.academy.completed.push(a.id)
    state.player.gold += a.gold
    state.metrics.goldEarned += a.gold
    state.academy.housePoints += 10
    addXp(a.xp)
    addRep(a.rep)
    emit('academyAssignment', a)
    changed = true
  }
  const year = Math.min(7, 1 + Math.floor((state.academy.completed.length || 0) / 2))
  state.metrics.academyAssignments = state.academy.completed.length
  if (year > (state.academy.year || 1)) {
    state.academy.year = year
    emit('academyYear', year)
    changed = true
  }
  if (changed) { emit('hud'); save(); checkMissionProgress() }
  return changed
}

export function discoverRoom(id, { silent = false } = {}) {
  if (!state.academy) state.academy = newState().academy
  if (!id || state.academy.rooms.includes(id)) return false
  const room = academyRoomById(id)
  if (!room) return false
  state.academy.rooms.push(id)
  state.metrics.academyRooms = state.academy.rooms.length
  state.academy.housePoints += 2
  if (id === 'grand_hall') state.story.flags.entered_halls = true
  addXp(18)
  addRep(1)
  checkAcademyAssignments()
  checkQuests()
  checkMissionProgress()
  emit('academyRoom', room)
  if (!silent) emit('hud')
  save()
  return true
}

export function discoverSecret(id) {
  if (!state.academy) state.academy = newState().academy
  if (!id || state.academy.secrets.includes(id)) return false
  state.academy.secrets.push(id)
  state.metrics.academySecrets = state.academy.secrets.length
  if (id === 'vault') {
    state.story.flags.found_vault = true
    if (state.academy.clues.length >= 4) state.story.flags.echoes_delivered = true
    discoverRoom('vault')
  }
  state.academy.housePoints += 5
  addXp(35)
  addRep(3)
  checkAcademyAssignments()
  checkQuests()
  checkMissionProgress()
  emit('academySecret', { id })
  emit('hud')
  save()
  return true
}

export function addWandShard(id) {
  if (!state.academy) state.academy = newState().academy
  if (!id || state.academy.clues.includes(id)) return false
  if (!state.story) state.story = newState().story
  state.academy.clues.push(id)
  state.metrics.wandShards = state.academy.clues.length
  state.story.flags['echo_' + id] = true
  // The lake and observatory echoes use short story flags because their
  // mission steps are written as "ring the bell" and "use the telescope".
  if (id === 'clue_lake') state.story.flags.echo_lake = true
  if (id === 'clue_observatory') state.story.flags.echo_observatory = true
  if (state.academy.clues.length >= 2) state.story.flags.echoes_2 = true
  state.academy.housePoints += 4
  addXp(30)
  addRep(2)
  checkAcademyAssignments()
  checkQuests()
  checkMissionProgress()
  emit('academyClue', { id })
  emit('hud')
  save()
  return true
}

export function shardProgress() {
  return {
    found: state.academy?.clues?.length || 0,
    total: 6,
    target: 4,
    title: SHATTERED_WAND.title,
    intro: SHATTERED_WAND.intro,
    final: SHATTERED_WAND.final,
  }
}

export function brewPotion() {
  if (!state.academy) state.academy = newState().academy
  if (countMat('willow') < 1 || countMat('unicorn') < 1) {
    return { ok: false, error: 'You need one willow switch and one unicorn hair. The cauldron refuses to improvise.' }
  }
  removeMat('willow', 1)
  removeMat('unicorn', 1)
  state.player.health = maxHealth()
  state.player.mana = maxMana()
  state.metrics.potionsBrewed++
  state.academy.potions = (state.academy.potions || 0) + 1
  state.academy.housePoints += 1
  addXp(18)
  addRep(1)
  checkAcademyAssignments()
  checkQuests()
  emit('academyPotion', { count: state.academy.potions })
  emit('hud')
  save()
  return { ok: true, health: maxHealth(), mana: maxMana() }
}

export function restAtDorm() {
  if (!state.academy) state.academy = newState().academy
  const healed = maxHealth() - state.player.health
  const mana = maxMana() - state.player.mana
  state.player.health = maxHealth()
  state.player.mana = maxMana()
  state.academy.restedAt = Date.now()
  state.academy.housePoints += 1
  addXp(6)
  checkAcademyAssignments()
  emit('hud')
  save()
  return { healed: Math.round(healed), mana: Math.round(mana) }
}

/* ---------------------------------------------------------- DUEL REWARDS */
export function grantDuelRewards(enemyId, victory, opts = {}) {
  const def = DUELISTS[enemyId]
  if (!def) return null
  if (!victory) {
    state.metrics.duelsLost++
    state.metrics.duelsTotal++
    addXp(10)
    emit('hud')
    save()
    return { gold: 0, rep: 0, xp: 10 }
  }
  const gold = Math.round(rand(def.gold[0], def.gold[1]))
  const xp = def.xp
  const rep = def.rep
  state.player.gold += gold
  state.metrics.goldEarned += gold
  state.metrics.duelsWon++
  state.metrics.duelsTotal++
  state.story.flags['beat_' + enemyId] = true
  if (enemyId === 'gloomfang' || enemyId === 'warden') {
    state.metrics.beastsDefeated = (state.metrics.beastsDefeated || 0) + 1
  }
  addXp(xp)
  addRep(rep)
  if (opts.academy) {
    state.metrics.academyDuels = (state.metrics.academyDuels || 0) + 1
    state.academy.housePoints = (state.academy.housePoints || 0) + 3
    checkAcademyAssignments()
  }
  if (opts.boss) state.story.flags.beat_morvane = true
  if (opts.tournament) state.tournament.score += 10 + rep * 2
  checkQuests()
  checkMissionProgress()
  emit('hud')
  save()
  return { gold, rep, xp }
}

export function tournamentRanks() {
  const rows = [
    ...TOURNAMENT_RANKS_FALLBACK(),
    { name: 'Aster Vale', score: Math.round(state.tournament.score || 0), you: true },
  ]
  return rows.sort((a, b) => b.score - a.score)
}
function TOURNAMENT_RANKS_FALLBACK() {
  return [
    { name: 'Morvane the Hollow', score: 128 }, { name: 'Sergeant Rook', score: 96 },
    { name: 'Professor Marrow', score: 91 }, { name: 'Garrick Sloane', score: 64 },
    { name: 'Tobias Flint', score: 58 }, { name: 'Elara Vex', score: 41 },
  ]
}

export function isLoadedFromSave() { return loadedFromSave }
