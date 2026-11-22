// Save, profile, progression, economy and balance systems.
import {
  BIKES, BIKE_MAP, RARITIES, STAT_KEYS, COSMETICS, COSMETIC_MAP, DEFAULT_COSMETICS,
  TRACKS, TRACK_MAP, CHALLENGE_POOL, ACHIEVEMENTS, XP_TABLE, MAX_LEVEL,
  CHAMPIONSHIP_EVENTS, MODES,
} from './data.js'

const KEY = 'tron_neon_overdrive_v1'
const SAVE_VERSION = 1

export const UPGRADE_MAX = 5
export const UPGRADE_STEP = 2.4
export const UPGRADE_COSTS = [
  { credits: 900, cores: 1 },
  { credits: 1800, cores: 2 },
  { credits: 3200, cores: 3 },
  { credits: 5200, cores: 5 },
  { credits: 8000, cores: 8 },
]

const todayKey = () => new Date().toISOString().slice(0, 10)
const weekKey = () => {
  const d = new Date()
  const onejan = new Date(d.getFullYear(), 0, 1)
  const week = Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7)
  return `${d.getFullYear()}-W${String(week).padStart(2, '0')}`
}

const rngFromSeed = (seed) => {
  let h = 2166136261 >>> 0
  const str = String(seed)
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) }
  return () => {
    h += 0x6D2B79F5
    let t = h
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const emptyStats = () => ({
  races: 0, wins: 0, takedowns: 0, boostTime: 0, distance: 0, laps: 0, driftTime: 0,
  jumps: 0, cleanWins: 0, bestWave: 0, upgrades: 0, playTime: 0, crashes: 0, creditsEarned: 0,
})

export const defaultProfile = () => ({
  version: SAVE_VERSION,
  created: Date.now(),
  name: 'USER_01',
  icon: '◉',
  level: 1,
  xp: 0,
  credits: 3200,
  cores: 12,
  ownedBikes: ['gridrunner', 'apex-trace'],
  equipped: 'gridrunner',
  bikes: {},
  ownedCosmetics: [...DEFAULT_COSMETICS],
  rider: {
    outfit: 'outfit-recruit', helmet: 'helmet-standard', visor: 'visor-cyan',
    armor: 'armor-light', suitfx: 'suitfx-none', suitColor: '#00e5ff',
  },
  unlockedTracks: ['neon-grid-city', 'grand-neon-circuit'],
  stats: emptyStats(),
  bestTimes: {},
  achievements: {},
  achievementsClaimed: [],
  flags: { customised: false, introSeen: false },
  challenges: { daily: { date: '', items: [] }, weekly: { week: '', items: [] } },
  championship: { season: 1, event: 0, points: 0, events: [], trophies: 0, completed: [] },
  settings: {
    music: true, sfx: true, quality: 'auto', cameraShake: true,
    invertSteer: false, showMinimap: true, showFps: false, control: 'buttons',
  },
  lastMode: 'classic',
  lastTrack: 'neon-grid-city',
})

export function loadProfile() {
  let raw = null
  try { raw = JSON.parse(localStorage.getItem(KEY) || 'null') } catch { raw = null }
  const base = defaultProfile()
  if (!raw || typeof raw !== 'object') return base
  const p = { ...base, ...raw }
  p.stats = { ...base.stats, ...(raw.stats || {}) }
  p.settings = { ...base.settings, ...(raw.settings || {}) }
  p.rider = { ...base.rider, ...(raw.rider || {}) }
  p.championship = { ...base.championship, ...(raw.championship || {}) }
  p.bikes = raw.bikes || {}
  p.achievements = raw.achievements || {}
  p.achievementsClaimed = raw.achievementsClaimed || []
  p.flags = { ...base.flags, ...(raw.flags || {}) }
  p.ownedBikes = Array.isArray(raw.ownedBikes) && raw.ownedBikes.length ? raw.ownedBikes.filter(id => BIKE_MAP[id]) : base.ownedBikes
  p.ownedCosmetics = Array.isArray(raw.ownedCosmetics) ? [...new Set([...DEFAULT_COSMETICS, ...raw.ownedCosmetics])].filter(id => COSMETIC_MAP[id]) : [...DEFAULT_COSMETICS]
  p.unlockedTracks = Array.isArray(raw.unlockedTracks) ? [...new Set(raw.unlockedTracks.filter(id => TRACK_MAP[id]))] : base.unlockedTracks
  p.bestTimes = raw.bestTimes || {}
  if (!BIKE_MAP[p.equipped] || !p.ownedBikes.includes(p.equipped)) p.equipped = p.ownedBikes[0] || 'gridrunner'
  p.level = Math.max(1, Math.min(MAX_LEVEL, Number(p.level) || 1))
  p.xp = Math.max(0, Number(p.xp) || 0)
  p.credits = Math.max(0, Number(p.credits) || 0)
  p.cores = Math.max(0, Number(p.cores) || 0)
  return p
}

export function saveProfile(profile) {
  try { localStorage.setItem(KEY, JSON.stringify(profile)) } catch (e) { console.warn('Save failed', e) }
}

export function resetProfile() {
  try { localStorage.removeItem(KEY) } catch {}
  return defaultProfile()
}

export function bikeState(profile, bikeId) {
  if (!profile.bikes[bikeId]) profile.bikes[bikeId] = { upgrades: {}, custom: {} }
  const st = profile.bikes[bikeId]
  if (!st.upgrades) st.upgrades = {}
  if (!st.custom) st.custom = {}
  return st
}

export function defaultCustom(bike) {
  const v = bike.visual
  const map = {
    classic: 'frame-classic', aero: 'frame-aero', heavy: 'frame-heavy',
    experimental: 'frame-experimental', stealth: 'frame-stealth', legendary: 'frame-legendary',
  }
  const wheelMap = { disc: 'wheel-disc', spoke: 'wheel-spoke', halo: 'wheel-halo', turbine: 'wheel-turbine', void: 'wheel-void' }
  const decalMap = { none: 'decal-none', stripes: 'decal-stripes', chevrons: 'decal-chevrons', glyph: 'decal-glyph', hazard: 'decal-hazard', circuit: 'decal-circuit' }
  const engineMap = { core: 'engine-core', plasma: 'engine-plasma', quantum: 'engine-quantum', void: 'engine-void' }
  const lightMap = { steady: 'light-steady', pulse: 'light-pulse', wave: 'light-wave', strobe: 'light-strobe' }
  return {
    primary: v.primary, accent: v.accent, trail: v.trail, glow: v.glow,
    frame: map[v.frame] || 'frame-classic',
    wheels: wheelMap[v.wheels] || 'wheel-disc',
    wheelSize: v.wheelSize || 'medium',
    decal: decalMap[v.decal] || 'decal-none',
    engine: engineMap[v.engine] || 'engine-core',
    lighting: lightMap[v.lighting] || 'light-steady',
    trailFx: 'trail-ribbon', boost: 'boost-flare', crash: 'crash-shatter',
  }
}

export function getCustom(profile, bikeId) {
  const bike = BIKE_MAP[bikeId] || BIKES[0]
  const st = bikeState(profile, bikeId)
  return { ...defaultCustom(bike), ...st.custom }
}

export function setCustom(profile, bikeId, patch) {
  const st = bikeState(profile, bikeId)
  st.custom = { ...defaultCustom(BIKE_MAP[bikeId] || BIKES[0]), ...st.custom, ...patch }
  profile.flags.customised = true
}

export function getUpgrades(profile, bikeId) {
  return { ...bikeState(profile, bikeId).upgrades }
}

export function upgradeLevel(profile, bikeId, stat) {
  return bikeState(profile, bikeId).upgrades[stat] || 0
}

export function upgradeCost(level) {
  return UPGRADE_COSTS[Math.min(UPGRADE_COSTS.length - 1, level)] || UPGRADE_COSTS[0]
}

export function canAffordUpgrade(profile, level) {
  const c = upgradeCost(level)
  return profile.credits >= c.credits && profile.cores >= c.cores
}

export function buyUpgrade(profile, bikeId, stat) {
  const lvl = upgradeLevel(profile, bikeId, stat)
  if (lvl >= UPGRADE_MAX) return { ok: false, reason: 'Maximum level reached' }
  const cost = upgradeCost(lvl)
  if (profile.credits < cost.credits) return { ok: false, reason: 'Not enough credits' }
  if (profile.cores < cost.cores) return { ok: false, reason: 'Not enough data cores' }
  profile.credits -= cost.credits
  profile.cores -= cost.cores
  bikeState(profile, bikeId).upgrades[stat] = lvl + 1
  profile.stats.upgrades += 1
  saveProfile(profile)
  return { ok: true, level: lvl + 1 }
}

export function rawStats(profile, bikeId) {
  const bike = BIKE_MAP[bikeId] || BIKES[0]
  const ups = getUpgrades(profile, bikeId)
  const out = {}
  for (const k of STAT_KEYS) out[k] = Math.min(100, (bike.stats[k] || 50) + (ups[k] || 0) * UPGRADE_STEP)
  return out
}

// Competitive normalisation: preserve shape, remove raw stat advantage.
export function normalizedStats(stats, targetAvg = 69) {
  const vals = STAT_KEYS.map(k => stats[k])
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length
  const factor = targetAvg / Math.max(1, avg)
  const out = {}
  for (const k of STAT_KEYS) out[k] = Math.max(28, Math.min(96, stats[k] * factor))
  return out
}

export function effectiveStats(profile, bikeId, competitive = false) {
  const raw = rawStats(profile, bikeId)
  if (!competitive) return raw
  return normalizedStats(raw)
}

export function statTotal(stats) {
  return STAT_KEYS.reduce((a, k) => a + stats[k], 0)
}

export function bikeUnlockStatus(profile, bike) {
  if (profile.ownedBikes.includes(bike.id)) return { owned: true, ok: true, reason: 'Owned' }
  const u = bike.unlock || { type: 'credits' }
  if (u.type === 'level' && profile.level < u.value) return { owned: false, ok: false, reason: `Requires level ${u.value}` }
  if (u.type === 'trophy' && profile.championship.trophies < u.value) return { owned: false, ok: false, reason: `Requires ${u.value} championship trophy${u.value > 1 ? 'ies' : ''}` }
  if (u.type === 'achievement' && !profile.achievements[u.value]) return { owned: false, ok: false, reason: `Requires "${ACHIEVEMENTS.find(a => a.id === u.value)?.name || u.value}" achievement` }
  if (u.type === 'achievements') {
    const count = Object.keys(profile.achievements).length
    if (count < u.value) return { owned: false, ok: false, reason: `Requires ${u.value} achievements (${count}/${u.value})` }
  }
  if (bike.price > 0 && profile.credits < bike.price) return { owned: false, ok: false, reason: `Need ${bike.price.toLocaleString()} credits` }
  return { owned: false, ok: true, reason: bike.price > 0 ? `Buy for ${bike.price.toLocaleString()} credits` : 'Unlock available' }
}

export function purchaseBike(profile, bikeId) {
  const bike = BIKE_MAP[bikeId]
  if (!bike) return { ok: false, reason: 'Unknown bike' }
  const st = bikeUnlockStatus(profile, bike)
  if (st.owned) return { ok: false, reason: 'Already owned' }
  if (!st.ok) return { ok: false, reason: st.reason }
  if (bike.price > 0) profile.credits -= bike.price
  profile.ownedBikes.push(bikeId)
  bikeState(profile, bikeId)
  saveProfile(profile)
  return { ok: true }
}

export function equipBike(profile, bikeId) {
  if (!profile.ownedBikes.includes(bikeId)) return { ok: false, reason: 'Bike not owned' }
  profile.equipped = bikeId
  saveProfile(profile)
  return { ok: true }
}

export function trackUnlockStatus(profile, track) {
  if (profile.unlockedTracks.includes(track.id)) return { unlocked: true, ok: true, reason: 'Unlocked' }
  if (profile.level >= track.unlockLevel) return { unlocked: false, ok: true, reason: 'Ready to unlock', free: true }
  const cost = trackCost(track)
  if (profile.credits >= cost) return { unlocked: false, ok: true, reason: `Unlock for ${cost.toLocaleString()} credits`, cost }
  return { unlocked: false, ok: false, reason: `Requires level ${track.unlockLevel} or ${cost.toLocaleString()} credits`, cost }
}

export const trackCost = (track) => 2200 + track.difficulty * 1400

export function unlockTrack(profile, trackId) {
  const track = TRACK_MAP[trackId]
  if (!track) return { ok: false, reason: 'Unknown track' }
  if (profile.unlockedTracks.includes(trackId)) return { ok: false, reason: 'Already unlocked' }
  if (profile.level >= track.unlockLevel) {
    profile.unlockedTracks.push(trackId)
    saveProfile(profile)
    return { ok: true, free: true }
  }
  const cost = trackCost(track)
  if (profile.credits < cost) return { ok: false, reason: 'Not enough credits' }
  profile.credits -= cost
  profile.unlockedTracks.push(trackId)
  saveProfile(profile)
  return { ok: true }
}

export function isTrackUnlocked(profile, trackId) {
  const t = TRACK_MAP[trackId]
  if (!t) return false
  return profile.unlockedTracks.includes(trackId) || profile.level >= t.unlockLevel
}

export function cosmeticOwned(profile, id) { return profile.ownedCosmetics.includes(id) }
export function buyCosmetic(profile, id) {
  const c = COSMETIC_MAP[id]
  if (!c) return { ok: false, reason: 'Unknown part' }
  if (profile.ownedCosmetics.includes(id)) return { ok: false, reason: 'Already owned' }
  if (c.unlock && c.unlock.type === 'trophy' && profile.championship.trophies < c.unlock.value) return { ok: false, reason: `Requires ${c.unlock.value} championship trophy` }
  if (profile.credits < c.cost) return { ok: false, reason: 'Not enough credits' }
  profile.credits -= c.cost
  profile.ownedCosmetics.push(id)
  saveProfile(profile)
  return { ok: true }
}

export function addXp(profile, amount) {
  const gained = Math.max(0, Math.floor(amount))
  profile.xp += gained
  let levels = 0
  while (profile.level < MAX_LEVEL && profile.xp >= XP_TABLE(profile.level)) {
    profile.xp -= XP_TABLE(profile.level)
    profile.level += 1
    levels += 1
    profile.cores += 2
  }
  if (profile.level >= MAX_LEVEL) profile.xp = Math.min(profile.xp, XP_TABLE(MAX_LEVEL))
  return levels
}

export function levelProgress(profile) {
  if (profile.level >= MAX_LEVEL) return { pct: 1, cur: profile.xp, need: 1, max: true }
  const need = XP_TABLE(profile.level)
  return { pct: Math.min(1, profile.xp / need), cur: profile.xp, need, max: false }
}

// ---------------------------------------------------------------------------
// Challenges
// ---------------------------------------------------------------------------
function buildChallenges(level, weekly, seedKey) {
  const rand = rngFromSeed(seedKey + (weekly ? 'w' : 'd'))
  const pool = [...CHALLENGE_POOL]
  const picked = []
  for (let i = 0; i < 3 && pool.length; i++) {
    const idx = Math.floor(rand() * pool.length)
    const def = pool.splice(idx, 1)[0]
    const scale = weekly ? 2.6 : 1
    const target = Math.max(1, Math.round((def.base + Math.floor(level / 3) * def.step) * scale))
    picked.push({
      poolId: def.id, target, start: null, claimed: false,
      reward: {
        credits: Math.round(def.reward.credits * (weekly ? 2.4 : 1)),
        xp: Math.round(def.reward.xp * (weekly ? 2.4 : 1)),
        cores: def.reward.cores * (weekly ? 2 : 1),
      },
    })
  }
  return picked
}

export function refreshChallenges(profile) {
  const dk = todayKey(), wk = weekKey()
  let changed = false
  if (profile.challenges.daily.date !== dk) {
    profile.challenges.daily = { date: dk, items: buildChallenges(profile.level, false, dk) }
    changed = true
  }
  if (profile.challenges.weekly.week !== wk) {
    profile.challenges.weekly = { week: wk, items: buildChallenges(profile.level, true, wk) }
    changed = true
  }
  if (changed) saveProfile(profile)
  return changed
}

export function challengeDef(item) { return CHALLENGE_POOL.find(c => c.id === item.poolId) }
export function challengeProgress(profile, item) {
  const def = challengeDef(item)
  if (!def) return { value: 0, pct: 0, label: 'Unknown challenge' }
  const stat = def.stat
  const current = stat === 'bestWave' ? profile.stats.bestWave : (profile.stats[stat] || 0)
  if (item.start == null) item.start = stat === 'bestWave' ? 0 : current
  const value = stat === 'bestWave' ? current : Math.max(0, current - item.start)
  const target = item.target
  return { value: Math.min(target, value), target, pct: Math.min(1, value / Math.max(1, target)), label: def.label.replace('{n}', target) }
}

export function claimChallenge(profile, which, index) {
  const group = profile.challenges[which]
  const item = group?.items?.[index]
  if (!item || item.claimed) return { ok: false, reason: 'Already claimed' }
  const prog = challengeProgress(profile, item)
  if (prog.value < prog.target) return { ok: false, reason: 'Not complete yet' }
  item.claimed = true
  profile.credits += item.reward.credits
  profile.cores += item.reward.cores
  profile.stats.creditsEarned += item.reward.credits
  const levels = addXp(profile, item.reward.xp)
  saveProfile(profile)
  return { ok: true, levels, reward: item.reward }
}

// ---------------------------------------------------------------------------
// Achievements
// ---------------------------------------------------------------------------
export function checkAchievements(profile) {
  const newly = []
  for (const a of ACHIEVEMENTS) {
    if (profile.achievements[a.id]) continue
    let ok = false
    try { ok = !!a.check(profile) } catch { ok = false }
    if (ok) {
      profile.achievements[a.id] = Date.now()
      profile.credits += a.reward.credits
      profile.cores += a.reward.cores
      profile.stats.creditsEarned += a.reward.credits
      addXp(profile, a.reward.xp)
      newly.push(a)
    }
  }
  if (newly.length) saveProfile(profile)
  return newly
}

export function achievementProgress(profile, a) {
  try { return a.check(profile) ? 1 : 0 } catch { return 0 }
}

// ---------------------------------------------------------------------------
// Results / rewards
// ---------------------------------------------------------------------------
const placePoints = (place) => [20, 14, 10, 7, 5, 3, 2, 1][Math.max(0, place - 1)] || 0

export function applyResults(profile, result) {
  const mode = MODES[result.mode] || MODES.classic
  const diff = result.difficultyMult || 1
  const beforeLevel = profile.level
  const stats = profile.stats
  stats.races += 1
  stats.playTime += result.duration || 0
  stats.distance += (result.distance || 0) / 1000
  stats.boostTime += result.boostTime || 0
  stats.laps += result.laps || 0
  stats.driftTime += result.driftTime || 0
  stats.jumps += result.jumps || 0
  stats.takedowns += result.takedowns || 0
  stats.crashes += result.crashes || 0
  if (result.bestWave) stats.bestWave = Math.max(stats.bestWave, result.bestWave)
  if (result.win) {
    stats.wins += 1
    if (!result.crashes) stats.cleanWins += 1
  }
  if (result.mode === 'timetrial' && result.lapTime > 0) {
    const prev = profile.bestTimes[result.trackId] || 0
    if (!prev || result.lapTime < prev) profile.bestTimes[result.trackId] = result.lapTime
  }

  const perf = result.win ? 1 : Math.max(0.25, 1 - (result.place || 4) * 0.14)
  let xp = Math.round(mode.xp * diff * (0.7 + perf * 0.9) + (result.score || 0) * 0.05)
  let credits = Math.round(mode.credits * diff * (0.6 + perf * 0.8) + (result.takedowns || 0) * 35)
  let cores = Math.max(1, Math.round(mode.cores * diff * (result.win ? 1.4 : 0.7)))
  if (result.mode === 'endless' || result.mode === 'survival') {
    xp += (result.bestWave || 1) * 25
    credits += (result.bestWave || 1) * 45
    cores += Math.floor((result.bestWave || 1) / 4)
  }
  const levels = addXp(profile, xp)
  profile.credits += credits
  profile.cores += cores
  stats.creditsEarned += credits

  let champ = null
  if (result.mode === 'championship' && result.championship) {
    champ = applyChampionshipResult(profile, result)
  }

  saveProfile(profile)
  const achievements = checkAchievements(profile)
  return {
    xp, credits, cores, levels, levelBefore: beforeLevel,
    achievements, championship: champ,
    levelProgress: levelProgress(profile),
  }
}

export function applyChampionshipResult(profile, result) {
  const ch = profile.championship
  const event = CHAMPIONSHIP_EVENTS[ch.event]
  if (!event) return null
  const points = placePoints(result.place || 8)
  ch.points += points
  ch.events.push({ event: ch.event, label: event.label, mode: event.mode, track: event.track, place: result.place, points })
  ch.event += 1
  let outcome = null
  if (ch.event >= CHAMPIONSHIP_EVENTS.length) {
    const won = ch.points >= 42
    if (won) {
      ch.trophies += 1
      profile.credits += 3000
      profile.cores += 10
      outcome = { won: true, trophy: true, points: ch.points, credits: 3000, cores: 10 }
    } else {
      profile.credits += 800
      profile.cores += 3
      outcome = { won: false, trophy: false, points: ch.points, credits: 800, cores: 3 }
    }
    ch.completed.push({ season: ch.season, points: ch.points, trophy: won })
    ch.season += 1
    ch.event = 0
    ch.points = 0
    ch.events = []
  }
  saveProfile(profile)
  return { ...outcome, points, eventLabel: event.label }
}

export function championshipStanding(profile) {
  const ch = profile.championship
  return { event: ch.event, total: CHAMPIONSHIP_EVENTS.length, points: ch.points, trophies: ch.trophies }
}

export function championshipPointsFor(place) { return placePoints(place) }

export function fmt(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e4) return (n / 1e3).toFixed(1) + 'K'
  return Math.floor(n).toLocaleString()
}

export function fmtTime(seconds, ms = true) {
  if (!isFinite(seconds) || seconds <= 0) return '--:--.---'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  const milli = Math.floor((seconds % 1) * 1000)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}${ms ? '.' + String(milli).padStart(3, '0') : ''}`
}

export { placePoints, todayKey, weekKey, XP_TABLE }
