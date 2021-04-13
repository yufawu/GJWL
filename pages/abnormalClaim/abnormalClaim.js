// pages/abnormalClaim/abnormalClaim.js
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
        showDetail: false, //是否显示详情
        showErr: false, //显示匹配错误
        claimDetail: null, //包裹详情
        packDetail: {
            "hawbNo": null,
            "pcs": 1, //商品数量
            "cwt": 1, //商品重量
            "expressCompany": null,
            "productName": null,
            "svalue": null,
            "remark": null,
            "goodsType": null,
            "brand": null, //品牌
            "isUnpack": "0", //是否拆包
        }, //认领信息
        isUnpack: '0', //是否拆包，需要先转成字符串
        addressList: null, //收货地址列表
        showAddress: false, //收货地址选择面板
        addressSelected: null, //已选择的收货地址信息
        goodsList: null, //物品属性列表,
        showGoods: false, //物品属性选择面板
        remarkClaim: null, //认领备注

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.packAbnormalDetail()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    // saoma: function(e) { // 允许从相机和相册扫码
    //     let idx = e.currentTarget.dataset.index
    //     console.log(e, 'saoma')
    //     wx.scanCode({
    //         success: (res) => {
    //             this.data.forecastList[idx].hawbNo = res.result
    //             this.setData({
    //                 forecastList: this.data.forecastList
    //             });
    //             console.log(res, '扫码的值')
    //         }
    //     })

    // },
    onRidioClick(e) { //是否拆包
        let name = e.currentTarget.dataset.name
        this.data.packDetail.isUnpack = name.toString()
        console.log(name, e.currentTarget, '是否拆包', this.data.packDetail)
        this.setData({
            isUnpack: this.data.packDetail.isUnpack
        })

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
    onGoodsClick(e) {
        if (this.data.goodsList == null) {
            this.getGoodsType() //获取属性列表

        }

        this.setData({
            showGoods: true,
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
    onAddressClick(e) {
        this.getReceiver() //选择快递地址时，加载对应列表
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
        this.setData({
            addressSelected: event.detail
        })
    },
    onValueChange(e) {
        this.setData({
            searchValue: e.detail
        })
    },
    onSearch() { //回车搜索
        this.packAbnormalQuery()
    },
    onSearchClick() { //点击搜索
        this.packAbnormalQuery()
    },
    packAbnormalDetail() { //根据id查询模糊的信息
        let that = this
        let params = {
            "id": app.globalData.abnormalId
        }
        http.get(api.PackAbnormalQuery, params).then((res) => {
            if (res.data.msg == '操作成功') {
                that.setData({
                    claimDetail: res.data.preAwb,
                })
            } else {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                })
            }
        })
    },
    packAbnormalQuery() { //根据订单号进行匹配
        let that = this
        let params = {
            "orderNo": this.data.searchValue
        }
        http.get(api.PackAbnormalQuery, params).then((res) => {
            console.log(res.data, 'res')
            if (res.data.msg == '操作成功') {
                that.setData({
                    claimDetail: res.data.preAwb,
                    showDetail: true,
                    showErr: false,
                })
                wx.showToast({
                    title: '匹配成功',
                    icon: 'none'
                })
            } else {
                that.setData({
                    showErr: true,
                    showDetail: false,
                })
            }
        })
    },

    claim() { //认领
        if (this.data.addressSelected) {
            let params = {

                "hawbNo": this.data.claimDetail.hawbNo,
                "pcs": this.data.packDetail.pcs,
                "cwt": this.data.packDetail.cwt, //商品重量
                "expressCompany": this.data.claimDetail.expressCompany,
                "productName": this.data.packDetail.productName,
                "svalue": this.data.packDetail.svalue,
                "remark": this.data.packDetail.remark,
                "goodsType": this.data.packDetail.goodsType,
                "brand": this.data.packDetail.brand,
                "isUnpack": this.data.packDetail.isUnpack,
                "receiversendId": this.data.addressSelected.id,
                "costomerId": wx.getStorageSync('userId')
            }
            console.log('异常件参数', params)
            http.post(api.PackAbnormalClaim, params).then((res) => {
                console.log('认领异常件', res.data)
                if (res.data.msg == '认领成功！！') {
                    wx.navigateTo({ //返回异常件列表页
                        url: '../abnormalList/abnormalList'
                    })
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }
            })
        } else {
            wx.showToast({
                title: '请选择收货地址',
                icon: 'none'
            })
        }

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