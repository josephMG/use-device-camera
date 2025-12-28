import { defineConfig } from 'vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/use-device-camera/',
  plugins: [
    vanillaExtractPlugin(),
    react()
  ],
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    }
  },
  server: {
    // allowedHosts: ['localhost']
  }
})
