import { App } from 'vue'
import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import baseRoutes from './routes'
import 'nprogress/nprogress.css'
import { IAppConfig, IPageConfig } from 'emu-plus/types'

// 路由实例
let router: Router
// 路由集合
let routes = baseRoutes
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
        history: createWebHistory(config.routerPrefix),
        routes
    })

    // 路由过滤器
    router.beforeEach(async (to: any, from: any, next: any) => {
        // TODO token失效时跳转至登录页

        // TODO 如果是登录页或错误页时，直接跳转至对应页面页
        if (to.name === 'login' || errorRoutes.includes(to.name as string)) {
            next()
            NProgress.done()
        }

        // TODO 初始化用户信息

        // TODO 权限处理

        next()
    })

    app.use(router)
}

// 重置路由
const resetRouter = () => {
    router = null
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

export default (app: App<Element>, config: IAppConfig) => {
    init(app, config)
}

export { router, resetRouter }
