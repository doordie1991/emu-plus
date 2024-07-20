import { App } from 'vue'
import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router'
import { useAuthStore, useTabsStore } from '@/store'
import { getToken } from 'emu-plus/utils/token'
import NProgress from 'nprogress'
import baseRoutes from './routes'
import 'nprogress/nprogress.css'
import { IAppConfig, IPageConfig, IRoute } from 'emu-plus/types'
import { IMenu, MenuType } from '@/types'
import { EmPortal } from '@/components'

// 路由实例
let router: Router
// 路由集合
let routes = baseRoutes
// 首次加载
let firstLoad: boolean = true
// 错误路由
const errorRoutes: string[] = ['error403', 'error404']

// 进度条初始值
NProgress.configure({
    minimum: 0.2
})

/**
 * 初始化
 * @param {App<Element>} app 应用实例
 * @param {IAppConfig} config 应用配置
 */
const init = (app: App<Element>, config: IAppConfig) => {
    const { code, pages }: IAppConfig = config
    pages.forEach((page) => {
        routes.push(_page2router(code, page))
    })

    router = createRouter({
        history: createWebHistory(),
        routes
    })

    const _authStore = useAuthStore()
    const _tabsStore = useTabsStore()

    // 路由过滤器
    router.beforeEach(async (to: any, from: any, next: any) => {
        // token失效时跳转至登录页
        if (!getToken()) {
            to.name === 'login'
                ? next()
                : next({
                      name: 'login',
                      query: {
                          redirect: to.fullPath
                      }
                  })
            NProgress.done()
            return
        }

        // 如果是登录页或错误页时，直接跳转至对应页面页
        if (to.name === 'login' || errorRoutes.includes(to.name as string)) {
            next()
            NProgress.done()
        }

        // 初始化用户信息
        await _authStore.init()

        // 首次加载时，加载子应用的路由
        if (firstLoad) {
            const menus = _authStore.state.menus
            _addMicroRoutes(menus)
            firstLoad = false
            next({ ...to, replace: true })
            return
        }

        if (_isHasPermission(to)) {
            const _to: IRoute = Object.assign({}, to)
            _tabsStore.open(_to)
            next()
            NProgress.done()
        } else {
            next({
                name: 'error403'
            })
        }
    })

    app.use(router)
}

/**
 * 页面转路由
 * @param {String} moduleName
 * @param {IPageConfig} page
 */
const _page2router = (moduleName: string, page: IPageConfig): RouteRecordRaw => {
    const route: RouteRecordRaw = {
        path: page.path,
        name: page.name.toLowerCase(),
        component: page.component,
        props: page.props || true,
        meta: {
            title: page.title,
            module: moduleName,
            icon: page.icon,
            frameIn: page.frameIn,
            cache: page.cache,
            buttons: page.buttons,
            isControl: page.isControl === undefined || page.isControl === null ? true : page.isControl,
            relateRoute: page.relateRoute
        }
    }
    return route
}

/**
 * 添加微应用路由
 * @param menus
 */
const _addMicroRoutes = (menus: IMenu[]) => {
    for (const menu of menus) {
        const has = routes.find((m) => m.path === menu.path)
        if (has) {
            continue
        }

        if (menu.children?.length > 0) {
            _addMicroRoutes(menu.children)
        }

        if (menu.type !== MenuType.Route) {
            continue
        }

        const route: any = {
            path: menu.path,
            name: menu.routeName,
            component: () => EmPortal,
            meta: {
                title: menu.name,
                icon: menu.icon,
                buttons: menu.buttons,
                inFrame: menu.inFrame,
                microApp: true
            }
        }

        router.addRoute(route)
    }
}

/**
 *  是否有权限
 * @param {any} route
 */
const _isHasPermission = (route: any): boolean => {
    const _authStore = useAuthStore()
    return _authStore.routeNames.includes(route.name) ||
        route.path === '/' ||
        route.name === 'iframe' ||
        route.name === 'userinfo' ||
        (route.meta && route.meta.isControl === false)
        ? true
        : false
}

export default (app: App<Element>, config: IAppConfig) => {
    init(app, config)
}

export { router }
