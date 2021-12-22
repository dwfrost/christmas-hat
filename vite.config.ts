import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/snow', // 可通过import.meta.env.BASE_URL访问
    alias: {
    '@': path.resolve(__dirname, 'src'),
},
  plugins: [vue()]
})
