import { createI18n } from 'vue-i18n'
import { App } from 'vue'
import en from './lang/en'
import zhCn from './lang/zh-cn'
import { IAppConfig, ILocalesMessge, Locale } from '../types'

const messages: ILocalesMessge = {
    en: {
        ...en
    },
    cn: {
        ...zhCn
    }
}

export default (app: App<Element>, config: IAppConfig) => {
    const { code, localesMessage, localesOptions }: IAppConfig = config
    messages.en[code] = localesMessage.en
    messages.cn[code] = localesMessage.cn

    const i18n = createI18n<{}, Locale>({
        // 使用Composition API模式，则需要将其设置为false
        legacy: localesOptions?.legacy ?? false,
        //全局注入$t函数
        globalInjection: localesOptions?.globalInjection ?? true,
        locale: localesOptions?.locale ?? 'cn',
        fallbackLocale: localesOptions?.fallbackLocale ?? 'cn',
        messages: messages,
        missingWarn: localesOptions?.missingWarn ?? false
    })

    Emu.$i18n = i18n
    Emu.$t = i18n.global.t
    app.use(i18n)
}
