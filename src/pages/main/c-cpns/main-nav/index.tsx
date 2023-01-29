import React, { memo } from 'react'
import { ConfigProvider, MenuProps } from 'antd'
import { Menu } from 'antd'
import { NavWrapper } from './style'
import { useNavigate } from 'react-router-dom'

const MainNav = memo(() => {
  const navigate = useNavigate()

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  }

  const items: MenuProps['items'] = [
    {
      label: '首页',
      key: '/main/home'
    },
    {
      label: '通知公告',
      key: '/main/notification'
    },
    {
      label: '校园资讯',
      key: '/main/information'
    },
    {
      label: '校园风光',
      key: '/main/scenery'
    },
    {
      label: '校园地图',
      key: '/main/map'
    }
  ]

  return (
    <NavWrapper>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#002d44'
          }
        }}
      >
        <Menu
          style={{
            backgroundColor: '#013f58',
            color: '#fff',
            fontSize: 16,
            display: 'flex',
            justifyContent: 'center'
          }}
          defaultSelectedKeys={['/main/home']}
          onClick={onClick}
          mode="horizontal"
          items={items}
          theme="dark"
        />
      </ConfigProvider>
    </NavWrapper>
  )
})

export default MainNav
