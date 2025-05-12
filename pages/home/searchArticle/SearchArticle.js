// pages/home/searchArticle/SearchArticle.js
import {getArticle} from '../../../api/article'
import {toast} from '../../../utils/extendApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList:[],//文章列表
    searchQuery:'',//输入框的内容
    total:0,//数据总条数
    isFinish:false,//判断数据是否全部加载了
    isLoading:false,//判断数据是否加载完毕
     //文章列表请求参数
     requestArticleData:{
      page:1,//页码
      pageSize:5, //每页请求的参数
      title:'',
    }
  },

  //同步输入框的内容
  onInputChange: function(event) {
    this.setData({
      searchQuery: event.detail.value,
      'requestArticleData.title':event.detail.value,
    });
  },

    //获取文章列表数据
  async getArticleList()
    {
      //在请求发送之前，需要将isLoading设置为true,表示请求正在发送中
      this.data.isLoading=true

      if(this.data.searchQuery==='')
      {
        console.log("null")
        toast({title:"请输入至少两个字符"})
        return
      }

      //发生请求
      const {data} =await getArticle(this.data.requestArticleData)

      //在请求结束以后，需要将isLoaing设置为false,表示请求已经结束
      this.data.isLoading=false

      this.setData({
        articleList:[...this.data.articleList,...data.records],
        total:data.total
      })

      if(this.data.articleList.length===0)
      {
        toast({title:"暂无该资讯"})
      }
  },

  //搜索文字
  searchArticle()
  {
    this.getArticleList()
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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
  this.getArticleList()
  },
  // 监听页面的下拉刷新操作
  onPullDownRefresh() {
    // 将数据进行重置
    this.setData({
      articleList: [],
      total: 0,
      isFinish: false,
      requestArticleData: { ...this.data.requestArticleData, page: 1 }
    })

    // 使用最新的参数发送请求
    this.getArticleList()

    // 手动关闭下拉刷新的效果
    wx.stopPullDownRefresh()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})