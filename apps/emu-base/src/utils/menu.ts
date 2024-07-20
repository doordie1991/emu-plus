import { router } from '@/router'
import { IMenu, MenuTarget, MenuType } from '@/types'

/**
 * 打开路由菜单
 * @param {IMenu} menu 菜单
 */
const openRoute = (menu: IMenu) => {
    let route: any = {
        path: menu.path,
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
 * @param {IMenu} menu 菜单
 */
const openLink = (menu: IMenu) => {
    const openType = menu.target === MenuTarget.Blank ? '_blank' : '_self'
    window.open(menu.url, openType)
}

/**
 * 打开菜单
 * @param {IMenu} menu 菜单
 */
const openMenu = (menu: IMenu) => {
    // 1、站内路由 2、站外链接
    menu.type === MenuType.Route ? openRoute(menu) : openLink(menu)
}

export { openMenu }
