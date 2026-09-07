import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

type TimeOfDay = 'day' | 'night'
type EnvironmentName = 'city' | 'park'
type SizeName = 'small' | 'big'
type SpeechOption = 'color' | 'size' | 'quantity' | 'action' | 'environment' | 'time'
type SpeechOptions = Record<SpeechOption, boolean>

type FireTruckProps = {
  color: string
  scale: number
  position: [number, number, number]
  moving: boolean
  onClick: () => void
}

const colors = [
  { name: 'Red', value: '#ef4444' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Yellow', value: '#facc15' },
  { name: 'Purple', value: '#a855f7' },
] as const

const numberWords = ['Zero', 'One', 'Two', 'Three']

const speechChoices: Array<{ key: SpeechOption; label: string; icon: string }> = [
  { key: 'color', label: 'Color', icon: '🎨' },
  { key: 'size', label: 'Size', icon: '📏' },
  { key: 'quantity', label: 'Quantity', icon: '🔢' },
  { key: 'action', label: 'Action', icon: '🏃' },
  { key: 'environment', label: 'Place', icon: '🌍' },
  { key: 'time', label: 'Time', icon: '☀️' },
]

function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.34, 24]} />
        <meshStandardMaterial color="#20242d" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.19, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.36, 20]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.65} roughness={0.3} />
      </mesh>
    </group>
  )
}

function FireTruck({ color, scale, position, moving, onClick }: FireTruckProps) {
  const group = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.position.x = position[0] + (moving ? Math.sin(t * 1.7) * 0.9 : 0)
    group.current.rotation.y = moving ? Math.sin(t * 0.85) * 0.05 : 0
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
      <mesh castShadow position={[0, 0.95, 0]}>
        <boxGeometry args={[3.2, 1.1, 1.65]} />
        <meshStandardMaterial color={color} roughness={0.48} />
      </mesh>

      <mesh castShadow position={[1.15, 1.65, 0]}>
        <boxGeometry args={[1.05, 0.85, 1.65]} />
        <meshStandardMaterial color={color} roughness={0.48} />
      </mesh>

      <mesh castShadow position={[1.7, 1.27, 0]}>
        <boxGeometry args={[0.16, 0.7, 1.44]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.45} />
      </mesh>

      <mesh position={[1.18, 1.72, 0.83]}>
        <boxGeometry args={[0.68, 0.42, 0.04]} />
        <meshStandardMaterial color="#9bd7ff" roughness={0.18} metalness={0.12} />
      </mesh>
      <mesh position={[1.18, 1.72, -0.83]}>
        <boxGeometry args={[0.68, 0.42, 0.04]} />
        <meshStandardMaterial color="#9bd7ff" roughness={0.18} metalness={0.12} />
      </mesh>

      <mesh castShadow position={[-0.5, 1.59, 0]} rotation={[0, 0, -0.05]}>
        <boxGeometry args={[2.3, 0.12, 0.13]} />
        <meshStandardMaterial color="#d1d5db" metalness={0.55} roughness={0.28} />
      </mesh>
      {[-1.35, -0.9, -0.45, 0, 0.45].map((x) => (
        <mesh key={x} castShadow position={[x, 1.59, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.56, 10]} />
          <meshStandardMaterial color="#d1d5db" metalness={0.55} roughness={0.28} />
        </mesh>
      ))}

      <mesh position={[1.28, 2.17, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.35]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      <mesh position={[1.28, 2.29, 0]}>
        <sphereGeometry args={[0.16, 16, 12]} />
        <meshStandardMaterial color="#fb2c36" emissive="#7f1d1d" emissiveIntensity={0.5} />
      </mesh>

      <mesh position={[1.78, 1.28, 0.48]}>
        <boxGeometry args={[0.05, 0.22, 0.28]} />
        <meshStandardMaterial color="#fde047" emissive="#facc15" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[1.78, 1.28, -0.48]}>
        <boxGeometry args={[0.05, 0.22, 0.28]} />
        <meshStandardMaterial color="#fde047" emissive="#facc15" emissiveIntensity={0.35} />
      </mesh>

      <Wheel position={[1.05, 0.45, 0.94]} />
      <Wheel position={[1.05, 0.45, -0.94]} />
      <Wheel position={[-1.05, 0.45, 0.94]} />
      <Wheel position={[-1.05, 0.45, -0.94]} />
    </group>
  )
}

function City() {
  const buildings = useMemo(
    () => [
      [-5, 1.5, -5, 1.7, 3, 1.8],
      [-2.7, 2.2, -5.3, 1.8, 4.4, 1.7],
      [0, 1.35, -5.8, 2.1, 2.7, 1.7],
      [3.1, 2.7, -5.4, 1.9, 5.4, 1.8],
      [5.3, 1.65, -5.1, 1.5, 3.3, 1.7],
    ],
    [],
  )

  return (
    <group>
      {buildings.map(([x, y, z, sx, sy, sz], index) => (
        <mesh key={index} position={[x, y, z]} receiveShadow castShadow>
          <boxGeometry args={[sx, sy, sz]} />
          <meshStandardMaterial color={index % 2 === 0 ? '#94a3b8' : '#64748b'} roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[0, 0.015, 0]} receiveShadow>
        <boxGeometry args={[18, 0.03, 5.2]} />
        <meshStandardMaterial color="#475569" roughness={1} />
      </mesh>
      {[-4, 0, 4].map((x) => (
        <mesh key={x} position={[x, 0.04, 0]}>
          <boxGeometry args={[2, 0.025, 0.09]} />
          <meshBasicMaterial color="#f8fafc" />
        </mesh>
      ))}
    </group>
  )
}

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 1.6, 10]} />
        <meshStandardMaterial color="#8b5a2b" roughness={1} />
      </mesh>
      <mesh castShadow position={[0, 2, 0]}>
        <sphereGeometry args={[0.9, 18, 14]} />
        <meshStandardMaterial color="#34a853" roughness={0.95} />
      </mesh>
    </group>
  )
}

function Park() {
  return (
    <group>
      <mesh position={[0, -0.02, 0]} receiveShadow>
        <boxGeometry args={[18, 0.05, 12]} />
        <meshStandardMaterial color="#86c86a" roughness={1} />
      </mesh>
      <mesh position={[0, 0.015, 0]} receiveShadow>
        <boxGeometry args={[18, 0.03, 3.8]} />
        <meshStandardMaterial color="#c8b48a" roughness={1} />
      </mesh>
      <Tree position={[-5, 0, -3.5]} />
      <Tree position={[-2.6, 0, -4.2]} />
      <Tree position={[3.2, 0, -4]} />
      <Tree position={[5.3, 0, -3.2]} />
    </group>
  )
}

function LearningScene({
  color,
  size,
  quantity,
  moving,
  environment,
  time,
  onTruckClick,
}: {
  color: string
  size: SizeName
  quantity: number
  moving: boolean
  environment: EnvironmentName
  time: TimeOfDay
  onTruckClick: () => void
}) {
  const spacing = size === 'big' ? 4.5 : 3.5
  const positions = Array.from({ length: quantity }, (_, index) => {
    const center = (quantity - 1) / 2
    return [(index - center) * spacing, 0, 0] as [number, number, number]
  })
  const isNight = time === 'night'

  return (
    <>
      <color attach="background" args={[isNight ? '#0f172a' : '#bfe7ff']} />
      {isNight && <Stars radius={45} depth={25} count={900} factor={2.2} fade speed={0.35} />}
      <ambientLight intensity={isNight ? 0.55 : 1.25} />
      <directionalLight
        castShadow
        position={[5, 9, 5]}
        intensity={isNight ? 1.2 : 2.3}
        color={isNight ? '#b9c9ff' : '#fff4d6'}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {isNight && <pointLight position={[0, 5, 2]} intensity={28} distance={18} color="#ffd98a" />}
      {environment === 'city' ? <City /> : <Park />}

      {positions.map((position, index) => (
        <FireTruck
          key={index}
          color={color}
          scale={size === 'big' ? 1.12 : 0.78}
          position={position}
          moving={moving}
          onClick={onTruckClick}
        />
      ))}

      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={7}
        maxDistance={14}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.05}
        target={[0, 1, 0]}
      />
    </>
  )
}

function buildPhrase({
  selectedColor,
  size,
  quantity,
  moving,
  environment,
  time,
  speechOptions,
}: {
  selectedColor: (typeof colors)[number]
  size: SizeName
  quantity: number
  moving: boolean
  environment: EnvironmentName
  time: TimeOfDay
  speechOptions: SpeechOptions
}) {
  const plural = speechOptions.quantity && quantity > 1
  const words: string[] = []

  if (speechOptions.quantity) words.push(numberWords[quantity].toLowerCase())
  if (speechOptions.size) words.push(size)
  if (speechOptions.color) words.push(selectedColor.name.toLowerCase())
  words.push(plural ? 'fire trucks' : 'fire truck')

  let phrase = words.join(' ')

  if (speechOptions.action) {
    const actionWord = moving ? 'moving' : 'parked'
    if (speechOptions.quantity) {
      phrase += ` ${quantity === 1 ? 'is' : 'are'} ${actionWord}`
    } else {
      phrase = `the ${phrase} is ${actionWord}`
    }
  }

  if (speechOptions.environment) {
    phrase += environment === 'city' ? ' in the city' : ' in the park'
  }

  if (speechOptions.time) {
    phrase += time === 'day' ? ' during the day' : ' at night'
  }

  return `${phrase.charAt(0).toUpperCase()}${phrase.slice(1)}.`
}

function App() {
  const [selectedColor, setSelectedColor] = useState<(typeof colors)[number]>(colors[1])
  const [size, setSize] = useState<SizeName>('big')
  const [quantity, setQuantity] = useState(1)
  const [moving, setMoving] = useState(false)
  const [environment, setEnvironment] = useState<EnvironmentName>('city')
  const [time, setTime] = useState<TimeOfDay>('day')
  const [speechOptions, setSpeechOptions] = useState<SpeechOptions>({
    color: true,
    size: false,
    quantity: false,
    action: false,
    environment: false,
    time: false,
  })

  const phrase = buildPhrase({
    selectedColor,
    size,
    quantity,
    moving,
    environment,
    time,
    speechOptions,
  })

  const toggleSpeechOption = (key: SpeechOption) => {
    setSpeechOptions((current) => ({ ...current, [key]: !current[key] }))
  }

  const speak = () => {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(phrase)
    utterance.lang = 'en-US'
    utterance.rate = 0.82
    utterance.pitch = 1.08
    window.speechSynthesis.speak(utterance)
  }

  const playSiren = () => {
    const AudioContextClass = window.AudioContext
    if (!AudioContextClass) return

    const context = new AudioContextClass()
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const now = context.currentTime

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(620, now)
    oscillator.frequency.linearRampToValueAtTime(920, now + 0.35)
    oscillator.frequency.linearRampToValueAtTime(620, now + 0.7)
    oscillator.frequency.linearRampToValueAtTime(920, now + 1.05)
    oscillator.frequency.linearRampToValueAtTime(620, now + 1.4)

    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.11, now + 0.04)
    gain.gain.setValueAtTime(0.11, now + 1.3)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.48)

    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start(now)
    oscillator.stop(now + 1.5)
    oscillator.addEventListener('ended', () => void context.close())
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">3D English Playground</p>
          <h1>Learn01</h1>
        </div>
        <button className="speak-top" onClick={speak} aria-label="Read the English phrase">
          🔊 Read
        </button>
      </header>

      <section className="learning-card">
        <div className="viewer-wrap">
          <Canvas shadows camera={{ position: [7.5, 5.2, 8.2], fov: 42 }} dpr={[1, 1.7]}>
            <LearningScene
              color={selectedColor.value}
              size={size}
              quantity={quantity}
              moving={moving}
              environment={environment}
              time={time}
              onTruckClick={playSiren}
            />
          </Canvas>
          <div className="viewer-tip">↔ Drag to look around · Tap the truck for siren</div>
        </div>

        <aside className="controls">
          <div className="phrase-card" onClick={speak} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && speak()}>
            <span className="object-label">FIRE TRUCK</span>
            <strong>{phrase}</strong>
            <span className="tap-hint">🔊 Tap to listen</span>
          </div>

          <section className="control-group speech-control">
            <div className="speech-heading">
              <div>
                <h2>🗣️ Read aloud</h2>
                <p>Choose what to include. Fire truck is always included.</p>
              </div>
            </div>
            <div className="speech-options">
              <label className="speech-option locked">
                <input type="checkbox" checked disabled />
                <span>🚒 Object</span>
              </label>
              {speechChoices.map((choice) => (
                <label key={choice.key} className={`speech-option ${speechOptions[choice.key] ? 'checked' : ''}`}>
                  <input
                    type="checkbox"
                    checked={speechOptions[choice.key]}
                    onChange={() => toggleSpeechOption(choice.key)}
                  />
                  <span>{choice.icon} {choice.label}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="control-group">
            <h2>🎨 Color</h2>
            <div className="color-row">
              {colors.map((item) => (
                <button
                  key={item.name}
                  className={`color-button ${selectedColor.name === item.name ? 'active' : ''}`}
                  onClick={() => setSelectedColor(item)}
                  title={item.name}
                  aria-label={item.name}
                >
                  <span style={{ background: item.value }} />
                  {item.name}
                </button>
              ))}
            </div>
          </section>

          <section className="control-group split">
            <div>
              <h2>📏 Size</h2>
              <div className="choice-row">
                <button className={size === 'small' ? 'selected' : ''} onClick={() => setSize('small')}>Small</button>
                <button className={size === 'big' ? 'selected' : ''} onClick={() => setSize('big')}>Big</button>
              </div>
            </div>
            <div>
              <h2>🔢 Quantity</h2>
              <div className="choice-row">
                {[1, 2, 3].map((count) => (
                  <button key={count} className={quantity === count ? 'selected' : ''} onClick={() => setQuantity(count)}>{count}</button>
                ))}
              </div>
            </div>
          </section>

          <section className="control-group split">
            <div>
              <h2>🏃 Action</h2>
              <div className="choice-row">
                <button className={!moving ? 'selected' : ''} onClick={() => setMoving(false)}>Park</button>
                <button className={moving ? 'selected' : ''} onClick={() => setMoving(true)}>Move</button>
              </div>
            </div>
            <div>
              <h2>🔊 Sound</h2>
              <button className="sound-button" onClick={playSiren}>🚨 Siren</button>
            </div>
          </section>

          <section className="control-group split">
            <div>
              <h2>🌍 Place</h2>
              <div className="choice-row">
                <button className={environment === 'city' ? 'selected' : ''} onClick={() => setEnvironment('city')}>🏙️ City</button>
                <button className={environment === 'park' ? 'selected' : ''} onClick={() => setEnvironment('park')}>🌳 Park</button>
              </div>
            </div>
            <div>
              <h2>☀️ Time</h2>
              <div className="choice-row">
                <button className={time === 'day' ? 'selected' : ''} onClick={() => setTime('day')}>☀️ Day</button>
                <button className={time === 'night' ? 'selected' : ''} onClick={() => setTime('night')}>🌙 Night</button>
              </div>
            </div>
          </section>
        </aside>
      </section>
    </main>
  )
}

export default App
