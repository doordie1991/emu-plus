import { IBaseCtx } from '@/types'
import { IAppConfig } from 'emu-plus/types'
import { apps, lifeCycles, globalState } from './config'
import { registerMicroApps, start, initGlobalState, MicroAppStateActions } from 'qiankun'

// 微应用注册
export const registerApps = (config: IAppConfig, baseCtx: IBaseCtx) => {
    _addMicroAppData(baseCtx)
    registerMicroApps(apps, lifeCycles)
    const { prefetch, strictStyleIsolation, singular } = config.baseAppConfg
    start({
        prefetch, // 可选，是否开启预加载，默认为 true。
        sandbox: { strictStyleIsolation: strictStyleIsolation }, // 可选，是否开启沙箱，默认为 true。// （建议关闭，因为在vite 中子应用的样式会失效）。
        singular // 可选，是否为单实例场景，单实例指的是同一时间只会渲染一个微应用。默认为 true。
    })
}

// 初始化全局下发的数据
export const qiankunActions: MicroAppStateActions = initGlobalState(globalState)

//订阅全局数据
qiankunActions.onGlobalStateChange((state: Record<string, any>): void => {
    //如果监听到全局数据有修改，可以从这里更新store
})

const _addMicroAppData = (baseCtx: IBaseCtx) => {
    for (const app of apps) {
        Object.assign(app.props, baseCtx)
    }
}
