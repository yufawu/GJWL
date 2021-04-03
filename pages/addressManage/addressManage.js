// pages/addressManage/addressManage.js
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
        search: "",
        addressList: [] //
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
        this.getReceiver();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    onSearch(e) {
        console.log('搜索', e)
    },
    onCancel() {
        console.log('取消搜索', e)
    },
    addressAdd() { //增加地址
        console.log('增加地址')
        wx.navigateTo({
            url: '../addressAdd/addressAdd'
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
            that.setData({
                addressList: res.data.data
            })
            wx.setStorageSync('addressList', res.data.data)
            console.log('地址列表', that.data.addressList)
        })
    },
    viewDetail(e) { //查看详情
        console.log(e, '详细信息')
        app.globalData.addressId = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../addressDetail/addressDetail'
        })
    },

    onOpen(e) {
        console.log(e, '打开地址管理操作')
    },
    onCiick(e) {
        console.log(e, '点击地址管理操作')
    },
    onClose(e) {
        console.log(e, '关闭地址管理操作')
    },
    addressEdit(e) {
        console.log('编辑该文件')
        app.globalData.addressId = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../addressEdit/addressEdit'
        })
    },
    addressDelete(e) {
        let that = this
        let addressId = e.currentTarget.dataset.id
        let idx = e.currentTarget.dataset.index
        console.log('删除该文件', addressId, idx)
        let params = {
            "id": addressId
        }
        Dialog.confirm({
                title: "确认删除该联系人信息",
                // message: "删除后需重新录入",
                confirmButtonText: "删除",
            })
            .then(() => {
                // on confirm
                http.get(api.DeleteReceiver, params).then((res) => {
                    console.log('删除操作', res)
                    if (res.data.data) {
                        if (idx > -1) {
                            that.data.addressList.splice(idx, 1)
                        }
                        let deleteAddressList = that.data.addressList
                        console.log("删除后的数据", deleteAddressList)
                        that.setData({
                            addressList: deleteAddressList
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