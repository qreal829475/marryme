import profile from './profile.js';

const urls = {
  GET_LOGIN: '/wechat/login', //登录
  DECODE_DATA: '/userinfo/decode',//微信敏感数据解密接口
  GET_HOT_GOODS_LIST: '/public/goods/top', //热门商品列表
  GET_GOODS_LIST: '/public/goods/page', //获取商品列表
  GET_ADS_INFO: '/public/file/ads', //获取首页广告地址
  GET_GOODS_DETAIL: '/public/goods/detail', //获取商品详情
  GET_AREA_DATA: '/address/all', //获取省市区信息
  POST_ADD_ADDRESS: '/useraddress/add', //添加用户地址
  GET_ADDRESS_LIST: '/useraddress/page', //用户地址列表
  PUT_UPDATE_ADDRESS: '/useraddress/update', //修改用户地址
  DELETE_ADDRESS: '/useraddress', //删除用户地址
  PUT_CONFIRM_ORDER: '/goodsorder/confirm', //确认下单
  PUT_ORDER: '/goodsorder/order', //下单
  GET_ORDER_LIST: '/goodsorder/page', //订单列表
  GET_ORDER_DETAIL: '/goodsorder/detail', //订单详情
  DELETE_CART_GOODS: '/goodscar', //删除购物车数据
  PUT_CART_ADD: '/goodscar/add', //添加购物车商品
  GET_CART_INVALIDLIST: '/goodscar/invalidpage', //获取购物车失效列表
  GET_CART_LIST: '/goodscar/page', //获取购物车列表
  PUT_CART_UPDATE: '/goodscar/update', //修改购物车数据
  PUT_CART_CONFIRM_ORDER: '/goodsorder/carconfirm', //购物车确认下单
  PUT_CART_ORDER: '/goodsorder/carorder', //购物车下单
  DELETE_CART_INVALID_LIST: '/goodscar/deleteinvalid', //清除购物车失效商品
};
for (var key in urls) {
  let v = urls[key];
  if (v.indexOf('/') > 0) v = `/${v}`;
  urls[key] = `${profile.ROOT}${v}`;
}
module.exports = urls;