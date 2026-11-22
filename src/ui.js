// UI screens - futuristic digital interface.
import {
  MODES, MODE_LIST, TRACKS, TRACK_MAP, BIKES, BIKE_MAP, RARITIES, CATEGORIES,
  STAT_KEYS, STAT_LABELS, STAT_ICONS, COSMETICS, COSMETIC_MAP, COSMETIC_KINDS,
  RIDER_ICONS, SUIT_COLORS, TIPS, CHAMPIONSHIP_EVENTS, ACHIEVEMENTS,
  DIFFICULTIES, XP_TABLE, MAX_LEVEL,
} from './data.js'
import {
  fmt, fmtTime, levelProgress, challengeProgress, challengeDef, bikeUnlockStatus,
  trackUnlockStatus, trackCost, isTrackUnlocked, getCustom, getUpgrades, rawStats,
  effectiveStats, upgradeLevel, upgradeCost, canAffordUpgrade, cosmeticOwned,
  achievementProgress, championshipStanding, UPGRADE_MAX, statTotal,
} from './save.js'

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const rc = (b) => RARITIES[b.rarity]?.color || '#9fb3c8'
const cat = (b) => CATEGORIES[b.category]?.short || 'Classic'
const catColor = (b) => CATEGORIES[b.category]?.color || '#00e5ff'
const bikeGlyph = (b) => ({ classic: '◉', speed: '➤', heavy: '▣', racing: '◈', experimental: '✧', stealth: '◐', legendary: '★', prototype: '⟁', limited: '✦' }[b.category] || '◉')
const stars = (n) => '◆'.repeat(Math.max(1, Math.min(5, n))) + '◇'.repeat(Math.max(0, 5 - n))
const pct = (n) => `${Math.round(Math.max(0, Math.min(1, n)) * 100)}%`
const money = (n) => `${fmt(n)} cr`
const cores = (n) => `${n} ◈`

function topbar(app, backTo = 'menu', title = '') {
  const p = app.profile
  const lp = levelProgress(p)
  return `<div class="topbar">
    <div class="brand">
      <div class="brand-mark"></div>
      <div class="brand-text">TRON<span>:</span> NEON OVERDRIVE</div>
    </div>
    <div class="topbar-actions">
      ${backTo ? `<button class="btn ghost small" data-action="nav" data-screen="${backTo}">‹ ${backTo === 'menu' ? 'MENU' : 'BACK'}</button>` : ''}
      <div class="profile-chip" data-action="nav" data-screen="profile">
        <div class="profile-icon">${esc(p.icon)}</div>
        <div>
          <div class="profile-name">${esc(p.name)}</div>
          <div class="profile-level">LV ${p.level} • ${fmt(p.credits)} CR • ${p.cores} ◈</div>
          <div class="profile-xp"><div style="width:${pct(lp.pct)}"></div></div>
        </div>
      </div>
    </div>
  </div>`
}

function statBars(bike, profile, competitive) {
  const stats = competitive ? effectiveStats(profile, bike.id, true) : rawStats(profile, bike.id)
  return STAT_KEYS.map(k => {
    const v = stats[k]
    return `<div class="stat-row"><span>${STAT_ICONS[k]} ${STAT_LABELS[k]}</span><div class="sbar"><div style="width:${v}%"></div></div><span class="sval">${Math.round(v)}</span></div>`
  }).join('')
}

// ---------------------------------------------------------------------------
// Menu
// ---------------------------------------------------------------------------
export function screenMenu(app) {
  const p = app.profile
  const bike = BIKE_MAP[p.equipped] || BIKES[0]
  const lp = levelProgress(p)
  const daily = p.challenges.daily.items[0]
  const weekly = p.challenges.weekly.items[0]
  const dProg = daily ? challengeProgress(p, daily) : null
  const wProg = weekly ? challengeProgress(p, weekly) : null
  const tip = TIPS[Math.floor(Date.now() / 12000) % TIPS.length]
  const mode = MODES[p.lastMode] || MODES.classic
  return `<div class="screen menu-screen">
    <div class="topbar">
      <div class="brand">
        <div class="brand-mark"></div>
        <div class="brand-text">TRON<span>:</span> NEON OVERDRIVE</div>
      </div>
      <div class="topbar-actions">
        <button class="btn ghost small" data-action="nav" data-screen="challenges">DAILY GRID</button>
        <div class="profile-chip" data-action="nav" data-screen="profile">
          <div class="profile-icon">${esc(p.icon)}</div>
          <div>
            <div class="profile-name">${esc(p.name)}</div>
            <div class="profile-level">LV ${p.level} • ${fmt(p.credits)} CR • ${p.cores} ◈</div>
            <div class="profile-xp"><div style="width:${pct(lp.pct)}"></div></div>
          </div>
        </div>
      </div>
    </div>
    <div class="menu-main">
      <div class="menu-left">
        <div class="menu-kicker">// GRID ACCESS GRANTED</div>
        <div class="menu-title">TRON<span class="thin">NEON OVERDRIVE</span></div>
        <div class="menu-sub">Strap into a light cycle, carve the Grid with lethal energy trails and outrun every rival in the system.</div>
        <div class="menu-actions">
          <button class="btn primary big" data-action="nav" data-screen="modes"><span class="ico">▶</span> ENTER THE GRID</button>
          <div class="menu-nav">
            <button class="btn" data-action="nav" data-screen="garage">◈ GARAGE</button>
            <button class="btn" data-action="nav" data-screen="collection">▤ COLLECTION</button>
            <button class="btn" data-action="nav" data-screen="championship">♛ CHAMPIONSHIP</button>
            <button class="btn" data-action="nav" data-screen="challenges">✦ CHALLENGES</button>
            <button class="btn" data-action="nav" data-screen="showroom">★ SHOWROOM</button>
            <button class="btn" data-action="nav" data-screen="profile">◉ PROFILE</button>
            <button class="btn ghost" data-action="nav" data-screen="settings">⚙ SETTINGS</button>
            <button class="btn ghost" data-action="nav" data-screen="howto">? HOW TO PLAY</button>
          </div>
        </div>
      </div>
    </div>
    <div class="menu-bike-tag">
      <div class="bt-name">${esc(bike.name)}</div>
      <div class="bt-meta">${cat(bike)} • LV ${p.level} RIDER</div>
      <div class="bt-rarity" style="color:${rc(bike)}">${RARITIES[bike.rarity].name.toUpperCase()}</div>
    </div>
    <div class="menu-bottom">
      <div class="menu-card">
        <h4>DAILY CHALLENGE</h4>
        <p>${dProg ? esc(dProg.label) : 'Complete races to earn credits.'}</p>
        <div class="mini-progress"><div style="width:${dProg ? pct(dProg.pct) : 0}%"></div></div>
      </div>
      <div class="menu-card">
        <h4>WEEKLY CONTRACT</h4>
        <p>${wProg ? esc(wProg.label) : 'Weekly contracts arrive on the Grid.'}</p>
        <div class="mini-progress"><div style="width:${wProg ? pct(wProg.pct) : 0}%"></div></div>
      </div>
      <div class="menu-card">
        <h4>GRID INTEL</h4>
        <p>${esc(tip)}</p>
      </div>
      <div class="menu-card" style="max-width:210px">
        <h4>NEXT EVENT</h4>
        <p>${esc(mode.name)}<br><span class="muted">${esc(TRACK_MAP[p.lastTrack]?.name || 'Neon Grid City')}</span></p>
        <button class="btn small" style="margin-top:8px" data-action="quick-play">LAUNCH</button>
      </div>
    </div>
  </div>`
}

// ---------------------------------------------------------------------------
// Modes
// ---------------------------------------------------------------------------
export function screenModes(app) {
  const p = app.profile
  return `<div class="screen no-bike">
    ${topbar(app, 'menu')}
    <div class="content" style="margin-top:14px">
      <div class="section-head">
        <div class="section-title">SELECT GAME MODE<small>9 WAYS TO SURVIVE THE GRID</small></div>
        <div class="section-actions"><span class="tag cyan">RIDER LV ${p.level}</span><span class="tag gold">${p.championship.trophies} ♛</span></div>
      </div>
      <div class="mode-grid">
        ${MODE_LIST.map(m => {
          const key = Object.keys(MODES).find(k => MODES[k] === m)
          const diff = m.type === 'series' ? 3 : m.difficulty
          return `<button class="mode-card ${key === 'championship' ? 'championship' : ''}" style="--mc:${m.color}" data-action="select-mode" data-mode="${key}">
            <div class="mode-icon">${m.icon}</div>
            <div class="mode-name">${esc(m.name)}</div>
            <div class="mode-desc">${esc(m.desc)}</div>
            <div class="mode-foot"><span class="dif">${stars(diff)}</span><span>${key === 'championship' ? '5 EVENTS' : (m.type === 'circuit' ? (m.laps || 3) + ' LAPS' : (m.bots || 0) + ' RIVALS')}</span></div>
          </button>`
        }).join('')}
      </div>
    </div>
  </div>`
}

// ---------------------------------------------------------------------------
// Track select
// ---------------------------------------------------------------------------
export function screenTracks(app) {
  const p = app.profile
  const mode = MODES[app.selectedMode] || MODES.classic
  const wantType = mode.type === 'circuit' ? 'circuit' : 'arena'
  const list = TRACKS.filter(t => t.type === wantType && (app.trackFilter === 'all' || t.type === app.trackFilter))
  const sel = TRACK_MAP[app.selectedTrack] || list[0]
  const selUnlocked = sel ? isTrackUnlocked(p, sel.id) : false
  const selStatus = sel ? trackUnlockStatus(p, sel) : null
  const best = p.bestTimes[sel?.id] || 0
  return `<div class="screen no-bike">
    ${topbar(app, 'modes')}
    <div class="content" style="margin-top:12px">
      <div class="section-head">
        <div class="section-title">${esc(mode.name)}<small>${esc(mode.desc)}</small></div>
        <div class="section-actions"><span class="tag" style="color:${mode.color}">${mode.type === 'circuit' ? 'CIRCUIT' : 'ARENA'}</span></div>
      </div>
      <div class="track-toolbar">
        <div class="filter-tabs">
          <button class="filter-tab active">${wantType === 'circuit' ? 'CIRCUITS' : 'ARENAS'}</button>
          <button class="filter-tab" data-action="filter-track" data-filter="${wantType}">${list.length} TRACKS</button>
        </div>
        <div class="difficulty-select">
          ${DIFFICULTIES.map(d => `<button class="diff-chip ${app.difficulty === d.id ? 'active' : ''}" data-action="set-difficulty" data-diff="${d.id}">${esc(d.name)}</button>`).join('')}
        </div>
      </div>
      <div class="track-grid">
        ${list.map(t => {
          const unlocked = isTrackUnlocked(p, t.id)
          const status = trackUnlockStatus(p, t)
          const bt = p.bestTimes[t.id] || 0
          return `<button class="track-card ${app.selectedTrack === t.id ? 'selected' : ''} ${unlocked ? '' : 'locked'}" style="--tc:${t.palette.accent}" data-action="select-track" data-track="${t.id}">
            <div class="track-type">${t.type.toUpperCase()} • ${t.theme.toUpperCase()}</div>
            <div class="track-name">${esc(t.name)}</div>
            <div class="track-desc">${esc(t.desc)}</div>
            <div class="track-preview-bar"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
            <div class="track-meta"><span class="track-diff">${stars(t.difficulty)}</span>${bt ? `<span class="best-time">BEST ${fmtTime(bt)}</span>` : `<span>LV ${t.unlockLevel}</span>`}</div>
            ${!unlocked ? `<div class="lock-row">🔒 ${esc(status.reason)}${status.cost ? ` <span class="btn small" data-action="unlock-track" data-track="${t.id}">UNLOCK</span>` : ''}</div>` : ''}
          </button>`
        }).join('')}
      </div>
      <div class="start-bar">
        <div class="start-info">
          ${sel ? `<b>${esc(sel.name)}</b><br>${selUnlocked ? `${esc(mode.rules?.[0] || 'Race for the win')} • ${DIFFICULTIES[app.difficulty].name} rewards x${DIFFICULTIES[app.difficulty].reward}` : esc(selStatus.reason)}` : 'No track available'}
          ${best ? ` <span class="best-time">• BEST ${fmtTime(best)}</span>` : ''}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          ${sel && !selUnlocked && selStatus?.ok ? `<button class="btn orange" data-action="unlock-track" data-track="${sel.id}">UNLOCK ${selStatus.cost ? money(selStatus.cost) : 'FREE'}</button>` : ''}
          <button class="btn primary big" data-action="start-race" ${sel && selUnlocked ? '' : 'disabled'}>START ▸</button>
        </div>
      </div>
    </div>
  </div>`
}

// ---------------------------------------------------------------------------
// Garage
// ---------------------------------------------------------------------------
function cosmeticChips(app, bikeId, kind) {
  const p = app.profile
  const owned = p.ownedBikes.includes(bikeId)
  const cur = getCustom(p, bikeId)
  const map = { frame: 'frame', wheels: 'wheels', trail: 'trailFx', boost: 'boost', crash: 'crash', decal: 'decal', engine: 'engine', lighting: 'lighting' }
  const field = map[kind]
  const options = COSMETICS.filter(c => c.kind === kind)
  return options.map(c => {
    const isOwned = cosmeticOwned(p, c.id)
    const active = cur[field] === c.id
    return `<button class="chip ${active ? 'active' : ''} ${isOwned ? '' : 'locked'}" data-action="${isOwned ? 'cosmetic' : 'buy-cosmetic'}" data-kind="${kind}" data-id="${c.id}" data-bike="${bikeId}" ${owned ? '' : 'disabled'}>
      ${esc(c.name)}${!isOwned ? `<span class="cost">${c.cost ? money(c.cost) : 'LOCKED'}</span>` : ''}
    </button>`
  }).join('')
}

function swatches(field, colors, current, bikeId) {
  return `<div class="color-row">${colors.map(c => `<button class="swatch ${current === c ? 'active' : ''}" style="background:${c};color:${c}" data-action="paint" data-field="${field}" data-color="${c}" data-bike="${bikeId}" title="${c}"></button>`).join('')}</div>`
}

export function screenGarage(app) {
  const p = app.profile
  const bikeId = app.garageBike || p.equipped
  const bike = BIKE_MAP[bikeId] || BIKES[0]
  const owned = p.ownedBikes.includes(bikeId)
  const custom = getCustom(p, bikeId)
  const ups = getUpgrades(p, bikeId)
  const lp = levelProgress(p)
  const colors = ['#00e5ff', '#22d3ee', '#38bdf8', '#4ade80', '#a3e635', '#fbbf24', '#ff7a18', '#ef4444', '#ff3d81', '#a855f7', '#f8fafc', '#94a3b8']
  const visualTab = app.garageTab !== 'performance'
  const ownedBikes = BIKES.filter(b => p.ownedBikes.includes(b.id))
  const status = bikeUnlockStatus(p, bike)
  return `<div class="screen garage-screen">
    <div class="topbar">
      <div class="brand"><div class="brand-mark"></div><div class="brand-text">NEON<span>:</span> GARAGE</div></div>
      <div class="topbar-actions">
        <button class="btn ghost small" data-action="nav" data-screen="menu">‹ MENU</button>
        <div class="profile-chip"><div class="profile-icon">${esc(p.icon)}</div><div><div class="profile-name">${esc(p.name)}</div><div class="profile-level">LV ${p.level} • ${fmt(p.credits)} CR • ${p.cores} ◈</div><div class="profile-xp"><div style="width:${pct(lp.pct)}%"></div></div></div></div>
      </div>
    </div>
    <div class="content" style="margin-top:10px">
      <div class="garage-left panel">
        <div class="panel-inner" style="display:flex;flex-direction:column;min-height:0;height:100%">
          <div class="bike-head">
            <div><div class="bike-title" style="color:${rc(bike)}">${esc(bike.name)}</div><div class="bike-cat">${cat(bike)} • ${RARITIES[bike.rarity].name}</div></div>
            <span class="rarity" style="color:${rc(bike)}">${bikeGlyph(bike)}</span>
          </div>
          <div style="font-size:11px;color:#8fb0c2;line-height:1.35;margin-top:8px;min-height:44px">${esc(bike.desc)}</div>
          <div class="hr"></div>
          <div class="field-label">OWNED LIGHT CYCLES (${ownedBikes.length}/40)</div>
          <div class="bike-list scroll">
            ${ownedBikes.map(b => `<button class="bike-row ${b.id === bikeId ? 'active' : ''}" data-action="select-garage-bike" data-bike="${b.id}"><span class="br-color" style="--bc:${rc(b)}"></span><span class="br-name">${esc(b.name)}</span><span class="br-rar" style="color:${rc(b)}">${b.rarity.slice(0, 3).toUpperCase()}</span></button>`).join('')}
          </div>
          <div class="garage-actions">
            ${owned ? `<button class="btn primary small" data-action="equip-bike" data-bike="${bike.id}" ${p.equipped === bike.id ? 'disabled' : ''}>${p.equipped === bike.id ? 'EQUIPPED' : 'EQUIP'}</button>` : `<button class="btn gold small" data-action="buy-bike" data-bike="${bike.id}" ${status.ok ? '' : 'disabled'}>${status.ok ? `BUY ${money(bike.price)}` : esc(status.reason)}</button>`}
            <button class="btn small" data-action="test-drive" data-bike="${bike.id}">TEST RIDE</button>
          </div>
        </div>
      </div>
      <div class="garage-center">
        <div class="drag-zone" id="drag-zone"></div>
        <div class="drag-hint">DRAG TO ROTATE • AUTO-SPIN ENABLED</div>
      </div>
      <div class="garage-right panel">
        <div class="panel-inner" style="display:flex;flex-direction:column;min-height:0;height:100%">
          <div class="tabs">
            <button class="tab ${visualTab ? 'active' : ''}" data-action="garage-tab" data-tab="visual">VISUAL</button>
            <button class="tab ${!visualTab ? 'active' : ''}" data-action="garage-tab" data-tab="performance">PERFORMANCE</button>
          </div>
          <div class="custom-scroll scroll" style="margin-top:8px">
            ${!owned ? `<div class="rarity-note" style="color:#fbbf24;margin-bottom:8px">🔒 ${esc(status.reason)}. Purchase this bike in the Collection to customise it.</div>` : ''}
            ${visualTab ? `
              <div class="field-label">PRIMARY PAINT</div>${swatches('primary', colors, custom.primary, bikeId)}
              <div class="field-label">NEON ACCENT</div>${swatches('accent', colors, custom.accent, bikeId)}
              <div class="field-label">ENERGY TRAIL</div>${swatches('trail', colors, custom.trail, bikeId)}
              <div class="field-label">ENGINE GLOW</div>${swatches('glow', colors, custom.glow, bikeId)}
              <div class="field-label">FRAME STYLE</div><div class="chip-row">${cosmeticChips(app, bikeId, 'frame')}</div>
              <div class="field-label">WHEELS</div><div class="chip-row">${cosmeticChips(app, bikeId, 'wheels')}</div>
              <div class="field-label">WHEEL SIZE</div><div class="chip-row">
                ${['small', 'medium', 'large'].map(s => `<button class="chip ${custom.wheelSize === s ? 'active' : ''}" data-action="wheel-size" data-size="${s}" data-bike="${bikeId}">${s.toUpperCase()}</button>`).join('')}
              </div>
              <div class="field-label">DECAL</div><div class="chip-row">${cosmeticChips(app, bikeId, 'decal')}</div>
              <div class="field-label">ENGINE</div><div class="chip-row">${cosmeticChips(app, bikeId, 'engine')}</div>
              <div class="field-label">ANIMATED LIGHTING</div><div class="chip-row">${cosmeticChips(app, bikeId, 'lighting')}</div>
              <div class="field-label">TRAIL EFFECT</div><div class="chip-row">${cosmeticChips(app, bikeId, 'trail')}</div>
              <div class="field-label">BOOST EFFECT</div><div class="chip-row">${cosmeticChips(app, bikeId, 'boost')}</div>
              <div class="field-label">CRASH EFFECT</div><div class="chip-row">${cosmeticChips(app, bikeId, 'crash')}</div>
            ` : `
              <div class="rarity-note" style="margin-bottom:10px">Upgrades improve performance in solo play. Competitive modes (Grand Prix, Team, Royale, Championship) normalise stats for fair racing.</div>
              ${STAT_KEYS.map(k => {
                const lvl = ups[k] || 0
                const cost = upgradeCost(lvl)
                const max = lvl >= UPGRADE_MAX
                const can = canAffordUpgrade(p, lvl) && !max && owned
                return `<div class="upgrade-row">
                  <div class="uname">${STAT_ICONS[k]} ${STAT_LABELS[k]} <span class="muted">L${lvl}</span></div>
                  <div class="ubar"><div style="width:${(lvl / UPGRADE_MAX) * 100}%"></div></div>
                  <div class="ubuy"><button class="btn small ${can ? '' : 'ghost'}" data-action="upgrade" data-stat="${k}" data-bike="${bikeId}" ${can ? '' : 'disabled'}>${max ? 'MAX' : `${money(cost.credits)} + ${cost.cores}◈`}</button></div>
                </div>`
              }).join('')}
              <div class="hr"></div>
              <div class="field-label">EFFECTIVE STATS ${app.competitivePreview ? '• COMPETITIVE NORMALISED' : ''}</div>
              ${statBars(bike, p, false)}
              <div class="rarity-note" style="margin-top:8px">TOTAL ${Math.round(statTotal(rawStats(p, bikeId)))} / 800</div>
            `}
          </div>
          <div class="garage-actions">
            <button class="btn small" data-action="nav" data-screen="collection">COLLECTION</button>
            <button class="btn small" data-action="nav" data-screen="showroom">SHOWROOM</button>
          </div>
        </div>
      </div>
    </div>
  </div>`
}

// ---------------------------------------------------------------------------
// Collection
// ---------------------------------------------------------------------------
export function screenCollection(app) {
  const p = app.profile
  const sel = BIKE_MAP[app.collectionBike] || BIKE_MAP[p.equipped] || BIKES[0]
  const owned = p.ownedBikes.includes(sel.id)
  const status = bikeUnlockStatus(p, sel)
  const cats = ['all', ...Object.keys(CATEGORIES)]
  const list = BIKES.filter(b => {
    if (app.collectionCategory !== 'all' && b.category !== app.collectionCategory) return false
    if (app.collectionOwnedOnly && !p.ownedBikes.includes(b.id)) return false
    return true
  })
  const ownedCount = p.ownedBikes.length
  return `<div class="screen no-bike">
    ${topbar(app, 'menu')}
    <div class="content" style="margin-top:12px">
      <div class="section-head">
        <div class="section-title">LIGHT CYCLE COLLECTION<small>${ownedCount} / ${BIKES.length} FRAMES ACQUIRED</small></div>
        <div class="section-actions"><span class="tag cyan">${fmt(p.credits)} CR</span><span class="tag gold">${p.cores} ◈</span></div>
      </div>
      <div class="collection-toolbar">
        <div class="filter-tabs">
          ${cats.map(c => `<button class="filter-tab ${app.collectionCategory === c ? 'active' : ''}" data-action="collection-category" data-cat="${c}">${c === 'all' ? 'ALL' : esc(CATEGORIES[c].short).toUpperCase()}</button>`).join('')}
        </div>
        <button class="btn ghost small" data-action="collection-owned">${app.collectionOwnedOnly ? 'SHOWING OWNED' : 'SHOW ALL'}</button>
        <div style="margin-left:auto" class="muted tiny">${list.length} RESULTS</div>
      </div>
      <div class="collection-grid scroll" style="flex:1 1 auto">
        ${list.map(b => {
          const isOwned = p.ownedBikes.includes(b.id)
          const isEquipped = p.equipped === b.id
          const st = bikeUnlockStatus(p, b)
          return `<button class="bike-card ${isEquipped ? 'equipped' : ''} ${isOwned ? '' : 'locked'} ${app.collectionBike === b.id ? 'selected' : ''}" style="--bc:${rc(b)}" data-action="select-collection-bike" data-bike="${b.id}">
            <div class="bc-glyph">${bikeGlyph(b)}</div>
            <div class="bc-name" style="color:${rc(b)}">${esc(b.name)}</div>
            <div class="bc-cat">${cat(b)} • ${RARITIES[b.rarity].name}</div>
            <div class="bc-foot">
              <span class="bc-stats">${Math.round(statTotal(b.stats))} STAT</span>
              <span class="bc-price">${isOwned ? (isEquipped ? 'EQUIPPED' : 'OWNED') : (st.ok ? money(b.price) : '🔒')}</span>
            </div>
            ${isEquipped ? '<span class="bc-equipped">ACTIVE</span>' : (!isOwned ? '<span class="bc-lock">🔒</span>' : '')}
          </button>`
        }).join('')}
      </div>
      <div class="panel" style="margin-top:10px;flex:0 0 auto">
        <div class="panel-inner" style="display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr) auto;gap:18px;align-items:start">
          <div>
            <div class="bike-head">
              <div><div class="bike-title" style="color:${rc(sel)}">${esc(sel.name)}</div><div class="bike-cat">${cat(sel)} • ${RARITIES[sel.rarity].name} • ${bikeGlyph(sel)}</div></div>
            </div>
            <div class="rarity-note" style="margin-top:8px;color:#9cc3d4">${esc(sel.desc)}</div>
            <div class="rarity-note" style="margin-top:6px;font-style:italic">${esc(sel.lore || '')}</div>
            <div class="hr"></div>
            <div class="field-label">UNLOCK STATUS</div>
            <div class="rarity-note" style="color:${owned ? 'var(--green)' : (status.ok ? 'var(--gold)' : 'var(--danger)')}">${owned ? 'OWNED • READY TO RIDE' : esc(status.reason)}</div>
          </div>
          <div>
            <div class="field-label" style="margin-top:0">BASE PERFORMANCE</div>
            ${statBars(sel, p, false)}
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;min-width:150px">
            ${owned
              ? `<button class="btn primary small" data-action="equip-bike" data-bike="${sel.id}" ${p.equipped === sel.id ? 'disabled' : ''}>${p.equipped === sel.id ? 'EQUIPPED' : 'EQUIP'}</button>`
              : `<button class="btn gold small" data-action="buy-bike" data-bike="${sel.id}" ${status.ok ? '' : 'disabled'}>${status.ok ? `BUY ${money(sel.price)}` : esc(status.reason)}</button>`}
            <button class="btn small" data-action="customise-bike" data-bike="${sel.id}">CUSTOMISE</button>
            <button class="btn small" data-action="test-drive" data-bike="${sel.id}">TEST RIDE</button>
            <button class="btn ghost small" data-action="nav" data-screen="showroom">SHOWROOM</button>
          </div>
        </div>
      </div>
    </div>
  </div>`
}

// ---------------------------------------------------------------------------
// Showroom
// ---------------------------------------------------------------------------
export function screenShowroom(app) {
  const p = app.profile
  const featured = BIKES.filter(b => ['legendary', 'mythic', 'exclusive', 'limited', 'prototype'].includes(b.rarity)).slice(0, 12)
  const sel = BIKE_MAP[app.showroomBike] || featured[0] || BIKES[BIKES.length - 1]
  const owned = p.ownedBikes.includes(sel.id)
  const status = bikeUnlockStatus(p, sel)
  return `<div class="screen">
    ${topbar(app, 'menu')}
    <div class="content" style="margin-top:12px">
      <div class="showroom-banner">
        <div>
          <div class="menu-kicker" style="margin:0 0 4px">// HALL OF LIGHT</div>
          <div class="section-title" style="font-size:20px;color:#fff4cf">THE GRID'S FINEST MACHINES<small>Legendary, limited and prototype frames on display.</small></div>
        </div>
        <div style="text-align:right"><div class="tag gold">${p.championship.trophies} ♛ TROPHIES</div></div>
      </div>
      <div style="display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:14px;flex:1 1 auto;min-height:0">
        <div style="min-height:0;display:flex;flex-direction:column">
          <div class="panel" style="flex:0 0 auto">
            <div class="panel-inner">
              <div class="bike-head">
                <div><div class="bike-title" style="color:${rc(sel)};font-size:22px">${esc(sel.name)}</div><div class="bike-cat">${cat(sel)} • ${RARITIES[sel.rarity].name}</div></div>
                <div class="rarity" style="color:${rc(sel)};font-size:14px">${bikeGlyph(sel)}</div>
              </div>
              <div class="rarity-note" style="margin-top:10px;color:#9cc3d4;font-size:13px">${esc(sel.desc)}</div>
              <div class="rarity-note" style="margin-top:6px;font-style:italic">${esc(sel.lore || '')}</div>
              <div class="hr"></div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 18px">${statBars(sel, p, false)}</div>
              <div class="garage-actions">
                ${owned
                  ? `<button class="btn primary small" data-action="equip-bike" data-bike="${sel.id}" ${p.equipped === sel.id ? 'disabled' : ''}>${p.equipped === sel.id ? 'EQUIPPED' : 'EQUIP'}</button>`
                  : `<button class="btn gold small" data-action="buy-bike" data-bike="${sel.id}" ${status.ok ? '' : 'disabled'}>${status.ok ? `ACQUIRE ${money(sel.price)}` : esc(status.reason)}</button>`}
                <button class="btn small" data-action="test-drive" data-bike="${sel.id}">TEST RIDE</button>
                <button class="btn small" data-action="customise-bike" data-bike="${sel.id}">GARAGE</button>
              </div>
            </div>
          </div>
          <div class="panel scroll" style="margin-top:10px;flex:1 1 auto;min-height:0">
            <div class="panel-inner">
              <div class="field-label" style="margin-top:0">FEATURED FRAMES</div>
              <div class="chip-row">
                ${featured.map(b => `<button class="chip ${b.id === sel.id ? 'active' : ''}" style="border-color:${b.id === sel.id ? rc(b) : ''}" data-action="select-showroom-bike" data-bike="${b.id}">${esc(b.name)}</button>`).join('')}
              </div>
            </div>
          </div>
        </div>
        <div class="panel" style="min-height:0">
          <div class="panel-inner">
            <div class="field-label" style="margin-top:0">SHOWROOM ACCESS</div>
            <div class="rarity-note">Every frame in the Grid can be inspected here. Earn credits and data cores in any mode, complete achievements and win the Championship to unlock the rarest machines.</div>
            <div class="hr"></div>
            <div class="field-label">YOUR COLLECTION</div>
            <div class="rarity-note"><b style="color:var(--cyan)">${p.ownedBikes.length}</b> of ${BIKES.length} light cycles owned.</div>
            <div class="mini-progress" style="height:4px;background:rgba(0,229,255,.12);margin-top:8px"><div style="height:100%;width:${pct(p.ownedBikes.length / BIKES.length)};background:var(--cyan);box-shadow:0 0 8px var(--cyan)"></div></div>
            <div class="hr"></div>
            <div class="field-label">NEXT MILESTONES</div>
            <div class="rarity-note">• Level 10 — new tracks and frames<br>• 12 achievements — USER ONE<br>• 1 Championship trophy — TRON LEGACY<br>• 20 owned bikes — Curator achievement</div>
            <div class="garage-actions">
              <button class="btn small" data-action="nav" data-screen="collection">COLLECTION</button>
              <button class="btn small" data-action="nav" data-screen="garage">GARAGE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
}

// ---------------------------------------------------------------------------
// Profile / rider customisation
// ---------------------------------------------------------------------------
function riderChips(app, kind) {
  const p = app.profile
  const cur = p.rider[kind]
  return COSMETICS.filter(c => c.kind === kind).map(c => {
    const owned = cosmeticOwned(p, c.id)
    return `<button class="chip ${cur === c.id ? 'active' : ''} ${owned ? '' : 'locked'}" data-action="${owned ? 'rider-cosmetic' : 'buy-rider-cosmetic'}" data-kind="${kind}" data-id="${c.id}">
      ${esc(c.name)}${!owned ? `<span class="cost">${c.cost ? money(c.cost) : 'LOCKED'}</span>` : ''}
    </button>`
  }).join('')
}

export function screenProfile(app) {
  const p = app.profile
  const lp = levelProgress(p)
  const s = p.stats
  const achCount = Object.keys(p.achievements).length
  const statBox = (v, l) => `<div class="stat-box"><div class="sv">${v}</div><div class="sl">${l}</div></div>`
  return `<div class="screen no-bike">
    ${topbar(app, 'menu')}
    <div class="content scroll" style="margin-top:12px">
      <div class="panel">
        <div class="panel-inner profile-hero">
          <div class="profile-avatar">${esc(p.icon)}</div>
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
              <div class="bike-title" style="font-size:22px">${esc(p.name)}</div>
              <span class="tag cyan">LEVEL ${p.level}</span>
              <span class="tag gold">${p.credits} CR</span>
              <span class="tag purple">${p.cores} ◈</span>
            </div>
            <div class="rarity-note" style="margin-top:5px">Grid rider since ${new Date(p.created || Date.now()).toLocaleDateString()} • ${achCount} achievements • ${p.ownedBikes.length} light cycles</div>
            <div class="profile-xp" style="width:min(420px,100%);height:6px;margin-top:10px"><div style="width:${pct(lp.pct)}%"></div></div>
            <div class="rarity-note" style="margin-top:5px">${lp.max ? 'MAXIMUM LEVEL REACHED' : `${lp.cur} / ${lp.need} XP TO LEVEL ${p.level + 1}`}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
            <input class="name-input" id="profile-name" maxlength="14" value="${esc(p.name)}" aria-label="Rider name" />
            <div class="tiny muted">CALLSIGN • 14 CHARS</div>
          </div>
        </div>
      </div>
      <div class="profile-stats">
        ${statBox(s.races, 'EVENTS')}${statBox(s.wins, 'WINS')}${statBox(s.takedowns, 'TAKEDOWNS')}${statBox(s.bestWave, 'BEST WAVE')}
        ${statBox(`${Math.round(s.distance)} km`, 'DISTANCE')}${statBox(s.laps, 'LAPS')}${statBox(s.jumps, 'JUMPS')}${statBox(`${Math.round(s.playTime / 60)} min`, 'RIDE TIME')}
        ${statBox(fmt(s.creditsEarned), 'CREDITS EARNED')}${statBox(s.crashes, 'CRASHES')}${statBox(s.cleanWins, 'CLEAN WINS')}${statBox(s.upgrades, 'UPGRADES')}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">
        <div class="panel"><div class="panel-inner">
          <div class="field-label" style="margin-top:0">RIDER ICON</div>
          <div class="icon-grid">${RIDER_ICONS.map(i => `<button class="icon-choice ${p.icon === i ? 'active' : ''}" data-action="set-icon" data-icon="${i}">${i}</button>`).join('')}</div>
          <div class="field-label">SUIT COLOUR</div>
          <div class="color-row">${SUIT_COLORS.map(c => `<button class="swatch ${p.rider.suitColor === c ? 'active' : ''}" style="background:${c};color:${c}" data-action="rider-color" data-color="${c}"></button>`).join('')}</div>
        </div></div>
        <div class="panel"><div class="panel-inner">
          <div class="field-label" style="margin-top:0">OUTFIT</div><div class="chip-row">${riderChips(app, 'outfit')}</div>
          <div class="field-label">HELMET</div><div class="chip-row">${riderChips(app, 'helmet')}</div>
          <div class="field-label">VISOR</div><div class="chip-row">${riderChips(app, 'visor')}</div>
        </div></div>
        <div class="panel"><div class="panel-inner">
          <div class="field-label" style="margin-top:0">ARMOUR</div><div class="chip-row">${riderChips(app, 'armor')}</div>
          <div class="field-label">SUIT EFFECT</div><div class="chip-row">${riderChips(app, 'suitfx')}</div>
        </div></div>
        <div class="panel"><div class="panel-inner">
          <div class="field-label" style="margin-top:0">CAREER</div>
          <div class="rarity-note">Championship trophies: <b style="color:var(--gold)">${p.championship.trophies}</b><br>Seasons completed: <b>${p.championship.completed.length}</b><br>Achievements: <b>${achCount} / ${ACHIEVEMENTS.length}</b></div>
          <div class="garage-actions">
            <button class="btn small" data-action="nav" data-screen="challenges">CHALLENGES</button>
            <button class="btn small" data-action="nav" data-screen="championship">CHAMPIONSHIP</button>
          </div>
        </div></div>
      </div>
      <div class="panel" style="margin-top:12px"><div class="panel-inner">
        <div class="field-label" style="margin-top:0">SYSTEM</div>
        <div class="garage-actions" style="margin-top:0">
          <button class="btn small" data-action="nav" data-screen="settings">SETTINGS</button>
          <button class="btn danger small" data-action="reset-progress">RESET ALL PROGRESS</button>
        </div>
      </div></div>
    </div>
  </div>`
}

// ---------------------------------------------------------------------------
// Challenges & achievements
// ---------------------------------------------------------------------------
function challengeCard(app, which, item, index) {
  const p = app.profile
  const prog = challengeProgress(p, item)
  const complete = prog.value >= prog.target
  const label = which === 'daily' ? 'DAILY' : 'WEEKLY'
  return `<div class="challenge-card">
    <div class="cc-top"><span class="cc-kind">${label} CONTRACT</span><span class="tag ${item.claimed ? 'green' : complete ? 'gold' : ''}">${item.claimed ? 'CLAIMED' : complete ? 'READY' : 'ACTIVE'}</span></div>
    <div class="cc-title">${esc(prog.label)}</div>
    <div class="cc-progress"><div style="width:${pct(prog.pct)}"></div></div>
    <div class="cc-meta"><span>${prog.value} / ${prog.target}</span><span>${pct(prog.pct)}</span></div>
    <div class="cc-reward"><span>+${item.reward.credits} CR</span><span>+${item.reward.xp} XP</span><span>+${item.reward.cores} ◈</span></div>
    <button class="btn small ${complete && !item.claimed ? 'gold' : 'ghost'}" style="margin-top:9px;width:100%" data-action="claim-challenge" data-which="${which}" data-index="${index}" ${complete && !item.claimed ? '' : 'disabled'}>${item.claimed ? 'REWARD CLAIMED' : complete ? 'CLAIM REWARD' : 'IN PROGRESS'}</button>
  </div>`
}

export function screenChallenges(app) {
  const p = app.profile
  const d = p.challenges.daily.items || []
  const w = p.challenges.weekly.items || []
  const done = Object.keys(p.achievements).length
  return `<div class="screen no-bike">
    ${topbar(app, 'menu')}
    <div class="content scroll" style="margin-top:12px">
      <div class="section-head">
        <div class="section-title">CONTRACTS & ACHIEVEMENTS<small>DAILY AND WEEKLY GRID CONTRACTS REFRESH AUTOMATICALLY</small></div>
        <div class="section-actions"><span class="tag cyan">${done} / ${ACHIEVEMENTS.length} ACHIEVEMENTS</span><button class="btn ghost small" data-action="check-achievements">SCAN</button></div>
      </div>
      <div class="field-label" style="margin-top:0">DAILY CONTRACTS • ${esc(p.challenges.daily.date || 'TODAY')}</div>
      <div class="challenge-grid">${d.map((it, i) => challengeCard(app, 'daily', it, i)).join('') || '<div class="rarity-note">No daily contracts available.</div>'}</div>
      <div class="field-label" style="margin-top:14px">WEEKLY CONTRACTS • ${esc(p.challenges.weekly.week || 'THIS WEEK')}</div>
      <div class="challenge-grid">${w.map((it, i) => challengeCard(app, 'weekly', it, i)).join('') || '<div class="rarity-note">No weekly contracts available.</div>'}</div>
      <div class="hr"></div>
      <div class="section-head">
        <div class="section-title" style="font-size:13px">ACHIEVEMENTS<small>COMPLETE THESE MILESTONES TO EARN CREDITS, CORES AND EXCLUSIVE FRAMES</small></div>
      </div>
      <div class="achievement-grid">
        ${ACHIEVEMENTS.map(a => {
          const complete = !!p.achievements[a.id]
          return `<div class="achievement ${complete ? 'done' : ''}">
            <div class="aico">${complete ? '★' : a.icon}</div>
            <div><div class="aname">${esc(a.name)}</div><div class="adesc">${esc(a.desc)}</div><div class="adesc" style="color:var(--gold)">+${a.reward.credits} CR • +${a.reward.xp} XP • +${a.reward.cores} ◈</div></div>
          </div>`
        }).join('')}
      </div>
    </div>
  </div>`
}

// ---------------------------------------------------------------------------
// Championship
// ---------------------------------------------------------------------------
export function screenChampionship(app) {
  const p = app.profile
  const ch = p.championship
  const stand = championshipStanding(p)
  const next = CHAMPIONSHIP_EVENTS[ch.event]
  const nextMode = next ? MODES[next.mode] : null
  const nextTrack = next ? TRACK_MAP[next.track] : null
  return `<div class="screen no-bike">
    ${topbar(app, 'menu')}
    <div class="content scroll" style="margin-top:12px">
      <div class="champ-hero">
        <div>
          <div class="menu-kicker" style="margin:0 0 4px">// NEON OVERDRIVE CHAMPIONSHIP</div>
          <div class="champ-title">SEASON ${ch.season}</div>
          <div class="champ-sub">Five events. Points awarded by finish position. Reach <b style="color:var(--gold)">42 points</b> to claim the trophy and exclusive frames.</div>
          <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
            <span class="tag cyan">EVENT ${Math.min(ch.event + 1, CHAMPIONSHIP_EVENTS.length)} / ${CHAMPIONSHIP_EVENTS.length}</span>
            <span class="tag gold">${ch.points} POINTS</span>
            <span class="tag green">${ch.trophies} TROPHIES</span>
          </div>
        </div>
        <div><div class="trophy-count">${ch.trophies}</div><div class="trophy-label">CHAMPIONSHIP TROPHIES</div></div>
      </div>
      <div style="display:grid;grid-template-columns:minmax(0,1.5fr) minmax(260px,.7fr);gap:12px">
        <div class="panel"><div class="panel-inner">
          <div class="field-label" style="margin-top:0">SEASON EVENTS</div>
          <div class="event-list">
            ${CHAMPIONSHIP_EVENTS.map((ev, i) => {
              const done = i < ch.event
              const active = i === ch.event
              const rec = ch.events[i]
              const mode = MODES[ev.mode]
              const track = TRACK_MAP[ev.track]
              return `<div class="event-row ${active ? 'active' : ''} ${done ? 'done' : ''}">
                <div class="event-num">${done ? '✓' : i + 1}</div>
                <div><div class="event-name">${esc(ev.label)}</div><div class="event-meta">${esc(mode?.name || ev.mode)} • ${esc(track?.name || ev.track)}</div></div>
                <div class="event-pts">${rec ? `${rec.points} PTS` : (active ? 'NEXT' : '—')}</div>
                <div>${active ? `<button class="btn primary small" data-action="start-championship">START ▸</button>` : done ? `<span class="tag green">DONE</span>` : `<span class="tag">LOCKED</span>`}</div>
              </div>`
            }).join('')}
          </div>
        </div></div>
        <div class="panel"><div class="panel-inner">
          <div class="field-label" style="margin-top:0">NEXT EVENT</div>
          ${next ? `<div class="bike-title" style="font-size:18px;color:var(--gold)">${esc(next.label)}</div>
            <div class="rarity-note" style="margin-top:5px">${esc(nextMode?.desc || '')}</div>
            <div class="hr"></div>
            <div class="rarity-note"><b>MODE:</b> ${esc(nextMode?.name || next.mode)}<br><b>TRACK:</b> ${esc(nextTrack?.name || next.track)}<br><b>LENGTH:</b> ${next.mode === 'grandprix' ? '3 LAPS' : 'LAST RIDER STANDING'}<br><b>DIFFICULTY:</b> ${stars(nextMode?.difficulty || 3)}</div>
            <button class="btn primary" style="margin-top:12px;width:100%" data-action="start-championship">ENTER EVENT ${ch.event + 1}</button>`
            : `<div class="rarity-note">Season complete. Enter a new season to compete again.</div>`}
          <div class="hr"></div>
          <div class="field-label">POINTS TABLE</div>
          <div class="rarity-note">1st 20 • 2nd 14 • 3rd 10 • 4th 7<br>5th 5 • 6th 3 • 7th 2 • 8th 1</div>
          <div class="field-label">SEASON HISTORY</div>
          ${ch.completed.length ? ch.completed.slice(-4).reverse().map(c => `<div class="rarity-note">Season ${c.season} — ${c.points} PTS — ${c.trophy ? '<span style="color:var(--gold)">TROPHY</span>' : 'NO TROPHY'}</div>`).join('') : '<div class="rarity-note">No completed seasons yet.</div>'}
        </div></div>
      </div>
    </div>
  </div>`
}

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------
function toggleRow(app, key, label, desc) {
  const on = !!app.profile.settings[key]
  return `<div class="setting-row">
    <div><div class="sl">${label}</div><div class="sd">${desc}</div></div>
    <button class="toggle ${on ? 'on' : ''}" data-action="toggle-setting" data-key="${key}" aria-label="${label}"></button>
  </div>`
}

export function screenSettings(app) {
  const p = app.profile
  const q = p.settings.quality
  const c = p.settings.control
  return `<div class="screen no-bike">
    ${topbar(app, app.settingsBack || 'menu')}
    <div class="content scroll" style="margin-top:12px">
      <div class="section-head">
        <div class="section-title">SYSTEM SETTINGS<small>CONFIGURE YOUR GRID INTERFACE</small></div>
        <div class="section-actions"><span class="tag cyan">${p.name}</span></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="panel"><div class="panel-inner">
          <div class="field-label" style="margin-top:0">AUDIO</div>
          <div class="settings-list">
            ${toggleRow(app, 'music', 'SYNTHWAVE SOUNDTRACK', 'Procedural synthwave music generated in real time.')}
            ${toggleRow(app, 'sfx', 'SOUND EFFECTS', 'Engine, boost, impacts and UI feedback.')}
          </div>
          <div class="field-label">VISUAL</div>
          <div class="settings-list">
            ${toggleRow(app, 'cameraShake', 'CAMERA SHAKE', 'Impact and boost camera movement.')}
            ${toggleRow(app, 'showMinimap', 'MINIMAP', 'Show the tactical grid map during races.')}
            ${toggleRow(app, 'showFps', 'PERFORMANCE READOUT', 'Show frame rate and quality information.')}
          </div>
        </div></div>
        <div class="panel"><div class="panel-inner">
          <div class="field-label" style="margin-top:0">GRAPHICS QUALITY</div>
          <div class="rarity-note">Higher quality enables bloom, denser environments and detailed bike models. Changes apply to the next event.</div>
          <div class="seg" style="margin-top:8px">
            ${['auto', 'high', 'medium', 'low'].map(v => `<button class="${q === v ? 'active' : ''}" data-action="set-quality" data-value="${v}">${v.toUpperCase()}</button>`).join('')}
          </div>
          <div class="field-label">CONTROLS</div>
          <div class="rarity-note">Touch controls are always available on touch devices. Force them on to play with on-screen buttons on any device.</div>
          <div class="seg" style="margin-top:8px">
            ${['buttons', 'touch'].map(v => `<button class="${c === v ? 'active' : ''}" data-action="set-control" data-value="${v}">${v === 'buttons' ? 'KEYBOARD + PAD' : 'TOUCH CONTROLS'}</button>`).join('')}
          </div>
          <div class="field-label">STEERING</div>
          <div class="settings-list">${toggleRow(app, 'invertSteer', 'INVERT STEERING', 'Swap left and right steering input.')}</div>
          <div class="hr"></div>
          <div class="field-label">SAVE DATA</div>
          <div class="rarity-note">Progress is saved automatically to this browser. Resetting cannot be undone.</div>
          <div class="garage-actions"><button class="btn danger small" data-action="reset-progress">RESET ALL PROGRESS</button></div>
        </div></div>
      </div>
      <div class="panel" style="margin-top:12px"><div class="panel-inner">
        <div class="field-label" style="margin-top:0">CONTROL REFERENCE</div>
        <div class="rarity-note" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
          <span><b>← → / A D</b> — steer</span><span><b>SPACE / SHIFT</b> — boost</span><span><b>↓ / S</b> — brake</span>
          <span><b>X</b> — drift</span><span><b>J / ↑</b> — jump</span><span><b>Q / E</b> — pulse</span>
          <span><b>ESC / P</b> — pause</span><span><b>Touch</b> — on-screen pad</span><span><b>Drag bike</b> — rotate garage</span>
        </div>
      </div></div>
    </div>
  </div>`
}

// ---------------------------------------------------------------------------
// How to play
// ---------------------------------------------------------------------------
export function screenHowTo(app) {
  const section = (title, body) => `<div class="panel" style="margin-bottom:10px"><div class="panel-inner"><div class="field-label" style="margin-top:0">${title}</div><div class="rarity-note" style="font-size:12px;line-height:1.55">${body}</div></div></div>`
  return `<div class="screen no-bike">
    ${topbar(app, 'menu')}
    <div class="content scroll" style="margin-top:12px">
      <div class="section-head"><div class="section-title">HOW TO PLAY<small>SURVIVE THE GRID. MASTER THE LIGHT CYCLE.</small></div><div class="section-actions"><button class="btn primary small" data-action="nav" data-screen="modes">ENTER THE GRID ▸</button></div></div>
      ${section('THE CORE LOOP', 'Your light cycle leaves a lethal energy trail. Touch any enemy trail, arena wall or obstacle and you are derezzed. Cut rivals off, force them into your wall, and be the last rider standing. In circuit modes, trails fade and the goal is to finish first.')}
      ${section('BOOST, DRIFT, JUMP & PULSE', '<b>Boost</b> drains the cyan meter and delivers a huge burst of speed. <b>Drift</b> tightens your turning circle and slowly recharges boost. <b>Jump</b> clears incoming trails and obstacles. <b>Pulse</b> releases a radial shockwave that shoves nearby rivals — perfect near an arena edge.')}
      ${section('TRAILS & HAZARDS', 'Your own trail is safe. Team trails are safe in Team Battles. Trails persist longer in arenas than on circuits. Hazard zones can glitch your steering, overheat your reactor or erase you instantly. The arena shrinks in Elimination and Battle Royale — keep moving inward.')}
      ${section('MODES', '<b>Classic</b> — last rider alive. <b>Grand Prix</b> — 3-lap circuit racing. <b>Survival</b> — endless waves. <b>Elimination</b> — ram rivals out of a shrinking dome. <b>Time Trial</b> — solo against the clock. <b>Team</b> — 3v3. <b>Royale</b> — 8 riders, one shrinking arena. <b>Endless</b> — climb forever. <b>Championship</b> — five events for the trophy.')}
      ${section('PROGRESSION', 'Earn credits, data cores and XP from every event. Level up to unlock tracks and frames. Spend credits in the Collection and Garage, install performance upgrades, and customise paint, wheels, engines, lighting, trails and rider gear. Daily and weekly contracts pay bonus rewards.')}
      ${section('CONTROLS', '<b>Keyboard:</b> ← → or A D steer • Space or Shift boost • ↓ or S brake • X drift • J or ↑ jump • Q or E pulse • Esc or P pause.<br><b>Touch:</b> use the on-screen steer pad and action buttons. Drag the bike in the Garage to rotate it.')}
      ${section('TIPS FROM THE GRID', TIPS.map(t => `• ${esc(t)}`).join('<br>'))}
    </div>
  </div>`
}

// ---------------------------------------------------------------------------
// Results
// ---------------------------------------------------------------------------
export function screenResults(app) {
  const data = app.lastResult
  if (!data) return screenMenu(app)
  const { result, rewards } = data
  const champ = rewards.championship
  const win = !!result.win
  const stat = (v, l) => `<div class="rs"><div class="v">${v}</div><div class="l">${l}</div></div>`
  return `<div class="screen result-screen">
    <div class="result-card">
      <div class="result-kicker">EVENT COMPLETE • ${esc(result.trackName || '')}</div>
      <div class="result-title ${win ? 'win' : 'lose'}">${win ? 'VICTORY' : (result.place === 2 ? 'SECOND PLACE' : result.place === 3 ? 'THIRD PLACE' : 'RUN TERMINATED')}</div>
      <div class="result-sub">${esc(result.modeName || MODES[result.mode]?.name || result.mode || '')} • FINISHED P${result.place} OF ${result.totalRacers || '—'} • ${esc(result.trackName || '')}</div>
      <div class="result-stats">
        ${stat(fmtTime(result.duration || 0), 'TIME')}
        ${stat(fmt(result.score || 0), 'SCORE')}
        ${stat(result.takedowns || 0, 'TAKEDOWNS')}
        ${stat(result.bestWave || 1, 'BEST WAVE')}
        ${stat(`${Math.round(result.distance || 0)} m`, 'DISTANCE')}
        ${stat(result.crashes || 0, 'CRASHES')}
        ${stat(result.laps || 0, 'LAPS')}
        ${stat(result.jumps || 0, 'JUMPS')}
      </div>
      <div class="reward-row">
        <div class="reward"><div class="rv">+${fmt(rewards.credits || 0)}</div><div class="rl">CREDITS</div></div>
        <div class="reward"><div class="rv">+${fmt(rewards.xp || 0)}</div><div class="rl">XP</div></div>
        <div class="reward"><div class="rv">+${rewards.cores || 0} ◈</div><div class="rl">DATA CORES</div></div>
      </div>
      ${rewards.levels > 0 ? `<div class="level-up">▲ LEVEL UP • NOW LEVEL ${app.profile.level} • +${rewards.levels * 2} DATA CORES</div>` : ''}
      ${rewards.achievements?.length ? `<div class="level-up" style="color:var(--gold);text-shadow:0 0 16px var(--gold)">★ ACHIEVEMENT UNLOCKED: ${rewards.achievements.map(a => esc(a.name)).join(' • ')}</div>` : ''}
      ${champ ? `<div class="champ-outcome">${champ.credits !== undefined
        ? (champ.trophy ? `♛ CHAMPIONSHIP WON! ${champ.points} POINTS • +${champ.credits} CR • +${champ.cores} ◈` : `CHAMPIONSHIP SEASON COMPLETE • ${champ.points} POINTS • +${champ.credits} CR • +${champ.cores} ◈`)
        : `EVENT COMPLETE • ${esc(champ.eventLabel || '')} • +${champ.points} SEASON POINTS`}</div>` : ''}
      <div class="result-standings">
        <div class="field-label" style="margin-top:0">FINAL STANDINGS</div>
        ${(result.standings || []).slice(0, 8).map(r => `<div class="rr ${r.isPlayer ? 'me' : ''}"><span>${r.place}. ${esc(r.name)}</span><span>${r.alive === false ? 'DEREZZED' : (r.score ? fmt(r.score) + ' PTS' : '')}</span></div>`).join('')}
      </div>
      <div class="result-actions">
        <button class="btn primary" data-action="rematch">REMATCH</button>
        ${result.championship ? `<button class="btn gold" data-action="results-next">CONTINUE SEASON</button>` : `<button class="btn" data-action="results-tracks">CHANGE TRACK</button>`}
        <button class="btn" data-action="results-garage">GARAGE</button>
        <button class="btn ghost" data-action="results-menu">MENU</button>
      </div>
    </div>
  </div>`
}

// ---------------------------------------------------------------------------
// Pause
// ---------------------------------------------------------------------------
export function screenPause(app) {
  return `<div class="screen pause-screen dim">
    <div class="pause-card panel"><div class="panel-inner">
      <div class="pause-title">PAUSED</div>
      <div class="rarity-note" style="margin-bottom:16px">${esc(app.game?.trackData?.name || '')} • ${esc(app.game?.rules?.name || '')}</div>
      <div class="pause-actions">
        <button class="btn primary" data-action="pause-resume">RESUME</button>
        <button class="btn" data-action="pause-restart">RESTART EVENT</button>
        <button class="btn" data-action="pause-settings">SETTINGS</button>
        <button class="btn danger" data-action="pause-quit">ABANDON RUN</button>
      </div>
    </div></div>
  </div>`
}
