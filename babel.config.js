module.exports = {
  presets: ['@babel/preset-react'],
  plugins: [
    ['lodash'],
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: false,
        corejs: 3,
        version: '7.18.3',
      },
    ],
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
    ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
  ],
};
