import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default () => {
  process.env = { ...process.env, ...loadEnv('development', process.cwd(), '') }

  return defineConfig({
    plugins: [react()],
    envDir: process.cwd(),
    envPrefix: 'SERVER_'
  })
}