const path = require('path')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const base = require('./webpack.base.js')

module.exports = merge(base, {
  mode: 'production', // 生产模式
  devtool: 'source-map',
  // 生产环境下才会打包到 dist，生产环境下才需要设置 path 和 clean
  output: {
    path: path.resolve(__dirname, '../dist'), // 打包后的代码放在 dist 目录下
    clean: true, // 打包前清除 dist 目录
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          'isomorphic-style-loader',
          // MiniCssExtractPlugin.loader, // 提取css到单独的文件
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:5]',
              },
              esModule: false, // 启用 CommonJS 模块语法
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              // 它可以帮助我们将一些现代的 CSS 特性，转成大多数浏览器认识的 CSS，并且会根据目标浏览器或运行时环境添加所需的 polyfill；
              // 也包括会自动帮助我们添加 autoprefixer
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
            },
          },
          'less-loader',
        ],
        // 排除 node_modules 目录
        exclude: /node_modules/,
      },
    ],
  },
})
