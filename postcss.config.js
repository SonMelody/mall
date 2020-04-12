module.exports = {
  plugins: {
    autoprefixer: {},

    "postcss-px-to-viewport": {
      // 视窗的宽度，对应设计稿的宽度
      viewportWidth: 375,
      // 视窗的高度，对应设计稿的高度
      viewportHeight:667,
      // 指定'px'转换为视窗单位的小数位数
      unitPrecision:5,
      // 指定需要转换成的视窗单位
      viewportUnit:'vw',
      // 指定不需要转换的类
      selectorBlackList:['ignore','tab-bar','tab-bar-item'],

      // 小于或等于1px的不转换为视窗单位
      minPixelValue: 1,
      // 允许在媒体查询中转换为px
      mediaQuery: false
    }
  }
}