import React, { useEffect } from 'react'
import MainBanner from './c-cpns/main-banner'
import MainFooter from '@/components/main-footer'
import MainHeader from '@/components/main-header'
import MainContent from './c-cpns/main-content'
import { MainWrapper } from './style'
import MainNav from './c-cpns/main-nav'
import { useNavigate } from 'react-router-dom'

type Props = {}

function Main({}: Props) {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/main/home')
  }, [])

  return (
    <MainWrapper>
      <MainHeader />
      <MainNav />
      <MainBanner />
      <MainContent />
      <MainFooter />
    </MainWrapper>
  )
}

export default Main
