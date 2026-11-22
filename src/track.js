// Procedural track / arena construction and collision helpers.
import * as THREE from 'three'

const tmpV = new THREE.Vector3()

function hash(str) {
  let h = 2166136261 >>> 0
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) }
  return h >>> 0
}
function seeded(seed) {
  let s = seed >>> 0
  return () => {
    s += 0x6D2B79F5
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function gridTexture(c1, c2, cells = 8, size = 256) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')
  g.fillStyle = '#02050a'
  g.fillRect(0, 0, size, size)
  const step = size / cells
  g.lineWidth = 1
  g.strokeStyle = c1 + '22'
  g.shadowBlur = 4
  g.shadowColor = c1
  for (let i = 1; i < cells; i++) {
    g.beginPath(); g.moveTo(i * step, 0); g.lineTo(i * step, size); g.stroke()
    g.beginPath(); g.moveTo(0, i * step); g.lineTo(size, i * step); g.stroke()
  }
  g.lineWidth = 2.5
  g.strokeStyle = c1
  g.shadowBlur = 10
  g.shadowColor = c1
  g.strokeRect(0, 0, size, size)
  g.strokeStyle = c2 + '88'
  g.lineWidth = 1.5
  g.beginPath(); g.moveTo(step * 0.5, 0); g.lineTo(step * 0.5, size); g.stroke()
  g.beginPath(); g.moveTo(0, step * 0.5); g.lineTo(size, step * 0.5); g.stroke()
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

function checkerTexture(a = '#e2e8f0', b = '#0b0f16') {
  const c = document.createElement('canvas')
  c.width = 128; c.height = 128
  const g = c.getContext('2d')
  for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) {
    g.fillStyle = (x + y) % 2 ? a : b
    g.fillRect(x * 32, y * 32, 32, 32)
  }
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function polygonFor(track) {
  const { shape, size } = track
  const rx = size.x, rz = size.z
  if (shape === 'rect') return [[-rx, -rz], [rx, -rz], [rx, rz], [-rx, rz]]
  if (shape === 'diamond') return [[0, -rz], [rx, 0], [0, rz], [-rx, 0]]
  if (shape === 'hex') {
    const pts = []
    for (let i = 0; i < 6; i++) { const a = Math.PI / 6 + i * Math.PI / 3; pts.push([Math.cos(a) * rx, Math.sin(a) * rz]) }
    return pts
  }
  if (shape === 'oct') {
    const pts = []
    for (let i = 0; i < 8; i++) { const a = Math.PI / 8 + i * Math.PI / 4; pts.push([Math.cos(a) * rx, Math.sin(a) * rz]) }
    return pts
  }
  if (shape === 'cross') {
    const a = rx * 0.42, b = rx
    return [[-a, -b], [a, -b], [a, -a], [b, -a], [b, a], [a, a], [a, b], [-a, b], [-a, a], [-b, a], [-b, -a], [-a, -a]]
  }
  // circle
  const pts = []
  const n = 40
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; pts.push([Math.cos(a) * rx, Math.sin(a) * rz]) }
  return pts
}

function insidePoly(x, z, poly) {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], zi = poly[i][1], xj = poly[j][0], zj = poly[j][1]
    if ((zi > z) !== (zj > z) && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside
  }
  return inside
}

function distToSegment(px, pz, ax, az, bx, bz) {
  const dx = bx - ax, dz = bz - az
  const l2 = dx * dx + dz * dz
  let t = l2 ? ((px - ax) * dx + (pz - az) * dz) / l2 : 0
  t = Math.max(0, Math.min(1, t))
  const x = ax + dx * t, z = az + dz * t
  return Math.hypot(px - x, pz - z)
}

function makeSky(scene, pal, density = 0.0038) {
  scene.background = new THREE.Color(pal.sky)
  scene.fog = new THREE.FogExp2(pal.fog, density)
  const geo = new THREE.SphereGeometry(700, 24, 16)
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: {
      top: { value: new THREE.Color(pal.sky) },
      bottom: { value: new THREE.Color(pal.haze) },
      accent: { value: new THREE.Color(pal.accent) },
    },
    vertexShader: `varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      varying vec3 vP; uniform vec3 top; uniform vec3 bottom; uniform vec3 accent;
      void main(){
        float h = clamp(vP.y / 700.0 * 1.6 + 0.35, 0.0, 1.0);
        vec3 col = mix(bottom, top, h);
        float band = smoothstep(0.18, 0.0, abs(h - 0.2));
        col += accent * band * 0.08;
        gl_FragColor = vec4(col, 1.0);
      }`,
  })
  const sky = new THREE.Mesh(geo, mat)
  scene.add(sky)
  return sky
}

function makeStars(scene, pal, count = 900) {
  const pos = new Float32Array(count * 3)
  const rnd = seeded(1337)
  for (let i = 0; i < count; i++) {
    const a = rnd() * Math.PI * 2, e = rnd() * Math.PI * 0.45 + 0.05
    const r = 520
    pos[i * 3] = Math.cos(a) * Math.cos(e) * r
    pos[i * 3 + 1] = Math.sin(e) * r
    pos[i * 3 + 2] = Math.sin(a) * Math.cos(e) * r
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const m = new THREE.PointsMaterial({ color: pal.accent2, size: 1.6, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false })
  const pts = new THREE.Points(g, m)
  scene.add(pts)
  return pts
}

function neonBox(w, h, d, color, opacity = 1) {
  return new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 2.2, metalness: 0.4, roughness: 0.4, transparent: opacity < 1, opacity })
  )
}

export class Track {
  constructor(scene, data, quality = 'medium') {
    this.scene = scene
    this.data = data
    this.pal = data.palette
    this.quality = quality
    this.type = data.type
    this.group = new THREE.Group()
    this.group.name = 'track'
    scene.add(this.group)
    this.hazards = []
    this.obstacles = []
    this.boostPads = []
    this.disposables = []
    this.shrinkScale = 1
    this.time = 0
    this.rnd = seeded(hash(data.id))
    this.enclosed = !!data.enclosed
    this.animated = []

    makeSky(scene, this.pal, data.type === 'circuit' ? 0.0028 : 0.0042)
    if (['space', 'dark', 'void', 'zero'].includes(data.theme)) makeStars(scene, this.pal)

    this.addLights()
    if (this.type === 'circuit') this.buildCircuit()
    else this.buildArena()
    this.addBoostPads()
    this.buildEnvironment()
  }

  addLights() {
    const hemi = new THREE.HemisphereLight(this.pal.accent2, this.pal.ground, 1.1)
    this.scene.add(hemi)
    this.lights = [hemi]
    const dir = new THREE.DirectionalLight(0xffffff, 1.5)
    dir.position.set(-80, 140, 60)
    this.scene.add(dir)
    this.lights.push(dir)
    const p1 = new THREE.PointLight(this.pal.accent, 90, 220, 1.8)
    p1.position.set(0, 28, 0)
    this.scene.add(p1)
    this.lights.push(p1)
    if (this.type === 'arena') {
      const p2 = new THREE.PointLight(this.pal.accent2, 70, 200, 1.8)
      p2.position.set(0, 14, -this.data.size.z * 0.7)
      this.scene.add(p2)
      this.lights.push(p2)
    }
  }

  // -------------------------------------------------------------------------
  // Arena
  // -------------------------------------------------------------------------
  buildArena() {
    const poly = polygonFor(this.data)
    this.poly = poly
    const shape = new THREE.Shape()
    shape.moveTo(poly[0][0], poly[0][1])
    for (let i = 1; i < poly.length; i++) shape.lineTo(poly[i][0], poly[i][1])
    shape.closePath()
    const floorGeo = new THREE.ShapeGeometry(shape, 8)
    floorGeo.rotateX(-Math.PI / 2)
    const tex = gridTexture(this.pal.grid, this.pal.grid2, 8, 256)
    tex.repeat.set(1 / 12, 1 / 12)
    const floorMat = new THREE.MeshStandardMaterial({
      color: this.pal.ground, map: tex, emissive: this.pal.grid, emissiveMap: tex,
      emissiveIntensity: 0.55, metalness: 0.72, roughness: 0.36,
    })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.position.y = 0
    this.group.add(floor)
    this.floor = floor

    // subtle outer glow disc
    const glow = new THREE.Mesh(
      new THREE.CircleGeometry(Math.max(this.data.size.x, this.data.size.z) * 1.5, 48),
      new THREE.MeshBasicMaterial({ color: this.pal.accent, transparent: true, opacity: 0.025, blending: THREE.AdditiveBlending, depthWrite: false })
    )
    glow.rotation.x = -Math.PI / 2
    glow.position.y = -0.05
    this.group.add(glow)

    // boundary walls
    const wallGroup = new THREE.Group()
    this.wallGroup = wallGroup
    this.group.add(wallGroup)
    const h = 3.2
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length]
      const dx = b[0] - a[0], dz = b[1] - a[1]
      const len = Math.hypot(dx, dz)
      const ang = Math.atan2(dx, dz)
      const wall = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, h, len),
        new THREE.MeshStandardMaterial({ color: this.pal.ground, metalness: 0.8, roughness: 0.35, emissive: this.pal.accent, emissiveIntensity: 0.12 })
      )
      wall.position.set((a[0] + b[0]) / 2, h / 2, (a[1] + b[1]) / 2)
      wall.rotation.y = ang
      wallGroup.add(wall)
      const line = neonBox(0.08, 0.08, len, this.pal.accent)
      line.position.set((a[0] + b[0]) / 2, h + 0.02, (a[1] + b[1]) / 2)
      line.rotation.y = ang
      wallGroup.add(line)
      const base = neonBox(0.1, 0.04, len, this.pal.accent2)
      base.position.set((a[0] + b[0]) / 2, 0.04, (a[1] + b[1]) / 2)
      base.rotation.y = ang
      wallGroup.add(base)
    }

    // shrink ring (hidden unless shrinking)
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.09, 6, 64),
      new THREE.MeshBasicMaterial({ color: '#ff3d81', transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending })
    )
    ring.rotation.x = Math.PI / 2
    ring.position.y = 0.15
    ring.visible = false
    this.shrinkRing = ring
    this.group.add(ring)

    // obstacles
    for (const o of this.data.obstacles || []) this.addObstacle(o)
    // hazards
    for (const hz of this.data.hazards || []) this.addHazard(hz)

    // boost pads scattered inside the arena
    const rp = Math.min(this.data.size.x, this.data.size.z) * 0.42
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4
      this.boostPads.push({ x: Math.cos(a) * rp, z: Math.sin(a) * rp, heading: a + Math.PI / 2, r: 2.6 })
    }
  }

  addObstacle(o) {
    const mat = new THREE.MeshStandardMaterial({
      color: this.pal.ground, metalness: 0.85, roughness: 0.3,
      emissive: this.pal.accent2, emissiveIntensity: 0.18,
    })
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(o.w, o.h, o.d), mat)
    mesh.position.set(o.x, o.h / 2, o.z)
    this.group.add(mesh)
    const trim = neonBox(o.w + 0.1, 0.08, o.d + 0.1, this.pal.accent2)
    trim.position.set(o.x, o.h + 0.02, o.z)
    this.group.add(trim)
    const base = neonBox(o.w + 0.2, 0.05, o.d + 0.2, this.pal.accent)
    base.position.set(o.x, 0.04, o.z)
    this.group.add(base)
    this.obstacles.push({ x: o.x, z: o.z, w: o.w, d: o.d, h: o.h, mesh })
  }

  addHazard(hz) {
    const colors = { heat: '#ff4d00', ice: '#67e8f9', glitch: '#d946ef', void: '#7c3aed' }
    const color = colors[hz.type] || '#ff3d81'
    const g = new THREE.Group()
    g.position.set(hz.x, 0, hz.z)
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(hz.r, 32),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.14, blending: THREE.AdditiveBlending, depthWrite: false })
    )
    disc.rotation.x = -Math.PI / 2
    disc.position.y = 0.03
    g.add(disc)
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(hz.r, 0.1, 6, 48),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending })
    )
    ring.rotation.x = Math.PI / 2
    ring.position.y = 0.06
    g.add(ring)
    for (let i = 0; i < 6; i++) {
      const bar = neonBox(0.05, 0.05, hz.r * 1.3, color, 0.6)
      bar.position.y = 0.08
      bar.rotation.y = i / 6 * Math.PI
      g.add(bar)
    }
    this.group.add(g)
    this.hazards.push({ ...hz, mesh: g, disc, ring, phase: this.rnd() * 10, active: true })
  }

  // -------------------------------------------------------------------------
  // Circuit
  // -------------------------------------------------------------------------
  buildCircuit() {
    const pts = this.data.points.map(p => new THREE.Vector3(p[0], 0, p[1]))
    const curve = new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.5)
    this.curve = curve
    const samples = this.quality === 'low' ? 320 : 520
    this.samples = curve.getSpacedPoints(samples)
    this.sampleCount = this.samples.length
    this.width = this.data.width || 18
    this.roadHalf = this.width / 2
    const width = this.width

    // road ribbon
    const verts = [], uvs = [], indices = []
    const N = this.samples.length
    for (let i = 0; i < N; i++) {
      const p = this.samples[i]
      const prev = this.samples[(i - 1 + N) % N]
      const next = this.samples[(i + 1) % N]
      const tx = next.x - prev.x, tz = next.z - prev.z
      const tl = Math.hypot(tx, tz) || 1
      const nx = -tz / tl, nz = tx / tl
      verts.push(p.x + nx * width / 2, 0, p.z + nz * width / 2)
      verts.push(p.x - nx * width / 2, 0, p.z - nz * width / 2)
      uvs.push(0, i / 6, 1, i / 6)
      if (i < N - 1) {
        const a = i * 2, b = i * 2 + 1, c = (i + 1) * 2, d = (i + 1) * 2 + 1
        indices.push(a, c, b, b, c, d)
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
    geo.setIndex(indices)
    geo.computeVertexNormals()
    const roadTex = gridTexture(this.pal.grid, this.pal.grid2, 6, 256)
    roadTex.repeat.set(2, 1)
    this.roadTex = roadTex
    const roadMat = new THREE.MeshStandardMaterial({
      color: this.pal.ground, map: roadTex, emissive: this.pal.grid, emissiveMap: roadTex,
      emissiveIntensity: 0.5, metalness: 0.8, roughness: 0.34,
    })
    const road = new THREE.Mesh(geo, roadMat)
    road.position.y = 0.01
    this.group.add(road)
    this.road = road

    // side neon rails + walls
    for (const side of [-1, 1]) {
      const linePoints = []
      for (let i = 0; i < N; i++) {
        const p = this.samples[i]
        const prev = this.samples[(i - 1 + N) % N], next = this.samples[(i + 1) % N]
        const tx = next.x - prev.x, tz = next.z - prev.z, tl = Math.hypot(tx, tz) || 1
        linePoints.push(new THREE.Vector3(p.x - tz / tl * side * (width / 2 + 0.35), 0.08, p.z + tx / tl * side * (width / 2 + 0.35)))
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints)
      const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: side > 0 ? this.pal.accent : this.pal.accent2 }))
      this.group.add(line)

      // wall ribbons
      const wg = new THREE.BufferGeometry()
      const wv = [], wi = []
      for (let i = 0; i < N; i++) {
        const p = this.samples[i]
        const prev = this.samples[(i - 1 + N) % N], next = this.samples[(i + 1) % N]
        const tx = next.x - prev.x, tz = next.z - prev.z, tl = Math.hypot(tx, tz) || 1
        const nx = -tz / tl, nz = tx / tl
        const x = p.x + nx * side * (width / 2 + 0.55)
        const z = p.z + nz * side * (width / 2 + 0.55)
        wv.push(x, 0, z, x, 2.6, z)
        if (i < N - 1) {
          const a = i * 2, b = i * 2 + 1, c = (i + 1) * 2, d = (i + 1) * 2 + 1
          wi.push(a, c, b, b, c, d)
        }
      }
      wg.setAttribute('position', new THREE.Float32BufferAttribute(wv, 3))
      wg.setIndex(wi)
      wg.computeVertexNormals()
      const wall = new THREE.Mesh(wg, new THREE.MeshStandardMaterial({
        color: this.pal.ground, metalness: 0.7, roughness: 0.5, transparent: true, opacity: 0.55,
        emissive: side > 0 ? this.pal.accent : this.pal.accent2, emissiveIntensity: 0.15, side: THREE.DoubleSide,
      }))
      this.group.add(wall)
    }

    // start line
    const startP = this.samples[0]
    const startNext = this.samples[3]
    const startHeading = Math.atan2(startNext.x - startP.x, startNext.z - startP.z)
    const lineTex = checkerTexture(this.pal.accent2, '#05070d')
    lineTex.repeat.set(width / 2, 1)
    const startLine = new THREE.Mesh(
      new THREE.PlaneGeometry(width, 2.4),
      new THREE.MeshBasicMaterial({ map: lineTex, transparent: true, opacity: 0.9 })
    )
    startLine.rotation.x = -Math.PI / 2
    startLine.rotation.z = -startHeading
    startLine.position.set(startP.x, 0.06, startP.z)
    this.group.add(startLine)

    // start gate arch
    this.addArch(startP.x, startP.z, startHeading, width + 6, this.pal.accent2, true)

    // checkpoint gates
    this.gates = []
    const gateCount = 5
    for (let i = 1; i <= gateCount; i++) {
      const idx = Math.floor((i / (gateCount + 1)) * N)
      const p = this.samples[idx], n = this.samples[(idx + 2) % N]
      const heading = Math.atan2(n.x - p.x, n.z - p.z)
      this.addArch(p.x, p.z, heading, width + 5, this.pal.accent)
      this.gates.push({ x: p.x, z: p.z, heading })
    }

    // boost pads
    const padTs = [0.12, 0.36, 0.61, 0.86]
    padTs.forEach((t, i) => {
      const idx = Math.floor(t * N)
      const p = this.samples[idx], n = this.samples[(idx + 3) % N]
      const heading = Math.atan2(n.x - p.x, n.z - p.z)
      const nx = Math.cos(heading), nz = -Math.sin(heading)
      const off = (i % 2 ? 1 : -1) * width * 0.2
      this.boostPads.push({ x: p.x + nx * off, z: p.z + nz * off, heading, r: 2.6 })
    })

    // environmental hazards on the circuit
    for (const hz of this.data.hazards || []) this.addHazard(hz)

    // off-road fill plane (large dark ground)
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(1400, 1400),
      new THREE.MeshStandardMaterial({ color: this.pal.sky, metalness: 0.4, roughness: 0.85 })
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.12
    this.group.add(ground)

    // center line dashes
    for (let i = 0; i < N; i += 12) {
      const p = this.samples[i], n = this.samples[(i + 6) % N]
      const heading = Math.atan2(n.x - p.x, n.z - p.z)
      const dash = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 2.2), new THREE.MeshBasicMaterial({ color: this.pal.accent2, transparent: true, opacity: 0.55 }))
      dash.rotation.x = -Math.PI / 2; dash.rotation.z = -heading
      dash.position.set(p.x, 0.05, p.z)
      this.group.add(dash)
    }
  }

  addArch(x, z, heading, span, color, start = false) {
    const g = new THREE.Group()
    g.position.set(x, 0, z)
    g.rotation.y = heading
    const mat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 2.4, metalness: 0.5, roughness: 0.4 })
    const postGeo = new THREE.BoxGeometry(0.4, 6.5, 0.4)
    for (const sx of [-1, 1]) {
      const post = new THREE.Mesh(postGeo, mat)
      post.position.set(sx * span / 2, 3.25, 0)
      g.add(post)
    }
    const top = new THREE.Mesh(new THREE.BoxGeometry(span, 0.4, 0.4), mat)
    top.position.y = 6.5
    g.add(top)
    if (start) {
      const sign = new THREE.Mesh(new THREE.PlaneGeometry(span * 0.7, 1.2), new THREE.MeshBasicMaterial({
        map: this.makeTextTexture('NEON OVERDRIVE', color), transparent: true, side: THREE.DoubleSide,
      }))
      sign.position.set(0, 7.4, 0)
      g.add(sign)
    }
    this.group.add(g)
    return g
  }

  makeTextTexture(text, color) {
    const c = document.createElement('canvas')
    c.width = 512; c.height = 128
    const g = c.getContext('2d')
    g.fillStyle = 'rgba(2,6,14,0.75)'; g.fillRect(0, 0, 512, 128)
    g.strokeStyle = color; g.lineWidth = 5; g.shadowColor = color; g.shadowBlur = 16
    g.strokeRect(6, 6, 500, 116)
    g.fillStyle = color; g.font = 'bold 54px monospace'; g.textAlign = 'center'; g.textBaseline = 'middle'
    g.fillText(text, 256, 66)
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }

  // -------------------------------------------------------------------------
  // Shared environment decoration
  // -------------------------------------------------------------------------
  buildEnvironment() {
    const theme = this.data.theme
    const rnd = this.rnd
    const pal = this.pal
    const isCircuit = this.type === 'circuit'
    const extent = isCircuit ? 300 : Math.max(this.data.size.x, this.data.size.z) + 90
    const minR = isCircuit ? 0 : Math.max(this.data.size.x, this.data.size.z) * 1.15

    const addTower = (x, z, w, h, d, color) => {
      const mat = new THREE.MeshStandardMaterial({
        color: pal.ground, metalness: 0.85, roughness: 0.35,
        emissive: color, emissiveIntensity: 0.08,
      })
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
      m.position.set(x, h / 2, z)
      this.group.add(m)
      for (let y = 4; y < h; y += 8) {
        const line = new THREE.Mesh(new THREE.BoxGeometry(w + 0.3, 0.15, d + 0.3), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.65 }))
        line.position.set(x, y, z)
        this.group.add(line)
      }
      const top = new THREE.Mesh(new THREE.BoxGeometry(w * 0.4, 0.4, d * 0.4), new THREE.MeshBasicMaterial({ color }))
      top.position.set(x, h + 0.2, z)
      this.group.add(top)
    }

    if (['city', 'quantum', 'team', 'neon', 'highway', 'solar', 'tunnel'].includes(theme)) {
      const count = isCircuit ? 60 : 26
      for (let i = 0; i < count; i++) {
        const a = rnd() * Math.PI * 2
        const r = minR + (isCircuit ? 70 + rnd() * 200 : 55 + rnd() * 130)
        const w = 6 + rnd() * 16, h = 12 + rnd() * 65, d = 6 + rnd() * 16
        addTower(Math.cos(a) * r, Math.sin(a) * r, w, h, d, rnd() > 0.5 ? pal.accent : pal.accent2)
      }
      if (isCircuit) {
        // pylons along road
        const N = this.samples.length
        for (let i = 0; i < 24; i++) {
          const idx = Math.floor(i / 24 * N)
          const p = this.samples[idx], n = this.samples[(idx + 3) % N]
          const heading = Math.atan2(n.x - p.x, n.z - p.z)
          const side = i % 2 ? 1 : -1
          const off = this.width / 2 + 9
          const x = p.x + Math.cos(heading) * off * side
          const z = p.z - Math.sin(heading) * off * side
          const pylon = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.5, 9, 6), new THREE.MeshStandardMaterial({ color: pal.ground, metalness: 0.8, roughness: 0.4 }))
          pylon.position.set(x, 4.5, z)
          this.group.add(pylon)
          const light = neonBox(0.25, 0.25, 0.25, pal.accent)
          light.position.set(x, 9.1, z)
          this.group.add(light)
        }
      }
    }

    if (theme === 'forest') {
      for (let i = 0; i < 60; i++) {
        const a = rnd() * Math.PI * 2
        const r = minR + rnd() * 90
        const x = Math.cos(a) * r, z = Math.sin(a) * r
        const h = 8 + rnd() * 18
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.9, h, 6), new THREE.MeshStandardMaterial({ color: pal.ground, metalness: 0.5, roughness: 0.7, emissive: pal.accent, emissiveIntensity: 0.08 }))
        trunk.position.set(x, h / 2, z)
        this.group.add(trunk)
        for (let j = 0; j < 3; j++) {
          const cone = new THREE.Mesh(new THREE.ConeGeometry(4 - j, 5, 6), new THREE.MeshStandardMaterial({ color: pal.accent, emissive: pal.accent, emissiveIntensity: 0.35, transparent: true, opacity: 0.55, wireframe: j === 2 }))
          cone.position.set(x, h + j * 3, z)
          this.group.add(cone)
        }
      }
    } else if (theme === 'lava') {
      const lava = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), new THREE.MeshBasicMaterial({ color: '#ff4d00', transparent: true, opacity: 0.14 }))
      lava.rotation.x = -Math.PI / 2; lava.position.y = -0.4
      this.group.add(lava)
      for (let i = 0; i < 40; i++) {
        const a = rnd() * Math.PI * 2, r = minR + rnd() * 120
        const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(2 + rnd() * 8), new THREE.MeshStandardMaterial({ color: '#1a0603', emissive: '#ff4d00', emissiveIntensity: 0.25, roughness: 0.9 }))
        rock.position.set(Math.cos(a) * r, 1, Math.sin(a) * r)
        rock.rotation.set(rnd() * 3, rnd() * 3, rnd() * 3)
        this.group.add(rock)
      }
    } else if (theme === 'ice') {
      for (let i = 0; i < 50; i++) {
        const a = rnd() * Math.PI * 2, r = minR + rnd() * 100
        const crystal = new THREE.Mesh(new THREE.ConeGeometry(1.5 + rnd() * 3, 6 + rnd() * 20, 5), new THREE.MeshStandardMaterial({ color: '#0e2a3d', emissive: '#67e8f9', emissiveIntensity: 0.3, metalness: 0.6, roughness: 0.2, transparent: true, opacity: 0.8 }))
        crystal.position.set(Math.cos(a) * r, 5, Math.sin(a) * r)
        crystal.rotation.z = (rnd() - 0.5) * 0.4
        this.group.add(crystal)
      }
    } else if (theme === 'space') {
      const planet = new THREE.Mesh(new THREE.SphereGeometry(90, 24, 16), new THREE.MeshStandardMaterial({ color: '#0b1a33', emissive: '#0e4a66', emissiveIntensity: 0.25, roughness: 0.8 }))
      planet.position.set(-220, 130, -260)
      this.group.add(planet)
      const ring = new THREE.Mesh(new THREE.TorusGeometry(140, 2, 6, 64), new THREE.MeshBasicMaterial({ color: '#22d3ee', transparent: true, opacity: 0.4 }))
      ring.position.copy(planet.position); ring.rotation.x = 1.1
      this.group.add(ring)
    } else if (theme === 'void') {
      for (let i = 0; i < 24; i++) {
        const a = rnd() * Math.PI * 2, r = minR + 40 + rnd() * 130
        const plat = new THREE.Mesh(new THREE.BoxGeometry(10 + rnd() * 20, 1.5, 10 + rnd() * 20), new THREE.MeshStandardMaterial({ color: pal.ground, metalness: 0.7, roughness: 0.4, emissive: pal.accent, emissiveIntensity: 0.15 }))
        plat.position.set(Math.cos(a) * r, -5 + rnd() * 30, Math.sin(a) * r)
        plat.rotation.y = rnd() * 3
        this.group.add(plat)
        const edge = neonBox(plat.geometry.parameters.width, 0.08, plat.geometry.parameters.depth, pal.accent)
        edge.position.copy(plat.position); edge.position.y += 0.8; edge.rotation.y = plat.rotation.y
        this.group.add(edge)
      }
    } else if (theme === 'desert') {
      for (let i = 0; i < 36; i++) {
        const a = rnd() * Math.PI * 2, r = minR + rnd() * 150
        const dune = new THREE.Mesh(new THREE.SphereGeometry(8 + rnd() * 20, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: '#241305', emissive: '#f59e0b', emissiveIntensity: 0.08, roughness: 0.95 }))
        dune.position.set(Math.cos(a) * r, -1, Math.sin(a) * r)
        dune.scale.y = 0.4
        this.group.add(dune)
      }
    } else if (theme === 'underground' || theme === 'ruin') {
      for (let i = 0; i < 30; i++) {
        const a = rnd() * Math.PI * 2, r = minR + 40 + rnd() * 110
        const h = 10 + rnd() * 45
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(2 + rnd() * 4, 3 + rnd() * 5, h, 6), new THREE.MeshStandardMaterial({ color: pal.ground, metalness: 0.7, roughness: 0.6, emissive: pal.accent, emissiveIntensity: 0.06 }))
        pillar.position.set(Math.cos(a) * r, h / 2 - 2, Math.sin(a) * r)
        this.group.add(pillar)
        const stripe = neonBox(0.15, 0.15, 8, pal.accent)
        stripe.position.set(Math.cos(a) * r, h * 0.6, Math.sin(a) * r)
        stripe.rotation.y = rnd() * 3
        this.group.add(stripe)
      }
    }

    // floating dust / data motes
    const moteCount = this.quality === 'low' ? 120 : 320
    const pos = new Float32Array(moteCount * 3)
    for (let i = 0; i < moteCount; i++) {
      pos[i * 3] = (rnd() - 0.5) * extent * 2
      pos[i * 3 + 1] = rnd() * 40 + 1
      pos[i * 3 + 2] = (rnd() - 0.5) * extent * 2
    }
    const pg = new THREE.BufferGeometry()
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    this.motes = new THREE.Points(pg, new THREE.PointsMaterial({
      color: pal.accent, size: 0.35, transparent: true, opacity: 0.55,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }))
    this.group.add(this.motes)

    if (this.enclosed) {
      const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400), new THREE.MeshBasicMaterial({ color: pal.sky, side: THREE.DoubleSide }))
      ceiling.rotation.x = Math.PI / 2
      ceiling.position.y = 34
      this.group.add(ceiling)
      for (let i = 0; i < 30; i++) {
        const a = rnd() * Math.PI * 2, r = minR + rnd() * 120
        const ring = new THREE.Mesh(new THREE.TorusGeometry(4 + rnd() * 8, 0.3, 6, 24), new THREE.MeshBasicMaterial({ color: pal.accent, transparent: true, opacity: 0.35 }))
        ring.position.set(Math.cos(a) * r, 20 + rnd() * 12, Math.sin(a) * r)
        ring.rotation.x = Math.PI / 2
        this.group.add(ring)
      }
    }
  }

  addBoostPads() {
    for (const p of this.boostPads) {
      const g = new THREE.Group()
      g.position.set(p.x, 0.08, p.z)
      g.rotation.y = p.heading
      const mat = new THREE.MeshBasicMaterial({ color: this.pal.accent2, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })
      for (let i = 0; i < 3; i++) {
        const chev = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 0.6), mat)
        chev.rotation.x = -Math.PI / 2
        chev.position.z = i * 1.3 - 1.2
        g.add(chev)
      }
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.06, 5, 24), mat)
      ring.rotation.x = Math.PI / 2
      g.add(ring)
      this.group.add(g)
      p.mesh = g
    }
  }

  // -------------------------------------------------------------------------
  // Queries
  // -------------------------------------------------------------------------
  inside(x, z, scale = this.shrinkScale) {
    if (this.type === 'circuit') {
      const q = this.closest(x, z)
      return q.dist < this.roadHalf - 0.7
    }
    if (scale >= 0.999) return insidePoly(x, z, this.poly)
    return insidePoly(x / scale, z / scale, this.poly)
  }

  closest(x, z) {
    if (this.type !== 'circuit') return { dist: 0, t: 0, index: 0, x, z }
    let best = Infinity, bi = 0
    const S = this.samples
    for (let i = 0; i < S.length; i += 2) {
      const p = S[i]
      const d = (p.x - x) * (p.x - x) + (p.z - z) * (p.z - z)
      if (d < best) { best = d; bi = i }
    }
    // refine neighbours
    for (let i = Math.max(0, bi - 3); i < Math.min(S.length, bi + 4); i++) {
      const p = S[i]
      const d = (p.x - x) * (p.x - x) + (p.z - z) * (p.z - z)
      if (d < best) { best = d; bi = i }
    }
    const p = S[bi], n = S[(bi + 1) % S.length]
    return { dist: Math.sqrt(best), t: bi / S.length, index: bi, x: p.x, z: p.z, tangent: Math.atan2(n.x - p.x, n.z - p.z) }
  }

  wallDistance(x, z) {
    if (this.type === 'circuit') return this.roadHalf - this.closest(x, z).dist
    // approximate arena wall distance via polygon edges
    let best = Infinity
    const scale = this.shrinkScale
    for (let i = 0; i < this.poly.length; i++) {
      const a = this.poly[i], b = this.poly[(i + 1) % this.poly.length]
      best = Math.min(best, distToSegment(x, z, a[0] * scale, a[1] * scale, b[0] * scale, b[1] * scale))
    }
    return best
  }

  hitObstacle(x, z, radius = 0.7) {
    for (const o of this.obstacles) {
      const hw = o.w / 2 + radius, hd = o.d / 2 + radius
      if (Math.abs(x - o.x) < hw && Math.abs(z - o.z) < hd) return o
    }
    return null
  }

  hazardAt(x, z) {
    for (const h of this.hazards) {
      if (!h.active) continue
      if (Math.hypot(x - h.x, z - h.z) < h.r) return h
    }
    return null
  }

  boostPadAt(x, z) {
    for (const p of this.boostPads) {
      if (Math.hypot(x - p.x, z - p.z) < p.r) return p
    }
    return null
  }

  getStartPositions(count) {
    const out = []
    if (this.type === 'circuit') {
      const N = this.samples.length
      const base = 12
      for (let i = 0; i < count; i++) {
        const row = Math.floor(i / 2)
        const col = i % 2
        const idx = (base + row * 7) % N
        const p = this.samples[idx]
        const n = this.samples[(idx + 2) % N]
        const heading = Math.atan2(n.x - p.x, n.z - p.z)
        const nx = Math.cos(heading), nz = -Math.sin(heading)
        const off = (col === 0 ? -1 : 1) * (this.width * 0.18)
        out.push({ x: p.x + nx * off, z: p.z + nz * off, heading, t: idx / N })
      }
      return out
    }
    const r = Math.min(this.data.size.x, this.data.size.z) * 0.62
    for (let i = 0; i < count; i++) {
      const a = Math.PI / 2 + (i / Math.max(1, count)) * Math.PI * 2
      const x = Math.cos(a) * r, z = Math.sin(a) * r
      const heading = a + Math.PI / 2
      out.push({ x, z, heading, t: 0 })
    }
    return out
  }

  getMinimap() {
    if (this.type === 'circuit') {
      return { type: 'circuit', points: this.samples.filter((_, i) => i % 8 === 0).map(p => [p.x, p.z]), width: this.width }
    }
    return { type: 'arena', points: this.poly, size: this.data.size, shape: this.data.shape }
  }

  setShrink(scale) {
    this.shrinkScale = Math.max(0.45, Math.min(1, scale))
    if (this.wallGroup) this.wallGroup.scale.set(this.shrinkScale, 1, this.shrinkScale)
    if (this.shrinkRing) {
      this.shrinkRing.visible = this.shrinkScale < 0.995
      const r = Math.max(this.data.size.x, this.data.size.z) * this.shrinkScale
      this.shrinkRing.scale.set(r, r, r)
      this.shrinkRing.rotation.z = this.time * 0.3
    }
  }

  update(dt) {
    this.time += dt
    const t = this.time
    for (const h of this.hazards) {
      if (h.period > 0) {
        const cycle = (t + h.phase) % h.period
        h.active = cycle < h.period * 0.55
        const pulse = 0.35 + Math.sin(t * 4 + h.phase) * 0.15 + (h.active ? 0.35 : 0)
        h.disc.material.opacity = h.active ? 0.2 + Math.sin(t * 6) * 0.08 : 0.05
        h.ring.material.opacity = h.active ? 0.9 : 0.25
        h.mesh.scale.setScalar(1 + (h.active ? Math.sin(t * 3 + h.phase) * 0.02 : 0))
      }
    }
    for (const p of this.boostPads) {
      if (p.mesh) p.mesh.children.forEach((c, i) => {
        if (c.material) c.material.opacity = 0.55 + Math.sin(t * 6 - i) * 0.35
      })
    }
    if (this.motes) this.motes.rotation.y += dt * 0.01
    if (this.roadTex) this.roadTex.offset.y -= dt * 0.02
  }

  dispose() {
    this.scene.remove(this.group)
    this.group.traverse(o => {
      if (o.geometry) o.geometry.dispose()
      if (o.material) {
        if (Array.isArray(o.material)) o.material.forEach(m => { if (m.map) m.map.dispose(); m.dispose() })
        else { if (o.material.map) o.material.map.dispose(); o.material.dispose() }
      }
    })
    for (const l of this.lights || []) this.scene.remove(l)
  }
}

export { polygonFor, insidePoly, distToSegment }
