import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux'
import {
  selectCurrentNetwork,
  selectGlobal
} from 'containers/App/selectors'
import { fetchAllMikrotikProfiles } from 'containers/NetworkPage/actions'
import { fetching, fetchingDone } from 'containers/App/actions'
import { fetchAllMikrotikProfilesWatcher } from 'containers/NetworkPage/sagas'

export function* redirect() {
  let currentNetwork = yield select(selectCurrentNetwork())
  if(!currentNetwork._id)
    yield put(push('/main'))
}

export function* fetchAllMikrotikProfilesSaga() {
  let {currentProfiles} = yield select(selectGlobal())
  if(!currentProfiles){
    yield put(fetching())
    yield put(fetchAllMikrotikProfiles())
    yield put(fetchingDone())
  }
}
// Individual exports for testing
export function* defaultSaga() {
  yield call(redirect)

  const fetchAllMikrotikProfilesSagaWatcher = yield fork(fetchAllMikrotikProfilesWatcher)
  yield call(fetchAllMikrotikProfilesSaga)
  yield take(LOCATION_CHANGE)
  yield cancel(fetchAllMikrotikProfilesSagaWatcher)
}

// All sagas to be loaded
export default [
  defaultSaga,
];
