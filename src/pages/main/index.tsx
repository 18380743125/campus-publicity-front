import React, { useEffect } from 'react'
import MainBanner from './c-cpns/main-banner'
import MainFooter from '@/components/main-footer'
import MainHeader from '@/components/main-header'
import MainContent from './c-cpns/main-content'
import { MainWrapper } from './style'
import MainNav from './c-cpns/main-nav'
import { useNavigate, useLocation } from 'react-router-dom'

type Props = {}

function Main({}: Props) {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    navigate('/main/home')
  }, [])

  return (
    <MainWrapper>
      <MainHeader />
      <MainNav />
      {location.pathname === '/main/home' ? <MainBanner /> : ''}
      <MainContent />
      <MainFooter />
    </MainWrapper>
  )
}

export default Main
