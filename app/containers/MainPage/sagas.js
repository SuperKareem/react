import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'react-router-redux'
import {
  selectCurrentUser,
  selectCurrentNetwork
 } from 'containers/App/selectors'
import APP  from 'containers/App/constants'
import {fetching, fetchingDone, networkSelected} from 'containers/App/actions'

import sdk from 'utils/sdk'
import {
  fetchUserNetwork,
  networksFetchingSuccess,
  networksFetchingFailed,

 } from './actions'
import { NETWORKS } from './constants'
import { selectNetworkForm } from './selectors'

export function* redirect(){
  const user = yield select(selectCurrentUser())
  if(!user)
    yield put(push('/signin'))
}
export function* loadNetowrks(){
  yield put(fetching())
  const owner = yield select(selectCurrentUser())
  let nets = yield call(sdk.getAllUserNetworks, {owner: owner._id})
  yield put(networksFetchingSuccess(nets))
  yield put(fetchingDone())
  !!nets.data && nets.data.length > 0 ? yield put(networkSelected(nets.data[0])) : null
}
export function* addNewNetwork() {
  yield put(fetching())
  let data = yield select(selectNetworkForm())
  let owner = yield select(selectCurrentUser())
  let res = yield call(sdk.addNewNetwork, {...data.data, owner: owner._id})
  yield put(fetchUserNetwork())
  yield put(fetchingDone())

}
export function* networkSelectedSaga(){
  let currentNetwork = yield select(selectCurrentNetwork())
  yield console.log('currentNetwork', currentNetwork);
  if(!!currentNetwork._id){
    yield put(push('/network'))
  }
}
export function* loadNetowrksWtacher() {
  while (yield take(NETWORKS.FETCHING))
    yield call(loadNetowrks)
}
export function* addNewNetworkWatcher() {
  while (yield take(NETWORKS.ADD_NETWORK))
    yield call(addNewNetwork)
}
export function* networkSelectedWatcher(){
  while(yield take(APP.NETWORK_SELECTED)){
    yield call(networkSelectedSaga)
  }
}
// Individual exports for testing
export function* mainSaga() {
  const addNetworkWatcher = yield fork(addNewNetworkWatcher)
  const loadUserNetowrksWtacher = yield fork(loadNetowrksWtacher)
  const networkSelectedSagaWatcher = yield fork(networkSelectedWatcher)
  yield call(redirect)
  yield put(fetchUserNetwork())
  yield take(LOCATION_CHANGE)
  yield cancel(addNetworkWatcher)
  yield cancel(loadUserNetowrksWtacher)
  yield cancel(networkSelectedSagaWatcher)
}

// All sagas to be loaded
export default [
  mainSaga,
];
