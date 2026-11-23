import * as THREE from 'three';
import { buildCharacterMesh } from './characterRig.js';
import { randomBotCharacters, BOT_NAMES } from './characters.js';

// AI rivals are real characters running the same course on a timing rail.
// They are competitors for position, never substitute for player control.
export function createBots(course, playerCharacterId, count = 7, options = {}) {
  const chars = options.chars && options.chars.length
    ? options.chars
    : randomBotCharacters(playerCharacterId, count);
  const bots = [];
  const startZ = course.startZ;
  const totalDistance = Math.abs(course.finishZ - startZ);

  const par = course.parTime;
  const times = [];
  for (let i = 0; i < count; i++) {
    // spread finishers from quick to hopeless, with a little seeded variety
    const factor = 0.86 + (i / Math.max(1, count - 1)) * 0.36;
    times.push(par * factor);
  }
  // shuffle so rank isn't tied to lane
  times.sort(() => Math.random() - 0.5);

  for (let i = 0; i < count; i++) {
    const c = chars[i % chars.length];
    const rig = buildCharacterMesh(c, { detail: false, costume: c.colors.shirt, accessory: c.accessory });
    const g = new THREE.Group();
    g.add(rig.root);
    course.group.add(g);
    const lane = [-6.2, 6.2, -4.3, 4.3, -2.4, 2.4, 5.2][i % 7];
    const bot = {
      id: 'bot' + i,
      name: (options.names && options.names[i]) || `${BOT_NAMES[i % BOT_NAMES.length]} ${i + 1}`,
      character: c,
      rig, group: g,
      finishTime: times[i],
      idealFinish: times[i],
      laneOffset: lane,
      progress: 0,
      z: startZ,
      y: 0,
      prevY: 0,
      finished: false,
      rank: i + 1,
      phase: Math.random() * 6,
      stumble: 0,
      stumbleTimer: 1 + Math.random() * 4,
      yaw: 0,
      lastGround: 0,
      lean: 0
    };
    g.position.set(lane, 0.1, startZ + 0.9 + (i % 3) * 0.8);
    bots.push(bot);
  }

  const global = { bots, playerProgress: 0 };

  global.update = (dt, t, player, racing) => {
    const pProgress = Math.max(0, Math.min(1, (startZ - player.pos.z) / totalDistance));
    global.playerProgress = pProgress;
    for (const b of bots) {
      if (racing) {
        b.t = (b.t || 0) + dt;
        const tt = Math.min(1, b.t / b.finishTime);
        // stumbles cost time but bots keep moving
        b.progress = tt;
        if (b.t >= b.finishTime) b.finished = true;
      }
      const z = startZ - b.progress * totalDistance;
      b.z = z;
      let x = b.laneOffset;
      if (racing) {
        x += Math.sin(t * 0.8 + b.phase) * 0.7;
      }
      // squash toward centre at the finish
      if (b.progress > 0.94) x *= Math.max(0.15, (1 - b.progress) / 0.06);

      const ground = course.railGround(z, x);
      let groundTop = ground === null ? null : ground;
      if (groundTop !== null) {
        b.lastGround = groundTop;
        // jump when the next sample ahead has no floor
        const ahead = course.railGround(z - 1.6, x);
        const gapAhead = ahead === null;
        if (!gapAhead) {
          b.y = groundTop;
          b.rig.setPose('run', t, 0.85, 0.7);
        } else {
          b.y = groundTop + 0.8 + Math.abs(Math.sin(t * 6 + b.phase)) * 0.5;
          b.rig.setPose('jump', t, 0.6, 0.7);
        }
      } else {
        b.y = Math.max(b.lastGround + 0.9, b.y - dt * 0.4);
        b.rig.setPose('jump', t, 0.4, 0.6);
      }

      // comedic stumbles
      b.stumbleTimer -= dt;
      if (b.stumbleTimer <= 0 && !b.finished && racing) {
        b.stumble = 0.55 + Math.random() * 0.5;
        b.stumbleTimer = 4 + Math.random() * 6;
        b.finishTime += 0.35 + Math.random() * 0.8;
      }
      if (b.stumble > 0) {
        b.stumble -= dt;
        b.rig.body.rotation.z = Math.sin(t * 25) * 0.35;
        b.rig.body.rotation.x = Math.sin(t * 19) * 0.2;
        b.y += Math.abs(Math.sin(t * 15)) * 0.15;
      } else {
        b.rig.body.rotation.z *= (1 - Math.min(1, dt * 8));
        b.rig.body.rotation.x *= (1 - Math.min(1, dt * 8));
      }

      b.group.position.set(x, b.y, z);
      b.group.rotation.y = Math.sin(t * 1.2 + b.phase) * 0.15;
      if (b.finished) {
        b.rig.setPose('celebrate', t + b.phase, 0, 0);
        b.group.position.y = b.y + Math.abs(Math.sin(t * 5)) * 0.12;
      }
      if (b.progress > 0.97) b.rig.root.visible = true;
    }

    // rank by progress (and finish time once done)
    const entries = [
      { id: 'player', progress: pProgress, finished: player.finished, time: player.finishTime || 999 },
      ...bots.map(b => ({ id: b.id, progress: b.progress, finished: b.finished, time: b.finishTime }))
    ];
    entries.sort((a, b) => {
      if (a.finished && b.finished) return a.time - b.time;
      if (a.finished) return -1;
      if (b.finished) return 1;
      return b.progress - a.progress;
    });
    const rank = entries.findIndex(e => e.id === 'player') + 1;
    bots.forEach((b, i) => { b.rank = entries.findIndex(e => e.id === b.id) + 1; });
    return { rank, total: entries.length };
  };

  global.reset = () => {
    for (const b of bots) {
      b.progress = 0;
      b.t = 0;
      b.finished = false;
      b.stumble = 0;
      b.group.position.set(b.laneOffset, 0.1, startZ + 0.9);
      b.rig.root.visible = true;
    }
  };

  return global;
}
