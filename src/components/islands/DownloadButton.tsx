import { useEffect, useState } from 'react'
import { ArrowDownToLine } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { site } from '@/data/copy'

/** Names the platform the visitor is actually on, once we know it. */
function detect(): string | null {
  const p = navigator.userAgent
  if (/Mac/i.test(p)) return 'macOS'
  if (/Win/i.test(p)) return 'Windows'
  if (/Linux|X11/i.test(p)) return 'Linux'
  return null
}

export function DownloadButton({
  size = 'lg',
  className
}: {
  size?: 'default' | 'lg'
  className?: string
}) {
  const [os, setOs] = useState<string | null>(null)
  useEffect(() => setOs(detect()), [])

  return (
    <a
      href={site.releases}
      className={cn(buttonVariants({ size }), 'group gap-2.5', className)}
    >
      <ArrowDownToLine className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
      {os ? `Download for ${os}` : 'Download OpsMaxx'}
    </a>
  )
}
