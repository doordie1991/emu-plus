import { router } from '@router'

/**
 * 打开路由菜单
 * @param {Object} menu 菜单
 */
const openRoute = (menu) => {
    let route = {
        name: menu.routeName,
        params: {}
    }

    if (menu.routeQuery) {
        route.query = JSON.parse(menu.routeQuery)
    }

    if (menu.routeParams) {
        route.params = JSON.parse(menu.routeParams)
    }

    router.push(route)
}

/**
 * 打开链接菜单
 * @param {Object} menu 菜单
 */
const openLink = (menu) => {
    const target = menu.target
    const openType = !target || target === 0 ? '_blank' : '_self'
    window.open(menu.url, openType)
}

/**
 * 打开菜单
 * @param {Object} menu 菜单
 */
const openMenu = (menu) => {
    // 1、站内路由 2、站外链接
    menu.type === 1 ? openRoute(menu) : openLink(router, menu)
}

export { openMenu }
