import { createPinia, PiniaVuePlugin } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { App } from 'vue'

export default (app: App<Element>) => {
    app.use(PiniaVuePlugin)
    const store = createPinia()
    store.use(piniaPluginPersistedstate)
    app.use(store)

    return store
}

export * from './modules/authStore'
export * from './modules/sidebarStore'
export * from './modules/skinsStore'
export * from './modules/systemStore'
export * from './modules/tabsStore'
export * from './modules/fullscreenStore'

