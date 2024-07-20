/**
 * 基座上下文数据
 */

import { Pinia } from 'pinia'
import { Router } from 'vue-router'

export interface IBaseCtx {
    // 路由
    router?: Router
    // 状态
    store?: Pinia
}
