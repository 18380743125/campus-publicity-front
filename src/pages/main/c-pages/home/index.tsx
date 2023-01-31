import { getInformationReq } from '@/service/modules/information'
import { getNotificationReq } from '@/service/modules/notification'
import { useAppDispatch } from '@/store'
import { changeCurrentUrl } from '@/store/modules/main'
import { Button } from '@mui/material'
import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeList from './c-cpns/HomeList'
import { HomeWrapper } from './style'

const Home = memo(() => {
  const [news, setNews] = useState([])
  const [notifications, setNotfications] = useState([])
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    getInformationReq(1, 8).then((res) => {
      if (res.code === 0) {
        setNews(res.data.data)
      }
    })
    getNotificationReq(1, 8).then((res) => {
      if (res.code === 0) {
        setNotfications(res.data.data)
      }
    })
  }, [])

  return (
    <HomeWrapper>
      <div className="home">
        <div className="news">
          {/* title */}
          <div className="n-title">
            <div className="left">学校资讯</div>
            <div className="right">
              <Button
                onClick={() => {
                  dispatch(changeCurrentUrl('/main/information'))
                  navigate('/main/information')
                }}
                size="medium"
                style={{ fontSize: 13, letterSpacing: 2 }}
              >
                更多
              </Button>
            </div>
          </div>
          {news ? <HomeList type="information" data={news} /> : ''}
        </div>
        <div className="infos">
          {/* title */}
          <div className="in-title">
            <div className="left">通知公告</div>
            <div className="right">
              <Button
                onClick={() => {
                  dispatch(changeCurrentUrl('/main/notification'))
                  navigate('/main/notification')
                }}
                size="medium"
                style={{ fontSize: 13, letterSpacing: 2 }}
              >
                更多
              </Button>
            </div>
          </div>
          {/* 列表 */}
          {notifications ? <HomeList type="notification" data={notifications} /> : ''}
        </div>
      </div>
    </HomeWrapper>
  )
})

export default Home
