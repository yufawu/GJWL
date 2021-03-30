// pages/tipsTransport/tipsTransport.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        radio: ''

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
        this.radio = event.detail
        this.setData({
            radio: event.detail,
        });
    },
    agree() { //同意
        console.log("点击了同意按钮", this.radio)

        if (this.radio == 1) {
            wx.navigateTo({
                url: '../packForecast/packForecast'
            })
        } else {
            console.log('请先确认')
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