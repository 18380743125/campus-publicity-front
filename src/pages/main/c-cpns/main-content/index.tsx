import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'
import { ContentWrapper } from './style'

const MainContent = memo(() => {
  return (
    <ContentWrapper>
      <Outlet />
    </ContentWrapper>
  )
})

export default MainContent
