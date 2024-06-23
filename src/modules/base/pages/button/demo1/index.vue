<template>
    <em-panel v-bind="model">
        <demo />
        <em-code-preview :code="htmlStr" />
    </em-panel>
</template>

<script setup>
import { ref, reactive } from 'vue'
import page from './page'
import demo from './demo'
import code from './demo?raw'
const model = reactive({
    title: '按钮-基础用法',
    page: true,
    header: true,
    icon: 'detail'
})

const htmlStr = ref(code)
</script>
