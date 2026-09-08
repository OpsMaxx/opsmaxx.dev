import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { install } from '@/data/copy'

function CopyLine({ cmd }: { cmd: string }) {
  const [done, setDone] = useState(false)
  return (
    <div className="group relative">
      <pre className="overflow-x-auto rounded-lg border border-border bg-background/60 px-4 py-3.5 pr-12 font-mono text-[0.8rem] leading-6 text-foreground/90">
        <code>{cmd}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Copy command"
        onClick={() => {
          navigator.clipboard?.writeText(cmd.replace(/^#.*\n/gm, '').trim())
          setDone(true)
          window.setTimeout(() => setDone(false), 1600)
        }}
        className="absolute right-2 top-2 text-muted-foreground hover:text-brand"
      >
        {done ? <Check className="text-brand" /> : <Copy />}
      </Button>
    </div>
  )
}

export function InstallTabs() {
  return (
    <Tabs defaultValue={install.tabs[0].id} className="w-full">
      <TabsList variant="line" className="mb-6 h-auto gap-6">
        {install.tabs.map((t) => (
          <TabsTrigger key={t.id} value={t.id} className="flex-none px-0 text-sm">
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {install.tabs.map((t) => (
        <TabsContent key={t.id} value={t.id} className="space-y-3">
          <CopyLine cmd={t.cmd} />
          <p className="text-sm text-muted-foreground">{t.note}</p>
        </TabsContent>
      ))}
    </Tabs>
  )
}
