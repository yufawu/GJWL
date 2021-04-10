// pages/orderDetail/orderDetail.js
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderDetail: null
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
        this.getOrderDetail()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    getOrderDetail() {
        let that = this
        let params = {
            "goodsId": app.globalData.orderId
        }
        http.get(api.OrderDetail, params).then((res) => {
            that.setData({
                orderDetail: res.data.data
            })
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