<template>
    <el-scrollbar ref="barRef" :class="['em-scrollbar', horizontal ? 'is-horizontal' : '']">
        <slot />
    </el-scrollbar>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

defineProps({
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

defineExpose({
    update
})
</script>

<style lang="scss">
@import './index';
</style>
