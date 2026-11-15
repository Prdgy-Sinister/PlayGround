import * as THREE from 'three';
import { WOODS, CORES, MATERIALS, ZONES } from './data.js';
import { createWizard, getGlowTexture } from './character.js';
import {
  heightAt, canvasTexture, std, addBox, addCyl, addCone, addGlow, addPointLight,
  textPlane, groundTexture, mulberry32, TAU, clamp, lerp, smooth, pick, addTreeCluster
} from './worldkit.js';
import { buildVillage, buildAcademy, buildForest, buildLake } from './sites.js';
import { buildRuins, buildCaverns, buildCrag, buildSpire, buildDuelRing } from './sites2.js';

const itemInfo = id => {
  const w = WOODS.find(x => x.id === id); if (w) return { kind: 'woods', kindLabel: 'Wood', name: w.name, color: w.light, rarity: w.rarity };
  const c = CORES.find(x => x.id === id); if (c) return { kind: 'cores', kindLabel: 'Core', name: c.name, color: c.glow, rarity: c.rarity };
  const m = MATERIALS.find(x => x.id === id); if (m) return { kind: 'materials', kindLabel: 'Material', name: m.name, color: m.color, rarity: m.rarity };
  return { kind: 'materials', kindLabel: 'Reagent', name: id, color: '#ffffff', rarity: 'common' };
};

const RARITY_COLOR = { common: '#aaa69a', uncommon: '#8fd18a', rare: '#6fb8ff', epic: '#c395ff', legendary: '#ffc96b' };

export function makeSky(scene, opts = {}) {
  const skyGroup = new THREE.Group();
  scene.add(skyGroup);
  const skyUniforms = { time: { value: 0 } };
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false, uniforms: skyUniforms,
    vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      varying vec3 vDir; uniform float time;
      void main(){
        float h = clamp(vDir.y, -1.0, 1.0);
        vec3 bottom = vec3(0.055, 0.04, 0.10);
        vec3 horizon = vec3(0.30, 0.16, 0.30);
        vec3 mid = vec3(0.115, 0.075, 0.21);
        vec3 top = vec3(0.025, 0.02, 0.075);
        vec3 col = mix(horizon, mid, smoothstep(0.0, 0.28, h));
        col = mix(col, top, smoothstep(0.25, 0.8, h));
        col = mix(bottom, col, smoothstep(-0.35, 0.01, h));
        // warm glow low on the north-west horizon
        vec3 sunDir = normalize(vec3(-0.55, 0.08, -0.83));
        float d = max(dot(vDir, sunDir), 0.0);
        float sun = pow(d, 10.0);
        col += vec3(1.0, 0.48, 0.24) * sun * 0.42;
        col += vec3(1.0, 0.72, 0.45) * pow(d, 60.0) * 0.55;
        // soft cloud bands
        float band = sin(vDir.x * 6.0 + vDir.z * 4.0 + vDir.y * 9.0 + time * 0.015);
        col += vec3(0.15, 0.09, 0.19) * smoothstep(0.5, 1.0, band) * smoothstep(0.4, 0.8, h) * 0.15;
        gl_FragColor = vec4(col, 1.0);
      }`
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(420, 32, 24), skyMat);
  skyGroup.add(sky);

  // stars
  const starGeo = new THREE.BufferGeometry();
  const starN = 700, sp = new Float32Array(starN * 3), sc = new Float32Array(starN * 3);
  const rng = mulberry32(12345);
  for (let i = 0; i < starN; i++) {
    const a = rng() * TAU, h = Math.acos(1 - rng() * 0.85);
    const r = 350;
    sp[i * 3] = Math.sin(h) * Math.cos(a) * r * (0.5 + rng() * 0.5);
    sp[i * 3 + 1] = Math.cos(h) * r * 0.9 + 30;
    sp[i * 3 + 2] = Math.sin(h) * Math.sin(a) * r;
    const tint = rng();
    sc[i * 3] = 0.7 + tint * 0.3; sc[i * 3 + 1] = 0.72 + tint * 0.22; sc[i * 3 + 2] = 1;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(sc, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 1.1, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false, fog: false, blending: THREE.AdditiveBlending, sizeAttenuation: true }));
  stars.frustumCulled = false;
  skyGroup.add(stars);

  // moon
  const moonGroup = new THREE.Group();
  moonGroup.position.set(-118, 96, -240);
  const moon = new THREE.Mesh(new THREE.SphereGeometry(15, 24, 18), new THREE.MeshBasicMaterial({ color: '#f4ecd8', fog: false }));
  moonGroup.add(moon);
  const moonGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: getGlowTexture(), color: '#cfd8ff', transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
  moonGlow.scale.set(90, 90, 1);
  moonGroup.add(moonGlow);
  const moonHalo = new THREE.Mesh(new THREE.RingGeometry(17, 30, 40), new THREE.MeshBasicMaterial({ color: '#c9d4ff', transparent: true, opacity: 0.06, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
  moonGroup.add(moonHalo);
  skyGroup.add(moonGroup);

  // aurora curtains
  const auroraGroup = new THREE.Group();
  const auroraMat = () => new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, fog: false,
    uniforms: { time: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
      varying vec2 vUv; uniform float time;
      void main(){
        float edge = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.55, vUv.y);
        float curtain = sin(vUv.x * 22.0 + time * 0.25) * 0.5 + 0.5;
        curtain *= sin(vUv.x * 9.0 - time * 0.16 + 1.7) * 0.35 + 0.65;
        float flow = sin(vUv.x * 4.0 + time * 0.1) * 0.5 + 0.5;
        vec3 col = mix(vec3(0.20,0.85,0.65), vec3(0.55,0.35,1.0), flow);
        col = mix(col, vec3(0.9,0.4,0.8), sin(vUv.x * 3.0 + 2.0) * 0.5 + 0.5);
        float alpha = edge * (0.10 + curtain * 0.30) * (0.5 + 0.5 * sin(vUv.y * 10.0 - time * 0.4));
        gl_FragColor = vec4(col, alpha);
      }`
  });
  const a1 = new THREE.Mesh(new THREE.PlaneGeometry(260, 52, 1, 1), auroraMat());
  a1.position.set(-30, 95, -260); a1.rotation.x = -0.18; auroraGroup.add(a1);
  const a2 = new THREE.Mesh(new THREE.PlaneGeometry(200, 38, 1, 1), auroraMat());
  a2.position.set(120, 110, -250); a2.rotation.set(-0.14, 0.5, 0.06); auroraGroup.add(a2);
  skyGroup.add(auroraGroup);

  // distant mountains
  const mountains = new THREE.Group();
  const mRng = mulberry32(880);
  const mountainMat = std('#1b1629', { roughness: 1 });
  for (let i = 0; i < 34; i++) {
    const a = (i / 34) * TAU + mRng() * 0.12;
    const r = 185 + mRng() * 55;
    const h = 22 + mRng() * 55;
    const m = new THREE.Mesh(new THREE.ConeGeometry(18 + mRng() * 22, h, 5), mountainMat);
    m.position.set(Math.cos(a) * r, h / 2 - 8, Math.sin(a) * r);
    m.rotation.y = mRng() * 3;
    mountains.add(m);
  }
  skyGroup.add(mountains);

  return {
    group: skyGroup,
    update(t) { skyUniforms.time.value = t; a1.material.uniforms.time.value = t; a2.material.uniforms.time.value = t; moonGroup.rotation.y = Math.sin(t * 0.02) * 0.02; stars.rotation.y = t * 0.003; }
  };
}

function makeWater() {
  const uniforms = { time: { value: 0 }, deep: { value: new THREE.Color('#0b2636') }, shallow: { value: new THREE.Color('#2c7a83') }, moon: { value: new THREE.Color('#cfe6ff') } };
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, uniforms,
    vertexShader: `varying vec2 vUv; varying vec3 vPos; void main(){ vUv=uv; vPos=(modelMatrix*vec4(position,1.0)).xyz; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
      varying vec2 vUv; varying vec3 vPos; uniform float time; uniform vec3 deep, shallow, moon;
      void main(){
        vec2 p = vUv - 0.5;
        float r = length(p) * 2.0;
        float wave = sin(p.x * 42.0 + time * 1.1) * sin(p.y * 36.0 - time * 0.8);
        float wave2 = sin((p.x + p.y) * 90.0 + time * 1.7) * 0.5;
        float ripple = wave * 0.5 + wave2 * 0.25;
        vec3 col = mix(deep, shallow, smoothstep(0.15, 0.95, r) * 0.55 + ripple * 0.08);
        float sparkle = pow(max(0.0, ripple), 12.0) * (1.0 - r) * 0.8;
        col += moon * sparkle;
        float shore = smoothstep(0.78, 1.0, r);
        col = mix(col, vec3(0.09,0.14,0.17), shore * 0.55);
        float alpha = 0.88 - shore * 0.15;
        gl_FragColor = vec4(col, alpha);
      }`
  });
  const mesh = new THREE.Mesh(new THREE.CircleGeometry(46, 64), mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(52, 0.05, 78);
  mesh.renderOrder = 2;
  return { mesh, uniforms };
}

function floatingIsland(x, y, z, scale, rng) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  const rockMat = std('#3a3348', { roughness: 1 });
  const base = new THREE.Mesh(new THREE.DodecahedronGeometry(5, 1), rockMat);
  base.scale.set(1.6, 2.1, 1.3);
  g.add(base);
  const top = new THREE.Mesh(new THREE.CylinderGeometry(7.4, 6.2, 0.9, 9), std('#3c5334', { roughness: 1 }));
  top.position.y = 4.6; g.add(top);
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(7.6, 7.5, 0.3, 9), std('#5b4d38'));
  rim.position.y = 4.1; g.add(rim);
  addTreeCluster(g, 0, 0, rng, { n: 3, spread: 4.5, scale: 0.8, conifer: true });
  addGlow(g, '#9fe7ff', 5, 0, 4.2, 0, 0.2);
  const fallTex = canvasTexture(64, 256, (c, w, h) => {
    const gr = c.createLinearGradient(0, 0, 0, h);
    gr.addColorStop(0, 'rgba(170,235,255,.55)'); gr.addColorStop(0.7, 'rgba(140,210,255,.2)'); gr.addColorStop(1, 'rgba(140,210,255,0)');
    c.fillStyle = gr; c.fillRect(0, 0, w, h);
    for (let i = 0; i < 20; i++) { c.fillStyle = `rgba(220,245,255,${0.1 + Math.random() * 0.3})`; c.fillRect(Math.random() * w, Math.random() * h, 1 + Math.random() * 2, 8 + Math.random() * 30); }
  });
  const fall = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 14), new THREE.MeshBasicMaterial({ map: fallTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.7, side: THREE.DoubleSide }));
  fall.position.set(2.4, -4, 4.2); fall.rotation.x = 0.1; g.add(fall);
  const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(1.1, 0), new THREE.MeshStandardMaterial({ color: '#8f7bff', emissive: '#6f4bff', emissiveIntensity: 1.1, roughness: 0.2 }));
  crystal.position.set(-3.2, 5.9, 1.5); crystal.scale.y = 2.2; g.add(crystal);
  g.scale.setScalar(scale);
  return { g, fall, baseY: y };
}

function createNodeVisual(itemId, kind) {
  const info = itemInfo(itemId);
  const g = new THREE.Group();
  const rarity = RARITY_COLOR[info.rarity] || '#e9c988';
  if (kind === 'woods') {
    addCyl(g, { rt: 0.38, rb: 0.55, h: 0.7, seg: 7, y: 0.35, mat: std('#4d3626', { roughness: 1 }) });
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * TAU + 0.4;
      const br = addCyl(g, { rt: 0.06, rb: 0.12, h: 1.8, seg: 5, x: Math.cos(a) * 0.28, y: 0.95, z: Math.sin(a) * 0.28, mat: std('#5b4130') });
      br.rotation.z = Math.cos(a) * 0.55; br.rotation.x = Math.sin(a) * 0.55;
      const leaf = new THREE.Mesh(new THREE.IcosahedronGeometry(0.28, 0), std(info.color, { emissive: info.color, emissiveIntensity: 0.25, roughness: 0.9 }));
      leaf.position.set(Math.cos(a) * 0.85, 1.6, Math.sin(a) * 0.85); g.add(leaf);
    }
    const cut = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.04, 7), new THREE.MeshStandardMaterial({ color: info.color, emissive: info.color, emissiveIntensity: 0.3 }));
    cut.position.y = 0.72; g.add(cut);
  } else if (kind === 'cores') {
    const nest = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.16, 6, 14), std('#4b3b2b'));
    nest.rotation.x = Math.PI / 2; nest.position.y = 0.2; g.add(nest);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * TAU;
      const twig = addCyl(g, { r: 0.03, h: 1.1, seg: 3, x: Math.cos(a) * 0.5, y: 0.18, z: Math.sin(a) * 0.5, mat: std('#5a4832') });
      twig.rotation.z = Math.cos(a) * 1.1; twig.rotation.x = Math.sin(a) * 1.1;
    }
    const feather = new THREE.Mesh(new THREE.ConeGeometry(0.18, 1.0, 5), new THREE.MeshStandardMaterial({ color: info.color, emissive: info.color, emissiveIntensity: 0.6, roughness: 0.4 }));
    feather.position.y = 0.85; feather.rotation.z = 0.3; g.add(feather);
  } else {
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * TAU;
      const h = 0.5 + Math.random() * 1.2;
      const cr = new THREE.Mesh(new THREE.OctahedronGeometry(0.22 + Math.random() * 0.16, 0), new THREE.MeshStandardMaterial({ color: info.color, emissive: info.color, emissiveIntensity: 0.9, roughness: 0.15, metalness: 0.2 }));
      cr.position.set(Math.cos(a) * 0.3, h * 0.6, Math.sin(a) * 0.3); cr.scale.y = 2; g.add(cr);
    }
    addCyl(g, { rt: 0.25, rb: 0.45, h: 0.25, seg: 6, y: 0.1, mat: std('#4a4550') });
  }
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.16, 7, 6, 1, true), new THREE.MeshBasicMaterial({ color: rarity, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
  beam.position.y = 3.8; g.add(beam);
  const halo = addGlow(g, info.color, 2.4, 0, 0.7, 0, 0.32);
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.65, 1.0, 26), new THREE.MeshBasicMaterial({ color: rarity, transparent: true, opacity: 0.25, side: THREE.DoubleSide, depthWrite: false }));
  ring.rotation.x = -Math.PI / 2; ring.position.y = 0.05; g.add(ring);
  return {g, beam, halo, ring, color: info.color};
}

export function createWorld(scene) {
  const rng = mulberry32(50505);
  const group = new THREE.Group();
  scene.add(group);
  const colliders = [];
  const anims = [];
  const ctx = { scene, group, colliders, anims, smokeSources: [] };

  scene.fog = new THREE.FogExp2('#2a2240', 0.0062);
  scene.background = new THREE.Color('#0b0716');

  // lights
  const hemi = new THREE.HemisphereLight('#9a8ad4', '#202422', 0.95);
  scene.add(hemi);
  const moonLight = new THREE.DirectionalLight('#ffd7ae', 2.1);
  moonLight.position.set(-70, 95, 40);
  moonLight.castShadow = true;
  moonLight.shadow.mapSize.set(2048, 2048);
  moonLight.shadow.camera.near = 10; moonLight.shadow.camera.far = 260;
  moonLight.shadow.camera.left = -75; moonLight.shadow.camera.right = 75;
  moonLight.shadow.camera.top = 75; moonLight.shadow.camera.bottom = -75;
  moonLight.shadow.bias = -0.0008;
  moonLight.shadow.normalBias = 0.03;
  scene.add(moonLight);
  scene.add(moonLight.target);
  moonLight.target.position.set(0, 0, 20);
  const fill = new THREE.DirectionalLight('#7a6bd8', 0.55);
  fill.position.set(70, 40, -80);
  scene.add(fill);
  const ambient = new THREE.AmbientLight('#4a3d68', 0.35);
  scene.add(ambient);

  const sky = makeSky(scene);
  const water = makeWater();
  group.add(water.mesh);

  // terrain
  const geo = new THREE.PlaneGeometry(300, 300, 128, 128);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i);
    pos.setY(i, heightAt(x, z));
  }
  geo.computeVertexNormals();
  const ground = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: groundTexture(), roughness: 0.98, metalness: 0 }));
  ground.receiveShadow = true;
  group.add(ground);

  // underwater floor tint
  const deep = new THREE.Mesh(new THREE.CircleGeometry(45, 32), new THREE.MeshBasicMaterial({ color: '#12232c', transparent: true, opacity: 0.75 }));
  deep.rotation.x = -Math.PI / 2; deep.position.set(52, -4.5, 78); group.add(deep);
  const foam = new THREE.Mesh(new THREE.RingGeometry(45.2, 47.5, 64), new THREE.MeshBasicMaterial({ color: '#b9e6e8', transparent: true, opacity: 0.07, side: THREE.DoubleSide, depthWrite: false }));
  foam.rotation.x = -Math.PI / 2; foam.position.set(52, 0.12, 78); group.add(foam);

  // tree instancing
  const treeRng = mulberry32(4242);
  const treePositions = [];
  const zonesForTrees = [
    { x: 52, z: -36, r: 48, density: 0.95 }, { x: -64, z: -44, r: 46, density: 0.35 },
    { x: 0, z: 46, r: 40, density: 0.25 }, { x: -78, z: 82, r: 42, density: 0.3 },
    { x: 112, z: -88, r: 44, density: 0.35 }, { x: 104, z: 66, r: 36, density: 0.2 },
    { x: 0, z: -132, r: 40, density: 0.25 }
  ];
  for (let i = 0; i < 420; i++) {
    const zone = zonesForTrees[Math.floor(treeRng() * zonesForTrees.length)];
    const a = treeRng() * TAU, r = Math.sqrt(treeRng()) * zone.r;
    const x = zone.x + Math.cos(a) * r, z = zone.z + Math.sin(a) * r;
    if (Math.hypot(x - 52, z - 78) < 40 && treeRng() > 0.25) continue;
    if (Math.hypot(x - 0, z - 46) < 16) continue;
    if (Math.hypot(x + 64, z + 44) < 18) continue;
    if (Math.hypot(x - 52, z + 36) < 10) continue;
    if (treeRng() > zone.density) continue;
    if (heightAt(x, z) < -0.8) continue;
    treePositions.push({ x, z, s: 0.65 + treeRng() * 0.9, rot: treeRng() * TAU, conifer: treeRng() > 0.52, tint: treeRng() });
  }
  const trunkGeo = new THREE.CylinderGeometry(0.16, 0.3, 4.2, 5);
  const trunkMat = std('#4a3428', { roughness: 1 });
  const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, treePositions.length);
  const leafGeo = new THREE.IcosahedronGeometry(1.65, 0);
  const leafMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 1, flatShading: true, vertexColors: false });
  const leaves = new THREE.InstancedMesh(leafGeo, leafMat, treePositions.length * 2);
  const coneGeo = new THREE.ConeGeometry(1.55, 3.4, 7);
  const cones = new THREE.InstancedMesh(coneGeo, leafMat, treePositions.length);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), pv = new THREE.Vector3();
  const dummy = new THREE.Object3D();
  const leafColors = ['#2b4429', '#33502f', '#3b5a34', '#263d28', '#44603a', '#314b33'];
  let li = 0, ci = 0;
  treePositions.forEach((t, i) => {
    const y = heightAt(t.x, t.z);
    dummy.position.set(t.x, y + 2.1 * t.s, t.z);
    dummy.rotation.set(0, t.rot, 0);
    dummy.scale.setScalar(t.s);
    dummy.updateMatrix();
    trunks.setMatrixAt(i, dummy.matrix);
    if (t.conifer) {
      dummy.position.set(t.x, y + 4.4 * t.s, t.z);
      dummy.rotation.set(0, t.rot, 0);
      dummy.scale.set(t.s * 1.0, t.s * 1.3, t.s);
      dummy.updateMatrix();
      cones.setMatrixAt(ci, dummy.matrix);
      cones.setColorAt(ci, new THREE.Color(leafColors[(i + 1) % leafColors.length]));
      ci++;
    }
    dummy.position.set(t.x, y + 4.6 * t.s, t.z);
    dummy.rotation.set(t.rot * 0.2, t.rot, 0);
    dummy.scale.set(t.s * (0.9 + t.tint * 0.35), t.s * (0.8 + t.tint * 0.25), t.s * (0.9 + t.tint * 0.3));
    dummy.updateMatrix();
    leaves.setMatrixAt(li, dummy.matrix);
    leaves.setColorAt(li, new THREE.Color(pick(leafColors)));
    li++;
    dummy.position.set(t.x + 0.8 * t.s, y + 3.8 * t.s, t.z - 0.5 * t.s);
    dummy.scale.set(t.s * 0.62, t.s * 0.55, t.s * 0.62);
    dummy.updateMatrix();
    leaves.setMatrixAt(li, dummy.matrix);
    leaves.setColorAt(li, new THREE.Color(pick(leafColors)));
    li++;
  });
  leaves.count = li; cones.count = ci;
  trunks.castShadow = false; leaves.castShadow = false; cones.castShadow = false;
  trunks.receiveShadow = true;
  group.add(trunks, leaves, cones);

  // rocks
  const rockGeo = new THREE.DodecahedronGeometry(1, 0);
  const rocks = new THREE.InstancedMesh(rockGeo, std('#4b4b54', { roughness: 1 }), 60);
  for (let i = 0; i < 60; i++) {
    const a = rng() * TAU, r = 15 + rng() * 120;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const y = heightAt(x, z);
    dummy.position.set(x, y + 0.2, z);
    dummy.rotation.set(rng() * 3, rng() * 3, rng() * 3);
    dummy.scale.set(0.4 + rng() * 1.5, 0.3 + rng() * 0.9, 0.4 + rng() * 1.4);
    dummy.updateMatrix();
    rocks.setMatrixAt(i, dummy.matrix);
  }
  rocks.castShadow = false; rocks.receiveShadow = true; group.add(rocks);

  // site builds
  buildVillage(ctx);
  buildAcademy(ctx);
  buildForest(ctx);
  buildLake(ctx);
  buildRuins(ctx);
  buildCaverns(ctx);
  buildCrag(ctx);
  buildSpire(ctx);
  buildDuelRing(ctx);

  // stone paths
  const pathCurves = [
    [[0, 42], [-16, 30], [-34, 18], [-53, -6], [-62, -26]],
    [[0, 42], [18, 34], [32, 18], [42, -2], [50, -22], [52, -32]],
    [[0, 42], [22, 50], [36, 60], [46, 68]],
    [[0, 42], [-22, 54], [-44, 64], [-62, 74], [-74, 80]],
    [[0, 42], [30, 46], [58, 52], [86, 60], [100, 65]],
    [[100, 65], [108, 40], [110, 5], [110, -40], [112, -80]],
    [[0, 42], [4, 12], [2, -25], [0, -65], [0, -108]],
    [[-16, 30], [2, 27], [18, 25]]
  ];
  const stoneGeo = new THREE.CylinderGeometry(1.1, 1.25, 0.1, 7);
  const stoneMat = std('#67635a', { roughness: 0.95 });
  const pathPoints = [];
  for (const pts of pathCurves) {
    const curve = new THREE.CatmullRomCurve3(pts.map(([x, z]) => new THREE.Vector3(x, 0, z)));
    for (let i = 0; i < 60; i++) {
      const p = curve.getPoint(i / 60);
      if (heightAt(p.x, p.z) < 0.2) continue;
      if (Math.hypot(p.x, p.z - 46) < 13) continue;
      if (Math.hypot(p.x + 64, p.z + 44) < 17) continue;
      pathPoints.push({ x: p.x + (rng() - 0.5) * 0.7, z: p.z + (rng() - 0.5) * 0.7, r: rng() * TAU, s: 0.5 + rng() * 0.5 });
    }
  }
  const pathStones = new THREE.InstancedMesh(stoneGeo, stoneMat, pathPoints.length);
  pathPoints.forEach((p, i) => {
    dummy.position.set(p.x, heightAt(p.x, p.z) + 0.06, p.z);
    dummy.rotation.set(0, p.r, 0);
    dummy.scale.set(p.s, 1, p.s * (0.8 + rng() * 0.5));
    dummy.updateMatrix();
    pathStones.setMatrixAt(i, dummy.matrix);
  });
  pathStones.receiveShadow = true; group.add(pathStones);

  // floating islands
  const islands = [
    floatingIsland(-120, 48, -110, 1.25, mulberry32(17)),
    floatingIsland(135, 38, -120, 1.0, mulberry32(33)),
    floatingIsland(120, 58, 20, 0.8, mulberry32(51))
  ];
  for (const isl of islands) group.add(isl.g);

  // ── gathering nodes
  const nodeSpecs = [
    { x: -9, z: 55, item: 'oak' }, { x: 6, z: 38, item: 'oak' }, { x: -21, z: 39, item: 'willow' },
    { x: 18, z: 55, item: 'unicorn' }, { x: -17, z: 64, item: 'willow' }, { x: 7, z: 62, item: 'moonstone' },
    { x: 42, z: -20, item: 'holly' }, { x: 35, z: -44, item: 'moonwillow' }, { x: 66, z: -26, item: 'moonwillow' },
    { x: 58, z: -52, item: 'thestral' }, { x: 28, z: -30, item: 'unicorn' }, { x: 70, z: -14, item: 'hawthorn' },
    { x: 45, z: -60, item: 'coral' }, { x: 75, z: -40, item: 'augurey' }, { x: 39, z: -55, item: 'thunderbird' },
    { x: 38, z: 66, item: 'coral' }, { x: 64, z: 70, item: 'pearl' }, { x: 48, z: 58, item: 'willow' },
    { x: -46, z: -22, item: 'silverlime' }, { x: -72, z: -20, item: 'phoenix' }, { x: -86, z: -32, item: 'runeetch' },
    { x: -54, z: 68, item: 'ebony' }, { x: -84, z: 74, item: 'thestral' }, { x: -70, z: 96, item: 'basilisk' },
    { x: -92, z: 88, item: 'runeetch' }, { x: -66, z: 90, item: 'augurey' },
    { x: 94, z: 56, item: 'starfall' }, { x: 112, z: 52, item: 'frostpine' }, { x: 118, z: 74, item: 'starlight' },
    { x: 96, z: 78, item: 'thunderbird' }, { x: 108, z: 82, item: 'voidsalt' },
    { x: 102, z: -70, item: 'sunwood' }, { x: 120, z: -78, item: 'dragon' }, { x: 88, z: -82, item: 'emberresin' },
    { x: 108, z: -104, item: 'phoenix' }, { x: 124, z: -96, item: 'stariron' }, { x: 98, z: -96, item: 'chimaera' },
    { x: 132, z: -70, item: 'emberoak' }, { x: 10, z: -116, item: 'voidbriar' }, { x: -12, z: -120, item: 'wraithglass' },
    { x: 14, z: -140, item: 'starlight' }, { x: -8, z: -148, item: 'voidsalt' }, { x: 2, z: -104, item: 'frostpine' }
  ];
  const nodes = [];
  const nodeGroup = new THREE.Group(); group.add(nodeGroup);
  nodeSpecs.forEach((spec, i) => {
    const info = itemInfo(spec.item);
    const y = heightAt(spec.x, spec.z);
    if (y < -1.5) return;
    const vis = createNodeVisual(spec.item, info.kind);
    vis.g.position.set(spec.x, y + 0.05, spec.z);
    vis.g.rotation.y = rng() * TAU;
    nodeGroup.add(vis.g);
    const node = {
      id: `node-${i}`, x: spec.x, z: spec.z, y: y + 0.05, item: spec.item, kind: info.kind,
      label: `Gather ${info.name}`, info, mesh: vis.g, beam: vis.beam, halo: vis.halo, ring: vis.ring,
      active: true, respawnAt: 0, phase: rng() * TAU, radius: 3.0
    };
    nodes.push(node);
  });

  // ── NPCs
  const npcs = [];
  const npcSpecs = [
    { id: 'orin', name: 'Master Orin Vale', sub: 'Wandmaker of Emberfall', x: -4, z: 33.5, robe: '#5b4430', accent: '#c9a25f', hair: '#cfc4b0', face: 0.2, hat: true },
    { id: 'mira', name: 'Mira Fen', sub: 'Village Elder', x: 6, z: 43.5, robe: '#3d4d5f', accent: '#7fb3c9', hair: '#9a8b7a', face: -1.2, hat: false },
    { id: 'reed', name: 'Professor Cassian Reed', sub: 'Charms & Combat', x: -56, z: -25, robe: '#34405e', accent: '#c9b37d', hair: '#2a2020', face: 1.9, hat: true },
    { id: 'sable', name: 'Duel Captain Sable', sub: 'Master of the Ring', x: -21, z: 17.5, robe: '#4a2f38', accent: '#c98d7a', hair: '#1e1818', face: -2.3, hat: false },
    { id: 'keeper', name: 'The Keeper', sub: 'Black Archive', x: -79, z: -31, robe: '#241d33', accent: '#a06bff', hair: '#d8d2c8', face: 0.7, hat: true }
  ];
  for (const spec of npcSpecs) {
    const y = heightAt(spec.x, spec.z);
    const wiz = createWizard({ robe: spec.robe, accent: spec.accent, hair: spec.hair, name: spec.name, subtitle: spec.sub, hat: spec.hat, scale: 1.0 });
    wiz.group.position.set(spec.x, y, spec.z);
    wiz.group.rotation.y = spec.face;
    group.add(wiz.group);
    // quest marker
    const marker = new THREE.Group();
    const diamond = new THREE.Mesh(new THREE.OctahedronGeometry(0.15, 0), new THREE.MeshBasicMaterial({ color: '#ffd27a' }));
    marker.add(diamond);
    const glow = addGlow(marker, '#ffd27a', 0.9, 0, 0, 0, 0.5);
    marker.position.set(spec.x, y + 2.85, spec.z);
    group.add(marker);
    npcs.push({ ...spec, y, wiz, marker, phase: rng() * TAU, markerGlow: glow });
  }

  // ── interactables
  const interactables = [];
  let interactSeq = 0;
  function addInteract(o) {
    const y = o.y ?? heightAt(o.x, o.z);
    const item = { id: `int-${interactSeq++}`, y, radius: 3.2, marker: null, ...o };
    if (!o.noMarker) {
      const mg = new THREE.Group();
      mg.position.set(item.x, y + (o.markerHeight || 2.0), item.z);
      const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.16, 0), new THREE.MeshBasicMaterial({ color: o.markerColor || '#e9c988' }));
      mg.add(gem);
      addGlow(mg, o.markerColor || '#e9c988', 1.1, 0, 0, 0, 0.5);
      group.add(mg);
      item.marker = mg;
    }
    interactables.push(item);
    return item;
  }

  // workbench prop
  const benchPos = { x: -7.8, z: 35.2 };
  const benchY = heightAt(benchPos.x, benchPos.z);
  const benchG = new THREE.Group(); benchG.position.set(benchPos.x, benchY, benchPos.z); benchG.rotation.y = 0.7; group.add(benchG);
  addBox(benchG, { w: 2.5, h: 0.14, d: 1.2, y: 0.95, mat: std('#5b4030') });
  for (const [sx, sz] of [[-1.1, -0.45], [1.1, -0.45], [-1.1, 0.45], [1.1, 0.45]]) addBox(benchG, { w: 0.15, h: 0.95, d: 0.15, x: sx, y: 0.5, z: sz, mat: std('#3e2b20') });
  // wand rack
  for (let i = 0; i < 5; i++) {
    const wand = addCyl(benchG, { r: 0.025, h: 0.9, seg: 4, x: -0.9 + i * 0.22, y: 1.18, z: -0.3, color: '#7a5536' });
    wand.rotation.z = 0.2 + i * 0.05;
    addGlow(benchG, ['#ffd27a', '#9fe7ff', '#c9a2ff'][i % 3], 0.4, -0.9 + i * 0.22, 1.62, -0.3, 0.4);
  }
  addCyl(benchG, { r: 0.16, h: 0.3, seg: 8, x: 0.75, y: 1.18, z: -0.15, mat: std('#3c3550') });
  addGlow(benchG, '#9fe7ff', 1.0, 0.75, 1.4, -0.15, 0.5);
  addBox(benchG, { w: 0.6, h: 0.03, d: 0.45, x: 0.3, y: 1.03, z: 0.25, mat: std('#d7c9a5') });
  addInteract({ type: 'craft', label: "Use the wandmaker's bench", x: benchPos.x, z: benchPos.z, markerColor: '#ffc97d', markerHeight: 2.1, icon: '⚒' });

  // shop door
  addInteract({ type: 'shop', label: 'Enter the wand shop', x: -11.4, z: 32.6, markerColor: '#ffd27a', markerHeight: 2.4, icon: '◉' });
  // academy lessons
  addInteract({ type: 'lessons', label: 'Enter Aurelian Academy', x: -64, z: -25, markerColor: '#c9a2ff', markerHeight: 3.3, icon: '✦' });
  // duel ring
  addInteract({ type: 'duel', label: 'Step into the duelling circle', x: -30, z: 14, markerColor: '#ff8c9a', markerHeight: 2.2, icon: '⚔' });
  // quest board
  const qb = { x: -1, z: 52 };
  const qbY = heightAt(qb.x, qb.z);
  const qbG = new THREE.Group(); qbG.position.set(qb.x, qbY, qb.z); qbG.rotation.y = 0.2; group.add(qbG);
  for (const sx of [-1, 1]) addBox(qbG, { w: 0.13, h: 2.2, d: 0.13, x: sx, y: 1.1, mat: std('#4a3528') });
  addBox(qbG, { w: 2.5, h: 1.6, d: 0.15, y: 1.9, mat: std('#4a3528') });
  for (let i = 0; i < 4; i++) addBox(qbG, { w: 0.5, h: 0.62, d: 0.03, x: -0.85 + i * 0.55, y: 1.9 + (i % 2) * 0.15, z: 0.1, mat: std(i % 2 ? '#d7c9a5' : '#b9ab8d'), rz: (i % 2 - 0.5) * 0.08 });
  addInteract({ type: 'quests', label: 'Read the quest board', x: qb.x, z: qb.z, markerColor: '#e9c988', markerHeight: 3.1, icon: '❖' });
  // lake gaze
  addInteract({ type: 'lake', label: 'Gaze into Mirrormere', x: 39, z: 69, markerColor: '#7de6d0', markerHeight: 1.6, icon: '≋' });
  // ruins portal
  addInteract({ type: 'duel', label: "Touch the Warden's seal", x: -78, z: 82, markerColor: '#8fe7ff', markerHeight: 3.2, icon: '⚔', data: { enemy: 'warden' } });
  // caverns cache
  addInteract({ type: 'cache', label: 'Harvest the crystal bloom', x: 94, z: 58, markerColor: '#b58cff', markerHeight: 1.8, icon: '◆' });
  // crag lookout
  addInteract({ type: 'lore', label: 'Study the dragon remains', x: 110, z: -84, markerColor: '#ffb05a', markerHeight: 2.2, icon: '☾' });
  // spire portal
  addInteract({ type: 'duel', label: 'Enter the Veiled Spire', x: 0, z: -120, markerColor: '#d65cff', markerHeight: 3.2, icon: '☾', data: { enemy: 'malachar' } });
  // npc interactions
  for (const n of npcs) addInteract({ type: 'npc', label: `Speak with ${n.name}`, x: n.x, z: n.z, markerColor: '#ffd27a', markerHeight: 2.2, icon: '◉', data: { npc: n.id } });
  // zone gates
  const gates = [];
  const gateSpecs = [
    { zone: 'ruins', x: -58, z: 62, ry: 0.8 }, { zone: 'caverns', x: 88, z: 58, ry: -1.0 },
    { zone: 'crag', x: 106, z: -64, ry: 0.2 }, { zone: 'spire', x: 0, z: -102, ry: 0.0 }
  ];
  for (const gs of gateSpecs) {
    const zone = ZONES.find(z => z.id === gs.zone);
    const y = heightAt(gs.x, gs.z);
    const gg = new THREE.Group(); gg.position.set(gs.x, y, gs.z); gg.rotation.y = gs.ry; group.add(gg);
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.DoubleSide,
      uniforms: { time: { value: 0 }, color: { value: new THREE.Color(zone.color) } },
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
      fragmentShader: `varying vec2 vUv; uniform float time; uniform vec3 color;
        void main(){ float grid = smoothstep(0.0,0.05,abs(sin(vUv.x*30.0)))+smoothstep(0.0,0.05,abs(sin(vUv.y*14.0+time)));
          float a = (0.10 + grid*0.08) * smoothstep(0.0,0.1,vUv.x)*smoothstep(1.0,0.9,vUv.x)*smoothstep(0.0,0.15,vUv.y);
          gl_FragColor = vec4(color, a); }`
    });
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(11, 5.5), mat);
    wall.position.y = 2.9; gg.add(wall);
    for (const sx of [-5.4, 5.4]) addCyl(gg, { r: 0.35, h: 5.2, seg: 6, x: sx, y: 2.6, color: '#3c3542' });
    addBox(gg, { w: 11.6, h: 0.4, d: 0.6, y: 5.3, mat: std('#3c3542') });
    const sign = textPlane(`${zone.name.toUpperCase()}`, { font: '700 34px Cinzel, Georgia, serif', border: 'rgba(233,201,136,.25)' });
    sign.scale.set(4.2, 1.05, 1); sign.position.set(0, 4.5, 0.25); gg.add(sign);
    gates.push({ zone, group: gg, wall, mat });
    addInteract({ type: 'gate', label: `${zone.name} — requires ${zone.req} reputation`, x: gs.x, z: gs.z, markerColor: zone.color, markerHeight: 6, icon: '◈', data: { zone: zone.id }, noMarker: false });
  }

  // smoke particles
  const smokeSprites = [];
  const smokeTex = getGlowTexture();
  for (const src of ctx.smokeSources || []) {
    for (let i = 0; i < 6; i++) {
      const mat = new THREE.SpriteMaterial({ map: smokeTex, color: '#8f8398', transparent: true, opacity: 0.0, depthWrite: false });
      const s = new THREE.Sprite(mat);
      s.scale.setScalar(0.7 + Math.random() * 0.6);
      src.getWorldPosition(s.position);
      group.add(s);
      smokeSprites.push({ s, origin: src, t: Math.random() * 4, speed: 0.5 + Math.random() * 0.4, offset: Math.random() * TAU });
    }
  }

  // ambient motes
  const moteCount = 420;
  const motePos = new Float32Array(moteCount * 3);
  const motePhase = new Float32Array(moteCount);
  for (let i = 0; i < moteCount; i++) {
    const a = rng() * TAU, r = 6 + rng() * 95;
    motePos[i * 3] = Math.cos(a) * r;
    motePos[i * 3 + 1] = rng() * 9 + 0.4;
    motePos[i * 3 + 2] = 46 + Math.sin(a) * r;
    motePhase[i] = rng() * TAU;
  }
  const moteGeo = new THREE.BufferGeometry();
  moteGeo.setAttribute('position', new THREE.BufferAttribute(motePos, 3));
  const motes = new THREE.Points(moteGeo, new THREE.PointsMaterial({ map: getGlowTexture(), color: '#ffe6b0', size: 0.28, transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending }));
  motes.frustumCulled = false; group.add(motes);

  // fireflies around forest + lake
  const flyCount = 140;
  const flyBase = [];
  const flyPos = new Float32Array(flyCount * 3);
  const flyRng = mulberry32(999);
  for (let i = 0; i < flyCount; i++) {
    const zone = i < 90 ? { x: 52, z: -36, r: 44 } : { x: 45, z: 72, r: 32 };
    const a = flyRng() * TAU, r = flyRng() * zone.r;
    const x = zone.x + Math.cos(a) * r, z = zone.z + Math.sin(a) * r, y = heightAt(x, z) + 0.8 + flyRng() * 4;
    flyBase.push({ x, z, y, phase: flyRng() * TAU, amp: 0.4 + flyRng() * 1.4, speed: 0.4 + flyRng() * 0.8 });
    flyPos[i * 3] = x; flyPos[i * 3 + 1] = y; flyPos[i * 3 + 2] = z;
  }
  const flyGeo = new THREE.BufferGeometry();
  flyGeo.setAttribute('position', new THREE.BufferAttribute(flyPos, 3));
  const flies = new THREE.Points(flyGeo, new THREE.PointsMaterial({ map: getGlowTexture(), color: '#b8ffd9', size: 0.34, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending }));
  flies.frustumCulled = false; group.add(flies);

  // sun shafts
  const shafts = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const shaft = new THREE.Mesh(new THREE.PlaneGeometry(2 + Math.random() * 3, 36), new THREE.MeshBasicMaterial({ color: '#ffd9a0', transparent: true, opacity: 0.035, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    shaft.position.set(-90 + Math.random() * 30, 22, -80 + i * 35);
    shaft.rotation.set(-0.2, 0.6, 0.5);
    shafts.add(shaft);
  }
  group.add(shafts);

  const world = {
    group, scene, colliders, nodes, npcs, interactables, gates, zones: ZONES,
    spawn: new THREE.Vector3(8, heightAt(8, 41) + 0.03, 41),
    heightAt,
    sky, water,
    smokeSprites,
    getZone(x, z) {
      let best = null, bestD = Infinity;
      for (const zone of ZONES) {
        const d = Math.hypot(x - zone.x, z - zone.z);
        if (d < zone.r && d < bestD) { best = zone; bestD = d; }
      }
      return best || { id: 'wilds', name: 'The Wilds', color: '#e9c988', req: 0 };
    },
    nearestNode(pos, radius = 3.2) {
      let best = null, bd = radius;
      for (const n of nodes) {
        if (!n.active) continue;
        const d = Math.hypot(pos.x - n.x, pos.z - n.z);
        if (d < bd) { best = n; bd = d; }
      }
      return best;
    },
    nearestInteract(pos, radius = 3.4) {
      let best = null, bd = radius;
      for (const it of interactables) {
        const d = Math.hypot(pos.x - it.x, pos.z - it.z);
        if (d < bd) { best = it; bd = d; }
      }
      return best;
    },
    gather(node) {
      if (!node.active) return null;
      node.active = false;
      node.mesh.visible = false;
      node.respawnAt = performance.now() + 45000 + Math.random() * 25000;
      return { kind: node.info.kind, id: node.item, info: node.info };
    },
    setReputation(rep) {
      for (const gate of gates) {
        gate.locked = rep < gate.zone.req;
        gate.group.visible = gate.locked;
      }
    },
    collide(pos, radius = 0.42) {
      for (const c of colliders) {
        const dx = pos.x - c.x, dz = pos.z - c.z;
        const d = Math.hypot(dx, dz);
        const min = c.r + radius;
        if (d < min && d > 0.0001) {
          pos.x = c.x + dx / d * min;
          pos.z = c.z + dz / d * min;
        }
      }
      // water / world edge
      if (heightAt(pos.x, pos.z) < -1.6) {
        const len = Math.hypot(pos.x, pos.z) || 1;
        pos.x -= pos.x / len * 0.16;
        pos.z -= pos.z / len * 0.16;
      }
      const r = Math.hypot(pos.x, pos.z);
      if (r > 138) { pos.x *= 138 / r; pos.z *= 138 / r; }
      pos.y = heightAt(pos.x, pos.z) + 0.03;
    },
    update(dt, t, playerPos) {
      sky.update(t);
      water.uniforms.time.value = t;
      for (const fn of anims) fn(dt, t);
      for (const isl of islands) {
        isl.g.position.y = isl.baseY + Math.sin(t * 0.14 + isl.g.position.x) * 1.6;
        isl.fall.material.map.offset.y -= dt * 0.4;
      }
      // nodes
      for (const n of nodes) {
        if (!n.active) {
          if (performance.now() > n.respawnAt) {
            n.active = true; n.mesh.visible = true;
          }
          continue;
        }
        const dist = Math.hypot(playerPos.x - n.x, playerPos.z - n.z);
        if (dist < 40) {
          n.mesh.rotation.y += dt * 0.25;
          n.beam.material.opacity = 0.12 + Math.sin(t * 1.7 + n.phase) * 0.05;
          n.halo.material.opacity = 0.22 + Math.sin(t * 2.1 + n.phase) * 0.09;
          n.ring.rotation.z += dt * 0.4;
        }
      }
      // npcs idle & markers
      for (const n of npcs) {
        n.wiz.update(dt, false);
        n.wiz.group.rotation.y = n.face + Math.sin(t * 0.4 + n.phase) * 0.12;
        n.marker.position.y = n.y + 2.85 + Math.sin(t * 1.8 + n.phase) * 0.08;
        n.marker.rotation.y = t * 0.8;
        n.markerGlow.material.opacity = 0.35 + Math.sin(t * 2 + n.phase) * 0.15;
      }
      // interact markers
      for (const it of interactables) {
        if (!it.marker) continue;
        it.marker.position.y = it.y + (it.markerHeight || 2.0) + Math.sin(t * 1.6 + it.x) * 0.09;
        it.marker.rotation.y = t * 0.7;
      }
      // fireflies
      const fa = flyGeo.attributes.position.array;
      for (let i = 0; i < flyCount; i++) {
        const b = flyBase[i];
        fa[i * 3] = b.x + Math.sin(t * b.speed + b.phase) * b.amp;
        fa[i * 3 + 1] = b.y + Math.sin(t * b.speed * 1.4 + b.phase * 2) * 0.5;
        fa[i * 3 + 2] = b.z + Math.cos(t * b.speed * 0.8 + b.phase) * b.amp;
      }
      flyGeo.attributes.position.needsUpdate = true;
      // motes drift
      motes.rotation.y = Math.sin(t * 0.01) * 0.02;
      // smoke
      for (const sm of smokeSprites) {
        sm.t += dt * sm.speed;
        if (sm.t > 4) sm.t = 0;
        const k = sm.t / 4;
        sm.s.position.set(sm.origin.position.x + Math.sin(t + sm.offset) * (0.2 + k), sm.origin.position.y + k * 5, sm.origin.position.z + Math.cos(t * 0.7 + sm.offset) * (0.2 + k));
        sm.s.material.opacity = Math.sin(k * Math.PI) * 0.14;
        sm.s.scale.setScalar(0.6 + k * 1.8);
      }
      // gate shimmer
      for (const g of gates) {
        g.mat.uniforms.time.value = t;
        const gd = Math.hypot(playerPos.x - g.group.position.x, playerPos.z - g.group.position.z);
        g.group.visible = !!g.locked && gd < 62;
      }
      foam.material.opacity = 0.055 + Math.sin(t * 0.9) * 0.02;
      shafts.rotation.y = Math.sin(t * 0.03) * 0.02;
    }
  };
  world.setReputation(0);
  return world;
}
