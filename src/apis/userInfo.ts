import request from '@/utils/request'

// 获取用户基本信息
const profile = () => {
  return request.get('/UserInfo/profile')
}

// 上传头像
const avatar = (formData: FormData) => {
  return request.post('/UserInfo/avatar', formData)
}

export { profile, avatar };