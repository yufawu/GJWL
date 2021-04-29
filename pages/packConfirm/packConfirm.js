// pages/packConfirm/packConfirm.js
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unPackList:null,
    emptyShow:false
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
    this.getUnPackList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getUnPackList() {
    let that = this
    let params = {
      "userId": wx.getStorageSync('userId')
    }
    http.get(api.PackConfirm, params).then((res) => {
      if(res.data.data.length == 0){
        that.setData({
          emptyShow: true
      })
      }else{
        that.setData({
          emptyShow: false,
          unPackList: res.data.data
        })
      }
    
    })
  },
  viewMore (e){
    app.globalData.packConfirmMoreId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../packConfirmNum/packConfirmNum'
  })
  },
  packConfirm(e) {
    let that = this
    Dialog.confirm({
      title: "确认打包",
      // message: "删除后需重新录入",
      // confirmButtonText: "去填写",
    })
      .then(() => {
        // on confirm
        let params = {
          "setgoodsId": e.currentTarget.dataset.id
        }
        http.get(api.PackConfirmId, params).then((res) => {
          if (res.data.msg == "操作成功") {
            that.getUnPackList()
          }
        })
      })
      .catch(() => {
        // on cancel
        console.log('取消打包')
      });

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