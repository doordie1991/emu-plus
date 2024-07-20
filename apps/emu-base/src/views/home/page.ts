import { IPageConfig } from 'emu-plus/types'

const page: IPageConfig = {
    title: '首页',
    name: 'home',
    path: '/',
    icon: 'home',
    component: () => import('./index.vue')
}

export default page
