import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/gestion_tareas_zustand2/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
