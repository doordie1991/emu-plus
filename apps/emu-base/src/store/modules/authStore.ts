import { defineStore } from 'pinia'
import { ref, Ref, computed, ComputedRef } from 'vue'
import { IRoute } from 'emu-plus/types'
import { AuthInfo, IMenu, MenuType } from '@/types'
import cache from 'emu-plus/utils/cache'

import api from '@/api'

export interface IAuthStore {
    state: Ref<AuthInfo>
    routeNames: ComputedRef<string[]>
    init(): Promise<void>
    reload(): Promise<void>
}

export const useAuthStore = defineStore('app.auth', (): IAuthStore => {
    const state = ref<AuthInfo>({
        // 用户编号
        userId: '',
        // 用户编码
        userCode: '',
        // 用户姓名
        userName: '',
        // 性别
        sex: null,
        // 职位
        jobName: '',
        // 角色编码
        roleCodes: '',
        // 角色名称
        roleNames: '',
        // 租户Id
        tenantId: '',
        // 租户名称
        tenantName: '',
        // 租户类别
        tenantType: '',
        // 菜单列表
        menus: Array<IMenu>(),
        // 路由
        routes: Array<IRoute>(),
        // 权限集
        permissions: Array<string>(),
        // 额外数据
        extraData: {}
    })

    // 路由名称
    const routeNames = computed((): string[] => {
        const routes = state.value.routes
        return routes ? routes.map((m) => m.routeName) : []
    })

    /**
     * 初始化
     */
    async function init(): Promise<void> {
        if (state.value.userId) {
            return
        }

        try {
            const authInfo = await _getUserInfo()
            Object.assign(state.value, authInfo)
            _resolveRouteMenus(state.value.menus)

            //TODO 设置皮肤

            const userId = cache.get<string>('userId', false)
            if (authInfo.userId == userId) {
                //TODO 如果账户变了，重置页签数据
            }

            cache.set('userId', state.value.userId)
        } catch (err) {
            console.error(err)
            //TODO 获取账户信息异常时退出登录
        }
    }

    /**
     * 重载用户信息
     */
    async function reload(): Promise<void> {
        try {
            const authInfo = await _getUserInfo()
            Object.assign(state.value, authInfo)
            _resolveRouteMenus(authInfo.menus)
        } catch (err) {
            console.error(err)
            //TODO 如果请求失败则退出
        }
    }

    /**
     *  解释路由菜单
     * @param {IMenu[]} menus
     */
    const _resolveRouteMenus = (menus: IMenu[]): void => {
        menus.forEach((menu: IMenu) => {
            menu.children?.length > 0 && _resolveRouteMenus(menu.children)
            if (menu.type === MenuType.Route) {
                const route = Object.assign({}, menu) as Partial<IRoute> as IRoute
                state.value.routes.push(route)
            }
        })
    }

    /**
     *  获取用户信息
     */
    const _getUserInfo = async (): Promise<AuthInfo> => {
        const rsp = await api.auth.getAuthInfo!()
        return rsp.data as AuthInfo
    }

    return {
        state,
        routeNames,
        init,
        reload
    }
})
