// pages/home/article/article.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    articleList:{
      type:Array,
      value:[]
    },
    dataKey: {
      type: String,
      value: 'id' // 默认使用 id
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoArticleDetail:function(e)
    { var that = this
      var postId=e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/home/articleDetail/ArticleDetail?id='+postId,
      })
    },
  }
})
