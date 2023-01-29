import bRequest from '..'
// 获取用户信息
export function getUsersReq(name = '', page = 1, limit = 10) {
  return bRequest.get({
    url: '/api/v1/user',
    params: {
      name,
      page,
      limit
    }
  })
}

// 修改用户信息
export function updateUserReq(id: number, dto: any) {
  return bRequest.patch({
    url: `/api/v1/user/${id}`,
    data: dto
  })
}
