// pages/resource/resourceSearch/resourceSearch.js
import {getResource} from '../../../api/resource'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum:1,
    resourceList: [],//真题列表数据
    total:0,//数据总条数
    isFinish:false,//判断数据是否全部加载完
    isLoading:false,//判断数据是否加载完毕
    //真题列表请求参数
    requestResourceData:{
      page:1,//页码
      pageSize:10,//每页记录数
    },
  },
  onInputChange: function(event) {
    this.setData({
      searchQuery: event.detail.value,
      'requestResourceData.title':event.detail.value,
    });
  },
  //搜索真题
  searchResource()
  {
    this.setData({
      'requestResourceData.page':1,
      resourceList:[],
    })
    this.getResourceList()
  },
  gotoResourceDetail:function(e){
    var postId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../resourceDetail/ResourceDetail?id='+postId,
    })
  },
   //获取真题列表数据
   async getResourceList() { 
    //在请求发送之前，需要将isLoading设置为true,表示请求正在发送中
    this.data.isLoading=true
 
    //发送请求
    const {data} =await getResource(this.data.requestResourceData)
 
    //在请求结束以后，需要将isLoading设置为false，表示请求已经结束
    this.data.isLoading=false
 
    this.setData({
      resourceList:[...this.data.resourceList,...data.records],
      total:data.total
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
    const {resourceList,total,requestResourceData,isLoading}=this.data
    const {page}=requestResourceData

    //判断isLoading状态
    //如果状态等于true，说明请求正在发送中，如果请求正在发送中，就不请求下一页数据
    if(isLoading)return

    //让examList长度和total进行对比
    //如果数据相等，真题列表已经加载完毕
    if(resourceList.length===total)
    {
      console.log("finish")
      this.setData({
        isFinish:true
      })
      return
    }
    //页码加一
    this.setData({
      requestResourceData:{...this.data.requestResourceData,page:page+1}
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})