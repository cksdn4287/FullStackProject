import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // ▼▼▼ 이 부분이 빠져서 빈 화면이 나오는 겁니다! 꼭 넣어주세요. ▼▼▼
  define: {
    'process.env': {}
  },

  // 기존 esbuild 설정 (js 파일에서 jsx 쓰기 위함)
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: []
  },

  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})