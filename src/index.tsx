import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import theme from './assets/theme'
import 'normalize.css'
import '@/assets/css/index.less'
import '@fontsource/roboto'
import '@wangeditor/editor/dist/css/style.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>
)
