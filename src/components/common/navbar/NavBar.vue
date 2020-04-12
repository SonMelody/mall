<template>
    <!-- 导航栏 -->
    <div class="nav-bar">
        <!-- 左 -->
        <div class="left">
          <slot name="left"></slot>
        </div>
        <!-- 中 -->
        <div class="center">
          <slot name="center"></slot>
        </div>
        <!-- 右 -->
        <div class="right">
          <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name:'',
    }

</script>

<style >
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
    /* 不要写死背景颜色 */
     /* z-index: 10; */
     position: relative;
     z-index: 10;
  }

  .left, .right {
    width: 60px;
  }

  .center {
    flex: 1;
  }
</style>