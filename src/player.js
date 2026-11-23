import * as THREE from 'three';
import { buildCharacterMesh, toonMat } from './characterRig.js';
import { physical } from './characters.js';
import { WATER_Y } from './obstacles.js';

const GRAVITY = 27;
const COYOTE = 0.12;
const MAX_FALL = -32;

export function createPlayer(course, character, options = {}) {
  const rig = buildCharacterMesh(character, {
    costume: options.costume,
    accessory: options.accessory
  });
  const sceneGroup = new THREE.Group();
  sceneGroup.add(rig.root);
  course.group.add(sceneGroup);

  const phys = physical(character);

  const player = {
    character, rig, group: sceneGroup, phys,
    pos: new THREE.Vector3(course.startX, course.top + 0.2, course.startZ),
    vel: new THREE.Vector3(),
    state: 'run',
    grounded: true,
    groundTop: course.top,
    groundPlatform: null,
    yaw: 0,
    stamina: 1,
    splashes: 0,
    checkpointIndex: 0,
    checkpoint: course.checkpointsSorted[0],
    finished: false,
    tumbleTimer: 0,
    diveTimer: 0,
    diveCd: 0,
    getUpTimer: 0,
    invuln: 0,
    jumpBuffer: 0,
    coyote: 0,
    runTime: 0,
    moveAmt: 0,
    speed: 0,
    spin: { x: 0, z: 0, ax: 0, az: 0 },
    splashTimer: 0,
    splashed: false,
    lastGroundedY: 0,
    wobblePhase: Math.random() * 6,
    callbacks: {}
  };

  rig.root.position.set(0, 0, 0);

  // "YOU" marker so the player can always spot themselves in the scrum
  const marker = new THREE.Group();
  const markerMat = toonMat('#ffd23f', { emissive: '#7a4c00', emissiveIntensity: 0.4 });
  const cone = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.5, 4), markerMat);
  cone.rotation.x = Math.PI;
  marker.add(cone);
  marker.position.y = rig.height + 0.55;
  sceneGroup.add(marker);

  const tmpV = new THREE.Vector3();

  player.reset = (full = false) => {
    player.pos.set(course.startX, course.top + 0.25, course.startZ);
    player.vel.set(0, 0, 0);
    player.state = 'run';
    player.grounded = true;
    player.stamina = 1;
    player.finished = false;
    player.tumbleTimer = 0;
    player.diveTimer = 0;
    player.diveCd = 0;
    player.getUpTimer = 0;
    player.invuln = 1;
    player.splashTimer = 0;
    player.splashed = false;
    player.checkpointIndex = 0;
    player.checkpoint = course.checkpointsSorted[0];
    player.rig.root.visible = true;
    player.spin = { x: 0, z: 0, ax: 0, az: 0 };
    if (full) { player.splashes = 0; }
  };

  player.teleportToCheckpoint = () => {
    const cp = player.checkpoint || course.checkpointsSorted[0];
    const r = cp.respawn;
    player.pos.set(r.x, r.top + 0.35, r.z);
    player.vel.set(0, 0, 0);
    player.state = 'run';
    player.grounded = true;
    player.tumbleTimer = 0;
    player.diveTimer = 0;
    player.diveCd = 0;
    player.getUpTimer = 0;
    player.invuln = 1.4;
    player.splashTimer = 0;
    player.rig.root.visible = true;
    player.spin = { x: 0, z: 0, ax: 0, az: 0 };
    player.yaw = 0;
    player.callbacks.onRespawn?.();
  };

  player.splash = () => {
    if (player.state === 'splash' || player.finished) return;
    player.state = 'splash';
    player.splashTimer = 1.5;
    player.vel.set(0, -2, 0);
    player.splashed = false;
    player.splashes += 1;
    player.callbacks.onSplash?.(player.pos.clone(), player.splashes);
  };

  player.tumble = (hit) => {
    if (player.invuln > 0 || player.state === 'splash' || player.finished) return;
    const resist = phys.knockResist;
    const massFactor = 1.25 - Math.min(0.35, phys.mass * 0.12);
    const power = hit.power * (1 - resist * 0.78) * massFactor * 0.78;
    const nx = hit.nx || 0, nz = hit.nz || 1;
    player.vel.x += nx * power;
    player.vel.z += nz * power;
    player.vel.y = Math.max(player.vel.y, (hit.up || 2.5) * (1 - resist * 0.5));
    player.state = 'tumble';
    player.tumbleTimer = (0.95 + (1 - resist) * 1.0) * (0.85 + Math.random() * 0.35);
    player.spin.ax = (Math.random() - 0.5) * 18;
    player.spin.az = (Math.random() - 0.5) * 20;
    player.spin.x = 0; player.spin.z = 0;
    player.invuln = 0.55;
    player.grounded = false;
    player.callbacks.onHit?.(hit, power);
  };

  player.update = (dt, input, time) => {
    dt = Math.min(dt, 0.05);
    player.runTime += dt;
    player.invuln = Math.max(0, player.invuln - dt);
    player.jumpBuffer = Math.max(0, player.jumpBuffer - dt);
    player.diveCd = Math.max(0, player.diveCd - dt);
    if (input.jumpPressed) player.jumpBuffer = 0.16;
    if (input.divePressed && player.state !== 'splash' && !player.finished) {
      if (player.grounded && player.state !== 'tumble' && player.diveTimer <= 0 && player.diveCd <= 0) {
        player.diveCd = 1.1;
        player.diveTimer = 0.52;
        player.state = 'dive';
        const fwd = new THREE.Vector3(-Math.sin(player.yaw), 0, -Math.cos(player.yaw));
        player.vel.x += fwd.x * 7.5 + input.strafe * 2;
        player.vel.z += fwd.z * 7.5 - input.forward * 1;
        player.vel.y = 1.6;
        player.stamina = Math.max(0, player.stamina - 0.04);
        player.callbacks.onDive?.();
      }
    }

    if (player.state === 'splash') {
      player.splashTimer -= dt;
      player.vel.y -= GRAVITY * dt;
      player.pos.y += player.vel.y * dt;
      if (!player.splashed && player.splashTimer < 1.28) {
        player.splashed = true;
        player.rig.root.visible = false;
      }
      if (player.splashTimer <= 0) player.teleportToCheckpoint();
      player.render(0, dt);
      return;
    }

    if (player.state === 'finished') {
      player.vel.multiplyScalar(1 - dt * 6);
      player.vel.y -= GRAVITY * dt;
      player.pos.addScaledVector(player.vel, dt);
      const g = course.groundAt(player.pos.x, player.pos.z, player.pos.y + 0.4);
      if (g && player.pos.y < g.top + 0.05) { player.pos.y = g.top; player.vel.y = 0; }
      player.state = 'finished';
      player.render(0.1, dt, time);
      return;
    }

    // ---------------- ground query ----------------
    const gInfo = course.groundAt(player.pos.x, player.pos.z, player.pos.y + 0.42);
    const groundTop = gInfo ? gInfo.top : -Infinity;
    const groundP = gInfo ? gInfo.platform : null;
    const nearGround = groundTop > -Infinity && player.pos.y - groundTop < 0.48;
    player.groundPlatform = groundP;

    if (player.grounded) {
      if (gInfo && player.pos.y <= groundTop + 0.08) {
        if (groundTop > player.pos.y) player.pos.y = groundTop;
        if (player.pos.y - groundTop > 0.06) player.pos.y = groundTop;
      } else if (gInfo && nearGround && player.vel.y <= 0.5) {
        player.pos.y = groundTop;
      } else {
        player.grounded = false;
        player.coyote = COYOTE;
      }
    } else {
      player.coyote = Math.max(0, player.coyote - dt);
    }

    // ---------------- movement ----------------
    let ix = input.strafe || 0;
    let iz = -(input.forward || 0);
    const inputLen = Math.hypot(ix, iz);
    if (inputLen > 1) { ix /= inputLen; iz /= inputLen; }
    const moving = inputLen > 0.08;

    const sprinting = input.sprint && player.stamina > 0.06 && moving && player.grounded && player.diveTimer <= 0;
    let targetSpeed = phys.moveSpeed * (sprinting ? phys.sprintMult : 1);
    if (player.stamina < 0.28) targetSpeed *= 0.72 + player.stamina;
    if (player.state === 'tumble') targetSpeed *= 0.18;
    if (player.state === 'getup') targetSpeed *= 0.35;
    if (player.diveTimer > 0) targetSpeed *= 0.4;

    let control = player.grounded ? 1 : phys.airControl;
    if (player.state === 'tumble') control *= 0.18;

    const targetVX = ix * targetSpeed;
    const targetVZ = iz * targetSpeed;
    const platform = player.grounded ? groundP : null;
    const slippery = platform && platform.slippery;
    const frictionAccel = player.grounded
      ? (slippery ? 5.5 : (player.state === 'dive' ? 8 : 34))
      : 3.5;

    if (moving) {
      const accel = phys.accel * control * (slippery ? 0.34 : 1) * (player.state === 'tumble' ? 0.3 : 1);
      player.vel.x += (targetVX - player.vel.x) * Math.min(1, accel * dt / Math.max(1, targetSpeed));
      player.vel.z += (targetVZ - player.vel.z) * Math.min(1, accel * dt / Math.max(1, targetSpeed));
    } else if (player.grounded) {
      const f = Math.min(1, frictionAccel * dt);
      player.vel.x *= (1 - f);
      player.vel.z *= (1 - f);
    }

    // conveyor / slippery slopes / rotating discs
    if (player.grounded && platform) {
      if (platform.conveyor) {
        player.vel.x += platform.conveyor.x * dt * (1.15 - phys.balanceGrip * 0.35);
      }
      if (platform.slopeX) player.vel.x += platform.slopeX * 20 * dt;
      if (platform.beam) {
        const wob = Math.sin(time * 3.1 + player.wobblePhase) * (11 - player.character.stats.balance) * 0.55;
        player.vel.x += wob * dt * (player.state === 'tumble' ? 0 : 1);
      }
      if (platform.kind === 'disc' && platform.spinRate) {
        const dx = player.pos.x - platform.x;
        const dz = player.pos.z - platform.z;
        const tang = platform.spinRate * (1.15 - phys.balanceGrip * 0.45);
        player.vel.x += -dz * tang * dt;
        player.vel.z += dx * tang * dt;
      }
    }

    // jump
    if (player.jumpBuffer > 0 && (player.grounded || player.coyote > 0) && player.state !== 'tumble' && player.diveTimer <= 0) {
      player.vel.y = phys.jumpVel * (player.stamina > 0.15 ? 1 : 0.85);
      player.grounded = false;
      player.coyote = 0;
      player.jumpBuffer = 0;
      player.state = 'jump';
      player.stamina = Math.max(0, player.stamina - 0.035);
      player.callbacks.onJump?.();
    }

    // gravity
    if (!player.grounded) {
      player.vel.y -= GRAVITY * dt;
      player.vel.y = Math.max(MAX_FALL, player.vel.y);
    }

    // integrate
    const prevY = player.pos.y;
    player.pos.x += player.vel.x * dt;
    player.pos.z += player.vel.z * dt;
    player.pos.y += player.vel.y * dt;

    // ground snap for landing (crossing test prevents fast-fall tunnelling)
    const g2 = course.groundAt(player.pos.x, player.pos.z, prevY + 0.45);
    if (!player.grounded && player.vel.y <= 0.1 && g2) {
      const top = g2.top;
      if (player.pos.y <= top + 0.05 && prevY >= top - 0.12) {
        player.pos.y = top;
        player.vel.y = 0;
        player.grounded = true;
        player.groundTop = top;
        player.groundPlatform = g2.platform;
        if (player.state !== 'tumble') {
          player.state = player.diveTimer > 0 ? 'dive' : 'run';
          player.callbacks.onLand?.(prevY - top);
        } else {
          player.tumbleTimer = Math.min(player.tumbleTimer, 0.45);
        }
      }
    }
    if (player.grounded && g2 && Math.abs(player.pos.y - g2.top) < 0.5) {
      player.pos.y = g2.top;
      player.groundTop = g2.top;
      player.groundPlatform = g2.platform;
    }
    if (player.grounded) player.lastGroundedY = player.pos.y;

    // dive timer
    if (player.diveTimer > 0) {
      player.diveTimer -= dt;
      if (player.grounded) {
        player.vel.x *= (1 - dt * 1.8);
        player.vel.z *= (1 - dt * 1.8);
      }
      if (player.diveTimer <= 0) {
        player.state = player.grounded ? 'run' : 'jump';
      }
    }

    // tumble / getup
    if (player.state === 'tumble') {
      player.tumbleTimer -= dt;
      if (player.tumbleTimer <= 0 && player.grounded) {
        player.state = 'getup';
        player.getUpTimer = phys.getUpTime;
        player.callbacks.onRecover?.();
      }
      // random spin
      player.spin.x += player.spin.ax * dt;
      player.spin.z += player.spin.az * dt;
      player.spin.ax *= (1 - dt * 1.4);
      player.spin.az *= (1 - dt * 1.4);
    } else {
      player.spin.x *= (1 - Math.min(1, dt * 9));
      player.spin.z *= (1 - Math.min(1, dt * 9));
    }
    if (player.state === 'getup') {
      player.getUpTimer -= dt;
      if (player.getUpTimer <= 0) player.state = 'run';
    }

    // stamina
    if (sprinting) {
      player.stamina = Math.max(0, player.stamina - phys.staminaDrain * dt * 1.5);
    } else {
      player.stamina = Math.min(1, player.stamina + phys.staminaRegen * dt * (player.state === 'tumble' ? 0.4 : 1));
    }

    // ---------------- hazards ----------------
    const hit = course.hitObstacle(player.pos, phys.radius, phys.height);
    if (hit) {
      player.tumble(hit);
    }

    const launched = course.tryLaunch(player.pos, player.pos.y);
    if (launched) {
      player.vel.y = launched.power;
      player.vel.z = -Math.max(6.5, Math.abs(player.vel.z) + launched.forward);
      player.grounded = false;
      player.state = 'jump';
      player.callbacks.onLaunch?.();
    }

    // checkpoints
    for (const cp of course.checkpointsSorted) {
      if (cp.index > player.checkpointIndex && player.pos.z < cp.z) {
        player.checkpointIndex = cp.index;
        player.checkpoint = cp;
        player.callbacks.onCheckpoint?.(cp);
      }
    }

    // finish
    if (!player.finished && player.pos.z <= course.finishZ) {
      player.finished = true;
      player.state = 'finished';
      player.vel.set(0, 0, 0);
      player.callbacks.onFinish?.();
    }

    // water
    if (player.pos.y < WATER_Y + 0.05) {
      player.splash();
      player.render(0.1, dt, time);
      return;
    }

    // reset if fallen way out of bounds
    if (player.pos.y < WATER_Y - 30 || Math.abs(player.pos.x) > 120) {
      player.splash();
    }

    // yaw
    const planarSpeed = Math.hypot(player.vel.x, player.vel.z);
    player.speed = planarSpeed;
    if (planarSpeed > 0.35 && player.state !== 'tumble') {
      const targetYaw = Math.atan2(-player.vel.x, -player.vel.z);
      let diff = targetYaw - player.yaw;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      player.yaw += diff * Math.min(1, dt * 14);
    }
    player.moveAmt = Math.min(1, planarSpeed / phys.moveSpeed);

    // blink while invulnerable
    player.rig.root.visible = !(player.invuln > 0 && Math.sin(player.runTime * 32) > 0.55);
    if (player.finished) player.rig.root.visible = true;

    player.render(dt, dt, time);
  };

  player.render = (dt, rawDt, time = 0) => {
    const p = player;
    p.group.position.copy(p.pos);
    p.group.rotation.y = p.yaw;
    if (p.markerMesh) {} else {
      p.markerMesh = p.group.children.find(o => o.isGroup && o !== p.rig.root);
    }
    if (p.markerMesh) {
      p.markerMesh.position.y = p.rig.height + 0.55 + Math.sin(time * 3) * 0.09;
      p.markerMesh.rotation.y = time * 1.5;
      p.markerMesh.visible = !p.finished && p.state !== 'splash';
    }

    let animState = p.state;
    if (p.state === 'run') animState = p.moveAmt < 0.08 ? 'idle' : 'run';
    if (p.state === 'jump' && !p.grounded) animState = 'jump';
    if (p.finished) animState = 'celebrate';

    p.rig.setPose(animState, time, p.moveAmt, Math.min(1, p.speed / 10));
    // lean
    if (p.state === 'run' && p.grounded) {
      p.rig.body.rotation.z = -(p.vel.x / phys.moveSpeed) * 0.18;
      p.rig.body.rotation.x += Math.min(0.16, p.speed * 0.014);
    }
    if (p.state === 'tumble') {
      p.rig.body.rotation.x = p.spin.x;
      p.rig.body.rotation.z = p.spin.z;
      p.rig.body.position.y += Math.abs(Math.sin(time * 12)) * 0.22;
    }
    if (p.state === 'getup') {
      const q = 1 - Math.max(0, p.getUpTimer / Math.max(0.01, phys.getUpTime));
      p.rig.body.rotation.x = 1.2 * (1 - q);
      p.rig.body.position.y = 0.28 * (1 - q);
    }
    if (p.state === 'splash') {
      p.rig.body.rotation.z = Math.sin(time * 12) * 0.5;
      p.rig.body.rotation.x = Math.sin(time * 9) * 0.4;
    }

    // airborne shadow
    const sh = p.rig.shadow;
    if (p.grounded) {
      sh.position.y = 0.025;
      sh.material.opacity = 0.3;
    } else {
      const g = course.groundAt(p.pos.x, p.pos.z, p.pos.y);
      if (g) {
        const hgt = Math.max(0, p.pos.y - g.top);
        sh.position.y = -hgt + 0.03;
        sh.material.opacity = Math.max(0.05, 0.3 - hgt * 0.06);
      } else {
        sh.material.opacity = 0.05;
        sh.position.y = -3;
      }
    }
    // stamina-based visual breathing
    if (p.state === 'idle' && p.stamina < 0.3) {
      p.rig.body.position.y += Math.sin(time * 8) * 0.015;
    }
  };

  return player;
}
