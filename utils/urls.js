import profile from './profile.js';

const urls = {
  GET_COMMENT_LIST: '/comments', //评论列表
  POST_PUSH_COMMENT: '/comments', //发表评论
};
for (var key in urls) {
  let v = urls[key];
  if (v.indexOf('/') > 0) v = `/${v}`;
  urls[key] = `${profile.ROOT}${v}`;
}
module.exports = urls;