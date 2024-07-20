/**
 * UI 库文档
 */

/**
 * 属性
 */
export interface IDocAttrs {
    // 属性名
    name: string
    // 属性描述
    desc: string
    // 数据类型
    type: string
    // 选项
    opt: string
    // 默认值
    def: string
}

/**
 * 事件
 */
export interface IDocEvent {
    // 事件名称
    name: string
    // 事件描述
    desc: string
    // 参数
    params: string
}

/**
 * 插槽
 */
export interface IDocSlot {
    // 插槽名称
    name: string
    // 插槽描述
    desc: string
}

/**
 * 方法
 */
export interface IDocMethods {
    // 方法名
    name: string
    // 方法描述
    desc: string
    // 参数
    params: string
}
