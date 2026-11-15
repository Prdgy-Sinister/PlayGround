import * as THREE from 'three';
import { createBonsai } from './bonsai.js';
import { createWeaponMesh } from './weapons.js';
import { seasonOf, SPECIES, WEAPON_TYPES } from './data.js';

export class Preview3D {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.pointerEvents = 'none';
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.itemGroup = null;
    this.host = null;
    this.item = null;
    this.rot = 0;
    this.time = 0;
  }

  ensure() {
    if (this.renderer) return;
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(300, 300, false);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    this.camera.position.set(0, 2.3, 6.0);
    this.camera.lookAt(0, 1.2, 0);

    this.scene.add(new THREE.HemisphereLight(0xf4e6c8, 0x2e2820, 1.1));
    const key = new THREE.DirectionalLight(0xffe4b8, 2.4);
    key.position.set(3, 6, 4);
    this.scene.add(key);
    const rim = new THREE.DirectionalLight(0x88a8c0, 1.1);
    rim.position.set(-4, 3, -3);
    this.scene.add(rim);
    const fill = new THREE.PointLight(0xffb878, 1.3, 9, 2);
    fill.position.set(0, 2.2, 3.2);
    this.scene.add(fill);
    this.rimLight = rim;
    this.keyLight = key;

    this.root = new THREE.Group();
    this.scene.add(this.root);

    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(1.35, 1.5, 0.22, 40),
      new THREE.MeshStandardMaterial({ color: 0x2c2720, roughness: 0.72, metalness: 0.15 }),
    );
    pedestal.position.y = -0.11;
    this.root.add(pedestal);
    const rimRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.36, 0.015, 6, 48),
      new THREE.MeshBasicMaterial({ color: 0xbf9a5a, transparent: true, opacity: 0.7 }),
    );
    rimRing.rotation.x = Math.PI / 2;
    rimRing.position.y = 0.003;
    this.root.add(rimRing);
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(4.5, 48),
      new THREE.MeshBasicMaterial({ color: 0x0b0907, transparent: true, opacity: 0.35 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.23;
    this.root.add(floor);

    this.itemGroup = new THREE.Group();
    this.root.add(this.itemGroup);

    this.resize();
  }

  attach(host) {
    this.ensure();
    this.host = host;
    host.innerHTML = '';
    host.appendChild(this.canvas);
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    requestAnimationFrame(() => this.resize());
  }

  resize() {
    if (!this.renderer || !this.host) return;
    const w = Math.max(80, this.host.clientWidth);
    const h = Math.max(80, this.host.clientHeight);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  show(item) {
    this.ensure();
    this.item = item;
    while (this.itemGroup.children.length) this.itemGroup.remove(this.itemGroup.children[0]);
    if (!item) return;
    const seasonId = window.GAME ? seasonOf(window.GAME.state.day).id : 'spring';
    let obj;
    if (item.kind === 'tree') {
      obj = createBonsai(item, seasonId, { scale: 1.15, castShadow: true });
      const box = new THREE.Box3().setFromObject(obj);
      const size = new THREE.Vector3(); box.getSize(size);
      const s = Math.min(1.65, 2.55 / Math.max(size.y, 1));
      obj.scale.multiplyScalar(s);
      const box2 = new THREE.Box3().setFromObject(obj);
      obj.position.y -= box2.min.y;
      const box3 = new THREE.Box3().setFromObject(obj);
      const center = new THREE.Vector3(); box3.getCenter(center);
      obj.position.x -= center.x;
      obj.position.z -= center.z;
      const sp = SPECIES[item.sp];
      if (sp?.supernatural) {
        const glow = new THREE.PointLight(sp.id === 'spiritPine' ? 0x4fffd0 : 0xc04fff, 2.4, 5, 2);
        glow.position.set(0, 1.2, 0.5);
        this.itemGroup.add(glow);
        this.rimLight.color.setHex(0xb070ff);
      } else {
        this.rimLight.color.setHex(0x88a8c0);
      }
    } else {
      obj = createWeaponMesh(item.type, { material: item.material, quality: item.quality, supernatural: item.supernatural });
      const box = new THREE.Box3().setFromObject(obj);
      const size = new THREE.Vector3(); box.getSize(size);
      const s = 2.2 / Math.max(size.y, size.x, 0.5);
      obj.scale.multiplyScalar(s);
      const box2 = new THREE.Box3().setFromObject(obj);
      obj.position.y -= box2.min.y;
      const center = new THREE.Vector3(); new THREE.Box3().setFromObject(obj).getCenter(center);
      obj.position.x -= center.x;
      obj.position.z -= center.z;
      obj.position.y += 0.1;
      if (item.type === 'armour' || item.type === 'yumi') {
        const box3 = new THREE.Box3().setFromObject(obj);
        const sz = new THREE.Vector3(); box3.getSize(sz);
        const s2 = 2.5 / Math.max(sz.y, 1);
        obj.scale.multiplyScalar(s2);
        const b4 = new THREE.Box3().setFromObject(obj);
        obj.position.y -= b4.min.y;
      }
      const tp = WEAPON_TYPES[item.type];
      if (tp?.supernatural || item.supernatural) {
        const glow = new THREE.PointLight(0xff3050, 2.2, 5, 2);
        glow.position.set(0, 1.3, 0.5);
        this.itemGroup.add(glow);
        this.rimLight.color.setHex(0xff5c6e);
      } else {
        this.rimLight.color.setHex(0x88a8c0);
      }
    }
    obj.traverse((o) => { if (o.isMesh) { o.castShadow = false; } });
    this.itemGroup.add(obj);
    this.rot = -0.5;
  }

  render(dt) {
    if (!this.renderer || !this.host || !this.host.isConnected) return;
    this.time += dt;
    this.rot += dt * 0.45;
    this.itemGroup.rotation.y = this.rot;
    this.itemGroup.position.y = Math.sin(this.time * 0.9) * 0.025;
    this.renderer.render(this.scene, this.camera);
  }
}
