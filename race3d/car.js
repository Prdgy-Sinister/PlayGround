import * as THREE from '../vendor/three.module.js';
import { loft, strut, box, clamp, lerp, texWheelFace } from './util.js';

/* Era-specific chassis prescriptions. All numbers are metres. */
export const CAR_STYLES = [
  { vintage: true, wheelR: .40, wheelW: .19, wheelbase: 2.55, trackW: 1.24, nose: 2.72, axle: .45, frontWing: 0, rearWing: 0, halo: false, airbox: false, sidepods: false, openCockpit: true },
  { vintage: true, wheelR: .38, wheelW: .23, wheelbase: 2.45, trackW: 1.30, nose: 2.62, axle: .40, frontWing: 0, rearWing: .42, halo: false, airbox: false, sidepods: false, openCockpit: true },
  { vintage: false, wheelR: .36, wheelW: .26, wheelbase: 2.55, trackW: 1.42, nose: 2.72, frontWing: 1.15, rearWing: .82, halo: false, airbox: true, sidepods: true },
  { vintage: false, wheelR: .35, wheelW: .30, wheelbase: 2.65, trackW: 1.50, nose: 2.66, frontWing: 1.45, rearWing: .92, halo: false, airbox: true, sidepods: true },
  { vintage: false, wheelR: .34, wheelW: .31, wheelbase: 2.95, trackW: 1.56, nose: 2.78, frontWing: 1.62, rearWing: .95, halo: false, airbox: true, sidepods: true },
  { vintage: false, wheelR: .34, wheelW: .33, wheelbase: 3.06, trackW: 1.60, nose: 2.86, frontWing: 1.78, rearWing: 1.00, halo: false, airbox: true, sidepods: true },
  { vintage: false, wheelR: .35, wheelW: .35, wheelbase: 3.22, trackW: 1.62, nose: 2.94, frontWing: 1.82, rearWing: 1.00, halo: true, airbox: true, sidepods: true },
  { vintage: false, wheelR: .36, wheelW: .39, wheelbase: 3.42, trackW: 1.63, nose: 3.00, frontWing: 1.95, rearWing: 1.05, halo: true, airbox: true, sidepods: true },
  { vintage: false, wheelR: .36, wheelW: .39, wheelbase: 3.58, trackW: 1.62, nose: 3.04, frontWing: 2.00, rearWing: 1.05, halo: true, airbox: true, sidepods: true }
];

export function createCarTextures() {
  return {
    carbon: null, // filled by caller
    wheelFaceVintage: texWheelFace(true),
    wheelFaceModern: texWheelFace(false)
  };
}

export function buildCar(style, opts, shared) {
  const low = !!opts.low;
  const primary = opts.primary || '#d8d9cf';
  const accent = opts.accent || '#1a1c1e';

  const paint = new THREE.MeshPhysicalMaterial({
    color: primary, metalness: .45, roughness: .26, clearcoat: 1,
    clearcoatRoughness: .09, envMapIntensity: 1.15
  });
  const accentMat = new THREE.MeshPhysicalMaterial({
    color: accent, metalness: .28, roughness: .34, clearcoat: .8,
    clearcoatRoughness: .16, envMapIntensity: 1.0
  });
  const carbon = new THREE.MeshStandardMaterial({ map: shared.carbon, color: 0xffffff, metalness: .45, roughness: .5 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x0b0d0f, metalness: .45, roughness: .5 });
  const chrome = new THREE.MeshStandardMaterial({ color: 0xd8dde1, metalness: 1, roughness: .15 });
  const rubber = new THREE.MeshStandardMaterial({ color: 0x151516, metalness: .01, roughness: .94 });
  const faceMat = new THREE.MeshStandardMaterial({
    map: style.vintage ? shared.wheelFaceVintage : shared.wheelFaceModern,
    metalness: .25, roughness: .6
  });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x0a0f13, metalness: .8, roughness: .05, envMapIntensity: 1.9 });
  const brake = new THREE.MeshStandardMaterial({ color: 0x220502, emissive: 0xff1a08, emissiveIntensity: 2.6, roughness: .4 });
  const headMat = new THREE.MeshPhysicalMaterial({ color: opts.helmet || '#e9e9df', metalness: .2, roughness: .22, clearcoat: 1, clearcoatRoughness: .08, envMapIntensity: 1.2 });

  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);

  const add = (m, parent = body) => {
    m.castShadow = true; m.receiveShadow = true; parent.add(m); return m;
  };

  const radial = low ? 12 : 22;
  const zAt = (t) => -1.95 + t * (style.nose + 1.95);

  /* ---- survival cell / bodywork ---- */
  let profile;
  if (style.vintage) {
    profile = [
      [0, .070, .090, .520], [.05, .180, .200, .545], [.14, .290, .268, .558],
      [.28, .365, .298, .563], [.40, .400, .310, .560], [.52, .412, .312, .556],
      [.64, .405, .310, .552], [.76, .385, .300, .548], [.86, .350, .288, .545],
      [.94, .295, .268, .542], [1, .230, .242, .540]
    ];
  } else {
    profile = [
      [0, .045, .065, .40], [.08, .120, .145, .42], [.18, .200, .220, .45],
      [.30, .285, .250, .48], [.42, .325, .265, .50], [.52, .335, .275, .51],
      [.62, .305, .250, .49], [.72, .230, .185, .42], [.82, .150, .120, .33],
      [.92, .080, .070, .25], [1, .018, .024, .21]
    ];
  }
  const sections = profile.map(([t, w, h, y]) => ({ z: zAt(t), w, h, y }));
  add(new THREE.Mesh(loft(sections, radial), paint));
  const topAt = (t) => {
    for (let i = 0; i < profile.length - 1; i++) {
      const a = profile[i], b = profile[i + 1];
      if (t >= a[0] && t <= b[0]) {
        const k = (t - a[0]) / (b[0] - a[0]);
        return lerp(a[3], b[3], k) + lerp(a[2], b[2], k);
      }
    }
    return profile[profile.length - 1][3] + profile[profile.length - 1][2];
  };

  const cockpitZ = zAt(style.vintage ? .40 : .52);
  const topY = style.vintage ? .855 : .785;

  if (style.vintage) {
    // blunt front with a chrome grille, as on a 1950s front-engined car
    const cap = new THREE.Mesh(new THREE.CircleGeometry(1, 24), paint);
    cap.scale.set(.230, .242, 1);
    cap.position.set(0, .540, style.nose + .002);
    add(cap);
    const grille = new THREE.Mesh(new THREE.CircleGeometry(1, 24), dark);
    grille.scale.set(.192, .206, 1);
    grille.position.set(0, .538, style.nose + .012);
    add(grille);
    const ring = new THREE.Mesh(new THREE.RingGeometry(.84, 1, 28), chrome);
    ring.scale.set(.216, .230, 1);
    ring.position.set(0, .538, style.nose + .016);
    add(ring);
    for (let k = -1; k <= 1; k++) {
      const bar = box(.32, .012, .012, chrome);
      bar.position.set(0, .538 + k * .058, style.nose + .019);
      add(bar);
    }
    const tail = new THREE.Mesh(new THREE.CircleGeometry(1, 22), paint);
    tail.scale.set(.070, .090, 1);
    tail.position.set(0, .520, -1.949);
    tail.rotation.y = Math.PI;
    add(tail);
    const tailLight = new THREE.Mesh(new THREE.CircleGeometry(.028, 12), new THREE.MeshStandardMaterial({ color: 0x2a0502, emissive: 0xff2208, emissiveIntensity: .5, roughness: .4 }));
    tailLight.position.set(0, .585, -1.955);
    tailLight.rotation.y = Math.PI;
    add(tailLight);
  }

  /* ---- floor / plank ---- */
  if (!low && !style.vintage) {
    const floor = box(style.vintage ? .72 : 1.02, .055, style.vintage ? 3.1 : 4.3, carbon);
    floor.position.set(0, .125, style.vintage ? -.1 : .25);
    add(floor);
  }

  /* ---- sidepods ---- */
  if (style.sidepods) {
    for (const s of [-1, 1]) {
      const pod = [
        { z: zAt(.12), x: s * .27, w: .035, h: .06, y: .42 },
        { z: zAt(.20), x: s * .41, w: .10, h: .14, y: .405 },
        { z: zAt(.32), x: s * .46, w: .17, h: .19, y: .395 },
        { z: zAt(.45), x: s * .47, w: .19, h: .20, y: .385 },
        { z: zAt(.57), x: s * .44, w: .17, h: .19, y: .395 },
        { z: zAt(.67), x: s * .37, w: .10, h: .13, y: .42 }
      ];
      add(new THREE.Mesh(loft(pod, radial), paint));
      if (!low) {
        const inlet = new THREE.Mesh(new THREE.CircleGeometry(1, 16), dark);
        inlet.scale.set(.135, .16, 1);
        inlet.position.set(s * .41, .405, zAt(.205));
        inlet.rotation.y = s > 0 ? 0 : Math.PI;
        add(inlet);
      }
    }
  }

  /* ---- cockpit, driver, halo ---- */
  const opening = new THREE.Mesh(new THREE.CircleGeometry(1, 20), dark);
  opening.scale.set(style.vintage ? .215 : .23, style.vintage ? .36 : .40, 1);
  opening.rotation.x = -Math.PI / 2;
  opening.position.set(0, topY + .012, cockpitZ);
  add(opening);

  const helmet = new THREE.Mesh(new THREE.SphereGeometry(.125, 18, 14), headMat);
  helmet.scale.set(1, .96, 1.06);
  helmet.position.set(0, style.vintage ? .90 : .80, cockpitZ + .02);
  add(helmet);
  const visor = box(.20, .062, .05, glass);
  visor.position.set(0, helmet.position.y + .012, cockpitZ + .115);
  add(visor);

  if (!style.vintage) {
    const halo = new THREE.Mesh(new THREE.TorusGeometry(.29, .028, 7, 22, Math.PI), carbon);
    halo.rotation.x = Math.PI / 2;
    halo.rotation.z = 0;
    halo.position.set(0, .81, cockpitZ - .02);
    add(halo);
    const pillar = box(.05, .24, .05, carbon);
    pillar.position.set(0, .88, cockpitZ + .46);
    pillar.rotation.x = -.16;
    add(pillar);
    const hoop = new THREE.Mesh(new THREE.TorusGeometry(.26, .032, 7, 18, Math.PI), carbon);
    hoop.position.set(0, .84, cockpitZ - .52);
    add(hoop);
  } else {
    const cowl = box(.36, .05, .20, paint);
    cowl.position.set(0, topAt(.55) + .012, zAt(.55));
    cowl.rotation.x = -.12;
    add(cowl);
    const screenMat = new THREE.MeshPhysicalMaterial({
      color: 0xa9c4d4, metalness: 0, roughness: .04, transparent: true, opacity: .26,
      envMapIntensity: 2.2, depthWrite: false, side: THREE.DoubleSide
    });
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(.30, .155), screenMat);
    screen.position.set(0, topAt(.55) + .10, zAt(.55) - .02);
    screen.rotation.x = -.62;
    add(screen);
    for (const s of [-1, 1]) {
      strut(body, new THREE.Vector3(s * .132, topAt(.55) + .005, zAt(.55) - .03),
        new THREE.Vector3(s * .145, topAt(.55) + .155, zAt(.55) - .09), .009, chrome);
    }
    const lip = box(.32, .016, .022, chrome);
    lip.position.set(0, topAt(.55) + .16, zAt(.55) - .10);
    add(lip);
    const padding = new THREE.Mesh(new THREE.TorusGeometry(.19, .026, 6, 20), new THREE.MeshStandardMaterial({ color: 0x3a2a1d, roughness: .85 }));
    padding.rotation.x = Math.PI / 2;
    padding.position.set(0, topY + .005, cockpitZ);
    add(padding);
    const fairing = new THREE.Mesh(new THREE.SphereGeometry(.19, 14, 10), paint);
    fairing.scale.set(.92, .74, 1.9);
    fairing.position.set(0, topAt(.20) + .02, cockpitZ - .62);
    add(fairing);
    if (!low) {
      const strap = box(.36, .014, .05, new THREE.MeshStandardMaterial({ color: 0x4b3421, roughness: .8 }));
      strap.position.set(0, topAt(.68) + .006, zAt(.68));
      add(strap);
      const filler = new THREE.Mesh(new THREE.CylinderGeometry(.05, .05, .028, 12), chrome);
      filler.position.set(0, topAt(.14), zAt(.14));
      add(filler);
    }
  }

  /* ---- airbox / roll hoop ---- */
  if (style.airbox) {
    const air = [
      { z: -.62, w: .06, h: .07, y: .80 }, { z: -.42, w: .15, h: .14, y: .85 },
      { z: -.18, w: .16, h: .15, y: .89 }, { z: -.02, w: .10, h: .10, y: .91 }
    ];
    add(new THREE.Mesh(loft(air, radial), paint));
  } else if (!style.halo) {
    const hoop = new THREE.Mesh(new THREE.TorusGeometry(.24, .032, 6, 16, Math.PI), carbon);
    hoop.position.set(0, topY + .015, cockpitZ - .66);
    add(hoop);
  }

  /* ---- wings ---- */
  if (style.frontWing > 0) {
    const w = style.frontWing;
    const main = box(w, .034, .36, paint);
    main.position.set(0, .115, style.nose - .18);
    main.rotation.x = -.07;
    add(main);
    const flap = box(w * .93, .026, .22, carbon);
    flap.position.set(0, .175, style.nose - .30);
    flap.rotation.x = .28;
    add(flap);
    for (const s of [-1, 1]) {
      const ep = box(.024, .30, .44, paint);
      ep.position.set(s * w / 2, .19, style.nose - .27);
      add(ep);
    }
    strut(body, new THREE.Vector3(-.10, .22, style.nose - .42), new THREE.Vector3(-.10, .11, style.nose - .22), .02, carbon);
    strut(body, new THREE.Vector3(.10, .22, style.nose - .42), new THREE.Vector3(.10, .11, style.nose - .22), .02, carbon);
  }

  if (style.rearWing > .02) {
    const w = .62 + .48 * style.rearWing;
    const yTop = .96;
    const zR = -1.99;
    const main = box(w, .036, .34, carbon);
    main.position.set(0, yTop, zR);
    main.rotation.x = .12;
    add(main);
    const flap = box(w * .9, .028, .2, accentMat);
    flap.position.set(0, yTop + .115, zR - .13);
    flap.rotation.x = .36;
    add(flap);
    for (const s of [-1, 1]) {
      const ep = box(.024, .55, .46, paint);
      ep.position.set(s * w / 2, yTop - .14, zR - .02);
      add(ep);
    }
    const support = box(.045, .42, .1, carbon);
    support.position.set(0, yTop - .28, zR + .02);
    add(support);
    if (!low) {
      const drs = box(.16, .06, .1, dark);
      drs.position.set(0, yTop + .02, zR - .21);
      add(drs);
    }
  }

  /* ---- diffuser ---- */
  if (!low) {
    const diff = box(.92, .12, .5, carbon);
    diff.position.set(0, .17, -2.02);
    add(diff);
    for (let i = -2; i <= 2; i++) {
      const st = box(.018, .13, .46, dark);
      st.position.set(i * .17, .16, -2.03);
      add(st);
    }
  }

  /* ---- mirrors ---- */
  if (!low) {
    for (const s of [-1, 1]) {
      const stalk = strut(body, new THREE.Vector3(s * .26, .72, cockpitZ + .18), new THREE.Vector3(s * .42, .76, cockpitZ + .30), .014, carbon);
      const mir = box(.13, .06, .035, paint);
      mir.position.set(s * .45, .77, cockpitZ + .31);
      add(mir);
    }
  }

  /* ---- suspension ---- */
  const R = style.wheelR;
  const wt = style.trackW / 2;
  const axleOff = style.axle || 0;
  const fz = style.wheelbase / 2 + axleOff;
  const rz = fz - style.wheelbase;
  if (!low) {
    for (const s of [-1, 1]) {
      strut(body, new THREE.Vector3(s * .29, .52, fz - .12), new THREE.Vector3(s * (wt - .05), R, fz), .021, dark);
      strut(body, new THREE.Vector3(s * .29, .30, fz - .34), new THREE.Vector3(s * (wt - .05), R, fz), .021, dark);
      strut(body, new THREE.Vector3(s * .27, .46, rz + .16), new THREE.Vector3(s * (wt - .05), R, rz), .021, dark);
      strut(body, new THREE.Vector3(s * .27, .30, rz - .08), new THREE.Vector3(s * (wt - .05), R, rz), .021, dark);
    }
  }

  /* ---- wheels ---- */
  const wheels = [];
  const wheelGeo = new THREE.CylinderGeometry(R, R, style.wheelW, low ? 16 : 26, 1, false);
  wheelGeo.rotateZ(Math.PI / 2);
  for (const front of [true, false]) {
    for (const s of [-1, 1]) {
      const pivot = new THREE.Group();
      pivot.position.set(s * wt, R, front ? fz : rz);
      root.add(pivot);
      const wheel = new THREE.Mesh(wheelGeo, [rubber, faceMat, faceMat]);
      wheel.castShadow = true;
      wheel.rotation.x = Math.PI / 2; // orient the texture upright on the caps
      pivot.add(wheel);
      wheels.push({ pivot, wheel, front, spin: 0 });
    }
  }

  /* ---- exhausts / rain light / decals ---- */
  if (!low) {
    if (style.vintage) {
      for (const s of [-1, 1]) {
        for (let i = 0; i < 3; i++) {
          strut(body, new THREE.Vector3(s * .395, .330 + i * .030, .30 + i * .26),
            new THREE.Vector3(s * .430, .345 + i * .030, 1.62 + i * .06), .028, chrome);
        }
      }
    } else {
      const rainLight = box(.10, .07, .045, brake);
      rainLight.position.set(0, .38, -2.12);
      add(rainLight);
    }
    if (opts.number) {
      const decalT = style.vintage ? .84 : .80;
      const size = style.vintage ? .34 : .27;
      const decal = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshStandardMaterial({
        map: opts.number, transparent: true, roughness: .65, metalness: .05,
        depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2
      }));
      decal.rotation.x = -Math.PI / 2;
      decal.position.set(0, topAt(decalT) + .008, zAt(decalT));
      add(decal);
    }
    if (style.vintage && opts.roundel) {
      const roundelMat = new THREE.MeshStandardMaterial({
        map: opts.roundel, transparent: true, roughness: .7, metalness: .02,
        depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2
      });
      for (const s of [-1, 1]) {
        const rd = new THREE.Mesh(new THREE.PlaneGeometry(.44, .44), roundelMat);
        rd.position.set(s * .238, .655, zAt(.40));
        rd.rotation.y = s * Math.PI / 2;
        add(rd);
      }
    }
    const stripe = box(.07, .012, style.vintage ? .55 : 1.1, accentMat);
    stripe.position.set(0, topAt(style.vintage ? .34 : .34) + .008, zAt(.34));
    add(stripe);
    if (!style.vintage) {
      const fin = box(.02, .13, .85, carbon);
      fin.position.set(0, topAt(.30) + .05, zAt(.30));
      add(fin);
      const tcam = box(.16, .045, .05, dark);
      tcam.position.set(0, .99, -.30);
      add(tcam);
    }
  }

  root.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });

  return {
    root, body, wheels, helmet, brakeLight: !style.vintage, rainLightMat: brake,
    eye: new THREE.Vector3(0, style.vintage ? .99 : .97, cockpitZ + (style.vintage ? .10 : .05)),
    wheelR: style.wheelR,
    materials: [paint, accentMat, carbon, dark, chrome, rubber, faceMat, glass, brake, headMat]
  };
}

export function orientCar(rig, layout, distance, lateral, dt, speed, steer, opts = {}) {
  const u = distance / layout.length;
  const s = layout.sample(u);
  const pos = s.pos.clone().addScaledVector(s.side, lateral);
  rig.root.position.set(pos.x, pos.y + .015, pos.z);
  const yaw = Math.atan2(s.tangent.x, s.tangent.z) + (opts.yawOffset || 0);
  rig.root.rotation.y = yaw;

  const ratio = clamp(speed / 330, 0, 1);
  if (opts.player) {
    rig.body.rotation.z = -steer * ratio * .055;
    rig.body.rotation.x = clamp((opts.pitch || 0), -.03, .03);
    rig.body.position.y = Math.sin(performance.now() * .012) * .006 * ratio;
  } else {
    rig.body.rotation.z = Math.sin(performance.now() * .0015 + lateral) * .008;
    rig.body.rotation.x = 0;
  }

  const spin = speed / 3.6 / (rig.wheelR || .36) * dt;
  for (const w of rig.wheels) {
    w.spin -= spin;
    w.wheel.rotation.x = Math.PI / 2 + w.spin;
    if (w.front) w.pivot.rotation.y = steer * .45;
  }
  return { pos, yaw, tangent: s.tangent, side: s.side };
}
