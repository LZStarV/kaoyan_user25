//导入接口API函数
import {reqLogin,reqUserInfo} from '../../api/user'
//导入本地存储api
import {setStorage} from '../../utils/storage'
//导入封装通用模块方法
import {toast} from '../../utils/extendApi'

//导入ComponentWithStore方法
import {ComponentWithStore} from 'mobx-miniprogram-bindings'

//导入store对象
import {userStore} from '../../stores/userStore'


//使用ComponentWithStore方法替换Component方法来构造页面
ComponentWithStore({
  //让页面和Store对象建立关联
  storeBindings:{
    store:userStore,
    fields:['token','userInfo'],
    actions:['setToken','setUserInfo']
  },
  methods:{
  //授权登录
  login: function () {
    // 使用 wx.login 获取用户的临时登录凭证 code
    wx.login({
      success: async ({ code }) => {
        console.log(code)
        if (code) {
          // 在获取到临时登录凭证 code 以后，需要传递给开发者服务器
          const { data } = await reqLogin(code)

          // 登录成功以后，需要将服务器响应的自定义登录态存储到本地
          setStorage('token', data.token)

          // 将自定义登录态 token 存储到 Store 对象
          this.setToken(data.token)

          if(!data.token.theNew)
          {// 获取用户信息
          this.getUserInfo()
          // 返回上一级页面
          wx.navigateBack()}
          else
          {
            // 使用 toast 函数并在 toast 完成后跳转
            toast({ title: "请先完善个人信息" }).then(() => {
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/profile/profile',
                });
              }, 2000); // 确保跳转在 toast 消失后发生
            });
          }
        } else {
          toast({ title: '授权失败，请重新授权' })
        }
      }
    })
  },
  //获取用户信息
  async getUserInfo()
  {
    //调用接口
    const res=await reqUserInfo();
    console.log(res.data);
    //将用户信息存储到本地
    setStorage('userInfo',res.data)
    //将用户信息存储到Store对象
    this.setUserInfo(res.data)
  }
}
})
