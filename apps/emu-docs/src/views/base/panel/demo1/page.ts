import { IPageConfig } from 'emu-plus/types'

const page: IPageConfig = {
    title: '简单面板',
    name: 'base_panel_demo1',
    path: '/base/panel/demo1',
    icon: 'detail',
    component: () => import('./index.vue')
}

export default page
