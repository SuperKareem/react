/*
 *
 * Logs reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOGS
} from './constants';

const initialState = fromJS({
  systemLogs: false,
  mikrotikLogs: false,
});

function logsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOGS.FETCH_SYSTEM_SUCCESS:
      return state
        .set('systemLogs', action.systemLogs)
    case LOGS.FETCH_MIKROTIK_SUCCESS:
      return state
        .set('mikrotikLogs', action.mikrotikLogs)
    default:
      return state;
  }
}

export default logsReducer;
