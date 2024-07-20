import { IAppConfig } from 'emu-plus/types'

const config: IAppConfig = {
    // 基座
    baseApp: true,
    // 基座配置
    baseAppConfg: {
        prefetch: true,
        strictStyleIsolation: false,
        singular: true
    },
    // 应用名称
    code: 'emu-plus',
    // 应用名称
    name: 'emu-plus',
    // 应用描述
    desc: 'vue3+ts+qiankun+turborepo+monorepo 微前端框架',
    // 应用logo
    logoUrl: '/images/logo.png',
    // 首页
    home: '/',
    // 版本号
    version: '1.0.0',
    // 版权
    copyright: '版权所有：陈曦·LR | 用代码改变世界 Powered by EasyModular',
    // 请求配置
    httpCfg: {
        serviceUrl: '/api'
    }
}

export default config
