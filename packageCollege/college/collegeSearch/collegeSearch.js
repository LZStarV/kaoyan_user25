// pages/college/collegeSearch/collegeSearch.js
import{getCollege} from  '../../../api/college'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collegeList:[],//院校列表
    total:0,//数据总条数
    isFinish:false,//判断数据是否全部加载了
    isLoading:false,//判断数据是否加载完毕
    searchQuery:'',//输入框的内容
    requestCollegeData:{
      page:1,//页码
      pageSize:10,//每页请求的参数
      name:'',
    }
  },
  //同步输入框的内容
  onInputChange: function(event) {
    this.setData({
      searchQuery: event.detail.value,
      'requestCollegeData.name':event.detail.value,
    });
  },
  //搜索院校
  searchCollege()
  {
    this.setData({
      'requestCollegeData.page':1,
      collegeList:[],
    })
    this.getCollegeList()
  },
  //去到院校详情页
  gotoDetail:function(e){
    var postId=e.currentTarget.dataset.id;
    console.log(postId);
    wx.navigateTo({
      url: '../collegeDetail/CollegeDetail?id='+postId,
    })
  },
   //获取院校列表数据
   async getCollegeList()
   {
     //在请求发送之前，需要将isLoading设置为true,表示请求正在发送中
     this.data.isLoading=true
     //发生请求
     const {data} =await getCollege(this.data.requestCollegeData)
     //在请求结束以后，需要将isLoaing设置为false,表示请求已经结束
     this.data.isLoading=false

     this.setData({
       collegeList:[...this.data.collegeList,...data.records],
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
    const{collegeList,total,requestCollegeData,isLoading}=this.data
    const {page} =requestCollegeData

    //判断isLoading状态
    //如果状态等于true,说明请求正在发送中，如果请求正在发送中，就不请求下一页数据
    if(isLoading)
    {
      return
    }

    //让articleList长度和total进行对比
    //如果数据相等，则列表已经加载完毕
    if(collegeList.length===total)
    {
      this.setData({
        isFinish:true
      })
      return
    }
    console.log(page)
    //页码+1
    this.setData({
      requestCollegeData:{...this.data.requestCollegeData,page:page+1}
    })
    console.log(this.data.requestCollegeData)
    this.getCollegeList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})