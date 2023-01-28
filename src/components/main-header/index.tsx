import React, { memo } from 'react'

import Button from '@mui/material/Button'
import { HeaderWrapper } from './style'
import { localCache } from '@/utils/cache'

interface Props {}

const MainHeader = memo((props: Props) => {
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
        <p style={{ marginBottom: 10, fontSize: 14 }}>你的身份: {'普通用户'}</p>
        <p>
          {localCache.getCache('token') ? (
            <Button variant="contained" size="small" color="secondary">
              退出登录
            </Button>
          ) : (
            <Button variant="contained" size="small" color="success">
              去登录
            </Button>
          )}
        </p>
      </div>
    </HeaderWrapper>
  )
})

export default MainHeader
