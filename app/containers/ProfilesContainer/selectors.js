import { createSelector } from 'reselect';

/**
 * Direct selector to the profilesContainer state domain
 */
const selectProfilesContainerDomain = () => (state) => state.get('profilesContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProfilesContainer
 */

const selectProfilesContainer = () => createSelector(
  selectProfilesContainerDomain(),
  (substate) => substate.toJS()
);

export default selectProfilesContainer;
export {
  selectProfilesContainerDomain,
};
