// 不是用default导出要加上括号{}
import {request} from "./request"

// 首页请求封装，统一管理
export function getHomeMultidata() {
  return request({
    // 每一个函数具体请求的url
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

let totalNums = []

const nums1 = [20, 11, 222]
const nums2 = [111, 22, 333]

// for (let n of nums1) {
//   totalNums.push(n)
// }

// 解析语法：可变参数
totalNums.push(...nums1)