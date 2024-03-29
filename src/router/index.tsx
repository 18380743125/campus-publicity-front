import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

import Main from '@/pages/main'
import Home from '@/pages/main/c-pages/home'
import Notification from '@/pages/main/c-pages/notification'
import AddNotification from '@/pages/main/c-pages/notification/c-pages/edit-notification'
import NotificationDetail from '@/pages/main/c-pages/notification/c-pages/detail-notification'
import Information from '@/pages/main/c-pages/information'
import EditInformation from '@/pages/main/c-pages/information/c-pages/edit-information'
import DetailInformation from '@/pages/main/c-pages/information/c-pages/detail-information'
import Scenery from '@/pages/main/c-pages/scenery'
import Map from '@/pages/main/c-pages/map'
import SceneryDetail from '@/pages/main/c-pages/scenery-detail'
import Users from '@/pages/main/c-pages/users'

const Login = lazy(() => import('@/pages/login'))
const Register = lazy(() => import('@/pages/register'))

const routes = [
  {
    path: '/',
    element: <Navigate to="/main/home" />
  },
  {
    path: '/main',
    element: <Main />,
    children: [
      {
        path: '/main/home',
        element: <Home />
      },
      {
        path: '/main/notification',
        element: <Notification />
      },
      {
        path: '/main/notification/edit',
        element: <AddNotification />
      },
      {
        path: '/main/notification/:id',
        element: <NotificationDetail />
      },
      {
        path: '/main/information',
        element: <Information />
      },
      {
        path: '/main/information/edit',
        element: <EditInformation />
      },
      {
        path: '/main/information/:id',
        element: <DetailInformation />
      },
      {
        path: '/main/scenery',
        element: <Scenery />
      },
      {
        path: '/main/scenery/:id',
        element: <SceneryDetail />
      },
      {
        path: '/main/map',
        element: <Map />
      },
      {
        path: '/main/users',
        element: <Users />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '*',
    element: <Navigate to="/main/home" />
  }
] as Array<RouteObject>

export default routes
