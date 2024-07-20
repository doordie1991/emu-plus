import { createPinia, PiniaVuePlugin } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { App } from 'vue'

export default (app: App<Element>) => {
    app.use(PiniaVuePlugin)
    const store = createPinia()
    store.use(piniaPluginPersistedstate)
    app.use(store)
}

export * from './modules/dialogStore'
export * from './modules/loadingStore'

