import { createSelector } from 'reselect';

/**
 * Direct selector to the signinPage state domain
 */
const selectSigninPage = () => (state) => state.get('signinPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SigninPage
 */

const selectSigninPageDomain = () => createSelector(
  selectSigninPage(),
  (substate) => substate.toJS()
);

const selectUsername = () => createSelector(
  selectSigninPage(),
  (signin) => signin.get('username')
)

const selectPassword = () => createSelector(
  selectSigninPage(),
  (signin) => signin.get('password')
)

const selectIsLoading = () => createSelector(
  selectSigninPage(),
  (signin) => signin.get('isLoading')
)

export default selectSigninPage;
export {
  selectSigninPage,
  selectUsername,
  selectPassword,
  selectIsLoading
};
