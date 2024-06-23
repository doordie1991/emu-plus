import { defineStore } from 'pinia'

const state = () => {
    return {
        //菜单
        menus: [],
        //折叠
        collapse: false
    }
}

const actions = {
    /**
     * 切换折叠状态
     */
    toggle() {
        this.collapse = !this.collapse
    },

    /**
     * 隐藏
     */
    hide() {
        this.collapse = false
    },

    /**
     * 显示
     */
    show() {
        this.collapse = true
    },

    /**
     *  设置菜单
     * @param {Array} menus 菜单
     */
    setMenus(menus) {
        this.menus = menus
    }
}

export const useSidebarStore = defineStore('app.sidebar', {
    state,
    actions
})
