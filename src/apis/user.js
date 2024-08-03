import { requst } from "@/utils";

// 登录
export function loginAPI (formData) {
  return requst({
    url: '/authorizations',
    method: 'POST',
    data: formData
  })
}

// 获取用户信息
export function userInfoAPI () {
    return requst({
      url: '/user/profile',
      method: 'GET',
    })
  }