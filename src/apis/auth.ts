import request from '@/utils/request'

// 发送验证码
const sendCode = (data: object) => {
  return request.post('/Auth/sendCode', data)
}

// 用户注册
const register = (data: object) => {
  return request.post('/Auth/register', data)
}

export { sendCode, register };