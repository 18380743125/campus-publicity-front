import bRequest from '..'

// 新增通知公告
export function publishNotificationReq(params: any) {
  const notification = params.flag
  const isCreate = notification ? false : true
  delete params.flag
  if (!isCreate) {
    return updateNotificationReq(notification.id, params)
  }
  return bRequest.post({
    url: '/api/v1/notification',
    data: params
  })
}

// 获取通知公告
export function getNotificationReq(page = 1, limit = 20) {
  return bRequest.get({
    url: '/api/v1/notification',
    params: {
      page,
      limit
    }
  })
}

// 修改通知公告
export function updateNotificationReq(id: number, dto: any) {
  return bRequest.patch({
    url: `/api/v1/notification/${id}`,
    data: dto
  })
}

// 获取通知公告详情
export function getNotificationByIdReq(id: number) {
  return bRequest.get({
    url: `/api/v1/notification/${id}`
  })
}

// 删除通知公告
export function delNotificationReq(id: number) {
  return bRequest.delete({
    url: `/api/v1/notification/${id}`
  })
}
