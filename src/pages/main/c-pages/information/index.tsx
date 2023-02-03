import { delInformationReq, getInformationReq } from '@/service/modules/information'
import { changeOpen } from '@/store/modules/main'
import { isAdmin } from '@/utils/isAdmin'
import { Button } from '@mui/material'
import { ConfigProvider, Modal, Pagination } from 'antd'
import { memo, useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { InformationWrapper } from './style'
import { formatUTC } from '../../../../utils/format'

const Information = memo(() => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fetchData = useCallback(() => {
    getInformationReq(page, 10).then((res) => {
      if (res.code === 0) {
        setCount(res.data.count)
        setData(res.data.data)
      }
    })
  }, [page])

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
        delInformationReq(id).then((res: any) => {
          if (res.code === 0) {
            dispatch(changeOpen({ open: true, message: '删除成功', type: 'success' }))
            return fetchData()
          }
          dispatch(changeOpen({ open: true, message: '删除失败', type: 'error' }))
        })
      }
    })
  }

  return (
    <InformationWrapper>
      <div className="information">
        <div className="title">
          <div className="text">最新资讯 (RECENT INFORMATION)</div>
          {isAdmin() ? (
            <div className="btns">
              <Button
                onClick={() => navigate(`/main/information/edit`)}
                variant="contained"
                size="small"
                style={{ background: '#3d6079' }}
              >
                发布资讯
              </Button>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="list">
          {data.map((item: any) => (
            <div key={item.id} className="item">
              <div className="i-title">{item.title}</div>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: item?.informationDetail?.content }}
              ></div>
              <div className="author">
                {/* <div className="left">重庆移通学院教务处</div> */}
                <div className="left">{formatUTC(item.createAt, 'YYYY-MM-DD HH:mm')}</div>
                <div className="right">
                  <Button onClick={() => navigate(`/main/information/${item.id}`)} size="small">
                    查看更多
                  </Button>
                  {isAdmin() ? (
                    <>
                      <Button
                        size="small"
                        onClick={() => navigate('/main/information/edit', { state: item })}
                      >
                        编辑
                      </Button>
                      <Button onClick={() => handleDelete(item.id)} size="small" color="error">
                        删除
                      </Button>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>
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
            pageSize={10}
            total={count}
          />
        </ConfigProvider>
      </div>
    </InformationWrapper>
  )
})

export default Information
