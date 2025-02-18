import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/sila-ck-table-mui-rtk-query-npm/",  // ✅ Corrected to match repo name
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
    },
  },
  optimizeDeps: {
    include: ['react-router-dom','react-waypoint'],
  },
  build: {
    rollupOptions: {
      external: ['react-router-dom'],
    },
  },
})
