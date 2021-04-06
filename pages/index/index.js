// index.js
// 获取应用实例
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
const utils = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            { title: '标签10', content: '内容10' },
            { title: '标签11', content: '内容11' },
            { title: '标签12', content: '内容12' },
            { title: '标签13', content: '内容13' },
            { title: '标签14', content: '内容14' },
            { title: '标签15', content: '内容15' },
            { title: '标签16', content: '内容16' },
            { title: '标签17', content: '内容17' },
            { title: '标签18', content: '内容18' },
            { title: '标签19', content: '内容19' },
        ],
        bannerList: [
            { fid: '1', configValue: 'https://api-sys.xfx361.com/img//static/login/images/2020062603060365945.jpg' },
            { fid: '2', configValue: 'https://api-sys.xfx361.com/img//static/login/images/2020062603062632068.jpg' },
            { fid: '3', configValue: 'https://api-sys.xfx361.com/img//static/login/images/2020070310422690166.png' }
        ],
        warehouseList: null,
        waysList: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(res) {
        console.log('页面参数', res)
        if (res.promoterOpenId) {
            app.globalData.promoterOpenId = res.promoterOpenId //通过分享按钮进入
            console.log('首页分享进入', app.globalData.promoterOpenId)
        }
        if (res.scene) { // 如果是通过扫码进入，可以获取scene获取分享者id
            app.globalData.promoterOpenId = res.scene
                // this.getScene(res.scene) //获取二维码scene数据
        }

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.getBanner()
        this.getWarehouse()
        this.getWays()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    getScene(scene) { //获取scene的值,用户id,姓名等信息
        let objScene = {
            "openId": scene
        }
        http.get(api.GetSecneValue, objScene).then(res => {
            app.globalData.promoterOpenId = res.data.data.id //获取分享者的user
            console.log('扫码进入', res.data)
                // console.log('扫码信息', res.data.data)
        })
    },
    viewImage(e) {
        let currentUrl = e.currentTarget.dataset.currenturl.imgurl //当前图片
        let previewUrls = e.currentTarget.dataset.previewurl //获取到的关于图片的对象数组，
        let urlsArr = previewUrls.map(item => item.imgurl) //处理对象数组
        wx.previewImage({
            current: currentUrl, //当前显示的图片链接（string类型），必须是http图片，本地图片无效 
            urls: urlsArr, //需要预览的图片链接列表（array类型），必须是http图片，本地图片无效
        })

    },
    getBanner() {
        let that = this
        let params = {
            "version": '1.0.0'
        }
        console.log(params, '获取轮播图')
        http.get(api.GetBanner, params).then((res) => {

            this.setData({
                bannerList: res.data.data.carousels
            })
            console.log(that.data.bannerList, '信息')
        })
    },
    getWarehouse() {
        let that = this
        let params = {
            "key": 'sysTestData1'
        }
        console.log(params, '获取仓库信息')
        http.get(api.GetWarehouse, params).then((res) => {

            this.setData({
                warehouseList: res.data.data.datas
            })
            console.log(that.data.warehouseList, '仓库信息')
        })
    },
    getWays() {
        let that = this
        let params = {
            "key": 'sysTestData2'
        }
        console.log(params, '获取路线信息')
        http.get(api.GetWarehouse, params).then((res) => {
            console.log(res.data.data, 'res')

            this.setData({
                waysList: res.data.data.datas
            })
            console.log(that.data.waysList, '获取路线信息')
        })
    },

    needAttention() {
        console.log('点击注意事项')
    },
    transport() {
        console.log('点击开始集运')
        wx.navigateTo({
            url: '../tipsTransport/tipsTransport'
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