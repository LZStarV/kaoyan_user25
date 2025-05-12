// pages/exam/exam.js
import {getExam} from '../../api/exam'

Page({

  /**
   * 页面的初始数据
   */
  data:
  {    
    pageNum:1,
    subjectMap :{
      1: {'name':'政治','imageUrl':'https://ezcatcat-javaweb-test.oss-cn-guangzhou.aliyuncs.com/ae9cffa4-a2be-44af-add3-2e7e5558f72f.png','color':'#ffebe8'},
      2: {'name':'英语','imageUrl':'https://ezcatcat-javaweb-test.oss-cn-guangzhou.aliyuncs.com/d0d999a6-e570-4388-b186-b95ead4e5b97.png','color':'#ebe8ff'},
      3: {'name':'数学','imageUrl':'https://ezcatcat-javaweb-test.oss-cn-guangzhou.aliyuncs.com/8a1fe4c2-0688-4678-aeed-1b19d769e691.png','color':'#eafae8'},
      4:{'name':'统考类综合','imageUrl':'https://ezcatcat-javaweb-test.oss-cn-guangzhou.aliyuncs.com/29b36053-74bb-4da2-89c5-778652f1b15a.png','color':'#fdf7e6'},
      5:{'name':'自命题','imageUrl':'https://ezcatcat-javaweb-test.oss-cn-guangzhou.aliyuncs.com/29b36053-74bb-4da2-89c5-778652f1b15a.png','color':'#fdf7e6'}
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
     typeArray: ['全部','政治', '英语', '数学', '统考类综合','自命题'],
     time_open:false,//时间的弹窗
     type_open:false,//类型的弹窗
     year_lists:[2024,2023,2022,2021,2020,2019,2018],//生成2018-2024的年份列表
     selectedTimeIndex:0,//时间的索引
     selectedTypeIndex:0,//类型的索引
     shownavindex: 0,//确定是时间的弹窗还是类型的弹窗
     isfull: false,//点击上方的选择框的时候让页面不能滑动
     quotes: [
      { quote: "努力不一定成功，但放弃一定失败！", author: "——佚名" },
      { quote: "考研是一场孤独的旅程，但每一步都离梦想更近。", author: "——佚名" },
      { quote: "不要等待机会，而要创造机会。", author: "——佚名" },
      { quote: "只要功夫深，铁杵磨成针。", author: "——佚名" },
    ],
    currentQuote: null,
    ischeck:false,
  }, // 随机显示一条语录
  randomQuote() {
    const randomIndex = Math.floor(Math.random() * this.data.quotes.length);
    this.setData({ currentQuote: this.data.quotes[randomIndex] });
  },
   //去搜索
   gotoExamSearch()
   {
     wx.navigateTo({
       url: './examSearch/examSearch',
     })
   },
  gotoExamDetail:function(e){
    var postId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'examDetail/ExamDetail?id='+postId,
    })
  },
  //获取真题列表数据
  async getExamList() { 
   //在请求发送之前，需要将isLoading设置为true,表示请求正在发送中
   this.data.isLoading=true

   //发送请求
   const {data} =await getExam(this.data.requestExamData)

   //在请求结束以后，需要将isLoading设置为false，表示请求已经结束
   this.data.isLoading=false

   this.setData({
     examList:[...this.data.examList,...data.records],
     total:data.total
   })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  getCheck(){
    var time = '2025-03-18 22:01:15';
    var targetTime = new Date(time);
    var now = new Date();
    this.setData({
      ischeck: now < targetTime ? true : false,
    });
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCheck();
    if(this.data.ischeck){
      this.randomQuote();
    }else{
      this.getExamList()
    }
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
  click_time: function(e) {
    if (this.data.time_open) {
      this.setData({
        time_open: false,
        type_open:false,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        time_open: true,
        type_open:false,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
  },
  click_type: function(e) {
    if (this.data.type_open) {
      this.setData({
        type_open: false,
        isfull: false,
        shownavindex: 0,
        time_open:false,
      })
    } else {
      this.setData({
        type_open: true,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav,
        time_open:false,
      })
    }
  },
  selectTime:function(e)
  {
    this.setData({
      selectedTimeIndex:e.currentTarget.dataset.index
    })
    this.setData({
     'requestExamData.year':this.data.year_lists[this.data.selectedTimeIndex],
     'requestExamData.page':1,
     examList:[],
    })
    this.getExamList()
  },
  selectType:function(e)
  {
    this.setData({
      selectedTypeIndex:e.currentTarget.dataset.index
    })
    this.setData({
     'requestExamData.type':this.data.selectedTypeIndex===0?'':this.data.selectedTypeIndex,
     'requestExamData.page':1,
     examList:[],
    })
    this.getExamList()
  },
  hidebg: function(e) {
    this.setData({
      time_open: false,
      type_open:false,
      isfull: false,
      shownavindex: 0,
    })
  },
})