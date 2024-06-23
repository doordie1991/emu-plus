import { createPinia, PiniaVuePlugin } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

export default (app) => {
    app.use(PiniaVuePlugin)
    const store = createPinia()
    store.use(piniaPersist)
    app.use(store)
}

export { useDialogStore } from './modules/dialogStore'
export { useFullscreenStore } from './modules/fullscreenStore'
export { useLoadingStore } from './modules/loadingStore'
export { useSidebarStore } from './modules/sidebarStore'
export { useSkinsStore } from './modules/skinsStore'
export { useSystemStore } from './modules/systemStore'
export { useTabsStore } from './modules/tabsStore'
export { useTokenStore } from './modules/tokenStore'
export { useUserStore } from './modules/userStore'
