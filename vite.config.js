import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/front-end-inspiration-board/', // Add this line (match your repo name)
  server: {
    allowedHosts: ['front-end-inspiration-board-r4rm.onrender.com'],
  },
})
