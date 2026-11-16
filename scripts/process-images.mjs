// Converts the raw exports in assets/ into small, web-ready WebP files in public/img/.
// Run with: npm run images   (only needed when source images change)
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const SRC_PRODUCTS = 'assets/Products'
const SRC_LOGOS = 'assets/Logos'
const OUT_PRODUCTS = 'public/img/products'
const OUT_BRANDS = 'public/img/brands'

// slug -> number in the "imgi_<n>_" filename prefix
const products = {
  'leica-ultravid': 41, 'birdlife-albatross': 59, 'birdlife-golden-eagle': 23, 'nya-evo-fjord': 26,
  'birdlife-bullfinch': 58, 'birdlife-dipper': 62, 'birdlife-eagle-owl': 63, 'wing-k3323c': 72,
  'birdlife-triplet-10x': 357, 'birdlife-lapwing': 525, 'birdlife-condor': 34, 'birdlife-knot': 497,
  'birdlife-cuckoo': 60, 'birdlife-robin': 432, 'birdlife-heron': 462, 'birdlife-swift': 571,
  'zeiss-victory-sf': 300, 'kowa-bdii-65': 306, 'kowa-bdii-8': 37, 'swarovski-ax-visio': 293,
  'kite-apc-42': 310, 'kite-apc-50': 314, 'kite-mono-ed': 328, 'birdlife-puffin': 316, 'birdlife-puffin-2': 318,
  'birdlife-kingfisher': 488, 'birdlife-kingfisher-set': 482, 'birdlife-mallard': 543, 'birdlife-merlin': 548,
  'birdlife-merganser-set': 556, 'birdlife-goose': 69, 'swarovski-st-vista': 274, 'swarovski-st-vista-2': 277,
  'zeiss-harpia-okular': 27, 'hoya-fusion': 270, 'swarovski-vpa': 234, 'celestron-nexyz': 353,
  'kite-phone-adapter': 407, 'birdlife-phone-clip': 564, 'celestron-microscope-kit': 348,
  'birdlife-triplet-20x': 367, 'birdlife-boernelup': 372, 'birdlife-insektglas': 468,
  'birdlife-krydssele': 513, 'wing-k2840c': 475, 'gitzo-ghf2w': 239, 'gitzo-ghf2w-2': 25,
  'birdlife-rensesaet': 502,
}

const logos = {
  'dof-birdlife': 'LOGO-BirdLife-colour3.png', 'kite-optics': 'kite optics.png', kowa: 'kowa-logo-PNG.png',
  leica: 'Leica_Camera_logo.png', pulsar: 'Pulsar-Logo-e1699061247624.png',
  swarovski: 'swarovski-optik-logo.png', zeiss: 'Zeiss_logo.svg.png',
}

fs.mkdirSync(OUT_PRODUCTS, { recursive: true })
fs.mkdirSync(OUT_BRANDS, { recursive: true })
const files = fs.readdirSync(SRC_PRODUCTS)

for (const [slug, n] of Object.entries(products)) {
  const file = files.find((f) => f.startsWith(`imgi_${n}_`))
  if (!file) { console.warn('missing', slug, n); continue }
  // Flatten onto white, trim the empty border, then fit into a padded square so all products share a scale.
  const trimmed = await sharp(path.join(SRC_PRODUCTS, file))
    .flatten({ background: '#ffffff' })
    .trim({ threshold: 12 })
    .toBuffer()
  await sharp(trimmed)
    .resize(520, 520, { fit: 'inside' })
    .extend({ top: 60, bottom: 60, left: 60, right: 60, background: '#ffffff' })
    .resize(640, 640, { fit: 'contain', background: '#ffffff' })
    .webp({ quality: 82 })
    .toFile(path.join(OUT_PRODUCTS, `${slug}.webp`))
}

for (const [slug, file] of Object.entries(logos)) {
  await sharp(path.join(SRC_LOGOS, file))
    .trim({ threshold: 10 })
    .resize({ height: 64, width: 220, fit: 'inside' })
    .webp({ quality: 90 })
    .toFile(path.join(OUT_BRANDS, `${slug}.webp`))
}
console.log('done')
