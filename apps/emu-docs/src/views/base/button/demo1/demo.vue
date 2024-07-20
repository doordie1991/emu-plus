<template>
    <el-row>
        <div class="test"></div>
        <em-button>默认按钮</em-button>
        <em-button type="primary">主要按钮</em-button>
        <em-button type="success">成功按钮</em-button>
        <em-button type="info">信息按钮</em-button>
        <em-button type="warning">警告按钮</em-button>
        <em-button type="danger">危险按钮</em-button>
    </el-row>

    <el-row>
        <em-button plain>朴素按钮</em-button>
        <em-button type="primary" plain>主要按钮</em-button>
        <em-button type="success" plain>成功按钮</em-button>
        <em-button type="info" plain>信息按钮</em-button>
        <em-button type="warning" plain>警告按钮</em-button>
        <em-button type="danger" plain>危险按钮</em-button>
    </el-row>

    <el-row>
        <em-button round>圆角按钮</em-button>
        <em-button type="primary" round>主要按钮</em-button>
        <em-button type="success" round>成功按钮</em-button>
        <em-button type="info" round>信息按钮</em-button>
        <em-button type="warning" round>警告按钮</em-button>
        <em-button type="danger" round>危险按钮</em-button>
    </el-row>

    <el-row>
        <em-button icon="search" circle></em-button>
        <em-button type="primary" icon="edit" circle></em-button>
        <em-button type="success" icon="select" circle></em-button>
        <em-button type="info" icon="permission" circle></em-button>
        <em-button type="warning" icon="reload" circle></em-button>
        <em-button type="danger" icon="delete" circle></em-button>
    </el-row>

    <el-row>
        <em-button mode="text" type="primary">文字按钮</em-button>
        <em-button mode="text" disabled>文字按钮</em-button>
    </el-row>

    <el-row>
        <em-button mode="link" type="danger">链接按钮</em-button>
        <em-button mode="link" disabled>链接按钮</em-button>
    </el-row>

    <el-row>
        <em-button type="primary" icon="edit"></em-button>
        <em-button type="primary" icon="search">搜索</em-button>
        <em-button type="primary" icon="reload" icon-position="right">刷新</em-button>
    </el-row>

    <el-row>
        <el-button-group>
            <em-button type="primary" icon="arrowleft">上一页</em-button>
            <em-button type="primary">
                下一页
                <em-icon name="arrowright"></em-icon>
            </em-button>
        </el-button-group>
        <el-button-group>
            <em-button type="primary" icon="edit"></em-button>
            <em-button type="primary" icon="explorer"></em-button>
            <em-button type="primary" icon="delete"></em-button>
        </el-button-group>
    </el-row>

    <el-row>
        <em-button type="primary" :loading="true">加载中</em-button>
    </el-row>

    <el-row>
        <el-alert title="按钮尺寸" type="warning" description="按钮默认尺寸根据系统的字号大小设置" show-icon :closable="false"></el-alert>
        <em-button>默认按钮</em-button>
        <em-button size="small">小型按钮</em-button>
        <em-button size="large">大型按钮</em-button>
    </el-row>
</template>

<script lang="ts" setup></script>

