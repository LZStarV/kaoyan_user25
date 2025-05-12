// pages/utils/college/collegeDetail/collegeDetail.js
import { keys } from "mobx-miniprogram";
import {getCollegetIntro,getCollegeInfo,getCollegeSubject,starCollege,getSubjectAll} from "../../../api/college"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestStarCollegeData:{
      type:2,
      id:'',
    },
    initStar:'',//判断最开始是否收藏
    total:0,//数据总条数
    isFinish:false,//判断数据是否全部加载了
    isLoading:false,//判断数据是否加载完毕
    info:'',
    id:'',//本学校的id
    clickshow:null,
    timer: null,
    starJudge:false,
    likeIndex:null,
    starJudge:null,
    showSuccess:null,
    math:['全部','数学一','数学二','数学三','不考数学'],
    mathMap:['','math1','math2','math3','mathNo'],
    english:['全部','英语一','英语二','其他'],
    englishMap:['','en1', 'en2', 'enOther'],
    way_Index:0,
    way:['全部','全日制','非全日制'],
    sub_subject_type_Index:0,
    subject_type_Index:0,
    type_of_subjects:[],//学科一级类别
    type_of_subjects_all :[],//学科所有类型映射
    subjectInfoList:[],
    detail_type_Index:0,
    detailType:['学科门类','学习方式','外语类型','数学类型'],
    buttonType:['全部','学硕','专硕'],
    button_Index:0,
    title:[],//9985,211等title
    current_infoType:0,//导航栏
    infoType: ['院校信息','院系专业'],
    introInfo:'',//院校介绍
    //211.985的tag对应的map
    keysMap : [
      { key: 't211', value: '211' },
      { key: 't985', value: '985' },
      { key: 'tcrossed', value: '自划线' },
      { key: 'tdoubleFirst', value: '双一流' },
      { key: 'thigherSchool', value: '高等院校' }
    ],
    requestSubjectData:
    {
      page:1,
      pageSize:10,
      fieldId:'',//大类
      disciplineId:'',//子类
      en1:'',//英语1
      en2:'',//英语2
      enOther:'',//英语其他
      masterType:'',//学硕还是专硕
      math1:'',//数学一
      math2:'',//数学二
      math3:'',//数学三
      mathNo:'',//
      name:'',
      studyType:'',
    },
  },
  //获取院校介绍和基本信息
  async getCollegeDetail() {
    const [res1, res2] = await Promise.all([getCollegetIntro(this.data.id), getCollegeInfo(this.data.id)]);
    
    const infoArray = res1.data.split('\n');
    const infoNodes = infoArray.map(info => `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${info.replace(/\n/g, '<br>')}`).map(info => `<p>${info}</p>`).join('');
  
    const title = [];
    this.data.keysMap.forEach(({ key, value }) => {
      if (res2.data[key]!==null) {
        title.push(value);
      }
    });
    this.setData({
      introInfo: infoNodes,
      info: res2.data,
      title,// 直接更新 title
      initStar:res2.data.isStarred,
      starJudge:res2.data.isStarred
    });
  },
  //请求院校专业
  async getSubjectInfo()
  {
     //在请求发送之前，需要将isLoading设置为true,表示请求正在发送中
     this.data.isLoading=true

     //发生请求
     const {data} =await getCollegeSubject(this.data.requestSubjectData)

     //在请求结束以后，需要将isLoaing设置为false,表示请求已经结束
     this.data.isLoading=false

     this.setData({
      subjectInfoList:[...this.data.subjectInfoList,...data.records],
       total:data.total
     })
  },
  //获取Field-Discipline
  async getFieldDiscipline() {
    const { data } = await getSubjectAll();
    const map = {}; // 初始化为对象
    const allDiscipline = { disciplineId: '', disciplineName: '全部', disciplineType: '' };
    map['全部']=[allDiscipline];
    const arr=[{id:'0',name:'全部'}];
    data.forEach((item) => {
      arr.push({id:item.fieldId,name:item.fieldName});
      // 在 disciplineList 的开头添加新项
      item.disciplineList.unshift(allDiscipline);
      // 将 disciplineList 存入 map
      map[item.fieldName] = item.disciplineList;
    });
    arr.pop();
    this.setData({
      type_of_subjects_all:map,
      type_of_subjects:arr,
      type_of_sub_subjects:map['全部'],
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var id = options.id;
    this.setData({
       id,
      'requestSubjectData.schoolId':id,
      'requestStarCollegeData.id':id
    });
    this.getCollegeDetail();
    this.getFieldDiscipline();
  },
  onUnload()
  {
    if(this.data.initStar!==this.data.starJudge)
    {
      starCollege(this.data.requestStarCollegeData);
    }
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
  click_infoType(e)
  {
    let current_infoType = e.currentTarget.dataset.index
    if(current_infoType===1)
    {
      this.setData({
        subjectInfoList:[],
      })
      this.getSubjectInfo();
    }
    this.setData({
      current_infoType
    })
  },
  click_detailType(e)
  {
    let detail_type_Index = e.currentTarget.dataset.index;
    this.setData({
      detail_type_Index,
      isfull:true,
    })
  },
  hidebg: function(e) {
    this.setData({
      isfull: false,
    })},
  click_subject_type:function(e)
  {
    let subject_type_Index = e.currentTarget.dataset.index;
    this.setData({
      subject_type_Index,
      sub_subject_type_Index:0,
      type_of_sub_subjects:this.data.type_of_subjects_all[this.data.type_of_subjects[subject_type_Index].name],
      'requestSubjectData.fieldId':subject_type_Index===0?'':subject_type_Index,
    })
  },
  //选择专业二级
  click_sub_subject_type:function(e)
  {
    let sub_subject_type_Index = e.currentTarget.dataset.index;
    console.log(this.data.type_of_sub_subjects[sub_subject_type_Index]);
    this.setData({
      sub_subject_type_Index,
      'requestSubjectData.disciplineId':sub_subject_type_Index===0?'':this.data.type_of_sub_subjects[sub_subject_type_Index].disciplineId,
    })
  },
  //选择学习方式 1.非全日制  2.全日制
  click_way(e)
  {
    let way=e.currentTarget.dataset.index;
    this.setData({
      'requestSubjectData.studyType':way===0?'':way,
      subjectInfoList:[],
      'requestSubjectData.page':1,
    })
    this.getSubjectInfo();
  },
  //选择外语类型 
  click_english(e)
  {
    let way = e.currentTarget.dataset.index;
    // 获取当前的 requestSubjectData
    const currentSubjectData = this.data.requestSubjectData;
    // 创建新对象，保留其他属性
    const updatedSubjectData = {
      ...currentSubjectData,
      page:1,
      en1: '',
      en2: '',
      enOther: '',
    };
    updatedSubjectData[this.data.englishMap[way]] = 1;
    // 更新数据
    this.setData({
      requestSubjectData: updatedSubjectData,
      subjectInfoList:[],
    });
    this.getSubjectInfo();
  },
  //选择数学类型 
  click_math(e)
  {
    let way = e.currentTarget.dataset.index;
    // 获取当前的 requestSubjectData
    const currentSubjectData = this.data.requestSubjectData;
    // 创建新对象，保留其他属性
    const updatedSubjectData = {
      ...currentSubjectData,
      page:1,
      math1: '',
      math2: '',
      math3: '',
      mathNo:'',
    };
    updatedSubjectData[this.data.mathMap[way]] = 1;
    // 更新数据
    this.setData({
      requestSubjectData: updatedSubjectData,
      subjectInfoList:[],
    });
    this.getSubjectInfo();
  },
  //选择学硕还是专硕
  click_masterType(e)
  {
    let way = e.currentTarget.dataset.index;
    console.log(way);
    this.setData({
      'requestSubjectData.masterType':way===0?'':way,
      'requestSubjectData.page':1,
      subjectInfoList:[],
      button_Index:way,
    })
    this.getSubjectInfo();
  },
  //点击确定
  click_confirm()
  {
    this.setData({
      isfull:false,
      subjectInfoList:[],
      'requestSubjectData.page':1,
    })
    this.getSubjectInfo();
  },
  click_cancel()
  {
    this.setData({
      isfull:false,
    })
  },
  click_like(e)
  {
  let index = e.currentTarget.dataset.index;
  let share = this.data.share;
  let newstarJudge = !this.data.starJudge;
  let newShare = [...share]; 
  if(!this.data.starJudge)
  newShare[index].like += 1; 
  else
  newShare[index].like -= 1;
  this.setData({
    starJudge: newstarJudge,
    share: newShare,
    likeIndex:index,
  })
  },
  gotoSubjectDetail:function(e){
    // var postId=e.currentTarget.dataset.index;
    // wx.navigateTo({
    //   url: '../subjectDetail/SubjectDetail?id='+postId,
    // })
  },
  //去搜索
  gotoCollegeSearch()
  {
    wx.navigateTo({
      url: '../subjectSearch/subjectSearch?id='+this.data.id,
    })
  },
  //点击收藏
  click_star() {
    const showSuccess = !this.data.starJudge;
    this.setData({ 
      starJudge: !this.data.starJudge,
      showSuccess ,
      clickshow:true,
    });
      // 清除之前的定时器
    if (this.data.timer) {
        clearTimeout(this.data.timer);
    }
    this.setData({  // 设置新的定时器
      timer : setTimeout(async() => {
        this.setData({ showSuccess: !showSuccess,
        timer:null,clickshow:false });
        await starCollege(this.data.requestStarCollegeData);
      }, 1500)})
  }
})