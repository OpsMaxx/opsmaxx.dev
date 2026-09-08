import { useEffect, useState } from 'react'
import { ArrowDownToLine, Check, Copy, ShieldCheck, TriangleAlert } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { install, site } from '@/data/copy'

function detect(): string {
  if (typeof navigator === 'undefined') return 'macos'
  if (/Win/i.test(navigator.userAgent)) return 'windows'
  if (/Linux|X11|Android/i.test(navigator.userAgent)) return 'linux'
  return 'macos'
}

function Command({ cmd, label }: { cmd: string; label?: string }) {
  const [done, setDone] = useState(false)
  return (
    <div className="min-w-0">
      {label && <p className="mb-2 text-[0.78rem] text-muted-foreground">{label}</p>}
      <div className="relative">
        <pre className="overflow-x-auto rounded-lg border border-border bg-band py-3 pl-4 pr-12 font-mono text-[0.78rem] leading-6">
          <code>{cmd}</code>
        </pre>
        <button
          aria-label="Copy command"
          onClick={() => {
            navigator.clipboard?.writeText(cmd)
            setDone(true)
            window.setTimeout(() => setDone(false), 1600)
          }}
          className="absolute right-1.5 top-1.5 grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-brand"
        >
          {done ? <Check className="size-3.5 text-brand" /> : <Copy className="size-3.5" />}
        </button>
      </div>
    </div>
  )
}

function StepHead({ n, title, sub }: { n: string; title: string; sub: string }) {
  return (
    <div className="flex min-w-0 gap-4">
      <span className="mt-0.5 font-mono text-[0.72rem] tracking-[0.16em] text-brand">{n}</span>
      <div className="min-w-0">
        <h3 className="text-[1.05rem] font-semibold leading-snug">{title}</h3>
        <p className="mt-1 text-[0.86rem] text-muted-foreground">{sub}</p>
      </div>
    </div>
  )
}

export function Install() {
  const [os, setOs] = useState('macos')
  useEffect(() => setOs(detect()), [])

  const p = install.platforms.find((x) => x.id === os) ?? install.platforms[0]
  const [s1, s2, s3] = install.steps

  return (
    <div>
      {/* one control, three steps follow it */}
      <div
        role="tablist"
        aria-label="Choose your platform"
        className="inline-flex rounded-full border border-border bg-background p-1"
      >
        {install.platforms.map((x) => (
          <button
            key={x.id}
            role="tab"
            aria-selected={x.id === os}
            onClick={() => setOs(x.id)}
            className={cn(
              'rounded-full px-4 py-1.5 text-[0.85rem] transition-colors duration-200',
              x.id === os
                ? 'bg-brand text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div key={os} className="mt-9 grid animate-[stepin_360ms_cubic-bezier(.22,1,.36,1)] gap-4 lg:grid-cols-3">
        {/* 01 — download */}
        <div className="min-w-0 rounded-2xl border border-border bg-background p-6 sm:p-7">
          <StepHead n={s1.n} title={s1.title} sub={s1.sub} />

          <div className="mt-6 rounded-xl border border-brand/25 bg-brand-soft p-4">
            <p className="font-mono text-[0.8rem] font-medium text-brand">{p.primary.file}</p>
            <p className="mt-1 text-[0.8rem] text-muted-foreground">{p.primary.note}</p>
          </div>

          <ul className="mt-3 space-y-2">
            {p.others.map((o) => (
              <li key={o.file} className="rounded-xl border border-border p-4">
                <p className="font-mono text-[0.8rem]">{o.file}</p>
                <p className="mt-1 text-[0.8rem] text-muted-foreground">{o.note}</p>
              </li>
            ))}
          </ul>

          <a href={site.releases} className={cn(buttonVariants({ size: 'sm' }), 'mt-5 w-full gap-2')}>
            <ArrowDownToLine className="size-4" />
            Go to the release page
          </a>
        </div>

        {/* 02 — the warning */}
        <div className="min-w-0 rounded-2xl border border-border bg-background p-6 sm:p-7">
          <StepHead n={s2.n} title={s2.title} sub={s2.sub} />

          {p.warning.quote ? (
            <p className="mt-6 flex gap-3 rounded-xl border border-warning/30 bg-warning/8 p-4 text-[0.86rem] leading-relaxed">
              <TriangleAlert className="mt-0.5 size-4 shrink-0 text-warning" />
              <span>“{p.warning.quote}”</span>
            </p>
          ) : (
            <p className="mt-6 flex gap-3 rounded-xl border border-brand/25 bg-brand-soft p-4 text-[0.86rem] leading-relaxed">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>No warning on Linux.</span>
            </p>
          )}

          <p className="mt-4 text-[0.86rem] leading-relaxed text-muted-foreground">{p.warning.why}</p>

          {p.warning.steps.length > 0 && (
            <ol className="mt-5 space-y-2.5">
              {p.warning.steps.map((st, i) => (
                <li key={st} className="flex gap-3 text-[0.86rem] leading-relaxed">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{st}</span>
                </li>
              ))}
            </ol>
          )}

          {p.warning.cmd && (
            <div className="mt-5">
              <Command cmd={p.warning.cmd} />
              {p.warning.cmdNote && (
                <p className="mt-2 text-[0.78rem] leading-relaxed text-muted-foreground">{p.warning.cmdNote}</p>
              )}
            </div>
          )}
        </div>

        {/* 03 — connect */}
        <div className="min-w-0 rounded-2xl border border-border bg-band p-6 sm:p-7">
          <StepHead n={s3.n} title={s3.title} sub={s3.sub} />

          <p className="mt-6 text-[0.86rem] font-medium">{install.finish.importTitle}</p>
          <p className="mt-1.5 text-[0.86rem] leading-relaxed text-muted-foreground">
            {install.finish.importBody}
          </p>

          <div className="mt-6 border-t border-border pt-6">
            <p className="text-[0.86rem] font-medium">{install.finish.agentTitle}</p>
            <div className="mt-3">
              <Command cmd={install.finish.agentCmd} />
            </div>
            <p className="mt-2.5 text-[0.86rem] leading-relaxed text-muted-foreground">
              {install.finish.agentBody}
            </p>
          </div>
        </div>
      </div>

      {/* the honesty footer */}
      <div className="mt-4 grid min-w-0 gap-4 rounded-2xl border border-border bg-background p-6 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center">
        <p className="flex gap-3 text-[0.88rem] leading-relaxed text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" />
          <span>{install.trustLine}</span>
        </p>
        <Command cmd={p.verify.cmd} label={install.verifyLabel} />
      </div>

      <style>{`@keyframes stepin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </div>
  )
}
