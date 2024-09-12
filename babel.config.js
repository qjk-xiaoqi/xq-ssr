// babel.config.js
module.exports = {
  // 执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead',
        // 如果我们将参数项改成false，那么就不会对ES6模块化进行更改，还是使用import引入模块。使用ES6模块化语法有什么好处呢。在使用Webpack一类的打包工具，可以进行静态分析，从而可以做tree shaking 等优化措施。
        modules: false,
        useBuiltIns: 'usage', // 会根据配置的目标环境找出需要的polyfill进行部分引入
        corejs: 3, // 使用 core-js@3 版本
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
}
