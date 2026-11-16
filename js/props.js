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
  world.addLightSource(x, y + height - 0.1, z, color, intensity, dist, 1.8)
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
  world.addLightSource(0, y0 + 3.4, 0, 0x8fc8ff, 14, 14, 2)
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

  // outdoor training yard behind the east tower
  const yard = new THREE.Group(); yard.position.set(56, world.heightAt(56, -25), -25); scene.add(yard)
  const yardFloor = new THREE.Mesh(new THREE.CircleGeometry(5.2, 28), std('#555060', { rough: 1 }))
  yardFloor.rotation.x = -Math.PI / 2; yardFloor.position.y = 0.03; yard.add(yardFloor)
  for (const [dx, dz, rot] of [[-1.8, -1.2, 0.4], [1.5, 0.8, -0.9], [2.2, -2.4, 1.7]]) {
    const d = new THREE.Group(); d.position.set(dx, 0, dz); d.rotation.y = rot; yard.add(d)
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.13, 1.7, 6), std('#5a422c'))
    post.position.y = 0.85; d.add(post)
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.6, 4, 7), std('#8a7b62'))
    body.position.y = 1.45; d.add(body)
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), std('#a99778')); head.position.y = 2.03; d.add(head)
    const arms = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.1, 0.1), std('#5a422c')); arms.position.y = 1.55; d.add(arms)
    addGlow(world, d, '#9bf0bf', 1.3, 0, 1.55, 0, 0.28)
  }
  for (const [rx, rz] of [[-4.2, 1.6], [3.7, 2.9]]) {
    const stand = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.5, 1.9), std('#4b3524'))
    stand.position.set(rx, 0.75, rz); yard.add(stand)
    for (let i = 0; i < 3; i++) {
      const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 2.2, 5), std('#8a6a4a'))
      staff.position.set(rx + 0.1, 1.1, rz - 0.55 + i * 0.5); staff.rotation.z = 0.2; yard.add(staff)
    }
  }
  const yardSign = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 1.2), new THREE.MeshBasicMaterial({ map: signTexture(['TRAINING', 'mind the dummies'], { fg: '#9bf0bf' }), toneMapped: false }))
  yardSign.position.set(0, 2.9, 4.3); yardSign.rotation.y = Math.PI; yard.add(yardSign)
  world.addCollider(56, -25, 1.2)
}

/* ============================================================
   ARCANUM INNER HALLS
   A real interior floorplan built on a levelled shelf inside the
   same world. The roof is hidden while the player is inside.
   ============================================================ */
export function buildAcademyInterior(world) {
  const scene = world.scene
  const cx = 42, cz = -58
  const fy = world.academyFloorY
  const g = new THREE.Group(); g.position.set(cx, fy, cz)
  scene.add(g)

  const stone = '#4b495c', stoneDark = '#353344', stoneLight = '#67637a'
  const wood = '#4b3524', woodLight = '#6b4b2e', cloth = '#5b3a78'
  const rugA = '#4a2f63', rugB = '#3a4f63', rugC = '#5c3a3a'
  world.academyRoomZones = []

  const box = (w, h, d, color, x, y, z, opts = {}) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), std(color, opts))
    m.position.set(x, y, z); g.add(m); return m
  }
  const cyl = (rt, rb, h, seg, color, x, y, z, opts = {}) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), std(color, opts))
    m.position.set(x, y, z); g.add(m); return m
  }
  const glow = (color, size, x, y, z, opacity = 0.55) => addGlow(world, g, color, size, x, y, z, opacity)
  const light = (color, x, y, z, intensity = 12, dist = 13) => world.addLightSource(cx + x, fy + y, cz + z, color, intensity, dist, 2)

  // The wall helper creates both geometry and an axis-aligned collider.
  const wall = (x1, z1, x2, z2, h = 6.2, t = 0.55, color = stone) => {
    const w = Math.abs(x2 - x1) || t
    const d = Math.abs(z2 - z1) || t
    const mx = (x1 + x2) / 2, mz = (z1 + z2) / 2
    box(w, h, d, color, mx, h / 2, mz, { rough: 0.97 })
    world.addBoxCollider(cx + mx, cz + mz, w / 2, d / 2)
    // a lighter skirting gives the rooms a finished, lived-in edge
    box(w + 0.08, 0.5, d + 0.08, stoneLight, mx, 0.25, mz, { rough: 0.9 })
  }
  const rug = (w, d, x, z, color, rot = 0) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), std(color, { rough: 1 }))
    m.rotation.x = -Math.PI / 2; m.rotation.z = rot; m.position.set(x, 0.045, z); g.add(m)
  }
  const roomZone = (id, x0, x1, z0, z1) => {
    world.academyRoomZones.push({ id, x0: cx + x0, x1: cx + x1, z0: cz + z0, z1: cz + z1 })
  }
  const label = (text, color, x, y, z) => {
    const sp = world.makeLabel(text, color)
    sp.position.set(x, y, z); sp.scale.set(3.4, 0.85, 1); g.add(sp); return sp
  }
  const candle = (x, y, z, color = '#ffd08a', size = 1.3) => {
    box(0.07, 0.34, 0.07, '#ded3b6', x, y, z, { emissive: '#4a3a22', ei: 0.35 })
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.18, 6), new THREE.MeshBasicMaterial({ color, toneMapped: false }))
    flame.position.set(x, y + 0.26, z); g.add(flame)
    glow(color, size, x, y + 0.26, z, 0.72)
  }
  const desk = (x, z, w = 1.5, d = 0.75, color = woodLight) => {
    box(w, 0.1, d, color, x, 0.92, z)
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(0.08, 0.86, 0.08, wood, x + sx * (w / 2 - 0.1), 0.45, z + sz * (d / 2 - 0.08))
  }
  const bench = (x, z, w = 2.6, rot = 0) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, 0.14, 0.55), std(woodLight))
    b.position.set(x, 0.48, z); b.rotation.y = rot; g.add(b)
    for (const s of [-1, 1]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.45, 0.5), std(wood))
      leg.position.set(x + Math.cos(rot) * s * (w / 2 - 0.2), 0.23, z - Math.sin(rot) * s * (w / 2 - 0.2)); leg.rotation.y = rot; g.add(leg)
    }
  }
  const bed = (x, z, rot = 0) => {
    const b = new THREE.Group(); b.position.set(x, 0, z); b.rotation.y = rot; g.add(b)
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.42, 2.5), std(wood)); base.position.y = 0.3; b.add(base)
    const mat = new THREE.Mesh(new THREE.BoxGeometry(1.44, 0.26, 2.28), std('#c8b9d8')); mat.position.y = 0.62; b.add(mat)
    const cover = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.1, 1.5), std(cloth)); cover.position.set(0, 0.8, 0.35); b.add(cover)
    const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.16, 0.42), std('#e3d8c2')); pillow.position.set(0, 0.8, -0.86); b.add(pillow)
    for (const sx of [-1, 1]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.075, 2.15, 6), std(wood))
      post.position.set(sx * 0.78, 1.1, -1.14); b.add(post)
    }
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.12, 2.6), std(cloth, { emissive: '#2a163d', ei: 0.45 }))
    canopy.position.y = 2.2; b.add(canopy)
    return b
  }
  const bookshelf = (x, z, w = 2.6, h = 2.5, rot = 0) => {
    const s = new THREE.Group(); s.position.set(x, 0, z); s.rotation.y = rot; g.add(s)
    const back = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.22), std(wood)); back.position.y = h / 2; s.add(back)
    for (let i = 0; i < 3; i++) {
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(w, 0.09, 0.42), std(woodLight)); shelf.position.set(0, 0.55 + i * 0.72, 0.08); s.add(shelf)
    }
    for (let i = 0; i < Math.floor(w * 4); i++) {
      const bh = 0.25 + Math.random() * 0.28
      const book = new THREE.Mesh(new THREE.BoxGeometry(0.11 + Math.random() * 0.1, bh, 0.28), std(['#7a3f4a', '#3f5e7a', '#4f7a54', '#6b5e45', '#5b3a78'][i % 5]))
      book.position.set(-w / 2 + 0.2 + i * (w - 0.4) / Math.floor(w * 4), 0.62 + (i % 3) * 0.72 + bh / 2, 0.14)
      book.rotation.z = (Math.random() - 0.5) * 0.08; s.add(book)
    }
    return s
  }
  const dummy = (x, z, rot = 0) => {
    const d = new THREE.Group(); d.position.set(x, 0, z); d.rotation.y = rot; g.add(d)
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.14, 1.7, 6), std(wood)); post.position.y = 0.85; d.add(post)
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.3, 0.65, 4, 7), std('#8a7b62')); body.position.y = 1.45; d.add(body)
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.23, 8, 6), std('#a99778')); head.position.y = 2.06; d.add(head)
    const arms = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.1, 0.1), std(wood)); arms.position.y = 1.55; d.add(arms)
    const target = new THREE.Mesh(new THREE.CircleGeometry(0.3, 20), new THREE.MeshBasicMaterial({ color: '#c9a6ff', transparent: true, opacity: 0.55, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }))
    target.position.set(0, 1.55, 0.31); d.add(target)
    glow('#c9a6ff', 1.3, x, 1.55, z, 0.3)
    return d
  }

  /* -------- shell -------- */
  box(32.2, 0.24, 32.2, stoneDark, 0, -0.1, 0, { rough: 1 })
  box(31.4, 0.08, 31.4, '#5c586c', 0, 0.02, 0, { rough: 1 })
  // outer walls, with a gap for the entrance at the south
  wall(-15.5, 15.5, -3, 15.5)
  wall(3, 15.5, 15.5, 15.5)
  wall(-15.5, -15.5, 15.5, -15.5)
  wall(-15.5, -15.5, -15.5, 15.5)
  wall(15.5, -15.5, 15.5, 15.5)
  // inner walls: north rooms, classrooms, south rooms
  for (const [a, b] of [[-15.5, -12], [-10, -1.5], [1.5, 10], [12, 15.5]]) wall(a, -4.5, b, -4.5, 5.5, 0.45)
  for (const [a, b] of [[-4.5, 1], [3, 10.5], [12.5, 15.5]]) {
    wall(-7.5, a, -7.5, b, 5.5, 0.45)
    wall(7.5, a, 7.5, b, 5.5, 0.45)
  }
  wall(-6.5, -15.5, -6.5, -4.5, 5.5, 0.4)
  wall(6.5, -15.5, 6.5, -4.5, 5.5, 0.4)
  for (const [a, b] of [[-6.5, -1], [1, 6.5]]) wall(a, -10.5, b, -10.5, 4.8, 0.4)
  // door lintels and glowing thresholds
  for (const [x, z, w, rot] of [[-11, -4.5, 2, 0], [0, -4.5, 3, 0], [11, -4.5, 2, 0], [-7.5, 2, 2, 1], [7.5, 2, 2, 1], [-7.5, 11, 2, 1], [7.5, 11, 2, 1], [0, -10.5, 2, 0], [0, 15.5, 6, 0]]) {
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(rot ? 0.7 : w + 1, 0.55, rot ? w + 1 : 0.7), std(stoneLight))
    lintel.position.set(x, 4.5, z); g.add(lintel)
    if (z !== 15.5) glow('#9a7be0', w + 1.1, x, 3.6, z, 0.22)
  }

  /* -------- floors / rugs -------- */
  rug(14, 4.8, 0, -8.5, rugA)
  rug(7.2, 10.5, -11.4, 1.8, rugB)
  rug(7.2, 10.5, 11.4, 1.8, '#3f5a4a')
  rug(8.4, 10.5, -11, -10, '#4a3f5e')
  rug(8.4, 10.5, 11, -10, '#5a4a3f')
  rug(8.2, 5, -11.5, 11.7, rugC)
  rug(8.2, 5, 11.5, 11.7, '#3f5a4a')
  rug(6.5, 6.8, 0, 11.5, '#4a3a5c')

  // central duelling circle and house sigil
  const circle = new THREE.Mesh(new THREE.RingGeometry(4.4, 4.8, 48), std('#9a7be0', { emissive: '#4b2d7a', ei: 0.5 }))
  circle.rotation.x = -Math.PI / 2; circle.position.set(0, 0.06, 2.2); g.add(circle)
  const innerCircle = new THREE.Mesh(new THREE.RingGeometry(2.5, 2.62, 32), new THREE.MeshBasicMaterial({ color: '#d9b978', transparent: true, opacity: 0.38, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }))
  innerCircle.rotation.x = -Math.PI / 2; innerCircle.position.set(0, 0.07, 2.2); g.add(innerCircle)
  glow('#9a7be0', 8, 0, 0.2, 2.2, 0.16)

  /* -------- Grand Hall -------- */
  // long house tables, banners and floating candles
  for (const tz of [-1.2, 5.4]) {
    box(6.6, 0.16, 1.1, woodLight, 0, 0.92, tz)
    for (const sx of [-1, 1]) {
      box(0.18, 0.92, 0.85, wood, sx * 2.9, 0.46, tz)
      bench(-2.1, tz + 0.95, 5.6); bench(2.1, tz - 0.95, 5.6)
    }
  }
  for (const [bx, bz] of [[-7.2, -3.9], [0, -3.9], [7.2, -3.9]]) {
    const banner = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 3.6), std(cloth, { side: THREE.DoubleSide, emissive: '#2a163d', ei: 0.6 }))
    banner.position.set(bx, 3.1, bz + 0.06); g.add(banner)
    glow('#e6c987', 1.1, bx, 4.2, bz + 0.1, 0.6)
  }
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2
    candle(Math.cos(a) * 4.5, 3.4 + (i % 3) * 0.4, 2.2 + Math.sin(a) * 4.5)
  }
  label('GRAND HALL', '#e6c987', 0, 4.8, -3.6)
  glow('#ffd08a', 11, 0, 3.4, 2.2, 0.18)
  light('#ffcf83', 0, 4.2, 2.2, 24, 22)

  // assignment board
  box(2.1, 1.5, 0.16, '#241a33', -4.7, 2.5, -4.1)
  box(2.25, 1.65, 0.08, woodLight, -4.7, 2.5, -4.2)
  const board = new THREE.Mesh(new THREE.PlaneGeometry(1.85, 1.25), new THREE.MeshBasicMaterial({ map: signTexture(['ASSIGNMENTS', 'first-year notices'], { fg: '#e6c987' }), toneMapped: false }))
  board.position.set(-4.7, 2.5, -4.0); g.add(board)
  glow('#e6c987', 1.6, -4.7, 2.5, -3.95, 0.35)

  /* -------- Charms classroom -------- */
  for (const dz of [-2.7, 0.1, 2.9]) {
    for (const dx of [-13.2, -10.4]) {
      desk(dx, dz, 1.55, 0.8)
      candle(dx + 0.55, 1.02, dz - 0.18, '#ffd08a', 0.8)
    }
  }
  box(0.14, 2.3, 4.6, '#1f2f28', -15.05, 2.7, 1.8, { emissive: '#0d1f18', ei: 0.5 })
  const board2 = new THREE.Mesh(new THREE.PlaneGeometry(4.1, 2.0), new THREE.MeshBasicMaterial({ map: signTexture(['CHARMS', 'the wrist remembers'], { bg: '#14231d', fg: '#9be8d8', sub: '#6fbfa8' }), toneMapped: false }))
  board2.position.set(-14.96, 2.7, 1.8); board2.rotation.y = Math.PI / 2; g.add(board2)
  desk(-9.2, 6.2, 2.1, 0.9)
  candle(-9.2, 1.1, 6.2, '#9be8d8', 1.1)
  label('CHARMS', '#9be8d8', -11.4, 4.2, -4.0)
  light('#78e6a8', -11.5, 3.4, 1.5, 14, 13)
  glow('#9be8d8', 6, -11.5, 2.6, 1.5, 0.12)

  /* -------- Potion laboratory -------- */
  for (const [px, pz] of [[10.1, -2.8], [13.6, -0.6], [10.4, 2.1], [13.4, 4.4], [9.2, 5.8]]) {
    const pot = new THREE.Group(); pot.position.set(px, 0, pz); g.add(pot)
    const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.55, 14, 10, 0, Math.PI * 2, Math.PI * 0.45, Math.PI * 0.55), std('#2e2a36', { metal: 0.4, rough: 0.5 }))
    bowl.position.y = 0.55; pot.add(bowl)
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.055, 5, 20), std('#4a4554', { metal: 0.5 }))
    rim.rotation.x = Math.PI / 2; rim.position.y = 0.78; pot.add(rim)
    const brew = new THREE.Mesh(new THREE.CircleGeometry(0.43, 20), new THREE.MeshBasicMaterial({ color: '#78e6a8', transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false }))
    brew.rotation.x = -Math.PI / 2; brew.position.y = 0.76; pot.add(brew)
    glow('#78e6a8', 1.5, px, 0.9, pz, 0.45)
    for (let i = 0; i < 3; i++) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 0.55, 5), std('#2e2a36'))
      leg.position.set(px + Math.cos(i * 2.1) * 0.36, 0.22, pz + Math.sin(i * 2.1) * 0.36); g.add(leg)
    }
  }
  for (const sz of [-2.5, 0.5, 3.5, 6.3]) bookshelf(14.9, sz, 2.2, 2.6, -Math.PI / 2)
  desk(10.4, 7.0, 2.0, 0.85)
  candle(10.4, 1.1, 7.0, '#9bf0bf', 1.0)
  label('POTIONS', '#9bf0bf', 11.5, 4.2, -4.0)
  light('#78e6a8', 11.5, 3.2, 2.0, 18, 15)
  glow('#78e6a8', 7, 11.5, 2.0, 2.0, 0.14)

  /* -------- Restricted library -------- */
  for (const sz of [-14.6, -12, -9.4, -6.8]) bookshelf(-15, sz, 2.6, 2.8, Math.PI / 2)
  bookshelf(-12.8, -14.9, 3.2, 2.8, 0)
  bookshelf(-9.2, -14.9, 2.6, 2.8, 0)
  for (const [tx, tz] of [[-11.5, -11.9], [-8.6, -8.3]]) {
    desk(tx, tz, 2.2, 1.0)
    candle(tx + 0.7, 1.1, tz - 0.2, '#ffd08a', 0.9)
  }
  const readingCircle = new THREE.Mesh(new THREE.RingGeometry(1.2, 1.28, 28), new THREE.MeshBasicMaterial({ color: '#9fd8ff', transparent: true, opacity: 0.3, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }))
  readingCircle.rotation.x = -Math.PI / 2; readingCircle.position.set(-11, 0.06, -10); g.add(readingCircle)
  label('LIBRARY', '#9fd8ff', -11, 4.2, -4.9)
  light('#9fd8ff', -11, 3.2, -10, 14, 14)
  glow('#9fd8ff', 6, -11, 2.4, -10, 0.12)
  // the shelf that is trying to look innocent
  bookshelf(-15.02, -6.3, 2.8, 2.9, Math.PI / 2)
  glow('#d9b978', 1.7, -14.8, 1.8, -6.3, 0.38)

  /* -------- Wand studies -------- */
  for (const [wx, wz] of [[9.2, -13.4], [13.8, -10.8], [9.3, -7.2]]) {
    box(2.4, 0.14, 1.2, woodLight, wx, 0.95, wz)
    for (const sx of [-1, 1]) box(0.12, 0.95, 0.9, wood, wx + sx * 1.02, 0.48, wz)
    for (let i = 0; i < 4; i++) {
      const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.32, 7), std('#8fa8b8', { transparent: true, opacity: 0.5 }))
      jar.position.set(wx - 0.75 + i * 0.5, 1.18, wz + 0.25); g.add(jar)
      const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.09, 0), new THREE.MeshBasicMaterial({ color: ['#ff8a66', '#78b9ff', '#9bf0bf', '#d886ff'][i], toneMapped: false }))
      core.position.copy(jar.position); g.add(core)
    }
    candle(wx + 0.75, 1.1, wz - 0.2, '#d9b978', 0.8)
  }
  // resonance lens on a brass stand
  const lensStand = cyl(0.08, 0.16, 1.5, 7, '#8a7a5a', 12.6, 0.75, -5.6, { metal: 0.6 })
  const lens = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.06, 6, 24), std('#d9b978', { metal: 0.7, emissive: '#6b4d19', ei: 0.4 }))
  lens.position.set(12.6, 1.58, -5.6); lens.rotation.x = Math.PI / 2; g.add(lens)
  glow('#e6c987', 2.2, 12.6, 1.58, -5.6, 0.5)
  label('WAND STUDIES', '#d9b978', 11, 4.2, -4.9)
  light('#d9b978', 11, 3.2, -9, 15, 14)
  glow('#d9b978', 6, 11, 2.4, -9, 0.12)

  /* -------- Ravenwood dorms -------- */
  // common room
  box(2.1, 0.14, 2.7, '#4a3a2e', 3.8, 0.6, -7.2)
  box(2.1, 0.5, 0.24, '#5a4634', 3.8, 0.9, -8.5)
  box(2.1, 0.5, 0.24, '#5a4634', 3.8, 0.9, -5.9)
  rug(5.4, 4.2, 1, -7.2, '#5a3a4a')
  // fireplace
  box(2.6, 2.2, 0.6, '#4a4554', 5.7, 1.1, -4.9)
  box(1.7, 1.2, 0.45, '#1b1418', 5.7, 0.72, -4.6)
  glow('#ff9a5a', 2.8, 5.7, 0.7, -4.4, 0.7)
  light('#ff9a5a', 5.4, 1.2, -4.6, 14, 10)
  // beds and personal bedroom
  bed(-4.3, -12.7, 0)
  bed(3.6, -12.7, 0)
  bed(0, -8.1, Math.PI)
  desk(3.9, -14.1, 1.8, 0.75)
  box(1.2, 2.4, 0.55, wood, -5.6, 1.2, -8.8)
  candle(-5.6, 2.1, -8.5, '#ffd08a', 0.8)
  label('RAVENWOOD DORMS', '#c79bff', 0, 4.2, -4.9)
  label('YOUR ROOM', '#e6c987', 0, 4.0, -10.2)
  light('#c79bff', 0, 3.2, -10, 13, 14)
  glow('#c79bff', 6, 0, 2.4, -10, 0.12)
  // window of stars
  const window = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.8), new THREE.MeshBasicMaterial({ color: '#7aa8ff', transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false }))
  window.position.set(3.2, 2.7, -15.44); g.add(window)
  glow('#9fd8ff', 2.2, 3.2, 2.7, -15.2, 0.3)

  /* -------- Indoor duelling chamber -------- */
  const duelRing = new THREE.Mesh(new THREE.RingGeometry(2.45, 2.7, 40), std('#c9a6ff', { emissive: '#5b3a8a', ei: 0.6 }))
  duelRing.rotation.x = -Math.PI / 2; duelRing.position.set(-11.5, 0.06, 11.7); g.add(duelRing)
  const duelRing2 = new THREE.Mesh(new THREE.RingGeometry(1.2, 1.28, 6), new THREE.MeshBasicMaterial({ color: '#d9b978', transparent: true, opacity: 0.38, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }))
  duelRing2.rotation.x = -Math.PI / 2; duelRing2.position.set(-11.5, 0.07, 11.7); g.add(duelRing2)
  glow('#c9a6ff', 5.5, -11.5, 0.2, 11.7, 0.2)
  for (const [px, pz] of [[-14.6, 8.6], [-8.4, 8.6], [-14.6, 14.7], [-8.4, 14.7]]) {
    cyl(0.26, 0.34, 3.4, 7, stoneLight, px, 1.7, pz)
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), new THREE.MeshBasicMaterial({ color: '#c9a6ff', toneMapped: false }))
    orb.position.set(px, 3.55, pz); g.add(orb)
    glow('#c9a6ff', 1.4, px, 3.55, pz, 0.55)
  }
  bench(-11.5, 14.7, 5.6)
  bench(-11.5, 8.5, 3.8)
  label('DUELLING CHAMBER', '#c9a6ff', -11.5, 4.2, 8.2)
  light('#c9a6ff', -11.5, 3.4, 11.5, 16, 14)

  /* -------- Training room -------- */
  for (const [dx, dz, rot] of [[10, 9.2, 0.5], [13.4, 11.4, -0.7], [9.4, 13.7, 2.2]]) dummy(dx, dz, rot)
  for (const [rx, rz] of [[13.8, 8.9], [8.6, 10.8]]) {
    box(0.15, 1.5, 2.2, wood, rx, 0.9, rz)
    for (let i = 0; i < 3; i++) {
      const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 2.4, 5), std('#8a6a4a'))
      staff.position.set(rx + 0.1, 1.2, rz - 0.6 + i * 0.55); staff.rotation.z = 0.22; g.add(staff)
    }
  }
  rug(5.6, 4.6, 11.5, 11.6, '#3f5a4a')
  label('TRAINING GROUNDS', '#9bf0bf', 11.5, 4.2, 8.2)
  light('#9bf0bf', 11.5, 3.2, 11.5, 13, 12)

  /* -------- Entrance foyer -------- */
  for (const sx of [-2.3, 2.3]) {
    cyl(0.24, 0.3, 3.8, 7, stoneLight, sx, 1.9, 13.2)
    candle(sx, 3.0, 13.2, '#ffd08a', 1.2)
  }
  const door = new THREE.Mesh(new THREE.BoxGeometry(5.4, 4.2, 0.2), std('#2a2038', { emissive: '#3a2458', ei: 0.4 }))
  door.position.set(0, 2.1, 15.35); g.add(door)
  glow('#9a7be0', 5, 0, 2.2, 15.2, 0.35)
  label('INNER HALLS', '#e6c987', 0, 4.3, 14.8)
  glow('#ffd08a', 4, 0, 2.8, 12, 0.16)

  /* -------- room discovery zones -------- */
  roomZone('grand_hall', -7.5, 7.5, -4.5, 8)
  roomZone('charms', -15.5, -7.5, -4.5, 8)
  roomZone('potions', 7.5, 15.5, -4.5, 8)
  roomZone('library', -15.5, -6.5, -15.5, -4.5)
  roomZone('dorms', -6.5, 6.5, -10.5, -4.5)
  roomZone('bedroom', -6.5, 6.5, -15.5, -10.5)
  roomZone('wand_studies', 6.5, 15.5, -15.5, -4.5)
  roomZone('duel_room', -15.5, -7.5, 8, 15.5)
  roomZone('training', 7.5, 15.5, 8, 15.5)

  /* -------- removable roof / exterior silhouette -------- */
  const roof = new THREE.Group(); roof.position.set(cx, fy, cz); scene.add(roof)
  const roofMat = std('#332a52', { rough: 0.9 })
  const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(33.2, 0.45, 33.2), roofMat)
  roofSlab.position.y = 6.75; roof.add(roofSlab)
  const roofPeak = new THREE.Mesh(new THREE.ConeGeometry(18.4, 5.2, 4), std('#3a2f5e', { rough: 0.92 }))
  roofPeak.rotation.y = Math.PI / 4; roofPeak.position.y = 9.5; roof.add(roofPeak)
  for (const [tx, tz] of [[-13, 13], [13, 13], [-13, -13], [13, -13]]) {
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.5, 10.4, 8), std(stone, { rough: 0.97 }))
    tower.position.set(tx, 4.2, tz); roof.add(tower)
    const top = new THREE.Mesh(new THREE.ConeGeometry(2.9, 4.1, 8), std('#332a52'))
    top.position.set(tx, 11.4, tz); roof.add(top)
    const win = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 1.25), new THREE.MeshBasicMaterial({ color: '#ffcf83', toneMapped: false }))
    win.position.set(tx, 7.1, tz + 2.22); roof.add(win)
    addGlow(world, roof, '#ffc06a', 2.2, tx, 7.1, tz + 2.4, 0.45)
  }
  // exterior entrance facade, visible from the courtyard side
  const facade = new THREE.Mesh(new THREE.BoxGeometry(8.4, 1.1, 0.8), std(stoneLight))
  facade.position.set(0, 4.7, 15.7); roof.add(facade)
  world.academyRoof = roof

  /* -------- secret Room of Echoes (attached east of the library) -------- */
  const vx = 62, vz = -62
  const vg = new THREE.Group(); vg.position.set(vx, fy, vz); scene.add(vg)
  world.academyRoomZones.push({ id: 'vault', x0: vx - 4.8, x1: vx + 4.8, z0: vz - 4.8, z1: vz + 4.8 })
  const vbox = (w, h, d, color, x, y, z, opts = {}) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), std(color, opts)); m.position.set(x, y, z); vg.add(m); return m }
  vbox(9.8, 0.2, 9.8, '#2b2735', 0, -0.08, 0, { rough: 1 })
  vbox(9.4, 0.06, 9.4, '#3a3448', 0, 0.03, 0, { rough: 1 })
  for (const [x, z, w, d] of [[0, -4.7, 9.8, 0.5], [0, 4.7, 9.8, 0.5], [-4.7, 0, 0.5, 9.8], [4.7, 0, 0.5, 9.8]]) {
    vbox(w, 6, d, stoneDark, x, 3, z, { rough: 0.97 })
    world.addBoxCollider(vx + x, vz + z, w / 2, d / 2)
  }
  // broken wand reliquary
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, 1.2, 8), std('#4a4554'))
  pedestal.position.set(0, 0.6, -1.4); vg.add(pedestal)
  const reliquary = new THREE.Mesh(new THREE.OctahedronGeometry(0.52, 0), new THREE.MeshStandardMaterial({ color: '#d9b978', emissive: '#9a7be0', emissiveIntensity: 1.1, roughness: 0.25, metalness: 0.4 }))
  reliquary.position.set(0, 1.55, -1.4); vg.add(reliquary)
  addGlow(world, vg, '#c9a6ff', 4.2, 0, 1.55, -1.4, 0.6)
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    const shard = new THREE.Mesh(new THREE.TetrahedronGeometry(0.12 + (i % 2) * 0.05, 0), new THREE.MeshBasicMaterial({ color: '#d9b978', transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false }))
    shard.position.set(Math.cos(a) * 1.5, 1.1 + (i % 3) * 0.35, -1.4 + Math.sin(a) * 1.5); vg.add(shard)
    world.floating.push({ obj: shard, baseY: shard.position.y, phase: i * 0.9, spin: 0.7, sway: 0.2, local: true })
  }
  for (const sz of [-4.5, -2, 0.5, 3]) {
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.6, 2.2), std(wood))
    shelf.position.set(-4.4, 1.3, sz); vg.add(shelf)
    for (let i = 0; i < 4; i++) {
      const book = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.25, 0.32), std(['#6b3f4a', '#3f5e7a', '#4f7a54'][i % 3]))
      book.position.set(-4.2, 0.7 + (i % 3) * 0.7, sz - 0.6 + (i % 2) * 0.5); vg.add(book)
    }
  }
  for (const [cx2, cz2] of [[-2.8, 1.9], [2.6, 2.2], [2.2, -3.2]]) {
    const candle2 = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.4, 6), std('#ded3b6'))
    candle2.position.set(cx2, 0.2, cz2); vg.add(candle2)
    addGlow(world, vg, '#ffd08a', 1.3, cx2, 0.5, cz2, 0.6)
  }
  world.addLightSource(vx, fy + 3, vz, 0xc9a6ff, 20, 15, 2)
  addGlow(world, vg, '#c9a6ff', 9, 0, 2.2, 0, 0.13)
  const vaultLabel = world.makeLabel('THE ROOM OF ECHOES', '#e6c987')
  vaultLabel.position.set(0, 4.3, 4.1); vaultLabel.scale.set(4.4, 0.9, 1); vg.add(vaultLabel)

  /* -------- interactable thresholds and stations -------- */
  const I = world.interactables
  const addI = o => I.push(o)
  // courtyard arch → inner halls
  const arch = new THREE.Group(); arch.position.set(cx, world.heightAt(cx, -9.4), -9.4); scene.add(arch)
  for (const sx of [-2.1, 2.1]) {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.46, 5.2, 8), std('#625e70'))
    col.position.set(sx, 2.6, 0); arch.add(col)
    addGlow(world, arch, '#c9a6ff', 2.0, sx, 3.4, 0.4, 0.4)
  }
  const archTop = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.6, 0.7), std('#767184'))
  archTop.position.y = 5.2; arch.add(archTop)
  const portal = new THREE.Mesh(new THREE.CircleGeometry(1.9, 28), new THREE.MeshBasicMaterial({ color: '#9a7be0', transparent: true, opacity: 0.26, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }))
  portal.position.set(0, 2.5, 0.06); arch.add(portal)
  addGlow(world, arch, '#9a7be0', 5, 0, 2.5, 0.2, 0.4)
  world.addLightSource(cx, world.heightAt(cx, -9.4) + 3, -9.4, 0x9a7be0, 18, 14, 2)

  addI({ id:'enter_halls', label:'Enter Arcanum’s Inner Halls', pos:[cx, -9.4], r:3.4, action:'enter', target:[cx, -53.5], room:'grand_hall' })
  addI({ id:'leave_halls', label:'Return to the Courtyard', pos:[cx, -44.4], r:2.6, action:'enter', target:[cx, -8.6], room:'courtyard' })
  addI({ id:'assignment_board', label:'Read the Assignment Board', pos:[cx - 4.7, -55.9], r:2.5, action:'academy' })
  addI({ id:'brew_station', label:'Brew a Restorative Draught', pos:[cx + 9.5, -60.2], r:2.8, action:'brew' })
  addI({ id:'dorm_bed', label:'Rest in your room', pos:[cx + 1.8, -70.2], r:2.4, action:'rest' })
  addI({ id:'library_shelf', label:'Examine the humming shelf', pos:[27.2, -64.3], r:2.3, action:'secret', target:[62, -58.5], secret:'vault', requiresClue:'clue_library' })
  addI({ id:'dorm_tapestry', label:'Slip behind the tapestry', pos:[46.8, -65.2], r:2.0, action:'passage', target:[cx + 11, -58.5], secret:'dorm_passage', requiresClue:'clue_dorm' })
  addI({ id:'return_shelf', label:'Return through the shelf', pos:[62, -58.5], r:2.3, action:'enter', target:[27.8, -64.3], room:'library' })
  addI({ id:'wand_lens', label:'Peer through the resonance lens', pos:[54.6, -63.6], r:2.2, action:'wand' })
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
      world.addLightSource(px, py + 4.8, pz, 0x9a7be0, 9, 13, 2)
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
