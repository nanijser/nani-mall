const base = {
  storagePrefix: 'xiaoma_'
}

const dev = {
  url_base: '//testnoipc.xiaoma.cn/',
  api_base: '//testnoipcapi.xiaoma.cn/',
  course_api_base: '//testcourseapi.xiaoma.cn/',
  wechat_api_base: '//testcrm.xiaoma.wang/',
  api_mock: '//192.168.1.105:3010/',
  res_base: 'static/'
}

const pro = {
  url_base: '//www.xiaoma.cn/',
  api_base: '//noipcapi.xiaoma.cn/',
  course_api_base: '//courseapi.xiaoma.cn/',
  wechat_api_base: '//wechatapi.xiaoma.wang/',
  res_base: '//xmcdn.oss-cn-shanghai.aliyuncs.com/xm_world/pc/static/',
}

const test = {
  url_base: '//www.xiaoma.cn/',
  api_base: '//noipcapi.xiaoma.cn/',
  course_api_base: '//courseapi.xiaoma.cn/',
  wechat_api_base: '//wechatapi.xiaoma.wang/',
  res_base: '//xmcdn.oss-cn-shanghai.aliyuncs.com/xm_world/pc/static/',
}

let config = dev;
if (process.env.NODE_ENV === 'production') {
  config = pro;
}else if (process.env.NODE_ENV === 'testbuild') {
  config = test;
}
export default {...base, ...config};
