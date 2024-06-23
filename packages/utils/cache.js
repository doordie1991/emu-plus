import store from 'store'
const prefix = 'em-'

export default {
    /**
     * 设置缓存
     * @param {String} key
     * @param {String} value
     */
    set(key, value) {
        store.set(`${prefix}${key}`, value)
    },

    /**
     * 获取缓存
     * @param {String} key
     */
    get(key) {
        return store.get(`${prefix}${key}`)
    },

    /**
     * 删除缓存
     * @param {String} key
     */
    remove(key) {
        store.remove(`${prefix}${key}`)
    },

    /**
     * 删除所有缓存（指定前缀）
     */
    clearAll() {
        store.each(function (value, key) {
            if (key.startsWith(prefix)) {
                store.remove(key)
            }
        })
    }
}
