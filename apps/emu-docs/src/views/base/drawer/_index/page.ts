import { IPageConfig } from 'emu-plus/types'

const page: IPageConfig = {
    title: '抽屉',
    name: 'base_drawer',
    path: '/base/drawer/index',
    icon: 'detail',
    group: 0,
    sort: 8,
    component: () => import('./index.vue')
}

export default page
