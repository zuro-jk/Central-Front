import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4200,
    proxy: {
      // todas las rutas que empiecen con /api se mandan al backend
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        
      },
    },
  },
})
