import { IPageConfig } from 'emu-plus/types'

const page: IPageConfig = {
    title: '对话框',
    name: 'base_dialog',
    path: '/base/dialog/index',
    icon: 'detail',
    group: 0,
    sort: 3,
    component: () => import('./index.vue')
}

export default page
