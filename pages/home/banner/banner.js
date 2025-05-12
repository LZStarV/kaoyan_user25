// pages/index/banner/banner.js


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 轮播图数据
    bannerList: {
      type: Array,
      value: []
    },
    marginTop: {
      type: Number,
      value: 0 // 默认值
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0, // 被激活的轮播图索引，默认是 0
  },

  /**
   * 组件的监听者列表
   */
  observers: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取被激活的轮播图索引
    getSwiperIndex(event) {
      const {
        current
      } = event.detail;
      this.setData({
        activeIndex: current
      })
    },

  },
})