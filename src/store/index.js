import Vue from 'vue'
import VueX from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装插件
Vue.use(VueX)

// 2创建store对象
const state = {
  cartList:[]
}

const store = new VueX.Store({
  state,
  // mutation的目的是为了修改state中的状态
  // mutations中的每一个方法尽可以完成的事件比较单一一点
  mutations,
  actions,
  getters,
})


// 3.挂载Vue实例

export default  store