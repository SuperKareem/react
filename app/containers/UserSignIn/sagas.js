import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import selectUserSignIn from './selectors'
import {
  fetchingDone,
  fetching
 } from 'containers/App/actions';
 import {
   signinSuccess,
   signinFailed
 } from './actions'
 import { USER } from './constants'
 import sdk from 'utils/sdk/index'

export function* signinSaga() {
  yield put(fetching())
  let {userFormData} = yield select(selectUserSignIn())
  let res = yield call(sdk.users.signin, userFormData)
  if(!!res.data.isExist){
    yield put(signinSuccess(res.data.user))
    yield put(fetchingDone())
    yield put(push('/user'))
  } else if(res.msg == "User Doesn't Exist"){
    let error = "خطأ فى اسم المستخدم او كلمة السر"
    yield put(signinFailed(error))
    yield put(fetchingDone())
  }
}

export function* signinWatcher() {
  while (yield take(USER.SIGNIN))
    yield call(signinSaga)
}
// Individual exports for testing
export function* defaultSaga() {
  const signinSagaWatcher = yield fork(signinWatcher)
  yield take(LOCATION_CHANGE)
  yield cancel(signinSagaWatcher)
  return;
}

// All sagas to be loaded
export default [
  defaultSaga,
];
