import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import alias from '@rollup/plugin-alias';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {},
    },
  },
  plugins: [
    react(),
    alias({
      entries: {
        '@utils': './src/utils',
      },
    }),
  ],
});
