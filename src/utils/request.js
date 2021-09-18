/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { notification } from 'antd';
import Cookies from 'js-cookie'

export const endpoints = {
  // auth & mine
  signup: '/user',
  login: '/login',
  wechatLogin: '/login/weChat',
  userInfo: '/user',
  fansList: '/userFollow/fans',
  followList: '/userFollow/idols',
  userFollow: '/userFollow',
  black: '/userBlack',
  privateCfg: '/user/privateCfg',
  notionCfg: '/user/notionCfg',
  userOpinion: '/userOpinion',

  // daily
  post: '/post',
  postRecommends: '/post/recommends',
  postCollections: '/post/listCollection',
  postTags: '/post/listTags',

  // faqs
  question: '/question',
  topic: '/topic',
  questionRecommends: '/question/recommend',
  questionHot: '/question/hot',
  questionFocus: '/question/focus',
  focusQuestion: '/focusQuestion',
  unFocusQuestion: '/unFocusQuestion',
  answers: '/answer',
  answerLike: '/answer/like',
  answerDisLike: '/answer/disLike',
  answerCollection: '/answer/collection',
  answerDisCollection: '/answer/disCollection',
  createReview: '/comment',
  createReply: '/comment/second',
  comment: '/comment/list',
  subComment: '/comment/second/list',
  commentLike: '/comment/like',
  commentDisLike: '/comment/disLike',
  subCommentLike: '/comment/second/like',
  subCommentDisLike: '/comment/second/disLike',
  myQuestions: '/QA/question',
  myQALike: '/QA/like',
  myQABrowse: '/QA/browse',
  myQACollect: '/QA/collection',
  faqsSearch: '/question/search',

  // activity
  activity: '/activity',

  // coupon
  coupon: '/coupon',
  couponRecommend: '/coupon/recommend',
  couponMyCollect: '/coupon/myCollection',
  couponNear: '/coupon/near',
  couponMyReceived: '/coupon/myReceived',
  couponMyPost: '/coupon/myPost',
  couponDetails: '/coupon/detail',
  couponReceive: '/coupon/receive',
  couponUse: '/coupon/use',
  couponCollect: '/coupon/collection',
};

export const METHOD = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  PATCH: 'patch',
  DEL: 'delete',
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * @zh-CN 异常处理程序
 * @en-US Exception handler
 */

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `Request error ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Your network is abnormal and cannot connect to the server',
      message: 'Network anomaly',
    });
  }

  return response;
};
/**
 * @en-US Configure the default parameters for request
 * @zh-CN 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // default error handling
  credentials: 'include', // Does the default request bring cookies
  headers: {
    sessiontoken: Cookies.get('sessiontoken'),
  },
});

request.use(async (ctx, next) => {
  const { req } = ctx;
  const { url, options } = req;
  req.url = `/api${url}`
  options.headers.sessiontoken = Cookies.get('sessiontoken');
  // console.log(req, '::::', url, ',', options);
  await next();
  
  // const { res } = ctx;
  // console.log('res::::', res);
});

request.interceptors.response.use((response) => {
  return response;
  // if (!response.data) {
  //   throw new Error('服务器异常，请稍后再试');
  // }
  // if (response.data.success !== 1) {
  //   throw new Error(response.data.msg);
  // }
  // return Object.assign(response.data, { headers: response.headers });
});

export default request;
