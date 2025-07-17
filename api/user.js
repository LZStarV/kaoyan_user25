import http from '../utils/http';

/**
 * @description 进行登录操作
 * @param {*} code 临时登录凭证
 * @returns Promise
 */
export const reqLogin = (code, avatar, username) =>
  http.post(
    '/user/login',
    { code, avatar, username },
    { header: { 'Content-type': 'application/json' } },
  );

/**
 * @description 获取用户信息
 * @return Promise
 */
export const reqUserInfo = () => http.get('/user/info');

/**
 * @description 实现本地资源上传
 * @param{*} filePath 要上传的文件资源路径
 */
export const reqUploadFile = (filePath) =>
  http.upload('/common/upload', filePath);

/**
 * @description 更新用户信息
 * @param {*} userInfo 最新的头像和昵称
 * @return Promise
 */
export const reqUpdateUserInfo = (userInfo) =>
  http.put('/user/edit', userInfo, {
    header: { 'Content-type': 'application/json' },
  });

/**
 * @description 提交反馈
 * @param （data）反馈的参数
 */
export const submitFeedback = (data) =>
  http.post('/user/feedback', data, {
    header: { 'Content-type': 'application/json' },
  });

/**
 * @description 查询收藏
 * @param (type表示类型,1资讯，2院校)
 */
export const reqStar = (type) => http.get('/user/star/list', { type });

/**
 * @description 查询用户月签到记录
 * @param （year表示年,month表示月）
 */
export const reqSign = (data) => http.get('/user/sign/list', data);

/**
 * @description 判断是否签到
 * @param 无参数
 */
export const judgeIsSign = () => http.get('/user/isSign');

/**
 * @description 签到
 * @param 无参数
 */
export const signToday = () =>
  http.post('/user/sign', { header: { 'Content-type': 'application/json' } });

/**
 * @description 获取订单列表
 * @param //status 0-未兑换，1-已兑换，null-全部
 */
export const reqOrders = (status) => http.get('/orders', { status });
