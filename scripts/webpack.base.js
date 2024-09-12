const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, '../src/client/index.tsx'),
  output: {
    filename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /.(jsx?)|(tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          filename: 'assets/imgs/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: 'asset/resource', // 字体图标不能转化为base64, 这里使用 asset/resource
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 25 * 1024, // 25kb
        //   },
        // },
        generator: {
          filename: 'assets/fonts/[name].[contenthash][ext]',
        },
      },
    ],
  },
}
