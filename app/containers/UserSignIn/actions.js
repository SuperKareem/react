/*
 *
 * UserSignIn actions
 *
 */

import {
  DEFAULT_ACTION,
  USER,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function signin() {
  return {
    type: USER.SIGNIN
  }
}
export function signinSuccess(user) {
  return {
    type: USER.SIGNIN_SUCCESS,
    user
  }
}
export function signinFailed(error) {
  return {
    type: USER.SIGNIN_FAILED,
    error
  }
}

export function formDataChanged(newData){
  return {
    type: USER.FORM_DATA_CAHANGED,
    newData
  }
}
export function cancelErorrs() {
  return {
    type: USER.CANCEL_ERROR
  }
}
