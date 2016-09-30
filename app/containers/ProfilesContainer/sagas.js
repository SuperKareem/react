import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux'
import {
  selectCurrentNetwork,
  selectGlobal
} from 'containers/App/selectors'
import { fetchAllMikrotikProfiles } from 'containers/NetworkPage/actions'
import { fetching, fetchingDone } from 'containers/App/actions'
import { fetchAllMikrotikProfilesWatcher } from 'containers/NetworkPage/sagas'
import selectProfilesContainer from './selectors'
import {DEFAULT_ACTION} from './constants'
import sdk from 'utils/sdk'

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

export function* addNewProfileSaga(){
  yield put(fetching())
  let {_id, owner} = yield select(selectCurrentNetwork())
  let { newProfileFormData } = yield select(selectProfilesContainer())
  let res = yield call(sdk.addNewMikrottikProfile,{...newProfileFormData, ...{networkId: _id, owner: owner}})
  yield put(fetchAllMikrotikProfiles())
  yield put(fetchingDone())
}

export function* addNewProfileWatcher(){
  while(yield take(DEFAULT_ACTION.ADD_NEW_PROFILE))
    yield call(addNewProfileSaga)
}
// Individual exports for testing
export function* defaultSaga() {
  yield call(redirect)

  const fetchAllMikrotikProfilesSagaWatcher = yield fork(fetchAllMikrotikProfilesWatcher)
  const addNewProfileSagaWatcher = yield fork(addNewProfileWatcher)
  yield call(fetchAllMikrotikProfilesSaga)
  yield take(LOCATION_CHANGE)
  yield cancel(fetchAllMikrotikProfilesSagaWatcher)
  yield cancel(addNewProfileSagaWatcher)
}

// All sagas to be loaded
export default [
  defaultSaga,
];
