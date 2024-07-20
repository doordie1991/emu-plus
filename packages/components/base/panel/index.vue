<template>
    <div :class="_class" :style="_style" v-loading="loading">
        <!--头部-->
        <header v-if="header" class="em-panel__header">
            <slot name="header">
                <div v-if="icon" class="header-icon">
                    <em-icon v-if="icon" :name="icon" size="18px" :color="iconColor" />
                </div>
                <!--标题-->
                <div class="header-title">
                    <slot name="title">{{ title }}</slot>
                </div>

                <!--工具栏-->
                <div class="header-toolbar">
                    <!--工具栏插槽-->
                    <slot name="toolbar" />
                    <!--全屏按钮-->
                    <em-button v-if="fullscreen" :icon="layout.fullscreen ? 'fullscreen-exit' : 'fullscreen'" @click="onFullscreen" />
                    <!--刷新按钮-->
                    <em-button v-if="refresh" icon="reload" @click="onRefresh" />
                    <!--折叠按钮-->
                    <em-button v-if="collapse" :icon="layout.collapse ? 'down-circle' : 'up-circle'" @click="onCollapse" />
                </div>
            </slot>
        </header>
        <!--内容-->
        <el-collapse-transition>
            <div class="em-panel__body" v-show="!layout.collapse">
                <div class="em-panel__body__content">
                    <em-scrollbar v-if="hasScrollbar" ref="scrollbar" :horizontal="horizontal">
                        <slot />
                    </em-scrollbar>
                    <slot v-else />
                </div>

                <footer v-if="footer" :class="['em-panel__body__footer', footerAlign]">
                    <slot name="footer"></slot>
                </footer>
            </div>
        </el-collapse-transition>
    </div>
</template>
<script lang="ts" setup>
import { reactive, computed, watchEffect } from 'vue'
const props = defineProps({
    // 标题
    title: String,
    // 图标
    icon: String,
    // 图标颜色
    iconColor: String,
    // 是否显示头部
    header: Boolean,
    // 是否显示底部
    footer: Boolean,
    // 底部对齐方式(left/center/right)
    footerAlign: {
        type: String,
        default: 'right'
    },
    // 是否页模式
    page: Boolean,
    // 宽度
    width: String,
    // 高度
    height: String,
    // 没有内边距
    noPadding: Boolean,
    // 没有边框
    noBorder: Boolean,
    // 标题是否加粗
    titleBold: Boolean,
    // 不显示滚动条
    noScrollbar: Boolean,
    // 是否显示水平滚动条
    horizontal: Boolean,
    // 加载动画显示
    loading: Boolean,
    // 是否显示全屏按钮
    fullscreen: Boolean,
    // 是否显示折叠按钮
    collapse: {
        type: Boolean,
        default: true
    },
    // 是否显示刷新按钮
    refresh: Boolean
})

const emit = defineEmits(['fullscreen-change', 'fullscreen-change', 'collapse-change', 'refresh'])

const layout = reactive({
    height: '',
    with: '',
    page: false,
    noPadding: false,
    noBorder: false,
    collapse: false,
    fullscreen: false
}) as any

const _class = computed(() => {
    let classArr = ['em-panel']
    layout.page && classArr.push('page')
    layout.fullscreen && classArr.push('fullscreen')
    layout.noPadding && classArr.push('no-padding')
    !layout.noBorder && classArr.push('border')

    return classArr
})

const _style = computed(() => {
    let style = {} as any
    if (layout.width) style.width = layout.width
    if (layout.height) style.height = layout.height
    return style
})

const hasScrollbar = computed(() => {
    return !props.noScrollbar && (props.height || props.page)
})

watchEffect(() => {
    layout.height = props.height
    layout.width = props.width
    layout.page = props.page
    layout.noPadding = props.noPadding
    layout.noBorder = props.noBorder
})

/**
 * 折叠事件
 */
const onCollapse = () => {
    layout.collapse = !layout.collapse
    layout.height = !layout.collapse ? props.height : ''
    emit('collapse-change', layout.collapse)
}

/**
 * 全屏事件
 */
const onFullscreen = () => {
    layout.fullscreen ? closeFullscreen() : openFullscreen()
}

/**
 * 开启全屏
 */
const openFullscreen = () => {
    layout.fullscreen = true
    emit('fullscreen-change', layout.fullscreen)
}

/**
 * 关闭全屏
 */
const closeFullscreen = () => {
    layout.fullscreen = false
    emit('fullscreen-change', layout.fullscreen)
}

/**
 * 刷新事件
 */
const onRefresh = () => {
    emit('refresh')
}
</script>

<style scoped lang="scss">
@import './index';
</style>
