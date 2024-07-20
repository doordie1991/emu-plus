<template>
    <em-panel>
        <Demo />
        <CodePreview :code="htmlStr" />
    </em-panel>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { CodePreview } from '@/components'
import Demo from './demo.vue'
import code from './demo?raw'

const htmlStr = ref(code)
</script>
