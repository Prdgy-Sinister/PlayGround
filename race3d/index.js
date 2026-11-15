import * as THREE from '../vendor/three.module.js';
import { clamp, texAsphalt, texGrass, texKerb, texCrowd, texBarrier, texCarbon, texChecker, texWindows, texNumber, texRoundel, texStraw, texWheelFace, hexLum } from './util.js';
import { buildCar, orientCar, CAR_STYLES } from './car.js';
import { buildLayout, buildRoad, buildTerrain, buildTrees } from './layout.js';
import { buildScenery } from './scenery.js';
import { createSkyDome, setSkyWeather, makeEnvironment, makeSunFlare, makeRain } from './sky.js';

export class Race3D {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas, antialias: true, powerPreference: 'high-performance', stencil: false
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.04;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    this.quality = 'high';
    try {
      const gl = this.renderer.getContext();
      const dbg = gl.getExtension('WEBGL_debug_renderer_info');
      const gpu = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || '') : '';
      if (/swiftshader|llvmpipe|software|basic render/i.test(gpu)) this.quality = 'low';
    } catch (e) { /* keep high */ }
    this.frameAcc = 0;
    this.frameCount = 0;
    this.autoSteps = 0;

    this.camera = new THREE.PerspectiveCamera(60, 1, .07, 2900);
    this.scene = new THREE.Scene();
    this.time = 0;
    this.ready = false;
    this.weather = null;
    this.camInit = false;
    this.camMode = -1;
    this.playerPose = null;
    this.speedProfile = null;
    this.lookYaw = 0;
    this.lookPitch = 0;
    this.lookActive = false;
    this.ownedTextures = [];
    this.resize();
    this.bindLookControls();

    this.textures = {
      asphalt: texAsphalt(), grass: texGrass(), kerb: texKerb(), crowd: texCrowd(),
      barrier: texBarrier(), carbon: texCarbon(), checker: texChecker(), windows: texWindows(),
      straw: texStraw(),
      wheelFaceVintage: texWheelFace(true), wheelFaceModern: texWheelFace(false)
    };
    this.textures.crowd.repeat.set(3, 1);
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const w = Math.max(2, Math.round(rect.width));
    const h = Math.max(2, Math.round(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, this.quality === 'low' ? 1 : (w < 760 ? 1.35 : 1.5));
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  unload() {
    this.ready = false;
    if (this.envDry) { this.envDry.dispose(); this.envDry = null; }
    if (this.envWet) { this.envWet.dispose(); this.envWet = null; }
    if (this.scene) {
      this.scene.traverse(o => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach(m => m.dispose());
        }
      });
      this.scene.environment = null;
      this.scene.clear();
    }
    this.ownedTextures.forEach(t => t.dispose());
    this.ownedTextures = [];
    this.scene = null;
    this.playerPose = null;
    this.camInit = false;
  }

  load(game) {
    this.unload();
    this.game = game;
    this.style = CAR_STYLES[clamp(game.eraIndex, 0, 8)];
    this.layout = buildLayout(game.track, game.eraIndex);
    /* The 3D circuit and the race clock must agree on one lap length. */
    game.lapLength = this.layout.length;
    this.speedProfile = this.buildSpeedProfile(game);
    game.speedCapAt = u => this.speedCapAt(u);
    game.turnAt = u => this.layout.turnAt(u);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xa9c8d8, 120, 1050);
    this.scene.environment = null;

    const az = 2.36, el = .50;
    this.sunDir = new THREE.Vector3(
      Math.cos(el) * Math.cos(az), Math.sin(el), Math.cos(el) * Math.sin(az)
    ).normalize();

    this.sky = createSkyDome('DRY');
    this.scene.add(this.sky.mesh);
    this.envDry = makeEnvironment(this.renderer, 'DRY');
    this.envWet = makeEnvironment(this.renderer, 'WET');

    this.buildLighting();
    this.buildWorld(game);

    this.weather = null;
    this.applyWeather(game.weather || 'DRY');
    this.prevSpeed = game.player.speed;
    this.time = 0;
    this.camInit = false;
    this.camMode = -1;
    this.resize();
    this.ready = true;
  }

  buildLighting() {
    const size = this.quality === 'low' ? 512 : 1024;
    this.sun = new THREE.DirectionalLight(0xfff2d8, 3.9);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(size, size);
    const c = this.sun.shadow.camera;
    c.left = -46; c.right = 46; c.top = 46; c.bottom = -46; c.near = 1; c.far = 360;
    this.sun.shadow.bias = -.0007;
    this.sun.shadow.normalBias = .07;
    this.sun.shadow.camera.updateProjectionMatrix();
    this.scene.add(this.sun);
    this.scene.add(this.sun.target);

    this.hemi = new THREE.HemisphereLight(0xa9cbe8, 0x6b6a4e, 1.0);
    this.scene.add(this.hemi);

    this.fill = new THREE.DirectionalLight(0xc3d8ea, .85);
    this.fill.castShadow = false;
    this.scene.add(this.fill);
    this.scene.add(this.fill.target);
  }

  buildWorld(game) {
    const road = buildRoad(this.layout, this.textures);
    this.road = road;
    this.scene.add(road.group);

    const terrain = buildTerrain(this.layout, this.textures);
    this.scene.add(terrain.mesh);
    this.scene.add(buildTrees(this.layout).group);

    const sc = buildScenery(this.layout, game.track, game.eraIndex, this.textures);
    this.scene.add(sc.group);
    this.startLightMat = sc.startLightMat;

    this.shared = {
      carbon: this.textures.carbon,
      wheelFaceVintage: this.textures.wheelFaceVintage,
      wheelFaceModern: this.textures.wheelFaceModern
    };

    const numMat = texNumber(1, '#f4f4ea');
    const roundel = texRoundel(1, '#f1efe4', '#1a1c1e');
    this.ownedTextures.push(numMat, roundel);
    this.playerRig = buildCar(this.style, {
      primary: game.era.colors[0], accent: game.era.colors[1],
      number: numMat, roundel, low: false, helmet: '#eceade'
    }, this.shared);
    this.scene.add(this.playerRig.root);

    this.aiRigs = game.ai.map((ai, i) => {
      const lum = hexLum(ai.color);
      const accent = lum > .6 ? '#191b1d' : '#efefe4';
      const num = texNumber(i + 2, lum > .6 ? '#1c1e20' : '#f4f4ea');
      const rd = texRoundel(i + 2, '#f1efe4', '#1a1c1e');
      this.ownedTextures.push(num, rd);
      const rig = buildCar(this.style, {
        primary: ai.color, accent, number: num, roundel: rd, low: true,
        helmet: lum > .6 ? '#202224' : '#e9e9df'
      }, this.shared);
      this.scene.add(rig.root);
      return rig;
    });

    this.stations = Array.from({ length: 14 }, (_, i) => {
      const u = i / 14 + .008;
      const sm = this.layout.sample(u);
      const s = i % 2 ? 1 : -1;
      const pos = sm.pos.clone().addScaledVector(sm.side, s * (this.layout.halfWidth + 13.5));
      pos.y += 4.2 + (i % 3) * 1.7;
      return { u, pos };
    });

    this.sunFlare = makeSunFlare();
    this.scene.add(this.sunFlare);
    this.rain = makeRain();
    this.scene.add(this.rain);
  }

  applyWeather(w) {
    const wet = w === 'WET';
    if (this.weather === w) return;
    this.weather = w;
    if (!this.scene) return;
    const fog = this.scene.fog;
    if (fog) {
      fog.color.set(wet ? '#98a4a6' : '#a9c8d8');
      fog.near = wet ? 45 : 120;
      fog.far = wet ? 520 : 1050;
    }
    if (this.sky) setSkyWeather(this.sky, w);
    this.scene.environment = wet ? this.envWet : this.envDry;
    if (this.sun) this.sun.intensity = wet ? 1.7 : 3.9;
    if (this.hemi) this.hemi.intensity = wet ? 1.45 : 1.0;
    this.renderer.toneMappingExposure = wet ? 1.02 : 1.1;
    if (this.road) {
      const a = this.road.asphalt;
      a.roughness = wet ? .27 : .84;
      a.metalness = wet ? .22 : .04;
      a.color.set(wet ? 0x99a1a3 : 0xf2f2f2);
      a.envMapIntensity = wet ? 1.35 : .55;
      a.needsUpdate = true;
    }
    if (this.rain) {
      this.rain.visible = wet;
      this.rain.material.opacity = wet ? .55 : 0;
    }
    if (this.sunFlare) this.sunFlare.material.opacity = wet ? .06 : .55;
  }

  updateCars(game, dt) {
    const p = game.player;
    const accel = (p.speed - this.prevSpeed) / Math.max(dt, .001);
    this.prevSpeed = p.speed;
    const pose = orientCar(
      this.playerRig, this.layout, p.distance, p.lateral * this.layout.halfWidth,
      dt, p.speed, p.steer,
      { player: true, pitch: clamp(-accel * .0009, -.022, .022), yawOffset: p.steer * .045 }
    );
    this.playerPose = pose;
    this.playerRig.rainLightMat.emissiveIntensity = accel < -1.5 ? 5 : 1.1;

    game.ai.forEach((ai, i) => {
      const rig = this.aiRigs[i];
      if (!rig) return;
      const steer = Math.sin(this.time * .8 + i * 2.1) * .16;
      orientCar(rig, this.layout, ai.distance, ai.lateral * this.layout.halfWidth * .82, dt, ai.speed, steer, {});
    });
  }

  buildSpeedProfile(game) {
    const era = game.era;
    /* Grip is the arcade archetype, mapped onto a believable lateral-g range.
       The profile already includes braking anticipation for the next corner. */
    const latG = .9 + (era.grip / 100) * 2.6;
    const decel = Math.max(6, era.braking * 1.95 / 3.6);
    return this.layout.buildSpeedProfile(latG, decel, era.max / 3.6, this.layout.custom ? 1.8 : 4.0);
  }

  speedCapAt(u) {
    const prof = this.speedProfile;
    if (!prof) return 200;
    const S = this.layout.S;
    let f = u * S; f = ((f % S) + S) % S;
    const i = Math.floor(f), t = f - i;
    return (prof[i] * (1 - t) + prof[(i + 1) % S] * t) * 3.6;
  }

  bindLookControls() {
    const el = this.canvas;
    let sx = 0, sy = 0, active = false;
    const down = e => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      active = true;
      this.lookActive = true;
      sx = e.clientX; sy = e.clientY;
      el.setPointerCapture && el.setPointerCapture(e.pointerId);
    };
    const move = e => {
      if (!active) return;
      this.lookYaw = clamp(this.lookYaw + (e.clientX - sx) * .006, -1.5, 1.5);
      this.lookPitch = clamp(this.lookPitch + (e.clientY - sy) * .004, -.5, .5);
      sx = e.clientX; sy = e.clientY;
    };
    const up = () => {
      active = false;
      this.lookActive = false;
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('pointerleave', up);
  }

  updateCamera(game, dt) {
    const pose = this.playerPose;
    if (!pose) return;
    const p = game.player;
    const ratio = clamp(p.speed / game.era.max, 0, 1);
    const mode = game.camera | 0;
    if (mode !== this.camMode) { this.camMode = mode; this.camInit = false; }

    if (game.lookAuto) {
      this.lookYaw += dt * .42;
      if (this.lookYaw > Math.PI * 2) this.lookYaw -= Math.PI * 2;
    } else if (!this.lookActive) {
      const k = Math.exp(-dt * 1.7);
      this.lookYaw *= k;
      this.lookPitch *= k;
    }
    const up = new THREE.Vector3(0, 1, 0);
    const forward = pose.tangent.clone().applyAxisAngle(up, this.lookYaw).normalize();

    const cam = this.camera;
    this.playerRig.helmet.visible = mode !== 1;
    let fov = 60;

    if (mode === 1) {
      this.playerRig.root.updateMatrixWorld(true);
      const eye = this.playerRig.root.localToWorld(this.playerRig.eye.clone());
      const look = this.playerRig.root.localToWorld(new THREE.Vector3(
        Math.sin(this.lookYaw) * 34,
        this.playerRig.eye.y - .08 + this.lookPitch * 14,
        Math.cos(this.lookYaw) * 34
      ));
      cam.position.copy(eye);
      cam.lookAt(look);
      fov = 74;
      this.camInit = false;
    } else if (mode === 2) {
      const pu = ((p.distance / this.layout.length) % 1 + 1) % 1;
      let best = this.stations[0], bestGap = 9;
      for (const st of this.stations) {
        let gap = st.u - pu; if (gap < 0) gap += 1;
        if (gap < bestGap) { bestGap = gap; best = st; }
      }
      cam.position.copy(best.pos);
      cam.position.y += Math.sin(this.time * .6) * .04;
      cam.lookAt(pose.pos.x, pose.pos.y + .75, pose.pos.z);
      const dist = best.pos.distanceTo(pose.pos);
      fov = clamp(48 - dist * .5, 20, 46);
      this.camInit = false;
    } else if (mode === 3) {
      const desired = pose.pos.clone()
        .addScaledVector(forward, -17)
        .addScaledVector(pose.side, 13);
      desired.y += 26 + this.lookPitch * 10;
      const look = pose.pos.clone().addScaledVector(forward, 9);
      look.y += 1.2;
      if (!this.camInit) { this.camPos = desired.clone(); this.camLook = look.clone(); this.camInit = true; }
      const k = 1 - Math.exp(-dt * 3.2), kl = 1 - Math.exp(-dt * 4.2);
      this.camPos.lerp(desired, k);
      this.camLook.lerp(look, kl);
      cam.position.copy(this.camPos);
      cam.lookAt(this.camLook);
      fov = 46;
    } else if (mode === 4) {
      const angle = this.time * .20 + this.lookYaw;
      const radius = 15 + ratio * 6;
      const desired = pose.pos.clone().add(new THREE.Vector3(
        Math.sin(angle) * radius,
        6.5 + this.lookPitch * 12,
        Math.cos(angle) * radius
      ));
      const look = pose.pos.clone();
      look.y += .85;
      if (!this.camInit) { this.camPos = desired.clone(); this.camLook = look.clone(); this.camInit = true; }
      const k = 1 - Math.exp(-dt * 2.8), kl = 1 - Math.exp(-dt * 4);
      this.camPos.lerp(desired, k);
      this.camLook.lerp(look, kl);
      cam.position.copy(this.camPos);
      cam.lookAt(this.camLook);
      fov = 50;
    } else {
      const back = 7.4 + ratio * 3.4;
      const desired = pose.pos.clone().addScaledVector(forward, -back);
      desired.y += 2.35 + ratio * .5 + this.lookPitch * 3.2;
      const look = pose.pos.clone().addScaledVector(forward, 9.5 + ratio * 6);
      look.y += 1.0;
      if (!this.camInit) { this.camPos = desired.clone(); this.camLook = look.clone(); this.camInit = true; }
      const k = 1 - Math.exp(-dt * 5.5), kl = 1 - Math.exp(-dt * 7.5);
      this.camPos.lerp(desired, k);
      this.camLook.lerp(look, kl);
      cam.position.copy(this.camPos);
      const shake = (0.008 + ratio * .02) * (this.weather === 'WET' ? 1.4 : 1);
      cam.position.x += Math.sin(this.time * 47.3) * shake;
      cam.position.y += Math.cos(this.time * 39.7) * shake * .7;
      cam.lookAt(this.camLook);
      fov = 54 + ratio * 9;
    }

    if (Math.abs(cam.fov - fov) > .05) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }
  }

  updateEffects(game, dt) {
    const cam = this.camera;
    if (this.sky) this.sky.mesh.position.copy(cam.position);
    if (this.sunFlare) {
      this.sunFlare.position.copy(cam.position).addScaledVector(this.sunDir, 900);
    }
    if (this.rain && this.rain.visible) {
      this.rain.position.copy(cam.position);
      const pos = this.rain.geometry.attributes.position;
      const arr = pos.array;
      const fall = dt * 58;
      for (let i = 1; i < arr.length; i += 3) {
        arr[i] -= fall;
        if (arr[i] < 0) arr[i] += 55;
      }
      pos.needsUpdate = true;
    }
    if (this.startLightMat) {
      const lit = !game.started && game.lights > 0;
      this.startLightMat.emissiveIntensity = lit ? 5 : 0;
    }
    if (this.playerPose) {
      const pos = this.playerPose.pos;
      this.sun.position.copy(pos).addScaledVector(this.sunDir, 130);
      this.sun.target.position.copy(pos);
      this.sun.target.updateMatrixWorld();
      this.fill.position.copy(cam.position).add(new THREE.Vector3(0, 6, 0));
      this.fill.target.position.copy(pos);
      this.fill.target.updateMatrixWorld();
    }
  }

  watchPerformance(step) {
    if (this.autoSteps >= 2) return;
    this.frameAcc += step; this.frameCount++;
    if (this.frameCount < 45) return;
    const avg = this.frameAcc / this.frameCount;
    this.frameAcc = 0; this.frameCount = 0;
    if (avg < .038) { this.autoSteps = 2; return; }
    this.autoSteps++;
    if (this.autoSteps === 1) {
      this.quality = 'low';
      this.resize();
      if (this.sun && this.sun.shadow.map) {
        this.sun.shadow.mapSize.set(512, 512);
        this.sun.shadow.map.dispose();
        this.sun.shadow.map = null;
      }
    } else {
      this.renderer.shadowMap.enabled = false;
      if (this.rain) this.rain.visible = false;
      if (this.road) { this.road.asphalt.roughness = .9; }
    }
  }

  render(game, dt) {
    if (!this.ready) return;
    const step = Math.min(.05, dt || .016);
    this.watchPerformance(step);
    this.time += step;
    this.applyWeather(game.weather || 'DRY');
    this.updateCars(game, step);
    this.updateCamera(game, step);
    this.updateEffects(game, step);
    this.renderer.render(this.scene, this.camera);
  }
}
