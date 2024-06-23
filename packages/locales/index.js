import { createI18n } from 'vue-i18n'
import en from './lang/en'
import zhCn from './lang/zh-cn'

const messages = {
    en: {
        ...en
    },
    zh: {
        ...zhCn
    }
}

export default (app, modules) => {
    for (const module of modules) {
        const { code, locales } = module
        if (!locales) continue

        messages.en[module.code] = locales.en
        messages.zh[module.code] = locales.zhCn
    }

    const i18n = createI18n({
        //使用Composition API模式，则需要将其设置为false
        legacy: false,
        //全局注入$t函数
        globalInjection: true,
        locale: 'zh',
        fallbackLocale: 'zh',
        messages,
        missingWarn: false
    })

    emuCtx.$i18n = i18n
    emuCtx.$t = i18n.global.t
    app.use(i18n)
}
