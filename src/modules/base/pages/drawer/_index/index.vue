<template>
    <em-docs v-bind="model"></em-docs>
</template>

<script setup>
import { reactive } from 'vue'
import page from './page.js'
import attrs from './data/attrs.js'
import events from './data/events.js'
import slots from './data/slots'

const model = reactive({
    title: '抽屉(em-drawer)',
    icon: 'detail',
    attrs,
    events,
    slots
})
</script>
