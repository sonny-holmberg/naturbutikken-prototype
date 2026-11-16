// Mock catalogue: 74 products spread over the IA. Values are realistic but invented.
// The first nine (by popularity) reproduce the products shown in the Figma mockups.

export type Use = 'fuglekig' | 'sport' | 'vandring' | 'sejlads' | 'astronomi' | 'safari'
export type Feature = 'vandtaet' | 'billedstabilisering' | 'stativgevind' | 'brillevenlig' | 'ed-glas'
export type Availability = 'lager' | 'faa' | 'fjernlager'

export type Product = {
  id: string
  name: string
  brand: string
  sub: string
  /** Short type word used in the spec line, e.g. "Kikkert" */
  type: string
  price: number
  oldPrice?: number
  member?: boolean
  badge?: 'nyhed' | 'populaer'
  popularity: number
  /** ISO date the product was added (for "Nyeste") */
  added: string
  image?: string
  /** Magnification [min, max]; equal for fixed magnification */
  mag?: [number, number]
  /** Objective diameter in mm */
  objective?: number
  /** Weight in grams */
  weight: number
  uses: Use[]
  features: Feature[]
  availability: Availability
  /** Extra spec shown instead of magnification, e.g. "Højde: 58-197cm" */
  spec?: string
}

type Input = Omit<Product, 'uses' | 'features' | 'availability'> &
  Partial<Pick<Product, 'uses' | 'features' | 'availability'>>

const p = (o: Input): Product => ({ uses: [], features: [], availability: 'lager', ...o })

export const products: Product[] = [
  // ───────────── Kikkerter › Fuglekikkerter ─────────────
  p({ id: 'leica-ultravid-8x32', name: 'Ultravid 8x32 HD-Plus', brand: 'leica', sub: 'fuglekikkerter', type: 'Kikkert', price: 22000, oldPrice: 23900, member: true, badge: 'nyhed', popularity: 100, added: '2026-10-02', image: 'leica-ultravid', mag: [8, 8], objective: 32, weight: 700, uses: ['sport', 'fuglekig', 'vandring'], features: ['ed-glas', 'vandtaet', 'brillevenlig', 'stativgevind'] }),
  p({ id: 'birdlife-albatross-10x42', name: 'Albatross 10x42', brand: 'dof-birdlife', sub: 'fuglekikkerter', type: 'Kikkert', price: 7599, oldPrice: 7999, member: true, badge: 'nyhed', popularity: 99, added: '2026-09-20', image: 'birdlife-albatross', mag: [10, 10], objective: 42, weight: 802, uses: ['fuglekig', 'safari'], features: ['vandtaet', 'ed-glas', 'brillevenlig', 'stativgevind'] }),
  p({ id: 'birdlife-bullfinch-10x42', name: 'Bullfinch 10x42', brand: 'dof-birdlife', sub: 'fuglekikkerter', type: 'Kikkert', price: 899, oldPrice: 2199, member: true, popularity: 96, added: '2024-03-11', image: 'birdlife-bullfinch', mag: [10, 10], objective: 42, weight: 646, uses: ['vandring', 'fuglekig'], features: ['vandtaet', 'stativgevind'] }),
  p({ id: 'birdlife-dipper-8x32', name: 'Dipper 8x32', brand: 'dof-birdlife', sub: 'fuglekikkerter', type: 'Kikkert', price: 1281, oldPrice: 1349, member: true, badge: 'populaer', popularity: 95, added: '2023-06-01', image: 'birdlife-dipper', mag: [8, 8], objective: 32, weight: 499, uses: ['vandring', 'fuglekig', 'sport'], features: ['vandtaet', 'brillevenlig'] }),
  p({ id: 'birdlife-eagle-owl-8x42', name: 'Eagle Owl 8x42', brand: 'dof-birdlife', sub: 'fuglekikkerter', type: 'Kikkert', price: 10449, oldPrice: 10999, member: true, popularity: 94, added: '2025-04-15', image: 'birdlife-eagle-owl', mag: [8, 8], objective: 42, weight: 925, uses: ['fuglekig', 'safari'], features: ['vandtaet', 'ed-glas', 'brillevenlig', 'stativgevind'] }),
  p({ id: 'birdlife-lapwing-10x42', name: 'Lapwing 10x42', brand: 'dof-birdlife', sub: 'fuglekikkerter', type: 'Kikkert', price: 1499, popularity: 88, added: '2024-08-01', image: 'birdlife-lapwing', mag: [10, 10], objective: 42, weight: 710, uses: ['fuglekig', 'vandring'], features: ['vandtaet', 'stativgevind'] }),
  p({ id: 'birdlife-condor-8x42', name: 'Condor 8x42', brand: 'dof-birdlife', sub: 'fuglekikkerter', type: 'Kikkert', price: 3299, oldPrice: 3699, member: true, popularity: 84, added: '2025-01-20', image: 'birdlife-condor', mag: [8, 8], objective: 42, weight: 760, uses: ['fuglekig', 'sejlads'], features: ['vandtaet', 'ed-glas', 'stativgevind'] }),
  p({ id: 'birdlife-knot-10x32', name: 'Knot 10x32', brand: 'dof-birdlife', sub: 'fuglekikkerter', type: 'Kikkert', price: 1199, popularity: 80, added: '2024-05-05', image: 'birdlife-knot', mag: [10, 10], objective: 32, weight: 520, uses: ['vandring', 'sport'], features: ['vandtaet'], availability: 'faa' }),
  p({ id: 'birdlife-cuckoo-8x25', name: 'Cuckoo 8x25 lommekikkert', brand: 'dof-birdlife', sub: 'fuglekikkerter', type: 'Kikkert', price: 599, popularity: 86, added: '2023-11-12', image: 'birdlife-cuckoo', mag: [8, 8], objective: 25, weight: 310, uses: ['vandring', 'sport'], features: ['vandtaet'] }),
  p({ id: 'birdlife-robin-8x25', name: 'Robin 8x25', brand: 'dof-birdlife', sub: 'fuglekikkerter', type: 'Kikkert', price: 449, popularity: 62, added: '2022-09-01', image: 'birdlife-robin', mag: [8, 8], objective: 25, weight: 290, uses: ['vandring'], features: [] }),
  p({ id: 'birdlife-heron-10x42', name: 'Heron 10x42', brand: 'dof-birdlife', sub: 'fuglekikkerter', type: 'Kikkert', price: 2499, popularity: 70, added: '2024-02-14', image: 'birdlife-heron', mag: [10, 10], objective: 42, weight: 690, uses: ['fuglekig', 'safari'], features: ['vandtaet', 'brillevenlig', 'stativgevind'] }),
  p({ id: 'birdlife-swift-8x32', name: 'Swift 8x32', brand: 'dof-birdlife', sub: 'fuglekikkerter', type: 'Kikkert', price: 1799, oldPrice: 1999, popularity: 66, added: '2025-07-01', image: 'birdlife-swift', mag: [8, 8], objective: 32, weight: 540, uses: ['sport', 'vandring'], features: ['vandtaet', 'brillevenlig'], availability: 'fjernlager' }),
  p({ id: 'zeiss-victory-sf-10x32', name: 'Victory SF 10x32', brand: 'zeiss', sub: 'fuglekikkerter', type: 'Kikkert', price: 21999, popularity: 82, added: '2025-03-01', image: 'zeiss-victory-sf', mag: [10, 10], objective: 32, weight: 590, uses: ['fuglekig', 'vandring'], features: ['vandtaet', 'ed-glas', 'brillevenlig', 'stativgevind'] }),
  p({ id: 'zeiss-victory-sf-8x42', name: 'Victory SF 8x42', brand: 'zeiss', sub: 'fuglekikkerter', type: 'Kikkert', price: 23499, popularity: 79, added: '2024-10-10', image: 'zeiss-victory-sf', mag: [8, 8], objective: 42, weight: 790, uses: ['fuglekig', 'safari'], features: ['vandtaet', 'ed-glas', 'brillevenlig', 'stativgevind'], availability: 'fjernlager' }),
  p({ id: 'zeiss-conquest-hdx-10x42', name: 'Conquest HDX 10x42', brand: 'zeiss', sub: 'fuglekikkerter', type: 'Kikkert', price: 9499, oldPrice: 10499, popularity: 72, added: '2026-08-15', badge: 'nyhed', mag: [10, 10], objective: 42, weight: 795, uses: ['fuglekig', 'sejlads'], features: ['vandtaet', 'brillevenlig', 'stativgevind'] }),
  p({ id: 'kowa-bdii-xd-65x32', name: 'BD II XD 6,5x32 WA', brand: 'kowa', sub: 'fuglekikkerter', type: 'Kikkert', price: 2299, popularity: 68, added: '2023-04-04', image: 'kowa-bdii-65', mag: [6.5, 6.5], objective: 32, weight: 510, uses: ['vandring', 'sport'], features: ['vandtaet', 'brillevenlig'] }),
  p({ id: 'kowa-bdii-xd-8x42', name: 'BD II XD 8x42', brand: 'kowa', sub: 'fuglekikkerter', type: 'Kikkert', price: 2599, oldPrice: 2899, member: true, popularity: 74, added: '2023-04-04', image: 'kowa-bdii-8', mag: [8, 8], objective: 42, weight: 690, uses: ['fuglekig', 'vandring'], features: ['vandtaet', 'ed-glas', 'brillevenlig', 'stativgevind'] }),
  p({ id: 'kowa-genesis-10x44', name: 'Genesis 10x44 XD', brand: 'kowa', sub: 'fuglekikkerter', type: 'Kikkert', price: 11999, popularity: 58, added: '2022-05-20', mag: [10, 10], objective: 44, weight: 860, uses: ['fuglekig'], features: ['vandtaet', 'ed-glas', 'stativgevind'], availability: 'fjernlager' }),
  p({ id: 'swarovski-nl-pure-10x42', name: 'NL Pure 10x42', brand: 'swarovski', sub: 'fuglekikkerter', type: 'Kikkert', price: 29999, popularity: 90, added: '2024-06-01', badge: 'populaer', mag: [10, 10], objective: 42, weight: 840, uses: ['fuglekig', 'safari'], features: ['vandtaet', 'ed-glas', 'brillevenlig', 'stativgevind'] }),
  p({ id: 'swarovski-ax-visio-10x32', name: 'AX Visio 10x32', brand: 'swarovski', sub: 'fuglekikkerter', type: 'Smart kikkert', price: 34999, popularity: 87, added: '2026-10-20', badge: 'nyhed', image: 'swarovski-ax-visio', mag: [10, 10], objective: 32, weight: 1090, uses: ['fuglekig', 'safari'], features: ['vandtaet', 'ed-glas', 'stativgevind'], availability: 'faa' }),
  p({ id: 'swarovski-el-85x42', name: 'EL 8,5x42', brand: 'swarovski', sub: 'fuglekikkerter', type: 'Kikkert', price: 24999, oldPrice: 26999, member: true, popularity: 76, added: '2022-01-15', mag: [8.5, 8.5], objective: 42, weight: 840, uses: ['fuglekig', 'sport'], features: ['vandtaet', 'ed-glas', 'brillevenlig', 'stativgevind'] }),
  p({ id: 'kite-apc-10x42', name: 'APC 10x42 Stabilized', brand: 'kite-optics', sub: 'fuglekikkerter', type: 'Kikkert', price: 8999, popularity: 78, added: '2025-09-01', image: 'kite-apc-42', mag: [10, 10], objective: 42, weight: 920, uses: ['sejlads', 'fuglekig', 'safari'], features: ['billedstabilisering', 'vandtaet', 'stativgevind'] }),
  p({ id: 'kite-apc-12x50', name: 'APC 12x50 Stabilized', brand: 'kite-optics', sub: 'fuglekikkerter', type: 'Kikkert', price: 9999, popularity: 64, added: '2025-09-01', image: 'kite-apc-50', mag: [12, 12], objective: 50, weight: 1050, uses: ['sejlads', 'astronomi', 'safari'], features: ['billedstabilisering', 'vandtaet', 'stativgevind'] }),
  p({ id: 'kite-lynx-hd-8x30', name: 'Lynx HD+ 8x30', brand: 'kite-optics', sub: 'fuglekikkerter', type: 'Kikkert', price: 3499, popularity: 55, added: '2023-02-02', mag: [8, 8], objective: 30, weight: 470, uses: ['vandring', 'sport'], features: ['vandtaet', 'brillevenlig'] }),
  p({ id: 'leica-noctivid-10x42', name: 'Noctivid 10x42 Green', brand: 'leica', sub: 'fuglekikkerter', type: 'Kikkert', price: 19999, popularity: 73, added: '2023-09-09', image: 'leica-ultravid', mag: [10, 10], objective: 42, weight: 860, uses: ['fuglekig', 'safari'], features: ['vandtaet', 'ed-glas', 'brillevenlig', 'stativgevind'] }),
  p({ id: 'leica-trinovid-8x42', name: 'Trinovid HD 8x42', brand: 'leica', sub: 'fuglekikkerter', type: 'Kikkert', price: 8999, oldPrice: 9499, popularity: 60, added: '2022-11-11', mag: [8, 8], objective: 42, weight: 720, uses: ['vandring', 'fuglekig'], features: ['vandtaet', 'brillevenlig'] }),

  // ───────────── Kikkerter › Natsyn / termisk / mono / børn ─────────────
  p({ id: 'pulsar-digex-c50', name: 'Digex C50 natsynskikkert', brand: 'pulsar', sub: 'natsynskikkerter', type: 'Natsyn', price: 7999, popularity: 52, added: '2025-11-01', mag: [3.5, 14], objective: 50, weight: 790, uses: ['safari'], features: ['vandtaet', 'stativgevind'], availability: 'fjernlager' }),
  p({ id: 'pulsar-axion-2-xq35', name: 'Axion 2 XQ35 Pro', brand: 'pulsar', sub: 'termiske-spottere', type: 'Termisk', price: 23999, popularity: 50, added: '2026-07-01', badge: 'nyhed', mag: [2, 8], objective: 35, weight: 260, uses: ['safari', 'vandring'], features: ['vandtaet'] }),
  p({ id: 'pulsar-telos-xg35', name: 'Telos XG35', brand: 'pulsar', sub: 'termiske-spottere', type: 'Termisk', price: 34999, popularity: 45, added: '2025-05-01', mag: [2.5, 20], objective: 35, weight: 420, uses: ['safari'], features: ['vandtaet', 'stativgevind'], availability: 'faa' }),
  p({ id: 'kite-mono-ed-10x30', name: 'Mono ED 10x30', brand: 'kite-optics', sub: 'monokikkerter', type: 'Monokikkert', price: 1999, popularity: 48, added: '2024-07-07', image: 'kite-mono-ed', mag: [10, 10], objective: 30, weight: 240, uses: ['vandring', 'sport'], features: ['vandtaet', 'ed-glas'] }),
  p({ id: 'leica-monovid-8x20', name: 'Monovid 8x20', brand: 'leica', sub: 'monokikkerter', type: 'Monokikkert', price: 4999, popularity: 40, added: '2021-03-03', mag: [8, 8], objective: 20, weight: 112, uses: ['vandring'], features: ['vandtaet'] }),
  p({ id: 'birdlife-puffin-8x21', name: 'Puffin 8x21 børnekikkert', brand: 'dof-birdlife', sub: 'boernekikkerter', type: 'Børnekikkert', price: 249, popularity: 77, added: '2024-11-01', image: 'birdlife-puffin', mag: [8, 8], objective: 21, weight: 180, uses: ['vandring', 'fuglekig'], features: [] }),
  p({ id: 'birdlife-puffin-6x21', name: 'Puffin 6x21 børnekikkert', brand: 'dof-birdlife', sub: 'boernekikkerter', type: 'Børnekikkert', price: 229, oldPrice: 279, popularity: 53, added: '2024-11-01', image: 'birdlife-puffin-2', mag: [6, 6], objective: 21, weight: 170, uses: ['vandring'], features: [], availability: 'faa' }),

  // ───────────── Teleskoper ─────────────
  p({ id: 'birdlife-golden-eagle', name: 'Golden Eagle', brand: 'dof-birdlife', sub: 'teleskoper', type: 'Teleskop', price: 16149.05, oldPrice: 16999, popularity: 98, added: '2025-12-01', image: 'birdlife-golden-eagle', mag: [35, 70], objective: 100, weight: 2908, uses: ['fuglekig', 'astronomi'], features: ['vandtaet', 'ed-glas', 'stativgevind'] }),
  p({ id: 'birdlife-kingfisher-16-48x65', name: 'Kingfisher 16-48x65', brand: 'dof-birdlife', sub: 'teleskoper', type: 'Teleskop', price: 3999, popularity: 75, added: '2024-03-03', image: 'birdlife-kingfisher', mag: [16, 48], objective: 65, weight: 1250, uses: ['fuglekig'], features: ['vandtaet', 'stativgevind'] }),
  p({ id: 'birdlife-kingfisher-saet', name: 'Kingfisher teleskopsæt komplet', brand: 'dof-birdlife', sub: 'teleskoper', type: 'Teleskopsæt', price: 5499, oldPrice: 6299, member: true, popularity: 71, added: '2024-03-03', image: 'birdlife-kingfisher-set', mag: [16, 48], objective: 65, weight: 3400, uses: ['fuglekig'], features: ['vandtaet', 'stativgevind'] }),
  p({ id: 'birdlife-mallard-16-48x60', name: 'Mallard 16-48x60', brand: 'dof-birdlife', sub: 'teleskoper', type: 'Teleskop', price: 2699, popularity: 63, added: '2023-08-08', image: 'birdlife-mallard', mag: [16, 48], objective: 60, weight: 1100, uses: ['fuglekig', 'astronomi'], features: ['vandtaet', 'stativgevind'] }),
  p({ id: 'birdlife-merlin-16-48x65', name: 'Merlin 16-48x65', brand: 'dof-birdlife', sub: 'teleskoper', type: 'Teleskop', price: 4299, popularity: 61, added: '2025-02-02', image: 'birdlife-merlin', mag: [16, 48], objective: 65, weight: 1180, uses: ['fuglekig'], features: ['vandtaet', 'ed-glas', 'stativgevind'] }),
  p({ id: 'birdlife-merganser-saet', name: 'Merganser 16-48x65 teleskopsæt', brand: 'dof-birdlife', sub: 'teleskoper', type: 'Teleskopsæt', price: 5999, popularity: 57, added: '2025-02-02', image: 'birdlife-merganser-set', mag: [16, 48], objective: 65, weight: 3600, uses: ['fuglekig'], features: ['vandtaet', 'stativgevind'], availability: 'fjernlager' }),
  p({ id: 'birdlife-goose-22-66x80', name: 'Goose 22-66x80', brand: 'dof-birdlife', sub: 'teleskoper', type: 'Teleskop', price: 6499, oldPrice: 6999, popularity: 59, added: '2024-09-09', image: 'birdlife-goose', mag: [22, 66], objective: 80, weight: 1750, uses: ['fuglekig', 'astronomi'], features: ['vandtaet', 'ed-glas', 'stativgevind'] }),
  p({ id: 'swarovski-atx-25-60x85', name: 'ATX 25-60x85', brand: 'swarovski', sub: 'teleskoper', type: 'Teleskop', price: 39999, popularity: 69, added: '2023-05-05', mag: [25, 60], objective: 85, weight: 1910, uses: ['fuglekig', 'astronomi'], features: ['vandtaet', 'ed-glas', 'stativgevind', 'brillevenlig'] }),
  p({ id: 'kowa-tsn-883', name: 'TSN-883 Prominar 20-60x88', brand: 'kowa', sub: 'teleskoper', type: 'Teleskop', price: 27999, popularity: 54, added: '2022-04-04', mag: [20, 60], objective: 88, weight: 1520, uses: ['fuglekig'], features: ['vandtaet', 'ed-glas', 'stativgevind'], availability: 'fjernlager' }),
  p({ id: 'zeiss-harpia-95', name: 'Harpia 95', brand: 'zeiss', sub: 'teleskoper', type: 'Teleskop', price: 34999, popularity: 51, added: '2023-01-01', mag: [23, 70], objective: 95, weight: 2120, uses: ['fuglekig', 'astronomi'], features: ['vandtaet', 'ed-glas', 'stativgevind'] }),
  p({ id: 'swarovski-st-vista', name: 'ST Vista udsigtskikkert', brand: 'swarovski', sub: 'udsigtskikkerter', type: 'Udsigtskikkert', price: 79999, popularity: 38, added: '2021-06-06', image: 'swarovski-st-vista', mag: [30, 30], objective: 80, weight: 14500, uses: ['fuglekig', 'astronomi'], features: ['vandtaet'], availability: 'fjernlager' }),
  p({ id: 'swarovski-st-vista-coin', name: 'ST Vista med møntautomat', brand: 'swarovski', sub: 'udsigtskikkerter', type: 'Udsigtskikkert', price: 94999, popularity: 30, added: '2021-06-06', image: 'swarovski-st-vista-2', mag: [30, 30], objective: 80, weight: 18200, uses: ['fuglekig'], features: ['vandtaet'], availability: 'fjernlager' }),
  p({ id: 'zeiss-harpia-okular', name: 'Victory Harpia okular 23-70x', brand: 'zeiss', sub: 'okularer', type: 'Okular', price: 6999, popularity: 44, added: '2023-01-01', image: 'zeiss-harpia-okular', mag: [23, 70], weight: 370, uses: ['fuglekig'], features: ['vandtaet', 'brillevenlig'] }),
  p({ id: 'kowa-te-11wz', name: 'TE-11WZ II 25-60x okular', brand: 'kowa', sub: 'okularer', type: 'Okular', price: 4999, popularity: 39, added: '2022-04-04', mag: [25, 60], weight: 250, uses: ['fuglekig'], features: ['vandtaet', 'brillevenlig'] }),
  p({ id: 'swarovski-25-50x-w', name: '25-50x W okular', brand: 'swarovski', sub: 'okularer', type: 'Okular', price: 6499, popularity: 36, added: '2023-05-05', mag: [25, 50], weight: 255, uses: ['fuglekig'], features: ['vandtaet', 'brillevenlig'], availability: 'faa' }),
  p({ id: 'hoya-fusion-58', name: 'Fusion Protector 58mm', brand: 'hoya', sub: 'filtre', type: 'Filter', price: 299, popularity: 42, added: '2024-01-01', image: 'hoya-fusion', weight: 20, spec: 'Ø 58mm' }),
  p({ id: 'hoya-fusion-67', name: 'Fusion Protector 67mm', brand: 'hoya', sub: 'filtre', type: 'Filter', price: 349, oldPrice: 399, popularity: 35, added: '2024-01-01', image: 'hoya-fusion', weight: 25, spec: 'Ø 67mm' }),
  p({ id: 'swarovski-vpa', name: 'VPA variabel phone adapter', brand: 'swarovski', sub: 'fotoadaptere', type: 'Fotoadapter', price: 1299, popularity: 47, added: '2025-06-06', image: 'swarovski-vpa', weight: 95, spec: 'Til smartphones' }),
  p({ id: 'celestron-nexyz-3', name: 'NexYZ 3-akset smartphone-adapter', brand: 'celestron', sub: 'fotoadaptere', type: 'Fotoadapter', price: 699, popularity: 43, added: '2023-10-10', image: 'celestron-nexyz', weight: 380, spec: 'Til smartphones' }),
  p({ id: 'kite-phone-adapter', name: 'Digiscoping-adapter', brand: 'kite-optics', sub: 'fotoadaptere', type: 'Fotoadapter', price: 499, popularity: 41, added: '2024-04-04', image: 'kite-phone-adapter', weight: 160, spec: 'Universal' }),
  p({ id: 'birdlife-phone-clip', name: 'Smartphone-klemme', brand: 'dof-birdlife', sub: 'fotoadaptere', type: 'Fotoadapter', price: 199, popularity: 46, added: '2025-10-01', badge: 'nyhed', image: 'birdlife-phone-clip', weight: 60, spec: 'Silikone' }),

  // ───────────── Mikroskoper og lupper ─────────────
  p({ id: 'celestron-mikroskop-kit', name: 'Mikroskop-kit 40-600x', brand: 'celestron', sub: 'mikroskoper', type: 'Mikroskop', price: 899, popularity: 56, added: '2023-12-01', image: 'celestron-microscope-kit', mag: [40, 600], weight: 1400, uses: [], features: [] }),
  p({ id: 'celestron-labs-cb2000c', name: 'LabS CB2000C', brand: 'celestron', sub: 'mikroskoper', type: 'Mikroskop', price: 1999, popularity: 37, added: '2022-02-02', mag: [40, 2000], weight: 2800, availability: 'fjernlager' }),
  p({ id: 'zeiss-primostar-3', name: 'Primostar 3', brand: 'zeiss', sub: 'mikroskoper', type: 'Mikroskop', price: 14999, popularity: 29, added: '2024-08-08', mag: [40, 1000], weight: 7500, availability: 'fjernlager' }),
  p({ id: 'birdlife-triplet-led-10x', name: 'Triplet LED lup', brand: 'dof-birdlife', sub: 'lupper', type: 'Lup', price: 445.55, oldPrice: 469, member: true, popularity: 91, added: '2024-05-01', image: 'birdlife-triplet-10x', mag: [10, 10], objective: 21, weight: 53, uses: ['vandring'], features: [] }),
  p({ id: 'birdlife-triplet-led-20x', name: 'Triplet LED lup 20x', brand: 'dof-birdlife', sub: 'lupper', type: 'Lup', price: 499, popularity: 65, added: '2024-05-01', image: 'birdlife-triplet-20x', mag: [20, 20], objective: 21, weight: 55, uses: ['vandring'] }),
  p({ id: 'birdlife-boernelup-3x', name: 'Børnelup 3x med LED', brand: 'dof-birdlife', sub: 'lupper', type: 'Lup', price: 99, popularity: 58, added: '2025-08-01', image: 'birdlife-boernelup', mag: [3, 3], objective: 90, weight: 120 }),
  p({ id: 'birdlife-insektglas', name: 'Insektglas med lup', brand: 'dof-birdlife', sub: 'lupper', type: 'Lup', price: 79, popularity: 52, added: '2025-08-01', image: 'birdlife-insektglas', mag: [3, 3], weight: 90, uses: ['vandring'] }),
  p({ id: 'zeiss-lup-d40', name: 'Lup D40 3,5x', brand: 'zeiss', sub: 'lupper', type: 'Lup', price: 699, popularity: 33, added: '2021-01-01', mag: [3.5, 3.5], objective: 40, weight: 45, availability: 'faa' }),

  // ───────────── Tilbehør ─────────────
  p({ id: 'nya-evo-fjord-60c', name: 'Fjord 60-C', brand: 'nya-evo', sub: 'kikkerttasker-og-etuier', type: 'Kamerataske', price: 1950, popularity: 97, added: '2025-05-05', image: 'nya-evo-fjord', weight: 1600, spec: 'Vandafvisende · 3-5 obj', uses: ['vandring'] }),
  p({ id: 'leica-kikkertetui', name: 'Kikkertetui i læder', brand: 'leica', sub: 'kikkerttasker-og-etuier', type: 'Etui', price: 899, popularity: 34, added: '2022-07-07', weight: 210, spec: 'Til 32mm kikkerter' }),
  p({ id: 'swarovski-field-pro-taske', name: 'Field Pro kikkerttaske', brand: 'swarovski', sub: 'kikkerttasker-og-etuier', type: 'Taske', price: 999, oldPrice: 1199, popularity: 32, added: '2023-03-03', weight: 330, spec: 'Til 42mm kikkerter' }),
  p({ id: 'birdlife-krydssele', name: 'Krydssele kikkertrem', brand: 'dof-birdlife', sub: 'remme', type: 'Rem', price: 249, popularity: 81, added: '2024-10-01', badge: 'populaer', image: 'birdlife-krydssele', weight: 140, spec: 'Justerbar' }),
  p({ id: 'swarovski-field-pro-rem', name: 'Field Pro kikkertrem', brand: 'swarovski', sub: 'remme', type: 'Rem', price: 599, popularity: 31, added: '2023-03-03', weight: 110, spec: 'Neopren' }),
  p({ id: 'wing-k-3323c', name: 'K-3323C', brand: 'wing', sub: 'stativer', type: 'Stativ', price: 2899, badge: 'populaer', member: true, popularity: 93, added: '2024-01-15', image: 'wing-k3323c', weight: 1900, spec: 'Højde: 58-197cm', features: ['stativgevind'] }),
  p({ id: 'wing-k-2840c', name: 'K-2840C kulfiberstativ', brand: 'wing', sub: 'stativer', type: 'Stativ', price: 2399, popularity: 60, added: '2024-01-15', image: 'wing-k2840c', weight: 1600, spec: 'Højde: 52-172cm', features: ['stativgevind'] }),
  p({ id: 'swarovski-cth-stativ', name: 'CTH kulfiberstativ', brand: 'swarovski', sub: 'stativer', type: 'Stativ', price: 5999, popularity: 28, added: '2022-02-02', weight: 1550, spec: 'Højde: 60-180cm', features: ['stativgevind'], availability: 'fjernlager' }),
  p({ id: 'gitzo-ghf2w', name: 'GHF2W videohoved', brand: 'gitzo', sub: 'stativhoveder', type: 'Stativhoved', price: 2999, popularity: 48, added: '2023-07-07', image: 'gitzo-ghf2w', weight: 980, spec: 'Fluid-hoved', features: ['stativgevind'] }),
  p({ id: 'gitzo-ghf3w', name: 'GHF3W videohoved', brand: 'gitzo', sub: 'stativhoveder', type: 'Stativhoved', price: 3999, popularity: 27, added: '2023-07-07', image: 'gitzo-ghf2w-2', weight: 1350, spec: 'Fluid-hoved', features: ['stativgevind'], availability: 'faa' }),
  p({ id: 'birdlife-rensesaet', name: 'Komplet rensesæt', brand: 'dof-birdlife', sub: 'rens-og-pleje', type: 'Rensesæt', price: 199, popularity: 85, added: '2025-01-01', image: 'birdlife-rensesaet', weight: 250, spec: '7 dele' }),
  p({ id: 'zeiss-rensesaet', name: 'Lens Cleaning Kit', brand: 'zeiss', sub: 'rens-og-pleje', type: 'Rensesæt', price: 149, popularity: 47, added: '2022-12-01', weight: 120, spec: '5 dele' }),
]
