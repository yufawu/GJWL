// pages/addressManage/addressManage.js
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
const utils = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        search: "",
        addressList: [] //
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
        this.getReceiver();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    onSearch(e) {
        console.log('搜索', e)
    },
    onCancel() {
        console.log('取消搜索', e)
    },
    addressAdd() { //增加地址
        console.log('增加地址')
        wx.navigateTo({
            url: '../addressAdd/addressAdd'
        })
    },

    getReceiver() {
        let that = this
        let params = {
            "userId": wx.getStorageSync('userId')
        }
        console.log(params, 'params')
        http.get(api.GetReceiver, params).then((res) => {
            console.log("请求结果", res.data.data)
            that.setData({
                addressList: res.data.data
            })
            wx.setStorageSync('addressList', res.data.data)
            console.log('地址列表', that.data.addressList)
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