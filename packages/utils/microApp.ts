/**
 * 微应用
 */

import { IAppConfig } from '../types'
import { registerMicroApps, start } from 'qiankun'

/**
 * 启动微应用
 * @param config
 */
export const startMicroApps = (config: IAppConfig): void => {
    const apps = config.microApps as any
    registerMicroApps(apps)
    start()
}
