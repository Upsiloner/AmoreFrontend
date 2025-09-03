import axios from "axios"
import { message } from 'ant-design-vue'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器
request.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      const status = error.response.status
      switch (status) {
        case 400:
          message.error('[400] 请求参数错误')
          break
        case 401:
          message.error('[401] 未授权，请重新登录')
          break
        case 404:
          message.error('[404] 接口不存在')
          break
        case 500:
          message.error('[500] 服务器错误，请稍后再试')
          break
        default:
          message.error(`${status} 请求失败`)
      }
    } else {
      message.error('网络异常，请检查网络连接')
    }
    return Promise.reject(error)
  }
)

export default request
