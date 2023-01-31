import React, { memo } from 'react'
import { ConfigProvider, MenuProps } from 'antd'
import { Menu } from 'antd'
import { NavWrapper } from './style'
import { useLocation, useNavigate } from 'react-router-dom'
import { isAdmin } from '@/utils/isAdmin'
import { localCache } from '@/utils/cache'

const MainNav = memo(() => {
  const navigate = useNavigate()
  const location = useLocation()

  const onClick: MenuProps['onClick'] = (e) => {
    localCache.setCache('currentUrl', e.key)
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

  if (isAdmin()) {
    items.splice(4, 0, { label: '用户管理', key: '/main/users' })
  }

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
          selectedKeys={[
            location.pathname === '/main/home' ? '/main/home' : localCache.getCache('currentUrl')
          ]}
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
