import EMU from 'emu-plus'
import { createApp } from 'vue'
import AppCmp from './App.vue'
import config from './config'

import useRouter, { router } from './router'
import useStore, { useSystemStore } from './store'
import useHttp from '@/utils/http'
import locales from '@/locales'
import { registerApps } from '@/qiankun'
import { IBaseCtx } from './types'

import '@/mock'
// 渲染
const render = () => {
    // 获取页面
    const pageFiles = import.meta.globEager('./views/**/page.ts')
    config.pages = Object.values(pageFiles).map((m: any) => m.default)
    config.localesMessage = locales

    const app = createApp(AppCmp)
    const store = useStore(app)
    useRouter(app, config)
    EMU.install(app, config)

    const systemStore = useSystemStore()
    systemStore.init(config)

    app.mount('#app')

    useHttp(config)

    const baseCtx: IBaseCtx = {
        router,
        store
    }

    registerApps(config, baseCtx)
}

render()
