import { delNotificationReq, getNotificationReq } from '@/service/modules/notification'
import { formatUTC } from '@/utils/format'
import { ConfigProvider, Input, Modal, Pagination } from 'antd'
import Button from '@mui/material/Button'
import { memo, useCallback, useEffect, useState } from 'react'
import { NotificationWrapper } from './style'
import { useNavigate } from 'react-router-dom'
import { isAdmin } from '@/utils/isAdmin'
import { useDispatch } from 'react-redux'
import { changeOpen } from '@/store/modules/main'
import { SearchOutlined } from '@ant-design/icons'

const Notification = memo(() => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [title, setTitle] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 获取数据
  const fetchData = useCallback(
    (title?: string) => {
      getNotificationReq(page, 20, title).then((res) => {
        setData(res.data.data)
        setTotalCount(res.data.totalCount)
      })
    },
    [page]
  )

  // 初始化数据
  useEffect(() => {
    fetchData()
  }, [page])

  // 处理删除
  const handleDelete = (id: number) => {
    Modal.warn({
      title: '你确认要删除吗？',
      maskClosable: true,
      onOk() {
        delNotificationReq(id).then((res: any) => {
          if (res.code === 0) {
            dispatch(changeOpen({ open: true, message: '删除成功', type: 'success' }))
            return fetchData()
          }
          dispatch(changeOpen({ open: true, message: '删除失败', type: 'error' }))
        })
      }
    })
  }

  // 处理编辑点击
  const goEdit = (item: any) => {
    navigate('/main/notification/edit', { state: item })
  }

  const goDetail = (id: number) => {
    navigate(`/main/notification/${id}`)
  }

  // 搜索
  const handleSearch = () => {
    setPage(1)
    fetchData(title)
  }
  return (
    <NotificationWrapper>
      <div className="notification">
        <div className="title">
          <div className="text">最新通知 (RECENT NOTIFICATION)</div>
          {isAdmin() ? (
            <div className="btns">
              <Button
                onClick={() => navigate('/main/notification/edit')}
                variant="contained"
                size="small"
                style={{ background: '#3d6079' }}
              >
                发布通知
              </Button>
            </div>
          ) : (
            ''
          )}
          <div style={{ position: 'relative', left: 20 }}>
            <Input
              style={{ width: 380 }}
              value={title}
              onChange={({ target: { value } }) => setTitle(value)}
              prefix={<SearchOutlined />}
              placeholder="请输入公告标题"
            />
            <Button
              variant="contained"
              size="small"
              style={{ position: 'relative', top: -1, left: 10 }}
              onClick={handleSearch}
            >
              检索
            </Button>
          </div>
        </div>
        <div className="list">
          {data.map((item: any) => (
            <div key={item.id} className="item">
              <div className="text" onClick={() => goDetail(item.id)}>
                <span>◆</span>
                {item.title}
              </div>
              {isAdmin() ? (
                <div className="btns">
                  <Button onClick={() => goEdit(item)} style={{ color: '#013f58' }}>
                    编辑
                  </Button>
                  <Button onClick={() => handleDelete(item.id)} color="error">
                    删除
                  </Button>
                </div>
              ) : (
                ''
              )}
              <div className="time">{formatUTC(item.createAt, 'YYYY.MM.DD')}</div>
            </div>
          ))}
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#3d6079'
            }
          }}
        >
          <Pagination
            current={page}
            onChange={(p) => setPage(p)}
            style={{ marginTop: 10 }}
            hideOnSinglePage
            pageSize={20}
            total={totalCount}
          />
        </ConfigProvider>
      </div>
    </NotificationWrapper>
  )
})

export default Notification
