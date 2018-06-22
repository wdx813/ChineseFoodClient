//index.js
const common = require('../../common/common.js')

//获取应用实例
const app = getApp()
const windowWidth = wx.getStorageSync('windowWidth')
Page({
    data: {
        provinces: [],
        foods: [],
        submitData: [],
        tempData: [],
        animationData: {},
        page: 1,
        haseMore: true,
        provinceName: ""
    },

    onLoad: function () {
        this.setData({
            provinces: common.provinces
        })
    },

    onShowFoods: function (e) {
        var self = this
        var provinceId = e.currentTarget.dataset.id
        var provinceName = e.currentTarget.dataset.name
        self.setData({ foods: [], page: 1, haseMore: true, provinceName: provinceName })
        var foods = wx.getStorageSync('foods#' + provinceId)
        if (foods) {
            self.setData({ foods: foods })
        } else {
            self.loadFoods(provinceId, 1)
        }
        
        var animation = wx.createAnimation({
            duration: 100,
            timingFunction: 'linear'
        })

        animation.translateX(-windowWidth).step()

        self.setData({
            animationData: animation.export()
        })
    },

    loadFoods: function(provinceId, page) {
        var self = this
        wx.showLoading({
            title: '正在加载中...',
        })
        common.getFoodsByProvinceId('/food/find/' + provinceId + '/' + page).then(res => {
            console.log(res)
            if (res && res.code == 'E0000') {
                var foodList = res.data.foodList
                if (foodList.length) {
                    self.setData({
                        foods: self.data.foods.concat(res.data.foodList),
                        page: page
                    })
                } else {
                    self.setData({haseMore: false})
                }
                wx.setStorageSync('foods#' + provinceId, self.data.foods)
                wx.hideLoading()
            }
        })
    },

    onHideFoods: function () {
        var self = this;
        var animation = wx.createAnimation({
            duration: 100,
            timingFunction: 'linear'
        })
        self.animation = animation
        animation.translateX(windowWidth).step()
        self.setData({
            animationData: animation.export()
        })
    },

    onScrollToLower: function(e) {
        var self = this
        var provinceId = e.currentTarget.dataset.id
        var page = self.data.page + 1
        if(self.data.haseMore) {
            self.loadFoods(provinceId, page)
        }
    },

    move: function() {
        
    }

})