<template>
    <div class="em-main__header">
        <!--标题-->
        <div class="system-info">
            <img class="system-logo" :src="appConfig.logoUrl" :title="appConfig.name" />
            <div class="system-title">
                {{ appConfig.name }}
                <label class="system-enterprise" v-if="tenantName">[{{ tenantName }}]</label>
            </div>
        </div>
        <!--导航栏-->
        <div class="em-main__header__nav">
            <NavItem v-for="menu in menus" :key="menu.id" :model="menu" :active="menu.id === currNavId" @click="onNavClick" />
        </div>
        <!--工具栏-->
        <Toolbar />
    </div>
</template>
<script lang="ts" setup>
import { ref, watch, watchEffect, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import NavItem from './navItem.vue'
import Toolbar from './toolbar.vue'
import { openMenu } from '@/utils/menu'
import { useSystemStore, useTabsStore, useAuthStore, useSidebarStore } from '@/store'

const _systemStore = useSystemStore()
const _tabsStore = useTabsStore()
const _authStore = useAuthStore()
const _sidebarStore = useSidebarStore()

const currNavId = ref('')
const { currPage } = storeToRefs(_tabsStore)
const { menus, routes, tenantName } = toRefs(storeToRefs(_authStore).state.value)
const appConfig = storeToRefs(_systemStore).state.value

/**
 * 点击导航菜单
 * @param {Object} menu 菜单
 */
const onNavClick = (menu: any) => {
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
    if (!currPage.value || !menus.value || !routes.value) {
        return
    }

    if (currPage.value.path == appConfig.home) {
        currNavId.value = menus.value[0].id
        return
    }

    const routeMenu = routes.value.find((m: any) => m.routeName === currPage.value.name)
    if (!routeMenu) return

    const rootMenu = menus.value.find((m: any) => m.id == routeMenu.rootId)
    currNavId.value = rootMenu.id
}

watch(currPage, (newVal, oldVal) => {
    if (newVal !== oldVal) setCurrNavId()
})

watchEffect(() => {
    const firstMenu = menus.value[0]
    //默认选中第一个菜单
    firstMenu && onNavClick(firstMenu)
})
</script>

<style scoped lang="scss">
@import '../index';
</style>
