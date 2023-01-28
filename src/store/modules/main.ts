import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AlertColor } from '@mui/material/Alert'
import { loginReq } from '@/service/modules/main'
import { localCache } from '@/utils/cache'

interface AlertConfig {
  open: boolean
  anchorOrigin: object
  autoHideDuration: number
  message: string
  type: AlertColor
}

interface MainState {
  roleType: Array<Record<string, unknown>>
  alertConfig: AlertConfig
  user: object
  token: string
}

const initialState: MainState = {
  roleType: [],
  alertConfig: {
    open: false,
    anchorOrigin: { vertical: 'top', horizontal: 'center' },
    autoHideDuration: 3000,
    message: '',
    type: 'error'
  },
  user: localCache.getCache('user') ?? {},
  token: localCache.getCache('token') ?? ''
}

export const loginAction = createAsyncThunk('main/login', (payload: any, { dispatch }) => {
  loginReq(payload.user).then((result) => {
    if (result.code === 0) {
      dispatch(changeOpen({ open: true, message: '登录成功', type: 'success' }))
      localCache.setCache('user', result.data.user)
      localCache.setCache('token', result.data.token)
      payload.navigate('/main')
    } else {
      dispatch(changeOpen({ open: true, message: '用户名或密码错误', type: 'error' }))
    }
  })
})

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    changeOpen(state, { payload }) {
      state.alertConfig = { ...state.alertConfig, ...payload }
    },
    changeRoleType(state, { payload }) {
      state.roleType = payload
    }
  }
})

export const { changeOpen } = mainSlice.actions

export default mainSlice.reducer
