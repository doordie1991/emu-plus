/**
 * 是否是合法的对象属性
 * @param key
 * @param object
 * @returns
 */
export const isValidKey = (key: string | number | symbol, object: object): key is keyof typeof object => {
    return key in object
}

/**
 * 判断参数是否是其中之一
 * @param value
 * @param validList
 */
export const oneOf = (value: any, validList: any[]): boolean => {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true
        }
    }
    return false
}

/**
 * 判断类型
 * @param obj
 */
export const typeOf = (obj: any): any => {
    const toString = Object.prototype.toString
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    } as any

    const _type = toString.call(obj)
    return map[_type]
}

/**
 * 深拷贝
 * @param data
 */
export const deepCopy = (data: any): any => {
    const t = typeOf(data)
    let o: any

    if (t === 'array') {
        o = []
    } else if (t === 'object') {
        o = {}
    } else {
        return data
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]))
        }
    } else if (t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i])
        }
    }
    return o
}

export default {
    oneOf,
    typeOf,
    deepCopy
}
