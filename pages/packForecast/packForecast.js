// pages/packForecast/packForecast.js
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
const utils = require('../../utils/util.js');
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // forecastList: [{}, {}],
        forecastList: [{
            "hawbNo": null,
            "pcs": 1, //商品数量
            "expressCompany": null,
            "productName": null,
            "svalue": null,
            "remark": null,
            "goodsType": null,
            "brand": null, //品牌
            "isUnpack": 0, //是否拆包
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
        indexExpress: null, //当前选择的快递下标
        indexGoodsType: null, //当前选择的物品属性下标
        radio: '0',
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
    onRidioClick(event) { //是否拆包
        console.log(event, '是否拆包')
        this.setData({

        })

    },
    pcsChange(e) { //商品数量
        const idx = e.currentTarget.dataset.index
        this.data.forecastList[idx].pcs = e.detail
    },
    expressCompanyChange(e) { //选择的快递公司名称
        console.log('快递公司名称', e)
        const idx = e.currentTarget.dataset.index
        this.data.forecastList[idx].expressCompany = e.detail
    },
    hawbNoChange(e) { //快递单号
        const idx = e.currentTarget.dataset.index
        console.log(idx, 'danho')
        this.data.forecastList[idx].hawbNo = e.detail
    },
    productNameChange(e) { //物品名称
        const idx = e.currentTarget.dataset.index
        this.data.forecastList[idx].productName = e.detail
    },
    svalueChange(e) { //物品价值
        const idx = e.currentTarget.dataset.index
        this.data.forecastList[idx].svalue = e.detail
    },
    goodsTypeChange(e) { //物品属性
        const idx = e.currentTarget.dataset.index
        this.data.forecastList[idx].goodsType = e.detail
    },
    remarkChange(e) { //商品备注
        const idx = e.currentTarget.dataset.index
        this.data.forecastList[idx].remark = e.detail
    },

    forecastAdd() { //添加一个包裹
        var lists = this.data.forecastList
        var newData = {
            "hawbNo": null,
            "pcs": null,
            "expressCompany": null,
            "productName": null,
            "svalue": null,
            "remark": null,
            "goodsType": null,
            "brand": null, //品牌
            "isUnpack": 0, //是否拆包
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
    onExpressClick(e) {
        console.log('选择快递下标', e.currentTarget.dataset.index)
        this.setData({
            showExpress: true,
            indexExpress: e.currentTarget.dataset.index
        });
    },
    onExpressClose() {
        console.log('关闭快递选择')
        this.setData({ showExpress: false });
    },
    onExpressSelect(event) {
        let idx = this.data.indexExpress
        console.log('选择快递' + idx, event, event.detail)

        this.data.forecastList[idx].expressCompany = event.detail.name
        this.setData({
            forecastList: this.data.forecastList
        })
    },
    onGoodsClick(e) {
        this.setData({
            showGoods: true,
            indexGoodsType: e.currentTarget.dataset.index
        });
    },
    onGoodsClose() {
        console.log('关闭货物属性选择')
        this.setData({ showGoods: false });
    },
    onGoodsSelect(event) {
        let idx = this.data.indexGoodsType
        console.log('选择货物属性', event, event.detail)
        this.data.forecastList[idx].goodsType = event.detail.name
        this.setData({
            forecastList: this.data.forecastList
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
    packDelete(e) { //删除包裹
        Dialog.confirm({
                title: "删除该包裹",
                message: "确认删除该包裹",
                confirmButtonText: "删除",
            })
            .then(() => {
                // on confirm
                let idx = e.currentTarget.dataset.index
                if (idx > -1) {
                    this.data.forecastList.splice(idx, 1)
                }
                let deleteList = this.data.forecastList
                console.log('确认删除，删除后的数据', deleteList)
                this.setData({
                    forecastList: deleteList
                })

            })
            .catch(() => {
                // on cancel
                console.log('取消删除')
            });


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