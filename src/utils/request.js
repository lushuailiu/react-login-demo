//axios 封装

import axios from 'axios'
import { getToken } from './token';

//  1. 根域名配置
//  2. 超时时间
//  3.请求拦截器/相应拦截器

const requst = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 添加请求拦截器
requst.interceptors.request.use(function (config) {

  // 操作config 注入token
  //1.获取到token
  //2.按照后端格式作token拼接
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
requst.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});



export { requst }