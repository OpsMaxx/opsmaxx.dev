import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { ai } from '@/data/copy'

/**
 * The request pipeline, walked one step at a time. It starts only when the
 * section is on screen and stops when it leaves, so an idle tab is idle.
 */
export function McpFlow() {
  const [step, setStep] = useState(-1)
  const root = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStep(ai.flow.length - 1)
      return
    }

    let timer: number | undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (timer) return
          setStep(0)
          timer = window.setInterval(
            () => setStep((s) => (s + 1) % ai.flow.length),
            1500
          )
        } else if (timer) {
          window.clearInterval(timer)
          timer = undefined
        }
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (timer) window.clearInterval(timer)
    }
  }, [])

  return (
    <ol ref={root} className="relative space-y-0">
      {ai.flow.map((f, i) => {
        const on = i === step
        const done = step > i
        return (
          <li key={f.step} className="relative flex gap-4 pb-6 last:pb-0">
            {/* rail */}
            {i < ai.flow.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[0.6875rem] top-6 h-full w-px bg-border"
              >
                <span
                  className={cn(
                    'block w-px origin-top bg-brand transition-transform duration-[900ms] ease-out',
                    done || on ? 'scale-y-100' : 'scale-y-0'
                  )}
                  style={{ height: '100%' }}
                />
              </span>
            )}

            <span
              aria-hidden
              className={cn(
                'relative z-10 mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border text-[0.6rem] font-medium transition-all duration-500',
                on
                  ? 'scale-110 border-brand bg-brand text-primary-foreground shadow-[0_0_0_5px_var(--brand-soft)]'
                  : done
                    ? 'border-brand/45 bg-brand-soft text-brand'
                    : 'border-border bg-background text-muted-foreground'
              )}
            >
              {i + 1}
            </span>

            <div className="min-w-0 pt-0.5">
              <p
                className={cn(
                  'text-[0.95rem] font-medium transition-colors duration-500',
                  on || done ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {f.step}
              </p>
              <p
                className={cn(
                  'mt-1 font-mono text-[0.76rem] leading-relaxed transition-colors duration-500',
                  on ? 'text-brand' : 'text-muted-foreground/70'
                )}
              >
                {f.detail}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
