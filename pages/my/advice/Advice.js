// pages/my/advice/Advice.js
import {
  submitFeedback
} from '../../../api/user'
import {
  reqUploadFile
} from '../../../api/user'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    feedback: '', // 反馈的数据
    contact: '', //用户的联系方式
    imageUrl: '', // 反馈的图片的地址
    tempFile: '', // 反馈的图片文件
  },

  // 通过触发事件的对象名获取要改变的数据
  handleInput(event) {

    const name = event.currentTarget.dataset.name;
    this.setData({
      [name]: event.detail.value // 更新数据
    });
  },

  async submitInfo() {
    let uploadResponse;
    console.log(this.data.contact);
    // 后端返回上传的结果，包含图片在后端服务器的路径，将该路径与反馈一同发送到服务端
    if (this.data.tempFile) {
      uploadResponse = await reqUploadFile(this.data.tempFile.path);
    };

    submitFeedback({
      description: this.data.feedback,
      img: uploadResponse?.data || '',
      contact: this.data.contact
    }).then(
      () => wx.navigateBack()
    ).catch();
  },
  handleChooseImg() {
    //!调用小程序内置的选择图片API，会返回选择图片的本地路径 http开头的一个url，可以配合wx.uploadFile 进行上传到自己的服务器
    wx.chooseImage({
      // 同时选中的图片的数量
      count: 1,
      // 图片的格式  原图  压缩
      sizeType: ['original', 'compressed'],
      // 图片的来源  相册  照相机
      sourceType: ['album', 'camera'],
      success: (result) => {
        console.log(result.tempFilePaths);
        this.setData({
          imageUrl: result.tempFilePaths,
          tempFile: result.tempFiles[0],
        })
        console.log(this.data.tempFile);
      }
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})