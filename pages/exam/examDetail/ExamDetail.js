// pages/utils/exam/examDetail/ExamDetail.js
import { getExamDetail, downLoadPaper } from '../../../api/exam';
import { getStorage } from '../../../utils/storage';
import { openFile } from '../../../utils/file';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    examInfo: '',
  },

  async getExamInfo(id) {
    const { data } = await getExamDetail(id);
    console.log(data);
    this.setData({
      examInfo: data,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id;
    this.getExamInfo(id);
  },
  async preView() {
    const { data } = await downLoadPaper(this.data.examInfo.id);
    console.log(data);
    wx.previewImage({
      urls: [data], // 图片的 URL 列表
      success: function (res) {
        console.log('图片预览成功');
      },
      fail: function (err) {
        console.error('图片预览失败：', err);
      },
    });
  },

  async downLoad() {
    const { data } = await downLoadPaper(this.data.examInfo.id);
    const { examInfo } = this.data;
    wx.downloadFile({
      url: data,
      header: {
        Authorization: getStorage('token'),
      },
      success: function (res) {
        if (res.statusCode === 200) {
          const filePath = res.tempFilePath;
          console.log('文件下载成功，路径：', filePath);
          if (examInfo.form === 'png') {
            console.log('xxx');
            wx.previewImage({
              urls: [filePath], // 图片的 URL 列表
              success: function (res) {
                console.log('图片预览成功');
              },
              fail: function (err) {
                console.error('图片预览失败：', err);
              },
            });
          } else {
            wx.openDocument({
              filePath: res.tempFilePath,
              success: function (res) {
                console.log('打开文档成功');
              },
              fail: () => {
                console.log('失败');
              },
            });
          }
        } else {
          console.error('下载失败，状态码：', res.statusCode);
        }
      },
      fail: function (err) {
        console.error('文件下载失败：', err);
      },
    });
  },
});
