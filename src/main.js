import { load, S } from './save.js';
import { Game } from './game.js';
import { UI } from './ui.js';
import { setAudioEnabled, unlockAudio } from './audio.js';

function bootError(msg) {
  const f = document.getElementById('fatal');
  if (f) { f.textContent = msg; f.classList.remove('hidden'); }
  const b = document.getElementById('boot');
  if (b) b.classList.add('done');
}

async function start() {
  load();
  const state = S();
  setAudioEnabled('music', state.settings.music);
  setAudioEnabled('sfx', state.settings.sfx);

  const stage = document.getElementById('stage');
  let game;
  try {
    game = new Game(stage);
  } catch (err) {
    console.error(err);
    bootError('This device could not start 3D graphics. Please try a newer browser with WebGL 2 enabled.');
    return;
  }

  const ui = new UI(game);
  window.dragonGame = game;
  window.dragonUI = ui;

  const boot = document.getElementById('boot');
  const bar = boot.querySelector('.boot-bar i');
  const text = document.getElementById('boot-text');
  const stages = [['Waking the dragons…', 25], ['Charting the six skies…', 55], ['Polishing saddles…', 82], ['Ready to ride.', 100]];
  let i = 0;
  const tick = () => {
    if (i >= stages.length) {
      boot.classList.add('done');
      game.showMenu();
      ui.renderMenu();
      ui.updateChrome();
      setTimeout(() => boot.remove(), 900);
      return;
    }
    text.textContent = stages[i][0];
    bar.style.width = stages[i][1] + '%';
    i++;
    setTimeout(tick, i === stages.length ? 160 : 190);
  };
  game.showMenu();
  ui.renderMenu();
  ui.updateChrome();
  setTimeout(tick, 120);

  document.addEventListener('pointerdown', () => unlockAudio(), { once: true });
  document.addEventListener('keydown', () => unlockAudio(), { once: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && game.mode === 'race' && !game.race?.ended) {
      game.pause(true);
      ui.pauseRace();
    }
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
else start();
