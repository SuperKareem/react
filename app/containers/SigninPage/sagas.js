import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { selectUsername, selectPassword } from './selectors'
import {
  appSigninSuccess,
  fetchingDone,
  fetching
 } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import { SIGNIN } from './constants'
import {
  signinSuccess,
  signinFailed,

} from './actions'
import sdk from 'utils/sdk/index'
// Individual exports for testing
export function* signUserIn(){
  yield put(fetching())
  const username = yield select(selectUsername());
  const password = yield select(selectPassword());
  let res = yield call(sdk.signin, {username, password})
  if(!!res.data.isExist){
    yield put(appSigninSuccess(res.data.user))
    yield put(signinSuccess())
    yield put(push('/main'))
  }else{
    yield put(signinFailed())
    yield put(fetchingDone())
  }
  yield put(fetchingDone())
}
export function* redirect(){
    let user = yield select(selectCurrentUser())
    if(!!user)
      yield put(push('/main'))
}
export function*  signUserInWatcher(){
  while(yield take(SIGNIN.SIGNIN_REQ)){
    yield call(signUserIn)
  }
}
export function* signinSaga() {
  const userWatcher = yield fork(signUserInWatcher)
  const redirectWatcher = yield call(redirect)

  yield take(LOCATION_CHANGE)
  yield cancel(userWatcher)
}
// All sagas to be loaded
export default [
  signinSaga,
];
