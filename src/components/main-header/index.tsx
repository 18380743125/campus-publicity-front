import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import { HeaderWrapper } from './style'
import { localCache } from '@/utils/cache'

const MainHeader = memo(() => {
  const navigate = useNavigate()

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

  return (
    <HeaderWrapper>
      <div className="left">
        <img src={require('@/assets/images/main/logo.png')} alt="" />
      </div>
      <div className="center">
        <p>中国民办大学第一</p>
        <p>一所注重学科交叉融合的应用型大学</p>
        <p>
          <span style={{ marginRight: 30 }}>一所信息产业商学院</span> 一所最受尊崇的大学
        </p>
      </div>
      <div className="right">
        <div>
          <p className="user">用户名：{userInfo()?.name ?? '请先登录'}</p>
          <p style={{ marginBottom: 10, fontSize: 14 }}>你的身份: {role() ?? '游客'}</p>
        </div>
        <div className="btns">
          {localCache.getCache('token') ? (
            <Button variant="outlined" size="small" color="inherit" onClick={logout}>
              退出登录
            </Button>
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
