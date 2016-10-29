import uri from './baseUrl'
import api from './api'

export function* getSystemLogs(data = {username, password}){
  let url = uri.system.logs.system;
  return yield api.post(url, data)
}
export function* getMikrotikLogs(data) {
  let url = uri.system.logs.mikrotik;
  return yield api.post(url, data)
}
export default {
  getSystemLogs,
  getMikrotikLogs,
}
