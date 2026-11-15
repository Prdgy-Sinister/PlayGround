import * as THREE from '../vendor/three.module.js';
import { box, clamp, canvasTexture, mulberry32, hashStr } from './util.js';

export function buildScenery(layout, track, eraIndex, textures) {
  const group = new THREE.Group();
  const half = layout.halfWidth;
  const S = layout.S;
  const rnd = mulberry32(hashStr(track.name) + 99);

  /* ------------------------------ barriers ----------------------------- */
  const segLen = layout.length / S;
  const modern = eraIndex >= 2;
  const targetW = modern ? 4.6 : 2.35;
  const barrierStride = Math.max(1, Math.round(targetW / segLen));
  const pieceW = segLen * barrierStride * 1.04;
  const floaters = [];
  for (const s of [-1, 1]) {
    for (let i = 0; i < S; i += barrierStride) {
      const sm = layout.samples[i];
      const pos = sm.pos.clone().addScaledVector(sm.side, s * (half + 7.2));
      let yaw = Math.atan2(sm.tangent.x, sm.tangent.z);
      if (s < 0) yaw += Math.PI;
      floaters.push({ pos, yaw, i, s, tone: rnd() });
    }
  }
  const barrierGeo = modern ? new THREE.BoxGeometry(pieceW, .78, .22) : new THREE.BoxGeometry(pieceW, .78, .8);
  const barrierMat = modern
    ? new THREE.MeshStandardMaterial({ map: textures.barrier, roughness: .55, metalness: .55 })
    : new THREE.MeshStandardMaterial({ map: textures.straw, roughness: .98 });
  const barrierMesh = new THREE.InstancedMesh(barrierGeo, barrierMat, floaters.length);
  const dummy = new THREE.Object3D();
  const col = new THREE.Color();
  floaters.forEach((f, i) => {
    dummy.position.copy(f.pos);
    dummy.position.y += modern ? .39 : .41;
    dummy.rotation.set(0, f.yaw, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    barrierMesh.setMatrixAt(i, dummy.matrix);
    if (modern) {
      col.set(i % 9 === 0 ? 0xc23a2c : 0xffffff);
      barrierMesh.setColorAt(i, col);
    } else {
      col.setHSL(.115 + f.tone * .03, .26 + f.tone * .12, .33 + f.tone * .09);
      barrierMesh.setColorAt(i, col);
    }
  });
  barrierMesh.castShadow = true;
  barrierMesh.receiveShadow = true;
  if (barrierMesh.instanceColor) barrierMesh.instanceColor.needsUpdate = true;
  group.add(barrierMesh);

  if (modern) {
    const postGeo = new THREE.CylinderGeometry(.06, .06, 1.1, 5);
    const postMat = new THREE.MeshStandardMaterial({ color: 0x8d9292, metalness: .8, roughness: .4 });
    const posts = new THREE.InstancedMesh(postGeo, postMat, floaters.length);
    floaters.forEach((f, i) => {
      dummy.position.copy(f.pos);
      dummy.position.y += .55;
      dummy.rotation.set(0, f.yaw, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      posts.setMatrixAt(i, dummy.matrix);
    });
    posts.castShadow = true;
    group.add(posts);
  }

  /* ---------------------------- advertising ---------------------------- */
  const sponsorNames = [
    ['PIRELLI', '#1a1a1a', '#f2f2ec'], ['ROLEX', '#0f5132', '#e8d9a2'],
    ['DHL', '#f0c419', '#b3201a'], ['F1', '#c8102e', '#ffffff'],
    ['GENERATIONS', '#101510', '#d5f66a'], ['TURBO', '#1c3f6e', '#e9eef4']
  ];
  const sponsorTex = sponsorNames.map(([n, bg, fg]) => canvasTexture(512, 128, (ctx, w, h) => {
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = fg; ctx.font = '900 70px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(n, w / 2, h / 2 + 5);
  }));
  const boardGeo = new THREE.PlaneGeometry(6.2, .92);
  const boardLegGeo = new THREE.BoxGeometry(.09, 1.05, .09);
  const boardLegMat = new THREE.MeshStandardMaterial({ color: 0x6c7376, metalness: .5, roughness: .55 });
  const legLists = [];
  const boards = sponsorTex.map(() => []);
  const boardStride = Math.max(2, Math.round(7.4 / segLen));
  for (const s of [-1, 1]) {
    for (let i = 0; i < S; i += boardStride) {
      const sm = layout.samples[i];
      const pos = sm.pos.clone().addScaledVector(sm.side, s * (half + 7.45));
      pos.y += 1.32;
      const inward = sm.side.clone().multiplyScalar(-s);
      const yaw = Math.atan2(inward.x, inward.z);
      boards[(Math.random() * boards.length) | 0].push({ pos, yaw });
    }
  }
  boards.forEach((list, k) => {
    if (!list.length) return;
    const mat = new THREE.MeshStandardMaterial({
      map: sponsorTex[k], roughness: .62, metalness: .1, side: THREE.DoubleSide
    });
    mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping;
    const mesh = new THREE.InstancedMesh(boardGeo, mat, list.length);
    list.forEach((b, i) => {
      dummy.position.copy(b.pos);
      dummy.rotation.set(0, b.yaw, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.castShadow = false;
    group.add(mesh);

    const legs = new THREE.InstancedMesh(boardLegGeo, boardLegMat, list.length * 2);
    let li = 0;
    list.forEach(b => {
      for (const sgn of [-1, 1]) {
        dummy.position.copy(b.pos);
        dummy.position.y -= .92;
        dummy.rotation.set(0, b.yaw, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        dummy.translateX(sgn * 2.86);
        dummy.updateMatrix();
        legs.setMatrixAt(li++, dummy.matrix);
      }
    });
    legs.castShadow = true;
    group.add(legs);
  });

  /* ---------------------------- grandstands ---------------------------- */
  const concrete = new THREE.MeshStandardMaterial({ color: 0x9a9c96, roughness: .92 });
  const crowdMat = new THREE.MeshStandardMaterial({ map: textures.crowd, roughness: .95 });
  const crowdTex = textures.crowd.clone();
  crowdTex.needsUpdate = true;
  crowdTex.repeat.set(20, 2);
  crowdTex.wrapS = crowdTex.wrapT = THREE.RepeatWrapping;
  const crowdRowMat = new THREE.MeshStandardMaterial({ map: crowdTex, roughness: .95 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x77828a, metalness: .38, roughness: .62 });
  const steel = new THREE.MeshStandardMaterial({ color: 0xb6bbba, metalness: .7, roughness: .35 });

  const seatMat = new THREE.MeshStandardMaterial({ map: crowdTex, roughness: .95 });
  const deckMat = new THREE.MeshStandardMaterial({ color: 0x6f746f, roughness: .9 });
  const makeStand = () => {
    const g = new THREE.Group();
    const base = box(30, 2.1, 12, concrete);
    base.position.set(0, 1.05, -4.5);
    g.add(base);

    for (let r = 0; r < 6; r++) {
      const deck = new THREE.Mesh(new THREE.BoxGeometry(28, .62, 1.85), [
        deckMat, deckMat, seatMat, deckMat, deckMat, deckMat
      ]);
      deck.position.set(0, 2.1 + .31 + r * .62, -1.0 - r * 1.85);
      deck.castShadow = true;
      deck.receiveShadow = true;
      g.add(deck);
    }

    const back = box(28.4, 7.4, .8, concrete);
    back.position.set(0, 3.7, -12.4);
    g.add(back);

    const upper = box(28.4, 1.5, 10, new THREE.MeshStandardMaterial({ color: 0x3a4144, metalness: .3, roughness: .7 }));
    upper.position.set(0, 8.0, -7.2);
    g.add(upper);

    const roof = box(31, .32, 14.6, roofMat);
    roof.position.set(0, 8.9, -4.9);
    g.add(roof);
    const fascia = box(31, .55, .3, new THREE.MeshStandardMaterial({ color: 0x25292b, roughness: .6 }));
    fascia.position.set(0, 8.7, 2.3);
    g.add(fascia);
    for (const x of [-13, 0, 13]) {
      const post = box(.36, 8.6, .36, steel);
      post.position.set(x, 4.3, 1.9);
      g.add(post);
    }
    return g;
  };
  const template = makeStand();
  const standUs = [.20, .32, .44, .56, .68, .80, .90];
  standUs.forEach((u, k) => {
    if (u < .035 || u > .965) return;
    const sm = layout.sample(u);
    const s = k % 2 ? 1 : -1;
    const pos = sm.pos.clone().addScaledVector(sm.side, s * (half + 26));
    // never let a stand overhang a different part of the circuit
    if (layout.nearest(pos.x, pos.z).dist < 30) return;
    const y = layout.heightAt(pos.x, pos.z);
    const st = template.clone();
    st.position.set(pos.x, y - .2, pos.z);
    st.lookAt(sm.pos.x, y + 2.4, sm.pos.z);
    st.rotateY(Math.PI);
    group.add(st);
  });

  /* ---------------------------- pit building --------------------------- */
  const pit = new THREE.Group();
  const pitLength = 58, pitDepth = 12, pitHeight = 6.8;
  const pitBody = box(pitDepth, pitHeight, pitLength, new THREE.MeshStandardMaterial({ color: 0xacaea7, roughness: .84 }));
  pitBody.position.set(-pitDepth / 2, pitHeight / 2, 0);
  pit.add(pitBody);
  const pitRoof = box(pitDepth + 5, .55, pitLength + 5, new THREE.MeshStandardMaterial({ color: 0x4b5459, metalness: .4, roughness: .55 }));
  pitRoof.position.set(-pitDepth / 2 - 1.4, pitHeight + .2, 0);
  pit.add(pitRoof);
  const doorMat = new THREE.MeshStandardMaterial({ color: 0x14181b, roughness: .62, metalness: .28 });
  const stripeMat = new THREE.MeshStandardMaterial({ color: 0xd5f66a, emissive: 0x8ea838, emissiveIntensity: .35, roughness: .5 });
  for (let i = -3; i <= 3; i++) {
    const door = box(.3, 3.9, 5.2, doorMat);
    door.position.set(-pitDepth + .02, 2.1, i * 6.8);
    pit.add(door);
    const stripe = box(.16, .22, 5.4, stripeMat);
    stripe.position.set(-pitDepth - .04, 4.3, i * 6.8);
    pit.add(stripe);
    const band = box(.1, .5, 5.6, new THREE.MeshStandardMaterial({ color: 0x9aa0a2, metalness: .35, roughness: .55 }));
    band.position.set(-pitDepth - .02, 5.2, i * 6.8);
    pit.add(band);
  }
  const pitSign = new THREE.Mesh(new THREE.PlaneGeometry(22, 1.7), new THREE.MeshStandardMaterial({
    map: canvasTexture(512, 64, (ctx, w, h) => {
      ctx.fillStyle = '#101510'; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#d5f66a'; ctx.font = '900 36px Arial, sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('PIT LANE  \u00b7  F1', w / 2, h / 2 + 2);
    }), roughness: .6, side: THREE.DoubleSide
  }));
  pitSign.position.set(-pitDepth - .12, pitHeight - .55, 0);
  pitSign.rotation.y = -Math.PI / 2;
  pit.add(pitSign);

  const pitSample = layout.sample(.04);
  const pitYaw = Math.atan2(pitSample.tangent.x, pitSample.tangent.z);
  const pitPos = pitSample.pos.clone().addScaledVector(pitSample.side, half + 21);
  pit.position.set(pitPos.x, layout.heightAt(pitPos.x, pitPos.z) - .1, pitPos.z);
  pit.rotation.y = pitYaw + Math.PI;
  group.add(pit);

  /* ------------------------------ gantry ------------------------------- */
  const gantry = new THREE.Group();
  const gMat = new THREE.MeshStandardMaterial({ color: 0x6d767a, metalness: .35, roughness: .5 });
  const lightHousing = new THREE.MeshStandardMaterial({ color: 0x121416, metalness: .4, roughness: .5 });
  const lightMat = new THREE.MeshStandardMaterial({ color: 0x2a0502, emissive: 0xff1c08, emissiveIntensity: 0, roughness: .35 });
  for (const s of [-1, 1]) {
    const tower = box(.9, 7.4, .9, gMat);
    tower.position.set(s * (half + 4.2), 3.7, 0);
    gantry.add(tower);
  }
  const beam = box(half * 2 + 8.4, 1.05, 1.5, gMat);
  beam.position.set(0, 7.2, 0);
  gantry.add(beam);
  for (let i = -2; i <= 2; i++) {
    const housing = box(.62, .82, .32, lightHousing);
    housing.position.set(i * 1.05, 6.35, -.55);
    gantry.add(housing);
    const lens = new THREE.Mesh(new THREE.CircleGeometry(.21, 16), lightMat);
    lens.position.set(i * 1.05, 6.35, -.73);
    lens.rotation.y = Math.PI;
    gantry.add(lens);
  }
  const banner = new THREE.Mesh(new THREE.PlaneGeometry(16, 1.15), new THREE.MeshStandardMaterial({
    map: canvasTexture(512, 64, (ctx, w, h) => {
      ctx.fillStyle = '#111510'; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#f2f2e8'; ctx.font = '900 34px Arial, sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('FORMULA ONE', w / 2, h / 2 + 2);
    }), roughness: .55, side: THREE.DoubleSide
  }));
  banner.position.set(0, 8.0, -.78);
  banner.rotation.y = Math.PI;
  gantry.add(banner);
  const gs = layout.sample(0);
  gantry.position.copy(gs.pos);
  gantry.rotation.y = Math.atan2(gs.tangent.x, gs.tangent.z);
  group.add(gantry);

  /* ------------------------- street buildings -------------------------- */
  if (track.mood === 'STREET CIRCUIT' || track.mood === 'HARBOR CIRCUIT' || track.name === 'Albert Park') {
    const bGeo = new THREE.BoxGeometry(1, 1, 1);
    bGeo.translate(0, .5, 0);
    const bMat = new THREE.MeshStandardMaterial({ map: textures.windows, roughness: .85, metalness: .1 });
    const want = track.mood === 'HARBOR CIRCUIT' ? 56 : 40;
    const blocks = [];
    let guard = 0;
    while (blocks.length < want && guard < want * 14) {
      guard++;
      const sm = layout.samples[(rnd() * S) | 0];
      const sideSign = rnd() > .5 ? 1 : -1;
      const w = 12 + rnd() * 18, h = 10 + rnd() * 24, d = 11 + rnd() * 16;
      const gap = track.mood === 'HARBOR CIRCUIT' ? 27 : 34;
      const pos = sm.pos.clone().addScaledVector(sm.side, sideSign * (half + gap + rnd() * 26));
      const clearance = 15 + Math.max(w, d) * .55;
      if (layout.nearest(pos.x, pos.z).dist < clearance) continue;
      // avoid stacking buildings on top of each other
      let clash = false;
      for (const b of blocks) {
        if ((b.x - pos.x) ** 2 + (b.z - pos.z) ** 2 < (b.r + Math.max(w, d) * .55) ** 2) { clash = true; break; }
      }
      if (clash) continue;
      blocks.push({
        x: pos.x, z: pos.z, r: Math.max(w, d) * .55,
        y: layout.heightAt(pos.x, pos.z) - 1,
        yaw: Math.atan2(sm.tangent.x, sm.tangent.z) + (rnd() - .5) * .35,
        w, h, d, tint: .72 + rnd() * .38
      });
    }
    const bMesh = new THREE.InstancedMesh(bGeo, bMat, blocks.length);
    blocks.forEach((b, i) => {
      dummy.position.set(b.x, b.y, b.z);
      dummy.rotation.set(0, b.yaw, 0);
      dummy.scale.set(b.w, b.h, b.d);
      dummy.updateMatrix();
      bMesh.setMatrixAt(i, dummy.matrix);
      bMesh.setColorAt(i, new THREE.Color(b.tint * .96, b.tint * .97, b.tint * .93));
    });
    bMesh.castShadow = true;
    bMesh.receiveShadow = true;
    if (bMesh.instanceColor) bMesh.instanceColor.needsUpdate = true;
    group.add(bMesh);
  }

  /* ------------------------------ hills -------------------------------- */
  const hillGeo = new THREE.ConeGeometry(1, 1, 11, 1);
  hillGeo.translate(0, .5, 0);
  const hillMat = new THREE.MeshStandardMaterial({ color: 0x5b6a55, roughness: 1, flatShading: true });
  const hills = new THREE.InstancedMesh(hillGeo, hillMat, 26);
  for (let i = 0; i < 26; i++) {
    const a = i / 26 * Math.PI * 2 + rnd() * .1;
    const dist = 720 + rnd() * 340;
    dummy.position.set(Math.cos(a) * dist, -22, Math.sin(a) * dist);
    dummy.rotation.set(0, rnd() * 6.28, 0);
    dummy.scale.set(150 + rnd() * 180, 42 + rnd() * 58, 150 + rnd() * 180);
    dummy.updateMatrix();
    hills.setMatrixAt(i, dummy.matrix);
  }
  group.add(hills);

  return { group, startLightMat: lightMat, standTemplate: template };
}
