import { getNotificationByIdReq } from '@/service/modules/notification'
import { formatUTC } from '@/utils/format'
import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DetailWrapper } from './style'

const NotificationDetail = memo(() => {
  const params = useParams()
  const { id } = params
  const [data, setData] = useState<any>({})
  useEffect(() => {
    if (id === undefined) return
    getNotificationByIdReq(+id).then((res) => {
      if (res.code === 0) setData(res.result)
    })
  }, [])
  return (
    <DetailWrapper>
      <div className="title">
        <div className="top">{data.title}</div>
        <div className="bottom">
          <span>{formatUTC(data.createAt, 'YYYY-MM-DD')}</span>
          <span style={{ marginLeft: 10 }}>点击: [{data.count}]</span>
        </div>
      </div>
      <p className="content" dangerouslySetInnerHTML={{ __html: data.content }}></p>
      <div className="footer">
        <div className="remarks">{data.remarks}</div>
        <div className="author">{formatUTC(data.createAt, 'YYYY-MM-DD')}</div>
      </div>
    </DetailWrapper>
  )
})

export default NotificationDetail
