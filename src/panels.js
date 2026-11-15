/* ═══════════════════════════════════════════════════════════
   WANDLORE · PANELS
   Every book in the grimoire, rendered from state.
   ═══════════════════════════════════════════════════════════ */
import {
  WOODS, CORES, MATERIALS, RECIPES, SPELLS, LESSON_TRACKS, QUESTS,
  ACHIEVEMENTS, UPGRADES, MARKET, ENEMIES, TOURNAMENTS, ZONES, CUSTOMERS, CATEGORIES, RARITIES, LORE
} from './data.js';
import { computeWand, wandSVG, saleEvaluation, categoryPower, BENCH, materialById } from './crafting.js';

export const PANELS = [
  { id: 'craft', kicker: "THE WANDMAKER'S BENCH", title: 'Wandcrafting', rune: '⚒', label: 'Craft' },
  { id: 'spells', kicker: 'THE GRIMOIRE', title: 'Spells & Lessons', rune: '✦', label: 'Spells' },
  { id: 'shop', kicker: 'THE SHOP LEDGER', title: 'The Wand Shop', rune: '◉', label: 'Shop' },
  { id: 'journal', kicker: 'THE JOURNAL', title: 'Journal', rune: '❖', label: 'Journal' },
  { id: 'map', kicker: 'THE ATLAS', title: 'The Atlas', rune: '◈', label: 'Atlas' },
  { id: 'character', kicker: 'THE WIZARD', title: 'Character', rune: '☾', label: 'Character' },
  { id: 'duel', kicker: 'THE DUELLING RING', title: 'Duels & Tournaments', rune: '⚔', label: 'Duel' }
];

const q = (n) => Math.round(n);
const esc = (s = '') => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const rarTag = r => `<span class="rar-tag" style="--rar:${RARITIES[r]?.color}">${RARITIES[r]?.name || r}</span>`;
const fmt = n => n >= 10000 ? `${(n / 1000).toFixed(1)}k` : n >= 1000 ? `${(n / 1000).toFixed(2)}k` : String(n);

function statBar(label, value, color) {
  return `<div class="stat"><span>${label}</span><div class="stat-bar"><div style="width:${Math.min(100, value)}%;--sc:${color}"></div></div><b>${value}</b></div>`;
}

function previewWand(ui) {
  const s = ui.game.s;
  const d = ui.craft;
  if (!d.woodId || !d.coreId) return null;
  return computeWand({ woodId: d.woodId, coreId: d.coreId, length: d.length, flexibility: d.flexibility, materials: d.materials, bench: s.upgrades.bench });
}

function wandReadout(wand) {
  if (!wand) return `<div class="wand-placeholder"><span>✦</span>Select a wood and a core to see what wants to be made.</div>`;
  const wood = WOODS.find(w => w.id === wand.woodId);
  const core = CORES.find(c => c.id === wand.coreId);
  return `
    <div class="wand-readout">
      <span class="wand-name">${esc(wand.name)}</span>
      <span class="wand-sub">${esc(wood?.name || '')} · ${esc(core?.name || '')} · ${wand.length}″ · ${wand.flexibility}% flex</span>
    </div>
    <div class="affinity-row">
      ${wand.affinity.slice(0, 3).map(([cat, v]) => `<span class="affinity-chip">${CATEGORIES[cat].rune} ${CATEGORIES[cat].name} +${q(v)}</span>`).join('')}
      ${wand.affinity.filter(([, v]) => v < 0).slice(0, 1).map(([cat, v]) => `<span class="affinity-chip neg">${CATEGORIES[cat].name} ${q(v)}</span>`).join('')}
    </div>
    <div class="stat-grid">
      ${statBar('Potency', wand.stats.pot, '#ff9d6b')}
      ${statBar('Control', wand.stats.ctrl, '#78b4ff')}
      ${statBar('Harmony', wand.stats.harm, '#8ef0b0')}
      ${statBar('Aether', wand.stats.aether, '#c79bff')}
    </div>
    <div class="wand-trait"><b>${esc(wand.trait.name)}</b>${esc(wand.trait.desc)}</div>
    <div class="affinity-row">
      <span class="affinity-chip" style="--gold">${rarTag(wand.rarity)}</span>
      <span class="affinity-chip">Quality ${wand.quality}</span>
      <span class="affinity-chip">Value ◉ ${fmt(wand.value)}</span>
      ${wand.recipe ? `<span class="affinity-chip" style="border-color:#ffc96b">✦ Legendary combination</span>` : ''}
    </div>`;
}

/* ── CRAFT ─────────────────────────────────────────────────── */
export function renderCraft(ui) {
  const s = ui.game.s;
  const d = ui.craft;
  const inv = s.inventory;
  const preview = previewWand(ui);
  const kind = d.tab;
  const items = kind === 'woods' ? WOODS : kind === 'cores' ? CORES : MATERIALS;
  const owned = kind === 'woods' ? inv.woods : kind === 'cores' ? inv.cores : inv.materials;
  const bench = BENCH[s.upgrades.bench];

  const cards = items.map(item => {
    const qty = owned?.[item.id] || 0;
    const selected = kind === 'woods' ? d.woodId === item.id : kind === 'cores' ? d.coreId === item.id : d.materials.includes(item.id);
    const act = kind === 'woods' ? 'select-wood' : kind === 'cores' ? 'select-core' : 'toggle-mat';
    return `<button class="ing-card ${selected ? 'selected' : ''} ${qty ? '' : 'empty'} rar-${item.rarity}" data-act="${act}" data-id="${item.id}" ${qty ? '' : 'disabled'}>
      <span class="ing-orb ${kind === 'woods' ? 'wood' : kind === 'cores' ? 'core' : 'mat'}" style="--swatch:${item.light || item.glow || item.color}"></span>
      <span class="ing-info">
        <span class="ing-name">${esc(item.name)}</span>
        <span class="ing-meta">${kind === 'materials' ? esc(item.desc.slice(0, 30)) + '…' : esc(item.desc.slice(0, 34)) + '…'}</span>
        ${rarTag(item.rarity)}
      </span>
      <span class="ing-qty">×${qty}</span>
    </button>`;
  }).join('');

  const matSlots = Array.from({ length: bench.slots }).map((_, i) => {
    const id = d.materials[i];
    if (id) {
      const m = materialById(id);
      return `<button class="mat-slot filled" data-act="remove-mat" data-id="${id}">${esc(m?.name || id)}<br><span style="opacity:.5">remove</span></button>`;
    }
    return `<div class="mat-slot">Empty slot</div>`;
  }).join('');

  const lockedSlots = s.upgrades.bench < 4 ? `<div class="mat-slot locked">Bench II+</div>` : '';

  return `
  <div class="craft-layout">
    <div class="craft-left">
      <div class="ing-section-head">
        <h3>Materials</h3>
        <small>${WOODS.length + CORES.length + MATERIALS.length} known to the trade</small>
      </div>
      <div class="ing-tabs">
        <button class="ing-tab ${kind === 'woods' ? 'active' : ''}" data-act="ing-tab" data-id="woods">Woods</button>
        <button class="ing-tab ${kind === 'cores' ? 'active' : ''}" data-act="ing-tab" data-id="cores">Cores</button>
        <button class="ing-tab ${kind === 'materials' ? 'active' : ''}" data-act="ing-tab" data-id="materials">Extra materials</button>
      </div>
      <div class="ing-grid">${cards || '<div class="empty-state">Nothing here yet.</div>'}</div>

      <div class="discovery-strip">
        <div class="ing-section-head">
          <h3>Legendary combinations</h3>
          <small>${s.discovered.recipes.length} / ${RECIPES.length} discovered</small>
        </div>
        <div class="discovery-grid">
          ${RECIPES.slice(0, 8).map(r => {
            const found = s.discovered.recipes.includes(r.name);
            return `<div class="disc ${found ? 'found' : ''}"><span>${found ? '✦' : '?'}</span><small>${found ? esc(r.name) : 'Undiscovered'}</small></div>`;
          }).join('')}
        </div>
      </div>
    </div>

    <div class="craft-right">
      <div class="wand-stage ${preview ? 'wand-idle' : ''}">
        <span class="stage-tag">The bench · ${esc(bench.name)}</span>
        ${preview ? `<span class="stage-rarity" style="--rar:${RARITIES[preview.rarity].color}">${RARITIES[preview.rarity].name}</span>` : ''}
        ${preview ? wandSVG(preview) : `<div class="wand-placeholder"><span>⚒</span>Nothing on the bench yet.</div>`}
      </div>

      ${wandReadout(preview)}

      <div class="slider-row">
        <div class="slider-head"><span>Length</span><b>${d.length}″</b></div>
        <input type="range" id="craft-length" min="9" max="15" step="0.5" value="${d.length}" />
      </div>
      <div class="slider-row">
        <div class="slider-head"><span>Flexibility</span><b>${d.flexibility}%</b></div>
        <input type="range" id="craft-flex" min="0" max="100" step="1" value="${d.flexibility}" />
      </div>

      <div class="ing-section-head" style="margin-top:12px"><h3>Finishings</h3><small>${d.materials.length}/${bench.slots} slots</small></div>
      <div class="mat-slots">${matSlots}${lockedSlots}</div>

      <div class="craft-actions">
        <button class="btn-gold" data-act="craft" ${preview ? '' : 'disabled'}>Shape the wand</button>
        <button class="btn-line" data-act="craft-clear">Clear bench</button>
        <div class="craft-hint">Consumes 1 wood, 1 core${d.materials.length ? ', ' + d.materials.length + ' finishing(s)' : ''}.</div>
      </div>
    </div>
  </div>`;
}

export function updateCraftPreview(ui) {
  const preview = previewWand(ui);
  const stage = document.querySelector('.wand-stage');
  if (stage) {
    stage.classList.toggle('wand-idle', !!preview);
    stage.querySelector('svg')?.remove();
    stage.querySelector('.wand-placeholder')?.remove();
    const rar = stage.querySelector('.stage-rarity');
    rar?.remove();
    if (preview) {
      stage.insertAdjacentHTML('beforeend', `<span class="stage-rarity" style="--rar:${RARITIES[preview.rarity].color}">${RARITIES[preview.rarity].name}</span>` + wandSVG(preview));
    } else {
      stage.insertAdjacentHTML('beforeend', `<div class="wand-placeholder"><span>⚒</span>Nothing on the bench yet.</div>`);
    }
  }
  const readout = document.querySelector('.craft-right');
  if (readout) {
    // replace everything from readout block through mat-slots with fresh markup
    const old = readout.querySelector('.wand-readout');
    const anchor = old || readout.querySelector('.wand-placeholder');
    if (anchor) {
      const wrap = document.createElement('div');
      wrap.innerHTML = wandReadout(preview);
      if (old) old.replaceWith(...wrap.childNodes);
    }
  }
  const craftBtn = document.querySelector('[data-act="craft"]');
  if (craftBtn) craftBtn.disabled = !preview;
}

/* ── SPELLS ────────────────────────────────────────────────── */
export function renderSpells(ui) {
  const s = ui.game.s;
  const cat = ui.spellCat;
  const known = s.known;
  const filtered = SPELLS.filter(sp => cat === 'all' || sp.cat === cat);

  const cards = filtered.map(sp => {
    const isKnown = known[sp.id] !== undefined;
    const mastery = known[sp.id] || 0;
    const rank = ui.game.masteryRank(sp.id);
    const equipped = s.loadout.includes(sp.id);
    return `<button class="spell-card ${isKnown ? '' : 'locked'}" data-act="${isKnown ? 'toggle-loadout' : 'spell-info'}" data-id="${sp.id}" style="--sc:${CATEGORIES[sp.cat].color}">
      <span class="sc-icon">${sp.rune}</span>
      <span class="sc-body">
        <span class="sc-name">${esc(sp.name)} ${equipped ? '<span style="color:var(--teal);font-size:7px">◆</span>' : ''}</span>
        <span class="sc-cat">${CATEGORIES[sp.cat].name} · ${isKnown ? rank.name : 'Unknown'}</span>
        <span class="sc-desc">${esc(sp.desc)}</span>
        ${isKnown ? `<span class="sc-mastery"><div style="width:${mastery}%"></div></span>` : ''}
      </span>
      ${isKnown ? '' : `<span class="lock-tag">LOCKED</span>`}
    </button>`;
  }).join('');

  const cats = `<button class="cat-chip ${cat === 'all' ? 'active' : ''}" data-act="spell-cat" data-id="all"><span class="dot" style="--cc:#e9c988"></span>All</button>` +
    Object.values(CATEGORIES).map(c => `<button class="cat-chip ${cat === c.id ? 'active' : ''}" data-act="spell-cat" data-id="${c.id}"><span class="dot" style="--cc:${c.color}"></span>${c.name}</button>`).join('');

  const tracks = LESSON_TRACKS.map(track => {
    const lessons = track.lessons.map(l => {
      const done = !!s.lessons[l.id];
      const locked = !done && l.req && ((l.req.level && s.level < l.req.level) || (l.req.rep && s.rep < l.req.rep));
      const req = l.req ? [l.req.level ? `Lv ${l.req.level}` : '', l.req.rep ? `Rep ${l.req.rep}` : ''].filter(Boolean).join(' · ') : '';
      return `<div class="lesson-item ${done ? 'done' : ''}">
        <span class="lesson-num">${done ? '✓' : ''}</span>
        <span class="li-body">
          <span class="li-name">${esc(l.name)}</span>
          <span class="li-sub">${done ? 'Mastered' : locked ? 'Requires ' + req : esc(l.desc)}</span>
        </span>
        <button data-act="attend-lesson" data-id="${l.id}" ${done || locked ? 'disabled' : ''}>${done ? 'Done' : 'Attend'}</button>
      </div>`;
    }).join('');
    const knownCount = track.lessons.filter(l => s.lessons[l.id]).length;
    return `<div style="margin-bottom:16px">
      <div class="ing-section-head"><h3>${esc(track.name)}</h3><small>${knownCount}/${track.lessons.length}</small></div>
      <p style="font-size:11px;font-style:italic;color:rgba(205,189,158,.5);margin:0 0 4px;line-height:1.4">${esc(track.teacher)} — ${esc(track.desc)}</p>
      ${lessons}
    </div>`;
  }).join('');

  return `
  <div class="spell-layout">
    <div>
      <div class="ing-section-head"><h3>Your grimoire</h3><small>${Object.keys(known).length} of ${SPELLS.length} spells · click a known spell to ready it</small></div>
      <div class="spell-cats">${cats}</div>
      <div class="spell-grid">${cards}</div>
    </div>
    <aside class="lesson-side">
      <h3>Lessons at the Academy</h3>
      <p>Attend a lesson to learn its spell. The old teachers do not hand these out for free — but they do hand them out.</p>
      ${tracks}
    </aside>
  </div>`;
}

/* ── SHOP ──────────────────────────────────────────────────── */
export function renderShop(ui) {
  const s = ui.game.s;
  const tab = ui.shopTab;
  const customers = s.customers.map(c => {
    const info = ui.game.getCustomerInfo(c);
    if (!info) return '';
    const active = ui.shopCustomer === c.id;
    return `<button class="npc-card ${active ? 'active' : ''}" data-act="select-customer" data-id="${c.id}">
      <span class="npc-face" style="--npc:${info.color}">${info.initials}</span>
      <span class="npc-info">
        <span class="npc-name">${esc(info.name)}</span>
        <span class="npc-desc">${esc(info.line)}</span>
        <span class="npc-wants">
          <span class="want-chip" style="color:${CATEGORIES[c.wants.cat].color}">${CATEGORIES[c.wants.cat].rune} ${CATEGORIES[c.wants.cat].name}</span>
          <span class="want-chip">${esc(c.wants.trait)}</span>
        </span>
      </span>
      <span class="npc-budget">◉ ${c.budget[0]}–${c.budget[1]}</span>
    </button>`;
  }).join('');

  const customer = s.customers.find(c => c.id === ui.shopCustomer) || s.customers[0];
  const cinfo = customer ? ui.game.getCustomerInfo(customer) : null;
  const wands = s.wands.map(w => {
    const ev = customer ? saleEvaluation(customer, w, s.upgrades.advert ? 0.1 : 0) : null;
    const equipped = w.id === s.equipped;
    return `<button class="offer-wand ${equipped ? 'equipped' : ''} rar-${w.rarity}" data-act="sell-wand" data-id="${w.id}" ${equipped ? 'disabled' : ''}>
      <span class="ow-icon" style="--rar:${RARITIES[w.rarity].color}">⌁</span>
      <span class="ow-info">
        <span class="ow-name">${esc(w.name)} ${equipped ? '<span style="color:var(--teal);font-size:7px">EQUIPPED</span>' : ''}</span>
        <span class="ow-sub">${RARITIES[w.rarity].name} · Q${w.quality} · ${ev ? ev.mood : ''}${ev?.tagMatch ? ' · perfect match' : ''}</span>
      </span>
      <span class="ow-val">◉ ${ev ? ev.price : w.value}</span>
    </button>`;
  }).join('');

  const upgrades = UPGRADES.map(u => {
    const owned = u.id.startsWith('bench') ? s.upgrades.bench >= u.tier : !!s.upgrades[u.id];
    const available = u.id.startsWith('bench') ? s.upgrades.bench + 1 === u.tier : true;
    return `<div class="upgrade-card ${owned ? 'owned' : ''}">
      <span class="upg-icon">${u.icon}</span>
      <span class="upg-info"><b>${esc(u.name)}</b><small>${esc(u.desc)}</small></span>
      <button class="buy-btn" data-act="buy-upgrade" data-id="${u.id}" ${owned || !available ? 'disabled' : ''}>${owned ? 'Owned' : '◉ ' + fmt(u.cost)}</button>
    </div>`;
  }).join('');

  const market = MARKET.map(m => {
    const item = m.kind === 'wood' ? WOODS.find(w => w.id === m.id) : m.kind === 'core' ? CORES.find(c => c.id === m.id) : MATERIALS.find(x => x.id === m.id);
    if (!item) return '';
    return `<div class="market-item">
      <span class="ing-orb ${m.kind === 'wood' ? 'wood' : m.kind === 'core' ? 'core' : 'mat'}" style="--swatch:${item.light || item.glow || item.color}"></span>
      <b>${esc(item.name)} <span style="opacity:.5">×${m.qty}</span></b>
      <button class="buy-btn" data-act="buy-market" data-id="${m.id}" ${s.gold < m.price ? 'disabled' : ''}>◉ ${fmt(m.price)}</button>
    </div>`;
  }).join('');

  const tabs = `<div class="panel-tabs">
    <button class="panel-tab ${tab === 'customers' ? 'active' : ''}" data-act="shop-tab" data-id="customers">Customers & offers</button>
    <button class="panel-tab ${tab === 'upgrades' ? 'active' : ''}" data-act="shop-tab" data-id="upgrades">Workbench & shop</button>
    <button class="panel-tab ${tab === 'market' ? 'active' : ''}" data-act="shop-tab" data-id="market">Reagents market</button>
  </div>`;

  let right = '';
  if (tab === 'customers') {
    right = `<div class="ing-section-head"><h3>Wands on the shelf</h3><small>${cinfo ? 'Offering to ' + esc(cinfo.name) : 'No customer selected'}</small></div>
      <div class="offer-list">${wands || '<div class="empty-state">No wands to sell.</div>'}</div>
      <p style="font-size:11px;font-style:italic;color:rgba(205,189,158,.45);margin-top:12px;line-height:1.5">
        ${cinfo ? esc(cinfo.line) : ''}<br><span style="opacity:.7">A wand whose magic matches their need will fetch a far better price — and a better mood.</span>
      </p>`;
  } else if (tab === 'upgrades') {
    right = `<div class="ing-section-head"><h3>The workshop</h3><small>Invest in better work</small></div>${upgrades}`;
  } else {
    right = `<div class="ing-section-head"><h3>The market</h3><small>Rare stock, bought honestly (mostly)</small></div>
      <div class="market-grid">${market}</div>`;
  }

  return `<div class="shop-layout">
    <div>
      <div class="ing-section-head"><h3>In the shop today</h3><small>${s.customers.length} customers</small></div>
      ${customers}
      <div style="margin-top:14px;padding:12px;border:1px solid var(--line-soft);background:rgba(233,201,136,.03)">
        <div class="ing-section-head"><h3>Sales ledger</h3><small>${s.stats.wandsSold} wands sold</small></div>
        <div style="font-size:11.5px;font-style:italic;color:rgba(205,189,158,.6);line-height:1.6">
          Reputation ${s.rep} · ${s.upgrades.advert ? 'Lantern sign lit (+25% budgets)' : 'No signboard yet'}<br>
          ${s.upgrades.shelf ? 'Display shelf draws wanderers (+35 ◉ per duel)' : 'A bare shelf draws no one'}
        </div>
      </div>
    </div>
    <div>${tabs}${right}</div>
  </div>`;
}

/* ── JOURNAL ───────────────────────────────────────────────── */
export function renderJournal(ui) {
  const s = ui.game.s;
  const quests = QUESTS.map(quest => {
    const st = s.quests[quest.id] || { progress: 0, done: false };
    const active = ui.game.activeQuest()?.id === quest.id;
    const pct = Math.min(100, (st.progress / quest.target) * 100);
    return `<div class="quest-card ${active ? 'active' : ''} ${st.done ? 'done' : ''}">
      <span class="quest-rune">${st.done ? '✓' : quest.type === 'duel' || quest.type === 'enemy' ? '⚔' : '❖'}</span>
      <div class="quest-body">
        <div class="quest-name">${esc(quest.name)}</div>
        <div class="quest-desc">${esc(quest.desc)}</div>
        <div class="quest-obj ${st.done ? 'done' : ''}">${esc(quest.objective)} ${st.done ? '' : `(${st.progress}/${quest.target})`}
          <span class="quest-reward">◉ ${quest.rewards.gold} · ✧ ${quest.rewards.rep} · ✦ ${quest.rewards.xp}</span>
        </div>
        <div class="quest-progress"><div style="width:${pct}%"></div></div>
      </div>
    </div>`;
  }).join('');

  const achv = ACHIEVEMENTS.map(a => `<div class="achv ${s.achievements.includes(a.id) ? 'unlocked' : ''}">
    <span>${a.icon}</span><div><b>${esc(a.name)}</b><small>${esc(a.desc)}</small></div>
  </div>`).join('');

  const stats = s.stats;
  const lore = LORE[Math.floor(Date.now() / 20000) % LORE.length];

  return `
  <div class="quest-list" style="margin-bottom:18px">${quests}</div>
  <div class="ing-section-head"><h3>Field notes</h3><small>Collected along the way</small></div>
  <div class="achievement-grid" style="margin-bottom:16px">${achv}</div>
  <div class="ing-section-head"><h3>The ledger</h3><small>Everything the shop remembers</small></div>
  <div class="char-stats" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px">
    <div class="char-stat"><span>Wands crafted</span><b>${stats.wandsCrafted}</b></div>
    <div class="char-stat"><span>Wands sold</span><b>${stats.wandsSold}</b></div>
    <div class="char-stat"><span>Duels won</span><b>${stats.duelsWon}</b></div>
    <div class="char-stat"><span>Duels lost</span><b>${stats.duelsLost}</b></div>
    <div class="char-stat"><span>Tournaments</span><b>${stats.tournaments}</b></div>
    <div class="char-stat"><span>Ingredients</span><b>${stats.ingredients}</b></div>
    <div class="char-stat"><span>Spells cast</span><b>${stats.spellsCast || 0}</b></div>
    <div class="char-stat"><span>Galleons earned</span><b>${fmt(stats.goldEarned || 0)}</b></div>
  </div>
  <div class="wand-trait"><b>A page from the shop diary</b>${esc(lore)}</div>
  <div class="affinity-row">${s.badges.map(b => `<span class="affinity-chip">♛ ${esc(b)}</span>`).join('')}</div>`;
}

/* ── ATLAS ─────────────────────────────────────────────────── */
export function renderAtlas(ui) {
  const s = ui.game.s;
  const project = (x, z) => ({ px: 260 + x * 1.55, py: 210 - z * 1.35 });
  const here = ui.playerZone || 'village';
  const paths = [
    [[0, 42], [-34, 18], [-62, -26]], [[0, 42], [30, 18], [50, -22]],
    [[0, 42], [36, 60], [46, 68]], [[0, 42], [-44, 64], [-62, 74]],
    [[0, 42], [58, 52], [100, 65]], [[100, 65], [110, 5], [112, -80]], [[0, 42], [0, -108]]
  ];
  const svg = `<svg viewBox="0 0 520 420" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="atlasGlow"><stop offset="0" stop-color="#2a3350"/><stop offset="1" stop-color="#0a0a16"/></radialGradient>
      <pattern id="atlasGrid" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M 26 0 L 0 0 0 26" fill="none" stroke="rgba(233,201,136,.06)" stroke-width="1"/></pattern>
    </defs>
    <rect width="520" height="420" fill="url(#atlasGlow)"/>
    <rect width="520" height="420" fill="url(#atlasGrid)"/>
    <ellipse cx="300" cy="320" rx="120" ry="92" fill="rgba(30,80,90,.18)"/>
    ${paths.map(p => `<path d="M ${p.map(([x, z]) => { const { px, py } = project(x, z); return `${px} ${py}`; }).join(' L ')}" fill="none" stroke="rgba(233,201,136,.22)" stroke-width="2" stroke-dasharray="3 5"/>`).join('')}
    ${ZONES.map(z => {
      const { px, py } = project(z.x, z.z);
      const discovered = s.discoveredZones.includes(z.id);
      const locked = s.rep < z.req;
      const isHere = here === z.id;
      return `<g opacity="${discovered ? (locked ? .55 : 1) : .3}">
        <circle cx="${px}" cy="${py}" r="${isHere ? 15 : 11}" fill="${locked ? '#1b1826' : z.color}" opacity=".13"/>
        <circle cx="${px}" cy="${py}" r="${isHere ? 7 : 4.5}" fill="${locked ? '#3a3547' : z.color}"/>
        ${isHere ? `<circle cx="${px}" cy="${py}" r="15" fill="none" stroke="${z.color}" stroke-width="1" stroke-dasharray="2 4"/>` : ''}
        <text x="${px}" y="${py - 14}" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="${z.color}">${z.rune}</text>
        <text x="${px}" y="${py + 24}" text-anchor="middle" font-family="Georgia, serif" font-size="10" letter-spacing="1.2" fill="${discovered ? 'rgba(241,228,200,.78)' : 'rgba(241,228,200,.3)'}">${z.name.toUpperCase()}</text>
      </g>`;
    }).join('')}
    <text x="260" y="402" text-anchor="middle" font-family="Georgia, serif" font-size="9" letter-spacing="3" fill="rgba(233,201,136,.32)">THE VALE OF EMBERFALL · ${s.rep} REPUTATION</text>
  </svg>`;

  const zones = ZONES.map(z => {
    const locked = s.rep < z.req;
    const discovered = s.discoveredZones.includes(z.id);
    return `<div class="zone-card ${locked ? 'locked' : ''} ${here === z.id ? 'here' : ''}">
      <span class="zone-rune" style="color:${z.color}">${z.rune}</span>
      <span class="zone-info">
        <span class="zone-name">${esc(z.name)}</span>
        <span class="zone-sub">${esc(z.sub)}${locked ? ` · needs ${z.req} reputation` : ''}</span>
      </span>
      <button class="zone-travel" data-act="travel" data-id="${z.id}" ${locked || here === z.id || !discovered ? 'disabled' : ''}>${here === z.id ? 'Here' : locked ? 'Sealed' : 'Travel'}</button>
    </div>`;
  }).join('');

  const disc = ui.game.discoveredWandStats();
  return `<div class="atlas-layout">
    <div class="atlas-map">${svg}</div>
    <div class="atlas-side">
      ${zones}
      <div class="ing-section-head" style="margin-top:10px"><h3>Field discoveries</h3></div>
      <div class="char-stats" style="grid-template-columns:1fr 1fr">
        <div class="char-stat"><span>Woods</span><b>${disc.woods}/${disc.woodsTotal}</b></div>
        <div class="char-stat"><span>Cores</span><b>${disc.cores}/${disc.coresTotal}</b></div>
        <div class="char-stat"><span>Combinations</span><b>${disc.recipes}/${disc.recipesTotal}</b></div>
        <div class="char-stat"><span>Spells</span><b>${disc.spells}/${disc.spellsTotal}</b></div>
      </div>
    </div>
  </div>`;
}

/* ── CHARACTER ─────────────────────────────────────────────── */
export function renderCharacter(ui) {
  const s = ui.game.s;
  const wand = ui.game.wand;
  const wood = WOODS.find(w => w.id === wand.woodId);
  const core = CORES.find(c => c.id === wand.coreId);
  const xpMax = ui.game.xpToNext();
  const initials = s.name.split(' ').map(x => x[0]).slice(0, 2).join('').toUpperCase();
  return `<div class="char-layout">
    <div class="char-hero">
      <div class="char-sigil">${initials}</div>
      <h3>${esc(s.name)}</h3>
      <div class="char-title">${esc(ui.game.displayTitle())} · Level ${s.level}</div>
      <div class="char-levelbar"><div style="width:${(s.xp / xpMax) * 100}%"></div></div>
      <div style="font-family:var(--display);font-size:7px;letter-spacing:.14em;color:rgba(233,201,136,.55)">${s.xp} / ${xpMax} XP</div>
      <div class="char-stats">
        <div class="char-stat"><span>Health</span><b>${ui.game.maxHp()}</b></div>
        <div class="char-stat"><span>Mana</span><b>${ui.game.maxMp()}</b></div>
        <div class="char-stat"><span>Reputation</span><b>${s.rep}</b></div>
        <div class="char-stat"><span>Galleons</span><b>${fmt(s.gold)}</b></div>
      </div>
      <div style="margin-top:14px" class="affinity-row">${s.badges.map(b => `<span class="affinity-chip">♛ ${esc(b)}</span>`).join('') || '<span class="affinity-chip" style="opacity:.5">No titles yet</span>'}</div>
    </div>
    <div>
      <div class="ing-section-head"><h3>Equipped wand</h3><small>${WANDS_COUNT(s)} wands in the collection</small></div>
      <div class="equipped-wand">
        <span class="ew-art">${wandSVG(wand, { scale: 0.7 })}</span>
        <div>
          <h4>${esc(wand.name)}</h4>
          <p>${esc(wood?.name || '')} · ${esc(core?.name || '')} · ${wand.length}″ · ${RARITIES[wand.rarity].name}</p>
          <div class="affinity-row" style="margin:6px 0 0">
            <span class="affinity-chip">P ${wand.stats.pot}</span>
            <span class="affinity-chip">C ${wand.stats.ctrl}</span>
            <span class="affinity-chip">H ${wand.stats.harm}</span>
            <span class="affinity-chip">A ${wand.stats.aether}</span>
          </div>
        </div>
      </div>
      <div class="wand-trait"><b>${esc(wand.trait.name)}</b>${esc(wand.trait.desc)}</div>
      <div class="ing-section-head"><h3>Collection</h3><small>Click to equip</small></div>
      <div class="offer-list" style="max-height:270px">
        ${s.wands.map(w => `<button class="offer-wand ${w.id === s.equipped ? 'equipped' : ''}" data-act="equip-wand" data-id="${w.id}">
          <span class="ow-icon" style="--rar:${RARITIES[w.rarity].color}">⌁</span>
          <span class="ow-info"><span class="ow-name">${esc(w.name)}</span><span class="ow-sub">${RARITIES[w.rarity].name} · Q${w.quality} · ${esc(w.trait.name)}</span></span>
          <span class="ow-val">${w.id === s.equipped ? 'WIELDING' : 'Equip'}</span>
        </button>`).join('')}
      </div>
    </div>
  </div>`;
}
const WANDS_COUNT = s => s.wands.length;

/* ── DUELS ─────────────────────────────────────────────────── */
export function renderDuelPanel(ui) {
  const s = ui.game.s;
  const cards = ENEMIES.map(e => {
    const locked = s.rep < e.reqRep;
    const wins = s.defeated[e.id] || 0;
    return `<div class="quest-card ${locked ? 'done' : ''}">
      <span class="quest-rune" style="color:${e.accent}">${e.boss ? '☾' : '⚔'}</span>
      <div class="quest-body">
        <div class="quest-name">${esc(e.name)} <span style="color:var(--gold-dim);font-size:8px">· ${e.title}</span> ${wins ? `<span style="color:var(--teal);font-size:8px">×${wins}</span>` : ''}</div>
        <div class="quest-desc">${esc(e.desc)}</div>
        <div class="quest-obj">Level ${e.level} · ${e.hp} HP · ${e.dmg ? e.dmg + ' ATK' : 'harmless'}
          <span class="quest-reward">◉ ${e.rewards.gold} · ✧ ${e.rewards.rep} · ✦ ${e.rewards.xp}</span>
        </div>
      </div>
      <button class="buy-btn" data-act="start-duel" data-id="${e.id}" ${locked ? 'disabled' : ''}>${locked ? '◈ ' + e.reqRep + ' rep' : e.boss ? 'Challenge' : 'Duel'}</button>
    </div>`;
  }).join('');

  const tours = TOURNAMENTS.map(t => {
    const locked = s.rep < t.reqRep;
    return `<div class="upgrade-card ${locked ? 'owned' : ''}">
      <span class="upg-icon">♛</span>
      <span class="upg-info"><b>${esc(t.name)}</b><small>${esc(t.desc)} · ${t.rounds.length} rounds · ${t.reqRep} reputation required</small></span>
      <button class="buy-btn" data-act="start-tournament" data-id="${t.id}" ${locked ? 'disabled' : ''}>${locked ? 'Sealed' : 'Enter'}</button>
    </div>`;
  }).join('');

  return `<div style="display:grid;grid-template-columns:1fr 320px;gap:22px">
    <div>
      <div class="ing-section-head"><h3>The duelling slate</h3><small>${s.stats.duelsWon} wins · ${s.stats.duelsLost} losses</small></div>
      <div class="quest-list">${cards}</div>
    </div>
    <aside>
      <div class="ing-section-head"><h3>Tournaments</h3><small>Rankings & rewards</small></div>
      ${tours}
      <div class="wand-trait" style="margin-top:14px"><b>Duel Captain Sable</b>“Shield early, dodge late, and never cast the same spell twice in a row. They will notice.”</div>
      <div style="font-size:11px;font-style:italic;color:rgba(205,189,158,.5);line-height:1.7;margin-top:10px">
        Controls in the ring:<br>
        <b style="color:var(--gold-dim)">WASD</b> move · <b style="color:var(--gold-dim)">Space</b> dodge<br>
        <b style="color:var(--gold-dim)">1–6</b> cast · <b style="color:var(--gold-dim)">Right mouse</b> shield<br>
        <b style="color:var(--gold-dim)">Left mouse</b> current spell
      </div>
    </aside>
  </div>`;
}

export function renderPanel(ui, name) {
  switch (name) {
    case 'craft': return renderCraft(ui);
    case 'spells': return renderSpells(ui);
    case 'shop': return renderShop(ui);
    case 'journal': return renderJournal(ui);
    case 'map': return renderAtlas(ui);
    case 'character': return renderCharacter(ui);
    case 'duel': return renderDuelPanel(ui);
    default: return '<div class="empty-state">Nothing here.</div>';
  }
}
