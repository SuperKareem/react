import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'react-router-redux'
import { selectCurentMikrotikUser } from 'containers/App/selectors'
import { fetching, fetchingDone } from 'containers/App/actions'
import { SERIALS, PROFILES } from './constants'
import sdk from 'utils/sdk'
import selectMikrotikUserPage from './selectors'
import { signinSaga } from 'containers/UserSignIn/sagas'
import {
  profilesFetchSuccess,
  setErorr,
  chargedSuccessful,
 } from './actions'
export function* redirect(){
  let user = yield select(selectCurentMikrotikUser())
  if(!!!user._doc)
    yield put(push('/'))
}

export function* chargeSerialSaga() {
  yield put(fetching())
  let user = yield select(selectCurentMikrotikUser())
  let {serial} = yield select(selectMikrotikUserPage())
  let res = yield call(sdk.users.chargeSerial, {userId: user._doc._id, serial: serial})
  if(res.msg == "serial does not exist!!"){
    yield put(setErorr("خطأ برقم الكرت"))
  } else {
    yield put(chargedSuccessful())
  }
  yield call(signinSaga)
  yield put(fetchingDone())
}
export function* profilesFetchSaga() {
  yield put(fetching())
  let user = yield select(selectCurentMikrotikUser())
  let res = yield call(sdk.fetchAllMikrotikProfiles,{networkId: user._doc.networkId})
  if(res.msg == "good!"){
    yield put(profilesFetchSuccess(res.data))
  }
  yield put(fetchingDone())
}
export function* profileSubscribeSaga() {
  yield put(fetching())
  let user = yield select(selectCurentMikrotikUser())
  let {profileToSubscribe} = yield select(selectMikrotikUserPage())
  let res = yield call(sdk.users.profileSubscribe, {offerName: profileToSubscribe.name, userId: user._doc._id })
  yield call(signinSaga)
  yield put(fetchingDone())
}
export function* logIntoMikroTikSaga() {
  // yield put(fetching())
  // let user = yield select(selectCurentMikrotikUser())
  // let {username, password} = user._doc;
  // let res = yield call(sdk.users.logIntoMikroTik, {username, password, url: document.sendin.action})
  // console.log(res);
  // yield put(fetchingDone())
}
export function* chargeSerialWatcher() {
  while (yield take(SERIALS.CHARGE_SERIAL))
    yield call(chargeSerialSaga)
}
export function* profilesFetchWatcher() {
  while(yield take(PROFILES.FETCH))
    yield call(profilesFetchSaga)
}
export function* profileSubscribeWatcher() {
  while(yield take(PROFILES.SUBSCRIBE))
    yield call(profileSubscribeSaga)
}
export function* logIntoMikroTikWatcher() {
  while(yield take(PROFILES.LOG_INTO_MIKROTIK))
    yield call(logIntoMikroTikSaga)
}
// Individual exports for testing
export function* defaultSaga() {
  const chargeSerialSagaWatcher = yield fork(chargeSerialWatcher)
  const profilesFetchSagaWatcher = yield fork(profilesFetchWatcher)
  const profileSubscribeSagaWatcher = yield fork(profileSubscribeWatcher)
  // const logIntoMikroTikSagaWatcher = yield fork(logIntoMikroTikWatcher)
  yield call(redirect)
  yield take(LOCATION_CHANGE)
  yield cancel(chargeSerialSagaWatcher)
  yield cancel(profilesFetchSagaWatcher)
  yield cancel(profileSubscribeSagaWatcher)
  // yield cancel(logIntoMikroTikSagaWatcher)
  return;
}

// All sagas to be loaded
export default [
  defaultSaga,
];
