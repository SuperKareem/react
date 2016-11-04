/*
 *
 * Logs actions
 *
 */

import {
  DEFAULT_ACTION,
  LOGS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function fetchSystemLogs() {
  return {
    type: LOGS.FETCH_SYSTEM,
  };
}
export function fetchSystemLogsSuccess(systemLogs) {
  return {
    type: LOGS.FETCH_SYSTEM_SUCCESS,
    systemLogs
  };
}

export function fetchMikrotikLogs() {
  return {
    type: LOGS.FETCH_MIKROTIK,
  };
}

export function fetchMikrotikLogsSuccess(mikrotikLogs) {
  return {
    type: LOGS.FETCH_MIKROTIK_SUCCESS,
    mikrotikLogs
  };
}
export function logout() {
  return {
    type: LOGS.LOGOUT
  }
}
