import BRequest from './request'
import { BASE_URL, TIME_OUT } from './config'

const bRequest = new BRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default bRequest
