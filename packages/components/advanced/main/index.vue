<template>
    <div class="em-main">
        <main-header />
        <div class="em-main__body">
            <main-sidebar />
            <main-content />
        </div>
    </div>
</template>

<script setup>
import mainHeader from './components/header'
import mainContent from './components/content'
import mainSidebar from './components/sidebar'
</script>

<style scoped lang="scss">
@import './index';
</style>
