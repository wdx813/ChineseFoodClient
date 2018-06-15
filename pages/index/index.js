//index.js
const common = require('../../common/common.js')

//获取应用实例
const app = getApp()

Page({
    data: {
        provinces: []
    },

    onLoad: function () {
        this.setData({
            provinces: common.provinces
        })
    },
})