//index.js
const common = require('../../common/common.js')

//获取应用实例
const app = getApp()

Page({
  data: {
    provinces: [],
    foods: [],
    submitData: [],
    tempData: [],
    animationData: {}
  },

  onLoad: function() {
    this.setData({
      provinces: common.provinces
    })
  },

  onShowFoods: function(e) {
    var self = this
    var provinceId = e.currentTarget.dataset.id;
    console.log(provinceId)
    self.setData({foods: []})
    wx.showLoading({
      title: '正在加载中...',
    })
    common.getFoodsByProvinceId('/food/find/' + provinceId + '/1').then(res => {
      console.log(res)
      if (res && res.code == 'E0000') {
        self.setData({
          foods: res.data.foodList
        })
        wx.hideLoading()
      }
    })
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })

    animation.translateX(-375).step()

    self.setData({
      animationData: animation.export()
    })
  },

  onHideFoods: function() {
    var self = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })
    self.animation = animation
    animation.translateX(375).step()
    self.setData({
      animationData: animation.export()
    })
  }

})