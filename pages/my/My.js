// pages/me/me.js
const defaultAvatarUrl =
  'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
const app = getApp();
import { ComponentWithStore } from 'mobx-miniprogram-bindings';
import { userStore } from '../../stores/userStore';
import { toJS } from 'mobx-miniprogram'; //这个是为了查看userStore的数据
ComponentWithStore({
  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    code: '',
    login: false,
    avatar: defaultAvatarUrl,
    cellList: [
      {
        icon: 'jifen',
        text: '我的积分',
        page: '/pages/my/point/Point',
      },
      {
        icon: 'myshoucang',
        text: '我的收藏',
        page: '/pages/my/star/Star',
      },
      {
        icon: 'yijian',
        text: '意见反馈',
        page: '/pages/my/advice/Advice',
      },
      // {
      //   icon:'kefu',
      //   text: '联系客服',
      //   page: '../myInfo/myInfo'
      // },
      {
        icon: 'kefu',
        text: '我的订单',
        page: '/pages/my/myList/myList',
      },
      {
        icon: 'tuichu',
        text: '退出登录',
      },
    ],
    ischeck: false,
    sentences: [
      '今天也要好好加油哦，相信自己，自己是最棒的！',
      '每一天都是新的开始，把握当下，创造无限可能！',
      '不要害怕失败，失败只是成功的另一种开始。',
      '用积极的心态面对每一天，你会发现生活更美好。',
    ],
  },
  storeBindings: {
    store: userStore,
    fields: ['token', 'userInfo'],
    actions: ['clearUserInfo'],
  },
  methods: {
    getCheck() {
      const time = '2025-03-18 22:01:15';
      const targetTime = new Date(time);
      const now = new Date();
      this.setData({
        ischeck: now < targetTime ? true : false,
      });
    },
    toLoginPage(e) {
      wx.navigateTo({
        url: '/pages/login/Login',
      });
    },
    toDetail(e) {
      const { page } = e.currentTarget.dataset;
      const newPage = page; // 使用 let 定义一个新变量
      if (newPage) {
        wx.navigateTo({
          url: newPage,
          success: function (res) {
            // 跳转成功
            // console.log('跳转成功');
          },
          fail: function (err) {
            // 跳转失败
            // console.error('跳转失败', err);
          },
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '确定退出吗?',
          success: (res) => {
            const { confirm } = res;
            if (confirm) {
              this.clearUserInfo();
              this.setData({
                login: false,
              });
            }
          },
        });
      }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.getCheck();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
  },
});
