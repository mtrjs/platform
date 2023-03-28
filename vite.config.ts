import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import analyze from 'rollup-plugin-analyzer';

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const isBuild = env.command === 'build';
  return {
    css: {
      // css预处理器
      preprocessorOptions: {
        less: {},
      },
    },
    server: {
      host: true,
    },
    build: {
      sourcemap: isBuild ? 'hidden' : false,
      rollupOptions: {
        plugins: [analyze({ summaryOnly: true, limit: 10 })],
      },
    },
    resolve: {
      alias: {
        '@utils': path.resolve(__dirname, './src/utils'),
        '@services': path.resolve(__dirname, './src/services'),
        '@components': path.resolve(__dirname, './src/components'),
      },
    },
    plugins: [react()],
  };
});
