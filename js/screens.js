/* ============================================================
   APEX RUSH — screen renderers
   ============================================================ */
import {
  getState, groupedCollection, uniqueCount, collectionValue, itemsOfCard,
  albumProgress, dailyStatus, dailyChallenges, achievements, xpProgress,
  marketListings, tradeOffers, potdPurchasesLeft, getPackById, packTokenCount,
  duplicateGroups, claimChallenge, setFavorite, sellItem, sellAllDuplicates,
  sellAllCommons, exportSave, importSave, resetSave, toggleMuted, buyListing,
  refreshMarket, acceptTrade, refreshTrades, claimAlbum, claimDaily, claimAllAvailable,
} from './store.js';
import {
  CARDS, CARD_MAP, ALBUMS, ALBUM_MAP, FEATURED_CARDS, RARITY, cardValue,
  albumSetSections, CARD_COUNT,
} from './data/index.js';
import { PACKS, PACK_MAP, getPackOfTheDay } from './data/packs.js';
import { DAILY_REWARDS, levelNeeded, levelTitle } from './data/progress.js';
import { FINISHES, TYPE_META } from './data/core.js';
import { setMuted } from './audio.js';
import {
  fmt, esc, cardHTML, slotHTML, miniCardHTML, packHTML, packPriceHTML, oddsRows,
  guaranteeList, finishName, finishShort, serialText, sportClass, sportShort,
  rewardHTML, coinHTML, gemHTML, toast, openModal, closeModal, confirmAction,
  openCardDetail, statBox, emptyState, levelRingHTML, FINISH_ORDER, bestFinishFor,
  packName,
} from './ui.js';

export const view = {
  collection: { mode: 'vault', q: '', sport: 'all', rarity: 'all', type: 'all', sort: 'recent' },
  albums: { sport: 'all' },
  packs: { tab: 'all' },
};

const SPORT_ORDER = ['f1', 'motogp', 'crossover'];
const SPORT_LABEL = { f1: 'Formula 1', motogp: 'MotoGP', crossover: 'Crossover' };
const RARITY_ORDER = { common: 0, rare: 1, epic: 2, legendary: 3, iconic: 4 };

/* ------------------------------------------------------------
   HOME / GARAGE
   ------------------------------------------------------------ */
export function homeScreen() {
  const s = getState();
  const st = dailyStatus();
  const potd = getPackOfTheDay(new Date());
  const left = potdPurchasesLeft();
  const uniq = uniqueCount();
  const pct = Math.round(uniq / CARD_COUNT * 100);
  const fav = CARD_MAP[s.favorite];
  const picks = [];
  if (fav) picks.push(fav);
  for (const c of FEATURED_CARDS) if (!picks.some(p => p.id === c.id)) picks.push(c);
  while (picks.length < 3 && CARDS.length) picks.push(CARDS[picks.length]);
  const heroCards = picks.slice(0, 3).map(c => cardHTML(c, { finish: bestFinishFor(c.id, s.items), cardIdAttr: false }));
  const pulls = s.recentPulls.slice(0, 6).map(p => {
    const card = CARD_MAP[p.cardId];
    return card ? cardHTML(card, { finish: p.finish, serial: p.serial, isNew: p.isNew, itemUid: p.uid, cardIdAttr: false }) : '';
  }).join('');
  const nextReward = nextUniqueMilestone();
  const miniMissions = dailyChallenges().map(c => miniMission(c)).join('');
  const potdPack = packHTML(potd);
  const level = s.level;
  const xp = xpProgress();

  return `<div class="screen" data-screen="home">
    <section class="home-hero">
      <div class="hero-copy">
        <div class="eyebrow">The collector’s paddock · 2026</div>
        <h1>Own the<br><em>APEX.</em></h1>
        <p>Formula 1 and MotoGP legends, sealed in foil. Open packs, chase iconic finishes, complete every album and build the greatest motorsport vault on the grid.</p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-lg" data-nav="packs">Open a pack <span class="ico">→</span></button>
          <button class="btn btn-lg" data-nav="collection">My vault <span class="ico">▤</span></button>
          <button class="btn btn-lg btn-ghost" data-nav="daily"><span class="ico">✶</span> Daily hub</button>
        </div>
        <div class="hero-mini">
          <div><b>${uniq}<small style="font-size:12px;color:var(--dim)"> / ${CARD_COUNT}</small></b><span>Cards collected</span></div>
          <div><b>${fmt(collectionValue())}</b><span>Vault value ◈</span></div>
          <div><b>LV ${level}</b><span>${esc(levelTitle(level))}</span></div>
          <div><b>${s.stats.packsOpened}</b><span>Packs opened</span></div>
        </div>
      </div>
      <div class="hero-art">
        <div class="hero-glow"></div>
        <div class="hero-spark tl">F1 × MOTOGP</div>
        <div class="hero-spark br">${s.stats.iconicPulls} iconic pulls</div>
        <div class="fan">${heroCards.join('')}</div>
      </div>
    </section>

    <div class="daily-strip">
      <div class="ds-ico">${st.canClaim ? '✶' : '✓'}</div>
      <div class="ds-txt">
        <b>${st.canClaim ? `Daily reward ready · Day ${st.cycleDay}` : `Daily reward claimed · ${st.streak}-day streak`}</b>
        <span>${st.canClaim ? `${DAILY_REWARDS[st.cycleDay - 1].name} — ${rewardText(DAILY_REWARDS[st.cycleDay - 1])}` : 'The next reward unlocks at midnight. Keep the streak alive.'}</span>
      </div>
      <button class="btn ${st.canClaim ? 'btn-gold' : ''}" data-nav="daily">${st.canClaim ? 'Claim reward' : 'View daily hub'}</button>
    </div>

    <div class="home-grid">
      <div class="home-col">
        <section class="potd-banner">
          <div>${potdPack}</div>
          <div class="p-txt">
            <div class="tag">Pack of the day · ${left} of 3 left</div>
            <b>${esc(potd.name)}</b>
            <p>${esc(potd.extra || 'Boosted odds and a daily discount.')} <span class="muted">${potd.discount ? `${potd.discount}% off today.` : ''}</span></p>
            <div class="p-time">${potd.currency === 'gems' ? '◆' : '◈'} <b>${fmt(potd.cost)}</b>${potd.baseCost ? ` <span style="text-decoration:line-through;color:var(--dim)">${fmt(potd.baseCost)}</span>` : ''} · ${potd.cards} cards · ${potd.guaranteeNew} new guaranteed</div>
          </div>
          <button class="btn btn-primary" data-open-pack="potd" ${left <= 0 ? 'disabled' : ''}>${left <= 0 ? 'Limit reached' : 'Open today’s pack'}</button>
        </section>

        <section class="panel">
          <div class="panel-head">
            <h3><span class="bar"></span> Latest pulls</h3>
            <button class="panel-link" data-nav="collection">View vault →</button>
          </div>
          <div class="latest-pulls">
            ${pulls || `<div class="pull-empty">Your vault is waiting. Open your first pack to see the cards land here.<br><br><button class="btn btn-sm btn-primary" data-nav="packs">Open a pack</button></div>`}
          </div>
        </section>

        <section class="panel">
          <div class="panel-head">
            <h3><span class="bar"></span> Collector’s next move</h3>
            <button class="panel-link" data-nav="challenges">All goals →</button>
          </div>
          <div class="milestone-track">
            ${nextReward ? `<div class="ms-row"><span class="ms-node ${nextReward.completed ? 'done' : ''}">${nextReward.completed ? '✓' : '★'}</span><div><b>${esc(nextReward.title)}</b><br><span class="tiny">${nextReward.progress} / ${nextReward.goal} unique cards</span></div><span class="ms-reward">${rewardHTML(nextReward.reward)}</span></div>` : '<div class="ms-row"><span class="ms-node done">✓</span><div><b>Every milestone claimed</b><br><span class="tiny">The vault is complete. Legendary.</span></div></div>'}
            <div class="progress-track gold" style="margin-top:2px"><i style="width:${pct}%"></i></div>
            <div class="between tiny muted"><span>${uniq} / ${CARD_COUNT} unique cards</span><span>${pct}%</span></div>
          </div>
        </section>
      </div>

      <div class="home-col">
        <section class="panel">
          <div class="panel-head">
            <h3><span class="bar"></span> Today’s objectives</h3>
            <button class="panel-link" data-nav="challenges">Open →</button>
          </div>
          <div class="mini-challenge">${miniMissions}</div>
        </section>

        <section class="panel">
          <div class="panel-head">
            <h3><span class="bar"></span> Quick access</h3>
            <span class="chip">${xp.current} / ${xp.need} XP</span>
          </div>
          <div class="quick-links">
            <button class="quick-link" data-nav="packs"><span class="ql-ico" style="background:rgba(255,47,56,.12);color:var(--red-2)">▣</span><div><b>Packs</b><span>Buy sealed motorsport hits</span></div></button>
            <button class="quick-link" data-nav="albums"><span class="ql-ico" style="background:rgba(246,196,83,.12);color:var(--gold)">▦</span><div><b>Albums</b><span>Complete eras and claim</span></div></button>
            <button class="quick-link" data-nav="market"><span class="ql-ico" style="background:rgba(34,211,238,.1);color:var(--cyan)">◫</span><div><b>Marketplace</b><span>Buy and sell singles</span></div></button>
            <button class="quick-link" data-nav="trade"><span class="ql-ico" style="background:rgba(178,92,255,.12);color:var(--purple)">⇄</span><div><b>Trading</b><span>Swap duplicates with collectors</span></div></button>
          </div>
        </section>

        <section class="panel">
          <div class="panel-head">
            <h3><span class="bar"></span> Vault pulse</h3>
            <span class="chip gold">${s.stats.bestStreak} day best</span>
          </div>
          <div class="pity-panel">
            <div class="pp-row"><span>Unique cards</span><b>${uniq} / ${CARD_COUNT}</b></div>
            <div class="progress-track"><i style="width:${pct}%"></i></div>
            <div class="pp-row"><span>Iconic pulls</span><b>${s.stats.iconicPulls}</b></div>
            <div class="pp-row"><span>Legendary pulls</span><b>${s.stats.legendaryPulls}</b></div>
            <div class="pp-row"><span>Trades completed</span><b>${s.stats.trades}</b></div>
            <div class="pp-note">Every pack, sale and trade feeds your collector level. Level rewards pay out automatically.</div>
          </div>
        </section>
      </div>
    </div>
  </div>`;
}

function miniMission(c) {
  const pct = c.goal ? Math.round(c.progress / c.goal * 100) : 0;
  return `<div class="mc">
    <span class="mc-ico">${esc(c.icon)}</span>
    <div class="mc-body"><b>${esc(c.title)}</b><div class="progress-track"><i style="width:${pct}%"></i></div></div>
    ${c.completed && !c.claimed ? `<button class="btn btn-sm btn-gold" data-claim-challenge="${esc(c.id)}" data-kind="daily">Claim</button>` : `<span class="mc-reward">${c.claimed ? 'CLAIMED' : rewardHTML(c.reward)}</span>`}
  </div>`;
}
function rewardText(r) {
  const bits = [];
  if (r.coins) bits.push(`${fmt(r.coins)} coins`);
  if (r.gems) bits.push(`${fmt(r.gems)} gems`);
  if (r.pack) bits.push(packName(r.pack));
  return bits.join(' + ');
}
function nextUniqueMilestone() {
  const list = achievements().filter(a => a.kind === 'unique');
  return list.find(a => !a.claimed) || list[list.length - 1] || null;
}

/* ------------------------------------------------------------
   PACKS
   ------------------------------------------------------------ */
export function packsScreen() {
  const s = getState();
  const tabs = [['all', 'All packs'], ['featured', 'Featured'], ['f1', 'Formula 1'], ['motogp', 'MotoGP'], ['special', 'Special']];
  const list = PACKS.filter(p => p.category !== 'daily' && (view.packs.tab === 'all' || p.category === view.packs.tab));
  const featuredId = view.packs.tab === 'f1' ? 'f1-premium' : view.packs.tab === 'motogp' ? 'motogp-premium' : view.packs.tab === 'special' ? 'championship' : 'premium';
  const feature = PACK_MAP[featuredId] || list[0] || PACK_MAP.premium;
  const rest = list.filter(p => p.id !== feature.id);
  const potd = getPackOfTheDay(new Date());
  const potdLeft = potdPurchasesLeft();

  return `<div class="screen" data-screen="packs">
    <div class="page-head">
      <div>
        <div class="eyebrow">Sealed product · factory fresh</div>
        <h1 class="page-title">Pack <em>garage</em></h1>
        <p class="page-sub">Every pack is sealed with a guarantee. Chase rare finishes, complete albums, and pull the icons that define two-wheel and four-wheel history.</p>
      </div>
      <div class="page-head-actions">
        <span class="chip">${s.tokens.length} token${s.tokens.length === 1 ? '' : 's'} ready</span>
        <button class="btn btn-sm" data-nav="collection">Vault <span class="ico">→</span></button>
      </div>
    </div>

    <div class="tabs" style="margin-bottom:16px">
      ${tabs.map(([id, label]) => `<button class="${view.packs.tab === id ? 'active' : ''}" data-pack-tab="${id}">${esc(label)}</button>`).join('')}
    </div>

    <div class="packs-feature">
      <div class="feature-pack">
        <div class="fp-pack">${packHTML(feature)}</div>
        <div class="fp-copy">
          <div class="eyebrow">${feature.potd ? 'Daily rotation' : 'Featured series'}</div>
          <h2>${esc(feature.name)}</h2>
          <p>${esc(feature.tagline)} ${esc(feature.desc)}</p>
          <div class="fp-odds">
            ${['iconic', 'legendary', 'epic'].map(r => `<div><b style="color:${RARITY[r].color}">${feature.odds[r] < 1 ? feature.odds[r].toFixed(1) : Math.round(feature.odds[r])}%</b><span>${RARITY[r].label}</span></div>`).join('')}
            <div><b>${feature.cards}</b><span>Cards</span></div>
            <div><b>${feature.guaranteeNew || 0}</b><span>New cards</span></div>
          </div>
          <div class="fp-buy">
            <button class="btn btn-primary btn-lg" data-open-pack="${feature.id}">${packTokenCount(feature.id) ? 'Open with token' : `Open for ${feature.currency === 'gems' ? '◆' : '◈'} ${fmt(feature.cost)}`}</button>
            <span class="pack-price-note">${guaranteeList(feature)[0]}</span>
          </div>
        </div>
      </div>
      <div class="panel feature-side">
        <div class="panel-head"><h3><span class="bar"></span> Today’s deal</h3><span class="chip red">−${potd.discount || 0}%</span></div>
        <div class="potd-mini">
          <div class="potd-mini-pack">${packHTML(potd)}</div>
          <div>
            <b>${esc(potd.name)}</b>
            <p>${esc(potd.extra || '')}</p>
            <div class="between tiny muted" style="margin-top:8px"><span>${potdLeft} of 3 left today</span><span>${potd.cards} cards</span></div>
            <button class="btn btn-sm btn-gold btn-block" data-open-pack="potd" ${potdLeft <= 0 ? 'disabled' : ''} style="margin-top:9px">${potdLeft <= 0 ? 'Limit reached' : `Open · ${potd.currency === 'gems' ? '◆' : '◈'} ${fmt(potd.cost)}`}</button>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><div><h2>All packs <span>/ ${rest.length + 1}</span></h2><div class="sub">Every sealed pack includes at least one new card unless your collection is complete in that scope.</div></div></div>
      <div class="pack-grid">
        ${[feature, ...rest].map(packTile).join('')}
      </div>
    </div>

    <div class="odds-panel">
      <div class="panel odds-block">
        <div class="odds-title"><h4>${esc(feature.name)} rarity odds</h4><span class="chip">${feature.cards} cards</span></div>
        ${oddsRows(feature)}
        <p class="pack-note" style="margin-top:12px">Odds shown per card. Guarantees are applied after the base roll, so featured packs can outperform the listed rates.</p>
      </div>
      <div class="panel odds-block">
        <div class="odds-title"><h4>Foil finish chase</h4><span class="chip gold">Premium</span></div>
        <div class="finish-chase">
          ${Object.entries(FINISHES).filter(([k]) => k !== 'base').map(([k, f]) => `<div class="fc-row"><span class="finish-chip finish-${k}">${esc(f.short)}</span><span>${esc(f.name)}</span></div>`).join('')}
        </div>
        <p class="pack-note" style="margin-top:12px">Limited, Signature and Championship editions carry added collector value. Every finish is preserved in your album.</p>
      </div>
    </div>
  </div>`;
}

function packTile(pack) {
  const s = getState();
  const tokens = packTokenCount(pack.id);
  const cur = pack.currency === 'gems' ? s.gems : s.coins;
  const affordable = tokens > 0 || pack.cost === 0 || cur >= pack.cost;
  const tag = pack.id === 'gold' || pack.id === 'f1-gold' || pack.id === 'motogp-gold' ? 'GOLD SERIES' : pack.id === 'iconic' ? 'VAULT' : pack.id === 'limited' ? 'NUMBERED' : pack.id === 'championship' ? 'TITLE CHASE' : pack.id === 'crossover' ? 'TWO WORLDS' : pack.id === 'premium' ? 'MOST POPULAR' : '';
  return `<div class="pack-tile${affordable ? '' : ' no-funds'}">
    <div class="pack-wrap" data-open-pack="${pack.id}" role="button" tabindex="0" aria-label="Open ${esc(pack.name)}">
      ${tag ? `<span class="pack-tier ${tag === 'MOST POPULAR' ? 'hot' : ''}">${tag}</span>` : ''}
      ${packHTML(pack)}
    </div>
    <div class="pack-info">
      <div class="nm"><span>${esc(pack.name)}</span><span class="tiny muted">${pack.cards} CARDS</span></div>
      <div class="ds">${esc(pack.tagline)}</div>
      <div class="buy">
        <div class="price">${packPriceHTML(pack, tokens)}</div>
        <button class="btn btn-sm ${affordable ? 'btn-primary' : ''}" data-open-pack="${pack.id}">${tokens ? 'Open' : pack.cost === 0 ? 'Claim' : 'Buy'}</button>
      </div>
    </div>
  </div>`;
}

/* ------------------------------------------------------------
   COLLECTION
   ------------------------------------------------------------ */
export function collectionScreen() {
  const s = getState();
  const f = view.collection;
  const grouped = groupedCollection();
  const byId = new Map(grouped.map(g => [g.card.id, g]));
  const itemsById = new Map();
  for (const item of s.items) {
    if (!itemsById.has(item.cardId)) itemsById.set(item.cardId, []);
    itemsById.get(item.cardId).push(item);
  }
  let cards = f.mode === 'all' ? [...CARDS] : grouped.map(g => g.card);
  if (f.sport !== 'all') cards = cards.filter(c => c.sport === f.sport);
  if (f.rarity !== 'all') cards = cards.filter(c => c.rarity === f.rarity);
  if (f.type !== 'all') cards = cards.filter(c => c.type === f.type);
  if (f.q) {
    const q = f.q.toLowerCase().trim();
    cards = cards.filter(c => c.searchable.includes(q));
  }
  const sorters = {
    recent: (a, b) => {
      const ga = byId.get(a.id), gb = byId.get(b.id);
      const ta = ga ? Math.max(...ga.items.map(i => i.at || 0)) : 0;
      const tb = gb ? Math.max(...gb.items.map(i => i.at || 0)) : 0;
      return tb - ta || a.name.localeCompare(b.name);
    },
    rarity: (a, b) => RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity] || a.name.localeCompare(b.name),
    name: (a, b) => a.name.localeCompare(b.name),
    value: (a, b) => {
      const ga = byId.get(a.id), gb = byId.get(b.id);
      const va = ga ? cardValue(a, ga.best) * ga.count : 0;
      const vb = gb ? cardValue(b, gb.best) * gb.count : 0;
      return vb - va;
    },
    copies: (a, b) => (byId.get(b.id)?.count || 0) - (byId.get(a.id)?.count || 0) || a.name.localeCompare(b.name),
  };
  cards.sort(sorters[f.sort] || sorters.recent);
  const groupsBySport = {};
  for (const c of cards) (groupsBySport[c.sport] ||= []).push(c);
  const dupes = grouped.filter(g => g.count > 1);
  const fav = CARD_MAP[s.favorite];
  const completion = Math.round(uniqueCount() / CARD_COUNT * 100);
  const milestones = achievements().filter(a => a.kind === 'unique');

  return `<div class="screen" data-screen="collection">
    <div class="page-head">
      <div>
        <div class="eyebrow">The vault · ${completion}% complete</div>
        <h1 class="page-title">My <em>collection</em></h1>
        <p class="page-sub">${uniqueCount()} unique cards across Formula 1, MotoGP and the crossover legends. Every copy, finish and numbered edition is archived here.</p>
      </div>
      <div class="page-head-actions">
        <button class="btn btn-sm ${f.mode === 'vault' ? 'btn-primary' : ''}" data-collection-mode="vault">My vault</button>
        <button class="btn btn-sm ${f.mode === 'all' ? 'btn-primary' : ''}" data-collection-mode="all">All cards</button>
        <button class="btn btn-sm ${dupes.length ? '' : 'hidden'}" data-sell-dupes>Duplicates ${dupes.length ? `(${dupes.length})` : ''}</button>
      </div>
    </div>

    <div class="coll-stats">
      ${statBox('Unique cards', `${uniqueCount()}<small>/${CARD_COUNT}</small>`, 'Vault completion', 'gold')}
      ${statBox('Total copies', s.items.length, `${dupes.length} duplicate groups`, 'cyan')}
      ${statBox('Vault value', `◈ ${fmt(collectionValue())}`, 'Collector valuation', 'green')}
      ${statBox('Packs opened', s.stats.packsOpened, `${s.stats.iconicPulls} iconic pulled`, 'red')}
      ${statBox('Favourite', fav ? esc(fav.name.split(' ').pop()) : '—', fav ? esc(fav.team || 'No team') : 'Set one in card details')}
    </div>

    <div class="collection-milestones">
      ${milestones.map(a => `<div class="cm-item ${a.completed ? 'done' : ''}"><span class="cm-ic">${a.completed ? '✓' : a.goal}</span><b>${a.goal} unique</b><span class="cm-r">${rewardText(a.reward)}</span></div>`).join('')}
    </div>

    <div class="coll-filter">
      <div class="field"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><input id="coll-search" data-filter="search" placeholder="Search driver, team, era, moment…" value="${esc(f.q)}" autocomplete="off" /></div>
      <select class="select" data-filter="sport" aria-label="Sport">
        ${option('all', 'All sports', f.sport)}${option('f1', 'Formula 1', f.sport)}${option('motogp', 'MotoGP', f.sport)}${option('crossover', 'Crossover', f.sport)}
      </select>
      <select class="select" data-filter="rarity" aria-label="Rarity">
        ${option('all', 'All rarities', f.rarity)}${Object.entries(RARITY).reverse().map(([k, v]) => option(k, v.label, f.rarity)).join('')}
      </select>
      <select class="select" data-filter="type" aria-label="Card type">
        ${option('all', 'All types', f.type)}${Object.entries({driver:'Drivers / Riders', team:'Constructors', car:'Cars', bike:'Bikes', moment:'Moments'}).map(([k, v]) => option(k, v, f.type)).join('')}
      </select>
      <select class="select" data-filter="sort" aria-label="Sort">
        ${option('recent', 'Newest first', f.sort)}${option('rarity', 'Rarity', f.sort)}${option('value', 'Value', f.sort)}${option('copies', 'Duplicates', f.sort)}${option('name', 'Name A–Z', f.sort)}
      </select>
      <span class="coll-count">${cards.length} ${f.mode === 'all' ? 'cards' : 'own cards'}</span>
    </div>

    ${cards.length ? SPORT_ORDER.filter(sp => groupsBySport[sp]?.length).map(sp => {
      const sportCards = groupsBySport[sp];
      const owned = f.mode === 'all' ? sportCards.filter(c => byId.has(c.id)).length : sportCards.length;
      const total = f.mode === 'all' ? sportCards.length : CARDS.filter(c => c.sport === sp).length;
      return `<div class="coll-group-title">${SPORT_LABEL[sp]} <span class="cnt">${owned} / ${total} ${f.mode === 'all' ? 'collected' : 'shown'}</span></div>
      <div class="card-grid">
        ${sportCards.map(card => {
          const g = byId.get(card.id);
          if (!g && f.mode === 'vault') return '';
          if (!g) return `<div data-open-card="${esc(card.id)}">${slotHTML(card)}</div>`;
          const best = g.items.find(i => i.finish === g.best) || g.items[0];
          return cardHTML(card, { finish: g.best, serial: best?.serial, count: g.count, itemUid: best?.uid });
        }).join('')}
      </div>`;
    }).join('') : emptyState('▤', 'No cards match those filters', 'Try widening the search or switching to All cards.', `<button class="btn btn-sm" data-collection-clear>Clear filters</button>`)}
  </div>`;
}

function option(value, label, current) {
  return `<option value="${esc(value)}" ${value === current ? 'selected' : ''}>${esc(label)}</option>`;
}

export function clearCollectionFilters() {
  Object.assign(view.collection, { q: '', sport: 'all', rarity: 'all', type: 'all', sort: 'recent' });
}

/* ------------------------------------------------------------
   ALBUMS
   ------------------------------------------------------------ */
export function albumsScreen() {
  const filter = view.albums.sport;
  const albums = ALBUMS.filter(a => filter === 'all' || a.sport === filter);
  const complete = ALBUMS.filter(a => albumProgress(a).complete).length;
  const claimable = ALBUMS.filter(a => { const p = albumProgress(a); return p.complete && !p.claimed; }).length;
  return `<div class="screen" data-screen="albums">
    <div class="page-head">
      <div>
        <div class="eyebrow">Set building · ${complete} / ${ALBUMS.length} complete</div>
        <h1 class="page-title">The <em>albums</em></h1>
        <p class="page-sub">Seventeen albums. Six decades. Two disciplines. Collect every card in a set to unlock its reward and stamp your name on motorsport history.</p>
      </div>
      <div class="page-head-actions">
        <span class="chip gold">${claimable} reward${claimable === 1 ? '' : 's'} ready</span>
        <span class="chip">${uniqueCount()} / ${CARD_COUNT} cards</span>
      </div>
    </div>

    <div class="tabs" style="margin-bottom:18px">
      ${[['all', 'All albums'], ['f1', 'Formula 1'], ['motogp', 'MotoGP'], ['crossover', 'Crossover']].map(([id, label]) => `<button class="${filter === id ? 'active ' + (id === 'f1' ? 'f1' : id === 'motogp' ? 'motogp' : '') : ''}" data-album-filter="${id}">${esc(label)}</button>`).join('')}
    </div>

    <div class="album-grid">
      ${albums.map(album => albumCard(album)).join('')}
    </div>
  </div>`;
}

function albumCard(album) {
  const prog = albumProgress(album);
  const cards = album.cardIds.map(id => CARD_MAP[id]).filter(Boolean);
  const picks = [...cards].sort((a, b) => RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity]).slice(0, 3);
  const s = getState();
  return `<div class="album-card" data-open-album="${album.id}" role="button" tabindex="0">
    <div class="album-cover">
      <div class="ac-bg" style="background:radial-gradient(ellipse at 20% 20%, ${album.accent}33, transparent 60%),radial-gradient(ellipse at 80% 80%, ${album.accent2}cc, transparent 65%),linear-gradient(160deg,#151a22,#080a0f)"></div>
      <div class="ac-fan">${picks.map((c, i) => {
        const items = s.items.filter(it => it.cardId === c.id);
        const finish = items.length ? bestFinishFor(c.id, s.items) : 'base';
        return `<div style="--rot:${i === 0 ? -11 : i === 1 ? 0 : 11}deg;--rot2:0deg;--rot3:11deg">${miniCardHTML(c, finish)}</div>`;
      }).join('')}</div>
      <div class="ac-label"><span style="width:7px;height:7px;border-radius:50%;background:${album.accent}"></span>${esc(album.sport === 'crossover' ? 'Crossover' : album.sport === 'motogp' ? 'MotoGP' : 'Formula 1')} · ${esc(album.years)}</div>
      <div class="ac-pct" style="color:${prog.complete ? 'var(--green)' : album.accent}">${prog.pct}%</div>
    </div>
    <div class="album-body">
      <h4>${esc(album.name)} ${prog.complete && !prog.claimed ? '<span class="chip green" style="font-size:7px;height:18px">CLAIM</span>' : prog.claimed ? '<span class="chip green" style="font-size:7px;height:18px">DONE</span>' : ''}</h4>
      <div class="ab-sub"><span>${prog.have} / ${prog.total} cards</span><span>${esc(album.types ? 'Machine & constructor set' : album.era ? album.era + ' collection' : 'Special set')}</span></div>
      <div class="progress-track" style="--accent:${album.accent}"><i style="width:${prog.pct}%;background:linear-gradient(90deg,${album.accent2},${album.accent})"></i></div>
      <div class="ab-foot"><span>${prog.complete ? (prog.claimed ? 'Album mastered' : 'Reward ready to claim') : `${prog.total - prog.have} cards missing`}</span><span class="ab-reward">${coinHTML(album.reward.coins)} ${gemHTML(album.reward.gems)}</span></div>
    </div>
  </div>`;
}

export function albumDetailScreen(albumId) {
  const album = ALBUM_MAP[albumId];
  if (!album) return `<div class="screen">${emptyState('▦', 'Album not found', 'That album does not exist.', '<button class="btn" data-nav="albums">Back to albums</button>')}</div>`;
  const prog = albumProgress(album);
  const sections = albumSetSections(album);
  const s = getState();
  return `<div class="screen" data-screen="album-detail">
    <div class="page-head" style="margin-bottom:14px">
      <div>
        <button class="btn btn-sm btn-ghost" data-nav="albums" style="margin-bottom:10px">← All albums</button>
        <div class="eyebrow" style="color:${album.accent}">${esc(album.sport === 'crossover' ? 'Crossover album' : album.sport === 'motogp' ? 'MotoGP album' : 'Formula 1 album')} · ${esc(album.years)}</div>
        <h1 class="page-title">${esc(album.name)}</h1>
        <p class="page-sub">${esc(album.desc)}</p>
      </div>
      <div class="page-head-actions">
        ${prog.complete && !prog.claimed ? `<button class="btn btn-gold" data-claim-album="${album.id}">Claim album reward</button>` : prog.claimed ? `<span class="chip green">✓ Reward claimed</span>` : `<span class="chip">${prog.total - prog.have} remaining</span>`}
      </div>
    </div>

    <div class="album-detail-head" style="--accent-soft:${album.accent}22">
      <div class="adh-pct" style="margin-left:0;text-align:left"><b style="font-size:30px">${prog.have}<span style="font-size:16px;color:var(--dim)">/${prog.total}</span></b><span>Cards collected</span></div>
      <div style="flex:1;min-width:180px">
        <div class="progress-track" style="height:8px"><i style="width:${prog.pct}%;background:linear-gradient(90deg,${album.accent2},${album.accent})"></i></div>
        <div class="between tiny muted" style="margin-top:7px"><span>${prog.pct}% complete</span><span>${esc(album.name)}</span></div>
      </div>
      <div class="set-reward" style="margin:0"><span>Album reward</span><span class="rwd">${coinHTML(album.reward.coins)} ${gemHTML(album.reward.gems)}</span></div>
      <div class="adh-pct"><b style="color:${prog.complete ? 'var(--green)' : album.accent}">${prog.pct}%</b><span>Set completion</span></div>
    </div>

    ${sections.map(section => {
      const have = section.cards.filter(c => s.items.some(i => i.cardId === c.id)).length;
      return `<section class="album-set">
        <div class="album-set-head"><h4>${esc(section.label)} <span class="cnt muted" style="font-family:var(--font-tech);font-size:9px">${have}/${section.cards.length}</span></h4><div class="progress-track"><i style="width:${Math.round(have / section.cards.length * 100)}%;background:linear-gradient(90deg,${album.accent2},${album.accent})"></i></div><span class="set-count">${section.cards.length - have} missing</span></div>
        <div class="card-grid sm">
          ${section.cards.map(card => {
            const items = itemsOfCard(card.id);
            if (!items.length) return `<div data-open-card="${esc(card.id)}">${slotHTML(card)}</div>`;
            const best = [...items].sort((a, b) => FINISH_ORDER.indexOf(b.finish) - FINISH_ORDER.indexOf(a.finish))[0];
            return cardHTML(card, { finish: best.finish, serial: best.serial, count: items.length, itemUid: best.uid });
          }).join('')}
        </div>
      </section>`;
    }).join('')}

    <div class="set-reward" style="margin-top:6px"><span>Complete <b>${esc(album.name)}</b> to claim</span><span class="rwd">${coinHTML(album.reward.coins)} ${gemHTML(album.reward.gems)}</span></div>
  </div>`;
}

/* ------------------------------------------------------------
   DAILY HUB
   ------------------------------------------------------------ */
export function dailyScreen() {
  const s = getState();
  const st = dailyStatus();
  const missions = dailyChallenges();
  const claimDay = st.cycleDay;
  const reward = DAILY_REWARDS[claimDay - 1];
  return `<div class="screen" data-screen="daily">
    <div class="page-head">
      <div>
        <div class="eyebrow">Daily rotation · resets at midnight</div>
        <h1 class="page-title">Daily <em>hub</em></h1>
        <p class="page-sub">One login reward, one free pack and three rotating objectives every day. Keep the streak alive to reach the Champion’s Purse on day seven.</p>
      </div>
      <div class="page-head-actions"><span class="chip gold">${st.streak}-day streak</span><span class="chip">${st.claimedToday ? 'Reward claimed' : 'Reward ready'}</span></div>
    </div>

    <div class="daily-top">
      <div class="panel streak-panel">
        <div class="flame">✶</div>
        <div class="stripe"></div>
        <div class="str-b">
          <div class="num">${st.streak}<small> DAYS</small></div>
          <div class="lbl">Current login streak</div>
          <div class="hint">${st.canClaim ? `Day ${claimDay} reward is waiting.` : `Next reward unlocks tomorrow · day ${(st.streak % 7) + 1}.`} Best streak: ${s.stats.bestStreak} days.</div>
        </div>
      </div>
      <div class="panel daily-pack-panel">
        <div class="between"><span class="chip cyan">FREE DAILY PACK</span><span class="tiny muted">${st.packAvailable ? 'AVAILABLE' : 'CLAIMED'}</span></div>
        <b>Three cards. Zero coins.</b>
        <p>One free pack every day, with at least one new card guaranteed. A full new card is ${st.packAvailable ? 'ready to be pulled' : 'waiting for tomorrow'}.</p>
        <button class="btn ${st.packAvailable ? 'btn-cyan' : ''}" data-open-pack="daily" ${st.packAvailable ? '' : 'disabled'}>${st.packAvailable ? 'Open free pack' : 'Already claimed'}</button>
      </div>
    </div>

    <div class="panel section">
      <div class="panel-head"><h3><span class="bar"></span> Seven-day reward cycle</h3><span class="chip">${st.claimedCount} / 7 claimed</span></div>
      <div class="reward-calendar">
        ${DAILY_REWARDS.map(d => {
          const isClaimed = st.claimedToday ? d.day <= st.cycleDay : d.day < st.cycleDay;
          const isToday = !st.claimedToday && d.day === st.cycleDay;
          return `<div class="day-card ${isClaimed ? 'claimed' : ''} ${isToday ? 'today' : ''} ${d.highlight ? 'big' : ''}">
            <div class="dc-day">${isToday ? 'TODAY' : `DAY ${d.day}`}</div>
            <div class="dc-ico">${esc(d.icon)}</div>
            <b>${esc(d.name)}</b>
            <span>${d.coins ? `◈ ${fmt(d.coins)}` : ''}${d.gems ? `<br>◆ ${fmt(d.gems)}` : ''}${d.pack ? `<br>▣ ${packName(d.pack)}` : ''}</span>
          </div>`;
        }).join('')}
      </div>
      <div class="daily-claim-bar">
        <div class="txt">${st.canClaim ? `<b>Day ${claimDay}: ${esc(reward.name)}</b> — ${esc(reward.desc)}. ${rewardText(reward)}` : `Reward claimed today. Come back in <b id="daily-reset-inline">--:--:--</b> for the next drop.`}</div>
        <button class="btn btn-gold" data-claim-daily ${st.canClaim ? '' : 'disabled'}>${st.canClaim ? 'Claim daily reward' : 'Claimed'}</button>
      </div>
    </div>

    <div class="panel section">
      <div class="panel-head"><h3><span class="bar"></span> Daily objectives</h3><button class="panel-link" data-nav="challenges">Career goals →</button></div>
      <div class="challenge-list" style="padding:14px">
        ${missions.map(c => challengeRow(c, 'daily')).join('')}
      </div>
    </div>
  </div>`;
}

function challengeRow(c, kind) {
  const pct = Math.round(c.progress / c.goal * 100);
  return `<div class="challenge-row ${c.completed ? 'done' : ''} ${c.claimed ? 'claimed' : ''}">
    <div class="ch-ico">${esc(c.icon)}</div>
    <div class="ch-body"><b>${esc(c.title)}</b><span>${esc(c.desc)}</span></div>
    <div class="ch-prog"><div class="cp-lbl"><span>${c.claimed ? 'Claimed' : c.completed ? 'Complete' : 'Progress'}</span><span>${c.progress} / ${c.goal}</span></div><div class="progress-track"><i style="width:${pct}%"></i></div></div>
    <div class="ch-reward">${rewardHTML(c.reward)}</div>
    <div class="ch-claim">${c.claimed ? `<span class="tiny muted">✓ DONE</span>` : c.completed ? `<button class="btn btn-sm btn-gold" data-claim-challenge="${esc(c.id)}" data-kind="${kind}">Claim</button>` : `<button class="btn btn-sm" disabled>Locked</button>`}</div>
  </div>`;
}

/* ------------------------------------------------------------
   CHALLENGES
   ------------------------------------------------------------ */
export function challengesScreen() {
  const s = getState();
  const xp = xpProgress();
  const daily = dailyChallenges();
  const career = achievements();
  const claimableDaily = daily.filter(c => c.completed && !c.claimed);
  const claimableCareer = career.filter(c => c.completed && !c.claimed);
  const claimable = [...claimableDaily, ...claimableCareer];
  const totalCoins = claimable.reduce((n, c) => n + (c.reward.coins || 0), 0);
  const totalGems = claimable.reduce((n, c) => n + (c.reward.gems || 0), 0);
  const completedCareer = career.filter(c => c.completed).length;
  return `<div class="screen" data-screen="challenges">
    <div class="page-head">
      <div>
        <div class="eyebrow">Progress · ${completedCareer} / ${career.length} career goals</div>
        <h1 class="page-title">Challenges <em>& goals</em></h1>
        <p class="page-sub">Daily objectives reset every midnight. Career achievements are permanent — every claimed milestone pays coins, gems and collector XP.</p>
      </div>
      <div class="page-head-actions"><span class="chip gold">${claimable.length} ready to claim</span></div>
    </div>

    <div class="challenge-summary">
      <div class="panel level-panel">
        <div class="lp-top">
          ${levelRingHTML(s.level, xp.pct)}
          <div><h3>${esc(levelTitle(s.level))}</h3><p>Level ${s.level} · ${xp.current} / ${xp.need} XP to next level</p></div>
        </div>
        <div class="progress-track gold"><i style="width:${xp.pct}%"></i></div>
        <div class="lp-stats">
          <div><b>${s.stats.packsOpened}</b>Packs opened</div>
          <div><b>${s.stats.trades}</b>Trades</div>
          <div><b>${s.stats.cardsSold}</b>Cards sold</div>
          <div><b>${uniqueCount()}</b>Unique</div>
        </div>
      </div>
      <div class="panel claim-all-panel">
        <div class="ca-num">${claimable.length}</div>
        <div class="ca-lbl">Rewards ready to collect</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px">${totalCoins ? coinHTML(totalCoins) : ''}${totalGems ? gemHTML(totalGems) : ''}${claimable.some(c => c.reward.pack) ? '<span class="cur-inline pack">▣ + pack</span>' : ''}</div>
        <button class="btn btn-gold" data-claim-all ${claimable.length ? '' : 'disabled'}>${claimable.length ? 'Claim all available' : 'Nothing to claim'}</button>
      </div>
    </div>

    <section class="section">
      <div class="section-head"><div><h2>Daily objectives <span>· resets in 24h</span></h2><div class="sub">Three rotating goals, selected for today. Claim them before midnight.</div></div><span class="chip">${daily.filter(c => c.claimed).length} / ${daily.length} claimed</span></div>
      <div class="challenge-list">${daily.map(c => challengeRow(c, 'daily')).join('')}</div>
    </section>

    <section class="section">
      <div class="section-head"><div><h2>Career achievements <span>· permanent</span></h2><div class="sub">Milestones for collectors who go the distance. These never expire.</div></div><span class="chip gold">${career.filter(c => c.claimed).length} claimed</span></div>
      <div class="achievement-grid">
        ${career.map(a => `<div class="achievement ${a.completed ? 'done' : 'locked'}">
          <div class="ach-top"><div class="ach-ico">${esc(a.icon)}</div><div><b>${esc(a.title)}</b><p>${esc(a.desc)}</p></div></div>
          <div class="ch-prog"><div class="cp-lbl"><span>${a.claimed ? 'Claimed' : a.completed ? 'Ready' : 'Locked'}</span><span>${a.progress} / ${a.goal}</span></div><div class="progress-track"><i style="width:${Math.round(a.progress / a.goal * 100)}%"></i></div></div>
          <div class="ach-foot"><span class="ach-rwd">${rewardHTML(a.reward)}</span>${a.claimed ? `<span class="ach-state">✓ CLAIMED</span>` : a.completed ? `<button class="btn btn-sm btn-gold" data-claim-challenge="${esc(a.id)}" data-kind="career">Claim</button>` : `<span class="ach-state">IN PROGRESS</span>`}</div>
        </div>`).join('')}
      </div>
    </section>
  </div>`;
}

/* ------------------------------------------------------------
   MARKET
   ------------------------------------------------------------ */
export function marketScreen() {
  const s = getState();
  const listings = marketListings();
  const dupes = duplicateGroups();
  const total = listings.reduce((n, l) => n + (l.bought ? 0 : l.price), 0);
  return `<div class="screen" data-screen="market">
    <div class="page-head">
      <div>
        <div class="eyebrow">Collector market · lot ${s.market.seed + 1}</div>
        <h1 class="page-title">Market<em>place</em></h1>
        <p class="page-sub">Eight hand-picked singles from collectors around the paddock. Prices move with rarity and finish. Refresh the lot or sell your duplicates into the market.</p>
      </div>
      <div class="page-head-actions"><span class="chip gold">◈ ${fmt(total)} listed</span><button class="btn btn-sm" data-refresh-market>↻ Refresh · ◈ 250</button></div>
    </div>

    <div class="market-hero">
      <div><h3>Today’s market</h3><p>${listings.filter(l => !l.bought).length} active listings · deterministic daily lot · buys are final</p></div>
      <div class="market-refresh"><b>${s.market.bought.length} / ${listings.length}</b>sold today</div>
    </div>

    <div class="market-cols">
      <div class="listing-grid">
        ${listings.map(l => {
          const canBuy = !l.bought && s.coins >= l.price;
          return `<div class="listing ${l.bought ? 'sold' : ''}">
            <div class="l-card" data-open-card="${l.card.id}">${cardHTML(l.card, { finish: l.finish, cardIdAttr: false })}</div>
            <div class="l-body">
              <div class="l-name">${esc(l.card.name)}</div>
              <div class="l-meta"><span class="rarity-dot rar-${l.card.rarity}"></span>${esc(l.card.rarity)} <span style="opacity:.4">/</span> ${esc(finishName(l.finish))} <span style="opacity:.4">/</span> ${esc(l.seller)}</div>
              <div class="l-price">◈ ${fmt(l.price)} ${l.finish !== 'base' ? `<span class="strike">◈ ${fmt(cardValue(l.card, 'base'))}</span>` : ''}</div>
            </div>
            <div class="l-buy">
              <button class="btn btn-sm ${canBuy ? 'btn-primary' : ''}" data-buy-listing="${l.id}" ${l.bought || !canBuy ? 'disabled' : ''}>${l.bought ? 'Sold' : canBuy ? 'Buy' : 'Need coins'}</button>
              <span class="l-rar" style="color:${RARITY[l.card.rarity].color}">${esc(l.card.rarity)}</span>
            </div>
          </div>`;
        }).join('')}
      </div>

      <div class="panel sell-panel">
        <div class="panel-head"><h3><span class="bar"></span> Sell duplicates</h3><span class="chip">${dupes.length} groups</span></div>
        <div class="sell-list">
          ${dupes.length ? dupes.slice(0, 14).map(g => {
            const sorted = [...g.items].sort((a, b) => FINISH_ORDER.indexOf(a.finish) - FINISH_ORDER.indexOf(b.finish));
            const spare = sorted[0];
            return `<div class="sell-row">
              <div class="s-card">${cardHTML(g.card, { finish: spare.finish, cardIdAttr: false })}</div>
              <div><div class="s-name">${esc(g.card.name)}</div><div class="s-meta">${esc(g.card.rarity)} · ${esc(finishName(spare.finish))} · ${g.count} copies</div></div>
              <div class="s-price">◈ ${fmt(cardValue(g.card, spare.finish))}<small>spare copy</small></div>
              <button class="btn btn-sm" data-sell-item="${spare.uid}" data-card-id="${g.card.id}">Sell</button>
            </div>`;
          }).join('') : emptyState('⇄', 'No duplicates yet', 'Pull another copy of a card and you can sell the spare here.', `<button class="btn btn-sm" data-nav="packs">Open packs</button>`)}
        </div>
        <div class="sell-actions">
          <button class="btn btn-sm" data-sell-all-dupes ${dupes.length ? '' : 'disabled'}>Sell all duplicates</button>
          <button class="btn btn-sm" data-sell-commons>Sell common dupes</button>
        </div>
      </div>
    </div>
  </div>`;
}

/* ------------------------------------------------------------
   TRADING
   ------------------------------------------------------------ */
export function tradeScreen() {
  const s = getState();
  const offers = tradeOffers();
  return `<div class="screen" data-screen="trade">
    <div class="page-head">
      <div>
        <div class="eyebrow">Collector network · ${offers.length} live offers</div>
        <h1 class="page-title">Trade <em>floor</em></h1>
        <p class="page-sub">Swap spare copies with collectors around the world. Trades only use duplicates, so your last copy of every card stays protected.</p>
      </div>
      <div class="page-head-actions"><span class="chip">${s.stats.trades} trades completed</span><button class="btn btn-sm" data-refresh-trades>↻ Find new offers</button></div>
    </div>

    <div class="trade-intro">
      <div class="ti-ico">⇆</div>
      <div><b>How the trade floor works</b><p>Each offer swaps one of your spare duplicates for a card you do not own. Value is shown up front — green means you win, gold is fair, red is a lowball.</p></div>
      <button class="btn btn-sm" data-nav="packs">Build trade stock</button>
    </div>

    ${offers.length ? `<div class="trade-grid">${offers.map(offer => tradeOffer(offer)).join('')}</div>` :
      emptyState('⇄', 'No trade offers right now', 'Trade partners need at least one duplicate in your vault before they can make an offer. Open a few packs, then check back.', '<button class="btn btn-primary" data-nav="packs">Open packs</button>')}
  </div>`;
}

function tradeOffer(o) {
  return `<div class="trade-offer" style="--offer-accent:${o.verdict === 'good' ? 'var(--green)' : o.verdict === 'bad' ? 'var(--red)' : 'var(--gold)'}">
    <div class="to-head">
      <span class="trader"><span class="avatar">${esc(o.trader.avatar)}</span>${esc(o.trader.alias)}</span>
      <span>· ${esc(o.trader.tag)}</span>
      <span class="to-time">LIVE OFFER</span>
    </div>
    <div class="to-cards">
      <div class="to-side">
        ${cardHTML(o.want, { finish: o.wantFinish, serial: o.wantItem.serial, cardIdAttr: false })}
        <div class="ts-txt"><span>You give</span><b>${esc(o.want.name)}</b><div class="val">${esc(finishName(o.wantFinish))} · ◈ ${fmt(o.wantValue)}</div></div>
      </div>
      <div class="to-arrow">⇄</div>
      <div class="to-side">
        ${cardHTML(o.give, { finish: 'base', cardIdAttr: false })}
        <div class="ts-txt"><span>You receive</span><b>${esc(o.give.name)}</b><div class="val">${esc(o.give.rarity)} · ◈ ${fmt(o.giveValue)}</div></div>
      </div>
    </div>
    <div class="to-foot">
      <span class="verdict ${o.verdict}">${o.verdict === 'good' ? 'Great value' : o.verdict === 'fair' ? 'Fair trade' : 'Lowball'}</span>
      <span class="tiny muted">${o.wantItem ? 'Spare copy · safe to trade' : ''}</span>
      <button class="btn btn-sm ${o.verdict === 'good' ? 'btn-gold' : ''}" data-accept-trade="${o.id}">Accept trade</button>
    </div>
  </div>`;
}

/* ------------------------------------------------------------
   REWARD / LEVEL / SETTINGS / DUPLICATES
   ------------------------------------------------------------ */
export function openRewardModal({ kicker = 'REWARD', title = 'Reward claimed', subtitle = '', rewards = {}, icon = '★', button = 'Continue', onClose = null }) {
  const bits = [];
  if (rewards.coins) bits.push(`<div class="claim-reward coin" style="--i:0"><span class="cr-ico">◈</span><b>${fmt(rewards.coins)}</b><span>Coins</span></div>`);
  if (rewards.gems) bits.push(`<div class="claim-reward gem" style="--i:1"><span class="cr-ico">◆</span><b>${fmt(rewards.gems)}</b><span>Gems</span></div>`);
  if (rewards.pack) bits.push(`<div class="claim-reward" style="--i:2"><span class="cr-ico">▣</span><b>+1</b><span>${esc(packName(rewards.pack))}</span></div>`);
  if (!bits.length) bits.push(`<div class="claim-reward coin" style="--i:0"><span class="cr-ico">${esc(icon)}</span><b>+1</b><span>Reward</span></div>`);
  openModal(`<div class="claim-modal">
    <div class="cm-kicker">${esc(kicker)}</div>
    <h3>${esc(title)}</h3>
    ${subtitle ? `<div class="cm-sub">${subtitle}</div>` : ''}
    <div class="claim-rewards">${bits.join('')}</div>
    <button class="btn btn-gold" data-close-modal>${esc(button)}</button>
  </div>`, { small: true, onClose });
}

export function openLevelUpModal(entries) {
  const coins = entries.reduce((n, e) => n + e.coins, 0);
  const gems = entries.reduce((n, e) => n + e.gems, 0);
  const last = entries[entries.length - 1];
  openRewardModal({
    kicker: 'COLLECTOR LEVEL UP',
    title: `Level ${last.level}`,
    subtitle: entries.length > 1 ? `You climbed ${entries.length} levels. ${esc(levelTitle(last.level))} unlocked.` : `${esc(levelTitle(last.level))} unlocked. Keep building the vault.`,
    rewards: { coins, gems },
    icon: '★',
    button: 'Keep racing',
  });
}

export function openSettingsModal() {
  const s = getState();
  openModal(`<div class="settings-body">
    <div class="between"><div><div class="cm-kicker" style="color:var(--gold)">APEX RUSH</div><h2 style="font-size:30px;text-transform:uppercase">Settings & save</h2><p class="tiny muted">Local-first collector profile. Everything is stored in this browser.</p></div><span class="chip gold">LV ${s.level} · ${esc(levelTitle(s.level))}</span></div>
    <div class="setting-row"><div><b>Sound effects</b><span>Procedural engine, card and UI audio</span></div><button class="toggle ${s.settings.muted ? '' : 'on'}" data-toggle-sound aria-label="Toggle sound"></button></div>
    <div class="setting-row"><div><b>Collection</b><span>${uniqueCount()} unique · ${s.items.length} total copies · ◈ ${fmt(collectionValue())} vault value</span></div><span class="chip">${s.stats.packsOpened} packs opened</span></div>
    <div class="setting-row"><div><b>Career stats</b><span>${s.stats.cardsPulled} cards pulled · ${s.stats.iconicPulls} iconic · ${s.stats.trades} trades · ${s.stats.cardsSold} sold</span></div><span class="chip">${s.stats.xpEarned} XP earned</span></div>
    <div class="save-block">
      <div class="between"><b class="save-title">Export save</b><button class="btn btn-sm" data-copy-save>Copy code</button></div>
      <textarea id="save-export" class="save-text" readonly>${esc(exportSave())}</textarea>
      <p class="tiny muted">Paste this code into another browser to restore your vault.</p>
    </div>
    <div class="save-block">
      <div class="between"><b class="save-title">Import save</b><button class="btn btn-sm btn-gold" data-import-save>Import</button></div>
      <textarea id="save-import" class="save-text" placeholder="Paste an APEX RUSH save code here…"></textarea>
      <p class="tiny muted">Importing replaces the current profile. Export first if you want a backup.</p>
    </div>
    <div class="setting-actions">
      <button class="btn btn-sm" data-reset-save style="border-color:rgba(255,47,56,.35);color:var(--red-2)">Reset save</button>
      <span class="tiny muted" style="align-self:center">Created ${new Date(s.createdAt).toLocaleDateString()}</span>
    </div>
  </div>`, { small: false });
}

export function openDuplicatesModal() {
  const dupes = duplicateGroups();
  const totalValue = dupes.reduce((n, g) => {
    const sorted = [...g.items].sort((a, b) => FINISH_ORDER.indexOf(a.finish) - FINISH_ORDER.indexOf(b.finish));
    return n + cardValue(g.card, sorted[0]?.finish || 'base') * g.spare;
  }, 0);
  openModal(`<div class="panel-head" style="padding:18px"><h3><span class="bar"></span> Duplicate vault</h3><span class="chip gold">◈ ${fmt(totalValue)} spare value</span></div>
    <div class="sell-list" style="max-height:60vh">
      ${dupes.length ? dupes.map(g => {
        const sorted = [...g.items].sort((a, b) => FINISH_ORDER.indexOf(a.finish) - FINISH_ORDER.indexOf(b.finish));
        const spare = sorted[0];
        return `<div class="sell-row">
          <div class="s-card">${cardHTML(g.card, { finish: spare.finish, cardIdAttr: false })}</div>
          <div><div class="s-name">${esc(g.card.name)}</div><div class="s-meta">${esc(g.card.rarity)} · ${esc(finishName(spare.finish))} · ${g.count} copies</div></div>
          <div class="s-price">◈ ${fmt(cardValue(g.card, spare.finish))}<small>lowest copy</small></div>
          <button class="btn btn-sm" data-sell-item="${spare.uid}" data-card-id="${g.card.id}">Sell</button>
        </div>`;
      }).join('') : emptyState('▤', 'Nothing to sell', 'You do not have any duplicate cards yet.')}
    </div>
    <div class="sell-actions" style="border-top:1px solid var(--line)">
      <button class="btn btn-sm btn-gold" data-sell-all-dupes ${dupes.length ? '' : 'disabled'}>Sell every spare copy</button>
      <button class="btn btn-sm" data-sell-commons>Sell common dupes</button>
    </div>`, { wide: true });
}
