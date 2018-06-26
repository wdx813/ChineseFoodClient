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
        provinceName: "",
        isDisabled: true
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
        // 动画效果
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

    // 防止滑动的透传
    move: function() {
        
    },

    chooseFoods: function(e) {
        var self = this
        var index = e.currentTarget.dataset.index
        var fid = e.currentTarget.dataset.fid
        var pid = e.currentTarget.dataset.pid
        var foods = self.data.foods
        var status = foods[index].status
        var eatNum = foods[index].eatNum

        var tempFood = wx.getStorageSync('tempFood#' + pid)
        var tempAllFoods = wx.getStorageSync('tempAllFoods')
        var tempAllProvinces = wx.getStorageSync('tempAllProvinces')
        if (!tempFood) {
            var tempFood = []
        }
        if (!tempAllFoods) {
            var tempAllFoods = []
        }
        if (!tempAllProvinces) {
            var tempAllProvinces = []
        }
        if (!status) {
            status = true
            eatNum ++
            tempFood.add(fid)
            tempAllFoods.add(fid)
        } else {
            status = false
            eatNum --
            tempFood.remove(fid)
            tempAllFoods.remove(fid)
        }
        //统计品尝过的省份
        if(tempFood.length > 0) {
            tempAllProvinces.add(pid)
        } else {
            tempAllProvinces.remove(pid)
        }
        console.log(tempFood)
        console.log('全部美食',tempAllFoods)
        console.log('全部省份',tempAllProvinces)

        foods[index].status = status
        foods[index].eatNum = eatNum
        
        //统计每个省份品尝过的美食
        var provinces = this.data.provinces
        for (var i = 0; i < provinces.length; i++) {
            if (pid == provinces[i].id) {
                provinces[i].num = tempFood.length
            }
        }
        if (tempAllFoods && tempAllFoods.length > 0) {
            self.setData({ isDisabled: false })
        }
        self.setData({foods: foods, provinces: provinces})

        wx.setStorageSync('tempFood#' + pid, tempFood)
        wx.setStorageSync('tempAllFoods', tempAllFoods)
        wx.setStorageSync('tempAllProvinces', tempAllProvinces)
        wx.setStorageSync('foods#' + pid, foods)
    },

    onSubmit: function() {
        var tempAllFoods = wx.getStorageSync('tempAllFoods')
        var data = {
            openId: app.globalData.openId,
            foodIds: tempAllFoods
        }
        wx.showLoading({
            title: '正在提交...',
        })
        common.submitFoodData('/user/submit', data).then(res => {
            console.log(res)
            if(res && res.code == 'E0000') {
                wx.navigateTo({
                    url: '/pages/result/result?surpassPercent=' + res.data.surpassPercent,
                })
                wx.hideLoading()
            }
        })
    }

})

Array.prototype.add = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            return
        }
    }
    this.push(val)
};


Array.prototype.remove = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            this.splice(i, 1);
        }
    }
};