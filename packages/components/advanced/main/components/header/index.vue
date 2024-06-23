<template>
    <div class="em-main__header">
        <!--标题-->
        <div class="system-info">
            <img class="system-logo" :src="systemConfig.logo" :alt="systemConfig.logo" :title="systemConfig.title" />
            <div class="system-title">
                {{ systemConfig.title }}
                <label class="system-enterprise" v-if="_userStore.tenantName">[{{ _userStore.tenantName }}]</label>
            </div>
        </div>
        <!--导航栏-->
        <div class="em-main__header__nav">
            <nav-item v-for="menu in menus" :key="menu.id" :model="menu" :active="menu.id === currNavId"
                @click="onNavClick" />
        </div>
        <!--工具栏-->
        <toolbar />
    </div>
</template>
<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import navItem from './navItem'
import toolbar from './toolbar'
import { openMenu } from '@utils/menu'
import { useSystemStore, useTabsStore, useUserStore, useSidebarStore } from '@store'
import cache from '@utils/cache'

const _systemStore = useSystemStore()
const _tabsStore = useTabsStore()
const _userStore = useUserStore()
const _sidebarStore = useSidebarStore()

const currNavId = ref('')
const { menus, routes, tenantName } = storeToRefs(_userStore)
const { currentPage } = storeToRefs(_tabsStore)


const systemConfig = computed(() => {
    return _systemStore.config
})


/**
 * 点击导航菜单
 * @param {Object} menu 菜单
 */
const onNavClick = (menu) => {
    currNavId.value = menu.id
    const chilMenus = menu.children ? menu.children : []
    _sidebarStore.setMenus(chilMenus)

    if (menu.type != 0) {
        openMenu(menu)
    }
}

/**
 * 设置当前导航Id
 */
const setCurrNavId = () => {
    if (!currentPage.value || !menus.value || !routes.value) {
        return
    }

    if (currentPage.value.path == _systemStore.config.home) {
        currNavId.value = menus.value[0].id
        return
    }

    const routeMenu = routes.value.find((m) => m.routeName === currentPage.value.name)
    if (!routeMenu) return

    const rootMenu = menus.value.find((m) => m.id == routeMenu.rootId)
    currNavId.value = rootMenu.id
}

watch(currentPage, (newVal, oldVal) => {
    if (newVal !== oldVal) setCurrNavId()
})

watchEffect(() => {
    const firstMenu = menus.value[0]
    //默认选中第一个菜单
    firstMenu && onNavClick(firstMenu)
})
</script>

<style scoped lang="scss">
@import '../../index';
</style>
