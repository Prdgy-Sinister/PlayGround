import * as THREE from 'three';
import { getGlowTexture } from './character.js';
import { runeRingTexture } from './worldkit.js';

const rnd = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export class Effects {
  constructor(scene) {
    this.scene = scene;
    this.items = [];
    this.orbs = [];
    this.shakeAmt = 0;
  }

  setScene(scene) {
    this.clear();
    this.scene = scene;
    this.shakeAmt = 0;
  }

  clear() {
    for (const it of [...this.items, ...this.orbs]) {
      if (it.group?.parent) it.group.parent.remove(it.group);
      else if (it.mesh?.parent) it.mesh.parent.remove(it.mesh);
    }
    this.items = [];
    this.orbs = [];
  }

  addObject(group, update, ttl = Infinity) {
    this.scene.add(group);
    const item = { group, update, ttl, age: 0 };
    this.items.push(item);
    return item;
  }

  shake(v) { this.shakeAmt = Math.min(1.4, this.shakeAmt + v); }

  update(dt) {
    this.shakeAmt = Math.max(0, this.shakeAmt - dt * 2.6);
    for (let i = this.items.length - 1; i >= 0; i--) {
      const it = this.items[i];
      it.age += dt;
      it.update?.(dt, it.age);
      if (it.age >= it.ttl) {
        it.group.parent?.remove(it.group);
        this.items.splice(i, 1);
      }
    }
    for (let i = this.orbs.length - 1; i >= 0; i--) {
      const o = this.orbs[i];
      o.age += dt;
      o.trailTimer -= dt;
      if (o.trailTimer <= 0) {
        o.trailTimer = 0.018;
        o.history.unshift(o.group.position.clone());
        if (o.history.length > 16) o.history.pop();
      }
      const arr = o.trail.geometry.attributes.position.array;
      o.history.forEach((p, idx) => {
        arr[idx * 3] = p.x; arr[idx * 3 + 1] = p.y; arr[idx * 3 + 2] = p.z;
      });
      for (let k = o.history.length; k < 16; k++) {
        const p = o.history[o.history.length - 1] || o.group.position;
        arr[k * 3] = p.x; arr[k * 3 + 1] = p.y; arr[k * 3 + 2] = p.z;
      }
      o.trail.geometry.attributes.position.needsUpdate = true;
      o.halo.material.opacity = 0.6 + Math.sin(o.age * 22) * 0.18;
      o.group.rotation.z += dt * 5;
    }
  }

  createOrb(color = '#ffe0a0', size = 0.16) {
    const group = new THREE.Group();
    const core = new THREE.Mesh(new THREE.SphereGeometry(size, 10, 8), new THREE.MeshBasicMaterial({ color: '#fff8ea' }));
    group.add(core);
    const shell = new THREE.Mesh(new THREE.SphereGeometry(size * 1.5, 10, 8), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false }));
    group.add(shell);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: getGlowTexture(), color, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }));
    halo.scale.setScalar(size * 14);
    group.add(halo);
    const trail = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(16 * 3), 3)), new THREE.PointsMaterial({ map: getGlowTexture(), color, size: size * 5, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
    trail.frustumCulled = false;
    this.scene.add(trail);
    this.scene.add(group);
    const orb = { group, core, shell, halo, trail, history: [], trailTimer: 0, age: 0, color, size };
    this.orbs.push(orb);
    return orb;
  }

  removeOrb(orb) {
    orb.group.parent?.remove(orb.group);
    orb.trail.parent?.remove(orb.trail);
    this.orbs = this.orbs.filter(o => o !== orb);
  }

  burst(pos, color = '#ffd28a', count = 22, opts = {}) {
    const n = count;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(n * 3);
    const vel = [];
    for (let i = 0; i < n; i++) {
      positions[i * 3] = pos.x; positions[i * 3 + 1] = pos.y; positions[i * 3 + 2] = pos.z;
      const a = Math.random() * Math.PI * 2, e = rnd(-0.4, 1.1);
      const sp = rnd(1.4, opts.speed || 6.5);
      vel.push(new THREE.Vector3(Math.cos(a) * Math.cos(e) * sp, Math.sin(e) * sp, Math.sin(a) * Math.cos(e) * sp));
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ map: getGlowTexture(), color, size: opts.size || 0.55, transparent: true, opacity: 1, depthWrite: false, blending: THREE.AdditiveBlending });
    const pts = new THREE.Points(geo, mat);
    pts.frustumCulled = false;
    this.scene.add(pts);
    const item = { group: pts, age: 0, ttl: opts.ttl || 0.9, update(dt) {
      const arr = geo.attributes.position.array;
      for (let i = 0; i < n; i++) {
        const v = vel[i];
        v.y -= (opts.gravity ?? 5.5) * dt;
        v.multiplyScalar(1 - dt * 1.6);
        arr[i * 3] += v.x * dt; arr[i * 3 + 1] += v.y * dt; arr[i * 3 + 2] += v.z * dt;
      }
      geo.attributes.position.needsUpdate = true;
      mat.opacity = Math.max(0, 1 - this.age / this.ttl);
    } };
    this.items.push(item);
    // flash
    const flash = new THREE.Sprite(new THREE.SpriteMaterial({ map: getGlowTexture(), color, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }));
    flash.position.copy(pos); flash.scale.setScalar(opts.flash || 4);
    this.scene.add(flash);
    this.items.push({ group: flash, age: 0, ttl: 0.28, update(dt) { flash.material.opacity = Math.max(0, 0.85 * (1 - this.age / 0.28)); flash.scale.setScalar((opts.flash || 4) * (1 + this.age * 4)); } });
    return item;
  }

  ring(pos, color = '#8fe7ff', radius = 4, duration = 0.6, opts = {}) {
    const geo = new THREE.RingGeometry(0.15, 1, 48);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: opts.opacity ?? 0.8, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.copy(pos);
    mesh.position.y += 0.06;
    this.scene.add(mesh);
    const item = { group: mesh, age: 0, ttl: duration, update(dt) {
      const k = this.age / duration;
      mesh.scale.setScalar(radius * (0.2 + k));
      mat.opacity = Math.max(0, (opts.opacity ?? 0.8) * (1 - k));
    } };
    this.items.push(item);
    return item;
  }

  runeCircle(pos, color = '#ff8a6b', radius = 3, duration = 1.1) {
    const tex = runeRingTexture(color);
    const mat = new THREE.MeshBasicMaterial({ map: tex, color, transparent: true, opacity: 0.7, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
    const mesh = new THREE.Mesh(new THREE.CircleGeometry(radius, 40), mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.copy(pos); mesh.position.y += 0.08;
    this.scene.add(mesh);
    const item = { group: mesh, age: 0, ttl: duration, update(dt) {
      mesh.rotation.z += dt * 0.8;
      mat.opacity = 0.65 * (1 - this.age / duration) * (0.6 + Math.sin(this.age * 20) * 0.15);
    } };
    this.items.push(item);
    return item;
  }

  beam(a, b, color = '#6fd7ff', width = 0.12, duration = 0.35) {
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    const geo = new THREE.CylinderGeometry(width, width * 0.7, len, 6, 1, true);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(a).add(dir.multiplyScalar(0.5));
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    this.scene.add(mesh);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: getGlowTexture(), color, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false }));
    glow.position.copy(b); glow.scale.setScalar(2.2);
    this.scene.add(glow);
    const item = { group: mesh, age: 0, ttl: duration, update(dt) {
      mat.opacity = Math.max(0, 0.9 * (1 - this.age / duration));
      mesh.scale.x = mesh.scale.z = 1 + Math.sin(this.age * 40) * 0.3;
      glow.material.opacity = Math.max(0, 0.6 * (1 - this.age / duration));
    } };
    this.items.push(item);
    this.items.push({ group: glow, age: 0, ttl: duration, update() {} });
    return item;
  }

  lightning(points, color = '#b48cff', duration = 0.4) {
    const positions = [];
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i], b = points[i + 1];
      const steps = 7;
      for (let k = 0; k < steps; k++) {
        const t = k / steps;
        const p = new THREE.Vector3().lerpVectors(a, b, t);
        if (k > 0) { p.x += rnd(-0.3, 0.3); p.y += rnd(-0.3, 0.3); p.z += rnd(-0.3, 0.3); }
        positions.push(p.x, p.y, p.z);
      }
    }
    const geo = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false });
    const line = new THREE.LineSegments(geo, mat);
    this.scene.add(line);
    const item = { group: line, age: 0, ttl: duration, update(dt) {
      mat.opacity = Math.max(0, 1 - this.age / duration);
    } };
    this.items.push(item);
    for (const p of points) this.burst(p, color, 8, { speed: 3, size: 0.4, ttl: 0.5 });
    return item;
  }

  ward(targetGroup, color = '#78b4ff', scale = 1) {
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
      uniforms: { time: { value: 0 }, color: { value: new THREE.Color(color) }, opacity: { value: 0.7 } },
      vertexShader: `varying vec3 vN; varying vec3 vV; void main(){ vec4 wp=modelMatrix*vec4(position,1.0); vN=normalize(mat3(modelMatrix)*normal); vV=normalize(cameraPosition-wp.xyz); gl_Position=projectionMatrix*viewMatrix*wp; }`,
      fragmentShader: `varying vec3 vN; varying vec3 vV; uniform float time; uniform vec3 color; uniform float opacity;
        void main(){ float f = pow(1.0 - abs(dot(vN,vV)), 2.2); float bands = 0.7 + 0.3*sin(vN.y*30.0 + time*2.0);
          gl_FragColor = vec4(color, f * opacity * bands); }`
    });
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1.35 * scale, 24, 16), mat);
    mesh.position.y = 1.0;
    targetGroup.add(mesh);
    const item = { group: mesh, age: 0, ttl: 1e9, update(dt) { mat.uniforms.time.value += dt; } };
    this.items.push(item);
    return { mesh, mat, item, remove() { targetGroup.remove(mesh); item.ttl = 0; } };
  }

  heal(pos, color = '#8ef0b0') {
    const n = 20;
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(n * 3);
    const phases = [];
    for (let i = 0; i < n; i++) { arr[i * 3] = pos.x + rnd(-0.8, 0.8); arr[i * 3 + 1] = pos.y + rnd(0, 0.4); arr[i * 3 + 2] = pos.z + rnd(-0.8, 0.8); phases.push(rnd(0, 1)); }
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    const mat = new THREE.PointsMaterial({ map: getGlowTexture(), color, size: 0.5, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending });
    const pts = new THREE.Points(geo, mat); pts.frustumCulled = false; this.scene.add(pts);
    this.items.push({ group: pts, age: 0, ttl: 1.2, update(dt) {
      const a = geo.attributes.position.array;
      for (let i = 0; i < n; i++) { a[i * 3 + 1] += dt * (0.8 + phases[i] * 1.2); a[i * 3] += Math.sin(this.age * 4 + phases[i] * 8) * dt * 0.3; }
      geo.attributes.position.needsUpdate = true;
      mat.opacity = Math.max(0, 0.9 * (1 - this.age / 1.2));
    } });
    this.ring(pos, color, 1.6, 0.8, { opacity: 0.5 });
  }

  aegisPulse(pos, color = '#8fd0ff', radius = 3.5) {
    this.ring(pos, color, radius, 0.7, { opacity: 0.65 });
    this.burst(new THREE.Vector3(pos.x, pos.y + 0.8, pos.z), color, 26, { speed: 5, size: 0.4 });
  }

  meteor(target, color = '#ff7a3d', onImpact) {
    const start = new THREE.Vector3(target.x + rnd(-6, 6), target.y + 22, target.z + rnd(-6, 6));
    const orb = this.createOrb(color, 0.55);
    orb.group.position.copy(start);
    const dir = new THREE.Vector3().subVectors(target, start);
    const dur = 0.65;
    let impacted = false;
    const self = this;
    const item = { group: orb.group, age: 0, ttl: dur, update(dt) {
      const k = Math.min(1, this.age / dur);
      orb.group.position.copy(start).addScaledVector(dir, k);
      if (k >= 1 && !impacted) {
        impacted = true;
        this.ttl = 0;
        self.removeOrb(orb);
        self.burst(target, color, 34, { speed: 9, size: 0.8, flash: 7 });
        self.ring(target, color, 7, 0.7, { opacity: 0.8 });
        self.shake(0.8);
        onImpact?.();
      }
    } };
    this.items.push(item);
    return item;
  }

  serpent(pos, color = '#9fffa8', duration = 8) {
    const group = new THREE.Group();
    group.position.copy(pos);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false });
    const segments = [];
    for (let i = 0; i < 8; i++) {
      const seg = new THREE.Mesh(new THREE.SphereGeometry(0.24 - i * 0.018, 8, 6), mat);
      group.add(seg); segments.push(seg);
    }
    const head = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.7, 6), mat);
    group.add(head);
    this.scene.add(group);
    const item = { group, age: 0, ttl: duration, update(dt) {
      const t = this.age;
      segments.forEach((s, i) => {
        const a = t * 2.2 - i * 0.5;
        s.position.set(Math.cos(a) * (0.8 + i * 0.05), 0.4 + i * 0.22 + Math.sin(t * 3 - i * 0.4) * 0.15, Math.sin(a) * (0.8 + i * 0.05));
        s.scale.setScalar(1 - i * 0.03);
      });
      const last = segments[segments.length - 1];
      head.position.copy(last.position).add(new THREE.Vector3(0, 0.25, 0)); head.rotation.z = 0.5;
      mat.opacity = 0.8 * Math.min(1, (duration - t) * 1.5);
    } };
    this.items.push(item);
    return item;
  }

  summon(pos, color = '#c9a2ff') {
    this.runeCircle(pos, color, 2.2, 1.0);
    this.burst(new THREE.Vector3(pos.x, pos.y + 0.5, pos.z), color, 26, { speed: 4, size: 0.5 });
    return this.serpent(new THREE.Vector3(pos.x, pos.y, pos.z), '#a8ffb6', 8);
  }

  castSpark(pos, color = '#ffd28a') {
    this.burst(pos, color, 9, { speed: 2.5, size: 0.3, gravity: -1, ttl: 0.5, flash: 1.4 });
  }
}

function psts(pts) { return pts; }

/* ══════════════════════════════════════════ ARENA */
export function createArena(scene, variant = 'ring') {
  const group = new THREE.Group();
  scene.add(group);
  const rng = (() => { let s = 1234; return () => (s = s * 16807 % 2147483647) / 2147483647; })();
  scene.background = new THREE.Color('#080512');
  scene.fog = new THREE.FogExp2(variant === 'spire' ? '#160d22' : '#101022', 0.012);

  const hemi = new THREE.HemisphereLight('#9a8ad4', '#141018', 1.0);
  scene.add(hemi);
  const key = new THREE.SpotLight('#ffe0b8', 900, 120, 0.8, 0.6, 1.5);
  key.position.set(0, 38, 12);
  key.target.position.set(0, 0, -4);
  scene.add(key, key.target);
  const rim = new THREE.DirectionalLight('#7d6bff', 1.6);
  rim.position.set(-20, 18, -30); scene.add(rim);
  const amb = new THREE.AmbientLight('#3a2c5e', 0.5); scene.add(amb);

  // sky dome (void)
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    vertexShader: `varying vec3 vDir; void main(){ vDir=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `varying vec3 vDir;
      void main(){ float h=vDir.y; vec3 col=mix(vec3(0.06,0.045,0.12), vec3(0.015,0.012,0.05), smoothstep(-0.3,0.7,h));
        float neb = sin(vDir.x*3.0+vDir.y*2.0)*sin(vDir.z*4.0-vDir.x*2.0);
        col += vec3(0.20,0.10,0.30)*smoothstep(0.2,1.0,neb)*0.25;
        gl_FragColor=vec4(col,1.0); }`
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(220, 24, 18), skyMat);
  group.add(sky);
  // stars
  const starGeo = new THREE.BufferGeometry();
  const sp = new Float32Array(500 * 3);
  for (let i = 0; i < 500; i++) {
    const a = rng() * Math.PI * 2, h = Math.acos(1 - rng() * 1.2);
    sp[i * 3] = Math.sin(h) * Math.cos(a) * 190;
    sp[i * 3 + 1] = Math.cos(h) * 190 + 20;
    sp[i * 3 + 2] = Math.sin(h) * Math.sin(a) * 190;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  group.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: '#dfe6ff', size: 0.9, transparent: true, opacity: 0.8, fog: false, depthWrite: false })));

  // floating audience tiers
  for (let ringI = 0; ringI < 3; ringI++) {
    const r = 32 + ringI * 7;
    const tier = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 1.2, 64, 1, true), new THREE.MeshStandardMaterial({ color: '#1e1826', roughness: 0.95, side: THREE.DoubleSide, transparent: true, opacity: 0.55 }));
    tier.position.y = 6 - ringI * 2.5; group.add(tier);
  }
  // ghostly audience points
  const audGeo = new THREE.BufferGeometry();
  const audPos = new Float32Array(380 * 3);
  for (let i = 0; i < 380; i++) {
    const a = rng() * Math.PI * 2, r = 30 + rng() * 18;
    audPos[i * 3] = Math.cos(a) * r;
    audPos[i * 3 + 1] = 4 + rng() * 5 + (r - 30) * 0.12;
    audPos[i * 3 + 2] = Math.sin(a) * r;
  }
  audGeo.setAttribute('position', new THREE.BufferAttribute(audPos, 3));
  const audience = new THREE.Points(audGeo, new THREE.PointsMaterial({ map: getGlowTexture(), color: '#c8b6ff', size: 0.4, transparent: true, opacity: 0.28, depthWrite: false, blending: THREE.AdditiveBlending }));
  group.add(audience);

  // platform
  const platformMat = new THREE.MeshStandardMaterial({ color: '#484654', roughness: 0.85, metalness: 0.1 });
  const base = new THREE.Mesh(new THREE.CylinderGeometry(21, 23.5, 2.2, 64), platformMat);
  base.position.y = -1.2; base.receiveShadow = true; group.add(base);
  const topMat = new THREE.MeshStandardMaterial({ color: '#5a5866', roughness: 0.8, metalness: 0.12 });
  const top = new THREE.Mesh(new THREE.CylinderGeometry(20.8, 20.8, 0.25, 64), topMat);
  top.position.y = 0.02; top.receiveShadow = true; group.add(top);
  const runesTex = runeRingTexture(variant === 'spire' ? '#d65cff' : '#9fe7ff');
  const runes = new THREE.Mesh(new THREE.CircleGeometry(20.4, 64), new THREE.MeshBasicMaterial({ map: runesTex, transparent: true, opacity: 0.45, depthWrite: false, side: THREE.DoubleSide }));
  runes.rotation.x = -Math.PI / 2; runes.position.y = 0.15; group.add(runes);
  const runeGlow = new THREE.Mesh(new THREE.CircleGeometry(20, 64), new THREE.MeshBasicMaterial({ color: variant === 'spire' ? '#7c3bb8' : '#2b5f88', transparent: true, opacity: 0.09, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
  runeGlow.rotation.x = -Math.PI / 2; runeGlow.position.y = 0.18; group.add(runeGlow);

  // pillars
  const pillarMat = new THREE.MeshStandardMaterial({ color: '#3e3b4a', roughness: 0.9 });
  const crystalColors = variant === 'spire' ? ['#d65cff', '#9b4dff'] : variant === 'ruins' ? ['#8fe7ff', '#5fd8c8'] : variant === 'grove' ? ['#9fe7a0', '#7de6d0'] : ['#9fe7ff', '#c9a2ff'];
  const pillars = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const px = Math.cos(a) * 20, pz = Math.sin(a) * 20;
    const h = 6.5 + (i % 2) * 1.5;
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 1.0, h, 8), pillarMat);
    p.position.set(px, h / 2, pz); p.rotation.y = -a; p.castShadow = true; group.add(p);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.5, 2.2), pillarMat);
    cap.position.set(px, h + 0.25, pz); cap.rotation.y = -a; group.add(cap);
    const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 0), new THREE.MeshStandardMaterial({ color: crystalColors[i % 2], emissive: crystalColors[i % 2], emissiveIntensity: 1.6, roughness: 0.1 }));
    crystal.position.set(px, h + 1.2, pz); crystal.scale.y = 1.8; group.add(crystal);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: getGlowTexture(), color: crystalColors[i % 2], transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
    glow.scale.setScalar(4.5); glow.position.set(px, h + 1.2, pz); group.add(glow);
    pillars.push({ crystal, glow, a });
  }
  // two big braziers
  const braziers = [];
  for (const sx of [-1, 1]) {
    const bx = sx * 13, bz = 12;
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 0.6, 0.8, 10), new THREE.MeshStandardMaterial({ color: '#2d2833', metalness: 0.6, roughness: 0.4 }));
    bowl.position.set(bx, 2.2, bz); group.add(bowl);
    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.4, 2.2, 8), pillarMat);
    stand.position.set(bx, 1.1, bz); group.add(stand);
    const flame = new THREE.Sprite(new THREE.SpriteMaterial({ map: getGlowTexture(), color: '#ffb05a', transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }));
    flame.scale.set(3.2, 3.8, 1); flame.position.set(bx, 3.3, bz); group.add(flame);
    const fl = new THREE.PointLight('#ff9a4d', 3, 24, 2); fl.position.set(bx, 3.4, bz); group.add(fl);
    braziers.push({ flame, fl, phase: Math.random() * 6 });
  }

  // barrier dome
  const domeMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    uniforms: { time: { value: 0 }, color: { value: new THREE.Color(variant === 'spire' ? '#c46bff' : '#8fd8ff') }, opacity: { value: 0.24 } },
    vertexShader: `varying vec3 vN; varying vec3 vV; varying vec2 vUv; void main(){ vec4 wp=modelMatrix*vec4(position,1.0); vN=normalize(mat3(modelMatrix)*normal); vV=normalize(cameraPosition-wp.xyz); vUv=uv; gl_Position=projectionMatrix*viewMatrix*wp; }`,
    fragmentShader: `varying vec3 vN; varying vec3 vV; varying vec2 vUv; uniform float time; uniform vec3 color; uniform float opacity;
      void main(){ float f=pow(1.0-abs(dot(vN,vV)),2.5); float hex=sin(vUv.x*90.0)*sin(vUv.y*60.0+time); float a=f*opacity + smoothstep(0.965,0.98,abs(sin(vUv.x*80.0)))*0.02;
        gl_FragColor=vec4(color + vec3(0.1)*hex, a); }`
  });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(29, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2), domeMat);
  group.add(dome);

  // variant decorations
  if (variant === 'grove') {
    for (let i = 0; i < 18; i++) {
      const a = rng() * Math.PI * 2, r = 26 + rng() * 12;
      const tree = new THREE.Group();
      tree.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.7, 6 + rng() * 6, 5), new THREE.MeshStandardMaterial({ color: '#332b28' }));
      trunk.position.y = 3.5; tree.add(trunk);
      for (let k = 0; k < 3; k++) {
        const leaf = new THREE.Mesh(new THREE.IcosahedronGeometry(2 + rng() * 2, 0), new THREE.MeshStandardMaterial({ color: '#24402c', roughness: 1 }));
        leaf.position.set((rng() - 0.5) * 3, 7 + k * 1.5, (rng() - 0.5) * 3); tree.add(leaf);
      }
      group.add(tree);
    }
  }
  if (variant === 'ruins') {
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2, r = 26 + rng() * 4;
      const h = 3 + rng() * 9;
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, h, 8), new THREE.MeshStandardMaterial({ color: '#3f4a4d', roughness: 0.95 }));
      col.position.set(Math.cos(a) * r, h / 2 - 2, Math.sin(a) * r); col.rotation.z = (rng() - 0.5) * 0.15; group.add(col);
    }
    // water pools floating
    for (let i = 0; i < 3; i++) {
      const pool = new THREE.Mesh(new THREE.CircleGeometry(3, 18), new THREE.MeshStandardMaterial({ color: '#1d5560', metalness: 0.6, roughness: 0.1, transparent: true, opacity: 0.55 }));
      pool.rotation.x = -Math.PI / 2; pool.position.set((rng() - 0.5) * 20, 0.2, 24 + rng() * 6); group.add(pool);
    }
  }
  if (variant === 'spire') {
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2 + 0.4;
      const h = 24 + rng() * 30;
      const spike = new THREE.Mesh(new THREE.ConeGeometry(2.5 + rng() * 2.5, h, 5), new THREE.MeshStandardMaterial({ color: '#1c1428', roughness: 0.9 }));
      spike.position.set(Math.cos(a) * (38 + rng() * 10), h / 2 - 6, Math.sin(a) * (38 + rng() * 10)); group.add(spike);
    }
    for (let i = 0; i < 12; i++) {
      const a = rng() * Math.PI * 2, r = 24 + rng() * 12;
      const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.7 + rng() * 1.5, 0), new THREE.MeshStandardMaterial({ color: '#2a1f3d', emissive: '#5b2e88', emissiveIntensity: 0.4, roughness: 0.5 }));
      m.position.set(Math.cos(a) * r, 5 + rng() * 14, Math.sin(a) * r); group.add(m);
    }
  }
  if (variant === 'training') {
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const dummy = new THREE.Group();
      dummy.position.set(Math.cos(a) * 26, 0, Math.sin(a) * 26);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 3, 6), new THREE.MeshStandardMaterial({ color: '#4a3528' }));
      post.position.y = 1.5; dummy.add(post);
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.75, 1.6, 8), new THREE.MeshStandardMaterial({ color: '#8a7a62' }));
      body.position.y = 2.2; dummy.add(body);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.45, 10, 8), new THREE.MeshStandardMaterial({ color: '#b6a687' }));
      head.position.y = 3.4; dummy.add(head);
      group.add(dummy);
    }
  }

  // floating debris
  const debris = [];
  for (let i = 0; i < 16; i++) {
    const a = rng() * Math.PI * 2, r = 26 + rng() * 16;
    const d = new THREE.Mesh(new THREE.DodecahedronGeometry(0.3 + rng() * 1.3, 0), pillarMat);
    d.position.set(Math.cos(a) * r, 2 + rng() * 22, Math.sin(a) * r);
    group.add(d); debris.push({ m: d, base: d.position.y, phase: rng() * 6.28, spin: (rng() - 0.5) * 0.4 });
  }

  const arena = {
    group, scene, variant,
    playerSpawn: new THREE.Vector3(0, 0, 11),
    enemySpawn: new THREE.Vector3(0, 0, -11),
    bounds: 19.3,
    center: new THREE.Vector3(0, 0, 0),
    update(dt, t) {
      domeMat.uniforms.time.value = t;
      runes.rotation.z = t * 0.035;
      pillars.forEach((p, i) => {
        p.crystal.rotation.y += dt * 0.4;
        p.glow.material.opacity = 0.35 + Math.sin(t * 1.3 + i) * 0.12;
        p.crystal.position.y = 8.2 + Math.sin(t * 1.1 + i) * 0.18 + (i % 2) * 1.5;
        p.glow.position.y = p.crystal.position.y;
      });
      braziers.forEach((b, i) => { b.flame.scale.set(2.8 + Math.sin(t * 9 + i) * 0.4, 3.6 + Math.sin(t * 12 + i) * 0.5, 1); b.fl.material; b.fl.intensity = 2.6 + Math.sin(t * 8 + i) * 0.5; });
      audience.rotation.y = Math.sin(t * 0.04) * 0.02;
      debris.forEach(d => { d.m.position.y = d.base + Math.sin(t * 0.5 + d.phase) * 0.5; d.m.rotation.y += dt * d.spin; });
      domeMat.uniforms.opacity.value = (variant === 'spire' ? 0.2 : 0.22) + Math.sin(t * (variant === 'spire' ? 1.4 : 0.9)) * 0.045;
    },
    clamp(pos, radius = 0.5) {
      const r = Math.hypot(pos.x, pos.z);
      if (r > 19.3) { pos.x *= 19.3 / r; pos.z *= 19.3 / r; }
      pos.y = 0;
    },
    dispose() {
      scene.remove(group);
      scene.remove(hemi); scene.remove(key); scene.remove(key.target); scene.remove(rim); scene.remove(amb);
    }
  };
  return arena;
}
