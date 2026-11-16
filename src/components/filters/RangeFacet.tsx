import * as Slider from '@radix-ui/react-slider'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { makeScale, niceRound, SLIDER_STEPS } from '../../lib/filters'
import { formatRangeValue } from '../../lib/format'

type Props = {
  name: string
  unit: string
  placeholder: [string, string]
  /** All values in the current category (sets the slider bounds) */
  scopeValues: number[]
  /** Values left after all *other* filters (drives the histogram) */
  baseValues: number[]
  value?: [number, number]
  onChange: (range?: [number, number]) => void
}

const BINS = 14

export function RangeFacet({ name, unit, placeholder, scopeValues, baseValues, value, onChange }: Props) {
  const min = niceRound(Math.min(...scopeValues), 'floor')
  const max = niceRound(Math.max(...scopeValues), 'ceil')
  const scale = useMemo(() => makeScale(min, max), [min, max])

  const lo = value ? Math.max(min, value[0]) : min
  const hi = value ? Math.min(max, value[1]) : max
  // Remember the exact thumb position we last produced, so rounding to "nice" values
  // never snaps the thumb back (which would make arrow keys feel stuck).
  const [local, setLocal] = useState<{ pos: [number, number]; value?: [number, number] }>()
  const sameAsLocal = local && local.value?.[0] === value?.[0] && local.value?.[1] === value?.[1]
  const pos: [number, number] = sameAsLocal ? local.pos : [scale.toPos(lo), scale.toPos(hi)]

  const bins = useMemo(() => {
    const b = new Array(BINS).fill(0)
    for (const v of baseValues) b[Math.min(BINS - 1, Math.floor((scale.toPos(v) / SLIDER_STEPS) * BINS))]++
    return b
  }, [baseValues, scale])
  const peak = Math.max(1, ...bins)

  const normalize = (a: number, b: number): [number, number] | undefined => {
    const [x, y] = a <= b ? [a, b] : [b, a]
    const nx = Math.max(min, x)
    const ny = Math.min(max, y)
    return nx <= min && ny >= max ? undefined : [nx, ny]
  }
  const commit = (a: number, b: number) => {
    setLocal(undefined)
    onChange(normalize(a, b))
  }

  const onSlide = ([a, b]: number[]) => {
    const x = a <= 0 ? min : niceRound(scale.toValue(a), 'floor')
    const y = b >= SLIDER_STEPS ? max : niceRound(scale.toValue(b), 'ceil')
    const range = normalize(x, y)
    setLocal({ pos: [a, b], value: range })
    onChange(range)
  }

  return (
    <div className="px-4 pb-4">
      {/* Histogram */}
      <div className="flex h-16 items-end gap-[3px] px-2" aria-hidden>
        {bins.map((n, i) => {
          const start = (i / BINS) * SLIDER_STEPS
          const end = ((i + 1) / BINS) * SLIDER_STEPS
          const inside = end > pos[0] && start < pos[1]
          return (
            <div
              key={i}
              className={clsx('flex-1 rounded-t-[2px] transition-[height,background-color] duration-300', inside ? 'bg-hist-active' : 'bg-hist')}
              style={{ height: n ? `${Math.max(8, (n / peak) * 100)}%` : '0%' }}
            />
          )
        })}
      </div>

      <Slider.Root
        className="relative -mt-px flex h-6 touch-none items-center select-none"
        min={0}
        max={SLIDER_STEPS}
        step={1}
        minStepsBetweenThumbs={10}
        value={pos}
        onValueChange={onSlide}
        aria-label={name}
      >
        <Slider.Track className="relative h-[3px] grow rounded-full bg-[#cfd3d8]">
          <Slider.Range className="absolute h-full rounded-full bg-primary" />
        </Slider.Track>
        {(['Minimum', 'Maksimum'] as const).map((l, i) => (
          <Slider.Thumb
            key={l}
            aria-label={`${l} ${name.toLowerCase()}`}
            aria-valuetext={formatRangeValue(i === 0 ? lo : hi, unit)}
            className="block size-[18px] cursor-grab rounded-full border-2 border-primary bg-white shadow-sm transition hover:scale-110 focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:outline-none active:cursor-grabbing"
          />
        ))}
      </Slider.Root>

      <div className="mt-2 flex justify-between text-[15px] text-muted tabular-nums">
        <span>{formatRangeValue(lo, unit)}</span>
        <span>{formatRangeValue(hi, unit)}</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <NumberInput unit={unit} label="Fra" placeholder={placeholder[0]} value={value ? lo : undefined} onCommit={(n) => commit(n ?? min, hi)} />
        <NumberInput unit={unit} label="Til" placeholder={placeholder[1]} value={value ? hi : undefined} onCommit={(n) => commit(lo, n ?? max)} />
      </div>
    </div>
  )
}

function NumberInput({ unit, label, placeholder, value, onCommit }: {
  unit: string
  label: string
  placeholder: string
  value?: number
  onCommit: (n?: number) => void
}) {
  const [text, setText] = useState(value?.toString() ?? '')
  useEffect(() => setText(value?.toString() ?? ''), [value])

  const commit = () => {
    const n = text.trim() === '' ? undefined : Number(text.replace(/\./g, '').replace(',', '.'))
    if (n === undefined || Number.isFinite(n)) onCommit(n)
    else setText(value?.toString() ?? '')
  }

  return (
    <label className="block">
      <span className="mb-1 block text-sm text-muted">{label}</span>
      <span className="relative block">
      <input
        type="number"
        inputMode="numeric"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
        className="h-11 w-full rounded-md border border-[#8e8e93] bg-white px-3 text-[15px] placeholder:text-[#8e8e93] focus:border-primary focus:outline-none"
      />
      {/* Unit right after the typed number: invisible copy of the text pushes the unit into place */}
      {text !== '' && (
        <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[13px] text-[15px] whitespace-pre">
          <span className="invisible">{text}</span>
          <span className="ml-1 text-muted">{unit}</span>
        </span>
      )}
      </span>
    </label>
  )
}
