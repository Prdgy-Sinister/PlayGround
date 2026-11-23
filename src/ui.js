import { CHARACTERS, getCharacter, COSTUME_COLORS, ACCESSORIES, STAT_KEYS, STAT_LABELS, physical } from './characters.js';
import { ARENAS, ARENA_IDS, ROUNDS, ROUND_IDS, GAME_MODES } from './themes.js';
import { drawPortrait } from './characterRig.js';
import { save } from './save.js';
import { audio } from './audio.js';

const $ = id => document.getElementById(id);

export function createUI(game) {
  const ui = {
    screen: 'screen-title',
    setup: {
      mode: 'career', round: 'qualifier', arena: 'classic', difficulty: 1,
      characterId: save.data.selected
    },
    rosterReturn: 'title',
    feedTimers: [],
    hud: null,

    show(screen) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      const el = $(screen);
      if (el) el.classList.add('active');
      ui.screen = screen;
      save.persist();
    },

    hideAllMenus() {
      document.querySelectorAll('.menu-screen').forEach(s => s.classList.remove('active'));
    },

    refreshTokens() {
      ['title-tokens', 'play-tokens', 'setup-tokens', 'roster-tokens'].forEach(id => {
        const el = $(id);
        if (el) el.textContent = `🪙 ${save.data.tokens}`;
      });
    },

    /* -------------------- TITLE -------------------- */
    initTitle() {
      ui.refreshTokens();
      $('screen-title').querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
          audio.init(); audio.select();
          const a = btn.dataset.action;
          if (a === 'play') ui.showPlay();
          else if (a === 'roster') { ui.rosterReturn = 'title'; ui.openRoster(); }
          else if (a === 'leaderboard') ui.openLeaderboard();
          else if (a === 'howto') ui.show('screen-howto');
        });
      });
      ui.show('screen-title');
      if (game.setMenuCharacter) game.setMenuCharacter(save.data.selected);
    },

    /* -------------------- PLAY / MODES -------------------- */
    showPlay() {
      const grid = $('mode-grid');
      grid.innerHTML = '';
      for (const mode of Object.values(GAME_MODES)) {
        const card = document.createElement('button');
        card.className = 'mode-card';
        card.dataset.emoji = mode.emoji;
        let meta = mode.meta;
        if (mode.id === 'career') {
          meta = save.data.careerDone ? 'CAREER COMPLETE · REPLAY' : `ROUND ${save.data.careerRound} OF 4`;
        }
        if (mode.id === 'endless' && save.data.endlessBest > 0) meta += ` · BEST R${save.data.endlessBest}`;
        card.innerHTML = `<h3>${mode.name}</h3><p>${mode.desc}</p><div class="mode-meta">${meta}</div>`;
        card.addEventListener('click', () => {
          audio.init(); audio.select();
          ui.setup.mode = mode.id;
          ui.setup.characterId = save.data.selected;
          ui.showSetup();
        });
        grid.appendChild(card);
      }
      ui.refreshTokens();
      ui.show('screen-play');
    },

    /* -------------------- SETUP -------------------- */
    showSetup() {
      const s = ui.setup;
      const mode = GAME_MODES[s.mode];
      $('setup-title').textContent = mode.name;
      $('setup-sub').textContent = mode.desc;
      $('setup-tokens').textContent = `🪙 ${save.data.tokens}`;

      // defaults per mode
      if (s.mode === 'career') {
        s.round = ROUND_IDS[Math.min(3, Math.max(0, save.data.careerRound - 1))];
        s.arena = ['classic', 'tropical', 'winter', 'industrial'][Math.min(3, save.data.careerRound - 1)];
      }
      if (s.mode === 'championship') {
        s.round = 'qualifier';
        s.arena = 'classic';
      }
      if (s.mode === 'endless') {
        s.round = 'wipeout';
        s.arena = 'random';
      }
      s.characterId = save.data.selected;

      ui.renderSetupCharacter();
      ui.renderSetupOptions();
      const start = $('setup-start');
      start.onclick = () => {
        audio.init(); audio.select();
        ui.hideAllMenus();
        game.startRun({ ...ui.setup, costume: COSTUME_COLORS[save.data.costumeColor] || null, accessory: save.data.accessory });
      };
      ui.show('screen-setup');
    },

    renderSetupCharacter() {
      const c = getCharacter(save.data.selected);
      const prev = $('setup-char-preview');
      prev.innerHTML = '';
      const cv = document.createElement('canvas');
      prev.appendChild(cv);
      drawPortrait(cv, c, COSTUME_COLORS[save.data.costumeColor], save.data.accessory);
      $('setup-char-name').textContent = c.name;
      $('setup-char-tag').textContent = `“${c.tag}”`;
      $('setup-char-stats').innerHTML = STAT_KEYS.map(k => `
        <div class="stat-row"><span>${STAT_LABELS[k]}</span><div class="bar"><i style="width:${c.stats[k] * 10}%"></i></div></div>
      `).join('');
      const ch = $('setup-char-preview');
      ch.onclick = () => { ui.rosterReturn = 'setup'; ui.openRoster(); };
      ch.style.cursor = 'pointer';
      ch.title = 'Change character';
    },

    renderSetupOptions() {
      const s = ui.setup;
      const box = $('setup-options');
      box.innerHTML = '';
      const addGroup = (label, choices, active, onPick, disabledFn) => {
        const g = document.createElement('div');
        g.className = 'opt-group';
        g.innerHTML = `<label>${label}</label>`;
        const pills = document.createElement('div');
        pills.className = 'opt-pills';
        choices.forEach(ch => {
          const b = document.createElement('button');
          b.className = 'opt-pill' + (ch.value === active ? ' active' : '');
          b.textContent = ch.label;
          if (disabledFn && disabledFn(ch.value)) b.disabled = true;
          b.onclick = () => { audio.click(); onPick(ch.value); ui.renderSetupOptions(); };
          pills.appendChild(b);
        });
        g.appendChild(pills);
        box.appendChild(g);
      };

      if (s.mode === 'career') {
        const roundIdx = save.data.careerRound;
        const info = document.createElement('div');
        info.className = 'opt-group';
        info.style.flexBasis = '100%';
        info.innerHTML = `<label>CAREER PROGRESS</label><div style="font-size:12px;color:#c6e5ef;line-height:1.5">
          <b style="color:var(--sun)">ROUND ${Math.min(4, roundIdx)}: ${ROUNDS[ROUND_IDS[Math.min(3, roundIdx - 1)]].name}</b> · ${ARENAS[['classic','tropical','winter','industrial'][Math.min(3, roundIdx - 1)]].name}<br>
          ${save.data.careerDone ? 'You already lifted the trophy. Do it again, legend.' : 'Finish in the top five to advance. Three splashes eliminates you.'}</div>`;
        box.appendChild(info);
      }

      if (s.mode !== 'career' && s.mode !== 'championship' && s.mode !== 'endless') {
        addGroup('ROUND', ROUND_IDS.map(r => ({ value: r, label: ROUNDS[r].name })), s.round, v => { s.round = v; });
      }
      if (s.mode !== 'career' && s.mode !== 'championship') {
        const arenaChoices = ARENA_IDS.map(a => ({ value: a, label: ARENAS[a].short }));
        if (s.mode === 'endless') arenaChoices.push({ value: 'random', label: 'RANDOM' });
        addGroup('ARENA', arenaChoices, s.arena, v => { s.arena = v; });
      }
      if (s.mode === 'championship' || s.mode === 'career') {
        const info = document.createElement('div');
        info.className = 'opt-group';
        info.style.flexBasis = '100%';
        info.innerHTML = `<label>TOURNAMENT</label><div style="font-size:12px;color:#c6e5ef;line-height:1.5">
          ${s.mode === 'career'
            ? 'Four rounds across Classic, Tropical, Winter and the Industrial Wipeout Zone.'
            : 'Six rounds, six arenas, points for every finish. Highest total wins the championship.'}</div>`;
        box.appendChild(info);
      }
      addGroup('DIFFICULTY', [
        { value: 0.88, label: 'CHILL' },
        { value: 1.0, label: 'STANDARD' },
        { value: 1.12, label: 'BRUTAL' }
      ], s.difficulty, v => { s.difficulty = v; });

      // summary line
      const sum = document.createElement('div');
      sum.className = 'opt-group';
      sum.style.flexBasis = '100%';
      const rName = ROUNDS[s.round]?.name || 'MIXED';
      const aName = s.arena === 'random' ? 'ROTATING ARENAS' : (ARENAS[s.arena]?.name || 'ALL ARENAS');
      let extra = '';
      if (s.mode === 'career') extra = `<br><span style="color:#8fd5e8">${ROUNDS[ROUND_IDS[Math.min(3, save.data.careerRound - 1)]].blurb}</span>`;
      if (s.mode === 'championship') extra = '<br><span style="color:#8fd5e8">Six rounds · points · one crown.</span>';
      if (s.mode === 'endless') extra = '<br><span style="color:#8fd5e8">Endless rounds · 3 splashes · bragging rights.</span>';
      sum.innerHTML = `<label>YOUR EVENT</label><div style="font-size:12px;color:#c6e5ef;line-height:1.5">
        <b style="color:var(--sun)">${rName}</b> · ${aName}${extra}</div>`;
      box.appendChild(sum);
    },

    /* -------------------- ROSTER -------------------- */
    openRoster() {
      ui.renderRosterGrid();
      ui.renderRosterSide(save.data.selected);
      ui.refreshTokens();
      ui.show('screen-roster');
      game.setMenuCharacter?.(save.data.selected);
    },

    renderRosterGrid() {
      const grid = $('roster-grid');
      grid.innerHTML = '';
      CHARACTERS.forEach(c => {
        const owned = save.data.unlocked.includes(c.id);
        const card = document.createElement('button');
        card.className = 'roster-card' + (save.data.selected === c.id ? ' selected' : '') + (owned ? '' : ' locked-char');
        card.dataset.char = c.id;
        const price = c.unlock.tokens || 0;
        card.innerHTML = `<div class="rc-body"></div><b>${c.name}</b>${owned ? '' : `<div class="rc-lock">🔒</div>`}`;
        card.title = owned ? c.name : `${c.name} — unlock for ${price} coins`;
        card.onclick = () => {
          audio.init(); audio.select();
          if (save.data.unlocked.includes(c.id)) {
            save.data.selected = c.id;
            save.persist();
            ui.renderRosterGrid();
            ui.renderRosterSide(c.id);
            game.setMenuCharacter?.(c.id);
            ui.renderSetupCharacter();
            ui.refreshTokens();
          } else {
            ui.renderRosterSide(c.id);
          }
        };
        grid.appendChild(card);
        requestAnimationFrame(() => {
          const cv = document.createElement('canvas');
          card.querySelector('.rc-body').appendChild(cv);
          drawPortrait(cv, c, c.colors.shirt, c.accessory);
        });
      });
      // scroll selected into view
      const sel = grid.querySelector('.selected');
      if (sel) sel.scrollIntoView({ block: 'nearest' });
    },

    renderRosterSide(id) {
      const c = getCharacter(id);
      const owned = save.data.unlocked.includes(c.id);
      const prev = $('roster-preview');
      prev.innerHTML = '';
      const cv = document.createElement('canvas');
      prev.appendChild(cv);
      drawPortrait(cv, c, COSTUME_COLORS[save.data.costumeColor], save.data.accessory);
      $('roster-name').textContent = c.name;
      $('roster-tag').textContent = `“${c.tag}”`;
      $('roster-stats').innerHTML = STAT_KEYS.map(k => `
        <div class="stat-row"><span>${STAT_LABELS[k]}</span><div class="bar"><i style="width:${c.stats[k] * 10}%"></i></div></div>
      `).join('');

      const colors = $('custom-colors');
      colors.innerHTML = '';
      COSTUME_COLORS.forEach((col, i) => {
        const b = document.createElement('button');
        b.className = 'swatch' + (save.data.costumeColor === i ? ' active' : '');
        b.style.background = col;
        b.title = 'Costume colour';
        b.onclick = () => {
          save.data.costumeColor = i; save.persist();
          ui.renderRosterSide(id);
          ui.renderRosterGrid();
          ui.renderSetupCharacter();
          game.setMenuCharacter?.(id);
          audio.click();
        };
        colors.appendChild(b);
      });
      const accs = $('custom-accessories');
      accs.innerHTML = '';
      ACCESSORIES.forEach(a => {
        const b = document.createElement('button');
        b.className = 'acc-btn' + (save.data.accessory === a.id ? ' active' : '');
        b.textContent = a.label;
        b.onclick = () => {
          save.data.accessory = a.id; save.persist();
          ui.renderRosterSide(id);
          ui.renderRosterGrid();
          ui.renderSetupCharacter();
          game.setMenuCharacter?.(id);
          audio.click();
        };
        accs.appendChild(b);
      });

      const action = $('roster-action');
      const lock = $('roster-lock');
      if (!owned) {
        const price = c.unlock.tokens || 5;
        const can = save.data.tokens >= price;
        action.textContent = can ? `UNLOCK · 🪙 ${price}` : `NEED 🪙 ${price}`;
        action.disabled = !can;
        action.onclick = () => {
          if (!save.data.spendTokens(price)) return;
          save.unlock(c.id);
          save.data.selected = c.id;
          save.persist();
          audio.coin();
          ui.refreshTokens();
          ui.renderRosterGrid();
          ui.renderRosterSide(c.id);
          ui.renderSetupCharacter();
          game.setMenuCharacter?.(c.id);
        };
        lock.textContent = `Locked. Earn coins in Career and Championship, or pay ${price} coins.`;
      } else {
        action.textContent = save.data.selected === c.id ? 'SELECTED ✓' : 'SELECT';
        action.disabled = save.data.selected === c.id;
        action.onclick = () => {
          save.data.selected = c.id; save.persist(); audio.select();
          ui.renderRosterGrid(); ui.renderRosterSide(c.id);
          ui.renderSetupCharacter();
          game.setMenuCharacter?.(c.id);
        };
        lock.textContent = save.data.selected === c.id ? 'This is your contestant.' : '';
      }

      // physical summary
      const ph = physical(c);
      const extras = document.createElement('div');
      extras.style.cssText = 'font-size:10px;color:#8dc2d6;margin-top:8px;line-height:1.45';
      extras.innerHTML = `Height ${(ph.height / 1.6 * 1.8).toFixed(2)}m · Mass ${ph.mass.toFixed(1)} · Knockback resist ${Math.round(ph.knockResist * 100)}%`;
      $('roster-stats').after(extras);
    },

    /* -------------------- LEADERBOARD -------------------- */
    openLeaderboard() {
      const tabs = $('leaderboard-tabs');
      const modes = [['timeTrial', 'TIME TRIAL'], ['career', 'CAREER'], ['championship', 'CHAMPIONSHIP'], ['quick', 'QUICK PLAY'], ['endless', 'ENDLESS']];
      tabs.innerHTML = '';
      modes.forEach(([id, label], i) => {
        const b = document.createElement('button');
        b.className = 'tab' + (i === 0 ? ' active' : '');
        b.textContent = label;
        b.onclick = () => {
          tabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
          b.classList.add('active');
          ui.renderLeaderboard(id);
          audio.click();
        };
        tabs.appendChild(b);
      });
      ui.renderLeaderboard('timeTrial');
      ui.show('screen-leaderboard');
    },

    renderLeaderboard(mode) {
      const body = $('leaderboard-body');
      let rows = [];
      for (const [key, list] of Object.entries(save.data.leaderboards)) {
        const [m, round, arena] = key.split(':');
        if (m !== mode) continue;
        list.forEach(e => rows.push({ ...e, round, arena }));
      }
      rows.sort((a, b) => a.time - b.time);
      rows = rows.slice(0, 18);
      if (!rows.length) {
        body.innerHTML = `<div class="lb-empty">No times yet.<br>Get out there and embarrass yourself for the record books.</div>`;
        return;
      }
      body.innerHTML = rows.map((r, i) => {
        const c = getCharacter(r.charId);
        return `<div class="lb-row${r.me ? ' me' : ''}">
          <span class="lb-pos">#${i + 1}</span>
          <span class="lb-name">${r.name || 'You'} <span class="lb-char">${c.name} · ${ROUNDS[r.round]?.name || r.round} · ${ARENAS[r.arena]?.short || r.arena}</span></span>
          <span class="lb-time">${fmtTime(r.time)}</span>
          <span class="lb-char">${r.date || ''}</span>
        </div>`;
      }).join('');
    },

    /* -------------------- HUD -------------------- */
    setupHUD(cfg) {
      ui.hud = cfg;
      $('hud-round-label').textContent = cfg.roundLabel;
      $('hud-round-name').textContent = cfg.roundName;
      const pips = $('hud-splashes');
      pips.innerHTML = '';
      for (let i = 0; i < cfg.maxSplashes; i++) pips.appendChild(document.createElement('i'));
      $('hud-checkpoint').textContent = 'START';
      $('hud-feed').innerHTML = '';
      $('hud-bonus').classList.remove('show');
      $('countdown').textContent = '';
      $('hud-progress-fill').style.width = '0%';
      $('hud-progress-me').style.left = '0%';
      $('hud-stamina').style.width = '100%';
      $('hud-stamina').classList.remove('low');
      $('hud-timer').textContent = '0:00.00';
      $('hud-position').textContent = `— / ${cfg.totalRacers}`;
      ui.show('hud');
    },

    updateHUD(state) {
      if (!ui.hud) return;
      $('hud-timer').textContent = fmtTime(state.time);
      $('hud-progress-fill').style.width = `${state.progress * 100}%`;
      $('hud-progress-me').style.left = `${state.progress * 100}%`;
      $('hud-position').textContent = `${ordinal(state.rank)} / ${state.totalRacers}`;
      const pips = $('hud-splashes').children;
      for (let i = 0; i < pips.length; i++) pips[i].classList.toggle('used', i < state.splashes);
      const stam = $('hud-stamina');
      stam.style.width = `${Math.max(0, state.stamina) * 100}%`;
      stam.classList.toggle('low', state.stamina < 0.3);
      $('hud-speed').textContent = Math.round(state.speed * 3.6);
      $('hud-checkpoint').textContent = state.checkpoint;
    },

    countdown(text) {
      const el = $('countdown');
      el.textContent = text;
      el.classList.remove('tick');
      void el.offsetWidth;
      el.classList.add('tick');
    },

    feed(text, kind = '') {
      const feed = $('hud-feed');
      const item = document.createElement('div');
      item.className = 'feed-item ' + kind;
      item.textContent = text;
      feed.appendChild(item);
      while (feed.children.length > 5) feed.removeChild(feed.firstChild);
      setTimeout(() => { item.style.opacity = '0'; item.style.transition = 'opacity .5s'; }, 2600);
      setTimeout(() => item.remove(), 3200);
    },

    bonus(text) {
      const el = $('hud-bonus');
      el.textContent = text;
      el.classList.remove('show');
      void el.offsetWidth;
      el.classList.add('show');
    },

    splashFlash() {
      const el = $('splash-flash');
      el.classList.remove('go');
      void el.offsetWidth;
      el.classList.add('go');
    },

    /* -------------------- RESULTS -------------------- */
    showResults(data) {
      audio.init();
      $('results-kicker').textContent = data.kicker || 'ROUND COMPLETE';
      $('results-title').textContent = data.title;
      $('results-title').style.color = data.titleColor || 'var(--sun)';
      $('results-sub').textContent = data.sub || '';
      $('res-time').textContent = fmtTime(data.time ?? 0);
      $('res-rank').textContent = data.rank ? `${ordinal(data.rank)} / ${data.total || 8}` : '—';
      $('res-splash').textContent = data.splashes ?? 0;
      $('res-tokens').textContent = `🪙 +${data.tokens || 0}`;
      $('results-table').innerHTML = (data.rows || []).map(r => `
        <div class="lb-row${r.me ? ' me' : ''}">
          <span class="lb-pos">#${r.rank}</span>
          <span class="lb-name">${r.name}${r.me ? ' <span style="color:var(--sun)">(YOU)</span>' : ''}</span>
          <span class="lb-char">${r.detail || ''}</span>
          <span class="lb-time">${r.timeText || ''}</span>
        </div>`).join('');
      $('results-unlocks').innerHTML = (data.unlocks || []).map(u => `<span class="unlock-pill">${u}</span>`).join('');
      const btns = $('results-buttons');
      btns.innerHTML = '';
      (data.buttons || []).forEach(b => {
        const el = document.createElement('button');
        el.className = 'btn' + (b.primary ? ' primary' : (b.ghost ? ' ghost' : ''));
        el.textContent = b.label;
        el.onclick = () => { audio.select(); b.onClick(); };
        btns.appendChild(el);
      });
      ui.hideAllMenus();
      $('hud').classList.remove('active');
      ui.show('screen-results');
      if (data.tokens) { save.addTokens(data.tokens); ui.refreshTokens(); }
      if (data.qualified) audio.finish(); else if (data.eliminated) audio.fail();
    },

    showStandings(data) {
      $('standings-kicker').textContent = data.kicker || 'CHAMPIONSHIP';
      $('standings-title').textContent = data.title;
      $('standings-sub').textContent = data.sub || '';
      $('standings-table').innerHTML = (data.rows || []).map(r => `
        <div class="lb-row${r.me ? ' me' : ''}">
          <span class="lb-pos">#${r.rank}</span>
          <span class="lb-name">${r.name}${r.me ? ' <span style="color:var(--sun)">(YOU)</span>' : ''}</span>
          <span class="lb-char">${r.detail || ''}</span>
          <span class="lb-time">${r.points ?? ''}</span>
        </div>`).join('');
      const btns = $('standings-buttons');
      btns.innerHTML = '';
      (data.buttons || []).forEach(b => {
        const el = document.createElement('button');
        el.className = 'btn' + (b.primary ? ' primary' : (b.ghost ? ' ghost' : ''));
        el.textContent = b.label;
        el.onclick = () => { audio.select(); b.onClick(); };
        btns.appendChild(el);
      });
      ui.hideAllMenus();
      $('hud').classList.remove('active');
      $('screen-standings').classList.add('active');
      ui.screen = 'screen-standings';
    },

    showPause(paused) {
      if (paused) $('screen-pause').classList.add('active');
      else $('screen-pause').classList.remove('active');
    },

    /* -------------------- MISC -------------------- */
    initMisc() {
      document.querySelectorAll('[data-back]').forEach(btn => {
        btn.addEventListener('click', () => {
          audio.init(); audio.click();
          const target = btn.dataset.back;
          if (target === 'play') ui.showPlay();
          else if (target === 'title') ui.initTitle();
        });
      });
      $('howto-ok').onclick = () => { audio.click(); ui.initTitle(); };
      const mute = $('toggle-mute');
      const low = $('toggle-quality');
      mute.checked = save.data.muted;
      low.checked = save.data.lowGfx;
      audio.setMuted(save.data.muted);
      mute.onchange = () => {
        save.data.muted = mute.checked; save.persist();
        audio.init(); audio.setMuted(mute.checked);
        game.setLowGfx?.(save.data.lowGfx);
      };
      low.onchange = () => {
        save.data.lowGfx = low.checked; save.persist();
        document.body.classList.toggle('low-gfx', low.checked);
        game.setLowGfx?.(low.checked);
      };
      $('pause-resume').onclick = () => { audio.click(); game.resume(); };
      $('pause-restart').onclick = () => { audio.click(); game.restartRound(); };
      $('pause-quit').onclick = () => { audio.click(); game.quitToMenu(); };
      $('pause-btn').onclick = () => { audio.click(); game.pause(); };

      // roster back button special: return to setup if that's where we came from
      const rosterBack = document.querySelector('#screen-roster [data-back]');
      rosterBack.addEventListener('click', e => {
        e.stopImmediatePropagation();
        audio.click();
        if (ui.rosterReturn === 'setup') { ui.renderSetupCharacter(); ui.show('screen-setup'); }
        else ui.initTitle();
      }, true);
    }
  };
  return ui;
}

export function fmtTime(sec) {
  if (sec == null || !isFinite(sec)) return '—';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  const cs = Math.floor((sec % 1) * 100);
  return `${m}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
}

export function ordinal(n) {
  if (!n) return '—';
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
