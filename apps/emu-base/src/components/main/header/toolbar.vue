<template>
    <div class="em-main__header__toolbar">
        <div class="em-main__header__toolbar__search"></div>
        <div class="em-main__header__toolbar__item" @click="releaselogShow = true">
            <em-icon class="main__header__toolbar__item-icon" name="info-circle" />
        </div>

        <div class="em-main__header__toolbar__item" @click="onSkinToggle">
            <em-icon class="em-main__header__toolbar__item-icon" name="skin" />
        </div>

        <el-dropdown trigger="click">
            <div class="em-main__header__toolbar__item">
                <em-icon class="em-main__header__toolbar__item-icon" name="user" />
            </div>

            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    <em-button text icon="user" @click="userDialogShow = true">个人信息</em-button>
                </el-dropdown-item>
                <el-dropdown-item>
                    <em-button text icon="lock" @click="passwordDialogShow = true">修改密码</em-button>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <div class="em-main__header__toolbar__item" @click="_fullscreenStore.toggle">
            <em-icon class="em-main__header__toolbar__item-icon" :name="fullscreenIcon" />
        </div>

        <div class="em-main__header__toolbar__item" @click="onLogout">
            <em-icon class="em-main__header__toolbar__item-icon" name="logout" />
        </div>

        <!--系统信息-->
        <!-- <em-release-log :visible.sync="releaselogShow"></em-release-log> -->
        <!--切换主题-->
        <!-- <em-skin-toggle :visible.sync="skinDialogShow"></em-skin-toggle> -->
        <!--用户信息-->
        <!-- <em-user-info :visible.sync="userDialogShow"></em-user-info> -->
        <!--修改密码-->
        <!-- <em-password-update :visible.sync="passwordDialogShow"></em-password-update> -->
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useFullscreenStore } from '@/store'
import { useMessage } from 'emu-plus/hooks'
import { router } from '@/router'

const _fullscreenStore = useFullscreenStore()
const _message = useMessage()

// 皮肤窗口
const skinDialogShow = ref(false)
// 用户窗口
const userDialogShow = ref(false)
// 修改密码窗口
const passwordDialogShow = ref(false)
// 发布记录窗口
const releaselogShow = ref(false)

const fullscreenActive = computed(() => {
    return _fullscreenStore.active
})

const fullscreenIcon = computed(() => {
    return fullscreenActive ? 'fullscreen-exit' : 'fullscreen'
})

/**
 * 切换主题
 */
const onSkinToggle = () => {
    skinDialogShow.value = true
}

/**
 * 退出登录
 */
const onLogout = () => {
    _message.confirm('您确认要退出登录吗').then(() => {
        //TODO 退出登录后清空登录用户数据
        // this.logout()
        //TODO  跳转到登录页面
        router.push({
            name: 'login',
            query: {
                redirect: router.currentRoute.value.fullPath
            }
        })
    })
}
</script>

<style scoped lang="scss">
@import '../index';
</style>
