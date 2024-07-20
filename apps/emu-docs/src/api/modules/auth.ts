import { LoginDto, UpdatePasswordDto, JwtModel, AuthInfo } from '@/types'
import loadMenus from '@/utils/mockMenu'

const login = (dto: LoginDto): Promise<RspResult<JwtModel>> => {
    const data: JwtModel = {
        accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        refreshToken: '',
        expiresIn: 7200
    }

    return new Promise((resolve, reject) => {
        if (dto.userCode === 'admin' && dto.password === '123') {
            resolve({
                code: '',
                msg: '登录成功',
                data
            })
        } else {
            reject(new Error('密码错误'))
        }
    })
}

const updatePassword = (dto: UpdatePasswordDto): Promise<RspResult> => {
    return new Promise((resolve) => {
        resolve({
            msg: 'success',
            code: '0'
        })
    })
}

const getAuthInfo = (): Promise<RspResult<AuthInfo>> => {
    const _menus = loadMenus()
    const data: AuthInfo = {
        userId: '101',
        userCode: 'admin',
        userName: '管理员',
        tenantId: '',
        tenantName: '',
        sex: true,
        menus: _menus,
        skin: {
            themeMode: 'dark',
            themeColor: 'theme1',
            fontSize: 'small',
            maxOpenCount: 20,
            uniqueOpened: true
        }
    }

    return new Promise((resolve) => {
        resolve({
            code: '',
            msg: '登录成功',
            data
        })
    })
}

export default {
    login,
    updatePassword,
    getAuthInfo
}
