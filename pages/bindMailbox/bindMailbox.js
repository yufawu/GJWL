// pages/bindMailbox/bindMailbox.js
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
const utils = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        oldMailbox: null, //旧手机号
        mailbox: null, //新手机号
        time: 120 * 1000, //倒计时的时间，精确到秒
        showCountdown: false, //是否显示倒计时
        verifyCode: null, //验证码
        returnVerify: null, //返回的验证码

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        if (wx.getStorageSync('mailbox')) { //判断之前是否绑定过手机
            this.setData({
                oldMailbox: wx.getStorageSync('mailbox')
            })
        }

    },
    mailboxChange(e) {
        this.data.mailbox = e.detail

    },
    verifyCodeChange(e) {
        this.data.verifyCode = e.detail
    },

    countDownFinish() { //倒计时结束后的方法
        this.setData({
            showCountdown: false
        })
    },
    getCode() { //获取验证码
        let that = this
        if (this.data.mailbox == null) { //
            wx.showToast({
                title: '请输入邮箱',
                icon: 'none'
            })
        } else {
            this.setData({
                showCountdown: true
            })
            let params = { //获取验证码
                "email": this.data.mailbox,
                "userId": wx.getStorageSync('userId'),
            }
            http.get(api.GetEmailCode, params).then((res) => {
                console.log(res.data, '邮箱验证码')
                    // that.data.returnVerify = res.data.data.verify
            })
        }

    },
    submit() { //保存手机号
        let that = this
        if (this.data.mailbox && this.data.verifyCode) {
            let params = {
                "userId": wx.getStorageSync('userId'),
                "email": this.data.mailbox,
                "code": this.data.verifyCode
            }
            http.get(api.BindEmail, params).then((res) => {
                if (res.data.msg == '操作成功') {
                    wx.setStorageSync('mailbox', res.data.email) //成功后更新手机号
                    wx.switchTab({
                        url: '../mine/mine',
                    })
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }
            })
        } else {
            wx.showToast({
                title: '请输入正确的验证码',
                icon: 'none'
            })
        }

    },
    setPhone() { //重置手机号
        let params = null
        if (this.data.oldMailbox == null) {
            params = {
                "userId": wx.getStorageSync("userId"),
                "newTel": this.data.phone
            }
        } else {
            params = {
                "userId": wx.getStorageSync("userId"),
                "tel": this.data.oldPhone,
                "newTel": this.data.phone
            }
        }
        http.get(api.BindPhone, params).then((res) => {
            console.log("重置手机号", res.data)
            if (res.data.msg == '操作成功') {
                wx.setStorageSync('tel', res.data.tel) //成功后更新手机号
                wx.switchTab({
                    url: '../mine/mine',
                })
            } else {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                })
            }
        })
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