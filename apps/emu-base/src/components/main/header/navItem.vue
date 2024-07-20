<template>
    <div :class="['nav-item', active ? 'active' : '']" @click="onClick">
        <div class="nav-item__icon"><em-icon :name="model.icon" :style="{ color: model.iconColor }" /></div>
        <div class="nav-item__text">{{ model.name }}</div>
    </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['click'])
const props = defineProps({
    model: Object,
    active: Boolean
})

const onClick = () => {
    emit('click', props.model)
}
</script>

<style scoped lang="scss">
@import '../index';
</style>
