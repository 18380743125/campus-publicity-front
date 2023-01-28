import { User } from '@/types/login'
import bRequest from '..'

// 用户注册
export function registerReq(params: User) {
  return bRequest.post({
    url: '/api/v1/user',
    data: params
  })
}

// 用户登录
export function loginReq(params: User) {
  return bRequest.post({
    url: '/api/v1/auth/login',
    data: params
  })
}
