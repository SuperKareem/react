/*
 *
 * ProfilesContainer actions
 *
 */

import {
  DEFAULT_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function addNewProfileFormData(profile) {
  return {
    type: DEFAULT_ACTION.ADD_NEW_PROFILE_FORM_DATA_CAHNGED,
    profile
  }
}
export function addNewProfile(){
  return {
    type: DEFAULT_ACTION.ADD_NEW_PROFILE
  }
}
export function selectProfile(profile) {
  return {
    type: DEFAULT_ACTION.SELECT_PROFILE,
    profile
  }
}
export function deleteProfile() {
  return {
    type: DEFAULT_ACTION.DELETE_PROFILE,
  }
}
