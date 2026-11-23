import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const JP_SIGNS = ['夜間走行', '東京', '速度', '夢', '走る', '電光石火', '車屋', 'ストリート', '零時', '国道', '湾岸', '大阪', '山道', '未来', '改造', '峠'];
const NEON_COLORS = [0xff2d9a, 0x25f4ff, 0xffd52e, 0x7aff36, 0xa34dff, 0xff6a3d];

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function canvas2d(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

function texFrom(canvas) {
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function toon(color, emissive = 0, emissiveIntensity = 0) {
  return new THREE.MeshToonMaterial({ color, emissive, emissiveIntensity });
}

function basic(color, opacity = 1) {
  return new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity, toneMapped: false });
}

function rounded(w, h, d, r, mat) {
  return new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 2, r), mat);
}

function makeWindowTexture(base, lit, seed, cols = 5, rows = 11) {
  const rand = rng(seed);
  const c = canvas2d(128, 256);
  const x = c.getContext('2d');
  x.fillStyle = '#' + new THREE.Color(base).getHexString();
  x.fillRect(0, 0, 128, 256);
  const cellW = 128 / cols, cellH = 256 / rows;
  for (let ry = 0; ry < rows; ry++) {
    for (let rx = 0; rx < cols; rx++) {
      const on = rand() > 0.36;
      x.fillStyle = on ? '#' + new THREE.Color(lit).getHexString() : '#10111c';
      x.globalAlpha = on ? 0.55 + rand() * 0.45 : 0.8;
      x.fillRect(rx * cellW + 5, ry * cellH + 7, cellW - 10, cellH - 12);
    }
  }
  x.globalAlpha = 1;
  x.fillStyle = 'rgba(6,6,12,.72)';
  for (let l = 0; l <= rows; l++) x.fillRect(0, l * cellH, 128, 2);
  const t = texFrom(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function signTexture(text, color, opts = {}) {
  const vertical = opts.vertical !== false;
  const w = vertical ? 128 : 512;
  const h = vertical ? 512 : 160;
  const c = canvas2d(w, h);
  const x = c.getContext('2d');
  x.fillStyle = opts.dark === false ? '#fff4dc' : '#080810';
  x.fillRect(0, 0, w, h);
  x.strokeStyle = '#' + new THREE.Color(color).getHexString();
  x.lineWidth = 8; x.strokeRect(5, 5, w - 10, h - 10);
  x.shadowColor = '#' + new THREE.Color(color).getHexString();
  x.shadowBlur = 18;
  x.fillStyle = '#' + new THREE.Color(color).getHexString();
  x.textAlign = 'center'; x.textBaseline = 'middle';
  if (vertical) {
    const chars = [...text];
    const size = Math.min(88, 380 / Math.max(1, chars.length));
    x.font = `900 ${size}px "Noto Sans JP", sans-serif`;
    chars.forEach((ch, i) => x.fillText(ch, w / 2, 90 + i * (size + 12)));
    x.fillStyle = '#f6f0de'; x.font = '700 18px Rajdhani, sans-serif';
    x.fillText(opts.sub || 'TOKYO', w / 2, h - 34);
  } else {
    x.font = `900 ${opts.fontSize || 86}px Bebas Neue, sans-serif`;
    x.fillText(text, w / 2, h / 2 + 5);
    x.shadowBlur = 0;
    x.fillStyle = 'rgba(255,255,255,.7)'; x.font = '600 20px Rajdhani, sans-serif';
    x.fillText(opts.sub || 'JAPAN', w / 2, h - 24);
  }
  return texFrom(c);
}

function radialTexture(color) {
  const c = canvas2d(128, 128);
  const x = c.getContext('2d');
  const hex = '#' + new THREE.Color(color).getHexString();
  const g = x.createRadialGradient(64, 64, 2, 64, 64, 60);
  g.addColorStop(0, '#ffffff'); g.addColorStop(0.2, hex);
  g.addColorStop(0.5, hex + '88'); g.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = g; x.fillRect(0, 0, 128, 128);
  return texFrom(c);
}

function gradientMaterial(top, bottom, fog) {
  return new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: {
      top: { value: new THREE.Color(top) },
      bottom: { value: new THREE.Color(bottom) },
      horizon: { value: new THREE.Color(fog) }
    },
    vertexShader: `varying vec3 vPos; void main(){ vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 top; uniform vec3 bottom; uniform vec3 horizon; varying vec3 vPos;
      void main(){
        float h = normalize(vPos).y;
        vec3 col = mix(horizon, bottom, smoothstep(-0.05, 0.18, h));
        col = mix(col, top, smoothstep(0.12, 0.75, h));
        float glow = pow(max(0.0, 1.0 - abs(h - 0.02) * 8.0), 4.0);
        col += bottom * glow * 0.22;
        gl_FragColor = vec4(col, 1.0);
      }`
  });
}

function addSky(scene, cfg, kind) {
  const sky = new THREE.Mesh(new THREE.SphereGeometry(920, 24, 16), gradientMaterial(cfg.top, cfg.bottom, cfg.fog));
  sky.frustumCulled = false;
  scene.add(sky);
  // Moon / sun.
  const sunColor = kind === 'coast' ? 0xffd36a : kind === 'mountain' ? 0xffd3df : cfg.accent;
  const sun = new THREE.Sprite(new THREE.SpriteMaterial({ map: radialTexture(sunColor), color: sunColor, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
  sun.scale.set(kind === 'coast' ? 180 : 100, kind === 'coast' ? 180 : 100, 1);
  sun.position.set(-250, 120, -680);
  scene.add(sun);
  return { sky, sun };
}

function addStars(scene, color = 0xffffff) {
  const count = 900;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const rand = rng(119);
  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2, r = 480 + rand() * 360;
    pos[i * 3] = Math.cos(a) * r;
    pos[i * 3 + 1] = 100 + rand() * 420;
    pos[i * 3 + 2] = Math.sin(a) * r - 250;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ color, size: 2.4, sizeAttenuation: false, transparent: true, opacity: 0.8, depthWrite: false, fog: false });
  const points = new THREE.Points(geo, mat);
  scene.add(points);
  return points;
}

function addRoad(scene, track, distance) {
  const g = new THREE.Group();
  const cfg = track.colors;
  const roadMat = toon(cfg.road);
  const road = new THREE.Mesh(new THREE.PlaneGeometry(18, distance + 160), roadMat);
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0, -distance / 2 + 25);
  g.add(road);

  const shoulderMat = toon(0x14141c);
  for (const side of [-1, 1]) {
    const shoulder = new THREE.Mesh(new THREE.PlaneGeometry(31, distance + 170), shoulderMat);
    shoulder.rotation.x = -Math.PI / 2;
    shoulder.position.set(side * 24.5, -0.025, -distance / 2 + 25);
    g.add(shoulder);
    const edge = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, distance + 150), basic(cfg.glow));
    edge.position.set(side * 8.9, 0.035, -distance / 2 + 25);
    g.add(edge);
    const railMat = new THREE.MeshToonMaterial({ color: 0xdadada });
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, distance + 140), railMat);
    rail.position.set(side * 12.1, 0.48, -distance / 2 + 25);
    g.add(rail);
    for (let z = 25; z > -distance - 100; z -= 16) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.6, 0.14), railMat);
      post.position.set(side * 12.1, 0.24, z);
      g.add(post);
    }
  }

  // Centre stripe and twin lane marks.
  const dashGeo = new THREE.BoxGeometry(0.12, 0.012, 4.0);
  const dashMat = basic(0xfff6d2);
  const dashCount = Math.floor((distance + 100) / 12);
  const dashes = new THREE.InstancedMesh(dashGeo, dashMat, dashCount);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < dashCount; i++) {
    dummy.position.set(0, 0.035, 24 - i * 12);
    dummy.updateMatrix();
    dashes.setMatrixAt(i, dummy.matrix);
  }
  g.add(dashes);

  // Lane numbers and painted arrows.
  const arrowC = canvas2d(256, 512);
  const ax = arrowC.getContext('2d');
  ax.strokeStyle = 'rgba(255,255,255,.36)'; ax.lineWidth = 14; ax.lineCap = 'round';
  ax.beginPath(); ax.moveTo(128, 450); ax.lineTo(128, 120); ax.moveTo(72, 200); ax.lineTo(128, 115); ax.lineTo(184, 200); ax.stroke();
  const arrowTex = texFrom(arrowC);
  for (const x of [-4.2, 4.2]) {
    for (let z = -30; z > -distance; z -= 95) {
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 5.5), new THREE.MeshBasicMaterial({ map: arrowTex, transparent: true, depthWrite: false }));
      plane.rotation.x = -Math.PI / 2; plane.rotation.z = Math.PI;
      plane.position.set(x, 0.037, z);
      g.add(plane);
    }
  }

  // Start / finish checker bands.
  const check = canvas2d(512, 64);
  const cx = check.getContext('2d');
  for (let i = 0; i < 16; i++) for (let j = 0; j < 2; j++) {
    cx.fillStyle = (i + j) % 2 ? '#111118' : '#f4f0df';
    cx.fillRect(i * 32, j * 32, 32, 32);
  }
  const checkTex = texFrom(check);
  for (const z of [0.4, -distance]) {
    const strip = new THREE.Mesh(new THREE.PlaneGeometry(18, 1.25), new THREE.MeshBasicMaterial({ map: checkTex }));
    strip.rotation.x = -Math.PI / 2; strip.position.set(0, 0.042, z);
    g.add(strip);
  }
  scene.add(g);
  return g;
}

function addStartGantry(scene, track, distance) {
  const cfg = track.colors;
  const g = new THREE.Group();
  const dark = toon(0x10101a);
  const accent = basic(cfg.glow);
  const cyan = basic(cfg.accent);
  // Start arch.
  for (const side of [-1, 1]) {
    const post = rounded(0.42, 5.4, 0.5, 0.08, dark);
    post.position.set(side * 10, 2.7, -7);
    g.add(post);
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.05, 4.5, 0.55), accent);
    strip.position.set(side * 9.76, 2.7, -7);
    g.add(strip);
  }
  const beam = rounded(20.4, 0.5, 0.6, 0.08, dark);
  beam.position.set(0, 5.45, -7); g.add(beam);
  const trim = new THREE.Mesh(new THREE.BoxGeometry(20.6, 0.05, 0.06), accent);
  trim.position.set(0, 5.68, -6.68); g.add(trim);

  const bannerC = canvas2d(1024, 160);
  const bx = bannerC.getContext('2d');
  bx.fillStyle = '#090812'; bx.fillRect(0, 0, 1024, 160);
  bx.strokeStyle = '#' + new THREE.Color(cfg.accent).getHexString(); bx.lineWidth = 8; bx.strokeRect(4, 4, 1016, 152);
  bx.fillStyle = '#' + new THREE.Color(cfg.glow).getHexString();
  bx.font = '900 88px Bebas Neue, sans-serif'; bx.textAlign = 'center';
  bx.fillText('TOKYO REDLINE  //  ' + track.short, 512, 100);
  bx.fillStyle = '#f8f3e4'; bx.font = '700 24px Rajdhani, sans-serif'; bx.fillText('STREET LEGAL?  NEVER HEARD OF HER.', 512, 136);
  const banner = new THREE.Mesh(new THREE.PlaneGeometry(14, 2.2), new THREE.MeshBasicMaterial({ map: texFrom(bannerC), side: THREE.DoubleSide }));
  banner.position.set(0, 6.7, -6.95); banner.rotation.y = Math.PI;
  g.add(banner);

  // Christmas tree at the centre.
  const treeMat = toon(0x101017);
  const tower = rounded(1.05, 3.4, 0.55, 0.12, treeMat);
  tower.position.set(0, 3.2, -6.2); g.add(tower);
  const treeLights = [];
  const bulbColors = [0xffb01d, 0xffb01d, 0xffb01d, 0x24ff7c];
  bulbColors.forEach((col, i) => {
    const housing = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.08, 14), toon(0x09090e));
    housing.rotation.x = Math.PI / 2;
    housing.position.set(0, 4.35 - i * 0.7, -5.9);
    g.add(housing);
    const bulbMat = new THREE.MeshBasicMaterial({ color: 0x201e26, toneMapped: false });
    const bulb = new THREE.Mesh(new THREE.CircleGeometry(0.23, 16), bulbMat);
    bulb.position.set(0, 4.35 - i * 0.7, -5.85);
    bulb.rotation.y = Math.PI;
    g.add(bulb);
    treeLights.push({ mesh: bulb, mat: bulbMat, color: col });
  });
  // Side repeaters for the right-hand lane.
  const laneLights = [];
  const lanePanel = rounded(0.52, 2.2, 0.18, 0.08, treeMat);
  lanePanel.position.set(5.8, 3.25, -4.3); g.add(lanePanel);
  for (let i = 0; i < 4; i++) {
    const m = new THREE.MeshBasicMaterial({ color: 0x201e26, toneMapped: false });
    const b = new THREE.Mesh(new THREE.CircleGeometry(0.12, 12), m);
    b.position.set(5.8, 4.03 - i * 0.47, -4.2); b.rotation.y = Math.PI;
    g.add(b); laneLights.push({ mesh: b, mat: m, color: bulbColors[i] });
  }

  // Grandstand near start.
  const stand = rounded(10, 0.5, 18, 0.1, toon(0x1b1b25));
  stand.position.set(-18, 1.0, 7); g.add(stand);
  const stand2 = rounded(8, 0.5, 15, 0.1, toon(0x1b1b25));
  stand2.position.set(18, 0.75, 10); g.add(stand2);

  // Finish arch.
  const finish = new THREE.Group();
  for (const side of [-1, 1]) {
    const post = rounded(0.5, 6.6, 0.5, 0.1, dark);
    post.position.set(side * 10.5, 3.3, -distance);
    finish.add(post);
  }
  const fBeam = rounded(21.4, 0.7, 0.7, 0.08, dark);
  fBeam.position.set(0, 6.5, -distance); finish.add(fBeam);
  const fC = canvas2d(1024, 256);
  const fx = fC.getContext('2d');
  fx.fillStyle = '#090812'; fx.fillRect(0, 0, 1024, 256);
  fx.strokeStyle = '#' + new THREE.Color(cfg.accent).getHexString(); fx.lineWidth = 12; fx.strokeRect(6, 6, 1012, 244);
  fx.fillStyle = '#f7f1df'; fx.font = '900 130px Bebas Neue, sans-serif'; fx.textAlign = 'center';
  fx.fillText('FINISH', 512, 150);
  fx.fillStyle = '#' + new THREE.Color(cfg.glow).getHexString(); fx.font = '700 30px Rajdhani, sans-serif';
  fx.fillText('TOKYO REDLINE', 512, 205);
  const fBanner = new THREE.Mesh(new THREE.PlaneGeometry(14, 3.5), new THREE.MeshBasicMaterial({ map: texFrom(fC), side: THREE.DoubleSide }));
  fBanner.position.set(0, 7.9, -distance); fBanner.rotation.y = Math.PI;
  finish.add(fBanner);
  g.add(finish);
  const finishStrip = new THREE.Mesh(new THREE.BoxGeometry(18, 0.03, 0.15), basic(cfg.accent));
  finishStrip.position.set(0, 0.06, -distance); g.add(finishStrip);
  scene.add(g);
  return { group: g, treeLights, laneLights };
}

function addCity(scene, track, distance, opts = {}) {
  const cfg = track.colors;
  const rand = rng(opts.seed || 7);
  const palette = [cfg.top, 0x1d1830, 0x291541, 0x14182e, 0x331b3d];
  const lit = [cfg.glow, cfg.accent, cfg.warm];
  const winTex = [0, 1, 2].map(i => makeWindowTexture(palette[i], lit[i % 3], 90 + i));
  const winMats = winTex.map(t => new THREE.MeshBasicMaterial({ map: t, toneMapped: false }));
  const bodyMats = palette.map(c => toon(c));
  const buildings = [];
  const zStart = 35, zEnd = -distance - 115;
  for (const side of [-1, 1]) {
    let z = zStart - rand() * 12;
    while (z > zEnd) {
      const w = 5 + rand() * 10;
      const d = 6 + rand() * 11;
      const h = opts.low ? 5 + rand() * 12 : 10 + rand() * (opts.tall ? 68 : 40);
      const x = side * (17 + rand() * 23 + w / 2);
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, [bodyMats[0], bodyMats[1], bodyMats[2], bodyMats[3], winMats[Math.floor(rand() * 3)], winMats[Math.floor(rand() * 3)]]);
      mesh.position.set(x, h / 2, z);
      mesh.rotation.y = (rand() - 0.5) * 0.06;
      scene.add(mesh);
      // Roof neon and antenna.
      const neon = new THREE.Mesh(new THREE.BoxGeometry(w * 0.7, 0.08, 0.12), basic(NEON_COLORS[Math.floor(rand() * NEON_COLORS.length)]));
      neon.position.set(x, h + 0.15, z - d * 0.41);
      scene.add(neon);
      if (rand() > 0.55) {
        const signTex = signTexture(JP_SIGNS[Math.floor(rand() * JP_SIGNS.length)], NEON_COLORS[Math.floor(rand() * NEON_COLORS.length)], { sub: track.short });
        const sign = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 5.2), new THREE.MeshBasicMaterial({ map: signTex, side: THREE.DoubleSide, toneMapped: false }));
        sign.position.set(x - side * (w / 2 + 0.9), 5 + rand() * Math.max(2, h - 7), z);
        sign.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
        scene.add(sign);
        const support = new THREE.Mesh(new THREE.BoxGeometry(0.09, 5.2, 0.09), toon(0x282832));
        support.position.set(sign.position.x + side * 0.03, sign.position.y, z + 0.6);
        scene.add(support);
      }
      if (rand() > 0.65) {
        const billC = canvas2d(512, 192);
        const bx = billC.getContext('2d');
        const c1 = '#' + new THREE.Color(NEON_COLORS[Math.floor(rand() * NEON_COLORS.length)]).getHexString();
        bx.fillStyle = '#07070d'; bx.fillRect(0, 0, 512, 192);
        bx.strokeStyle = c1; bx.lineWidth = 10; bx.strokeRect(8, 8, 496, 176);
        bx.fillStyle = c1; bx.font = '900 93px Bebas Neue'; bx.textAlign = 'center';
        bx.fillText(['DRIFT', 'NIGHT', 'TOKYO', 'TURBO', 'RACING'][Math.floor(rand() * 5)], 256, 120);
        bx.fillStyle = '#f7f1df'; bx.font = '600 26px Rajdhani'; bx.fillText('TOKYO REDLINE', 256, 160);
        const bill = new THREE.Mesh(new THREE.PlaneGeometry(6.5, 2.4), new THREE.MeshBasicMaterial({ map: texFrom(billC), side: THREE.DoubleSide, toneMapped: false }));
        bill.position.set(x - side * (w / 2 + 0.2), h * 0.62, z - d * 0.15);
        bill.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
        scene.add(bill);
      }
      buildings.push(mesh);
      z -= d + 4 + rand() * 8;
    }
  }
  // Streetlight row.
  const lightMat = basic(cfg.accent);
  const poleMat = toon(0x24242e);
  for (const side of [-1, 1]) {
    for (let z = 15; z > -distance - 60; z -= 26) {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.11, 6, 6), poleMat);
      pole.position.set(side * 10.6, 3, z); scene.add(pole);
      const arm = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 0.08), poleMat);
      arm.position.set(side * 9.95, 5.95, z); scene.add(arm);
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), lightMat);
      lamp.position.set(side * 9.35, 5.78, z); scene.add(lamp);
    }
  }
  return buildings;
}

function addTrees(scene, distance, color = 0x1e5a47, blossom = 0xff94b8) {
  const rand = rng(404);
  const trunkMat = toon(0x2a1b19);
  const leafMat = toon(color);
  const blossomMat = toon(blossom);
  const trunkGeo = new THREE.CylinderGeometry(0.14, 0.2, 1.4, 5);
  const leafGeo = new THREE.ConeGeometry(1.35, 3.2, 7);
  const blossomGeo = new THREE.IcosahedronGeometry(1.2, 0);
  for (const side of [-1, 1]) {
    for (let z = 20; z > -distance - 80; z -= 10 + rand() * 10) {
      const x = side * (14 + rand() * 28);
      const scale = 0.7 + rand() * 1.1;
      const t = new THREE.Mesh(trunkGeo, trunkMat);
      t.scale.setScalar(scale); t.position.set(x, 0.7 * scale, z); scene.add(t);
      if (rand() > 0.5) {
        const l = new THREE.Mesh(leafGeo, leafMat);
        l.scale.set(scale, scale, scale); l.position.set(x, 1.6 + 1.4 * scale, z); scene.add(l);
        const l2 = new THREE.Mesh(leafGeo, leafMat);
        l2.scale.setScalar(scale * 0.68); l2.position.set(x, 2.1 + 2.2 * scale, z); scene.add(l2);
      } else {
        for (let i = 0; i < 3; i++) {
          const b = new THREE.Mesh(blossomGeo, blossomMat);
          b.scale.setScalar(scale * (0.6 + rand() * 0.5));
          b.position.set(x + (rand() - 0.5) * 1.6, 2.1 + rand() * 1.1, z + (rand() - 0.5) * 1.6);
          scene.add(b);
        }
      }
    }
  }
}

function addMountains(scene, cfg, distance, strength = 1) {
  const rand = rng(88);
  const mats = [toon(0x23364b), toon(0x2b4454), toon(0x3e5961), toon(0x4b6971)];
  for (let i = 0; i < 18; i++) {
    const side = i % 2 ? 1 : -1;
    const x = side * (55 + rand() * 150);
    const z = 20 - rand() * (distance + 250);
    const h = (30 + rand() * 80) * strength;
    const m = new THREE.Mesh(new THREE.ConeGeometry(h * 0.9, h, 5), mats[Math.floor(rand() * mats.length)]);
    m.position.set(x, h / 2 - 2, z);
    m.rotation.y = rand() * 3;
    scene.add(m);
  }
  // horizon layer
  const far = new THREE.Mesh(new THREE.ConeGeometry(300, 120, 7), toon(0x202c3e));
  far.position.set(-180, 45, -distance - 300); scene.add(far);
}

function addWater(scene, cfg, distance, side = 1) {
  const mat = new THREE.MeshPhongMaterial({ color: 0x0b2f4a, emissive: cfg.top, emissiveIntensity: 0.14, shininess: 90, transparent: true, opacity: 0.92, flatShading: false });
  const water = new THREE.Mesh(new THREE.PlaneGeometry(220, distance + 450), mat);
  water.rotation.x = -Math.PI / 2;
  water.position.set(side * 125, -0.18, -distance / 2);
  scene.add(water);
  const glints = new THREE.Group();
  const rand = rng(66);
  for (let i = 0; i < 60; i++) {
    const gl = new THREE.Mesh(new THREE.PlaneGeometry(0.2 + rand() * 0.6, 8 + rand() * 25), new THREE.MeshBasicMaterial({ color: cfg.accent, transparent: true, opacity: 0.08 + rand() * 0.15, blending: THREE.AdditiveBlending, depthWrite: false }));
    gl.rotation.x = -Math.PI / 2;
    gl.position.set(side * (15 + rand() * 180), 0.02, 20 - rand() * (distance + 220));
    glints.add(gl);
  }
  scene.add(glints);
  return water;
}

function addFerrisWheel(scene, x, z, color) {
  const g = new THREE.Group();
  const metal = toon(0x2c2f43);
  const wheel = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(9, 0.14, 6, 30), metal);
  wheel.add(ring);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(7.6, 0.09, 6, 24), metal);
  ring2.position.z = 0.2; wheel.add(ring2);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.07, 9, 0.07), metal);
    spoke.rotation.z = a; wheel.add(spoke);
    const cabin = rounded(0.8, 0.7, 0.6, 0.08, toon(NEON_COLORS[i % NEON_COLORS.length], NEON_COLORS[i % NEON_COLORS.length], 0.35));
    cabin.position.set(Math.cos(a) * 9, Math.sin(a) * 9, 0);
    wheel.add(cabin);
  }
  wheel.position.set(0, 12, 0);
  g.add(wheel);
  for (const sx of [-1, 1]) {
    const leg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.33, 15, 6), metal);
    leg1.position.set(sx * 5, 6, 0); leg1.rotation.z = sx * 0.18; g.add(leg1);
  }
  const glow = new THREE.PointLight(color, 2.0, 60, 2);
  glow.position.set(0, 14, 3); g.add(glow);
  g.position.set(x, 0, z);
  g.userData.wheel = wheel;
  scene.add(g);
  return g;
}

function addContainers(scene, distance, cfg) {
  const rand = rng(302);
  const colors = [0xd54b3c, 0x2f7ed8, 0xe1aa34, 0x2f9c68, 0xd9793a];
  const mats = colors.map(c => toon(c));
  for (const side of [-1, 1]) {
    for (let i = 0; i < 28; i++) {
      const x = side * (16 + rand() * 20);
      const z = 25 - rand() * (distance + 100);
      const w = 5 + rand() * 3, h = 2.4 + rand() * 1.5, d = 2.5 + rand() * 2;
      const c = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mats[Math.floor(rand() * mats.length)]);
      c.position.set(x, h / 2, z); c.rotation.y = rand() * 0.08;
      scene.add(c);
      if (rand() > 0.7) {
        const c2 = new THREE.Mesh(new THREE.BoxGeometry(w * 0.9, h * 0.75, d), mats[Math.floor(rand() * mats.length)]);
        c2.position.set(x, h + h * 0.38, z); c2.rotation.y = c.rotation.y; scene.add(c2);
      }
    }
  }
  // Cranes
  const craneMat = toon(0x42465a);
  for (let i = 0; i < 8; i++) {
    const side = i % 2 ? 1 : -1;
    const x = side * (35 + rand() * 15);
    const z = 10 - rand() * (distance + 50);
    const mast = new THREE.Mesh(new THREE.BoxGeometry(0.7, 24, 0.7), craneMat);
    mast.position.set(x, 12, z); scene.add(mast);
    const boom = new THREE.Mesh(new THREE.BoxGeometry(20, 0.55, 0.7), craneMat);
    boom.position.set(x - side * 7, 23.5, z); scene.add(boom);
    const light = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), basic(0xff4444));
    light.position.set(x, 25, z); scene.add(light);
  }
}

function addPalms(scene, distance) {
  const rand = rng(181);
  const trunkMat = toon(0x6b4634);
  const leafMat = toon(0x1d8d66);
  for (const side of [-1, 1]) {
    for (let z = 30; z > -distance - 80; z -= 16 + rand() * 10) {
      const x = side * (13 + rand() * 5);
      const h = 5 + rand() * 4;
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.3, h, 6), trunkMat);
      trunk.position.set(x, h / 2, z); trunk.rotation.z = side * 0.06; scene.add(trunk);
      for (let i = 0; i < 7; i++) {
        const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.7, 3.4, 4), leafMat);
        const a = (i / 7) * Math.PI * 2;
        leaf.position.set(x + Math.cos(a) * 1.1, h + 0.2 + Math.sin(a) * 0.2, z + Math.sin(a) * 1.1);
        leaf.rotation.z = Math.cos(a) * 1.2; leaf.rotation.x = Math.sin(a) * 1.2;
        leaf.scale.set(0.5, 1, 0.5);
        scene.add(leaf);
      }
    }
  }
}

function addFields(scene, distance) {
  const rand = rng(901);
  const water = new THREE.MeshPhongMaterial({ color: 0x355f5a, emissive: 0x152c2b, emissiveIntensity: 0.2, shininess: 70 });
  const soil = toon(0x5e543d);
  for (const side of [-1, 1]) {
    for (let i = 0; i < 18; i++) {
      const x = side * (18 + (i % 4) * 17);
      const z = 18 - (i * 28 + rand() * 15);
      if (z < -distance - 80) continue;
      const p = new THREE.Mesh(new THREE.PlaneGeometry(12, 18), water);
      p.rotation.x = -Math.PI / 2; p.position.set(x, -0.08, z); scene.add(p);
      for (let r = 0; r < 3; r++) {
        const furrow = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.06, 18), soil);
        furrow.position.set(x - 4 + r * 4, 0.02, z); scene.add(furrow);
      }
      if (rand() > 0.6) {
        const house = rounded(4.4, 2.8, 3.8, 0.25, toon(0xe8dfcb));
        house.position.set(x + side * 8, 1.4, z + 5); scene.add(house);
        const roof = new THREE.Mesh(new THREE.ConeGeometry(3.7, 1.8, 4), toon(0x39334b));
        roof.rotation.y = Math.PI / 4; roof.position.set(x + side * 8, 3.7, z + 5); scene.add(roof);
        const warm = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.45), basic(0xffcf73));
        warm.position.set(x + side * 8 - side * 2.21, 1.5, z + 5); warm.rotation.y = side * Math.PI / 2; scene.add(warm);
      }
    }
  }
}

function addTorii(scene, x, z, scale = 1, color = 0xe13a43) {
  const g = new THREE.Group();
  const red = toon(color);
  const black = toon(0x1a1518);
  for (const sx of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.38, 6, 8), red);
    post.position.set(sx * 3.2, 3, 0); g.add(post);
  }
  const top = new THREE.Mesh(new THREE.BoxGeometry(8.4, 0.65, 0.55), red);
  top.position.y = 6.1; g.add(top);
  const beam = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.4, 0.4), red);
  beam.position.y = 5.2; g.add(beam);
  const crown = new THREE.Mesh(new THREE.BoxGeometry(9.2, 0.25, 0.7), black);
  crown.position.y = 6.5; g.add(crown);
  g.position.set(x, 0, z); g.scale.setScalar(scale);
  g.rotation.y = Math.PI / 2;
  scene.add(g);
  return g;
}

function addHologram(scene, distance, cfg) {
  const g = new THREE.Group();
  const colors = [cfg.glow, cfg.accent, 0xa34dff];
  for (let i = 0; i < 8; i++) {
    const z = -40 - i * (distance / 8);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(11 + i * 0.4, 0.09, 6, 48), basic(colors[i % 3], 0.65));
    ring.position.set(0, 7 + Math.sin(i) * 1.4, z);
    ring.rotation.x = Math.PI / 2;
    g.add(ring);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(8 + i * 0.3, 0.05, 6, 40), basic(colors[(i + 1) % 3], 0.45));
    ring2.position.copy(ring.position); ring2.rotation.x = Math.PI / 2; ring2.rotation.z = i * 0.25;
    g.add(ring2);
    const pillarMat = basic(colors[i % 3], 0.35);
    for (const side of [-1, 1]) {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.09, 15, 0.09), pillarMat);
      pillar.position.set(side * 16, 7.5, z); g.add(pillar);
    }
  }
  // Neon grid ground off the shoulders.
  const grid = new THREE.GridHelper(400, 40, cfg.accent, cfg.glow);
  grid.position.set(0, -0.05, -distance / 2);
  grid.material.transparent = true; grid.material.opacity = 0.23;
  scene.add(grid);
  scene.add(g);
  return g;
}

function addGarage(scene, cfg, distance) {
  const wallMat = toon(0x1d1a23);
  const ribMat = toon(0x302b39);
  const ceilingY = 9.2;
  for (const side of [-1, 1]) {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(0.5, ceilingY, distance + 130), wallMat);
    wall.position.set(side * 16, ceilingY / 2, -distance / 2 + 10); scene.add(wall);
    for (let z = 30; z > -distance - 80; z -= 28) {
      const col = new THREE.Mesh(new THREE.BoxGeometry(1.1, ceilingY, 1.1), ribMat);
      col.position.set(side * 12.5, ceilingY / 2, z); scene.add(col);
      const neon = new THREE.Mesh(new THREE.BoxGeometry(0.1, 5.0, 0.12), basic(side > 0 ? cfg.accent : cfg.glow));
      neon.position.set(side * 11.92, 3.1, z); scene.add(neon);
      const light = new THREE.PointLight(side > 0 ? cfg.accent : cfg.glow, 0.8, 22, 2);
      light.position.set(side * 9, 4.5, z); scene.add(light);
    }
  }
  const ceiling = new THREE.Mesh(new THREE.BoxGeometry(32, 0.4, distance + 130), toon(0x131118));
  ceiling.position.set(0, ceilingY, -distance / 2 + 10); scene.add(ceiling);
  for (let z = 20; z > -distance - 60; z -= 14) {
    const tube = new THREE.Mesh(new THREE.BoxGeometry(12, 0.08, 0.12), basic(cfg.warm));
    tube.position.set(0, ceilingY - 0.35, z); scene.add(tube);
  }
  // Ceiling signage.
  for (let i = 0; i < 6; i++) {
    const z = -35 - i * 100;
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(8, 1.5), new THREE.MeshBasicMaterial({ map: signTexture('地下駐車場', i % 2 ? cfg.accent : cfg.glow, { vertical: false, fontSize: 88, sub: 'LEVEL ' + (i + 1) }), side: THREE.DoubleSide, toneMapped: false }));
    sign.position.set(0, 7.6, z); scene.add(sign);
  }
}

function addAirport(scene, cfg, distance) {
  const rand = rng(618);
  // hangars and runway lights
  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      const z = -50 - i * 170;
      const hangar = rounded(18, 8, 24, 0.3, toon(0x3a4355));
      hangar.position.set(side * 36, 4, z); scene.add(hangar);
      const door = new THREE.Mesh(new THREE.PlaneGeometry(13, 6), toon(0x1c2230));
      door.position.set(side * (36 - 9.02), 3.3, z); door.rotation.y = side * -Math.PI / 2; scene.add(door);
    }
    for (let z = 30; z > -distance - 120; z -= 20) {
      const light = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.16, 0.35), basic(cfg.accent));
      light.position.set(side * 14, 0.2, z); scene.add(light);
    }
  }
  // Control tower.
  const tower = new THREE.Group();
  const body = rounded(4, 16, 4, 0.2, toon(0xcad4df));
  body.position.y = 8; tower.add(body);
  const cabin = rounded(7, 3.5, 7, 0.2, toon(0x202c3f));
  cabin.position.y = 17; tower.add(cabin);
  const glassBand = new THREE.Mesh(new THREE.BoxGeometry(7.1, 1.3, 7.1), basic(0x7ad8ff, 0.5));
  glassBand.position.y = 17.5; tower.add(glassBand);
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 6), basic(0xff3b4e));
  beacon.position.y = 20; tower.add(beacon);
  tower.position.set(34, 0, -90); scene.add(tower);
  // Planes.
  for (let i = 0; i < 3; i++) {
    const plane = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(1.1, 9, 4, 8), toon(0xf0f2ef));
    body.rotation.z = Math.PI / 2; plane.add(body);
    const wing = new THREE.Mesh(new THREE.BoxGeometry(16, 0.25, 2.6), toon(0xe4e9ee));
    wing.position.y = 0.1; plane.add(wing);
    const tail = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.9, 0.25), toon(0xff4d58));
    tail.position.set(-4.6, 0.9, 0); plane.add(tail);
    plane.position.set(-45 - i * 18, 0.6, -140 - i * 150);
    plane.rotation.y = 0.3 + rand() * 0.4;
    scene.add(plane);
  }
}

function addCountryside(scene, cfg, distance) {
  addMountains(scene, cfg, distance, 0.8);
  addFields(scene, distance);
  const rand = rng(771);
  // Power lines.
  for (const side of [-1, 1]) {
    for (let z = 24; z > -distance - 100; z -= 45) {
      const x = side * 12.4;
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, 8.5, 5), toon(0x4c4038));
      pole.position.set(x, 4.25, z); scene.add(pole);
      const arm = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.13, 0.13), toon(0x4c4038));
      arm.position.set(x, 7.5, z); scene.add(arm);
    }
    const lineMat = new THREE.LineBasicMaterial({ color: 0x1e1c22, transparent: true, opacity: 0.8 });
    for (let j = 0; j < 2; j++) {
      const pts = [];
      for (let z = 24; z > -distance - 100; z -= 45) pts.push(new THREE.Vector3(side * 12.4 + (j ? 1.4 : -1.4), 7.5, z));
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat);
      scene.add(line);
    }
  }
  // Torii over the strip.
  for (let i = 0; i < 3; i++) addTorii(scene, 0, -120 - i * 220, 1.4, i === 1 ? 0xe47648 : 0xe13a43);
}

function addRain(scene, range = 70, count = 700) {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 6);
  const rand = rng(44);
  for (let i = 0; i < count; i++) {
    const x = (rand() - 0.5) * 80;
    const y = rand() * 40;
    const z = 25 - rand() * range;
    positions[i * 6] = x; positions[i * 6 + 1] = y; positions[i * 6 + 2] = z;
    positions[i * 6 + 3] = x + 0.04; positions[i * 6 + 4] = y - 1.2; positions[i * 6 + 5] = z;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.LineBasicMaterial({ color: 0x9fdfff, transparent: true, opacity: 0.24, blending: THREE.AdditiveBlending, depthWrite: false });
  const rain = new THREE.LineSegments(geo, mat);
  scene.add(rain);
  return { mesh: rain, positions, count };
}

export function createShowroom(scene) {
  scene.background = new THREE.Color(0x08060f);
  scene.fog = new THREE.Fog(0x08060f, 18, 55);
  const group = new THREE.Group();
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x14111d, roughness: 0.28, metalness: 0.68 });
  const floor = new THREE.Mesh(new THREE.CircleGeometry(20, 48), floorMat);
  floor.rotation.x = -Math.PI / 2; group.add(floor);
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(3.35, 3.5, 0.18, 48), new THREE.MeshStandardMaterial({ color: 0x1b1725, roughness: 0.2, metalness: 0.9 }));
  disc.position.y = 0.09; group.add(disc);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.06, 8, 64), new THREE.MeshBasicMaterial({ color: 0xff2d9a, toneMapped: false }));
  rim.rotation.x = Math.PI / 2; rim.position.y = 0.19; group.add(rim);
  const rim2 = new THREE.Mesh(new THREE.TorusGeometry(4.7, 0.025, 8, 64), new THREE.MeshBasicMaterial({ color: 0x29f3e0, toneMapped: false }));
  rim2.rotation.x = Math.PI / 2; rim2.position.y = 0.02; group.add(rim2);
  const grid = new THREE.GridHelper(36, 36, 0x2c2740, 0x1b1828);
  grid.position.y = 0.005; group.add(grid);

  const bg = new THREE.Mesh(new THREE.PlaneGeometry(50, 22), new THREE.MeshBasicMaterial({ color: 0x0b0714 }));
  bg.position.set(0, 10, -19); group.add(bg);

  // Stylised city silhouette.
  const rand = rng(5);
  for (let i = 0; i < 26; i++) {
    const side = i % 2 ? 1 : -1;
    const w = 2 + rand() * 4;
    const h = 3 + rand() * 11;
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 2 + rand() * 3), new THREE.MeshToonMaterial({ color: 0x191426 }));
    b.position.set(side * (6 + rand() * 17), h / 2, -12 - rand() * 20);
    group.add(b);
    for (let k = 0; k < 4; k++) {
      if (rand() > 0.45) {
        const win = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.22), new THREE.MeshBasicMaterial({ color: NEON_COLORS[Math.floor(rand() * NEON_COLORS.length)], transparent: true, opacity: 0.6 }));
        win.position.set(b.position.x + (rand() - 0.5) * w * 0.6, 1 + rand() * h * 0.8, -12 + w / 2 + 0.02);
        group.add(win);
      }
    }
  }

  // Neon arch frames behind the car.
  for (const [x, color] of [[-7, 0x22e4ff], [7, 0xff2d9a]]) {
    const arch = new THREE.Group();
    const bar = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.035, 6, 32, Math.PI), new THREE.MeshBasicMaterial({ color, toneMapped: false }));
    bar.rotation.z = 0; bar.position.y = 4; arch.add(bar);
    const line = new THREE.Mesh(new THREE.BoxGeometry(0.05, 4, 0.05), new THREE.MeshBasicMaterial({ color, toneMapped: false }));
    line.position.set(-4.2, 2, 0); arch.add(line);
    const line2 = line.clone(); line2.position.x = 4.2; arch.add(line2);
    arch.position.set(x, 0, -4.2);
    group.add(arch);
  }

  // Hanging lanterns.
  for (let i = 0; i < 12; i++) {
    const color = NEON_COLORS[i % NEON_COLORS.length];
    const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), new THREE.MeshBasicMaterial({ color, toneMapped: false }));
    lantern.position.set(-6 + (i % 6) * 2.4, 2.8 + Math.floor(i / 6) * 1.1, -3.5);
    group.add(lantern);
    const string = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 1, 4), new THREE.MeshBasicMaterial({ color: 0x292633 }));
    string.position.copy(lantern.position); string.position.y += 0.58; group.add(string);
  }

  // Wall sign.
  const c = canvas2d(1024, 256);
  const x = c.getContext('2d');
  x.fillStyle = '#08060f'; x.fillRect(0, 0, 1024, 256);
  x.strokeStyle = '#ff2d9a'; x.lineWidth = 5; x.strokeRect(6, 6, 1012, 244);
  x.fillStyle = '#ff2d9a'; x.font = '900 150px Bebas Neue, sans-serif'; x.textAlign = 'center';
  x.fillText('TOKYO REDLINE', 512, 145);
  x.fillStyle = '#8ef8eb'; x.font = '900 34px "Noto Sans JP", sans-serif';
  x.fillText('東京 ・ 夜間走行', 512, 210);
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(12.8, 3.2), new THREE.MeshBasicMaterial({ map: texFrom(c), toneMapped: false }));
  sign.position.set(0, 8.8, -18.5);
  group.add(sign);

  // Vertical signs.
  ['夜間', '速度', '夢'].forEach((t, i) => {
    const color = NEON_COLORS[i];
    const ms = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 5.2), new THREE.MeshBasicMaterial({ map: signTexture(t, color), side: THREE.DoubleSide, toneMapped: false }));
    ms.position.set(-13 + i * 13, 5.2, -15.5);
    group.add(ms);
  });

  // Podium lights.
  const key = new THREE.SpotLight(0xffe5d5, 4.5, 40, 0.7, 0.7, 1.2);
  key.position.set(5, 13, 10); key.target.position.set(0, 0.5, 0); group.add(key, key.target);
  const pink = new THREE.PointLight(0xff2d9a, 18, 30, 2); pink.position.set(-8, 4, 2); group.add(pink);
  const cyan = new THREE.PointLight(0x22e4ff, 15, 28, 2); cyan.position.set(8, 3, -2); group.add(cyan);
  const warm = new THREE.PointLight(0xffc56a, 8, 16, 2); warm.position.set(0, 6, 4); group.add(warm);
  const spot = new THREE.PointLight(0xffffff, 5, 12, 2); spot.position.set(0, 5, -3); group.add(spot);

  // Dust/particles.
  const pGeo = new THREE.BufferGeometry();
  const pArr = new Float32Array(220 * 3);
  for (let i = 0; i < 220; i++) {
    pArr[i * 3] = (rand() - 0.5) * 24;
    pArr[i * 3 + 1] = rand() * 9;
    pArr[i * 3 + 2] = (rand() - 0.5) * 18;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3));
  const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xb89cff, size: 0.035, transparent: true, opacity: 0.55, depthWrite: false }));
  group.add(particles);

  const hemi = new THREE.HemisphereLight(0x8fcfff, 0x160b22, 1.4);
  group.add(hemi);
  const rimLight = new THREE.DirectionalLight(0x7b9dff, 0.8); rimLight.position.set(-6, 8, -4); group.add(rimLight);

  scene.add(group);
  return {
    group, particles,
    update(t) {
      particles.rotation.y = t * 0.01;
      rim.rotation.z = t * 0.06;
      rim2.rotation.z = -t * 0.04;
      sign.material.opacity = 0.9 + Math.sin(t * 2.2) * 0.1;
    },
    setTheme(track) {
      pink.color.setHex(track.colors.glow);
      cyan.color.setHex(track.colors.accent);
    }
  };
}

export function createRaceEnvironment(scene, track, distance) {
  scene.background = new THREE.Color(track.colors.top);
  scene.fog = new THREE.FogExp2(track.colors.fog, track.kind === 'garage' ? 0.012 : track.kind === 'city' ? 0.0085 : 0.0042);
  const group = new THREE.Group();
  const cfg = track.colors;
  const random = rng((track.id.charCodeAt(0) + distance) | 0);

  addSky(scene, cfg, track.kind);
  if (['city', 'osaka', 'future', 'mountain', 'waterfront', 'harbour', 'garage'].includes(track.kind)) addStars(scene, cfg.accent);

  addRoad(scene, track, distance);
  const gantry = addStartGantry(scene, track, distance);

  const kinds = new Set(track.props || []);
  if (track.kind === 'city' || track.kind === 'future') addCity(scene, track, distance, { seed: 17, tall: track.kind === 'future' });
  if (track.kind === 'osaka') addCity(scene, track, distance, { seed: 30, low: true });
  if (track.kind === 'waterfront') {
    addCity(scene, track, distance, { seed: 48, low: true });
    addWater(scene, cfg, distance, 1);
    addContainers(scene, distance, cfg);
    const ferris = addFerrisWheel(scene, 76, -105, cfg.glow);
    group.userData.ferris = ferris;
  }
  if (track.kind === 'mountain') {
    addMountains(scene, cfg, distance, 1.2);
    addTrees(scene, distance, 0x184c3f, 0xff9ec6);
    addTorii(scene, 0, -70, 1.2, 0xdd3a4b);
  }
  if (track.kind === 'garage') addGarage(scene, cfg, distance);
  if (track.kind === 'harbour') {
    addContainers(scene, distance, cfg);
    addWater(scene, cfg, distance, -1);
    addMountains(scene, cfg, distance, 0.25);
  }
  if (track.kind === 'airport') addAirport(scene, cfg, distance);
  if (track.kind === 'coast') {
    addWater(scene, cfg, distance, 1);
    addPalms(scene, distance);
    addFerrisWheel(scene, 82, -220, cfg.warm);
    addCity(scene, track, distance, { seed: 73, low: true });
  }
  if (track.kind === 'countryside') addCountryside(scene, cfg, distance);
  if (track.kind === 'future') {
    addHologram(scene, distance, cfg);
    addCity(scene, track, distance, { seed: 211, tall: true });
  }

  // Ground mist/haze.
  const haze = new THREE.Mesh(new THREE.PlaneGeometry(350, distance + 500), new THREE.MeshBasicMaterial({ color: cfg.fog, transparent: true, opacity: 0.12, depthWrite: false }));
  haze.rotation.x = -Math.PI / 2; haze.position.set(0, 0.12, -distance / 2); scene.add(haze);

  // Start-line crowd.
  const crowdGroup = new THREE.Group();
  const crowdRand = rng(101);
  const crowdCount = Math.floor(120 * (track.crowd || 1));
  const bodyGeo = new THREE.CapsuleGeometry(0.16, 0.4, 3, 5);
  const headGeo = new THREE.SphereGeometry(0.14, 6, 5);
  const colors = [0xff4d84, 0x3bffd7, 0xffd84a, 0x8d5bff, 0xff7a42, 0xf4efe1];
  const crowdMats = colors.map(c => new THREE.MeshToonMaterial({ color: c }));
  for (let i = 0; i < crowdCount; i++) {
    const side = i % 2 ? 1 : -1;
    const x = side * (15 + crowdRand() * 7);
    const row = Math.floor(crowdRand() * 5);
    const z = 15 - crowdRand() * 55;
    const person = new THREE.Mesh(bodyGeo, crowdMats[Math.floor(crowdRand() * colors.length)]);
    person.position.set(x, 0.85 + row * 0.32, z);
    person.rotation.y = crowdRand() * 6;
    crowdGroup.add(person);
    const head = new THREE.Mesh(headGeo, new THREE.MeshToonMaterial({ color: crowdRand() > 0.5 ? 0xd8a476 : 0x7d573f }));
    head.position.set(x, 1.3 + row * 0.32, z); crowdGroup.add(head);
  }
  scene.add(crowdGroup);

  // Light arch reflections on the ground.
  for (let i = 0; i < 5; i++) {
    const z = -8 - i * (distance / 5);
    const strip = new THREE.Mesh(new THREE.PlaneGeometry(18, 0.7), new THREE.MeshBasicMaterial({ color: i % 2 ? cfg.glow : cfg.accent, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending, depthWrite: false }));
    strip.rotation.x = -Math.PI / 2; strip.position.set(0, 0.05, z); scene.add(strip);
  }

  let rain = null;
  if (track.rain) rain = addRain(scene);

  // Global light rig.
  const hemi = new THREE.HemisphereLight(cfg.top, 0x1b1119, 1.5); scene.add(hemi);
  const moon = new THREE.DirectionalLight(cfg.accent, 1.25); moon.position.set(-30, 40, -30); scene.add(moon);
  const rim = new THREE.DirectionalLight(cfg.glow, 1.1); rim.position.set(35, 25, 20); scene.add(rim);
  const startLight = new THREE.PointLight(cfg.glow, 12, 60, 2); startLight.position.set(0, 8, -3); scene.add(startLight);
  const finishLight = new THREE.PointLight(cfg.accent, 14, 70, 2); finishLight.position.set(0, 8, -distance); scene.add(finishLight);
  const ambient = new THREE.AmbientLight(0xffffff, 0.22); scene.add(ambient);

  const tempColor = new THREE.Color();
  function setStartLights(step) {
    // step: -1 all off, 0 amber1, 1 amber2, 2 amber3, 3 green.
    for (const set of [gantry.treeLights, gantry.laneLights]) {
      set.forEach((l, i) => {
        let on = false;
        if (step === 3) on = i === 3;
        else if (step >= 0) on = i <= step;
        if (on) {
          l.mat.color.setHex(l.color);
          l.mesh.scale.setScalar(1.2 + (step === 3 ? Math.sin(performance.now() * 0.02) * 0.08 : 0));
        } else {
          l.mat.color.setHex(0x201e26);
          l.mesh.scale.setScalar(1);
        }
      });
    }
    tempColor.setHex(step === 3 ? cfg.accent : step >= 0 ? cfg.warm : cfg.fog);
    startLight.color.copy(tempColor);
    startLight.intensity = step >= 0 ? 16 : 4;
  }
  setStartLights(-1);

  const clockStart = performance.now();
  return {
    group, setStartLights, gantry,
    update(dt, elapsed, speed = 0) {
      if (rain) {
        const p = rain.positions;
        for (let i = 0; i < rain.count; i++) {
          p[i * 6 + 1] -= dt * (32 + speed * 0.8);
          p[i * 6 + 4] -= dt * (32 + speed * 0.8);
          if (p[i * 6 + 1] < 0) {
            p[i * 6 + 1] += 40; p[i * 6 + 4] += 40;
            p[i * 6] = (Math.random() - 0.5) * 80; p[i * 6 + 3] = p[i * 6] + 0.04;
          }
        }
        rain.mesh.geometry.attributes.position.needsUpdate = true;
        rain.mesh.position.z = Math.max(-35, -speed * 0.4);
      }
      if (group.userData.ferris) group.userData.ferris.userData.wheel.rotation.z = elapsed * 0.06;
      // crowd bounce
      // (cheap: only a subtle group bob)
      crowdGroup.position.y = Math.sin(elapsed * 3.1) * 0.03;
    }
  };
}

export { addStars, signTexture, radialTexture, texFrom, makeWindowTexture };
