// pages/index/entrance/entrance.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 分类列表
    categoryList: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    gotoUtilsDetail(e) {
      const index = e.currentTarget.dataset.index;
      wx.navigateTo({ url: this.properties.categoryList[index].url });
    },
  },
});
