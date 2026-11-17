/* ============================================================
   HISTORICAL ARCHIVE — season browser, collection challenges,
   and the live market pulse. All data comes from the store so
   progress, rewards and pricing stay in sync with the rest of
   the game.
   ============================================================ */
import {
  getState, historicalChallenges, seasonProgress, seasonPrestige,
  marketPulse, marketCardDetail, claimAlbum, albumProgress,
} from './store.js';
import { ALL_SEASONS, ALL_SEASON_MAP, SEASON_CARD_IDS, searchSeasons } from './data/seasons.js';
import { CHALLENGE_CATEGORIES } from './data/challenges.js';
import { CARD_MAP, ALBUM_MAP } from './data/index.js';
import { PACK_MAP } from './data/packs.js';
import { esc, fmt, cardHTML, miniCardHTML, sparklineHTML, emptyState } from './ui.js';

export const historyView = {
  tab: 'seasons',
  sport: 'all',
  decade: 'all',
  query: '',
  challengeCategory: 'all',
  marketRange: '24h',
};

const SPORT_LABEL = {f1:'Formula 1', motogp:'MotoGP'};
const DIFF_TONE = {easy:'#3ee08a', medium:'#ffc247', hard:'#ff8a5c', expert:'#ff5c7a'};

function signed(n) { return `${n >= 0 ? '+' : ''}${n.toFixed(1)}%`; }
function dirClass(n) { return n > .15 ? 'up' : n < -.15 ? 'down' : 'flat'; }

function rewardPreview(reward = {}) {
  const bits = [];
  if (reward.coins) bits.push(`<span class="rp coin">◈ ${fmt(reward.coins)}</span>`);
  if (reward.gems) bits.push(`<span class="rp gem">◆ ${fmt(reward.gems)}</span>`);
  if (reward.tokens) bits.push(`<span class="rp token">✦ ${fmt(reward.tokens)}</span>`);
  if (reward.xp) bits.push(`<span class="rp xp">✧ ${fmt(reward.xp)} XP</span>`);
  if (reward.pack) bits.push(`<span class="rp pack">▣ ${esc(PACK_MAP[reward.pack]?.name || reward.pack)}</span>`);
  if (reward.card) bits.push(`<span class="rp card">★ ${esc(CARD_MAP[reward.card]?.name || 'Collector card')}</span>`);
  if (reward.title) bits.push(`<span class="rp title">♛ ${esc(reward.title)}</span>`);
  if (reward.decoration) bits.push(`<span class="rp decor">◇ Showroom decor</span>`);
  return bits.join('');
}

function challengeCard(c) {
  const tone = DIFF_TONE[c.difficulty] || DIFF_TONE.medium;
  const pct = Math.max(0, Math.min(100, c.percentage || 0));
  return `<article class="hist-challenge ${c.claimed ? 'claimed' : ''}${c.rewardReady ? 'ready' : ''}">
    <div class="hc-icon">${esc(c.icon || '◎')}</div>
    <div class="hc-body">
      <div class="hc-top">
        <h4>${esc(c.title)}</h4>
        <span class="hc-diff" style="--diff:${tone}">${esc(c.difficulty || 'medium')}</span>
      </div>
      <p>${esc(c.desc)}</p>
      <div class="hc-progress">
        <div class="hc-track"><i style="width:${pct}%"></i></div>
        <span>${c.progress || 0} / ${c.goal}</span>
      </div>
      <div class="hc-reward"><small>REWARD</small>${rewardPreview(c.reward)}</div>
    </div>
    <div class="hc-action">
      ${c.claimed
        ? '<span class="hc-done">✓ Claimed</span>'
        : c.rewardReady
          ? `<button class="btn btn-sm btn-gold" data-claim-hchallenge="${esc(c.id)}">Claim</button>`
          : `<span class="hc-locked">${pct}%</span>`}
    </div>
  </article>`;
}

function seasonsTab() {
  const decades = [...new Set(ALL_SEASONS.map(s => s.decade))];
  let list = ALL_SEASONS;
  if (historyView.sport !== 'all') list = list.filter(s => s.sport === historyView.sport);
  if (historyView.decade !== 'all') list = list.filter(s => s.decade === historyView.decade);
  if (historyView.query.trim()) list = searchSeasons(historyView.query, historyView.sport === 'all' ? null : historyView.sport);

  const completed = new Set(getState().history.completedSeasons);
  const grouped = {};
  for (const s of list) (grouped[s.decade] ||= []).push(s);
  const decadesToShow = historyView.decade === 'all' ? decades : [historyView.decade];

  return `<div class="archive-controls">
      <div class="ac-search"><span>⌕</span><input type="search" id="season-search" placeholder="Search year, champion, team or decade…" value="${esc(historyView.query)}" data-season-search aria-label="Search seasons"></div>
      <div class="ac-filters">
        <div class="seg">
          ${[['all','Both'],['f1','Formula 1'],['motogp','MotoGP']].map(([id,label]) => `<button class="${historyView.sport === id ? 'active' : ''}" data-hsport="${id}">${label}</button>`).join('')}
        </div>
        <select data-hdecade aria-label="Filter by decade">
          <option value="all">All decades</option>
          ${decades.map(d => `<option value="${d}" ${historyView.decade === d ? 'selected' : ''}>${d}</option>`).join('')}
        </select>
      </div>
    </div>

    ${list.length ? decadesToShow.filter(d => grouped[d]?.length).map(d => {
      const rows = grouped[d];
      return `<section class="decade-section">
        <div class="decade-head"><h3>${d}</h3><span>${rows.length} season${rows.length === 1 ? '' : 's'}</span></div>
        <div class="season-grid">
          ${rows.map(s => {
            const prog = seasonProgress(s.id);
            const done = completed.has(s.id);
            return `<button class="season-card ${s.sport}${done ? ' done' : ''}${s.inProgress ? ' live' : ''}" data-season="${esc(s.id)}">
              <div class="sc-year">${s.year}</div>
              <div class="sc-label">${esc(s.label)}</div>
              <div class="sc-champ">${s.inProgress ? 'Season in progress' : esc(s.champion)}</div>
              <div class="sc-make">${esc(s.make)}</div>
              <div class="sc-foot">
                <span class="sc-prog"><i style="width:${prog.pct}%"></i></span>
                <span class="sc-pct">${done ? '✓' : prog.pct + '%'}</span>
              </div>
            </button>`;
          }).join('')}
        </div>
      </section>`;
    }).join('') : emptyState('⌕', 'No seasons found', 'Try a different champion, team or decade.', `<button class="btn btn-sm" data-hsport="all" data-hdecade="all" data-clear-search>Clear filters</button>`)}`;
}

function challengesTab() {
  const all = historicalChallenges();
  const list = historyView.challengeCategory === 'all' ? all : all.filter(c => c.category === historyView.challengeCategory);
  const ready = all.filter(c => c.rewardReady).length;
  const claimed = all.filter(c => c.claimed).length;
  return `<div class="archive-summary">
      <div><span>${all.length}</span><small>Historical goals</small></div>
      <div><span>${ready}</span><small>Rewards ready</small></div>
      <div><span>${claimed}</span><small>Completed</small></div>
      <div><span>${seasonPrestige().title}</span><small>Archive rank</small></div>
    </div>
    <div class="challenge-cats">
      ${CHALLENGE_CATEGORIES.map(c => `<button class="${historyView.challengeCategory === c.id ? 'active' : ''}" data-hchallenge-cat="${c.id}">${esc(c.label)}</button>`).join('')}
    </div>
    ${list.length ? `<div class="hist-challenges">${list.map(challengeCard).join('')}</div>` : emptyState('◎', 'No goals here', 'Pick another category to see more historical challenges.')}`;
}

function marketRow(entry, kind) {
  const c = entry.card;
  return `<button class="mp-row" data-open-card="${esc(c.id)}">
    ${miniCardHTML(c)}
    <span class="mp-name"><b>${esc(c.name)}</b><small>${esc(c.era)} · ${esc(c.rarity)}</small></span>
    <span class="mp-chg ${dirClass(entry.change)}">${signed(entry.change)}</span>
    <span class="mp-kind ${kind}">${kind === 'up' ? '▲ GAIN' : '▼ LOSS'}</span>
  </button>`;
}

function marketTab() {
  const pulse = marketPulse();
  const idx = pulse.index;
  const featureIds = ['f1-1988-champion', 'motogp-2004-champion', 'f1-2021-champion', 'motogp-2013-champion'];
  const features = featureIds.map(id => marketCardDetail(id)).filter(Boolean);
  const ranges = [['24h','24 hours','series24'],['7d','7 days','series7'],['30d','30 days','series30']];
  const active = ranges.find(r => r[0] === historyView.marketRange) || ranges[0];

  return `<div class="market-pulse-hero">
      <div class="mp-index">
        <small>APEX 100 · historical archive index</small>
        <b>${idx.value.toFixed(1)}</b>
        <span class="${idx.direction}">${dirArrow(idx.direction)} ${signed(idx.change)} · ${esc(idx.mood)}</span>
      </div>
      <div class="mp-note">Prices are simulated locally and genuinely move up <em>and</em> down. Daily shocks, championship anniversaries, race weeks, scarcity and collector demand all feed the live value of every card. History, grading and trading use these same prices.</div>
    </div>

    <div class="mp-feature-grid">
      ${features.map(({card, info, indicators, series24, series7, series30}) => {
        const series = active[0] === '24h' ? series24 : active[0] === '7d' ? series7 : series30;
        const change = active[0] === '24h' ? info.change24 : active[0] === '7d' ? info.change7 : info.change30;
        return `<article class="mp-feature">
          <div class="mpf-top">${miniCardHTML(card)}<div><b>${esc(card.name)}</b><small>${esc(card.era)} · ${esc(card.rarity)}</small></div></div>
          <div class="mpf-price"><span>Live value</span><b>◈ ${fmt(info.value)}</b></div>
          <div class="mpf-changes">
            <span class="${dirClass(info.change24)}"><small>24h</small>${signed(info.change24)}</span>
            <span class="${dirClass(info.change7)}"><small>7d</small>${signed(info.change7)}</span>
            <span class="${dirClass(info.change30)}"><small>30d</small>${signed(info.change30)}</span>
          </div>
          <div class="mpf-range">
            <div class="mpf-range-head">
              <div class="seg small">${ranges.map(r => `<button class="${historyView.marketRange === r[0] ? 'active' : ''}" data-hmarket-range="${r[0]}">${r[0]}</button>`).join('')}</div>
              <span class="${dirClass(change)}">${signed(change)}</span>
            </div>
            ${sparklineHTML(series.map(p => p.value), {width:320, height:64})}
            <small>${esc(active[1])} price history</small>
          </div>
          <div class="mpf-signals">${indicators.map(i => `<span class="sig ${esc(i.cls)}">${esc(i.label)}</span>`).join('')}</div>
        </article>`;
      }).join('')}
    </div>

    <div class="mp-movers">
      <div class="panel"><div class="panel-head"><h3><span class="bar"></span> Top gainers · 24h</h3></div>
        <div class="mp-list">${pulse.gainers.length ? pulse.gainers.map(m => marketRow(m, 'up')).join('') : '<p class="muted">No gainers in the sample right now.</p>'}</div>
      </div>
      <div class="panel"><div class="panel-head"><h3><span class="bar"></span> Top losers · 24h</h3></div>
        <div class="mp-list">${pulse.losers.length ? pulse.losers.map(m => marketRow(m, 'down')).join('') : '<p class="muted">No losers in the sample right now.</p>'}</div>
      </div>
    </div>

    ${pulse.events.length ? `<div class="mp-events panel"><div class="panel-head"><h3><span class="bar"></span> Market events in play</h3></div>
      <div class="mp-event-grid">${pulse.events.map(e => `<div class="mp-event"><b>✦ ${esc(e.label)}</b><span>×${e.factor.toFixed(2)} value · ${esc(e.cards.slice(0,3).join(', '))}</span></div>`).join('')}</div>
    </div>` : ''}`;
}

function dirArrow(dir) { return dir === 'up' ? '▲' : dir === 'down' ? '▼' : '•'; }

export function archiveScreen() {
  const prestige = seasonPrestige();
  const ownedSeasonCards = new Set(getState().items.filter(i => SEASON_CARD_IDS.includes(i.cardId)).map(i => i.cardId)).size;
  const tab = historyView.tab;
  return `<div class="screen archive-screen" data-screen="archive">
    <div class="page-head archive-head">
      <div>
        <div class="eyebrow">${ALL_SEASONS.length} seasons · 1949 → 2026 · two disciplines</div>
        <h1 class="page-title">Historical <em>Archive</em></h1>
        <p class="page-sub">Every Formula 1 and premier-class motorcycle season, with its champion, machinery and defining moments. Collect each year, complete challenges, and watch the market move in real time.</p>
      </div>
      <div class="page-head-actions">
        <span class="chip gold">${prestige.completed} / ${ALL_SEASONS.length} seasons</span>
        <span class="chip">${ownedSeasonCards} / ${SEASON_CARD_IDS.length} cards</span>
      </div>
    </div>

    <div class="archive-rank">
      <div class="ar-badge">◈</div>
      <div class="ar-copy">
        <div><b>${esc(prestige.title)}</b><span>${prestige.completed} season${prestige.completed === 1 ? '' : 's'} complete · ${prestige.championCards} champion cards</span></div>
        <div class="ar-track"><i style="width:${prestige.pct}%"></i></div>
      </div>
      <span class="ar-bonus">+${fmt(prestige.bonusPoints)} showcase points</span>
    </div>

    <div class="archive-tabs">
      <button class="${tab === 'seasons' ? 'active' : ''}" data-htab="seasons">Season archives</button>
      <button class="${tab === 'challenges' ? 'active' : ''}" data-htab="challenges">Collection challenges</button>
      <button class="${tab === 'market' ? 'active' : ''}" data-htab="market">Market pulse</button>
    </div>

    <div class="archive-body">
      ${tab === 'seasons' ? seasonsTab() : tab === 'challenges' ? challengesTab() : marketTab()}
    </div>
  </div>`;
}

export function seasonDetailScreen(seasonId) {
  const season = ALL_SEASON_MAP[seasonId];
  if (!season) return `<div class="screen"><div class="empty-state"><div class="big">⚠</div><h4>Season not found</h4><button class="btn btn-primary" data-nav="archive">Back to archive</button></div></div>`;
  const prog = seasonProgress(seasonId);
  const album = ALBUM_MAP[`season-${seasonId}`];
  const albumProg = album ? albumProgress(album) : null;
  const pack = PACK_MAP[season.packId];
  const owned = new Set(getState().items.map(i => i.cardId));
  const cards = season.cards.map(c => CARD_MAP[c.i]).filter(Boolean);

  return `<div class="screen season-detail ${season.sport}" data-screen="season">
    <button class="btn btn-sm sd-back" data-nav="archive">← Back to archive</button>
    <div class="sd-hero">
      <div class="sd-hero-left">
        <div class="eyebrow">${esc(season.label)} · ${season.decade} · ${season.inProgress ? 'Season in progress' : 'Championship archive'}</div>
        <h1 class="page-title">${season.year} <em>Season</em></h1>
        <div class="sd-champ">
          <div><small>WORLD CHAMPION</small><b>${season.inProgress ? 'Undecided' : esc(season.champion)}</b></div>
          <div><small>${season.sport === 'f1' ? 'CONSTRUCTOR' : 'MANUFACTURER'}</small><b>${esc(season.make)}</b></div>
          <div><small>COLLECTION</small><b>${prog.have} / ${prog.total} cards</b></div>
        </div>
      </div>
      <div class="sd-hero-right">
        <div class="sd-prog"><i style="width:${prog.pct}%"></i></div>
        <span>${prog.complete ? 'Collection complete' : prog.pct + '% collected'}</span>
        <button class="btn btn-sm btn-primary" data-open-pack="${esc(season.packId)}" ${!pack ? 'disabled' : ''}>▣ Open season pack</button>
        ${albumProg?.complete && !albumProg.claimed ? `<button class="btn btn-sm btn-gold" data-claim-album="${esc(album.id)}">Claim album reward</button>` : ''}
      </div>
    </div>

    <div class="sd-moment"><span class="bar"></span><p>${esc(season.moment)}</p></div>

    <div class="sd-section-head"><h3>The ${season.year} collection</h3><span>${cards.filter(c => owned.has(c.id)).length} / ${cards.length} owned</span></div>
    <div class="sd-cards">
      ${cards.map(c => `<div class="sd-card ${owned.has(c.id) ? 'owned' : 'missing'}">
        <div class="sd-card-art" data-open-card="${esc(c.id)}">${cardHTML(c)}</div>
        <div class="sd-card-meta"><b>${esc(c.name)}</b><span>${owned.has(c.id) ? '✓ In your vault' : 'Not collected'}</span></div>
      </div>`).join('')}
    </div>

    <div class="sd-bottom">
      <div class="panel">
        <div class="panel-head"><h3><span class="bar"></span> Season challenge</h3></div>
        <p>${season.inProgress ? 'This season is still running. Its challenge opens when the championship concludes.' : `Complete all four cards from the ${season.year} ${season.label} season to claim the collection reward${season.champion !== 'Season in progress' ? ` — ${esc(season.champion)}’s title` : ''}.`}</p>
        <button class="btn btn-sm" data-nav="challenges">View challenges →</button>
      </div>
      <div class="panel">
        <div class="panel-head"><h3><span class="bar"></span> Pack contents</h3></div>
        <p>${esc(pack?.desc || 'A dedicated pack for this season.')}</p>
        <div class="sd-odds">${Object.entries(pack?.odds || {}).filter(([,v]) => v > 0).map(([r,v]) => `<span class="rar-${r}">${esc(r)} ${v}%</span>`).join('')}</div>
      </div>
    </div>
  </div>`;
}
