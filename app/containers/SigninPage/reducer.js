/*
 *
 * SigninPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SIGNIN
} from './constants';

const initialState = fromJS({
  username: '',
  password: '',
  isLoading: false
});

function signinPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SIGNIN.USERNAME_CHANGE:
      return state.set('username', action.username)
      break;
    case SIGNIN.PASSWORD_CHANGE:
      return state.set('password', action.password)
      break;
    case SIGNIN.SIGNIN_REQ:
      return state.set('isLoading', true)
      break;
    case SIGNIN.SIGNIN_SUCCESS:
      return state.set('isLoading', false)
      break;
    case SIGNIN.SIGNIN_FAILED:
      return state.set('isLoading', false)
      break;
    default:
      return state;
  }
}

export default signinPageReducer;
