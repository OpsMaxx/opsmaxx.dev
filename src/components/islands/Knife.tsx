import { useCallback, useEffect, useState } from 'react'
import {
  Bot,
  Database,
  FolderTree,
  Lock,
  Network,
  Radar,
  Server,
  TerminalSquare,
  type LucideIcon
} from 'lucide-react'
import { IconTile } from '@/components/reui/icon-tile'
import { Badge } from '@/components/reui/badge'
import { cn } from '@/lib/utils'
import type { Blade } from '@/data/copy'

const icons: Record<string, LucideIcon> = {
  terminal: TerminalSquare,
  folder: FolderTree,
  database: Database,
  network: Network,
  lock: Lock,
  server: Server,
  radar: Radar,
  bot: Bot
}

const STEP = 13.5 // degrees between blades

export function Knife({ blades }: { blades: Blade[] }) {
  const [active, setActive] = useState(0)
  const [live, setLive] = useState(true)

  const stop = useCallback(() => setLive(false), [])
  const angleOf = (i: number) => (i - (blades.length - 1) / 2) * STEP

  useEffect(() => {
    if (!live) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % blades.length), 2400)
    return () => window.clearInterval(id)
  }, [live, blades.length])

  const onKey = (e: React.KeyboardEvent) => {
    const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    if (!d) return
    e.preventDefault()
    stop()
    setActive((i) => (i + d + blades.length) % blades.length)
  }

  const current = blades[active]
  const Icon = icons[current.icon] ?? TerminalSquare

  return (
    <div
      onKeyDown={onKey}
      onPointerDown={stop}
      className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-8"
    >
      {/* the knife */}
      <div className="relative mx-auto aspect-square w-full max-w-[38rem] sm:aspect-[4/3]">
        <div
          aria-hidden
          className="absolute left-[30%] top-1/2 size-[70%] -translate-y-1/2 rounded-full bg-brand/10 blur-3xl"
        />

        {/* fan pivot at 16% / 50% */}
        <div
          role="tablist"
          aria-label="OpsMaxx tools"
          className="absolute left-[30%] top-1/2 size-0 transition-transform sm:left-[34%] duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ transform: `rotate(${-angleOf(active)}deg)` }}
        >
          {blades.map((b, i) => {
            const isActive = i === active
            const B = icons[b.icon] ?? TerminalSquare
            return (
              <button
                key={b.id}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onFocus={() => setActive(i)}
                onMouseEnter={() => {
                  stop()
                  setActive(i)
                }}
                onClick={() => {
                  stop()
                  setActive(i)
                }}
                style={{ transform: `rotate(${angleOf(i)}deg) translateX(${isActive ? 12 : 0}px)` }}
                className={cn(
                  'absolute left-0 top-0 flex h-9 w-[12.5rem] origin-[1rem_50%] sm:h-10 -translate-y-1/2 items-center gap-2.5 rounded-l-lg rounded-r-[1.9rem] border pl-5 pr-4 text-left outline-none',
                  'transition-[transform,background-color,border-color,box-shadow,opacity] duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)]',
                  'sm:w-[20.5rem]',
                  isActive
                    ? 'z-10 border-brand/70 bg-gradient-to-r from-brand/30 via-brand/12 to-brand/[0.04] shadow-[0_0_44px_-8px_var(--color-brand)]'
                    : 'border-border/80 bg-gradient-to-r from-secondary via-card to-card/40 opacity-90 hover:border-brand/40 hover:opacity-100',
                  'focus-visible:ring-2 focus-visible:ring-ring'
                )}
              >
                <B
                  className={cn(
                    'size-4 shrink-0 transition-colors duration-300',
                    isActive ? 'text-brand' : 'text-muted-foreground'
                  )}
                />
                <span
                  className={cn(
                    'truncate font-mono text-[0.62rem] uppercase tracking-[0.14em] transition-colors duration-300 sm:text-[0.72rem] sm:tracking-[0.16em]',
                    isActive ? 'text-foreground' : 'text-foreground/55'
                  )}
                >
                  {b.name}
                </span>
              </button>
            )
          })}
        </div>

        {/* handle */}
        <div className="absolute left-[30%] top-1/2 z-20 h-[3.75rem] w-[7rem] sm:left-[34%] sm:h-[4.75rem] sm:w-[9.5rem] -translate-x-[calc(100%-1.1rem)] -translate-y-1/2 rounded-2xl border border-border bg-gradient-to-br from-card via-background to-card shadow-[0_18px_40px_-18px_rgba(0,0,0,.9)]">
          <div className="absolute inset-x-3 inset-y-3 rounded-xl border border-border/60 bg-brand/[0.06]" />
          <span className="absolute right-[0.7rem] top-1/2 size-3.5 -translate-y-1/2 rounded-full border border-brand/60 bg-brand/25 shadow-[0_0_18px_var(--color-brand-dim)]" />
          <span className="absolute left-[0.9rem] top-1/2 size-2 -translate-y-1/2 rounded-full border border-border bg-muted" />
        </div>
      </div>

      {/* the readout */}
      <div className="min-h-[12rem] lg:pl-4">
        <div key={current.id} className="animate-[bladein_360ms_cubic-bezier(.22,1,.36,1)]">
          <div className="flex items-center gap-3">
            <IconTile variant="soft" size="lg" className="text-brand">
              <Icon />
            </IconTile>
            <Badge
              variant="primary-outline"
              size="xl"
              radius="full"
              className="font-mono tracking-[0.18em] uppercase"
            >
              blade {String(active + 1).padStart(2, '0')} / {blades.length}
            </Badge>
          </div>
          <h3 className="mt-6 text-2xl font-semibold tracking-tight">{current.name}</h3>
          <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-muted-foreground">
            {current.line}
          </p>
        </div>

        <div className="mt-8 flex gap-1.5" aria-hidden>
          {blades.map((b, i) => (
            <span
              key={b.id}
              className={cn(
                'h-0.5 flex-1 rounded-full transition-colors duration-500',
                i === active ? 'bg-brand' : 'bg-border'
              )}
            />
          ))}
        </div>
      </div>

      <style>{`@keyframes bladein{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </div>
  )
}
