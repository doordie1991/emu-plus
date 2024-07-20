import { log } from 'console'
import store from 'store'

const prefix = 'em-'

export default {
    /**
     * 设置缓存
     * @param {String} key
     * @param {String} value
     */
    set(key: string, value: any): void {
        store.set(`${prefix}${key}`, value)
    },

    /**
     * 获取缓存
     * @param {String} key
     *  @param {boolean} parse
     */
    get<T = any>(key: string, parse: boolean = true): T | undefined {
        const str = store.get(`${prefix}${key}`)
        const isString = typeof str === 'string'
        if (str && parse && isString) {
            return JSON.parse(str) as T
        }

        return str
    },

    /**
     * 删除缓存
     * @param {String} key
     */
    remove(key: string): void {
        store.remove(`${prefix}${key}`)
    },

    /**
     * 删除所有缓存（指定前缀）
     */
    clearAll(): void {
        store.each((value, key) => {
            if (key.startsWith(prefix)) {
                store.remove(key)
            }
        })
    }
}
