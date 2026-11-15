import { Game } from './game.js';
import { World } from './world.js';
import { UI } from './ui.js';
import { audio } from './audio.js';

const canvas = document.getElementById('scene');

const game = new Game();
const world = new World(canvas, game);
const ui = new UI(game, world, audio);
game.bind(ui, world, audio);
ui.bind();

// Hide the loading screen once the first frame is ready.
requestAnimationFrame(() => {
  setTimeout(() => document.getElementById('loading')?.classList.add('gone'), 250);
});

let last = performance.now();
let frames = 0;
function loop(now) {
  requestAnimationFrame(loop);
  const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
  last = now;
  try {
    game.tick(dt);
    world.update(dt);
    ui.tick(dt);
    world.render();
  } catch (err) {
    console.error(err);
  }
  frames++;
}
requestAnimationFrame(loop);

// expose for debugging in the console only
window.SAMURAI = { game, world, ui };
