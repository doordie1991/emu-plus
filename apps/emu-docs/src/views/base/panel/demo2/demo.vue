<template>
    <em-panel header footer title="头尾示例" icon="app" height="300px" collapse>
        <el-alert title="头部设置" description="title、icon属性必须在header属性为true的时候才会生效" type="warning" :closable="false" show-icon></el-alert>
        <el-alert title="底部设置" description="footer插槽必须在footer属性为true的时候才会生效" type="warning" :closable="false" show-icon></el-alert>
        <template v-slot:footer>
            <em-button type="success">确认</em-button>
        </template>
    </em-panel>
</template>
