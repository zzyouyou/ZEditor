import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        math: 'parens-division',
      },
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@modelerEngine': path.resolve(__dirname, './ecosys/src'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@root': path.resolve(__dirname, './')
    }
  },
})
