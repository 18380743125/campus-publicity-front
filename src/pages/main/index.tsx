import React from 'react'
import MainBanner from './c-cpns/main-banner'
import MainFooter from '@/components/main-footer'
import MainHeader from '@/components/main-header'
import MainContent from './c-cpns/main-content'
import { MainWrapper } from './style'

type Props = {}

function Main({}: Props) {
  return (
    <MainWrapper>
      <MainHeader />
      <MainBanner />
      <MainContent />
      <MainFooter />
    </MainWrapper>
  )
}

export default Main
