// pages/comment/index.js

// import request urls
import ApiUrls from '../../utils/urls.js';
// 获取应用实例
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        commentList: [],
        commentCount: -1, // 商品总数 接口未获取到值的时候，默认为-1
        hasAllListData: false, //页面数据是都是否已经加载完毕(该状态仅用于控制页面展示)
        showWrite: false, //控制页面评论区域展示
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        hasUserInfo: false, //是否已经获取到用户信息
        textareaValue: '', 
    },
    hasAllListData: false, //页面数据是都是否已经加载完毕（该状态也用户页面内判断标志位）
    currentPageIndex: 1, // 当前商品列表的页数

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
        this.currentPageIndex = 1; // 重置活动列表信息的页码
        this.getCommentList();
        if (app.globalData.userInfo.nickname) {
            // 当前有用户信息缓存
            this.userInfo = app.globalData.userInfo;
            this.setData({
                hasUserInfo: true,
            });
        } else {
            // 没有用户信息的时候获取用户信息
            this.getUserInfo();
        }
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

    // 获取用户信息
    getUserInfo: function () {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            app.globalData.userInfo = res.userInfo;
                            this.userInfo = app.globalData.userInfo;
                            wx.setStorageSync('nickname', this.userInfo.nickName);
                            wx.setStorageSync('avatarUrl', this.userInfo.avatarUrl);

                            // 更改页面上的展示按钮
                            this.setData({
                                hasUserInfo: true,
                            });
                        }
                    })
                }
            }
        })
    },

    // 获取评论列表
    getCommentList: function () {
        app.sendGet(ApiUrls.GET_COMMENT_LIST, {
            pageNumber: this.currentPageIndex,
            pageSize: 10,
        }, {
            noToken: true,
            loading: false,
        }).then(json => {
            // if (json.code === 0) {
            if (this.data.commentCount != json.totalElements) {
                // 接口获取的total与现有不相等时
                // 判断当前页面是否为第一页，如果不是重新请求数据，获取第一页的数据重新展示
                if (this.currentPageIndex == 1) {
                    // 当前数据为第一页，将数据放入对应的地方
                    if (json.totalElements == json.content.length) {
                        this.hasAllListData = true;
                        this.setData({
                            hasAllListData: true,
                        });
                    } else {
                        this.currentPageIndex++;
                    }
                    this.setData({
                        commentCount: json.totalElements,
                        commentList: json.content,
                    });
                } else {
                    // 重置页码
                    this.currentPageIndex = 1;
                    this.hasAllListData = false;
                    this.getCommentList();
                }
            } else if (this.data.commentCount == json.totalElements) {
                // 接口获取的total与现有相等时
                let nowList = this.data.commentList;
                if (this.currentPageIndex == 1) {
                    // 刷新列表
                    nowList = [];
                } else {
                    // 加载更多
                }
                if (nowList.length < json.totalElements) {
                    // 当前数据为新页面数据， 新数据放在现有数据之后
                    let newList = nowList.concat(json.content);
                    // 新数据加上后，现有数据总数等于活动数据总数时，提示用户活动已经加载完，并不再加载新的页面
                    if (newList.length == json.totalElements) {
                        this.hasAllListData = true;
                        this.setData({
                            hasAllListData: true,
                            commentList: newList,
                        });
                    } else {
                        this.setData({
                            commentList: newList,
                            hasAllListData: false,
                        });
                        this.hasAllListData = false;
                        this.currentPageIndex++; //数据加载完后，页码数+1
                    }
                } else {
                    this.hasAllListData = true;
                    this.setData({
                        hasAllListData: true,
                    });
                }
            }
            // } else {}
        });
    },

    // 展示评价区域
    showWrite: function () {
        this.setData({
            showWrite: true,
        });
    },

    // 关闭评论区域
    closeWrite: function () {
        this.setData({
            showWrite: false,
        });
    },

    // 获取用户信息（授权按钮）
    getUserInfoBtn: function (e) {
        let info = JSON.parse(e.detail.rawData);
        app.globalData.userInfo = info;
        this.userInfo = info;
        wx.setStorageSync('nickname', this.userInfo.nickName);
        wx.setStorageSync('avatarUrl', this.userInfo.avatarUrl);

        // 更改页面上的展示按钮
        this.setData({
            hasUserInfo: true,
        });
    },

    // 发表评论
    pushComment: function (e) {
        let content = e.detail.value.textarea;
        app.sendPost(ApiUrls.POST_PUSH_COMMENT, {
            avatarUrl: this.userInfo.avatarUrl,
            content: content,
            nickname: this.userInfo.nickName,
        }, {
            loading: true,
            contentType: 'application/json'
        }).then(res => {
            console.log(res);
            this.currentPageIndex = 1; // 重置活动列表信息的页码
            this.getCommentList();

            this.setData({
                showWrite: false,
                textareaValue: '',
            });
        });
    },
})