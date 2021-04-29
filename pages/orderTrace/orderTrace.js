// pages/orderTrace/orderTrace.js
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    emptyShow: false, //是否显示空状态
    traceList:null,
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
      this.getPackTrace()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getPackTrace (){ //获取包裹轨迹
    let that = this
    let params = {
      "setgoodsId": app.globalData.packConfirmMoreId
    }
    http.get(api.GetTrackBySetgoodsId,params).then((res)=>{
      if(res.data.msg =="操作成功"){
        if(res.data.data.length == 0){ //是否空数组
          that.setData({
            emptyShow: true
        })
        }else{
          let traceData = res.data.data.map(item =>{
            item.text = item.place+"，"+item.reason
            item.desc = item.statusTime
           return item
          })
          that.setData({
           traceList:traceData.reverse(),
           emptyShow: false
          })
        }
   
      }else{
        wx.showToast({
          title:res.data.msg,
          icon:"none"
        })
      }
    })

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