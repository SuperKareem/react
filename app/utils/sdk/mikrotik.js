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

export function* fetchAllMikrotikProfiles(data = {owner, networkId}) {
  let url = uri.mikrotik.profiles.get;
  return yield api.post(url, data)
}
