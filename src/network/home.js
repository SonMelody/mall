// 不是用default导出要加上括号{}
import {request} from "./request"

// 首页请求封装，统一管理
export function getHomeMultidata() {
  return request({
    // 每一个函数具体请求的url
    url: '/home/multidata'
  })
}