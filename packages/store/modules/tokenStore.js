import { defineStore } from 'pinia'

const state = () => {
    return {
        //请求令牌
        accessToken: '',
        //刷新令牌
        refreshToken: ''
    }
}

const actions = {
    /**
     * 设置token
     * @param {Object} data
     */
    setToken(data) {
        const { accessToken, refreshToken } = data
        this.accessToken = accessToken
        this.refreshToken = refreshToken
    }
}

export const useTokenStore = defineStore('app.token', {
    state,
    actions,
    persist: {
        enabled: true
    }
})
