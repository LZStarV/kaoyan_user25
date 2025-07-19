// pages/my/star/Star.js
import { reqStar } from '../../../api/user';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navList: [
      { id: '1', name: '资讯' },
      { id: 2, name: '院校' },
    ],
    articleList: [],
    collegeList: [],
    type: 1,
    examDate: '2025-12-21', // 考研日期
    days: 0, // 倒计天数
    tasks: [
      { id: 1, name: '英语阅读1篇', progress: 0 },
      { id: 2, name: '数学练习题10道', progress: 0 },
      { id: 3, name: '背单词50个', progress: 0 },
    ],
    ischeck: false,
  },
  //处理tab
  async handleTabChange(e) {
    const { typeId } = e.detail;
    console.log('Current tab index from child:', typeId);
    // 清空列表并更新 type
    this.setData({
      type: typeId,
    });
    try {
      const { data } = await reqStar(typeId);
      console.log(typeId === 1 ? 'articleList' : 'collegeList');
      this.setData({
        [typeId === 1 ? 'articleList' : 'collegeList']: data,
      });
      console.log(this.data.articleList);
      console.log(this.data.collegeList);
    } catch (error) {
      console.error('Error fetching data:', error);
      // 可在这里处理错误提示
    }
  },
  async init() {
    const { data } = await reqStar(this.data.type);
    this.setData({
      [this.data.type === 1 ? 'articleList' : 'collegeList']: data,
    });
  },
  //去到院校详情页
  gotoDetail: function (e) {
    const postId = e.currentTarget.dataset.id;
    console.log(postId);
    wx.navigateTo({
      url: '../../../packageCollege/collegeDetail/CollegeDetail?id=' + postId,
    });
  },

  // 计算距离考研的天数
  calculateDays() {
    const today = new Date();
    const examDate = new Date(this.data.examDate);
    const diffTime = examDate - today;
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.setData({ days });
  },
  getCheck() {
    const time = '2025-03-18 22:01:15';
    const targetTime = new Date(time);
    const now = new Date();
    this.setData({
      ischeck: now < targetTime ? true : false,
    });
  },
  // 更新任务进度（示例）
  updateTaskProgress(taskId, progress) {
    const tasks = this.data.tasks.map((task) => {
      if (task.id === taskId) {
        task.progress = progress;
      }
      return task;
    });
    this.setData({ tasks });
  },
  onShow() {
    this.getCheck();
    if (this.data.ischeck) {
      this.calculateDays();
    } else {
      this.init();
    }
  },
});
