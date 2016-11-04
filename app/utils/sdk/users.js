import uri from './baseUrl'
import api from './api'
import fetch from 'utils/request'

export function* signin(data = {username, password}){
  let url = uri.mikrotik.users.check;
  return yield api.post(url, data)
}
export function* chargeSerial(data) {
  let url = uri.system.serials.charge;
  return yield api.post(url, data)
}
export function* profileSubscribe(data) {
  let url = uri.mikrotik.users.subscribe
  return yield api.post(url, data)
}
// export function* logIntoMikroTik(data){
//   let url = data.url
//   doLogin(data.username, data.password);
//   let username = document.sendin.username.value
//   let password = document.sendin.password.value
//   console.log(username, password, url);
//   let res = yield fetch(url,{
//     method: 'POST',
//     headers:  {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(username, password),
//     data:{
//       username: username,
//       password: password,
//       popup: "no",
//       submit: "OK"
//       }
//   })
//   console.log(res);
//   return res;
// }
export default {
  signin,
  chargeSerial,
  profileSubscribe,
}
