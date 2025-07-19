// pages/utils/college/subjectDetail/SubjectDetail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isTipExpanded: false,
    scores: [
      [2024, 323, 45, 68, 313, 42, 63],
      [2023, 150, 76, 99, 222, 85, 90],
      [2022, 500, 55, 84, 400, 30, 75],
      [2021, 500, 55, 84, 400, 30, 75],
      [2020, 500, 55, 84, 400, 30, 75],
    ],
    work_future_info:
      '&nbsp;&nbsp;&nbsp;哲学专业的就业前景虽然较为多样，但其独特的优势在于培养了批判性思维、深入分析和有效沟通的能力。这些技能在多个行业中都受到高度重视，因此哲学毕业生能够在多个领域找到合适的职业路径。具体来说，哲学专业的毕业生可以进入教育领域，担任教师或研究人员，继续探索和教授哲学思想。公共政策和非营利组织也常常需要哲学背景的人才来参与政策分析、伦理研究和社会影响评估。这些领域的工作涉及到复杂的伦理问题和战略决策，哲学训练提供了有效的工具和视角来解决这些问题。此外，哲学专业的毕业生在法律行业也具有竞争力。哲学背景帮助他们在法律领域发展出色的论证技巧和问题解决能力，这些都在律师和法律顾问的角色中极为重要。在商业和企业战略方面，哲学思维方式可以帮助解决复杂的战略和伦理问题，推动企业的长期发展。媒体和传播行业也欢迎哲学专业的毕业生，因为他们能够进行深刻的内容分析和有针对性的沟通。此外，哲学的训练能够为技术行业带来新的视角，特别是在人工智能伦理、用户体验设计等方面。总体而言，哲学专业的毕业生虽然在特定行业中的直接职位可能较少，但其核心技能在许多职业中都能发挥重要作用，使他们能够在教育、法律、商业、非营利组织、公共政策及技术等多个领域中找到具有挑战性和成就感的工作机会。',
    workList: ['公务员', '高校教师', '编辑'],
    isExpanded: false,
    subject_intro_info:
      '&nbsp;&nbsp;&nbsp;哲学专业致力于探索存在、知识、价值、理性和语言等基本问题，培养学生的批判性思维和逻辑推理能力。核心课程包括伦理学、形而上学、认识论、逻辑学、政治哲学和哲学史，帮助学生深入理解和分析各种思想体系。通过学习哲学，学生不仅提高了书面和口头表达能力，还能在法律、公共政策、学术研究、写作出版和教育等领域找到广泛的应用机会。总的来说，哲学专业为那些对理论和思维深度有兴趣的人提供了理解复杂问题的工具和方法',
    current_infoType: 3,
    showSuccess: null,
    starJudge: false,
    timer: null,
    title: ['自划线', '985', '211', '双一流A'],
    infoType: ['院校信息', '专业信息', '分数线', '研究方向'],
    info: `
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中国共产党最早的活动基地，北京大学为民族的振兴和解放，国家的建设和发展，社会的文明和进步做出了不可益代的贡献，在中国走向现代化的进程中起到了重要的先锋作用。<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;爱国，进步，民主，科学的传统精神和勤奋，严谨，求实，创新的学风在这里生生不息，代代相传。<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1917年，著名教育家蔡元培出任北京大学校长，他思想自由原则，取兼容并包主义，对北京大学进行了卓有成效的改革，促进了思想解放和学术繁荣，陈独秀，李大钉，毛泽东以及鲁迅，胡适等一批杰出人才都曾在北京大学任职或任教。<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1937年卢沟桥事变后，北京大学与清华大学，南开大学南迁长沙，共同组成长沙临时大学。不久，临时大学迁到昆明，改称国立西南联合大学，抗日战争胜利后，北京大学于1946年10月在北平复学。<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中华人民共和国成立后，全国高校于1952年进行院系调整，北京大学成为一所以文理基础教学和研究为主的综合性大学，为国家培养了大批人才，据不完全统计，北大学生已遍及各行各业。<br>
    北京大学不仅在国内享有极高的声誉，也在国际上赢得了广泛的认可，其科研成果和学术贡献对全球学术界产生了深远的影响。
  `,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  click_star() {
    const showSuccess = !this.data.starJudge;
    this.setData({
      starJudge: !this.data.starJudge,
      showSuccess,
      clickshow: true,
    });
    // 清除之前的定时器
    if (this.data.timer) {
      clearTimeout(this.data.timer);
    }
    this.setData({
      // 设置新的定时器
      timer: setTimeout(() => {
        this.setData({
          showSuccess: !showSuccess,
          timer: null,
          clickshow: false,
        });
      }, 1500),
    });
  },
  click_infoType(e) {
    const current_infoType = e.currentTarget.dataset.index;
    this.setData({
      current_infoType,
    });
  },
  click_expand() {
    this.setData({
      isExpanded: !this.data.isExpanded,
    });
  },
  click_tip_expand() {
    this.setData({
      isTipExpanded: !this.data.isTipExpanded,
    });
  },
});
