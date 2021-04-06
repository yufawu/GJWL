// pages/myCode/myCode.js
const api = require('../../network/api.js')
const http = require('../../network/http.js')
const utils = require('../../utils/util.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        codeUrl: null,
        accessToken: '', //小程序token值
        scene: null, //携带参数的码
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.personalQrCode()
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
    previewCodeImage() {
        wx.previewImage({
            current: this.data.codeUrl,
            urls: [this.data.codeUrl]
        })
    },
    codeImageError() {
        wx.showToast({
            title: '获取我的二维码失败',
            icon: 'none'
        })
    },
    personalQrCode() { //向微信后台获取小程序码
        let qrImage = wx.getStorageSync('qrImg')
        if (!qrImage) { //判断之前是否生成过
            let objQrCode = {
                "userId": wx.getStorageSync('userId')
            }
            http.get(api.GetQrCode, objQrCode).then((res) => {
                console.log(res, "code")
                let base64Image = 'data:image/png;base64,' + res.data
                this.setData({
                    codeUrl: base64Image
                })
                wx.setStorageSync('qrImg', base64Image) //保存到本地
            })
        } else {
            this.setData({
                codeUrl: qrImage
            })
        }
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