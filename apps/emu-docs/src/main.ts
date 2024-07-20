import EMU from 'emu-plus'
import { createApp } from 'vue'
import AppCmp from './App.vue'
import config from './config'

import useRouter, { resetRouter } from './router'
import useStore from './store'
import locales from '@/locales'

import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { log } from 'console'

let app: ReturnType<typeof createApp> | null

const render = (alone: boolean = true, props: any = null) => {
    // 获取页面
    const pageFiles = import.meta.globEager('./views/**/page.ts')
    config.pages = Object.values(pageFiles).map((m: any) => m.default)
    config.localesMessage = locales

    app = createApp(AppCmp)
    useStore(app)
    useRouter(app, config)
    EMU.install(app, config)

    if (alone) {
        app.mount('#app')
    } else {
        const el = (props.container ? props.container.querySelector('#app') : document.getElementById('app')) as Element
        app.mount(el)
    }
}

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render(true)
} else {
    renderWithQiankun({
        mount(props) {
            console.log('子应用接收到的数据', props)
            props.onGlobalStateChange((state) => {
                console.log(state)
            }, true)
            render(false, props)
        },
        bootstrap() {
            console.log('=======bootstrap=======')
        },
        update() {
            console.log('=======update=======')
        },
        unmount() {
            console.log('=======unmount=======')
            resetRouter()
            app = null
        }
    })
}
