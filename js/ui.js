/* ============================================================
   WANDLORE — ui.js
   HUD, dialogue, panels, lessons, shop, map, journal and results.
   ============================================================ */
import {
  state, countMat, getEquippedWand, equipWand, computeWand, craftWand, craftCost,
  wandAffinities, wandCorePassive, formatLength, qualityLabel, sellWand, customerOffer,
  refreshCustomers, buyUpgrade, categoryUnlocked, nextLessonSpell, completeLesson,
  toggleLoadout, masteryRank, masteryOf, activeQuests, questProgress, addMat,
  spendGold, maxHealth, maxMana, rankTitle, repProgress, save, addRep, checkQuests,
  tournamentRanks, resetGame, woodById, coreById, matById,
} from './state.js'
import {
  WOODS, CORES, FLEXIBILITIES, CATEGORIES, SPELLS, SPELL_BY_ID, CATEGORY_SPELLS,
  QUESTS, RANKS, ZONES, NODES, DUELISTS, TOURNAMENT, COMBOS, RARITIES, BENCH_UPGRADES,
} from './data.js'

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const gold = n => (n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n))
const RARITY_ORDER = Object.keys(RARITIES)

export class UI {
  constructor(hooks = {}) {
    this.hooks = hooks
    this.panelName = null
    this.panelTab = null
    this.lesson = null
    this.lessonTimers = []
    this.craftSel = { wood: null, core: null, length: 11.25, flex: 'supple' }
    this.dialogueNpc = null
    this.resetArmed = false
    this._toastId = 0
    this._minimapAcc = 0
    this._hotbarSig = ''
    this._previewRaf = 0
    this._previewTime = 0
    this._panelScroll = 0
    this._lastHud = null
    this.cache()
    this.bind()
    this.pickDefaultMaterials()
  }

  cache() {
    const $ = id => document.getElementById(id)
    this.$ = $
    this.el = {
      hud: $('hud'), gold: $('gold-value'), rep: $('rep-value'), xp: $('xp-fill'),
      level: $('level-badge'), rank: $('rank-title'), quests: $('quest-list'),
      wandName: document.querySelector('.ew-name'), wandSwatch: document.querySelector('.ew-swatch'),
      hotbar: $('hotbar'), manaFill: $('mana-fill'), manaValue: $('mana-value'),
      prompt: $('interact-prompt'), promptText: $('interact-text'),
      minimap: $('minimap'), zone: $('zone-name'), toasts: $('toasts'), obj: $('objective-toast'),
      panelRoot: $('panel-root'), panel: $('panel'), dialogue: $('dialogue'),
      dlgName: $('dlg-name'), dlgText: $('dlg-text'), dlgOptions: $('dlg-options'),
      dlgPortrait: $('dlg-portrait'),
      duelUi: $('duel-ui'), duelHealth: $('duel-health-fill'), duelHealthText: $('duel-health-text'),
      enemyHealth: $('enemy-health-fill'), enemyName: $('enemy-name'), enemyTitle: $('enemy-title'),
      enemyPhase: $('enemy-phase'), duelBuffs: $('duel-buffs'), duelMsg: $('duel-center-msg'),
      duelWand: $('duel-wand-name'),
      lessonRoot: $('lesson-root'), lessonKicker: $('lesson-kicker'), lessonTitle: $('lesson-title'),
      lessonDesc: $('lesson-desc'), lessonDisplay: $('rune-display'), lessonPool: $('rune-pool'),
      lessonStatus: $('lesson-status'), lessonTimer: $('lesson-timer-fill'), lessonFoot: $('lesson-foot'),
      resultRoot: $('result-root'), resultCard: $('result-card'), hitFlash: $('hit-flash'),
      sound: $('sound-toggle'),
    }
    this.ctx = this.el.minimap.getContext('2d')
  }

  bind() {
    document.querySelectorAll('.hud-btn').forEach(btn => btn.addEventListener('click', () => {
      if (this.hooks.onSfx) this.hooks.onSfx('click')
      this.openPanel(btn.dataset.panel)
    }))
    this.$( 'panel-root').addEventListener('click', e => {
      if (e.target.classList.contains('panel-backdrop')) this.closePanel()
    })
    this.$('dlg-close').addEventListener('click', () => this.closeDialogue())
    this.el.sound.addEventListener('click', () => {
      state.settings.sound = !state.settings.sound
      save()
      this.el.sound.classList.toggle('off', !state.settings.sound)
      this.el.sound.textContent = state.settings.sound ? '♪' : '×'
      this.hooks.onSfxChange?.(state.settings.sound)
    })
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (!this.el.resultRoot.classList.contains('hidden')) { this.hideResult(); return }
        if (!this.el.lessonRoot.classList.contains('hidden')) { this.closeLesson(); return }
        if (!this.el.panelRoot.classList.contains('hidden')) { this.closePanel(); return }
        if (!this.el.dialogue.classList.contains('hidden')) { this.closeDialogue() }
      }
    })
  }

  pickDefaultMaterials() {
    const firstWood = WOODS.find(w => countMat(w.id) > 0) || WOODS[0]
    const firstCore = CORES.find(c => countMat(c.id) > 0) || CORES[0]
    this.craftSel.wood = firstWood.id
    this.craftSel.core = firstCore.id
  }

  /* ------------------------------------------------------ HUD */
  updateHUD() {
    const p = state.player
    this.el.gold.textContent = gold(p.gold)
    this.el.rep.textContent = p.rep
    this.el.level.textContent = `Lv ${p.level}`
    this.el.rank.textContent = rankTitle()
    const need = 90 + (p.level - 1) * 70
    this.el.xp.style.width = Math.min(100, (p.xp / need) * 100) + '%'
    const wand = getEquippedWand()
    if (wand) {
      this.el.wandName.textContent = wand.name
      const wood = woodById[wand.wood], core = coreById[wand.core]
      this.el.wandSwatch.style.background = `linear-gradient(180deg,${wood?.color || '#b58a5c'},${core?.color || '#6d4527'})`
      this.el.wandSwatch.style.boxShadow = `0 0 12px ${core?.color || '#d9b978'}66`
    }
    this.renderQuestTracker()
    this.renderHotbar()
    this.el.sound.classList.toggle('off', !state.settings.sound)
    this.el.sound.textContent = state.settings.sound ? '♪' : '×'
  }

  renderQuestTracker() {
    const active = activeQuests()
    const done = QUESTS.filter(q => state.quests[q.id]?.complete).length
    if (!active.length) {
      this.el.quests.innerHTML = `<div class="quest-item"><div class="quest-line"><span>Every pursuit complete</span></div><div class="quest-more">The world remembers your name.</div></div>`
      return
    }
    this.el.quests.innerHTML = active.map(q => {
      const prog = questProgress(q)
      return `<div class="quest-item">
        <div class="quest-line"><span>${esc(q.title)}</span><span class="qprog">${prog}/${q.target}</span></div>
        <div class="quest-bar"><div style="width:${(prog / q.target) * 100}%"></div></div>
      </div>`
    }).join('') + `<div class="quest-more">${done} of ${QUESTS.length} pursuits complete</div>`
  }

  setInteract(text) {
    if (!text) { this.el.prompt.classList.add('hidden'); return }
    this.el.promptText.textContent = text
    this.el.prompt.classList.remove('hidden')
  }

  toast(message, sub = '', type = 'magic', icon = '✦') {
    const div = document.createElement('div')
    div.className = 'toast ' + type
    div.innerHTML = `<span class="t-icon">${icon}</span><span>${esc(message)}${sub ? `<small>${esc(sub)}</small>` : ''}</span>`
    this.el.toasts.appendChild(div)
    const id = ++this._toastId
    setTimeout(() => { if (div.parentNode) { div.classList.add('out'); setTimeout(() => div.remove(), 320) } }, 4200)
    while (this.el.toasts.children.length > 4) this.el.toasts.firstChild.remove()
  }

  objective(text) {
    this.el.obj.textContent = text
    this.el.obj.classList.add('show')
    clearTimeout(this._objTimer)
    this._objTimer = setTimeout(() => this.el.obj.classList.remove('show'), 2600)
  }

  duelMessage(text, duration = 1.4) {
    this.el.duelMsg.textContent = text
    this.el.duelMsg.classList.remove('show')
    void this.el.duelMsg.offsetWidth
    this.el.duelMsg.classList.add('show')
    clearTimeout(this._duelMsgTimer)
    this._duelMsgTimer = setTimeout(() => this.el.duelMsg.classList.remove('show'), duration * 1000)
  }

  hitFlash() {
    this.el.hitFlash.classList.add('on')
    clearTimeout(this._hitTimer)
    this._hitTimer = setTimeout(() => this.el.hitFlash.classList.remove('on'), 110)
  }

  /* ------------------------------------------------------ HOTBAR */
  renderHotbar() {
    const sig = (state.loadout || []).join('|')
    if (sig === this._hotbarSig) return
    this._hotbarSig = sig
    const ids = state.loadout || []
    let html = ''
    for (let i = 0; i < 4; i++) {
      const id = ids[i]
      const sp = id ? SPELL_BY_ID[id] : null
      if (sp) {
        html += `<div class="spell-slot category-${sp.cat}" data-slot="${i}" title="${esc(sp.name)} — ${esc(sp.desc)}">
          <div class="cat-glow"></div><span class="key">${i + 1}</span><span class="s-icon">${sp.icon}</span>
          <span class="s-name">${esc(sp.name)}</span><span class="cd"></span></div>`
      } else {
        html += `<div class="spell-slot empty"><span class="key">${i + 1}</span><span class="s-name">empty</span></div>`
      }
    }
    this.el.hotbar.innerHTML = html
    this.el.hotbar.querySelectorAll('.spell-slot[data-slot]').forEach(sl => {
      sl.addEventListener('click', () => this.hooks.onCastSlot?.(Number(sl.dataset.slot)))
    })
  }

  updateCombat(duelHud, inDuel) {
    if (duelHud) {
      this.el.manaFill.style.width = (duelHud.mana / duelHud.maxMana) * 100 + '%'
      this.el.manaValue.textContent = Math.round(duelHud.mana)
      this.el.duelHealth.style.width = (duelHud.hp / duelHud.maxHp) * 100 + '%'
      this.el.duelHealthText.textContent = `${duelHud.hp} / ${duelHud.maxHp}`
      this.el.enemyHealth.style.width = (duelHud.enemyHp / duelHud.enemyMax) * 100 + '%'
      this.el.enemyName.textContent = duelHud.enemyName
      this.el.enemyTitle.textContent = duelHud.enemyTitle
      this.el.enemyPhase.textContent = duelHud.phase
      this.el.duelWand.textContent = duelHud.wandName ? `· ${duelHud.wandName}` : ''
      this.el.duelBuffs.innerHTML = (duelHud.buffs || []).map(b => `<span class="buff-chip">${esc(b)}</span>`).join('')
      const slots = this.el.hotbar.querySelectorAll('.spell-slot[data-slot]')
      slots.forEach((sl, i) => {
        const id = duelHud.loadout[i]
        if (!id) return
        const cd = duelHud.cooldowns?.[id] || 0
        const cdEl = sl.querySelector('.cd')
        if (cdEl) {
          cdEl.textContent = cd > 0 ? Math.ceil(cd) : ''
          cdEl.style.opacity = cd > 0 ? '1' : '0'
        }
        sl.classList.toggle('cooling', cd > 0)
      })
    } else {
      const maxM = maxMana()
      this.el.manaFill.style.width = (state.player.mana / maxM) * 100 + '%'
      this.el.manaValue.textContent = Math.round(state.player.mana)
      this.el.hotbar.querySelectorAll('.cd').forEach(c => { c.style.opacity = '0' })
    }
    this.el.duelUi.classList.toggle('hidden', !inDuel)
  }

  setDuelUI(active) {
    this.el.duelUi.classList.toggle('hidden', !active)
  }

  /* ------------------------------------------------------ MINIMAP */
  drawMinimap(force = false) {
    const c = this.ctx, S = 200
    c.clearRect(0, 0, S, S)
    const cx = S / 2, cy = S / 2, scale = 0.86
    const px = this.hooks.getPlayerPos?.() || { x: 0, z: 0 }
    const toMap = (x, z) => [cx + x * scale, cy + z * scale]
    c.save()
    c.beginPath(); c.arc(cx, cy, 96, 0, Math.PI * 2); c.clip()
    const bg = c.createRadialGradient(cx, cy - 20, 10, cx, cy, 100)
    bg.addColorStop(0, '#1b142c'); bg.addColorStop(1, '#0a0714')
    c.fillStyle = bg; c.fillRect(0, 0, S, S)
    // paths
    c.strokeStyle = 'rgba(217,185,120,.15)'; c.lineWidth = 2
    const paths = this.hooks.getPathPoints?.() || []
    if (paths.length) {
      c.beginPath()
      paths.forEach((p, i) => { const [mx, my] = toMap(p.x, p.z); i ? c.lineTo(mx, my) : c.moveTo(mx, my) })
      c.stroke()
    }
    // zones
    for (const z of ZONES) {
      const [zx, zy] = toMap(z.pos[0], z.pos[1])
      const rad = z.radius * scale
      c.beginPath(); c.arc(zx, zy, rad, 0, Math.PI * 2)
      c.fillStyle = z.color + '22'; c.fill()
      c.strokeStyle = z.color + '55'; c.lineWidth = 1; c.stroke()
      c.beginPath(); c.arc(zx, zy, 2.4, 0, Math.PI * 2); c.fillStyle = z.color; c.fill()
    }
    // nodes
    for (const node of NODES) {
      const cd = state.nodeCooldowns[node.id] || 0
      if (cd > Date.now()) continue
      if (node.bossOnly && !state.flags.bossDefeated) continue
      const [nx, ny] = toMap(node.pos[0], node.pos[1])
      const m = matById[node.mat]
      const col = node.type === 'wood' || node.type === 'core' ? (m ? RARITIES[m.rarity].color : '#d9b978') : (node.type === 'chest' ? '#e9c874' : '#9fd8ff')
      c.beginPath(); c.arc(nx, ny, node.type === 'chest' ? 2.2 : 1.4, 0, Math.PI * 2)
      c.fillStyle = col + 'c0'; c.fill()
    }
    // arena
    const [ax, ay] = toMap(24, -4)
    c.beginPath(); c.arc(ax, ay, 11 * scale, 0, Math.PI * 2); c.strokeStyle = 'rgba(224,103,122,.5)'; c.lineWidth = 1; c.stroke()
    // player
    const [mx, my] = toMap(px.x, px.z)
    const heading = this.hooks.getPlayerFacing?.() || 0
    c.save(); c.translate(mx, my); c.rotate(-heading + Math.PI)
    c.beginPath(); c.moveTo(0, -6); c.lineTo(4.6, 5); c.lineTo(0, 2.4); c.lineTo(-4.6, 5); c.closePath()
    c.fillStyle = '#f5dfa6'; c.shadowColor = 'rgba(245,223,166,.9)'; c.shadowBlur = 8; c.fill()
    c.restore()
    // border ticks
    c.strokeStyle = 'rgba(217,185,120,.2)'; c.lineWidth = 1
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2
      c.beginPath(); c.moveTo(cx + Math.cos(a) * 91, cy + Math.sin(a) * 91); c.lineTo(cx + Math.cos(a) * 96, cy + Math.sin(a) * 96); c.stroke()
    }
    c.restore()
    const zone = this.hooks.getZone?.()
    if (zone) this.el.zone.textContent = zone.name
  }

  tick(dt) {
    this._minimapAcc += dt
    if (this._minimapAcc > 0.12) { this._minimapAcc = 0; this.drawMinimap() }
    if (this.panelName === 'wand' && this.previewCtx) {
      this._previewTime += dt
      this.drawWandPreview(this._previewTime)
    }
  }

  /* ------------------------------------------------------ DIALOGUE */
  showDialogue(npc) {
    this.dialogueNpc = npc
    this.el.dlgName.textContent = npc.name
    this.el.dlgPortrait.textContent = npc.name.split(' ').filter(w => !['the', 'of'].includes(w.toLowerCase())).slice(-1)[0][0]
    this.el.dlgPortrait.style.background = `radial-gradient(circle at 40% 30%, ${npc.accent}55, ${npc.color})`
    this.el.dlgText.textContent = npc.greeting
    this.renderDialogueOptions(npc.options)
    this.el.dialogue.classList.remove('hidden')
    this.setInteract(null)
  }

  renderDialogueOptions(options) {
    this.el.dlgOptions.innerHTML = ''
    for (const opt of options) {
      const b = document.createElement('button')
      b.className = 'dlg-opt' + (opt.action !== 'close' && opt.action !== 'talk' ? ' primary' : '')
      b.textContent = opt.label
      b.addEventListener('click', () => {
        this.hooks.onSfx?.('click')
        if (opt.action === 'talk') {
          this.el.dlgText.textContent = opt.text || 'The wizard considers you for a long moment, then says nothing at all.'
          return
        }
        if (opt.action === 'close') { this.closeDialogue(); return }
        this.hooks.onDialogueAction?.(opt, this.dialogueNpc)
      })
      this.el.dlgOptions.appendChild(b)
    }
    const farewell = document.createElement('button')
    farewell.className = 'dlg-opt'
    farewell.textContent = 'Farewell'
    farewell.addEventListener('click', () => this.closeDialogue())
    this.el.dlgOptions.appendChild(farewell)
  }

  closeDialogue() {
    this.el.dialogue.classList.add('hidden')
    this.dialogueNpc = null
    this.hooks.onDialogueClose?.()
  }

  /* ------------------------------------------------------ PANEL FRAME */
  openPanel(name, tab = null) {
    if (this.hooks.isBusy?.()) return
    this.panelName = name
    this.panelTab = tab
    this.el.panelRoot.classList.remove('hidden')
    this.el.dialogue.classList.add('hidden')
    this.setInteract(null)
    this.renderPanel()
    this.hooks.onPanelOpen?.(name)
  }

  closePanel() {
    if (this.el.panelRoot.classList.contains('hidden')) return
    this.el.panelRoot.classList.add('hidden')
    this.stopPreview()
    const name = this.panelName
    this.panelName = null
    this.hooks.onPanelClose?.(name)
  }

  rerender() {
    if (!this.panelName) return
    const body = this.el.panel.querySelector('.panel-body')
    this._panelScroll = body ? body.scrollTop : 0
    this.renderPanel()
  }

  renderPanel() {
    const scroll = this._panelScroll
    switch (this.panelName) {
      case 'wand': this.el.panel.innerHTML = this.wandPanel(); break
      case 'spells': this.el.panel.innerHTML = this.spellPanel(); break
      case 'shop': this.el.panel.innerHTML = this.shopPanel(); break
      case 'map': this.el.panel.innerHTML = this.mapPanel(); break
      case 'journal': this.el.panel.innerHTML = this.journalPanel(); break
      case 'tournament': this.el.panel.innerHTML = this.tournamentPanel(); break
      case 'duelpick': this.el.panel.innerHTML = this.duelPickPanel(); break
      default: this.closePanel(); return
    }
    this.bindPanel()
    requestAnimationFrame(() => {
      const body = this.el.panel.querySelector('.panel-body')
      if (body && scroll) body.scrollTop = scroll
      if (this.panelName === 'wand') this.startPreview()
      if (this.panelName === 'map') this.drawWorldMap()
    })
  }

  panelHead(kicker, title, sub, glyph) {
    return `<div class="panel-head">
      <div class="panel-title-wrap">
        <div class="panel-glyph"><span>${glyph}</span></div>
        <div><div class="panel-kicker">${esc(kicker)}</div><div class="panel-title">${esc(title)}</div><div class="panel-sub">${esc(sub)}</div></div>
      </div>
      <div class="panel-head-r">
        <div class="panel-stat"><span class="ps-icon">◉</span>${gold(state.player.gold)}</div>
        <div class="panel-stat"><span class="ps-icon">✦</span>${state.player.rep}</div>
        <button class="panel-close" data-close>×</button>
      </div>
    </div>`
  }

  headerButtons() {
    return `<div class="panel-head-r"><div class="panel-stat"><span class="ps-icon">◉</span>${gold(state.player.gold)}</div><div class="panel-stat"><span class="ps-icon">✦</span>${state.player.rep} rep</div><button class="panel-close" data-close>×</button></div>`
  }

  bindPanel() {
    const p = this.el.panel
    p.querySelector('[data-close]')?.addEventListener('click', () => this.closePanel())
    p.querySelectorAll('[data-paction]').forEach(b => {
      b.addEventListener('click', () => {
        this.hooks.onSfx?.('click')
        this.panelAction(b.dataset.paction, b.dataset)
      })
    })
    if (this.panelName === 'wand') this.bindWandPanel()
    if (this.panelName === 'spells') this.bindSpellPanel()
    if (this.panelName === 'shop') this.bindShopPanel()
    if (this.panelName === 'map') this.bindMapPanel()
    if (this.panelName === 'journal') this.bindJournalPanel()
    if (this.panelName === 'tournament') this.bindTournamentPanel()
    if (this.panelName === 'duelpick') this.bindDuelPickPanel()
  }

  panelAction(action, data) {
    switch (action) {
      case 'equip': equipWand(data.id); this.hooks.refreshEquip?.(); this.rerender(); this.updateHUD(); this.toast('Wand equipped', 'It settles into your hand like it belongs there.', 'good', '⚕'); this.hooks.onSfx?.('equip'); break
      case 'buy': {
        const mat = matById[data.id]
        if (!mat) return
        const price = Math.round(mat.price * 1.6)
        if (!spendGold(price)) { this.toast('Not enough galleons', `You need ${price}g for ${mat.name}.`, 'bad', '◉'); this.hooks.onSfx?.('deny'); return }
        addMat(data.id, 1)
        this.hooks.onSfx?.('coin')
        this.toast(`Bought ${mat.name}`, `${price} galleons · ${RARITIES[mat.rarity].label}`, 'good', '◉')
        this.rerender(); this.updateHUD()
        break
      }
      case 'sell': {
        const res = sellWand(data.wand, data.customer)
        if (!res.ok) { this.toast('Sale declined', res.error, 'bad', '!'); this.hooks.onSfx?.('deny'); return }
        this.hooks.onSfx?.('coin')
        this.toast('Wand sold', `+${res.price} galleons · +${res.rep} reputation`, 'good', '◉')
        this.hooks.onSale?.(res)
        this.rerender(); this.updateHUD()
        break
      }
      case 'refresh-customers': refreshCustomers(3); this.hooks.onSfx?.('magic'); this.toast('New customers arrive', 'Word of your shop is spreading.', 'magic', '⌂'); this.rerender(); break
      case 'upgrade': {
        const res = buyUpgrade(data.id)
        if (!res.ok) { this.toast('Upgrade unavailable', res.error, 'bad', '!'); this.hooks.onSfx?.('deny'); return }
        this.hooks.onSfx?.('upgrade')
        this.toast('Workshop improved', `${data.id} is now level ${res.level}.`, 'good', '⚒')
        this.rerender(); this.updateHUD()
        break
      }
      case 'travel': {
        const zone = ZONES.find(z => z.id === data.id)
        if (!zone || state.player.rep < zone.reqRep) { this.toast('Location sealed', `Requires ${zone?.reqRep || 0} reputation.`, 'bad', '⌖'); return }
        this.closePanel()
        this.hooks.onTravel?.(zone)
        break
      }
      case 'tab': this.panelTab = data.tab; this.rerender(); break
      case 'lesson-tab': this.panelTab = data.cat; this.rerender(); break
      case 'open-lesson': this.openLesson(data.cat); break
      case 'toggle-loadout': {
        const res = toggleLoadout(data.id)
        if (!res.ok) { this.toast('Cannot equip spell', res.error, 'bad', '!'); this.hooks.onSfx?.('deny'); return }
        this.renderHotbar(); this.updateHUD(); this.rerender()
        break
      }
      case 'tournament-enter': {
        const round = Number(data.round)
        const r = TOURNAMENT[round]
        if (!r) return
        this.closePanel()
        this.hooks.startDuel?.(r.opponent, { tournament: true, roundIndex: round })
        break
      }
      case 'duel': {
        this.closePanel()
        this.hooks.startDuel?.(data.enemy, {})
        break
      }
      case 'reset': {
        if (!this.resetArmed) {
          this.resetArmed = true
          this.rerender()
          this.toast('Are you certain?', 'Press “Confirm erase” to burn this legacy and begin again.', 'bad', '☠')
          setTimeout(() => { this.resetArmed = false }, 5000)
          return
        }
        resetGame()
        this.closePanel()
        this.hooks.onReset?.()
        break
      }
      case 'toggle-sound': this.el.sound.click(); break
    }
  }

  /* ------------------------------------------------------ WAND PANEL */
  wandPanel() {
    const sel = this.craftSel
    if (!sel.wood) this.pickDefaultMaterials()
    const preview = computeWand({ woodId: sel.wood, coreId: sel.core, length: sel.length, flex: sel.flex, quality: 1.02 })
    const wood = woodById[sel.wood], core = coreById[sel.core]
    const cost = craftCost(sel.wood, sel.core)
    const key = `${sel.wood}:${sel.core}`
    const combo = COMBOS[key]
    const discovered = state.discovered.includes(key)
    const lens = state.upgrades.lens > 0
    const canCraft = countMat(sel.wood) > 0 && countMat(sel.core) > 0 && state.player.gold >= cost
    const aff = wandAffinities(preview)
    const rarity = RARITIES[preview.rarity]
    const abilityHtml = preview.ability.legendary
      ? `<div class="ability-box"><div class="ability-kicker">Legendary Resonance</div><div class="ability-name">✦ ${esc(preview.ability.name)}</div><div class="ability-desc">${esc(preview.ability.desc)}</div></div>`
      : discovered
        ? `<div class="ability-box"><div class="ability-kicker">Discovered Resonance</div><div class="ability-name">${esc(preview.ability.name)}</div><div class="ability-desc">${esc(preview.ability.desc)}</div></div>`
        : `<div class="ability-box locked"><div class="ability-kicker">Uncharted Resonance</div><div class="ability-name">${lens && combo ? '◈ ' + esc(combo.name) : 'An undiscovered pairing'}</div><div class="ability-desc">${lens && combo ? esc(combo.desc) : 'Craft this pairing to reveal its nature. Some unions are legend; most are simply useful.'}</div></div>`

    const woodOpts = [...WOODS].sort((a, b) => (countMat(b.id) > 0) - (countMat(a.id) > 0) || RARITIES[b.rarity].order - RARITIES[a.rarity].order).map(w => {
      const n = countMat(w.id)
      return `<button class="mat-opt ${sel.wood === w.id ? 'selected' : ''} ${n === 0 ? 'disabled' : ''}" data-wood="${w.id}" ${n === 0 ? 'disabled' : ''}>
        <span class="mat-swatch" style="background:${w.color};color:${w.color}"></span>
        <span class="mat-meta"><span class="mat-name">${esc(w.name)}</span><span class="mat-count">${n > 0 ? '×' + n : 'none'}</span></span>
        <span class="rar-tick rar-${w.rarity}"></span></button>`
    }).join('')
    const coreOpts = [...CORES].sort((a, b) => (countMat(b.id) > 0) - (countMat(a.id) > 0) || RARITIES[b.rarity].order - RARITIES[a.rarity].order).map(c => {
      const n = countMat(c.id)
      return `<button class="mat-opt ${sel.core === c.id ? 'selected' : ''} ${n === 0 ? 'disabled' : ''}" data-core="${c.id}" ${n === 0 ? 'disabled' : ''}>
        <span class="mat-swatch" style="background:${c.color};color:${c.color}"></span>
        <span class="mat-meta"><span class="mat-name">${esc(c.name)}</span><span class="mat-count">${n > 0 ? '×' + n : 'none'}</span></span>
        <span class="rar-tick rar-${c.rarity}"></span></button>`
    }).join('')

    const flexOpts = FLEXIBILITIES.map(f => `<button class="flex-opt ${sel.flex === f.id ? 'selected' : ''}" data-flex="${f.id}" title="${esc(f.desc)}">${f.name}</button>`).join('')
    const affChips = Object.entries(aff).sort((a, b) => b[1] - a[1]).map(([cat, v]) => {
      const c = CATEGORIES[cat]
      return `<span class="aff-chip" style="border-color:${c.color}44"><span style="color:${c.color}">${c.glyph}</span>${c.label}<b>+${Math.round(v * 100)}%</b></span>`
    }).join('')

    const coll = state.wands.length ? state.wands.map(w => {
      const core2 = coreById[w.core]
      const wood2 = woodById[w.wood]
      return `<div class="wand-card ${w.id === state.equipped ? 'equipped' : ''}">
        <div class="wc-stick" style="background:linear-gradient(180deg,${wood2.color},${core2.color});color:${core2.color}"></div>
        <div class="wc-info">
          <div class="wc-name">${esc(w.name)} <span style="color:${RARITIES[w.rarity].color};font-size:8px">✦${RARITIES[w.rarity].label}</span></div>
          <div class="wc-sub">${esc(wood2.name)} · ${esc(core2.name)} · ${formatLength(w.length)}</div>
          <div class="wc-actions">
            ${w.id === state.equipped ? '<span class="wc-eq">EQUIPPED</span>' : `<button class="wc-act" data-paction="equip" data-id="${w.id}">Equip</button>`}
            <span class="wc-act" style="border-color:transparent;color:#9a8a72">${w.value}g</span>
          </div>
        </div>
      </div>`
    }).join('') : '<div class="empty-note">No wands yet. The bench is waiting.</div>'

    return `${this.panelHead('The Wandmaker’s Bench', 'Wandcraft', 'Wood, core, length and temperament. Everything matters.', '⚕')}
    <div class="panel-body">
      <div class="craft-grid">
        <div class="craft-col">
          <div class="field-label">Wood <span>${wood ? esc(wood.name) : ''}</span></div>
          <div class="mat-grid">${woodOpts}</div>
          <div class="field-label">Core <span>${core ? esc(core.name) : ''}</span></div>
          <div class="mat-grid">${coreOpts}</div>
          <div class="field-label">Length <span id="len-val">${formatLength(sel.length)}</span></div>
          <div class="slider-row">
            <input id="len-slider" type="range" min="9" max="15" step="0.75" value="${sel.length}">
            <span class="length-val">${formatLength(sel.length)}</span>
          </div>
          <div class="field-label">Flexibility <span>${FLEXIBILITIES.find(f => f.id === sel.flex)?.desc || ''}</span></div>
          <div class="flex-row">${flexOpts}</div>
        </div>
        <div class="craft-col">
          <div class="wand-stage">
            <canvas id="wand-preview"></canvas>
            <div class="wand-caption">
              <div class="wand-name" id="preview-name">${esc(preview.name)}</div>
              <div class="wand-sub" id="preview-sub">${esc(wood.name)} &amp; ${esc(core.name)} · ${formatLength(sel.length)} · ${FLEXIBILITIES.find(f => f.id === sel.flex)?.name}</div>
            </div>
          </div>
          ${abilityHtml}
          <div class="stats-grid">
            ${this.statBar('Power', preview.stats.power, '#ff9270')}
            ${this.statBar('Control', preview.stats.control, '#78b9ff')}
            ${this.statBar('Finesse', preview.stats.finesse, '#c79bff')}
            ${this.statBar('Resonance', preview.rating, '#e9c874')}
          </div>
          <div class="field-label">Spell Affinity <span>${discovered ? 'charted pairing' : 'uncharted'}</span></div>
          <div class="aff-chips">${affChips}</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:11.5px;color:var(--muted)">
            <span>Rarity <b style="color:${rarity.color};font-family:Cinzel,serif;font-weight:400">${rarity.label}</b></span>
            <span>· Projected value <b style="color:#f0d79a;font-family:Cinzel,serif;font-weight:400">${preview.value}g</b></span>
            <span>· Core: <b style="color:#cfc0e5;font-family:Cinzel,serif;font-weight:400">${esc(core.passive?.name || '—')}</b></span>
          </div>
        </div>
        <div class="craft-col">
          <div style="border:1px solid rgba(217,185,120,.14);border-radius:8px;padding:16px;background:rgba(255,255,255,.02)">
            <div class="field-label" style="font-size:10px">The Binding</div>
            <div style="font-size:13px;color:#b9adc7;line-height:1.5;margin-bottom:12px">
              ${esc(wood.desc)}
            </div>
            <div class="ability-box" style="border-left-color:${core.color}">
              <div class="ability-kicker">Core Temperament</div>
              <div class="ability-name">${esc(core.passive?.name || 'Quiet')}</div>
              <div class="ability-desc">${esc(core.passive?.desc || '')}</div>
            </div>
            <div class="craft-cost"><span>Materials</span><b>${countMat(sel.wood) > 0 ? '1' : '0'} wood · ${countMat(sel.core) > 0 ? '1' : '0'} core</b></div>
            <div class="craft-cost" style="border:0;padding-top:0"><span>Binding cost</span><b>${cost} g</b></div>
            <button class="btn full" data-craft ${canCraft ? '' : 'disabled'} style="margin-top:8px">Bind the Wand</button>
            <div style="font-size:11px;color:var(--muted);font-style:italic;text-align:center;margin-top:8px">${state.upgrades.bench > 0 ? `Bench Lv ${state.upgrades.bench} · finer work` : 'A steady hand produces a serviceable wand.'}</div>
          </div>
        </div>
      </div>
      <div class="collection">
        <div class="coll-head"><div class="coll-title">Your Collection · ${state.wands.length}</div><div class="coll-sub">Sell wands to customers through your shop</div></div>
        <div class="coll-grid">${coll}</div>
      </div>
    </div>`
  }

  statBar(label, value, color) {
    return `<div class="stat-row"><div class="stat-top"><span>${label}</span><b>${value}</b></div><div class="stat-bar"><div style="width:${value}%;background:${color};box-shadow:0 0 8px ${color}66"></div></div></div>`
  }

  bindWandPanel() {
    const p = this.el.panel
    p.querySelectorAll('[data-wood]').forEach(b => b.addEventListener('click', () => {
      if (b.disabled) return
      this.craftSel.wood = b.dataset.wood
      this.hooks.onSfx?.('select')
      this.rerender()
    }))
    p.querySelectorAll('[data-core]').forEach(b => b.addEventListener('click', () => {
      if (b.disabled) return
      this.craftSel.core = b.dataset.core
      this.hooks.onSfx?.('select')
      this.rerender()
    }))
    p.querySelectorAll('[data-flex]').forEach(b => b.addEventListener('click', () => {
      this.craftSel.flex = b.dataset.flex
      this.hooks.onSfx?.('select')
      this.rerender()
    }))
    const slider = p.querySelector('#len-slider')
    if (slider) {
      slider.addEventListener('input', () => {
        this.craftSel.length = Number(slider.value)
        const lv = document.getElementById('len-val')
        if (lv) lv.textContent = formatLength(this.craftSel.length)
      })
      slider.addEventListener('change', () => this.rerender())
    }
    p.querySelector('[data-craft]')?.addEventListener('click', () => this.doBind())
  }

  doBind() {
    const sel = this.craftSel
    const res = craftWand({ woodId: sel.wood, coreId: sel.core, length: sel.length, flex: sel.flex })
    if (!res.ok) { this.toast('Binding failed', res.error, 'bad', '!'); this.hooks.onSfx?.('deny'); return }
    this.hooks.onSfx?.('craft')
    const wand = res.wand
    this.toast(`${wand.name}`, `${qualityLabel(wand.quality)} ${RARITIES[wand.rarity].label} wand · ${wand.value}g`, res.discovery ? 'magic' : 'good', res.discovery ? '✦' : '⚕')
    if (res.discovery) {
      this.objective(`Legendary resonance discovered — ${res.discovery.name}`)
      this.hooks.onDiscovery?.(res.discovery)
    }
    if (res.kilnKeep) this.toast('Core preserved', 'The kiln coaxed the heartstring free intact.', 'good', '⚒')
    this.pickDefaultMaterials()
    this.rerender()
    this.updateHUD()
    this.hooks.refreshEquip?.()
  }

  startPreview() {
    this.stopPreview()
    const canvas = document.getElementById('wand-preview')
    if (!canvas) return
    this.previewCanvas = canvas
    this.previewCtx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = canvas.getBoundingClientRect()
    canvas.width = Math.max(1, rect.width * dpr)
    canvas.height = Math.max(1, rect.height * dpr)
    this.previewCtx.scale(dpr, dpr)
    this._previewTime = 0
    this.drawWandPreview(0)
  }
  stopPreview() { this.previewCanvas = null; this.previewCtx = null }

  drawWandPreview(t) {
    const c = this.previewCtx, canvas = this.previewCanvas
    if (!c || !canvas) return
    const W = canvas.width / Math.min(window.devicePixelRatio || 1, 2)
    const H = canvas.height / Math.min(window.devicePixelRatio || 1, 2)
    c.clearRect(0, 0, W, H)
    const preview = computeWand({ woodId: this.craftSel.wood, coreId: this.craftSel.core, length: this.craftSel.length, flex: this.craftSel.flex, quality: 1.02 })
    const wood = woodById[this.craftSel.wood], core = coreById[this.craftSel.core]
    if (!wood || !core) return
    const ax = W * 0.16, ay = H * 0.82, bx = W * 0.8, by = H * 0.22
    const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy)
    const ux = dx / len, uy = dy / len, nx = -uy, ny = ux
    const thickness = 3.4 + (this.craftSel.length - 9) * 0.16
    // aura
    const aura = c.createRadialGradient(W * 0.5, H * 0.53, 4, W * 0.5, H * 0.53, W * 0.45)
    aura.addColorStop(0, core.color + '30'); aura.addColorStop(0.55, core.color + '12'); aura.addColorStop(1, 'transparent')
    c.fillStyle = aura; c.fillRect(0, 0, W, H)
    // magic circle behind
    c.save(); c.translate(W * 0.5, H * 0.5)
    c.strokeStyle = core.color + '20'; c.lineWidth = 1
    c.beginPath(); c.arc(0, 0, Math.min(W, H) * 0.29, 0, Math.PI * 2); c.stroke()
    c.setLineDash([3, 10]); c.beginPath(); c.arc(0, 0, Math.min(W, H) * 0.34, t * 0.2, t * 0.2 + Math.PI * 2); c.stroke(); c.setLineDash([])
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + t * 0.06
      c.beginPath(); c.arc(Math.cos(a) * Math.min(W, H) * 0.29, Math.sin(a) * Math.min(W, H) * 0.29, 1.6, 0, Math.PI * 2); c.fillStyle = core.color + '55'; c.fill()
    }
    c.restore()
    // shaft
    c.save()
    c.lineCap = 'round'
    for (let pass = 0; pass < 3; pass++) {
      const grad = c.createLinearGradient(ax, ay, bx, by)
      grad.addColorStop(0, pass === 0 ? '#1b1218' : wood.color)
      grad.addColorStop(0.45, pass === 0 ? wood.color : this.lighten(wood.color, 28))
      grad.addColorStop(0.82, pass === 0 ? this.lighten(wood.color, 10) : wood.color)
      grad.addColorStop(1, core.color)
      c.strokeStyle = grad
      c.lineWidth = thickness * (pass === 0 ? 1.5 : 1) * (1 - pass * 0.18)
      c.globalAlpha = pass === 0 ? 0.45 : 1
      c.beginPath()
      c.moveTo(ax, ay)
      c.quadraticCurveTo(ax + dx * 0.5 + nx * 6, ay + dy * 0.5 + ny * 6, bx, by)
      c.stroke()
    }
    c.globalAlpha = 1
    // grain lines
    c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 0.7
    for (let i = -1; i <= 1; i += 2) {
      c.beginPath(); c.moveTo(ax + nx * thickness * i, ay + ny * thickness * i)
      c.quadraticCurveTo(ax + dx * 0.5 + nx * (6 + thickness * i), ay + dy * 0.5 + ny * (6 + thickness * i), bx + nx * thickness * 0.5 * i, by + ny * thickness * 0.5 * i); c.stroke()
    }
    // handle wrap
    c.strokeStyle = '#2b1a12'; c.lineWidth = thickness * 2.1
    c.beginPath(); c.moveTo(ax + ux * 4, ay + uy * 4); c.lineTo(ax + ux * (len * 0.19), ay + uy * (len * 0.19)); c.stroke()
    c.strokeStyle = this.lighten(wood.color, -22); c.lineWidth = 1.1
    const wraps = 7
    for (let i = 0; i < wraps; i++) {
      const p = 0.035 + (i / wraps) * 0.15
      const x = ax + dx * p, y = ay + dy * p
      c.beginPath(); c.moveTo(x - ux * 2.2 + nx * thickness, y - uy * 2.2 + ny * thickness); c.lineTo(x + ux * 2.2 - nx * thickness, y + uy * 2.2 - ny * thickness); c.stroke()
    }
    // pommel
    c.beginPath(); c.arc(ax, ay, thickness * 1.35, 0, Math.PI * 2); c.fillStyle = core.color + 'aa'; c.fill()
    c.strokeStyle = '#d9b978'; c.lineWidth = 1; c.stroke()
    // tip core
    const pulse = 1 + Math.sin(t * 2.4) * 0.12
    const glow = c.createRadialGradient(bx, by, 1, bx, by, 26 * pulse)
    glow.addColorStop(0, '#ffffff'); glow.addColorStop(0.22, core.color); glow.addColorStop(0.6, core.color + '55'); glow.addColorStop(1, 'transparent')
    c.fillStyle = glow
    c.beginPath(); c.arc(bx, by, 26 * pulse, 0, Math.PI * 2); c.fill()
    c.beginPath(); c.arc(bx, by, 4.2, 0, Math.PI * 2); c.fillStyle = '#fff8e6'; c.fill()
    // orbiting motes
    for (let i = 0; i < 7; i++) {
      const a = t * 0.8 + i * 0.9
      const r = 20 + (i % 3) * 13
      const mx = bx + Math.cos(a) * r, my = by + Math.sin(a * 1.2) * r
      c.beginPath(); c.arc(mx, my, 1.3 + (i % 2), 0, Math.PI * 2); c.fillStyle = core.color + 'aa'; c.fill()
    }
    c.restore()
  }

  lighten(hex, amt) {
    const n = parseInt(hex.slice(1), 16)
    let r = (n >> 16) + amt, g = ((n >> 8) & 255) + amt, b = (n & 255) + amt
    r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b))
    return `rgb(${r},${g},${b})`
  }

  /* ------------------------------------------------------ SPELL PANEL */
  spellPanel() {
    const cat = this.panelTab || Object.keys(CATEGORIES)[0]
    const meta = CATEGORIES[cat]
    const unlocked = categoryUnlocked(cat)
    const spells = CATEGORY_SPELLS[cat]
    const learnedCount = spells.filter(s => state.learned[s.id]).length
    const target = nextLessonSpell(cat)
    const tabs = Object.entries(CATEGORIES).map(([id, c]) => {
      const u = categoryUnlocked(id)
      return `<button class="cat-tab ${id === cat ? 'active' : ''} ${u ? '' : 'locked'}" data-cat-tab="${id}">${c.glyph} ${c.label}${u ? '' : ' 🔒'}</button>`
    }).join('')
    const rows = spells.map((s, i) => {
      const known = !!state.learned[s.id]
      const rank = masteryRank(s.id)
      const pips = [0, 1, 2].map(j => `<span class="mastery-pip ${j < rank ? 'on' : ''}"></span>`).join('')
      const equipped = state.loadout.includes(s.id)
      return `<div class="spell-row ${known ? '' : 'unknown'}">
        <div class="spell-sigil" style="color:${meta.color};box-shadow:0 0 20px ${meta.color}22,inset 0 0 18px ${meta.color}11">${s.icon}</div>
        <div class="spell-mid">
          <div class="spell-name-line"><span class="spell-name">${esc(s.name)}</span><span class="spell-incant">${known ? '“' + esc(s.incant) + '”' : 'incantation unknown'}</span></div>
          <div class="spell-desc">${esc(s.desc)}</div>
          <div class="mastery-row"><div class="mastery-pips">${pips}</div><span class="mastery-label">${known ? ['Novice', 'Adept', 'Master'][rank - 1] + ' · ' + masteryOf(s.id) + ' practice' : 'Unlearned'}</span></div>
        </div>
        ${known ? `<button class="btn small ${equipped ? 'violet' : ''}" data-paction="toggle-loadout" data-id="${s.id}">${equipped ? 'On Bar' : 'Equip'}</button>` : '<span style="font-family:Cinzel,serif;font-size:9px;color:var(--muted);letter-spacing:.1em">SEALED</span>'}
      </div>`
    }).join('')
    const slots = [0, 1, 2, 3].map(i => {
      const id = state.loadout[i]
      const s = id ? SPELL_BY_ID[id] : null
      return `<div class="lo-slot ${s ? 'filled' : ''}"><span class="lo-num">${i + 1}</span><span class="lo-icon" style="color:${s ? CATEGORIES[s.cat].color : ''}">${s ? s.icon : '·'}</span><span class="lo-name">${s ? esc(s.name) : 'Empty quick-cast slot'}</span></div>`
    }).join('')
    const cta = !unlocked
      ? `<div class="lesson-cta"><h4>Category Sealed</h4><p>Reach <b>${meta.reqRep} reputation</b> to gain access to ${meta.label.toLowerCase()} lessons. You currently have ${state.player.rep}.</p><div class="prof-note">“${esc(meta.desc)}”</div></div>`
      : `<div class="lesson-cta"><h4>${target?.isNew ? 'Next Lesson' : 'Mastery Practice'}</h4>
          <p>${target ? `<b>${esc(target.spell.name)}</b> · ${target.isNew ? 'Learn this spell through a sigil-binding exercise.' : 'Practise the incantation to deepen your mastery.'}` : 'This school is fully mastered.'}</p>
          <button class="btn violet full" data-paction="open-lesson" data-cat="${cat}">${target?.isNew ? 'Attend the Lesson' : 'Practise the Sigil'}</button>
        </div>`
    return `${this.panelHead('Grimoire of the Six Schools', 'Spellcraft', 'Knowledge is the only spell that cannot be disarmed.', '✶')}
    <div class="panel-body">
      <div class="cat-tabs">${tabs}</div>
      <div class="spell-layout">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px">
            <div style="font-family:Cinzel,serif;font-size:13px;letter-spacing:.1em;color:${meta.color}">${meta.glyph} ${meta.label.toUpperCase()}</div>
            <div style="font-size:12px;color:var(--muted);font-style:italic">${learnedCount} / ${spells.length} spells learned · ${esc(meta.teacher)}</div>
          </div>
          <div class="spell-list">${rows}</div>
        </div>
        <div class="spell-side">
          <div class="loadout-box">
            <div class="loadout-title">Quick-Cast Bar</div>
            <div class="loadout-slots">${slots}</div>
            <div class="prof-note" style="margin-top:9px">Wand affinity raises spell strength. Mastery increases it further.</div>
          </div>
          ${cta}
          <div class="prof-note">“${esc(meta.desc)}”<br>— ${esc(meta.teacher)}</div>
        </div>
      </div>
    </div>`
  }

  bindSpellPanel() {
    this.el.panel.querySelectorAll('[data-cat-tab]').forEach(b => b.addEventListener('click', () => {
      this.panelTab = b.dataset.catTab
      this.hooks.onSfx?.('select')
      this.rerender()
    }))
  }

  /* ------------------------------------------------------ SHOP PANEL */
  shopPanel() {
    const tab = this.panelTab || 'customers'
    refreshCustomers(3)
    const tabs = [['customers', 'Customers'], ['market', 'Market'], ['workshop', 'Workshop']].map(([id, label]) =>
      `<button class="ptab ${tab === id ? 'active' : ''}" data-shop-tab="${id}">${label}</button>`).join('')
    let body = ''
    if (tab === 'customers') body = this.shopCustomers()
    else if (tab === 'market') body = this.shopMarket()
    else body = this.shopWorkshop()
    return `${this.panelHead('The Crooked Wand · Hollowmere', 'Wand Shop', 'Match the wand to the witch. Then count your galleons.', '⌂')}
      <div class="panel-tabs">${tabs}</div>
      <div class="panel-body">${body}</div>`
  }

  shopCustomers() {
    const wands = state.wands.filter(w => w.id !== state.equipped)
    const cards = state.customers.map(cust => {
      const opts = wands.map(w => {
        const offer = customerOffer(cust, w)
        return `<option value="${w.id}">${esc(w.name)} — ${offer.interested ? offer.offer + 'g' : 'beyond their means'}</option>`
      }).join('')
      return `<div class="customer-card" data-customer-card="${cust.id}">
        <div class="cust-head">
          <div><div class="cust-name">${esc(cust.name)}</div><div class="cust-persona">${esc(cust.persona)}</div></div>
          <div class="cust-budget">◉ ${gold(cust.budget)}</div>
        </div>
        <div class="cust-pref"><span class="pref-chip">${CATEGORIES[cust.pref].glyph} wants ${CATEGORIES[cust.pref].label}</span>${cust.rarityPref ? '<span class="pref-chip">✦ rare or better</span>' : ''}</div>
        <div class="cust-sell">
          <select class="cust-wand" data-cust="${cust.id}" ${wands.length ? '' : 'disabled'}>
            ${wands.length ? '<option value="">Choose a wand from your collection…</option>' + opts : '<option value="">No wands available to sell</option>'}
          </select>
          <button class="btn small" data-sell-btn="${cust.id}" ${wands.length ? '' : 'disabled'}>Offer</button>
        </div>
      </div>`
    }).join('')
    return `<div class="shop-layout">
      <div>
        <div class="j-section-title">Waiting Customers</div>
        ${cards || '<div class="empty-note"><span class="big">⌂</span>The shop is quiet. Craft a wand or ask around for more customers.</div>'}
        <div style="display:flex;gap:8px;margin-top:10px"><button class="btn small" data-paction="refresh-customers">Ask around for new customers</button><button class="btn small violet" data-paction="tab" data-tab="market">Buy materials</button></div>
      </div>
      <div>
        <div class="j-section-title">Shop Ledger</div>
        <div class="stat-list">
          <div class="big-stat"><b>${state.metrics.wandsSold}</b><span>Wands sold</span></div>
          <div class="big-stat"><b>${gold(state.metrics.goldEarned)}</b><span>Gold earned</span></div>
          <div class="big-stat"><b>${state.wands.length}</b><span>Wands owned</span></div>
          <div class="big-stat"><b>${state.upgrades.ledger}</b><span>Ledger level</span></div>
        </div>
        <div class="prof-note" style="line-height:1.6">Customers pay more when a wand’s strongest affinity matches what they want, or when it is rarer than they expected. A wand you have equipped cannot be sold.<br><br>“Sell the wand they need,” Mira says. “Then sell them the story of why they needed it.”</div>
      </div>
    </div>`
  }

  shopMarket() {
    const m = (list, label) => `<div class="j-section-title">${label}</div><div class="market-grid">${list.map(item => {
      const price = Math.round(item.price * 1.6)
      return `<div class="market-item">
        <span class="mi-dot" style="background:${item.color};color:${item.color}"></span>
        <div class="mi-info"><div class="mi-name">${esc(item.name)}</div><div class="mi-sub">${RARITIES[item.rarity].label} · owned ${countMat(item.id)}</div></div>
        <button class="mi-buy" data-paction="buy" data-id="${item.id}" ${state.player.gold < price ? 'style="opacity:.4"' : ''}>◉ ${price}</button>
      </div>`
    }).join('')}</div>`
    return `<div class="shop-layout">
      <div>${m(WOODS, 'Wand Woods')}</div>
      <div>
        ${m(CORES, 'Magical Cores')}
        <div class="prof-note" style="margin-top:14px">Barnaby’s markup is outrageous, but his stock is real. Gather materials in the wilds for free — or pay for convenience.</div>
      </div>
    </div>`
  }

  shopWorkshop() {
    const cards = BENCH_UPGRADES.map(u => {
      const lvl = state.upgrades[u.id] || 0
      const maxed = lvl >= u.max
      const cost = maxed ? 0 : u.cost[lvl]
      const pips = Array.from({ length: u.max }, (_, i) => `<span style="display:inline-block;width:14px;height:3px;border-radius:2px;margin-right:3px;background:${i < lvl ? '#d9b978' : 'rgba(255,255,255,.12)'}"></span>`).join('')
      return `<div class="upgrade-card">
        <div class="upg-icon">⚒</div>
        <div class="upg-info"><div class="upg-name">${esc(u.name)}</div><div class="upg-desc">${esc(u.desc)}</div><div class="upg-lvl">${pips} ${maxed ? 'MAX' : 'Level ' + lvl}</div></div>
        <button class="btn small" data-paction="upgrade" data-id="${u.id}" ${maxed || state.player.gold < cost ? 'disabled' : ''}>${maxed ? 'Complete' : '◉ ' + cost}</button>
      </div>`
    }).join('')
    return `<div class="shop-layout">
      <div><div class="j-section-title">Crafting Equipment</div>${cards}
        <div class="prof-note" style="margin-top:12px">Upgrades are permanent. The bench improves quality; the kiln saves rare cores; the lens reveals legendary pairings before you commit; the ledger attracts wealthier customers.</div>
      </div>
      <div>
        <div class="j-section-title">Bench Status</div>
        <div class="stat-list">
          <div class="big-stat"><b>${state.upgrades.bench}/3</b><span>Bench quality</span></div>
          <div class="big-stat"><b>${state.upgrades.lens ? 'Yes' : 'No'}</b><span>Resonance lens</span></div>
          <div class="big-stat"><b>${Math.round(state.upgrades.kiln * 18)}%</b><span>Core preservation</span></div>
          <div class="big-stat"><b>+${state.upgrades.ledger * 10}%</b><span>Customer offers</span></div>
        </div>
        <div class="prof-note" style="line-height:1.6">A master wandmaker’s shop is not built from gold. It is built from the willingness to buy one more piece of equipment instead of a new hat.<br><br>You have ${state.player.gold} galleons.</div>
      </div>
    </div>`
  }

  bindShopPanel() {
    const p = this.el.panel
    p.querySelectorAll('[data-shop-tab]').forEach(b => b.addEventListener('click', () => {
      this.panelTab = b.dataset.shopTab
      this.hooks.onSfx?.('select')
      this.rerender()
    }))
    p.querySelectorAll('[data-sell-btn]').forEach(btn => btn.addEventListener('click', () => {
      const card = btn.closest('[data-customer-card]')
      const sel = card?.querySelector('.cust-wand')
      if (!sel || !sel.value) { this.toast('Choose a wand first', 'The customer is tapping their foot.', 'bad', '!'); return }
      this.panelAction('sell', { wand: sel.value, customer: btn.dataset.sellBtn })
    }))
  }

  /* ------------------------------------------------------ MAP PANEL */
  mapPanel() {
    const current = this.hooks.getZone?.()
    const zoneRows = ZONES.map(z => {
      const locked = state.player.rep < z.reqRep
      return `<button class="zone-item ${locked ? 'locked' : ''} ${current?.id === z.id ? 'current' : ''}" data-paction="travel" data-id="${z.id}" ${locked ? 'disabled' : ''}>
        <span class="zone-dot" style="background:${z.color};color:${z.color}"></span>
        <span class="zone-info"><span class="zone-name-z">${esc(z.name)}${current?.id === z.id ? ' · here' : ''}</span><span class="zone-req">${locked ? `Requires ${z.reqRep} reputation` : esc(z.desc.slice(0, 64)) + '…'}</span></span>
        <span class="zone-go">${locked ? '🔒' : 'TRAVEL'}</span>
      </button>`
    }).join('')
    return `${this.panelHead('The Wizarding World', 'Map of the Hollow', 'Fast travel is a privilege of reputation. Walking is free.', '⌖')}
      <div class="panel-body">
        <div class="map-layout">
          <div>
            <div class="map-canvas-wrap"><canvas id="world-map" width="900" height="562"></canvas><div class="map-legend">✦ you · ◉ settlement · ✧ rare ground</div></div>
            <div class="map-note">Reputation ${state.player.rep} · ${rankTitle()}. New locations unlock as your legend grows. All ingredients and secrets can also be reached on foot.</div>
          </div>
          <div>
            <div class="j-section-title">Locations</div>
            <div class="zone-list">${zoneRows}</div>
            <div class="j-section-title" style="margin-top:16px">Current Pursuits</div>
            ${activeQuests().map(q => `<div style="font-size:12px;color:#b9adc7;line-height:1.5;margin-bottom:5px">❧ ${esc(q.title)} — <span style="color:var(--gold)">${questProgress(q)}/${q.target}</span></div>`).join('') || '<div class="prof-note">All pursuits complete.</div>'}
          </div>
        </div>
      </div>`
  }

  bindMapPanel() {
    // static canvas drawn after render
  }

  drawWorldMap() {
    const canvas = document.getElementById('world-map')
    if (!canvas) return
    const c = canvas.getContext('2d'), W = canvas.width, H = canvas.height
    const pad = 44
    const toMap = (x, z) => [W / 2 + x * ((Math.min(W, H) / 2 - pad) / 100), H / 2 + z * ((Math.min(W, H) / 2 - pad) / 100)]
    const bg = c.createLinearGradient(0, 0, 0, H)
    bg.addColorStop(0, '#0d0a18'); bg.addColorStop(1, '#07050d')
    c.fillStyle = bg; c.fillRect(0, 0, W, H)
    // sea texture
    c.strokeStyle = 'rgba(120,150,200,.05)'; c.lineWidth = 1
    for (let r = 1; r < 8; r++) {
      c.beginPath(); c.arc(W / 2, H / 2, 45 + r * 42, 0, Math.PI * 2); c.stroke()
    }
    // island
    c.save()
    c.beginPath()
    const pts = 90
    for (let i = 0; i <= pts; i++) {
      const a = (i / pts) * Math.PI * 2
      const r = 95 + Math.sin(a * 3.1) * 5 + Math.cos(a * 5.7) * 3
      const [x, y] = toMap(Math.cos(a) * r, Math.sin(a) * r)
      i ? c.lineTo(x, y) : c.moveTo(x, y)
    }
    c.closePath()
    const land = c.createRadialGradient(W / 2, H / 2, 20, W / 2, H / 2, 330)
    land.addColorStop(0, '#2d3d34'); land.addColorStop(0.6, '#26332d'); land.addColorStop(1, '#1b2530')
    c.fillStyle = land; c.fill()
    c.strokeStyle = 'rgba(217,185,120,.3)'; c.lineWidth = 1.5; c.stroke()
    c.clip()
    // zone washes
    for (const z of ZONES) {
      const [zx, zy] = toMap(z.pos[0], z.pos[1])
      const rad = z.radius * ((Math.min(W, H) / 2 - pad) / 100)
      const grd = c.createRadialGradient(zx, zy, 2, zx, zy, rad)
      grd.addColorStop(0, z.color + '38'); grd.addColorStop(1, z.color + '00')
      c.fillStyle = grd; c.beginPath(); c.arc(zx, zy, rad, 0, Math.PI * 2); c.fill()
    }
    // paths
    c.strokeStyle = 'rgba(217,185,120,.28)'; c.lineWidth = 1.4
    const paths = this.hooks.getPathPoints?.() || []
    if (paths.length) {
      c.beginPath()
      paths.forEach((p, i) => { const [x, y] = toMap(p.x, p.z); i ? c.lineTo(x, y) : c.moveTo(x, y) })
      c.stroke()
    }
    // trees stipple
    for (let i = 0; i < 260; i++) {
      const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * 92
      const [x, y] = toMap(Math.cos(a) * r, Math.sin(a) * r)
      c.fillStyle = 'rgba(80,120,90,.18)'; c.fillRect(x, y, 1.4, 1.4)
    }
    // rare nodes
    for (const n of NODES) {
      if (n.type !== 'wood' && n.type !== 'core') continue
      const m = matById[n.mat]
      if (!m || !['rare', 'legendary', 'mythic'].includes(m.rarity)) continue
      const [x, y] = toMap(n.pos[0], n.pos[1])
      c.beginPath(); c.arc(x, y, 2.2, 0, Math.PI * 2); c.fillStyle = RARITIES[m.rarity].color + 'bb'; c.fill()
    }
    // zones
    for (const z of ZONES) {
      const [x, y] = toMap(z.pos[0], z.pos[1])
      const rad = z.radius * ((Math.min(W, H) / 2 - pad) / 100)
      c.beginPath(); c.arc(x, y, rad, 0, Math.PI * 2)
      c.strokeStyle = z.color + '66'; c.lineWidth = 1; c.stroke()
      c.beginPath(); c.arc(x, y, 4, 0, Math.PI * 2); c.fillStyle = z.color; c.fill()
    }
    // arena
    const [ax, ay] = toMap(24, -4)
    c.beginPath(); c.arc(ax, ay, 11, 0, Math.PI * 2); c.strokeStyle = 'rgba(224,103,122,.7)'; c.lineWidth = 1.5; c.stroke()
    c.font = '600 12px Cinzel, Georgia, serif'; c.fillStyle = '#e8a2ac'; c.fillText('ARENA', ax, ay + 26)
    // player
    const pos = this.hooks.getPlayerPos?.() || { x: 0, z: 0 }
    const [px, py] = toMap(pos.x, pos.z)
    c.beginPath(); c.arc(px, py, 9, 0, Math.PI * 2); c.fillStyle = 'rgba(245,223,166,.11)'; c.fill()
    c.beginPath(); c.arc(px, py, 3.4, 0, Math.PI * 2); c.fillStyle = '#f5dfa6'; c.fill()
    c.font = '600 14px Cinzel, Georgia, serif'; c.fillStyle = '#f5dfa6'; c.fillText('You', px, py - 13)
    c.restore()
    // zone labels sit above the island clip so names are never cut off
    for (const z of ZONES) {
      const [x, y] = toMap(z.pos[0], z.pos[1])
      const rad = z.radius * ((Math.min(W, H) / 2 - pad) / 100)
      c.font = '600 17px Cinzel, Georgia, serif'
      c.textAlign = 'center'
      c.fillStyle = '#f0e2c4'
      c.shadowColor = '#000'; c.shadowBlur = 8
      let lx = x, ly = y - rad - 8
      if (z.id === 'spire') { lx = x + 112; ly = y + 5 }
      if (z.id === 'ruins') { lx = x - 20; ly = y - rad - 8 }
      c.fillText(z.name, lx, ly)
      c.shadowBlur = 0
      if (state.player.rep < z.reqRep) {
        c.font = '13px Cinzel, Georgia, serif'; c.fillStyle = '#e8a2ac'
        c.fillText('✦ ' + z.reqRep + ' rep', lx, ly + 18)
      }
    }
    // compass
    c.save(); c.translate(W - 62, 62)
    c.strokeStyle = 'rgba(217,185,120,.3)'; c.lineWidth = 1
    c.beginPath(); c.arc(0, 0, 24, 0, Math.PI * 2); c.stroke()
    c.beginPath(); c.moveTo(0, -30); c.lineTo(5, 0); c.lineTo(0, 30); c.lineTo(-5, 0); c.closePath(); c.fillStyle = 'rgba(217,185,120,.5)'; c.fill()
    c.font = '600 11px Cinzel, Georgia, serif'; c.fillStyle = '#d9b978'; c.textAlign = 'center'; c.fillText('N', 0, -38)
    c.restore()
    // border
    c.strokeStyle = 'rgba(217,185,120,.25)'; c.lineWidth = 2; c.strokeRect(12, 12, W - 24, H - 24)
    c.font = '11px Cinzel, Georgia, serif'; c.fillStyle = 'rgba(217,185,120,.4)'; c.textAlign = 'center'
    c.fillText('THE HOLLOW · CHARTED BY THE WANDMAKERS’ GUILD', W / 2, H - 22)
  }

  /* ------------------------------------------------------ JOURNAL PANEL */
  journalPanel() {
    const quests = QUESTS.map(q => {
      const done = state.quests[q.id]?.complete
      const prog = questProgress(q)
      return `<div class="quest-card ${done ? 'done' : ''}">
        <div class="q-mark">${done ? '✓' : '❧'}</div>
        <div class="q-body">
          <div class="q-title">${esc(q.title)}</div>
          <div class="q-desc">${esc(q.desc)}</div>
          <div class="q-reward">◉ ${q.gold} · ✦ ${q.rep} rep · ✶ ${q.xp} xp</div>
          <div class="q-progress-line"><div class="quest-bar"><div style="width:${(prog / q.target) * 100}%"></div></div><span style="font-family:Cinzel,serif;font-size:9px;color:var(--muted)">${prog}/${q.target}</span></div>
        </div>
      </div>`
    }).join('')
    const rankRows = RANKS.map(r => `<div class="rank-step ${r.title === rankTitle() ? 'active' : ''}"><span>${esc(r.title)}</span><span>${r.rep} rep</span></div>`).join('')
    const discovered = state.discovered.map(key => {
      const [w, c] = key.split(':')
      const combo = COMBOS[key]
      const wood = woodById[w], core = coreById[c]
      return `<div class="combo-row"><span class="cn">${combo ? '✦ ' + esc(combo.name) : esc((wood?.name || w) + ' & ' + (core?.name || c))}</span><span class="cw">${combo ? esc(wood?.name + ' + ' + core?.name) : 'charted'}</span></div>`
    }).join('')
    const unknownCombos = Object.keys(COMBOS).filter(k => !state.discovered.includes(k))
    const comboHints = state.upgrades.lens > 0
      ? unknownCombos.map(key => {
        const [w, c] = key.split(':')
        return `<div class="combo-row unknown"><span class="cn">◈ ${esc(COMBOS[key].name)}</span><span class="cw">${esc(woodById[w]?.name + ' + ' + coreById[c]?.name)}</span></div>`
      }).join('')
      : `<div class="combo-row unknown"><span class="cn">${unknownCombos.length} legendary pairs remain undiscovered</span><span class="cw">Resonance Lens reveals hints</span></div>`
    const lore = state.lore.map(l => `<div class="lore-row"><b>${esc(l.title)}</b>${esc(l.text)}</div>`).join('')
    const creatures = state.creatures.length
      ? state.creatures.map(c => `<div class="lore-row"><b>${esc(c.name)}</b>Seen in ${esc(c.where)}</div>`).join('')
      : '<div style="font-size:11.5px;color:var(--muted);font-style:italic">No magical creatures catalogued yet. Explore the wilds.</div>'
    const stats = state.metrics
    return `${this.panelHead('Journal of a Wandmaker', 'Legacy & Pursuits', 'Every wand, every duel, every choice — recorded.', '❧')}
    <div class="panel-body">
      <div class="journal-grid">
        <div>
          <div class="j-section-title">Pursuits</div>
          ${quests}
        </div>
        <div>
          <div class="j-section-title">Your Legend</div>
          <div class="stat-list">
            <div class="big-stat"><b>Lv ${state.player.level}</b><span>Wizard level</span></div>
            <div class="big-stat"><b>${state.player.rep}</b><span>Reputation</span></div>
            <div class="big-stat"><b>${stats.wandsCrafted}</b><span>Wands crafted</span></div>
            <div class="big-stat"><b>${stats.duelsWon}</b><span>Duels won</span></div>
            <div class="big-stat"><b>${stats.wandsSold}</b><span>Wands sold</span></div>
            <div class="big-stat"><b>${gold(stats.goldEarned)}</b><span>Gold earned</span></div>
          </div>
          <div class="j-section-title">Rank</div>
          <div class="rank-ladder">${rankRows}</div>
          <div class="j-section-title" style="margin-top:18px">Discovered Resonance <span style="font-family:Cormorant Garamond,serif;font-size:11px;color:var(--muted);text-transform:none;letter-spacing:0">${state.discovered.length} charted</span></div>
          <div class="combo-list">${discovered}${comboHints}</div>
          <div class="j-section-title" style="margin-top:18px">Lore</div>
          <div class="lore-list">${lore || '<div style="font-size:11.5px;color:var(--muted);font-style:italic">The pages are blank. Go and fill them.</div>'}</div>
          <div class="j-section-title" style="margin-top:18px">Creature Codex</div>
          <div class="lore-list">${creatures}</div>
          <div class="danger-zone">
            <div class="j-section-title" style="margin:0 0 6px">A New Beginning</div>
            <p>Erase this save and begin again with Firstlight, your oak-and-unicorn wand. This cannot be undone.</p>
            <button class="btn small danger" data-paction="reset">${this.resetArmed ? 'Confirm erase' : 'Erase legacy'}</button>
          </div>
        </div>
      </div>
    </div>`
  }

  bindJournalPanel() {}

  /* ------------------------------------------------------ TOURNAMENT */
  tournamentPanel() {
    const round = state.tournament.round || 0
    const complete = state.tournament.complete
    const rounds = TOURNAMENT.map((r, i) => {
      const done = i < round || complete
      const current = i === round && !complete
      return `<div class="quest-card ${done ? 'done' : ''}">
        <div class="q-mark">${done ? '✓' : (current ? '⚔' : '·')}</div>
        <div class="q-body">
          <div class="q-title">${r.name} — ${esc(DUELISTS[r.opponent].name)}</div>
          <div class="q-desc">${esc(r.desc)}</div>
          <div class="q-reward">◉ ${r.rewardGold} · ✦ ${r.rewardRep} rep · ✶ ${r.xp} xp</div>
        </div>
        ${current ? `<button class="btn small" data-paction="tournament-enter" data-round="${i}">Enter</button>` : done ? '<span style="font-family:Cinzel,serif;font-size:8.5px;color:var(--teal);align-self:center">WON</span>' : ''}
      </div>`
    }).join('')
    const ranks = tournamentRanks().map((r, i) => `<div class="rank-step ${r.you ? 'active' : ''}"><span>${i + 1}. ${esc(r.name)}${r.you ? ' (you)' : ''}</span><span>${r.score} pts</span></div>`).join('')
    return `${this.panelHead('Hollowmere Dueling Arena', 'The Tournament', 'Three bouts. One reputation. No second chances inside the ring.', '⚔')}
      <div class="panel-body">
        <div class="journal-grid">
          <div>
            <div class="j-section-title">Bracket ${complete ? '· Champion' : `· Round ${Math.min(round + 1, 3)} of 3`}</div>
            ${rounds}
            ${complete ? `<div class="ability-box" style="margin-top:12px"><div class="ability-kicker">Champion of Hollowmere</div><div class="ability-name">✦ The arena remembers you</div><div class="ability-desc">You have won the tournament. Sergeant Rook has stopped pretending not to be impressed. The ranking board lists you among legends.</div></div>` : ''}
            <div class="prof-note" style="margin-top:12px">Sergeant Rook’s rules: spells only, no killing blows, and no complaining about the weather. Duels take place in the arena; your current position will be restored after victory.</div>
          </div>
          <div>
            <div class="j-section-title">Arena Rankings</div>
            <div class="rank-ladder">${ranks}</div>
            <div class="j-section-title" style="margin-top:18px">Your Score</div>
            <div class="big-stat"><b>${state.tournament.score || 0} pts</b><span>${state.metrics.duelsWon} career victories</span></div>
            <div class="j-section-title" style="margin-top:18px">Advice</div>
            <div class="prof-note" style="line-height:1.6">Every opponent casts in patterns. Watch the glow, hold your shield, dodge through the bolt. A wand with strong affinity for your favourite school will end fights faster than raw courage.</div>
          </div>
        </div>
      </div>`
  }

  bindTournamentPanel() {}

  duelPickPanel() {
    const ids = ['elara', 'garrick', 'gloomfang', 'warden']
    const cards = ids.map(id => {
      const d = DUELISTS[id]
      return `<div class="customer-card">
        <div class="cust-head"><div><div class="cust-name">${esc(d.name)}</div><div class="cust-persona">${esc(d.title)}</div></div><div class="cust-budget">◉ ${d.gold[0]}–${d.gold[1]}</div></div>
        <div class="cust-pref"><span class="pref-chip">${d.hp} vitality</span><span class="pref-chip">${d.damage} power</span><span class="pref-chip">✦ ${d.rep} rep</span></div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:11.5px;color:var(--muted);font-style:italic">${id === 'gloomfang' ? 'Whispering Wood' : id === 'warden' ? 'Glimmer Cavern' : 'Arcanum Academy'}</span>
          <button class="btn small" data-paction="duel" data-enemy="${id}">Challenge</button>
        </div>
      </div>`
    }).join('')
    return `${this.panelHead('Sergeant Rook’s Register', 'Challenges', 'Pick a fight worth remembering. All bouts are held at the arena.', '⚔')}
      <div class="panel-body">
        <div class="shop-layout">
          <div><div class="j-section-title">Available Duels</div>${cards}</div>
          <div>
            <div class="j-section-title">Combat Primer</div>
            <div class="prof-note" style="line-height:1.7">
              <b style="color:#e6d6b8">Move</b> with W A S D. <b style="color:#e6d6b8">Cast</b> with 1–4.<br>
              <b style="color:#e6d6b8">Shield</b> with Q — it drains mana but blunts most damage.<br>
              <b style="color:#e6d6b8">Dodge</b> with Shift — brief invulnerability and a burst of speed.<br><br>
              Your foe telegraphs every spell with a growing glow. A shield held too early will empty your mana. A dodge held too late will empty your dignity.
            </div>
            <div class="j-section-title" style="margin-top:16px">Your Loadout</div>
            ${[0, 1, 2, 3].map(i => {
              const s = state.loadout[i] ? SPELL_BY_ID[state.loadout[i]] : null
              return `<div class="lo-slot ${s ? 'filled' : ''}" style="margin-bottom:4px"><span class="lo-num">${i + 1}</span><span class="lo-icon" style="color:${s ? CATEGORIES[s.cat].color : ''}">${s ? s.icon : '·'}</span><span class="lo-name">${s ? esc(s.name) : 'Empty'}</span></div>`
            }).join('')}
          </div>
        </div>
      </div>`
  }

  bindDuelPickPanel() {}

  /* ------------------------------------------------------ LESSON */
  openLesson(cat) {
    if (!categoryUnlocked(cat)) { this.toast('Lesson sealed', `Requires ${CATEGORIES[cat].reqRep} reputation.`, 'bad', '🔒'); return }
    const target = nextLessonSpell(cat)
    if (!target) { this.toast('School mastered', 'There is nothing left to teach you here.', 'magic', '✦'); return }
    this.lesson = {
      cat, target, round: 0, totalRounds: 3, mistakes: 0,
      sequence: [], pos: 0, phase: 'show', attempts: 0,
    }
    this.el.lessonRoot.classList.remove('hidden')
    this.el.lessonKicker.textContent = `${CATEGORIES[cat].teacher} · ${CATEGORIES[cat].label}`
    this.el.lessonTitle.textContent = target.isNew ? `Binding: ${target.spell.name}` : `Practice: ${target.spell.name}`
    this.el.lessonDesc.textContent = target.isNew
      ? 'Watch the sigil sequence, then repeat it exactly. A steady mind binds the spell; a hasty one merely makes smoke.'
      : 'The spell is yours already. Repeat the sequence to deepen mastery. Three clean rounds will sharpen it considerably.'
    this.startLessonRound()
  }

  startLessonRound() {
    const L = this.lesson
    if (!L) return
    this.clearLessonTimers()
    const runeSet = ['✦', '☾', '✧', '❈', '⟡', '✶', '⌁', '☉', '⚚', '⋔']
    const len = 3 + L.round
    const seq = []
    for (let i = 0; i < len; i++) seq.push(runeSet[Math.floor(Math.random() * runeSet.length)])
    // pool of 6 with all sequence runes present
    const pool = [...new Set(seq)]
    while (pool.length < 6) {
      const r = runeSet[Math.floor(Math.random() * runeSet.length)]
      if (!pool.includes(r)) pool.push(r)
    }
    pool.sort(() => Math.random() - 0.5)
    L.sequence = seq; L.pool = pool; L.pos = 0; L.phase = 'show'; L.locked = true
    this.el.lessonStatus.textContent = `Watch closely — ${len} sigils…`
    this.el.lessonFoot.textContent = `Round ${L.round + 1} of ${L.totalRounds} · Mistakes ${L.mistakes}/3`
    this.el.lessonTimer.style.width = '100%'
    this.el.lessonDisplay.innerHTML = seq.map((r, i) => `<span class="rune-show" style="animation-delay:${i * 0.1}s">${r}</span>`).join('')
    this.el.lessonPool.innerHTML = ''
    const showMs = 1150 + len * 200
    this.lessonTimers.push(setTimeout(() => {
      if (!this.lesson) return
      this.el.lessonDisplay.innerHTML = '<span class="rune-placeholder">Now repeat the sequence.</span>'
      this.el.lessonStatus.textContent = 'Repeat the sigil sequence.'
      L.phase = 'input'; L.locked = false
      this.renderRunePool()
      this.startLessonTimer(18)
    }, showMs))
  }

  renderRunePool() {
    const L = this.lesson
    if (!L) return
    this.el.lessonPool.innerHTML = ''
    L.pool.forEach(rune => {
      const b = document.createElement('button')
      b.className = 'rune-btn'
      b.textContent = rune
      b.addEventListener('click', () => this.lessonRune(rune, b))
      this.el.lessonPool.appendChild(b)
    })
  }

  startLessonTimer(seconds) {
    const L = this.lesson
    if (!L) return
    let remaining = seconds
    const start = Date.now()
    this.lessonTimers.push(setInterval(() => {
      if (!this.lesson || this.lesson.phase !== 'input') return
      remaining = seconds - (Date.now() - start) / 1000
      this.el.lessonTimer.style.width = Math.max(0, (remaining / seconds) * 100) + '%'
      if (remaining <= 0) {
        this.lessonFail('The sigils fade', 'The incantation slipped away before you could bind it. Breathe, and try again.')
      }
    }, 80))
  }

  lessonRune(rune, btn) {
    const L = this.lesson
    if (!L || L.phase !== 'input' || L.locked) return
    if (rune === L.sequence[L.pos]) {
      L.pos++
      btn.classList.add('correct')
      this.hooks.onSfx?.('rune')
      setTimeout(() => btn.classList.remove('correct'), 180)
      if (L.pos >= L.sequence.length) {
        this.clearLessonTimers()
        L.locked = true
        L.phase = 'transition'
        this.el.lessonStatus.textContent = 'The sigil holds. Well done.'
        this.el.lessonDisplay.innerHTML = '<span class="rune-show" style="color:#9be8d8;border-color:#6fd8c4">✓</span>'
        this.lessonTimers.push(setTimeout(() => {
          if (!this.lesson) return
          this.lesson.round++
          if (this.lesson.round >= this.lesson.totalRounds) this.lessonSuccess()
          else this.startLessonRound()
        }, 850))
      } else {
        this.el.lessonStatus.textContent = `Good — ${L.sequence.length - L.pos} sigil${L.sequence.length - L.pos === 1 ? '' : 's'} remaining.`
      }
    } else {
      L.mistakes++
      btn.classList.add('wrong')
      this.hooks.onSfx?.('wrong')
      setTimeout(() => btn.classList.remove('wrong'), 350)
      if (L.mistakes >= 3) {
        this.lessonFail('The binding breaks', 'Three slips of the mind. The spell retreats, but it will return when you are steadier.')
        return
      }
      L.pos = 0
      this.el.lessonStatus.textContent = `Wrong sigil — the sequence resets. Mistakes ${L.mistakes}/3.`
      this.el.lessonFoot.textContent = `Round ${L.round + 1} of ${L.totalRounds} · Mistakes ${L.mistakes}/3`
      this.el.lessonTimer.style.width = '100%'
      this.el.lessonDisplay.innerHTML = '<span class="rune-placeholder">Start the sequence again.</span>'
      L.phase = 'show'; L.locked = true
      this.el.lessonPool.innerHTML = ''
      this.lessonTimers.push(setTimeout(() => {
        if (!this.lesson) return
        this.el.lessonDisplay.innerHTML = '<span class="rune-placeholder">Now repeat the sequence.</span>'
        L.phase = 'input'; L.locked = false
        this.renderRunePool()
        this.startLessonTimer(18)
      }, 900))
    }
  }

  lessonSuccess() {
    const L = this.lesson
    if (!L) return
    this.clearLessonTimers()
    L.phase = 'done'
    L.locked = true
    const res = completeLesson(L.cat, L.mistakes === 0)
    this.hooks.onSfx?.('lessonWin')
    if (res) {
      this.el.lessonDisplay.innerHTML = ''
      this.el.lessonPool.innerHTML = `<div class="lesson-success">
        <div class="glyph">${res.spell.icon}</div>
        <h3>${res.isNew ? res.spell.name + ' bound' : 'Mastery deepened'}</h3>
        <p>${res.isNew ? `“${res.spell.incant}” is yours now. ${res.spell.desc}` : `${res.spell.name} is now ${['', 'Novice', 'Adept', 'Master'][res.rank]} — ${res.mastery} practices recorded.`}${L.mistakes === 0 ? '<br><span style="color:#f0d79a">Perfect binding: extra mastery.</span>' : ''}</p>
        <div style="display:flex;gap:8px;justify-content:center">
          <button class="btn small violet" data-lesson-action="again">Continue Studies</button>
          <button class="btn small" data-lesson-action="close">Return to Grimoire</button>
        </div>
      </div>`
      this.el.lessonStatus.textContent = ''
      this.el.lessonFoot.textContent = 'The incantation settles into your memory.'
      this.el.lessonTimer.style.width = '100%'
      this.el.lessonPool.querySelector('[data-lesson-action="again"]')?.addEventListener('click', () => {
        this.hooks.onSfx?.('click')
        this.closeLesson()
        this.openPanel('spells', L.cat)
        this.openLesson(L.cat)
      })
      this.el.lessonPool.querySelector('[data-lesson-action="close"]')?.addEventListener('click', () => {
        this.hooks.onSfx?.('click')
        this.closeLesson()
        if (this.panelName === 'spells') { this.panelTab = L.cat; this.rerender() }
      })
      this.updateHUD()
      this.hooks.onLessonComplete?.(res, L.cat)
    }
  }

  lessonFail(title, text) {
    const L = this.lesson
    if (!L) return
    this.clearLessonTimers()
    L.phase = 'failed'
    this.el.lessonStatus.textContent = ''
    this.el.lessonDisplay.innerHTML = ''
    this.el.lessonPool.innerHTML = `<div class="lesson-fail">
      <h3>${esc(title)}</h3>
      <p>${esc(text)}</p>
      <div style="display:flex;gap:8px;justify-content:center">
        <button class="btn small violet" data-lesson-action="retry">Try Again</button>
        <button class="btn small" data-lesson-action="close">Leave Lesson</button>
      </div>
    </div>`
    this.el.lessonFoot.textContent = 'Failure is only data wearing a dramatic cloak.'
    this.hooks.onSfx?.('lessonFail')
    this.el.lessonPool.querySelector('[data-lesson-action="retry"]')?.addEventListener('click', () => {
      if (!this.lesson) return
      this.lesson.round = 0
      this.lesson.mistakes = 0
      this.lesson.pos = 0
      this.el.lessonPool.innerHTML = ''
      this.startLessonRound()
    })
    this.el.lessonPool.querySelector('[data-lesson-action="close"]')?.addEventListener('click', () => this.closeLesson())
  }

  clearLessonTimers() {
    for (const t of this.lessonTimers) { clearTimeout(t); clearInterval(t) }
    this.lessonTimers = []
  }

  closeLesson() {
    this.clearLessonTimers()
    this.lesson = null
    this.el.lessonRoot.classList.add('hidden')
    this.hooks.onLessonClose?.()
  }

  /* ------------------------------------------------------ RESULT */
  showResult(result) {
    this.pendingResult = result
    const title = result.victory ? 'VICTORY' : 'DEFEAT'
    const sub = result.victory
      ? (result.boss ? 'The Hollow Spire falls silent.' : 'The arena roars your name.')
      : 'You wake on the arena stones, pride bruised but magic intact.'
    const lootText = result.loot?.length
      ? result.loot.map(id => `<b>${esc(matById[id]?.name || id)}</b>`).join(', ')
      : ''
    const tourney = result.tournamentBonus
      ? `<div class="result-loot">Tournament bonus: <b>+${result.tournamentBonus.gold}g</b> · <b>+${result.tournamentBonus.rep} rep</b> · <b>+${result.tournamentBonus.xp} xp</b></div>`
      : ''
    const boss = result.bossReward
      ? `<div class="ability-box" style="text-align:left;margin:0 0 14px"><div class="ability-kicker">Legendary Reward</div><div class="ability-name">☾ Voidheart core</div><div class="ability-desc">A core of absolute quiet, taken from Morvane’s sleeve. Title earned: <b>${esc(result.bossReward.title)}</b>. Craft with it if you dare.</div></div>`
      : ''
    const nextRound = result.victory && result.tournamentBonus && state.tournament.round < TOURNAMENT.length
    this.el.resultCard.innerHTML = `
      <div class="result-kicker">${result.boss ? 'The Hollow Spire' : result.tournamentBonus ? 'Hollowmere Tournament' : 'Duel at the Arena'}</div>
      <div class="result-title ${result.victory ? '' : 'lost'}">${title}</div>
      <div class="result-sub">${esc(sub)}</div>
      <div class="result-rewards">
        <div class="reward-box"><b>+${result.rewards.gold}</b><span>Galleons</span></div>
        <div class="reward-box"><b>+${result.rewards.rep}</b><span>Reputation</span></div>
        <div class="reward-box"><b>+${result.rewards.xp}</b><span>Experience</span></div>
      </div>
      ${boss}
      ${tourney}
      ${lootText ? `<div class="result-loot">Materials recovered: ${lootText}</div>` : ''}
      <div class="result-actions">
        ${nextRound ? `<button class="btn violet" data-result="next">Next Round</button>` : ''}
        <button class="btn" data-result="close">Continue</button>
      </div>`
    this.el.resultRoot.classList.remove('hidden')
    this.el.resultCard.querySelector('[data-result="close"]').addEventListener('click', () => {
      this.hooks.onSfx?.('click')
      this.hideResult()
    })
    this.el.resultCard.querySelector('[data-result="next"]')?.addEventListener('click', () => {
      this.hooks.onSfx?.('click')
      this.hideResult(true)
    })
    this.hooks.onSfx?.(result.victory ? 'victorySting' : 'defeatSting')
  }

  hideResult(next = false) {
    this.el.resultRoot.classList.add('hidden')
    const result = this.pendingResult
    this.pendingResult = null
    this.hooks.onResultClosed?.(result, next)
  }
}

