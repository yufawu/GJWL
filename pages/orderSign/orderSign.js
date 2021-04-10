// pages/orderSign/orderSign.js
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
const utils = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderSignList: null,
        emptyShow: false, //是否显示空状态
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.getOrderSign()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    getOrderSign() {
        let that = this
        let params = {
            "userId": wx.getStorageSync('userId')
        }
        http.get(api.OrderSign, params).then((res) => {
            if (res.data.data.length == 0) { //空数组
                that.setData({
                    emptyShow: true
                })
            } else {
                that.setData({
                    emptyShow: false,
                    orderSignList: res.data.data
                })
            }
        })
    },
    viewDetail(e) {
        app.globalData.orderId = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../orderDetail/orderDetail'
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