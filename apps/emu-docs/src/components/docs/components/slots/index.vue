<template>
    <el-table :data="data" border style="width: 100%">
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="desc" label="说明" />
    </el-table>
</template>
<script lang="ts" setup>
defineProps({
    data: Array
})
</script>
