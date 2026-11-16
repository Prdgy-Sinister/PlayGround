/* ============================================================
   WANDLORE — fx.js
   Lightweight magical VFX: glow sprites, projectiles, beams,
   bursts, rings and floating particles. Pooled where it matters.
   ============================================================ */
import * as THREE from 'three'

function radialTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grd.addColorStop(0, 'rgba(255,255,255,1)')
  grd.addColorStop(0.25, 'rgba(255,255,255,.75)')
  grd.addColorStop(0.55, 'rgba(255,255,255,.22)')
  grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd; g.fillRect(0, 0, 128, 128)
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace
  return t
}

export class FX {
  constructor(scene, lowPower = false) {
    this.scene = scene
    this.tex = radialTexture()
    this.active = []
    this.pool = []
    this.time = 0
    this.density = lowPower ? 0.55 : 1
  }

  sprite(color, size = 1, opacity = 1) {
    const mat = new THREE.SpriteMaterial({
      map: this.tex, color: new THREE.Color(color), transparent: true,
      opacity, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: true,
    })
    const s = new THREE.Sprite(mat)
    s.scale.setScalar(size)
    return s
  }

  makeOrb(color, size = 0.5) {
    const group = new THREE.Group()
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(size * 0.42, 12, 10),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(color), toneMapped: false })
    )
    const glow = this.sprite(color, size * 3.2, 0.92)
    group.add(core, glow)
    group.userData = { core, glow, color, size }
    this.scene.add(group)
    return group
  }

  removeOrb(orb) {
    if (!orb) return
    this.scene.remove(orb)
    orb.traverse(o => {
      if (o.geometry) o.geometry.dispose()
      if (o.material) o.material.dispose()
    })
  }

  trail(pos, color, size = 0.5, life = 0.55) {
    const sp = this.sprite(color, size, 0.55)
    sp.position.copy(pos)
    this.scene.add(sp)
    this.active.push({ obj: sp, life, max: life, kind: 'fade', vel: new THREE.Vector3(0, 0.3, 0) })
  }

  burst(pos, color, count = 18, spread = 5, size = 0.5, life = 0.7) {
    count = Math.max(4, Math.round(count * this.density))
    for (let i = 0; i < count; i++) {
      const sp = this.sprite(color, size * (0.5 + Math.random()), 0.95)
      sp.position.copy(pos)
      const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.35, Math.random() - 0.5).normalize()
      const speed = spread * (0.35 + Math.random() * 0.8)
      this.scene.add(sp)
      this.active.push({ obj: sp, life: life * (0.6 + Math.random() * 0.6), max: life, kind: 'particle', vel: dir.multiplyScalar(speed), gravity: -3 })
    }
  }

  runeRing(pos, color, size = 2, life = 0.7) {
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity: 0.9, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
    const ring = new THREE.Mesh(new THREE.RingGeometry(size * 0.75, size, 48), mat)
    ring.rotation.x = -Math.PI / 2
    ring.position.copy(pos); ring.position.y += 0.06
    this.scene.add(ring)
    this.active.push({ obj: ring, life, max: life, kind: 'ring', grow: 2.4, fade: 1 })
  }

  shieldBurst(pos, color = '#9fd0ff') {
    this.burst(pos, color, 24, 6.5, 0.55, 0.6)
    this.runeRing(pos, color, 1.4, 0.5)
  }

  beam(from, to, color, life = 0.24, width = 0.11) {
    const a = new THREE.Vector3().copy(from)
    const b = new THREE.Vector3().copy(to)
    const len = a.distanceTo(b)
    if (len < 0.01) return
    const geo = new THREE.CylinderGeometry(width, width * 0.5, len, 6, 1, true)
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.copy(a).add(b).multiplyScalar(0.5)
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize())
    this.scene.add(mesh)
    const glow = this.sprite(color, 1.4, 0.85)
    glow.position.copy(b)
    this.scene.add(glow)
    this.active.push({ obj: mesh, life, max: life, kind: 'beam', width })
    this.active.push({ obj: glow, life: life * 1.5, max: life * 1.5, kind: 'fade' })
  }

  castFlash(pos, color, size = 1.2) {
    const sp = this.sprite(color, size, 1)
    sp.position.copy(pos)
    this.scene.add(sp)
    this.active.push({ obj: sp, life: 0.3, max: 0.3, kind: 'ring', grow: 3.4 })
  }

  implosion(pos, color, count = 12) {
    count = Math.max(4, Math.round(count * this.density))
    for (let i = 0; i < count; i++) {
      const sp = this.sprite(color, 0.32 + Math.random() * 0.3, 0.9)
      const ang = Math.random() * Math.PI * 2
      const rad = 2 + Math.random() * 2.5
      sp.position.set(pos.x + Math.cos(ang) * rad, pos.y + (Math.random() - 0.5) * 2, pos.z + Math.sin(ang) * rad)
      this.scene.add(sp)
      const dir = new THREE.Vector3().subVectors(pos, sp.position).normalize()
      this.active.push({ obj: sp, life: 0.38, max: 0.38, kind: 'particle', vel: dir.multiplyScalar(8), gravity: 0 })
    }
  }

  aura(actor, color) {
    if (actor.userData.aura) return
    const sp = this.sprite(color, 2.1, 0.4)
    sp.position.y = 1.1
    actor.add(sp)
    actor.userData.aura = sp
  }

  update(dt) {
    this.time += dt
    for (let i = this.active.length - 1; i >= 0; i--) {
      const p = this.active[i]
      p.life -= dt
      if (p.life <= 0) {
        this.scene.remove(p.obj)
        if (p.obj.geometry) p.obj.geometry.dispose()
        if (p.obj.material) p.obj.material.dispose()
        this.active.splice(i, 1)
        continue
      }
      const t = p.life / p.max
      if (p.kind === 'particle') {
        p.vel.y += (p.gravity || 0) * dt
        p.obj.position.addScaledVector(p.vel, dt)
        p.obj.material.opacity = Math.max(0, t) * 0.95
      } else if (p.kind === 'fade') {
        p.obj.material.opacity = t * 0.8
        if (p.vel) p.obj.position.addScaledVector(p.vel, dt)
      } else if (p.kind === 'ring') {
        const grow = p.grow || 2
        p.obj.scale.setScalar(1 + (1 - t) * grow)
        p.obj.material.opacity = t * 0.85
      } else if (p.kind === 'beam') {
        p.obj.material.opacity = t
        p.obj.scale.x = p.obj.scale.z = 0.4 + t * 0.8
      }
    }
  }
}
