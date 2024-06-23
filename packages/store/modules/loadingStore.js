import { defineStore } from 'pinia'

const state = () => {
    return {
        text: '正在努力加载...',
        background: 'rgba(255, 255, 255, 0.6)',
        spinner: 'el-icon-loading'
    }
}

export const useLoadingStore = defineStore('app.loading', {
    state
})
