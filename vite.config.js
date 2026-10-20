import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import content from './vite-plugin-content.js'

export default defineConfig({
  base: '/',
  // content(): content/**/*.md → ?meta / ?post 모듈 (src/site/content.js)
  plugins: [content(), react()],
  // 기존 static/ 폴더를 그대로 활용 (gatsby public/ 충돌 방지)
  publicDir: 'static',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Rolldown(Vite 8)은 함수 형태만 지원
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three'
          }
        },
      },
    },
  },
})
