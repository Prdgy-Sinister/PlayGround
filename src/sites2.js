import * as THREE from 'three';
import { std, addBox, addCyl, addCone, addGlow, addPointLight, textPlane, canvasTexture, heightAt, mulberry32, TAU, pick, addTreeCluster, runeRingTexture } from './worldkit.js';

function portalVisual(color = '#8fe7ff', radius = 2.4, opacity = 0.9) {
  const group = new THREE.Group();
  const ringMat = new THREE.MeshStandardMaterial({ color: '#2b2733', roughness: 0.7 });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(radius + 0.25, 0.22, 8, 36), ringMat);
  group.add(ring);
  const innerRing = new THREE.Mesh(new THREE.TorusGeometry(radius - 0.12, 0.07, 6, 36), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending }));
  group.add(innerRing);
  const uniforms = { time: { value: 0 }, color: { value: new THREE.Color(color) }, opacity: { value: opacity } };
  const mat = new THREE.ShaderMaterial({
    uniforms, transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
      varying vec2 vUv; uniform float time; uniform vec3 color; uniform float opacity;
      void main(){
        vec2 p = vUv - 0.5; float r = length(p) * 2.0; float a = atan(p.y, p.x);
        float swirl = sin(a * 6.0 + r * 15.0 - time * 2.2) * 0.5 + 0.5;
        float swirl2 = sin(a * -3.0 + r * 9.0 + time * 1.3) * 0.5 + 0.5;
        float edge = smoothstep(1.0, 0.72, r) * smoothstep(0.0, 0.12, r);
        float alpha = edge * (0.28 + 0.72 * swirl * (0.5 + swirl2 * 0.5)) * opacity;
        vec3 col = mix(color * 0.35, color * 1.5, swirl) + vec3(0.8,0.95,1.0) * pow(swirl * swirl2, 9.0) * 0.7;
        gl_FragColor = vec4(col, alpha);
      }`
  });
  const disc = new THREE.Mesh(new THREE.CircleGeometry(radius, 40), mat);
  group.add(disc);
  const glow = addGlow(group, color, radius * 5, 0, 0, 0, 0.35);
  const light = addPointLight(group, color, 2.2, radius * 7, 0, 0, 0.4);
  return { group, uniforms, disc, glow, light, ring, innerRing };
}

function emberFlame(group, x, y, z, color = '#ffb35c', scale = 1) {
  const g = new THREE.Group(); g.position.set(x, y, z); group.add(g);
  addGlow(g, color, 1.6 * scale, 0, 0, 0, 0.7);
  addGlow(g, color, 3.4 * scale, 0, 0.2, 0, 0.22);
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.16 * scale, 8, 6), new THREE.MeshBasicMaterial({ color: '#fff2cc' }));
  core.position.y = 0.1 * scale; g.add(core);
  const light = addPointLight(g, color, 1.5, 12 * scale, 0, 0.4, 0);
  return { g, light };
}

/* ══════════════════════════════════════════ SUNKEN RUINS */
export function buildRuins(ctx) {
  const { group, colliders, anims } = ctx;
  const random = mulberry32(4411);
  const cx = -78, cz = 82;
  const baseY = heightAt(cx, cz);
  const g = new THREE.Group(); g.position.set(cx, baseY, cz); group.add(g);
  const stoneMat = std('#4b5254', { roughness: 0.95 });
  const stoneDark = std('#383e42', { roughness: 0.95 });

  addCyl(g, { rt: 13.5, rb: 14.5, h: 1.3, seg: 32, y: 0.15, mat: stoneMat });
  const floorTex = canvasTexture(512, 512, (c, w, h) => {
    c.fillStyle = '#3d4345'; c.fillRect(0, 0, w, h);
    for (let i = 0; i < 900; i++) { c.fillStyle = `rgba(${40 + Math.random() * 40},${48 + Math.random() * 40},${50 + Math.random() * 36},.5)`; c.fillRect(Math.random() * w, Math.random() * h, 3 + Math.random() * 10, 2 + Math.random() * 6); }
    c.strokeStyle = 'rgba(120,200,220,.25)'; c.lineWidth = 2;
    for (let i = 0; i < 5; i++) { c.beginPath(); c.arc(256, 256, 40 + i * 42, 0, TAU); c.stroke(); }
  });
  const floor = new THREE.Mesh(new THREE.CircleGeometry(13.2, 48), new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.92 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = 0.82; floor.receiveShadow = true; g.add(floor);

  // pools
  for (const [px, pz, r] of [[-5, 4, 2.6], [6, -2, 2.0], [2, 7, 1.6]]) {
    const pool = new THREE.Mesh(new THREE.CircleGeometry(r, 24), new THREE.MeshPhysicalMaterial({ color: '#1d4b55', emissive: '#0b2e36', emissiveIntensity: 0.5, roughness: 0.05, metalness: 0.4, transparent: true, opacity: 0.92 }));
    pool.rotation.x = -Math.PI / 2; pool.position.set(px, 0.93, pz); g.add(pool);
  }

  // broken columns
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * TAU + 0.2;
    const r = 10.4;
    const h = 2 + random() * 6;
    const col = addCyl(g, { rt: 0.52, rb: 0.68, h, seg: 10, x: Math.cos(a) * r, y: h / 2 + 0.8, z: Math.sin(a) * r, color: '#4d5456', mat: stoneMat });
    col.rotation.z = (random() - 0.5) * 0.13;
    col.rotation.x = (random() - 0.5) * 0.1;
    if (h > 4) addBox(g, { w: 1.5, h: 0.35, d: 1.5, x: Math.cos(a) * r, y: h + 0.9, z: Math.sin(a) * r, mat: stoneDark });
    if (i % 2 === 0) {
      const rune = textPlane(pick(['ᚦ', 'ᛉ', 'ᛟ', 'ᚱ', 'ᛏ', 'ᛒ']), { color: '#8fe7ff', bg: 'transparent', border: 'transparent', width: 128, height: 128, font: '90px Georgia, serif' });
      const rr = 2.5;
      rune.scale.set(0.7, 0.7, 1);
      rune.position.set(Math.cos(a) * r - Math.cos(a) * 0.6, 2.4, Math.sin(a) * r - Math.sin(a) * 0.6);
      rune.rotation.y = -a + Math.PI / 2;
      g.add(rune);
    }
  }

  // fall arches
  for (const [ax, az, ry, h] of [[-4.5, -7, 0.3, 6.5], [8, 6, -0.8, 5.2], [-10, 3, 1.2, 4.6]]) {
    const arch = new THREE.Group(); arch.position.set(ax, 0.8, az); arch.rotation.y = ry; g.add(arch);
    for (const sx of [-1.6, 1.6]) addCyl(arch, { r: 0.4, h, seg: 8, x: sx, y: h / 2, z: 0, color: '#4d5456' });
    addBox(arch, { w: 3.9, h: 0.65, d: 0.9, y: h, mat: stoneDark });
    arch.rotation.z = (random() - 0.5) * 0.06;
  }

  // central warden seal / portal
  const seal = new THREE.Group(); seal.position.set(0, 1.5, 0); g.add(seal);
  const portal = portalVisual('#8fe7ff', 2.3, 0.75);
  portal.group.position.set(0, 2.8, 0); seal.add(portal.group);
  // arch frame around portal
  for (const sx of [-2.9, 2.9]) addCyl(seal, { r: 0.45, h: 5.4, seg: 8, x: sx, y: 2.7, z: 0, color: '#434b4d' });
  addBox(seal, { w: 6.3, h: 0.7, d: 1.0, y: 5.5, mat: stoneDark });
  addBox(seal, { w: 0.8, h: 2.6, d: 0.3, y: 6.6, mat: stoneDark });
  const sealRing = new THREE.Mesh(new THREE.RingGeometry(3.7, 4.2, 40), new THREE.MeshBasicMaterial({ map: runeRingTexture('#8fe7ff'), color: '#8fe7ff', transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false }));
  sealRing.rotation.x = -Math.PI / 2; sealRing.position.y = -0.55; seal.add(sealRing);
  addGlow(seal, '#8fe7ff', 11, 0, 0.2, 0, 0.15);
  addPointLight(seal, '#8fe7ff', 3.2, 30, 0, 3.4, 1);
  colliders.push({ x: cx, z: cz, r: 2.2 });

  // floating stones
  const floats = [];
  for (let i = 0; i < 8; i++) {
    const a = random() * TAU, r = 5 + random() * 8;
    const st = new THREE.Mesh(new THREE.DodecahedronGeometry(0.3 + random() * 0.7, 0), stoneMat);
    st.position.set(Math.cos(a) * r, 2 + random() * 5, Math.sin(a) * r); g.add(st);
    floats.push({ m: st, base: st.position.y, phase: random() * TAU, spin: (random() - 0.5) * 0.5 });
  }
  // rubble
  for (let i = 0; i < 26; i++) {
    const a = random() * TAU, r = 3 + random() * 12;
    const rb = new THREE.Mesh(new THREE.DodecahedronGeometry(0.15 + random() * 0.5, 0), stoneMat);
    rb.position.set(Math.cos(a) * r, 0.95, Math.sin(a) * r); rb.rotation.set(random() * 3, random() * 3, random() * 3); g.add(rb);
  }
  // broken statue
  const statue = new THREE.Group(); statue.position.set(-8, 0.9, -4); g.add(statue);
  addBox(statue, { w: 1.1, h: 2.4, d: 0.8, y: 1.2, mat: stoneMat, rz: 0.18 });
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.46, 10, 8), stoneMat);
  head.position.set(0.5, 2.6, 0); statue.add(head);
  const halo = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.06, 6, 24, Math.PI), new THREE.MeshBasicMaterial({ color: '#8fe7ff', transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending }));
  halo.position.set(0.5, 2.8, -0.2); halo.rotation.z = 0.2; statue.add(halo);

  anims.push((dt, t) => {
    portal.uniforms.time.value = t;
    portal.innerRing.rotation.z = t * 0.4;
    sealRing.rotation.z = t * 0.06;
    floats.forEach((f, i) => { f.m.position.y = f.base + Math.sin(t * 0.7 + f.phase) * 0.3; f.m.rotation.y += dt * f.spin; });
  });
}

/* ══════════════════════════════════════════ GLIMMER CAVERNS */
export function buildCaverns(ctx) {
  const { group, colliders, anims } = ctx;
  const random = mulberry32(6311);
  const cx = 104, cz = 66;
  const baseY = heightAt(cx, cz);
  const g = new THREE.Group(); g.position.set(cx, baseY, cz); group.add(g);
  const rockMat = std('#3b3748', { roughness: 0.98 });
  const rockMat2 = std('#302d3e', { roughness: 0.98 });

  // mound
  const mound = new THREE.Mesh(new THREE.DodecahedronGeometry(12, 1), rockMat);
  mound.scale.set(1.35, 0.9, 1.1); mound.position.y = 3; mound.rotation.y = 0.4; g.add(mound);
  for (let i = 0; i < 8; i++) {
    const a = random() * TAU, r = 7 + random() * 6;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const h = 3 + random() * 9;
    const peak = new THREE.Mesh(new THREE.ConeGeometry(1.4 + random() * 2.2, h, 5), random() > 0.5 ? rockMat : rockMat2);
    peak.position.set(x, h / 2 + 2, z); peak.rotation.y = random() * 3; peak.rotation.z = (random() - 0.5) * 0.2; g.add(peak);
  }
  // entrance facing south-west (towards village)
  const mouth = new THREE.Group(); mouth.position.set(-7.6, 4.2, -6.4); mouth.rotation.y = -2.36; g.add(mouth);
  const dark = new THREE.Mesh(new THREE.CircleGeometry(2.6, 26), new THREE.MeshBasicMaterial({ color: '#07050f' }));
  dark.scale.y = 1.3; mouth.add(dark);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(2.75, 0.4, 7, 26), rockMat2);
  rim.scale.y = 1.3; mouth.add(rim);
  addGlow(mouth, '#8a5bff', 6, 0, 0, -0.4, 0.3);
  addPointLight(mouth, '#7d55ff', 2.6, 22, 0, 0.4, -0.4);
  // steps into the dark
  for (let i = 0; i < 5; i++) addBox(g, { w: 3.6 - i * 0.25, h: 0.25, d: 0.9, x: -8.2 - i * 0.15, y: 0.1 + i * 0.28, z: -5.8 + i * 0.4, mat: rockMat2, shadow: false });

  // crystals
  const crystalMats = [
    new THREE.MeshStandardMaterial({ color: '#6b4dff', emissive: '#5b34e6', emissiveIntensity: 1.1, roughness: 0.15, metalness: 0.2 }),
    new THREE.MeshStandardMaterial({ color: '#65e6ff', emissive: '#24c5e8', emissiveIntensity: 1.0, roughness: 0.1, metalness: 0.2 }),
    new THREE.MeshStandardMaterial({ color: '#c56bff', emissive: '#9b32e0', emissiveIntensity: 0.9, roughness: 0.2 })
  ];
  const crystals = [];
  for (let i = 0; i < 46; i++) {
    const a = random() * TAU, r = 3 + random() * 11;
    const x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r;
    if (Math.hypot(x - (cx - 7), z - (cz - 7)) < 2.5) continue;
    const y = heightAt(x, z) + 0.1;
    const s = 0.3 + random() * 1.5;
    const cr = new THREE.Mesh(new THREE.OctahedronGeometry(s, 0), pick(crystalMats));
    cr.position.set(x, y + s * 1.2, z); cr.rotation.set((random() - 0.5) * 0.5, random() * 3, (random() - 0.5) * 0.5);
    cr.scale.y = 1.4 + random() * 1.8; g.add(cr);
    crystals.push(cr);
    if (s > 1.1) addGlow(group, '#9d7bff', s * 4, x, y + s * 1.6, z, 0.18);
  }
  // giant crystal cluster
  for (let i = 0; i < 5; i++) {
    const cr = new THREE.Mesh(new THREE.ConeGeometry(0.8 + i * 0.15, 4 + i * 1.2, 5), crystalMats[i % 3]);
    cr.position.set(cx + 7 + i * 0.9, heightAt(cx + 7, cz - 2) + 2 + i * 0.6, cz - 2 - i * 0.5);
    cr.rotation.z = -0.15 - i * 0.08; g.add(cr);
  }
  addGlow(g, '#b58cff', 16, 8, 6, -2, 0.16);
  addPointLight(g, '#9d7bff', 2.4, 30, 7, 5, -2);
  addPointLight(g, '#5fe0ff', 1.6, 20, -7, 3, 3);
  colliders.push({ x: cx, z: cz, r: 10.5 });
  // warning sign post
  const sign = textPlane('GLIMMER CAVERNS', { font: '700 40px Cinzel, Georgia, serif' });
  sign.scale.set(3.4, 1.05, 1); sign.position.set(cx - 11, heightAt(cx - 11, cz - 10) + 2.4, cz - 10); sign.rotation.y = -0.9; group.add(sign);
  anims.push((dt, t) => {
    crystals.forEach((c, i) => { c.material.emissiveIntensity = 0.8 + Math.sin(t * 1.4 + i) * 0.2; });
  });
}

/* ══════════════════════════════════════════ DRAGON'S CRAG */
export function buildCrag(ctx) {
  const { group, colliders, anims } = ctx;
  const random = mulberry32(9302);
  const cx = 112, cz = -88;
  const baseY = heightAt(cx, cz);
  const g = new THREE.Group(); g.position.set(cx, baseY, cz); group.add(g);
  const rock = std('#4a4640', { roughness: 0.97 });
  const rockDark = std('#37342f', { roughness: 0.97 });
  // peaks
  for (let i = 0; i < 9; i++) {
    const a = random() * TAU, r = 3 + random() * 9;
    const h = 8 + random() * 20;
    const peak = new THREE.Mesh(new THREE.ConeGeometry(2 + random() * 3.5, h, 6), random() > 0.5 ? rock : rockDark);
    peak.position.set(Math.cos(a) * r, h / 2 - 1, Math.sin(a) * r);
    peak.rotation.y = random() * 3; peak.rotation.z = (random() - 0.5) * 0.1; g.add(peak);
  }
  // flat ritual ledge
  addCyl(g, { rt: 8, rb: 9, h: 0.8, seg: 20, y: 0.2, mat: std('#5a554c') });
  // dragon skeleton
  const skel = new THREE.Group(); skel.position.set(2, 0.8, 1); skel.rotation.y = 0.7; g.add(skel);
  const bone = std('#d8cfb4', { roughness: 0.8 });
  addCyl(skel, { rt: 0.18, rb: 0.28, h: 13, seg: 6, y: 0.3, z: 0, color: '#d8cfb4', mat: bone }).rotation.x = Math.PI / 2;
  for (let i = 0; i < 8; i++) {
    const rib = new THREE.Mesh(new THREE.TorusGeometry(1.7 - i * 0.08, 0.11, 5, 18, Math.PI), bone);
    rib.position.set(0, 1.8, 5.4 - i * 1.1);
    rib.rotation.z = Math.PI; rib.rotation.x = 0.12;
    skel.add(rib);
  }
  // skull
  const skull = new THREE.Group(); skull.position.set(0, 1.7, 6.7); skel.add(skull);
  addBox(skull, { w: 1.3, h: 0.85, d: 2.0, mat: bone });
  addCone(skull, { r: 0.55, h: 2.0, seg: 5, y: -0.05, z: 1.5, rx: Math.PI / 2, mat: bone });
  for (const sx of [-0.42, 0.42]) addGlow(skull, '#ff9a5a', 0.55, sx, 0.3, 0.7, 0.7);
  // horns
  for (const sx of [-0.65, 0.65]) {
    const horn = addCone(skull, { r: 0.14, h: 1.6, seg: 5, x: sx, y: 0.55, z: -0.4, mat: bone });
    horn.rotation.x = -0.8; horn.rotation.z = sx > 0 ? -0.3 : 0.3;
  }
  // ember crystals and cracks
  const emberMat = new THREE.MeshStandardMaterial({ color: '#ff8b45', emissive: '#ff5a1f', emissiveIntensity: 1.4, roughness: 0.2 });
  for (let i = 0; i < 18; i++) {
    const a = random() * TAU, r = 2 + random() * 7;
    const s = 0.25 + random() * 0.9;
    const cr = new THREE.Mesh(new THREE.OctahedronGeometry(s, 0), emberMat);
    cr.position.set(Math.cos(a) * r, 1 + s, Math.sin(a) * r); cr.scale.y = 1.5; g.add(cr);
    addGlow(g, '#ff8b45', s * 3, cr.position.x, cr.position.y, cr.position.z, 0.2);
  }
  const rift = new THREE.Mesh(new THREE.PlaneGeometry(12, 1.1), new THREE.MeshBasicMaterial({ map: canvasTexture(256, 64, (c, w, h) => {
    const gr = c.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, 'rgba(255,140,60,0)'); gr.addColorStop(0.5, 'rgba(255,150,70,.85)'); gr.addColorStop(1, 'rgba(255,80,20,0)');
    c.fillStyle = gr; c.fillRect(0, 0, w, h);
  }), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.65 }));
  rift.rotation.x = -Math.PI / 2; rift.position.set(-2, 0.72, -3); rift.rotation.z = 0.5; g.add(rift);
  addPointLight(g, '#ff7a3d', 2.4, 24, 0, 3, 2);
  addGlow(g, '#ff8b45', 13, 0, 3, 1, 0.1);
  // floating rocks
  const floats = [];
  for (let i = 0; i < 7; i++) {
    const a = random() * TAU, r = 6 + random() * 8;
    const m = new THREE.Mesh(new THREE.DodecahedronGeometry(0.5 + random() * 1.2, 0), rock);
    m.position.set(Math.cos(a) * r, 3 + random() * 7, Math.sin(a) * r); m.rotation.set(random() * 3, random() * 3, 0); g.add(m);
    floats.push({ m, base: m.position.y, phase: random() * TAU });
  }
  colliders.push({ x: cx, z: cz, r: 7.5 });
  anims.push((dt, t) => {
    floats.forEach(f => { f.m.position.y = f.base + Math.sin(t * 0.6 + f.phase) * 0.35; f.m.rotation.y += dt * 0.1; });
    emberMat.emissiveIntensity = 1.2 + Math.sin(t * 2.1) * 0.2;
  });
}

/* ══════════════════════════════════════════ VEILED SPIRE */
export function buildSpire(ctx) {
  const { group, colliders, anims } = ctx;
  const cx = 0, cz = -132;
  const baseY = heightAt(cx, cz);
  const g = new THREE.Group(); g.position.set(cx, baseY, cz); group.add(g);
  const dark = std('#1c1727', { roughness: 0.9, metalness: 0.15 });
  const dark2 = std('#251d33', { roughness: 0.85 });
  addCyl(g, { rt: 6.2, rb: 8.6, h: 16, seg: 10, y: 8, mat: dark });
  addCyl(g, { rt: 4.6, rb: 6.2, h: 18, seg: 9, y: 24, mat: dark2 });
  addCyl(g, { rt: 2.4, rb: 4.6, h: 20, seg: 8, y: 43, mat: dark });
  const spike = new THREE.Mesh(new THREE.ConeGeometry(2.8, 16, 8), dark2);
  spike.position.y = 61; g.add(spike);
  // rune bands
  const bands = [];
  for (let i = 0; i < 7; i++) {
    const y = 7 + i * 8.2;
    const r = i < 2 ? 8.4 - i * 0.4 : i < 4 ? 6.2 - (i - 2) * 0.55 : 4.4 - (i - 4) * 0.65;
    const band = new THREE.Mesh(new THREE.TorusGeometry(r, 0.09, 4, 44), new THREE.MeshBasicMaterial({ color: '#b06bff', transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending }));
    band.rotation.x = Math.PI / 2; band.position.y = y; g.add(band);
    bands.push(band);
    const bandGlow = addGlow(g, '#b06bff', 8, Math.cos(i) * r * 0.7, y, Math.sin(i) * r * 0.7, 0.12);
  }
  // buttresses
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * TAU;
    const b = addBox(g, { w: 1.8, h: 13, d: 1.4, x: Math.cos(a) * 7.4, y: 6.5, z: Math.sin(a) * 7.4, ry: -a, mat: dark2 });
    b.rotation.z = 0.12;
  }
  // base platform + portal
  addCyl(g, { rt: 14, rb: 15, h: 0.9, seg: 24, y: 0.2, mat: std('#2a2335') });
  const sealRing = new THREE.Mesh(new THREE.RingGeometry(8, 9.5, 48), new THREE.MeshBasicMaterial({ map: runeRingTexture('#d65cff'), color: '#d65cff', transparent: true, opacity: 0.4, side: THREE.DoubleSide, depthWrite: false }));
  sealRing.rotation.x = -Math.PI / 2; sealRing.position.y = 0.75; g.add(sealRing);
  const portal = portalVisual('#d65cff', 3.2, 0.9);
  portal.group.position.set(0, 4.6, 10.2); g.add(portal.group);
  addPointLight(g, '#b06bff', 4, 40, 0, 6, 8);
  addGlow(g, '#b06bff', 26, 0, 8, 0, 0.12);
  // floating shards
  const shards = [];
  for (let i = 0; i < 10; i++) {
    const a = Math.random() * TAU, r = 10 + Math.random() * 12;
    const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.5 + Math.random() * 1.4, 0), dark2);
    m.position.set(Math.cos(a) * r, 4 + Math.random() * 24, Math.sin(a) * r); m.rotation.set(Math.random() * 3, Math.random() * 3, 0); g.add(m);
    shards.push({ m, base: m.position.y, phase: Math.random() * TAU, spin: (Math.random() - 0.5) * 0.3 });
  }
  // dead trees at approach
  for (let i = 0; i < 5; i++) {
    const a = Math.random() * TAU;
    addCyl(g, { rt: 0.1, rb: 0.4, h: 5 + Math.random() * 5, seg: 5, x: Math.cos(a) * (18 + Math.random() * 6), y: 2.5, z: Math.sin(a) * (18 + Math.random() * 6), color: '#241d2b', mat: std('#241d2b') });
  }
  colliders.push({ x: cx, z: cz, r: 13 });
  anims.push((dt, t) => {
    portal.uniforms.time.value = t;
    sealRing.rotation.z = t * 0.05;
    bands.forEach((b, i) => { b.material.opacity = 0.35 + Math.sin(t * 1.2 + i) * 0.18; b.rotation.z = t * 0.03 * (i % 2 ? 1 : -1); });
    shards.forEach(s => { s.m.position.y = s.base + Math.sin(t * 0.5 + s.phase) * 0.6; s.m.rotation.y += dt * s.spin; });
  });
}

/* ══════════════════════════════════════════ DUELLING RING */
export function buildDuelRing(ctx) {
  const { group, colliders, anims } = ctx;
  const cx = -30, cz = 14;
  const baseY = heightAt(cx, cz);
  const g = new THREE.Group(); g.position.set(cx, baseY, cz); group.add(g);
  addCyl(g, { rt: 8.6, rb: 9.6, h: 0.7, seg: 32, y: 0.25, mat: std('#5a564e') });
  addCyl(g, { rt: 7.8, rb: 8.1, h: 0.25, seg: 32, y: 0.66, mat: std('#656159') });
  const runes = new THREE.Mesh(new THREE.CircleGeometry(7.7, 48), new THREE.MeshBasicMaterial({ map: runeRingTexture('#9fe7ff'), transparent: true, opacity: 0.5, depthWrite: false, side: THREE.DoubleSide }));
  runes.rotation.x = -Math.PI / 2; runes.position.y = 0.8; g.add(runes);
  const underGlow = addGlow(g, '#8fe7ff', 14, 0, 0.9, 0, 0.15);
  // pillars + flames
  const flames = [];
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * TAU + Math.PI / 4;
    const px = Math.cos(a) * 9.3, pz = Math.sin(a) * 9.3;
    addCyl(g, { r: 0.55, h: 3.2, seg: 8, x: px, y: 1.8, z: pz, mat: std('#59554d') });
    addBox(g, { w: 1.3, h: 0.35, d: 1.3, x: px, y: 3.4, z: pz, mat: std('#6a665d') });
    const f = emberFlame(g, px, 3.8, pz, '#8fe7ff', 1);
    flames.push(f);
    addGlow(g, '#9fe7ff', 2.6, px, 3.9, pz, 0.3);
  }
  // low ring wall segments
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU;
    const wall = addBox(g, { w: 3.1, h: 0.45, d: 0.5, x: Math.cos(a) * 10.2, y: 0.75, z: Math.sin(a) * 10.2, ry: -a, mat: std('#4d4a43') });
  }
  // benches
  for (const [bx, bz, ry] of [[-14, 22, 0.5], [16, 8, -1.2], [-13, 4, 1.1]]) {
    const bench = new THREE.Group(); bench.position.set(bx, heightAt(cx + bx, cz + bz), bz); bench.rotation.y = ry; g.add(bench);
    addBox(bench, { w: 3.2, h: 0.18, d: 0.7, y: 0.55, mat: std('#5a4030') });
    for (const sx of [-1.3, 1.3]) addBox(bench, { w: 0.18, h: 0.55, d: 0.6, x: sx, y: 0.27, mat: std('#3f2c21') });
  }
  // banner pole
  addCyl(g, { r: 0.08, h: 6, seg: 5, x: 11.5, y: 3, z: -6, color: '#3b3027' });
  const banner = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 3.4), new THREE.MeshStandardMaterial({ map: canvasTexture(256, 512, (c, w, h) => {
    c.fillStyle = '#3b2b5e'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#e9c988'; c.font = '700 180px Georgia, serif'; c.textAlign = 'center'; c.fillText('⚔', w / 2, 280);
    c.strokeStyle = '#e9c988'; c.lineWidth = 8; c.strokeRect(10, 10, w - 20, h - 20);
  }), side: THREE.DoubleSide, roughness: 0.9 }));
  banner.position.set(11.5, 4.1, -6); g.add(banner);
  // sign
  const sign = textPlane('THE DUELLING RING', { font: '700 40px Cinzel, Georgia, serif' });
  sign.scale.set(4.0, 1.0, 1); sign.position.set(-13, heightAt(cx - 13, cz + 10) + 2.8, 10); sign.rotation.y = 0.7; group.add(sign);
  anims.push((dt, t) => {
    runes.material.opacity = 0.35 + Math.sin(t * 1.6) * 0.12;
    underGlow.material.opacity = 0.1 + Math.sin(t * 1.3) * 0.05;
    flames.forEach((f, i) => { f.light.intensity = 1.25 + Math.sin(t * 7 + i) * 0.25; });
  });
}
