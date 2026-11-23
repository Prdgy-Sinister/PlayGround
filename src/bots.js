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
    // Keep a tightly contested front pack so early rounds are not solo runs.
    const factor = 0.84 + (i / Math.max(1, count - 1)) * 0.28;
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
      stumbleTimer: 1.5 + Math.random() * 3.5,
      yaw: 0,
      lastGround: 0,
      lean: 0,
      jumpVy: 0,
      airborne: false
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
        // Time-based finish rail remains competitive; stumbles visibly slow the bot.
        const pace = b.stumble > 0 ? 0.72 : 1;
        b.progress = Math.min(1, b.progress + dt * pace / b.finishTime);
        if (b.progress >= 1) b.finished = true;
      }

      const z = startZ - b.progress * totalDistance;
      b.z = z;
      let x = b.laneOffset;
      if (racing) x += Math.sin(t * 0.8 + b.phase) * 0.7;
      x += b.xKick || 0;
      b.xKick = (b.xKick || 0) * Math.max(0, 1 - dt * 3);
      if (b.progress > 0.94) x *= Math.max(0.15, (1 - b.progress) / 0.06);

      b.stumbleTimer -= racing ? dt : 0;
      b.hitCooldown = Math.max(0, (b.hitCooldown || 0) - dt);
      if (b.stumbleTimer <= 0 && !b.finished && racing) {
        b.stumble = Math.max(b.stumble, 0.55 + Math.random() * 0.5);
        b.stumbleTimer = 3 + Math.random() * 5;
      }
      b.stumble = Math.max(0, b.stumble - dt);

      let groundInfo = course.groundAt(x, z, b.y + 0.7);
      let groundTop = groundInfo ? groundInfo.top : null;
      const grounded = groundTop !== null && !b.airborne && b.y <= groundTop + 0.48;

      if (grounded) {
        b.lastGround = groundTop;
        b.y = groundTop;
        b.jumpVy = 0;

        const aheadZ = z - 2.2;
        const ahead = course.groundAt(x, aheadZ, b.y + 1.2);
        const obstacleAhead = racing && course.hitObstacle
          ? course.hitObstacle({ x, y: b.y, z: aheadZ }, 0.45, 1.5)
          : null;
        if (!ahead || (obstacleAhead && b.stumble <= 0)) {
          b.airborne = true;
          b.jumpVy = 7.6;
        }
      } else {
        b.airborne = true;
        b.jumpVy -= 16 * dt;
        b.y += b.jumpVy * dt;

        groundInfo = course.groundAt(x, z, b.y + 0.12);
        groundTop = groundInfo ? groundInfo.top : null;
        if (groundTop !== null && b.jumpVy <= 0 && b.y <= groundTop) {
          b.y = groundTop;
          b.jumpVy = 0;
          b.airborne = false;
          b.lastGround = groundTop;
        }
      }

      // Actual obstacle collision response: bots keep moving after a stumble.
      if (racing && !b.finished && b.hitCooldown <= 0 && course.hitObstacle) {
        const hit = course.hitObstacle({ x, y: b.y, z }, 0.45, 1.5);
        if (hit) {
          b.hitCooldown = 0.65;
          b.stumble = Math.max(b.stumble, 0.45 + (hit.power || 8) * 0.025);
          b.xKick = (b.xKick || 0) + (hit.nx || 0) * Math.min(2.2, 0.6 + (hit.power || 8) * 0.07);
          if (hit.up > 0 && !b.airborne) {
            b.airborne = true;
            b.jumpVy = hit.up;
          }
        }
      }

      // Respawn at a reached checkpoint if the timing rail lands a rival in water.
      if (b.y < -2.25) {
        let respawn = null;
        for (const cp of course.checkpointsSorted) {
          if (cp.respawn && b.progress >= (startZ - cp.z) / totalDistance) respawn = cp.respawn;
        }
        b.progress = respawn ? Math.max(0, (startZ - respawn.z) / totalDistance) : 0;
        b.y = respawn ? respawn.top : 0.1;
        b.z = respawn ? respawn.z : startZ;
        b.jumpVy = 0;
        b.airborne = false;
        b.stumble = Math.max(b.stumble, 0.7);
      }

      if (b.stumble > 0) {
        b.rig.body.rotation.z = Math.sin(t * 25) * 0.35;
        b.rig.body.rotation.x = Math.sin(t * 19) * 0.2;
      } else {
        b.rig.body.rotation.z *= (1 - Math.min(1, dt * 8));
        b.rig.body.rotation.x *= (1 - Math.min(1, dt * 8));
      }

      b.rig.setPose(b.finished ? 'celebrate' : (b.airborne ? 'jump' : 'run'), t + b.phase,
        b.stumble > 0 ? 0.45 : 0.85, 0.7);
      b.group.position.set(x, b.y, b.z);
      b.group.rotation.y = Math.sin(t * 1.2 + b.phase) * 0.15;
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
      b.hitCooldown = 0;
      b.xKick = 0;
      b.jumpVy = 0;
      b.airborne = false;
      b.y = 0;
      b.z = startZ;
      b.group.position.set(b.laneOffset, 0.1, startZ + 0.9);
      b.rig.root.visible = true;
    }
  };

  return global;
}
