import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  // 👇 IMPORTANT for GitHub Pages
  base: '/iiit-campus-helper/',
})
