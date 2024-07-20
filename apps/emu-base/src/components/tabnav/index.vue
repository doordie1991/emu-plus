<template>
    <div class="em-tabnav">
        <slot name="before" />
        <div class="em-tabnav__tabs">
            <el-tabs v-model="currPageUrl" type="card" @tab-click="onTabClick" @tab-remove="onTabRemove">
                <el-tab-pane v-for="item in openedPages" :key="item.path" :name="item.path" :closable="item.closable">
                    <template #label>
                        <em-icon :name="item.icon" @contextmenu.prevent="showContextMenu" />
                        <label class="item-txt" @contextmenu.prevent="showContextMenu"> {{ item.tabName }}</label>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!--控制页签(最右侧)-->
        <div class="em-tabnav__control">
            <el-dropdown @command="handleCommand">
                <span class="dropdown-btn">
                    <em-icon name="down-square" />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="Left"> <em-icon name="doubleleft" class="dropdown-icon" />关闭左侧 </el-dropdown-item>
                        <el-dropdown-item command="Right"> <em-icon name="doubleright" class="dropdown-icon" />关闭右侧 </el-dropdown-item>
                        <el-dropdown-item command="Other"> <em-icon name="disconnect" class="dropdown-icon" />关闭其他 </el-dropdown-item>
                        <el-dropdown-item command="All"> <em-icon name="app" class="dropdown-icon" />全部关闭 </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

        <!--控制页签(鼠标右键)-->
        <div ref="contextmenuRef" class="em-tabnav__contextmenu" v-show="contextmenu.visible" :style="{ top: contextmenu.top, left: contextmenu.left }">
            <ul>
                <li @click.stop="onRefresh"><em-icon name="reload" />重新载入</li>
                <li @click.stop="onClose('')"><em-icon name="close" />关闭</li>
                <li @click.stop="onClose('Left')"><em-icon name="doubleleft" />关闭左侧</li>
                <li @click.stop="onClose('Right')"><em-icon name="doubleright" />关闭右侧</li>
                <li @click.stop="onClose('Other')"><em-icon name="disconnect" />关闭其它</li>
                <li @click.stop="onClose('All')"><em-icon name="app" />关闭全部</li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, watch, inject } from 'vue'
import { on, off } from 'emu-plus/utils/dom'
import { useTabsStore } from '@/store'
import { TabItem } from '@/types'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const reload = inject('reload') as any
const _tabStore = useTabsStore()
const router = useRouter()
const { openedPages, currPage, currPageUrl } = storeToRefs(_tabStore)

const contextmenuRef = ref()
const contextmenu = ref({
    visible: false,
    top: 0,
    left: 0
})

const closeTabIndex = ref(null)

/**
 * 显示页签控制栏
 * @param {Object} event
 */
const showContextMenu = (event: any) => {
    contextmenu.value = {
        visible: true,
        top: event.y,
        left: event.x
    }

    const tabData = event.target.parentNode.getAttribute('id')
    if (!tabData) return
    const path = tabData.split('-')[1]
    const tabIndex = openedPages.value.findIndex((m: any) => m.path === path)
    closeTabIndex.value = tabIndex
}

/**
 * 隐藏页签控制栏
 * @param {Object} event
 */
const hideContextMenu = (event: any) => {
    const { target } = event || window.event
    if (contextmenuRef !== target) contextmenu.value.visible = false
}

/**
 * 处理关闭标签下拉菜单命令
 * @param {String} cmd 命令
 * @param {String} tagName 选择的标签名称
 */
const handleCommand = (cmd: string) => {
    closeTabIndex.value = openedPages.value.findIndex((m: any) => m.path === currPage.value.path)
    onClose(cmd)
}

/**
 * 点击页签
 * @param {Object} tab
 */
const onTabClick = (tab: any) => {
    if (currPage.value.path === tab.paneName) return
    const page = openedPages.value.find((page: TabItem) => page.path === tab.paneName)
    const { name, params, query } = page
    router.push({ name, params, query } as any)
}

/**
 * 移除页签
 * @param {String} path
 */
const onTabRemove = (path: string) => {
    closeTabIndex.value = openedPages.value.findIndex((m: TabItem) => m.path === path)
    onClose()
}

/**
 * 关闭页签
 * @param {String} type
 */
const onClose = (type: string = '') => {
    _tabStore[`close${type}`](closeTabIndex.value)
}

/**
 * 重新载入
 */
const onRefresh = () => {
    reload()
}

watch(
    () => contextmenu.value.visible,
    (newVal) => {
        newVal ? on(document, 'mouseup', hideContextMenu) : off(document, 'mouseup', hideContextMenu)
    }
)
</script>

<style scoped lang="scss">
@import './index';
</style>
