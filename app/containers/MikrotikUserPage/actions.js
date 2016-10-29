/*
 *
 * MikrotikUserPage actions
 *
 */

import {
  DEFAULT_ACTION,
  PROFILES,
  SERIALS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function setSerial(serial){
  return {
    type: SERIALS.SET_SERIAL,
    serial
  }
}
export function chargeSerial(){
  return {
    type: SERIALS.CHARGE_SERIAL,
  }
}
export function profilesFetch() {
  return {
    type: PROFILES.FETCH
  }
}

export function profilesFetchSuccess(profiles) {
  return {
    type: PROFILES.FETCH_SUCCESS,
    profiles
  }
}

export function setProfileToSubscribe(profile){
  return {
    type: PROFILES.SET_PROFILE_TO_SUBSCRIBE,
    profile
  }
}
export function profileSubscribe(){
  return {
    type: PROFILES.SUBSCRIBE
  }
}
export function chargedSuccessful() {
  return {
    type:SERIALS.CHARGEED_SUCCESSFULL
  }
}
export function setErorr(msg) {
  return {
    type: SERIALS.ERROR,
    msg
  }
}
export function removeErorr() {
  return {
    type: SERIALS.REMOVE_ERROR
  }
}
export function removeChargedSuccess() {
  return {
    type: SERIALS.REMOVE_CHARGED_SUCCESS
  }
}
export function logIntoMikroTik() {
  return {
    type: PROFILES.LOG_INTO_MIKROTIK
  }
}
