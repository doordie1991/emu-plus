<template>
    <div>
        <teleport to="body" :disabled="!appendToBody">
            <div ref="drawerRef" :class="_class">
                <transition name="fade">
                    <div class="em-drawer__modal" @click="onModalClick" v-if="modal" v-show="modelValue"></div>
                </transition>
                <transition :name="`move-${placement}`">
                    <div ref="dialogRef" class="em-drawer__dialog" :style="{ width: _width }" v-show="modelValue" v-loading="loading">
                        <!--头部-->
                        <header v-if="header" class="em-drawer__header">
                            <slot name="header">
                                <div v-if="icon" class="em-drawer__header-icon">
                                    <em-icon v-if="icon" :name="icon" />
                                </div>
                                <!--标题-->
                                <div class="em-drawer__header-title">{{ title }}</div>
                                <!--工具栏-->
                                <div class="em-drawer__header-toolbar">
                                    <!--工具栏插槽-->
                                    <slot name="toolbar" />
                                    <!--全屏按钮-->
                                    <em-button v-if="fullscreen" :icon="_fullscreen ? 'fullscreen-exit' : 'fullscreen'" @click="triggerFullscreen" />
                                    <!--关闭按钮-->
                                    <em-button icon="close" @click="close" />
                                </div>
                            </slot>
                        </header>

                        <!--内容-->
                        <div class="em-drawer__content">
                            <div class="em-drawer__content-wrapper">
                                <em-scrollbar v-if="!noScrollbar" ref="scrollbar" :horizontal="horizontal">
                                    <slot />
                                </em-scrollbar>
                                <slot v-else />
                            </div>
                        </div>

                        <footer v-if="footer" class="em-drawer__footer">
                            <slot name="footer"></slot>
                        </footer>

                        <!--拖拽按钮-->
                        <div v-if="draggable" class="em-drawer__drag" :class="{ 'em-drawer__drag-left': placement === 'left' }" @mousedown="onTriggerMousedown">
                            <slot name="trigger">
                                <Trigger />
                            </slot>
                        </div>
                    </div>
                </transition>
            </div>
        </teleport>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, nextTick, onUnmounted, watch } from 'vue'
import { oneOf } from '../../../utils/assist'
import { on, off } from '../../../utils/dom'
import { useFullscreen } from '../../../hooks'
import Trigger from './trigger.vue'

const props = defineProps({
    // 是否显示
    modelValue: Boolean,
    // 是否显示头部
    header: Boolean,
    // 是否显示底部
    footer: Boolean,
    // 标题
    title: String,
    // 图标
    icon: String,
    // 位置
    placement: {
        type: String,
        default: 'right',
        validator(value) {
            return oneOf(value, ['left', 'right'])
        }
    },
    // 宽度
    width: {
        type: String,
        default: '30%'
    },
    // 是否显示水平滚动条
    horizontal: Boolean,
    // 加载动画
    loading: Boolean,
    // 是否附加到Body
    appendToBody: Boolean,
    // 是否显示模态框
    modal: {
        type: Boolean,
        default: true
    },
    // 是否点击模态框关闭抽屉
    modalClickClose: {
        type: Boolean,
        default: true
    },
    // 自定义class
    customClass: String,
    // 是否显示全屏按钮
    fullscreen: {
        type: Boolean,
        default: true
    },
    // 可拖拽
    draggable: {
        type: Boolean,
        default: true
    },
    // 不显示滚动条
    noScrollbar: Boolean
})

const emit = defineEmits(['update:modelValue', 'fullscreen-change', 'open', 'opened', 'close', 'closed'])

const MIN_WIDTH = 226
const dialogRef = ref()
const _width = ref(props.width)

const { triggerFullscreen, _fullscreen } = useFullscreen(emit)

const _class = computed(() => {
    let classArr = ['em-drawer', props.placement, props.customClass]
    _fullscreen.value && classArr.push('fullscreen')
    props.draggable && classArr.push('draggable')
    return classArr
})

/**
 * 关闭
 */
const close = () => {
    emit('update:modelValue', false)
}

/**
 * 点击模态窗口
 */
const onModalClick = () => {
    if (props.modal && props.modalClickClose) {
        close()
    }
}

/**
 * 拖拽按钮鼠标按下事件
 */
const onTriggerMousedown = () => {
    if (!props.draggable) return
    // 防止鼠标选中抽屉中文字，造成拖动trigger触发浏览器原生拖动行为
    window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection().empty()
    on(document, 'mousemove', onMousemove)
    on(document, 'mouseup', onMouseup)
}

/**
 * 鼠标移动事件
 * @param {*} event
 */
const onMousemove = (event: any) => {
    if (!props.draggable) return

    const max = document.body.offsetWidth
    const w = props.placement === 'left' ? event.pageX - 20 : max - event.pageX - 20
    if (w < MIN_WIDTH || w >= max - 20) {
        return
    }

    _width.value = w + 'px'
}

/**
 * 松开鼠标按钮事件
 */
const onMouseup = () => {
    if (!props.draggable) return
    off(document, 'mousemove', onMousemove)
    off(document, 'mouseup', onMouseup)
}

/**
 * 组件实例卸载后调用
 */
onUnmounted(() => {
    off(document, 'mousemove', onMousemove)
    off(document, 'mouseup', onMouseup)
})

watch(
    () => props.modelValue,
    (val) => {
        if (val) {
            emit('open')

            nextTick(() => {
                emit('opened')
            })
        } else {
            emit('close')

            nextTick(() => {
                emit('closed')
            })
        }
    }
)
</script>

<style scoped lang="scss">
@import './index';
</style>
