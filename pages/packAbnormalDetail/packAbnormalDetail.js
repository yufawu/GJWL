// pages/packAbnormalDetail/packAbnormalDetail.js
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    packDetail: null,
    showReplay: false,//回复面板
    replay: null,//留言内容
    quickReplayList
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('详情', app.globalData.fastenerDetail)
    this.setData({
      // packDetail:app.globalData.fastenerDetail
      packDetail: wx.getStorageSync('fastener')
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onReplayChange(e) {
    this.data.replay = e.detail
  },
  viewImage(e) {//查看大图
    let currentUrl = e.currentTarget.dataset.currenturl //当前图片
    let previewUrls = e.currentTarget.dataset.previewurl  //获取到的关于图片的对象数组，
    let urlsArr = previewUrls.map(item => item.imageUrl) //处理对象数组
    wx.previewImage({
      current: currentUrl, //当前显示的图片链接（string类型），必须是http图片，本地图片无效 
      urls: urlsArr, //需要预览的图片链接列表（array类型），必须是http图片，本地图片无效
    })

  },
  clickReplay() {
    this.setData({ showReplay: true });
  },
  onReplayConfirm() {//确定回复
    this.setData({ showReplay: false });
    let params = {
      awbId: this.data.packDetail.id,
      content: this.data.replay
    }
    console.log('确认回复', params)
    // wx.navigateTo({ //回复后返回列表页
    //   url: '../packAbnormalDetail/packAbnormalDetail'
    // })
  },
  onReplayCancel() {
    console.log('取消回复')
    this.setData({ showReplay: false });
  },
  onReplayClose() {
    console.log('关闭弹窗，不操作')
    this.setData({ showReplay: false });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})