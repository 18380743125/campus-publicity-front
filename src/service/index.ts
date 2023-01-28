import { BASE_URL } from './config/index'
import BRequest from './request'
import { TIME_OUT } from './config'

const bRequest = new BRequest({
  timeout: TIME_OUT,
  baseURL: BASE_URL
})

export default bRequest
