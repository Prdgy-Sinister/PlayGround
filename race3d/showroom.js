import * as THREE from '../vendor/three.module.js';
import { clamp, texAsphalt, texCarbon, texNumber, texRoundel, texWheelFace, hexLum } from './util.js';
import { buildCar, CAR_STYLES } from './car.js';
import { getSkyTexture } from './sky.js';

/* A small, self-contained showroom for the home hero: one car on a turntable.
   It shares the procedural car builder with the race renderer, so what you
   see here is exactly the model that lines up on the grid. */
export class Showroom {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas, antialias: true, alpha: false, stencil: false, powerPreference: 'high-performance'
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.06;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    const sky = getSkyTexture('DRY');
    this.scene.background = sky;
    this.scene.environment = sky;
    this.scene.fog = new THREE.Fog(0xa6bfcb, 45, 280);

    this.camera = new THREE.PerspectiveCamera(30, 1, .1, 900);

    this.platformTop = .17;
    this.stage = new THREE.Group();
    this.scene.add(this.stage);

    this.textures = {
      asphalt: texAsphalt(),
      carbon: texCarbon(),
      wheelFaceVintage: texWheelFace(true),
      wheelFaceModern: texWheelFace(false),
      number: texNumber(1, '#f4f4ea'),
      roundel: texRoundel(1, '#f1efe4', '#1a1c1e')
    };
    this.textures.asphalt.wrapS = this.textures.asphalt.wrapT = THREE.RepeatWrapping;
    this.textures.asphalt.repeat.set(8, 8);

    this.buildStage();
    this.buildLighting();

    this.time = 0;
    this.yaw = -.62;
    this.dragging = false;
    this.autoSpin = true;
    this.idle = 0;
    this.lastX = 0;
    this.running = false;
    this.raf = 0;
    this.last = 0;

    this.shared = {
      carbon: this.textures.carbon,
      wheelFaceVintage: this.textures.wheelFaceVintage,
      wheelFaceModern: this.textures.wheelFaceModern
    };

    this.rig = null;
    this.bindPointer();
  }

  buildStage() {
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(320, 64),
      new THREE.MeshStandardMaterial({ color: 0x1c2119, roughness: .98, metalness: 0 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(4.1, 4.24, this.platformTop, 64),
      new THREE.MeshStandardMaterial({ color: 0x161a15, roughness: .45, metalness: .5 })
    );
    base.position.y = this.platformTop / 2;
    base.receiveShadow = true;
    base.castShadow = true;
    this.stage.add(base);

    const surface = new THREE.Mesh(
      new THREE.CircleGeometry(4.0, 64),
      new THREE.MeshStandardMaterial({ map: this.textures.asphalt, roughness: .7, metalness: .22, color: 0x5a6056 })
    );
    surface.rotation.x = -Math.PI / 2;
    surface.position.y = this.platformTop + .002;
    surface.receiveShadow = true;
    this.stage.add(surface);

    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(4.08, .035, 8, 120),
      new THREE.MeshStandardMaterial({ color: 0xc9a961, metalness: 1, roughness: .28 })
    );
    rim.rotation.x = Math.PI / 2;
    rim.position.y = this.platformTop + .01;
    this.stage.add(rim);

  }

  /* textures are built before the stage is assembled */

  buildLighting() {
    this.scene.add(new THREE.HemisphereLight(0xd6e7f3, 0x272b21, 1.5));

    const key = new THREE.DirectionalLight(0xfff8ec, 2.9);
    key.position.set(7.5, 10, 6.5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -7;
    key.shadow.camera.right = 7;
    key.shadow.camera.top = 7;
    key.shadow.camera.bottom = -7;
    key.shadow.camera.near = .5;
    key.shadow.camera.far = 34;
    key.shadow.bias = -.0006;
    key.shadow.normalBias = .045;
    this.scene.add(key);

    const fill = new THREE.DirectionalLight(0xc3dcef, .9);
    fill.position.set(-7, 4.5, 5.5);
    this.scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffd6a4, 2.1);
    rim.position.set(-3.5, 3.2, -8);
    this.scene.add(rim);
  }

  setEra(eraIndex, colors) {
    const i = clamp(eraIndex, 0, 8);
    if (this.era === i && this.rig) return;
    this.era = i;

    if (this.rig) {
      this.stage.remove(this.rig.root);
      this.rig.root.traverse(o => {
        if (o.geometry) o.geometry.dispose();
      });
      this.rig.materials.forEach(m => m.dispose());
      this.rig = null;
    }

    const style = CAR_STYLES[i];
    const primary = (colors && colors[0]) || '#d8d9cf';
    const accent = (colors && colors[1]) || '#1a1c1e';
    this.rig = buildCar(style, {
      primary, accent,
      number: this.textures.number,
      roundel: this.textures.roundel,
      helmet: hexLum(primary) > .55 ? '#22262a' : '#eceade',
      low: false
    }, this.shared);
    this.rig.root.position.y = this.platformTop;
    this.stage.add(this.rig.root);
    this.frame();
  }

  frame() {
    const w = Math.max(2, this.canvas.clientWidth);
    const h = Math.max(2, this.canvas.clientHeight);
    this.camera.aspect = w / h;

    let size = new THREE.Vector3(1.9, 1.15, 4.8);
    if (this.rig) {
      /* measure the car unrotated: a rotated AABB would inflate the fit */
      const savedYaw = this.stage.rotation.y;
      this.stage.rotation.y = 0;
      this.stage.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(this.rig.root);
      this.stage.rotation.y = savedYaw;

      /* put the geometric centre of the car on the turntable axis */
      const center = box.getCenter(new THREE.Vector3());
      this.rig.root.position.x -= center.x;
      this.rig.root.position.z -= center.z;
      this.stage.updateMatrixWorld(true);
      size = box.getSize(size);
    }
    const halfV = THREE.MathUtils.degToRad(this.camera.fov * .5);
    const halfH = Math.atan(Math.tan(halfV) * this.camera.aspect);
    const dir = new THREE.Vector3(.53, .18, .84).normalize();

    /* fit the long, low car against the horizontal field of view, using the
       footprint radius so the framing stays safe while the stage turns */
    const footprint = .5 * Math.hypot(size.x, size.z);
    const dist = Math.max(footprint / Math.tan(halfH), (size.y * .5) / Math.tan(halfV)) * 1.48;

    const target = new THREE.Vector3(0, this.platformTop + size.y * .5, 0);
    this.camera.position.copy(target).addScaledVector(dir, dist);
    this.camera.lookAt(target);
    /* keep the car sitting slightly low in the frame so the hero overlays breathe */
    this.camera.rotateX(0);
    this.camera.updateProjectionMatrix();
  }

  bindPointer() {
    const el = this.canvas;
    const down = e => {
      this.dragging = true;
      this.idle = 0;
      this.lastX = e.clientX;
      el.setPointerCapture && el.setPointerCapture(e.pointerId);
      el.classList.add('dragging');
    };
    const move = e => {
      if (!this.dragging) return;
      this.yaw += (e.clientX - this.lastX) * .007;
      this.lastX = e.clientX;
    };
    const up = () => {
      if (!this.dragging) return;
      this.dragging = false;
      this.idle = -1.6;
      el.classList.remove('dragging');
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('pointerleave', up);
  }

  rotateBy(delta) {
    this.yaw += delta;
    this.idle = 0;
  }

  setAuto(on) {
    this.autoSpin = !!on;
    this.idle = 0;
  }

  resize() {
    const w = Math.max(2, Math.round(this.canvas.clientWidth));
    const h = Math.max(2, Math.round(this.canvas.clientHeight));
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, w < 520 ? 1.5 : 2));
    this.renderer.setSize(w, h, false);
    this.frame();
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    const tick = now => {
      if (!this.running) return;
      this.raf = requestAnimationFrame(tick);
      const dt = Math.min(.06, Math.max(0, (now - this.last) / 1000));
      this.last = now;
      if (document.hidden) return;
      this.update(dt);
      this.renderer.render(this.scene, this.camera);
    };
    this.raf = requestAnimationFrame(tick);
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  update(dt) {
    this.time += dt;
    if (!this.dragging) {
      this.idle += dt;
      if (this.autoSpin && this.idle > .4) this.yaw += dt * .085;
    }
    this.stage.rotation.y = this.yaw;
    if (this.rig) {
      const bob = Math.sin(this.time * .9) * .0035;
      this.rig.root.position.y = this.platformTop + bob;
    }
  }

  dispose() {
    this.stop();
    if (this.rig) {
      this.rig.root.traverse(o => { if (o.geometry) o.geometry.dispose(); });
      this.rig.materials.forEach(m => m.dispose());
      this.rig = null;
    }
    this.scene.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach(m => m.dispose());
      }
    });
    this.scene.background = null;
    this.scene.environment = null;
    this.scene.clear();
    Object.values(this.textures).forEach(t => t && t.dispose && t.dispose());
    this.textures = {};
    this.renderer.dispose();
    this.renderer.forceContextLoss && this.renderer.forceContextLoss();
  }
}
