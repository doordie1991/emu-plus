<template>
    <div class="em-main">
        <MainHeader />
        <div class="em-main__body">
            <MainSidebar />
            <MainContent />
        </div>
    </div>
</template>

<script lang="ts" setup>
import MainHeader from './header/index.vue'
import MainSidebar from './sidebar/index.vue'
import MainContent from './content/index.vue'
</script>

<style scoped lang="scss">
@import './index';
</style>
