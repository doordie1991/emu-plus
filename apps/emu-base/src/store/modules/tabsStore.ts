import { defineStore } from 'pinia'
import { IRoute, RouteMeta } from 'emu-plus/types'
import { TabItem } from '@/types'
import { ref, Ref, computed, ComputedRef } from 'vue'
import { useSystemStore, useAuthStore, useSkinsStore } from '@/store'
import cache from 'emu-plus/utils/cache'
import { router } from '@/router'

// 页签缓存key
const tabsCacheKey = 'tabnav'

export interface ITabStore {
    // 已打开页面
    openedPages: Ref<TabItem[]>
    // 当前页面地址
    currPageUrl: Ref<string>
    // 缓存页面
    keepAlivePages: Ref<string[]>
    // 当前页面
    currPage: ComputedRef<TabItem>
    // 默认页面
    defaultPage: ComputedRef<TabItem>
    // 最大页签数量
    maxOpenCount: ComputedRef<number>
    // 初始化
    init(): void
    // 打开页签
    open(route: IRoute): void
    // 关闭标签
    close(index: number, toPage: IRoute): void
    // 关闭左侧标签
    closeLeft(index: number): void
    // 关闭右侧标签
    closeRight(index: number): void
    // 关闭其它标签
    closeOther(index: number): void
    // 关闭所有标签
    closeAll(): void
    // 设置标签名称
    setTabName(tabName: string): void
    [key: string]: any
}

export const useTabsStore = defineStore('app.tabs', (): ITabStore => {
    const openedPages = ref<TabItem[]>([])
    const currPageUrl = ref<string>('')
    const keepAlivePages = ref<string[]>([])

    const currPage = computed((): TabItem => {
        return openedPages.value.find((m) => m.path === currPageUrl.value) as TabItem
    })

    const defaultPage = computed((): TabItem => {
        const _systemStore = useSystemStore()
        const path = _systemStore.state.home || '/'
        const result: TabItem = {
            name: 'home',
            tabName: '首页',
            path,
            icon: 'home',
            closable: false
        }

        return result
    })

    const maxOpenCount = computed((): number => {
        const _skinsStore = useSkinsStore()
        const { maxOpenCount } = _skinsStore.state
        return maxOpenCount
    })

    /**
     * 初始化
     */
    function init(): void {
        const opened = cache.get<TabItem[]>(tabsCacheKey) || Array<TabItem>()
        if (!opened.find((m) => m.path === defaultPage.value.path)) {
            opened.splice(0, 0, defaultPage.value)
        }

        openedPages.value = opened
        currPageUrl.value = router.currentRoute.value.path || (defaultPage.value.path as string)
        _refreshKeepAlive()
    }

    /**
     * 打开标签
     * @param {IRoute} route 路由信息
     */
    function open(route: IRoute): void {
        // 不在框架中显示的页面，直接返回
        if (!_isFrameIn(route)) {
            return
        }

        // 超出最大页签数量时则从左侧开始移除多余页签
        _removeForBeyondMax()

        const page = _route2page(route)
        currPageUrl.value = page.path

        const isOpened = openedPages.value.find((p) => p.path === page.path)
        if (isOpened) {
            return
        }

        _addkeepAlive(page)
        openedPages.value.push(page)
        _cacheOpenedTabs()
    }

    /**
     * 关闭标签
     * @param {Number} index 关闭页签下标
     * @param {IRoute} toPage 跳转的页面
     */
    function close(index: number, toPage: IRoute): void {
        const closePage = openedPages.value[index]

        // 如果关闭的页面就是当前显示的页面,，则跳转至左边的页签
        if (!toPage && currPage.value.path === closePage.path) {
            toPage = index > 0 ? openedPages.value[index - 1] : defaultPage.value
        }

        if (closePage) {
            _removeTab(index)
            _removeKeepAlive(closePage)
        }

        if (toPage.path === defaultPage.value.path) {
            router.push(toPage.path)
        } else {
            open(toPage)
        }

        _cacheOpenedTabs()
    }

    /**
     * 关闭左侧标签
     * @param {Number} index 关闭页签下标
     */
    function closeLeft(index: number): void {
        for (let i = index - 1; i >= 1; i--) {
            const page = openedPages.value[i]
            _removeTab(i)
            _removeKeepAlive(page)
        }

        _cacheOpenedTabs()
    }

    /**
     * 关闭右侧标签
     * @param {Number} index 关闭页签下标
     */
    function closeRight(index: number): void {
        for (let i = openedPages.value.length - 1; i > index; i--) {
            const page = openedPages.value[i]
            _removeTab(i)
            _removeKeepAlive(page)
        }

        _cacheOpenedTabs()
    }

    /**
     * 关闭其它标签
     * @param {Number} index 关闭页签下标
     */
    function closeOther(index: number): void {
        for (let i = openedPages.value.length - 1; i >= 1; i--) {
            if (index === i) continue
            const page = openedPages.value[i]
            _removeTab(i)
            _removeKeepAlive(page)
        }

        _cacheOpenedTabs()
    }

    /**
     * 关闭所有标签
     */
    function closeAll(): void {
        for (let i = openedPages.value.length - 1; i > 0; i--) {
            const page = openedPages.value[i]
            _removeTab(i)
            _removeKeepAlive(page)
        }

        _cacheOpenedTabs()
        // 跳转至首页
        router.push(defaultPage.value.path)
    }

    /**
     * 设置标签名称
     * @param {String} tabName
     */
    function setTabName(tabName: string): void {
        if (!currPage || !openedPages?.value) return
        const tab = openedPages.value.find((p) => p.path === currPage.value.path)
        if (tab) {
            tab.tabName = tabName
        }
    }

    /**
     *  删除页签
     * @param {Number} index 下标
     */
    const _removeTab = (index: number): void => {
        openedPages.value.splice(index, 1)
    }

    /**
     * 移除页签（超出最大页签数量时）
     */
    const _removeForBeyondMax = (): void => {
        const removeCount = openedPages.value.length - maxOpenCount.value
        for (let i = removeCount; i > 0; i--) {
            const page = openedPages.value[i]
            _removeTab(i)
            _removeKeepAlive(page)
        }
    }

    /**
     * 删除一个页面的缓存设置
     * @param {TabItem} page 页面
     */
    const _removeKeepAlive = (page: TabItem) => {
        if (!_isCache(page)) {
            return
        }

        const list = [...keepAlivePages.value]
        const index = list.findIndex((item) => item === page.name)

        if (index > -1) {
            list.splice(index, 1)
            keepAlivePages.value = list
        }
    }

    /**
     * 增加一个页面的缓存设置
     * @param {TabItem} page 页面
     */
    const _addkeepAlive = (page: TabItem) => {
        if (!_isCache(page)) {
            return
        }

        if (keepAlivePages.value.indexOf(page.name) < 0) {
            keepAlivePages.value.push(page.name)
        }
    }

    /**
     * 更新缓存页签
     */
    const _refreshKeepAlive = (): void => {
        keepAlivePages.value = openedPages.value.filter((item) => item.meta?.cache !== false).map((e) => e.name)
    }

    /**
     * 缓存已打开的页签
     */
    const _cacheOpenedTabs = () => {
        cache.set(tabsCacheKey, openedPages.value)
    }

    /**
     * 页面是否缓存
     * @param {TabItem} page
     */
    const _isCache = (page: TabItem): boolean => {
        return !page.meta || page.meta?.cache !== false
    }

    /**
     * 页面是否在框架中显示
     * @param {IRoute} page
     */
    const _isFrameIn = (page: IRoute): boolean => {
        return !page.meta || page.meta.frameIn !== false
    }

    /**
     * 路由转页面
     * @param {IRoute} route 路由
     */
    const _route2page = (route: IRoute): TabItem => {
        const routeMeta = route.meta || ({} as RouteMeta)
        const { module, title, icon } = routeMeta
        const key = `${module}.pages.${route.name}`
        const tabName = Emu.$t(key) === key ? title : Emu.$t(key)

        return {
            name: route.name,
            path: decodeURI(route.path),
            fullPath: route.fullPath,
            meta: route.meta,
            query: route.query,
            params: route.params,
            tabName: tabName,
            icon: icon,
            closable: true
        } as TabItem
    }

    return {
        openedPages,
        currPageUrl,
        keepAlivePages,
        currPage,
        defaultPage,
        maxOpenCount,
        init,
        open,
        close,
        closeLeft,
        closeRight,
        closeOther,
        closeAll,
        setTabName
    }
})
