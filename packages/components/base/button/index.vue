<template>
    <el-button v-if="$slots.default" v-bind="$attrs" @click="onClick">
        <template v-if="icon" #icon>
            <em-icon :name="icon" />
        </template>
        <slot />
    </el-button>

    <el-button v-else v-bind="$attrs" @click="onClick">
        <template v-if="icon" #icon>
            <em-icon :name="icon" />
        </template>
    </el-button>
</template>
<script setup>
defineOptions({
    name: "em-button",
    inheritAttrs: false
})

const emit = defineEmits(['click'])
const props = defineProps({
    // 图标
    icon: String,
})

const onClick = () => {
    emit('click')
}

</script>

<style scoped lang="scss">
@import './index';
</style>
