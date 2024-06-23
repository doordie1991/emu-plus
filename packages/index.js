import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import '../packages/styles/element.scss'
import useUI from './components'
import useStore, { useSystemStore } from './store'
import useRouter from './router'
import useLocales from './locales'
import useDirective from './directive'

export default {
    install: (model) => {
        if (!window.emuCtx) window.emuCtx = {}

        const { modules } = model
        const app = createApp(App)
        app.use(ElementPlus)

        useUI(app)
        useStore(app)
        useDirective(app)
        useLocales(app, modules)
        useRouter(app, modules)
        useModules(app, modules)
        useGlobalData(app, modules)

        const systemStore = useSystemStore()
        systemStore.init(model)

        app.mount('#app')

        return app
    }
}

const useModules = (app, modules) => {
    //注册模块全局组件
    for (const m of modules) {
        for (const key in m.globalComponents) {
            app.use(key, m.globalComponents[key])
        }
    }
}

const useGlobalData = (app, modules) => {
    const $api = {}
    for (const module of modules) {
        Object.assign($api, module.api)
    }

    emuCtx.$api = $api
}
