import { defineStore } from 'pinia'
import { useTabsStore } from '@store'

const state = () => {
    return {
        // 模块
        modules: [],
        // 配置
        config: {
            // 标题
            title: 'Easy-Modular-UI',
            // 描述
            desc: 'Easy-Modular-UI',
            // logo
            logoUrl: '',
            // 首页
            home: '',
            // 登录页
            login: '',
            // 版本
            version: '',
            // 版权声明
            copyright: ''
        },
        // 方法集合
        actions: {
            // 身份认证
            auth: {
                // 刷新令牌
                refreshToken: null,
                // 获取认证信息
                getAuthInfo: null
            },
            // 修改密码
            updatePassword: null,
            // 保存皮肤配置信息
            saveSkin: null,
            // 获取发布记录
            getReleaseLog: null
        },
        // 服务地址
        serviceUrl: ''
    }
}

const actions = {
    /**
     * 初始化
     * @param {Object} data
     */
    init(data) {
        // 初始化系统信息
        Object.assign(this.$state, data)
        // 初始化页签信息
        const _tabsStore = useTabsStore()
        _tabsStore.init()
    }
}

export const useSystemStore = defineStore('app.system', {
    state,
    actions
})
