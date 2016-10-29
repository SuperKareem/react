/*
 *
 * NetworkPage actions
 *
 */

import {
  DEFAULT_ACTION,
  MIKROTIK
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function fetchAllMikrotikUsers() {
  return {
    type: MIKROTIK.FETCH_ALL_USERS
  }
}
export function fetchAllMikrotikUsersSuccess(users) {
  return {
    type: MIKROTIK.FETCH_ALL_USERS_SUCCESS,
    users
  }
}
export function fetchAllMikrotikUsersFailed(error) {
  return {
    type: MIKROTIK.FETCH_ALL_USERS_FAILED,
    error
  }
}
export function fetchAllMikrotikProfiles() {
  return {
    type: MIKROTIK.FETCH_ALL_PROFILES
  }
}
export function fetchAllMikrotikProfilesSuccess(profiles) {
  return {
    type: MIKROTIK.FETCH_ALL_PROFILES_SUCCESS,
    profiles
  }
}
export function fetchAllMikrotikProfilesFailed(errors) {
  return {
    type: MIKROTIK.FETCH_ALL_PROFILES_FAILED,
    error
  }
}
export function addNewMikrotikUserFormDataChanged(user) {
  return {
    type: MIKROTIK.ADD_NEW_USER_FORM_DATA_CAHNGED,
    user
  }
}
export function addNewMikrotikUser() {
  return {
    type: MIKROTIK.ADD_NEW_MIKROTIK_USER
  }
}
export function addNewMikrotikUserSuccess() {
  return {
    type: MIKROTIK.ADD_NEW_MIKROTIK_USER_SUCCESS
  }
}
export function addNewMikrotikUserFailed(error) {
  return {
    type: MIKROTIK.ADD_NEW_MIKROTIK_USER_FAILED,
    error
  }
}
export function addNewMikrotikUserErrorOk() {
  return {
    type: MIKROTIK.ADD_NEW_MIKROTIK_USER_ERROR_OK,
  }
}
export function selectedUsersChanged(user){
  return{
    type: MIKROTIK.USER_SELECTION_CHANGED,
    user
  }
}
export function deleteSelectedUsers() {
  return{
    type: MIKROTIK.DELETE_SELECTED_USERS
  }
}
export function onUserToEditDataChanged(changedData) {
  return {
    type: MIKROTIK.ON_USER_DATA_CHANGED,
    changedData: changedData
  }
}
export function editUserData() {
  return {
    type: MIKROTIK.EDIT_USER_DATA,
  }
}
export function fetchMikrotikUsersIntervalFun() {
  return {
    type: MIKROTIK.FETCH_ALL_MIKROTIK_USERS
  }
}
export function renewProfileSelected(profile) {
  return {
    type: MIKROTIK.RENEW_PROFILE_SELECTED,
    profile
  }
}
export function renewProfile() {
  return {
    type: MIKROTIK.RENEW_PROFILE
  }
}
