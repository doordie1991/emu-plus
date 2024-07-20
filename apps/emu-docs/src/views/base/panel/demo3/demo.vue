<template>
    <em-panel v-bind="model">
        <el-alert title="全屏按钮" type="success" description="通过 fullscreen 属性可以开启全屏功能" show-icon :closable="false"></el-alert>
        <el-alert title="折叠按钮" type="success" description="通过 collapse 属性可以开启折叠功能" show-icon :closable="false"></el-alert>
        <el-alert title="自定义工具栏" type="warning" description="通过 toolbar 插槽可以实现自定义工具栏" show-icon :closable="false"></el-alert>

        <template #toolbar>
            <em-button icon="appstoreadd" @click="onClick" />
        </template>
    </em-panel>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { useMessage } from 'emu-plus/hooks'
const _message = useMessage()
const model = reactive({
    header: true,
    title: '工具栏示例',
    icon: 'app',
    fullscreen: true,
    collapse: true,
    refresh: true
})

const onClick = () => {
    _message.success('我是自定义工具栏按钮')
}
</script>
