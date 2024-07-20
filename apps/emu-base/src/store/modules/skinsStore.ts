import { ISkin } from '@/types'
import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'

export interface ISkinStore {
    state: Ref<ISkin>
    init(skin: ISkin): void
    setTheme(themeColor: string): void
}

export const useSkinsStore = defineStore('app.skins', (): ISkinStore => {
    const state = ref<ISkin>({
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
    })

    /**
     * 初始化皮肤信息
     * @param {ISkin} skin
     */
    function init(skin: ISkin): void {
        if (!skin) {
            return
        }

        Object.assign(state.value, skin)

        // 设置主题模式
        window.document.documentElement.setAttribute('data-theme-mode', skin.themeMode)
        // 设置主题颜色
        window.document.documentElement.setAttribute('data-theme-color', skin.themeColor)
        // 祭奠模式
        if (skin && skin.memorial) {
            const html = document.getElementsByTagName('html')[0]
            html.style.filter = 'grayscale(100%)'
        }
    }

    /**
     *  设置主题
     * @param {String} themeColor 主题颜色
     */
    function setTheme(themeColor: string): void {
        state.value.themeColor = themeColor
    }

    return {
        state,
        init,
        setTheme
    }
})
