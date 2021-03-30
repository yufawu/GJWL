// pages/packForecast/packForecast.js
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
const utils = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // forecastList: [{}, {}],
        forecastList: [{
            "hawbNo": "",
            "pcs": null,
            "expressCompany": "",
            "productName": "",
            "svalue": null,
            "remark": "",
            "goodsType": ""
        }],
        expressList: [ //快递列表
            { name: "中通快递" },
            { name: "百世快递" }
        ],
        goodsList: [ //物品属性列表
            { name: "普货" },
            { name: "一般货物" }
        ],
        showExpress: false, //快递选择面板
        showGoods: false, //物品属性选择面板
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
        // this.getExpress()
        // this.getGoodsType()
        console.log('内容', this.data.forecastList)

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.setData({


        })
        console.log('选择框列表', this.expressList, this.goodsList)

    },
    onChange(e) { //数据双向绑定
        console.log(e, '数据双向绑定', e.detail)

        this.setData({
            [e.currentTarget.dataset.prop]: e.detail
        })
    },
    forecastAdd() { //添加一个包裹
        var lists = this.data.forecastList
        var newData = {
            "hawbNo": "",
            "pcs": null,
            "expressCompany": "",
            "productName": " ",
            "svalue": null,
            "remark": "",
            "goodsType": ""
        }
        lists.push(newData)
        console.log("列表内容", lists)
        this.setData({
            forecastList: lists
        })
    },
    submitForecast() { //提交预报
        console.log(this.data.forecastList, '预报信息')

    },
    onExpressClick() {
        this.setData({ showExpress: true });
    },
    onExpressClose() {
        console.log('关闭快递选择')
        this.setData({ showExpress: false });
    },
    onExpressSelect(event) {
        console.log('选择快递', event.detail)
        this.express = event.detail.name
        this.setData({
            express: this.express
        })
    },
    onGoodsClick() {
        this.setData({ showGoods: true });
    },
    onGoodsClose() {
        console.log('关闭货物属性选择')
        this.setData({ showGoods: false });
    },
    onGoodsSelect(event) {
        console.log('选择货物属性', event.detail)
        this.goods = event.detail.name
        this.setData({
            goods: this.goods
        })
    },
    getExpress() { //获取快递公司列表
        let that = this
        http.post(api.GetExpress).then((res) => {

            that.expressList = res.data.data
            console.log(res.data.data, '快递公司列表', that.expressList)
            that.setData({
                expressList: res.data.data
            })
        })

    },
    getGoodsType() { //获取快递公司列表
        let that = this
        http.post(api.GetGoodsType).then((res) => {
            console.log(res.data.data, '物品属性列表', this.goodsList)
            that.goodsList = res.data.data
            that.setData({
                goodsList: res.data.data
            })

        })
    },
    saoma: function(event) { // 允许从相机和相册扫码
        console.log(event, 'saoma')
        wx.scanCode({
            success: (res) => {
                this.setData({
                    inputValue: res.result
                });
                console.log(res, '扫码的值')
            }
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