/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
export const SIGNIN_SUCCESS = `APP.SIGNIN_SUCCESS`
export const NETWORK_SELECTED = `APP.NETWORK_SELECTED`
export const FETCHING = `APP.FETCHING`
export const FETCHING_DONE = `APP.FETCHING_DONE`
export default {
  SIGNIN_SUCCESS,
  NETWORK_SELECTED,
  FETCHING_DONE,
  FETCHING,
}
