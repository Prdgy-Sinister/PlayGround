import * as THREE from 'three';
import { toonMat, toonGradient } from './characterRig.js';

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

function instance(geom, mat, count, parent) {
  const m = new THREE.InstancedMesh(geom, mat, count);
  m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  m.frustumCulled = true;
  parent.add(m);
  return m;
}

function placeInstances(mesh, list, colorize = false) {
  list.forEach((it, i) => {
    dummy.position.set(it.x, it.y, it.z);
    dummy.rotation.set(it.rx || 0, it.ry || 0, it.rz || 0);
    dummy.scale.set(it.sx ?? 1, it.sy ?? 1, it.sz ?? 1);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    if (colorize && it.color) mesh.setColorAt(i, tmpColor.set(it.color));
  });
  mesh.instanceMatrix.needsUpdate = true;
  if (colorize && mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
}

export function createEnvironment(arena, courseLength, quality = 'high') {
  const group = new THREE.Group();
  const anim = [];
  const rand = rng((arena.id || 'classic').split('').reduce((a, c) => a + c.charCodeAt(0), 77) * 97);
  const low = quality === 'low';

  // ---------- sky dome ----------
  const skyUniforms = {
    uTop: { value: new THREE.Color(arena.skyTop) },
    uHorizon: { value: new THREE.Color(arena.skyHorizon) },
    uSun: { value: new THREE.Color(arena.sun) },
    uSunDir: { value: new THREE.Vector3(...arena.sunDir).normalize() },
    uTime: { value: 0 },
    uNight: { value: arena.id === 'night' ? 1 : 0 }
  };
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: skyUniforms,
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform vec3 uTop; uniform vec3 uHorizon; uniform vec3 uSun; uniform vec3 uSunDir;
      uniform float uTime; uniform float uNight;
      varying vec3 vDir;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      void main(){
        vec3 d = normalize(vDir);
        float h = clamp(d.y, 0.0, 1.0);
        vec3 col = mix(uHorizon, uTop, pow(h, 0.55));
        float sd = max(dot(d, uSunDir), 0.0);
        col += uSun * pow(sd, 300.0) * 2.4;
        col += uSun * pow(sd, 7.0) * 0.12;
        // stylised cloud bands
        float cl = sin(d.x * 7.0 + uTime * 0.015) * sin(d.z * 5.0 - uTime * 0.01)
                 + 0.5 * sin(d.x * 13.0 - d.z * 9.0 + uTime * 0.02);
        cl = smoothstep(0.55, 1.15, cl) * smoothstep(0.03, 0.3, h) * (1.0 - uNight);
        col = mix(col, uHorizon * 1.18 + vec3(0.08), cl * 0.42);
        // stars
        if (uNight > 0.5) {
          vec2 sp = vec2(atan(d.z, d.x) * 3.0, d.y * 8.0);
          vec2 cell = floor(sp * 18.0);
          float star = step(0.9965, hash(cell)) * smoothstep(0.05, 0.35, h);
          col += vec3(star) * (0.6 + 0.4 * sin(uTime * 2.0 + hash(cell) * 6.28));
        }
        gl_FragColor = vec4(col, 1.0);
      }
    `
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(620, 24, 16), skyMat);
  sky.frustumCulled = false;
  group.add(sky);

  // ---------- animated water ----------
  const waterUniforms = {
    uTime: { value: 0 },
    uShallow: { value: new THREE.Color(arena.waterShallow) },
    uDeep: { value: new THREE.Color(arena.waterDeep) },
    uFog: { value: new THREE.Color(arena.fog) },
    uSun: { value: new THREE.Color(arena.sun) }
  };
  const waterGeo = new THREE.PlaneGeometry(1100, 1100, low ? 42 : 90, low ? 42 : 90);
  waterGeo.rotateX(-Math.PI / 2);
  const waterMat = new THREE.ShaderMaterial({
    uniforms: waterUniforms, fog: false,
    vertexShader: `
      uniform float uTime;
      varying vec3 vWorld; varying float vWave;
      void main(){
        vec3 p = position;
        float w = sin(p.x * 0.09 + uTime * 1.15) * 0.18
                + sin(p.z * 0.13 - uTime * 0.95) * 0.16
                + sin((p.x + p.z) * 0.055 + uTime * 0.6) * 0.24;
        p.y += w;
        vWave = w;
        vec4 wp = modelMatrix * vec4(p, 1.0);
        vWorld = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: `
      uniform float uTime; uniform vec3 uShallow; uniform vec3 uDeep; uniform vec3 uFog; uniform vec3 uSun;
      varying vec3 vWorld; varying float vWave;
      void main(){
        float dist = length(vWorld.xz - cameraPosition.xz);
        vec3 col = mix(uShallow, uDeep, smoothstep(0.0, 1.0, clamp((vWave + 0.55) / 1.1, 0.0, 1.0)));
        float ripple = sin(vWorld.x * 0.55 + uTime * 2.1) * sin(vWorld.z * 0.42 - uTime * 1.7);
        col += ripple * 0.035;
        float spark = pow(max(0.0, sin(vWorld.x * 0.9 + uTime * 2.5) * sin(vWorld.z * 1.1 - uTime * 2.0)), 18.0);
        col += uSun * spark * 0.5;
        col = mix(col, uFog, smoothstep(70.0, 330.0, dist) * 0.82);
        gl_FragColor = vec4(col, 1.0);
      }
    `
  });
  const water = new THREE.Mesh(waterGeo, waterMat);
  water.position.y = -2.25;
  water.frustumCulled = false;
  group.add(water);

  // ---------- distant islands / banks ----------
  const islandMat = toonMat(arena.ground);
  const islandGeo = new THREE.SphereGeometry(1, 12, 8);
  for (let i = 0; i < (low ? 7 : 13); i++) {
    const side = i % 2 ? 1 : -1;
    const z = 30 - (i / (low ? 7 : 13)) * (courseLength + 220) + rand() * 30;
    const s = 12 + rand() * 28;
    const isl = new THREE.Mesh(islandGeo, islandMat);
    isl.position.set(side * (46 + rand() * 55), -7 - rand() * 5, z);
    isl.scale.set(s, 5 + rand() * 7, s * 0.8);
    group.add(isl);
    if (!low) {
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(1, 0), toonMat(arena.platformSide));
      rock.position.set(side * (40 + rand() * 20), -1.4, z + rand() * 20);
      rock.scale.set(1.4 + rand() * 2.4, 1 + rand() * 2.6, 1.4 + rand() * 2.4);
      rock.rotation.y = rand() * 6;
      group.add(rock);
    }
  }

  // ---------- scenery by theme ----------
  const propGroup = new THREE.Group();
  group.add(propGroup);

  const addPalms = (count) => {
    const trunkGeo = new THREE.CylinderGeometry(0.28, 0.42, 7, 6);
    const trunkMat = toonMat('#9b6a3d');
    const frondGeo = new THREE.ConeGeometry(1.9, 0.5, 5);
    const frondMat = toonMat('#2fa860');
    const trunks = instance(trunkGeo, trunkMat, count, propGroup);
    const leaves = instance(frondGeo, frondMat, count * 3, propGroup);
    const trunksL = [], leavesL = [];
    for (let i = 0; i < count; i++) {
      const side = rand() > 0.5 ? 1 : -1;
      const x = side * (15 + rand() * 26);
      const z = 12 - rand() * (courseLength + 60);
      const h = 6 + rand() * 6;
      trunksL.push({ x, y: -1.4 + h * 0.4, z, sy: h / 7, ry: rand() * 6 });
      for (let k = 0; k < 3; k++) {
        leavesL.push({
          x, y: -1.4 + h * 0.85, z,
          rz: 0.5 + k * 0.22, ry: rand() * 6, sx: 1, sy: 1, sz: 1
        });
      }
    }
    placeInstances(trunks, trunksL);
    placeInstances(leaves, leavesL);
  };

  const addStands = (count) => {
    const standMat = toonMat(arena.platformSide);
    const seatMat = toonMat(arena.platform);
    const crowdGeo = new THREE.BoxGeometry(0.42, 0.6, 0.4);
    const crowdMat = toonMat('#ffffff');
    const crowd = instance(crowdGeo, crowdMat, count * 90, propGroup);
    const seats = instance(new THREE.BoxGeometry(1, 1, 1), seatMat, count * 12, propGroup);
    const standL = [], seatsL = [], crowdL = [];
    for (let i = 0; i < count; i++) {
      const side = i % 2 ? 1 : -1;
      const z = -i * 46 - 8;
      for (let t = 0; t < 12; t++) {
        const row = Math.floor(t / 3);
        seatsL.push({
          x: side * (17 + row * 2.0), y: -0.2 + row * 1.1, z: z - (t % 3) * 3,
          sx: 4.5, sy: 1, sz: 2.2
        });
        for (let c = 0; c < 6; c++) {
          crowdL.push({
            x: side * (17 + row * 2.0 - 1.2), y: 0.65 + row * 1.1, z: z - (t % 3) * 3 - 0.7 + c * 0.28,
            color: arena.crowd[(i + t + c) % arena.crowd.length],
            ry: (rand() - 0.5) * 0.7, sy: 0.8 + rand() * 0.5
          });
        }
      }
    }
    placeInstances(seats, seatsL);
    placeInstances(crowd, crowdL, true);
  };

  const addPines = (count) => {
    const trunk = instance(new THREE.CylinderGeometry(0.24, 0.34, 3, 5), toonMat('#6c4a33'), count, propGroup);
    const leafGeo = new THREE.ConeGeometry(2.2, 4.2, 7);
    const leaf = instance(leafGeo, toonMat('#2c7a5b'), count * 3, propGroup);
    const trunkL = [], leafL = [];
    for (let i = 0; i < count; i++) {
      const side = rand() > 0.5 ? 1 : -1;
      const x = side * (16 + rand() * 24);
      const z = 18 - rand() * (courseLength + 80);
      const s = 0.7 + rand() * 0.9;
      trunkL.push({ x, y: 1.2 * s - 1.5, z, sy: s, sx: s, sz: s });
      for (let k = 0; k < 3; k++) {
        leafL.push({ x, y: -0.5 + (2.4 + k * 1.55) * s, z, sx: s * (1 - k * 0.2), sy: s * (1 - k * 0.15), sz: s * (1 - k * 0.2) });
      }
    }
    placeInstances(trunk, trunkL);
    placeInstances(leaf, leafL);
  };

  const addCacti = (count) => {
    const body = instance(new THREE.CylinderGeometry(0.55, 0.62, 4.2, 7), toonMat('#3e8f57'), count * 3, propGroup);
    const list = [];
    for (let i = 0; i < count; i++) {
      const side = rand() > 0.5 ? 1 : -1;
      const x = side * (15 + rand() * 28);
      const z = 15 - rand() * (courseLength + 60);
      const s = 0.7 + rand() * 0.9;
      list.push({ x, y: 0.6 * s - 1.3, z, sy: s, sx: s, sz: s });
      list.push({ x: x + 0.7 * s, y: 1.2 * s - 1.3, z, rz: -0.9, sx: s * 0.6, sy: s * 0.55, sz: s * 0.6 });
      list.push({ x: x - 0.7 * s, y: 0.8 * s - 1.3, z, rz: 0.9, sx: s * 0.55, sy: s * 0.45, sz: s * 0.55 });
    }
    placeInstances(body, list);
    // rock towers
    const rocks = instance(new THREE.CylinderGeometry(1.6, 2.6, 1, 6), toonMat('#c98a51'), low ? 5 : 11, propGroup);
    const rocksL = [];
    for (let i = 0; i < (low ? 5 : 11); i++) {
      const side = i % 2 ? 1 : -1;
      rocksL.push({ x: side * (26 + rand() * 25), y: 3 + rand() * 5, z: 10 - rand() * (courseLength + 100), sy: 7 + rand() * 9, sx: 1 + rand() * 0.8, sz: 0.8 + rand() * 0.8, ry: rand() * 6 });
    }
    placeInstances(rocks, rocksL);
  };

  const addContainers = (count) => {
    const contGeo = new THREE.BoxGeometry(1, 1, 1);
    const cont = instance(contGeo, toonMat('#ffffff'), count, propGroup, true);
    const list = [];
    const colors = ['#c94a2b', '#2e6f8f', '#d6a93a', '#4a7c59', '#5b5f66', '#a34a4a'];
    for (let i = 0; i < count; i++) {
      const side = rand() > 0.5 ? 1 : -1;
      const stack = 1 + Math.floor(rand() * 3);
      for (let k = 0; k < stack; k++) {
        list.push({
          x: side * (19 + rand() * 26), y: -1 + k * 3.1, z: 15 - rand() * (courseLength + 40),
          sx: 8 + rand() * 3, sy: 3, sz: 3.2, ry: (rand() - 0.5) * 0.3,
          color: colors[(i + k) % colors.length]
        });
      }
    }
    placeInstances(cont, list, true);
    // smokestacks
    const stacks = instance(new THREE.CylinderGeometry(2, 2.8, 1, 10), toonMat('#4a545a'), 8, propGroup);
    const stacksL = [];
    for (let i = 0; i < 8; i++) {
      stacksL.push({ x: (i % 2 ? 1 : -1) * (40 + rand() * 18), y: 10, z: -i * 55 - 20, sy: 24 + rand() * 16, sx: 1, sz: 1 });
    }
    placeInstances(stacks, stacksL);
    // smoke puffs
    const puffMat = toonMat('#d8dde0', { transparent: true, opacity: 0.55 });
    for (let i = 0; i < 5; i++) {
      const p = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 6), puffMat);
      p.position.set((i % 2 ? 1 : -1) * (44 + rand() * 12), 20 + rand() * 8, -i * 55 - 20);
      p.scale.setScalar(3 + rand() * 3);
      propGroup.add(p);
      anim.push({ type: 'rise', mesh: p, base: p.position.y, speed: 0.4 + rand() * 0.3, t: rand() * 6 });
    }
  };

  const addNight = (count) => {
    const towers = instance(new THREE.CylinderGeometry(0.35, 0.55, 1, 6), toonMat('#2b3570'), count, propGroup);
    const list = [];
    for (let i = 0; i < count; i++) {
      const side = i % 2 ? 1 : -1;
      list.push({ x: side * (20 + rand() * 20), y: 8, z: 10 - i * (courseLength / count), sy: 18 + rand() * 8 });
    }
    placeInstances(towers, list);
    const glowMat = toonMat(arena.accent2, { emissive: arena.accent2, emissiveIntensity: 1 });
    const bulbs = instance(new THREE.SphereGeometry(0.7, 7, 5), glowMat, count * 2, propGroup);
    const bulbsL = [];
    list.forEach(l => {
      bulbsL.push({ x: l.x, y: l.y + l.sy / 2 + 0.8, z: l.z });
      bulbsL.push({ x: l.x, y: l.y, z: l.z });
    });
    placeInstances(bulbs, bulbsL);
    // neon arches across the course
    for (let i = 0; i < 4; i++) {
      const mat = toonMat(i % 2 ? arena.accent : arena.accent2, { emissive: i % 2 ? arena.accent : arena.accent2, emissiveIntensity: 0.8 });
      const arch = new THREE.Mesh(new THREE.TorusGeometry(11, 0.28, 6, 24, Math.PI), mat);
      arch.position.set(0, 3.4, -25 - i * 62);
      arch.rotation.z = Math.PI;
      propGroup.add(arch);
    }
    // spotlights
    for (let i = 0; i < 3; i++) {
      const beam = new THREE.Mesh(
        new THREE.ConeGeometry(5, 55, 12, 1, true),
        new THREE.MeshBasicMaterial({ color: arena.accent2, transparent: true, opacity: 0.05, depthWrite: false, side: THREE.DoubleSide })
      );
      beam.position.set((i - 1) * 38, 24, -60 - i * 55);
      beam.rotation.z = (i - 1) * 0.4;
      propGroup.add(beam);
      anim.push({ type: 'sway', mesh: beam, base: beam.rotation.z, speed: 0.3 + i * 0.1 });
    }
  };

  if (arena.props === 'stadium') {
    addStands(low ? 4 : 7);
    // inflatable start arch and buoys
    const buoyMat = toonMat(arena.accent);
    for (let i = 0; i < Math.floor(courseLength / 26); i++) {
      const side = i % 2 ? 1 : -1;
      const b = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.55, 8, 16), buoyMat);
      b.position.set(side * (12.5 + rand() * 3), -0.8, -i * 26 - 8);
      b.rotation.x = Math.PI / 2;
      group.add(b);
      anim.push({ type: 'bob', mesh: b, base: -0.8, phase: rand() * 6 });
    }
    // distant jumbotron
    const screen = new THREE.Mesh(new THREE.BoxGeometry(20, 11, 2), toonMat('#1b2c47', { emissive: '#1e6f8a', emissiveIntensity: 0.4 }));
    screen.position.set(0, 15, -courseLength - 30);
    propGroup.add(screen);
    const frame = new THREE.Mesh(new THREE.BoxGeometry(22, 13, 1), toonMat('#c9d6e2'));
    frame.position.set(0, 15, -courseLength - 32);
    propGroup.add(frame);
  } else if (arena.props === 'tropical') {
    addPalms(low ? 10 : 22);
    addStands(low ? 2 : 4);
    const hutMat = toonMat('#9b6a3d');
    const roofMat = toonMat('#e8a33e');
    for (let i = 0; i < 4; i++) {
      const side = i % 2 ? 1 : -1;
      const x = side * (20 + rand() * 8), z = 4 - i * 48;
      const hut = new THREE.Mesh(new THREE.BoxGeometry(5, 3, 5), hutMat);
      hut.position.set(x, 0.5, z);
      propGroup.add(hut);
      const roof = new THREE.Mesh(new THREE.ConeGeometry(4.6, 2.6, 4), roofMat);
      roof.position.set(x, 3.1, z); roof.rotation.y = Math.PI / 4;
      propGroup.add(roof);
    }
  } else if (arena.props === 'winter') {
    addPines(low ? 12 : 26);
    addStands(low ? 3 : 5);
    // snow banks
    const snow = instance(new THREE.SphereGeometry(1, 9, 7), toonMat('#f4fbff'), low ? 10 : 22, propGroup);
    const snowL = [];
    for (let i = 0; i < (low ? 10 : 22); i++) {
      const side = i % 2 ? 1 : -1;
      snowL.push({ x: side * (14 + rand() * 30), y: -2.6 + rand() * 0.8, z: 20 - rand() * (courseLength + 80), sx: 3 + rand() * 6, sy: 1.4 + rand() * 2, sz: 3 + rand() * 6 });
    }
    placeInstances(snow, snowL);
    // snowfall
    if (!low) {
      const count = 500;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (rand() - 0.5) * 90;
        pos[i * 3 + 1] = rand() * 32;
        pos[i * 3 + 2] = 20 - rand() * (courseLength + 40);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const pts = new THREE.Points(g, new THREE.PointsMaterial({ color: '#ffffff', size: 0.38, transparent: true, opacity: 0.85, depthWrite: false }));
      group.add(pts);
      anim.push({ type: 'snow', points: pts, count });
    }
  } else if (arena.props === 'desert') {
    addCacti(low ? 8 : 16);
    addStands(low ? 2 : 4);
    const dunes = instance(new THREE.SphereGeometry(1, 10, 6), toonMat('#e7b06b'), low ? 6 : 12, propGroup);
    const dunesL = [];
    for (let i = 0; i < (low ? 6 : 12); i++) {
      const side = i % 2 ? 1 : -1;
      dunesL.push({ x: side * (38 + rand() * 20), y: -4, z: 20 - i * (courseLength / 10), sx: 20 + rand() * 16, sy: 5 + rand() * 6, sz: 16 + rand() * 14 });
    }
    placeInstances(dunes, dunesL);
  } else if (arena.props === 'night') {
    addNight(low ? 6 : 12);
    addStands(low ? 3 : 6);
    addPalms(low ? 4 : 8);
  } else if (arena.props === 'industrial') {
    addContainers(low ? 10 : 20);
    // cranes
    const craneMat = toonMat('#e2a32e');
    for (let i = 0; i < 2; i++) {
      const crane = new THREE.Group();
      const mast = new THREE.Mesh(new THREE.BoxGeometry(1.2, 26, 1.2), craneMat);
      mast.position.y = 12;
      const jib = new THREE.Mesh(new THREE.BoxGeometry(28, 1, 1.2), craneMat);
      jib.position.set(10, 25, 0);
      crane.add(mast, jib);
      crane.position.set(i ? 32 : -32, -2, -40 - i * 80);
      propGroup.add(crane);
    }
    const waterTower = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 7, 10), toonMat('#8a9499'));
    waterTower.position.set(-30, 8, -110);
    propGroup.add(waterTower);
  }

  // common course-side markers every ~22 units
  const markerMat = toonMat(arena.accent);
  const markerDark = toonMat(arena.platformSide);
  const markerGeo = new THREE.CylinderGeometry(0.35, 0.35, 3.4, 6);
  const markers = instance(markerGeo, markerDark, 2 * Math.ceil(courseLength / 22), group);
  const flags = instance(new THREE.ConeGeometry(1.1, 2.2, 3), markerMat, 2 * Math.ceil(courseLength / 22), group);
  const markersL = [], flagsL = [];
  for (let z = 4; z > -courseLength; z -= 22) {
    [-1, 1].forEach(side => {
      markersL.push({ x: side * 12.4, y: 0.2, z });
      flagsL.push({ x: side * 12.4, y: 2.4, z, ry: Math.PI / 4 });
    });
  }
  placeInstances(markers, markersL);
  placeInstances(flags, flagsL);

  // ambient background character shapes (small floating inflatables)
  for (let i = 0; i < 4; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.8, 8, 18), toonMat(arena.crowd[i % arena.crowd.length]));
    ring.position.set((i % 2 ? 1 : -1) * (22 + i * 4), 3 + i, -20 - i * 37);
    ring.rotation.set(Math.PI / 2.4, i, 0);
    group.add(ring);
    anim.push({ type: 'bob', mesh: ring, base: ring.position.y, phase: i * 1.7 });
  }

  // ---------- lights ----------
  const hemi = new THREE.HemisphereLight(arena.hemi, arena.ground, arena.id === 'night' ? 0.9 : 1.15);
  group.add(hemi);
  const sun = new THREE.DirectionalLight(arena.sun, arena.id === 'night' ? 1.1 : 1.9);
  sun.position.set(...arena.sunDir).multiplyScalar(60);
  group.add(sun);
  const fill = new THREE.DirectionalLight(arena.accent2, 0.3);
  fill.position.set(-40, 20, 20);
  group.add(fill);

  function update(dt, t) {
    skyUniforms.uTime.value = t;
    waterUniforms.uTime.value = t;
    for (const a of anim) {
      if (a.type === 'bob') {
        a.mesh.position.y = a.base + Math.sin(t * 1.4 + (a.phase || 0)) * 0.20;
        a.mesh.rotation.z += dt * 0.12;
      } else if (a.type === 'snow') {
        const arr = a.points.geometry.attributes.position.array;
        for (let i = 0; i < a.count; i++) {
          arr[i * 3 + 1] -= dt * (2.2 + (i % 5) * 0.4);
          arr[i * 3] += Math.sin(t * 0.8 + i) * dt * 0.5;
          if (arr[i * 3 + 1] < -3) arr[i * 3 + 1] = 30;
        }
        a.points.geometry.attributes.position.needsUpdate = true;
      } else if (a.type === 'rise') {
        a.mesh.position.y += dt * a.speed;
        a.mesh.scale.x += dt * 0.15;
        a.mesh.scale.z = a.mesh.scale.x;
        if (a.mesh.position.y > 38) a.mesh.position.y = a.base;
      } else if (a.type === 'sway') {
        a.mesh.rotation.z = a.base + Math.sin(t * a.speed) * 0.12;
      }
    }
  }

  return { group, update, water, sky, lights: { hemi, sun } };
}
