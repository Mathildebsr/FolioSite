// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/FolioSite/',  // nom de ton repo GitHub Pages
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.png'],
  optimizeDeps: {
    exclude: ['meshline']
  },
  server: {
    port: 3000,
    open: true // ouvre le navigateur automatiquement
  }
})
