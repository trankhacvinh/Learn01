import { RoundedBox } from '@react-three/drei'

const dark = '#263244'
const cream = '#fff7e7'

export function ObjectModel({ kind, color }: { kind: string; color: string }) {
  if (kind === 'ball') {
    return (
      <group position={[0, 1.12, 0]} rotation={[0.1, 0.2, -0.08]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.08, 36, 28]} />
          <meshStandardMaterial color={color} roughness={0.34} />
        </mesh>
        <mesh scale={1.012} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.74, 0.045, 10, 48]} />
          <meshStandardMaterial color={cream} roughness={0.45} />
        </mesh>
        <mesh scale={1.012} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.74, 0.045, 10, 48]} />
          <meshStandardMaterial color={cream} roughness={0.45} />
        </mesh>
      </group>
    )
  }

  if (kind === 'book') {
    return (
      <group position={[0, 1.0, 0]} rotation={[0.12, -0.22, 0.06]}>
        <RoundedBox args={[2.35, 0.38, 1.62]} radius={0.09} smoothness={4} castShadow>
          <meshStandardMaterial color={color} roughness={0.56} />
        </RoundedBox>
        <RoundedBox args={[2.04, 0.25, 1.48]} radius={0.05} smoothness={3} position={[0.05, 0.01, 0]}>
          <meshStandardMaterial color="#fff9e9" roughness={0.9} />
        </RoundedBox>
        <RoundedBox args={[0.08, 0.42, 1.62]} radius={0.03} smoothness={3} position={[-1.13, 0, 0]}>
          <meshStandardMaterial color={dark} roughness={0.55} />
        </RoundedBox>
      </group>
    )
  }

  if (kind === 'cup') {
    return (
      <group position={[0, 1.0, 0]} rotation={[0, -0.18, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.78, 0.64, 1.62, 36, 1, false]} />
          <meshStandardMaterial color={color} roughness={0.38} />
        </mesh>
        <mesh position={[0, 0.82, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.72, 0.055, 12, 40]} />
          <meshStandardMaterial color="#f7fbff" roughness={0.35} />
        </mesh>
        <mesh position={[0.82, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.43, 0.12, 14, 30]} />
          <meshStandardMaterial color={color} roughness={0.38} />
        </mesh>
        <mesh position={[0, 0.79, 0]}>
          <cylinderGeometry args={[0.66, 0.66, 0.04, 32]} />
          <meshStandardMaterial color="#6b3e24" roughness={0.65} />
        </mesh>
      </group>
    )
  }

  return (
    <group rotation={[0, -0.18, 0]}>
      <RoundedBox args={[1.75, 0.28, 1.72]} radius={0.1} smoothness={4} position={[0, 1.23, 0]} castShadow>
        <meshStandardMaterial color={color} roughness={0.58} />
      </RoundedBox>
      <RoundedBox args={[1.75, 1.5, 0.3]} radius={0.1} smoothness={4} position={[0, 2.02, -0.71]} castShadow>
        <meshStandardMaterial color={color} roughness={0.58} />
      </RoundedBox>
      {[[-0.65, 0.52, -0.63], [0.65, 0.52, -0.63], [-0.65, 0.52, 0.63], [0.65, 0.52, 0.63]].map((p, i) => (
        <RoundedBox key={i} args={[0.23, 1.08, 0.23]} radius={0.07} smoothness={3} position={p as [number, number, number]} castShadow>
          <meshStandardMaterial color={color} roughness={0.58} />
        </RoundedBox>
      ))}
    </group>
  )
}
