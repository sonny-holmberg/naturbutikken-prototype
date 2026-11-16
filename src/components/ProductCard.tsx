import clsx from 'clsx'
import { useState } from 'react'
import {
  Aperture, Backpack, Binoculars, Camera, Eye, Heart, Link2, Microscope, Moon, ShoppingCartPlus,
  Smartphone, Sparkles, Telescope, Thermometer, ZoomIn, type LucideIcon,
} from 'lucide-react'
import { brandLabel, featureLabels, useLabels } from '../lib/filters'
import { asset, formatPrice, formatWeight } from '../lib/format'
import { useStore } from '../lib/store'
import type { Product } from '../data/products'

const placeholderIcon: Record<string, LucideIcon> = {
  fuglekikkerter: Binoculars, natsynskikkerter: Moon, monokikkerter: Binoculars, boernekikkerter: Binoculars,
  'termiske-spottere': Thermometer, teleskoper: Telescope, udsigtskikkerter: Telescope, okularer: Eye,
  filtre: Aperture, fotoadaptere: Smartphone, mikroskoper: Microscope, lupper: ZoomIn,
  'kikkerttasker-og-etuier': Backpack, remme: Link2, stativer: Camera, stativhoveder: Camera, 'rens-og-pleje': Sparkles,
}

function specLine(p: Product, max = 5) {
  const parts: string[] = []
  if (p.mag) {
    const m = p.mag[0] === p.mag[1] ? `${fmt(p.mag[0])}` : `${fmt(p.mag[0])}-${fmt(p.mag[1])}`
    parts.push(p.objective ? `${m}x${p.objective}mm` : `${m}x`)
  }
  if (p.spec) parts.push(p.spec)
  parts.push(formatWeight(p.weight), p.type)
  if (p.uses[0]) parts.push(useLabels[p.uses[0]])
  if (p.features[0]) parts.push(featureLabels[p.features[0]])
  return parts.slice(0, max).join(' · ')
}
const fmt = (n: number) => String(n).replace('.', ',')

export function ProductImage({ p, className }: { p: Product; className?: string }) {
  if (p.image) {
    return (
      <img
        src={asset(`img/products/${p.image}.webp`)}
        alt=""
        loading="lazy"
        className={clsx('h-full w-full object-contain mix-blend-multiply', className)}
      />
    )
  }
  const Icon = placeholderIcon[p.sub] ?? Binoculars
  return (
    <div className={clsx('flex h-full w-full flex-col items-center justify-center gap-2 text-[#b8c4ce]', className)}>
      <Icon className="size-1/4" strokeWidth={1.2} aria-hidden />
      <span className="text-[11px] tracking-wide">Billede på vej</span>
    </div>
  )
}

function Badges({ p }: { p: Product }) {
  return (
    <>
      {p.badge && (
        <span className="absolute top-3 left-3 rounded-full bg-badge px-2.5 py-0.5 text-xs font-medium text-white">
          {p.badge === 'nyhed' ? 'Nyhed' : 'Populær'}
        </span>
      )}
      {p.member && (
        <span className="absolute right-3 bottom-3 rounded-full bg-sale px-3 py-0.5 text-xs font-medium text-white">
          Medlemspris
        </span>
      )}
    </>
  )
}

function FavoriteButton({ p }: { p: Product }) {
  const { favorites, toggleFavorite } = useStore()
  const on = favorites.has(p.id)
  const [ghosts, setGhosts] = useState<number[]>([])
  return (
    <button
      type="button"
      onClick={() => {
        if (!on) setGhosts((g) => [...g, Date.now()])
        toggleFavorite(p.id)
      }}
      aria-pressed={on}
      aria-label={on ? `Fjern ${p.name} fra favoritter` : `Gem ${p.name} som favorit`}
      className="absolute top-2 right-2 z-10 grid size-9 place-items-center rounded-full text-[#c9d2da] transition hover:bg-white hover:text-primary"
    >
      <Heart className={clsx('size-5 transition', on && 'scale-110 fill-wishlist text-wishlist')} strokeWidth={1.5} />
      {ghosts.map((id) => (
        <Heart
          key={id}
          aria-hidden
          className="animate-heart-ghost pointer-events-none absolute size-5 fill-wishlist text-wishlist"
          strokeWidth={1.5}
          onAnimationEnd={() => setGhosts((g) => g.filter((x) => x !== id))}
        />
      ))}
    </button>
  )
}

function Price({ p, large }: { p: Product; large?: boolean }) {
  const discounted = p.oldPrice !== undefined && p.oldPrice > p.price
  return (
    <div className="min-w-0">
      {discounted && (
        <div className="text-xs text-muted line-through">
          <span className="sr-only">Før </span>
          {formatPrice(p.oldPrice!)}
        </div>
      )}
      <div className={clsx('font-bold', large ? 'text-xl' : 'text-lg', discounted ? 'text-sale-text' : 'text-ink')}>
        {discounted && <span className="sr-only">Nu </span>}
        {formatPrice(p.price)}
      </div>
    </div>
  )
}

function AddToCart({ p, block }: { p: Product; block?: boolean }) {
  const { addToCart } = useStore()
  return (
    <button
      type="button"
      onClick={() => addToCart(p.name)}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium whitespace-nowrap text-white transition hover:bg-primary-dark active:scale-[0.98]',
        block && 'w-full px-2 max-[380px]:gap-1.5 max-[380px]:text-[13px]',
      )}
    >
      Tilføj til kurv
      <ShoppingCartPlus className="size-4" aria-hidden />
    </button>
  )
}

export function ProductCard({ p, view }: { p: Product; view: 'grid' | 'list' }) {
  const title = (
    <>
      <div className="text-xs text-muted">{brandLabel(p.brand)}</div>
      <h3 className="mt-0.5 font-medium text-ink">{p.name}</h3>
    </>
  )

  if (view === 'list') {
    return (
      <article className="flex gap-3 rounded-2xl bg-card p-1.5 sm:gap-8">
        <div className="relative w-32 shrink-0 sm:w-52">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-card-img">
            <ProductImage p={p} className="p-3" />
            <Badges p={p} />
          </div>
          <FavoriteButton p={p} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 py-2 pr-3 sm:flex-row sm:items-end sm:justify-between sm:py-6 sm:pr-6">
          <div className="flex min-w-0 flex-col gap-3 sm:gap-8">
            <div>
              {title}
              <p className="mt-1 text-xs text-muted">{specLine(p)}</p>
            </div>
            <Price p={p} />
          </div>
          <AddToCart p={p} />
        </div>
      </article>
    )
  }

  return (
    <article className="@container flex h-full flex-col rounded-2xl bg-card p-1.5">
      <div className="relative">
        <div className="relative aspect-[1.02] overflow-hidden rounded-xl bg-card-img">
          <ProductImage p={p} className="p-6 sm:p-8" />
          <Badges p={p} />
        </div>
        <FavoriteButton p={p} />
      </div>
      <div className="flex flex-1 flex-col px-3 pt-4 pb-3 sm:px-5 sm:pb-4">
        {title}
        <p className="mt-1 truncate text-xs text-muted" title={specLine(p)}>
          <span className="@2xs:hidden">{specLine(p, 3)}</span>
          <span className="hidden @2xs:inline">{specLine(p)}</span>
        </p>
        <div className="mt-auto flex flex-col gap-3 pt-4 @2xs:flex-row @2xs:items-end @2xs:justify-between">
          <Price p={p} />
          <div className="@2xs:hidden"><AddToCart p={p} block /></div>
          <div className="hidden @2xs:block"><AddToCart p={p} /></div>
        </div>
      </div>
    </article>
  )
}
