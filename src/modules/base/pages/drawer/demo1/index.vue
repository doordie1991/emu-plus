<template>
    <em-panel v-bind="model">
        <demo />
        <!-- <em-code-preview :code="code" /> -->
    </em-panel>
</template>
<script setup>
import { ref, reactive } from 'vue'
import page from './page'
import demo from './demo'
import code from './demo?row'

const model = reactive({
    title: '抽屉-基础用法',
    page: true,
    header: true,
    icon: 'detail'
})

const htmlStr = ref(code)
</script>
