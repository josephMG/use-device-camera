import type { LibraryFormats } from 'vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

export default defineConfig(() => ({
  plugins: [
    react(),
    libInjectCss(),
    dts(),
  ],
  build: {
    lib: {
      name: 'use-device-camera',
      entry: ['src/index.ts'],
      formats: ['es', 'cjs'] as LibraryFormats[],
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: true,
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
}))
