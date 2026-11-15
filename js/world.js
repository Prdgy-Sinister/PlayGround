/* ============================================================
   WANDLORE — world.js
   Three.js world: terrain, sky, atmosphere, paths, forest,
   third-person player, camera, interaction props and animation.
   ============================================================ */
import * as THREE from 'three'
import { ZONES, NODES, NPCS, WOODS, CORES, RARITIES } from './data.js'
import { buildVillage, buildAcademy, buildArena, glowTexture } from './props.js'
import { buildForest, buildRuins, buildCavern, buildSpire, buildNPCs, buildCreatures, buildNodes } from './wilds.js'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const lerp = (a, b, t) => a + (b - a) * t
const woodById = Object.fromEntries(WOODS.map(w => [w.id, w]))
const coreById = Object.fromEntries(CORES.map(c => [c.id, c]))

export class World {
  constructor(canvas) {
    this.canvas = canvas
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color('#0c0918')
    this.scene.fog = new THREE.FogExp2(0x171129, 0.0072)
    this.camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 600)
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', alpha: false })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.24

    this.textures = { glow: glowTexture() }
    this.colliders = []
    this.npcs = {}
    this.nodes = {}
    this.creatures = {}
    this.creatureLore = []
    this.floating = []
    this.fireflies = []
    this.pathPoints = []
    this.nodeMarkers = []
    this.time = 0
    this.playerPos = new THREE.Vector3(0, 0, 16)
    this.velocity = new THREE.Vector3()
    this.cameraYaw = 0
    this.cameraPitch = 0.34
    this.cameraDist = 9.6
    this.camTarget = new THREE.Vector3(0, 2, 16)
    this.shakeAmount = 0
    this.shakeTime = 0
    this.dashTime = 0
    this.dashDir = new THREE.Vector3()
    this.movementBounds = null
    this.arenaBarrier = null
    this.castT = 0
    this.moveAmount = 0
    this.facing = Math.PI

    this.buildSky()
    this.buildTerrain()
    this.buildPaths()
    this.buildLights()
    this.buildMountains()
    buildVillage(this)
    buildAcademy(this)
    buildArena(this)
    buildForest(this)
    buildRuins(this)
    buildCavern(this)
    buildSpire(this)
    buildNPCs(this)
    buildCreatures(this)
    buildNodes(this)
    this.buildTrees()
    this.buildRocks()
    this.buildParticles()
    this.buildPlayer()
    this.buildBarrier()

    this.setPlayer(0, 16, Math.PI)
    this.updateCamera(1, true)
    this.onResize()
  }

  /* ------------------------------------------------------- HEIGHT */
  heightAt(x, z) {
    let h = Math.sin(x * 0.048) * Math.cos(z * 0.055) * 0.82 + Math.sin((x + z) * 0.03) * 0.48 + Math.cos((x - z) * 0.041) * 0.3
    const dv = Math.hypot(x, z)
    h *= clamp(dv / 26, 0.08, 1)
    h -= 1.45 * Math.exp(-((x + 31) ** 2 + (z - 44) ** 2) / 105)
    h += 0.9 * Math.exp(-((x - 14) ** 2 + (z - 60) ** 2) / 850)
    h -= 0.55 * Math.exp(-((x + 62) ** 2 + (z + 44) ** 2) / 720)
    h += 0.45 * Math.exp(-((x - 44) ** 2 + (z + 25) ** 2) / 600)
    // Level the duelling ground so the terrain never cuts through the arena floor.
    const arenaD = Math.hypot(x - 24, z + 4)
    if (arenaD < 18) {
      const t = Math.max(0, Math.min(1, (arenaD - 11) / 7))
      const ease = t * t * (3 - 2 * t)
      h = 1.17 * (1 - ease) + h * ease
    }
    return h
  }

  addCollider(x, z, r, cameraBlock = false, camR = r * 1.18 + 0.55) { this.colliders.push({ x, z, r, cameraBlock, camR }) }

  addCreatureLore(name, where) {
    if (!this.creatureLore.some(c => c.name === name)) this.creatureLore.push({ name, where })
  }

  /* ------------------------------------------------------- SKY */
  buildSky() {
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false, fog: false,
      uniforms: {
        top: { value: new THREE.Color('#090716') },
        mid: { value: new THREE.Color('#241a44') },
        horizon: { value: new THREE.Color('#4b3568') },
        glow: { value: new THREE.Color('#8a5fa8') },
      },
      vertexShader: `varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `
        varying vec3 vP; uniform vec3 top; uniform vec3 mid; uniform vec3 horizon; uniform vec3 glow;
        void main(){
          float h = normalize(vP).y;
          vec3 c = mix(horizon, mid, smoothstep(-0.02, 0.32, h));
          c = mix(c, top, smoothstep(0.25, 0.8, h));
          float band = exp(-pow((h - 0.08) * 5.0, 2.0));
          c += glow * band * 0.22;
          gl_FragColor = vec4(c, 1.0);
        }`,
    })
    const sky = new THREE.Mesh(new THREE.SphereGeometry(420, 32, 24), skyMat)
    this.scene.add(sky)

    const starGeo = new THREE.BufferGeometry()
    const starPos = []
    for (let i = 0; i < 1400; i++) {
      const r = 330 + Math.random() * 60
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.max(-1, Math.min(1, Math.random() * 1.15 - 0.1)))
      starPos.push(Math.sin(phi) * Math.cos(theta) * r, Math.cos(phi) * r * 0.9 + 30, Math.sin(phi) * Math.sin(theta) * r)
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3))
    const starMat = new THREE.PointsMaterial({ map: this.textures.glow, color: '#d8e2ff', size: 1.5, sizeAttenuation: true, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending, fog: false })
    this.stars = new THREE.Points(starGeo, starMat)
    this.scene.add(this.stars)

    // moon
    const moon = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.textures.glow, color: '#e8eeff', transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }))
    moon.position.set(-150, 130, -220); moon.scale.setScalar(52); this.scene.add(moon)
    const moonCore = new THREE.Mesh(new THREE.CircleGeometry(7, 32), new THREE.MeshBasicMaterial({ color: '#f2f0e0', fog: false, toneMapped: false }))
    moonCore.position.copy(moon.position); moonCore.lookAt(0, 10, 0); this.scene.add(moonCore)
    const moonHalo = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.textures.glow, color: '#b9c8ff', transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }))
    moonHalo.position.copy(moon.position); moonHalo.scale.setScalar(100); this.scene.add(moonHalo)

    // aurora ribbons
    this.auroras = []
    const auroraCanvas = document.createElement('canvas'); auroraCanvas.width = 512; auroraCanvas.height = 128
    const ag = auroraCanvas.getContext('2d')
    const grad = ag.createLinearGradient(0, 0, 512, 0)
    grad.addColorStop(0, 'rgba(90,220,190,0)'); grad.addColorStop(0.28, 'rgba(90,220,190,.35)'); grad.addColorStop(0.55, 'rgba(160,130,255,.45)'); grad.addColorStop(0.8, 'rgba(90,220,190,.2)'); grad.addColorStop(1, 'rgba(90,220,190,0)')
    ag.fillStyle = grad; ag.fillRect(0, 0, 512, 128)
    const gradV = ag.createLinearGradient(0, 0, 0, 128)
    gradV.addColorStop(0, 'rgba(0,0,0,0)'); gradV.addColorStop(0.5, 'rgba(0,0,0,0)'); gradV.addColorStop(1, 'rgba(0,0,0,1)')
    ag.globalCompositeOperation = 'destination-out'; ag.fillStyle = gradV; ag.fillRect(0, 0, 512, 128)
    const at = new THREE.CanvasTexture(auroraCanvas); at.colorSpace = THREE.SRGBColorSpace
    for (let i = 0; i < 3; i++) {
      const mat = new THREE.MeshBasicMaterial({ map: at, transparent: true, opacity: 0.14 + i * 0.03, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false })
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(240, 70), mat)
      plane.position.set(-40 + i * 70, 92 + i * 8, -230)
      plane.rotation.z = -0.08 + i * 0.06
      this.scene.add(plane)
      this.auroras.push({ plane, base: mat.opacity, phase: i * 2.1 })
    }
  }

  /* ------------------------------------------------------- TERRAIN */
  buildTerrain() {
    const size = 260, seg = 120
    const geo = new THREE.PlaneGeometry(size, size, seg, seg)
    geo.rotateX(-Math.PI / 2)
    const pos = geo.attributes.position
    const colors = []
    const zoneTints = ZONES.map(z => ({ ...z, color: new THREE.Color(z.color) }))
    const cVillage = new THREE.Color('#4a4738')
    const cGrass = new THREE.Color('#304b36')
    const cForest = new THREE.Color('#2c4a34')
    const cRuins = new THREE.Color('#504738')
    const cCave = new THREE.Color('#35313f')
    const cSpire = new THREE.Color('#29222f')
    const cAcademy = new THREE.Color('#3b3b4c')
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i)
      const y = this.heightAt(x, z)
      pos.setY(i, y)
      const c = cGrass.clone()
      const dv = Math.hypot(x, z)
      if (dv < 24) c.lerp(cVillage, 0.6 * (1 - dv / 24))
      const df = Math.hypot(x + 46, z - 16)
      if (df < 38) c.lerp(cForest, 0.45 * (1 - df / 38))
      const dr = Math.hypot(x - 14, z - 60)
      if (dr < 26) c.lerp(cRuins, 0.5 * (1 - dr / 26))
      const dc = Math.hypot(x + 62, z + 44)
      if (dc < 26) c.lerp(cCave, 0.55 * (1 - dc / 26))
      const ds = Math.hypot(x - 72, z - 56)
      if (ds < 25) c.lerp(cSpire, 0.55 * (1 - ds / 25))
      const da = Math.hypot(x - 44, z + 20)
      if (da < 27) c.lerp(cAcademy, 0.45 * (1 - da / 27))
      const n = (Math.sin(x * 1.7) * Math.cos(z * 1.3) + Math.sin(x * 0.35 + z * 0.6)) * 0.04
      c.offsetHSL(0, 0, n)
      colors.push(c.r, c.g, c.b)
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.98, metalness: 0.02, flatShading: false })
    const ground = new THREE.Mesh(geo, mat)
    this.scene.add(ground)
    this.ground = ground

    // sea
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), new THREE.MeshStandardMaterial({ color: '#0c1c26', roughness: 0.28, metalness: 0.55, transparent: true, opacity: 0.98 }))
    sea.rotation.x = -Math.PI / 2; sea.position.y = -1.75; this.scene.add(sea)
    this.sea = sea

    // shore mist ring
    const mistGeo = new THREE.RingGeometry(108, 136, 64)
    const mistMat = new THREE.MeshBasicMaterial({ color: '#4c4270', transparent: true, opacity: 0.16, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending })
    const mist = new THREE.Mesh(mistGeo, mistMat)
    mist.rotation.x = -Math.PI / 2; mist.position.y = -1.2; this.scene.add(mist)
    this.shoreMist = mist
  }

  /* ------------------------------------------------------- PATHS */
  buildPaths() {
    const routes = [
      [[0, 13], [8, 11], [18, 6], [27, 0], [32, -8], [36, -12]],
      [[-2, 10], [-10, 10], [-20, 8], [-28, 8], [-34, 10]],
      [[2, 14], [5, 24], [8, 36], [11, 46], [13, 51]],
      [[-2, -2], [-12, -8], [-24, -16], [-36, -24], [-46, -30], [-52, -35]],
      [[10, 8], [20, 15], [32, 22], [44, 31], [53, 37], [59, 41]],
      [[34, -8], [39, -10], [42, -13]],
    ]
    for (const pts of routes) {
      const curve = new THREE.CatmullRomCurve3(pts.map(([x, z]) => new THREE.Vector3(x, 0, z)))
      const n = 40, width = 2.6
      const verts = [], idx = []
      for (let i = 0; i <= n; i++) {
        const t = i / n
        const p = curve.getPoint(t)
        const tan = curve.getTangent(t)
        const nx = -tan.z, nz = tan.x
        for (const side of [-1, 1]) {
          const x = p.x + nx * width * 0.5 * side
          const z = p.z + nz * width * 0.5 * side
          verts.push(x, this.heightAt(x, z) + 0.06, z)
        }
        if (i < n) {
          const a = i * 2
          idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3)
        }
        this.pathPoints.push({ x: p.x, z: p.z })
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
      geo.setIndex(idx)
      geo.computeVertexNormals()
      const mat = new THREE.MeshStandardMaterial({ color: '#6f6650', roughness: 1, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 })
      const mesh = new THREE.Mesh(geo, mat)
      this.scene.add(mesh)
    }
  }

  isNearPath(x, z, pad = 3) {
    for (const p of this.pathPoints) if (Math.hypot(x - p.x, z - p.z) < pad) return true
    return false
  }

  /* ------------------------------------------------------- LIGHTS */
  buildLights() {
    const hemi = new THREE.HemisphereLight(0x9c8ac8, 0x24352b, 1.3)
    this.scene.add(hemi)
    const moonLight = new THREE.DirectionalLight(0xcbd8ff, 1.85)
    moonLight.position.set(-55, 90, 45)
    this.scene.add(moonLight)
    const fill = new THREE.DirectionalLight(0x7a5fa8, 0.45)
    fill.position.set(50, 30, -40)
    this.scene.add(fill)
  }

  buildMountains() {
    const mat = new THREE.MeshStandardMaterial({ color: '#191426', roughness: 1, flatShading: true })
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2 + Math.random() * 0.1
      const r = 118 + Math.random() * 36
      const h = 22 + Math.random() * 42
      const mountain = new THREE.Mesh(new THREE.ConeGeometry(16 + Math.random() * 20, h, 5 + (i % 3)), mat)
      mountain.position.set(Math.cos(a) * r, -4 + h / 2, Math.sin(a) * r)
      mountain.rotation.y = Math.random() * Math.PI
      this.scene.add(mountain)
    }
  }

  /* ------------------------------------------------------- FOREST TREES */
  buildTrees() {
    const pines = [], broad = []
    const tryPlace = (x, z, kind) => {
      if (Math.hypot(x, z) > 98) return
      if (Math.hypot(x, z) < 21) return
      if (this.isNearPath(x, z, 4.5)) return
      if (Math.hypot(x - 44, z + 25) < 15) return
      if (Math.hypot(x - 24, z + 4) < 12) return
      for (const c of this.colliders) if (Math.hypot(x - c.x, z - c.z) < c.r + 1.4) return
      for (const nd of NODES) if (Math.hypot(x - nd.pos[0], z - nd.pos[1]) < 3.2) return
      for (const np of NPCS) if (Math.hypot(x - np.pos[0], z - np.pos[1]) < 3.2) return
      if (Math.hypot(x - 31, z - 44) < 11) return
      const y = this.heightAt(x, z)
      if (kind === 'pine') pines.push({ x, y, z, s: 0.65 + Math.random() * 0.9, rot: Math.random() * Math.PI * 2 })
      else broad.push({ x, y, z, s: 0.7 + Math.random() * 0.8, rot: Math.random() * Math.PI * 2 })
    }
    for (let i = 0; i < 150; i++) {
      const a = Math.random() * Math.PI * 2, r = Math.random() * 37
      const x = -46 + Math.cos(a) * r, z = 16 + Math.sin(a) * r * 0.92
      if (Math.hypot(x + 31, z - 44) < 10) continue
      if (Math.hypot(x + 36, z - 27) < 6) continue
      tryPlace(x, z, Math.random() < 0.72 ? 'pine' : 'broad')
    }
    for (let i = 0; i < 55; i++) {
      const a = Math.random() * Math.PI * 2, r = 72 + Math.random() * 26
      tryPlace(Math.cos(a) * r, Math.sin(a) * r, Math.random() < 0.55 ? 'pine' : 'broad')
    }
    for (let i = 0; i < 40; i++) {
      const a = Math.random() * Math.PI * 2, r = 28 + Math.random() * 50
      const x = -46 + Math.cos(a) * r, z = 16 + Math.sin(a) * r
      if (Math.hypot(x - 14, z - 58) < 20) continue
      if (Math.hypot(x + 62, z + 44) < 20) continue
      if (Math.hypot(x - 72, z - 56) < 18) continue
      tryPlace(x, z, Math.random() < 0.5 ? 'pine' : 'broad')
    }

    const trunkGeo = new THREE.CylinderGeometry(0.16, 0.28, 1, 6)
    const trunkMat = new THREE.MeshStandardMaterial({ color: '#3a2a22', roughness: 1, flatShading: true })
    const pineGeo = new THREE.ConeGeometry(1, 1, 7)
    const pineMat = new THREE.MeshStandardMaterial({ color: '#213b2b', roughness: 0.98, flatShading: true })
    const broadGeo = new THREE.IcosahedronGeometry(1, 0)
    const broadMat = new THREE.MeshStandardMaterial({ color: '#2d4632', roughness: 0.98, flatShading: true })

    const trunkCount = pines.length + broad.length
    const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, trunkCount)
    const pineFoliage = new THREE.InstancedMesh(pineGeo, pineMat, pines.length * 3)
    const broadFoliage = new THREE.InstancedMesh(broadGeo, broadMat, broad.length * 2)
    const m = new THREE.Matrix4(); const q = new THREE.Quaternion(); const sc = new THREE.Vector3(); const pos = new THREE.Vector3()
    const col = new THREE.Color()
    let ti = 0, pi = 0, bi = 0
    const treeShadowMat = new THREE.MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 0.22, depthWrite: false })
    const addShadow = (x, z, s) => {
      const sh = new THREE.Mesh(new THREE.CircleGeometry(1.3 * s, 10), treeShadowMat)
      sh.rotation.x = -Math.PI / 2; sh.position.set(x, this.heightAt(x, z) + 0.04, z); this.scene.add(sh)
    }
    for (const t of pines) {
      const th = (4.5 + t.s * 3) * 0.8
      pos.set(t.x, t.y + th * 0.5, t.z); sc.set(t.s, th, t.s); q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), t.rot)
      m.compose(pos, q, sc); trunks.setMatrixAt(ti++, m)
      for (let j = 0; j < 3; j++) {
        const layerS = t.s * (1.45 - j * 0.32)
        const layerH = t.s * (2.2 - j * 0.35)
        pos.set(t.x, t.y + th * 0.5 + j * t.s * 1.15 + layerH * 0.2, t.z)
        sc.set(layerS, layerH, layerS)
        m.compose(pos, q, sc)
        pineFoliage.setMatrixAt(pi, m)
        col.setHSL(0.36 + Math.random() * 0.03, 0.28, 0.16 + Math.random() * 0.05)
        pineFoliage.setColorAt(pi, col)
        pi++
      }
      if (t.s > 1.15) addShadow(t.x, t.z, t.s * 0.8)
    }
    for (const t of broad) {
      const th = (3.6 + t.s * 2.4) * 0.8
      pos.set(t.x, t.y + th * 0.5, t.z); sc.set(t.s * 0.9, th, t.s * 0.9); q.setFromEuler(new THREE.Euler(0, t.rot, 0))
      m.compose(pos, q, sc); trunks.setMatrixAt(ti++, m)
      for (let j = 0; j < 2; j++) {
        pos.set(t.x + (j ? 0.5 : -0.4) * t.s, t.y + th * 0.8 + j * 1.5 * t.s, t.z + (j ? -0.3 : 0.4) * t.s)
        sc.set((2.2 - j * 0.5) * t.s, (1.9 - j * 0.4) * t.s, (2.1 - j * 0.4) * t.s)
        m.compose(pos, q, sc)
        broadFoliage.setMatrixAt(bi, m)
        col.setHSL(0.31 + Math.random() * 0.05, 0.3, 0.15 + Math.random() * 0.06)
        broadFoliage.setColorAt(bi, col)
        bi++
      }
      if (t.s > 1.1) addShadow(t.x, t.z, t.s * 0.9)
    }
    trunks.instanceMatrix.needsUpdate = true
    pineFoliage.instanceMatrix.needsUpdate = true
    broadFoliage.instanceMatrix.needsUpdate = true
    if (pineFoliage.instanceColor) pineFoliage.instanceColor.needsUpdate = true
    if (broadFoliage.instanceColor) broadFoliage.instanceColor.needsUpdate = true
    this.scene.add(trunks, pineFoliage, broadFoliage)
    this.treeCount = trunkCount
  }

  buildRocks() {
    const rockGeo = new THREE.DodecahedronGeometry(1, 0)
    const rockMat = new THREE.MeshStandardMaterial({ color: '#575260', roughness: 1, flatShading: true })
    const count = 55
    const rocks = new THREE.InstancedMesh(rockGeo, rockMat, count)
    const m = new THREE.Matrix4(); const q = new THREE.Quaternion(); const s = new THREE.Vector3(); const p = new THREE.Vector3()
    let placed = 0, guard = 0
    while (placed < count && guard++ < 400) {
      const x = (Math.random() - 0.5) * 170, z = (Math.random() - 0.5) * 170
      if (Math.hypot(x, z) < 18 || this.isNearPath(x, z, 3)) continue
      if (Math.hypot(x + 31, z - 44) < 11) continue
      if (Math.hypot(x - 24, z + 4) < 12) continue
      const sc = 0.4 + Math.random() * 1.6
      p.set(x, this.heightAt(x, z) + sc * 0.3, z)
      s.set(sc, sc * (0.5 + Math.random() * 0.6), sc)
      q.setFromEuler(new THREE.Euler(Math.random(), Math.random() * 6, Math.random() * 0.5))
      m.compose(p, q, s); rocks.setMatrixAt(placed++, m)
    }
    this.scene.add(rocks)
  }

  /* ------------------------------------------------------- AMBIENT PARTICLES */
  buildParticles() {
    const makePoints = (count, color, size, area, yBase, yRange, opacity = 0.8) => {
      const pos = []
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * area
        pos.push(Math.cos(a) * r, yBase + Math.random() * yRange, Math.sin(a) * r)
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
      const mat = new THREE.PointsMaterial({ map: this.textures.glow, color, size, sizeAttenuation: true, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending })
      const pts = new THREE.Points(geo, mat)
      this.scene.add(pts)
      return pts
    }
    this.motes = makePoints(620, '#d8c6ff', 0.32, 105, 0.6, 7, 0.55)
    this.firefliesMesh = makePoints(260, '#a6ffb0', 0.4, 34, 0.6, 3.5, 0.9)
    this.firefliesMesh.position.set(-46, 0, 16)
    this.cavernDust = makePoints(160, '#8fe6ff', 0.36, 22, 0.4, 5, 0.7)
    this.cavernDust.position.set(-62, 0, -44)
    this.spireDust = makePoints(120, '#ff8aa8', 0.32, 18, 0.4, 5, 0.6)
    this.spireDust.position.set(72, 0, 56)
  }

  /* ------------------------------------------------------- PLAYER */
  buildPlayer() {
    const robe = new THREE.Group()
    const robeMat = new THREE.MeshStandardMaterial({ color: '#2b2850', roughness: 0.9, flatShading: true })
    const trimMat = new THREE.MeshStandardMaterial({ color: '#c9a24a', roughness: 0.55, metalness: 0.35, emissive: '#3a2a0c', emissiveIntensity: 0.4 })
    const skin = new THREE.MeshStandardMaterial({ color: '#e4c2a0', roughness: 0.8 })

    const skirt = new THREE.Mesh(new THREE.ConeGeometry(0.46, 1.42, 10), robeMat)
    skirt.position.y = 0.73; robe.add(skirt)
    const hem = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.026, 4, 16), trimMat)
    hem.rotation.x = Math.PI / 2; hem.position.y = 0.09; robe.add(hem)
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.3, 0.66, 8), robeMat)
    torso.position.y = 1.38; robe.add(torso)
    const belt = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.04, 4, 14), trimMat)
    belt.rotation.x = Math.PI / 2; belt.position.y = 1.16; robe.add(belt)
    const shoulders = new THREE.Mesh(new THREE.SphereGeometry(0.33, 8, 6), robeMat)
    shoulders.scale.set(1.06, 0.52, 0.9); shoulders.position.y = 1.64; robe.add(shoulders)
    const scarf = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.055, 4, 12), trimMat)
    scarf.rotation.x = Math.PI / 2; scarf.position.y = 1.77; robe.add(scarf)
    const scarfTail = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.6, 0.04), trimMat)
    scarfTail.position.set(-0.12, 1.48, 0.24); scarfTail.rotation.x = 0.2; robe.add(scarfTail)

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.215, 12, 10), skin)
    head.position.y = 1.97; robe.add(head)
    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.23, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.62), new THREE.MeshStandardMaterial({ color: '#2a2028', roughness: 0.95 }))
    hair.position.y = 2.04; hair.rotation.x = 0.14; robe.add(hair)
    const fringe = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.18, 4), new THREE.MeshStandardMaterial({ color: '#2a2028', roughness: 0.95 }))
    fringe.position.set(0.1, 2.02, 0.2); fringe.rotation.z = 0.6; robe.add(fringe)
    for (const side of [-1, 1]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.022, 5, 4), new THREE.MeshBasicMaterial({ color: '#1c1a2a' }))
      eye.position.set(side * 0.075, 1.99, 0.195); robe.add(eye)
    }

    // arms as pivots
    this.leftArm = new THREE.Group(); this.leftArm.position.set(-0.35, 1.6, 0)
    const lArm = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.08, 0.8, 6), robeMat)
    lArm.position.y = -0.4; this.leftArm.add(lArm)
    const lHand = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 5), skin); lHand.position.y = -0.82; this.leftArm.add(lHand)
    this.leftArm.rotation.z = -0.16; robe.add(this.leftArm)

    this.rightArm = new THREE.Group(); this.rightArm.position.set(0.35, 1.6, 0)
    const rArm = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.08, 0.8, 6), robeMat)
    rArm.position.y = -0.4; this.rightArm.add(rArm)
    const rHand = new THREE.Mesh(new THREE.SphereGeometry(0.075, 6, 5), skin); rHand.position.y = -0.82; this.rightArm.add(rHand)
    this.rightArm.rotation.z = 0.16; robe.add(this.rightArm)

    // wand
    this.wand = new THREE.Group()
    const shaftMat = new THREE.MeshStandardMaterial({ color: '#9a6b3f', roughness: 0.6 })
    this.wandShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.03, 0.95, 6), shaftMat)
    this.wandShaft.rotation.x = Math.PI / 2
    this.wandShaft.position.z = 0.32
    this.wand.add(this.wandShaft)
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.028, 0.2, 6), new THREE.MeshStandardMaterial({ color: '#3a2618', roughness: 0.7 }))
    handle.rotation.x = Math.PI / 2; handle.position.z = -0.12; this.wand.add(handle)
    this.wandTip = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), new THREE.MeshBasicMaterial({ color: '#f2e7d0', toneMapped: false }))
    this.wandTip.position.z = 0.81; this.wand.add(this.wandTip)
    this.wandGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.textures.glow, color: '#f2e7d0', transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false }))
    this.wandGlow.position.z = 0.81; this.wandGlow.scale.setScalar(0.7); this.wand.add(this.wandGlow)
    this.wand.position.set(0.42, 1.18, 0.25)
    this.wand.rotation.x = -0.18
    robe.add(this.wand)

    // cape
    const capeGeo = new THREE.PlaneGeometry(0.8, 1.25, 4, 4)
    this.cape = new THREE.Mesh(capeGeo, new THREE.MeshStandardMaterial({ color: '#211e3e', roughness: 0.95, side: THREE.DoubleSide }))
    this.cape.position.set(0, 1.15, -0.32); this.cape.rotation.x = 0.12
    robe.add(this.cape)

    const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.55, 20), new THREE.MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 0.34, depthWrite: false }))
    shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.02; robe.add(shadow)

    this.player = new THREE.Group()
    this.player.add(robe)
    this.playerBody = robe
    this.player.position.set(0, this.heightAt(0, 16), 16)
    this.player.rotation.y = Math.PI
    this.scene.add(this.player)
    this.robe = robe
    this.playerShadow = shadow
  }

  setWandStyle(wand) {
    if (!wand) return
    const wood = woodById[wand.wood], core = coreById[wand.core]
    if (wood) this.wandShaft.material.color.set(wood.color)
    if (core) {
      this.wandTip.material.color.set(core.color)
      this.wandGlow.material.color.set(core.color)
    }
    this.wandShaft.scale.y = clamp((wand.length || 11) / 11, 0.8, 1.3)
    this.wandTip.position.z = this.wandShaft.scale.y * 0.76
    this.wandGlow.position.z = this.wandTip.position.z
  }

  makeLabel(text, color = '#efe0bc') {
    const c = document.createElement('canvas'); c.width = 512; c.height = 128
    const g = c.getContext('2d')
    g.clearRect(0, 0, 512, 128)
    g.font = '600 40px Cinzel, Georgia, serif'
    g.textAlign = 'center'; g.textBaseline = 'middle'
    g.shadowColor = 'rgba(0,0,0,.95)'; g.shadowBlur = 18
    g.fillStyle = color
    g.fillText(text, 256, 60)
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, opacity: 0.95 }))
    sp.scale.set(4.4, 1.1, 1)
    return sp
  }

  /* ------------------------------------------------------- BARRIER */
  buildBarrier() {
    const group = new THREE.Group(); group.visible = false
    const mat = new THREE.MeshBasicMaterial({ color: '#9a7be0', transparent: true, opacity: 0.06, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
    const wall = new THREE.Mesh(new THREE.CylinderGeometry(9.4, 9.4, 9, 48, 1, true), mat)
    wall.position.y = 4.5; group.add(wall)
    const ringMat = new THREE.MeshBasicMaterial({ color: '#c9a6ff', transparent: true, opacity: 0.6, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
    const ring = new THREE.Mesh(new THREE.RingGeometry(9.2, 9.7, 48), ringMat)
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.25; group.add(ring)
    this.scene.add(group)
    this.arenaBarrier = group
    this.arenaBarrierMat = mat
  }

  setDuelArena(active, center = null) {
    this.arenaBarrier.visible = active
    if (center) this.arenaBarrier.position.set(center.x, center.y, center.z)
    this.movementBounds = active ? { x: center ? center.x : 24, z: center ? center.z : -4, r: 8.9 } : null
  }

  /* ------------------------------------------------------- MOVEMENT */
  setPlayer(x, z, facing = null) {
    this.playerPos.x = x; this.playerPos.z = z
    this.playerPos.y = this.heightAt(x, z)
    this.player.position.set(x, this.playerPos.y, z)
    if (facing !== null) { this.facing = facing; this.player.rotation.y = facing }
    this.velocity.set(0, 0, 0)
    this.camTarget.set(x, this.playerPos.y + 1.55, z)
  }

  rotateCamera(dx, dy) {
    this.cameraYaw -= dx * 0.0045
    this.cameraPitch = clamp(this.cameraPitch + dy * 0.0032, 0.06, 1.05)
  }
  zoomCamera(delta) { this.cameraDist = clamp(this.cameraDist + delta * 0.0035, 4.5, 15) }

  triggerDash(dir) {
    if (this.dashTime > 0) return false
    this.dashTime = 0.2
    this.dashDir.copy(dir).normalize()
    return true
  }

  updateMovement(dt, input) {
    const move = new THREE.Vector3(input.x || 0, 0, input.z || 0)
    const moving = move.lengthSq() > 0.001
    this.moveAmount = lerp(this.moveAmount, moving ? 1 : 0, Math.min(1, dt * 8))
    if (moving) move.normalize()

    if (this.dashTime > 0) {
      this.dashTime -= dt
      this.velocity.copy(this.dashDir).multiplyScalar(19)
    } else if (moving) {
      const speed = 6.3
      this.velocity.lerp(move.clone().multiplyScalar(speed), Math.min(1, dt * 11))
      this.facing = Math.atan2(move.x, move.z)
    } else {
      this.velocity.multiplyScalar(Math.max(0, 1 - dt * 10))
    }

    const nx = this.playerPos.x + this.velocity.x * dt
    const nz = this.playerPos.z + this.velocity.z * dt
    let px = nx, pz = nz
    for (let iter = 0; iter < 2; iter++) {
      for (const c of this.colliders) {
        const dx = px - c.x, dz = pz - c.z
        const d = Math.hypot(dx, dz), min = c.r + 0.42
        if (d < min && d > 0.0001) {
          px = c.x + dx / d * min
          pz = c.z + dz / d * min
        }
      }
    }
    const worldR = Math.hypot(px, pz)
    if (worldR > 96) { px = px / worldR * 96; pz = pz / worldR * 96 }
    if (this.movementBounds) {
      const b = this.movementBounds
      const dx = px - b.x, dz = pz - b.z, d = Math.hypot(dx, dz)
      if (d > b.r - 0.5) { px = b.x + dx / d * (b.r - 0.5); pz = b.z + dz / d * (b.r - 0.5) }
    }
    this.playerPos.x = px; this.playerPos.z = pz
    this.playerPos.y = this.heightAt(px, pz)
    this.player.position.set(px, this.playerPos.y, pz)

    let diff = this.facing - this.player.rotation.y
    while (diff > Math.PI) diff -= Math.PI * 2
    while (diff < -Math.PI) diff += Math.PI * 2
    this.player.rotation.y += diff * Math.min(1, dt * 12)

    // animation
    const t = this.time
    const stride = Math.sin(t * 9) * 0.6 * this.moveAmount
    this.leftArm.rotation.x = stride
    this.rightArm.rotation.x = -stride * 0.6 - (this.castT > 0 ? 1.5 : 0)
    this.leftArm.rotation.z = -0.16
    this.wand.rotation.x = -0.18 - (this.castT > 0 ? 0.35 : 0)
    this.playerBody.position.y = Math.abs(Math.sin(t * 9)) * 0.055 * this.moveAmount + Math.sin(t * 2.1) * 0.012
    this.cape.rotation.x = 0.12 + this.moveAmount * 0.28 + Math.sin(t * 5) * 0.03
    this.cape.rotation.z = Math.sin(t * 3.4) * 0.04
    this.playerShadow.material.opacity = 0.34 - this.playerBody.position.y * 0.5

    if (this.castT > 0) {
      this.castT -= dt
      this.wandGlow.material.opacity = 0.7 + Math.sin(t * 40) * 0.3
      this.wandGlow.scale.setScalar(1.2)
    } else {
      this.wandGlow.material.opacity = 0.42
      this.wandGlow.scale.setScalar(0.62)
    }
  }

  castAnimation(color) {
    this.castT = 0.42
    if (color) this.wandGlow.material.color.set(color)
  }

  shake(amount, duration = 0.25) { this.shakeAmount = Math.max(this.shakeAmount, amount); this.shakeTime = Math.max(this.shakeTime, duration) }

  updateCamera(dt, instant = false) {
    const target = new THREE.Vector3(this.playerPos.x, this.playerPos.y + 1.55, this.playerPos.z)
    this.camTarget.lerp(target, instant ? 1 : Math.min(1, dt * 7))
    const d = this.cameraDist * Math.cos(this.cameraPitch)
    const desired = new THREE.Vector3(
      this.camTarget.x + Math.sin(this.cameraYaw) * d,
      this.camTarget.y + Math.sin(this.cameraPitch) * this.cameraDist + 0.4,
      this.camTarget.z + Math.cos(this.cameraYaw) * d
    )
    // Pull the camera in front of buildings instead of letting their roofs fill the screen.
    let camT = 1
    const ox = this.camTarget.x, oz = this.camTarget.z
    const dx = desired.x - ox, dz = desired.z - oz
    for (const c of this.colliders) {
      if (!c.cameraBlock) continue
      const rad = c.camR
      const fx = ox - c.x, fz = oz - c.z
      const a = dx * dx + dz * dz
      const b = 2 * (fx * dx + fz * dz)
      const cc = fx * fx + fz * fz - rad * rad
      if (a <= 0.0001) continue
      if (cc <= 0) { camT = Math.min(camT, 0.12); continue }
      const disc = b * b - 4 * a * cc
      if (disc < 0) continue
      const hit = (-b - Math.sqrt(disc)) / (2 * a)
      if (hit > 0 && hit < camT) camT = hit
    }
    if (camT < 1) {
      camT = Math.max(0.16, camT * 0.9)
      desired.set(
        this.camTarget.x + dx * camT,
        this.camTarget.y + (desired.y - this.camTarget.y) * Math.max(0.55, camT),
        this.camTarget.z + dz * camT
      )
      const wallY = this.heightAt(desired.x, desired.z) + 1.2
      if (desired.y < wallY) desired.y = wallY
    }
    const minY = this.heightAt(desired.x, desired.z) + 0.7
    if (desired.y < minY) desired.y = minY
    if (instant) this.camera.position.copy(desired)
    else this.camera.position.lerp(desired, Math.min(1, dt * 8))
    if (this.player) this.player.visible = this.camera.position.distanceTo(this.camTarget) > 3.05
    if (this.shakeTime > 0) {
      const s = this.shakeAmount
      this.camera.position.x += (Math.random() - 0.5) * s
      this.camera.position.y += (Math.random() - 0.5) * s
      this.camera.position.z += (Math.random() - 0.5) * s
    }
    this.camera.lookAt(this.camTarget.x, this.camTarget.y + 0.2, this.camTarget.z)
  }

  /* ------------------------------------------------------- NODE VISIBILITY */
  setNodeAvailable(id, visible) {
    const g = this.nodes[id]
    if (g) g.visible = visible
  }

  highlightNode(id) {
    for (const [nid, g] of Object.entries(this.nodes)) {
      if (!g.userData.marker) continue
      g.userData.marker.scale.setScalar(nid === id ? 2.1 : 1.2)
    }
  }

  /* ------------------------------------------------------- UPDATE */
  update(dt) {
    this.time += dt
    const t = this.time
    if (this.shakeTime > 0) {
      this.shakeTime -= dt
      if (this.shakeTime <= 0) this.shakeAmount = 0
    }
    // NPC idle
    for (const [id, data] of Object.entries(this.npcs)) {
      const { group, baseY, def } = data
      group.position.y = baseY + Math.sin(t * 1.3 + (id.length * 0.7)) * 0.035
      const dx = this.playerPos.x - group.position.x, dz = this.playerPos.z - group.position.z
      const dist = Math.hypot(dx, dz)
      if (dist < 7.5 && id !== 'gloomfang') {
        const target = Math.atan2(dx, dz)
        let diff = target - group.rotation.y
        while (diff > Math.PI) diff -= Math.PI * 2
        while (diff < -Math.PI) diff += Math.PI * 2
        group.rotation.y += diff * Math.min(1, dt * 2.4)
      }
      if (id === 'warden') group.rotation.y += dt * 0.12
    }
    // creatures
    if (this.creatures.unicorn) {
      const c = this.creatures.unicorn; c.t += dt
      const a = c.t * 0.14
      c.group.position.x = c.anchor.x + Math.cos(a) * 5.5
      c.group.position.z = c.anchor.z + Math.sin(a) * 4.2
      c.group.position.y = this.heightAt(c.group.position.x, c.group.position.z)
      c.group.rotation.y = -a + Math.PI / 2
      c.group.children.forEach((ch, i) => { if (ch.geometry?.type === 'CylinderGeometry' && ch.position.y < 0.8) ch.position.y = 0.5 + Math.abs(Math.sin(c.t * 4 + i)) * 0.08 })
    }
    if (this.creatures.phoenix) {
      const c = this.creatures.phoenix; c.t += dt
      const a = c.t * 0.5
      c.group.position.x = c.anchor.x + Math.cos(a) * 4.5
      c.group.position.z = c.anchor.z + Math.sin(a) * 3.2
      c.group.position.y = c.anchor.y + 1.6 + Math.sin(c.t * 1.6) * 0.5
      c.group.rotation.y = -a
      for (const wing of c.group.children) if (wing.userData.side) wing.rotation.z = wing.userData.side * (0.35 + Math.sin(c.t * 8) * 0.3)
    }
    if (this.creatures.thestral) {
      const c = this.creatures.thestral; c.t += dt
      c.group.position.y = c.anchor.y + Math.sin(c.t * 0.8) * 0.18
      c.group.rotation.y += Math.sin(c.t * 0.3) * dt * 0.05
    }
    if (this.creatures.whelp) {
      const c = this.creatures.whelp; c.t += dt
      c.group.position.y = c.anchor.y + Math.sin(c.t * 1.7) * 0.3
      c.group.rotation.y += dt * 0.4
    }
    // floating props
    for (const f of this.floating) {
      if (!f.obj) continue
      if (f.spin) f.obj.rotation.y += f.spin * dt
      if (f.sway) f.obj.position.y = f.baseY + Math.sin(t * 1.15 + f.phase) * f.sway
      if (f.sway === 0.004 && f.obj) f.obj.rotation.z = Math.sin(t * 0.6) * 0.004
    }
    // node markers
    for (const g of Object.values(this.nodes)) {
      const mk = g.userData.marker
      if (mk) {
        mk.position.y = mk.userData.baseY + Math.sin(t * 2 + g.position.x) * 0.12
        mk.material.opacity = 0.55 + Math.sin(t * 3 + g.position.z) * 0.2
      }
    }
    // ambient
    if (this.motes) {
      this.motes.rotation.y = t * 0.006
      this.motes.position.y = Math.sin(t * 0.25) * 0.4
      this.firefliesMesh.material.opacity = 0.65 + Math.sin(t * 2.1) * 0.25
      this.firefliesMesh.position.y = Math.sin(t * 0.9) * 0.25
      this.cavernDust.rotation.y = -t * 0.01
      this.spireDust.rotation.y = t * 0.014
    }
    if (this.stars) this.stars.material.opacity = 0.72 + Math.sin(t * 0.5) * 0.15
    if (this.auroras) for (const a of this.auroras) {
      a.plane.material.opacity = a.base + Math.sin(t * 0.22 + a.phase) * 0.05
      a.plane.rotation.z = -0.08 + a.phase * 0.03 + Math.sin(t * 0.08 + a.phase) * 0.02
    }
    if (this.sea) this.sea.position.y = -1.75 + Math.sin(t * 0.4) * 0.025
    if (this.arenaBarrier?.visible) {
      const pulse = 0.045 + Math.sin(t * 3.2) * 0.025
      this.arenaBarrierMat.opacity = pulse
      this.arenaBarrier.rotation.y = t * 0.05
    }
    this.updateCamera(dt)
  }

  render() { this.renderer.render(this.scene, this.camera) }

  onResize() {
    const w = window.innerWidth, h = window.innerHeight
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6))
    this.renderer.setSize(w, h)
  }

  screenPosition(vec3) {
    const v = vec3.clone().project(this.camera)
    return { x: (v.x * 0.5 + 0.5) * window.innerWidth, y: (-v.y * 0.5 + 0.5) * window.innerHeight, behind: v.z > 1 }
  }

  zone() {
    let best = ZONES[0], bestD = Infinity
    for (const z of ZONES) {
      const d = Math.hypot(this.playerPos.x - z.pos[0], this.playerPos.z - z.pos[1])
      if (d < z.radius && d < bestD) { best = z; bestD = d }
    }
    return best
  }
}
