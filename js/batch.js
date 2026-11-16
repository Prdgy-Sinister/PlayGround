/* ============================================================
   WANDLORE — batch.js
   Merges static, opaque props into one mesh per material so the
   renderer issues far fewer draw calls. Animated groups (player,
   NPCs, creatures, nodes, floating props, the duelling barrier)
   are passed in as dynamic roots and never touched.
   ============================================================ */
import * as THREE from 'three'

const MERGEABLE = new Set(['MeshStandardMaterial', 'MeshLambertMaterial', 'MeshPhongMaterial', 'MeshBasicMaterial'])

function materialKey(m) {
  if (!m || Array.isArray(m) || !MERGEABLE.has(m.type)) return null
  // Textured / transparent surfaces keep their own draw call: they need
  // their own sorting and a shared texture would be required to merge.
  if (m.map || m.alphaMap || m.normalMap || m.roughnessMap || m.emissiveMap || m.envMap) return null
  if (m.transparent || m.opacity < 1) return null
  const color = m.color ? m.color.getHexString() : ''
  const emissive = m.emissive ? m.emissive.getHexString() : ''
  return [
    m.type, color, emissive, m.emissiveIntensity ?? '',
    m.roughness ?? '', m.metalness ?? '', m.flatShading ? 1 : 0,
    m.side, m.vertexColors ? 1 : 0, m.toneMapped ? 1 : 0, m.blending ?? '',
  ].join('|')
}

function collectDynamic(root, set) {
  if (!root) return
  root.traverse?.(o => set.add(o)) || set.add(root)
}

function mergeGroup(meshes, material) {
  const positions = []
  const normals = []
  const normalMatrix = new THREE.Matrix3()
  const v = new THREE.Vector3()

  for (const mesh of meshes) {
    const geo = mesh.geometry
    if (!geo?.attributes?.position) continue
    // Expand indexed geometry so every source can share one buffer.
    const source = geo.index ? geo.toNonIndexed() : geo
    const pos = source.attributes.position
    const nrm = source.attributes.normal
    normalMatrix.getNormalMatrix(mesh.matrixWorld)
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld)
      positions.push(v.x, v.y, v.z)
      if (nrm) {
        v.fromBufferAttribute(nrm, i).applyMatrix3(normalMatrix).normalize()
        normals.push(v.x, v.y, v.z)
      } else {
        normals.push(0, 1, 0)
      }
    }
    if (source !== geo) source.dispose()
  }
  if (!positions.length) return null

  const merged = new THREE.BufferGeometry()
  merged.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  merged.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  merged.computeBoundingSphere()
  const mesh = new THREE.Mesh(merged, material)
  mesh.matrixAutoUpdate = false
  mesh.updateMatrix()
  return mesh
}

/**
 * @param {THREE.Scene} scene
 * @param {THREE.Object3D[]} dynamicRoots roots whose whole subtree must stay live
 * @returns {{groups:number, meshes:number, saved:number}} statistics
 */
export function batchStatic(scene, dynamicRoots = []) {
  const dynamic = new Set()
  for (const root of dynamicRoots) collectDynamic(root, dynamic)
  scene.updateMatrixWorld(true)

  const buckets = new Map()
  const all = []
  scene.traverse(obj => {
    if (!obj.isMesh || obj.isInstancedMesh || obj.isSkinnedMesh) return
    if (!obj.visible || dynamic.has(obj)) return
    if (obj.geometry?.morphAttributes && Object.keys(obj.geometry.morphAttributes).length) return
    const key = materialKey(obj.material)
    if (!key) return
    all.push(obj)
    let bucket = buckets.get(key)
    if (!bucket) { bucket = { material: obj.material, meshes: [] }; buckets.set(key, bucket) }
    bucket.meshes.push(obj)
  })

  let groups = 0
  let meshes = 0
  for (const { material, meshes: list } of buckets.values()) {
    if (list.length < 2) continue
    const merged = mergeGroup(list, material)
    if (!merged) continue
    for (const mesh of list) mesh.parent?.remove(mesh)
    scene.add(merged)
    groups++
    meshes += list.length
  }
  return { groups, meshes, saved: meshes - groups }
}
