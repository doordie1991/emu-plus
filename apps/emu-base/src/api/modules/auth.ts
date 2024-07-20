import { LoginDto, UpdatePasswordDto, JwtModel, AuthInfo } from '@/types'

const login = (dto: LoginDto): Promise<RspResult<JwtModel>> => {
    return Emu.$http.mockRequest('post', '/login', dto)
}

const updatePassword = (dto: UpdatePasswordDto): Promise<RspResult> => {
    return Emu.$http.mockRequest('post', '/updatePassword', dto)
}

const getAuthInfo = (): Promise<RspResult<AuthInfo>> => {
    return Emu.$http.mockRequest('get', '/getAuthInfo')
}

export default {
    login,
    updatePassword,
    getAuthInfo
}
