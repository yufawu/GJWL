// pages/goodsAbnormal/goodsAbnormal.js
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
const utils = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        packList: null,
        emptyShow: true, //是否显示空状态

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
        this.abnormal()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    abnormal() { //异常的订单
        let that = this
        let params = {
            "userId": wx.getStorageSync('userId')
        }
        console.log(params, 'params')
        http.get(api.GoodsAbnormal, params).then((res) => {
            if (res.data.data.length == 0) { //空数组
                that.setData({
                    emptyShow: true
                })
            } else {
                let packListArr =res.data.data.map((item) =>{
                    if(item.detainRemark && item.detainRemark.length>50){
                        item.reasonCut = item.detainRemark.substring(0,50)+'......'
                    }else{
                        item.reasonCut = item.detainRemark
                    }
                    return item
                })
                that.setData({
                    emptyShow: false,
                    packList: packListArr
                })
            }


        })
    },
    viewDetail(e) { //查看详情
        app.globalData.goodsAbnormalDetail = e.currentTarget.dataset.item
        setTimeout(function(){
            wx.navigateTo({
                url: '../goodsAbnormalDetail/goodsAbnormalDetail'
            })
        },500)
     
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