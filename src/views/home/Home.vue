<!--  -->
<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 轮播图封装 -->
    <home-swiper :banners="banners"></home-swiper>
    <!-- 首页推荐封装抽取 -->
    <recommend-view :recommends="recommends"></recommend-view>
    <!-- 推荐下方组件导入 -->
    <feature-view></feature-view>
    <!-- 控制组件 -->
    <tab-control 
      class="tab-control"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick">
    </tab-control>
    <!-- 商品列表页 -->
    <GoodsList :goods="showGoods"></GoodsList>
    
  </div>
</template>

<script>
  //组件导入 

  // 轮播图/推荐组件导入
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  // 推荐下方图片组件导入
  import FeatureView from './childComps/FeatureView'

  // 公共组件的导入
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  // 首页请求数据导入
  import { 
    getHomeMultidata, 
    getHomeGoods
  } from "network/home"


  export default {
      name:'Home',
      components: {
        NavBar,
        TabControl,
        GoodsList, 

        HomeSwiper,
        RecommendView,
        FeatureView
      },
      data() {
        return {
          // 要把请求到的res数据保存起来
          banners: [],
          recommends:[],
          goods: {
            'pop': {page: 0, list: []},
            'new': {page: 0, list: []},
            'sell': {page: 0, list: []},
          },
          // 默认是'pop'
          currentType: 'pop'
        }
      },
      // 计算属性
      computed: {
        // 展示goods
        showGoods() {
          return this.goods[this.currentType].list
        }
      },
      // 首页组件创建完后，发送网络请求
      created () {
        // 封装到methods,这里只写逻辑代码
        // 1.请求多个数据
       this.getHomeMultidata()
        // 请求商品数据
       this.getHomeGoods('pop')
       this.getHomeGoods('new')
       this.getHomeGoods('sell')
      },
      methods: {
        /**
         * 事件监听相关的方法
         */
        tabClick(index) {
          // console.log(index)
          switch(index) {
            case 0:
              this.currentType = 'pop'
              break
            case 1:
              this.currentType = 'new'
              break
            case 2:
              this.currentType = 'sell'
              break
          }
        },

        /** 
         * 网络请求相关方法
        */
        getHomeMultidata() {
          getHomeMultidata().then(res => {
            // console.log(res)
            // this.result = res;
            // 取出数据
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          })
        },
          getHomeGoods(type)  {
            // 原来page的基础上加上1
            const page = this.goods[type].page + 1
            // type：动态获取'pop' 'new' 'sell' 
            getHomeGoods(type ,page).then(res => {
            // console.log(res)
            // 结果 => 前30条数据   page:1 
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1
          })
        },
      }
  }

</script>

<style  scoped>
   #home {
    padding-top: 44px;
    position: relative;
  }

  .home-nav {
    background-color:var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top:44px;
    z-index: 9;
  }
</style>