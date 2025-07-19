// components/nav_scroll_wrapper/nav_scroll_wrapper.js
Component({
  /**
   * 声明外部样式类,便于修改样式
   * 注意：不能与已有的样式类同名，否则已有样式类失效
   * 注意：外部样式类优先级可能低于内部样式，需要使用 !important 覆盖
   *
   * 要从外部改变样式也可通过 解除样式隔离 的方式
   * 但scroll-wrapper这个名字很容易被使用，容易引发冲突
   */
  externalClasses: ['scroll-wrapper-class', 'navigate-item-class'],

  /**
   * 组件的属性列表
   */
  properties: {
    navList: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTab: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e) {
      const currentTab = e.currentTarget.dataset.index;
      const typeId = e.currentTarget.dataset.id;
      (this.setData({
        currentTab,
      }),
        // 触发自定义事件，将 currentTab 传递给父组件
        this.triggerEvent('tabChange', { typeId }));
    },
  },
});
