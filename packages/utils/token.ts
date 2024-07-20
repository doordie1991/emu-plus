import cache from './cache'

const TOKEN_KEY = 'em-token'

export const setToken = (token: string): void => {
    cache.set(TOKEN_KEY, token)
}

export const getToken = (): string => {
    return cache.get<string>(TOKEN_KEY, false)
}

export const clearToken = (): void => {
    cache.remove(TOKEN_KEY)
}
