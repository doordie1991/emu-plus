<template>
    <div ref="rowRef" class="em-panel-row" :style="{ height }">
        <slot />
    </div>
</template>
<script lang="ts" setup>
import { computed, provide } from 'vue'

const props = defineProps({
    // 间隔
    gutter: {
        type: Number,
        default: 5
    },
    // 高度
    height: {
        type: String,
        required: false
    }
})

const _gutter = computed(() => {
    return props.gutter / 2 + 'px'
})

provide('gutter', _gutter)
</script>

<style scoped lang="scss">
@import './index';
</style>
