import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const Main = lazy(() => import('@/pages/main'))
const Login = lazy(() => import('@/pages/login'))
const Register = lazy(() => import('@/pages/register'))

const routes = [
  {
    path: '/',
    element: <Navigate to="/main" />
  },
  {
    path: '/main',
    element: <Main />
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
    element: <Navigate to="/main" />
  }
] as Array<RouteObject>

export default routes
