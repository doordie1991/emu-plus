<template>
    <el-config-provider :locale="locale" size="large">
        <template v-if="inFrame">
            <em-main />
        </template>
        <template v-else>
            <router-view />
        </template>
    </el-config-provider>
</template>

<script setup>
import { ref, computed, nextTick, provide } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import emMain from '@advanced/main'

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
