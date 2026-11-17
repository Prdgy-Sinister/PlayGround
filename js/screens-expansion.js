/* ============================================================
   Memorabilia, Merchandise, Marketplace expansions & Showroom
   ============================================================ */
import {
  getState, ownedRelics, relicSupplyInfo, relicAlbumProgress, relicAlbums,
  relicPackOdds, relicMarketListings, auctionLots, communityShowrooms,
  weeklyShowrooms, roomStatus, showroomPrestige, showroomContents,
  MEMORABILIA, MERCHANDISE, RELICS, RELIC_MAP, MEMORABILIA_PACKS,
  RELIC_RARITY, RELIC_ALBUMS, ROOMS, DISPLAYS,
  THEMES, PRESTIGE,
} from './store.js';
import { CARD_MAP } from './data/index.js';
import { fmt, esc, emptyState, rewardHTML } from './ui.js';
import { relicCardHTML, relicArtHTML, openRelicDetail, openRelicPackDetails } from './relic-ui.js';
import { rotatingCollections, CATEGORY_MAP, RELIC_RARITY_ORDER } from './data/relics.js';
import { unlockRequirement, CUSTOM_OPTIONS } from './data/showroom.js';

export const expansionView = {
  relics: { dept:'all', sport:'all', category:'all', rarity:'all', q:'', sort:'name', team:'all' },
  market: { tab:'cards' },
  showroom: { room:'main' },
};

const FICTIONAL = `<div class="legal-note"><b>Fictional digital collectibles.</b> Replicas are simulated memorabilia and merchandise. Nothing here is officially licensed, genuinely race-used, or an authenticated autograph.</div>`;

function filterRelics(list, dept) {
  const f = expansionView.relics;
  let out = list.filter(r => r.kind === dept || dept === 'all');
  if (f.sport !== 'all') out = out.filter(r => r.sport === f.sport);
  if (f.category !== 'all') out = out.filter(r => r.category === f.category);
  if (f.rarity !== 'all') out = out.filter(r => r.rarity === f.rarity);
  if (f.team !== 'all') out = out.filter(r => r.team === f.team || r.driver === f.team);
  if (f.q) {
    const q = f.q.toLowerCase();
    out = out.filter(r => r.searchable.includes(q));
  }
  if (f.sort === 'rarity') out = [...out].sort((a,b) => RELIC_RARITY[b.rarity].rank - RELIC_RARITY[a.rarity].rank);
  else if (f.sort === 'price') out = [...out].sort((a,b) => (b.price || relicValueSafe(b)) - (a.price || relicValueSafe(a)));
  else if (f.sort === 'recent') out = [...out].reverse();
  else out = [...out].sort((a,b) => a.name.localeCompare(b.name));
  return out;
}
function relicValueSafe(relic) {
  const rar = RELIC_RARITY[relic.rarity];
  const signed = relic.signed ? (relic.dualSigned ? 2.4 : 1.5) : 1;
  const scarcity = relic.supply ? Math.max(1, Math.min(3, 120 / relic.supply)) : 1;
  return Math.round(rar.value * signed * scarcity * (relic.kind === 'merchandise' ? .85 : 1));
}
function relicFilterBar(dept) {
  const f = expansionView.relics;
  const cats = [...new Set((dept === 'all' ? RELICS : RELICS.filter(r => r.kind === dept)).map(r => r.category))]
    .map(id => ({id, label:CATEGORY_MAP[id]?.label || id}));
  const teams = [...new Set((dept === 'all' ? RELICS : RELICS.filter(r => r.kind === dept)).map(r => r.team).filter(Boolean))].sort();
  const opt = (val, label, current) => `<option value="${esc(val)}" ${current === val ? 'selected' : ''}>${esc(label)}</option>`;
  return `<div class="relic-filters">
    <label class="rf-search"><span>⌕</span><input id="relic-search" type="search" placeholder="Search driver, team, category…" value="${esc(f.q)}" data-relic-search /></label>
    <select data-relic-filter="sport">${opt('all','All series',f.sport)}${opt('f1','Formula 1',f.sport)}${opt('motogp','MotoGP',f.sport)}</select>
    <select data-relic-filter="category">${opt('all','All categories',f.category)}${cats.map(c => opt(c.id, c.label, f.category)).join('')}</select>
    <select data-relic-filter="rarity">${opt('all','All rarities',f.rarity)}${RELIC_RARITY_ORDER.map(r => opt(r, RELIC_RARITY[r].name, f.rarity)).join('')}</select>
    <select data-relic-filter="team">${opt('all','All teams / drivers',f.team)}${teams.map(t => opt(t, t, f.team)).join('')}</select>
    <select data-relic-filter="sort">${opt('name','Name A–Z',f.sort)}${opt('rarity','Rarity',f.sort)}${opt('price','Value',f.sort)}${opt('recent','Recently added',f.sort)}</select>
    <button class="btn btn-sm" data-relic-clear>Clear</button>
  </div>`;
}
function supplyFor(relic) { return relicSupplyInfo(relic); }
function ownedCount(relicId) { return getState().relics.filter(r => r.relicId === relicId).length; }

function relicGrid(list, opts = {}) {
  if (!list.length) return emptyState('◇', 'No pieces match', 'Adjust the filters above to widen your search.', '');
  return `<div class="relic-grid">${list.map(r => relicCardHTML(r, {
    supply: supplyFor(r), owned: ownedCount(r.id),
    showValue: opts.showValue, price: opts.price,
    value: relicValueSafe(r),
  })).join('')}</div>`;
}

function packStrip() {
  return `<div class="relic-pack-strip">${MEMORABILIA_PACKS.map(p => `<div class="relic-pack" style="--pack-accent:${p.id === 'relic-museum' ? '#7ef7d1' : p.id === 'relic-trophy' ? '#ff66d8' : '#ffc247'}">
    <div class="rp-ico">${p.id === 'relic-museum' ? '✦' : p.id === 'relic-trophy' ? '★' : p.id === 'relic-curated' ? '◈' : '▣'}</div>
    <div class="rp-body"><b>${esc(p.name)}</b><span>${p.cards} pieces · ${p.note}</span>
      <div class="rp-odds">${relicPackOdds(p).map(o => `<span>${esc(RELIC_RARITY[o.rarity].short)} ${o.pct.toFixed(0)}%</span>`).join('')}</div>
    </div>
    <div class="rp-buy"><b>${p.currency === 'gems' ? '◆' : '◈'} ${fmt(p.cost)}</b>
      <button class="btn btn-sm btn-primary" data-open-relic-pack="${esc(p.id)}">Open</button>
      <button class="btn btn-sm" data-relic-pack-details="${esc(p.id)}">Odds</button>
    </div>
  </div>`).join('')}</div>`;
}

function albumStrip() {
  return `<div class="relic-album-strip">${relicAlbums().map(({album, have, total, pct, complete, claimed}) => `<div class="relic-album ${complete ? 'complete' : ''}">
    <div class="ra-top"><span>${esc(album.name)}</span><b>${pct}%</b></div>
    <div class="ra-bar"><i style="width:${pct}%"></i></div>
    <div class="ra-meta"><span>${have} / ${total} pieces</span>${claimed ? `<span class="claimed">✓ Reward claimed</span>` : complete ? `<button class="btn btn-sm btn-gold" data-claim-relic-album="${esc(album.id)}">Claim reward</button>` : ''}</div>
    <button class="ra-open" data-relic-album="${esc(album.id)}">View collection →</button>
  </div>`).join('')}</div>`;
}

function ownedStrip() {
  const entries = ownedRelics();
  if (!entries.length) return `<div class="owned-empty">No collectibles yet. Open a memorabilia pack or buy merchandise to start your museum.</div>`;
  return `<div class="owned-strip">${entries.slice(0, 24).map(({relic, item}) => `<button class="owned-tile" data-open-relic-instance="${esc(item.uid)}" style="--relic-accent:${RELIC_RARITY[relic.rarity].color}">
    ${relicArtHTML(relic, {small:true})}
    <span>${esc(relic.name)}</span>
    <small>${item.serial != null ? '#' + item.serial : 'Open edition'}</small>
  </button>`).join('')}</div>`;
}

export function memorabiliaScreen() {
  const s = getState();
  const list = filterRelics(MEMORABILIA, 'memorabilia');
  const rarCounts = RELIC_RARITY_ORDER.map(r => ({r, n:MEMORABILIA.filter(x => x.rarity === r).length}));
  return `<div class="screen" data-screen="memorabilia">
    <div class="page-head">
      <div>
        <div class="eyebrow">Premium collecting · memorabilia department</div>
        <h1 class="page-title">Motorsport <em>Memorabilia</em></h1>
        <p class="page-sub">Racing history you can hold: helmets, suits, machinery, trophies and signed replicas. Every piece is a fictional digital collectible with its own historical story and display representation.</p>
      </div>
      <div class="page-head-actions"><span class="chip purple">◈ ${fmt(s.relics.length)} pieces owned</span><span class="chip">${MEMORABILIA.length} catalogue items</span></div>
    </div>
    ${FICTIONAL}
    <section class="relic-section">
      <div class="section-title"><h3>Memorabilia packs</h3><span>Transparent odds · no autographs in ordinary packs</span></div>
      ${packStrip()}
    </section>
    <section class="relic-section">
      <div class="section-title"><h3>Collectible albums</h3><span>Complete sets for tokens, decorations and unique pieces</span></div>
      ${albumStrip()}
    </section>
    <section class="relic-section">
      <div class="section-title"><h3>Your collection</h3><span>${s.relics.length} owned</span></div>
      ${ownedStrip()}
    </section>
    <section class="relic-section">
      <div class="section-title"><h3>Memorabilia catalogue</h3><span>${list.length} matching</span></div>
      ${relicFilterBar('memorabilia')}
      <div class="rarity-legend">${rarCounts.map(({r,n}) => `<span style="color:${RELIC_RARITY[r].color}">${RELIC_RARITY[r].name} · ${n}</span>`).join('')}</div>
      ${relicGrid(list, {showValue:true})}
    </section>
  </div>`;
}

export function merchandiseScreen() {
  const s = getState();
  const {featured, drop} = rotatingCollections(new Date());
  const list = filterRelics(MERCHANDISE, 'merchandise');
  return `<div class="screen" data-screen="merchandise">
    <div class="page-head">
      <div>
        <div class="eyebrow">Paddock store · official-style collections</div>
        <h1 class="page-title">Merchandise <em>Store</em></h1>
        <p class="page-sub">Team clothing, accessories, miniature vehicles and premium collections. Browse by series, manufacturer, team, rider, category, rarity and price.</p>
      </div>
      <div class="page-head-actions"><span class="chip gold">◈ ${fmt(s.coins)} balance</span><button class="btn btn-sm" data-nav="daily">Earn coins</button></div>
    </div>
    ${FICTIONAL}
    <section class="relic-section">
      <div class="section-title"><h3>Rotating collections</h3><span>Refreshes daily · simulated stock</span></div>
      <div class="rotating-grid">${featured.map(r => `<div class="rotating-card">${relicArtHTML(r,{small:true})}<div><b>${esc(r.name)}</b><span>${esc(RELIC_RARITY[r.rarity].name)}</span></div><button class="btn btn-sm" data-open-relic="${esc(r.id)}">View</button></div>`).join('')}
        <div class="limited-drop"><span class="drop-tag">LIMITED-TIME DROP</span><h4>${esc(drop.name)}</h4><p>${esc(RELIC_RARITY[drop.rarity].name)} · ${drop.supply ? 'Only ' + fmt(drop.supply) + ' numbered replicas' : 'Open edition'}</p><button class="btn btn-sm btn-primary" data-open-relic="${esc(drop.id)}">Inspect drop</button></div>
      </div>
    </section>
    <section class="relic-section">
      <div class="section-title"><h3>Store catalogue</h3><span>${list.length} products</span></div>
      ${relicFilterBar('merchandise')}
      ${relicGrid(list, {price:true})}
    </section>
  </div>`;
}

function prestigeCard() {
  const p = showroomPrestige();
  const next = p.next;
  return `<div class="prestige-card">
    <div class="prestige-ring" style="--pct:${p.progress}%"><span>${p.icon}</span><b>${p.level}</b></div>
    <div class="prestige-copy"><div class="eyebrow">Collection rank</div><h3>${esc(p.name)}</h3>
      <p>Based on rarity, editions, autographs, memorabilia and completed albums — never on coins spent.</p>
      <div class="prestige-bar"><i style="width:${p.progress}%"></i></div>
      <span>${fmt(p.points)} prestige points${next ? ` · ${fmt(next.points - p.points)} to ${esc(next.name)}` : ' · top rank reached'}</span>
    </div>
  </div>`;
}

function roomCards() {
  const s = getState();
  return `<div class="room-grid">${ROOMS.map(room => {
    const st = roomStatus(room.id, s);
    const active = expansionView.showroom.room === room.id;
    return `<button class="room-card ${active ? 'active' : ''} ${st.unlocked ? 'unlocked' : 'locked'}" data-room="${esc(room.id)}">
      <span class="room-ico">${room.icon}</span>
      <span class="room-name">${esc(room.name)}</span>
      <span class="room-state">${st.unlocked ? 'Unlocked' : room.cost ? `◈ ${fmt(room.cost)}${room.gems ? ' · ◆' + fmt(room.gems) : ''}` : 'Locked'}</span>
      ${!st.unlocked ? `<small>${esc(unlockRequirement(room))}</small>` : ''}
    </button>`;
  }).join('')}</div>`;
}

function customPanel() {
  const c = getState().showroom.custom;
  const select = (id, label, options, current) => `<label class="custom-field"><span>${label}</span><select data-custom="${id}">${options.map(o => `<option value="${esc(o.id)}" ${current === o.id ? 'selected' : ''}>${esc(o.name)}</option>`).join('')}</select></label>`;
  return `<div class="custom-grid">
    ${select('theme','Room theme',THEMES,c.theme)}
    ${select('floor','Flooring',CUSTOM_OPTIONS.floor,c.floor)}
    ${select('lighting','Lighting',CUSTOM_OPTIONS.lighting,c.lighting)}
    ${select('banners','Wall banners',CUSTOM_OPTIONS.banners,c.banners)}
    ${select('furniture','Furniture',CUSTOM_OPTIONS.furniture,c.furniture)}
    ${select('layout','Display layout',CUSTOM_OPTIONS.layout,c.layout)}
    <label class="custom-field"><span>Team accent</span><input type="color" value="${esc(c.teamColor)}" data-custom="teamColor" /></label>
  </div>${c.decorations.length ? `<div class="decoration-strip">${c.decorations.map(d => `<span class="decoration">✦ ${esc(d.replace(/-/g,' '))}</span>`).join('')}</div>` : ''}`;
}

function inventoryPanel() {
  const s = getState();
  const placed = new Set(s.showroom.items.map(i => i.itemUid));
  const cards = s.items.filter(i => !placed.has(i.uid)).slice(0, 14).map(i => {
    const card = CARD_MAP[i.cardId];
    return card ? `<button class="show-inv-item" data-display-item="${esc(i.uid)}" data-display-kind="card"><span style="color:${card.colors?.[0]}">${card.sport === 'motogp' ? '◈' : '▣'}</span><b>${esc(card.name)}</b><small>${esc(card.rarity)}</small></button>` : '';
  }).join('');
  const relics = ownedRelics().filter(e => !placed.has(e.item.uid)).slice(0, 14).map(({relic,item}) =>
    `<button class="show-inv-item" data-display-item="${esc(item.uid)}" data-display-kind="relic"><span style="color:${RELIC_RARITY[relic.rarity].color}">${esc(CATEGORY_MAP[relic.category]?.icon || '◇')}</span><b>${esc(relic.name)}</b><small>${esc(RELIC_RARITY[relic.rarity].short)}</small></button>`).join('');
  if (!cards && !relics) return `<div class="owned-empty">Every collectible is on display. Remove one from a room to reassign it.</div>`;
  return `<div class="show-inv-list">${cards}${relics}</div>`;
}

function placedPanel() {
  const s = getState();
  const room = expansionView.showroom.room;
  const contents = showroomContents(room);
  const entries = contents.flatMap(g => g.items.map(item => ({...item, fixture:g.display})));
  if (!entries.length) return `<div class="owned-empty">This room is empty. Choose a collectible below and place it in a display.</div>`;
  return `<div class="placed-list">${entries.map(e => `<div class="placed-row">
    <div class="placed-ico" style="color:${RELIC_RARITY[e.meta?.rarity]?.color || '#ffc247'}">${e.kind === 'card' ? '▣' : '◇'}</div>
    <div class="placed-copy"><b>${esc(e.meta?.name || 'Collectible')}</b><span>${esc(e.meta?.edition || e.meta?.rarity || '')}${e.meta?.serial != null ? ' · #' + e.meta.serial : ''} · ${esc(e.fixture.type.replace(/-/g,' '))}</span></div>
    <button class="icon-mini" data-toggle-visible="${esc(e.uid)}" title="${e.visible ? 'Hide from visitors' : 'Show to visitors'}">${e.visible ? '◉' : '○'}</button>
    <button class="icon-mini" data-remove-display="${esc(e.uid)}" title="Remove from display">×</button>
  </div>`).join('')}</div>`;
}

function communityPanel() {
  const s = getState();
  const list = communityShowrooms();
  const weekly = weeklyShowrooms();
  return `<div class="community-grid">
    <div class="panel">
      <div class="panel-head"><h3><span class="bar"></span>Featured exhibitions</h3><span class="chip">${s.showroom.visits} visited</span></div>
      <div class="showroom-list">${list.slice(0,6).map(c => `<div class="showroom-row">
        <span class="sr-avatar" style="--c:${c.color}">${esc(c.alias[0])}</span>
        <div class="sr-copy"><b>${esc(c.alias)}</b><span>${esc(c.tag)} · ${esc(c.prestige.name)} · ${c.rooms} rooms</span><small>Highlight: ${esc(c.highlight)}</small></div>
        <div class="sr-stats"><span>★ ${c.rating}</span><span>♥ ${fmt(c.likes + (c.liked ? 1 : 0))}</span></div>
        <button class="btn btn-sm ${c.liked ? 'btn-gold' : ''}" data-like-showroom="${esc(c.alias)}">${c.liked ? '♥ Liked' : '♡ Like'}</button>
        <button class="btn btn-sm" data-visit-showroom="${esc(c.alias)}">${c.visited ? 'Revisit' : 'Visit'}</button>
      </div>`).join('')}</div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3><span class="bar"></span>Weekly best showrooms</h3><span class="chip">Simulated ranking</span></div>
      <div class="weekly-list">${weekly.map((c,i) => `<div class="weekly-row"><b>#${i+1}</b><span>${esc(c.alias)}</span><em>${fmt(c.score)} pts</em></div>`).join('')}</div>
      <p class="tiny muted">Public visits, likes and rankings are generated locally in your save. Other collectors are simulated — no shared server is involved.</p>
    </div>
  </div>`;
}

export function showroomScreen() {
  const s = getState();
  const roomId = expansionView.showroom.room;
  const status = roomStatus(roomId, s);
  const room = status.room;
  const contents = showroomContents(roomId);
  const totalPlaced = contents.reduce((n,g) => n + g.items.length, 0);
  return `<div class="screen showroom-screen" data-screen="showroom">
    <div class="page-head">
      <div>
        <div class="eyebrow">Personal museum · collector’s showroom</div>
        <h1 class="page-title">My <em>Showroom</em></h1>
        <p class="page-sub">Build a private museum room by room. Place real collection pieces in procedural displays, inspect them up close and personalise every surface.</p>
      </div>
      <div class="page-head-actions"><span class="chip purple">${s.showroom.rooms.length} / ${ROOMS.length} rooms</span><span class="chip">${totalPlaced} on display</span></div>
    </div>
    ${FICTIONAL}
    ${prestigeCard()}
    <section class="relic-section">
      <div class="section-title"><h3>Museum wings</h3><span>Unlock with collection progress and currency</span></div>
      ${roomCards()}
      ${!status.unlocked ? `<div class="room-unlock"><div><b>${esc(room.name)}</b><p>${esc(room.desc)}</p><span>Requirement: ${esc(unlockRequirement(room))}</span></div>
        <div class="ru-cost"><b>◈ ${fmt(room.cost)}${room.gems ? ' · ◆ ' + fmt(room.gems) : ''}</b>
        <button class="btn btn-sm ${status.reqMet && status.canAfford ? 'btn-primary' : ''}" data-unlock-room="${esc(room.id)}" ${status.reqMet && status.canAfford ? '' : 'disabled'}>Build room</button></div></div>` : ''}
    </section>
    <section class="relic-section showroom-stage-section">
      <div class="section-title"><h3>${esc(room.name)}</h3><span>2.5D interactive view · drag, zoom, inspect</span></div>
      <div class="showroom-stage">
        <canvas id="showroom-canvas" aria-label="Interactive isometric showroom"></canvas>
        <div class="stage-controls"><button class="btn btn-sm" data-showroom-reset>Reset view</button><span>${esc(CUSTOM_OPTIONS.layout.find(l => l.id === s.showroom.custom.layout)?.desc || '')}</span></div>
      </div>
    </section>
    <section class="relic-section">
      <div class="section-title"><h3>Customisation</h3><span>Themes, floors, lighting and décor</span></div>
      ${customPanel()}
    </section>
    <div class="showroom-cols">
      <section class="panel">
        <div class="panel-head"><h3><span class="bar"></span>Placed in this room</h3><span class="chip">${totalPlaced}</span></div>
        ${placedPanel()}
      </section>
      <section class="panel">
        <div class="panel-head"><h3><span class="bar"></span>Available collection</h3><span class="chip">Tap to place</span></div>
        ${inventoryPanel()}
      </section>
    </div>
    <section class="relic-section">
      <div class="section-title"><h3>Global showroom community</h3><span>Local simulation · visits, likes and rankings</span></div>
      ${communityPanel()}
    </section>
  </div>`;
}

/* ---------------- marketplace expansion panels ---------------- */
export function relicMarketPanel() {
  const s = getState();
  const listings = relicMarketListings();
  return `<div class="relic-market-panel">
    ${FICTIONAL}
    <div class="market-hero"><div><h3>Memorabilia & merchandise listings</h3><p>${listings.filter(l => !l.bought).length} active lots · estimated value shown against asking price</p></div>
      <button class="btn btn-sm" data-refresh-relic-market>↻ Refresh · ◈ 250</button></div>
    <div class="listing-grid relic-listing-grid">${listings.map(l => {
      const canBuy = !l.bought && s.coins >= l.price;
      return `<div class="listing relic-listing ${l.bought ? 'sold' : ''}">
        <div class="l-art" data-open-relic="${esc(l.relic.id)}">${relicArtHTML(l.relic,{small:true})}</div>
        <div class="l-body"><div class="l-name">${esc(l.relic.name)}${l.relic.supply ? `<span class="supply-pill">#${l.serial}/${fmt(l.relic.supply)}</span>` : ''}</div>
          <div class="l-meta"><span class="rarity-dot" style="background:${RELIC_RARITY[l.relic.rarity].color}"></span>${esc(RELIC_RARITY[l.relic.rarity].name)} · ${esc(l.seller)}</div>
          <div class="l-price">◈ ${fmt(l.price)} ${l.price !== l.rawPrice ? `<span class="strike">◈ ${fmt(l.rawPrice)}</span>` : ''}</div>
        </div>
        <div class="l-buy"><button class="btn btn-sm ${canBuy ? 'btn-primary' : ''}" data-buy-relic-listing="${esc(l.id)}" ${l.bought || !canBuy ? 'disabled' : ''}>${l.bought ? 'Sold' : 'Buy'}</button></div>
      </div>`;
    }).join('')}</div>
    <div class="panel relic-history"><div class="panel-head"><h3><span class="bar"></span>Collectible sale history</h3><span class="chip">${s.relicMarket.history.length} records</span></div>
      ${s.relicMarket.history.length ? `<div class="mh-list">${s.relicMarket.history.slice(0,10).map(h => {
        const relic = RELIC_MAP[h.relicId];
        return `<div class="mh-row"><span class="mh-type ${esc(h.type)}">${h.type === 'buy' ? 'BOUGHT' : 'SOLD'}</span>
          <div class="mh-name"><b>${esc(relic?.name || 'Collectible')}</b><span>${h.serial != null ? '#' + h.serial : 'Open edition'} · ${esc(h.buyer || 'collector')}</span></div>
          <b class="mh-price">◈ ${fmt(h.price)}</b><span class="mh-date">${new Date(h.at).toLocaleDateString()}</span></div>`;
      }).join('')}</div>` : emptyState('◷','No collectible sales yet','Purchases and sales of memorabilia and merchandise appear here.','')}
    </div>
  </div>`;
}

export function auctionPanel() {
  const s = getState();
  const lots = auctionLots();
  return `<div class="auction-panel">
    ${FICTIONAL}
    <div class="market-hero"><div><h3>Rare memorabilia auctions</h3><p>Bid against simulated collectors. Biased above the ask wins the lot instantly; lower bids get countered.</p></div>
      <button class="btn btn-sm" data-refresh-auctions>↻ New lots</button></div>
    <div class="auction-grid">${lots.map(lot => `<div class="auction-lot" style="--relic-accent:${RELIC_RARITY[lot.relic.rarity].color}">
      <div class="al-art">${relicArtHTML(lot.relic,{small:true})}</div>
      <div class="al-body"><span class="al-rarity">${RELIC_RARITY[lot.relic.rarity].name}</span>
        <h4>${esc(lot.relic.name)}</h4>
        <div class="al-meta">${lot.relic.supply ? `Numbered / ${fmt(lot.relic.supply)}` : 'Open edition'} · ${lot.watchers} watchers · ends ~${lot.endsIn}h</div>
        <div class="al-bid"><span>Current bid</span><b>◈ ${fmt(lot.current)}</b><small>by ${esc(lot.bidder)}</small></div>
        <div class="al-actions">
          <button class="btn btn-sm" data-auction-bid="${esc(lot.id)}" data-amount="${lot.current + lot.increment}">Bid ◈ ${fmt(lot.current + lot.increment)}</button>
          <button class="btn btn-sm btn-gold" data-auction-bid="${esc(lot.id)}" data-amount="${lot.buyNow}">Win ◈ ${fmt(lot.buyNow)}</button>
        </div>
        ${lot.youLeading ? `<div class="al-leading">You are leading</div>` : ''}
      </div>
    </div>`).join('')}</div>
    <div class="panel relic-history"><div class="panel-head"><h3><span class="bar"></span>Auction activity</h3><span class="chip">${s.auctions.history.length} bids</span></div>
      ${s.auctions.history.length ? `<div class="mh-list">${s.auctions.history.slice(0,10).map(h => `<div class="mh-row"><span class="mh-type ${esc(h.type)}">${esc(h.type.toUpperCase())}</span>
        <div class="mh-name"><b>${esc(RELIC_MAP[h.relicId]?.name || 'Lot')}</b><span>${esc(h.bidder)}</span></div><b class="mh-price">◈ ${fmt(h.amount)}</b><span class="mh-date">${new Date(h.at).toLocaleString()}</span></div>`).join('')}</div>` : emptyState('⚖','No bids placed yet','Place a bid on a rare lot to start the auction history.','')}
    </div>
  </div>`;
}

export function relicAlbumScreen(albumId) {
  const album = RELIC_ALBUMS.find(a => a.id === albumId);
  if (!album) return `<div class="screen">${emptyState('◇','Collection not found','',`<button class="btn" data-nav="memorabilia">Back to memorabilia</button>`)}</div>`;
  const pool = (album.kind ? RELICS.filter(r => r.kind === album.kind) : RELICS)
    .filter(r => !album.sport || r.sport === album.sport)
    .filter(r => !album.category || r.category === album.category);
  const prog = relicAlbumProgress(album);
  const owned = new Set(getState().relics.map(r => r.relicId));
  return `<div class="screen"><div class="page-head"><div><div class="eyebrow">Collection album</div><h1 class="page-title">${esc(album.name)}</h1><p class="page-sub">${esc(album.desc)}</p></div>
    <div class="page-head-actions"><span class="chip">${prog.have} / ${prog.total}</span>${prog.complete && !prog.claimed ? `<button class="btn btn-sm btn-gold" data-claim-relic-album="${esc(album.id)}">Claim reward</button>` : ''}</div></div>
    ${FICTIONAL}
    <div class="rarity-legend"><span>${prog.pct}% complete</span><span>Rewards: ${rewardHTML(album.reward)}</span></div>
    ${relicGrid(pool.map(r => ({...r, owned:owned.has(r.id)})), {showValue:true})}
  </div>`;
}
