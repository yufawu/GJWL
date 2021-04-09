// pages/tipsTransport/tipsTransport.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checked: false

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
    onChange(event) {
        console.log('是否勾选了确认按钮', event.detail)
        this.setData({
            checked: event.detail
        })

    },
    agree() { //同意
        if (wx.getStorageSync('openId')) { //判断用户是否登录
            console.log('用户已经登录--注意事项')
            if (this.data.checked) {
                wx.navigateTo({
                    url: '../packForecast/packForecast'
                })
            } else {
                wx.showToast({
                    title: '请先确认同意',
                    icon: 'none'
                })
            }

        } else {
            console.log('用户没有登录--注意事项')
            wx.navigateTo({
                url: '../login/login'
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