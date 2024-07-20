<template>
    <div :class="['em-main__sidebar', collapse ? 'collapse' : '']">
        <em-scrollbar v-if="hasMenus">
            <div class="em-main__sidebar__menus">
                <el-menu ref="menuRef" :default-active="active" :unique-opened="uniqueOpened" :collapse="collapse" :collapse-transition="false">
                    <template v-for="item in menus">
                        <MenuItem v-if="item.show" :key="item.id" :menu="item" />
                    </template>
                </el-menu>
            </div>
        </em-scrollbar>

        <div v-else class="em-main__sidebar-empty">
            <em-icon name="filesearch" size="40px" />
            <p>没有菜单</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, nextTick, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useSidebarStore, useSkinsStore, useTabsStore, useAuthStore, useSystemStore } from '@/store'
import MenuItem from './menuItem.vue'

const _sidebarStore = useSidebarStore()
const _skinsStore = useSkinsStore()
const _tabsStore = useTabsStore()
const _authStore = useAuthStore()
const _systemStore = useSystemStore()

const menuRef = ref(null)
const { collapse, menus } = storeToRefs(_sidebarStore)
const { currPage } = storeToRefs(_tabsStore)
const appConfig = storeToRefs(_systemStore).state.value
const authData = storeToRefs(_authStore).state.value

// 是否包含菜单
const hasMenus = computed(() => {
    return menus.value.length > 0
})

// 激活菜单
const active = computed(() => {
    if (!currPage.value?.name || !authData.routes) {
        return 'empty'
    }

    let routeInfo = authData.routes.find((m) => m.routeName === currPage.value.name)

    // 关闭页签时，激活页面设置的关联页签
    if (!routeInfo && currPage.value.meta && currPage.value.meta.relateRoute) {
        routeInfo = authData.routes.find((m) => m.routeName === currPage.value.meta.relateRoute)
    }

    return routeInfo ? routeInfo.id : 'empty'
})

// 是否只保持一个子菜单的展开
const uniqueOpened = computed(() => {
    return _skinsStore.state.uniqueOpened
})

/**
 * 默认打开第一个菜单
 */
const openFirstMenu = () => {
    if (!menus || menus.value.length <= 0) return
    nextTick(() => {
        menuRef.value.open(menus.value[0].id)
    })
}

/**
 * 设置侧边栏菜单
 */
const setSidebarMenus = () => {
    const hasMenu = authData.menus && authData.menus.length > 0
    if (!currPage.value || !hasMenu) {
        return
    }

    // 当前页面为首页时，取菜单数组中的第一个菜单作为当前菜单
    if (currPage.value.path == appConfig.home) {
        _sidebarStore.setMenus(authData.menus[0].children)
        return
    }

    const menu = authData.routes.find((m: any) => m.routeName === currPage.value.name)
    if (!menu) {
        return
    }

    const rootMenu = authData.menus.find((m) => m.id == menu.rootId)
    _sidebarStore.setMenus(rootMenu.children)
}

watchEffect(() => {
    openFirstMenu()
})

watchEffect(() => {
    setSidebarMenus()
})
</script>

<style scoped lang="scss">
@import '../index';
</style>
