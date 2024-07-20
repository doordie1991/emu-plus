import { IMenu, MenuType } from '@/types'

const menus: IMenu[] = [
    {
        id: '1',
        name: '基础组件',
        type: MenuType.Node,
        icon: 'redis',
        level: 1,
        show: true,
        children: [
            {
                id: '101',
                name: '按钮',
                type: MenuType.Node,
                icon: 'detail',
                level: 2,
                show: true,
                rootId: 1,
                children: [
                    {
                        id: '10101',
                        name: '基础属性',
                        routeName: 'base_button',
                        path: '/docs/base/button/index',
                        type: MenuType.Route,
                        icon: 'detail',
                        level: 3,
                        rootId: 1,
                        show: true,
                        children: []
                    },
                    {
                        id: '10102',
                        name: '组件示例',
                        routeName: 'base_button_demo',
                        path: '/docs/base/button/demo',
                        type: MenuType.Route,
                        icon: 'detail',
                        level: 3,
                        rootId: 1,
                        show: true,
                        children: []
                    }
                ]
            },
            {
                id: '102',
                name: '对话框',
                type: MenuType.Node,
                icon: 'detail',
                level: 2,
                show: true,
                rootId: 1,
                children: [
                    {
                        id: '10201',
                        name: '基础属性',
                        routeName: 'base_dialog',
                        path: '/docs/base/dialog/index',
                        type: MenuType.Route,
                        icon: 'detail',
                        level: 3,
                        rootId: 1,
                        show: true,
                        children: []
                    },
                    {
                        id: '10202',
                        name: '组件示例',
                        routeName: 'base_dialog_demo',
                        path: '/docs/base/dialog/demo',
                        type: MenuType.Route,
                        icon: 'detail',
                        level: 3,
                        rootId: 1,
                        show: true,
                        children: []
                    }
                ]
            },
            {
                id: '103',
                name: '抽屉',
                type: MenuType.Node,
                icon: 'detail',
                level: 2,
                show: true,
                rootId: 1,
                children: [
                    {
                        id: '10301',
                        name: '基础属性',
                        routeName: 'base_drawer',
                        path: '/docs/base/drawer/index',
                        type: MenuType.Route,
                        icon: 'detail',
                        level: 3,
                        rootId: 1,
                        show: true,
                        children: []
                    },
                    {
                        id: '10302',
                        name: '组件示例',
                        routeName: 'base_drawer_demo',
                        path: '/docs/base/drawer/demo',
                        type: MenuType.Route,
                        icon: 'detail',
                        level: 3,
                        rootId: 1,
                        show: true,
                        children: []
                    }
                ]
            },
            {
                id: '104',
                name: '面板',
                type: MenuType.Node,
                icon: 'detail',
                level: 2,
                show: true,
                rootId: 1,
                children: [
                    {
                        id: '10401',
                        name: '基础属性',
                        routeName: 'base_panel',
                        path: '/docs/base/panel/index',
                        type: MenuType.Route,
                        icon: 'detail',
                        level: 3,
                        rootId: 1,
                        show: true,
                        children: []
                    },
                    {
                        id: '10402',
                        name: '简单面板',
                        routeName: 'base_panel_demo1',
                        path: '/docs/base/panel/demo1',
                        type: MenuType.Route,
                        icon: 'detail',
                        level: 3,
                        rootId: 1,
                        show: true,
                        children: []
                    },
                    {
                        id: '10403',
                        name: '有头有尾',
                        routeName: 'base_panel_demo2',
                        path: '/docs/base/panel/demo2',
                        type: MenuType.Route,
                        icon: 'detail',
                        level: 3,
                        rootId: 1,
                        show: true,
                        children: []
                    },
                    {
                        id: '10404',
                        name: '工具栏',
                        routeName: 'base_panel_demo3',
                        path: '/docs/base/panel/demo3',
                        type: MenuType.Route,
                        icon: 'detail',
                        level: 3,
                        rootId: 1,
                        show: true,
                        children: []
                    },
                    {
                        id: '10405',
                        name: '面板页',
                        routeName: 'base_panel_demo4',
                        path: '/docs/base/panel/demo4',
                        type: MenuType.Route,
                        icon: 'detail',
                        level: 3,
                        rootId: 1,
                        show: true,
                        children: []
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        name: '表单组件',
        type: MenuType.Node,
        icon: 'appstore',
        level: 1,
        show: true,
        children: []
    },
    {
        id: '3',
        name: '高级组件',
        type: MenuType.Node,
        icon: 'googleplus',
        level: 1,
        show: true,
        children: []
    },
    {
        id: '4',
        name: 'GitHup',
        type: 2,
        icon: 'github-fill',
        level: 1,
        show: true,
        url: 'https://github.com/doordie1991/easy-modular-ui'
    },
    {
        id: '5',
        name: 'Gitee',
        type: 2,
        icon: 'gitee',
        level: 1,
        show: true,
        url: 'https://gitee.com/doordie1991/easy-modular-ui'
    }
]

export default menus
