import { useEffect, useState } from 'react'
import { ArrowDownToLine } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Release } from '@/lib/releases'

type Id = 'macos' | 'windows' | 'linux'
const NAMES: Record<Id, string> = { macos: 'macOS', windows: 'Windows', linux: 'Linux' }

function detect(): Id | null {
  const ua = navigator.userAgent
  if (/Win/i.test(ua)) return 'windows'
  if (/Mac/i.test(ua)) return 'macos'
  if (/Linux|X11|Android/i.test(ua)) return 'linux'
  return null
}

/**
 * Links straight at the installer for the visitor's platform. Until the first
 * effect runs it points at the releases page, which is also what a visitor
 * with no JavaScript gets — never a dead link, never the wrong binary.
 */
export function DownloadButton({
  release,
  size = 'lg',
  className,
  showMeta = false,
  compact = false
}: {
  release: Release
  size?: 'sm' | 'default' | 'lg'
  className?: string
  showMeta?: boolean
  /** Header use: the platform name is too long for a phone-width bar. */
  compact?: boolean
}) {
  const [os, setOs] = useState<Id | null>(null)
  useEffect(() => setOs(detect()), [])

  const asset = os ? release.platforms[os].primary : null
  const href = asset?.url ?? release.url
  const label = compact ? 'Download' : os ? `Download for ${NAMES[os]}` : 'Download OpsMaxx'

  return (
    <span className={cn('inline-flex flex-col items-center', showMeta && 'gap-2', className)}>
      <a href={href} className={cn(buttonVariants({ size }), 'w-full gap-2.5')}>
        <ArrowDownToLine className={size === 'sm' ? 'size-3.5' : 'size-4'} />
        {label}
      </a>
      {showMeta && (
        <span className="font-mono text-[0.72rem] text-muted-foreground">
          {asset ? `${asset.file} · ${asset.size}` : release.version ? `v${release.version}` : ''}
        </span>
      )}
    </span>
  )
}
