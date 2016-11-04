import uri from './baseUrl'
import api from './api'

export function* signin(data = {username, password}){
  let url = uri.system.users.check
  return yield api.post(url, data)
}

export function* getAllUserNetworks(data = {owner}){
  let url = uri.system.networks.base;
  return yield api.post(url, data)
}

export function* addNewNetwork(data = {username, password, networkName, mikrotikIp, owner}) {
  let url = uri.system.networks.add;
  return yield api.post(url, data)
}

export function* getAllSerials(data) {
  let url = uri.system.serials.base;
  return yield api.post(url, data)
}
export function* createNewSerials(data) {
  let url = uri.system.serials.create;
  return yield api.post(url, data)
}
export function* updateSerial(data) {
  let url = uri.system.serials.update;
  return yield api.post(url, data, 'put')
}
export function* deleteSerial(data) {
  let url = uri.system.serials.delete;
  return yield api.post(url, data, 'delete')
}
export function* addNewSerials(data) {
  let url = uri.system.serials.add;
  return yield api.post(url, data)
}
