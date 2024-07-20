<template>
    <!--节点菜单-->
    <el-sub-menu v-if="menu.type === 0" :index="menu.id + ''">
        <template #title>
            <em-icon :name="menu.icon" class="menus-icon" :style="{ color: menu.iconColor }" size="16px" />
            <span>{{ menu.name }}</span>
        </template>
        <template v-for="item in menu.children">
            <menu-item v-if="item.show" :key="item.id" :menu="item" />
        </template>
    </el-sub-menu>

    <!--链接菜单-->
    <el-menu-item v-else :index="menu.id + ''" @click="onClick(menu)">
        <em-icon :name="menu.icon" class="menus-icon" :style="{ color: menu.iconColor }" />
        <span>{{ menu.name }}</span>
    </el-menu-item>
</template>
<script setup name="MenuItem">
import { openMenu } from '@/utils/menu'

const props = defineProps({
    // 菜单
    menu: {
        type: Object,
        default: () => ({})
    }
})

/**
 * 点击
 * @return {Object} menu 菜单
 */
const onClick = (menu) => {
    openMenu(menu)
}
</script>
