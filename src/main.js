import { Game } from './game.js';
import { World } from './world.js';
import { LiteWorld } from './world2d.js';
import { UI } from './ui.js';
import { audio } from './audio.js';

let canvas = document.getElementById('scene');

const boot = {
  startedAt: performance.now(),
  errors: [],
  ready: false,
  contextLost: false,
};
window.SAMURAI = { boot };

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function notice(title, body, { sticky = true } = {}) {
  let el = document.getElementById('boot-notice');
  if (!el) {
    el = document.createElement('div');
    el.id = 'boot-notice';
    el.className = 'boot-notice';
    el.innerHTML = `
      <div class="boot-card" role="alertdialog" aria-live="assertive">
        <div class="boot-kanji">!</div>
        <h2></h2>
        <p></p>
        <div class="boot-actions">
          <button type="button" class="btn" data-boot-reload>Reload the page</button>
          <button type="button" class="btn btn-quiet" data-boot-dismiss>Dismiss</button>
        </div>
        <small class="boot-hint">If this keeps happening, reload the page or try a different browser.</small>
      </div>`;
    el.querySelector('[data-boot-reload]').addEventListener('click', () => location.reload());
    el.querySelector('[data-boot-dismiss]').addEventListener('click', () => el.remove());
    document.getElementById('app')?.appendChild(el);
  }
  el.querySelector('h2').textContent = title;
  el.querySelector('p').textContent = body;
  el.style.pointerEvents = 'auto';
  if (!sticky) setTimeout(() => el.remove(), 9000);
  return el;
}

function record(kind, err) {
  const message = err?.message || String(err);
  boot.errors.push({ kind, message, at: Math.round(performance.now()) });
  if (boot.errors.length > 24) boot.errors.shift();
  console.error(`[samurai:${kind}]`, err);
}

function bootFailed(err) {
  record('boot', err);
  document.getElementById('loading')?.classList.add('gone');
  const detail = err?.message || String(err);
  notice(
    'The mountain could not be drawn',
    `The game could not start. ${detail} Your save is safe — reload to try again.`,
  );
}

let game;
let world;
let ui;

// A canvas that has been asked for WebGL can refuse a 2D context afterwards,
// so the fallback always gets a brand-new element.
function freshCanvas() {
  const next = document.createElement('canvas');
  next.id = canvas.id || 'scene';
  if (canvas.className) next.className = canvas.className;
  for (const attr of canvas.attributes) {
    if (!['id', 'class'].includes(attr.name)) next.setAttribute(attr.name, attr.value);
  }
  canvas.replaceWith(next);
  canvas = next;
  return next;
}

function buildWorld(forceLite) {
  if (!forceLite) {
    try {
      const w = new World(canvas, game);
      boot.mode = 'webgl';
      return w;
    } catch (err) {
      boot.webglError = err?.message || String(err);
      record('webgl', err);
    }
  }
  freshCanvas();
  const w = new LiteWorld(canvas, game);
  w.lite = true;
  boot.mode = 'canvas2d';
  return w;
}

// Used when WebGL dies after startup (driver reset, GPU process crash, tab
// backgrounded on a low-memory phone). The game keeps playing in scroll view.
function useLiteView(reason) {
  if (!game || boot.mode === 'canvas2d') return false;
  try {
    const previous = world;
    const lite = buildWorld(true);
    lite.state = game.state;
    world = lite;
    game.world = lite;
    boot.contextLost = false;
    if (ui) {
      ui.attachWorld(lite);
      ui.toast?.('Graphics acceleration is unavailable. Switched to the 2D scroll view — all gameplay is safe.', 'warn');
    }
    if (window.SAMURAI) window.SAMURAI.world = lite;
    try {
      previous?.renderer?.dispose?.();
      previous?.renderer?.forceContextLoss?.();
    } catch { /* the context is already gone */ }
    document.getElementById('boot-notice')?.remove();
    return true;
  } catch (err) {
    record('canvas', err);
    bootFailed(err);
    return false;
  }
}

try {
  game = new Game();
  world = buildWorld(false);
  ui = new UI(game, world, audio);
  game.bind(ui, world, audio);
  ui.bind();
  boot.ready = true;
  window.SAMURAI = { game, world, ui, boot, notice, useLiteView };
} catch (err) {
  // A graphics failure should never leave a blank canvas behind a dead intro.
  bootFailed(err);
}

// A lost GL context is often recoverable; give it a moment, then fall back to
// the 2D view rather than leaving the player with a frozen scene.
canvas?.addEventListener('webglcontextlost', (event) => {
  event.preventDefault();
  boot.contextLost = true;
  if (world) world.contextLost = true;
  notice('Graphics paused', 'The graphics context was lost. Trying to restore it…', { sticky: false });
  setTimeout(() => {
    if (boot.mode === 'webgl' && (boot.contextLost || world?.contextLost)) {
      useLiteView('context lost');
    }
  }, 2200);
});
canvas?.addEventListener('webglcontextrestored', () => {
  boot.contextLost = false;
  if (world) {
    world.contextLost = false;
    world.resize?.();
    world.snapCamera?.();
  }
});

// Surface unexpected errors that happen outside the main loop.
window.addEventListener('error', (event) => {
  if (!event?.error) return;
  record('window', event.error);
});
window.addEventListener('unhandledrejection', (event) => {
  record('promise', event.reason);
});

let last = performance.now();
let frames = 0;
let loopFailures = 0;
let firstFrameAt = 0;
let warnedSlow = false;

function step(label, fn) {
  try {
    fn();
  } catch (err) {
    loopFailures++;
    if (loopFailures <= 3) record(label, err);
    if (loopFailures === 12) {
      notice(
        'The mountain is struggling',
        'Part of the simulation keeps failing. Your progress is saved; reload to continue. If it persists, the details are in the browser console.',
        { sticky: false },
      );
    }
  }
}

function loop(now) {
  requestAnimationFrame(loop);
  const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
  last = now;
  if (!game || !world || !ui) return;

  step('game', () => game.tick(dt));
  step('world', () => world.update(dt));
  step('ui', () => ui.tick(dt));
  step('render', () => {
    if (world.contextLost) return;
    world.render();
    if (!firstFrameAt) {
      firstFrameAt = now;
      document.getElementById('loading')?.classList.add('gone');
    }
  });
  frames++;

  // If nothing has drawn after a few seconds, say so rather than showing a blank screen.
  if (!warnedSlow && frames > 30 && !firstFrameAt) {
    warnedSlow = true;
    notice(
      'The first view is taking a while',
      'Your device is still compiling the mountain. If the screen stays empty, reload once — the game will keep your save.',
      { sticky: false },
    );
  }
}

requestAnimationFrame(loop);

// Remove the loading veil even on slow devices once the module has booted.
if (boot.ready) {
  requestAnimationFrame(() => {
    setTimeout(() => document.getElementById('loading')?.classList.add('gone'), 600);
  });
}
