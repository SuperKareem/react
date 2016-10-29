/*
 *
 * MikrotikUserPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SERIALS,
  PROFILES
} from './constants';

const initialState = fromJS({
  serial: false,
  profiles: false,
  profileToSubscribe: false,
  chargedSuccessful: false,
  errors: false,
  errorMsg: ''
});

function mikrotikUserPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SERIALS.SET_SERIAL:
      return state
        .set('serial', action.serial)
    case PROFILES.FETCH_SUCCESS:
      return state
        .set('profiles', action.profiles)
    case PROFILES.SET_PROFILE_TO_SUBSCRIBE:
      return state
        .set('profileToSubscribe', action.profile)
    case SERIALS.CHARGEED_SUCCESSFULL:
      return state
        .set('chargedSuccessful', true)
    case SERIALS.ERROR:
      return state
        .set('errors',true)
        .set('errorMsg', action.msg)
    case SERIALS.REMOVE_ERROR:
      return state
        .set('errors', false)
    case SERIALS.REMOVE_CHARGED_SUCCESS:
      return state
        .set('chargedSuccessful', false)
    default:
      return state;
  }
}

export default mikrotikUserPageReducer;
