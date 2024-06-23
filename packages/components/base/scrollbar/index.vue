<template>
    <el-scrollbar ref="barRef" :class="['em-scrollbar', horizontal ? 'is-horizontal' : '']">
        <slot />
    </el-scrollbar>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
    // 是否显示水平滚动条
    horizontal: Boolean
})

const barRef = ref(null)

/**
 * 重绘滚动条
 */
const update = () => {
    barRef.value.update()
}
</script>

<style lang="scss">
@import './index';
</style>
