/*
 *
 * NetworkPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  MIKROTIK
} from './constants';

var _newUserForm = {
  username: '',
  password: '',
  name: '',
  profile: '',
  email: '',
  disabled: false,
  comment: ''
}
const initialState = fromJS({
  fetching: false,
  users: false,
  newUserForm: _newUserForm,
  profiles: false
});

function networkPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case MIKROTIK.FETCH_ALL_USERS:
      return state
        .set('users', false)
    case MIKROTIK.FETCH_ALL_USERS_SUCCESS:
      return state
        .set('users', action.users)
    case MIKROTIK.ADD_NEW_USER_FORM_DATA_CAHNGED:
      return state
        .set('newUserForm', {...action.user})
    case MIKROTIK.FETCH_ALL_PROFILES:
      return state
        .set('fetching', true)
        .set('newUserForm', _newUserForm)
    case MIKROTIK.FETCH_ALL_PROFILES_FAILED:
      console.log(action.error);
      return state
        .set('fetching', false)
    case MIKROTIK.FETCH_ALL_PROFILES_SUCCESS:
        return state
          .set('profiles', action.profiles)
          .set('fetching', false)
    default:
      return state;
  }
}

export default networkPageReducer;
