import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { PAINTS, BODY_KITS, SPOILERS, WHEELS, UNDERGLOW, HEADLIGHTS, DECALS, INTERIORS, SEATS, KNOBS, EXHAUSTS } from './data.js';

/* Shared gear pattern. x and y are -1..1 gate coordinates. */
export const GEAR_GATES = {
  1: { x: -1, y: -1 }, 2: { x: -1, y: 1 },
  3: { x: 0, y: -1 }, 4: { x: 0, y: 1 },
  5: { x: 1, y: -1 }, 6: { x: 1, y: 1 },
  R: { x: 2, y: 1 }, N: { x: 0.5, y: 0 }
};

let gradientMap = null;
function toonGradient() {
  if (gradientMap) return gradientMap;
  const data = new Uint8Array([80, 140, 195, 238, 255]);
  gradientMap = new THREE.DataTexture(data, 5, 1, THREE.RedFormat);
  gradientMap.minFilter = THREE.NearestFilter;
  gradientMap.magFilter = THREE.NearestFilter;
  gradientMap.needsUpdate = true;
  return gradientMap;
}

const matCache = new Map();
function toon(color, opts = {}) {
  const key = `${color}-${opts.emissive || 0}-${opts.emissiveIntensity || 0}-${opts.transparent || 0}`;
  if (!opts.fresh && matCache.has(key)) return matCache.get(key);
  const m = new THREE.MeshToonMaterial({
    color,
    gradientMap: toonGradient(),
    ...(opts.emissive ? { emissive: opts.emissive, emissiveIntensity: opts.emissiveIntensity || 1 } : {}),
    ...(opts.transparent ? { transparent: true, opacity: opts.opacity ?? 1, depthWrite: opts.depthWrite ?? true } : {})
  });
  if (!opts.fresh) matCache.set(key, m);
  return m;
}

function glass(color = 0x93e6ff, opacity = 0.26) {
  return new THREE.MeshPhongMaterial({ color, transparent: true, opacity, shininess: 150, specular: 0xffffff, depthWrite: false, side: THREE.DoubleSide });
}

function metal(color = 0xd7dce8, rough = 0.35) {
  return new THREE.MeshStandardMaterial({ color, metalness: 0.85, roughness: rough });
}

export function rounded(w, h, d, r, material) {
  const geo = new RoundedBoxGeometry(w, h, d, 2, Math.min(r, Math.min(w, h, d) * 0.45));
  return new THREE.Mesh(geo, material);
}

function beamBetween(a, b, radius, mat, segments = 6) {
  const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b);
  const dir = end.clone().sub(start);
  const len = dir.length();
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, len, segments), mat);
  mesh.position.copy(start).add(end).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return mesh;
}

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

function canvasTexture(canvas) {
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function addInk(mesh, scale = 1.025) {
  const ink = new THREE.Mesh(mesh.geometry, new THREE.MeshBasicMaterial({ color: 0x090910, side: THREE.BackSide }));
  ink.scale.multiplyScalar(scale);
  ink.renderOrder = -1;
  mesh.add(ink);
  return ink;
}

function decalTexture(kind, accent, paint, car) {
  const c = makeCanvas(512, 256);
  const x = c.getContext('2d');
  const hex = (n) => '#' + new THREE.Color(n).getHexString();
  x.clearRect(0, 0, 512, 256);
  if (kind === 'stripe') {
    x.fillStyle = hex(accent);
    x.fillRect(0, 40, 512, 34);
    x.fillRect(0, 92, 512, 12);
    x.fillStyle = 'rgba(255,255,255,.55)';
    x.fillRect(0, 76, 512, 4);
  } else if (kind === 'rising') {
    x.fillStyle = '#e9263d';
    x.beginPath(); x.arc(256, 128, 82, 0, Math.PI * 2); x.fill();
    x.strokeStyle = '#e9263d'; x.lineWidth = 13;
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      x.beginPath(); x.moveTo(256 + Math.cos(a) * 108, 128 + Math.sin(a) * 108);
      x.lineTo(256 + Math.cos(a) * 160, 128 + Math.sin(a) * 160); x.stroke();
    }
    x.fillStyle = '#fff7df'; x.font = '900 28px Rajdhani, sans-serif'; x.textAlign = 'center';
    x.fillText('RISING', 256, 138);
  } else if (kind === 'kanji') {
    x.fillStyle = hex(accent); x.font = '900 96px "Noto Sans JP", sans-serif'; x.textAlign = 'center';
    x.fillText('夜', 110, 108);
    x.fillStyle = '#f7f3e6'; x.font = 'italic 900 54px Bebas Neue, sans-serif';
    x.fillText('NIGHT RUNNER', 280, 100);
    x.fillStyle = hex(accent); x.fillRect(164, 125, 220, 5);
    x.font = '500 22px Rajdhani, sans-serif'; x.fillStyle = '#f7f3e6';
    x.fillText('TOKYO · 03:00 AM', 282, 166);
  } else if (kind === 'lightning') {
    x.strokeStyle = hex(accent); x.lineWidth = 10; x.lineJoin = 'round';
    x.beginPath(); x.moveTo(40, 30); x.lineTo(190, 96); x.lineTo(120, 112); x.lineTo(310, 230);
    x.lineTo(270, 148); x.lineTo(460, 166); x.stroke();
    x.strokeStyle = 'rgba(255,255,255,.7)'; x.lineWidth = 3; x.stroke();
  } else if (kind === 'camo') {
    const cols = [hex(accent), '#7cffcb', '#1b1430', '#ff5c8a'];
    for (let i = 0; i < 28; i++) {
      x.fillStyle = cols[i % cols.length]; x.globalAlpha = 0.7;
      x.beginPath(); x.ellipse(Math.random() * 512, Math.random() * 256, 22 + Math.random() * 42, 14 + Math.random() * 28, Math.random() * 4, 0, 7); x.fill();
    }
    x.globalAlpha = 1;
  }
  // small sponsor marks for every decal
  if (kind !== 'none') {
    x.fillStyle = 'rgba(255,255,255,.75)';
    x.font = '700 18px Rajdhani, sans-serif'; x.textAlign = 'left';
    x.fillText((car.make || 'JDM') + '  ///  ' + car.short, 20, 228);
  }
  return canvasTexture(c);
}

function resolvePaint(car, build) {
  if (!build.paint || build.paint === 'factory') {
    return { ...PAINTS[0], color: car.color, accent: car.accent, name: 'Factory Colour' };
  }
  return PAINTS.find(p => p.id === build.paint) || { ...PAINTS[0], color: car.color, accent: car.accent };
}

function sideDecal(car, build, W, L) {
  const kind = build.decal || DECALS.none.id;
  if (kind === 'none') return null;
  const paint = resolvePaint(car, build);
  const tex = decalTexture(kind, paint.accent, paint.color, car);
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
  const group = new THREE.Group();
  for (const side of [-1, 1]) {
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(L * 0.47, L * 0.16), mat);
    plane.position.set(side * (W / 2 + 0.012), 0.66, 0.08);
    plane.rotation.y = side * Math.PI / 2;
    group.add(plane);
  }
  return group;
}

function licensePlate(car) {
  const c = makeCanvas(192, 96);
  const x = c.getContext('2d');
  x.fillStyle = '#d9f5df'; x.fillRect(0, 0, 192, 96);
  x.strokeStyle = '#2b6b4a'; x.lineWidth = 6; x.strokeRect(4, 4, 184, 88);
  x.fillStyle = '#1c4736'; x.font = '700 20px Rajdhani, sans-serif'; x.textAlign = 'center';
  x.fillText('SHINJUKU  ' + (300 + (car.year % 200)), 96, 35);
  x.font = '900 41px Rajdhani, sans-serif'; x.fillText(car.short.slice(0, 8), 96, 78);
  const tex = canvasTexture(c);
  return new THREE.MeshBasicMaterial({ map: tex });
}

function makeWheel(car, build, radius, width, side) {
  const g = new THREE.Group();
  const style = WHEELS[build.wheels] || WHEELS.mesh;
  const tireMat = new THREE.MeshToonMaterial({ color: 0x111116, gradientMap: toonGradient() });
  const tire = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, width, 22), tireMat);
  tire.rotation.z = Math.PI / 2;
  g.add(tire);
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.68, radius * 0.68, width + 0.012, 20), metal(style.rim, 0.26));
  rim.rotation.z = Math.PI / 2;
  g.add(rim);
  const lip = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.68, radius * 0.045, 5, 20), metal(style.kind === 'chrome' ? 0xffffff : 0xd8dbe5, 0.2));
  lip.rotation.y = Math.PI / 2;
  lip.position.x = side * (width / 2 + 0.004);
  g.add(lip);
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.54, radius * 0.54, 0.035, 18), metal(0x5a5f69, 0.55));
  disc.rotation.z = Math.PI / 2;
  g.add(disc);
  const caliper = rounded(0.035, 0.16, 0.13, 0.02, new THREE.MeshBasicMaterial({ color: 0xffc62b }));
  caliper.position.set(side * 0.13, 0.06, 0.13);
  g.add(caliper);
  const spokeCount = style.kind === 'six' ? 6 : style.kind === 'mesh' ? 8 : style.kind === 'blade' ? 3 : style.kind === 'star' ? 5 : 6;
  for (let i = 0; i < spokeCount; i++) {
    const angle = (i / spokeCount) * Math.PI * 2;
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.032, radius * 0.62, style.kind === 'mesh' ? 0.038 : 0.06), metal(style.rim, 0.3));
    spoke.position.set(side * (width * 0.37), Math.cos(angle) * radius * 0.28, Math.sin(angle) * radius * 0.28);
    spoke.rotation.x = angle;
    g.add(spoke);
  }
  if (style.kind === 'dish') {
    const dish = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.67, radius * 0.58, 0.11, 18), metal(style.rim, 0.15));
    dish.rotation.z = Math.PI / 2;
    dish.position.x = side * 0.07;
    g.add(dish);
  }
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.17, radius * 0.17, 0.03, 14), metal(0x25272d, 0.2));
  cap.rotation.z = Math.PI / 2;
  cap.position.x = side * (width * 0.4);
  g.add(cap);
  return g;
}

function buildSpoiler(kind, d, W, paint, accent, ink = true) {
  const g = new THREE.Group();
  const mat = toon(paint, { fresh: true });
  const dark = toon(0x15141a);
  const z = d.length * 0.44;
  if (kind === 'duck') {
    const duck = rounded(W * 0.8, 0.055, 0.28, 0.06, mat);
    duck.position.set(0, 0.98, z + 0.02); duck.rotation.x = -0.18; g.add(duck);
  } else if (kind === 'gt') {
    for (const x of [-W * 0.34, W * 0.34]) {
      const up = rounded(0.05, 0.34, 0.09, 0.025, dark);
      up.position.set(x, 1.03, z - 0.04); g.add(up);
    }
    const wing = rounded(W * 0.98, 0.055, 0.34, 0.04, mat);
    wing.position.set(0, 1.24, z + 0.02); wing.rotation.x = -0.1; g.add(wing);
    if (ink) addInk(wing, 1.035);
    for (const x of [-W * 0.49, W * 0.49]) {
      const plate = rounded(0.035, 0.19, 0.36, 0.02, accentMat(accent));
      plate.position.set(x, 1.22, z + 0.02); g.add(plate);
    }
  } else if (kind === 'tower') {
    for (const x of [-W * 0.4, W * 0.4]) {
      const up = rounded(0.055, 0.5, 0.11, 0.025, dark);
      up.position.set(x, 1.07, z - 0.02); g.add(up);
    }
    const wing = rounded(W * 1.02, 0.07, 0.4, 0.035, mat);
    wing.position.set(0, 1.35, z + 0.05); wing.rotation.x = -0.12; g.add(wing);
    if (ink) addInk(wing, 1.04);
    for (const x of [-W * 0.54, W * 0.54]) {
      const plate = rounded(0.04, 0.28, 0.46, 0.02, accentMat(accent));
      plate.position.set(x, 1.33, z + 0.05); g.add(plate);
    }
  } else {
    const lip = rounded(W * 0.72, 0.04, 0.18, 0.02, dark);
    lip.position.set(0, 0.9, z); g.add(lip);
  }
  return g;
}

function accentMat(color) { return toon(color, { fresh: true }); }

function buildPedals(mat, accent) {
  const g = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const pedal = new THREE.Group();
    const pad = rounded(0.11, 0.18, 0.035, 0.02, i === 0 ? mat : metal(0x9ba0ac, 0.45));
    pad.position.y = -0.08;
    const arm = rounded(0.035, 0.25, 0.03, 0.01, metal(0x51545d, 0.6));
    arm.position.y = 0.04;
    pedal.add(pad, arm);
    pedal.position.set(-0.12 + i * 0.13, 0.37, -0.77);
    pedal.rotation.x = -0.35;
    pedal.userData.base = pedal.rotation.x;
    g.add(pedal);
  }
  g.position.y = 0.02;
  return g;
}

function buildShifter(interior, knob) {
  const g = new THREE.Group();
  const carbon = new THREE.MeshStandardMaterial({ color: 0x25262e, roughness: 0.45, metalness: 0.35 });
  const consoleBase = rounded(0.3, 0.12, 0.72, 0.035, carbon);
  consoleBase.position.set(0.04, 0.69, -0.19);
  g.add(consoleBase);
  const trim = rounded(0.07, 0.013, 0.38, 0.008, accentMat(interior.accent));
  trim.position.set(0.04, 0.757, -0.15);
  g.add(trim);
  const lever = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.018, 0.3, 8), metal(0xd5d8df, 0.22));
  shaft.position.y = 0.15;
  lever.add(shaft);
  const boot = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.08, 0.08, 10), new THREE.MeshToonMaterial({ color: interior.main }));
  boot.position.y = 0.01;
  lever.add(boot);
  const knobMat = new THREE.MeshStandardMaterial({ color: knob.color, metalness: 0.6, roughness: 0.2 });
  const knobMesh = knob.shape === 'long'
    ? new THREE.Mesh(new THREE.CapsuleGeometry(0.028, 0.11, 4, 8), knobMat)
    : new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 8), knobMat);
  knobMesh.position.y = 0.32;
  lever.add(knobMesh);
  // Shifter hand (left hand).
  const glove = new THREE.MeshToonMaterial({ color: 0xef5b45, gradientMap: toonGradient() });
  const hand = new THREE.Group();
  const palm = rounded(0.11, 0.075, 0.13, 0.035, glove);
  palm.position.y = -0.02;
  for (let i = 0; i < 4; i++) {
    const finger = beamBetween([-0.045 + i * 0.03, 0, -0.02], [-0.045 + i * 0.03, -0.02, 0.075], 0.013, glove, 6);
    hand.add(finger);
  }
  const thumb = beamBetween([-0.05, 0.01, 0.02], [-0.085, -0.005, 0.07], 0.018, glove, 6);
  hand.add(thumb);
  hand.position.set(0.02, 0.34, -0.03); hand.rotation.x = -0.28;
  const forearm = beamBetween([-0.03, 0.02, 0.02], [-0.06, -0.22, 0.15], 0.034, new THREE.MeshToonMaterial({ color: 0x25232b }), 7);
  lever.add(hand, forearm);
  lever.position.set(0.04, 0.76, -0.36);
  g.add(lever);
  return { group: g, lever, knob: knobMesh, hand, base: new THREE.Vector3(0.04, 0.76, -0.36) };
}

function buildCockpit(car, build, mode = 'race') {
  const interior = INTERIORS[build.interior] || INTERIORS.black;
  const seat = SEATS[build.seat] || SEATS.stock;
  const knob = KNOBS[build.knob] || KNOBS.ball;
  const paint = resolvePaint(car, build);
  const group = new THREE.Group();
  const mainMat = new THREE.MeshToonMaterial({ color: interior.main, emissive: interior.main, emissiveIntensity: 0.35, gradientMap: toonGradient() });
  const accent = new THREE.MeshToonMaterial({ color: interior.accent, emissive: interior.accent, emissiveIntensity: 0.42, gradientMap: toonGradient() });
  const dark = new THREE.MeshToonMaterial({ color: 0x121116, gradientMap: toonGradient() });
  const carbon = new THREE.MeshStandardMaterial({ color: 0x202129, roughness: 0.35, metalness: 0.5 });

  // Dash and console.
  const dash = rounded(1.46, 0.35, 0.4, 0.1, mainMat);
  dash.position.set(0.03, 1.02, -0.82);
  dash.rotation.x = -0.12;
  group.add(dash);
  const dashTop = rounded(1.34, 0.055, 0.44, 0.05, new THREE.MeshToonMaterial({ color: 0x0c0b10, emissive: 0x0c0b10, emissiveIntensity: 0.3 }));
  dashTop.position.set(0.03, 1.18, -0.78); dashTop.rotation.x = -0.08;
  group.add(dashTop);
  const windscreenBase = rounded(1.5, 0.035, 0.06, 0.01, carbon);
  windscreenBase.position.set(0.03, 1.23, -0.72);
  group.add(windscreenBase);

  // Angled centre stack.
  const stack = rounded(0.4, 0.6, 0.22, 0.045, carbon);
  stack.position.set(-0.18, 0.86, -0.66); stack.rotation.x = -0.18;
  group.add(stack);
  const screenCanvas = makeCanvas(512, 288);
  const screenCtx = screenCanvas.getContext('2d');
  const screenTex = canvasTexture(screenCanvas);
  const display = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.17), new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false }));
  display.position.set(-0.18, 1.06, -0.532); display.rotation.x = -0.2;
  group.add(display);
  const screenFrame = rounded(0.34, 0.21, 0.022, 0.02, metal(0x3d404a, 0.3));
  screenFrame.position.set(-0.18, 1.06, -0.538); screenFrame.rotation.x = -0.2;
  group.add(screenFrame);

  // Instrument binnacle.
  const bin = rounded(0.54, 0.28, 0.25, 0.07, new THREE.MeshToonMaterial({ color: 0x3a3a48, emissive: 0x1e1e28, emissiveIntensity: 0.5 }));
  bin.position.set(0.36, 1.24, -0.65); bin.rotation.x = -0.23;
  group.add(bin);
  const gaugeCanvas = makeCanvas(512, 256);
  const gaugeCtx = gaugeCanvas.getContext('2d');
  const gaugeTex = canvasTexture(gaugeCanvas);
  const gaugeFace = new THREE.Mesh(new THREE.PlaneGeometry(0.48, 0.235), new THREE.MeshBasicMaterial({ map: gaugeTex, toneMapped: false }));
  gaugeFace.position.set(0.36, 1.24, -0.512); gaugeFace.rotation.x = -0.23;
  group.add(gaugeFace);
  const shiftLights = [];
  for (let i = 0; i < 7; i++) {
    const light = new THREE.Mesh(new THREE.SphereGeometry(0.011, 8, 6), new THREE.MeshBasicMaterial({ color: 0x2c2a35 }));
    light.position.set(0.16 + i * 0.03, 1.345, -0.52);
    group.add(light); shiftLights.push(light);
  }

  // Door cards, roof and pillars.
  const roof = rounded(1.48, 0.08, 1.26, 0.06, mainMat);
  roof.position.set(0.02, 1.52, -0.05);
  group.add(roof);
  const aPillarL = beamBetween([-0.72, 1.4, -0.48], [-0.75, 1.16, -0.94], 0.035, mainMat, 6);
  const aPillarR = beamBetween([0.73, 1.4, -0.48], [0.76, 1.16, -0.94], 0.035, mainMat, 6);
  group.add(aPillarL, aPillarR);
  const rearPillarL = beamBetween([-0.74, 1.5, 0.55], [-0.76, 1.14, 0.25], 0.05, mainMat, 6);
  const rearPillarR = beamBetween([0.74, 1.5, 0.55], [0.76, 1.14, 0.25], 0.05, mainMat, 6);
  group.add(rearPillarL, rearPillarR);
  for (const side of [-1, 1]) {
    const door = rounded(0.045, 0.5, 0.95, 0.025, mainMat);
    door.position.set(side * 0.78, 0.92, -0.04);
    group.add(door);
    const doorAccent = rounded(0.05, 0.035, 0.48, 0.01, accent);
    doorAccent.position.set(side * 0.765, 1.03, -0.16);
    group.add(doorAccent);
    const window = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.26), glass(0x7bd7ff, 0.12));
    window.position.set(side * 0.77, 1.32, -0.02); window.rotation.y = side * Math.PI / 2;
    group.add(window);
  }

  // Seats.
  const seats = [];
  for (const x of [-0.36, 0.42]) {
    const sh = 1 + (seat.bolster - 1) * 0.4;
    const seatGroup = new THREE.Group();
    const back = rounded(0.48, 0.65 * sh, 0.18, 0.09, mainMat);
    back.position.set(0, 0.56, 0.28); back.rotation.x = 0.12;
    const cushion = rounded(0.5, 0.14, 0.5, 0.07, mainMat);
    cushion.position.set(0, 0.15, 0.06);
    const insert = rounded(0.3, 0.36, 0.02, 0.05, accent);
    insert.position.set(0, 0.58, 0.18); insert.rotation.x = 0.12;
    const head = rounded(0.28, 0.2, 0.14, 0.05, seat.carbon ? carbon : mainMat);
    head.position.set(0, 0.95, 0.32);
    const harness = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.55, 0.012), new THREE.MeshBasicMaterial({ color: 0x31f2bb }));
    harness.position.set(-0.11, 0.62, 0.175); harness.rotation.z = 0.18;
    seatGroup.add(back, cushion, insert, head, harness);
    seatGroup.position.set(x, 0.75, 0.2);
    group.add(seatGroup); seats.push(seatGroup);
  }

  // Rear-view mirror.
  const mirror = rounded(0.45, 0.1, 0.06, 0.025, mainMat);
  mirror.position.set(0.03, 1.44, -0.78); mirror.rotation.x = -0.12;
  group.add(mirror);
  const mirrorGlass = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.055), glass(0x9cc8da, 0.55));
  mirrorGlass.position.set(0.03, 1.442, -0.746); mirrorGlass.rotation.x = -0.12;
  group.add(mirrorGlass);

  // Steering wheel.
  const steeringGroup = new THREE.Group();
  const rimMat = new THREE.MeshToonMaterial({ color: 0x1a191f, emissive: 0x2a2733, emissiveIntensity: 0.45, gradientMap: toonGradient() });
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.175, 0.026, 8, 28), rimMat);
  steeringGroup.add(rim);
  const horn = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.07, 0.05, 14), new THREE.MeshToonMaterial({ color: interior.main }));
  horn.rotation.x = Math.PI / 2; horn.position.z = -0.005;
  steeringGroup.add(horn);
  const spokeMat = metal(0x6e717a, 0.3);
  for (let i = 0; i < 3; i++) {
    const spoke = rounded(0.035, 0.15, 0.025, 0.01, spokeMat);
    spoke.position.set(Math.sin(i * 2.1) * 0.075, -0.04, 0.02);
    spoke.rotation.z = i * 2.1;
    steeringGroup.add(spoke);
  }
  const badge = new THREE.Mesh(new THREE.CircleGeometry(0.038, 16), new THREE.MeshBasicMaterial({ color: paint.accent }));
  badge.position.set(0, 0, 0.03);
  steeringGroup.add(badge);
  steeringGroup.position.set(0.36, 0.95, -0.47);
  steeringGroup.rotation.x = -0.28;
  group.add(steeringGroup);

  // Right hand / arm on the wheel.
  const glove = new THREE.MeshToonMaterial({ color: 0xf0e8d1, gradientMap: toonGradient() });
  const sleeve = new THREE.MeshToonMaterial({ color: 0x1b1b22, gradientMap: toonGradient() });
  const rightHand = new THREE.Group();
  const palm = rounded(0.12, 0.08, 0.14, 0.04, glove);
  rightHand.add(palm);
  for (let i = 0; i < 4; i++) {
    rightHand.add(beamBetween([-0.05 + i * 0.03, 0, -0.04], [-0.05 + i * 0.03, -0.02, 0.08], 0.014, glove, 6));
  }
  rightHand.position.set(0.52, 0.95, -0.36); rightHand.rotation.x = -0.24;
  group.add(rightHand);
  const rightArm = beamBetween([0.55, 0.9, -0.2], [0.62, 0.74, 0.18], 0.043, sleeve, 8);
  group.add(rightArm);

  // Shifter and pedals.
  const shifter = buildShifter(interior, knob);
  group.add(shifter.group);
  const pedals = buildPedals(metal(0x5f626d, 0.45), paint.accent);
  group.add(pedals);
  const legs = [];
  for (let i = 0; i < 2; i++) {
    const leg = beamBetween([0.1 + i * 0.28, 0.7, 0.02], [0.08 + i * 0.2, 0.38, -0.62], 0.06, new THREE.MeshToonMaterial({ color: 0x24232b }), 7);
    group.add(leg); legs.push(leg);
  }

  // Ambient accent strip & footwell light.
  const strip = rounded(0.06, 0.015, 1.1, 0.005, new THREE.MeshBasicMaterial({ color: interior.accent, toneMapped: false }));
  strip.position.set(0.04, 1.15, -0.59);
  group.add(strip);
  const glow = new THREE.PointLight(interior.accent, 0.8, 2.0, 2);
  glow.position.set(0.0, 0.7, -0.35);
  group.add(glow);
  const cabinFill = new THREE.PointLight(0xfff0f8, 0.9, 3.2, 2);
  cabinFill.position.set(0.1, 1.5, 0.35);
  group.add(cabinFill);

  // Showroom: hide body-hugging hands/arms? Keep interior, remove arms because cockpit is left-hand-drive framing.
  if (mode === 'showroom') {
    rightHand.visible = false; rightArm.visible = false;
    group.traverse(o => { if (o.material && o.material.transparent && o.material.opacity < 0.2) o.visible = false; });
  }

  // Live updates.
  const state = { wheelSpin: 0, steer: 0, shiftX: 0, shiftZ: 0, lastGauge: 0, screenLast: 0 };
  const gearPos = (g) => GEAR_GATES[g] || GEAR_GATES.N;
  const clock = new THREE.Clock();

  function drawGauge(rpm, speed, gear, boost) {
    const x = gaugeCtx;
    x.clearRect(0, 0, 512, 256);
    const bg = x.createLinearGradient(0, 0, 0, 256);
    bg.addColorStop(0, '#15151c'); bg.addColorStop(1, '#050509');
    x.fillStyle = bg; x.fillRect(0, 0, 512, 256);
    // twin round gauges
    const cx1 = 116, cx2 = 262, cy = 134;
    const maxRpm = 9000;
    for (const [cx, label] of [[cx1, 'RPM'], [cx2, 'KM/H']]) {
      x.beginPath(); x.arc(cx, cy, 86, 0, Math.PI * 2); x.fillStyle = '#0d0d13'; x.fill();
      x.strokeStyle = '#4b4a57'; x.lineWidth = 8; x.stroke();
      x.beginPath(); x.arc(cx, cy, 72, Math.PI * 0.75, Math.PI * 2.25); x.strokeStyle = '#ff365b'; x.lineWidth = 3; x.stroke();
      x.fillStyle = '#f2eedf'; x.font = '700 18px Rajdhani, sans-serif'; x.textAlign = 'center'; x.fillText(label, cx, 221);
    }
    // rpm ticks
    for (let i = 0; i <= 8; i++) {
      const a = Math.PI * 0.75 + (i / 8) * Math.PI * 1.5;
      x.beginPath();
      x.moveTo(cx1 + Math.cos(a) * 64, cy + Math.sin(a) * 64);
      x.lineTo(cx1 + Math.cos(a) * 76, cy + Math.sin(a) * 76);
      x.strokeStyle = i > 6 ? '#ff365b' : '#82818d'; x.lineWidth = i % 2 === 0 ? 4 : 2; x.stroke();
      if (i % 2 === 0) {
        x.fillStyle = i > 6 ? '#ff365b' : '#aaa8b3'; x.font = '700 14px Rajdhani';
        x.fillText(String(i), cx1 + Math.cos(a) * 48, cy + Math.sin(a) * 48 + 5);
      }
    }
    const rpmA = Math.PI * 0.75 + Math.min(1, rpm / maxRpm) * Math.PI * 1.5;
    x.beginPath(); x.moveTo(cx1, cy); x.lineTo(cx1 + Math.cos(rpmA) * 62, cy + Math.sin(rpmA) * 62);
    x.strokeStyle = rpm > maxRpm * 0.9 ? '#ff284e' : '#f4be3e'; x.lineWidth = 5; x.stroke();
    x.beginPath(); x.arc(cx1, cy, 8, 0, 7); x.fillStyle = '#f4be3e'; x.fill();
    x.fillStyle = '#f3eee0'; x.font = '900 39px Rajdhani'; x.textAlign = 'center';
    x.fillText(String(Math.round(rpm)).padStart(4, '0'), cx1, 191);
    // speed gauge needle
    const speedA = Math.PI * 0.75 + Math.min(1, speed / 320) * Math.PI * 1.5;
    x.beginPath(); x.moveTo(cx2, cy); x.lineTo(cx2 + Math.cos(speedA) * 62, cy + Math.sin(speedA) * 62);
    x.strokeStyle = '#34ebd0'; x.lineWidth = 5; x.stroke();
    x.beginPath(); x.arc(cx2, cy, 8, 0, 7); x.fillStyle = '#34ebd0'; x.fill();
    x.fillStyle = '#f3eee0'; x.font = '900 39px Rajdhani'; x.textAlign = 'center';
    x.fillText(String(Math.round(speed)), cx2, 191);
    x.fillStyle = '#858391'; x.font = '600 13px Rajdhani'; x.fillText('GEAR', 400, 80);
    x.fillStyle = '#fff8e5'; x.font = '900 33px Bebas Neue'; x.fillText(gear === 0 ? 'N' : gear === -1 ? 'R' : String(gear), 400, 112);
    x.fillStyle = '#858391'; x.font = '600 13px Rajdhani'; x.fillText('BOOST', 400, 142);
    x.fillStyle = boost > 0.1 ? '#ff5e94' : '#565463'; x.fillRect(400, 152, 78, 8);
    x.fillStyle = '#ff5e94'; x.fillRect(400, 152, 78 * Math.min(1, boost * 1.7), 8);
    // brand ticker
    x.fillStyle = '#ff365b'; x.font = '700 13px Rajdhani'; x.textAlign = 'left'; x.fillText('TOKYO REDLINE // STREET SPEC', 300, 234);
    gaugeTex.needsUpdate = true;
  }

  function drawScreen(speed, gear, time, phase, rivalText) {
    const x = screenCtx;
    x.clearRect(0, 0, 512, 288);
    x.fillStyle = '#051a24'; x.fillRect(0, 0, 512, 288);
    x.fillStyle = 'rgba(34,243,211,.12)'; x.fillRect(0, 70, 512, 58);
    x.fillStyle = '#26f1d1'; x.font = '700 16px Rajdhani'; x.textAlign = 'left';
    x.fillText('TOKYO REDLINE OS  2.6', 22, 30);
    x.fillStyle = '#ff4b94'; x.font = '900 56px Bebas Neue'; x.textAlign = 'left'; x.fillText('NIGHT RUN', 22, 65);
    x.fillStyle = '#f5f0df'; x.font = '500 17px Rajdhani'; x.fillText(phase || 'STAGING', 24, 96);
    x.fillStyle = '#8cf8e7'; x.font = '900 42px Rajdhani'; x.fillText(String(Math.round(speed)).padStart(3, '0'), 22, 142);
    x.fillStyle = '#8a8795'; x.font = '600 15px Rajdhani'; x.fillText('KM/H', 118, 140);
    x.fillStyle = '#ffdc5e'; x.font = '900 40px Bebas Neue'; x.fillText('GEAR ' + (gear === 0 ? 'N' : gear === -1 ? 'R' : gear), 320, 138);
    x.fillStyle = '#d8d3c4'; x.font = '500 15px Rajdhani'; x.fillText((time || '00:00.000'), 22, 180);
    x.fillStyle = '#ff5e94'; x.fillText(rivalText || 'RIVAL --', 22, 205);
    x.fillStyle = '#1bfff0'; x.fillRect(370, 158, 116, 26);
    x.fillStyle = '#03181b'; x.font = '800 14px Rajdhani'; x.textAlign = 'center'; x.fillText('MANUAL ONLY', 428, 176);
    screenTex.needsUpdate = true;
  }

  drawGauge(900, 0, 0, 0);
  drawScreen(0, 0, '00:00.000', 'READY', 'RIVAL --');

  return {
    group, steeringGroup, shifter, shiftLights, gaugeCanvas, gaugeCtx, gaugeTex, screenTex,
    seatGroup: seats[1], rightHand, rightArm, pedals, legs,
    update(dt, s) {
      state.steer += (s.steering - state.steer) * Math.min(1, dt * 9);
      steeringGroup.rotation.z = -state.steer * 0.8;
      steeringGroup.rotation.x = -0.28 + state.steer * 0.03;
      rightHand.position.x = 0.52 + state.steer * 0.035;
      // Gear lever to gate coordinates.
      const p = gearPos(s.gear);
      const tx = shifter.base.x + p.x * 0.072;
      const tz = shifter.base.z + p.y * 0.055;
      state.shiftX += (tx - shifter.base.x - state.shiftX) * Math.min(1, dt * 18);
      state.shiftZ += (tz - shifter.base.z - state.shiftZ) * Math.min(1, dt * 18);
      shifter.lever.position.x = shifter.base.x + state.shiftX;
      shifter.lever.position.z = shifter.base.z + state.shiftZ;
      shifter.lever.rotation.z = -state.shiftX * 1.1;
      shifter.lever.rotation.x = -state.shiftZ * 0.8;
      // pedals move
      const pedalStates = [s.clutch, s.brake, s.throttle];
      pedals.children.forEach((pedal, i) => {
        pedal.rotation.x = -0.35 + pedalStates[i] * 0.12;
      });
      // shift lights
      const redline = s.redline || 8000;
      shiftLights.forEach((light, i) => {
        const threshold = redline * (0.62 + i * 0.055);
        const on = s.rpm > threshold;
        light.material.color.setHex(on ? (i > 4 ? 0xff254a : i > 2 ? 0xffc22e : 0x35f1c8) : 0x272631);
        const sc = on ? 1.3 : 1;
        light.scale.setScalar(sc);
      });
      state.lastGauge += dt;
      if (state.lastGauge > 0.08) {
        state.lastGauge = 0;
        drawGauge(s.rpm, s.speed * 3.6, s.gear, s.boost || 0);
        drawScreen(s.speed * 3.6, s.gear, s.time, s.phase, s.rivalText);
      }
    },
    setScreen(text, sub) {
      drawScreen(0, 0, text, sub, '');
    }
  };
}

/* Main exterior car builder. */
export function createCarModel(car, build = {}, options = {}) {
  const group = new THREE.Group();
  const paint = options.paintColor
    ? { ...PAINTS[0], color: options.paintColor, accent: options.accentColor ?? PAINTS[0].accent, name: 'Rival Wrap' }
    : resolvePaint(car, build);
  const kit = BODY_KITS[build.bodykit] || BODY_KITS.stock;
  const spoiler = SPOILERS[build.spoiler] || SPOILERS.stock;
  const wheelStyle = WHEELS[build.wheels] || WHEELS.mesh;
  const headlight = HEADLIGHTS[build.headlights] || HEADLIGHTS.warm;
  const d = car.dims;
  const W = d.width + kit.width;
  const L = d.length;
  const wheelRadius = car.wheels.size + (wheelStyle.kind === 'chrome' ? 0.015 : 0);
  const paintMat = toon(paint.color, { fresh: true });
  const accent = accentMat(paint.accent);
  const trim = new THREE.MeshToonMaterial({ color: 0x121218, gradientMap: toonGradient() });
  const chrome = metal(0xd8dde8, 0.2);

  // Lower hull, with a subtly exaggerated cartoon stance.
  const hull = rounded(W, 0.44, L, 0.16, paintMat);
  hull.position.y = 0.57;
  addInk(hull, 1.023);
  group.add(hull);
  const lower = rounded(W * 0.95, 0.26, L * 0.84, 0.1, trim);
  lower.position.y = 0.31;
  group.add(lower);

  // Nose and rear haunches.
  const nose = rounded(W * 0.96, 0.31, L * 0.29, 0.1, paintMat);
  nose.position.set(0, 0.8, -L * 0.35);
  nose.rotation.x = d.hood ? -0.035 : -0.02;
  group.add(nose);
  const hood = rounded(W * 0.83, 0.06, L * 0.25, 0.05, paintMat);
  hood.position.set(0, 0.905, -L * 0.27); hood.rotation.x = -0.04;
  group.add(hood);
  const deck = rounded(W * 0.9, 0.09, L * 0.27, 0.045, paintMat);
  deck.position.set(0, 0.9, L * 0.34);
  group.add(deck);
  const trunkLip = rounded(W * 0.78, 0.025, 0.16, 0.015, trim);
  trunkLip.position.set(0, 0.95, L * 0.47);
  group.add(trunkLip);

  // Fenders / widebody.
  const fenderWidth = 0.055 + kit.width * 0.8;
  for (const z of [-d.wheelbase / 2, d.wheelbase / 2]) {
    for (const side of [-1, 1]) {
      const arch = new THREE.Mesh(new THREE.TorusGeometry(wheelRadius + 0.09, fenderWidth, 6, 12, Math.PI), paintMat);
      arch.rotation.y = Math.PI / 2;
      arch.rotation.x = Math.PI / 2;
      arch.position.set(side * (W / 2 - 0.01), wheelRadius + 0.02, z);
      group.add(arch);
      if (kit.width > 0) {
        const flare = rounded(0.11, 0.23, 0.38, 0.07, paintMat);
        flare.position.set(side * (W / 2 - 0.015), 0.63, z);
        flare.rotation.x = 0.05;
        group.add(flare);
      }
    }
  }
  const sideSkirt = rounded(W * 1.0, 0.08, L * 0.42, 0.03, kit.width > 0 ? accent : trim);
  sideSkirt.position.set(0, 0.34, 0.02);
  group.add(sideSkirt);
  const splitter = rounded(W * 0.98 + 0.12, 0.055, 0.32 + kit.lip, 0.025, trim);
  splitter.position.set(0, 0.29, -L / 2 + 0.03);
  group.add(splitter);
  const diffuser = rounded(W * 0.85, 0.07, 0.34 + kit.lip, 0.025, trim);
  diffuser.position.set(0, 0.3, L / 2 - 0.06);
  group.add(diffuser);

  // Cabin.
  const cabinH = d.roof + 0.5;
  const cabinGeo = makeCabinGeometry(W * 0.8, d.cabin, cabinH, 0.74, 0.68, 0.06);
  const cabin = new THREE.Mesh(cabinGeo, glass(0x6fccec, 0.26));
  cabin.position.set(0, 0.88, 0.06);
  group.add(cabin);
  const roof = rounded(W * 0.63, 0.075, d.cabin * 0.7, 0.06, paintMat);
  roof.position.set(0, 0.9 + cabinH, 0.1);
  addInk(roof, 1.04);
  group.add(roof);
  // A, B and C pillars.
  const cabinZ = 0.06, baseY = 0.9;
  const halfC = d.cabin / 2;
  const topHalf = halfC * 0.7;
  const pillarMat = paintMat;
  for (const side of [-1, 1]) {
    const x = side * W * 0.4;
    group.add(beamBetween([x, baseY, -halfC + cabinZ], [side * W * 0.295, baseY + cabinH, -topHalf + cabinZ + 0.06], 0.024, pillarMat, 5));
    group.add(beamBetween([x, baseY, halfC + cabinZ], [side * W * 0.295, baseY + cabinH, topHalf + cabinZ + 0.06], 0.028, pillarMat, 5));
    group.add(beamBetween([side * W * 0.4, baseY, 0.0], [side * W * 0.295, baseY + cabinH, 0.06], 0.018, pillarMat, 5));
  }
  // Door seams.
  for (const side of [-1, 1]) {
    const seam = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.35, 0.015), trim);
    seam.position.set(side * (W / 2 + 0.001), 0.72, 0.06);
    group.add(seam);
    const handle = rounded(0.06, 0.035, 0.18, 0.015, chrome);
    handle.position.set(side * (W / 2 + 0.006), 0.78, 0.2);
    group.add(handle);
    const mirrorArm = rounded(0.06, 0.04, 0.11, 0.015, trim);
    mirrorArm.position.set(side * (W * 0.41), 1.02, -0.75);
    group.add(mirrorArm);
    const mirror = rounded(0.17, 0.1, 0.09, 0.035, paintMat);
    mirror.position.set(side * (W * 0.49), 1.04, -0.78);
    group.add(mirror);
  }

  // Bumpers and grille.
  const frontBumper = rounded(W * 0.96, 0.23, 0.15, 0.06, trim);
  frontBumper.position.set(0, 0.49, -L / 2 + 0.005);
  group.add(frontBumper);
  const grille = rounded(W * 0.33, 0.13, 0.035, 0.03, trim);
  grille.position.set(0, 0.66, -L / 2 - 0.006);
  group.add(grille);
  const emblem = new THREE.Mesh(new THREE.CircleGeometry(0.045, 16), new THREE.MeshBasicMaterial({ color: paint.accent }));
  emblem.position.set(0, 0.67, -L / 2 - 0.03); group.add(emblem);
  const rearBumper = rounded(W * 0.96, 0.21, 0.15, 0.06, trim);
  rearBumper.position.set(0, 0.49, L / 2 - 0.005);
  group.add(rearBumper);

  // Headlights, tail lights and exhaust.
  const lightMat = new THREE.MeshBasicMaterial({ color: headlight.color, toneMapped: false });
  for (const side of [-1, 1]) {
    const lamp = rounded(0.31, 0.11, 0.045, 0.03, lightMat);
    lamp.position.set(side * W * 0.31, 0.83, -L / 2 - 0.015); lamp.rotation.x = -0.05;
    group.add(lamp);
    const lens = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.075), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending }));
    lens.position.set(side * W * 0.31, 0.84, -L / 2 - 0.042); lens.rotation.y = Math.PI;
    group.add(lens);
    // front lip canard
    if (kit.canards) {
      const canard = rounded(0.18, 0.025, 0.23, 0.01, trim);
      canard.position.set(side * W * 0.4, 0.49, -L / 2 + 0.12); canard.rotation.z = side * 0.15;
      group.add(canard);
    }
  }
  const tailMat = new THREE.MeshBasicMaterial({ color: 0xff263f, toneMapped: false });
  const tail = rounded(W * 0.83, 0.085, 0.035, 0.02, tailMat);
  tail.position.set(0, 0.77, L / 2 - 0.02); group.add(tail);
  for (const side of [-1, 1]) {
    const inner = rounded(W * 0.15, 0.1, 0.04, 0.015, tailMat);
    inner.position.set(side * W * 0.5, 0.73, L / 2 - 0.03); group.add(inner);
  }
  const exhaustTips = EXHAUSTS[build.exhaust]?.tips || 1;
  const exhaustMat = metal(build.exhaust === 'titanium' ? 0x9d5cce : 0xc4c7ce, 0.25);
  for (let i = 0; i < exhaustTips; i++) {
    const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.065, 0.22, 10), exhaustMat);
    tip.rotation.x = Math.PI / 2;
    tip.position.set(-0.25 + i * 0.18, 0.37, L / 2 + 0.04);
    group.add(tip);
  }

  // Wheels.
  const wheels = [];
  for (const z of [-d.wheelbase / 2, d.wheelbase / 2]) {
    for (const side of [-1, 1]) {
      const w = makeWheel(car, build, wheelRadius, car.wheels.width, side);
      w.position.set(side * (W * 0.49), wheelRadius, z);
      group.add(w); wheels.push(w);
    }
  }

  // Spoiler.
  const spoilerGroup = buildSpoiler(spoiler.kind, { ...d, length: L }, W, paint.color, paint.accent);
  group.add(spoilerGroup);

  // Decals.
  const decals = sideDecal(car, build, W, L);
  if (decals) group.add(decals);
  if (build.decal === 'stripe') {
    const stripeMat = new THREE.MeshBasicMaterial({ color: paint.accent });
    for (const x of [-0.13, 0.13]) {
      const s = new THREE.Mesh(new THREE.PlaneGeometry(0.11, L * 0.66), stripeMat);
      s.position.set(x, 0.932, -0.1); s.rotation.x = -Math.PI / 2;
      group.add(s);
    }
  }
  const plate = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.14), licensePlate(car));
  plate.position.set(0, 0.48, L / 2 + 0.015); group.add(plate);

  // Underglow.
  let underglow = null;
  const glowColor = UNDERGLOW[build.underglow]?.color || 0;
  if (glowColor) {
    const c = makeCanvas(256, 128);
    const ctx = c.getContext('2d');
    const grd = ctx.createRadialGradient(128, 64, 5, 128, 64, 110);
    grd.addColorStop(0, '#' + new THREE.Color(glowColor).getHexString() + 'dd');
    grd.addColorStop(0.55, '#' + new THREE.Color(glowColor).getHexString() + '66');
    grd.addColorStop(1, '#00000000');
    ctx.fillStyle = grd; ctx.fillRect(0, 0, 256, 128);
    const tex = canvasTexture(c);
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(W * 1.5, L * 1.1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.85 }));
    plane.rotation.x = -Math.PI / 2; plane.position.y = 0.025;
    group.add(plane);
    const pl = new THREE.PointLight(glowColor, 1.8, 4, 2);
    pl.position.y = 0.22; group.add(pl);
    underglow = plane;
  }

  // Blob shadow.
  const shadowCanvas = makeCanvas(128, 128);
  const sx = shadowCanvas.getContext('2d');
  const sg = sx.createRadialGradient(64, 64, 10, 64, 64, 62);
  sg.addColorStop(0, 'rgba(0,0,0,.58)'); sg.addColorStop(1, 'rgba(0,0,0,0)');
  sx.fillStyle = sg; sx.fillRect(0, 0, 128, 128);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(W * 1.5, L * 1.18), new THREE.MeshBasicMaterial({ map: canvasTexture(shadowCanvas), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.008;
  group.add(shadow);

  const cockpit = options.cockpit === false ? null : buildCockpit(car, build, options.cockpitMode || 'showroom');
  if (cockpit) group.add(cockpit.group);

  // Headlight glow for night maps.
  const headGlow = new THREE.Group();
  for (const side of [-1, 1]) {
    const glowSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: radialSprite(headlight.color), color: headlight.color, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.8
    }));
    glowSprite.scale.set(0.6, 0.45, 1);
    glowSprite.position.set(side * W * 0.31, 0.85, -L / 2 - 0.08);
    headGlow.add(glowSprite);
  }
  group.add(headGlow);

  return {
    group, wheels, cockpit, spoiler: spoilerGroup, underglow,
    tailLights: [tail, ...group.children.filter(o => o.material === tailMat)],
    headGlow, paint, car, W, L,
    spin(amount) { wheels.forEach(w => { w.rotation.x += amount; }); },
    setBrake(on) { tailMat.color.setHex(on ? 0xff5a64 : 0xff263f); },
    update(dt, s = {}) {
      if (cockpit) cockpit.update(dt, s);
    }
  };
}

let spriteCache = new Map();
function radialSprite(color) {
  const key = color;
  if (spriteCache.has(key)) return spriteCache.get(key);
  const c = makeCanvas(64, 64);
  const x = c.getContext('2d');
  const g = x.createRadialGradient(32, 32, 1, 32, 32, 30);
  const hex = '#' + new THREE.Color(color).getHexString();
  g.addColorStop(0, '#ffffff');
  g.addColorStop(0.25, hex);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  const tex = canvasTexture(c);
  spriteCache.set(key, tex);
  return tex;
}

function makeCabinGeometry(width, length, height, topScaleX, topScaleZ, topOffsetZ) {
  const w = width / 2, l = length / 2, tw = w * topScaleX, tl = l * topScaleZ;
  const verts = new Float32Array([
    -w, 0, -l, w, 0, -l, w, 0, l, -w, 0, l,
    -tw, height, -tl + topOffsetZ, tw, height, -tl + topOffsetZ, tw, height, tl + topOffsetZ, -tw, height, tl + topOffsetZ
  ]);
  const indices = [
    0, 1, 2, 0, 2, 3, // bottom
    4, 6, 5, 4, 7, 6, // top
    0, 4, 5, 0, 5, 1, // front
    1, 5, 6, 1, 6, 2, // right
    2, 6, 7, 2, 7, 3, // rear
    3, 7, 4, 3, 4, 0 // left
  ];
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

export { buildCockpit };
