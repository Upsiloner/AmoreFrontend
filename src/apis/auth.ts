import request from '@/utils/request'

// 发送验证码
const sendCode = (data: object) => {
  return request.post('/Auth/sendCode', data)
}

export { sendCode };