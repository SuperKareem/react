import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'react-router-redux'
import { fetching, fetchingDone } from 'containers/App/actions'
import { selectCurrentNetwork } from 'containers/App/selectors'
import { SERIALS } from './constants'
import sdk from 'utils/sdk'
import {
  fetchAllSerials,
  fetchSerialsSuccess,
  fetchSerialsFailed,
  createNewSerials,
} from './actions'
import serialsPage from './selectors'
export function* redirect(){
  let currentNetwork = yield select(selectCurrentNetwork())
  if(!currentNetwork._id)
    yield put(push('/main'))
}

export function* fetchSerialsSaga(){
  yield put(fetching())
  let {owner, _id} = yield select(selectCurrentNetwork())
  yield put(fetchAllSerials())
  let serials = yield call(sdk.getAllSerials, {owner: owner, networkId: _id})
  yield put(fetchSerialsSuccess(serials.data))
  yield put(fetchingDone())
}
export function* createNewSerialsSaga() {
  yield put(fetching())
  let {owner, _id} = yield select(selectCurrentNetwork())
  let {createNewSerialsFormData} = yield select(serialsPage())
  let res = yield call(sdk.createNewSerials, {...createNewSerialsFormData, owner: owner, networkId: _id})
  yield call(fetchSerialsSaga)
}
export function* updateSerialSaga() {
  yield put(fetching())
  let {owner, _id} = yield select(selectCurrentNetwork())
  let {selectedSerial, serialUpdatedData} = yield select(serialsPage())
  let res = yield call(sdk.updateSerial, {serial: selectedSerial, newData: serialUpdatedData, owner: owner, networkId: _id})
  yield call(fetchSerialsSaga)
}
export function* deleteSerialSaga() {
  yield put(fetching())
  let {owner, _id} = yield select(selectCurrentNetwork())
  let {selectedSerial} = yield select(serialsPage())
  let res = yield call(sdk.deleteSerial, {serial: selectedSerial, owner: owner, networkId: _id})
  yield call(fetchSerialsSaga)
}
export function* addNewSerialsSaga() {
  yield put(fetching())
  let {owner, _id} = yield select(selectCurrentNetwork())
  let {addNewSerialsFormData} = yield select(serialsPage())
  let {serialsPrice,  serials} = addNewSerialsFormData;
  let serialsArray = serials.split('\n');
  let res = yield call(sdk.addNewSerials, {serials: serialsArray, serialsPrice: serialsPrice, owner: owner, networkId: _id})
  yield call(fetchSerialsSaga)

}

export function* createNewSerialsWatcher() {
  while(yield take(SERIALS.CREATE_NEW_SERIALS))
    yield call(createNewSerialsSaga)
}
export function* updateSerialWatcher() {
  while (yield take(SERIALS.UPDATE_SERIAL))
    yield call(updateSerialSaga)
}
export function* deleteSerialWatcher() {
  while (yield take(SERIALS.DELETE_SERIAL))
    yield call(deleteSerialSaga)
}
export function* addNewSerialsWatcher() {
  while(yield take(SERIALS.ADD_NEW_SERIALS))
    yield call(addNewSerialsSaga)
}
// Individual exports for testing
export function* defaultSaga() {
  const createNewSerialsSagaWatcher = yield fork(createNewSerialsWatcher)
  const updateSerialSagaWatcher = yield fork(updateSerialWatcher)
  const deleteSerialSagaWatcher = yield fork(deleteSerialWatcher)
  const addNewSerialsSagaWatcher = yield fork(addNewSerialsWatcher)
  yield call(redirect)
  yield call(fetchSerialsSaga)
  yield take(LOCATION_CHANGE)
  yield cancel(addNewSerialsWatcher)
  yield cancel(createNewSerialsSagaWatcher)
  yield cancel(updateSerialSagaWatcher)
  yield cancel(deleteSerialSagaWatcher)
  return;
}

// All sagas to be loaded
export default [
  defaultSaga,
];
