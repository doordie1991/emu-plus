import { defineStore } from 'pinia'
import screenfull from 'screenfull'

const state = () => {
    return {
        // 全屏激活
        active: false
    }
}

const actions = {
    /**
     * 切换全屏
     */
    toggle() {
        return new Promise((resolve) => {
            if (screenfull.isFullscreen) {
                screenfull.exit()
                this.active = false
            } else {
                screenfull.request()
                this.active = true
            }
            // end
            resolve()
        })
    }
}

export const useFullscreenStore = defineStore('app.fullscreen', {
    state,
    actions
})
