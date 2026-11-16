/* ============================================================
   WANDLORE — state.js
   Persistent game state, wand simulation, economy & progression.
   ============================================================ */

import {
  WOODS, CORES, FLEXIBILITIES, COMBOS, QUESTS, RANKS,
  BENCH_UPGRADES, STARTING_WAND, CUSTOMER_NAMES, CUSTOMER_PERSONAS,
  CUSTOMER_PREFS, CATEGORIES, SPELLS, SPELL_BY_ID, CATEGORY_SPELLS, RARITIES,
  DUELISTS, ACADEMY_ASSIGNMENTS, POTIONS, ACADEMY_CLUES, LORE,
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

export function newSchool() {
  return {
    year: 1,
    house: 'Ravenwood',
    points: 0,
    assignments: {},
    potions: {},
    clues: [],
    metrics: { lessons: 0, potions: 0, academyDuelsWon: 0, wands: 0, secrets: 0 },
  }
}

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
      academySecrets: 0, potionsBrewed: 0,
    },
    school: newSchool(),
    flags: { started: false, bossDefeated: false, bossLootGiven: false, tournamentComplete: false, blessing: false, academyFragment: false },
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
    const freshSchool = newSchool()
    state.school = Object.assign(freshSchool, data.school || {})
    state.school.metrics = Object.assign(freshSchool.metrics, data.school?.metrics || {})
    state.school.assignments = Object.assign({}, data.school?.assignments || {})
    state.school.potions = Object.assign({}, data.school?.potions || {})
    state.school.clues = Array.isArray(data.school?.clues) ? data.school.clues.slice() : []
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
  schoolMetric('wands', 1)
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
  schoolMetric('lessons', 1)
  addXp(isNew ? 35 : 12)
  addRep(isNew ? 2 : 0)
  checkQuests()
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

/* ---------------------------------------------------- ARCANUM SCHOOL */
export function schoolMetric(metric, n = 1) {
  if (!state.school) state.school = newSchool()
  if (!state.school.metrics) state.school.metrics = newSchool().metrics
  state.school.metrics[metric] = (state.school.metrics[metric] || 0) + n
  if (metric === 'lessons' || metric === 'potions' || metric === 'academyDuelsWon') state.school.points += n
  emit('school', { metric })
  emit('hud')
}

export function schoolMetricValue(metric) {
  return Math.max(0, (state.school?.metrics?.[metric] || 0))
}

export function academyAssignment(id) {
  return ACADEMY_ASSIGNMENTS.find(a => a.id === id)
}

export function assignmentProgress(a) {
  return Math.min(a.target, schoolMetricValue(a.metric))
}

export function assignmentReady(a) {
  return assignmentProgress(a) >= a.target
}

export function claimAssignment(id) {
  const a = academyAssignment(id)
  if (!a) return { ok: false, error: 'That assignment is not on the ledger.' }
  if (state.school.assignments[id]) return { ok: false, error: 'Already marked complete.' }
  if (!assignmentReady(a)) return { ok: false, error: 'The work is not finished yet.' }
  state.school.assignments[id] = { at: Date.now() }
  state.player.gold += a.gold
  state.metrics.goldEarned += a.gold
  state.school.points += 3
  addXp(a.xp)
  addRep(a.rep)
  addLore(`Assignment: ${a.title}`, `Professor Vane marked your work complete: ${a.desc} The Academy notes that you keep your promises, which is rarer than talent.`)
  emit('assignment', { assignment: a })
  checkQuests()
  save()
  return { ok: true, assignment: a }
}

export function academyYearTitle() {
  const points = state.school?.points || 0
  if (points >= 42) return 'Seventh-Year Legend'
  if (points >= 30) return 'Sixth-Year Adept'
  if (points >= 20) return 'Fifth-Year Duelist'
  if (points >= 12) return 'Fourth-Year Scholar'
  if (points >= 6) return 'Third-Year Apprentice'
  if (points >= 2) return 'Second-Year Student'
  return 'First-Year Student'
}

export function canBrew(id) {
  const recipe = POTIONS.find(p => p.id === id)
  if (!recipe) return false
  return Object.entries(recipe.cost).every(([mat, qty]) => countMat(mat) >= qty)
}

export function brewPotion(id) {
  const recipe = POTIONS.find(p => p.id === id)
  if (!recipe) return { ok: false, error: 'No such recipe.' }
  for (const [mat, qty] of Object.entries(recipe.cost)) {
    if (countMat(mat) < qty) return { ok: false, error: `You need more ${matById[mat]?.name || mat}.` }
  }
  for (const [mat, qty] of Object.entries(recipe.cost)) removeMat(mat, qty)
  state.school.potions[id] = (state.school.potions[id] || 0) + 1
  state.metrics.potionsBrewed++
  schoolMetric('potions', 1)
  let effect = ''
  if (id === 'vitality') {
    state.player.health = maxHealth()
    effect = 'Health restored to full.'
    addXp(20)
  } else if (id === 'ember') {
    addXp(55); addRep(1)
    effect = 'Courage settles in your chest: +55 xp, +1 reputation.'
  } else if (id === 'clarity') {
    const unknown = Object.keys(COMBOS).filter(k => !state.discovered.includes(k))
    if (unknown.length) {
      const key = pick(unknown)
      state.discovered.push(key)
      state.metrics.combosDiscovered = state.discovered.length
      effect = `A resonance reveals itself: ${COMBOS[key].name}.`
      addXp(35)
    } else {
      effect = 'The page is blank; you already know every resonance. +35 xp.'
      addXp(35)
    }
  } else if (id === 'foundation') {
    addRep(1); addXp(30)
    effect = 'The school feels a little more familiar: +1 reputation, +30 xp.'
  }
  emit('brew', { potion: recipe, effect })
  checkQuests()
  emit('hud')
  save()
  return { ok: true, potion: recipe, effect }
}

export function discoverClue(id) {
  const clue = ACADEMY_CLUES.find(c => c.id === id)
  if (!clue) return { ok: false, error: 'Unknown secret.' }
  if (state.school.clues.includes(id)) return { ok: false, already: true }
  state.school.clues.push(id)
  state.metrics.academySecrets++
  schoolMetric('secrets', 1)
  const reward = clue.reward || {}
  if (reward.mat) addMat(reward.mat, reward.qty || 1)
  addXp(reward.xp || 40)
  addRep(reward.rep || 1)
  addLore(clue.title, clue.fragment)
  let complete = null
  if (state.school.clues.length >= ACADEMY_CLUES.length) {
    state.flags.academyFragment = true
    addLore('The Shattered Wand — Arcanum Fragment', LORE.fragment.text)
    addXp(120)
    addRep(4)
    complete = { fragment: true }
  }
  checkQuests()
  save()
  return { ok: true, clue, complete }
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
  if (['elara', 'tobias', 'sable', 'marrow'].includes(enemyId)) schoolMetric('academyDuelsWon', 1)
  addXp(xp)
  addRep(rep)
  if (opts.tournament) state.tournament.score += 10 + rep * 2
  checkQuests()
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
