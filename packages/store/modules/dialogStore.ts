import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'

export interface IDialogStore {
    id: Ref<number>
    open(): void
}

export const useDialogStore = defineStore('app.dialog', (): IDialogStore => {
    const id = ref<number>(1000)

    /**
     *  打开窗口
     */
    function open() {
        return id.value++
    }
    return {
        id,
        open
    }
})
