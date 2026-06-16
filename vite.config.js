import { defineConfig } from 'vite'

// 从环境变量读取 base，支持 VITE_BASE 或 GITHUB_REPOSITORY 自动推断
const repoName = process.env.VITE_BASE ||
  (process.env.GITHUB_REPOSITORY ? '/' + process.env.GITHUB_REPOSITORY.split('/')[1] + '/' : './')
const base = repoName

export default defineConfig({
  base,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      input: 'index.html',
      output: {
        manualChunks: {
          vendor: ['src/modules/core/state.js', 'src/modules/core/utils.js'],
          systems: ['src/modules/systems/hunt.js', 'src/modules/systems/lottery.js', 'src/modules/systems/fusion.js']
        }
      }
    },
    target: 'esnext',
    cssCodeSplit: true
  },
  server: {
    port: 3000,
    open: true
  }
})
