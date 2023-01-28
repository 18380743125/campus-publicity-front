import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Copyright from '@/components/copyright'
import useValidate from '@/hooks/useValidate'
import { useAppDispatch } from '@/store'
import { loginAction } from '@/store/modules/main'
import { User } from '@/types/login'

interface IForm {
  name: string
  password: string
}

// 表单验证
const schema = yup
  .object({
    name: yup
      .string()
      .required('请输入用户名')
      .min(6, '用户名不能小于6位')
      .max(30, '用户名不能大于32个字符'),
    password: yup
      .string()
      .required('请输入密码')
      .min(6, '密码不能小于6位')
      .max(30, '密码不能大于18个字符')
  })
  .required()

const theme = createTheme({
  palette: {
    mode: 'light'
  }
})

export default function SignInSide() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { register, handleSubmit, errors } = useValidate<IForm>(schema)

  // 登录按钮点击
  const handleLoginClick = (data: IForm) => {
    dispatch(loginAction({ user: { ...data }, navigate } as any as User))
  }

  // 去注册
  const goRegister = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    navigate('/register')
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${require('@/assets/images/login/login_bgimage.jpg')})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              用户登录
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handleLoginClick)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="用户名"
                autoComplete="name"
                {...register('name')}
                error={errors?.name ? true : false}
                helperText={(errors?.name ? errors.name.message : '') as React.ReactNode}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="密码"
                type="password"
                id="password"
                autoComplete="password"
                {...register('password')}
                error={errors?.password ? true : false}
                helperText={(errors?.password ? errors.password.message : '') as React.ReactNode}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, letterSpacing: 6 }}
              >
                登录
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    忘记密码?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={goRegister}>
                    {'没有账号? 去注册'}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
