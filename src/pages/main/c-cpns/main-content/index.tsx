import { isAdmin } from '@/utils/isAdmin'
import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'
import { ContentWrapper } from './style'

const MainContent = memo(() => {
  const admin = isAdmin()
  let styles = {}
  if (admin) {
    styles = { marginTop: 50 }
  }
  return (
    <ContentWrapper style={styles}>
      <Outlet />
    </ContentWrapper>
  )
})

export default MainContent
