import { getInformationByIdReq } from '@/service/modules/information'
import { formatUTC } from '@/utils/format'
import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DetailWrapper } from './style'

const DetailInformation = memo(() => {
  const params = useParams()
  const { id } = params
  const [data, setData] = useState<any>({})
  useEffect(() => {
    if (id === undefined) return
    getInformationByIdReq(+id).then((res) => {
      if (res.code === 0) setData(res.data)
      console.log(res)
    })
  }, [])

  return (
    <DetailWrapper>
      <div className="title">
        <div className="top">{data?.title}</div>
        <div className="bottom">
          <span>{formatUTC(data?.createAt, 'YYYY-MM-DD')}</span>
          <span style={{ marginLeft: 10 }}>点击: [{data?.informationDetail?.view_count}]</span>
        </div>
      </div>
      <p
        className="content"
        dangerouslySetInnerHTML={{ __html: data?.informationDetail?.content }}
      ></p>
      <div className="footer">
        <div className="remarks">重庆移通学院教务处</div>
        <div className="author">{formatUTC(data?.createAt, 'YYYY-MM-DD')}</div>
      </div>
    </DetailWrapper>
  )
})

export default DetailInformation
