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
        if (!wx.getStorageSync('openId')) { //判断用户是否登录
            console.log('用户没有登录--我的页面')
            wx.navigateTo({
                url: '../login/login'
            })


        } else {
            console.log('用户已经登录--我的页面')
        }

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        if (wx.getStorageSync('userInfo')) {
            this.setData({
                userInfo: wx.getStorageSync('userInfo')
            })
        }
    },
    toLogin() { //点击登录
        wx.navigateTo({
            url: '../login/login'
        })
    },
    packNoInWare() { //未入库
        console.log('未入库')
        if (wx.getStorageSync('openId')) {
            wx.navigateTo({
                url: '../packNoInWare/packNoInWare'
            })
        } else {
            Toast("请先登录/注册")
        }

    },
    packInWare() { //已入库
        console.log('已入库')
        if (wx.getStorageSync('openId')) {
            wx.navigateTo({
                url: '../packInWare/packInWare'
            })
        } else {
            Toast("请先登录/注册")
        }

    },
    packAbnormal() { //异常-待处理
        console.log('异常-待处理')
        if (wx.getStorageSync('openId')) {
            wx.navigateTo({
                url: '../packAbnormal/packAbnormal'
            })
        } else {
            Toast("请先登录/注册")
        }

    },
    orderUnpaid() { //未支付
        console.log('未支付')
        if (wx.getStorageSync('openId')) {
            wx.navigateTo({
                url: '../orderUnpaid/orderUnpaid'
            })
        } else {
            Toast("请先登录/注册")
        }

    },
    orderUndeliver() { //待发货
        console.log('待发货')
        if (wx.getStorageSync('openId')) {
            wx.navigateTo({
                url: '../orderUndeliver/orderUndeliver'
            })
        } else {
            Toast("请先登录/注册")
        }

    },
    orderDeliver() { //已发货
        console.log('已发货')
        if (wx.getStorageSync('openId')) {
            wx.navigateTo({
                url: '../orderDeliver/orderDeliver'
            })
        } else {
            Toast("请先登录/注册")
        }

    },
    orderSign() { //已签收
        console.log('已签收')
        if (wx.getStorageSync('openId')) {
            wx.navigateTo({
                url: '../orderSign/orderSign'
            })
        } else {
            Toast("请先登录/注册")
        }

    },



    inDevelop() { //该功能正在开发中
        Toast("该功能正在开发中")
    },




    myCode() { //我的二维码
        console.log('我的二维码')
        if (wx.getStorageSync('openId')) {
            wx.navigateTo({
                url: '../myCode/myCode'
            })
        } else {
            Toast("请先登录/注册")
        }

    },
    myShareList() { //我的分享列表
        console.log('我的分享列表')
        if (wx.getStorageSync('openId')) {
            wx.navigateTo({
                url: '../myShareList/myShareList'
            })
        } else {
            Toast("请先登录/注册")
        }

    },
    packForecastManage() { //包裹预报管理列表
        console.log('包裹预报管理列表')
        if (wx.getStorageSync('openId')) {
            Toast("该功能正在开发中")
                // wx.navigateTo({
                //     url: '../packForecastManage/packForecastManage'
                // })
        } else {
            Toast("请先登录/注册")
        }

    },
    problemCommon() { //常见问题
        console.log('常见问题')
            // Toast("该功能正在开发中")
        if (wx.getStorageSync('openId')) {
            wx.navigateTo({
                url: '../problemCommon/problemCommon'
            })
        } else {
            Toast("请先登录/注册")
        }

    },
    suggestions() { //投诉建议
        console.log('投诉建议')
        if (wx.getStorageSync('openId')) {
            Toast("该功能正在开发中")
                // wx.navigateTo({
                //     url: '../suggestions/suggestions'
                // })
        } else {
            Toast("请先登录/注册")
        }

    },
    informationNotice() { //通知资讯
        console.log('通知资讯')
        if (wx.getStorageSync('openId')) {
            // Toast("该功能正在开发中")
            wx.navigateTo({
                url: '../informationNotice/informationNotice'
            })
        } else {
            Toast("请先登录/注册")
        }

    },
    abnormalList() { //异常件认领
        console.log('异常件认领')
        if (wx.getStorageSync('openId')) {
            Toast("该功能正在开发中")
            wx.navigateTo({
                url: '../abnormalList/abnormalList'
            })
        } else {
            Toast("请先登录/注册")
        }

    },
    orderRecord() { //交易记录
        console.log('交易记录')
        Toast("该功能正在开发中")
        if (wx.getStorageSync('openId')) {
            wx.navigateTo({
                url: '../orderRecord/orderRecord'
            })
        } else {
            Toast("请先登录/注册")
        }

    },
    packForecast() { //一键预报
        console.log('一键预报')
        if (wx.getStorageSync('openId')) {
            wx.navigateTo({
                url: '../packForecast/packForecast'
            })
        } else {
            Toast("请先登录/注册")
        }

    },
    addressManage() { //地址管理
        console.log('地址管理')
        if (wx.getStorageSync('openId')) {
            wx.navigateTo({
                url: '../addressManage/addressManage'
            })
        } else {
            Toast("请先登录/注册")
        }

    },
    bindPhone() { //更改手机
        console.log('更改手机')
        if (wx.getStorageSync('openId')) {
            wx.navigateTo({
                url: '../bindPhone/bindPhone'
            })
        } else {
            Toast("请先登录/注册")
        }

    },
    bindMailbox() { //绑定邮箱
        console.log('绑定邮箱')
        if (wx.getStorageSync('openId')) {
            wx.navigateTo({
                url: '../bindMailbox/bindMailbox'
            })
        } else {
            Toast("请先登录/注册")
        }

    },
    about() { //关于我们
        console.log('关于我们')
        if (wx.getStorageSync('openId')) {
            Toast("该功能正在开发中")
        } else {
            Toast("请先登录/注册")
        }

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