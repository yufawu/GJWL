// pages/addressEdit/addressEdit.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
const utils = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        receive: {
            name: null, //收件人
            address: null, //详细地址
            postCode: null, //邮政编码
            cityName: null, //城市
            // countryName: null, //国家
            countryCode: null, //国家code
            tel: null, //电话
            wxUserId: '' //微信号
        },
        countryName: '' //国家名称
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // this.addReceiver() //添加收货地址
        // this.getReceiver() //获取收货地址
        // this.submitForecast() //提交预报

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        // this.getAuthorize()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        if (app.globalData.countryMsg) {
            console.log('地址-国家信息', app.globalData.countryMsg)
                // this.data.receive.countryName = app.globalData.countryMsg.countryName,
                //     this.data.receive.countryCode = app.globalData.countryMsg.countryCode

        }
    },

    nameChange(e) { //
        this.data.receive.name = e.detail
    },
    addressChange(e) { //
        this.data.receive.address = e.detail
    },
    postCodeChange(e) { //邮编
        this.data.receive.postCode = e.detail
    },
    cityNameChange(e) { //城市
        this.data.receive.cityName = e.detail

    },
    countryeChange(e) { //国家地区
        this.data.countryName = e.detail
    },
    telChange(e) { //电话
        this.data.receive.tel = e.detail
    },
    wxUserIdChange(e) { //
        this.data.receive.wxUserId = e.detail
    },

    onInput(event) {
        console.log(event.detail, '输入内容时触发')
    },
    onChange(event) {
        console.log(event.detail, '输入内容时触发-change')
    },
    onFocus(event) {
        console.log(event.detail, '输入框聚焦时触发')
    },
    onCountry() {
        console.log('选择国家')
        wx.navigateTo({
            url: '../countryList/countryList'
        })
    },
    addressSave() { //保存地址
        console.log('保存地址', this.data.receive)
        wx.navigateBack()
            // wx.navigateTo({
            //     url: '../addressManage/addressManage'
            // })
    },
    addReceiver() {
        // let params = {
        //     "countryName": "美国",
        //     "countryCode": "US",
        //     "cityName": "纽约",
        //     "name": "小巫一号",
        //     "address": "怀德翠岗三区10栋",
        //     "tel": "13763048401",
        //     "postCode": "525321",
        //     "wxUserId": '',
        //     "userId": wx.getStorageSync('userId')
        // }
        let countryCnName
        let countryCode
        if (app.globalData.countryMsg) {
            countryCnName = app.globalData.countryMsg.countryCnName
            countryCode = app.globalData.countryMsg.countryCode
        } else {
            countryCnName = ''
            countryCode = ''
        }
        let params = {
            "countryName": countryCnName,
            "countryCode": countryCode,
            "cityName": this.data.receive.cityName,
            "name": this.data.receive.name,
            "address": this.data.receive.address,
            "tel": this.data.receive.tel,
            "postCode": this.data.receive.postCode,
            "wxUserId": this.data.receive.wxUserId,
            "userId": wx.getStorageSync('userId')
        }

        console.log(params, 'params')
        if (params.countryName && params.countryCode && params.cityName && params.name && params.tel && params.address) {
            http.post(api.AddReceiver, params).then((res) => {
                console.log(res, '信息')
                if (res.data.msg == '操作成功') {
                    Toast('添加成功')
                    wx.navigateBack()
                        // wx.navigateTo({
                        //     url: '../addressManage/addressManage'
                        // })
                } else {
                    Toast(res.data.msg)
                }

            })
        } else {
            console.log('信息不完整')
            Toast('信息不完整，带*的都是必填内容')
        }

    },
    getAddressDetail() { //获取地址详细信息

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