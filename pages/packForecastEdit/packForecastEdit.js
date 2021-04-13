// pages/packForecastEdit/packForecastEdit.js
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
        packDetail: null,
        expressList: null, //快递列表
        goodsList: null, //物品属性列表,
        addressList: null, //收货地址选择面板
        showExpress: false, //快递选择面板
        showGoods: false, //物品属性选择面板
        showAddress: false, //收货地址选择面板
        indexExpress: null, //当前选择的快递下标
        indexGoodsType: null, //当前选择的物品属性下标
        isUnpack: null, //是否拆包，需要先转成字符串
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

        this.packForecastDetail()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {


    },
    packForecastDetail() { //已入库订单
        let that = this
        console.log(app.globalData.packageId, '需要编辑的号')
        let params = {
            "id": app.globalData.packageId
        }
        http.get(api.PackForecastDetail, params).then((res) => {
            console.log("请求结果", res.data.data)
            that.setData({
                packDetail: res.data.data,
                addressSelected: res.data.receiversend,
                isUnpack: res.data.data.isUnpack.toString()
            })

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
            if (res.data.data) {
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
        let name = e.currentTarget.dataset.name
        this.data.packDetail.isUnpack = name.toString()
        console.log(name, e.currentTarget, '是否拆包', this.data.packDetail)
        this.setData({
            isUnpack: this.data.packDetail.isUnpack
        })

    },


    expressCompanyChange(e) { //选择的快递公司名称
        console.log('快递公司名称', e)
        this.data.packDetail.expressCompany = e.detail
    },
    hawbNoChange(e) { //快递单号
        this.data.packDetail.hawbNo = e.detail
    },
    productNameChange(e) { //物品名称
        this.data.packDetail.productName = e.detail
    },
    brandChange(e) { //物品品牌

        this.data.packDetail.brand = e.detail
    },
    svalueChange(e) { //物品价值
        this.data.packDetail.svalue = e.detail
    },
    goodsTypeChange(e) { //物品属性
        this.data.packDetail.goodsType = e.detail
    },
    pcsChange(e) { //商品数量
        this.data.packDetail.pcs = e.detail
    },
    cwtChange(e) { //商品重量
        this.data.packDetail.cwt = e.detail
    },
    remarkChange(e) { //商品备注
        this.data.packDetail.remark = e.detail
    },

    onExpressClick(e) {
        if (this.data.expressList == null) {
            this.getExpress()
        }

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
        console.log('选择快递', event, event.detail)

        this.data.packDetail.expressCompany = event.detail.name
        this.setData({
            packDetail: this.data.packDetail
        })
    },
    onGoodsClick(e) {
        if (this.data.goodsList == null) {
            this.getGoodsType() //获取属性列表

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
        console.log('选择货物属性', event, event.detail)
        this.data.packDetail.goodsType = event.detail.name
        this.setData({
            packDetail: this.data.packDetail
        })
    },
    onAddressClick(e) {
        if (wx.getStorageSync('addressList')) {
            this.setData({
                addressList: wx.getStorageSync('addressList'),
                showAddress: true,
            });

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
            // this.data.packDetail.goodsType = event.detail.name
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
    getGoodsType() { //获取物品属性公司列表
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

    submitForecast() { //提交预报 028DADD3991041E4B1168A2EA1D58CDE-小巫一号  08F91BA8DFA748E9A9FDCA13D99775A5
        let that = this
        if (this.data.addressSelected && this.data.packDetail) {
            // console.log('修改预报信息', this.data.packDetail)
            let params = {
                "id": this.data.packDetail.id,
                "hawbNo": this.data.packDetail.hawbNo,
                "pcs": this.data.packDetail.pcs,
                "cwt": this.data.packDetail.cwt,
                "expressCompany": this.data.packDetail.expressCompany,
                "productName": this.data.packDetail.productName,
                "svalue": this.data.packDetail.svalue,
                "remark": this.data.packDetail.remark,
                "goodsType": this.data.packDetail.goodsType,
                "brand": this.data.packDetail.brand,
                "isUnpack": this.data.packDetail.isUnpack,
                "receiversendId": this.data.addressSelected.id
            }
            console.log(params, 'params')
            http.post(api.EditPackForecast, params).then((res) => {

                if (res.data.msg === "操作成功") {
                    console.log("修改成功", res.data)
                    Toast('修改成功')
                        // wx.navigateBack()
                    wx.navigateTo({
                        url: '../packNoInWare/packNoInWare'
                    })

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