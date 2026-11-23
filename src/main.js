import * as THREE from 'three';
import { createGame } from './game.js';
import { createUI } from './ui.js';
import { input } from './input.js';
import { save } from './save.js';
import { audio } from './audio.js';

save.load();

const canvas = document.getElementById('game-canvas');
const isMobile = (navigator.maxTouchPoints || 0) > 0 || window.innerWidth < 820;
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: !isMobile,
  powerPreference: 'high-performance',
  alpha: false,
  stencil: false
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.35 : 1.6));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const game = createGame(renderer, null);
const ui = createUI(game);
game.ui = ui;

document.body.classList.toggle('low-gfx', save.data.lowGfx);
ui.initMisc();
game.init();
ui.initTitle();

input.init({ onHidden: () => game.pause() });
audio.setMuted(save.data.muted);

// Warm the audio context on the first user gesture, as browsers require.
const wake = () => { audio.init(); window.removeEventListener('pointerdown', wake); window.removeEventListener('keydown', wake); };
window.addEventListener('pointerdown', wake);
window.addEventListener('keydown', wake);

setTimeout(() => {
  const loading = document.getElementById('loading');
  loading.classList.add('gone');
  setTimeout(() => loading.remove(), 700);
}, 450);

// Expose a tiny debug handle for automated smoke tests / curious humans.
window.__wipeout = { game, ui, save, input, audio, renderer, THREE };
