import { defineStore } from 'pinia'

const state = () => {
    return {
        id: 1000
    }
}

const actions = {
    /**
     *  打开窗口
     */
    open() {
        this.id++
        return this.id
    }
}

export const useDialogStore = defineStore('app.dialog', {
    state,
    actions
})
