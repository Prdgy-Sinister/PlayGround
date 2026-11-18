import * as THREE from '../vendor/three.module.js';
import { COSMETICS, DRAGON_MAP } from './data.js';

// ── tiny builders ──────────────────────────────────────────────────────────
const flat = (color, opts = {}) => new THREE.MeshStandardMaterial({
  color: new THREE.Color(color), flatShading: true, roughness: opts.roughness ?? 0.72,
  metalness: opts.metalness ?? 0.06, emissive: opts.emissive ? new THREE.Color(opts.emissive) : 0x000000,
  emissiveIntensity: opts.emissiveIntensity ?? 1, transparent: !!opts.transparent, opacity: opts.opacity ?? 1,
  side: opts.side ?? THREE.FrontSide,
});
const basic = (color, opacity = 1) => new THREE.MeshBasicMaterial({ color: new THREE.Color(color), transparent: opacity < 1, opacity, toneMapped: false });
const SPHERE = new THREE.SphereGeometry(1, 10, 8);
const CONE = new THREE.ConeGeometry(1, 1, 6);
const BOX = new THREE.BoxGeometry(1, 1, 1);
const CYL = new THREE.CylinderGeometry(1, 1, 1, 6);

function mesh(geo, mat, pos = [0, 0, 0], scale = [1, 1, 1], rot = [0, 0, 0]) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(...pos); m.scale.set(...scale); m.rotation.set(...rot);
  return m;
}
function ellip(mat, pos, scale, rot) { return mesh(SPHERE, mat, pos, scale, rot); }
function cylBetween(a, b, r, mat) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const m = new THREE.Mesh(CYL, mat);
  m.position.copy(a).addScaledVector(dir, 0.5);
  m.scale.set(r, len, r);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return m;
}

function wingGeometry(span, sweep = 1) {
  const v = [
    0.02, 0.02, 0.25,        // 0 root front
    span * 0.33, 0.16, -0.02,// 1 elbow
    span, 0.34, 0.18,        // 2 tip
    span * 0.82, 0.02, 0.82, // 3 outer trailing
    span * 0.42, -0.04, 0.70,// 4 mid trailing
    0.04, 0.02, 0.62,        // 5 root rear
  ];
  const idx = [0, 1, 4, 0, 4, 5, 1, 2, 3, 1, 3, 4];
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}

function pickTint(palette, tint) {
  if (!tint) return palette;
  return { ...palette, ...tint };
}

// ── main dragon builder ─────────────────────────────────────────────────────
export function createDragon(defOrId, opts = {}) {
  const def = typeof defOrId === 'string' ? DRAGON_MAP[defOrId] : defOrId;
  const level = opts.level || 1;
  const cosmetics = opts.cosmetics || {};
  const skin = COSMETICS.skin.find(s => s.id === (cosmetics.skin || 'default'));
  const saddle = COSMETICS.saddle.find(s => s.id === (cosmetics.saddle || 'none'));
  const armour = COSMETICS.armour.find(s => s.id === (cosmetics.armour || 'none'));
  const wingsAcc = COSMETICS.wings.find(s => s.id === (cosmetics.wings || 'none'));
  const outfit = COSMETICS.outfit.find(s => s.id === (opts.outfitId || 'novice')) || COSMETICS.outfit[0];
  const pal = pickTint(def.palette, skin?.tint);
  const sh = def.shape;

  const group = new THREE.Group();
  group.userData.dragon = def;
  const rig = new THREE.Group(); // scaled body rig
  group.add(rig);

  const mats = {
    body: flat(pal.body, { roughness: 0.68 }),
    belly: flat(pal.belly, { roughness: 0.8 }),
    wing: flat(pal.wing, { roughness: 0.72, side: THREE.DoubleSide }),
    wing2: flat(new THREE.Color(pal.wing).lerp(new THREE.Color(pal.belly), 0.25), { roughness: 0.72, side: THREE.DoubleSide }),
    accent: flat(pal.accent, { roughness: 0.5, metalness: 0.15 }),
    horn: flat(pal.horn, { roughness: 0.42 }),
    eye: basic(pal.eye),
    dark: flat('#2a2530', { roughness: 0.6 }),
    gold: flat('#e8b45a', { roughness: 0.3, metalness: 0.65 }),
    leather: flat('#5b3c2a', { roughness: 0.85 }),
    cloth: flat(outfit.colors.tunic, { roughness: 0.9 }),
    trim: flat(outfit.colors.trim, { roughness: 0.6, metalness: 0.25 }),
    helm: flat(outfit.colors.helm, { roughness: 0.4, metalness: 0.5 }),
    skin: flat('#d9a57c', { roughness: 0.8 }),
    glow: basic(pal.accent, 0.85),
    membrane: new THREE.MeshBasicMaterial({ color: new THREE.Color(pal.accent), transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false, toneMapped: false }),
  };

  const B = sh.body, L = sh.legs;
  // ── torso ──
  const body = ellip(mats.body, [0, 0, 0], [0.62 * B, 0.56 * B, 1.25 * B]);
  rig.add(body);
  const belly = ellip(mats.belly, [0, -0.16 * B, 0.05], [0.48 * B, 0.4 * B, 1.0 * B]);
  rig.add(belly);
  // shoulder hump
  rig.add(ellip(mats.body, [0, 0.18 * B, -0.38 * B], [0.5 * B, 0.4 * B, 0.6 * B]));

  // ── neck & head ──
  const neck = new THREE.Group();
  neck.position.set(0, 0.16 * B, -0.9 * B);
  rig.add(neck);
  const neckSegs = [
    { p: [0, 0.08, -0.34], s: [0.34, 0.34, 0.42] },
    { p: [0, 0.22, -0.62], s: [0.29, 0.30, 0.38] },
    { p: [0, 0.4, -0.9], s: [0.25, 0.26, 0.34] },
  ];
  neckSegs.forEach((s, i) => neck.add(ellip(mats.body, [s.p[0] * sh.neck, s.p[1] * sh.neck, s.p[2] * sh.neck], [s.s[0] * sh.neck, s.s[1], s.s[2] * sh.neck])));
  const bellyNeck = ellip(mats.belly, [0, 0.12 * sh.neck, -0.58 * sh.neck], [0.18, 0.2, 0.3]);
  neck.add(bellyNeck);

  const head = new THREE.Group();
  head.position.set(0, 0.5 * sh.neck, -1.02 * sh.neck);
  neck.add(head);
  const hm = sh.head;
  head.add(ellip(mats.body, [0, 0, 0], [0.27 * hm, 0.25 * hm, 0.36 * hm]));
  // snout
  head.add(ellip(mats.body, [0, -0.07, -0.34], [0.19 * hm, 0.16 * hm, 0.28 * hm]));
  head.add(ellip(mats.belly, [0, -0.14, -0.35], [0.14 * hm, 0.09 * hm, 0.22 * hm]));
  // nostrils
  head.add(mesh(SPHERE, mats.dark, [0.09 * hm, -0.02, -0.55 * hm], [0.035, 0.03, 0.03]));
  head.add(mesh(SPHERE, mats.dark, [-0.09 * hm, -0.02, -0.55 * hm], [0.035, 0.03, 0.03]));
  // brow + eyes
  for (const sd of [-1, 1]) {
    head.add(ellip(mats.eye, [0.17 * sd * hm, 0.07, -0.19 * hm], [0.065, 0.07, 0.075]));
    head.add(ellip(mats.dark, [0.185 * sd * hm, 0.07, -0.16 * hm], [0.028, 0.062, 0.05]));
    head.add(ellip(mats.body, [0.17 * sd * hm, 0.16, -0.19 * hm], [0.13 * hm, 0.05, 0.12]));
    // jaw
    head.add(ellip(mats.body, [0.09 * sd * hm, -0.16, -0.2], [0.11, 0.06, 0.24]));
  }
  // horns
  const hornCount = sh.horns;
  const hornScale = 1 + Math.min(0.5, (level - 1) / 26);
  for (let i = 0; i < hornCount; i++) {
    const sd = i % 2 === 0 ? 1 : -1;
    const bx = (0.13 + (i >> 1) * 0.07) * sd;
    const h = mesh(CONE, mats.horn, [bx, 0.24 + (i >> 1) * 0.04, 0.06], [0.07 * hornScale, 0.42 * hornScale, 0.07 * hornScale], [0.55, 0, -0.35 * sd]);
    head.add(h);
  }
  // cheek fins
  head.add(mesh(CONE, mats.accent, [0.27, 0.02, 0.02], [0.05, 0.3, 0.12], [0, 0, -1.25]));
  head.add(mesh(CONE, mats.accent, [-0.27, 0.02, 0.02], [0.05, 0.3, 0.12], [0, 0, 1.25]));
  // crest fin
  if (sh.horns >= 2) {
    for (let i = 0; i < 3; i++) head.add(mesh(CONE, mats.accent, [0, 0.24, -0.08 + i * 0.13], [0.045, 0.16 - i * 0.02, 0.12], [0.8, 0, 0]));
  }

  // ── wings ──
  const wingSpan = 1.55 * sh.wings * (1 + Math.min(0.22, (level - 1) * 0.012));
  const wingGroups = [];
  for (const sd of [1, -1]) {
    const wg = new THREE.Group();
    wg.position.set(0.34 * sd * B, 0.26 * B, -0.34 * B);
    wg.scale.x = sd;
    rig.add(wg);
    wingGroups.push(wg);
    // membrane
    const wmGeo = wingGeometry(wingSpan); wmGeo.userData.dyn = true;
    const wm = new THREE.Mesh(wmGeo, mats.wing);
    wm.rotation.y = -0.14;
    wg.add(wm);
    const innerGeo = wingGeometry(wingSpan * 0.62); innerGeo.userData.dyn = true;
    const inner = new THREE.Mesh(innerGeo, mats.wing2);
    inner.rotation.y = -0.05; inner.position.y = 0.005;
    wg.add(inner);
    // bones
    const root = new THREE.Vector3(0.02, 0.02, 0.2);
    const elbow = new THREE.Vector3(wingSpan * 0.33, 0.16, -0.02);
    const tip = new THREE.Vector3(wingSpan, 0.34, 0.18);
    wg.add(cylBetween(root, elbow, 0.055, mats.horn));
    wg.add(cylBetween(elbow, tip, 0.042, mats.horn));
    wg.add(cylBetween(elbow, new THREE.Vector3(wingSpan * 0.82, 0.02, 0.82), 0.025, mats.horn));
    wg.add(ellip(mats.horn, [elbow.x, elbow.y, elbow.z], [0.08, 0.08, 0.08]));
    // claw at tip
    wg.add(mesh(CONE, mats.horn, [wingSpan + 0.05, 0.36, 0.18], [0.05, 0.22, 0.05], [0, 0, -1.3]));
    // wing accessories
    if (wingsAcc?.id === 'ribbons') {
      for (let i = 0; i < 3; i++) {
        const rib = mesh(BOX, i % 2 ? mats.cloth : mats.trim, [0.5 + i * 0.3, 0.06, 0.55 + i * 0.1], [0.04, 0.3, 0.02], [0, 0.3, 0.4]);
        rib.userData.ribbon = true; rib.userData.phase = i * 1.7;
        wg.add(rib);
      }
    }
    if (wingsAcc?.id === 'blades') {
      wg.add(mesh(CONE, mats.gold, [wingSpan * 0.82, 0.18, 0.1], [0.08, 0.7, 0.18], [0.2, 0, -1.9]));
    }
    if (wingsAcc?.id === 'stars') {
      for (let i = 0; i < 5; i++) {
        const st = mesh(SPHERE, mats.glow, [0.5 + i * 0.28, 0.12 + Math.sin(i) * 0.08, 0.4 + i * 0.08], [0.035, 0.035, 0.035]);
        wg.add(st);
      }
    }
  }

  // ── tail ──
  const tailRoot = new THREE.Group();
  tailRoot.position.set(0, 0.1 * B, 1.05 * B);
  rig.add(tailRoot);
  const tailSegs = [];
  let parent = tailRoot;
  const segCount = 7;
  for (let i = 0; i < segCount; i++) {
    const seg = new THREE.Group();
    seg.position.z = i === 0 ? 0.08 : 0.34 * sh.tail;
    parent.add(seg);
    const s = 0.32 * B * (1 - i / (segCount + 1.6));
    seg.add(ellip(mats.body, [0, 0, 0.1], [s, s * 0.9, 0.34 * sh.tail]));
    if (i % 2 === 0 && i < 4) seg.add(mesh(CONE, mats.accent, [0, s * 0.75, 0.08], [0.05, 0.2, 0.16], [0.35, 0, 0]));
    tailSegs.push(seg);
    parent = seg;
  }
  // tail fin
  const finGeo = wingGeometry(0.75, 1); finGeo.userData.dyn = true;
  const fin = new THREE.Mesh(finGeo, mats.wing);
  fin.position.set(0, 0.02, 0.28); fin.rotation.set(1.35, 0.1, 0.5); fin.scale.set(0.9, 1, 1);
  parent.add(fin);
  const fin2 = fin.clone(); fin2.rotation.z = -0.5; fin2.scale.x = -0.9; parent.add(fin2);
  tailRoot.add(mesh(CONE, mats.accent, [0, 0.26, 0.9 * sh.tail], [0.04, 0.26, 0.2], [1.2, 0, 0]));

  // ── legs ──
  const legPositions = [
    [0.34, -0.28, -0.48], [-0.34, -0.28, -0.48],
    [0.38, -0.3, 0.5], [-0.38, -0.3, 0.5],
  ];
  for (const [x, y, z] of legPositions) {
    const leg = new THREE.Group();
    leg.position.set(x * B, y, z); rig.add(leg);
    leg.add(ellip(mats.body, [0.02, -0.1, 0], [0.15 * L, 0.24 * L, 0.17 * L]));
    leg.add(ellip(mats.dark, [0.03, -0.32, -0.04], [0.1 * L, 0.1 * L, 0.16 * L], [0.4, 0, 0]));
    leg.add(mesh(CONE, mats.horn, [0.05, -0.33, -0.17], [0.035, 0.13, 0.035], [-1.6, 0, 0]));
  }

  // ── spine spikes ──
  for (let i = 0; i < 6; i++) {
    const z = -0.7 + i * 0.27;
    const s = sh.spikes * (0.16 - i * 0.012);
    if (s > 0.02) rig.add(mesh(CONE, mats.accent, [0, 0.5 * B - i * 0.02, z * B], [s * 0.55, s * 2.4, s], [0.42, 0, 0]));
  }

  // ── markings ──
  const markings = new THREE.Group();
  rig.add(markings);
  if (sh.pattern === 'stripes' || sh.pattern === 'streaks') {
    for (let i = 0; i < 5; i++) {
      const z = -0.8 + i * 0.4;
      const stripe = ellip(mats.accent, [0, 0.36 * B, z], [0.34 * B, 0.05, 0.05], [0, 0, 0]);
      mats.accent.emissive = new THREE.Color(pal.accent); mats.accent.emissiveIntensity = 0.18;
      markings.add(stripe);
    }
    if (sh.pattern === 'streaks') {
      for (const sd of [-1, 1]) markings.add(ellip(mats.accent, [0.5 * sd * B, 0.06, 0.2], [0.03, 0.09, 0.5]));
    }
  } else if (sh.pattern === 'scales') {
    for (let i = 0; i < 8; i++) {
      const sd = i % 2 ? 1 : -1;
      markings.add(ellip(mats.accent, [0.47 * sd * B, 0.1 + (i % 3) * 0.08, -0.6 + Math.floor(i / 2) * 0.42], [0.07, 0.04, 0.11]));
    }
  } else if (sh.pattern === 'spots') {
    for (let i = 0; i < 9; i++) {
      const sd = i % 2 ? 1 : -1;
      markings.add(ellip(mats.accent, [0.4 * sd * B, 0.24 - (i % 3) * 0.1, -0.65 + (i >> 1) * 0.36], [0.11, 0.06, 0.13]));
    }
  } else if (sh.pattern === 'glow' || sh.pattern === 'lava' || sh.pattern === 'stars' || sh.pattern === 'prism') {
    const gm = new THREE.MeshBasicMaterial({ color: new THREE.Color(pal.accent), transparent: true, opacity: 0.85, toneMapped: false });
    for (let i = 0; i < 7; i++) {
      const sd = i % 2 ? 1 : -1;
      const line = mesh(BOX, gm, [0.52 * sd * B, 0.12 + (i % 3) * 0.07, -0.65 + Math.floor(i / 2) * 0.38], [0.02, 0.03, 0.24], [0, 0, 0.2 * sd]);
      markings.add(line);
    }
    if (sh.pattern === 'stars' || sh.pattern === 'prism') {
      for (let i = 0; i < 12; i++) {
        const sd = i % 2 ? 1 : -1;
        markings.add(mesh(SPHERE, mats.glow, [0.42 * sd * B, 0.22 + (i % 4) * 0.09, -0.7 + Math.floor(i / 2) * 0.24], [0.028, 0.028, 0.028]));
      }
    }
    if (sh.pattern === 'lava') {
      mats.body.emissive = new THREE.Color(pal.body); mats.body.emissiveIntensity = 0.13;
    }
  }

  // ── saddle + rider ──
  if (saddle && saddle.id !== 'none') {
    const sm = saddle.id === 'crown' ? mats.gold : saddle.id === 'silver' ? flat('#c9d3dd', { metalness: 0.7, roughness: 0.25 }) : mats.leather;
    const seat = ellip(sm, [0, 0.55 * B, 0.18], [0.42, 0.1, 0.4]);
    rig.add(seat);
    rig.add(mesh(BOX, sm, [0, 0.62, 0.08], [0.34, 0.07, 0.26], [0, 0, 0]));
    const strapGeo = new THREE.TorusGeometry(0.62 * B, 0.045, 4, 14); strapGeo.userData.dyn = true;
    const strap = new THREE.Mesh(strapGeo, sm);
    strap.rotation.x = Math.PI / 2; strap.scale.z = 1.0; strap.position.set(0, 0.05, 0.18);
    rig.add(strap);
  }
  // simple rider always present for race/hangar; can be hidden for wild dragons
  if (opts.rider !== false) {
    const rider = new THREE.Group();
    rider.position.set(0, 0.62 * B + (saddle?.id !== 'none' ? 0.12 : 0), 0.12);
    rig.add(rider);
    // legs
    rider.add(ellip(mats.cloth, [0.32, -0.14, 0.04], [0.11, 0.32, 0.15], [0.3, 0, 0.12]));
    rider.add(ellip(mats.cloth, [-0.32, -0.14, 0.04], [0.11, 0.32, 0.15], [0.3, 0, -0.12]));
    rider.add(ellip(mats.leather, [0.33, -0.4, 0.12], [0.11, 0.11, 0.19]));
    rider.add(ellip(mats.leather, [-0.33, -0.4, 0.12], [0.11, 0.11, 0.19]));
    // torso
    rider.add(ellip(mats.cloth, [0, 0.16, 0.02], [0.24, 0.38, 0.22], [0.12, 0, 0]));
    rider.add(ellip(mats.trim, [0, 0.42, 0.02], [0.24, 0.06, 0.23]));
    // arms
    rider.add(cylBetween(new THREE.Vector3(0.2, 0.32, 0), new THREE.Vector3(0.28, 0.06, -0.26), 0.06, mats.cloth));
    rider.add(cylBetween(new THREE.Vector3(-0.2, 0.32, 0), new THREE.Vector3(-0.28, 0.06, -0.26), 0.06, mats.cloth));
    // head + helmet
    rider.add(ellip(mats.skin, [0, 0.6, -0.02], [0.16, 0.18, 0.16]));
    rider.add(mesh(CONE, mats.helm, [0, 0.72, 0.0], [0.17, 0.18, 0.17], [0, 0, 0]));
    rider.add(mesh(BOX, mats.helm, [0.14, 0.62, -0.06], [0.04, 0.16, 0.12], [0, 0, -0.1]));
    rider.add(mesh(BOX, mats.helm, [-0.14, 0.62, -0.06], [0.04, 0.16, 0.12], [0, 0, 0.1]));
    // scarf
    const scarf = mesh(BOX, mats.trim, [0, 0.5, 0.15], [0.3, 0.08, 0.06]);
    scarf.userData.scarf = true; rider.add(scarf);
    // shoulder guard
    rider.add(ellip(mats.leather, [0.24, 0.4, -0.02], [0.11, 0.09, 0.16]));
    rider.add(ellip(mats.leather, [-0.24, 0.4, -0.02], [0.11, 0.09, 0.16]));
    rider.userData.baseY = rider.position.y;
    rig.add(rider);
    group.userData.rider = rider;
  }

  // ── armour cosmetic ──
  if (armour && armour.id !== 'none') {
    const am = armour.id === 'gold' ? mats.gold : armour.id === 'crystal' ? flat('#b8ecff', { roughness: 0.15, metalness: 0.3, emissive: '#5cc6e8', emissiveIntensity: 0.18 }) : flat('#6d747e', { roughness: 0.42, metalness: 0.7 });
    rig.add(ellip(am, [0, 0.4 * B, -0.3], [0.46, 0.16, 0.36]));
    for (const sd of [-1, 1]) {
      rig.add(ellip(am, [0.34 * sd, 0.5 * B, -0.3], [0.2, 0.12, 0.3], [0, 0, 0.25 * sd]));
      rig.add(mesh(CONE, am, [0.36 * sd, 0.68 * B, -0.32], [0.07, 0.25, 0.07], [0, 0, -0.4 * sd]));
    }
    // forehead plate
    head.add(ellip(am, [0, 0.2, -0.12], [0.18, 0.06, 0.22]));
  }

  // level aura: subtle glow halo
  if (level >= 6) {
    const haloGeo = new THREE.RingGeometry(1.6, 1.76, 32); haloGeo.userData.dyn = true;
    const halo = new THREE.Mesh(haloGeo, new THREE.MeshBasicMaterial({
      color: new THREE.Color(pal.accent), transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false, toneMapped: false,
    }));
    halo.rotation.x = -Math.PI / 2; halo.position.y = -0.7;
    group.userData.halo = halo; group.add(halo);
  }

  group.userData.rig = rig;
  group.userData.neck = neck;
  group.userData.head = head;
  group.userData.tailSegs = tailSegs;
  group.userData.wingGroups = wingGroups;
  group.userData.mats = mats;
  group.userData.pal = pal;
  group.userData.def = def;

  const tmp = { flap: Math.random() * 6, t: 0 };
  let glide = 0;

  function update(dt, st = {}) {
    tmp.t += dt;
    tmp.flap += dt * (st.flapSpeed ?? (st.boosting ? 9 : 6));
    const speed = st.speed ?? 45;
    const flying = st.flying !== false;
    const glideTarget = st.gliding ? 1 : 0;
    glide += (glideTarget - glide) * Math.min(1, dt * 4);
    const flapAmt = flying ? (0.55 - glide * 0.35) : 0.0;
    const flap = Math.sin(tmp.flap) * flapAmt;
    const flap2 = Math.sin(tmp.flap + 0.4) * flapAmt * 0.8;
    wingGroups[0].rotation.z = 0.12 + flap;
    wingGroups[1].rotation.z = 0.12 + flap;
    wingGroups[0].rotation.y = -0.18 - flap2 * 0.22 + (st.bank || 0) * 0.06;
    wingGroups[1].rotation.y = 0.18 + flap2 * 0.22 + (st.bank || 0) * 0.06;
    // body bob + pitch lean
    rig.position.y = Math.sin(tmp.t * 2.1) * 0.05 * (flying ? 1 : 0.2);
    rig.rotation.x = (st.pitchLean || 0) * 0.25;
    rig.rotation.z = (st.bank || 0) * 0.25;
    // tail weave
    tailSegs.forEach((s, i) => {
      s.rotation.y = Math.sin(tmp.t * 3.1 + i * 0.6) * (0.05 + i * 0.01) * (0.5 + speed / 90);
      s.rotation.x = Math.sin(tmp.t * 2.2 + i * 0.5) * 0.02;
    });
    // neck sway & head look
    neck.rotation.x = Math.sin(tmp.t * 1.6) * 0.025 + (st.pitchLean || 0) * -0.2;
    neck.rotation.y = (st.headTurn || 0) * 0.16;
    head.rotation.x = Math.sin(tmp.t * 1.2) * 0.04;
    // rider bob and scarf flutter
    const rider = group.userData.rider;
    if (rider) {
      rider.position.y = rider.userData.baseY + Math.sin(tmp.t * 2.1 + 1) * 0.035;
      const sc = rider.children.find(c => c.userData.scarf);
      if (sc) sc.rotation.x = 0.2 + Math.sin(tmp.t * 8) * 0.15 + speed / 260;
    }
    wingGroups.forEach((wg, wi) => {
      wg.children.forEach(c => {
        if (c.userData.ribbon) {
          c.rotation.x = 0.3 + Math.sin(tmp.t * 5 + c.userData.phase) * 0.4;
          c.rotation.z = (wi ? -1 : 1) * (0.3 + Math.sin(tmp.t * 3 + c.userData.phase) * 0.2);
        }
      });
    });
    if (group.userData.halo) {
      group.userData.halo.rotation.z += dt * 0.4;
      group.userData.halo.material.opacity = 0.12 + Math.sin(tmp.t * 2) * 0.04;
      group.userData.halo.position.y = -0.72 - (st.wingWOsc || 0) * 0.3;
    }
    // banking aileron: flex the wing on the inside of the turn
    if (st.bank) {
      const b = THREE.MathUtils.clamp(st.bank, -1, 1);
      wingGroups[0].rotation.z += b * 0.10;
      wingGroups[1].rotation.z += b * 0.10;
    }
    // idle walking: leg sway? subtle
    mats.eye.color.set(pal.eye);
  }

  function setRiderVisible(v) {
    if (group.userData.rider) group.userData.rider.visible = v;
  }

  // shadow flags
  group.traverse(o => {
    if (o.isMesh) { o.castShadow = opts.castShadow ?? true; o.receiveShadow = false; }
  });

  return { group, update, rig, mats, setRiderVisible, def, level };
}

// Wingspan silhouette helper for UI cards
export function dragonThumb(def, size = 96) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const c = canvas.getContext('2d');
  const g = c.createLinearGradient(0, 0, 0, size);
  g.addColorStop(0, def.palette.skyTop || '#16324a'); g.addColorStop(1, '#0a1620');
  c.fillStyle = g; c.fillRect(0, 0, size, size);
  c.save(); c.translate(size / 2, size * 0.52);
  const p = def.palette, s = size / 96;
  // wings
  c.fillStyle = p.wing;
  c.beginPath(); c.moveTo(0, -2 * s); c.lineTo(-42 * s, -22 * s); c.lineTo(-38 * s, 12 * s); c.lineTo(-8 * s, 6 * s); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(0, -2 * s); c.lineTo(42 * s, -22 * s); c.lineTo(38 * s, 12 * s); c.lineTo(8 * s, 6 * s); c.closePath(); c.fill();
  // body
  c.fillStyle = p.body;
  c.beginPath(); c.ellipse(0, 8 * s, 10 * s, 19 * s, 0, 0, Math.PI * 2); c.fill();
  // neck + head
  c.beginPath(); c.ellipse(0, -14 * s, 5 * s, 10 * s, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(0, -24 * s, 7 * s, 5 * s, 0, 0, Math.PI * 2); c.fill();
  // horns
  c.strokeStyle = p.horn; c.lineWidth = 2 * s;
  c.beginPath(); c.moveTo(-4 * s, -27 * s); c.lineTo(-8 * s, -34 * s); c.moveTo(4 * s, -27 * s); c.lineTo(8 * s, -34 * s); c.stroke();
  // eyes
  c.fillStyle = p.eye;
  c.beginPath(); c.arc(-3 * s, -25 * s, 1.5 * s, 0, 7); c.fill();
  c.beginPath(); c.arc(3 * s, -25 * s, 1.5 * s, 0, 7); c.fill();
  // belly
  c.fillStyle = p.belly;
  c.beginPath(); c.ellipse(0, 14 * s, 6 * s, 11 * s, 0, 0, Math.PI * 2); c.fill();
  c.restore();
  return canvas.toDataURL();
}
