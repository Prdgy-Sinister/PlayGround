/* ═══════════════════════════════════════════════════════════
   WANDLORE · INTERFACE
   ═══════════════════════════════════════════════════════════ */
import {
  SPELLS, LESSON_TRACKS, CATEGORIES, WOODS, CORES, RARITIES,
  ENEMIES, TOURNAMENTS, ZONES, DIALOGUE, QUESTS
} from './data.js';
import { saleEvaluation, customerReaction, wandSVG, computeWand, BENCH } from './crafting.js';
import { renderPanel, PANELS, updateCraftPreview } from './panels.js';

const $ = id => document.getElementById(id);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html !== undefined) n.innerHTML = html;
  return n;
};
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const RUNES = ['ᚦ', 'ᛉ', 'ᛟ', 'ᚱ', 'ᛏ', 'ᛒ', 'ᛗ', 'ᛊ', 'ᛖ', 'ᛞ'];
const shuffle = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(x => x[1]);

export class Ui {
  constructor(game, audio) {
    this.game = game;
    this.audio = audio;
    this.actions = {};
    this.panel = null;
    this.panelTab = 'craft';
    this.craft = { tab: 'woods', woodId: null, coreId: null, materials: [], length: 12, flexibility: 50 };
    this.spellCat = 'all';
    this.shopTab = 'customers';
    this.shopCustomer = null;
    this.modalOpen = false;
    this.dialogueOpen = false;
    this.challengeCleanup = null;
    this.locationName = 'Emberfall Village';
    this.playerZone = 'village';
    this.playerPos = { x: 0, z: 0 };
    this.cameraYaw = 0;
    this.spellSlots = [];
    this.cds = {};
    this.combo = 0;
    this.cache();
    this.bind();
    this.buildNav();
  }

  cache() {
    this.dom = {
      loading: $('loading'), title: $('title-screen'), hud: $('hud'),
      overlay: $('overlay'), nav: $('grimoire-nav'), body: $('panel-body'),
      kicker: $('panel-kicker'), title2: $('panel-title'),
      modal: $('modal'), modalCard: $('modal-card'),
      dialogue: $('dialogue'), dlgPortrait: $('dlg-portrait'), dlgName: $('dlg-name'),
      dlgText: $('dlg-text'), dlgChoices: $('dlg-choices'),
      toasts: $('toasts'), objective: $('objective-toast'),
      spellbar: $('spellbar'), castOrb: $('cast-orb'),
      interact: $('interact-prompt'), interactText: $('interact-text'),
      combat: $('combat-ui'), enemyName: $('enemy-name'), enemyRank: $('enemy-rank'),
      enemyHp: $('enemy-hp-fill'), enemyHpText: $('enemy-hp-text'),
      enemyCast: $('enemy-cast'), duelRound: $('duel-round'), comboEl: $('combo'),
      combatLog: $('combat-log'), crosshair: $('crosshair'),
      minimap: $('minimap'), minimapLabel: $('minimap-label'),
      questTitle: $('qt-title'), questObjective: $('qt-objective'), questBar: $('qt-bar'),
      questCount: $('quest-count'), location: $('location-name'), clock: $('clock'),
      hpFill: $('hp-fill'), hpText: $('hp-text'), mpFill: $('mp-fill'), mpText: $('mp-text'),
      xpFill: $('xp-fill'), xpLabel: $('xp-label'), playerName: $('player-name'),
      playerTitle: $('player-title'), playerLevel: $('player-level'), initials: $('player-initials'),
      gold: $('res-gold'), rep: $('res-rep'), rank: $('res-rank'), wands: $('res-wands'),
      panelGold: $('panel-gold'), panelRep: $('panel-rep'),
      damage: $('damage-layer'), spellBanner: $('spell-banner'), bannerName: $('spell-banner-name'),
      bannerRune: $('spell-banner-rune'), levelFlash: $('level-flash'), lfLevel: $('lf-level'),
      lfTitle: $('lf-title'), fade: $('fade'), autosave: $('autosave'),
      compass: $('compass-track'), sound: $('btn-sound'), panelGoldEl: $('panel-gold')
    };
    this.minimapCtx = this.dom.minimap?.getContext('2d');
  }

  bind() {
    this.dom.nav.addEventListener('click', e => {
      const b = e.target.closest('[data-panel]');
      if (!b) return;
      this.actions.sfx?.('ui');
      this.openPanel(b.dataset.panel);
    });
    this.dom.body.addEventListener('click', e => {
      const btn = e.target.closest('[data-act]');
      if (!btn || btn.disabled) return;
      this.onAction(btn.dataset.act, btn.dataset.id, btn);
    });
    this.dom.body.addEventListener('input', e => {
      if (e.target.id === 'craft-length') { this.craft.length = Number(e.target.value); e.target.closest('.slider-row').querySelector('b').textContent = `${this.craft.length}″`; updateCraftPreview(this); }
      if (e.target.id === 'craft-flex') { this.craft.flexibility = Number(e.target.value); e.target.closest('.slider-row').querySelector('b').textContent = `${this.craft.flexibility}%`; updateCraftPreview(this); }
    });
    $('btn-close-panel').addEventListener('click', () => this.closePanel());
    this.dom.overlay.querySelector('.overlay-backdrop').addEventListener('click', () => this.closePanel());
    $('btn-map').addEventListener('click', () => this.openPanel('map'));
    $('player-card').addEventListener('click', () => this.openPanel('character'));
    this.dom.modal.querySelector('.modal-backdrop').addEventListener('click', () => {
      if (!this.modalLocked) this.closeModal();
    });
    this.dom.dialogue.addEventListener('click', e => {
      if (e.target.closest('.dlg-close')) this.closeDialogue();
      const choice = e.target.closest('[data-choice]');
      if (choice) {
        const idx = Number(choice.dataset.choice);
        const fn = this.dialogueChoices?.[idx]?.action;
        this.audio.ui();
        fn?.();
      }
    });
  }

  buildNav() {
    const s = this.game.s;
    this.dom.nav.innerHTML = `<div class="nav-brand">WANDLORE<b>THE GRIMOIRE</b></div>` +
      PANELS.map(p => `<button class="nav-btn" data-panel="${p.id}"><span>${p.rune}</span>${p.label}</button>`).join('') +
      `<div class="nav-foot"><b>${s?.name || 'The Wanderer'}</b><br>${s ? this.game.displayTitle() : "Wandmaker's Apprentice"}<br><br>Emberfall · The Vale</div>`;
  }

  /* ── HUD ─────────────────────────────────────────────────── */
  refresh() {
    const g = this.game, s = g.s;
    if (!s) return;
    const initials = s.name.split(' ').map(x => x[0]).slice(0, 2).join('').toUpperCase();
    this.dom.initials.textContent = initials;
    this.dom.playerName.textContent = s.name;
    this.dom.playerTitle.textContent = g.displayTitle();
    this.dom.playerLevel.textContent = s.level;
    this.dom.gold.textContent = s.gold.toLocaleString();
    this.dom.rep.textContent = s.rep;
    this.dom.wands.textContent = s.wands.length;
    this.dom.rank.textContent = s.badges.includes('Silver Circle Champion') ? 'Silver Circle' : s.stats.duelsWon >= 3 ? 'Contender' : 'Unranked';
    this.dom.panelGold.textContent = s.gold.toLocaleString();
    this.dom.panelRep.textContent = s.rep;
    const xpMax = g.xpToNext();
    this.dom.xpFill.style.width = `${clamp((s.xp / xpMax) * 100, 0, 100)}%`;
    this.dom.xpLabel.textContent = `${s.xp} / ${xpMax} XP`;
    this.dom.minimapLabel.textContent = this.locationName.split(' ').slice(0, 2).join(' ');
    // quest
    const active = g.activeQuest();
    const activeCount = QUESTS.filter(q => { const st = g.s.quests[q.id]; return st && !st.done; }).length;
    this.dom.questCount.textContent = activeCount;
    if (active) {
      const st = g.questState(active);
      this.dom.questTitle.textContent = active.name;
      this.dom.questObjective.textContent = `${active.objective}${active.target > 1 ? ` · ${st.progress}/${active.target}` : ''}`;
      this.dom.questBar.style.width = `${clamp((st.progress / active.target) * 100, 0, 100)}%`;
    } else {
      this.dom.questTitle.textContent = 'All quests complete';
      this.dom.questObjective.textContent = 'The Vale is quieter. For now.';
      this.dom.questBar.style.width = '100%';
    }
    this.dom.location.textContent = this.locationName;
    this.dom.clock.textContent = this.clockLabel();
    this.updateSpellbar();
    this.updateMeters();
    if (this.panel) this.renderPanel();
    this.buildNavName();
  }

  buildNavName() {
    const foot = this.dom.nav.querySelector('.nav-foot');
    const s = this.game.s;
    if (foot && s) foot.innerHTML = `<b>${s.name}</b><br>${this.game.displayTitle()}<br><br>Emberfall · The Vale`;
  }

  clockLabel() {
    const t = (this.game.s.playTime || 0) % 720;
    if (t < 180) return 'Dusk';
    if (t < 360) return 'Night';
    if (t < 540) return 'Deep Night';
    return 'Before Dawn';
  }

  setLocation(name, zoneId) {
    this.locationName = name;
    if (zoneId) this.playerZone = zoneId;
    this.dom.location.textContent = name;
    this.dom.minimapLabel.textContent = name.split(' ').slice(0, 2).join(' ');
  }

  updateMeters() {
    const s = this.game.s;
    const hp = this.combatHp ?? s.hp ?? this.game.maxHp();
    const mp = this.combatMp ?? s.mp ?? this.game.maxMp();
    const hpMax = this.game.maxHp();
    const mpMax = this.game.maxMp();
    this.dom.hpFill.style.width = `${clamp((hp / hpMax) * 100, 0, 100)}%`;
    this.dom.hpText.textContent = Math.max(0, Math.round(hp));
    this.dom.mpFill.style.width = `${clamp((mp / mpMax) * 100, 0, 100)}%`;
    this.dom.mpText.textContent = Math.max(0, Math.round(mp));
  }

  updateSpellbar() {
    const s = this.game.s;
    if (!this.dom.spellbar) return;
    const slots = s.loadout.map(id => SPELLS.find(x => x.id === id)).filter(Boolean);
    if (!this.spellSlots.length || this._barKey !== s.loadout.join(',')) {
      this._barKey = s.loadout.join(',');
      this.dom.spellbar.innerHTML = '';
      this.spellSlots = Array.from({ length: 6 }).map((_, i) => {
        const sp = slots[i];
        const b = el('button', 'spell-slot' + (sp ? '' : ' locked'));
        b.dataset.index = i;
        if (sp) {
          b.style.setProperty('--sc', CATEGORIES[sp.cat].color);
          b.innerHTML = `<span class="slot-key">${i + 1}</span><span class="slot-rune">${sp.rune}</span><span class="slot-name">${sp.name}</span><span class="slot-cost">${sp.mana}</span><span class="slot-cd"></span>`;
          b.title = `${sp.name} — ${sp.mana} MP · ${CATEGORIES[sp.cat].name}`;
          b.addEventListener('click', () => this.actions.cast?.(i));
        } else {
          b.innerHTML = `<span class="slot-key">${i + 1}</span><span class="slot-rune" style="opacity:.25">·</span><span class="slot-name">Empty</span>`;
        }
        this.dom.spellbar.appendChild(b);
        return { btn: b, cd: b.querySelector('.slot-cd') };
      });
    } else {
      // swap icons if loadout changed content but same key impossible; keep
    }
    this.spellSlots.forEach((slot, i) => {
      const sp = slots[i];
      if (!sp) return;
      const cd = this.cds[sp.id] || 0;
      if (slot.cd) slot.cd.style.transform = `scaleY(${clamp(cd, 0, 1)})`;
      slot.btn.classList.toggle('active', this.activeSpell === sp.id);
    });
    // cast orb icon
    const cur = SPELLS.find(x => x.id === s.loadout[this.activeIndex || 0]);
    if (cur) {
      $('cast-orb-icon').textContent = cur.rune;
      $('cast-orb-icon').style.color = CATEGORIES[cur.cat].color;
    }
  }

  setCds(cds) { this.cds = cds; }

  /* ── TOASTS / BANNERS ────────────────────────────────────── */
  toast(title, text, tone = '#e9c988', icon = '✦') {
    const t = el('div', 'toast');
    t.style.setProperty('--tone', tone);
    t.innerHTML = `<span class="t-ico">${icon}</span><span class="t-body"><b>${title}</b><span>${text}</span></span>`;
    this.dom.toasts.appendChild(t);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 320); }, 3800);
    while (this.dom.toasts.children.length > 4) this.dom.toasts.firstChild.remove();
  }

  objective(text) {
    const o = this.dom.objective;
    o.innerHTML = `<b>OBJECTIVE UPDATED</b><span>${text}</span>`;
    o.classList.remove('hidden');
    clearTimeout(this._objT);
    this._objT = setTimeout(() => o.classList.add('hidden'), 3600);
  }

  spellBanner(spell) {
    if (!spell) return;
    const b = this.dom.spellBanner;
    this.dom.bannerName.textContent = spell.name;
    this.dom.bannerRune.textContent = spell.rune;
    this.dom.bannerRune.style.color = CATEGORIES[spell.cat].color;
    b.classList.remove('hidden', 'hide');
    clearTimeout(this._bannerT);
    this._bannerT = setTimeout(() => { b.classList.add('hide'); setTimeout(() => b.classList.add('hidden'), 500); }, 3000);
  }

  levelFlash(level, title) {
    this.dom.lfLevel.textContent = level;
    this.dom.lfTitle.textContent = title;
    const f = this.dom.levelFlash;
    f.classList.remove('hidden');
    const ring = f.querySelector('.lf-ring');
    ring.style.animation = 'none'; void ring.offsetWidth; ring.style.animation = '';
    clearTimeout(this._lfT);
    this._lfT = setTimeout(() => f.classList.add('hidden'), 2400);
  }

  floatText(x, y, text, cls = '') {
    const n = el('div', `dmg-num ${cls}`, text);
    n.style.left = `${x}px`;
    n.style.top = `${y}px`;
    this.dom.damage.appendChild(n);
    setTimeout(() => n.remove(), 950);
  }

  combatLog(text, cls = '') {
    const line = el('div', `log-line ${cls}`, text);
    this.dom.combatLog.prepend(line);
    while (this.dom.combatLog.children.length > 5) this.dom.combatLog.lastChild.remove();
    setTimeout(() => { line.style.opacity = '0'; line.style.transition = 'opacity .6s'; }, 3600);
  }

  setCombat(on) {
    this.dom.combat.classList.toggle('hidden', !on);
    document.body.classList.toggle('combat-on', on);
    this.dom.crosshair.style.display = on ? '' : 'none';
    if (!on) { this.combatHp = null; this.combatMp = null; this.combo = 0; this.dom.comboEl.classList.remove('on'); }
  }

  updateCombat({ hp, mp, enemyName, enemyRank, enemyHp, enemyMax, round, casting, castColor, combo }) {
    this.combatHp = hp; this.combatMp = mp;
    if (enemyName !== undefined) {
      this.dom.enemyName.textContent = enemyName;
      this.dom.enemyRank.textContent = enemyRank || 'DUEL';
    }
    if (enemyHp !== undefined) {
      this.dom.enemyHp.style.width = `${clamp((enemyHp / enemyMax) * 100, 0, 100)}%`;
      this.dom.enemyHpText.textContent = `${Math.max(0, Math.ceil(enemyHp))} / ${enemyMax}`;
    }
    if (round) this.dom.duelRound.textContent = `ROUND ${['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'][round - 1] || round}`;
    this.dom.enemyCast.classList.toggle('on', !!casting);
    if (casting) this.dom.enemyCast.style.setProperty('--cast-col', castColor || 'var(--rose)');
    if (combo !== undefined) {
      this.combo = combo;
      this.dom.comboEl.textContent = `×${combo}`;
      this.dom.comboEl.classList.toggle('on', combo > 1);
    }
    this.updateMeters();
  }

  setInteract(label, icon = 'E') {
    if (!label) { this.dom.interact.classList.add('hidden'); return; }
    this.dom.interact.classList.remove('hidden');
    this.dom.interactText.textContent = label;
    this.dom.interact.querySelector('kbd').textContent = icon;
  }

  playInteract() { this.dom.interact.classList.add('hidden'); }

  /* ── PANEL ───────────────────────────────────────────────── */
  openPanel(name) {
    if (!name) return;
    this.panel = name;
    this.panelTab = name;
    this.dom.overlay.classList.remove('hidden');
    this.dom.modal.classList.add('hidden');
    const meta = PANELS.find(p => p.id === name) || PANELS[0];
    this.dom.kicker.textContent = meta.kicker;
    this.dom.title2.textContent = meta.title;
    this.dom.nav.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.panel === name));
    this.renderPanel();
    this.actions.onPanelOpen?.(name);
  }

  renderPanel() {
    if (!this.panel) return;
    const meta = PANELS.find(p => p.id === this.panel) || PANELS[0];
    this.dom.kicker.textContent = meta.kicker;
    this.dom.title2.textContent = meta.title;
    this.dom.body.innerHTML = renderPanel(this, this.panel);
    this.dom.panelGold.textContent = this.game.s.gold.toLocaleString();
    this.dom.panelRep.textContent = this.game.s.rep;
  }

  closePanel() {
    this.panel = null;
    this.dom.overlay.classList.add('hidden');
    this.actions.onPanelClose?.();
  }

  onAction(act, id, btn) {
    this.audio.ui();
    switch (act) {
      case 'ing-tab': this.craft.tab = id; this.renderPanel(); break;
      case 'select-wood': this.craft.woodId = this.craft.woodId === id ? null : id; this.renderPanel(); break;
      case 'select-core': this.craft.coreId = this.craft.coreId === id ? null : id; this.renderPanel(); break;
      case 'toggle-mat': {
        const slots = BENCH[this.game.s.upgrades.bench].slots;
        if (this.craft.materials.includes(id)) this.craft.materials = this.craft.materials.filter(x => x !== id);
        else if (this.craft.materials.length >= slots) { this.toast('Bench is full', 'Upgrade your workbench for more finishing slots.', '#ff8c9a', '⚒'); this.audio.error(); return; }
        else this.craft.materials.push(id);
        this.renderPanel();
        break;
      }
      case 'remove-mat': this.craft.materials = this.craft.materials.filter(x => x !== id); this.renderPanel(); break;
      case 'craft': this.doPlayerCraft(); break;
      case 'craft-clear': this.craft = { ...this.craft, woodId: null, coreId: null, materials: [] }; this.renderPanel(); break;
      case 'spell-cat': this.spellCat = id; this.renderPanel(); break;
      case 'toggle-loadout': this.toggleLoadout(id); break;
      case 'spell-info': {
        const sp = SPELLS.find(x => x.id === id);
        const track = LESSON_TRACKS.find(t => t.lessons.some(l => l.spell === id));
        const lesson = track?.lessons.find(l => l.spell === id);
        this.toast(sp.name, `Learn it in ${track ? track.name : 'the Academy'}${lesson?.req?.level ? ` (requires level ${lesson.req.level})` : ''}.`, CATEGORIES[sp.cat].color, sp.rune);
        break;
      }
      case 'attend-lesson': this.startLesson(id); break;
      case 'shop-tab': this.shopTab = id; this.renderPanel(); break;
      case 'select-customer': this.shopCustomer = id; this.renderPanel(); break;
      case 'sell-wand': this.doSell(id); break;
      case 'buy-market': {
        const ok = this.game.buyMarket(id);
        if (ok) { this.toast('Purchased', 'Added to your stores.', '#e9c988', '◉'); this.audio.gather(); }
        else this.audio.error();
        this.refresh(); this.renderPanel();
        break;
      }
      case 'buy-upgrade': {
        const ok = this.game.buyUpgrade(id);
        if (ok) this.audio.levelup(); else this.audio.error();
        this.refresh(); this.renderPanel();
        break;
      }
      case 'equip-wand': this.game.equip(id); this.refresh(); this.renderPanel(); break;
      case 'travel': this.actions.travel?.(id); break;
      case 'spell-detail': break;
      case 'start-duel': this.actions.startDuel?.(id); break;
      case 'start-tournament': this.actions.startTournament?.(id); break;
      default: break;
    }
  }

  doPlayerCraft() {
    const d = this.craft;
    if (!d.woodId || !d.coreId) return;
    const res = this.game.craft({ ...d });
    if (!res.ok) { this.toast('The wand resists', res.msg, '#ff8c9a', '⚒'); this.audio.error(); return; }
    this.audio.gather();
    this.craft.materials = [];
    if (!this.game.countItem('woods', d.woodId)) this.craft.woodId = null;
    if (!this.game.countItem('cores', d.coreId)) this.craft.coreId = null;
    this.refresh();
    this.renderPanel();
    this.toast(res.wand.name, `${RARITIES[res.wand.rarity].name} · quality ${res.wand.quality}`, RARITIES[res.wand.rarity].color, '⌁');
    if (res.isNewRecipe) {
      this.showModal(`<div class="modal-kicker">A COMBINATION THE SHOP WILL REMEMBER</div>
        <div class="modal-title">${res.wand.name}</div>
        <div class="modal-sub">${res.wand.recipe?.lore || ''}</div>
        <div class="modal-sep"></div>
        <div style="display:grid;place-items:center">${wandSVG(res.wand, { scale: 0.9 })}</div>
        <div class="wand-trait" style="margin-top:10px"><b>${res.wand.recipe?.trait || res.wand.trait.name}</b>${res.wand.recipe?.traitDesc || res.wand.trait.desc}</div>
        <div class="modal-actions"><button class="btn-gold" onclick="document.getElementById('modal').classList.add('hidden')">A wand for the ledger</button></div>`);
      this.audio.victory();
    }
  }

  toggleLoadout(id) {
    const known = this.game.s.known[id] !== undefined;
    if (!known) return;
    const on = !this.game.s.loadout.includes(id);
    this.game.setLoadout(id, on);
    this.updateSpellbar();
    this.refresh();
    this.renderPanel();
  }

  doSell(wandId) {
    const customer = this.game.s.customers.find(c => c.id === (this.shopCustomer || this.game.s.customers[0]?.id));
    if (!customer) return;
    const res = this.game.sell(wandId, customer.id);
    const info = this.game.getCustomerInfo(customer);
    const wand = this.game.s.wands.find(w => w.id === wandId) || { name: 'the wand' };
    if (res.ok) {
      this.audio.victory();
      this.showModal(`<div class="modal-kicker">A WAND FINDING ITS WIZARD</div>
        <div class="modal-title">◉ ${res.price.toLocaleString()}</div>
        <div class="modal-sub">${esc(customerReaction(res.eval, wand, info))}</div>
        <div class="reward-row">
          <div class="reward"><span>◉</span>${res.price} galleons</div>
          <div class="reward rep"><span>✧</span>+4 reputation</div>
          <div class="reward xp"><span>✦</span>+${Math.round(30 + res.eval.score * 0.9)} XP</div>
        </div>
        <div class="modal-actions"><button class="btn-gold" data-close>Lovely.</button></div>`);
      if (this.shopCustomer) {
        const still = this.game.s.customers.find(c => c.id === this.shopCustomer);
        if (!still) this.shopCustomer = this.game.s.customers[0]?.id || null;
      }
    } else {
      this.audio.error();
      this.showModal(`<div class="modal-kicker">NOT QUITE THE ONE</div>
        <div class="modal-title">${esc(info?.name || 'The customer')} declines</div>
        <div class="modal-sub">${esc(customerReaction(res.eval, wand, info))}</div>
        <div class="modal-actions"><button class="btn-line" data-close>Try another wand</button></div>`);
    }
    this.refresh();
    if (this.panel) this.renderPanel();
  }

  /* ── LESSONS ─────────────────────────────────────────────── */
  startLesson(lessonId) {
    let lesson, track;
    for (const t of LESSON_TRACKS) {
      const l = t.lessons.find(x => x.id === lessonId);
      if (l) { lesson = l; track = t; break; }
    }
    if (!lesson) return;
    const spell = SPELLS.find(s => s.id === lesson.spell);
    this.challenge(lesson, track, spell, () => {
      const learned = this.game.completeLesson(lessonId);
      if (learned) {
        this.audio.levelup();
        this.spellBanner(spell);
        this.refresh();
        if (this.panel) this.renderPanel();
        this.showModal(`<div class="modal-kicker">LESSON COMPLETE</div>
          <div class="modal-title">${spell.name}</div>
          <div class="modal-sub">${esc(spell.desc)}</div>
          <div class="reward-row">
            <div class="reward xp"><span>✦</span>+${lesson.xp} XP</div>
            <div class="reward rep"><span>✧</span>+3 reputation</div>
            <div class="reward"><span>${spell.rune}</span>${CATEGORIES[spell.cat].name} spell learned</div>
          </div>
          <div class="modal-actions"><button class="btn-gold" data-close>Add to the grimoire</button></div>`);
      }
    });
  }

  challenge(lesson, track, spell, onSuccess) {
    if (this.challengeCleanup) this.challengeCleanup();
    const type = lesson.type;
    const color = CATEGORIES[track.cat].color;
    this.modalLocked = true;
    const sequence = shuffle(RUNES).slice(0, type === 'rune' ? (lesson.runes || 4) : 6);
    let hearts = type === 'rune' ? 3 : 6;
    let hits = 0;
    let timeLeft = lesson.time;
    let phase = 'watch';
    let input = [];
    let needle = 8;
    let dir = 1;
    let zone = 34;
    let done = false;
    const totalTime = lesson.time;
    const zoneW = 20;

    const html = `<div class="challenge" id="ch-root">
      <div class="challenge-head"><span>${esc(lesson.name)}</span><span id="ch-timer-label">${Math.ceil(timeLeft)}s</span><span>${esc(track.teacher)}</span></div>
      <div class="challenge-timer"><div id="ch-timer" style="width:100%"></div></div>
      <div class="modal-sub" style="margin-bottom:6px">${type === 'rune' ? 'Watch the rune sequence, then repeat it with your wand. A mistake costs a heart.' : 'Cast when the needle passes through the bright band. Three clean casts will carry the lesson.'}</div>
      ${type === 'rune' ? `<div class="rune-row" id="ch-runes">${sequence.map((r, i) => `<button class="rune-btn" data-rune="${r}" style="--rn:${color}">${r}</button>`).join('')}</div>
        <div class="lesson-steps" id="ch-steps">${sequence.map((_, i) => `<div class="lesson-step"></div>`).join('')}</div>` :
      `<div class="timing-track" id="ch-track" style="--z:${zone}"><div class="zone" style="left:${zone - zoneW / 2}%;width:${zoneW}%"></div><div class="zone best" style="left:${zone - 3}%;width:6%"></div><div class="needle" id="ch-needle" style="left:8%"></div></div>
        <div class="lesson-steps" id="ch-steps"><div class="lesson-step"></div><div class="lesson-step"></div><div class="lesson-step"></div></div>
        <button class="btn-gold" id="ch-cast" style="margin-top:16px">Cast</button>`}
      <div class="challenge-status" id="ch-status">${type === 'rune' ? 'Watching the wand…' : 'Ready — wait for the needle.'}</div>
      <div class="modal-actions"><button class="btn-line" id="ch-leave">Leave the lesson</button></div>
      <div style="margin-top:10px;display:flex;justify-content:center;gap:8px" id="ch-hearts">${'❤'.repeat(hearts)}</div>
    </div>`;
    this.showModal(html, { wide: true, locked: true });
    const root = $('ch-root');
    const status = $('ch-status');
    const timerBar = $('ch-timer');
    const timerLabel = $('ch-timer-label');
    const heartsEl = $('ch-hearts');
    const steps = [...document.querySelectorAll('#ch-steps .lesson-step')];
    const runeBtns = [...document.querySelectorAll('.rune-btn')];

    const updateHearts = () => { heartsEl.textContent = '❤'.repeat(Math.max(0, hearts)) + '·'.repeat(Math.max(0, (type === 'rune' ? 3 : 6) - hearts)); };

    const fail = () => {
      if (done) return;
      done = true;
      cleanup();
      this.modalLocked = false;
      this.audio.error();
      this.showModal(`<div class="modal-kicker">THE LESSON RESISTS</div>
        <div class="modal-title">Not this time</div>
        <div class="modal-sub">${esc(track.teacher)} taps the desk. “Again. The wand doesn't care that you were close.”</div>
        <div class="modal-actions"><button class="btn-gold" id="ch-retry">Try again</button><button class="btn-line" data-close>Leave</button></div>`);
      $('ch-retry').addEventListener('click', () => this.challenge(lesson, track, spell, onSuccess));
    };
    const succeed = () => {
      if (done) return;
      done = true;
      cleanup();
      this.modalLocked = false;
      onSuccess();
    };
    const cleanup = () => {
      clearInterval(loop);
      document.querySelectorAll('.rune-btn').forEach(b => b.classList.remove('flash'));
      this.challengeCleanup = null;
      this.modalLocked = false;
    };
    this.challengeCleanup = cleanup;
    root.querySelector('#ch-leave').addEventListener('click', () => { cleanup(); this.closeModal(); });

    if (type === 'rune') {
      let idx = 0;
      const showNext = () => {
        if (done) return;
        if (idx >= sequence.length) { phase = 'play'; status.textContent = 'Your turn. Repeat the sequence.'; return; }
        const r = sequence[idx];
        const b = runeBtns.find(x => x.dataset.rune === r);
        b?.classList.add('flash');
        this.audio.tone({ freq: 420 + idx * 60, type: 'sine', dur: 0.18, vol: 0.09 });
        setTimeout(() => b?.classList.remove('flash'), 340);
        idx++;
        setTimeout(showNext, 520);
      };
      setTimeout(showNext, 650);
      runeBtns.forEach(b => b.addEventListener('click', () => {
        if (done || phase !== 'play') return;
        const expected = sequence[input.length];
        if (b.dataset.rune === expected) {
          b.classList.add('flash');
          setTimeout(() => b.classList.remove('flash'), 250);
          this.audio.tone({ freq: 520 + input.length * 70, type: 'triangle', dur: 0.2, vol: 0.1 });
          input.push(b.dataset.rune);
          steps[input.length - 1]?.classList.add('done');
          if (input.length >= sequence.length) succeed();
        } else {
          b.classList.add('wrong');
          setTimeout(() => b.classList.remove('wrong'), 320);
          hearts--; updateHearts(); this.audio.error();
          input = [];
          steps.forEach(s => s.classList.remove('done'));
          status.textContent = hearts > 0 ? 'The runes scatter. Start the sequence again.' : 'The lesson slips away.';
          if (hearts <= 0) fail();
        }
      }));
    } else {
      const castBtn = root.querySelector('#ch-cast');
      const needleEl = root.querySelector('#ch-needle');
      const doCast = () => {
        if (done) return;
        const inBest = Math.abs(needle - zone) <= 2.5;
        const inZone = Math.abs(needle - zone) <= zoneW / 2;
        if (inZone) {
          hits++;
          steps[hits - 1]?.classList.add('done');
          this.audio.tone({ freq: 560 + hits * 90, type: 'triangle', dur: 0.25, vol: 0.1 });
          status.textContent = inBest ? 'Perfect. The spell holds.' : 'Clean enough. Again.';
          if (hits >= 3) succeed();
        } else {
          hearts--; updateHearts(); this.audio.error();
          status.textContent = hearts > 0 ? 'The gesture slips. Steady your hand.' : 'The spell fizzles out.';
          if (hearts <= 0) fail();
        }
      };
      castBtn.addEventListener('click', doCast);
      root.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); doCast(); } });
      setTimeout(() => { phase = 'play'; status.textContent = 'Now — cast in the bright band.'; }, 700);
    }

    const loop = setInterval(() => {
      if (done) return;
      timeLeft -= 0.06;
      timerBar.style.width = `${clamp((timeLeft / totalTime) * 100, 0, 100)}%`;
      timerLabel.textContent = `${Math.max(0, Math.ceil(timeLeft))}s`;
      if (timeLeft <= 0) { fail(); return; }
      if (type === 'timing') {
        needle += dir * 1.7;
        if (needle >= 96) { needle = 96; dir = -1; }
        if (needle <= 4) { needle = 4; dir = 1; }
        const n = document.getElementById('ch-needle');
        if (n) n.style.left = (needle - 1) + '%';
      }
    }, 60);
  }

  /* ── DIALOGUE ────────────────────────────────────────────── */
  talk(npcId) {
    const d = DIALOGUE[npcId];
    if (!d) return;
    const lines = d.lines;
    const greet = lines.greet;
    const choices = [];
    if (npcId === 'orin') {
      choices.push({ label: 'Show me the bench', action: () => { this.closeDialogue(); this.openPanel('craft'); } });
      choices.push({ label: 'Tell me about wands', action: () => this.setDialogueText(lines.craft) });
      choices.push({ label: 'Any legendary pairings?', action: () => this.setDialogueText(lines.legendary) });
      choices.push({ label: 'Farewell', action: () => this.closeDialogue() });
    } else if (npcId === 'reed') {
      choices.push({ label: 'Attend a lesson', action: () => { this.closeDialogue(); this.openPanel('spells'); } });
      choices.push({ label: 'How does spellcraft work?', action: () => this.setDialogueText(lines.teach) });
      choices.push({ label: 'Farewell', action: () => this.closeDialogue() });
    } else if (npcId === 'sable') {
      choices.push({ label: 'Enter the ring', action: () => { this.closeDialogue(); this.openPanel('duel'); } });
      choices.push({ label: 'Advice?', action: () => this.setDialogueText(lines.duel) });
      choices.push({ label: 'Farewell', action: () => this.closeDialogue() });
    } else if (npcId === 'keeper') {
      choices.push({ label: 'The Forbidden Arts', action: () => { this.closeDialogue(); this.openPanel('spells'); } });
      choices.push({ label: 'Why keep them?', action: () => this.setDialogueText(lines.forbidden) });
      choices.push({ label: 'Farewell', action: () => this.closeDialogue() });
    } else if (npcId === 'mira') {
      choices.push({ label: 'Tell me about Emberfall', action: () => this.setDialogueText(lines.valley) });
      choices.push({ label: 'What is the Hollow?', action: () => this.setDialogueText(lines.hollow) });
      choices.push({ label: 'Farewell', action: () => this.closeDialogue() });
    } else {
      choices.push({ label: 'Farewell', action: () => this.closeDialogue() });
    }
    this.dom.dialogue.classList.remove('hidden');
    this.dialogueOpen = true;
    this.dom.dlgPortrait.textContent = d.initials;
    this.dom.dlgPortrait.style.color = d.color;
    this.dom.dlgName.textContent = d.name;
    this.dom.dlgText.textContent = greet;
    this.dialogueChoices = choices;
    this.dom.dlgChoices.innerHTML = choices.map((c, i) => `<button class="dlg-choice" data-choice="${i}">${c.label}</button>`).join('') +
      `<button class="dlg-close" aria-label="Close">✕</button>`;
    this.actions.onDialogue?.(true);
  }

  setDialogueText(text) {
    this.dom.dlgText.style.opacity = '0';
    setTimeout(() => { this.dom.dlgText.textContent = text; this.dom.dlgText.style.opacity = '1'; }, 120);
  }

  closeDialogue() {
    this.dom.dialogue.classList.add('hidden');
    this.dialogueOpen = false;
    this.actions.onDialogue?.(false);
  }

  /* ── MODAL ───────────────────────────────────────────────── */
  showModal(html, { wide = false, locked = false } = {}) {
    this.modalOpen = true;
    this.modalLocked = locked;
    this.dom.modal.classList.remove('hidden');
    this.dom.modalCard.classList.toggle('wide', wide);
    this.dom.modalCard.innerHTML = html;
    this.dom.modalCard.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => this.closeModal()));
    this.actions.onModal?.(true);
  }

  closeModal() {
    this.modalOpen = false;
    this.modalLocked = false;
    this.dom.modal.classList.add('hidden');
    this.dom.modalCard.innerHTML = '';
    if (this.challengeCleanup) { this.challengeCleanup(); this.challengeCleanup = null; }
    this.actions.onModal?.(false);
  }

  /* ── MINIMAP ─────────────────────────────────────────────── */
  drawMinimap(world, player, yaw = 0) {
    const ctx = this.minimapCtx;
    if (!ctx || !world) return;
    const W = 320, H = 320, cx = W / 2, cy = H / 2;
    const viewR = 92;
    const scale = (W / 2 - 8) / viewR;
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, W / 2 - 2, 0, Math.PI * 2); ctx.clip();
    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, W / 2);
    bg.addColorStop(0, '#1a2033'); bg.addColorStop(0.7, '#11131f'); bg.addColorStop(1, '#08080f');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    const toMap = (x, z) => ({ x: cx + (x - player.x) * scale, y: cy + (z - player.z) * scale });
    // terrain tint blobs
    for (const zone of ZONES) {
      const p = toMap(zone.x, zone.z);
      const r = zone.r * scale;
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, Math.max(6, r));
      grd.addColorStop(0, zone.color + '33'); grd.addColorStop(1, zone.color + '00');
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(6, r), 0, Math.PI * 2); ctx.fill();
    }
    // nodes
    for (const n of world.nodes) {
      if (!n.active) continue;
      const p = toMap(n.x, n.z);
      if (p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10) continue;
      ctx.fillStyle = n.info.color;
      ctx.globalAlpha = 0.8;
      ctx.beginPath(); ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
    // interactables
    for (const it of world.interactables) {
      const p = toMap(it.x, it.z);
      if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) continue;
      ctx.fillStyle = it.markerColor || '#e9c988';
      ctx.globalAlpha = 0.75;
      ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
    // npcs
    for (const n of world.npcs) {
      const p = toMap(n.x, n.z);
      ctx.fillStyle = '#ffd27a';
      ctx.beginPath(); ctx.arc(p.x, p.y, 3.4, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(255,210,122,.4)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(p.x, p.y, 5.5, 0, Math.PI * 2); ctx.stroke();
    }
    // player arrow
    ctx.save();
    ctx.translate(cx, cy);
    const heading = yaw;
    ctx.rotate(-heading + Math.PI);
    ctx.fillStyle = '#ffe6b0';
    ctx.shadowColor = '#e9c988'; ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.moveTo(0, -9); ctx.lineTo(6.5, 6); ctx.lineTo(0, 2.5); ctx.lineTo(-6.5, 6); ctx.closePath(); ctx.fill();
    ctx.restore();
    // ring grid
    ctx.strokeStyle = 'rgba(233,201,136,.12)'; ctx.lineWidth = 1;
    for (const r of [40, 80, 120]) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke(); }
    ctx.restore();
  }

  zoneFor(x, z) {
    let best = null, bd = Infinity;
    for (const zn of ZONES) {
      const d = Math.hypot(x - zn.x, z - zn.z);
      if (d < zn.r && d < bd) { best = zn; bd = d; }
    }
    return best;
  }

  compass(yaw) {
    const track = this.dom.compass;
    if (!track) return;
    const norm = ((-yaw * 180 / Math.PI) % 360 + 360) % 360;
    track.style.transform = `translateX(${-(norm / 360) * 100}%)`;
  }
}

function esc(s = '') { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
