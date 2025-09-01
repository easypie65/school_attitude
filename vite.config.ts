import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/school_attitude/'  // ← 레포 이름 그대로!
})
