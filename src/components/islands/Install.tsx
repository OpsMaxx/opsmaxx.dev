import { useEffect, useState } from 'react'
import { ArrowDownToLine, Check, Copy, ShieldCheck, TriangleAlert } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { install } from '@/data/copy'
import type { Release } from '@/lib/releases'

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
        {/* Wraps rather than scrolls: a command you cannot read in full is a
            command you cannot check before running it. overflow-wrap:anywhere
            handles paths, which have no spaces to break on. */}
        <pre className="rounded-lg border border-border bg-band py-3 pl-4 pr-12 font-mono text-[0.78rem] leading-6 whitespace-pre-wrap [overflow-wrap:anywhere]">
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

export function Install({ release }: { release: Release }) {
  // Detected after mount, not during render: the first client render has to
  // match the server HTML or React bails out of hydration. client:load means
  // the correction happens at load, long before this section is scrolled to.
  const [os, setOs] = useState('macos')
  useEffect(() => setOs(detect()), [])

  const p = install.platforms.find((x) => x.id === os) ?? install.platforms[0]
  const r = release.platforms[p.id]
  const manager = install.managers.rows.find((m) => m.id === p.id)
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

          <a
            href={r.primary?.url ?? release.url}
            className={cn(buttonVariants({ size: 'lg' }), 'mt-6 w-full gap-2.5')}
          >
            <ArrowDownToLine className="size-4" />
            Download for {p.label}
          </a>

          {r.primary && (
            <p className="mt-2.5 text-center font-mono text-[0.72rem] text-muted-foreground">
              {r.primary.file} · {r.primary.size}
            </p>
          )}
          <p className="mt-1 text-center text-[0.8rem] text-muted-foreground">{p.primaryNote}</p>

          {r.others.map((o) => (
            <a
              key={o.file}
              href={o.url}
              className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-border p-4 transition-colors hover:border-brand/40"
            >
              <span className="min-w-0">
                {/* Wraps rather than truncates: an ellipsis in the middle of a
                    filename hides the architecture, which is the one part a
                    reader is checking. */}
                <span className="block font-mono text-[0.78rem] [overflow-wrap:anywhere]">{o.file}</span>
                <span className="mt-0.5 block text-[0.8rem] text-muted-foreground">
                  {p.otherNote} · {o.size}
                </span>
              </span>
              <ArrowDownToLine className="size-4 shrink-0 text-muted-foreground" />
            </a>
          ))}

          <a
            href={release.url}
            className="mt-4 block text-center text-[0.8rem] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            All files and checksums
          </a>

          {manager && (
            <div className="mt-6 border-t border-border pt-5">
              <p className="text-[0.8rem] font-medium text-muted-foreground">
                {install.managers.label}
              </p>
              <div className="mt-3">
                <Command cmd={manager.cmd} />
              </div>
              <p className="mt-2 text-[0.78rem] leading-relaxed text-muted-foreground">
                {manager.note}
              </p>
            </div>
          )}
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
              <span>No warning on {p.label}.</span>
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
            <p className="mt-1.5 text-[0.86rem] leading-relaxed text-muted-foreground">
              {install.finish.agentBody}
            </p>
            <div className="mt-4">
              <Command cmd={install.finish.agentCmd} />
            </div>
            <p className="mt-2.5 text-[0.86rem] leading-relaxed text-muted-foreground">
              {install.finish.agentCmdNote[os as keyof typeof install.finish.agentCmdNote]}
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
        <Command cmd={r.verify} label={install.verifyLabel} />
      </div>

      <style>{`@keyframes stepin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </div>
  )
}
