/*
 *
 * UserSignIn reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  USER
} from './constants';
var userFormData = {
  username: '',
  password: ''
}
const initialState = fromJS({
  errors: false,
  userFormData: userFormData
});

function userSignInReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case USER.FORM_DATA_CAHANGED:
      return state
        .set('userFormData', action.newData)
      case USER.SIGNIN_FAILED:
        return state
          .set('errors', action.error)
      case USER.SIGNIN_SUCCESS:
        return state
          .set('errors', false)
      case USER.CANCEL_ERROR:
        return state
          .set('errors', false)
    default:
      return state;
  }
}

export default userSignInReducer;
