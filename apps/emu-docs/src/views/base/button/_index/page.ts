import { IPageConfig } from 'emu-plus/types'

const page: IPageConfig = {
    title: '按钮',
    name: 'base_button',
    path: '/base/button/index',
    icon: 'detail',
    group: 0,
    sort: 2,
    component: () => import('./index.vue')
}

export default page
