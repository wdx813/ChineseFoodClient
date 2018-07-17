// pages/guide/guide.js
const app = getApp()
const common = require('../../common/common.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    getUserInfo: function (e) {
        if (e.detail.userInfo) {
            if (!app.globalData.userInfo) {
                var timestamp = new Date().getTime()
                var sign = common.buildSign(timestamp)
                // var user = {
                //     openId: app.globalData.openId,
                //     token: app.globalData.token,
                //     timestamp: timestamp,
                //     sign: sign,
                //     nickname: e.detail.userInfo.nickName,
                //     gender: e.detail.userInfo.gender,
                //     avatar: e.detail.userInfo.avatarUrl
                // }
                var user = common.createParams()
                user.nickname = e.detail.userInfo.nickName
                user.gender = e.detail.userInfo.gender
                user.avatar = e.detail.userInfo.avatarUrl
                app.globalData.userInfo = e.detail.userInfo
                wx.showLoading({
                    title: '请稍后...',
                })
                // 保存用户数据
                common.saveUser('/_API/saveUser', user).then(res => {
                    console.log(res);
                    wx.hideLoading()
                    if(res.code == 'E0000') {
                        wx.redirectTo({
                            url: '/pages/index/index',
                        })
                    } else {
                        wx.showToast({
                            title: res.msg,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                })
            } else {
                console.log('开始...1')
                if (app.globalData.openId && app.globalData.token) {
                    console.log('开始...2')
                    wx.showLoading({
                        title: '请稍后...',
                    })
                    wx.redirectTo({
                        url: '/pages/index/index',
                        success: function() {
                            wx.hideLoading()
                        }
                    })
                } else {
                    wx.showToast({
                        title: '系统维护中，请稍后重试',
                        icon: 'none',
                        duration: 2000
                    })
                }
                
            }
        } else {
            wx.showModal({
                title: '提示',
                content: '您点击了拒绝授权，将无法正常显示个人信息，点击确定重新获取授权',
                success: res => {
                    if (res.confirm) {
                        wx.openSetting({
                            success: function (res) {
                                if (res.authSetting["scope.userInfo"]) {
                                    wx.getUserInfo({
                                        success: res => {
                                            app.globalData.userInfo = res.userInfo
                                            var user = {
                                                openId: app.globalData.openId,
                                                nickname: res.userInfo.nickName,
                                                gender: res.userInfo.gender,
                                                avatar: res.userInfo.avatarUrl
                                            }
                                            // 保存用户数据
                                            common.saveUser('/user/save', user).then(res => {
                                                console.log(res)
                                                if (res.code == 'E0000') {
                                                    wx.redirectTo({
                                                        url: '/pages/index/index',
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            }
                        })
                    } else {
                        // 关闭弹窗
                        wx.hideToast()
                    }
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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

    }
})