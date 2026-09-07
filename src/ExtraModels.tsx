import { RoundedBox } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

const glass = '#bfe8ff'
const darkGlass = '#29445f'
const tire = '#202733'
const rim = '#d6dee8'
const chrome = '#d9e2ec'
const warmLight = '#fff0a8'

function Wheel({ position, radius = 0.34 }: { position: [number, number, number]; radius?: number }) {
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[radius, radius, radius * 0.72, 28]} />
        <meshStandardMaterial color={tire} roughness={0.84} />
      </mesh>
      <mesh position={[0, radius * 0.39, 0]}>
        <cylinderGeometry args={[radius * 0.5, radius * 0.5, radius * 0.77, 20]} />
        <meshStandardMaterial color={rim} metalness={0.35} roughness={0.32} />
      </mesh>
    </group>
  )
}

function HeadLights({ x, y, spread = 0.5 }: { x: number; y: number; spread?: number }) {
  return (
    <>
      {[spread, -spread].map((z) => (
        <mesh key={z} position={[x, y, z]}>
          <sphereGeometry args={[0.1, 16, 12]} />
          <meshStandardMaterial color={warmLight} emissive="#d9a72c" emissiveIntensity={0.38} />
        </mesh>
      ))}
    </>
  )
}

function Car({ color, taxi = false }: { color: string; taxi?: boolean }) {
  return (
    <group rotation={[0, -0.08, 0]}>
      <RoundedBox args={[3.65, 0.68, 1.65]} radius={0.22} smoothness={5} position={[0, 0.76, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.38} />
      </RoundedBox>
      <RoundedBox args={[1.65, 0.82, 1.5]} radius={0.22} smoothness={5} position={[0.15, 1.31, 0]} castShadow>
        <meshStandardMaterial color={color} roughness={0.38} />
      </RoundedBox>
      <RoundedBox args={[0.67, 0.47, 0.052]} radius={0.07} smoothness={3} position={[0.5, 1.42, 0.78]}>
        <meshStandardMaterial color={darkGlass} roughness={0.18} />
      </RoundedBox>
      <RoundedBox args={[0.58, 0.47, 0.052]} radius={0.07} smoothness={3} position={[-0.38, 1.42, 0.78]}>
        <meshStandardMaterial color={darkGlass} roughness={0.18} />
      </RoundedBox>
      <RoundedBox args={[0.08, 0.36, 1.28]} radius={0.03} smoothness={3} position={[1.86, 0.77, 0]}>
        <meshStandardMaterial color={chrome} metalness={0.32} roughness={0.3} />
      </RoundedBox>
      <HeadLights x={1.91} y={0.86} />
      {taxi && (
        <>
          <RoundedBox args={[3.0, 0.12, 0.055]} radius={0.025} smoothness={3} position={[-0.05, 0.84, 0.86]}>
            <meshStandardMaterial color="#202733" roughness={0.42} />
          </RoundedBox>
          <RoundedBox args={[0.64, 0.28, 0.32]} radius={0.07} smoothness={4} position={[0.05, 1.82, 0]} castShadow>
            <meshStandardMaterial color="#fff7d6" roughness={0.35} emissive="#d39b20" emissiveIntensity={0.1} />
          </RoundedBox>
        </>
      )}
      <Wheel position={[1.2, 0.38, 0.86]} />
      <Wheel position={[1.2, 0.38, -0.86]} />
      <Wheel position={[-1.2, 0.38, 0.86]} />
      <Wheel position={[-1.2, 0.38, -0.86]} />
    </group>
  )
}

function Truck({ color }: { color: string }) {
  return (
    <group rotation={[0, -0.08, 0]}>
      <RoundedBox args={[1.35, 1.25, 1.72]} radius={0.18} smoothness={5} position={[1.25, 1.18, 0]} castShadow>
        <meshStandardMaterial color={color} roughness={0.4} />
      </RoundedBox>
      <RoundedBox args={[0.56, 0.54, 0.052]} radius={0.06} smoothness={3} position={[1.45, 1.48, 0.89]}>
        <meshStandardMaterial color={glass} roughness={0.17} />
      </RoundedBox>
      <RoundedBox args={[2.55, 1.35, 1.82]} radius={0.12} smoothness={4} position={[-0.7, 1.22, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#f0f2f4" roughness={0.5} />
      </RoundedBox>
      <RoundedBox args={[2.1, 0.12, 1.62]} radius={0.04} smoothness={3} position={[-0.75, 1.92, 0]}>
        <meshStandardMaterial color={color} roughness={0.4} />
      </RoundedBox>
      <RoundedBox args={[0.07, 0.42, 1.3]} radius={0.03} smoothness={3} position={[1.95, 0.82, 0]}>
        <meshStandardMaterial color={chrome} metalness={0.35} roughness={0.3} />
      </RoundedBox>
      <HeadLights x={1.99} y={0.94} spread={0.52} />
      <Wheel position={[1.15, 0.4, 0.91]} radius={0.36} />
      <Wheel position={[1.15, 0.4, -0.91]} radius={0.36} />
      <Wheel position={[-1.18, 0.4, 0.91]} radius={0.38} />
      <Wheel position={[-1.18, 0.4, -0.91]} radius={0.38} />
    </group>
  )
}

function Bicycle({ color }: { color: string }) {
  const tube = (position: [number, number, number], rotation: [number, number, number], length: number) => (
    <mesh position={position} rotation={rotation} castShadow>
      <cylinderGeometry args={[0.055, 0.055, length, 10]} />
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
    </mesh>
  )
  return (
    <group rotation={[0, -0.08, 0]}>
      {[-1.0, 1.0].map((x) => (
        <group key={x} position={[x, 0.88, 0]}>
          <mesh castShadow>
            <torusGeometry args={[0.72, 0.07, 12, 36]} />
            <meshStandardMaterial color={tire} roughness={0.85} />
          </mesh>
          <mesh>
            <torusGeometry args={[0.57, 0.018, 8, 28]} />
            <meshStandardMaterial color={rim} metalness={0.5} roughness={0.28} />
          </mesh>
        </group>
      ))}
      {tube([0, 1.05, 0], [0, 0, Math.PI / 2], 1.55)}
      {tube([-0.22, 1.35, 0], [0, 0, -0.65], 1.3)}
      {tube([0.22, 1.35, 0], [0, 0, 0.7], 1.25)}
      {tube([0.73, 1.42, 0], [0, 0, -0.34], 1.35)}
      <mesh position={[-0.42, 1.72, 0]} castShadow>
        <boxGeometry args={[0.48, 0.08, 0.24]} />
        <meshStandardMaterial color="#2b3442" roughness={0.72} />
      </mesh>
      <mesh position={[0.73, 2.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 0.82, 10]} />
        <meshStandardMaterial color={chrome} metalness={0.5} roughness={0.28} />
      </mesh>
      <mesh position={[0, 1.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.16, 16]} />
        <meshStandardMaterial color="#3f4856" metalness={0.45} roughness={0.32} />
      </mesh>
    </group>
  )
}

export function ExtraVehicleModel({ kind, color }: { kind: string; color: string }) {
  if (kind === 'car') return <Car color={color} />
  if (kind === 'truck') return <Truck color={color} />
  if (kind === 'taxi') return <Car color={color} taxi />
  return <Bicycle color={color} />
}

function Eye({ position, size = 0.075 }: { position: [number, number, number]; size?: number }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[size, 14, 10]} />
        <meshStandardMaterial color="#171b24" roughness={0.3} />
      </mesh>
      <mesh position={[size * 0.35, size * 0.35, size * 0.55]}>
        <sphereGeometry args={[size * 0.22, 8, 6]} />
        <meshBasicMaterial color="#fff" />
      </mesh>
    </group>
  )
}

function Rabbit({ color }: { color: string }) {
  const pale = '#f2e3d5'
  return (
    <group>
      <mesh castShadow position={[-0.18, 1.0, 0]} scale={[1.15, 0.86, 0.82]}>
        <sphereGeometry args={[0.72, 24, 18]} />
        <meshStandardMaterial color={color} roughness={0.84} />
      </mesh>
      <mesh castShadow position={[0.68, 1.42, 0]}>
        <sphereGeometry args={[0.52, 24, 18]} />
        <meshStandardMaterial color={color} roughness={0.84} />
      </mesh>
      {[0.22, -0.22].map((z) => (
        <group key={z} position={[0.5, 2.12, z]} rotation={[0, 0, z > 0 ? -0.08 : 0.08]}>
          <mesh castShadow scale={[0.42, 1.3, 0.5]}>
            <sphereGeometry args={[0.32, 18, 14]} />
            <meshStandardMaterial color={color} roughness={0.84} />
          </mesh>
          <mesh position={[0.02, 0, 0]} scale={[0.2, 0.9, 0.25]}>
            <sphereGeometry args={[0.32, 14, 10]} />
            <meshStandardMaterial color="#f2b7bd" roughness={0.75} />
          </mesh>
        </group>
      ))}
      <mesh castShadow position={[1.05, 1.3, 0]} scale={[0.75, 0.48, 0.62]}>
        <sphereGeometry args={[0.3, 18, 14]} />
        <meshStandardMaterial color={pale} roughness={0.84} />
      </mesh>
      <Eye position={[1.03, 1.58, 0.27]} />
      <Eye position={[1.03, 1.58, -0.27]} />
      <mesh position={[1.27, 1.34, 0]}>
        <sphereGeometry args={[0.07, 12, 8]} />
        <meshStandardMaterial color="#ef9ba5" roughness={0.5} />
      </mesh>
      <mesh castShadow position={[-0.94, 1.1, 0]}>
        <sphereGeometry args={[0.28, 18, 14]} />
        <meshStandardMaterial color="#fff9f4" roughness={0.9} />
      </mesh>
      {[-0.52, 0.42].flatMap((x) => [0.38, -0.38].map((z) => (
        <mesh key={`${x}-${z}`} castShadow position={[x, 0.28, z]} scale={[1.3, 0.65, 0.9]}>
          <sphereGeometry args={[0.24, 16, 12]} />
          <meshStandardMaterial color={pale} roughness={0.88} />
        </mesh>
      )))}
    </group>
  )
}

function Bird({ color }: { color: string }) {
  return (
    <group>
      <mesh castShadow position={[0, 1.25, 0]} scale={[1.15, 0.82, 0.82]}>
        <sphereGeometry args={[0.68, 24, 18]} />
        <meshStandardMaterial color={color} roughness={0.72} />
      </mesh>
      <mesh castShadow position={[0.7, 1.58, 0]}>
        <sphereGeometry args={[0.46, 22, 16]} />
        <meshStandardMaterial color={color} roughness={0.72} />
      </mesh>
      {[0.55, -0.55].map((z) => (
        <mesh key={z} castShadow position={[-0.05, 1.28, z]} rotation={[0.1, 0, z > 0 ? 0.25 : -0.25]} scale={[1.2, 0.55, 0.28]}>
          <sphereGeometry args={[0.55, 18, 14]} />
          <meshStandardMaterial color="#e8f1fa" roughness={0.75} />
        </mesh>
      ))}
      <mesh position={[1.16, 1.5, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.16, 0.42, 4]} />
        <meshStandardMaterial color="#f4a340" roughness={0.62} />
      </mesh>
      <Eye position={[1.02, 1.72, 0.22]} size={0.065} />
      <Eye position={[1.02, 1.72, -0.22]} size={0.065} />
      <mesh castShadow position={[-0.72, 1.27, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.36, 0.72, 4]} />
        <meshStandardMaterial color="#6a7d92" roughness={0.8} />
      </mesh>
      {[0.22, -0.22].map((z) => (
        <mesh key={z} position={[0.2, 0.62, z]}>
          <cylinderGeometry args={[0.035, 0.035, 0.45, 8]} />
          <meshStandardMaterial color="#d9913e" roughness={0.72} />
        </mesh>
      ))}
    </group>
  )
}

function Fish({ color }: { color: string }) {
  return (
    <group position={[0, 0.28, 0]}>
      <mesh castShadow position={[0, 1.1, 0]} scale={[1.45, 0.78, 0.62]}>
        <sphereGeometry args={[0.75, 26, 18]} />
        <meshStandardMaterial color={color} roughness={0.45} />
      </mesh>
      <mesh castShadow position={[-1.05, 1.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.55, 0.82, 3]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh castShadow position={[-0.05, 1.72, 0]} rotation={[0, 0, Math.PI]} scale={[1.1, 0.75, 0.6]}>
        <coneGeometry args={[0.28, 0.55, 3]} />
        <meshStandardMaterial color="#d8f1ff" roughness={0.55} />
      </mesh>
      <Eye position={[0.86, 1.28, 0.34]} size={0.075} />
      <Eye position={[0.86, 1.28, -0.34]} size={0.075} />
      <mesh position={[0.95, 1.03, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.09, 0.025, 8, 16]} />
        <meshStandardMaterial color="#d85b66" roughness={0.55} />
      </mesh>
    </group>
  )
}

function Bear({ color }: { color: string }) {
  const muzzle = '#d8b58f'
  return (
    <group>
      <mesh castShadow position={[-0.1, 1.15, 0]} scale={[1.18, 1.0, 0.92]}>
        <sphereGeometry args={[0.86, 26, 18]} />
        <meshStandardMaterial color={color} roughness={0.86} />
      </mesh>
      <mesh castShadow position={[0.7, 1.72, 0]}>
        <sphereGeometry args={[0.62, 24, 18]} />
        <meshStandardMaterial color={color} roughness={0.86} />
      </mesh>
      {[0.42, -0.42].map((z) => (
        <mesh key={z} castShadow position={[0.55, 2.23, z]}>
          <sphereGeometry args={[0.22, 16, 12]} />
          <meshStandardMaterial color={color} roughness={0.86} />
        </mesh>
      ))}
      <mesh castShadow position={[1.13, 1.58, 0]} scale={[0.82, 0.55, 0.72]}>
        <sphereGeometry args={[0.34, 18, 14]} />
        <meshStandardMaterial color={muzzle} roughness={0.86} />
      </mesh>
      <mesh position={[1.38, 1.64, 0]}>
        <sphereGeometry args={[0.09, 12, 8]} />
        <meshStandardMaterial color="#2c231f" roughness={0.5} />
      </mesh>
      <Eye position={[1.08, 1.9, 0.28]} />
      <Eye position={[1.08, 1.9, -0.28]} />
      {[-0.62, 0.46].flatMap((x) => [0.48, -0.48].map((z) => (
        <mesh key={`${x}-${z}`} castShadow position={[x, 0.34, z]} scale={[0.8, 1.15, 0.8]}>
          <sphereGeometry args={[0.34, 18, 14]} />
          <meshStandardMaterial color={color} roughness={0.88} />
        </mesh>
      )))}
    </group>
  )
}

export function ExtraAnimalModel({ kind, color }: { kind: string; color: string }) {
  if (kind === 'rabbit') return <Rabbit color={color} />
  if (kind === 'bird') return <Bird color={color} />
  if (kind === 'fish') return <Fish color={color} />
  return <Bear color={color} />
}

function Table({ color }: { color: string }) {
  return (
    <group rotation={[0, -0.14, 0]}>
      <RoundedBox args={[2.6, 0.28, 1.72]} radius={0.1} smoothness={4} position={[0, 1.45, 0]} castShadow>
        <meshStandardMaterial color={color} roughness={0.6} />
      </RoundedBox>
      {[-0.98, 0.98].flatMap((x) => [-0.58, 0.58].map((z) => (
        <RoundedBox key={`${x}-${z}`} args={[0.22, 1.4, 0.22]} radius={0.06} smoothness={3} position={[x, 0.68, z]} castShadow>
          <meshStandardMaterial color={color} roughness={0.62} />
        </RoundedBox>
      )))}
    </group>
  )
}

function BoxObject({ color }: { color: string }) {
  return (
    <group position={[0, 0.9, 0]} rotation={[0, -0.16, 0]}>
      <RoundedBox args={[2.0, 1.65, 1.7]} radius={0.12} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.68} />
      </RoundedBox>
      <RoundedBox args={[2.08, 0.14, 1.78]} radius={0.05} smoothness={3} position={[0, 0.86, 0]} castShadow>
        <meshStandardMaterial color="#e9d1a7" roughness={0.68} />
      </RoundedBox>
      <RoundedBox args={[0.16, 1.7, 1.76]} radius={0.03} smoothness={3} position={[0, 0, 0]}>
        <meshStandardMaterial color="#f1dfbf" roughness={0.72} />
      </RoundedBox>
    </group>
  )
}

function Apple({ color }: { color: string }) {
  return (
    <group position={[0, 0.25, 0]}>
      <mesh castShadow position={[-0.25, 1.05, 0]} scale={[0.95, 1.05, 0.9]}>
        <sphereGeometry args={[0.75, 28, 20]} />
        <meshStandardMaterial color={color} roughness={0.42} />
      </mesh>
      <mesh castShadow position={[0.25, 1.05, 0]} scale={[0.95, 1.05, 0.9]}>
        <sphereGeometry args={[0.75, 28, 20]} />
        <meshStandardMaterial color={color} roughness={0.42} />
      </mesh>
      <mesh castShadow position={[0, 1.92, 0]} rotation={[0, 0, 0.16]}>
        <cylinderGeometry args={[0.055, 0.075, 0.48, 10]} />
        <meshStandardMaterial color="#70462c" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0.3, 2.0, 0]} rotation={[0.15, 0, -0.55]} scale={[1.25, 0.48, 0.5]}>
        <sphereGeometry args={[0.28, 16, 12]} />
        <meshStandardMaterial color="#4fa85e" roughness={0.72} />
      </mesh>
    </group>
  )
}

function Banana({ color }: { color: string }) {
  return (
    <group position={[0, 1.05, 0]} rotation={[0.1, -0.22, -0.18]}>
      <mesh castShadow>
        <torusGeometry args={[0.92, 0.27, 18, 44, Math.PI * 1.15]} />
        <meshStandardMaterial color={color} roughness={0.48} />
      </mesh>
      <mesh position={[-0.89, 0.22, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.09, 0.12, 0.34, 10]} />
        <meshStandardMaterial color="#6d5530" roughness={0.76} />
      </mesh>
    </group>
  )
}

export function ExtraObjectModel({ kind, color }: { kind: string; color: string }) {
  if (kind === 'table') return <Table color={color} />
  if (kind === 'box') return <BoxObject color={color} />
  if (kind === 'apple') return <Apple color={color} />
  return <Banana color={color} />
}

function heartShape() {
  const s = new THREE.Shape()
  s.moveTo(0, -0.8)
  s.bezierCurveTo(-1.25, -0.1, -1.15, 0.9, -0.45, 0.9)
  s.bezierCurveTo(-0.05, 0.9, 0, 0.55, 0, 0.42)
  s.bezierCurveTo(0, 0.55, 0.05, 0.9, 0.45, 0.9)
  s.bezierCurveTo(1.15, 0.9, 1.25, -0.1, 0, -0.8)
  return s
}

export function ExtraShapeModel({ kind, color }: { kind: string; color: string }) {
  const heart = useMemo(() => heartShape(), [])
  const mat = <meshStandardMaterial color={color} roughness={0.3} metalness={0.02} />

  if (kind === 'rectangle') {
    return (
      <RoundedBox args={[2.65, 1.55, 0.46]} radius={0.14} smoothness={5} position={[0, 1.12, 0]} castShadow receiveShadow>
        {mat}
      </RoundedBox>
    )
  }
  if (kind === 'oval') {
    return (
      <mesh castShadow receiveShadow position={[0, 1.18, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1.38, 1, 1]}>
        <cylinderGeometry args={[1.0, 1.0, 0.45, 56]} />
        {mat}
      </mesh>
    )
  }
  if (kind === 'diamond') {
    return (
      <RoundedBox args={[1.65, 1.65, 0.48]} radius={0.11} smoothness={5} position={[0, 1.18, 0]} rotation={[0, 0, Math.PI / 4]} castShadow receiveShadow>
        {mat}
      </RoundedBox>
    )
  }
  return (
    <mesh castShadow receiveShadow position={[0, 1.1, -0.22]} scale={[1.05, 1.05, 1]}>
      <extrudeGeometry args={[heart, { depth: 0.44, bevelEnabled: true, bevelSize: 0.08, bevelThickness: 0.08, bevelSegments: 4 }]} />
      {mat}
    </mesh>
  )
}
