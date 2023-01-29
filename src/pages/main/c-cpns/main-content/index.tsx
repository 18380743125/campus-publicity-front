import React, { memo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ContentWrapper } from './style'

const MainContent = memo(() => {
  const location = useLocation()
  let styles = {}
  if (location.pathname !== '/main/home') {
    styles = { marginTop: 50 }
  }
  return (
    <ContentWrapper style={styles}>
      <Outlet />
    </ContentWrapper>
  )
})

export default MainContent
