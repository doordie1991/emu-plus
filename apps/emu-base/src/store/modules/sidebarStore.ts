import { IMenu } from '@/types'
import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'

export interface ISidebarStore {
    menus: Ref<IMenu[]>
    collapse: Ref<boolean>
    toggle(): void
    hide(): void
    show(): void
    setMenus(menus: IMenu[]): void
}

export const useSidebarStore = defineStore('app.sidebar', (): ISidebarStore => {
    const menus = ref<IMenu[]>([])
    const collapse = ref<boolean>(false)

    /**
     * 切换折叠状态
     */
    function toggle(): void {
        collapse.value = !collapse.value
    }

    /**
     * 隐藏
     */
    function hide(): void {
        collapse.value = false
    }

    /**
     * 显示
     */
    function show(): void {
        collapse.value = true
    }

    /**
     *  设置菜单
     * @param {IMenu[]} data 菜单
     */
    function setMenus(data: IMenu[]): void {
        menus.value = data
    }

    return {
        menus,
        collapse,
        toggle,
        hide,
        show,
        setMenus
    }
})
