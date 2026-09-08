import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://opsmaxx.dev',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    ssr: { noExternal: ['lucide-react'] },
    resolve: {
      alias: { 'lucide-react': 'lucide-react/dist/esm/lucide-react.mjs' }
    }
  },
  build: { inlineStylesheets: 'always' },
  compressHTML: true
})
