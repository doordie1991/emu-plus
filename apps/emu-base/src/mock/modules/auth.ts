import menus from '../data/menus'
const login = {
    type: 'post',
    url: '/login',
    response: (config: any) => {
        return {
            code: '0',
            data: {
                accessToken:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                refreshToken: ''
            }
        }
    }
}

const updatePassword = {
    type: 'post',
    url: '/updatePassword',
    response: (config: any) => {
        return {
            code: '0',
            msg: 'success'
        }
    }
}

const getAuthInfo = {
    type: 'get',
    url: '/getAuthInfo',
    response: (config: any) => {
        return {
            code: '0',
            data: {
                userId: '101',
                userCode: 'admin',
                userName: '管理员',
                tenantId: '',
                tenantName: '',
                sex: true,
                menus: menus,
                skin: {
                    themeMode: 'dark',
                    themeColor: 'theme1',
                    fontSize: 'small',
                    maxOpenCount: 20,
                    uniqueOpened: true
                }
            }
        }
    }
}

export default {
    login,
    updatePassword,
    getAuthInfo
}
