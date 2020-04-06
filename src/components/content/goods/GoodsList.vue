<template>
  <div class="goods">
    <!-- 决定遍历多少个item，并传入GoodsItem-->
    <!-- 根据列表遍历出了很多个goods-item-item小组件 -->
    <goods-list-item v-for="item in goods" :goods-item="item" :key="item.index" /> 
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      // 得到Home的商品
      goods: {
        type: Array,
        default() {
          return []
        }
      } 
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }


</style>
