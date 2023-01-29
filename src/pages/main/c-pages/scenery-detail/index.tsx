import { getSceneryDetailReq } from '@/service/modules/scenery'
import { formatUTC } from '@/utils/format'
import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DetailWrapper } from './style'

const SceneryDetail = memo(() => {
  const { id } = useParams()

  const [data, setData] = useState<Record<string, any>>({})

  useEffect(() => {
    getSceneryDetailReq(Number(id)).then((res) => {
      setData(res.data)
    })
  }, [])

  return (
    <DetailWrapper>
      <div className="title">
        <div className="text">{data.title}</div>
        <div className="info">
          <div className="time">发布时间 {formatUTC(data.createAt)}</div>
          <div className="hot">访问次数{data.hots}</div>
        </div>
      </div>
      <div className="img-list">
        {data?.sceneryImages?.map((item: any) => (
          <div key={item.id} className="item">
            <img src={'http://localhost:8000/scenery/' + item.filename} alt="" />
          </div>
        ))}
      </div>
    </DetailWrapper>
  )
})

export default SceneryDetail
