/**
 * 将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @param {Date} date 需要格式化的日期对象
 * @param {String} format 需要的格式字符串模型
 * @returns {String}
 *
 * formatDate(new Date(),'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
 * formatDate(new Date(),'yyyy/M/d h:m:s.S')      ==> 2006/7/2 8:9:4.18
 */
const formatDate = (format = 'yyyy-MM-dd', date) => {
    const d = date ? new Date(date) : new Date()
    let o = {
        'M+': d.getMonth() + 1, // 月份
        'd+': d.getDate(), // 日
        'h+': d.getHours(), // 小时
        'm+': d.getMinutes(), // 分
        's+': d.getSeconds(), // 秒
        'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
        'S': d.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))

    for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return format
}

export default {
    formatDate,
}
