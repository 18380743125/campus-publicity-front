import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import useValidate from '@/hooks/useValidate'
import { useAppDispatch } from '@/store'
import { changeOpen } from '@/store/modules/main'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Copyright from '@/components/copyright'
import { registerReq } from '@/service/modules/main'

const theme = createTheme()

// 表单验证
const schema = yup
  .object({
    uname: yup
      .string()
      .required('请输入用户名')
      .min(6, '用户名不能小于6位')
      .max(30, '用户名不能大于32个字符'),
    password: yup
      .string()
      .required('请输入密码')
      .min(6, '密码不能小于6位')
      .max(30, '密码不能大于18个字符'),
    ok_password: yup
      .string()
      .required('请再次输入密码')
      .test({
        test(value: any, ctx: any) {
          if (value !== ctx.parent.password)
            return ctx.createError({ message: '两次密码输入不一致' })
          else return true
        }
      })
  })
  .required()

interface IForm {
  uname: string
  password: string
  ok_password: string
}

export default function SignUp() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [agreement, setAgreement] = useState(false)

  const { register, handleSubmit, errors } = useValidate<IForm>(schema)

  const handleRegisterClick = async (data: IForm) => {
    if (!agreement) {
      return dispatch(changeOpen({ open: true, type: 'error', message: '请同意用户协议' }))
    }
    const { uname: name, password } = data
    const result = await registerReq({ name, password })
    if (result.code === 0) {
      dispatch(changeOpen({ open: true, message: '注册成功', type: 'success' }))
      return navigate('/login')
    }
    dispatch(changeOpen({ open: true, message: '注册失败', type: 'error' }))
  }

  const goLogin = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    navigate({ pathname: '/login' })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            注册
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleRegisterClick)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="uname"
                  label="用户名"
                  autoComplete="uname"
                  error={errors?.uname ? true : false}
                  helperText={(errors?.uname ? errors.uname.message : '') as React.ReactNode}
                  {...register('uname')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="密码"
                  type="password"
                  id="password"
                  autoComplete="password"
                  error={errors?.password ? true : false}
                  helperText={(errors?.password ? errors.password.message : '') as React.ReactNode}
                  {...register('password')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="请再次输入密码"
                  type="password"
                  id="ok-password"
                  autoComplete="ok-password"
                  error={errors?.ok_password ? true : false}
                  helperText={
                    (errors?.ok_password ? errors.ok_password.message : '') as React.ReactNode
                  }
                  {...register('ok_password')}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreement}
                      onChange={(e) => setAgreement(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="我同意用户协议"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, letterSpacing: 6 }}
            >
              注册
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={goLogin}>
                  已有账号? 去登录
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}
