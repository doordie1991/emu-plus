import { computed } from 'vue'

export default function (props: any, emit: any) {
    const visible = computed({
        get() {
            return props.modelValue
        },
        set(value) {
            emit('update:modelValue', value)
        }
    })

    /**
     * 显示
     */
    const show = () => {
        visible.value = true
    }

    /**
     * 隐藏
     */
    const hide = () => {
        visible.value = false
    }

    return {
        visible,
        show,
        hide
    }
}
