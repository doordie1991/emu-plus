<template>
    <div class="login">
        <div class="login__content">
            <div class="system-title">
                <div class="system-logo">
                    <img :src="appConfig.logoUrl" />
                </div>
                <div class="system-name">
                    <div class="system-name-cn">{{ appConfig.name }}</div>
                    <div class="system-name-en">{{ appConfig.code }}</div>
                </div>
            </div>
            <div class="login-img"></div>
            <div class="login-form">
                <div class="login-form__title">欢迎登录</div>
                <el-form ref="formRef" :model="model" :rules="rules">
                    <el-form-item prop="userCode">
                        <el-input v-model="model.userCode" placeholder="用户名">
                            <template v-slot:prefix>
                                <em-icon name="user" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="model.password" autocomplete="off" placeholder="密码">
                            <template v-slot:prefix>
                                <em-icon name="lock" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="btn-login" type="primary" @click="onLogin">登录</el-button>
                    </el-form-item>
                    <div class="login-form__tip">账号:admin 密码:123</div>
                </el-form>
                <div class="login-form__other">
                    <div class="other-item" v-for="(item, index) in otherImgUrls" :key="index">
                        <img :src="item" />
                    </div>
                </div>
            </div>
        </div>
        <div class="login__copyright">{{ appConfig.copyright }}</div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import { useSystemStore } from '@/store'
import { setToken } from 'emu-plus/utils/token'
import { useMessage } from 'emu-plus/hooks'
import { router } from '@/router'
import dom from 'emu-plus/utils/dom'
import api from '@/api'

const message = useMessage()
const _systemStore = useSystemStore()
const appConfig = _systemStore.state

// 加载动画
const loading = ref(false)
const formRef = ref()

// 表单模型
const model = reactive({
    userCode: '',
    password: ''
})

// 表单规则
const rules = {
    userCode: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
        }
    ]
}

// 第三方应用
const otherImgUrls = [
    new URL('@/assets/images/wechat.png', import.meta.url).href,
    new URL('@/assets/images/qq.png', import.meta.url).href,
    new URL('@/assets/images/qywx.png', import.meta.url).href
]

/**
 * 点击登录
 */
const onLogin = () => {
    formRef.value.validate(async (valid: boolean) => {
        try {
            if (!valid) return false

            loading.value = true
            const result = await api.auth.login(model)
            setToken(result.data.accessToken)

            let { redirect } = router.currentRoute.value?.query
            if (!redirect || redirect === '') {
                redirect = appConfig.home
            }

            router.push({
                path: redirect as string
            })
        } catch (err: any) {
            message.error(err)
        } finally {
            loading.value = false
        }
    })
}

/**
 * 回车登录
 * @param {Object} event
 */
const loginByEnter = (event: any) => {
    if (event.keyCode === 13) {
        onLogin()
    }
}

/**
 * 挂载后调用
 */
onMounted(() => {
    dom.on(document, 'keydown', loginByEnter)
})

/**
 * 实例销毁后调用
 */
onUnmounted(() => {
    dom.off(document, 'keydown', loginByEnter)
})
</script>
<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-size: 100% 100% !important;
    background: url('@/assets/images/login-bg.png');
    background-position: top center;

    &__content {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 920px;
        height: 420px;

        .system-title {
            position: absolute;
            top: -120px;
            left: -60px;
            width: 100%;

            display: flex;

            .system-logo {
                width: 60px;
                height: 60px;

                img {
                    width: 100%;
                }
            }

            .system-name {
                display: flex;
                flex-direction: column;
                height: 60px;
                margin-left: 20px;
                color: #fff;

                &-cn {
                    height: 40px;
                    line-height: 40px;
                    font-size: 30px;
                    font-weight: 600;
                    letter-spacing: 4px;
                }

                &-en {
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    color: #b8fdee;
                }
            }
        }

        .login-img {
            width: 400px;
            height: 400px;
            background-size: 100% 100% !important;
            background: url('@/assets/images/login.png');
            background-position: top center;
            margin-right: 110px;
        }

        .login-form {
            position: relative;
            width: 400px;
            height: 400px;
            padding: 50px 50px 30px 50px;
            border-radius: 20px;
            text-align: center;
            background: #fff;
            box-shadow: 0px 0px 12px #fff;
            box-sizing: border-box;

            &__title {
                font-size: 24px;
                color: #3b3b3b;
                font-weight: 600;
                letter-spacing: 2px;
                margin-bottom: 30px;
            }

            &__tip {
                text-align: left;
                color: #ccced1;
                margin-left: 8px;
            }

            &__other {
                position: absolute;
                bottom: 20px;
                width: calc(100% - 60px);
                height: 45px;
                display: flex;
                justify-content: center;

                .other-item {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 10px;
                    border: 1px solid #eff2f7;
                    background: rgba(109, 149, 241, 0.03);
                    transition: all 0.3s;

                    img {
                        width: 50%;
                        height: 50%;
                    }

                    &:hover {
                        cursor: pointer;
                        background: rgba(109, 149, 241, 0.1);
                        transform: scale(1.2);
                    }
                }
            }

            .btn-login {
                width: 100%;
                cursor: pointer;
            }

            .em-icon {
                font-size: 18px !important;
                vertical-align: -3px;
                color: #1dcd9e;
                font-weight: 600;
            }

            .el-input__wrapper {
                border-radius: 20px;
                padding-left: 8px !important;
                background-color: #f2f2f2 !important;
                border: none !important;
            }

            .el-button--primary {
                background-color: #1dcd9e !important;
                border-color: #1dcd9e !important;
                font-size: 14px;
                letter-spacing: 8px;
                border-radius: 20px;
            }
        }
    }

    &__copyright {
        position: absolute;
        bottom: 12px;
        width: 100%;
        text-align: center;
        color: #e4e7ed;
    }
}
</style>
