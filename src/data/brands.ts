export type Brand = { id: string; label: string; logo?: string }

// Brands with a logo are the ones shown with logos in the filter design.
export const brands: Brand[] = [
  { id: 'dof-birdlife', label: 'DOF BirdLife', logo: 'dof-birdlife' },
  { id: 'kite-optics', label: 'Kite Optics', logo: 'kite-optics' },
  { id: 'kowa', label: 'Kowa', logo: 'kowa' },
  { id: 'leica', label: 'Leica', logo: 'leica' },
  { id: 'pulsar', label: 'Pulsar', logo: 'pulsar' },
  { id: 'swarovski', label: 'Swarovski', logo: 'swarovski' },
  { id: 'zeiss', label: 'Zeiss', logo: 'zeiss' },
  { id: 'celestron', label: 'Celestron' },
  { id: 'gitzo', label: 'Gitzo' },
  { id: 'hoya', label: 'Hoya' },
  { id: 'nya-evo', label: 'NYA-EVO' },
  { id: 'wing', label: 'Wing' },
]

export const brandById = Object.fromEntries(brands.map((b) => [b.id, b])) as Record<string, Brand>
