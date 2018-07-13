const utils = require('../utils/util.js')

// const baseUrl = "http://192.168.12.38:8080/ChineseFoodServer"
// const baseUrl = "http://60.205.1.4:8881"
const baseUrl = "http://127.0.0.1"
/**
 * 登录验证
 */
function checkLogin(url, jsCode) {
    return sendRequest(url, jsCode).then(res => res.data)
}

/**
 * 用户注册
 */
function saveUser(url, data) {
    return sendRequest(url, data).then(res => res.data)
}

/**
 * 获取美食
 */
function getFoodsByProvinceId(url, data) {
    return sendRequest(url, data).then(res => res.data)
}

/**
 * 更新吃过该美食的人数
 */
function updateFoodEatNum(url, data) {
    return sendRequest(url, data).then(res => res.data)
}

/**
 * 提交美食数据，获取结果
 */
function submitFoodData(url, data) {
    return sendRequest(url, data).then(res => res.data)
}

function createParams() {
    var token = wx.getStorageSync('token')
    var obj = new Object()
    obj.openId = wx.getStorageSync('openId')
    obj.timestamp = new Date().getTime()
    var str = 'openId=' + obj.openId + '&timestamp=' + obj.timestamp + '&token=' + token
    obj.sign = utils.hex_md5(str).toUpperCase()
    return obj
}

/**
 * 封装请求函数
 */
function sendRequest(url, data) {
    var openId =  wx.getStorageSync('openId')
    var token = wx.getStorageSync('token')
    return new Promise((resole, reject) => {
        wx.request({
            url: baseUrl + url,
            method: 'post',
            data: data,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'openId': openId,
                'token': token
            },
            success: resole,
            fail: reject
        })
    })
}

/**
 * 上传文件
 */
function uploadFile(url, data, filePath) {
    return new Promise((resole, reject) => {
        wx.uploadFile({
            url: baseUrl + url,
            filePath: filePath,
            name: 'file',
            formData: data,
            success: resole,
            fail: reject
        })
    })
}

/**
 * 生成签名
 */
function buildSign(timestamp) {
    var openId = wx.getStorageSync('openId')
    var token = wx.getStorageSync('token')
    var str = 'openId=' + openId + '&timestamp=' + timestamp + '&token=' + token
    var sign = utils.hex_md5(str).toUpperCase()
    return sign
}

// 省份数据
var provinces = [
    {
        "id": 1,
        "name": "北京",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 2,
        "name": "安徽",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 3,
        "name": "澳门",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 4,
        "name": "福建",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 5,
        "name": "甘肃",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 6,
        "name": "广东",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 7,
        "name": "广西",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 8,
        "name": "贵州",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 9,
        "name": "海南",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 10,
        "name": "河北",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 11,
        "name": "河南",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 12,
        "name": "黑龙江",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 13,
        "name": "重庆",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 14,
        "name": "湖北",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 15,
        "name": "湖南",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 16,
        "name": "吉林",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 17,
        "name": "江苏",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 18,
        "name": "江西",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 19,
        "name": "辽宁",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 20,
        "name": "内蒙古",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 21,
        "name": "宁夏",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 22,
        "name": "青海",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 23,
        "name": "山东",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 24,
        "name": "山西",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 25,
        "name": "陕西",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 26,
        "name": "上海",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 27,
        "name": "四川",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 28,
        "name": "台湾",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 29,
        "name": "天津",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 30,
        "name": "西藏",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 31,
        "name": "香港",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 32,
        "name": "新疆",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 33,
        "name": "云南",
        "imgUrl": "",
        "num": 0
    },
    {
        "id": 34,
        "name": "浙江",
        "imgUrl": "",
        "num": 0
    }
]

module.exports = {
    checkLogin,
    uploadFile,
    provinces,
    saveUser,
    getFoodsByProvinceId,
    updateFoodEatNum,
    submitFoodData,
    buildSign,
    createParams
}