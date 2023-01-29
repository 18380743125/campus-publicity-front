import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import { IRootState, useAppDispatch, useAppSelector } from './store'

import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { changeOpen } from './store/modules/main'

function App() {
  const { alertConfig } = useAppSelector((state: IRootState) => ({
    alertConfig: state.main.alertConfig
  }))

  const dispatch = useAppDispatch()

  const setOpen = (flag: boolean) => {
    dispatch(changeOpen({ open: flag }))
  }

  return (
    <div style={{ height: '100%' }}>
      <Suspense fallback="">{useRoutes(routes)}</Suspense>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={alertConfig.open}
        autoHideDuration={alertConfig.autoHideDuration}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity={alertConfig.type}>
          {alertConfig.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default App
