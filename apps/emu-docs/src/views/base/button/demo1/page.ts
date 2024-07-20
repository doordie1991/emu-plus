import { IPageConfig } from 'emu-plus/types'

const page: IPageConfig = {
    title: '按钮示例',
    name: 'base_button_demo',
    path: '/base/button/demo',
    icon: 'detail',
    component: () => import('./index.vue')
}

export default page
