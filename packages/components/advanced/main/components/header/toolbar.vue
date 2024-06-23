<template>
    <div class="em-main__header__toolbar">
        <div class="em-main__header__toolbar__search">
            <!-- <em-autocomplete v-model="searchMenu" value-key="name" label-keys="name" :action="getMenus" @select="onSelectMenu" placeholder="请输入功能名称....">
        <template v-slot:suffix>
          <i class="el-icon-search el-input__icon"></i>
        </template>
      </em-autocomplete> -->
        </div>
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
                    <em-button type="text" text="个人信息" icon="user" @click="userDialogShow = true" />
                </el-dropdown-item>
                <el-dropdown-item>
                    <em-button type="text" text="修改密码" icon="lock" @click="passwordDialogShow = true" />
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <div class="em-main__header__toolbar__item" @click="toggle">
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

<script setup>
import { ref, computed } from 'vue'
import { useFullscreenStore, useSystemStore, useUserStore } from '@store'
import { openMenu } from '@utils/menu'
import { useMessage } from '@hooks'

const _fullscreenStore = useFullscreenStore()
const _systemStore = useSystemStore()
const _userStore = useUserStore()
const _message = useMessage()

// 搜索的菜单
const searchMenu = ref('')
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

const menus = computed(() => {
    return _userStore.routes
})

/**
 * 切换主题
 */
const onSkinToggle = () => {
    skinDialogShow.value = true
}

/**
 * 获取菜单
 * @param {String} keywords 关键字
 */
const getMenus = (keywords) => {
    return new Promise((resolve) => {
        const data = menus.filter((m) => m.name.indexOf(keywords) >= 0).slice(0, 10)
        resolve(data)
    })
}

/**
 * 选择菜单
 * @param {Object} menu 菜单
 */
const onSelectMenu = (menu) => {
    openMenu(menu)
}

/**
 * 退出登录
 */
const onLogout = () => {
    _message.confirm('您确认要退出登录吗').then(() => {
        //TODO 退出登录后清空登录用户数据
        // this.logout()
        //TODO  跳转到登录页面
        // router.push({
        //   name: 'login',
        //   query: {
        //     redirect: this.$route.fullPath
        //   }
        // })
    })
}
</script>

<style scoped lang="scss">
@import '../../index';
</style>
