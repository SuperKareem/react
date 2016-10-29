/*
 *
 * SerialsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SERIALS,
} from './constants';
let createNewSerialsFormData = {
  serialsNumber: '',
  serialsPrice: ''
}
let addNewSerialsFormData = {
  serialsPrice: '',
  serials: ''
}
const initialState = fromJS({
  error: false,
  serials: false,
  createNewSerialsFormData: createNewSerialsFormData,
  addNewSerialsFormData: addNewSerialsFormData,
  selectedSerial: false,
  serialUpdatedData: false,
});

function serialsPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SERIALS.FETCHING:
      return state
    case SERIALS.FETCHING_SUCCESS:
      return state
        .set('serials', action.serials)
        .set('error', false)
    case SERIALS.FETCHING_FAILED:
      return state
        .set('serials', false)
        .set('errors', action.error)
    case SERIALS.ON_CREATE_NEW_FORM_DATA_CHANGED:
      return state
        .set('createNewSerialsFormData', {...action.newData})
    case SERIALS.SELECT_SERIAL:
      return state
        .set('selectedSerial', action.serial)
    case SERIALS.UPDATE_SERIAL_DATA_CHANGED:
      return state
        .set('serialUpdatedData', action.newData)
    case SERIALS.ADD_NEW_SERIALS_FORM_DATA_CHANGED:
      return state
        .set('addNewSerialsFormData', {...action.newData})
    default:
      return state;
  }
}

export default serialsPageReducer;
