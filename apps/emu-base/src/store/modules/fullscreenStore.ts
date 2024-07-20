import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'
import screenfull from 'screenfull'

export interface IFullscreenStore {
    active: Ref<Boolean>
    toggle(): Promise<void>
}

export const useFullscreenStore = defineStore('app.fullscreen', (): IFullscreenStore => {
    const active = ref<boolean>(false)

    /**
     * 切换全屏
     */
    function toggle(): Promise<void> {
        return new Promise((resolve) => {
            if (screenfull.isFullscreen) {
                screenfull.exit()
                active.value = false
            } else {
                screenfull.request()
                active.value = true
            }
            // end
            resolve()
        })
    }

    return {
        active,
        toggle
    }
})
