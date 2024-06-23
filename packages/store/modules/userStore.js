import { defineStore } from 'pinia'
import cache from '../../utils/cache'
import { useSystemStore } from '../../store'

//路由菜单
let routeMenus = []

const state = () => {
    return {
        //用户编号
        userId: '',
        //用户编码
        userCode: '',
        //用户姓名
        userName: '',
        //性别
        sex: '',
        //职位
        jobName: '',
        //角色编码
        roleCodes: '',
        //角色名称
        roleNames: '',
        //租户Id
        tenantId: '',
        //租户名称
        tenantName: '',
        //租户类别
        tenantType: '',
        //菜单列表
        menus: [],
        //路由
        routes: [],
        //权限列表
        permissions: [],
        //额外数据
        extraData: ''
    }
}

const getters = {
    routeNames: (state) => state.routes.map((m) => m.routeName)
}

const actions = {
    /**
     * 初始化
     */
    async init() {
        if (this.userId) return

        try {
            const authInfo = await getUserInfo()
            Object.assign(this.$state, authInfo)
            this.resolveRouteMenus(this.menus)

            //TODO 设置皮肤

            const userId = cache.get('userId')
            if (authInfo.userId !== userId) {
                //TODO 如果账户变了，重置页签数据
            }

            cache.set('userId', this.userId)
        } catch (err) {
            console.error(err)
            //TODO 获取账户信息异常时退出登录
        }
    },

    /**
     * 重载用户信息
     */
    async reload() {
        try {
            const authInfo = await getUserInfo()
            Object.assign(this.$state, authInfo)
            this.resolveRouteMenus(this.menus)
        } catch (err) {
            console.error(err)
            //TODO 如果请求失败则退出
        }
    },

    /**
     *  解释路由菜单
     * @param {Array} menus
     */
    resolveRouteMenus(menus) {
        menus.forEach((m) => {
            m.children?.length > 0 && this.resolveRouteMenus(m.children)
            m.type === 1 && this.routes.push(m)
        })
    }
}

/**
 *  获取用户信息
 */
const getUserInfo = async () => {
    const systemStore = useSystemStore()
    const authInfo = await systemStore.actions.auth.getAuthInfo()
    return authInfo
}

export const useUserStore = defineStore('app.user', {
    state,
    getters,
    actions
})
