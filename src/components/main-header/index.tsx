import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import { HeaderWrapper } from './style'
import { localCache } from '@/utils/cache'
import { isAdmin } from '@/utils/isAdmin'
import MyInfo from './c-cpns/my-info'

const MainHeader = memo(() => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  // 退出登录
  const logout = () => {
    localCache.clear()
    navigate('/login')
  }

  const role = () => {
    const roles = localCache.getCache('roles')
    if (!roles) return null
    const admin = roles.find((item: any) => item.id === 1)
    if (admin) return '管理员'
    else return '普通用户'
  }

  const userInfo = () => {
    const user = localCache.getCache('user')
    return user
  }

  if (isAdmin()) document.title = '移通校园宣传后台管理系统'

  return (
    <HeaderWrapper>
      {/* 我的信息 */}
      <MyInfo open={open} setOpen={setOpen} />

      <div className="left">
        <img src={require('@/assets/images/main/logo.png')} alt="" />
      </div>
      <div className="center">
        {!isAdmin() ? (
          <div>
            <p>中国民办大学第一</p>
            <p>一所注重学科交叉融合的应用型大学</p>
            <p>
              <span style={{ marginRight: 30 }}>一所信息产业商学院</span> 一所最受尊崇的大学
            </p>
          </div>
        ) : (
          <div style={{ fontSize: 18 }}>校园宣传后台管理系统</div>
        )}
      </div>
      <div className="right">
        <div>
          <p className="user">用户名：{userInfo()?.name ?? '请先登录'}</p>
          <p style={{ marginBottom: 10, fontSize: 14 }}>你的身份: {role() ?? '游客'}</p>
        </div>
        <div className="btns">
          {localCache.getCache('token') ? (
            <div>
              <Button
                variant="contained"
                size="small"
                style={{ marginRight: 10, background: '#013f58' }}
                onClick={() => setOpen(true)}
              >
                我的资料
              </Button>
              <Button
                variant="contained"
                size="small"
                color="inherit"
                style={{ marginRight: 10, background: '#013f58' }}
                onClick={logout}
              >
                退出登录
              </Button>
            </div>
          ) : (
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              onClick={() => navigate('/login')}
            >
              去登录
            </Button>
          )}
        </div>
      </div>
    </HeaderWrapper>
  )
})

export default MainHeader
