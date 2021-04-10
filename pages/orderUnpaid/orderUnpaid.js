// pages/orderUnpaid/orderUnpaid.js
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
const utils = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        unpaidList: [{
                title: "11111111",
                price: 0.1,
                cwt: 1
            },
            {
                title: "2222222",
                price: 0.2,
                cwt: 2
            },
            {
                title: "3333333",
                price: 0.3,
                cwt: 3
            }
        ],
        goodsId: null, //支付订单的id
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

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.getOrderUnpaid()
    },
    getOrderUnpaid() {
        let that = this
        let params = {
            "userId": wx.getStorageSync('userId')
        }
        http.get(api.OrderUnpaid, params).then((res) => {
            console.log('未支付订单列表', res.data.data)
            that.setData({
                unpaidList: res.data.data
            })
        })
    },
    payment(e) { //获取code，订单号
        let that = this
        this.data.goodsId = e.currentTarget.dataset.id
        console.log("订单信息", this.data.goodsId)
        wx.login({
            success(res) {
                if (res.code) {
                    that.toPay(res.code, that.data.goodsId)
                }
            }
        })

    },
    toPay(code, goodsId) { //获取返回的信息，调取支付
        let params = {
            "code": code,
            "goodsId": goodsId
        }
        http.get(api.OrderPayment, params).then((res) => {
            if (res.data.code == 0) {
                const data = res.data.data
                console.log(data, '获取支付信息')
                wx.requestPayment({
                    timeStamp: data.timeStamp,
                    nonceStr: data.nonceStr,
                    package: data.packageValue,
                    signType: data.signType,
                    paySign: data.paySign,
                    success: function(res) {
                        console.log(res);
                        wx.showToast({
                            title: "支付成功！",
                            duration: 2000,
                        });

                    },
                    fail: function(res) {
                        console.log(res);
                    },
                });
            } else {

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