<template>
    <em-docs v-bind="model"> </em-docs>
</template>
<script setup>
import { reactive } from 'vue'
import page from './page'
import attrs from './data/attrs'
import slots from './data/slots'
import events from './data/events'

const model = reactive({
    title: '按钮(em-button)',
    icon: 'detail',
    attrs: attrs,
    slots,
    events
})
</script>
