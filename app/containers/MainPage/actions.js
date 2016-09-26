/*
 *
 * MainPage actions
 *
 */

import {
  DEFAULT_ACTION,
  NETWORKS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function fetchUserNetwork(){
  return {
    type: NETWORKS.FETCHING
  }
}

export function networksFetchingSuccess(networks){
  return {
    type: NETWORKS.FETCHING_SUCCESS,
    networks
  }
}

export function networksFetchingFailed(error){
  return {
    type: NETWORKS.FETCHING_FAILED,
    error
  }
}

export function networkFormDataChanging(network){
  return {
    type: NETWORKS.NETWORK_FORM_CHANGED,
    network
  }
}
export function addNewNetwork() {
  return{
    type: NETWORKS.ADD_NETWORK
  }
}
