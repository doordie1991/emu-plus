import { createRouter, createWebHashHistory } from 'vue-router'
import { useTokenStore, useUserStore, useTabsStore } from '../store'
import NProgress from 'nprogress'
import baseRoutes from './routes'
import 'nprogress/nprogress.css'

// 路由实例
let router
// 路由集合
let routes = baseRoutes
// 错误路由
const errorRoutes = ['error403', 'error404']

// 进度条初始值
NProgress.configure({
    minimum: 0.2
})

/**
 * 初始化
 * @param {Object} app 应用实例
 * @param {Array} modules 模块
 */
const init = (app, modules = []) => {
    for (const module of modules) {
        const { code, pages } = module
        pages.forEach((page) => {
            routes.push(_page2router(code, page))
        })
    }

    router = createRouter({
        history: createWebHashHistory(),
        routes
    })

    const _tokenStore = useTokenStore()
    const _userStore = useUserStore()
    const _tabsStore = useTabsStore()

    // 路由过滤器
    router.beforeEach(async (to, from, next) => {
        // token失效时跳转至登录页
        if (!_tokenStore.accessToken) {
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
        if (to.name === 'login' || errorRoutes.includes(to.name)) {
            next()
            NProgress.done()
        }

        // 初始化用户信息
        await _userStore.init()

        if (_isHasPermission(to)) {
            _tabsStore.open(to)
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
 * @param {String} module
 * @param {Object} page
 */
const _page2router = (module, page) => {
    return {
        path: page.path,
        name: page.name.toLowerCase(),
        component: page.component,
        props: page.props || true,

        meta: {
            title: page.title,
            module,
            icon: page.icon,
            frameIn: page.frameIn,
            cache: page.cache,
            buttons: page.buttons,
            isControl: page.isControl === undefined || page.isControl === null ? true : page.isControl,
            relateRoute: page.relateRoute
        }
    }
}

/**
 *  是否有权限
 * @param {Object} route
 */
const _isHasPermission = (route) => {
    const _userStore = useUserStore()
    return _userStore.routeNames.includes(route.name) ||
        route.path === '/' ||
        route.name === 'iframe' ||
        route.name === 'userinfo' ||
        (route.meta && route.meta.isControl === false)
        ? true
        : false
}

export default (app, modules) => {
    init(app, modules)
}

export { router }
