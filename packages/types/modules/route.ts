export interface IRoute {
    // 组件名称
    name: string
    // 是否可关闭
    closable?: boolean
    // 路径
    path?: string
    // 完整路径
    fullPath?: string
    // 元数据
    meta?: RouteMeta
    // 参数
    params?: object
    // 查询参数
    query?: object
    // 扩展字段
    [prop: string]: any
}

export interface RouteMeta {
    // 标题
    title: string
    // 模块
    module: string
    // 图标
    icon: string
    // 是否需要权限控制（如果为否则任何用户皆访问）
    isControl: boolean,
     // 扩展字段
     [prop: string]: any
}
