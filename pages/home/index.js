// pages/home/index.js
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

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

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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

    },

    /**
     * 点击导航
     */
    clickNav: function () {
        // const mapSdk = new QQMapWX({
        //     key: 'SBKBZ-RNLK4-IIPUW-DMRJP-XHWJJ-DUFKB'
        // });
        // mapSdk.reverseGeocoder({
        //     location: {
        //         latitude: '29.582791',
        //         longitude: '106.528380'
        //     },
        //     // coord_type: 5, 
        //     success: function (res) {
        wx.openLocation({
            longitude: 106.528380,
            latitude: 29.582791,
            name: '重庆两江假日丽呈华廷酒店',
            address: "重庆市江北区建新北路38号",
            fail: function (res) {
                wx.showToast({
                    title: '定位失败请重试!'
                })
            }
        })
        //     }
        // });
    },
})