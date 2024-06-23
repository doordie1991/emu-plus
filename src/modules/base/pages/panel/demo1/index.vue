<template>
    <em-panel>
        <demo />
        <!-- <em-code-preview :code="code" /> -->
    </em-panel>
</template>
<script setup>
import { ref } from 'vue'
import page from './page'
import demo from './demo'
import code from './demo?row'

const htmlStr = ref(code)
</script>
