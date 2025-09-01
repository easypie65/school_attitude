// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 사용자 페이지면 base: '/' 로 두세요.
// 일반(프로젝트) 레포면 반드시 '/레포이름/' 로!
export default defineConfig({
  plugins: [react()],
  base: '/school_attitude/'
})
