import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
  plugins: [vue()],

  server: {
    port: env.WEB_PORT,
    proxy: {
      '/api': {
        // The address of our API endpoint
        // Note: this is outside the scope of our project
        // See also nginx.conf, where this API endpoint is configured
          target: 'http://' + env.API_HOST + ':' + env.API_PORT,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
    }
})
