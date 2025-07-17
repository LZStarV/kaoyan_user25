//observable创建被监测的对象，对象中的属性会被转换为响应式数据
//action函数用来显示的定义action方法
import { observable, action } from 'mobx-miniprogram';
import { getStorage, removeStorage } from '../utils/storage';

export const userStore = observable({
  //定义响应式数据

  //token身份令牌
  token: getStorage('token') || '',

  //用户信息
  userInfo: getStorage('userInfo') || {},

  //定义action
  //setToken用来修改，更新token
  setToken: action(function (token) {
    //在调用setToken方法时，需要传入token数据进行赋值
    console.log('token', token);
    this.token = token;
  }),

  //对用户信息进行赋值
  setUserInfo: action(function (userInfo) {
    console.log('userInfo', userInfo);
    this.userInfo = userInfo;
  }),

  // 新增清空用户信息的方法
  clearUserInfo: action(function () {
    removeStorage('token');
    removeStorage('userInfo');
    this.userInfo = null;
    this.token = null;
    console.log('清除');
  }),
});
