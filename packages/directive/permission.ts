// import { useAuthStore } from '#/store'

// 按钮权限指令
const permission = {
  mounted: (el: any, binding: any) => {
    // 如果编码为空则始终显示
    if (!binding.value) return;
    // TODO 权限集数据如何存储
    // const permissions = useAuthStore().state.permissions;
    const permissions = [] as any;
    const code = binding.value;

    if (
      !permissions.find(
        (m: any) => m.permissionCode.toLowerCase() === code.toLowerCase()
      )
    ) {
      el.parentNode.removeChild(el);
    }
  },
};

export default {
  name: "permission",
  directive: permission,
};
