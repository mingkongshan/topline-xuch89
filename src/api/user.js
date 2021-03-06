
// 用户请求相关模块
import request from '@/utils/request'

export const login = data => {
  // 具体的请求代码

  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    // headers: {
    //   'Content-Type': 'application/json'
    // }, // 请求头参数
    // params: {}, // Query 查询参数
    data // Body 请求体参数
  })
}
export const getSmsCode = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
/**
 * 获取当前登录用户个人信息
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

/**
 * 获取用户频道列表或默认推荐频道列表
 */
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
