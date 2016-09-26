import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'react-router-redux'
import {
  selectCurrentNetwork
} from 'containers/App/selectors'
import { fetching, fetchingDone } from 'containers/App/actions'
import {
  fetchAllMikrotikUsers,
  fetchAllMikrotikUsersSuccess,
  fetchAllMikrotikUsersFailed,
  fetchAllMikrotikProfiles,
  fetchAllMikrotikProfilesSuccess,
  fetchAllMikrotikProfilesFailed
} from './actions'
import { MIKROTIK } from './constants'
import sdk from 'utils/sdk'
import networkPageState from './selectors'

export function* redirect(){
  let currentNetwork = yield select(selectCurrentNetwork())
  if(!currentNetwork._id)
    yield put(push('/main'))
}

export function* fetchMikrotikUsers() {
  yield put(fetching())
  let network = yield select(selectCurrentNetwork())
  yield put(fetchAllMikrotikUsers())
  let mikrotikUsers = yield call(sdk.fetchMikrotikUsers, {owner: network.owner, networkId: network._id})
  yield put(fetchAllMikrotikUsersSuccess(mikrotikUsers))
  yield put(fetchingDone())
}

export function* fetchAllMikrotikProfilesSaga() {
  let network = yield select(selectCurrentNetwork())
  let profiles = yield call(sdk.fetchAllMikrotikProfiles, {owner: network.owner, networkId: network._id})
  yield put(fetchAllMikrotikProfilesSuccess(profiles))
}
export function* addNewMikrotikUserSaga() {
  yield put(fetching())
  let network = yield select(selectCurrentNetwork())
  let networkState = yield select(networkPageState())
  let res = yield call(sdk.addNewMikrotikUser, {
    ...{owner: network.owner, networkId: network._id},
    ...networkState.newUserForm
  })
  // NOTE:
  // TODO: checkin user adding errors and handle'em
  yield put(fetchAllMikrotikUsers())
  yield call(fetchMikrotikUsers)
  yield put(fetchingDone())
}
export function* fetchAllMikrotikProfilesWatcher() {
  while (yield take(MIKROTIK.FETCH_ALL_PROFILES))
    yield call(fetchAllMikrotikProfilesSaga)
}

export function* addNewMikrotikUserWatcher() {
  while(yield take(MIKROTIK.ADD_NEW_MIKROTIK_USER))
    yield call(addNewMikrotikUserSaga)
}
// Individual exports for testing
export function* NetWorkPageSaga() {
  const fetchAllMikrotikProfilesSagaWatcher = yield fork(fetchAllMikrotikProfilesWatcher)
  const addNewMikrotikUserSagaWatcher = yield fork(addNewMikrotikUserWatcher)
  yield call(redirect)
  yield call(fetchMikrotikUsers)
  yield take(LOCATION_CHANGE)
  yield cancel(fetchAllMikrotikProfilesSagaWatcher)
  yield cancel(addNewMikrotikUserSagaWatcher)
  return;
}

// All sagas to be loaded
export default [
  NetWorkPageSaga,
];
