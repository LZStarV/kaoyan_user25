// pages/my/myList/myList.js
import {reqOrders} from '../../../api/user'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[{"id":'','name':"全部"},{"id":0,'name':'未兑换'},{"id":1,'name':'已兑换'}],
    status:'',
    total:0,//数据总条数
    isFinish:false,//判断数据是否全部加载了
    isLoading:false,//判断数据是否加载完毕
    ordersList:[],
    isfull: false,//点击上方的选择框的时候让页面不能滑动
  },
    //处理tab
    handleTabChange(e) {
      const { typeId } = e.detail;
      this.data.status=typeId;
      this.getOrdersList()
    },
     //获取文章列表数据
     async getOrdersList()
     {
       //在请求发送之前，需要将isLoading设置为true,表示请求正在发送中
       this.data.isLoading=true
 
       //发生请求
       const {data} =await reqOrders(this.data.status);
 
       //在请求结束以后，需要将isLoaing设置为false,表示请求已经结束
       this.data.isLoading=false
 
       this.setData({
         ordersList:[...data],
         total:data.total
       })
       console.log(this.data.ordersList);
     },
     getThing: function(e) {
      this.setData({
        showtip: true,
        isfull:true,
      });
    },
    hidebg: function(e) {
      this.setData({
        isfull: false,
      })
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
    this.getOrdersList();
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
    //解构数据
    const{articleList,total,requestArticleData,isLoading}=this.data
    const {page} =requestArticleData

    //判断isLoading状态
    //如果状态等于true,说明请求正在发送中，如果请求正在发送中，就不请求下一页数据
    if(isLoading)
    {
      return
    }

    //让articleList长度和total进行对比
    //如果数据相等，则列表已经加载完毕
    if(articleList.length===total)
    {
      this.setData({
        isFinish:true
      })
      return
    }
    console.log(page)
    //页码+1
    this.setData({
      requestArticleData:{...this.data.requestArticleData,page:page+1}
    })
    console.log(this.data.requestArticleData)
    this.getArticleList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})