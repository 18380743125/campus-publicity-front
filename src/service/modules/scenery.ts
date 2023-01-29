import bRequest from '..'

// 添加校园风光
export function publicSceneryReq(title: string, files: any) {
  const fd = new FormData()
  fd.append('title', title)
  for (const f of files) {
    fd.append('img', f)
  }
  return bRequest.post({
    headers: {
      'Content-Type': 'multipart/formdata'
    },
    url: '/api/v1/scenery',
    data: fd
  })
}

// 获取校园风光
export function getSceneryReq(page = 1, limit = 10) {
  return bRequest.get({
    url: '/api/v1/scenery',
    params: {
      page,
      limit
    }
  })
}

// 获取校园风光详情
export function getSceneryDetailReq(id: number) {
  return bRequest.get({
    url: `/api/v1/scenery/${id}`
  })
}

// 根据 id 删除校园风光
export function delSceneryReq(id: number) {
  return bRequest.delete({
    url: `/api/v1/scenery/${id}`
  })
}
