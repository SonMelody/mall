import {debounce} from './utils'
import {POP, NEW, SELL} from "./const";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener:null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500)

      this.itemImgListener = () => {
        refresh()
      }

    this.$bus.$on('itemImgLoad', this.itemImgListener )
    // console.log('我是混入中的内容')
  }
}


        // // 1.图片加载完成的事件监听
        // const refresh = debounce(this.$refs.scroll.refresh, 200)

        // // 对监听的事件进行保存
        // this.itemImgListener = () => {
        //   refresh()
        // }
        // // 3.监听item中图片加载完成(bus)
        // this.$bus.$on('itemImageLoad',  this.itemImgListener )

        export const tabControlMixin = {
          data: function () {
            return {
              currentType: POP
            }
          },
          methods: {
            tabClick(index) {
              switch (index) {
                case 0:
                  this.currentType = POP
                  break
                case 1:
                  this.currentType = NEW
                  break
                case 2:
                  this.currentType = SELL
                  break
              }
              console.log(this.currentType);
            }
          }
        }