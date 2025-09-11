import request from '@/utils/request'

// 发送验证码
const sendCode = (data: object) => {
  return request.post('/Auth/sendCode', data)
}

// 用户注册
const register = (data: object) => {
  return request.post('/Auth/register', data)
}

// 用户登录
const login = (data: object) => {
  return request.post('/Auth/login', data)
}

export { sendCode, register, login };