/*
 *
 * SerialsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  SERIALS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function fetchAllSerials() {
  return {
    type: SERIALS.FETCHING
  }
}
export function fetchSerialsSuccess(serials) {
  return {
    type: SERIALS.FETCHING_SUCCESS,
    serials
  }
}
export function fetchSerialsFailed(error) {
  return {
    type: SERIALS.FETCHING_FAILED,
    error
  }
}
export function createNewSerialsFormDataChanged(newData) {
  return {
    type: SERIALS.ON_CREATE_NEW_FORM_DATA_CHANGED,
    newData
  }
}
export function createNewSerials() {
  return{
    type: SERIALS.CREATE_NEW_SERIALS,
  }
}
export function updateSerialDataChanged(newData) {
  return{
    type: SERIALS.UPDATE_SERIAL_DATA_CHANGED,
    newData
  }
}
export function selectSerial(serial){
  return{
    type: SERIALS.SELECT_SERIAL,
    serial
  }
}
export function updateSerial() {
  return{
    type: SERIALS.UPDATE_SERIAL,
  }
}
export function deleteSerial() {
  return {
    type: SERIALS.DELETE_SERIAL,
  }
}
export function addNewSerialsFormDataChanged(newData) {
  return {
    type: SERIALS.ADD_NEW_SERIALS_FORM_DATA_CHANGED,
    newData
  }
}
export function addNewSerials() {
  return {
    type: SERIALS.ADD_NEW_SERIALS
  }
}
