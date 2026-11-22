/* Three.js presentation layer: portrait, side-on 3D rugby.
   The simulation stays flat (x across, y down the field). This module maps
   that plane into a floodlit stadium and follows the ball with a broadcast
   camera positioned above the near touchline. */

import * as THREE from '../vendor/three.module.js';
import { HISTORIC_KITS } from './history.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const damp = (a, b, lambda, dt) => lerp(a, b, 1 - Math.exp(-lambda * dt));
const dampAngle = (a, b, lambda, dt) => {
  let d = ((b - a + Math.PI) % (Math.PI * 2)) - Math.PI;
  if (d < -Math.PI) d += Math.PI * 2;
  return a + d * (1 - Math.exp(-lambda * dt));
};

const SKIN = ['#f2c9a0', '#d79b6c', '#a96843', '#7a452a', '#efd4b5', '#c88c61'];
const SKY_TOP = '#0b2a20';
const SKY_BOTTOM = '#030b08';

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

function canvasTexture(w, h, draw, repeat) {
  const c = makeCanvas(w, h);
  draw(c.getContext('2d'), w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  if (repeat) {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeat[0], repeat[1]);
  }
  return tex;
}

function isLight(hex) {
  const h = String(hex || '#888888').replace('#', '');
  if (h.length < 6) return false;
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return (r * .299 + g * .587 + b * .114) > 158;
}

export class MatchRenderer3D {
  constructor(canvas, game, settings = {}) {
    this.is3D = true;
    this.canvas = canvas;
    this.game = game;
    this.settings = settings;
    this.w = 1; this.h = 1; this.dpr = 1;
    this.time = 0;
    this.focus = { x: 35, z: 0 };
    this.rigs = new Map();
    this.materials = new Map();
    this.numberTextures = new Map();
    this.effectSprites = new Map();
    this.lastSize = { w: 0, h: 0 };
    this.shake = { x: 0, y: 0, z: 0 };

    this.scene = new THREE.Scene();
    this.scene.background = this.makeSkyTexture();
    if (this.quality() !== 'low') this.scene.fog = new THREE.FogExp2(0x07130e, 0.0038);

    const aspect = (this.w || 1) / (this.h || 1);
    const viewSize = 46;
    this.viewSize = viewSize;
    this.camera = new THREE.OrthographicCamera(-viewSize * aspect / 2, viewSize * aspect / 2, viewSize / 2, -viewSize / 2, 0.1, 500);
    this.camera.position.set(0, 52, -8);

    this.gl = new THREE.WebGLRenderer({
      canvas, antialias: this.quality() !== 'low', alpha: false, powerPreference: 'high-performance',
      preserveDrawingBuffer: true
    });
    this.gl.setPixelRatio(this.pixelRatioCap());
    this.gl.shadowMap.enabled = this.quality() !== 'low';
    this.gl.shadowMap.type = THREE.PCFSoftShadowMap;
    this.gl.outputColorSpace = THREE.SRGBColorSpace;
    this.gl.toneMapping = THREE.ACESFilmicToneMapping;
    this.gl.toneMappingExposure = this.quality() === 'ultra' ? 1.12 : 1.08;

    this.buildLights();
    this.buildGround();
    this.buildPitch();
    this.buildAdvertising();
    this.buildStands();
    this.buildBenches();
    this.buildGrassTufts();
    this.buildFloodlights();
    this.buildPosts();
    this.buildSetPieceMarker();
    this.buildBall();
    this.buildOverlay();

    this.resize();
    this.syncRigs(1 / 60, true);
    this.updateCamera(1 / 60, true);
  }

  makeSkyTexture() {
    const tex = canvasTexture(32, 256, (c, w, h) => {
      const g = c.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, SKY_TOP);
      g.addColorStop(.46, '#061a13');
      g.addColorStop(1, SKY_BOTTOM);
      c.fillStyle = g; c.fillRect(0, 0, w, h);
      // faint floodlight bloom in the night sky
      for (const [x, y, r] of [[.2, .12, .5], [.78, .1, .46]]) {
        const rg = c.createRadialGradient(w * x, h * y, 0, w * x, h * y, w * r);
        rg.addColorStop(0, 'rgba(210,240,220,.16)');
        rg.addColorStop(1, 'rgba(210,240,220,0)');
        c.fillStyle = rg; c.fillRect(0, 0, w, h);
      }
    });
    return tex;
  }

  material(color, opts = {}) {
    const key = color + ':' + (opts.roughness ?? '') + ':' + (opts.emissive ?? '') + ':' + (opts.metalness ?? '');
    if (!this.materials.has(key)) {
      this.materials.set(key, new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: opts.roughness ?? .82,
        metalness: opts.metalness ?? .02,
        emissive: opts.emissive ? new THREE.Color(opts.emissive) : new THREE.Color(0x000000),
        emissiveIntensity: opts.emissiveIntensity ?? 1
      }));
    }
    return this.materials.get(key);
  }

  buildLights() {
    this.scene.add(new THREE.HemisphereLight(0xbfe2ff, 0x0a1c12, .82));
    this.scene.add(new THREE.AmbientLight(0x9fc7b2, .18));

    const key = new THREE.DirectionalLight(0xfff0cf, 2.15);
    key.position.set(46, 76, 34);
    key.castShadow = true;
    key.shadow.mapSize.set(this.shadowMapSize(), this.shadowMapSize());
    key.shadow.camera.left = -58;
    key.shadow.camera.right = 58;
    key.shadow.camera.top = 78;
    key.shadow.camera.bottom = -78;
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 220;
    key.shadow.bias = -0.0008;
    key.shadow.normalBias = .02;
    key.target.position.set(0, 0, 0);
    this.scene.add(key, key.target);
    this.keyLight = key;

    const fill = new THREE.DirectionalLight(0x8fd9c8, .5);
    fill.position.set(-48, 42, -40);
    this.scene.add(fill);
  }

  buildGround() {
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(190, 240),
      this.material('#0d2f20', { roughness: 1 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -.06;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  pitchTexture() {
    return canvasTexture(1024, 1754, (c, w, h) => {
      const W = w, H = h;
      const yOf = gy => (gy + 10) / 120 * H; // canvas top is game y = -10
      const xOf = gx => gx / 70 * W;
      // base grass with mown bands
      c.fillStyle = '#1a5135'; c.fillRect(0, 0, W, H);
      for (let gy = -10; gy < 110; gy += 5) {
        const band = (Math.floor((gy + 10) / 5) % 2 === 0) ? '#1d5c3c' : '#195236';
        c.fillStyle = band;
        c.fillRect(0, yOf(gy), W, yOf(gy + 5) - yOf(gy) + 1);
      }
      // in-goal tint
      c.fillStyle = 'rgba(216,180,91,.055)';
      c.fillRect(0, yOf(-10), W, yOf(0) - yOf(-10));
      c.fillRect(0, yOf(100), W, yOf(110) - yOf(100));
      // soft light pools
      for (const [gx, gy, r] of [[18, 16, 20], [52, 30, 24], [28, 62, 22], [54, 90, 18]]) {
        const rg = c.createRadialGradient(xOf(gx), yOf(gy), 0, xOf(gx), yOf(gy), r / 70 * W);
        rg.addColorStop(0, 'rgba(220,255,220,.06)');
        rg.addColorStop(1, 'rgba(220,255,220,0)');
        c.fillStyle = rg; c.fillRect(0, 0, W, H);
      }
      // mown seam lines
      c.strokeStyle = 'rgba(255,255,255,.028)';
      c.lineWidth = 2;
      for (let gy = -10; gy <= 110; gy += 5) {
        c.beginPath(); c.moveTo(0, yOf(gy)); c.lineTo(W, yOf(gy)); c.stroke();
      }
      // white markings
      const line = (x1, y1, x2, y2, width = 3, dash = null) => {
        c.save();
        c.strokeStyle = 'rgba(246,250,242,.86)';
        c.lineWidth = width;
        c.lineCap = 'round';
        if (dash) c.setLineDash(dash);
        c.beginPath();
        c.moveTo(xOf(x1), yOf(y1));
        c.lineTo(xOf(x2), yOf(y2));
        c.stroke();
        c.restore();
      };
      // touch lines and dead-ball lines
      line(0, -10, 0, 110, 4); line(70, -10, 70, 110, 4);
      line(0, -10, 70, -10, 4); line(0, 110, 70, 110, 4);
      // goal lines, 22s, 10s, halfway
      line(0, 0, 70, 0, 4); line(0, 100, 70, 100, 4);
      line(0, 22, 70, 22, 3); line(0, 78, 70, 78, 3);
      line(0, 40, 70, 40, 2.4); line(0, 60, 70, 60, 2.4);
      line(0, 50, 70, 50, 3.4);
      // 5m and 15m dashed lines
      for (const gx of [5, 15, 55, 65]) line(gx, 0, gx, 100, 2, [10, 12]);
      // 5m scrum marks and goal-area dashes
      for (const gy of [0, 100]) {
        line(5, gy, 5, gy + (gy === 0 ? -5 : 5), 2, [6, 8]);
        line(65, gy, 65, gy + (gy === 0 ? -5 : 5), 2, [6, 8]);
      }
      // centre spot and logo
      c.fillStyle = 'rgba(246,250,242,.8)';
      c.beginPath(); c.arc(xOf(35), yOf(50), 5, 0, 7); c.fill();
      c.save();
      c.translate(xOf(35), yOf(50));
      c.globalAlpha = .17;
      c.fillStyle = '#e9dfb4';
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.font = '900 52px "Arial Narrow", Arial, sans-serif';
      c.fillText('RUGBY WORLD CUP', 0, -22);
      c.font = '900 96px "Arial Narrow", Impact, sans-serif';
      c.fillText('26', 0, 56);
      c.restore();
      // field numbers
      c.save();
      c.fillStyle = 'rgba(255,255,255,.2)';
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.font = '700 34px "Arial Narrow", Arial, sans-serif';
      for (const gy of [22, 78]) {
        c.fillText('22', xOf(8), yOf(gy + 3));
        c.fillText('22', xOf(62), yOf(gy + 3));
      }
      c.restore();
      // subtle wear
      c.globalAlpha = .1;
      for (let i = 0; i < 220; i++) {
        const x = (i * 977) % W, y = (i * 613) % H;
        c.fillStyle = i % 2 ? '#0d3b25' : '#2c7048';
        c.beginPath(); c.arc(x, y, 4 + (i % 7), 0, 7); c.fill();
      }
      c.globalAlpha = 1;
    });
  }

  buildPitch() {
    const tex = this.pitchTexture();
    const pitch = new THREE.Mesh(
      new THREE.PlaneGeometry(70, 120),
      new THREE.MeshStandardMaterial({ map: tex, roughness: .94, metalness: 0 })
    );
    pitch.rotation.x = -Math.PI / 2;
    pitch.position.y = 0;
    pitch.receiveShadow = true;
    this.scene.add(pitch);

    // run-off strip
    const runoff = new THREE.Mesh(
      new THREE.PlaneGeometry(84, 136),
      this.material('#123c28', { roughness: 1 })
    );
    runoff.rotation.x = -Math.PI / 2;
    runoff.position.y = -.03;
    runoff.receiveShadow = true;
    this.scene.add(runoff);

    // corner flags
    const flagMat = this.material('#d9b45b', { roughness: .6 });
    const poleMat = this.material('#f2eee0', { roughness: .5 });
    for (const [x, z] of [[-35, -60], [35, -60], [-35, 60], [35, 60]]) {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(.05, .05, 1.7, 6), poleMat);
      pole.position.set(x, .85, z); pole.castShadow = true; this.scene.add(pole);
      const flag = new THREE.Mesh(new THREE.PlaneGeometry(.6, .38), flagMat);
      flag.position.set(x + (x < 0 ? .3 : -.3), 1.55, z);
      flag.rotation.y = x < 0 ? 0 : Math.PI;
      this.scene.add(flag);
    }
  }

  boardTexture(text, fg, bg) {
    return canvasTexture(512, 96, (c, w, h) => {
      c.fillStyle = bg; c.fillRect(0, 0, w, h);
      c.strokeStyle = 'rgba(255,255,255,.15)'; c.lineWidth = 4; c.strokeRect(3, 3, w - 6, h - 6);
      c.fillStyle = fg; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.font = '900 44px "Arial Narrow", Arial, sans-serif';
      c.fillText(text, w / 2, h / 2 + 2);
    });
  }

  buildAdvertising() {
    const boards = [
      ['RUGBY WORLD CUP', '#d8b45b', '#0a2a1f'],
      ['TRY.', '#f3efe1', '#143d2b'],
      ['RWC 26', '#9ff08a', '#10261b'],
      ['WORLD RUGBY', '#ffffff', '#174b34'],
      ['MAKE THE BREAK', '#e8c46d', '#0d3021'],
      ['ONE GAME. ONE WORLD.', '#dcebdc', '#123b28']
    ].map(([t, fg, bg]) => this.boardTexture(t, fg, bg));

    const planeGeo = new THREE.PlaneGeometry(10, 1.15);
    const backGeo = new THREE.BoxGeometry(.28, 1.2, 10);
    const backMat = this.material('#071a12', { roughness: .9 });
    let idx = 0;
    for (const sideX of [-1, 1]) {
      for (let z = -55; z < 55; z += 11) {
        const tex = boards[idx++ % boards.length];
        const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: .55, emissive: 0x0a1f16, emissiveIntensity: .35 });
        const plane = new THREE.Mesh(planeGeo, mat);
        plane.position.set(sideX * 38.2, .75, z);
        plane.rotation.y = sideX < 0 ? Math.PI / 2 : -Math.PI / 2;
        this.scene.add(plane);
        const back = new THREE.Mesh(backGeo, backMat);
        back.position.set(sideX * 38.45, .6, z);
        this.scene.add(back);
      }
    }
    // end boards
    for (const sideZ of [-1, 1]) {
      for (let x = -30; x <= 30; x += 15) {
        const tex = boards[idx++ % boards.length];
        const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: .55, emissive: 0x0a1f16, emissiveIntensity: .35 });
        const plane = new THREE.Mesh(planeGeo, mat);
        plane.position.set(x, .75, sideZ * 62.2);
        plane.rotation.y = sideZ < 0 ? 0 : Math.PI;
        this.scene.add(plane);
        const back = new THREE.Mesh(new THREE.BoxGeometry(10, 1.2, .28), backMat);
        back.position.set(x, .6, sideZ * 62.45);
        this.scene.add(back);
      }
    }
  }

  crowdTexture() {
    return canvasTexture(256, 256, (c, w, h) => {
      c.fillStyle = '#081812'; c.fillRect(0, 0, w, h);
      const cols = ['#d8b86a', '#db5c4c', '#5f9fb8', '#d8d6c8', '#4c7f59', '#9c4f74', '#e8d9a5'];
      for (let i = 0; i < 2600; i++) {
        const x = (i * 37.7) % w, y = (i * 91.3) % h;
        c.fillStyle = cols[i % cols.length];
        c.globalAlpha = .55 + ((i * 7) % 40) / 100;
        c.fillRect(x, y, 2.2, 2.6);
      }
      c.globalAlpha = 1;
    }, [8, 2]);
  }

  buildStands() {
    const crowd = this.crowdTexture();
    const crowdMat = new THREE.MeshStandardMaterial({ map: crowd, roughness: 1, metalness: 0 });
    const concrete = this.material('#1a2b24', { roughness: .95 });
    const roof = this.material('#0b1813', { roughness: .9, metalness: .1 });

    const tier = (x, z, w, d, y, h, rot = 0) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), crowdMat);
      m.position.set(x, y, z); m.rotation.y = rot;
      m.receiveShadow = true;
      this.scene.add(m);
    };

    // side stands, stepped back from the touchline
    for (const side of [-1, 1]) {
      for (let i = 0; i < 4; i++) {
        tier(side * (42 + i * 4.4), 0, 4.2, 152, 1.4 + i * 2.1, 2.1);
      }
      const wall = new THREE.Mesh(new THREE.BoxGeometry(2.2, 3.2, 152), concrete);
      wall.position.set(side * 40, 1.6, 0);
      this.scene.add(wall);
      const canopy = new THREE.Mesh(new THREE.BoxGeometry(22, .8, 158), roof);
      canopy.position.set(side * 49, 13.2, 0);
      canopy.rotation.z = side * .07;
      this.scene.add(canopy);
      for (let z = -70; z <= 70; z += 20) {
        const support = new THREE.Mesh(new THREE.CylinderGeometry(.22, .22, 13, 6), roof);
        support.position.set(side * 57, 6.5, z);
        this.scene.add(support);
      }
    }
    // end stands
    for (const side of [-1, 1]) {
      for (let i = 0; i < 4; i++) {
        tier(0, side * (66 + i * 4.2), 132, 4.0, 1.4 + i * 2.1, 2.1);
      }
      const wall = new THREE.Mesh(new THREE.BoxGeometry(132, 3.2, 2.2), concrete);
      wall.position.set(0, 1.6, side * 64);
      this.scene.add(wall);
      const canopy = new THREE.Mesh(new THREE.BoxGeometry(140, .8, 20), roof);
      canopy.position.set(0, 13.2, side * 73);
      canopy.rotation.x = -side * .07;
      this.scene.add(canopy);
    }
  }

  buildBenches() {
    const frame = this.material('#20322b', { roughness: .8, metalness: .15 });
    const seat = this.material('#0f241c', { roughness: .9 });
    const roof = this.material('#0b1813', { roughness: .9 });
    for (const side of [-1, 1]) {
      const x = side * 39.2;
      const shelter = new THREE.Mesh(new THREE.BoxGeometry(3.4, .3, 15), roof);
      shelter.position.set(x, 3.2, 0);
      this.scene.add(shelter);
      for (const z of [-7.2, 7.2]) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(.09, .09, 3.1, 6), frame);
        post.position.set(x, 1.55, z);
        this.scene.add(post);
      }
      for (let z = -6; z <= 6; z += 1.4) {
        const bench = new THREE.Mesh(new THREE.BoxGeometry(.65, .16, 1.1), seat);
        bench.position.set(x, .55, z);
        this.scene.add(bench);
        // seated squad silhouettes
        const body = new THREE.Mesh(new THREE.CapsuleGeometry(.2, .35, 3, 6), this.material(side < 0 ? '#1b6ca8' : '#9d3546', { roughness: .85 }));
        body.position.set(x - side * .2, .95, z);
        body.castShadow = true;
        this.scene.add(body);
        const head = new THREE.Mesh(new THREE.SphereGeometry(.15, 8, 6), this.material(SKIN[(Math.round(z) + 9) % SKIN.length], { roughness: .75 }));
        head.position.set(x - side * .2, 1.36, z);
        this.scene.add(head);
      }
      // coaching board
      const board = new THREE.Mesh(new THREE.BoxGeometry(.08, 1.0, 1.5), this.material('#f2efe2', { roughness: .7 }));
      board.position.set(x - side * .1, 1.9, 0);
      this.scene.add(board);
    }
  }

  buildGrassTufts() {
    const geo = new THREE.ConeGeometry(.055, .28, 4);
    const mat = this.material('#2c754b', { roughness: 1 });
    const count = 260;
    const mesh = new THREE.InstancedMesh(geo, mat, count);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const side = i % 2 ? 1 : -1;
      const x = side * (35.4 + ((i * 37) % 260) / 100);
      const z = -60 + ((i * 61) % 1200) / 10;
      dummy.position.set(x, .1, z);
      dummy.rotation.y = (i * 1.7) % 6.28;
      dummy.scale.set(.8 + (i % 3) * .25, .8 + (i % 5) * .16, .8);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    this.scene.add(mesh);
  }

  buildFloodlights() {
    const poleMat = this.material('#2a3a33', { roughness: .7, metalness: .3 });
    const lampMat = new THREE.MeshStandardMaterial({
      color: 0xf7f4e2, emissive: 0xfff3c8, emissiveIntensity: 1.7, roughness: .3
    });
    for (const [x, z] of [[-58, -72], [58, -72], [-58, 72], [58, 72]]) {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(.32, .55, 30, 8), poleMat);
      pole.position.set(x, 15, z);
      this.scene.add(pole);
      const rig = new THREE.Mesh(new THREE.BoxGeometry(6.2, 2.2, .7), poleMat);
      rig.position.set(x, 29.4, z);
      this.scene.add(rig);
      for (let i = -2; i <= 2; i++) {
        const lamp = new THREE.Mesh(new THREE.BoxGeometry(.75, 1.5, .2), lampMat);
        lamp.position.set(x + i * 1.05, 29.4, z + (z > 0 ? -.45 : .45));
        this.scene.add(lamp);
      }
      const glow = new THREE.PointLight(0xfff1c9, 40, 90, 2);
      glow.position.set(x * .72, 24, z * .72);
      this.scene.add(glow);
    }
  }

  buildPosts() {
    const white = this.material('#f7f4e8', { roughness: .45 });
    const padHome = this.material(this.game.home.team.colors?.[0] || '#2b7a55', { roughness: .7 });
    const padAway = this.material(this.game.away.team.colors?.[1] || '#ffffff', { roughness: .7 });
    for (const [z, pad] of [[-60, padAway], [60, padHome]]) {
      const group = new THREE.Group();
      group.position.set(0, 0, z);
      for (const x of [-5.6, 5.6]) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(.16, .2, 16, 10), white);
        post.position.set(x, 8, 0); post.castShadow = true;
        group.add(post);
        const padMesh = new THREE.Mesh(new THREE.CylinderGeometry(.32, .36, 2.4, 10), pad);
        padMesh.position.set(x, 1.2, 0);
        group.add(padMesh);
        const cap = new THREE.Mesh(new THREE.SphereGeometry(.18, 8, 6), white);
        cap.position.set(x, 16, 0);
        group.add(cap);
      }
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(.13, .13, 11.2, 10), white);
      bar.rotation.z = Math.PI / 2;
      bar.position.set(0, 3, 0);
      bar.castShadow = true;
      group.add(bar);
      this.scene.add(group);
    }
  }

  buildSetPieceMarker() {
    const mat = new THREE.MeshBasicMaterial({
      color: 0xd9b45b, transparent: true, opacity: .45, side: THREE.DoubleSide, depthWrite: false
    });
    this.setPieceRing = new THREE.Mesh(new THREE.RingGeometry(2.3, 2.65, 40), mat);
    this.setPieceRing.rotation.x = -Math.PI / 2;
    this.setPieceRing.position.y = .05;
    this.setPieceRing.visible = false;
    this.scene.add(this.setPieceRing);

    const lineMat = new THREE.MeshBasicMaterial({
      color: 0x8fe8ff, transparent: true, opacity: .3, side: THREE.DoubleSide, depthWrite: false
    });
    this.offsideLine = new THREE.Mesh(new THREE.PlaneGeometry(70, .12), lineMat);
    this.offsideLine.rotation.x = -Math.PI / 2;
    this.offsideLine.position.y = .05;
    this.offsideLine.visible = false;
    this.scene.add(this.offsideLine);
  }

  buildBall() {
    this.ballGroup = new THREE.Group();
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(.3, 16, 12),
      new THREE.MeshStandardMaterial({ color: 0xf4efe1, roughness: .38, metalness: .02 })
    );
    shell.scale.set(.78, .78, 1.32);
    shell.castShadow = true;
    this.ballGroup.add(shell);
    const seam = new THREE.Mesh(
      new THREE.TorusGeometry(.235, .018, 6, 20),
      new THREE.MeshStandardMaterial({ color: 0xb54236, roughness: .5 })
    );
    seam.rotation.y = Math.PI / 2;
    seam.scale.set(1, 1.32, 1);
    this.ballGroup.add(seam);
    this.scene.add(this.ballGroup);

    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(12 * 3), 3));
    this.trail = new THREE.Line(trailGeo, new THREE.LineBasicMaterial({
      color: 0xffe7a8, transparent: true, opacity: .32
    }));
    this.trail.frustumCulled = false;
    this.scene.add(this.trail);
  }

  numberTexture(n, light) {
    const key = n + ':' + (light ? 'l' : 'd');
    if (this.numberTextures.has(key)) return this.numberTextures.get(key);
    const tex = canvasTexture(64, 64, (c, w, h) => {
      c.clearRect(0, 0, w, h);
      c.fillStyle = light ? '#15241c' : '#f7f4e9';
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.font = '900 46px "Arial Narrow", Arial, sans-serif';
      c.fillText(String(n), w / 2, h / 2 + 2);
    });
    this.numberTextures.set(key, tex);
    return tex;
  }

  kitFor(player) {
    const team = this.game[player.side].team;
    const cols = team.colors || ['#2b7a55', '#ffffff', '#d9b45b'];
    const away = player.side === 'away';
    const year = this.game.opts?.year;
    const historic = year && year < 2024 ? HISTORIC_KITS[team.id] : null;
    const palette = historic ? (away ? historic.alt : historic.classic) : null;
    let shirt = palette?.[0] || cols[0] || '#2b7a55';
    let shorts = palette?.[1] || cols[1] || '#ffffff';
    let trim = palette?.[2] || cols[2] || '#d9b45b';
    if (!palette) {
      if (away) {
        shirt = cols[1] || '#ffffff';
        shorts = cols[0] || '#2b7a55';
      }
      if (away && team.id === 'en') shirt = '#b7182b';
      if (away && team.id === 'nz') shirt = '#f3f0e7';
    }
    return { shirt, shorts, trim };
  }

  createRig(player) {
    const kit = this.kitFor(player);
    const root = new THREE.Group();
    const hScale = clamp((player.height || 185) / 185, .93, 1.1);
    const wScale = clamp((player.weight || 95) / 95, .9, 1.14);
    root.scale.set(wScale, hScale, wScale);
    const tilt = new THREE.Group();
    root.add(tilt);

    const shirtMat = this.material(kit.shirt, { roughness: .78 });
    const shortMat = this.material(kit.shorts, { roughness: .8 });
    const trimMat = this.material(kit.trim, { roughness: .65 });
    const skinMat = this.material(SKIN[(player.number + player.side.length) % SKIN.length], { roughness: .72 });
    const hairMat = this.material('#1c1712', { roughness: .9 });

    const body = new THREE.Mesh(new THREE.CapsuleGeometry(.3, .7, 4, 10), shirtMat);
    body.position.y = 1.02; body.castShadow = true;
    tilt.add(body);

    const shoulder = new THREE.Mesh(new THREE.SphereGeometry(.36, 10, 8), shirtMat);
    shoulder.scale.set(1 + (wScale - 1) * .65, .55, .78);
    shoulder.position.y = 1.34;
    shoulder.castShadow = true;
    tilt.add(shoulder);

    const trim = new THREE.Mesh(new THREE.CylinderGeometry(.305, .305, .07, 12), trimMat);
    trim.position.y = 1.13;
    tilt.add(trim);

    const shorts = new THREE.Mesh(new THREE.CylinderGeometry(.29, .31, .32, 10), shortMat);
    shorts.position.y = .63;
    tilt.add(shorts);

    const head = new THREE.Mesh(new THREE.SphereGeometry(.235, 12, 10), skinMat);
    head.position.y = 1.72; head.castShadow = true;
    tilt.add(head);
    // simple low-poly face so the players read as people, not capsules
    const eyeMat = this.material('#17120e', { roughness: .4 });
    for (const ex of [-.078, .078]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(.028, 6, 5), eyeMat);
      eye.position.set(ex, 1.76, .208);
      tilt.add(eye);
    }
    const nose = new THREE.Mesh(new THREE.ConeGeometry(.035, .08, 5), skinMat);
    nose.position.set(0, 1.7, .232);
    nose.rotation.x = Math.PI / 2;
    tilt.add(nose);

    const hairStyle = (player.number * 7 + player.side.length) % 4;
    if (hairStyle !== 1) {
      const hair = new THREE.Mesh(new THREE.SphereGeometry(.242, 10, 8, 0, Math.PI * 2, 0, Math.PI * .62), hairMat);
      hair.position.y = 1.742;
      if (hairStyle === 3) { hair.scale.set(1.03, 1.32, 1.03); hair.position.y = 1.73; }
      tilt.add(hair);
    }
    if (hairStyle === 2) {
      const band = new THREE.Mesh(new THREE.TorusGeometry(.228, .022, 5, 18), trimMat);
      band.rotation.x = Math.PI / 2;
      band.position.y = 1.79;
      tilt.add(band);
    }

    const legGeo = new THREE.CylinderGeometry(.115, .095, .58, 8);
    const bootGeo = new THREE.BoxGeometry(.2, .13, .32);
    const legL = new THREE.Group(); legL.position.set(-.155, .62, 0);
    const legR = new THREE.Group(); legR.position.set(.155, .62, 0);
    for (const [leg, side] of [[legL, -1], [legR, 1]]) {
      const thigh = new THREE.Mesh(legGeo, skinMat);
      thigh.position.y = -.29; thigh.castShadow = true;
      leg.add(thigh);
      const sock = new THREE.Mesh(new THREE.CylinderGeometry(.105, .09, .2, 8), trimMat);
      sock.position.y = -.46;
      leg.add(sock);
      const boot = new THREE.Mesh(bootGeo, hairMat);
      boot.position.set(0, -.59, .05);
      boot.castShadow = true;
      leg.add(boot);
      tilt.add(leg);
    }

    const armGeo = new THREE.CylinderGeometry(.08, .07, .52, 7);
    const armL = new THREE.Group(); armL.position.set(-.36, 1.36, 0);
    const armR = new THREE.Group(); armR.position.set(.36, 1.36, 0);
    for (const [arm, side] of [[armL, -1], [armR, 1]]) {
      arm.rotation.z = side * .16;
      const limb = new THREE.Mesh(armGeo, skinMat);
      limb.position.y = -.24; limb.castShadow = true;
      arm.add(limb);
      const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(.11, .095, .18, 7), shirtMat);
      sleeve.position.y = -.06;
      arm.add(sleeve);
      tilt.add(arm);
    }

    const light = isLight(kit.shirt);
    const numberMat = new THREE.MeshBasicMaterial({
      map: this.numberTexture(player.number, light), transparent: true, depthWrite: false
    });
    const number = new THREE.Mesh(new THREE.PlaneGeometry(.32, .32), numberMat);
    number.position.set(0, 1.14, -.315);
    number.rotation.y = Math.PI;
    tilt.add(number);

    // grounding shadow + controlled ring + carrier marker
    const blob = new THREE.Mesh(
      new THREE.CircleGeometry(.62, 18),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: .28, depthWrite: false })
    );
    blob.rotation.x = -Math.PI / 2;
    blob.position.y = .012;
    root.add(blob);

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(.7, .82, 28),
      new THREE.MeshBasicMaterial({ color: 0xf4d67f, transparent: true, opacity: .85, side: THREE.DoubleSide, depthWrite: false })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = .035;
    ring.visible = false;
    root.add(ring);

    const marker = new THREE.Mesh(
      new THREE.ConeGeometry(.16, .34, 8),
      new THREE.MeshStandardMaterial({ color: 0xffe39a, emissive: 0xffcf5a, emissiveIntensity: 1.4, roughness: .4 })
    );
    marker.position.y = 2.45;
    marker.rotation.x = Math.PI;
    marker.visible = false;
    root.add(marker);

    root.userData = { playerId: player.id, tilt, legL, legR, armL, armR, ring, marker, yaw: player.dir > 0 ? 0 : Math.PI, tiltX: 0 };
    this.scene.add(root);
    this.rigs.set(player.id, root);
    return root;
  }

  syncRigs(dt, force = false) {
    const g = this.game;
    const active = new Set();
    for (const p of g.allPlayers) {
      if (!p.onField) continue;
      active.add(p.id);
      let rig = this.rigs.get(p.id);
      if (!rig) rig = this.createRig(p);
      const d = rig.userData;
      rig.visible = !p.card;
      if (p.card) continue;

      const wx = p.x - 35, wz = p.y - 50;
      if (force) rig.position.set(wx, 0, wz);
      else {
        rig.position.x = damp(rig.position.x, wx, 22, dt);
        rig.position.z = damp(rig.position.z, wz, 22, dt);
      }

      const speed = Math.hypot(p.vx, p.vy);
      const targetYaw = speed > .35 ? Math.atan2(p.vx, p.vy) : (p.dir > 0 ? 0 : Math.PI);
      d.yaw = force ? targetYaw : dampAngle(d.yaw, targetYaw, 12, dt);
      rig.rotation.y = d.yaw;

      const run = Math.min(1, speed / 2.8);
      const cycle = p.runCycle;
      const celebrating = p.celebrate > 0;
      const tackling = p.tackleAnim > 0;

      let targetTilt = 0;
      let targetTiltZ = -Math.sin(cycle) * .04 * run;
      let legLTarget = Math.sin(cycle) * .72 * run;
      let legRTarget = -Math.sin(cycle) * .72 * run;
      let armLTarget = Math.sin(cycle + Math.PI) * .58 * run;
      let armRTarget = -Math.sin(cycle + Math.PI) * .58 * run;

      if (p.down > 0) {
        targetTilt = p.tackleType === 'dive' ? 1.12 : .96;
        legLTarget = .18; legRTarget = -.12;
        armLTarget = -.5; armRTarget = -.28;
      }
      if (tackling) {
        const dive = p.tackleType === 'dive';
        targetTilt = dive ? 1.28 : .58;
        armLTarget = -1.6; armRTarget = -1.6;
        legLTarget = dive ? .95 : .38;
        legRTarget = dive ? -.95 : -.38;
      }
      if (p.fend > 0) { armLTarget = -1.75; targetTiltZ = .2; }
      if (p.step > 0) { targetTiltZ = Math.sign(p.vx || 1) * .42; }
      if (p.passAnim > 0) {
        const k = clamp(p.passAnim / .35, 0, 1);
        armRTarget = -1.15 * k;
      }
      if (p.kickAnim > 0) {
        const k = clamp(p.kickAnim / .4, 0, 1);
        legRTarget = .95 * k;
        armLTarget = -.35 * k;
      }
      if (celebrating) {
        armLTarget = -2.55; armRTarget = -2.55;
        targetTiltZ = Math.sin(g.animTime * 7) * .12;
      }
      rig.position.y = celebrating ? Math.abs(Math.sin(g.animTime * 6)) * .22 : 0;

      d.tiltX = force ? targetTilt : damp(d.tiltX, targetTilt, tackling || p.down > 0 ? 11 : 8, dt);
      d.tilt.rotation.x = d.tiltX;
      d.tilt.rotation.z = damp(d.tilt.rotation.z, targetTiltZ, 10, dt);
      d.legL.rotation.x = damp(d.legL.rotation.x, legLTarget, 16, dt);
      d.legR.rotation.x = damp(d.legR.rotation.x, legRTarget, 16, dt);
      d.armL.rotation.x = damp(d.armL.rotation.x, armLTarget, 16, dt);
      d.armR.rotation.x = damp(d.armR.rotation.x, armRTarget, 16, dt);

      const controlled = p.id === g.controlledId && p.side === g.userTeam;
      d.ring.visible = controlled;
      if (controlled) {
        d.ring.rotation.z = g.animTime * 1.6;
        d.ring.material.opacity = .62 + Math.sin(g.animTime * 5) * .22;
      }
      d.marker.visible = g.ball.holder === p && p.down <= 0;
      if (d.marker.visible) d.marker.position.y = 2.42 + Math.sin(g.animTime * 4) * .07;
    }

    for (const [id, rig] of this.rigs) {
      if (!active.has(id)) rig.visible = false;
    }
  }

  syncBall(dt) {
    const g = this.game, b = g.ball;
    if (b.mode === 'dead') { this.ballGroup.visible = false; this.trail.visible = false; return; }
    this.ballGroup.visible = true;
    const height = (b.mode === 'held' ? .82 : .28) + (b.z || 0);
    this.ballGroup.position.set(b.x - 35, height, b.y - 50);
    const spin = b.spin || 0;
    this.ballGroup.rotation.set(spin * .7 + g.animTime * .2, spin, Math.PI / 2 + spin * .35);

    // trail
    const trail = (b.trail || []).slice(-12);
    if (trail.length > 2 && (b.mode === 'kick' || b.mode === 'pass')) {
      const pos = this.trail.geometry.attributes.position;
      let i = 0;
      for (; i < trail.length; i++) {
        const t = trail[i];
        pos.setXYZ(i, t.x - 35, (t.z || 0) + .35, t.y - 50);
      }
      for (; i < 12; i++) pos.setXYZ(i, b.x - 35, height, b.y - 50);
      pos.needsUpdate = true;
      this.trail.visible = true;
    } else {
      this.trail.visible = false;
    }
  }

  syncEffects(dt) {
    const g = this.game;
    const seen = new Set();
    for (const e of g.effects) {
      seen.add(e);
      let sprite = this.effectSprites.get(e);
      if (!sprite) {
        if (e.type === 'dust') {
          const mat = new THREE.SpriteMaterial({
            map: this.dustTexture(), color: new THREE.Color(e.color || '#d9cfb7'),
            transparent: true, opacity: .4, depthWrite: false
          });
          sprite = new THREE.Sprite(mat);
          sprite.scale.setScalar((e.size || .4) * 3.2);
          this.scene.add(sprite);
        } else if (e.type === 'text') {
          const tex = canvasTexture(256, 96, (c, w, h) => {
            c.clearRect(0, 0, w, h);
            c.fillStyle = e.color || '#ffe39a';
            c.font = '900 48px "Arial Narrow", Arial, sans-serif';
            c.textAlign = 'center'; c.textBaseline = 'middle';
            c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 8;
            c.fillText(e.text, w / 2, h / 2);
          });
          sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
          sprite.scale.set(4.2, 1.6, 1);
          this.scene.add(sprite);
        } else continue;
        sprite.userData.effect = e;
        this.effectSprites.set(e, sprite);
      }
      const a = clamp(e.life / e.max, 0, 1);
      sprite.position.set(e.x - 35, (e.type === 'text' ? 2.5 : .55) + (1 - a) * (e.type === 'text' ? 1.2 : .4), e.y - 50);
      sprite.material.opacity = e.type === 'text' ? Math.min(1, a * 2) : a * .42;
      if (e.type === 'text') sprite.scale.set(4.2, 1.6, 1);
    }
    for (const [e, sprite] of this.effectSprites) {
      if (!seen.has(e)) {
        this.scene.remove(sprite);
        sprite.material.map?.dispose();
        sprite.material.dispose();
        this.effectSprites.delete(e);
      }
    }
  }

  dustTexture() {
    if (!this._dustTex) {
      this._dustTex = canvasTexture(64, 64, (c, w, h) => {
        const rg = c.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
        rg.addColorStop(0, 'rgba(255,255,255,.9)');
        rg.addColorStop(.5, 'rgba(255,255,255,.3)');
        rg.addColorStop(1, 'rgba(255,255,255,0)');
        c.fillStyle = rg; c.fillRect(0, 0, w, h);
      });
    }
    return this._dustTex;
  }

  syncSetPiece() {
    const g = this.game;
    const s = g.setpiece;
    if (s) {
      this.setPieceRing.visible = true;
      this.setPieceRing.position.set(s.x - 35, .05, s.y - 50);
      const pulse = 1 + Math.sin(g.animTime * 4) * .05;
      this.setPieceRing.scale.setScalar(pulse);
    } else {
      this.setPieceRing.visible = false;
    }
    if (g.ruck) {
      this.offsideLine.visible = true;
      this.offsideLine.position.set(0, .05, g.ruck.y + 1.2 - 50);
    } else {
      this.offsideLine.visible = false;
    }
  }

  buildOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'match3d-overlay';
    this.overlay.innerHTML = '<div class="match3d-try"><span>RUGBY WORLD CUP 26</span><b>TRY!</b><em></em></div>';
    const parent = this.canvas.parentElement;
    if (parent) parent.appendChild(this.overlay);
    this.tryEl = this.overlay.querySelector('.match3d-try');
    this.tryName = this.overlay.querySelector('.match3d-try em');
  }

  syncOverlay() {
    const g = this.game;
    const show = g.phase === 'try' && g.tryInfo;
    this.tryEl.classList.toggle('show', !!show);
    if (show) {
      this.tryName.textContent = `${g.tryInfo.scorer.name.toUpperCase()} • ${g[g.tryInfo.side].team.name.toUpperCase()}`;
    }
  }

  quality() { return this.settings?.graphics || 'medium'; }
  pixelRatioCap() {
    const q = this.quality();
    const device = window.devicePixelRatio || 1;
    const cap = q === 'low' ? 1 : q === 'medium' ? 1.25 : q === 'high' ? 1.5 : 1.75;
    return Math.min(device, cap);
  }
  shadowMapSize() {
    const q = this.quality();
    return q === 'low' ? 512 : q === 'medium' ? 1024 : q === 'high' ? 2048 : 4096;
  }
  resize() {
    const r = this.canvas.getBoundingClientRect();
    const parent = this.canvas.parentElement;
    const pr = parent?.getBoundingClientRect();
    this.w = Math.max(1, r.width || pr?.width || 1);
    this.h = Math.max(1, r.height || pr?.height || 1);
    this.dpr = this.pixelRatioCap();
    if (this.w === this.lastSize.w && this.h === this.lastSize.h) return;
    this.lastSize = { w: this.w, h: this.h };
    this.gl.setPixelRatio(this.dpr);
    this.gl.setSize(this.w, this.h, false);
    const aspect = this.w / this.h;
    const viewSize = this.viewSize || 46;
    this.camera.left = -viewSize * aspect / 2;
    this.camera.right = viewSize * aspect / 2;
    this.camera.top = viewSize / 2;
    this.camera.bottom = -viewSize / 2;
    this.camera.updateProjectionMatrix();
  }

  updateCamera(dt, force = false) {
    const g = this.game, b = g.ball;
    let fx = b.x, fz = b.y;
    if (g.phase === 'try' && g.tryInfo) { fx = g.tryInfo.x; fz = g.tryInfo.y; }
    else if (g.phase === 'goal' || g.phase === 'conversion') { fx = 35; fz = g.goal?.side === 'home' ? 100 : 0; }
    else {
      const carrier = b.holder;
      const userDefending = carrier && carrier.side !== g.userTeam && g.userTeam !== 'none';
      if (userDefending) {
        const defender = g.byId(g.controlledId);
        if (defender && defender.side === g.userTeam && defender.down <= 0) {
          fx = (b.x + defender.x) * .5;
          fz = (b.y + defender.y) * .5;
        }
      }
    }
    fx = clamp(fx, 10, 60);
    fz = clamp(fz, -4, 104);
    if (force) { this.focus.x = fx; this.focus.z = fz; }
    else {
      this.focus.x = damp(this.focus.x, fx, 2.4, dt);
      this.focus.z = damp(this.focus.z, fz, 2.8, dt);
    }

    const userZoom = this.settings.cameraZoom || 1;
    let zoom = userZoom;
    if (g.phase === 'try') zoom *= .82;
    else if (g.phase === 'goal' || g.phase === 'conversion') zoom *= .76;
    else if (g.setpiece || g.ruck || g.phase === 'maul') zoom *= .92;

    const shake = g.cameraShake || 0;
    this.shake.x = (Math.random() - .5) * shake * 1.6;
    this.shake.y = (Math.random() - .5) * shake * 1.2;
    this.shake.z = (Math.random() - .5) * shake * 1.6;

    // Ball/focus coordinates run 0..70 across and 0..100 along the pitch.
    // Player rigs and the ball mesh are centred on the origin, so convert
    // the focus into world space before placing the camera.
    const worldX = this.focus.x - 35;
    const worldZ = this.focus.z - 50;
    const targetX = worldX;
    const targetZ = worldZ;
    this.camera.position.set(targetX + this.shake.x, 64 + this.shake.y, targetZ - 10 + this.shake.z);
    this.camera.lookAt(targetX, 0, targetZ + 6);
    this.viewSize = 46 / Math.max(.78, zoom);
    const aspect = this.w / this.h;
    this.camera.left = -this.viewSize * aspect / 2;
    this.camera.right = this.viewSize * aspect / 2;
    this.camera.top = this.viewSize / 2;
    this.camera.bottom = -this.viewSize / 2;
    this.camera.updateProjectionMatrix();
    this.camera.fov = (this.w / this.h < .8 ? 52 : 48) * (1 / Math.max(.74, zoom));
    this.camera.updateProjectionMatrix();
  }

  render(dt = 1 / 60) {
    const r = this.canvas.getBoundingClientRect();
    if (Math.abs(r.width - this.lastSize.w) > 1 || Math.abs(r.height - this.lastSize.h) > 1) this.resize();
    this.time += dt;
    this.syncRigs(dt);
    this.syncBall(dt);
    this.syncEffects(dt);
    this.syncSetPiece();
    this.syncOverlay();
    this.updateCamera(dt);
    this.gl.render(this.scene, this.camera);
  }

  dispose() {
    this.overlay?.remove();
    for (const [, rig] of this.rigs) {
      this.scene.remove(rig);
    }
    this.rigs.clear();
    this.scene.traverse(obj => {
      obj.geometry?.dispose?.();
      const mats = Array.isArray(obj.material) ? obj.material : obj.material ? [obj.material] : [];
      for (const m of mats) {
        m.map?.dispose?.();
        m.dispose?.();
      }
    });
    this.gl.dispose();
    this.gl.forceContextLoss?.();
  }
}
