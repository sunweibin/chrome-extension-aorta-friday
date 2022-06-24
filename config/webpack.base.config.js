const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = require('./paths');

module.exports = {
  entry: {
    // Chrome 插件的弹出框入口
    popup: { import: './src/popup.js', dependOn: ['reactvendors'] },
    // reactvendors
    reactvendors: ['react', 'react-dom', 'prop-types'],
    // 选项页面
    options: { import: './src/options.js', dependOn: ['reactvendors'] },
  },
  output: {
    filename: '[name].[contenthash].js',
    path: paths.appDist,
  },
  resolve: {
    alias: {
      '@/configs': paths.resolveApp('src/configs'),
      '@/components': paths.resolveApp('src/components'),
    },
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
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      publicPath: '.',
      title: 'Aorta Friday',
      description: '聊TA 助手',
      filename: 'popup.html',
      template: paths.appPublicHtml,
      chunks: ['reactvendors', 'popup'],
      chunksSortMode: 'manual',
      scriptLoading: 'module',
    }),
    new HtmlWebpackPlugin({
      publicPath: '.',
      title: 'Aorta Friday',
      description: '聊TA 助手',
      filename: 'options.html',
      template: paths.appPublicHtml,
      chunks: ['reactvendors', 'options'],
      chunksSortMode: 'manual',
      scriptLoading: 'module',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
  ],
};
