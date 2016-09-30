/*
 *
 * ProfilesContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';
import { MIKROTIK } from 'containers/NetworkPage/constants'
var _newProilfe = {
  name: '',
  uploadSpeed: '',
  uploadLimit: '',
  downloadSpeed: '',
  downloadLimit: '',
  offerLifetime: '',
  offerPrice: ''
}
const initialState = fromJS({
  newProfileFormData: _newProilfe
});

function profilesContainerReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION.ADD_NEW_PROFILE_FORM_DATA_CAHNGED:
      return state
        .set('newProfileFormData', {...action.profile})
    case MIKROTIK.FETCH_ALL_PROFILES_SUCCESS:
      return state
        .set('newProfileFormData', {_newProilfe})
    default:
      return state;
  }
}

export default profilesContainerReducer;
