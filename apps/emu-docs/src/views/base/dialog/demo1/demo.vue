<template>
    <el-row>
        <em-button type="success" @click="dialog.visible = true">简单对话框</em-button>
        <em-button type="primary" @click="dialog1.visible = true">自定义高度</em-button>
        <em-button type="warning" @click="dialog2.visible = true">可全屏</em-button>
        <em-button @click="dialog3.visible = true">点击模态框关闭</em-button>
        <em-button @click="dialog4.visible = true">可拖拽</em-button>
    </el-row>

    <em-dialog v-bind="dialog" v-model="dialog.visible">
        <el-alert title="简单对话框" type="success"></el-alert>
        <el-alert title="简单对话框" type="success"></el-alert>
        <el-alert title="简单对话框" type="success"></el-alert>
        <el-alert title="简单对话框" type="success"></el-alert>
    </em-dialog>

    <em-dialog v-bind="dialog1" v-model="dialog1.visible">
        <el-alert title="通过 height 属性可自定义高度，超出会有滚动条" type="success"></el-alert>
    </em-dialog>

    <em-dialog v-bind="dialog2" v-model="dialog2.visible">
        <el-alert title="通过 fullscreen 属性可启用全屏功能" type="success"></el-alert>
    </em-dialog>

    <em-dialog v-bind="dialog3" v-model="dialog3.visible">
        <el-alert title="通过 closeOnClickModal 属性可启用点击模态框关闭" type="success"></el-alert>
    </em-dialog>

    <em-dialog v-bind="dialog4" v-model="dialog4.visible">
        <el-alert title="通过 draggable 属性可启用拖拽功能" type="success"></el-alert>
    </em-dialog>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'

const dialog = reactive({
    title: '简单对话框',
    icon: 'tags',
    visible: false
})

const dialog1 = reactive({
    title: '自定义高度',
    icon: 'tags',
    height: '500px',
    visible: false
})

const dialog2 = reactive({
    title: '全屏功能',
    icon: 'tags',
    height: '500px',
    fullscreen: true,
    visible: false
})

const dialog3 = reactive({
    title: '点击模态框关闭',
    icon: 'tags',
    height: '500px',
    fullscreen: true,
    closeOnClickModal: true,
    visible: false
})

const dialog4 = reactive({
    title: '可拖拽',
    icon: 'tags',
    height: '500px',
    fullscreen: true,
    draggable: true,
    visible: false
})
</script>
<style></style>
