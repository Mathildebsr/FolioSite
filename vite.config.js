// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.png'],
  optimizeDeps: {
    exclude: ['meshline']
  },
  server: {
    port: 3000,
    open: true // Ouvre le navigateur automatiquement
  }
})