import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

function pathResolve(dir) {
  return resolve(process.cwd(), ".", dir);
}

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: pathResolve("src") + '/',
      }
    ]
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:80',
        rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true
      }
    }
  }
})
