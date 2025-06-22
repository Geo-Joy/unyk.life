import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'es2015',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['intersection-observer']
        }
      }
    }
  },
  server: {
    host: true,
    port: 3000
  }
})
