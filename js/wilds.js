/* ============================================================
   WANDLORE — wilds.js
   Whispering Wood, Elder Ruins, Glimmer Cavern, Hollow Spire,
   NPC models, magical creatures and gatherable ingredient nodes.
   ============================================================ */
import * as THREE from 'three'
import { NPCS, NODES, WOODS, CORES, RARITIES } from './data.js'
import { std, addGlow, lamp } from './props.js'

const woodById = Object.fromEntries(WOODS.map(w => [w.id, w]))
const coreById = Object.fromEntries(CORES.map(c => [c.id, c]))
const matById = { ...woodById, ...coreById }

/* ---------------------------------------------------------- FOREST */
export function buildForest(world) {
  const scene = world.scene

  // pond
  const px = -31, pz = 44
  const water = new THREE.Mesh(new THREE.CircleGeometry(8.4, 40), new THREE.MeshStandardMaterial({ color: '#1d4e5c', roughness: 0.12, metalness: 0.45, transparent: true, opacity: 0.92, emissive: '#0d2b33', emissiveIntensity: 0.8 }))
  water.rotation.x = -Math.PI / 2; water.position.set(px, -0.5, pz); scene.add(water)
  const rim = new THREE.Mesh(new THREE.RingGeometry(8.2, 9.1, 40), std('#3c4b3c', { rough: 1 }))
  rim.rotation.x = -Math.PI / 2; rim.position.set(px, -0.45, pz); scene.add(rim)
  for (let i = 0; i < 9; i++) {
    const a = Math.random() * Math.PI * 2, r = 2 + Math.random() * 5.4
    const pad = new THREE.Mesh(new THREE.CircleGeometry(0.3 + Math.random() * 0.35, 8), std('#3f6b48'))
    pad.rotation.x = -Math.PI / 2
    pad.position.set(px + Math.cos(a) * r, -0.44, pz + Math.sin(a) * r); scene.add(pad)
  }
  for (let i = 0; i < 30; i++) {
    const a = Math.random() * Math.PI * 2, r = 9 + Math.random() * 4
    const h = world.heightAt(px + Math.cos(a) * r, pz + Math.sin(a) * r)
    const reed = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.04, 1.2 + Math.random(), 4), std('#5c7a4a'))
    reed.position.set(px + Math.cos(a) * r, h + 0.6, pz + Math.sin(a) * r); scene.add(reed)
  }
  const pl = new THREE.PointLight(0x5fd8c4, 20, 26, 2); pl.position.set(px, 2, pz); scene.add(pl)
  addGlow(world, scene, '#5fd8c4', 12, px, 0.4, pz, 0.18)

  // giant elder tree
  const gx = -63, gz = 27, gh = world.heightAt(gx, gz)
  const giant = new THREE.Group(); giant.position.set(gx, gh, gz)
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 2.2, 10, 9), std('#3d302c', { rough: 1 }))
  trunk.position.y = 5; giant.add(trunk)
  const root1 = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.7, 4.5, 6), std('#3a2c28'))
  root1.rotation.z = 0.7; root1.position.set(2.2, 0.9, 0.6); giant.add(root1)
  const root2 = root1.clone(); root2.rotation.z = -0.6; root2.position.set(-2.1, 0.8, -0.9); giant.add(root2)
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2
    const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(2.6 + Math.random() * 1.4, 0), std(i % 2 ? '#314a34' : '#3b5740', { flat: true }))
    crown.position.set(Math.cos(a) * 2.5, 10 + Math.random() * 2, Math.sin(a) * 2.5); giant.add(crown)
  }
  addGlow(world, giant, '#b9ffb0', 5, 0, 10.5, 0, 0.22)
  world.scene.add(giant)
  world.addCollider(gx, gz, 2.4)
  world.floating.push({ obj: giant, baseY: gh, phase: 0, spin: 0, sway: 0.004 })

  // glowing mushrooms
  const colors = ['#6fe8d4', '#b78aff', '#8affb0']
  for (let i = 0; i < 40; i++) {
    const a = Math.random() * Math.PI * 2
    const r = 10 + Math.random() * 30
    const mx = -46 + Math.cos(a) * r, mz = 16 + Math.sin(a) * r
    if (Math.hypot(mx - px, mz - pz) < 10) continue
    const h = world.heightAt(mx, mz)
    const cluster = new THREE.Group(); cluster.position.set(mx, h, mz)
    for (let j = 0; j < 3; j++) {
      const mh = 0.3 + Math.random() * 0.8
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.05, mh, 5), std('#d8d0b0'))
      stem.position.set((Math.random() - .5) * .5, mh / 2, (Math.random() - .5) * .5); cluster.add(stem)
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.18 + Math.random() * 0.1, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: colors[i % 3], emissive: colors[i % 3], emissiveIntensity: 1.5, roughness: 0.6 }))
      cap.position.set(stem.position.x, mh, stem.position.z); cluster.add(cap)
    }
    addGlow(world, cluster, colors[i % 3], 1.6, 0, 0.5, 0, 0.35)
    scene.add(cluster)
  }

  // stone circle
  const scx = -46, scz = 33
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2
    const sx = scx + Math.cos(a) * 5, sz = scz + Math.sin(a) * 5
    const sh = world.heightAt(sx, sz)
    const stone = new THREE.Mesh(new THREE.BoxGeometry(0.9, 2 + (i % 3) * 0.5, 0.5), std('#5a5a52', { rough: 1 }))
    stone.position.set(sx, sh + 1.1, sz); stone.rotation.y = a + Math.PI / 2; stone.rotation.z = (i % 2 ? 1 : -1) * 0.06
    scene.add(stone)
    addGlow(world, scene, '#8affb0', 1.4, sx, sh + 2.3, sz, 0.22)
  }
  const scRing = new THREE.Mesh(new THREE.RingGeometry(4.7, 4.9, 32), new THREE.MeshBasicMaterial({ color: '#7affb0', transparent: true, opacity: 0.18, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }))
  scRing.rotation.x = -Math.PI / 2; scRing.position.set(scx, world.heightAt(scx, scz) + 0.05, scz); scene.add(scRing)

  // fallen log
  const lx = -36, lz = 27, lh = world.heightAt(lx, lz)
  const log = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 5.5, 8), std('#4d3a2b', { rough: 1 }))
  log.rotation.z = Math.PI / 2; log.rotation.y = 0.5; log.position.set(lx, lh + 0.55, lz); scene.add(log)
  for (const off of [-1.2, 1.4]) {
    const shroom = new THREE.Mesh(new THREE.SphereGeometry(0.22, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: '#8affe0', emissive: '#3fd8b0', emissiveIntensity: 1.2 }))
    shroom.position.set(lx + off, lh + 1.1, lz + 0.1); scene.add(shroom)
  }
  lamp(world, -40, 10, '#8affb0', 2.4, 10, 13)
}

/* ---------------------------------------------------------- RUINS */
export function buildRuins(world) {
  const scene = world.scene
  const cx = 14, cz = 60
  const base = world.heightAt(cx, cz)
  const floor = new THREE.Mesh(new THREE.CircleGeometry(13, 36), std('#5d5548', { rough: 1 }))
  floor.rotation.x = -Math.PI / 2; floor.position.set(cx, base + 0.03, cz); scene.add(floor)
  const ring = new THREE.Mesh(new THREE.RingGeometry(9.8, 10.2, 48), std('#7a6c57'))
  ring.rotation.x = -Math.PI / 2; ring.position.set(cx, base + 0.04, cz); scene.add(ring)
  const rune = new THREE.Mesh(new THREE.RingGeometry(6.8, 7.05, 6), new THREE.MeshBasicMaterial({ color: '#e2a76a', transparent: true, opacity: 0.32, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }))
  rune.rotation.x = -Math.PI / 2; rune.position.set(cx, base + 0.05, cz); scene.add(rune)

  // columns
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2
    if (i === 2) continue
    const px = cx + Math.cos(a) * (10 + (i % 3) * 0.7), pz = cz + Math.sin(a) * (10 + (i % 2) * 0.9)
    const h = world.heightAt(px, pz)
    const height = 2.4 + ((i * 7) % 5) * 1.1
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.62, height, 8), std(i % 3 ? '#7c705d' : '#675d4e', { rough: 1 }))
    col.position.set(px, h + height / 2, pz); scene.add(col)
    if (i % 4 === 1) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.35, 1.5), std('#8a7d66'))
      cap.position.set(px, h + height + 0.17, pz); cap.rotation.y = a; scene.add(cap)
    }
    world.addCollider(px, pz, 0.7)
  }
  // grand arch
  const arch = new THREE.Group(); arch.position.set(cx, world.heightAt(cx, 67), 67)
  for (const sx of [-1, 1]) {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.8, 7, 9), std('#7a6d58', { rough: 1 }))
    col.position.set(sx * 3.2, 3.5, 0); arch.add(col)
    const cap = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.5, 1.9), std('#8a7c65'))
    cap.position.set(sx * 3.2, 7.1, 0); arch.add(cap)
  }
  const lintel = new THREE.Mesh(new THREE.BoxGeometry(8, 1, 1.4), std('#8a7c65'))
  lintel.position.y = 7.8; arch.add(lintel)
  const keystone = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 0), new THREE.MeshBasicMaterial({ color: '#e2a76a', toneMapped: false }))
  keystone.position.y = 8.4; arch.add(keystone)
  addGlow(world, arch, '#e2a76a', 3, 0, 8.4, 0, 0.5)
  scene.add(arch)
  world.addCollider(cx - 3.2, 67, 1); world.addCollider(cx + 3.2, 67, 1)

  // altar
  const ax = 14, az = 65
  const altar = new THREE.Group(); altar.position.set(ax, world.heightAt(ax, az), az)
  const step = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.9, 0.4, 8), std('#6b6151'))
  step.position.y = 0.2; altar.add(step)
  const block = new THREE.Mesh(new THREE.BoxGeometry(2.3, 1.2, 1.3), std('#8b7e67'))
  block.position.y = 0.95; altar.add(block)
  const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.4, 0.45, 8), std('#b9a77f', { metal: 0.5 }))
  bowl.position.y = 1.75; altar.add(bowl)
  addGlow(world, altar, '#ff9a4d', 4, 0, 2.2, 0, 0.55)
  scene.add(altar)
  world.addCollider(ax, az, 1.6)
  world.altarPos = new THREE.Vector3(ax, world.heightAt(ax, az) + 2.1, az)
  world.floating.push({ obj: arch, baseY: arch.position.y, phase: 1, spin: 0, sway: 0.002 })
  lamp(world, 21, 55, '#e2a76a', 2.6, 12, 15)

  // floating rubble
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2
    const rx = cx + Math.cos(a) * (4 + (i % 3) * 1.7)
    const rz = cz + 4 + Math.sin(a) * (3 + (i % 2) * 1.4)
    const ry = world.heightAt(rx, rz) + 2.5 + (i % 4) * 1.1
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32 + (i % 3) * 0.14, 0), std('#7b7060'))
    rock.position.set(rx, ry, rz); scene.add(rock)
    world.floating.push({ obj: rock, baseY: ry, phase: i * 1.3, spin: 0.3, sway: 0.22 })
  }
}

/* ---------------------------------------------------------- CAVERN */
export function buildCavern(world) {
  const scene = world.scene
  const cx = -62, cz = -44
  const base = world.heightAt(cx, cz)
  const floor = new THREE.Mesh(new THREE.CircleGeometry(19, 36), std('#3c3744', { rough: 1 }))
  floor.rotation.x = -Math.PI / 2; floor.position.set(cx, base + 0.03, cz); scene.add(floor)

  // entrance rocks
  for (const [rx, rz, s, rot] of [[-48, -36, 3.5, 0.6], [-48, -51, 3.9, -0.5], [-61, -57, 4.2, 0.3], [-75, -35, 3.6, 1.1], [-70, -56, 3.1, 0.9]]) {
    const h = world.heightAt(rx, rz)
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), std(s > 3.5 ? '#4a4552' : '#565062', { rough: 1 }))
    rock.position.set(rx, h + s * 0.55, rz); rock.rotation.set(rot, rot * 2, rot * 0.5); scene.add(rock)
    world.addCollider(rx, rz, s * 0.7)
  }
  const archRock = new THREE.Mesh(new THREE.DodecahedronGeometry(4.6, 0), std('#4a4552', { rough: 1 }))
  archRock.scale.set(1.4, 2.3, 1)
  archRock.position.set(-57, base + 8, -49); scene.add(archRock)

  // crystals
  const crystalColors = ['#7ad8e8', '#b79aff', '#8affe0']
  for (let i = 0; i < 26; i++) {
    const a = Math.random() * Math.PI * 2, r = 4 + Math.random() * 14
    const px = cx + Math.cos(a) * r, pz = cz + Math.sin(a) * r
    const h = world.heightAt(px, pz)
    const hh = 0.8 + Math.random() * 2.6
    const crystal = new THREE.Mesh(new THREE.ConeGeometry(0.28 + Math.random() * 0.4, hh, 5), new THREE.MeshStandardMaterial({ color: crystalColors[i % 3], emissive: crystalColors[i % 3], emissiveIntensity: 0.8, roughness: 0.2, metalness: 0.3, flatShading: true }))
    crystal.position.set(px, h + hh / 2, pz); crystal.rotation.z = (Math.random() - .5) * 0.3
    scene.add(crystal)
    addGlow(world, scene, crystalColors[i % 3], 1.2 + hh, px, h + hh * 0.7, pz, 0.25)
  }
  // stalagmite clusters
  for (let i = 0; i < 12; i++) {
    const a = Math.random() * Math.PI * 2, r = 6 + Math.random() * 12
    const px = cx + Math.cos(a) * r, pz = cz + Math.sin(a) * r
    const h = world.heightAt(px, pz)
    const hh = 2 + Math.random() * 4
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.7 + Math.random() * 0.7, hh, 6), std('#565062', { rough: 1 }))
    spike.position.set(px, h + hh / 2, pz); scene.add(spike)
  }
  const light1 = new THREE.PointLight(0x7ad8e8, 30, 30, 2); light1.position.set(cx - 4, base + 4, cz); scene.add(light1)
  const light2 = new THREE.PointLight(0xb79aff, 22, 26, 2); light2.position.set(cx + 8, base + 3, cz - 6); scene.add(light2)
  addGlow(world, scene, '#7ad8e8', 20, cx, base + 3, cz, 0.1)
}

/* ---------------------------------------------------------- SPIRE */
export function buildSpire(world) {
  const scene = world.scene
  const cx = 76, cz = 60
  const base = world.heightAt(cx, cz)
  const floor = new THREE.Mesh(new THREE.CircleGeometry(17, 32), std('#2a2430', { rough: 1 }))
  floor.rotation.x = -Math.PI / 2; floor.position.set(cx, base + 0.03, cz); scene.add(floor)
  const ring = new THREE.Mesh(new THREE.RingGeometry(13.4, 13.9, 48), new THREE.MeshBasicMaterial({ color: '#ff5f7a', transparent: true, opacity: 0.28, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }))
  ring.rotation.x = -Math.PI / 2; ring.position.set(cx, base + 0.05, cz); scene.add(ring)

  // tower
  const tower = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 5.4, 26, 8), std('#1e1926', { rough: 0.9 }))
  tower.position.set(cx, base + 13, cz); scene.add(tower)
  const towerTop = new THREE.Mesh(new THREE.ConeGeometry(5, 9, 8), std('#271f33', { rough: 0.9 }))
  towerTop.position.set(cx, base + 30, cz); scene.add(towerTop)
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.35, 5 + (i % 3) * 2, 4), std('#140f1d'))
    spike.position.set(cx + Math.cos(a) * 3.4, base + 20 + (i % 2) * 4, cz + Math.sin(a) * 3.4)
    spike.rotation.z = Math.cos(a) * 0.35; spike.rotation.x = -Math.sin(a) * 0.35
    scene.add(spike)
  }
  // red rune windows
  for (let i = 0; i < 5; i++) {
    const a = 0.5 + i * 0.55
    const win = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 1.5), new THREE.MeshBasicMaterial({ color: '#ff5f7a', toneMapped: false }))
    win.position.set(cx + Math.cos(a) * 4.5, base + 7 + i * 3.4, cz + Math.sin(a) * 4.5)
    win.lookAt(cx + Math.cos(a) * 10, win.position.y, cz + Math.sin(a) * 10)
    scene.add(win)
    addGlow(world, scene, '#ff5f7a', 1.8, win.position.x, win.position.y, win.position.z, 0.45)
  }
  addGlow(world, scene, '#ff5f7a', 18, cx, base + 17, cz, 0.12)
  const light = new THREE.PointLight(0xff5f7a, 34, 34, 2); light.position.set(cx, base + 8, cz); scene.add(light)
  world.addCollider(cx, cz, 5.8)

  // obsidian shards
  for (let i = 0; i < 14; i++) {
    const a = Math.random() * Math.PI * 2, r = 9 + Math.random() * 7
    const px = cx + Math.cos(a) * r, pz = cz + Math.sin(a) * r
    const h = world.heightAt(px, pz)
    const shard = new THREE.Mesh(new THREE.ConeGeometry(0.5 + Math.random() * 0.8, 2 + Math.random() * 3.5, 4), std('#1d1726', { rough: 0.6, metal: 0.2 }))
    shard.position.set(px, h + 1.5, pz); shard.rotation.z = (Math.random() - .5) * .4; scene.add(shard)
    addGlow(world, scene, '#ff5f7a', 1.2, px, h + 3, pz, 0.15)
  }
  // dead trees
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + 0.4
    const px = cx + Math.cos(a) * 12, pz = cz + Math.sin(a) * 12
    const h = world.heightAt(px, pz)
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.4, 5, 5), std('#2a2530'))
    trunk.position.set(px, h + 2.5, pz); scene.add(trunk)
    for (let j = 0; j < 3; j++) {
      const branch = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.12, 2.2, 4), std('#2a2530'))
      branch.position.set(px + Math.cos(j * 2) * 0.7, h + 3.5 + j * 0.5, pz + Math.sin(j * 2) * 0.7)
      branch.rotation.z = Math.cos(j * 2) * 0.8; branch.rotation.x = Math.sin(j * 2) * 0.8
      scene.add(branch)
    }
  }
  world.floating.push({ obj: ring, baseY: base + 0.05, phase: 0, spin: 0.05, sway: 0 })
}

/* ---------------------------------------------------------- NPC MODELS */
function wizardModel(world, color, accent, opts = {}) {
  const g = new THREE.Group()
  const s = opts.scale || 1
  const robe = new THREE.Mesh(new THREE.ConeGeometry(0.52, 1.55, 9), std(color, { rough: 0.92 }))
  robe.position.y = 0.78; robe.scale.setScalar(s); g.add(robe)
  const hem = new THREE.Mesh(new THREE.TorusGeometry(0.47, 0.035, 4, 14), std(accent, { emissive: accent, ei: 0.25, metal: 0.3 }))
  hem.rotation.x = Math.PI / 2; hem.position.y = 0.08 * s; g.add(hem)
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.3, 0.7, 8), std(color))
  torso.position.y = 1.4 * s; g.add(torso)
  const shoulders = new THREE.Mesh(new THREE.SphereGeometry(0.33, 8, 6), std(color))
  shoulders.scale.set(1, 0.55, 0.85); shoulders.position.y = 1.66 * s; g.add(shoulders)
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.05, 4, 10), std(accent, { emissive: accent, ei: 0.3 }))
  collar.rotation.x = Math.PI / 2; collar.position.y = 1.78 * s; g.add(collar)
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), std(opts.skin || '#e6c5a4', { rough: 0.8 }))
  head.position.y = 1.98 * s; g.add(head)
  const hood = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.55, 8), std(opts.hood || color, { rough: 0.95 }))
  hood.position.y = 2.12 * s; g.add(hood)
  if (opts.eyes) {
    for (const ex of [-0.08, 0.08]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.027, 5, 4), new THREE.MeshBasicMaterial({ color: opts.eyes, toneMapped: false }))
      eye.position.set(ex, 2.0 * s, 0.19 * s); g.add(eye)
    }
    addGlow(world, g, opts.eyes, 0.6, 0, 2.0, 0.24, 0.5)
  }
  // arms
  const armMat = std(color)
  for (const side of [-1, 1]) {
    const arm = new THREE.Group(); arm.position.set(side * 0.34 * s, 1.62 * s, 0)
    const limb = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.85, 6), armMat)
    limb.position.y = -0.4; arm.add(limb)
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.075, 6, 5), std('#e6c5a4'))
    hand.position.y = -0.84; arm.add(hand)
    arm.rotation.z = side * 0.16
    g.add(arm)
    if ((side === 1 && !opts.staff) || opts.staff) {
      const staff = new THREE.Group()
      const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.04, opts.staff ? 2.1 : 0.85, 5), std(opts.staffWood || '#5a3d26'))
      stick.position.y = opts.staff ? 0.5 : -0.5; staff.add(stick)
      const orb = new THREE.Mesh(new THREE.SphereGeometry(opts.staff ? 0.11 : 0.045, 8, 6), new THREE.MeshBasicMaterial({ color: accent, toneMapped: false }))
      orb.position.y = opts.staff ? 1.6 : 0.0; staff.add(orb)
      addGlow(world, staff, accent, opts.staff ? 1.1 : 0.35, 0, orb.position.y, 0, 0.7)
      hand.add(staff)
    }
  }
  // shadow
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.6 * s, 18), new THREE.MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 0.3, depthWrite: false }))
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.03; g.add(shadow)
  return g
}

function wolfModel(world, color, accent) {
  const g = new THREE.Group()
  const body = new THREE.Mesh(new THREE.IcosahedronGeometry(0.62, 0), std(color, { rough: 0.95 }))
  body.scale.set(1.6, 0.85, 0.85); body.position.y = 1.1; g.add(body)
  const neck = new THREE.Mesh(new THREE.ConeGeometry(0.4, 0.8, 6), std(color))
  neck.rotation.z = -0.7; neck.position.set(0.85, 1.45, 0); g.add(neck)
  const head = new THREE.Mesh(new THREE.IcosahedronGeometry(0.34, 0), std(color))
  head.position.set(1.2, 1.72, 0); g.add(head)
  const snout = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.5, 5), std('#2b2b2b'))
  snout.rotation.z = -Math.PI / 2; snout.position.set(1.52, 1.66, 0); g.add(snout)
  for (const side of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.35, 4), std(color))
    ear.position.set(1.12, 2.02, side * 0.14); g.add(ear)
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 5), new THREE.MeshBasicMaterial({ color: accent, toneMapped: false }))
    eye.position.set(1.44, 1.76, side * 0.16); g.add(eye)
    for (const lx of [-0.65, 0.55]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.9, 5), std(color))
      leg.position.set(lx, 0.5, side * 0.3); g.add(leg)
    }
  }
  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.16, 1.1, 5), std(color))
  tail.rotation.z = 0.9; tail.position.set(-1.05, 1.25, 0); g.add(tail)
  addGlow(world, g, accent, 1.6, 1.45, 1.76, 0, 0.5)
  return g
}

function golemModel(world, accent) {
  const g = new THREE.Group()
  const torso = new THREE.Mesh(new THREE.IcosahedronGeometry(0.85, 0), std('#4a5e70', { rough: 0.35, metal: 0.4, emissive: '#1c3440', ei: 0.6 }))
  torso.scale.set(0.9, 1.25, 0.8); torso.position.y = 1.7; g.add(torso)
  const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.26, 0), new THREE.MeshBasicMaterial({ color: accent, toneMapped: false }))
  core.position.y = 1.75; g.add(core)
  addGlow(world, g, accent, 2.2, 0, 1.75, 0.45, 0.7)
  const head = new THREE.Mesh(new THREE.OctahedronGeometry(0.4, 0), std('#5e7488', { rough: 0.3 }))
  head.position.y = 2.9; g.add(head)
  for (const side of [-1, 1]) {
    const arm = new THREE.Mesh(new THREE.OctahedronGeometry(0.3, 0), std('#5e7488'))
    arm.scale.set(0.8, 1.8, 0.8); arm.position.set(side * 1.1, 1.6, 0); arm.rotation.z = side * 0.25; g.add(arm)
    const shard = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.7, 4), std('#7ad8e8', { emissive: '#2a7a88', ei: 0.8 }))
    shard.position.set(side * 0.9, 2.2, 0); g.add(shard)
  }
  for (let i = 0; i < 3; i++) {
    const shard = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.8, 4), std('#7ad8e8', { emissive: '#2a7a88', ei: 0.8 }))
    shard.position.set(0, 0.8 + i * 0.2, 0.3 + i * 0.2); g.add(shard)
  }
  return g
}

export function buildNPCs(world) {
  for (const def of NPCS) {
    const y = world.heightAt(def.pos[0], def.pos[1])
    let g
    if (def.id === 'gloomfang') {
      g = wolfModel(world, def.color, def.accent)
      g.scale.setScalar(1.35)
    } else if (def.id === 'warden') {
      g = golemModel(world, def.accent)
    } else {
      const boss = def.id === 'morvane'
      g = wizardModel(world, def.color, def.accent, { scale: boss ? 1.28 : 1, staff: boss || def.id === 'rook', eyes: boss ? '#ff5f7a' : (def.id === 'elder' ? '#9be8ff' : null), hood: boss ? '#15101d' : def.color })
      if (boss) {
        const aura = new THREE.Mesh(new THREE.CircleGeometry(2.2, 32), new THREE.MeshBasicMaterial({ color: '#ff5f7a', transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }))
        aura.rotation.x = -Math.PI / 2; aura.position.y = 0.05; g.add(aura)
        const crown = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.75, 4), std('#ff5f7a', { emissive: '#ff5f7a', ei: 0.7 }))
        crown.position.set(-0.18, 2.55, 0); crown.rotation.z = 0.28; g.add(crown)
        const crown2 = crown.clone(); crown2.position.x = 0.18; crown2.rotation.z = -0.28; g.add(crown2)
        addGlow(world, g, '#ff5f7a', 5, 0, 1.3, 0, 0.22)
      }
    }
    g.position.set(def.pos[0], y, def.pos[1])
    if (def.id === 'gloomfang' || def.id === 'warden') g.position.y += def.id === 'warden' ? 0.2 : 0
    g.rotation.y = def.id === 'gloomfang' ? 0.9 : (def.id === 'marrow' ? 3.4 : 0.4)
    const label = world.makeLabel(def.name, def.id === 'morvane' ? '#ff9aa8' : (def.id === 'gloomfang' ? '#b7ff9a' : '#f0dfb8'))
    label.position.y = def.id === 'gloomfang' ? 2.9 : 3.1
    label.scale.set(4.2, 1.05, 1)
    g.add(label)
    world.scene.add(g)
    world.npcs[def.id] = { group: g, def, baseY: g.position.y, label }
    if (def.id === 'morvane') {
      world.bossGroup = g
      for (let i = 0; i < 5; i++) {
        const mote = new THREE.Mesh(new THREE.TetrahedronGeometry(0.12, 0), new THREE.MeshBasicMaterial({ color: '#ff5f7a', transparent: true, opacity: 0.65, toneMapped: false }))
        mote.position.set((Math.random() - .5) * 3, 1 + Math.random() * 2.5, (Math.random() - .5) * 3)
        g.add(mote)
        world.floating.push({ obj: mote, baseY: mote.position.y, phase: Math.random() * 6, spin: 0.8, sway: 0.35, local: true })
      }
    }
  }
}

/* ---------------------------------------------------------- CREATURES */
export function buildCreatures(world) {
  const scene = world.scene
  // unicorn
  const ux = -42, uz = 20, uh = world.heightAt(ux, uz)
  const uni = new THREE.Group(); uni.position.set(ux, uh, uz); uni.rotation.y = 0.8
  const ubody = new THREE.Mesh(new THREE.CapsuleGeometry(0.48, 1.1, 4, 8), std('#e9e4dc', { rough: 0.7, emissive: '#5a6878', ei: 0.18 }))
  ubody.rotation.z = Math.PI / 2; ubody.position.y = 1.15; uni.add(ubody)
  const uneck = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 0.9, 6), std('#e9e4dc'))
  uneck.rotation.z = -0.5; uneck.position.set(0.75, 1.65, 0); uni.add(uneck)
  const uhead = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.45, 4, 6), std('#e9e4dc'))
  uhead.rotation.z = 0.9; uhead.position.set(1.02, 2.0, 0); uni.add(uhead)
  const horn = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.55, 5), new THREE.MeshStandardMaterial({ color: '#f5e6b8', emissive: '#d8b978', emissiveIntensity: 0.8, metalness: 0.4 }))
  horn.rotation.z = -0.5; horn.position.set(1.15, 2.36, 0); uni.add(horn)
  for (const [lx, lz] of [[-0.5, -0.25], [-0.5, 0.25], [0.5, -0.25], [0.5, 0.25]]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.9, 5), std('#e9e4dc'))
    leg.position.set(lx, 0.5, lz); uni.add(leg)
  }
  const mane = new THREE.Mesh(new THREE.ConeGeometry(0.22, 1.1, 5), std('#c9b8e0', { emissive: '#6f5a8a', ei: 0.4 }))
  mane.position.set(0.68, 1.85, 0); mane.rotation.z = -0.4; uni.add(mane)
  const utail = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.9, 5), std('#c9b8e0'))
  utail.position.set(-0.95, 1.2, 0); utail.rotation.z = 0.6; uni.add(utail)
  addGlow(world, uni, '#d8c9ff', 3.2, 0, 1.5, 0, 0.2)
  scene.add(uni)
  world.creatures.unicorn = { group: uni, anchor: new THREE.Vector3(ux, uh, uz), t: 0 }
  world.addCreatureLore('Unicorn of the Whispering Wood', 'Whispering Wood')

  // phoenix
  const px = 14, pz = 65
  const phoenix = new THREE.Group(); phoenix.position.set(px, world.heightAt(px, pz) + 3.8, pz)
  const pbody = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), new THREE.MeshBasicMaterial({ color: '#ffb36b', toneMapped: false }))
  pbody.scale.set(1, 0.8, 1.5); phoenix.add(pbody)
  for (const side of [-1, 1]) {
    const wing = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.5), new THREE.MeshBasicMaterial({ color: '#ff8a3d', transparent: true, opacity: 0.8, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }))
    wing.position.set(side * 0.75, 0.05, 0); wing.rotation.z = side * 0.35; wing.rotation.y = side * 0.25
    wing.userData.side = side; phoenix.add(wing)
  }
  for (let i = 0; i < 4; i++) {
    const feather = new THREE.Mesh(new THREE.ConeGeometry(0.09, 1.2 - i * 0.15, 4), new THREE.MeshBasicMaterial({ color: i % 2 ? '#ffd08a' : '#ff7a3d', transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }))
    feather.position.set(0, -0.2 - i * 0.1, -0.7 - i * 0.18); feather.rotation.x = 1.2; phoenix.add(feather)
  }
  const phead = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 6), new THREE.MeshBasicMaterial({ color: '#ffe0a8', toneMapped: false }))
  phead.position.set(0, 0.28, 0.3); phoenix.add(phead)
  addGlow(world, phoenix, '#ff9a4d', 3.6, 0, 0, 0, 0.6)
  scene.add(phoenix)
  world.creatures.phoenix = { group: phoenix, anchor: new THREE.Vector3(px, world.heightAt(px, pz) + 3.2, pz), t: 0 }
  world.addCreatureLore('Phoenix on the Elder Altar', 'Elder Ruins')

  // thestral
  const tx = 2, tz = 52, th = world.heightAt(tx, tz)
  const thestral = new THREE.Group(); thestral.position.set(tx, th, tz); thestral.rotation.y = -2.2
  const tb = new THREE.Mesh(new THREE.CapsuleGeometry(0.4, 1.2, 4, 6), new THREE.MeshStandardMaterial({ color: '#3a3542', roughness: 0.9, transparent: true, opacity: 0.55 }))
  tb.rotation.z = Math.PI / 2; tb.position.y = 1.25; thestral.add(tb)
  const tn = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, 1, 5), new THREE.MeshStandardMaterial({ color: '#3a3542', transparent: true, opacity: 0.55 }))
  tn.rotation.z = -0.5; tn.position.set(0.8, 1.8, 0); thestral.add(tn)
  const thd = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.5, 4, 5), new THREE.MeshStandardMaterial({ color: '#3a3542', transparent: true, opacity: 0.55 }))
  thd.rotation.z = 0.9; thd.position.set(1.1, 2.1, 0); thestral.add(thd)
  for (const [lx, lz] of [[-0.5, -0.2], [-0.5, 0.2], [0.5, -0.2], [0.5, 0.2]]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 1.1, 4), new THREE.MeshStandardMaterial({ color: '#3a3542', transparent: true, opacity: 0.4 }))
    leg.position.set(lx, 0.55, lz); thestral.add(leg)
  }
  for (const side of [-1, 1]) {
    const wing = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.5), new THREE.MeshBasicMaterial({ color: '#6a5a80', transparent: true, opacity: 0.22, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }))
    wing.position.set(0, 1.4, side * 0.5); wing.rotation.x = side * 0.4; thestral.add(wing)
  }
  addGlow(world, thestral, '#9a8ab8', 3.4, 0, 1.4, 0, 0.18)
  scene.add(thestral)
  world.creatures.thestral = { group: thestral, anchor: new THREE.Vector3(tx, th, tz), t: 0 }
  world.addCreatureLore('Thestral at the Ruin Gate', 'Elder Ruins')

  // cavern whelp
  const dx = -61, dz = -49, dh = world.heightAt(dx, dz)
  const whelp = new THREE.Group(); whelp.position.set(dx, dh + 1.4, dz)
  const wb = new THREE.Mesh(new THREE.IcosahedronGeometry(0.45, 0), std('#3d2a5a', { emissive: '#6a3a9a', ei: 0.4 }))
  wb.scale.set(1.4, 0.9, 1); whelp.add(wb)
  const wh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.28, 0), std('#4a3268'))
  wh.position.set(0.55, 0.4, 0); whelp.add(wh)
  for (const side of [-1, 1]) {
    const wing = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.6), new THREE.MeshBasicMaterial({ color: '#9a6aff', transparent: true, opacity: 0.35, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }))
    wing.position.set(-0.2, 0.3, side * 0.5); wing.rotation.x = side * 0.5; whelp.add(wing)
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.04, 5, 4), new THREE.MeshBasicMaterial({ color: '#c9a6ff', toneMapped: false }))
    eye.position.set(0.72, 0.45, side * 0.1); whelp.add(eye)
  }
  const wtail = new THREE.Mesh(new THREE.ConeGeometry(0.1, 1.1, 4), std('#3d2a5a'))
  wtail.position.set(-0.8, -0.1, 0); wtail.rotation.z = -1; whelp.add(wtail)
  addGlow(world, whelp, '#9a6aff', 2.4, 0, 0.2, 0, 0.3)
  scene.add(whelp)
  world.creatures.whelp = { group: whelp, anchor: new THREE.Vector3(dx, dh + 1.4, dz), t: 0 }
  world.addCreatureLore('Glimmer Whelp', 'Glimmer Cavern')

  // gloomfang creature is an NPC (challengeable) — built in buildNPCs
}

/* ---------------------------------------------------------- DUEL ENEMY MODEL */
export function makeDuelEnemy(world, def) {
  let g
  if (def.beast) {
    g = wolfModel(world, def.color, def.accent)
    g.scale.setScalar(1.45)
  } else if (def.id === 'warden') {
    g = golemModel(world, def.accent)
    g.scale.setScalar(1.15)
  } else {
    const boss = def.boss
    g = wizardModel(world, def.color, def.accent, {
      scale: boss ? 1.45 : 1.02, staff: boss, eyes: def.accent,
      hood: boss ? '#120d18' : def.color, skin: boss ? '#b9a8a8' : '#e0c0a0',
    })
    if (boss) {
      for (const side of [-1, 1]) {
        const horn = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.85, 4), std('#2b2020'))
        horn.position.set(side * 0.17, 2.72, 0); horn.rotation.z = side * 0.35; g.add(horn)
      }
      const aura = new THREE.Mesh(new THREE.CircleGeometry(1.9, 24), new THREE.MeshBasicMaterial({ color: '#ff5f7a', transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }))
      aura.rotation.x = -Math.PI / 2; aura.position.y = 0.06; g.add(aura)
      addGlow(world, g, '#ff5f7a', 4.5, 0, 1.4, 0, 0.25)
    }
  }
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.8, 18), new THREE.MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 0.32, depthWrite: false }))
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.02; g.add(shadow)
  return g
}

export function buildNodes(world) {
  for (const node of NODES) {
    const y = world.heightAt(node.pos[0], node.pos[1])
    const g = new THREE.Group(); g.position.set(node.pos[0], y, node.pos[1])
    let color = '#d9b978'
    if (node.type === 'wood' || node.type === 'core') {
      const m = matById[node.mat]
      color = m?.color || '#d9b978'
      const rarity = m ? RARITIES[m.rarity] : RARITIES.common
      if (node.type === 'wood') {
        const stump = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.28, 0.45, 6), std('#5a422c'))
        stump.position.y = 0.22; g.add(stump)
        const branch = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.075, 1.1, 5), std(m?.color || '#7a5a3a'))
        branch.position.set(0.28, 0.85, 0.12); branch.rotation.z = -0.45; branch.rotation.x = 0.25; g.add(branch)
        for (let i = 0; i < 3; i++) {
          const leaf = new THREE.Mesh(new THREE.IcosahedronGeometry(0.22 - i * 0.04, 0), std(m?.color || '#6a8a4a', { emissive: m?.color, ei: 0.18 }))
          leaf.position.set(0.45 + i * 0.16, 1.05 + i * 0.18, 0.2 - i * 0.08); g.add(leaf)
        }
        const root = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.4, 4), std('#5a422c'))
        root.position.set(-0.25, 0.2, -0.1); root.rotation.z = 0.5; g.add(root)
      } else {
        const floatY = 1.0
        const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.24, 0), new THREE.MeshStandardMaterial({ color: m?.color || '#e9d8b6', emissive: color, emissiveIntensity: 0.9, roughness: 0.3, metalness: 0.25, flatShading: true }))
        core.position.y = floatY; g.add(core)
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.015, 4, 24), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false }))
        ring.rotation.x = Math.PI / 2.4; ring.position.y = floatY; g.add(ring)
        addGlow(world, g, color, 2.2, 0, floatY, 0, 0.5)
        world.floating.push({ obj: core, baseY: floatY, phase: Math.random() * 6, spin: 0.7, sway: 0.16, local: true })
        world.floating.push({ obj: ring, baseY: floatY, phase: Math.random() * 6, spin: 0.5, sway: 0.1, local: true })
      }
      const marker = addGlow(world, g, rarity.color, 1.2, 0, 2.1, 0, 0.75)
      marker.userData.baseY = 2.1
      g.userData.marker = marker
    } else if (node.type === 'chest') {
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.6, 0.72), std('#6b4a2c', { rough: 0.9 }))
      body.position.y = 0.3; g.add(body)
      const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 1.1, 8, 1, false, 0, Math.PI), std('#7a5634'))
      lid.rotation.z = Math.PI / 2; lid.position.y = 0.6; g.add(lid)
      for (const bx of [-0.3, 0.3]) {
        const band = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.65, 0.76), std('#c9a24a', { metal: 0.6, emissive: '#5a3d10', ei: 0.4 }))
        band.position.set(bx, 0.35, 0); g.add(band)
      }
      const lock = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.06), std('#e2c16c', { metal: 0.7 }))
      lock.position.set(0, 0.42, 0.4); g.add(lock)
      addGlow(world, g, '#e9c874', 1.8, 0, 0.7, 0, 0.35)
      color = '#e9c874'
    } else {
      const stone = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.48, 1.8, 4), std('#5f6470', { rough: 1 }))
      stone.position.y = 0.9; stone.rotation.y = 0.4; g.add(stone)
      const rune = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.5), new THREE.MeshBasicMaterial({ map: world.textures.glow, color: '#9fd8ff', transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }))
      rune.position.set(0.02, 1.15, 0.34); rune.rotation.y = 0.4; g.add(rune)
      addGlow(world, g, '#9fd8ff', 1.8, 0, 1.2, 0.3, 0.4)
      color = '#9fd8ff'
    }
    g.userData.node = node
    g.userData.baseY = y
    world.scene.add(g)
    world.nodes[node.id] = g
    if (node.type === 'lore' || node.type === 'chest') world.addCollider(node.pos[0], node.pos[1], 0.6)
  }
}
