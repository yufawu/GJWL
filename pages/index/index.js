// index.js
// 获取应用实例
const app = getApp()
const api = require('../../network/api');
const http = require('../../network/http.js');
const utils = require('../../utils/util.js');
Page({
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
            { fid: '1', imgurl: 'https://api-sys.xfx361.com/img//static/login/images/2020062603060365945.jpg' },
            { fid: '2', imgurl: 'https://api-sys.xfx361.com/img//static/login/images/2020062603062632068.jpg' },
            { fid: '3', imgurl: 'https://api-sys.xfx361.com/img//static/login/images/2020070310422690166.png' }
        ]
    },

    onLoad() {
        if (wx.getStorageSync('openId')) { //判断用户是否登录
            app.globalData.userId = wx.getStorageSync('userId')
        } else {
            this.weChatLogin()
        }

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
    weChatLogin() { //用户登录
        wx.login({
            success: res => {
                // 获取到用户的 code 之后：res.code
                let userInfo = wx.getStorageSync('userInfo')
                let loginParams = {
                    "code": res.code,
                    "avatarUrl": userInfo.avatarUrl,
                    "nickName": userInfo.nickName
                }
                console.log(loginParams, '请求参数')
                http.post(api.WechatLogin, loginParams).then((resMsg) => {
                    console.log('用户登录', resMsg)
                    wx.setStorageSync('openId', resMsg.data.data.openId)
                    wx.setStorageSync('userId', resMsg.data.data.id)
                    app.globalData.userId = resMsg.data.data.id
                })
            }
        });
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



})