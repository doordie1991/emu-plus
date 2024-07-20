import { IPageConfig } from 'emu-plus/types'

const page: IPageConfig = {
    title: '基础用法',
    name: 'base_drawer_demo',
    path: '/base/drawer/demo',
    icon: 'detail',
    component: () => import('./index.vue')
}

export default page
