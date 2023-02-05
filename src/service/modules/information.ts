import bRequest from '..'

// 新增通知公告
export function publishInformationReq(params: any) {
  const Information = params.flag
  const isCreate = Information ? false : true
  delete params.flag
  if (!isCreate) {
    return updateInformationReq(Information.id, params)
  }
  return bRequest.post({
    url: '/api/v1/information',
    data: params
  })
}

// 获取通知公告
export function getInformationReq(page = 1, limit = 10, title = '') {
  return bRequest.get({
    url: '/api/v1/information',
    params: {
      page,
      size: limit,
      title
    }
  })
}

// 修改通知公告
export function updateInformationReq(id: number, dto: any) {
  return bRequest.patch({
    url: `/api/v1/information/${id}`,
    data: dto
  })
}

// 获取通知公告详情
export function getInformationByIdReq(id: number) {
  return bRequest.get({
    url: `/api/v1/information/${id}`
  })
}

// 删除通知公告
export function delInformationReq(id: number) {
  return bRequest.delete({
    url: `/api/v1/information/${id}`
  })
}
