import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@use "./packages/styles/element.scss" as *;`
      }
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@use "./packages/styles/app.scss" as *;' // 添加公共样式
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@packages': path.resolve(__dirname, './packages'),
      '@advanced': path.resolve(__dirname, './packages/components/advanced'),
      '@base': path.resolve(__dirname, './packages/components/base'),
      '@form': path.resolve(__dirname, './packages/components/form'),
      '@store': path.resolve(__dirname, './packages/store'),
      '@hooks': path.resolve(__dirname, './packages/hooks'),
      '@router': path.resolve(__dirname, './packages/router'),
      '@utils': path.resolve(__dirname, './packages/utils'),
      '@styles': path.resolve(__dirname, './packages/styles'),
      '@assets': path.resolve(__dirname, './packages/assets'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js' //解决控制台警告提示
    },
    //忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  build: {
    sourcemap: true
  }
})
