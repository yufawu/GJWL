// pages/bindPhone/bindPhone.js
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
const utils = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        oldPhone: null, //旧手机号
        phone: null, //新手机号
        time: 60 * 1000, //倒计时的时间，精确到秒
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
        if (wx.getStorageSync('tel')) { //判断之前是否绑定过手机
            this.setData({
                oldPhone: wx.getStorageSync('tel')
            })
        }

    },
    phoneChange(e) {
        this.data.phone = e.detail

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
        if (this.data.phone == null) { //
            wx.showToast({
                title: '请输入手机号',
                icon: 'none'
            })
        } else {
            this.setData({
                showCountdown: true
            })
            let verifyCodeParameter = { //获取验证码
                phone: this.data.phone,
                token: app.globalData.token,
            }
            let fkeyVerifyCode = utils.getFkey(verifyCodeParameter); //fkey加密
            http.post('https://api-sys.xfx361.com/appMiniPro/v1/getVerifyCode', fkeyVerifyCode).then((res) => {
                that.data.returnVerify = res.data.data.verify
            })
        }

    },
    submit() { //保存手机号
        let that = this
        if (this.data.verifyCode === this.data.returnVerify) {
            let objBindPhone = {
                phone: this.data.phone,
                token: app.globalData.token,
                verifyCode: this.data.verifyCode
            }
            let fkeyBindPhone = utils.getFkey(objBindPhone);
            http.post('https://api-sys.xfx361.com/appMiniPro/v1/bindPhone', fkeyBindPhone).then((res) => {
                if (res.data.msg == 'success') {
                    that.setPhone()
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
        if (this.data.oldPhone == null) {
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