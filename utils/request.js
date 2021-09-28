/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/' : '/api', // 测试环境用dev 生产环境用pro
  withCredentials: true, // 跨域请求时发送cookies
  timeout: 12000 // 请求超时
})

// 节流计时器
let throttleTimer = null

service.interceptors.request.use(
  (request) => {
    request.headers['Content-Type'] = 'application/json;charset=UTF-8' // 'application/x-www-form-urlencoded'

    if (getToken()) {
      request.headers.token = getToken()
    }

    // 频繁请求拦截
    if (request.isThrottle) {
      if (throttleTimer) {
        return Promise.reject(new Error('请勿频繁操作～'))
      } else {
        throttleTimer = setTimeout(() => {
          throttleTimer && clearTimeout(throttleTimer)
          throttleTimer = null
        }, 3000)
      }
    }

    return request
  },
  (error) => {
    Message.error(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 错误处理
    if (res.code !== '0000' && res.code !== 0) {
      Message.error(res.msg)
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    if (error && error.request && error.request.status === 200) {
      Message.error(error.message)
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default service
