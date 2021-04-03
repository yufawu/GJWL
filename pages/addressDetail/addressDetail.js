// pages/addressDetail/addressDetail.js
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressDetail: null
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
        this.packForecastDetail()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    packForecastDetail() { //已入库订单
        let that = this
        console.log(app.globalData.packageId, 'id号')
        let params = {
            "id": app.globalData.addressId
        }
        http.get(api.GetReceiverDetail, params).then((res) => {
            console.log("请求结果", res.data.data)
            that.setData({
                addressDetail: res.data.data
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