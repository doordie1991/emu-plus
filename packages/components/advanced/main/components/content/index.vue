<template>
    <div class="em-main__content">
        <div class="em-main__content__tabs">
            <em-tabnav>
                <template v-slot:before>
                    <div class="toggle-btn">
                        <a @click.prevent="_sidebarStore.toggle">
                            <em-icon :name="collapse ? 'indent' : 'outdent'"></em-icon>
                        </a>
                    </div>
                </template>
            </em-tabnav>
        </div>
        <div class="em-main__content__page">
            <router-view v-slot="{ Component }" v-if="routerActived">
                <transition name="fade-transform" mode="out-in">
                    <keep-alive :include="keepAlivePage">
                        <component :is="Component" />
                    </keep-alive>
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script setup>
import { ref, provide, nextTick } from 'vue';
import { useSidebarStore, useTabsStore } from '@store'
import { storeToRefs } from 'pinia'

// 路由激活
const routerActived = ref(true)
const _sidebarStore = useSidebarStore()
const _tabsStore = useTabsStore()

const { keepAlivePage } = storeToRefs(_tabsStore)
const { collapse } = storeToRefs(_sidebarStore)

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
@import '../../index';
</style>
