import { ref } from 'vue'
export default function (emit: any) {
    const _fullscreen = ref(false)
    /**
     * 开启全屏
     */
    const openFullscreen = () => {
        _fullscreen.value = true
        emit('fullscreen-change', _fullscreen.value)
    }

    /**
     * 关闭全屏
     */
    const closeFullscreen = () => {
        _fullscreen.value = false
        emit('fullscreen-change', _fullscreen.value)
    }

    /**
     * 全屏事件
     */
    const triggerFullscreen = () => {
        _fullscreen.value ? closeFullscreen() : openFullscreen()
    }

    return { triggerFullscreen, _fullscreen }
}
