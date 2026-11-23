import * as THREE from 'three';
import { buildCharacterMesh } from './characterRig.js';
import { randomBotCharacters, BOT_NAMES } from './characters.js';

// AI rivals are real characters running the same course. They are competitors
// for position, never a substitute for player control.
//
// Behaviour model, per bot:
//   * a personal pace target (keeps the pack close to the player)
//   * a lane sensor that probes the course ahead and picks a safe line
//   * jump / stumble / recovery states so they can be wiped out too
//   * subtle rubber-banding so the race stays contested without feeling fake
const GRAVITY = 26;
const WATER = -2.25;
const LANE_FRACTIONS = [-1, -0.66, -0.32, 0, 0.32, 0.66, 1];

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export function createBots(course, playerCharacterId, count = 7, options = {}) {
  const chars = options.chars && options.chars.length
    ? options.chars
    : randomBotCharacters(playerCharacterId, count);
  const bots = [];
  const startZ = course.startZ;
  const totalDistance = Math.abs(course.finishZ - startZ);
  const par = course.parTime;

  // Keep a tightly contested front pack so early rounds are not solo runs.
  // Faster bots also get better hazard-reading skill, so the front pack earns it.
  // Times are a fraction of par so the pack stays near a competent player pace
  // instead of trailing the field at a walking speed.
  const entries = [];
  for (let i = 0; i < count; i++) {
    const fraction = i / Math.max(1, count - 1);
    const factor = 0.6 + fraction * 0.2;
    entries.push({
      time: par * factor,
      skill: 0.42 + fraction * 0.5
    });
  }
  // shuffle so rank isn't tied to lane
  entries.sort(() => Math.random() - 0.5);

  const startLanes = [-6.2, 6.2, -4.3, 4.3, -2.4, 2.4, 5.2, -5.2];

  for (let i = 0; i < count; i++) {
    const c = chars[i % chars.length];
    const rig = buildCharacterMesh(c, { detail: false, costume: c.colors.shirt, accessory: c.accessory });
    const g = new THREE.Group();
    g.add(rig.root);
    course.group.add(g);
    const lane = startLanes[i % startLanes.length];
    const e = entries[i];
    const bot = {
      id: 'bot' + i,
      name: (options.names && options.names[i]) || `${BOT_NAMES[i % BOT_NAMES.length]} ${i + 1}`,
      character: c,
      rig, group: g,
      targetTime: e.time,
      finishTime: null,
      targetSpeed: totalDistance / e.time,
      skill: e.skill,
      aggression: 0.35 + Math.random() * 0.65,
      laneOffset: lane,
      laneFraction: lane / 7.6,
      laneTarget: lane,
      laneTimer: Math.random() * 0.25,
      halfW: 7,
      progress: 0,
      x: lane,
      z: startZ + 0.9 + (i % 3) * 0.8,
      y: 0.1,
      vy: 0,
      vx: 0,
      speed: 0,
      raceT: 0,
      finished: false,
      rank: i + 1,
      phase: Math.random() * 6,
      stumble: 0,
      stumbleTimer: 2.5 + Math.random() * 4.5,
      jumpCd: 0.3 + Math.random() * 0.6,
      hitCooldown: 0,
      respawns: 0,
      lastGround: 0,
      airborne: false,
      panicJump: false
    };
    g.position.set(bot.x, bot.y, bot.z);
    bots.push(bot);
  }

  const global = { bots, playerProgress: 0 };

  function respawnAtCheckpoint(b) {
    let respawn = null;
    for (const cp of course.checkpointsSorted) {
      if (cp.respawn && cp.z >= b.z) respawn = cp.respawn;
    }
    const r = respawn || { x: course.startX, z: startZ, top: 0 };
    b.x = r.x;
    b.z = r.z;
    b.y = r.top + 0.2;
    b.vx = 0;
    b.vy = 0;
    b.speed = 0;
    b.airborne = false;
    b.laneTarget = r.x;
    b.stumble = Math.max(b.stumble, 0.9);
    b.hitCooldown = 1.2;
    b.respawns += 1;
  }

  // Find the next standable platform ahead. Bots use it to line up with offset
  // discs and the lit safe strip through collapsing floors *before* launching.
  function nextPlatformAhead(b, maxDist = 9) {
    let nearestBack = -Infinity;
    const near = [];
    for (const p of course.platforms) {
      if (!p.active) continue;
      const d = b.z - p.zBack;
      if (d < 0.35 || d > maxDist) continue;
      if (p.top > b.y + 2.2) continue;
      if (p.zBack > nearestBack) nearestBack = p.zBack;
      near.push(p);
    }
    if (!near.length) return null;
    const row = near.filter(p => p.zBack >= nearestBack - 2.4);
    // Prefer the readable safe lane through collapse grids.
    const safe = row.find(p => p.safeLane);
    if (safe) return safe;
    let best = row[0];
    for (const p of row) if (Math.abs(p.x - b.x) < Math.abs(best.x - b.x)) best = p;
    return best;
  }

  // Choose a lane by probing ground and live hazard positions a short way ahead.
  function chooseLane(b, t, player) {
    const half = Math.max(0.9, b.pathHalf ?? b.halfW);
    const preferred = clamp(b.laneFraction * half, -half, half);
    let best = b.x;
    let bestScore = -Infinity;
    let anySafe = false;

    for (const f of LANE_FRACTIONS) {
      const cx = clamp(f * half, -half, half);
      let score = 0;
      let groundAhead = false;
      let laneBlocked = false;
      for (let k = 0; k < 3; k++) {
        const dist = 1.7 + k * 1.85;
        const zz = b.z - dist;
        const g = course.groundAt(cx, zz, b.y + 1.3);
        if (!g) {
          score -= k === 0 ? 52 : 18;
          laneBlocked = true;
          continue;
        }
        groundAhead = true;
        if (g.top < b.y - 1.5) score -= 14;
        if (g.platform.collapse) {
          const c = g.platform.collapse;
          const arrive = dist / Math.max(3, b.speed);
          const phase = (t + c.offset + arrive) % c.period;
          if (phase > c.period - c.off - 0.3) score -= 24;
        }
        const danger = course.hitObstacle
          ? course.hitObstacle({ x: cx, y: b.y, z: zz }, 0.52, 1.5)
          : null;
        if (danger) {
          score -= (30 - k * 8) * (0.55 + b.skill * 0.75);
          laneBlocked = true;
        }
      }
      if (!groundAhead) score -= 34;
      if (groundAhead && !laneBlocked) anySafe = true;

      // Racing lines: don't stack directly behind a rival. Aggressive bots are
      // willing to sit closer before pulling out to overtake.
      let crowding = 0;
      for (const o of bots) {
        if (o === b) continue;
        const dzAhead = b.z - o.z;
        if (dzAhead > -0.7 && dzAhead < 4.4 && Math.abs(o.x - cx) < 1.55) {
          crowding += (1 - Math.abs(o.x - cx) / 1.55) * (1 - Math.max(0, dzAhead) / 4.4);
        }
      }
      if (player) {
        const dzAhead = b.z - player.pos.z;
        if (dzAhead > -0.7 && dzAhead < 4.4 && Math.abs(player.pos.x - cx) < 1.55) {
          crowding += 0.6 * (1 - Math.abs(player.pos.x - cx) / 1.55);
        }
      }
      score -= crowding * (6.2 - b.aggression * 2.4);

      // Hysteresis: don't twitch between lanes, and respect each bot's habit.
      score -= Math.abs(cx - b.x) * (2.6 - b.skill * 1.35);
      score -= Math.abs(cx - preferred) * 0.45;
      score += Math.sin((t + b.phase) * 1.25 + cx * 0.7) * 0.6;
      if (score > bestScore) {
        bestScore = score;
        best = cx;
      }
    }
    // Only panic-jump when every scanned lane is dangerous or missing ground.
    b.panicJump = !anySafe;
    return clamp(best, -half, half);
  }

  global.update = (dt, t, player, racing) => {
    const pProgress = Math.max(0, Math.min(1, (startZ - player.pos.z) / totalDistance));
    global.playerProgress = pProgress;

    for (const b of bots) {
      const canMove = racing && !b.finished;
      b.jumpCd = Math.max(0, b.jumpCd - dt);
      b.hitCooldown = Math.max(0, b.hitCooldown - dt);
      b.laneTimer -= dt;
      b.stumble = Math.max(0, b.stumble - dt);

      // ------------------------------------------------------------- pace
      let target = 0;
      if (canMove) {
        b.raceT += dt;
        const rel = pProgress - b.progress;
        // Behind the player => push; comfortably ahead => ease off a touch.
        const rubber = clamp(rel * 1.15, -0.14, 0.17);
        const surge = Math.sin(t * 0.9 + b.phase * 1.7) * 0.035 * b.aggression;
        target = b.targetSpeed * (1 + rubber + surge);
        if (b.stumble > 0) target *= 0.45;
        // Preserve momentum in the air so gap leaps and jump pads carry.
        if (b.airborne) target = Math.max(target, b.speed * 0.98);
      }
      b.speed += (target - b.speed) * Math.min(1, dt * (b.stumble > 0 ? 3 : 5.5));
      if (b.speed < 0.01) b.speed = 0;

      // ------------------------------------------------------------- move z
      const prevZ = b.z;
      if (canMove) b.z -= b.speed * dt;
      b.progress = clamp((startZ - b.z) / totalDistance, 0, 1);

      // ---------------------------------------------------- lane selection
      let here = course.groundAt(b.x, b.z, b.y + 0.65);
      if (here) b.halfW = clamp(here.platform.w * 0.5 - 0.65, 1.0, 8.4);

      // Anticipate narrow beams and funnel toward the centre *before* the
      // platform change, instead of discovering it one stride too late.
      let pathHalf = b.halfW;
      for (let d = 1.2; d <= 8.4; d += 1.2) {
        const g = course.groundAt(0, b.z - d, b.y + 1.2);
        if (g) pathHalf = Math.min(pathHalf, clamp(g.platform.w * 0.5 - 0.65, 0.85, 8.4));
      }
      b.pathHalf = pathHalf;

      const landPlat = nextPlatformAhead(b, 9);
      b.landPlat = landPlat;

      if (canMove && b.laneTimer <= 0) {
        b.laneTimer = 0.14 + Math.random() * 0.16;
        b.laneTarget = chooseLane(b, t, player);
      }

      // Line up with the landing zone while there is still room to move.
      if (landPlat && b.z - landPlat.zBack < 8) {
        const r = Math.min(0.7, landPlat.w * 0.3);
        const lo = landPlat.x - landPlat.w / 2 + r;
        const hi = landPlat.x + landPlat.w / 2 - r;
        b.laneTarget = clamp(b.laneTarget, lo, hi);
      }

      // --------------------------------------------------- lateral steering
      if (canMove) {
        let desired = clamp((b.laneTarget - b.x) * 3.4, -6.4, 6.4);
        // Bots jostle for space instead of stacking into one line.
        for (const o of bots) {
          if (o === b) continue;
          const dz = Math.abs(o.z - b.z);
          const dx = o.x - b.x;
          if (dz < 1.7 && Math.abs(dx) < 1.35) {
            const push = (1.35 - Math.abs(dx)) * 7;
            desired += Math.sign(dx || (b.id < o.id ? -1 : 1)) * push;
          }
        }
        b.vx += (clamp(desired, -6.8, 6.8) - b.vx) * Math.min(1, dt * 7);
        b.x += b.vx * dt;
        // Never let steering walk straight off the platform edge.
        const edgeSafe = clamp(b.halfW - 0.15, 0.7, 8.4);
        b.x = clamp(b.x, -edgeSafe, edgeSafe);
      } else {
        b.vx *= (1 - Math.min(1, dt * 6));
        b.x += b.vx * dt;
      }

      // ----------------------------------------------------------- vertical
      here = course.groundAt(b.x, b.z, b.y + 0.65);
      const grounded = !b.airborne && here && b.y <= here.top + 0.5;
      if (grounded) {
        b.y = here.top;
        b.vy = 0;
        b.lastGround = here.top;

        // Scan for the next missing-ground edge under our line, then launch
        // inside a takeoff window. Jumping as soon as a gap is *visible* makes
        // them sail short of the far platform; this waits for the edge.
        let edgeDist = -1;
        for (let d = 0.4; d <= 5.2; d += 0.4) {
          const g = course.groundAt(b.x, b.z - d, b.y + 0.7);
          if (!g) { edgeDist = d; break; }
        }
        const takeoff = 0.5 + Math.min(0.7, b.speed * 0.1);
        // Measure the actual gap width too: the 0.2m seams between collapse
        // tiles must not trigger a full leap on every row.
        let gapLen = 0;
        if (edgeDist > 0) {
          for (let d = edgeDist + 0.2; d <= edgeDist + 5; d += 0.2) {
            if (course.groundAt(b.x, b.z - d, b.y + 0.7)) { gapLen = d - edgeDist; break; }
          }
        }
        const realGap = gapLen === 0 || gapLen > 0.9;
        let gapJump = canMove && realGap && edgeDist > 0 && edgeDist <= takeoff && !!landPlat;
        let blockedAhead = false;
        if (gapJump) {
          // Can this launch actually reach the next platform? Bots commit to
          // 7.6 m/s, with a little spare distance for air drag and knockback.
          const need = b.z - landPlat.zBack;
          const capacity = Math.max(b.speed, 7.6) * 0.78;
          if (need > capacity - 0.35) {
            gapJump = false;
            blockedAhead = true;
            b.speed *= 0.72;
          }
        } else if (canMove && edgeDist > 0 && !landPlat && edgeDist < 3) {
          // Nothing standable in range: wait at the lip for a tile to return.
          blockedAhead = true;
          b.speed *= 0.72;
        }

        // A tile vanishing under our feet is the cue to hop forward now.
        let tileClosing = false;
        if (here.platform && here.platform.collapse) {
          const c = here.platform.collapse;
          const phase = (t + c.offset) % c.period;
          tileClosing = phase > c.period - c.off - 0.5;
        }
        if (tileClosing && canMove) gapJump = true;

        const probe = 2.1 + Math.min(2.0, b.speed * 0.09);
        const probeZ = b.z - probe;
        // Near a platform edge, a hazard hop can sail straight into the gap
        // behind it. Let the dedicated gap logic handle the launch instead.
        const nearGap = edgeDist > 0;
        let wantJump = false;
        if (!gapJump && !blockedAhead && !nearGap && canMove && b.jumpCd <= 0 && b.stumble < 0.25) {
          const danger = course.hitObstacle
            ? course.hitObstacle({ x: b.x, y: b.y, z: probeZ }, 0.5, 1.45)
            : null;
          if (danger) {
            const read = 0.22 + b.skill * 0.72;
            if (Math.random() < read) wantJump = true;
          } else if (b.panicJump && b.pathHalf >= b.halfW - 0.4) {
            // Panic hops only on a wide, unsplit platform; otherwise running
            // forward beats flailing into the void.
            wantJump = true;
          }
        }

        if (gapJump) {
          // Commit to the leap: a stumbling bot still clears 2-3m gaps.
          b.speed = Math.max(b.speed, 7.6);
          b.airborne = true;
          b.vy = 10 + b.skill * 0.6;
          b.y += 0.045;
        } else if (wantJump && b.jumpCd <= 0) {
          b.airborne = true;
          b.vy = 8.3 + b.skill * 0.7;
          b.y += 0.04;
          b.jumpCd = 0.75 + Math.random() * 0.35;
        }
      } else {
        if (!b.airborne) {
          b.airborne = true;
          b.vy = Math.min(0, b.vy);
        }
        const prevY = b.y;
        b.vy -= GRAVITY * dt;
        b.y += b.vy * dt;
        // Probe from where the bot *was* this frame, so a fast descent cannot
        // tunnel straight through a platform between two samples.
        const probeY = Math.max(prevY, b.y) + 0.16;
        const land = course.groundAt(b.x, b.z, probeY);
        if (land && b.vy <= 0 && b.y <= land.top) {
          b.y = land.top;
          b.vy = 0;
          b.airborne = false;
          b.lastGround = land.top;
        }
      }

      // ---------------------------------------------------------- collisions
      if (canMove && b.hitCooldown <= 0) {
        const hit = course.hitObstacle
          ? course.hitObstacle({ x: b.x, y: b.y, z: b.z }, 0.48, 1.45)
          : null;
        if (hit) {
          b.hitCooldown = 0.7 + Math.random() * 0.35;
          b.stumble = Math.max(b.stumble, 0.55 + (hit.power || 8) * 0.03);
          b.vx += (hit.nx || 0) * Math.min(2.6, 0.7 + (hit.power || 8) * 0.08);
          b.speed *= 0.72;
          if (hit.up > 0 && !b.airborne) {
            b.airborne = true;
            b.vy = hit.up * 0.62;
          }
        }
      }

      // ------------------------------------------------------ random stumbles
      b.stumbleTimer -= canMove ? dt : 0;
      if (b.stumbleTimer <= 0 && canMove) {
        b.stumble = Math.max(b.stumble, 0.55 + Math.random() * 0.55);
        b.stumbleTimer = 3.5 + Math.random() * 5.5;
      }

      // ------------------------------------------------- fall + checkpoint respawn
      if (b.y < WATER) {
        respawnAtCheckpoint(b);
      }

      // ------------------------------------------------------------- finish
      if (canMove && b.z <= course.finishZ) {
        b.z = course.finishZ;
        b.finished = true;
        b.finishTime = b.raceT;
        b.progress = 1;
        b.speed = 0;
        b.vx = 0;
      }

      // ------------------------------------------------------------- posing
      const h = course.groundAt(b.x, b.z, b.y + 0.3);
      const groundDrop = h ? Math.max(0, b.y - h.top) : 4;
      b.rig.shadow.position.y = -groundDrop + 0.03;
      b.rig.shadow.material.opacity = Math.max(0.05, 0.3 - groundDrop * 0.06);

      const pose = b.finished ? 'celebrate'
        : b.stumble > 0.22 ? 'tumble'
          : b.airborne ? 'jump'
            : 'run';
      const moveAmt = pose === 'run' ? clamp(b.speed / 7.5, 0.25, 1) : 0.7;
      b.rig.setPose(pose, t + b.phase, moveAmt, clamp(b.speed / 9, 0, 1));

      b.rig.body.rotation.z = -(b.vx / 8) * 0.35 + (b.stumble > 0 ? Math.sin(t * 24) * 0.22 : 0);
      b.rig.body.rotation.x += b.airborne ? -0.08 : Math.min(0.14, b.speed * 0.014);

      b.group.position.set(b.x, b.y, b.z);
      b.group.rotation.y = -Math.atan2(b.vx, Math.max(2.5, b.speed)) * 0.5;
    }

    // Rank by progress (and finish time once done)
    const entriesRank = [
      { id: 'player', progress: pProgress, finished: player.finished, time: player.finishTime || 999 },
      ...bots.map(b => ({ id: b.id, progress: b.progress, finished: b.finished, time: b.finishTime ?? 999 }))
    ];
    entriesRank.sort((a, b) => {
      if (a.finished && b.finished) return a.time - b.time;
      if (a.finished) return -1;
      if (b.finished) return 1;
      return b.progress - a.progress;
    });
    const rank = entriesRank.findIndex(e => e.id === 'player') + 1;
    bots.forEach(b => { b.rank = entriesRank.findIndex(e => e.id === b.id) + 1; });
    return { rank, total: entriesRank.length };
  };

  global.reset = () => {
    for (const b of bots) {
      const lane = b.laneOffset;
      b.progress = 0;
      b.raceT = 0;
      b.finished = false;
      b.finishTime = null;
      b.speed = 0;
      b.vx = 0;
      b.vy = 0;
      b.x = lane;
      b.z = startZ + 0.9;
      b.y = 0.1;
      b.airborne = false;
      b.stumble = 0;
      b.stumbleTimer = 2.5 + Math.random() * 4.5;
      b.jumpCd = 0.3 + Math.random() * 0.6;
      b.hitCooldown = 0;
      b.respawns = 0;
      b.laneTarget = lane;
      b.halfW = 7;
      b.group.position.set(lane, 0.1, b.z);
      b.rig.root.visible = true;
    }
  };

  return global;
}
