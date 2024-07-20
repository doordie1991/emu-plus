import { IPageConfig } from 'emu-plus/types'

const page: IPageConfig = {
    title: '工具栏',
    name: 'base_panel_demo3',
    path: '/base/panel/demo3',
    icon: 'detail',
    component: () => import('./index.vue')
}

export default page
