import * as THREE from 'three';

const GEO = {
  robe: new THREE.CylinderGeometry(0.27, 0.56, 1.16, 10, 1, false),
  torso: new THREE.CylinderGeometry(0.24, 0.32, 0.52, 10),
  head: new THREE.SphereGeometry(0.225, 18, 14),
  hair: new THREE.SphereGeometry(0.235, 14, 10),
  hatCone: new THREE.ConeGeometry(0.33, 0.52, 14),
  hatBrim: new THREE.CylinderGeometry(0.44, 0.44, 0.035, 18),
  arm: new THREE.CylinderGeometry(0.062, 0.075, 0.62, 7),
  hand: new THREE.SphereGeometry(0.075, 8, 6),
  foot: new THREE.SphereGeometry(0.11, 8, 6),
  wand: new THREE.CylinderGeometry(0.014, 0.022, 0.72, 6),
  gem: new THREE.OctahedronGeometry(0.055, 0),
  cape: new THREE.PlaneGeometry(0.62, 0.95, 5, 7)
};

let glowTexture;
export function getGlowTexture() {
  if (glowTexture) return glowTexture;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.18, 'rgba(255,240,200,.9)');
  g.addColorStop(0.45, 'rgba(200,160,255,.32)');
  g.addColorStop(1, 'rgba(120,80,200,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  glowTexture = new THREE.CanvasTexture(c);
  return glowTexture;
}

let nameSeq = 0;
export function makeTextSprite(title, subtitle = '', color = '#e9c988') {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 128;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 512, 128);
  ctx.textAlign = 'center';
  ctx.font = '600 30px Cinzel, Georgia, serif';
  ctx.fillStyle = 'rgba(8,5,16,.55)';
  const w = Math.min(480, ctx.measureText(title).width + 44);
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(256 - w / 2, 20, w, 54, 5);
  else ctx.rect(256 - w / 2, 20, w, 54);
  ctx.fill();
  ctx.strokeStyle = 'rgba(233,201,136,.38)';
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fillText(title, 256, 57);
  if (subtitle) {
    ctx.font = 'italic 22px Spectral, Georgia, serif';
    ctx.fillStyle = 'rgba(241,228,200,.6)';
    ctx.fillText(subtitle, 256, 99);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(3.4, 0.85, 1);
  sprite.userData.isPlate = true;
  return sprite;
}

export function createWizard(opts = {}) {
  const {
    robe = '#3b2d5c', accent = '#9b7fd4', skin = '#e6b58d', hair = '#2a1c22',
    hat = true, scale = 1, crown = false, horns = false, name = '', subtitle = '', nameColor = '#e9c988'
  } = opts;
  const group = new THREE.Group();
  const body = new THREE.Group();
  group.add(body);
  const robeMat = new THREE.MeshStandardMaterial({ color: robe, roughness: 0.86, metalness: 0.03 });
  const trimMat = new THREE.MeshStandardMaterial({ color: accent, roughness: 0.6, metalness: 0.18 });
  const skinMat = new THREE.MeshStandardMaterial({ color: skin, roughness: 0.8 });
  const hairMat = new THREE.MeshStandardMaterial({ color: hair, roughness: 0.9 });
  const darkMat = new THREE.MeshStandardMaterial({ color: '#1a1322', roughness: 0.8 });
  const goldMat = new THREE.MeshStandardMaterial({ color: '#d3aa5f', roughness: 0.35, metalness: 0.7 });

  const skirt = new THREE.Mesh(GEO.robe, robeMat);
  skirt.position.y = 0.68;
  skirt.castShadow = true;
  body.add(skirt);

  const trim = new THREE.Mesh(new THREE.CylinderGeometry(0.565, 0.575, 0.06, 10), trimMat);
  trim.position.y = 0.14;
  body.add(trim);

  const torso = new THREE.Mesh(GEO.torso, trimMat);
  torso.position.y = 1.17;
  body.add(torso);
  const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.235, 0.28, 0.3, 10), robeMat);
  chest.position.y = 1.32;
  body.add(chest);

  const head = new THREE.Mesh(GEO.head, skinMat);
  head.position.y = 1.61;
  head.castShadow = true;
  body.add(head);
  const hairMesh = new THREE.Mesh(GEO.hair, hairMat);
  hairMesh.position.set(0, 1.64, -0.025);
  hairMesh.scale.set(1.02, 0.72, 1.02);
  body.add(hairMesh);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.028, 0.07, 5), skinMat);
  nose.position.set(0, 1.59, 0.22);
  nose.rotation.x = Math.PI / 2;
  body.add(nose);
  // eyes
  for (const x of [-0.075, 0.075]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.021, 6, 5), darkMat);
    eye.position.set(x, 1.63, 0.205);
    body.add(eye);
  }

  if (hat) {
    const cone = new THREE.Mesh(GEO.hatCone, robeMat);
    cone.position.y = 2.02;
    cone.rotation.z = 0.13;
    cone.castShadow = true;
    body.add(cone);
    const brim = new THREE.Mesh(GEO.hatBrim, robeMat);
    brim.position.y = 1.79;
    brim.rotation.z = 0.1;
    body.add(brim);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.33, 0.06, 14), trimMat);
    band.position.set(0.02, 1.83, 0);
    band.rotation.z = 0.1;
    body.add(band);
  }

  if (crown) {
    for (let i = 0; i < 5; i++) {
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.17, 5), new THREE.MeshStandardMaterial({ color: '#2a1b38', emissive: '#a25bff', emissiveIntensity: 0.8, metalness: 0.6, roughness: 0.3 }));
      const a = (i / 5) * Math.PI * 2;
      spike.position.set(Math.cos(a) * 0.19, 1.86, Math.sin(a) * 0.19);
      body.add(spike);
    }
  }
  if (horns) {
    for (const s of [-1, 1]) {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.36, 6), darkMat);
      horn.position.set(0.18 * s, 1.84, -0.02);
      horn.rotation.z = s * -0.5;
      horn.rotation.x = -0.15;
      body.add(horn);
    }
  }

  // cloak
  const capeGeo = GEO.cape.clone();
  const cape = new THREE.Mesh(capeGeo, new THREE.MeshStandardMaterial({ color: robe, roughness: 0.9, side: THREE.DoubleSide }));
  cape.position.set(0, 1.02, -0.28);
  cape.rotation.x = -0.12;
  body.add(cape);
  const capeTrim = new THREE.Mesh(new THREE.PlaneGeometry(0.64, 0.06), new THREE.MeshStandardMaterial({ color: accent, side: THREE.DoubleSide, roughness: 0.6 }));
  capeTrim.position.set(0, 0.57, 0.01);
  cape.add(capeTrim);

  // arms
  const leftArmPivot = new THREE.Group();
  leftArmPivot.position.set(-0.31, 1.43, 0);
  const leftArm = new THREE.Mesh(GEO.arm, robeMat);
  leftArm.position.y = -0.28;
  leftArm.rotation.z = 0.16;
  leftArmPivot.add(leftArm);
  const leftHand = new THREE.Mesh(GEO.hand, skinMat);
  leftHand.position.set(-0.03, -0.6, 0.02);
  leftArmPivot.add(leftHand);
  body.add(leftArmPivot);

  const rightArmPivot = new THREE.Group();
  rightArmPivot.position.set(0.31, 1.43, 0);
  const rightArm = new THREE.Mesh(GEO.arm, robeMat);
  rightArm.position.y = -0.28;
  rightArm.rotation.z = -0.16;
  rightArmPivot.add(rightArm);
  const rightHand = new THREE.Mesh(GEO.hand, skinMat);
  rightHand.position.set(0.03, -0.6, 0.03);
  rightArmPivot.add(rightHand);
  body.add(rightArmPivot);

  const wandGroup = new THREE.Group();
  wandGroup.position.set(0.035, -0.63, 0.06);
  wandGroup.rotation.set(-1.35, 0, 0.1);
  const wandMat = new THREE.MeshStandardMaterial({ color: '#6f4b2d', roughness: 0.6 });
  const wandShaft = new THREE.Mesh(GEO.wand, wandMat);
  wandShaft.position.y = 0.3;
  wandGroup.add(wandShaft);
  const wandTip = new THREE.Object3D();
  wandTip.position.y = 0.68;
  wandGroup.add(wandTip);
  const tipGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: getGlowTexture(), color: '#ffe0a8', transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
  tipGlow.scale.set(0.25, 0.25, 1);
  tipGlow.position.y = 0.7;
  wandGroup.add(tipGlow);
  const coreGlow = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), new THREE.MeshBasicMaterial({ color: '#ffe7b0' }));
  coreGlow.position.y = 0.66;
  wandGroup.add(coreGlow);
  rightArmPivot.add(wandGroup);

  // feet
  for (const s of [-1, 1]) {
    const foot = new THREE.Mesh(GEO.foot, darkMat);
    foot.position.set(0.14 * s, 0.055, 0.18);
    foot.scale.set(1, 0.55, 1.6);
    body.add(foot);
  }

  // chest gem
  const gem = new THREE.Mesh(GEO.gem, new THREE.MeshStandardMaterial({ color: accent, emissive: accent, emissiveIntensity: 0.5, metalness: 0.7, roughness: 0.2 }));
  gem.position.set(0, 1.32, 0.27);
  gem.scale.set(0.7, 1, 0.5);
  body.add(gem);

  // ground shadow
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.52, 20), new THREE.MeshBasicMaterial({ color: '#06030c', transparent: true, opacity: 0.42, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.02;
  group.add(shadow);

  let plate = null;
  if (name) {
    plate = makeTextSprite(name, subtitle, nameColor);
    plate.position.y = 2.42;
    group.add(plate);
  }

  group.scale.setScalar(scale);
  const api = {
    group, body, wandGroup, tip: wandTip, plate, cape, head,
    robeMat, trimMat, wandMat, tipGlow, coreGlow, shadow,
    walkPhase: Math.random() * 6.28,
    castPhase: 0,
    castAnim: 0,
    hitFlash: 0,
    baseRobe: robe,
    update(dt, moving = false, speed = 1) {
      this.walkPhase += dt * (moving ? 7.5 * speed : 2.1);
      const p = this.walkPhase;
      const amp = moving ? 0.5 : 0.05;
      leftArmPivot.rotation.x = Math.sin(p) * amp * 0.7;
      rightArmPivot.rotation.x = -Math.sin(p) * amp * 0.7;
      body.position.y = moving ? Math.abs(Math.sin(p)) * 0.035 : Math.sin(p * 0.5) * 0.008;
      body.rotation.z = moving ? Math.sin(p) * 0.02 : 0;
      cape.rotation.x = -0.12 - (moving ? 0.16 + Math.sin(p * 2) * 0.04 : Math.sin(p * 0.5) * 0.02);
      head.rotation.y = moving ? Math.sin(p * 0.5) * 0.05 : Math.sin(p * 0.3) * 0.08;
      if (this.castAnim > 0) {
        this.castAnim = Math.max(0, this.castAnim - dt);
        const t = 1 - this.castAnim / 0.45;
        rightArmPivot.rotation.x = -1.1 * Math.sin(t * Math.PI);
        rightArmPivot.rotation.z = -0.1;
      } else {
        rightArmPivot.rotation.z = -0.05;
      }
      if (plate) plate.position.y = 2.42 - body.position.y;
      if (this.hitFlash > 0) {
        this.hitFlash = Math.max(0, this.hitFlash - dt * 3);
        robeMat.emissive.setRGB(this.hitFlash * 0.7, 0.02, 0.06);
      }
    },
    cast() { this.castAnim = 0.45; this.walkPhase += 0.4; },
    getTipWorld(target = new THREE.Vector3()) {
      group.updateMatrixWorld();
      return tipGlow.getWorldPosition(target);
    },
    setWand(wand) {
      if (!wand) return;
      const colors = { oak: '#6f4b2d', willow: '#9b8061', holly: '#4f5b3b', ash: '#a98d6a', hawthorn: '#65503d', ebony: '#241b22', elder: '#7c6a53', silverlime: '#b6b3a2', blackthorn: '#3a2f35', moonwillow: '#9db9c4', starfall: '#5b4c78', sunwood: '#c08a4b', frostpine: '#8aa8ab', voidbriar: '#251b3e', emberoak: '#8a4433' };
      wandMat.color.set(colors[wand.woodId] || '#6f4b2d');
      const coreColors = { unicorn: '#e8f2ff', dragon: '#ff7a4a', phoenix: '#ffbd5e', thunderbird: '#79ddff', basilisk: '#6effa0', thestral: '#b7a8ff', coral: '#58e0c6', chimaera: '#ffd06e', augurey: '#9db7ff', wraithglass: '#e79bff', moonstoneheart: '#d9f3ff' };
      tipGlow.material.color.set(coreColors[wand.coreId] || '#ffe0a8');
      coreGlow.material.color.set(coreColors[wand.coreId] || '#ffe7b0');
      gem.material.color.set(coreColors[wand.coreId] || '#c9a2ff');
      gem.material.emissive.set(coreColors[wand.coreId] || '#c9a2ff');
      wandShaft.scale.y = 0.85 + (wand.length - 9) * 0.035;
      tipGlow.scale.setScalar(0.2 + wand.stats.aether * 0.0016);
    },
    flash() { this.hitFlash = 1; }
  };
  return api;
}

export function createWisp(color = '#9fe7ff') {
  const group = new THREE.Group();
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: getGlowTexture(), color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.95 }));
  sprite.scale.set(0.8, 0.8, 1);
  group.add(sprite);
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ color: '#ffffff' }));
  group.add(core);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.008, 6, 34), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending }));
  group.add(ring);
  const trail = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(14 * 3), 3)),
    new THREE.PointsMaterial({ map: getGlowTexture(), color, size: 0.22, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  group.add(trail);
  let t = 0;
  const history = [];
  return {
    group,
    update(dt, target) {
      t += dt;
      const desired = new THREE.Vector3(target.x + Math.sin(t * 0.8) * 1.1, target.y + 1.6 + Math.sin(t * 1.8) * 0.18, target.z + Math.cos(t * 0.8) * 1.1);
      group.position.lerp(desired, 1 - Math.pow(0.005, dt));
      ring.rotation.x = t * 0.8;
      ring.rotation.y = t * 0.5;
      sprite.material.opacity = 0.7 + Math.sin(t * 3) * 0.15;
      history.unshift(group.position.clone());
      if (history.length > 14) history.pop();
      const arr = trail.geometry.attributes.position.array;
      history.forEach((p, i) => { arr[i * 3] = p.x - group.position.x; arr[i * 3 + 1] = p.y - group.position.y; arr[i * 3 + 2] = p.z - group.position.z; });
      trail.geometry.attributes.position.needsUpdate = true;
    },
    setColor(c) { sprite.material.color.set(c); ring.material.color.set(c); trail.material.color.set(c); }
  };
}
