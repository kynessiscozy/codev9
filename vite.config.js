import { defineConfig } from 'vite'

// 从环境变量读取 base，默认使用相对路径
const base = process.env.VITE_BASE || './'

export default defineConfig({
  base,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1500
  },
  server: {
    port: 3000,
    open: true
  }
})
