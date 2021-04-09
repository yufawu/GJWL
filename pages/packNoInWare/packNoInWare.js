// pages/packNoInWare/packNoInWare.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
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
        emptyShow: false, //是否显示空状态
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
        this.noInWare()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    noInWare() { //未入库订单
        let that = this
        let params = {
            "userId": wx.getStorageSync('userId')
        }
        console.log(params, 'params')
        http.get(api.NoInWare, params).then((res) => {
            if (res.data.data.length == 0) { //空数组
                that.setData({
                    emptyShow: true
                })
            } else {
                that.setData({
                    emptyShow: false,
                    packList: res.data.data
                })
            }

        })
        console.log("未入库信息", this.data.packList)
    },
    viewDetail(e) { //查看详情
        console.log(e, '详细信息')
        app.globalData.packageId = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../packForecastDetail/packForecastDetail'
        })
    },
    onOpen(e) {
        console.log(e, '打开预报操作')
    },
    onCiick(e) {
        console.log(e, '点击预报操作')
    },
    onClose(e) {
        console.log(e, '关闭预报操作')
    },
    packEdit(e) {
        console.log('编辑该文件')
        app.globalData.packageId = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../packForecastEdit/packForecastEdit'
        })
    },
    packDelete(e) {
        let that = this
        let packageId = e.currentTarget.dataset.id
        let idx = e.currentTarget.dataset.index
        console.log('删除该文件', packageId, idx)
        let params = {
            "id": packageId
        }
        Dialog.confirm({
                title: "确认删除该包裹信息",
                // message: "删除后需重新录入",
                confirmButtonText: "删除",
            })
            .then(() => {
                // on confirm
                http.get(api.DeletePackForecast, params).then((res) => {
                    console.log('删除操作', res)
                    if (res.data.data) {
                        if (idx > -1) {
                            that.data.packList.splice(idx, 1)
                        }
                        let deletePackList = that.data.packList
                        console.log("删除后的数据", deletePackList)
                        that.setData({
                            packList: deletePackList
                        })
                    }
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