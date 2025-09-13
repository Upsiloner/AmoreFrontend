import request from '@/utils/request'

// 获取用户基本信息
const profile = () => {
  return request.get('/UserInfo/profile')
}

export { profile };