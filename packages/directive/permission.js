import { useUserStore } from '@store'

// 按钮权限指令
const permission = {
    mounted: (el, binding) => {
        // 如果编码为空则始终显示
        if (!binding.value) return

        const permissions = useUserStore().permissions
        const code = binding.value

        if (!permissions.find((m) => m.permissionCode.toLowerCase() === code.toLowerCase())) {
            el.parentNode.removeChild(el)
        }
    }
}

export default {
    name: 'permission',
    directive: permission
}
