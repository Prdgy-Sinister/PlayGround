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

export function buildAcademy(world) {
  const scene = world.scene
  const base = world.heightAt(44, -25)
  const g = new THREE.Group(); g.position.set(44, base, -25)
  const stone = '#4d4b5e', stoneLight = '#66637a', roof = '#332a52', purple = '#6a4a9a'

  // main hall
  const hall = new THREE.Mesh(new THREE.BoxGeometry(16, 8.5, 12), std(stone, { rough: 0.96 }))
  hall.position.y = 4.25; g.add(hall)
  const hallTrim = new THREE.Mesh(new THREE.BoxGeometry(16.4, 0.4, 12.4), std(stoneLight))
  hallTrim.position.y = 8.5; g.add(hallTrim)
  const hallRoof = new THREE.Mesh(new THREE.ConeGeometry(11.2, 5.6, 4), std(roof, { rough: 0.9 }))
  hallRoof.rotation.y = Math.PI / 4; hallRoof.position.y = 11.5; g.add(hallRoof)
  // entrance
  const door = new THREE.Mesh(new THREE.BoxGeometry(3.2, 4.6, 0.3), std('#231b30'))
  door.position.set(0, 2.3, 6.1); g.add(door)
  const doorGlow = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 4), new THREE.MeshBasicMaterial({ color: '#8a6ad8', transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false }))
  doorGlow.position.set(0, 2.4, 6.27); g.add(doorGlow)
  for (let i = 0; i < 5; i++) {
    const win = new THREE.Mesh(new THREE.BoxGeometry(1.15, 2.3, 0.15), std('#ffcf83', { emissive: '#b47828', ei: 0.9 }))
    win.position.set(-5.5 + i * 2.75, 5.3, 6.02); g.add(win)
  }
  // towers
  for (const [tx, tz, th] of [[-8.5, -2, 17], [8.5, -3, 14], [-6, 5, 10]]) {
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.6, th, 10), std(stone, { rough: 0.96 }))
    tower.position.set(tx, th / 2, tz); g.add(tower)
    const top = new THREE.Mesh(new THREE.ConeGeometry(3, 4.2, 10), std(roof))
    top.position.set(tx, th + 2.1, tz); g.add(top)
    const spire = new THREE.Mesh(new THREE.ConeGeometry(0.1, 1.2, 5), std('#d9b978', { emissive: '#6b4d19', ei: 0.5 }))
    spire.position.set(tx, th + 4.8, tz); g.add(spire)
    const win = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 1.3), new THREE.MeshBasicMaterial({ color: '#ffcf83', toneMapped: false }))
    win.position.set(tx, th * 0.7, tz + 2.65); g.add(win)
    addGlow(world, g, '#ffc06a', 2.4, tx, th * 0.7, tz + 2.9, 0.5)
  }
  // banners
  for (const bx of [-6.2, 6.2]) {
    const banner = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 4.5), new THREE.MeshStandardMaterial({ color: purple, side: THREE.DoubleSide, emissive: '#3a2458', emissiveIntensity: 0.7, roughness: 0.9 }))
    banner.position.set(bx, 5.4, 6.25); g.add(banner)
    const star = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.6), new THREE.MeshBasicMaterial({ map: world.textures.glow, color: '#e6c987', transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }))
    star.position.set(bx, 6.4, 6.3); g.add(star)
  }
  addGlow(world, g, '#8a6ad8', 12, 0, 10, 0, 0.22)
  scene.add(g)
  world.addCollider(44, -25, 8.7, true, 10.4)
  world.addCollider(35.5, -27, 3.2, true)
  world.addCollider(52.5, -28, 3.2, true)

  // entrance steps
  const steps = new THREE.Group(); steps.position.set(44, base, -18.7)
  for (let i = 0; i < 3; i++) {
    const step = new THREE.Mesh(new THREE.BoxGeometry(6.4 - i * 0.5, 0.22, 1.1), std('#5b586c'))
    step.position.set(0, 0.11 + i * 0.22, i * 0.8); steps.add(step)
  }
  scene.add(steps)

  // courtyard
  const cy = world.heightAt(42, -17)
  const court = new THREE.Mesh(new THREE.CircleGeometry(9, 40), std('#5a5566', { rough: 1 }))
  court.rotation.x = -Math.PI / 2; court.position.set(42, cy + 0.03, -17); scene.add(court)
  const courtRing = new THREE.Mesh(new THREE.RingGeometry(7.7, 8.1, 40), std('#8a7ba8'))
  courtRing.rotation.x = -Math.PI / 2; courtRing.position.set(42, cy + 0.04, -17); scene.add(courtRing)
  // courtyard arches
  for (const [ax, az, rot] of [[35, -12, Math.PI / 2], [49, -12, -Math.PI / 2], [42, -8, 0]]) {
    const arch = new THREE.Group(); arch.position.set(ax, world.heightAt(ax, az), az); arch.rotation.y = rot
    for (const sx of [-1, 1]) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 4.2, 7), std('#625e70'))
      col.position.set(sx * 1.7, 2.1, 0); arch.add(col)
    }
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.42, 0.5), std('#767184'))
    lintel.position.y = 4.2; arch.add(lintel)
    addGlow(world, arch, '#9a7be0', 1.4, 0, 4.25, 0.2, 0.35)
    scene.add(arch)
  }
  // floating candles
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2
    const cx = 42 + Math.cos(a) * (3 + (i % 3) * 1.2)
    const cz = -17 + Math.sin(a) * (3 + (i % 3) * 1.2)
    const cy2 = world.heightAt(cx, cz) + 3 + (i % 4) * 0.7
    const candle = new THREE.Group(); candle.position.set(cx, cy2, cz)
    const wax = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.45, 6), std('#ded3b6', { emissive: '#4a3a22', ei: 0.4 }))
    candle.add(wax)
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.22, 6), new THREE.MeshBasicMaterial({ color: '#ffd08a', toneMapped: false }))
    flame.position.y = 0.32; candle.add(flame)
    addGlow(world, candle, '#ffd08a', 1.2, 0, 0.32, 0, 0.7)
    scene.add(candle)
    world.floating.push({ obj: candle, baseY: cy2, phase: i * 0.9, spin: 0.2 })
  }
  lamp(world, 32.5, -17, '#c9a6ff', 3.4, 18, 16)
  lamp(world, 51.5, -17, '#c9a6ff', 3.4, 18, 16)

  // academy sign at path
  const signPost = new THREE.Group(); signPost.position.set(30, world.heightAt(30, -8), -8)
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 3.6, 6), std('#3a2b22'))
  post.position.y = 1.8; signPost.add(post)
  const board = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.7, 0.16), std('#241a33'))
  board.position.y = 3.1; signPost.add(board)
  const face = new THREE.Mesh(new THREE.PlaneGeometry(3.3, 1.5), new THREE.MeshBasicMaterial({ map: signTexture(['ARCANUM', 'academy of the six schools'], { fg: '#c9a6ff' }), toneMapped: false }))
  face.position.set(0, 3.1, 0.09); signPost.add(face)
  scene.add(signPost)
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
