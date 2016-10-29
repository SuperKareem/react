import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'react-router-redux'
import { fetching, fetchingDone } from 'containers/App/actions'
import { selectCurrentNetwork } from 'containers/App/selectors'
import { LOGS } from './constants'
import sdk from 'utils/sdk'
import {
  fetchSystemLogsSuccess,
  fetchMikrotikLogsSuccess,
} from './actions'
import selectLogs from './selectors'

export function* redirect(){
  let currentNetwork = yield select(selectCurrentNetwork())
  if(!currentNetwork._id)
    yield put(push('/main'))
}
export function* fetchSystemLogsSaga() {
  yield put(fetching())
  let network = yield select(selectCurrentNetwork())
  let logs = yield call(sdk.logs.getSystemLogs, {networkId: network._id, owner: network.owner})
  yield put(fetchSystemLogsSuccess(logs.data))
  yield put(fetchingDone())
}
export function* fetchMikrotikLogsSaga() {
  yield put(fetching())
  let network = yield select(selectCurrentNetwork())
  let logs = yield call(sdk.logs.getMikrotikLogs, {networkId: network._id, owner: network.owner})
  yield put(fetchMikrotikLogsSuccess(logs.data))
  yield put(fetchingDone())
}
export function* fetchSystemLogsWatcher(){
  while(yield take(LOGS.FETCH_SYSTEM))
    yield call(fetchSystemLogsSaga)
}
export function* fetchMikrotikLogsWatcher(){
  while(yield take(LOGS.FETCH_MIKROTIK))
    yield call(fetchMikrotikLogsSaga)
}
// Individual exports for testing
export function* defaultSaga() {
  const fetchSystemLogsSagaWatcher = yield fork(fetchSystemLogsWatcher)
  const fetchMikrotikLogsSagaWatcher = yield fork(fetchMikrotikLogsWatcher)
  yield call(redirect)
  yield call(fetchSystemLogsSaga)
  yield take(LOCATION_CHANGE)
  yield cancel(fetchMikrotikLogsSagaWatcher)
  yield cancel(fetchSystemLogsSagaWatcher)

  return;
}

// All sagas to be loaded
export default [
  defaultSaga,
];
