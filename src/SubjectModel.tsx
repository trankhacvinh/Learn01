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

function Wheel({ position, radius = 0.34 }: { position: [number, number, number]; radius?: number }) {
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[radius, radius, radius * 0.95, 24]} />
        <meshStandardMaterial color="#20242d" roughness={0.86} />
      </mesh>
      <mesh position={[0, radius * 0.56, 0]}>
        <cylinderGeometry args={[radius * 0.46, radius * 0.46, radius, 18]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.5} roughness={0.35} />
      </mesh>
    </group>
  )
}

function Vehicle({ kind, color }: { kind: string; color: string }) {
  const isBus = kind === 'bus'
  const isAmbulance = kind === 'ambulance'
  const isPolice = kind === 'police-car'
  const isFire = kind === 'fire-truck'
  const bodyLength = isBus ? 3.8 : 3.2
  const bodyHeight = isBus ? 1.35 : 1.08

  return (
    <group>
      <mesh castShadow position={[0, 0.95, 0]}>
        <boxGeometry args={[bodyLength, bodyHeight, 1.6]} />
        <meshStandardMaterial color={color} roughness={0.46} />
      </mesh>
      {!isBus && (
        <mesh castShadow position={[1.1, 1.6, 0]}>
          <boxGeometry args={[1.0, 0.75, 1.6]} />
          <meshStandardMaterial color={color} roughness={0.46} />
        </mesh>
      )}

      {(isBus ? [-1.1, -0.35, 0.4, 1.15] : [0.9, 1.28]).map((x) => (
        <mesh key={x} position={[x, isBus ? 1.2 : 1.68, 0.81]}>
          <boxGeometry args={[isBus ? 0.5 : 0.42, 0.42, 0.04]} />
          <meshStandardMaterial color="#9bd7ff" roughness={0.16} metalness={0.08} />
        </mesh>
      ))}

      {isFire && (
        <>
          <mesh castShadow position={[-0.45, 1.65, 0]} rotation={[0, 0, -0.06]}>
            <boxGeometry args={[2.4, 0.12, 0.14]} />
            <meshStandardMaterial color="#d1d5db" metalness={0.55} roughness={0.28} />
          </mesh>
          {[-1.3, -0.85, -0.4, 0.05, 0.5].map((x) => (
            <mesh key={x} position={[x, 1.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.55, 10]} />
              <meshStandardMaterial color="#d1d5db" metalness={0.55} roughness={0.28} />
            </mesh>
          ))}
        </>
      )}

      {isAmbulance && (
        <>
          <mesh position={[-0.45, 1.06, 0.82]}>
            <boxGeometry args={[0.18, 0.62, 0.04]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
          <mesh position={[-0.45, 1.06, 0.83]}>
            <boxGeometry args={[0.62, 0.18, 0.045]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
        </>
      )}

      {(isFire || isAmbulance || isPolice) && (
        <group position={[0.7, isBus ? 1.75 : 2.05, 0]}>
          <mesh>
            <boxGeometry args={[0.62, 0.12, 0.32]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
          <mesh position={[-0.17, 0.1, 0]}>
            <boxGeometry args={[0.24, 0.12, 0.28]} />
            <meshStandardMaterial color={isPolice ? '#2563eb' : '#ef4444'} emissive={isPolice ? '#1d4ed8' : '#991b1b'} emissiveIntensity={0.4} />
          </mesh>
          <mesh position={[0.17, 0.1, 0]}>
            <boxGeometry args={[0.24, 0.12, 0.28]} />
            <meshStandardMaterial color="#ef4444" emissive="#991b1b" emissiveIntensity={0.4} />
          </mesh>
        </group>
      )}

      <Wheel position={[isBus ? 1.35 : 1.05, 0.43, 0.92]} radius={isBus ? 0.36 : 0.34} />
      <Wheel position={[isBus ? 1.35 : 1.05, 0.43, -0.92]} radius={isBus ? 0.36 : 0.34} />
      <Wheel position={[isBus ? -1.35 : -1.05, 0.43, 0.92]} radius={isBus ? 0.36 : 0.34} />
      <Wheel position={[isBus ? -1.35 : -1.05, 0.43, -0.92]} radius={isBus ? 0.36 : 0.34} />
    </group>
  )
}

function AnimalLeg({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <mesh castShadow position={position}>
      <cylinderGeometry args={[0.12, 0.14, 0.8, 12]} />
      <meshStandardMaterial color={color} roughness={0.9} />
    </mesh>
  )
}

function Animal({ kind, color }: { kind: string; color: string }) {
  const isElephant = kind === 'elephant'
  const isLion = kind === 'lion'
  const isCat = kind === 'cat'
  const headX = isElephant ? 1.08 : 0.9

  return (
    <group>
      <mesh castShadow position={[0, 1.2, 0]} scale={isElephant ? [1.45, 1.05, 1.05] : [1.2, 0.82, 0.82]}>
        <sphereGeometry args={[0.9, 24, 18]} />
        <meshStandardMaterial color={color} roughness={0.92} />
      </mesh>
      <mesh castShadow position={[headX, isElephant ? 1.45 : 1.55, 0]}>
        <sphereGeometry args={[isElephant ? 0.68 : 0.58, 24, 18]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>

      {isLion && (
        <mesh position={[headX - 0.02, 1.55, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.58, 0.2, 12, 28]} />
          <meshStandardMaterial color="#8b5a2b" roughness={1} />
        </mesh>
      )}

      {(isCat ? [-0.22, 0.22] : [-0.24, 0.24]).map((z) => (
        <mesh key={z} position={[headX + 0.03, 2.08, z]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.18, 0.36, 4]} />
          <meshStandardMaterial color={color} roughness={0.9} />
        </mesh>
      ))}

      {isElephant && (
        <>
          <mesh position={[1.55, 1.1, 0]} rotation={[0, 0, -0.25]}>
            <cylinderGeometry args={[0.14, 0.2, 1.0, 14]} />
            <meshStandardMaterial color={color} roughness={0.9} />
          </mesh>
          <mesh position={[1.05, 1.52, 0.61]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.4, 20]} />
            <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.9} />
          </mesh>
          <mesh position={[1.05, 1.52, -0.61]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.4, 20]} />
            <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.9} />
          </mesh>
        </>
      )}

      <AnimalLeg position={[-0.6, 0.48, 0.5]} color={color} />
      <AnimalLeg position={[-0.6, 0.48, -0.5]} color={color} />
      <AnimalLeg position={[0.6, 0.48, 0.5]} color={color} />
      <AnimalLeg position={[0.6, 0.48, -0.5]} color={color} />

      {!isElephant && (
        <mesh position={[-1.0, 1.35, 0]} rotation={[0, 0, isCat ? 0.9 : 0.5]}>
          <cylinderGeometry args={[0.06, 0.09, 0.9, 10]} />
          <meshStandardMaterial color={color} roughness={0.9} />
        </mesh>
      )}

      <mesh position={[headX + 0.48, 1.68, 0.22]}>
        <sphereGeometry args={[0.055, 10, 8]} />
        <meshBasicMaterial color="#111827" />
      </mesh>
      <mesh position={[headX + 0.48, 1.68, -0.22]}>
        <sphereGeometry args={[0.055, 10, 8]} />
        <meshBasicMaterial color="#111827" />
      </mesh>
    </group>
  )
}

function ObjectModel({ kind, color }: { kind: string; color: string }) {
  if (kind === 'ball') {
    return (
      <mesh castShadow position={[0, 1.05, 0]}>
        <sphereGeometry args={[1.05, 30, 24]} />
        <meshStandardMaterial color={color} roughness={0.55} />
      </mesh>
    )
  }

  if (kind === 'book') {
    return (
      <group position={[0, 1.0, 0]} rotation={[0.15, -0.2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.2, 0.35, 1.55]} />
          <meshStandardMaterial color={color} roughness={0.75} />
        </mesh>
        <mesh position={[0, 0.19, 0]}>
          <boxGeometry args={[1.95, 0.06, 1.35]} />
          <meshStandardMaterial color="#fff7dd" roughness={0.95} />
        </mesh>
      </group>
    )
  }

  if (kind === 'cup') {
    return (
      <group position={[0, 0.9, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.78, 0.62, 1.65, 28]} />
          <meshStandardMaterial color={color} roughness={0.55} />
        </mesh>
        <mesh position={[0.78, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.43, 0.11, 12, 24]} />
          <meshStandardMaterial color={color} roughness={0.55} />
        </mesh>
      </group>
    )
  }

  return (
    <group>
      <mesh castShadow position={[0, 1.25, 0]}>
        <boxGeometry args={[1.7, 0.28, 1.7]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0, 2.05, -0.7]}>
        <boxGeometry args={[1.7, 1.45, 0.28]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {[[-0.65, 0.52, -0.65], [0.65, 0.52, -0.65], [-0.65, 0.52, 0.65], [0.65, 0.52, 0.65]].map((p, i) => (
        <mesh key={i} castShadow position={p as [number, number, number]}>
          <boxGeometry args={[0.22, 1.05, 0.22]} />
          <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}

function starShape() {
  const shape = new THREE.Shape()
  const outer = 1.2
  const inner = 0.52
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

  if (kind === 'circle') {
    return (
      <mesh castShadow position={[0, 1.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.38, 40]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
    )
  }
  if (kind === 'square') {
    return (
      <mesh castShadow position={[0, 1.15, 0]}>
        <boxGeometry args={[2.1, 2.1, 0.42]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
    )
  }
  if (kind === 'triangle') {
    return (
      <mesh castShadow position={[0, 1.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.25, 1.25, 0.42, 3]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
    )
  }
  return (
    <mesh castShadow position={[0, 1.15, -0.18]}>
      <extrudeGeometry args={[star, { depth: 0.38, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06 }]} />
      <meshStandardMaterial color={color} roughness={0.5} />
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
      group.current.position.x = position[0] + Math.sin(t * 1.65) * 0.9
      group.current.rotation.y = Math.sin(t * 0.82) * 0.05
    } else if (subject.category === 'animals') {
      group.current.position.x = position[0] + Math.sin(t * 1.3) * 0.55
      group.current.position.y = Math.abs(Math.sin(t * 3.1)) * 0.08
    } else if (subject.id === 'ball') {
      group.current.position.y = Math.abs(Math.sin(t * 2.8)) * 1.05
    } else {
      group.current.rotation.y = t * 1.1
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
