/**
 * 替换全部
 * @param {*} r 源字符串
 * @param {*} t 目标字符串
 */
String.prototype.replaceAll = function (r, t) {
    const reg = new RegExp(r, 'g')
    return this.replace(reg, t)
}

/**
 * 去除最后一个字符
 */
String.prototype.trimEnd = function () {
    return this.substring(0, this.length - 1)
}

/**
 * 数组去重
 */
Array.prototype.distinct = function () {
    return Array.from(new Set(this))
}
