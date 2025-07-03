import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@components': path.resolve(__dirname, './src/components'),
        '@atoms': path.resolve(__dirname, './src/components/atoms'),
        '@molecules': path.resolve(__dirname, './src/components/molecules'),
        '@models': path.resolve(__dirname, './src/models'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@icons': path.resolve(__dirname, './src/assets/icons'),
        '@helpers': path.resolve(__dirname, './src/helpers'),
        '@delivery': path.resolve(__dirname, './src/delivery'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@styles': path.resolve(__dirname, './src/assets/styles'),
        '@constants': path.resolve(__dirname, './src/constants'),
        '@router': path.resolve(__dirname, './src/router'),
      }
    },
    plugins: [react()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '@styles/import' as *;`,
        },
      },
    },
    server: {
      host: true,
      port: 5173,
      strictPort: true,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL ?? 'localhost:8080',
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: 8080,
    },
  }
})
