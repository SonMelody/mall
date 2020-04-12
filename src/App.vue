<template>
  <div id="app">
    <!-- 路由 -->
    <keep-alive exclude="Detail">
    <router-view></router-view>
    </keep-alive>
    <!-- 使用组件 -->
    <main-tab-bar></main-tab-bar>
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
// 导入组件
 import MainTabBar from 'components/content/mainTabbar/MainTabBar'
  import Icon from 'components/content/Icon/Icon.vue'
  import SvgIcon from 'components/content/Icon/svg.vue'


export default {
  name: 'App',
  components: {
    MainTabBar,
    Icon,
    SvgIcon
  }
}
</script>

<style>
  /* 初始化样式 */
  @import "assets/css/base.css"
</style>
