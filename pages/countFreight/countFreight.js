// pages/countFreight/countFreight.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        countryName: null //国家名称
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
        console.log('选择的国家', this.data.countryName)
    },
    countryChange(e) { //国家地区
        this.data.countryName = e.detail
    },
    onCountry() {
        console.log('选择国家')
        wx.navigateTo({
            url: '../countryList/countryList'
        })
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