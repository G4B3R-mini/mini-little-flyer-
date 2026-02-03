// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    headers: {
      'Content-Type': 'application/wasm'
    }
  }
})

