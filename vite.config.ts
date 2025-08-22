import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        IconsResolver({
          prefix: 'icon'
        })
      ]
    }),
    Icons({
      autoInstall: true
    })
  ],
  server: {
    host: true, // allow access from network
    port: 5173,
    strictPort: true,
    // Allow ngrok host
    allowedHosts: ['bd210d434a4c.ngrok-free.app']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
