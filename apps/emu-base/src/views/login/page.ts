import { IPageConfig } from 'emu-plus/types'

const page: IPageConfig = {
    title: '登录',
    name: 'login',
    path: '/login',
    icon: 'login',
    frameIn: false,
    cache: false,
    component: () => import('./index.vue')
}

export default page
