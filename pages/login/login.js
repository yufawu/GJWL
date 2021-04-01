// pages/login/login.js
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
const utils = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isHide: false

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        wx.getSetting({
            success: function(res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function(res) {
                            // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
                            // 根据自己的需求有其他操作再补充
                            // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
                            console.log("用户已经授权过")
                            that.weChatLogin()

                            // wx.reLaunch({
                            //     url: '../index/index'
                            // })
                        }
                    });
                } else {
                    // 用户没有授权
                    // 改变 isHide 的值，显示授权页面
                    that.setData({
                        isHide: true
                    });
                }
            }
        });





    },

    bindGetUserInfo: function(e) {
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            var that = this;
            // 获取到用户的信息了，打印到控制台上看下
            console.log('获取的用户信息', e.detail.userInfo);
            this.weChatLogin()
            wx.setStorageSync('userInfo', e.detail.userInfo)
                // wx.reLaunch({ //跳转页面
                //         url: '../index/index'
                //     })
                // wx.navigateBack() //返回上一页
                //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
            that.setData({
                isHide: false
            });
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function(res) {
                    // 用户没有授权成功，不需要改变 isHide 的值
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”');
                    }
                }
            });
        }


    },
    weChatLogin() { //用户登录
        wx.login({
            success: res => {
                // 获取到用户的 code 之后：res.code
                let userInfo = wx.getStorageSync('userInfo')
                let loginParams = {
                    "code": res.code,
                    "avatarUrl": userInfo.avatarUrl,
                    "nickName": userInfo.nickName
                }
                console.log(loginParams, '请求参数')
                http.post(api.WechatLogin, loginParams).then((resMsg) => {
                    console.log('用户登录', resMsg)
                    wx.setStorageSync('openId', resMsg.data.data.openId)
                    wx.setStorageSync('userId', resMsg.data.data.id)
                    app.globalData.userId = resMsg.data.data.id
                })
            }
        });
        wx.navigateBack() //返回上一页
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})