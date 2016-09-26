import { createSelector } from 'reselect';

/**
 * Direct selector to the networkPage state domain
 */
const selectNetworkPageDomain = () => (state) => state.get('networkPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by NetworkPage
 */

const selectNetworkPage = () => createSelector(
  selectNetworkPageDomain(),
  (substate) => substate.toJS()
);
const selectMikrotikUsers = () => createSelector(
  selectNetworkPageDomain(),
  (networkPage) => networkPage.users.toJS()
);


export default selectNetworkPage;
export {
  selectNetworkPageDomain,
};
