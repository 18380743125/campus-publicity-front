import React, { memo } from 'react'
import { FooterWrapper } from './style'

// interface Props {}

const MainFooter = memo(() => {
  return (
    <FooterWrapper>
      <div className="left">
        <img src={require('@/assets/images/main/footer/logo.png')} alt="" />
        <div className="divide"></div>
        <div className="right">
          重庆移通学院 版权所有 | 地址：重庆市合川大学城假日大道1号 | 邮编：401520 |
          渝ICP备12002696号-1
        </div>
      </div>
    </FooterWrapper>
  )
})

export default MainFooter
