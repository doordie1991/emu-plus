let componentMenus = [
    {
        name: '基础组件',
        type: 0,
        icon: 'redis',
        level: 1,
        show: true,
        children: []
    },
    {
        name: '表单组件',
        type: 0,
        icon: 'appstore',
        level: 1,
        show: true,
        children: []
    },
    {
        name: '高级组件',
        type: 0,
        icon: 'googleplus',
        level: 1,
        show: true,
        children: []
    },
    {
        name: 'GitHup',
        type: 2,
        icon: 'github-fill',
        level: 1,
        show: true,
        url: 'https://github.com/doordie1991/easy-modular-ui'
    },
    {
        name: 'Gitee',
        type: 2,
        icon: 'gitee',
        level: 1,
        show: true,
        url: 'https://gitee.com/doordie1991/easy-modular-ui'
    }
]

let errorPages = {
    type: 0,
    name: '错误页面',
    icon: 'detail',
    level: 2,
    show: true,
    rootId: 2,
    children: [
        {
            id: 'error403',
            type: 1,
            name: '403',
            routeName: 'error403',
            icon: 'detail',
            level: 3,
            show: true,
            sort: 1,
            rootId: 2
        },
        {
            id: 'error404',
            type: 1,
            name: '404',
            routeName: 'error404',
            icon: 'detail',
            level: 3,
            show: true,
            sort: 2,
            rootId: 2
        },
        {
            id: 'sponsor',
            type: 1,
            name: 'sponsor',
            routeName: 'sponsor',
            icon: 'detail',
            level: 3,
            show: false,
            sort: 3,
            rootId: 2
        }
    ]
}

const cretaeMenu = (params) => {
    return {
        type: params.type !== 0 ? 1 : 0,
        name: params.name,
        routeName: params.routeName || '',
        icon: params.icon || '',
        iconColor: params.iconColor || '',
        url: params.url || '',
        level: params.level || 3,
        show: params.show || true,
        sort: params.sort || 0,
        children: params.children || [],
        rootId: params.rootId || 0
    }
}

const setMenuId = (menus, parentId) => {
    menus.map((m, i) => {
        if (parentId) {
            m.id = parentId + '-' + i
        } else {
            m.id = i + ''
        }
        if (m.children) {
            setMenuId(m.children, m.id)
        }
    })
}

const filesToArray = (files) => {
    let arr = []
    for (const key in files) {
        arr.push({
            path: key,
            page: files[key]?.default
        })
    }

    return arr
}

const loadMenus = () => {
    const propertyPath = '_index/page.js'
    const files = import.meta.globEager('../../../modules/**/page.js')
    const pages = filesToArray(files)

    pages
        .filter((m) => m.path.endsWith(propertyPath))
        .sort((a, b) => {
            return a.page.sort - b.page.sort
        })
        .map((item) => {
            const { page, path } = item
            const group = page.group || 0
            const menu = cretaeMenu({
                type: 0,
                name: page.title,
                icon: page.icon,
                level: 2,
                show: true,
                rootId: group,
                children: []
            })

            const parentPath = path.replace(propertyPath, '')
            pages
                .filter((m) => m.path.indexOf(parentPath) > -1)
                .map((item) => {
                    const { page, path } = item
                    let childrenMenu = cretaeMenu({
                        name: page.title,
                        routeName: page.name,
                        icon: page.icon,
                        level: 3,
                        rootId: group
                    })

                    if (path.endsWith(propertyPath)) {
                        childrenMenu.name = '基础属性'
                        childrenMenu.icon = 'tags'
                    }

                    menu.children.push(childrenMenu)
                })

            componentMenus[group].children.push(menu)
        })

    setMenuId(componentMenus)
    componentMenus[2].children.push(errorPages)
    return componentMenus
}

export default loadMenus
