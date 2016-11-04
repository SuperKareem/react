import { createSelector } from 'reselect';

/**
 * Direct selector to the mikrotikUserPage state domain
 */
const selectMikrotikUserPageDomain = () => (state) => state.get('mikrotikUserPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MikrotikUserPage
 */

const selectMikrotikUserPage = () => createSelector(
  selectMikrotikUserPageDomain(),
  (substate) => substate.toJS()
);

export default selectMikrotikUserPage;
export {
  selectMikrotikUserPageDomain,
};
