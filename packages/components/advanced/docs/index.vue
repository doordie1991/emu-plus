<template>
    <em-panel class="em-docs" page header :title="title" :icon="icon">
        <slot />
        <el-tabs v-model="activeName" type="card" tab-position="left">
            <el-tab-pane label="属性(Attributes)" name="attrs">
                <attributes v-if="attrs" :data="attrs" />
            </el-tab-pane>
            <el-tab-pane label="事件(Event)" name="events">
                <events v-if="events" :data="events" />
            </el-tab-pane>
            <el-tab-pane label="方法(Method)" name="methods">
                <methods v-if="methods" :data="methods" />
            </el-tab-pane>
            <el-tab-pane label="插槽(Slot)" name="slots">
                <slots v-if="slots" :data="slots" />
            </el-tab-pane>
        </el-tabs>
    </em-panel>
</template>

<script setup>
import { ref } from 'vue'
import Attributes from './components/attributes'
import Methods from './components/methods'
import Events from './components/events'
import Slots from './components/slots'

const props = defineProps({
    title: String,
    icon: String,
    attrs: Array,
    slots: Array,
    methods: Array,
    events: Array
})

const activeName = ref('attrs')
</script>

<style lang="scss" scoped>
.em-docs {
    :deep(.el-tabs__item) {
        &.is-active {
            @include theme-color('background', $cmp-active-bg);
            @include theme-color('color', $cmp-active-color);
        }


        &:hover {
            @include theme-color('color', $cmp-active-color);
        }
    }
}
</style>
