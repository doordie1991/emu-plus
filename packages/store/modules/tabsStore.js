import { defineStore } from 'pinia'
import { useSystemStore, useUserStore, useSkinsStore } from '../../store'
import cache from '@utils/cache'
import { router } from '@router'

// 页签缓存key
const tabsCacheKey = 'tabnav'

const state = () => {
    return {
        // 已打开页面
        openedPages: [],
        // 当前页面地址
        currentPageUrl: '',
        // 缓存页面
        keepAlivePages: []
    }
}

const getters = {
    currentPage: (state) => {
        return state.openedPages.find((m) => m.path === state.currentPageUrl)
    },
    defaultPage: () => {
        const _systemStore = useSystemStore()
        const path = _systemStore.config.home || '/'
        return {
            name: 'home',
            tabName: '首页',
            path,
            icon: 'home',
            closable: false
        }
    },
    maxOpenCount: () => {
        const _skinsStore = useSkinsStore()
        const maxOpenCount = _skinsStore.maxOpenCount
        return maxOpenCount
    }
}

const actions = {
    /**
     * 初始化
     */
    async init() {
        let opened = cache.get(tabsCacheKey) || []
        if (!opened.find((m) => m.path === this.defaultPage.path)) {
            opened.splice(0, 0, this.defaultPage)
        }

        this.openedPages = opened
        this.currentPageUrl = this.defaultPage.path
        this.refreshKeepAlive()
    },

    /**
     * 打开页面
     * @param {Object} route 路由信息
     */
    async open(route) {
        // 不在框架中显示的页面，直接返回
        if (!_isFrameIn(route)) return

        // 超出最大页签数量时则从左侧开始移除多余页签
        this.removeForBeyondMax()

        const page = _route2page(route)
        this.currentPageUrl = page.path
        const isOpened = this.openedPages.find((p) => p.path === page.path)
        if (isOpened) return

        this.addkeepAlive(page)
        this.openedPages.push(page)
        this.cacheOpenedTabs()
    },

    /**
     * 关闭标签
     * @param {Number} index 关闭页签下标
     * @param {Object} toPage 跳转的页面
     */
    async close(index, toPage) {
        const closePage = this.openedPages[index]

        // 如果关闭的页面就是当前显示的页面,，则跳转至左边的页签
        if (!toPage && this.currentPage.path === closePage.path) {
            toPage = index > 0 ? this.openedPages[index - 1] : this.defaultPage
        }

        this.removeTab(index)
        this.cacheOpenedTabs()
        this.removeKeepAlive(closePage)
        toPage && router.push(toPage)
    },

    /**
     * 关闭左侧标签
     * @param {Number} index 关闭页签下标
     */
    closeLeft(index) {
        for (let i = index - 1; i >= 1; i--) {
            const page = this.openedPages[i]
            this.removeTab(i)
            this.removeKeepAlive(page)
        }

        this.cacheOpenedTabs()
    },

    /**
     * 关闭右侧标签
     * @param {Number} index 关闭页签下标
     */
    closeRight(index) {
        for (let i = this.openedPages.length - 1; i > index; i--) {
            const page = this.openedPages[i]
            this.removeTab(i)
            this.removeKeepAlive(page)
        }

        this.cacheOpenedTabs()
    },

    /**
     * 关闭其它标签
     * @param {Number} index 关闭页签下标
     */
    closeOther(index) {
        for (let i = this.openedPages.length - 1; i >= 1; i--) {
            if (index === i) continue
            const page = this.openedPages[i]
            this.removeTab(i)
            this.removeKeepAlive(page)
        }

        this.cacheOpenedTabs()
    },

    /**
     * 关闭所有标签
     */
    closeAll() {
        for (let i = this.openedPages.length - 1; i > 0; i--) {
            const page = this.openedPages[i]
            this.removeTab(i)
            this.removeKeepAlive(page)
        }

        this.cacheOpenedTabs()
        // 跳转至首页
        router.push(this.defaultPage.path)
    },

    /**
     * 设置标签名称
     * @param {String} tabName
     */
    setTabName(tabName) {
        if (!this.currentPage || !this.openedPages) return
        const tab = this.openedPages.find((p) => p.path === this.currentPage.path)
        if (tab) tab.tabName = tabName
    },

    /**
     *  删除页签
     * @param {Number} index 下标
     */
    removeTab(index) {
        this.openedPages.splice(index, 1)
    },

    /**
     * 更新缓存页签
     */
    refreshKeepAlive() {
        this.keepAlivePages = this.openedPages.filter((item) => item.meta?.cache !== false).map((e) => e.name)
    },

    /**
     * 删除一个页面的缓存设置
     * @param {Object} page 页面
     */
    removeKeepAlive(page) {
        if (!_isCache(page)) {
            return
        }

        const list = [...this.keepAlivePages]
        const index = list.findIndex((item) => item === page.name)

        if (index > -1) {
            list.splice(index, 1)
            this.keepAlivePages = list
        }
    },

    /**
     * 增加一个页面的缓存设置
     * @param {Object} page 页面
     */
    addkeepAlive(page) {
        if (!_isCache(page)) {
            return
        }

        if (this.keepAlivePages.indexOf(page.name) < 0) {
            this.keepAlivePages.push(page.name)
        }
    },

    /**
     * 移除页签（超出最大页签数量时）
     */
    removeForBeyondMax() {
        const removeCount = this.openedPages.length - this.maxOpenCount
        for (let i = removeCount; i > 0; i--) {
            const page = this.openedPages[i]
            this.removeTab(i)
            this.removeKeepAlive(page)
        }
    },

    /**
     * 缓存已打开的页签
     */
    cacheOpenedTabs() {
        cache.set(tabsCacheKey, this.openedPages)
    }
}

/**
 * 页面是否缓存
 * @param {Object} page
 */
const _isCache = (page) => {
    return !page.meta || page.meta?.cache !== false
}

/**
 * 页面是否在框架中显示
 * @param {Object} page
 */
const _isFrameIn = (page) => {
    return !page.meta || page.meta.frameIn !== false
}

/**
 * 路由转页面
 * @param {Object} route 路由
 */
const _route2page = (route) => {
    const { module, title } = route.meta
    const key = `${module}.pages.${route.name}`
    const tabName = emuCtx.$t(key) === key ? title : emuCtx.$t(key)

    //菜单图标赋值
    const _userStore = useUserStore()
    const routeInfo = _userStore.routes.find((m) => m.routeName === route.name)
    const icon = routeInfo?.icon

    return {
        name: route.name,
        path: decodeURI(route.path),
        fullPath: route.fullPath,
        meta: route.meta,
        query: route.query,
        params: route.params,
        icon: route.meta.icon,
        tabName: tabName || '未命名',
        icon: icon,
        closable: true
    }
}

export const useTabsStore = defineStore('app.tabs', {
    state,
    getters,
    actions
})
