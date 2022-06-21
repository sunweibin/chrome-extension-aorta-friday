const paths = require('./paths');

module.exports = {
  entry: {
    // Chrome 插件的弹出框入口
    popup: './src/popup.js'
  },
  output: {
    filename: '[name].js',
    path: paths.appDist,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /@babel(?:\/|\\{1,2})runtime/,
        test: /\.(js|mjs|jsx|ts|tsx|css)$/,
        loader: require.resolve('source-map-loader'),
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: paths.appSrc,
        exclude: /(node_modules|bower_components)/,
        loader: require.resolve('babel-loader'),
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ]
  }
};
