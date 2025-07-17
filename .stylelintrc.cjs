module.exports = {
  // 从标准配置中继承规则
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'prettier',
  ],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  // 规则配置
  rules: {
    // 禁用注释前的空行规则
    'comment-empty-line-before': null,
    // 禁用声明前的空行规则
    'declaration-empty-line-before': null,
    // 指定函数名的大小写为小写
    'function-name-case': 'lower',
    // 禁用选择器特异性递减规则
    'no-descending-specificity': null,
    // 禁用无效的双斜杠注释规则
    'no-invalid-double-slash-comments': null,
    // 指定规则前需要空行
    'rule-empty-line-before': 'always',
    // 检查声明块中未使用的属性
    'plugin/declaration-block-no-ignored-properties': true,
    'import-notation': null,
    'function-url-quotes': null,
    'at-rule-no-unknown': null,
  },

  // 使用插件来检查声明块中未使用的属性
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-prettier',
  ],
  // 忽略检查的文件或文件夹
  ignoreFiles: ['node_modules/**/*', 'build/**/*'],
};
