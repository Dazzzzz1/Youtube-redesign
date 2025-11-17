import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: 'src',
  server: {
    open: '/index.html',
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
        channel: path.resolve(__dirname, 'src/channelPage.html'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "src/styles/_variables.scss";`,
      },
    },
  },
})
