import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  envDir: '..',
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://backend.dev.searchandmerch.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
