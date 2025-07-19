module.exports = {
  types: [
    { value: 'feat', name: '新增:    新的内容' },
    { value: 'fix', name: '修复:    修复一个Bug' },
    { value: 'docs', name: '文档:    变更的只有文档' },
    { value: 'style', name: '格式:    空格, 分号等格式修复' },
    {
      value: 'refactor',
      name: '️重构:    代码重构，注意和特性、修复区分开',
    },
    { value: 'perf', name: '️️性能:    提升性能' },
    { value: 'test', name: '测试:    添加一个测试' },
    { value: 'build', name: '工具:    开发工具变动(构建、脚手架工具等)' },
    { value: 'rollback', name: '回滚:    代码回退' },
    { value: 'addLog', name: '添加log:    代码回退' },
    { value: 'chore', name: '杂项:    其他不影响源代码的更改' },
    { value: 'ci', name: 'CI:    持续集成的配置文件和脚本的变动' },
  ],
  scopes: [
    // 前端视图层
    { name: 'components' }, // 通用组件
    { name: 'pages' }, // 页面级组件
    { name: 'layouts' }, // 布局组件
    { name: 'views' }, // 视图模块
    { name: 'routes' }, // 路由配置

    // 状态管理
    { name: 'store' }, // 全局状态
    { name: 'modules' }, // 状态模块
    { name: 'actions' }, // 异步操作
    { name: 'mutations' }, // 状态变更

    // 工程化
    { name: 'build' }, // 构建配置
    { name: 'config' }, // 项目配置
    { name: 'scripts' }, // 工程脚本
    { name: 'lint' }, // 代码检查
    { name: 'test' }, // 测试相关

    // 后端服务
    { name: 'api' }, // API接口
    { name: 'service' }, // 服务层
    { name: 'controller' }, // 控制器
    { name: 'model' }, // 数据模型
    { name: 'middleware' }, // 中间件

    // 数据层
    { name: 'database' }, // 数据库
    { name: 'migration' }, // 数据迁移
    { name: 'seed' }, // 数据填充
    { name: 'cache' }, // 缓存

    // 基础设施
    { name: 'docker' }, // Docker容器
    { name: 'kubernetes' }, // K8s部署
    { name: 'ci/cd' }, // 持续集成
    { name: 'nginx' }, // 负载均衡
    { name: 'monitor' }, // 监控系统

    // 工具链
    { name: 'utils' }, // 工具函数
    { name: 'hooks' }, // 自定义钩子
    { name: 'directives' }, // 自定义指令
    { name: 'filters' }, // 过滤器
    { name: 'plugins' }, // 插件

    // 其他
    { name: 'docs' }, // 文档
    { name: 'assets' }, // 静态资源
    { name: 'i18n' }, // 国际化
    { name: 'security' }, // 安全加固
    { name: 'performance' }, // 性能优化
    { name: 'dependency' }, // 依赖更新
    { name: 'chore' }, // 杂项修改
  ],
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个scope (可选):',
    customScope: 'Denote the SCOPE of this change:',
    subject: '短说明:\n',
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?(yes/no)',
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['特性', '修复'],
  subjectLimit: 100,
};
