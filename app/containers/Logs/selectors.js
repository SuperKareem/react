import { createSelector } from 'reselect';

/**
 * Direct selector to the logs state domain
 */
const selectLogsDomain = () => (state) => state.get('logs');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Logs
 */

const selectLogs = () => createSelector(
  selectLogsDomain(),
  (substate) => substate.toJS()
);

export default selectLogs;
export {
  selectLogsDomain,
};
