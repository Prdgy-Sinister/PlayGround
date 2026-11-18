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

let _glowTex = null;
function glowTextureCache() {
  if (_glowTex) return _glowTex;
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const rg = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  rg.addColorStop(0, 'rgba(255,255,255,1)');
  rg.addColorStop(0.35, 'rgba(255,255,255,.55)');
  rg.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = rg; g.fillRect(0, 0, 64, 64);
  _glowTex = new THREE.CanvasTexture(c);
  return _glowTex;
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
  // Normalised form vocabulary. Older dragons have no extra fields, so every
  // value falls back to the classic silhouette.
  const form = {
    width: sh.width ?? 1, length: sh.length ?? 1, size: sh.size ?? 1,
    headType: sh.headType || 'dragon',
    hornType: sh.hornType || sh.hornsType || 'default',
    wingType: sh.wingType || 'membrane',
    tailType: sh.tailType || 'membrane',
    legType: sh.legType || 'dragon',
    idle: sh.idle || 'calm',
  };

  const group = new THREE.Group();
  group.userData.dragon = def;
  const rig = new THREE.Group(); // scaled body rig
  rig.scale.set(form.width, form.size, form.length);
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
  // A longer neck should read as slender, not inflated: grow the segment
  // spacing but shrink the cross-section, so the head stays the widest part.
  const neckGirth = 1 / Math.sqrt(sh.neck);
  neckSegs.forEach((s, i) => neck.add(ellip(mats.body, [s.p[0] * sh.neck, s.p[1] * sh.neck, s.p[2] * sh.neck], [s.s[0] * neckGirth, s.s[1] * neckGirth, s.s[2] * neckGirth])));
  const bellyNeck = ellip(mats.belly, [0, 0.12 * sh.neck, -0.58 * sh.neck], [0.18 * neckGirth, 0.2 * neckGirth, 0.3 * sh.neck]);
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
  const eyeMeshes = [];
  for (const sd of [-1, 1]) {
    const eye = ellip(mats.eye, [0.17 * sd * hm, 0.07, -0.19 * hm], [0.065, 0.07, 0.075]);
    eye.userData.baseScale = [0.065, 0.07, 0.075];
    head.add(eye); eyeMeshes.push(eye);
    head.add(ellip(mats.dark, [0.185 * sd * hm, 0.07, -0.16 * hm], [0.028, 0.062, 0.05]));
    head.add(ellip(mats.body, [0.17 * sd * hm, 0.16, -0.19 * hm], [0.13 * hm, 0.05, 0.12]));
    // jaw
    head.add(ellip(mats.body, [0.09 * sd * hm, -0.16, -0.2], [0.11, 0.06, 0.24]));
  }
  // horns — each species gets its own crown, antler, frill or spike silhouette
  const hornCount = sh.horns;
  const hornScale = 1 + Math.min(0.5, (level - 1) / 26);
  if (form.hornType === 'crown') {
    const n = Math.max(5, hornCount);
    for (let i = 0; i < n; i++) {
      const a = (i / (n - 1) - 0.5) * 2.1;
      const rad = 0.23 * hm;
      const h = mesh(CONE, i % 2 ? mats.horn : mats.accent,
        [Math.sin(a) * rad, 0.24, 0.02 + Math.cos(a) * rad * 0.4],
        [0.055 * hornScale, (0.3 + (1 - Math.abs(a)) * 0.32) * hornScale, 0.055 * hornScale],
        [0.4 + Math.abs(a) * 0.2, 0, -a * 0.9]);
      head.add(h);
    }
  } else if (form.hornType === 'antlers') {
    for (const sd of [-1, 1]) {
      const base = new THREE.Vector3(0.14 * sd, 0.22, 0.02);
      const mid = new THREE.Vector3(0.34 * sd, 0.52, 0.08);
      const tip = new THREE.Vector3(0.5 * sd, 0.78, 0.2);
      head.add(cylBetween(base, mid, 0.045, mats.horn));
      head.add(cylBetween(mid, tip, 0.032, mats.horn));
      head.add(cylBetween(mid, new THREE.Vector3(0.58 * sd, 0.5, 0.02), 0.024, mats.horn));
      head.add(cylBetween(base, new THREE.Vector3(0.06 * sd, 0.58, -0.08), 0.03, mats.horn));
    }
  } else if (form.hornType === 'frill') {
    for (let i = 0; i < 9; i++) {
      const a = (i / 8 - 0.5) * 2.5;
      head.add(mesh(CONE, i % 2 ? mats.accent : mats.horn,
        [Math.sin(a) * 0.33, 0.16 + Math.cos(a) * 0.12, 0.2],
        [0.035, 0.26, 0.11], [0.5, 0, -a * 1.1]));
    }
    const frill = ellip(mats.membrane, [0, 0.12, 0.28], [0.42, 0.34, 0.06]);
    head.add(frill);
  } else if (form.hornType === 'spike') {
    for (const sd of [-1, 1]) {
      head.add(mesh(CONE, mats.horn, [0.11 * sd, 0.2, -0.08],
        [0.07 * hornScale, 0.62 * hornScale, 0.07 * hornScale], [-0.92, 0, -0.08 * sd]));
    }
  } else if (form.hornType === 'curved') {
    for (const sd of [-1, 1]) {
      const a = new THREE.Vector3(0.12 * sd, 0.2, 0);
      const b = new THREE.Vector3(0.3 * sd, 0.36, 0.1);
      const c = new THREE.Vector3(0.46 * sd, 0.3, 0.3);
      head.add(cylBetween(a, b, 0.06, mats.horn));
      head.add(cylBetween(b, c, 0.04, mats.horn));
    }
  } else {
    for (let i = 0; i < hornCount; i++) {
      const sd = i % 2 === 0 ? 1 : -1;
      const bx = (0.13 + (i >> 1) * 0.07) * sd;
      const h = mesh(CONE, mats.horn, [bx, 0.24 + (i >> 1) * 0.04, 0.06], [0.07 * hornScale, 0.42 * hornScale, 0.07 * hornScale], [0.55, 0, -0.35 * sd]);
      head.add(h);
    }
  }
  // cheek fins
  head.add(mesh(CONE, mats.accent, [0.27, 0.02, 0.02], [0.05, 0.3, 0.12], [0, 0, -1.25]));
  head.add(mesh(CONE, mats.accent, [-0.27, 0.02, 0.02], [0.05, 0.3, 0.12], [0, 0, 1.25]));
  // crest fin
  if (sh.horns >= 2 && form.hornType !== 'frill') {
    for (let i = 0; i < 3; i++) head.add(mesh(CONE, mats.accent, [0, 0.24, -0.08 + i * 0.13], [0.045, 0.16 - i * 0.02, 0.12], [0.8, 0, 0]));
  }
  // species face shapes
  if (form.headType === 'serpent') {
    head.scale.set(0.82, 0.8, 1.35);
    head.position.z -= 0.1 * sh.neck;
  } else if (form.headType === 'hammer') {
    head.scale.set(1.55, 0.82, 0.96);
    head.add(ellip(mats.body, [0, 0.02, 0.06], [0.42, 0.18, 0.24]));
  } else if (form.headType === 'beak') {
    head.scale.set(0.86, 0.92, 1.0);
    head.add(mesh(CONE, mats.horn, [0, -0.06, -0.6], [0.15, 0.42, 0.13], [-Math.PI / 2, 0, 0]));
    head.add(mesh(CONE, mats.accent, [0, 0.18, -0.36], [0.05, 0.24, 0.05], [-0.5, 0, 0]));
  } else if (form.headType === 'frilled') {
    head.scale.set(1.04, 0.94, 1.08);
  }
  // tusks, whisker tendrils and a mane collar are silhouette-level details
  if (sh.tusks) {
    for (const sd of [-1, 1]) {
      head.add(mesh(CONE, mats.horn, [0.16 * sd, -0.18, -0.34], [0.055, 0.34, 0.055], [-0.35, 0, -0.5 * sd]));
    }
  }
  if (sh.tendrils) {
    for (const sd of [-1, 1]) {
      const a = new THREE.Vector3(0.12 * sd, -0.03, -0.46);
      const b = new THREE.Vector3(0.28 * sd, 0.08, -0.82);
      const c = new THREE.Vector3(0.4 * sd, -0.02, -1.05);
      head.add(cylBetween(a, b, 0.018, mats.accent));
      head.add(cylBetween(b, c, 0.012, mats.accent));
    }
  }
  if (sh.mane) {
    for (let i = 0; i < 11; i++) {
      const a = (i / 10 - 0.5) * 2.8;
      neck.add(mesh(CONE, i % 2 ? mats.accent : mats.body,
        [Math.sin(a) * 0.34, 0.28 + Math.cos(a) * 0.1, 0.1],
        [0.055, 0.32, 0.12], [0.2, 0, -a * 1.15]));
    }
  }

  // ── wings ──
  const wingSpan = 1.55 * sh.wings * (1 + Math.min(0.22, (level - 1) * 0.012))
    * (form.wingType === 'insect' ? 0.82 : form.wingType === 'fin' ? 0.9 : form.wingType === 'feather' ? 1.06 : 1);
  const wingGroups = [];
  if (form.wingType === 'ethereal') {
    // Ethereal wings glow, but they still need enough body to read against a
    // pale dragon. Keep them translucent without letting them dissolve.
    mats.wing.transparent = true; mats.wing.opacity = 0.74;
    mats.wing2.transparent = true; mats.wing2.opacity = 0.58;
    mats.wing.emissive = new THREE.Color(pal.wing); mats.wing.emissiveIntensity = 0.22;
    mats.wing2.emissive = new THREE.Color(pal.wing); mats.wing2.emissiveIntensity = 0.14;
  }
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
    if (form.wingType === 'fin') wm.scale.set(1.08, 1.1, 0.82);
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
    // wing family silhouettes
    if (form.wingType === 'insect') {
      const hindGeo = wingGeometry(wingSpan * 0.6); hindGeo.userData.dyn = true;
      const hind = new THREE.Mesh(hindGeo, mats.wing2);
      hind.position.set(-0.12, -0.06, 0.34); hind.rotation.set(0.1, -0.35, -0.32);
      wg.add(hind);
    } else if (form.wingType === 'fin') {
      for (let i = 1; i <= 4; i++) {
        wg.add(cylBetween(new THREE.Vector3(0.02, 0.02, 0.22),
          new THREE.Vector3(wingSpan * 0.28 * i, 0.05 + i * 0.02, 0.22 + i * 0.16), 0.018, mats.horn));
      }
    } else if (form.wingType === 'feather') {
      for (let i = 0; i < 6; i++) {
        const t = i / 5;
        wg.add(mesh(CONE, i % 2 ? mats.accent : mats.wing2,
          [wingSpan * (0.3 + t * 0.62), 0.12 + t * 0.15, 0.28 + t * 0.24],
          [0.05, 0.5 + t * 0.35, 0.12], [0.9, 0, -1.35]));
      }
    } else if (form.wingType === 'ethereal') {
      for (let i = 0; i < 4; i++) {
        const spark = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTextureCache(), color: pal.accent, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending }));
        spark.scale.setScalar(0.28 + i * 0.04);
        spark.position.set(wingSpan * (0.35 + i * 0.16), 0.18 + i * 0.04, 0.34 + i * 0.12);
        wg.add(spark);
      }
    }
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
  // tail silhouette by species
  const tailTwins = [];
  if (form.tailType === 'club') {
    parent.add(ellip(mats.horn, [0, 0, 0.32], [0.36, 0.34, 0.4]));
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      parent.add(mesh(CONE, mats.accent, [Math.cos(a) * 0.28, Math.sin(a) * 0.28, 0.42], [0.07, 0.34, 0.07], [Math.PI / 2, 0, -a]));
    }
  } else if (form.tailType === 'spade') {
    const spade = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.1, 4), mats.wing);
    spade.position.set(0, 0.04, 0.48); spade.rotation.set(Math.PI / 2, 0, Math.PI / 4); spade.scale.z = 0.25;
    parent.add(spade);
    parent.add(mesh(CONE, mats.accent, [0, 0.18, 0.2], [0.05, 0.28, 0.12], [1.0, 0, 0]));
  } else if (form.tailType === 'twin') {
    // Two tails splay away from each other, and each is slimmer than a single
    // tail so the pair does not double the dragon's length.
    const twin = tailRoot.clone();
    twin.position.x = 0.26; twin.rotation.y = 0.24; twin.scale.setScalar(0.82);
    tailRoot.position.x = -0.26; tailRoot.rotation.y = -0.24;
    rig.add(twin); tailTwins.push(twin);
    tailTwins.push(tailRoot);
  } else if (form.tailType === 'whip') {
    parent.add(mesh(CONE, mats.horn, [0, 0, 0.42], [0.035, 0.5, 0.035], [Math.PI / 2, 0, 0]));
  } else if (form.tailType === 'feather') {
    for (let i = 0; i < 6; i++) {
      const a = (i / 5 - 0.5) * 1.6;
      parent.add(mesh(CONE, i % 2 ? mats.accent : mats.wing2,
        [Math.sin(a) * 0.1, 0.06, 0.35], [0.055, 0.62, 0.14], [1.1, 0, -a * 0.9]));
    }
  } else if (form.tailType === 'fin') {
    const bigFin = new THREE.Mesh(wingGeometry(1.15, 1), mats.wing);
    bigFin.position.set(0, 0.02, 0.3); bigFin.rotation.set(1.3, 0.1, 0.5); bigFin.scale.set(1.05, 1.2, 1);
    parent.add(bigFin);
    const bigFin2 = bigFin.clone(); bigFin2.rotation.z = -0.5; bigFin2.scale.x = -1.05; parent.add(bigFin2);
  } else {
    const finGeo = wingGeometry(0.75, 1); finGeo.userData.dyn = true;
    const fin = new THREE.Mesh(finGeo, mats.wing);
    fin.position.set(0, 0.02, 0.28); fin.rotation.set(1.35, 0.1, 0.5); fin.scale.set(0.9, 1, 1);
    parent.add(fin);
    const fin2 = fin.clone(); fin2.rotation.z = -0.5; fin2.scale.x = -0.9; parent.add(fin2);
  }
  tailRoot.add(mesh(CONE, mats.accent, [0, 0.26, 0.9 * sh.tail], [0.04, 0.26, 0.2], [1.2, 0, 0]));

  // ── legs ──
  const legGroups = [];
  const legPositions = [
    [0.34, -0.28, -0.48], [-0.34, -0.28, -0.48],
    [0.38, -0.3, 0.5], [-0.38, -0.3, 0.5],
  ];
  for (const [x, y, z] of legPositions) {
    const leg = new THREE.Group();
    leg.position.set(x * B, y, z); rig.add(leg);
    if (form.legType === 'raptor') {
      leg.add(ellip(mats.body, [0.02, -0.06, 0.03], [0.12 * L, 0.16 * L, 0.15 * L]));
      leg.add(ellip(mats.body, [0.03, -0.25, -0.06], [0.075 * L, 0.18 * L, 0.09 * L]));
      leg.add(ellip(mats.dark, [0.04, -0.38, -0.12], [0.09 * L, 0.07 * L, 0.15 * L], [0.4, 0, 0]));
      leg.add(mesh(CONE, mats.horn, [0.06, -0.38, -0.26], [0.03, 0.13, 0.03], [-1.6, 0, 0]));
      leg.add(mesh(CONE, mats.horn, [0.11, -0.38, -0.2], [0.025, 0.1, 0.025], [-1.6, 0, 0.4]));
    } else {
      leg.add(ellip(mats.body, [0.02, -0.1, 0], [0.15 * L, 0.24 * L, 0.17 * L]));
      leg.add(ellip(mats.dark, [0.03, -0.32, -0.04], [0.1 * L, 0.1 * L, 0.16 * L], [0.4, 0, 0]));
      leg.add(mesh(CONE, mats.horn, [0.05, -0.33, -0.17], [0.035, 0.13, 0.035], [-1.6, 0, 0]));
    }
    legGroups.push(leg);
  }

  // ── spine spikes + dorsal sail ──
  for (let i = 0; i < 6; i++) {
    const z = -0.7 + i * 0.27;
    const s = sh.spikes * (0.16 - i * 0.012);
    if (s > 0.02) rig.add(mesh(CONE, mats.accent, [0, 0.5 * B - i * 0.02, z * B], [s * 0.55, s * 2.4, s], [0.42, 0, 0]));
  }
  if (sh.backFin) {
    const sailGeo = new THREE.BufferGeometry();
    const pts = [];
    for (let i = 0; i < 7; i++) {
      const t = i / 6;
      pts.push(0, 0.42 * B, (-0.85 + t * 1.5) * B);
      pts.push(0, (0.42 + Math.sin(t * Math.PI) * 0.6) * B, (-0.85 + t * 1.5) * B);
    }
    const verts = [];
    for (let i = 0; i < 6; i++) {
      const a = i * 2;
      verts.push(...pts.slice(a * 3, a * 3 + 3), ...pts.slice((a + 1) * 3, (a + 1) * 3 + 3), ...pts.slice((a + 2) * 3, (a + 2) * 3 + 3));
      verts.push(...pts.slice(a * 3, a * 3 + 3), ...pts.slice((a + 2) * 3, (a + 2) * 3 + 3), ...pts.slice((a + 3) * 3, (a + 3) * 3 + 3));
    }
    sailGeo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    sailGeo.computeVertexNormals(); sailGeo.userData.dyn = true;
    rig.add(new THREE.Mesh(sailGeo, mats.wing));
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
  group.userData.tailTwins = tailTwins;
  group.userData.wingGroups = wingGroups;
  group.userData.legGroups = legGroups;
  group.userData.eyeMeshes = eyeMeshes;
  group.userData.form = form;
  group.userData.mats = mats;
  group.userData.pal = pal;
  group.userData.def = def;

  const tmp = { flap: Math.random() * 6, t: 0, seed: Math.random() * 10 };
  let glide = 0;
  const bodyBase = body.scale.clone();
  const idleCfg = {
    fierce:  { amp: 0.9, bob: 0.35, tilt: 0.5, wag: 1.3 },
    playful: { amp: 0.8, bob: 1.0, tilt: 0.7, wag: 1.6 },
    sleepy:  { amp: 0.45, bob: 0.25, tilt: 0.2, wag: 0.5 },
    regal:   { amp: 0.6, bob: 0.2, tilt: 0.35, wag: 0.7 },
    curious: { amp: 2.2, bob: 0.55, tilt: 0.9, wag: 1.0 },
    shy:     { amp: 1.5, bob: 0.3, tilt: 0.45, wag: 0.6 },
    proud:   { amp: 0.5, bob: 0.18, tilt: 0.28, wag: 0.55 },
    calm:    { amp: 0.8, bob: 0.3, tilt: 0.3, wag: 0.7 },
  }[form.idle] || { amp: 0.8, bob: 0.3, tilt: 0.3, wag: 0.7 };
  // Wing types beat at their own cadence: insects buzz, feathered wings sweep,
  // fins and ethereal membranes glide on slow, wide strokes. Heavier dragons
  // beat a little slower than hatchlings.
  const flightCfg = {
    insect:   { rate: 11.5, amp: 0.44, bob: 1.5 },
    feather:  { rate: 7.2,  amp: 0.62, bob: 1.05 },
    fin:      { rate: 4.4,  amp: 0.4,  bob: 0.78 },
    ethereal: { rate: 3.3,  amp: 0.48, bob: 0.62 },
    membrane: { rate: 6.0,  amp: 0.55, bob: 1.0 },
  }[form.wingType] || { rate: 6.0, amp: 0.55, bob: 1.0 };
  const flightRate = flightCfg.rate / Math.sqrt(form.size || 1);

  function update(dt, st = {}) {
    tmp.t += dt;
    tmp.flap += dt * (st.flapSpeed ?? (st.boosting ? 9 : flightRate));
    const speed = st.speed ?? 45;
    const flying = st.flying !== false;
    const grounded = st.grounded || !flying;
    const excite = THREE.MathUtils.clamp(st.excite || 0, 0, 1);
    const glideTarget = st.gliding ? 1 : 0;
    glide += (glideTarget - glide) * Math.min(1, dt * 4);
    const flapAmt = flying ? flightCfg.amp * (1 - glide * 0.68) : 0.0;
    const flap = Math.sin(tmp.flap) * flapAmt;
    const flap2 = Math.sin(tmp.flap + 0.4) * flapAmt * 0.8;
    // A grounded dragon folds its wings, then stretches them now and then.
    // Fancier wing types (feather, ethereal, fin) stay semi-open so their
    // silhouette still reads while resting.
    const stretch = grounded ? Math.max(0, Math.sin(tmp.t * 0.8 + tmp.seed) - 0.86) / 0.14 : 0;
    // Resting wing pose per wing type: fold lifts the span up over the back,
    // swept rakes it backwards, tuck shortens it so it cannot clip the ground.
    const restPose = {
      insect:   { fold: 0.70, swept: 0.20, tuck: 0.85 },
      fin:      { fold: 0.55, swept: 0.32, tuck: 0.90 },
      feather:  { fold: 0.58, swept: 0.30, tuck: 0.95 },
      ethereal: { fold: 0.50, swept: 0.35, tuck: 0.95 },
      membrane: { fold: 0.62, swept: 0.26, tuck: 0.94 },
    }[form.wingType] || { fold: 0.62, swept: 0.26, tuck: 0.94 };
    const idleOpen = grounded ? 0.06 + Math.sin(tmp.t * 0.7 + tmp.seed) * 0.04 : 0;
    const swept = grounded ? restPose.swept : 0.18;
    const fold = grounded ? restPose.fold + stretch * 0.58 + excite * 0.3 + idleOpen : 0.12;
    wingGroups[0].rotation.z = fold + flap;
    wingGroups[1].rotation.z = fold + flap;
    wingGroups[0].rotation.y = -swept - flap2 * 0.22 + (st.bank || 0) * 0.06;
    wingGroups[1].rotation.y = swept + flap2 * 0.22 + (st.bank || 0) * 0.06;
    // Tuck the wing span in when grounded so the long finger bones do not stick
    // out like blades. During a stretch the wings open up again.
    const tuck = grounded ? restPose.tuck + stretch * (1 - restPose.tuck) * 0.92 + idleOpen * 0.5 : 1;
    wingGroups[0].scale.x = tuck;
    wingGroups[1].scale.x = -tuck;
    // body bob + pitch lean + breathing
    if (grounded) {
      const hop = Math.abs(Math.sin(tmp.t * 1.4 + tmp.seed)) ** 8 * 0.09 * idleCfg.bob * excite;
      rig.position.y = hop + Math.sin(tmp.t * 1.1) * 0.012;
    } else {
      rig.position.y = Math.sin(tmp.t * 2.1) * 0.05 * flightCfg.bob;
    }
    rig.rotation.x = (st.pitchLean || 0) * 0.25;
    rig.rotation.z = (st.bank || 0) * 0.25;
    const breath = 1 + Math.sin(tmp.t * (grounded ? 1.5 : 2.4)) * 0.016;
    body.scale.copy(bodyBase).multiplyScalar(breath);
    // tail weave
    tailSegs.forEach((s, i) => {
      s.rotation.y = Math.sin(tmp.t * 3.1 + i * 0.6) * (0.05 + i * 0.01) * (0.5 + speed / 90) * (grounded ? 0.75 : 1);
      s.rotation.x = Math.sin(tmp.t * 2.2 + i * 0.5) * 0.02;
    });
    tailTwins.forEach((t, ti) => { t.rotation.y = (ti ? -1 : 1) * 0.24 + Math.sin(tmp.t * 1.8) * 0.08; });
    // neck sway, breathing and personality-specific head movement
    const look = Math.sin(tmp.t * 0.42 + tmp.seed) * 0.42 * idleCfg.amp;
    neck.rotation.x = Math.sin(tmp.t * 1.6) * 0.022 + (st.pitchLean || 0) * -0.2 + (form.idle === 'sleepy' ? 0.08 : 0);
    neck.rotation.y = (st.headTurn || 0) * 0.16 + (grounded ? look * 0.4 : 0);
    head.rotation.x = Math.sin(tmp.t * 1.2) * 0.04 + (grounded ? Math.sin(tmp.t * 0.9 + 2) * 0.03 * idleCfg.amp : 0);
    head.rotation.z = grounded ? Math.sin(tmp.t * 0.55 + tmp.seed) * 0.06 * idleCfg.tilt : 0;
    head.rotation.y = grounded ? Math.sin(tmp.t * 0.7 + 1) * 0.09 * idleCfg.tilt : 0;
    // blinking (two quick blinks, then a long pause)
    const blinkCycle = (tmp.t + tmp.seed) % 4.6;
    const blink = blinkCycle < 0.11 || (blinkCycle > 0.24 && blinkCycle < 0.32) ? 0.08 : 1;
    eyeMeshes.forEach(eye => { eye.scale.y = eye.userData.baseScale[1] * blink; });
    // idle foot shifting / walk cycle
    legGroups.forEach((leg, i) => {
      const walkAmt = grounded ? (st.walk || 0.18) : 0;
      leg.rotation.x = Math.sin(tmp.t * 1.3 + i * Math.PI * 0.5 + tmp.seed) * 0.055 * walkAmt;
      leg.rotation.z = Math.sin(tmp.t * 0.9 + i) * 0.02 * walkAmt;
    });
    // rider bob and scarf flutter
    const rider = group.userData.rider;
    if (rider) {
      rider.position.y = rider.userData.baseY + (grounded ? Math.sin(tmp.t * 1.5 + 1) * 0.018 : Math.sin(tmp.t * 2.1 + 1) * 0.035);
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
    mats.eye.color.set(pal.eye);
  }

  function setRiderVisible(v) {
    if (group.userData.rider) group.userData.rider.visible = v;
  }

  // shadow flags
  group.traverse(o => {
    if (o.isMesh) { o.castShadow = opts.castShadow ?? true; o.receiveShadow = false; }
  });

  return { group, update, rig, mats, setRiderVisible, def, level, form, flightRate };
}

// Wingspan silhouette helper for UI cards. Shape data drives body proportions,
// head, horns, wings and tail so all 66 species read differently in the roster.
export function dragonThumb(def, size = 96, silhouette = false) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const c = canvas.getContext('2d');
  const p = def.palette, sh = def.shape || {};
  const s = size / 96;
  const fam = def.family || 'forest';
  const bg = {
    fire: ['#3b1d1a', '#160b0c'], ice: ['#173a4d', '#081520'], night: ['#211a35', '#0a0814'],
    forest: ['#1d3a24', '#09140d'], ocean: ['#123b46', '#06171c'], storm: ['#1d2b4d', '#080f1c'],
    earth: ['#352d22', '#120e0a'], venom: ['#26351a', '#0c1208'], ancient: ['#352c3d', '#120e18'], hybrid: ['#2f2340', '#100a18'],
  }[fam] || ['#16324a', '#0a1620'];
  const g = c.createLinearGradient(0, 0, size, size);
  g.addColorStop(0, bg[0]); g.addColorStop(1, bg[1]);
  c.fillStyle = g; c.fillRect(0, 0, size, size);
  if (!silhouette) {
    const glow = c.createRadialGradient(size / 2, size * 0.52, 2, size / 2, size * 0.52, size * 0.5);
    glow.addColorStop(0, p.accent + '44'); glow.addColorStop(1, 'transparent');
    c.fillStyle = glow; c.fillRect(0, 0, size, size);
  }
  const ink = silhouette ? '#080d12' : null;
  const fill = (col) => { c.fillStyle = silhouette ? ink : col; };
  const stroke = (col) => { c.strokeStyle = silhouette ? '#1b2a36' : col; };
  const bw = (sh.width ?? 1), bl = (sh.length ?? 1), bs = (sh.size ?? 1);
  const wingType = sh.wingType || 'membrane', headType = sh.headType || 'dragon';
  const hornType = sh.hornType || sh.hornsType || 'default', tailType = sh.tailType || 'membrane';
  const span = (sh.wings ?? 1) * bs;
  const wingCol = silhouette ? ink : p.wing;
  const drawWing = (side, yOff, scale, alpha) => {
    c.save(); c.globalAlpha = alpha;
    fill(wingCol);
    c.beginPath();
    c.moveTo(0, -1 * s);
    if (wingType === 'insect') {
      c.quadraticCurveTo(side * 28 * span, (-20 + yOff) * s, side * 40 * span, (-10 + yOff) * s);
      c.quadraticCurveTo(side * 36 * span, (8 + yOff) * s, side * 7 * s, (4 + yOff) * s);
    } else if (wingType === 'fin') {
      c.quadraticCurveTo(side * 35 * span, (-12 + yOff) * s, side * 38 * span, (7 + yOff) * s);
      c.quadraticCurveTo(side * 22 * span, (13 + yOff) * s, side * 5 * s, (4 + yOff) * s);
    } else if (wingType === 'feather') {
      c.quadraticCurveTo(side * 31 * span, (-22 + yOff) * s, side * 44 * span, (-8 + yOff) * s);
      c.lineTo(side * 36 * span, (9 + yOff) * s);
      c.lineTo(side * 20 * span, (3 + yOff) * s);
      c.lineTo(side * 6 * s, (5 + yOff) * s);
    } else {
      c.quadraticCurveTo(side * 32 * span, (-22 + yOff) * s, side * 43 * span, (-10 + yOff) * s);
      c.lineTo(side * 38 * span, (10 + yOff) * s);
      c.lineTo(side * 8 * s, (5 + yOff) * s);
    }
    c.closePath(); c.fill();
    c.restore();
  };
  c.save(); c.translate(size / 2, size * 0.52);
  if (wingType === 'insect') { drawWing(-1, 10, 0.72, 0.85); drawWing(1, 10, 0.72, 0.85); }
  drawWing(-1, 0, 1, wingType === 'ethereal' ? 0.55 : 1);
  drawWing(1, 0, 1, wingType === 'ethereal' ? 0.55 : 1);
  if (wingType === 'feather') {
    stroke(silhouette ? '#1b2a36' : p.horn); c.lineWidth = 1.1 * s;
    for (let i = 0; i < 4; i++) {
      c.beginPath(); c.moveTo(0, 0); c.lineTo(-(18 + i * 6) * span * s, (-14 + i * 3) * s); c.stroke();
      c.beginPath(); c.moveTo(0, 0); c.lineTo((18 + i * 6) * span * s, (-14 + i * 3) * s); c.stroke();
    }
  }
  // body + belly
  fill(p.body);
  c.beginPath(); c.ellipse(0, 8 * s, 10 * s * bw, 19 * s * bl * bs, 0, 0, Math.PI * 2); c.fill();
  if (!silhouette) {
    fill(p.belly);
    c.beginPath(); c.ellipse(0, 14 * s, 6 * s * bw, 11 * s * bl, 0, 0, Math.PI * 2); c.fill();
  }
  // neck and head
  const neckLen = (sh.neck ?? 1);
  fill(p.body);
  c.beginPath();
  c.moveTo(-4 * s * bw, 0); c.quadraticCurveTo(-6 * s * bw, -12 * s * neckLen, -3 * s, -18 * s * neckLen);
  c.lineTo(3 * s, -18 * s * neckLen); c.quadraticCurveTo(6 * s * bw, -12 * s * neckLen, 4 * s * bw, 0); c.closePath(); c.fill();
  const hw = headType === 'hammer' ? 11 : headType === 'serpent' ? 5 : 7;
  const hh = headType === 'serpent' ? 4.2 : 5;
  c.beginPath(); c.ellipse(0, -23 * s * neckLen, hw * s, hh * s, 0, 0, Math.PI * 2); c.fill();
  if (headType === 'beak') { fill(p.horn); c.beginPath(); c.moveTo(0, -25 * s); c.lineTo(5 * s, -30 * s); c.lineTo(0, -28 * s); c.closePath(); c.fill(); }
  if (headType === 'frilled') { fill(p.accent); for (let i = -2; i <= 2; i++) { c.beginPath(); c.moveTo(i * 4 * s, -25 * s); c.lineTo(i * 7 * s, -33 * s); c.lineTo(i * 4 * s + 3 * s, -26 * s); c.closePath(); c.fill(); } }
  // horns
  stroke(silhouette ? '#1b2a36' : p.horn); c.lineWidth = 2.1 * s; c.lineCap = 'round';
  const hornAt = (x1, y1, x2, y2) => { c.beginPath(); c.moveTo(x1 * s, y1 * s); c.lineTo(x2 * s, y2 * s); c.stroke(); };
  const hy = -26 * neckLen;
  if (hornType === 'antlers') {
    hornAt(-3, hy - 1, -9, hy - 9); hornAt(-9, hy - 9, -13, hy - 7); hornAt(-9, hy - 9, -7, hy - 13);
    hornAt(3, hy - 1, 9, hy - 9); hornAt(9, hy - 9, 13, hy - 7); hornAt(9, hy - 9, 7, hy - 13);
  } else if (hornType === 'crown') {
    for (let i = -2; i <= 2; i++) hornAt(i * 3.5, hy, i * 6.5, hy - 8 - (2 - Math.abs(i)) * 2);
  } else if (hornType === 'frill') {
    stroke(silhouette ? '#1b2a36' : p.accent);
    for (let i = -3; i <= 3; i++) hornAt(i * 2.5, hy + 1, i * 4.2, hy - 6);
  } else if (hornType === 'spike') {
    hornAt(-3, hy, -7, hy - 10); hornAt(3, hy, 7, hy - 10);
  } else {
    hornAt(-3, hy, -7, hy - 9); hornAt(3, hy, 7, hy - 9);
    if ((sh.horns ?? 0) >= 3) { hornAt(-1, hy, -2, hy - 7); hornAt(1, hy, 2, hy - 7); }
  }
  // eyes
  if (!silhouette) {
    fill(p.eye);
    c.beginPath(); c.arc(-3 * s, hy + 2 * s, 1.5 * s, 0, 7); c.fill();
    c.beginPath(); c.arc(3 * s, hy + 2 * s, 1.5 * s, 0, 7); c.fill();
    // pattern
    if (['stripes', 'streaks'].includes(sh.pattern)) {
      stroke(p.accent); c.lineWidth = 1.2 * s;
      for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(-7 * s, (2 + i * 4) * s); c.lineTo(7 * s, (2 + i * 4) * s); c.stroke(); }
    } else if (['glow', 'lava', 'stars', 'prism', 'runes'].includes(sh.pattern)) {
      fill(p.accent);
      for (let i = 0; i < 7; i++) c.fillRect((-8 + (i % 3) * 5) * s, (1 + Math.floor(i / 3) * 5) * s, 1.6 * s, 1.6 * s);
    } else if (sh.pattern === 'spots') {
      fill(p.accent);
      for (let i = 0; i < 6; i++) { c.beginPath(); c.arc((-6 + (i % 3) * 6) * s, (4 + Math.floor(i / 3) * 7) * s, 1.5 * s, 0, 7); c.fill(); }
    }
  }
  // tail
  const tailLen = (sh.tail ?? 1);
  stroke(silhouette ? '#1b2a36' : p.body); c.lineWidth = 6 * s * bs; c.lineCap = 'round';
  c.beginPath(); c.moveTo(0, 24 * s); c.quadraticCurveTo(6 * s, (32 + tailLen * 5) * s, -2 * s, (40 + tailLen * 7) * s); c.stroke();
  fill(p.accent);
  if (tailType === 'club') { c.beginPath(); c.arc(-2 * s, (42 + tailLen * 6) * s, 5 * s, 0, 7); c.fill(); }
  else if (tailType === 'spade') { c.beginPath(); c.moveTo(-2 * s, (40 + tailLen * 6) * s); c.lineTo(-9 * s, (46 + tailLen * 5) * s); c.lineTo(-2 * s, (50 + tailLen * 5) * s); c.lineTo(5 * s, (46 + tailLen * 5) * s); c.closePath(); c.fill(); }
  else if (tailType === 'feather') { for (let i = -2; i <= 2; i++) { c.beginPath(); c.moveTo(-2 * s, (40 + tailLen * 5) * s); c.lineTo(i * 4 * s, (48 + tailLen * 6) * s); c.lineTo(i * 4 * s + 2 * s, (44 + tailLen * 5) * s); c.closePath(); c.fill(); } }
  else if (tailType === 'twin') { stroke(silhouette ? '#1b2a36' : p.body); c.lineWidth = 3.5 * s; c.beginPath(); c.moveTo(-3 * s, 22 * s); c.quadraticCurveTo(-12 * s, 30 * s, -8 * s, 38 * s); c.stroke(); }
  c.restore();
  return canvas.toDataURL();
}
