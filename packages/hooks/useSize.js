import { computed } from 'vue'
import { useSkinsStore } from '@store'
export default function (props) {
    const _size = computed(() => {
        return props.size || useSkinsStore().fontSize
    })

    return { _size }
}
