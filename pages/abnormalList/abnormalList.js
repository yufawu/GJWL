// pages/abnormalList/abnormalList.js
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
const utils = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchValue: null, //搜索关键词
        noticeList: null,
        pages: 1,
        totalPages: null, //总页数
        showCount: 15, //返回数据的个数
        listLength: '', //返回数组的长度，根据这个值判断，是否最后一页
        isEmpty: true, //用于判断返回数据是否为空数组，默认为空
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
        this.getNoticeList(this.data.pages)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    onValueChange(e) {
        this.setData({
            searchValue: e.detail
        })
    },
    onSearch() { //搜索
        this.data.pages = 1
        this.getNoticeList(this.data.pages, this.data.searchValue)
        this.setData({
            noticeList: [],
            isEmpty: true,
        })
    },
    onCancel() { //取消搜索


    },
    onSearchClick() {
        this.data.pages = 1
        this.getNoticeList(this.data.pages, this.data.searchValue)
        this.setData({
            noticeList: [],
            isEmpty: true,
        })
    },
    getNoticeList(pages, keyWord) {
        let that = this
        let params = {
            pageNum: pages,
            pageSize: this.data.showCount
        }
        if (keyWord) {
            params.orderNo = this.trim(keyWord)
        }
        http.get(api.PackAbnormal, params).then((res) => {

            console.log(res.data, '异常件' + that.data.totalPages)
            let noticeListChange = res.data.data
            if (noticeListChange.length > 0) { //如果有数据
                let searchList = [];
                //如果isEmpty是true从data中取出数据，否则先从原来的数据继续添加
                this.data.isEmpty ? searchList = noticeListChange : searchList = this.data.noticeList.concat(noticeListChange)
                that.data.totalPages = that.pageCount(res.data.total, that.data.showCount)
                this.setData({
                    noticeList: searchList,
                })
            }
        })
    },
    viewDetail(e) {
        let id = e.current
        app.globalData.abnormalId = e.currentTarget.dataset.id
        console.log('id', app.globalData.abnormalId)
        wx.navigateTo({
            url: '../abnormalClaim/abnormalClaim'
        })

    },
    trim(str) { //去掉空格
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    pageCount(totalnum, limit) { //计算总页数 totalnum-总条数  limit-每页条数
        return totalnum > 0 ? ((totalnum < limit) ? 1 : ((totalnum % limit) ? (parseInt(totalnum / limit) + 1) : (totalnum / limit))) : 0;
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
        console.log('上划加载更多')
        if (this.data.pages < this.data.totalPages) { //判断是否为最后一页
            this.data.pages++ //页数加1
                this.data.isEmpty = false //触发到上拉事件，把isFromSearch设为为false
            this.getNoticeList(this.data.pages, this.data.searchValue)
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})