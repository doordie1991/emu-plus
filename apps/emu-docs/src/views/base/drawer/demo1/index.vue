<template>
    <em-panel v-bind="model">
        <Demo />
        <CodePreview :code="htmlStr" />
    </em-panel>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { CodePreview } from '@/components'
import Demo from './demo.vue'
import code from './demo?raw'

const model = reactive({
    title: '抽屉-基础用法',
    page: true,
    header: true,
    icon: 'detail'
})

const htmlStr = ref(code)
</script>
