//app.js
//引入agent.js
const agent = require('./utils/agent.js');
//小程序版地图接入
const QQMapWX = require('./utils/qqmap-wx-jssdk.min.js');
import userUtil from './utils/user-util.js'
// 引入配置参数
// const profile = require('./utils/profile.js');
// import request urls
import ApiUrls from './utils/urls.js';

App({
    globalData: {
        userInfo: null,
        mobile: null,
        code: null,
        token: null,
        networkType: "",
    },

    onLaunch: function (options) {
        this.globalData.userInfo = {};
    },

    onShow: function (options) {
        this.globalData.token = wx.getStorageSync('token');
    },
    /**
     * 发起get请求，option={
     *  noToast:true,   标识不需要展示错误提示 默认flase
     *  loading:true , 显示loading图标，默认true
     *  noToken:true, 请求中不带toekn 默认 false
     * }
     */
    sendGet(url, prams, options = {}) {
        const token = this.globalData.token;
        options.app = this;
        options.oauth = userUtil.oauth;
        (!options.noToken) && token && (prams.token = token);
        return agent.sendGet(url, prams, options)
    },
    /**
     * 发起post请求，option={
     *  noToast:true,   标识不需要展示错误提示 默认flase
     *  loading:true , 显示loading图标，默认true，
     *  noToken:true, 请求中不带toekn 默认 false
     * }
     */
    sendPost(url, prams, options = {}) {
        const token = this.globalData.token;
        options.app = this;
        options.oauth = userUtil.oauth;
        (!options.noToken) && token && (prams.token = token);
        return agent.sendPost(url, prams, options)
    },
    /**
     * 发起put请求，option={
     *  noToast:true,   标识不需要展示错误提示 默认flase
     *  loading:true , 显示loading图标，默认true，
     *  noToken:true, 请求中不带toekn 默认 false
     * }
     */
    sendPut(url, prams, options = {}) {
        const token = this.globalData.token;
        options.app = this;
        options.oauth = userUtil.oauth;
        (!options.noToken) && token && (prams.token = token);
        return agent.sendPut(url, prams, options)
    },
    /**
     * 发起delete请求，option={
     *  noToast:true,   标识不需要展示错误提示 默认flase
     *  loading:true , 显示loading图标，默认true，
     *  noToken:true, 请求中不带toekn 默认 false
     * }
     */
    sendDelete(url, prams, options = {}) {
        const token = this.globalData.token;
        options.app = this;
        options.oauth = userUtil.oauth;
        (!options.noToken) && token && (prams.token = token);
        return agent.sendDelete(url, prams, options)
    },

    // 封装console，方便统一开关
    debug(msg, obj) {
        console.log("-----------------------------------------------");
        msg && console.log(msg);
        typeof obj !== "undefined" && console.log(obj);
    },
})