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
  comment: '',
  accountType: 'default'
}
const initialState = fromJS({
  errors: {
    addNewMikrotikUser: {
      isExist: false,
      error: ''
    }
  },
  fetching: false,
  users: false,
  newUserForm: _newUserForm,
  profiles: false,
  selectedUsers: false,
  editUserData: false,
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
    case MIKROTIK.ADD_NEW_MIKROTIK_USER_FAILED:
      return state
        .setIn(['errors', 'addNewMikrotikUser', 'isExist'], true)
        .setIn(['errors', 'addNewMikrotikUser', 'error'], action.error)
    case MIKROTIK.ADD_NEW_MIKROTIK_USER_ERROR_OK:
      return state
        .setIn(['errors', 'addNewMikrotikUser', 'isExist'], false)
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
    case MIKROTIK.USER_SELECTION_CHANGED:
      return state
        .set('selectedUsers', action.user)
    case MIKROTIK.ON_USER_DATA_CHANGED:
      return state
        .set('editUserData', action.changedData)
    default:
      return state;
  }
}

export default networkPageReducer;
