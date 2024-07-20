import { IRoute } from 'emu-plus/types'
import { IMenu } from './menu'

// 登录模型
export interface LoginDto {
    // 账号
    userCode: string
    // 密码
    password: string
    // 验证码
    verifyCode?: string
    // 验证码编号
    verifyCodeId?: string
}

// 修改密码
export interface UpdatePasswordDto {
    //  原始眯眯笑
    oldPassword: string
    // 新密码
    newPassword: string
    // 确认密码
    confirmPassword: string
}

// JWT凭证模型
export interface JwtModel {
    // 访问令牌
    accessToken: string
    // 刷新令牌
    refreshToken: string
    // 过期时间
    expiresIn: number
}

// 认证信息
export interface AuthInfo {
    // 用户编号
    userId: string
    // 用户编码
    userCode: string
    // 用户姓名
    userName: string
    // 性别
    sex: boolean | null
    // 职位
    jobName?: string
    // 角色编码
    roleCodes?: string
    // 角色名称
    roleNames?: string
    // 租户Id
    tenantId?: string
    // 租户名称
    tenantName?: string
    // 租户类别
    tenantType?: string
    // 菜单列表
    menus: IMenu[]
    // 路由
    routes?: IRoute[]
    // 权限集
    permissions?: string[]
    // 额外数据
    extraData?: object
    // 扩展字段
    [key: string]: any
}
