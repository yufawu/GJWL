// app.js
App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
    },
    globalData: {
        userInfo: null, //用户的微信信息
        userId: null, //用户id
        countryMsg: null, //选择的国家信息
        packageId: null, //预报包裹id,用于查询详情
        addressId: null, //地址id，用于查询某条地址详情
        promoterOpenId: null, //分享者的openId

    }
})