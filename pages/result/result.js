// pages/result/result.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nickname: '咕噜咕噜麻球球',
        provinceNum: 10,
        foodNum: 1000,
        surpassPercent: 66.67,
        ana: '对于吃货来说，真正的安全感就是打开冰箱，看到冰箱里满满的都是好吃的。' 
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        // var provinceNum = wx.getStorageSync('tempAllProvinces').length
        // var foodNum = wx.getStorageSync('tempAllFoods').length
        // var nickname = app.globalData.userInfo.nickName
        // var avatar = app.globalData.userInfo.avatarUrl
        // this.setData({
        //     nickname: nickname,
        //     avatar: avatar,
        //     provinceNum: provinceNum,
        //     foodNum: foodNum,
        //     surpassPercent: options.surpassPercent,
        //     ana: options.ana
        // })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var context = wx.createCanvasContext('share')
        var windowWidth = wx.getSystemInfoSync().windowWidth
        var windowHeight = wx.getSystemInfoSync().windowHeight
        context.drawImage('../../images/backimg-result.png', 0, 0, windowWidth, windowHeight)
        
        context.setFillStyle('white')
        context.fillRect(windowWidth * 0.1, 75, windowWidth * 0.8, windowHeight * 0.4)

        // 头像
        context.save()
        context.beginPath()
        context.arc(windowWidth/2, 75, 50, 0, 2 * Math.PI)
        context.clip()
        context.drawImage('../../images/erke.jpg', (windowWidth-100)/2, 25, 100, 100)
        context.restore()
        
        context.draw()
        // context.draw(false, this.getTempFilePath())
    },

    //获取临时路径
    getTempFilePath: function () {
        wx.canvasToTempFilePath({
            canvasId: 'share',
            success: (res) => {
                this.setData({
                    shareTempFilePath: res.tempFilePath
                })
            }
        })
    },

    //保存至相册
    saveImageToPhotosAlbum: function () {
        if (!this.data.shareTempFilePath) {
            wx.showModal({
                title: '提示',
                content: '图片绘制中，请稍后重试',
                showCancel: false
            })
        }
        wx.saveImageToPhotosAlbum({
            filePath: this.data.shareTempFilePath,
            success: (res) => {
                console.log(res)
            },
            fail: (err) => {
                console.log(err)
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: this.data.ana,
            path: '/pages/guide/guide'
        }
    }
})