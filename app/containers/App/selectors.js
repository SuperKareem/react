/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectCurrentUser = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('currentUser')
);

const selectCurentMikrotikUser = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('currentMikrotikUser')
);

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loading')
);

const selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('error')
);

const selectRepos = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['userData', 'repositories'])
);
const selectCurrentNetwork = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('currentNetwork')
)
const selectCurrentProfiles = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('currentProfiles')
)
const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  selectCurrentUser,
  selectLoading,
  selectError,
  selectRepos,
  selectLocationState,
  selectCurrentNetwork,
  selectCurrentProfiles,
  selectCurentMikrotikUser,
};
