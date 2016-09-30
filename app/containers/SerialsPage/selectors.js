import { createSelector } from 'reselect';

/**
 * Direct selector to the serialsPage state domain
 */
const selectSerialsPageDomain = () => (state) => state.get('serialsPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SerialsPage
 */

const selectSerialsPage = () => createSelector(
  selectSerialsPageDomain(),
  (substate) => substate.toJS()
);

export default selectSerialsPage;
export {
  selectSerialsPageDomain,
};
