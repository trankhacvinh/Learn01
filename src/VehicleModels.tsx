import { RoundedBox } from '@react-three/drei'

const glass = '#bfe8ff'
const darkGlass = '#29445f'
const chrome = '#d9e2ec'
const tire = '#202733'
const rim = '#d6dee8'
const white = '#f8fafc'
const warmLight = '#fff0a8'

function Wheel({ position, radius = 0.36 }: { position: [number, number, number]; radius?: number }) {
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[radius, radius, radius * 0.72, 28]} />
        <meshStandardMaterial color={tire} roughness={0.84} />
      </mesh>
      <mesh position={[0, radius * 0.39, 0]}>
        <cylinderGeometry args={[radius * 0.5, radius * 0.5, radius * 0.77, 20]} />
        <meshStandardMaterial color={rim} metalness={0.42} roughness={0.32} />
      </mesh>
      <mesh position={[0, radius * 0.79, 0]}>
        <cylinderGeometry args={[radius * 0.15, radius * 0.15, 0.035, 16]} />
        <meshStandardMaterial color="#7f8b9b" metalness={0.35} roughness={0.38} />
      </mesh>
    </group>
  )
}

function HeadLights({ x, y, spread = 0.52 }: { x: number; y: number; spread?: number }) {
  return (
    <>
      {[spread, -spread].map((z) => (
        <mesh key={z} position={[x, y, z]}>
          <sphereGeometry args={[0.105, 16, 12]} />
          <meshStandardMaterial color={warmLight} emissive="#d9a72c" emissiveIntensity={0.42} />
        </mesh>
      ))}
    </>
  )
}

function LightBar({ position, police = false, width = 0.78 }: { position: [number, number, number]; police?: boolean; width?: number }) {
  return (
    <group position={position}>
      <RoundedBox args={[width, 0.1, 0.34]} radius={0.035} smoothness={3} castShadow>
        <meshStandardMaterial color={white} roughness={0.34} />
      </RoundedBox>
      <RoundedBox args={[width * 0.38, 0.15, 0.28]} radius={0.035} smoothness={3} position={[-width * 0.21, 0.11, 0]}>
        <meshStandardMaterial color={police ? '#2878ff' : '#ff4d5f'} emissive={police ? '#1648a5' : '#9f1d2c'} emissiveIntensity={0.58} />
      </RoundedBox>
      <RoundedBox args={[width * 0.38, 0.15, 0.28]} radius={0.035} smoothness={3} position={[width * 0.21, 0.11, 0]}>
        <meshStandardMaterial color="#ff4d5f" emissive="#9f1d2c" emissiveIntensity={0.58} />
      </RoundedBox>
    </group>
  )
}

function FireTruck({ color }: { color: string }) {
  return (
    <group rotation={[0, -0.08, 0]}>
      {/* tall cab */}
      <RoundedBox args={[1.45, 1.48, 1.78]} radius={0.18} smoothness={5} position={[1.38, 1.22, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.4} />
      </RoundedBox>
      <RoundedBox args={[0.62, 0.68, 0.055]} radius={0.07} smoothness={3} position={[1.63, 1.62, 0.91]}>
        <meshStandardMaterial color={glass} roughness={0.16} />
      </RoundedBox>
      <RoundedBox args={[0.62, 0.68, 0.055]} radius={0.07} smoothness={3} position={[1.63, 1.62, -0.91]}>
        <meshStandardMaterial color={glass} roughness={0.16} />
      </RoundedBox>
      <RoundedBox args={[0.06, 0.65, 1.45]} radius={0.025} smoothness={3} position={[2.12, 1.16, 0]}>
        <meshStandardMaterial color="#eef2f6" metalness={0.28} roughness={0.34} />
      </RoundedBox>
      <HeadLights x={2.17} y={1.23} spread={0.55} />
      <RoundedBox args={[0.12, 0.16, 1.42]} radius={0.04} smoothness={3} position={[2.17, 0.72, 0]}>
        <meshStandardMaterial color={chrome} metalness={0.45} roughness={0.26} />
      </RoundedBox>

      {/* long equipment body */}
      <RoundedBox args={[2.8, 1.28, 1.76]} radius={0.16} smoothness={5} position={[-0.55, 1.12, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.43} />
      </RoundedBox>
      {[-1.45, -0.55, 0.35].map((x) => (
        <RoundedBox key={x} args={[0.68, 0.72, 0.055]} radius={0.045} smoothness={3} position={[x, 1.24, 0.9]}>
          <meshStandardMaterial color="#e9eef2" metalness={0.2} roughness={0.42} />
        </RoundedBox>
      ))}
      {[-1.45, -0.55, 0.35].map((x) => (
        <RoundedBox key={x} args={[0.52, 0.025, 0.058]} radius={0.01} smoothness={2} position={[x, 1.24, 0.935]}>
          <meshStandardMaterial color="#aab5c1" metalness={0.36} roughness={0.3} />
        </RoundedBox>
      ))}
      <mesh position={[-1.48, 1.15, -0.91]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.28, 0.08, 12, 26]} />
        <meshStandardMaterial color="#f2c94c" roughness={0.52} />
      </mesh>

      {/* unmistakable ladder */}
      <group position={[-0.55, 2.15, 0]} rotation={[0, 0, -0.08]}>
        <mesh castShadow position={[0, 0, 0.34]}>
          <boxGeometry args={[3.25, 0.09, 0.09]} />
          <meshStandardMaterial color={chrome} metalness={0.5} roughness={0.28} />
        </mesh>
        <mesh castShadow position={[0, 0, -0.34]}>
          <boxGeometry args={[3.25, 0.09, 0.09]} />
          <meshStandardMaterial color={chrome} metalness={0.5} roughness={0.28} />
        </mesh>
        {[-1.25, -0.82, -0.39, 0.04, 0.47, 0.9, 1.33].map((x) => (
          <mesh key={x} position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.032, 0.032, 0.7, 10]} />
            <meshStandardMaterial color={chrome} metalness={0.5} roughness={0.28} />
          </mesh>
        ))}
      </group>
      <LightBar position={[1.48, 2.16, 0]} width={0.72} />

      <Wheel position={[1.38, 0.43, 0.94]} radius={0.38} />
      <Wheel position={[1.38, 0.43, -0.94]} radius={0.38} />
      <Wheel position={[-1.15, 0.43, 0.94]} radius={0.4} />
      <Wheel position={[-1.15, 0.43, -0.94]} radius={0.4} />
    </group>
  )
}

function Ambulance({ color }: { color: string }) {
  return (
    <group rotation={[0, -0.08, 0]}>
      {/* short bonnet + separate cab */}
      <RoundedBox args={[1.0, 0.62, 1.68]} radius={0.16} smoothness={5} position={[1.63, 0.93, 0]} castShadow>
        <meshStandardMaterial color={color} roughness={0.4} />
      </RoundedBox>
      <RoundedBox args={[1.2, 1.15, 1.7]} radius={0.18} smoothness={5} position={[0.92, 1.35, 0]} castShadow>
        <meshStandardMaterial color={color} roughness={0.4} />
      </RoundedBox>
      <RoundedBox args={[0.55, 0.58, 0.055]} radius={0.06} smoothness={3} position={[1.14, 1.58, 0.875]}>
        <meshStandardMaterial color={glass} roughness={0.16} />
      </RoundedBox>
      <RoundedBox args={[0.55, 0.58, 0.055]} radius={0.06} smoothness={3} position={[1.14, 1.58, -0.875]}>
        <meshStandardMaterial color={glass} roughness={0.16} />
      </RoundedBox>
      <HeadLights x={2.15} y={1.0} spread={0.52} />
      <RoundedBox args={[0.1, 0.14, 1.36]} radius={0.04} smoothness={3} position={[2.15, 0.64, 0]}>
        <meshStandardMaterial color={chrome} metalness={0.4} roughness={0.3} />
      </RoundedBox>

      {/* high medical box */}
      <RoundedBox args={[2.35, 1.72, 1.8]} radius={0.16} smoothness={5} position={[-0.72, 1.45, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={white} roughness={0.4} />
      </RoundedBox>
      <RoundedBox args={[2.25, 0.18, 0.055]} radius={0.025} smoothness={3} position={[-0.7, 1.12, 0.93]}>
        <meshStandardMaterial color={color} roughness={0.36} />
      </RoundedBox>
      <RoundedBox args={[0.56, 0.5, 0.055]} radius={0.055} smoothness={3} position={[-1.32, 1.66, 0.93]}>
        <meshStandardMaterial color={darkGlass} roughness={0.24} />
      </RoundedBox>
      <group position={[-0.38, 1.55, 0.95]}>
        <RoundedBox args={[0.18, 0.7, 0.055]} radius={0.02} smoothness={2}>
          <meshStandardMaterial color="#ef3f53" />
        </RoundedBox>
        <RoundedBox args={[0.7, 0.18, 0.058]} radius={0.02} smoothness={2}>
          <meshStandardMaterial color="#ef3f53" />
        </RoundedBox>
      </group>
      <RoundedBox args={[0.72, 1.2, 0.055]} radius={0.05} smoothness={3} position={[-1.73, 1.45, -0.92]}>
        <meshStandardMaterial color="#e4e9ee" roughness={0.42} />
      </RoundedBox>
      <LightBar position={[-0.1, 2.38, 0]} width={0.9} />

      <Wheel position={[1.15, 0.43, 0.93]} radius={0.37} />
      <Wheel position={[1.15, 0.43, -0.93]} radius={0.37} />
      <Wheel position={[-1.25, 0.43, 0.93]} radius={0.37} />
      <Wheel position={[-1.25, 0.43, -0.93]} radius={0.37} />
    </group>
  )
}

function PoliceCar({ color }: { color: string }) {
  return (
    <group rotation={[0, -0.08, 0]}>
      {/* low sedan body, visibly unlike a van */}
      <RoundedBox args={[4.0, 0.62, 1.72]} radius={0.2} smoothness={5} position={[0, 0.79, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.38} />
      </RoundedBox>
      <RoundedBox args={[1.72, 0.82, 1.58]} radius={0.2} smoothness={5} position={[0.15, 1.35, 0]} castShadow>
        <meshStandardMaterial color={color} roughness={0.38} />
      </RoundedBox>
      <RoundedBox args={[0.74, 0.48, 0.055]} radius={0.07} smoothness={3} position={[0.52, 1.47, 0.82]}>
        <meshStandardMaterial color={darkGlass} roughness={0.18} />
      </RoundedBox>
      <RoundedBox args={[0.62, 0.48, 0.055]} radius={0.07} smoothness={3} position={[-0.38, 1.47, 0.82]}>
        <meshStandardMaterial color={darkGlass} roughness={0.18} />
      </RoundedBox>
      <RoundedBox args={[3.15, 0.18, 0.055]} radius={0.03} smoothness={3} position={[-0.05, 0.84, 0.89]}>
        <meshStandardMaterial color={white} roughness={0.34} />
      </RoundedBox>
      <RoundedBox args={[0.76, 0.36, 0.06]} radius={0.07} smoothness={3} position={[-0.52, 1.04, 0.9]}>
        <meshStandardMaterial color="#1b2f49" roughness={0.3} />
      </RoundedBox>
      <RoundedBox args={[0.08, 0.44, 1.36]} radius={0.03} smoothness={3} position={[2.03, 0.82, 0]}>
        <meshStandardMaterial color={chrome} metalness={0.38} roughness={0.28} />
      </RoundedBox>
      <HeadLights x={2.08} y={0.89} spread={0.52} />
      <LightBar position={[0.1, 1.86, 0]} police width={0.92} />
      <Wheel position={[1.28, 0.39, 0.9]} radius={0.35} />
      <Wheel position={[1.28, 0.39, -0.9]} radius={0.35} />
      <Wheel position={[-1.28, 0.39, 0.9]} radius={0.35} />
      <Wheel position={[-1.28, 0.39, -0.9]} radius={0.35} />
    </group>
  )
}

function Bus({ color }: { color: string }) {
  return (
    <group rotation={[0, -0.08, 0]}>
      <RoundedBox args={[4.7, 1.78, 1.86]} radius={0.22} smoothness={5} position={[0, 1.3, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.42} />
      </RoundedBox>
      <RoundedBox args={[0.1, 1.18, 1.55]} radius={0.04} smoothness={3} position={[2.36, 1.5, 0]}>
        <meshStandardMaterial color={darkGlass} roughness={0.2} />
      </RoundedBox>
      <RoundedBox args={[1.08, 0.22, 1.48]} radius={0.05} smoothness={3} position={[2.39, 2.06, 0]}>
        <meshStandardMaterial color="#2f445b" roughness={0.28} />
      </RoundedBox>
      {[-1.6, -0.82, -0.04, 0.74, 1.45].map((x) => (
        <RoundedBox key={x} args={[0.58, 0.62, 0.055]} radius={0.065} smoothness={3} position={[x, 1.58, 0.95]}>
          <meshStandardMaterial color={glass} roughness={0.17} />
        </RoundedBox>
      ))}
      <RoundedBox args={[0.58, 1.02, 0.06]} radius={0.05} smoothness={3} position={[1.58, 1.18, 0.95]}>
        <meshStandardMaterial color={darkGlass} roughness={0.23} />
      </RoundedBox>
      <RoundedBox args={[0.07, 0.2, 1.42]} radius={0.03} smoothness={3} position={[2.39, 0.72, 0]}>
        <meshStandardMaterial color={chrome} metalness={0.32} roughness={0.32} />
      </RoundedBox>
      <HeadLights x={2.43} y={0.98} spread={0.58} />
      <Wheel position={[1.48, 0.43, 0.98]} radius={0.4} />
      <Wheel position={[1.48, 0.43, -0.98]} radius={0.4} />
      <Wheel position={[-1.5, 0.43, 0.98]} radius={0.4} />
      <Wheel position={[-1.5, 0.43, -0.98]} radius={0.4} />
    </group>
  )
}

export function VehicleModel({ kind, color }: { kind: string; color: string }) {
  if (kind === 'fire-truck') return <FireTruck color={color} />
  if (kind === 'ambulance') return <Ambulance color={color} />
  if (kind === 'police-car') return <PoliceCar color={color} />
  return <Bus color={color} />
}
