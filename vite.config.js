import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  // Mobile/Capacitor builds pass --base=/. GitHub Pages keeps /business-card/.
  const isMobile = process.env.VITE_BASE === '/' || process.env.CAPACITOR === '1'

  return {
    plugins: [react()],
    base: process.env.VITE_BASE ?? (isMobile ? '/' : command === 'build' ? '/business-card/' : '/'),
  }
})
