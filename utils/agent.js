const agentObj = {
  //发送get
  sendGet(url, prams, options = {}) {
    return this.sendRequest(url, 'GET', prams, options.loading, options.contentType).then(res => this.handleResponse(res, {
      oriUrl: url,
      params: prams,
      reqType: "GET",
      options: options
    })).catch(res => {
      console.log(`Http get error :${JSON.stringify(res)}`)
    });
  },
  //发起post
  sendPost(url, prams, options = {}) {
    return this.sendRequest(url, 'POST', prams, options.loading, options.contentType).then(res => this.handleResponse(res, {
      oriUrl: url,
      params: prams,
      reqType: "POST",
      options: options
    })).catch(res => {
      console.log(`Http post error :${JSON.stringify(res)}`)
    });
  },
  //发起put
  sendPut(url, prams, options = {}) {
    return this.sendRequest(url, 'PUT', prams, options.loading, options.contentType).then(res => this.handleResponse(res, {
      oriUrl: url,
      params: prams,
      reqType: "PUT",
      options: options
    })).catch(res => {
      console.log(`Http PUT error :${JSON.stringify(res)}`)
    });
  },
  //发起delete
  sendDelete(url, prams, options = {}) {
    return this.sendRequest(url, 'DELETE', prams, options.loading, options.contentType).then(res => this.handleResponse(res, {
      oriUrl: url,
      params: prams,
      reqType: "DELETE",
      options: options
    })).catch(res => {
      console.log(`Http DELETE error :${JSON.stringify(res)}`)
    });
  },
  //发送求情
  sendRequest(url, type, params = {}, loading = true , contentType) {
    loading && wx.showLoading();
    let token = '';
    if (params.token) {
      token = params.token;
      delete params.token;
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data: params,
        header: {
          'Content-Type': contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'response-form': 'json',
          'Authorization': 'WECHAT ' + token,
        },
        method: type,
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          if (!res || res.statusCode >= 400) {
            reject(res)
          } else {
            resolve(res)
          }
        },
        fail: function (res) {
          reject(res)
        },
        complete: function (res) {
          loading && wx.hideLoading();
        },
      })
    })
  },
  //处理返回数据
  handleResponse(response, par) {
    if (!response || response.statusCode >= 400) {
      wx.showToast({
        icon: 'none',
        title: '请求失败，请重试',
        duration: 3000
      })
      return undefined;
    } else {
      const res = response.data;
      const oriUrl = par.oriUrl;
      const params = par.params;
      const reqType = par.reqType;
      const options = par.options;
      if (!res || res.code === undefined) {
        if (!options.noToast) {
          wx.showToast({
            icon: 'none',
            title: '网络错误',
            duration: 3000
          })
        }
        return {}
      } else {
        if (res.code === 0) {
          return res;
        } else if (res.code === -1) {
          return this.refreshToken(oriUrl, params, reqType, options)
        } else {
          if (!options.noToast) {
            if (res.msg) {
              wx.showToast({
                title: res.msg,
                icon: 'none',
                duration: 3000
              })
            } else {
              console.log(res.result);
            }
          }
          return {}
        }
      }
    }

  },
  refreshToken(oriUrl, params, reqType, options) {
    return options.oauth(options.app).then(json => {
      if (json) {
        params.token = options.app.globalData.token;
        switch (reqType) {
          case 'POST':
            return this.sendPost(oriUrl, params, options);
          case 'PUT':
            return this.sendPut(oriUrl, params, options);
          case 'DELETE':
            return this.sendDelete(oriUrl, params, options);
          case 'GET':
          default:
            return this.sendGet(oriUrl, params, options);
        }
      } else {
        options.app.globalData.token = null;
        options.app.globalData.mobile = null;
        wx.removeStorage({
          key: 'token',
          success: function (res) {},
        });
        wx.removeStorage({
          key: 'mobile',
          success: function (res) {},
        });
        wx.showToast({
          icon: 'none',
          title: '登录过期',
        })
      }
    })
  },
}

module.exports = agentObj