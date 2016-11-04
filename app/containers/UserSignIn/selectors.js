import { createSelector } from 'reselect';

/**
 * Direct selector to the userSignIn state domain
 */
const selectUserSignInDomain = () => (state) => state.get('userSignIn');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UserSignIn
 */

const selectUserSignIn = () => createSelector(
  selectUserSignInDomain(),
  (substate) => substate.toJS()
);

export default selectUserSignIn;
export {
  selectUserSignInDomain,
};
