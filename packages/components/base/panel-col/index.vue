<template>
    <div :class="_class" :style="_style">
        <slot />
    </div>
</template>
<script lang="ts" setup>
import { computed, inject } from 'vue'
const props = defineProps({
    // 栅格占据的列数
    span: {
        type: Number,
        default: 24
    },
    // 栅格左侧的间隔格数
    offset: {
        type: Number,
        default: 0
    },
    // 栅格向右移动格数
    push: {
        type: Number,
        default: 0
    },
    // 栅格向左移动格数
    pull: {
        type: Number,
        default: 0
    }
})

const _class = computed(() => {
    let classAtrr = ['em-panel-col']
    props.span && classAtrr.push(`em-panel-col-${props.span}`)
    props.offset && classAtrr.push(`em-panel-col-offset-${props.offset}`)
    props.push && classAtrr.push(`em-panel-col-push-${props.push}`)
    props.pull && classAtrr.push(`em-panel-col-pull-${props.pull}`)

    return classAtrr
})

const _style = computed(() => {
    const parentGutter = inject('gutter')
    return {
        paddingLeft: parentGutter,
        paddingRight: parentGutter
    } as any
})
</script>
