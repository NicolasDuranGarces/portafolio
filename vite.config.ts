import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Production ships without source maps.
    sourcemap: false,
  },
  ssr: {
    // Bundle the icon set so Rollup tree-shakes it; otherwise Node would load every icon module at prerender time.
    noExternal: ['@phosphor-icons/react'],
  },
})
