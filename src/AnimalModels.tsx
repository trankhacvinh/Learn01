import { RoundedBox } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

function PawLeg({ position, color, pawColor = color, length = 0.72 }: { position: [number, number, number]; color: string; pawColor?: string; length?: number }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, length * 0.48, 0]}>
        <cylinderGeometry args={[0.13, 0.16, length, 14]} />
        <meshStandardMaterial color={color} roughness={0.82} />
      </mesh>
      <mesh castShadow position={[0.08, 0.08, 0]} scale={[1.25, 0.65, 1]}>
        <sphereGeometry args={[0.2, 16, 12]} />
        <meshStandardMaterial color={pawColor} roughness={0.82} />
      </mesh>
    </group>
  )
}

function Eye({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh scale={[1, 1.1, 0.65]}>
        <sphereGeometry args={[0.09, 16, 12]} />
        <meshStandardMaterial color="#171b24" roughness={0.35} />
      </mesh>
      <mesh position={[0.035, 0.035, 0.045]}>
        <sphereGeometry args={[0.022, 10, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

function Dog({ color }: { color: string }) {
  const muzzle = '#ead2b6'
  return (
    <group>
      <mesh castShadow position={[-0.05, 1.23, 0]} scale={[1.35, 0.86, 0.86]}>
        <sphereGeometry args={[0.82, 28, 20]} />
        <meshStandardMaterial color={color} roughness={0.78} />
      </mesh>
      <mesh castShadow position={[0.93, 1.57, 0]} scale={[0.9, 0.95, 0.95]}>
        <sphereGeometry args={[0.62, 28, 20]} />
        <meshStandardMaterial color={color} roughness={0.78} />
      </mesh>
      <mesh castShadow position={[1.43, 1.43, 0]} scale={[0.8, 0.62, 0.75]}>
        <sphereGeometry args={[0.42, 22, 16]} />
        <meshStandardMaterial color={muzzle} roughness={0.82} />
      </mesh>
      <mesh position={[1.76, 1.48, 0]} scale={[0.8, 0.65, 0.72]}>
        <sphereGeometry args={[0.14, 16, 12]} />
        <meshStandardMaterial color="#252832" roughness={0.45} />
      </mesh>
      <Eye position={[1.33, 1.75, 0.36]} />
      <Eye position={[1.33, 1.75, -0.36]} />
      {[0.42, -0.42].map((z) => (
        <mesh key={z} castShadow position={[0.75, 1.97, z]} rotation={[0, 0, z > 0 ? -0.35 : 0.35]} scale={[0.65, 1.15, 0.45]}>
          <sphereGeometry args={[0.35, 20, 14]} />
          <meshStandardMaterial color="#8b5b3c" roughness={0.86} />
        </mesh>
      ))}
      <PawLeg position={[-0.62, 0.06, 0.52]} color={color} pawColor={muzzle} />
      <PawLeg position={[-0.62, 0.06, -0.52]} color={color} pawColor={muzzle} />
      <PawLeg position={[0.52, 0.06, 0.52]} color={color} pawColor={muzzle} />
      <PawLeg position={[0.52, 0.06, -0.52]} color={color} pawColor={muzzle} />
      <mesh castShadow position={[-1.05, 1.42, 0]} rotation={[0, 0, 0.9]}>
        <cylinderGeometry args={[0.07, 0.12, 0.82, 12]} />
        <meshStandardMaterial color={color} roughness={0.82} />
      </mesh>
      <RoundedBox args={[0.12, 0.12, 1.45]} radius={0.04} smoothness={3} position={[0.36, 1.34, 0]}>
        <meshStandardMaterial color="#e84d5b" roughness={0.5} />
      </RoundedBox>
    </group>
  )
}

function Cat({ color }: { color: string }) {
  const pale = '#f3e7da'
  return (
    <group>
      <mesh castShadow position={[-0.05, 1.2, 0]} scale={[1.25, 0.82, 0.78]}>
        <sphereGeometry args={[0.82, 28, 20]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0.9, 1.58, 0]}>
        <sphereGeometry args={[0.59, 28, 20]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {[0.33, -0.33].map((z) => (
        <group key={z} position={[0.75, 2.08, z]}>
          <mesh castShadow rotation={[0, 0, Math.PI]}>
            <coneGeometry args={[0.27, 0.55, 4]} />
            <meshStandardMaterial color={color} roughness={0.82} />
          </mesh>
          <mesh position={[0.01, -0.05, 0]} rotation={[0, 0, Math.PI]} scale={0.58}>
            <coneGeometry args={[0.27, 0.55, 4]} />
            <meshStandardMaterial color="#f4a9ad" roughness={0.7} />
          </mesh>
        </group>
      ))}
      <Eye position={[1.36, 1.73, 0.31]} />
      <Eye position={[1.36, 1.73, -0.31]} />
      <mesh position={[1.48, 1.48, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.09, 0.12, 3]} />
        <meshStandardMaterial color="#ef8f98" roughness={0.55} />
      </mesh>
      <mesh castShadow position={[1.28, 1.34, 0]} scale={[0.75, 0.38, 0.58]}>
        <sphereGeometry args={[0.35, 18, 14]} />
        <meshStandardMaterial color={pale} roughness={0.85} />
      </mesh>
      {[-0.56, -0.32, 0.32, 0.56].map((z, i) => (
        <mesh key={z} position={[1.38, 1.45 + (i % 2) * 0.09, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.66, 6]} />
          <meshStandardMaterial color="#ece8e1" roughness={0.7} />
        </mesh>
      ))}
      <PawLeg position={[-0.58, 0.06, 0.45]} color={color} pawColor={pale} length={0.7} />
      <PawLeg position={[-0.58, 0.06, -0.45]} color={color} pawColor={pale} length={0.7} />
      <PawLeg position={[0.52, 0.06, 0.45]} color={color} pawColor={pale} length={0.7} />
      <PawLeg position={[0.52, 0.06, -0.45]} color={color} pawColor={pale} length={0.7} />
      <mesh castShadow position={[-1.0, 1.48, 0]} rotation={[0, 0, 1.0]}>
        <torusGeometry args={[0.48, 0.075, 10, 24, Math.PI * 1.15]} />
        <meshStandardMaterial color={color} roughness={0.82} />
      </mesh>
    </group>
  )
}

function Lion({ color }: { color: string }) {
  const mane = '#85502f'
  const muzzle = '#f3d59a'
  return (
    <group>
      <mesh castShadow position={[-0.2, 1.18, 0]} scale={[1.38, 0.84, 0.84]}>
        <sphereGeometry args={[0.84, 28, 20]} />
        <meshStandardMaterial color={color} roughness={0.82} />
      </mesh>
      <mesh castShadow position={[0.91, 1.61, 0]} scale={[1, 1.04, 1.04]}>
        <dodecahedronGeometry args={[0.82, 2]} />
        <meshStandardMaterial color={mane} roughness={0.9} />
      </mesh>
      <mesh castShadow position={[1.13, 1.61, 0]}>
        <sphereGeometry args={[0.56, 26, 18]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh castShadow position={[1.52, 1.42, 0]} scale={[0.8, 0.48, 0.7]}>
        <sphereGeometry args={[0.38, 20, 14]} />
        <meshStandardMaterial color={muzzle} roughness={0.85} />
      </mesh>
      <mesh position={[1.79, 1.48, 0]} scale={[0.8, 0.7, 0.75]}>
        <sphereGeometry args={[0.12, 14, 10]} />
        <meshStandardMaterial color="#34251f" roughness={0.55} />
      </mesh>
      <Eye position={[1.51, 1.79, 0.29]} />
      <Eye position={[1.51, 1.79, -0.29]} />
      {[0.46, -0.46].map((z) => (
        <mesh key={z} castShadow position={[0.91, 2.08, z]}>
          <sphereGeometry args={[0.2, 16, 12]} />
          <meshStandardMaterial color={color} roughness={0.82} />
        </mesh>
      ))}
      <PawLeg position={[-0.7, 0.06, 0.5]} color={color} pawColor={muzzle} length={0.73} />
      <PawLeg position={[-0.7, 0.06, -0.5]} color={color} pawColor={muzzle} length={0.73} />
      <PawLeg position={[0.45, 0.06, 0.5]} color={color} pawColor={muzzle} length={0.73} />
      <PawLeg position={[0.45, 0.06, -0.5]} color={color} pawColor={muzzle} length={0.73} />
      <mesh castShadow position={[-1.2, 1.32, 0]} rotation={[0, 0, 0.55]}>
        <cylinderGeometry args={[0.055, 0.08, 1.0, 10]} />
        <meshStandardMaterial color={color} roughness={0.82} />
      </mesh>
      <mesh castShadow position={[-1.52, 1.68, 0]}>
        <sphereGeometry args={[0.14, 14, 10]} />
        <meshStandardMaterial color={mane} roughness={0.9} />
      </mesh>
    </group>
  )
}

function Elephant({ color }: { color: string }) {
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.55, 1.45, 0),
      new THREE.Vector3(1.82, 1.13, 0),
      new THREE.Vector3(1.88, 0.78, 0),
      new THREE.Vector3(1.7, 0.52, 0),
    ]),
    [],
  )

  return (
    <group>
      <mesh castShadow position={[-0.15, 1.35, 0]} scale={[1.45, 1.02, 1.0]}>
        <sphereGeometry args={[0.93, 28, 20]} />
        <meshStandardMaterial color={color} roughness={0.83} />
      </mesh>
      <mesh castShadow position={[1.0, 1.58, 0]}>
        <sphereGeometry args={[0.72, 28, 20]} />
        <meshStandardMaterial color={color} roughness={0.83} />
      </mesh>
      <mesh castShadow position={[0.93, 1.62, 0.56]} scale={[0.35, 0.75, 0.18]}>
        <sphereGeometry args={[0.82, 22, 16]} />
        <meshStandardMaterial color="#9ba7b7" roughness={0.88} />
      </mesh>
      <mesh castShadow position={[0.93, 1.62, -0.56]} scale={[0.35, 0.75, 0.18]}>
        <sphereGeometry args={[0.82, 22, 16]} />
        <meshStandardMaterial color="#9ba7b7" roughness={0.88} />
      </mesh>
      <mesh castShadow>
        <tubeGeometry args={[curve, 20, 0.15, 10, false]} />
        <meshStandardMaterial color={color} roughness={0.83} />
      </mesh>
      <mesh position={[1.52, 1.28, 0.34]} rotation={[0, 0, -0.28]}>
        <coneGeometry args={[0.07, 0.48, 12]} />
        <meshStandardMaterial color="#fff1c8" roughness={0.72} />
      </mesh>
      <mesh position={[1.52, 1.28, -0.34]} rotation={[0, 0, -0.28]}>
        <coneGeometry args={[0.07, 0.48, 12]} />
        <meshStandardMaterial color="#fff1c8" roughness={0.72} />
      </mesh>
      <Eye position={[1.56, 1.78, 0.32]} />
      <Eye position={[1.56, 1.78, -0.32]} />
      <PawLeg position={[-0.72, 0.06, 0.56]} color={color} pawColor="#778392" length={0.85} />
      <PawLeg position={[-0.72, 0.06, -0.56]} color={color} pawColor="#778392" length={0.85} />
      <PawLeg position={[0.45, 0.06, 0.56]} color={color} pawColor="#778392" length={0.85} />
      <PawLeg position={[0.45, 0.06, -0.56]} color={color} pawColor="#778392" length={0.85} />
      <mesh castShadow position={[-1.35, 1.35, 0]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.045, 0.07, 0.7, 10]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>
    </group>
  )
}

export function AnimalModel({ kind, color }: { kind: string; color: string }) {
  if (kind === 'dog') return <Dog color={color} />
  if (kind === 'cat') return <Cat color={color} />
  if (kind === 'lion') return <Lion color={color} />
  return <Elephant color={color} />
}
