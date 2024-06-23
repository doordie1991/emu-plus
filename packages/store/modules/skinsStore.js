import { defineStore } from 'pinia'

const state = () => {
    return {
        //主题模式
        themeMode: 'dark',
        //主题颜色
        themeColor: 'theme1',
        //字号
        fontSize: 'small',
        //祭奠模式
        memorial: false,
        //最大窗口数量
        maxOpenCount: 20,
        //是否只保持一个子菜单的展开
        uniqueOpened: true
    }
}

const actions = {
    /**
     * 初始化皮肤信息
     * @param {Object} skin
     */
    init(skin) {
        if (!skin) {
            skin = {
                themeMode: 'dark',
                themeColor: 'theme1'
            }
        }

        Object.assign(this.$state, skin)
        //设置主题模式
        window.document.documentElement.setAttribute('data-theme-mode', skin.themeMode)
        //设置主题颜色
        window.document.documentElement.setAttribute('data-theme-color', skin.themeColor)
        //祭奠模式
        if (skin && skin.memorial) {
            const html = document.getElementsByTagName('html')[0]
            html.style.filter = 'grayscale(100%)'
        }
    },

    /**
     *  设置主题
     * @param {String} themeColor 主题颜色
     */
    setTheme(themeColor) {
        this.themeColor = themeColor
    }
}

export const useSkinsStore = defineStore('app.skins', {
    state,
    actions
})
