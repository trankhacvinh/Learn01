import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { LearningSubject } from './catalog'

type SubjectModelProps = {
  subject: LearningSubject
  color: string
  scale: number
  position: [number, number, number]
  active: boolean
  onClick: () => void
}

const dark = '#263244'
const glass = '#bfe8ff'
const chrome = '#d9e2ec'
const cream = '#fff7e7'

function Wheel({ position, radius = 0.36 }: { position: [number, number, number]; radius?: number }) {
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[radius, radius, radius * 0.78, 28]} />
        <meshStandardMaterial color="#222834" roughness={0.82} />
      </mesh>
      <mesh position={[0, radius * 0.43, 0]}>
        <cylinderGeometry args={[radius * 0.48, radius * 0.48, radius * 0.82, 20]} />
        <meshStandardMaterial color="#d7dee8" metalness={0.55} roughness={0.28} />
      </mesh>
      <mesh position={[0, radius * 0.86, 0]}>
        <cylinderGeometry args={[radius * 0.16, radius * 0.16, 0.035, 16]} />
        <meshStandardMaterial color="#7f8b9b" metalness={0.5} roughness={0.32} />
      </mesh>
    </group>
  )
}

function EmergencyBar({ police = false, position = [0.65, 2.18, 0] as [number, number, number] }) {
  return (
    <group position={position}>
      <RoundedBox args={[0.72, 0.11, 0.34]} radius={0.04} smoothness={3} castShadow>
        <meshStandardMaterial color="#f7fafc" roughness={0.35} />
      </RoundedBox>
      <RoundedBox args={[0.28, 0.16, 0.28]} radius={0.04} smoothness={3} position={[-0.18, 0.11, 0]}>
        <meshStandardMaterial color={police ? '#2878ff' : '#ff4d5f'} emissive={police ? '#1648a5' : '#9f1d2c'} emissiveIntensity={0.55} />
      </RoundedBox>
      <RoundedBox args={[0.28, 0.16, 0.28]} radius={0.04} smoothness={3} position={[0.18, 0.11, 0]}>
        <meshStandardMaterial color="#ff4d5f" emissive="#9f1d2c" emissiveIntensity={0.55} />
      </RoundedBox>
    </group>
  )
}

function Vehicle({ kind, color }: { kind: string; color: string }) {
  const isBus = kind === 'bus'
  const isAmbulance = kind === 'ambulance'
  const isPolice = kind === 'police-car'
  const isFire = kind === 'fire-truck'

  if (isBus) {
    return (
      <group rotation={[0, -0.08, 0]}>
        <RoundedBox args={[4.15, 1.5, 1.72]} radius={0.24} smoothness={5} position={[0, 1.2, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={color} roughness={0.42} />
        </RoundedBox>
        <RoundedBox args={[3.64, 0.72, 1.76]} radius={0.13} smoothness={4} position={[-0.05, 1.54, 0]} castShadow>
          <meshStandardMaterial color="#f7fbff" roughness={0.38} />
        </RoundedBox>
        {[-1.35, -0.65, 0.05, 0.75].map((x) => (
          <RoundedBox key={x} args={[0.52, 0.48, 0.035]} radius={0.06} smoothness={3} position={[x, 1.56, 0.895]}>
            <meshStandardMaterial color={glass} roughness={0.18} metalness={0.08} />
          </RoundedBox>
        ))}
        <RoundedBox args={[0.48, 0.75, 0.04]} radius={0.05} smoothness={3} position={[1.61, 1.27, 0.89]}>
          <meshStandardMaterial color="#324253" roughness={0.25} />
        </RoundedBox>
        <RoundedBox args={[0.06, 0.22, 1.35]} radius={0.03} smoothness={3} position={[2.09, 0.94, 0]}>
          <meshStandardMaterial color="#ecf1f6" metalness={0.25} roughness={0.35} />
        </RoundedBox>
        <mesh position={[2.13, 1.05, 0.52]}>
          <sphereGeometry args={[0.11, 16, 12]} />
          <meshStandardMaterial color="#fff2a8" emissive="#f2c94c" emissiveIntensity={0.35} />
        </mesh>
        <mesh position={[2.13, 1.05, -0.52]}>
          <sphereGeometry args={[0.11, 16, 12]} />
          <meshStandardMaterial color="#fff2a8" emissive="#f2c94c" emissiveIntensity={0.35} />
        </mesh>
        <Wheel position={[1.38, 0.48, 0.9]} radius={0.39} />
        <Wheel position={[1.38, 0.48, -0.9]} radius={0.39} />
        <Wheel position={[-1.38, 0.48, 0.9]} radius={0.39} />
        <Wheel position={[-1.38, 0.48, -0.9]} radius={0.39} />
      </group>
    )
  }

  const mainColor = isAmbulance ? '#f8fafc' : color
  const accent = isAmbulance ? color : isPolice ? '#f8fafc' : color

  return (
    <group rotation={[0, -0.08, 0]}>
      <RoundedBox args={[3.45, 1.08, 1.72]} radius={0.22} smoothness={5} position={[-0.12, 1.02, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={mainColor} roughness={0.4} />
      </RoundedBox>
      <RoundedBox args={[1.2, 0.9, 1.66]} radius={0.2} smoothness={5} position={[1.1, 1.58, 0]} castShadow>
        <meshStandardMaterial color={mainColor} roughness={0.4} />
      </RoundedBox>
      <RoundedBox args={[0.58, 0.47, 0.038]} radius={0.07} smoothness={3} position={[1.13, 1.68, 0.855]}>
        <meshStandardMaterial color={glass} roughness={0.16} metalness={0.08} />
      </RoundedBox>
      <RoundedBox args={[0.58, 0.47, 0.038]} radius={0.07} smoothness={3} position={[1.13, 1.68, -0.855]}>
        <meshStandardMaterial color={glass} roughness={0.16} metalness={0.08} />
      </RoundedBox>
      <RoundedBox args={[0.055, 0.72, 1.45]} radius={0.025} smoothness={3} position={[1.75, 1.03, 0]}>
        <meshStandardMaterial color={chrome} metalness={0.35} roughness={0.28} />
      </RoundedBox>
      <mesh position={[1.79, 1.15, 0.53]}>
        <sphereGeometry args={[0.105, 16, 12]} />
        <meshStandardMaterial color="#fff2a8" emissive="#d9a72c" emissiveIntensity={0.38} />
      </mesh>
      <mesh position={[1.79, 1.15, -0.53]}>
        <sphereGeometry args={[0.105, 16, 12]} />
        <meshStandardMaterial color="#fff2a8" emissive="#d9a72c" emissiveIntensity={0.38} />
      </mesh>
      <RoundedBox args={[0.1, 0.18, 1.34]} radius={0.04} smoothness={3} position={[1.79, 0.7, 0]}>
        <meshStandardMaterial color="#eef2f6" metalness={0.45} roughness={0.25} />
      </RoundedBox>

      {isPolice && (
        <>
          <RoundedBox args={[2.85, 0.24, 0.045]} radius={0.03} smoothness={3} position={[-0.25, 1.04, 0.875]}>
            <meshStandardMaterial color={accent} roughness={0.35} />
          </RoundedBox>
          <RoundedBox args={[0.9, 0.42, 0.05]} radius={0.08} smoothness={3} position={[-0.48, 1.28, 0.88]}>
            <meshStandardMaterial color="#20344f" roughness={0.32} />
          </RoundedBox>
          <EmergencyBar police />
        </>
      )}

      {isAmbulance && (
        <>
          <RoundedBox args={[2.55, 0.2, 0.045]} radius={0.03} smoothness={3} position={[-0.38, 1.0, 0.875]}>
            <meshStandardMaterial color={accent} roughness={0.38} />
          </RoundedBox>
          <group position={[-0.52, 1.3, 0.895]}>
            <RoundedBox args={[0.18, 0.72, 0.05]} radius={0.02} smoothness={2}>
              <meshStandardMaterial color="#ef3f53" />
            </RoundedBox>
            <RoundedBox args={[0.72, 0.18, 0.052]} radius={0.02} smoothness={2}>
              <meshStandardMaterial color="#ef3f53" />
            </RoundedBox>
          </group>
          <EmergencyBar />
        </>
      )}

      {isFire && (
        <>
          <RoundedBox args={[1.95, 0.66, 1.5]} radius={0.13} smoothness={4} position={[-0.63, 1.17, 0]} castShadow>
            <meshStandardMaterial color={color} roughness={0.45} />
          </RoundedBox>
          <RoundedBox args={[1.64, 0.15, 1.2]} radius={0.04} smoothness={3} position={[-0.68, 1.55, 0]}>
            <meshStandardMaterial color="#eef2f6" metalness={0.45} roughness={0.3} />
          </RoundedBox>
          <group position={[-0.55, 1.93, 0]} rotation={[0, 0, -0.07]}>
            <mesh castShadow position={[0, 0, 0.31]}>
              <boxGeometry args={[2.25, 0.09, 0.09]} />
              <meshStandardMaterial color={chrome} metalness={0.55} roughness={0.28} />
            </mesh>
            <mesh castShadow position={[0, 0, -0.31]}>
              <boxGeometry args={[2.25, 0.09, 0.09]} />
              <meshStandardMaterial color={chrome} metalness={0.55} roughness={0.28} />
            </mesh>
            {[-0.88, -0.44, 0, 0.44, 0.88].map((x) => (
              <mesh key={x} position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.035, 0.035, 0.64, 10]} />
                <meshStandardMaterial color={chrome} metalness={0.55} roughness={0.28} />
              </mesh>
            ))}
          </group>
          <EmergencyBar position={[0.92, 2.18, 0]} />
        </>
      )}

      <Wheel position={[1.06, 0.45, 0.91]} />
      <Wheel position={[1.06, 0.45, -0.91]} />
      <Wheel position={[-1.08, 0.45, 0.91]} />
      <Wheel position={[-1.08, 0.45, -0.91]} />
    </group>
  )
}

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
        <group key={z} position={[0.75, 2.08, z]} rotation={[0, 0, -0.05]}>
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

function Animal({ kind, color }: { kind: string; color: string }) {
  if (kind === 'dog') return <Dog color={color} />
  if (kind === 'cat') return <Cat color={color} />
  if (kind === 'lion') return <Lion color={color} />
  return <Elephant color={color} />
}

function ObjectModel({ kind, color }: { kind: string; color: string }) {
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

function ShapeModel({ kind, color }: { kind: string; color: string }) {
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

export function SubjectModel({ subject, color, scale, position, active, onClick }: SubjectModelProps) {
  const group = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.position.set(...position)
    group.current.rotation.set(0, 0, 0)

    if (!active) return

    if (subject.category === 'vehicles') {
      group.current.position.x = position[0] + Math.sin(t * 1.5) * 0.7
      group.current.rotation.y = Math.sin(t * 0.75) * 0.035
    } else if (subject.category === 'animals') {
      group.current.position.x = position[0] + Math.sin(t * 1.25) * 0.45
      group.current.position.y = Math.abs(Math.sin(t * 2.5)) * 0.055
      group.current.rotation.z = Math.sin(t * 2.5) * 0.018
    } else if (subject.id === 'ball') {
      group.current.position.y = Math.abs(Math.sin(t * 2.7)) * 0.9
    } else {
      group.current.rotation.y = t * 0.78
    }
  })

  return (
    <group
      ref={group}
      position={position}
      scale={scale}
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
    >
      {subject.category === 'vehicles' && <Vehicle kind={subject.id} color={color} />}
      {subject.category === 'animals' && <Animal kind={subject.id} color={color} />}
      {subject.category === 'objects' && <ObjectModel kind={subject.id} color={color} />}
      {subject.category === 'shapes' && <ShapeModel kind={subject.id} color={color} />}
    </group>
  )
}
