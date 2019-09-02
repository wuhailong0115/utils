## utils
###前端公用函数库

## formatDataDifference  显示过去的时间情况
### 使用方法： formatDataDifference(timeStamp)
### JS转换时间戳为“刚刚”、“1分钟前”、“2小时前”“1天前”等格式
### @param {Number} 前置时间戳
### @returns {String} 返回 “刚刚”、“1分钟前”、“2小时前”“1天前”


## formatDate  格式化日期
### 使用方法： formatDate('yyyy/MM/dd hh:mm:ss', date)
### 将Date 转化为指定格式的String
### 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
### 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
### @param {Date} date 需要格式化的日期对象
### @param {String} format 需要的格式字符串模型

### @returns {String}
### formatDate(new Date(),'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
### formatDate(new Date(),'yyyy/M/d h:m:s.S')      ==> 2006/7/2 8:9:4.18
### ...


## getQueryString  获取url参数值
### 使用方法： getQueryString(url, name)
### JS获取URL中参数值
### @param {String, String} url 及需要获取的参数名
### @returns {String} 参数值或者 null


## isIdCard  身份证验证方法
### 使用方法： isIdCard(code)
### @param {String} code
### @returns {boolean} 参数值或者 boolean


## isPhone  手机号验证方法
### 使用方法： isPhone(value)
### @param {String} value
### @returns {boolean} 参数值或者 boolean


## isIOS  IOS验证
### 使用方法： isIOS
### @param {String} value
### @returns {boolean} 参数值或者 boolean


## isAndroid  Android验证
### 使用方法： isAndroid
### @param {String} value
### @returns {boolean} 参数值或者 boolean


## toPercent  返回一条数据的百分比
### 使用方法： toPercent(num, total)
### @param {Number,Number} value
### @returns {String}


## getIntNum  获取两个数之差 返回整数
### 使用方法： getIntNum(min, max)
### @param {Number,Number} min,max
### @returns {Number}

## dealParams  处理选择多项时的参数
### 使用方法： dealParams(statusArray)
### [1,2,3] ==> '1,2,3',提交时处理参数
### @param {Array} statusArray
### @returns {String}

## toArry  	字符串转数组
### 使用方法： toArry(param)
### 字符串转数组 获取时处理数据
### '1,2,3' ==> [1,2,3]
### @param {String} param
### @returns {Array}

## splitGroup  数据分组
### 使用方法： splitGroup(list, needLen)
### 数据分组 适用于轮播等  [{}, {}, {}] ==> [[{}, {}], [{}]]
### @param {Array, Number}  list, needLen
### @returns {Array}