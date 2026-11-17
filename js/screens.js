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
  ungradedItems, gradedCount, supplyInfo, vaultEditions, vaultExclusives,
} from './store.js';
import {
  CARDS, CARD_MAP, ALBUMS, ALBUM_MAP, FEATURED_CARDS, RARITY,
  albumSetSections, CARD_COUNT,
} from './data/index.js';
import { PACKS, PACK_MAP, PACK_CATEGORIES, getPackOfTheDay, getEventPacks, getLiveOffers, packAvailability } from './data/packs.js';
import { DAILY_REWARDS, levelNeeded, levelTitle } from './data/progress.js';
import { FINISHES, TYPE_META } from './data/core.js';
import { setMuted } from './audio.js';
import { expansionView, relicMarketPanel, auctionPanel } from './screens-expansion.js';
import {
  itemMarketValue, gradeLabel, gradeTone,
  GRADING_SERVICES, marketIndex,
} from './pricing.js';
import {
  fmt, esc, cardHTML, slotHTML, miniCardHTML, packHTML, packPriceHTML, oddsRows,
  guaranteeList, finishName, finishShort, serialText, sportClass, sportShort,
  rewardHTML, coinHTML, gemHTML, toast, openModal, closeModal, confirmAction,
  openCardDetail, statBox, emptyState, levelRingHTML, FINISH_ORDER, bestFinishFor,
  packName, packPoolLabel, countdownText, marketTickerHTML, livePriceHTML,
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
          <div><b data-live-vault>◈ ${fmt(collectionValue())}</b><span>Vault value ◈</span></div>
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

    ${marketTickerHTML()}

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
  const tabs = PACK_CATEGORIES;
  const tab = view.packs.tab;
  const list = PACKS.filter(p => p.category !== 'daily' && (tab === 'all' || p.category === tab));
  const featureByTab = {
    all: 'premium', core: 'mega', featured: 'premium', f1: 'f1-premium',
    motogp: 'motogp-premium', exclusive: 'ultimate-legends', event: 'event-monaco',
    special: 'championship', vault: 'vault-signed',
  };
  const events = getEventPacks();
  let feature = PACK_MAP[featureByTab[tab]] || list[0] || PACK_MAP.premium;
  if (tab === 'event') feature = events.find(e => e.available)?.pack || feature;
  const featureAvail = packAvailability(feature);
  const rest = list.filter(p => p.id !== feature.id);
  const offers = getLiveOffers().filter(o => tab === 'all' || o.pack.category === tab || (tab === 'featured' && o.pack.category === 'featured'));
  const potd = getPackOfTheDay(new Date());
  const potdLeft = potdPurchasesLeft();
  const liveEvents = events.filter(e => e.available).length;

  return `<div class="screen" data-screen="packs">
    <div class="page-head">
      <div>
        <div class="eyebrow">Sealed product · factory fresh</div>
        <h1 class="page-title">Pack <em>garage</em></h1>
        <p class="page-sub">Every pack is sealed with a published guarantee and published odds. Chase rare finishes, fill the new 1960s albums, and pull the icons that define two-wheel and four-wheel history.</p>
      </div>
      <div class="page-head-actions">
        <span class="chip gold">${liveEvents} event${liveEvents === 1 ? '' : 's'} live</span>
        <span class="chip">${s.tokens.length} token${s.tokens.length === 1 ? '' : 's'} ready</span>
        <button class="btn btn-sm" data-nav="collection">Vault <span class="ico">→</span></button>
      </div>
    </div>

    <div class="tabs" style="margin-bottom:16px">
      ${tabs.map(({id, label}) => `<button class="${tab === id ? 'active' : ''}" data-pack-tab="${id}">${esc(label)}</button>`).join('')}
    </div>

    <div class="packs-feature">
      <div class="feature-pack" style="--fp-accent:${feature.art?.p1 || '#ff2f38'}">
        <div class="fp-pack">${packHTML(feature)}</div>
        <div class="fp-copy">
          <div class="eyebrow">${feature.category === 'event' ? 'Limited event drop' : feature.category === 'special' ? 'Special edition' : 'Featured series'} · ${esc(packPoolLabel(feature))}</div>
          <h2>${esc(feature.name)}</h2>
          <p>${esc(feature.tagline)} ${esc(feature.desc)}</p>
          <div class="fp-odds">
            ${['iconic', 'legendary', 'epic'].map(r => `<div><b style="color:${RARITY[r].color}">${feature.odds[r] < 1 ? feature.odds[r].toFixed(1) : Math.round(feature.odds[r])}%</b><span>${RARITY[r].label}</span></div>`).join('')}
            <div><b>${feature.cards}</b><span>Cards</span></div>
            <div><b>${feature.guaranteeNew || 0}</b><span>New cards</span></div>
          </div>
          <div class="fp-guarantees">${guaranteeList(feature).slice(0, 3).map(g => `<span class="chip">${esc(g)}</span>`).join('')}</div>
          <div class="fp-buy">
            <button class="btn btn-primary btn-lg" data-open-pack="${feature.id}" ${featureAvail.available ? '' : 'disabled'}>${!featureAvail.available ? esc(featureAvail.label) : packTokenCount(feature.id) ? 'Open with token' : `Open for ${feature.currency === 'gems' ? '◆' : '◈'} ${fmt(feature.cost)}`}</button>
            <button class="btn" data-pack-details="${feature.id}">Odds & contents</button>
            <span class="pack-price-note">${featureAvail.available ? (featureAvail.endsAt ? `Ends in ${countdownText(featureAvail.endsAt)}` : 'Always available') : featureAvail.label}</span>
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
            <button class="btn btn-sm btn-block" data-pack-details="potd" style="margin-top:6px">See today’s odds</button>
          </div>
        </div>
      </div>
    </div>

    ${(tab === 'all' || tab === 'event') ? `<div class="section event-section">
      <div class="section-head"><div><h2>Event drops <span>/ ${events.length}</span></h2><div class="sub">Rotating limited-time packs. Countdowns reset on the daily clock, so a drop always returns.</div></div><span class="chip">${liveEvents} live now</span></div>
      <div class="event-grid">${events.map(eventCard).join('')}</div>
    </div>` : ''}

    ${offers.length ? `<div class="section offer-section">
      <div class="section-head"><div><h2>Rotating offers <span>/ ${offers.length}</span></h2><div class="sub">Prices rotate every hour. The timer is live and the discount is applied at checkout.</div></div><span class="chip red">Resets hourly</span></div>
      <div class="offer-grid">${offers.map(offerCard).join('')}</div>
    </div>` : ''}

    <div class="section">
      <div class="section-head"><div><h2>${tab === 'all' ? 'All packs' : esc(tabs.find(t => t.id === tab)?.label || 'Packs')} <span>/ ${rest.length + 1}</span></h2><div class="sub">Full odds and contents are published before any purchase. Open a pack’s detail card to inspect every guarantee and pool.</div></div></div>
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

function packTag(pack) {
  const tags = {
    premium: 'MOST POPULAR', elite: 'TOP TIER', scavenger: 'DUPES PROTECTED',
    gold: 'GOLD SERIES', legendary: 'EPIC+ ONLY', championship: 'TITLE CHASE',
    limited: 'NUMBERED', iconic: 'THE VAULT', crossover: 'TWO WORLDS',
    choice: 'CHOOSE 1 OF 3', signatures: 'SIGNED', blackout: 'BLACKOUT',
    constructors: 'TEAMS ONLY', 'f1-legend': 'LEGENDS ONLY', 'motogp-legend': 'LEGENDS ONLY',
    heritage: 'CLASSIC ERA', 'event-monaco': 'EVENT', 'event-mugello': 'EVENT',
    'event-nightrace': 'EVENT', 'event-finale': 'EVENT', 'event-heritage': 'EVENT',
    'event-opener': 'EVENT', daily: 'FREE DAILY',
    'f1-legends': 'CAPPED EXCLUSIVE', 'motogp-legends': 'CAPPED EXCLUSIVE',
    'golden-era': 'CAPPED EXCLUSIVE', anniversary: 'CAPPED EXCLUSIVE',
    'hall-of-fame': 'CAPPED EXCLUSIVE', 'ultimate-legends': 'GRAIL VAULT',
    'numbered-collectors': 'NUMBERED', 'vault-signed': 'AUTOGRAPH',
    mini: 'CORE 3', 'standard-tier': 'CORE 5', bronze: 'RARE+', silver: 'SILVER',
    'gold-tier': 'EPIC+', 'elite-tier': 'LEGEND+', ultimate: 'LEGEND+', mega: '15 CARDS',
  };
  if (tags[pack.id]) return tags[pack.id];
  if (pack.category === 'event') return 'LIMITED TIME';
  if (pack.category === 'f1') return 'F1 ONLY';
  if (pack.category === 'motogp') return 'MOTOGP ONLY';
  return '';
}

function eventCard(ev) {
  const pack = ev.pack;
  const tokens = packTokenCount(pack.id);
  return `<div class="event-card ${ev.available ? 'live' : 'locked'}" style="--ev:${pack.art?.p1 || '#ff2f38'}">
    <div class="ec-art">${packHTML(pack)}</div>
    <div class="ec-body">
      <div class="ec-kicker">${ev.available ? 'LIVE EVENT' : 'UPCOMING'} · <b>${esc(ev.label)}</b></div>
      <h3>${esc(pack.name)}</h3>
      <p>${esc(pack.tagline)}</p>
      <div class="ec-odds">
        ${['iconic', 'legendary', 'epic'].map(r => `<span><b style="color:${RARITY[r].color}">${pack.odds[r] < 1 ? pack.odds[r].toFixed(1) : Math.round(pack.odds[r])}%</b> ${RARITY[r].label}</span>`).join('')}
      </div>
      <div class="ec-guarantees">${guaranteeList(pack).slice(0, 2).map(g => `<span class="chip">${esc(g)}</span>`).join('')}</div>
      <div class="ec-foot">
        <span class="ec-price">${tokens ? `▣ TOKEN ×${tokens}` : pack.cost === 0 ? 'FREE' : `${pack.currency === 'gems' ? '◆' : '◈'} ${fmt(pack.cost)}`}</span>
        <button class="btn btn-sm ${ev.available ? 'btn-primary' : ''}" data-open-pack="${pack.id}" ${ev.available ? '' : 'disabled'}>${ev.available ? 'Open now' : 'Locked'}</button>
        <button class="btn btn-sm" data-pack-details="${pack.id}">Details</button>
      </div>
    </div>
  </div>`;
}

function offerCard(offer) {
  const { pack } = offer;
  return `<button class="offer-card" data-open-offer="${offer.baseId}" aria-label="Open ${esc(offer.name)} offer">
    <div class="oc-art">${packHTML(pack)}</div>
    <div class="oc-body">
      <span class="oc-tag">${esc(offer.tag)} · ${esc(countdownText(offer.endsAt))} left</span>
      <b>${esc(offer.name)}</b>
      <span class="oc-extra">${esc(offer.extra)}</span>
      <span class="oc-price"><s>${offer.currency === 'gems' ? '◆' : '◈'} ${fmt(offer.baseCost)}</s> <b>${offer.currency === 'gems' ? '◆' : '◈'} ${fmt(offer.cost)}</b> <em>−${offer.discount}%</em></span>
    </div>
  </button>`;
}

function packTile(pack) {
  const s = getState();
  const tokens = packTokenCount(pack.id);
  const cur = pack.currency === 'gems' ? s.gems : s.coins;
  const avail = packAvailability(pack);
  const affordable = avail.available && (tokens > 0 || pack.cost === 0 || cur >= pack.cost);
  const tag = packTag(pack);
  const guarantees = guaranteeList(pack).slice(0, 2);
  return `<div class="pack-tile${affordable ? '' : ' no-funds'}${avail.available ? '' : ' locked'}">
    <div class="pack-wrap" data-pack-details="${pack.id}" role="button" tabindex="0" aria-label="View ${esc(pack.name)} contents and odds">
      ${tag ? `<span class="pack-tier ${tag === 'MOST POPULAR' ? 'hot' : ''}">${tag}</span>` : ''}
      ${packHTML(pack)}
      ${avail.available ? '' : `<span class="pack-lock">${esc(avail.label)}</span>`}
    </div>
    <div class="pack-info">
      <div class="nm"><span>${esc(pack.name)}</span><span class="tiny muted">${pack.cards} CARDS</span></div>
      <div class="ds">${esc(pack.tagline)}</div>
      <div class="pack-guarantees">${guarantees.map(g => `<span>${esc(g)}</span>`).join('')}</div>
      <div class="buy">
        <div class="price">${packPriceHTML(pack, tokens)}</div>
        <button class="btn btn-sm ${affordable ? 'btn-primary' : ''}" data-open-pack="${pack.id}" ${avail.available ? '' : 'disabled'}>${!avail.available ? 'Locked' : tokens ? 'Open' : pack.cost === 0 ? 'Claim' : 'Buy'}</button>
      </div>
      <button class="pack-details-link" data-pack-details="${pack.id}">Full odds & contents →</button>
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
      const va = ga ? ga.items.reduce((n, i) => n + itemMarketValue(i), 0) : 0;
      const vb = gb ? gb.items.reduce((n, i) => n + itemMarketValue(i), 0) : 0;
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
      ${statBox('Vault value', `<span data-live-vault>◈ ${fmt(collectionValue())}</span>`, 'Live collector valuation', 'green')}
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
          return cardHTML(card, { finish: g.best, serial: best?.serial, count: g.count, itemUid: best?.uid, grading: best?.grading });
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
        <p class="page-sub">${ALBUMS.length} albums. Seven decades. Two disciplines. Collect every card in a set to unlock its reward and stamp your name on motorsport history.</p>
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
   COLLECTOR VAULT
   ------------------------------------------------------------ */
export function vaultScreen() {
  const s = getState();
  const editions = vaultEditions();
  const exclusives = vaultExclusives();
  const ownedAutographs = s.items.filter(i => CARD_MAP[i.cardId]?.autograph).length;
  const ownedExclusives = s.items.filter(i => CARD_MAP[i.cardId]?.exclusive).length;
  const redeemed = s.vault?.redeemed || [];

  return `<div class="screen" data-screen="vault">
    <div class="page-head">
      <div>
        <div class="eyebrow">Collector Vault · member access</div>
        <h1 class="page-title">The <em>Vault</em></h1>
        <p class="page-sub">Exchange Collector Tokens for serialised autograph collectibles, track the permanent supply of every capped edition, and review the certificates attached to your pulls.</p>
      </div>
      <div class="page-head-actions">
        <span class="chip gold token-chip">✦ ${fmt(s.collectorTokens)} Collector Tokens</span>
        <button class="btn btn-sm" data-nav="packs">Open packs <span class="ico">→</span></button>
      </div>
    </div>

    <div class="vault-intro">
      <div class="vi-emblem">✒</div>
      <div>
        <b>Welcome to the Vault</b>
        <p>Collector Tokens are earned through albums, daily rewards and challenges — never bought with real money. Redeem them for fixed-run autograph editions below. Every card is a fictional digital collectible: the signature is illustrated artwork and is not a real autograph or official authentication.</p>
      </div>
      <div class="vi-stats">
        <span><b>${ownedAutographs}</b> autographs</span>
        <span><b>${ownedExclusives}</b> exclusives</span>
        <span><b>${s.vault?.opened || 0}</b> vault opens</span>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><div><h2>Authenticated autograph editions <span>/ 6</span></h2><div class="sub">Six capped editions. Serial numbers and certificate displays are attached to every issued card. One-of-One cards are never available for tokens.</div></div><span class="chip">${editions.reduce((n, e) => n + e.remaining, 0)} copies unissued</span></div>
      <div class="vault-editions">
        ${editions.map(edition => {
          const pct = edition.cap ? Math.round(edition.issued / edition.cap * 100) : 0;
          const examples = edition.cards.slice(0, 3);
          return `<div class="vault-edition" style="--ve:${edition.color};--ve-glow:${edition.glow}">
            <div class="ve-top">
              <span class="ve-short">${esc(edition.short)}</span>
              <span class="ve-mult">×${edition.multiplier} value</span>
            </div>
            <h3>${esc(edition.name)}</h3>
            <p class="ve-note">${esc(edition.cards[0]?.autographNote || 'Authenticated-style digital autograph collectible')}</p>
            <div class="ve-cards">${examples.map(card => `<div class="ve-card" data-open-card="${esc(card.id)}" title="${esc(card.name)}">${miniCardHTML(card, card.finish)}</div>`).join('')}</div>
            <div class="ve-supply">
              <div class="ves-head"><span>Supply</span><b>${edition.issued} / ${edition.cap}</b></div>
              <div class="ves-track"><i style="width:${pct}%"></i></div>
              <div class="ves-sub"><span>${edition.remaining} remaining</span><span>${edition.owned} in your vault</span></div>
            </div>
            <div class="ve-foot">
              ${edition.purchasable ? `<button class="btn btn-sm btn-gold" data-redeem-vault="${esc(edition.id)}" ${edition.remaining <= 0 || s.collectorTokens < edition.tokens ? 'disabled' : ''}>${edition.remaining <= 0 ? 'Sold out' : `Redeem · ✦ ${fmt(edition.tokens)}`}</button>` : `<span class="ve-lock">NOT FOR TOKENS · 1 OF 1</span>`}
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-head"><div><h2>Exclusive supply register <span>/ ${exclusives.length}</span></h2><div class="sub">Pack-only editions with permanent global caps. Ownership and remaining supply are shown for every card.</div></div><span class="chip">${exclusives.reduce((n, e) => n + e.remaining, 0)} copies unissued</span></div>
      <div class="vault-register">
        ${exclusives.map(({ card, cap, issued, remaining, owned }) => `<div class="vr-row" data-open-card="${esc(card.id)}">
          <div class="vr-card">${miniCardHTML(card, card.finish)}</div>
          <div class="vr-name"><b>${esc(card.name)}</b><span>${esc(card.edition || 'Exclusive')} · ${esc(card.sport === 'motogp' ? 'MotoGP' : 'Formula 1')}</span></div>
          <div class="vr-edition">${esc(card.tagline || '')}</div>
          <div class="vr-supply"><b>${issued} / ${cap}</b><span>${remaining} left · ${owned} owned</span></div>
          <div class="vr-bar"><i style="width:${cap ? Math.round(issued / cap * 100) : 0}%"></i></div>
        </div>`).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-head"><div><h2>Your certificates <span>/ ${redeemed.length}</span></h2><div class="sub">A permanent record of vault redemptions. Serials remain retired if a card leaves your vault.</div></div></div>
      <div class="vault-certs">
        ${redeemed.length ? redeemed.slice(0, 12).map(entry => {
          const card = CARD_MAP[entry.cardId];
          if (!card) return '';
          return `<div class="vault-cert" data-open-card="${esc(card.id)}">
            <span class="vc-kicker">DIGITAL CERTIFICATE · ${esc(card.editionMeta?.short || 'AUTOGRAPH')}</span>
            <b>${esc(card.name)}</b>
            <span class="vc-serial">${esc(serialText(entry.serial, card))} · ${esc(card.edition)}</span>
            <span class="vc-date">${new Date(entry.at).toLocaleDateString()}</span>
          </div>`;
        }).join('') : emptyState('✒', 'No certificates yet', 'Complete albums and challenges to earn Collector Tokens, then redeem an autograph edition above.', `<button class="btn btn-sm btn-gold" data-nav="albums">Complete albums</button>`)}
      </div>
    </div>
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
  const idx = marketIndex();
  const queue = ungradedItems(300).slice(0, 6);
  const graded = gradedCount();
  const tab = expansionView.market.tab;
  const tabs = `<div class="market-tabs">
    <button class="${tab === 'cards' ? 'active' : ''}" data-market-tab="cards">Trading cards</button>
    <button class="${tab === 'relics' ? 'active' : ''}" data-market-tab="relics">Memorabilia & merchandise</button>
    <button class="${tab === 'auctions' ? 'active' : ''}" data-market-tab="auctions">Rare auctions</button>
  </div>`;
  if (tab !== 'cards') {
    return `<div class="screen" data-screen="market">
      <div class="page-head"><div><div class="eyebrow">Collector market · simulated exchange</div>
        <h1 class="page-title">Market<em>place</em></h1>
        <p class="page-sub">Cards, collectibles and rare artefacts in one exchange. Listings, rival bidders and sale history are simulated locally in your save.</p></div>
        <div class="page-head-actions"><span class="chip gold">◈ ${fmt(s.coins)} balance</span></div></div>
      ${tabs}
      ${tab === 'relics' ? relicMarketPanel() : auctionPanel()}
    </div>`;
  }
  return `<div class="screen" data-screen="market">
    <div class="page-head">
      <div>
        <div class="eyebrow">Collector market · lot ${s.market.seed + 1}</div>
        <h1 class="page-title">Market<em>place</em></h1>
        <p class="page-sub">Eight hand-picked singles from collectors around the paddock. Prices drift live with demand, rarity and finish. Refresh the lot, sell duplicates or send a card to the grading lab.</p>
      </div>
      <div class="page-head-actions"><span class="chip gold">◈ ${fmt(total)} listed</span><button class="btn btn-sm" data-refresh-market>↻ Refresh · ◈ 250</button></div>
    </div>

    ${marketTickerHTML()}
    ${tabs}

    <div class="market-hero">
      <div><h3>Today’s market</h3><p>${listings.filter(l => !l.bought).length} active listings · ${graded} graded slab${graded === 1 ? '' : 's'} in your vault · buys are final</p></div>
      <div class="market-refresh"><b>${idx.value.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</b>APEX 100 · <span class="${idx.direction}">${idx.change >= 0 ? '+' : ''}${idx.change.toFixed(1)}%</span></div>
    </div>

    <div class="market-cols">
      <div class="listing-grid">
        ${listings.map(l => {
          const canBuy = !l.bought && s.coins >= l.price;
          return `<div class="listing ${l.bought ? 'sold' : ''}${l.grading ? ' graded-listing' : ''}">
            <div class="l-card" data-open-card="${l.card.id}">${cardHTML(l.card, { finish: l.finish, cardIdAttr: false, grading: l.grading })}</div>
            <div class="l-body">
              <div class="l-name">${esc(l.card.name)}${l.collectible ? `<span class="collectible-tag">CAPPED COLLECTIBLE</span>` : ''}</div>
              <div class="l-meta"><span class="rarity-dot rar-${l.card.rarity}"></span>${esc(l.card.rarity)} <span style="opacity:.4">/</span> ${esc(l.card.edition || finishName(l.finish))} <span style="opacity:.4">/</span> ${esc(l.seller)}${l.card.supply ? ` <span class="supply-pill">${l.card.supply}-copy run</span>` : ''}${l.grading ? ` <span class="grade-pill" style="color:${gradeTone(l.grading.score)}">${l.grading.score} ${esc(gradeLabel(l.grading.score))}</span>` : ''}</div>
              <div class="l-price"><span class="live-listing" data-live-listing data-price-card="${esc(l.card.id)}" data-listing-finish="${esc(l.finish)}" data-listing-grade="${l.grading?.score || ''}" data-listing-spread="${l.spread}" data-listing-id="${esc(l.id)}" data-live-value="${l.price}">◈ ${fmt(l.price)}</span> ${l.finish !== 'base' ? `<span class="strike">◈ ${fmt(l.rawPrice)}</span>` : ''}</div>
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
            const sorted = [...g.items].sort((a, b) => itemMarketValue(a) - itemMarketValue(b));
            const spare = sorted[0];
            return `<div class="sell-row">
              <div class="s-card">${cardHTML(g.card, { finish: spare.finish, cardIdAttr: false, grading: spare.grading })}</div>
              <div><div class="s-name">${esc(g.card.name)}</div><div class="s-meta">${esc(g.card.rarity)} · ${esc(finishName(spare.finish))}${spare.grading ? ' · graded ' + spare.grading.score : ''} · ${g.count} copies</div></div>
              <div class="s-price">${livePriceHTML(g.card, spare.finish, { grading: spare.grading })}<small>spare copy</small></div>
              <button class="btn btn-sm" data-sell-item="${spare.uid}" data-card-id="${g.card.id}">Sell</button>
            </div>`;
          }).join('') : emptyState('⇄', 'No duplicates yet', 'Pull another copy of a card and you can sell the spare here.', `<button class="btn btn-sm" data-nav="packs">Open packs</button>`)}
        </div>
        <div class="sell-actions">
          <button class="btn btn-sm" data-sell-all-dupes ${dupes.length ? '' : 'disabled'}>Sell all duplicates</button>
          <button class="btn btn-sm" data-sell-commons ${dupes.some(g => g.card.rarity === 'common') ? '' : 'disabled'}>Sell common dupes</button>
        </div>
      </div>
    </div>

    <div class="market-history" id="market-history">
      <div class="panel">
        <div class="panel-head"><h3><span class="bar"></span> Collectible listing & sale history</h3><span class="chip">${s.market.history.length} records</span></div>
        ${s.market.history.length ? `<div class="mh-list">${s.market.history.slice(0, 10).map(h => {
          const card = CARD_MAP[h.cardId];
          if (!card) return '';
          return `<div class="mh-row">
            <span class="mh-type ${esc(h.type)}">${h.type === 'buy' ? 'BOUGHT' : 'SOLD'}</span>
            <div class="mh-card" data-open-card="${esc(card.id)}">${miniCardHTML(card, h.finish)}</div>
            <div class="mh-name"><b>${esc(card.name)}</b><span>${esc(card.edition || finishName(h.finish))}${h.serial != null ? ` · ${esc(serialText(h.serial, card))}` : ''}</span></div>
            <span class="mh-party">${h.type === 'buy' ? 'from ' : 'to '}${esc(h.buyer || 'collector')}</span>
            <b class="mh-price">◈ ${fmt(h.price)}</b>
            <span class="mh-date">${new Date(h.at).toLocaleDateString()}</span>
          </div>`;
        }).join('')}</div>` : emptyState('◷', 'No sales recorded yet', 'Buys and sales of collectible listings appear here permanently.', `<button class="btn btn-sm" data-nav="packs">Browse packs</button>`)}
      </div>
      <div class="panel">
        <div class="panel-head"><h3><span class="bar"></span> Trade history</h3><span class="chip">${s.tradeHistory.length} trades</span></div>
        ${s.tradeHistory.length ? `<div class="mh-list">${s.tradeHistory.slice(0, 10).map(t => {
          const gave = CARD_MAP[t.gaveCardId], got = CARD_MAP[t.gotCardId];
          return `<div class="mh-row trade">
            <span class="mh-type trade">TRADE</span>
            <div class="mh-name"><b>${esc(gave?.name || 'Card')} → ${esc(got?.name || 'Card')}</b><span>${esc(t.trader)} · ${esc(got?.edition || finishName(t.gotFinish) || 'Standard')}</span></div>
            <b class="mh-price">◈ ${fmt(t.value || 0)}</b>
            <span class="mh-date">${new Date(t.at).toLocaleDateString()}</span>
          </div>`;
        }).join('')}</div>` : emptyState('⇆', 'No trades completed yet', 'Accepted offers from the trade floor will be recorded here.', `<button class="btn btn-sm" data-nav="trade">Visit trade floor</button>`)}
      </div>
    </div>

    <section class="panel grading-lab">
      <div class="panel-head">
        <h3><span class="bar"></span> Grading lab</h3>
        <div class="gl-head-right">
          <span class="chip gold">${graded} slab${graded === 1 ? '' : 's'} certified</span>
          <span class="chip">${queue.length} high-value raw cards ready</span>
        </div>
      </div>
      <div class="gl-intro">
        <div class="gl-copy">
          <b>Seal a card in an APEX slab</b>
          <p>Grading is permanent. Each service rolls centering, corners, edges and surface into a 1–10 grade. Grade 8+ lifts the card’s market value; low grades can hurt it, so only grade cards you believe in.</p>
        </div>
        <div class="gl-services">
          ${GRADING_SERVICES.map(svc => `<div class="gl-service">
            <span>${esc(svc.company)} · ${esc(svc.name)}</span>
            <b>${svc.currency === 'gems' ? '◆' : '◈'} ${fmt(svc.cost)}</b>
            <em>${esc(svc.desc)}</em>
          </div>`).join('')}
        </div>
      </div>
      ${queue.length ? `<div class="grade-queue">
        ${queue.map(({ item, card }) => `<div class="grade-queue-row">
          <div class="gq-card" data-open-card="${esc(card.id)}">${cardHTML(card, { finish: item.finish, cardIdAttr: false })}</div>
          <div class="gq-body">
            <b>${esc(card.name)}</b>
            <span>${esc(card.rarity)} · ${esc(finishName(item.finish))} · raw</span>
            <div class="gq-val">${livePriceHTML(card, item.finish)}</div>
          </div>
          <div class="gq-actions">
            ${GRADING_SERVICES.map(svc => `<button class="grade-mini" data-grade-item="${esc(item.uid)}" data-grade-service="${esc(svc.id)}" data-grade-card="${esc(card.id)}">${esc(svc.name)} <b>${svc.currency === 'gems' ? '◆' : '◈'}${fmt(svc.cost)}</b></button>`).join('')}
          </div>
        </div>`).join('')}
      </div>` : emptyState('◎', 'No raw cards worth grading yet', 'Pull a rarer card or a premium finish and it will appear in the grading queue.', `<button class="btn btn-sm btn-primary" data-nav="packs">Open packs</button>`)}
    </section>
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
        ${cardHTML(o.want, { finish: o.wantFinish, serial: o.wantItem.serial, cardIdAttr: false, grading: o.wantItem.grading })}
        <div class="ts-txt"><span>You give</span><b>${esc(o.want.name)}</b><div class="val">${esc(finishName(o.wantFinish))}${o.wantItem.grading ? ' · graded ' + o.wantItem.grading.score : ''} · ◈ ${fmt(o.wantValue)}</div></div>
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
  if (rewards.tokens) bits.push(`<div class="claim-reward token" style="--i:2"><span class="cr-ico">✦</span><b>${fmt(rewards.tokens)}</b><span>Collector Tokens</span></div>`);
  if (rewards.pack) bits.push(`<div class="claim-reward" style="--i:3"><span class="cr-ico">▣</span><b>+1</b><span>${esc(packName(rewards.pack))}</span></div>`);
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
    <div class="setting-row"><div><b>Collection</b><span>${uniqueCount()} unique · ${s.items.length} total copies · ${gradedCount()} graded · ◈ ${fmt(collectionValue())} vault value</span></div><span class="chip">${s.stats.packsOpened} packs opened</span></div>
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
    const sorted = [...g.items].sort((a, b) => itemMarketValue(a) - itemMarketValue(b));
    return n + itemMarketValue(sorted[0]) * g.spare;
  }, 0);
  openModal(`<div class="panel-head" style="padding:18px"><h3><span class="bar"></span> Duplicate vault</h3><span class="chip gold">◈ ${fmt(totalValue)} spare value</span></div>
    <div class="sell-list" style="max-height:60vh">
      ${dupes.length ? dupes.map(g => {
        const sorted = [...g.items].sort((a, b) => itemMarketValue(a) - itemMarketValue(b));
        const spare = sorted[0];
        return `<div class="sell-row">
          <div class="s-card">${cardHTML(g.card, { finish: spare.finish, cardIdAttr: false, grading: spare.grading })}</div>
          <div><div class="s-name">${esc(g.card.name)}</div><div class="s-meta">${esc(g.card.rarity)} · ${esc(finishName(spare.finish))}${spare.grading ? ' · graded ' + spare.grading.score : ''} · ${g.count} copies</div></div>
          <div class="s-price">${livePriceHTML(g.card, spare.finish, { grading: spare.grading })}<small>lowest copy</small></div>
          <button class="btn btn-sm" data-sell-item="${spare.uid}" data-card-id="${g.card.id}">Sell</button>
        </div>`;
      }).join('') : emptyState('▤', 'Nothing to sell', 'You do not have any duplicate cards yet.')}
    </div>
    <div class="sell-actions" style="border-top:1px solid var(--line)">
      <button class="btn btn-sm btn-gold" data-sell-all-dupes ${dupes.length ? '' : 'disabled'}>Sell every spare copy</button>
      <button class="btn btn-sm" data-sell-commons ${dupes.some(g => g.card.rarity === 'common') ? '' : 'disabled'}>Sell common dupes</button>
    </div>`, { wide: true });
}
