// pages/utils/Utils.js
import { getCalendar } from '../../api/calendar';
import { getNavList, getItemList, exchangeItem } from '../../api/item';
import { toast } from '../../utils/extendApi';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    itemList: [], // 物品列表
    total: 0, //数据总条数
    isFinish: false, //判断数据是否全部加载完毕
    isLoading: false, //判断数据是否加载完毕
    categoryList: [
      {
        name: '国家线',
        nav: 'line',
        imageUrl: '/images/home/line.png',
        url: '/pages/line/Line',
      },
      {
        name: '院校查询',
        nav: 'college',
        imageUrl: '/images/home/college.png',
        url: '../../packageCollege/college/College',
      },
      {
        name: '历年真题',
        nav: 'exam',
        imageUrl: '/images/home/exam.png',
        url: '/pages/exam/Exam',
      },
      {
        name: '资源库',
        nav: 'resource',
        imageUrl: '/images/home/resource.png',
        url: '../../packageResource/resource/Resource',
      },
    ],
    days: 100, // 考研倒计时天数
    sentences: [
      '考研路上，每一步都算数，每一个努力都不会白费！',
      '相信自己，你比想象中更强大！',
      '不要害怕困难，考研是你成长的最好契机。',
      '坚持到底就是胜利，加油，考研人！',
    ],
    experiences: [
      {
        title: '学长A：时间管理很重要',
        content: '合理规划时间，每天固定学习科目，不要拖延，坚持就是胜利！',
      },
      {
        title: '学姐B：心态很重要',
        content:
          '保持积极心态，不要因为一时的挫折而放弃。相信自己，你一定可以！',
      },
      {
        title: '学长C：多做真题',
        content:
          '真题是最好的复习资料，多做真题，总结经验，提高答题速度和准确率。',
      },
    ],
    id: '', //物品分类id
    navList: [{ id: '', name: '全部' }], //商品分类信息
    pageNum: 1, //
    year: new Date().getFullYear(), //月历年份
    calendarList: [], //月历信息
    ischeck: false,
  },
  gotoDetail(e) {
    const postId = e.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '/pages/home/articleDetail/ArticleDetail?id=' + postId,
    });
  },
  // async getItemDataList() { //可在onLoad中设置为进入页面默认加载
  //   //在发送请求之前，需要将isLoading设置为true,表示请求正在发送中
  //   this.data.isLoading=true
  //   id: '', // 物品分类id
  //   navList: null, // 商品分类信息
  //   pageNum: 1, // 当前页码
  //   year: new Date().getFullYear(), // 月历年份
  //   calendarList: [], // 月历信息
  // },

  async getItemDataList() {
    if (this.data.isLoading || this.data.isFinish) {
      return;
    } // Prevent concurrent requests
    this.setData({ isLoading: true }); // Start loading

    // 发送请求
    const { data } = await getItemList(this.data.id);
    const newDataLength = data.length;

    this.setData({
      itemList: [...this.data.itemList, ...data],
      total: newDataLength,
      isLoading: false,
      isFinish: newDataLength < 10, // Assuming 10 is the page size
    });
  },

  async getAllDataList() {
    const [res1, res2] = await Promise.all([
      getNavList(),
      getItemList(this.data.id),
    ]);
    this.setData({
      navList: [{ id: '', name: '全部' }, ...res1.data],
      itemList: res2.data,
      isFinish: res2.data.length < 10, // Assuming 10 is the page size
    });

    const res = await getCalendar();
    const calendar = res.data.sort((a, b) => a.month - b.month);
    this.setData({
      calendarList: calendar,
    });
  },

  handleTabChange(e) {
    const { typeId } = e.detail;
    this.setData({
      id: typeId,
      itemList: [], // Reset item list when changing tabs
      pageNum: 1, // Reset page number
      isFinish: false, // Reset finish status
    });
    this.getItemDataList();
  },

  async exchange(e) {
    const { msg } = await exchangeItem(e.currentTarget.dataset.item.id);
    console.log(msg);
    if (msg !== null) {
      toast({ title: msg });
    }
  },

  onLoad() {
    // 定义目标时间（字符串格式）
    const time = '2025-03-18 22:01:15';
    // 将目标时间字符串转换为 Date 对象
    const targetTime = new Date(time);
    // 获取当前时间的 Date 对象
    const now = new Date();
    // 比较当前时间是否小于目标时间
    this.setData({
      ischeck: now < targetTime ? true : false,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (!this.data.ischeck) {
      this.setData({
        navList: ['全部'],
      });
      this.getAllDataList();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.isLoading || this.data.isFinish) {
      return;
    } // Prevent concurrent requests
    this.setData({ pageNum: this.data.pageNum + 1 }); // Increment page number
    this.getItemDataList(); // Load more items
  },
});
