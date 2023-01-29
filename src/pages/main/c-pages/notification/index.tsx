import React, { memo } from 'react'
import { NotificationWrapper } from './style'

interface Props {}

const Notification = memo((props: Props) => {
  return <NotificationWrapper>notication</NotificationWrapper>
})

export default Notification
