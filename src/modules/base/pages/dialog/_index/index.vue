<template>
    <em-docs v-bind="model"></em-docs>
</template>

<script setup>
import { reactive } from 'vue'
import page from './page.js'
import attrs from './data/attrs.js'
import events from './data/events.js'
import slots from './data/slots'
import methods from './data/methods'

const model = reactive({
    title: '对话框(em-dialog)',
    icon: 'detail',
    attrs,
    events,
    slots,
    methods
})
</script>
