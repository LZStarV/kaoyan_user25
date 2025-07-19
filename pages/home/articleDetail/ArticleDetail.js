// pages/article/Article.js
import {
  getArticleDetail,
  likeArticle,
  starArticle,
} from '../../../api/article';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    postId: '',
    initLike: '',
    initStar: '',
    isLiked: false,
    isStared: false,
    requestStarArticleData: {
      id: '',
      type: 1,
      ischeck: false,
    },
    data: {
      time: '02:30:00', // 默认计时时间
      quote: '努力不一定成功，但放弃一定失败！', // 每日激励语
      intervalId: null, // 定时器ID
      isRunning: false, // 是否正在计时
    },
  },
  // 开始计时
  startTimer() {
    if (this.data.isRunning) {
      return;
    } // 如果已经在运行，则不重复开始
    this.setData({ isRunning: true });
    this.data.intervalId = setInterval(() => {
      let [hours, minutes, seconds] = this.data.time.split(':').map(Number);
      if (seconds > 0) {
        seconds--;
      } else if (minutes > 0) {
        minutes--;
        seconds = 59;
      } else if (hours > 0) {
        hours--;
        minutes = 59;
        seconds = 59;
      } else {
        clearInterval(this.data.intervalId);
        this.setData({ isRunning: false });
        wx.showToast({
          title: '时间到！',
          icon: 'success',
          duration: 2000,
        });
        return;
      }
      this.setData({
        time: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
      });
    }, 1000);
  },

  // 暂停计时
  pauseTimer() {
    if (!this.data.isRunning) {
      return;
    } // 如果没有在运行，则不操作
    clearInterval(this.data.intervalId);
    this.setData({ isRunning: false });
  },

  // 重置计时
  resetTimer() {
    clearInterval(this.data.intervalId);
    this.setData({ time: '02:30:00', isRunning: false });
  },
  getCheck() {
    const time = '2025-03-18 22:01:15';
    const targetTime = new Date(time);
    const now = new Date();
    this.setData({
      ischeck: now < targetTime ? true : false,
    });
  },
  async getArticleList() {
    const { data } = await getArticleDetail(this.data.postId);
    console.log(data);
    this.setData({
      info: data,
      isLiked: data.isLiked,
      isStared: data.isStarred,
      initLike: data.isLiked,
      initStar: data.isStarred,
    });
  },
  click_like() {
    const {
      isLiked,
      info: { likeCount },
    } = this.data;
    const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
    this.setData({
      isLiked: !isLiked,
      'info.likeCount': newLikeCount,
    });
  },
  click_star() {
    const {
      isStared,
      info: { starCount },
    } = this.data;
    const newStarCount = isStared ? starCount - 1 : starCount + 1;
    this.setData({
      isStared: !this.data.isStared,
      'info.starCount': newStarCount,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const postId = options.id;
    this.setData({
      postId,
      'requestStarArticleData.id': postId,
    });
  },
  onShow() {
    this.getCheck();
    if (!this.data.ischeck) {
      if (this.data.postId) {
        this.getArticleList();
      }
    }
  },
  // 页面卸载时触发,当退出页面时候才点赞或取消
  onUnload() {
    if (this.data.initLike !== this.data.isLiked) {
      likeArticle(this.data.postId);
    }
    if (this.data.initStar !== this.data.isStared) {
      starArticle(this.data.requestStarArticleData);
    }
  },
  onShareAppMessage() {
    return {
      title: this.data.info.title,
      path: '/pages/home/articleDetail/ArticleDetail.js?id={this.data.info.id}', // 分享的页面路径及参数
    };
  },
});
