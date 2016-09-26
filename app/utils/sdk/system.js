import uri from './baseUrl'
import api from './api'

export function* signin(data = {username, password}){
  let url = uri.system.users.check
  return yield api.post(url, data)
}

export function* getAllUserNetworks(data = {owner}){
  console.log(uri);
  let url = uri.system.networks.base;
  return yield api.post(url, data)
}

export function* addNewNetwork(data = {username, password, networkName, mikrotikIp, owner}) {
  console.log(data);
  let url = uri.system.networks.add;
  return yield api.post(url, data)
}
