import { defineConfig } from 'vite'
import { resolve, relative, extname } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';
import tailwindcss from '@tailwindcss/vite'
import { glob } from "glob"
import { fileURLToPath } from 'node:url'


export default defineConfig({
  plugins: [
    react({ 'jsxRuntime': 'classic' }),
    dts({ include: ['src'], }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      '@components': resolve(__dirname, './src/components'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        entryFileNames: '[name].js',
      },
      input: Object.fromEntries(
        glob.sync('./src/**/*.{ts,tsx}').map(file => [
          relative(
            'src',
            file.slice(0, file.length - extname(file).length)
          ),
          fileURLToPath(new URL(file, import.meta.url))
        ])
      )
    },
    target: 'esnext',
  }
})