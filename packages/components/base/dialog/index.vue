<template>
    <el-dialog ref="dialogRef" class="em-dialog" :modal="modal" :close-on-click-modal="closeOnClickModal"
        :fullscreen="_fullscreen" v-model="visible" :show-close="false" :draggable="draggable" append-to-body @open="onOpen"
        @opened="onOpened" @close="onClose" @closed="onClosed">
        <!--头部-->
        <template #header v-if="header">
            <div class="em-dialog__header">
                <div v-if="icon" class="title-icon">
                    <em-icon :name="icon" :style="{ color: iconColor || '' }" />
                </div>
                <div class="title-txt">
                    <slot name="title">{{ title }}</slot>
                </div>
                <div class="toolbar">
                    <!--工具栏插槽-->
                    <slot name="toolbar" />
                    <!--全屏按钮-->
                    <em-button v-if="fullscreen" :icon="_fullscreen ? 'fullscreen-exit' : 'fullscreen'"
                        @click="triggerFullscreen" />
                    <!--关闭按钮-->
                    <em-button v-if="showClose" icon="close" @click="hide" />
                </div>
            </div>
        </template>

        <!--内容-->
        <div ref="contentRef" class="em-dialog__content">
            <slot v-if="noScrollbar" />
            <em-scrollbar v-else ref="scrollbar" class="content-scrollbar" :horizontal="horizontal">
                <slot />
            </em-scrollbar>
        </div>

        <!--底部-->
        <div v-if="footer" class="em-dialog__footer">
            <slot name="footer-left" />
            <div class="em-dialog__footer-right">
                <slot name="footer" />
                <!--底部关闭按钮-->
                <em-button type="info" v-if="footerCloseButton" text="关闭" @click="hide" />
            </div>
        </div>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useVisible, useFullscreen } from '../../../hooks'

const props = defineProps({
    // 是否显示
    modelValue: Boolean,
    // 显示头部
    header: {
        type: Boolean,
        default: true
    },
    // 标题
    title: String,
    // 图标
    icon: String,
    // 图标颜色
    iconColor: String,
    // 的宽度（默认50%）
    width: {
        type: [Number, String],
        default: '50%'
    },
    // 的高度
    height: [Number, String],
    // 显示底部
    footer: Boolean,
    // 是否需要遮罩层
    modal: {
        type: Boolean,
        default: true
    },
    // 是否可以通过点击 modal 关闭 Dialog
    closeOnClickModal: {
        type: Boolean,
        default: true
    },
    // 是否显示关闭按钮
    showClose: {
        type: Boolean,
        default: true
    },
    // 关闭前的回调，会暂停 Dialog 的关闭
    beforeClose: Function,
    // 是否显示全屏按钮
    fullscreen: Boolean,
    // 显示加载动画
    loading: Boolean,
    // 可拖拽的
    draggable: {
        type: Boolean,
        default: true
    },
    //是否可拖出页面
    dragOutPage: Boolean,
    //拖拽出页面后保留的最小宽度
    dragMinWidth: {
        type: Number,
        default: 100
    },
    // 是否显示底部关闭按钮
    footerCloseButton: Boolean,
    // 不显示滚动条
    noScrollbar: Boolean,
    // 是否显示水平滚动条
    horizontal: Boolean
})

const emit = defineEmits(['update:modelValue', 'fullscreen-change', 'open', 'opened', 'close', 'closed'])

const dialogRef = ref()
const contentRef = ref()

const { visible, hide } = useVisible(props, emit)
const { triggerFullscreen, _fullscreen } = useFullscreen(emit)

const _heightValue = computed(() => {
    return typeof props.height === 'number' ? props.height : parseFloat(props.height.replace('px', ''))
})

/**
 * Dialog 打开的回调
 */
const onOpen = () => emit('open')

/**
 * Dialog 打开动画结束时的回调
 */
const onOpened = () => {
    resize()
    emit('opened')
}

/**
 * Dialog 关闭的回调
 */
const onClose = () => emit('close')

/**
 * Dialog 关闭动画结束时的回调
 */
const onClosed = () => emit('closed')

/**
 * 重绘窗口大小
 */
const resize = () => {
    if (props.height) {
        contentRef.value.style.height = _heightValue.value + 'px'
    }
}
</script>

<style lang="scss">
@import './index';
</style>
