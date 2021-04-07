// pages/mine/mine.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null, //个人信息

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
        if (!wx.getStorageSync('openId')) { //判断用户是否登录
            console.log('用户没有登录--我的页面')
            wx.navigateTo({
                url: '../login/login'
            })


        } else {
            console.log('用户已经登录--我的页面')
        }
        if (wx.getStorageSync('userInfo')) {
            this.setData({
                userInfo: wx.getStorageSync('userInfo')
            })
        }
    },
    packNoInWare() { //未入库
        console.log('未入库')
        wx.navigateTo({
            url: '../packNoInWare/packNoInWare'
        })
    },
    packInWare() { //已入库
        console.log('已入库')
        wx.navigateTo({
            url: '../packInWare/packInWare'
        })
    },
    packAbnormal() { //异常-待处理
        console.log('异常-待处理')
        wx.navigateTo({
            url: '../packAbnormal/packAbnormal'
        })
    },
    inDevelop() { //该功能正在开发中
        Toast("该功能正在开发中")
    },




    myCode() { //我的二维码
        console.log('我的二维码')
        Toast("该功能正在开发中")
        wx.navigateTo({
            url: '../myCode/myCode'
        })
    },
    myShareList() { //我的分享列表
        console.log('我的分享列表')
        Toast("该功能正在开发中")
        wx.navigateTo({
            url: '../myShareList/myShareList'
        })
    },
    packForecastManage() { //包裹预报管理列表
        console.log('包裹预报管理列表')
        Toast("该功能正在开发中")
            // wx.navigateTo({
            //     url: '../packForecastManage/packForecastManage'
            // })
    },
    problemCommon() { //常见问题
        console.log('常见问题')
        Toast("该功能正在开发中")
            // wx.navigateTo({
            //     url: '../problemCommon/problemCommon'
            // })
    },
    suggestions() { //投诉建议
        console.log('投诉建议')
        Toast("该功能正在开发中")
            // wx.navigateTo({
            //     url: '../suggestions/suggestions'
            // })
    },
    informationNotice() { //通知资讯
        console.log('通知资讯')
        Toast("该功能正在开发中")
            // wx.navigateTo({
            //     url: '../informationNotice/informationNotice'
            // })
    },
    packForecast() { //一键预报
        console.log('一键预报')
        wx.navigateTo({
            url: '../packForecast/packForecast'
        })
    },
    addressManage() { //地址管理
        console.log('地址管理')
        wx.navigateTo({
            url: '../addressManage/addressManage'
        })
    },
    bindPhone() { //更改手机
        console.log('更改手机')
        Toast("该功能正在开发中")
        wx.navigateTo({
            url: '../bindPhone/bindPhone'
        })
    },
    bindMailbox() { //绑定邮箱
        console.log('绑定邮箱')
            // Toast("该功能正在开发中")
        wx.navigateTo({
            url: '../bindMailbox/bindMailbox'
        })
    },
    about() { //关于我们
        console.log('关于我们')
        Toast("该功能正在开发中")
            // wx.navigateTo({
            //     url: '../about/about'
            // })
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