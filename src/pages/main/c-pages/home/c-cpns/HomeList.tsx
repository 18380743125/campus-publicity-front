import { useAppDispatch } from '@/store'
import { changeCurrentUrl } from '@/store/modules/main'
import { formatUTC } from '@/utils/format'
import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListWrapper } from './style'

interface Props {
  data: Array<Record<string, any>>
  type: 'information' | 'notification'
}

const HomeList = memo((props: Props) => {
  const { data, type } = props
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const goMore = (id: number) => {
    dispatch(changeCurrentUrl(`/main/${type}`))
    navigate(`/main/${type}/${id}`)
  }
  return (
    <ListWrapper>
      {data.map((item: any) => (
        <div className="item" key={item.id}>
          <div className="time">{formatUTC(item.createAt, 'MM-DD')}</div>
          <div className="text" onClick={() => goMore(item.id)}>
            {item.title}
          </div>
        </div>
      ))}
    </ListWrapper>
  )
})

export default HomeList
