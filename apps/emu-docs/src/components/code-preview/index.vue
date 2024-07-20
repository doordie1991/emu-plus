<template>
    <div class="em-code-preview" :class="{ show: visible }">
        <em-button class="em-code-preview__btn" type="danger" icon="code" @click="visible = !visible" />
        <em-drawer class="em-code-preview__drawer" v-bind="drawer" v-model="visible">
            <pre><code ref="codeRef" class="html hljs xml" v-text="code"></code></pre>
        </em-drawer>
    </div>
</template>
<script lang="ts" setup>
import hljs from 'highlight.js'
import 'highlight.js/styles/color-brewer.css'

import { ref, reactive, onMounted } from 'vue'
defineProps({
    code: String
})

const codeRef = ref()
const visible = ref(false)
const drawer = reactive({
    header: true,
    title: '代码预览',
    icon: 'code',
    width: '50%',
    draggable: true,
    horizontal: true,
    appendToBody: true,
    padding: 0
})

onMounted(() => {
    hljs.highlightElement(codeRef.value)
})
</script>

<style scoped lang="scss">
@import './index';
</style>
