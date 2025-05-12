// pages/exam/examSearch/examSearch.js
import {getExam} from '../../../api/exam'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum:1,
    subjectMap :{
      1: {'name':'政治','imageUrl':'../../../images/exam/politics.png','color':'#ffebe8'},
      2: {'name':'英语','imageUrl':'../../../images/exam/english.png','color':'#ebe8ff'},
      3: {'name':'数学','imageUrl':'../../../images/exam/math.png','color':'#eafae8'},
      4:{'name':'统考类综合','imageUrl':'../../../images/exam/computer.png','color':'#fdf7e6'},
      5:{'name':'自命题','imageUrl':'../../../images/exam/computer.png','color':'#fdf7e6'}
    },
     date:'',
     examList: [],//真题列表数据
     total:0,//数据总条数
     isFinish:false,//判断数据是否全部加载完
     isLoading:false,//判断数据是否加载完毕
     //真题列表请求参数
     requestExamData:{
       page:1,//页码
       pageSize:10,//每页记录数
       year:'',//考试年份
       type:''//考试类型 1.政治 2.英语 3.数学 4.统考类综合 5.自命题
     },
  },
  //同步输入框的内容
  onInputChange: function(event) {
    this.setData({
      searchQuery: event.detail.value,
      'requestExamData.title':event.detail.value,
    });
  },
  //搜索真题
  searchExam()
  {
    this.setData({
      'requestExamData.page':1,
      examList:[],
    })
    this.getExamList()
  },
    //获取真题列表数据
    async getExamList() { 
      //在请求发送之前，需要将isLoading设置为true,表示请求正在发送中
      this.data.isLoading=true
   
      //发送请求
      const {data} =await getExam(this.data.requestExamData)
   
      //在请求结束以后，需要将isLoading设置为false，表示请求已经结束
      this.data.isLoading=false
   
      if(!data.records.length||data.records.length===this.data.total)
      {
        this.setData({
          isFinish:true
        })
        return
      }

      this.setData({
        examList:[...this.data.examList,...data.records],
        total:data.total
      })
     },

     gotoExamDetail:function(e){
      var postId=e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../examDetail/ExamDetail?id='+postId,
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
    const {examList,total,requestExamData,isLoading}=this.data
    const {page}=requestExamData

    //判断isLoading状态
    //如果状态等于true，说明请求正在发送中，如果请求正在发送中，就不请求下一页数据
    if(isLoading)return

    //让examList长度和total进行对比
    //如果数据相等，真题列表已经加载完毕
    if(examList.length===total)
    {
      console.log("finish")
      this.setData({
        isFinish:true
      })
      return
    }
    //页码加一
    this.setData({
      requestExamData:{...this.data.requestExamData,page:page+1}
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})