/* ============================================================
   WANDLORE — props.js
   Shared construction helpers, Hollowmere village, Arcanum
   Academy and the dueling arena.
   ============================================================ */
import * as THREE from 'three'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

export function glowTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grd.addColorStop(0, 'rgba(255,255,255,1)')
  grd.addColorStop(0.22, 'rgba(255,255,255,.72)')
  grd.addColorStop(0.55, 'rgba(255,255,255,.18)')
  grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd; g.fillRect(0, 0, 128, 128)
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace
  return t
}

export function signTexture(lines, { bg = '#1b1128', fg = '#e6c987', sub = '#b9a77f' } = {}) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 256
  const g = c.getContext('2d')
  g.fillStyle = bg; g.fillRect(0, 0, 512, 256)
  g.strokeStyle = fg; g.lineWidth = 4; g.strokeRect(12, 12, 488, 232)
  g.strokeStyle = 'rgba(230,201,135,.35)'; g.lineWidth = 1; g.strokeRect(22, 22, 468, 212)
  g.textAlign = 'center'; g.textBaseline = 'middle'
  g.fillStyle = fg
  g.font = '600 38px Cinzel, Georgia, serif'
  g.fillText(lines[0] || '', 256, 100)
  if (lines[1]) {
    g.font = 'italic 400 26px "Cormorant Garamond", Georgia, serif'
    g.fillStyle = sub
    g.fillText(lines[1], 256, 152)
  }
  g.font = '400 16px Cinzel, Georgia, serif'
  g.fillStyle = 'rgba(230,201,135,.5)'
  g.fillText('✦', 256, 200)
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace
  return t
}

export function std(color, opts = {}) {
  return new THREE.MeshStandardMaterial({ color: new THREE.Color(color), roughness: opts.rough ?? 0.88, metalness: opts.metal ?? 0.02, emissive: new THREE.Color(opts.emissive || '#000000'), emissiveIntensity: opts.ei ?? 1, transparent: !!opts.transparent, opacity: opts.opacity ?? 1, flatShading: opts.flat ?? true, side: opts.side || THREE.FrontSide })
}

export function glowMat(color, opacity = 0.9) {
  return new THREE.MeshBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, side: THREE.DoubleSide })
}

export function addGlow(world, parent, color, size, x = 0, y = 0, z = 0, opacity = 0.85) {
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: world.textures.glow, color: new THREE.Color(color), transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false }))
  sp.scale.setScalar(size); sp.position.set(x, y, z)
  parent.add(sp)
  return sp
}

export function lamp(world, x, z, color = '#ffc978', height = 3.1, intensity = 22, dist = 17) {
  const y = world.heightAt(x, z)
  const g = new THREE.Group(); g.position.set(x, y, z)
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.13, height, 6), std('#2e2536'))
  post.position.y = height / 2; g.add(post)
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.3, 6), std('#3a2c44'))
  cap.position.y = height + 0.1; g.add(cap)
  const lantern = new THREE.Mesh(new THREE.OctahedronGeometry(0.24, 0), new THREE.MeshBasicMaterial({ color: new THREE.Color(color), toneMapped: false }))
  lantern.position.y = height - 0.06; g.add(lantern)
  addGlow(world, g, color, 2.6, 0, height - 0.06, 0, 0.75)
  const light = new THREE.PointLight(new THREE.Color(color), intensity, dist, 1.8)
  light.position.y = height - 0.1; g.add(light)
  world.scene.add(g)
  return g
}

function house(world, x, z, opts = {}) {
  const h = world.heightAt(x, z)
  const g = new THREE.Group(); g.position.set(x, h, z); g.rotation.y = opts.rot || 0
  const w = opts.w || 5.4, d = opts.d || 4.6, wallH = opts.h || 3.1
  const wallColor = opts.wall || '#cfc3a6'
  const roofColor = opts.roof || '#3d2c4c'
  const trim = opts.trim || '#4a3728'

  const found = new THREE.Mesh(new THREE.CylinderGeometry(Math.max(w, d) * 0.66, Math.max(w, d) * 0.72, 0.7, 8), std('#5c554c', { rough: 1 }))
  found.position.y = -0.1; g.add(found)

  const walls = new THREE.Mesh(new THREE.BoxGeometry(w, wallH, d), std(wallColor, { rough: 0.95 }))
  walls.position.y = 0.25 + wallH / 2; g.add(walls)

  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(0.18, wallH, 0.18), std(trim))
    beam.position.set(sx * (w / 2 - 0.06), 0.25 + wallH / 2, sz * (d / 2 - 0.06)); g.add(beam)
  }
  const beamY = new THREE.Mesh(new THREE.BoxGeometry(w + 0.1, 0.16, 0.18), std(trim))
  beamY.position.set(0, 0.25 + wallH * 0.62, d / 2 - 0.02); g.add(beamY)
  const beamX1 = new THREE.Mesh(new THREE.BoxGeometry(w + 0.12, 0.2, d + 0.12), std(trim))
  beamX1.position.y = 0.3 + wallH; g.add(beamX1)

  const roof = new THREE.Mesh(new THREE.ConeGeometry(Math.hypot(w, d) * 0.61, opts.roofH || 2.5, 4), std(roofColor, { rough: 0.9 }))
  roof.rotation.y = Math.PI / 4
  roof.position.y = 0.55 + wallH + (opts.roofH || 2.5) / 2; g.add(roof)

  const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.7, 0.65), std('#6b5a4a'))
  chimney.position.set(w * 0.28, 0.55 + wallH + 1.7, -d * 0.2); g.add(chimney)
  const smoke = new THREE.Sprite(new THREE.SpriteMaterial({ map: world.textures.glow, color: 0x9a8fb0, transparent: true, opacity: 0.14, depthWrite: false }))
  smoke.position.set(w * 0.28, 0.55 + wallH + 2.8, -d * 0.2); smoke.scale.setScalar(2.4); g.add(smoke)

  const door = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.75, 0.12), std('#3b2619'))
  door.position.set(0.7, 0.25 + 0.88, d / 2 + 0.02); g.add(door)
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 6), std('#e2be6c', { metal: 0.8, emissive: '#6b4d19' }))
  knob.position.set(0.95, 0.25 + 0.88, d / 2 + 0.1); g.add(knob)

  for (const [wx, wy] of [[-w * 0.28, 0.25 + wallH * 0.55], [w * 0.28, 0.25 + wallH * 0.55]]) {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.95, 0.08), std(trim))
    frame.position.set(wx, wy, d / 2 + 0.03); g.add(frame)
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.76), new THREE.MeshBasicMaterial({ color: new THREE.Color(opts.lit || '#ffcf83'), toneMapped: false }))
    pane.position.set(wx, wy, d / 2 + 0.08); g.add(pane)
    addGlow(world, g, '#ffc06a', 1.6, wx, wy, d / 2 + 0.2, 0.45)
  }
  const sidePane = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.7), new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffcf83'), toneMapped: false }))
  sidePane.position.set(w / 2 + 0.03, 0.25 + wallH * 0.55, 0); sidePane.rotation.y = Math.PI / 2; g.add(sidePane)

  addGlow(world, g, '#ffbb66', 1.8, 0.7, 1.5, d / 2 + 0.4, 0.3)
  world.scene.add(g)
  world.addCollider(x, z, Math.max(w, d) * 0.62, true, Math.hypot(w, d) * 0.64)
  return g
}

function marketStall(world, x, z, color = '#7d3f4f', rot = 0) {
  const y = world.heightAt(x, z)
  const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = rot
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 2.5, 5), std('#4b3524'))
    post.position.set(sx * 1.25, 1.25, sz * 0.85); g.add(post)
  }
  const counter = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.75, 1.5), std('#5b4029'))
  counter.position.y = 0.75; g.add(counter)
  const canopy = new THREE.Mesh(new THREE.ConeGeometry(2.25, 0.55, 8), std(color, { rough: 0.95 }))
  canopy.position.y = 2.75; g.add(canopy)
  const canopyLip = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.035, 4, 16), std('#d9b978', { metal: 0.4 }))
  canopyLip.rotation.x = Math.PI / 2; canopyLip.position.y = 2.52; g.add(canopyLip)
  for (let i = 0; i < 5; i++) {
    const jar = new THREE.Mesh(new THREE.SphereGeometry(0.11, 6, 5), std(['#7fd08a', '#74b7ff', '#d886ff'][i % 3], { emissive: ['#2b5a36', '#264a6a', '#4a2b5a'][i % 3], ei: 0.6 }))
    jar.position.set(-1.05 + i * 0.5, 1.26, 0.1); g.add(jar)
  }
  addGlow(world, g, '#ffc978', 1.4, 0, 2.35, 0, 0.25)
  world.scene.add(g)
  world.addCollider(x, z, 1.7)
  return g
}

export function buildVillage(world) {
  const scene = world.scene
  const y0 = world.heightAt(0, 0)

  // plaza
  const plaza = new THREE.Mesh(new THREE.CircleGeometry(14, 48), std('#6f6454', { rough: 1 }))
  plaza.rotation.x = -Math.PI / 2
  plaza.position.set(0, y0 + 0.04, 0)
  scene.add(plaza)
  const plazaRing = new THREE.Mesh(new THREE.RingGeometry(13.2, 14, 48), std('#8d7f66'))
  plazaRing.rotation.x = -Math.PI / 2; plazaRing.position.set(0, y0 + 0.05, 0); scene.add(plazaRing)
  for (let r = 4; r <= 12; r += 4) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(r - 0.04, r + 0.04, 48), new THREE.MeshBasicMaterial({ color: 0x2f2a28, transparent: true, opacity: 0.4 }))
    ring.rotation.x = -Math.PI / 2; ring.position.set(0, y0 + 0.055, 0); scene.add(ring)
  }

  // fountain
  const fountain = new THREE.Group(); fountain.position.set(0, y0, 0)
  const basin = new THREE.Mesh(new THREE.CylinderGeometry(2.7, 3, 0.75, 16), std('#857b6a', { rough: 1 }))
  basin.position.y = 0.35; fountain.add(basin)
  const water = new THREE.Mesh(new THREE.CylinderGeometry(2.45, 2.45, 0.1, 20), new THREE.MeshStandardMaterial({ color: '#2b6b7a', roughness: 0.15, metalness: 0.35, transparent: true, opacity: 0.9, emissive: '#123844', emissiveIntensity: 0.8 }))
  water.position.y = 0.72; fountain.add(water)
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.8, 2.4, 8), std('#9a8f7d'))
  pedestal.position.y = 1.8; fountain.add(pedestal)
  const statue = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.5, 7), std('#b5a992'))
  statue.position.y = 3.5; fountain.add(statue)
  const orb = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), new THREE.MeshBasicMaterial({ color: '#a9d8ff', toneMapped: false }))
  orb.position.y = 4.5; fountain.add(orb)
  addGlow(world, fountain, '#9fd0ff', 3.4, 0, 4.5, 0, 0.7)
  const wl = new THREE.PointLight(0x8fc8ff, 14, 14, 2); wl.position.y = 3.4; fountain.add(wl)
  scene.add(fountain)
  world.addCollider(0, 0, 3.1)
  world.fireflies.push({ obj: fountain, kind: 'fountain' })

  // the crooked wand shop
  const shop = house(world, -9, 16, { w: 7.2, d: 5.4, h: 3.4, wall: '#c9bda3', roof: '#3a2a4e', rot: 0.08, roofH: 2.8 })
  const signBoard = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.1, 0.18), std('#2b1c16'))
  signBoard.position.set(0, 2.65, 2.78); shop.add(signBoard)
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.9, 1.9), new THREE.MeshBasicMaterial({ map: signTexture(['THE CROOKED WAND', 'wands · repairs · destiny']), toneMapped: false }))
  sign.position.set(0, 2.65, 2.89); shop.add(sign)
  addGlow(world, shop, '#ffc978', 4.2, 0, 2.4, 3.1, 0.3)
  lamp(world, -12.8, 12.2, '#ffc978', 3.2, 16, 15)

  // village houses
  house(world, -20, -5, { w: 5.6, d: 4.6, wall: '#bdb0a0', roof: '#44304f', rot: 0.5 })
  house(world, 17, -13, { w: 6.2, d: 5, wall: '#c8b89a', roof: '#3a3144', rot: -0.35 })
  house(world, 18, 9, { w: 4.8, d: 4.4, wall: '#cec0a4', roof: '#4a303c', rot: -0.9 })
  house(world, -19, 10, { w: 5.2, d: 4.8, wall: '#c2b39a', roof: '#353a4d', rot: 1.05 })
  house(world, 7, -17, { w: 5, d: 4.2, wall: '#cfc3a6', roof: '#3f2e4b', rot: -1.85 })

  // market
  marketStall(world, 9, 7.5, '#7d3f4f', 0.1)
  marketStall(world, -6, -8, '#3f5e7d', -0.5)
  marketStall(world, 6, 16, '#5e7d3f', 3.05)

  // lamps
  for (const [x, z] of [[-8, 8], [8, -8], [8, 8], [-8, -8], [13, 2], [-13, 2]]) {
    lamp(world, x, z, '#ffc978', 3.0, 15, 14)
  }

  // fences & barrels
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2
    const r = 17 + (i % 2) * 0.4
    const x = Math.cos(a) * r, z = Math.sin(a) * r
    if (Math.abs(x) < 3 || Math.abs(z) < 2) continue
    const h = world.heightAt(x, z)
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.9, 5), std('#4a3626'))
    post.position.set(x, h + 0.45, z); scene.add(post)
  }
  for (const [x, z, s] of [[12, 13, 1], [11, 14.5, 0.8], [-13, 17, 1.1], [3, 20, 0.9]]) {
    const h = world.heightAt(x, z)
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.38 * s, 0.32 * s, 0.8 * s, 9), std('#5c3e27'))
    barrel.position.set(x, h + 0.4 * s, z); scene.add(barrel)
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.36 * s, 0.03, 4, 12), std('#b39a6c', { metal: 0.5 }))
    band.rotation.x = Math.PI / 2; band.position.set(x, h + 0.52 * s, z); scene.add(band)
  }

  // banners near shop
  for (const x of [-13.5, -4.5]) {
    const h = world.heightAt(x, 18)
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 4.4, 5), std('#3a2b22'))
    pole.position.set(x, h + 2.2, 18); scene.add(pole)
    const banner = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 2.2), new THREE.MeshStandardMaterial({ color: '#5b3a78', side: THREE.DoubleSide, roughness: 0.9, emissive: '#2a163d', emissiveIntensity: 0.6 }))
    banner.position.set(x + 0.6, h + 3.15, 18); scene.add(banner)
    const glyph = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.4), new THREE.MeshBasicMaterial({ map: world.textures.glow, color: '#e6c987', transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }))
    glyph.position.set(x + 0.61, h + 3.2, 18.02); scene.add(glyph)
  }
}

/* ---------------------------------------------------------- ACADEMY HELPERS */
function academyWall(world, group, ox, oz, x1, z1, x2, z2, opts = {}) {
  const h = opts.h ?? 3.4, t = opts.t ?? 0.42
  const dx = x2 - x1, dz = z2 - z1
  const len = Math.hypot(dx, dz)
  if (len < 0.08) return
  const color = opts.color ?? '#4a475e'
  const trim = opts.trim ?? '#6d6880'
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(len, h, t), std(color, { rough: 0.97 }))
  mesh.position.set((x1 + x2) / 2, h / 2 + 0.03, (z1 + z2) / 2)
  mesh.rotation.y = Math.atan2(-dz, dx)
  group.add(mesh)
  const cap = new THREE.Mesh(new THREE.BoxGeometry(len + 0.12, 0.18, t + 0.16), std(trim, { rough: 0.9 }))
  cap.position.set(mesh.position.x, h + 0.04, mesh.position.z)
  cap.rotation.y = mesh.rotation.y
  group.add(cap)
  if (opts.collide !== false) {
    const steps = Math.max(1, Math.ceil(len / 1.25))
    const r = Math.max(0.52, t * 0.62 + 0.28)
    for (let i = 0; i <= steps; i++) {
      const t0 = i / steps
      world.addCollider(ox + x1 + dx * t0, oz + z1 + dz * t0, r, true, 0.9)
    }
  }
  return mesh
}

function academySign(world, group, text, sub, x, y, z, rotY, color = '#c9a6ff') {
  const board = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.55, 0.14), std('#241a33', { rough: 0.9 }))
  board.position.set(x, y, z); board.rotation.y = rotY; group.add(board)
  const face = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 1.4), new THREE.MeshBasicMaterial({ map: signTexture([text, sub], { fg: color }), toneMapped: false }))
  face.position.set(x, y, z); face.rotation.y = rotY
  face.translateZ(0.085); group.add(face)
}

function academyLantern(world, group, x, y, z, color = '#ffc978') {
  const cage = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), new THREE.MeshBasicMaterial({ color, toneMapped: false }))
  cage.position.set(x, y, z); group.add(cage)
  addGlow(world, group, color, 1.5, x, y, z, 0.55)
}

function academyChandelier(world, group, x, y, z) {
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.035, 5, 20), std('#5a4a3a', { metal: 0.35 }))
  ring.rotation.x = Math.PI / 2; ring.position.set(x, y, z); group.add(ring)
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2
    const c = new THREE.Group(); c.position.set(x + Math.cos(a) * 0.95, y + 0.16, z + Math.sin(a) * 0.95)
    const wax = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.3, 5), std('#e6dcc2', { emissive: '#5a4524', ei: 0.35 }))
    c.add(wax)
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.16, 5), new THREE.MeshBasicMaterial({ color: '#ffd08a', toneMapped: false }))
    flame.position.y = 0.22; c.add(flame)
    addGlow(world, c, '#ffcf83', 0.72, 0, 0.22, 0, 0.75)
    group.add(c)
  }
}

function academyDesk(group, x, z, rot = 0, color = '#4b3524') {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rot
  const top = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.12, 0.95), std(color, { rough: 0.9 }))
  top.position.y = 0.78; g.add(top)
  for (const [sx, sz] of [[-0.68, -0.34], [0.68, -0.34], [-0.68, 0.34], [0.68, 0.34]]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.78, 0.09), std('#3a2b22'))
    leg.position.set(sx, 0.39, sz); g.add(leg)
  }
  const book = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.09, 0.64), std(['#6b2f45', '#3f5e7d', '#5e5a3f'][Math.floor(Math.abs(x + z)) % 3]))
  book.position.set(-0.35, 0.88, 0.05); book.rotation.y = 0.2; g.add(book)
  group.add(g)
}

function academyShelf(group, x, z, rot = 0, color = '#3d2a1e', w = 3.2, h = 3.0) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rot
  const frame = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.46), std(color, { rough: 0.94 }))
  frame.position.y = h / 2; g.add(frame)
  const back = new THREE.Mesh(new THREE.BoxGeometry(w - 0.16, h - 0.2, 0.06), std('#241a18'))
  back.position.set(0, h / 2, -0.21); g.add(back)
  for (let r = 0; r < 4; r++) {
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(w - 0.1, 0.09, 0.5), std('#5b4029'))
    shelf.position.set(0, 0.5 + r * 0.68, 0); g.add(shelf)
    let bx = -w / 2 + 0.24
    while (bx < w / 2 - 0.22) {
      const bw = 0.08 + ((r * 7 + bx * 5) % 1 + 1) % 1 * 0.09
      const bh = 0.32 + ((r * 3 + bx * 7) % 1 + 1) % 1 * 0.2
      const book = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, 0.3), std(['#6b2f45', '#3f5e7d', '#5e5a3f', '#4f3f6b', '#7d3f4f'][(r + Math.round(bx * 10)) % 5]))
      book.position.set(bx + bw / 2, 0.55 + r * 0.68 + bh / 2, 0.08); g.add(book)
      bx += bw + 0.035
    }
  }
  group.add(g)
  return g
}

function academyBed(group, x, z, rot = 0) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rot
  const frame = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.32, 2.4), std('#4b3524'))
  frame.position.y = 0.28; g.add(frame)
  const mat = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.26, 2.18), std('#d8cdb6', { rough: 0.95 }))
  mat.position.y = 0.57; g.add(mat)
  const blanket = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.12, 1.35), std(['#5b3a78', '#3f5e7a', '#7a3f4f'][Math.abs(Math.round(x * 3 + z)) % 3], { rough: 0.95 }))
  blanket.position.set(0, 0.73, 0.32); g.add(blanket)
  const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.16, 0.4), std('#efe6d4'))
  pillow.position.set(0, 0.74, -0.82); g.add(pillow)
  for (const [sx, sz] of [[-0.58, -1.12], [0.58, -1.12], [-0.58, 1.12], [0.58, 1.12]]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.28, 0.1), std('#3a2b22'))
    leg.position.set(sx, 0.14, sz); g.add(leg)
  }
  group.add(g)
}

function academyCauldron(world, group, x, z, color = '#7fd08a') {
  const g = new THREE.Group(); g.position.set(x, 0, z)
  const pot = new THREE.Mesh(new THREE.SphereGeometry(0.78, 14, 10, 0, Math.PI * 2, Math.PI * 0.28, Math.PI * 0.72), std('#2e2a33', { rough: 0.7, metal: 0.3 }))
  pot.position.y = 0.78; g.add(pot)
  const brew = new THREE.Mesh(new THREE.CircleGeometry(0.66, 18), new THREE.MeshBasicMaterial({ color, toneMapped: false }))
  brew.rotation.x = -Math.PI / 2; brew.position.y = 1.04; g.add(brew)
  addGlow(world, g, color, 2.1, 0, 1.1, 0, 0.5)
  for (const s of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 0.55, 5), std('#3a3030'))
    leg.position.set(s * 0.45, 0.28, 0); leg.rotation.z = s * 0.25; g.add(leg)
  }
  const steam = new THREE.Sprite(new THREE.SpriteMaterial({ map: world.textures.glow, color, transparent: true, opacity: 0.16, depthWrite: false }))
  steam.position.y = 1.7; steam.scale.setScalar(1.4); g.add(steam)
  group.add(g)
}

function academyBanner(group, x, y, z, color = '#5b3a78', rot = 0) {
  const cloth = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 3.4), new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide, roughness: 0.9, emissive: '#241338', emissiveIntensity: 0.55 }))
  cloth.position.set(x, y, z); cloth.rotation.y = rot; group.add(cloth)
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.4, 5), std('#b39a6c', { metal: 0.4 }))
  bar.rotation.z = Math.PI / 2; bar.position.set(x, y + 1.72, z); bar.rotation.y = rot; group.add(bar)
}

function academyDummy(group, x, z, rot = 0) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rot
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 1.8, 6), std('#4b3524'))
  post.position.y = 0.9; g.add(post)
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.55, 4, 6), std('#c9b98f', { rough: 0.98 }))
  body.position.y = 1.35; g.add(body)
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), std('#d8c7a0'))
  head.position.y = 1.95; g.add(head)
  const shield = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.12, 12), std('#6b2f45', { metal: 0.2 }))
  shield.rotation.z = Math.PI / 2; shield.position.set(0.02, 1.32, 0.24); g.add(shield)
  const target = new THREE.Mesh(new THREE.RingGeometry(0.08, 0.15, 12), new THREE.MeshBasicMaterial({ color: '#d9b978', side: THREE.DoubleSide, toneMapped: false }))
  target.position.set(0.02, 1.32, 0.31); g.add(target)
  group.add(g)
}

function academyRoom(world, opts) {
  const scene = world.scene
  const { x, z, w, d, h = 5.2, name = 'Academy Room', sub = 'Arcanum Academy', kind = 'classroom' } = opts
  const wall = opts.wall ?? '#4a475e', trim = opts.trim ?? '#6d6880'
  const y = world.heightAt(x, z)
  const g = new THREE.Group(); g.position.set(x, y, z); scene.add(g)
  const doors = opts.doors || [{ side: 'south', at: 0, width: 3.0 }]
  const t = 0.44

  const floor = new THREE.Mesh(new THREE.BoxGeometry(w - 0.3, 0.26, d - 0.3), std(opts.floorColor ?? '#5a5568', { rough: 0.98 }))
  floor.position.y = 0.06; g.add(floor)
  const border = new THREE.Mesh(new THREE.BoxGeometry(w - 1.0, 0.04, d - 1.0), std(opts.floorColor2 ?? '#4d485e', { rough: 1 }))
  border.position.y = 0.2; g.add(border)
  // a deep foundation hides any small terrain differences
  const found = new THREE.Mesh(new THREE.BoxGeometry(w + 0.5, 1.6, d + 0.5), std('#343140', { rough: 1 }))
  found.position.y = -0.72; g.add(found)

  const sideDefs = {
    south: { fixed: 'z', at: d / 2, from: -w / 2, to: w / 2 },
    north: { fixed: 'z', at: -d / 2, from: -w / 2, to: w / 2 },
    west: { fixed: 'x', at: -w / 2, from: -d / 2, to: d / 2 },
    east: { fixed: 'x', at: w / 2, from: -d / 2, to: d / 2 },
  }
  for (const [side, sd] of Object.entries(sideDefs)) {
    const door = doors.find(dd => dd.side === side)
    let runs = [[sd.from, sd.to]]
    if (door) {
      const a = door.at - door.width / 2, b = door.at + door.width / 2
      runs = [[sd.from, a], [b, sd.to]]
      // lintel and threshold
      if (side === 'south' || side === 'north') {
        const lintel = new THREE.Mesh(new THREE.BoxGeometry(door.width + 0.35, 0.9, t + 0.12), std(trim))
        lintel.position.set(door.at, h - 0.45, sd.at); g.add(lintel)
        const step = new THREE.Mesh(new THREE.BoxGeometry(door.width + 0.9, 0.16, 0.85), std('#676277'))
        step.position.set(door.at, 0.08, sd.at + Math.sign(sd.at) * 0.42); g.add(step)
      } else {
        const lintel = new THREE.Mesh(new THREE.BoxGeometry(t + 0.12, 0.9, door.width + 0.35), std(trim))
        lintel.position.set(sd.at, h - 0.45, door.at); g.add(lintel)
        const step = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.16, door.width + 0.9), std('#676277'))
        step.position.set(sd.at + Math.sign(sd.at) * 0.42, 0.08, door.at); g.add(step)
      }
    }
    for (const [a, b] of runs) {
      if (b - a < 0.15) continue
      if (side === 'south' || side === 'north') {
        academyWall(world, g, x, z, a, sd.at, b, sd.at, { h, t, color: wall, trim })
      } else {
        academyWall(world, g, x, z, sd.at, a, sd.at, b, { h, t, color: wall, trim })
      }
    }
  }

  // corner posts and open roof beams
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.6, h + 0.7, 0.6), std(trim, { rough: 0.95 }))
    post.position.set(sx * (w / 2 - 0.05), (h + 0.7) / 2, sz * (d / 2 - 0.05)); g.add(post)
  }
  for (const bx of [-w / 4, w / 4]) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, d + 0.5), std('#3a2b3f'))
    beam.position.set(bx, h + 0.28, 0); g.add(beam)
  }
  for (const bz of [-d / 4, d / 4]) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(w + 0.5, 0.22, 0.22), std('#3a2b3f'))
    beam.position.set(0, h + 0.28, bz); g.add(beam)
  }
  // glowing windows
  const lit = new THREE.MeshBasicMaterial({ color: '#ffcf83', toneMapped: false })
  for (const sx of [-w * 0.3, w * 0.3]) {
    for (const sz of [-1, 1]) {
      const pane = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 1.25), lit)
      pane.position.set(sx, h * 0.56, sz * (d / 2 + 0.015)); pane.rotation.y = sz > 0 ? 0 : Math.PI; g.add(pane)
      addGlow(world, g, '#ffc06a', 1.1, sx, h * 0.56, sz * (d / 2 + 0.1), 0.22)
    }
  }
  for (const sz of [-d * 0.28, d * 0.28]) {
    for (const sx of [-1, 1]) {
      const pane = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 1.25), lit)
      pane.position.set(sx * (w / 2 + 0.015), h * 0.56, sz); pane.rotation.y = sx > 0 ? Math.PI / 2 : -Math.PI / 2; g.add(pane)
    }
  }

  // sign above the first door
  if (doors[0]) {
    const dd = doors[0]
    if (dd.side === 'south') academySign(world, g, name, sub, dd.at, h + 0.55, d / 2 + 0.12, 0)
    else if (dd.side === 'north') academySign(world, g, name, sub, dd.at, h + 0.55, -d / 2 - 0.12, Math.PI)
    else if (dd.side === 'west') academySign(world, g, name, sub, -w / 2 - 0.12, h + 0.55, dd.at, -Math.PI / 2)
    else academySign(world, g, name, sub, w / 2 + 0.12, h + 0.55, dd.at, Math.PI / 2)
  }

  // interior dressing
  if (kind === 'mainhall') {
    for (const zz of [-2.5, 2.5]) {
      for (const xx of [-5.2, 0, 5.2]) {
        const table = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.16, 1.0), std('#5b4029'))
        table.position.set(xx, 0.86, zz); g.add(table)
        for (const s of [-1, 1]) {
          const bench = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.14, 0.38), std('#4b3524'))
          bench.position.set(xx, 0.48, zz + s * 0.78); g.add(bench)
        }
      }
    }
    const dais = new THREE.Mesh(new THREE.BoxGeometry(12, 0.4, 3.4), std('#5f5a6e'))
    dais.position.set(0, 0.3, -d / 2 + 2.2); g.add(dais)
    const head = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.18, 1.2), std('#4b3524'))
    head.position.set(0, 0.9, -d / 2 + 2.2); g.add(head)
    const chair = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.0, 1.0), std('#3a2b3f'))
    chair.position.set(0, 1.2, -d / 2 + 3.5); g.add(chair)
    for (const bx of [-7, -3.5, 3.5, 7]) academyBanner(g, bx, h * 0.55, -d / 2 + 0.3, '#5b3a78')
    academyChandelier(world, g, 0, h - 1.0, -3)
    academyChandelier(world, g, 0, h - 1.0, 3)
    const statue = new THREE.Group(); statue.position.set(-7.6, 0, -d / 2 + 2.5)
    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, 1.2, 8), std('#6d6880'))
    plinth.position.y = 0.6; statue.add(plinth)
    const figure = new THREE.Mesh(new THREE.ConeGeometry(0.45, 2.5, 6), std('#d9b978', { emissive: '#6b4d19', ei: 0.25 }))
    figure.position.y = 2.4; statue.add(figure)
    g.add(statue)
  } else if (kind === 'charms') {
    for (const zz of [-2.2, 1.8]) for (const xx of [-3.4, 0, 3.4]) academyDesk(g, xx, zz, zz > 0 ? Math.PI : 0)
    const board = new THREE.Mesh(new THREE.BoxGeometry(7.2, 2.8, 0.16), std('#203a30', { emissive: '#0f2a22', ei: 0.5 }))
    board.position.set(0, 2.4, -d / 2 + 0.38); g.add(board)
    for (let i = 0; i < 5; i++) {
      const chalk = new THREE.Mesh(new THREE.PlaneGeometry(0.35 + (i % 3) * 0.45, 0.07), new THREE.MeshBasicMaterial({ color: '#d8e8d0', transparent: true, opacity: 0.75 }))
      chalk.position.set(-1.7 + i * 0.8, 2.9 - i * 0.33, -d / 2 + 0.48); g.add(chalk)
    }
    academyBanner(g, -w / 2 + 0.35, h * 0.55, 0, '#6b2f45', Math.PI / 2)
    academyChandelier(world, g, 0, h - 0.9, 0)
  } else if (kind === 'defence') {
    for (const [xx, zz, rot] of [[-3.2, -1.5, 0.3], [3.2, -1.5, -0.3], [-3.2, 2.2, 0.5], [3.2, 2.2, -0.5]]) academyDummy(g, xx, zz, rot)
    academyShelf(g, -w / 2 + 0.5, 0, Math.PI / 2, '#3d2a1e', 4.2, 2.6)
    for (const bx of [-3, 3]) academyBanner(g, bx, h * 0.55, -d / 2 + 0.3, '#3f5e7a')
    academyChandelier(world, g, 0, h - 0.9, 1)
  } else if (kind === 'dorm') {
    for (const [xx, zz, rot] of [[-4, -3.2, 0], [0, -3.2, 0], [4, -3.2, 0], [-4.2, 2.2, Math.PI]]) academyBed(g, xx, zz, rot)
    const rug = new THREE.Mesh(new THREE.CircleGeometry(2.2, 20), std('#5b3a78', { rough: 1 }))
    rug.rotation.x = -Math.PI / 2; rug.position.set(1.4, 0.22, 2.2); g.add(rug)
    const chest = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.8, 0.7), std('#4b3524'))
    chest.position.set(4.6, 0.45, 2.6); g.add(chest)
    const fire = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.6, 0.5), std('#3a3030'))
    fire.position.set(-w / 2 + 0.45, 0.8, 0.5); fire.rotation.y = Math.PI / 2; g.add(fire)
    const ember = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.8), new THREE.MeshBasicMaterial({ color: '#ff9a4d', transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false }))
    ember.position.set(-w / 2 + 0.72, 0.7, 0.5); ember.rotation.y = Math.PI / 2; g.add(ember)
    academyBanner(g, w / 2 - 0.35, h * 0.55, 0, '#3f5e7a', -Math.PI / 2)
    // curtained Founders' Stair
    const curtain = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 2.8), new THREE.MeshStandardMaterial({ color: '#5b3a78', side: THREE.DoubleSide, roughness: 0.95, emissive: '#241338', emissiveIntensity: 0.5 }))
    curtain.position.set(-3, 1.5, d / 2 - 0.4); g.add(curtain)
    const stairGlow = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.8), new THREE.MeshBasicMaterial({ color: '#9a7be0', transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false }))
    stairGlow.position.set(-3, 1.2, d / 2 - 0.34); g.add(stairGlow)
  } else if (kind === 'wandworks') {
    const bench = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.14, 1.1), std('#5b4029', { rough: 0.9 }))
    bench.position.set(0, 0.92, 1.1); g.add(bench)
    for (const sx of [-2.3, 2.3]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.9, 0.9), std('#3a2b22'))
      leg.position.set(sx, 0.46, 1.1); g.add(leg)
    }
    // wand rack
    const rack = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.1, 0.35), std('#3d2a1e'))
    rack.position.set(0, 1.45, -d / 2 + 0.42); g.add(rack)
    for (let i = 0; i < 9; i++) {
      const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.036, 1.25, 5), std(['#8a5a3a', '#c9a86a', '#a8c094', '#3a2b3f'][i % 4]))
      stick.position.set(-1.8 + (i % 5) * 0.9, 1.72 + Math.floor(i / 5) * 0.62, -d / 2 + 0.66)
      stick.rotation.z = (i % 2 ? -1 : 1) * 0.16; g.add(stick)
      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 5), new THREE.MeshBasicMaterial({ color: ['#ffc978', '#9fd8ff', '#c79bff'][i % 3], toneMapped: false }))
      tip.position.set(stick.position.x + stick.rotation.z * -0.6, stick.position.y + 0.58, -d / 2 + 0.68); g.add(tip)
    }
    // lathe and work stool
    const lathe = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.5, 1.0, 8), std('#4a475e', { metal: 0.35 }))
    lathe.position.set(-2.6, 0.55, -1.2); g.add(lathe)
    const latheTop = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.16, 0.5), std('#6d6880', { metal: 0.4 }))
    latheTop.position.set(-2.6, 1.1, -1.2); g.add(latheTop)
    const stool = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.34, 0.55, 8), std('#3a2b22'))
    stool.position.set(1.6, 0.3, -1.4); g.add(stool)
    academyShelf(g, w / 2 - 0.4, -2.2, -Math.PI / 2, '#3d2a1e', 2.8, 2.8)
    academyLantern(world, g, 0, h - 0.9, 0, '#ffc978')
    academyChandelier(world, g, 0, h - 0.9, 0.6)
  } else if (kind === 'infirmary') {
    for (const [xx, zz, rot] of [[-3, -2.2, 0], [0.5, -2.2, 0], [-3, 1.8, Math.PI], [2.8, 1.8, Math.PI]]) academyBed(g, xx, zz, rot)
    academyShelf(g, w / 2 - 0.5, -1.2, -Math.PI / 2, '#3d2a1e', 3.4, 2.8)
    academyCauldron(world, g, 3.8, 0.3, '#9bf0bf')
    for (const bx of [-3, 3]) academyBanner(g, bx, h * 0.55, -d / 2 + 0.3, '#3f6b55')
    academyChandelier(world, g, 0, h - 0.9, 0)
  } else if (kind === 'transfiguration') {
    for (const [xx, zz] of [[-3.4, -1.2], [0, -1.2], [3.4, -1.2]]) {
      const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.55, 1.05, 8), std('#6d6880'))
      ped.position.set(xx, 0.52, zz); g.add(ped)
      const shape = new THREE.Mesh(new THREE.IcosahedronGeometry(0.34, 0), std(['#c79bff', '#d9b978', '#8fd4ff'][Math.round(xx + 4) % 3], { emissive: '#4a2b5a', ei: 0.3 }))
      shape.position.set(xx, 1.3, zz); g.add(shape)
    }
    const mirror = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.4), new THREE.MeshStandardMaterial({ color: '#7a86a8', metalness: 0.8, roughness: 0.16 }))
    mirror.position.set(0, 2.4, -d / 2 + 0.34); g.add(mirror)
    const frame = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.8, 0.16), std('#b39a6c', { metal: 0.4 }))
    frame.position.set(0, 2.4, -d / 2 + 0.26); g.add(frame)
    academyChandelier(world, g, 0, h - 0.9, 1.2)
  } else if (kind === 'potions') {
    academyCauldron(world, g, -3.2, -1.6, '#7fd08a')
    academyCauldron(world, g, 2.4, 0.6, '#d886ff')
    for (const [xx, zz, rot] of [[-w / 2 + 1.1, 2.4, Math.PI / 2], [w / 2 - 1.1, -2.6, -Math.PI / 2]]) academyDesk(g, xx, zz, rot)
    for (let i = 0; i < 12; i++) {
      const jar = new THREE.Mesh(new THREE.SphereGeometry(0.11 + (i % 3) * 0.025, 6, 5), std(['#7fd08a', '#74b7ff', '#d886ff', '#ffc266'][i % 4], { emissive: ['#2b5a36', '#264a6a', '#4a2b5a', '#6b4d19'][i % 4], ei: 0.7 }))
      jar.position.set(-3.4 + i * 0.62, 1.22, -d / 2 + 0.75); g.add(jar)
    }
    academyShelf(g, w / 2 - 0.5, 2.2, -Math.PI / 2, '#2e2a33', 3.0, 2.6)
    academyChandelier(world, g, 0, h - 0.9, 0)
  } else if (kind === 'library') {
    for (const zz of [-2.5, 1.0]) for (const xx of [-4.2, 0, 4.2]) academyShelf(g, xx, zz, zz < 0 ? 0 : Math.PI, '#3d2a1e', 3.6, 3.4)
    academyDesk(g, 0, 3.8, Math.PI)
    for (const [xx, yy, zz] of [[-1.2, 2.2, 2.4], [1.4, 2.6, 0.1], [0.2, 2.9, -1.4]]) {
      const book = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 0.65), std('#6b2f45'))
      book.position.set(xx, yy, zz); book.rotation.set(0.3, xx, 0.2); g.add(book)
      addGlow(world, g, '#c9a6ff', 0.7, xx, yy, zz, 0.25)
    }
    // the loose bookcase on the east wall
    const loose = academyShelf(g, w / 2 - 0.35, -1.2, Math.PI / 2, '#3d2a1e', 3.2, 3.2)
    loose.rotation.y = Math.PI / 2 + 0.26
    const seam = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 2.6), new THREE.MeshBasicMaterial({ color: '#9a7be0', transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending, depthWrite: false }))
    seam.position.set(w / 2 - 0.15, 1.4, 0.4); seam.rotation.y = Math.PI / 2; g.add(seam)
    academyChandelier(world, g, 0, h - 0.9, 0)
  } else if (kind === 'arena') {
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(5.4, 5.6, 0.22, 40), std('#6b6070', { rough: 0.95 }))
    ring.position.y = 0.16; g.add(ring)
    const inner = new THREE.Mesh(new THREE.CircleGeometry(5.2, 40), std('#7a6d7d', { rough: 1 }))
    inner.rotation.x = -Math.PI / 2; inner.position.y = 0.29; g.add(inner)
    const rune = new THREE.Mesh(new THREE.RingGeometry(3.4, 3.55, 48), new THREE.MeshBasicMaterial({ color: '#9a7be0', transparent: true, opacity: 0.45, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }))
    rune.rotation.x = -Math.PI / 2; rune.position.y = 0.31; g.add(rune)
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2
      // leave the southern side clear: the chase camera watches the duel through it
      if (Math.sin(a) > 0.35) continue
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.34, 4.2, 7), std('#6d6880'))
      col.position.set(Math.cos(a) * 6.4, 2.1, Math.sin(a) * 6.4); g.add(col)
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.13, 7, 6), new THREE.MeshBasicMaterial({ color: '#b79aff', toneMapped: false }))
      orb.position.set(Math.cos(a) * 6.4, 4.35, Math.sin(a) * 6.4); g.add(orb)
      addGlow(world, g, '#b79aff', 1.0, Math.cos(a) * 6.4, 4.35, Math.sin(a) * 6.4, 0.5)
    }
    for (const bx of [-5.5, 5.5]) academyBanner(g, bx, h * 0.55, -d / 2 + 0.3, '#6b2f45')
    academyChandelier(world, g, 0, h - 1.0, 0)
  } else if (kind === 'archive') {
    for (const xx of [-2.4, 2.4]) academyShelf(g, xx, -2.6, 0, '#2f2018', 3.8, 3.8)
    for (const xx of [-2.4, 2.4]) academyShelf(g, xx, 2.2, Math.PI, '#2f2018', 3.8, 3.8)
    const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.7, 1.2, 8), std('#5f5a6e'))
    pedestal.position.set(0, 0.62, 0.2); g.add(pedestal)
    const feather = new THREE.Mesh(new THREE.ConeGeometry(0.18, 1.4, 5), std('#e8c87a', { emissive: '#6b4d19', ei: 0.7 }))
    feather.position.set(0, 1.9, 0.2); feather.rotation.z = 0.35; g.add(feather)
    addGlow(world, g, '#e8c87a', 2.0, 0, 1.8, 0.2, 0.5)
    academyChandelier(world, g, 0, h - 0.9, 0)
  } else if (kind === 'undercroft') {
    for (const [xx, zz] of [[-4.4, -2.4], [4.4, -2.4], [-4.4, 2.4], [4.4, 2.4]]) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.5, h, 8), std('#3f3b4c'))
      col.position.set(xx, h / 2, zz); g.add(col)
    }
    const crack = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 6), new THREE.MeshBasicMaterial({ color: '#9a7be0', transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }))
    crack.rotation.x = -Math.PI / 2; crack.rotation.z = 0.18; crack.position.set(-1.2, 0.24, 0.6); g.add(crack)
    addGlow(world, g, '#9a7be0', 2.8, -1.2, 0.5, 0.6, 0.4)
    for (const bx of [-3.4, 3.4]) academyBanner(g, bx, h * 0.5, -d / 2 + 0.3, '#4a2b5a')
    const reliquary = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.7, 0.7), std('#5f5a6e'))
    reliquary.position.set(4.6, 0.45, 3.2); g.add(reliquary)
  } else {
    academyDesk(g, 0, 0)
  }

  g.userData.room = { x, z, w, d, name, kind }
  return g
}

/* ---------------------------------------------------------- ACADEMY */
export function buildAcademy(world) {
  const scene = world.scene
  const CX = 62, CZ = -34

  // ---------------------------------------------------------------- campus wall
  const wallOpts = { h: 3.4, t: 0.55, color: '#4a475e', trim: '#6d6880' }
  const wallRuns = [
    // south wall with the main gate and the arena gallery left open
    [34, -12, 56, -12], [68, -12, 70.6, -12], [89.4, -12, 90, -12],
    // west wall with a garden gate
    [34, -12, 34, -28], [34, -32, 34, -64],
    // east wall, opened for the hidden archive
    [90, -12, 90, -24], [90, -40, 90, -64],
    // north wall, opened for the undercroft behind the Great Hall
    [34, -64, 50, -64], [74, -64, 90, -64],
  ]
  const wallGroup = new THREE.Group(); scene.add(wallGroup)
  for (const [x1, z1, x2, z2] of wallRuns) academyWall(world, wallGroup, 0, 0, x1, z1, x2, z2, wallOpts)

  // corner towers
  for (const [tx, tz] of [[34, -12], [90, -12], [34, -64], [90, -64]]) {
    const ty = world.heightAt(tx, tz)
    const tower = new THREE.Group(); tower.position.set(tx, ty, tz)
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.35, 9.5, 10), std('#4d4a60', { rough: 0.97 }))
    shaft.position.y = 4.75; tower.add(shaft)
    const roof = new THREE.Mesh(new THREE.ConeGeometry(2.7, 4.0, 10), std('#332a52'))
    roof.position.y = 11.4; tower.add(roof)
    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.1, 1.0, 5), std('#d9b978', { emissive: '#6b4d19', ei: 0.4 }))
    cap.position.y = 13.8; tower.add(cap)
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2
      const win = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 1.2), new THREE.MeshBasicMaterial({ color: '#ffcf83', toneMapped: false }))
      win.position.set(Math.cos(a) * 2.0, 6.0, Math.sin(a) * 2.0); win.rotation.y = -a + Math.PI / 2; tower.add(win)
    }
    addGlow(world, tower, '#ffc06a', 2.0, 0, 6.0, 0, 0.3)
    scene.add(tower)
    world.addCollider(tx, tz, 2.2, true, 2.8)
  }

  // gatehouse
  const gateY = world.heightAt(62, -12)
  const gate = new THREE.Group(); gate.position.set(62, gateY, -12)
  for (const sx of [-1, 1]) {
    const pilaster = new THREE.Mesh(new THREE.BoxGeometry(1.5, 8.6, 1.5), std('#5a566c', { rough: 0.95 }))
    pilaster.position.set(sx * 3.6, 4.3, 0); gate.add(pilaster)
    const finial = new THREE.Mesh(new THREE.ConeGeometry(0.65, 1.5, 5), std('#332a52'))
    finial.position.set(sx * 3.6, 9.3, 0); gate.add(finial)
  }
  const arch = new THREE.Mesh(new THREE.BoxGeometry(8.7, 1.1, 1.6), std('#6d6880'))
  arch.position.y = 8.5; gate.add(arch)
  academySign(world, gate, 'ARCANUM', 'academy of the six schools', 0, 9.9, 0.1, 0)
  addGlow(world, gate, '#9a7be0', 7, 0, 4.4, 0, 0.22)
  scene.add(gate)
  world.addCollider(58.4, -12, 1.3, true, 1.8)
  world.addCollider(65.6, -12, 1.3, true, 1.8)

  // ---------------------------------------------------------------- rooms
  academyRoom(world, { x: 62, z: -51, w: 20, d: 18, h: 7.5, name: 'The Great Hall', sub: 'assizes · feasts · warnings', kind: 'mainhall', doors: [{ side: 'south', at: 0, width: 4.6, }], floorColor: '#5b566b', wall: '#514d63' })
  academyRoom(world, { x: 42, z: -48, w: 12, d: 12, name: 'Charms', sub: 'Professor Isolde Marrow', kind: 'charms', doors: [{ side: 'east', at: 0, width: 3.0 }] })
  academyRoom(world, { x: 42, z: -32, w: 12, d: 12, name: 'Defence', sub: 'Professor Alaric Feld', kind: 'defence', doors: [{ side: 'east', at: 0, width: 3.0 }] })
  academyRoom(world, { x: 42, z: -19, w: 12, d: 10, name: 'Dormitories', sub: 'Ravenwood · first-years', kind: 'dorm', doors: [{ side: 'east', at: 0, width: 3.0 }] })
  academyRoom(world, { x: 69, z: -34, w: 10, d: 8, name: 'Infirmary', sub: 'Matron Elowen Ash', kind: 'infirmary', doors: [{ side: 'west', at: 0, width: 2.6 }], floorColor: '#565a60' })
  academyRoom(world, { x: 56, z: -34, w: 8, d: 8, name: 'Wand Studies', sub: 'Professor Jasper Hollis', kind: 'wandworks', doors: [{ side: 'east', at: 0, width: 2.8 }], floorColor: '#585264', wall: '#4c475c' })
  academyRoom(world, { x: 81, z: -55, w: 14, d: 10, name: 'Transfiguration', sub: 'Professor Mirabel Crowe', kind: 'transfiguration', doors: [{ side: 'south', at: 0, width: 3.0 }] })
  academyRoom(world, { x: 81, z: -43, w: 14, d: 10, name: 'Potion Laboratory', sub: 'Professor Cinder Voss', kind: 'potions', doors: [{ side: 'south', at: 0, width: 3.0 }], floorColor: '#54505e' })
  academyRoom(world, { x: 81, z: -31, w: 14, d: 10, name: 'The Library', sub: 'Archivist Wren · silence, mostly', kind: 'library', doors: [{ side: 'west', at: 0, width: 3.0 }, { side: 'east', at: 0, width: 1.8 }] })
  academyRoom(world, { x: 92, z: -31, w: 8, d: 10, name: 'Restricted Archive', sub: 'it is not locked; it is ashamed', kind: 'archive', doors: [{ side: 'west', at: 0, width: 1.8 }], floorColor: '#4c4858', wall: '#3f3b4c' })
  academyRoom(world, { x: 80, z: -18, w: 18, d: 14, h: 7.2, name: 'Indoor Arena', sub: 'Tobias Flint · Sable Quinn', kind: 'arena', doors: [{ side: 'west', at: 0, width: 3.4 }, { side: 'south', at: 0, width: 10 }] })
  world.academyArenaCenter = new THREE.Vector3(80, world.heightAt(80, -18), -18)
  academyRoom(world, { x: 62, z: -68, w: 12, d: 8, h: 5.0, name: 'The Undercroft', sub: 'the school beneath the school', kind: 'undercroft', doors: [{ side: 'south', at: 0, width: 2.4 }], floorColor: '#43404e', wall: '#3a3746' })

  // ---------------------------------------------------------------- courtyard
  const courtY = world.heightAt(62, -21)
  const court = new THREE.Mesh(new THREE.CircleGeometry(8.6, 48), std('#676173', { rough: 1 }))
  court.rotation.x = -Math.PI / 2; court.position.set(62, courtY + 0.05, -21); scene.add(court)
  const courtRing = new THREE.Mesh(new THREE.RingGeometry(7.7, 8.25, 48), std('#8a7ba8'))
  courtRing.rotation.x = -Math.PI / 2; courtRing.position.set(62, courtY + 0.06, -21); scene.add(courtRing)
  const courtStar = new THREE.Mesh(new THREE.RingGeometry(4.4, 4.55, 6), new THREE.MeshBasicMaterial({ color: '#d9b978', transparent: true, opacity: 0.22, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }))
  courtStar.rotation.x = -Math.PI / 2; courtStar.position.set(62, courtY + 0.07, -21); scene.add(courtStar)

  // fountain
  const fountain = new THREE.Group(); fountain.position.set(62, courtY, -21)
  const basin = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.6, 0.65, 18), std('#7e788d'))
  basin.position.y = 0.34; fountain.add(basin)
  const water = new THREE.Mesh(new THREE.CylinderGeometry(2.08, 2.08, 0.1, 20), new THREE.MeshStandardMaterial({ color: '#2b6b7a', roughness: 0.12, metalness: 0.45, transparent: true, opacity: 0.9, emissive: '#123844', emissiveIntensity: 0.9 }))
  water.position.y = 0.68; fountain.add(water)
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.62, 1.8, 8), std('#8a7ba8'))
  pedestal.position.y = 1.4; fountain.add(pedestal)
  const wandStatue = new THREE.Mesh(new THREE.ConeGeometry(0.19, 1.7, 5), std('#d9b978', { emissive: '#6b4d19', ei: 0.35 }))
  wandStatue.position.set(0, 3.0, 0); wandStatue.rotation.z = 0.4; fountain.add(wandStatue)
  const orb = new THREE.Mesh(new THREE.SphereGeometry(0.19, 10, 8), new THREE.MeshBasicMaterial({ color: '#a9d8ff', toneMapped: false }))
  orb.position.set(-0.33, 3.85, 0); fountain.add(orb)
  addGlow(world, fountain, '#9fd0ff', 2.6, -0.33, 3.85, 0, 0.65)
  scene.add(fountain)
  world.addCollider(62, -21, 2.7)
  world.fireflies.push({ obj: fountain, kind: 'fountain' })

  // arches and floating candles
  for (const [ax, az, rot] of [[53, -14.5, 0.6], [71, -14.5, -0.6], [52.5, -27, 2.5], [71.5, -27, -2.5]]) {
    const arch = new THREE.Group(); arch.position.set(ax, world.heightAt(ax, az), az); arch.rotation.y = rot
    for (const sx of [-1, 1]) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.3, 3.8, 7), std('#6d6880'))
      col.position.set(sx * 1.55, 1.9, 0); arch.add(col)
    }
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.38, 0.45), std('#8a7ba8'))
    lintel.position.y = 3.85; arch.add(lintel)
    addGlow(world, arch, '#9a7be0', 1.2, 0, 3.9, 0.2, 0.3)
    scene.add(arch)
  }
  for (let i = 0; i < 13; i++) {
    const a = (i / 13) * Math.PI * 2
    const cx = 62 + Math.cos(a) * (3.0 + (i % 3) * 1.4)
    const cz = -21 + Math.sin(a) * (3.0 + (i % 3) * 1.4)
    const cy2 = world.heightAt(cx, cz) + 3.2 + (i % 4) * 0.65
    const candle = new THREE.Group(); candle.position.set(cx, cy2, cz)
    const wax = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.4, 6), std('#ded3b6', { emissive: '#4a3a22', ei: 0.4 }))
    candle.add(wax)
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 6), new THREE.MeshBasicMaterial({ color: '#ffd08a', toneMapped: false }))
    flame.position.y = 0.28; candle.add(flame)
    addGlow(world, candle, '#ffd08a', 1.0, 0, 0.28, 0, 0.65)
    scene.add(candle)
    world.floating.push({ obj: candle, baseY: cy2, phase: i * 0.9, spin: 0.16 })
  }
  // benches and notice board
  for (const [bx, bz, rot] of [[56.5, -16.5, 0.4], [67.5, -16.5, -0.4], [56.5, -25.5, 2.7], [67.5, -25.5, -2.7]]) {
    const bench = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.32, 0.62), std('#4b3524'))
    bench.position.set(bx, world.heightAt(bx, bz) + 0.34, bz); bench.rotation.y = rot; scene.add(bench)
  }
  const notice = new THREE.Group(); notice.position.set(54.5, world.heightAt(54.5, -21), -21); notice.rotation.y = Math.PI / 2
  const noticePost = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 2.4, 6), std('#3a2b22'))
  noticePost.position.y = 1.2; notice.add(noticePost)
  const noticeBoard = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 0.14), std('#241a33'))
  noticeBoard.position.y = 2.2; notice.add(noticeBoard)
  const noticeFace = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.2), new THREE.MeshBasicMaterial({ map: signTexture(['NOTICES', 'assignments · duels · curfew'], { fg: '#d9b978' }), toneMapped: false }))
  noticeFace.position.set(0, 2.2, 0.08); notice.add(noticeFace)
  scene.add(notice)
  world.addCollider(54.5, -21, 0.65)

  // ---------------------------------------------------------------- gardens (west of the wall)
  const gardenY = world.heightAt(29, -30)
  const garden = new THREE.Group(); garden.position.set(29, gardenY, -30)
  const lawn = new THREE.Mesh(new THREE.CircleGeometry(9, 36), std('#354b38', { rough: 1 }))
  lawn.rotation.x = -Math.PI / 2; lawn.position.y = 0.04; garden.add(lawn)
  const gardenRing = new THREE.Mesh(new THREE.RingGeometry(7.8, 8.3, 36), std('#6f6650'))
  gardenRing.rotation.x = -Math.PI / 2; gardenRing.position.y = 0.05; garden.add(gardenRing)
  // greenhouse
  const greenhouse = new THREE.Group(); greenhouse.position.set(-4.2, 0, -3.4)
  const ghBase = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.5, 3.8), std('#5a5566'))
  ghBase.position.y = 0.25; greenhouse.add(ghBase)
  const glass = new THREE.Mesh(new THREE.BoxGeometry(5.0, 2.8, 3.6), new THREE.MeshStandardMaterial({ color: '#9fd8c8', transparent: true, opacity: 0.22, roughness: 0.12, metalness: 0.25, side: THREE.DoubleSide }))
  glass.position.y = 1.9; greenhouse.add(glass)
  const ghRoof = new THREE.Mesh(new THREE.ConeGeometry(3.6, 1.7, 4), new THREE.MeshStandardMaterial({ color: '#9fd8c8', transparent: true, opacity: 0.28, roughness: 0.12, metalness: 0.25 }))
  ghRoof.rotation.y = Math.PI / 4; ghRoof.position.y = 3.9; greenhouse.add(ghRoof)
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.0, 0.12), std('#6d6880'))
    post.position.set(sx * 2.45, 1.8, sz * 1.75); greenhouse.add(post)
  }
  for (let i = 0; i < 8; i++) {
    const plant = new THREE.Mesh(new THREE.IcosahedronGeometry(0.22 + (i % 3) * 0.04, 0), std(['#7fd08a', '#9bf0bf', '#6fd8c4'][i % 3], { emissive: '#1f4a34', ei: 0.35 }))
    plant.position.set(-1.8 + (i % 4) * 1.1, 0.65 + (i > 3 ? 0.7 : 0), -1.0 + Math.floor(i / 4) * 1.3); greenhouse.add(plant)
  }
  addGlow(world, greenhouse, '#9bf0bf', 3.0, 0, 2.0, 0, 0.22)
  garden.add(greenhouse)
  // herb beds
  for (let r = 0; r < 3; r++) {
    const bed = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.24, 1.0), std('#4b3524'))
    bed.position.set(3.4, 0.14, 0.4 + r * 1.5); garden.add(bed)
    for (let i = 0; i < 5; i++) {
      const herb = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.38 + (i % 2) * 0.12, 5), std(['#7f9a5a', '#9bf0bf', '#c9b36a'][i % 3], { emissive: '#2b4a2a', ei: 0.25 }))
      herb.position.set(1.4 + i * 1.05, 0.44, 0.4 + r * 1.5); garden.add(herb)
    }
  }
  // outdoor practice ring
  const practice = new THREE.Mesh(new THREE.RingGeometry(3.0, 3.2, 32), new THREE.MeshBasicMaterial({ color: '#d9b978', transparent: true, opacity: 0.25, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }))
  practice.rotation.x = -Math.PI / 2; practice.position.set(0.8, 0.09, 0.3); garden.add(practice)
  academyDummy(garden, -0.4, 2.6, 0.6); academyDummy(garden, 2.0, 2.6, -0.6)
  // laurel tree
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.34, 2.4, 6), std('#5b4029'))
  trunk.position.set(-2.0, 1.2, 3.4); garden.add(trunk)
  const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(1.7, 1), std('#4f6b45', { emissive: '#1c3824', ei: 0.25 }))
  crown.position.set(-2.0, 3.2, 3.4); garden.add(crown)
  addGlow(world, garden, '#9bf0bf', 4.4, -2.0, 2.5, 3.4, 0.15)
  scene.add(garden)
  world.addCollider(29 - 4.2, -30 - 3.4, 2.6, true, 3.2)
  for (const [gx, gz] of [[27, -26], [28, -31], [31, -36], [30, -24]]) world.addCollider(gx, gz, 0.35)

  // ---------------------------------------------------------------- south lawn
  const lawnGroup = new THREE.Group(); lawnGroup.position.set(62, world.heightAt(62, -5), -5); scene.add(lawnGroup)
  for (const [lx, lz, rot] of [[-12, -0.5, 0.4], [-7, 0.5, -0.5], [-2, 1.2, -0.3]]) academyDummy(lawnGroup, lx, lz, rot)

  // ---------------------------------------------------------------- lamps and gates
  lamp(world, 56, -13, '#c9a6ff', 3.2, 16, 14)
  lamp(world, 68, -13, '#c9a6ff', 3.2, 16, 14)
  lamp(world, 57, -29.5, '#ffc978', 3.0, 14, 12)
  lamp(world, 67, -29.5, '#ffc978', 3.0, 14, 12)
  lamp(world, 36, -30, '#9bf0bf', 3.0, 13, 12)

  // academy approach sign, outside the gate
  const signPost = new THREE.Group(); signPost.position.set(69.5, world.heightAt(69.5, -8), -8)
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 3.6, 6), std('#3a2b22'))
  post.position.y = 1.8; signPost.add(post)
  const board = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.7, 0.16), std('#241a33'))
  board.position.y = 3.1; signPost.add(board)
  const face = new THREE.Mesh(new THREE.PlaneGeometry(3.3, 1.5), new THREE.MeshBasicMaterial({ map: signTexture(['ARCANUM', 'campus · gate · no dark magic indoors'], { fg: '#c9a6ff' }), toneMapped: false }))
  face.position.set(0, 3.1, 0.09); signPost.add(face)
  scene.add(signPost)

  // courtyard and room glows keep the campus readable at night
  addGlow(world, scene, '#9a7be0', 24, 62, 5, -30, 0.16)
  addGlow(world, scene, '#ffc978', 10, 62, 3.5, -21, 0.22)
}

export function buildArena(world) {
  const scene = world.scene
  const cx = 24, cz = -4
  const base = world.heightAt(cx, cz)
  const floor = new THREE.Mesh(new THREE.CylinderGeometry(10.5, 10.8, 0.16, 48), std('#6b6070', { rough: 0.95 }))
  floor.position.set(cx, base + 0.08, cz); scene.add(floor)
  const inner = new THREE.Mesh(new THREE.CircleGeometry(9.8, 48), std('#7a6d7d', { rough: 1 }))
  inner.rotation.x = -Math.PI / 2; inner.position.set(cx, base + 0.17, cz); scene.add(inner)
  const rune = new THREE.Mesh(new THREE.RingGeometry(6.4, 6.7, 64), new THREE.MeshBasicMaterial({ color: '#d9b978', transparent: true, opacity: 0.35, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }))
  rune.rotation.x = -Math.PI / 2; rune.position.set(cx, base + 0.19, cz); scene.add(rune)
  const rune2 = new THREE.Mesh(new THREE.RingGeometry(3.2, 3.3, 6), new THREE.MeshBasicMaterial({ color: '#c9a6ff', transparent: true, opacity: 0.25, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }))
  rune2.rotation.x = -Math.PI / 2; rune2.position.set(cx, base + 0.19, cz); scene.add(rune2)
  world.arenaCenter = new THREE.Vector3(cx, base, cz)
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2
    const px = cx + Math.cos(a) * 9.4, pz = cz + Math.sin(a) * 9.4
    const py = world.heightAt(px, pz)
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.44, 4.8, 8), std('#77707f', { rough: 0.95 }))
    col.position.set(px, py + 2.4, pz); scene.add(col)
    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.62, 0.8, 6), std('#958aa4'))
    cap.position.set(px, py + 5.1, pz); scene.add(cap)
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.17, 8, 6), new THREE.MeshBasicMaterial({ color: '#b79aff', toneMapped: false }))
    orb.position.set(px, py + 5.45, pz); scene.add(orb)
    addGlow(world, scene, '#b79aff', 1.7, px, py + 5.45, pz, 0.75)
    if (i % 2 === 0) {
      const pl = new THREE.PointLight(0x9a7be0, 9, 13, 2); pl.position.set(px, py + 4.8, pz); scene.add(pl)
    }
  }
  // banner poles
  for (const [bx, bz] of [[cx - 11.5, cz + 6], [cx + 11.5, cz + 6]]) {
    const by = world.heightAt(bx, bz)
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 5.5, 6), std('#3a2b22'))
    pole.position.set(bx, by + 2.75, bz); scene.add(pole)
    const cloth = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 3), new THREE.MeshStandardMaterial({ color: '#6b2f45', side: THREE.DoubleSide, roughness: 0.9, emissive: '#3a1420', emissiveIntensity: 0.6 }))
    cloth.position.set(bx + 0.75, by + 4, bz); scene.add(cloth)
  }
  // weapon rack / benches
  for (const [sx, sz, rot] of [[cx - 11, cz - 5, 1.2], [cx + 11, cz - 5, -1.2]]) {
    const bench = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.35, 0.7), std('#4b3524'))
    bench.position.set(sx, world.heightAt(sx, sz) + 0.35, sz); bench.rotation.y = rot; scene.add(bench)
  }
  lamp(world, cx - 11.5, cz + 8.5, '#ffb0a0', 3.2, 16, 15)
  lamp(world, cx + 11.5, cz + 8.5, '#ffb0a0', 3.2, 16, 15)
}
