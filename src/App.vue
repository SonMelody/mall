<template>
  <div id="app">
    <router-view></router-view>
    <!-- 使用组件 -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
// 导入组件
 import MainTabBar from 'components/content/mainTabbar/MainTabBar'


export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  /* 初始化样式 */
  @import "assets/css/base.css"
</style>
