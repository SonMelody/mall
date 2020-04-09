<!--  -->
<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- 复制一份tab-control -->
    <tab-control 
      class="tab-control"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabConTrol1" v-show="isTabFixed">
    </tab-control>

    <!-- 滚动组件 -->
    <scroll class="content" ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
        <!-- 轮播图封装 -->
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <!-- 首页推荐封装抽取 -->
        <recommend-view :recommends="recommends"></recommend-view>
        <!-- 推荐下方组件导入 -->
        <feature-view></feature-view>
        <!-- 控制组件 -->
        <tab-control 
          :titles="['流行','新款','精选']"
          @tabClick="tabClick"
          ref="tabConTrol2" >
        </tab-control>
        <!-- 商品列表页 -->
        <GoodsList :goods="showGoods"></GoodsList>
      </scroll>
      <!-- 监听组件点击加上.native -->
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
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
  import Scroll from 'components/common/scroll/Scroll'
  // 返回顶部
  import BackTop from 'components/content/backTop/BackTop'

  // 首页请求数据导入
  import { 
    getHomeMultidata, 
    getHomeGoods
  } from "network/home"
  import {debounce} from 'common/utils'

  import BScroll from 'better-scroll'


  export default {
      name:'Home',
      components: {
        NavBar,
        TabControl,
        GoodsList, 
        Scroll,
        BackTop,

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
          currentType: 'pop',
          // 默认按钮时不显示的
          isShowBackTop: false,
          // 吸附
          tabOffstTop: 0,
          isTabFixed: false,
          saveY: 0
        }
      },
      // 计算属性
      computed: {
        // 展示goods
        showGoods() {
          return this.goods[this.currentType].list
        }
      },
      activated() {
        this.$refs.scroll.scrollTo(0,this.saveY,)
        this.$refs.scroll.refresh()
      },
      deactivated() {
        this.saveY = this.$refs.scroll.scroll.y
      },
      // 首页组件创建完后，发送网络请求
      created () {
        // 封装到methods,这里只写逻辑代码
        // 1.请求多个数据
       this.getHomeMultidata()
        // 2.请求商品数据
       this.getHomeGoods('pop')
       this.getHomeGoods('new')
       this.getHomeGoods('sell')

      },
      mounted () {
        // 1.图片加载完成的事件监听
        const refresh = debounce(this.$refs.scroll.refresh, 200)
        // 3.监听item中图片加载完成(bus)
        this.$bus.$on('itemImageLoad', () => {
          refresh()
        })
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
          this.$refs.tabConTrol1.currentIndex = index;
          this.$refs.tabConTrol2.currentIndex = index;
        },
        // 返回顶部
        backClick() {
          // 通过ref拿到组件对象
          this.$refs.scroll.scrollTo(0,0)
        },
        contentScroll(position) {
          // console.log(position)
          // position.y > 100
          // 1.判断BackTop是否显示
          this.isShowBackTop = (-position.y) > 1000
          // 2.决定tabControl是否吸顶（position:fixed）
          this.isTabFixed = (-position.y) > this.tabOffstTop
        },
        loadMore() {
          // console.log('上拉加载更多')
          this.getHomeGoods(this.currentType)
        },
        swiperImageLoad() {
          // console.log(this.$refs.tabConTrol.$el.offsetTop)
          this.tabOffstTop = this.$refs.tabConTrol2.$el.offsetTop
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
            
            // 完成了上拉加载更多，调用finish
            this.$refs.scroll.finishPullUp()
          })
        },
      }
  }

</script>

<style  scoped>
   #home {
    /* padding-top: 44px; */
    /* vh->视口高度 */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color:var(--color-tint);
    color: white;

    /* 使用原生滚动时候，为了让他脱标准流 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    position: sticky;
    top:44px;
    z-index: 9;
  }

  .content {
    /* height: 300px; */
    overflow: hidden;

    position: absolute;
    top:44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /* .content {
    height: calc(100% - 93px);
    margin-top: 44px;
  } */
</style>