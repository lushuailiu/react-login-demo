import { requst } from "@/utils";

// 文章相关接口
// 1.获取频道列表
export function getCchannelAPI () {
  return requst({
    url: '/channels',
    method: 'GET',
  })
}

// 2.提交文章表单

export function createArticleAPI (data) {
  return requst({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data
  })
}

//3.获取文章列表


export function getArticleListAPI (params) {
  return requst({
    url: '/mp/articles',
    method: 'GET',
    params
  })
}
