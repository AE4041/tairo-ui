import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react({ 'jsxRuntime': 'classic' }),
    tailwindcss(),
    dts({ include: ['src'], }),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
    },
  },

  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js',
    },

    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
      ],
    },

    target: 'esnext',
  },
})
