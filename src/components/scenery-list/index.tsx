import { Modal, Pagination } from 'antd'
import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListWrapper } from './style'
import Button from '@mui/material/Button'
import { delSceneryReq } from '@/service/modules/scenery'
import { useAppDispatch } from '@/store'
import { changeOpen } from '@/store/modules/main'
import { localCache } from '@/utils/cache'

interface Props {
  data: any
  fetch: Function
  page: number
  setPage: Function
  totalCount: number
}

const SceneryList = memo((props: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { data, page, setPage, fetch, totalCount } = props

  const roleType = localCache.getCache('roles')?.find((item: any) => item.id === 1)

  const handlePageClick = (page: number) => {
    setPage(page)
  }

  const goMore = (id: number) => {
    navigate(`/main/scenery/${id}`)
  }

  // 删除校园风光
  const handleDelClick = (id: number) => {
    Modal.warn({
      title: '你确认要删除吗？',
      maskClosable: true,
      onOk() {
        delSceneryReq(id).then((res) => {
          if (res.code === 0) {
            dispatch(changeOpen({ open: true, message: '删除成功', type: 'success' }))
            return fetch()
          }
          dispatch(changeOpen({ open: true, message: '删除失败', type: 'error' }))
        })
      }
    })
  }

  return (
    <ListWrapper>
      <div className="list">
        {data.map((item: any) => (
          <div key={item.id} className="item">
            <div className="title">
              <div
                className="left"
                style={{
                  background: 'linear-gradient(to right, #91ddc6, #9ce0cb, #c9eee3, #f3fbf9)'
                }}
              >
                {item.title}
              </div>
              <div className="right" onClick={() => goMore(item.id)}>
                更多
              </div>
              <div className="del">
                {roleType ? (
                  <Button
                    onClick={() => handleDelClick(item.id)}
                    variant="outlined"
                    size="small"
                    color="error"
                  >
                    删除
                  </Button>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="imgs">
              {item.sceneryImages.slice(0, 3).map((ci: any) => (
                <img key={ci.id} src={'http://localhost:8000/scenery/' + ci.filename} alt="" />
              ))}
            </div>
          </div>
        ))}
        {totalCount ? (
          <Pagination onChange={handlePageClick} current={page} total={totalCount} pageSize={3} />
        ) : (
          ''
        )}
      </div>
    </ListWrapper>
  )
})

export default SceneryList
