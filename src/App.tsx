import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls, RoundedBox, Stars } from '@react-three/drei'
import { useMemo, useState } from 'react'
import { SubjectModel } from './SubjectModel'
import {
  categories,
  subjects,
  subjectsForCategory,
  type CategoryId,
  type LearningSubject,
  type SoundType,
} from './catalog'

type TimeOfDay = 'day' | 'night'
type EnvironmentName = 'city' | 'park'
type SizeName = 'small' | 'big'
type SpeechOption = 'color' | 'size' | 'quantity' | 'action' | 'environment' | 'time'
type SpeechOptions = Record<SpeechOption, boolean>

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

function randomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function Building({
  position,
  size,
  color,
  windows,
}: {
  position: [number, number, number]
  size: [number, number, number]
  color: string
  windows: number
}) {
  const rows = Math.max(1, Math.floor(size[1] / 1.05))
  return (
    <group position={position}>
      <RoundedBox args={size} radius={0.22} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.78} />
      </RoundedBox>
      {Array.from({ length: rows }).flatMap((_, row) =>
        Array.from({ length: windows }).map((__, column) => {
          const x = ((column + 1) / (windows + 1) - 0.5) * (size[0] * 0.75)
          const y = -size[1] / 2 + 0.62 + row * 0.9
          return (
            <RoundedBox
              key={`${row}-${column}`}
              args={[0.32, 0.38, 0.045]}
              radius={0.05}
              smoothness={3}
              position={[x, y, size[2] / 2 + 0.025]}
            >
              <meshStandardMaterial color="#d8f1ff" roughness={0.2} emissive="#8fc9ec" emissiveIntensity={0.08} />
            </RoundedBox>
          )
        }),
      )}
    </group>
  )
}

function City({ isNight }: { isNight: boolean }) {
  const buildings = useMemo(
    () => [
      { p: [-5.3, 1.55, -5.7], s: [1.7, 3.1, 1.7], c: '#f2a7a0', w: 2 },
      { p: [-3.0, 2.05, -5.9], s: [1.8, 4.1, 1.7], c: '#9ec5e8', w: 2 },
      { p: [-0.45, 1.5, -6.2], s: [2.1, 3.0, 1.8], c: '#f3ca79', w: 3 },
      { p: [2.45, 2.35, -5.95], s: [1.9, 4.7, 1.8], c: '#b7a6dc', w: 2 },
      { p: [5.05, 1.75, -5.7], s: [1.75, 3.5, 1.7], c: '#97d0ba', w: 2 },
    ] as Array<{ p: [number, number, number]; s: [number, number, number]; c: string; w: number }>,
    [],
  )

  return (
    <group>
      <mesh position={[0, -0.055, 0]} receiveShadow>
        <boxGeometry args={[20, 0.12, 13]} />
        <meshStandardMaterial color={isNight ? '#26364b' : '#cfe9f6'} roughness={1} />
      </mesh>
      <RoundedBox args={[19, 0.08, 5.7]} radius={0.22} smoothness={4} position={[0, 0.015, 0]} receiveShadow>
        <meshStandardMaterial color={isNight ? '#334155' : '#536577'} roughness={0.96} />
      </RoundedBox>
      <RoundedBox args={[19, 0.09, 1.05]} radius={0.16} smoothness={4} position={[0, 0.05, -3.35]} receiveShadow>
        <meshStandardMaterial color={isNight ? '#667386' : '#e8e2d4'} roughness={0.95} />
      </RoundedBox>
      {[-5.6, -2.8, 0, 2.8, 5.6].map((x) => (
        <RoundedBox key={x} args={[1.55, 0.035, 0.1]} radius={0.03} smoothness={2} position={[x, 0.075, 0]}>
          <meshBasicMaterial color="#f8efd0" />
        </RoundedBox>
      ))}
      {buildings.map((building, index) => (
        <Building
          key={index}
          position={building.p}
          size={building.s}
          color={isNight ? '#42516a' : building.c}
          windows={building.w}
        />
      ))}
    </group>
  )
}

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.14, 0.19, 1.45, 12]} />
        <meshStandardMaterial color="#9a693f" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, 1.75, 0]} scale={[0.9, 1, 0.9]}>
        <dodecahedronGeometry args={[0.82, 1]} />
        <meshStandardMaterial color="#58ad6d" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0.45, 1.6, 0.18]} scale={0.72}>
        <dodecahedronGeometry args={[0.72, 1]} />
        <meshStandardMaterial color="#6fbd79" roughness={0.9} />
      </mesh>
    </group>
  )
}

function Park({ isNight }: { isNight: boolean }) {
  return (
    <group>
      <mesh position={[0, -0.055, 0]} receiveShadow>
        <boxGeometry args={[20, 0.12, 13]} />
        <meshStandardMaterial color={isNight ? '#27423c' : '#9bd486'} roughness={1} />
      </mesh>
      <RoundedBox args={[19, 0.075, 3.8]} radius={0.32} smoothness={5} position={[0, 0.015, 0]} receiveShadow>
        <meshStandardMaterial color={isNight ? '#7b725f' : '#e2cda5'} roughness={0.95} />
      </RoundedBox>
      <Tree position={[-5.2, 0, -3.7]} scale={1.05} />
      <Tree position={[-2.7, 0, -4.35]} scale={0.82} />
      <Tree position={[2.9, 0, -4.2]} scale={0.9} />
      <Tree position={[5.2, 0, -3.55]} scale={1.08} />
      <RoundedBox args={[1.7, 0.17, 0.56]} radius={0.09} smoothness={4} position={[-4.1, 0.72, 2.65]} castShadow>
        <meshStandardMaterial color="#b17b4c" roughness={0.8} />
      </RoundedBox>
      <RoundedBox args={[0.12, 0.85, 0.12]} radius={0.04} smoothness={3} position={[-4.65, 0.34, 2.65]} castShadow>
        <meshStandardMaterial color="#475569" roughness={0.65} />
      </RoundedBox>
      <RoundedBox args={[0.12, 0.85, 0.12]} radius={0.04} smoothness={3} position={[-3.55, 0.34, 2.65]} castShadow>
        <meshStandardMaterial color="#475569" roughness={0.65} />
      </RoundedBox>
    </group>
  )
}

function LearningScene({
  subject,
  color,
  size,
  quantity,
  active,
  environment,
  time,
  onSubjectClick,
}: {
  subject: LearningSubject
  color: string
  size: SizeName
  quantity: number
  active: boolean
  environment: EnvironmentName
  time: TimeOfDay
  onSubjectClick: () => void
}) {
  const spacing = size === 'big' ? 4.15 : 3.2
  const positions = Array.from({ length: quantity }, (_, index) => {
    const center = (quantity - 1) / 2
    return [(index - center) * spacing, 0, 0] as [number, number, number]
  })
  const isNight = time === 'night'
  const objectColor = subject.features.color ? color : subject.defaultColor
  const baseScale = size === 'big' ? 1.02 : 0.73
  const categoryScale = subject.category === 'shapes' ? 1.13 : subject.category === 'animals' ? 0.9 : 1

  return (
    <>
      <color attach="background" args={[isNight ? '#111a2e' : '#dff3ff']} />
      <fog attach="fog" args={[isNight ? '#111a2e' : '#dff3ff', 16, 30]} />
      {isNight && <Stars radius={48} depth={28} count={700} factor={2} fade speed={0.2} />}

      <hemisphereLight args={[isNight ? '#8fa7d8' : '#fff7e5', isNight ? '#26374a' : '#7aa775', isNight ? 1.15 : 1.75]} />
      <ambientLight intensity={isNight ? 0.28 : 0.42} />
      <directionalLight
        castShadow
        position={[6, 9, 7]}
        intensity={isNight ? 1.45 : 2.5}
        color={isNight ? '#b9c9ff' : '#fff1cf'}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={8}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0003}
        shadow-normalBias={0.025}
      />
      <pointLight position={[-5, 5, 5]} intensity={isNight ? 8 : 4} distance={18} color={isNight ? '#ffd89b' : '#c9e7ff'} />

      {environment === 'city' ? <City isNight={isNight} /> : <Park isNight={isNight} />}

      <ContactShadows
        position={[0, 0.07, 0]}
        opacity={isNight ? 0.38 : 0.28}
        scale={15}
        blur={2.8}
        far={5.5}
        resolution={512}
      />

      {positions.map((position, index) => (
        <SubjectModel
          key={`${subject.id}-${index}`}
          subject={subject}
          color={objectColor}
          scale={baseScale * categoryScale}
          position={position}
          active={active}
          onClick={onSubjectClick}
        />
      ))}

      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={6.4}
        maxDistance={13.5}
        minPolarAngle={Math.PI / 4.3}
        maxPolarAngle={Math.PI / 2.08}
        target={[0, 1.15, 0]}
      />
    </>
  )
}

function buildPhrase({
  subject,
  selectedColor,
  size,
  quantity,
  active,
  environment,
  time,
  speechOptions,
}: {
  subject: LearningSubject
  selectedColor: (typeof colors)[number]
  size: SizeName
  quantity: number
  active: boolean
  environment: EnvironmentName
  time: TimeOfDay
  speechOptions: SpeechOptions
}) {
  const includeQuantity = subject.features.quantity && speechOptions.quantity
  const plural = includeQuantity && quantity > 1
  const words: string[] = []

  if (includeQuantity) words.push(numberWords[quantity].toLowerCase())
  if (subject.features.size && speechOptions.size) words.push(size)
  if (subject.features.color && speechOptions.color) words.push(selectedColor.name.toLowerCase())
  words.push(plural ? subject.plural : subject.name.toLowerCase())

  let phrase = words.join(' ')

  if (subject.features.action && speechOptions.action) {
    const actionWord = active ? subject.actionActive : subject.actionStill
    if (includeQuantity) {
      phrase += ` ${quantity === 1 ? 'is' : 'are'} ${actionWord}`
    } else {
      phrase = `the ${phrase} is ${actionWord}`
    }
  }

  if (subject.features.environment && speechOptions.environment) {
    phrase += environment === 'city' ? ' in the city' : ' in the park'
  }

  if (subject.features.time && speechOptions.time) {
    phrase += time === 'day' ? ' during the day' : ' at night'
  }

  return `${phrase.charAt(0).toUpperCase()}${phrase.slice(1)}.`
}

function playSound(type: SoundType) {
  if (type === 'none') return

  const AudioContextClass = window.AudioContext
  if (!AudioContextClass) return

  const context = new AudioContextClass()
  const gain = context.createGain()
  gain.connect(context.destination)
  const now = context.currentTime

  const tone = (frequency: number, start: number, duration: number, endFrequency = frequency, volume = 0.1) => {
    const oscillator = context.createOscillator()
    oscillator.type = type === 'roar' ? 'sawtooth' : type === 'horn' ? 'square' : 'sine'
    oscillator.frequency.setValueAtTime(frequency, now + start)
    oscillator.frequency.linearRampToValueAtTime(endFrequency, now + start + duration)
    const localGain = context.createGain()
    localGain.gain.setValueAtTime(0.0001, now + start)
    localGain.gain.exponentialRampToValueAtTime(volume, now + start + 0.03)
    localGain.gain.exponentialRampToValueAtTime(0.0001, now + start + duration)
    oscillator.connect(localGain)
    localGain.connect(gain)
    oscillator.start(now + start)
    oscillator.stop(now + start + duration)
  }

  if (type === 'siren') {
    tone(620, 0, 0.36, 920, 0.09)
    tone(920, 0.36, 0.36, 620, 0.09)
    tone(620, 0.72, 0.36, 920, 0.09)
    tone(920, 1.08, 0.36, 620, 0.09)
  } else if (type === 'horn') {
    tone(280, 0, 0.38, 265, 0.08)
    tone(240, 0.48, 0.38, 230, 0.08)
  } else if (type === 'woof') {
    tone(190, 0, 0.18, 125, 0.12)
    tone(180, 0.26, 0.2, 110, 0.12)
  } else if (type === 'meow') {
    tone(520, 0, 0.7, 760, 0.07)
    tone(760, 0.7, 0.4, 480, 0.055)
  } else if (type === 'roar') {
    tone(115, 0, 1.0, 75, 0.07)
    tone(90, 0.18, 0.9, 62, 0.05)
  } else if (type === 'trumpet') {
    tone(380, 0, 0.45, 680, 0.08)
    tone(680, 0.45, 0.35, 520, 0.08)
    tone(520, 0.8, 0.45, 760, 0.07)
  }

  window.setTimeout(() => void context.close(), 1800)
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('vehicles')
  const [selectedSubjectId, setSelectedSubjectId] = useState('fire-truck')
  const [selectedColor, setSelectedColor] = useState<(typeof colors)[number]>(colors[1])
  const [size, setSize] = useState<SizeName>('big')
  const [quantity, setQuantity] = useState(1)
  const [active, setActive] = useState(false)
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

  const selectedSubject = subjects.find((subject) => subject.id === selectedSubjectId) ?? subjects[0]
  const visibleSubjects = subjectsForCategory(selectedCategory)
  const phrase = buildPhrase({
    subject: selectedSubject,
    selectedColor,
    size,
    quantity,
    active,
    environment,
    time,
    speechOptions,
  })

  const selectCategory = (category: CategoryId) => {
    setSelectedCategory(category)
    const firstSubject = subjectsForCategory(category)[0]
    setSelectedSubjectId(firstSubject.id)
  }

  const toggleSpeechOption = (key: SpeechOption) => {
    if (!selectedSubject.features[key]) return
    setSpeechOptions((current) => ({ ...current, [key]: !current[key] }))
  }

  const randomizeScene = () => {
    const nextSubject = randomItem(subjects)
    setSelectedCategory(nextSubject.category)
    setSelectedSubjectId(nextSubject.id)
    setSelectedColor(randomItem(colors))
    setSize(randomItem<SizeName>(['small', 'big']))
    setQuantity(randomItem([1, 2, 3]))
    setActive(Math.random() < 0.5)
    setEnvironment(randomItem<EnvironmentName>(['city', 'park']))
    setTime(randomItem<TimeOfDay>(['day', 'night']))
  }

  const speak = () => {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(phrase)
    utterance.lang = 'en-US'
    utterance.rate = 0.82
    utterance.pitch = 1.08
    window.speechSynthesis.speak(utterance)
  }

  const onSubjectClick = () => {
    if (selectedSubject.features.sound) playSound(selectedSubject.soundType)
    else speak()
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">3D English Playground</p>
          <h1>Learn01</h1>
        </div>
        <div className="topbar-actions">
          <button className="random-button" onClick={randomizeScene} aria-label="Randomize subject and scene">
            🎲 Random
          </button>
          <button className="speak-top" onClick={speak} aria-label="Read the English phrase">
            🔊 Read
          </button>
        </div>
      </header>

      <section className="learning-card">
        <div className="viewer-wrap">
          <Canvas
            shadows
            camera={{ position: [7.2, 4.5, 7.8], fov: 40 }}
            dpr={[1, 1.8]}
            gl={{ antialias: true, powerPreference: 'high-performance' }}
          >
            <LearningScene
              subject={selectedSubject}
              color={selectedColor.value}
              size={size}
              quantity={quantity}
              active={active}
              environment={environment}
              time={time}
              onSubjectClick={onSubjectClick}
            />
          </Canvas>
          <div className="viewer-badge">{selectedSubject.emoji} {selectedSubject.name}</div>
          <div className="viewer-tip">
            ↔ Drag to look around · {selectedSubject.features.sound ? `Tap for ${selectedSubject.soundLabel}` : 'Tap to listen'}
          </div>
        </div>

        <aside className="controls">
          <section className="catalog-section">
            <h2>Choose a topic</h2>
            <div className="category-row">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={selectedCategory === category.id ? 'category-button selected' : 'category-button'}
                  onClick={() => selectCategory(category.id)}
                >
                  <span>{category.emoji}</span>
                  {category.name}
                </button>
              ))}
            </div>

            <h2 className="subject-heading">Choose a subject</h2>
            <div className="subject-grid">
              {visibleSubjects.map((subject) => (
                <button
                  key={subject.id}
                  className={selectedSubject.id === subject.id ? 'subject-button selected' : 'subject-button'}
                  onClick={() => setSelectedSubjectId(subject.id)}
                >
                  <span className="subject-emoji">{subject.emoji}</span>
                  <span>{subject.name}</span>
                </button>
              ))}
            </div>
          </section>

          <div className="phrase-card" onClick={speak} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && speak()}>
            <span className="object-label">{selectedSubject.name.toUpperCase()}</span>
            <strong>{phrase}</strong>
            <span className="tap-hint">🔊 Tap to listen</span>
          </div>

          <section className="control-group speech-control">
            <div className="speech-heading">
              <h2>🗣️ Read aloud</h2>
              <p>Choose what to include. The subject is always included.</p>
            </div>
            <div className="speech-options">
              <label className="speech-option locked">
                <input type="checkbox" checked disabled />
                <span>{selectedSubject.emoji} Subject</span>
              </label>
              {speechChoices.map((choice) => {
                const supported = selectedSubject.features[choice.key]
                const checked = supported && speechOptions[choice.key]
                return (
                  <label
                    key={choice.key}
                    className={`speech-option ${checked ? 'checked' : ''} ${supported ? '' : 'unsupported'}`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={!supported}
                      onChange={() => toggleSpeechOption(choice.key)}
                    />
                    <span>{choice.icon} {choice.label}</span>
                  </label>
                )
              })}
            </div>
          </section>

          {selectedSubject.features.color && (
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
          )}

          <section className="control-group split">
            {selectedSubject.features.size && (
              <div>
                <h2>📏 Size</h2>
                <div className="choice-row">
                  <button className={size === 'small' ? 'selected' : ''} onClick={() => setSize('small')}>Small</button>
                  <button className={size === 'big' ? 'selected' : ''} onClick={() => setSize('big')}>Big</button>
                </div>
              </div>
            )}
            {selectedSubject.features.quantity && (
              <div>
                <h2>🔢 Quantity</h2>
                <div className="choice-row">
                  {[1, 2, 3].map((count) => (
                    <button key={count} className={quantity === count ? 'selected' : ''} onClick={() => setQuantity(count)}>{count}</button>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="control-group split">
            {selectedSubject.features.action && (
              <div>
                <h2>🏃 Action</h2>
                <div className="choice-row">
                  <button className={!active ? 'selected' : ''} onClick={() => setActive(false)}>{titleCase(selectedSubject.actionStill)}</button>
                  <button className={active ? 'selected' : ''} onClick={() => setActive(true)}>{titleCase(selectedSubject.actionActive)}</button>
                </div>
              </div>
            )}
            {selectedSubject.features.sound && (
              <div>
                <h2>🔊 Sound</h2>
                <button className="sound-button" onClick={() => playSound(selectedSubject.soundType)}>
                  {selectedSubject.emoji} {selectedSubject.soundLabel}
                </button>
              </div>
            )}
          </section>

          <section className="control-group split">
            {selectedSubject.features.environment && (
              <div>
                <h2>🌍 Place</h2>
                <div className="choice-row">
                  <button className={environment === 'city' ? 'selected' : ''} onClick={() => setEnvironment('city')}>🏙️ City</button>
                  <button className={environment === 'park' ? 'selected' : ''} onClick={() => setEnvironment('park')}>🌳 Park</button>
                </div>
              </div>
            )}
            {selectedSubject.features.time && (
              <div>
                <h2>☀️ Time</h2>
                <div className="choice-row">
                  <button className={time === 'day' ? 'selected' : ''} onClick={() => setTime('day')}>☀️ Day</button>
                  <button className={time === 'night' ? 'selected' : ''} onClick={() => setTime('night')}>🌙 Night</button>
                </div>
              </div>
            )}
          </section>
        </aside>
      </section>
    </main>
  )
}

export default App
