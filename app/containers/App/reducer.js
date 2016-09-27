/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  SIGNIN_SUCCESS,
  NETWORK_SELECTED
} from './constants';
import APP from './constants'
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  currentNetwork: fromJS({
    _id: false,
    name: false,
    owner: false,
    password: false,
    username: false,
    mikrotikIp: false
  }),
  userData: fromJS({
    repositories: false,
  }),
  currentProfiles: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case SIGNIN_SUCCESS:
      return state
        .set('currentUser', action.user)
    case NETWORK_SELECTED:
        return state
          .set('currentNetwork', action.network)
    case APP.FETCHING:
        return state
          .set('loading', true)
    case APP.FETCHING_DONE:
        return state
          .set('loading', false)
    case APP.ADD_PROFILES_TO_GLOBAL_STATE:
      return state
        .set('currentProfiles', action.profiles)
    default:
      return state;
  }
}

export default appReducer;
