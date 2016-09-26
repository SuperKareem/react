import { createSelector } from 'reselect';

/**
 * Direct selector to the mainPage state domain
 */
const selectMainPageDomain = () => (state) => state.get('mainPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MainPage
 */

const selectMainPage = () => createSelector(
  selectMainPageDomain(),
  (substate) => substate.toJS()
);
const selectIsLoading = () => createSelector(
  selectMainPageDomain(),
  (mainPage) => mainPage.get('isLoading')
)
const selectNetworkForm = () => createSelector(
  selectMainPageDomain(),
  (mainPage) => mainPage.get('networkForm').toJS()
)
const selectNetworks = () => createSelector(
  selectMainPageDomain(),
  (mainPage) => mainPage.get('networks')
)


export default selectMainPage;
export {
  selectMainPageDomain,
  selectNetworkForm,
  selectIsLoading,
  selectNetworks
};
