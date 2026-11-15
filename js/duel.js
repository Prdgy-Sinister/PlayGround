/* ============================================================
   WANDLORE — duel.js
   Real-time spell dueling: projectiles, shields, dodges,
   enemy spell patterns, boss phases, tournaments and rewards.
   ============================================================ */
import * as THREE from 'three'
import { DUELISTS, SPELL_BY_ID, TOURNAMENT } from './data.js'
import {
  state, maxHealth, maxMana, getEquippedWand, spellPower, spellMana, spellCooldown,
  grantDuelRewards, addLore, addMat, addRep, addXp, checkQuests, save, wandAffinities,
} from './state.js'
import { makeDuelEnemy } from './wilds.js'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const rand = (a, b) => a + Math.random() * (b - a)

export class Duel {
  constructor(world, fx, callbacks = {}) {
    this.world = world
    this.fx = fx
    this.cb = callbacks
    this.active = false
    this.over = false
    this.enemy = null
    this.activeProjectiles = []
    this.pendingCasts = []
    this.aoes = []
    this.cooldowns = {}
    this.loadout = []
    this.shieldActive = false
    this.time = 0
    this._trailTimer = 0
    this._hudAcc = 0
    this.shieldMesh = this.makeShieldMesh()
  }

  makeShieldMesh() {
    const mat = new THREE.MeshBasicMaterial({ color: '#9fd0ff', transparent: true, opacity: 0.16, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1.08, 20, 14), mat)
    mesh.visible = false
    this.world.scene.add(mesh)
    return mesh
  }

  start(enemyId, opts = {}) {
    if (this.active) return false
    const def = DUELISTS[enemyId]
    if (!def) return false
    this.cleanup()
    this.active = true
    this.over = false
    this.enemyId = enemyId
    this.def = def
    this.opts = opts
    this.time = 0
    this.countdown = 1.6
    this.maxHp = maxHealth()
    this.hp = this.maxHp
    this.maxMana = maxMana()
    this.mana = this.maxMana
    this.shieldHp = 0
    this.wardT = 0
    this.regenT = 0
    this.regenRate = 0
    this.invuln = 0
    this.dodgeCd = 0
    this.revived = false
    this.weakenedT = 0
    this.hitFlashT = 0
    this.castTimer = 1.3
    this.telegraph = null
    this.enemyStatus = { stun: 0, slow: 0, burn: 0, poison: 0, bleed: 0, weaken: 0 }
    this._dotAcc = 0
    this.endTimer = 0
    this.cooldowns = {}
    this.loadout = (state.loadout || []).filter(id => state.learned[id]).slice(0, 4)
    if (!this.loadout.length) this.loadout = ['stupefy']

    const center = this.world.arenaCenter ? this.world.arenaCenter.clone() : new THREE.Vector3(24, 0, -4)
    this.arenaCenter = center
    this.world.setPlayer(center.x, center.z + 4.8, Math.PI)
    this.world.cameraYaw = 0
    this.world.cameraPitch = 0.42
    this.world.cameraDist = 11.2
    this.world.setDuelArena(true, center)

    const group = makeDuelEnemy(this.world, def)
    const ey = this.world.heightAt(center.x, center.z - 4.8)
    group.position.set(center.x, ey, center.z - 4.8)
    group.rotation.y = 0
    this.world.scene.add(group)
    this.enemy = {
      group, position: group.position,
      hp: def.hp * (opts.hpMult || 1), maxHp: def.hp * (opts.hpMult || 1),
      phase: 1, strafe: Math.random() < 0.5 ? 1 : -1, strafeTimer: 3,
      baseY: ey, dead: false,
    }
    this.shieldMesh.visible = false
    this.shieldMesh.position.set(center.x, ey + 1.05, center.z + 4.8)
    this.cb.onStart?.(def, this)
    this.cb.onMessage?.('DUEL', 1.6)
    this.cb.onSfx?.('duelStart')
    this.cb.onHud?.(this.getHud())
    return true
  }

  cleanup() {
    if (this.enemy?.group) {
      this.world.scene.remove(this.enemy.group)
      this.enemy.group.traverse(o => { if (o.material) { if (Array.isArray(o.material)) o.material.forEach(m => m.dispose()); else o.material.dispose() } })
    }
    this.enemy = null
    for (const p of this.activeProjectiles) this.fx.removeOrb(p.mesh)
    this.activeProjectiles = []
    for (const a of this.aoes) { this.world.scene.remove(a.mesh); if (a.mesh.geometry) a.mesh.geometry.dispose(); if (a.mesh.material) a.mesh.material.dispose() }
    this.aoes = []
    this.pendingCasts = []
    this.shieldMesh.visible = false
    if (this.telegraph) { this.world.scene.remove(this.telegraph.sprite); this.telegraph = null }
    this.world.setDuelArena(false)
  }

  finish(victory) {
    if (this.over) return
    this.over = true
    this.won = victory
    this.endTimer = 2.2
    this.cb.onMessage?.(victory ? 'VICTORY' : 'DEFEATED', 2.2)
    this.cb.onSfx?.(victory ? 'victory' : 'defeat')
    if (this.enemy) this.enemy.group.rotation.z = victory ? (Math.random() < .5 ? 1 : -1) * 1.2 : 0
    if (this.telegraph) { this.world.scene.remove(this.telegraph.sprite); this.telegraph = null }

    const def = this.def
    const rewards = grantDuelRewards(this.enemyId, victory, { tournament: !!this.opts.tournament })
    const loot = []
    let tournamentBonus = null
    let bossReward = null

    if (victory) {
      const dropTable = {
        elara: ['unicorn'], garrick: ['veela'], tobias: ['troll'], marrow: ['phoenix'],
        gloomfang: ['manticore'], warden: ['starglass'], morvane: ['voidheart'],
      }
      const drops = dropTable[this.enemyId] || []
      for (const id of drops) {
        addMat(id, 1)
        loot.push(id)
      }
      if (def.boss && !state.flags.bossDefeated) {
        state.flags.bossDefeated = true
        state.metrics.bossDefeated = 1
        state.flags.bossLootGiven = true
        addRep(10)
        addXp(160)
        addLore('The Hollow Crown', 'Morvane fell, and the Voidheart rolled free of his sleeve — a core of absolute quiet. It is yours now. The wood will remember what you did here.')
        bossReward = { title: 'Morvane’s Bane', voidheart: true }
      }
      if (this.opts.tournament) {
        const round = TOURNAMENT[this.opts.roundIndex || 0]
        if (round) {
          state.player.gold += round.rewardGold
          state.metrics.goldEarned += round.rewardGold
          addRep(round.rewardRep)
          addXp(round.xp)
          this.world.cb = null
          tournamentBonus = { gold: round.rewardGold, rep: round.rewardRep, xp: round.xp, name: round.name }
          state.tournament.round = Math.max(state.tournament.round, (this.opts.roundIndex || 0) + 1)
          if (state.tournament.round >= TOURNAMENT.length) {
            state.tournament.complete = true
            state.metrics.tournamentsWon++
            addRep(6)
            addXp(150)
          }
        }
      }
      checkQuests()
      save()
    } else {
      save()
    }

    this.result = {
      victory, enemyId: this.enemyId, enemyName: def.name, enemyTitle: def.title,
      rewards, loot, boss: !!def.boss, bossReward, tournamentBonus,
    }
    this.cb.onHud?.(this.getHud())
    this.cb.onEnd?.(this.result)
  }

  endNow() {
    this.cleanup()
    this.active = false
    this.over = false
  }

  getHud() {
    const wand = getEquippedWand()
    const buffs = []
    if (this.shieldActive) buffs.push('Shield')
    if (this.shieldHp > 0) buffs.push(`Ward ${Math.round(this.shieldHp)}`)
    if (this.wardT > 0) buffs.push('Salvio')
    if (this.regenT > 0) buffs.push('Mending')
    if (this.invuln > 0) buffs.push('Evasive')
    if (this.enemyStatus.stun > 0) buffs.push('Foe Stunned')
    return {
      hp: Math.max(0, Math.round(this.hp)), maxHp: Math.round(this.maxHp),
      mana: Math.round(this.mana), maxMana: this.maxMana,
      shieldHp: Math.round(this.shieldHp),
      enemyHp: Math.max(0, Math.round(this.enemy?.hp || 0)), enemyMax: Math.round(this.enemy?.maxHp || 1),
      enemyName: this.def?.name || '', enemyTitle: this.def?.title || '',
      phase: this.def?.boss ? `Phase ${this.enemy?.phase || 1} / 3` : (this.enemyStatus.stun > 0 ? 'Stunned' : ''),
      buffs, loadout: this.loadout, cooldowns: this.cooldowns,
      dodgeCd: this.dodgeCd, dodgeMax: 2.6,
      wandName: wand?.name || '',
    }
  }

  /* ------------------------------------------------------ PLAYER ACTIONS */
  tryCast(slot) {
    if (!this.active || this.over || this.countdown > 0) return
    const id = this.loadout[slot]
    if (!id || !state.learned[id]) return
    const spell = SPELL_BY_ID[id]
    if (!spell) return
    if ((this.cooldowns[id] || 0) > 0) { this.cb.onSfx?.('cooldown'); return }
    const cost = spellMana(spell)
    if (this.mana < cost) { this.cb.onBlocked?.('Not enough mana'); this.cb.onSfx?.('cooldown'); return }
    this.mana -= cost
    this.cooldowns[id] = spellCooldown(spell)
    this.world.castAnimation(spell.color)
    this.cb.onSfx?.('cast', spell.cat)
    this.cb.onCast?.(spell)
    const wand = getEquippedWand()
    const dir = new THREE.Vector3(this.enemy.position.x - this.world.playerPos.x, 0, this.enemy.position.z - this.world.playerPos.z).normalize()
    const origin = new THREE.Vector3(this.world.playerPos.x + dir.x * 0.7, this.world.playerPos.y + 1.35, this.world.playerPos.z + dir.z * 0.7)
    this.fx.castFlash(origin, spell.color, 1.5)

    switch (spell.kind) {
      case 'projectile': case 'fireball':
        this.firePlayerOrb(spell, origin, 0, spell.kind === 'fireball')
        break
      case 'multi': {
        const offsets = spell.id === 'oppugno' ? [-0.26, 0, 0.26] : [-0.22, 0, 0.22]
        offsets.forEach((off, i) => this.pendingCasts.push({ t: i * 0.09, fn: () => this.firePlayerOrb(spell, origin, off, false) }))
        break
      }
      case 'beam':
        this.playerBeam(spell, origin)
        break
      case 'heal':
        this.healPlayer(spell.power, spell)
        break
      case 'regen':
        this.regenT = 6; this.regenRate = spell.power
        this.fx.implosion(new THREE.Vector3(this.world.playerPos.x, this.world.playerPos.y + 1, this.world.playerPos.z), spell.color)
        this.healPlayer(6, spell, true)
        break
      case 'shield':
        this.shieldHp += spell.power
        this.fx.shieldBurst(new THREE.Vector3(this.world.playerPos.x, this.world.playerPos.y + 1, this.world.playerPos.z), spell.color)
        this.cb.onFloat?.({ pos: new THREE.Vector3(this.world.playerPos.x, this.world.playerPos.y + 2.2, this.world.playerPos.z), amount: spell.power, type: 'shield' })
        break
      case 'healShield':
        this.healPlayer(12, spell)
        this.shieldHp += spell.power
        this.fx.shieldBurst(new THREE.Vector3(this.world.playerPos.x, this.world.playerPos.y + 1, this.world.playerPos.z), spell.color)
        break
      case 'ward':
        this.wardT = 6
        this.healPlayer(8, spell, true)
        this.fx.runeRing(new THREE.Vector3(this.world.playerPos.x, this.world.playerPos.y, this.world.playerPos.z), spell.color, 1.6, 0.8)
        break
      case 'petrify':
        this.playerBeam(spell, origin, true)
        break
      case 'aoe':
        this.playerAoe(spell, origin)
        break
      case 'breath':
        this.playerBreath(spell, origin)
        break
      case 'curse':
        this.playerBeam(spell, origin, false, true)
        break
      default:
        this.firePlayerOrb(spell, origin, 0, false)
    }
    this.cb.onHud?.(this.getHud())
  }

  firePlayerOrb(spell, origin, angleOffset, isFire) {
    if (!this.enemy || this.enemy.dead) return
    const target = new THREE.Vector3(this.enemy.position.x, this.enemy.position.y + 1.15, this.enemy.position.z)
    const dir = target.clone().sub(origin).normalize()
    dir.applyAxisAngle(new THREE.Vector3(0, 1, 0), angleOffset)
    const mesh = this.fx.makeOrb(spell.color, isFire ? 0.95 : 0.65)
    mesh.position.copy(origin)
    const proj = {
      mesh, fromPlayer: true, spell, damage: spellPower(spell), speed: isFire ? 16 : 21,
      life: 4.5, homing: 5.5, target, isFire,
    }
    this.activeProjectiles.push(proj)
    this.cb.onSfx?.('launch')
  }

  playerBeam(spell, origin, petrify = false, curse = false) {
    if (!this.enemy || this.enemy.dead) return
    const target = new THREE.Vector3(this.enemy.position.x, this.enemy.position.y + 1.2, this.enemy.position.z)
    this.fx.beam(origin, target, spell.color, 0.28, spell.id === 'umbra' ? 0.15 : 0.1)
    this.fx.burst(target, spell.color, 14, 4, 0.45, 0.5)
    const dmg = Math.round(spellPower(spell) * rand(0.94, 1.08))
    this.damageEnemy(dmg, spell, { beam: true })
    if (petrify) {
      this.enemyStatus.stun = Math.max(this.enemyStatus.stun, 2.2)
      this.cb.onMessage?.('PETRIFIED', 1)
    }
    if (curse) this.enemyStatus.weaken = Math.max(this.enemyStatus.weaken, 5)
    if (spell.id === 'umbra') {
      const heal = Math.round(dmg * 0.4)
      this.healPlayer(heal, spell, true)
    }
    this.world.shake(0.12, 0.15)
  }

  playerAoe(spell, origin) {
    if (!this.enemy || this.enemy.dead) return
    const target = new THREE.Vector3(this.enemy.position.x, this.enemy.position.y, this.enemy.position.z)
    this.fx.runeRing(target, spell.color, 3.2, 0.9)
    this.fx.burst(new THREE.Vector3(target.x, target.y + 1, target.z), spell.color, 40, 9, 0.8, 1.1)
    const dmg = Math.round(spellPower(spell) * rand(0.95, 1.1))
    this.damageEnemy(dmg, spell, { aoe: true })
    this.enemyStatus.burn = Math.max(this.enemyStatus.burn, 5)
    this.world.shake(0.3, 0.4)
  }

  playerBreath(spell, origin) {
    if (!this.enemy || this.enemy.dead) return
    const target = new THREE.Vector3(this.enemy.position.x, this.enemy.position.y + 1.1, this.enemy.position.z)
    for (let i = 0; i < 4; i++) {
      const t = i / 4
      const p = origin.clone().lerp(target, t)
      this.fx.burst(p, spell.color, 12, 5, 0.7, 0.7)
    }
    this.fx.beam(origin, target, '#ff9ae0', 0.4, 0.35)
    const dmg = Math.round(spellPower(spell) * rand(0.9, 1.05))
    this.damageEnemy(dmg, spell, { aoe: true })
    this.enemyStatus.burn = Math.max(this.enemyStatus.burn, 3)
    this.world.shake(0.24, 0.3)
  }

  healPlayer(amount, spell, quiet = false) {
    const wand = getEquippedWand()
    let mult = 1
    if (wand.core === 'unicorn') mult += 0.25
    if (wand.ability?.special === 'moonfire' || wand.ability?.special === 'starfall') mult += 0.15
    if (wand.ability?.bonuses?.healing) mult += 0
    const healed = Math.round(amount * mult)
    this.hp = Math.min(this.maxHp, this.hp + healed)
    const p = new THREE.Vector3(this.world.playerPos.x, this.world.playerPos.y + 2.1, this.world.playerPos.z)
    this.fx.implosion(new THREE.Vector3(this.world.playerPos.x, this.world.playerPos.y + 0.9, this.world.playerPos.z), spell.color, 10)
    if (!quiet) this.cb.onFloat?.({ pos: p, amount: healed, type: 'heal' })
    this.cb.onHud?.(this.getHud())
  }

  dodge(input) {
    if (!this.active || this.over || this.countdown > 0) return
    if (this.dodgeCd > 0) return
    const wand = getEquippedWand()
    let cd = 2.6
    if (wand.core === 'thestral') cd *= 0.65
    if (wand.ability?.special === 'phase' || wand.ability?.special === 'gravemarch') cd *= 0.65
    const dir = new THREE.Vector3(input?.x || 0, 0, input?.z || 0)
    if (dir.lengthSq() < 0.01) dir.set(Math.sin(this.world.facing), 0, Math.cos(this.world.facing))
    if (!this.world.triggerDash(dir)) return
    this.invuln = 0.38
    this.dodgeCd = cd
    this.fx.implosion(new THREE.Vector3(this.world.playerPos.x, this.world.playerPos.y + 1, this.world.playerPos.z), '#c9a6ff', 12)
    this.cb.onSfx?.('dodge')
  }

  /* ------------------------------------------------------ ENEMY AI */
  startTelegraph() {
    if (!this.enemy || this.enemy.dead) return
    const color = this.enemyId === 'gloomfang' ? '#a6ff8a' : (this.enemyId === 'warden' ? '#8fe6ff' : (this.def.boss ? '#ff5f7a' : this.def.accent))
    const sprite = this.fx.sprite(color, 0.7, 0.85)
    sprite.position.set(this.enemy.position.x, this.enemy.position.y + 1.5, this.enemy.position.z)
    this.world.scene.add(sprite)
    this.telegraph = { sprite, t: 0.62, total: 0.62, color }
    this.enemy.group.rotation.y = Math.atan2(this.world.playerPos.x - this.enemy.position.x, this.world.playerPos.z - this.enemy.position.z)
    this.cb.onSfx?.('enemyCast')
  }

  fireEnemyPattern() {
    if (!this.enemy || this.enemy.dead || this.over) return
    const style = this.def.style
    const phase = this.enemy.phase
    const toPlayer = new THREE.Vector3(this.world.playerPos.x - this.enemy.position.x, 0, this.world.playerPos.z - this.enemy.position.z)
    const baseAngle = Math.atan2(toPlayer.x, toPlayer.z)
    const source = new THREE.Vector3(this.enemy.position.x, this.enemy.position.y + 1.45, this.enemy.position.z)
    const color = this.enemyId === 'gloomfang' ? '#a6ff8a' : (this.enemyId === 'warden' ? '#8fe6ff' : (this.def.boss ? '#ff5f7a' : this.def.accent))

    if (style === 'bolt' || style === 'multi') {
      const count = style === 'multi' ? (phase >= 2 ? 3 : 2) : 1
      for (let i = 0; i < count; i++) {
        const off = (i - (count - 1) / 2) * 0.16
        this.pendingCasts.push({ t: i * 0.14, fn: () => this.spawnEnemyBolt(source, baseAngle + off, color, 8.6, this.def.damage * (this.def.boss ? 1 : 0.9)) })
      }
    } else if (style === 'fan') {
      const count = this.def.boss ? (phase >= 2 ? 5 : 3) : 3
      for (let i = 0; i < count; i++) {
        const off = (i - (count - 1) / 2) * 0.22
        this.spawnEnemyBolt(source, baseAngle + off, color, 8.2, this.def.damage)
      }
    } else if (style === 'boss') {
      const roll = Math.random()
      if (roll < 0.4) {
        for (let i = 0; i < 5 + phase; i++) {
          const off = (i - (4 + phase) / 2) * 0.17
          this.spawnEnemyBolt(source, baseAngle + off, color, 7.8 + phase * 0.5, this.def.damage)
        }
      } else if (roll < 0.75) {
        const n = phase + 1
        for (let i = 0; i < n; i++) {
          const p = new THREE.Vector3(this.world.playerPos.x + rand(-2.2, 2.2), 0, this.world.playerPos.z + rand(-2.2, 2.2))
          this.spawnAoe(p, 2.1, 1.15, this.def.damage * 1.2)
        }
      } else {
        for (let i = 0; i < 2; i++) {
          const mesh = this.fx.makeOrb('#c95aff', 0.85)
          mesh.position.copy(source)
          this.activeProjectiles.push({ mesh, fromPlayer: false, speed: 4.2 + phase * 0.5, damage: this.def.damage * 0.85, life: 6, homing: 1.1, color: '#c95aff', homingEnemy: true })
        }
      }
      if (phase >= 3 && Math.random() < 0.5) {
        for (let i = 0; i < 7; i++) {
          this.spawnEnemyBolt(source, (i / 7) * Math.PI * 2, color, 6.5, this.def.damage * 0.7)
        }
      }
    }
    this.cb.onSfx?.('enemyFire')
  }

  spawnEnemyBolt(source, angle, color, speed, damage) {
    const mesh = this.fx.makeOrb(color, 0.62)
    mesh.position.copy(source)
    const dir = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle))
    this.activeProjectiles.push({ mesh, fromPlayer: false, speed, damage, life: 4.5, dir, color })
  }

  spawnAoe(pos, radius, delay, damage) {
    const y = this.world.heightAt(pos.x, pos.z)
    const mat = new THREE.MeshBasicMaterial({ color: '#ff5f7a', transparent: true, opacity: 0.4, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
    const mesh = new THREE.Group()
    const disc = new THREE.Mesh(new THREE.CircleGeometry(radius, 32), mat)
    disc.rotation.x = -Math.PI / 2; disc.position.y = 0.08; mesh.add(disc)
    const ring = new THREE.Mesh(new THREE.RingGeometry(radius - 0.1, radius, 40), new THREE.MeshBasicMaterial({ color: '#ff8aa8', transparent: true, opacity: 0.9, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }))
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.1; mesh.add(ring)
    mesh.position.set(pos.x, y, pos.z)
    this.world.scene.add(mesh)
    this.aoes.push({ mesh, t: delay, total: delay, radius, damage, done: false, ring })
    this.cb.onSfx?.('warning')
  }

  damagePlayer(raw, opts = {}) {
    if (this.over || this.invuln > 0) return
    let dmg = raw
    if (this.wardT > 0) dmg *= 0.6
    if (this.shieldActive) {
      dmg *= 0.22
      this.mana = Math.max(0, this.mana - 9)
      this.fx.shieldBurst(new THREE.Vector3(this.world.playerPos.x, this.world.playerPos.y + 1, this.world.playerPos.z), '#9fd0ff')
      this.cb.onSfx?.('shieldHit')
    }
    if (this.shieldHp > 0) {
      const absorbed = Math.min(this.shieldHp, dmg)
      this.shieldHp -= absorbed
      dmg -= absorbed
      if (absorbed > 0) this.fx.shieldBurst(new THREE.Vector3(this.world.playerPos.x, this.world.playerPos.y + 1.1, this.world.playerPos.z), '#9fd0ff')
      // thorns
      if (getEquippedWand().ability?.special === 'thorns' && absorbed > 0 && this.enemy) {
        this.damageEnemy(Math.round(absorbed * 0.35), null, { passive: true })
      }
    }
    dmg = Math.max(0, Math.round(dmg))
    if (dmg <= 0) return
    this.hp -= dmg
    this.world.shake(0.28 + Math.min(0.25, dmg / 60), 0.3)
    this.hitFlashT = 0.35
    this.cb.onHit?.(dmg)
    this.cb.onFloat?.({ pos: new THREE.Vector3(this.world.playerPos.x, this.world.playerPos.y + 2.2, this.world.playerPos.z), amount: dmg, type: 'damage' })
    this.cb.onSfx?.('playerHit')
    if (this.hp <= 0) this.tryPhoenix()
    this.cb.onHud?.(this.getHud())
  }

  tryPhoenix() {
    const wand = getEquippedWand()
    if (!this.revived && (wand.core === 'phoenix' || wand.ability?.special === 'phoenixRevive')) {
      this.revived = true
      this.hp = Math.round(this.maxHp * 0.3)
      this.invuln = 1.2
      this.fx.runeRing(new THREE.Vector3(this.world.playerPos.x, this.world.playerPos.y, this.world.playerPos.z), '#ff9a4d', 3, 1.2)
      this.fx.burst(new THREE.Vector3(this.world.playerPos.x, this.world.playerPos.y + 1, this.world.playerPos.z), '#ff9a4d', 45, 8, 0.8, 1.2)
      this.cb.onMessage?.('UNDYING EMBER', 1.6)
      this.cb.onSfx?.('revive')
      return
    }
    if (this.hp <= 0) this.finish(false)
  }

  damageEnemy(raw, spell, opts = {}) {
    if (!this.enemy || this.enemy.dead || this.over) return
    const wand = getEquippedWand()
    let dmg = raw
    let crit = false
    const critChance = 0.06 + (wand.stats.finesse / 900)
    if (!opts.passive && Math.random() < critChance) { dmg *= 1.65; crit = true }
    dmg = Math.max(1, Math.round(dmg))
    this.enemy.hp -= dmg
    this.hitFlashT = 0.2
    const p = new THREE.Vector3(this.enemy.position.x, this.enemy.position.y + 1.2, this.enemy.position.z)
    this.cb.onFloat?.({ pos: p, amount: dmg, type: 'enemy', crit })
    this.cb.onSfx?.('hit')
    this.world.shake(0.1, 0.12)
    if (spell) {
      const w = getEquippedWand()
      const special = w.ability?.special
      if (['incendio', 'fiendfyre', 'draconifors'].includes(spell.id) || special === 'burn' || special === 'moonfire' || special === 'elderflame') {
        this.enemyStatus.burn = Math.max(this.enemyStatus.burn, 3)
      }
      if (w.core === 'basilisk') this.enemyStatus.poison = Math.max(this.enemyStatus.poison, 3)
      if (w.core === 'manticore') this.enemyStatus.bleed = Math.max(this.enemyStatus.bleed, 4)
      if (['glacius', 'impedimenta'].includes(spell.id)) this.enemyStatus.slow = Math.max(this.enemyStatus.slow, 2.5)
      if (w.core === 'veela' || special === 'charm' || special === 'petals') this.enemyStatus.slow = Math.max(this.enemyStatus.slow, 2)
      if (spell.id === 'stupefy') this.enemyStatus.stun = Math.max(this.enemyStatus.stun, 0.8)
      if (spell.id === 'expelliarmus') this.enemyStatus.stun = Math.max(this.enemyStatus.stun, 1.6)
      if (special === 'chain' && Math.random() < 0.5) {
        this.fx.beam(p, p.clone().add(new THREE.Vector3(rand(-2, 2), rand(0, 2), rand(-2, 2))), '#8fe6ff', 0.2, 0.07)
      }
    }
    if (this.enemy.hp <= 0) {
      this.enemy.dead = true
      this.enemy.hp = 0
      this.fx.burst(p, '#ffd7a0', 45, 9, 0.8, 1.2)
      this.fx.runeRing(new THREE.Vector3(this.enemy.position.x, this.enemy.position.y, this.enemy.position.z), '#ffd7a0', 3, 0.8)
      this.finish(true)
    }
    this.cb.onHud?.(this.getHud())
  }

  update(dt, input = {}) {
    if (!this.active) return
    this.time += dt
    if (this.hitFlashT > 0) this.hitFlashT -= dt
    if (this.over) {
      this.endTimer -= dt
      if (this.enemy) {
        this.enemy.group.rotation.z = lerp(this.enemy.group.rotation.z, this.won ? 1.25 : 0, dt * 3)
        this.enemy.group.position.y = this.enemy.baseY - (this.won ? Math.min(0.7, (2.2 - this.endTimer) * 0.35) : 0)
      }
      if (this.shieldMesh) this.shieldMesh.visible = false
      if (this.endTimer <= 0) {
        const result = this.result
        this.cleanup()
        this.active = false
        this.cb.onClosed?.(result)
      }
      return
    }

    if (this.countdown > 0) {
      this.countdown -= dt
      if (this.countdown <= 0) this.cb.onMessage?.('BEGIN', 1)
      this.updateShield(dt, input)
      return
    }

    // cooldowns
    for (const k of Object.keys(this.cooldowns)) {
      if (this.cooldowns[k] > 0) this.cooldowns[k] = Math.max(0, this.cooldowns[k] - dt)
    }
    if (this.dodgeCd > 0) this.dodgeCd = Math.max(0, this.dodgeCd - dt)
    this.invuln = Math.max(0, this.invuln - dt)
    this.wardT = Math.max(0, this.wardT - dt)
    this.regenT = Math.max(0, this.regenT - dt)
    if (this.regenT > 0) this.hp = Math.min(this.maxHp, this.hp + this.regenRate * dt)

    // mana regen
    const wand = getEquippedWand()
    let regen = 4.6
    if (wand.ability?.special === 'manaflow' || wand.ability?.special === 'flow') regen += 1.8
    if (!this.shieldActive) this.mana = Math.min(this.maxMana, this.mana + regen * dt)
    this.updateShield(dt, input)

    // pending casts
    for (let i = this.pendingCasts.length - 1; i >= 0; i--) {
      const p = this.pendingCasts[i]
      p.t -= dt
      if (p.t <= 0) { p.fn(); this.pendingCasts.splice(i, 1) }
    }

    const st = this.enemyStatus
    for (const key of Object.keys(st)) if (st[key] > 0) st[key] = Math.max(0, st[key] - dt)
    this._dotAcc += dt
    if (this._dotAcc >= 0.5 && this.enemy && !this.enemy.dead) {
      this._dotAcc = 0
      let dot = 0
      if (st.burn > 0) dot += 3
      if (st.poison > 0) dot += 3
      if (st.bleed > 0) dot += 2
      if (dot > 0) {
        this.enemy.hp -= dot
        this.cb.onFloat?.({ pos: new THREE.Vector3(this.enemy.position.x, this.enemy.position.y + 1.4, this.enemy.position.z), amount: dot, type: 'dot' })
        if (this.enemy.hp <= 0) {
          this.enemy.dead = true
          this.enemy.hp = 0
          this.finish(true)
          return
        }
      }
    }

    // enemy AI
    if (this.enemy && !this.enemy.dead) {
      const ex = this.enemy.position.x, ez = this.enemy.position.z
      const toPlayer = new THREE.Vector3(this.world.playerPos.x - ex, 0, this.world.playerPos.z - ez)
      const dist = toPlayer.length() || 1
      const speed = this.def.speed * (st.slow > 0 ? 0.55 : 1) * (st.stun > 0 ? 0 : 1)
      const desired = this.def.boss ? 7.2 : 7.8
      const radial = dist > desired ? 1 : (dist < desired - 1.4 ? -1 : 0)
      this.enemy.strafeTimer -= dt
      if (this.enemy.strafeTimer <= 0) { this.enemy.strafe *= -1; this.enemy.strafeTimer = rand(1.6, 3.2) }
      const radialDir = toPlayer.clone().normalize().multiplyScalar(radial)
      const tangent = new THREE.Vector3(-toPlayer.z, 0, toPlayer.x).normalize().multiplyScalar(this.enemy.strafe * 0.8)
      const move = radialDir.add(tangent).normalize().multiplyScalar(speed * dt)
      let nx = ex + move.x, nz = ez + move.z
      const c = this.arenaCenter
      const away = new THREE.Vector3(nx - c.x, 0, nz - c.z)
      if (away.length() > 7.8) { away.setLength(7.8); nx = c.x + away.x; nz = c.z + away.z }
      const pd = Math.hypot(nx - this.world.playerPos.x, nz - this.world.playerPos.z)
      if (pd > 2.6) {
        this.enemy.position.x = nx; this.enemy.position.z = nz
        this.enemy.position.y = this.world.heightAt(nx, nz)
      }
      this.enemy.group.rotation.y = Math.atan2(this.world.playerPos.x - this.enemy.position.x, this.world.playerPos.z - this.enemy.position.z)
      this.enemy.group.position.y = this.enemy.position.y + Math.sin(this.time * 2) * 0.03

      // phases
      if (this.def.boss) {
        const ratio = this.enemy.hp / this.enemy.maxHp
        const newPhase = ratio > 0.66 ? 1 : ratio > 0.33 ? 2 : 3
        if (newPhase !== this.enemy.phase) {
          this.enemy.phase = newPhase
          this.cb.onMessage?.(`PHASE ${newPhase}`, 1.4)
          this.cb.onSfx?.('phase')
          this.fx.runeRing(new THREE.Vector3(this.enemy.position.x, this.enemy.position.y, this.enemy.position.z), '#ff5f7a', 4, 1)
          this.fx.burst(new THREE.Vector3(this.enemy.position.x, this.enemy.position.y + 1, this.enemy.position.z), '#ff5f7a', 30, 7, 0.7, 1)
        }
      }

      if (st.stun <= 0) {
        this.castTimer -= dt
        if (this.telegraph) {
          this.telegraph.t -= dt
          const t = 1 - this.telegraph.t / this.telegraph.total
          this.telegraph.sprite.scale.setScalar(0.7 + t * 2.4)
          this.telegraph.sprite.position.set(this.enemy.position.x, this.enemy.position.y + 1.5, this.enemy.position.z)
          this.telegraph.sprite.material.opacity = 0.5 + t * 0.5
          if (this.telegraph.t <= 0) {
            this.world.scene.remove(this.telegraph.sprite)
            this.telegraph.sprite.material.dispose()
            this.telegraph = null
            this.fireEnemyPattern()
          }
        } else if (this.castTimer <= 0) {
          this.startTelegraph()
          const phase = this.enemy.phase
          let base = rand(this.def.castMin, this.def.castMax)
          if (this.enemyId === 'warden') base *= 1.05
          if (this.def.boss) base *= (1 - phase * 0.09)
          this.castTimer = base
        }
      }
    }

    this.updateProjectiles(dt)
    this.updateAoes(dt)
    this.updateShieldMesh()
    this._hudAcc += dt
    if (this._hudAcc > 0.06) { this._hudAcc = 0; this.cb.onHud?.(this.getHud()) }
    if (this.hp <= 0 && !this.over) this.tryPhoenix()
  }

  updateShield(dt, input) {
    const want = !!input.shield
    if (want && this.mana > 0.6) {
      this.shieldActive = true
      this.mana = Math.max(0, this.mana - 16 * dt)
    } else {
      this.shieldActive = false
    }
  }

  updateShieldMesh() {
    if (!this.shieldMesh) return
    this.shieldMesh.visible = this.shieldActive
    if (this.shieldActive) {
      this.shieldMesh.position.set(this.world.playerPos.x, this.world.playerPos.y + 1.05, this.world.playerPos.z)
      this.shieldMesh.material.opacity = 0.13 + Math.sin(this.time * 8) * 0.04
      this.shieldMesh.rotation.y = this.time * 0.6
    }
  }

  updateProjectiles(dt) {
    const px = this.world.playerPos.x, pz = this.world.playerPos.z, py = this.world.playerPos.y
    for (let i = this.activeProjectiles.length - 1; i >= 0; i--) {
      const p = this.activeProjectiles[i]
      p.life -= dt
      if (p.life <= 0) { this.fx.removeOrb(p.mesh); this.activeProjectiles.splice(i, 1); continue }
      if (p.fromPlayer) {
        if (!this.enemy || this.enemy.dead) { this.fx.removeOrb(p.mesh); this.activeProjectiles.splice(i, 1); continue }
        const target = new THREE.Vector3(this.enemy.position.x, this.enemy.position.y + 1.15, this.enemy.position.z)
        const desired = target.clone().sub(p.mesh.position).normalize()
        const prev = p.mesh.position.clone()
        p.mesh.position.addScaledVector(desired, p.speed * dt)
        p.mesh.rotation.y += dt * 9
        // trail
        this._trailTimer -= dt
        if (this._trailTimer <= 0) { this._trailTimer = 0.035; this.fx.trail(p.mesh.position, p.spell.color, 0.45, 0.35) }
        if (segmentDistance(prev, p.mesh.position, target) < 0.95) {
          this.fx.burst(target, p.spell.color, p.isFire ? 28 : 14, p.isFire ? 6 : 3.5, p.isFire ? 0.7 : 0.4, 0.6)
          if (p.isFire) this.fx.runeRing(new THREE.Vector3(this.enemy.position.x, this.enemy.position.y, this.enemy.position.z), '#ff9e4d', 2.4, 0.45)
          this.damageEnemy(p.damage, p.spell)
          this.fx.removeOrb(p.mesh)
          this.activeProjectiles.splice(i, 1)
        }
      } else {
        if (p.homingEnemy) {
          const toP = new THREE.Vector3(px - p.mesh.position.x, 0, pz - p.mesh.position.z).normalize()
          p.dir = p.dir ? p.dir.lerp(toP, Math.min(1, dt * p.homing)).normalize() : toP
        }
        const prev = p.mesh.position.clone()
        if (p.dir) p.mesh.position.addScaledVector(p.dir, p.speed * dt)
        p.mesh.rotation.y += dt * 7
        this._trailTimer -= dt
        if (this._trailTimer <= 0) { this._trailTimer = 0.04; this.fx.trail(p.mesh.position, p.color || '#ff8aa8', 0.4, 0.3) }
        const d = segmentDistance(prev, p.mesh.position, { x: px, z: pz })
        if (d < 0.9 && Math.abs(p.mesh.position.y - (py + 1.15)) < 1.7) {
          if (this.invuln <= 0) {
            this.damagePlayer(p.damage)
            this.fx.burst(new THREE.Vector3(px, py + 1.1, pz), p.color || '#ff8aa8', 16, 4, 0.4, 0.5)
          } else {
            this.fx.burst(new THREE.Vector3(px, py + 1.1, pz), '#c9a6ff', 10, 4, 0.3, 0.4)
          }
          this.fx.removeOrb(p.mesh)
          this.activeProjectiles.splice(i, 1)
          continue
        }
        if (Math.hypot(p.mesh.position.x - this.arenaCenter.x, p.mesh.position.z - this.arenaCenter.z) > 13) {
          this.fx.removeOrb(p.mesh); this.activeProjectiles.splice(i, 1)
        }
      }
    }
  }

  updateAoes(dt) {
    for (let i = this.aoes.length - 1; i >= 0; i--) {
      const a = this.aoes[i]
      a.t -= dt
      const shake = a.t < 0.4 ? 0.06 : 0
      a.mesh.position.x += (Math.random() - .5) * shake
      a.mesh.position.z += (Math.random() - .5) * shake
      a.ring.material.opacity = 0.5 + Math.sin(this.time * 18) * 0.35
      if (a.t <= 0) {
        this.fx.burst(new THREE.Vector3(a.mesh.position.x, a.mesh.position.y + 0.6, a.mesh.position.z), '#ff5f7a', 36, 8, 0.75, 0.9)
        this.fx.runeRing(new THREE.Vector3(a.mesh.position.x, a.mesh.position.y + 0.05, a.mesh.position.z), '#ff5f7a', a.radius, 0.6)
        const d = Math.hypot(this.world.playerPos.x - a.mesh.position.x, this.world.playerPos.z - a.mesh.position.z)
        if (d < a.radius + 0.35) this.damagePlayer(a.damage)
        this.world.scene.remove(a.mesh)
        this.world.shake(0.25, 0.3)
        this.aoes.splice(i, 1)
      }
    }
  }
}

function lerp(a, b, t) { return a + (b - a) * t }

function segmentDistance(a, b, p) {
  const abx = b.x - a.x, abz = b.z - a.z
  const len2 = abx * abx + abz * abz
  if (len2 < 0.000001) return Math.hypot(p.x - a.x, p.z - a.z)
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * abx + (p.z - a.z) * abz) / len2))
  return Math.hypot(p.x - (a.x + abx * t), p.z - (a.z + abz * t))
}
