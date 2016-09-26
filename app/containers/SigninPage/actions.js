/*
 *
 * SigninPage actions
 *
 */

import {
  DEFAULT_ACTION,
  SIGNIN
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function usernameChange(username){
  return {
    type: SIGNIN.USERNAME_CHANGE,
    username
  }
}

export function passwordChange(password){
  return {
    type: SIGNIN.PASSWORD_CHANGE,
    password
  }
}

export function signinRequest(){
  return {
    type: SIGNIN.SIGNIN_REQ,
  }
}

export function signinSuccess(){
  return {
    type: SIGNIN.SIGNIN_SUCCESS,
  }
}

export function signinFailed(){
  return {
    type: SIGNIN.SIGNIN_FAILED
  }
}

export function networksLoading(){
  return {
    type: NETWORK.SIGNIN_FAILED
  }
}
export function signinFailed(){
  return {
    type: SIGNIN.SIGNIN_FAILED
  }
}
export function signinFailed(){
  return {
    type: SIGNIN.SIGNIN_FAILED
  }
}
