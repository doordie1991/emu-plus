<template>
    <el-table :data="data" border style="width: 100%">
        <el-table-column prop="name" label="参数" />
        <el-table-column prop="desc" label="说明" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="opt" label="可选值" />
        <el-table-column label="默认值">
            <template #default="{ row }">{{ row.def }}</template>
        </el-table-column>
    </el-table>
</template>
<script lang="ts" setup>
defineProps({
    data: Array
})
</script>
