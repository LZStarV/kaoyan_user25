// pages/my/pointDetail/pointDetail.js
import { userStore } from '@/stores/userStore';
import { getPoint } from '@/api/point';
Page({
  data: {
    pointList: [], //积分列表数据
    pointCount: '', //当前可用积分
    total: 0, //数据总条数
    isFinish: false, //判断数据是否全部已经加载
    isLoading: false, //判断数据是否加载完毕
    //文章列表请求参数
    requestPointData: {
      page: 1, //页码
      pageSize: 20, //每页请求的参数
      type: '',
    },
    navList: [
      {
        name: '全部',
        id: '',
      },
      {
        name: '获取',
        id: '1',
      },
      {
        name: '消耗',
        id: '0',
      },
    ],
  },

  // 根据tab查询积分
  handleTabChange(e) {
    const { typeId } = e.detail;
    this.setData({
      requestPointData: {
        ...this.data.requestPointData,
        type: typeId, // 更新请求的类型数据
      },
    });
    this.refreshPointList();
  },

  //获取积分列表数据
  async getPointList() {
    //在请求发送之前，需要将isLoading设置为true,表示请求正在发送中
    this.data.isLoading = true;

    //发生请求
    const { data } = await getPoint(this.data.requestPointData);

    // 获取参数 pointCount
    const pointCount = userStore.userInfo.pointCount;
    this.setData({ pointCount });

    //在请求结束以后，需要将isLoaing设置为false,表示请求已经结束
    this.data.isLoading = false;

    this.setData({
      pointList: [...this.data.pointList, ...data.records],
      total: data.total,
    });
  },

  // 将数据进行重置
  async refreshPointList() {
    this.setData({
      pointList: [],
      total: 0,
      isFinish: false,
      requestPointData: {
        ...this.data.requestPointData,
        page: 1,
      },
    });
    // 使用最新的参数发送请求
    this.getPointList();
  },

  onShow() {
    this.getPointList();
  },

  onReachBottom() {
    //解构数据
    const { pointList, total, requestPointData, isLoading } = this.data;
    const { page } = requestPointData;

    //判断isLoading状态
    //如果状态等于true,说明请求正在发送中，如果请求正在发送中，就不请求下一页数据
    if (isLoading) {
      return;
    }
    //让pointList长度和total进行对比
    //如果数据相等，则列表已经加载完毕
    if (pointList.length === total) {
      this.setData({
        isFinish: true,
      });
      return;
    }
    console.log(page);
    //页码+1
    this.setData({
      requestPointData: {
        ...this.data.requestPointData,
        page: page + 1,
      },
    });
    console.log(this.data.requestPointData);
    this.getPointList();
  },

  onPullDownRefresh() {
    this.refreshPointList();
    // 手动关闭下拉刷新的效果
    wx.stopPullDownRefresh();
  },
});
