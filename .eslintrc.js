const { reactlint, lintMerge } = require('@sunweibin/linters');

module.exports = lintMerge(reactlint, {
  parserOptions: {
    // 使用项目的 babel 配置
    babelOptions: {
      configFile: './babel.config.js',
    },
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './config/webpack.base.config.js',
      },
    },
  },
  globals: {
    chrome: true,
    fetch: true,
  },
});
