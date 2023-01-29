import React, { memo } from 'react'
import { HomeWrapper } from './style'

interface Props {}

const Home = memo((props: Props) => {
  return <HomeWrapper>home</HomeWrapper>
})

export default Home
