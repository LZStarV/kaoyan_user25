// pages/my/point/point.js
import {userStore} from '../../../stores/userStore'
import {reqSign,judgeIsSign,signToday} from '../../../api/user'
import {toast} from '../../../utils/extendApi'
import { juedgeIsSign } from '../../../api/home';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pointList:['1','2','3','4','5','6','7'],
    pointCount:'',
    day:'',
    days: [],
    signUp: [],
    weeks_ch: ['一', '二', '三', '四', '五', '六','日'],
    count:0,
    judgeSign:false,
    firstDayOfWeek:'',
    cur_year:'',
    cur_month:'',
    cur_day:'',
  },
  async judgeIsSign()
  {
   const{data}= await judgeIsSign();
    this.setData({
      judgeSign:data,
    })
  },
  async clickSign()
  {
      if (this.data.judgeSign) {
        toast({title:"今天已经签到啦！"});
      } else {
        // 直接调用 signToday()，不需要 async
          signToday(); 
          toast({title:"签到成功！"});
          this.judgeIsSign();
      }
    },
  async getSignList()
  {
  const today=new Date();
  const year=today.getFullYear();
  const month=today.getMonth()+1;
  const params = {
  year: year,
  month: month,
  };
  const {data}=await reqSign(params);
  for(let i=0;i<data.length;i++)
  {
  if(data[i]==='1')
  {
    this.setData({
      [`days[${i +this.data.firstDayOfWeek-1}].isSign`]: true // 使用模板字符串来访问对象的动态属性
    });
  }
  }
  console.log("first",this.data.firstDayOfWeek);
  console.log(this.data.days);
  let count=0;
  console.log(this.data.day);
  for(let i=this.data.cur_day;i>=0;i--)
  {
    if(this.data.days[i+this.data.firstDayOfWeek-2].isSign)
    {
      count++;
    }
    else
    {
      break;
    }
  }
  if(this.data.days[this.data.day].isSign)
  {
    count++;
  }
  this.setData({count});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    const today = new Date();
    const day =today.getDate().toString();
    this.setData({
      day
    })
    this.initdata();
    // 获取参数 pointCount
    const pointCount = userStore.userInfo.pointCount;
    console.log(userStore.userInfo);
    console.log("pointCount",pointCount);
    this.setData({pointCount});
    this.getSignList();
    this.judgeIsSign();
  },

  initdata(e) {
    var date = new Date();
    var cur_year = date.getFullYear();
    var cur_month = date.getMonth() + 1;
    var cur_day = date.getDate(); // 获取当前日期
  
    this.calculateEmptyGrids(cur_year, cur_month); // 获取空格
    this.calculateDays(cur_year, cur_month); // 获取天数
  
    this.setData({
      cur_year: cur_year,
      cur_month: cur_month,
      cur_day: cur_day // 设置 cur_day
    }, function () {
      this.onGetSignUp(cur_year + "-" + cur_month);
    })
  },
  // 获取当月共多少天
  getThisMonthDays: function (year, month) {
    return new Date(year, month, 0).getDate()
  },
  // 获取当月第一天星期几
  getFirstDayOfWeek: function (year, month) {
    return new Date(year, month - 1, 1).getDay();//月份是从0开始算的 0代表一月
  },
  // 计算当月1号前空了几个格子，把它填充在days数组的前面
  calculateEmptyGrids: function (year, month) {
    var that = this;
    that.setData({
      days: []
    });
    var firstDayOfWeek = this.getFirstDayOfWeek(year, month) || 7;
    this.setData({firstDayOfWeek});
    //第一种：
    for (let i = 1; i < firstDayOfWeek; i++) {
      var obj = {
        date: null,
        isSign: false
      }
      that.data.days.push(obj);
    }
  },
  // 绘制当月天数占的格子，并把它放到days数组中
  calculateDays: function (year, month) {
    var that = this;
    var thisMonthDays = this.getThisMonthDays(year, month);
    for (let i = 1; i <= thisMonthDays; i++) {
      var obj = {
        date: i,
        isSign: false
      }
      that.data.days.push(obj);
    }
    console.log(that.data.days);
    this.setData({
      days: that.data.days
    });
  },
  //获取当前用户该用户的签到数组（真实情况时请求api，传入年月，返回签到数组）
  onGetSignUp: function (e) {
    var self = this
    self.setData({
      signUp: [{ date: '2024-9-1', Score: '6' }, { date: '2024-9-2', Score: '6' }, { date: '2024-9-3', Score: '6' }, { date: '2024-9-5', Score: '6' }, { date: '2024-9-9', Score: '6' }, { date: '2024-9-8', Score: '6' }]
    }, function () {
      self.onJudgeSign()
    })
  },
  //匹配判断当月与当月哪些日子签到打卡
  onJudgeSign: function () {
    var that = this;
    var signs = that.data.signUp
    var days = that.data.days
    var cur_month = that.data.cur_month //选中月
    var cur_year = that.data.cur_year//选中年
    for (let i = 0; i < signs.length; i++) {
      var current = new Date(signs[i].date);
      var year = current.getFullYear();
      var month = current.getMonth() + 1;
      var day = current.getDate();
      day = parseInt(day);
      for (let j = 0; j < days.length; j++) {
        if (year == cur_year && month == cur_month && days[j].date == day) {//已签到&&年月日相同
          days[j].isSign = true;
          days[j].Score = signs[i].Score;
          break;
        }
      }
    }
    that.setData({
      days: days
    })
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

  }
})