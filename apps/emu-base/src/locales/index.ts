import { ILocalesMessge } from 'emu-plus/types'
import home from './modules/home'
import login from './modules/login'

const locales: ILocalesMessge = {
    en: {
        home: home.en,
        login: login.en
    },
    cn: {
        home: home.cn,
        login: login.cn
    }
}

export default locales
