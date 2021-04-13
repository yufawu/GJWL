// pages/suggestions/suggestions.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        fileList: []
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
    afterRead(event) { //
        let that = this
        console.log(event.detail)
        const { file } = event.detail;
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        wx.uploadFile({
            url: 'https://zschinese.com/common/upload', // 接口地址
            filePath: file.url,
            name: 'file',
            formData: { user: 'test' },
            success(res) {
                // 上传完成需要更新 fileList
                console.log(res, '文件上传完成')
                const { fileList = [] } = that.data;
                fileList.push({...file, url: res.data });
                that.setData({ fileList });
            },
        });
    },
    clickPreview(event) {
        // console.log('点击图片', event.detail)
    },
    delete(event) {
        // console.log('删除图片', event.detail)
    },
    submit() { // 提交
        console.log(this.data.fileList, '用户图片')
            // wx.reLaunch({
            //     url: '../mine/mine'
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