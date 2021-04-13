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
        searchValue: '2021041216345400329450203', //搜索关键词
        showDetail: false, //是否显示详情
        packDetail: null, //包裹详情
        addressList: null, //收货地址列表
        showAddress: false, //收货地址选择面板
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
    packAbnormalQuery() {
        let that = this
        let params = {
            "orderNo": this.data.searchValue
        }
        http.get(api.PackAbnormalQuery, params).then((res) => {
            console.log(res.data, 'res')
            if (res.data.msg == '操作成功') {
                that.setData({
                    packDetail: res.data.preAwb,
                    showDetail: true
                })
            } else {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                })
            }
        })
    },

    claim() { //认领
        if (this.data.addressSelected) {
            let params = {
                "orderNo": this.data.packDetail.hawbNo,
                "userId": wx.getStorageSync('userId'),
                "receiversendId": this.data.addressSelected.id,
                "remark": this.data.packDetail.remark
            }
            console.log('异常件参数', params)
            http.get(api.PackAbnormalClaim, params).then((res) => {
                console.log('认领异常件', res.data)
                if (res.data.msg == '认领成功') {
                    wx.navigateBack() //返回异常件列表页
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