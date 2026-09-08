import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js'

const BASE = import.meta.env.BASE_URL

const assets = {
  car: `${BASE}models/external/car.glb`,
  truck: `${BASE}models/external/truck.glb`,
  dog: `${BASE}models/external/dog.glb`,
  box: `${BASE}models/external/box.glb`,
} as const

type AssetKey = keyof typeof assets

type ExternalAssetModelProps = {
  kind: AssetKey
  color: string
}

function shouldTint(material: THREE.Material) {
  const standard = material as THREE.MeshStandardMaterial
  if (!standard.color) return false

  const name = material.name.toLowerCase()
  if (/(glass|window|wheel|tire|tyre|rim|metal|chrome|light|black)/.test(name)) return false

  const { r, g, b } = standard.color
  const brightness = (r + g + b) / 3
  if (brightness < 0.16) return false

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const saturation = max - min

  return saturation > 0.08 || brightness > 0.72
}

function prepareScene(
  source: THREE.Group,
  color: string,
  targetSize: number,
  tint: boolean,
  rotationY = 0,
) {
  const root = cloneSkeleton(source) as THREE.Group
  root.rotation.y = rotationY

  root.traverse((child) => {
    const mesh = child as THREE.Mesh
    if (!mesh.isMesh) return

    mesh.castShadow = true
    mesh.receiveShadow = true

    const sourceMaterials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
    const clonedMaterials = sourceMaterials.map((material) => {
      const cloned = material.clone()
      if (tint && shouldTint(cloned)) {
        const standard = cloned as THREE.MeshStandardMaterial
        standard.color.set(color)
        if ('roughness' in standard) standard.roughness = Math.max(0.35, standard.roughness ?? 0.45)
      }
      return cloned
    })

    mesh.material = Array.isArray(mesh.material) ? clonedMaterials : clonedMaterials[0]
  })

  root.updateMatrixWorld(true)
  let box = new THREE.Box3().setFromObject(root)
  const size = new THREE.Vector3()
  box.getSize(size)
  const maxDimension = Math.max(size.x, size.y, size.z) || 1
  const scalar = targetSize / maxDimension
  root.scale.setScalar(scalar)

  root.updateMatrixWorld(true)
  box = new THREE.Box3().setFromObject(root)
  const center = new THREE.Vector3()
  box.getCenter(center)

  root.position.x -= center.x
  root.position.z -= center.z
  root.position.y -= box.min.y
  root.updateMatrixWorld(true)

  return root
}

export function ExternalAssetModel({ kind, color }: ExternalAssetModelProps) {
  const gltf = useGLTF(assets[kind])

  const prepared = useMemo(() => {
    const config = {
      car: { targetSize: 4.25, tint: true, rotationY: 0 },
      truck: { targetSize: 4.45, tint: true, rotationY: 0 },
      dog: { targetSize: 2.55, tint: false, rotationY: Math.PI / 2 },
      box: { targetSize: 2.15, tint: true, rotationY: 0 },
    }[kind]

    return prepareScene(gltf.scene, color, config.targetSize, config.tint, config.rotationY)
  }, [color, gltf.scene, kind])

  return <primitive object={prepared} />
}

Object.values(assets).forEach((url) => useGLTF.preload(url))
