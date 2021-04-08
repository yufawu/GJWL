// pages/informationNotice/informationNotice.js
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
const utils = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        noticeList: null,
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
        this.getNoticeList()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    getNoticeList() {
        let that = this
        let params = {
            "pageNum": 1,
            "pageSize": 10
        }
        http.get(api.GetNoticeList, params).then((res) => {
            console.log(res.data, '公告列表')
            that.setData({
                noticeList: res.data.rows
            })
        })
    },
    viewDetail(e) {
        let id = e.current
        app.globalData.noticeId = e.currentTarget.dataset.id
        console.log('noticeid', app.globalData.noticeId)
        wx.navigateTo({
            url: '../noticeDetail/noticeDetail'
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