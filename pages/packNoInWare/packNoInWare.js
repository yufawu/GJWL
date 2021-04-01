// pages/packNoInWare/packNoInWare.js
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
const utils = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        packList: null
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
        this.noInWare()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    noInWare() { //未入库订单
        let that = this
        let params = {
            "userId": wx.getStorageSync('userId')
        }
        console.log(params, 'params')
        http.get(api.NoInWare, params).then((res) => {
            console.log("请求结果", res.data.data)
            that.setData({
                packList: res.data.data
            })

        })
        console.log("未入库信息", this.data.packList)
    },
    viewDetail(e) { //查看详情
        console.log(e, '详细信息')
        app.globalData.packageId = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../packForecastDetail/packForecastDetail'
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