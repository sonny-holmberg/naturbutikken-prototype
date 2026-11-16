# Naturbutikken – product listing prototype

Interactive prototype of the product page and filtering system for an outdoor shop with focus on bird watching. The design was made for a design challenge.
Built for usability testing of browsing, filtering, sorting and progressive loading. Not a real shop. The 74 products are mock data.

**Live:** https://sonny-holmberg.github.io/naturbutikken-prototype/

## Features
- Category browsing with drill-down that follows the information architecture
- Faceted filters: brands (with logos), price and weight histogram sliders with from/to inputs, magnification and objective chips, use, properties, availability
- Live counts per option. Options that would give 0 results are dimmed
- Filter sections adapt to the selected category
- Active-filter chips, "Ryd filter" per section, "Ryd alle"
- Sorting, gallery/list view, "Vis flere produkter" (9 at a time)
- Filter state lives in the URL, so a filtered view can be shared and the back button works
- Mobile: Kategorier / Filtrering / Sortering bottom sheets

## Run locally
```bash
npm install
npm run dev
```
Then open http://localhost:5173/naturbutikken-prototype/

## Deploy
Every push to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## Editing content
- Products: `src/data/products.ts`
- Categories: `src/data/taxonomy.ts`
- Brands: `src/data/brands.ts`
- Filter sections and their logic: `src/lib/filters.ts`
- Images: raw exports go in `assets/` (not committed), then run `npm run images` to regenerate `public/img/`

Stack: Vite, React, TypeScript, Tailwind CSS v4, Radix UI, Vaul, Lucide.
