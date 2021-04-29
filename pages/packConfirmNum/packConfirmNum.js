// pages/packConfirmNum/packConfirmNum.js
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeGoodsList:null,//预报单列表
    activeNames: '0',
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
     this.getPackConfirmMore()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onChange (e){
    console.log('index',e.currentTarget.dataset.index)
    console.log('echange',e.detail)
    this.setData({
      activeNames: e.detail,
    });
  },
  getPackConfirmMore () {
    let that = this 
    let params = {
      "setgoodsId": app.globalData.packConfirmMoreId
    }
    http.get(api.GetPreAwbBySetgoodsId,params).then((res) =>{
      if(res.data.msg =="操作成功"){
         that.setData({
          storeGoodsList:res.data.data,
          activeNames:'0'
         })
         
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