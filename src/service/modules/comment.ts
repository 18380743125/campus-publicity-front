import bRequest from '..'

// 发表评论
export function publishCommentReq(params: any) {
  return bRequest.post({
    url: '/api/v1/information/comment',
    data: params
  })
}

// 删除评论
export function deleteCommentReq(ids: number[]) {
  return bRequest.delete({
    url: `/api/v1/information/comment`,
    data: { ids }
  })
}

// 修改通知公告
export function updateCommentReq(id: number, dto: any) {
  return bRequest.patch({
    url: `/api/v1/information/${id}`,
    data: dto
  })
}

// 查询评论
export function getCommentReq(dto: any) {
  return bRequest.get({
    url: `/api/v1/information/comment`,
    params: dto
  })
}
