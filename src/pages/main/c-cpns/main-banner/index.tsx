import React, { memo } from 'react'
import { Carousel } from 'antd'
import { BannerWrapper } from './style'

interface Props {}

const MainBanner = memo((props: Props) => {
  return (
    <BannerWrapper>
      <Carousel autoplay>
        <div>
          <img src={require('@/assets/images/banner/banner01.png')} alt="" />
        </div>
        <div>
          <img src={require('@/assets/images/banner/banner02.png')} alt="" />
        </div>
        <div>
          <img src={require('@/assets/images/banner/banner03.png')} alt="" />
        </div>
        <div>
          <img src={require('@/assets/images/banner/banner04.png')} alt="" />
        </div>
        <div>
          <img src={require('@/assets/images/banner/banner05.png')} alt="" />
        </div>
        <div>
          <img src={require('@/assets/images/banner/banner06.png')} alt="" />
        </div>
      </Carousel>
    </BannerWrapper>
  )
})

export default MainBanner
