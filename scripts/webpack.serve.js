const path = require('path')
const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')

const nodeExternals = require('webpack-node-externals') // 排除 node 中的内置模块和node_modules中的第三方库，比如 fs、path等，

module.exports = merge(base, {
  target: 'node',
  entry: path.resolve(__dirname, '../src/server/index.js'),
  output: {
    filename: '[name].js',
    clean: true, // 打包前清除 dist 目录,
    path: path.resolve(__dirname, '../build'),
  },
  externals: [nodeExternals()], // 避免重复打包
})
