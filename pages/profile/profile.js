// pages/profile/profile.js
import { userBehavior } from './behavior'
import { getStorage, setStorage } from '../../utils/storage'
import { toast } from '../../utils/extendApi'
import { reqUploadFile, reqUpdateUserInfo } from '../../api/user'

Page({
  // 注册 behavior
  behaviors: [userBehavior],

  // 页面的初始数据
  data: {
    isShowPopup: false // 控制更新用户昵称的弹框显示与否
  },
  // 更新用户信息
  async updateUserInfo() {
      // 调用接口 API 函数更新用户信息
      const res = await reqUpdateUserInfo(this.data.userInfo)
      // 用户信息更新成功以后，需要将最新的用户信息存储到本地
      setStorage('userInfo', this.data.userInfo)
      console.log(this.data.userInfo);
      this.setUserInfo(this.data.userInfo);
      // 给用户进行提示
      toast({ title: "用户信息更新成功" }).then(() => {
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/my/My',
            success: () => {
              console.log("页面跳转成功");
            },
            fail: (error) => {
              console.error("页面跳转失败", error);
            }
          });
        }, 2000); // 确保跳转在 toast 消失后发生
      });
  },

  // 更新用户头像
  async chooseAvatar(event) {
    // console.log(event)

    // 获取头像的临时路径
    // 临时路径具有失效时间，需要将临时路径上传到公司的服务器，获取永久的路径
    // 在获取永久路径以后，需要使用永久路径更新 headimgurl
    // 用户点击 保存按钮，才算真正的更新了头像和昵称
    const { avatarUrl } = event.detail

    // 第二种实现本地资源上传的方式：使用 mina-request 提供的 upload 实例方法
    const res = await reqUploadFile(avatarUrl)
    this.setData({
      'userInfo.avatar': res.data
    })
  },

  // 获取用户昵称
  getUserName(event) {
    // console.log(event.detail.value)
    // 解构最新的用户昵称
    const { username } = event.detail.value
    // console.log(username)
    this.setData({
      'userInfo.username': username,
      isShowPopup: false
    })
  },

  // 显示修改昵称弹框
  onUpdateUserName() {
    this.setData({
      isShowPopup: true,
      'userInfo.username': this.data.userInfo.username
    })
  },

  // 弹框取消按钮
  cancelForm() {
    this.setData({
      isShowPopup: false
    })
  }
})
