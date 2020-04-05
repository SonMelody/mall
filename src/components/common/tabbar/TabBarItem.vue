<template>
  <!--所有的item都展示同一个图片, 同一个文字-->
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <!-- 具名插槽，动态替换图片 -->
      <slot name="item-icon"></slot>
    </div>

    <div v-else>
      <!-- 具名插槽，动态替换活跃时图片 -->
      <slot name="item-icon-active"></slot>
    </div>

    <div :style="activeStyle">
      <!-- 具名插槽，动态替换文字 -->
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    // 用items的时候，this动态跳转的路径，父向子通信
    props: {
      path: String,
      activeColor: {
        type: String,
        // 默认红色
        default: 'red'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        // 思路：路径相等
        // /home -> item1(/home) = true
        // /home -> item1(/category) = false
        // /home -> item1(/cart) = true
        // /home -> item1(/profile) = true
        // $route:哪一个路由处于活跃就是那一个路由对象
        return this.$route.path.indexOf(this.path) !== -1
      },
      // 动态决定tabbar文字颜色
      activeStyle() {
        // 判断是否处于活跃
        // 处于活跃得到传入的颜色，否则为初始颜色
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        // 跳转：返回有效用push，不能返回用repalce
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    /* flex布局，均等分 */
    flex: 1;
    text-align: center;
    /* tabBar的高度 */
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
