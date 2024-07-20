<template>
    <svg class="em-icon" :class="customClass" aria-hidden="true" :style="_style">
        <use :xlink:href="`#icon-${name}`" />
    </svg>
</template>

<script lang="ts" setup>
 //@ts-ignore
import './iconfont' 
import { computed } from 'vue'


const props = defineProps({
    // 图标名称
    name: String,
    // 图标大小
    size: String,
    // 图标颜色
    color: String,
    // 图标自定义类名
    customClass: String
})

const _style = computed(() => {
    const style = {} as any
    if (props.size) style.fontSize = props.size
    if (props.color) style.color = props.color
    return style
})
</script>

<style scoped lang="scss">
@import './index';
</style>
