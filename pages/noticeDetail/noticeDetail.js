// pages/noticeDetail/noticeDetail.js
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
const utils = require('../../utils/util.js');
const wxParse = require('../../wxParse/wxParse.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        newsId: null, //新闻id
        newsDetails: null, //新闻详情
        detailContent: null,
        color: 'rgba(0,0,0,0.1)',
        rows: [],
        cols: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log('details', options)
        if (options.fid) {
            this.data.newsId = options.fid //保存id 分享时使用
            this.getDetail(this.data.newsId)
        } else {
            this.data.newsId = app.globalData.noticeId
            this.getDetail(this.data.newsId)
        }
        if (options.promoterOpenId) {
            app.globalData.promoterOpenId = options.promoterOpenId
        }
        console.log('新闻分享openid', this.data.newsId, app.globalData.promoterOpenId)

        // this.waterMark()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        // this.getDetail()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    getDetail(newsId) { //获取详情
        let that = this
        let params = {
            "id": newsId
        }
        http.get(api.GetNoticeDetail, params).then((res) => {

            this.setData({
                newsDetails: res.data.data
            })
            let newDetailContent = this.data.newsDetails.textBody
            wxParse.wxParse('detailContent', 'html', newDetailContent, that) //解析HTML
            console.log('公告详情', res.data.data)
        })
    },
    waterMark() { //去水印
        const { windowHeight } = wx.getSystemInfoSync();
        const rows = 3;
        const cols = Math.ceil(windowHeight / 120);
        this.setData({
            rows: new Array(rows),
            cols: new Array(cols)
        });
    },
    goHome() {
        wx.switchTab({
            url: '../index/index'
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
        return {
            title: this.data.newsDetails.ftitle,
            path: '/pages/noticeDetail/noticeDetail?fid=' + this.data.newsId + "&promoterOpenId=" + wx.getStorageSync('openId'),
            success() {
                console.log("转发成功" + res)
            },
            fail() {
                console.log("转发失败" + res)
            }
        }
    },
})