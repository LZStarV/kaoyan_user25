// pages/college/subjectDetailSearch/subjectDetailSearch.js
import {getCollegeSubject} from '../../../api/college'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total:0,//数据总条数
    isFinish:false,//判断数据是否全部加载了
    isLoading:false,//判断数据是否加载完毕
    searchQuery:'',//输入框的内容
    subjectInfoList:[],
    requestSubjectData:{
      page:1,
      pageSize:10,
      schoolId:'',
      name:'',
    }
  },
    //同步输入框的内容
    onInputChange: function(event) {
      this.setData({
        searchQuery: event.detail.value,
        'requestSubjectData.name':event.detail.value,
      });
    },
     //请求院校专业
  async getSubjectInfo()
  {
     //在请求发送之前，需要将isLoading设置为true,表示请求正在发送中
     this.data.isLoading=true
    console.log(this.data.requestSubjectData);
     //发生请求
     const {data} =await getCollegeSubject(this.data.requestSubjectData)

     //在请求结束以后，需要将isLoaing设置为false,表示请求已经结束
     this.data.isLoading=false

     this.setData({
      subjectInfoList:[...this.data.subjectInfoList,...data.records],
       total:data.total
     })
  },
  searchSubject()
  {
    this.setData({
      subjectInfoList:[],
      'requestSubjectData.page':1,
    })
    this.getSubjectInfo();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
     var id=options.id;
     this.setData({
      'requestSubjectData.schoolId':id,
     })
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
      const{subjectInfoList,total,requestSubjectData,isLoading}=this.data
      const {page} =requestSubjectData

      //判断isLoading状态
      //如果状态等于true,说明请求正在发送中，如果请求正在发送中，就不请求下一页数据
      if(isLoading)
      {
        return
      }

      //让articleList长度和total进行对比
      //如果数据相等，则列表已经加载完毕
      if(subjectInfoList.length===total)
      {
        this.setData({
          isFinish:true
        })
        return
      }
      //页码+1
      this.setData({
        requestSubjectData:{...this.data.requestSubjectData,page:page+1}
      })
      this.getSubjectInfo();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})