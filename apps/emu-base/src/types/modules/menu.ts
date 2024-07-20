// 菜单类型
export enum MenuType {
    // 节点
    Node,
    // 路由
    Route,
    // 链接
    Link
}

// 菜单跳转类型
export enum MenuTarget {
    // 新开页签跳转
    Blank,
    // 内部跳转
    Self
}

export interface IMenu {
    id: string
    name: string
    path?: string
    type: MenuType
    target?: MenuTarget
    children?: IMenu[]
    [prop: string]: any
}
