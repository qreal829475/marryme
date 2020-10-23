import urls from './urls.js'
class UserUtil {
  /**
   * 手机号的授权回调
   * page主要用来更新界面，可以不传
   */
  handlePhoneNumber(e, app, channelId) {
    if (e.detail.errMsg === "getPhoneNumber:ok") {
      const user = app.globalData.userInfo;
      if (app.globalData.token) {
        return this.decodeData(app, e.detail.encryptedData, e.detail.iv).then(data => {
          if (data) {
            app.globalData.mobile = data.phoneNumber;
            wx.setStorage({
              key: 'mobile',
              data: data.phoneNumber
            })
            return data;
          }
        })
      } else {
        return this.oauth(app).then(res => {
          if (res) {
            return this.decodeData(app, e.detail.encryptedData, e.detail.iv).then(data => {
              if (data) {
                app.globalData.mobile = data.phoneNumber;
                wx.setStorage({
                  key: 'mobile',
                  data: data.phoneNumber
                })
                return data;
              }
            })
          } else {
            return new Promise(() => false);
          }

        })
      }
    }
    return new Promise(() => false);
  }
  /**
   * 解密数据
   */
  decodeData(app, data, iv) {
    return app.sendPost(urls.DECODE_DATA, {
      encryptedData: data,
      iv: iv
    }, {
      loading: true
    }).then(json => {
      if (json && json.code === 0) {
        let result =  JSON.parse(json.data);
        return result;
      }
      return false;
    })
  }

  /**
   * 登录
   */
  oauth(app) {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          console.log(res);
          app.globalData.code = res.code;
          return app.sendGet(urls.GET_LOGIN, {
            code: res.code,
          }).then(json => {
            if (json && json.code === 0) {
              app.globalData.token = json.data.token;
              wx.setStorageSync('token', json.data.token)
              return resolve(true);
            } else {
              wx.showToast({
                title: '登录失败',
              })
              return resolve(false);
            }
          })
        }
      });
    });
  }

  /**
   * 用户头像授权的回调
   */
  handleUserInfo(e, app) {
    if (e.detail.errMsg === "getUserInfo:ok") {
      app.globalData.userInfo = e.detail.userInfo;
      wx.setStorage({
        key: "avatarUrl",
        data: e.detail.userInfo.avatarUrl
      })
      wx.setStorage({
        key: "nickName",
        data: e.detail.userInfo.nickName
      })
      return this.decodeData(app, e.detail.encryptedData, e.detail.iv).then(data => {
        if (data) {
          return data;
        }
        return false;
      })
    } else {
      return new Promise(() => false);
    }
  }
  /**
   * 如果已经授权过了，但是又没有关注过相关的公众号，就会导致login接口获取不到unionId。
   * 所以需要代码去获得userInfo
   */
  initUserInfo(app) {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: res => {
              this.handleUserInfo({
                detail: res
              }, app);
            }
          })
        }
      }
    });
  }
}

export default new UserUtil();