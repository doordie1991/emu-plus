<template>
    <div class="em-main__content">
        <div class="em-main__content__tabs">
            <TabNav>
                <template v-slot:before>
                    <div class="toggle-btn">
                        <a @click.prevent="_sidebarStore.toggle">
                            <em-icon :name="collapse ? 'indent' : 'outdent'"></em-icon>
                        </a>
                    </div>
                </template>
            </TabNav>
        </div>
        <div class="em-main__content__page">
            <!--主应用-->
            <template v-if="!microAppPage">
                <router-view v-slot="{ Component }" v-if="routerActived">
                    <transition name="fade-transform" mode="out-in">
                        <keep-alive :include="keepAlivePages">
                            <component :is="Component" />
                        </keep-alive>
                    </transition> </router-view
            ></template>
            <!--子应用渲染区域-->
            <div id="renderView" v-else></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, provide, nextTick, computed } from 'vue'
import { useSidebarStore, useTabsStore } from '@/store'
import { storeToRefs } from 'pinia'
import { router } from '@/router'
import TabNav from '@/components/tabnav/index.vue'

// 路由激活
const routerActived = ref<boolean>(true)
const _sidebarStore = useSidebarStore()
const _tabsStore = useTabsStore()

const { keepAlivePages } = storeToRefs(_tabsStore)
const { collapse } = storeToRefs(_sidebarStore)

const microAppPage = computed(() => {
    return router.currentRoute.value?.meta?.microApp === true
})

// 重载页面
const reload = () => {
    routerActived.value = false
    nextTick(() => {
        routerActived.value = true
    })
}

provide('reload', reload)
</script>

<style scoped lang="scss">
@import '../index';
</style>
