/**
 * 替换全部
 * @param {string} searchValue 查找字符串
 * @param {string} replaceValue 替换字符串
 */
String.prototype.replaceAll = function(searchValue: string, replaceValue: string) {
    const reg = new RegExp(searchValue, 'g')
    return this.replace(reg, replaceValue)
}


/**
 * 数组去重
 */
Array.prototype.distinct = function() {
    return Array.from(new Set(this))
}
