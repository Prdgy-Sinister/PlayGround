import * as THREE from '../vendor/three.module.js';
import { canvasTexture, mulberry32 } from './util.js';

const SKY_PRESETS = {
  DRY: {
    zenith: [26, 92, 176], horizon: [186, 212, 226], ground: [96, 104, 88],
    cloud: .74, cloudLight: [252, 250, 246], cloudDark: [150, 158, 168]
  },
  WET: {
    zenith: [104, 122, 132], horizon: [190, 198, 198], ground: [92, 98, 90],
    cloud: .92, cloudLight: [214, 220, 224], cloudDark: [122, 130, 136]
  }
};

/* Bake the sky once into an equirectangular texture: no per-pixel noise at runtime. */
function bakeSkyTexture(preset) {
  const W = 1024, H = 512;
  const [c, ctx] = ((w, h) => {
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    return [cv, cv.getContext('2d')];
  })(W, H);

  // vertical gradient: ground -> horizon -> zenith
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  const z = preset.zenith, hz = preset.horizon, gd = preset.ground;
  grad.addColorStop(0, `rgb(${z[0]},${z[1]},${z[2]})`);
  grad.addColorStop(.30, `rgb(${Math.round(z[0] * .55 + hz[0] * .45)},${Math.round(z[1] * .55 + hz[1] * .45)},${Math.round(z[2] * .55 + hz[2] * .45)})`);
  grad.addColorStop(.475, `rgb(${hz[0]},${hz[1]},${hz[2]})`);
  grad.addColorStop(.50, `rgb(${hz[0]},${hz[1]},${hz[2]})`);
  grad.addColorStop(.53, `rgb(${gd[0]},${gd[1]},${gd[2]})`);
  grad.addColorStop(1, `rgb(${Math.round(gd[0] * .8)},${Math.round(gd[1] * .8)},${Math.round(gd[2] * .8)})`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // clouds: one octave field at low resolution, upscaled smoothly
  const cw = 512, ch = 256;
  const cloud = document.createElement('canvas');
  cloud.width = cw; cloud.height = ch;
  const cctx = cloud.getContext('2d');
  const img = cctx.createImageData(cw, ch);
  const d = img.data;
  const rnd = mulberry32(1337);
  const grid = 64;
  const field = new Float32Array((grid + 1) * (grid + 1));
  for (let i = 0; i < field.length; i++) field[i] = rnd();

  const sample = (fx, fy) => {
    const x = fx * grid, y = fy * grid;
    const x0 = Math.min(grid - 1, Math.floor(x)), y0 = Math.min(grid - 1, Math.floor(y));
    const tx = x - x0, ty = y - y0;
    const s = (a) => a * a * (3 - 2 * a);
    const sx = s(tx), sy = s(ty);
    const v00 = field[y0 * (grid + 1) + x0], v10 = field[y0 * (grid + 1) + x0 + 1];
    const v01 = field[(y0 + 1) * (grid + 1) + x0], v11 = field[(y0 + 1) * (grid + 1) + x0 + 1];
    return (v00 * (1 - sx) + v10 * sx) * (1 - sy) + (v01 * (1 - sx) + v11 * sx) * sy;
  };

  const light = preset.cloudLight, dark = preset.cloudDark;
  for (let y = 0; y < ch; y++) {
    const v = y / ch;
    const band = Math.max(0, Math.min(1, (v - .16) / .34));
    const fade = Math.sin(band * Math.PI);
    for (let x = 0; x < cw; x++) {
      const fx = x / cw, fy = y / ch;
      let n = 0, amp = .55, freq = 2.2;
      for (let o = 0; o < 4; o++) {
        n += sample((fx * freq) % 1, (fy * freq * 1.8) % 1) * amp;
        amp *= .5; freq *= 2.07;
      }
      let a = Math.max(0, (n - .46)) / .54;
      a = Math.min(1, a * a * 1.9) * preset.cloud * fade;
      const i = (y * cw + x) * 4;
      const shade = .55 + Math.min(1, (n - .46) * 2.4) * .45;
      d[i] = Math.round(dark[0] + (light[0] - dark[0]) * shade);
      d[i + 1] = Math.round(dark[1] + (light[1] - dark[1]) * shade);
      d[i + 2] = Math.round(dark[2] + (light[2] - dark[2]) * shade);
      d[i + 3] = Math.round(Math.min(1, a) * 255);
    }
  }
  cctx.putImageData(img, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.globalAlpha = 1;
  const skyTop = H * .18, skyH = H * .64;
  ctx.drawImage(cloud, 0, skyTop, W, skyH);

  // warm haze near the horizon
  const haze = ctx.createLinearGradient(0, H * .38, 0, H * .5);
  haze.addColorStop(0, 'rgba(255,246,224,0)');
  haze.addColorStop(1, 'rgba(255,244,220,.22)');
  ctx.fillStyle = haze;
  ctx.fillRect(0, H * .38, W, H * .12);

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.mapping = THREE.EquirectangularReflectionMapping;
  t.wrapS = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}

const skyCache = new Map();
export function getSkyTexture(weather) {
  if (!skyCache.has(weather)) skyCache.set(weather, bakeSkyTexture(SKY_PRESETS[weather] || SKY_PRESETS.DRY));
  return skyCache.get(weather);
}

export function createSkyDome(weather = 'DRY') {
  const texture = getSkyTexture(weather);
  const material = new THREE.MeshBasicMaterial({
    map: texture, side: THREE.BackSide, depthWrite: false, fog: false, toneMapped: true
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1400, 40, 24), material);
  mesh.frustumCulled = false;
  mesh.renderOrder = -10;
  return { mesh, material, texture };
}

export function setSkyWeather(sky, weather) {
  const next = getSkyTexture(weather);
  if (sky.texture === next) return;
  sky.texture = next;
  sky.material.map = next;
  sky.material.needsUpdate = true;
}

export function makeEnvironment(renderer, weather) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const scene = new THREE.Scene();
  const mat = new THREE.MeshBasicMaterial({ map: getSkyTexture(weather), side: THREE.BackSide });
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(60, 32, 20), mat);
  scene.add(sphere);
  const target = pmrem.fromScene(scene, 0, .1, 200);
  pmrem.dispose();
  sphere.geometry.dispose();
  mat.dispose();
  return target;
}

export function makeSunFlare() {
  const map = canvasTexture(256, 256, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, 'rgba(255,255,252,1)');
    g.addColorStop(.045, 'rgba(255,252,236,1)');
    g.addColorStop(.10, 'rgba(255,246,214,.72)');
    g.addColorStop(.28, 'rgba(255,232,182,.20)');
    g.addColorStop(1, 'rgba(255,214,152,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  });
  const mat = new THREE.SpriteMaterial({
    map, transparent: true, blending: THREE.AdditiveBlending,
    depthTest: false, depthWrite: false, opacity: .62, toneMapped: false
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(320, 320, 1);
  sprite.renderOrder = 20;
  return sprite;
}

export function makeRain() {
  const map = canvasTexture(16, 128, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, 'rgba(220,238,246,0)');
    g.addColorStop(.35, 'rgba(220,238,246,.55)');
    g.addColorStop(.85, 'rgba(232,246,252,.9)');
    g.addColorStop(1, 'rgba(232,246,252,0)');
    ctx.fillStyle = g;
    ctx.fillRect(w * .42, 0, w * .16, h);
  });
  const N = 2200;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - .5) * 130;
    pos[i * 3 + 1] = Math.random() * 55;
    pos[i * 3 + 2] = (Math.random() - .5) * 130;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    map, size: .55, transparent: true, opacity: 0, depthWrite: false,
    color: 0xd6e6ee, sizeAttenuation: true, blending: THREE.NormalBlending
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  points.visible = false;
  return points;
}

export { SKY_PRESETS };
