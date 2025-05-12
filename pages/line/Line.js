import { getLine } from '../../api/line'
import {getSubject} from '../../api/subject'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shownav:true,
    showtip:false,//问号所对应的提示
    records:'',//国家线总数据
    total: 0, // 数据总条数
    //国家线列表请求参数
    requestLineData:{
      disciplineId:'',
      fieldId:'',
      masterType:'',
      page:1,//页码
      pageSize:10,//每页请求的条数
      year:'',//年份
    },
    isLoading: false, // 判断数据是否加载完毕
    isFinish:false,//判断是否全部数据都显示了
    year_lists:[2024,2023,2022,2021,2020,2019,2018],//生成2018-2024的年份列表
    sub_or_not:false,//是否有二级类别
    selectedDegreeIndex:0,//硕士类型的索引
    selectedSubjectIndex:0,//专业类别的索引
    selectedTimeIndex:0,//时间的索引
    selectedSubjectSubIndex:0,//专业二级类别的索引
    type_of_master_degrees:['学术型硕士','专业型硕士'],
    type_of_subjects:[
      {"id":'',"name":"全部"},
      { "id": 1, "name": "哲学" },
      { "id": 2, "name": "经济学" },
      { "id": 3, "name": "法学" },
      { "id": 4, "name": "教育学" },
      { "id": 5, "name": "文学" },
      { "id": 6, "name": "历史学" },
      { "id": 7, "name": "理学" },
      { "id": 8, "name": "工学" },
      { "id": 9, "name": "农学" },
      { "id": 10, "name": "医学" },
      { "id": 11, "name": "军事学" },
      { "id": 12, "name": "管理学" },
      { "id": 13, "name": "艺术学" },
      { "id": 14, "name": "交叉学科" },
      { "id": 15, "name": "享受少数民族照顾政策的考生" }
  ],
    type_of_subjects_sub:[{'id':'0','name':'全部'}],
    type_of_subjects_all : {
  '全部':[{'id':'0','name':'全部'}],
  '哲学': [{'id':'0','name':'全部'},{'id':151,'name':'应用伦理'}],
  '经济学': [{'id':'0','name':'全部'},{'id':'251','name':'金融'},{'id':'252','name':'应用统计'},
  {'id':'253','name':'税务'}, {'id':'254','name':'国际商务'}, {'id':'255','name':'保险'},
  {'id':'256','name':'资产评估'}, {'id':'258','name':'数字经济'}
  ],
  '法学': [{'id':'0','name':'全部'}, {'id':'351','name':'法律'},{'id':'352','name':'社会工作'},
  {'id':'353','name':'警务'},{'id':'354','name':'知识产权'},{'id':'355','name':'国际事务'},
  ],
  '教育学': [{'id':'0','name':'全部'},{'id':'451','name':'教育'},{'id':'452','name':'体育'},
  {'id':'453','name':'国际中文教育'},{'id':'454','name':'应用心理'},
  ],
  '文学': [{'id':'0','name':'全部'},{'id':'551','name':'翻译'},{'id':'552','name':'新闻传播'},
  {'id':'553','name':'出版'}
  ],
  '历史学': [{'id':'0','name':'全部'},{'id':'651','name':'博物馆'}
  ],
  '理学': [{'id':'0','name':'全部'},{'id':'751','name':'气象'},
  ],
  '工学': [{'id':'0','name':'全部'},{'id':'851','name':'建筑'},{'id':'853','name':'城乡规划'},
  {'id':'854','name':'电子信息'},{'id':'855','name':'机械'},{'id':'856','name':'材料与化工'},
  {'id':'857','name':'资源与环境'},{'id':'858','name':'能源动力'},{'id':'859','name':'水利土木'},
  {'id':'860','name':'生物与医药'},{'id':'861','name':'交通运输'},{'id':'862','name':'风景园林'},
  ],
  '农学': [{'id':'0','name':'全部'},{'id':'951','name':'农业'},{'id':'952','name':'兽医'},
  {'id':'954','name':'林业'},{'id':'955','name':'食品与营养'},
  ],
  '医学': [{'id':'0','name':'全部'},{'id':'1051','name':'临床医学'},{'id':'1052','name':'口腔医学'},
  {'id':'1053','name':'公共卫生'},{'id':'1054','name':'护理'},{'id':'1055','name':'药学'},{'id':'1056','name':'中药'},{'id':'1057','name':'中医'},{'id':'1058','name':'医学技术'},
  {'id':'1059','name':'针灸'},
  ],
  '军事学': [{'id':'0','name':'全部'},{'id':'1152','name':'联合作战指挥'},{'id':'1153','name':'军兵种作战指挥'},{'id':'1154','name':'作战指挥保障'},{'id':'1155','name':'战时政治工作'},{'id':'1156','name':'后勤与装备保障'},{'id':'1157','name':'军事训练与管理'},
  ],
  '管理学': [{'id':'0','name':'全部'},{'id':'1251','name':'工商管理'},{'id':'1252','name':'公共管理'},{'id':'1253','name':'会计'},{'id':'1254','name':'旅游管理'},{'id':'1255','name':'图书情报'},{'id':'1256','name':'工程管理'},{'id':'1257','name':'审计'}
  ],
  '艺术学': [{'id':'0','name':'全部'},{'id':'1352','name':'音乐'},{'id':'135','name':'舞蹈'},{'id':'1354','name':'戏剧与影视'},{'id':'1355','name':'戏曲与曲艺'},{'id':'1356','name':'美术与书法'},{'id':'1357','name':'设计'}
  ],
  '艺术学': [{'id':'0','name':'全部'},{'id':'1352','name':'音乐'},{'id':'135','name':'舞蹈'},{'id':'1354','name':'戏剧与影视'},{'id':'1355','name':'戏曲与曲艺'},{'id':'1356','name':'美术与书法'},{'id':'1357','name':'设计'}
],
  '交叉学科':[{'id':'0','name':'全部'},{'id':'1451','name':'文物'},{'id':'1452','name':'密码'}],
  '享受少数民族照顾政策的考生':[{'id':'0','name':'全部'}]
},
    qyopen: false, //
    degree_open: false, //硕士类型弹窗
    subject_open: false, //专业类别弹窗
    isfull: false,//点击上方的选择框的时候让页面不能滑动
    shownavindex: '',
  },
  click_tip: function(e) {
    this.setData({
      showtip: true,
      isfull:true,
    });
  },

  //获取国家线列表数据
  async getLineDataList() {
    //在请求发送前，需要将isLoading设置为true,表示请求正在发送中
    this.data.isLoading=true
    console.log()
    const selectedYear = this.data.year_lists[this.data.selectedTimeIndex];
    const selectedMasterType = this.data.selectedDegreeIndex + 1; 
    const selectedFieldId = this.data.selectedSubjectIndex=='0'?'':this.data.selectedSubjectIndex;
    const selectedDisciplineId = this.data.type_of_subjects_sub[this.data.selectedSubjectSubIndex].id=='0'?'':this.data.type_of_subjects_sub[this.data.selectedSubjectSubIndex].id
    // 更新请求参数对象
    this.data.requestLineData = {
      ...this.data.requestLineData,
      year: selectedYear,
      masterType: selectedMasterType,
      fieldId: selectedFieldId,
      disciplineId:selectedDisciplineId
    };
    //发送请求
    const { data } = await getLine(this.data.requestLineData);

    //在请求结束以后，需要将isLoading设置为false，表示请求已经结束
    this.data.isLoading=false
    this.setData({
      records:this.data.requestLineData.page=='1'?data.records:[...this.data.records,...data.records],
      total:data.total
    });
  },
 
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   this.getLineDataList();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    //解构数据
    const {records,total,requestLineData,isLoading}=this.data
    const {page}=requestLineData

    //判断isLoading状态
    //如果状态等于true，说明请求正在发送中，如果请求正在发送中，就不请求下一页数据
    if(isLoading) return

    //让records长度和total进行对比
    //如果数据相等，records已经加载完毕
    if(records.length===total)
    {
      this.setData({
        isFinish:true
      })
      return
    }

    //页码+1
    this.setData({
      requestLineData:{...this.data.requestLineData,page:page+1}
    })

    //获取更多的records信息
    this.getLineDataList()
  },
  click_know(e)
  {
    this.setData({
      isfull:false,
      showtip:false,
    })
  },
  selectTime:function(e)
  {
    this.setData({
      selectedTimeIndex:e.currentTarget.dataset.index
    })
    this.setData({
     'requestLineData.page':1,
    })
    this.getLineDataList()
  },
  selectDegree(e)
  {
    this.setData({
      selectedDegreeIndex:e.currentTarget.dataset.index,
    })
    if(e.currentTarget.dataset.index===1)
    {
      this.setData({
       sub_or_not:true,
      })
    }
    else
    {
      this.setData({
       sub_or_not:false,
       type_of_subjects:this.data.type_of_subjects_part,
      })
    }
    this.setData({
      'requestLineData.page':1,
     })
    this.getLineDataList()
  },
  // 选择专业类别
  selectSubjectIndex: function(e) {
    this.setData({
      selectedSubjectIndex: e.currentTarget.dataset.index,
      selectedSubjectSubIndex:0,
    });
    if(this.data.sub_or_not)
    {
      this.setData(
        {
           type_of_subjects_sub:this.data.type_of_subjects_all[this.data.type_of_subjects[e.currentTarget.dataset.index].name]
        }
      )
    }
    this.setData({
      'requestLineData.page':1,
     })
    this.getLineDataList()
  },
  selectSubjectSubIndex: function(e) {
    this.setData({
      selectedSubjectSubIndex: e.currentTarget.dataset.index,
    });
    this.getLineDataList()
  },
  // 点击事件的弹窗
  click_time: function(e) {
    if (this.data.time_open) {
      this.setData({
        time_open: false,
        degree_open: false,
        subject_open: false,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        time_open: true,
        subject_open: false,
        degree_open: false,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
  },
  click_time_init:function(e)
  {
    if (this.data.time_open) {
      this.setData({
        time_open: false,
        degree_open: false,
        subject_open: false,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        time_open: true,
        subject_open: false,
        degree_open: false,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
    this.setData({
      shownav_init:false,
      shownav:true,
    })
  },
  // 硕士类型下拉框是否隐藏
  click_degree:function(e) {
    if (this.data.degree_open) {
      this.setData({
        degree_open: false,
        subject_open: false,
        time_open: false,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        degree_open: true,
        subject_open: false,
      time_open: false,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
  },
  // 专业类别下拉框是否隐藏
  click_subject: function(e) {
    if (this.data.subject_open) {
      this.setData({
        subject_open: false,
        isfull:false,
      })
    } else {
      this.setData({
        degree_open: false,
        subject_open: true,
        time_open: false,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
  },
  // 点击灰色背景隐藏所有的筛选内容
  hidebg: function(e) {
    this.setData({
      time_open: false,
      degree_open: false,
      subject_open: false,
      isfull: false,
      shownavindex: 0,
      showtip:false,
    })
  },
})