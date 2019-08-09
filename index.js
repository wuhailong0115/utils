/**
 * JS转换时间戳为“刚刚”、“1分钟前”、“2小时前”“1天前”等格式
 * @param {Number} 前置时间戳
 * @returns {String} 返回 “刚刚”、“1分钟前”、“2小时前”“1天前”
 */
const formatDataDifference = (timeStamp) => {
    let minute = 1000 * 60
    let hour = minute * 60
    let day = hour * 24
    let month = day * 30
    let now = new Date().getTime()
    let diffValue = now - timeStamp
    if (diffValue < 0) {
        // 时间在当前之后
    }
    let monthC = diffValue / month
    let weekC = diffValue / (7 * day)
    let dayC = diffValue / day
    let hourC = diffValue / hour
    let minC = diffValue / minute
    if (monthC >= 1) return `${parseInt(monthC)}个月前`
    if (weekC >= 1) return `${parseInt(weekC)}周前`
    if (dayC >= 1) return `${parseInt(dayC)}天前`
    if (hourC >= 1) return `${parseInt(hourC)}个小时前`
    if (minC >= 1) return `${parseInt(minC)}分钟前`
    return `刚刚`
}

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
const formatDate = (date, format = 'yyyy-MM-dd') => {
    const d = new Date(date)
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

/**
 * JS获取URL中参数值
 * @param {String, String} url 及需要获取的参数名
 * @returns {String} 参数值或者 null
 */
const getQueryString = (url, name) => {
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
    if (!url.split('?')[1]) return null
    let r = url.split('?')[1].match(reg)
    if (r != null) return unescape(r[2]).split('#')[0]
    if (url.split('?')[2]) {
        if (!url.split('?')[2]) return null
        r = url.split('?')[2].match(reg)
        if (r != null) return unescape(r[2]).split('#')[0]
    }
    return null
}

/**
 * 判断是否是身份证
 * @param {String} code
 * @returns {boolean} 参数值或者 boolean
 */
const isIdCard = (code) => {
    let city = {
        11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江',
        31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北',
        43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏',
        61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外'
    }
    let tip = ""
    let pass = true
    // ∑(ai×Wi)(mod 11)
    // 加权因子
    let factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
    // 校验位
    let parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ]

    if(!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(code)) return false

    // 15转18
    if (code.length == '15') {
        let cardTemp = 0
        let a18 = ''
        a18 = code.substr(0, 6) + '19' + code.substr(6, code.length - 6)
        for(let i = 0; i < 17; i++) {
            cardTemp += a18.substr(i, 1) * factor[i]
        }
        a18 += parity[cardTemp % 11]
        code = a18
    }
    // 验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
    if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = '身份证号格式错误'
        pass = false
    } else if (!city[code.substr(0, 2)]) {
        tip = '地址编码错误'
        pass = false
    } else {
        // 18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('')
            let sum = 0
            let ai = 0
            let wi = 0
            for (let i = 0; i < 17; i++) {
                ai = code[i]
                wi = factor[i]
                sum += ai * wi
            }
            if (parity[sum % 11] != code[17]) {
                tip = '校验位错误'
                pass = false
            }
        }
    }
    return pass
}

/**
 * 判断是否手机
 * @param {String} value
 * @returns {boolean} 参数值或者 boolean
 */
const isPhone = (value) => {
    return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(value)
}

/**
 * 判断是否手机 IOS Android
 * @param {String} value
 * @returns {boolean} 参数值或者 boolean
 */
const isIOS = () => {
    let u = navigator.userAgent
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}
const isAndroid = () => {
    let u = navigator.userAgent
    return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
}

/**
 * 获取一个数的百分比
 * @param {Number,Number} value
 * @returns {String}
 */
const toPercent = (num, total) => {
    return (Math.round(num / total * 10000) / 100.00)
}

/**
 * 获取两个数之差 返回整数
 * @param {Number,Number} min,max
 * @returns {Number}
 */
const getIntNum = (min, max) => {
    let c = max - min + 1
    return Math.floor(Math.random() * c + min)
}
const getFloatNum = (min, max) => {
    return Math.random() * (max - min) + min
}

/**
 * 处理选择多项时的参数，数组转字符串
 * [1,2,3] ==> '1,2,3',提交时处理参数
 * @param {Array} statusArray
 * @returns {String}
*/
const dealParams = (statusArray) => {
    let statusStr = ''
    for (let i = 0; i < statusArray.length; i++) {
        statusStr += (statusArray[i] + ',')
    }
    return statusStr.substring(0, statusStr.length-1)
}

/**
 * 字符串转数组 获取时处理数据
 * '1,2,3' ==> [1,2,3]
 * @param {String} param
 * @returns {Array}
 */
const toArry = (param) => {
    return param.split(',')
}

/**
 * 数据分组 适用于轮播等  [{}, {}, {}] ==> [[{}, {}], [{}]]
 * @param {Array, Number}  list, needLen
 * @returns {Array}
 */
const splitGroup = (list, needLen) => {
    let index = 0
    let needList = []
    for (let i = 0; i < list.length; i++) {
        index = parseInt(i / needLen)
        if (needList.length <= index) {
            needList.push([])
        }
        needList[index].push(list[i])
    }
    return needList
}

/**
 * 整数每三个加',', 如 '1,234'
 * @param {Number}  val
 * @returns {Number}
 */
 const commas = (val) => {
    return Math.round(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 格式化金额，并保留两位小数
 * @param {String}  str
 * @returns {String}
 */
 const formatNum = (str) => {
    let newStr = ""
    let count = 0
    // 当数字是整数
    if (str.indexOf(".") == -1) {
        for (let i = str.length - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr
            }
            count ++
        }
        str = newStr + ".00" //自动补小数点后两位
        return str
    }
    // 当数字带有小数
    else {
        for (let i = str.indexOf(".") - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr
            } else {
                newStr = str.charAt(i) + newStr //逐个字符相接起来
            }
            count ++
        }
        str = newStr + (str + "00").substr((str + "00").indexOf("."), 3)
        return str
    }
}

export default {
    formatDataDifference,
    formatDate,
    getQueryString,
    isIdCard,
    isPhone,
    isIOS,
    isAndroid,
    toPercent,
    getIntNum,
    getFloatNum,
    dealParams,
    toArry,
    splitGroup,
    commas,
    formatNum
}