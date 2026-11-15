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
    this.renderer.toneMappingExposure = 1.12;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    const sky = getSkyTexture('DRY');
    this.scene.background = sky;
    this.scene.environment = sky;
    this.scene.fog = new THREE.Fog(0x9fb8c5, 55, 340);

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
    this.auto = true;
    this.dragging = false;
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
      new THREE.MeshStandardMaterial({ color: 0x22261e, roughness: .98, metalness: 0 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(5.15, 5.3, this.platformTop, 64),
      new THREE.MeshStandardMaterial({ color: 0x1c201b, roughness: .48, metalness: .45 })
    );
    base.position.y = this.platformTop / 2;
    base.receiveShadow = true;
    base.castShadow = true;
    this.stage.add(base);

    const surface = new THREE.Mesh(
      new THREE.CircleGeometry(5.02, 64),
      new THREE.MeshStandardMaterial({ map: this.textures.asphalt, roughness: .72, metalness: .2, color: 0x7b8175 })
    );
    surface.rotation.x = -Math.PI / 2;
    surface.position.y = this.platformTop + .002;
    surface.receiveShadow = true;
    this.stage.add(surface);

    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(5.13, .035, 8, 120),
      new THREE.MeshStandardMaterial({ color: 0xc9a961, metalness: 1, roughness: .28 })
    );
    rim.rotation.x = Math.PI / 2;
    rim.position.y = this.platformTop + .01;
    this.stage.add(rim);

  }

  /* textures are built before the stage is assembled */

  buildLighting() {
    this.scene.add(new THREE.HemisphereLight(0xdceaf6, 0x2a2e24, 1.4));

    const key = new THREE.DirectionalLight(0xfff3da, 3.4);
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

    const fill = new THREE.DirectionalLight(0xc3dcef, 1.15);
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

    let radius = 2.45, height = 1.1;
    if (this.rig) {
      const box = new THREE.Box3().setFromObject(this.rig.root);
      const size = box.getSize(new THREE.Vector3());
      radius = Math.hypot(size.x, size.z) * .5;
      height = size.y;
    }
    const halfV = THREE.MathUtils.degToRad(this.camera.fov * .5);
    const halfH = Math.atan(Math.tan(halfV) * this.camera.aspect);
    const dist = (radius / Math.sin(Math.min(halfV, halfH))) * 1.06;

    const target = new THREE.Vector3(0, this.platformTop + height * .46, 0);
    const dir = new THREE.Vector3(.52, .46, .78).normalize();
    this.camera.position.copy(target).addScaledVector(dir, dist);
    this.camera.lookAt(target);
    /* keep the car sitting slightly low in the frame so the hero overlays breathe */
    this.camera.rotateX(.03);
    this.camera.updateProjectionMatrix();
  }

  bindPointer() {
    const el = this.canvas;
    const down = e => {
      this.dragging = true;
      this.idle = 0;
      this.lastX = e.clientX;
      this.auto = false;
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
      if (this.idle > .4) this.yaw += dt * .085;
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
