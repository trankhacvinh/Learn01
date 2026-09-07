export type CategoryId = 'vehicles' | 'animals' | 'objects' | 'shapes'
export type FeatureKey = 'color' | 'size' | 'quantity' | 'action' | 'environment' | 'time' | 'sound'
export type SoundType = 'siren' | 'horn' | 'woof' | 'meow' | 'roar' | 'trumpet' | 'none'

export type LearningSubject = {
  id: string
  category: CategoryId
  name: string
  plural: string
  emoji: string
  defaultColor: string
  features: Record<FeatureKey, boolean>
  actionActive: string
  actionStill: string
  soundType: SoundType
  soundLabel?: string
}

export const categories: Array<{ id: CategoryId; name: string; emoji: string }> = [
  { id: 'vehicles', name: 'Vehicles', emoji: '🚗' },
  { id: 'animals', name: 'Animals', emoji: '🐾' },
  { id: 'objects', name: 'Objects', emoji: '🧸' },
  { id: 'shapes', name: 'Shapes', emoji: '🔷' },
]

const allVisual = {
  color: true,
  size: true,
  quantity: true,
  action: true,
  environment: true,
  time: true,
  sound: false,
} satisfies Record<FeatureKey, boolean>

const naturalAnimal = {
  color: false,
  size: true,
  quantity: true,
  action: true,
  environment: true,
  time: true,
  sound: true,
} satisfies Record<FeatureKey, boolean>

const quietAnimal = {
  ...naturalAnimal,
  sound: false,
} satisfies Record<FeatureKey, boolean>

const fishFeatures = {
  color: true,
  size: true,
  quantity: true,
  action: true,
  environment: false,
  time: false,
  sound: false,
} satisfies Record<FeatureKey, boolean>

const vehicle = {
  ...allVisual,
  sound: true,
} satisfies Record<FeatureKey, boolean>

const quietVehicle = {
  ...allVisual,
  sound: false,
} satisfies Record<FeatureKey, boolean>

export const subjects: LearningSubject[] = [
  {
    id: 'fire-truck', category: 'vehicles', name: 'Fire truck', plural: 'fire trucks', emoji: '🚒',
    defaultColor: '#ef4444', features: vehicle, actionActive: 'moving', actionStill: 'parked', soundType: 'siren', soundLabel: 'Siren',
  },
  {
    id: 'ambulance', category: 'vehicles', name: 'Ambulance', plural: 'ambulances', emoji: '🚑',
    defaultColor: '#f8fafc', features: vehicle, actionActive: 'moving', actionStill: 'parked', soundType: 'siren', soundLabel: 'Siren',
  },
  {
    id: 'police-car', category: 'vehicles', name: 'Police car', plural: 'police cars', emoji: '🚓',
    defaultColor: '#2563eb', features: vehicle, actionActive: 'moving', actionStill: 'parked', soundType: 'siren', soundLabel: 'Siren',
  },
  {
    id: 'bus', category: 'vehicles', name: 'Bus', plural: 'buses', emoji: '🚌',
    defaultColor: '#facc15', features: vehicle, actionActive: 'moving', actionStill: 'parked', soundType: 'horn', soundLabel: 'Horn',
  },
  {
    id: 'car', category: 'vehicles', name: 'Car', plural: 'cars', emoji: '🚗',
    defaultColor: '#22c55e', features: vehicle, actionActive: 'moving', actionStill: 'parked', soundType: 'horn', soundLabel: 'Horn',
  },
  {
    id: 'truck', category: 'vehicles', name: 'Truck', plural: 'trucks', emoji: '🚚',
    defaultColor: '#2563eb', features: vehicle, actionActive: 'moving', actionStill: 'parked', soundType: 'horn', soundLabel: 'Horn',
  },
  {
    id: 'taxi', category: 'vehicles', name: 'Taxi', plural: 'taxis', emoji: '🚕',
    defaultColor: '#facc15', features: vehicle, actionActive: 'moving', actionStill: 'parked', soundType: 'horn', soundLabel: 'Horn',
  },
  {
    id: 'bicycle', category: 'vehicles', name: 'Bicycle', plural: 'bicycles', emoji: '🚲',
    defaultColor: '#ef4444', features: quietVehicle, actionActive: 'moving', actionStill: 'stopped', soundType: 'none',
  },

  {
    id: 'dog', category: 'animals', name: 'Dog', plural: 'dogs', emoji: '🐶',
    defaultColor: '#b87945', features: naturalAnimal, actionActive: 'walking', actionStill: 'standing', soundType: 'woof', soundLabel: 'Woof',
  },
  {
    id: 'cat', category: 'animals', name: 'Cat', plural: 'cats', emoji: '🐱',
    defaultColor: '#8b95a5', features: naturalAnimal, actionActive: 'walking', actionStill: 'standing', soundType: 'meow', soundLabel: 'Meow',
  },
  {
    id: 'lion', category: 'animals', name: 'Lion', plural: 'lions', emoji: '🦁',
    defaultColor: '#d9a441', features: naturalAnimal, actionActive: 'walking', actionStill: 'standing', soundType: 'roar', soundLabel: 'Roar',
  },
  {
    id: 'elephant', category: 'animals', name: 'Elephant', plural: 'elephants', emoji: '🐘',
    defaultColor: '#8793a4', features: naturalAnimal, actionActive: 'walking', actionStill: 'standing', soundType: 'trumpet', soundLabel: 'Trumpet',
  },
  {
    id: 'rabbit', category: 'animals', name: 'Rabbit', plural: 'rabbits', emoji: '🐰',
    defaultColor: '#d9c6b3', features: quietAnimal, actionActive: 'hopping', actionStill: 'sitting', soundType: 'none',
  },
  {
    id: 'bird', category: 'animals', name: 'Bird', plural: 'birds', emoji: '🐦',
    defaultColor: '#4da6e8', features: quietAnimal, actionActive: 'flying', actionStill: 'perched', soundType: 'none',
  },
  {
    id: 'fish', category: 'animals', name: 'Fish', plural: 'fish', emoji: '🐟',
    defaultColor: '#38bdf8', features: fishFeatures, actionActive: 'swimming', actionStill: 'floating', soundType: 'none',
  },
  {
    id: 'bear', category: 'animals', name: 'Bear', plural: 'bears', emoji: '🐻',
    defaultColor: '#8b5e3c', features: quietAnimal, actionActive: 'walking', actionStill: 'standing', soundType: 'none',
  },

  {
    id: 'ball', category: 'objects', name: 'Ball', plural: 'balls', emoji: '⚽',
    defaultColor: '#2563eb', features: allVisual, actionActive: 'bouncing', actionStill: 'still', soundType: 'none',
  },
  {
    id: 'book', category: 'objects', name: 'Book', plural: 'books', emoji: '📘',
    defaultColor: '#2563eb', features: allVisual, actionActive: 'spinning', actionStill: 'still', soundType: 'none',
  },
  {
    id: 'cup', category: 'objects', name: 'Cup', plural: 'cups', emoji: '🥤',
    defaultColor: '#22c55e', features: allVisual, actionActive: 'spinning', actionStill: 'still', soundType: 'none',
  },
  {
    id: 'chair', category: 'objects', name: 'Chair', plural: 'chairs', emoji: '🪑',
    defaultColor: '#a855f7', features: allVisual, actionActive: 'spinning', actionStill: 'still', soundType: 'none',
  },
  {
    id: 'table', category: 'objects', name: 'Table', plural: 'tables', emoji: '🛋️',
    defaultColor: '#b77942', features: allVisual, actionActive: 'spinning', actionStill: 'still', soundType: 'none',
  },
  {
    id: 'box', category: 'objects', name: 'Box', plural: 'boxes', emoji: '📦',
    defaultColor: '#d69e5f', features: allVisual, actionActive: 'spinning', actionStill: 'still', soundType: 'none',
  },
  {
    id: 'apple', category: 'objects', name: 'Apple', plural: 'apples', emoji: '🍎',
    defaultColor: '#ef4444', features: allVisual, actionActive: 'spinning', actionStill: 'still', soundType: 'none',
  },
  {
    id: 'banana', category: 'objects', name: 'Banana', plural: 'bananas', emoji: '🍌',
    defaultColor: '#facc15', features: allVisual, actionActive: 'spinning', actionStill: 'still', soundType: 'none',
  },

  {
    id: 'circle', category: 'shapes', name: 'Circle', plural: 'circles', emoji: '🔵',
    defaultColor: '#2563eb', features: allVisual, actionActive: 'spinning', actionStill: 'still', soundType: 'none',
  },
  {
    id: 'square', category: 'shapes', name: 'Square', plural: 'squares', emoji: '🟩',
    defaultColor: '#22c55e', features: allVisual, actionActive: 'spinning', actionStill: 'still', soundType: 'none',
  },
  {
    id: 'triangle', category: 'shapes', name: 'Triangle', plural: 'triangles', emoji: '🔺',
    defaultColor: '#ef4444', features: allVisual, actionActive: 'spinning', actionStill: 'still', soundType: 'none',
  },
  {
    id: 'star', category: 'shapes', name: 'Star', plural: 'stars', emoji: '⭐',
    defaultColor: '#facc15', features: allVisual, actionActive: 'spinning', actionStill: 'still', soundType: 'none',
  },
  {
    id: 'rectangle', category: 'shapes', name: 'Rectangle', plural: 'rectangles', emoji: '▭',
    defaultColor: '#2563eb', features: allVisual, actionActive: 'spinning', actionStill: 'still', soundType: 'none',
  },
  {
    id: 'heart', category: 'shapes', name: 'Heart', plural: 'hearts', emoji: '❤️',
    defaultColor: '#ef4444', features: allVisual, actionActive: 'spinning', actionStill: 'still', soundType: 'none',
  },
  {
    id: 'oval', category: 'shapes', name: 'Oval', plural: 'ovals', emoji: '🥚',
    defaultColor: '#a855f7', features: allVisual, actionActive: 'spinning', actionStill: 'still', soundType: 'none',
  },
  {
    id: 'diamond', category: 'shapes', name: 'Diamond', plural: 'diamonds', emoji: '🔶',
    defaultColor: '#f59e0b', features: allVisual, actionActive: 'spinning', actionStill: 'still', soundType: 'none',
  },
]

export function subjectsForCategory(category: CategoryId) {
  return subjects.filter((subject) => subject.category === category)
}
