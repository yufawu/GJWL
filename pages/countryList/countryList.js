const app = getApp()
const { country } = require('../../res/asset/country.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: country,
        hotList: [],
        isSearch: false,
        hotCodeList: ['US', 'GB', 'CA', 'JP', 'IT', 'DE', 'AU', 'FR', 'ES', 'NL']
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let hotList = this.data.list.filter((item) => {
            return this.data.hotCodeList.includes(item.CountryCode)
        })
        hotList.sort((a, b) => {
            return this.data.hotCodeList.indexOf(a.CountryCode) > this.data.hotCodeList.indexOf(b.CountryCode)
        })
        this.setData({
            hotList: hotList
        })
    },

    /**
     * 输入关键字搜索
     */
    inputKeyWord(e) {
        let keyword = e.detail.value
        if (keyword.length == 0) {
            this.setData({
                list: country,
                isSearch: false
            })
            return
        }
        let tempList = []
        country.forEach((item) => {
            if (item.CountryAllName.includes(keyword.toUpperCase())) {
                tempList.push(item)
            }
        })
        this.setData({
            list: tempList,
            isSearch: true
        })
    },

    /**
     * item 点击
     */
    itemClick(e) {
        // app.globalData.selectedCountry = e.currentTarget.dataset
        let pages = getCurrentPages();
        if (pages.length > 1) {
            var prevPage = pages[pages.length - 2];
            // prevPage.changeData();
            prevPage.setData({
                selectedCountry: e.currentTarget.dataset
            });
        }

        wx.navigateBack({})
    },
    /**
     * 热门国家点击
     */
    selectHotCountry(e) {

        let pages = getCurrentPages();
        if (pages.length > 1) {
            var prevPage = pages[pages.length - 2];
            // prevPage.changeData();
            prevPage.setData({
                selectedCountry: e.currentTarget.dataset
            });
        }
        wx.navigateBack({})
    }
})