import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { useMemo, useState } from 'react'
import * as THREE from 'three'
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
  const spacing = size === 'big' ? 4.2 : 3.25
  const positions = Array.from({ length: quantity }, (_, index) => {
    const center = (quantity - 1) / 2
    return [(index - center) * spacing, 0, 0] as [number, number, number]
  })
  const isNight = time === 'night'
  const objectColor = subject.features.color ? color : subject.defaultColor
  const baseScale = size === 'big' ? 1.04 : 0.74
  const categoryScale = subject.category === 'shapes' ? 1.15 : subject.category === 'animals' ? 0.92 : 1

  return (
    <>
      <color attach="background" args={[isNight ? '#0f172a' : '#bfe7ff']} />
      {isNight && <Stars radius={45} depth={25} count={900} factor={2.2} fade speed={0.35} />}
      <ambientLight intensity={isNight ? 0.58 : 1.25} />
      <directionalLight
        castShadow
        position={[5, 9, 5]}
        intensity={isNight ? 1.25 : 2.3}
        color={isNight ? '#b9c9ff' : '#fff4d6'}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {isNight && <pointLight position={[0, 5, 2]} intensity={28} distance={18} color="#ffd98a" />}
      {environment === 'city' ? <City /> : <Park />}

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
        minDistance={7}
        maxDistance={15}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.05}
        target={[0, 1, 0]}
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
          <Canvas shadows camera={{ position: [7.5, 5.2, 8.2], fov: 42 }} dpr={[1, 1.7]}>
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
