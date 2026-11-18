import * as Game from './game.js';
import { initUI, render, showToast } from './ui.js';

Game.setNotifier((msg, kind) => showToast(msg, kind));

try {
  Game.loadGame();
} catch (err) {
  console.warn('Could not restore save', err);
}

initUI();
render();

window.addEventListener('beforeunload', () => {
  try { Game.saveGame(); } catch (err) { /* ignore */ }
});

// Debug handle for local testing / console tinkering.
window.MusicEmpire = { Game };
