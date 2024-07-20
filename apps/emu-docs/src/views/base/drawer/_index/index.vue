<template>
    <EmDocs v-bind="model"></EmDocs>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { EmDocs } from '@/components'

import attrs from './data/attrs'
import events from './data/events'
import slots from './data/slots'

const model = reactive({
    title: '抽屉(em-drawer)',
    icon: 'detail',
    attrs,
    events,
    slots
})
</script>
