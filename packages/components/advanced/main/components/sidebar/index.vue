<template>
    <div :class='["em-main__sidebar", collapse ? "collapse" : ""]'>
        <em-scrollbar v-if="hasMenus">
            <div class="em-main__sidebar__menus">
                <el-menu ref="menuRef" :default-active="active" :unique-opened="uniqueOpened" :collapse="collapse"
                    :collapse-transition="false">
                    <template v-for="item in menus">
                        <menu-item v-if="item.show" :key="item.id" :menu="item" />
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

<script setup>
import { computed, ref, watch, nextTick, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useSidebarStore, useSkinsStore, useTabsStore, useUserStore, useSystemStore } from '@store'
import menuItem from './menuItem'

const _sidebarStore = useSidebarStore()
const _skinsStore = useSkinsStore()
const _tabsStore = useTabsStore()
const _userStore = useUserStore()
const _systemStore = useSystemStore()

const { collapse, menus } = storeToRefs(_sidebarStore)
const { currentPage } = storeToRefs(_tabsStore)
const menuRef = ref(null)

// 是否包含菜单
const hasMenus = computed(() => {
    return menus.value.length > 0
})

// 激活菜单
const active = computed(() => {
    if (!currentPage.value?.name || !_userStore.routes) {
        return 'empty'
    }

    let routeInfo = _userStore.routes.find((m) => m.routeName === currentPage.value.name)

    if (!routeInfo && currentPage.value.meta && currentPage.value.meta.relateRoute) {
        routeInfo = _userStore.routes.find((m) => m.routeName === currentPage.value.meta.relateRoute)
    }

    return routeInfo ? routeInfo.id : 'empty'
})

// 是否只保持一个子菜单的展开
const uniqueOpened = computed(() => {
    return _skinsStore.uniqueOpened
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
    if (!currentPage.value || !_userStore.menus.value) return
    // 当前页面为首页时，取菜单数组中的第一个菜单作为当前菜单
    if (currentPage.value.path == _systemStore.config.home) {
        _sidebarStore.setMenus(_userStore.menus.value[0].children)
        return
    }

    const menu = _userStore.routes.find((m) => m.routeName === currentPage.value.name)
    if (!menu) return

    const rootMenu = _userStore.menus.find((m) => m.id == menu.rootId)
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
@import '../../index';
</style>
