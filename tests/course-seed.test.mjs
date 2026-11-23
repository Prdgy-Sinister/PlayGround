// Headless generation test for seeded course variation.
//
// Builds run in Node with a tiny canvas stub: course generation only needs a 2D
// context for procedural texture painting, never a GPU. The test proves that
//   * identical seeds produce identical hazard layouts,
//   * different seeds shuffle the hazard-type pools,
//   * and every layout keeps checkpoints, hazards, and a finish line.
import assert from 'node:assert/strict';
import { ARENAS, ROUND_IDS } from '../src/themes.js';

// ---------------------------------------------------------------------------
// Minimal DOM surface used by procedural textures.
// ---------------------------------------------------------------------------
const gradient = { addColorStop() {} };
const ctx = new Proxy({}, {
  get(_t, prop) {
    if (prop === 'createLinearGradient' || prop === 'createRadialGradient') {
      return () => gradient;
    }
    if (prop === 'measureText') return () => ({ width: 12 });
    if (prop === 'getImageData') return () => ({ data: new Uint8ClampedArray(4) });
    return () => {};
  },
  set() { return true; }
});
const canvasStub = () => ({ width: 0, height: 0, getContext: () => ctx });
globalThis.document = { createElement: canvasStub };

const { buildCourse } = await import('../src/course.js');

function build(round, arenaId, seedExtra, endlessLevel = 0) {
  return buildCourse({
    round,
    arena: ARENAS[arenaId],
    difficulty: 1,
    seedExtra,
    endlessLevel
  });
}

function signature(course) {
  return course.obstacles
    .map(o => {
      const p = o.group.position;
      return [o.type, p.x.toFixed(2), p.y.toFixed(2), p.z.toFixed(2)].join(':');
    })
    .join('|');
}

function types(course) {
  return [...new Set(course.obstacles.map(o => o.type))].sort();
}

const seeds = ['1000', '1001', '1002', '1003', '1004', '1005'];
const rounds = ROUND_IDS.length ? ROUND_IDS : ['qualifier', 'sweeper', 'dizzy', 'wipeout'];

// ---------------------------------------------------------------------------
// 1. Same seed => byte-identical layout, across every round.
// ---------------------------------------------------------------------------
for (const round of rounds) {
  for (const seed of seeds.slice(0, 2)) {
    const a = build(round, 'classic', seed);
    const b = build(round, 'classic', seed);
    assert.equal(signature(a), signature(b), `${round} seed ${seed} is not deterministic`);
    assert.equal(a.finishZ, b.finishZ, `${round} seed ${seed} finish differs`);
  }
}

// ---------------------------------------------------------------------------
// 2. Different seeds => different layouts and shuffled hazard pools.
// ---------------------------------------------------------------------------
for (const round of rounds) {
  const layouts = new Set();
  const union = new Set();
  for (const seed of seeds) {
    const course = build(round, 'classic', seed);
    layouts.add(signature(course));
    types(course).forEach(t => union.add(t));
  }
  assert.ok(layouts.size >= seeds.length - 1,
    `${round} produced only ${layouts.size} distinct layouts across ${seeds.length} seeds`);
  assert.ok(union.size >= 4,
    `${round} uses only ${union.size} hazard types across seeds: ${[...union].join(', ')}`);
}

// ---------------------------------------------------------------------------
// 3. Endless levels remix the same base seed.
// ---------------------------------------------------------------------------
{
  const layouts = new Set();
  for (let level = 0; level < 5; level++) {
    layouts.add(signature(build('qualifier', 'classic', '1000', level)));
  }
  assert.ok(layouts.size >= 3,
    `endlessLevel produced only ${layouts.size} layouts across 5 levels`);
}

// ---------------------------------------------------------------------------
// 4. Every round stays completable: hazards, checkpoints, finish, fair route.
// ---------------------------------------------------------------------------
for (const round of rounds) {
  const course = build(round, 'classic', '4242');
  assert.ok(course.obstacles.length >= 4, `${round} has too few hazards`);
  assert.ok(course.checkpoints.length >= 3, `${round} is missing checkpoints`);
  assert.ok(course.finishZ < course.startZ, `${round} finish is not ahead of the start`);
  assert.ok(course.parTime > 0, `${round} has no par time`);
  // The start line and the finish line must always be standable ground.
  assert.ok(course.groundAt(course.startX, course.startZ, 2), `${round} start has no ground`);
  assert.ok(course.groundAt(0, course.finishZ - 4, 2), `${round} finish has no ground`);
}

console.log('course seed variation: ok');
for (const round of rounds) {
  const sample = seeds.map(s => types(build(round, 'classic', s)).length);
  console.log(`  ${round}: ${Math.min(...sample)}-${Math.max(...sample)} hazard kinds per seed`);
}
