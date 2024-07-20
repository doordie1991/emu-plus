<template>
    <el-row>
        <em-button @click="drawer1 = true">简单抽屉</em-button>
        <em-button @click="drawer2 = true">左侧抽屉</em-button>
        <em-button @click="drawer3 = true">在附加到body</em-button>
        <em-button @click="drawer4 = true">可拖拽</em-button>
    </el-row>

    <em-drawer header title="简单抽屉" icon="app" v-model="drawer1">简单抽屉</em-drawer>
    <em-drawer header title="左侧抽屉" placement="left" v-model="drawer2"></em-drawer>
    <em-drawer header title="在附加到body" append-to-body v-model="drawer3"></em-drawer>
    <em-drawer header title="可拖拽" draggable v-model="drawer4"></em-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const drawer1 = ref(false)
const drawer2 = ref(false)
const drawer3 = ref(false)
const drawer4 = ref(false)
</script>
