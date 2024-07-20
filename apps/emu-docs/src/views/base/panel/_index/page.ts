import { IPageConfig } from 'emu-plus/types'

const page: IPageConfig = {
    title: '面板',
    name: 'base_panel',
    path: '/base/panel/index',
    icon: 'detail',
    group: 0,
    sort: 3,
    component: () => import('./index.vue')
}

export default page
