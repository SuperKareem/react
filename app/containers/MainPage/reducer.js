/*
 *
 * MainPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  NETWORKS
} from './constants';

const initialState = fromJS({
  error: false,
  isLoading: false,
  networks: {},
  networkForm:{
    data:{
      username: '',
      password: '',
      mikrotikIp: '',
      networkName: '',
    }
  }
});

function mainPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case NETWORKS.ADD_NETWORK:
    case NETWORKS.FETCHING:
      return state
          .set('isLoading', true)

    case NETWORKS.FETCHING_SUCCESS:
      return state
          .set('isLoading', false)
          .set('networks', action.networks)

    case NETWORKS.FETCHING:
      return state
          .set('isLoading', false)
          .set('error', action.error)
    case NETWORKS.NETWORK_FORM_CHANGED:
      return state
        .setIn(['networkForm', 'data'], {...action.network})
    default:
      return state;
  }
}

export default mainPageReducer;
