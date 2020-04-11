import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
   return new Promise((resolve, reject) => {
      // 查找之前数组中是否有该商品
    let oldProduct = null;
    for(let item of context.state.cartList) {
      if (item.iid === payload.iid) {
        oldProduct = item
      }
    }
    // 2.判断oldProduct
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
      resolve('当前的商品数量+1')
    } else {  //添加新的商品
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART,payload)
      resolve('成功加入购物车')
    }
    })
  }
}
   