import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',  // 빌드된 파일의 상대 경로 설정
  build: {
    outDir: 'dist',  // 확장프로그램 배포를 위한 빌드 디렉토리 설정
    minify: 'esbuild',
    emptyOutDir: true, // 빌드 시 기존 파일 삭제
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
})
