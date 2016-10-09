import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'react-router-redux'
import {
  selectCurrentNetwork
} from 'containers/App/selectors'
import { fetching, fetchingDone, addProfilesToGlobalState } from 'containers/App/actions'
import {
  fetchAllMikrotikUsers,
  fetchAllMikrotikUsersSuccess,
  fetchAllMikrotikUsersFailed,
  fetchAllMikrotikProfiles,
  fetchAllMikrotikProfilesSuccess,
  fetchAllMikrotikProfilesFailed,
  addNewMikrotikUserFailed,
  addNewMikrotikUserSuccess,
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
  yield put(addProfilesToGlobalState(profiles.data))
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
  if(res.msg === 'error inserting in mikrotik server'){
    let error = "اسم المستخدم موجود بالفعل !!"
    yield put(addNewMikrotikUserFailed(error))
    yield put(fetchingDone())
  } else {
    yield put(addNewMikrotikUserSuccess())
    yield put(fetchAllMikrotikUsers())
    yield call(fetchMikrotikUsers)
    yield put(fetchingDone())
  }
}
export function* deleteSelectedUsersSaga(){
  yield put(fetching())
  let {selectedUsers} = yield select(networkPageState())
  let network = yield select(selectCurrentNetwork())
  let res = yield call(sdk.deleteMikrotikUsers, {user: selectedUsers, owner: network.owner, networkId: network._id})
  yield put(fetchingDone())
  yield put(fetching())
  yield call(fetchMikrotikUsers)
  yield put(fetchingDone())
}
export function* editUserDataSaga() {
  yield put(fetching())
  let {selectedUsers, editUserData} = yield select(networkPageState())
  let {owner, _id} = yield select(selectCurrentNetwork())
  let res = yield call(sdk.editMikrotikUser, {selectedUsers, editUserData, owner, ...{networkId: _id}})
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
export function* deletedSeletedUsersWathcer(){
  while(yield take(MIKROTIK.DELETE_SELECTED_USERS))
    yield call(deleteSelectedUsersSaga)
}
export function* editUserDataWatcher(){
  while(yield take(MIKROTIK.EDIT_USER_DATA))
    yield call(editUserDataSaga)
}
// Individual exports for testing
export function* NetWorkPageSaga() {
  const fetchAllMikrotikProfilesSagaWatcher = yield fork(fetchAllMikrotikProfilesWatcher)
  const addNewMikrotikUserSagaWatcher = yield fork(addNewMikrotikUserWatcher)
  const deleteSelectedUsersSagaWatcher = yield fork(deletedSeletedUsersWathcer)
  const editUserDataSagaWatcher = yield fork(editUserDataWatcher)
  yield call(redirect)
  yield call(fetchMikrotikUsers)
  yield take(LOCATION_CHANGE)
  yield cancel(fetchAllMikrotikProfilesSagaWatcher)
  yield cancel(deleteSelectedUsersSagaWatcher)
  yield cancel(addNewMikrotikUserSagaWatcher)
  yield cancel(editUserDataSagaWatcher)
  return;
}

// All sagas to be loaded
export default [
  NetWorkPageSaga,
];
