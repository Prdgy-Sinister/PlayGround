/* ============================================================
   Relic / merchandise presentation + reveal modals
   ============================================================ */
import { esc, fmt, openModal, closeModal, toast } from './ui.js';
import { sfx } from './audio.js';
import { RELIC_RARITY, CATEGORY_MAP } from './data/relics.js';

const MODEL_ICON = {
  helmet:'⛑', suit:'▤', glove:'◫', boot:'◩', gear:'⚙', wheel:'⊙', wing:'◢',
  tyre:'◎', disc:'◉', gear:'⚙', fairing:'◣', exhaust:'≋', engine:'▦', trophy:'★',
  medal:'◉', sign:'▭', flag:'⚑', photo:'▧', paper:'▤', 'mini-car':'◭',
  'mini-bike':'◈', figure:'♟', garage:'▣', circuit:'⌁', watch:'◷', bag:'▣',
  keyring:'⚿', lanyard:'⌁', glasses:'◐', scarf:'≈', shirt:'◧', hoodie:'◧',
  jacket:'◧', cap:'◠', set:'✦',
};
const modelIcon = model => MODEL_ICON[model] || '◇';

export function relicArtHTML(relic, opts = {}) {
  const colors = relic.colors?.length ? relic.colors : ['#8b95a5', '#161a20'];
  const c1 = colors[0] || '#8b95a5';
  const c2 = colors[1] || '#161a20';
  const rar = RELIC_RARITY[relic.rarity] || RELIC_RARITY.standard;
  const small = opts.small ? ' relic-art-sm' : '';
  const cinematic = opts.cinematic ? ' relic-art-cine' : '';
  const icon = modelIcon(relic.model);
  return `<div class="relic-art${small}${cinematic}" style="--relic-c1:${esc(c1)};--relic-c2:${esc(c2)};--relic-rar:${rar.color};--relic-glow:${rar.glow}" data-relic-art="${esc(relic.model)}">
    <div class="relic-art-grid"></div>
    <div class="relic-spot"></div>
    <div class="relic-stand relic-stand-${esc(opts.stand || (['photo','paper','flag','sign','glass'].includes(relic.model) ? 'wall' : 'plinth'))}"></div>
    <div class="relic-shape shape-${esc(relic.model)}">
      <span class="relic-shine"></span>
      <span class="relic-glyph">${esc(icon)}</span>
      <span class="relic-texture"></span>
    </div>
    <div class="relic-shadow"></div>
    ${relic.signed ? `<span class="relic-sign">✒ ${esc(relic.dualSigned ? 'DUAL SIGNED' : 'SIGNED REPLICA')}</span>` : ''}
    ${relic.supply ? `<span class="relic-serial-tag">LIMITED / ${fmt(relic.supply)}</span>` : ''}
  </div>`;
}

export function relicCardHTML(relic, opts = {}) {
  const rar = RELIC_RARITY[relic.rarity] || RELIC_RARITY.standard;
  const supply = opts.supply;
  const owned = opts.owned || 0;
  const available = !supply?.cap || supply.remaining > 0;
  return `<div class="relic-card ${opts.small ? 'relic-card-sm' : ''} rar-${relic.rarity}" style="--relic-accent:${rar.color};--relic-glow:${rar.glow}">
    <div class="rc-top"><span class="rc-dept">${relic.kind === 'memorabilia' ? 'MEMORABILIA' : 'MERCHANDISE'}</span><span class="rc-rarity">${rar.label}</span></div>
    ${relicArtHTML(relic, {small:opts.small})}
    <div class="rc-body">
      <div class="rc-cat">${esc(CATEGORY_MAP[relic.category]?.label || relic.category)} · ${esc(relic.sport === 'motogp' ? 'MotoGP' : 'Formula 1')}</div>
      <h4>${esc(relic.name)}</h4>
      ${opts.showValue ? `<div class="rc-value">◈ ${fmt(opts.value)} est. value</div>` : ''}
      ${opts.price ? `<div class="rc-value">${relic.kind === 'merchandise' ? '◈ ' + fmt(opts.price || relic.price) : 'Pack exclusive'}</div>` : ''}
      <div class="rc-foot">
        ${relic.supply ? `<span class="supply-chip ${available ? '' : 'sold-out'}">${available ? `${fmt(supply?.remaining ?? relic.supply)} / ${fmt(relic.supply)} left` : 'Fully issued'}</span>` : `<span class="supply-chip open">Open edition</span>`}
        ${owned ? `<span class="owned-chip">${owned} owned</span>` : ''}
      </div>
    </div>
    <button class="rc-open" data-open-relic="${esc(relic.id)}" aria-label="Inspect ${esc(relic.name)}"></button>
  </div>`;
}

export function relicSupplyHTML(relic, supply) {
  if (!relic.supply) return `<div class="relic-supply"><span class="supply-chip open">Open edition · no serial cap</span><p>Every replica in this edition is a digital collectible with no published limit.</p></div>`;
  const pct = supply.cap ? Math.min(100, Math.round(supply.issued / supply.cap * 100)) : 0;
  return `<div class="relic-supply">
    <div class="supply-head"><span>Edition supply</span><b>${fmt(supply.remaining)} of ${fmt(supply.cap)} available</b></div>
    <div class="supply-bar"><i style="width:${pct}%"></i></div>
    <div class="supply-meta"><span>${fmt(supply.issued)} issued</span><span>Globally numbered replica run</span></div>
    ${supply.serials?.length ? `<div class="serial-strip">${supply.serials.slice(0, 12).map(n => `<span>#${String(n).padStart(String(relic.supply).length, '0')}</span>`).join('')}${supply.serials.length > 12 ? `<span>+${supply.serials.length - 12}</span>` : ''}</div>` : ''}
  </div>`;
}

/* Detailed item modal — fictional replica disclosure is always visible. */
export function openRelicDetail({ relic, item = null, supply = null, owned = 0, showBuy = false, showSell = false, showDisplay = false }) {
  const rar = RELIC_RARITY[relic.rarity] || RELIC_RARITY.standard;
  const serial = item?.serial != null ? `#${String(item.serial).padStart(String(relic.supply || 10).length, '0')} / ${fmt(relic.supply)}` : '';
  const cinematic = rar.rank >= 4;
  openModal(`<div class="relic-detail ${cinematic ? 'cinematic-relic' : ''}" style="--relic-accent:${rar.color};--relic-glow:${rar.glow}">
    ${cinematic ? `<div class="cine-bars"><i></i><i></i></div><div class="cine-kicker">${rar.label} PRESENTATION</div>` : ''}
    <button class="modal-x" data-close-modal aria-label="Close">×</button>
    <div class="rd-grid">
      <div class="rd-visual">
        ${relicArtHTML(relic, {cinematic, stand:['photo','paper','flag','sign'].includes(relic.model) ? 'wall' : 'plinth'})}
        <div class="rd-model-note">Procedural 3D-style replica · display stand shown</div>
      </div>
      <div class="rd-copy">
        <div class="eyebrow">${relic.kind === 'memorabilia' ? 'Motorsport Memorabilia' : 'Motorsport Merchandise'} · ${esc(CATEGORY_MAP[relic.category]?.label || relic.category)}</div>
        <h2>${esc(relic.name)}</h2>
        <div class="rd-tags">
          <span class="relic-rarity-tag">${rar.name}</span>
          <span>${esc(relic.sport === 'motogp' ? 'MotoGP' : 'Formula 1')}</span>
          <span>${esc(relic.era)}</span>
          ${relic.driver ? `<span>${esc(relic.driver)}</span>` : ''}
          ${relic.team ? `<span>${esc(relic.team)}</span>` : ''}
        </div>
        ${serial ? `<div class="rd-serial"><span>EDITION NUMBER</span><b>${serial}</b></div>` : ''}
        <p class="rd-significance">${esc(relic.significance)}</p>
        <div class="rd-disclaimer"><b>ℹ Fictional digital replica</b><span>This is a simulated collectible. It is not officially licensed, genuinely race-used, or an authenticated autograph.</span></div>
        ${relicSupplyHTML(relic, supply)}
        <div class="rd-actions">
          ${showBuy ? `<button class="btn btn-primary" data-buy-relic="${esc(relic.id)}">Buy · ◈ ${fmt(relic.price)}</button>` : ''}
          ${showSell && item ? `<button class="btn btn-gold" data-sell-relic="${esc(item.uid)}">Sell · ◈ ${fmt(optsValue(relic))}</button>` : ''}
          ${showDisplay && item ? `<button class="btn" data-display-relic="${esc(item.uid)}">Display in Showroom</button>` : ''}
          <button class="btn" data-close-modal>Close</button>
        </div>
      </div>
    </div>
  </div>`);
}
function optsValue(relic) {
  const rar = RELIC_RARITY[relic.rarity];
  const signed = relic.signed ? (relic.dualSigned ? 2.4 : 1.5) : 1;
  const scarcity = relic.supply ? Math.max(1, Math.min(3, 120 / relic.supply)) : 1;
  return Math.round(rar.value * signed * scarcity * (relic.kind === 'merchandise' ? .85 : 1));
}

/* Cinematic reveal used for memorabilia packs and museum pieces. */
export function openRelicReveal(res, { onClose = null } = {}) {
  const cinematic = res.results.some(r => RELIC_RARITY[r.relic.rarity].rank >= 4);
  const html = `<div class="relic-reveal ${cinematic ? 'reveal-cine' : ''}" data-relic-reveal>
    <div class="reveal-spot"></div>
    <div class="reveal-head">
      <div class="eyebrow">${cinematic ? 'Cinematic walkout' : 'Pack opened'}</div>
      <h2>${esc(res.pack.name)}</h2>
      <p>${res.pack.cards} collectible replica${res.pack.cards === 1 ? '' : 's'} · fictional digital memorabilia</p>
    </div>
    <div class="reveal-cards">
      ${res.results.map((r, i) => `<div class="reveal-card rar-${r.relic.rarity}" style="--rd:${i * 120}ms;--relic-accent:${RELIC_RARITY[r.relic.rarity].color};--relic-glow:${RELIC_RARITY[r.relic.rarity].glow}">
        ${relicArtHTML(r.relic, {small:true, cinematic})}
        <div class="reveal-info">
          <span class="rarity-tag">${RELIC_RARITY[r.relic.rarity].label}</span>
          <b>${esc(r.relic.name)}</b>
          <span>${r.item.serial != null ? `#${String(r.item.serial).padStart(String(r.relic.supply).length, '0')} / ${fmt(r.relic.supply)}` : 'Open edition'}${r.relic.signed ? ' · signed replica' : ''}</span>
          <small>Est. value ◈ ${fmt(r.value)}</small>
        </div>
      </div>`).join('')}
    </div>
    <p class="reveal-foot">All items are fictional digital replicas for display in your showroom — not licensed or authenticated memorabilia.</p>
    <button class="btn btn-primary btn-block" data-close-relic-reveal>Continue</button>
  </div>`;
  openModal(html, {wide:true, noClose:true, persistent:true});
  sfx.fanfare?.();
  const finish = () => { closeModal(); onClose?.(); };
  const btn = document.querySelector('[data-close-relic-reveal]');
  btn?.addEventListener('click', finish);
}

export function openRelicPackDetails(pack, odds) {
  openModal(`<div class="relic-pack-detail">
    <button class="modal-x" data-close-modal>×</button>
    <div class="eyebrow">Published contents</div>
    <h2>${esc(pack.name)}</h2>
    <p>${esc(pack.note || 'Transparent collectible pack with published odds.')}</p>
    <div class="rpd-grid">
      <div><span>Price</span><b>${pack.currency === 'gems' ? '◆ ' : '◈ '}${fmt(pack.cost)}</b></div>
      <div><span>Items</span><b>${pack.cards}</b></div>
      <div><span>Department</span><b>Memorabilia</b></div>
    </div>
    <h4>Per-item tier odds</h4>
    <div class="rpd-odds">${odds.map(o => `<div><span>${esc(RELIC_RARITY[o.rarity].name)}</span><b>${o.pct.toFixed(1)}%</b></div>`).join('')}</div>
    <div class="rd-disclaimer"><b>ℹ Transparent drop</b><span>Every slot rolls these published tiers. Museum Pieces carry fixed, globally numbered runs within this simulation.</span></div>
    <button class="btn btn-primary btn-block" data-open-relic-pack="${esc(pack.id)}">Open pack</button>
  </div>`);
}
