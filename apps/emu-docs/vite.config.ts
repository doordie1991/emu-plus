import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    base: 'http://localhost:8002/',
    plugins: [
        vue(),
        qiankun('emu-docs', {
            useDevMode: true
        })
    ],
    server: {
        port: 8002,
        cors: true,
        origin: 'http://localhost:8002'
      },
    css: {
        preprocessorOptions: {
            sass: {
                additionalData: `@use "emu-plus/styles/element.scss" as *;`
            },
            scss: {
                additionalData: '@use "emu-plus/styles/app.scss" as *;' // 添加公共样式
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs' //解决控制台警告提示
        },
        // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    build: {
        sourcemap: true
    }
})
