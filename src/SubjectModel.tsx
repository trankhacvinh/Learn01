import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import type { LearningSubject } from './catalog'
import { VehicleModel } from './VehicleModels'
import { AnimalModel } from './AnimalModels'
import { ObjectModel } from './ObjectModels'
import { ShapeModel } from './ShapeModels'

type SubjectModelProps = {
  subject: LearningSubject
  color: string
  scale: number
  position: [number, number, number]
  active: boolean
  onClick: () => void
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
      {subject.category === 'vehicles' && <VehicleModel kind={subject.id} color={color} />}
      {subject.category === 'animals' && <AnimalModel kind={subject.id} color={color} />}
      {subject.category === 'objects' && <ObjectModel kind={subject.id} color={color} />}
      {subject.category === 'shapes' && <ShapeModel kind={subject.id} color={color} />}
    </group>
  )
}
