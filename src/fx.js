import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Cheap, procedural "bloom" helpers. Everything here is a single additive
// sprite, so the game keeps its zero-asset budget while neon accents still pop.
// ---------------------------------------------------------------------------
let glowTexture = null;
function getGlowTexture() {
  if (glowTexture) return glowTexture;
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.22, 'rgba(255,255,255,0.82)');
  g.addColorStop(0.55, 'rgba(255,255,255,0.24)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  glowTexture = new THREE.CanvasTexture(c);
  glowTexture.colorSpace = THREE.SRGBColorSpace;
  return glowTexture;
}

export function makeGlow(color, size = 2, opacity = 0.6) {
  const mat = new THREE.SpriteMaterial({
    map: getGlowTexture(),
    color: new THREE.Color(color),
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.setScalar(size);
  return sprite;
}

export function addGlow(parent, color, pos, size = 2, opacity = 0.6) {
  const sprite = makeGlow(color, size, opacity);
  if (pos) sprite.position.set(...pos);
  parent.add(sprite);
  return sprite;
}

// A soft pulsing beacon used by the big hazards to telegraph their timing.
export function addBeacon(parent, color, pos, size = 3, speed = 2.2, phase = 0) {
  const sprite = addGlow(parent, color, pos, size, 0.45);
  sprite.userData.beacon = { speed, phase, base: 0.45 };
  return sprite;
}

export function updateBeacon(sprite, t) {
  const b = sprite?.userData?.beacon;
  if (!b) return;
  sprite.material.opacity = b.base + Math.sin(t * b.speed + b.phase) * 0.18;
}
