/* ============================================================
   APEX RUSH — shared UI: cards, packs, modals, toasts, FX
   ============================================================ */
import { CARD_MAP, RARITY } from './data/index.js';
import { exclusiveIdsForPack } from './data/exclusives.js';
import { FINISHES } from './data/core.js';
import { formatNumber, packAvailability } from './data/packs.js';
import { cardArt, flagSVG, rgba } from './art.js';
import { sfx } from './audio.js';
import {
  marketValue, itemMarketValue, priceInfo, gradeMultiplier, gradeLabel, gradeTone,
  GRADING_SERVICES, gradeForecast, marketIndex, topMovers, priceHistory,
} from './pricing.js';

export const fmt = formatNumber;
export const FINISH_ORDER = ['base', 'holo', 'gold', 'championship', 'anniversary', 'signature', 'shadow', 'numbered'];

export function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
export function finishName(finish) { return FINISHES[finish]?.name || 'Standard'; }
export function finishShort(finish) { return FINISHES[finish]?.short || 'BASE'; }
export function serialMax(card) {
  if (card?.supply) return card.supply;
  if (card?.serialMax) return card.serialMax;
  return card?.rarity === 'iconic' ? 25 : card?.rarity === 'legendary' ? 50 : 99;
}
export function serialText(serial, card) {
  if (serial == null) return '';
  return `#${String(serial).padStart(String(serialMax(card)).length, '0')}/${serialMax(card)}`;
}
export function sportClass(sport) { return sport === 'motogp' ? 'motogp' : sport === 'crossover' ? 'crossover' : 'f1'; }
export function sportShort(sport) { return sport === 'motogp' ? 'MotoGP' : sport === 'crossover' ? 'Crossover' : 'Formula 1'; }

export function coinHTML(n) { return `<span class="cur-inline coin">◈ ${fmt(n)}</span>`; }
export function gemHTML(n) { return `<span class="cur-inline gem">◆ ${fmt(n)}</span>`; }
export function rewardHTML(reward = {}) {
  const bits = [];
  if (reward.coins) bits.push(`<span class="cur-inline coin">◈ ${fmt(reward.coins)}</span>`);
  if (reward.gems) bits.push(`<span class="cur-inline gem">◆ ${fmt(reward.gems)}</span>`);
  if (reward.tokens) bits.push(`<span class="cur-inline token">✦ ${fmt(reward.tokens)} Tokens</span>`);
  if (reward.pack) bits.push(`<span class="cur-inline pack">▣ ${packName(reward.pack)}</span>`);
  return bits.join('');
}
export function packName(id) {
  if (id === 'potd') return 'Pack of the Day';
  return { standard: 'Grid Pack', 'f1-standard': 'F1 Booster', 'motogp-standard': 'MotoGP Booster', premium: 'Premium Pack', 'f1-premium': 'F1 Premium', 'motogp-premium': 'MotoGP Premium', gold: 'Gold Pack', 'f1-gold': 'F1 Gold', 'motogp-gold': 'MotoGP Gold', legendary: 'Legendary Pack', championship: 'Championship Pack', limited: 'Limited Edition', iconic: 'Iconic Vault', crossover: 'Crossover Pack', daily: 'Daily Pack' }[id] || id;
}

export function rarityLabel(card) { return RARITY[card.rarity]?.label || 'COMMON'; }

/* ------------------------------------------------------------
   LIVE PRICES + MARKET PULSE
   ------------------------------------------------------------ */
function signedPct(n) {
  const v = Number(n) || 0;
  return `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`;
}
function dirArrow(dir) { return dir === 'up' ? '▲' : dir === 'down' ? '▼' : '•'; }

function priceInnerHTML(value, info) {
  const dir = info.direction || 'flat';
  return `<b>◈ ${fmt(value)}</b><i class="${dir}">${dirArrow(dir)} ${Math.abs(info.change || 0).toFixed(1)}%</i>`;
}

export function livePriceHTML(card, finish = 'base', opts = {}) {
  if (!card) return '';
  const grade = opts.grading?.score || opts.grade || 0;
  const info = priceInfo(card, finish);
  const value = Math.round(info.value * (grade ? gradeMultiplier(grade) : 1));
  return `<span class="live-price ${info.direction}${opts.className ? ' ' + opts.className : ''}" data-live-price data-price-card="${esc(card.id)}" data-price-finish="${esc(finish)}" data-price-grade="${grade || ''}" data-price-val="${value}">${priceInnerHTML(value, info)}</span>`;
}

export function sparklineHTML(values, opts = {}) {
  if (!values?.length) return '';
  const w = opts.width || 118, h = opts.height || 30, pad = 3;
  const min = Math.min(...values), max = Math.max(...values);
  const span = Math.max(1, max - min);
  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1 || 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / span) * (h - pad * 2);
    return [x, y];
  });
  const line = pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const up = values[values.length - 1] >= values[0];
  const color = up ? '#3ee08a' : '#ff6b52';
  const area = `M${pts[0][0].toFixed(1)} ${h - pad} L${line.replaceAll(' ', ' L')} L${pts[pts.length - 1][0].toFixed(1)} ${h - pad} Z`;
  return `<svg class="sparkline ${up ? 'up' : 'down'}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><path d="${area}" fill="${color}" opacity=".12"/><polyline points="${line}" fill="none" stroke="${color}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
}

export function miniPriceSpark(card, finish = 'base') {
  return sparklineHTML(priceHistory(card, finish), {width: 90, height: 24});
}

function marketTickerInner() {
  const idx = marketIndex();
  const movers = topMovers(3);
  return `<div class="mt-index">
      <span class="mt-kicker">APEX 100</span>
      <b data-market-index>${idx.value.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</b>
      <em class="mt-chg ${idx.direction}" data-market-change>${dirArrow(idx.direction)} ${Math.abs(idx.change).toFixed(1)}%</em>
      <i class="mt-mood ${idx.direction}" data-market-mood>${idx.mood}</i>
    </div>
    <div class="mt-movers">
      ${movers.map(m => `<span class="mt-mover" data-open-card="${esc(m.card.id)}"><i>${esc(m.card.name)}</i><b class="${m.change >= 0 ? 'up' : 'down'}">${signedPct(m.change)}</b></span>`).join('')}
    </div>`;
}

export function marketTickerHTML() {
  return `<div class="market-ticker" data-market-ticker>${marketTickerInner()}</div>`;
}

export function refreshLivePrices(root = document) {
  const now = Date.now();
  root.querySelectorAll('[data-live-price]').forEach(el => {
    const card = CARD_MAP[el.dataset.priceCard];
    if (!card) return;
    const finish = el.dataset.priceFinish || 'base';
    const grade = Number(el.dataset.priceGrade) || 0;
    const info = priceInfo(card, finish, now);
    const value = Math.round(info.value * (grade ? gradeMultiplier(grade) : 1));
    const prev = Number(el.dataset.priceVal || value);
    el.dataset.priceVal = value;
    el.classList.remove('up', 'down', 'flat', 'tick-up', 'tick-down');
    el.classList.add(info.direction);
    if (value !== prev) {
      el.classList.add(value > prev ? 'tick-up' : 'tick-down');
      setTimeout(() => el.classList.remove('tick-up', 'tick-down'), 900);
    }
    el.innerHTML = priceInnerHTML(value, info);
  });
  root.querySelectorAll('[data-market-ticker]').forEach(el => { el.innerHTML = marketTickerInner(); });
  root.querySelectorAll('[data-live-listing]').forEach(el => {
    const card = CARD_MAP[el.dataset.priceCard];
    if (!card) return;
    const finish = el.dataset.listingFinish || 'base';
    const grade = Number(el.dataset.listingGrade) || 0;
    const spread = Number(el.dataset.listingSpread) || 1;
    const value = Math.max(20, Math.round(marketValue(card, finish, now) * spread * (grade ? gradeMultiplier(grade) : 1) / 10) * 10);
    el.dataset.liveValue = value;
    el.innerHTML = `◈ ${fmt(value)}`;
  });
}

/* ------------------------------------------------------------
   CARD
   ------------------------------------------------------------ */
export function cardHTML(card, opts = {}) {
  if (!card) return '';
  const finish = opts.finish || 'base';
  const serial = opts.serial ?? null;
  const grading = opts.grading || null;
  const label = card.attrLabels || ['Speed', 'Skill', 'Consistency', 'Racecraft'];
  const values = [card.stats.speed, card.stats.skill, card.stats.consistency, card.stats.racecraft];
  const hotIdx = values.indexOf(Math.max(...values));
  const longName = card.name.length > 15 ? ' long' : '';
  const numberText = card.number != null && card.number !== '' ? `#${card.number}` : card.type === 'moment' ? String(card.year || '') : card.team || '';
  const kicker2 = card.type === 'moment' ? 'ICONIC MOMENT' : card.era;
  const signedFinish = card.autograph || ['signature','signedpack','vault','goldsig','platinum','champsig','dual','oneofone'].includes(finish);
  const signature = signedFinish && card.signature ? `<div class="card-signature${card.autograph ? ' autograph' : ''}">${esc(card.signature)}</div>` : '';
  const serialHTML = serial != null ? `<div class="card-serial${card.supply ? ' capped' : ''}">${esc(serialText(serial, card))}</div>` : '';
  const championship = finish === 'championship' || finish === 'champ' ? `<div class="champ-ribbon">CHAMPION</div>` : '';
  const editionRibbon = card.edition ? `<div class="edition-ribbon">${esc(card.edition)}</div>` : '';
  const countBadge = opts.count > 1 ? `<div class="count-badge">×${opts.count}</div>` : '';
  const newBadge = opts.isNew ? `<div class="new-badge">NEW</div>` : '';
  const locked = opts.locked ? ' unknown' : '';
  const gradeHTML = grading ? `<div class="card-grade" style="--gc:${gradeTone(grading.score)}"><b>${grading.score}</b><span>${esc(gradeLabel(grading.score))}</span></div>` : '';
  return `<div class="card-cell${opts.count > 1 ? ' dupe' : ''}${opts.cellClass ? ' ' + opts.cellClass : ''}" ${opts.cardIdAttr === false ? '' : `data-open-card="${esc(card.id)}"`} ${opts.itemUid ? `data-item="${esc(opts.itemUid)}"` : ''}>
    ${newBadge}${countBadge}
    <div class="card r-${card.rarity} finish-${finish}${locked}${grading ? ' graded' : ''}${opts.cardClass ? ' ' + opts.cardClass : ''}" data-card="${esc(card.id)}" title="${esc(card.name)} · ${esc(finishName(finish))}${grading ? ` · ${grading.company || 'Apex'} ${grading.score} ${gradeLabel(grading.score)}` : ''}">
      <div class="card-art">${cardArt(card, finish)}</div>
      <div class="card-scrim"></div>
      <div class="card-grain"></div>
      <div class="card-foil"></div>
      <div class="card-shine"></div>
      <div class="card-frame"></div>
      ${gradeHTML}${editionRibbon}${serialHTML}${championship}${signature}
      <div class="card-top">
        <div class="ovr"><b>${card.overall}</b><i>OVR</i></div>
        <div class="card-tags">
          <span class="card-tag sport-${card.sport}">${card.sport === 'motogp' ? 'MOTOGP' : card.sport === 'crossover' ? 'CROSSOVER' : 'FORMULA 1'}</span>
          <span class="card-tag era">${esc(card.era)}</span>
        </div>
      </div>
      <div class="card-info">
        <div class="card-kicker"><span class="num">${esc(numberText)}</span><span class="dotsep"></span><span>${esc(kicker2)}</span></div>
        <div class="card-name${longName}">${esc(card.name)}</div>
        <div class="card-role"><span class="flag">${flagSVG(card.country)}</span>${esc(card.typeLabel)} · ${esc(card.country)}</div>
        <div class="card-statline">
          ${values.map((v, i) => `<div class="card-stat${i === hotIdx ? ' hot' : ''}"><i>${esc(label[i])}</i><b>${v}</b></div>`).join('')}
        </div>
        <div class="card-foot">
          <span class="nat">${esc(card.team || card.tagline || '')}</span>
          <span class="entry">${esc(finishShort(finish))}</span>
        </div>
      </div>
    </div>
  </div>`;
}

export function miniCardHTML(card, finish = 'base') {
  return `<div class="mini-card">${cardArt(card, finish)}</div>`;
}

export function slotHTML(card) {
  return `<div class="card-slot" title="Not in your vault">
    <span class="rarity-dot rar-${card.rarity}"></span>
    <span class="qs">?</span>
    <span class="nm">${esc(card.name)}</span>
    <span class="rar">${esc(rarityLabel(card))}</span>
  </div>`;
}

export function cardCellForGroup(group, mode = 'vault') {
  const bestItem = group.items.find(i => i.finish === group.best) || group.items[0];
  return cardHTML(group.card, { finish: group.best, serial: bestItem?.serial, count: group.count, itemUid: bestItem?.uid, isNew: false, locked: mode === 'all' && !group.count });
}

/* ------------------------------------------------------------
   PACK ART
   ------------------------------------------------------------ */
export function packHTML(pack, opts = {}) {
  const a = pack.art || {};
  const style = `--p1:${a.p1 || '#ff2f38'};--p2:${a.p2 || '#3a070b'};--p3:${a.p3 || 'rgba(255,80,80,.6)'}`;
  return `<div class="pack ${a.cls || 'pack-f1'}" style="${style}" role="img" aria-label="${esc(pack.name)} pack">
    <div class="pack-crimp top"></div>
    <div class="pack-crimp bottom"></div>
    <div class="pack-geo"></div>
    <div class="pack-inner">
      <div class="pack-brand"><span>APEX RUSH</span><i class="pr"></i><span>${esc(pack.short || 'GP')}</span></div>
      <div class="pack-sport">${esc(a.kicker || 'MOTORSPORT')}</div>
      <div class="pack-title"><small>COLLECTOR SERIES</small>${esc(a.title || 'APEX')}<br>${esc(a.title2 || 'PACK')}</div>
      <div class="pack-bottom">
        <div class="pack-meta"><b>${esc(a.meta || `${pack.cards} CARDS`)}</b>${esc(a.meta2 || 'PREMIUM PULLS')}</div>
        <div class="pack-emblem">${esc(a.emblem || 'GP')}</div>
      </div>
    </div>
    <div class="pack-shine"></div>
  </div>`;
}

export function packPriceHTML(pack, tokens = 0) {
  if (tokens > 0) return `<span class="token-price">▣ TOKEN<span class="token-count">×${tokens}</span></span>`;
  if (pack.cost === 0) return `<span class="free-price">FREE</span>`;
  const cur = pack.currency === 'gems' ? 'g' : 'c';
  return `<span class="price-${cur}"><span class="c">${pack.currency === 'gems' ? '◆' : '◈'}</span> ${fmt(pack.cost)}</span>`;
}

export function oddsRows(pack) {
  const rows = ['iconic', 'legendary', 'epic', 'rare', 'common'];
  return rows.filter(r => (pack.odds?.[r] || 0) > 0).map(r => {
    const val = pack.odds[r];
    const rar = RARITY[r];
    return `<div class="odds-row" style="--rarity:${rar.color}">
      <span class="lbl"><i class="rarity-dot rar-${r}"></i>${rar.label}</span>
      <span class="progress-track"><i style="width:${Math.min(100, val * 2.5)}%;background:${rar.color}"></i></span>
      <b>${val < 1 ? val.toFixed(1) : Math.round(val)}%</b>
    </div>`;
  }).join('');
}

export function guaranteeList(pack) {
  const bits = [];
  if (pack.guaranteeNew) bits.push(`${pack.guaranteeNew} new card${pack.guaranteeNew > 1 ? 's' : ''} guaranteed`);
  if (pack.protectDupes) bits.push(`${pack.protectDupes} duplicate-protected slots`);
  for (const [rar, n] of Object.entries(pack.guarantees || {})) bits.push(`${n}× ${RARITY[rar]?.label || rar} or better`);
  if (pack.guaranteedFinish) bits.push(`1 ${FINISHES[pack.guaranteedFinish]?.name || pack.guaranteedFinish} guaranteed`);
  if (pack.choice) bits.push(`Choose ${pack.choice.picks || 1} of ${pack.choice.count || 3} ${RARITY[pack.choice.rarity]?.label || 'premium'} cards`);
  if (exclusiveIdsForPack(pack.id).length && pack.exclusiveChance) bits.push(`${Math.round(pack.exclusiveChance * 100)}% chance of a capped exclusive`);
  if (pack.autographs?.guaranteed) bits.push('1 authenticated autograph guaranteed');
  else if (pack.autographs?.chance) bits.push(`${(pack.autographs.chance * 100).toFixed(1)}% authenticated autograph chance`);
  if (pack.finishBoost) bits.push('Boosted premium finish odds');
  if (pack.oncePerDay) bits.push('Once per day');
  if (!bits.length) bits.push('At least one new card');
  return bits;
}

export function packPoolLabel(pack) {
  const f = pack.pool || {};
  if (f.ids) return `${f.ids.length} hand-picked cards`;
  if (f.signatures) return 'Signed drivers and riders only';
  if (f.types) {
    const names = { team:'constructors', car:'F1 cars', bike:'prototypes', driver:'drivers', rider:'riders', moment:'historic moments' };
    return f.types.map(t => names[t] || t).join(' + ') + ' only';
  }
  if (f.eras) return `${f.eras[0]}–${f.eras[f.eras.length - 1]} cards only`;
  if (pack.scope === 'f1') return 'Formula 1 only · every F1 era';
  if (pack.scope === 'motogp') return 'MotoGP only · every GP era';
  if (pack.scope === 'crossover') return 'Both paddocks + Crossover legends';
  return 'Formula 1 × MotoGP · all eras';
}

function countdownText(ts) {
  if (!ts) return '';
  const ms = Math.max(0, ts - Date.now());
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  if (h >= 24) return `${Math.floor(h / 24)}d ${h % 24}h`;
  return `${h}h ${String(m).padStart(2, '0')}m`;
}

export function openPackDetails(pack, opts = {}) {
  const avail = packAvailability(pack);
  const bullets = pack.bullets?.length ? pack.bullets : [pack.desc];
  const guarantees = guaranteeList(pack);
  const odds = oddsRows(pack);
  const price = pack.cost === 0 ? 'FREE' : `${pack.currency === 'gems' ? '◆' : '◈'} ${fmt(pack.cost)}`;
  const timer = avail.available
    ? (avail.endsAt ? `Ends in ${countdownText(avail.endsAt)}` : 'Always available')
    : `Unlocks in ${countdownText(avail.startsAt)}`;
  const flavour = pack.deal ? `<span class="chip red">FLASH · −${pack.discount}%</span>` : '';
  const choice = pack.choice ? `<div class="pd-choice"><b>Choice pack</b><span>${pack.cards} opening cards plus ${pack.choice.count} ${RARITY[pack.choice.rarity]?.label || 'premium'} options. You keep ${pack.choice.picks || 1}.</span></div>` : '';
  const exclusiveCards = exclusiveIdsForPack(pack.id).map(id => CARD_MAP[id]).filter(Boolean);
  const exclusiveHTML = exclusiveCards.length ? `<div class="pd-section"><h4>Exclusive editions in this pack <span>fixed supply</span></h4>
    <div class="pd-exclusives">${exclusiveCards.slice(0, 12).map(card => `<div class="pd-exclusive" style="--ex:${card.editionMeta?.color || card.colors?.[0] || '#ff66d8'}">
      <span class="pdex-edition">${esc(card.edition || 'Exclusive')}</span>
      <b>${esc(card.name)}</b>
      <span class="pdex-supply">${card.supply} copies worldwide · ${esc(card.finish || 'limited')}</span>
    </div>`).join('')}</div>
    ${exclusiveCards.length > 12 ? `<p class="pack-note">+ ${exclusiveCards.length - 12} more exclusive editions available.</p>` : ''}
  </div>` : '';
  const autographHTML = pack.autographs ? `<div class="pd-section pd-autograph-note">
    <h4>Authenticated autograph chance <span>specialist packs only</span></h4>
    <p>One of six illustrated autograph editions can be pulled. Each card carries a unique serial and digital certificate display. These are fictional digital collectibles — signatures are artwork, not real autographs or official authentication.</p>
  </div>` : '';
  openModal(`<div class="pack-detail">
    <div class="pd-art">
      ${packHTML(pack)}
      <div class="pd-price">${price}</div>
      <div class="pd-timer ${avail.available ? '' : 'locked'}">${esc(timer)}</div>
    </div>
    <div class="pd-info">
      <div class="di-kicker">
        <span class="chip">${esc(pack.category === 'event' ? 'Event drop' : pack.category === 'exclusive' ? 'Exclusive edition' : pack.category === 'vault' ? 'Collector Vault' : pack.category === 'special' ? 'Special edition' : pack.category === 'f1' ? 'Formula 1' : pack.category === 'motogp' ? 'MotoGP' : pack.category === 'core' ? 'Core tier' : 'Featured')}</span>
        ${flavour}
        <span class="chip gold">${pack.cards} CARDS</span>
      </div>
      <h2>${esc(pack.name)}</h2>
      <p class="pd-tag">${esc(pack.tagline)}</p>
      <p class="pd-desc">${esc(pack.desc)}</p>
      <div class="pd-section"><h4>Inside this pack</h4>
        <ul class="pd-bullets">${bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
        <div class="pd-pool">Pool · <b>${esc(packPoolLabel(pack))}</b></div>
      </div>
      <div class="pd-section"><h4>Guaranteed before you buy</h4>
        <div class="pd-guarantees">${guarantees.map(g => `<span class="chip">${esc(g)}</span>`).join('')}</div>
        ${choice}
      </div>
      ${exclusiveHTML}
      ${autographHTML}
      <div class="pd-section"><h4>Rarity odds <span>per card</span></h4>
        <div class="pd-odds">${odds}</div>
        <p class="pack-note">Odds are rolled per card. Guarantees are applied afterwards, so a pack can outperform the listed rates.</p>
      </div>
      <div class="pd-actions">
        <button class="btn btn-primary btn-lg" data-open-pack="${esc(pack.id)}" ${avail.available ? '' : 'disabled'}>
          ${avail.available ? `Open for ${price}` : 'Not live right now'}
        </button>
        <button class="btn" data-close-modal>Keep browsing</button>
      </div>
    </div>
  </div>`, { wide: true, onMount: el => {
    if (opts.onOpen) el.querySelector('[data-open-pack]')?.addEventListener('click', opts.onOpen);
  } });
}

export { countdownText };

/* ------------------------------------------------------------
   TOASTS
   ------------------------------------------------------------ */
const toastRoot = () => document.getElementById('toast-root');
export function toast(kind, title, message = '', icon = '●') {
  const root = toastRoot();
  if (!root) return;
  const el = document.createElement('div');
  el.className = `toast ${kind || ''}`;
  el.innerHTML = `<div class="t-ico">${esc(icon)}</div><div class="t-body"><b>${esc(title)}</b>${message ? `<span>${esc(message)}</span>` : ''}</div>`;
  root.appendChild(el);
  while (root.children.length > 4) root.firstElementChild.remove();
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 320); }, 3400);
}

/* ------------------------------------------------------------
   MODALS
   ------------------------------------------------------------ */
let modalEl = null;
let modalCloseHandler = null;
export function openModal(html, opts = {}) {
  closeModal();
  const root = document.getElementById('modal-root');
  if (!root) return null;
  const wrap = document.createElement('div');
  wrap.className = 'modal-backdrop';
  wrap.innerHTML = `<div class="modal${opts.small ? ' small' : ''}${opts.wide ? ' wide' : ''}">
    ${opts.noClose ? '' : `<button class="modal-close" data-close-modal aria-label="Close">✕</button>`}
    ${html}
  </div>`;
  root.appendChild(wrap);
  modalEl = wrap;
  modalCloseHandler = opts.onClose || null;
  wrap.addEventListener('click', ev => {
    if (ev.target === wrap && !opts.persistent) closeModal();
  });
  if (opts.onMount) opts.onMount(wrap);
  return wrap;
}
export function closeModal() {
  if (!modalEl) return;
  const el = modalEl;
  const fn = modalCloseHandler;
  modalEl = null;
  modalCloseHandler = null;
  el.remove();
  if (fn) fn();
}
export function closeTopModal() { closeModal(); }
export function hasModal() { return !!modalEl; }
export function confirmAction({ title, body = '', confirmText = 'Confirm', cancelText = 'Cancel', danger = false, onConfirm }) {
  const wrap = openModal(`<div class="confirm-modal">
    <div class="cm-kicker">${danger ? 'PLEASE CONFIRM' : 'CONFIRM ACTION'}</div>
    <h3>${esc(title)}</h3>
    <p class="cm-sub">${body}</p>
    <div class="confirm-actions">
      <button class="btn" data-close-modal>${esc(cancelText)}</button>
      <button class="btn ${danger ? 'btn-primary' : 'btn-gold'}" data-confirm-yes>${esc(confirmText)}</button>
    </div>
  </div>`, { small: true });
  if (!wrap) return;
  wrap.querySelector('[data-confirm-yes]').addEventListener('click', () => {
    closeModal();
    try { onConfirm && onConfirm(); } catch (err) { console.error(err); toast('red', 'Something went wrong', err.message, '!'); }
  });
}

/* ------------------------------------------------------------
   CARD DETAIL
   ------------------------------------------------------------ */
export function openCardDetail(card, items, opts = {}) {
  if (!card) return;
  const selected = (opts.itemUid && items.find(i => i.uid === opts.itemUid)) || items[0] || null;
  const finish = selected?.finish || opts.finish || 'base';
  const serial = selected?.serial;
  const grading = selected?.grading || null;
  const value = selected ? itemMarketValue(selected) : marketValue(card, 'base');
  const best = items.length ? [...items].sort((a, b) => FINISH_ORDER.indexOf(b.finish) - FINISH_ORDER.indexOf(a.finish))[0] : null;
  const fav = opts.favorite;
  const attrs = card.attrLabels || ['Speed', 'Skill', 'Consistency', 'Racecraft'];
  const stats = [card.stats.speed, card.stats.skill, card.stats.consistency, card.stats.racecraft];
  const finishNote = finish !== 'base' ? `<div class="finish-note"><span class="fn-ico">✦</span><div><b>${esc(finishName(finish))}${serial != null ? ' · ' + esc(serialText(serial, card)) : ''}</b>Premium finish. Collector value ${fmt(value)} coins and a permanent place in your vault.</div></div>` : '';
  const sellTarget = items.length > 1
    ? [...items].sort((a, b) => itemMarketValue(a) - itemMarketValue(b))[0]
    : selected;
  const sellValue = sellTarget ? itemMarketValue(sellTarget) : value;
  const ownedLine = items.length
    ? `<div class="dc-owned"><span>In your vault</span><b>${items.length} ${items.length === 1 ? 'copy' : 'copies'}${best && best.finish !== 'base' ? ' · ' + esc(finishName(best.finish)) : ''}${grading ? ' · slabbed' : ''}</b></div>`
    : `<div class="dc-owned"><span>Not collected yet</span><b>Find it in packs</b></div>`;
  const forecast = gradeForecast(card, finish);
  const subgrid = grading?.subgrades ? `<div class="gp-subs">${Object.entries(grading.subgrades).map(([k, v]) => `<div class="gp-sub"><span>${esc(k)}</span><b>${v.toFixed(1)}</b><i style="width:${v * 10}%"></i></div>`).join('')}</div>` : '';
  const gradePanel = selected ? (grading ? `<div class="grade-panel graded" style="--gc:${gradeTone(grading.score)}">
      <div class="gp-head">
        <div class="gp-score"><b>${grading.score}</b><span>/10</span></div>
        <div class="gp-title"><small>${esc(grading.company || 'APEX')} CERTIFIED · ${esc(grading.cert)}</small><strong>${esc(grading.label)}</strong><em>Graded slab</em></div>
        <div class="gp-value">${livePriceHTML(card, finish, { grading })}</div>
      </div>
      ${subgrid}
      <p class="gp-note">Sealed slab. Grade multiplier ×${gradeMultiplier(grading.score).toFixed(2)} applies to every sale and trade. Grading is permanent.</p>
    </div>` : `<div class="grade-panel">
      <div class="gp-head">
        <div class="gp-title"><small>APEX GRADING LAB</small><strong>Raw card</strong><em>Not graded</em></div>
        <div class="gp-value">${livePriceHTML(card, finish)}</div>
      </div>
      <div class="gp-forecast">
        ${forecast.rows.map(r => `<span><b>${r.score}</b>${esc(r.label)}<em>◈ ${fmt(r.value)}</em></span>`).join('')}
      </div>
      <div class="gp-services">
        ${GRADING_SERVICES.map(svc => `<button class="grade-service" data-grade-item="${esc(selected.uid)}" data-grade-service="${esc(svc.id)}" data-grade-card="${esc(card.id)}">
          <span class="gs-company">${esc(svc.company)} · ${esc(svc.name)}</span>
          <b>${svc.currency === 'gems' ? '◆' : '◈'} ${fmt(svc.cost)}</b>
          <em>${esc(svc.desc)}</em>
        </button>`).join('')}
      </div>
      <p class="gp-note">Grading is permanent. High grades multiply value; low grades can reduce it. Current raw value ◈ ${fmt(forecast.raw)}.</p>
    </div>`) : '';
  const actions = items.length
    ? `${fav ? `<button class="btn btn-sm" data-fav="${esc(card.id)}">★ Favourite</button>` : `<button class="btn btn-sm" data-fav="${esc(card.id)}">☆ Set favourite</button>`}
       <button class="btn btn-sm btn-gold" data-sell-one="${esc(sellTarget.uid)}" data-card-id="${esc(card.id)}">Sell ${items.length > 1 ? 'spare' : 'copy'} · ◈ ${fmt(sellValue)}</button>
       ${items.length > 1 ? `<button class="btn btn-sm" data-sell-dupes-card="${esc(card.id)}">Sell duplicates</button>` : ''}
       <div class="price-tag">Collector value${livePriceHTML(card, finish, { grading })}</div>`
    : `<button class="btn btn-sm btn-primary" data-nav="packs">Open packs</button>
       <div class="price-tag">Market value${livePriceHTML(card, 'base')}</div>`;

  openModal(`<div class="detail-grid">
    <div class="detail-card-col">
      ${cardHTML(card, { finish, serial, itemUid: selected?.uid, cardIdAttr: false, grading })}
      ${ownedLine}
    </div>
    <div class="detail-info">
      <div class="di-kicker">
        <span class="chip ${sportClass(card.sport)}">${esc(sportShort(card.sport))}</span>
        <span class="chip" style="color:${RARITY[card.rarity].color};border-color:${rgba(RARITY[card.rarity].color, .3)}">${esc(rarityLabel(card))}</span>
        <span class="chip">${esc(card.era)}</span>
        <span class="chip">${esc(card.typeLabel)}</span>
        ${grading ? `<span class="chip graded-chip" style="color:${gradeTone(grading.score)};border-color:${rgba(gradeTone(grading.score), .35)}">GRADED ${grading.score}</span>` : ''}
      </div>
      <h2>${esc(card.name)}</h2>
      <div class="di-sub"><span class="flag">${flagSVG(card.country)}</span>${esc(card.team || card.typeLabel)} · ${esc(card.tagline || '')}</div>
      <p class="di-bio">${esc(card.bio)}</p>
      ${finishNote}
      <div class="di-market">
        <div class="dm-main"><span>Live collector value</span>${livePriceHTML(card, finish, { grading, className: 'lg' })}</div>
        <div class="dm-spark">${sparklineHTML(priceHistory(card, finish), { width: 170, height: 38 })}<small>24h market trend</small></div>
        <div class="dm-changes">
          ${[['24h', priceInfo(card, finish).change24], ['7d', priceInfo(card, finish).change7], ['30d', priceInfo(card, finish).change30]].map(([label, chg]) => `<span class="${chg > .15 ? 'up' : chg < -.15 ? 'down' : 'flat'}"><small>${label}</small>${signedPct(chg)}</span>`).join('')}
        </div>
        <div class="dm-signals">${priceInfo(card, finish).indicators.map(i => `<span class="sig ${esc(i.cls)}">${esc(i.label)}</span>`).join('')}</div>
      </div>
      ${gradePanel}
      <div class="attr-list">
        ${attrs.map((a, i) => `<div class="attr"><span class="an">${esc(a)}</span><span class="progress-track"><i style="width:${stats[i]}%"></i></span><span class="av">${stats[i]}</span></div>`).join('')}
      </div>
      <div class="career-grid">
        ${card.career.map(([label, val]) => `<div class="career-box"><div class="cb-l">${esc(label)}</div><div class="cb-v">${esc(val ?? '—')}${label === 'Rating' || label === 'Legacy' ? '<small> OVR</small>' : ''}</div></div>`).join('')}
      </div>
      <div class="detail-tags">
        <span class="chip gold">${esc(card.type === 'moment' ? 'Historic moment' : card.team || 'Motorsport')}</span>
        <span class="chip">${esc(card.years || card.year || '')}</span>
        <span class="chip">${esc(card.country)}</span>
        <span class="chip">${esc(finishName(finish))}</span>
        ${grading ? `<span class="chip" style="color:${gradeTone(grading.score)}">${esc(grading.company || 'APEX')} ${grading.score}</span>` : ''}
      </div>
      <div class="detail-actions">${actions}</div>
    </div>
  </div>`, { wide: true, onMount: el => {
    el.querySelectorAll('[data-nav]').forEach(btn => btn.addEventListener('click', () => closeModal()));
  } });
}

/* ------------------------------------------------------------
   FX CANVAS
   ------------------------------------------------------------ */
let fxCanvas = null;
let fxCtx = null;
let particles = [];
let fxRaf = 0;
export function initFx() {
  fxCanvas = document.getElementById('fx');
  if (!fxCanvas) return;
  fxCtx = fxCanvas.getContext('2d');
  resizeFx();
  window.addEventListener('resize', resizeFx);
  document.addEventListener('pointermove', ev => {
    const card = ev.target.closest?.('.card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    if (!r.width || !r.height) return;
    card.style.setProperty('--mx', `${((ev.clientX - r.left) / r.width * 100).toFixed(1)}%`);
    card.style.setProperty('--my', `${((ev.clientY - r.top) / r.height * 100).toFixed(1)}%`);
  }, {passive: true});
}
function resizeFx() {
  if (!fxCanvas) return;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  fxCanvas.width = Math.floor(innerWidth * dpr);
  fxCanvas.height = Math.floor(innerHeight * dpr);
  fxCanvas.style.width = innerWidth + 'px';
  fxCanvas.style.height = innerHeight + 'px';
  if (fxCtx) fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
export function burst(color = '#ffc247', amount = 80, power = 1) {
  if (!fxCtx) return;
  const cx = innerWidth / 2, cy = innerHeight * 0.46;
  const palette = color === 'iconic'
    ? ['#ff66d8', '#ffe27a', '#65ffc8', '#5ad0ff', '#b17dff']
    : color === 'legendary'
      ? ['#ffc247', '#ffe8a8', '#ff9b30', '#ffffff']
      : [color, '#ffffff', '#ffd166'];
  for (let i = 0; i < amount; i++) {
    const ang = Math.random() * Math.PI * 2;
    const sp = (2.5 + Math.random() * 8) * power;
    particles.push({
      x: cx, y: cy,
      vx: Math.cos(ang) * sp,
      vy: Math.sin(ang) * sp - 2,
      size: 2 + Math.random() * 5,
      life: 1,
      decay: .008 + Math.random() * .012,
      color: palette[Math.floor(Math.random() * palette.length)],
      rot: Math.random() * 6,
      vr: (Math.random() - .5) * .3,
      shape: Math.random() > .55 ? 'line' : 'rect',
    });
  }
  if (!fxRaf) fxRaf = requestAnimationFrame(drawFx);
}
function drawFx() {
  if (!fxCtx) return;
  fxCtx.clearRect(0, 0, innerWidth, innerHeight);
  particles = particles.filter(p => p.life > 0);
  for (const p of particles) {
    p.x += p.vx; p.y += p.vy;
    p.vy += .13; p.vx *= .994; p.vy *= .994;
    p.life -= p.decay;
    p.rot += p.vr;
    fxCtx.save();
    fxCtx.globalAlpha = Math.max(0, p.life);
    fxCtx.fillStyle = p.color;
    fxCtx.translate(p.x, p.y);
    fxCtx.rotate(p.rot);
    if (p.shape === 'line') fxCtx.fillRect(-p.size * 2, -1, p.size * 4, 2);
    else fxCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    fxCtx.restore();
  }
  if (particles.length) fxRaf = requestAnimationFrame(drawFx);
  else { fxRaf = 0; fxCtx.clearRect(0, 0, innerWidth, innerHeight); }
}

/* ------------------------------------------------------------
   MISC UI
   ------------------------------------------------------------ */
export function levelRingHTML(level, pct) {
  return `<div class="level-ring" style="--p:${pct}"><b>${level}</b></div>`;
}
export function statBox(label, value, foot = '', cls = '', spark = '') {
  return `<div class="stat-box ${cls}"><div class="lbl">${esc(label)}</div><div class="val">${value}</div>${foot ? `<div class="foot">${foot}</div>` : ''}${spark}</div>`;
}
export function emptyState(icon, title, text, action = '') {
  return `<div class="empty-state"><div class="big">${icon}</div><h4>${esc(title)}</h4><p>${text}</p>${action}</div>`;
}
export function highlightCard(card, finish = 'base') {
  return card ? cardHTML(card, { finish }) : '';
}
export function bestFinishFor(cardId, items) {
  const list = items.filter(i => i.cardId === cardId);
  if (!list.length) return 'base';
  return [...list].sort((a, b) => FINISH_ORDER.indexOf(b.finish) - FINISH_ORDER.indexOf(a.finish))[0].finish;
}
export function itemFinishHTML(finish) {
  return `<span class="finish-chip finish-${finish}">${esc(finishShort(finish))}</span>`;
}
export function rareBurst(rarity) {
  if (rarity === 'iconic') burst('iconic', 180, 1.6);
  else if (rarity === 'legendary') burst('legendary', 120, 1.25);
  else if (rarity === 'epic') burst('#b25cff', 55, .9);
}
export { sfx };
