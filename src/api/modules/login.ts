import request from '@/utils/request'
import { LoginForm } from '@/api/types/login'

// 登录方法
export function login(data: LoginForm) {
  return request({
    url: '/login',
    method: 'post',
    data: data,
  })
}
// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    method: 'get',
    headers: {
      isToken: false,
    },
  })
}
// 获取用户详细信息
export function getUserInfo() {
  return request({
    url: '/getInfo',
    method: 'get',
  })
}
// 获取用户菜单
export function getRouters() {
  return request({
    url: '/getRouters',
    method: 'get',
  })
}
// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}
