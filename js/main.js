/* ============================================================
   APEX RUSH — app bootstrap, router, interaction wiring
   ============================================================ */
import {
  getState, subscribe, openPack, itemsOfCard, setFavorite, sellItem,
  sellAllDuplicates, sellAllCommons, claimAlbum, claimDaily, claimChallenge,
  claimHistoricalChallenge,
  claimAllAvailable, buyListing, refreshMarket, acceptTrade, refreshTrades,
  dailyStatus, dailyChallenges, achievements, xpProgress, uniqueCount,
  exportSave, importSave, resetSave, toggleMuted, collectionValue,
  gradeItem, redeemVault,
  openRelicPack, relicSupplyInfo, relicPackOdds, buyRelic, sellRelicItem,
  claimRelicAlbum, buyRelicListing, refreshRelicMarket, placeAuctionBid,
  refreshAuctions, unlockRoom, setShowroomCustom, placeShowroomItem,
  removeShowroomItem, toggleShowroomVisible, likeShowroom, visitShowroom,
  RELIC_MAP, RELIC_RARITY, DISPLAYS, ROOM_MAP, MEMORABILIA_PACKS,
} from './store.js';
import {
  homeScreen, packsScreen, collectionScreen, albumsScreen, albumDetailScreen,
  dailyScreen, challengesScreen, marketScreen, tradeScreen, vaultScreen, view,
  clearCollectionFilters, openRewardModal, openLevelUpModal,
  openSettingsModal, openDuplicatesModal,
} from './screens.js';
import { CARD_COUNT, CARD_MAP } from './data/index.js';
import { PACK_MAP, getPackOfTheDay, getLiveOffers } from './data/packs.js';
import { sfx, setMuted } from './audio.js';
import {
  fmt, esc, toast, openCardDetail, closeModal, confirmAction, initFx, openPackDetails, openModal,
  refreshLivePrices,
} from './ui.js';
import { showOpening, isOpening } from './opening.js';
import {
  memorabiliaScreen, merchandiseScreen, showroomScreen, relicAlbumScreen,
  expansionView, relicMarketPanel, auctionPanel,
} from './screens-expansion.js';
import { openRelicDetail, openRelicReveal, openRelicPackDetails } from './relic-ui.js';
import { initShowroom } from './showroom.js';
import { archiveScreen, seasonDetailScreen, historyView } from './screens-history.js';
import { GRADING_SERVICES } from './pricing.js';
import { localDateKey, msUntilMidnight } from './data/progress.js';

const $ = id => document.getElementById(id);
const main = $('main');
let lastDay = localDateKey(new Date());
let lastLevelUps = [];
let showroomController = null;

/* ------------------------------------------------------------
   ROUTING
   ------------------------------------------------------------ */
const PAGES = {
  home: homeScreen, packs: packsScreen, collection: collectionScreen,
  albums: albumsScreen, daily: dailyScreen, challenges: challengesScreen,
  market: marketScreen, trade: tradeScreen, vault: vaultScreen,
  memorabilia: memorabiliaScreen, merchandise: merchandiseScreen,
  showroom: showroomScreen, 'relic-album': relicAlbumScreen,
  archive: archiveScreen, season: seasonDetailScreen,
};
const TITLES = {
  home: 'Garage', packs: 'Pack Garage', collection: 'Cards',
  albums: 'Albums', daily: 'Daily Hub', challenges: 'Challenges',
  market: 'Marketplace', trade: 'Trade Floor', vault: 'Collector Vault',
  memorabilia: 'Memorabilia', merchandise: 'Merchandise', showroom: 'My Showroom',
  'relic-album': 'Collection Album', archive: 'Historical Archive', season: 'Season Detail',
};

function inspectShowroomItem(entry) {
  if (!entry) return;
  sfx.tab();
  if (entry.kind === 'card') {
    const item = getState().items.find(i => i.uid === entry.itemUid);
    if (item) openCard(item.cardId, item.uid);
    return;
  }
  const item = getState().relics.find(i => i.uid === entry.itemUid);
  const relic = item && RELIC_MAP[item.relicId];
  if (relic) openRelicInstance(relic, item);
}

function parseRoute() {
  const raw = (location.hash || '').replace(/^#\/?/, '').trim();
  const [page, param] = raw.split('/');
  if (page === 'album' && param) return { page: 'album', param };
  if (page === 'relic-album' && param) return { page: 'relic-album', param };
  if (page === 'season' && param) return { page: 'season', param };
  return { page: PAGES[page] ? page : 'home', param: '' };
}

function render(opts = {}) {
  const route = parseRoute();
  const s = getState();
  let html = '';
  try {
    if (route.page === 'album') html = albumDetailScreen(route.param);
    else if (route.page === 'relic-album') html = relicAlbumScreen(route.param);
    else if (route.page === 'season') html = seasonDetailScreen(route.param);
    else html = PAGES[route.page]();
  } catch (err) {
    console.error(err);
    html = `<div class="screen"><div class="empty-state"><div class="big">⚠</div><h4>That screen hit the gravel</h4><p>${esc(err.message)}</p><button class="btn btn-primary" data-nav="home">Back to garage</button></div></div>`;
  }
  main.innerHTML = html;
  if (showroomController) { showroomController.destroy(); showroomController = null; }
  if (route.page === 'showroom') {
    const canvas = $('showroom-canvas');
    showroomController = initShowroom(canvas, {
      roomId: expansionView.showroom.room,
      onInspect: inspectShowroomItem,
    });
  }
  const active = route.page === 'album' ? 'albums' : route.page === 'relic-album' ? 'memorabilia' : route.page === 'season' ? 'archive' : route.page;
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
  const coins = $('coin-val'), gems = $('gem-val'), tokens = $('token-val'), lv = $('level-val'), xp = $('xp-fill');
  if (coins) coins.textContent = fmt(s.coins);
  if (gems) gems.textContent = fmt(s.gems);
  if (tokens) tokens.textContent = fmt(s.collectorTokens || 0);
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
      rewards: { coins: res.coins, gems: res.gems, tokens: res.tokens, pack: res.packs ? 'gold' : null },
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
   MEMORABILIA / MERCHANDISE / SHOWROOM HELPERS
   ------------------------------------------------------------ */
function openRelicInstance(relic, item = null) {
  const owned = item || getState().relics.find(r => r.relicId === relic.id);
  openRelicDetail({
    relic,
    item: owned,
    supply: relicSupplyInfo(relic),
    owned: getState().relics.filter(r => r.relicId === relic.id).length,
    showBuy: relic.kind === 'merchandise',
    showSell: !!owned,
    showDisplay: !!owned,
  });
}
function openRelicPackFlow(packId) {
  try {
    const res = openRelicPack(packId);
    sfx.buy();
    openRelicReveal(res, { onClose: () => render({ scroll:false }) });
  } catch (err) {
    sfx.error();
    toast('red', 'Pack could not open', err.code === 'NOT_ENOUGH_COINS' ? 'Not enough coins.' : err.code === 'NOT_ENOUGH_GEMS' ? 'Not enough gems.' : err.message, '!');
  }
}
function openDisplayModal(itemUid, kind) {
  const s = getState();
  const rooms = s.showroom.rooms.map(id => ROOM_MAP[id]).filter(Boolean);
  const item = kind === 'card' ? s.items.find(i => i.uid === itemUid) : s.relics.find(i => i.uid === itemUid);
  const relic = item && kind === 'relic' ? RELIC_MAP[item.relicId] : null;
  const model = relic?.model || null;
  // Only offer fixtures that can actually hold this collectible, plus the
  // universal pedestal. This avoids a dead "Place" button on incompatible gear.
  const suitable = DISPLAYS.filter(d => {
    if (d.accepts.types?.length) return d.accepts.types.includes(kind);
    if (d.accepts.models?.length) return !!model && d.accepts.models.includes(model);
    return true;
  });
  const defaultType = suitable.find(d => d.id !== 'pedestal')?.id || suitable[0]?.id || 'pedestal';
  const defaultRoom = s.showroom.rooms.includes(expansionView.showroom.room)
    ? expansionView.showroom.room : (rooms[0]?.id || 'main');
  const options = suitable.map(d => `<option value="${esc(d.id)}" ${d.id === defaultType ? 'selected' : ''}>${esc(d.name)} · ${d.capacity} slot${d.capacity === 1 ? '' : 's'}</option>`).join('');
  const wrap = document.createElement('div');
  wrap.className = 'modal-backdrop';
  wrap.innerHTML = `<div class="modal small"><button class="modal-close" data-close-modal aria-label="Close">✕</button>
    <div class="display-modal">
      <div class="eyebrow">Showroom placement</div><h3>Choose a display</h3>
      <p>Place this collectible in an unlocked room. Hidden items remain in your collection but are invisible to visitors.</p>
      <label class="custom-field"><span>Room</span><select id="display-room">${rooms.map(r => `<option value="${esc(r.id)}" ${r.id === defaultRoom ? 'selected' : ''}>${esc(r.name)}</option>`).join('')}</select></label>
      <label class="custom-field"><span>Display fixture</span><select id="display-type">${options}</select></label>
      <button class="btn btn-primary btn-block" data-display-place="${esc(itemUid)}" data-display-kind="${esc(kind)}">Place on display</button>
    </div></div>`;
  document.getElementById('modal-root')?.appendChild(wrap);
  wrap.addEventListener('click', ev => { if (ev.target === wrap || ev.target.closest('[data-close-modal]')) wrap.remove(); });
}
function claimRelicReward(id) {
  try {
    const res = claimRelicAlbum(id);
    sfx.fanfare();
    openRewardModal({
      kicker:'COLLECTION COMPLETE', title: res.album.name,
      subtitle:'Every replica in this collection has been archived.',
      rewards: res.reward,
      onClose: () => queueLevels(res.levelUps),
    });
    render({ scroll:false });
  } catch (err) {
    sfx.error();
    toast('red','Reward unavailable',err.message,'!');
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

  /* ---- historical archive ---- */
  const hTab = el('[data-htab]');
  if (hTab) { sfx.tab(); historyView.tab = hTab.dataset.htab; render({scroll:false}); return; }

  const hSport = el('[data-hsport]');
  if (hSport) {
    sfx.tab();
    historyView.sport = hSport.dataset.hsport;
    if (el('[data-clear-search]')) historyView.query = '';
    render({scroll:false});
    return;
  }

  const hChallengeCat = el('[data-hchallenge-cat]');
  if (hChallengeCat) { sfx.tab(); historyView.challengeCategory = hChallengeCat.dataset.hchallengeCat; render({scroll:false}); return; }

  const hMarketRange = el('[data-hmarket-range]');
  if (hMarketRange) { sfx.tab(); historyView.marketRange = hMarketRange.dataset.hmarketRange; render({scroll:false}); return; }

  const seasonBtn = el('[data-season]');
  if (seasonBtn) { sfx.tab(); navigate('season/' + seasonBtn.dataset.season); return; }

  const claimHChallenge = el('[data-claim-hchallenge]');
  if (claimHChallenge) {
    try {
      const res = claimHistoricalChallenge(claimHChallenge.dataset.claimHchallenge);
      claimResult(res, 'HISTORICAL CHALLENGE', res.def.title,
        `Challenge complete — ${res.def.progress} / ${res.def.goal}. ${res.def.desc}`);
      if (res.card) toast('gold', 'Collector card unlocked', `${res.card.name} has been added to your vault.`, '★');
    } catch (err) {
      sfx.error();
      toast('red', 'Cannot claim yet', err.message, '!');
    }
    return;
  }

  /* ---- memorabilia, merchandise, market & showroom ---- */
  const relicPackOpen = el('[data-open-relic-pack]');
  if (relicPackOpen) { ev.preventDefault(); closeModal(); openRelicPackFlow(relicPackOpen.dataset.openRelicPack); return; }

  const relicPackInfo = el('[data-relic-pack-details]');
  if (relicPackInfo) {
    ev.preventDefault();
    const pack = MEMORABILIA_PACKS.find(p => p.id === relicPackInfo.dataset.relicPackDetails);
    if (pack) { sfx.tab(); openRelicPackDetails(pack, relicPackOdds(pack)); }
    return;
  }

  const relicAlbum = el('[data-relic-album]');
  if (relicAlbum) { sfx.tab(); location.hash = '#/relic-album/' + relicAlbum.dataset.relicAlbum; return; }

  const claimRelic = el('[data-claim-relic-album]');
  if (claimRelic) { claimRelicReward(claimRelic.dataset.claimRelicAlbum); return; }

  const relicOpen = el('[data-open-relic]');
  if (relicOpen) {
    sfx.tab();
    const relic = RELIC_MAP[relicOpen.dataset.openRelic];
    if (relic) openRelicInstance(relic);
    return;
  }
  const relicInstance = el('[data-open-relic-instance]');
  if (relicInstance) {
    sfx.tab();
    const item = getState().relics.find(r => r.uid === relicInstance.dataset.openRelicInstance);
    const relic = item && RELIC_MAP[item.relicId];
    if (relic) openRelicInstance(relic, item);
    return;
  }

  const buyRelicBtn = el('[data-buy-relic]');
  if (buyRelicBtn) {
    try {
      const res = buyRelic(buyRelicBtn.dataset.buyRelic);
      sfx.buy(); closeModal();
      toast('gold','Purchased',`${res.relic.name} added to your collection.`,'◇');
      render({ scroll:false });
      setTimeout(() => openRelicInstance(res.relic, res.item), 40);
    } catch (err) { sfx.error(); toast('red','Purchase failed',err.message,'!'); }
    return;
  }

  const sellRelicBtn = el('[data-sell-relic]');
  if (sellRelicBtn) {
    confirmAction({
      title:'Sell this replica?',
      body:'The sale is final. Numbered editions keep their issued serial in the supply ledger even after sale.',
      confirmText:'Sell collectible',
      onConfirm: () => {
        try {
          const res = sellRelicItem(sellRelicBtn.dataset.sellRelic);
          closeModal(); sfx.sell();
          toast('gold','Sold',`${res.relic.name} · ◈ ${fmt(res.value)} returned.`,'◈');
          render({ scroll:false });
        } catch (err) { sfx.error(); toast('red','Sale failed',err.message,'!'); }
      },
    });
    return;
  }

  const displayRelicBtn = el('[data-display-relic]');
  if (displayRelicBtn) { closeModal(); openDisplayModal(displayRelicBtn.dataset.displayRelic, 'relic'); return; }

  const placeItemBtn = el('[data-display-item]');
  if (placeItemBtn) { openDisplayModal(placeItemBtn.dataset.displayItem, placeItemBtn.dataset.displayKind); return; }

  const placeConfirm = el('[data-display-place]');
  if (placeConfirm) {
    try {
      const room = $('display-room')?.value;
      const type = $('display-type')?.value;
      placeShowroomItem(placeConfirm.dataset.displayPlace, placeConfirm.dataset.displayKind, room, type);
      document.querySelectorAll('.modal-backdrop').forEach(m => m.remove());
      sfx.claim();
      toast('green','On display','Your collectible is now in the showroom.','▣');
      render({ scroll:false });
    } catch (err) { sfx.error(); toast('red','Could not place item',err.message,'!'); }
    return;
  }

  const removeDisplay = el('[data-remove-display]');
  if (removeDisplay) {
    try { removeShowroomItem(removeDisplay.dataset.removeDisplay); sfx.tab(); render({ scroll:false }); }
    catch (err) { toast('red','Could not remove',err.message,'!'); }
    return;
  }
  const toggleVisible = el('[data-toggle-visible]');
  if (toggleVisible) {
    try {
      const shown = toggleShowroomVisible(toggleVisible.dataset.toggleVisible);
      sfx.click(); toast('cyan', shown ? 'Visible to visitors' : 'Hidden from visitors', 'Your showroom privacy setting was updated.', '◉');
      render({ scroll:false });
    } catch (err) { toast('red','Could not update',err.message,'!'); }
    return;
  }

  if (el('[data-relic-clear]')) {
    Object.assign(expansionView.relics, { dept:'all', sport:'all', category:'all', rarity:'all', q:'', sort:'name', team:'all' });
    sfx.tab(); render({ scroll:false }); return;
  }

  const roomBtn = el('[data-room]');
  if (roomBtn) {
    expansionView.showroom.room = roomBtn.dataset.room;
    sfx.tab(); render({ scroll:false }); return;
  }
  const unlockBtn = el('[data-unlock-room]');
  if (unlockBtn) {
    try {
      const room = unlockRoom(unlockBtn.dataset.unlockRoom);
      sfx.fanfare(); toast('green','Room unlocked',`${room.name} is now part of your museum.`,'▣');
      expansionView.showroom.room = room.id;
      render({ scroll:false });
    } catch (err) { sfx.error(); toast('red','Cannot build room',err.message,'!'); }
    return;
  }
  if (el('[data-showroom-reset]')) { showroomController?.resetCamera(); sfx.click(); return; }

  const likeBtn = el('[data-like-showroom]');
  if (likeBtn) {
    const liked = likeShowroom(likeBtn.dataset.likeShowroom);
    sfx.click(); toast('cyan', liked ? 'Showroom liked' : 'Like removed', 'Community ratings are simulated locally.', '♥');
    render({ scroll:false }); return;
  }
  const visitBtn = el('[data-visit-showroom]');
  if (visitBtn) {
    const visit = visitShowroom(visitBtn.dataset.visitShowroom);
    sfx.tab();
    if (visit) openModal(`<div class="visit-modal"><button class="modal-x" data-close-modal>×</button>
      <div class="eyebrow">Public showroom visit</div><h2>${esc(visit.alias)}</h2>
      <p>${esc(visit.tag)} · ${esc(visit.prestige.name)} · ${visit.rooms} rooms</p>
      <div class="visit-highlight"><span>Rarest on display</span><b>${esc(visit.highlight)}</b></div>
      <div class="visit-stats"><span>★ ${visit.rating} collector rating</span><span>♥ ${fmt(visit.likes)} likes</span></div>
      <p class="tiny muted">This collector and showroom are generated locally for the simulated community.</p>
    </div>`, {small:true});
    render({ scroll:false }); return;
  }

  const marketTab = el('[data-market-tab]');
  if (marketTab) { expansionView.market.tab = marketTab.dataset.marketTab; sfx.tab(); render({ scroll:false }); return; }

  const buyRelicListingBtn = el('[data-buy-relic-listing]');
  if (buyRelicListingBtn) {
    try {
      const res = buyRelicListing(buyRelicListingBtn.dataset.buyRelicListing);
      sfx.buy(); toast('gold','Lot purchased',`${res.relic.name} · ◈ ${fmt(res.listing.price)}.`,'◫');
      render({ scroll:false });
      setTimeout(() => openRelicInstance(res.relic, res.item), 40);
    } catch (err) { sfx.error(); toast('red','Purchase failed',err.message,'!'); }
    return;
  }
  if (el('[data-refresh-relic-market]')) {
    try { refreshRelicMarket(); sfx.coin(); toast('cyan','New lots','The collectible market has refreshed.','◫'); render({ scroll:false }); }
    catch (err) { sfx.error(); toast('red','Cannot refresh',err.message,'!'); }
    return;
  }
  const auctionBid = el('[data-auction-bid]');
  if (auctionBid) {
    try {
      const res = placeAuctionBid(auctionBid.dataset.auctionBid, Number(auctionBid.dataset.amount));
      if (res.won) {
        sfx.fanfare(); toast('gold','Auction won',`${res.relic.name} secured for ◈ ${fmt(res.amount)}.`,'★');
        render({ scroll:false });
        setTimeout(() => openRelicInstance(res.relic, res.item), 40);
      } else {
        sfx.coin(); toast('red','Outbid',`${res.bidder} countered at ◈ ${fmt(res.counter)}. Bid again to stay in.`,'⚖');
        render({ scroll:false });
      }
    } catch (err) { sfx.error(); toast('red','Bid failed',err.message,'!'); }
    return;
  }
  if (el('[data-refresh-auctions]')) {
    refreshAuctions(); sfx.tab(); toast('cyan','Fresh lots','A new auction board is live.','⚖'); render({ scroll:false }); return;
  }

  const redeemVaultBtn = el('[data-redeem-vault]');
  if (redeemVaultBtn) {
    ev.preventDefault();
    try {
      const res = redeemVault(redeemVaultBtn.dataset.redeemVault);
      sfx.fanfare();
      render({ scroll: false });
      openCardDetail(res.card, itemsOfCard(res.card.id), { itemUid: res.item.uid, favorite: getState().favorite === res.card.id });
      toast('gold', 'Autograph redeemed', `${res.card.name} · serial ${res.item.serial} · ${res.cost} tokens spent`, '✒');
    } catch (err) {
      sfx.error();
      toast('red', 'Redemption failed', err.message, '!');
    }
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
  if (ev.target.matches?.('[data-season-search]')) {
    historyView.query = ev.target.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      render({ scroll:false });
      const input = $('season-search');
      if (input) { input.focus({ preventScroll:true }); input.setSelectionRange(input.value.length, input.value.length); }
    }, 130);
    return;
  }
  if (ev.target.id === 'relic-search') {
    expansionView.relics.q = ev.target.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      render({ scroll:false });
      const input = $('relic-search');
      if (input) { input.focus({ preventScroll:true }); input.setSelectionRange(input.value.length, input.value.length); }
    }, 120);
    return;
  }
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
  const hDecade = ev.target.closest?.('[data-hdecade]');
  if (hDecade) { historyView.decade = hDecade.value; sfx.tab(); render({ scroll:false }); return; }
  const relicField = ev.target.closest?.('[data-relic-filter]');
  if (relicField) {
    expansionView.relics[relicField.dataset.relicFilter] = relicField.value;
    sfx.tab(); render({ scroll:false }); return;
  }
  const customField = ev.target.closest?.('[data-custom]');
  if (customField) {
    try { setShowroomCustom(customField.dataset.custom, customField.value); sfx.click(); render({ scroll:false }); }
    catch (err) { toast('red','Customisation failed',err.message,'!'); }
    return;
  }
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
