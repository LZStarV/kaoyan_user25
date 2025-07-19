// app.js
// import {toast} from './utils/extendApi'
import './utils/extendApi';
App({
  onLaunch() {
    // 展示本地存储能力
    wx.loadFontFace({
      family: 'webfont',
      source: 'url("//at.alicdn.com/t/webfont_1f7b3qbimiv.eot")',
      success: function (res) {
        console.log(res.status); // loaded
      },
      fail: function (res) {
        console.log(res.status); // error
      },
      complete: function (res) {
        console.log(res.status);
      },
    });
  },
  onShow() {
    //获取当前小程序的账号信息
    const accountInfo = wx.getAccountInfoSync();
    console.log(accountInfo.miniProgram.envVersion);
  },
});
