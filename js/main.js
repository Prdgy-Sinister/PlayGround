/* ============================================================
   APEX RUSH — app bootstrap, router, interaction wiring
   ============================================================ */
import {
  getState, subscribe, openPack, itemsOfCard, setFavorite, sellItem,
  sellAllDuplicates, sellAllCommons, claimAlbum, claimDaily, claimChallenge,
  claimAllAvailable, buyListing, refreshMarket, acceptTrade, refreshTrades,
  dailyStatus, dailyChallenges, achievements, xpProgress, uniqueCount,
  exportSave, importSave, resetSave, toggleMuted, collectionValue,
  gradeItem,
} from './store.js';
import {
  homeScreen, packsScreen, collectionScreen, albumsScreen, albumDetailScreen,
  dailyScreen, challengesScreen, marketScreen, tradeScreen, view,
  clearCollectionFilters, openRewardModal, openLevelUpModal,
  openSettingsModal, openDuplicatesModal,
} from './screens.js';
import { CARD_COUNT, CARD_MAP } from './data/index.js';
import { PACK_MAP, getPackOfTheDay, getLiveOffers } from './data/packs.js';
import { sfx, setMuted } from './audio.js';
import {
  fmt, esc, toast, openCardDetail, closeModal, confirmAction, initFx, openPackDetails,
  refreshLivePrices,
} from './ui.js';
import { showOpening, isOpening } from './opening.js';
import { GRADING_SERVICES } from './pricing.js';
import { localDateKey, msUntilMidnight } from './data/progress.js';

const $ = id => document.getElementById(id);
const main = $('main');
let lastDay = localDateKey(new Date());
let lastLevelUps = [];

/* ------------------------------------------------------------
   ROUTING
   ------------------------------------------------------------ */
const PAGES = {
  home: homeScreen, packs: packsScreen, collection: collectionScreen,
  albums: albumsScreen, daily: dailyScreen, challenges: challengesScreen,
  market: marketScreen, trade: tradeScreen,
};
const TITLES = {
  home: 'Garage', packs: 'Pack Garage', collection: 'Collection',
  albums: 'Albums', daily: 'Daily Hub', challenges: 'Challenges',
  market: 'Marketplace', trade: 'Trade Floor',
};

function parseRoute() {
  const raw = (location.hash || '').replace(/^#\/?/, '').trim();
  const [page, param] = raw.split('/');
  if (page === 'album' && param) return { page: 'album', param };
  return { page: PAGES[page] ? page : 'home', param: '' };
}

function render(opts = {}) {
  const route = parseRoute();
  const s = getState();
  let html = '';
  try {
    if (route.page === 'album') html = albumDetailScreen(route.param);
    else html = PAGES[route.page]();
  } catch (err) {
    console.error(err);
    html = `<div class="screen"><div class="empty-state"><div class="big">⚠</div><h4>That screen hit the gravel</h4><p>${esc(err.message)}</p><button class="btn btn-primary" data-nav="home">Back to garage</button></div></div>`;
  }
  main.innerHTML = html;
  const active = route.page === 'album' ? 'albums' : route.page;
  document.querySelectorAll('#nav-main [data-nav], #mobile-nav [data-nav]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.nav === active);
  });
  document.title = `${TITLES[active] || 'Garage'} · APEX RUSH`;
  updateChrome(s);
  if (opts.scroll !== false) {
    window.scrollTo({ top: 0, behavior: opts.smooth ? 'smooth' : 'auto' });
    main.focus({ preventScroll: true });
  }
  flushLevelUps();
}

function navigate(path) {
  if (isOpening()) return;
  closeModal();
  sfx.tab();
  const target = path.startsWith('#') ? path : '#/' + path;
  if (location.hash === target) render();
  else location.hash = target;
}

/* ------------------------------------------------------------
   HEADER / BADGES / CLOCK
   ------------------------------------------------------------ */
function updateChrome(s = getState()) {
  const coins = $('coin-val'), gems = $('gem-val'), lv = $('level-val'), xp = $('xp-fill');
  if (coins) coins.textContent = fmt(s.coins);
  if (gems) gems.textContent = fmt(s.gems);
  if (lv) lv.textContent = s.level;
  const p = xpProgress(s);
  if (xp) xp.style.width = p.pct + '%';
  const chip = $('level-chip');
  if (chip) chip.title = `${p.current} / ${p.need} XP to level ${s.level + 1}`;

  const uniq = uniqueCount();
  const pct = CARD_COUNT ? Math.round(uniq / CARD_COUNT * 100) : 0;
  if ($('side-progress-pct')) $('side-progress-pct').textContent = pct + '%';
  if ($('side-progress-bar')) $('side-progress-bar').style.width = pct + '%';
  if ($('side-progress-count')) $('side-progress-count').textContent = `${uniq} / ${CARD_COUNT} cards`;

  const ds = dailyStatus();
  const claimableChallenges = [...dailyChallenges(), ...achievements()].filter(c => c.completed && !c.claimed).length;
  badge($('daily-badge'), ds.canClaim || ds.packAvailable);
  badge($('challenge-badge'), claimableChallenges > 0);
  badge($('nav-packs-dot'), ds.packAvailable || s.tokens.length > 0, true);
  const sound = $('sound-toggle');
  if (sound) sound.classList.toggle('off', !!s.settings.muted);
  document.body.classList.toggle('muted', !!s.settings.muted);
}

function badge(el, show, isDot = false) {
  if (!el) return;
  el.classList.toggle('hidden', !show);
  if (isDot) el.style.display = show ? 'block' : 'none';
  if (!isDot) el.textContent = show ? '!' : '';
}

function clock() {
  const ms = msUntilMidnight(new Date());
  const total = Math.floor(ms / 1000);
  const text = [Math.floor(total / 3600), Math.floor(total % 3600 / 60), total % 60]
    .map(n => String(n).padStart(2, '0')).join(':');
  const top = $('daily-clock');
  if (top) top.textContent = text;
  const inline = $('daily-reset-inline');
  if (inline) inline.textContent = text;
  const day = localDateKey(new Date());
  if (day !== lastDay) {
    lastDay = day;
    render({ scroll: false });
    toast('gold', 'New day, new drops', 'Daily reward, free pack and objectives have reset.', '☀');
  }
}

/* ------------------------------------------------------------
   LIVE MARKET TICK
   ------------------------------------------------------------ */
function tickLivePrices() {
  refreshLivePrices();
  const now = Date.now();
  document.querySelectorAll('[data-live-vault]').forEach(el => {
    el.textContent = `◈ ${fmt(collectionValue(now))}`;
  });
  const coins = getState().coins;
  document.querySelectorAll('[data-live-listing]').forEach(el => {
    const price = Number(el.dataset.liveValue) || 0;
    const id = el.dataset.listingId;
    const btn = id ? document.querySelector(`[data-buy-listing="${CSS.escape(id)}"]`) : null;
    if (!btn || btn.textContent.trim() === 'Sold') return;
    const afford = coins >= price;
    btn.disabled = !afford;
    btn.textContent = afford ? 'Buy' : 'Need coins';
  });
}

/* ------------------------------------------------------------
   PACK OPENING
   ------------------------------------------------------------ */
function openPackFlow(packId, deal = null) {
  if (isOpening()) return;
  let res;
  try {
    res = openPack(packId, deal ? { deal } : {});
    sfx.buy();
    if (res.usedToken) toast('cyan', 'Token redeemed', 'A sealed pack token was used from your inventory.', '▣');
    showOpening(res, { onClose: () => { render({ scroll: false }); queueLevels(res.levelUps); } });
  } catch (err) {
    sfx.error();
    const messages = {
      NOT_ENOUGH_COINS: 'You need more coins. Sell duplicates or claim daily rewards.',
      NOT_ENOUGH_GEMS: 'You need more gems. Complete albums and objectives to earn them.',
      DAILY_USED: 'The free daily pack is already claimed. It returns at midnight.',
      POTD_LIMIT: 'You have opened all three Pack of the Day pulls. Back tomorrow.',
      PACK_LOCKED: 'That event pack is not live right now. Check its countdown in the garage.',
      NO_PACK: 'That pack is not available.',
    };
    toast('red', 'Could not open pack', messages[err.code] || err.message, '!');
  }
}

function queueLevels(levels) {
  if (!levels || !levels.length) return;
  lastLevelUps.push(...levels);
  flushLevelUps();
}
function flushLevelUps() {
  if (!lastLevelUps.length || isOpening()) return;
  if (document.querySelector('.modal-backdrop')) return;
  const levels = lastLevelUps.splice(0, lastLevelUps.length);
  sfx.levelup();
  openLevelUpModal(levels);
}

/* ------------------------------------------------------------
   CARDS
   ------------------------------------------------------------ */
function openCard(id, itemUid) {
  const card = CARD_MAP[id];
  if (!card) return;
  const items = itemsOfCard(id);
  openCardDetail(card, items, { itemUid, favorite: getState().favorite === id });
}

function afterSale(message) {
  sfx.sell();
  toast('gold', 'Sold to the market', message, '◈');
  render({ scroll: false });
}

/* ------------------------------------------------------------
   REWARDS
   ------------------------------------------------------------ */
function claimResult(res, kicker, title, subtitle) {
  sfx.claim();
  openRewardModal({
    kicker, title,
    subtitle,
    rewards: res.reward || res.def?.reward || {},
    icon: '★',
    onClose: () => queueLevels(res.levelUps),
  });
  render({ scroll: false });
}

function claimDailyReward() {
  try {
    const res = claimDaily();
    if (res.reward.pack) sfx.gem();
    claimResult(res, 'DAILY REWARD', res.reward.name,
      `Day ${res.day} · ${res.streak}-day streak. ${esc(res.reward.desc)}`);
  } catch (err) {
    sfx.error();
    toast('red', 'Already claimed', err.code === 'ALREADY_CLAIMED' ? 'The daily reward returns at midnight.' : err.message, '!');
  }
}

function claimOne(id, kind) {
  try {
    const res = claimChallenge(id, kind);
    claimResult(res, kind === 'daily' ? 'DAILY OBJECTIVE' : 'CAREER ACHIEVEMENT',
      res.def.title, `${res.def.desc}. Claimed at ${res.def.progress} / ${res.def.goal}.`);
  } catch (err) {
    sfx.error();
    toast('red', 'Cannot claim yet', err.message, '!');
  }
}

function claimAll() {
  try {
    const res = claimAllAvailable();
    if (!res.count) { toast('gold', 'Nothing to claim', 'Complete objectives and achievements first.', '◎'); return; }
    sfx.fanfare();
    openRewardModal({
      kicker: 'ALL REWARDS COLLECTED',
      title: `${res.count} reward${res.count === 1 ? '' : 's'} claimed`,
      subtitle: 'Every completed daily objective and career achievement has been banked.',
      rewards: { coins: res.coins, gems: res.gems, pack: res.packs ? 'gold' : null },
      onClose: () => queueLevels(res.levelUps),
    });
    render({ scroll: false });
  } catch (err) {
    sfx.error();
    toast('red', 'Claim failed', err.message, '!');
  }
}

function claimAlbumReward(id) {
  try {
    const res = claimAlbum(id);
    sfx.fanfare();
    openRewardModal({
      kicker: 'ALBUM COMPLETE',
      title: res.album.name,
      subtitle: `Every card collected. ${res.album.desc}`,
      rewards: res.reward,
      onClose: () => queueLevels(res.levelUps),
    });
    render({ scroll: false });
  } catch (err) {
    sfx.error();
    toast('red', 'Reward unavailable', err.message, '!');
  }
}

/* ------------------------------------------------------------
   CLICK DELEGATION
   ------------------------------------------------------------ */
document.addEventListener('click', ev => {
  const t = ev.target;
  if (!(t instanceof Element)) return;
  const el = sel => t.closest(sel);

  const nav = el('[data-nav]');
  if (nav) { ev.preventDefault(); navigate(nav.dataset.nav); return; }

  if (el('[data-close-modal]')) { closeModal(); return; }

  const packTrigger = el('[data-open-pack]');
  if (packTrigger) { ev.preventDefault(); closeModal(); openPackFlow(packTrigger.dataset.openPack); return; }

  const packDetails = el('[data-pack-details]');
  if (packDetails) {
    ev.preventDefault();
    const id = packDetails.dataset.packDetails;
    const pack = id === 'potd' ? getPackOfTheDay(new Date()) : PACK_MAP[id];
    if (pack) { sfx.tab(); openPackDetails(pack); }
    return;
  }

  const offerTrigger = el('[data-open-offer]');
  if (offerTrigger) {
    ev.preventDefault();
    const baseId = offerTrigger.dataset.openOffer;
    const deal = getLiveOffers().find(o => o.baseId === baseId) || null;
    closeModal();
    openPackFlow(baseId, deal);
    return;
  }

  const mode = el('[data-collection-mode]');
  if (mode) { view.collection.mode = mode.dataset.collectionMode; sfx.tab(); render(); return; }

  const packTab = el('[data-pack-tab]');
  if (packTab) { view.packs.tab = packTab.dataset.packTab; sfx.tab(); render(); return; }

  const albumFilter = el('[data-album-filter]');
  if (albumFilter) { view.albums.sport = albumFilter.dataset.albumFilter; sfx.tab(); render(); return; }

  if (el('[data-collection-clear]')) { clearCollectionFilters(); render(); return; }

  const album = el('[data-open-album]');
  if (album) { sfx.tab(); location.hash = '#/album/' + album.dataset.openAlbum; return; }

  const settings = el('[data-open-settings]') || el('[data-action="open-settings"]');
  if (settings) { sfx.tab(); openSettingsModal(); return; }

  const card = el('[data-open-card]');
  if (card) {
    sfx.tab();
    openCard(card.dataset.openCard, card.dataset.item || el('[data-item]')?.dataset.item);
    return;
  }

  const fav = el('[data-fav]');
  if (fav) {
    const id = fav.dataset.fav;
    setFavorite(id);
    sfx.click();
    closeModal();
    setTimeout(() => openCard(id), 20);
    return;
  }

  const gradeBtn = el('[data-grade-item]');
  if (gradeBtn) {
    const uid = gradeBtn.dataset.gradeItem;
    const cardId = gradeBtn.dataset.gradeCard;
    const card = CARD_MAP[cardId];
    const svc = GRADING_SERVICES.find(s => s.id === gradeBtn.dataset.gradeService);
    if (!card || !svc) return;
    const fee = `${svc.currency === 'gems' ? '◆' : '◈'} ${fmt(svc.cost)}`;
    confirmAction({
      title: `Grade ${card.name}?`,
      body: `${svc.company} · ${svc.name} costs ${fee}. Grading is permanent. Grade 8+ lifts market value; lower grades can reduce it.`,
      confirmText: `Grade · ${fee}`,
      onConfirm: () => {
        try {
          const res = gradeItem(uid, svc.id);
          sfx.fanfare();
          toast('gold', `Grade ${res.grading.score} · ${res.grading.label}`, `${card.name} is now sealed in an ${res.grading.company} slab (${res.grading.cert}).`, '◎');
          closeModal();
          setTimeout(() => openCard(cardId, uid), 40);
        } catch (err) {
          sfx.error();
          toast('red', 'Grading failed', err.message, '!');
        }
      },
    });
    return;
  }

  const sellOne = el('[data-sell-one]');
  if (sellOne) {
    const uid = sellOne.dataset.sellOne;
    try {
      const res = sellItem(uid);
      closeModal();
      afterSale(`${res.card.name} · ${fmt(res.value)} coins returned.`);
    } catch (err) { sfx.error(); toast('red', 'Cannot sell card', err.message, '!'); }
    return;
  }

  const sellDupesCard = el('[data-sell-dupes-card]');
  if (sellDupesCard) {
    const cardId = sellDupesCard.dataset.sellDupesCard;
    confirmAction({
      title: 'Sell every spare copy?',
      body: 'One copy of this card stays in your vault. All duplicates are sold at collector value.',
      confirmText: 'Sell duplicates',
      onConfirm: () => {
        const res = sellAllDuplicates(c => c.id === cardId);
        closeModal();
        afterSale(res.count ? `${res.count} card${res.count === 1 ? '' : 's'} sold for ◈ ${fmt(res.total)}.` : 'No spare copies were found.');
      },
    });
    return;
  }

  if (el('[data-sell-dupes]')) { openDuplicatesModal(); return; }

  const sellItemBtn = el('[data-sell-item]');
  if (sellItemBtn) {
    try {
      const res = sellItem(sellItemBtn.dataset.sellItem);
      closeModal();
      afterSale(`${res.card.name} · ${fmt(res.value)} coins returned.`);
    } catch (err) { sfx.error(); toast('red', 'Cannot sell card', err.message, '!'); }
    return;
  }

  if (el('[data-sell-all-dupes]')) {
    confirmAction({
      title: 'Sell every duplicate?',
      body: 'Your best copy of every card is protected. All spare copies are sold at collector value.',
      confirmText: 'Sell all duplicates',
      onConfirm: () => {
        const res = sellAllDuplicates();
        closeModal();
        afterSale(res.count ? `${res.count} cards sold for ◈ ${fmt(res.total)}.` : 'There were no duplicates to sell.');
      },
    });
    return;
  }

  if (el('[data-sell-commons]')) {
    const res = sellAllCommons();
    closeModal();
    afterSale(res.count ? `${res.count} common duplicates sold for ◈ ${fmt(res.total)}.` : 'No common duplicates to sell.');
    return;
  }

  const claimDailyBtn = el('[data-claim-daily]');
  if (claimDailyBtn) { claimDailyReward(); return; }

  const claimChallengeBtn = el('[data-claim-challenge]');
  if (claimChallengeBtn) { claimOne(claimChallengeBtn.dataset.claimChallenge, claimChallengeBtn.dataset.kind || 'daily'); return; }

  if (el('[data-claim-all]')) { claimAll(); return; }

  const claimAlbumBtn = el('[data-claim-album]');
  if (claimAlbumBtn) { claimAlbumReward(claimAlbumBtn.dataset.claimAlbum); return; }

  const buyBtn = el('[data-buy-listing]');
  if (buyBtn) {
    try {
      const res = buyListing(buyBtn.dataset.buyListing);
      sfx.buy();
      toast('gold', 'Listing purchased', `${res.listing.card.name} · ${fmt(res.listing.price)} coins.`, '◫');
      render({ scroll: false });
    } catch (err) { sfx.error(); toast('red', 'Purchase failed', err.message, '!'); }
    return;
  }

  if (el('[data-refresh-market]')) {
    try {
      refreshMarket();
      sfx.coin();
      toast('cyan', 'Market refreshed', 'A new lot of eight singles is on the floor.', '◫');
      render({ scroll: false });
    } catch (err) { sfx.error(); toast('red', 'Cannot refresh', err.message, '!'); }
    return;
  }

  const tradeBtn = el('[data-accept-trade]');
  if (tradeBtn) {
    try {
      const res = acceptTrade(tradeBtn.dataset.acceptTrade);
      sfx.trade();
      toast('green', 'Trade complete', `${res.offer.want.name} → ${res.offer.give.name}.`, '⇆');
      render({ scroll: false });
    } catch (err) { sfx.error(); toast('red', 'Trade failed', err.message, '!'); }
    return;
  }

  if (el('[data-refresh-trades]')) {
    refreshTrades();
    sfx.tab();
    toast('cyan', 'New offers found', 'Collectors refreshed their trade blocks.', '⇆');
    render({ scroll: false });
    return;
  }

  if (el('[data-toggle-sound]')) {
    const muted = toggleMuted();
    setMuted(muted);
    updateChrome();
    if (!muted) sfx.click();
    return;
  }

  if (el('[data-copy-save]')) {
    const code = exportSave();
    navigator.clipboard?.writeText(code).then(
      () => toast('green', 'Save copied', 'Your collector profile is on the clipboard.', '✓'),
      () => toast('red', 'Copy failed', 'Select the code and copy it manually.', '!'),
    );
    return;
  }

  if (el('[data-import-save]')) {
    const box = $('save-import');
    const ok = box && importSave(box.value);
    if (ok) {
      toast('green', 'Save imported', 'Your vault has been restored.', '✓');
      closeModal();
      render();
    } else {
      toast('red', 'Import failed', 'That save code is not valid.', '!');
    }
    return;
  }

  if (el('[data-reset-save]')) {
    confirmAction({
      title: 'Reset your collector profile?',
      body: 'Every card, coin, gem, album and statistic will be wiped. This cannot be undone.',
      confirmText: 'Reset everything',
      danger: true,
      onConfirm: () => {
        resetSave();
        closeModal();
        toast('red', 'Profile reset', 'A fresh starter vault is ready.', '↺');
        render();
      },
    });
    return;
  }
});

/* search + selects */
let searchTimer = 0;
document.addEventListener('input', ev => {
  if (ev.target.id !== 'coll-search') return;
  view.collection.q = ev.target.value;
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    render({ scroll: false });
    const input = $('coll-search');
    if (input) {
      input.focus({ preventScroll: true });
      const end = input.value.length;
      input.setSelectionRange(end, end);
    }
  }, 110);
});
document.addEventListener('change', ev => {
  const field = ev.target.closest?.('[data-filter]');
  if (!field || field.dataset.filter === 'search') return;
  view.collection[field.dataset.filter] = field.value;
  render({ scroll: false });
});

/* keyboard access for role=button tiles */
document.addEventListener('keydown', ev => {
  if (ev.key !== 'Enter' && ev.key !== ' ') return;
  const tile = ev.target.closest?.('[role="button"][data-open-pack], [role="button"][data-pack-details], [role="button"][data-open-album]');
  if (!tile) return;
  ev.preventDefault();
  tile.click();
});

/* global escape + modal close */
document.addEventListener('keydown', ev => {
  if (ev.key === 'Escape' && !isOpening()) closeModal();
});

$('sound-toggle')?.addEventListener('click', () => {
  const muted = toggleMuted();
  setMuted(muted);
  updateChrome();
  if (!muted) sfx.click();
});

/* ------------------------------------------------------------
   BOOT
   ------------------------------------------------------------ */
initFx();
subscribe(() => {
  if (!isOpening()) render({ scroll: false });
  else updateChrome();
});

const bootState = getState();
setMuted(!!bootState.settings.muted);
document.body.classList.toggle('muted', !!bootState.settings.muted);
if (!location.hash) history.replaceState(null, '', '#/home');

window.addEventListener('hashchange', () => {
  if (isOpening()) return;
  render({ smooth: true });
});

window.addEventListener('apex:levelup', () => sfx.levelup());

render();
clock();
setInterval(clock, 1000);
tickLivePrices();
setInterval(tickLivePrices, 15000);
