import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Relative base so the build works at a domain root or a sub-path (e.g. GitHub Pages).
export default defineConfig({ base: './', plugins: [react()], build: { assetsInlineLimit: 0 } })
