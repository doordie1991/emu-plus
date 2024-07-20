import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'
import { IAppConfig } from 'emu-plus/types'
import { useTabsStore } from '@/store'

export interface ISystemStore {
    state: Ref<IAppConfig>
    init(data: IAppConfig): void
}

export const useSystemStore = defineStore('app.system', (): ISystemStore => {
    const state = ref<IAppConfig>({
        code: 'emu-plus',
        name: 'emu-plus',
        baseApp: false,
        logoUrl: '',
        home: '',
        version: '1.0.0',
        copyright: '',
        pages: [],
        actions: {},
        httpCfg: {
            serviceUrl: '/api'
        },
        localesOptions: {
            legacy: false,
            globalInjection: true,
            locale: 'cn',
            fallbackLocale: 'cn',
            missingWarn: false
        },
        localesMessage: {
            en: {},
            cn: {}
        }
    })

    function init(data: IAppConfig): void {
        Object.assign(state.value, data)
        // 初始化页签信息
        const _tabsStore = useTabsStore()
        _tabsStore.init()
    }

    return {
        state,
        init
    }
})
