import { useState } from 'react'
import { Check } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { tour } from '@/data/copy'

export function ProductTour() {
  const [active, setActive] = useState(tour[0].id)
  const current = tour.find((t) => t.id === active) ?? tour[0]

  return (
    <div>
      <Tabs value={active} onValueChange={setActive}>
        <TabsList variant="line" className="h-auto w-full justify-start gap-8 overflow-x-auto pb-px">
          {tour.map((t) => (
            <TabsTrigger key={t.id} value={t.id} className="flex-none px-0 text-[0.95rem]">
              {t.tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,23rem)_minmax(0,1fr)] lg:gap-16">
        <div key={current.id} className="animate-[tourin_380ms_cubic-bezier(.22,1,.36,1)] lg:pt-4">
          <h3 className="text-2xl font-semibold leading-snug tracking-tight sm:text-[1.7rem]">
            {current.headline}
          </h3>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-muted-foreground">{current.body}</p>
          <ul className="mt-7 space-y-3">
            {current.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-[0.92rem] leading-relaxed">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                <span className="text-foreground/80">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* One frame at a fixed ratio, so switching tabs never resizes the
            page and every capture reads as the same window. */}
        <div className="shot-frame relative aspect-[99/50] w-full">
          {tour.map((t) => (
            <picture key={t.id}>
              <source srcSet={t.shot.replace('.png', '.webp')} type="image/webp" />
              <img
                src={t.shot}
                alt={t.alt}
                width={1800}
                height={908}
                loading="lazy"
                decoding="async"
                className={cn(
                  'absolute inset-0 size-full object-cover object-top transition-opacity duration-500',
                  t.id === active ? 'opacity-100' : 'pointer-events-none opacity-0'
                )}
              />
            </picture>
          ))}
        </div>
      </div>

      <style>{`@keyframes tourin{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
    </div>
  )
}
