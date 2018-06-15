const test_baseUrl = "http://localhost:8080/LoveLetterServer"
const baseUrl = "http://192.168.12.79:8080/LoveLetterServer"
/**
 * 登录验证
 */
function checkLogin(url, code) {
    return sendRequest(url, code).then(res => res.data)
}

/**
 * 封装请求函数
 */
function sendRequest(url, data) {
    return new Promise((resole, reject) => {
        wx.request({
            url: baseUrl + url,
            method: 'post',
            data: data,
            header: {
                'content-type': 'application/json'
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

// 省份数据
var provinces = [
    {
        "id": 1,
        "name": "北京",
        "imgUrl": ""
    },
    {
        "id": 2,
        "name": "安徽",
        "imgUrl": ""
    },
    {
        "id": 3,
        "name": "澳门",
        "imgUrl": ""
    },
    {
        "id": 4,
        "name": "福建",
        "imgUrl": ""
    },
    {
        "id": 5,
        "name": "甘肃",
        "imgUrl": ""
    },
    {
        "id": 6,
        "name": "广东",
        "imgUrl": ""
    },
    {
        "id": 7,
        "name": "广西",
        "imgUrl": ""
    },
    {
        "id": 8,
        "name": "贵州",
        "imgUrl": ""
    },
    {
        "id": 9,
        "name": "海南",
        "imgUrl": ""
    },
    {
        "id": 10,
        "name": "河北",
        "imgUrl": ""
    },
    {
        "id": 11,
        "name": "河南",
        "imgUrl": ""
    },
    {
        "id": 12,
        "name": "重庆",
        "imgUrl": ""
    },
    {
        "id": 13,
        "name": "黑龙江",
        "imgUrl": ""
    },
    {
        "id": 14,
        "name": "湖北",
        "imgUrl": ""
    },
    {
        "id": 15,
        "name": "湖南",
        "imgUrl": ""
    },
    {
        "id": 16,
        "name": "吉林",
        "imgUrl": ""
    },
    {
        "id": 17,
        "name": "江苏",
        "imgUrl": ""
    },
    {
        "id": 18,
        "name": "江西",
        "imgUrl": ""
    },
    {
        "id": 19,
        "name": "辽宁",
        "imgUrl": ""
    },
    {
        "id": 20,
        "name": "内蒙古",
        "imgUrl": ""
    },
    {
        "id": 21,
        "name": "宁夏",
        "imgUrl": ""
    },
    {
        "id": 22,
        "name": "青海",
        "imgUrl": ""
    },
    {
        "id": 23,
        "name": "山东",
        "imgUrl": ""
    },
    {
        "id": 24,
        "name": "山西",
        "imgUrl": ""
    },
    {
        "id": 25,
        "name": "陕西",
        "imgUrl": ""
    },
    {
        "id": 26,
        "name": "上海",
        "imgUrl": ""
    },
    {
        "id": 27,
        "name": "四川",
        "imgUrl": ""
    },
    {
        "id": 28,
        "name": "台湾",
        "imgUrl": ""
    },
    {
        "id": 29,
        "name": "天津",
        "imgUrl": ""
    },
    {
        "id": 30,
        "name": "西藏",
        "imgUrl": ""
    },
    {
        "id": 31,
        "name": "香港",
        "imgUrl": ""
    },
    {
        "id": 32,
        "name": "新疆",
        "imgUrl": ""
    },
    {
        "id": 33,
        "name": "云南",
        "imgUrl": ""
    },
    {
        "id": 34,
        "name": "浙江",
        "imgUrl": ""
    }
]

module.exports = {
    checkLogin: checkLogin,
    uploadFile: uploadFile,
    provinces: provinces
}