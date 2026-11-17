/* ============================================================
   APEX RUSH — cinematic pack opening
   ============================================================ */
import { openPack, potdPurchasesLeft, choosePackCard } from './store.js';
import { RARITY, cardValue } from './data/index.js';
import { getPackOfTheDay, packAvailability } from './data/packs.js';
import {
  cardHTML, packHTML, esc, fmt, finishName, finishShort, serialText, toast,
  rareBurst, sfx, guaranteeList,
} from './ui.js';

let op = null;

export function showOpening(result, opts = {}) {
  closeOpening(false);
  const pack = result.pack;
  const root = document.getElementById('screen-root');
  if (!root) return;
  const el = document.createElement('div');
  const theme = pack.theme || (pack.category === 'motogp' ? 'motogp' : pack.category === 'event' ? 'event' : 'grid');
  el.className = `opening theme-${theme}${pack.category === 'event' ? ' op-event' : ''}${pack.choice ? ' op-choice' : ''}`;
  el.style.setProperty('--op1', pack.art?.p1 || '#ff2f38');
  el.style.setProperty('--op2', pack.art?.p2 || '#080a0f');
  el.style.setProperty('--op3', pack.art?.p3 || 'rgba(255,80,80,.5)');
  el.innerHTML = `<div class="op-head">
    <div class="op-brandline"><b>APEX RUSH</b><span>${esc(pack.name)}</span></div>
    <div class="op-progress-dots" data-op-dots>${result.results.map((_, i) => `<span class="op-dot${i === 0 ? ' now' : ''}" data-dot="${i}"></span>`).join('')}</div>
    <button class="op-skip" data-op-skip>Skip <span>→</span></button>
  </div>
  <div class="op-stage" data-op-stage></div>`;
  root.appendChild(el);
  document.body.classList.add('no-scroll');
  op = {
    el, result, idx: 0, phase: 'pack', timers: [], onClose: opts.onClose || null,
    walked: new Set(), advanceHandler: null,
  };
  renderPackStage();
  bind();
}

function renderPackStage() {
  const { pack } = op.result;
  const avail = packAvailability(pack);
  const specs = (pack.bullets || guaranteeList(pack)).slice(0, 3);
  const stage = op.el.querySelector('[data-op-stage]');
  stage.innerHTML = `<div class="op-pack-wrap">
    ${avail.endsAt ? `<div class="op-event-ribbon"><i></i>${esc(avail.label)} · ${esc(pack.name)}</div>` : ''}
    <div class="op-pack-glow" style="--p3:${pack.art?.p3 || 'rgba(255,80,80,.5)'}"></div>
    <div class="op-pack-aura"></div>
    ${packHTML(pack)}
    <div class="op-tear-hint"><b>Tap to tear</b><span>${pack.cards} cards sealed inside · ${pack.guaranteeNew ? `${pack.guaranteeNew} new guaranteed` : esc(guaranteeList(pack)[0])}</span><div class="chev">↓</div></div>
    <div class="op-pack-nameplate"><b>${esc(pack.name)}</b><span>·</span>${pack.cards} cards<span>·</span>${esc(pack.currency === 'gems' ? `◆ ${fmt(pack.cost)}` : pack.cost === 0 ? 'FREE' : `◈ ${fmt(pack.cost)}`)}</div>
    <div class="op-pack-specs">${specs.map(s => `<span>${esc(s)}</span>`).join('')}</div>
  </div>
  <div class="tear-flash"></div><div class="tear-line"></div>`;
  const go = () => tear();
  stage.querySelectorAll('[data-op-pack-trigger], .pack, .op-tear-hint').forEach(node => {
    node.addEventListener('click', ev => { ev.preventDefault(); go(); });
  });
  stage.querySelector('.pack')?.setAttribute('data-op-pack-trigger', '');
  stage.querySelector('.op-tear-hint')?.setAttribute('data-op-pack-trigger', '');
}

function tear() {
  if (!op || op.phase !== 'pack') return;
  op.phase = 'tear';
  op.el.classList.add('tearing');
  sfx.rip();
  sfx.tear();
  later(() => {
    op.phase = 'reveal';
    op.idx = 0;
    reveal();
  }, 760);
}

function reveal() {
  if (!op) return;
  const { results } = op.result;
  if (op.idx >= results.length) return finishReveal();
  const r = results[op.idx];
  const rank = RARITY[r.card.rarity].rank;
  const wantsWalkout = (rank >= 3 && !op.walked.has('legendary')) || rank >= 4;
  if (wantsWalkout) {
    op.walked.add(rank >= 4 ? 'iconic' : 'legendary');
    walkout(r, () => drawReveal(r));
  } else {
    drawReveal(r);
  }
}

function walkout(r, done) {
  const iconic = r.card.rarity === 'iconic';
  const stage = op.el.querySelector('[data-op-stage]');
  op.phase = 'walkout';
  stage.innerHTML = `<div class="walkout ${iconic ? 'iconic' : ''}">
    <div class="wo-flash"></div><div class="wo-lines"></div><div class="wo-shake"></div>
    <div class="wo-speedlines"></div>
    <div class="wo-center">
      <div class="wo-kicker">${iconic ? 'ICONIC CARD INCOMING' : 'LEGENDARY CARD INCOMING'}</div>
      <div class="wo-big">${iconic ? 'ICONIC' : 'LEGEND'}</div>
      <div class="wo-sub">${esc(r.card.name)} · ${esc(finishName(r.finish))}</div>
    </div>
    <div class="wo-silhouette" aria-hidden="true">${iconic ? '◆' : '★'}</div>
  </div>`;
  sfx.walkout(r.card.rarity);
  if (iconic) rareBurst('iconic');
  else rareBurst('legendary');
  const cont = () => {
    if (!op || op.phase !== 'walkout') return;
    clearTimers();
    done();
  };
  stage.querySelector('.walkout').addEventListener('click', cont);
  later(cont, iconic ? 2500 : 2100);
}

function drawReveal(r) {
  if (!op) return;
  op.phase = 'reveal';
  const { results } = op.result;
  const rar = RARITY[r.card.rarity];
  const last = op.idx === results.length - 1;
  const stage = op.el.querySelector('[data-op-stage]');
  stage.innerHTML = `<div class="reveal-wrap ${r.card.rarity}">
    <div class="reveal-glow" style="--glow:${rar.glow}"></div>
    <div class="reveal-rays ${r.card.rarity === 'iconic' ? 'spin' : ''}"></div>
    <div class="reveal-tagline" style="--tagc:${rar.color}"><span class="ln"></span>${esc(rar.label)}${r.finish !== 'base' ? ' · ' + esc(finishShort(r.finish)) : ''}<span class="ln"></span></div>
    <div class="reveal-card-holder">${cardHTML(r.card, { finish: r.finish, serial: r.serial, isNew: r.isNew, cardIdAttr: false })}</div>
    <div class="reveal-meta">
      <b>${esc(r.card.name)}</b>
      <span>${esc(r.card.sport === 'motogp' ? 'MotoGP' : r.card.sport === 'crossover' ? 'Crossover' : 'Formula 1')} · ${esc(r.card.typeLabel)} · ${esc(finishName(r.finish))}${r.finish === 'numbered' && r.serial != null ? ' · ' + esc(serialText(r.serial, r.card)) : ''}</span>
      ${r.isNew ? `<span class="new-pill">NEW TO VAULT</span>` : `<span class="dupe-pill">DUPLICATE · ◈ ${fmt(r.value ?? cardValue(r.card, r.finish))}</span>`}
    </div>
    <div class="reveal-actions">
      <button class="btn btn-primary" data-op-next>${last ? 'See all results' : 'Next card'} <span>→</span></button>
      <span class="reveal-counter"><b>${op.idx + 1}</b> / ${results.length}</span>
    </div>
  </div>`;
  updateDots();
  sfx.reveal(r.card.rarity);
  if (r.card.rarity === 'legendary' || r.card.rarity === 'iconic') rareBurst(r.card.rarity);
  stage.querySelector('[data-op-next]').addEventListener('click', next);
}

function next() {
  if (!op || op.phase !== 'reveal') return;
  sfx.tab();
  op.idx++;
  reveal();
}

function summary() {
  if (!op) return;
  op.phase = 'summary';
  const { pack, results, xpGain, choice } = op.result;
  const chosen = choice?.chosen;
  const chosenRow = chosen ? [{ card: chosen.card, finish: chosen.finish, serial: chosen.serial, isNew: chosen.isNew, value: chosen.value, item: chosen.item }] : [];
  const all = [...results, ...chosenRow];
  const newCount = all.filter(r => r.isNew).length;
  const total = all.reduce((n, r) => n + (r.value ?? cardValue(r.card, r.finish)), 0);
  const stage = op.el.querySelector('[data-op-stage]');
  stage.innerHTML = `<div class="op-summary">
    <div class="summary-head">
      <div class="sh-kicker">PACK COMPLETE · ${esc(pack.name)}</div>
      <h2>${newCount ? `${newCount} new card${newCount === 1 ? '' : 's'}` : 'Your pulls are in the vault'}</h2>
      <p>${all.length} cards · ◈ ${fmt(total)} collector value · +${xpGain + (chosen ? 18 : 0)} XP</p>
    </div>
    <div class="summary-grid">
      ${all.map((r, i) => `<div style="--i:${i};width:100%">${cardHTML(r.card, { finish: r.finish, serial: r.serial, isNew: r.isNew, itemUid: r.item?.uid })}</div>`).join('')}
    </div>
    <div class="summary-totals">
      <div class="new"><span>NEW</span><b>${newCount}</b></div>
      <div class="dupe"><span>DUPLICATES</span><b>${all.length - newCount}</b></div>
      <div><span>VALUE</span><b>◈ ${fmt(total)}</b></div>
      <div><span>XP</span><b>+${xpGain + (chosen ? 18 : 0)}</b></div>
    </div>
    <div class="summary-actions">
      <button class="btn btn-primary" data-op-again>Open another</button>
      <button class="btn btn-gold" data-op-collection>View in vault</button>
      <button class="btn" data-op-done>Done</button>
    </div>
  </div>`;
  updateDots(true);
  sfx.claim();
  const again = stage.querySelector('[data-op-again]');
  const dailyDone = pack.oncePerDay;
  const potdLeft = pack.id === 'potd' ? potdPurchasesLeft() : null;
  if (dailyDone) { again.disabled = true; again.textContent = 'Daily pack claimed'; }
  if (potdLeft === 0) { again.disabled = true; again.textContent = 'Daily limit reached'; }
  again.addEventListener('click', againOpen);
  stage.querySelector('[data-op-collection]').addEventListener('click', () => {
    closeOpening();
    location.hash = '#/collection';
  });
  stage.querySelector('[data-op-done]').addEventListener('click', () => closeOpening());
}

function finishReveal() {
  if (!op) return;
  const { choice } = op.result;
  if (choice && choice.chosenCount < choice.picks) return choiceStage();
  summary();
}

function choiceStage() {
  if (!op) return;
  op.phase = 'choice';
  const { pack, choice } = op.result;
  const stage = op.el.querySelector('[data-op-stage]');
  const remaining = choice.picks - choice.chosenCount;
  const opts = choice.options;
  stage.innerHTML = `<div class="choice-stage">
    <div class="choice-head">
      <div class="ch-kicker">COLLECTOR'S CHOICE · ${esc(pack.name)}</div>
      <h2>Pick your legend</h2>
      <p>${remaining} card${remaining === 1 ? '' : 's'} to claim. ${opts.length} ${RARITY[pack.choice.rarity]?.label || 'premium'} options, each sealed with a premium finish. The one you leave behind goes back to the vault.</p>
    </div>
    <div class="choice-grid">
      ${opts.map((o, i) => `<button class="choice-opt${o.taken ? ' taken' : ''}" data-choice-id="${esc(o.card.id)}" ${o.taken ? 'disabled' : ''} style="--i:${i}">
        <div class="choice-card">${cardHTML(o.card, { finish: o.finish, serial: o.serial, isNew: o.isNew })}</div>
        <div class="choice-meta">
          <b>${esc(o.card.name)}</b>
          <span>${esc(o.card.sport === 'motogp' ? 'MotoGP' : o.card.sport === 'crossover' ? 'Crossover' : 'Formula 1')} · ${esc(o.card.typeLabel)} · ${esc(finishName(o.finish))}</span>
          ${o.isNew ? '<span class="new-pill">NEW TO VAULT</span>' : '<span class="dupe-pill">DUPLICATE · ◈ ' + fmt(cardValue(o.card, o.finish)) + '</span>'}
        </div>
      </button>`).join('')}
    </div>
    <div class="choice-note">${remaining} of ${choice.picks} picks remaining · ${opts.filter(o => !o.taken).length} option${opts.filter(o => !o.taken).length === 1 ? '' : 's'} left</div>
  </div>`;
  stage.querySelectorAll('[data-choice-id]').forEach(btn => {
    if (btn.disabled) return;
    btn.addEventListener('click', () => {
      const id = btn.dataset.choiceId;
      try {
        const res = choosePackCard(op.result, id);
        sfx.claim();
        if (res?.option) {
          op.result.choice.chosen = { card: res.option.card, finish: res.option.finish, serial: res.option.serial, isNew: res.option.isNew, value: res.value, item: res.item };
          op.result.choice.chosenCount = op.result.choice.chosenCount;
        }
        if (op.result.choice.chosenCount < op.result.choice.picks) choiceStage();
        else finishReveal();
      } catch (err) {
        sfx.error();
        toast('red', 'Cannot claim that card', err.message, '!');
      }
    });
  });
}

function againOpen() {
  if (!op) return;
  const id = op.result.pack.id;
  try {
    const res = openPack(id);
    sfx.buy();
    showOpening(res, { onClose: op.onClose });
  } catch (err) {
    sfx.error();
    toast('red', 'Cannot open another', err.message, '!');
  }
}

function updateDots(allDone = false) {
  if (!op) return;
  const dots = op.el.querySelectorAll('[data-dot]');
  dots.forEach((dot, i) => {
    dot.className = 'op-dot';
    const r = op.result.results[i];
    if (allDone || i < op.idx) {
      dot.classList.add('done');
      if (r?.card.rarity === 'legendary') dot.classList.add('pulled-legendary');
      if (r?.card.rarity === 'iconic') dot.classList.add('pulled-iconic');
    } else if (i === op.idx && op.phase !== 'walkout') {
      dot.classList.add('now');
    }
  });
}

function bind() {
  op.el.querySelector('[data-op-skip]').addEventListener('click', () => {
    if (!op) return;
    sfx.tab();
    if (op.phase === 'pack' || op.phase === 'tear') {
      op.el.classList.add('tearing');
      clearTimers();
      op.phase = 'reveal';
      op.idx = 0;
      reveal();
    } else if (op.phase === 'walkout') {
      clearTimers();
      reveal();
    } else if (op.phase === 'reveal') {
      finishReveal();
    }
  });
  op.keyHandler = ev => {
    if (!op) return;
    if (document.querySelector('.modal-backdrop')) return;
    if (ev.key === 'Escape') { closeOpening(); }
    if (ev.key === ' ' || ev.key === 'Enter') {
      if (op.phase === 'pack') { ev.preventDefault(); tear(); }
      else if (op.phase === 'reveal') { ev.preventDefault(); next(); }
    }
  };
  window.addEventListener('keydown', op.keyHandler);
}

function later(fn, ms) {
  if (!op) return;
  const t = setTimeout(() => { op && (op.timers = op.timers.filter(x => x !== t)); fn(); }, ms);
  op.timers.push(t);
}
function clearTimers() {
  if (!op) return;
  op.timers.forEach(clearTimeout);
  op.timers = [];
}

export function closeOpening(notify = true) {
  if (!op) return;
  clearTimers();
  if (op.keyHandler) window.removeEventListener('keydown', op.keyHandler);
  op.el.remove();
  document.body.classList.remove('no-scroll');
  const cb = op.onClose;
  op = null;
  if (notify && cb) cb();
}
export function isOpening() { return !!op; }
