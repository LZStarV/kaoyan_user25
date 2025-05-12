// pages/utils/college/College.js
import {getCollege} from '../../api/college'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isfull:false,
    currentSubject:0,
    currentBelong:0,
    showSelect:false,
    currentType :0,
    currentProvinceIndex:0,
    requestCollegeData:{
      page:1,//页码
      pageSize:20, //每页请求的参数
      location:'', //院校所在地
      t211:'',
      t985:'',
      TCrossed:'',//自划线
      TDoubleFirst:'',//双一流
      THigherSchool:'',
      // type:1,//院校隶属，1.教育部直属 2.其他中央部委 3.地方所属
    },
    subjectType: [
      '全部', '综合类', '理工类', '农林类', '师范类',
      '语言类', '财经类', '体育类', '艺术类', '民族类',
      '军事类', "医药类",'其他'
    ],
    belongType:[
      '全部','教育部直属','其他中央部委','地方所属'
    ],
    collegeType: [
      {
        name:'全部',
        param:'',
      },
      {
        name:'985',
        param:'t985',
      },
      {
         name: '211',
         param:'t211',
      }, 
      {
        name: '自划线',
        param:'TCrossed',
      }, 
      {
        name: '双一流',
        param:'TDoubleFirst',
      },
      {
        name: '普通院校',
        param:'THigherSchool',
      }
     ],
     province: ["全部", "北京", "天津", "上海", "重庆", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆", "香港", "澳门"],
    college: [
      { avatar: '../../../images/college/PKU.jpg', name: '北京大学' },
      { avatar: '../../../images/college/PKU.jpg', name: '清华大学' },
      { avatar: '../../../images/college/PKU.jpg', name: '北京航空航天大学' },
      { avatar: '../../../images/college/PKU.jpg', name: '北京理工大学' },
      { avatar: '../../../images/college/PKU.jpg', name: '北京师范大学' },
      { avatar: '../../../images/college/PKU.jpg', name: '中国人民大学' },
      { avatar: '../../../images/college/PKU.jpg', name: '中央财经大学' },
      { avatar: '../../../images/college/PKU.jpg', name: '北京交通大学' },
      { avatar: '../../../images/college/PKU.jpg', name: '北京邮电大学' },
      { avatar: '../../../images/college/PKU.jpg', name: '北京外国语大学' }
    ],
    collegeList:[],//院校列表
    total:0,//数据总条数
    isFinish:false,//判断数据是否全部加载了
    isLoading:false,//判断数据是否加载完毕
  },
   //去搜索
   gotoCollegeSearch()
   {
     wx.navigateTo({
       url: './collegeSearch/collegeSearch',
     })
   },
   //获取院校列表数据
   async getCollegeList()
   {
     console.log("111");
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
   onReachBottom() {
  },
  onScroll(event) {
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
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCollegeList();
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

  },
  gotoDetail:function(e){
    var postId=e.currentTarget.dataset.id;
    console.log(postId);
    wx.navigateTo({
      url: 'collegeDetail/CollegeDetail?id='+postId,
    })
  },
  initCollegeType() {
    const keys = ['t211', 't985', 'TCrossed', 'TDoubleFirst', 'THigherSchool'];
    const data = { ...this.data.requestCollegeData }; // 保留原有属性
    keys.forEach(key => {
        data[key] = ''; // 设置为 ''
    });
    this.setData({ requestCollegeData: data });
},
  click_type(e) {
    let currentType = e.currentTarget.dataset.index;
    console.log(this.data.collegeType[currentType]);
    this.initCollegeType();
    if(currentType)
    {
      this.setData({
        [`requestCollegeData.${this.data.collegeType[currentType].param}`]:1,
      })
    }
    this.setData({
      currentType,
      collegeList:[],
      'requestCollegeData.page':1,
    })
    console.log(this.data.requestCollegeData);
    this.getCollegeList();
  },
  click_province(e) {
    let currentProvinceIndex = e.currentTarget.dataset.index
    this.setData({
      currentProvinceIndex,
      'requestCollegeData.location':currentProvinceIndex===0?'':this.data.province[currentProvinceIndex],
      collegeList:[],
      'requestCollegeData.page':1,
    })
    this.getCollegeList();
  },
  click_select_pop()
  {
    this.setData({
      showSelect:true,
      isfull:true,
    })
  },
  hidebg: function(e) {
    this.setData({
      isfull: false,
      showSelect:false,
    })
  },
  click_subject_type(e) {
    let currentSubject = e.currentTarget.dataset.index;
    this.setData({
      currentSubject,
      'requestCollegeData.type':currentSubject===0?'':currentSubject,
      collegeList:[],
    })
    this.getCollegeList();
  },
  click_belong_type(e) {
    let currentBelong = e.currentTarget.dataset.index;
    this.setData({
      currentBelong,
      'requestCollegeData.belong':currentBelong===0?'':currentBelong,
      collegeList:[],
    })
    this.getCollegeList();
  },
  click_reset()
  {
    this.setData({
      currentSubject:0,
      currentBelong:0,
      'requestCollegeData.type':'',
      collegeList:[],
    })
    delete this.data.requestCollegeData.belong; 
    this.getCollegeList();
  },
  click_confirm()
  {
    this.setData({
      isfull: false,
      showSelect:false,
    })
  },
  click_close()
  {
    this.setData({
      isfull: false,
      showSelect:false,
    })
  }
})