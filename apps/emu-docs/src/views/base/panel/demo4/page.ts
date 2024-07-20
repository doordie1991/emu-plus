import { IPageConfig } from 'emu-plus/types'

const page: IPageConfig = {
    title: '面板页',
    name: 'base_panel_demo4',
    path: '/base/panel/demo4',
    icon: 'detail',
    component: () => import('./index.vue')
}

export default page
