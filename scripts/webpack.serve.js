const path = require('path')
const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const nodeExternals = require('webpack-node-externals') // 排除 node 中的内置模块和node_modules中的第三方库，比如 fs、path等，

module.exports = merge(base, {
  target: 'node',
  mode: 'production', // 生产模式
  entry: path.resolve(__dirname, '../src/server/index.js'),
  output: {
    filename: '[name].js',
    clean: true, // 打包前清除 dist 目录,
    path: path.resolve(__dirname, '../build'),
  },
  externals: [nodeExternals()], // 避免重复打包
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          'isomorphic-style-loader', // 服务端渲染时，需要使用 isomorphic-style-loader 来处理样式
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
