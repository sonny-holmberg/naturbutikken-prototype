import { CheckCircle2, Heart, ShoppingCart } from 'lucide-react'
import { useStore } from '../lib/store'

export function Header() {
  const { cart, favorites } = useStore()
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="font-display text-xl font-semibold tracking-tight text-primary">Naturbutikken</span>
          <span className="rounded-full bg-panel px-2 py-0.5 text-[11px] text-muted">Prototype</span>
        </div>
        <div className="flex items-center gap-1">
          <Counter label="Favoritter" n={favorites.size} badgeClass="bg-wishlist text-primary-dark"><Heart className="size-5" strokeWidth={1.6} /></Counter>
          <Counter label="Kurv" n={cart}><ShoppingCart className="size-5" strokeWidth={1.6} /></Counter>
        </div>
      </div>
    </header>
  )
}

function Counter({ label, n, badgeClass = 'bg-primary text-white', children }: { label: string; n: number; badgeClass?: string; children: React.ReactNode }) {
  return (
    <span className="relative grid size-10 place-items-center text-ink" aria-label={`${label}: ${n}`} role="img">
      {children}
      {n > 0 && (
        <span key={n} className={`animate-fade-up absolute top-0.5 right-0 grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 text-[10px] font-medium ${badgeClass}`}>
          {n}
        </span>
      )}
    </span>
  )
}

export function Toast() {
  const { toast } = useStore()
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4">
      {toast && (
        <div key={toast.id} className="animate-fade-up flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-white shadow-lg">
          <CheckCircle2 className="size-4 text-[#8fd46f]" aria-hidden />
          {toast.text}
        </div>
      )}
    </div>
  )
}
