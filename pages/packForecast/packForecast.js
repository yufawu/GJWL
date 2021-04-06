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
            "isUnpack": "0", //是否拆包
        }],
        expressList: null, //快递列表
        goodsList: null, //物品属性列表
        addressList: null, //收货地址列表
        showExpress: false, //快递选择面板
        showGoods: false, //物品属性选择面板
        showAddress: false, //收货地址选择面板
        indexExpress: null, //当前选择的快递下标
        indexGoodsType: null, //当前选择的物品属性下标
        isUnpack: '0',
        addressSelected: null, //已选择的收货地址信息
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
        this.getReceiver() //需要每次进入页面都更新个人地址


    },
    getReceiver() {
        let that = this
        let params = {
            "userId": wx.getStorageSync('userId')
        }
        console.log(params, 'params')
        http.get(api.GetReceiver, params).then((res) => {
            console.log("请求结果", res.data.data)
            if (res.data.data && res.data.data.length !== 0) { //数据不为空时保存
                that.setData({
                    addressList: res.data.data
                })
                wx.setStorageSync('addressList', res.data.data)
                console.log('地址列表', that.data.addressList)
            } else {
                Dialog.confirm({
                        title: "你当前暂无收货地址",
                        // message: "删除后需重新录入",
                        confirmButtonText: "去填写",
                    })
                    .then(() => {
                        // on confirm
                        console.log('去填写收货地址')
                        wx.navigateTo({
                            url: '../addressAdd/addressAdd'
                        })
                    })
                    .catch(() => {
                        // on cancel
                        console.log('取消删除')
                    });
            }

        })
    },
    onRidioClick(e) { //是否拆包
        const idx = e.currentTarget.dataset.index
        let name = e.currentTarget.dataset.name
        this.data.forecastList[idx].isUnpack = name
        console.log(name, e.currentTarget, '是否拆包' + idx, this.data.forecastList)
        this.setData({
            forecastList: this.data.forecastList
        })

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
    brandChange(e) { //物品品牌
        const idx = e.currentTarget.dataset.index
        this.data.forecastList[idx].brand = e.detail
    },
    svalueChange(e) { //物品价值
        const idx = e.currentTarget.dataset.index
        this.data.forecastList[idx].svalue = e.detail
    },
    goodsTypeChange(e) { //物品属性
        const idx = e.currentTarget.dataset.index
        this.data.forecastList[idx].goodsType = e.detail
    },
    pcsChange(e) { //商品数量
        const idx = e.currentTarget.dataset.index
        this.data.forecastList[idx].pcs = e.detail
    },
    remarkChange(e) { //商品备注
        const idx = e.currentTarget.dataset.index
        this.data.forecastList[idx].remark = e.detail
    },

    onExpressClick(e) {
        if (this.data.expressList == null) {
            this.getExpress()
        }
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
        if (this.data.goodsList == null) {
            this.getGoodsType()
        }
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
    onAddressClick(e) {
        this.setData({
            showAddress: true
        })

    },
    onAddressClose() {
        console.log('关闭收货选择')
        this.setData({ showAddress: false });

    },
    onAddressCancel() { //去增加地址
        console.log('去增加地址')
        wx.navigateTo({
            url: '../addressAdd/addressAdd'
        })
    },
    onAddressSelect(event) {
        console.log('选择收货地址', event, event.detail)
            // this.data.forecastList[idx].goodsType = event.detail.name
        this.setData({
            addressSelected: event.detail
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
    saoma: function(e) { // 允许从相机和相册扫码
        let idx = e.currentTarget.dataset.index
        console.log(e, 'saoma')
        wx.scanCode({
            success: (res) => {
                this.data.forecastList[idx].hawbNo = res.result
                this.setData({
                    forecastList: this.data.forecastList
                });
                console.log(res, '扫码的值')
            }
        })

    },
    packDelete(e) { //删除包裹
        Dialog.confirm({
                title: "确认删除该包裹信息",
                message: "删除后需重新录入",
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
    forecastAdd() { //添加一个包裹
        var lists = this.data.forecastList
        var newData = {
            "hawbNo": null,
            "pcs": 1,
            "expressCompany": null,
            "productName": null,
            "svalue": null,
            "remark": null,
            "goodsType": null,
            "brand": null, //品牌
            "isUnpack": "0", //是否拆包
        }
        lists.push(newData)
        console.log("列表内容", lists)
        this.setData({
            forecastList: lists
        })
    },
    // submitForecast() { //提交预报
    //     // this.getAuthorize()
    //     console.log(this.data.forecastList, '预报信息')

    // },
    submitForecast() { //提交预报 028DADD3991041E4B1168A2EA1D58CDE-小巫一号  08F91BA8DFA748E9A9FDCA13D99775A5
        let that = this
        if (this.data.addressSelected && this.data.forecastList) {
            let params = {
                "costomerId": wx.getStorageSync('userId'),
                "receiversendId": this.data.addressSelected.id,
                "preAwb": this.data.forecastList
            }
            console.log(params, 'params')
            http.post(api.SubmitForecast, params).then((res) => {
                console.log("请求结果", res.data)
                if (res.data.msg === "操作成功") {
                    Dialog.confirm({
                            title: "添加成功",
                            // message: "删除后需重新录入",
                            confirmButtonText: "继续录入",
                            cancelButtonText: "回到首页"
                        })
                        .then(() => {
                            // on confirm
                            console.log('去填写收货地址')
                            let resetForecastList = [{
                                "hawbNo": null,
                                "pcs": 1, //商品数量
                                "expressCompany": null,
                                "productName": null,
                                "svalue": null,
                                "remark": null,
                                "goodsType": null,
                                "brand": null, //品牌
                                "isUnpack": "0", //是否拆包
                            }]
                            that.setData({ //清空之填写的信息
                                forecastList: resetForecastList
                            })

                        })
                        .catch(() => {
                            // on cancel
                            console.log('取消删除')
                            wx.relaunch({
                                url: '../index/index'
                            })
                        });
                } else {
                    Toast('信息不完整，带*的都是必填内容')
                }

            })

        } else {
            Toast('信息不完整，带*的都是必填内容')
        }

    },
    getAuthorize() {
        console.log('获取授权信息')
        wx.requestSubscribeMessage({ //报名授权
            tmplIds: ['c6cwVkNBvHds03OORv8lpAGtX2jHMTad8pis4uGOAQg'],
            success(res) {
                console.log(res, '物流状态通知res')

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