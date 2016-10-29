import uri from './baseUrl'
import api from './api'

export function* fetchMikrotikUsers(data = {owner, networkId}){
  let url = uri.mikrotik.users.get;
  return yield api.post(url, data)
}

export function* addNewMikrotikUser(data = {comment, username, password, profile, disabled, owner, networkId}) {
  let url = uri.mikrotik.users.add;
  return yield api.post(url, data)
}
export function* deleteMikrotikUsers(data){
  let url = uri.mikrotik.users.delete;
  return yield api.post(url, data, 'delete');
}
export function* editMikrotikUser(data){
  let url = uri.mikrotik.users.update;
  return yield api.post(url, data, 'put');
}
export function* fetchAllMikrotikProfiles(data = {owner, networkId}) {
  let url = uri.mikrotik.profiles.get;
  return yield api.post(url, data)
}
export function* addNewMikrottikProfile(data = {name, uploadSpeed, uploadLimit, downloadLimit, downloadSpeed, offerLifetime, networkId, owner}){
  let url = uri.mikrotik.profiles.add;
  return yield api.post(url, data)
}
export function* deleteProfile(data){
  let url = uri.mikrotik.profiles.delete;
  return yield api.post(url, data, 'delete')
}
