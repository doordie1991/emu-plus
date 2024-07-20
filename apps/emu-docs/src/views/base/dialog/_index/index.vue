<template>
    <EmDocs v-bind="model"></EmDocs>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { EmDocs } from '@/components'

import attrs from './data/attrs'
import events from './data/events'
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
