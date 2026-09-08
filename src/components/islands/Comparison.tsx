import { useState } from 'react'
import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { compare } from '@/data/copy'

type Val = string | boolean

/** One cell's content: a tick, a dash, or a short string. */
function Value({ v, own }: { v: Val; own?: boolean }) {
  if (v === true)
    return <Check className={cn('mx-auto size-4', own ? 'text-brand' : 'text-muted-foreground')} />
  if (v === false)
    return <Minus className="mx-auto size-4 text-muted-foreground/35" />
  return <span className={own ? 'font-medium' : 'text-muted-foreground'}>{v}</span>
}

export function Comparison() {
  // Everything after OpsMaxx is a rival; on a phone you pick one at a time.
  const rivals = compare.cols.slice(1)
  const [rival, setRival] = useState(0)
  const rivalIdx = rival + 1

  return (
    <div>
      {/* ---------------------------------------------- phone and tablet */}
      <div className="lg:hidden">
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Compare against">
          {rivals.map((r, i) => (
            <button
              key={r}
              role="tab"
              aria-selected={i === rival}
              onClick={() => setRival(i)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-[0.82rem] transition-colors duration-200',
                i === rival
                  ? 'border-brand bg-brand text-primary-foreground'
                  : 'border-border bg-background text-muted-foreground hover:text-foreground'
              )}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-background">
          <div className="grid grid-cols-[1fr_1fr] gap-px border-b border-border bg-border">
            <div className="bg-brand-soft px-4 py-3 text-center text-[0.8rem] font-semibold text-brand">
              OpsMaxx
            </div>
            <div className="bg-background px-4 py-3 text-center text-[0.8rem] font-medium text-muted-foreground">
              {rivals[rival]}
            </div>
          </div>

          {compare.rows.map((r) => (
            <div key={r.label} className="border-b border-border last:border-0">
              <p className="px-4 pt-3.5 text-[0.78rem] text-muted-foreground">{r.label}</p>
              <div className="grid grid-cols-[1fr_1fr]">
                <div className="px-4 py-2.5 text-center text-[0.86rem]">
                  <Value v={r.v[0] as Val} own />
                </div>
                <div className="px-4 py-2.5 text-center text-[0.86rem]">
                  <Value v={r.v[rivalIdx] as Val} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------- desktop */}
      <div className="hidden lg:block">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-56"></th>
              {compare.cols.map((c, i) => (
                <th
                  key={c}
                  className={cn(
                    'px-4 pb-5 pt-6 text-center align-bottom',
                    i === 0
                      ? 'rounded-t-2xl border-x border-t border-brand/30 bg-brand-soft text-[0.95rem] font-semibold text-brand'
                      : 'text-[0.85rem] font-medium text-muted-foreground'
                  )}
                >
                  {c}
                  {i === 0 && (
                    <span className="mt-1 block font-mono text-[0.62rem] font-normal uppercase tracking-[0.16em] text-brand/70">
                      free · mit
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compare.rows.map((r, ri) => {
              const last = ri === compare.rows.length - 1
              return (
                <tr key={r.label}>
                  <td
                    className={cn(
                      'py-3.5 pr-6 text-[0.88rem] text-muted-foreground',
                      ri > 0 && 'border-t border-border'
                    )}
                  >
                    {r.label}
                  </td>
                  {r.v.map((v, i) => (
                    <td
                      key={i}
                      className={cn(
                        'px-4 py-3.5 text-center text-[0.88rem]',
                        i === 0
                          ? cn(
                              'border-x border-brand/30 bg-brand-soft',
                              ri > 0 && 'border-t border-t-brand/15',
                              last && 'rounded-b-2xl border-b pb-5'
                            )
                          : ri > 0 && 'border-t border-border'
                      )}
                    >
                      <Value v={v as Val} own={i === 0} />
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
