<template>
    <EmDocs v-bind="model"> </EmDocs>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { EmDocs } from '@/components'

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
