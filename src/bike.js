// Procedural light-cycle and rider models.
import * as THREE from 'three'
import { COSMETIC_MAP, BIKE_MAP } from './data.js'

const decalCache = new Map()
const glowTexCache = new Map()

const wheelRadii = { small: 0.46, medium: 0.56, large: 0.66 }

function glowTexture(color) {
  if (glowTexCache.has(color)) return glowTexCache.get(color)
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(64, 64, 4, 64, 64, 64)
  grd.addColorStop(0, color)
  grd.addColorStop(0.35, color + 'aa')
  grd.addColorStop(1, color + '00')
  g.fillStyle = grd
  g.fillRect(0, 0, 128, 128)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  glowTexCache.set(color, tex)
  return tex
}

function decalTexture(style, color) {
  const key = style + color
  if (decalCache.has(key)) return decalCache.get(key)
  const c = document.createElement('canvas')
  c.width = 256; c.height = 128
  const g = c.getContext('2d')
  g.clearRect(0, 0, 256, 128)
  g.strokeStyle = color
  g.fillStyle = color
  g.lineWidth = 4
  g.shadowColor = color
  g.shadowBlur = 8
  if (style === 'stripes') {
    for (let i = -2; i < 8; i++) {
      g.beginPath(); g.moveTo(i * 44, 128); g.lineTo(i * 44 + 60, 0); g.stroke()
    }
  } else if (style === 'chevrons') {
    for (let i = 0; i < 4; i++) {
      const x = 28 + i * 56
      g.beginPath(); g.moveTo(x, 30); g.lineTo(x + 26, 64); g.lineTo(x, 98); g.stroke()
    }
  } else if (style === 'glyph') {
    for (let i = 0; i < 7; i++) {
      const x = 18 + i * 34
      g.strokeRect(x, 30 + (i % 3) * 14, 16, 16)
      g.beginPath(); g.moveTo(x + 8, 46); g.lineTo(x + 8, 78); g.stroke()
    }
  } else if (style === 'hazard') {
    for (let i = -3; i < 10; i++) {
      g.beginPath(); g.moveTo(i * 34, 128); g.lineTo(i * 34 + 30, 0); g.lineTo(i * 34 + 46, 0); g.lineTo(i * 34 + 16, 128); g.fill()
    }
  } else if (style === 'circuit') {
    for (let i = 0; i < 6; i++) {
      const y = 22 + i * 16
      g.beginPath(); g.moveTo(10, y); g.lineTo(60 + i * 24, y); g.lineTo(80 + i * 24, y + 10); g.lineTo(240, y + 10); g.stroke()
      g.beginPath(); g.arc(62 + i * 24, y, 4, 0, Math.PI * 2); g.fill()
    }
  }
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  decalCache.set(key, tex)
  return tex
}

const darkMetal = () => new THREE.MeshStandardMaterial({ color: '#0b0f16', metalness: 0.92, roughness: 0.32 })
const tyreMat = () => new THREE.MeshStandardMaterial({ color: '#05060a', metalness: 0.2, roughness: 0.9 })

function neonMat(color, intensity = 2.6) {
  return new THREE.MeshStandardMaterial({
    color, emissive: color, emissiveIntensity: intensity, metalness: 0.3, roughness: 0.35,
  })
}

function bodyMaterial(color) {
  return new THREE.MeshStandardMaterial({ color, metalness: 0.82, roughness: 0.28, envMapIntensity: 0.8 })
}

function addBox(parent, w, h, d, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
  m.position.set(x, y, z); m.rotation.set(rx, ry, rz)
  parent.add(m)
  return m
}

function buildBody(group, style, primaryMat, accentMat, darkMat) {
  const body = new THREE.Group()
  body.name = 'body'
  const shape = new THREE.Shape()
  // profile in Z (forward) / Y (up), extruded across X
  const profiles = {
    classic: [[1.55, 0.18], [1.42, 0.52], [0.8, 0.66], [0.1, 0.62], [-0.9, 0.6], [-1.5, 0.4], [-1.52, 0.16], [-0.6, 0.06], [0.7, 0.08]],
    aero: [[1.75, 0.12], [1.5, 0.42], [0.9, 0.55], [0.2, 0.5], [-0.9, 0.5], [-1.65, 0.32], [-1.7, 0.1], [-0.4, 0.04], [0.8, 0.04]],
    heavy: [[1.55, 0.25], [1.5, 0.7], [0.8, 0.82], [0.0, 0.8], [-1.0, 0.78], [-1.6, 0.55], [-1.62, 0.2], [-0.5, 0.08], [0.8, 0.1]],
    experimental: [[1.6, 0.2], [1.4, 0.6], [0.7, 0.72], [0.0, 0.55], [-0.8, 0.7], [-1.5, 0.5], [-1.55, 0.18], [-0.4, 0.06], [0.8, 0.08]],
    stealth: [[1.65, 0.1], [1.45, 0.38], [0.8, 0.46], [0.0, 0.44], [-1.0, 0.48], [-1.6, 0.3], [-1.6, 0.1], [-0.4, 0.03], [0.8, 0.04]],
    legendary: [[1.7, 0.2], [1.5, 0.62], [0.8, 0.75], [0.0, 0.66], [-1.0, 0.68], [-1.62, 0.48], [-1.66, 0.18], [-0.5, 0.06], [0.8, 0.08]],
  }
  const pts = profiles[style] || profiles.classic
  shape.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i < pts.length; i++) shape.lineTo(pts[i][0], pts[i][1])
  shape.closePath()
  const width = style === 'heavy' ? 0.62 : style === 'stealth' ? 0.42 : 0.52
  const geo = new THREE.ExtrudeGeometry(shape, { depth: width, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06, bevelSegments: 2, steps: 1 })
  geo.translate(0, 0, -width / 2)
  geo.rotateY(Math.PI / 2)
  const bodyMesh = new THREE.Mesh(geo, primaryMat)
  bodyMesh.position.y = 0.02
  body.add(bodyMesh)

  // lower hull / belly
  addBox(body, width * 0.8, 0.14, 2.2, darkMat, 0, 0.0, -0.05)

  // seat
  const seat = addBox(body, width * 0.72, 0.12, 0.72, darkMat, 0, 0.66, -0.42)
  seat.rotation.x = -0.06

  // front fork + handlebars
  addBox(body, 0.09, 0.62, 0.09, darkMat, -0.2, 0.44, 1.12, 0.22)
  addBox(body, 0.09, 0.62, 0.09, darkMat, 0.2, 0.44, 1.12, 0.22)
  addBox(body, 0.9, 0.06, 0.07, darkMat, 0, 0.72, 1.0)
  addBox(body, 0.14, 0.06, 0.07, accentMat, -0.44, 0.72, 1.0)
  addBox(body, 0.14, 0.06, 0.07, accentMat, 0.44, 0.72, 1.0)

  // neon spine
  addBox(body, 0.045, 0.045, 1.9, accentMat, 0, 0.74, 0.05)
  addBox(body, 0.04, 0.05, 0.9, accentMat, 0, 0.14, 1.0)
  // side accent rails
  for (const sx of [-1, 1]) {
    addBox(body, 0.035, 0.05, 1.5, accentMat, sx * (width / 2 + 0.02), 0.28, 0.05)
    addBox(body, 0.03, 0.03, 0.5, accentMat, sx * (width / 2 + 0.02), 0.5, 0.62, 0, 0, sx * 0.5)
  }
  // nose light
  addBox(body, 0.3, 0.05, 0.04, accentMat, 0, 0.3, 1.58)
  // rear tail
  addBox(body, 0.4, 0.1, 0.4, darkMat, 0, 0.48, -1.42)
  addBox(body, 0.28, 0.04, 0.28, accentMat, 0, 0.55, -1.58)

  // heavy armour plates
  if (style === 'heavy') {
    for (const sx of [-1, 1]) {
      addBox(body, 0.08, 0.34, 1.1, darkMat, sx * 0.36, 0.45, -0.1, 0, 0, sx * 0.06)
      addBox(body, 0.05, 0.06, 0.9, accentMat, sx * 0.4, 0.55, -0.1)
    }
    addBox(body, 0.8, 0.12, 0.5, darkMat, 0, 0.8, 0.6, 0.1)
  }
  if (style === 'aero') {
    for (const sx of [-1, 1]) {
      const fin = addBox(body, 0.05, 0.28, 0.9, primaryMat, sx * 0.33, 0.5, -0.55, 0, 0, sx * 0.35)
      fin.rotation.y = sx * 0.08
    }
    addBox(body, 0.02, 0.3, 0.5, accentMat, 0, 0.82, -0.9, 0.25)
  }
  if (style === 'experimental') {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.035, 8, 24), accentMat)
    ring.position.set(0, 0.5, 0.55); ring.rotation.x = Math.PI / 2
    body.add(ring)
    addBox(body, 0.03, 0.03, 1.6, accentMat, 0, 0.86, -0.2, 0.05)
  }
  if (style === 'legendary') {
    addBox(body, 0.05, 0.18, 0.8, accentMat, 0, 0.88, 0.45, 0.18)
    addBox(body, 0.05, 0.1, 1.4, accentMat, 0, 0.82, -0.6, 0.1)
  }
  if (style === 'stealth') {
    addBox(body, 0.02, 0.04, 1.3, accentMat, 0, 0.5, 0.1)
    addBox(body, 0.36, 0.04, 0.16, accentMat, 0, 0.56, -1.5)
  }
  return { group: body, width }
}

function buildWheel(radius, style, accentMat, darkMat) {
  const g = new THREE.Group()
  const tire = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 0.16, 24, 1, false), tyreMat())
  tire.rotation.z = Math.PI / 2
  g.add(tire)
  const rim = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.72, 0.028, 8, 28), accentMat)
  rim.rotation.y = Math.PI / 2
  g.add(rim)
  if (style === 'disc') {
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.68, radius * 0.68, 0.05, 24), darkMat)
    disc.rotation.z = Math.PI / 2
    g.add(disc)
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.42, 0.02, 6, 20), accentMat)
    ring.rotation.y = Math.PI / 2
    g.add(ring)
  } else if (style === 'spoke') {
    for (let i = 0; i < 6; i++) {
      const sp = new THREE.Mesh(new THREE.BoxGeometry(0.035, radius * 1.28, 0.05), darkMat)
      sp.rotation.x = (i / 6) * Math.PI
      g.add(sp)
    }
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.2, 12), accentMat)
    hub.rotation.z = Math.PI / 2
    g.add(hub)
  } else if (style === 'halo') {
    const inner = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.42, 0.022, 6, 20), accentMat)
    inner.rotation.y = Math.PI / 2
    g.add(inner)
    for (let i = 0; i < 4; i++) {
      const sp = new THREE.Mesh(new THREE.BoxGeometry(0.03, radius * 0.6, 0.03), accentMat)
      sp.rotation.x = (i / 4) * Math.PI
      sp.position.y = 0
      g.add(sp)
    }
  } else if (style === 'turbine') {
    for (let i = 0; i < 8; i++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.02, radius * 0.85, 0.16), accentMat)
      blade.rotation.x = (i / 8) * Math.PI * 2
      blade.position.z = 0
      blade.rotation.z = 0.35
      g.add(blade)
    }
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.22, 10), darkMat)
    hub.rotation.z = Math.PI / 2
    g.add(hub)
  } else if (style === 'void') {
    const voidMat = new THREE.MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 0.55 })
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.66, radius * 0.66, 0.04, 20), voidMat)
    disc.rotation.z = Math.PI / 2
    g.add(disc)
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.5, 0.012, 5, 20), accentMat)
    ring2.rotation.y = Math.PI / 2
    g.add(ring2)
  }
  return g
}

function buildRider(rider, colors, accentMat) {
  const g = new THREE.Group()
  const suitColor = rider?.suitColor || '#00e5ff'
  const suitMat = new THREE.MeshStandardMaterial({ color: suitColor, metalness: 0.55, roughness: 0.45, emissive: suitColor, emissiveIntensity: 0.25 })
  const suitDark = new THREE.MeshStandardMaterial({ color: '#0b0f16', metalness: 0.8, roughness: 0.4 })
  const visorMat = new THREE.MeshStandardMaterial({
    color: colors.visor || '#00e5ff', emissive: colors.visor || '#00e5ff',
    emissiveIntensity: 2.4, metalness: 0.9, roughness: 0.1,
  })
  const armorStyle = rider?.armor || 'armor-light'
  const helmetStyle = rider?.helmet || 'helmet-standard'

  // legs
  for (const sx of [-1, 1]) {
    const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.06, 0.46, 8), suitDark)
    thigh.position.set(sx * 0.18, 0.62, -0.12); thigh.rotation.x = -0.75
    g.add(thigh)
    const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.045, 0.42, 8), suitMat)
    shin.position.set(sx * 0.2, 0.42, 0.05); shin.rotation.x = -1.15
    g.add(shin)
    const boot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.09, 0.24), suitDark)
    boot.position.set(sx * 0.2, 0.25, 0.18)
    g.add(boot)
  }
  // torso leaning forward
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.38, 6, 10), suitMat)
  torso.position.set(0, 0.98, -0.18); torso.rotation.x = 0.52
  g.add(torso)
  // chest neon
  const chest = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.2, 0.04), accentMat)
  chest.position.set(0, 1.02, 0.02); chest.rotation.x = 0.52
  g.add(chest)
  // arms to bars
  for (const sx of [-1, 1]) {
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.44, 7), suitMat)
    arm.position.set(sx * 0.27, 0.88, 0.2); arm.rotation.set(1.05, 0, sx * -0.18)
    g.add(arm)
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 6), suitDark)
    hand.position.set(sx * 0.32, 0.79, 0.44)
    g.add(hand)
  }
  // head + helmet
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 14, 10), helmetStyle === 'helmet-crown' ? suitMat : suitDark)
  head.position.set(0, 1.32, -0.04); head.scale.set(1, 0.95, 1.05)
  g.add(head)
  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.09, 0.05), visorMat)
  visor.position.set(0, 1.33, 0.13)
  g.add(visor)
  if (helmetStyle === 'helmet-aero') {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.1, 0.24), accentMat)
    fin.position.set(0, 1.44, -0.12); fin.rotation.x = 0.2
    g.add(fin)
  } else if (helmetStyle === 'helmet-horned') {
    for (const sx of [-1, 1]) {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.22, 6), accentMat)
      horn.position.set(sx * 0.13, 1.44, 0.0); horn.rotation.z = sx * 0.5
      g.add(horn)
    }
  } else if (helmetStyle === 'helmet-crown') {
    for (let i = 0; i < 5; i++) {
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.14, 4), accentMat)
      spike.position.set((i - 2) * 0.07, 1.5, -0.04)
      g.add(spike)
    }
  }
  // armour
  if (armorStyle === 'armor-plated' || armorStyle === 'armor-reactive' || armorStyle === 'armor-legend') {
    for (const sx of [-1, 1]) {
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.12, 0.2), suitDark)
      pad.position.set(sx * 0.25, 1.06, -0.1); pad.rotation.x = 0.5
      g.add(pad)
    }
  }
  if (armorStyle === 'armor-legend') {
    const cape = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.42, 0.03), accentMat)
    cape.position.set(0, 0.92, -0.44); cape.rotation.x = -0.18
    g.add(cape)
  }
  if (armorStyle === 'armor-reactive') {
    const line = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.32, 0.03), accentMat)
    line.position.set(0, 1.0, -0.34)
    g.add(line)
  }
  // suit effect aura
  const fx = rider?.suitfx || 'suitfx-none'
  if (fx !== 'suitfx-none') {
    const aura = new THREE.Mesh(
      new THREE.TorusGeometry(0.36, 0.012, 5, 24),
      new THREE.MeshBasicMaterial({ color: suitColor, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending })
    )
    aura.position.set(0, 0.95, -0.1); aura.rotation.x = Math.PI / 2
    aura.name = 'suitAura'
    g.add(aura)
  }
  return g
}

export function createBikeModel(bike, custom, rider, options = {}) {
  const { player = false, detail = true } = options
  const colors = {
    primary: custom?.primary || bike.visual.primary,
    accent: custom?.accent || bike.visual.accent,
    trail: custom?.trail || bike.visual.trail,
    glow: custom?.glow || bike.visual.glow,
  }
  const frameStyle = (COSMETIC_MAP[custom?.frame]?.style) || bike.visual.frame || 'classic'
  const wheelStyle = (COSMETIC_MAP[custom?.wheels]?.style) || bike.visual.wheels || 'disc'
  const wheelSize = custom?.wheelSize || bike.visual.wheelSize || 'medium'
  const radius = wheelRadii[wheelSize] || 0.56

  const group = new THREE.Group()
  group.name = 'lightcycle'
  const primaryMat = bodyMaterial(colors.primary)
  const accentMat = neonMat(colors.accent, 2.8)
  const trailMat = neonMat(colors.trail, 2.2)
  const darkMat = darkMetal()

  const bodyGroup = new THREE.Group()
  bodyGroup.position.y = radius - 0.56
  group.add(bodyGroup)
  const { width } = buildBody(bodyGroup, frameStyle, primaryMat, accentMat, darkMat)

  // decal side panels
  const decalStyle = (COSMETIC_MAP[custom?.decal]?.style) || bike.visual.decal || 'none'
  if (detail && decalStyle !== 'none') {
    const tex = decalTexture(decalStyle, colors.accent)
    const dMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.95, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
    for (const sx of [-1, 1]) {
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 0.42), dMat)
      plane.position.set(sx * (width / 2 + 0.035), 0.42, -0.05)
      plane.rotation.y = sx * Math.PI / 2
      bodyGroup.add(plane)
    }
  }

  // wheels
  const wheels = []
  for (const z of [1.08, -1.1]) {
    const wg = buildWheel(radius, wheelStyle, accentMat, darkMat)
    wg.position.set(0, radius, z)
    group.add(wg)
    wheels.push(wg)
  }
  // wheel glow
  const under = new THREE.Mesh(
    new THREE.PlaneGeometry(2.6, 1.5),
    new THREE.MeshBasicMaterial({ map: glowTexture(colors.glow), transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false })
  )
  under.rotation.x = -Math.PI / 2
  under.position.y = 0.02
  group.add(under)

  // engine core
  const engineStyle = (COSMETIC_MAP[custom?.engine]?.style) || bike.visual.engine || 'core'
  const engineGroup = new THREE.Group()
  engineGroup.position.set(0, 0.5 + radius - 0.56, -1.32)
  const core = new THREE.Mesh(new THREE.SphereGeometry(engineStyle === 'quantum' ? 0.14 : 0.11, 12, 8), trailMat)
  engineGroup.add(core)
  if (engineStyle === 'plasma') {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.02, 6, 16), accentMat)
    ring.rotation.x = Math.PI / 2
    engineGroup.add(ring)
  } else if (engineStyle === 'void') {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.015, 5, 18), accentMat)
    engineGroup.add(ring)
  }
  const exhaust = new THREE.Mesh(
    new THREE.ConeGeometry(0.09, 0.55, 10, 1, true),
    new THREE.MeshBasicMaterial({ color: colors.trail, transparent: true, opacity: 0.0, blending: THREE.AdditiveBlending, depthWrite: false })
  )
  exhaust.position.z = -0.36; exhaust.rotation.x = Math.PI / 2
  exhaust.name = 'exhaust'
  engineGroup.add(exhaust)
  group.add(engineGroup)

  // rider
  const riderGroup = buildRider(rider, { visor: COSMETIC_MAP[rider?.visor]?.color }, accentMat)
  riderGroup.position.y = radius - 0.56
  group.add(riderGroup)

  // headlight / glow sprite
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture(colors.glow), color: colors.glow, transparent: true,
    blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.8,
  }))
  sprite.scale.set(1.1, 1.1, 1)
  sprite.position.set(0, 0.5 + radius - 0.56, 1.5)
  group.add(sprite)

  let t = 0
  const lightStyle = (COSMETIC_MAP[custom?.lighting]?.style) || bike.visual.lighting || 'pulse'
  const boostStyle = (COSMETIC_MAP[custom?.boost]?.style) || 'flare'

  const model = {
    group, wheels, bodyGroup, riderGroup, colors, radius,
    accentMat, trailMat, primaryMat, darkMat, engineGroup, core, exhaust, sprite,
    lean: 0,
    setVisible(v) { group.visible = v },
    setColors(newColors) {
      if (newColors.primary) primaryMat.color.set(newColors.primary)
      if (newColors.accent) { accentMat.color.set(newColors.accent); accentMat.emissive.set(newColors.accent) }
      if (newColors.trail) { trailMat.color.set(newColors.trail); trailMat.emissive.set(newColors.trail) }
    },
    update(dt, state = {}) {
      t += dt
      const speed = state.speed || 0
      for (const w of wheels) w.rotation.x -= speed * dt * 2.2
      const targetLean = (state.steer || 0) * 0.42
      model.lean += (targetLean - model.lean) * Math.min(1, dt * 8)
      group.rotation.z = model.lean
      riderGroup.rotation.z = -model.lean * 0.35
      bodyGroup.position.y = (radius - 0.56) + Math.sin(t * 8 + speed * 0.1) * 0.012 * (speed > 1 ? 1 : 0.2)
      const boost = state.boosting ? 1 : 0
      if (exhaust) {
        exhaust.material.opacity += ((boost ? 0.85 : 0.0) - exhaust.material.opacity) * Math.min(1, dt * 10)
        exhaust.scale.setScalar(1 + boost * (0.8 + Math.sin(t * 30) * 0.2))
      }
      if (core) core.scale.setScalar(1 + Math.sin(t * 9) * 0.08 + boost * 0.35)
      // animated lighting
      let intensity = 2.6
      if (lightStyle === 'pulse') intensity = 2.3 + Math.sin(t * 3.2) * 0.7
      else if (lightStyle === 'wave') intensity = 2.4 + Math.sin(t * 5 + 0.5) * 0.6
      else if (lightStyle === 'strobe') intensity = 2.0 + (Math.sin(t * 16) > 0.5 ? 2.0 : 0)
      accentMat.emissiveIntensity = intensity + boost * 1.6
      trailMat.emissiveIntensity = 2.2 + Math.sin(t * 4) * 0.3 + boost * 1.2
      if (sprite) sprite.material.opacity = 0.5 + Math.sin(t * 4) * 0.15 + boost * 0.3
      // suit aura
      const aura = riderGroup.getObjectByName('suitAura')
      if (aura) { aura.rotation.z += dt * 1.8; aura.material.opacity = 0.35 + Math.sin(t * 3) * 0.2 }
      // boost effect on group
      if (boostStyle === 'warp' && boost) group.scale.set(1, 1, 1.04)
      else group.scale.set(1, 1, 1)
    },
  }
  return model
}

// Static preview helper: returns a scene ready to render one bike.
export function createPreviewScene(bike, custom, rider, opts = {}) {
  const scene = new THREE.Scene()
  scene.background = null
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
  const model = createBikeModel(bike, custom, rider, opts)
  scene.add(model.group)
  const hemi = new THREE.HemisphereLight(0x88ccff, 0x020408, 1.4)
  scene.add(hemi)
  const key = new THREE.DirectionalLight(0xffffff, 2.6)
  key.position.set(3, 5, 4)
  scene.add(key)
  const rim = new THREE.PointLight(0x00e5ff, 20, 12)
  rim.position.set(-3, 1.5, -3)
  scene.add(rim)
  const rim2 = new THREE.PointLight(0xff7a18, 12, 10)
  rim2.position.set(3, 1, -4)
  scene.add(rim2)
  // turntable disc
  const disc = new THREE.Mesh(
    new THREE.CylinderGeometry(2.2, 2.4, 0.1, 48),
    new THREE.MeshStandardMaterial({ color: '#04080f', metalness: 0.9, roughness: 0.25 })
  )
  disc.position.y = -0.02
  scene.add(disc)
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.35, 0.02, 6, 64),
    new THREE.MeshBasicMaterial({ color: custom?.accent || bike.visual.accent })
  )
  ring.rotation.x = Math.PI / 2
  ring.position.y = 0.04
  scene.add(ring)
  return { scene, camera, model, ring, disc }
}
