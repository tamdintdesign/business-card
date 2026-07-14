import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages uses /business-card/; Capacitor / local preview use /
const base = process.env.VITE_BASE ?? (process.env.CAPACITOR === '1' ? '/' : undefined)

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: base ?? (command === 'build' ? '/business-card/' : '/'),
}))
