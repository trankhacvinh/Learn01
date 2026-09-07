import { RoundedBox } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

function starShape() {
  const shape = new THREE.Shape()
  const outer = 1.18
  const inner = 0.5
  for (let i = 0; i < 10; i += 1) {
    const angle = -Math.PI / 2 + (i * Math.PI) / 5
    const radius = i % 2 === 0 ? outer : inner
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    if (i === 0) shape.moveTo(x, y)
    else shape.lineTo(x, y)
  }
  shape.closePath()
  return shape
}

export function ShapeModel({ kind, color }: { kind: string; color: string }) {
  const star = useMemo(() => starShape(), [])
  const material = <meshStandardMaterial color={color} roughness={0.3} metalness={0.02} />

  if (kind === 'circle') {
    return (
      <mesh castShadow receiveShadow position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.18, 1.18, 0.45, 56, 1, false]} />
        {material}
      </mesh>
    )
  }
  if (kind === 'square') {
    return (
      <RoundedBox args={[2.12, 2.12, 0.46]} radius={0.14} smoothness={5} position={[0, 1.22, 0]} castShadow receiveShadow>
        {material}
      </RoundedBox>
    )
  }
  if (kind === 'triangle') {
    return (
      <mesh castShadow receiveShadow position={[0, 1.15, -0.15]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[1.25, 1.25, 0.46, 3, 1, false]} />
        {material}
      </mesh>
    )
  }
  return (
    <mesh castShadow receiveShadow position={[0, 1.12, -0.22]}>
      <extrudeGeometry args={[star, { depth: 0.44, bevelEnabled: true, bevelSize: 0.09, bevelThickness: 0.09, bevelSegments: 4 }]} />
      {material}
    </mesh>
  )
}
