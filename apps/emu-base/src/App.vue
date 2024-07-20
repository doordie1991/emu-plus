<template>
    <el-config-provider :locale="locale" size="large">
        <template v-if="inFrame">
            <EmMain />
        </template>
        <template v-else>
            <router-view />
        </template>
    </el-config-provider>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { EmMain } from '@/components'

const i18n = useI18n()
const route = useRoute()
const inFrame = computed(() => {
    return !route.meta || route.meta.frameIn !== false
})

const locale = computed(() => {
    const l = i18n.locale.value
    return i18n.messages.value[l].element
})
</script>

<style scoped lang="scss"></style>
