import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

const repoName = 'Camfine'; // 리포지토리 이름

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  server: {
    port: 3000
  },
});