import { getArticle } from '../../api/article';
import {
  getCarousel,
  getListType,
  juedgeIsSign,
  signToday,
} from '../../api/home';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ischeck: false,
    postSign: '',
    sign: false, //没有签到
    loading: true, //是否显示骨架屏，默认显示
    bannerList: [
      { cover: '../../../images/home/swiper_1.png' },
      { cover: '../../../images/icon/close.png' },
      { cover: '../../../images/home/swiper_1.png' },
    ],
    date: { day: 278, year: 2025 }, //距2025考研还有278天
    dataList: [],
    categoryList: [
      {
        name: '国家线',
        imageUrl: '/images/home/line.png',
        url: '/pages/line/Line',
      },
      {
        name: '院校查询',
        imageUrl: '/images/home/college.png',
        url: '../../packageCollege/college/College',
      },
      {
        name: '历年真题',
        imageUrl: '/images/home/exam.png',
        url: '/pages/exam/Exam',
      },
      {
        name: '资源库',
        imageUrl: '/images/home/resource.png',
        url: '../../packageResource/resource/Resource',
      },
    ],
    sentences: [
      '考研倒计时，每一天都值得全力以赴！',
      '不要被困难吓倒，考研是你实现梦想的必经之路。',
      '坚持到最后，你会发现所有的努力都有意义。',
      '考研路上，你不是一个人在战斗。我们一起加油！',
      '每一次复习，都是向目标迈进的一步。坚持下去，你一定可以！',
      '考研不仅是知识的积累，更是心态的磨练。相信自己，你是最棒的！',
    ],
    scrollTop: false,
    currentTab: 0,
    navList: [{ id: '', name: '全部' }],
    articleList: [], //文章列表数据
    total: 0, //数据总条数
    isFinish: false, //判断数据是否全部加载了
    isLoading: false, //判断数据是否加载完毕
    //文章列表请求参数
    requestArticleData: {
      page: 1, //页码
      pageSize: 5, //每页请求的参数
      typeId: '',
    },
  },
  //签到
  async sign() {
    await signToday();
    this.setData({
      sign: true,
    });
  },
  //去搜索
  gotoSearch() {
    wx.navigateTo({
      url: '/pages/home/searchArticle/SearchArticle',
    });
  },
  //计算距离考研的时间
  cal() {
    // 获取当前日期
    const currentDate = new Date();
    // 考研日期（2025年12月21日）
    const examDate = new Date(2025, 11, 21); // 11表示12月
    // 计算两个日期之间的天数差
    const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
    const daysToExam = Math.round((examDate - currentDate) / oneDay); // 使用currentDate

    // 更新数据
    this.setData({
      date: { day: daysToExam }, // 正确的赋值方式
    });
  },
  //回到顶部
  goTop: function (e) {
    // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({ scrollTop: 0 });
      this.data.requestArticleData.page = 1;
    } else {
      wx.showModal({
        title: '提示',
        content:
          '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
      });
    }
  },
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    this.setData({
      scrollTopHeight: e.scrollTop,
    });
    if (e.scrollTop > 100) {
      this.setData({
        scrollTop: true,
      });
    } else {
      this.setData({
        scrollTop: false,
      });
    }
  },
  //处理tab
  handleTabChange(e) {
    const { typeId } = e.detail;
    this.setData({
      'requestArticleData.typeId': typeId,
      articleList: '',
      'requestArticleData.page': 1,
    });
    this.getArticleList();
  },
  //获取文章列表数据
  async getArticleList() {
    //在请求发送之前，需要将isLoading设置为true,表示请求正在发送中
    this.data.isLoading = true;

    //发生请求
    const { data } = await getArticle(this.data.requestArticleData);

    //在请求结束以后，需要将isLoaing设置为false,表示请求已经结束
    this.data.isLoading = false;

    this.setData({
      articleList: [...this.data.articleList, ...data.records],
      total: data.total,
    });
  },

  //去到积分页面
  gotoPoint() {
    wx.navigateTo({
      url: '../../pages/my/point/Point',
    });
  },
  getCheck() {
    const time = '2025-03-18 22:01:15';
    const targetTime = new Date(time);
    const now = new Date();
    this.setData({
      ischeck: now < targetTime ? true : false,
    });
  },
  //获取轮播图和分类数据
  async getDataList() {
    const [res1, res2] = await Promise.all([getCarousel(), getListType()]);
    const bannerList = res1.data;
    //funcType 功能类型:1-国家线，2-院校查询，3-历年真题，4-资源库，5-积分商城
    const funcList = {
      1: '/pages/line/Line',
      2: '../../packageCollege/college/College',
      3: '/pages/exam/Exam',
      4: '../../packageResource/resource/Resource',
      5: '/pages/utils/Utils',
    };
    bannerList.forEach((item, index, array) => {
      let navUrl;
      //jumpType 跳转类型 1资讯 2功能
      if (item.jumpType === '1') {
        // postId 资讯的ID
        navUrl = '/pages/home/articleDetail/ArticleDetail?id=' + item.postId;
      } else if (item.jumpType === '2') {
        navUrl = funcList[Number(item.funcType)];
      }
      array[index].navUrl = navUrl;
    });
    this.setData({
      loading: false,
      bannerList: res1.data,
      navList: [...this.data.navList, ...res2.data],
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCheck();
    if (!this.data.ischeck) {
      this.cal();
      this.getDataList();
      this.getArticleList();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},
  async getSign() {
    await juedgeIsSign()
      .then((res) => {
        this.setData({
          postSign: true,
          sign: res.data,
        });
      })
      .catch((err) => {
        this.setData({
          postSign: false,
        });
      });
  },
  onShow() {
    if (!this.data.ischeck) {
      this.getSign();
      if (this.data.postSign === false) {
        this.getSign();
      }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    //解构数据
    const { articleList, total, requestArticleData, isLoading } = this.data;
    const { page } = requestArticleData;
    //判断isLoading状态
    //如果状态等于true,说明请求正在发送中，如果请求正在发送中，就不请求下一页数据
    if (isLoading) {
      return;
    }
    console.log('articleList.length', articleList.length);
    //让articleList长度和total进行对比
    //如果数据相等，则列表已经加载完毕
    if (articleList.length >= total) {
      this.setData({
        isFinish: true,
      });
      return;
    }
    //页码+1
    this.setData({
      requestArticleData: { ...this.data.requestArticleData, page: page + 1 },
    });
    this.getArticleList();
    this.getArticleList();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // 将数据进行重置
    this.setData({
      articleList: [],
      total: 0,
      isFinish: false,
      requestArticleData: { ...this.data.requestArticleData, page: 1 },
    });

    // 使用最新的参数发送请求
    this.getArticleList();

    // 手动关闭下拉刷新的效果
    wx.stopPullDownRefresh();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
